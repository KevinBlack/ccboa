<!--
 * @Author: wy
 * @Date: 2020-07-17 14:17:06
 * @LastEditTime: 2021-02-26 18:11:05
 * @LastEditors: Please set LastEditors
 * @Description: 新增
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\workCommForm.vue
-->
<template>
  <div class="workCommForm">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="saveRegInfo(0)">保存</el-button>
      <el-button type="primary" @click="send(1)">发送</el-button>
      <el-button type="primary" @click="delInfo()" v-if="isDel">作废</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">工作交流单</div>
      <div class="orgInfoTableBody">
        <m-form
          ref="mForm"
          :formCfg="formCfg"
          :formData="formData"
          :showButton="false"
          :isInline="false"
          labelWidth="220px"
          :formRules="indexformRules"
        ></m-form>
        <div>
          <el-form label-width="220px">
            <el-form-item>
              <el-col :span="23">
                <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList" v-if="!isSave"></upload-file-ts>
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
                          <span
                            class="name down"
                            @click="downFile(item ,null,item.title)"
                          >{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="upRow(index)"
                              v-if="formData.attchmentFileInfo.length>1&&!isSave"
                              :disabled="index==0"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index)"
                              v-if="formData.attchmentFileInfo.length>1&&!isSave"
                              :disabled="index==formData.attchmentFileInfo.length-1"
                              round
                            >下移</el-button>
                            <el-button
                              type="warning"
                              size="mini"
                              v-if="!isSave"
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
      </div>
    </div>
    <!-- <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择下一处理人"
      :checkIds="checkIds"
      :fromdata="formData1"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />-->
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :scircularizeLevel="scircularizeLevel"
      :checkIds="checkIds"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>
  </div>
</template>
<script >
import mForm from "components/form/mForm";
import uploadFileTs from "components/uploadFile/uploadFileTs";
// import selectPerson from "components/tree/tree-fawen";
import selectPerson from "components/tree/treeTansun";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
export default {
  name: "workCommForm",
  components: {
    mForm,
    uploadFileTs,
    treeCofigForCy
  },
  props: {},
  data() {
    return {
      treeTradeCode: "",
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      scircularizeLevel: "1",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      seletOptionsDataForCy: [],
      uploadConfig: {
        formId: "workForm",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      id: "",
      // deleteArry: [],
      isDel: false,
      isSave: false,
      infoUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      formCfg: [
        {
          label: "主题",
          prop: "title",
          type: "input",
          width: "100%"
        },
        {
          label: "内容",
          prop: "content",
          type: "textarea",
          width: "100%"
        },
        {
          label: "回复信息",
          prop: "roleName",
          type: "input",
          width: "100%",
          disabled: true
        }
        // {
        //   label: '',
        //   prop: 'receivePersonName',
        //   type: 'none',
        // }, {
        //   label: '',
        //   prop: 'receivePersonId',
        //   type: 'none'
        // },
      ],
      formData: {
        userMessages: [],
        attaches: []
      },
      indexformRules: {
        title: [{ required: true, trigger: "blur", message: "请输入主题" }]
      },
      chooseArrId: [], // 选中人员列表
      // 完成并发送
      treeData: [], // 树数据
      seletOptionsData: [], // 下一处理环节下拉数据
      offenUse: false,
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: false, // 选人单选true 多选为false
      dialogTypeNow: "next",
      formData1: {
        activityType: []
      },
      // 选择人员确定
      receivePersonId: "",
      receivePersonName: ""
    };
  },
  computed: {},
  methods: {
    //保存
    saveRegInfo(tp) {
      this.$refs.mForm.validate().then(res => {
        if (res) {
          this.formData.type = tp;
          if (tp == 0) {
            this.$api.dailyWork.saveWorkNewPer(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.id = res.data;
                this.createFile();
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.isDel = true;
              }
            });
          } else {
            this.formData.type = 0
            this.$api.dailyWork.saveWorkNewPer(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.id = res.data;
                this.createFile();
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$router.push({
                  path: "/dashboard/personalOffice/dailyWork/workCommunicate"
                });
                this.isDel = true;
              }
            });
          }
        }
      });
    },
    //作废
    delInfo() {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.deleteArry.push(this.id)
          this.$api.dailyWork.deleteWorkPer({ id: this.id }).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.$router.push({
                name: "workCommunicate",
                query: { activeName: "view" }
              });
              // this.isDel = false
              // this.formData = {}
              // this.formData.userMessages = []
              // this.formData.attaches = []
              // this.formData.hasDocumentNo = false
              // this.id = ""
              // this.formData.deptName = this.$route.query.deptName
              // this.formData.deptId = this.$route.query.deptId
            }
          });
        })
        .catch(() => {});
    },
    // 选人成功
    getCaption(obj) {
      var index = obj.lastIndexOf("#");
      obj = obj.substring(0, index);
      return obj;
    },
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, "params", params, dtype);
      console.log(data, "data");
      console.log(status, "status");
      if (status) {
        data.forEach(ele => {
          let obj = {};
          obj.receivePersonId = this.getCaption(ele.id);
          obj.receivePersonName = ele.name;
          this.formData.userMessages.push(obj);
        });

        let chooseData = [];
        data.map(item => {
          chooseData.push(item.name);
        });
        // this.$set(this.formData, 'receivePersonName', chooseData.join(","))
        this.receivePersonName = chooseData.join(",");
        data.map(item => {
          let itemId = this.getCaption(item.id);
          this.chooseArrId.push(itemId);
        });
        // this.$set(this.formData, 'receivePersonId', arrId.join(","))

        this.$confirm(`是否发送给   ` + this.receivePersonName + `   处理？`, {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        })
          .then(() => {
            this.sendNext();
          })
          .catch(() => {
            this.formData.userMessages = [];
            this.chooseArrId = [];
          });
      }
      // else{
      //   this.dialogState = false
      // }
      this.dialogStateForCy = !this.dialogStateForCy;
    },
    //发送
    send(tp) {
      this.$refs.mForm.validate().then(res => {
        if (res) {
          console.log("*********this.id", this.id);
          if (this.id) {
            //this.dialogState = true
            this.formData.type = tp;
            this.formData.id = this.id;
            this.getTreeDataForCy("cy");
          } else {
            this.formData.type = "0";
            this.$api.dailyWork.saveWorkNewPer(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.id = res.data;
                this.createFile();
                //this.dialogStateForCy = true
                this.getTreeDataForCy("cy");
                this.formData.type = tp;
                this.formData.id = this.id;
              }
            });
          }
        }
      });
    },
    getTreeDataForCy(n) {
      if (n == "cy") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      switch (n) {
        case "cy":
          name = "选择下一处理人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      // this.showCompDialogForCy();
      // this.dialogStateForCy = !this.dialogStateForCy
      this.showCompDialog();
      this.$post
        .postData(
          "selectUserByCirculate",
          JSON.stringify({
            function: "selectUserByCirculate",
            level: this.scircularizeLevel,
            flag: true
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.message == "Loading") {
            this.loadingTreeForCy = true;
          } else {
            this.loadingTreeForCy = false;
          }
          this.treeData = (res && res.data) || [];
          this.treeData[0].disabled = true;
        });
      this.treeTradeCode = this.$businessCode.swgl;
    },
    showCompDialogForCy(data, status, type, params, dtype) {
      console.log("------传阅data----->", data);
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let id_name = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          // data.map(item => {
          //     names.push(item.name || item.text);
          //     ids.push(item.id);
          //     id_name.push(item.id + '_' + (item.name || item.text));
          // });
          // this.cy(id_name)
          //-------showCompDialog 粘贴过来的
          data.forEach(ele => {
            let obj = {};
            obj.receivePersonId = this.getCaption(ele.id);
            obj.receivePersonName = ele.name;
            this.formData.userMessages.push(obj);
          });

          let chooseData = [];
          data.map(item => {
            chooseData.push(item.name);
          });
          // this.$set(this.formData, 'receivePersonName', chooseData.join(","))
          this.receivePersonName = chooseData.join(",");
          data.map(item => {
            let itemId = this.getCaption(item.id);
            this.chooseArrId.push(itemId);
          });
          // this.$set(this.formData, 'receivePersonId', arrId.join(","))

          this.$confirm(
            `是否发送给   ` + this.receivePersonName + `   处理？`,
            {
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.sendNext();
            })
            .catch(() => {
              this.formData.userMessages = [];
              this.chooseArrId = [];
            });
          // oldIds = this.formData.wyIds.split(" ")
          // oldNames = this.formData.wyPle.split(" ")
          // newIds = ids.filter((item)=>{
          //     return oldIds.indexOf(item)==-1;
          // })
          // newNames = names.filter((item)=>{
          //     return oldNames.indexOf(item)==-1;
          // })
          //
          // newNames = newNames.join(",");
          // newIds = newIds.join(",");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        // switch (dtype) {
        //     case "cy":
        //         this.formData.curUserName = newNames;
        //         this.formData.curUserId = newIds;
        //         this.cyCheckData = this.checkData;
        //         break;
        // }
        // if(!!this.formData.curUserName){
        //     this.cy();
        // }
      }
      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      // if (this.dialogStateForCy) {
      //     this.backDialogDataForCy(this.dialogTypeNowForCy);
      // }
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          let checkId = this.formData.unreadPerson
            ? this.formData.unreadPerson.split(",")
            : [];
          // this.checkIds.map
          let checkObject = [];
          checkId &&
            checkId.map(item => {
              checkObject.push({ TYPE: "user", name: item });
            });
          // if (this.cyCheckData.length) {
          //     newA = [].concat(this.cyCheckData);
          //     newA.map(item => {
          //         //选中的不可操作
          //         item.disabled = true;
          //     });
          // }
          // this.checkData = checkObject;
          break;
      }
    },
    cy(id_name) {
      // this.formData.curUserIds = id_name.join(",")
      // console.log("传阅")
      // this.$api.checkLz.checkCYCreate(
      //     {
      //         ...this.formData,
      //         currentCode: "制发"
      //     }
      // ).then(res => {
      //     if (res.code == "SUCCESS") {
      //         this.queryDeal()
      //         this.$message({
      //             message: '操作成功',
      //             type: 'success'
      //         });

      //     } else {
      //         this.$message({
      //             message: res.msg,
      //             type: 'warning'
      //         });
      //     }
      // })
      this.$confirm(`是否发送给   ` + this.receivePersonName + `   处理？`, {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.sendNext();
        })
        .catch(() => {
          this.formData.userMessages = [];
          this.chooseArrId = [];
        });
    },
    sendNext() {
      this.$api.dailyWork.saveWorkNewPer(this.formData).then(res => {
        console.log(res, "res");
        if (res.code == "SUCCESS") {
          this.createFile();
          this.getRemind();
          this.$message({
            type: "success",
            message: `成功发送给   ` + this.receivePersonName,
            duration: 1000
          });
          this.dialogState = false;
          this.$router.push({
            name: "workCommunicate",
            query: { activeName: "view" }
          });
        }
      });
    },
    getRemind() {
      if (this.chooseArrId.length > 0) {
        this.chooseArrId.forEach(ele => {
          this.$api.dailyWork
            .getRemindPer({
              userId: ele,
              productCode: "gongZJL",
              urgentType: "",
              infoType: "个人办公",
              infoTitle: this.formData.title,
              infoUser: this.infoUser
            })
            .then(res => {
              if (res.code == "SUCCESS") {
              }
            });
        });
      }
    },
    close() {
      // console.log("1111122121")
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            // this.saveOrgInfo();
            this.saveRegInfo(1);
          } else if (action === "cancel") {
            //点否
            // this.$router.back();
            this.$router.push({
              path: "/dashboard/personalOffice/dailyWork/workCommunicate"
            });
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    //附件上传
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
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
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
    }, //起草保存文件
    createFile() {
      if (this.uploadConfig.filesHas.length > 0) {
        this.$api.setSysConfig
          .saveFile({
            id: this.id,
            fileId: this.formData.attachId,
            fileType: "0"
          })
          .then(res => {});
      }
    },
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.setSysConfig.deleFile({ id: id }).then(res => {
          if (res) {
            if (res && res.code == "SUCCESS") {
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
      // debugger
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
  },
  activated() {},
  mounted() {},
  created() {
    if (this.$route.query.deptId) {
      this.formData.deptName = this.$route.query.deptName;
      this.formData.deptId = this.$route.query.deptId;
    } else {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.workCommForm {
  .orgInfoTable {
    padding: 0px 70px;
    .orgInfoTitle {
      margin-bottom: 35px;
      font-size: 30px;
      line-height: 55px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
    .orgInfoTableBody {
      padding: 0 4%;
      margin-left: -4%;
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
  .box-card {
    margin-bottom: 10px;
  }
}
</style>
