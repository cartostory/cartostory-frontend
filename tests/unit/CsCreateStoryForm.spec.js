import ElementUI, { Form } from 'element-ui';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';

import CsCreateStoryForm from '@/components/CsCreateStoryForm.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('CsCreateStoryForm.vue', () => {
  test('renders a story name input', () => {
    const wrapper = mount(CsCreateStoryForm, {
      localVue,
      mocks: {
        $store: {
          getters: {},
          state: {
            story: {},
            map: {},
          },
        },
      },
    });

    expect(wrapper.findAll(Form).length).toEqual(1);
  });
});
