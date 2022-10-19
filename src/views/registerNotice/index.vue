<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="未报名" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已报名" name="tabs-sleep"></el-tab-pane>
        <el-row>
          <el-date-picker v-model="value" @change="changeYear" type="year"></el-date-picker>
          <el-button type="primary" style="margin-left:20px;float:right" @click="exportData">导出</el-button>
        </el-row>
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
      :tableRowClassNames="tableRowClassName"
    ></m-table>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import exportTable from "@/minixs/exportTable";
import bianhanPublic from "@/minixs/bianhan";
export default {
  name: "registerNotice",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      year: new Date().getFullYear().toString(),
      value: "",
      activeName: "tabs-look",
      searchData: {
        sort: "desc",
        sortKey: "sendTime"
      },
      searchData1: {
        sort: "desc",
        sortKey: "sendTime"
      },
      searchData2: {
        sort: "desc",
        sortKey: "bmTime"
      },
      tableData: [
        // {st:'st',mc:'ming',ren:'ren',phone:'1234'}
      ],
      isBm: "0",
      tableCols: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "会议名称", prop: "tzName" },
        { label: "发送人", prop: "sendPersonName", width: 200 }
      ],
      tableCols0: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "会议名称", prop: "tzName" },
        { label: "发送人", prop: "sendPersonName", width: 200 }
      ],
      tableCols1: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "发送时间", prop: "sendTime", width: 150 },
        { label: "报名时间", prop: "bmTime" },
        { label: "会议名称", prop: "tzName" },
        { label: "发送人", prop: "sendPersonName", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      options: [],
      deleteArry: ""
    };
  },
  mixins: [bianhanPublic],
  computed: {},
  methods: {
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.isBm = "0";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData1;
        this.loadData();
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols1);
        this.isBm = "1";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData2;
        this.loadData();
      }
    },
    exportData() {
      exportTable.exportExcel("报名通知");
    },
    tableRowClassName(row) {
      if (row.readFlag == "0") {
        return "warning-row";
      }
    },
    changeYear() {
      // console.log('111111111111111',this.value)
      this.year = this.value.getFullYear().toString();
      //   console.log('2222222222222222',this.year)
      this.loadData();
      //     this.$api.secreatary.meetings.getTopicList(
      //         {curYear:this.year},
      //         {
      //             PAGE_JUMP: this.pagination.pageNum,
      //             REC_IN_PAGE: this.pagination.pageSize,
      //         }
      //     ).then(res => {
      //         this.pagination.total = res.total
      //         res.data.map(item=>{
      //             item.sendTime=formatData(item.sendTime,'YYYY-MM-DD')
      //         })
      //         this.tableData = res.data
      //     })
    },
    select(row) {},
    loadData() {
      this.$api.secreatary.meetings
        .getBmList(
          {
            bmFlag: this.isBm,
            curYear: this.year,
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
            item.sendTime = formatData(item.sendTime, "YYYY-MM-DD");
            item.bmTime = formatData(item.bmTime, "YYYY-MM-DD");
          });
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      // this.rowData = {};
      // this.rowData.detail = JSON.stringify(row);
      if (this.activeName == "tabs-look") {
        row.type = "0";
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/presidentMeeting/registerNotice/registerDetail",
        //   query: { type: row.type, id: row.id }
        // });
        this.hasOpened(row.id, {
          path: "/secretary/presidentMeeting/registerNotice/registerDetail",
          query: { type: row.type, id: row.id }
        });
      } else if (this.activeName == "tabs-sleep") {
        row.type = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/registerNotice/registerDetailDone",
          query: { type: row.type, id: row.id }
        });
      }
      // console.log("this.rowData--------------------", this.rowData);
      // console.log("--------------------this.status", this.status);
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


