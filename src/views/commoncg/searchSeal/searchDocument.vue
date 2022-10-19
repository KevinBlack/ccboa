/**
* create by zx on 2020/8/31 15:12
* 类注释：
* 备注：查询结果仅含‘制发’及‘承办’列表
*/
<template>
  <div class="annual_sear">
    <!--    导出查询数据   必须放于最上边(以防与下边的table的id冲突)-->
    <!-- <export-excel
      v-show="false"
      :tableData="excelTableData"
      :tableCols="tableCols"
      :excelTitle="excelTitle"
      :startExport="startExport"
      :tipDate="tipData"
    ></export-excel>-->

    <!-- <p class="annual_title">常规用印本年度查询</p> -->
    <search-form
      :formData="formData"
      :formCfg="formCfg"
      ref="searchForm"
      :openshow="openshow"
      @reset="reset"
      @event="btnevent"
      @submit="submit"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="编号年份">
            <el-select
              v-model="formData.choseYear"
              @change="selectYear"
              placeholder="近两年"
              style="width: 100%;"
            >
              <el-option
                v-for="yearItem in yearList"
                :key="yearItem"
                :label="yearItem"
                :value="yearItem"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="申请日期">
            <el-date-picker
              v-model="formData.draftTime"
              type="daterange"
              range-separator
              @change="changeTime"
              valueFormat="yyyy-MM-dd"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00','23:59:59']"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- </el-row>
        <el-row>-->
        <el-col :span="10">
          <el-form-item label="用印日期">
            <el-date-picker
              v-model="formData.useTime"
              type="daterange"
              @change="changeDate"
              range-separator
              valueFormat="yyyy-MM-dd"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00','23:59:59']"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </search-form>
    <el-col :span="24" style="text-align:right;margin: 10px 0;">
      <el-button type="primary" size="small" @click="exportTables">导出</el-button>
    </el-col>

    <t-table
      style="clear:both"
      @refresh="loadData()"
      @cellClick="cellClick"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isIndex="true"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></t-table>

    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="seletSelf"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import searchForm from "components/form/searchForm";
import tTable from "components/table/tTable";
import orgTree from "components/tree/orgTree";
import exportTable from "@/minixs/exportTable";
export default {
  name: "annsearch",
  components: {
    searchForm,
    tTable,
    orgTree
  },
  data() {
    return {
      yearList: [],
      seletSelf: 1,
      startExport: false, //判断是否开始导出数据
      tipData: "", //导出数据时间段
      openshow: true,
      excelTitle: "",
      excelTableData: [],
      formData: {
        choseYear: "近两年",
        numYear: "",
        documentNo: "",
        // documentNo: "〔" + new Date().getFullYear() + "〕",
        status: "999",
        yzType: "999"
        // draftOrgan: JSON.parse(localStorage.getItem("userInfo")).unitName,
        // draftOrganId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      formCfg: [
        {
          type: "radios",
          prop: "status",
          label: "状态",
          span: 10,
          options: { "999": "全部", 0: "流转", 1: "办结" }
        },
        {
          type: "radios",
          prop: "yzType",
          label: "印章类别",
          span: 18,
          options: {
            "999": "全部",
            党委章: "党委章",
            部门内设章: "部门内设章",
            行章: "行章",
            领导人员名章: "领导人员名章",
            合同专用章: "合同专用章"
          }
        },
        [
          {
            type: "input",
            prop: "draftOrgan",
            span: 16,
            style: { width: "80%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectOrg",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "16px" }
          },
          { type: "formitem", label: "行名" }
        ],
        [
          {
            type: "input",
            prop: "draftDepartment",
            span: 16,
            style: { width: "80%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectDepar",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "16px" }
          },
          { type: "formitem", label: "用印部门" }
        ],
        {
          type: "input",
          prop: "sendDepartment",
          label: "发往单位",
          span: 20
        },
        {
          type: "input",
          prop: "title",
          label: "标题",
          span: 20
        },
        {
          type: "input",
          prop: "documentNo",
          label: "编号",
          span: 20,
          value: ""
        },
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ],
      tableData: [],
      tableCols: [
        { label: "申请日期", prop: "draftDate", width: 200 },
        { label: "用印时间", prop: "useTime", width: 200 },
        { label: "标题", prop: "title" },
        { label: "用印部门", prop: "draftDepartment", width: 200 },
        { label: "用印数量", prop: "markNum", width: 200 },
        { label: "编号", prop: "documentNo", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      }
    };
  },
  created() {
    this.getNumYearList().then(res => {
      this.loadData();
    });
  },
  methods: {
    getNumYearList() {
      return new Promise((resolve, reject) => {
        this.$api.numYear.getNumYearList({tbParam:'cxgwyy'}).then(res => {
          console.log("123222", res);
          this.yearList = getNumYear(res.data);
          this.formData.numYear = "";
          console.log("this.formData.numYear111", this.formData.numYear);
          resolve(res.data);
        });
      });
    },
    // 选择编号年
    selectYear(val) {
      console.log(val);
      if (val == "近两年") {
        this.formData.numYear = "";
        this.formData.documentNo = "";
        this.formCfg.forEach(item => {
          if (item.constructor === Object && item.label == "编号") {
              item.value = ""
          }
        });
        // this.formData.documentNo = "〔" + new Date().getFullYear() + "〕"
      } else {
        this.formData.numYear = val;
        this.formData.documentNo = "〔" + val + "〕";
        this.formCfg.forEach(item => {
          if (item.constructor === Object && item.label == "编号") {
              item.value = "〔" + val + "〕"
          }
        });
      }
    },
    reset() {
      this.formData = {
        documentNo: "",
        // documentNo: "〔" + new Date().getFullYear() + "〕",
        status: "",
        draftOrgan: "",
        draftOrganId: "",
        draftDepartment: "",
        draftDepartmentId: "",
        draftUserId: "",
        yzType: "",
        sendDepartment: "",
        title: ""
      };
      this.loadData();
    },
    changeTime(val) {
      console.log(val);
      if (val == null) {
        this.formData.draftTime = "";
        this.formData.draftDateStart = "";
        this.formData.draftDateEnd = "";
      }
    },
    changeDate(val) {
      if (val == null) {
        this.formData.useTime = "";
        this.formData.useTimeStart = "";
        this.formData.useTimeEnd = "";
      }
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true;
          break;
        case "$selectDepar":
          if (!this.formData.draftOrganId) {
            this.$message({
              message: "请先选择机构",
              type: "warning"
            });
            return;
          }
          this.title = "部门";
          this.isSingle = true;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.formData.draftOrganId;
          this.showOrgTree = true;
          break;
        case "documentNo":
          delete this.formData.documentNo;
          break;
        case "draftUser":
          delete this.formData.draftUser;
          break;
        case "sendDepartment":
          this.formData["sendDepartment"] = params.value;
          break;
        case "title":
          this.formData["title"] = params.value;
          break;
      }
    },
    //获取机构树
    getOrgList(org) {
      console.log(org);
      if (this.orgOrDeptId == "1") {
        this.$refs.searchForm.setText("draftOrgan", org.unitName);
        this.$set(this.formData, "draftOrganId", org.id);
      } else {
        // let deptId = [];
        // let deptName = [];
        // org.map(item => {
        //   deptId.push(item.id);
        //   deptName.push(item.unitName);
        // });
        // this.$refs.searchForm.setText("draftDepartment", deptName.join(","));
        // this.$set(this.formData, "draftDepartmentId", deptId.join(","));
        this.$refs.searchForm.setText("draftDepartment", org.unitName);
        this.$set(this.formData, "draftDepartmentId", org.id);
      }
    },
    submit(params) {
      this.loadData();
    },
    loadData() {
      if (this.formData.draftTime) {
        this.formData.draftDateStart = this.formData.draftTime[0];
        this.formData.draftDateEnd = this.formData.draftTime[1];
      }
      if (this.formData.useTime) {
        this.formData.useTimeStart = this.formData.useTime[0];
        this.formData.useTimeEnd = this.formData.useTime[1];
      }
      this.$api.sealManage.sealStatistical
        .searchDocument(
          { ...this.formData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "list");
          this.pagination.total = res.total;
          this.tableData = res.list.map(item => {
            const rtfAssetList = item.rtfAssetList ? JSON.parse(item.rtfAssetList) : [];
            item.markNum = rtfAssetList.reduce((total, item) => total + (parseInt(item.sum)), 0)
            return item;
          });
        });
    },
    cellClick(row) {
      let path;
      if (row.status === "1") {
        path = "/sealManage/useSeal/draft/document";
      } else if (row.status === "2" || row.status === "3") {
        path = "/sealManage/useSeal/draft/doneDocument";
      }
      this.handleOpenPage(path, row.id);
      // this.$intent.goNewPage(this, {
      //   path,
      //   query: {
      //     id: row.id,
      //     markOrderType: "1",
      //     numYear: this.formData.numYear
      //   }
      // });
    },
      handleOpenPage(path, id, readType, flag) {
      let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
      if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
        id:id,
        markOrderType: "1",
        numYear:this.formData.numYear}
      });
      window.open(routeData.href, "_blank");
    },
    exportTables() {
      // if (this.tableData.length == 0) {
      //   return;
      // }
      exportTable.exportExcel("公文用印查询结果");
    }
  }
};
</script>
<style scoped lang="less">
.annual_sear {
  margin: 0 auto;

  .annual_title {
    width: 100%;
    height: 70px;
    margin-top: 20px;
    color: #2b66e3;
    text-align: center;
    font-size: 22px;
  }

  .annual_content {
    .draft_data {
      width: 90%;
      margin: 0 auto;
      display: flex;
    }

    .pro_type {
      width: 90%;
      margin: 0 auto;
      display: flex;
      margin-bottom: 12px;

      div {
        width: 90%;
        height: 16px;
        padding: 12px 0;
        border: 1px solid #ccc;
        margin-left: 22px;
        margin-top: 8px;

        label {
          margin-top: 3px;
          margin-left: 16px;
        }
      }
    }

    .title_box {
      width: 90%;
      margin: 0 auto;
      display: flex;

      input {
        width: 90%;
        height: 30px;
        margin: 0 auto;
        margin-left: 52px;
      }
    }
  }
}

.btn_list {
  width: 30%;
  height: 50px;
  display: flex;
  margin: 0 auto;

  div {
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    cursor: pointer;
    margin: 16px;
  }

  div:first-child {
    background: #2b66e3;
    color: #fff;
  }

  div:last-child {
    border: 1px solid #2b66e3;
    color: #2b66e3;
  }
}

.form_taxt {
  width: 90%;
  height: 100%;
  margin: 0 auto;

  .el-range-editor,
  .el-input__inner {
    width: 100%;
  }

  .radio_box {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    line-height: 40px;
    padding-left: 4%;
  }

  .el-input {
    width: 100%;
  }
}
</style>
