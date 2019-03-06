<script>
import { LGeoJson, LIcon, LMap, LTileLayer, LMarker } from 'vue2-leaflet';

require('../../node_modules/leaflet/dist/leaflet.css');

export default {
  name: 'CsMap',
  components: {
    LGeoJson,
    LIcon,
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      map: {
        bounds: null,
        center: [50, 19],
        tileLayer: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
        zoom: 8,
      },
    };
  },
  methods: {
    scrollTo(id) {
      this.$store.dispatch('setHighlightedId', id);
      const highlightedUrl = this.$store.getters.highlightedFeature.feature.properties.url;
      const highlightedLink = this.$store.getters.highlightedFeature.link.id;
      console.log(highlightedLink);


      if (highlightedLink) {
        this.$scrollTo(`#${highlightedLink}`, undefined, {
          container: '#story-container',
        });
      }
    },
  },
  async mounted() {
    this.$nextTick(() => {
      this.map.bounds = this.$refs.cstrack.getBounds();
      this.$refs.csmap.mapObject.fitBounds(this.map.bounds);
    });
  },
  computed: {
    features() {
      return this.$store.state.features;
    },
    highlightedId() {
      return this.$store.state.highlightedId;
    },
    track() {
      return this.$store.state.track;
    },
    center() {
      const hf = this.$store.getters.highlightedFeature && this.$store.getters.highlightedFeature.feature;
      return (hf && [hf.geometry.coordinates[1], hf.geometry.coordinates[0]]) || this.map.center;
    },
  },
};
</script>

<template>
  <div class="cs-map">
    <div id="cs-map-container">
      <l-map :center="center" :zoom="map.zoom" ref="csmap">
        <l-tile-layer :url="map.tileLayer" :center="map.center" :zoom="map.zoom" />
        <l-geo-json v-if="track" :geojson="track" ref="cstrack" />
        <l-marker
          @click="scrollTo(f.id)"
          :key="f.id"
          :latLng="[f.feature.geometry.coordinates[1], f.feature.geometry.coordinates[0]]"
          v-for="f in features">
          <l-icon
            icon-url="/images/marker-icon.png"
            :class-name="f.id === highlightedId ? 'highlighted' : ''"></l-icon>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<style>
  #cs-map-container {
    width: auto;
    height: 100%;
    position: relative;
  }

  .highlighted {
    -webkit-filter: hue-rotate(160deg);
    filter: hue-rotate(160deg);
  }
</style>

