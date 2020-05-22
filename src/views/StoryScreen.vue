<script>
import { mapActions, mapState } from 'vuex';

import CsEditor from '@/components/CsEditor.vue';
import CsMap from '@/components/CsMap.vue';
import { UPDATE_LOADING, UPDATE_TOKEN } from '@/store/mutations';

export default {
  name: 'story-screen',
  components: {
    CsEditor,
    CsMap,
  },
  props: {
    editorKey: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      storyId: undefined,
    };
  },
  computed: {
    ...mapState({
      editable: state => state.editable,
      loading: state => state.loading,
      token: state => state.auth.token,
    }),
  },
  methods: {
    ...mapActions([
      'retrieveToken',
      'loadStory',
    ]),
    async getStory() {
      const token = await this.retrieveToken();
      await this.loadStory({ storyUrl: this.storyId, token });
    },
  },
  async created() {
    this.storyId = this.$route.params && this.$route.params.id;

    if (this.storyId) {
      this.$store.commit(UPDATE_LOADING, true);
      this.getStory();
    }
  },
};
</script>

<template>
  <div v-if="!loading" class="container-fluid story-form">
    <div class="wrapper columns has-margin-0">
      <cs-map></cs-map>

      <div style="display:flex; flex-direction: column; width: 100%;">
        <cs-editor :key="editorKey"></cs-editor>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - #{$navbar-height});
}
</style>
