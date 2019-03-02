<template>
  <div class="cs-story" v-on:scroll="scrollHandler">
    <section v-if="story.header">
      <header>
        <h1>{{ story.header }}</h1>
        <div class="perex">
          <p ref="cstext" v-on:click="onTextClicked" class="sanitized" v-for="p in story.perex" v-html="sanitize(p)">{{ p }}</p>
        </div>
      </header>
      <section>
        <section v-for="s in story.sections">
          <h2>{{ s.header }}</h2>
          <div>
            <p ref="cstext" v-on:click="onTextClicked" class="sanitized" v-for="p in s.text" v-html="sanitize(p)">{{ p }}</p>
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
  return axios.get(`/data/stories/story-${id}.json`);
}

export default {
  data() {
    return {
      features: [],
      featureUrls: [],
      highlightedLink: null,
      regex: /data-url='([^']+)'/g,
      story: {},
    };
  },
  methods: {
    $_extractFeatureUrlsFromPerex(story) {
      if (story && (!story.perex || story.perex.length === 0)) {
        return [];
      }

      const urls = story.perex.map(p => p.match(this.regex));
      return [].concat(...urls);
    },
    $_extractFeatureUrlsFromText(story) {
      if (story && (!story.sections || story.sections.length === 0)) {
        return [];
      }

      const urls = story.sections.map(s => s.text)
        .map(s => s.join(','))
        .map(s => s.match(this.regex));

      return [].concat(...urls);
    },
    sanitize(txt) {
      return this.$sanitize(txt);
    },
    get() {
      getStory('20180106-fatra').then((response) => {
        this.story = response.data;
        this.getFeatures();
      });
    },
    getFeatures() {
      this.featureUrls = new Set(this.$_extractFeatureUrls());
      this.features = [];
      Array.from(this.featureUrls).forEach((url) => {
        const strippedUrl = url.replace('data-url=', '').replace("'", '').replace("'", '');
        axios.get(strippedUrl)
          .then((response) => {
            response.data.properties.url = strippedUrl;
            this.features.push(response.data);
            this.emitFeature(response.data);
          });
      });
    },
    onTextClicked(e) {
      const t = e.originalTarget;
      if (t.localName === 'a' && t.attributes.getNamedItem('data-url')) {
        if (this.highlightedLink) {
          this.highlightedLink.classList.toggle('highlighted');
        }

        this.highlightedLink = t;
        this.highlightedLink.classList.toggle('highlighted');
        this.$root.$emit('csTextFeatureClicked', t.attributes.getNamedItem('data-url'));
      }
    },
    emitFeature(payload) {
      this.$root.$emit('csFeatureAdded', payload);
    },
    $_extractFeatureUrls() {
      const perexFeatures = this.$_extractFeatureUrlsFromPerex(this.story);
      const textFeatures = this.$_extractFeatureUrlsFromText(this.story);

      return perexFeatures.concat(textFeatures);
    },
    scrollHandler(event) {
      const scrollEl = event.target;
      const { scrollHeight } = scrollEl;
      const { offsetHeight } = scrollEl;

      const fromTop = scrollEl.scrollTop;
      const fromTopPercentage = (100 * fromTop) / (scrollHeight - offsetHeight);

      Vue.$log.debug(event);
      Vue.$log.debug('H', scrollHeight, 'FT', fromTop, 'FTP', `${fromTopPercentage}%`);
    },
  },
  mounted() {
    this.get();
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

  /* v-html needs this syntax to work - see https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e */
  .sanitized >>> a {
    color: #42b983;
    cursor: pointer;
  }

  .sanitized >>> .highlighted {
    color: blue !important;
  }
</style>
