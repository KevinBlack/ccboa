
<!--
 * @Author: your name
 * @Date: 2020-10-08 15:31:50
 * @LastEditTime: 2020-12-16 19:37:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\editJournal\browsing\laigao.vue
--> 
<template>
  <div class="itemTable">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
         <el-table-column type="index" label="序号" width="80"></el-table-column>
    <el-table-column
      prop="name"
      label="开始时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="结束时间">
    </el-table-column>
	<el-table-column
      prop="address"
      label="倒入用时">
    </el-table-column>
	<el-table-column
      prop="address"
      label="倒入总计">
    </el-table-column>
	<el-table-column
      prop="address"
      label="处理失败">
    </el-table-column>
	<el-table-column
      prop="address"
      label="处理成功">
    </el-table-column>
	<el-table-column
      prop="address"
      label="创建成功">
    </el-table-column>
	<el-table-column
      prop="address"
      label="更新成功">
    </el-table-column>
	<el-table-column
      prop="address"
      label="倒入速度(秒/条)" width="150">
    </el-table-column>
	<el-table-column
      prop="address"
      label="操作人">
    </el-table-column>
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
  name: "itemTable",
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
      this.$intent.goNewPage(this, {
        path: "/publication/parameter/review/reviewIdea",
        params: {},
        query: {
          queryItem: "new"
        }
      });
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
      this.$router.push({
        path: "/publication/parameter/review/reviewIdea",
        query: {
          queryItem: "cellClick",
          row1: row.opinionId
        }
      });
    },
    add_btn() {
      this.$router.push({
        path: "/approval/parameter/apply/save"
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




