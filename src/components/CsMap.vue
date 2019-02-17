<script>
import axios from 'axios';
import { L, LGeoJson, LMap, LTileLayer, LMarker } from 'vue2-leaflet';

require('../../node_modules/leaflet/dist/leaflet.css');

L.Icon.Default.imagePath = '/node_modules/leaflet/dist/images/';

export default {
  name: 'CsMap',
  components: {
    LGeoJson,
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      map: {
        bounds: null,
        center: [50, 19],
        track: null,
        features: [],
        tileLayer: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
        zoom: 8,
      },
      trackId: '20180106-fatra',
    };
  },
  methods: {
    addTrack(trackData) {
      this.map.track = trackData.data;
    },
    getTrack(id) {
      return axios.get(`src/data/tracks/track-${id}.json`);
    },
  },
  async mounted() {
    try {
      const track = await this.getTrack(this.trackId);
      this.addTrack(track);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }

    this.$root.$on('csFeatureAdded', (payload) => {
      this.map.features.push(payload);
    });

    this.$nextTick(() => {
      this.map.bounds = this.$refs.cstrack.getBounds();
      this.$refs.csmap.mapObject.fitBounds(this.map.bounds);
    });
  },
};
</script>

<template>
  <div class="cs-map">
    <div id="cs-map-container">
      <l-map :center="map.center" :zoom="map.zoom" ref="csmap">
        <l-tile-layer :url="map.tileLayer" :center="map.center" :zoom="map.zoom" />
        <l-geo-json v-if="map.track" :geojson="map.track" ref="cstrack" />
        <l-marker v-for="f in map.features" :key="f.name" :latLng="[f.geometry.coordinates[1], f.geometry.coordinates[0]]"></l-marker>
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
