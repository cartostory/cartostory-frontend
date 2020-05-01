<script>
export default {
  name: 'Login',
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<template>
  <div class="columns background has-no-margin">
    <div class="column is-half is-offset-one-quarter">
      <div class="box has-mt-2">
        <h1 class="title is-size-1 has-text-centered">Přihlášení</h1>
        <p>Po přihlášení budete moct psát příběhy a sdílet je se svými přáteli.</p>
        <p>V současné době podporujeme přihlášení pouze prostřednictvím účtu Google. K&nbsp;autentizaci
          využíváme službu <a href="https://auth0.com">auth0</a>. Po kliknutí na tlačítko budete
          přesměrováni na stránky služby.</p>
        <p>Pro přihlášení využíváme jen nezbytné minimum údajů o vašem účtu Google.</p>
        <div class="has-mt-1" v-if="!$auth.loading">
          <b-button v-if="!$auth.isAuthenticated" @click="login" type="is-primary" expanded>Přejít na přihlášení</b-button>
          <b-button v-if="$auth.isAuthenticated" @click="logout">Log out</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
