<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="3"></el-tab-pane>
      <el-tab-pane label="未阅" name="0"></el-tab-pane>
      <el-tab-pane label="已阅" name="1"></el-tab-pane>
      <el-tab-pane label="办结" name="2"></el-tab-pane>
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
              <el-col :span="8">
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
                <el-form-item label="传阅日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange()"
                      v-model="ruleForm.searchTime"
                      type="daterange"
                      :clearable="false"
                      align="right"
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
                  <el-input v-model="bank_countersignature.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收文字号" prop="documentNo">
                  <el-input v-model="bank_countersignature.documentCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-col class="arrowup">
                  <el-button type="primary" @click="search">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col style="margin: 10px 0;">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :state="(parseInt(bank_countersignature.state)+1)"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @cellClick="cellClick"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
const otherData = [
  { label: "传阅日期", prop: "createTime", align: "center",width:"145" },
  { label: "收文字号", prop: "documentCode", align: "center",with:"200"},
  { label: "标题", prop: "title", align: "left",}
];

export default {
  name: "Circularize",
  components: {
    mTable,
  },
  data() {
    return {
      yearList:[],
      bank_countersignature: {
        choseYear:"",
        function: "selectByPageCY",
        state: 0,
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0,
        documentCode:'〔〕',
        title:'',
        startTime:'',
        endTime:'',
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
        searchTime:""
      },
      tableLoading: false,
      activeName: sessionStorage.getItem('tab_sw')||"0",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
    };
  },
  methods: {
    selectYear(val) {
      this.bank_countersignature.choseYear = val;
      // this.$router.push({
      //   query: {
      //     choseYear: val
      //   }
      // }) 
    },
    search(){
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.initData();
    },
    initData() {
      this.$router.push({
        query: {
          choseYear: this.bank_countersignature.choseYear
        }
      })
      sessionStorage.setItem('page_sw',JSON.stringify(this.bank_countersignature));
      this.$post
        .postData(
          "selectByPageCY",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data.rows;

          // if(this.bank_countersignature.state == 0){
          //   for(let i =0;i<this.tableData.length;i++){
          //     this.tableData[i].readFlag = 0;
          //   }
          // }
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
        this.bank_countersignature.startTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      }
    },
    handleTabsClick(tab, event) {
      this.tableData=[];
      this.bank_countersignature.totalCount =0;
      this.bank_countersignature.page=1;
      this.pagination.page = 1;
      this.bank_countersignature.state = tab.name;
      sessionStorage.setItem('tab_sw',tab.name);
      this.initData();
      if(tab.index != 0){
        this.bank_countersignature.choseYear = "";
        this.routeYear()
      }
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
      this.pagination.page = this.bank_countersignature.page = 1
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      if(this.bank_countersignature.state == '3'){
        if(row.isEnd == 0){
          if(row.isFinish == 0){
           this.state = this.bank_countersignature.state = 0;
          }else{
            this.state = this.bank_countersignature.state = 2;
          }
        }else{
          this.state = this.bank_countersignature.state = 1;
        }
      }
      this.$post
        .postData(
          "initCYCurUserDeptInfo",
          JSON.stringify({
            function: "initCYCurUserDeptInfo",
            curUserId: row.curUserId
          }),
          this.$businessCode.swgl
        )
        .then(res => {
            const routeData = this.$router.resolve({
              path: "/reCircularizeDispatch",
              query: {
                id: row.id,
                mainDocId: row.mainDocId,
                multiTenancyId: row.multiTenancyId,
                state:this.bank_countersignature.state,
                readFlag:row.readFlag,
                choseYear: this.$route.query.choseYear
              }
            });
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
            window.open(routeData.href, "_blank");
        })
    },
    resetForm(formName) {
      this.bank_countersignature.choseYear = "",
      this.bank_countersignature.title='';
      this.bank_countersignature.documentCode='';
      this.bank_countersignature.startTime='';
      this.bank_countersignature.endTime='';
      this.ruleForm.searchTime='';
      this.routeYear();
      this.tableData = [];
    },
    routeYear(){
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
    },
  },
  created() {
    this.$post
        .postData(
          "selTableYear",
          JSON.stringify({ function: "selTableYear" }),
          this.$businessCode.swgl
        ).then(res => {
          if(res){
            this.yearList = res.data
          }
      })
    if(sessionStorage.getItem('page_sw')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('page_sw')));
      if(this.bank_countersignature.startTime && this.bank_countersignature.endTime){
        this.ruleForm.searchTime=[this.bank_countersignature.startTime,this.bank_countersignature.endTime]
      }
      this.pagination={
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }
    if(sessionStorage.getItem('tab_sw')){
      this.activeName=sessionStorage.getItem('tab_sw');
    }
    this.initData();
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
