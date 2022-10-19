/**
* create by zx on 2020/8/31 15:12
* 类注释：
* 备注：查询结果仅含‘制发’及‘承办’列表
*/
<template>
  <div class="annual_sear">
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
          <el-form-item label="到岗时间">
            <el-date-picker
              v-model="formData.daoGangDate"
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
          <el-form-item label="离岗时间">
            <el-date-picker
              v-model="formData.liGangDate"
              type="daterange"
              range-separator
              @change="changeDate"
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
      seletSelf: 1,
      startExport: false, //判断是否开始导出数据
      tipData: "", //导出数据时间段
      openshow: true,
      excelTitle: "",
      excelTableData: [],
      formData: {
        draftOrgan: "",
        draftOrganId: "",
        chineseNodeUser: ""
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      formCfg: [
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
        {
          type: "input",
          disabled: true,
          prop: "draftOrgan",
          label: "机构简称",
          span: 20
        },
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
          { type: "formitem", label: "部门名称" }
        ],
        {
          type: "input",
          prop: "chineseNodeUser",
          label: "姓名",
          span: 20
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
        { label: "到岗日期", prop: "daogangDate", width: 200 },
        { label: "离岗日期", prop: "ligangDate", width: 200 },
        { label: "机构名称", prop: "draftOrgan" },
        { label: "部门名称", prop: "draftDepartment" },
        { label: "姓名", prop: "chineseNodeUser", width: 200 },
        { label: "联系方式", prop: "lianXiFsh", width: 200 }
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
    changeTime(val) {
      console.log(val);
      if (val == null) {
        this.formData.daoGangDate = "";
        this.formData.daoGangDateStart = "";
        this.formData.daoGangDateEnd = "";
      }
    },
    changeDate(val) {
      if (val == null) {
        this.formData.liGangDate = "";
        this.formData.liGangDateStart = "";
        this.formData.liGangDateEnd = "";
      }
    },
    reset() {
      this.formData = {
        draftOrgan: "",
        draftOrganId: "",
        draftDepartment: "",
        draftDepartmentId: "",
        chineseNodeUser: ""
      };
      this.loadData();
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
        case "chineseNodeUser":
          this.formData["chineseNodeUser"] = params.value;
          break;
      }
    },
    //获取机构树
    getOrgList(org) {
      console.log(org, org.unitName);
      if (this.orgOrDeptId == "1") {
        // this.$set(this.formData, "draftOrgan", org.unitName);
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
      if (this.formData.daoGangDate) {
        this.formData.daoGangDateStart = this.formData.daoGangDate[0];
        this.formData.daoGangDateEnd = this.formData.daoGangDate[1];
      }
      if (this.formData.liGangDate) {
        this.formData.liGangDateStart = this.formData.liGangDate[0];
        this.formData.liGangDateEnd = this.formData.liGangDate[1];
      }
      this.$api.sealManage.sealStatistical
        .searchKeeper(
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
      console.log(row, "每一行");
      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/keeperRegister/keeperRegisterForm",
      //   query: { id: row.id }
      // });
      // 不允许打开同一页面
      this.handleOpenPage('/sealManage/keeperRegister/keeperRegisterForm', row.id)
    },
    exportTables() {
      exportTable.exportExcel("印章保管人查询结果");
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
