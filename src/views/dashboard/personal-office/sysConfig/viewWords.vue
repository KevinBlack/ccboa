<template>
  <div>
    <el-button type="primary" style="margin-bottom:16px;" @click="createData">新建</el-button>
    <el-button type="danger" style="margin-bottom:16px;" @click="deleteData">删除</el-button>
    <div style="height:10px;width:100%;"></div>
    <m-table
      @refresh="loadData"
      size="medium"
      @select="select"
      :isPagination="true"
      :isHandle="false"
      :isSelection="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :searchData="searchData"
      @cellClick="jumpdeal"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";

export default {
  name: "wordsTable",
  components: {
    mTable
  },
  data() {
    return {
      searchData: {},
      tableData: [],
      tableCols: [
        { label: "序号", prop: "hyNo", width: 200 },
        { label: "批语内容", prop: "hyDnr" }
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20
      },
      deleteArry: ""
    };
  },
  methods: {
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      this.$api.dailyWork_sysConfig
        .perComWordsTable(
          {
            searchData: this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    createData() {
      this.$router.push({
        name: "comWords",
        query: {}
      });
    },
    jumpdeal(val) {
      this.$router.push({
        name: "comWords",
        query: { val: val }
      });
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    getRowDatas(row) {
      console.log("-----val----->", row);
    },
    deleteData() {
      if (!this.deleteArry) {
        this.$message({
          type: "warning",
          message: "请选择数据"
        });
      } else {
        this.$confirm("是否确定删除当前数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.dailyWork_sysConfig
              .deletePerComWords({ id: this.deleteArry })
              .then(res => {
                if (res.code == "SUCCESS") {
                  this.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  this.deleteArry = "";
                  this.loadData();
                }
              });
          })
          .catch(() => {});
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style scoped lang="less">
</style>
