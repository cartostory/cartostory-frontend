<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import CsStory from './CsStory.vue';
import CsMap from './CsMap.vue';

export default {
  name: 'CsScreen',
  components: {
    CsStory,
    CsMap,
    PulseLoader,
  },
  computed: {
    track() {
      return this.$store.state.track;
    },
    story() {
      return this.$store.state.story;
    },
    ready() {
      return this.track.data.track && this.story.data.story;
    }
  },
  methods: {
    toggleSync() {
      this.$store.dispatch('toggleSync');
    },
  },
};
</script>

<template>
  <div id="screen">
    <div v-if="!ready" class="spinner">
      <pulse-loader></pulse-loader>
    </div>
    <cs-map v-if="ready"></cs-map>
    <cs-story v-if="ready" id="story-container"></cs-story>
  </div>
</template>

<style lang="scss" scoped>
  .spinner {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
</style>
