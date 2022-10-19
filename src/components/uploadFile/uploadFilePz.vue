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
          <label class="uploader-btn" @click.stop="lockTips">
            浏&nbsp;览
            <input
              type="file"
              id="filesLists0"
              name="upload"
              ref="filesLists0"
              :disabled="uploadConfig.subTempAddF==true||uploadConfig.isLock==1||uploadConfig.subliceseTip||uploadConfig.zlwhCheck"
              @click="resetInput"
              @change="uploadFilesChange"
              style="visibility: hidden; position: absolute; width: 1px; height: 1px;"
            />
          </label>
          <span
            class="load_accessory"
          >&nbsp;{{filesLimit.attachWhiteList?'目前系统只支持'+filesLimit.attachWhiteList+'格式附件上传':'请选择文件上传'}}{{filesLimit.attachSize?'，附件大小合计不超过'+filesLimit.attachSize+'M':'。'}}</span>
          <el-button
            v-if="false"
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
          <input type="hidden" :key="item" name="transFlag" value="p8_rp" />
          <!-- 指定上传到那儿 -->
          <input
            type="hidden"
            name="remotePath"
            :key="'remotePath'+index"
            :value="window.uploadSetFileConfig.remotePath"
          />
        </template>
        <template v-if="index>0">
          <input class="hideInput" :ref="'filesLists'+index" type="file" :key="index" name="upload" />
          <!-- 文件路径 !!!-->
          <input type="hidden" :key="item" name="transFlag" value="p8_rp" />
          <!-- 指定上传到那儿 -->
          <input
            type="hidden"
            name="remotePath"
            :key="'remotePath'+index"
            :value="window.uploadSetFileConfig.remotePath"
          />
        </template>
      </template>
      <!-- 固定 -->
      <input type="hidden" name="transaction_id" v-model="uploadConfig.code" />
      <input type="hidden" name="_fw_service_id" value="simpleTransaction" />
      <input type="hidden" :id="uploadConfig.formId+'hid_jsonData'" name="jsonData" />
      <input type="hidden" name="savePath" :value="window.uploadSetFileConfig.savePath" />
      <input type="hidden" name="docType" value="jgyg_staff" />
    </form>
    <div style="clear:both"></div>
    <div class="command_wrap" v-if="false">
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
      subliceseTip: { type: Boolean, default: () => false },
      subTempAddF: { type: Boolean, default: () => false },
      isLock: { type: Boolean, default: () => false },
      id: { type: String, default: "" },
      code: { type: String, default: "" },
      url: { type: String, default: "" },
      multiTenancyId: { type: String, default: "" },
      formId: { type: String, default: "formFile" },
      filesHas: { type: Array, default: () => [] },
      uploadBtn: { type: Boolean, default: () => true },
      attachTitle: { type: String, default: "" },
      noattachTitleCheck:{type: Boolean, default: () => true },
      zlwhCheck:{ type: Boolean, default: () => false },
      tempId: { type: String, default: "" },
      unitId: { type: String, default: "" },
      newcode:{ type: String, default: "" },
    } //上传参数
  },
  data() {
    return {
      fileSizesNumb:0,//文件大小
      window:window,
      nowRulesName:'',//限制上传的文件
      filesLimit:{
        attachSize:"",                   //允许上传的大小
        attachWhiteList:"XML$TXT$PNG$DOC$",//允许文件文件
        isActivated:'',//是否启用 文件格式限制 1启用 0 禁用
        isLimitAttSize:'1'//是否启用 大小限制1启用 0 禁用
      },
      flagEnv: false, //标示线上 与 本地环境
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
      isIndeterminate: false, //全选
      hasSameFile: false, //相同文件
      whiteCode:'',
    };
  },
  created() {
    const pjf = PJF;
    this.uploadConfig.formId = this.uploadConfig.formId
      ? this.uploadConfig.formId
      : "formFile";
    this.uploadConfig.uploadBtn =
      this.uploadConfig.uploadBtn === undefined || this.uploadConfig.uploadBtn
        ? true
        : false;
    this.uploadConfig.noattachTitleCheck =  this.uploadConfig.noattachTitleCheck === undefined || this.uploadConfig.noattachTitleCheck
        ? true
        : false;
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
    //交易线转换 表单交易线 -1
    this.uploadConfig.code = this.uploadConfig.code?this.uploadConfig.code:this.$businessCode.ggywgn;
    if(!this.uploadConfig.newcode){
      this.whiteCode = this.uploadConfig.code.substr(0,this.uploadConfig.code.length-1)+(this.uploadConfig.code.substr(this.uploadConfig.code.length-1)-1);
    }else{
      this.whiteCode = this.uploadConfig.newcode;
    }
     
    this.getConfigInfo();
  },
  methods: {
    //锁文后的操作
    lockTips(){
      if(!this.uploadConfig.isLock){
        if(this.uploadConfig.subliceseTip){
           this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: '请先保存表单',
            duration: 1000
          });
           return;
        }
        if(this.uploadConfig.subTempAddF){
           this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: '附件不可操作',
            duration: 1000
          });
           return;
        }
        if(this.uploadConfig.zlwhCheck){
         this.$emit("selectFileCheck")
        }
       
      }else{
        this.$message({
        type: "error",
        showClose: true,
        offset: 400,
        message: '此签报的正文、附件已被锁定，不可进行编辑。',
        duration: 1000
      });
       if(this.uploadConfig.isLock||this.uploadConfig.subTempAddF){
           $("#filesLists0").attr("disabled",true)
        }else{
          $("input[type='file']").map((i,node)=>{
            node.attr("disabled",false)
          })
        }
      return;
      }
      
    },
    //获取配置
    getConfigInfo (){
       this.$post.postData(
        "getAttachConfig",
        JSON.stringify({function:'getAttachConfig'}),
        this.whiteCode
      ).then((res) => {
        if(res&&res.success){
          let newA = [];
          let newName = [];
          console.log('上传配置')
           console.log(res)
            console.log('----------------------')
          Object.assign(this.filesLimit,res.data);
          newA = this.filesLimit.attachWhiteList.toLocaleLowerCase().split(",").filter((item)=>{
            if(item){
              newName.push('.'+item);
            }
            return item;
          });
          this.filesLimit.attachWhiteList = newA.join("、");
          this.nowRulesName = newName.join(",");
        }else{
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: '获取上传文件限制失败，请联系管理员',
            duration: 1000
          });
        }
      })
    },
    handleCheckAllChange(e) {
      let hasFile = false; //是否已存在
      let hasName = [];
      if (e) {
        //全选时
        this.nowFilesList.map(item => {
          this.checkFilesList.push(item.id);
        });
        if (this.uploadConfig.filesHas) {
          this.uploadConfig.filesHas.map(file => {
            this.nowFilesList.map(node => {
              if (node.name == file.fileName) {
                hasFile = true;
                hasName.push(node.name);
              }
            });
          });
        }

        if (hasFile) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: hasName.join(",") + "文件已存在,请先删除",
            duration: 1000
          });
          this.hasSameFile = true;
          return;
        } else {
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
      if (this.uploadConfig.filesHas) {
        this.uploadConfig.filesHas.map(file => {
          e.map(node => {
            if (node == file.fileName) {
              hasFile = true;
              hasName.push(node);
            }
          });
        });
      }
      if (hasFile) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: hasName.join(",") + "文件已存在,请先删除",
          duration: 1000
        });
        this.hasSameFile = true;
      } else {
        this.hasSameFile = false;
      }
      this.nowFilesList.map(file => {
        e.map(node => {
          if (node == file.name) {
            file.check = true;
          }
        });
      });
      // this.$refs.filesLists0.files[0].name
      this.isIndeterminate = checkedCount === this.nowFilesList.length;
    },
    resetInput(){
      this.nowFilesList = [];
      this.$refs.filesLists0.value = '';
    },
    uploadFilesChange(e) {
      let files = e.target.files;
      let nowRules = /[\s,/,/\,",:,;,*,?,<,>,|,%]/;
      let nowFilename = files[0].name.split('.')[0];
      
      let attachTitle = this.uploadConfig.attachTitle || [];
      let titleCheck = false;
      let hasFile = false; //是否已存在
      let fileSizesHas = 0;//已上传附件大小
      let tipsInfo = '处理单中附件名称没有填写，继续?';
      let hasName = [];
      let that = this;
      attachTitle = attachTitle.length&&attachTitle.split(".")||[];
      attachTitle.map((node,index)=>{
        if(index>0){
          node = node.replace(/\d/g,'');
        }
      })
      if(attachTitle.length>1){
        attachTitle.shift();
      }
      if (!files.length) {
        return;
      }
      //校验文件名符号规范
        // if (
        //   nowRules.test(files[0].name) ||
        //   files[0].name.match(/[\s,/,/\,",:,;,*,?,<,>,.,|,%]/g).length == 2
        // ) {
        //   this.$message({
        //     type: "error",
        //     showClose: true,
        //     offset: 400,
        //     message: "文件名含有特殊字符，请修改",
        //     duration: 1500
        //   });
        //   return;
        // }
      //校验是否已存在
      
      if (this.uploadConfig.filesHas) {
        this.uploadConfig.filesHas.map(file => {
           for (var i = 0, node; (node = files[i]); i++) {
            if (node.name == file.fileName) {
              hasFile = true;
             
              hasName.push(node.name);
            }else{
              fileSizesHas+=file.length;
            }
           }
        });
      }
      if (hasFile) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: hasName.join(",") + "文件已存在,请先删除",
          duration: 2000
        });
        this.hasSameFile = true;
        return;
      } else {
        this.hasSameFile = false;
      }
      //校验名称
      if(!this.uploadConfig.noattachTitleCheck){
        if (attachTitle.length) {
          let numbs = 0;
          attachTitle.map((attachInfo)=>{
            if(attachInfo.indexOf(nowFilename)==-1||attachInfo.length < nowFilename.length || (attachInfo.length == nowFilename.length&&attachInfo!= nowFilename)){
              numbs++;
              titleCheck = true;
              tipsInfo = "引入附件名称与处理单中填写的附件名称不一致，是否继续上传？";
            }
          })
          if(numbs == attachTitle.length){
            titleCheck = true;
          }else{
            titleCheck = false;
          }
        }else{
          //未填写附件名称
          titleCheck = true;
        }
      }else{
        this.doUpLoad(files,nowRules,fileSizesHas);
        return;
      }
      if (titleCheck) {
        this.$confirm(
          tipsInfo,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.doUpLoad(files,nowRules,fileSizesHas);
          })
          .catch(() => {
            console.log(that.$refs.filesLists0.files);
            that.$refs.filesLists0.value = '';
            return;
          });
      }else{
        this.doUpLoad(files,nowRules,fileSizesHas);
        return;
      }
    },
    doUpLoad(files,nowRules,fileSizes){
      let nowNames = this.filesLimit.attachWhiteList ? this.nowRulesName :'';
      let nowFileName = '';//匹配格式
      this.isIndeterminate = false;
      for (var i = 0, item; (item = files[i]); i++) {
        nowFileName = '.'+item.name.split(".")[item.name.split(".").length-1].toLocaleLowerCase();
        //校验文件名符号规范
        // if (
        //   nowRules.test(item.name) ||
        //   item.name.match(/[\s,/,/\,",:,;,*,?,<,>,.,|,%]/g).length == 2
        // ) {
        //   this.$message({
        //     type: "error",
        //     showClose: true,
        //     offset: 400,
        //     message: "文件名含有特殊字符，请修改",
        //     duration: 1000
        //   });
        //   return;
        // }
        if(item.name.length>100){
           this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "附件名称最长不能超过100字，请修改后上传！",
            duration: 500
          });
          return;
        }
        if(this.filesLimit.attachWhiteList&&!nowNames.includes(nowFileName) && this.filesLimit.isActivated!=0){
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请上传正确的文档格式",
            duration: 500
          });
          return;
        }
        //大小校验
        fileSizes += Math.ceil(item.size||0);
        console.log('----文件大小校验----')
        this.fileSizesNumb = Math.ceil(item.size||0);
        console.log(this.filesLimit.attachSize*1000*1024)
        if( this.filesLimit.isLimitAttSize == 1 && fileSizes>this.filesLimit.attachSize*1000*1024){
           this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: this.uploadConfig.filesHas&&this.uploadConfig.filesHas.length?"附件总文件大小超过"+ this.filesLimit.attachSize+"M,请先删除多余附件":"附件总文件大小不能超过"+ this.filesLimit.attachSize+"M",
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
          size:  Math.ceil(item.size / 1024)+'kb',
          check: false
        });
      }
      this.$nextTick(()=>{
        this.uploadFileNow(fileSizes);
      })
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
    uploadFileNow(fileSizes) {
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
     
      if (!this.uploadConfig.id) {
        this.$emit("preserve", "uploadfile",this.uploadConfig.formId);
        return;
      }
       loading = new PJF.ui.loading({
        maskBody: true,
        text: "上传中"
      });
      var condition = {
        requestBody: JSON.stringify({
          fileTile: uploadFileName,
          fileComment: "文件描述",
          fileFlag: 0,
          function: this.uploadConfig.url,
          st: localStorage.getItem("st"),
          id: this.uploadConfig.id,
          length:this.fileSizesNumb,
          multiTenancyId: this.uploadConfig.multiTenancyId,
          length:this.fileSizesNumb,
          unitId:this.uploadConfig.unitId,
          tempId: this.uploadConfig.tempId,
          isSpecial:this.uploadConfig.isSpecial
        }),
        OPER_CODE: "123123",
        BRANCH_ID: localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))&&JSON.parse(localStorage.getItem("userInfo")).areaCode||'123456789', // 分库机构号
      };
      PJF.html.getDom(
        this.uploadConfig.formId + "hid_jsonData"
      ).value = PJF.util.json2str(condition);
      console.log(
        "---formFileUpload---->",
        PJF.html.getDom(this.uploadConfig.formId)
      );
      PJF.html.upload(this.uploadConfig.formId, this.callBackFn);
    },
    callBackFn(data) {
      loading = null;
      console.log(data);
      if ((data.BK_CODE = "000000000000" && data.Data_Cntnt)) {
        if (JSON.parse(data.Data_Cntnt).success) {
          this.nowFilesList = [];
          this.$refs.filesLists0.value = '';
          this.$emit("preserve","callBacksave",null,null,null,true);
          
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
  },
};
</script>

<style  lang="less" rel="stylesheet/less" scoped>
.btn_disb{
  color: #666;
  border: 1px solid #666;
  cursor: not-allowed;
  border-radius: 2px;
  padding: 4px 8px;
}
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
.hideInput {
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
