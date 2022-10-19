<template>
  <div class="process_order" id="bianhanzhifa" v-if="isShowDocument">
    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
        <template v-if="!isfinish">
          <el-button
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.name)"
            :key="index"
            :disabled="buttonDisabled"
            class="bank_grid_comtent_active"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
        </template>
        <template v-else>
          <el-button plain @click="buttonClick('查看流程')">查看流程</el-button>
          <el-button plain @click="buttonClick('打印处理单')">打印处理单</el-button>
          <el-button plain @click="buttonClick('收藏')">收藏</el-button>
          <el-button plain @click="buttonClick('操作指南')">操作指南</el-button>
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
                <el-radio-group v-model="formdata.feedbackMode" :disabled="inputDisable">
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
                <el-form-item :label="bianhanLabelcb.title">
                  <el-input v-model="formdata.title" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.feedbackMode!='0'">
                <el-form-item label="反馈截止日期">
                  <el-date-picker
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formdata.feedTime"
                    style="width: 100%"
                    :disabled="inputDisable"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="编号" prop="documentNo">
                  <el-input v-model="formdata.documentNo" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item　v-if="isZH" label prop="isbnbh" style="text-align: right">
                  <el-checkbox
                    v-model="formdata.isBnBh"
                    true-label="1"
                    false-label="0"
                    :disabled="inputDisable"
                  >部内便函</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="接收日期" prop="receiveDate">
                  <el-input v-model="formdata.receiveDate" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="主送">
              <el-input
                v-model="formdata.main"
                :disabled="inputDisable"
                type="textarea"
                :autosize="{ minRows: 1}"
                class="zhusong"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="抄送">
              <el-input
                v-model="formdata.copy"
                :disabled="inputDisable"
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
                  <el-input v-model="formdata.draftDepartmentOne" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期">
                  <el-date-picker
                    type="date"
                    v-model="formdata.draftTime"
                    style="width: 100%"
                    :disabled="inputDisable"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿人">
                  <el-input v-model="formdata.draftUser" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <el-input v-model="formdata.phone" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="移动端展示" v-if="isZH">
              <el-radio-group v-model="formdata.showApp" :disabled="inputDisable">
                <el-radio :label="'0'">是</el-radio>
                <el-radio :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见">
              <template>
                <el-row v-if="!(formdata.sendList && formdata.sendList.length!=0)">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      :disabled="inputDisable"
                    ></el-input>
                  </el-col>
                </el-row>
                <format-form-fild
                :isInput='isInput'
                  :arrayList="formdata.sendList"
                  :disabled="inputDisable"
                  :isUndertakeOver="formdata.isUndertakeOver"
                  :lastOptionTime="lastOptionTime"
                  :currentUserId="formdata.undertakeHandlePersonIds"
                  v-on:deteleteOptionFun="deteleteOptionFun"
                ></format-form-fild>
              </template>
            </el-form-item>
            <el-form-item label="最终意见">
              <el-col :span="23">
                <el-input
                  type="textarea"
                  :autosize="{ minRows:3}"
                  v-model="formdata.finalOpinion"
                  placeholder="填写意见不可多于500字"
                  maxlength="500"
                  show-word-limit
                  resize="none"
                  v-if="!editedIdeaFields.zzyj||!(formdata.zzOpinion && formdata.zzOpinion!=0)"
                  :disabled="editedIdeaFields.zzyj"
                ></el-input>
              </el-col>
              <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.zzyj">
                <i class="icon-font el-icon-edit select-chang" @click="showWriteList('zuizhong')"></i>
              </el-col>
              <format-form-fild
              :isInput='isInput'
                :arrayList="formdata.zzOpinion"
                :disabled="inputDisable"
                :isUndertakeOver="formdata.isUndertakeOver"
                :lastOptionTime="lastOptionTime"
                :currentUserId="formdata.undertakeHandlePersonIds"
                v-on:deteleteOptionFun="deteleteOptionFun"
              ></format-form-fild>
            </el-form-item>
            <el-form-item label="过程意见">
              <el-col :span="23">
                <el-input
                  type="textarea"
                  :autosize="{ minRows:3}"
                  placeholder="填写意见不可多于500字"
                  maxlength="500"
                  show-word-limit
                  resize="none"
                  v-model="formdata.processOpinion"
                  v-if="!editedIdeaFields.gcyj||!(formdata.processList && formdata.processList.length!=0)"
                  :disabled="editedIdeaFields.gcyj"
                ></el-input>
              </el-col>
              <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.gcyj">
                <i class="icon-font el-icon-edit select-chang" @click="showWriteList('guocheng')"></i>
              </el-col>
              <format-form-fild
              :isInput='isInput'
                :arrayList="formdata.processList"
                :disabled="inputDisable"
                :isUndertakeOver="formdata.isUndertakeOver"
                :lastOptionTime="lastOptionTime"
                :currentUserId="formdata.undertakeHandlePersonIds"
                v-on:deteleteOptionFun="deteleteOptionFun"
              ></format-form-fild>
            </el-form-item>
            <el-form-item label="传阅意见">
              <el-col :span="23">
              <el-input
                v-if="!(formdata.cyList && formdata.cyList.length!=0)"
                type="textarea"
                :autosize="{ minRows:3}"
                resize="none"
                disabled
              ></el-input>
              </el-col>
               <format-form-fild :isInput='isInput' :arrayList="formdata.cyList"></format-form-fild>
            </el-form-item>
            <el-form-item label="备注">
              <template>
                <el-col
                  :span="23"
                  v-if="!editedIdeaFields.Remark||!(formdata.commentsList && formdata.commentsList.length!=0)"
                >
                  <el-input
                    type="textarea"
                    :autosize="{ minRows:3}"
                    resize="none"
                    v-model="formdata.comments"
                    placeholder="填写意见不可多于500字"
                    maxlength="500"
                    show-word-limit
                    :disabled="editedIdeaFields.Remark"
                  ></el-input>
                </el-col>
                <format-form-fild
                :isInput='isInput'
                  :arrayList="formdata.commentsList"
                  :isUndertakeOver="formdata.isUndertakeOver"
                  :lastOptionTime="lastOptionTime"
                  :currentUserId="formdata.undertakeHandlePersonIds"
                  v-on:deteleteOptionFun="deteleteOptionFun"
                ></format-form-fild>
              </template>
            </el-form-item>
            <el-col :span="23">
            <el-form-item label="传阅人员">
              <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                <div class="clear-fix chuanyue1">
                  <p class="chuanyue-p1">未阅</p>
                  <el-input
                    class="chuanyue-p2 chuanyue-textarea"
                    disabled
                    v-model="formdata.wyPle"
                    type="textarea"
                    :autosize="{ minRows:2}"
                    resize="none"
                  ></el-input>
                </div>
                <div class="clear-fix chuanyue chuanyue-textarea2">
                  <p class="chuanyue-p1">已阅</p>
                  <el-input
                    class="chuanyue-p2"
                    disabled
                    type="textarea"
                    :autosize="{ minRows:2}"
                    resize="none"
                    v-model="formdata.yyPle"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
            </el-col>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              v-if="formdata.attchmentFileInfoZhi&&formdata.attchmentFileInfoZhi.length"
              :canmoveOrdown="false"
              label="制发单附件"
              :fileList="formdata.attchmentFileInfoZhi"
            ></upfileList>

            <upfileList
              v-if="formdata.feedbackMode=='2'||formdata.feedbackMode=='1'"
              :canmoveOrdown="true"
              label="承办单附件"
              :fileList="formdata.attchmentFileInfo">
              <upload-file-ts :uploadConfig="uploadConfig" :fileId="fileId" @fileList="fileList"></upload-file-ts>
            </upfileList>
          </el-form>
        </div>
      </div>
    </div>

    <select-person
      :canTab="false"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      :fromdata="formdata"
      dialogTit="选择人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :isMulti="isMulti"
      :checkOrg="checkOrg"
      @showCompDialog="showCompDialog"
    ></select-person>

    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <idea-dialog
      v-model="showIdeaDialog"
      :showFile="showFile"
      title="写承办意见"
      btn_sure='反馈承办意见'
      @ideaIsOk="feedBackIssue"
      :id="this.id"
    ></idea-dialog>

    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>

    <treeCofigForCy
      :treeData="treeDataForCy"
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
      @showCompDialog="showCompDialogForCy"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>

    <!---常用批语---->
    <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts>
  </div>
</template>

<script type="text/ecmascript-6">
import beanList from "../../../util/beanList";
import cyPersonList from "../components/cyPersonList";
import selectPerson from "components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import minixs from "../../../minixs/index";
import viewDraft from "@/minixs/viewDraft";
import ideaDialog from "../components/ideaDialog";
import UE from "components/editor/ue.vue";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import writeListTs from "components/viewFlow/writeListTs";
import exportTable from "../../../minixs/exportTable";
import sidebarNavigation from "../components/sidebarNavigation";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import formatFormFild from "../components/formatFormFiled";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
import upfileList from "../components/showUploadFile"; //附件展示
import formTextChange from "@/minixs/yongyinText/changgui"; //控制label

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
    treeCofigForCy,
    upfileList
  },
  mixins: [minixs, openOrDownLoadFile, bianhanPublic,formTextChange,viewDraft],
  data() {
    return {
      isMulti:false,//检查环节是否是多人模式,false为不开启检查
      isShowDocument:true,
      isAuthorizeOthers: true, // 是否转授权给其他人， true 为转授权不能修改任意内容，false 为 未转授权
      otherBank:true, //是否展示他行群组
      isInput:true,
      lastOptionTime: "0",
      isfinish: false, //表单是否是办结状态
      fileId: "",
      scircularizeLevel: "1", //传阅常用联系人修改 12.21
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      cyCheckData: [], //选中数据
      isCY: "",
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      buttonDisabled: false, //按钮是否禁用,解决网络延迟引起的点击按钮报错问题
      seletOptionsDataForCy: [],
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
        { name: "增加承办人", type: "zjcbr", show: false },
        { name: "反馈制发单位", type: "fkzfdw", show: false },
        { name: "反馈意见", type: "fkyj", show: false },
        { name: "清空所有过程意见", type: "qksygcyj", show: false },
        { name: "传阅", type: "cy", show: false },
        { name: "传阅收回", type: "cysh", show: false },
        { name: "办理完毕", type: "blwb", show: false },
        { name: "查看流程", type: "cklc", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "czzn", show: false },
        { name: "维护", type: "weihu", show: false },
        { name: "流程调度", type: "lichengdiaodu", show: false },
        { name: "删除", type: "shanchu", show: false }
      ],
        buttonListAuthorizeOthers: [
        { name: "查看流程", type: "ckliucheng", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "caozuozhinan", show: true }
      ],
      readFields: {
        Creator: false,
        IsFeedBack: false,
        IsSenInfo: false,
        Telephone: false,
        CreateDate: false,
        DraftDepart: false,
        Title: false,
        showApp: false,
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
        showApp: "",
        isBnBh: ""
      }, //必填控制域
      editedIdeaFields: {
        Remark: true,
        cyyj: true,
        shyj: true,
        yjps: true,
        gcyj:true,
        zzyj:true
      }, //可编辑意见域
      requiredIdeaFields: {
        Remark: false,
        cyyj: false,
        shyj: false,
        yjps: false
      }, //必填意见域
      formdata: { 
        wcbfsbc:'0',//完成并发送是1，保存是2, 0是其他没有处理
        zzList: [], 
        processList: [] 
      },
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      isMultiParams:this.$route.query.ismulti,
      radio: 0,
      dialogFormVisible: false,
      choocePer: [],
      huanJieMessage: {},

      showFlowChart: false,
      flowChartList: [],

      treeData: [], //人员树
       treeDataForCy: [],
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
      inputDisable: true,//表单类是否可编辑,
      isMultiLimit:false,//是否是在多人环节且权限受限节点，默认为否
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
    //label动态获取
    this.$nextTick(function() {
      this.formTextChange('bhgl_cb')
    });
  },
  methods: {
    cancleStatus(status){
        let self=this;
        let  wcbfs=this.buttonList.findIndex(item=>item.name=='完成并发送');
        let  zjcbr=this.buttonList.findIndex(item=>item.name=='增加承办人');
        let  fkyj=this.buttonList.findIndex(item=>item.name=='反馈意见');
        this.$api.bianhan
            .getIsAddFlag({
            id:this.formdata.id
            })
            .then(res => {
      //当前单子处理状态 
      //3可以进行完成并发送操作，无发送承办人操作,无反馈意见按钮
      //0,1,无完成并发送操作，有发送承办人操作，有反馈意见按钮
      //2，无完成并发送操作，无发送承办人操作，无反馈意见按钮

      switch(res.addFlag){
        case 3:
        case '3':
          self.buttonList[wcbfs].show=true;
          self.buttonList[zjcbr].show=false;
          self.buttonList[fkyj].show=false;
          self.isMultiLimit=false;
          break;
        case 0:
        case '0':
        case 1:
        case '1':
          self.buttonList[wcbfs].show=false;
          self.buttonList[zjcbr].show=true;
          self.buttonList[fkyj].show=true;
          self.isMultiLimit=true;
          break;
        default:
          self.buttonList[wcbfs].show=false;
          self.buttonList[zjcbr].show=false;
          self.buttonList[fkyj].show=false;
          self.isMultiLimit=true;
          break;
      }
      //合并isMultiLimit条件
      this.editedIdeaFields = this.setEditedIdeaFields(
          this.editedIdeaFields,
          this.huanJieMessage.editedIdeaFields,
          this.huanJieMessage.editedIdeaFieldsBycondition
        ); //可编辑意见域
      });
    },
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
    //若表单为收回的表单，可以删除当前处理人最后一条意见
    deteleteOptionFun(item) {
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
        if(this.isMulti){
          this.cancleStatus();
        }
        
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
    backToOldUser(){
      this.buttonDisabled = true;
      this.formdata.type = "1";
      this.formdata.nextAvyId=this.formdata.supNodeCode;
      this.$api.bianhan
        .underAlertData(this.formdata)
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });
         
          this.$intent.closeWindow(this);
          this.messageWarn(person.idStr,this.formdata.title,person.name,'underdeal',
            this.formdata.id)
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
     },
     //反馈承办意见
     feedBackIssue(idea){
      this.$api.bianhan
        .feedBackIssue({
          dataId: this.id,
          content: idea,//意见内容
        })
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });      
          this.$intent.closeWindow(this);
        })
     },
    buttonClick(params) {
      this.formdata.wcbfsbc = '0';
       let self = this;
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.formdata.wcbfsbc = '2';
          this.save();
          break;
        case "办理完毕":
          this.$confirm("确定要办结吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
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
          });

          break;
        case "反馈意见":
          this.showIdeaDialog=true;
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
                  if(res.code.toLocaleLowerCase()=='success'){
                     this.$message({
                    message: "反馈制发单位成功",
                    type: "success"
                  });
                  }else if(res.code.toLocaleLowerCase()=='success1'){
                    this.$message({
                    message: res.msg.split('。')[0]+'<br/>'+res.msg.split('。')[1],
                    type: "info"
                  });
                  }else{
                    this.$message({
                    message: res.msg,
                    type: "error"
                  });
                  }
                  
                  this.$intent.closeWindow(this);
                })
                .catch(item => {
                  this.buttonDisabled = false;
                  if(item.code.toLocaleLowerCase()=='success1'||item.code.toLocaleLowerCase()=='fail'){
                    setTimeout(() => {self.$intent.closeWindow(this);}, 2000);                   
                  }
                   
                });
            } else {
              this.$message({
                message: "请填写最终意见",
                type: "error"
              });
            }
          } else if (this.formdata.feedbackMode == "2") {
            if (
              (this.formdata.finalOpinion ||
                this.formdata.zzOpinion.length > 0) &&
              this.formdata.attchmentFileInfo &&
              this.formdata.attchmentFileInfo.length
            ) {
              this.formdata.currentNode = "办结";
              this.buttonDisabled = true;
              this.$api.bianhan
                .underAlertData(this.formdata)
                .then(res => {
                  if(res.code.toLocaleLowerCase()=='success'){
                     this.$message({
                    message: "反馈制发单位成功",
                    type: "success"
                  });
                  }else if(res.code.toLocaleLowerCase()=='success1'){
                    this.$message({
                    message: res.msg.split('。')[0]+'<br/>'+res.msg.split('。')[1],
                    type: "info"
                  });
                  }else{
                    this.$message({
                    message: res.msg,
                    type: "error"
                  });
                  }
                  this.$intent.closeWindow(this);
                })
                .catch(item => {
                  this.buttonDisabled = false;
                  if(item.code.toLocaleLowerCase()=='success1'||item.code.toLocaleLowerCase()=='fail'){
                     setTimeout(() => {self.$intent.closeWindow(this);}, 2000);
                  }
                });
            } else {
              this.$message({
                message: "请填写最终意见并上传附件",
                type: "error"
              });
            }
          }
          break;      
        case "增加承办人":
          this.formdata.wcbfsbc = '1';
          this.loadingTree = true;
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.offenUse = false;
          this.checkData = []; //清空选中数据，避免和传阅选中数据混合

          this.formdata.backType = 0;
          this.toNext();
          break;
        case "完成并发送":
          this.formdata.wcbfsbc = '1';
        case "流程调度":
          this.loadingTree = true;
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.offenUse = true;
          this.checkData = []; //清空选中数据，避免和传阅选中数据混合

          this.formdata.backType = 0;
          if (this.formdata.backFlag1 && !!this.formdata.oldUserName) {
            this.$confirm(
              "是否返回" + this.formdata.oldUserName + "?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                this.formdata.backType = 1;
              })
              .finally(() => {
                if (this.formdata.backType == 1) {
                  this.backToOldUser();
                } else {
                  this.toNext();
                }
              });
          } else {
            this.toNext();
          }
          
          break;
        case "传阅":
          this.getTreeDataForCy("cy");
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
            query: { id: this.id,numYear:this.numyear }
          });
          break;
        case "查看流程":
          this.$refs.dialogLine.openDialog();
          this.$api.bianhan
            .getLiuCheng({ id: this.id, type: "1",numYear:this.numyear})
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
          break;
        case "操作指南":
          this.handBook('BHGL');
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
      //  let hasfinalOpinion= this.formdata.finalOpinion ||
      //           this.formdata.zzOpinion.length > 0;
      //  let hasAttchmentFileInfo=this.formdata.attchmentFileInfo &&
      //             this.formdata.attchmentFileInfo.length>0;
      //   if(this.formdata.feedbackMode==2
      //       &&(!hasfinalOpinion||!hasAttchmentFileInfo)){
      //      this.$message({
      //       type: "error",
      //       message: "上传反馈意见及附件"
      //     });
      //     return;
      //   }
      this.buttonDisabled = true;
      this.$api.bianhan
        .getPerson({
          id: this.id,
          type: "1",
          year: new Date().getFullYear()
        })
        .then(res => {
          // this.buttonDisabled = false;
          // this.reloadTree(res.list);
           this.seletOptionsData = res.list;
          this.treeData = res.result.data;
          this.dialogState = true;
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    reloadTree(list) {
      let that = this;
      this.formdata.pcsAvyId = list[0].PCSAVYID;
      this.seletOptionsData = list;
      that.$set(that.formdata, "function", "selWfNodeTy");
      that.$set(that.formdata, "curTplNo", that.formdata.tplNo);
      that.$set(that.formdata, "curMultiTenancyId", that.formdata.multiID);
      that.$set(that.formdata, "wfeUnitId", that.formdata.undertakeOrganId);
      that.$post
        .postData("selWfNodeTy", JSON.stringify(that.formdata), "A0846C037")
        .then(res => {
          if (res.message == "Loading") {
            that.loadingTree = true;
          } else {
            that.loadingTree = false;
          }
          that.dialogState = true;
          that.treeData = (res.data && res.data.data) || [];
          that.defaultUser = (res.data && res.data.defaultUser) || {};
        })
        .catch(e => {});
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
    save() {
      this.formdata.type = "0";
      this.$api.bianhan.underAlertData(this.formdata).then(res => {
        this.loadData();
      });
    },
    showCompDialog(data, status, type, params, dtype) {
      this.buttonDisabled = false;
      this.dialogState = false;
      switch (dtype) {
        case "next":
          if(data.length>1){
            this.next(data, params);
          }else{
          this.next(data[0], params);
          }
          break;
        default:
          break;
      }
    },
    //完成并发送
    next(person, params) {
      this.buttonDisabled = true;
      if(person.length>1){
        let join;
         this.formdata.undertakeHandlePersonIds='';
         this.formdata.undertakeHandlePerson='';
        person.filter((p,i)=>{
           join=i==person.length-1?'':',';
           this.formdata.undertakeHandlePersonIds+= p.id+join;
           this.formdata.undertakeHandlePerson += p.name+join;
        })
      }else{
      this.formdata.undertakeHandlePersonIds = person.id;
      this.formdata.undertakeHandlePerson = person.name;
      }

      this.formdata.nextAvyId = params.id;
      this.formdata.type = "1";
      this.formdata.undertakeCurrentlinks = params.name;
      this.$api.bianhan
        .underAlertData(this.formdata)
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });
         
          this.$intent.closeWindow(this);
          this.messageWarn(person.idStr,this.formdata.title,person.name,'underdeal',
            this.formdata.id)
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    //获取传阅人员列表
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
      this.treeDataForCy = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();

      this.$post
        .postData(
          "selectUserByCirculate", //传阅常用联系人修改 12.21
          JSON.stringify({
            function: "selectUserByCirculate", //传阅常用联系人修改 12.21
            level: this.scircularizeLevel, //传阅常用联系人修改 12.21
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
          this.treeDataForCy = (res && res.data) || [];
          this.treeDataForCy[0].disabled = true;
        });
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          this.checkIds = this.formdata.wyIds
            ? this.formdata.wyIds.split(";")
            : [];
          if (this.cyCheckData.length) {
            newA = [].concat(this.cyCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
            });
          }
          this.checkData = this.cyCheckData;
          break;
      }
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        oldIds = this.formdata.wyIds.split(" ");
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
            try {
              if (item.idStr.indexOf("#") != -1) {
                if (!oldIds.includes(item.idStr.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.idStr.toString())) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            } catch (e) {
              if (item.id.indexOf("#") != -1) {
                if (!oldIds.includes(item.id.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.id)) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            }
          });

          newNames = newNames.join(",");
          newIds = newIds.join(",");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        switch (dtype) {
          case "cy":
            this.formdata.curUserName = newNames;
            this.formdata.curUserId = newIds;
            this.cyCheckData = this.checkData;
            break;
        }
        if (!!this.formdata.curUserName) {
          this.cy();
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    //发传阅
    cy(person) {
   //this.formdata.type = "0";
      //传阅前意见固化
        this.formdata.type = "1";
      this.$api.bianhan.underAlertData(this.formdata).then(res => {
        this.formdata.currentNode = "承办";
        this.$api.bianhan.sendChuanYue(this.formdata).then(res => {
          this.loadData();
          this.$message({
            message: "传阅成功",
            type: "success"
          });
        });
      });
    },
    getFileList() {
      //制发单附件
      this.$api.setSysConfig
        .getTextemList({ id: this.formdata.parentDocId,numYear:this.numyear })
        .then(res => {
          this.formdata.attchmentFileInfoZhi = res.data;
          this.$forceUpdate();
          //承办单附件
          this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear }).then(res => {
            this.formdata.attchmentFileInfo = res.data;
            this.$forceUpdate();
          });
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
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(" ");
      names = name.split(" ");
      ids.map((item, n) => {
        if (!!item) {
          obj.push({
            id: item,
            name: names[n]
          });
        }
      });
      return obj;
    },
    loadData() {
      this.$api.bianhan
        .underDeal({ id: this.id,numYear:this.numyear,isMulti:this.isMultiParams})
        .then(res => {
          this.formdata = res.bHCbOrderDo;
          if(!!this.formdata.beAuthUserId){
            this.formdata.currentNowName = this.formdata.draftDepartment + ' ' + this.formdata.beAuthUserName+'(此文件由'+ this.formdata.authUserName +'授权)';
          
          }
          this.$set(this.formdata, "backFlag1", res.backFlag1);
          this.isBnEdit = res.isBnEdit;
          this.otherBank = !this.isBnEdit;
          const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
          // 判断当前登录人是否为 授权人或者被授权人， 否的话直接 赋值为 false
          // if (this.formdata.beAuthUserId && (userInfo.humanId == this.formdata.beAuthUserId || userInfo.humanId == this.formdata.undertakeHandlePersonIds)) {
          //   // 判断是否转授权给其他人
          //   this.isAuthorizeOthers = (Boolean(this.formdata.beAuthUserId) || this.formdata.beAuthUserId === 0) && this.formdata.beAuthUserId !== userInfo.humanId ;
          // } else {
          //   this.isAuthorizeOthers = false;
          // }
          // this.isRouteFrom(this.formdata.beAuthUserName || '')
          /*若果不存在字段numberType，或者字段值为0，则文件没有
        回收过。若字段值为1，则文件回收过*/
          try {
            this.$set(
              this.formdata,
              "isUndertakeOver",
              res.bHCbOrderDo.numberType
            );
          } catch (e) {
            this.$set(this.formdata, "isUndertakeOver", "0");
          }

          //有finishTime字段且不为空，则表单已经办结
          if (!!res.bHCbOrderDo.finishTime) {
            this.isfinish = true;
          }

          this.buttonDisabled = false;
          this.formdata.receiveDate = res.bHCbOrderDo.receiveDate.slice(0, 10);
          this.formdata.draftDepartmentOne = res.draftDepartmentOne;
          this.formdata.draftDepartmentOneId = res.draftDepartmentOneId;
          try {
            this.formdata.cyList = res.cyList.filter(item => {
              this.$api.setSysConfig
                .getTextemList({ id: item.dataId, fileType: "10010" ,numYear:this.numyear})
                .then(res => {
                  this.$set(item, "attachmentPos", res.data);
                  this.$forceUpdate();
                });
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
          //备注意见赋值
          if (!!this.formdata.remark) {
             this.$set(this.formdata, "comments", this.formdata.remark);
          }

          //获取传阅未阅已选人员
          if (res.wyIds) {
            this.cyCheckData = this.concatTreeData(
              res.wyIds,
              res.bHCbOrderDo.wyPle
            );
          } else {
            this.cyCheckData = [];
          }

          //筛选所有可删除意见最后一条意见添加时间
          this.lastOptionTime='0';//时间重置
          this.getLastOptionTime("lastOptionTime",  res.zzOpinion);
          this.getLastOptionTime("lastOptionTime",  res.processList);
          this.getLastOptionTime("lastOptionTime",  res.commentsList);
          this.getLastOptionTime("lastOptionTime",  res.sendList);
          
          this.getHuanJie();
          this.getFileList();
          setTimeout(() => {
            this.$refs.ue.setUEContent(this.formdata.content);
            this.$refs.ue.setDsabled();
          }, 1000);
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    /**
     * @param variable[string],自定义vue对象属性,用于存储意见列表最新时间
     * @param array[array],需要处理的数组
     */
    getLastOptionTime(variable, array) {
      array?.filter(item => {
        this[variable] =
          this[variable] > item.createTime ? this[variable] : item.createTime;
      });
    },
    // 判断是否为 首页进入并且为授权人
    isRouteFrom (authorizedPersonName) {
      const query = this.$route.query;
      if (query.routeFrom === "home" && this.isAuthorizeOthers) {
        this.$confirm(`此文正在由 ${authorizedPersonName} 处理`, {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          distinguishCancelAndClose: true,
          customClass: "but_model",
          type: "warning"
        }).then(response => {
          this.isShowDocument = true;
        }).catch(action => {
          if (action === "cancel") {
            this.$intent.closeWindow(this)
          } else {
            this.isShowDocument = true;
          }
        })
      } else {
        this.isShowDocument = true
      }
    },
  }
};
</script>
<style lang="less">
// 在reset.css 文件中有人设置了，位移60px，在此将其重置为0，不修改 reset.css 文件
.but_model {
  .el-message-box__btns {
    .el-button {
      transform: translateX(0px) !important;
    }
  }
}
</style>

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
  clear: both;
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
  background-color: rgba(228,231,237,.32)
}

.pad_lr10 {
  padding: 0 0 0 10px;
}
.creat_time{
      position: relative;
    top: -10px;
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
