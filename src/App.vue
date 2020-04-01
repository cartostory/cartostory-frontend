<script>
export default {
  name: 'app',
  mounted() {
    if (!this.track.data.url || !this.story.data.url || !this.features.data.url) {
      this.$router.push('/load');
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
  },
};
</script>

<template>
  <el-container id="app">
    <router-view/>
  </el-container>
</template>

<style lang="scss">
  html,
  body,
  #screen,
  #app {
    height: 100%;
    overflow-y: hidden;
    margin: 0;
    padding: 0;
  }

  #app {
    color: #2c3e50;
  }

</style>
