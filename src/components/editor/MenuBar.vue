<script>
import { EditorMenuBar } from 'tiptap';

export default {
  name: 'MenuBar',
  components: {
    EditorMenuBar,
  },
  props: ['editor'],
  methods: {
    handleSave() {
      const result = {
        name: this.$store.state.story.name,
        text: this.$store.state.story.text,
        track: this.$store.state.story.track,
      };
      console.log('handleSave', result);
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
        style="margin-left: auto;"
        title="Uložit příběh"
        size="is-small"
        class="menubar__button"
        type="is-primary"
        @click="handleSave">Uložit
      </b-button>
    </div>
  </editor-menu-bar>
</template>

<style>

</style>
