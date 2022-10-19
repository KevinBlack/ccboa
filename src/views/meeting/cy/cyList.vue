/**
* create by zx on 2020/7/29 16:52
* 类注释：
* 备注：
*/
<template>
  <div class="cyList">
    <el-tabs v-model="sonselect" @tab-click="handleClick">
      <el-tab-pane label="全部" name="3"></el-tab-pane>

      <el-tab-pane label="未阅" name="0">
        <span slot="label">
          未阅
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
      </el-tab-pane>
      <el-tab-pane label="已阅" name="1"></el-tab-pane>
      <el-tab-pane label="办结" name="2"></el-tab-pane>
      <!-- <el-col class="mt20end"></el-col> -->
    </el-tabs>
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :isHandle="false"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :default-sort="{prop:'sendDate',order:'desc'}"
      :tableRowClassNames="tableRowClassName"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: "cyList",
  components: {
    mTable,
  },
  props: {},
  mixins:[bianhanPublic],
  data() {
    return {
      needTodoNum: 0,
      sonselect: 0,
      type: 1,
      selectIndex: 0,
      searchData: {
        sort: "desc",
        sortKey: "sendDate",
      },
      tableData: [],
      tableCols: [
        { label: "传阅日期", prop: "sendDate", width: 260 },
        { label: "名称", prop: "title", minwidth: 338 },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            return row.type == "培训会议通知" ? "培训通知" : row.type;
          },
          width: 260,
        },
        { label: "主办部门", prop: "maindept", width: 260 },
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    tableRowClassName(row) {
      if (
        row.isOpen == "0" &&
        (this.sonselect == "0" || row.isReadflag == "0")
      ) {
        return "warning-row";
      }
    },
    setSelect(index) {
      if (this.selectIndex == index) return;
      this.selectIndex = index;
    },
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      this.searchData.sutType = this.sonselect;
      this.$api.meeting
        .circulationTable(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          // this.result = res.data
          this.pagination.total = res.total;
          this.tableData = res.data;
          if (this.sonselect == "0") {
            this.needTodoNum = res.total;
          }
        });
    },
    cellClick(row, column, cell, event) {
      // this.$intent.goNewPage(this, {
      //   path: "/meeting/cyDetial",
      //   query: { id: row.id, type: row.type },
      // });
       this.hasOpened(row.id, {
              'name': "cyDetial",
              'query': {
                'id': row.id,
                'type': row.type
              }
            })
    },
    handleClick(tab, event) {
      this.loadData();
    },
    select(rows) {
      // let row = rows[0]
      // this.ch = row.returnCn
      // this.en = row.returnEn
      // this.value = row.isNecess
      // this.rowIndex = row.index
      // this.rowArr = rows
      // console.log(this.rowIndex)
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
    // console.log(this.sonselect)
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cyList {
  .memo_tab {
    width: 100%;
    display: flex;
    padding: 10px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #dcdcdc;

    .tab_selected {
      padding: 0 20px;
      margin-left: 30px;
      line-height: 40px;
      font-size: 24px;
      color: #4a4a4a;
      display: flex;
      cursor: pointer;

      .selectedbox {
        color: #4c8bfd;
      }

      span {
        display: block;
        width: 30px;
        height: 16px;
        font-size: 12px;
        color: #fff;
        background: #4c8bfd;
        border-radius: 6px;
        text-align: center;
        line-height: 16px;
        margin-top: 12px;
        margin-left: 12px;
      }
    }
  }
}
</style>
