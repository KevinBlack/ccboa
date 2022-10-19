<template>
  <div class="check">
    <div style="margin: 20px 0">
      <el-select v-model="value1" placeholder="请选择" @change="loadData">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" style="margin-right:20px;margin-left:20px;" @click="add_btn">新增</el-button>
      <el-button type="danger" style="margin-right:20px;" @click="delete_btn">删除</el-button>
    </div>

    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
       :isIndex="true"
      :isSelection="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";

export default {
  name: "check",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: {},
      tableData: [],
      tableCols: [
        { label: "领导姓名", prop: "leaderCnName" },
        { label: "行领导秘书", prop: "secCnName" },
      ],
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 10,
      },
      options: [],
      value1: "收文",
      deleteArry: "",
    };
  },
  computed: {},
  methods: {
    loadData() {
      this.$api.secreatary.leaderActivity
        .getParamsList(
          {
            docType: this.value1,
            ...this.searchData
          },
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
    //点击详情
    cellClick(row) {
      let rowData = JSON.stringify(row);

      this.$router.push({
        path: "/LcheckDetail",
        query: {
          detail: JSON.stringify(rowData),
          isAdd: JSON.stringify(false),
        },
      });
     
    },
    select(row) {
      let dataArry = [];
      row.map(function (value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
      console.log(this.deleteArry);
    },
    // 新增
    add_btn() {
      // this.$intent.goNewPage(this, {
      //   path: "/LcheckDetail",
      //   query: { isAdd: JSON.stringify(true) },
      // });
      this.$router.push({
         path: "/LcheckDetail",
        query: { isAdd: JSON.stringify(true) },
      })
    },
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm("是否确定删除当前选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.secreatary.leaderActivity
              .delLeader({ id: this.deleteArry })
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
                this.loadData();
              });
          })
          .catch(() => {});
      } else {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据",
        });
      }
    },
    loadList() {
      this.$api.secreatary.leaderActivity.getLeaderSelect({}).then((res) => {
        let arr = [];
        res.data.map((item) => {
          let obj = {};
          obj.value = item.docType;
          obj.label = item.docType;
          arr.push(obj);
        });
        this.options = arr;
        console.log(this.options);
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
    this.loadList();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>

 

