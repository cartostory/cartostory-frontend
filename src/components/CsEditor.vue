<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { Heading } from 'tiptap-extensions';

import FeatureMark from '@/components/editor/FeatureMark';
import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config.js'
import { UPDATE_STORY_NAME, UPDATE_STORY_TEXT } from '@/store/mutations.js';

export default {
  name: 'CsEditor',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  data() {
    return {
      keepInBounds: true,
      editor: undefined,
    };
  },
  computed: {
    highlightedFeatureMark() {
      return this.$store.state.highlightedFeatureMark;
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
    highlightedFeatureMark() {
      this.scroll();
    }
  },
  mounted() {
    this.editor = this.$createEditor();
  },
  methods: {
    scroll() {
      const lat = this.highlightedFeatureMark[STORY_LINK_LAT_ATTR];
      const lng = this.highlightedFeatureMark[STORY_LINK_LNG_ATTR];
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
      this.$emit('add-feature-mark', fn);
    },

    $createEditor() {
      return new Editor({
        extensions: [
          new FeatureMark(),
          new Heading({
            levels: [2, 3, 4], // leave <h1> for the story title
          }),
        ],
        content: this.$store.state.story.text,
        onUpdate: function(payload) {
          this.$store.commit(UPDATE_STORY_TEXT, payload);
        }.bind(this),
      });
    },
  },

  beforeDestroy() {
    this.editor.destroy();
  },
}
</script>

<template>
  <el-col>

    <el-form>
      <el-form-item>
        <el-input class="story-name" v-model="storyName" placeholder="Název příběhu..."></el-input>
      </el-form-item>
    </el-form>

    <editor-menu-bar style="position: fixed; z-index: 10; width: 100%; background: white;" :editor="editor" v-slot="{ commands, isActive }">
      <div class="editor-menu-bar">
        <el-button
          title="Nadpis 1. kategorie"
          size="mini"
          type="plain"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })">
          H1
        </el-button>

        <el-button
          title="Nadpis 2. kategorie"
          size="mini"
          type="plain"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })">
          H2
        </el-button>

        <el-button
          title="Nadpis 3. kategorie"
          size="mini"
          type="plain"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          @click="commands.heading({ level: 4 })">
          H3
        </el-button>
      </div>
    </editor-menu-bar>

    <editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, getMarkAttrs, isActive, menu }">
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">

        <el-button
          v-if="!isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
          class="menububble__button"
          :class="{ 'is-active': isActive.featureMark() }"
          @click="handleAddFeatureMarkClick(commands.featureMark)"
          icon="el-icon-location-outline"
          ></el-button>

          <el-button
            v-if="isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="commands.featureMark()"
            icon="el-icon-delete-location"
            ></el-button>

      </div>
    </editor-menu-bubble>

    <editor-content v-if="editor" class="editor" :editor="editor" />
  </el-col>
</template>

<style lang="scss">
.editor-menu-bar {
  margin-left: 1rem;
}

.el-form {
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.story-name .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid gray;
  font-size: 3rem;
  height: 4rem;
  line-height: 3.5rem;
}

.editor {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 4.5rem;
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
  background: #F56C6C;
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
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
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
