<template>
  <div>
    <el-row class="mtJ20">
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm mt20" :class="{mtdown:down}">
          <el-row>
            <el-col :span="6">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select v-model="choseYear" @change="selectYear" placeholder="近两年" style="width: 100%;">
                  <el-option value label="近两年"></el-option>
                  <el-option v-for="yearItem in yearList" :key="yearItem" :label="yearItem" :value="yearItem"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收文日期">
                <div class="block">
                  <el-date-picker @change="receiveTimeChange" v-model="receiveTime" type="daterange" align="right" unlink-panels range-separator="-" style="max-width:300px;" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="收文字号" prop="documentCode">
                <el-input v-model="ruleForm.documentCode" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="text-align: center;margin-bottom: 10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="down=!down">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
            <el-row>
              <el-col :span="8">
                <el-form-item label="督办日期">
                  <div class="block">
                    <el-date-picker @change="superviseSTimeChange" v-model="superviseSTime" type="daterange" align="right" unlink-panels range-separator="-" style="max-width:300px;" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="督办人" prop="superviserName">
                  <el-input v-model="ruleForm.superviserName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="来文单位" prop="sendOrgName">
                  <el-input v-model="ruleForm.sendOrgName" placeholder="请选择或输入">
                    <el-button slot="append" @click="getTreeData('lai')" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="承办部门" prop="undertakeDeptName">
                  <el-input v-model="ruleForm.undertakeDeptName" readonly="readonly" placeholder="请选择">
                    <el-button slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="公文状态">
                <el-radio-group v-model="ruleForm.curNodeCode">
                  <el-radio label>全部</el-radio>
                  <el-radio label="0">流转</el-radio>
                  <el-radio label="800">办结</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="收文形式">
                <el-radio-group v-model="ruleForm.receiveType">
                  <el-radio label>全部</el-radio>
                  <el-radio label="电子收文"></el-radio>
                  <el-radio label="实物收文"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <!--  查询结果只有主表单 -->
            <!-- <el-row>
              <el-form-item label="表单类型">
                <el-radio-group v-model="ruleForm.formType">
                  <el-radio label>全部</el-radio>
                  <el-radio label="0">协办单</el-radio>
                  <el-radio label="1">非协办单</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row> -->
            <!-- <el-row>
              <el-form-item label="督办事项">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="请示事项"></el-radio>
                  <el-radio label="其他事项"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>-->

            <el-row>
              <el-form-item label="文种类型">
                <el-radio-group v-model="ruleForm.documentClassName">
                  <el-radio label>全部</el-radio>
                  <el-radio label="请示"></el-radio>
                  <el-radio label="决定"></el-radio>
                  <el-radio label="公告"></el-radio>
                  <el-radio label="通知"></el-radio>
                  <el-radio label="批复"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="down=!down">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>
        </el-form>
      </el-col>
      <div style="text-align: right;">
        <el-button style="text-align:right;" size="small" @click="downLoad" :disabled="plxzButton">批量下载</el-button>
        <!-- <el-button style="text-align:right;" size="small" @click="exportExc" v-preventClick>导 出</el-button> -->
        <el-button style="margin-left: 10px;" size="small" @click="handelShowCostCustom">自定义导出</el-button>
      </div>
      <el-col style="margin: 30px 0;" :class="{'is3':!down}">
        <m-table id="nomal" class="nomal" size="medium" :isSelection="true" :isIndex="true" :isPagination="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" @cellClick="cellClick" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @handleSelectionChange="handleSelectionChange" v-loading="tableLoading" :default-sort="sortDate"></m-table>
        <m-table v-show="false" id="custom" class="custom" size="medium" :isSelection="false" :isIndex="true" :isPagination="true" :isHandle="false" :tableData="tableData1" :tableCols="tableColsCustom" :pagination="pagination" v-loading="tableLoading" :default-sort="sortDate"></m-table>
      </el-col>
    </el-row>
    <treeCofig :treeData="treeData" :canTab="canTab" :loadingTree="loadingTree" :hasRadio="hasRadio" :dialogType="dialogType" :dialogTypeNow="dialogTypeNow" :dialogTit="dialogTit" :checkIds="checkIds" :checkData="checkData" :singelCheckF="singelCheckF" :dialogState="dialogState" :offenUse="offenUse" :fromdata="ruleForm" :seletOptionsData="seletOptionsData" @showCompDialog="showCompDialog" :treeTradeCode="treeTradeCode"></treeCofig>
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
              <el-col :span="8">
                <el-checkbox label="当前环节" value="curNodeName"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="当前处理人" value="curUser"></el-checkbox>
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
                <el-checkbox label="收文日期" value="receiveTime"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="督办人" value="superviserName"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="文种" value="documentClassName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="是否督办" value="isSupervise"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="提前提醒天数" value="daysInAdvance"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="来文单位" value="sendOrgName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="收文字号" value="documentCode"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="办理期限" value="limitDate"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="登记人" value="userName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="标题" value="title"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="办理进度" value="progress"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="登记部门" value="draftDept"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="承办部门" value="undertakeDeptName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="已办结承办部门" value="undertakeDeptNameYbj"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="秘密类型" value="secretType"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="协办部门" value="assistDeptName"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="已办结协办部门" value="assistDeptNameYbj"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="是否阅件" value="isReadStr"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="秘密期限类型" value="secretLimitType"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="传阅人" value="circulatePersonNames"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="紧急程度" value="emergencyName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="秘密标志" value="secretFlagType"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="实物收文类型" value="receiveSwType"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="收文字数" value="receiveWords"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="密级和保密期限" value="secretMjAndQx"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="成文日期" value="completeTime"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="业务分类" value="bussinessTypeName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="知悉范围" value="knowScore"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="保管期限" value="keepingLimitName"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="督办日期" value="superviseDate"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="附件标题" value="attachmentTitle"></el-checkbox>
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
                <el-checkbox label="传阅人员已阅" value="circulateIsRead"></el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-checkbox label="传阅人员未阅" value="circulateIsNotRead"></el-checkbox>
              </el-col>
              <el-col :span="7">
                <el-checkbox label="发送对象" value="sendSubName"></el-checkbox>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-checkbox label="公告至" value="publishDept"></el-checkbox>
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
import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
const finshData = [
  {    label: "督办日期", prop: "superviseDate", align: "center", width: '90', formatter: (row) => {
      return row.superviseDate && row.superviseDate.substr(0, 10) || ''
    }  },
  /*{ label: "归档日期", prop: "finishTime", align: "center",width:'150' },*/
  { label: "收文字号", prop: "documentCode", align: "center", width: '200' },
  { label: "标题", prop: "title", align: "left", minwidth: '150' },
  { label: "承办部门", prop: "undertakeDeptName", align: "center", width: '120' },
  { label: "承办部门办理情况", prop: "undertakeOrgOpinion", align: "center", width: '120' },
  { label: "办结情况", prop: "handleTerminateOpinion", align: "center", width: '100' },
  { label: "当前环节", prop: "curNodeName", align: "center", width: '120' },
  { label: "当前处理人", prop: "curUser", align: "center", width: '80' },
  {    label: "办理时限", prop: "limitDate", align: "center", width: '90', formatter: (row) => {
      return row.limitDate && row.limitDate.substr(0, 10) || ''
    }  },
  { label: "办理时长", prop: "disposeDuration", align: "center", width: '70' },
  { label: "办理进度", prop: "progress", align: "center", width: '70' }
];
const year = new Date().getFullYear();

export default {
  name: "Swcx",
  components: {
    mTable,
    treeCofig
  },
  mixins: [exportTable],
  data() {
    return {
      isLoading: false,
      downLoadTime: 1,
      msgState: true,
      plxzButton: false,
      exportNum: 1,//控制导出数据次数
      bank_select1: {},
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      selectionArr: [],
      choseYear: "",
      yearList: [],
      treeTradeCode: "",
      //来文单位
      sendOrgIdData: {
        function: "unitTreeAll",
        openSup: true,
        openCurr: true,
        treeCofig: true,
        openEqual: true,
        openSub: true
      },
      //收文单位
      receiveOrgIdData: {
        function: "unitTreeAll",
        openSub: true,
        openCurr: true
      },
      // 承办单位
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true,
        showMyDept: ""
      },
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
      ruleForm: {
        function: "selectSuperviseByParam",
        state: 1,
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        receiveStartTime: "", //收文起始日期
        receiveEndTime: "", //收文结束日期
        title: "", //标题
        documentCode: "〔" + year + "〕", //收文字号：
        superviseStartTime: "", //督办起始日期：
        superviseEndTime: "", //督办结束日期：
        superviserName: "", //督办人：
        curNodeCode: "", //  0-流转1-办结 公文状态：
        receiveType: "", //  电子收文，实物收文收文形式：
        formType: "", // 表单类型 0-协办  1-非协办
        sendType: "", //收文类型：
        documentClassName: "", //文种：
        sendOrgName: "", //来文单位：
        receiveOrgName: "", //收文单位：
        undertakeDeptName: "" //承办部门：
      },
      receiveTime: "", //收文日期值
      superviseSTime: "", //督办日期值
      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: finshData,

      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      //tree
      treeData: [],
      singelCheckF: true,
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      shouCheckData: [], //收文选中数据
      laiCheckData: [], //来文选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogTit: "", // 弹框标题
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false,
      //自定义查询新增
      showustom: false,
      isStateAll: true,
      isStateCheck: false,
      isElementAll: false,
      isElementCheck: true,
      isObjAll: false,
      isObjCheck: false,
      checkList: [],
      stateList: ["当前状态", "当前环节", "当前处理人"],
      elementList: ["收文日期", "是否督办", "收文字号", "标题", "承办部门"],
      objList: [],
      tableData1: [],
      tableColsCustom: [],
      customData1: [
        { label: "当前环节", prop: "curNodeName" },
        { label: "当前处理人", prop: "curUser" }
      ],
      customData2: [
        { label: "收文日期", prop: "receiveTime" },
        { label: "是否督办", prop: "isSupervise" },
        { label: "收文字号", prop: "documentCode" },
        { label: "标题", prop: "title" },
        { label: "承办部门", prop: "undertakeDeptName" },
        { label: "已办结承办部门", prop: "undertakeDeptNameYbj" },
        { label: "是否阅件", prop: "isReadStr" },
        { label: "紧急程度", prop: "emergencyName" },
        { label: "收文字数", prop: "receiveWords" },
        { label: "业务分类", prop: "bussinessTypeName" },
        { label: "督办人", prop: "superviserName" },
        { label: "督办日期", prop: "superviseDate" },
        { label: "提前提醒天数", prop: "daysInAdvance" },
        { label: "办理期限", prop: "limitDate" },
        { label: "办理进度", prop: "progress" },
        { label: "文种", prop: "documentClassName" },
        { label: "秘密类型", prop: "secretType" },
        { label: "秘密标志", prop: "secretFlagType" },
        { label: "秘密期限类型", prop: "secretLimitType" },
        { label: "密级和保密期限", prop: "secretMjAndQx" },
        { label: "知悉范围", prop: "knowScore" },
        { label: "来文单位", prop: "sendOrgName" },
        { label: "登记人", prop: "userName" },
        { label: "登记部门", prop: "draftDept" },
        { label: "协办部门", prop: "assistDeptName" },
        { label: "已办结协办部门", prop: "assistDeptNameYbj" },
        { label: "传阅人", prop: "circulatePersonNames" },
        { label: "实物收文类型", prop: "receiveSwType" },
        { label: "保管期限", prop: "keepingLimitName" },
        { label: "成文日期", prop: "completeTime" },
        { label: "附件标题", prop: "attachmentTitle" }
      ],
      customData3: [
        { label: "传阅人员已阅", prop: "circulateIsRead" },
        { label: "传阅人员未阅", prop: "circulateIsNotRead" },
        { label: "发送对象", prop: "sendSubName" },
        { label: "公告至", prop: "publishDept" },
      ],
      customData: [
        { label: "当前环节", prop: "curNodeName" },
        { label: "当前处理人", prop: "curUser" },
        { label: "收文日期", prop: "receiveTime" },
        { label: "是否督办", prop: "isSupervise" },
        { label: "收文字号", prop: "documentCode" },
        { label: "标题", prop: "title" },
        { label: "承办部门", prop: "undertakeDeptName" },
        { label: "已办结承办部门", prop: "undertakeDeptNameYbj" },
        { label: "是否阅件", prop: "isReadStr" },
        { label: "紧急程度", prop: "emergencyName" },
        { label: "收文字数", prop: "receiveWords" },
        { label: "业务分类", prop: "bussinessTypeName" },
        { label: "督办人", prop: "superviserName" },
        { label: "督办日期", prop: "superviseDate" },
        { label: "提前提醒天数", prop: "daysInAdvance" },
        { label: "办理期限", prop: "limitDate" },
        { label: "办理进度", prop: "progress" },
        { label: "文种", prop: "documentClassName" },
        { label: "秘密类型", prop: "secretType" },
        { label: "秘密标志", prop: "secretFlagType" },
        { label: "秘密期限类型", prop: "secretLimitType" },
        { label: "密级和保密期限", prop: "secretMjAndQx" },
        { label: "知悉范围", prop: "knowScore" },
        { label: "来文单位", prop: "sendOrgName" },
        { label: "登记人", prop: "userName" },
        { label: "登记部门", prop: "draftDept" },
        { label: "协办部门", prop: "assistDeptName" },
        { label: "已办结协办部门", prop: "assistDeptNameYbj" },
        { label: "传阅人", prop: "circulatePersonNames" },
        { label: "实物收文类型", prop: "receiveSwType" },
        { label: "保管期限", prop: "keepingLimitName" },
        { label: "成文日期", prop: "completeTime" },
        { label: "附件标题", prop: "attachmentTitle" },
        { label: "传阅人员已阅", prop: "circulateIsRead" },
        { label: "传阅人员未阅", prop: "circulateIsNotRead" },
        { label: "发送对象", prop: "sendSubName" },
        { label: "公告至", prop: "publishDept" },
      ]
    };
  },
  methods: {
    // 批量下载 - 选中条数
    handleSelectionChange(valArr) {
      this.selectionArr = valArr;
    },
    downLoad() {
      let that = this;
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
      // this.selectionArr.forEach((item)=>{
      //   // console.log(item)
      //   let flag;
      //   // item.receiveType == '实物收文'?flag = 'swsw':flag = 'dzsw'
      //   if(item.receiveType == '电子收文'){
      //     flag = 'er'
      //   }else if(item.receiveType == '传阅'){
      //     flag = 'cy'
      //   }else if(item.receiveType == '收文承办'){
      //     flag = 'swcb'
      //   }else if(item.receiveType == '实物收文'){
      //     flag = 'swsw'
      //   }else if(item.receiveType == '收文协办'){
      //     flag = 'xb'
      //   }
      //   that.collectDown(
      //       flag,
      //       item.id,
      //       item.processInstId,
      //       item.documentCode,
      //       item.curNodeCode,
      //       item.title);
      // }); 
      this.plxzButton = true;
      this.$post
        .postData(
          "batchDownload",
          JSON.stringify(Object.assign({}, { "function": "batchDownload", "choseYear": this.choseYear }, { "dataList": this.selectionArr })),
          this.$businessCode.swgl
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
    collectDown(val, id, processInstId, documentCode, curNodeCode, documentTitle) {
      this.$post
        .postData(
          "collection",
          JSON.stringify({
            function: "collection",
            id: id,
            flag: val,
            processInstId,
            documentCode,
            curNodeCode,
            documentTitle
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.success) {
            this.downFile(res.data)
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duation: 2000
            });
            return;
          }
        })
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.downloadUrl;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.swglfj
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
    // 自定义导出--begin
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
                tableName1 = "收文查询表(" + (this.exportNum * 5000 - 4999) + "-" + this.exportNum * 5000 + ")";
                this.exportExc(tableName1, "2");
                if (this.bank_select1.total > this.exportNum * 5000) {
                  this.exportNum++;//1,2,3,4
                  this.zdyExport();
                } else {
                  this.exportNum = 1;
                  return;
                }
              } else {
                tableName1 = "收文查询表(" + (this.exportNum * 5000 - 4999) + "-" + this.bank_select1.total + ")";
                this.exportExc(tableName1, "2");
                this.exportNum = 1;
                return;
              }
            } else if (this.bank_select1.total > 0) {
              tableName1 = "收文查询表(1" + "-" + this.bank_select1.total + ")";
              this.exportExc(tableName1, "2");
              this.exportNum = 1;
              return;
            } else {
              tableName1 = "收文查询表";
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
          choseYear: this.choseYear
        }
      })
      this.bank_select1.unitName = this.unitName
      this.bank_select1.unitId = this.unitId
      this.bank_select1 = Object.assign(this.ruleForm, this.bank_select1);
      this.bank_select1.st = localStorage.getItem('st');
      this.bank_select1.function = "selectSuperviseByParamZDY";
      this.bank_select1.page = this.exportNum;
      this.bank_select1.limit = 5000;
      this.bank_select1.total = 0;
      await this.$post.postData("selectSuperviseByParamZDY", JSON.stringify(Object.assign({}, this.bank_select1)), this.$businessCode.swgl).then(res => {
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
    // 自定义导出--end
    selectYear(val) {
      this.choseYear = val;
      this.$router.push({
        query: {
          choseYear: val
        }
      });
      if (val == "") {
        let curDay = new Date();
        let openTimeYear = curDay.getFullYear();
        this.ruleForm.documentCode = '〔' + openTimeYear + '〕'
      } else {
        this.ruleForm.documentCode = '〔' + val + '〕'
      }
      // this.$router.push({
      //   query: {
      //     choseYear: val
      //   }
      // })
    },
    // 表格请求数据
    initData() {
      this.$router.push({
        query: {
          choseYear: this.choseYear
        }
      })
      sessionStorage.setItem('page_sw', JSON.stringify(this.ruleForm));
      this.ruleForm.isCY = "1";
      this.$post
        .postData(
          "selectSuperviseByParam",
          JSON.stringify(this.ruleForm),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.data) {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请求出错",
              duration: 500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择时间 收文
    receiveTimeChange(rangeTime) {
      if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
        this.ruleForm.receiveStartTime = "";
        this.ruleForm.receiveEndTime = "";
        return false;
      }
      this.ruleForm.receiveStartTime = dateFormate.date(
        Date.parse(this.receiveTime[0])
      );
      this.ruleForm.receiveEndTime = dateFormate.date(
        Date.parse(this.receiveTime[1])
      );
    },
    // 选择时间 督办
    superviseSTimeChange() {

      // if(!rangeTime||rangeTime=="null"||rangeTime=="undefined"){
      //    this.ruleForm.superviseStartTime = "";
      //   this.ruleForm.superviseEndTime = "";
      //   return false;
      // }

      this.ruleForm.superviseStartTime = dateFormate.date(
        Date.parse(this.superviseSTime[0])
      );
      this.ruleForm.superviseEndTime = dateFormate.date(
        Date.parse(this.superviseSTime[1])
      );
    },

    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.ruleForm.page = this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    // 点击切换页数按钮切换
    handleSizeChange(val) {
      this.ruleForm.limit = this.pagination.limit = val;
      this.ruleForm.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
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
    cellClick(row, column, cell, event) {
      let state, path = '';
      let isDb = false;
      let unitinfo = JSON.parse(localStorage.getItem("unitInfo"))
      unitinfo.map((item) => {
        if (row.curUserId == item.currUnitId) {
          return isDb = true
        }
      })
      if (row.receiveType == "电子收文") {
        // state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        // path = (row.curNodeCode == '800' || row.curUserId == '') ? '/receiveDzBjYb' :(isDb?'/receiveElectronDispatch':'/receiveDzBjYb')
        state = 2
        path = '/receiveDzBjYb'
      }
      if (row.receiveType == "实物收文") {
        // state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        // path = (row.curNodeCode == '800' || row.curUserId == '') ? '/receiveBjYb' :(isDb?'/receiveDispatch':'/receiveBjYb')
        state = 2
        path = '/receiveBjYb'
      }
      if (row.receiveType == "协办") {
        // state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        // path = (row.curNodeCode == '800' || row.curUserId == '') ? '/receiveSponsorReadonly' :(isDb?'/receiveSponsorDetail':'/receiveSponsorReadonly')
        state = 2
        path = '/receiveSponsorReadonly'
      }
      if (row.receiveType == "承办") {
        // state = (row.curNodeCode == '800' || row.curUserId == '') ? 3 :(isDb?1:2)
        // path = (row.curNodeCode == '800' || row.curUserId == '') ? '/shiwucbDetailReadonly' :(isDb?'/shiwucbDetail':'/shiwucbDetailReadonly')
        state = 2
        path = '/shiwucbDetailReadonly'
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: row.id,
          receiveType: row.receiveType,
          state: state,
          choseYear: this.$route.query.choseYear,
          tiaoguo: '1'
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm() {
      this.ruleForm.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    resetForm(formName) {
      let nowDate = new Date();
      let nowYear = nowDate.getFullYear();
      this.choseYear = ''
      this.ruleForm.function = "selectSuperviseByParam",
        this.ruleForm.state = 1,
        this.ruleForm.page = 1, //当前页数
        this.ruleForm.limit = this.pagination.limit = 20, //每页条数
        this.ruleForm.totalCount = 0,
        this.ruleForm.receiveStartTime = "", //收文起始日期
        this.ruleForm.receiveEndTime = "", //收文结束日期
        this.ruleForm.title = "", //标题
        this.ruleForm.documentCode = "〔" + nowYear + "〕", //收文字号：
        this.ruleForm.superviseStartTime = "", //督办起始日期：
        this.ruleForm.superviseEndTime = "", //督办结束日期：
        this.ruleForm.superviserName = "", //督办人：
        this.ruleForm.curNodeCode = "", //  0-流转1-办结 公文状态：
        this.ruleForm.receiveType = "", //  电子收文，实物收文收文形式：
        this.ruleForm.formType = "", // 表单类型 0-协办  1-非协办
        this.ruleForm.sendType = "", //收文类型：
        this.ruleForm.documentClassName = "", //文种：
        this.ruleForm.sendOrgName = "", //来文单位：
        this.ruleForm.receiveOrgName = "", //收文单位：
        this.ruleForm.undertakeDeptName = ""; //承办部门：
      this.ruleForm.sendOrgId = ""; //   制发单位id
      this.ruleForm.receiveOrgId = ""; //   来文单位id
      this.ruleForm.undertakeDeptId = ""; //   部门id
      this.receiveTime = "", //收文日期值
        this.superviseSTime = "" //督办日期值
      this.routeYear();
      this.tableData = [];
    },
    // 单位选择
    getTreeData(n) {
      let obj = {};
      let name = "";
      this.offenUse = false;
      this.dialogTypeNow = n;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.treeData = [];
      //手动清空时处理
      switch (n) {
        case "chen":
          name = "承办部门";
          obj = Object.assign(obj, this.bank_mainXiao);
          clearName = "undertakeOrganName";
          break;
        case "shou":
          obj = Object.assign(obj, this.receiveOrgIdData);
          name = "收文单位";
          clearName = "receiveOrgName";
          break;
        case "lai":
          obj = Object.assign(obj, this.sendOrgIdData);
          name = "来文单位";
          clearName = "sendOrgName";
          break;
      }
      //this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      if (n != 'chen') {
        this.$post
          .postData(
            "getForwordOrgDept",
            JSON.stringify(obj),
            this.$businessCode.swglgg
          )
          .then(res => {
            that.treeData = (res && res.data) || [];
          });
      } else {
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(obj),
            this.$businessCode.swglgg
          )
          .then(res => {
            that.treeData = (res && res.data) || [];
          });
      }
    },

    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeOrganName") {
          this.ruleForm.undertakeOrganId = "";
          this.chenCheckData = [];
        }
        if (name === "sendOrgName") {
          this.ruleForm.sendOrgId = "";
          this.shouCheckData = [];
        }
        if (name === "receiveOrgName") {
          this.ruleForm.receiveOrgId = "";
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
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
        }

        switch (dtype) {
          case "chen":
            this.ruleForm.undertakeDeptName = names.join("");
            this.ruleForm.undertakeDeptId = ids.join("");
            this.chenCheckData = this.checkData;
            break;
          case "shou":
            this.ruleForm.receiveOrgName = names.join("");
            this.ruleForm.receiveOrgId = ids.join("");
            this.shouCheckData = this.checkData;
            break;
          case "lai":
            this.ruleForm.sendOrgName = names.join("");
            this.ruleForm.sendOrgId = ids.join("");
            this.laiCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },

    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
        case "chen":
          this.checkIds = new Array(this.ruleForm.undertakeOrganId);
          this.checkData = this.chenCheckData;
          break;
        case "shou":
          this.checkIds = new Array(this.ruleForm.receiveOrgId);
          this.checkData = this.shouCheckData;
          break;
        case "lai":
          this.checkIds = new Array(this.ruleForm.sendOrgId);
          this.checkData = this.laiCheckData;
          break;
      }
    },
    //导出
    exportExc(name, val) {
      // exportTable.exportExcel("公文督查办查询统计表",".el-table");
      exportTable.exportExcel(name, val == "2" ? "#custom" : "#nomal");
    },
    routeYear() {
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
    }
  },
  created() {
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({ function: "selTableYear" }),
        this.$businessCode.swgl
      ).then(res => {
        if (res) {
          this.yearList = res.data
        }
      })
    this.treeTradeCode = this.$businessCode.swglgg;  //人员树交易线
    if (sessionStorage.getItem('page_sw')) {
      this.ruleForm = Object.assign(this.ruleForm, JSON.parse(sessionStorage.getItem('page_sw')));
      if (this.ruleForm.receiveStartTime && this.ruleForm.receiveEndTime) {
        this.receiveTime = [this.ruleForm.receiveStartTime, this.ruleForm.receiveEndTime]
      }
      if (this.ruleForm.superviseStartTime && this.ruleForm.superviseEndTime) {
        this.superviseSTime = [this.ruleForm.superviseStartTime, this.ruleForm.superviseEndTime]
      }
      this.pagination = {
        page: this.ruleForm.page, //第几页
        total: 0, //共有条数
        limit: this.ruleForm.limit //每页条数
      };
      this.initData();
    }
    // this.initData();
  }
};
</script>

<style lang="less" scoped>
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
  padding: 20px 0 0 0;
  position: relative;
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
  bottom: -64px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}

.arrowup {
  text-align: center;
}
.mtJ20 > .el-form-item--mini.el-form-item,
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
