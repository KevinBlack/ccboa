<template>
  <!-- <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane> -->
    <div class="dispatchparameterspage">
      <el-row>
        <el-col>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20"
            :class="{mtdown:down}">
            <el-row>
              <el-col :span="8">
                <el-form-item label="机构名称">
                  <div class="dispatchcswhlshwh">
                    <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                      <el-input
                        type="text"
                        readonly="readonly"
                        placeholder="请选择"
                        v-model="unitName"
                        suffix-icon="el-icon-arrow-down"
                      />
                    </select-org-or-dept>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="ruleForm.choseYear"
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
              <el-col :span="8">
                <el-form-item label="申请日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange()"
                      v-model="ruleForm.endTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 100% !important;"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发文字号" prop="documentNo">
                  <el-input v-model="ruleForm.documentNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="流程状态">
                  <el-select v-model="bank_countersignature_all.curNodeCode" style="width: 100%;">
                    <el-option value="-1" label="流转中"></el-option>
                    <el-option value="800" label="已办结"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="text-align: center;margin-bottom: 10px;" :span="24">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="danger" style="float:right" @click="handleBatchDelete">删除</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col style="margin: 10px 0;">
          <m-table
            size="medium"
            :isSelection="true"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            :isIndexPage="true"
            :state="bank_countersignature.state"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @handleSelectionChange="handleSelectionChange"
            @selectAll="handleSelectionChange"
            @cellClick="cellClick"
            v-loading="tableLoading"
          ></m-table>
        </el-col>
      </el-row>
    </div>
  <!-- </el-tabs> -->
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"

const otherData = [
  { label: "申请日期", prop: "APPLYDATE", align: "center", width: "150px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "220px" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%" },
  { label: "发文种类", prop: "SENDTYPE", align: "center", width: "80px" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center", width: "120px" },
  { label: "操作人 ", prop: "AVYEXCTRNM", align: "center", width: "100px" }
];
const finshData = [
  { label: "申请日期", prop: "APPLYDATE", align: "center", width: "150px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "220px" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%" },
  { label: "当前环节", prop: "CURNODENAME", align: "center", width: "120px" },
  { label: "主办部门", prop: "HOSTDEPARTMENT", align: "center", width: "120px" }
]
const allData = [
  { label: "申请日期", prop: "applyDate", align: "center", width: "150px" },
  { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
  { label: "标题", prop: "title", align: "left",minwidth:"40%" },
  { label: "发文种类", prop: "sendType", align: "center", width: "80px" },
  // { label: "当前状态", prop: "isFlowEnd", align: "center" },
  { label: "当前环节", prop: "currentNode", align: "center", width: "120px" },
  { label: "当前处理人 ", prop: "currentUser", align: "center", width: "100px" }
]

export default {
  name: "fwglcfsp",
  components: {
    mTable,
    selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      deleteIds: '',
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      bank_countersignature_all: {
        function: "getAllAgainOrderList",
        state: 0,
        page: 1,
        total: 0,
        limit: 20,
        title: '',
        documentNo: '',
        endTime: '',
        startTime: '',
        curNodeCode: ''
      },
      bank_countersignature: {
        function: "getWFTask",
        tplbsnid: "D_CFW",
        state: 1,
        page: 1,
        totalCount: 0,
        limit: 20
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
      activeName: "tabs-wait",
      currentTab: '0',
      tableData: [],
      tableCols: allData,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      yearList:[]
    };
  },
  methods: {
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName , this.unitId);
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
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName,this.unitId)
    },

    timeChange() {
      if(this.ruleForm.endTime){
        this.bank_countersignature_all.startTime = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.bank_countersignature_all.endTime = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      } else {
        this.bank_countersignature_all.startTime = ''
        this.bank_countersignature_all.endTime = ''
      }
    },
    handleLoadData(val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      this.bank_countersignature_all.unitName = this.unitName
      this.bank_countersignature_all.unitId = this.unitId
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(val=="a") {
        this.pagination.page = 1;
      }
      this.$post.postData("getAllAgainOrderList", JSON.stringify(Object.assign({},this.bank_countersignature_all, this.pagination)), this.$businessCode.fawgl).then(res => {
        if (res && res.success) {
          this.tableData = res.data.rows
          this.pagination.total = res.data.total
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleTabsClick(tab, event) {
      this.currentTab = tab.index
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_countersignature.state = tab.index;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.bank_countersignature.totalCount =0;
      
      if (tab.index == "0") {
        this.tableCols = allData;
      } else if (tab.index == "3") {
        this.tableCols = finshData;
      } else {
        this.tableCols = otherData;
      }
      this.handleLoadData(tab.index);
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      if(this.currentTab === '0') {
        this.bank_countersignature_all.page = val
      } else {
        this.bank_countersignature.page = val
      }
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData()
    },

    handleSizeChange(val) {
      if(this.currentTab === '0') {
        this.bank_countersignature_all.limit = val
        this.pagination.page = this.bank_countersignature_all.page = 1
      } else {
        this.bank_countersignature.limit = val
        this.pagination.page = this.bank_countersignature.page = 1
      }
      this.pagination.limit = val
      this.tableData = []
      this.handleLoadData()
    },
    cellClick(row, column, cell, event){
      let readType;
      let idType;
      if(this.bank_countersignature.state == 0){
        readType = row.readFlag ? row.readFlag : '';
        idType = row.id ? row.id : '';

      }else{
        readType = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
      }

      if(this.currentTab === '0') {
        this.handleOpenPage('/rexamineDoneCopy', row.id, readType, this.unitId, row.sendType)

      } else if (this.currentTab === '1') {
        this.handleOpenPage('/rexamineDispach', row.ID, readType, this.unitId, "bd", row.sendType)
      } else if (this.currentTab === '2') {
        this.handleOpenPage('/rexamineDone', row.ID, readType, this.unitId, row.sendType)
      } else if (this.currentTab === '3') {
        this.handleOpenPage('/rexamineDone', row.ID, readType, this.unitId, row.sendType)
      }
    },
    handleOpenPage (path, id, readType, unitId, flag, sendType) {
      if (flag=="bd") {
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
        path: path,
        query: {
          id: id,
          readFlag:readType,
          sendType:sendType,
          unitId: unitId,
          choseYear: this.ruleForm.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm() {
      this.bank_countersignature_all.title = this.ruleForm.title
      this.bank_countersignature_all.documentNo = this.ruleForm.documentNo
      this.handleLoadData('a');
    },
    resetForm(formName) {
      this.$api.setting.organization
      .getTree({
        unitClass:1,
        unitCode: "1",
      })
      .then((res) => {
        this.unitName = res.data[0].unitName||'';
        this.unitId = res.data[0].unitCode||'';
        this.tableData = [];
      })
      this.ruleForm.title = '';
      this.ruleForm.endTime = '';
      this.bank_countersignature_all.title = ''
      this.bank_countersignature_all.startTime = ''
      this.bank_countersignature_all.endTime = ''
      this.bank_countersignature_all.curNodeCode = ''
      this.ruleForm.choseYear = ''
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
    },
    handleSelectionChange (val) {
      this.checkedArr = val
      const idsArr = []
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id)
      }
      this.deleteIds = idsArr.join(';')
    },
    handleBatchDelete () {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      } else {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post.postData('doDeleteByIdAgainOrderRecycle', JSON.stringify({ function: 'doDeleteByIdAgainOrderRecycle', ids: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleLoadData('a')
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              offset: 100,
              showClose: true,
              message: "已取消删除",
              duation: 1000
            });
          });
      }
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = this.bank_countersignature_all.documentNo = '〔'+ openTimeYear +'〕'
      this.ruleForm.choseYear = "";
    },
    selectYear(val) {
      this.ruleForm.choseYear = val;
      if (val=="") {
        this.defaultYear();
      } else {
        this.ruleForm.documentNo = '〔'+ val +'〕'
      }
    }
  },
  created() {
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.fawgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }})
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.defaultYear();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.handleLoadData();
    })
  }
};
</script>

<style lang="less" scoped>
.mtdown {
  padding: 20px 0 80px 0;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20 {
  padding: 10px 20px 0 0 !important;
  position: relative;
  border: 1px solid #f0f0f0;
  margin: 0 !important;
}
.arrowup{
  padding-left: 20px;
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
