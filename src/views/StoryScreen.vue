<script>
import CsEditor from '@/components/CsEditor.vue';
import CsMap from '@/components/CsMap.vue';

export default {
  name: 'story-screen',
  components: {
    CsEditor,
    CsMap,
  },
  data() {
    return {
      loading: true,
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
  },
  watch: {
    async token(value) {
      if (value && this.loading) {
        await this.$store.dispatch('loadStory', { storyUrl: this.storyId, token: value });
        this.loading = !this.loading;
      }
    },
  },
  async created() {
    this.storyId = this.$route.params && this.$route.params.id;
  },
  mounted() {
    this.loading = this.$router.currentRoute.path !== '/story/create';
  },
};
</script>
<template>
  <div class="container-fluid story-form">
    <div class="wrapper columns has-margin-0">
      <cs-map></cs-map>

      <div style="display:flex; flex-direction: column; width: 100%;">
        <cs-editor v-if="$store.state.story.text || !loading"></cs-editor>
      </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - #{$navbar-height});
}
</style>
