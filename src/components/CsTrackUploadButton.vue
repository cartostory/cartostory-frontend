<script>
import FileReader from 'vue-filereader';

import { TRACK_FILE_UPLOAD_EVENT } from '../config/config.js';
import { UPDATE_ERRORS } from '../store/mutations.js';

export default {
  name: 'CsTrackUploadButton',
  components: {
    FileReader,
  },
  methods: {
    handleFileUpload(fileObj) {
      try {
        this.$emit(TRACK_FILE_UPLOAD_EVENT, fileObj && JSON.parse(fileObj.data));
      } catch(e) {
        this.$store.commit(UPDATE_ERRORS, {
          title: 'Selhalo nahrání trasy',
          message: 'Trasu se nepodařilo nahrát. Soubor pravděpodobně není validní.',
        });
      }
    },
  },
}
</script>

<template>
  <file-reader style="height: 30px; width: 30px; line-height: 30px;"
    accept=".json"
    output="text"
    @reader-load="handleFileUpload"
    >
    <template #reader="props">

    <b-button
      class="file-upload-button"
      @click="$refs.fileReader.click()"
      title="Nahrát soubor trasy"
      size="is-small"
      icon-left="cloud-upload"
      ></b-button>

      <input
        style="visibility: hidden"
        ref="fileReader"
        type="file"
        :accept="props.accept"
        @change="props.onchange"
        />
    </template>
  </file-reader>
</template>

<style lang="scss" scoped>
.file-upload-button {
  border-radius: 0;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 5px;
  text-align: center;
  width: 30px;
}

</style>
