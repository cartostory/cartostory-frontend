import { getters } from '@/store/newStore';
import { defaultText } from '../../tests/helpers/data';

describe('vuex getters', () => {
  test('features getter', () => {
    const state = {
      story: defaultText,
    };

    const result = getters.features(state);
    expect(result).toEqual([{ lat: 0, lng: 10 }]);
  });

  test('featuresWithoutHighlighted is the same as features when no highlightedLatLng exists', () => {
    const localGetters = {
      features: [{ lat: 0, lng: 10}],
    };
    const state = {
      story: defaultText,
    }

    const result = getters.featuresWithoutHighlighted(state, localGetters);
    expect(result).toEqual(localGetters.features);
  });

  test('featuresWithoutHighlighted does not contain highlighted feature' , () => {
    const localGetters = {
      features: [{ lat: 0, lng: 10}],
    };
    const state = {
      highlightedLatLng: {
        lat: 0,
        lng: 10,
      },
      story: defaultText,
    }

    const result = getters.featuresWithoutHighlighted(state, localGetters);
    expect(result).toEqual([]);
  });
});
