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
  },
  mutations: {
    setHighlightedFeature: set('highlightedFeature'),
    setContext: set('context'),
    setBbox: set('bbox'),
    setBboxHovered: set('bboxHovered'),
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
      if (payload) {
        commit('setBbox', null);
      }
      commit('setBbox', payload);
    },
    setBboxHovered({ commit }, payload) {
      if (payload) {
        commit('setBboxHovered', null);
      }
      commit('setBboxHovered', payload);
    },
    highlightedFeatureInContext({ commit }, payload) {
      if (payload) {
        commit('setHighlightedFeature', null);
      }
      commit('setHighlightedFeature', payload.feature);
      commit('setContext', payload.context);
    },
    setContext({ commit }, payload) {
      commit('setContext', payload);
    },
    setHighlightedFeature({ commit }, feature) {
      if (feature) {
        commit('setHighlightedFeature', null);
      }
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
  getters: {
    bboxGeoJson: state => state.bbox && L.rectangle(state.bbox).toGeoJSON(),
    featuresInsideBbox: (state, getters) => {
      if (!getters.bboxGeoJson) {
        return null;
      }

      const features = state.features.map(f => f.feature);
      const fc = turf.featureCollection(features);
      const pointsWithinBbox = turf.pointsWithinPolygon(fc, getters.bboxGeoJson);

      return pointsWithinBbox.features;
    },
    trackInsideBbox: (state, getters) => {
      if (!getters.bboxGeoJson) {
        return null;
      }

      const parts = [];
      const track = state.track.data.track.features[0];
      const { coordinates } = track.geometry;

      coordinates.forEach((part) => {
        const split = turf.lineSplit(turf.lineString(part), getters.bboxGeoJson);
        const oddPair = turf.booleanPointInPolygon(point(part[0]), getters.bboxGeoJson)
          ? 0
          : 1;

        split.features.forEach((splitedPart, i) => {
          if ((i + oddPair) % 2 === 0) {
            parts.push(splitedPart);
          }
        });
      });

      return featureCollection(parts);
    },
  },
});
