<script>
import { EditorMenuBar } from 'tiptap';

export default {
  name: 'MenuBar',
  components: {
    EditorMenuBar,
  },
  props: ['editor', 'saving'],
  methods: {
    /*
     * Lets user paste image url and inserts the image into the story.
     * @param {Function} tiptap image command
     */
    showImagePrompt(command) {
      // eslint-disable-next-line no-alert
      const src = prompt('Enter the url of your image here');
      if (src) {
        command({ src });
      }
    },
  },
};
</script>

<template>
  <editor-menu-bar
    class="has-mt-1"
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
        title="Obrázek"
        size="is-small"
        class="menubar__button"
        :class="{ 'is-active': isActive.image() }"
        @click="showImagePrompt(commands.image)">
        <b-icon size="is-small" icon="image-filter-hdr" custom-class="image-icon"></b-icon>
      </b-button>

      <div style="margin-left: auto;"></div>
      <slot name="cancel-button"></slot>
      <slot name="submit-button"></slot>
    </div>
  </editor-menu-bar>
</template>

<style lang="scss" scoped>
</style>
