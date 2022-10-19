<!--
 * @Author: wy
 * @Date: 2020-07-17 14:17:06
 * @LastEditTime: 2021-02-26 18:09:35
 * @LastEditors: Please set LastEditors
 * @Description: 编辑页
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\workCommForm.vue
-->
<template>
  <div class="workCommForm">
    <div class="handleButton">
      <el-button type="primary" @click="goBack()">关闭</el-button>
      <el-button type="primary" @click="saveRegInfo(0)">保存</el-button>
      <el-button type="primary" @click="send(1)">发送</el-button>
      <el-button v-if="isDel" type="primary" @click="delInfo()">作废</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">工作交流单</div>
      <div class="orgInfoTableBody">
        <m-form
          ref="mForm"
          :formRules="indexformRules"
          :formCfg="formCfg"
          :formData="formData"
          :showButton="false"
          :isInline="false"
          labelWidth="220px"
        ></m-form>
        <el-form label-width="220px">
          <el-form-item label="回复信息">
            <el-col>
              <div class="borderMessage">
                <div v-for="(item,index) in messageArr" :key="index">
                  <div class="message">{{item.messageHf}}</div>
                  <div
                    class="messageName"
                  >{{item.msgDeptName}} &nbsp;&nbsp;&nbsp;&nbsp; {{item.msgUserName}}</div>
                  <div class="messageDate">{{item.messageDate}}</div>
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <div>
          <el-col :span="22" style="margin-left:120px;padding:10px 30px 30px 30px;">
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
                      <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
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
                          v-if="!isSave"
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
        </div>
      </div>
    </div>
    <select-person
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
    />
  </div>
</template>
<script >
import mForm from "components/form/mForm";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import selectPerson from "components/tree/tree-fawen";
export default {
  name: "workCommForm",
  components: {
    mForm,
    uploadFileTs,
    selectPerson
  },
  props: {},
  data() {
    return {
      // isDel: false,
      uploadConfig: {
        formId: "shiwuForm",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      id: "",
      // deleteArry: [],
      isSave: false,
      isDel: false,
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
          label: "发布人",
          prop: "draftUserName",
          type: "input",
          width: "100%",
          disabled: true
        },
        {
          label: "接收人",
          prop: "receivePersonName",
          type: "input",
          width: "100%",
          disabled: true
        }
        // {
        //   label: '回复信息',
        //   prop: 'roleName',
        //   type: 'textarea',
        //   width: '100%',
        //   disabled: true
        // },
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
      indexformRules: {
        title: [{ required: true, trigger: "blur", message: "请输入主题" }]
      },
      formData: {
        userMessages: [],
        attaches: []
      },
      formDataEdit: {
        userMessages: [],
        attaches: []
      },
      messageArr: [],
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
      row: {},
      // 选择人员确定
      receivePersonId: "",
      receivePersonName: ""
    };
  },
  computed: {},
  methods: {
    //保存
    saveRegInfo(tp) {
      console.log(this.formData, "formData");
      this.$refs.mForm.validate().then(res => {
        if (res) {
          this.formDataEdit.type = tp;
          this.formDataEdit.id = this.id;
          this.formDataEdit.title = this.formData.title;
          this.formDataEdit.content = this.formData.content;
          this.formDataEdit.attaches = this.formData.attaches;
          this.$api.dailyWork.saveWorkEditPer(this.formDataEdit).then(res => {
            console.log(res, "res");
            if (res.code == "SUCCESS") {
              // this.isDel = true
              this.id = res.data;
              this.createFile();
              this.$message({
                message: "保存成功",
                type: "success"
              });
              // this.$router.go(-1);
              this.$router.push("/dashboard/personalOffice/dailyWork/workCommunicate")
              this.isDel = true;
            }
          });
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
          this.formDataEdit.userMessages.push(obj);
        });
        console.log(this.formDataEdit, "this.formDataEdit");

        let chooseData = [];
        data.map(item => {
          chooseData.push(item.name);
        });
        // this.$set(this.formData, 'receivePersonName', chooseData.join(","))
        this.receivePersonName = chooseData.join(",");
        // let arrId = []
        // data.map(item=>{
        //   let itemId = this.getCaption(item.id)
        //   arrId.push(itemId)
        // })
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
            this.formDataEdit.userMessages = [];
          });
      } else {
        this.dialogState = false;
      }
    },
    //发送
    send(tp) {
      if (this.id) {
        this.dialogState = true;
        this.formDataEdit.type = tp;
        this.formDataEdit.id = this.id;
        this.formDataEdit.title = this.formData.title;
        this.formDataEdit.content = this.formData.content;
      } else {
        this.$alert("请先保存");
      }
    },
    sendNext() {
      this.$api.dailyWork.saveWorkEditPer(this.formDataEdit).then(res => {
        console.log(res, "res");
        if (res.code == "SUCCESS") {
          this.createFile();
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
    //作废
    // deleteInfo(){
    //   this.$message({
    //       message: '文档删除成功',
    //       type: 'success'
    //   });
    // },
    goBack() {
      // this.$router.push({
      //   path: '/dashboard/personalOffice/dailyWork/workCommunicate/workCommviewDetail',
      //   query: {
      //     row:this.$route.query.row
      //   }
      // })
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
            // this.$intent.closeWindow(this);
            // this.$router.go(-1);
            this.$router.push("/dashboard/personalOffice/dailyWork/workCommunicate")
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    //起草保存文件
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
    //附件上传
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
      let sort1 = this.formdata.attchmentFileInfo[n].sort;
      let sort2 = this.formdata.attchmentFileInfo[n - 1].sort;
      if (sort1 == sort2) {
        sort1 = Number(n) + 1;
        sort2 = n;
      }
      attachSort.push(
        {
          id: this.formdata.attchmentFileInfo[n - 1].id,
          sort: sort1
        },
        {
          id: this.formdata.attchmentFileInfo[n].id,
          sort: sort2
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
      let sort1 = this.formdata.attchmentFileInfo[n].sort;
      let sort2 = this.formdata.attchmentFileInfo[n + 1].sort;
      if (sort1 == sort2) {
        sort1 = Number(n) + 1;
        sort2 = Number(n) + 2;
      }
      attachSort.push(
        {
          id: this.formdata.attchmentFileInfo[n + 1].id,
          sort: sort1
        },
        {
          id: this.formdata.attchmentFileInfo[n].id,
          sort: sort2
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
  activated() {},
  mounted() {},
  created() {
    console.log(this.$route.query.initData);
    this.formData = this.$route.query.initData;
    this.messageArr = this.$route.query.initData.userMessages;
    this.id = this.$route.query.initData.id;
    this.getFileList();
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
      .borderMessage {
        background-color: #e4e7ed52;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding-left: 20px;
        max-height: 500px;
        min-height: 36px;
      }
      .messageName {
        text-align: right;
        margin-right: 20px;
        line-height: 28px;
      }
      .messageDate {
        text-align: right;
        margin-right: 20px;
        line-height: 28px;
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
  }
  .box-card {
    margin-bottom: 10px;
  }
}
</style>
