<template>
  <div class="selfBankInfoPub">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="saveRegInfo()">保存</el-button>
      <el-button type="primary" @click="finAndSend()">完成并发送</el-button>
      <el-button type="primary" @click="backInfo()" v-if="isBack">退回</el-button>
      <el-button type="primary" @click="releaseInfo()" v-if="ispublic">发布</el-button>
      <el-button type="primary" @click="delete_btn()" v-if="isDle&&id">作废</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">本行信息发布</div>
      <div class="orgInfoTableBody">
        <el-form ref="elForm" :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="17">
              <el-form-item label="正文标题" prop="title">
                <el-input v-model="formData.title" :disabled="isBack"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="17">
              <el-form-item label="拟稿人">
                <el-input v-model="formData.draftUser" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="17">
              <el-form-item label="正文内容" prop="htmlBody">
                <el-input
                  type="textarea"
                  :autosize="{minRow:5,maxRow:15}"
                  placeholder="填写不可多于500字"
                  maxlength="500"
                  show-word-limit
                  v-model="formData.htmlBody"
                  :disabled="isBack"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="审核意见">
              <el-row
                v-for="item in formData.opinionCheckList"
                :key="item.id"
                style="margin-bottom: 3px"
              >
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="16">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        :autosize="{minRows:5,maxRows:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">
                        {{item.departmentName}}
                        <span class="pad_lr10">{{item.leaderName}}</span>
                        {{item.createTime}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-input
                    type="textarea"
                    :autosize="{minRow:5,maxRow:15}"
                    placeholder="填写不可多于500字"
                    maxlength="500"
                    show-word-limit
                    :disabled="isSHidea"
                    v-model="formData.opinionCheck"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="附件">
              <el-col :span="16">
                <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
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
        </el-form>
      </div>
    </div>
    <!--    人员树-->
    <select-person
      :treeData="treeData"
      :needFirdLoad="needFirdLoad"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :checkOrg="checkOrg"
      :fromdata="formData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :subOrgFlag="false"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    />
  </div>
</template>
  <script>
import FdForm from "vue-elementui-freedomen/components/form";
import selectPerson from "components/tree/treeTansun";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import openOrDownLoadFile from "../../../../../../minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "selfBankInfoPub",
  components: {
    FdForm,
    selectPerson,
    uploadFileTs
  },
  mixins: [openOrDownLoadFile,viewDraft],
  data() {
    return {
      needFirdLoad: true,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        htmlBody: [
          { required: true, message: "请输入正文内容", trigger: "blur" }
        ]
      },
      uploadConfig: {
        formId: "pubInfo",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      checkOrg: false,
      offenUse: false, //是否可设置常用
      isSave: true,
      id: "",
      isNeedCancel: "",
      formCfg: [],
      formData: {
        draftUser: "",
        opinionCheckList: []
      },
      listData: [],
      loadingTree: true,
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      dialogTypeNow: "dosend",
      seletOptionsData: [],
      treeData: [],
      canTab: false,
      isEditBtn: false,
      isBack: false,
      ispublic: false,
      isDle: false, //作废
      isSHidea: true
    };
  },
  computed: {},
  methods: {
    btnevent() {},
    initData() {
      this.formCfg = [
        {
          type: "input",
          prop: "title",
          label: "正文标题",
          span: 18,
          disabled: this.isBack,
          rule: "must"
        },
        {
          type: "input",
          prop: "draftUser",
          label: "拟稿人",
          span: 18,
          disabled: true,
          rule: "must"
        },
        {
          type: "input-area",
          prop: "htmlBody",
          label: "正文内容",
          span: 18,
          disabled: this.isBack,
          rule: "must"
        },
        {
          type: "input-area",
          prop: "opinionCheck",
          label: "审核意见",
          span: 18,
          disabled: this.isSHidea
        }
      ];
    },
    //关闭
    close() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.saveRegInfo();
            // this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
            // this.$router.go(-1);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
      //   this.$router.push("/dashboard/personalOffice/publishInfo/selfBankInfo");
    },
    //起草保存文件
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formData.attachs ? this.formData.attachs : "",
          fileType: "0"
        })
        .then(res => {});
    },
    //保存
    saveRegInfo() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          if (this.id) {
            this.$api.messPub
              .alterBankMess({
                ...this.formData
              })
              .then(res => {
                if (res.code == "SUCCESS") {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                }
              });
          } else {
            this.$api.messPub
              .createBankMess({
                ...this.formData
              })
              .then(res => {
                this.id = res.data;
                this.createFile();
                if (res.code == "SUCCESS") {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                }
              });
          }
          // this.$router.go(-1);
          this.$intent.closeWindow(this)
        } else {
        }
      });
    },
    //获取拟稿人
    messOption() {
      this.$api.messPub.diaableBankMess({}).then(res => {
        this.$set(this.formData, "draftUser", res.data.draftUser);
        this.formData.draftUserId = res.data.draftUserId;
      });
      this.initData();
    },
    //获取详情信息
    queryDeal() {
      this.$api.messPub.BankMessDeal({ id: this.id }).then(res => {
        this.getFileList();
        this.$nextTick(() => {
          this.$set(this.formData, "opinionCheckList", res.opinionCheckList);
        });
        console.log(this.formData.opinionCheckList);
        //退回
        if (res.data.contentSendFlog == "0") {
          this.isBack = false;
        } else if (res.data.contentSendFlog == "1") {
          this.isBack = true;
        }
        //发布
        if (res.data.isAdmin == "1") {
          this.ispublic = true;
        } else if (res.data.isAdmin == "0") {
          this.ispublic = false;
        }
        this.formData = res.data;
        //作废状态
        if (res.data.oldUserId) {
          this.isDle = false;
        } else {
          this.isDle = true;
        }
        //审核意见编辑
        if (res.data.isOpinionFlag == "0") {
          this.isSHidea = true;
        } else if (res.data.isOpinionFlag == "1") {
          this.isSHidea = false;
        }

        this.initData();
      });
    },
    //完成并发送
    finAndSend() {
      // this.offenUse = true;
      if (this.id) {
        this.$api.messPub
          .alterBankMess({
            ...this.formData
          })
          .then(res => {
            this.choosePer();
          });
      } else {
        this.$refs["elForm"].validate(valid => {
          if (valid) {
            this.$api.messPub
              .createBankMess({
                ...this.formData
              })
              .then(res => {
                this.id = res.data;
                this.createFile();
                this.choosePer();
              });
          }
        });
      }
    },
    //选择人员树
    choosePer() {
      this.$api.messPub
        .BankMessTree({
          ccbToken: localStorage.getItem("st"),
          id: this.id
        })
        .then(res => {
          console.log(res.data.result, "res");
          this.loadingTree = true;
          this.dialogState = true;
        });
    },
    //选人成功之后操作
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      // console.log('data', data, 'status', status, 'type', type, 'params', params, 'dtype', dtype);
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        data &&
          data.map(item => {
            chooseDataName.push(item.name);
            chooseDataId.push(item.idStr);
          });
        this.formData.currentUser = chooseDataName.join(",");
        this.formData.currentUserId = chooseDataId.join(",");
        this.formData.handleButton = "完成并发送";
        if (this.id) {
          this.formData.id = this.id;
          this.$api.messPub.alterFinChoosePer(this.formData).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: res.msg,
                type: "success"
              });
            }
            this.isSave = true;
            this.$intent.closeWindow(this)
            // this.$router.push(
            //   "/dashboard/personalOffice/publishInfo/selfBankInfo"
            // );
          });
        } else {
          this.$api.messPub.finChoosePer(this.formData).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: res.msg,
                type: "success"
              });
            }
            this.isSave = true;
            this.$intent.closeWindow(this)
            // this.$router.push(
            //   "/dashboard/personalOffice/publishInfo/selfBankInfo"
            // );
          });
        }
      }
    },
    edirorInfo() {
      this.isSave = false;
    },
    //退回拟稿人
    backInfo() {
      this.$api.messPub
        .backDraftUser({
          ...this.formData
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "退回成功"
          });
          // this.$router.push(
          //   "/dashboard/personalOffice/publishInfo/selfBankInfo"
          // );
          this.$intent.closeWindow(this)
        });
    },
    //发布信息
    releaseInfo() {
      this.formData.handleButton = "发布";
      this.$api.messPub
        .alterFinChoosePer({
          ...this.formData
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "发布成功"
          });
          // this.$router.go(-1);
          this.$intent.closeWindow(this)
        });
    },
    //作废
    delete_btn() {
      this.$confirm("此操作将作废该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.messPub
            .BankMessDelete({
              id: this.id
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "数据已作废"
                });
                // this.$router.back();
                this.$intent.closeWindow(this)
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //附件上传
    //附件块
    fileList(files) {
      console.log("-------------files", files);
      let attachs = [];
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length > 0
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
      }

      this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.map(item => {
          attachs.push(item.id);
        });
      this.formData.attachs = attachs.join(",");
      this.uploadConfig.filesHas = files;
      this.$forceUpdate();
    },
    //获取附件
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.id
        })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.formData, "attchmentFileInfo", res.data);
            this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
          });
        });
    },
    // 附件上传下载排序
    upRow(n) {
      if (!this.id) {
        return;
      }
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
        .then(res => {
          this.getFileList();
        });
    },
    downRow(n) {
      if (!this.id) {
        return;
      }
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
        .then(res => {
          this.getFileList();
        });
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
    }
    //下载附件
    // downFile(file) {
    //     this.$api.setSysConfig.downloadFile(
    //         {
    //             fileName : file.fileName,
    //             filePath : file.filePath
    //         }).then(res => {
    //         if (res && res.code == 'SUCCESS') {
    //             downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
    //                 res.data.filePath +
    //                 "&fileName=" +
    //                 res.data.fileName, file.fileName);
    //         }else {
    //             this.$message({
    //                 type: "error",
    //                 showClose: true,
    //                 offset: 400,
    //                 message: "下载失败",
    //                 duration: 500
    //             });
    //         }
    //     })
    // }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.uploadConfig.id = this.id;
      this.isEditBtn = true;
      this.isSave = true;
      this.queryDeal();

      this.initData();
    } else {
      this.isSave = false;
      this.isEditBtn = false;
      this.initData();
      this.messOption();
    }
  }
};
</script>
  
  <style scoped lang="less" rel="stylesheet/less">
.adviceInfo {
  position: absolute;
  width: 50%;
  left: 10%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.d_flex {
  display: flex;
  padding-bottom: 20px;

  .d_b100 {
    width: 100%;
  }

  .d_f1 {
    flex: 1;
  }
}

.selfBankInfoPub {
  .orgInfoTable {
    padding: 0px 70px;

    .orgInfoTitle {
      margin-bottom: 35px;
      font-size: 30px;
      line-height: 55px;
      color: #f5150b;
      font-weight: 600;
      text-align: center;
    }

    .orgInfoTableBody {
      margin-left: 8%;

      .tips {
        padding-left: 20%;
        font-size: 12px;
        color: #f5150b;
      }

      .changeBtn {
        padding-left: 20%;
        margin-top: 30px;
      }
    }
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
</style>
  