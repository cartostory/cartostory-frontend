<template>
  <div v-if="story.story" ref="story" class="cs-story">
    <section v-if="story.story.header">
      <header>
        <h1>{{ story.story.header }}</h1>
        <div class="perex">
          <p @click="onTextClicked" class="sanitized" v-for="p in story.story.perex" v-html="sanitize(p)">{{ p }}</p>
        </div>
      </header>
      <section>
        <section @mouseenter="onBboxHovered(s.bbox)" @mouseleave="onBboxLeft" v-bind:class="{
          'bbox-section': s.bbox, 'bbox-section__active': s.bbox === bbox }" v-for="s in story.story.sections" :data-bbox="s.bbox">
          <a class="bbox-link" @click="onBboxClicked(s.bbox)" v-if="s.bbox">bbox zoom</a>
          <h2>{{ s.header }}</h2>
          <div>
            <p ref="cstext" @click="onTextClicked" class="sanitized" v-for="p in s.text" v-html="sanitize(p)">{{ p }}</p>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTimeout: 250,
      scrollTimeoutID: null,
    };
  },
  computed: {
    bbox() {
      return this.$store.state.bbox;
    },
    highlightedFeature() {
      return this.$store.state.highlightedFeature;
    },
    story() {
      return this.$store.state.story.data;
    },
    shouldScrollToFeature() {
      return this.$store.state.shouldScrollToFeature;
    }
  },
  watch: {
    highlightedFeature() {
      if (this.shouldScrollToFeature) {
        this.scroll();
      }

      this.resetHighlightedLinks();
      this.setHighlightedLink();
    },
  },
  methods: {
    onBboxClicked(bbox) {
      this.$store.dispatch('setBbox', null);
      this.$store.dispatch('setBbox', bbox);
    },
    onBboxHovered(bbox) {
      this.$store.dispatch('setBboxHovered', null);
      this.$store.dispatch('setBboxHovered', bbox);
    },
    onBboxLeft() {
      this.$store.dispatch('setBboxHovered', null);
    },
    scroll() {
      const id = this.highlightedFeature.properties.id;
      const elm = document.querySelectorAll(`[data-cs-id='${id}']`)[0];
      this.$scrollTo(elm, undefined, {
        container: '#story-container',
        offset: -50,
      });
    },
    resetHighlightedLinks() {
      this.$store.dispatch('story/resetHighlightedLink');
    },
    setHighlightedLink() {
      this.$store.dispatch('story/setHighlightedLink');
    },
    sanitize(txt) {
      return this.$sanitize(txt);
    },
    /**
     * Toggle highlight class on click and set the new highlighted link.
     * Note the link click shifts the map center to the newly highlighted feature.
     * @todo solve duplicate links
     * @param {object} e
     */
    onTextClicked(e) {
      const t = e.target;

      if (t.localName !== 'a' || !t.attributes.getNamedItem('data-cs-id')) {
        return;
      }

      const id = t.attributes.getNamedItem('data-cs-id').value;
      const highlightedFeature = this.$store.state.features.data.features.find(f => f.properties.id == id);

      this.resetHighlightedLinks();

      if (highlightedFeature) {
        this.$store.dispatch('setHighlightedFeature', highlightedFeature);
        this.$store.dispatch('setShouldScrollToFeature', false);
        this.setHighlightedLink();
      }
    },
  },
};
</script>

<style scoped>
  .cs-story {
    padding: 0 40px;
    height: 100%;
    overflow-y: scroll;
  }

  header,
  section {
    margin-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
  }

  h1,
  h2 {
    color: #42b983;
    font-weight: 600;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 8px;
    margin-top: 8px;
  }

  p {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 20px;
    margin-top: 0px;
  }

  .bbox-section {
    border: 2px dashed #eee;
    position: relative;
  }

  .bbox-section:hover {
    border-color: #bbb;
  }

  .bbox-section__active,
  .bbox-section__active:hover
  {
    border-color: #42b983;
  }

  .bbox-link {
    position: absolute;
    right: 8px;
    top: 5px;
  }

  /* v-html needs this syntax to work - see https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e */
  .sanitized >>> a {
    color: #42b983;
    cursor: pointer;
    text-decoration: underline;
  }

  .sanitized >>> a:hover {
    color: #bbb;
  }

  .sanitized >>> .highlighted,
  .sanitized >>> .highlighted:hover {
    background-color: #42b983;
    color: white;
    /*color: #d55635 !important;*/
    /*
    -webkit-transition: background-color 500ms ease-out 200ms;
    -moz-transition: background-color 500ms ease-out 200ms;
    -o-transition: background-color 500ms ease-out 200ms;
    transition: background-color 500ms ease-out 200ms;
    */
  }
</style>
