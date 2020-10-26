<script>
import { mapActions, mapState } from 'vuex';

import CsEditor from '@/components/CsEditor.vue';
import CsMap from '@/components/CsMap.vue';
import { UPDATE_LOADING } from '@/store/mutations';

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
      loading: state => state.loading,
    }),
  },
  methods: {
    ...mapActions([
      'retrieveToken',
      'loadStory',
    ]),
    async getStory() {
      await this.loadStory(this.storyId);
    },
  },
  async created() {
    this.storyId = this.$route.params && this.$route.params.id;
    await this.retrieveToken();

    if (this.storyId) {
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
