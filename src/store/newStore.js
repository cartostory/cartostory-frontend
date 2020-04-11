import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import chunk from 'lodash.chunk';
import mapDeep from 'deepdash-es/mapDeep';
import pickDeep from 'deepdash-es/pickDeep';

import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config.js';
import { set, setPath } from './store.helpers';
import {
  UPDATE_FEATURE_MARK_CALLBACK,
  UPDATE_HIGHLIGHTED_LAT_LNG,
  UPDATE_MAP_CENTER,
  UPDATE_STORY,
  UPDATE_STORY_NAME,
  UPDATE_STORY_TEXT,
  UPDATE_STORY_URL,
  UPDATE_TRACK
} from '@/store/mutations.js';

Vue.use(Vuex);

const state = {
  map: {
    center: undefined,
  },
  storyUrl: undefined,
  story: {
    name: undefined,
    text: undefined,
    track: undefined,
  },
  addFeatureMarkCallback: undefined,
  availableStories: [],
  highlightedLatLng: undefined,
};

export const mutations = {
  [UPDATE_FEATURE_MARK_CALLBACK]: set('addFeatureMarkCallback'),
  [UPDATE_HIGHLIGHTED_LAT_LNG](state, latLng) {
    state.highlightedLatLng = {
      lat: Number.parseFloat(latLng[STORY_LINK_LAT_ATTR]),
      lng: Number.parseFloat(latLng[STORY_LINK_LNG_ATTR]),
    };
  },
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
  async loadStory({ commit, state }) {
    try {
      const result = await axios.get(state.storyUrl);
      commit(UPDATE_STORY, result.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
};

const getters = {
  features: state => {
    let result = [];
    let content = undefined;

    if (state.story.text && state.story.text.state) { // editing
      content = state.story.text.state.doc.content;
    } else { // readonly
      content = state.story.text && state.story.text.content;
    }

    if (content) {
      const data = JSON.parse(JSON.stringify(content)); // get rid of vuex reactivity or deepdash would fail
      const features = mapDeep(pickDeep(data, [STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR]), v => v, {
        leavesOnly: true,
      }).filter(item => item !== null);
      result = chunk(features, 2).map(item => ({ lat: item[0], lng: item[1] }));
    }

    return result;
  },

  featuresWithoutHighlighted: (state, getters) => {
    if (!state.highlightedLatLng) {
      return getters.features;
    }

    const { lat, lng } = state.highlightedLatLng;
    return getters.features.filter(feature => feature.lat !== lat && feature.lng !== lng);
  },
};

export default ({
  strict: true,
  getters,
  state,
  mutations,
  actions,
});
