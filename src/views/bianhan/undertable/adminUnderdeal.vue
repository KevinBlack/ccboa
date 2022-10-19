<template>
  <div class="process_order" id="bianhanzhifa">
    <!-- 将表单内容抽成一个table表格，用于收藏表单数据 -->
    <collectionPage :formdata="formdata" pagetype="cb" :editedIdeaFields="editedIdeaFields"></collectionPage>
    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
        <template >
          <el-button
            plain
            @click="buttonClick('保存')"
            v-show="!inputDisable"
            class="bank_grid_comtent_active"
          >保存</el-button>
          <el-button plain @click="buttonClick('查看流程')" class="bank_grid_comtent_active">查看流程</el-button>
          <el-button plain @click="buttonClick('打印处理单')" class="bank_grid_comtent_active">打印处理单</el-button>
          <el-button plain @click="buttonClick('收藏')" class="bank_grid_comtent_active">收藏</el-button>
          <el-button plain @click="buttonClick('操作指南')" class="bank_grid_comtent_active">操作指南</el-button>
          <el-button plain @click="buttonClick('维护')" class="bank_grid_comtent_active">维护</el-button>
          <el-button plain @click="buttonClick('流程调度')" class="bank_grid_comtent_active">流程调度</el-button>
        </template>
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">{{formdata.deptTableHeader}}</div>
    </div>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <sidebarNavigation container="#bank_dispach_content"></sidebarNavigation>

      <div class="bank_dispach_file">
        <div class="process_content">
          <div class="message_tip" v-if="formdata.feedbackMode!='0'">请及时办理并反馈来函部门</div>
          <div class="cur_box">
            <div class="cur_sess">
              <p>
                当前环节：
                <span>{{formdata.undertakeCurrentlinks}}</span>
              </p>
              <p>
                当前处理人：
                <span>{{formdata.currentNowName}}</span>
              </p>
            </div>
            <div class="feed_back">
              <p class="label_title">反馈方式</p>
              <template>
                <el-radio-group v-model="formdata.feedbackMode" disabled>
                  <el-radio :label="'0'">无需反馈</el-radio>
                  <el-radio :label="'1'">反馈意见</el-radio>
                  <el-radio :label="'2'">反馈意见及附件</el-radio>
                </el-radio-group>
              </template>
            </div>
          </div>
          <el-form label-width="120px" :model="formdata">
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row>
              <el-col :span="formdata.feedbackMode!='0'?16:24">
                <el-form-item label="正文标题">
                  <el-input v-model="formdata.title" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.feedbackMode!='0'">
                <el-form-item label="反馈截止日期">
                  <el-date-picker
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formdata.feedTime"
                    style="width: 100%"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="formdata.bnbh?24:16">
                <el-form-item label="编号" prop="documentNo">
                  <el-input v-model="formdata.documentNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.isBnBh">
                <el-form-item v-if='isZH' label prop="isbnbh" style="text-align: right">
                  <el-checkbox
                    v-model="formdata.isBnBh"
                    true-label="1"
                    false-label="0"
                    disabled
                  >部内便函</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="接收日期" prop="receiveDate">
                  <el-input v-model="formdata.receiveDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="主送">
              <el-input
                v-model="formdata.main"
                disabled
                type="textarea"
                :autosize="{ minRows: 1}"
                class="zhusong"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="抄送">
              <el-input
                v-model="formdata.copy"
                disabled
                type="textarea"
                :autosize="{ minRows: 1}"
                class="chaosong"
                resize="none"
              ></el-input>
            </el-form-item>

            <div class="editor_box" style="position:relative">
              <label>内容</label>
              <UE :defaultMsg="formdata.content" :config="config" id="UE" ref="ue"></UE>
            </div>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿部门">
                  <el-input v-model="formdata.draftDepartmentOne" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期">
                  <el-date-picker
                    type="date"
                    v-model="formdata.draftTime"
                    style="width: 100%"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿人">
                  <el-input v-model="formdata.draftUser" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <el-input v-model="formdata.phone" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="移动端展示" v-if="isZH">
              <el-radio-group v-model="formdata.isMobileServiceShow" disabled>
                <el-radio :label="'0'">是</el-radio>
                <el-radio :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>

            <el-form-item label="签发意见">
              <template>
                <format-form-fild :arrayList="formdata.sendList" disabled></format-form-fild>
                <el-row v-if="!(formdata.sendList && formdata.sendList.length!=0)">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      :disabled="true"
                    ></el-input>
                  </el-col>
                </el-row>
              </template>
            </el-form-item>
            <!-- <controllableEditingField 
             :isWeiHu="inputDisable" lableTitle='签发意见' 
              listtype='send'
            :formadatalist='formdata.sendList' @delefunc='delefunc'></controllableEditingField>-->

            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="最终意见"
              listtype="final"
              :formadatalist="formdata.zzOpinion"
              @delefunc="delefunc"
            ></controllableEditingField>

            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="过程意见"
              listtype="process"
              :formadatalist="formdata.processList"
              @delefunc="delefunc"
            ></controllableEditingField>

            <el-form-item label="传阅意见">
              <div v-for="item in formdata.cyList" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows:3}"
                        resize="none"
                        :value="item.content"
                        disabled
                        class="d_f1"
                      ></el-input>
                      <div v-for="file in item.attachmentPos" :key="file.id">
                        <span
                          class="name down"
                          style="cursor:pointer;background-color: rgba(228,231,237,.32)"
                          @click="viewFile(file)"
                        >{{file.fileName}}</span>
                      </div>
                      <div class="adviceInfo" style="position: static;right: 0;">
                        {{item.departmentName}}
                        <span class="pad_lr10">{{item.userName}}</span>
                        {{item.createTime}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <el-input
              v-if="!(formdata.cyList && formdata.cyList.length!=0)"
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                disabled
              ></el-input>
            </el-form-item>

            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="备注"
              listtype="comment"
              :formadatalist="formdata.commentsList"
              @delefunc="delefunc"
            ></controllableEditingField>

            <el-form-item label="传阅人员">
              <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                <div class="clear-fix chuanyue1">
                  <p class="chuanyue-p1">未阅</p>
                  <el-input
                    class="chuanyue-p2 chuanyue-textarea"
                    v-model="formdata.wyPle"
                    type="textarea"
                     disabled
                    :autosize="{ minRows:2}"
                    resize="none"
                  ></el-input>
                </div>
                <div class="clear-fix chuanyue chuanyue-textarea2">
                  <p class="chuanyue-p1">已阅</p>
                  <el-input
                    class="chuanyue-p2"
                    type="textarea"
                    :autosize="{ minRows:2}"
                    resize="none"
                     disabled
                    v-model="formdata.yyPle"
                  ></el-input>
                </div>
              </div>
            </el-form-item>

            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              v-if="formdata.attchmentFileInfoZhi&&formdata.attchmentFileInfoZhi.length"
              :canmoveOrdown="false"
              label="制发单附件"
              :fileList="formdata.attchmentFileInfoZhi"
              disabled
            ></upfileList>

            <upfileList
              v-if="formdata.feedbackMode=='2'||formdata.feedbackMode=='1'"
              :canmoveOrdown="!inputDisable"
              label="承办单附件"
              :fileList="formdata.attchmentFileInfo"
            >
              <upload-file-ts
                :uploadConfig="uploadConfig"
                :fileId="fileId"
                :disabled="inputDisable"
                @fileList="fileList"
              ></upload-file-ts>
            </upfileList>
          </el-form>
        </div>
      </div>
    </div>

    <!--流程调度树-->
    <select-person
      v-model="dialogState"
      :seletOptionsData="seletOptionsData"
      :orgOrDeptId="selsecOrgOrDeptId"
      @showCompDialog="showCompDialog"
    ></select-person>

    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <idea-dialog
      v-model="showIdeaDialog"
      :showFile="showFile"
      @ideaIsOk="ideaIsOk"
      :oldIdea="formdata.finalOpinion"
      :id="this.id"
    ></idea-dialog>

    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>

    <!---常用批语---->
    <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts>
  </div>
</template>

<script type="text/ecmascript-6">
import beanList from "../../../util/beanList";
import cyPersonList from "../components/cyPersonList";
import selectPerson from "components/viewFlow/dispatchTree"; //流程调度树
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import minixs from "../../../minixs/index";
import ideaDialog from "../components/ideaDialog";
import UE from "components/editor/ue.vue";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import writeListTs from "components/viewFlow/writeListTs";
import exportTable from "../../../minixs/exportTable";
import sidebarNavigation from "../components/sidebarNavigation";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import viewDraft from "@/minixs/viewDraft";
import formatFormFild from "../components/formatFormFiled";
import controllableEditingField from "../components/controllableEditingField";
import collectionPage from "../components/collectionPage";
import upfileList from "../components/showUploadFile"; //附件展示

export default {
  name: "proceorderdeal",
  components: {
    selectPerson,
    // flowChart,
    shiwuFlow,
    ideaDialog,
    cyPersonList,
    UE,
    writeListTs,
    uploadFileTs,
    sidebarNavigation,
    formatFormFild,
    controllableEditingField,
    collectionPage,
    upfileList
  },
  mixins: [minixs, openOrDownLoadFile, bianhanPublic,viewDraft],
  data() {
    return {
      fileId: "",
      selsecOrgOrDeptId: "", //流程调度机构
      scircularizeLevel: "1", //传阅常用联系人修改 12.21
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      buttonDisabled: false, //按钮是否禁用,解决网络延迟引起的点击按钮报错问题
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000",
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      showCyPerson: false,
      cyData: [],
      loadingTree: true,
      showIdeaDialog: false,
      showFile: false,
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      appendWriteDialog: false, //常用批语
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wcbfs", show: false },
        { name: "办理完毕", type: "blwb", show: false },
        { name: "反馈制发单位", type: "fkzfdw", show: false },
        { name: "清空所有过程意见", type: "qksygcyj", show: false },
        { name: "传阅", type: "cy", show: false },
        { name: "传阅收回", type: "cysh", show: false },
        { name: "查看流程", type: "cklc", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "czzn", show: false },
        { name: "维护", type: "weihu", show: false },
        { name: "流程调度", type: "lichengdiaodu", show: false },
        { name: "删除", type: "shanchu", show: false }
      ],
      readFields: {
        Creator: false,
        IsFeedBack: false,
        IsSenInfo: false,
        Telephone: false,
        CreateDate: false,
        DraftDepart: false,
        Title: false,
        isMobileServiceShow: false,
        isBnBh: false
      }, //不可编辑控制域
      requiredFields: {
        Creator: "",
        IsFeedBack: "",
        IsSenInfo: "",
        Telephone: "",
        DraftDepart: "",
        CreateDate: "",
        Title: "",
        isMobileServiceShow: "",
        isBnBh: ""
      }, //必填控制域
      editedIdeaFields: {
        Remark: true,
        cyyj: true,
        shyj: true,
        yjps: true
      }, //可编辑意见域
      requiredIdeaFields: {
        Remark: false,
        cyyj: false,
        shyj: false,
        yjps: false
      }, //必填意见域
      formdata: { zzList: [], processList: [] },
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
       isMulti:this.$route.query.ismulti,
      radio: 0,
      dialogFormVisible: false,
      choocePer: [],
      huanJieMessage: {},

      showFlowChart: false,
      flowChartList: [],

      treeData: [], //人员树
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      checkOrg: false,
      inputDisable: true //表单类是否可编辑
    };
  },
  computed: {},
  created() {
    this.id = this.$route.query.id;
    this.fileId = this.$route.query.id;
    sessionStorage.setItem("fileId", this.fileId);
    this.loadData();
  },
  mounted() {
    // this.handleSetLoacl();
  },
  methods: {
    //常用批语
    showWriteList(type) {
      this.clickTypes = type;
      this.appendWriteDialog = true;
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "zuizhong":
          this.$set(
            this.formdata,
            "finalOpinion",
            this.formdata.finalOpinion
              ? this.formdata.finalOpinion + data
              : data
          );
          break;
        case "guocheng": //processOpinion
          this.$set(
            this.formdata,
            "processOpinion",
            this.formdata.processOpinion
              ? this.formdata.processOpinion + data
              : data
          );
          break;
      }
    },
    delefunc(item) {
      this.$api.bianhan.delProcessList(item).then(res => {
        this.loadData();
      });
    },
    getHuanJie() {
      this.$api.bianhan.getHuanJie({ id: this.id, type: "1" }).then(res => {
        this.huanJieMessage = res.Fields;
        this.readFields = this.setReadFields(
          this.readFields,
          this.huanJieMessage.readFields
        ); //不可编辑控制域
        this.buttonList = this.showButton(
          this.buttonList,
          this.huanJieMessage.visibleButtons,
          this.huanJieMessage.visibleButtonsBycondition
        ); //按钮
        this.editedIdeaFields = this.setEditedIdeaFields(
          this.editedIdeaFields,
          this.huanJieMessage.editedIdeaFields,
          this.huanJieMessage.editedIdeaFieldsBycondition
        ); //可编辑意见域
        this.requiredIdeaFields = this.setRequiredIdeaFields(
          this.requiredIdeaFields,
          this.huanJieMessage.requiredIdeaFields
        ); //可编辑意见域
      });
    },
    cyPersonList(data) {
      let ids = [];
      data.map(item => {
        ids.push(item.id);
      });
      this.$api.bianhan.cheHuiCy({ ids: ids.join(",") }).then(res => {
        this.loadData();
        this.$message({
          message: "传阅收回成功",
          type: "success"
        });
      });
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.save();
          break;
        case "办理完毕":
          this.formdata.type = "1";
          this.formdata.currentNode = "办结";
          this.buttonDisabled = true;
          this.$api.bianhan
            .underAlertData(this.formdata)
            .then(res => {
              this.$message({
                message: "办结完成",
                type: "success"
              });
              this.$intent.closeWindow(this);
            })
            .catch(item => {
              this.buttonDisabled = false;
            });
          break;
        case "反馈制发单位":
          this.formdata.type = "1";
          if (this.formdata.feedbackMode == "1") {
            if (
              this.formdata.finalOpinion ||
              this.formdata.zzOpinion.length > 0
            ) {
              this.formdata.currentNode = "办结";
              this.buttonDisabled = true;
              this.$api.bianhan
                .underAlertData(this.formdata)
                .then(res => {
                  this.$message({
                    message: "反馈制发单位成功",
                    type: "success"
                  });
                  this.$intent.closeWindow(this);
                })
                .catch(item => {
                  this.buttonDisabled = false;
                });
            } else {
              this.$message({
                message: "请填写最终意见",
                type: "error"
              });
            }
          } else if (this.formdata.feedbackMode == "2") {
            if (
              (this.formdata.finalOpinion &&
                this.formdata.attchmentFileInfo &&
                this.formdata.attchmentFileInfo.length) ||
              this.formdata.zzOpinion.length > 0
            ) {
              this.formdata.currentNode = "办结";
              this.buttonDisabled = true;
              this.$api.bianhan
                .underAlertData(this.formdata)
                .then(res => {
                  this.$message({
                    message: "反馈制发单位成功",
                    type: "success"
                  });
                  this.$intent.closeWindow(this);
                })
                .catch(item => {
                  this.buttonDisabled = false;
                });
            } else {
              this.$message({
                message: "请填写最终意见并上传附件",
                type: "error"
              });
            }
          }
          break;
        case "完成并发送":
        case "流程调度":
          this.loadingTree = true;
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.offenUse = true;
          this.checkData = []; //清空选中数据，避免和传阅选中数据混合
          this.toNext();
          break;
        case "传阅":
          break;
        case "清空所有过程意见":
          this.$confirm("请确认是否删除所有过程意见，是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.buttonDisabled = true;
            this.$api.bianhan
              .delProcessList({
                dataId: this.id,
                type: "3",
                year: getToday()
              })
              .then(res => {
                this.$message({ type: "success", message: "清空成功" });
                this.formdata.processOpinion = "";
                this.save();
              })
              .catch(item => {
                this.buttonDisabled = false;
              });
          });

          break;
        case "传阅收回":
          this.$api.bianhan
            .getNoCyList({ parentDocId: this.formdata.id, cyType: "CB",numYear:this.numyear })
            .then(res => {
              if (res.data && res.data.length == 0) {
                this.$message({ type: "success", message: "暂无未阅人员" });
              } else {
                res.data.forEach(item => {
                  item.name = item.curUserCn;
                });
                this.cyData = res.data;
                this.dialogTypeNow = "cy";
                this.showCyPerson = true;
              }
            });
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/bianhanCb",
            query: { id: this.id,numYear:this.numyear}
          });
          break;
        case "查看流程":
          this.$refs.dialogLine.openDialog();
          this.$api.bianhan
            .getLiuCheng({ id: this.id, type: "1",numYear:this.numyear })
            .then(res => {
              this.showFlowChart = true;
              this.flowChartList = res.list;
            });
          break;
        case "收藏":
          exportTable.collect(this, this.id, 'cb','',this.numyear)
          break;
        case "维护":
          this.inputDisable = !this.inputDisable;
          try {
            if (this.inputDisable) {
              this.$refs.ue.setDsabled();
            } else {
              this.$refs.ue.setEable();
              console.log(this.$refs.ue.setEable());
            }
          } catch (e) {}
          break;
        case "操作指南":
          this.handBook("BHGL");
          break;
      }
    },
    ideaIsOk(idea) {
      this.formdata.finalOpinion = idea;
      this.formdata.type = "0";
      this.buttonDisabled = true;
      this.$api.bianhan
        .underAlertData(this.formdata)
        .then(res => {
          this.formdata.undertakeCurrentlinks = "流转完毕（办结）";
          this.$api.bianhan
            .underAlertData(this.formdata)
            .then(res => {
              this.$message({
                message: "反馈完成",
                type: "success"
              });
              this.$intent.closeWindow(this);
            })
            .catch(item => {
              this.buttonDisabled = false;
            });
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    toNext() {
      this.buttonDisabled = true;
      this.$api.bianhan
        .getPerson({
          id: this.id,
          type: "1",
          admin: "admin", //区分是否是管理员维护
          year: new Date().getFullYear()
        })
        .then(res => {
          this.buttonDisabled = false;
          this.seletOptionsData = res.list;
          this.treeData = res.result.data;
          this.dialogState = true;
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    close() {
      this.buttonDisabled = true;  
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action) => {
          if (action === "confirm"&&this.id) {
            //点是
            this.formdata.type = "0";
            this.$api.bianhan.underAlertData(this.formdata).then(res => {
              this.$intent.closeWindow(this);
            });
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
             this.buttonDisabled = false;
          }
        },
      });
    },
    beforeSave(){
        let that=this;
      this.formdata.content =
        process.env.NODE_ENV == "production"
          ? this.$refs.ue.getUEContent()
          : "";
      this.formdata.type = "admin";
      //数据过滤，为新增或修改数据添加表单id,用于管理员数据维护
      try {
        this.formdata.commentsList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.processList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.zzOpinion.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
    },
    save() {
      let that = this;
      this.beforeSave();
      this.$api.bianhan.underAlertData(this.formdata).then(res => {
        that.$message({
          message: "保存成功",
          type: "success"
        });
        this.loadData();
      });
    },
    showCompDialog(data, status, type, params, dtype) {
    //  console.log("-------->", data, status, type, params, dtype);
      this.dialogState = false;
      switch (dtype) {
        case "next":
        case 1:
          this.next(data[0], params);
          break;
        default:
          break;
      }
    },
    //完成并发送
    next(person, params) {
      this.buttonDisabled = true;
      this.formdata.undertakeHandlePersonIds = person.id;
      this.formdata.undertakeHandlePerson = person.name;
      this.formdata.nextAvyId = params.id;
      this.formdata.type = "1";
      this.formdata.admin = "admin";
      this.formdata.undertakeCurrentlinks = params.name;
      this.$api.bianhan
        .underAlertData(this.formdata)
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });

          this.$intent.closeWindow(this);
          this.messageWarn(person.idStr, this.formdata.title, person.name);
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    getFileList() {
      //制发单附件
      this.$api.setSysConfig
        .getTextemList({ id: this.formdata.parentDocId,numYear:this.numyear })
        .then(res => {
          this.formdata.attchmentFileInfoZhi = res.data;
          this.$forceUpdate();
        });
      //承办单附件
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear }).then(res => {
        this.formdata.attchmentFileInfo = res.data;
        this.$forceUpdate();
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
      this.$forceUpdate();
    },
    loadData() {
      this.$api.bianhan
        .underDeal({ id: this.id, type: "admin",numYear:this.numyear,isMulti:this.isMulti })
        .then(res => {
          this.formdata = res.bHCbOrderDo;
          this.selsecOrgOrDeptId = this.formdata.undertakeOrganId;
          this.buttonDisabled = false;
          this.$set(this.formdata, "zzOpinion", []);
          this.$set(this.formdata, "commentsList", []);
          this.$set(this.formdata, "processList", []);
          this.formdata.receiveDate = res.bHCbOrderDo.receiveDate.slice(0, 10);
          this.formdata.draftDepartmentOne = res.draftDepartmentOne;
          this.formdata.draftDepartmentOneId = res.draftDepartmentOneId;
          try {
            this.formdata.cyList = res.cyList.filter(item => {
              this.$api.setSysConfig
                .getTextemList({ id: item.dataId, fileType: "10010",numYear:this.numyear })
                .then(res => {
                  this.$set(item, "attachmentPos", res.data);
                });
              // this.$forceUpdate();
              return item;
            });
          } catch (e) {
            this.formdata.cyList = res.cyList;
          }
          this.formdata.sendList = res.sendList;
          this.formdata.zzOpinion = res.zzOpinion;
          this.formdata.processList = res.processList;
          this.formdata.zzList = res.zzList;
          this.formdata.commentsList = res.commentsList;
          this.formdata.draftDepartmentOne =
            this.formdata.draftDepartmentOne || this.formdata.draftDepartment;
          this.formdata.wyIds = res.wyIds;
          this.formdata.yyIds = res.yyIds;
          this.getHuanJie();
          this.getFileList();
          setTimeout(() => {
            this.$refs.ue.setDsabled();
            this.$refs.ue.setUEContent(this.formdata.content);
          }, 1000);
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    }
  }
};
</script>
<style scoped lang="less">
/deep/.zhusong .el-textarea__inner,
/deep/.chaosong .el-textarea__inner {
  min-height: 31px !important;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
/deep/.el-textarea__inner[disabled] {
  background-color: #e4e7ed52 !important;
  color: #606266 !important;
  cursor: not-allowed;
}
/deep/.chuanyue-textarea textarea.el-textarea__inner {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 32px;
  border: 0;
  outline: medium;
  padding: 0;
  min-height: 31px !important;
  height: auto;
  line-height: 31px;
}
/deep/.chuanyue-textarea2 textarea.el-textarea__inner {
  min-height: 31px !important;
  margin-top: 0px;
  margin-bottom: 0px;
  height: 32px;
  padding: 0;
  height: auto;
  line-height: 31px;
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}

.bank_dispach_content {
  width: 100%;
  height: auto;
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.process_order {
  background: white;
  min-height: 1000px;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    width: 100%;
    height: 70px;
    line-height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
    // justify-content: space-between;
    align-items: center;

    .left {
      margin-left: 20px;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;
  }

  .process_content {
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;

    .message_tip {
      margin-left: 3%;
      font-size: 20px;
      line-height: 50px;
      color: red;
    }

    .cur_box {
      .el-radio-group {
        margin-top: 9px !important;
        margin-right: 12px !important;
      }

      .el-radio {
        margin-right: 0 !important;
        margin-left: 16px !important;
      }

      .cur_sess {
        float: left;
        display: flex;
        margin-top: 15px;

        p {
          // height: 30px;
          line-height: 6px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
        }
      }

      .feed_back {
        float: right;
        display: flex;
        font-size: 14px;
        height: 30px;
        line-height: 6px;
        color: #0f100e;
        margin-top: 3px;

        .label_title {
          margin-top: 12px;
        }
      }
    }

    .form_taxt {
      width: 90%;
      height: 100%;
      margin: 0 auto;

      .el-form-item__label {
        text-align: left !important;
      }

      .annex_btn_list {
        width: 86%;
        margin: 0 auto;
        margin-top: 16px;
        display: flex;

        div {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #0562c7;
          color: #fff;
          border-radius: 5px;
          margin-left: 16px;
          cursor: pointer;
        }

        div:nth-child(4) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }

        div:nth-child(5) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }
      }
    }

    .editor_box {
      height: 450px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 130px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}

.adviceInfo {
  position: absolute;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
  background-color: rgba(228, 231, 237, 0.32);
}

.pad_lr10 {
  padding: 0 10px;
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

.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}

.chuanyue1 {
  border-bottom: 1px solid #ccc;
}

.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
  min-height: 62px;
  line-height: 62px;
}

.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.select-chang {
  padding: 5px;
  font-size: 18px;
  margin-right: 8px;
  cursor: pointer;
}
</style>
