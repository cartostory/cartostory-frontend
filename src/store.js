import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    bbox: null,
    context: null,
    enableSync: false,
    features: [],
    highlightedFeature: null,
    regex: /data-url='([^']+)'/g,
    story: {
      url: null,
      data: null,
    },
    track: {
      url: null,
      data: null,
    },
  },
  mutations: {
    setHighlightedFeature(state, feature) {
      state.highlightedFeature = feature;
    },
    setStory(state, story) {
      state.story.data = story;
    },
    setTrack(state, track) {
      state.track.data = track;
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
    resetHighlightedLink(state) {
      state.features.forEach(f => f.link.classList && f.link.classList.remove('highlighted'));
    },
    setHighlightedLink(state) {
      if (state.highlightedFeature.link) {
        state.highlightedFeature.link.classList.add('highlighted');
      }
    },
    setContext(state, context) {
      state.context = context;
    },
    setBbox(state, bbox) {
      state.bbox = bbox;
    },
    resetBbox(state) {
      state.bbox = null;
    },
    toggleSync(state) {
      state.enableSync = !state.enableSync;
    },
    setUrls(state, urls) {
      state.story.url = urls.storyUrl;
      state.track.url = urls.trackUrl;
    },
  },
  actions: {
    toggleSync({ commit }) {
      commit('toggleSync');
    },
    setBbox({ commit }, payload) {
      commit('setBbox', payload);
    },
    resetBbox({ commit }) {
      commit('resetBbox');
    },
    setHighlightedLink({ commit }) {
      commit('setHighlightedLink');
    },
    highlightedFeatureInContext({ commit }, payload) {
      commit('resetHighlightedFeature');
      commit('setHighlightedFeature', payload.feature);
      commit('setContext', payload.context);
    },
    setContext({ commit }, payload) {
      commit('setContext', payload);
    },
    resetHighlightedLink({ commit }) {
      commit('resetHighlightedLink');
    },
    resetHighlightedFeature({ commit }) {
      commit('resetHighlightedFeature');
    },
    setHighlightedFeature({ commit }, feature) {
      commit('setHighlightedFeature', feature);
    },
    setUrls({ commit, dispatch }, payload) {
      commit('setUrls', payload);
      dispatch('loadStory');
    },
    async loadStory({ dispatch }) {
      await dispatch('loadText');
      await dispatch('loadTrack');
    },
    async loadTrack({ commit }) {
      try {
        const track = await axios.get(this.state.track.url);
        commit('setTrack', track.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    async loadText({ commit }) {
      try {
        const story = await axios.get(this.state.story.url);
        commit('setStory', story.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    async loadFeatures({ commit }) {
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
            commit('addFeature', f);
          });
      });
    },
  },
});
