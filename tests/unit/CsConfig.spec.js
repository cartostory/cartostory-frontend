import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import CsConfig from '@/components/CsConfig.vue';
import store from '@/store/store';
import { defaultStoryName, defaultStoryUrls } from '../helpers/data';

const defaultStore = store;

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('CsConfig.vue', () => {
  it('renders a form without story select when no stories are available', () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [],
      },
    });
    const wrapper = shallowMount(CsConfig, {
      store,
      localVue,
    });

    expect(wrapper.findAll('label').length).toEqual(4);
  });
  it('renders a form with story select where at least one story is available', () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [{...defaultStoryUrls, storyName: defaultStoryName}],
      },
    });

    const wrapper = shallowMount(CsConfig, {
      store,
      localVue,
    });

    expect(wrapper.findAll('label').length).toEqual(5);
  });
  it('sets input values when a story is selected', async () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [{...defaultStoryUrls, storyName: defaultStoryName}],
      },
    });

    const wrapper = shallowMount(CsConfig, {
      store,
      localVue,
    });
    wrapper.find('select').setValue(defaultStoryName);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('select').element.value).toEqual(defaultStoryName);
    expect(wrapper.vm.featuresUrl).toEqual(defaultStoryUrls.featuresUrl);
    expect(wrapper.vm.storyName).toEqual(defaultStoryName);
    expect(wrapper.vm.storyUrl).toEqual(defaultStoryUrls.storyUrl);
    expect(wrapper.vm.trackUrl).toEqual(defaultStoryUrls.trackUrl);
  });
  it('loads the story from the given urls', async () => {
    const store = new Vuex.Store(defaultStore);
    const wrapper = shallowMount(CsConfig, {
      router,
      store,
      localVue,
    });

    wrapper.findAll('input').at(0).setValue(defaultStoryName);
    wrapper.findAll('input').at(1).setValue(defaultStoryUrls.trackUrl);
    wrapper.findAll('input').at(2).setValue(defaultStoryUrls.storyUrl);
    wrapper.findAll('input').at(3).setValue(defaultStoryUrls.featuresUrl);
    wrapper.find('button').trigger('click');

    await store.dispatch('loadStory');

    expect(Array.isArray(store.state.features.data.features)).toBe(true);
    expect(store.state.features.data.features).toHaveLength(12);
    expect(typeof store.state.story.data.story).toBe('object');
    expect(store.state.story.data.story).toHaveProperty('header');
    expect(store.state.story.data.story).toHaveProperty('perex');
    expect(store.state.story.data.story).toHaveProperty('sections');
    expect(typeof store.state.track.data.track).toBe('object');
    expect(store.state.track.data.track).toHaveProperty('features');
  });
});
