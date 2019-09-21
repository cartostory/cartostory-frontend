import Vue from 'vue';
import Vuex from 'vuex';

import featuresModule from './store.features';
import storyModule from './store.story';
import trackModule from './store.track';
import { set, setPath } from './store.helpers';

Vue.use(Vuex);

const state = {
  bbox: undefined,
  bboxHovered: undefined,
  highlightedFeature: undefined,
  shouldScrollToFeature: undefined,
};

const actions = {
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
  setShouldScrollToFeature( { commit }, should ) {
    commit('setShouldScrollToFeature', should);
  },
  setUrls({ commit }, urls) {
    commit('setFeaturesUrl', urls.featuresUrl);
    commit('setStoryUrl', urls.storyUrl);
    commit('setTrackUrl', urls.trackUrl);
  },
  async loadStory({ dispatch }) {
    await dispatch('story/loadText', { root: true });
    await dispatch('track/loadTrack', { root: true });
    await dispatch('features/loadFeatures', { root: true });
  },
};

const modules = {
  features: featuresModule,
  story: storyModule,
  track: trackModule,
};

const mutations = {
  setHighlightedFeature: set('highlightedFeature'),
  setBbox: set('bbox'),
  setBboxHovered: set('bboxHovered'),
  setShouldScrollToFeature: set('shouldScrollToFeature'),
  setFeaturesUrl: setPath(['features', 'data', 'url']),
  setStoryUrl: setPath(['story', 'data', 'url']),
  setTrackUrl: setPath(['track', 'data', 'url']),
  resetHighlightedLink() {
    document.querySelectorAll('[data-cs-id]').forEach((elm) => {
      if (elm.classList) {
        elm.classList.remove('highlighted');
      }
    });
  },
  setHighlightedLink(state) {
    if (!state.highlightedFeature) {
      return;
    }

    const highlightedId = state.highlightedFeature.properties.id;
    const highlightedElement = document.querySelectorAll(`[data-cs-id='${highlightedId}']`)[0];
    if (state.highlightedFeature && highlightedElement) {
      elm.classList.add('highlighted');
    }
  },
};

export default ({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  state,
  mutations,
  actions,
});
