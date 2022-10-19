<template>
  <div v-cloak>
    <el-row>
      <el-col>
        <el-form :model="bank_countersignature" ref="bank_countersignature" label-width="100px" class="demo-bank_countersignature mt20" :class="{mtdown:down}">
          <el-row>
            <el-col :span="6">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select v-model="bank_countersignature.choseYear" @change="selectYear" placeholder="近两年" style="width: 100%;">
                  <el-option value label="近两年"></el-option>
                  <el-option v-for="yearItem in yearList" :key="yearItem" :label="yearItem" :value="yearItem"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="拟稿日期">
                <div class="block">
                  <el-date-picker @change="timeChange()" v-model="draftTime" type="daterange" align="right" unlink-panels range-separator="-" style="max-width:300px;" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="bank_countersignature.title" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="签报字号" prop="documentNo">
                <el-input v-model="bank_countersignature.documentNo" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="text-align:center;margin-bottom:10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <!-- <el-button type="primary" @click="exportExc">导出当前查询页</el-button> -->
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
            <!-- <el-row>
              <el-col :span="6">
                <el-form-item label="拟稿单位" prop="hostDepartment">
                  <el-input v-model="bank_countersignature.hostDepartment" readonly="readonly" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1" :offset="1">
                <el-button type="primary">选择</el-button>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item label="承办部门" prop="hostDepartment">
                  <el-input v-model="bank_countersignature.hostDepartment" readonly="readonly" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1" :offset="1">
                <el-button type="primary">选择</el-button>
              </el-col>
            </el-row>-->
            <el-row>
              <!-- <el-col :span="8">
              <el-form-item label="部门签署日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange(events)"
                    v-model="bank_countersignature.endTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    style="max-width:300px;"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col> -->
              <el-col :span="6">
                <el-form-item label="呈送" prop="submittedName">
                  <el-input v-model="bank_countersignature.submittedName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系人">
                  <el-input v-model="bank_countersignature.draftUserName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="bank_countersignature.qianBaoTypeName=='行签报'">
              <el-col :span="6">
                <el-form-item label="发送秘书时间">
                  <div class="block">
                    <el-date-picker @change="sendSecretaryTimeChange()" v-model="sendSecretaryTime" type="daterange" align="right" unlink-panels range-separator="-" style="max-width:300px;" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="办公室审核时间">
                  <div class="block">
                    <el-date-picker @change="officeCheckTimeChange()" v-model="officeCheckTime" type="daterange" align="right" unlink-panels range-separator="-" style="max-width:300px;" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="6">
                <el-form-item label="拟稿单位">
                  <el-input v-model="bank_countersignature.orgName" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="getTreeData('nigao')">选择</el-button>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="拟稿部门">
                  <el-input v-model="bank_countersignature.draftDepartmentName" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="getTreeData('nigaobm')">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="签报类型">
                  <el-radio-group v-model="bank_countersignature.qianBaoTypeName">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="行签报">行签报</el-radio>
                    <el-radio label="部内签报">部内签报</el-radio>
                    <el-radio label="部间签报">部间签报</el-radio>
                    <el-radio label="跨行签报">跨行签报</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理类型">
                  <el-radio-group v-model="bank_countersignature.handleType">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="0">批件</el-radio>
                    <el-radio label="1">阅件</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="bank_countersignature.qianBaoTypeName=='跨行签报'">
              <el-col :span="12">
                <el-form-item label="跨行类型">
                  <el-radio-group v-model="bank_countersignature.khlx">
                    <el-radio label="本级行上报">本级行上报</el-radio>
                    <el-radio label="下级行上报">下级行上报</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="签报状态">
                  <el-radio-group v-model="bank_countersignature.qbzt">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="1">流转</el-radio>
                    <el-radio label="2">办结</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="签报类别">
                  <el-radio-group v-model="bank_countersignature.qblb">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="1">电子</el-radio>
                    <el-radio label="2">实物</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="有无文号">
                  <el-radio-group v-model="bank_countersignature.ywwh">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="1">有文号</el-radio>
                    <el-radio label="2">无文号</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="表单类型">
                  <el-radio-group v-model="bank_countersignature.bdlx">
                    <el-radio label="1">会签单</el-radio>
                    <el-radio label="2">协办单</el-radio>
                    <el-radio label="3">非会签协办单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="附件名称">
                  <el-radio-group v-model="bank_countersignature.attachTitle">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="1">有</el-radio>
                    <el-radio label="2">无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="字数">
                  <el-col :span="5">
                    <el-input type="number" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')" v-model="bank_countersignature.sizeFactStart" placeholder="请输入"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">
                    至
                  </el-col>
                  <el-col :span="5">
                    <el-input type="number" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')" v-model="bank_countersignature.sizeFactEnd" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-form-item label="行领导环节">
                <el-checkbox-group v-model="bank_countersignature.type">
                  <el-checkbox label="系统管理员"></el-checkbox>
                  <el-checkbox label="系统管理员2"></el-checkbox>
                  <el-checkbox label="系统管理员3"></el-checkbox>
                  <el-checkbox label="系统管理员4"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row> -->
            <el-row>
              <el-form-item label="会签部门">
                <el-radio-group v-model="bank_countersignature.hqbmCount">
                  <el-radio label="">全部</el-radio>
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">单个</el-radio>
                  <el-radio label="2">多个</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="24" style="padding-top:25px">
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                  <!-- <el-button type="primary" @click="exportExc">导出当前查询页</el-button> -->
                </el-row>
                <el-row>
                  <el-col class="down" v-if="down">
                    <el-button type="info" size="small" @click="arrow()">
                      <i class="el-icon-arrow-up el-icon--left"></i> 收起
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <!-- <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="arrow()">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col> -->
        </el-form>
      </el-col>
      <el-col style="margin: 5px 0 0 0 ;text-align: right;">
        <el-button @click="downLoad" :disabled="plxzButton">批量下载</el-button>
        <!-- <el-button  @click="exportExc(1)">导 出</el-button> -->
        <el-button style="margin-left: 10px;" size="small" @click="handelShowCostCustom">导出自定义</el-button>
      </el-col>
      <!-- <el-col class="mt20end">    v-if="isEnd" -->
      <el-col style="margin: 5px 0;">
        <m-table id="nomal" class="nomal" size="medium" :isSelection="true" :isIndex="true" :isPagination="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" @cellClick="cellClick" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @handleSelectionChange="handleSelectionChange" v-loading="tableLoading" :default-sort="sortDate"></m-table>
        <m-table v-show="false" id="custom" class="custom" size="medium" :isSelection="false" :isIndex="false" :isPagination="true" :isHandle="false" :tableData="tableData1" :tableCols="tableColsCustom" :pagination="pagination" :state="bank_select.state" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @cellClick="cellClick" v-loading="tableLoading" :default-sort="sortDate">
        </m-table>
      </el-col>
    </el-row>
    <treeCofig :treeData="treeData" :canTab="canTab" :loadingTree="loadingTree" :hasRadio="hasRadio" :dialogType="dialogType" :dialogTypeNow="dialogTypeNow" :dialogTit="dialogTit" :checkIds="checkIds" :checkData="checkData" :singelCheckF="singelCheckF" :dialogState="dialogState" :offenUse="offenUse" :fromdata="bank_countersignature" :titleWords="titleWords" :checkOrg="checkOrg" :seletOptionsData="seletOptionsData" :searchByContact="searchByContact" @showCompDialog="showCompDialog" :treeTradeCode="treeTradeCode"></treeCofig>
    <el-dialog v-dialogDrag :visible.sync="showustom">
      <div slot="title" class="custom_title">自定义导出列<span>请勾选需要导出列</span></div>
      <!-- <el-checkbox-group v-model="checkList"> -->
      <!-- <el-row>
          <el-col :span="7">
            <el-checkbox v-for="item in customData" :label="item.label" :key="item.prop">{{ item.label }}</el-checkbox>
          </el-col>
        </el-row> -->
      <el-row>
        <el-col class="check_area">
          <el-row>
            <el-col :span="24" style="margin-bottom:10px;">
              <span class="check_area_title">文件状态</span>
              <el-checkbox :indeterminate="isStateCheck" v-model="isStateAll" @change="handleStateAll">全选</el-checkbox>
            </el-col>
            <el-checkbox-group v-model="stateList" @change="stateChange">
              <el-col :span="8" :offset="1">
                <el-checkbox label="当前环节" value="curNodeName"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="当前处理人" value="currentUser"></el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </el-col>
        <el-col class="check_area">
          <el-row>
            <el-col :span="24" style="margin-bottom:10px;">
              <span class="check_area_title">文件要素</span>
              <el-checkbox :indeterminate="isElementCheck" v-model="isElementAll" @change="handleElementAll">全选</el-checkbox>
            </el-col>
            <el-checkbox-group v-model="elementList" @change="elementChange">
              <el-col :span="8" :offset="1">
                <el-checkbox label="拟稿日期" value="draftTime"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="办公室审核时间" value="officeCheckTime"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="传阅人" value="chuanyueName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="签报字号" value="sendBasisName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="处理类型" value="handleType1"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="秘密类型" value="secretType"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="联系人" value="contactName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="签报种类" value="qianBaoTypeName"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="秘密期限类型" value="secretLimitType"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="拟稿部门" value="draftDepartmentName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="签报类型" value="orderType"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="秘密标志" value="workSecretFlag"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="标题" value="title"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="紧急程度" value="emergencyLevelName"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="密级和保密期限" value="secretFlag"></el-checkbox>
              </el-col>
              <!-- <el-col :span="7"><el-checkbox label="密级标志" value="secretFlag"></el-checkbox></el-col> -->
              <el-col :span="8" :offset="1">
                <el-checkbox label="呈送" value="submittedName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="联系电话" value="phone"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="附件名称" value="attachment"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="会签/协办部门" value="depName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="签报依据" value="qianbaoCode"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="会签部门" value="signDepartmentName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="发送秘书时间" value="sendSecretaryTime"></el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </el-col>
        <el-col class="check_area">
          <el-row>
            <el-col :span="24" style="margin-bottom:10px;">
              <span class="check_area_title">传阅信息</span>
              <el-checkbox :indeterminate="isObjCheck" v-model="isObjAll" @change="handleObjAll">全选</el-checkbox>
            </el-col>
            <el-checkbox-group v-model="objList" @change="objChange">
              <el-col :span="8" :offset="1">
                <el-checkbox label="传阅人员已阅" value="yiYue"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="传阅人员未阅" value="weiYue"></el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </el-col>
      </el-row>
      <!-- </el-checkbox-group> -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="showustom = false">关 闭</el-button>
        <el-button type="primary" @click="handleSaveCustom">导 出</el-button>
      </span>
    </el-dialog>
    <div class="el-loading-mask is-fullscreen" style="z-index: 2007;" v-show='isLoading'>
      <div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </div>
    </div>
  </div>
</template> 

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";
import treeCofig from "@/components/tree/tree-fawen";
import viewDraft from "@/minixs/viewDraft";
import signquoteIndex from "@/minixs/signquoteIndex";
const finshData = [
  { label: "拟稿日期", prop: "draftTime", align: "center" },
  { label: "签报字号", prop: "documentNo", align: "center" },
  { label: "联系人", prop: "draftUserName", align: "center" },
  { label: "拟稿部门", prop: "draftDepartmentName", align: "center" },
  { label: "标题", prop: "title", align: "center" },
  { label: "当前环节", prop: "curNodeName", align: "center" },
  { label: "当前处理人", prop: "currentUser", align: "center" },
  { label: "呈送", prop: "submittedName", align: "center" },
  { label: "会签/协办部门", prop: "signDepartmentName", align: "center" },
  { label: "办公室审核时间", prop: "officeCheckTime", align: "center" },
  { label: "发送秘书时间", prop: "sendSecretaryTime", align: "center" }
];
const year = new Date().getFullYear();
export default {
  name: "Swcx",
  components: {
    mTable, treeCofig
  },
  mixins: [viewDraft, signquoteIndex],
  data() {
    return {
      isLoading: false,
      plxzButton: false,
      msgState: true,
      downLoadTime: 1,
      showustom: false,
      isStateAll: true,
      isStateCheck: false,
      isElementAll: false,
      isElementCheck: true,
      isObjAll: false,
      isObjCheck: false,
      checkList: [],
      stateList: ["当前环节", "当前处理人"],
      elementList: ["拟稿日期", "办公室审核时间", "签报字号", "联系人", "拟稿部门", "标题", "呈送", "会签/协办部门", "发送秘书时间"],
      objList: [],
      tableData1: [],
      selectionArr: [],
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      checkOrg: '',
      treeTradeCode: "", //完成并发送  树  拆
      // 拟稿单位  
      undertakeDeptIdData: { function: "getCurrUnitTreeTree", openSub: true, openCurrFistDept: false },
      // 拟稿部门
      // receiveOrgIdData: { function: "unitTreeByFirst", "openSup":false,openSubDept: false,"openCurr":true,"treeCofig":true,"openEqual":true,"openSub":true,flag:true},
      // receiveOrgIdData: { "function":"unitTreeByFirst","flag":true,"openSup":false,"openSupDept":false,"openCurr":true,"openCurrFistDept":true,"openEqual":false,"openEqualDept":false,"openSub":false,"openSubDept":false},
      receiveOrgIdData: {
        function: "unitTreeByFirst",
        flag: true,
        openSup: false,
        openSupDept: true,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: ''
      },
      // 联系人
      sendOrgIdData: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      bank_select1: {
        function: "finaAllQueryDateList",
        state: 1
      },
      bank_countersignature: {
        function: "finaAdllQuerList",
        bdlx: "3",
        page: 1, //当前页数
        limit: 20, //每页条数
        total: 0,
        choseYear: "",
        draftTimeStart: "",
        draftTimeEnd: "",
        sendSecretaryTimeStart: "",
        sendSecretaryTimeEnd: "",
        officeCheckTimeStart: "",
        officeCheckTimeTimeEnd: "",
        documentNo: "〔" + year + "〕",
        title: "",
        submittedName: "",
        orgId: "",
        draftDepartmentId: "",
        draftUserId: "",
        qianBaoTypeName: "",
        handleType: "",
        qbzt: "",
        khlx: "",
        qblb: "",
        ywwh: "",
        attachTitle: "",
        sizeFactStart: "",
        sizeFactEnd: "",
        handleType: "",
        hqbmCount: "",
        unitName: "",
        unitId: "",
      },
      yearList: [],
      draftTime: "",
      sendSecretaryTime: "",
      officeCheckTime: "",
      down: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      treeData: [],
      singelCheckF: true,
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      undertakeCheckData: [], //拟稿单位选中数据
      receiveOrgCheckData: [], //拟稿部门选中数据
      draftUserCheckData: [], //联系人选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogTit: "", // 弹框标题
      titleWords: "",
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false,
      searchByContact: true,//过滤单选
      idType: "",
      bank_select: {
        state: 1
      },
      tableColsCustom: [],
      customData1: [
        { label: "当前环节", prop: "curNodeName" },
        { label: "当前处理人", prop: "currentUser" },
      ],
      customData2: [
        { label: "拟稿日期", prop: "draftTime" },
        { label: "办公室审核时间", prop: "officeCheckTime" },
        { label: "传阅人", prop: "chuanyueName" },
        { label: "签报字号", prop: "sendBasisName" },
        { label: "处理类型", prop: "handleType1" },
        { label: "秘密类型", prop: "secretType" },
        { label: "联系人", prop: "contactName" },
        { label: "签报种类", prop: "qianBaoTypeName" },
        { label: "秘密期限类型", prop: "secretLimitType" },
        { label: "拟稿部门", prop: "draftDepartmentName" },
        { label: "签报类型", prop: "orderType" },
        { label: "秘密标志", prop: "workSecretFlag" },
        { label: "标题", prop: "title" },
        { label: "紧急程度", prop: "emergencyLevelName" },
        // {label:"密级标志", prop:"secretFlag"},
        { label: "呈送", prop: "submittedName" },
        { label: "联系电话", prop: "phone" },
        { label: "密级和保密期限", prop: "secretFlag" },
        { label: "会签/协办部门", prop: "depName" },
        { label: "签报依据", prop: "qianbaoCode" },
        { label: "附件名称", prop: "attachment" },
        { label: "发送秘书时间", prop: "sendSecretaryTime" },
        { label: "会签部门", prop: "signDepartmentName" },
      ],
      customData3: [
        { label: "传阅人员已阅", prop: "yiYue" },
        { label: "传阅人员未阅", prop: "weiYue" },
      ],
      customData: [
        { label: "当前环节", prop: "curNodeName" },
        { label: "当前处理人", prop: "currentUser" },
        { label: "拟稿日期", prop: "draftTime" },
        { label: "签报字号", prop: "sendBasisName" },
        { label: "联系人", prop: "contactName" },
        { label: "拟稿部门", prop: "draftDepartmentName" },
        { label: "标题", prop: "title" },
        { label: "呈送", prop: "submittedName" },
        { label: "会签/协办部门", prop: "depName" },
        { label: "办公室审核时间", prop: "officeCheckTime" },
        { label: "发送秘书时间", prop: "sendSecretaryTime" },
        { label: "处理类型", prop: "handleType1" },
        { label: "签报种类", prop: "qianBaoTypeName" },
        { label: "签报类型", prop: "orderType" },
        { label: "紧急程度", prop: "emergencyLevelName" },
        { label: "联系电话", prop: "phone" },
        { label: "秘密类型", prop: "secretType" },
        { label: "秘密期限类型", prop: "secretLimitType" },
        { label: "秘密标志", prop: "workSecretFlag" },
        // {label:"密级标志", prop:"secretFlag"},
        { label: "密级和保密期限", prop: "secretFlag" },
        { label: "签报依据", prop: "qianbaoCode" },
        { label: "会签部门", prop: "signDepartmentName" },
        { label: "附件名称", prop: "attachment" },
        { label: "传阅人", prop: "chuanyueName" },
        { label: "传阅人员已阅", prop: "yiYue" },
        { label: "传阅人员未阅", prop: "weiYue" },
      ],
      exportNum: 1,//控制导出数据次数
    };
  },
  methods: {
    exportExc(name, val) {
      // exportTable.exportExcel("签报查询表",".el-table");
      exportTable.exportExcel(name, val == "2" ? "#custom" : "#nomal");
    },
    handleStateAll(val) {
      let that = this;
      that.stateList = [];
      if (val) {
        that.customData1.forEach((item => {
          that.stateList.push(item.label)
        }))
      } else {
        that.stateList = [];
      }
      that.isStateCheck = false;
    },
    stateChange(val) {
      let checkedCount = val.length
      this.isStateAll = checkedCount === this.customData1.length
      this.isStateCheck = checkedCount > 0 && checkedCount < this.customData1.length
    },
    handleElementAll(val) {
      let that = this;
      that.elementList = [];
      if (val) {
        that.customData2.forEach((item => {
          that.elementList.push(item.label)
        }))
      } else {
        that.elementList = [];
      }
      that.isElementCheck = false;
    },
    elementChange(val) {
      let checkedCount = val.length
      this.isElementAll = checkedCount === this.customData2.length
      this.isElementCheck = checkedCount > 0 && checkedCount < this.customData2.length
    },
    handleObjAll(val) {
      let that = this;
      that.objList = [];
      if (val) {
        that.customData3.forEach((item => {
          that.objList.push(item.label)
        }))
      } else {
        that.objList = [];
      }
      that.isObjCheck = false;
    },
    objChange(val) {
      let checkedCount = val.length
      this.isObjAll = checkedCount === this.customData3.length
      this.isObjCheck = checkedCount > 0 && checkedCount < this.customData3.length
    },
    handelShowCostCustom() {
      this.showustom = true;
    },
    handleSaveCustom() {
      if (this.stateList.length == 0 && this.elementList.length == 0 && this.objList.length == 0) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请勾选需要导出列!",
          duration: 2000
        });
        return;
      }
      this.checkList = [].concat(this.stateList, this.elementList, this.objList)
      this.tableColsCustom = this.customData.filter(item => this.checkList.some(e => e === item.label));
      //如果返回的总条数大于5000，5000调一次接口
      this.zdyExport();
      // this.handleReqAllData().then(status => {
      //   if (status) {
      //     this.showustom = false;
      //     setTimeout(() => {
      //          this.exportExc("签报查询表","2");
      //     },1000)
      //   }
      // })
    },
    zdyExport() {
      let tableName1;
      this.handleReqAllData().then(status => {
        if (status && this.bank_select1.total > 0) {
          this.showustom = false;
          setTimeout(() => {
            if (this.bank_select1.total > 5000) {
              if (this.bank_select1.total >= this.exportNum * 5000) {
                tableName1 = "签报查询表(" + (this.exportNum * 5000 - 4999) + "-" + this.exportNum * 5000 + ")";
                this.exportExc(tableName1, "2");
                if (this.bank_select1.total > this.exportNum * 5000) {
                  this.exportNum++;//1,2,3,4
                  this.zdyExport();
                } else {
                  this.exportNum = 1;
                  return;
                }
              } else {
                tableName1 = "签报查询表(" + (this.exportNum * 5000 - 4999) + "-" + this.bank_select1.total + ")";
                this.exportExc(tableName1, "2");
                this.exportNum = 1;
                return;
              }
            } else {
              tableName1 = "签报查询表(1" + "-" + this.bank_select1.total + ")";
              this.exportExc(tableName1, "2");
              this.exportNum = 1;
              return;
            }
          }, 1000);
        } else if (status && this.bank_select1.total == 0) {
          this.exportExc("签报查询表", "2");
        }
      })
    },
    async handleReqAllData() {
      this.tableData1 = [];
      var status = false;
      this.$router.push({
        query: {
          choseYear: this.bank_countersignature.choseYear
        }
      })
      sessionStorage.setItem('QBLIST', JSON.stringify(this.pagination));
      this.bank_countersignature.unitName = this.unitName
      this.bank_countersignature.unitId = this.unitId
      this.bank_select1 = Object.assign(this.bank_select1, this.bank_countersignature);
      this.bank_select1.function = "finaAllQueryDateList";
      this.bank_select1.page = this.exportNum;
      this.bank_select1.limit = 5000;
      this.bank_select1.total = 0;
      this.bank_select1.st = localStorage.getItem('st');
      await this.$post.postData("finaAllQueryDateList", JSON.stringify(Object.assign({}, this.bank_select1)), this.$businessCode.qbgl).then(res => {
        if (res.success) {
          this.tableData1 = res.data.rows && res.data.rows || [];
          this.bank_select1.total = res.data.total;
          status = true;
        } else {
          status = false;
        }
      }).catch(err => {
        console.log(err);
      });
      return status;
    },
    downLoad() {
      let that = this;
      if (that.selectionArr.length == 0) {
        that.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择要下载的数据！",
          duration: 2000
        });
      } else {
        //   this.selectionArr.forEach((item)=>{
        //     console.log(item)
        //   let flag;
        //   if(item.orderType == '非跨行'){
        //     flag = 'qianbao_dz'
        //   }else if (item.orderType == "跨行请示") {
        //     flag = 'qianbao_qingshi'
        //   } else if (item.orderType == "跨行审批") {
        //     flag = 'qianbao_shenpi'
        //   } else if (item.orderType == "实物") {
        //     flag = 'qianbao_sw'
        //   }else if(item.orderType == "跨行单会签" || item.orderType == "本行单会签"){
        //     flag = 'qianbao_huiqian'
        //   }else if(item.orderType == "协办"){
        //     flag = 'qianbao_xieban'
        //   }
        //   that.collectDown(flag,item.id,item.multiTenancyId,);
        // }); 

        //按钮置灰
        this.plxzButton = true;
        this.$post
          .postData(
            "qianDolwFile",
            JSON.stringify(Object.assign({}, { "function": "qianDolwFile", "choseYear": this.choseYear }, { "dataList": this.selectionArr })),
            this.$businessCode.qbgl
          )
          .then(res => {
            this.handleDownLoadState(res.downloadUrl, res.fileName);
          })
      }
    },
    handleDownLoadState(downloadUrl, fileName) {
      this.isLoading = true;
      this.interval = setInterval(() => {
        this.$post
          .postData(
            "selectByFilePath",
            JSON.stringify(Object.assign({}, { "function": "selectByFilePath", "filePath": downloadUrl })),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res.success && res.data) {
              let file = {
                "downloadUrl": res.data,
                "fileName": fileName
              }
              this.downFile(file);
              this.plxzButton = false;
              this.isLoading = false;
              clearInterval(this.interval);//5分钟提示下载失败，清除定时器，批量下载按钮恢复正常
              this.msgState = true;
            } else if (res.success && !res.data) {
              if (this.msgState) {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: res.message,
                  duration: 2000
                });
                this.isLoading = true;
                this.msgState = false;
              }
              if (this.downLoadTime < 75) {
                this.downLoadTime++;
                this.msgState = false;
              } else {
                clearInterval(this.interval);
                this.msgState = true;
                this.plxzButton = false;
                this.isLoading = false;
                this.downLoadTime = 1;
                this.$alert(
                  '文件下载失败，请联系管理员',
                  {
                    confirmButtonText: "确定",
                    dangerouslyUseHTMLString: true,
                    type: "error"
                  }
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 2000
              });
              clearInterval(this.interval);
              this.msgState = true;
              this.plxzButton = false;
              this.isLoading = false;
            }
          })
      }, 4000)
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.downloadUrl;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
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
                duration: 2000
              });
            }
          }
        });
    },
    initData() {
      this.$router.push({
        query: {
          choseYear: this.bank_countersignature.choseYear
        }
      })
      this.bank_countersignature.function = "finaAdllQuerList"
      sessionStorage.setItem('QBLIST', JSON.stringify(this.bank_countersignature));
      this.$post
        .postData(
          "finaAdllQuerList",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.qbgl
          // "A08461302"
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = this.bank_countersignature.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleTabsClick(tab, event) {
      this.tableLoading = true;
      if (tab.index == "3") {
        this.tableCols = finshData;
        this.isEnd = true;
      } else {
        this.tableCols = otherData;
        this.isEnd = false;
      }
      this.tableLoading = false;
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (this.draftTime && this.draftTime[0]) {
        this.bank_countersignature.draftTimeStart = dateFormate.date(
          Date.parse(this.draftTime[0])
        );
        this.bank_countersignature.draftTimeEnd = dateFormate.date(
          Date.parse(this.draftTime[1])
        );
      }
    },
    sendSecretaryTimeChange() {
      if (this.sendSecretaryTime && this.sendSecretaryTime[0]) {
        this.bank_countersignature.sendSecretaryTimeStart = dateFormate.date(
          Date.parse(this.sendSecretaryTime[0])
        );
        this.bank_countersignature.sendSecretaryTimeEnd = dateFormate.date(
          Date.parse(this.sendSecretaryTime[1])
        );
      } else {
        this.bank_countersignature.sendSecretaryTimeStart = ""
        this.bank_countersignature.sendSecretaryTimeEnd = ""
      }
    },
    officeCheckTimeChange() {
      if (this.officeCheckTime && this.officeCheckTime[0]) {
        this.bank_countersignature.officeCheckTimeStart = dateFormate.date(
          Date.parse(this.officeCheckTime[0])
        );
        this.bank_countersignature.officeCheckTimeTimeEnd = dateFormate.date(
          Date.parse(this.officeCheckTime[1])
        );
      } else {
        this.bank_countersignature.officeCheckTimeStart = ""
        this.bank_countersignature.officeCheckTimeTimeEnd = ""
      }
    },
    handleOpenPage(path, id, status) {
      if (status == 'daiban') {
        let routeId = (localStorage.getItem('routeIdList') && JSON.parse(localStorage.getItem('routeIdList'))) || [];
        if (routeId.includes(id)) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "已经打开了该页面!",
            duration: 2000,
          })
          return;
        }
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          load: false,
          moduleType: 'chaxun',
          choseYear: this.$route.query.choseYear,
          readonlyQbcy: 'qbcy',
          tiaoguo: "1"
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData()
    },
    //切换每页条数
    handleSizeChange(val) {
      this.pagination.page = this.bank_countersignature.page = 1
      this.bank_countersignature.limit = val
      this.pagination.limit = val
      this.tableData = []
      this.initData()
    },
    //选中条数
    handleSelectionChange(valArr) {
      this.selectionArr = valArr;
    },
    cellClick(row, column, cell, event) {
      this.idType = row.id ? row.id : "";
      // status    daiban    yiban   banjie    待办已办办结状态
      if (this.bank_countersignature.bdlx == '3') {
        if (row.orderType == "非跨行") {
          this.handleOpenPage("/signquoteOverFkhDispatch", this.idType);
        } else if (row.orderType == "跨行请示") {
          this.handleOpenPage("/signquoteOverKhQshDispatch", this.idType);
        } else if (row.orderType == "跨行审批") {
          this.handleOpenPage("/signquoteOverKhSphDispatch", this.idType);
        } else if (row.orderType == "实物") {
          this.handleOpenPage("/signquoteOverEntityDispatch", this.idType);
        }
      } else if (this.bank_countersignature.bdlx == '1') {
        if (row.orderType == "跨行单会签") {
          this.handleOpenPage("/huiqianKhOverDispatch", this.idType);
        } else if (row.orderType == "本行单会签") {
          this.handleOpenPage("/huiqianFkhOverDispatch", this.idType);
        }
      } else if (this.bank_countersignature.bdlx == '2') {
        this.handleOpenPage("/xiebanOverQbDispatch", this.idType);
      }

      // if (!row.orderType || !row.orderStatus) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "跳转页面失败",
      //     duration: 1000
      //   });
      //   return;
      // }
    },
    submitForm(formName) {
      this.bank_countersignature.qianBaoTypeName != '跨行签报' ? this.bank_countersignature.khlx = '' : '';
      this.bank_countersignature.page = this.pagination.page = 1;
      if (!this.draftTime) {
        this.bank_countersignature.draftTimeStart = "";
        this.bank_countersignature.draftTimeEnd = "";
      }
      this.tableData = [];
      this.initData();
    },
    resetForm() {
      this.draftTime = "";
      this.bank_countersignature.function = "finaAdllQuerList";
      this.bank_countersignature.draftTimeStart = "";
      this.bank_countersignature.draftTimeEnd = "";

      this.bank_countersignature.sendSecretaryTimeStart = "";
      this.bank_countersignature.sendSecretaryTimeEnd = "";
      this.bank_countersignature.officeCheckTimeStart = "";
      this.bank_countersignature.officeCheckTimeTimeEnd = "";

      this.bank_countersignature.documentNo = "〔" + year + "〕";
      this.bank_countersignature.title = "";
      this.bank_countersignature.submittedName = "";
      this.bank_countersignature.bdlx = "3";
      this.bank_countersignature.orgId = "";
      this.bank_countersignature.draftDepartmentId = "";
      this.bank_countersignature.draftUserId = "";

      this.bank_countersignature.orgName = "";
      this.bank_countersignature.draftDepartmentName = "";
      this.bank_countersignature.draftUserName = "";
      this.bank_countersignature.qianBaoTypeName = "";
      this.bank_countersignature.handleType = "";
      this.bank_countersignature.qbzt = "";
      this.bank_countersignature.khlx = "";
      this.bank_countersignature.qblb = "";
      this.bank_countersignature.ywwh = "";
      this.bank_countersignature.attachTitle = "";
      this.bank_countersignature.sizeFactStart = "";
      this.bank_countersignature.sizeFactEnd = "";
      this.bank_countersignature.handleType = "";
      this.bank_countersignature.hqbmCount = "";
      this.bank_countersignature.choseYear = "";

      this.bank_countersignature.page = this.pagination.page = 1;
      this.bank_countersignature.limit = this.pagination.limit = 20;
      this.bank_countersignature.total = this.pagination.total = 0
      this.bank_countersignature.unitName = "",
        this.bank_countersignature.unitId = "",

        this.tableData = [];
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.tableData = [];
      this.tableData1 = [];
      // this.initData();
    },
    // 单位选择
    getTreeData(n) {
      let obj = {};
      let name = "";
      this.offenUse = false;
      this.dialogTypeNow = this.dialogType = n;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.treeData = [];
      //手动清空时处理
      switch (n) {
        case "nigao":
          //this.bank_main
          name = "拟稿单位";
          obj = Object.assign(obj, this.undertakeDeptIdData);
          clearName = "orgName";
          this.titleWords = "选择单位";
          this.searchByContact = true;
          break;
        case "nigaobm":
          let userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || ''
          this.receiveOrgIdData.wfeUnitId = userInfo.unitId
          obj = Object.assign(obj, this.receiveOrgIdData);
          name = "拟稿部门";
          this.titleWords = "选择部门";
          clearName = "draftDepartmentName";
          this.searchByContact = true;
          break;
        case "draftUser":
          obj = Object.assign(obj, this.sendOrgIdData);
          name = "联系人";
          this.titleWords = "选择联系人";
          this.searchByContact = false;
          clearName = "draftUserName";
          break;
      }

      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(obj),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          let treeList = [];
          if (res.message == "Loading") {
            this.loadingTree = true;
          } else {
            this.loadingTree = false;
          }

          // if(res && res.data){
          //   treeList = [{
          //     id: res.data[0].id, 
          //     name: res.data[0].name,
          //     TYPE: 'user',
          //     short: res.data[0].name,
          //     children: []
          //   }]
          //   that.treeData = treeList.concat(res.data[0].children);
          //   // if( n == "draftUser" ){
          //     // that.treeData[0].disabled = true;
          //   // }
          // }
          that.treeData = (res && res.data) || [];
        });
    },

    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.bank_countersignature[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "orgName") {
          this.bank_countersignature.orgId = "";
          this.chenCheckData = [];
        }
        if (name === "draftDepartmentName") {
          this.bank_countersignature.draftDepartmentId = "";
          this.shouCheckData = [];
        }
        if (name === "draftUserName") {
          this.bank_countersignature.draftUserId = "";
          this.laiCheckData = [];
        }
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = data;
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
        }

        switch (dtype) {
          case "nigao":
            this.bank_countersignature.orgName = names.join("");
            this.bank_countersignature.orgId = ids.join("");
            this.undertakeCheckData = this.checkData;
            break;
          case "nigaobm":
            this.bank_countersignature.draftDepartmentName = names.join("");
            this.bank_countersignature.draftDepartmentId = ids.join("");
            this.shouCheckData = this.checkData;
            break;
          case "draftUser":
            this.bank_countersignature.draftUserName = names.join("");
            this.bank_countersignature.draftUserId = ids.join("");
            this.draftUserCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    selectYear(val) {
      this.bank_countersignature.choseYear = val;
      if (val == "") {
        this.defaultYear();
      } else {
        this.bank_countersignature.documentNo = '〔' + val + '〕'
      }
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.bank_countersignature.documentNo = '〔' + openTimeYear + '〕'
    },
    //弹窗回显数据
    backDialogData(type) {
      this.dialogType = "hui";
      switch (type) {
        case "nigao":
          // this.checkIds = [].concat(this.bank_countersignature.orgId) ||[];
          // this.checkData = this.undertakeCheckData;
          this.checkIds = this.bank_countersignature.orgId
            ? this.bank_countersignature.orgId.split(";")
            : [];
          this.checkData = this.undertakeCheckData;
          break;
        case "nigaobm":
          // this.checkIds =  [].concat(this.bank_countersignature.draftDepartmentId)||[];
          // this.checkData = this.receiveOrgCheckData;
          this.checkIds = this.bank_countersignature.draftDepartmentId
            ? this.bank_countersignature.draftDepartmentId.split(";")
            : [];
          this.checkData = this.shouCheckData;
          break;
        case "draftUser":
          // this.checkIds = [].concat(this.bank_countersignature.draftUserId)||[];
          // this.checkData = this.draftUserCheckData;
          this.checkIds = this.bank_countersignature.draftUserId
            ? this.bank_countersignature.draftUserId.split(";")
            : [];
          this.checkData = this.draftUserCheckData;
          break;
      }
    }
  },
  created() {
    this.$router.push({
      query: {
        choseYear: ''
      }
    })
    if (sessionStorage.getItem('QBLIST')) {
      this.bank_countersignature = Object.assign(this.bank_countersignature, JSON.parse(sessionStorage.getItem('QBLIST')))
      if (this.bank_countersignature.draftTimeStart && this.bank_countersignature.draftTimeEnd) {
        this.draftTime = [this.bank_countersignature.draftTimeStart, this.bank_countersignature.draftTimeEnd]
      }
    }
    this.pagination = {
      page: this.bank_countersignature.page, //第几页
      total: this.bank_countersignature.totalCount, //共有条数
      limit: this.bank_countersignature.limit, //每页条数
    }
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.qbgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }      })
    this.initData();
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header {
  margin: 0 0 7px;
}
.is10 {
  margin: 20px 0 !important;
}
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 10px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}

.arrowup {
  text-align: center;
}

/deep/ .el-radio {
  width: 70px;
}
.mt20 {
  margin-top: 10px;
}
/deep/ .bank_dispach_content > .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
.custom_title {
  color: #fff;
  font-weight: 700;
  line-height: 24px;
  font-size: 18px;
  span {
    font-size: 14px;
    margin-left: 10px;
  }
}
/deep/ .check_area {
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;
  .check_area_title {
    font-weight: bold;
    margin-right: 20px;
  }
}
</style>
