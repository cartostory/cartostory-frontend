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
        tileLayer: 'https://a.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2FydG9zdG9yeSIsImEiOiJjanQycXVyZDcxeXZqM3lxeDNvcW81NWJpIn0.hfvoqNSy7dT0yviVhNcDMg',
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
    scrollTo(id) {
      this.$store.dispatch('recenterMap', false);
      this.$store.dispatch('changeHighlighted', id);
      const highlightedLink = this.$store.getters.highlightedFeature.link.id;
      this.map.center = this.$refs.csmap.mapObject.getBounds().getCenter();

      if (highlightedLink) {
        this.$scrollTo(`#${highlightedLink}`, undefined, {
          container: '#story-container',
          offset: -50,
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.map.bounds = this.$refs.cstrack.getBounds();
      this.$refs.csmap.mapObject.fitBounds(this.map.bounds);
    });
  },
  computed: {
    features() {
      if (this.highlightedId == null) {
        return this.$store.state.features;
      }

      return this.$store.state.features.filter(f => f.id !== this.highlightedId);
    },
    highlightedFeature() {
      return this.$store.getters.highlightedFeature;
    },
    highlightedId() {
      return this.$store.state.highlightedId;
    },
    track() {
      return this.$store.state.track;
    },
    center() {
      const hf = this.$store.getters.highlightedFeature && this.$store.getters.highlightedFeature.feature;
      const recenter = this.$store.state.recenterMap;

      if (recenter && hf) {
        return hf && [hf.geometry.coordinates[1], hf.geometry.coordinates[0]];
      }

      return this.map.center;
    },
  },
};
</script>

<template>
  <div class="cs-map">
    <div id="cs-map-container">
      <l-map :center="center" :zoom="map.zoom" ref="csmap">
        <l-tile-layer :url="map.tileLayer" :center="map.center" :zoom="map.zoom" />
        <l-geo-json v-if="track" :geojson="track" :options="trackOptions" ref="cstrack" />

        <l-circle-marker
          v-if="highlightedFeature"
          @click="scrollTo(highlightedId)"
          :color="highlightedMarker.color"
          :fill-color="highlightedMarker.color"
          :fill-opacity="highlightedMarker.fillOpacity"
          :latLng="[highlightedFeature.feature.geometry.coordinates[1], highlightedFeature.feature.geometry.coordinates[0]]"
          :radius="marker.radius"
          :weight="marker.weight">
        </l-circle-marker>

        <l-circle-marker
          @click="scrollTo(f.id)"
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

