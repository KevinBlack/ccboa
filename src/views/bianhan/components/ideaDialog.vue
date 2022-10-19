/**
* create by zx on 2020/9/27 10:59
* 类注释：
* 备注：
*/
<template>
  <div class="ideaDialog">
    <el-dialog :title="title" v-if="dialogVisible" :visible.sync="dialogVisible">
      <el-input v-model="idea" type="textarea" :rows="4" :placeholder="placeholder"></el-input>
      <upload-file-ts :uploadConfig="uploadConfig" v-if="showFile" @fileList="fileList"></upload-file-ts>
      <div class="tree_w" v-if="formdata.attchmentFileInfo&&formdata.attchmentFileInfo.length">
        <el-scrollbar>
          <div v-for="(item,index) in  formdata.attchmentFileInfo" :key="item.id" class="comp_list">
            <template>
              <div class="command_file">
                <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                <span class="name">{{item.createrName}}</span>
                <span class="name">{{item.createTime}}</span>
                <div class="btns">
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="upRow(index)"
                    v-if="formdata.attchmentFileInfo.length>1"
                    :disabled="index==0"
                    round
                  >上移</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="downRow(index)"
                    v-if="formdata.attchmentFileInfo.length>1"
                    :disabled="index==formdata.attchmentFileInfo.length-1"
                    round
                  >下移</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    @click.native="deleteRow(index,item.id)"
                    :disabled="item.disabled"
                    round
                  >删除</el-button>
                  <el-button type="primary" size="mini" @click.native="downFile(item)" round>下载</el-button>
                </div>
              </div>
            </template>
          </div>
        </el-scrollbar>
      </div>
      <el-row :span="6" style="margin-top: 20px;text-align: right">
        <el-button type="primary" @click="toSure">{{btn_sure}}</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";

export default {
  name: "ideaDialog",
  components: {
    uploadFileTs
  },
  props: {
    title: { type: String, default: "标题" },
    placeholder: { type: String, default: "请输入内容" },
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showFile: {
      type: Boolean,
      default() {
        return true;
      }
    },
    id: {
      type: String,
      default: ""
    },
    btn_sure: {
      type: String,
      default: "确定"
    },
    oldIdea: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      formdata: {
        attachs: [],
        attachid: []
      },
      idea: this.oldIdea,
      dialogVisible: false,
      uploadConfig: {
        id: this.id,
        formId: "bianhan",
        filesHas: [],
        isSpecial: '10010' //随意定义的，为了与定义0时的表单附件上传区分
      }
    };
  },
  watch: {
    dialogVisible(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.dialogVisible = val;
    }
  },
  methods: {
     getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
        this.formdata.attchmentFileInfo = res.data;
        this.$forceUpdate();
        this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
      });
    },
    fileList(files) {
      if (
        this.formdata.attchmentFileInfo &&
        this.formdata.attchmentFileInfo.length
      ) {
        this.formdata.attchmentFileInfo.push(...files);
      } else {
        this.formdata.attchmentFileInfo = files;
      }
      try {
        console.log(this.formdata);
        this.formdata.attachs = [];
        this.formdata.attachid = [];
        files.forEach(item => {
          this.formdata.attachs.push(item.id);
        });
        this.formdata.attach = this.formdata.attachs.join(",");
        this.formdata.attachid = this.formdata.attachs.join(",");
      } catch (e) {
        console.log(e);
      }
      this.$forceUpdate();
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formdata.attchmentFileInfo[n - 1].id,
          sort: this.formdata.attchmentFileInfo[n].sort
        },
        {
          id: this.formdata.attchmentFileInfo[n].id,
          sort: this.formdata.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.formdata.attchmentFileInfo[n];
      this.formdata.attchmentFileInfo[n] = this.formdata.attchmentFileInfo[
        n - 1
      ];
      this.formdata.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formdata.attchmentFileInfo[n + 1].id,
          sort: this.formdata.attchmentFileInfo[n].sort
        },
        {
          id: this.formdata.attchmentFileInfo[n].id,
          sort: this.formdata.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.formdata.attchmentFileInfo[n];
      this.formdata.attchmentFileInfo[n] = this.formdata.attchmentFileInfo[
        n + 1
      ];
      this.formdata.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify({ id: id, function: "deleteFileById" }),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.formdata.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
          });
      });
    },
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
    toSure() {
      //保存文件
    //   try {
    //     if (this.formdata.attachid.length > 0) {
    //       this.$api.setSysConfig
    //         .saveFile({
    //           id: this.id,
    //           fileId: this.formdata.attachid,
    //           fileType: "10010"
    //         })
    //         .then(res => {});
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
      this.dialogVisible = false;
      this.$emit("ideaIsOk", this.idea);
    }
  },
  activated() {},
  mounted() {
     //this.getFileList();
  },
  created() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
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
</style>
