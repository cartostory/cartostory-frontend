<script>
import { LCircleMarker, LGeoJson, LMap, LTileLayer } from 'vue2-leaflet';

require('../../node_modules/leaflet/dist/leaflet.css');

export default {
  name: 'CsMap',
  components: {
    LCircleMarker,
    LGeoJson,
    LMap,
    LTileLayer,
  },
  data() {
    return {
      map: {
        bounds: null,
        center: [50, 19],
        baseLayer: 'https://api.mapbox.com/styles/v1/cartostory/cjugqcypf27581gnry4y59lxy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FydG9zdG9yeSIsImEiOiJjanQycXVyZDcxeXZqM3lxeDNvcW81NWJpIn0.hfvoqNSy7dT0yviVhNcDMg',
        hikingOverlay: 'http://tile.mtbmap.cz/overlay_hiking/{z}/{x}/{y}.png',
        labelsOverlay: 'https://api.mapbox.com/styles/v1/cartostory/cjugqfe8r1lhh1ftgrmr7v9zj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FydG9zdG9yeSIsImEiOiJjanQycXVyZDcxeXZqM3lxeDNvcW81NWJpIn0.hfvoqNSy7dT0yviVhNcDMg',
        zoom: 8,
      },
      marker: {
        color: '#3185fc',
        fillOpacity: 0.5,
        radius: 8,
        weight: 1,
      },
      highlightedMarker: {
        color: '#fffc31',
        fillOpacity: 0.8,
      },
      trackOptions: {
        style() {
          return {
            color: '#5a5a66',
            dashArray: '6',
          };
        },
      },
    };
  },
  methods: {
    /**
     * Set highlighted feature in a MAP context.
     *
     * @returns {void}
     */
    featureClicked(f) {
      this.$store.dispatch('story/resetHighlightedLink');
      this.$store.dispatch('highlightedFeatureInContext', {
        feature: f,
        context: 'MAP',
      });
      this.map.center = this.$refs.csmap.mapObject.getBounds().getCenter();
    },
    flyTo(f) {
      const center = [f.feature.geometry.coordinates[1], f.feature.geometry.coordinates[0]];
      this.$refs.csmap.mapObject.flyTo(center);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.map.bounds = this.$refs.cstrack && this.$refs.cstrack.getBounds();
      this.$refs.csmap && this.$refs.csmap.mapObject.fitBounds(this.map.bounds);
    });
  },
  computed: {
    bbox() {
      return this.$store.state.bbox;
    },
    features() {
      if (!this.highlightedFeature) {
        return this.$store.state.features;
      }

      return this.$store.state.features.filter(f => f.id !== this.highlightedFeature.id);
    },
    highlightedFeature() {
      return this.$store.state.highlightedFeature;
    },
    track() {
      return this.$store.state.track.data;
    },
    context() {
      return this.$store.state.context;
    },
  },
  watch: {
    highlightedFeature() {
      if (this.context !== 'TEXT') {
        return;
      }

      this.flyTo(this.highlightedFeature);
    },
    bbox() {
      if (this.bbox) {
        this.$refs.csmap.mapObject.flyToBounds(this.bbox);
        this.$store.dispatch('resetBbox');
      }
    },
  },
};
</script>

<template>
  <div class="cs-map">
    <div id="cs-map-container">
      <l-map :center="map.center" :zoom="map.zoom" ref="csmap">
        <l-tile-layer :url="map.baseLayer" />
        <l-tile-layer :url="map.hikingOverlay" layer-type="overlay" :opacity="0.7" />
        <l-tile-layer :url="map.labelsOverlay" layer-type="overlay" />
        <l-geo-json :geojson="track.track" :options="trackOptions" ref="cstrack" />

        <l-circle-marker
          v-if="highlightedFeature"
          @click="featureClicked(highlightedFeature)"
          :color="highlightedMarker.color"
          :fill-color="highlightedMarker.color"
          :fill-opacity="highlightedMarker.fillOpacity"
          :latLng="[highlightedFeature.feature.geometry.coordinates[1], highlightedFeature.feature.geometry.coordinates[0]]"
          :radius="marker.radius"
          :weight="marker.weight">
        </l-circle-marker>

        <l-circle-marker
          @click="featureClicked(f)"
          :color="marker.color"
          :fill-color="marker.color"
          :fill-opacity="marker.fillOpacity"
          :key="f.id"
          :latLng="[f.feature.geometry.coordinates[1], f.feature.geometry.coordinates[0]]"
          :radius="marker.radius"
          :weight="marker.weight"
          v-for="f in features">
        </l-circle-marker>
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
</style>
