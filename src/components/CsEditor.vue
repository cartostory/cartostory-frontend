<script>
import { Editor, EditorContent } from 'tiptap';
import { Heading, Image } from 'tiptap-extensions';
import { mapState } from 'vuex';

import BboxMark from '@/components/editor/BboxMark';
import FeatureMark from '@/components/editor/FeatureMark';
import MenuBar from '@/components/editor/MenuBar.vue';
import MenuBubble from '@/components/editor/MenuBubble.vue';
import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import { UPDATE_STORY_NAME, UPDATE_STORY_TEXT } from '@/store/mutations';

export default {
  name: 'CsEditor',
  components: {
    EditorContent,
    MenuBubble,
    MenuBar,
  },
  data() {
    return {
      contentPlaceholder: 'Můžete začít psát...',
      editor: undefined,
      keepInBounds: true,
    };
  },
  computed: {
    ...mapState({
      editable: state => state.editable,
      highlightedLatLng: state => state.highlightedLatLng,
      shouldTextScroll: state => state.shouldTextScroll,
    }),
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
    highlightedLatLng() {
      this.scrollToHighlightedLatLng();
    },
  },
  mounted() {
    this.editor = this.$createEditor();
  },
  methods: {
    /*
     * Scrolls to the highlighted feature mark.
     */
    scrollToHighlightedLatLng() {
      if (!this.highlightedLatLng || !this.shouldTextScroll) {
        return;
      }

      const { lat, lng } = this.highlightedLatLng;
      const textMark = document.querySelector(`[${STORY_LINK_LAT_ATTR}='${lat}'], [${STORY_LINK_LNG_ATTR}='${lng}']`);

      this.$scrollTo(textMark, undefined, {
        container: document.querySelector('.editor'),
        offset: -50,
      });
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
        content: this.$store.state.story.text || this.contentPlaceholder,
        onUpdate: (payload) => {
          this.$store.commit(UPDATE_STORY_TEXT, payload);
        },
      });
    },
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<template>
  <div class="column is-12 has-padding-0 story-text">
    <div class="story-text__content">
      <form v-if="editable" class="has-mt-1">
        <b-field>
          <b-input custom-class="story-title-input" v-model="storyName" placeholder="Název příběhu" size="is-large"></b-input>
        </b-field>
      </form>
      <h1 class="story-title-input has-mt-1" v-if="!editable">{{ storyName }}</h1>

      <menu-bar :editor="editor" v-if="editable" />
      <menu-bubble :editor="editor" v-if="editable" />

      <editor-content :class="{'editable': this.editable}" style="flex: 1; overflow: auto;" class="editor" :editor="editor" />

    </div>

  </div>
</template>

<style lang="scss">
@import "../assets/scss/variables.scss";
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
