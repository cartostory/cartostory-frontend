<script>
import CsNotification from '@/components/CsNotification.vue';

export default {
  name: 'app',
  components: {
    CsNotification,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>

<template>
  <el-container id="app">
    <router-view/>
    <cs-notification/>
    <div
      v-if="loading"
      v-loading.fullscreen.lock="loading">
    </div>
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
