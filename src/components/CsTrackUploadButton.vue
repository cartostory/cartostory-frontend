<script>
import FileReader from 'vue-filereader';

export default {
  name: 'CsTrackUploadButton',
  components: {
    FileReader,
  },
  methods: {
    handleFileUpload(fileObj) {
      console.log(fileObj.data);
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

    <el-button
      class="file-upload-button"
      @click="$refs.fileReader.click()"
      title="Nahrát soubor trasy"
      size="mini"
      type="plain"
      icon="el-icon-upload"
      ></el-button>

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

<style lang="scss">
.file-upload-button {
  border-radius: 0;
  height: 30px;
  line-height: 30px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  text-align: center;
  width: 30px;
}

</style>
