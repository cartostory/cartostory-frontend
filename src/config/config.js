export const SCROLL_CONTAINER_ID = 'story-scrolling-container';
export const STORY_LINK_DATA_ID = 'data-cs-id';
export const STORY_LINK_LAT_ATTR = 'data-cs-lat';
export const STORY_LINK_LNG_ATTR = 'data-cs-lng';
export const STORY_LINK_LAT_ATTR_CAMEL = toCamelCase(STORY_LINK_LAT_ATTR);
export const STORY_LINK_LNG_ATTR_CAMEL = toCamelCase(STORY_LINK_LNG_ATTR);
export const STORY_LINK_CLICK_EVENT = 'mark-click';

function toCamelCase(str) {
  return str
    .split('-')
    .map((item, idx) => idx > 0 ? item.slice(0,1).toUpperCase() + item.slice(1) : item)
    .join('');
}
