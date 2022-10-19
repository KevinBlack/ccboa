<template>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all">
      <optionalfield></optionalfield>
    </el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-dialog
        :visible.sync="showChosDept"
        v-dialogDrag
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
          <el-button type="primary" @click="handleChosDept()">确 定</el-button>
        </div>
      </el-dialog>
    <el-row class="mtJ20">
      <el-col v-if="iaAll">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          v-if="bank_countersignature.state==0"
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
              <el-form-item label="立项依据" prop="title">
                <el-input v-model="bank_countersignature.projectBase" @input="changeV($event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="标题" prop="documentNo">
                <el-input v-model="bank_countersignature.summary" @input="changeV($event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="编号" prop="doucumentNum">
                  <el-input v-model="bank_countersignature.doucumentNum" @input="changeV($event)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" style="text-align:right;">
              <el-col class="arrowup">
                <el-button type="primary" @click="initData('1')">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form> 
      </el-col>
      <el-col class="mt20end" v-if="isAddShow&&bank_countersignature.state == 1">
         <el-button
            type="primary"
            size="small"  
            @click="handleBankDispach"
          >起草批量督查办</el-button>
        <!-- <router-link
          tag="a"
          target="_blank"
          to="batchSuperviseAdd"
          class="btn-writeEnDspc"
        >起草批量督查办</router-link> -->
        <!-- <el-button
            class="btn-writeEnDspc"
            @click="handleBankDispach"
          >起草批量督查办</el-button> -->
      </el-col>
      <el-col style="margin: 10px 0;" :class="{'is10':(!isAddShow&&bank_countersignature.state == 1)||bank_countersignature.state>1}">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :state="bank_countersignature.state"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import dateFormate from "@/util/filters.js";
import viewDraft from "@/minixs/viewDraft";

const finshData = [
  { label: "登记日期", prop: "TMS", align: "center",width:"100" },
  { label: "编号", prop: "DOCUMENTCODE", align: "center",width:"300"},
  { label: "立项依据", prop: "PROJECTBASE", align: "center",width:"100" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"50%" },
  { label: "当前环节", prop: "CURNODENAME", align: "center",width:"100" },
  { label: "当前处理人 ", prop: "AVYEXCTRNM", align: "center",width:"100" },
  { label: "联系人 ", prop: "DRAFTUSER", align: "center",width:"100" },
];
const otherData = [
   { label: "登记日期", prop: "registDate", align: "center",width:"100" },
  { label: "编号", prop: "doucumentNum", align: "center",width:"300"},
  { label: "立项依据", prop: "projectBase", align: "center",width:"100" },
  { label: "标题", prop: "summary", align: "left",minwidth:"50%" },
   { label: "当前环节", prop: "curNodeName", align: "center",width:"100" },
  { label: "当前处理人 ", prop: "curUser", align: "center",width:"100" },
  { label: "联系人 ", prop: "contact", align: "center",width:"100" },
  { label: "当前状态", prop: "handleStatus", align: "center",width:"100" },
];
const finshData1 = [
  { label: "登记日期", prop: "TMS", align: "center",width:"100" },
  { label: "编号", prop: "DOCUMENTCODE", align: "center", width:"300"},
  { label: "立项依据", prop: "PROJECTBASE", align: "center",width:"100" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"50%" },
];


export default {
  name: "DispatchFile",
  components: {
    mTable,
    optionalfield
  },
  mixins: [viewDraft],
  data() {
    return {
      showChosDept: false,
      deptArr:[],
      bank_chosDept: {
        function: "",
        deptName: ""
      },
      curhumanId: "",
       bank_countersignature: {
        function: "getWFTask",
        tplbsnid:'PLZXDB', 
        projectBase:"",
        startRegistDate:"",
        doucumentNum:'',
        endRegistDate:"",
        summary:'〔〕',
        state: 1, //全部0 待办1  已办2  办结3selectBatchByPage
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
      ruleForm: {
        searchTime:"",
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
        limit: 20, //每页条数
      },
      tabFlag:1,
      isAddShow:true,
      baowenzd:this.$businessCode.zxdb,
      ggJyx:this.$businessCode.zxdbgg,
      state:'',//督办单状态
    };
  },
  created() {
    if(sessionStorage.getItem('ZXDB')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('ZXDB')))
    }
    this.pagination={
      page: this.bank_countersignature.page, //第几页
      total: this.bank_countersignature.totalCount, //共有条数
      limit: this.bank_countersignature.limit, //每页条数
    }
    // if(sessionStorage.getItem('ZXDBACTIVE')){
    //   this.activeName = sessionStorage.getItem('ZXDBACTIVE')
    // }
    this.initData();
    this.isHasAdd();
    this.$post
      .postData(
        "checkPostMoreUnit",
        JSON.stringify({function:"checkPostMoreUnit",type:'dubandxG'}),
        this.$businessCode.zxdb
      )
      .then(res => {
        this.deptArr =  res.data;
        // if(transArr.length>0) {
        //   transArr.forEach(element => {
        //     if(element.firstUnitName != element.currUnitName) {
        //       element.currUnitName = element.firstUnitName+'/'+ element.currUnitName
        //     }
        //   });
        // }
      })
      .catch(err => {
        console.log(err);
      }); 
    
  },
  methods: {
    handleBankDispach(val) {
      if (this.deptArr.length > 1) {
        this.showChosDept = true;
      } else {
        let human_Id = this.deptArr[0].humanId||'';
        this.$post
          .postData(
            "switchUserInfo",
            JSON.stringify({
              function: "switchUserInfo",
              human_Id:human_Id
            }),
            this.$businessCode.zxdbgg
          )
          .then(res => {
            this.showChosDept = false;
            const routeData = this.$router.resolve({
              path: "/batchSuperviseAdd"
            });
            window.open(routeData.href, "_blank");
          });
      }
    },
    handleChosDept() {
      if(this.bank_chosDept.deptName == ''){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择起草部门",
          duration: 1000
        });
        return;      
      }
      let newHref = "";
      this.$post
        .postData(
          "switchUserInfo",
          JSON.stringify({
            function: "switchUserInfo",
            human_Id: this.bank_chosDept.deptName
          }),
          this.$businessCode.zxdbgg
        )
        .then(res => {
          this.showChosDept = false;
          const routeData = this.$router.resolve({
            path: "/batchSuperviseAdd"
          });
          window.open(routeData.href, "_blank");
        });
    },
    // 页面初始化加载数据
    initData(type) {
      if(type == '1'){
        this.bank_countersignature.page = 1;
        this.pagination.page = 1;
      }
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_countersignature));
      if(this.bank_countersignature.state == "0"){
        this.tableCols = otherData
        Object.assign(this.bank_countersignature,{function:"selectBatchByPage"})
        this.$post
        .postData(
          "selectBatchByPage",
          JSON.stringify(this.bank_countersignature),
          this.baowenzd
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
      }else{
        if(this.bank_countersignature.state=="3"){
          this.tableCols = finshData1;
        }else{
          this.tableCols = finshData;
        }
        Object.assign(this.bank_countersignature,{function:"getWFTask"})
        this.$post
        .postData(
          "getWFTask",
          JSON.stringify(this.bank_countersignature),
          this.ggJyx
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
      }
      
    },
    isHasAdd(){
      this.$post
      .postData(
        "getDraftAuthBatch",
        JSON.stringify({function:"getDraftAuthBatch"}),
        this.$businessCode.zxdb
      )
      .then(res => {
        if(res.success==false)this.isAddShow=false
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
      this.resetForm();
      this.tableData=[];
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.bank_countersignature.state = tab.index;
      this.iaAll=true; 
      this.bank_countersignature.totalCount =0;
      this.initData();
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },
    changeV(e){
      this.$forceUpdate();
    },
    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      let readFlag;
      let idType;
      let pcsAvyId;
      if(this.bank_countersignature.state == 0){
        readFlag = row.readFlag ? row.readFlag : '';
        idType = row.id ? row.id : '';
        pcsAvyId = row.pcsAvyId ? row.pcsAvyId : '';
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
      }else if (this.bank_countersignature.state == '1'){
        readFlag = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
        pcsAvyId = row.PCSAVYID ? row.PCSAVYID : '';
        let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
        if(routeId.includes(row.ID)){
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "已经打开了该页面!",
            duration: 1500,
          })
          return;
        }
      }else{
        readFlag = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
        pcsAvyId = row.PCSAVYID ? row.PCSAVYID : '';
      }
      let state = this.bank_countersignature.state;
      if(this.bank_countersignature.state == 0){
        if(row.orderStatus == "已办")state =2
        if(row.orderStatus == "办结")state =3
      }
      // this.$post
      //   .postData(
      //     "initCurUserDeptInfo",
      //     JSON.stringify({
      //       function: "initCurUserDeptInfo",
      //       pcsAvyId: pcsAvyId
      //     }),
      //     this.$businessCode.zxdbgg
      //   )
      //   .then(res => {
            
      //   })
        if(this.bank_countersignature.state == 2 || this.bank_countersignature.state == 3 || row.orderStatus == "已办" ||  row.orderStatus == "办结"){
         
          const routeData = this.$router.resolve({
            path: "/batchSuperviseAdd",
            query: {
              id: idType,
              readFlag:readFlag,
              state:state
            }
          });
          window.open(routeData.href, "_blank");
      }else{
        const routeData = this.$router.resolve({
          path: "/batchSuperviseAdd",
          query: {
            id: idType,
            readFlag:readFlag
          }
        });
        window.open(routeData.href, "_blank");
      }
      
      
    },
    timeChange() {
      if(this.ruleForm.searchTime[0]){
        this.bank_countersignature.startRegistDate = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.bank_countersignature.endRegistDate = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      }
    },
    resetForm(formName) {
      this.bank_countersignature.startRegistDate="";
      this.bank_countersignature.endRegistDate="";
      this.bank_countersignature.projectBase="";
      this.bank_countersignature.summary="";
      this.bank_countersignature.doucumentNum='';
      this.ruleForm.searchTime="";
    }
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
