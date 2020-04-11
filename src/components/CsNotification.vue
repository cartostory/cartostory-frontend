<script>
import { REMOVE_ERROR } from '@/store/mutations';

export default {
  name: 'CsNotification',
  computed: {
    errors() {
      this.$store.state.errors.forEach(e => {
        this.$notify({
          type: 'error',
          title: e.title,
          message: e.message,
          onClose: () => {
            this.$store.commit(REMOVE_ERROR, e);
          },
          duration: 0,
        });
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

