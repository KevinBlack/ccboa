<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="未报名" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已报名" name="tabs-sleep"></el-tab-pane>
      </el-tabs>
      <el-row style="margin-bottom: 10px">
        <!-- <el-col :span="6">
          <select-org-or-dept
            @select="selectOrg"
            :orgOrDept="1"
            :orgOrDeptId="'1'"
            style="width:100%;"
          >
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择"
              v-model="formData.curbank"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>-->
        <el-col :span="6" style="margin-left: 10px">
          <el-date-picker
            v-model="value1"
            type="daterange"
            style="width:100%"
            range-separator="-"
            start-placeholder="开始日期"
            :default-time="['00:00:00','23:59:59']"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="6" style="margin-left: 10px">
          <el-input placeholder="请输入会议名称" v-model="formData.title"></el-input>
        </el-col>
        <el-button
          type="primary"
          style="margin-left:20px;margin-bottom:16px;"
          @click="adminSearch"
        >查询</el-button>
      </el-row>
    </div>
    <m-table
      @refresh="loadData()"
      size="medium"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
      :pageSizeList="[20,30,50,100,200,500]"
    ></m-table>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "@/components/select/selectOrgOrDept";
import exportTable from "@/minixs/exportTable";
export default {
  name: "registerNotice",
  components: {
    mTable,
    selectOrgOrDept
  },
  props: {},
  data() {
    return {
      value1: [],
      formData: {
        // curbankId: "",
        // curbank: "",
        title: ""
      },
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
        sortKey: "sendTime"
      },
      tableData: [],
      isBm: "0",
      year: '',
      tableCols: [
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "会议名称", prop: "tzName" },
        { label: "发送人", prop: "sendPersonName" }
      ],
      tableCols0: [
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "会议名称", prop: "tzName" },
        { label: "发送人", prop: "sendPersonName"}
      ],
      tableCols1: [
        { label: "发送时间", prop: "sendTime", width: 200 },
        { label: "报名时间", prop: "bmTime" },
        { label: "会议名称", prop: "tzName" },
        { label: "发送人", prop: "sendPersonName" }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      options: [],
      deleteArry: ""
    };
  },
  computed: {},
  methods: {
    selectOrg(org) {
      console.log(org);
      this.$set(this.formData, "curbank", org.unitName);
      this.formData.curbankId = org.id;
      // console.log('主办部门：', this.formData)
      console.log(999, this.formData);
      this.loadData();
    },
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
    adminSearch() {
      // if (this.formData.curbankId) {
      this.pagination = {
        pageNum: 1,
        pageSize: 20
      };
      if (this.value1 && this.value1.length > 0) {
        this.formData.draftBeginDate = formatData(
          this.value1[0].getTime(),
          "YYYY-MM-DD"
        );
        this.formData.draftEndDate = formatData(
          this.value1[1].getTime(),
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.formData.draftBeginDate = "";
        this.formData.draftEndDate = "";
      }
      this.loadData();
      // } else {
      //   this.$message({
      //     message: "请先选择机构",
      //     type: "warning"
      //   });
      // }
    },
    loadData() {
      this.$api.secreatary.meetings
        .getBmtzList(
          {
            bmFlag: this.isBm,
            curYear: this.year,
            ...this.searchData,
            startTime: this.formData.draftBeginDate,
            endTime: this.formData.draftEndDate,
            tzName: this.formData.title
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
        // row.type = "0";
        row.type = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/registerDetail",
          query: { type: row.type, id: row.id }
        });
      } else if (this.activeName == "tabs-sleep") {
        row.type = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/registerDetail",
          query: { type: row.type, id: row.id }
        });
      }
    }
  },
  activated() {},
  mounted() {},
  created() {
    // this.$api.setting.organization
    //   .getTree({
    //     unitClass: 1,
    //     unitCode: "1"
    //   })
    //   .then(res => {
    //     let data = [];
    //     data = res.data;
    //     if (data && data.length > 0) {
    //       this.formData.curbank = data[0].unitName;
    //       this.formData.curbankId = data[0].unitCode;
    //       this.loadData();
    //     }
    //   });
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


