<script>
import { REMOVE_ERROR } from '@/store/mutations';

export default {
  name: 'CsNotification',
  computed: {
    errors() {
      this.$store.state.errors.forEach(e => {
        this.$buefy.snackbar.open({
          indefinite: true,
          position: 'is-top-right',
          type: 'is-danger',
          message: `<strong>${e.title}</strong><br/><p>${e.message}</p>`,
          onAction: () => {
            this.$store.commit(REMOVE_ERROR, e);
          },
        });
        this.$store.commit(REMOVE_ERROR, e);
      });
      return this.$store.state.errors;
    },
  },
  watch: {
    errors() {
      return this.errors;
    },
  },
};
</script>

<template>

</template>

