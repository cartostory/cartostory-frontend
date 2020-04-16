<script>
import { LCircleMarker, LControl, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
import { mapGetters, mapState } from 'vuex';
import { STORY_LINK_CLICK_EVENT, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR, TRACK_FILE_UPLOAD_EVENT } from '@/config/config';
import { bboxOptions, markerOptions, mapOptions, trackOptions } from '@/config/map';
import { UPDATE_HIGHLIGHTED_LAT_LNG, UPDATE_FEATURE_MARK_CALLBACK, UPDATE_TRACK } from '@/store/mutations';
import CsTrackUploadButton from '@/components/CsTrackUploadButton.vue';

require('../../node_modules/leaflet/dist/leaflet.css');

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
      addFeatureMark: undefined,
      markerOptions,
      mapOptions,
      trackOptions,
    };
  },
  computed: {
    ...mapState({
      editable: state => state.editable,
      highlightedLatLng: state => state.highlightedLatLng,
      track: state => state.story.track,
    }),
    ...mapGetters([
      'features',
      'featuresWithoutHighlighted',
    ]),
  },
  methods: {
    /*
     * @param {L.geoJSON}
     */
    handleTrackReady(track) {
      this.$refs.csmap.mapObject.fitBounds(track.getBounds());
    },

    /*
     * Sets feature mark that should be highlighted and scrolled to in the text.
     */
    handleFeatureClick(event) {
      const { lat, lng } = event.latlng;
      const textMark = document.querySelector(`[data-cs-lat='${lat}'], [data-cs-lng='${lng}']`);

      if (!textMark) {
        return;
      }

      this.$store.commit(UPDATE_HIGHLIGHTED_LAT_LNG, {
        [STORY_LINK_LAT_ATTR]: textMark.getAttribute([STORY_LINK_LAT_ATTR]),
        [STORY_LINK_LNG_ATTR]: textMark.getAttribute([STORY_LINK_LNG_ATTR]),
      });
    },

    /*
     * Links the position to the selected text.
     * @param {object}
     */
    handleMapClick(latLng) {
      const addFeatureMark = this.$store.state.addFeatureMarkCallback;
      if (!addFeatureMark || typeof addFeatureMark !== 'function') {
        return;
      }

      addFeatureMark({
        [STORY_LINK_LAT_ATTR]: latLng.lat,
        [STORY_LINK_LNG_ATTR]: latLng.lng,
      });
      // this.features = [...this.features, latLng];
      this.$store.commit(UPDATE_FEATURE_MARK_CALLBACK, undefined);
    },

    /*
     * @param {object} geojson data
     */
    handleFileUpload(data) {
      this.$store.commit(UPDATE_TRACK, data);
    },
  },
};
</script>

<template>
  <div class="column is-6 has-padding-0">
    <div class="cs-map">
      <div id="cs-map-container">
        <l-map @click="handleMapClick($event.latlng)" :center="highlightedLatLng || mapOptions.center" :zoom="mapOptions.zoom" ref="csmap">
          <l-control class="leaflet-bar leaflet-control" position="topleft" >
            <cs-track-upload-button v-if="editable" @[TRACK_FILE_UPLOAD_EVENT]="handleFileUpload($event)" />
          </l-control>

            <l-tile-layer :url="mapOptions.baseLayer" />
              <l-tile-layer :url="mapOptions.hikingOverlay" layer-type="overlay" :opacity="0.7" />
                <l-tile-layer :url="mapOptions.labelsOverlay" layer-type="overlay" />

                  <l-geo-json @ready="handleTrackReady($event)" v-if="track" :geojson="track" :options="trackOptions.style.plain" ref="cstrack" />

                    <l-circle-marker
                      @click="handleFeatureClick"
                      :color="markerOptions.style.plain.color"
                      :fill-color="markerOptions.style.plain.color"
                      :fill-opacity="markerOptions.style.plain.fillOpacity"
                      :latLng="f"
                      :radius="markerOptions.style.common.radius"
                      :weight="markerOptions.style.common.weight"
                      :key="index"
                      v-for="(f, index) in featuresWithoutHighlighted">
                    </l-circle-marker>

                    <l-circle-marker
                      v-if="highlightedLatLng"
                      @click="handleFeatureClick"
                      :color="markerOptions.style.highlighted.color"
                      :fill-color="markerOptions.style.highlighted.color"
                      :fill-opacity="markerOptions.style.highlighted.fillOpacity"
                      :latLng="highlightedLatLng"
                      :radius="markerOptions.style.common.radius"
                      :weight="markerOptions.style.common.weight">
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
