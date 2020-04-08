<script>
export default {
  name: 'app',
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
