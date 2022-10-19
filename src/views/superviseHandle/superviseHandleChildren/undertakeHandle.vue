<template>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-row class="mtJ20">
      <el-col v-if="activeName == 'tabs-all'">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          v-if="state==0"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="登记日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange($event)"
                    v-model="ruleForm.searchTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    style="width:300px"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="立项依据" prop="summary">
                <el-input v-model="bank_countersignature.projectBase" @input="changeV($event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="事由提要" prop="summary">
                <el-input v-model="bank_countersignature.summary" @input="changeV($event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="编号" prop="doucumentNum">
                <el-input v-model="bank_countersignature.doucumentNum" @input="changeV($event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-col style="text-align:right;" class="arrowup">
                <el-button type="primary" @click="initData('2')">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <!-- <el-col class="mt20end">
        <router-link
          tag="a"
          target="_blank"
          :to="{path:'singleSuperviseHandleAdd'}"
          class="btn-writeEnDspc"
        >起草单项督查办</router-link>
      </el-col> -->
      <el-col style="margin: 10px 0;" :class="{'is10':bank_countersignature.state>0||bank_db.state>0}">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :state="bank_db.state"
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
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import viewDraft from "@/minixs/viewDraft";

const finshData = [
  { label: "登记日期", prop: "TMS", align: "center" ,width:"100"},
  { label: "编号", prop: "DOCUMENTCODE", align: "center",width:"300"},
  { label: "立项依据", prop: "PROJECTBASE", align: "center",width:"100" },
  { label: "事由提要", prop: "TITLE", align: "left",minwidth:"50%"},
  { label: "当前环节", prop: "CURNODENAME", align: "center",width:"100" },
  { label: "当前处理人 ", prop: "AVYEXCTRNM", align: "center",width:"100" },
  { label: "联系人 ", prop: "DRAFTUSER", align: "center",width:"100" },
];
const otherData = [
  { label: "登记日期", prop: "registDate", align: "center",width:"100" },
  { label: "编号", prop: "doucumentNum", align: "center",width:"300" },
  { label: "立项依据", prop: "projectBase", align: "center",width:"100" },
  { label: "事由提要", prop: "summary", align: "left",minwidth:"50%"},
  { label: "承办部门", prop: "undertakeOrgName", align: "center",width:"100" },
  { label: "当前环节", prop: "curNodeName", align: "center",width:"100" },
  { label: "当前处理人 ", prop: "curUser", align: "center",width:"100" },
  { label: "联系人 ", prop: "contact", align: "center",width:"100" },
  { label: "办理状态 ", prop: "handleStatus", align: "center",width:"100" },
];
const finshData1 = [
  { label: "登记日期", prop: "TMS", align: "center",width:"100" },
  { label: "编号", prop: "DOCUMENTCODE", align: "center", width:"300"},
  { label: "立项依据", prop: "PROJECTBASE", align: "center",width:"200" },
  { label: "事由提要", prop: "TITLE", align: "left", minwidth:"50%" },
];

export default {
  name: "DispatchFile",
  components: {
    mTable,
  },
  mixins: [viewDraft],
  data() {
    return {
      bank_countersignature: {
        function: "selUndertakeByPage",
        state: 0, //全部0 待办1  已办2  办结3
        doucumentNum:'',
        startRegistDate:'',
        endRegistDate:'',
        projectBase: '',
        page: 1, //当前页数   
        limit: 20, //每页条数
        totalCount:0
      },
      bank_db:{
        function: "getWFTask",
        state: 1, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20 ,//每页条数
        tplbsnid:'DXZXDB_CB,PLZXDB_CB', 
        totalCount:0,
      },
      iaAll:true,//全部才会显示流转状态
      down: false,
      state:1,
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
        searchTime:'',
      },
      tableLoading: false,
      activeName: sessionStorage.getItem('ZXDBACTIVE')||"tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      baowenzd:this.$businessCode.zxdb,
      ggJyx:this.$businessCode.zxdbgg,
    };
  },
  created() {
      if(sessionStorage.getItem('ZXDB')){
      if(sessionStorage.getItem('ZXDBACTIVE')){
        if(sessionStorage.getItem('ZXDBACTIVE') == 'tabs-all'){
          this.activeName = 'tabs-all';
          this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('ZXDB')))
          this.pagination={
            page: this.bank_countersignature.page, //第几页
            total: this.bank_countersignature.totalCount, //共有条数
            limit: this.bank_countersignature.limit, //每页条数
          }
          this.initData();
        }else{
          this.bank_db = Object.assign(this.bank_db,JSON.parse(sessionStorage.getItem('ZXDB')))
          this.pagination={
            page: this.bank_db.page, //第几页
            total: this.bank_db.totalCount, //共有条数
            limit: this.bank_db.limit, //每页条数
          }
          this.initDbData();
        }
      }else{
        this.bank_db = Object.assign(this.bank_db,JSON.parse(sessionStorage.getItem('ZXDB')))
        this.pagination={
          page: this.bank_db.page, //第几页
          total: this.bank_db.totalCount, //共有条数
          limit: this.bank_db.limit, //每页条数
        }
        this.initDbData();
      }
    }else{
      this.initDbData('1');
    }
    
    
  },
  methods: {
    
    // 页面初始化加载数据
    initData(type) {
      if(type == '2'){
        this.bank_countersignature.page = 1;
        this.pagination.page = 1;
      }
      this.iaAll=true; 
      this.tableCols = otherData
      this.state = this.bank_countersignature.state = witchState(this.activeName)
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_countersignature));
      this.$post
        .postData(
          "selUndertakeByPage",
          JSON.stringify(this.bank_countersignature),
          this.baowenzd
        )
        .then(res => {
          console.log("res",res.data.rows.isUndertake === 0)
          if(!res.data.rows.isUndertake) {
            res.data.rows.isUndertake = '单项督办'
          }
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initDbData(tabindex) {
      this.tableCols = finshData
      if(tabindex == '3'){
        this.tableCols = finshData1
      }
      this.state = this.bank_db.state = witchState(this.activeName)
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_db));
      this.$post
        .postData(
          "getWFTask",
          JSON.stringify(this.bank_db),
          this.ggJyx
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if(this.ruleForm.searchTime[0]){
        this.bank_countersignature.startRegistDate = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.bank_countersignature.endRegistDate = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      }
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      sessionStorage.setItem('ZXDBACTIVE',tab.name);
      this.resetForm();
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.state = tab.index;
      if (tab.name == "tabs-all") {
          this.iaAll=true; 
          this.bank_countersignature.state = tab.index;
          this.bank_countersignature.page = 1;
          this.initData();
      }else{
          this.bank_db.state = tab.index;
          this.bank_db.page = 1;
          this.initDbData(tab.index)
          this.iaAll=false;
      }
      this.tableLoading = false;
    },
    changeV(e){
      this.$forceUpdate();
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val;
      if(this.tableCols === finshData){
        this.bank_db.page = val;
        this.tableData = [];
        this.initDbData();
      }else{
        this.bank_countersignature.page = val;  
        this.tableData = [];
        this.initData();
      }
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = val;
      this.pagination.page = this.bank_db.page = this.bank_countersignature.page = 1
      this.bank_db.limit = val;
      this.pagination.limit = val;
      if(this.tableCols == finshData){
        this.tableData = [];
        this.initDbData();
      }else{
        this.tableData = [];
        this.initData();
      }
    },
    cellClick(row, column, cell, event) {
      let id = row.id?row.id:row.ID;
      let readFlag = row.READFLAG ? row.READFLAG : '';
      let state = this.state;
      let pcsAvyId = row.pcsAvyId?row.pcsAvyId:row.PCSAVYID;
      if(this.state == 0){
        if(row.orderStatus == "已办")state =2
        if(row.orderStatus == "办结")state =3
        if(row.orderStatus == "待办"){
          let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
          if(routeId.includes(row.id)){
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
      }
      if (this.state == '1'){
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
            path: "/undertakeDetail",
            query: {
              id: id,
              state:state,
              readFlag:readFlag
            }
          });
          window.open(routeData.href, "_blank");
    },
    resetForm() {
      this.bank_countersignature.startRegistDate='';
      this.bank_countersignature.endRegistDate='';
      this.bank_countersignature.projectBase='';
      this.bank_countersignature.summary='';
      this.bank_countersignature.doucumentNum='';
      this.ruleForm.searchTime="";
      this.$forceUpdate();
    },
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header{
  margin: 0 0 7px;
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
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>

