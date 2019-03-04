import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    track: null,
    features: null,
    story: null,
    highlightedId: null,
    regex: /data-url='([^']+)'/g,
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
    setFeatures(state, payload) {
      state.features = payload;
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
  },
  actions: {
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
    async loadFeatures({ commit, getters }) {
      const featureUrls = new Set(getters.featureUrls);
      const temp = [...Array.from(featureUrls)]
        .map(t => axios.get(t.replace('data-url=', '').replace("'", '').replace("'", '')));
      axios.all(temp)
        .then((results) => {
          const features = results.map((r) => {
            const result = r.data;
            result.properties.url = r.request.responseURL;
            return result;
          });
          commit('setFeatures', features);
        });
    },
  },
  getters: {
    highlightedFeature: state => state.features && state.features.find(f => f.properties.id === state.highlightedId),
    featureUrls: (state, getters) => getters.featureUrlsFromPerex.concat(getters.featureUrlsFromText),
    featureUrlsFromPerex: (state) => {
      if (state.story && (!state.story.perex || state.story.perex.length === 0)) {
        return [];
      }
      const urls = state.story && state.story.perex.map(p => p.match(state.regex));

      if (urls) {
        return [].concat(...urls);
      }
      return [];
    },
    featureUrlsFromText: (state) => {
      if (state.story && (!state.story.sections || state.story.sections.length === 0)) {
        return [];
      }

      const urls = state.story && state.story.sections.map(s => s.text)
        .map(s => s.join(','))
        .map(s => s.match(state.regex));

      if (urls) {
        return [].concat(...urls);
      }
      return [];
    },
  },
});
