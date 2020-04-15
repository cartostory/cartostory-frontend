<script>
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');

import { ADD_FEATURE_MARK_EVENT, STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config.js'
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
      storyName: undefined,
      ready: false,
      ADD_FEATURE_MARK_EVENT,
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
  computed: {
    editable() {
      return this.$store.state.editable;
    },
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
  <div class="container-fluid story-form">
    <div style="height: 100vh;" class="columns has-margin-0">
      <cs-map></cs-map>

      <div style="display:flex; flex-direction: column; width: 100%;">
        <cs-editor
          v-if="$store.state.story.text || ready"
          @[ADD_FEATURE_MARK_EVENT]="handleAddFeatureMarkClick($event)">
        </cs-editor>
      </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
a[data-cs-lat] {
  color: #F56C6C;
  cursor: pointer;
  text-decoration: underline;
}
</style>
