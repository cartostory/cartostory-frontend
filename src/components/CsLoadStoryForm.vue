<script>
export default {
  name: 'CsLoadStoryForm',
  data() {
    return {
      currentStory: undefined,
      trackUrl: undefined,
      storyName: undefined,
      storyUrl: undefined,
      featuresUrl: undefined,
    };
  },
  computed: {
    availableStories() {
      return this.$store.state.availableStories;
    },
    disabledSubmit() {
      return !this.trackUrl || !this.storyUrl || !this.featuresUrl || !this.storyName;
    },
  },
  methods: {
    handleSubmit() {
      const urlPayload = {
        trackUrl: this.trackUrl,
        storyUrl: this.storyUrl,
        featuresUrl: this.featuresUrl,
      };
      this.$store.dispatch('setUrls', urlPayload);
      this.$store.dispatch('setStoryName', this.storyName);
      this.$store.dispatch('loadStory');
      this.$router.push('/');
    },
    handleStorySelect(event) {
      const story = this.availableStories.find(story => story.storyName === this.currentStory);

      if (story) {
        this.featuresUrl = story.featuresUrl;
        this.storyUrl = story.storyUrl;
        this.storyName = story.storyName;
        this.trackUrl = story.trackUrl;
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

          <el-form-item label="Název příběhu">
            <el-input v-model="storyName" type="text"></el-input>
          </el-form-item>

          <el-form-item label="URL trasy">
            <el-input v-model="trackUrl" type="text"></el-input>
          </el-form-item>

          <el-form-item label="URL příběhu">
            <el-input v-model="storyUrl" type="text"></el-input>
          </el-form-item>

          <el-form-item label="URL míst">
            <el-input v-model="featuresUrl" type="text"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button :disabled="disabledSubmit" type="primary" @click="handleSubmit">Načíst</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
  <!--<div class="container">-->
    <!--<h1>Cartostory</h1>-->
    <!--<div v-if="availableStories.length > 0" class="form-block">-->
      <!--<label>existing story:</label>-->
      <!--<select v-model="currentStory" @change="handleStorySelect">-->
        <!--<option v-for="story in availableStories">{{ story.storyName }}</option>-->
      <!--</select>-->
    <!--</div>-->
    <!--<div class="form-block">-->
      <!--<label>story name:</label>-->
      <!--<input v-model="storyName" type="text">-->
    <!--</div>-->
    <!--<div class="form-block">-->
      <!--<label>track file URL:</label>-->
      <!--<input v-model="trackUrl" type="text">-->
    <!--</div>-->
    <!--<div class="form-block">-->
      <!--<label>story file URL:</label>-->
      <!--<input v-model="storyUrl" type="text">-->
    <!--</div>-->
    <!--<div class="form-block">-->
      <!--<label>features file URL:</label>-->
      <!--<input v-model="featuresUrl" type="text">-->
    <!--</div>-->
    <!--<div class="form-block">-->
      <!--<button @click="onSubmit">Load</button>-->
    <!--</div>-->
  <!--</div>-->
</template>

<style scoped>
.el-form {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 2rem;
}

</style>
