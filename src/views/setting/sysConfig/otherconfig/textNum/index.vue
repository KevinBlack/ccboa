<!--
 * @Author: wy
 * @Date: 2020-08-31 14:57:32
 * @LastEditTime: 2020-11-03 14:33:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\otherconfig\textNum\index.vue
-->
<template>
  <div class="textNum">
    <div style="marginBottom:12px">
      <el-select
        style="margin-right: 10px"
        v-model="searchData.unitNameId"
        placeholder="请选择机构"
        @change="unitChange()"
      >
        <el-option
          v-for="item in searchOrgOptions"
          :key="item.unitNameId"
          :label="item.unitName"
          :value="item.unitNameId"
        ></el-option>
      </el-select>
    </div>

    <div style="marginBottom:6px">
      <el-button @click="add" type="primary">新增</el-button>
      <el-button @click="delItem" type="danger">删除</el-button>
    </div>
    <m-table
      @cellClick="cellClick"
      @refresh="loadData"
      @select="select"
      size="medium"
      :sortable="true"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>
<script>
import mTable from "components/table/tTable";
export default {
  name: "textNum",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: {},
      //机构下拉框
      searchOrgOptions: [],
      tableData: [],
      tableCols: [
        { label: "不能包含的关键字", prop: "unContainsKeys" },
        { label: "字数最小个数", prop: "minZs" },
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
      //删除传的参数
      selectedRow: [],
    };
  },
  computed: {},
  methods: {
    loadData() {
      this.$api.setSysConfig
        .getTextNumList(
          { ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total;
          this.tableData = JSON.parse(JSON.stringify(res.data));
        });
    },
    //机构下拉框change事件
    unitChange() {
      this.loadData();
    },
    //行点击事件
    cellClick(row) {
      console.log(row);
      this.$router.push({
        path: "/setting/sysConfig/otherconfig/editTextNum",
        query: {
          id: row.id,
          minZs: row.minZs,
          unContainsKeys: row.unContainsKeys,
          unitNameId: row.unitNameId,
        },
      });
    },
    select(row) {
      this.selectedRow = [];
      row.map((item) => {
        this.selectedRow.push(item.id);
      });
    },
    //新增
    add() {
      this.$router.push("/setting/sysConfig/otherconfig/editTextNum");
    },
    //删除
    delItem() {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.setSysConfig
            .delTextNum({ id: this.selectedRow })
            .then((res) => {
              this.loadData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.$api.setSysConfig
      .getTextNumList(
        {},
        {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        }
      )
      .then((res) => {
        this.searchOrgOptions = res.data.one;
        this.$set(this.searchData, "unitNameId", res.data.one[0].unitNameId);
        this.loadData();
      });
  },
  created() {},
};
</script>
<style scoped lang='less' rel='stylesheet/less'>
</style>
