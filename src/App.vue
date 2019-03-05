<script>
import CsStory from './components/CsStory.vue';
import CsMap from './components/CsMap.vue';

export default {
  name: 'app',
  components: {
    CsStory,
    CsMap,
  },
  async mounted() {
    this.$store.dispatch('loadStory');
  },
  computed: {
    track() {
      return this.$store.state.track;
    },
    story() {
      return this.$store.state.story;
    },
  },
};
</script>

<template>
  <div id="app">
    <cs-map v-if="track"/>
    <cs-story id="story-container" v-if="story"/>
  </div>
</template>

<style lang="scss">
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    margin: 0;
    padding: 0;
  }

  #app {
    color: #2c3e50;
    font-family: Georgia, "times new roman", times, serif;
  }

  .cs-story,
  .cs-map {
    width: 50%;
    position: relative;
    float: left;
  }

  .cs-map {
    height: 100%;
  }
</style>
