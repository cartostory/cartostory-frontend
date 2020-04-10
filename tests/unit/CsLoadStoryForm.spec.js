import ElementUI, { Button, FormItem } from 'element-ui';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';

import { UPDATE_STORY_URL } from '@/store/mutations';
import CsLoadStoryForm from '@/components/CsLoadStoryForm.vue';
import { defaultUrl } from '../helpers/data';
import { routes } from '@/router';

const localVue = createLocalVue();
const router = new VueRouter(routes);
localVue.use(ElementUI);
localVue.use(Vuex);
localVue.use(VueRouter);

describe('CsLoadStoryForm.vue', () => {
  test('renders a form without story select when no stories are available', () => {
    const wrapper = mount(CsLoadStoryForm, {
      computed: {
        availableStories: () => [],
        storyUrl: () => defaultUrl,
      },
      localVue,
    });

    expect(wrapper.findAll(FormItem).length).toEqual(2);
  });

  test('renders a form with story select where at least one story is available', () => {
    const wrapper = mount(CsLoadStoryForm, {
      computed: {
        availableStories: () => [defaultUrl],
        storyUrl: () => defaultUrl,
      },
      localVue,
    });

    expect(wrapper.findAll('.el-form-item').length).toEqual(3); // wrapper.findAll(FormItem) returns _FormItem is not defined
  });

  test('sets dropdown value when a story is selected', async () => {
    const wrapper = mount(CsLoadStoryForm, {
      computed: {
        availableStories: () => [defaultUrl],
        storyUrl: () => defaultUrl,
      },
      localVue,
    });

    const option = wrapper.get('.el-select-dropdown__item');
    option.vm.$el.dispatchEvent(new Event('click'));
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.storyUrl).toEqual(defaultUrl);
  });

  test('sets story url to store', () => {
    const mockStore = {
      state: {
        availableStories: [],
        story: {
          url: undefined,
        },
      },
      commit: jest.fn(),
      dispatch: jest.fn(),
    };

    const wrapper = mount(CsLoadStoryForm, {
      router,
      mocks: {
        $store: mockStore,
      },
      localVue,
    });

    wrapper.vm.$router.push('story/load');
    wrapper.findAll('input').at(0).setValue(defaultUrl);
    expect(mockStore.commit).toHaveBeenCalledWith(UPDATE_STORY_URL, defaultUrl);
  });

  test('sets submit button enabled when story url is filled', () => {
    const wrapper = shallowMount(CsLoadStoryForm, {
      router,
      computed: {
        availableStories: () => [],
        storyUrl: () => defaultUrl,
      },
      stubs: [
        'el-button',
        'el-col',
        'el-form',
        'el-form-item',
        'el-input',
        'el-main',
        'el-row',
      ],
    });

    expect(wrapper.vm.disabledSubmit).toBe(false);
  });
});
