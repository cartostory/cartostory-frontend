<script>
import { EditorMenuBar } from 'tiptap';
import { mapState } from 'vuex';

import StoryJson from '@/components/StoryJson.vue';

export default {
  name: 'MenuBar',
  components: {
    EditorMenuBar,
  },
  props: ['editor'],
  computed: {
    ...mapState({
      name: state => state.story.name,
      text: state => state.story.text,
      track: state => state.story.track,
    }),
    isDisabled() {
      return !(this.name && this.text && this.track);
    },
  },
  methods: {
    handleSave() {
      const result = {
        name: this.name,
        text: this.text,
        track: this.track,
      };
      const string = JSON.stringify(result);
      this.$buefy.modal.open({
        component: StoryJson,
        parent: this,
        customClass: 'modal-result',
        props: {
          content: string,
        },
      });
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
        :disabled="isDisabled"
        style="margin-left: auto;"
        :title="isDisabled ? 'Příběh zatím nelze uložit. Nahrajte prosím trasu, příběh pojmenujte a přidejte popis.' : 'Uložit příběh'"
        size="is-small"
        class="menubar__button"
        type="is-primary"
        @click="handleSave">Uložit
      </b-button>
    </div>
  </editor-menu-bar>
</template>

<style lang="scss">
.modal-result {
  z-index: 10000;
}
</style>
