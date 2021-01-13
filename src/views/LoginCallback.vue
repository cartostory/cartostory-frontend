<script>
import { mapActions } from 'vuex';
import { signup as authSignup } from '@/services/signup';
import { UPDATE_ERRORS } from '@/store/mutations';

export default {
  name: 'LoginCallback',
  data() {
    return {
      loadingSignup: false,
    };
  },
  computed: {
    loading() {
      return this.$auth.loading;
    },
  },
  watch: {
    loading(value) {
      if (value) {
        return;
      }

      if (!this.$auth.user) {
        this.$router.push('/login');
      }

      this.signup();
    },
  },
  methods: {
    ...mapActions(['retrieveToken']),
    /*
     * If user logs in for the first time, signs him up. Redirects to landing page otherwise.
     */
    async signup() {
      await this.retrieveToken();
      const existingUser = !this.$auth.user['https://cartostory.com/is_new'];

      if (existingUser) {
        this.$router.push('/');
        return;
      }


      try {
        this.loadingSignup = true;
        await authSignup(this.$auth.user.email);
      } catch (e) {
        this.$handleSignupError(e);
      } finally {
        this.loadingSignup = false;
        this.$router.push('/');
      }
    },

    $handleSignupError(e) {
      if (e.response.data.message !== 'User already exists') {
        this.$store.commit(UPDATE_ERRORS, {
          title: 'Chyba',
          message: 'Pokus o založení uživatelského účtu selhal.' || e.response.data.message,
        });
      }
    },
  },
};
</script>

<template>
  <div v-if="loadingSignup" class="has-text-centered has-mt-2">Ukládají se informace o uživatelském
  účtu&hellip;</div>
</template>

<style>

</style>
