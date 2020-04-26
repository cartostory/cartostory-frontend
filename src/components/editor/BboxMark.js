/* eslint class-methods-use-this: 0 */
import { Mark } from 'tiptap';
import { toggleMark } from 'tiptap-commands';

import { STORY_LINK_BBOX_ATTR, STORY_LINK_BBOX_ATTR_CAMEL } from '../../config/config.js';
import { UPDATE_HIGHLIGHTED_BBOX } from '../../store/mutations.js';

const TAG = 'a';

export default class BboxMark extends Mark {
  get name() {
    return 'bboxMark';
  }

  get schema() {
    return {
      attrs: {
        [STORY_LINK_BBOX_ATTR]: {
          default: null,
        },
      },
      parseDOM: [{
        tag: TAG,
        getAttrs(dom) {
          return {
            [STORY_LINK_BBOX_ATTR]: dom.dataset[STORY_LINK_BBOX_ATTR],
          };
        },
      }],
      toDOM: node => [TAG, {
        [STORY_LINK_BBOX_ATTR]: node.attrs[STORY_LINK_BBOX_ATTR],
      }, 0],
    };
  }

  commands({ type }) {
    return (attrs) => {
      const bounds = attrs && [[attrs[0][0], attrs[0][1]], [attrs[1][0], attrs[1][1]]];
      return toggleMark(type, {
        [STORY_LINK_BBOX_ATTR]: JSON.stringify(bounds),
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
          const payload = JSON.parse(this[STORY_LINK_BBOX_ATTR_CAMEL]);
          this.$store.commit(UPDATE_HIGHLIGHTED_BBOX, payload);
        },
      },
      computed: {
        isHighlighted() {
          if (!this.$store.state.highlightedBbox) {
            return false;
          }
          const { lat, lng } = this.$store.state.highlightedBbox;
          return true;
        },
        [STORY_LINK_BBOX_ATTR_CAMEL]: {
          get() {
            return this.node.attrs[STORY_LINK_BBOX_ATTR];
          },
          set(bbox) {
            this.updateAttrs({
              [STORY_LINK_BBOX_ATTR]: bbox,
            });
          },
        },
      },
      template: `
        <a
          :class="{'is-highlighted': isHighlighted}"
          :${STORY_LINK_BBOX_ATTR}="${STORY_LINK_BBOX_ATTR_CAMEL}"
          @click="handleClick()"
        >
        </a>
      `,
    };
  }
}
