<script>
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
import { mapGetters, mapState } from 'vuex';
import { STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config';
import { bboxOptions, markerOptions, mapOptions, trackOptions } from '@/config/map';
import { UPDATE_BBOX_BEING_ADDED, UPDATE_FEATURE_BEING_ADDED, UPDATE_HIGHLIGHTED_BBOX, UPDATE_HIGHLIGHTED_LAT_LNG, UPDATE_SHOULD_TEXT_SCROLL, UPDATE_TRACK } from '@/store/mutations';
import CsTrackUploadButton from '@/components/CsTrackUploadButton.vue';
import { getBboxSelector, getLatLngSelector } from '@/utils/utils';

require('../../node_modules/leaflet/dist/leaflet.css');
require('leaflet-draw');

export default {
  name: 'CsMap',
  components: {
    CsTrackUploadButton,
    LCircleMarker,
    LControl,
    LGeoJson,
    LMap,
    LTileLayer,
    LRectangle,
  },
  data() {
    return {
      STORY_LINK_CLICK_EVENT,
      TRACK_FILE_UPLOAD_EVENT,
      bboxOptions,
      drawControl: undefined,
      markerOptions,
      mapOptions,
      trackOptions,
    };
  },
  computed: {
    mapCenter() {
      const bboxCenter = this.highlightedBbox && window.L.latLngBounds(this.highlightedBbox).getCenter();
      const currentMapCenter = this.$refs.csmap && this.$refs.csmap.mapObject.getCenter();
      const highlightedFeatureMapCenter = !this.$store.state.shouldTextScroll && this.highlightedLatLng;
      return bboxCenter || highlightedFeatureMapCenter || currentMapCenter;
    },
    ...mapGetters(['bboxes', 'features', 'featuresWithoutHighlighted']),
    ...mapState(['bboxBeingAdded', 'editable', 'featureBeingAdded', 'highlightedBbox', 'highlightedLatLng']),
    ...mapState({
      track: state => state.story.track,
    }),
  },
  methods: {
    /*
     * @param {L.geoJSON}
     */
    handleTrackReady(track) {
      this.$refs.csmap.mapObject.fitBounds(track.getBounds());
    },

    /*
     * Sets highlighted bbox.
     * @param {MouseEvent}
     * @param {Object} clicked bounding box
     */
    handleBboxClick(event, bbox) {
      const querySelector = getBboxSelector(bbox.bounds);
      const textMark = document.querySelector(querySelector);

      if (!textMark) {
        return;
      }

      this.$store.commit(UPDATE_HIGHLIGHTED_LAT_LNG, undefined);
      this.$store.commit(UPDATE_HIGHLIGHTED_BBOX, bbox.bounds);
      this.$store.commit(UPDATE_SHOULD_TEXT_SCROLL, true);
    },

    /*
     * Sets feature mark that should be highlighted and scrolled to in the text.
     */
    handleFeatureClick(event) {
      const querySelector = getLatLngSelector(event.latlng);
      const textMark = document.querySelector(querySelector);

      if (!textMark) {
        return;
      }

      this.$store.commit(UPDATE_HIGHLIGHTED_LAT_LNG, {
        [STORY_LINK_LAT_ATTR]: textMark.getAttribute([STORY_LINK_LAT_ATTR]),
        [STORY_LINK_LNG_ATTR]: textMark.getAttribute([STORY_LINK_LNG_ATTR]),
      });
      this.$store.commit(UPDATE_HIGHLIGHTED_BBOX, undefined);
      this.$store.commit(UPDATE_SHOULD_TEXT_SCROLL, true);
    },

    /*
     * Links the position to the selected text when the feature mark addition is active.
     * @param {object}
     */
    handleMapClick(latLng) {
      if (!this.featureBeingAdded.active) {
        return;
      }

      const position = {
        [STORY_LINK_LAT_ATTR]: latLng.lat,
        [STORY_LINK_LNG_ATTR]: latLng.lng,
      };

      this.$store.commit(UPDATE_FEATURE_BEING_ADDED, { active: true, position });
    },

    /*
     * Links the bounding box to the selected text when the bbox mark addition is active.
     */
    handleMapMouseDown() {
      if (!this.bboxBeingAdded.active) {
        return;
      }

      const map = this.$refs.csmap.mapObject;
      window.L.drawLocal.draw.handlers.rectangle.tooltip.start = '';
      window.L.drawLocal.draw.handlers.simpleshape.tooltip.end = '';
      new window.L.Draw.Rectangle(map, {
        showArea: false,
        shapeOptions: this.bboxOptions.plain.style,
      }).enable();

      map.off(window.L.Draw.Event.CREATED);
      map.on(window.L.Draw.Event.CREATED, this.$handleCreateRectangle);
    },

    /*
     * @param {object} geojson data
     */
    handleFileUpload(data) {
      this.$store.commit(UPDATE_TRACK, data);
    },

    $handleCreateRectangle(event) {
      const bounds = event.layer.getBounds();
      const northWest = bounds.getNorthWest();
      const southEast = bounds.getSouthEast();
      const bbox = [
        [northWest.lat, northWest.lng],
        [southEast.lat, southEast.lng],
      ];

      this.$store.commit(UPDATE_BBOX_BEING_ADDED, { active: true, bounds: bbox });
    },
  },
};
</script>

<template>
  <div class="column is-6 has-padding-0">
    <div class="cs-map">
      <div id="cs-map-container">
        <l-map
          :bounds="highlightedBbox"
          @click="handleMapClick($event.latlng)"
          @mousedown="handleMapMouseDown($event.latlng)"
          :center="mapCenter"
          :zoom="mapOptions.zoom"
          ref="csmap">
          <l-control class="leaflet-bar leaflet-control" position="topleft" >
            <cs-track-upload-button v-if="editable" @[TRACK_FILE_UPLOAD_EVENT]="handleFileUpload($event)" />
          </l-control>

          <l-tile-layer :url="mapOptions.baseLayer" />
          <l-tile-layer :url="mapOptions.hikingOverlay" layer-type="overlay" :opacity="0.4" />
          <l-tile-layer :url="mapOptions.labelsOverlay" layer-type="overlay" />

          <l-geo-json @ready="handleTrackReady($event)" v-if="track" :geojson="track" :options="trackOptions.style.plain" ref="cstrack" />

          <l-rectangle
            @click="handleBboxClick($event, bbox)"
            v-for="bbox in bboxes"
            :key="bbox.id"
            :bounds="bbox.bounds"
            :l-style="bbox.highlighted ? bboxOptions.selected.style : bboxOptions.plain.style" />

          <l-circle-marker
            @click="handleFeatureClick"
            :color="f.highlighted ? markerOptions.style.highlighted.color : markerOptions.style.plain.color"
            :fill-color="f.highlighted ? markerOptions.style.highlighted.color : markerOptions.style.plain.color"
            :fill-opacity="f.highlighted ? markerOptions.style.highlighted.fillOpacity : markerOptions.style.plain.fillOpacity"
            :latLng="f"
            :radius="markerOptions.style.common.radius"
            :weight="markerOptions.style.common.weight"
            :key="index"
            v-for="(f, index) in features">
          </l-circle-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cs-map {
  height: 100%;
}

#cs-map-container {
  width: auto;
  height: 100%;
  position: relative;
}
</style>
