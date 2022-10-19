 <!--<template>
  <div >
    <div class="headerClick">
        <el-button type="primary" plain size="mini"    class="bank_grid_comtent_active" @click="close_btn">关闭</el-button>
        <el-button type="primary" plain size="mini"    class="bank_grid_comtent_active"  @click="save_btn" >保存</el-button>
    </div>
    <div style="background: white;margin: 0 auto;height: 100vh;">
      <div class="shiwuTitle">新增会议单模板</div>
    <div>
      <el-form ref="elForm" :rules="rules" :model="form" label-width="100px" class="abolished-mainform">
          <el-row>
              <el-col :span="12" >
                  <el-form-item label="模板类型" >
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="模板名称">
                      <el-input v-model="attachTitle"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="模板">
                    <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
              <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-form-item>
                  <el-col :span="20">
                    <div class="tree_w" v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                      <el-scrollbar>
                        <div v-for="(item,index) in  formData.attchmentFileInfo" :key="item.id" class="comp_list">
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
                                <el-button type="primary" size="mini" @click.native="upRow(index)"
                                  v-if="formData.attchmentFileInfo.length>1" :disabled="index==0" round>上移
                                </el-button>
                                <el-button type="primary" size="mini" @click.native="downRow(index)"
                                  v-if="formData.attchmentFileInfo.length>1"
                                  :disabled="index==formData.attchmentFileInfo.length-1" round>下移
                                </el-button>
                                <el-button type="warning" size="mini" @click.native="deleteRow(index,item.id)"
                                  :disabled="item.disabled" round>删除
                                </el-button>
                                <el-button type="primary" size="mini" @click.native="downFile(item)" round>下载
                                </el-button>
                              </div>
                            </div>
                          </template>
                        </div>
                      </el-scrollbar>
                    </div>
                  </el-col>
                </el-form-item>
              </el-row>
                  </el-form-item>
              </el-col>
          </el-row>
        </el-form>
  </div>
    </div>
  </div>
</template> -->
<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <!-- <span>模板配置</span> -->
      </div>
      <div class="right">
        <el-button
          v-if="!isSave"
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="save_btn"
        >保存</el-button>
        <!-- <el-button
          v-else
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="edit_btn"
        >编辑</el-button>-->
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
      <div class="title-text">新增会议单模板</div>
    </div>
    <div class="elementForm">
      <el-form ref="elForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="模板类型" prop="value">
          <el-select v-model="formData.value" placeholder="请选择" :disabled="isOnly">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="attachTitle">
          <el-col :span="24">
            <el-input v-model="formData.attachTitle" :disabled="isOnly"></el-input>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上会依据">
              <upload-file-ts
                v-if="isShowUploadFile"
                :uploadConfig="uploadConfig"
                @fileList="fileList"
              ></upload-file-ts>
              <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-form-item>
                  <el-col :span="24">
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfo"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
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
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "addConfigurAtion",
  components: {
    uploadFileTs
  },
  data() {
    return {
      attTitleList: [], //附件名称所有字段
      attTitleID: [],
      attTitlePath: [],
      id: "",
      uploadConfig: {
        formId: "huiyi",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      isOnly: false,
      isShowUploadFile: Boolean,
      isSave: false,
      // isOnly: true,
      formData: {
        value: "TZ_MODEL",
        id: "",
        attchmentFileInfo: [] //浏览的所有文件数组
      },
      input: "",
      rules: {
        value: [{ required: true, message: "请选择模板类型", trigger: "blur" }],
        attachTitle: [
          { required: true, message: "请填写模板名称", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "TZ_MODEL",
          label: "会议单模板"
        },
        {
          value: "YT_MODEL",
          label: "议题模板"
        },
        {
          value: "LEAVING_MODEL",
          label: "请假单模板"
        },
        {
          value: "COMMUNCATION_MODEL",
          label: "联系单模板"
        }
      ]
    };
  },
  computed: {},
  methods: {
    save_btn() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          if (!this.id) {
            this.$api.secreatary.meetings
              .addTemplateList({
                type: this.formData.value,
                attachTitle: this.formData.attachTitle,
                attach: this.formData.attach
              })
              .then(res => {
                this.id = res.data.id;
                this.createFile();
                this.$message({ type: "success", message: "保存成功" });
                this.$intent.closeWindow(this);
              });
          } else {
            this.$api.secreatary.meetings
              .addTemplateList({
                type: this.formData.value,
                attachTitle: this.formData.attachTitle,
                attach: this.formData.attach,
                id: this.id
              })
              .then(res => {
                this.$message({ type: "success", message: "保存成功！" });
              });
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    // 关闭
    close_btn() {
      // this.$confirm("是否退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      this.$intent.closeWindow(this);
      // });
    },
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formData.attachid,
          fileType: "0"
        })
        .then(res => {});
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
        this.$nextTick(() => {
          this.$set(this.formData, "attchmentFileInfo", res.data);
          this.$set(this.uploadConfig, "filesHas", res.data);
        });
        console.log(this.uploadConfig.filesHas);
      });
    },
    //模板块
    fileList(files) {
      //files浏览本地文件时候能获取到文件名称
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
      }
      files.forEach(item => {
        this.attTitleList.push(item.fileName);
        this.attTitleID.push(item.id);
        this.attTitlePath.push(item.filePath);
      });
      this.formData.attTitle = this.attTitleList.join(",");
      this.formData.attachid = this.attTitleID.join(",");
      this.formData.attach = this.attTitlePath.join(",");
      this.$forceUpdate();
      console.log(
        "attTitle-----------",
        this.formData.attTitle,
        "attachid--------",
        this.formData.attach,
        this.formData.attachid
      );
    },
    // 附件上传下载排序
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
                this.formData.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
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
    }
  },
  activated() {},
  created() {
    let type = this.$route.query.type;
    switch (Number(type)) {
      case 0:
        break;
      case 1:
        sessionStorage.setItem("id", JSON.parse(this.$route.query.detail).id);
        this.id = sessionStorage.getItem("id");
        this.getFileList();
        this.formData.attachTitle = JSON.parse(
          this.$route.query.detail
        ).attachTitle;
        this.formData.value = this.$route.query.value;
        console.log(this.$route.query.value);
        this.isShowUploadFile = true;
        this.isOnly = true;
        this.isSave = true; /*隐藏保存按钮 */
        console.log("111111111", JSON.parse(this.$route.query.rowData));
        break;
    }
  },
  mounted() {}
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

