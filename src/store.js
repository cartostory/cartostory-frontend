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
    highlightedFeature: null,
    regex: /data-url='([^']+)'/g,
    recenterMap: false,
  },
  mutations: {
    setHighlightedFeature(state, feature) {
      state.highlightedFeature = feature;
    },
    setStory(state, story) {
      state.story = story;
    },
    setTrack(state, track) {
      state.track = track;
    },
    addFeature(state, feature) {
      if (!state.features.includes(feature)) {
        state.features.push(feature);
      }
    },
    resetHighlightedFeature(state) {
      state.highlightedFeature = null;
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
    setHighlightedLink(state, feature) {
      const f = state.features.find(f => f.id === feature.id);
      f.link.classList.add('highlighted');
    },
    recenterMap(state, shouldRecenter) {
      state.recenterMap = shouldRecenter;
    },
  },
  actions: {
    recenterMap({ commit }, shouldRecenter) {
      commit('recenterMap', shouldRecenter);
    },
    changeHighlighted({ commit }, feature) {
      commit('resetHighlighted');
      commit('setHighlightedFeature', feature);
      commit('setHighlightedLink', feature);
    },
    resetHighlighted({ commit }) {
      commit('resetHighlighted');
    },
    setHighlightedFeature({ commit }, feature) {
      commit('setHighlightedFeature', feature);
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
  },
});

