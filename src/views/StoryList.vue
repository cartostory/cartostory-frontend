<script>
import { loadMany } from '@/services/story';

export default {
  name: 'StoryList',
  data() {
    return {
      stories: undefined,
    };
  },
  async created() {
    if (this.token) {
      this.stories = await this.getStories();
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
  },
  watch: {
    async token(value) {
      if (value) {
        this.stories = await this.getStories();
      }
    },
  },
  methods: {
    async getStories() {
      const result = await loadMany(this.token);
      return result;
    },
  },
};
</script>

<template>
  <div class="background">
    <div class="container has-padding-2">
      <div class="tile is-ancestor">
        <div :key="story.id" v-for="story in stories" class="tile is-vertical is-parent">
          <div class="tile is-child box">
            <p class="title"><router-link :to="`/story/read/${story.id}`">{{ story.title }}</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
