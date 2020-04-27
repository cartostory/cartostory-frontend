import { STORY_LINK_BBOX_ATTR, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import { getBboxSelector, getLatLngSelector } from '@/utils/utils';

describe('getLatLngSelector', () => {
  test('returns formatted string', () => {
    const arraySource = [10, 20];
    const objectSource = { lat: 10, lng: 20 };

    const arrayResult = getLatLngSelector(arraySource);
    const objectResult = getLatLngSelector(objectSource);

    expect(arrayResult).toBe(`[${STORY_LINK_LAT_ATTR}='10'], [${STORY_LINK_LNG_ATTR}='20']`);
    expect(objectResult).toBe(`[${STORY_LINK_LAT_ATTR}='10'], [${STORY_LINK_LNG_ATTR}='20']`);
  });
});

describe('getBboxSelector', () => {
  test('returns formatted string', () => {
    const arraySource = [[10, 20], [30, 40]];
    const objectSource = [{ lat: 10, lng: 20 }, { lat: 30, lng: 40 }];

    const arrayResult = getBboxSelector(arraySource);
    const objectResult = getBboxSelector(objectSource);

    expect(arrayResult).toBe(`[${STORY_LINK_BBOX_ATTR}='[[10,20],[30,40]]']`);
    expect(objectResult).toBe(`[${STORY_LINK_BBOX_ATTR}='[[10,20],[30,40]]']`);
  });
});
