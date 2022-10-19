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
                    @change="draftTimeChange()"
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
              <el-form-item label="签报字号" prop="title">
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
            <el-row>
              <el-col :span="8">
              <el-form-item label="退回日期">
                <div class="block">
                  <el-date-picker
                    @change="backTimeChange()"
                    v-model="backTime"
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
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="制发单位">
                  <el-input v-model="bank_countersignature.orgName" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="getTreeData('hui')">选择</el-button>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="拟稿部门">
                  <el-input v-model="bank_countersignature.draftDepartmentName" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="getTreeData('nigaobm')">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="padding-top:25px;">
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
      :titleWords="titleWords"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="bank_countersignature"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :checkOrg="checkOrg"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";

const finshData = [
  { label: "退回日期", prop: "backTime", align: "center" },
  { label: "拟稿部门", prop: "draftDepartmentName", align: "center" },
  { label: "签报字号", prop: "documentNo", align: "center" },
  { label: "退文标题", prop: "title", align: "center" },
  { label: "退文原因", prop: "backExplain", align: "center" }
];
const year = new Date().getFullYear();
export default {
  name: "Swthqkcx",
  components: {
    mTable,
    treeCofig
  },
  data() {
    return {
      checkOrg:'',
      treeTradeCode: "", //完成并发送  树  拆
      // 制法单位  
      // undertakeDeptIdData: { function: "unitTreeAll", "openSup":true,"openCurr":true,"treeCofig":true,"openEqual":true,"openSub":true },
      undertakeDeptIdData: {
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
      // 拟稿部门
      // receiveOrgIdData: { function: "unitTreeAll", openSubDept: true },
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
     bank_countersignature: {
        function: "queryQianbaoBack",
        state: 1,
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0,
        choseYear: "",
        draftTimeStart:"",
        draftTimeEnd:"",
        documentNo:"〔"+year+"〕",
        title:"",
        backTimeStart:"",
        backTimeEnd:"",
        orgId: "",
        draftDepartmentId:""
      },
      yearList: [],
      draftTime: "",
      backTime: "",
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
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0
      },
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
      titleWords: "",
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false
    };
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("签报退回查询表",".el-table");
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
          "queryQianbaoBack",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.qbgl
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
    draftTimeChange() {
      if (this.draftTime && this.draftTime[0]) {
        this.bank_countersignature.draftTimeStart = dateFormate.date(
          Date.parse(this.draftTime[0])
        );
        this.bank_countersignature.draftTimeEnd = dateFormate.date(
          Date.parse(this.draftTime[1])
        );
      }else{
        this.bank_countersignature.draftTimeStart = ""
        this.bank_countersignature.draftTimeEnd = ""
      }
    },
    backTimeChange() {
      if (this.backTime && this.backTime[0]) {
        this.bank_countersignature.backTimeStart = dateFormate.date(
          Date.parse(this.backTime[0])
        );
        this.bank_countersignature.backTimeEnd = dateFormate.date(
          Date.parse(this.backTime[1])
        );
      }else{
        this.bank_countersignature.backTimeStart = ""
        this.bank_countersignature.backTimeEnd = ""
      }
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
      if (row.backType == "跨行退文") { 
        if(row.multiTenancyId == "CN014"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatch",
              query: {
                id: row.id,
                khState:"2",
                moduleType: 'chaxun' ,   //审批行
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
        if(row.multiTenancyId == "CN009"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatch",
              query: {
                id: row.id,
                khState:"1",
                moduleType: 'chaxun',    //请示行
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
      }
      if (row.backType == "本行退文") {
        if(row.multiTenancyId == "CN002"){
            const routeData = this.$router.resolve({
              path: "/tuiwenfeikhDispatch",
              query: {
                id: row.id,
                moduleType: 'chaxun' ,
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
        if(row.multiTenancyId == "CN009"){
            const routeData = this.$router.resolve({
              path: "/tuiwenkhDispatch",
              query: {
                id: row.id,
                khState:"1",
                moduleType: 'chaxun' ,   //请示行
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
        }
        
      }
      // if (row.backType == "跨行退文") {
      //   const routeData = this.$router.resolve({
      //     path: "/tuiwenkhDispatch",
      //     query: {
      //       id: row.id,
      //       load: false
      //     }
      //   });
      //   window.open(routeData.href, "_blank");
      // }
      // if (row.backType == "本行退文") {
      //   const routeData = this.$router.resolve({
      //     path: "/tuiwenfeikhDispatch",
      //     query: {
      //       id: row.id,
      //       load: false
      //     }
      //   });
      //   window.open(routeData.href, "_blank");
      // }

      // if (!row.backType) {
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
      this.bank_countersignature.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    resetForm(formName) {
      this.draftTime= "";
      this.backTime= "";

      this.bank_countersignature.function = "queryQianbaoBack";
      this.bank_countersignature.draftTimeStart = "";
      this.bank_countersignature.draftTimeEnd = "";
      this.bank_countersignature.documentNo = "〔"+year+"〕";
      this.bank_countersignature.title = "";
      this.bank_countersignature.orgId = "";
      this.bank_countersignature.draftDepartmentId = "";
      
      this.bank_countersignature.orgName = "";
      this.bank_countersignature.draftDepartmentName = "";
      this.bank_countersignature.backTimeStart = "";
      this.bank_countersignature.backTimeEnd = "";
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
      //this.$refs[formName].resetFields();
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
        case "hui":
          //this.bank_main
          name = "制发单位";
          obj = Object.assign(obj, this.undertakeDeptIdData);
          clearName = "orgName";
          this.titleWords = '选择单位';
          break;
        case "nigaobm":
          obj = Object.assign(obj, this.receiveOrgIdData);
          name = "拟稿部门";
          this.titleWords = '选择部门';
          clearName = "draftDepartmentName";
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
          if(res.message == "Loading"){
            this.loadingTree = true;
          }else{
            this.loadingTree = false;
          }
          that.treeData = (res && res.data) || [];
          that.treeData.map((m,n)=>{
            that.treeData[0].disabled = true;
          })
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
          case "hui":
            this.bank_countersignature.orgName = names.join("");
            this.bank_countersignature.orgId = ids.join("");
            this.chenCheckData = this.checkData;
            break;
          case "nigaobm":
            this.bank_countersignature.draftDepartmentName = names.join("");
            this.bank_countersignature.draftDepartmentId = ids.join("");
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
      switch (type) { 
        case "hui":
          // this.checkIds = this.bank_countersignature.orgId||[];
          this.checkIds = this.bank_countersignature.orgId
            ? this.bank_countersignature.orgId.split(";")
            : [];
          this.checkData = this.chenCheckData;
          break;
        case "nigaobm":
          // this.checkIds = this.bank_countersignature.draftDepartmentId||[];
          this.checkIds = this.bank_countersignature.draftDepartmentId
            ? this.bank_countersignature.draftDepartmentId.split(";")
            : [];
          this.checkData = this.laiCheckData;
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
.mt20 {
    margin-top: 10px;
}
/deep/ .bank_dispach_content>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 6px !important;
}
</style>
