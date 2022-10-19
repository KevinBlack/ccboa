<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm transition_wrap" :class="{mtdown:down}">
          <el-row>
            <el-col :span="8">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select v-model="ruleForm.choseYear" @change="selectYear" placeholder="近两年" style="width: 100%;">
                  <el-option value label="近两年"></el-option>
                  <el-option v-for="yearItem in yearList" :key="yearItem" :label="yearItem" :value="yearItem"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拟稿日期" prop="draftRangeTime">
                <el-date-picker @change="draftRangeTimeChange()" v-model="draftRangeTime" style="width:100%" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="机构名称" prop="">
                <div class="dispatchcswhlshwh">
                  <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="unitName"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </select-org-or-dept>
                </div>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文日期" prop="sendRangeTime">
                <el-date-picker @change="sendRangeTimeChange()" style="width:100%" v-model="sendRangeTime" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="21">
                  <el-form-item label="主办部门" prop="draftDepartmentId">
                    <el-input v-model="ruleForm.mainOrganNames" readonly="readonly"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-button type="primary" @click="selectDepartment">选择</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主送" prop="main">
                <el-input v-model="ruleForm.main"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="制发行" prop="draftOrganId">
                <el-select v-model="ruleForm.draftOrganId" style="width:100%" clearable>
                  <el-option v-for="item in bankOptions" :key="item.unitId" :value="item.unitId" :label="item.unitName"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="24" style="text-align: center;margin-bottom: 10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="getTableList('1')" style="margin:0 10px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="arrow()"> <i class="el-icon-arrow-down el-icon--left"></i> 展开</el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down" class="clearfix">
            <el-row>
              <el-col :span="8">
                <el-form-item label="业务分类" :span="8" prop="businessType" ref="businessType">
                  <el-select v-model="ruleForm.businessType" placeholder="请选择" style="width:100%">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="businessType in SbusinessType" :key="businessType.label" :label="businessType.label" :value="businessType.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文种" :span="8" prop="textType" ref="textType">
                  <el-select v-model="ruleForm.textType" placeholder="请选择" style="width:100%">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="textTypeitem in StextType" :key="textTypeitem.label" :label="textTypeitem.label" :value="textTypeitem.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保管期限" prop="keepLimit" ref="keepLimit">
                  <el-select v-model="ruleForm.keepLimit" placeholder="请选择" style="width:100%">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="keepLimititem in SkeepLimit" :key="keepLimititem.label" :label="keepLimititem.label" :value="keepLimititem.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 秘密类型 -->
              <el-col :span="8">
                <el-form-item label="秘密类型" :span="8">
                  <el-select v-model="ruleForm.secretType" style="width:100%">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="secretTypeitem in SsecretType" :key="secretTypeitem.label" :label="secretTypeitem.label" :value="secretTypeitem.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <el-select v-model="ruleForm.emergencyLevel" style="width:100%">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="emergencyLevelitem in SemergencyLevel" :key="emergencyLevelitem.label" :label="emergencyLevelitem.label" :value="emergencyLevelitem.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发文类型">
                  <el-select v-model="ruleForm.orderType" style="width:100%">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="sendTypeitem in SsendType" :key="sendTypeitem.label" :label="sendTypeitem.label" :value="sendTypeitem.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否直发">
                  <el-radio v-model="ruleForm.isDirect" label="" class="radio_fst">全部</el-radio>
                  <el-radio v-model="ruleForm.isDirect" label="是" class="radio_scd">是</el-radio>
                  <el-radio v-model="ruleForm.isDirect" label="否">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="规章/规范性文件" prop="isStandardFile" ref="isStandardFile">
                  <el-radio v-model="ruleForm.isStandardFile" label="" class="radio_fst">全部</el-radio>
                  <el-radio v-model="ruleForm.isStandardFile" label="是" class="radio_scd">是</el-radio>
                  <el-radio v-model="ruleForm.isStandardFile" label="否">否</el-radio>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="表单类型" prop="formType">
                  <el-radio-group v-model="ruleForm.formType">
                    <el-radio label="1" class="radio_fst">非会签</el-radio>
                    <el-radio label="2" class="radio_scd" :disabled="ruleForm.sendType=='2'">会签单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="公文状态" prop="orderState">
                  <el-radio-group v-model="ruleForm.orderState">
                    <el-radio label="0" class="radio_fst">全部</el-radio>
                    <el-radio label="1" class="radio_scd">流转</el-radio>
                    <el-radio label="2">办结</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发文形式" prop="sendType">
                  <el-radio-group v-model="ruleForm.sendType">
                    <el-radio label="0" class="radio_fst">全部</el-radio>
                    <el-radio label="1" class="radio_scd">电子</el-radio>
                    <el-radio label="2" :disabled="ruleForm.formType=='2'">实物</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="getTableList('1')">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="down">
                <el-button type="info" size="small" @click="arrow()"> <i class="el-icon-arrow-up el-icon--left"></i> 收起</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </el-col>
      <el-col style="text-align:right;margin-top:10px;">
        <el-button size="small" @click="downLoad" :disabled="plxzButton">批量下载</el-button>
        <el-button style="margin-left: 10px;" size="small" @click="handelShowCostCustom">自定义导出</el-button>
      </el-col>
      <el-col style="margin: 10px 0;">
        <m-table id="nomal" class="nomal" size="medium" :isSelection="true" :isIndex="true" :isPagination="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :state="bank_select.state" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @handleSelectionChange="handleSelectionChange" @cellClick="cellClick" v-loading="tableLoading" :default-sort="sortDate">
        </m-table>
        <m-table v-show="false" id="custom" class="custom" size="medium" :isSelection="false" :isIndex="true" :isPagination="true" :isHandle="false" :tableData="tableData1" :tableCols="tableColsCustom" :pagination="pagination" :state="bank_select.state" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @cellClick="cellClick" v-loading="tableLoading" :default-sort="sortDate">
        </m-table>
      </el-col>
    </el-row>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
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
              <!-- <el-col :span="8" :offset="1"><el-checkbox label="当前状态" value="isFlowEnd"></el-checkbox></el-col> -->
              <el-col :span="8" :offset="1">
                <el-checkbox label="当前环节" value="currentNode"></el-checkbox>
              </el-col>
              <el-col :span="8">
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
                <el-checkbox label="秘密类型" value="secretType"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="是否直发" value="isDirect"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="发文日期" value="sendTime"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="秘密期限类型" value="secretLimitType"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="直发范围" value="directRange"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="发文字号" value="documentNo"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="秘密标志" value="secretFlagType"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="直发文种类" value="directType"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="标题" value="title"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="密级和保密期限" value="secretFlagContent"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="发文依据" value="sendBasis"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="发文种类" value="sendType"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="知悉范围" value="knowScore"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="规章/规范性文件" value="isStandardFile"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="主办部门" value="draftDepartment"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="定密依据" value="secretGists"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="是否经过消保审查" value="isNeedCheckcp"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="紧急程度" value="emergencyLevel"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="保管期限" value="keepLimit"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="档案利用范围" value="userRange"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="业务分类" value="businessType"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="附件标题" value="attachTitle"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="联合发文单位" value="unionDepartment"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="文种" value="textType"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="半电子" value="isArtificial"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="分别发送" value="isSeparate"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="成文日期" value="completeTime"></el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </el-col>
        <el-col class="check_area">
          <el-row>
            <el-col :span="24" style="margin-bottom:10px;">
              <span class="check_area_title">发送对象</span>
              <el-checkbox :indeterminate="isObjCheck" v-model="isObjAll" @change="handleObjAll">全选</el-checkbox>
            </el-col>
            <el-checkbox-group v-model="objList" @change="objChange">
              <el-col :span="8" :offset="1">
                <el-checkbox label="会签部门" value="signDepartmentName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="行外会签" value="outsideSign"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="抄送" value="copy"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="行外发送" value="inline"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="主送" value="main"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="已完成会签部门" value="finishSignDepartmentName"></el-checkbox>
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
import optionalfield from "components/optionalfield/optionalfield.vue";
import Dialog from "@/views/dispatch/departDialog.vue";
// import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";

export default {
  name: "Fwcy",
  mixins: [dispatchFileQuery, exportTable],
  components: {
    mTable,
    // optionalfield,
    Dialog,
    // selectOrgOrDept
  },
  data() {
    return {
      isLoading: false,
      downLoadTime: 1,
      plxzButton: false,
      bank_doDownloadFileFw: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      exportNum: 1,//控制导出数据次数
      interval: null,
      msgState: true,
      selectionArr: [],
      showustom: false,
      isStateAll: true,
      isStateCheck: false,
      isElementAll: false,
      isElementCheck: true,
      isObjAll: false,
      isObjCheck: false,
      checkList: [],
      stateList: ["当前环节", "当前处理人"],
      elementList: ["拟稿日期", "发文日期", "发文字号", "标题", "发文种类", "主办部门"],
      objList: [],
      tableData1: [],
      SemergencyLevel: [],
      SsendType: [],
      SbusinessType: [],
      StextType: [],
      SkeepLimit: [],
      SsecretType: [],
      SworkSecretFlag: [],
      SsecretFlag: [],
      SSsecretLimitType: [],
      SbusinessSecret: [],
      SsecretTimeType: [
        {
          label: "年"
        },
        {
          label: "月"
        },
        {
          label: "日"
        }
      ],
      SsecretLimit: [],
      // 下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam",
        organizationId: ""
        // organizationId: "2ec81dcb-9ed5-443a-a7e7-314ae0537478"
      },
      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      securityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      secretFlagTypeFlag: false,
      // 密级和保密期限  解密时间  显示隐藏
      businessSecretFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      securitytiaojFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      secretFlagTypetiaojFlag: false,
      isGly: false,
      bank_select: {
        function: "searchSendOrder",
        state: 1
      },
      bank_select1: {
        function: "searchSendOrderExt",
        state: 1,
        isCY: "1"
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit: 20
      },
      ruleForm: {
        businessType: '',
        choseYear: "",
        draftTimeStart: '',
        draftTimeEnd: '',
        deptIds: "",
        documentNo: '',
        draftDepartmentId: "",
        draftOrganId: "",
        emergencyLevel: '',
        keepLimit: '',
        formType: "1",
        isDirect: '',
        isStandardFile: '',
        main: "",
        mainOrganNames: "",
        orderState: "0",
        orderType: "",
        secretType: '',
        secretFlagType: '',
        secretLimitType: '',
        secretFlagContent: '',
        secretTimeType: '',
        sendTimeStart: '',
        sendTimeEnd: '',
        sendType: "0",
        textType: '',
        title: '',
        unitName: "",
        unitId: "",
      },
      tableCols: [
        {          label: "拟稿日期", prop: "draftTime", align: "center", width: "110px",
          formatter(row) {
            return (row.draftTime = dateFormate.date(Date.parse(new Date(row.draftTime))));
          }
        },
        {          label: "发文日期", prop: "sendTime", align: "center", width: "110px",
          formatter(row) {
            return (row.sendTime = row.sendTime != "" ? dateFormate.date(Date.parse(new Date(row.sendTime))) : "");
          }
        },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left", minwidth: "40%" },
        { label: "主办部门", prop: "draftDepartment", align: "center", width: "200px" },
        { label: "发文种类", prop: "sendType", align: "center", width: "80px" },
        // { label: "当前状态", prop: "isFlowEnd", align: "center", width: "80px" },
        { label: "当前环节", prop: "currentNode", align: "center", width: "120px" },
        { label: "当前处理人 ", prop: "currentUser", align: "center", width: "100px" }
      ],
      tableColsCustom: [],
      customData1: [
        // {label:"当前状态", prop:"isFlowEnd"},
        { label: "当前环节", prop: "currentNode" },
        { label: "当前处理人", prop: "currentUser" }
      ],
      customData2: [
        {          label: "拟稿日期", prop: "draftTime",
          formatter(row) {
            return (row.draftTime = dateFormate.date(Date.parse(new Date(row.draftTime))));
          }
        },
        { label: "主办部门", prop: "draftDepartment" },
        {          label: "发文日期", prop: "sendTime",
          formatter(row) {
            return (row.sendTime = row.sendTime != "" ? dateFormate.date(Date.parse(new Date(row.sendTime))) : "");
          }
        },
        { label: "是否直发", prop: "isDirect" },
        { label: "直发范围", prop: "directRange" },
        { label: "直发文种类", prop: "directType" },
        { label: "秘密类型", prop: "secretType" },
        { label: "秘密期限类型", prop: "secretLimitType" },
        { label: "密级和保密期限", prop: "secretFlagContent" },
        { label: "发文字号", prop: "documentNo" },
        { label: "秘密标志", prop: "secretFlagType" },
        { label: "发文种类", prop: "sendType" },
        { label: "标题", prop: "title" },
        { label: "文种", prop: "textType" },
        { label: "规章/规范性文件", prop: "isStandardFile" },
        { label: "业务分类", prop: "businessType" },
        { label: "成文日期", prop: "completeTime" },
        { label: "是否经过消保审查", prop: "isNeedCheckcp" },
        { label: "定密依据", prop: "secretGists" },
        { label: "紧急程度", prop: "emergencyLevel" },
        { label: "档案利用范围", prop: "userRange" },
        { label: "知悉范围", prop: "knowScore" },
        { label: "保管期限", prop: "keepLimit" },
        { label: "联合发文单位", prop: "unionDepartment" },
        { label: "附件标题", prop: "attachTitle" },
        { label: "发文依据", prop: "sendBasis" },
        { label: "分别发送", prop: "isSeparate" },
        { label: "半电子", prop: "isArtificial" }
      ],
      customData3: [
        { label: "会签部门", prop: "signDepartmentName" },
        { label: "行外会签", prop: "outsideSign" },
        { label: "已完成会签部门", prop: "finishSignDepartmentName" },
        { label: "主送", prop: "main" },
        { label: "抄送", prop: "copy" },
        { label: "行外发送", prop: "inline" }
      ],
      customData: [
        // {label:"当前状态", prop:"isFlowEnd"},
        { label: "当前环节", prop: "currentNode" },
        { label: "当前处理人", prop: "currentUser" },
        { label: "拟稿日期", prop: "draftTime" },
        { label: "发文日期", prop: "sendTime" },
        { label: "发文字号", prop: "documentNo" },
        { label: "标题", prop: "title" },
        { label: "发文种类", prop: "sendType" },
        { label: "主办部门", prop: "draftDepartment" },
        { label: "紧急程度", prop: "emergencyLevel" },
        { label: "业务分类", prop: "businessType" },
        { label: "文种", prop: "textType" },
        { label: "成文日期", prop: "completeTime" },
        { label: "秘密类型", prop: "secretType" },
        { label: "秘密期限类型", prop: "secretLimitType" },
        { label: "秘密标志", prop: "secretFlagType" },
        { label: "密级和保密期限", prop: "secretFlagContent" },
        { label: "知悉范围", prop: "knowScore" },
        { label: "定密依据", prop: "secretGists" },
        { label: "保管期限", prop: "keepLimit" },
        { label: "附件标题", prop: "attachTitle" },
        { label: "直发文件", prop: "isDirect" },
        { label: "直发范围", prop: "directRange" },
        { label: "直发文种类", prop: "directType" },
        { label: "发文依据", prop: "sendBasis" },
        { label: "规章/规范性文件", prop: "isStandardFile" },
        { label: "是否经过消保审查", prop: "isNeedCheckcp" },
        { label: "档案利用范围", prop: "userRange" },
        { label: "联合发文单位", prop: "unionDepartment" },
        { label: "分别发送", prop: "isSeparate" },
        { label: "半电子", prop: "isArtificial" },
        { label: "会签部门", prop: "signDepartmentName" },
        { label: "行外会签", prop: "outsideSign" },
        { label: "已完成会签部门", prop: "finishSignDepartmentName" },
        { label: "抄送", prop: "copy" },
        { label: "行外发送", prop: "inline" },
        { label: "主送", prop: "main" }
      ]
    };
  },
  methods: {
    //选中条数
    handleSelectionChange(valArr) {
      this.selectionArr = valArr;
    },
    downLoad() {
      if (this.selectionArr.length == 0) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择要下载的数据!",
          duration: 1500,
        })
        return;
      }
      // let that = this;
      // this.selectionArr.forEach((item)=>{
      //   let flag;
      //   if (that.ruleForm.formType=="2") {
      //     flag = 'sign'
      //   } else if(that.ruleForm.formType=="1") {
      //     item.sendType == '电子'?flag = 'send':flag = 'sendSw'
      //   }
      //   that.collectDown(flag,item.id,this.ruleForm.unitId);
      // }); 
      this.plxzButton = true;
      this.$post
        .postData(
          "batchDownload",
          JSON.stringify(Object.assign({}, { "function": "batchDownload", "choseYear": this.choseYear }, { "dataList": this.selectionArr })),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.handleDownLoadState(res.downloadUrl, res.fileName);
        })
    },
    handleDownLoadState(downloadUrl, fileName) {
      this.isLoading = true;
      this.interval = setInterval(() => {
        this.$post
          .postData(
            "selectByFilePath",
            JSON.stringify(Object.assign({}, { "function": "selectByFilePath", "filePath": downloadUrl })),
            this.$businessCode.fawgl
          )
          .then(res => {
            if (res.success && res.data) {
              let file = {
                "filePath": res.data,
                "fileName": fileName
              }
              this.downFileFw(file);
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
    downFileFw(file) {
      this.bank_doDownloadFileFw.fileName = file.fileName;
      this.bank_doDownloadFileFw.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFileFw),
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
                duration: 1500
              });
            }
          }
        });
    },
    handleStateAll(val) {
      let that = this;
      that.stateList = [];
      if (val) {
        that.customData1.forEach((item => {
          that.stateList.push(item.label)
        }));
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
        }));
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
        }));
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
      this.checkList = [].concat(this.stateList, this.elementList, this.objList)
      this.tableColsCustom = this.customData.filter(item => this.checkList.some(e => e === item.label));
      if (this.tableColsCustom.length < 1) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择导出字段!",
          duration: 1500,
        })
        return;
      }
      this.zdyExport();
    },
    zdyExport() {
      let tableName1;
      this.handleReqAllData().then(status => {
        if (status) {
          this.showustom = false;
          setTimeout(() => {
            if (this.bank_select1.total > 5000) {
              if (this.bank_select1.total >= this.exportNum * 5000) {
                tableName1 = "发文查阅表(" + (this.exportNum * 5000 - 4999) + "-" + this.exportNum * 5000 + ")";
                this.exportExc(tableName1, "2");
                if (this.bank_select1.total > this.exportNum * 5000) {
                  this.exportNum++;//1,2,3,4
                  this.zdyExport();
                } else {
                  this.exportNum = 1;
                  return;
                }
              } else {
                tableName1 = "发文查阅表(" + (this.exportNum * 5000 - 4999) + "-" + this.bank_select1.total + ")";
                this.exportExc(tableName1, "2");
                this.exportNum = 1;
                return;
              }
            } else if (this.bank_select1.total > 0) {
              tableName1 = "发文查阅表(1" + "-" + this.bank_select1.total + ")";
              this.exportExc(tableName1, "2");
              this.exportNum = 1;
              return;
            } else {
              tableName1 = "发文查阅表";
              this.exportExc(tableName1, "2");
              this.exportNum = 1;
              return;
            }
          }, 1000);
        }
      })
    },
    async handleReqAllData() {
      this.tableData1 = [];
      var status = false;
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      sessionStorage.setItem('FWLIST', JSON.stringify(this.pagination));
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      this.bank_select1 = Object.assign(this.bank_select1, this.ruleForm);
      this.bank_select1.st = localStorage.getItem('st');
      this.bank_select1.page = this.exportNum;
      this.bank_select1.limit = 5000;
      this.bank_select1.total = 0;
      await this.$post.postData("searchSendOrderExt", JSON.stringify(Object.assign({}, this.bank_select1)), this.$businessCode.fawgl).then(res => {
        if (res.success) {
          this.tableData1 = res.data.rows && res.data.rows || [];
          this.bank_select1.total = res.data.total;
          status = true;
        } else {
          status = false;
        }
      })
      return status;
    },
    exportExc(name, val) {
      exportTable.exportExcel(name, val == "2" ? "#custom" : "#nomal");
    },
    // 下拉列表
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.SbusinessType = res.data &&
            res.data.businessType && JSON.parse(res.data.businessType) || [];
          this.SemergencyLevel = res.data &&
            res.data.emergencyLevel && JSON.parse(res.data.emergencyLevel) || [];
          this.SsendType = res.data &&
            res.data.sendType && JSON.parse(res.data.sendType) || [];
          this.StextType = res.data &&
            res.data.textType && JSON.parse(res.data.textType) || [];
          this.SsecretType = res.data &&
            res.data.allSendSecretType && JSON.parse(res.data.allSendSecretType) || [];
          this.SsecretFlag = this.secretOptionsFlag =
            res.data && res.data.secretFlag && JSON.parse(res.data.secretFlag) || [];
          this.SdirectRange = res.data &&
            res.data.directSendRange && JSON.parse(res.data.directSendRange) || [];
          this.archivesUserRange = res.data &&
            res.data.archivesUserRange && JSON.parse(res.data.archivesUserRange) || [];
          this.SdirectType = res.data &&
            res.data.directSendType && JSON.parse(res.data.directSendType) || [];
          this.SkeepLimit = res.data &&
            res.data.eleSendSecretLimit && JSON.parse(res.data.eleSendSecretLimit) || [];
          this.SworkSecretFlag = res.data &&
            res.data.workSecretFlag && JSON.parse(res.data.workSecretFlag) || [];
          this.SbusinessSecret =
            res.data &&
            res.data.tradeSecret &&
            JSON.parse(res.data.tradeSecret);
          this.SsecretLimit =
            res.data &&
            res.data.secretFlagContent &&
            JSON.parse(res.data.secretFlagContent);
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          });
        });
    },
    // 发文列表查询
    getTableList(val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      sessionStorage.setItem('FWLIST', JSON.stringify(this.pagination));
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      if (val == "1") {
        this.pagination.page = 1;
      }
      this.bank_select = Object.assign(this.bank_select, this.ruleForm);
      this.bank_select.st = localStorage.getItem('st');
      this.bank_select.function = "searchSendOrder";
      this.bank_select.isCY = "1";
      this.$post.postData("searchSendOrder", JSON.stringify(Object.assign({}, this.bank_select, this.pagination)), this.$businessCode.fawgl).then(res => {
        this.tableData = res.data && res.data.rows || [];
        this.pagination.total = res.data.total;
        this.bank_select.totalCount = res.data && res.data.total || 0;
      })
    },
    cellClick(row, column, cell, event) {
      if (row.sendType === '实物') {
        // if (row.isFlowEnd == '已办') {
        this.handleOpenPage('/bankEntityDispatchDone', row.id)
        // } else if (row.isFlowEnd == '待办') {
        //   this.handleOpenPage('/bankEntityDispatch', row.id, "bd")
        // } else if (row.isFlowEnd == '办结') {
        //   this.handleOpenPage('/bankEntityDispatchFinishRed', row.id)
        // }
      } else if (row.sendType === '电子') {
        // if (row.isFlowEnd == '已办') {
        this.handleOpenPage('/bankDispachDone', row.id)
        // } else if (row.isFlowEnd == '待办') {
        //   this.handleOpenPage('/bankDispach', row.id, "bd")
        // } else if (row.isFlowEnd == '办结') {
        //   this.handleOpenPage('/bankDispachFinishRed', row.id)
        // }
      }
    },
    handleOpenPage(path, id, flag) {
      if (flag == "bd") {
        let routeId = (localStorage.getItem('routeIdList') && JSON.parse(localStorage.getItem('routeIdList'))) || [];
        if (routeId.includes(id)) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "已经打开了该页面!",
            duration: 1500,
          })
          return;
        }
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          choseYear: this.$route.query.choseYear,
          readonlyFwcy: "fwcy"
        }
      });
      window.open(routeData.href, "_blank");
    },
    resetForm() {
      // this.handleScaleMaintain();
      this.draftRangeTime = [];
      this.sendRangeTime = [];
      this.ruleForm = {
        businessType: '',
        choseYear: "",
        draftTimeStart: '',
        draftTimeEnd: '',
        deptIds: "",
        documentNo: '',
        draftDepartmentId: "",
        draftOrganId: "",
        emergencyLevel: '',
        keepLimit: '',
        formType: "1",
        isDirect: '',
        isStandardFile: '',
        main: "",
        mainOrganNames: "",
        orderState: "0",
        orderType: "",
        secretType: '',
        secretFlagType: '',
        secretLimitType: '',
        secretFlagContent: '',
        secretTimeType: '',
        sendTimeStart: '',
        sendTimeEnd: '',
        sendType: "0",
        textType: '',
        title: '',
        unitName: "",
        unitId: "",
      };
      this.draftTimeStart = "";
      this.draftTimeEnd = "";
      this.sendTimeStart = "";
      this.sendTimeEnd = "";
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
      this.tableData1 = [];
    },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = this.ruleForm.draftDepartmentId = result.id;
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = '〔' + openTimeYear + '〕'

    }
  },
  created() {
    if (sessionStorage.getItem('FWLIST')) {
      this.pagination = Object.assign(this.pagination, JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.getSendOrderDicByParam();
    this.defaultYear();
    this.bankOptions = JSON.parse(localStorage.getItem("unitInfo")) || [];
    this.getTableList("1");
  }
}
</script>

<style lang="less" scoped>
.radio_fst,
.radio_scd {
  width: 80px;
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
.mtdown {
  padding: 20px 20px 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: -76px;
  font-size: 12px;
  text-align: center;
}
/deep/ .dispatchcswhlshwh {
  .tree-div {
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
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
/deep/ .no-width-label .el-form-item__content {
  margin: 0 !important;
}
/deep/ .no-width-label::before {
  content: "";
  width: 0px !important;
  margin: 0;
}
</style>
