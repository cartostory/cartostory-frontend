import Vue from 'vue';
import Vuex from 'vuex';
import chunk from 'lodash.chunk';
import mapDeep from 'deepdash-es/mapDeep';
import pickDeep from 'deepdash-es/pickDeep';

import { getInstance } from '@/auth/index';
import { load } from '@/services/story';
import axiosInstance from '@/services/axios';
import { STORY_LINK_BBOX_ATTR, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import {
  REMOVE_ERROR,
  UPDATE_BBOX_BEING_ADDED,
  UPDATE_EDITABLE,
  UPDATE_ERRORS,
  UPDATE_FEATURE_BEING_ADDED,
  UPDATE_HIGHLIGHTED_BBOX,
  UPDATE_HIGHLIGHTED_LAT_LNG,
  UPDATE_LOADING,
  UPDATE_MAP_CENTER,
  UPDATE_SHOULD_TEXT_SCROLL,
  UPDATE_STORY,
  UPDATE_STORY_AUTHOR,
  UPDATE_STORY_NAME,
  UPDATE_STORY_TEXT,
  UPDATE_STORY_URL,
  UPDATE_TOKEN,
  UPDATE_TRACK,
} from '@/store/mutations';
import { set, setPath } from './store.helpers';

Vue.use(Vuex);

const state = {
  auth: {
    token: undefined,
  },
  editable: false,
  errors: [],
  bboxBeingAdded: {
    active: false,
    bounds: undefined,
  },
  featureBeingAdded: {
    active: false,
    position: undefined,
  },
  loading: false,
  storyUrl: undefined,
  story: {
    author: undefined,
    name: undefined,
    text: undefined,
    track: undefined,
  },
  availableStories: [],
  highlightedBbox: undefined,
  highlightedLatLng: undefined,
  shouldTextScroll: undefined,
};

export const mutations = {
  // eslint-disable-next-line no-shadow
  [UPDATE_TOKEN]: setPath(['auth', 'token']),
  /* eslint-disable-next-line no-shadow */
  [REMOVE_ERROR](state, error) {
    const idx = state.errors.findIndex(e => e.title === error.title && e.message === error.message);
    if (idx > -1) {
      state.errors.splice(idx, 1);
    }
  },
  [UPDATE_BBOX_BEING_ADDED]: set('bboxBeingAdded'),
  [UPDATE_FEATURE_BEING_ADDED]: set('featureBeingAdded'),
  [UPDATE_EDITABLE]: set('editable'),
  /* eslint-disable-next-line no-shadow */
  [UPDATE_ERRORS](state, newErorr) {
    state.errors = [...state.errors, newErorr];
  },
  /* eslint-disable-next-line no-shadow */
  [UPDATE_HIGHLIGHTED_BBOX](state, bbox) {
    let payload;

    if (bbox) {
      payload = [
        {
          lat: bbox[0][0],
          lng: bbox[0][1],
        },
        {
          lat: bbox[1][0],
          lng: bbox[1][1],
        },
      ];
    }

    state.highlightedBbox = payload;
  },
  /* eslint-disable-next-line no-shadow */
  [UPDATE_HIGHLIGHTED_LAT_LNG](state, latLng) {
    if (!latLng) {
      state.highlightedLatLng = undefined;
    } else {
      state.highlightedLatLng = {
        lat: Number.parseFloat(latLng[STORY_LINK_LAT_ATTR]),
        lng: Number.parseFloat(latLng[STORY_LINK_LNG_ATTR]),
      };
    }
  },
  [UPDATE_LOADING]: set('loading'),
  [UPDATE_MAP_CENTER]: setPath(['map', 'center']),
  [UPDATE_SHOULD_TEXT_SCROLL]: set('shouldTextScroll'),
  [UPDATE_STORY]: set('story'),
  [UPDATE_STORY_AUTHOR]: setPath(['story', 'author']),
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
  async loadStory({ commit }, storyId) {
    commit(UPDATE_LOADING, true);
    const result = (await load(storyId)).data.story;
    commit(UPDATE_STORY, result.story);
    commit(UPDATE_STORY_AUTHOR, result.author);
    commit(UPDATE_LOADING, false);
  },
  // eslint-disable-next-line no-shadow
  async retrieveToken({ commit, state }) {
    if (!state.auth.token) {
      const instance = getInstance();
      const token = await instance.getTokenSilently();
      commit(UPDATE_TOKEN, `Bearer ${token}`);
    }

    axiosInstance.defaults.headers.common.Authorization = state.auth.token;
    return state.auth.token;
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
        .map((item, id) => {
          const [upperLeft, lowerRight] = item;
          let highlighted = false;

          if (state.highlightedBbox) {
            const { lat: upperLeftLat, lng: upperLeftLng } = state.highlightedBbox[0];
            const { lat: lowerRightLat, lng: lowerRightLng } = state.highlightedBbox[1];
            const highlightedBbox = [upperLeftLat, upperLeftLng, lowerRightLat, lowerRightLng];
            highlighted = [...upperLeft, ...lowerRight].every((val, idx) => val === highlightedBbox[idx]);
          }

          return {
            id: `bbox-${id}`,
            bounds: [
              [item[0][0], item[0][1]],
              [item[1][0], item[1][1]],
            ],
            highlighted,
          };
        });
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
      result = chunk(features, 2)
        .map((item) => {
          const lat = state.highlightedLatLng && state.highlightedLatLng.lat;
          const lng = state.highlightedLatLng && state.highlightedLatLng.lng;
          return {
            lat: item[0],
            lng: item[1],
            highlighted: item[0] === lat && item[1] === lng,
          };
        });
    }

    return result;
  },
};

export default new Vuex.Store({
  strict: true,
  getters,
  state,
  mutations,
  actions,
});
