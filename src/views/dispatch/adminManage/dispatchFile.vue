<template>
  <!-- <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane> -->
    <div class="dispatchparameterspage">
      <el-row v-cloak>
        <el-col>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20"
            :class="{mtdown:down}">
            <el-row>
              <el-col :span="6">
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
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item label="发文字号" prop="documentNo">
                  <el-input v-model="ruleForm.documentNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="拟稿日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange()"
                      v-model="ruleForm.endTime"
                      type="daterange"
                      align="right"
                      style="width:100%;"
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
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="拟稿人" prop="draftUser">
                  <el-input v-model="ruleForm.draftUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="流程状态">
                  <el-select v-model="bank_countersignature_all.curNodeCode" style="width:100%;">
                    <el-option value="-1" label="流转中"></el-option>
                    <el-option value="800" label="已办结"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="拟稿部门" prop="draftDepartmentId">
                      <el-input v-model="ruleForm.mainOrganNames" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" @click="selectDepartment">选择</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="text-align: center;margin-bottom: 10px;" :span="24">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                  <el-button type="danger" style="float:right" @click="handleBatchDelete">删除</el-button>
              </el-col>
            </el-row>
            <el-col class="down" v-if="down">
              <el-button type="info" size="small" @click="arrow()">
                <i class="el-icon-arrow-up el-icon--left"></i> 收起
              </el-button>
            </el-col>
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
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
      <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
    </div>
  <!-- </el-tabs> -->
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery";
import Dialog from "@/views/dispatch/departDialog.vue";

const finshData = [
  { label: "拟稿日期", prop: "CREATETIME", align: "center", width: "110px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "220px" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%" },
  { label: "拟稿部门", prop: "draftDepartment", align: "center", width: "120px" },
  { label: "发文种类", prop: "SENDTYPE", align: "center", width: "80px" },
  { label: "当前环节", prop: "NODENAME", align: "center", width: "120px" }
]
const otherData = [
  { label: "拟稿日期", prop: "CREATETIME", align: "center", width: "110px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "220px" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%" },
  { label: "拟稿部门", prop: "draftDepartment", align: "center", width: "120px" },
  { label: "发文种类", prop: "SENDTYPE", align: "center", width: "80px" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center", width: "120px" },
  { label: "当前处理人 ", prop: "AVYEXCTRNM", align: "center", width: "100px" }
]
const allData = [
  { label: "拟稿日期", prop: "draftTime", align: "center", width: "110px" },
  { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
  { label: "标题", prop: "title", align: "left",minwidth:"40%" },
  { label: "拟稿部门", prop: "draftDepartment", align: "center", width: "120px" },
  { label: "发文种类", prop: "sendType", align: "center", width: "80px" },
  { label: "当前环节", prop: "currentNode", align: "center", width: "120px" },
  { label: "当前处理人 ", prop: "currentUser", align: "center", width: "100px" }
]

export default {
  name: "fwglfw",
  components: {
    mTable,
    Dialog,
    selectOrgOrDept
  },
  mixins: [dispatchFileQuery],
  data() {
    return {
      isGly:false,
      deleteIds: '',
      deleteArry: '',
      bank_countersignature_all: {
        function: "selectSendOrderByPage",
        state: 0,
        page: 1,
        total: 0,
        limit: 20,
        startTime: '',
        endTime: '',
        documentNo: '',
        title: '',
        curNodeCode: '',
        unitName: '',
        unitId: ''
      },
      bank_countersignature: {
        function: "getWFTask",
        tplbsnid: "DZFW,SWFW",
        state: 1,
        page: 1,
        totalCount: 0,
        limit: 20
      },
      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        startTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        mainOrganNames: "",
        deptIds: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: "",
        draftDepartmentId: "",
        draftUser: ""
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      activeName: "tabs-wait",
      isEnd: true,
      isAll: false,
      currentTab: '0',
      tableCols: allData
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

    // 页面初始化加载数据
    handleLoadData(val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      this.bank_countersignature_all.unitName = this.unitName
      this.bank_countersignature_all.unitId = this.unitId;
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(val=="a") {
        this.pagination.page = 1;
      }
      this.$post.postData("selectSendOrderByPage", JSON.stringify(Object.assign({}, this.ruleForm, this.bank_countersignature_all, this.pagination)), this.$businessCode.fawgl).then(res => {
        this.tableData = res.data&&res.data.rows||[];
        this.pagination.total = res.data&&res.data.total||0;
      })
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (this.ruleForm.endTime) {
        this.bank_countersignature_all.startTime = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.bank_countersignature_all.endTime = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      }else {
        this.bank_countersignature_all.startTime = ''
        this.bank_countersignature_all.endTime = ''
      }
    },
    //点击 全部0 待办1  已办2  办结3
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
        this.isAll = true
      } else {
        this.isAll = false;
      }
      if (tab.index == "1") {
        this.isEnd = true;
        this.tableCols = otherData
      } else {
        this.isEnd = false;
      }
      if (tab.index == "2") {
        this.tableCols = otherData
      }
      if (tab.index == "3") {
        this.tableCols = finshData;
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
      this.handleLoadData(this.currentTab)
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
      this.handleLoadData(this.currentTab)
    },
    cellClick(row, column, cell, event) {
      console.log(row)
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
        // if (row.isFlowEnd === '已办') {
          if (row.sendType === '实物') {
            this.handleOpenPage('/bankEntityDispatchDoneCopy', row.id, readType, row.sendType, this.unitId)
          } else if (row.sendType === '电子') {
            this.handleOpenPage('/bankDispachDoneCopy', row.id, readType, row.sendType, this.unitId)
          }
        // } else if (row.isFlowEnd === '待办') {
        //   if (row.sendType === '实物') {
        //     this.handleOpenPage('/bankEntityDispatch', row.id, readType)
        //   } else if (row.sendType === '电子') {
        //     this.handleOpenPage('/bankDispach', row.id, readType)
        //   }
        // }
      } else if (this.currentTab === '1') {
        if (row.SENDTYPE === '实物') {
          this.handleOpenPage('/bankEntityDispatch', row.ID, readType, this.unitId, "bd")
        } else if (row.SENDTYPE === '电子') {
          this.handleOpenPage('/bankDispach', row.ID, readType, this.unitId, "bd")
        }
      } else if (this.currentTab === '2') {
        if (row.SENDTYPE === '实物') {
          this.handleOpenPage('/bankEntityDispatchDone', row.ID, readType, this.unitId)
        } else if (row.SENDTYPE === '电子') {
          this.handleOpenPage('/bankDispachDone', row.ID, readType, this.unitId)
        }
      } else if (this.currentTab === '3') {
        if (row.SENDTYPE === '实物') {
          this.handleOpenPage('/bankEntityDispatchFinishRed', row.ID, readType, this.unitId)
        } else if (row.SENDTYPE === '电子') {
          this.handleOpenPage('/bankDispachFinishRed', row.ID, readType, this.unitId)
        }
      }
    },
    handleOpenPage (path, id, readType, sendType, unitId, flag) {
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
      })
      this.ruleForm = {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        startTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        mainOrganNames: "",
        deptIds: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: "",
        draftDepartmentId: "",
        draftUser: "",
        choseYear:""
      };
      this.draftDepartmentName = '';
      this.bank_countersignature_all.title = ''
      this.bank_countersignature_all.startTime = ''
      this.bank_countersignature_all.endTime = ''
      this.bank_countersignature_all.curNodeCode = ''
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
    },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = this.ruleForm.draftDepartmentId = result.id;
    },
    handleSelectionChange (val) {
      console.log(val)
      this.checkedArr = val
      const idsArr = []
      const coluArr = []
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id)
        coluArr.push(val[i].documentNo)
      }
      this.deleteIds = idsArr.join(';')
      this.deleteArry = coluArr.join(',')
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
            this.$api.adminConfig.deleteColumn(
              {zlWh: this.deleteArry}
            ).then(res => {
              if(res.code == "SUCCESS") {
                this.$post.postData('doDeleteByIdSendOrderRecycle', JSON.stringify({ function: 'doDeleteByIdSendOrderRecycle', ids: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
                  if (res.success) {
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    })
                    this.handleLoadData('a');
                  } else {
                    this.$message({
                      type: 'error',
                      message: '删除失败!'
                    })
                  }
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '删除专栏失败!'
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              offset: 100,
              showClose: true,
              message: "已取消删除",
              duation: 1000
            })
          })
      }
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.choseYear = "";
      this.ruleForm.documentNo = this.bank_countersignature_all.documentNo = '〔'+ openTimeYear +'〕'
    }
  },
  created() {
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
  padding: 10px 20px 0 0 !important;
  position: relative;
  border: 1px solid #f0f0f0;
  margin: 0 !important;
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
