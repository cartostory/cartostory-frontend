<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { Heading } from 'tiptap-extensions';
import { mapState } from 'vuex';

import BboxMark from '@/components/editor/BboxMark';
import FeatureMark from '@/components/editor/FeatureMark';
import { ADD_FEATURE_MARK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import { UPDATE_STORY_NAME, UPDATE_STORY_TEXT } from '@/store/mutations';

export default {
  name: 'CsEditor',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
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
      const { lat, lng } = this.highlightedLatLng;
      const textMark = document.querySelector(`[${STORY_LINK_LAT_ATTR}='${lat}'], [${STORY_LINK_LNG_ATTR}='${lng}']`);

      this.$scrollTo(textMark, undefined, {
        container: document.querySelector('.editor'),
        offset: -50,
      });
    },

    /*
     * Checks if selected text already has the feature mark on the map.
     * It renders remove button if true or add button otherwise.
     * @param {object} selected text attributes
     * @returns {boolean}
     */
    isNewFeatureMarkButtonVisible(attrs) {
      return attrs && attrs[STORY_LINK_LAT_ATTR];
    },

    handleAddFeatureMarkClick(fn) {
      this.$emit(ADD_FEATURE_MARK_EVENT, fn);
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

      <editor-menu-bar
        class="has-mt-1"
        v-if="editable"
        style="background: white;"
        :editor="editor"
        v-slot="{ commands, isActive }">
        <div class="editor-menu-bar buttons">
          <b-button
            title="Nadpis 1. úrovně"
            size="is-small"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })">
            H1
          </b-button>
          <b-button
            title="Nadpis 2. úrovně"
            size="is-small"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })">
            H2
          </b-button>
          <b-button
            title="Nadpis 3. úrovně"
            size="is-small"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 4 }) }"
            @click="commands.heading({ level: 4 })">
            H3
          </b-button>

          <b-button
            style="margin-left: auto;"
            title="Uložit příběh"
            size="is-small"
            class="menubar__button"
            type="is-primary"
            @click="">Uložit
          </b-button>
        </div>
      </editor-menu-bar>

      <editor-menu-bubble v-if="editable" :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, getMarkAttrs, isActive, menu }">
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
          <b-button
            v-if="!isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="handleAddFeatureMarkClick(commands.featureMark)"
            icon-left="map-marker-plus"></b-button>
          <b-button
            v-if="isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="commands.featureMark()"
            icon-left="map-marker-minus"></b-button>
        </div>
    </editor-menu-bubble>

    <editor-content :class="{'editable': this.editable}" style="flex: 1; overflow: auto;" class="editor" :editor="editor" />

    </div>

  </div>
</template>

<style lang="scss">
@import "../assets/scss/variables.scss";

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

.ProseMirror-focused {
  outline: none;
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: $primary;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background-color: transparent;
    border: 0;
    color: white !important;
    border-radius: 3px;
    cursor: pointer;

    &:hover,
    &:focus,
    &.is-active {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }

    &:focus::after {
      content: 'Klikněte do mapy';
      font-size: 8px;
      line-height: 14px;
      padding-left: 7px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: white;
  }
}
</style>
