import { mutations } from '@/store/store';
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
} from '@/store/mutations';
import { getPath, setPath } from '@/store/store.helpers';
import { STORY_LINK_DATA_ID } from '@/config/config';

const BBOX = [[0, 0], [10, 10]];
const FEATURES_URL = 'https://gist.githubusercontent.com/zimmicz/ec2c456bef24e46554db30d4540d41f9/raw/11d3380df2575b108ab8e04b2e5618567aaf97cc/hochschwab-features.json';

/*
 * @param {string}
 * @param {Function}
 * @param {string[]}
 * @param {any}
 */
const describeHelper = (description, mutation, path, payload) => {
  describe(mutation.toString(), () => {
    it(description, () => {
      const state = {};
      const setState = setPath(path);
      setState(state, payload);
      mutations[mutation](state, payload);

      expect(getPath(state, path)).toEqual(payload);
    });
  });
};

describeHelper('it sets bbox', SET_BBOX, ['bbox'], BBOX);
describeHelper('it sets bbox hovered', SET_BBOX_HOVERED, ['bboxHovered'], BBOX);
describeHelper('it sets highlighted feature', SET_HIGHLIGHTED_FEATURE, ['highlightedFeature'], 'feature');
describeHelper('it sets should scroll to feature', SET_SHOULD_SCROLL_TO_FEATURE, ['shouldScrollToFeature'], true);
describeHelper('it sets features url', SET_FEATURES_URL, ['features', 'data', 'url'], FEATURES_URL);
describeHelper('it sets story name', SET_STORY_NAME, ['story', 'data', 'name'], SET_STORY_NAME);
describeHelper('it sets story url', SET_STORY_URL, ['story', 'data', 'url'], SET_STORY_URL);
describeHelper('it sets story url', SET_TRACK_URL, ['track', 'data', 'url'], SET_TRACK_URL);

describe('RESET_HIGHLIGHTED_LINK', () => {
  it('it resets highlighted link', () => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute(STORY_LINK_DATA_ID, 1);
    link.classList = 'highlighted';
    mutations[RESET_HIGHLIGHTED_LINK]();
    const features = document.querySelectorAll('a').length;
    expect(features).toEqual(1);
    const highlightedFeatures = document.querySelectorAll([STORY_LINK_DATA_ID]).length;
    expect(highlightedFeatures).toEqual(0);
  });
});
