import { createLocalVue, shallowMount } from '@vue/test-utils';

import { STORY_LINK_LAT_ATTR, STORY_LINK_LNG_ATTR } from '@/config/config';
import FeatureMark from '@/components/editor/FeatureMark';
import { UPDATE_HIGHLIGHTED_LAT_LNG } from '@/store/mutations';

const localVue = createLocalVue();
const options = {
  propsData: {
    node: {
      attrs: {
        [STORY_LINK_LAT_ATTR]: 0,
        [STORY_LINK_LNG_ATTR]: 10,
      },
    },
  },
  mocks: {
    $store: {
      commit: jest.fn(),
      state: {
        highlightedLatLng: {
          lat: 0,
          lng: 10,
        },
      },
    },
  },
  localVue,
};

describe('FeatureMark.js', () => {
  test('stores latlng object on click ', () => {
    const cmp = new FeatureMark().view;
    const wrapper = shallowMount(cmp, options);

    wrapper.find(`a[${STORY_LINK_LAT_ATTR}]`).trigger('click');
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.commit.mock.calls[0][0]).toEqual(UPDATE_HIGHLIGHTED_LAT_LNG);
  });

  test('is highlighted when its attributes match the stored value', () => {
    const cmp = new FeatureMark().view;
    const wrapper = shallowMount(cmp, options);

    expect(wrapper.vm.isHighlighted).toBe(true);
  });

  test('is not highlighted when attributes don\'t match the stored value', () => {
    const cmp = new FeatureMark().view;
    const localOptions = { ...options };
    localOptions.mocks.$store.state.highlightedLatLng.lng = 100;

    const wrapper = shallowMount(cmp, localOptions);
    expect(wrapper.vm.isHighlighted).toBe(false);
  });
});
