<script>
import CsMenu from '@/components/CsMenu.vue';
import CsNotification from '@/components/CsNotification.vue';

export default {
  name: 'app',
  components: {
    CsMenu,
    CsNotification,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<template>
  <div class="section" id="js-app">
    <cs-menu />
    <router-view/>
    <cs-notification/>
    <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
  </div>
</template>

<style lang="scss">
</style>
