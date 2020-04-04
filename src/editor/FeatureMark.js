import { Mark } from 'tiptap';
import { toggleMark } from 'tiptap-commands';

import {
  STORY_LINK_CLICK_EVENT,
  STORY_LINK_LAT_ATTR,
  STORY_LINK_LAT_ATTR_CAMEL,
  STORY_LINK_LNG_ATTR,
  STORY_LINK_LNG_ATTR_CAMEL
} from '@/config/config.js';
const TAG = 'a';

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
        [STORY_LINK_LNG_ATTR]: {
          default: null,
        },
      },
      parseDOM: [{
        tag: TAG,
        getAttrs(dom) {
          return {
            [STORY_LINK_LAT_ATTR]: dom.dataset[STORY_LINK_LAT_ATTR],
            [STORY_LINK_LNG_ATTR]: dom.dataset[STORY_LINK_LNG_ATTR],
          };
        },
      }],
      toDOM: (node) =>{
        return [TAG, {
          [STORY_LINK_LAT_ATTR]: node.attrs[STORY_LINK_LAT_ATTR],
          [STORY_LINK_LNG_ATTR]: node.attrs[STORY_LINK_LNG_ATTR],
        }, 0];
      },
    }
  }

  commands({ type }) {
    return (attrs) => {
      return toggleMark(type, {
          [STORY_LINK_LAT_ATTR]: attrs && attrs[STORY_LINK_LAT_ATTR],
          [STORY_LINK_LNG_ATTR]: attrs && attrs[STORY_LINK_LNG_ATTR],
      });
    };
  }

  get view() {
    return {
      // there are some props available
      // `node` is a Prosemirror Node Object
      // `updateAttrs` is a function to update attributes defined in `schema`
      // `view` is the ProseMirror view instance
      // `options` is an array of your extension options
      // `selected` is a boolean which is true when selected
      // `editor` is a reference to the TipTap editor instance
      // `getPos` is a function to retrieve the start position of the node
      // `decorations` is an array of decorations around the node
      props: ['node', 'updateAttrs', 'view'],
      methods: {
        handleClick() {
          const payload = {
            lat: this[STORY_LINK_LAT_ATTR_CAMEL],
            lng: this[STORY_LINK_LNG_ATTR_CAMEL],
          }
          this.$parent.$emit(STORY_LINK_CLICK_EVENT, payload);
        }
      },
      computed: {
        [STORY_LINK_LAT_ATTR_CAMEL]: {
          get() {
            return this.node.attrs[STORY_LINK_LAT_ATTR]
          },
          set(lat) {
            this.updateAttrs({
              [STORY_LINK_LAT_ATTR]: lat,
            })
          },
        },
        [STORY_LINK_LNG_ATTR_CAMEL]: {
          get() {
            return this.node.attrs[STORY_LINK_LNG_ATTR]
          },
          set(lng) {
            this.updateAttrs({
              [STORY_LINK_LNG_ATTR]: lng,
            })
          },
        },
      },
      template: `
        <a
          :${STORY_LINK_LNG_ATTR}="${STORY_LINK_LNG_ATTR_CAMEL}"
          :${STORY_LINK_LAT_ATTR}="${STORY_LINK_LAT_ATTR_CAMEL}"
          @click="handleClick()"
        >
        </a>
      `,
    }
  }
}

