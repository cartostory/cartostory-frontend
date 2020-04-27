import Buefy from 'buefy'
import { mount, createLocalVue } from '@vue/test-utils';

import CsNotification from '@/components/CsNotification.vue';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('CsNotification.vue', () => {
  test('renders errors', () => {
    localVue.prototype.$buefy = {
      snackbar: {
        open: jest.fn(),
      },
    };
    const $store = {
      commit: jest.fn(),
      state: {
        errors: [
          {
            title: 'Title',
            message: 'Message',
          },
          {
            title: 'Title 2',
            message: 'Message 2',
          },
        ],
      },
    };
    const wrapper = mount(CsNotification, {
      localVue,
      mocks: {
        $store,
      },
    });

    expect(wrapper.vm.$buefy.snackbar.open).toBeCalledTimes(2);
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(2);
    const args = wrapper.vm.$buefy.snackbar.open.mock.calls[1][0];
    expect(args).toHaveProperty('message');
    expect(args.message).toContain('Message 2');
  });
});
