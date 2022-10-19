<!--
 * @Author: your name
 * @Date: 2021-01-15 16:16:00
 * @LastEditTime: 2021-02-25 16:12:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \20210301\src\views\formalNotice\index.vue
--> 
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-row>
        <el-date-picker v-model="value" type="year" @change="changeYear"></el-date-picker>
        <el-button type="primary" style="margin-left:20px;" @click="exportData">导出</el-button>
      </el-row>
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
import exportTable from "@/minixs/exportTable";
import mTable from "@/components/table/tTable";

export default {
  name: "formalNotice",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      year: new Date().getFullYear().toString(),
      activeName: "tabs-look",
      searchData: {
        sort: "desc",
        sortKey: "sendTime"
      },
      tableData: [],
      tableCols: [
        // { label: "序号", prop: "orderNum" },
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "会议名称", prop: "title" },
        { label: "议题名称", prop: "ytmc" },
        { label: "发送人", prop: "sendPersonName", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      options: [],
      value: "",
      deleteArry: ""
    };
  },
  computed: {},
  methods: {
    exportData() {
      exportTable.exportExcel("正式通知");
    },
    select(row) {},
    changeYear() {
      this.year = this.value.getFullYear().toString();
      this.loadData();
    },
    loadData() {
      this.$api.secreatary.meetings
        .getZsList(
          {
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
            // item.responseTime=formatData(item.responseTime,'YYYY-MM-DD')
          });
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      this.$intent.goNewPage(this, {
        path: "/secretary/presidentMeeting/formalNotice/formalDetail",
        query: { id: row.id }
      });
    },
    out_btn() {}
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


