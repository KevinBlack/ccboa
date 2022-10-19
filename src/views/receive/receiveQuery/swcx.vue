<template>
  <div>
    <el-row class="mtJ20">
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="choseYear"
                  @change="selectYear"
                  placeholder="近两年"
                  style="width: 100%;"
                >
                  <el-option value label="近两年"></el-option>
                  <el-option
                    v-for="yearItem in yearList"
                    :key="yearItem"
                    :label="yearItem"
                    :value="yearItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收文日期">
                <div class="block">
                  <el-date-picker
                    @change="receiveTimeChange()"
                    v-model="receiveTime"
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
            </el-col>
            <el-col :span="5">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="收文字号" prop="title">
                <el-input v-model="ruleForm.documentCode" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="text-align: center;margin-bottom: 10px;">
              <el-col v-show="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="down=!down">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-show="down">
            <el-row>
              <el-col :span="8">
                <!--                <el-form-item label="来文单位" prop="title">
                  <el-radio-group v-model="ruleForm.sendOrgId" @change="getOther($event)">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="总行"></el-radio>
                    <el-radio label="其他"></el-radio>
                  </el-radio-group>
                </el-form-item>-->
                <el-form-item label="制发行" prop="sendOrgName">
                  <select-org-or-dept @select="selectIssue">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="ruleForm.sendOrgName"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </select-org-or-dept>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="制发部门" prop="sendDeptName">
                  <el-input v-model="ruleForm.sendDeptName" readonly="readonly" placeholder="请选择">
                    <el-button slot="append" @click="getUnitTreeAll" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" v-if="isOther">
                <el-form-item prop="title">
                  <el-input v-model="otherCurOrgId" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="收文单位" prop="receiveOrgName">
                  <el-input v-model="ruleForm.receiveOrgName" readonly="readonly" placeholder="请选择或输入">
                    <el-button slot="append" @click="getTreeData('lai')" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="8">
                <el-form-item label="承办部门" prop="undertakeDeptName">
                  <el-input
                    v-model="ruleForm.undertakeDeptName"
                    readonly="readonly"
                    placeholder="请选择"
                  >
                    <el-button slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="收文来源">
                <el-radio-group v-model="ruleForm.isInner">
                  <el-radio label>全部</el-radio>
                  <el-radio label="0">行内</el-radio>
                  <el-radio label="1">行外</el-radio>
                </el-radio-group>
              </el-form-item>
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
              <el-form-item label="收文类型">
                <el-radio-group v-model="ruleForm.receiveType">
                  <el-radio label>全部</el-radio>
                  <el-radio label="电子收文"></el-radio>
                  <el-radio label="实物收文"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="表单类型">
                <el-radio-group v-model="ruleForm.formType">
                  <el-radio label>全部</el-radio>
                  <el-radio label="传阅单"></el-radio>
                  <el-radio label="协办单"></el-radio>
                  <el-radio label="实物承办单"></el-radio>
                  <el-radio label="收文单"></el-radio>
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

          <el-col class="down" v-show="down">
            <el-button type="info" size="small" @click="down=!down">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>
        </el-form>
      </el-col>
      <div style="text-align: right;" class="exportExcPd">
        <el-button style="text-align:right;" size="small" @click="exportExc" v-preventClick>导 出</el-button>
      </div>
      <el-col style="margin: 30px 0;" :class="{'is3':!down}">
        <m-table
          id="nomal"
          class="nomal"
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
        <m-table
          v-show="false"
          id="custom"
          class="custom"
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData1"
          :tableCols="tableColsCustom"
          :pagination="pagination"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="ruleForm"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <treeAll
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState1"
      :offenUse="offenUse"
      :fromdata="ruleForm"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeAll>
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
                <el-col :span="8" :offset="1"><el-checkbox label="当前状态" value="isFlowEnd"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="当前环节" value="curNodeName"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="当前处理人" value="curUser"></el-checkbox></el-col>
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
                <el-col :span="8" :offset="1"><el-checkbox label="收文日期" value="receiveTime"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="是否督办" value="isSupervise"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="收文字号" value="documentCode"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="标题" value="title"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="承办部门" value="undertakeDeptName"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="是否阅件" value="isRead"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="秘密类型" value="secretType"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="秘密期限类型" value="secretTimeType"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="密级和保密期限" value="secretFlagType"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="紧急程度" value="emergencyName"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="秘密标志" value="secretFlagType"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="收文字数" value="receiveWords"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="业务分类" value="bussinessTypeName"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="文种" value="documentClass"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="来文单位" value="sendOrgName"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="登记人" value="userName"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="登记部门" value="draftDept"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="协办部门" value="assistDeptName"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="知悉范围" value="knowScore"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="保管期限" value="keepingLimitName"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="传阅人" value="circulatePersonNames"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="实物收文类型" value="receiveSwType"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="成文日期" value="completeTime"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="附件标题" value="attachmentTitle"></el-checkbox></el-col>
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
                <el-col :span="8" :offset="1"><el-checkbox label="传阅人员已阅" value="circulateIsRead"></el-checkbox></el-col>
                <el-col :span="8"><el-checkbox label="传阅人员未阅" value="circulateIsNotRead"></el-checkbox></el-col>
                <el-col :span="7"><el-checkbox label="发送对象" value="sendSubName"></el-checkbox></el-col>
                <el-col :span="8" :offset="1"><el-checkbox label="公告至" value="publishDept"></el-checkbox></el-col>
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
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import treeCofig from "@/components/tree/tree-fawen";
import treeAll from "@/components/tree/tree-all";
import exportTable from "@/minixs/exportTable";
import selectOrgOrDept from "components/select/unitSelect";
const two = [
  { label: "收文日期", prop: "receiveTime", align: "center", width: "145" },
  {
    label: "是否督办",
    prop: "isSupervise",
    align: "center",
    width: "70",
    formatter(row) {
      return row.isSupervise == 0 || "" ? "否" : "是";
    }
  },
  { label: "收文字号", prop: "documentCode", align: "center", width: "200" },
  { label: "标题", prop: "title", align: "left", minwidth: "150" },
  {
    label: "承办部门",
    prop: "undertakeDeptName",
    align: "center",
    width: "120"
  },
  {
    label: "协办部门",
    prop: "undertakeDeptName",
    align: "center",
    width: "120"
  },
  { label: "协办时间", prop: "title", align: "center", width: "145" },
  { label: "当前处理人", prop: "curUser", align: "center", width: "100" }
];
const one = [
  { label: "收文日期", prop: "receiveTime", align: "center", width: "145" },
  {
    label: "是否督办",
    prop: "isSupervise",
    align: "center",
    width: "80",
    formatter(row) {
      return row.isSupervise == 0 || "" ? "否" : "是";
    }
  },
  { label: "收文字号", prop: "documentCode", align: "center", width: "200" },
  { label: "标题", prop: "title", align: "left", minwidth: "150" },
  {
    label: "承办部门",
    prop: "undertakeDeptName",
    align: "center",
    width: "120"
  },
  { label: "当前处理人", prop: "curUser", align: "center", width: "100" }
];
const year = new Date().getFullYear();
export default {
  name: "Swcx",
  components: {
    mTable,
    treeCofig,
    selectOrgOrDept,
    treeAll
  },
  data() {
    return {
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      selectionArr:[],
      choseYear: "",
      yearList: [],
      treeTradeCode: "",
      undertakeDeptIdData: {
        function: "selUnitTreeByHQ",
        flag: true,
        showMyDept: ""
      },
      sendOrgIdData: {
        function: "unitTreeAll",
        openSup: true,
        openCurr: true,
        treeCofig: true,
        openEqual: true,
        openSub: true
      },
      isOther: false,
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
        function: "selectReceive",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        curNodeCode: "",
        receiveStartTime: "", //发文字号
        receiveEndTime: "", //主办部门
        receiveType: "",
        isInner: "",
        formType: "",
        documentCode: "〔" + year + "〕",
        title: "",
        undertakeDeptName: "",
        sendDeptName: "", //制发部门
        sendDeptId: "",
        sendOrgName: "", //制发行
        sendOrgId: ""
      },
      receiveTime: "", //收文日期值
      otherCurOrgId: "",
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: one,
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
      shouCheckData: [], //承办选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogState1: false,
      dialogTit: "", // 弹框标题
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false,
      unitTreeFun: {
        function: "selectUnitTreeAll",
        wfeUnitId: "" //制发单位id值
      },
      zhifaCheckData: [], //制发部门
      //自定义查询新增
      showustom:false,
      isStateAll:true,
      isStateCheck:false,
      isElementAll:false,
      isElementCheck:true,
      isObjAll:false,
      isObjCheck:false,
      checkList: [],
      stateList: ["当前状态","当前环节","当前处理人"],
      elementList: ["拟稿日期","发文日期","发文字号","标题","发文种类","主办部门"],
      objList: [],
      tableData1: [],
      tableColsCustom: [],
      customData1: [
        {label:"当前环节", prop:"curNodeName"},
        {label:"当前处理人", prop:"curUser"}
      ],
      customData2: [
        {label:"收文日期", prop:"receiveTime"},
        {label:"是否督办", prop:"isSupervise"},
        {label:"收文字号", prop:"documentCode"},
        {label:"标题", prop:"title"},
        {label:"承办部门", prop:"undertakeDeptName"},
        {label:"是否阅件", prop:"isRead"},
        {label:"秘密类型", prop:"secretType"},
        {label:"秘密期限类型", prop:"secretTimeType"},
        {label:"密级和保密期限", prop:"secretFlagType"},
        {label:"紧急程度", prop:"emergencyName"},
        {label:"秘密标志", prop:"secretFlagType"},
        {label:"收文字数", prop:"receiveWords"},
        {label:"业务分类", prop:"bussinessTypeName"},
        {label:"文种", prop:"documentClass"},
        {label:"来文单位", prop:"sendOrgName"},
        {label:"登记人", prop:"userName"},
        {label:"登记部门", prop:"draftDept"},
        {label:"协办部门", prop:"assistDeptName"},
        {label:"知悉范围", prop:"knowScore"},
        {label:"保管期限", prop:"keepingLimitName"},
        {label:"传阅人", prop:"circulatePersonNames"},
        {label:"实物收文类型", prop:"receiveSwType"},
        {label:"成文日期", prop:"completeTime"},
        {label:"附件标题", prop:"attachmentTitle"}
      ],
      customData3: [
        {label:"传阅人员已阅", prop:"circulateIsRead"},
        {label:"传阅人员未阅", prop:"circulateIsNotRead"},
        {label:"发送对象", prop:"sendSubName"},
        {label:"公告至", prop:"publishDept"}
      ],
      customData: [
        {label:"当前环节", prop:"curNodeName"},
        {label:"当前处理人", prop:"curUser"},
        {label:"收文日期", prop:"receiveTime"},
        {label:"是否督办", prop:"isSupervise"},
        {label:"收文字号", prop:"documentCode"},
        {label:"标题", prop:"title"},
        {label:"承办部门", prop:"undertakeDeptName"},
        {label:"是否阅件", prop:"isRead"},
        {label:"秘密类型", prop:"secretType"},
        {label:"秘密期限类型", prop:"secretTimeType"},
        {label:"密级和保密期限", prop:"secretFlagType"},
        {label:"紧急程度", prop:"emergencyName"},
        {label:"秘密标志", prop:"secretFlagType"},
        {label:"收文字数", prop:"receiveWords"},
        {label:"业务分类", prop:"bussinessTypeName"},
        {label:"文种", prop:"documentClass"},
        {label:"来文单位", prop:"sendOrgName"},
        {label:"登记人", prop:"userName"},
        {label:"登记部门", prop:"draftDept"},
        {label:"协办部门", prop:"assistDeptName"},
        {label:"知悉范围", prop:"knowScore"},
        {label:"保管期限", prop:"keepingLimitName"},
        {label:"传阅人", prop:"circulatePersonNames"},
        {label:"实物收文类型", prop:"receiveSwType"},
        {label:"成文日期", prop:"completeTime"},
        {label:"附件标题", prop:"attachmentTitle"},
        {label:"传阅人员已阅", prop:"circulateIsRead"},
        {label:"传阅人员未阅", prop:"circulateIsNotRead"},
        {label:"发送对象", prop:"sendSubName"},
        {label:"公告至", prop:"publishDept"}
      ]
    };
  },
  methods: {
    // 批量下载 - 选中条数
    handleSelectionChange(valArr){
      // console.log(valArr)
      this.selectionArr = valArr;
    },
    downLoad(){
      let that = this;
      this.selectionArr.forEach((item)=>{
        console.log(item)
        let flag;
        item.receiveType == '实物收文'?flag = 'swsw':flag = 'dzsw'
        that.collectDown(
            flag,
            item.id,
            item.processInstId,
            item.documentCode,
            item.curNodeCode,
            item.documentTitle);
      }); 
    },
    collectDown(val,id,processInstId,documentCode,curNodeCode,documentTitle) {
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
              offset: 100,
              showClose: true,
              message: res.message,
              duation: 1500
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
                duration: 1500
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
        console.log(that.stateList)
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
        console.log(that.elementList)
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
        console.log(that.objList)
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
      if (this.tableColsCustom.length<1) {
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择导出字段!",
            duration: 1500,
          })
          return;
      }
      this.handleReqAllData().then(status => {
        if (status) {
          this.showustom = false;
          setTimeout(() => {
            this.exportExc("2");
          },1000)
        }
      })
    },
    async handleReqAllData() {
      var status = false;
      
      await this.$post.postData("selectReceiveZDY", JSON.stringify(Object.assign({},this.ruleForm,{"function":"selectReceiveZDY"})), this.$businessCode.swgl).then(res => {
        if (res.success) {
          this.tableData1 = res.data&&res.data||[];
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
      if (val=="") {
        let curDay = new Date();
        let openTimeYear = curDay.getFullYear();
        this.ruleForm.documentCode = '〔'+ openTimeYear +'〕'
      } else {
        this.ruleForm.documentCode = '〔'+ val +'〕'
      }
    },
    getOther(event) {
      if (event == "其他") {
        this.isOther = true;
      } else {
        this.isOther = false;
      }
    },
    initData() {
      /*if(this.ruleForm.sendOrgId == '其他'){
        this.ruleForm.sendOrgId = this.otherCurOrgId;
      }*/
      if (this.ruleForm.formType == "协办单") {
        this.tableCols = two;
      } else {
        this.tableCols = one;
      }
      sessionStorage.setItem("page_sw", JSON.stringify(this.ruleForm));
      this.$post
        .postData(
          "selectReceive",
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
    // 选择时间 收文
    receiveTimeChange(rangeTime) {
      this.ruleForm.receiveStartTime = dateFormate.date(
        Date.parse(this.receiveTime[0])
      );
      this.ruleForm.receiveEndTime = dateFormate.date(
        Date.parse(this.receiveTime[1])
      );
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.ruleForm.page = this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },
    handleSizeChange(val) {
      this.ruleForm.limit = this.pagination.limit = val;
      this.ruleForm.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      if (row.receiveType == "传阅") {
        let state = row.curNodeCode == "800" ? 1 : 0;
        const routeData = this.$router.resolve({
          path: "/reCircularizeDispatch",
          query: {
            id: row.id,
            mainDocId: row.mainDocId,
            multiTenancyId: row.multiTenancyId,
            state: state,
            readFlag: row.readFlag,
            choseYear: this.choseYear
          }
        });
        let routeId =
          (localStorage.getItem("routeIdList") &&
            JSON.parse(localStorage.getItem("routeIdList"))) ||
          [];
        if (routeId.includes(row.id)) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "已经打开了该页面!",
            duration: 1500
          });
          return;
        } else {
          routeId.push(row.id);
          localStorage.setItem("routeIdList", JSON.stringify(routeId));
        }
        window.open(routeData.href, "_blank");
      } else {
        this.$post
          .postData(
            "forwordTodoOrEnd", //传阅常用联系人修改 12.21
            JSON.stringify({
              function: "forwordTodoOrEnd",
              processInstId: row.processInstId
            }),
            this.$businessCode.swgl
          )
          .then(res => {
            if (res && res.success) {
              //forwordTodo true待办,false已办
              if (row.receiveType == "收文协办") {
                let path =
                  res.forwordTodo == 1
                    ? "/receiveSponsorDetail"
                    : "/receiveSponsorReadonly";
                const routeData = this.$router.resolve({
                  path: path,
                  query: {
                    id: row.id,
                    readFlag: row.readFlag,
                    state: res.forwordTodo,
                    choseYear: this.choseYear
                  }
                });
                if (res.forwordTodo) {
                  let routeId =
                    (localStorage.getItem("routeIdList") &&
                      JSON.parse(localStorage.getItem("routeIdList"))) ||
                    [];
                  if (routeId.includes(row.id)) {
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message: "已经打开了该页面!",
                      duration: 1500
                    });
                    return;
                  } else {
                    routeId.push(row.id);
                    localStorage.setItem(
                      "routeIdList",
                      JSON.stringify(routeId)
                    );
                  }
                }
                window.open(routeData.href, "_blank");
              }
              if (row.receiveType == "收文承办") {
                let state = res.forwordTodo == false ? 3 : 1;
                let path =
                  res.forwordTodo == false
                    ? "/shiwucbDetailReadonly"
                    : "/shiwucbDetail";
                const routeData = this.$router.resolve({
                  path: path,
                  query: {
                    id: row.id,
                    receiveType: row.receiveType,
                    readFlag: row.readFlag,
                    state: state,
                    choseYear: this.choseYear
                  }
                });
                if (res.forwordTodo) {
                  let routeId =
                    (localStorage.getItem("routeIdList") &&
                      JSON.parse(localStorage.getItem("routeIdList"))) ||
                    [];
                  if (routeId.includes(row.id)) {
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message: "已经打开了该页面!",
                      duration: 1500
                    });
                    return;
                  } else {
                    routeId.push(row.id);
                    localStorage.setItem(
                      "routeIdList",
                      JSON.stringify(routeId)
                    );
                  }
                }
                window.open(routeData.href, "_blank");
              }
              if (row.receiveType == "电子收文") {
                let state = res.forwordTodo == false ? 3 : 1;
                let path =
                  res.forwordTodo == false
                    ? "/receiveDzBjYb"
                    : "/receiveElectronDispatch";
                const routeData = this.$router.resolve({
                  path: path,
                  query: {
                    id: row.id,
                    readFlag: row.readFlag,
                    state: state,
                    noRefresh: true,
                    choseYear: this.choseYear
                  }
                });
                if (res.forwordTodo) {
                  let routeId =
                    (localStorage.getItem("routeIdList") &&
                      JSON.parse(localStorage.getItem("routeIdList"))) ||
                    [];
                  if (routeId.includes(row.id)) {
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message: "已经打开了该页面!",
                      duration: 1500
                    });
                    return;
                  } else {
                    routeId.push(row.id);
                    localStorage.setItem(
                      "routeIdList",
                      JSON.stringify(routeId)
                    );
                  }
                }
                window.open(routeData.href, "_blank");
              }
              if (row.receiveType == "实物收文") {
                let state = res.forwordTodo == false ? 3 : 1;
                let path =
                  res.forwordTodo == false
                    ? "/receiveBjYb"
                    : "/receiveDispatch";
                const routeData = this.$router.resolve({
                  path: path,
                  query: {
                    id: row.id,
                    readFlag: row.readFlag,
                    state: state,
                    noRefresh: true,
                    choseYear: this.choseYear
                  }
                });
                if (res.forwordTodo) {
                  let routeId =
                    (localStorage.getItem("routeIdList") &&
                      JSON.parse(localStorage.getItem("routeIdList"))) ||
                    [];
                  if (routeId.includes(row.id)) {
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message: "已经打开了该页面!",
                      duration: 1500
                    });
                    return;
                  } else {
                    routeId.push(row.id);
                    localStorage.setItem(
                      "routeIdList",
                      JSON.stringify(routeId)
                    );
                  }
                }
                window.open(routeData.href, "_blank");
              }
            }
          });
      }
    },
    submitForm(formName) {
      this.ruleForm.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    resetForm(formName) {
      this.receiveTime = "";
      this.otherCurOrgId = "";
      this.ruleForm.curNodeCode = "";
      this.ruleForm.receiveStartTime = "";
      this.ruleForm.receiveEndTime = "";
      this.ruleForm.sendOrgId = "";
      this.ruleForm.receiveType = "";
      this.ruleForm.isInner = "";
      this.ruleForm.formType = "";
      this.ruleForm.documentCode = "〔" + year + "〕";
      this.ruleForm.title = "";
      this.ruleForm.undertakeDeptName = "";
      this.ruleForm.undertakeDeptId = "";
      this.ruleForm.receiveOrgId = "";
      this.ruleForm.receiveOrgName = "";
      this.ruleForm.sendOrgName = ""; //制发行
      this.ruleForm.sendOrgId = "";
      this.ruleForm.sendDeptId = ""; //制发部门
      this.ruleForm.sendDeptName = "";
    },
    // 单位选择
    getTreeData(n) {
      let obj = {};
      let name = "";
      this.offenUse = false;
      this.dialogTypeNow = n;
      this.dialogType = n;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.treeData = [];
      //手动清空时处理
      switch (n) {
        case "chen":
          //this.bank_main
          name = "承办部门";
          obj = Object.assign(obj, this.undertakeDeptIdData);
          clearName = "undertakeDeptName";
          break;
        case "lai":
          obj = Object.assign(obj, this.sendOrgIdData);
          name = "来文单位";
          clearName = "receiveOrgName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "selUnitTreeByHQ",
          JSON.stringify(obj),
          this.$businessCode.swglgg
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
        });
    },
    //树弹框
    getUnitTreeAll() {
      this.dialogTit = "选择部门";
      this.dialogTypeNow = "zhifa";
      this.dialogType = "zhifa";
      this.treeData = [];
      this.hasRadio = true;
      this.canTab = false;
      this.singelCheckF = false;
      this.clearCheckData("sendDeptName");
      this.showCompDialog();
      this.$post
        .postData(
          "selectUnitTreeAll",
          JSON.stringify(this.unitTreeFun),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.treeData = (res && res.data) || [];
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 500
            });
          }
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeDeptName") {
          this.ruleForm.undertakeDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "receiveOrgName") {
          this.ruleForm.sendOrgId = "";
          this.shouCheckData = [];
        }
        if (name === "zhifa") {
          this.ruleForm.sendDeptId = "";
          this.ruleForm.sendDeptName = "";
          this.zhifaCheckData = [];
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
        that.checkData = [];
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
          case "lai":
            this.ruleForm.receiveOrgName = names.join("");
            this.ruleForm.receiveOrgId = ids.join("");
            this.shouCheckData = this.checkData;
            break;
          case "zhifa":
            this.ruleForm.sendDeptName = names.join(";");
            this.ruleForm.sendDeptId = ids.join(";");
            this.zhifaCheckData = this.checkData;
        }
      }
      if (this.dialogTypeNow == "zhifa") {
        this.dialogState1 = !this.dialogState1;
        //关闭弹窗 并确认完成发送
        if (this.dialogState1) {
          this.backDialogData(this.dialogTypeNow);
        }
      } else {
        this.dialogState = !this.dialogState;
        //关闭弹窗 并确认完成发送
        if (this.dialogState) {
          this.backDialogData(this.dialogTypeNow);
        }
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "chen":
          this.checkIds =
            this.ruleForm.undertakeDeptId &&
            this.ruleForm.undertakeDeptId.split(";");
          this.checkData = this.chenCheckData;
          break;
        case "zhifa":
          this.checkIds =
            this.ruleForm.sendDeptId && this.ruleForm.sendDeptId.split(";");
          this.checkData = this.zhifaCheckData;
          break;
      }
    },
    //导出
    exportExc() {
      exportTable.exportExcel("收文查询统计表", ".el-table");
    },
    selectIssue(tree) {
      this.ruleForm.sendDeptName = "";
      this.ruleForm.sendDeptId = "";
      this.zhifaCheckData = [];
      this.ruleForm.sendOrgName = tree.unitName;
      this.ruleForm.sendOrgId = tree.id;
      this.unitTreeFun.wfeUnitId = tree.id;
    }
  },
  created() {
    this.$router.push({
      query: {
        choseYear: ""
      }
    });
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({ function: "selTableYear" }),
        this.$businessCode.swgl
      )
      .then(res => {
        if (res) {
          this.yearList = res.data;
        }
      });
    this.treeTradeCode = this.$businessCode.swglgg; //人员树交易线
    // this.initData();
    if (sessionStorage.getItem("page_sw")) {
      this.ruleForm = Object.assign(
        this.ruleForm,
        JSON.parse(sessionStorage.getItem("page_sw"))
      );
      if (this.ruleForm.receiveStartTime && this.ruleForm.receiveEndTime) {
        this.receiveTime = [
          this.ruleForm.receiveStartTime,
          this.ruleForm.receiveEndTime
        ];
      }
      this.pagination = {
        page: this.ruleForm.page, //第几页
        total: 0, //共有条数
        limit: this.ruleForm.limit //每页条数
      };
      this.initData();
    }
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
  padding: 10px 0 70px 0;
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
