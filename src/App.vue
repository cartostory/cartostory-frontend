<script>
export default {
  name: 'app',
  mounted() {
    if (!this.ready) {
      this.$router.push('/load').catch((e) => {
        console.log(e);
      });
    }
  },
  computed: {
    ready() {
      return this.story && this.story.name;
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
