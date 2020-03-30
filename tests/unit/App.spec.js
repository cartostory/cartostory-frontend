import ElementUI from 'element-ui';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';

import App from '@/App.vue';
import store from '@/store/store';

const defaultStore = store;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

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

    const wrapper = mount(App, options);
    expect(push).toHaveBeenCalledWith('/load');
  });
});
