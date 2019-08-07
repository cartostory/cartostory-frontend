import Vue from 'vue';
import Vuex from 'vuex';
import L from 'leaflet';
import {
  booleanPointInPolygon,
  featureCollection,
  lineSplit,
  lineString,
  point,
  pointsWithinPolygon,
} from '@turf/turf';

import storyModule from './store.story';
import trackModule from './store.track';
import { set, setPath } from './store.helpers';

Vue.use(Vuex);

const turf = {
  booleanPointInPolygon,
  featureCollection,
  lineSplit,
  lineString,
  point,
  pointsWithinPolygon,
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    story: storyModule,
    track: trackModule,
  },
  state: {
    bbox: null,
    bboxHovered: null,
    context: null,
    features: [],
    highlightedFeature: null,
    scrollToFeature: null,
  },
  mutations: {
    setHighlightedFeature: set('highlightedFeature'),
    setContext: set('context'),
    setBbox: set('bbox'),
    setBboxHovered: set('bboxHovered'),
    setScrollToFeature: set('scrollToFeature'),
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
    setBbox({ commit }, payload) {
      commit('setBbox', payload);
    },
    setBboxHovered({ commit }, payload) {
      commit('setBboxHovered', payload);
    },
    setHighlightedFeature({ commit }, feature) {
      commit('setBbox', null);
      commit('setHighlightedFeature', feature);
    },
    setScrollToFeature( { commit }, payload ) {
      commit('setScrollToFeature', payload);
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
