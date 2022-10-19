<template>
  <div class="content">
    <p class="use_object_title">专栏</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata" v-if="!isSave">保存</el-button>
      <el-button type="primary" @click="senddata" v-if="!isSave">发布</el-button>
      <el-button type="primary" @click="resenddata" v-if="!isSave">发布并新建</el-button>
      <el-button type="primary" @click="editordata" v-if="isSave && isShow">编辑</el-button>
    </div>
    <div class="formData">
      <fd-form
        ref="fdForm"
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
        @event="btnevent"
      ></fd-form>
    </div>
    <!--        附件-->
    <!-- <div v-if="formData.fileName">
      <div style="margin-left:110px">附件</div>
      <el-col
        :span="18"
        style="margin-left:100px;padding-bottom: 20px;padding-left: 50px;padding-right: 10px;"
      >
        <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList" v-if="!isSave"></upload-file-ts>
        <div class="tree_w">
          <el-scrollbar>
            <div class="comp_list">
              <template>
                <div class="command_file">
                  <span class="namespan">1.</span>
                  <span class="name" @click="viewFile(formData)">{{formData.fileName}}</span>
                  <span class="name">{{formData.createrName}}</span>
                  <span class="name">{{formData.createTime}}</span>
                  <div class="btns">
                    <el-button
                      type="primary"
                      size="mini"
                      @click.native="downFile(formData)"
                      round
                    >下载</el-button>
                  </div>
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
    </div>-->
    <el-row>
      <!-- <div style="margin-left:110px">附件</div> -->
      <el-col :span="20">
        <el-form>
          <el-form-item label-width="140px" label="附件">
            <upload-file-ts
              :uploadConfig="uploadConfig"
              @fileList="fileList"
              v-show=" !id || !isSave"
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
                            <span class="namespan">{{index+1}}.</span>
                            <span
                              class="name down"
                              @click="viewFile(item,null,item.title)"
                            >{{item.fileName}}</span>
                            <span class="name1">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <!-- <el-button
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
                              >下移</el-button>-->
                              <el-button
                                v-if=" isShow"
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
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import minixs from "@/minixs/index";
import openOrDownLoadFile from "../../../../minixs/shiwuLineWord";
export default {
  name: "createColumn",
  components: {
    FdForm,
    uploadFileTs
  },
  mixins: [minixs, openOrDownLoadFile],
  data() {
    return {
      uploadConfig: {
        formId: "shiwuForm",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      id: "",
      isShow: true,
      fileData: {},
      isSave: true,
      formData: {},
      fileData: {
        attchmentFileInfo: []
      },
      formCfg: [],
      serverconfig: {
        labelWidth: "140px"
      },
      ifView: Number, //打开正文时的状态值
      isHomeEnter: false
    };
  },
  methods: {
    initData() {
      this.$api.adminConfig.createColumn({}).then(res => {
        let bankOptions = [];
        let b = 0;
        res.data.map(function(value, index) {
          bankOptions.push(value.zlSslm);
        });
        console.log("********init方法的isHomeEnter", this.isHomeEnter);
        if (this.isHomeEnter) {
          this.formCfg = [
            {
              type: "select",
              prop: "zlSslm",
              span: 20,
              label: "所属专栏",
              options: bankOptions.join(","),
              disabled: this.isSave,
              style: { width: "100%" }
            },
            {
              type: "input",
              label: "文号",
              prop: "zlWh",
              span: 20,
              disabled: this.isSave,
              value: "〔〕"
            },
            {
              type: "input",
              label: "专栏标题",
              prop: "zlTitle",
              span: 20,
              disabled: this.isSave
            },
            {
              type: "button-primary",
              prop: "$selectOrg",
              span: 2,
              value: "查看",
              style: { marginLeft: "-56px" }
            },
            {
              type: "input-area",
              label: "内容",
              prop: "zlContent",
              span: 20,
              config: { rows: 5 },
              disabled: this.isSave
            }
          ];
        } else {
          this.formCfg = [
            {
              type: "select",
              prop: "zlSslm",
              span: 20,
              label: "所属专栏",
              options: bankOptions.join(","),
              disabled: this.isSave,
              style: { width: "100%" }
            },
            {
              type: "input",
              label: "文号",
              prop: "zlWh",
              span: 20,
              disabled: this.isSave,
              value: "〔〕"
            },
            {
              type: "input",
              label: "专栏标题",
              prop: "zlTitle",
              span: 20,
              disabled: this.isSave
            },
            {
              type: "input-area",
              label: "内容",
              prop: "zlContent",
              span: 20,
              config: { rows: 5 },
              disabled: this.isSave
            }
          ];
        }
      });
    },
    closedata() {
      // this.$router.go(-1);
      //this.$router.push(
      //    {
      //        path: '/dashboard/personalOffice/admin/coluIndex',
      //        query: { activeName: 'coluFir'}
      //    }
      //)
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
              // this.$router.go(-1)
            } else if (action === "cancel") {
              //点否
              // this.$intent.closeWindow(this);
              this.$router.go(-1)
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$router.go(-1)
      }
    },
    savedata() {
      if (this.id) {
        this.formData.id = this.id;
        this.$api.adminConfig.altercolumn(this.formData).then(res => {
          if (res.code == "SUCCESS") {
            this.$router.go(-1)
            this.$message({
              message: "修改成功",
              type: "success"
            });
            //  this.$router.push('/dashboard/personalOffice/admin/coluIndex')
          }
        });
      } else {
        if (!this.formData.zlSslm) {
          this.$message({
            message: "请选择所属专栏",
            type: "success"
          });
          return;
        } else {
          this.$api.adminConfig.createColumn(this.formData).then(res => {
            if (res.code == "SUCCESS") {
              this.$router.go(-1)
              this.id = res.id;
              // this.createFile();
              this.$message({
                message: res.msg,
                type: "success"
              });
              // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
            }
          });
        }
      }
    },
    senddata() {
      if (!this.formData.zlSslm) {
        this.$message({
          message: "请选择所属专栏",
          type: "success"
        });
        return;
      } else {
        if (this.$refs.fdForm.valid()) {
          this.$confirm("是否确定发布该数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              if (this.id) {
                this.formData.id = this.id;
                this.$api.adminConfig.altercolumn(this.formData).then(res => {
                  if (res.msg == "该文号专栏已存在") {
                    this.$message({
                      message: res.msg,
                      type: "success"
                    });
                  } else {
                    this.$api.adminConfig
                      .columnSend({ id: this.id })
                      .then(res => {
                        if (res.code == "SUCCESS") {
                          this.$message({
                            message: res.msg,
                            type: "success"
                          });
                          // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                          this.$router.push({
                            path: "/dashboard/personalOffice/admin/coluIndex",
                            query: { activeName: "coluFir" }
                          });
                        }
                      });
                  }
                });
              } else {
                this.$api.adminConfig.createColumn(this.formData).then(res => {
                  if (res.msg == "该文号专栏已存在") {
                    this.$message({
                      message: res.msg,
                      type: "success"
                    });
                  } else {
                    this.id = res.id;
                    // this.createFile();
                    this.$api.adminConfig
                      .createColumn({ id: this.id })
                      .then(res => {
                        if (res.code == "SUCCESS") {
                          this.$message({
                            message: res.msg,
                            type: "success"
                          });
                          // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                          this.$router.push({
                            path: "/dashboard/personalOffice/admin/coluIndex",
                            query: { activeName: "coluFir" }
                          });
                        }
                      });
                  }
                });
              }
            })
            .catch(() => {});
        }
      }
    },
    // 发布并新建
    resenddata() {
      if (this.$refs.fdForm.valid()) {
        this.$confirm("是否确定发布该数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.id) {
              this.formData.id = this.id;
              this.$api.adminConfig.altercolumn(this.formData).then(res => {
                if (res.msg == "该文号专栏已存在") {
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  this.$api.adminConfig
                    .columnSend({ id: this.id })
                    .then(res => {
                      if (res.code == "SUCCESS") {
                        this.$message({
                          message: res.msg,
                          type: "success"
                        });
                        // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                        this.formData = {};
                        this.id = "";
                        this.initData();
                        this.isSave = false;
                      }
                    });
                }
              });
            } else {
              this.$api.adminConfig.createColumn(this.formData).then(res => {
                if (res.msg == "该文号专栏已存在") {
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  this.id = res.id;
                  // this.createFile();
                  this.$api.adminConfig
                    .createColumn({ id: this.id })
                    .then(res => {
                      if (res.code == "SUCCESS") {
                        this.$message({
                          message: res.msg,
                          type: "success"
                        });
                        // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                        this.formData = {};
                        this.id = "";
                        this.initData();
                        this.isSave = false;
                      }
                    });
                }
              });
            }
          })
          .catch(() => {});
      }
    },
    editordata() {
      this.isSave = false;
      this.loadData();
    },
    loadData() {
      this.$api.adminConfig.createColumn({}).then(res => {
        let bankOptions = [];
        let b = 0;
        res.data.map(function(value, index) {
          bankOptions.push(value.zlSslm);
        });
        this.getFileList();
        // this.$api.setSysConfig.getTextemList(
        //     {
        //         id: this.id,
        //         // fileType:'1001'
        //     }).then(res => {
        //     this.$nextTick(() => {
        //         this.$set(this.formData, 'attchmentFileInfo', res.data)
        //         this.uploadConfig.filesHas = this.formData.attchmentFileInfo
        //     })
        // })

        if (this.isHomeEnter) {
          this.formCfg = [
            {
              type: "select",
              prop: "zlSslm",
              span: 20,
              label: "所属专栏",
              options: bankOptions.join(","),
              style: { width: "100%" },
              disabled: this.isSave
            },
            {
              type: "input",
              label: "文号",
              prop: "zlWh",
              span: 20,
              disabled: true
            },
            {
              type: "input",
              label: "专栏标题",
              prop: "zlTitle",
              span: 20,
              disabled: this.isSave
            },
            {
              type: "button-primary",
              prop: "$selectOrg",
              span: 2,
              value: "查看",
              style: { marginLeft: "-56px" }
            },
            {
              type: "input-area",
              label: "内容",
              prop: "zlContent",
              span: 20,
              config: { rows: 5 },
              disabled: this.isSave
            }
            // { type: 'span', value: '引入附件文件名（包括压缩包中的文件名）不能包含以下半角符号：空格\/.^:;*?<>|', style: { color: 'red' } },
          ];
        } else {
          this.formCfg = [
            {
              type: "select",
              prop: "zlSslm",
              span: 20,
              label: "所属专栏",
              options: bankOptions.join(","),
              style: { width: "100%" },
              disabled: this.isSave
            },
            {
              type: "input",
              label: "文号",
              prop: "zlWh",
              span: 20,
              disabled: true
            },
            {
              type: "input",
              label: "专栏标题",
              prop: "zlTitle",
              span: 20,
              disabled: this.isSave
            },
            {
              type: "input-area",
              label: "内容",
              prop: "zlContent",
              span: 20,
              config: { rows: 5 },
              disabled: this.isSave
            }
            // { type: 'span', value: '引入附件文件名（包括压缩包中的文件名）不能包含以下半角符号：空格\/.^:;*?<>|', style: { color: 'red' } },
          ];
        }
      });
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selectOrg":
          let bank_doDownloadFile = { function: "doDownloadFile" };
          bank_doDownloadFile.fileName = this.formData.fileName;
          bank_doDownloadFile.filePath = this.formData.filePath;
          this.ifView = 0;
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify(bank_doDownloadFile),
              "A0846C071"
            )
            .then(res => {
              console.log(res, "-------------------res");
              if (res && res.success) {
                res.ifView = 0;
                // this.$set(res.data,"ifView","0")
                console.log(res.data, "+++====++");
                this.shiwudoDraft(res, null, res.fileName);
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500
                });
              }
            });
          // let that = this
          // this.$api.setSysConfig.downloadFile(
          //     {
          //         fileName : this.formData.fileName,
          //         filePath : this.formData.filePath
          //     }).then(res => {
          //     if (res && res.code == 'SUCCESS') {
          //         res.data.ifView=0
          //         that.shiwudoDraft(res.data)
          //     }else {
          //         this.$message({
          //             type: "error",
          //             showClose: true,
          //             offset: 400,
          //             message: "预览失败",
          //             duration: 500
          //         });
          //     }
          // })
          break;
      }
    },
    //起草保存文件
    createFile() {
      if (this.uploadConfig.filesHas.length > 0) {
        this.$api.setSysConfig
          .saveFile({
            id: this.formData.attachId,
            fileId: this.formData.attachId,
            fileType: "0"
          })
          .then(res => {});
      }
    },
    //附件块
    fileList(files) {
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
      }
      if (!this.formData.attachs) {
        this.formData.attachs = [];
      }
      files.forEach(item => {
        this.formData.attachs.push(item.id);
      });
      this.uploadConfig.filesHas = files;
      this.formData.attachId = this.formData.attachs.join(",");
      this.$forceUpdate();
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.formData.attachId })
        .then(res => {
          this.formData.attchmentFileInfo = res.data;
          this.$forceUpdate();
          this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
        });
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      let sort1 = this.formData.attchmentFileInfo[n].sort;
      let sort2 = this.formData.attchmentFileInfo[n - 1].sort;
      if (sort1 == sort2) {
        sort1 = Number(n) + 1;
        sort2 = n;
      }
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n - 1].id,
          sort: sort1
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: sort2
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
      let sort1 = this.formData.attchmentFileInfo[n].sort;
      let sort2 = this.formData.attchmentFileInfo[n + 1].sort;
      if (sort1 == sort2) {
        sort1 = Number(n) + 1;
        sort2 = Number(n) + 2;
      }
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n + 1].id,
          sort: sort1
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: sort2
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
        this.$api.setSysConfig
          .deleFile({
            id: id
          })
          .then(res => {
            if (res && res.code == "SUCCESS") {
              this.formData.attchmentFileInfo.splice(n, 1);
              this.$forceUpdate();
              this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              this.$message({
                type: "success",
                message: "删除成功"
              });
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
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
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
  created() {
    if (this.$route.query.rowData) {
      let val = JSON.parse(this.$route.query.rowData);
      console.log("this.$route.query.isShow", this.$route.query.isShow);
      this.isShow = JSON.parse(this.$route.query.isShow);
      console.log("isShowzhuanhuan", this.isShow);
      console.log(val, "val");
      console.log(val, "this.$route.query.rowData");
      this.isHomeEnter = val.fileName && val.filePath ? true : false;
      this.id = val.id;
      this.formData = val;
      // this.formData.attachId = val.attachId == "0" ? "" : val.attachId;
      this.formData.attachId =
        val.attachId == "0" ? "123" : val.attachId.replace(/-/g, "");
      console.log(this.formData.attachId, "this.formData.attachId");
      this.loadData();
      this.isSave = true;
    } else {
      this.isSave = false;
      //this.loadData()
    }
    this.initData();
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  .formData {
    margin-top: 24px;
  }
}
.use_object_title {
  width: 100%;
  text-align: center;
  color: #e13b3d;
  font-size: 28px;
}
.btn_list {
  width: 100%;
  margin-left: 30%;
  display: flex;
  div {
    width: 80px;
    height: 30px;
    background: #2574e2;
    text-align: center;
    line-height: 30px;
    margin: 12px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
}
//上传附件
.tree_w {
  height: 200px;
  padding: 10px;
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
    .namespan {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 40px;
      overflow: hidden;
    }
    .name1 {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 300px;
      /* margin-left: -190px; */
      overflow: hidden;
    }
    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 700px;
      /* margin-left: -190px; */
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

