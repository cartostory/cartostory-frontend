<script>
import { EditorMenuBubble } from 'tiptap';
import { mapState } from 'vuex';

import { ADD_BOUNDING_BOX_EVENT, STORY_LINK_BBOX_ATTR, STORY_LINK_LAT_ATTR } from '@/config/config';
import { UPDATE_BBOX_BEING_ADDED, UPDATE_FEATURE_BEING_ADDED, UPDATE_HIGHLIGHTED_LAT_LNG } from '@/store/mutations';

export default {
  data() {
    return {
      bboxAddedCallback: undefined,
      featureMarkAddedCallback: undefined,
    };
  },
  name: 'MenuBubble',
  props: ['editor'],
  components: {
    EditorMenuBubble,
  },
  computed: {
    ...mapState({
      bboxBeingAdded: state => state.bboxBeingAdded,
      featureBeingAdded: state => state.featureBeingAdded,
    }),
  },
  watch: {
    bboxBeingAdded(bbox) {
      if (bbox && bbox.active && bbox.bounds && this.bboxAddedCallback) {
        this.bboxAddedCallback(bbox.bounds);
        this.bboxAddedCallback = undefined;
        this.$store.commit(UPDATE_BBOX_BEING_ADDED, { active: false, position: undefined });
      }
    },
    featureBeingAdded(feature) {
      if (feature && feature.active && feature.position && this.featureMarkAddedCallback) {
        this.featureMarkAddedCallback(feature.position);
        this.featureMarkAddedCallback = undefined;
        this.$store.commit(UPDATE_FEATURE_BEING_ADDED, { active: false, position: undefined });
      }
    },
  },
  methods: {
    /*
     * Checks if selected text already has the feature mark on the map.
     * It renders remove button if true or add button otherwise.
     * @param {object} selected text attributes
     * @returns {boolean}
     */
    isNewFeatureMarkButtonVisible(attrs) {
      return attrs && attrs[STORY_LINK_LAT_ATTR];
    },

    isNewBboxMarkVisible(attrs) {
      return attrs && attrs[STORY_LINK_BBOX_ATTR];
    },

    handleAddFeatureMarkClick(fn) {
      this.featureMarkAddedCallback = fn;
      this.$store.commit(UPDATE_FEATURE_BEING_ADDED, { active: true, position: undefined });
    },

    handleRemoveFeatureMarkClick(fn) {
      this.$store.commit(UPDATE_HIGHLIGHTED_LAT_LNG, undefined);
      fn();
    },

    handleAddBoundingBoxClick(fn) {
      this.bboxAddedCallback = fn;
      this.$store.commit(UPDATE_BBOX_BEING_ADDED, { active: true, bounds: undefined });
    },
  },
};
</script>

<template>
  <editor-menu-bubble :editor="editor" :keep-in-bounds="true" v-slot="{ commands, getMarkAttrs, isActive, menu }">
    <div
      class="menububble"
      :class="{ 'is-active': menu.isActive }"
      :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">

      <b-button
        v-if="!isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
        class="menububble__button menububble__button__mark"
        :class="{ 'is-active': isActive.featureMark() }"
        @click="handleAddFeatureMarkClick(commands.featureMark)"
        icon-left="map-marker-plus"></b-button>

      <b-button
        v-if="isNewFeatureMarkButtonVisible(getMarkAttrs('featureMark'))"
        class="menububble__button"
        :class="{ 'is-active': isActive.featureMark() }"
        @click="handleRemoveFeatureMarkClick(commands.featureMark)"
        icon-left="map-marker-minus"></b-button>

      <b-button
        v-if="!isNewBboxMarkVisible(getMarkAttrs('bboxMark'))"
        class="menububble__button menububble__button__bbox"
        :class="{ 'is-active': isActive.bboxMark() }"
        @click="handleAddBoundingBoxClick(commands.bboxMark)"
        icon-left="fullscreen"></b-button>

      <b-button
        v-if="isNewBboxMarkVisible(getMarkAttrs('bboxMark'))"
        class="menububble__button menububble__button__bbox"
        :class="{ 'is-active': isActive.bboxMark() }"
        @click="commands.bboxMark()"
        icon-left="fullscreen-exit">
      </b-button>
    </div>
  </editor-menu-bubble>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: $primary;
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
    border-radius: 3px;
    cursor: pointer;

    &:hover,
    &:focus,
    &.is-active {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }

    &__mark:focus::after,
    &__bbox:focus::after {
      font-size: 8px;
      line-height: 14px;
      padding-left: 7px;
    }

    &__mark:focus::after {
      content: 'Klikněte do mapy';
    }

    &__bbox:focus::after {
      content: 'Táhnutím v mapě označte oblast';
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
</style>
