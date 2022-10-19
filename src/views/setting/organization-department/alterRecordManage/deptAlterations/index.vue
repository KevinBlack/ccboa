<!--
 * @Author: your name
 * @Date: 2020-10-15 11:16:46
 * @LastEditTime: 2020-10-16 15:28:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\setting\organization-department\alterRecordManage\deptAlterations\index.vue
-->
<template>
  <div class="deptList">
    <el-row style="padding: 20px">
      <el-col :span="6">
        <!-- <select-org-or-dept @select="selectOrg" :orgOrDept="null" >
          <el-input type="text" readonly="readonly" placeholder="请选择" v-model="searchData.orgName" suffix-icon="el-icon-arrow-down"/>
        </select-org-or-dept>-->
      </el-col>
    </el-row>
    <m-table
      @refresh="loadData()"
      :isPagination="true"
      @cellClick="getRowData"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
// import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "deptAlterationsLists",
  components: {
    mTable,
    // selectOrgOrDept
  },
  props: {},
  data() {
    return {
      num: 3,
      value: "",
      selectRowData: null,
      searchData: {
        newUnitClass: 0,
        unitCode: "",
      },
      options: [],
      tableData: [],
      tableCols: [
        { label: "操作类型", prop: "operateType" },
        { label: "操作时间", prop: "operateTime" },
        { label: "操作人", prop: "operatorName" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.unitCode = org.id;
      this.loadData();
    },
    loadData() {
      this.$api.setting.changeOrgDe
        .deparAlterList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    getRowData(row) {
      this.$intent.go(this, {
        name: "deptAlterationsInfo",
        query: { detail: JSON.stringify(row) },
      });
    },
  },
  activated() {},
  select() {},
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
