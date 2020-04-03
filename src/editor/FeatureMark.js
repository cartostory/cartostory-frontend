import { Mark } from 'tiptap';
import { toggleMark } from 'tiptap-commands';

import { STORY_LINK_LAT_ATTR, STORY_LINK_LON_ATTR } from '@/config/config.js';

export default class FeatureMark extends Mark {
  get name() {
    return 'featureMark';
  }

  get schema() {
    return {
      attrs: {
        [STORY_LINK_LAT_ATTR]: {
          default: null,
        },
        [STORY_LINK_LON_ATTR]: {
          default: null,
        },
      },
      parseDOM: [{
        tag: 'a',
        getAttrs(dom) {
          return {
            [STORY_LINK_LAT_ATTR]: dom.dataset[STORY_LINK_LAT_ATTR],
            [STORY_LINK_LON_ATTR]: dom.dataset[STORY_LINK_LON_ATTR],
          };
        },
      }],
      toDOM: (node) =>{
        return ['a', {
          [STORY_LINK_LAT_ATTR]: node.attrs[STORY_LINK_LAT_ATTR],
          [STORY_LINK_LON_ATTR]: node.attrs[STORY_LINK_LON_ATTR],
        }, 0];
      },
    }
  }

  commands({ type }) {
    return (attrs) => {
      return toggleMark(type, {
          [STORY_LINK_LAT_ATTR]: attrs && attrs[STORY_LINK_LAT_ATTR],
          [STORY_LINK_LON_ATTR]: attrs && attrs[STORY_LINK_LON_ATTR],
      });
    };
  }
}

