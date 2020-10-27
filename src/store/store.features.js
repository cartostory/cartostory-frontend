import axios from 'axios';

import { setPath } from './store.helpers';

const state = {
  data: {
    url: null,
    features: null,
  },
};

const actions = {
  async loadFeatures({ commit, state }) {
    try {
      const features = await axios.get(state.data.url);
      commit('setFeatures', features.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
};

const getters = {
  getFeatureById: state => (id) => {
    if (!state.data.features) {
      return undefined;
    }

    return state.data.features.find(features => features.properties.id == id);
  },
};

const mutations = {
  setFeatures: setPath(['data', 'features']),
};

const featuresModule = {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
};

export default featuresModule;
