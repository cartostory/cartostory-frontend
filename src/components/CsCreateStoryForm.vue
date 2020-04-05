<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { Heading } from 'tiptap-extensions';
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');

import { STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config.js'
import { bboxOptions, markerOptions, mapOptions, trackOptions } from '@/config/map.js';
import FeatureMark from '@/editor/FeatureMark';
import CsTrackUploadButton from '@/components/CsTrackUploadButton';

export default {
  name: 'CsCreateStoryForm',
  components: {
    CsTrackUploadButton,
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
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
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new FeatureMark(),
          new Heading({
            levels: [1, 2, 3,],
          }),
        ],
        content:  '<p>This is just a boring paragraph</p>',
      }),
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
    handleStoryLinkClick(latLng) {
      const map = this.$refs.csmap.mapObject;
      map.setView(latLng, map.getZoom());
    },

    /*
     * @param {object} geojson data
     */
    handleFileUpload(data) {
      this.track = data;
    }
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
              <cs-track-upload-button @[TRACK_FILE_UPLOAD_EVENT]="handleFileUpload($event)" />
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

      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="editor-menu-bar">
          <el-button
            title="Nadpis 1. kategorie"
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
            >H1
          </el-button>

          <el-button
            title="Nadpis 2. kategorie"
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            >H2
          </el-button>

          <el-button
            title="Nadpis 3. kategorie"
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
            >H3
          </el-button>

        </div>
      </editor-menu-bar>

      <editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, getMarkAttrs, isActive, menu }">
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">

          <el-button
            v-if="!isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="handleAddFeatureMarkClick(commands.featureMark)"
            icon="el-icon-location-outline"
          ></el-button>

          <el-button
            v-if="isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="handleRemoveFeatureMarkClick(getMarkAttrs('featureMark'), commands.featureMark)"
            icon="el-icon-delete-location"
          ></el-button>

        </div>
      </editor-menu-bubble>

      <editor-content @[STORY_LINK_CLICK_EVENT]="handleStoryLinkClick" v-if="editor" class="editor" :editor="editor" />
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

.story-form__story .el-form {
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* editor start */

.editor-menu-bar {
  margin-left: 1rem;
}

.story-form__story .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid gray;
  font-size: 3rem;
  height: 4rem;
  line-height: 3.5rem;
}

.story-form__story .editor {
  margin-left: 1rem;
  margin-right: 1rem;
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
  background: #F56C6C;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background-color: transparent;
    border: 0;
    color: white !important;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover,
    &:focus,
    &.is-active {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: white;
  }
}

/* editor end */
</style>
