<script>
export default {
  name: 'CsCreateStoryForm',
  data() {
    return {
      storyName: '',
    };
  },
};
</script>
<template>
  <el-container class="story-form">
    <el-col :span="12">
      todo map
    </el-col>
    <el-col class="story-form__story" :span="12">
      <el-form>
        <el-form-item>
          <el-input class="story-name" v-model="storyName" placeholder="Název příběhu..."></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-container>
</template>

<!-- don't scope to overwrite element ui -->
<style lang="scss">
.story-form__story {
  border: 1px solid tomato;
}

.story-form__story .el-form {
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.story-form__story .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid gray;
  font-size: 3rem;
  height: 4rem;
  line-height: 3.5rem;
}
</style>
