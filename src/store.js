import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    track: null,
    features: [],
    story: null,
    highlightedId: null,
    regex: /data-url='([^']+)'/g,
    recenterMap: false,
  },
  mutations: {
    setHighlightedId(state, payload) {
      state.highlightedId = payload;
    },
    setStory(state, payload) {
      state.story = payload;
    },
    setTrack(state, payload) {
      state.track = payload
    },
    addFeature(state, payload) {
      if (!state.features.includes(payload)) {
        state.features.push(payload);
      }
    },
    resetHighlightedId(state) {
      state.highlightedId = null;
    },
    resetStory(state) {
      state.story = null;
    },
    resetTrack(state) {
      state.track = null;
    },
    resetFeatures(state) {
      state.features = null;
    },
    resetHighlighted(state) {
      state.features.forEach(f => f.link.classList && f.link.classList.remove('highlighted'));
    },
    setHighlightedLink(state, payload) {
      const f = state.features.find(f => f.id === payload);
      f.link.classList.add('highlighted');
    },
    recenterMap(state, payload) {
      state.recenterMap = payload;
    },
  },
  actions: {
    recenterMap({ commit }, payload) {
      commit('recenterMap', payload);
    },
    changeHighlighted({ commit }, payload) {
      commit('resetHighlighted');
      commit('setHighlightedId', payload);
      commit('setHighlightedLink', payload);
    },
    resetHighlighted({ commit }) {
      commit('resetHighlighted');
    },
    setHighlightedId({ commit }, payload) {
      commit('setHighlightedId', payload);
    },
    async loadStory({ dispatch, commit }) {
      await dispatch('loadText');
      await dispatch('loadTrack');
      await dispatch('loadFeatures');
    },
    async loadTrack({ commit }) {
      try {
        const track = await axios.get('/data/tracks/track-20180106-fatra.json');
        commit('setTrack', track.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    async loadText({ commit }) {
      try {
        const story = await axios.get('/data/stories/story-20180106-fatra.json');
        commit('setStory', story.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    loadFeatures({ commit, getters }) {
      getters.links.forEach((l, i) => {
        const url = l.attributes.getNamedItem('data-url').value;
        axios.get(url)
          .then(geojson => {
            const f = {
              id: i,
              link: l,
              feature: geojson.data,
            };
            l.id = `cs-link-${f.id}`;
            commit('addFeature', f);
          });
      });
    },
  },
  getters: {
    links: state => [...document.querySelectorAll('a[data-url]')],
    highlightedFeature: state => state.features && state.features.find(f => f.id === state.highlightedId),
  },
});

