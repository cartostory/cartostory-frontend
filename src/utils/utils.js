/* eslint-disable import/prefer-default-export */
import { STORY_LINK_BBOX_ATTR, STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';

export function getBboxString(bbox) {
  let result;

  if ('lat' in bbox[0]) {
    result = `[[${bbox[0].lat},${bbox[0].lng}],[${bbox[1].lat},${bbox[1].lng}]]`;
  } else {
    result = `[[${bbox[0][0]},${bbox[0][1]}],[${bbox[1][0]},${bbox[1][1]}]]`;
  }

  return result;
}

/*
 * @param {Object} bbox
 */
export function getBboxSelector(bbox) {
  return `[${STORY_LINK_BBOX_ATTR}='${getBboxString(bbox)}']`;
}

/*
 * @param {Object} latLng
 */
export function getLatLngSelector(latLng) {
  let querySelector;

  if ('lat' in latLng) {
    querySelector = `[${STORY_LINK_LAT_ATTR}='${latLng.lat}'], [${STORY_LINK_LNG_ATTR}='${latLng.lng}']`;
  } else {
    querySelector = `[${STORY_LINK_LAT_ATTR}='${latLng[0]}'], [${STORY_LINK_LNG_ATTR}='${latLng[1]}']`;
  }

  return querySelector;
}
