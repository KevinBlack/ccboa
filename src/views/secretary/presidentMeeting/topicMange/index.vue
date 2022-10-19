<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-button type="primary" style="margin-left:20px;float:left" @click="exportData">导出</el-button>
        <el-tab-pane label="未上会" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已上会" name="tabs-sleep"></el-tab-pane>
        <el-date-picker
          style="float:right"
          v-model="value"
          type="year"
          @change="changeYear"
        ></el-date-picker>
      </el-tabs>
    </div>
    <m-table
      @refresh="loadData()"
      :isIndex="true"
      :isHandle="false"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import exportTable from "../../../../minixs/exportTable";
export default {
  name: "topicSub",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      activeName: "tabs-look",
      year: new Date().getFullYear().toString(),
      isSubmit: "0",
      ytStatus: "1",
      searchData: {
        sort: "desc",
        sortKey: "sbSj"
      },
      tableData: [
        // {deptName:'bm',sbSj:'sbSj',ytMc:'ytMc',curuserChinaName:'ming',tel:'ren',ytStats:'1'}
      ],
      tableCols: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "上报时间", prop: "sbSj", width: 200 },
        { label: "主汇报部门", prop: "deptName", width: 200 },
        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 },
        { label: "状态", prop: "ytStatus", width: 200 }
      ],
      tableCols0: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "上报时间", prop: "sbSj", width: 200 },
        { label: "主汇报部门", prop: "deptName", width: 200 },
        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 },
        { label: "状态", prop: "ytStatus", width: 200 }
      ],
      tableCols1: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "上报时间", prop: "sbSj" },
        { label: "上会时间", prop: "sbSj"},
        { label: "议题名称", prop: "ytMc" },
        { label: "主汇报部门", prop: "deptName" },
        { label: "主汇报人", prop: "strZhbr" },
        // { label: "会议名称", prop: "title" },
        { label: "联系人", prop: "curuserChinaName" },
        { label: "联系电话", prop: "tel" },
        { label: "列席部门", prop: "strLxName" },
        // {label: '列席人', prop: 'ytStatus'},
        { label: "状态", prop: "ytStatus" }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      options: [],
      value: ""
    };
  },
  computed: {},
  methods: {
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.isSubmit = "0";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols1);
        this.isSubmit = "1";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      }
    },
    exportData() {
      exportTable.exportExcel("议题管理", ".el-table");
    },
    select(row) {},
    changeYear() {
      this.year = this.value.getFullYear().toString();
      this.$api.secreatary.meetings
        .getTopicList(
          {
            curYear: this.year,
            isSubmit: this.isSubmit,
            ytStatus: this.ytStatus,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          res.data.map(item => {
            // item.sbSj = formatData(item.sbSj, 'YYYY-MM-DD')
            item.sbSj = item.sbSj
              ? formatData(item.sbSj, "YYYY-MM-DD HH:mm:ss")
              : "";
          });
          this.tableData = res.data;
        });
    },
    loadData() {
      this.$api.secreatary.meetings
        .getTopicList(
          {
            curYear: this.year,
            isSubmit: this.isSubmit,
            ytStatus: this.ytStatus,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          res.data.map(item => {
            item.sbSj = item.sbSj ? formatData(item.sbSj, "YYYY-MM-DD ") : "";
          });
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      this.$intent.goNewPage(this, {
        path: "/secretary/presidentMeeting/topicMange/topicMangeDetail",
        query: { id: row.id }
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


