<script>
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');

import { STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config.js'
import { UPDATE_FEATURE_MARK_CALLBACK } from '@/store/mutations.js';
import { bboxOptions, markerOptions, mapOptions, trackOptions } from '@/config/map.js';
import Editor from '@/components/editor/Editor';
import Map from '@/components/Map';

export default {
  name: 'CsCreateStoryForm',
  components: {
    Editor,
    LCircleMarker,
    LControl,
    LGeoJson,
    LMap,
    LTileLayer,
    LRectangle,
    'cs-map': Map,
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
     * Stores provided function to be called later when user clicks location on the map.
     * @param {Function} tiptap featureMark create function
     */
    handleAddFeatureMarkClick(fn) {
      this.$store.commit(UPDATE_FEATURE_MARK_CALLBACK, fn);
    },

    handleSave() {
      const result = {
        name: this.storyName,
        story: this.$store.state.story,
        track: this.track,
      };
      console.log('handleSave', result);
    },

    /*
     * @param {object} geojson data
     */
    handleFileUpload(data) {
      this.track = data;
    },
  },
};
</script>
<template>
  <el-container class="story-form">
    <el-col :span="12">
      <cs-map></cs-map>
    </el-col>

    <el-col class="story-form__story" :span="12">
      <el-form>
        <el-form-item>
          <el-input class="story-name" v-model="storyName" placeholder="Název příběhu..."></el-input>
        </el-form-item>
      </el-form>

      <editor
        @add-feature-mark="handleAddFeatureMarkClick($event)"
        style="flex: 1; overflow: auto;"
      ></editor>
      <el-footer style="margin: auto;">
        <el-button @click="handleSave" type="primary">Uložit</el-button>
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
