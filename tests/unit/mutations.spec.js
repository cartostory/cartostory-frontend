import { mutations } from '@/store/newStore';
import {
  UPDATE_STORY,
  UPDATE_STORY_URL,

  RESET_HIGHLIGHTED_LINK,
  SET_BBOX,
  SET_BBOX_HOVERED,
  SET_HIGHLIGHTED_FEATURE,
  SET_SHOULD_SCROLL_TO_FEATURE,
} from '@/store/mutations';
import { getPath, setPath } from '@/store/store.helpers';
import { STORY_LINK_DATA_ID } from '@/config/config';
import { defaultUrl } from '../helpers/data.js';

const BBOX = [[0, 0], [10, 10]];

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

describeHelper('it sets story url', UPDATE_STORY_URL, ['storyUrl'], 'url');
describeHelper('it sets story url', UPDATE_STORY, ['story'], {name: 'name', story: 'story', track: 'track'});
//describeHelper('it sets bbox', SET_BBOX, ['bbox'], BBOX);
//describeHelper('it sets bbox hovered', SET_BBOX_HOVERED, ['bboxHovered'], BBOX);
//describeHelper('it sets highlighted feature', SET_HIGHLIGHTED_FEATURE, ['highlightedFeature'], 'feature');
//describeHelper('it sets should scroll to feature', SET_SHOULD_SCROLL_TO_FEATURE, ['shouldScrollToFeature'], true);

//describe('RESET_HIGHLIGHTED_LINK', () => {
  //it('it resets highlighted link', () => {
    //const link = document.createElement('a');
    //document.body.appendChild(link);
    //link.setAttribute(STORY_LINK_DATA_ID, 1);
    //link.classList = 'highlighted';
    //mutations[RESET_HIGHLIGHTED_LINK]();
    //const features = document.querySelectorAll('a').length;
    //expect(features).toEqual(1);
    //const highlightedFeatures = document.querySelectorAll([STORY_LINK_DATA_ID]).length;
    //expect(highlightedFeatures).toEqual(0);
  //});
//});
