<script>
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');

import { STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config.js'
import { UPDATE_FEATURE_MARK_CALLBACK, UPDATE_STORY_NAME } from '@/store/mutations.js';
import { bboxOptions, markerOptions, mapOptions, trackOptions } from '@/config/map.js';
import CsEditor from '@/components/CsEditor';
import CsMap from '@/components/CsMap';

export default {
  name: 'story-screen',
  components: {
    CsEditor,
    LCircleMarker,
    LControl,
    LGeoJson,
    LMap,
    LTileLayer,
    LRectangle,
    CsMap,
  },
  data() {
    return {
      ready: false,
      STORY_LINK_CLICK_EVENT,
      TRACK_FILE_UPLOAD_EVENT,
      features: [],
      track: undefined,
      trackBounds: undefined,
      addFeatureMark: undefined,
      markerOptions,
      mapOptions,
      trackOptions,
    };
  },
  mounted() {
    this.ready = this.$router.currentRoute.path === '/story/create';
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
        name: this.$store.state.story.name,
        text: this.$store.state.story.text,
        track: this.$store.state.story.track,
      };
      console.log('handleSave', result);
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
      <cs-editor
        v-if="$store.state.story.text || ready"
        @add-feature-mark="handleAddFeatureMarkClick($event)"
        style="flex: 1; overflow: auto;"
      ></cs-editor>
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

</style>
