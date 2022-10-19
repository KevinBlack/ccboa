<template>
  <div class="deptList">
    <m-table
      @refresh="loadData()"
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

export default {
  name: "orgAlterationsLists",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: { unitClass: 1, sysChange: 1 },
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
        name: "orgAlterationsInfo",
        query: { detail: JSON.stringify(row) },
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
