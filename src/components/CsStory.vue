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
import Vue from 'vue';

export default {
  computed: {
    story() {
      return this.$store.state.story;
    },
  },
  methods: {
    sanitize(txt) {
      return this.$sanitize(txt);
    },
    onTextClicked(e) {
      const t = e.originalTarget;
      if (t.localName === 'a' && t.attributes.getNamedItem('data-url')) {
        if (this.highlightedLink) {
          this.highlightedLink.classList.toggle('highlighted');
        }

        this.highlightedLink = t;
        this.highlightedLink.classList.toggle('highlighted');

        const dataUrl = t.attributes.getNamedItem('data-url').value;
        const highlightedFeature = this.$store.state.features.find(f => f.properties.url.indexOf(dataUrl) > -1);

        if (highlightedFeature) {
          this.$store.dispatch('setHighlightedId', highlightedFeature.properties.id);
        }
      }
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
