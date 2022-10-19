<!--
 * @Author: your name
 * @Date: 2021-01-07 10:50:32
 * @LastEditTime: 2021-02-22 17:06:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0130OA\src\views\secretary\presidentMeeting\admin\yt.vue
--> 
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
        <el-tab-pane label="未报送" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已报送" name="tabs-sleep"></el-tab-pane>
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
          <el-input placeholder="请输入议题名称" v-model="formData.ytMc"></el-input>
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
      :searchData="searchData"
      :pagination="pagination"
      :isSelection="true"
      :pageSizeList="[20,30,50,100,200,500]"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "@/components/select/selectOrgOrDept";
export default {
  name: "yt",
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
        ytMc: ""
      },
      year: new Date().getFullYear().toString(),
      activeName: "tabs-look",
      tableData: [
        // {mc:'ming',qcTime:'12号',ren:'联系人',tel:'139211'}
      ],
      searchData: {},
      searchData1: {
        sort: "desc",
        sortKey: "qcTime"
      },
      searchData2: {
        sort: "desc",
        sortKey: "qcTime"
      },
      ytStatus: "0",
      tableCols: [
        { label: "起草时间", prop: "qcTime", width: 200 },
        { label: "主汇报部门", prop: "deptName", width: 200 },
        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 },
        { label: "状态", prop: "ytStatus", width: 200 }
      ],
      tableCols0: [
        { label: "上报时间", prop: "sbSj", width: 200 },
        { label: "主汇报部门", prop: "deptName", width: 200 },
        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 },
        { label: "状态", prop: "ytStatus", width: 200 }
      ],
      tableCols1: [
        { label: "起草时间", prop: "qcTime", width: 200 },
        { label: "主汇报部门", prop: "deptName", width: 200 },
        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 },
        { label: "状态", prop: "ytStatus", width: 200 }
      ],

      pagination: {
        pageNum: 1,
        pageSize: 20
      }
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
        this.tableCols = deepClone(this.tableCols);
        this.ytStatus = "";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData1;
        this.loadData();
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols1);
        this.ytStatus = "0";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData1;
        this.loadData();
      } else if (tab.index == 2) {
        this.tableCols = deepClone(this.tableCols);
        this.ytStatus = "1";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData2;
        this.loadData();
      }
    },
    cellClick(row) {
      // this.rowData = {};
      // this.rowData.type = 1;
      // this.rowData.detail = JSON.stringify(row);
      if (this.activeName == "tabs-look") {
        row.type = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/topicDetailed",
          query: { type: row.type, id: row.id }
        });
      } else if (this.activeName == "tabs-sleep") {
        row.type = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/topicDetailed",
          query: { type: row.type, id: row.id }
        });
      } else if (this.activeName == "tabs-all") {
        row.type = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/topicDetailed",
          query: { type: row.type, id: row.id }
        });
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
          "YYYY-MM-DD HH:mm:ss"
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
        .getyTList(
          {
            ytStatus: this.ytStatus,
            ...this.searchData,
            startTime: this.formData.draftBeginDate,
            endTime: this.formData.draftEndDate,
            ytMc: this.formData.ytMc
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "loadData123------------------------------res");
          this.pagination.total = res.total;

          res.data.map(item => {
            item.qcTime = formatData(item.qcTime, "YYYY-MM-DD");
            item.sbSj = formatData(item.sbSj, "YYYY-MM-DD");
            // item.backTime = formatData(item.backTime, "YYYY-MM-DD");
          });
          this.tableData = res.data;
        });
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





