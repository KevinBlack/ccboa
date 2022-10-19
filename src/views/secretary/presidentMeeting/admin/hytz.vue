<!--
 * @Author: your name
 * @Date: 2021-01-07 10:55:43
 * @LastEditTime: 2021-02-22 17:42:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0130OA\src\views\secretary\presidentMeeting\admin\hytz.vue
-->
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
        <el-tab-pane label="筹备" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="办结" name="tabs-sleep"></el-tab-pane>
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
          <el-input placeholder="请输入议题名称" v-model="formData.title"></el-input>
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
  name: "conferList",
  components: {
    mTable,
    selectOrgOrDept
  },
  props: {},
  data() {
    return {
      value1: [],
      deptList: [],
      formData1: {},
      activeName: "tabs-look",
      dialogFormVisible: false,
      searchData: {
        sort: "desc",
        sortKey: "draftDate"
      },
      tableData: [],
      formData: {
        // curbankId: "",
        // curbank: "",
        title: ""
      },
      tableCols: [
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "标题", prop: "title" },
        { label: "主办部门", prop: "draftOrgan", width: 200 }
      ],
      tableCols0: [
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "标题", prop: "title" },
        { label: "主办部门", prop: "draftOrgan", width: 200 }
      ],
      tableCols1: [
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "标题", prop: "title" },
        { label: "主办部门", prop: "draftOrgan", width: 200 }
      ],

      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      options: [],
      value: "",
      value1: "",
      status: "0"
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
    addData1() {
      this.$api.secreatary.meetings.getDeptList({}).then(res => {
        console.log("res------------------", res);
        this.deptList = res.departList;
        console.log(
          "this.deptList----------------------------------",
          this.deptList
        );
        if (this.deptList.length == 1) {
          this.selectDept = JSON.stringify(this.deptList[0]);
          this.formData1.deptDetail = JSON.stringify(this.deptList[0]);
        } else {
          this.selectDept = this.deptList[0].humanId;
          let select1 = {};
          this.deptList.forEach(item => {
            if (item.humanId == this.selectDept) {
              select1 = item;
            }
          });
          this.formData1.deptDetail = JSON.stringify(select1);
        }
      });
      this.dialogFormVisible = true;
      //         //   let row={}
      //         //   row.type=0
      //         //     this.$router.push({
      //         //         path:'/secretary/presidentMeeting/topicSub/topicDetail',
      //         //        query: {rowData: JSON.stringify(row)}
      //         //     })
    },
    change(p) {
      console.log("pppp", p);
      let select = {};
      this.deptList.forEach(item => {
        if (item.humanId == p) {
          select = item;
        }
      });
      console.log("select-----------------------", select);
      console.log("select-----------------------", JSON.stringify(select));
      this.formData1.deptDetail = JSON.stringify(select);
      console.log(9090909, "this.formData1", this.formData1);
      console.log(
        9090909,
        "this.formData1.deptDetail",
        this.formData1.deptDetail
      );
      this.$forceUpdate();
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
        this.status = "";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
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
        .mainList(
          {
            status: this.status,
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
          // console.log("&&&**((()_)_))*#$%^&*", res);
          this.pagination.total = res.total;
          res.data.map(item => {
            // item.hyTimeStr=formatData(item.hyTimeStr,'YYYY-MM-DD')
            // item.draftDate=formatData(item.draftDate,'YYYY-MM-DD')
            // item.finishDate=formatData(item.finishDate,'YYYY-MM-DD')
          });
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      if (this.activeName == "tabs-all") {
        row.type = 1;
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/conferDetailed",
          query: { type: row.type, id: row.id }
        });
      } else if (this.activeName == "tabs-look") {
        row.type = 1;
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/conferDetailed",
          query: { type: row.type, id: row.id }
        });
      } else if (this.activeName == "tabs-sleep") {
        row.type = 1;
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/admin/conferDetailed",
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


