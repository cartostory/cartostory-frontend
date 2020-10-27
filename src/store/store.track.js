import axios from 'axios';
import {
  booleanPointInPolygon,
  featureCollection,
  lineSplit,
  lineString,
  point,
  pointsWithinPolygon,
} from '@turf/turf';

import { setPath } from './store.helpers';
import { SET_TRACK } from './mutations';

const turf = {
  booleanPointInPolygon,
  featureCollection,
  lineSplit,
  lineString,
  point,
  pointsWithinPolygon,
};
const trackModule = {
  namespaced: true,
  state: {
    data: {
      url: null,
      track: null,
    },
  },
  mutations: {
    [SET_TRACK]: setPath(['data', 'track']),
  },
  actions: {
    async loadTrack({ commit, state }) {
      try {
        const track = await axios.get(state.data.url);
        commit(SET_TRACK, track.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
  },
  getters: {
    bboxGeoJson: (state, getters, rootState) => rootState.bbox && L.rectangle(rootState.bbox).toGeoJSON(),
    featuresInsideBbox: (state, getters, rootState) => {
      if (!getters.bboxGeoJson) {
        return null;
      }

      const { features } = rootState.features.data;
      const fc = turf.featureCollection(features);
      const pointsInsideBbox = turf.pointsWithinPolygon(fc, getters.bboxGeoJson);

      return pointsInsideBbox && pointsInsideBbox.features;
    },
    trackBboxRelation: (state, getters, rootState) => (relation) => {
      const ALLOWED_RELATIONS = ['within', 'disjoint'];

      if (!ALLOWED_RELATIONS.includes(relation)) {
        throw new Error(`bbox relation not recognized, use one of ${ALLOWED_RELATIONS.join(', ')}`);
      }

      if (!getters.bboxGeoJson) {
        return null;
      }

      const parts = [];
      const track = rootState.track.data.track.features[0];
      const { coordinates } = track.geometry;

      coordinates.forEach((part) => {
        const split = turf.lineSplit(turf.lineString(part), getters.bboxGeoJson);
        const oddPair = turf.booleanPointInPolygon(point(part[0]), getters.bboxGeoJson)
          ? 0
          : 1;

        split.features.forEach((splitedPart, i) => {
          const pairComp = relation === 'disjoint'
            ? (i + oddPair) % 2 !== 0
            : (i + oddPair) % 2 === 0;

          if (pairComp) {
            parts.push(splitedPart);
          }
        });
      });
      return turf.featureCollection(parts);
    },
  },
};

export default trackModule;
