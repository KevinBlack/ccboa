<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="未报送" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="已报送" name="tabs-sleep">
          <el-date-picker
            style="float:right"
            v-model="value"
            @change="changeYear"
            type="year"
            placeholder="2020"
          ></el-date-picker>
        </el-tab-pane>
        <el-tab-pane label="被退回" name="tabs-file">
          <el-date-picker
            style="float:right"
            v-model="value"
            @change="changeYear"
            type="year"
            placeholder="2020"
          ></el-date-picker>
        </el-tab-pane>
        <el-button type="primary" style="margin-left:20px;" @click="addData1">起草议题</el-button>
      </el-tabs>
    </div>
    <el-dialog title="请选择类型及拟稿部门" :visible.sync="dialogFormVisible">
      <el-form style="margin:0 10%" :data="formData1">
        <el-form-item label="主办部门" v-if="this.deptList.length>1">
          <el-select v-model="selectDept" style="width:50%" @change="change(selectDept)">
            <el-option
              v-for="item in deptList"
              :key="item.firstUnitId"
              :label="item.firstUnitName"
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
  name: "topicSub",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      formData: {},
      formData1: {},
      rowData: {},
      dialogFormVisible: false,
      deptList: [],
      year: "2020",
      activeName: "tabs-look",
      searchData: {},
      tableData: [
        // {mc:'ming',qcTime:'12号',ren:'联系人',tel:'139211'}
      ],
      ytStatus: "0",
      tableCols: [
        { label: "起草时间", prop: "qcTime", width: 200 },
        { label: "议题名称", prop: "ytMc" },

        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 }
      ],
      tableCols0: [
        { label: "起草时间", prop: "qcTime", width: 200 },
        { label: "议题名称", prop: "ytMc" },

        { label: "联系人", prop: "curuserChinaName", width: 200 },
        { label: "联系电话", prop: "tel", width: 200 }
      ],
      tableCols1: [
        { label: "议题名称", prop: "ytMc" },
        { label: "报送时间", prop: "sbSj" },
        { label: "联系人", prop: "curuserChinaName" },
        { label: "联系电话", prop: "tel" }
      ],
      tableCols2: [
        { label: "议题名称", prop: "ytMc" },
        { label: "报送时间", prop: "sbSj" },
        { label: "被退回时间", prop: "backTime" },
        { label: "退回人", prop: "backPersonName" }
      ],

      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      options: [],
      value: "",
      value1: "",
      deleteArry: ""
    };
  },
  computed: {},
  methods: {
    itemClick(params) {
      switch (params) {
        case "sure":
          this.formData1.type = 0;
          this.$router.push({
            path: "/secretary/presidentMeeting/topicSub/topicDetail",
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
      this.year = this.value.getFullYear().toString();
      this.loadData();
    },
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.ytStatus = "0";
        this.pagination.pageNum = 1;
        this.loadData();
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols1);
        this.ytStatus = "1";
        this.pagination.pageNum = 1;
        this.loadData();
      } else {
        this.tableCols = deepClone(this.tableCols2);
        this.ytStatus = "-1";
        this.pagination.pageNum = 1;
        this.loadData();
      }
    },
    select(row) {},
    loadData() {
      // this.searchData.type = this.type
      this.$api.secreatary.meeting
        .getTopicList(
          { ytStatus: this.ytStatus, curYear: this.year },
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
    },
    cellClick(row) {
      // row.type = 1;
      // console.log(JSON.stringify(row));
      this.rowData = {};
      this.rowData.type = 1;
      this.rowData.detail = JSON.stringify(row);
      console.log("this.rowData--------------------", this.rowData);
      //  console.log('--------------------',this.rowData.type);
      this.$router.push({
        path: "/secretary/presidentMeeting/topicSub/topicDetail",
        query: this.rowData
      });
    },
    addData1() {
      this.formData1 = {};
      this.$api.secreatary.meeting.getDeptList({}).then(res => {
        console.log("res-----------------------------------", res);
        this.deptList = res.departList;
        console.log(
          "this.deptList-----------------------------------",
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
          console.log("select1------------------", select1);
          console.log(
            "JSON.stringify(select1)------------------",
            JSON.stringify(select1)
          );
          this.formData1.deptDetail = JSON.stringify(select1);
        }
      });
      this.dialogFormVisible = true;
      //   let row={}
      //   row.type=0
      //     this.$router.push({
      //         path:'/secretary/presidentMeeting/topicSub/topicDetail',
      //        query: {rowData: JSON.stringify(row)}
      //     })
    }
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


