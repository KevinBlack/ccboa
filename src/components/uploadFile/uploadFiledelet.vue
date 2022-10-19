<template>
  <div class="file_wp" :style="{'margin-left':uploadConfig.width?uploadConfig.width:'130px'}">
    <!-- action="http://127.0.0.1:8080/ecpweb/ecpJson.action" -->
    <form
      ref="formFileUpload"
      :id="uploadConfig.formId"
      :action="flagEnv?'ecpJson.action':'http://127.0.0.1:8080/ecpweb/ecpJson.action'"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="uploader uploader-example">
        <div class="uploader-drop">
          <label class="uploader-btn">
            浏&nbsp;览
            <input
              type="file"
              name="upload"
              ref="filesLists0"
              @change="uploadFilesChange"
              multiple="multiple"
              style="visibility: hidden; position: absolute; width: 1px; height: 1px;"
            />
          </label>
          <span
            class="load_accessory"
          >&nbsp;引入附件文件名（包括压缩包中的文件名）不能包括以下半角符号：空格/ \ , " : ; * ? &lt; &gt;| . %，附件大小不超过20M</span>
          <el-button
            v-if="uploadConfig.uploadBtn"
            :disabled="nowFilesList.length==0"
            type="primary"
            size="mini"
            @click="uploadFileNow()"
            style="float:right"
          >上传</el-button>
        </div>
      </div>
      <template v-for="(item,index) in nowFilesList">
        <template v-if="index==0">
          <!-- 文件路径 !!!-->
          <input type="hidden" :key="item.name" name="transFlag" value="p8_rp" />
          <!-- 指定上传到那儿 -->
          <input type="hidden" name="remotePath" :key="'remotePath'+index" value="/log/file/p8Files" />
        </template>
        <template v-if="index>0">
          <input class="hideInput" :ref="'filesLists'+index" type="file" :key="index" name="upload"/>
          <!-- 文件路径 !!!-->
          <input type="hidden" :key="item.name" name="transFlag" value="p8_rp" />
          <!-- 指定上传到那儿 -->
          <input type="hidden" name="remotePath"  :key="'remotePath'+index" value="/log/file/p8Files" />
        </template>
      </template>
      <!-- 固定 -->
      <input type="hidden" name="transaction_id" v-model="uploadConfig.code"/>
      <input type="hidden" name="_fw_service_id" value="simpleTransaction" />
      <input type="hidden" :id= "uploadConfig.formId+'hid_jsonData'" name="jsonData" />
      <input type="hidden" name="savePath"  value="/log/file/p2Files" />
       <input type="hidden" name="docType"  value="jgyg_staff" />
    </form>
    <div style="clear:both"></div>
    <div class="command_wrap">
      <div v-if="nowFilesList.length>0" style="height:160px;overflow:scroll">
        <template>
          <el-scrollbar>
            <el-row class="pad_yj10" v-for="file in nowFilesList"
               :key="file.name"
              >
              <el-col :span='10'>
                  {{file.name}}
              </el-col>
              <el-col :span='7'>
                  {{file.size}}
              </el-col>
              <el-col :span='7'>
                 <el-button
                type="default"
                size="mini"
                @click="deletFiles(file)"
              >删除</el-button>
              </el-col>
            </el-row>
            <!-- <el-checkbox-group v-model="checkFilesList" @change="handleCheckedFilesChange">
              <el-checkbox
                v-for="file in nowFilesList"
                :label="file.name"
                :value="file.name"
                :key="file.name"
              >{{file.name}}</el-checkbox>
            </el-checkbox-group> -->
          </el-scrollbar>
        </template>
      </div>
    </div>
    
  </div>
</template>

<script>
var loading;
var suffix = ["xls", "xlsx", "doc", "docx", "ppt", "pptx", "txt", "pdf"];
var fileUpload = new PJF.ui.fileupload({
  dom: "fileUpload",
  maxFileSize: 1024 * 30,
  whiteList: [".xls", ".xlsx", ".doc", ".docx", ".ppt", ".pptx", ".txt", "pdf"],
  missingMessage: "文件格式不支持上传"
});

export default {
  props: {
    // 表格数据
    tableData: { type: Array, default: () => [] },
    activities: { type: Array, default: () => [] },
    mkid: { type: String, default: "" }, //交易线id是动态的
    url: { type: String, default: "" },
    uploadConfig: {
      id: { type: String, default: "" },
      code: { type: String, default: "" },
      url: { type: String, default: "" },
      multiTenancyId:{ type: String, default:""},
      formId:{ type: String, default: "formFile"},
      filesHas: { type: Array, default: () => [] },
      uploadBtn:{type:Boolean,default: () => true}
    } //上传参数
  },
  data() {
    return {
      flagEnv:false,//标示线上 与 本地环境
      formFileUpload: {
        _fw_service_id: "",
        transaction_id: "",
        savePath: "",
        transFlag: "",
        remotePath: "",
        docType: "",
        fileUpload: ""
      },
      nowFilesList: [], //当前文件列表
      checkFilesList: [], //选中上传列表
      isIndeterminate: false,//全选
      hasSameFile:false //相同文件
    };
  },
  created() {
    const pjf = PJF;
    this.uploadConfig.formId = this.uploadConfig.formId?this.uploadConfig.formId:'formFile';
    this.uploadConfig.uploadBtn = this.uploadConfig.uploadBtn===undefined||this.uploadConfig.uploadBtn?true:false;
    setTimeout(() => {
      this.fileUpload = new PJF.ui.fileupload({
        dom: "fileUpload",
        maxFileSize: 1024 * 30,
        whiteList: [
          ".xls",
          ".xlsx",
          ".doc",
          ".docx",
          ".ppt",
          ".pptx",
          ".txt",
          "pdf"
        ],
        missingMessage: "文件格式不支持上传"
      });
    }, 10);
    this.flagEnv = this.$post.getEnvState();

    // this.fileUpload = PJF.ui.fileupload({
    //     dom: 'fileUpload',
    //     maxFileSize: 1024 * 30,
    //     whiteList: [".xls", ".xlsx", ".doc", ".docx", ".ppt", '.pptx', '.txt','pdf'],
    //     missingMessage: "文件格式不支持上传"
    // });
  },
  methods: {
    handleCheckAllChange(e) {
      let hasFile = false; //是否已存在
      let hasName = [];
      if (e) {//全选时
        this.nowFilesList.map(item => {
          this.checkFilesList.push(item.id);
        });
        if(this.uploadConfig.filesHas){
          this.uploadConfig.filesHas.map((file)=>{
            this.nowFilesList.map((node)=>{
              if(node.name == file.fileName){
                hasFile = true;
                hasName.push(node.name);
              }
            })
          })
        }
        
        if(hasFile){
          this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: hasName.join(",")+"文件已存在,请先删除",
              duration: 1000
            });
            this.hasSameFile = true;
            return;
        }else{
          this.hasSameFile = false;
        }
      } else {
        this.checkFilesList = [];
      }
      this.isIndeterminate = e;
    },
    handleCheckedFilesChange(e) {
      let checkedCount = e.length;
      let hasFile = false; //是否已存在
      let hasName = [];
      let fileSizes = 0;   //文件大小
      if(this.uploadConfig.filesHas){
        this.uploadConfig.filesHas.map((file)=>{
          fileSizes += file.size;
          e.map((node)=>{
            if(node == file.fileName){
              hasFile = true;
              hasName.push(node);
            }
          })
        })
      }
      if(hasFile){
         this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: hasName.join(",")+"文件已存在,请先删除",
            duration: 1000
          });
           this.hasSameFile = true;
      }else{
        this.hasSameFile = false;
      }
      this.nowFilesList.map((file)=>{
         e.map((node)=>{
          if(node == file.name){
            file.check = true;
          }
        })
      });
      // this.$refs.filesLists0.files[0].name
      this.isIndeterminate = checkedCount === this.nowFilesList.length;
    },
    uploadFilesChange(e) {
      let files = e.target.files;
      let hasName = [];
      let hasFile = false; //是否已存在
      let fileSizes = 0;   //文件大小
      let nowRules = /[\s,/,/\,",:,;,*,?,<,>,|,%]/;
      // let nowNames = /\.["doc","docx","ppt","pptx","txt","pdf"]$/;
      if (!files.length) {
        return;
      }
      this.isIndeterminate = false;
      for (var i = 0, item; (item = files[i]); i++) {
        //校验文件名符号规范
        if(nowRules.test(item.name)||item.name.match(/[\s,/,/\,",:,;,*,?,<,>,.,|,%]/g).length == 2){
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "文件名含有特殊字符，请修改",
            duration: 1000
          });
          return;
        }
        // if(!nowNames.test(item.name)){
        //   this.$message({
        //     type: "error",
        //     showClose: true,
        //     offset: 400,
        //     message: "请上传正确的文档格式",
        //     duration: 500
        //   });
        //   return;
        // }
        //校验是否已经存在
        if(this.uploadConfig.filesHas){
          this.uploadConfig.filesHas.map((file)=>{
              if(item.name == file.fileName){
                hasFile = true;
                fileSizes += file.size;
                hasName.push(item.name);
              }
          })
        }
        
        if(hasFile){
          this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: hasName.join(",")+"文件已存在,请先删除",
              duration: 1500
            });
            this.hasSameFile = true;
            return;
        }else{
          this.hasSameFile = false;
        }
        //大小校验
        fileSizes += Math.ceil(item.size / 1024)+'kb';
        if(fileSizes>20000*1024){
           this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "附件总文件大小超过20M,请先删除多余附件",
              duration: 1500
            });
            return;
        }
        this.nowFilesList = this.nowFilesList.filter(node => {
          return node.name != item.name;
        });
        this.nowFilesList.push({
          name: item.name,
          id: item.name,
          size: Math.ceil(item.size / 1024)+'kb',
          check:false
        });
      }
    },
    deletFiles(file) {
      this.nowFilesList = this.nowFilesList.filter(item => {
        let show = true;
          if (item.name === file.name) {
            show = false;
          }
        return show;
      });
    },
    uploadFileNow() {
      //let params = Object.assign(this.bank_doSend, this.fromdata);
      // var uploadFileName = fileUpload.getUploadFileName();
      var uploadFileName = "";
      //点击上传按钮是，判断是否选择了文件
      // if (uploadFileName == "" || uploadFileName == null) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "请选择文件",
      //     duration: 1000
      //   });
      //   return;
      // }
      // var pointIndex = uploadFileName.lastIndexOf("."); //取到文件名开始到最后一个点的长度
      // var filesuffix = uploadFileName.substring(
      //   pointIndex + 1,
      //   uploadFileName.length
      // ); //截取获得后缀名
      // if (suffix.indexOf(filesuffix) == -1) {
      //   return;
      // }
      // if (
      //   uploadFileName.indexOf("&") != -1 ||
      //   uploadFileName.indexOf("$") != -1
      // ) {
      //   new PJF.ui.messageBox({
      //     style: "confirm",
      //     title: "提示",
      //     content: "文件名称中包含特殊字符，请修改后再上传"
      //   });
      //   return;
      // }
      loading = new PJF.ui.loading({
        maskBody: true,
        text: "上传中"
      });
      if (!this.uploadConfig.id) {
        this.$emit("preserve", "uploadfile");
        return;
      }
      var condition = {
        requestBody: JSON.stringify({
          fileTile: uploadFileName,
          fileComment: "文件描述",
          fileFlag: 0,
          function: this.uploadConfig.url,
          st: localStorage.getItem("st"),
          id: this.uploadConfig.id,
          multiTenancyId:this.uploadConfig.multiTenancyId
        }),
        "OPER_CODE":"123123"
      };
      PJF.html.getDom(this.uploadConfig.formId+"hid_jsonData").value = PJF.util.json2str(condition);
      console.log("---formFileUpload---->", PJF.html.getDom(this.uploadConfig.formId));
      PJF.html.upload(this.uploadConfig.formId, this.callBackFn);
    },
    callBackFn(data) {
      loading = null;
      console.log(data)
      if ((data.BK_CODE = "000000000000" && data.Data_Cntnt)) {
        if (JSON.parse(data.Data_Cntnt).success) {
         this.nowFilesList = [];
         this.$emit("preserve");
         this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "上传成功",
            duration: 500
          });
        } else {
           this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "上传失败",
            duration: 500
          });
        }
      } else {
       this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "上传失败",
            duration: 500
          });
      }
    }
  }
};
</script>

<style  lang="less" rel="stylesheet/less" scoped>
.btn_nn {
  cursor: pointer;
  margin-top: 15px;
  border: 1px solid #0f98fe;
  color: white;
  width: 60px;
  line-height: 30px;
  text-align: center;
  background: #0f98fe;
  border-radius: 5px;
}
.hideInput{
  width: 0;
  height: 0;
}
.tip {
  margin-top: 15px;
  width: 100%;
  line-height: 30px;
}
.file_wp {
  margin: 0 0 0 130px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .uploader-example {
    padding: 20px 0;
    font-size: 12px;
  }
  .uploader-drop {
    position: relative;
    padding: 10px;
    overflow: hidden;
    border: 1px dashed #ccc;
    background-color: #f5f5f5;
  }
  .uploader-btn {
    display: inline-block;
    position: relative;
    padding: 4px 8px;
    font-size: 100%;
    line-height: 1.4;
    color: #666;
    border: 1px solid #666;
    cursor: pointer;
    border-radius: 2px;
    background: none;
    outline: none;
  }
  .el-checkbox {
    display: inline-block;
    padding: 10px 0;
    display: block;
    margin-right: 0;
  }
  .command_wrap {
    max-height: 200px;
    .el-scrollbar {
      height: 100%;
    }
    .el-checkbox-group {
      overflow: scroll;
    }
  }
}
</style>
