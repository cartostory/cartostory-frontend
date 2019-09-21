import axios from 'axios';

import { setPath } from './store.helpers';

const storyModule = {
  namespaced: true,
  state: {
    data: {
      url: null,
      story: null,
    },
  },
  mutations: {
    setStory: setPath(['data', 'story']),
  },
  actions: {
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
  },
};

export default storyModule;

