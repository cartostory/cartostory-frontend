import { Mark } from 'tiptap';
import { updateMark } from 'tiptap-commands';

import { STORY_LINK_DATA_ID } from '@/config.js';

export default class FeatureMark extends Mark {
  get name() {
    return 'featureMark';
  }

  get schema() {
    return {
      attrs: {
        [STORY_LINK_DATA_ID]: {
          default: null,
        },
      },
      parseDOM: [{
        tag: 'a',
        getAttrs(dom) {
          return { dataCsId: dom.dataset[STORY_LINK_DATA_ID] };
        },
      }],
      toDOM: (node) =>{
        return ['a', { [STORY_LINK_DATA_ID]: node.attrs[STORY_LINK_DATA_ID] }, 0];
      },
    }
  }

  commands({ type }) {
    return (attrs) => {
      return updateMark(type, {
        [STORY_LINK_DATA_ID]: attrs[STORY_LINK_DATA_ID],
      });
    };
  }
}

