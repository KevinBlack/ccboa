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
          <el-form-item label="启用时间">
            <el-date-picker
              v-model="formData.useDate"
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
        jigou: "",
        jigouId: "",
        deviceStatus: "999",
        deviceNumber: "",
        deviceType: ""
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      formCfg: [
        {
          type: "input",
          prop: "deviceType",
          label: "设备型号",
          span: 20
        },
        {
          type: "input",
          prop: "deviceNumber",
          label: "设备编号",
          span: 20
        },
        [
          {
            type: "input",
            prop: "jigou",
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
          { type: "formitem", label: "使用机构" }
        ],
        {
          type: "radios",
          prop: "deviceStatus",
          label: "设备状态",
          span: 10,
          options: { "999": "全部", 启用: "启用", 禁用: "禁用" }
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
        // { label: "启用日期", prop: "useDate" },
        { label: "设备名称", prop: "title" },
        { label: "设备型号", prop: "deviceType", width: 200 },
        { label: "设备编号", prop: "deviceNumber", width: 200 },
        { label: "使用机构", prop: "useJg" },
        { label: "设备状态", prop: "deviceStatus", width: 200 }
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
        jigou: "",
        jigouId: "",
        deviceStatus: "999",
        deviceNumber: "",
        deviceType: ""
      };
      this.loadData();
    },
    changeTime(val) {
      console.log(val);
      if (val == null) {
        this.formData.useDate = "";
        this.formData.useDateStart = "";
        this.formData.useDateEnd = "";
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
          if (!this.formData.jigouId) {
            this.$message({
              message: "请先选择机构",
              type: "warning"
            });
            return;
          }
          this.title = "部门";
          this.isSingle = true;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.formData.jigouId;
          this.showOrgTree = true;
          break;
        case "documentNo":
          delete this.formData.documentNo;
          break;
        case "draftUser":
          delete this.formData.draftUser;
          break;
        case "deviceType":
          this.formData["deviceType"] = params.value;
          break;
        case "deviceNumber":
          this.formData["deviceNumber"] = params.value;
          break;
      }
    },
    //获取机构树
    getOrgList(org) {
      console.log(org, org.unitName);
      if (this.orgOrDeptId == "1") {
        // this.$set(this.formData, "useJg", org.unitName);
        this.$refs.searchForm.setText("jigou", org.unitName);
        this.$set(this.formData, "jigouId", org.id);
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
      if (this.formData.useDate) {
        this.formData.useDateStart = this.formData.useDate[0];
        this.formData.useDateEnd = this.formData.useDate[1];
      }
      this.$api.sealManage.sealStatistical
        .searchFacility(
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
    cellClick(row) {
      this.$router.push({
        path: "/sealManage/facilityManage/register",
        query: { id: row.id }
      });
    },
    exportTables() {
      // if (this.tableData.length == 0) {
      //   return;
      // }
      exportTable.exportExcel("用印记设备查询结果");
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
