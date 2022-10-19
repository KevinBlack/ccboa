<!--
 * @Author: your name
 * @Date: 2021-01-07 10:55:33
 * @LastEditTime: 2021-02-22 17:41:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0130OA\src\views\secretary\presidentMeeting\admin\ytgl.vue
-->
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <!-- <el-button type="primary" style="margin-left:20px;float:left"  @click="exportData">导出</el-button> -->
        <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
        <el-tab-pane label="未上会" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已上会" name="tabs-sleep"></el-tab-pane>
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
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
      :pageSizeList='[20,30,50,100,200,500]'
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "@/components/select/selectOrgOrDept";
// import exportTable from "../../../../minixs/exportTable";
export default {
  name: "topicSub",
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
      activeName: "tabs-all",
      isSubmit: "",
      ytStatus: "1",
      year: '',
      searchData: {
        sort: "desc",
        sortKey: "sbSj"
      },
      tableData: [
        // {deptName:'bm',sbSj:'sbSj',ytMc:'ytMc',curuserChinaName:'ming',tel:'ren',ytStats:'1'}
      ],
      tableCols: [
        { label: "上报时间", prop: "sbSj", width: 200 },
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
        { label: "上报时间", prop: "sbSj", width: 200 },
        { label: "主汇报部门", prop: "deptName", width: 200 },

        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 },
        { label: "状态", prop: "ytStatus", width: 200 }
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
    selectOrg(org) {
      console.log(org);
      this.$set(this.formData, "curbank", org.unitName);
      this.formData.curbankId = org.id;
      // console.log('主办部门：', this.formData)
      console.log(999, this.formData);
      this.loadData();
    },
    handleTabsClick(tab) {
      console.log("tab.index", tab.index);
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols);
        this.isSubmit = "";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols0);
        this.isSubmit = "0";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      } else if (tab.index == 2) {
        this.tableCols = deepClone(this.tableCols1);
        this.isSubmit = "1";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
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
          "YYYY-MM-DD"
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
        .getTopicList(
          {
            curYear: this.year,
            isSubmit: this.isSubmit,
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
          this.pagination.total = res.total;
          res.data.map(item => {
            item.sbSj = formatData(item.sbSj, "YYYY-MM-DD");
          });
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      this.$intent.goNewPage(this, {
        path: "/secretary/presidentMeeting/admin/topicMangeDetail",
        query: { id: row.id }
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


