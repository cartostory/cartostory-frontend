<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { Heading } from 'tiptap-extensions';

import FeatureMark from '@/components/editor/FeatureMark';
import { STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config.js'

export default {
  name: 'Editor',
  props: {
    onGetStoryText: Function,
    onAddFeatureMark: Function,
    onRemoveFeatureMark: Function,
    onStoryLinkClick: Function,
  },
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  data() {
    return {
      STORY_LINK_CLICK_EVENT,
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new FeatureMark(),
          new Heading({
            levels: [2, 3, 4], // leave <h1> for the story title
          }),
        ],
        content: '',
        onUpdate: function(payload) {
          this.onGetStoryText(payload.getJSON());
        }.bind(this),
      }),
    };
  },
  methods: {
    /*
     * Checks if selected text already has the feature mark on the map.
     * It renders remove button if true or add button otherwise.
     * @param {object} selected text attributes
     * @returns {boolean}
     */
    isNewFeatureMarkButtonVisible(attrs) {
      return attrs && attrs[STORY_LINK_LAT_ATTR];
    },
  },

  beforeDestroy() {
    this.editor.destroy();
  },
}
</script>

<template>
  <el-col>
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
          @click="onAddFeatureMark(commands.featureMark)"
          icon="el-icon-location-outline"
          ></el-button>

          <el-button
            v-if="isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="onRemoveFeatureMark(getMarkAttrs('featureMark'), commands.featureMark)"
            icon="el-icon-delete-location"
            ></el-button>

      </div>
    </editor-menu-bubble>

    <editor-content @[STORY_LINK_CLICK_EVENT]="onStoryLinkClick" v-if="editor" class="editor" :editor="editor" />
  </el-col>
</template>

<style lang="scss">
.editor-menu-bar {
  margin-left: 1rem;
}

.story-form__story .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid gray;
  font-size: 3rem;
  height: 4rem;
  line-height: 3.5rem;
}

.story-form__story .editor {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 2.5rem;
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
