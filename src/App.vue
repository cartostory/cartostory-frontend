<script>
export default {
  name: 'app',
  beforeMount() {
    if (!this.track.url || !this.story.url) {
      this.$router.push('/config');
    }
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
};
</script>

<template>
  <div id="app">
    <router-view/>
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
  #screen,
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
