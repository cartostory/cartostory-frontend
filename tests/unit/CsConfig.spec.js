import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CsConfig from '@/components/CsConfig.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

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
});
