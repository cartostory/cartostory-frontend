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
  mounted() {
    if (this.readyAndNotDownloadedYet) {
      this.$store.dispatch('loadStory');
    }
  },
  computed: {
    features() {
      return this.$store.state.features;
    },
    track() {
      return this.$store.state.track;
    },
    story() {
      return this.$store.state.story;
    },
    ready() {
      return this.track.data.track && this.story.data.story;
    },
    readyAndNotDownloadedYet() {
      return this.features.data.url && this.track.data.url && this.story.data.url && !this.ready;
    },
  },
};
</script>

<template>
  <el-container id="screen">
    <pulse-loader class="spinner" v-if="!ready" color="#2c3e50"></pulse-loader>
    <el-col v-if="ready" :span="12">
      <cs-map></cs-map>
    </el-col>
    <el-col v-if="ready" :span="12">
      <cs-story></cs-story>
    </el-col>
  </el-container>
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
