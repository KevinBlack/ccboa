<template>
  <div class="loadAccessory">
      <uploader :options="options" class="uploader-example" @file-success="onFileSuccess">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <uploader-btn>浏览</uploader-btn><span class="load_accessory">引入附件文件名（包括压缩包中的文件名）不能包括以下半角符号：空格/ \ , " : ; * ? &lt; &gt;| . %，附件大小不超过20M</span>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
  </div>
</template>

<script>
export default {
  name: "loadAccessory",
  props: {
    msg: String
  },
  data() {
    return {
      // imageUrl: "",
      options: {
        target: "//localhost:3000/upload", //后台接受文件夹数据的接口
        testChunks: false
      },
      attrs: {
        accept: ['doc', 'docx']
      }
    };
  },
  methods: {
    onFileSuccess () {
      console.log('cg')
    }
  }
};
</script>

<style lang="less" scoped>

.uploader-example {
  width: 96%;
  padding: 20px 0 ;
  margin: 40px auto 0 4%;
  font-size: 12px;
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
