<template>
  <div class="cs-map">
    <div id="cs-map-container"></div>
  </div>
</template>

<script>
  import L from 'leaflet';
  import axios from 'axios';

  require('../../node_modules/leaflet/dist/leaflet.css');

  let map;

  function addTrack(trackData) {
    const geojson = trackData.data;
    const trackLayer = L.geoJson(geojson);

    map.addLayer(trackLayer);
    map.fitBounds(trackLayer.getBounds());
  }

  function getTrack(id) {
    return axios.get(`src/data/tracks/track-${id}.json`);
  }

  function initMap() {
    const tileLayer = L.tileLayer(
      'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
      {
        subdomains: ['a', 'b', 'c'],
        continuousWorld: true,
      },
    );
    tileLayer.addTo(map);

    getTrack('20180106-fatra').then(addTrack);
  }

  function createMap() {
    map = L.map('cs-map-container');
    map.on('load', () => initMap(map));
    map.setView([50, 19], 8);
  }

  export default {
    mounted() {
      createMap();
    },
  };
</script>

<style>
  #cs-map-container {
    width: auto;
    height: 100%;
    position: relative;
  }
</style>
