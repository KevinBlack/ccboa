
<!--
 * @Author: your name
 * @Date: 2020-10-08 15:31:50
 * @LastEditTime: 2020-12-16 19:37:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\editJournal\browsing\laigao.vue
--> 
<template>
  <div class="templateSty">
    <div style="margin: 15px 0">
      <el-button type="primary" style="margin-left:20px;" @click="create_btn">新建</el-button>
      <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="300"></el-table-column>
      <el-table-column property="name" label="模板分类" width="500"></el-table-column>
      <el-table-column property="date" label="创建日期" width="1000"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
// import mTable from '@/components/table/tTable'

export default {
  name: "templateSty",
  //   components: {
  //     mTable,
  //   },
  props: {},
  data() {
    return {
      page: 1, //当前页数
      limit: 10, //每页条数
      total: 0
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.initData();
    },
    create_btn() {
        this.$router.push({
        path: "/secretary/templateDetail"
      });
      // this.$intent.goNewPage(this, {
      //   path: "/secretary/templateDetail",
      //   params: {},
      //   query: {
      //     queryItem: "new"
      //   }
      // });
    },
    //初始化列表
    loadData() {
      this.$api.paraMeter
        .pinshenyjlist(
          {},
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          // console.log(res)
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      const routeData = this.$router.resolve({
          path: "/secretary/templateDetail",
          query: {
            id: row.id,
            mainDocId: row.mainDocId,
            multiTenancyId: row.multiTenancyId,
            state: 2,
            readFlag: row.readFlag
          }
        });
        window.open(routeData.href, "_blank");
      // this.$router.push({
      //   path: "/secretary/templateDetail",
      //   query: {
      //     queryItem: "cellClick",
      //     row1: row.opinionId
      //   }
      // });
    },
    add_btn() {
      this.$router.push({
        path: "/secretary/templateDetail"
      });
    },
    select(row) {
      // let arr = {};
      let arrs = [];
      row.map(item => {
        console.log(item);
        // this.$set(arr,'opinionId',item.opinionId)
        arrs.push(item.opinionId);
      });
      this.opinionIdArr = arrs;
    },
    //评审详情
    delete_btn() {
      if (this.opinionIdArr.length == 0) {
        this.$message.error("请选择要删除的数据");
        return;
      }
      this.$confirm("确认删除评审意见?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.paraMeter
            .pinshenyjDel({ opinionIdArr: this.opinionIdArr })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.loadData();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




