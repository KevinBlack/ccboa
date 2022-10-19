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
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="formData.cdate"
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
        <el-col :span="10">
          <el-form-item label="处理完成时间">
            <el-date-picker
              v-model="formData.endTime"
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
      seletSelf: 1,
      startExport: false, //判断是否开始导出数据
      tipData: "", //导出数据时间段
      openshow: true,
      excelTitle: "",
      excelTableData: [],
      formData: {
        deviceNumber: "",
        sealName1: "",
        sqPerson: "",
        monitorName: "",
        maintainType: "999",
        YzDept: ""
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      formCfg: [
        {
          type: "input",
          prop: "deviceNumber",
          label: "印章设备名称",
          span: 20
        },
        {
          type: "input",
          prop: "sealName1",
          label: "印章名称",
          span: 20
        },
        {
          type: "input",
          prop: "sqPerson",
          label: "申请人",
          span: 20
        },
        {
          type: "input",
          prop: "monitorName",
          label: "监印人",
          span: 20
        },
        {
          type: "radios",
          prop: "maintainType",
          label: "维护类型",
          span: 10,
          options: {
            "999": "全部",
            初始配章: "初始配章",
            手工用印: "手工用印",
            故障维修: "故障维修"
          }
        },
        [
          {
            type: "input",
            prop: "YzDept",
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
        { label: "申请时间", prop: "cdate", width: 200 },
        { label: "维护完成时间", prop: "endTime", width: 200 },
        { label: "维护类型", prop: "maintainType", width: 200 },
        { label: "印章设备名称", prop: "deviceName" },
        { label: "印章名称", prop: "title" },
        { label: "手工用印时长", prop: "sgSc", width: 200 },
        { label: "申请人", prop: "sqPerson", width: 200 }
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
        this.formData.cdate = "";
        this.formData.cdateStart = "";
        this.formData.cdateEnd = "";
      }
    },
    changeDate(val) {
      if (val == null) {
        this.formData.endTime = "";
        this.formData.endTimeStart = "";
        this.formData.endTimeEnd = "";
      }
    },
    reset() {
      this.formData = {
        deviceNumber: "",
        sealName1: "",
        sqPerson: "",
        monitorName: "",
        maintainType: "999",
        YzDept: ""
      };
      this.loadData();
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selectDepar":
          this.title = "部门";
          this.isSingle = true;
          this.orgOrDept = 0;
          this.orgOrDeptId = "0";
          this.showOrgTree = true;
          break;
        case "documentNo":
          delete this.formData.documentNo;
          break;
        case "draftUser":
          delete this.formData.draftUser;
          break;
        case "deviceNumber":
          this.formData["deviceNumber"] = params.value;
          break;
        case "sealName1":
          this.formData["sealName1"] = params.value;
          break;
        case "sqPerson":
          this.formData["sqPerson"] = params.value;
          break;
        case "monitorName":
          this.formData["monitorName"] = params.value;
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
        // this.$refs.searchForm.setText("YzDept", deptName.join(","));
        // this.$set(this.formData, "YzDeptId", deptId.join(","));
        this.$refs.searchForm.setText("YzDept", org.unitName);
        this.$set(this.formData, "YzDeptId", org.id);
      }
    },
    submit(params) {
      this.loadData();
    },
    loadData() {
      if (this.formData.cdate) {
        this.formData.cdateStart = this.formData.cdate[0];
        this.formData.cdateEnd = this.formData.cdate[1];
      }
      if (this.formData.endTime) {
        this.formData.endTimeStart = this.formData.endTime[0];
        this.formData.endTimeEnd = this.formData.endTime[1];
      }
      this.$api.sealManage.sealStatistical
        .searchApply(
          { ...this.formData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "list");
          this.pagination.total = res.total;
          res.list.map(item => {
            item.sgSc = Number(item.sgSc).toFixed(2);
          });
          this.tableData = res.list;
        });
    },
    cellClick(row) {
      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/facilityManage/approval",
      //   query: { id: row.id, type: "全部" }
      // });
      let path;
      if (row.status == "1") {
        path =  "/sealManage/facilityManage/approval"
        this.handleOpenPage(path, row.id,"代办");
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/facilityManage/approval",
        //   query: { id: row.id, type: "待办" }
        // });
      } else if (row.status == "3") {
        path = "/sealManage/facilityManage/approval"
        this.handleOpenPage(path, row.id,"已办");
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/facilityManage/approval",
        //   query: { id: row.id, type: "已办" }
        // });
      } else if (row.status == "3") {
        path = "/sealManage/facilityManage/approval"
        this.handleOpenPage(path, row.id,"办结");
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/facilityManage/approval",
        //   query: { id: row.id, type: "办结" }
        // });
      }
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
        type:readType}
      });
      window.open(routeData.href, "_blank");
    },
    exportTables() {
      exportTable.exportExcel("用印记设备维护审批查询结果");
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
