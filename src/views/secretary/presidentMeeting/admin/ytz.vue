<!--
 * @Author: your name
 * @Date: 2021-01-07 11:01:45
 * @LastEditTime: 2021-02-22 17:43:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0130OA\src\views\secretary\presidentMeeting\admin\ytz.vue
-->
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
        <el-tab-pane label="未反馈" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已反馈" name="tabs-sleep"></el-tab-pane>
        <!-- <el-button type="primary" style="margin-left:20px;float:left" @click="exportData" >导出</el-button>                       -->
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
          <el-input placeholder="请输入标题名称" v-model="formData.title"></el-input>
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
// import exportTable from "../../minixs/exportTable";
export default {
  name: "adNotice",
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
      year: '',
      status: "",
      addArry: [],
      activeName: "tabs-all",
      searchData: {
        sort: "desc",
        sortKey: "draftDate"
      },
      tableData: [
        // { title: "st", ytMc: "ming", sendPersonName: "ren", sendTime: "1234" }
      ],
      tableCols: [
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "标题", prop: "title" },
        { label: "主办部门", prop: "draftDepartment", width: 200 }
      ],
      tableCols0: [
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "标题", prop: "title" },
        { label: "主办部门", prop: "draftDepartment", width: 200 }
      ],
      tableCols1: [
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "标题", prop: "title" },
        { label: "主办部门", prop: "draftDepartment", width: 200 }
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
    selectOrg(org) {
      console.log(org);
      this.$set(this.formData, "curbank", org.unitName);
      this.formData.curbankId = org.id;
      // console.log('主办部门：', this.formData)
      console.log(999, this.formData);
      this.loadData();
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
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols);
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
        this.status = "";
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols0);
        this.status = "0";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      } else if (tab.index == 2) {
        this.tableCols = deepClone(this.tableCols1);
        this.status = "1";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      }
    },
    loadData() {
      this.$api.secreatary.meetings
        .getYtzList(
          {
            status: this.status,
            curYear: this.year,
            ...this.searchData,
            startTime: this.formData.draftBeginDate,
            endTime: this.formData.draftEndDate,
            title: this.formData.title
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
            item.responseTime = formatData(item.responseTime, "YYYY-MM-DD");
          });
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      if (this.activeName == "tabs-all") {
        row.status = "0";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/adDetailDone",
          query: { status: row.status, id: row.id }
        });
      } else if (this.activeName == "tabs-look") {
        row.status = "0";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/adDetailDone",
          query: { status: row.status, id: row.id }
        });
      } else if (this.activeName == "tabs-sleep") {
        row.status = "1";
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/adDetailDone",
          query: { status: row.status, id: row.id }
        });
      }
    },
    create_btn() {}
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
    //       // this.loadData(this.status);
    //       this.loadData();
    //     }
    //   });
    this.loadData();
    // this.loadData(this.status);
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>

