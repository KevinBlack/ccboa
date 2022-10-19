<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="未反馈" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已反馈" name="tabs-sleep">
          <el-date-picker style="float:right" v-model="value" type="year" @change="changeYear"></el-date-picker>
        </el-tab-pane>
        <el-button type="primary" style="margin-left:20px;float:left" @click="exportData">导出</el-button>
      </el-tabs>
    </div>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      :isIndex="true"
      :isHandle="false"
      @select="chooseYt"
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
import exportTable from "../../minixs/exportTable";
import bianhanPublic from "@/minixs/bianhan";
export default {
  name: "adNotice",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      year: new Date().getFullYear().toString(),
      status: "0",
      addArry: [],
      activeName: "tabs-look",
      searchData: {},
      searchData1: {
        sort: "desc",
        sortKey: "sendTime"
      },
      searchData2: {
        sort: "desc",
        sortKey: "responseTime"
      },
      tableData: [],
      tableCols: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "会议名称", prop: "title" },
        { label: "议题名称", prop: "ytMc" },
        { label: "发送人", prop: "sendPersonName", width: 200 }
      ],
      tableCols0: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "会议名称", prop: "title" },
        { label: "议题名称", prop: "ytMc" },
        { label: "发送人", prop: "sendPersonName", width: 200 }
      ],
      tableCols1: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "反馈时间", prop: "responseTime", width: 200 },
        { label: "会议名称", prop: "title" },
        { label: "议题名称", prop: "ytMc" },
        { label: "发送人", prop: "sendPersonName", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      options: [],
      value: "",
      deleteArry: "",
      arrInfoNum: []
    };
  },
  mixins: [bianhanPublic],
  computed: {},
  methods: {
    changeYear() {
      this.year = this.value.getFullYear().toString();
      this.loadData();
    },
    exportData() {
      exportTable.exportExcel("会议预通知单");
    },
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.status = "0";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData1;
        this.loadData();
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols1);
        this.status = "1";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData2;
        this.loadData();
      }
    },
    chooseYt(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.addArry = dataArry.join(",");
    },
    tableRowClassName(row) {
      if (row.readFlag == "0") {
        return "warning-row";
      }
    },
    select(row) {},
    saveOrder() {
      let arrInfo = this.tableData;
      let arrInfoId = {};
      for (let i = 0; i < arrInfo.length; i++) {
        this.arrInfoNum.push({
          id: arrInfo[i].id,
          orderNum: arrInfo[i].orderNumInt
        });
      }
      this.$api.secreatary.meetings
        .saveorder({ myData: this.arrInfoNum })
        .then(res => {});
    },
    loadData() {
      this.$api.secreatary.meetings
        .getAdList(
          {
            status: this.status,
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
            // item.responseTime = formatData(item.responseTime, 'YYYY-MM-DD')
            item.responseTime = item.responseTime
              ? formatData(item.responseTime, "YYYY-MM-DD")
              : "";
          });
          this.tableData = res.data;
          this.saveOrder();
        });
    },
    cellClick(row) {
      console.log("this.rowData--------------------", row);
      // this.rowData = {};
      // this.rowData.detail = JSON.stringify(row);
      if (this.activeName == "tabs-look") {
        row.status = "0";
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/presidentMeeting/adNotice/adDetail",
        //   query: { status: row.status, id: row.id }
        // });
        this.hasOpened(row.id, {
          path: "/secretary/presidentMeeting/adNotice/adDetail",
          query: { status: row.status, id: row.id }
        });
      } else if (this.activeName == "tabs-sleep") {
        row.status = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/adNotice/adDetailDone",
          query: { status: row.status, id: row.id }
        });
      }
      // console.log("this.rowData--------------------", this.rowData);
      console.log("--------------------this.status", row.status);
    },
    create_btn() {}
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

