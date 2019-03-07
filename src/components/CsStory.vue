<template>
  <div class="cs-story">
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
  computed: {
    highlightedFeature() {
      return this.$store.getters.highlightedFeature;
    },
    story() {
      return this.$store.state.story;
    },
  },
  methods: {
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
      const t = e.originalTarget || this.$_getElementFromFeature(e);
      const highlightedFeature = this.$store.state.features.find(f => f.link.id === t.id);

      if (t.localName !== 'a') {
        return;
      }

      this.removeHighlightedClass();

      if (highlightedFeature) {
        this.$store.dispatch('changeHighlighted', highlightedFeature.id);
      }

      if (e.originalTarget) { // click not coming from a map
        console.log('recenterMap true');
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
