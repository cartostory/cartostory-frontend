import { mount, createLocalVue } from '@vue/test-utils';

import CsNotification from '@/components/CsNotification.vue';

const localVue = createLocalVue();

describe('CsNotification.vue', () => {
  test('renders errors', () => {
    localVue.prototype.$notify = jest.fn();
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

    expect(wrapper.vm.$notify).toBeCalledTimes(2);
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(2);
    const args = wrapper.vm.$notify.mock.calls[1][0];
    expect(args).toHaveProperty('title');
    expect(args.title).toEqual('Title 2');
    expect(args).toHaveProperty('message');
    expect(args.message).toEqual('Message 2');
  });
});
