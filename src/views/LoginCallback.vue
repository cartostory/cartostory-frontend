<script>
import axiosInstance from '@/services/axios';
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
    /*
     * If user logs in for the first time, signs him up. Redirects to landing page otherwise.
     */
    async signup() {
      if (!this.$auth.user['https://cartostory.com/is_new']) {
        this.$router.push('/');
        return;
      }

      this.loadingSignup = true;
      const token = await this.$auth.getTokenSilently();
      this.$setAuthorizationHeader(`Bearer ${token}`);

      try {
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

    $setAuthorizationHeader(token) {
      axiosInstance.defaults.headers.common.Authorization = token;
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
