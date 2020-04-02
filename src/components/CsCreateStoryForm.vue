<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { markInputRule, toggleMark } from 'tiptap-commands';
import { Bold, Heading, Link } from 'tiptap-extensions';

import FeatureMark from '@/editor/FeatureMark';

export default {
  name: 'CsCreateStoryForm',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Bold(),
          new FeatureMark(),
          new Heading({
            levels: [1, 2, 3,],
          }),
          new Link(),
        ],
        content:  '<p>This is just a boring paragraph</p>',
      }),
      storyName: '',
    };
  },
  methods: {
    test(fn) {
      console.log(fn);
      fn({dataCsId: 'test'});
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<template>
  <el-container class="story-form">
    <el-col :span="12">
      todo map
    </el-col>
    <el-col class="story-form__story" :span="12">
      <el-form>
        <el-form-item>
          <el-input class="story-name" v-model="storyName" placeholder="Název příběhu..."></el-input>
        </el-form-item>
      </el-form>

      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="editor-menu-bar">
          <el-button
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
            >H1
          </el-button>

          <el-button
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            >H2
          </el-button>

          <el-button
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
            >H3
          </el-button>

        </div>
      </editor-menu-bar>

      <editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, menu }">
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">

          <el-button
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="commands.featureMark({'data-cs-id': 'test'})"
            icon="el-icon-location-outline"
          ></el-button>

        </div>
      </editor-menu-bubble>

      <editor-content v-if="editor" class="editor" :editor="editor" />
    </el-col>
  </el-container>
</template>

<!-- don't scope to overwrite element ui -->
<style lang="scss">
.story-form__story {
  border: 1px solid tomato;
}

.story-form__story .el-form {
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

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
  border: 1px solid tomato;
  margin-left: 1rem;
  margin-right: 1rem;
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
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
    background: transparent;
    border: 0;
    color: white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba(white, 0.1);
    }

    &.is-active {
      background-color: rgba(white, 0.2);
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
