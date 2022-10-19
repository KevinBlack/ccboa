<template>
  <div class="content">
    <div>
      <fd-form
        @event="btnevent"
        style="margin: 15px 0 15px 0;"
        :columns="[
        [
            {type: 'button-primary', prop: '$createdata', value: '新建'},
            {type: 'button-danger', prop: '$deletedata', value: '删除'},
        ]
    ]"
      />
    </div>
    <m-table
      @refresh="loadData"
      :isSelection="true"
      :isIndex="true"
      @select="selectRow"
      @searchData="searchData"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import FdForm from "vue-elementui-freedomen/components/form";

export default {
  name: "systable",
  components: {
    mTable,
    FdForm,
  },
  props: {},
  data() {
    return {
      rows: {},
      searchData: {},
      region: "",
      tableData: [],
      tableCols: [
        { label: "年度", prop: "year" },
        { label: "法定节假日", prop: "holidays" },
        { label: "调为工作日的休息日", prop: "workDays" },
        { label: "调为休息日的工作日", prop: "restDays" },
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
    };
  },
  methods: {
    loadData() {
      this.$api.setSysConfig
        .getHolidayList(
          {},
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    cellClick(row) {
      this.$intent.go(this, {
        path: "/setting/sysConfig/otherconfig/holiday/editor",
        query: { detail: JSON.stringify(row) },
      });
    },
    btnevent(params) {
      switch (params.prop) {
        case "$createdata":
          this.$router.push("/setting/sysConfig/otherconfig/holiday/editor");
          break;
        case "$deletedata":
          this.$confirm("是否删除数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              if (this.rows.length > 0) {
                let years = [];
                this.rows.forEach((item) => {
                  years.push(item.year);
                });
                this.$api.setSysConfig.deleteHoliday(years).then((res) => {
                  this.$message({
                    type: "success",
                    message: "删除成功",
                  });
                  this.loadData();
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
          break;
      }
    },
    selectRow(rows) {
      this.rows = rows;
    },
    submit() {
      console.log("------>");
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.content {
}
</style>
