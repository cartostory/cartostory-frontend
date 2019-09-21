<script>
import {
  LCircleMarker,
  LGeoJson,
  LMap,
  LTileLayer,
  LRectangle
} from 'vue2-leaflet';
import * as LEdgeMarker from 'leaflet-edge-marker';

require('../../node_modules/leaflet/dist/leaflet.css');

export default {
  name: 'CsMap',
  components: {
    LCircleMarker,
    LGeoJson,
    LMap,
    LTileLayer,
    LRectangle,
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
        edgeMarker: null,
      },
      markerOptions: {
        style: {
          common: {
            radius: 8,
            weight: 1,
          },
          highlighted: {
            color: '#fffc31',
            fillOpacity: 0.8,
          },
          inBbox: {
            color: '#42b983',
            fillOpacity: 0.5,
          },
          plain: {
            color: '#3185fc',
            fillOpacity: 0.5,
          },
          edge: {
            icon: L.icon({
              iconUrl: '../../node_modules/leaflet/dist/images/marker-icon.png',
              iconRetinaUrl: 'marker-icon-2x.png',
              shadowUrl:     'marker-shadow.png',
              iconSize:    [25, 41],
              iconAnchor:  [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
              shadowSize:  [0, 0],
            }),
          },
        },
      },
      bboxOptions: {
        hovered: {
          style: {
            color: '#5a5a66',
            fillColor: '#5a5a66',
            dashArray: '5',
            weight: 2
          }
        },
        selected: {
          style: {
            color: '#42b983',
            fillColor: '#42b983',
            fillOpacity: 0,
            dashArray: '5',
            weight: 2
          }
        }
      },
      trackOptions: {
        style: {
          plain: {
              color: '#5a5a66',
              dashArray: '6',
          },
          inBbox: {
            color: '#42b983',
            dashArray: '6',
          },
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
    featureClicked(feature) {
      this.$store.dispatch('story/resetHighlightedLink');
      this.$store.dispatch('setHighlightedFeature', feature);
      this.$store.dispatch('setShouldScrollToFeature', true);
      this.map.center = this.$refs.csmap.mapObject.getBounds().getCenter();
    },
    flyTo(feature) {
      const center = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
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
    bboxHovered() {
      return this.$store.state.bboxHovered;
    },
    bboxHoveredDifferentFromCurrentBbox() {
      return this.bbox !== this.bboxHovered;
    },
    features() {
      if (!this.highlightedFeature && !this.featuresInsideBbox) {
        return this.$store.state.features.data.features;
      } else {
        const highlightedId = [this.highlightedFeature && this.highlightedFeature.properties.id];
        const idsInsideBbox = this.featuresInsideBbox && this.featuresInsideBbox.map(f => f.properties.id);
        const ids = highlightedId.concat(idsInsideBbox);
        return this.$store.state.features.data.features.filter(f => !ids.includes(f.properties.id));
      }
    },
    featuresInsideBbox() {
      return this.$store.getters['track/featuresInsideBbox'];
    },
    highlightedFeature() {
      return this.$store.state.highlightedFeature;
    },
    track() {
      return this.$store.state.track.data;
    },
    trackInsideBbox() {
      return this.$store.getters['track/trackBboxRelation']('within');
    },
    trackOutsideBbox() {
      return this.$store.getters['track/trackBboxRelation']('disjoint');
    }
  },
  watch: {
    highlightedFeature() {
      this.flyTo(this.highlightedFeature);
    },
    bbox() {
      if (this.bbox) {
        this.$refs.csmap.mapObject.flyToBounds(this.bbox);
      }
    },
    bboxHovered() {
      const icon = L.icon({
        iconUrl: 'img/map-marker.svg',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl:     'marker-shadow.png',
        iconSize:    [25, 41],
        iconAnchor:  [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize:  [0, 0],
      });

      if (!this.bboxHovered) {
        this.$refs.csmap.mapObject.removeLayer(this.map.edgeMarker);
      } else {
        const bboxCenter = L.latLngBounds(this.bboxHovered).getCenter();
        this.map.edgeMarker = new LEdgeMarker(bboxCenter, { icon: icon });
        this.$refs.csmap.mapObject.addLayer(this.map.edgeMarker);
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
        <l-geo-json v-if="!trackOutsideBbox && !trackInsideBbox" :geojson="track.track" :options="trackOptions.style.plain" ref="cstrack" />
        <l-geo-json v-if="trackInsideBbox" :geojson="trackInsideBbox" :options="trackOptions.style.inBbox" ref="cstrack" />
        <l-geo-json v-if="trackOutsideBbox" :geojson="trackOutsideBbox" :options="trackOptions.style.plain" ref="cstrack" />
        <l-rectangle v-if="bboxHovered && bboxHoveredDifferentFromCurrentBbox" :bounds="bboxHovered" :l-style="bboxOptions.hovered.style"></l-rectangle>
        <l-rectangle v-if="bbox" :bounds="bbox" :l-style="bboxOptions.selected.style"></l-rectangle>

        <!-- highlightedFeature -->
        <l-circle-marker
          v-if="highlightedFeature"
          @click="featureClicked(highlightedFeature)"
          :color="markerOptions.style.highlighted.color"
          :fill-color="markerOptions.style.highlighted.color"
          :fill-opacity="markerOptions.style.highlighted.fillOpacity"
          :latLng="[highlightedFeature.geometry.coordinates[1], highlightedFeature.geometry.coordinates[0]]"
          :radius="markerOptions.style.common.radius"
          :weight="markerOptions.style.common.weight">
        </l-circle-marker>

        <!-- features -->
        <l-circle-marker
          @click="featureClicked(f)"
          :color="markerOptions.style.plain.color"
          :fill-color="markerOptions.style.plain.color"
          :fill-opacity="markerOptions.style.plain.fillOpacity"
          :key="f.properties.id"
          :latLng="[f.geometry.coordinates[1], f.geometry.coordinates[0]]"
          :radius="markerOptions.style.common.radius"
          :weight="markerOptions.style.common.weight"
          v-for="f in features">
        </l-circle-marker>

        <!-- featuresInsideBbox -->
        <l-circle-marker
          @click="featureClicked(f)"
          :color="markerOptions.style.inBbox.color"
          :fill-color="markerOptions.style.inBbox.color"
          :fill-opacity="markerOptions.style.inBbox.fillOpacity"
          :key="f.properties.id"
          :latLng="[f.geometry.coordinates[1], f.geometry.coordinates[0]]"
          :radius="markerOptions.style.common.radius"
          :weight="markerOptions.style.common.weight"
          v-for="f in featuresInsideBbox">
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
