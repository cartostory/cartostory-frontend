import { getters } from '@/store/newStore';
import { defaultText } from '../../tests/helpers/data';

describe('vuex getters', () => {
  test('content getter', () => {
    const state = {
      story: defaultText,
    };

    const result = getters.content(state);
    expect(result).toEqual(JSON.parse(JSON.stringify(defaultText.text.content)));
  });

  test('bboxes getter', () => {
    const content = JSON.parse(JSON.stringify(defaultText.text.content));
    const state = {
      story: defaultText,
    };
    const bboxes = getters.bboxes(state, { content });
    expect(bboxes).toEqual([
      {
        id: 'bbox-0',
        bounds: [[1, 2], [3, 4]],
        highlighted: false,
      },
    ]);
  });

  test('features getter', () => {
    const content = JSON.parse(JSON.stringify(defaultText.text.content));
    const state = {
      story: defaultText,
    };

    const result = getters.features(state, { content });
    expect(result).toEqual([{ lat: 0, lng: 10, highlighted: false }]);
  });

  test('feature is marked as highlighted', () => {
    const content = JSON.parse(JSON.stringify(defaultText.text.content));
    const state = {
      highlightedLatLng: {
        lat: 0,
        lng: 10,
      },
      story: defaultText,
    };

    const result = getters.features(state, { content });
    expect(result).toEqual([{ lat: 0, lng: 10, highlighted: true }]);
  });
});
