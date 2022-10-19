/**
* create by zx on 2020-6-29 14:28
* 类注释：
* 备注：
*/
<template>
  <div class="sleepList">
    <el-row style="padding: 20px">
      <el-col :span="12">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary">解冻</el-button>
        <el-button type="primary">导出</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <label style="margin-right: 10px">快速查询</label>
        <el-input style="width: 300px;margin-right: 10px"></el-input>
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/mTable";

export default {
  name: "sleepList",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: {
        frozenStatus: 1,
      },
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      tableData: [],

      tableCols: [
        { label: "系统注册名", prop: "account" },
        { label: "中文名", prop: "humanName" },
        { label: "所在行", prop: "humanOrgName" },
        { label: "所在部门", prop: "humanDeptName" },
        { label: "未登录天数", prop: "frozenDay" },
      ],
      pagination: {
        pageNum: 1,
        total: 55,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    loadData() {
      this.$api.setting.organization
        .getPeopleList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.totla = res.total;
        });
    },
    cellClick(row) {
      this.$intent.go(this, {
        name: "editPerson",
        query: { detail: JSON.stringify(row), isAdd: JSON.stringify(false) },
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
