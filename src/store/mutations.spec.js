import { mutations } from '@/store/newStore';
import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import {
  UPDATE_BBOX_BEING_ADDED,
  UPDATE_FEATURE_BEING_ADDED,
  UPDATE_HIGHLIGHTED_BBOX,
  UPDATE_HIGHLIGHTED_LAT_LNG,
  UPDATE_MAP_CENTER,
  UPDATE_SHOULD_TEXT_SCROLL,
  UPDATE_STORY,
  UPDATE_STORY_NAME,
  UPDATE_STORY_TEXT,
  UPDATE_STORY_URL,
  UPDATE_TRACK,
} from '@/store/mutations';
import { getPath } from '@/store/store.helpers';

/*
 * @param {string}
 * @param {Function}
 * @param {string[]}
 * @param {any}
 */
const describeHelper = (description, mutation, path, payload, result) => {
  describe(mutation.toString(), () => {
    test(description, () => {
      const state = {};
      mutations[mutation](state, payload);

      expect(getPath(state, path)).toEqual(result || payload);
    });
  });
};

describeHelper(
  'it sets feature mark being added',
  UPDATE_FEATURE_BEING_ADDED,
  ['featureBeingAdded'],
  {
    active: true,
    position: {
      [STORY_LINK_LAT_ATTR]: 0,
      [STORY_LINK_LNG_ATTR]: 10,
    },
  },
);

describeHelper(
  'it sets bbox being added',
  UPDATE_BBOX_BEING_ADDED,
  ['bboxBeingAdded'],
  {
    active: true,
    bounds: [[10, 10], [0, 0]],
  },
);

describeHelper(
  'it sets bbox mark callback',
  UPDATE_HIGHLIGHTED_BBOX,
  ['highlightedBbox'],
  [[1, 2], [3, 4]],
  [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }],
);
describeHelper('it sets map center', UPDATE_MAP_CENTER, ['map', 'center'], { lat: 0, lng: 0 });
describeHelper('it sets whether text should scroll or not', UPDATE_SHOULD_TEXT_SCROLL, ['shouldTextScroll'], false);
describeHelper('it sets story', UPDATE_STORY, ['story'], { name: 'name', story: 'story', track: 'track' });
describeHelper('it sets story name', UPDATE_STORY_NAME, ['story', 'name'], 'story name');
describeHelper('it sets story text', UPDATE_STORY_TEXT, ['story', 'text'], 'story text');
describeHelper('it sets story url', UPDATE_STORY_URL, ['storyUrl'], 'url');
describeHelper('it sets story track', UPDATE_TRACK, ['story', 'track'], 'track');
describeHelper(
  'it sets highlightedLatLng',
  UPDATE_HIGHLIGHTED_LAT_LNG,
  ['highlightedLatLng'],
  { [STORY_LINK_LAT_ATTR]: 0, [STORY_LINK_LNG_ATTR]: 10 },
  { lat: 0, lng: 10 },
);
