import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { STORY_LINK_DATA_ID } from '@/config/config';
import featuresModule from './store.features';
import storyModule from './store.story';
import trackModule from './store.track';
import { set, setPath } from './store.helpers';
import {
  RESET_HIGHLIGHTED_LINK,
  SET_BBOX,
  SET_BBOX_HOVERED,
  SET_FEATURES_URL,
  SET_HIGHLIGHTED_FEATURE,
  SET_SHOULD_SCROLL_TO_FEATURE,
  SET_STORY_NAME,
  SET_STORY_URL,
  SET_TRACK_URL,
} from './mutations';

Vue.use(Vuex);

const LOCALE_STORAGE_KEY = 'cartostory';

const vuexLocal = new VuexPersistence({
  key: LOCALE_STORAGE_KEY,
  storage: window.localStorage,
  strictMode: true,
  reducer: state => ({
    storyName: state.story.data.name,
    storyUrl: state.story.data.url,
    featuresUrl: state.features.data.url,
    trackUrl: state.track.data.url,
  }),
  saveState: (key, state, storage) => {
    const { storyName, storyUrl, featuresUrl, trackUrl } = state;
    const currentStorage = JSON.parse(storage.getItem(key)) || [];

    if (!storyName || !storyUrl || !featuresUrl || !trackUrl) {
      return;
    }

    if (currentStorage.find(item => item.storyName === storyName && item.storyUrl === storyUrl
      && item.featuresUrl === featuresUrl && item.trackUrl === trackUrl)) {
    } else {
      currentStorage.push(state);
      storage.setItem(key, JSON.stringify(currentStorage));
    }
  },
  restoreState: (key, storage) => JSON.parse(storage.getItem(key)) || [],
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
    commit(SET_BBOX, payload);
  },
  setBboxHovered({ commit }, payload) {
    commit(SET_BBOX_HOVERED, payload);
  },
  setHighlightedFeature({ commit }, feature) {
    commit(SET_BBOX, null);
    commit(SET_HIGHLIGHTED_FEATURE, feature);
  },
  setShouldScrollToFeature({ commit }, should) {
    commit(SET_SHOULD_SCROLL_TO_FEATURE, should);
  },
  setStoryName({ commit }, name) {
    commit(SET_STORY_NAME, name);
  },
  setUrls({ commit }, payload) {
    commit(SET_FEATURES_URL, payload.featuresUrl);
    commit(SET_STORY_URL, payload.storyUrl);
    commit(SET_TRACK_URL, payload.trackUrl);
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

export const mutations = {
  RESTORE_MUTATION(state, payload) {
    if (!payload) {
      return;
    }

    state.features.data.url = payload[0] && payload[0].featuresUrl;
    state.story.data.url = payload[0] && payload[0].storyUrl;
    state.story.data.name = payload[0] && payload[0].storyName;
    state.track.data.url = payload[0] && payload[0].trackUrl;
    state.availableStories = payload;
  },
  [SET_HIGHLIGHTED_FEATURE]: set('highlightedFeature'),
  [SET_BBOX]: set('bbox'),
  [SET_BBOX_HOVERED]: set('bboxHovered'),
  [SET_SHOULD_SCROLL_TO_FEATURE]: set('shouldScrollToFeature'),
  [SET_FEATURES_URL]: setPath(['features', 'data', 'url']),
  [SET_STORY_NAME]: setPath(['story', 'data', 'name']),
  [SET_STORY_URL]: setPath(['story', 'data', 'url']),
  [SET_TRACK_URL]: setPath(['track', 'data', 'url']),
  [RESET_HIGHLIGHTED_LINK]: () => {
    document.querySelectorAll(`[${STORY_LINK_DATA_ID}]`).forEach((elm) => {
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
    const highlightedElement = document.querySelectorAll(`[${STORY_LINK_DATA_ID}='${highlightedId}']`)[0];
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
