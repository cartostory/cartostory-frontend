<script>
export default {
  name: 'CsConfig',
  data() {
    return {
      trackUrl: undefined,
      storyUrl: undefined,
    };
  },
  methods: {
    onLoadRequest() {
      const payload = {
        trackUrl: this.trackUrl,
        storyUrl: this.storyUrl,
      };
      this.$store.dispatch('setUrls', payload);
      this.$router.push('/');
    }
  }
};
</script>

<template>
  <div class="container">
    <h1>Cartostory</h1>
    <div class="form-block">
      <label>track file URL:</label>
      <input v-model="trackUrl" type="text">
    </div>
    <div class="form-block">
      <label>story file URL:</label>
      <input v-model="storyUrl" type="text">
    </div>
    <div class="form-block">
      <button @click="onLoadRequest">Load</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid #ccc;
  margin: 2rem auto;
  width: 400px;
}

h1 {
  text-align: center;
  text-transform: uppercase;
}

.form-block {
  margin: auto;
  padding-bottom: 1rem;
  width: 350px;
}

label {
  display: block;
  font-size: .8rem;
  padding-bottom: .5rem;
  width: 200px;
}

input {
  border: 1px solid #ccc;
  color: #aaa;
  display: block;
  height: 2.5rem;
  font-size: 1rem;
  width: 350px;
}
</style>
