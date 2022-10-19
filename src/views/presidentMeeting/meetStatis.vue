<template>
  <div class="searchForm">
    <search-form
      ref="searchForm"
      :formData="formData"
      :formCfg="formCfg"
      @reset="reset"
      @event="btnevent"
      @submit="submit"
    >
      <el-col :span="12">
        <el-form-item label="会议日期">
          <el-date-picker
            v-model="formData.hyTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            style="width:100%"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-col>
    </search-form>
    <el-row>
      <el-col :span="4" style="position: relative;left:0px;top:-10px;">
        <el-button type="primary" @click="exportData">导出</el-button>
      </el-col>
    </el-row>
    <div class="main" v-show="isdisplay">
      <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        @select="select"
        :searchData="searchData"
        size="medium"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
      ></m-table>
    </div>
    <div class="show" v-show="!isdisplay">
      <m-table
        @refresh="loadLxData()"
        @cellClick="cellClick"
        @select="select"
        :searchData="searchData"
        size="medium"
        :tableData="tableData1"
        :tableCols="tableCols1"
        :pagination="pagination"
        :isSelection="true"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import searchForm from "components/form/searchForm";
import mTable from "components/table/tTable";
export default {
  name: "meetStatis",
  components: {
    searchForm,
    mTable
  },
  props: {},
  data() {
    return {
      formData: {
        type: "1"
      },
      // params:{value:'1'},
      isdisplay: true,
      searchData: {},
      formCfg: [
        {
          type: "radios",
          prop: "type",
          label: "统计类型",
          options: { 1: "主汇报部门", 2: "列席部门" }
        },
        [
          { type: "button-primary", prop: "$submit", value: "统计" },
          { type: "button", prop: "$reset", value: "清空" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ],

      tableData: [],
      tableData1: [],
      tableCols: [
        { label: "议题主汇报部门", prop: "deptName" },
        { label: "上会次数", prop: "reportNum" }
      ],
      tableCols1: [
        { label: "列席部门", prop: "deptName" },
        { label: "列席次数", prop: "lxNum" },
        { label: "部门主要负责人请假次数", prop: "leavingNum" },
        { label: "部门主要负责人缺席率", prop: "leavingRatio" }
      ],
      pagination: {
        pageNum: 1, //第几页
        pageSize: 10 //每页条数
      }
    };
  },
  computed: {},
  methods: {
    reset() {
      this.formData = {};
    },
    submit(params) {
      console.log(this.isdisplay);
      
      console.log(params);
      this.formData = params;
      if (this.isdisplay == true) {
        console.log(1);
        
      }else{
        console.log(2);
        
      }
      // this.loadData(type);
    },
    btnevent(params) {
      console.log("params.value", params.value);
      switch (params.value) {
        case "1":
          this.isdisplay = true;
          console.log("11");
          this.loadData();
          // if (this.formData.hyTime) {
          //   this.formData.startDate = this.formData.hyTime[0];
          //   this.formData.endDate = this.formData.hyTime[1];
          // }
          // this.$api.secreatary.meeting
          //   .statisForm(
          //     {
          //       ...this.formData,
          //       ...this.searchData
          //     },
          //     {
          //       PAGE_JUMP: this.pagination.pageNum,
          //       REC_IN_PAGE: this.pagination.pageSize
          //     }
          //   )
          //   .then(res => {
          //     this.pagination.total = res.total;
          //     this.tableData = res.data;
          //   });
          break;
        case "2":
          this.isdisplay = false;
          this.loadLxData();
          console.log("22");
          // this.$api.secreatary.meeting
          //   .statisForms(
          //     {
          //       ...this.formData,
          //       ...this.searchData
          //     },
          //     {
          //       PAGE_JUMP: this.pagination.pageNum,
          //       REC_IN_PAGE: this.pagination.pageSize
          //     }
          //   )
          //   .then(res => {
          //     this.pagination.total = res.total;
          //     this.tableData = res.data;
          //   });
          break;
      }
    },
    loadData() {
      if (this.formData.dataDate) {
        this.formData.startDate = this.formData.dataDate[0];
        this.formData.endDate = this.formData.dataDate[1];
      }
      this.$api.secreatary.meeting
        .statisForm(
          {
            ...this.formData,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData1 = res.data;
        });
    },
    loadLxData() {
      if (this.formData.dataDate) {
        this.formData.startDate = this.formData.dataDate[0];
        this.formData.endDate = this.formData.dataDate[1];
      }
      this.$api.secreatary.meeting
        .statisForm(
          {
            ...this.formData,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData1 = res.data;
        });
    },
    cellClick(row) {
      let rowdata = JSON.stringify(row);
      this.$intent.goNewPage(this, { path: "", query: {} });
    },
    handleClose() {
      this.isdialog = false;
    },
    delecurrentCode() {
      this.isdialog = false;
    },
    select() {},
    //导出
    exportData() {
      exportTable.exportExcel("统计");
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
.formHeader {
  padding: 8px 70px;

  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}

.down {
  // position: absolute;
  // bottom: 0px;
  font-size: 12px;
  text-align: center;
}
</style>
