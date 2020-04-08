import ElementUI from 'element-ui';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import CsScreen from '@/components/CsScreen.vue';
import CsMap from '@/components/CsMap.vue';
import CsStory from '@/components/CsStory.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex);

const mountOptions = {
  computed: {
    ready: () => true,
  },
  mocks: {
    $router: {
      push: jest.fn().mockImplementation(() => Promise.resolve()),
    },
    $store: {
      getters: {
        'track/trackBboxRelation': jest.fn(),
      },
      state: {
        features: {
          data: {},
        },
        story: {
          data: {},
        },
        track: {
          data: {},
        },
      },
    },
  },
  localVue,
};

describe('CsScreen.vue', () => {
  test('renders children when story is loaded', () => {
    const wrapper = shallowMount(CsScreen, mountOptions);

    expect(wrapper.get(CsMap));
    expect(wrapper.get(CsStory));
  });
  test('renders loader when story is not loaded', () => {
    mountOptions.computed.ready = () => false;
    const wrapper = shallowMount(CsScreen, mountOptions);

    expect(wrapper.get(PulseLoader));
  });
});

