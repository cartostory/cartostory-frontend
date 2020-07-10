<script>
import { mapActions, mapState } from 'vuex';

import { loadMany } from '@/services/story';
import { UPDATE_LOADING } from '@/store/mutations';

export default {
  name: 'StoryList',
  data() {
    return {
      stories: [],
    };
  },
  async created() {
    this.$store.commit(UPDATE_LOADING, true);
    this.stories = await this.getStories();
    this.$store.commit(UPDATE_LOADING, false);
  },
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapActions(['retrieveToken']),
    async getStories() {
      await this.retrieveToken();
      const result = await loadMany();
      return result;
    },
  },
};
</script>

<template>
  <div class="background">
    <div v-if="!loading" class="container has-padding-2">
      <div v-if="stories.length === 0">
        <h1 class="title is-size-1 has-text-centered">Zatím jste nenapsali žádný příběh.</h1>
      </div>
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
