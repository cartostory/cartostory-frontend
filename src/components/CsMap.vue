<script>
import axios from 'axios';
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
        clickedFeature: null,
        features: [],
        tileLayer: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
        track: null,
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
      return axios.get(`/data/tracks/track-${id}.json`);
    },
    onTextFeatureClicked(elm) {
      const feature = this.map.features.find(f => f.properties.url === elm.value);

      if (!feature) {
        return;
      }

      const coordinates = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
      this.$refs.csmap.mapObject.setView(coordinates, this.$refs.csmap.mapObject.getZoom());
      this.map.clickedFeature = feature;
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
      if (this.map.features.includes(payload)) {
        return;
      }

      this.map.features.push(payload);
    });

    this.$root.$on('csTextFeatureClicked', this.onTextFeatureClicked);

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
        <l-marker
          :key="f.properties.id"
          :latLng="[f.geometry.coordinates[1], f.geometry.coordinates[0]]"
          v-for="f in map.features">
          <l-icon
            icon-url="/images/marker-icon.png"
            :class-name="f.properties.id === (map.clickedFeature && map.clickedFeature.properties.id) ? 'highlighted' : ''"></l-icon>
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

