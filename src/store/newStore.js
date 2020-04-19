import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import chunk from 'lodash.chunk';
import mapDeep from 'deepdash-es/mapDeep';
import pickDeep from 'deepdash-es/pickDeep';

import { STORY_LINK_BBOX_ATTR, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import {
  REMOVE_ERROR,
  UPDATE_BOUNDING_BOX_CALLBACK,
  UPDATE_EDITABLE,
  UPDATE_ERRORS,
  UPDATE_FEATURE_MARK_CALLBACK,
  UPDATE_HIGHLIGHTED_BBOX,
  UPDATE_HIGHLIGHTED_LAT_LNG,
  UPDATE_LOADING,
  UPDATE_MAP_CENTER,
  UPDATE_STORY,
  UPDATE_STORY_NAME,
  UPDATE_STORY_TEXT,
  UPDATE_STORY_URL,
  UPDATE_TRACK,
} from '@/store/mutations';
import { set, setPath } from './store.helpers';

Vue.use(Vuex);

const state = {
  editable: false,
  errors: [],
  loading: false,
  storyUrl: undefined,
  story: {
    name: undefined,
    text: undefined,
    track: undefined,
  },
  addBoundingBoxCallback: undefined,
  addFeatureMarkCallback: undefined,
  availableStories: [],
  highlightedBbox: undefined,
  highlightedLatLng: undefined,
};

export const mutations = {
  /* eslint-disable-next-line no-shadow */
  [REMOVE_ERROR](state, error) {
    const idx = state.errors.findIndex(e => e.title === error.title && e.message === error.message);
    if (idx > -1) {
      state.errors.splice(idx, 1);
    }
  },
  [UPDATE_BOUNDING_BOX_CALLBACK]: set('addBoundingBoxCallback'),
  [UPDATE_EDITABLE]: set('editable'),
  /* eslint-disable-next-line no-shadow */
  [UPDATE_ERRORS](state, newErorr) {
    state.errors = [...state.errors, newErorr];
  },
  [UPDATE_FEATURE_MARK_CALLBACK]: set('addFeatureMarkCallback'),
  [UPDATE_HIGHLIGHTED_BBOX](state, bbox) {
    state.highlightedBbox = [
      {
        lat: bbox[0][0],
        lng: bbox[0][1],
      },
      {
        lat: bbox[1][0],
        lng: bbox[1][1],
      },
    ];
  },
  /* eslint-disable-next-line no-shadow */
  [UPDATE_HIGHLIGHTED_LAT_LNG](state, latLng) {
    state.highlightedLatLng = {
      lat: Number.parseFloat(latLng[STORY_LINK_LAT_ATTR]),
      lng: Number.parseFloat(latLng[STORY_LINK_LNG_ATTR]),
    };
  },
  [UPDATE_LOADING]: set('loading'),
  [UPDATE_MAP_CENTER]: setPath(['map', 'center']),
  [UPDATE_STORY]: set('story'),
  [UPDATE_STORY_NAME]: setPath(['story', 'name']),
  [UPDATE_STORY_TEXT]: setPath(['story', 'text']),
  [UPDATE_STORY_URL]: set('storyUrl'),
  [UPDATE_TRACK]: setPath(['story', 'track']),
};

const actions = {
  updateTrack({ commit }, payload) {
    commit(UPDATE_TRACK, payload);
  },
  updateStoryText({ commit }, payload) {
    commit(UPDATE_STORY_TEXT, payload);
  },
  /* eslint-disable-next-line no-shadow */
  async loadStory({ commit, state }) {
    commit(UPDATE_LOADING, true);
    const result = await axios.get(state.storyUrl);
    commit(UPDATE_STORY, result.data);
  },
};

export const getters = {
  /* eslint-disable-next-line no-shadow */
  content: (state) => {
    let content;

    if (state.story.text && state.story.text.state) { // editing
      ({ content } = state.story.text.state.doc);
    } else { // readonly
      content = state.story.text && state.story.text.content;
    }

    return content && JSON.parse(JSON.stringify(content));
  },

  /* eslint-disable-next-line no-shadow */
  bboxes: (state, getters) => {
    let result = [];
    const data = getters.content;

    if (data) {
      const bboxes = pickDeep(data, STORY_LINK_BBOX_ATTR);
      result = mapDeep(bboxes, v => v, { leavesOnly: true })
        .filter(item => item !== null)
        .map(item => JSON.parse(item))
        .map((item, id) => ({
          id,
          bounds: [
            [item[0][0], item[0][1]],
            [item[1][0], item[1][1]],
          ],
        }));
    }

    return result;
  },

  /* eslint-disable-next-line no-shadow */
  features: (state, getters) => {
    let result = [];
    const data = getters.content;

    if (data) {
      const features = mapDeep(pickDeep(data, [STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR]), v => v, {
        leavesOnly: true,
      }).filter(item => item !== null);
      result = chunk(features, 2).map(item => ({ lat: item[0], lng: item[1] }));
    }

    return result;
  },

  /* eslint-disable-next-line no-shadow */
  featuresWithoutHighlighted: (state, getters) => {
    if (!state.highlightedLatLng) {
      return getters.features;
    }

    const { lat, lng } = state.highlightedLatLng;
    return getters.features.filter(feature => feature.lat !== lat && feature.lng !== lng);
  },
};

export default new Vuex.Store({
  strict: true,
  getters,
  state,
  mutations,
  actions,
});
