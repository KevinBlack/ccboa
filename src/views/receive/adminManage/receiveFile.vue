<template>
  <div class="receive">
    <el-row class="dispatchcswhlshwh">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm mt20 transition_wrap"
        :class="{mtdown:down}"
      >
        <el-row>
          <el-col :span="6">
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="标题" prop="title">
              <el-input v-model="bank_countersignature.title"></el-input>
            </el-form-item>
          </el-col>
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
    </el-row>
    <el-row>
      <m-table
        size="medium"
        :isSelection="true"
        @select="tableSelect"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        :isIndexPage="true"
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
    </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const finshData = [
  //READFLAG
  // { label: "到达时间", prop: "TMS", align: "center" },
  { label: "收文日期", prop: "RECEIVETIME", align: "center",width:"145" },
  { label: "收文字号", prop: "DOCUMENTCODE", align: "center",width:"200" },
  { label: "是否督办", prop: "ISSUPERVISE", align: "center",width:"70" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"150" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center",width:"120" },
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center",width:"80" },
  {
    label: "收文类型",
    prop: "RECEIVEDOCTYPE",
    align: "center",
    width:"80",
    formatter(row) {
      return row.RECEIVEDOCTYPE == 1 ? "电子收文" : "实物收文";
    }
  }
];
const banjiehData = [
  //READFLAG
  // { label: "到达时间", prop: "TMS", align: "center" },
  { label: "收文日期", prop: "RECEIVETIME", align: "center",width:"145" },
  { label: "收文字号", prop: "DOCUMENTCODE", align: "center",width:"200" },
  { label: "是否督办", prop: "ISSUPERVISE", align: "center",width:"70" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"150" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center",width:"120" },
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center",width:"80" },
  {
    label: "收文类型",
    prop: "RECEIVEDOCTYPE",
    align: "center",
    width:"80",
    formatter(row) {
      return row.RECEIVEDOCTYPE == 1 ? "电子收文" : "实物收文";
    }
  },
  {
    label: "是否行内收文",
    prop: "ISINNER",
    align: "center",
    width:"90",
    formatter(row) {
      return row.ISINNER == 0 ? "行内" : "行外";
    }
  }
];
const firstData = [
  //READFLAG
  // { label: "到达时间", prop: "receiveTime", align: "center" },
  { label: "收文日期", prop: "receiveTime", align: "center",width:"145"},
  { label: "收文字号", prop: "documentCode", align: "center",width:"200" },
  {
    label: "是否督办",
    prop: "isSupervise",
    align: "center",
    width:"70",
    formatter(row) {
      return row.isSupervise == 1 ? "是" : "否";
    }
  },
  { label: "标题", prop: "title", align: "left",minwidth:"150" },
  // { label: "正文字数", prop: "receiveWords", align: "center" },
  // { label: "承办部门", prop: "undertakeDeptName", align: "center" },
  { label: "当前环节", prop: "curNodeName", align: "center",width:"120" },
  { label: "当前处理人", prop: "curUser", align: "center",width:"80" },
  { label: "收文类型", prop: "receiveType", align: "center",width:"80" }
];
const year = new Date().getFullYear();
export default {
  name: "ReceiveFile",
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
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      unitName2: "",
      unitId2: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业
      fwTranId: this.$businessCode.swgl,
      isAddShow: true,
      bank_countersignature: {
        choseYear:"",
        function: "getReceiveDocs",
        state: 0,
        //tplbsnid:'DZSW,SWSW',
        tplbsnid: "SWSW,DZSW,SWSWCT",
        title: "",
        documentCode: "〔"+year+"〕",
        startTime: "",
        receive_type: "",
        endTime: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        unitId: ""
      },
      searchParams: {
        receive_type: "全部"
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
        receive_type: "全部",
        documentCode: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        searchTime: "",
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
      isEnd: true,
      tableData: [],
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
      this.initData();
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
    this.isHasAdd();
  },
  methods: {
    routeYear(){
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
    },
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
    isHasAdd() {
      this.$post
        .postData(
          "getDraftAuth",
          JSON.stringify({ function: "getDraftAuth" }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.success == false) this.isAddShow = false;
        })
        .catch(err => {
          console.log(err);
        });
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
      if (this.searchParams.receive_type === "全部") {
        this.bank_countersignature.receive_type = "";
      } else {
        this.bank_countersignature.receive_type = this.searchParams.receive_type;
      }
      sessionStorage.setItem('page_sw',JSON.stringify(this.bank_countersignature));
      if (this.bank_countersignature.state == "0") {
        Object.assign(this.bank_countersignature, {
          function: "getReceiveDocs"
        });
        this.$post
          .postData(
            "getReceiveDocs",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
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
      } else {
        //
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
    arrow() {
      this.down = !this.down;
      if (this.down == false) {
        this.searchParams.receive_type = "全部";
        this.bank_countersignature.receive_type = "全部";
      }
    },
    timeChange() {
      if (this.ruleForm.searchTime[0]) {
        this.bank_countersignature.startTime = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[0])
        );
        this.bank_countersignature.endTime = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[1])
        );
      } else {
        this.bank_countersignature.startTime = "";
        this.bank_countersignature.endTime = "";
      }
    },
    handleTabsClick(tab, event) {
      this.tableData = [];
      this.bank_countersignature.totalCount = 0;
      if (tab.index == 0) {
        this.tableCols = firstData;
      } else if (tab.index == 3) {
        this.tableCols = banjiehData;
      } else {
        this.tableCols = finshData;
      }
      if (tab.index == "1") {
        this.isEnd = true;
      } else {
        this.isEnd = false;
      }
      this.bank_countersignature.state = tab.index;
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
      this.pagination.page = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellStyle(rows, column, rowIndex, columnIndex) {
      console.log(rows);
    },
    cellClick(row, column, cell, event) {
      let idType;
      if (this.bank_countersignature.state == 0) {
        idType = row.id ? row.id : "";
      } else {
        idType = row.ID ? row.ID : "";
      }
      // if(this.bank_countersignature.state == 2 || this.bank_countersignature.state == 3 || row.status == "已办" ||  row.status == "办结"){receiveBjYbDetail

      const routeData = this.$router.resolve({
        path:
          row.receiveType == "电子收文"
            ? "/receiveDzBjYbDetail"
            : "/receiveBjYbDetail",
        query: {
          id: idType,
          receiveType: row.receiveType,
          unitId:this.unitId,
          choseYear:this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
      // }
      // else{
      // let readOnlys = ["已办","办结"];
      //     if(this.bank_countersignature.state == 0){
      //       const routeData = this.$router.resolve({
      //         path: row.receiveType=="电子收文"?"/receiveElectronDetail":"/receiveDispatchDetail",
      //         query: {
      //           id: idType,
      //           stateF:readOnlys[row.STATUS]?true:false,
      //           readFlag:readType
      //         }
      //       });
      //       window.open(routeData.href, "_blank");
      //     }else{
      //       const routeData = this.$router.resolve({
      //         path: row.RECEIVEDOCTYPE==1?"/receiveElectronDispatch":"/receiveDispatch",
      //         query: {
      //           id: idType,
      //           stateF:readOnlys[row.STATUS]?true:false,
      //           readFlag:readType
      //         }
      //       });
      //       window.open(routeData.href, "_blank");
      //     }
      // }
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
                function:'deleteMainByManager',
                ids:this.deletIds,
                unitName:this.bank_countersignature.unitName,
                unitId:this.bank_countersignature.unitId
              };
              this.$post.postData("deleteMainByManager", JSON.stringify(httpobj), this.$businessCode.swgl)
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
    resetForm() {
      this.bank_countersignature.choseYear = "",
      this.bank_countersignature.title = "";
      this.bank_countersignature.documentCode = "〔"+year+"〕";
      this.bank_countersignature.startTime = "";
      this.bank_countersignature.endTime = "";
      this.bank_countersignature.curNodeCode = "";
      this.ruleForm.searchTime = [];
      this.unitName = this.unitName1;
      this.unitId = this.unitId1;

      this.unitName = JSON.parse(
        localStorage.getItem("userInfo")
      ).shortUnitName;
      this.initData();
      this.routeYear();
      this.tableData = [];
    },
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
  color: red;
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
.arrowup {
  padding-left: 20px;
  margin-bottom: 20px;
}
.down {
  position: absolute;
  bottom: -76px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}
.clearfix {
  clear: both;
}
.transition_wrap {
  transition: all 0.3s ease-in-out;
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
