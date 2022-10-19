<template>
  <div class="check">
    <div style="margin: 15px 0">
      <!-- <el-tabs v-model="activeName" @tab-click="handleTabsClick"> -->
      <el-tabs @tab-click="handleTabsClick">
        <el-button type="primary" style="margin-left:20px;" @click="addData1">新增模板</el-button>
      </el-tabs>
    </div>
    <m-table @refresh="loadData()" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData"
      :tableCols="tableCols" :pagination="pagination" :isSelection="true" :searchData="searchData"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
export default {
  name: "topicSub",
  components: {
    mTable,
  },
  props: {},
  data () {
    return {
      formData: {},
      formData1: {},
      rowData: {},
      deptList: [],
      searchData: {},
      tableData: [
        // {mc:'ming',qcTime:'12号',ren:'联系人',tel:'139211'}
      ],
      tableCols: [
        { label: "序号", prop: "rowNumber" },
        { label: "模板名称", prop: "ytMc" },
      ],

      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      value: "",
      value1: "",
      deleteArry: "",
    };
  },
  computed: {},
  methods: {
    handleTabsClick (tab) {
      this.tableCols = deepClone(this.tableCols);
      this.loadData();
    },
    select (row) { },
    loadData () {
      // this.searchData.type = this.type
      this.$api.secreatary.meetings
        .getTopicList(
          { ytStatus: this.ytStatus, curYear: this.year, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          console.log(res, 'loadData123------------------------------res');
          this.pagination.total = res.total;

          res.data.map((item) => {
            item.qcTime = formatData(item.qcTime, "YYYY-MM-DD");
            item.sbSj = formatData(item.sbSj, "YYYY-MM-DD");
            // item.backTime = formatData(item.backTime, "YYYY-MM-DD");
          });
          this.tableData = res.data;
        });
    },
    addData1 () {
      this.formData1 = {};
      this.$api.secreatary.meetings.getDeptList({}).then((res) => {
        console.log("res-----------------------------------", res);
        this.deptList = res.departList;
        console.log("this.deptList-----------------------------------", this.deptList);
        if (this.deptList.length == 1) {
          this.selectDept = JSON.stringify(this.deptList[0]);
          this.formData1.deptDetail = JSON.stringify(this.deptList[0]);
        } else {
          this.selectDept = this.deptList[0].humanId;
          let select1 = {};
          this.deptList.forEach((item) => {
            if (item.humanId == this.selectDept) {
              select1 = item;
            }
          });
          // console.log('select1------------------',select1);
          // console.log('JSON.stringify(select1)------------------',JSON.stringify(select1));
          this.formData1.deptDetail = JSON.stringify(select1);
        }
      });
    },
  },
  activated () { },
  mounted () { },
  created () {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>





