import axios from 'axios';

import { setPath } from './store.helpers';

const state = {
  data: {
    name: undefined,
    url: undefined,
    story: undefined,
  },
};

const actions = {
  setHighlightedLink({ commit }) {
    commit('setHighlightedLink', undefined, { root: true });
  },
  resetHighlightedLink({ commit }) {
    commit('resetHighlightedLink', undefined, { root: true });
  },
  async loadText({ commit, state }) {
    try {
      const story = await axios.get(state.data.url);
      commit('setStory', story.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
};

const mutations = {
  setStory: setPath(['data', 'story']),
};

const storyModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default storyModule;
