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
                <el-form-item label="承办时间">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange1"
                      v-model="ruleForm.searchTime1"
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
              <el-col :span="6">
                <el-form-item label="表单类型">
                  <el-select
                      v-model="bank_countersignature.formType"
                      style="width:100%"
                    >
                      <el-option label="非协办单" value="0"></el-option>
                      <el-option label="协办单" value="1"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="行名" prop="projectBase">
                  <el-input value="中国建设银行"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="6"> 
                <el-form-item label="事由提要" prop="projectBase">
                  <el-input v-model="bank_countersignature.summary"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="12">
                <el-form-item label="承办部门" prop="undertakeDeptName">
                  <el-input
                    v-model="bank_countersignature.undertakeDeptName"
                    readonly="readonly"
                    placeholder="请选择"
                  >
                    <el-button slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"> 
                <el-form-item label="办理状态">
                  <el-select
                      v-model="bank_countersignature.handleStatus"
                      style="width:100%"
                    >
                      <el-option label="全部" value="0"></el-option>
                      <el-option label="立项阶段" value="1"></el-option>
                      <el-option label="时限内在办" value="2"></el-option>
                      <el-option label="超时在办" value="3"></el-option>
                      <el-option label="按时反馈" value="4"></el-option>
                      <el-option label="超时反馈" value="5"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="编号" prop="projectBase">
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
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";
import treeCofig from "@/components/tree/tree-fawen";
const finshData = [
  //readFlag
  // { label: "到达时间", prop: "TMS", align: "center" },
  { label: "编号", prop: "doucumentNum", align: "center",width:"300" },
  { label: "立项依据", prop: "projectBase", align: "center" },
  { label: "事由提要", prop: "summary", align: "center" },
  { label: "承办部门", prop: "undertakeOrgName", align: "center" },
  { label: "当前环节", prop: "curNodeName", align: "center" },
  { label: "当前处理人", prop: "curUser", align: "center" },
  { label: "办理期限", prop: "expireDate", align: "center"},
  { label: "办理时长", prop: "finishUseTime", align: "center"},
  { label: "办理状态", prop: "handleStatus", align: "center"},
];
export default {
  name: "ReceiveFile",
  components: {
    mTable,
    treeCofig
  },
  data() {
    return {
      fwTranId: this.$businessCode.swgl,
      isAddShow:true,
      bank_countersignature: {
        function: "selSuperviseAll",
        documentCode:'',
        startRegistDate:'',
        endRegistDate:'',
        startUnderTakeDate:'',
        undertakerOrgIds:"",
        undertakeDeptName:"",
        endUnderTakeDate:'',
        projectBase: '',
        formType:'0',
        wfStatus:'',
        handleStatus:'',
        summary:'',
        doucumentNum:'〔〕',
        page: 1, //当前页数   
        limit: 20, //每页条数
        totalCount:0
      },
      searchParams:{
        receive_type:'全部'
      },
      checkData:[],
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      loadingTree:false,
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      dialogTypeNow: "", //当前弹窗类型
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
        searchTime1: "",
      },
      tableLoading: false,
      activeName: "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: true,
      tableData: [],
      treeTradeCode:"",
      dialogTit:'',
      checkIds:[],
      chenCheckData:[],
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
      if(this.bank_countersignature.startUnderTakeDate && this.bank_countersignature.endUnderTakeDate){
        this.ruleForm.searchTime=[this.bank_countersignature.startUnderTakeDate,this.bank_countersignature.endUnderTakeDate]
      }
      this.pagination={
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
      this.initData()
    }else{
      this.bank_countersignature.doucumentNum="〔"+new Date().getFullYear()+"〕"
      this.treeTradeCode = this.$businessCode.zxdbgg;  //人员树交易线
      this.tableData = [];
    }
    
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("单项督办查询表",".el-table");
    },
    initData(type) {
      // if(this.ruleForm.searchTime == ''){
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "请选择查询时间",
      //     duration: 1000
      //   });
      //   return
      // }
      if(type == 1){
        this.bank_countersignature.page = 1;
        this.pagination.page = 1;
      }
      Object.assign(this.bank_countersignature,{function:"selSuperviseAll"})
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_countersignature));
          this.$post
          .postData(
            "selSuperviseAll",
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
    timeChange1() {
      if(this.ruleForm.searchTime1[0]){
        this.bank_countersignature.startUnderTakeDate = dateFormate.date(Date.parse(this.ruleForm.searchTime1[0]));
        this.bank_countersignature.endUnderTakeDate = dateFormate.date(Date.parse(this.ruleForm.searchTime1[1]));
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
      if(row.superviseType == 0&&state>=2){
        const routeData = this.$router.resolve({
          path: "/singleSuperviseHandleBJYB",
          query: {
            id: row.id,
            readFlag:1,
          }
        });
        window.open(routeData.href, "_blank");
      }
      if(row.superviseType == 0&&state<2){
        const routeData = this.$router.resolve({
          path: "/singleSuperviseHandleAdd",
          query: {
            id: row.id,
            readFlag:1,
          }
        });
        window.open(routeData.href, "_blank");
      }
      if(row.superviseType == 1){
        const routeData = this.$router.resolve({
          path: "/undertakeDetail",
          query: {
            id: row.id,
            state:state,
            readFlag:1,
            searchType:"search"
          }
        });
        window.open(routeData.href, "_blank");
      }
      if(row.superviseType == 2){
        const routeData = this.$router.resolve({
          path: "/jointlyDetail",
          query: {
            id: row.id,
            state:state,
            readFlag:1,
          }
        });
        window.open(routeData.href, "_blank");
      }
    },
    resetForm() {
        this.bank_countersignature.documentCode='';
        this.bank_countersignature.startRegistDate='';
        this.bank_countersignature.endRegistDate='';
        this.bank_countersignature.startUnderTakeDate='';
        this.bank_countersignature.endUnderTakeDate='';
        this.bank_countersignature.projectBase='';
        this.bank_countersignature.wfStatus='';
        this.bank_countersignature.handleStatus='';
        this.bank_countersignature.summary='';
        this.bank_countersignature.doucumentNum="〔"+new Date().getFullYear()+"〕"
        this.bank_countersignature.formType='';
        this.bank_countersignature.undertakeDeptName='';
        this.bank_countersignature.undertakerOrgIds='';
        this.ruleForm.searchTime="";
        this.ruleForm.searchTime1="";
        this.checkData=[];
        this.checkIds=[];
        sessionStorage.clear();

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
          //this.bank_main
          name = "承办部门";
          obj = Object.assign(obj, this.undertakeDeptIdData);
          clearName = "undertakeDeptName";
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
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify({
            function: "unitTreeByFirst",
            flag: false
          }),
          this.$businessCode.zxdbgg
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
        });
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
        }

        switch (dtype) {
          case "chen":
            this.bank_countersignature.undertakeDeptName = names.join("");
            this.bank_countersignature.undertakerOrgIds = ids.join("");
            this.chenCheckData = this.checkData;
            break;
          case "shou":
            this.ruleForm.receiveOrgName = names.join("");
            this.ruleForm.receiveOrgId = ids.join("");
            this.laiCheckData = this.checkData;
            break;
          case "lai":
            this.ruleForm.sendOrgName = names.join("");
            this.ruleForm.sendOrgId = ids.join("");
            this.shouCheckData = this.checkData;
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
       newA[0] = [this.bank_countersignature.undertakerOrgIds];
      switch (type) {
        case "chen":
          this.checkIds = newA;
          break;
        case "shou":
          this.checkIds = this.bank_countersignature.receiveOrgId||[];
          break;
        case "lai":
          this.checkIds = this.bank_countersignature.sendOrgId||[];
          break;
      }
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
  bottom: -71px;
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
