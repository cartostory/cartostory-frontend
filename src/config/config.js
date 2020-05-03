export const BASE_API_URL = 'https://lih247zg28.execute-api.eu-west-1.amazonaws.com/Test';

export const SCROLL_CONTAINER_ID = 'story-scrolling-container';
export const STORY_LINK_BBOX_ATTR = 'data-cs-bbox';
export const STORY_LINK_BBOX_ATTR_CAMEL = toCamelCase(STORY_LINK_BBOX_ATTR);
export const STORY_LINK_DATA_ID = 'data-cs-id';
export const STORY_LINK_LAT_ATTR = 'data-cs-lat';
export const STORY_LINK_LNG_ATTR = 'data-cs-lng';
export const STORY_LINK_LAT_ATTR_CAMEL = toCamelCase(STORY_LINK_LAT_ATTR);
export const STORY_LINK_LNG_ATTR_CAMEL = toCamelCase(STORY_LINK_LNG_ATTR);
export const STORY_LINK_CLICK_EVENT = 'mark-click';
export const ADD_BOUNDING_BOX_EVENT = 'add-bounding-box';
export const ADD_FEATURE_MARK_EVENT = 'add-feature-mark';
export const SAVE_EVENT = 'save';
export const TRACK_FILE_UPLOAD_EVENT = 'track-file-upload';

function toCamelCase(str) {
  return str
    .split('-')
    .map((item, idx) => idx > 0 ? item.slice(0,1).toUpperCase() + item.slice(1) : item)
    .join('');
}
