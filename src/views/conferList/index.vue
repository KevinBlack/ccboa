<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="筹备" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="办结" name="tabs-sleep">
          <el-date-picker
            style="float:right"
            v-model="value1"
            type="year"
            @change="changeYear"
            placeholder="2020"
          ></el-date-picker>
        </el-tab-pane>
        <el-row>
          <el-button type="primary" style="float:left" @click="addData1">起草</el-button>
          <el-button type="primary" style="margin-left:20px;float:left" @click="exportData">导出</el-button>
        </el-row>
      </el-tabs>
    </div>
    <el-dialog title="请选择类型及拟稿部门" :visible.sync="dialogFormVisible">
      <el-form style="margin:0 10%" :data="formData1">
        <el-form-item label="主办部门" v-if="this.deptList.length>0">
          <el-select v-model="selectDept" style="width:50%" @change="change(selectDept)">
            <el-option
              v-for="item in deptList"
              :key="item.unitId"
              :label="item.unitNames"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="itemClick('sure')">确 定</el-button>
      </div>
    </el-dialog>
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
import mTable from "@/components/table/tTable";
import exportTable from "../../minixs/exportTable";
import bianhanPublic from "@/minixs/bianhan";
export default {
  name: "conferList",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      deptList: [],
      buttonType: true,
      selectDept: "",
      formData1: {},
      activeName: "tabs-look",
      dialogFormVisible: false,
      searchData: {
        // sort: "asc",
        sort: "desc",
        sortKey: "draftDate"
      },
      searchData2: {
        // sort: "asc",
        sort: "desc",
        sortKey: "draftDate"
      },
      tableData: [
        // {title:'bm',hyTime:'st',draftUser:'ming',draftDate:'ren'}
      ],
      tableCols: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "会议时间", prop: "hyTimeStr", width: 300 },
        { label: "会议名称", prop: "title" },

        { label: "拟稿人", prop: "draftUser", width: 200 }
      ],
      tableCols0: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "拟稿日期", prop: "draftDate", width: 200 },
        { label: "会议时间", prop: "hyTimeStr", width: 300 },
        { label: "会议名称", prop: "title" },

        { label: "拟稿人", prop: "draftUser", width: 200 }
      ],
      tableCols1: [
        // { label: '序号', prop: 'rowNumber' },
        { label: "会议时间", prop: "hyTimeStr", width: 300 },
        { label: "办结日期", prop: "finishDate", width: 200 },
        { label: "会议名称", prop: "title" }
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
  mixins: [bianhanPublic],
  computed: {},
  methods: {
    addData1() {
      this.$api.secreatary.meetings.getDeptList({}).then(res => {
        console.log("res------------------", res);
        this.deptList = res.departList;
        console.log(
          "this.deptList----------------------------------",
          this.deptList
        );
        if (this.deptList.length == 1) {
          this.selectDept = this.deptList[0].unitNames;
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
    itemClick(params) {
      switch (params) {
        case "sure":
          this.formData1.type = 0;
          console.log("this.formData1", this.formData1);
          this.$intent.goNewPage(this, {
            path: "/secretary/presidentMeeting/conferList/conferDetail",
            query: this.formData1

            // query: { rowData: this.formData1 },
          });
          this.dialogFormVisible = false;
          break;
        case "cancel":
          this.dialogFormVisible = false;
          break;
      }
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
    changeYear() {
      let year = this.value1.getFullYear().toString();
      this.$api.secreatary.meetings
        .mainList(
          { curYear: year },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    exportData() {
      exportTable.exportExcel("会议主办单");
    },

    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.status = "0";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.searchData = this.searchData;
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
    select(row) {},
    loadData() {
      this.$api.secreatary.meetings
        .mainList(
          {
            status: this.status,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    //获取起草权限
    // getRole() {
    //   this.$api.secreatary.meetings
    //     .getRole()
    //     .then(res => {
    //       console.log("权限", res);
    //       this.buttonType = res.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    cellClick(row) {
      // this.rowData = {};
      // this.rowData.type = 1;
      // this.rowData.detail = JSON.stringify(row);
      if (this.activeName == "tabs-look") {
        row.type = 1;
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/presidentMeeting/conferList/conferDetail",
        //   query: { type: row.type, id: row.id }
        // });
        this.hasOpened(row.id, {
          path: "/secretary/presidentMeeting/conferList/conferDetail",
          query: { type: row.type, id: row.id }
        });
      } else if (this.activeName == "tabs-sleep") {
        row.type = 1;
        this.$intent.goNewPage(this, {
          path: "/secretary/presidentMeeting/conferList/conferDetailed",
          query: { type: row.type, id: row.id }
        });
      }
    }
  },
  activated() {},
  mounted() {},
  created() {
    // this.getRole();
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


