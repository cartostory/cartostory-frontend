import { EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import CsEditor from '@/components/CsEditor.vue';

const localVue = createLocalVue();

describe('CsEditor.vue', () => {
  test('should have editor, menu bar and bubble menu when editable', () => {
    const wrapper = shallowMount(CsEditor, {
      stubs: ['b-input', 'b-field'],
      mocks: {
        $store: {
          state: {
            editable: true,
            story: {
            },
          },
        },
      },
      localVue,
    });

    const editorMenuBar = wrapper.find(EditorMenuBar);
    const editorMenuBubble = wrapper.find(EditorMenuBubble);
    const editorContent = wrapper.find(EditorContent);

    expect(editorMenuBar.is(EditorMenuBar)).toBe(true);
    expect(editorContent.is(EditorContent)).toBe(true);
    expect(editorMenuBubble.is(EditorMenuBubble)).toBe(true);
  });

  test('should have only editor', () => {
    const wrapper = shallowMount(CsEditor, {
      stubs: ['b-input', 'b-field'],
      mocks: {
        $store: {
          state: {
            editable: false,
            story: {
            },
          },
        },
      },
      localVue,
    });

    const editorMenuBar = wrapper.find(EditorMenuBar);
    const editorMenuBubble = wrapper.find(EditorMenuBubble);
    const editorContent = wrapper.find(EditorContent);

    expect(editorMenuBar.exists()).toBe(false);
    expect(editorMenuBubble.exists()).toBe(false);
    expect(editorContent.exists()).toBe(true);
  });
});
