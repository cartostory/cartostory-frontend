import { mutations } from '@/store/newStore';
import {
  UPDATE_FEATURE_MARK_CALLBACK,
  UPDATE_MAP_CENTER,
  UPDATE_STORY,
  UPDATE_STORY_NAME,
  UPDATE_STORY_TEXT,
  UPDATE_STORY_URL,
  UPDATE_TRACK,
} from '@/store/mutations';
import { getPath, setPath } from '@/store/store.helpers';

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

describeHelper('it sets feature mark callback', UPDATE_FEATURE_MARK_CALLBACK, ['addFeatureMarkCallback'], function () {});
describeHelper('it sets map center', UPDATE_MAP_CENTER, ['map', 'center'], {lat: 0, lng: 0});
describeHelper('it sets story', UPDATE_STORY, ['story'], {name: 'name', story: 'story', track: 'track'});
describeHelper('it sets story name', UPDATE_STORY_NAME, ['story', 'name'], 'story name');
describeHelper('it sets story text', UPDATE_STORY_TEXT, ['story', 'text'], 'story text');
describeHelper('it sets story url', UPDATE_STORY_URL, ['storyUrl'], 'url');
describeHelper('it sets story track', UPDATE_TRACK, ['story', 'track'], 'track');

