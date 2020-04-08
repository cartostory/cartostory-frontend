import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { findChildrenByMark } from 'prosemirror-utils';

import pickDeep from 'deepdash-es/pickDeep';
import mapDeep from 'deepdash-es/mapDeep';
import chunk from 'lodash.chunk';

import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config.js';
import { set, setPath } from './store.helpers';
import {
  UPDATE_FEATURE_MARK_CALLBACK,
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
};

export const mutations = {
  [UPDATE_FEATURE_MARK_CALLBACK]: set('addFeatureMarkCallback'),
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
    const content = state.story.text && state.story.text.content;

    if (content) {
      const features = mapDeep(pickDeep(state.story.text.content, [STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR]), v => v, {
        leavesOnly: true,
      });
      result = chunk(features, 2).map(item => ({ lat: item[0], lng: item[1] }));
    }

    return result;


    //return state.story && state.story.text && state.story.text.state
      //? findChildrenByMark(state.story.text.state.doc, state.story.text.state.config.schema.marks.featureMark)
          //.map(obj => obj.node.marks[0])
          //.filter(mark => mark.attrs[STORY_LINK_LAT_ATTR])
          //.map(mark => ({ lat: mark.attrs[STORY_LINK_LAT_ATTR], lng: mark.attrs[STORY_LINK_LNG_ATTR]}))
      //: [];
  },
};

export default ({
  strict: true,
  getters,
  state,
  mutations,
  actions,
});
