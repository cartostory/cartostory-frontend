import Vue from 'vue';
import Vuex from 'vuex';

import storyModule from './store.story';
import trackModule from './store.track';
import { set, setPath, toggle } from './store.helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    story: storyModule,
    track: trackModule,
  },
  state: {
    bbox: null,
    context: null,
    enableSync: false,
    features: [],
    highlightedFeature: null,
  },
  mutations: {
    setHighlightedFeature: set('highlightedFeature'),
    setContext: set('context'),
    setBbox: set('bbox'),
    toggleSync: toggle('enableSync'),
    setStoryUrl: setPath(['story', 'data', 'url']),
    setTrackUrl: setPath(['track', 'data', 'url']),
    addFeature(state, feature) {
      if (!state.features.includes(feature)) {
        state.features.push(feature);
      }
    },
    resetFeatures(state) {
      state.features = [];
    },
    resetHighlightedLink(state) {
      state.features.forEach(f => f.link.classList && f.link.classList.remove('highlighted'));
    },
    setHighlightedLink(state) {
      if (state.highlightedFeature.link) {
        state.highlightedFeature.link.classList.add('highlighted');
      }
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
      commit('setBbox', null);
    },
    highlightedFeatureInContext({ commit }, payload) {
      commit('setHighlightedFeature', null);
      commit('setHighlightedFeature', payload.feature);
      commit('setContext', payload.context);
    },
    setContext({ commit }, payload) {
      commit('setContext', payload);
    },
    setHighlightedFeature({ commit }, feature) {
      commit('setHighlightedFeature', feature);
    },
    setUrls({ commit, dispatch }, payload) {
      commit('setStoryUrl', payload.storyUrl);
      commit('setTrackUrl', payload.trackUrl);
      dispatch('loadStory');
    },
    async loadStory({ dispatch }) {
      await dispatch('story/loadText', { root: true });
      await dispatch('track/loadTrack', { root: true });
    },
  },
});
