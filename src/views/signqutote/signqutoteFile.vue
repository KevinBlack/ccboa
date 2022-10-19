<template>
  <!-- 签报列表 -->
  <el-tabs v-model="activeName" @tab-click="handleTabsClick" v-cloak>
    <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>

    <el-row  style="margin-top: -20px;">
      <el-col v-if="getTableOrderAll.state == 0">
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
                  v-model="ruleForm.choseYear"
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
                    @change="timeChange"
                    v-model="ruleForm.searchTime"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="getTableOrderAll.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签报字号" prop="qianbaoCode">
                <el-input v-model="getTableOrderAll.qianbaoCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="text-align:center;margin-bottom:10px;">
              <!-- :md="24" :lg="10" :xl="6" -->
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="initData('str')">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <!-- <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>-->
              </el-col>
            </el-col>
          </el-row>
          <!-- <div v-if="down">
            <el-row>
              <el-col :span="6">
                <el-form-item label="拟稿日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange(events)"
                      v-model="ruleForm.endTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="主办部门" prop="hostDepartment">
                  <el-input v-model="ruleForm.hostDepartment" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="公文状态">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="流转"></el-radio>
                  <el-radio label="办结"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发文形式">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="电子"></el-radio>
                  <el-radio label="实物"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发文类型">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="行发文"></el-radio>
                  <el-radio label="部门发文"></el-radio>
                  <el-radio label="党务发文"></el-radio>
                  <el-radio label="会议纪要"></el-radio>
                  <el-radio label="工作简报"></el-radio>
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
            <el-button type="info" size="small" @click="arrow()">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>-->
        </el-form>
      </el-col>

      <el-col v-if="isEnd" class="mt20end">
        <el-button @click="handleBankDispach('1')" size="small" type="primary">起草电子签报</el-button>
        <el-button @click="handleBankDispach('2')" size="small" type="primary">起草实物签报</el-button>
      </el-col>
      <el-col style="margin: 10px 0;" :class="{'is10':(!isEnd&&bank_countersignature.state == 1)||bank_countersignature.state>1}">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :state="bank_countersignature.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
      <!--选择部门-->

      <el-dialog v-dialogDrag 
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="40%"
        :title="qicaoState"
      >
      <!-- :title="type_fw == '1'?'请选择电子签报起草类型':'请选择实物签报起草类型'" -->
        <el-form>
          <el-form-item prop="kuahangType" ref="kuahangType" v-if="kuahangTypeDialog">
            <el-radio v-model="kuahangType" label="0">中国建设银行电子签报处理单(跨行)</el-radio>
            <el-radio v-model="kuahangType" label="1">中国建设银行电子签报处理单(非跨行)</el-radio>
          </el-form-item>
          <el-form-item v-if="deptArrFlag">
            <el-select v-model="bank_chosDept.deptName" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in deptArr"
                :key="item.currUnitName"
                :label="item.currUnitName"
                :value="item.humanId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 定</el-button>
        </div>
      </el-dialog>

      <!-- <el-dialog v-dialogDrag 
        :visible.sync="showChosDept"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        title="选择部门"
      >
        <el-form>
          <el-form-item>
            <el-select v-model="bank_chosDept.deptName" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in deptArr"
                :key="item.currUnitName"
                :label="item.currUnitName"
                :value="item.humanId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showChosDept = false">取 消</el-button>
          <el-button type="primary" @click="handleChosDept(type_fw)">确 定</el-button>
        </div>
      </el-dialog>-->
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import viewDraft from "@/minixs/viewDraft";
// import optionalfield from "components/optionalfield/optionalfield.vue";

const finshData = [
  { label: "拟稿日期", prop: "DRAFTTIME", align: "center"  ,width:"110"},
  { label: "签报字号", prop: "DOCUMENTCODE", align: "left"  ,width:"220"},
  { label: "标题", prop: "TITLE", align: "left" ,minwidth:"40%" },
  { label: "主办部门", prop: "DRAFTDEPARTMENTNAME", align: "center" ,width:"120"},
  { label: "签报类型", prop: "QIANBAOTYPENAME", align: "center" ,width:"80" },
  { label: "签报种类", prop: "ORDERTYPE", align: "center" ,width:"80"}
];
const otherData = [
  { label: "拟稿日期", prop: "DRAFTTIME", align: "center"  ,width:"110"},
  { label: "签报字号", prop: "DOCUMENTCODE", align: "left" ,width:"220" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center" ,width:"120" },
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center"  ,width:"100"},
  { label: "拟稿人", prop: "DRAFTUSER", align: "center" ,width:"80"},
  { label: "签报类型", prop: "QIANBAOTYPENAME", align: "center" ,width:"80"},
  { label: "签报种类", prop: "ORDERTYPE", align: "center",width:"80"}
];
const allData = [
  { label: "拟稿日期", prop: "draftTime", align: "center"  ,width:"110"},
  { label: "签报字号", prop: "documentNo", align: "left" ,width:"220" },
  { label: "标题", prop: "title", align: "left" ,minwidth:"40%" },
  { label: "当前环节", prop: "curNodeName", align: "center" ,width:"120"},
  { label: "当前处理人", prop: "currentUser", align: "center" ,width:"100"},
  { label: "拟稿人", prop: "draftUserName", align: "center"  ,width:"80"},
  { label: "签报类型", prop: "qianBaoTypeName", align: "center"  ,width:"80"},
  { label: "签报种类", prop: "orderType", align: "center"  ,width:"80"},
  { label: "办理状态", prop: "orderStatus", align: "center"  ,width:"80"}
];

export default {
  name: "DispatchFile",
  components: {
    mTable
    // optionalfield
  },
  mixins: [viewDraft],
  data() {
    return {
      qicaoState:"请选择电子签报起草类型",
      checkHumanUnitByHumanId: {
        function: "checkHumanUnitByHumanId"
      },
      getTableOrderAll: {
        //全部
        function: "getTableOrderAll",
        state: 0, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
        // tplbsnid: "QB_DZQB,QB_SWQB,QB_KHQBQS,KHQB_SP"
        tplbsnid: "DZQB,SWQB,KHQBQS,KHQB_SP",
        startTime: "",
        endTime: "",
        title: "",
        qianbaoCode: ""
        // DZQB电子签报,DZQB_HQ电子签报会签, SWQB 实物签报,KHQBQS 跨行签报请示,KHQB_SP 跨行签报审批,KHQB_XB 跨行签报协办,KHQB_HQ 跨行签报会签
      },
      bank_countersignature: {
        //待办已办办结
        function: "getWFTaskQB",
        state: 1, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
        // tplbsnid: "QB_DZQB,QB_SWQB,QB_KHQBQS,KHQB_SP",
        // QB_DZQB  电子签报,QB_SWQB  实物签报 ,QB_KHQBQS 跨行签报请示,KHQB_SP  跨行签报审批 ,QB_HQ  会签 ,QB_XB 协办
        tplbsnid: "DZQB,SWQB,KHQBQS,KHQB_SP",
        totalCount: 0
      },
      kuahangType: "1",
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
        qianbaoCode: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        choseYear: "",
        desc: ""
      },
      yearList: [],
      tableLoading: false,
      activeName: sessionStorage.getItem('QBLISTtab')|| "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: true,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: "", //共有条数
        limit: 20, //每页条数
        // page: this.bank_countersignature.page, //第几页
        // total: this.bank_countersignature.totalCount, //共有条数
        // limit: this.bank_countersignature.limit, //每页条数
      },
      dialogVisible: false,

      //已读未读
      readType: false,
      idType: "",
      pcsAvyId: "",

      //选择部门
      deptArr: [],
      deptArrFlag: false, //选择部门显示隐藏
      showChosDept: false,
      bank_chosDept: {
        function: "",
        deptName: ""
      },
      curhumanId: "",
      type_fw: "",

      kuahangTypeDialog: false //起草跨行非跨行选择显示隐藏
    };
  },
  mounted() {
    document.title="签报管理"
  },
  methods: {
    timeChange() {
      //时间获取
      if (this.ruleForm.searchTime && this.ruleForm.searchTime[0]) {
        this.getTableOrderAll.startTime = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[0])
        );
        this.getTableOrderAll.endTime = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[1])
        );
      }else{
        this.getTableOrderAll.startTime = ""
        this.getTableOrderAll.endTime = ""
      }
    },
    resetForm() {
      //重置
      
      this.ruleForm.searchTime = "";
      this.getTableOrderAll.title = "";
      this.getTableOrderAll.qianbaoCode = "";
      //  this.getTableOrderAll.receive_type = '全部';
      this.getTableOrderAll.startTime = "";
      this.getTableOrderAll.endTime = "";
      this.ruleForm = {
        qianbaoCode: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        choseYear: "",
        desc: ""
      }
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.tableData = [];
      //  this.getTableOrderAll.receive_type = '全部';
      //  this.searchParams.receive_type = '全部';
      // this.initData();
    },
    // 页面初始化加载数据
    initData(str) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      this.bank_countersignature.state = this.getTableOrderAll.state = witchState(this.activeName)
      if (this.bank_countersignature.state == "0") {
        sessionStorage.setItem('QBLIST',JSON.stringify(this.getTableOrderAll));
        if (str) {
          this.getTableOrderAll.state = 0; //全部0 待办1  已办2  办结3
          this.getTableOrderAll.page = 1; //当前页数
          // this.getTableOrderAll.limit = 10; //每页条数
          this.pagination.page = 1;
        }

        this.$post
          .postData(
            "getTableOrderAll",
            JSON.stringify(this.getTableOrderAll),
            this.$businessCode.qbgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_countersignature));
        this.$post
          .postData(
            "getWFTaskQB",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.qbgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.bank_countersignature.totalCount = res.data.total;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    arrow() {
      this.down = !this.down;
    },

    // 起草电子
    handleBankDispach(val) {
      this.kuahangTypeDialog = false; //跨行非跨行选择
      this.deptArrFlag = false; //部门下拉
      this.dialogVisible = false; //跨行非跨行 部门选择  整个弹窗

      this.type_fw = val;
      let newHref = "";
      // if (this.deptArr.length > 0) {
      //   this.showChosDept = true;
      //   this.btnTagDispatch(this.type_fw);
      // } else {
      //   this.btnTagDispatch(this.type_fw);
      // }
      if (val == "1") {
        this.qicaoState = '请选择电子签报起草类型'
        this.$post
          .postData(
            "checkHumanUnitByHumanId",
            JSON.stringify(this.checkHumanUnitByHumanId),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res && res.success) {
              // if (res.data == "show") {
              //   this.kuahangTypeDialog = false;
              //   // this.dialogVisible = true;
              // } else {
              //   this.handleOpenPage("/signquoteWaitFkhDispatch");
              // }

              // console.log(res.data, this.deptArr, this.deptArr.length);
              if (res.data != "show" && this.deptArr.length <= 1) {
                // 没有跨行非跨行  没有部门选择 就直接跳转页面
                this.dialogVisible = false;
                this.kuahangTypeDialog = false;
                this.handleOpenPage("/signquoteWaitFkhDispatch");
              } else if (res.data == "show" && this.deptArr.length <= 1) {
                // 有跨行非跨行  没有部门选择 就跨行选择，部门不选择 出弹窗
                this.kuahangTypeDialog = true; //跨行非跨行选择
                this.deptArrFlag = false; //部门下拉
                this.dialogVisible = true; //跨行非跨行 部门选择  整个弹窗
              } else if (this.deptArr.length > 1 && res.data != "show") {
                // 没有跨行非跨行  有部门选择 就跨行不选择，部门选择 出弹窗
                this.qicaoState = '选择部门'
                this.kuahangTypeDialog = false;
                this.deptArrFlag = true;
                this.dialogVisible = true;
              } else {
                // 全部弹出
                this.kuahangTypeDialog = true;
                this.deptArrFlag = true;
                this.dialogVisible = true;
              }
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: "新建失败",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "新建失败",
              duration: 1000
            });
          });
      } else {
        // this.qicaoState = '请选择实物签报起草类型'
        // if (this.deptArr.length > 1) {
        //   this.deptArrFlag = true;
        //   this.dialogVisible = true;
        // } 
        if (this.type_fw == "2" && this.deptArr.length <= 1) {
        // this.qicaoState = '请选择实物签报起草类型'
        // this.deptArrFlag = true;
        //   this.dialogVisible = true;
        // this.dialogVisible = false;
        this.handleOpenPage("/signquoteWaitEntityDispatch");
      }else if (this.type_fw == "2" && this.deptArr.length > 1) {
        this.qicaoState = '请选择起草部门'
        this.deptArrFlag = true;
          this.dialogVisible = true;
        // this.dialogVisible = false;
        // this.handleOpenPage("/signquoteWaitEntityDispatch");
      }
      // else {
      //     this.handleOpenPage("/signquoteWaitEntityDispatch");
      //   }
      }
    },
    handleSave() {
      if (this.deptArr.length > 1 && this.kuahangTypeDialog) {
        //多机构 跨行非跨行
        if (!(this.kuahangType && this.bank_chosDept.deptName)) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择起草部门",
            duration: 1000
          });
          return;
        }
      }
      // if (this.type_fw == "2" && this.deptArr.length <= 1) {
      //   this.qicaoState = '请选择实物签报起草类型'
      //   this.dialogVisible = false;
      //   this.handleOpenPage("/signquoteWaitEntityDispatch");
      // }else if (this.type_fw == "2" && this.deptArr.length > 1) {
      //   this.qicaoState = '请选择起草部门'
      //   this.dialogVisible = false;
      //   this.handleOpenPage("/signquoteWaitEntityDispatch");
      // } else 
      if (
        this.type_fw == "1" &&
        this.kuahangTypeDialog &&
        this.deptArr.length <= 1
      ) {
        this.qicaoState = '请选择电子签报起草类型'
        //点击跳转非跨行页面、跨行请示行页面
        if (this.kuahangType == "1") {
          this.dialogVisible = false;
          this.handleOpenPage("/signquoteWaitFkhDispatch");
        } else if (this.kuahangType == "0") {
          this.dialogVisible = false;
          this.handleOpenPage("/signquoteWaitKhQshDispatch");
        } else {
          this.dialogVisible = false;
          this.$message({
            type: "error",
            message: "请选择要跳转的页面!"
          });
          return;
        }
      } else {
        if (!this.bank_chosDept.deptName) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择起草部门",
            duration: 1000
          });
          return;
        }
        
        this.$post
          .postData(
            "switchUserInfo",
            JSON.stringify({
              function: "switchUserInfo",
              human_Id: this.bank_chosDept.deptName
            }),
            this.$businessCode.ggqbgl
          )
          .then(res => {
            if (res && res.success) {
              if (this.type_fw == "2" && this.deptArr.length > 1) {
                this.qicaoState = '请选择实物签报起草类型'
                this.dialogVisible = false;
                this.handleOpenPage("/signquoteWaitEntityDispatch");
              } else if (this.type_fw == "1" && this.kuahangTypeDialog) {
                this.qicaoState = '请选择电子签报起草类型'
                this.dialogVisible = false;
                //点击跳转非跨行页面、跨行请示行页面
                if (this.kuahangType == "1") {
                  this.dialogVisible = false;
                  this.handleOpenPage("/signquoteWaitFkhDispatch");
                } else if (this.kuahangType == "0") {
                  this.dialogVisible = false;
                  this.handleOpenPage("/signquoteWaitKhQshDispatch");
                } else {
                  this.dialogVisible = false;
                  this.$message({
                    type: "error",
                    message: "请选择要跳转的页面!"
                  });
                  return;
                }
              }else if(this.type_fw == "1" && !this.kuahangTypeDialog){
                this.dialogVisible = false;
                this.handleOpenPage("/signquoteWaitFkhDispatch");
              }
            } 
            // else {
            //   this.dialogVisible = false;
            //   this.$message({
            //     type: "error",
            //     message: "跳转页面失败!"
            //   });
            //   return;
            // }
          })
          .catch(err => {
            this.dialogVisible = false;
            // this.$message({
            //   type: "error",
            //   message: "跳转页面失败!"
            // });
            console.log(err)
            return;
          });
      }
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      this.resetForm();
      sessionStorage.setItem('QBLISTtab',tab.name);
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_countersignature.state = tab.index;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.bank_countersignature.totalCount = 0;

      if (tab.index == "0") {
        this.tableCols = allData;
        this.isEnd = false;
      } else if (tab.index == "1") {
        this.isEnd = true;
        this.tableCols = otherData;
      } else if (tab.index == "3") {
        this.tableCols = finshData;
        this.isEnd = false;
      } else {
        this.tableCols = otherData;
        this.isEnd = false;
      }
      this.bank_countersignature.state = tab.index;
      this.initData();
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      if (this.bank_countersignature.state == "0") {
        this.getTableOrderAll.page = val;
      } else {
        this.bank_countersignature.page = val;
      }
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      if (this.bank_countersignature.state == "0") {
        this.getTableOrderAll.limit = val;
        this.pagination.limit = val;
        this.pagination.page = this.getTableOrderAll.page = 1;
      } else {
        this.bank_countersignature.limit = val;
        this.pagination.limit = val;
        this.pagination.page = this.bank_countersignature.page = 1;
      }
      this.tableData = [];
      this.initData();
    },

    handleOpenPage(path, id, readType,orderStatus) {
      if (this.bank_countersignature.state == "1" || (this.bank_countersignature.state == "0" && orderStatus == "待办")) {
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
          readFlag: readType,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },

    cellClick(row, column, cell, event) {
      if (this.bank_countersignature.state == "0") {
        this.readType = row.readFlag ? row.readFlag : 1;
        this.idType = row.id ? row.id : "";
        this.pcsAvyId = row.pcsAvyId ? row.pcsAvyId : "";
      } else {
        this.readType = row.READFLAG ? row.READFLAG : 0;
        this.idType = row.ID ? row.ID : "";
        this.pcsAvyId = row.PCSAVYID ? row.PCSAVYID : "";
      }

      if (
        this.bank_countersignature.state == "0" ||
        this.bank_countersignature.state == "1"
      ) {
        if (this.bank_countersignature.state == "0") {
              if (row.orderType == "非跨行" && row.orderStatus == "待办") {
                this.handleOpenPage(
                  "/signquoteWaitFkhDispatch",
                  this.idType,
                  this.readType,
                  row.orderStatus
                );
              } else if (
                row.orderType == "非跨行" &&
                row.orderStatus == "已办"
              ) {
                this.handleOpenPage(
                  "/signquoteFinishFkhDispatch",
                  this.idType,
                  this.readType
                );
              } else if (
                row.orderType == "非跨行" &&
                row.orderStatus == "办结"
              ) {
                this.handleOpenPage(
                  "/signquoteOverFkhDispatch",
                  this.idType,
                  this.readType
                );
              } else if (
                row.orderType == "跨行请示" &&
                row.orderStatus == "待办"
              ) {
                this.handleOpenPage(
                  "/signquoteWaitKhQshDispatch",
                  this.idType,
                  this.readType,
                  row.orderStatus
                );
              } else if (
                row.orderType == "跨行请示" &&
                row.orderStatus == "已办"
              ) {
                this.handleOpenPage(
                  "/signquoteFinishKhQshDispatch",
                  this.idType,
                  this.readType
                );
              } else if (
                row.orderType == "跨行请示" &&
                row.orderStatus == "办结"
              ) {
                this.handleOpenPage(
                  "/signquoteOverKhQshDispatch",
                  this.idType,
                  this.readType
                );
              } else if (
                row.orderType == "跨行审批" &&
                row.orderStatus == "待办"
              ) {
                this.handleOpenPage(
                  "/signquoteWaitKhSphDispatch",
                  this.idType,
                  this.readType,
                  row.orderStatus
                );
              } else if (
                row.orderType == "跨行审批" &&
                row.orderStatus == "已办"
              ) {
                this.handleOpenPage(
                  "/signquoteFinishKhSphDispatch",
                  this.idType,
                  this.readType
                );
              } else if (
                row.orderType == "跨行审批" &&
                row.orderStatus == "办结"
              ) {
                this.handleOpenPage(
                  "/signquoteOverKhSphDispatch",
                  this.idType,
                  this.readType
                );
              } else if (row.orderType == "实物" && row.orderStatus == "待办") {
                this.handleOpenPage(
                  "/signquoteWaitEntityDispatch",
                  this.idType,
                  this.readType,
                  row.orderStatus
                );
              } else if (row.orderType == "实物" && row.orderStatus == "已办") {
                this.handleOpenPage(
                  "/signquoteFinishEntityDispatch",
                  this.idType,
                  this.readType
                );
              } else if (row.orderType == "实物" && row.orderStatus == "办结") {
                this.handleOpenPage(
                  "/signquoteOverEntityDispatch",
                  this.idType,
                  this.readType
                );
              }
            }

            if (this.bank_countersignature.state == "1") {
              if (row.ORDERTYPE == "非跨行") {
                this.handleOpenPage(
                  "/signquoteWaitFkhDispatch",
                  this.idType,
                  this.readType
                );
              }
              if (row.ORDERTYPE == "跨行请示") {
                this.handleOpenPage(
                  "/signquoteWaitKhQshDispatch",
                  this.idType,
                  this.readType
                );
              }
              if (row.ORDERTYPE == "跨行审批") {
                this.handleOpenPage(
                  "/signquoteWaitKhSphDispatch",
                  this.idType,
                  this.readType
                );
              }

              if (row.ORDERTYPE == "实物") {
                this.handleOpenPage(
                  "/signquoteWaitEntityDispatch",
                  this.idType,
                  this.readType
                );
              }
            }
        // this.$post
        //   .postData(
        //     "initCurUserDeptInfo",
        //     JSON.stringify({
        //       function: "initCurUserDeptInfo",
        //       pcsAvyId: this.pcsAvyId
        //     }),
        //     this.$businessCode.ggqbgl
        //   )
        //   .then(res => {
        //     //全部
        //     if (this.bank_countersignature.state == "0") {
        //       if (row.orderType == "非跨行" && row.orderStatus == "待办") {
        //         this.handleOpenPage(
        //           "/signquoteWaitFkhDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "非跨行" &&
        //         row.orderStatus == "已办"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteFinishFkhDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "非跨行" &&
        //         row.orderStatus == "办结"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteOverFkhDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "跨行请示" &&
        //         row.orderStatus == "待办"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteWaitKhQshDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "跨行请示" &&
        //         row.orderStatus == "已办"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteFinishKhQshDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "跨行请示" &&
        //         row.orderStatus == "办结"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteOverKhQshDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "跨行审批" &&
        //         row.orderStatus == "待办"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteWaitKhSphDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "跨行审批" &&
        //         row.orderStatus == "已办"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteFinishKhSphDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (
        //         row.orderType == "跨行审批" &&
        //         row.orderStatus == "办结"
        //       ) {
        //         this.handleOpenPage(
        //           "/signquoteOverKhSphDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (row.orderType == "实物" && row.orderStatus == "待办") {
        //         this.handleOpenPage(
        //           "/signquoteWaitEntityDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (row.orderType == "实物" && row.orderStatus == "已办") {
        //         this.handleOpenPage(
        //           "/signquoteFinishEntityDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       } else if (row.orderType == "实物" && row.orderStatus == "办结") {
        //         this.handleOpenPage(
        //           "/signquoteOverEntityDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       }
        //     }

        //     if (this.bank_countersignature.state == "1") {
        //       if (row.ORDERTYPE == "非跨行") {
        //         this.handleOpenPage(
        //           "/signquoteWaitFkhDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       }
        //       if (row.ORDERTYPE == "跨行请示") {
        //         this.handleOpenPage(
        //           "/signquoteWaitKhQshDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       }
        //       if (row.ORDERTYPE == "跨行审批") {
        //         this.handleOpenPage(
        //           "/signquoteWaitKhSphDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       }

        //       if (row.ORDERTYPE == "实物") {
        //         this.handleOpenPage(
        //           "/signquoteWaitEntityDispatch",
        //           this.idType,
        //           this.readType
        //         );
        //       }
        //     }
        //   });
      }

      //已办
      if (this.bank_countersignature.state == "2") {
        if (row.ORDERTYPE == "非跨行") {
          this.handleOpenPage(
            "/signquoteFinishFkhDispatch",
            this.idType,
            this.readType
          );
        }

        if (row.ORDERTYPE == "跨行请示") {
          this.handleOpenPage(
            "/signquoteFinishKhQshDispatch",
            this.idType,
            this.readType
          );
        }
        if (row.ORDERTYPE == "跨行审批") {
          this.handleOpenPage(
            "/signquoteFinishKhSphDispatch",
            this.idType,
            this.readType
          );
        }

        if (row.ORDERTYPE == "实物") {
          this.handleOpenPage(
            "/signquoteFinishEntityDispatch",
            this.idType,
            this.readType
          );
        }
      }

      //办结
      if (this.bank_countersignature.state == "3") {
        if (row.ORDERTYPE == "非跨行") {
          this.handleOpenPage(
            "/signquoteOverFkhDispatch",
            this.idType,
            this.readType
          );
        }

        if (row.ORDERTYPE == "跨行请示") {
          this.handleOpenPage(
            "/signquoteOverKhQshDispatch",
            this.idType,
            this.readType
          );
        }
        if (row.ORDERTYPE == "跨行审批") {
          this.handleOpenPage(
            "/signquoteOverKhSphDispatch",
            this.idType,
            this.readType
          );
        }

        if (row.ORDERTYPE == "实物") {
          this.handleOpenPage(
            "/signquoteOverEntityDispatch",
            this.idType,
            this.readType
          );
        }
      }
    },
    submitForm(formName) {},
    selectYear(val) {
      this.ruleForm.choseYear = val;
    }
  },
  created() {
    this.$router.push({
        query: {
          choseYear: ''
        }
      })
    let transArr =
      (localStorage.getItem("unitInfo") &&
        JSON.parse(localStorage.getItem("unitInfo"))) ||
      [];

    if(transArr.length>0) {
      transArr.forEach(element => {
        if(element.firstUnitName != element.currUnitName) {
          element.currUnitName = element.firstUnitName+'/'+ element.currUnitName
        }
      });
    }
    let userInfo =
      (localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo"))) ||
      "";
    this.curhumanId = userInfo.humanId;
    if (transArr.length > 1) {
      transArr.forEach(element => {
        if (element.unitId == userInfo.unitId) {
          this.deptArr.push(element);
        }
      });
      let curDept = JSON.parse(localStorage.getItem("userInfo")).humanId
      this.deptArr.forEach(element => {
        if(element.humanId == curDept) {
          this.bank_chosDept.deptName = element.humanId
        }
      });
    }
    
    if(sessionStorage.getItem('QBLIST')){
      if(JSON.parse(sessionStorage.getItem('QBLIST')).state == 0){
        this.tableCols = allData;
        this.isEnd = false;
        this.getTableOrderAll = Object.assign(this.getTableOrderAll,JSON.parse(sessionStorage.getItem('QBLIST')))
        this.pagination = {
          page: this.getTableOrderAll.page, //第几页
          total: this.getTableOrderAll.totalCount, //共有条数
          limit: this.getTableOrderAll.limit, //每页条数
        }
      }else{
        this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('QBLIST')))
        this.pagination = {
          page: this.bank_countersignature.page, //第几页
          total: this.bank_countersignature.totalCount, //共有条数
          limit: this.bank_countersignature.limit, //每页条数
        }
      }
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
// .arrowup {
//   padding-left: 20px;
//   margin-bottom: 20px;
// }
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

// .el-table .cell {
//     padding-right: 2px !important;
//     padding-left: 2px !important;
// }
// .el-table th>.cell{
//   padding-right: 2px !important;
//     padding-left: 2px !important;
// }
/deep/.el-table .cell{
  padding: 0px 3px 0 3px !important;
}
</style>
