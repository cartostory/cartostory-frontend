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
import Vue from 'vue';

export default {
  /**
   * Mimic the link between map and the text by adding the unique id
   * based on data-url attribute value.
   * @todo: solve links leading to the same URL, thus having the same hash
   */
  mounted() {
    const links = document.querySelectorAll('a[data-url]');
    links.forEach(l => l.id = `f-${l.attributes.getNamedItem('data-url').value.hashCode()}`);
  },
  computed: {
    highlightedFeature() {
      return this.$store.getters.highlightedFeature;
    },
    links() {
      return document.querySelectorAll('a[data-url]');
    },
    story() {
      return this.$store.state.story;
    },
  },
  watch: {
    /**
     * Removes highlighted feature and highlights the one corresponding
     * to the map marker clicked.
     */
    highlightedFeature() {
      if (!this.highlightedFeature) {
        return;
      }

      this.removeHighlightedClass();
      this.onTextClicked(this.highlightedFeature);
    },
  },
  methods: {
    sanitize(txt) {
      return this.$sanitize(txt);
    },
    removeHighlightedClass() {
      this.links.forEach(l => l.classList.remove('highlighted'));
    },
    /**
     * Find story <a> element corresponding to the given JSON feature.
     *
     * @param {object} f
     * @returns {DOMElement}
     */
    $_getElementFromFeature(f) {
      const url = f.properties.url;
      const elm = Array.from(this.links).find(l => url.includes(l.attributes.getNamedItem('data-url').value));

      return elm;
    },
    /**
     * Toggle highlight class on click and set the new highlighted link.
     * Note the link click shifts the map center to the newly highlighted feature.
     * @todo solve duplicate links
     * @param {object} e
     */
    onTextClicked(e) {
      const t = e.originalTarget || this.$_getElementFromFeature(e);
      const dataUrl = t.attributes.getNamedItem('data-url') && t.attributes.getNamedItem('data-url').value;

      if (!(t.localName === 'a' && dataUrl)) {
        return;
      }

      this.removeHighlightedClass();
      const highlightedFeature = this.$store.state.features.find(f => f.properties.url.indexOf(dataUrl) > -1);

      if (highlightedFeature) {
        t.classList.toggle('highlighted');
        this.$store.dispatch('setHighlightedId', highlightedFeature.properties.id);
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
