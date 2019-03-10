<template>
  <div ref="story" class="cs-story" @scroll="onScrollEnd">
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
export default {
  data() {
    return {
      scrollTimeout: 250,
      scrollTimeoutID: null,
    };
  },
  computed: {
    highlightedFeature() {
      return this.$store.getters.highlightedFeature;
    },
    story() {
      return this.$store.state.story;
    },
  },
  methods: {
    /**
     * Get the first visible story element.
     *
     * @todo: include just elements having data-bbox attribute
     * @returns {DOMElement|null}
     */
    $_getFirstVisibleBBox() {
      const storyOffsetTop = this.$refs.story.scrollTop;
      const bboxes = this.$refs.cstext;
      let firstVisibleBBox = null;

      for (let bbox of bboxes.values()) {
        if (bbox.offsetTop >= storyOffsetTop) {
          firstVisibleBBox = bbox;
          break;
        }
      }

      return firstVisibleBBox;
    },
    /**
     * Pan map to the location of the first visible element of the story.
     *
     * @todo: A race condition might occur when scroll event is triggered from the map,
     *        so the way to tell it from the registered @scroll listener. In case the
     *        map triggers the scroll event, this method should not be called at all.
     * @param {object} e
     * @returns {void}
     */
    onScrollEnd(e) {
      if (this.scrollTimeoutID) {
        window.clearTimeout(this.scrollTimeoutID);
      }

      const fn = () => {
        this.scrollTimeoutID = window.setTimeout(() => {
          const bbox = this.$_getFirstVisibleBBox();
          console.log('first visible element', bbox);
        }, this.scrollTimeout);
      };
      fn();
    },
    sanitize(txt) {
      return this.$sanitize(txt);
    },
    removeHighlightedClass() {
      this.$store.dispatch('resetHighlighted');
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

      this.removeHighlightedClass();

      if (highlightedFeature) {
        this.$store.dispatch('changeHighlighted', highlightedFeature);
      }

      if (e.originalTarget) { // click not coming from a map
        this.$store.dispatch('recenterMap', true);
      }
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
    -webkit-transition: background-color 500ms ease-out 200ms;
    -moz-transition: background-color 500ms ease-out 200ms;
    -o-transition: background-color 500ms ease-out 200ms;
    transition: background-color 500ms ease-out 200ms;
  }
</style>
