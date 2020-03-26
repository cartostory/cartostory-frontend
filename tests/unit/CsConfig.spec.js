import { expect } from 'chai';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import CsConfig from '@/components/CsConfig.vue';
import store from '@/store/store';
import { defaultStoryUrls } from '../helpers/data';

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

    expect(wrapper.findAll('label').length).equal(4);
  });
  it('renders a form with story select where at least one story is available', () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [{
          storyUrl: 'test',
          featuresUrl: 'test',
          trackUrl: 'test',
          storyName: 'test',
        }],
      },
    });

    const wrapper = shallowMount(CsConfig, {
      store,
      localVue,
    });

    expect(wrapper.findAll('label').length).equal(5);
  });
  it('sets input values when a story is selected', async () => {
    const store = new Vuex.Store({
      state: {
        availableStories: [{
          storyUrl: 'storyUrl',
          featuresUrl: 'featuresUrl',
          trackUrl: 'trackUrl',
          storyName: 'storyName',
        }],
      },
    });

    const wrapper = shallowMount(CsConfig, {
      store,
      localVue,
    });
    wrapper.find('select').setValue('storyName');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('select').element.value).equal('storyName');
    expect(wrapper.vm.featuresUrl).equal('featuresUrl');
    expect(wrapper.vm.storyName).equal('storyName');
    expect(wrapper.vm.storyUrl).equal('storyUrl');
    expect(wrapper.vm.trackUrl).equal('trackUrl');
  });
  it('loads the story from the given urls', async () => {
    const store = new Vuex.Store(defaultStore);
    const wrapper = shallowMount(CsConfig, {
      router,
      store,
      localVue,
    });

    wrapper.findAll('input').at(0).setValue('Hochschwab');
    wrapper.findAll('input').at(1).setValue(defaultStoryUrls.trackUrl);
    wrapper.findAll('input').at(2).setValue(defaultStoryUrls.storyUrl);
    wrapper.findAll('input').at(3).setValue(defaultStoryUrls.featuresUrl);
    wrapper.find('button').trigger('click');

    await store.dispatch('loadStory');

    expect(store.state.features.data.features).to.be.an('array').that.has.lengthOf(12);
    expect(store.state.story.data.story).to.be.an('object').that.has.all.keys('header', 'perex', 'sections');
    expect(store.state.track.data.track).to.be.an('object').that.has.any.keys('features');
  });
});
