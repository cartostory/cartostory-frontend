<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import CsStory from './components/CsStory.vue';
import CsMap from './components/CsMap.vue';

export default {
  name: 'app',
  components: {
    CsStory,
    CsMap,
    PulseLoader,
  },
  mounted() {
    this.$store.dispatch('loadStory');
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
  },
  methods: {
    toggleSync() {
      this.$store.dispatch('toggleSync');
    },
  },
};
</script>

<template>
  <div v-if="!(track || story)" class="spinner">
    <pulse-loader></pulse-loader>
  </div>
  <div v-else id="app">
    <a class='toggle-sync' @click="toggleSync">
      <span v-if="enableSync">on</span>
      <span v-else>off</span>
    </a>
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
