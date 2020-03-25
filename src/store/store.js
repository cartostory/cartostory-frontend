import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import featuresModule from './store.features';
import storyModule from './store.story';
import trackModule from './store.track';
import { set, setPath } from './store.helpers';

Vue.use(Vuex);

const LOCALE_STORAGE_KEY = 'cartostory';

const vuexLocal = new VuexPersistence({
  key: LOCALE_STORAGE_KEY,
  storage: window.localStorage,
  strictMode: true,
  reducer: (state) =>  ({
    storyName: state.story.data.name,
    storyUrl: state.story.data.url,
    featuresUrl: state.features.data.url,
    trackUrl: state.track.data.url,
  }),
  saveState: (key, state, storage) => {
    const {storyName, storyUrl, featuresUrl, trackUrl} = state;
    const currentStorage = JSON.parse(storage.getItem(key)) || [];

    if (!storyName || !storyUrl || !featuresUrl || !trackUrl) {
      return;
    }

    if (currentStorage.find(item => item.storyName === storyName &&  item.storyUrl === storyUrl &&
      item.featuresUrl === featuresUrl && item.trackUrl === trackUrl)) {
    } else {
      currentStorage.push(state);
      storage.setItem(key, JSON.stringify(currentStorage));
    }
  },
  restoreState: (key, storage) => {
    return JSON.parse(storage.getItem(key)) || [];
  },
});

const plugins = [
  vuexLocal.plugin,
];

const baseState = {
  availableStories: [],
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
  setShouldScrollToFeature({ commit }, should) {
    commit('setShouldScrollToFeature', should);
  },
  setStoryName({ commit }, name) {
    commit('setStoryName', name);
  },
  setUrls({ commit }, payload) {
    commit('setFeaturesUrl', payload.featuresUrl);
    commit('setStoryUrl', payload.storyUrl);
    commit('setTrackUrl', payload.trackUrl);
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
  RESTORE_MUTATION(state, payload) {
    if (!payload) {
      return;
    }

    state.features.data.url = payload[0].featuresUrl;
    state.story.data.url = payload[0].storyUrl;
    state.story.data.name = payload[0].storyName;
    state.track.data.url = payload[0].trackUrl;
    state.availableStories = payload;
  },
  setHighlightedFeature: set('highlightedFeature'),
  setBbox: set('bbox'),
  setBboxHovered: set('bboxHovered'),
  setShouldScrollToFeature: set('shouldScrollToFeature'),
  setFeaturesUrl: setPath(['features', 'data', 'url']),
  setStoryName: setPath(['story', 'data', 'name']),
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
      highlightedElement.classList.add('highlighted');
    }
  },
};

export default ({
  strict: true,
  modules,
  state: baseState,
  mutations,
  actions,
  plugins,
});
