import axios from 'axios';

import { setPath } from './store.helpers';
import { RESET_HIGHLIGHTED_LINK, SET_STORY } from './mutations';

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
    commit(RESET_HIGHLIGHTED_LINK, undefined, { root: true });
  },
  async loadText({ commit, state }) {
    try {
      const story = await axios.get(state.data.url);
      commit(SET_STORY, story.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
};

const mutations = {
  [SET_STORY]: setPath(['data', 'story']),
};

const storyModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default storyModule;
