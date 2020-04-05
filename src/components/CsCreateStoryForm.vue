<script>
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');

import { STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config.js'
import { bboxOptions, markerOptions, mapOptions, trackOptions } from '@/config/map.js';
import Editor from '@/components/editor/Editor';
import TrackUploadButton from '@/components/TrackUploadButton';

export default {
  name: 'CsCreateStoryForm',
  components: {
    TrackUploadButton,
    Editor,
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
      features: [],
      track: undefined,
      trackBounds: undefined,
      addFeatureMark: undefined,
      markerOptions,
      mapOptions,
      trackOptions,
      storyName: '',
    };
  },
  methods: {
    /*
     * @param {L.geoJSON}
     */
    handleTrackReady(track) {
      this.$refs.csmap.mapObject.fitBounds(track.getBounds());
    },

    /*
     * Checks if selected text already has the feature mark on the map.
     * It renders remove button if true or add button otherwise.
     * @param {object} selected text attributes
     * @returns {boolean}
     */
    isNewFeatureMarkButtonVisible(attrs) {
      return attrs && attrs[STORY_LINK_LAT_ATTR];
    },

    /*
     * Stores provided function to be called later when user clicks location on the map.
     * @param {Function} tiptap featureMark create function
     */
    handleAddFeatureMarkClick(fn) {
      this.addFeatureMark = fn;
    },

    /*
     * Removes link from the story and the corresponding feature from the map.
     * @param {object} selected text attributes
     * @param {Function} tiptap featureMark remove function
     */
    handleRemoveFeatureMarkClick(attrs, removeMarkFn) {
      const idx = this.features.findIndex(f => f.lat === attrs[STORY_LINK_LAT_ATTR] && f.lng === attrs[STORY_LINK_LNG_ATTR]);

      if (idx > -1) {
        this.features.splice(idx, 1);
        removeMarkFn();
      }
    },

    /*
     * Links the position to the selected text.
     * Uses the addFeatureMark function created in handleAddFeatureMarkClick.
     * @param {object}
     */
    handleMapClick(latLng) {
      if (!this.addFeatureMark || typeof this.addFeatureMark !== 'function') {
        return;
      }

      this.addFeatureMark({
        [STORY_LINK_LAT_ATTR]: latLng.lat,
        [STORY_LINK_LNG_ATTR]: latLng.lng,
      });
      this.features = [...this.features, latLng];
      this.addFeatureMark = undefined;
    },

    /*
     * Zooms map to the provided position.
     * @param {object}
     */
    handleStoryLinkClick(evt) {
      const map = this.$refs.csmap.mapObject;
      map.setView(evt, map.getZoom());
    },

    /*
     * @param {object} geojson data
     */
    handleFileUpload(data) {
      this.track = data;
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<template>
  <el-container class="story-form">
    <el-col :span="12">
      <div class="cs-map">
        <div id="cs-map-container">
          <l-map :bounds="track && trackBounds" @click="handleMapClick($event.latlng)" :center="mapOptions.center" :zoom="mapOptions.zoom" ref="csmap">
            <l-control class="leaflet-bar leaflet-control" position="topleft" >
              <track-upload-button @[TRACK_FILE_UPLOAD_EVENT]="handleFileUpload($event)" />
            </l-control>

            <l-tile-layer :url="mapOptions.baseLayer" />
            <l-tile-layer :url="mapOptions.hikingOverlay" layer-type="overlay" :opacity="0.7" />
            <l-tile-layer :url="mapOptions.labelsOverlay" layer-type="overlay" />

            <l-geo-json @ready="handleTrackReady($event)" v-if="track" :geojson="track" :options="trackOptions.style.plain" ref="cstrack" />

            <l-circle-marker
              :color="markerOptions.style.plain.color"
              :fill-color="markerOptions.style.plain.color"
              :fill-opacity="markerOptions.style.plain.fillOpacity"
              :latLng="f"
              :radius="markerOptions.style.common.radius"
              :weight="markerOptions.style.common.weight"
              v-for="f in features">
            </l-circle-marker>
          </l-map>
        </div>
      </div>
    </el-col>

    <el-col class="story-form__story" :span="12">
      <el-form>
        <el-form-item>
          <el-input class="story-name" v-model="storyName" placeholder="Název příběhu..."></el-input>
        </el-form-item>
      </el-form>

      <editor
        style="flex: 1; overflow: auto;"
        :on-add-feature-mark="handleAddFeatureMarkClick"
        :on-story-link-click="handleStoryLinkClick"
        :on-remove-feature-mark="handleRemoveFeatureMarkClick"
      ></editor>
      <el-footer style="margin: auto;">
        <el-button type="primary">Uložit</el-button>
      </el-footer>
    </el-col>
  </el-container>
</template>

<!-- don't scope to overwrite element ui -->
<style lang="scss">
.cs-map {
  height: 100%;
}

a[data-cs-lat] {
  color: #F56C6C;
  cursor: pointer;
  text-decoration: underline;
}

#cs-map-container {
  width: auto;
  height: 100%;
  position: relative;
}

.story-form__story {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: column;
}

.story-form__story .el-form {
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
