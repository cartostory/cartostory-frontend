import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import { set, setPath } from './store.helpers';
import { UPDATE_STORY, UPDATE_STORY_URL } from '@/store/mutations.js';

Vue.use(Vuex);

const state = {
  storyUrl: undefined,
  story: {
    name: undefined,
    text: undefined,
    track: undefined,
  },
  availableStories: [],
};

export const mutations = {
  [UPDATE_STORY]: set('story'),
  [UPDATE_STORY_URL]: set('storyUrl'),
};

const actions = {
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

export default ({
  strict: true,
  state,
  mutations,
  actions,
});
