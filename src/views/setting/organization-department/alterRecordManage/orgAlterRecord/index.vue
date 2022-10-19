<!--
 * @Author: your name
 * @Date: 2020-09-22 20:13:26
 * @LastEditTime: 2020-12-11 18:28:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\setting\organization-department\alterRecordManage\orgAlterRecord\index.vue
-->

<template>
  <!-- 新旧机构对应机构 -->
  <div class="orgList">
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isIndex="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";

export default {
  name: "orgAlterRecords",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: { unitClass: 1, sysChange: 1 },
      value: "",
      options: [
        {
          value: "1",
          label: "建行财产保险有限公司1",
        },
        {
          value: "2",
          label: "建行财产保险有限公司2",
        },
      ],
      tableCols: [
        { label: "创建日期", prop: "operateTime" },
        { label: "原机构全称", prop: "unitName" },
        { label: "新机构全称", prop: "newUnitName" },
        { label: "原机构简称", prop: "unitShort" },
        { label: "新机构简称", prop: "newUnitShort" },
      ],
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    cellClick(row) {
      this.$intent.go(this, {
        name: "orgAlterEdit",
        query: { detail: JSON.stringify(row) },
      });
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
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
