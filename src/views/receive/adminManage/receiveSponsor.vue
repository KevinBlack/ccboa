<template>
  <div class="receive">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm mt20"
      :class="{mtdown:down}"
    >
      <el-row>
        <el-col :span="4" class="dispatchcswhlshwh">
          <el-form-item label="机构名称">
            <select-org-or-dept @select="selectOrg" :disabled="!isGly">
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择"
                v-model="unitName"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="流程状态">
            <el-select v-model="bank_countersignature.curNodeCode" style="width:100%;">
              <el-option value="-1" label="流转中"></el-option>
              <el-option value="800" label="已办结"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
          <el-form-item label="收文日期">
            <div class="block">
              <el-date-picker
                @change="timeChange"
                v-model="ruleForm.searchTime"
                type="daterange"
                align="left"
                :clearable="false"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题" prop="title">
            <el-input v-model="bank_countersignature.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收文字号" prop="documentCode">
            <el-input v-model="bank_countersignature.documentCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align:center;">
        <el-col>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button><!-- <el-button type="danger" class="deleteButton_gly" @click="deleteLot">删除</el-button> -->
          <el-button type="danger" class="deleteButton_gly" @click="deleteLot">删除</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <m-table
        size="medium"
        :isSelection="true"
        @select="tableSelect"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        :isIndexPage="true"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :state="bank_countersignature.state"
        @cellClick="cellClick"
        @handleCurrentChange="handleCurrentChange"
        @tableRowClassName="tableRowClassName"
        @handleSizeChange="handleSizeChange"
        v-loading="tableLoading"
        :default-sort="sortDate"
      ></m-table>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
// import treeCofig from "@/components/tree/tree-fawen";
import dateFormate from "@/util/filters.js";
import selectOrgOrDept from "components/select/selectOrgOrDept";

const finshData = [
  { label: "收文日期", prop: "RECEIVETIME", align: "center" ,width:"145" },
  { label: "收文字号", prop: "DOCUMENTCODE", align: "center",width:"200"  },
  {
    label: "是否督办",
    prop: "ISSUPERVISE",
    align: "center",
    width:"70",
    formatter(row) {
      return row.ISSUPERVISE == 1 ? "是" : "否";
    }
  },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"150" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center" ,width:"120" },
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center",width:"80"}
];
const banjiehData = [
  { label: "收文日期", prop: "RECEIVETIME", align: "center" ,width:"145" },
  { label: "收文字号", prop: "DOCUMENTCODE", align: "center" ,width:"200" },
  {
    label: "是否督办",
    prop: "ISSUPERVISE",
    align: "center",
    width:"70",
    formatter(row) {
      return row.ISSUPERVISE == 1 ? "是" : "否";
    }
  },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"150" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center",width:"120"}
];
const firstData = [
  { label: "收文日期", prop: "receiveTime", align: "center" ,width:"145" },
  { label: "收文字号", prop: "documentCode", align: "center" ,width:"200"},
  {
    label: "是否督办",
    prop: "isSupervise",
    align: "center",
    width:"80",
    formatter(row) {
      return row.isSupervise == 1 ? "是" : "否";
    }
  },
  { label: "标题", prop: "title", align: "left",minwidth:"150"},
  { label: "当前处理人", prop: "curUser", align: "center",width:"80" },
  { label: "当前环节", prop: "curNodeName", align: "center",width:"120"}
];
const year = new Date().getFullYear();
export default {
  name: "ReceiveSponsor",
  components: {
    mTable,
    selectOrgOrDept
    //treeCofig,
  },
  data() {
    return {
      yearList:[],
      isGly:false,
      unitName1: "",
      unitId1: "",
      unitName2: "",
      unitId2: "",
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      bank_countersignature: {
        choseYear:"",
        function: "sysReceiveDocHelpPage",
        tplbsnid: "SWSW_XB,SWSWCT_XB,DZSW_XB",
        state: 0,
        title: "",
        documentCode: "〔"+year+"〕",
        startDate: "",
        endDate: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        unitId: ""
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
      tableData: [],
      ruleForm: {
        documentNo: "", //收文日期
        documentCode: "", //收文字号
        title: "", //标题
        undertakeOrgName: "", //承办部门
        receiveVersion: "",
        searchTime: ""
      },
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      treeData: [], //树数据
      singelCheckF: true, // 单选true 多选为false
      tableLoading: false,
      dialogState: false,
      seletOptionsData: [], //弹窗下拉框数据
      dialogTit: "", // 弹框标题
      dialogType: "", //弹窗类型
      canTab: false, //标示是否左右三列布局
      dialogTypeNow: "", //当前弹窗类型
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableCols: firstData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      tableSelectList:[],
      deletIds:"",
    };
  },
  methods: {
    selectYear(val) {
      this.bank_countersignature.choseYear = val;
      if (val != '') {
        this.bank_countersignature.documentCode = "〔"+this.bank_countersignature.choseYear+"〕"
      }else{
        this.bank_countersignature.documentCode = "〔"+year+"〕"
      }
      // this.$router.push({
      //   query: {
      //     choseYear: val
      //   }
      // })
    },
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName, this.unitId);
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manger.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName, this.unitId);
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
      this.bank_countersignature.unitName = this.unitName;
      this.bank_countersignature.unitId = this.unitId;
      this.unitName2= this.unitName;
      this.unitId2= this.unitId;
      sessionStorage.setItem('page_sw',JSON.stringify(this.bank_countersignature));
      if (this.bank_countersignature.state == "0") {
        Object.assign(this.bank_countersignature, {
          function: "sysReceiveDocHelpPage"
        });
        this.$post
          .postData(
            "sysReceiveDocHelpPage",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          })
          .catch(err => {});
      } else {
        Object.assign(this.bank_countersignature, { function: "getWFTask" });
        this.$post
          .postData(
            "getWFTask",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.swglgg
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.bank_countersignature.totalCount =
              (res.data && res.data.total) || 0;
            this.tableData.forEach(item => {
              item.ISSUPERVISE = item.ISSUPERVISE ? "是" : "否";
              if (item.RECEIVETIME) {
                item.RECEIVETIME = dateFormate.date(
                  Date.parse(item.RECEIVETIME)
                );
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
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
      this.pagination.page = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData();
    },
    tableRowClassName() {},
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
          names = names.join(";");
          this.transIds = ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "chen":
            this.fromdata.undertakeDeptName = names;
            this.fromdata.undertakeDeptId = ids;
            this.chenCheckData = this.checkData;
            break;
          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }
      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeDeptName") {
          this.fromdata.undertakeDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "assistDeptName") {
          this.fromdata.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
    },
    //请求部门树数据
    getTreeData(n) {
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "chen":
          name = "承办部门";
          clearName = "undertakeDeptName";
          !this.fromdata.receiveVersion || this.fromdata.receiveVersion === 1
            ? (this.singelCheckF = true)
            : "";
          break;
        case "xie":
          name = "协办部门";
          clearName = "assistDeptName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      // if (n == "chen") {
      //   this.getChenTreeData();
      //   return;
      // }
      this.$post
        .postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_mainXiao),
          this.fwTranHuiId
        )
        .then(res => {
          console.log(JSON.stringify(res.data));
          that.treeData = (res && res.data) || [];
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (this.ruleForm.searchTime[0]) {
        this.bank_countersignature.startDate = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[0])
        );
        this.bank_countersignature.endDate = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[1])
        );
      } else {
        this.bank_countersignature.startDate = "";
        this.bank_countersignature.endDate = "";
      }
    },
    handleTabsClick(tab, event) {
      this.tableData = [];
      this.bank_countersignature.totalCount = 0;
      if (tab.index == "1") {
        this.isEnd = true;
      } else {
        this.isEnd = false;
      }
      if (tab.index == "0") {
        this.tableCols = firstData;
      } else if (tab.index == "3") {
        this.tableCols = banjiehData;
      } else {
        this.tableCols = finshData;
      }
      this.bank_countersignature.state = tab.index;
      this.initData();
    },
    cellClick(row, column, cell, event) {
      let readType;
      let idType;
      if (this.bank_countersignature.state == 0) {
        readType = row.readFlag ? row.readFlag : "";
        idType = row.id ? row.id : "";
      } else {
        readType = row.READFLAG ? row.READFLAG : "";
        idType = row.ID ? row.ID : "";
      }
      //if(this.bank_countersignature.state == 2 || this.bank_countersignature.state == 3 || row.status == "已办" ||  row.status == "办结"){
      if (
        this.bank_countersignature.state == 2 ||
        this.bank_countersignature.state == 3
      ) {
        const routeData = this.$router.resolve({
          path: "/receiveSponsorReadonly",
          query: {
            id: idType,
            readFlag: readType,
            unitId:this.unitId,
            choseYear: this.$route.query.choseYear
          }
        });
        window.open(routeData.href, "_blank");
      } else if (
        this.bank_countersignature.state == 0 ||
        this.bank_countersignature.state == 1
      ) {
        if (this.bank_countersignature.state == 0) {
          // if(row.status == "已办"){
          const routeData = this.$router.resolve({
            path: "/sponsorDetail",
            query: {
              id: idType,
              readFlag: readType,
              unitId:this.unitId,
              choseYear: this.$route.query.choseYear
            }
          });
          window.open(routeData.href, "_blank");
          // }else{
          //   const routeData = this.$router.resolve({
          //     path: "/receiveSponsorDetail",
          //     query: {
          //       id: idType,
          //       readFlag:readType
          //     }
          //   });
          //   window.open(routeData.href, "_blank");
          // }
        } else {
          const routeData = this.$router.resolve({
            path: "/receiveSponsorDetail",
            query: {
              id: idType,
              readFlag: readType,
              unitId:this.unitId,
              choseYear: this.$route.query.choseYear
            }
          });
          window.open(routeData.href, "_blank");
        }
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
    tableSelect(rows, row){
      this.tableSelectList=[];
      this.deletIds="";
      if(rows && rows.length>0){
        rows.map(item => {
          this.tableSelectList.push(item.id);
        });
        this.deletIds = this.tableSelectList.join(",");
      }
    },
    deleteLot(){
      if(this.tableSelectList.length==0){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请先选择要删除的表单！",
          duration: 1500
        });
      }else{
        this.$confirm("是否确认删除？", "提示", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              let httpobj={
                function:'deleteHelpByManager',
                ids:this.deletIds,
                unitName:this.bank_countersignature.unitName,
                unitId:this.bank_countersignature.unitId
              };
              this.$post.postData("deleteHelpByManager", JSON.stringify(httpobj), this.$businessCode.swgl)
                .then(res=>{
                  if(res&& res.success){
                    this.tableSelectList=[];
                    this.deletIds="";
                    this.initData();
                    this.$message({
                      type: "success",
                      showClose: true,
                      offset: 400,
                      message: "删除成功！",
                      duration: 1500
                    });
                  }else{
                    this.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: res.message,
                      duration: 1500
                    });
                  }
                })
            }
          }
        });
      }
    },
    resetForm(formName) {
      this.bank_countersignature.choseYear = "",
      //  this.$refs.ruleForm.resetFields();
      this.ruleForm.searchTime = "";
      this.bank_countersignature.startDate = "";
      this.bank_countersignature.endDate = "";
      this.bank_countersignature.title = "";
      this.bank_countersignature.documentCode = "〔"+year+"〕";
      this.bank_countersignature.curNodeCode = "";
      this.bank_countersignature.receive_type = "全部";
      this.unitName = JSON.parse(
        localStorage.getItem("userInfo")
      ).shortUnitName;
      this.unitName = this.unitName1;
      this.unitId = this.unitId1;
      this.initData();
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
    this.routeYear();
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
    this.isGly = isGlyId();
    if(sessionStorage.getItem('page_sw')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('page_sw')));
      this.unitName = this.bank_countersignature.unitName;
      this.unitName1=this.bank_countersignature.unitName;
      this.unitId = this.bank_countersignature.unitId;
      this.unitId1 =this.bank_countersignature.unitId;
      if(this.bank_countersignature.startTime && this.bank_countersignature.endTime){
        this.ruleForm.searchTime=[this.bank_countersignature.startTime,this.bank_countersignature.endTime]
      }
      this.pagination={
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }else{
      this.$api.setting.organization
        .getTree({
          unitClass: 1,
          unitCode: "1"
        })
        .then(res => {
          this.unitName = res.data[0].unitName || "";
          this.unitName1 = res.data[0].unitName || "";
          this.unitId = res.data[0].unitCode || "";
          this.unitId1 = res.data[0].unitCode || "";
          this.initData();
        });
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
.mt20 {
  padding: 20px;
  position: relative;
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
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
</style>
<style>
.receive .el-date-editor {
  width: 100% !important;
}
</style>
