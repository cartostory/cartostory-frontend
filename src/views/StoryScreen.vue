<script>
import { mapState } from 'vuex';

import CsEditor from '@/components/CsEditor.vue';
import CsMap from '@/components/CsMap.vue';
import { UPDATE_LOADING } from '@/store/mutations';

export default {
  name: 'story-screen',
  components: {
    CsEditor,
    CsMap,
  },
  data() {
    return {
      storyId: undefined,
    };
  },
  computed: {
    editable() {
      return this.$store.state.editable;
    },
    token() {
      return this.$store.state.auth.token;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  watch: {
    async token(value) {
      if (value) {
        await this.$store.dispatch('loadStory', { storyUrl: this.storyId, token: value });
        this.$store.commit(UPDATE_LOADING, false);
      }
    },
  },
  async created() {
    this.storyId = this.$route.params && this.$route.params.id;

    if (this.storyId) {
      this.$store.commit(UPDATE_LOADING, true);
    }
  },
};
</script>

<template>
  <div v-if="!loading" class="container-fluid story-form">
    <div class="wrapper columns has-margin-0">
      <cs-map></cs-map>

      <div style="display:flex; flex-direction: column; width: 100%;">
        <cs-editor></cs-editor>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - #{$navbar-height});
}
</style>
