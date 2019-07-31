<template>
  <div v-if="story.data" ref="story" class="cs-story" @scroll="onScrollEnd">
    <section v-if="story.data.header">
      <header>
        <h1>{{ story.data.header }}</h1>
        <div class="perex">
          <p @click="onTextClicked" class="sanitized" v-for="p in story.data.perex" v-html="sanitize(p)">{{ p }}</p>
        </div>
      </header>
      <section>
        <section v-for="s in story.data.sections" :data-bbox="s.bbox">
          <h2>{{ s.header }}</h2>
          <div>
            <p ref="cstext" @click="onTextClicked" class="sanitized" v-for="p in s.text"
            v-html="sanitize(p)">{{ p }}</p>
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
  mounted() {
    this.$store.dispatch('loadFeatures');
  },
  computed: {
    highlightedFeature() {
      return this.$store.state.highlightedFeature;
    },
    context() {
      return this.$store.state.context;
    },
    story() {
      return this.$store.state.story;
    },
  },
  watch: {
    highlightedFeature() {
      if (this.context === 'TEXT') {
        console.log('scroll called from text');
      } else if (this.context === 'MAP') {
        console.log('scroll called from map');
        this.scroll();
        this.resetHighlightedFeatures();
        this.setHighlightedLink();
      }
    },
  },
  methods: {
    scroll() {
      this.$scrollTo(`#${this.highlightedFeature.link.id}`, undefined, {
        container: '#story-container',
        offset: -50,
      });
    },
    resetHighlightedFeatures() {
      this.$store.dispatch('resetHighlightedLink');
    },
    setHighlightedLink() {
      this.$store.dispatch('setHighlightedLink');
    },
    /**
     * Get the first bounding box as [[upperLeftX, upperLeftY], [bottomRightX, bottomRightY]]
     *
     * @returns {array}
     */
    $_getFirstVisibleBBox() {
      const storyOffsetTop = this.$refs.story.scrollTop;
      const bboxes = document.querySelectorAll('[data-bbox]');

      let firstVisibleBBox = null;

      for (let bbox of bboxes.values()) {
        if (bbox.offsetTop >= storyOffsetTop) {
          firstVisibleBBox = bbox
            .getAttribute('data-bbox')
            .split(',')
            .map(c => parseFloat(c));
          break;
        }
      }

      if (!firstVisibleBBox) {
        return;
      }

      const upperLeft = [firstVisibleBBox[1], firstVisibleBBox[0]];
      const bottomRight = [firstVisibleBBox[3], firstVisibleBBox[2]];
      return [upperLeft, bottomRight];
    },
    /**
     * Pan map to the location of the first visible element of the story
     * when map <-> text sync is enabled.
     *
     * @param {object} e
     * @returns {void}
     */
    onScrollEnd(e) {
      if (this.scrollTimeoutID) {
        window.clearTimeout(this.scrollTimeoutID);
      }

      const fn = () => {
        if (!this.$store.state.enableSync) {
          return;
        }

        this.scrollTimeoutID = window.setTimeout(() => {
          const bbox = this.$_getFirstVisibleBBox();
          this.$store.dispatch('setBbox', bbox);
          // @todo: pan map if context is set to TEXT even before the dispatch below
          this.$store.dispatch('setContext', 'TEXT');
          //console.log('first visible element', bbox);
        }, this.scrollTimeout);
      };
      fn();
    },
    sanitize(txt) {
      return this.$sanitize(txt);
    },
    /**
     * Find story <a> element corresponding to the given JSON feature.
     *
     * @param {object} f
     * @returns {DOMElement}
     */
    $_getElementFromFeature(f) {
      return f.link;
    },
    /**
     * Toggle highlight class on click and set the new highlighted link.
     * Note the link click shifts the map center to the newly highlighted feature.
     * @todo solve duplicate links
     * @param {object} e
     */
    onTextClicked(e) {
      const t = e.target || this.$_getElementFromFeature(e);
      const highlightedFeature = this.$store.state.features.find(f => f.link.id === t.id);

      if (t.localName !== 'a') {
        return;
      }

      this.resetHighlightedFeatures();

      if (highlightedFeature) {
        this.$store.dispatch('highlightedFeatureInContext', {
          feature: highlightedFeature,
          context: 'TEXT',
        });
        this.setHighlightedLink();
      }
    },
  },
};

</script>

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
  }

  h2 {
    font-size: 28px;
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
    text-decoration: underline;
  }

  .sanitized >>> .highlighted {
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
