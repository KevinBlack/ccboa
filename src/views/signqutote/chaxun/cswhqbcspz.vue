<template>
  <div v-cloak>
    <el-row>
      <el-col>
        <el-form
          :model="bank_countersignature"
          ref="bank_countersignature"
          label-width="100px"
          class="demo-bank_countersignature mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="bank_countersignature.choseYear"
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
              <el-form-item label="拟稿日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange()"
                    v-model="draftTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    style="max-width:300px;"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
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
                    <el-date-picker
                      @change="sendSecretaryTimeChange()"
                      v-model="sendSecretaryTime"
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
              <el-col :span="6">
                <el-form-item label="办公室审核时间">
                  <div class="block">
                    <el-date-picker
                      @change="officeCheckTimeChange()"
                      v-model="officeCheckTime"
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
                  <el-radio-group v-model="bank_countersignature.qianBaoTypeName" >
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
              <el-col :span="12">
                <el-form-item label="表单类型">
                  <el-radio-group v-model="bank_countersignature.bdlx">
                    <el-radio label="1">会签单</el-radio>
                    <el-radio label="2">协办单</el-radio>
                    <el-radio label="3">非会签协办单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
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
        <el-button  @click="exportExc">导出</el-button>
      </el-col>
      <!-- <el-col class="mt20end">    v-if="isEnd" -->
      <el-col style="margin: 5px 0;">
        <m-table
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
      :fromdata="bank_countersignature"
      :titleWords="titleWords"
      :checkOrg="checkOrg"
      :seletOptionsData="seletOptionsData"
      :searchByContact="searchByContact"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig> 
  </div> 
</template> 

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";
import treeCofig from "@/components/tree/tree-fawen";
import viewDraft from "@/minixs/viewDraft";
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
    mTable,treeCofig
  },
  mixins: [viewDraft],
  data() {
    return {
      checkOrg:'', 
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
      bank_countersignature: {
        function: "queryQianbaoAll",
        bdlx: "3",
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0,
        choseYear: "",
        draftTimeStart: "",
        draftTimeEnd: "",
        sendSecretaryTimeStart: "",
        sendSecretaryTimeEnd: "",
        officeCheckTimeStart: "",
        officeCheckTimeTimeEnd: "",
        documentNo: "〔"+year+"〕",
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
        hqbmCount: ""

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
      searchByContact:true,//过滤单选
      idType:""
    };
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("签报查询表",".el-table");
    },
    initData() {
      this.$router.push({
        query: {
          choseYear: this.bank_countersignature.choseYear
        }
      })
      sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_countersignature));
      this.$post
        .postData(
          "queryQianbaoAll",
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
      }else{
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
      }else{
        this.bank_countersignature.officeCheckTimeStart = ""
        this.bank_countersignature.officeCheckTimeTimeEnd = ""
      }
    },
    handleOpenPage(path, id ,status) {
      if (status == 'daiban') {
        let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
        if(routeId.includes(id)){
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
          load: false,
          moduleType: 'chaxun',
          choseYear: this.$route.query.choseYear
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
    cellClick(row, column, cell, event) {
      this.idType = row.id ? row.id : "";
      // status    daiban    yiban   banjie    待办已办办结状态
      if( this.bank_countersignature.bdlx == '3' ){
        if (row.orderType == "非跨行" && row.status == 'daiban') {
          this.handleOpenPage("/signquoteWaitFkhDispatch", this.idType,row.status);
        }else if (row.orderType == "非跨行" && row.status == 'yiban') {
          this.handleOpenPage("/signquoteFinishFkhDispatch", this.idType);
        } else if (row.orderType == "非跨行" && row.status == 'banjie') {
          this.handleOpenPage("/signquoteOverFkhDispatch", this.idType);
        } else if (row.orderType == "跨行请示"  && row.status == 'daiban') {
          this.handleOpenPage("/signquoteWaitKhQshDispatch", this.idType,row.status);
        }  else if (row.orderType == "跨行请示"  && row.status == 'yiban') {
          this.handleOpenPage("/signquoteFinishKhQshDispatch", this.idType);
        }  else if (row.orderType == "跨行请示"  && row.status == 'banjie') {
          this.handleOpenPage("/signquoteOverKhQshDispatch", this.idType);
        } else if (row.orderType == "跨行审批"  && row.status == 'daiban') {
          this.handleOpenPage("/signquoteWaitKhSphDispatch", this.idType,row.status);
        } else if (row.orderType == "跨行审批"  && row.status == 'yiban') {
          this.handleOpenPage("/signquoteFinishKhSphDispatch", this.idType);
        } else if (row.orderType == "跨行审批"  && row.status == 'banjie') {
          this.handleOpenPage("/signquoteOverKhSphDispatch", this.idType);
        } else if (row.orderType == "实物"  && row.status == 'daiban') {
          this.handleOpenPage("/signquoteWaitEntityDispatch", this.idType,row.status);
        }else if (row.orderType == "实物"  && row.status == 'yiban') {
          this.handleOpenPage("/signquoteFinishEntityDispatch", this.idType);
        }else if (row.orderType == "实物"  && row.status == 'banjie') {
          this.handleOpenPage("/signquoteOverEntityDispatch", this.idType);
        }
      }else if(this.bank_countersignature.bdlx == '1'){
        if(row.orderType == "跨行单会签" && row.status == 'daiban'){
            this.handleOpenPage("/huiQianKhWaitDispatch", this.idType,row.status);
        }else if(row.orderType == "跨行单会签" && row.status == 'yiban'){
            this.handleOpenPage("/huiqianKhFinishDispatch", this.idType);
        }else if(row.orderType == "跨行单会签" && row.status == 'banjie'){
            this.handleOpenPage("/huiqianKhOverDispatch", this.idType);
        }else if(row.orderType == "本行单会签" && row.status == 'daiban'){
            this.handleOpenPage("/huiQianFkhWaitDispatch", this.idType,row.status);
        }else if(row.orderType == "本行单会签" && row.status == 'yiban'){
            this.handleOpenPage("/huiqianFkhFinishDispatch", this.idType);
        }else if(row.orderType == "本行单会签" && row.status == 'banjie'){
            this.handleOpenPage("/huiqianFkhOverDispatch", this.idType);
        }
      }else if(this.bank_countersignature.bdlx == '2'){
        // this.handleOpenPage("/xiebanOverQbDispatch", this.idType);
        if(row.status == 'daiban'){
            this.handleOpenPage("/xiebanWaitQbDispatch", this.idType,row.status);
        }else if(row.status == 'yiban'){
            this.handleOpenPage("/xiebanFinishQbDispatch", this.idType);
        }else if(row.status == 'banjie'){
            this.handleOpenPage("/xiebanOverQbDispatch", this.idType);
        }
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
      if(!this.draftTime){
        this.bank_countersignature.draftTimeStart = "";
        this.bank_countersignature.draftTimeEnd = "";
      }
      this.tableData = [];
      this.initData();
    },
    resetForm() {
      this.draftTime= "";
      this.bank_countersignature.function = "queryQianbaoAll";
      this.bank_countersignature.draftTimeStart = "";
      this.bank_countersignature.draftTimeEnd = "";
      
      this.bank_countersignature.sendSecretaryTimeStart = "";
      this.bank_countersignature.sendSecretaryTimeEnd = "";
      this.bank_countersignature.officeCheckTimeStart = "";
      this.bank_countersignature.officeCheckTimeTimeEnd = "";

      this.bank_countersignature.documentNo = "〔"+year+"〕";
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

      this.tableData = [];
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.tableData = [];
      // this.initData();
    },
    // 单位选择
    getTreeData(n) {
      let obj = {};
      let name = "";
      this.offenUse = false;
      this.dialogTypeNow = this.dialogType=n;
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
          let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||''
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
          if(res.message == "Loading"){
            this.loadingTree = true;
          }else{
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
      if (val=="") {
        this.defaultYear();
      } else {
        this.bank_countersignature.documentNo = '〔'+ val +'〕'
      }
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.bank_countersignature.documentNo = '〔'+ openTimeYear +'〕'
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
    if(sessionStorage.getItem('QBLIST')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('QBLIST')))
      if(this.bank_countersignature.draftTimeStart&&this.bank_countersignature.draftTimeEnd){
        this.draftTime=[this.bank_countersignature.draftTimeStart,this.bank_countersignature.draftTimeEnd]
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
        }})
    this.initData();
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
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

.arrowup{
  text-align: center;
}

/deep/ .el-radio {
    width: 70px;
}
.mt20 {
    margin-top: 10px;
}
/deep/ .bank_dispach_content>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 6px !important;
}
</style>
