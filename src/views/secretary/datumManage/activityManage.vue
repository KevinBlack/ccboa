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
                <el-select v-model="formData.activeType" placeholder="请选择">
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
                <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
                <upfileList :canmoveOrdown="true" label :fileList="formData.attchmentFileInfo"></upfileList>
                <!-- <div class="tree_w" v-show="formData.attchmentFileInfo &&formData.attchmentFileInfo.length">
                  <el-scrollbar>
                    <div
                      v-for="(item, index) in formData.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span>{{index+1}}</span>
                          <span class="name down" @click="viewFile(item)">{{
                            item.fileName
                          }}</span>
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
                              >上移</el-button
                            >
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index)"
                              v-if="formData.attchmentFileInfo.length > 1"
                              :disabled="index == formData.attchmentFileInfo.length - 1" round>下移</el-button
                            >
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index, item.id)"
                              :disabled="item.disabled"
                              round
                              >删除</el-button
                            >
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item)"
                              round
                              >下载</el-button
                            >
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>-->
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <select-person
      v-dialogDrag
      :treeData="treeData"
      :fromdata="formData"
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
    <!-- <mencn-person
      :treeData="MemCntreeData"
      :loadingTree="true"
      :seletOptionsData="MemCnseletOptionsData"
      :offenUse="MemCnoffenUse"
      :dialogType="MemCndialogType"
      :dialogTypeNow="MemCndialogTypeNow"
      dialogTit="选择参与人员"
      :checkIds="MemCncheckIds"
      :checkData="MemCncheckData"
      :singelCheckF="MemCnsingelCheckF"
      :dialogState="MemCndialogState"
      @showCompDialog="MemCnshowCompDialog"
    />-->
    <!-- 选择参与人员 -->
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingles"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>

<script>
import uploadFileTs from "components/uploadFile/uploadFileTs";
import selectPerson from "@/components/tree/treeTansun";
import mencnPerson from "components/tree/treeTansun";
import minixs from "../../../minixs/index";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import exportTable from "../../../minixs/exportTable";
import upfileList from "@/views/bianhan/components/showUploadFile"; //附件展示
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import treePerson from "components/tree/hldTree";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "activityManage",
  components: {
    upfileList,
    uploadFileTs,
    selectPerson,
    // mencnPerson,
    treePerson,
    shiwuFlow
  },
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  data() {
    return {
      backFlag1: "", //是否直接返回
      showBtnis: false, //判断关闭按钮是否点击
      attTitleList: [], //附件名称所有字段
      attTitleID: [],
      activeTypeList: [], //活动类型下拉框
      dialogState: false,
      isAlldisabled: false,
      shanchubtn: "false", //约束条件删除按钮
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
      //选择人员树
      // MemCntreeData: [],
      // MemCnseletOptionsData: [],
      // MemCnoffenUse: false,
      // MemCncheckIds: [], //选中id列表
      // MemCncheckData: [], //选中数据
      // MemCnsingelCheckF: false, // 单选true 多选为false
      // MemCndialogState: false, // 默认隐藏选择人员树结构
      // MemCnshowFlowChart: false,
      // MemCnflowChartList: [], //流程列表
      // MemCndialogType: "",
      // MemCndialogTypeNow: "",
      showOrgPer: false,
      isSingles: false,
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDept: [],
      id: "",
      formData: {
        currentUnitId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitId
          : "", //当前处理人部门id
        currUnitName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitName
          : "", //当前处理人部门名称
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
          : "", //拟稿人
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "", //拟稿人id
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "", //拟稿人部门
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
        attTitle: "", //附件名称
        id: "",
        handleButton: "", //区分完成并发送和办结的标识
        currentDept: "", //选择人员以后发送部门
        attchmentFileInfo: [], //浏览的所有文件数组
        attAchId: "" //储存附件id
      },
      rules: {},
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wanchengfasong", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "ckliucheng", show: false },
        { name: "打印处理单", type: "dayinchulidan", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false }
      ],
      huanJieMessage: {},
      readFields: {
        activeDate: false, //日期
        activeTime: false, //时间
        activeAddress: false, //地点
        title: false, //活动名称
        activeType: false, //活动类型
        activeContent: false, //活动描述
        attFullDir: false, //附件位置
        attTitle: false //附件名称
      }, //不可编辑控制域
      requiredFields: {
        activeDate: "", //日期
        activeTime: "", //时间
        activeAddress: "", //地点
        attendMemCn: "", //参与人员
        title: "", //活动名称
        activeType: "", //活动类型
        activeContent: "", //活动描述
        attTitle: "" //附件名称
      } //必填控制域
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
      this.formData.attAchId = this.attTitleID.join(",");
      this.$forceUpdate();
    },
    // 附件上移
    upRow(n) {
      this.formData.attTitle = "";
      this.formData.attAchId = "";
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
      this.formData.attAchId = this.attTitleID.join(",");
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
      this.formData.attAchId = "";
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
      this.formData.attAchId = this.attTitleID.join(",");
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
      this.formData.attAchId = "";
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
                this.formData.attAchId = this.attTitleID.join(",");
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
          this.formData.attAchId = this.attTitleID.join(",");
        });
    },
    //起草时候把表单ID和附件ID进行绑定   保存完毕时候调用
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formData.attAchId,
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
          console.log(this.attTitleList, "附件名称打印");
          this.formData.attTitle = this.attTitleList.join("\n");
          this.formData.attAchId = this.attTitleID.join(",");
          this.$forceUpdate();
          this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
        });
    },
    //关闭
    shutDown() {
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
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.save();
      //     this.showBtnis = true;
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //   });
    },
    //选择人员按钮
    selectPersonBtn() {
      // this.MemCndialogState = true;
      // 数据返显
      this.selectDept = [];
      let tempArr = [];
      let attendMemCnArr = [];
      let attendMemCnIdArr = [];
      if (
        this.formData.attendMemCnId &&
        this.formData.attendMemCnId.length > 0
      ) {
        attendMemCnIdArr = this.formData.attendMemCnId.split(",");
        attendMemCnArr = this.formData.attendMemCn.split(",");
        attendMemCnIdArr.forEach((item, index) => {
          let obj = {};
          obj.deptHumanId = item;
          obj.perName = attendMemCnArr[index];
          obj.disabled = true;
          tempArr.push(obj);
        });
        this.selectDept = tempArr;
      }
      this.showOrgPer = true;
    },
    //选择参与人员
    // MemCnshowCompDialog(data, status, type, params, dtype) {
    //   this.MemCndialogState = false; // 关闭选择人员树弹窗
    //   let attendMemCnId = [];
    //   let attendMemCn = [];
    //   data &&
    //     data.map((item) => {
    //       attendMemCnId.push(item.id);
    //       attendMemCn.push(item.name);
    //     });
    //   this.formData.attendMemCn = attendMemCn.join(",");
    //   this.formData.attendMemCnId = attendMemCnId.join(",");
    // },
    getperList(data) {
      let attendMemCnId = [];
      let attendMemCn = [];
      data &&
        data.map(item => {
          attendMemCnId.push(item.deptHumanId);
          attendMemCn.push(item.perName);
        });
      if (attendMemCnId.length > 0) {
        this.formData.attendMemCn = attendMemCn.join(",");
        this.formData.attendMemCnId = attendMemCnId.join(",");
        return;
      }
      this.formData.attendMemCn = "";
      this.formData.attendMemCnId = "";
    },
    //流程选人选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; // 关闭选择人员树弹窗
      switch (dtype) {
        case "next":
          this.next(data[0], params);
          break;
      }
    },
    //清空
    selectReset() {
      this.formData.attendMemCn = "";
      this.formData.attendMemCnId = "";
    },
    //保存
    save() {
      return new Promise((resolve, reject) => {
        this.$refs["RefForm"].validate(valid => {
          if (valid) {
            if (this.formData.id != "") {
              this.formData.handleButton = "维护";
              this.$api.activityInformation
                .maintainActivity(this.formData)
                .then(res => {
                  this.formData = res.selectAll;
                  console.log(this.formData.attTitle, "附件名称保存打印");
                  // top.location =
                  //   window.location.href.split("?")[0] +
                  //   "?" +
                  //   "data=" +
                  //   res.selectAll.id;
                  if (this.attTitleID.length > 0) {
                    this.createFile();
                  }
                  this.$message({ type: "success", message: "保存成功！" });
                  if (this.showBtnis == true) {
                    this.$intent.closeWindow(this);
                  }
                  resolve(res);
                });
            } else {
              this.$api.activityInformation
                .getaddFormdata(this.formData)
                .then(res => {
                  this.formData.id = res.data.id;
                  this.id = res.data.id;
                  this.formData = res.data.selectAll;
                  // top.location =
                  //   window.location.href.split("?")[0] +
                  //   "?" +
                  //   "data=" +
                  //   res.data.id;
                  this.$intent.replace(this, {
                    path: "/secretary/datumManage/activityManage",
                    query: { data: this.id, type: "datumManage_index" }
                  });
                  if (this.attTitleID.length > 0) {
                    this.createFile();
                  }
                  this.$message({ type: "success", message: "保存成功！" });
                  if (this.showBtnis == true) {
                    this.$intent.closeWindow(this);
                  }
                  resolve(res);
                });
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写必填项"
            });
          }
        });
      });
    },
    //完成并发送
    finishSend() {
      this.singelCheckF = true;
      this.dialogTypeNow = "next";
      this.dialogType = "dosend";
      this.offenUse = true;
      this.loadingTree = true;
      this.canTab = false;
      this.$refs["RefForm"].validate(valid => {
        if (valid) {
          if (this.formData.id != "") {
            this.$api.activityInformation
              .sendActivity({ id: this.formData.id })
              .then(res => {
                //this.formData=res.selectAll
                this.dialogState = true;
                this.$nextTick(() => {
                  this.seletOptionsData = res.data.list;
                });
              });
          } else {
            this.$api.activityInformation
              .getaddFormdata(this.formData)
              .then(res => {
                this.id = res.data.id;
                this.formData.id = res.data.id;
                this.formData = res.data.selectAll;
                top.location =
                  window.location.href.split("?")[0] +
                  "?" +
                  "data=" +
                  res.data.selectAll.id;
                if (this.attTitleID.length > 0) {
                  this.createFile();
                }
                this.$api.activityInformation
                  .sendActivity({
                    id: this.formData.id
                  })
                  .then(res => {
                    //this.formData=res.selectAll
                    this.dialogState = true;
                    this.$nextTick(() => {
                      this.seletOptionsData = res.data.list;
                    });
                  });
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
    //选人之后完成发送
    next(person, params) {
      let inforUser = person.id.split("#");
      this.formData.handleButton = "完成并发送";
      this.formData.currentUserId = person.idStr; //选择人humanid
      this.formData.currentUser = person.name; //选择人名称
      this.formData.currentDept = inforUser[1]; //选择人部门
      this.formData.curNodeName = params.name; //下一节点名称
      this.formData.curNodeId = params.id; //下一节点id
      this.$api.activityInformation
        .maintainActivity(this.formData)
        .then(res => {
          this.$message({
            type: "success",
            showClose: true,
            message: res.msg
          });
          this.$intent.closeWindow(this);
        })
        .catch(err => {});
    },
    // 完成并发送直接返回
    GoBack() {
      this.$api.activityInformation.Recback({ ...this.formData }).then(res => {
        this.$message({
          message: "返回上一级成功",
          type: "success"
        });
        this.$intent.closeWindow(this);
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
      if (this.formData.id) {
        this.$intent.goNewPage(this, {
          path: "/LeaderActivities",
          query: { dataList: this.formData.id, type: this.$route.query.type }
        });
      } else {
        this.$message({
          type: "error",
          message: "请先保存数据"
        });
      }
      // let data = this.$router.resolve({
      //   path: "/LeaderActivities",
      //   query: { dataList: this.formData.id, type: this.$route.query.type }
      // });
      // window.open(data.href, "_blank");
    },
    //办结前是否保存
    FinishWord() {
      if (this.formData.id == "") {
        this.$api.activityInformation
          .getaddFormdata(this.formData)
          .then(res => {
            this.formData.id = res.data.id;
            this.id = res.data.id;
            if (this.attTitleID.length > 0) {
              this.createFile();
            }
            this.banjie();
          });
      } else {
        // this.banjie();
      }
    },
    //办结
    banjie() {
      this.formData.handleButton = "办结";
      this.$api.activityInformation.FinishActivity(this.formData).then(res => {
        this.$message({
          message: "办结完成",
          type: "success"
        });
        this.$intent.closeWindow(this);
      });
    },
    //按钮
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.save();
          break;
        case "完成并发送":
          this.save().then(res => {
            if (
              this.backFlag1 &&
              !!this.formData.oldUserCode &&
              this.formData.curNodeName != "起草"
            ) {
              this.$confirm(
                "是否返回" + this.formData.oldUserName + "?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
                .then(() => {
                  // 调用新返回
                  this.formData.handleButton = "完成并发送";
                  this.GoBack();
                })
                .catch(() => {
                  console.log("34343434");
                  this.finishSend();
                });
            } else {
              console.log("565656");
              this.finishSend();
            }
          }).catch(error=>{
            this.$message.warning(error.msg)
          })

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
          let titleId = "printHtml";
          let that = this;
          let activetyTitle = this.formData.draftOrgan + "领导活动资料管理单";
          let draftInfo = this.formData.attchmentFileInfo;
          exportTable.getPdf(
            activetyTitle,
            draftInfo,
            titleId,
            this.$businessCode.msgzfj,
            activetyTitle,
            that
          );
          break;
        case "打印处理单":
          this.Printprocessing();
          break;
        case "办结":
          if (this.formData.id) {
            this.$confirm("是否办结?", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }).then(() => {
              // this.FinishWord();
              this.banjie();
            });
          } else {
            // this.banjie();
            this.$message({
              type: "warning",
              message: "请先保存数据"
            });
          }

          break;
      }
    },
    getHuanJie() {
      this.$api.activityInformation
        .ControlActivity({ id: this.id })
        .then(res => {
          this.huanJieMessage = res.Fields;
          this.setConfig();
        });
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制域
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
      this.rules = {
        activeDate: [
          {
            required: this.requiredFields.ActiveDate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        activeTime: [
          {
            required: this.requiredFields.ActiveTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        activeAddress: [
          {
            required: this.requiredFields.ActiveAddress,
            message: "不能为空",
            trigger: "change"
          }
        ], //地点
        attendMemCn: [
          {
            required: this.requiredFields.AttendMemCN,
            message: "不能为空",
            trigger: "change"
          }
        ], //参与人员
        title: [
          {
            required: this.requiredFields.Title,
            message: "不能为空",
            trigger: "change"
          }
        ], //活动名称
        activeType: [
          {
            required: this.requiredFields.ActiveType,
            message: "不能为空",
            trigger: "change"
          }
        ], //活动类型
        activeContent: [
          {
            required: this.requiredFields.ActiveContent,
            message: "不能为空",
            trigger: "change"
          }
        ], //活动描述
        attTitle: [
          {
            required: this.requiredFields.AttTitle,
            message: "不能为空",
            trigger: "change"
          }
        ] //附件名称
      };
    },
    loadData() {
      this.$api.activityInformation
        .viewActivity({ id: this.$route.query.id, type: 0 })
        .then(res => {
          this.formData = res.data;
          if (res.data.attTitle) {
            this.formData.attTitle = res.data.attTitle.replace(/n/g, "\n");
          }
          this.id = res.data.id;
          this.backFlag1 = res.backFlag1;
          this.getFileList();
          // this.formData.oldUserName = res.data.oldUserName
          this.$set(this.formData, "oldUserName", res.data.oldUserName);
          this.uploadConfig.id = res.data.id; //把详情ID给附件传过去，拿到上传过的附件的数据
        });
    },
    //权限调用
    // this.shanchubtn=='false' || JSON.parse(localStorage.getItem('userInfo')).humanName==this.formData.authorCn
    quanxian() {
      let stepJudge = JSON.parse(localStorage.getItem("tcHumanRole"));
      stepJudge.map(node => {
        if (
          node.dicId == 382 ||
          JSON.parse(localStorage.getItem("userInfo")).humanName ==
            this.formData.authorCn
        ) {
          //删除按钮显示和隐藏
          this.shanchubtn = "true";
        }
      });
      console.log(this.shanchubtn, "this.shanchubtn");
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
    if (this.$route.query.id) {
      this.formData.id = this.$route.query.id;
      this.id = this.$route.query.id; //暂时写一个变量
      this.loadData();
    }
    this.getHuanJie(); //控制域
    console.log(
      this.formData.authorCn,
      "this.formData.authorCn",
      JSON.parse(localStorage.getItem("userInfo")).humanName
    );

    this.quanxian();
    this.activeTypeRequest(); //活动类型
  }
};
</script>
// <style lang="less">
// .el-message-box__btns .el-button:first-child {
//   transform: translateX(75px) !important;
// }
//
</style>
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
.tree_w1 {
  height: 100px;
  padding: 0;
  // overflow: scroll;
  margin: 0;
}
// 收藏
.tablePrint {
  position: absolute;
  z-index: -999;
}
/deep/.el-col-23 {
  width: 100%;
}
</style>
