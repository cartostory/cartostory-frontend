import ElementUI, { Button, FormItem } from 'element-ui';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';

import CsLoadStoryForm from '@/components/CsLoadStoryForm.vue';
import { defaultStoryName, defaultStoryUrls } from '../helpers/data';
import { routes } from '@/router';

const localVue = createLocalVue();
const router = new VueRouter(routes);
localVue.use(ElementUI);
localVue.use(Vuex);
localVue.use(VueRouter);

describe('CsLoadStoryForm.vue', () => {
  test('renders a form without story select when no stories are available', () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [],
      },
    });
    const wrapper = mount(CsLoadStoryForm, {
      store,
      localVue,
    });

    expect(wrapper.findAll(FormItem).length).toEqual(5);
  });
  test('renders a form with story select where at least one story is available', () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [{...defaultStoryUrls, storyName: defaultStoryName}],
      },
    });

    const wrapper = mount(CsLoadStoryForm, {
      store,
      localVue,
    });

    expect(wrapper.findAll('.el-form-item').length).toEqual(6); // wrapper.findAll(FormItem) returns _FormItem is not defined
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
    expect(wrapper.vm.featuresUrl).toEqual(defaultStoryUrls.featuresUrl);
    expect(wrapper.vm.storyName).toEqual(defaultStoryName);
    expect(wrapper.vm.storyUrl).toEqual(defaultStoryUrls.storyUrl);
    expect(wrapper.vm.trackUrl).toEqual(defaultStoryUrls.trackUrl);
  });

  test('loads the story from the given urls', async () => {
    const mockStore = {
      state: {
        availableStories: [],
      },
      dispatch: jest.fn() };

    const wrapper = mount(CsLoadStoryForm, {
      router,
      mocks: {
        $store: mockStore,
      },
      localVue,
    });

    wrapper.vm.$router.push('load');
    wrapper.findAll('input').at(0).setValue(defaultStoryName);
    wrapper.findAll('input').at(1).setValue(defaultStoryUrls.trackUrl);
    wrapper.findAll('input').at(2).setValue(defaultStoryUrls.storyUrl);
    wrapper.findAll('input').at(3).setValue(defaultStoryUrls.featuresUrl);

    await wrapper.vm.$nextTick();
    wrapper.get(Button).vm.$el.click();

    expect(wrapper.vm.$route.path).toBe('/');
    expect(mockStore.dispatch).toHaveBeenCalledWith('setStoryName', defaultStoryName);
    expect(mockStore.dispatch).toHaveBeenCalledWith('setUrls', defaultStoryUrls);
    expect(mockStore.dispatch).toHaveBeenCalledWith('loadStory');
  });
});
