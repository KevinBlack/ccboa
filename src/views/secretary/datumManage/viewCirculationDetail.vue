<template>
  <div>
    <el-header>
      <div class="headerClick">
        <el-button
          class="bank_grid_comtent_active"
          style="background: #0563c8!important;
           color: #fff!important;"
          @click="shutDown"
        >关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </el-header>
    <div id="printHtml">
      <div class="maintitle">{{formData.draftOrgan}}领导活动资料管理单</div>
      <div class="container">
        <div class="content-header">
          <p>
            当前环节：
            <span style="color: #f60; color: red !important;">{{formData.curNodeName}}</span>
          </p>
          <p>
            当前处理人：
            <span style="color: #f60; color: red !important;">{{formData.currentUser}}</span>
          </p>
        </div>
        <el-form
          ref="RefForm"
          :model="formData"
          label-width="120px"
          :rules="rules"
          style="margin-bottom:5px"
        >
          <el-row :gutter="200">
            <el-col :span="12">
              <el-form-item label="日期" prop="activeDate">
                <el-date-picker
                  v-model="formData.activeDate"
                  type="date"
                  placeholder="选择日期"
                  :disabled="isAlldisabled"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="时间" prop="activeTime">
                <el-time-select
                  v-model="formData.activeTime"
                  placeholder="选择时间"
                  :disabled="isAlldisabled"
                ></el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="地点" prop="activeAddress">
              <el-input
                placeholder="请输入内容"
                v-model="formData.activeAddress"
                type="textarea"
                :disabled="isAlldisabled"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-col :span="19">
              <el-form-item label="参与人员" prop="attendMemCn">
                <el-input placeholder="请选择内容" v-model="formData.attendMemCn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="margin:5px 0 0 5px">
              <el-button type="primary" @click="selectPersonBtn" :disabled="isAlldisabled">选择</el-button>
              <el-button type="primary" @click="selectReset" :disabled="isAlldisabled">清空</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="活动名称" prop="title">
                <el-input
                  placeholder="请输入内容"
                  v-model="formData.title"
                  clearable
                  :disabled="isAlldisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="活动类型" prop="activeTypeList">
                <el-select
                  v-model="formData.activeType"
                  placeholder="请选择"
                  :disabled="isAlldisabled"
                >
                  <el-option
                    v-for="item in activeTypeList"
                    :key="item.index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="活动描述" prop="activeContent">
                <el-input
                  placeholder="请输入内容"
                  v-model="formData.activeContent"
                  clearable
                  :disabled="isAlldisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="附件名称" prop="attTitle">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formData.attTitle"
                  :disabled="isAlldisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="附件">
              <el-col :span="23">
                <upload-file-ts
                  :uploadConfig="uploadConfig"
                  @fileList="fileList"
                  v-if="!isAlldisabled"
                ></upload-file-ts>
                <div
                  class="tree_w"
                  v-if="formData.attchmentFileInfo &&formData.attchmentFileInfo.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item, index) in formData.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span class="name down" @click="viewFile(item)">
                            {{
                            item.fileName
                            }}
                          </span>
                          <span class="name">{{ item.createrName }}</span>
                          <span class="name">{{ item.createTime }}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="upRow(index)"
                              v-if="formData.attchmentFileInfo.length > 1"
                              :disabled="index == 0"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index)"
                              v-if="formData.attchmentFileInfo.length > 1"
                              :disabled="index == formData.attchmentFileInfo.length - 1"
                              round
                            >下移</el-button>
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index, item.id)"
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
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择参与人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>

<script>
import uploadFileTs from "components/uploadFile/uploadFileTs";
import selectPerson from "components/tree/tree-fawen";
import minixs from "../../../minixs/index";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import exportTable from "../../../minixs/exportTable";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "viewCirculationDetail",
  components: {
    uploadFileTs,
    selectPerson,
    shiwuFlow
  },
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  data() {
    return {
      showBtnis: false, //判断关闭按钮是否点击
      attTitleList: [], //附近名称数组
      attTitleID: [],
      activeTypeList: [], //活动类型下拉框
      dialogState: false,
      isAlldisabled: false,
      uploadConfig: {
        formId: "mishuActivity",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      //选择流程人员树
      treeData: [],
      seletOptionsData: [],
      offenUse: false,
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: false, // 单选true 多选为false
      dialogState: false, // 默认隐藏选择人员树结构
      showFlowChart: false,
      flowChartList: [], //流程列表
      dialogType: "next",
      dialogTypeNow: "dosend",
      id: "",
      formData: {
        curNodeName: "起草",
        currentNowName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName +
            " " +
            JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        draftOrgan: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitName
          : "",
        authorCn: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "", //拟稿人
        activeDate: formatData(new Date().getTime(), "YYYY-MM-DD"), //日期
        activeTime: new Date()
          .toLocaleTimeString("chinese", { hour12: false })
          .substr(0, 5), //时间
        activeAddress: "", //地点
        attendMemCn: "", //参与人员
        attendMemCnId: "", //参与人员ID
        title: "", //活动名称
        activeType: "", //活动类型
        activeContent: "", //活动描述
        attFullDir: "", //附件位置
        attTitle: "", //附件名称
        id: "",
        handleButton: "", //区分完成并发送和办结的标识
        currentDept: "", //选择人员以后发送部门
        attchmentFileInfo: [], //浏览的所有文件数组
        attachid: "" //储存附件id
      },
      rules: {
        attendMemCn: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        title: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "归档", type: "guidang", show: true },
        { name: "查看流程", type: "ckliucheng", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true },
        { name: "收藏", type: "shoucang", show: true },
        // { name: "归档", type: "guidang", show: true },
        { name: "维护", type: "weihu", show: true }
      ]
    };
  },
  computed: {},
  methods: {
    // 选中 打开
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
      });
      this.uploadConfig.filesHas = files;
      this.formData.attTitle = this.attTitleList.join("\n");
      this.formData.attachid = this.attTitleID.join(",");
      this.$forceUpdate();
    },
    // 附件上移
    upRow(n) {
      this.formData.attTitle = "";
      this.formData.attachid = "";
      this.attTitleList = [];
      this.attTitleID = [];
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
      this.formData.attchmentFileInfo.forEach(item => {
        this.attTitleList.push(item.fileName);
        this.attTitleID.push(item.id);
      });
      this.formData.attTitle = this.attTitleList.join("\n");
      this.formData.attachid = this.attTitleID.join(",");
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {
          if (this.id) {
            this.getFileList();
          }
        });
    },
    //附件下移
    downRow(n) {
      this.formData.attTitle = "";
      this.formData.attachid = "";
      this.attTitleList = [];
      this.attTitleID = [];
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
      this.formData.attchmentFileInfo.forEach(item => {
        this.attTitleList.push(item.fileName);
        this.attTitleID.push(item.id);
      });
      this.formData.attTitle = this.attTitleList.join("\n");
      this.formData.attachid = this.attTitleID.join(",");
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {
          if (this.id) {
            this.getFileList();
          }
        });
    },
    //附件删除
    deleteRow(n, id) {
      this.formData.attTitle = "";
      this.formData.attachid = "";
      this.attTitleList = [];
      this.attTitleID = [];
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.$api.setSysConfig
            .deleFile({
              id: id
            })
            .then(res => {
              if (res && res.code == "SUCCESS") {
                this.formData.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
                this.uploadConfig.filesHas.forEach(item => {
                  this.attTitleList.push(item.fileName);
                  this.attTitleID.push(item.id);
                });
                this.formData.attTitle = this.attTitleList.join("\n");
                this.formData.attachid = this.attTitleID.join(",");
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              }
            });
        })
        .catch(() => {
          this.formData.attchmentFileInfo.forEach(item => {
            this.attTitleList.push(item.fileName);
            this.attTitleID.push(item.id);
          });
          this.formData.attTitle = this.attTitleList.join("\n");
          this.formData.attachid = this.attTitleID.join(",");
        });
    },
    //起草时候把表单ID和附件ID进行绑定   保存完毕时候调用
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formData.attachid,
          fileType: "0"
        })
        .then(res => {
          this.getFileList();
        });
    },
    //详情反显附件
    getFileList() {
      this.attTitleList = [];
      this.attTitleID = [];
      this.$api.setSysConfig
        .getTextemList({ id: this.formData.id })
        .then(res => {
          this.formData.attchmentFileInfo = res.data;
          this.formData.attchmentFileInfo.forEach(item => {
            this.attTitleList.push(item.fileName);
            this.attTitleID.push(item.id);
          });
          this.formData.attTitle = this.attTitleList.join("\n");
          this.formData.attachid = this.attTitleID.join(",");
          this.$forceUpdate();
          this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
        });
    },
    //关闭
    shutDown() {
      if (this.isAlldisabled == false) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save();
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
        // this.$confirm("关闭前是否保存?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning"
        // }).then(() => {
        //   this.save()
        //   this.showBtnis=true
        // }).catch(() => {
        //   this.$intent.closeWindow(this);
        // });
      } else {
        this.$intent.closeWindow(this);
      }
    },
    //选择人员按钮
    selectPersonBtn() {
      this.dialogState = true;
    },
    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; // 关闭选择人员树弹窗
      let attendMemCnId = [];
      let attendMemCn = [];
      data &&
        data.map(item => {
          attendMemCnId.push(item.id);
          attendMemCn.push(item.name);
        });
      this.formData.attendMemCn = attendMemCn.join(",");
      this.formData.attendMemCnId = attendMemCnId.join(",");
    },
    //清空
    selectReset() {
      this.formData.attendMemCn = "";
      this.formData.attendMemCnId = "";
    },
    //保存
    save() {
      this.$refs["RefForm"].validate(valid => {
        if (valid) {
          if (this.formData.id != "") {
            this.formData.handleButton = "维护";
            this.$api.activityInformation
              .maintainActivity(this.formData)
              .then(res => {
                if (this.attTitleID.length > 0) {
                  this.createFile();
                }
                this.$message({ type: "success", message: "保存成功！" });
                if (this.showBtnis == true) {
                  this.$intent.closeWindow(this);
                }
              });
          } else {
            this.$api.activityInformation
              .getaddFormdata(this.formData)
              .then(res => {
                this.formData.id = res.data.id;
                this.id = res.data.id;
                if (this.attTitleID.length > 0) {
                  this.createFile();
                }
                this.$message({ type: "success", message: "保存成功！" });
                if (this.showBtnis == true) {
                  this.$intent.closeWindow(this);
                }
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
    //删除
    delWord() {
      this.$api.activityInformation
        .deletActivity({ id: this.formData.id })
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        });
    },
    //打印处理单
    Printprocessing() {
      let data = this.$router.resolve({
        path: "/LeaderActivities",
        query: { dataList: this.formData.id, type: this.$route.query.type }
      });
      window.open(data.href, "_blank");
    },
    //按钮
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.save();
          break;
        case "删除此文":
          this.$confirm("是否删除此文?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.delWord();
          });
          break;
        case "操作指南":
          this.handBook("MSGZ");
          break;
        case "查看流程":
          if (!this.formData.id == "") {
            this.$api.activityInformation
              .proessViewActivity({ id: this.formData.id })
              .then(res => {
                this.showFlowChart = true;
                this.flowChartList = res.list;
                this.$nextTick(() => {
                  this.$refs.dialogLine.openDialog();
                });
              });
          }
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.activityInformation
                .collecTion({ id: this.formData.id })
                .then(res => {
                  console.log(res);
                  this.downFile(res);
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "维护":
          this.isAlldisabled = false;
          this.buttonList[0].show = true;
          this.buttonList[1].show = true;
          this.buttonList[2].show = true;
          this.buttonList[5].show = false;
          break;
        case "打印处理单":
          this.Printprocessing();
          break;
        case "归档":
          this.$api.secreatary.partyMemLeavRep
            .binLog({ id: this.id })
            .then(res => {
              this.$message({
                type: "success",
                message: res.msg
              });
            });
          break;
      }
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      // bank_doDownloadFile.filePath = '/home/ap'+file.filePath;
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
    loadData() {
      this.$api.activityInformation
        .viewActivity({ id: this.$route.query.data })
        .then(res => {
          this.formData = res.data;
          this.id = res.data.id;
          this.formData.attTitle = res.data.attTitle.replace(/n/g, "\n");
          this.uploadConfig.id = res.data.id; //把详情ID给附件传过去，拿到上传过的附件的数据
        });
    },
    //活动类型
    activeTypeRequest() {
      this.$api.activityInformation.TypeActivity().then(res => {
        this.activeTypeList = res.data;
      });
    }
  },
  mounted() {},
  created() {
    if (this.$route.query.data) {
      this.formData.id = this.$route.query.data;
      this.id = this.$route.query.data; //暂时写一个变量
      this.loadData();
      this.getFileList();
      this.isAlldisabled = true;
    }
    this.activeTypeRequest(); //活动类型
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.container {
  .content-header {
    display: flex;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 20px;
    // border: 1px solid #f9aa21;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    p {
      padding-right: 20px;
    }
  }
}
.el-col ::v-deep {
  border: 1px solid transparent;
}
.el-header {
  background-color: #3b85ef;
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
.btnstyle {
  color: #3b85ef;
}
.btnstyle:hover {
  background-color: #3b85ef;
  color: cornsilk;
}
.maintitle {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
.container {
  width: 80%;
  padding-bottom: 20px;
  margin: 30px auto;
  border: 1px solid rgb(218, 215, 215);
  padding: 20px 20px;
  position: relative;
}
.c-header {
  background-color: #fef7e7;
  border: 1px solid #f9aa21;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.el-table .cell {
  white-space: pre-line;
}
.el-form-item ::v-deep {
  margin-bottom: 12px;
}
.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
.person {
  text-align: right;
  color: #606266;
  p {
    line-height: 1.5;
    font-size: 14px;
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
// 收藏
.tablePrint {
  position: absolute;
  z-index: -999;
}
</style>
