<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import { SCROLL_CONTAINER_ID } from '@/config/config';
import CsStory from './CsStory.vue';
import CsMap from './CsMap.vue';

export default {
  name: 'CsScreen',
  components: {
    CsStory,
    CsMap,
    PulseLoader,
  },
  data() {
    return {
      SCROLL_CONTAINER_ID,
    };
  },
  mounted() { },
  computed: {
    ready() {
      return this.$store.state.story.track;
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
      <cs-story :id="SCROLL_CONTAINER_ID"></cs-story>
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
