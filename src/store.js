import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: {
      track: null,
      features: null,
    },
    story: {
      text: null,
    },
    highlightedId: null,
    regex: /data-url='([^']+)'/g,
  },
  mutations: {
    setStory(state, payload) {
      state.story = payload;
    },
    setTrack(state, payload) {
      state.map.track = payload
    },
    setFeatures(state, payload) {
      state.map.features = payload;
    },
    resetStory(state) {
      state.story = null;
    },
    resetTrack(state) {
      state.map.track = null;
    },
    resetFeatures(state) {
      state.map.features = null;
    },
  },
  actions: {
    async loadStory({ commit }) {
      //loadTrack()
      //loadText()
    },
    async loadTrack({ commit }) {

    },
    async loadText({ commit }) {
      // loadFeatures()
    },
    async loadFeatures({ commit }) {

    },
  },
});

