import ElementUI from 'element-ui';
import FileReader from 'vue-filereader';
import { createLocalVue, mount } from '@vue/test-utils';

import { UPDATE_ERRORS } from '@/store/mutations';
import { TRACK_FILE_UPLOAD_EVENT } from '@/config/config';
import CsTrackUploadButton from '@/components/CsTrackUploadButton.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('CsTrackUploadButton.vue', () => {
  test('emits upload event when json file parsed', async() => {
    const wrapper = mount(CsTrackUploadButton, {
      localVue,
    });

    wrapper.find(FileReader).vm.$emit('reader-load',{ data: '{"data": true}'});
    expect(wrapper.emitted()[TRACK_FILE_UPLOAD_EVENT]).toEqual([[{data: true}]]);
  });

  test('emits upload event when json file is invalid', async() => {
    const msg = {
      'message': 'Trasu se nepodařilo nahrát. Soubor pravděpodobně není validní.',
      'title': 'Selhalo nahrání trasy'
    };
    const wrapper = mount(CsTrackUploadButton, {
      mocks: {
        $store: {
          state: {},
          commit: jest.fn(),
        },
      },
      localVue,
    });

    wrapper.find(FileReader).vm.$emit('reader-load',{ data: "invalid json"});
    expect(wrapper.emitted()[TRACK_FILE_UPLOAD_EVENT]).toBeUndefined();
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(UPDATE_ERRORS, msg);

  });
});

