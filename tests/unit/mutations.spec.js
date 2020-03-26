import { expect } from 'chai';
eval("require('jsdom-global')()"); // see https://github.com/vuejs/vue-test-utils/issues/1288

import { mutations } from '@/store/store';
import {
  RESET_HIGHLIGHTED_LINK,
  SET_BBOX,
  SET_BBOX_HOVERED,
  SET_FEATURES_URL,
  SET_HIGHLIGHTED_FEATURE,
} from '@/store/mutations';

const BBOX = [[0, 0], [10, 10]];
const FEATURES_URL = 'https://gist.githubusercontent.com/zimmicz/ec2c456bef24e46554db30d4540d41f9/raw/11d3380df2575b108ab8e04b2e5618567aaf97cc/hochschwab-features.json';

describe('SET_BBOX', () => {
  it('it sets bbox', () => {
    const state = {
      bbox: undefined,
    };

    mutations[SET_BBOX](state, BBOX);

    expect(state.bbox).equal(BBOX);
  });
});

describe('SET_BBOX_HOVERED', () => {
  it('it sets bbox', () => {
    const state = {
      bboxHovered: undefined,
    };

    mutations[SET_BBOX_HOVERED](state, BBOX);

    expect(state.bboxHovered).equal(BBOX);
  });
});

describe('SET_FEATURES_URL', () => {
  it('it sets features url', () => {
    const state = {
      features: {
        data: {
          url: undefined,
        },
      },
    };

    mutations[SET_FEATURES_URL](state, FEATURES_URL);

    expect(state.features.data.url).equal(FEATURES_URL);
  });
});

describe('SET_HIGHLIGHTED_FEATURE', () => {
  it('it sets highlighted feature', () => {
    const feature = 'feature';
    const state = {
      highlightedFeature: undefined,
    };
    mutations[SET_HIGHLIGHTED_FEATURE](state, feature);
    expect(state.highlightedFeature).equal(feature);
  });
});

describe('RESET_HIGHLIGHTED_LINK', () => {
  it('it resets highlighted link', () => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('data-cs-id', 1);
    link.classList = 'highlighted';
    mutations[RESET_HIGHLIGHTED_LINK]();
    const highlightedFeatures = document.querySelectorAll(['data-cs-id']).length;
    expect(highlightedFeatures).equal(0);
  });
});
