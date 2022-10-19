<template>
  <div class="content">
    <div class="btn_list">
      <el-button type="primary" @click="savedata" v-if="!isSave">保存</el-button>
      <el-button type="primary" @click="handleEdit" v-if="isSave">编辑</el-button>
      <el-button type="primary" @click="handleClose">关闭</el-button>
      <!--      <el-button type="primary" @click="handleDeleteFiles" :disabled="isSave">删除附件</el-button>-->
    </div>
    <p class="use_object_title">弹出窗口信息设置</p>
    <div class="formdata">
      <!--<fd-form style="margin:0 1%" :isInline="false" :formData="formData" :formCfg="formCfg" @event="btnevent"></fd-form>-->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="是否启用" prop="isRun">
          <el-radio-group v-model="ruleForm.isRun" :disabled="isSave">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="弹出范围" prop="draftRange">
          <el-radio-group v-model="ruleForm.draftRange" :disabled="isSave">
            <el-radio label="全行" :disabled="ruleForm.setDraftRange === '当前机构'">全行</el-radio>
            <el-radio label="当前机构">当前机构</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="窗口设置" required>
          <el-col :span="6">
            <el-form-item prop="height" label="高" label-width="50px">
              <el-input type="text" v-model.number="ruleForm.height" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="width" label="宽" label-width="50px">
              <el-input type="text" v-model.number="ruleForm.width" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="lefts" label="距屏左" label-width="80px">
              <el-input type="text" v-model.number="ruleForm.lefts" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="tops" label="距屏上" label-width="80px">
              <el-input type="text" v-model.number="ruleForm.tops" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="ruleForm.title" :disabled="isSave"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="message">
          <el-input type="textarea" v-model="ruleForm.message" :disabled="isSave"></el-input>
        </el-form-item>
        <el-form-item label="仅打开附件" prop="attachLabel">
          <el-radio-group v-model="ruleForm.attachLabel" :disabled="isSave">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="附件" prop="files">
          <upload-file :uploadConfig="uploadConfig" @fileList="fileList" :disabled="isSave"></upload-file>
          <div class="tree_w" v-if="ruleForm.attchmentFileInfo&&ruleForm.attchmentFileInfo.length">
            <el-scrollbar>
              <div
                v-for="(item,index) in  ruleForm.attchmentFileInfo"
                :key="index"
                class="comp_list"
              >
                <template>
                  <div class="command_file">
                    <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                    <span class="name">{{item.createrName}}</span>
                    <span class="name">{{item.createTime}}</span>
                    <div class="btns">
                      <el-button
                        type="warning"
                        size="mini"
                        @click.stop="deleteRow(index,item.id)"
                        :disabled="isSave"
                        round
                      >删除</el-button>
                      <el-button type="primary" size="mini" @click.stop="downFile(item)" round>下载</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import FdForm from '@/components/form/mForm'
import openOrDownLoadFile from "../../../../minixs/openOrDownLoadFile";
import uploadFile from "@/components/uploadFile/uploadFileTs";
export default {
  name: "alterWin",
  components: {
    uploadFile
  },
  mixins: [openOrDownLoadFile],
  data() {
    var checkNum = (rule, value, callback) => {
      const teg = /^[0-9]*$/;
      if (!value && value !== 0) {
        return callback(new Error("不能为空"));
      }
      if (!teg.test(value)) {
        callback(new Error("请输入数字值"));
      } else if (value > 100) {
        callback(new Error("不能超过100"));
      } else {
        callback();
      }
    };
    return {
      isSave: true,
      id: "",
      ruleForm: {
        isRun: "",
        draftRange: "",
        height: "",
        width: "",
        tops: "",
        lefts: "",
        message: "",
        attachLabel: "",
        attachName: "",
        attachUuid: "",
        setDraftRange: ""
      },
      rules: {
        isRun: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ],
        draftRange: [
          { required: true, message: "请选择弹出范围", trigger: "change" }
        ],
        height: [
          { required: true, message: "请填写高度", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        width: [
          { required: true, message: "请填写宽度", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        tops: [
          { required: true, message: "请填写距屏上位置", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        lefts: [
          { required: true, message: "请填写距屏左位置", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        message: [{ required: true, message: "请填写内容", trigger: "blur" }],
        attachLabel: [
          { required: true, message: "是否仅打开附件", trigger: "change" }
        ]
      },
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      formData: {},
      formCfg: [],
      serverconfig: {
        labelWidth: "140px"
      }
    };
  },
  created() {
    this.btnevent();
    this.loadData();
  },
  methods: {
    // 删除
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.setSysConfig
          .deleFile({
            id: id
          })
          .then(res => {
            if (res && res.code === "SUCCESS") {
              this.$message({
                type: "success",
                showClose: true,
                message: "删除成功"
              });
              this.ruleForm.attchmentFileInfo.splice(n, 1);
              this.$forceUpdate();
              this.uploadConfig.filesHas = this.ruleForm.attchmentFileInfo;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                message: "删除失败"
              });
            }
          });
      });
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    },
    //附件块
    fileList(files) {
      if (
        this.ruleForm.attchmentFileInfo &&
        this.ruleForm.attchmentFileInfo.length
      ) {
        this.ruleForm.attchmentFileInfo.push(...files);
      } else {
        this.ruleForm.attchmentFileInfo = files;
      }
      if (!this.ruleForm.attachs) {
        this.ruleForm.attachs = [];
      }
      files.forEach(item => {
        this.ruleForm.attachs.push(item.id);
      });
      this.uploadConfig.filesHas = files;
      this.ruleForm.attachId = this.ruleForm.attachs.join(",");
      console.log("123", this.ruleForm.attachId);
      this.$forceUpdate();
    },
    loadData() {
      const that = this;
      this.$api.adminConfig.alterWinSer({}).then(res => {
        // console.log(res, '打印窗口弹出信息')
        if (res.data && res.data.length) {
          that.ruleForm = Object.assign({}, res.data[0]);
          that.id = res.data[0].id;
          console.log("id", that.id);
          that.getFileList(res.data[0].id);
        }
      });
    },
    handleClose() {
      // this.$router.push("/dashboard/personalOffice/admin");
      if (!this.isSave) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.savedata();
              // this.$intent.closeWindow(this);
              
            } else if (action === "cancel") {
              //点否
              // this.$intent.closeWindow(this);
              this.$router.push("/dashboard/personalOffice/admin")
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        // this.$intent.closeWindow(this);
        this.$router.push("/dashboard/personalOffice/admin")
      }
    },
    handleDeleteFiles() {
      this.ruleForm.files = {};
    },
    savedata() {
      const that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let allW =
            parseFloat(that.ruleForm.width) + parseFloat(that.ruleForm.lefts);
          let allH =
            parseFloat(that.ruleForm.height) + parseFloat(that.ruleForm.tops);
          if (allW > 100) {
            return that.$message.error("弹框宽度和距屏左距离不能超过100");
          }
          if (allH > 100) {
            return that.$message.error("弹框高度和距屏上的距离不能超过100");
          }
          if (
            that.ruleForm.attachLabel == 1 &&
            (!that.ruleForm.attchmentFileInfo ||
              !that.ruleForm.attchmentFileInfo.length)
          ) {
            return that.$message.error("请上传附件");
          }
          console.log("-------this.formData------->", this.ruleForm);
          that.$api.adminConfig.alterWin(that.ruleForm).then(res => {
            if (res.code == "SUCCESS") {
              this.$router.push("/dashboard/personalOffice/admin")
              that.isSave = true;
              that.$message({
                message: "保存成功",
                type: "success"
              });
              that.id = res.id;
              console.log("保存后id", that.id);
              that.$nextTick(() => {
                that.createFile();
              });
            } else {
              that.$message({
                message: "保存失败",
                type: "error"
              });
            }
          });
        }
      });
      // this.formData['isRun'] = this.formData.isRun[0]
      // this.formData['attachLabel'] = this.formData.attachLabel[0]
    },
    // 起草保存文件
    createFile() {
      const that = this;
      console.log("保存附件时id", this.id);
      console.log(that.ruleForm.attachId);
      this.$api.setSysConfig
        .saveFile({
          id: that.id,
          fileId: that.ruleForm.attachId,
          fileType: "0"
        })
        .then(res => {});
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
        this.ruleForm.attchmentFileInfo = res.data;
        this.$forceUpdate();
        this.uploadConfig.filesHas = this.ruleForm.attchmentFileInfo;
      });
    },
    // 表单配置
    btnevent() {
      this.formCfg = [
        {
          type: "radio",
          label: "是否启用",
          prop: "isRun",
          radios: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ],
          disabled: this.isSave
        },
        {
          type: "radio",
          label: "弹出范围",
          prop: "setDraftRange",
          radios: [
            { label: "当前机构", value: "1" },
            { label: "全行", value: "0" }
          ],
          disabled: this.isSave
        },
        {
          label: "窗口设置"
        },

        {
          type: "input",
          label: "标题",
          prop: "title",
          span: 20,
          disabled: this.isSave
        },
        {
          type: "textarea",
          label: "内容",
          prop: "message",
          span: 20,
          config: { rows: 4 },
          disabled: this.isSave
        },
        {
          type: "radio",
          label: "仅打开附件",
          prop: "attachLabel",
          radios: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ],
          disabled: this.isSave
        },
        [
          {
            type: "upload",
            prop: "attachName",
            disabled: true,
            config: {
              action: "",
              tip: "",
              fileSizeRange: 1000
              // fileTypes: ['txt', 'md'],
            }
          },
          { type: "formitem", label: "附件" }
        ]
      ];
    },
    // 编辑按钮
    handleEdit() {
      this.isSave = false;
      this.btnevent();
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;

  .formdata {
    margin-top: 24px;
  }
}
//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;

    .one_btn {
      width: 80px;
      height: 42px;
      line-height: 42px;
    }

    .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
    }

    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.use_object_title {
  width: 100%;
  text-align: center;
  color: #458cf1;
  font-size: 28px;
}

.btn_list {
  width: 100%;
  margin-bottom: 20px;
}
</style>
