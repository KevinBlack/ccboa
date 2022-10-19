<!--
 * @Author: your name
 * @Date: 2021-10-11 11:05:24
 * @LastEditTime: 2021-10-21 14:18:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboaweb-dev-20211120fenku\src\views\bianhan\circulatetable\circulatetable.vue
--> 
<template>
  <div id="bh_cy">
    <el-tabs v-model="sonselect" @tab-click="handleClick">
      <el-tab-pane label="全部" name="2"></el-tab-pane>
      <el-tab-pane name="0">
        <span slot="label">
          未阅
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
      </el-tab-pane>
      <el-tab-pane label="已阅" name="1"></el-tab-pane>
      <el-tab-pane label="办结" name="9"></el-tab-pane>
    </el-tabs>
    <m-table
      @refresh="loadData"
      @cellClick="jumpdeal"
      :isHandle="false"
      :isIndex="true"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :tableRowClassNames="tableRowClassName"
       :default-sort="{prop:'sendTime',order:'desc'}"
    ></m-table>
  </div>
</template>
<style lang="css">
  #bh_cy .el-table .caret-wrapper{
    opacity:0 !important;
  }
</style>
<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: "circulatetable",
  components: {
    mTable
  },
  data() {
    return {
      sonselect: "0",
      needTodoNum: 0,
      searchData: {},
      tableData: [],
      tableCols: [
        { label: "传阅日期", prop: "sendTime",width:160 },
        { label: "编号", prop: "documentNo",minwidth:200 },
        { label: "标题", prop: "title",minwidth:438 },
        { label: "拟稿部门", prop: "draftDepartment" }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  mixins: [bianhanPublic],
  methods: {
    handleClick(tab) {
      this.pagination = {
        pageNum: 1,
        pageSize: 20
      };
      this.loadData();
    },
    tableRowClassName(row) {
      if (row.isRead == "0" && (this.sonselect == "0" || row.type == "0")) {
        return "warning-row";
      }
    },
    loadData() {
      this.searchData.type = this.sonselect;
      this.$api.bianhan
        .chuanyueList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          if (this.sonselect === "0") {
            this.needTodoNum = res.total;
          }
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    jumpdeal(val) {
      if(this.sonselect==0||this.sonselect==1&&val.isReadflag==0){
          this.hasOpened(val.id,{
            'name': "circulate",
            'query':{ id: val.id, type: this.sonselect, cyType: val.cyType, finishTime: val.finishTime }
          })
      }else{
      this.$intent.goNewPage(this, {
        path: "/circulate",
        query: { id: val.id, type: this.sonselect, cyType: val.cyType, finishTime: val.finishTime }
      });
      }

    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style scoped lang="less">
</style>
