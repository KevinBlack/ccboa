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
        <el-col :span="10">
          <el-form-item label="启用日期">
            <el-date-picker
              v-model="formData.useDate"
              type="daterange"
              range-separator
              valueFormat="yyyy-MM-dd"
              style="width:100%"
              @change="changeTime"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00','23:59:59']"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- </el-row>
        <el-row>-->
        <el-col :span="10">
          <el-form-item label="废止日期">
            <el-date-picker
              v-model="formData.desDate"
              type="daterange"
              range-separator
              valueFormat="yyyy-MM-dd"
              style="width:100%"
              @change="changeDate"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00','23:59:59']"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="销毁日期">
            <el-date-picker
              v-model="formData.desDate1"
              type="daterange"
              range-separator
              @change="changeYear"
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

    <!--制发机构选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="seletSelf"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!--使用机构选择树-->
    <org-tree
      v-model="showOrgNeedTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="seletSelf"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgNeedList"
    ></org-tree>
    <!--行名选择树-->
    <org-tree
      v-model="showOrgSeepTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="seletSelf"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgSeepList"
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
      seletSelf: 1,
      startExport: false, //判断是否开始导出数据
      tipData: "", //导出数据时间段
      openshow: true,
      excelTitle: "",
      excelTableData: [],
      formData: {
        yzType: "999",
        sealName: "",
        issJgId: "",
        issJg: "",
        useJgId: "",
        useJg: "",
        isLocate: "",
        draftOrgan: "",
        draftOrganId: ""
      },
      title: "选择部门",
      showOrgTree: false,
      showOrgNeedTree: false,
      showOrgSeepTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      formCfg: [
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
        {
          type: "input",
          prop: "sealName",
          label: "印章名称",
          span: 20
        },
        [
          {
            type: "input",
            prop: "issJg",
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
          { type: "formitem", label: "制发机构" }
        ],
        [
          {
            type: "input",
            prop: "useJg",
            span: 16,
            style: { width: "80%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectNeedOrg",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "16px" }
          },
          { type: "formitem", label: "使用机构" }
        ],
        {
          type: "radios",
          prop: "sealStatus",
          label: "印章状态",
          span: 12,
          options: {
            A01: "未启用",
            A02: "启用",
            A03: "废止",
            A04: "销毁",
            A05: "实物档案"
          }
        },
        {
          type: "radios",
          prop: "isLocate",
          label: "是否存放到用印机器中",
          span: 10,
          options: { 1: "是", 0: "否" }
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
            prop: "$selectSeepOrg",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "16px" }
          },
          { type: "formitem", label: "行名" }
        ],
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
        { label: "启用日期", prop: "useDate", width: 200 },
        { label: "废止日期", prop: "desDate", width: 200 },
        { label: "销毁日期", prop: "desDate1", width: 200 },
        { label: "印章简称", prop: "sealName" },
        { label: "印章状态", prop: "sealStatus", width: 200 },
        { label: "使用单位", prop: "userJg", width: 200 },
        { label: "是否存放到用印机器", prop: "isLocate", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    reset() {
      this.formData = {
        yzType: "999",
        sealName: "",
        issJgId: "",
        issJg: "",
        useJgId: "",
        useJg: "",
        isLocate: "",
        draftOrgan: "",
        draftOrganId: ""
      };
      this.loadData();
    },
    btnevent(params) {
      console.log(params.prop);
      switch (params.prop) {
        case "$selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true;
          break;
        case "$selectNeedOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgNeedTree = true;
          break;
        case "$selectSeepOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgSeepTree = true;
          break;
        case "sealName":
          this.formData["sealName"] = params.value;
          break;
      }
    },
    changeTime(val) {
      console.log(val);
      if (val == null) {
        this.formData.useDate = "";
        this.formData.useDateStart = "";
        this.formData.useDateEnd = "";
      }
    },
    changeDate(val) {
      if (val == null) {
        this.formData.desDate = "";
        this.formData.desDateStart = "";
        this.formData.desDateEnd = "";
      }
    },
    changeYear(val) {
      console.log(val);
      // this.formData.desDate1 = val;
      if (val == null) {
        this.formData.desDate1 = "";
        this.formData.desDate1Start = "";
        this.formData.desDate1End = "";
      }
    },
    //获取机构树
    getOrgList(org) {
      console.log(org, org.unitName);
      if (this.orgOrDeptId == "1") {
        // this.$set(this.formData, "useJg", org.unitName);
        this.$refs.searchForm.setText("issJg", org.unitName);
        this.$set(this.formData, "issJgId", org.id);
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
    getOrgNeedList(org) {
      console.log(org, org.unitName);
      if (this.orgOrDeptId == "1") {
        // this.$set(this.formData, "useJg", org.unitName);
        this.$refs.searchForm.setText("useJg", org.unitName);
        this.$set(this.formData, "useJgId", org.id);
      } else {
        let deptId = [];
        let deptName = [];
        org.map(item => {
          deptId.push(item.id);
          deptName.push(item.unitName);
        });
        this.$refs.searchForm.setText("draftDepartment", deptName.join(","));
        this.$set(this.formData, "draftDepartmentId", deptId.join(","));
      }
    },
    getOrgSeepList(org) {
      console.log(org, org.unitName);
      if (this.orgOrDeptId == "1") {
        // this.$set(this.formData, "useJg", org.unitName);
        this.$refs.searchForm.setText("draftOrgan", org.unitName);
        this.$set(this.formData, "draftOrganId", org.id);
      } else {
        let deptId = [];
        let deptName = [];
        org.map(item => {
          deptId.push(item.id);
          deptName.push(item.unitName);
        });
        this.$refs.searchForm.setText("draftDepartment", deptName.join(","));
        this.$set(this.formData, "draftDepartmentId", deptId.join(","));
      }
    },
    submit(params) {
      this.loadData();
    },
    loadData() {
      if (this.formData.useDate) {
        this.formData.useDateStart = this.formData.useDate[0];
        this.formData.useDateEnd = this.formData.useDate[1];
      }
      if (this.formData.desDate) {
        this.formData.desDateStart = this.formData.desDate[0];
        this.formData.desDateEnd = this.formData.desDate[1];
      }
      if (this.formData.desDate1) {
        this.formData.desDate1Start = this.formData.desDate1[0];
        this.formData.desDate1End = this.formData.desDate1[1];
      }
      this.formData.draftOrganId = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitId;
      this.$api.sealManage.sealStatistical
        .searchRegister(
          { ...this.formData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "list");
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableData.map(item => {
            item.isLocate =
              item.isLocate === "0" ? "否" : item.isLocate === "1" ? "是" : "";
            item.sealStatus =
              item.sealStatus == "A01"
                ? "未启用"
                : "" || item.sealStatus == "A02"
                ? "启用"
                : "" || item.sealStatus == "A03"
                ? "废止"
                : "" || item.sealStatus == "A04"
                ? "销毁"
                : "" || item.sealStatus == "A05"
                ? "实物档案"
                : "";
            console.log(item.sealStatus, "item.sealStatus");
          });
        });
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
        query: {id:id}
      });
      window.open(routeData.href, "_blank");
      
    },
    cellClick(row) {
      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/useSeal/draft/sealRegister",
      //   query: { id: row.id }
      // });
      // 不允许打开同一页面
      this.handleOpenPage('/sealManage/useSeal/draft/sealRegister', row.id)
    },
    exportTables() {
      // if (this.tableData.length == 0) {
      //   return;
      // }
      exportTable.exportExcel("印章登记查询结果");
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
