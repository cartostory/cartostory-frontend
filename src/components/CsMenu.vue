<script>
export default {
  mounted() {
    console.log(this.$auth);
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<template>
  <b-navbar :shadow="true" :transparent="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }"><strong>Cartostory</strong></b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">O projektu</b-navbar-item>
      <b-navbar-item v-if="$auth.isAuthenticated" tag="router-link" :to="{ path: '/story/create' }">Napsat příběh</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button v-if="!$auth.isAuthenticated" type="is-primary" tag="router-link" to="/login" outlined>Přihlásit</b-button>
        </div>
      </b-navbar-item>

      <b-navbar-dropdown :right="true" :arrowless="true" v-if="!$auth.loading && $auth.isAuthenticated" >
        <template slot="label">
          <span class="has-text-grey-lighter">{{ $auth.user.name }}</span>
          <figure v-if="$auth.user.picture" class="has-pl-1 image">
            <img class="is-rounded" :src="$auth.user.picture" />
          </figure>
        </template>
        <b-navbar-item href="#">
          <b-button type="is-text" outlined @click="logout">Odhlásit</b-button>
        </b-navbar-item>
      </b-navbar-dropdown>

    </template>
  </b-navbar>
</template>

<style lang="scss" scoped>
</style>
