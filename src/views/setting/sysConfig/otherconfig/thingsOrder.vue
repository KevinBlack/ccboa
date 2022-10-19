<!--
 * @Author: wy
 * @Date: 2020-08-31 14:57:32
 * @LastEditTime: 2020-12-28 18:46:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\otherconfig\textNum\thingsOrder.vue
-->
<template>
  <div class="textNum">
    <el-row style="margin-bottom: 10px" :gutter="10">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg" :orgOrDeptId="'0'">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <el-button @click="add" type="primary">新增</el-button>
        <el-button @click="delItem" type="danger">删除</el-button>
      </el-col>
    </el-row>
    <m-table
      @cellClick="cellClick"
      @refresh="loadData"
      @select="select"
      :isSelection="true"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>
<script>
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "textNum",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  //JSON.parse(localStorage.getItem("userInfo")).unitName
  data() {
    return {
      orgOrDeptId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      searchData: {
        orgName: "",
        draftId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      },
      tableData: [],
      tableCols: [
        { label: "紧急级别", prop: "todoClass" },
        { label: "紧急参数", prop: "todoParameter" },
      ],
      pagination: {
        pageNum: 1,
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
        .getthingsOrderList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.draftId = org.id;
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.loadData();
      console.log("111111111111111111111111111111111");
    },
    //行点击事件
    cellClick(row) {
      this.$router.push({
        path: "/setting/sysConfig/otherconfig/editTextNum",
        query: { detail: JSON.stringify(row) },
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
      this.$router.push("/setting/sysConfig/otherconfig/thingsOrderDetail");
    },
    //删除
    delItem() {
      if (this.selectedRow.length == 0) {
        this.$message({
          type: "warning",
          message: "请勾选删除项",
        });
      } else {
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
      }
    },
  },
  mounted() {},
  created() {
    // this.loadData();
    console.log(this.$route.query, "111111");
    if (this.$route.query.draftName) {
      console.log("22222222");
      this.$set(this.searchData, "orgName", this.$route.query.draftName);
      this.$set(this.searchData, "draftId", this.$route.query.id);
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.loadData(), (this.$route.query = {});
    }
  },
};
</script>
<style scoped lang='less' rel='stylesheet/less'>
</style>
