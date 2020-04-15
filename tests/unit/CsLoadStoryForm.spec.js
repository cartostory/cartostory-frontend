import Buefy from 'buefy'
import flushPromises from 'flush-promises';
import Vuex from 'vuex';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';

import CsLoadStoryForm from '@/components/CsLoadStoryForm.vue';
import { UPDATE_STORY_URL } from '@/store/mutations';
import { defaultUrl } from '../helpers/data';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('CsLoadStoryForm.vue', () => {
  test('renders a form without story select when no stories are available', () => {
    const wrapper = shallowMount(CsLoadStoryForm, {
      computed: {
        availableStories: () => [],
        storyUrl: () => defaultUrl,
      },
      localVue,
    });

    expect(wrapper.findAll('b-input-stub').length).toEqual(1);
  });

  test('renders a form with story select where at least one story is available', () => {
    const wrapper = shallowMount(CsLoadStoryForm, {
      computed: {
        availableStories: () => [defaultUrl],
        storyUrl: () => defaultUrl,
      },
      localVue,
    });

    expect(wrapper.findAll('b-select-stub').length).toEqual(1);
  });

  test('sets dropdown value when a story is selected', () => {
    const methods = {
      handleStorySelect: jest.fn(),
    };
    const wrapper = mount(CsLoadStoryForm, {
      methods,
      mocks: {
        $store: {
          commit: jest.fn(),
          state: {
          },
        },
      },
      computed: {
        availableStories: () => [{ name: 'test2', url: defaultUrl}],
      },
      localVue,
    });

    const options = wrapper.find('select').findAll('option');
    options.at(1).setSelected();
    expect(methods.handleStorySelect).toHaveBeenCalledTimes(1);
    expect(methods.handleStorySelect).toHaveBeenCalledWith('test2');
  });

  test('sets story url to store', async () => {
    const mockStore = {
      state: {
        availableStories: [],
        storyUrl: undefined,
      },
      commit: jest.fn(),
      dispatch: jest.fn(),
    };

    const wrapper = mount(CsLoadStoryForm, {
      mocks: {
        $store: mockStore,
      },
      localVue,
    });

    const input = wrapper.get('input');
    input.setValue(defaultUrl);
    await flushPromises();
    expect(mockStore.commit).toHaveBeenCalledTimes(1);
    expect(mockStore.commit).toHaveBeenCalledWith(UPDATE_STORY_URL, defaultUrl);
  });

  test('sets submit button enabled when story url is filled', () => {
    const wrapper = shallowMount(CsLoadStoryForm, {
      computed: {
        availableStories: () => [],
        storyUrl: () => defaultUrl,
      },
      stubs: [
        'b-button',
        'b-field',
        'b-input',
      ],
    });

    expect(wrapper.vm.disabledSubmit).toBe(false);
  });

  test('loads story on submit', async() => {
    const wrapper = mount(CsLoadStoryForm, {
      computed: {
        storyUrl: () => defaultUrl,
        storyName: () => 'test',
      },
      mocks: {
        $store: {
          state: {
            storyUrl: defaultUrl,
            availableStories: [],
          },
          commit: jest.fn(),
          dispatch: jest.fn(),
        },
        $router: {
          push: jest.fn(),
        },
      },
      localVue,
    });

    await wrapper.vm.$nextTick();
    wrapper.get('button').vm.$el.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('loadStory');
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/story/read/test');
  });
});
