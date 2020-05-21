<script>
import CsMenu from '@/components/CsMenu.vue';
import CsNotification from '@/components/CsNotification.vue';
import { UPDATE_TOKEN } from '@/store/mutations';

import { getInstance } from './auth';

export default {
  name: 'app',
  components: {
    CsMenu,
    CsNotification,
  },
  created() {
    console.log('root created');
    this.init(this.loadTokenIntoStore);
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    init(done) {
      const instance = getInstance();
      instance.$watch('loading', async (loading) => {
        if (!loading && instance.isAuthenticated) {
          done(instance);
        }
      });
    },
    async loadTokenIntoStore(auth0Instance) {
      const token = await auth0Instance.getTokenSilently();
      this.$store.commit(UPDATE_TOKEN, token);
      console.log('token definitely ready');
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
