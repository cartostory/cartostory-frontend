import ElementUI, { Button, FormItem } from 'element-ui';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';

import { UPDATE_STORY_URL } from '@/store/mutations';
import CsLoadStoryForm from '@/components/CsLoadStoryForm.vue';
import { defaultUrl, defaultStoryName, defaultStoryUrls } from '../helpers/data';
import { routes } from '@/router';

const localVue = createLocalVue();
const router = new VueRouter(routes);
localVue.use(ElementUI);
localVue.use(Vuex);
localVue.use(VueRouter);

describe('CsLoadStoryForm.vue', () => {
  test.only('renders a form without story select when no stories are available', () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [],
      },
    });
    const wrapper = mount(CsLoadStoryForm, {
      store,
      localVue,
    });

    expect(wrapper.findAll(FormItem).length).toEqual(2);
  });
  test.only('renders a form with story select where at least one story is available', () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [{...defaultStoryUrls, storyName: defaultStoryName}],
      },
    });

    const wrapper = mount(CsLoadStoryForm, {
      store,
      localVue,
    });

    expect(wrapper.findAll('.el-form-item').length).toEqual(3); // wrapper.findAll(FormItem) returns _FormItem is not defined
  });
  test('sets input values when a story is selected', async () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [{...defaultStoryUrls, storyName: defaultStoryName}],
      },
    });

    const wrapper = mount(CsLoadStoryForm, {
      store,
      localVue,
    });

    const option = wrapper.get('.el-select-dropdown__item');
    option.vm.$el.dispatchEvent(new Event('click'));
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.storyUrl).toEqual(defaultStoryUrls.storyUrl);
  });

  test.only('loads the story from the given url', async () => {
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
      computed: {
        storyUrl: {
          get() {
            return 'storyUrl';
          },
          set(value) {
            this.$store.commit(UPDATE_STORY_URL, value);
          },
        },
      },
      localVue,
    });

    wrapper.vm.$router.push('story/load');
    wrapper.findAll('input').at(0).setValue(defaultUrl);
    expect(mockStore.commit).toHaveBeenCalledWith(UPDATE_STORY_URL, defaultUrl);

    await wrapper.vm.$nextTick();
    wrapper.get(Button).vm.$el.click();

    expect(wrapper.vm.$route.path).toBe('/');
    expect(mockStore.dispatch).toHaveBeenCalledWith('loadStory');
  });
});
