<script>
import { UPDATE_STORY_URL } from '@/store/mutations.js';

export default {
  name: 'CsLoadStoryForm',
  data() {
    return {
      currentStory: undefined,
    };
  },
  computed: {
    availableStories() {
      return this.$store.state.availableStories;
    },
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
    handleSubmit() {
      this.$store.dispatch('loadStory');
      this.$router.push('/');
    },
    handleStorySelect(event) {
      const story = this.availableStories.find(story => story.storyName === this.currentStory);

      if (story) {
        this.storyUrl = story.storyUrl;
      }
    },
  }
};
</script>

<template>
  <el-main>
    <el-row>
      <el-col :span="10" :offset="7">
        <h1>Cartostory</h1>
        <el-form label-width="120px">

          <el-form-item v-if="availableStories.length > 0" label="Načíst příběh">
            <el-select placeholder="Příběh" v-model="currentStory" @change="handleStorySelect">
              <el-option
                v-for="story in availableStories"
                :key="story.storyName"
                :label="story.storyName"
                :value="story.storyName"
                ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="URL příběhu">
            <el-input v-model="storyUrl" type="text"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button :disabled="disabledSubmit" type="primary" @click="handleSubmit">Načíst</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<style scoped>
.el-form {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 2rem;
}

</style>
