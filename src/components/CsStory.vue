<template>
  <div v-if="story.story" ref="story" class="cs-story">
    <router-link title="Nahrát jiný příběh" class="header-link" to="/load">
      <el-button size="mini" type="plain" icon="el-icon-plus" circle></el-button>
    </router-link>
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
          <el-button title="Vycentrovat v mapě" @click="onBboxClicked(s.bbox)" v-if="s.bbox" size="mini" type="plain" icon="el-icon-full-screen" circle></el-button>
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
    height: 100%;
    overflow-y: scroll;
    padding: 0 2rem;
  }

  header,
  section {
    margin-top: 1rem;
    padding-left: .5rem;
    padding-right: .5rem;
  }

  .el-button {
    float: right;
    margin-top: .5rem;
  }

  .header-link {
    font-size: x-small;
    position: absolute;
    top: .5rem;
    right: 1.5rem;
  }

  .bbox-section {
    border: 2px dashed #DCDFE6;
  }

  .bbox-section:hover {
    border-color: #bbb;
  }

  .bbox-section__active,
  .bbox-section__active:hover
  {
    border-color: #42b983;
  }

  /* v-html needs this syntax to work - see https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e */
  .sanitized >>> a {
    color: #F56C6C;
    cursor: pointer;
    text-decoration: underline;
  }

  .sanitized >>> a:hover {
    color: #bbb;
  }

  .sanitized >>> .highlighted,
  .sanitized >>> .highlighted:hover {
    background-color: #F56C6C;
    color: white;
  }
</style>
