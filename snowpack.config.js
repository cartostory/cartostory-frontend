const commonjs = require('rollup-plugin-commonjs');
const vue = require('rollup-plugin-vue');

module.exports = {
  include: 'src/**/*.{js}',
  exclude: ['**/__tests__/*', '**/*.@(spec|test).@(js|mjs)'],
  namedExports: {
    'node_modules/leaflet/dist/leaflet-src.js': [
      'circle',
      'circleMarker',
      'control',
      'Control',
      'CRS',
      'divIcon',
      'DomEvent',
      'DomUtil',
      'featureGroup',
      'geoJSON',
      'icon',
      'Icon',
      'imageOverlay',
      'latLng',
      'latLngBounds',
      'layerGroup',
      'GridLayer',
      'map',
      'marker',
      'polygon',
      'polyline',
      'popup',
      'rectangle',
      'setOptions',
      'tileLayer',
      'tooltip',
    ],
  },
  rollup: {
    plugins: [
      commonjs(),
      vue(),
    ],
  },
};
