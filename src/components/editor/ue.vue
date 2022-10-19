<template>
  <div style="width: 100%;" class="editorbox">
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      editor: null
    };
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    id: {
      type: String
    }
  },
  mounted() {
    const _this = this;
    // require(['ZeroClipboard '],function(ZeroClipboard){
    //   window['ZeroClipboard'] = ZeroClipboard;
    // })
    this.$nextTick(() => {
      let a = "";
      this.editor = a = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.ready(function() {
         // a.commands.pasteplain.execCommand('FontSize','21px')
        //设置默认行间距
        // a.commands.lineheight.execCommand('lineheight', 2); //行间距
      });
    });

    console.log("上传这堆错误不用理会，上传接口需自行开发配置");
  },
  methods: {
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    },
    /**
     * 更改字体大小方法
     * @param size[string] 字体大小
     */
    changeFontSize(size){
      this.editor.execCommand('selectall')
      this.editor.selection.clearRange();
      //let length=this.editor.selection.getRange().document.all.length;
     // this.editor.selection.getRange().removeInlineStyle('span')
     // this.editor.selection.getRange().endOffset=length;
      this.editor.execCommand('FontSize', size);
    },
    getUEContentTxt() {
      // 获取纯文本内容方法
      return this.editor.getContentTxt();
    },
    setUEContent(html) {
      if (html) {
        let self = this;
        this.editor.ready(function() {
          self.editor.setContent(html, false);
        });
      }else{
         let self = this;
        this.editor.ready(function() {
          self.editor.setContent('', false);
        });
      }
    },
    setDsabled() {
      let self = this;
      this.editor.ready(function() {
       // console.log(this.editor,'this.editor.setDisabled')
        self.editor.setDisabled(['selectall','mouseDownEvent','copy'])
       // self.editor.setDisabled();
      });
    },
    setEable() {
      this.editor.setEnabled();
    },
    globalUE(){
      return this.editor;
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
