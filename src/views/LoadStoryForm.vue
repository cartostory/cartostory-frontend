<script>
import deburr from 'lodash.deburr';
import { mapState } from 'vuex';

import { UPDATE_ERRORS, UPDATE_LOADING, UPDATE_STORY_URL } from '@/store/mutations';

export default {
  name: 'LoadStoryForm',
  data() {
    return {
      currentStory: undefined,
    };
  },
  computed: {
    ...mapState({
      availableStories: state => state.availableStories,
      storyName: state => state.story.name,
      storyText: state => state.story.text,
    }),
    disabledSubmit() {
      return !this.storyUrl;
    },
    storyUrl: {
      get() {
        return this.$store.state.storyUrl;
      },
      set(value) {
        this.$store.commit(UPDATE_STORY_URL, value);
      },
    },
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$store.dispatch('loadStory');
        const title = deburr(this.storyName).toLowerCase();
        this.$router.push(`/story/read/${title}`);
      } catch (e) {
        this.$store.commit(UPDATE_ERRORS, {
          title: 'Příběh se nepodařilo nahrát',
          message: 'Zkontrolujte jeho adresu.',
        });
      } finally {
        this.$store.commit(UPDATE_LOADING, false);
      }
    },

    handleStorySelect(storyName) {
      const story = this.availableStories.find(s => s.name === storyName);

      if (story) {
        this.storyUrl = story.storyUrl;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h1 class="title is-1 has-text-weight-normal has-text-centered has-mt-2">Cartostory</h1>

        <div class="card has-padding-1">
          <div class="card-content">
          <b-field v-if="availableStories.length > 0" label="Nahrát příběh">
            <b-select placeholder="Příběh" expanded @input="handleStorySelect">
              <option
                v-for="story in availableStories"
                :key="story.name"
                :value="story.name">{{story.name}}
              </option>
            </b-select>
          </b-field>

          <b-field label="URL příběhu">
            <b-input v-model="storyUrl" type="text" expanded></b-input>
          </b-field>

          <b-button :disabled="disabledSubmit" type="is-primary" @click="handleSubmit">Načíst</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
