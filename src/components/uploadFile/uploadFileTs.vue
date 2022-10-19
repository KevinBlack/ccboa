<template>
  <div class="file_wp">
    <!-- action="http://127.0.0.1:8080/ecpweb/ecpJson.action" -->
    <form
      ref="formFileUpload"
      :id="uploadConfig.formId"
      :action="flagEnv?'ecpJson.action':'/ecpweb/page/ccboa/ecpJson.action'"
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
              :disabled="disabled"
              ref="filesLists0"
              @click="resetInput"
              @change="uploadFilesChange"
              style="visibility: hidden; position: absolute; width: 1px; height: 1px;"
            />
          </label>
          <span
            class="load_accessory" v-if="uploadConfig.fileType"
          >&nbsp;目前系统只支持bmp格式附件上传{{filesLimit.attachSize?'，附件大小合计不超过'+filesLimit.attachSize+'M':'。'}}</span>
          <span
            class="load_accessory" v-else
          >{{filesLimit.attachWhiteList?'目前系统只支持'+filesLimit.attachWhiteList+'格式附件上传':'请选择文件上传'}}{{filesLimit.attachSize?'，附件大小合计不超过'+filesLimit.attachSize+'M':'。'}}</span>
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
          <input type="hidden" :key="index" name="transFlag" value="p8_rp" />
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
      <input type="hidden" name="transaction_id" v-model="code" />
      <input type="hidden" name="_fw_service_id" value="simpleTransaction" />
      <input type="hidden" :id="uploadConfig.formId+'hid_jsonData'" name="jsonData" />
      <input type="hidden" name="savePath" :value="window.uploadSetFileConfig.savePath" />
      <input type="hidden" name="docType" value="jgyg_staff" />
    </form>
    <div style="clear:both"></div>
  </div>
</template>

<script>
var loading;
var suffix = ["xls", "xlsx", "doc", "docx", "ppt", "pptx", "txt", "pdf", "jpg"];
var fileUpload = new PJF.ui.fileupload({
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
    "pdf",
    ".jpg"
  ],
  missingMessage: "文件格式不支持上传"
});

export default {
  props: {
    uploadConfig: {
      id: { type: String, default: "" },
      formId: { type: String, default: "formFileUpload" },
      filesHas: { type: Array, default: () => [] },
      filesHas1: { type: Array, default: () => [] },
      isSpecial: { type: Number, default: "0" },
      code: { type: String, default: "A0846C002" },
      fileType: { type: Boolean, default: false}  //true 上传格式只为bmp格式
    },
    disabled: {      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      window: window,
      nowRulesName: "", //限制上传的文件
      filesLimit: {
        attachSize: "", //允许上传的大小
        attachWhiteList: "XML$TXT$PNG$DOC$", //允许文件文件
        isActivated: "", //是否启用 文件格式限制 1启用 0 禁用
        isLimitAttSize: "" //是否启用 大小限制1启用 0 禁用
      },
      formFileUpload: {
        _fw_service_id: "",
        transaction_id: "",
        savePath: "",
        transFlag: "",
        remotePath: "",
        docType: "",
        fileUpload: ""
      },
      code: "A0846C054", //交易线
      url: "/ccboa/appSys/ABASE5103",
      nowFilesList: [], //当前文件列表
      checkFilesList: [], //选中上传列表
      isIndeterminate: false, //全选
      hasSameFile: false //相同文件,
    };
  },
  watch: {},
  created() {
    const pjf = PJF;
    this.uploadConfig.formId = this.uploadConfig.formId
      ? this.uploadConfig.formId
      : "formFile";
    this.uploadConfig.uploadBtn =
      this.uploadConfig.uploadBtn === undefined || this.uploadConfig.uploadBtn
        ? true
        : false;
    setTimeout(() => {
      this.fileUpload = new PJF.ui.fileupload({
        dom: "fileUpload",
        maxFileSize: 1024 * 20,
        whiteList: [
          ".xls",
          ".xlsx",
          ".doc",
          ".docx",
          ".ppt",
          ".pptx",
          ".txt",
          ".jpg",
          "pdf"
        ],
        missingMessage: "文件格式不支持上传"
      });
    }, 10);
    this.flagEnv = this.$post.getEnvState();
    this.uploadConfig.code = this.uploadConfig.code
      ? this.uploadConfig.code
      : this.$businessCode.ggywgn;
    //this.whiteCode = this.uploadConfig.code.substr(0,this.uploadConfig.code.length-1)+(this.uploadConfig.code.substr(this.uploadConfig.code.length-1)>1?this.uploadConfig.code.substr(this.uploadConfig.code.length-1)-1:9);
    this.whiteCode = "A0846C001";
    this.getConfigInfo();
  },
  methods: {
    //获取配置
    getConfigInfo() {
      this.$post
        .postData(
          "getAttachConfig",
          JSON.stringify({ function: "getAttachConfig" }),
          this.whiteCode
        )
        .then(res => {
          if (res && res.success) {
            let newA = [];
            let newName = [];
            Object.assign(this.filesLimit, res.data);
            newA = this.filesLimit.attachWhiteList
              .toLocaleLowerCase()
              .split(",")
              .filter(item => {
                if (item) {
                  newName.push("." + item);
                }
                return item;
              });
            this.filesLimit.attachWhiteList = newA.join("、");
            this.nowRulesName = newName.join(",");
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "获取上传文件限制失败，请联系管理员",
              duration: 1000
            });
          }
        });
    },
    resetInput() {
      this.nowFilesList = [];
      this.$refs.filesLists0.value = "";
    },
    uploadFilesChange(e) {
      let files = e.target.files;
      console.log('上传文件', files)
      let nowRules = /[\s,/,/\,",:,;,*,?,<,>,|,%]/;
      let nowFilename = files[0].name.split(".")[0];
      let attachTitle = this.uploadConfig.attachTitle || "";
      let titleCheck = false;
      let hasFile = false; //是否已存在
      let fileSizes = 0; //文件大小
      let hasName = [];
      if (!files.length) {
        return;
      }
      if (checkIsHasSpecialStr(nowFilename)) {
        this.$message({
          type: "error",
          message: "文件名中包含特殊字符"
        });
        return;
      }

      for (let file_index = 0, file_item; (file_item = files[file_index]); file_index++) {
        if (file_item.size > 120 * 1000 * 1024) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "上传文件大小超过 120M, 请减小附件大小",
            duration: 1500
          });
          return;
        }
      }

      if (this.uploadConfig.filesHas) {
        this.uploadConfig.filesHas.map(file => {
          for (var i = 0, node; (node = files[i]); i++) {
            if (node.name == file.fileName) {
              hasFile = true;
              fileSizes += file.size;
              hasName.push(node.name);
            }
          }
        });
      }
      if(this.uploadConfig.filesHas1) {
        this.uploadConfig.filesHas1.map(file => {
          for (var i = 0, node; (node = files[i]); i++) {
            if (node.name == file.fileName) {
              hasFile = true;
              fileSizes += file.size;
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
          message: hasName.join(",") + "文件已存在,请先删除",
          duration: 2000
        });
        this.hasSameFile = true;
        return;
      } else {
        this.hasSameFile = false;
      }
      if (attachTitle.length) {
        if (
          attachTitle.indexOf(nowFilename) == -1 ||
          attachTitle.length < nowFilename.length ||
          (attachTitle.length == nowFilename.length &&
            attachTitle != nowFilename)
        ) {
          titleCheck = true;
        } else {
          this.doUpLoad(e, files, nowRules, fileSizes);
          return;
        }
      } else {
        this.doUpLoad(e, files, nowRules, fileSizes);
        return;
      }
      if (titleCheck) {
        this.$confirm(
          "引入附件名称与处理单中填写的附件名称不一致，是否继续上传？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.doUpLoad(e, files, nowRules);
          })
          .catch(() => {
            return;
          });
      }
    },
    doUpLoad(e, files, nowRules, fileSizes) {
      console.log('filesaaaaaa',files)
      let nowNames = this.filesLimit.attachWhiteList ? this.nowRulesName : "";
      let nowFileName = ""; //匹配格式
      this.isIndeterminate = false;
      for (var i = 0, item; (item = files[i]); i++) {
        nowFileName = "." + item.name.split(".")[item.name.split(".").length - 1].toLocaleLowerCase();
        if(!this.uploadConfig.fileType) {
          if (
            this.filesLimit.attachWhiteList &&
            !nowNames.split(',').includes(nowFileName) &&
            this.filesLimit.isActivated != 0
          ) {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请上传正确的文档格式",
              duration: 500
            });
            return;
          }
        }else {
          nowFileName = item.name.split(".")[item.name.split(".").length - 1].toLocaleLowerCase();
          if(nowFileName != 'bmp'){
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请上传正确的文档格式",
              duration: 500
            });
            return;
          }
        }
        //大小校验
        fileSizes += Math.ceil(item.size || 0);
        console.log("000000000fileSizes00000000", item);
        if (
          this.filesLimit.isLimitAttSize == 1 &&
          fileSizes > this.filesLimit.attachSize * 1000 * 1024
        ) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message:
              "附件总文件大小超过" +
              this.filesLimit.attachSize +
              "M,请先删除多余附件",
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
          size: Math.ceil(item.size / 1024) + "kb",
          check: false
        });
      }

      this.$nextTick(() => {
        this.uploadFileNow(e);
      });
    },
    uploadFileNow(e) {
      loading = new PJF.ui.loading({
        maskBody: true,
        text: "上传中"
      });
      let body = {
        data: {
          id: this.uploadConfig.id,
          fileType: this.uploadConfig.isSpecial.toString()
        },
        url: "/ccboa/appSys/ABASE5103",
        ip: localStorage.getItem("ip"),
        ccbToken: localStorage.getItem("st")
      };
      console.log("body", body);
      let condition = {
        requestBody: JSON.stringify(body),
        OPER_CODE: "123456",
        BRANCH_ID:
          (localStorage.getItem("userInfo") &&
            JSON.parse(localStorage.getItem("userInfo")) &&
            JSON.parse(localStorage.getItem("userInfo")).areaCode) ||
          "123456789" // 分库机构号
      };
      PJF.html.getDom(
        this.uploadConfig.formId + "hid_jsonData"
      ).value = PJF.util.json2str(condition);
      console.log(
        "---formFileUpload---->",
        PJF.html.getDom(this.uploadConfig.formId)
      );
      PJF.html.upload(this.uploadConfig.formId, this.callBackFn);
      e.target.value = "";
    },
    callBackFn(data) {
      loading = null;
      console.log(data);
      if (data.BK_CODE == "000000000000" && data.Data_Cntnt) {
        if (JSON.parse(data.Data_Cntnt).code == "SUCCESS") {
          this.nowFilesList = [];
          let datas = [];
          let fileList = JSON.parse(data.Data_Cntnt).data;
          fileList.forEach(item => {
            datas.push({
              fileName: item.file_name,
              filePath: item.file_path,
              createrName: JSON.parse(localStorage.getItem("userInfo"))
                .humanName,
              createTime: getToday("YYYY-MM-DD HH:mm:ss"),
              id: item.id,
              sort: item.sort,
              isSpecial: this.uploadConfig.isSpecial
            });
          });
          this.$emit("fileList", datas);
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

<style lang="less" rel="stylesheet/less" scoped>
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
  /*margin: 0 0 0 130px;*/
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
