<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm mt20"
      :class="{mtdown:down}"
    >
      <el-row>
        <el-col :span="6" class="dispatchcswhlshwh">
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
          <el-form-item label="退文日期">
            <div class="block">
              <el-date-picker
                @change="timeChange"
                v-model="ruleForm.searchTime"
                type="daterange"
                align="left"
                unlink-panels
                :clearable="false"
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
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="收文字号" prop="documentCode">
            <el-input v-model="bank_countersignature.documentCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align:center;">
        <el-col>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
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
        @handleSizeChange="handleSizeChange"
        v-loading="tableLoading"
        :default-sort="sortDate"
      ></m-table>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import selectOrgOrDept from "components/select/selectOrgOrDept";

const finshData = [
  { label: "退文日期", prop: "backTime", align: "center",width:"145"},
  { label: "来文单位", prop: "sendOrgName", align: "center",width:"200"},
  { label: "收文字号", prop: "documentCode", align: "center",width:"200"},
  { label: "标题", prop: "title", align: "left",minwidth:"150"},
  { label: "退文人", prop: "backUserName", align: "center",width:"70"},
  { label: "退文原因", prop: "reason", align: "center",minwidth:"150"}
];
const year = new Date().getFullYear();
export default {
  name: "ReceiveFileBack",
  components: {
    mTable,
    selectOrgOrDept
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
        function: "sysReceiveDocBackPage",
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
      ruleForm: {
        documentNo: "", //发文字号
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
        desc: ""
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: finshData,
      pagination: {
        pageNum: 1,
        total: 10,
        limit: 20
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
      this.$post
        .postData(
          "sysReceiveDocBackPage",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
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
    cellClick(row, column, cell, event) {
      console.log(row);
      const routeData = this.$router.resolve({
        path: "/receiveFileBackDispachDetail",
        query: {
          id: row.id,
          unitId:this.unitId2,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
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
      this.initData();
    },
    resetForm(formName) {
      this.bank_countersignature.choseYear = "",
      this.bank_countersignature.title = "";
      this.bank_countersignature.documentCode = "〔"+year+"〕";
      this.bank_countersignature.startDate = "";
      this.bank_countersignature.endDate = "";
      this.bank_countersignature.curNodeCode = "";
      this.ruleForm.searchTime = [];
      this.unitName = JSON.parse(
        localStorage.getItem("userInfo")
      ).shortUnitName;
      this.unitName = this.unitName1;
      this.unitId = this.unitId1;
      this.initData();
      this.routeYear();
      this.tableData = [];
    },
    tableSelect(rows, row){
      this.tableSelectList=[];
      this.deletIds="";
      if(rows && rows.length>0){
        rows.map(item => {
          this.tableSelectList.push(item.id);
        });
        this.deletIds = this.tableSelectList.join(";");
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
                function:'doDeleteBackByManager',
                ids:this.deletIds,
                unitName:this.bank_countersignature.unitName,
                unitId:this.bank_countersignature.unitId,
                manager: '1',
              };
              this.$post.postData("doDeleteBackByManager", JSON.stringify(httpobj), this.$businessCode.swgl)
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
