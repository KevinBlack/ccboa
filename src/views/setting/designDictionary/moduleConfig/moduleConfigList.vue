<!--
 * @Author: nwl
 * @Date: 2020-08-05 19:33:27
 * @LastEditTime: 2020-10-22 15:45:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\designDictionary\moduleConfig.vue
-->
<template>
  <div class="content">
    <p class="base-title">模块配置</p>
    <div class="btn-list">
      <el-button type="primary" @click="toAdd">新建</el-button>
      <el-button type="danger" @click="deleteIt">删除</el-button>
    </div>
    <div>
      <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        size="medium"
        :isPagination="true"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
        @select="select"
        :searchData="searchData"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import beanList from "../../../../util/beanList";

export default {
  name: "empty",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: {},
      theSelect: [],
      tableCols: [
        {
          label: "模块分类",
          prop: "moduleType",
          formatter: (row) => {
            return beanList.moduleType[row.moduleType];
          },
        },
        { label: "模块名称", prop: "moduleName" },
        { label: "模块关键字", prop: "moduleKeyWord" },
        { label: "是否有转授权", prop: "isHaveAgent" },
      ],
      tableData: [],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    select(rows, row) {
      this.theSelect = rows.map((item) => {
        return item.id;
      });
    },
    deleteIt() {
      if (this.tableData.length == 0) {
        this.$message({
          type: "error",
          message: "目前无数据",
        });
        return;
      }
      if (this.theSelect.length) {
        this.$confirm("是否确认要删除选中业务？").then(() => {
          this.$api.designDictionary
            .moduleSettingDelete({
              ids: this.theSelect,
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.loadData();
              this.theSelect = [];
            });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    cellClick(row) {
      this.$router.push({
        name: "moduleConfigAdd",
        query: { id: row.id },
      });
    },
    toAdd() {
      this.$router.push({
        name: "moduleConfigAdd",
        query: {},
      });
    },
    loadData() {
      this.$api.designDictionary
        .moduleSettingList1(
          { moduleConfig: this.searchData },
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
  },
  activated() {},
  mounted() {
    this.loadData();
  },
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  line-height: 36px;

  .base-title {
    width: 100%;
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }

  .btn-list {
    margin: 16px 0px;

    .btnAdd {
      display: inline-block;
      line-height: 1;
      width: 85px;
      line-height: 28px;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 2px dashed #409eff;
      color: #409eff;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 3px;
      transition: 0.1s;
      font-weight: 500;
      margin-right: 10px;
    }

    .btnDel {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      width: 90px;
      line-height: 30px;
      background: #fff;
      border: 2px solid #409eff;
      color: #409eff;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 3px;
      transition: 0.1s;
      font-weight: 500;
    }
  }
}
</style>
