/**
* create by zx on 2020/9/7 15:09
* 类注释：合署办公
* 备注：
*/
<template>
  <div class="index">
    <el-row style="margin-bottom: 10px" :gutter="20">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择"
            v-model="formData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="toAdd">新增</el-button>
        <el-button type="danger" @click="toDelete">删除</el-button>
      </el-col>
    </el-row>

    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      :isSelection="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>

    <!--    <iframe id="ifm" style="width:100%;height:600px" runat="server"></iframe>-->
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "index",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      formData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        sortKey: "",
        sort: "",
      },
      tableData: [],
      selectRow: [],
      tableCols: [
        { label: "序号", prop: "id" },
        { label: "机构名称", prop: "orgName" },
        { label: "合署部门", prop: "deptName" },
        { label: "合署部门名称", prop: "familyCode" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    select(rows) {
      let selctRows = [];
      rows.map((item) => {
        selctRows.push(item.id);
      });
      this.selectRow = selctRows;
    },
    selectOrg(org) {
      this.formData.orgName = org.unitName;
      this.formData.orgCode = org.id;
      this.loadData();
    },
    loadData() {
      this.formData.searchData = deepClone(this.formData);
      this.$api.setting.organization
        .getBelongWorkList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    cellClick(row) {
      this.$intent.go(this, {
        path: "/setting/orgDepartment/belongingWork/detail",
        query: { detail: JSON.stringify(row) },
      });
    },
    toAdd() {
      this.$intent.go(this, {
        path: "/setting/orgDepartment/belongingWork/detail",
      });
    },
    toDelete() {
      if (this.selectRow.length == 0) {
        this.$message({ type: "error", message: "请先选择要删除的文档！" });
        return;
      }
      this.$confirm("是否要删除选中的文档?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.setting.organization
          .belongWorkDelete({ id: this.selectRow.join(",") })
          .then((res) => {
            this.loadData();
          });
      });
    },
  },
  activated() {},
  mounted() {
    // $("#ifm").attr("src", 'http://128.192.156.220:8101/ecpweb/page/bsmp/queryStat/sealLifecycleQuery.jsp');//JQuery动态加载iframe。
  },
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
