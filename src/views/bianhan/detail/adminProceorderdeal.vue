<template>
  <div class="process_order" id="bianhanzhifa">
    <!-- 将表单内容抽成一个table表格，用于收藏表单数据 -->
    <collectionPage :formdata="formdata"  :formList="formList" pagetype="zf" :editedIdeaFields="editedIdeaFields"></collectionPage>
    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
        <template>
          <el-button
            plain
            @click="buttonClick('保存')"
            v-show="!inputDisable"
            class="bank_grid_comtent_active"
          >保存</el-button>
          <el-button plain @click="buttonClick('退号')" v-show="showBackBtn" class="bank_grid_comtent_active">退号</el-button>
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
      <!--表头-->
      <div class="shiwuTitle">{{formdata.deptTableHead}}</div>
    </div>

    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <sidebarNavigation container="#bank_dispach_content"></sidebarNavigation>

      <div class="bank_dispach_file">
        <div class="process_content">
          <el-form label-width="120px" :model="formdata" :rules="rules" ref="elForm">
            <div class="cur_box">
              <div class="cur_sess">
                <p>
                  当前环节：
                  <span>{{formdata.currentNode}}</span>
                </p>
                <p>
                  当前处理人：
                  <span>{{formdata.currentNowName}}</span>
                </p>
              </div>
              <div class="feed_back">
                <template>
                  <el-form-item label="反馈方式：" prop="feedbackMode" style="line-height:20px;">
                    <el-radio-group v-model="formdata.feedbackMode" :disabled="inputDisable">
                      <el-radio :label="'0'">无需反馈</el-radio>
                      <el-radio :label="'1'">反馈意见</el-radio>
                      <el-radio :label="'2'">反馈意见及附件</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
              </div>
            </div>
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row>
              <el-col :span="formdata.feedbackMode=='1'||formdata.feedbackMode=='2'?16:24">
                <el-form-item label="正文标题" prop="title" ref="title">
                  <el-input v-model="formdata.title" maxlength="500" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.feedbackMode=='1'||formdata.feedbackMode=='2'">
                <el-form-item label="反馈截止日期" prop="feedTime" ref="feedTime">
                  <el-date-picker
                    :picker-options="pickerOptions"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    v-model="formdata.feedTime"
                    :disabled="inputDisable"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="编号" prop="documentNo" ref="documentNo">
                  <el-input v-model="formdata.documentNo" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label
                  v-if='isZH'
                  prop="isbnbh"
                  ref="isbnbh"
                  style="text-align: right"
                >
                  <el-checkbox
                    v-model="formdata.bnbh"
                    :disabled="inputDisable"
                    true-label="1"
                    false-label="0"
                  >部内便函</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="主送" prop="main" ref="main">
              <el-row>
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 1}"
                    class="zhusong"
                    resize="none"
                    v-model="formdata.main"
                    :disabled="readFields.main||!!formdata.bhCbDept"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!readFields.main">
                  <i class="icon-font el-icon-plus select-chang" @click="selectMainOrCopy('main')"></i>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="抄送" prop="copy" ref="copy">
              <el-row>
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 1}"
                    class="chaosong"
                    resize="none"
                    v-model="formdata.copy"
                    :disabled="readFields.copy||!!formdata.bhCbDept"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!readFields.copy">
                  <i class="icon-font el-icon-plus select-chang" @click="selectMainOrCopy('copy')"></i>
                </el-col>
              </el-row>
            </el-form-item>
            <div class="editor_box" style="position:relative">
              <label>内容</label>
              <UE :config="config" id="UE" ref="ue"></UE>
            </div>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿部门" prop="draftDepartmentOne" ref="draftDepartmentOne">
                  <el-select
                    v-model="formdata.draftDepartmentOne"
                    disabled
                    @change="changeFirstUnitName"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in deptList"
                      :key="item.currUnitId"
                      :label="item.departmentStr"
                      :value="item.humanId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
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
                <el-form-item label="拟稿人" prop="draftUser" ref="draftUser">
                  <el-input v-model="formdata.draftUser" :disabled="inputDisable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="phone" ref="phone">
                  <el-input
                    v-model="formdata.phone"
                    :disabled="inputDisable"
                    @keyup.native="btKeyDown"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="移动端展示" prop="showApp" v-if="isZH">
              <el-radio-group v-model="formdata.showApp" :disabled="readFields.showApp">
                <el-radio :label="'0'">是</el-radio>
                <el-radio :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>

            <controllableEditingField
              :isWeiHu="inputDisable"
              listtype="send"
              lableTitle="签发意见"
              :formadatalist="formdata.sendList"
              @delefunc="delefunc"
            ></controllableEditingField>
            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="审核意见"
              listtype="check"
              :formadatalist="formdata.checkList"
              @delefunc="delefunc"
            ></controllableEditingField>

            <el-form-item label="传阅意见" prop="cyyj">
              <div v-for="item in formdata.cyList" :key="item.id">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24" style="background: #e0e0e057;padding: 5px 10px;">
                      <div style="min-height:80px;word-break: break-all;">{{item.content}}</div>
                      <div v-for="file in item.attachmentPos" :key="file.id">
                        <a
                          class="name down"
                          style="cursor:pointer;background-color: rgba(228,231,237,.32)"
                          @click="viewFile(file)"
                        >{{file.fileName}}</a>
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
              <el-row
                v-if="!editedIdeaFields.cyyj|| !(formdata.cyList && formdata.cyList.length!=0)"
              >
                <el-col :span="24">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows:3}"
                    resize="none"
                    v-model="formdata.cyyj"
                    :disabled="editedIdeaFields.cyyj"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <controllableEditingField
              :isWeiHu="inputDisable"
              lableTitle="备注"
              listtype="comment"
              :formadatalist="formdata.commentsList"
              @delefunc="delefunc"
            ></controllableEditingField>

            <el-row>
              <el-col :span="24">
                <el-form-item label="传阅人员">
                  <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                    <div class="clear-fix chuanyue1">
                      <p class="chuanyue-p1">未阅</p>
                      <el-input
                        class="chuanyue-p2 chuanyue-textarea"
                        :disabled="inputDisable"
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
                        :disabled="inputDisable"
                        v-model="formdata.yyPle"
                        type="textarea"
                        :autosize="{ minRows:2}"
                        resize="none"
                      ></el-input>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              label="承办单位"
              v-if="formdata.feedbackMode!=0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col :span="23">
                  <el-table :data="formList.cbList" border id="yijiantable">
                    <el-table-column label-class-name="displayClass">
                      <template slot="header">{{formdata.title}}{{formdata.documentNo}}反馈意见</template>

                      <el-table-column prop="undertakeDepartment" label="部门名称" width="200"></el-table-column>
                      <el-table-column>
                        <template slot="header">
                          <span>意见</span>
                        </template>
                        <template slot-scope="scope">
                          <div
                            class="formatFildContainer"
                            v-if="scope.row.opinionDoList&&scope.row.opinionDoList.length>0"
                          >
                            <template>
                              <div v-for="item in scope.row.opinionDoList" :key="item.id">
                                <div class="d_flex">
                                  <el-row class="d_b100">
                                    <el-col :span="24" class="elcol">
                                      <div>{{item.content}}</div>
                                      <div class="adviceInfo" style="position:relative">
                                        {{item.departmentName}}
                                        <span
                                          class="pad_lr10"
                                        >{{item.userName}}</span>
                                        {{item.createTime}}
                                      </div>
                                    </el-col>
                                  </el-row>
                                </div>
                              </div>
                            </template>
                          </div>
                          <div
                            class="name down"
                            @click="viewFile(item)"
                            v-for="item in scope.row.attachList"
                            :key="item.id"
                          >{{item.fileName}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="finishTime" label="反馈时间" width="200"></el-table-column>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              label="承办单位"
              v-if="formdata.feedbackMode==0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col
                  v-for="item in formList.cbList"
                  :key="item.id"
                  :span="6"
                >{{item.undertakeDepartment}}</el-col>
              </el-row>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              :canmoveOrdown="!inputDisable"
              label="制发单附件"
              :fileList="formdata.attchmentFileInfo"
            >
              <upload-file-ts
                :uploadConfig="uploadConfig"
                @fileList="fileList"
                :fileId="fileId"
                :disabled="inputDisable"
              ></upload-file-ts>
            </upfileList>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog title="请选择要使用的文号" :visible.sync="bianhaoDialog" class="bianhaoDialog" @close='buttonDisabled = false'>
       <el-scrollbar style="height:280px;">
      <el-form>
       
      <el-form-item label="当前文号">
            <el-radio  @change="currentCode" v-model="bianhao" 
            :label="currentFileNo" >{{currentFileNo}}号</el-radio>
      </el-form-item>

      <el-form-item label="空缺文号">
        <el-radio-group v-model="bianhao" v-for="item in bianhaoList" 
          :key="item.index"  @change="setCurrentCode">
          <el-radio :label="item" >{{item}}号</el-radio>
        </el-radio-group>
       </el-form-item>
       </el-form>
       </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bianhaoDialog = false">取 消</el-button>
        <el-button type="primary" @click="toSetBianhao">确 定</el-button>
      </div>
    </el-dialog>

     <!--流程调度树-->
     <select-person
      v-model="dialogState"
      :orgOrDeptId='selsecOrgOrDeptId'
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></select-person>

    <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts>

    <!-- 查看流程弹窗 -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <cb-flow v-model="showCbFlow" :tableData="formList.cbList"></cb-flow>
    <org-tree
      v-model="showOrgTree"
      title="选择部门"
      :outBank="true"
      :isSingle="false"
      :orgOrDeptId="orgOrDeptId"
      :orgOrDept="0"
      @orgList="getOrgList"
    ></org-tree>
    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
  </div>
</template>

<script >
import beanList from "../../../util/beanList";
import selectPerson from 'components/viewFlow/dispatchTree'//流程调度树
import WriteListTs from "components/viewFlow/writeListTs";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import { mapGetters, mapActions } from "vuex";
import minixs from "../../../minixs/index";
import viewDraft from "@/minixs/viewDraft";
import orgTree from "components/tree/orgTree";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import cyPersonList from "../components/cyPersonList";
import UE from "components/editor/ue.vue";
import exportTable from "../../../minixs/exportTable";
import cbFlow from "../components/cbFlow";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import sidebarNavigation from "../components/sidebarNavigation";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import formatFormFild from "../components/formatFormFiled";
import controllableEditingField from "../components/controllableEditingField";
import collectionPage from "../components/collectionPage";
import upfileList from "../components/showUploadFile"; //附件展示

export default {
  name: "addproceorderdeal",
  components: {
    WriteListTs,
    selectPerson,
    shiwuFlow,
    orgTree,
    uploadFileTs,
    cyPersonList,
    cbFlow,
    UE,
    sidebarNavigation,
    formatFormFild,
    controllableEditingField,
    collectionPage,
    upfileList
  },
  mixins: [minixs, openOrDownLoadFile, bianhanPublic,viewDraft],
  mounted() {
    this.id = this.$route.query.id;
    this.fileId = this.$route.query.id;
    sessionStorage.setItem("fileId", this.fileId);
    if (this.id) {
      this.uploadConfig.id = this.id;
      this.loadData();
    } else {
      this.getNullBianHao();
      this.getHuanJie();
    }
    this.getdeptList();
    // this.handleSetLoacl();
  },
  data() {
    return {
      fileId: "",
      showBackBtn:false,//是否展示退号按钮，默认false
      isBnEdit:false,//部门内便函标志是否可编辑
      selsecOrgOrDeptId:'',//流程调度机构
      cyCheckData: [], //选中数据
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      buttonDisabled: false, //按钮是否禁用,解决网络延迟引起的点击按钮报错问题
      //总行
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000",
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      showCbFlow: false,
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      showOrgTree: false,
      showCyPerson: false,
      orgOrDeptId: JSON.parse(localStorage.getItem("userInfo")).currUnitId,
      cyData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 1000 * 60 * 60 * 24;
        }
      },
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      huanJieMessage: {},
      rules: {},
      id: "",
      type: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      showFlowChart: false,
      flowChartList: [], //流程列表
      // buttonList: [
      //   { name: "保存", type: "baocun", show: false },
      //   { name: "完成并发送", type: "wcbfs", show: false },
      //   { name: "生成编号", type: "scbh", show: false },
      //   { name: "发办理单位", type: "fsbldw", show: false },
      //   { name: "增发", type: "zengfa", show: false },
      //   { name: "收回", type: "shouhui", show: false },
      //   { name: "承办收回", type: "cbsh", show: false },
      //   { name: "承办催办", type: "chengbancuiban", show: false },
      //   { name: "查看承办部门流程", type: "ckcbbmlc", show: false },
      //   { name: "传阅", type: "cy", show: false },
      //   { name: "传阅收回", type: "cysh", show: false },
      //   { name: "办结", type: "banjie", show: false },
      //   { name: "删除此文", type: "shanchuciwen", show: false },
      //   { name: "查看流程", type: "cklc", show: false },
      //   { name: "打印处理单", type: "dycld", show: false },
      //   { name: "收藏", type: "shoucang", show: false },
      //   { name: "维护", type: "weihu", show: false },
      //   { name: "流程调度", type: "lichengdiaodu", show: false },
      //   { name: "操作指南", type: "czzn", show: false },
      //   { name: "导出反馈意见", type: "daochufankuiyijian", show: false },
      //   { name: "批量下载反馈附件", type: "daochufankuiyijian", show: false }
      // ],
      formList: { cbList: [] },
      formdata: {
        hasDocumentNo: "false",
        currentNode: "制发",
        draftTime: formatData(new Date().getTime(), "YYYY-MM-DD"),
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanId
          : "",
        currentNowName: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortFirstUnitName +
            " " +
            JSON.parse(localStorage.getItem("bianhan")).humanName
          : "",
        draftUser: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanName
          : "",
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).currUnitId
          : "",
        draftOrgan: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortUnitName
          : "",
        draftOrganId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).unitId
          : "",
        draftDepartmentOne: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortFirstUnitName ||
            JSON.parse(localStorage.getItem("bianhan")).draftDepartmentOne
          : "",
        draftDepartmentOneId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).firstUnitId
          : "",
        phone: "",
        documentNo: "",
        showApp: "0",
        currentUserDept: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).currUnitName
          : "",
        currentUserDeptId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).currUnitId
          : ""
      },
      bianhaoNum: "",
      bianhao: "",
      bianhaoList: [],
      bianhaoDialog: false,
      readFields: {
        Creator: false,
        IsFeedBack: false,
        IsSenInfo: false,
        Telephone: false,
        CreateDate: false,
        DraftDepart: false,
        Title: false,
        isMobileServiceShow: false,
        isbnbh: false,
        feedTime: false,
        copy: false,
        main: false,
        mainBody: false
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
        isbnbh: "",
        feedTime: "",
        copy: "",
        main: ""
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
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      treeData: [], //人员树
      canTab: false,
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      dialogTit: "选择人员",
      offenUse: true,
      loadingTree: true,
      checkOrg: false,
      inputDisable: true,
      deptList: []
    };
  },
  computed: {
    ...mapGetters(["todoItem"])
  },
  created() {},
  methods: {
    delefunc(item) {
       this.$api.bianhan.delProcessList(item).then(res => {
            this.loadData();
       });
    },
    ...mapActions(["setTodoItem"]),
    getdeptList() {
      // this.deptList=JSON.parse(localStorage.getItem('unitInfo'))
      this.$api.bianhan.getDeptList({}).then(res => {
        this.deptList = res.result;

        //确定当前联系人联系电话
        if (this.$route.query.deptDetail) {
          let unitInfo = JSON.parse(localStorage.getItem("unitInfo"));
          for (let i = 0; i < unitInfo.length; i++) {
            if (
              unitInfo[i].currUnitId ==
              JSON.parse(localStorage.getItem("bianhan")).currUnitId
            ) {
              this.formdata.phone = unitInfo[i].telMobile
                ? !!unitInfo[i].telMobile
                  ? unitInfo[i].telMobile.replace(/,/g, " ")
                  : ""
                : "";
            }
          }
        }
      });
    },
    /**拟稿部门切换 */
    changeFirstUnitName(val) {
      let option={
        humanId:'',
        humanName:'',
        shortFirstUnitName:'',
        currUnitId:'',
        shortUnitName:'',
        unitId:'',
        firstUnitId:''
      };
      this.deptList.forEach(item => {
        if (item.humanId == val) {
          option = item;
        }
      });
      this.formdata.currentUserId = option.humanId;
      this.formdata.currentNowName =
        option.shortFirstUnitName + " " + option.humanName;
      this.formdata.draftUserId = option.humanId;
      this.formdata.draftDepartment = option.shortFirstUnitName;
      this.formdata.draftDepartmentId = option.currUnitId;
      this.formdata.draftOrgan = option.shortUnitName;
      this.formdata.draftOrganId = option.unitId;
      this.formdata.draftDepartmentOne =
        option.shortFirstUnitName ||
        JSON.parse(localStorage.getItem("bianhan")).draftDepartmentOne;
      this.formdata.draftDepartmentOneId = option.firstUnitId;

      //确定当前联系人联系电话
      let unitInfo = JSON.parse(localStorage.getItem("unitInfo"));
      for (let i = 0; i < unitInfo.length; i++) {
        if (unitInfo[i].currUnitId == val.currUnitId) {
          this.formdata.phone = unitInfo[i].telMobile
            ? !!unitInfo[i].telMobile
              ? unitInfo[i].telMobile.replace(/,/g, " ")
              : ""
            : "";
        }
      }

      this.formdata.currentUserDept = option.currUnitName;
      this.formdata.currentUserDeptId = option.currUnitId;
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.save();
          break;
        case "完成并发送":
        case "流程调度":
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.dialogType = "dosend";
          this.offenUse = true;
          this.loadingTree = true;
          this.canTab = false;
          this.checkData = []; //清空选中数据，避免和传阅选中数据混合
          this.toNext();
          break;
        case "生成编号":
          this.toGetBianhao();
          break;
        case "退号":
          //waterNoRule为null不支持退号，0表示按机构生成，1表示按部门生成
          if(!this.formdata.waterNoRule){
             this.$message({
              message: "此文为历史数据，不支持退号",
              type: "error"
            });
            return;
          }
          this.$confirm("您是否要执行退号并解锁操作？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
             this.backBianhao();
          });
          
          break;
        case "查看承办部门流程":
          this.showCbFlow = true;
          break;
        case "传阅":
          break;
        case "传阅收回":
          break;
        case "收藏":
          exportTable.collect(this, this.id, 'zf','',this.numyear)
          break;
        case "办结":
          if (this.formdata.feedBack == "false") {
            this.$confirm("承办部门未全部反馈，是否办结?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.toEnd();
            });
          } else {
             this.$confirm("确定要办结吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.toEnd();
            });
          }
          break;
        case "删除此文":
          this.$confirm("是否删除此文?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.deleteBianhan();
          });
          break;
        case "发办理单位":
        case "增发":
          if (this.formdata.bnbh == 1) {
            this.orgOrDeptId = this.formdata.draftDepartmentOneId; //一级部门id
          } else {
            this.orgOrDeptId = JSON.parse(
              localStorage.getItem("userInfo")
            ).unitId;
          }
          this.showOrgTree = true;
          break;
        case "承办收回":
          this.$api.bianhan.getCbDeptList({ id: this.id,numYear:this.numyear }).then(res => {
            if (res.list && res.list.length == 0) {
              this.$message({ type: "success", message: "暂无需回收承办" });
            } else {
              res.list.forEach(item => {
                item.name = item.undertakeDepartment;
              });
              this.cyData = res.list;
              this.dialogTypeNow = "cb";
              this.showCyPerson = true;
            }
          });

          break;
        case "承办催办":
          this.$api.bianhan.cuiban({ ids: this.id, type: "2" }).then(res => {
            this.$message({
              message: "催办成功",
              type: "success"
            });
          });
          break;
        case "查看流程":
          this.$refs.dialogLine.openDialog();
          this.$api.bianhan
            .getLiuCheng({ id: this.id, type: "0",numYear:this.numyear })
            .then(res => {
              this.showFlowChart = true;
              this.flowChartList = res.list;
            });
          break;
        case "操作指南":
           this.handBook('BHGL');
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/bianhanZf",
            query: { id: this.id,numYear:this.numyear }
          });
          break;
        case "导出反馈意见":
          exportTable.exportExcel("承办意见", "#yijiantable", true, true);
          break;
        case "维护":
          this.inputDisable = !this.inputDisable;
          try {
            if (this.inputDisable) {
              this.$refs.ue.setDsabled();
            } else {
              this.$refs.ue.setEable();
            }
          } catch (e) {}
          
          //维护状态下，已生成编号，且无已发办理的单位显示退号按钮
          if(!this.inputDisable&&(this.formdata.hasDocumentNo||this.formdata.hasDocumentNo=='true')
          &&this.formdata.undertakeDepartment==''){
            this.showBackBtn=true;
          }else{
            this.showBackBtn=false;
          }
          break;
        case "批量下载反馈附件":
          this.batchExporFeedbackFile();
      }
    },
    selectMainOrCopy(n) {
      let name = "";
      this.dialogType = "zhu";
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
      }
      this.loadingTree = false;
      this.offenUse = false;
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogTypeNow = n;

      this.$post
        .postData(
          "getTcPriDeliveryDic",
          JSON.stringify({
            function: "getTcPriDeliveryDic",
            organizationId: "root"
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
          if (this.treeData.length) {
            this.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              console.log("选择" + item);
              if (!!item && item.typeName) {
                item.text = item.typeName;
                this.$set(item, "id", item.typeName);
              }
            });
          }
          if (n == "main") {
            this.backDialogData("main");
          } else if (n == "copy") {
            this.backDialogData("chao");
          }
          this.dialogState = true;
        });
    },
    //退号
    backBianhao(){
         this.$api.bianhan
          .backianhao({
            id:this.id,
            unitId:this.formdata.draftOrganId,
          })
          .then(res=>{
              this.getHuanJie();
              this.bianhaoDialog =false; 
              this.$message({
              message: "退号成功",
              type: "success"
             });
              this.loadData(); 
              this.$refs.ue.setEable(); 
          })
    },
    //仅能输入数字和‘-’
    btKeyDown(e) {
      this.formdata.phone = e.target.value.replace(/[^\d||\-]/g, "");
    },
    setFormConfig() {
      this.rules = {
        feedbackMode: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        title: [
          {
            required: this.requiredFields.Title,
            message: "不能为空",
            trigger: "change"
          },
          { max: 200, message: "不能超过200字", trigger: "change" }
        ],
        feedTime: [
          {
            required: this.requiredFields.feedTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftDepartmentOne: [
          {
            required: this.requiredFields.DraftDepart,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftTime: [
          {
            required: this.requiredFields.CreateDate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftUser: [
          {
            required: this.requiredFields.Creator,
            message: "不能为空",
            trigger: "change"
          }
        ],
        main: [
          {
            required: this.requiredFields.main,
            message: "不能为空",
            trigger: "change"
          }
        ],
        copy: [
          {
            required: this.requiredFields.copy,
            message: "不能为空",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: this.requiredFields.Telephone,
            message: "不能为空",
            trigger: "change"
          }
        ],
        isMobileServiceShow: [
          {
            required: this.requiredFields.isMobileServiceShow,
            message: "不能为空",
            trigger: "change"
          }
        ],

        opinionSend: [
          {
            required: this.requiredIdeaFields.yjps,
            message: "不能为空",
            trigger: "change"
          }
        ],
        opinionCheck: [
          {
            required: this.requiredIdeaFields.shyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        comments: [
          {
            required: this.requiredIdeaFields.Remark,
            message: "不能为空",
            trigger: "change"
          }
        ],
        cyyj: [
          {
            required: this.requiredIdeaFields.cyyj,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
      if (process.env.NODE_ENV == "production" && this.readFields.mainBody) {
        setTimeout(() => {
          this.$refs.ue.setDsabled();
        }, 1000);
      }
    },
    toEnd() {
      this.formdata.currentNode = "办结";
      this.buttonDisabled = true;
       this.formdata.currentNode = "办结";
      this.buttonDisabled = true;
      let form_data=JSON.parse(JSON.stringify(this.formdata));
      delete form_data.bhCbDept;
      delete form_data.cbList;
      this.$api.bianhan
        .alertAddData(form_data)
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
    },
    //获取文号
    getNullBianHao() {
      this.$api.bianhan.setBianhao(this.formdata).then(res => {
        this.formdata.documentNo = res.resNum + " 号";
        this.formdata.deptTableHead = res.deptTableHead;
      });
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "main": //主送
          this.checkIds = [];
          this.checkData = [];
          for (var i = 0; i < this.zhuCheckData.length; i++) {
            this.checkIds.push(this.zhuCheckData[i].id);
            this.checkData.push({
              id: this.zhuCheckData[i].id,
              disabled: true,
              hideType: false
            });
          }

          break;
        case "copy": //抄送
        case "chao": //抄送
          this.checkIds = [];
          this.checkData = [];
          for (var i = 0; i < this.chaoCheckData.length; i++) {
            this.checkIds.push(this.chaoCheckData[i].id);
            this.checkData.push({
              id: this.chaoCheckData[i].id,
              disabled: true,
              hideType: false
            });
          }
          break;
      }
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      if (!status) {
        return;
      }
      switch (dtype) {
        case "next":
        case 1:
          this.next(data[0], params);
          break;
        case "main":
          let name = [];
          data.forEach(item => {
            try {
              if (typeof item === "object") {
                if (!!item.id && typeof item.id != undefined) {
                  name.push(item.id);
                } else if (typeof item.text != undefined) {
                  name.push(item.text);
                  item.id = item.text;
                }
              } else if (item != undefined) {
                name.push(item);
              }
            } catch (e) {
              console.log(e);
            }
          });
          this.zhuCheckData = [];
          this.zhuCheckData = data;
          if (!!this.main) {
            this.$set(this.formdata, "main", this.main + "," + name.join(","));
          } else {
            this.$set(this.formdata, "main", name.join(","));
          }

          break;
        case "copy":
          let name1 = [];
          data.forEach(item => {
            try {
              if (typeof item === "object") {
                if (!!item.id && typeof item.id != undefined) {
                  name1.push(item.id);
                } else if (typeof item.text != undefined) {
                  name1.push(item.text);
                  item1.id = item.text;
                }
              } else if (item != undefined) {
                name1.push(item);
              }
            } catch (e) {
              console.log(e);
            }
          });
          this.chaoCheckData = [];
          this.chaoCheckData = data;
          if (!!this.copy) {
            this.$set(this.formdata, "copy", this.copy + "," + name1.join(","));
          } else {
            this.$set(this.formdata, "copy", name1.join(","));
          }
          break;
        default:
          break;
      }
    },
    //发承办
    getOrgList(data) {
      let ids = [],
        names = [];
      data.forEach(item => {
        ids.push(item.id);
        names.push(item.unitName);
      });
      this.$api.bianhan
        .sendCB({
          id: this.id,
          undertakeDepartmentId: ids.join(","),
          undertakeDepartment: names.join(","),
          numYear:this.numyear
        })
        .then(res => {
          if (res.errorName) {
            if (res.sussName) {
              this.$alert(
                "<span style='color:red;display:block'>发送失败单位：" +
                  res.errorName +
                  "</span><span style='color:green'>" +
                  "发送成功单位：" +
                  res.sussName +
                  "</span>",
                {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  type: "warning"
                }
              ).then(() => {
                this.loadData();
              });
            } else {
              this.$alert(
                "<span style='color:red'>发送失败单位：</span>" + res.errorName,
                {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  type: "error"
                }
              ).then(() => {
                this.loadData();
              });
            }
          } else {
            this.$alert("已发送至" + res.sussName, {
              confirmButtonText: "确定",
              dangerouslyUseHTMLString: true,
              type: "success"
            }).then(() => {
              this.loadData();
            });
          }
        });
    },
    //传阅承办收回
    cyPersonList(data) {
      let ids = [];
      data.map(item => {
        ids.push(item.id);
      });
      if (this.dialogTypeNow == "cy") {
        this.$api.bianhan.cheHuiCy({ ids: ids.join(",") }).then(res => {
          this.loadData();
          this.$message({
            message: "传阅收回成功",
            type: "success"
          });
        });
      } else {
        this.$api.bianhan
          .cbBack({
            ids: ids.join(","),
            draftTime: this.formdata.draftTime,
            avyId: this.formdata.pcsAvyId
          })
          .then(res => {
            this.loadData();
            this.$message({
              message: "承办收回完成",
              type: "success"
            });
          });
      }
    },
    //完成并发送
    next(person, params) {
      this.formdata.currentUserId = person.id;
      this.formdata.currentUser = person.name;
      this.setFormWorkFlowData();
      this.formdata.nextAvyId = params.id;
      this.formdata.currentNode = params.name;
      this.formdata.type = "1";
       this.formdata.admin = "admin";
      this.buttonDisabled = true;
      this.$api.bianhan
        .alertAddData(this.formdata)
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });
         
          this.$intent.closeWindow(this);
          //消息提醒
           this.messageWarn(person.idStr,this.formdata.title,this.formdata.currentUser);
        })
        .catch(err => {
          this.buttonDisabled = false;
          this.loadData();
        });
    },
    //设置工作流数据
    setFormWorkFlowData() {
      try {
        this.formdata.avyId = this.todoItem.avyId;
        this.formdata.multiID = this.todoItem.multiID;
        this.formdata.pcsAvyId = this.todoItem.pcsAvyId;
        this.formdata.tplNo = this.todoItem.tplNo;
      } catch {
        console.log("avyId打印" + this.todoItem);
      }
    },
    beforeSave(){
      let that=this;
      this.formdata.content =
        process.env.NODE_ENV == "production"
          ? this.$refs.ue.getUEContent()
          : "";
      this.formdata.type = "admin";
      try {
        this.formdata.commentsList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.sendList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
      try {
        this.formdata.checkList.filter(item => {
          item.dataId = that.id;
          return item;
        });
      } catch (e) {}
    },
    //关闭
    close() {   
      this.buttonDisabled = true;
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            //点是
          this.beforeSave();
          this.$api.bianhan.alertAddData(this.formdata).then(res => {
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
    //常用批语
    showWriteList(type) {
      this.clickTypes = type;
      this.appendWriteDialog = true;
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "qianfa":
          this.$set(
            this.formdata,
            "opinionSend",
            this.formdata.opinionSend ? this.formdata.opinionSend + data : data
          );
          break;
        case "shenhe":
          this.$set(
            this.formdata,
            "opinionCheck",
            this.formdata.opinionCheck
              ? this.formdata.opinionCheck + data
              : data
          );
          break;
      }
    },
    //获取编号
    toGetBianhao() {
      this.buttonDisabled = true;
      this.$api.bianhan
        .setBianhao({ id: this.id })
        .then(res => {
          let list = res.list;
          this.save();
          if (list.length == 0) {
            this.formdata.documentNo = res.resNum + res.fileNo + "号";
            this.formdata.hasDocumentNo = true;
            this.formdata.fileNo = res.fileNo;
            this.formdata.type = "0";
            this.$api.bianhan.alertAddData(this.formdata).then(res => {
              this.$message({
                message: "编号生成成功",
                type: "success"
              });
              this.loadData();
            });
          } else {
            list.push(res.fileNo);
            for (let i = 0; i < list.length; i++) {
              list[i] = list[i] + "号";
            }
            this.bianhaoNum = res.resNum;
            this.bianhaoList = list;
            this.bianhaoDialog = true;
          }
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    //设置编号
    toSetBianhao() {
      if (this.bianhao) {
        this.formdata.documentNo = this.bianhaoNum + this.bianhao;
        this.formdata.hasDocumentNo = true;
        this.formdata.fileNo = this.bianhao.slice(0, this.bianhao.length - 1);
        this.formdata.type = "0";
        this.buttonDisabled = true;
        this.$api.bianhan
          .alertAddData(this.formdata)
          .then(res => {
            this.save();
            this.$message({
              message: "编号生成成功",
              type: "success"
            });
            this.bianhaoDialog = false;
            this.loadData();
          })
          .catch(item => {
            this.buttonDisabled = false;
          });
      }
    },
    //完成并发送
    toNext() {
      if (
        process.env.NODE_ENV == "production" &&
        !this.$refs.ue.getUEContent()
      ) {
        this.$message({
          type: "error",
          message: "正文内容为空，请输入正文内容"
        });
        return;
      }
      this.$refs["elForm"].validate((valid, object) => {
        if (valid) {
          this.formdata.content =
            process.env.NODE_ENV == "production"
              ? this.$refs.ue.getUEContent()
              : "";
            this.buttonDisabled = true;
            this.$api.bianhan
              .getPerson({
                id: this.id,
                type: "0",
                admin:'admin',//区分是否是管理员维护
              })
              .then(res => {
                this.seletOptionsData = this.shoNextNode(
                  this.seletOptionsData,
                  this.huanJieMessage.acyNodeNextBount
                );
                //带约束条件判断环节
                  //过滤重复环节
                  let PCSAVYIDs=[];
                  this.seletOptionsData = res.list.filter(item=>{
                      if(!PCSAVYIDs.includes(item.PCSAVYID)){
                        PCSAVYIDs.push(item.PCSAVYID);
                        return item;
                      }
                  });
                this.treeData = res.result.data;
                this.loadingTree = true;
                this.dialogState = true;

                this.buttonDisabled = false;
              })
              .catch(res => {
                this.buttonDisabled = false;
              });
        } else {
          this.invalidFun(object);
        }
      });
    },
    invalidFun(object) {
      for (let i in object) {
        let dom = this.$refs[i];
        dom.$el.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        break;
      }
      this.$message({
        type: "error",
        message: "请填写必填项"
      });
    },
    //删除
    deleteBianhan() {
      this.buttonDisabled = true;
      this.$api.bianhan
        .deleteBianHan({ id: this.formdata.id })
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    // 保存去除校验
    save() {
      this.beforeSave();
      let that=this;
      this.$api.bianhan
        .alertAddData(this.formdata)
        .then(res => {
          if(res.code1=='2'){
           that.$message({
              message:res.msg,
              type: "error"
            });
          }else{
           that.$message({
              message: "保存成功",
              type: "success"
            });
          }

          this.loadData();
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
   loadData() {
      this.buttonDisabled = false;
      this.$api.bianhan
        .distriDeal({
          id: this.id,
          type:'admin',
          numYear:this.numyear
        })
        .then(res => {
           this.isBnEdit=res.isBnEdit;
          try {
            this.formdata = res.bHMainOrderDo;
            this.selsecOrgOrDeptId=this.formdata.draftOrganId;
            this.formdata.draftDepartmentOne =res.bHMainOrderDo.draftDepartmentOne;
            this.formdata.draftDepartmentOneId =res.bHMainOrderDo.draftDepartmentOneId;
            this.formdata.sendList = res.sendList;
            this.formdata.commentsList = res.commentsList;
            try {
              this.formdata.cyList = res.cyList.filter(item => {
                //取传阅意见附件
                this.$api.setSysConfig
                  .getTextemList({ id: item.dataId, fileType: "10010",numYear:this.numyear })
                  .then(res => {
                    this.$set(item, "attachmentPos", res.data);
                    this.$forceUpdate();
                  });
                return item;
              });
            } catch (e) {
              this.formdata.cyList = res.cyList;
            }
            this.formdata.checkList = res.checkList;
            try {
              this.formList.cbList = res.cbList.filter(item => {
                this.$api.setSysConfig
                  .getTextemList({ id: item.id ,numYear:this.numyear})
                  .then(res => {
                    this.$set(item, "attachList", res.data);
                  })
                return item;
              });
            } catch (e) {
              this.formdata.cyList = res.cyList;
            }
            this.formdata.draftDepartmentOne =this.formdata.draftDepartmentOne || this.formdata.draftDepartment;
            this.formdata.wyIds = res.wyIds;
            this.formdata.yyIds = res.yyIds;
            this.formdata.attachid = [];
            this.getFileList();
            this.getHuanJie();
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formdata.content);
              if (this.formdata.hasDocumentNo == "true") {
                this.$refs.ue.setDsabled();
              }
            }, 1000);
          } catch (e) {
            console.log("数据加载环节" + e);
          }
        });
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id,numYear:this.numyear }).then(res => {
        this.formdata.attchmentFileInfo = res.data;
        this.$forceUpdate();
        this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
      });
    },
    getHuanJie() {
      this.$api.bianhan
        .getHuanJie({
          id: this.id,
          type: "0",
          currentUserId: this.$route.query.deptDetail
            ? JSON.parse(localStorage.getItem("bianhan")).humanId
            : ""
        })
        .then(res => {
          this.huanJieMessage = res.Fields;
          this.requiredFields = this.setRequiredFields(
            this.requiredFields,
            this.huanJieMessage.requiredFields
          );
          this.readFields = this.setReadFields(
            this.readFields,
            this.huanJieMessage.readFields
          ); //不可编辑控制域
          // this.buttonList = this.showButton(
          //   this.buttonList,
          //   this.huanJieMessage.visibleButtons,
          //   this.huanJieMessage.visibleButtonsBycondition
          // ); //按钮

          // //批量下载反馈附件继承导出反馈意见显示条件
          // let daochufankuiyijian = false;
          // for (let i = 0; i < this.buttonList.length; i++) {
          //   if (this.buttonList[i].name == "导出反馈意见") {
          //     daochufankuiyijian = this.buttonList[i].show;
          //   }

          //   if (this.buttonList[i].name == "批量下载反馈附件") {
          //     this.buttonList[i].show = daochufankuiyijian;
          //   }
          // }
          this.editedIdeaFields = this.setEditedIdeaFields(
            this.editedIdeaFields,
            this.huanJieMessage.editedIdeaFields,
            this.huanJieMessage.editedIdeaFieldsBycondition
          ); //可编辑意见域
          this.requiredIdeaFields = this.setRequiredIdeaFields(
            this.requiredIdeaFields,
            this.huanJieMessage.requiredIdeaFields
          ); //可编辑意见域
          this.setFormConfig();
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
      this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
      if (!this.formdata.attachs) {
        this.formdata.attachs = [];
      }
      files.forEach(item => {
        this.formdata.attachs.push(item.id);
      });
      this.formdata.attach = this.formdata.attachs.join(",");
      this.formdata.attachid = this.formdata.attachs.join(",");
      this.$forceUpdate();
    },
    //批量下载反馈附件
    batchExporFeedbackFile() {
      for (let i = 0; i < this.formList.cbList.length; i++) {
        let item = this.formList.cbList[i].attachList;
        for (let n = 0; !!item.length&&n < item.length; n++) {
            setTimeout(()=>{
               this.downFile(item[n],item[n].cbUnitShort+'_');
             },n/10*500)        
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
/deep/.zhusong .el-textarea__inner,
/deep/.chaosong .el-textarea__inner {
  min-height: 31px !important;
}
/deep/.displayClass {
  display: none;
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
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
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
  /*background: white;*/
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
    line-height: initial;
    display: flex;
    justify-content: flex-end;
    align-content: center;

    .left {
      margin-left: 20px;
    }

    .right {
      // margin-right: 20px;
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

    .cur_box {
      .cur_sess {
        float: left;
        display: flex;
        margin-top: 12px;

        p {
          // height: 30px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
        }
      }

      .feed_back {
        float: right;
        display: flex;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        color: #0f100e;
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

.select-chang {
  padding: 5px;
  font-size: 18px;
  margin-right: 8px;
  cursor: pointer;
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
  padding: 0 10px;
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
  color: #606266;
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
/deep/ .bianhaoDialog .el-dialog {
    max-width: 360px;
    .el-dialog__body{
          //  max-height: 160px;
          overflow: auto;
    }
    .el-radio__inner {
    border: 1px solid #666;
   }
    .el-radio-group{
    width: 80%;
    float: right;
    line-height: 20px;
    height: 20px;
    margin-top: 10px;
    }
}
</style>
