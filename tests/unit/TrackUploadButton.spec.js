import ElementUI from 'element-ui';
import FileReader from 'vue-filereader';
import { createLocalVue, mount } from '@vue/test-utils';

import { TRACK_FILE_UPLOAD_EVENT } from '@/config/config';
import TrackUploadButton from '@/components/TrackUploadButton.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('TrackUploadButton.vue', () => {
  test('emits upload event when json file parsed', async() => {
    const wrapper = mount(TrackUploadButton, {
      localVue,
    });

    wrapper.find(FileReader).vm.$emit('reader-load',{ data: '{"data": true}'});
    expect(wrapper.emitted()[TRACK_FILE_UPLOAD_EVENT]).toEqual([[{data: true}]]);
  });

  test('emits upload event when json file is invalid', async() => {
    const wrapper = mount(TrackUploadButton, {
      localVue,
    });

    wrapper.find(FileReader).vm.$emit('reader-load',{ data: "invalid json"});
    expect(wrapper.emitted()[TRACK_FILE_UPLOAD_EVENT]).toBeUndefined();
  });
});

