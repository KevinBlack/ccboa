<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>模板配置</span>
      </div>
      <div class="right">
        <el-button
          v-if="isShowUploadFile"
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="save_btn"
        >保存</el-button>
        <el-button
          v-else
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="edit_btn"
        >编辑</el-button>
        <el-button
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="close_btn"
        >关闭</el-button>
      </div>
    </div>

    <div class="addHeader">
      <div class="title-text">模板配置</div>
    </div>

    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="机构名称" prop="draftOrgan">
          <el-input class="left" v-model="formData.draftOrgan" :disabled="true" style="width:640px"></el-input>
          <el-button class="right" @click="selectOrg" type="primary" size="medium">选择机构</el-button>
        </el-form-item>
        <h6 class="bank_dispach_file_tit">附件引入</h6>
        <div id="scfj" class="height_90"></div>
        <el-form-item prop="attchmentFileInfo">
          <el-col :span="23">
            <upload-file-ts
              v-if="isShowUploadFile"
              :uploadConfig="uploadConfig"
              @fileList="fileList"
            ></upload-file-ts>
            <div class="tree_w" v-if="formData.attchmentFileInfo.length > 0">
              <el-scrollbar>
                <div
                  v-for="(item,index) in  formData.attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span
                        class="name down"
                        @click="viewFile(item,null,formData.documentNo+item.title)"
                      >{{item.fileName}}</span>
                      <span class="name">{{item.createrName}}</span>
                      <span class="name">{{item.createTime}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="upRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==0"
                          round
                        >上移</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==formData.attchmentFileInfo.length-1"
                          round
                        >下移</el-button>
                        <el-button
                          type="warning"
                          size="mini"
                          @click.native="deleteRow(index,item.id)"
                          :disabled="item.disabled"
                          round
                        >删除</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downFile(item)"
                          round
                        >下载</el-button>
                      </div>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <!-- @description: 选择机构树  -->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="true"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script>
import uploadFileTs from "components/uploadFile/uploadFileTs";
import orgTree from "components/tree/orgTree";
import exportTable from "@/minixs/exportTable.js";
import shiwuLineWord from "@/minixs/shiwuLineWord";

export default {
  name: "add",
  components: { uploadFileTs, orgTree },
  mixins: [exportTable, shiwuLineWord],

  created() {
    this.tabsType = this.$route.query.tabsType; /** @description: 新增 */
    /** @description: 如果是点击主列表当前行跳转过来的 */
    this.btnType = this.tabsType;
    const currentRowData = this.dataFromQuery("rowData") || {};
    this.formData.attchmentFileInfo =
      (currentRowData.attchmentFileInfo &&
        currentRowData.attchmentFileInfo &&
        JSON.parse(currentRowData.attchmentFileInfo)) ||
      [];
    this.formData.draftOrgan = currentRowData.draftOrgan;
    this.formData.draftOrganId = currentRowData.draftOrganId;
    this.formData.id = currentRowData.id;
  },
  computed: {
    /** @description: 是否显示 附件引入 组件 */
    isShowUploadFile() {
      return ["add", "save"].includes(this.btnType);
    }
  },
  data() {
    return {
      uploadConfig: {
        formId: "model",
        filesHas: [],
        isSpecial: 0
      },
      formData: {
        draftOrgan: ""
      },
      btnType: "",
      /** @description:  */
      title: "选择机构",
      showOrgTree: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      rules: {
        draftOrgan: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    /** @description: 选择机构确定按钮方法 */
    getOrgList(org) {
      this.$set(this.formData, "draftOrgan", org.unitName);
      this.$set(this.formData, "draftOrganId", org.id);
    },
    /** @description: 选择机构按钮 */
    selectOrg() {
      if (this.btnType === "edit") {
        /** @description: 是保存按钮 */
        return;
      } else {
        this.showOrgTree = true; /** @description: 机构弹窗打开 */
      }
    },
    /** @description: 保存按钮 */
    save_btn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          /** @description: 表单校验通过 */
          if (this.tabsType === "add") {
            /** @description: 新增保存 */
            this.$api.duty.saveModelAddData(this.formData).then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.btnType = "edit";
              this.$intent.closeWindow(this);
            });
          } else {
            /** @description: 修改保存 */
            this.$api.duty.saveModelEditData(this.formData).then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.btnType = "edit";
              this.$intent.closeWindow(this);
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请填写表单"
          });
        }
      });
    },
    /** @description: 编辑按钮 */
    edit_btn() {
      this.btnType = "save";
    },
    /** @description: 关闭按钮 */
    close_btn() {
      if (this.isShowUploadFile == true) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save_btn();
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
      // this.$confirm('关闭前是否保存?', '提示', {
      //   confirmButtonText: '是',
      //   cancelButtonText: '否',
      //   type: 'warning',
      // })
      //   .then(() => {
      //     this.save_btn() /** @description: 调用保存方法 */
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //     /** @description: this.$message({ */
      //     /** @description: type: 'info', */
      //     /** @description: message: '已取消关闭', */
      //     /** @description: }) */
      //   })
    },
    fileList(files) {
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
      }
      let fileid = [];
      files.forEach(item => {
        fileid.push(item.id);
      });
      this.formData.attachId = fileid.join(",");
      this.$forceUpdate();
    },
    /** @description: 附件上传下载排序 */
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n - 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n - 1
      ];
      this.formData.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    /** @description: 下移 */
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n + 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n + 1
      ];
      this.formData.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    /** @description: 删除 */
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.duty.deleteFileById({ids: this.formData.id}).then(res=>{
            if (res) {
              console.log('删除res',res)
              if (res && res.msg) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.$intent.closeWindow(this);
                // this.formData.attchmentFileInfo.splice(n, 1);
                // this.$forceUpdate();
                // this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
        })
      });
    },
    /** @description: 下载 */
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
                (this.$post.getEnvState() ? location.origin : "") +
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
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.add {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    justify-content: space-between;
    color: white;
    height: 60px;
    line-height: 60px;

    .left {
      margin-left: 20px;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .addHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .elementForm {
    width: 80%;
    margin: 0 auto;
    margin-top: 36px;
  }
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
}
</style>