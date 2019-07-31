import axios from 'axios';

import { setPath } from './store.helpers';

const trackModule = {
  namespaced: true,
  state: {
    data: {
      url: null,
      track: null,
    },
  },
  mutations: {
    setTrack: setPath(['data', 'track']),
    resetTrack(state) {
      state.data.url = null;
      state.data.track = null;
    },
  },
  actions: {
    async loadTrack({ commit, state }) {
      try {
        const track = await axios.get(state.data.url);
        commit('setTrack', track.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
  },
};

export default trackModule;
