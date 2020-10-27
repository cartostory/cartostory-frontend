import { createLocalVue, shallowMount } from '@vue/test-utils';

import CsMap from '@/components/CsMap.vue';
import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import { UPDATE_FEATURE_BEING_ADDED, UPDATE_TRACK } from '@/store/mutations';

const localVue = createLocalVue();

describe('CsMap', () => {
  test('sets track to store', () => {
    const wrapper = shallowMount(CsMap, {
      mocks: {
        $store: {
          getters: {
            bboxes: [],
            features: [],
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

    wrapper.vm.handleFileUpload({ file: 'data' });
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(UPDATE_TRACK, { file: 'data' });
  });

  test('adds feature on map click', () => {
    const wrapper = shallowMount(CsMap, {
      mocks: {
        $store: {
          getters: {
            bboxes: [],
            features: [],
          },
          state: {
            featureBeingAdded: {
              active: true,
              position: undefined,
            },
            map: {},
            story: {},
          },
          commit: jest.fn(),
        },
      },
      localVue,
    });

    const result = {
      active: true,
      position: {
        [STORY_LINK_LAT_ATTR]: 0,
        [STORY_LINK_LNG_ATTR]: 10,
      },
    };

    wrapper.vm.handleMapClick({ lat: 0, lng: 10 });
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(UPDATE_FEATURE_BEING_ADDED, result);
  });

  test('renders map center', () => {
    const bounds = [
      { lat: 10, lng: 10 },
      { lat: 0, lng: 0 },
    ];
    const highlightedBbox = {
      $refs: {},
      $store: {
        state: {},
      },
      recenterMap: true,
      mapBounds: window.L.latLngBounds(bounds),
      highlightedBbox: bounds,
    };

    const highlightedFeature = {
      $refs: {},
      $store: {
        state: {},
      },
      highlightedLatLng: { lat: 50, lng: 50 },
      recenterMap: true,
    };

    const nothingHighlighted = {
      $refs: {
        csmap: {
          mapObject: {
            getCenter: jest.fn().mockReturnValue({ lat: 10, lng: 10 }),
          },
        },
      },
      $store: {
        state: {},
      },
      recenterMap: true,
    };

    expect(CsMap.computed.mapCenter.call(highlightedBbox)).toEqual({ lat: 5, lng: 5 });
    expect(CsMap.computed.mapCenter.call(highlightedFeature)).toEqual({ lat: 50, lng: 50 });
    expect(CsMap.computed.mapCenter.call(nothingHighlighted)).toEqual({ lat: 10, lng: 10 });
  });
});
