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
      ready: false,
    };
  },
  computed: {
    editable() {
      return this.$store.state.editable;
    },
  },
  mounted() {
    this.ready = this.$router.currentRoute.path === '/story/create';
  },
};
</script>
<template>
  <div class="container-fluid story-form">
    <div class="wrapper columns has-margin-0">
      <cs-map></cs-map>

      <div style="display:flex; flex-direction: column; width: 100%;">
        <cs-editor v-if="$store.state.story.text || ready"></cs-editor>
      </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - #{$navbar-height});
}
</style>
