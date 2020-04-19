<script>
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';

import { ADD_BOUNDING_BOX_EVENT, ADD_FEATURE_MARK_EVENT, STORY_LINK_CLICK_EVENT, TRACK_FILE_UPLOAD_EVENT } from '@/config/config';
import { UPDATE_BOUNDING_BOX_CALLBACK, UPDATE_FEATURE_MARK_CALLBACK } from '@/store/mutations';
import { markerOptions, mapOptions, trackOptions } from '@/config/map';
import CsEditor from '@/components/CsEditor.vue';
import CsMap from '@/components/CsMap.vue';

require('../../node_modules/leaflet/dist/leaflet.css');

export default {
  name: 'story-screen',
  components: {
    CsEditor,
    CsMap,
  },
  data() {
    return {
      storyName: undefined,
      ready: false,
      ADD_BOUNDING_BOX_EVENT,
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

    handleAddBoundingBoxClick(fn) {
      this.$store.commit(UPDATE_BOUNDING_BOX_CALLBACK, fn);
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
          @[ADD_FEATURE_MARK_EVENT]="handleAddFeatureMarkClick($event)"
          @[ADD_BOUNDING_BOX_EVENT]="handleAddBoundingBoxClick($event)">
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
