<template>
  <div>
    <div class="btn">
      <el-button type="primary" @click="addgroup" icon="el-icon-circle-plus-outline">新增群组</el-button>
      <el-button type="primary" @click="del">批量删除</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width:100%"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :default-sort="{ prop: 'sorting', order: 'descnding' }"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="zuqunName" label="群组名称">
        <template slot-scope="scope">
          <el-button type="text" @click="groupDetail(scope.row.id)">{{ scope.row.zuqunName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="peizhiPeople" align="center" label="可见范围"></el-table-column>
      <el-table-column prop="sorting" sortable label="排序"></el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="getListParams.page"
      :page-sizes="[10,20,30,40]"
      :page-size="getListParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // this.$businessCode
      getListParams: {
        function: "findAll",
        page: 1,
        limit: 10
      },
      delParams: {
        function: "delete",
        ids: ""
      },
      total: 0,
    };
  },
  created() {
    this.haveTableData();
  },
  methods: {
    //初始化表格数据
    haveTableData() {
      this.$post
        .postData(
          "findAll",
          JSON.stringify(this.getListParams),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //表格当前选中
    handleSelectionChange(val) {
      console.log(val);
      var checklist = val.map(el => {
        return el.id;
      });
      console.log(checklist)
      this.delParams.ids = checklist.join(";");
      console.log(this.delParams);
    },
    //新增群组
    addgroup() {
      // this.$router.push({ name: "groupDetail" });
      const routeData = this.$router.resolve({
        path: "/groupDetail"
      });
      window.open(routeData.href, "_blank");
    },
    //批量删除
    del() {
      this.$post
        .postData(
          "delete",
          JSON.stringify(this.delParams),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.haveTableData()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看群组
    groupDetail(id) {
      // this.$router.push({ name: "groupDetail", query: { id: id } });
      const routeData = this.$router.resolve({
        path: "/groupDetail",
        query: { id: id }
      });
      window.open(routeData.href, "_blank");
    },
    //分页
    handleSizeChange(val) {
      this.getListParams.limit = val;
      this.haveTableData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getListParams.page = val;
      this.haveTableData();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang='less' scoped>
.btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

/deep/.el-table .cell{
  white-space: nowrap !important;
}
</style>