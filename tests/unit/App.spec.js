import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import CsConfig from '@/App.vue';
import store from '@/store/store';

const defaultStore = store;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {
  it('redirects when no story is loaded', () => {
    const push = jest.fn();
    const store = new Vuex.Store(defaultStore);
    const $router = {
      push,
    };
    const options = {
      localVue,
      store,
      mocks: {
        $router,
      },
    };
    const wrapper = shallowMount(CsConfig, options);
    expect(push).toHaveBeenCalledWith('/config');
  });
});
