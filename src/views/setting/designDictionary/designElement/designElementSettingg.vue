<!--
 * @Author: nwl
 * @Date: 2020-08-05 19:33:27
 * @LastEditTime: 2020-08-25 17:24:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\designDictionary\moduleConfig.vue
-->
<template>
  <div class="content">
    <div class="btn-list">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="searchData.designSetName" @keyup.enter.native="loadData"></el-input>
        </el-col>
        <el-button @click="loadData" type="primary">查询</el-button>
      </el-row>
    </div>
    <div class="btn-list">
      <div class="btnAdd" @click="btnAdd">+</div>
      <div class="btnDel" @click="btnDel">删除</div>

    </div>
    <div>
      <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        size="medium"
        :searchData="searchData"
        :isPagination="true"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
        @select="select"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
export default {
  components: {
    mTable,
  },
  props: {},
  data () {
    return {
      theSelect: [],
      searchData: {},
      tableCols: [
        { label: "编号", prop: "number" },
        { label: "设计元素集合名称", prop: "designSetName" },
        { label: "设计元素集合ID", prop: "designSetId" },
      ],
      tableData: [],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize:10,
      },
    };
  },
  computed: {},
  methods: {
    select (rows, row) {
      this.theSelect = rows.map((item) => {
        return item.id;
      });
    },
    btnDel () {
      if (this.tableData.length == 0) {
        this.$message({
          type: "error",
          message: "目前无数据",
        });
        return
      }
      if (this.theSelect.length) {
        this.$api.designDictionary
          .designElementDelete({
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
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    cellClick (row, column, cell, event) {
      let id = this.tableData[row.index].id;
      this.$router.push({
        name: "designElementSetting",
        query: { id },
      });
    },
    btnAdd () {
      this.$router.push({
        name: "designElementSetting",
        query: {},
      });
    },
    loadData () {
      this.$api.designDictionary
        .designElementList(
          { designConfigOrderVo: this.searchData },
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
  activated () { },
  mounted () {
    this.loadData();
  },
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
