<script>
import axios from 'axios';
import { LGeoJson, LMap, LTileLayer, LMarker } from 'vue2-leaflet';

require('../../node_modules/leaflet/dist/leaflet.css');

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
        data: null,
        tileLayer: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
        zoom: 8,
      },
      trackId: '20180106-fatra',
    };
  },
  methods: {
    addTrack(trackData) {
      this.map.data = trackData.data;
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

    this.$nextTick(() => {
      this.map.bounds = this.$refs.csdata.getBounds();
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
        <l-geo-json v-if="map.data" :geojson="map.data" ref="csdata" />
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
