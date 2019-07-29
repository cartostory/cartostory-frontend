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
    enableSync() {
      return this.$store.state.enableSync;
    },
    ready() {
      return this.track.data && this.story.data;
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
    <a v-if="ready" class='toggle-sync' @click="toggleSync">
      <span v-if="enableSync">on</span>
      <span v-else>off</span>
    </a>
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

  .toggle-sync {
    background: #42b983;
    border-radius: 30px;
    cursor: pointer;
    display: block;
    position: absolute;
    left:-webkit-calc(50% - 15px);
    left:-moz-calc(50% - 15px);
    left:calc(50% - 15px);
    top:-webkit-calc(50% - 15px);
    top:-moz-calc(50% - 15px);
    top:calc(50% - 15px);
    height: 30px;
    line-height: 25px;
    text-align:center;
    width: 30px;
    z-index:1000;
  }
</style>
