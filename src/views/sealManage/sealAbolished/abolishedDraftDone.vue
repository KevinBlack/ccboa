<template>
  <!-- 这是印章管理》印章废止新建/修改页 -->
  <div class="drafting" ref="drafting">
    <el-header>
      <div class="common-header">
        <div class="headerClicks grid_comtent">
          <el-button
            v-for="(item, index) in buttonList"
            :key="index"
            v-show="buttonList[index].show"
            @click="headerBtnClick(item.type)"
            plain
            size="mini"
          >{{item.name}}</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="title" ref="mainTitle">{{form.draftOrgan}}印章废止审批单</div>
      <el-form
        :model="form"
        :rules="rules"
        ref="elForm"
        label-width="120px"
        class="drafting-mainform"
      >
        <el-row class="box" :span="24">
          <el-col :span="3" style="width: auto;margin-right: 20px;">
            <el-form-item label="当前环节:" label-width="100px">
              <span style="color:#f60">{{form.currentNode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: auto;margin-right: 20px;">
            <el-form-item label="当前处理人:" label-width="120px">
              <span style="color:#f60">{{form.currentUser}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: auto;margin-right: 20px;">
            <el-form-item label="是否跨行:" label-width="90px">
              <span style="color:#f60">
                <el-radio-group v-model="form.findexBak" disabled>
                  <el-radio :label="'1'">非跨行</el-radio>
                  <el-radio :label="'0'">跨行</el-radio>
                </el-radio-group>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="documentNo">
              <el-input v-model="form.documentNo" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期" prop="cdate">
              <el-date-picker
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择日期"
                disabled
                v-model="form.cdate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请单位" prop="draftDepartment">
              <el-input placeholder="申请人名称" v-model="form.draftDepartment" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人" prop="creator">
              <el-input v-model="form.creator" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="form.tel" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="印章废止名称" prop="sealName">
              <el-select
                v-model="form.sealName"
                disabled
                style="width:100%;"
                filterable
                @change="changeName"
              >
                <el-option
                  v-for="item in deptList"
                  :key="item.sealNameId"
                  :label="item.sealName"
                  :value="item"
                ></el-option>
              </el-select>
              <!-- <el-button type="primary" style="float:right" >
              选择
              </el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 废止原因 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="废止原因" prop="reason">
              <el-select
                v-model="form.reason"
                filterable
                clearable
                style="width:100%;"
                @click="showDropClick"
                @blur="showDropBlur"
                @change="showDropChange"
                disabled
                placeholder="请选择或输入废止原因"
              >
                <el-option
                  v-for="(item, index) in revocatoryOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 废止依据-->

        <el-row>
          <el-form-item label="废止依据">
            <el-button type="primary" @click="importBtn" disabled size="mini">引入</el-button>

            <div v-for="(item,index) in YRcheck" :key="item.id">
              <span
                @click="YRJump(item)"
                style="display:inline-block;width:40%;"
              >{{item.documentNo?item.documentNo:item.documentCode}}</span>
              <el-button @click="YRJump(item)" size="mini" type="primary">查看详情</el-button>
              <el-button @click="importDle(item)" size="mini" type="danger" disabled>删除</el-button>
            </div>
          </el-form-item>
        </el-row>
        <el-dialog
          v-dialogDrag
          title="废止依据"
          :visible.sync="isdialogYR"
          width="40%"
          height="200px"
          :before-close="YRhandleClose"
        >
          <div style="margin-top:4px">
            <el-form ref="YRelForm" :rules="YRrules" :model="YRformData" label-width="160px">
              <el-form-item label="依据文件类型" prop="YRbusinName">
                <el-select v-model="YRformData.YRbusinName" style="width:73%">
                  <el-option
                    v-for="item in choobusiness"
                    :key="item.idType"
                    :label="item.name"
                    :value="item.idType"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文件字号" prop="YRwenhao" style="width:80%;margin-top:16px;">
                <el-input v-model="YRformData.YRwenhao" @change="wenhaoChange"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer">
            <el-button type="primary" @click="YRBacksure">确定</el-button>
            <el-button @click="YRhandleClose">取消</el-button>
          </span>
        </el-dialog>
        <!--引入详情-->
        <el-dialog
          v-dialogDrag
          title="查看依据文件"
          :visible.sync="isdialogYRDeal"
          width="80%"
          height="300px"
          :before-close="YRhandleCloseDeal"
        >
          <div style="margin-top:4px">
            <el-form :model="YRDeal" label-width="160px">
              <el-form-item label="文号" style="width:80%;margin-top:16px;">
                <el-input v-model="YRDeal.documentCode" disabled></el-input>
              </el-form-item>
              <el-form-item label="标题" style="width:80%;margin-top:16px;">
                <el-button type="text" @click="viewFile(YRDeal, '1')">{{YRDeal.title}}</el-button>
              </el-form-item>
              <!--     附件     -->
              <el-row>
                <el-form-item label="附件">
                  <el-col :span="24">
                    <div class="tree_w" v-if="YRDeal.file&&YRDeal.file.length">
                      <el-scrollbar>
                        <div v-for="(item,index) in  YRDeal.file" :key="item.id" class="comp_list">
                          <template>
                            <div class="command_file">
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
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
          <span slot="footer">
            <el-button type="primary" @click="YRBacksure">确定</el-button>
            <el-button @click="YRhandleCloseDeal">取消</el-button>
          </span>
        </el-dialog>

        <!-- 废止日期 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="废止日期" prop="webFzDate">
              <el-date-picker
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择日期"
                disabled
                v-model="form.webFzDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="申请单位主要负责人意见" prop="fzIdea">
              <el-row v-if="form.fzIdeas && form.fzIdeas.length==0">
                <el-input type="textarea" v-model="form.fzIdea" resize="none" disabled></el-input>
              </el-row>
              <div class="d_flex" v-if="form.fzIdeas.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item) in form.fzIdeas"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div style="word-break: break-all;">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span>{{item.lk}}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="交印人" prop="markUsers">
              <el-input v-model="form.markUsers" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交印时间" prop="markEndTime">
              <el-date-picker
                style="width: 100%;"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="请选择日期"
                disabled
                v-model="form.markEndTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="接收人" prop="chineseNodeUser">
              <el-input v-model="form.chineseNodeUser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接收时间" prop="markTime">
              <el-date-picker
                style="width: 100%;"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="请选择日期"
                disabled
                v-model="form.markTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="存放地点" prop="markAddres">
              <el-input v-model="form.markAddres" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row v-if="form.remarks && form.remarks.length==0 ">
                <el-input type="textarea" v-model="form.remark" resize="none" disabled></el-input>
              </el-row>
              <div class="d_flex" v-if="form.remarks.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item) in form.remarks"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <!-- <div
                        class="el-icon-delete"
                        @click="deleteItem(item)"
                        style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                        v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>-->
                    <div style="word-break: break-all;">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <!-- <span style="margin-right:10px">{{ item.ct }}</span> -->
                      <span>{{item.lk}}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="印模" v-if="filesList&&filesList.length" prop="filesList">
              <el-row>
                <el-form-item>
                  <el-col :span="24">
                    <div class="tree_w">
                      <el-scrollbar>
                        <div v-for="(item,index) in  filesList" :key="item.id" class="comp_list">
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
                                  v-if="filesList.length>1"
                                  :disabled="index==0"
                                  round
                                >上移</el-button>
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="downRow(index)"
                                  v-if="filesList.length>1"
                                  :disabled="index==filesList.length-1"
                                  round
                                >下移</el-button>
                                <!-- <el-button
                                  type="warning"
                                  size="mini"
                                  @click.native="deleteRow(index,item.id)"
                                  :disabled="item.disabled"
                                  round
                                >删除</el-button>-->
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
    </el-main>

    <!-- 完成并发送选人组件 -->
    <select-person
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :checkOrg="checkOrg"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :fromdata="form"
      :treeTradeCode="treeTradeCode"
      @showCompDialog="showCompDialog"
    ></select-person>

    <!-- 上传印模 -->
    <el-dialog title="引入印模" v-dialogDrag width="40%" :visible.sync="isShowFile">
      <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
    </el-dialog>
    <!-- 查看流程 -->
    <shiwu-flow :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></shiwu-flow>

    <!-- 生成编号 -->
    <bian-hao
      :fileNo="fileNo"
      @isok="isok"
      :isShow="bianshow"
      @isclose="isclose"
      :kongQuelist="kongQuelist"
    ></bian-hao>
  </div>
</template>
<script>
import yiyj from "../mixins/yiyj.js"; // 废止公共方法
// 设置页面元素显隐、置灰、校验等功能，
import pageSetMixins from "@/minixs/index";
// 添加message-one和message-some组件需要用到的方法
import messageMixins from "@/minixs/messageMixins.js";

// 导入选人组件（完成并发送时使用）
import selectPerson from "@/components/tree/treeTansun";

import uploadFileTs from "components/uploadFile/uploadFileTs"; //上传组件

// 导入部门机构选择组件
import selectOrgOrDept from "components/select/selectOrgOrDept";

// 导入留言输入显示组件
import MessageOne from "@/components/optionalfield/message-one.vue";
import MessageSome from "@/components/optionalfield/message-some.vue";
// 常用批语
import appendWriteList from "components/viewFlow/perWrit";

// 查看流程组件
import shiwuFlow from "@/components/viewFlow/shiwuFlow";

//上级行树组件
import supbankTree from "components/tree/superiorBank.vue";

import openOrDownLoadFile from "@/minixs/shiwuLineWord"; //在线预览

import bianHao from "@/components/createDocumentNo/bianHao"; //生成编号

import sealMarkMgrDocument from "../../printing/sealMarkMgrDocument.vue";

import exportTable from "@/minixs/exportTable";

import viewDraft from "@/minixs/viewDraft";

import minixs from "@/minixs/index";

import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";

export default {
  name: "sealAbolished",
  components: {
    "select-org-or-dept": selectOrgOrDept,
    "message-some": MessageSome,
    "select-person": selectPerson,
    "upload-file-ts": uploadFileTs,
    "shiwu-flow": shiwuFlow,
    appendWriteList: appendWriteList,
    "supbank-tree": supbankTree,
    "bian-hao": bianHao,
    sealMarkMgrDocument
  },
  mixins: [pageSetMixins, messageMixins, openOrDownLoadFile,yiyj,minixs,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data() {
    return {
      isKh:"0",
      isImportant: false, //引入按钮状态
      isdialogYR: false, //控制引入弹窗的是否展示

      isdialogYRDeal: false, //引入详情
      YRDeal: {
        YRCode: "",
        YRTitle: ""
      },
      YRcurrentBtn: [], //当前点击的引入依据
      YRformData: {
        YRbusinName: "", //引入类型
        YRwenhao: "〔〕号" //引入文号
      },
      YRcheck: [], //引入超链接
      choobusiness: [
        //引入依据的类型
        { name: "发文", idType: "1" },
        { name: "收文", idType: "2" },
        { name: "签报", idType: "3" },
        { name: "便函", idType: "4" }
      ],
      YRrules: {
        //引入依据必填校验
        YRbusinName: [
          { required: true, message: "请选择依据文件类型", trigger: "blur" }
        ],
        YRwenhao: [{ required: true, message: "请输入文号", trigger: "blur" }]
      },
      revocatoryOptions: [
        {
          value: "机构更名",
          label: "机构更名"
        },
        {
          value: "机构撤销",
          label: "机构撤销"
        },
        {
          value: "印章损坏",
          label: "印章损坏"
        },
        {
          value: "领导变更",
          label: "领导变更"
        }
      ], //废止原因
      Ttitle: "",
      fileNo: "",
      rules: {}, // 校验规则
      checked: false,
      checkYjx: false,

      buttonList: [
        { name: "关闭", type: "gb", show: true },
        // { name: "催办", type: "cb", show: true },
        { name: "收回", type: "sh", show: true },
        { name: "查看流程", type: "cklc", show: true },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "归档打印", type: "gddy", show: true },
        { name: "收藏", show: true, type: "sc" },
        { name: "操作指南", type: "czzn", show: true }
      ], // 功能按钮.设置了的为true
      // 表格
      formData: {},
      form: {
        findexBak: "0", //是否跨行 0-否 1-是
        currentUserId: "", // 当前环节应当的操作人ID
        currentUser: "", // 当前环节应当的操作人Nm
        currentNodeId: "", // 当前环节ID
        currentNode: "起草", //当前环节
        draftDepartment: "", // 申请单位
        draftDepartmentId: "", //申请单位Id
        cdate: formatData(new Date().getTime(), "YYYY-MM-DD"), // 申请日期
        creator: "", //申请人
        creatorId: "", //申请人Id
        documentNo: "", // 编号
        sealName: "", // 印章废止名称
        reason: "", // 印章废止原因
        remark: "", //备注
        tel: "", //联系电话
        webFzDate: "", // 废止日期
        markEndTime: "", // 交印日期
        markTime: "", // 接收日期
        markUsers: "", //交印人
        chineseNodeUser: "", //接收人
        markAddres: "", // 存放地点
        destoryPer: "", //印章销毁人
        fzIdea: "", //申请单位主要负责人签批
        shYj: "", //公示情况
        fzIdeas: [], //申请单位主要负责人签批
        remarks: [] //备注
      },
      /* 完成并发送相关参数 */
      singelCheckF: true, // 单选，多选标志。true-单选 false-多选
      dialogTypeNow: "next",
      dialogType: "dosend",
      offenUse: true,
      loadingTree: true, // 是懒加载还是非懒加载
      canTab: false,
      hasRadio: false, // 是否单选
      checkOrg: false,
      attTitleID: [], //附件名称所有ID
      filesArrayID: [],
      seletOptionsData: [], // 环节
      treeData: [], // 部门（人员树）
      dialogTit: "选择人员",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      id: "",
      treeTradeCode: "", // 发文交易线，如果不设置就为默认的2023的交易线，设置了值就用设置的交易线
      huanJieMessage: {},
      showOrgTree: false,
      dialogTitle: "发上级行",
      isSingle: true,
      documentNoNum1: "1",
      orgOrDept: 1,
      kongQuelist: [], //空缺文号
      orgOrDeptId: "0",
      uploadConfig: {
        filesHas: [],
        id: "",
        fileType: true,
        isSpecial: 0,
        formId: "xiaohui"
      },
      uploadConfigSet: {
        filesHas: [],
        id: "",
        fileType: true,
        isSpecial: 0,
        formId: "set"
      },
      isShowFile: false,
      isShowFileSet: false,
      filesList: [],
      filesArray: [],
      documentNoStatus: false,
      showFlowChart: false,
      tableData: [],
      bianshow: false,
      isLoginUser: true,
      pageType: "",

      localUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前人员ID
      lastOptionTime: "0",
      deptList: []
    };
  },
  methods: {
    //引入依据
    //判断引入文号i重复
    wenhaoChange() {},
    //引入
    importBtn() {
      this.isdialogYR = true;
    },
    //引入删除
    importDle(item) {
      if (item && item.id) {
        this.$api.checkLz
          .accordDelete({
            id: item.id,
            dataId: this.id
          })
          .then(res => {
            this.queryDeal();
          });
      } else {
        let currentIndex = 0;
        for (let i = 0; i < this.YRcheck.length; i++) {
          if (this.YRcheck[i].dataId == item.dataId) {
            currentIndex = i;
          }
        }
        this.YRcheck.splice(currentIndex, 1);
      }
    },
    //引入确定
    YRBacksure() {
      this.formData.dataType = this.YRformData.YRbusinName;
      this.formData.document = this.YRformData.YRwenhao;
      this.formData.currentUserOldId = this.humanId;
      let that = this;
      this.YRcheck &&
        this.YRcheck.map(item => {
          if (item.orderNo == that.YRformData.YRwenhao) {
            this.$message({
              type: "warning",
              message: "此文号已经被引入"
            });
            that.YRformData.YRwenhao = "";
          }
        });
      this.$refs["YRelForm"].validate(valid => {
        if (valid) {
          if (this.formData.dataType == "4") {
            this.$api.checkLz
              .importBas({
                documentNo: this.YRformData.YRwenhao,
                currentUserOldId: this.humanId
              })
              .then(res => {
                if (!res.result.id) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "4",
                    dataId: res.result.id,
                    title: res.result.title,
                    filePath:
                      !!res.result && !!res.result.filePath
                        ? res.result.filePath
                        : "",
                    fileName:
                      !!res.result && !!res.result.fileName
                        ? res.result.fileName
                        : ""
                  });
                  this.isdialogYR = false;
                }
              });
          } else if (this.formData.dataType == "1") {
            console.log("发文");
            let that = this;
            let obj = {
              function: "importBasis",
              multiTenancyId: "CN000",
              documentCode: this.YRformData.YRwenhao
            };
            this.$post
              .postData("importBasis", JSON.stringify(obj), "A0846C001")
              .then(res => {
                console.log("res", res);
                if (!res.data) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  if (res.data.fileName && res.data.filePath) {
                    res.data.attachList.push({
                      fileName: res.data.fileName,
                      filePath: res.data.filePath
                    });
                  }
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "1",
                    dataId: res.data.id,
                    title: res.data.title,
                    file: res.data.attachList,
                    filePath: res.data.filePath,
                    fileName: res.data.fileName
                  });
                  this.isdialogYR = false;
                }
              });
          } else if (this.formData.dataType == "2") {
            console.log("收文");
            let that = this;
            let obj = {
              function: "importBasis",
              multiTenancyId: "CN001",
              documentCode: this.YRformData.YRwenhao
            };
            this.$post
              .postData("importBasis", JSON.stringify(obj), "A0846C003")
              .then(res => {
                console.log("res", res);
                if (!res.data) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "2",
                    dataId: res.data.id,
                    title: res.data.title,
                    file: res.data.attachList,
                    filePath: res.data.filePath,
                    fileName: res.data.fileName
                  });
                  console.log("this.YRcheck", this.YRcheck);
                  this.isdialogYR = false;
                }
              });
          } else if (this.formData.dataType == "3") {
            console.log("签报");
            let that = this;
            let obj = {
              function: "importBasis",
              multiTenancyId: "CN002",
              documentCode: this.YRformData.YRwenhao
            };
            this.$post
              .postData("importBasis", JSON.stringify(obj), "A0846C005")
              .then(res => {
                console.log("res", res);
                if (!res.data) {
                  this.$message({
                    type: "warning",
                    message: "没有找到相应文档"
                  });
                } else {
                  this.YRcheck.push({
                    orderNo: this.YRformData.YRwenhao,
                    dataType: "3",
                    dataId: res.data.id,
                    title: res.data.title,
                    file: res.data.attachList,
                    filePath: res.data.filePath,
                    fileName: res.data.fileName,
                    zrType: res.data.orderType,
                    draftDepartmentId: res.data.draftDepartmentId
                  });
                  this.isdialogYR = false;
                }
              });
          }
        }
      });
    },
    //引入关闭
    YRhandleClose() {
      this.isdialogYR = false;
    },
    //保存引入依据
    saveImport() {
      let that = this;
      that.importArr = [];
      console.log("this.YRcheck", this.YRcheck);
      this.YRcheck &&
        this.YRcheck.map(item => {
          if (!item.hasOwnProperty("multiTenancyId")) {
            that.importArr.push({
              dataType: item.dataType,
              dataId: item.dataId,
              orderNo: item.orderNo,
              title: item.title,
              fileName: item.fileName,
              filePath: item.filePath
            });
          }
        });
      console.log("that.importArr2", that.importArr);
      this.formData.infoList = this.importArr;
    },
    YRhandleCloseDeal() {
      this.isdialogYRDeal = false;
    },
    // 废止原因
    showDropBlur(e) {
      if (e.target.value !== "") {
        this.value = e.target.value;
        this.$forceUpdate();
      }
    },
    showDropClick() {
      this.value = "";
      this.$forceUpdate();
    },
    showDropChange(val) {
      this.value = val;
      this.$forceUpdate();
    },
    // 引入废止依据
    introduce() {
      this.$alert("引入废止依据", "引入废止依据", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: action => {
          this.$message({
            type: "info",
            message: `action:${action}`
          });
        }
      });
    },
    //按钮公共调用
    headerBtnClick(params) {
      switch (params) {
        case "gb": //关闭
          this.$intent.closeWindow(this);
          break;
        case "bc": //保存
          break;
        case "sh": //收回
          this.$api.sealManage.sealAbolished
            .shouhuiBtn({ id: this.id })
            .then(res => {
              this.$message({
                type: "success",
                message: "收回成功"
              });
              this.$intent.closeWindow(this);
            });
          break;
        case "wcbfs": //完成并发送
          break;
        case "cb": //催办
          this.cuiBan();
          break;
        case "scbh": //生成编号
          break;
        case "bj": //办结
          this.$confirm("是否办结?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            distinguishCancelAndClose: true,
            type: "warning",
            callback: action => {
              if (action === "confirm") {
                this.$api.sealManage.sealAbolished
                  .destend({ over: true, id: this.id })
                  .then(res => {
                    this.$message({
                      type: "success",
                      message: "办结成功"
                    });
                    this.$intent.closeWindow(this);
                  });
              } else if (action === "cancel") {
              } else if (action === "close") {
              }
            }
          });

          break;
        case "sccw": //删除此文
          this.descDel();
          break;
        case "yrym": //引入印模
          this.uploadYM();
          break;
        case "cklc": //查看流程
          this.getProcess();
          break;
        case "bjgb": //办结关闭
          this.$intent.closeWindow(this);
          break;
        case "gddy": //归档打印
          this.$intent.goNewPage(this, {
            path: "/sealManage/sealAbolished/printPreview",
            query: { id: this.id }
          });
          break;
        case "czzn": //操作指南
          this.handBook("YZGL");
          break;
        case "sc": //收藏
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
              this.$api.sealManage
                .shoucang({ markOrderType: "6", id: this.id })
                .then(res => {
                  console.log(res, "获取收藏返回值");
                  let obj = {};
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
                  this.$message({
                    type: "success",
                    offset: "200",
                    message: "收藏完成"
                  });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });

          break;
        default:
          break;
      }
    },
    //获取详情
    destroyForm() {
      this.$api.sealManage.sealAbolished
        .destroyForm({ id: this.id })
        .then(res => {
          this.form = res.data;
          if (this.form.fzIdeas == undefined) {
            this.form.fzIdeas = [];
          }
          if (res.ifShouHui === "0") {
            this.buttonList.forEach(item => {
              if (item.type == "sh") {
                item.show = false;
              }
            });
          }
          if (res.data.sendBase) {
            this.YRcheck = JSON.parse(res.data.sendBase);
          }
          this.isKh = res.data.isKh;
          if(this.isKh == "0") {
            this.form.findexBak = "0"
          } else {
            this.form.findexBak = "1"
          }
          console.log(this.buttonList);
          this.form.sealName = this.form.markYzName;
          //this.form.findexBak = this.$route.query.IntrBnk_IndCd; //是否跨行
          console.log(this.$route.query);
          console.log(this.form, "22222222222222222222");

          this.id = res.data.id;
          // this.documentNoStatus =
          // this.form.documentNo.split("〕")[1].length > 1;
          let As = res.data.documentNo.split("〕")[1];
          console.log(As, "as");

          if (As === "号") {
            this.documentNoNum1 = "1";
          } else {
            this.documentNoNum1 = "2";
          }
          // this.getLink();
          this.getFileList();
        });
    },
    changeName(val) {
      console.log(val, "val");
      this.form.markYzName = val.sealName;
      this.form.sealName = val.sealName;
      this.form.sealNameId = val.sealNameId;
    },
    //保存
    saveData() {
      console.log(this.form);
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.sealManage.sealAbolished
            .destroyAdd(this.form)
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.id = res.id;
              this.createFile();
              this.createFileSet();
              this.destroyForm();
            })
            .catch(err => {});
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项"
          });
        }
      });
    },
    updateData() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.sealManage.sealAbolished
            .destroySave({ ...this.form, id: this.id })
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.destroyForm();
            })
            .catch(err => {});
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项"
          });
        }
      });
    },
    // 下载
    downFile(file) {
      console.log("00000000", file);
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.yzglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              // console.log('111111111111',res)
              // console.log('222222222222',this.$post.getEnvState())
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
    //催办
    cuiBan() {
      this.$api.sealManage.sealAbolished
        .cuiBan({
          id: this.id
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: res.msg,
              type: "success"
            });
          }
        });
    },
    //返回上一处理人
    backPerson() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.sealManage.sealAbolished
            .destbeBack({
              id: this.id,
              thType: "1"
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.$intent.closeWindow(this);
              }
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项"
          });
        }
      });
    },
    //完成并发送
    async send() {
      // if (this.filesList.length == 0) {
      //   this.$message({
      //     type: "warning",
      //     message: "请引入印模"
      //   });
      // } else {
      this.id == null || this.id == ""
        ? await this.$api.sealManage.sealAbolished
            .destroyAdd(this.form)
            .then(res => {
              this.id = res.id;
              this.createFile();
              this.createFileSet();
            })
        : this.$api.sealManage.sealAbolished
            .destroySave({ ...this.form, id: this.id })
            .then(res => {
              this.createFile();
              this.createFileSet();
            });
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.dialogState = true;
          this.$api.sealManage.sealAbolished
            .destroySend({ id: this.id })
            .then(res => {
              console.log(this.seletOptionsData);

              this.seletOptionsData = this.shoNextNode(
                res.data.list,
                this.huanJieMessage.acyNodeNextBount
              );
            })
            .catch(err => {});
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项"
          });
        }
      });
      // }
      // }
    },
    showCompDialog(data, status, type, params, dtype) {
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      this.dialogState = false;
      if (status) {
        this.form.nextUserName = data[0].name;
        // this.form.nextUserId =
        //   data[0].idStr.toString() + "#" + data[0].deptId.toString();
        this.form.nextUserId = data[0].id;
        this.form.nextAvyId = params.id;
        this.form.nextAvyName = params.name;
        this.form.id = this.id;
        this.form.clLx = "完成并发送";
        this.form.unitId = data[0].id.split("#")[1];
        // this.form.over = true; //办结标示
        this.$api.sealManage.sealAbolished
          .destroySendFor(this.form)
          .then(res => {
            if (res.code === "SUCCESS") {
              this.$intent.closeWindow(this);
            }
          })
          .catch(err => {});
      }
    },

    // 生成编号
    generateNumber(val) {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.sealManage
            .getSealNum({
              markOrderType: "6",
              statusType: true,
              id: this.$route.query.id,
              fileNo: val
            })
            .then(res => {
              this.documentNoNum1 = "2";
              this.$set(this.form, "documentNo", res.data);

              // this.getLink();
              this.$message({
                type: "success",
                message: "生成编号成功!"
              });

              this.bianshow = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项"
          });
        }
      });
    },

    //归档打印
    print() {},
    //删除此文
    descDel() {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.sealManage.sealAbolished
          .destroyDel({ id: this.id })
          .then(res => {
            if (res && res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.$intent.closeWindow(this);
            }
          });
      });
    },
    //引入印模
    uploadYM() {
      this.isShowFile = true;
    },
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.form.attachid,
          fileType: "0"
        })
        .then(res => {});
    },
    createFileSet() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id + "1",
          fileId: this.form.filesid,
          fileType: "0"
        })
        .then(res => {});
    },
    //获取印模列表
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.id
        })
        .then(res => {
          console.log(res);
          // this.filesList = res.data;
          this.$nextTick(() => {
            this.$set(this.uploadConfig, "filesHas", res.data);
            this.filesList = res.data;
          });
          console.log(this.filesList, "this.filesList");
        })
        .catch(err => {});
    },

    //上传印模
    fileList(files) {
      this.isShowFile = false;
      if (this.filesList && this.filesList.length) {
        this.filesList.push(...files);
      } else {
        this.filesList = files;
      }
      files.forEach(item => {
        this.attTitleID.push(item.id);
      });
      this.form.attachid = this.attTitleID.join(",");
      this.$forceUpdate();
    },

    //删除印模
    deleteRow(n, id) {
      console.log(n, id);
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
                // this.getFileList();
                // this.getFileArray();
                this.filesList.splice(n, 1);
                this.$forceUpdate();
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
    deleteRowSet(n, id) {
      console.log(n, id);
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
                this.filesArray.splice(n, 1);
                this.$forceUpdate();
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
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.filesList[n - 1].id,
          sort: this.filesList[n].sort
        },
        {
          id: this.filesList[n].id,
          sort: this.filesList[n - 1].sort
        }
      );
      midObj = this.filesList[n];
      this.filesList[n] = this.filesList[n - 1];
      this.filesList[n - 1] = midObj;
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
          id: this.filesList[n + 1].id,
          sort: this.filesList[n].sort
        },
        {
          id: this.filesList[n].id,
          sort: this.filesList[n + 1].sort
        }
      );
      midObj = this.filesList[n];
      this.filesList[n] = this.filesList[n + 1];
      this.filesList[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    // 外部单位上传下载排序
    isok(v) {
      this.generateNumber(val);
      // this.getSealNum(true, v);
    },
    isclose() {
      this.bianshow = false;
    },
    //查看流程
    getProcess() {
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.form.workflowId,
          subProcessInstId:
            this.form.workflowId == this.form.supWorkflowId
              ? ""
              : this.form.supWorkflowId
        })
        .then(res => {
          console.log(res);
          this.showFlowChart = true;
          this.tableData = res.data;
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        })
        .catch(err => {});
    },
    // 查询印章废止名称
    seachTitle() {
      this.$api.sealManage.sealAbolished
        .seachTitle({ sealStatus: "A03", sealName: "" })
        .then(res => {
          let deptAry = res.list;
          for (let i = 0; i < deptAry.length; i++) {
            this.deptList.push({
              sealNameId: deptAry[i].id,
              sealName: deptAry[i].sealName
            });
          }
          console.log(this.deptList, "this.deptList");
        });
    }
  },
  created() {
    this.Ttitle = JSON.parse(localStorage.unitInfo)[0].unitName;
    console.log(this.$route.query);
    this.form.currentUser = this.$route.query.deptDetail
      ? JSON.parse(this.$route.query.deptDetail).humanName
      : "";
    this.form.currentUserId = this.$route.query.deptDetail
      ? JSON.parse(this.$route.query.deptDetail).humanId
      : "";
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.uploadConfig.id = this.id;
      this.uploadConfigSet.id = this.id + "1";
      this.destroyForm();
    } else {
      this.form.tel = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).telMobile //联系电话
        : "";
      this.form.draftDepartment = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).firstUnitName //申请单位
        : "";
      this.form.draftDepartmentId = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).firstUnitId.toString()
        : ""; //申请单位Id
      this.form.creator = JSON.parse(
        localStorage.getItem("userInfo")
      ).humanName; //申请人
      this.form.creatorId = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).humanId
        : ""; //申请人Id
      this.$api.sealManage
        .getSealNum({
          markOrderType: "6",
          statusType: false,
          draftDepartmentId: this.form.draftDepartmentId
        })
        .then(res => {
          this.$set(this.form, "documentNo", res.data);
          this.$set(this.form, "cdate", res.newDateYY);
        });
      // this.getSealNum(false);
      // this.getLink(); // 获取环节
    }
    this.seachTitle(); //查询印章废止名称
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.red {
  color: "#E00";
}
.textCenter {
  text-align: center;
}
.drafting {
  background: #fff;
  min-height: 100vh;
  position: relative;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;
    .left {
      margin-left: 20px;
      cursor: pointer;
    }
    .right {
      float: right;
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
    }
    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
// .el-header {
//     width: 100%;
//     background-color: #409eff;
//     color: #333;
//     line-height: 60px;
//     z-index: 2;
// .slider-contaner {
//     width: 100%;
//     height: 60px;
//     overflow: hidden;
//     position: relative;
// }
// .slider {
//     width: 1200px;
//     height: 60px;
// }
// }
.common-header {
  width: 100%;
  display: flex;
  background: #409eff;
  justify-content: space-between;
  align-items: center;
  .back {
    line-height: 60px;
    height: 60px;
    margin-left: 2%;
    color: #eee;
  }
}

.el-main {
  width: 100%;
  .box {
    width: 100%;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    height: 40px;
    margin: 0 0 20px 0;
  }
  .processOffset {
    margin-top: 10px;
    margin-right: 50px;
  }
  /deep/ .el-badge__content {
    height: 22px;
  }
  .title {
    width: 100%;
    min-height: 90px;
    line-height: 90px;
    text-align: center;
    // font-size: 35px;
    // color: #409eff;
    font-size: 44px;
    color: #096dd9;
    font-weight: 500;
  }
  .drafting-mainform {
    width: 92%;
    border: 1px solid #dcdfe6;
    padding: 2% 2%;
    margin: auto;
  }
  .wrap {
    position: relative;
  }
  .wrap::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(100, 100, 1000, 0.2);
    z-index: 1;
  }
  .card-minPadding {
    /deep/ .el-card__body {
      padding: 0 10px;
    }
  }
  .not-show {
    display: none;
  }
  .img-init {
    display: inline-block;
    min-width: 100px;
    min-height: 100px;
    max-width: 400px;
    max-height: 400px;
    border: 1px solid #c5c5c5;
  }
  .my-label {
    width: 100px;
    line-height: 32px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
}
.d_flex {
  display: flex;
  padding-bottom: 20px;

  .d_b100 {
    width: 100%;
  }

  .d_f1 {
    flex: 1;
    border: 1px solid #999;
    border-radius: 2px;
  }
}
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
}
.content-container:hover {
  border: 1px solid #8996af;
}
.pad_lr10 {
  margin: 0 0 0 16px;
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
}
.headerClicks {
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #409eff;
  display: flex;
  .el-button {
    margin: 10px 0 0 10px;
  }
}
.file-form {
  height: 200px;
  padding: 1px 20px;
  overflow: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .file-item {
    display: flex;
    margin-bottom: 16px;
    .text-default {
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
    .btns {
      .margin-default {
        margin-right: 15px;
      }
    }
  }
}
</style>
