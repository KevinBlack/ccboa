 <template>
  <div>
    <el-tabs v-model="activeName">
      <el-row class="mtJ20">
        <el-col>
          <el-form
            :model="ruleForm" 
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20 transition_wrap"
            :class="{mtdown:down}"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="登记时间">
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
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="立项依据" prop="projectBase">
                  <el-input v-model="bank_countersignature.projectBase"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-col v-if="!down" class="arrowup">
                  <el-button type="primary" @click="initData('1')">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                  <el-button type="info" size="small" @click="arrow()">
                    <i class="el-icon-arrow-down el-icon--left"></i> 展开
                  </el-button>
                </el-col>
              </el-col>
            </el-row>
            <div v-if="down" class="clearfix">
              <el-row>
              <el-col :span="6">
                <el-form-item label="流转状态">
                  <el-select
                      v-model="bank_countersignature.wfStatus"
                      style="width:100%"
                    >
                      <el-option label="全部" value="0"></el-option>
                      <el-option label="流转" value="1"></el-option>
                      <el-option label="办结" value="2"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="行名">
                  <el-input value="中国建设银行"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="事由提要">
                  <el-input v-model="bank_countersignature.summary"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="编号">
                  <el-input v-model="bank_countersignature.doucumentNum"></el-input>
                </el-form-item>
              </el-col>
                <el-col>
                  <el-row class="center">
                    <el-button type="primary" @click="initData('1')">搜索</el-button>
                    <el-button type="primary" @click="resetForm">重置</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="down">
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-up el-icon--left"></i> 收起
                </el-button>
              </el-col>
              </el-row>
              
            </div>
          </el-form>
        </el-col>
        <el-col style="margin: 0;">
          <el-button style="text-align:right;float:right;margin:10px 0;" v-preventClick size="small" @click="exportExc" class="mrg-b-20">导 出</el-button>
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :state="bank_countersignature.state"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            @cellClick="cellClick"
            @cellStyle="cellStyle"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
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
import exportTable from "@/minixs/exportTable";
const finshData = [
  //READFLAG
  // { label: "到达时间", prop: "TMS", align: "center" },
  { label: "登记时间", prop: "registDate", align: "center" },
  { label: "编号", prop: "doucumentNum", align: "center",width:"300" },
  { label: "立项依据", prop: "projectBase", align: "center" },
  { label: "事由提要", prop: "summary", align: "center" },
  { label: "督办人", prop: "curUser", align: "center" },
  { label: "办理状态", prop: "handleStatus", align: "center"}
];
export default {
  name: "ReceiveFile",
  components: {
    mTable
  },
  data() {
    return {
      fwTranId: this.$businessCode.swgl,
      isAddShow:true,
      bank_countersignature: {
        function: "selSuperviseBatchAll",
        startRegistDate:'',
        endRegistDate:'',
        projectBase:'',
        wfStatus:'',
        summary: '',
        doucumentNum:'〔〕',
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0
      },
      searchParams:{
        receive_type:'全部'
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
        searchTime: "",
      },
      tableLoading: false,
      activeName: "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: true,
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      }
    };
  },
  created() {
    if(sessionStorage.getItem('ZXDB')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('ZXDB')))
      if(this.bank_countersignature.startRegistDate && this.bank_countersignature.endRegistDate){
        this.ruleForm.searchTime=[this.bank_countersignature.startRegistDate,this.bank_countersignature.endRegistDate]
      }
      this.pagination={
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
      this.initData()
    }
    else{
      this.bank_countersignature.doucumentNum="〔"+new Date().getFullYear()+"〕"
      this.tableData = []
    }
    
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("批量督办查询表",".el-table");
    },
    initData(type) {
      if(type == 1){
        this.bank_countersignature.page = 1;
        this.pagination.page = 1;
      }
      Object.assign(this.bank_countersignature,{function:"selSuperviseBatchAll"})
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_countersignature));
          this.$post
          .postData(
            "selSuperviseBatchAll",
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
      if(this.down == false){
        this.searchParams.receive_type = '全部';
        this.bank_countersignature.receive_type = '全部';
      }
    },
    timeChange() {
      if(this.ruleForm.searchTime[0]){
        this.bank_countersignature.startRegistDate = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.bank_countersignature.endRegistDate = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
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
    cellStyle(rows,column,rowIndex,columnIndex){
      console.log(rows)
    },
    cellClick(row, column, cell, event) {
      let state= 3;
      if(row.wfStatus == '已办'){
        state = 2;
      }else if(row.wfStatus == '待办'){
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
        state = 1;
      }else if(row.wfStatus == '办结'){
        state = 3;
      }
      const routeData = this.$router.resolve({
        path: "/batchSuperviseAdd",
        query: {
          id: row.id,
          state:state,
          readFlag:1,
        }
      });
      window.open(routeData.href, "_blank");
    },
    resetForm() {
        this.bank_countersignature.startRegistDate="";
        this.bank_countersignature.endRegistDate="";
        this.bank_countersignature.projectBase="";
        this.bank_countersignature.wfStatus="";
        this.bank_countersignature.summary="";
        this.bank_countersignature.doucumentNum="〔"+new Date().getFullYear()+"〕";
        this.ruleForm.searchTime="";
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
.el-table .warning-row {
  color:red;
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
.arrowup{
  padding-left: 20px;
  margin-bottom: 20px;
}
.down {
  position: absolute;
  bottom:-71px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}
.clearfix{
  clear: both;
  padding-bottom: 71px;
}
.transition_wrap {
  transition: all 0.3s ease-in-out;
}
.el-range-editor.el-input__inner{
  width:110%;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>
