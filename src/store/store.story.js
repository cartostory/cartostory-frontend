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
      commit('setHighlightedLink', null, { root: true });
    },
    resetHighlightedLink({ commit }) {
      commit('resetHighlightedLink', null, { root: true });
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
    loadFeatures({ commit }) {
      document.querySelectorAll('a[data-url]').forEach((l, i) => {
        const url = l.attributes.getNamedItem('data-url').value;
        axios.get(url)
          .then((geojson) => {
            const f = {
              id: i,
              link: l,
              feature: geojson.data,
            };
            l.id = `cs-link-${f.id}`;
            commit('addFeature', f, { root: true });
          });
      });
    },
  },
};

export default storyModule;
