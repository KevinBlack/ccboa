<template>
  <div class="file_wp" v-if="specialDialog">
    <form
      ref="formSpacilFileUpload"
      id="formSpacilFileUpload"
      :action="flagEnv?'ecpJson.action':'http://127.0.0.1:8080/ecpweb/ecpJson.action'"
      method="post"
      enctype="multipart/form-data"
    >
      <!-- <span ref="fileUpload" id="fileUpload"></span> -->
      <!-- <input type="file" name="upload"> -->

      <div class="uploader uploader-example">
        <div class="uploader-drop">
          <label class="uploader-btn">
            浏&nbsp;览
            <input
              type="file"
              name="upload"
              ref="fileForBtn"
              :readonly="uploadConfig.zlwhCheck"
              @change="uploadFilesChange"
              @click="resetInput"
              style="visibility: hidden; position: absolute; width: 1px; height: 1px;"
            />
          </label>
          <span
            class="load_accessory"
          >&nbsp;引入附件文件名（包括压缩包中的文件名）不能包括以下半角符号：空格/ \ , " : ; * ? &lt; &gt;| . %，附件大小不超过20M</span>
          <!-- <el-button
            :disabled="checkFilesList.length==0"
            type="primary"
            size="mini"
            @click="uploadFileNow()"
            style="float:right"
          >上传</el-button> -->
        </div>
      </div>

      <input type="hidden" name="_fw_service_id" value="simpleTransaction" />
      <!-- 固定 -->
      <input type="hidden" id="hid_jsonData_spical" name="jsonData" />
      <!-- <input type="hidden" v-model="uploadConfig.code" name="transaction_id" /> -->
      <input type="hidden" name="transaction_id" :value="uploadConfig.code" />
      <!-- 业务线 !!!-->
      <input type="hidden" name="savePath" :value="window.uploadSetFileConfig.savePath" />
      <!-- 文件路径 !!!-->
      <input type="hidden" name="transFlag" value="p8_rp" />
      <!-- 指定上传到那儿 -->
      <input type="hidden" name="remotePath" :value="window.uploadSetFileConfig.remotePath" />
      <!-- P8文件路径  !!! -->
      <input type="hidden" name="docType" value="jgyg_staff" />
      <!-- 固定 -->
    </form>
    <div style="clear:both"></div>
    <el-row class="mrg-b-20" v-if="false">
      <el-button
          v-if="false&&nowFilesList.length>0"
          type="default"
          size="mini"
          @click="Sends(null)"
          style="float:right;margin-right:10px"
        >清空</el-button>
    </el-row>
    <div class="command_wrap" v-if="false">
      <div v-if="nowFilesList.length>0" style="height:160px;overflow:scroll" class="speical_warp">
        <template>
          <el-scrollbar>
            <div v-for="(file,fileNum) in nowFilesList"
                :label="file.name"
                :value="file.name"
                :key="file.fileId" class="mrg-b-14">
              <el-row v-if="!file.timepState">
                <el-col :span="14">{{file.name}}</el-col>
                <el-col :span="10">
                  <div>
                    <div>
                      <el-button
                        v-if="nowFilesList.length>0"
                        type="default"
                        size="mini"
                        :disabled="!file.fileId"
                        @click="seletNowFiles(file,fileNum)"
                        style="float:right;margin-right:10px;padding: 4px 8px;"
                      >选择</el-button>
                      <el-button
                        v-if="nowFilesList.length>0"
                        type="default"
                        size="mini"
                        @click="Sends(file,fileNum)"
                        style="float:right;margin-right:10px;padding: 4px 8px;"
                      >删除</el-button>
                    </div>
                   
                  </div>
                </el-col>
               </el-row>
                 <el-row class="attach_filew">
                  <el-col>
                    <el-tag closable v-for="(item,n) in uploadConfig.sendObjData[fileNum]" :key="item.id" style="margin-right:10px;" @close="deletFuFile(n,item.text,fileNum)">{{item.text}}</el-tag>
                  </el-col>
                </el-row>
            </div>
          </el-scrollbar>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Message,
  Loading
} from 'element-ui'
var loading;
var loadingState;
var suffix = ["xls", "xlsx", "doc", "docx", "ppt", "pptx", "txt", "pdf"];
var fileUpload = new PJF.ui.fileupload({
  dom: "fileUpload",
  maxFileSize: 1024 * 30,
  whiteList: [".xls", ".xlsx", ".doc", ".docx", ".ppt", ".pptx", ".txt", "pdf"],
  missingMessage: "文件格式不支持上传"
});

export default {
  name:'uploadfilespecial',
  props: {
    // 表格数据
    specialDialog:{ type: Boolean, default: () => false },
    tableData: { type: Array, default: () => [] },
    activities: { type: Array, default: () => [] },
    mkid: { type: String, default: "" }, //交易线id是动态的
    url: { type: String, default: "" },
    uploadConfig: {
      id: { type: String, default: "" },
      code: { type: String, default: "" },
      url: { type: String, default: "" },
      sendObjData: { type: Array, default: () => [] },
      checkedAllName:{ type: String, default:''},
      sendObjSpecialFile: { type: Array, default: () => [] },//当前选择发送附件的序号
      uploadInfo:{ type: Array, default: () => [] },
      zlwhCheck:{ type: Boolean, default: () => false },
    },//上传参数
  },
  data() {
    return {
      window:window,
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
      isIndeterminate: false
    };
  },
  created() {
    const pjf = PJF;
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
    this.$set(this.uploadConfig)
    this.nowFilesList = [];
    // this.fileUpload = PJF.ui.fileupload({
    //     dom: 'fileUpload',
    //     maxFileSize: 1024 * 30,
    //     whiteList: [".xls", ".xlsx", ".doc", ".docx", ".ppt", '.pptx', '.txt','pdf'],
    //     missingMessage: "文件格式不支持上传"
    // });
  },
  methods: {
    nowFilesListCheck(){//处理数据不更新
      this.nowFilesList.push({timepState : Math.random()});
    },
    nowFilesListClear(){//处理取消数据清除
      this.nowFilesList.splice(0);
      this.uploadConfig.sendObjData.splice(0);
    },
    handleCheckAllChange(e) {
      if (e) {
        this.nowFilesList.map(item => {
          this.checkFilesList.push(item.id);
        });
      } else {
        this.checkFilesList = [];
      }
      this.isIndeterminate = e;
    },
    handleCheckedFilesChange(file,num) {
      // this.uploadConfig.sendObjSpecialFile = [];
      if(!this.uploadConfig.uploadInfo){
        this.uploadConfig.uploadInfo= []
      } 
      this.uploadConfig.uploadInfo[num] = [];//特殊发送 对象 公告至 附件信息
      this.uploadConfig.sendObjSpecialFile[num] = num;
      this.uploadConfig.uploadInfo[num] = {
        "fileId": file.fileId,//无附件时为空
        "main": "",// 发送对象 的部门id
        "copy": "",
        "inline": ""// 公告至 的部门id
      };
    },
    resetInput(){
      this.$refs.fileForBtn.value = '';
    },
    uploadFilesChange(e) {
      let files = e.target.files;
      let hasFile = false; //是否已存在
      let hasName = [];
      let nameExceed = false;
      if (!files.length) {
        return;
      }
      //校验文件是否已存在
      if (this.nowFilesList&&this.nowFilesList.length) {
        this.nowFilesList.map(file => {
           for (var i = 0, node; (node = files[i]); i++) {
            if (node.name == file.name) {
              hasFile = true;
              hasName.push(node.name);
            }
           }
        });
      }
      if (hasFile) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: hasName.join(",") + "同名附件已存在,不可再次引入",
          duration: 2000
        });
        this.hasSameFile = true;
        return;
      } else {
        this.hasSameFile = false;
      }
      for (var i = 0, item; (item = files[i]); i++) {
        if(item.name.length>100){
          nameExceed = true;
        }else{
          this.nowFilesList = this.nowFilesList.filter(node => {
            node.disabled = true;
            return node.name != item.name;
          });
          this.nowFilesList.push({
            name: item.name,
            // id: item.name,
            size: item.size,
            disabled: true
          });
        }
        
      }
      if(nameExceed){
           this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "附件名称最长不能超过100字，请修改后上传！",
            duration: 500
          });
          return;
      }
      loadingState = Loading.service({
        fullscreen: true,
        lock: true,
        text:'上传中......'
      })
        this.uploadConfig.zlwhCheck = true;
       //上传文件
       setTimeout(()=>{
         this.uploadFileNow();
       },1000)
    },
    Sends(file,n) {
      if(file){
        this.uploadConfig.sendObjData.splice(n,1);
        this.nowFilesList.splice(n,1);
      }else{
        this.uploadConfig.uploadInfo = [];
        this.uploadConfig.sendObjData = [];
        this.nowFilesList = [];
        this.uploadConfig.zlwhCheck = false;
      }
      
    },
    seletNowFiles(file,num) {
      this.handleCheckedFilesChange(file,num);
      console.log(JSON.stringify(file),"勾选特殊发送成员");
      
      this.$emit('backbankmain','sendObj','needBackShow',num)
    },
    uploadFileNow() {
      var uploadFileName = "";
      var that = this
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
          function: this.uploadConfig.url,
          st: localStorage.getItem("st"),
          id: this.uploadConfig.id,
          isSpecial:1 //特殊发送
        }),
         "OPER_CODE":"123123",
         BRANCH_ID: localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))&&JSON.parse(localStorage.getItem("userInfo")).areaCode||'123456789', // 分库机构号
      };
      PJF.html.getDom("hid_jsonData_spical").value = PJF.util.json2str(condition);
      console.log( PJF.util.json2str(condition));
      console.log("---formSpacilFileUpload---->", PJF.html.getDom("formSpacilFileUpload"));
      PJF.html.upload("formSpacilFileUpload", this.callBackFn);
       $("#mask_body").hide();
    },
    deletSendFile(n) {
      this.nowFilesList.splice(n,1);
    },
    callBackFn(data) {
      let nowUpFile = {};
      loadingState.close();
      loading = null;
      console.log(data)
      this.uploadConfig.zlwhCheck = false;
      if ((data.BK_CODE = "000000000000" && data.Data_Cntnt)) {
        if (JSON.parse(data.Data_Cntnt).success) {
         JSON.parse(data.Data_Cntnt).data.map((node)=>{
          nowUpFile.name = node.file_name;
          nowUpFile.fileId = node.id;
         })
         this.$forceUpdate();
         console.log('特殊发送的附件',this.nowFilesList);
         
         this.$refs.fileForBtn.value = '';
          this.$emit("initsearch",nowUpFile);
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "上传成功",
            duration: 1000
          });
        } else {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "上传失败",
            duration: 1000
          });
        }
      } else {
        new PJF.ui.messageBox({
          style: "confirm",
          title: "提示",
          content: "上传失败"
        });
      }
    },
    deletFuFile(n,name,fileNum){
      
      if(this.uploadConfig.checkedAllName){
        if(this.uploadConfig.checkedAllName.indexOf(name)){
          this.uploadConfig.checkedAllName+=","+name;
        }
      }else{
        this.uploadConfig.checkedAllName+=name;
      }
      this.uploadConfig.sendObjData[fileNum].splice(n,1);
      return false;
    }
  },
  watch:{
    'uploadConfig.checkChange':{
      handler:function(data){
        console.log(data);
        this.uploadConfig.sendObjData.map((node,n)=>{
          if(!node){
            this.uploadConfig[n] = [];
          }
        });
        this.$forceUpdate();
      },
      deep:true
    },
    "uploadConfig.sendObjData": {
      handler(newv) {
        this.uploadConfig.sendObjData = newv;
        this.$forceUpdate();
      },
      deep: true
    },
    "uploadConfig.checkedAllName": {
      handler(newv) {
        this.uploadConfig.checkedAllName = newv;
        this.$forceUpdate();
      },
      immediate:true
    },
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

.tip {
  margin-top: 15px;
  width: 100%;
  line-height: 30px;
}
.file_wp {
  margin: 0 0 0 0px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .uploader-example {
    padding: 0;
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
.speical_warp{
    /deep/ .el-checkbox__input{
      float: left;
    }
    /deep/ .el-checkbox__label{
      width: 100%;
    }
}
.attach_filew{
  white-space: normal;
  line-height: 30px;
}
.noFile{
  padding:20px 0 20px 0;
}
.noFile_wrap{
  line-height: 30px;
}
</style>
