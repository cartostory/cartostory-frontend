<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { Bold, Heading, Link } from 'tiptap-extensions';
import { LCircleMarker, LGeoJson, LMap, LTileLayer, LRectangle } from 'vue2-leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');

import { STORY_LINK_LAT_ATTR, STORY_LINK_LON_ATTR } from '@/config/config.js'
import { bboxOptions, markerOptions, mapOptions, trackOptions } from '@/config/map.js';
import FeatureMark from '@/editor/FeatureMark';

export default {
  name: 'CsCreateStoryForm',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    LCircleMarker,
    LGeoJson,
    LMap,
    LTileLayer,
    LRectangle,
  },
  data() {
    return {
      features: [],
      latLonCallback: undefined,
      markerOptions,
      mapOptions,
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Bold(),
          new FeatureMark(),
          new Heading({
            levels: [1, 2, 3,],
          }),
          new Link(),
        ],
        content:  '<p>This is just a boring paragraph</p>',
      }),
      storyName: '',
    };
  },
  methods: {
    handleFeatureMarkClick(fn) {
      this.latLonCallback = fn;
    },
    handleRemoveFeatureMark(attrs, removeMark) {
      const idx = this.features.findIndex(f => f.lat === attrs['data-cs-lat'] && f.lng === attrs['data-cs-lng']);

      if (idx > -1) {
        this.features.splice(idx, 1);
        removeMark();
      }
    },
    handleMapClick(latLng) {
      if (!this.latLonCallback || typeof this.latLonCallback !== 'function') {
        return;
      }

      this.latLonCallback({
        [STORY_LINK_LAT_ATTR]: latLng.lat,
        [STORY_LINK_LON_ATTR]: latLng.lng,
      });
      this.features = [...this.features, latLng];
      this.latLonCallback = undefined;
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
          <l-map @click="handleMapClick($event.latlng)" :center="mapOptions.center" :zoom="mapOptions.zoom" ref="csmap">
            <l-tile-layer :url="mapOptions.baseLayer" />
            <l-tile-layer :url="mapOptions.hikingOverlay" layer-type="overlay" :opacity="0.7" />
            <l-tile-layer :url="mapOptions.labelsOverlay" layer-type="overlay" />

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
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
            >H1
          </el-button>

          <el-button
            size="mini"
            type="plain"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            >H2
          </el-button>

          <el-button
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
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="handleFeatureMarkClick(commands.featureMark)"
            icon="el-icon-location-outline"
          ></el-button>

          <el-button
            class="menububble__button"
            :class="{ 'is-active': isActive.featureMark() }"
            @click="handleRemoveFeatureMark(getMarkAttrs('featureMark'), commands.featureMark)"
            icon="el-icon-delete-location"
          ></el-button>

        </div>
      </editor-menu-bubble>

      <editor-content v-if="editor" class="editor" :editor="editor" />
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
  border: 1px solid tomato;
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
  border: 1px solid tomato;
  margin-left: 1rem;
  margin-right: 1rem;
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
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
    background: transparent;
    border: 0;
    color: white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba(white, 0.1);
    }

    &.is-active {
      background-color: rgba(white, 0.2);
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
