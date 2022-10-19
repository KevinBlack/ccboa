<template>
  <div class="file_wp">
    <!-- action="http://127.0.0.1:8080/ecpweb/ecpJson.action" -->
    <form
      ref="formFileUpload"
      :id="uploadConfig.formId"
      :action="flagEnv ? 'ecpJson.action' : '/ecpweb/page/ccboa/ecpJson.action'"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="uploader uploader-example">
        <div class="uploader-drop">
          <!-- <label class="uploader-btn">
            浏览
            <input
              type="file"
              name="upload"
              :disabled="disabled"
              ref="filesLists0"
              @click="resetInput"
              @change="uploadFilesChange"
              style="
                visibility: hidden;
                position: absolute;
                width: 1px;
                height: 1px;
              "
            />
          </label> -->

          <el-button
            type="primary"
            @click="uploadFileNow()"
            style="float: right"
            >上传
          </el-button>
        </div>
      </div>
      <template v-for="(item, index) in nowFilesList">
        <template v-if="index == 0">
          <!-- 文件路径 !!!-->
          <input type="hidden" :key="index" name="transFlag" value="p8_rp" />
          <!-- 指定上传到那儿 -->
          <input
            type="hidden"
            name="remotePath"
            :key="'remotePath' + index"
            :value="window.uploadSetFileConfig.remotePath"
          />
        </template>
        <template v-if="index > 0">
          <!-- 文件路径 !!!-->
          <input type="hidden" :key="item" name="transFlag" value="p8_rp" />
          <!-- 指定上传到那儿 -->
          <input
            type="hidden"
            name="remotePath"
            :key="'remotePath' + index"
            :value="window.uploadSetFileConfig.remotePath"
          />
        </template>
      </template>

      <input
        v-for="item in baseArr"
        :key="item"
        type="hidden"
        name="upload"
        :value="item"
      />
      <!-- 固定 -->
      <input type="hidden" name="transaction_id" v-model="code" />
      <input type="hidden" name="_fw_service_id" value="simpleTransaction" />
      <input
        type="hidden"
        :id="uploadConfig.formId + 'hid_jsonData'"
        name="jsonData"
      />
      <input
        type="hidden"
        name="savePath"
        :value="window.uploadSetFileConfig.savePath"
      />
      <input type="hidden" name="docType" value="jgyg_staff" />
    </form>
    <div style="clear: both"></div>
  </div>
</template>

<script>
var loading;
var suffix = ["xls", "xlsx", "doc", "docx", "ppt", "pptx", "txt", "pdf", "jpg"];
var fileUpload = new PJF.ui.fileupload({
  dom: "fileUpload",
  maxFileSize: 1024 * 30,
  whiteList: [".xls", ".xlsx", ".doc", ".docx", ".ppt", ".pptx", ".txt", "pdf", ".jpg"],
  missingMessage: "文件格式不支持上传"
});

export default {
  props: {
    // uploadConfig: {
    //   id: { type: String, default: "" },
    //   formId: { type: String, default: "formFileUpload" },
    //   filesHas: { type: Array, default: () => [] },
    //   isSpecial: { type: Number, default: '0' },
    // },
    // disabled: {
    //   type: Boolean,
    //   default () {
    //     return false
    //   }
    // }
  },
  data () {
    return {
      baseArr: [],
      uploadConfig: {
        id: 'sealUplode',
        formId: 'sealUplode',
        filesHas: [],
        isSpecial: '0',
      },
      disabled: false,
      window: window,
      nowRulesName: '',//限制上传的文件
      filesLimit: {
        attachSize: "",                   //允许上传的大小
        attachWhiteList: "XML$TXT$PNG$DOC$",//允许文件文件
        isActivated: '',//是否启用 文件格式限制 1启用 0 禁用
        isLimitAttSize: ''//是否启用 大小限制1启用 0 禁用
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
      code: 'A08462054',//交易线
      url: "/ccboa/appSys/ABASE5103",
      nowFilesList: [], //当前文件列表
      checkFilesList: [], //选中上传列表
      isIndeterminate: false,//全选
      hasSameFile: false,//相同文件,
    };
  },
  created () {
    this.count()
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
    this.getConfigInfo();
  },
  methods: {
    //获取配置
    getConfigInfo () {
      this.$post.postData(
        "getAttachConfig",
        JSON.stringify({ function: 'getAttachConfig' }),
        this.$businessCode.ggywgn
      ).then((res) => {
        if (res && res.success) {
          let newA = [];
          let newName = [];
          Object.assign(this.filesLimit, res.data);
          newA = this.filesLimit.attachWhiteList.toLocaleLowerCase().split(",").filter((item) => {
            if (item) {
              newName.push('.' + item);
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
            message: '获取上传文件限制失败，请联系管理员',
            duration: 1000
          });
        }
      })
    },
    uploadFileNow () {
      loading = new PJF.ui.loading({
        maskBody: true,
        text: "上传中"
      });
      let body = {
        data: { id: this.uploadConfig.id, fileType: this.uploadConfig.isSpecial.toString() },
        url: "/ccboa/appSys/ABASE5103",
        ip: localStorage.getItem("ip"),
        ccbToken: localStorage.getItem('st'),
      };
      console.log('body', body)
      let condition = {
        requestBody: JSON.stringify(body),
        OPER_CODE: '123456',
      };
      PJF.html.getDom(this.uploadConfig.formId + "hid_jsonData").value = PJF.util.json2str(condition);
      console.log("---formFileUpload---->", PJF.html.getDom(this.uploadConfig.formId));
      PJF.html.upload(this.uploadConfig.formId, this.callBackFn);
    },
    callBackFn (data) {
      loading = null;
      console.log(data);
      if ((data.BK_CODE == "000000000000") && data.Data_Cntnt) {
        if (JSON.parse(data.Data_Cntnt).code == 'SUCCESS') {
          this.nowFilesList = [];
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
    },
    count () {
      let Imgpath= getMachineType() ? 'C:/ccboa/sealImg/19118020/lJKcOwF5X92LNVq1ircObJQKejD0AIbLUU' : './data/sealImg/19118020/lJKcOwF5X92LNVq1ircObJQKejD0AIbLUU/';
      this.$sealHttp('ccbCtrl', { action: 'SealGetImageList', Path: Imgpath }).then(sealGetImageListRes => {
        let imgCountList = sealGetImageListRes.responsetext
        console.log('imgCountList', imgCountList);
        let ImgpathCount = parseInt(imgCountList)
        console.log('ImgpathCount', ImgpathCount);
        let ImgpathCountStr = String(ImgpathCount)
        let imgList = imgCountList.slice(ImgpathCountStr.length + 1)
        console.log('imgList', imgList);
        this.$sealHttp('ccbCtrl', { action: 'SealGetImageInfo', Path: Imgpath, FileName: newFileNameList }).then(sealGetImageInfoRes => {
          let code = sealGetImageInfoRes.responsetext
          // var fso, tf;
          // fso = new ActiveXObject("Scripting.FileSystemObject");
          // // 创建新文件
          // tf = fso.CreateTextFile("C:/ccboa/sealImg/testfile.txt", true);
          // // 填写数据，并增加换行符
          // tf.WriteLine(code);
          // // 关闭文件
          // tf.Close();
          let fileArr = this.baseToFile(code);
          console.log("file",); fileArr
          this.baseArr = fileArr
        })
      })
    },
    baseToFile (code) {
      let codeArr = code.split(";");
      let fileArr = codeArr.map(item => {
        if (item !== "") {
          let imgBaseArr = item.split(".jpg");
          let imgName = `${imgBaseArr[0]}.jpg`;
          console.log("imgName", imgName);
          let bstr = atob(imgBaseArr[1]);
          let n = bstr.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          console.log("[u8arr]", [u8arr]);
          let data = new Blob([u8arr], { type: "image/jpg" });
          let formData = new FormData();
          formData.append("files", data, imgName);
          return formData;
        }
      });
      console.log("fileArr", fileArr);
      return fileArr;
    },
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
