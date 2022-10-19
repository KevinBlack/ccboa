<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-row>
          <el-date-picker             
                    v-model="value"
                    type="year"
                    @change='changeYear'
                    placeholder="2020">       
                    </el-date-picker>
        <el-button type="primary" style="margin-left:20px;" @click="exportData">导出</el-button>
      </el-row>
    </div>
    <m-table
      @refresh="loadData()"
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

export default {
  name: "formalNotice",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      year:'2020',
      activeName: "tabs-look",
      searchData: {},
      tableData: [
        {ytOrderNum:'st',title:'ming',ytMc:"ytMc",sendPersonName:'ren',sendTime:'1234'}
      ],
      tableCols: [
        { label: "序号", prop: "ytOrderNum" },
        { label: "会议名称", prop: "title" },
        { label: "议题名称", prop: "ytMc" },
        { label: "发送人", prop: "sendPersonName" },
        { label: "发送时间", prop: "sendTime" },
      ],
    pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      options: [],
      value: "",
      deleteArry: "",
    };
  },
  computed: {},
  methods: {
      exportData(){
                exportTable.exportExcel("正式通知");
            },
    select(row) {},
      changeYear(){         
            this.year=this.value.getFullYear().toString()
            this.loadData()
            },
    loadData() {
      this.$api.secreatary.meeting
        .getZsList(
          { curYear:this.year},
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      this.$router.push({
        path: "/secretary/presidentMeeting/formalNotice/formalDetail",
        query: { rowData: JSON.stringify(row) },
      });
    },
    out_btn() {},
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


