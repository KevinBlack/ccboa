<template>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="未阅" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="已阅" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-row class="mtJ20">
      <el-col v-show="isAll">
        <el-form
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="登记日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange($event)"
                    v-model="searchTime"
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
            <el-col :span="6">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="initData('1')">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
          </div>

          <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="arrow()">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>
        </el-form>
      </el-col>
      <el-col style="margin: 20px 0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :state="(parseInt(bank_countersignature.state)+1)"
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
const otherData = [
  { label: "传阅时间", prop: "createTime", align: "center",width:"100"},
  { label: "立项依据", prop: "projectBase", align: "center",width:"100"},
  { label: "督办编号", prop: "doucumentNum", align: "center",width:"300" },
  { label: "事由提要", prop: "summary", align: "left",minwidth:"50%"},
  { label: "联系人", prop: "contact", align: "center",width:"100"},
  { label: "传阅类型", prop: "documentTypeName", align: "center",width:"100"},
];

export default {
  name: "DispatchFile",
  components: {
    mTable,
  },
  mixins: [viewDraft],
  data() {
    return {
      isAll:true,
      bank_countersignature: {
        function: "selectByPageCY",
        state: 0,
        startTime: "",
        endTime: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0
      },
      iaAll:true,//全部才会显示流转状态
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
      searchTime: "",
      tableLoading: false,
      activeName: sessionStorage.getItem('ZXDBACTIVE')||"tabs-done",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20, //每页条数
      },
    };
  },
  created() {
    if(sessionStorage.getItem('ZXDB')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('ZXDB')));
      if(this.bank_countersignature.startTime && this.bank_countersignature.endTime){
        this.searchTime=[this.bank_countersignature.startTime,this.bank_countersignature.endTime]
      }
      this.pagination={
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }
    if(sessionStorage.getItem('ZXDBACTIVE')){
      this.activeName=sessionStorage.getItem('ZXDBACTIVE');
    }
    this.initData();
  },
  methods: {
    timeChange() {
      if(this.searchTime[0]){
        this.bank_countersignature.startTime = dateFormate.date(Date.parse(this.searchTime[0]));
        this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.searchTime[1]));
      }
    },
    // 页面初始化加载数据
    initData(type) {
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_countersignature));
      if(type == '1'){
        this.bank_countersignature.page = 1; 
        this.pagination.page = 1; 
      }
      
      this.$post
        .postData(
          "selectByPageCY",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.zxdb
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
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      sessionStorage.setItem('ZXDBACTIVE',tab.name);
      //this.tableData = [];
      this.tableLoading = true;
      if(tab.label =="全部"){
        this.bank_countersignature.state = 4;
      }else if(tab.label =="未阅"){
        this.bank_countersignature.state = 0;
      }else if(tab.label =="已阅"){
        this.bank_countersignature.state = 1;
      }else if(tab.label =="办结"){
        this.bank_countersignature.state = 2;
      }
      this.initData();
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      const openType = row.documentType == "DXZXDB_CB" ? 'cb':'dx';
      if(this.activeName =="tabs-all"){
        this.state = this.bank_countersignature.state = 4;
        if(row.isEnd == 0){
          if(row.isFinish == 0){
           this.state = this.bank_countersignature.state = 0;
          }else{
            this.state = this.bank_countersignature.state = 2;
          }
        }else{
          this.state = this.bank_countersignature.state = 1;
        }
      }else if(this.activeName =="tabs-done"){
        this.state = this.bank_countersignature.state = 0;
      }else if(this.activeName =="tabs-wait"){
        this.state = this.bank_countersignature.state = 1;
      }else if(this.activeName =="tabs-end"){
        this.state = this.bank_countersignature.state = 2;
      }
      this.$post
        .postData(
          "initCYCurUserDeptInfo",
          JSON.stringify({
            function: "initCYCurUserDeptInfo",
            curUserId: row.curUserId
          }),
          this.$businessCode.zxdb
        )
        .then(res => {
          if (this.state == '0'){
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
          const routeData = this.$router.resolve({
            path: "/circularizeDetail",
            query: {
              id: row.id,
              state:this.bank_countersignature.state,
              mainDocId: row.mainDocId,
              multiTenancyId: row.multiTenancyId,
              readFlag:row.readFlag,
              openType:openType
            }
          });
          window.open(routeData.href, "_blank");
        })
    },
    resetForm(formName) {
      this.bank_countersignature.startTime='';
      this.bank_countersignature.endTime='';
      this.searchTime='';
    }
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
.mt20 {
  padding: 20px 0 0 0;
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
.mtJ20>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>
