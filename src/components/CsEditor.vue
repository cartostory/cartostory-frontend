<script>
import cloneDeep from 'lodash.clonedeep';
import { Editor, EditorContent } from 'tiptap';
import { Heading, Image } from 'tiptap-extensions';
import { mapState } from 'vuex';

import BboxMark from '@/components/editor/BboxMark';
import FeatureMark from '@/components/editor/FeatureMark';
import MenuBar from '@/components/editor/MenuBar.vue';
import MenuBubble from '@/components/editor/MenuBubble.vue';
import { UPDATE_EDITABLE, UPDATE_ERRORS, UPDATE_STORY_NAME, UPDATE_STORY_TEXT } from '@/store/mutations';
import { getBboxSelector, getLatLngSelector } from '@/utils/utils';
import * as storyService from '@/services/story';

export default {
  name: 'CsEditor',
  components: {
    EditorContent,
    MenuBubble,
    MenuBar,
  },
  data() {
    return {
      content: 'Můžete začít psát...',
      editor: undefined,
      previousContent: undefined, // placeholder for old content to go to when user cancels edits
      saving: false,
      storyId: undefined,
      keepInBounds: true,
    };
  },
  computed: {
    ...mapState(['editable', 'highlightedBbox', 'highlightedLatLng', 'shouldTextScroll']),
    ...mapState({
      author: state => state.story.author,
      text: state => state.story.text,
      token: state => state.auth.token,
      track: state => state.story.track,
    }),
    showEditButton() {
      return this.author === this.$auth.user.email;
    },
    storyName: {
      get() {
        return this.$store.state.story.name;
      },
      set(value) {
        this.$store.commit(UPDATE_STORY_NAME, value);
      },
    },
  },
  watch: {
    highlightedLatLng(latLng) {
      if (!latLng) {
        return;
      }

      this.scrollToHighlighted();
    },
    highlightedBbox(bbox) {
      if (!bbox) {
        return;
      }

      this.scrollToHighlighted();
    },
  },
  beforeMount() {
    this.$hideScrollbar();
  },
  beforeDestroy() {
    document.documentElement.classList.remove('is-clipped');
    this.editor.destroy();
  },
  created() {
    this.storyId = this.$route.params && this.$route.params.id;
  },
  mounted() {
    this.editor = this.$createEditor();

    if (this.text) { // when reading the story, load text from store
      this.editor.setContent(this.text);
    }
  },
  methods: {
    /*
     * Revert changes when user cancels editing.
     * @TODO body doesn't get `.is-clipped` class again, because it's being reset in
     * https://github.com/buefy/buefy/blob/dev/src/components/modal/Modal.vue#L160.
     */
    handleCancelEditing() {
      this.$buefy.dialog.confirm({
        message: 'Opravdu chcete zahodit změny?',
        cancelText: 'Ne',
        confirmText: 'Ano',
        onCancel: () => this.$hideScrollbar(),
        onConfirm: () => {
          this.$store.commit(UPDATE_EDITABLE, false);
          this.editor.setOptions({ editable: false });
          this.editor.setContent(this.previousContent);
          this.$hideScrollbar();
        },
      });
    },

    /*
     * Send the content to store only when needed:
     * - when feature mark or bbox is added
     * - when story is to be saved
     */
    handleContentUpdate() {
      this.$store.commit(UPDATE_STORY_TEXT, cloneDeep(this.editor.getJSON()));
    },

    handleStartEditing() {
      this.$store.commit(UPDATE_EDITABLE, true);
      this.editor.setOptions({ editable: true });
      this.previousContent = cloneDeep(this.editor.getJSON());
    },

    /*
     * Create new story or updates an existing one.
     */
    async handleSave() {
      this.handleContentUpdate();

      const payload = {
        name: this.storyName,
        text: this.text,
        track: this.track,
      };

      if (this.storyId) {
        payload.id = this.storyId;
      }

      try {
        this.saving = true;
        this.storyId = await storyService.save(payload, this.token);
      } catch (e) {
        this.$store.commit(UPDATE_ERRORS, {
          title: e.name,
          message: e.message,
        });
      } finally {
        this.saving = false;
      }
    },

    /*
     * Scroll to the highlighted feature mark or bbox.
     */
    scrollToHighlighted() {
      const highlighted = this.$getHighlightedNode();

      if (!highlighted) {
        return;
      }

      this.$scrollTo(highlighted, undefined, {
        container: document.querySelector('.editor'),
        offset: -50,
      });
    },

    $getHighlightedNode() {
      let querySelector;

      if (!this.shouldTextScroll) {
        return;
      }

      if (this.highlightedLatLng) {
        querySelector = getLatLngSelector(this.highlightedLatLng);
      }

      if (this.highlightedBbox) {
        querySelector = getBboxSelector(this.highlightedBbox);
      }

      // eslint-disable-next-line consistent-return
      return document.querySelector(querySelector);
    },

    $createEditor() {
      return new Editor({
        editable: this.editable,
        extensions: [
          new BboxMark(),
          new FeatureMark(),
          new Heading({
            levels: [2, 3, 4], // leave <h1> for the story title
          }),
          new Image(),
        ],
        content: this.content,
      });
    },

    $hideScrollbar() {
      document.documentElement.classList.add('is-clipped');
    },
  },
};
</script>

<template>
  <div style="display: flex;" class="column is-12 has-padding-0 story-text">
    <div class="story-text__content">
      <form v-if="editable" class="has-mt-1">
        <b-field>
          <b-input custom-class="story-title-input" v-model="storyName" placeholder="Název příběhu" size="is-large"></b-input>
        </b-field>
      </form>
      <div v-if="!editable" style="display: flex; align-items: center; justify-content: space-evenly;">
        <h1 style="flex: 1;" class="story-title-input has-mt-1">{{ storyName }}</h1>
        <b-button @click="handleStartEditing" v-if="showEditButton" size="is-small" icon-left="pencil">Upravit</b-button>
      </div>

      <menu-bar
        :saving="saving"
        :editor="editor" v-if="editable">
        <template v-slot:cancel-button>
          <b-button
            v-if="storyId"
            size="is-small"
            class="menubar__button"
            @click="handleCancelEditing">Zrušit
          </b-button>
        </template>
        <template v-slot:submit-button>
          <b-button
            :loading="saving"
            size="is-small"
            class="menubar__button"
            type="is-primary"
            @click="handleSave">Uložit
          </b-button>
        </template>
      </menu-bar>
      <menu-bubble
        @changed="handleContentUpdate"
        @click.native="handleContentUpdate" :editor="editor" v-if="editable" />

      <editor-content :class="{'editable': this.editable}" style="flex: 1; overflow: auto;" class="editor has-mt-1 has-mb-1" :editor="editor" />

    </div>

  </div>
</template>

<!-- can't be scoped or title styles would not work -->
<style lang="scss">
@import "../../node_modules/bulma/bulma.sass";

a[data-cs-lat],
a[data-cs-bbox] {
  color: $primary;
  cursor: pointer;
  text-decoration: underline;
}

a[data-cs-bbox] {
  border: 1px dashed $bbox-mark-border-color;
  padding: 1px;
  text-decoration: none;
}

.editor {
  h2, h3, h4 {
    @extend .title;
    color: $text;
  }

  h2 {
    @extend .is-2;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  h3 {
    @extend .is-3;
    margin-bottom: .7rem;
    margin-top: .7rem;
  }

  h4 {
    @extend .is-4;
    margin-bottom: .4rem;
    margin-top: .4rem;
  }
}

.story-text {
  display: flex;
  flex: 1 !important;
  overflow: auto;
}

.story-text__content {
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
}

.story-title-input,
.story-title-input:active,
.story-title-input:focus {
  border: 0;
  border-radius: 0;
  border-bottom: 4px dotted $primary;
  box-shadow: none;
  color: $text;
  font-size: 3rem !important;
  height: 5rem;
  line-height: 3.5rem;
  padding-bottom: .5rem;
  padding-left: 5px;
}

.editor {
  padding: 1rem;
}

.editor.editable {
  border: 1px solid #d7d7d7;
  border-radius: 6px;
  background: #f0eeee;
  margin-bottom: 1rem;
}

.ProseMirror {
  min-height: 100%;
}

.ProseMirror-focused {
  outline: none;
}
</style>
