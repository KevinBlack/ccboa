<template>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all">
      <optionalfield></optionalfield>
    </el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-row class="mtJ20">
      <el-col v-show="iaAll">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
          v-if="bank_countersignature.state==0"
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
                    style="width:100%"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="立项依据" prop="projectBase">
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
            <el-col :span="4"  style="text-align:right;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="initData('1')">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col class="mt20end" v-if="isAddShow&&bank_countersignature.state == 1">
        <el-button
          @click="handleBankDispach"
          type="primary"
          size="small"
        >起草单项督查办</el-button>
        <!-- <router-link
          tag="a"
          target="_blank"
          :to="{path:'singleSuperviseHandleAdd'}"
          class="btn-writeEnDspc"
        >起草单项督查办</router-link> -->
      </el-col>
      <el-col style="margin: 10px 0;" :class="{'is10':(!isAddShow&&bank_countersignature.state == 1)||bank_countersignature.state>1}">
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
      <el-dialog
        :visible.sync="showChosDept"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        v-dialogDrag
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
  { label: "事由提要", prop: "TITLE", align: "left",minwidth:"50%"  },
  { label: "当前环节", prop: "CURNODENAME", align: "center",width:"100" },
  { label: "当前处理人 ", prop: "AVYEXCTRNM", align: "center",width:"100" },
  { label: "联系人 ", prop: "DRAFTUSER", align: "center",width:"100" },
];
const finshData1 = [
  { label: "登记日期", prop: "TMS", align: "center",width:"100" },
  { label: "编号", prop: "DOCUMENTCODE", align: "center",width:"300"  },
  { label: "立项依据", prop: "PROJECTBASE", align: "center",width:"100" },
  { label: "事由提要", prop: "TITLE", align: "left",minwidth:"40%" },
];
const otherData = [
  { label: "登记日期", prop: "registDate", align: "center",width:"100" },
  { label: "编号", prop: "doucumentNum", align: "center",width:"200" },
  { label: "立项依据", prop: "projectBase", align: "center",width:"100" },
  { label: "事由提要", prop: "summary", align: "left", minwidth:"100%"  },
  { label: "承办部门", prop: "undertakeOrgName", align: "center",width:"100" },
  { label: "当前环节", prop: "curNodeName", align: "center",width:"100" },
  { label: "当前处理人 ", prop: "curUser", align: "center",width:"100" },
  { label: "联系人 ", prop: "contact", align: "center",width:"100" },
  { label: "办理状态 ", prop: "handleStatus", align: "center",width:"100" },
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
      bank_countersignature: {
        function: "getWFTask",
        tplbsnid:'DXZX_DB', 
        state: 1, //全部0 待办1  已办2  办结3
        doucumentNum:'',
        startRegistDate:'',
        endRegistDate:'',
        projectBase: '',
        page: 1, //当前页数   
        limit: 20, //每页条数
        totalCount:0
      },
      isAddShow:true,
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
        searchTime: "",
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
      ggJyx:this.$businessCode.zxdbgg,//公共交易线
      baowenzd:this.$businessCode.zxdb,
      showChosDept: false,
      deptArr:[],
      bank_chosDept: {
        function: "",
        deptName: ""
      },
      curhumanId: "",
    };
  },
  mounted() {
    document.title="秘书工作"
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
    this.initData();
    this.isHasAdd();
     this.$post
      .postData(
        "checkPostMoreUnit",
        JSON.stringify({function:"checkPostMoreUnit",type:'dubandxG'}),
        this.$businessCode.zxdb
      )
      .then(res => {
        let transArr =  res.data;
        this.deptArr = res.data;
      })
      .catch(err => {
        console.log(err);
      }); 
  },
  methods: {
    isHasAdd(){
      this.$post
      .postData(
        "getDraftAuthDx",
        JSON.stringify({function:"getDraftAuthDx"}),
        this.$businessCode.zxdb
      )
      .then(res => {
        if(res.success==false)this.isAddShow=false
      })
      .catch(err => {
        console.log(err);
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
        Object.assign(this.bank_countersignature,{function:"selectByPage"})
        this.$post
        .postData(
          "selectByPage",
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
              path: "/singleSuperviseHandleAdd"
            });
            window.open(routeData.href, "_blank");
          });
      }
    },
    changeV(e){
      this.$forceUpdate();
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
      this.tableData=[];
      this.bank_countersignature.state = tab.index;
      this.iaAll=true; 
      this.bank_countersignature.totalCount =0;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.initData();
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
            path: "/singleSuperviseHandleAdd"
          });
          window.open(routeData.href, "_blank");
        });
    },
    cellClick(row, column, cell, event) {
      let readFlag;
      let idType;
      let pcsAvyId = row.pcsAvyId?row.pcsAvyId:row.PCSAVYID;
      if(this.bank_countersignature.state == 0){
        readFlag = row.readFlag ? row.readFlag : '';
        idType = row.id ? row.id : '';
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
        }else if(row.orderStatus == "已办"){
          this.bank_countersignature.state = 2
        }else{
          this.bank_countersignature.state = 3
        }
      }else if (this.bank_countersignature.state == '1'){
        readFlag = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
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
      }
      if(this.bank_countersignature.state == 2 || this.bank_countersignature.state == 3 || row.orderStatus == "已办" ||  row.orderStatus == "办结"){
          const routeData = this.$router.resolve({
            path: "/singleSuperviseHandleBJYB",
            query: {
              id: idType,
              readFlag:readFlag,
              state:this.bank_countersignature.state
            }
          });
          window.open(routeData.href, "_blank");
      }else{
        const routeData = this.$router.resolve({
          path: "/singleSuperviseHandleAdd",
          query: {
            id: idType,
            readFlag:readFlag
          }
        });
        window.open(routeData.href, "_blank");
      }
          
    },
    submitForm(formName) {
      /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
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

    //修改记录   el-row:margin-top: -20px;
    //mt20 padding 修改
    //el-table m-table 10px改成
    //.el-tabs__header    margin: 0 0 7px;
    
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
.mtJ20>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>

