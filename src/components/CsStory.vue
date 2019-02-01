<template>
  <div class="cs-story" v-on:scroll="scrollHandler">
    <v-btn v-if="!story.header" @click="get()">Get Story</v-btn>

    <section v-if="story.header">
      <header>
        <h1>{{ story.header }}</h1>
        <div class="perex">
          <p v-for="p in story.perex">{{ p }}</p>
        </div>
      </header>
      <section>
        <section v-for="s in story.sections">
          <h2>{{ s.header }}</h2>
          <div>
            <p v-for="p in s.text">{{ p }}</p>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';

  function getStory(id) {
    return axios.get(`src/data/stories/story-${id}.json`);
  }

  export default {
    data() {
      return {
        story: {},
      };
    },
    methods: {
      get() {
        getStory('20180106-fatra').then((response) => {
          this.story = response.data;
        });
      },
      scrollHandler(event) {
        const scrollEl = event.target;
        const scrollHeight = scrollEl.scrollHeight;
        const offsetHeight = scrollEl.offsetHeight;

        const fromTop = scrollEl.scrollTop;
        const fromTopPercentage = (100 * fromTop) / (scrollHeight - offsetHeight);

        Vue.$log.debug(event);
        Vue.$log.debug('H', scrollHeight, 'FT', fromTop, 'FTP', `${fromTopPercentage}%`);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cs-story {
    padding: 0 64px 50px;
    height: 100%;
    overflow-y: scroll;
  }

  h1,
  h2 {
    color: #42b983;
    font-weight: 600;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 36px;
    padding-top: 72px;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 28px;
    padding-top: 56px;
  }

  p {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 20px;
  }
</style>
