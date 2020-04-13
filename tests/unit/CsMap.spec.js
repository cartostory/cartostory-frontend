import ElementUI from 'element-ui';
import { createLocalVue, mount } from '@vue/test-utils';

import CsMap from '@/components/CsMap.vue';
import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import { UPDATE_FEATURE_MARK_CALLBACK, UPDATE_TRACK } from '@/store/mutations';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('CsMap', () => {
  test('sets track to store', () => {
    const wrapper = mount(CsMap, {
      mocks: {
        $store: {
          getters: {
            featuresWithoutHighlighted: [],
          },
          state: {
            map: {},
            story: {},
          },
          commit: jest.fn(),
        },
      },
      localVue,
    });

    wrapper.vm.handleFileUpload({file: 'data'});
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(UPDATE_TRACK, {file: 'data'});
  });

  test('adds feature on map click', () => {
    const wrapper = mount(CsMap, {
      mocks: {
        $store: {
          getters: {
            featuresWithoutHighlighted: [],
          },
          state: {
            addFeatureMarkCallback: jest.fn(),
            map: {},
            story: {},
          },
          commit: jest.fn(),
        },
      },
      localVue,
    });
    wrapper.vm.handleMapClick({lat: 0, lng: 10});
    expect(wrapper.vm.$store.state.addFeatureMarkCallback).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.state.addFeatureMarkCallback).toHaveBeenCalledWith({[STORY_LINK_LAT_ATTR]: 0, [STORY_LINK_LNG_ATTR]: 10});
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(UPDATE_FEATURE_MARK_CALLBACK, undefined);
  });
});
