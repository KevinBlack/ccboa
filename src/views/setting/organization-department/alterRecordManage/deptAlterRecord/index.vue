<template>
  <!-- 部门对应记录 -->
  <div class="orgList">
    <!--<el-row style="padding: 20px">
      <el-col :span="6">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <slot name="addBtns"></slot>
    </el-row>-->
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isIndex="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";

export default {
  name: "orgAlterRecords",
  components: {
    mTable,
  },
  props: {
    typeNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      searchData: {},
      value: "",
      options: [
        {
          value: "1",
          label: "建行财产保险有限公司1",
        },
        {
          value: "2",
          label: "建行财产保险有限公司2",
        },
      ],
      tableCols: [
        { label: "创建日期", prop: "operateTime" },
        { label: "原部门全称", prop: "unitName" },
        { label: "新部门全称", prop: "newUnitName" },
        { label: "原部门全层次名称", prop: "unitLevel" },
        { label: "新部门全层次名称", prop: "newUnitLevel" },
      ],
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    cellClick(row) {
      this.$intent.go(this, {
        path: "/setting/orgDepartment/alterRecord/alterDeptRecord/list/edit",
        query: { detail: JSON.stringify(row) },
      });
    },
    loadData() {
      this.$api.setting.changeOrgDe
        .deparAlterList(
          {
            ...this.searchData,
            newUnitClass: 0,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    select(row) {},
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
