/**
* create by zx on 2020-6-28 09:29
* 类注释：
* 备注：
*/
<template>
  <div id="bh_zf" ref="bh_zf">
    <el-tabs @tab-click="handleClick" v-model="sonselect">
      <el-tab-pane name="3" label="全部">
        <search-form
          :formData="formData"
          @reset="reset"
          @event="btnevent"
          :openshow="openshow"
          :hasShow="hasShow"
          class="mt20"
          ref="searchForm"
          @submit="submit"
          :formCfg="formCfg"
        ></search-form>
      </el-tab-pane>
      <el-tab-pane name="0">
        <span slot="label">
          待办
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
        <el-col class="mt20end">
          <el-button type="primary" @click="addData">起草</el-button>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="已办" name="1"></el-tab-pane>
      <el-tab-pane label="办结" name="2"></el-tab-pane>
    </el-tabs>
    <m-table
      @refresh="loadData"
      @cellClick="jumpdeal"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :default-sort="{prop:'draftTime',order:'desc'}"
      :tableRowClassNames="tableRowClassName"
    ></m-table>

    <select-dept-b-h v-model="dialogVisible" :deptList="deptList" :selectDept="selectDept"></select-dept-b-h>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import searchForm from "components/form/searchForm";
import { mapActions } from "vuex";
import index from "./minixs/index";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import selectDeptBH from "./components/selectDeptBH";

export default {
  name: "circulatetable",
  components: {
    mTable,
    searchForm,
    selectDeptBH
  },
  mixins: [index,bianhanPublic],
  data() {
    return {
      hasShow: false, //查询条件不展示收起按钮
      openshow: true,
      dialogVisible: false,
      selectDept: {},
      deptList: [],

      needTodoNum: 0,
      formData: {
        title: "",
        type: "add",
        sort: "desc",
        sortKey: "draftTime",
        numYear:'',
      },
      tableData: [],
      tableCols: [
        { label: "拟稿日期", prop: "draftTime", width: 86 },
        { label: "编号", prop: "documentNo", minwidth: 220},
        { label: "标题", prop: "title", minwidth: 338 },
        { label: "当前环节", prop: "currentNode", minwidth: 120 },
        { label: "操作人", prop: "currentUser", minwidth: 140 },
        { label: "拟稿人", prop: "draftUser", minwidth: 120 }
      ],
      allCols: [
        { label: "拟稿日期", prop: "draftTime", width: 86 },
        { label: "编号", prop: "documentNo", minwidth: 220},
        { label: "标题", prop: "title", minwidth: 338 },
        { label: "当前环节", prop: "currentNode", minwidth: 120 },
        { label: "操作人", prop: "currentUser", minwidth: 140 },
        { label: "拟稿人", prop: "draftUser", minwidth: 120 }
      ],
      finshCols: [
        { label: "拟稿日期", prop: "draftTime", width: 86 },
        { label: "编号", prop: "documentNo", minwidth: 220},
        { label: "标题", prop: "title", minwidth: 438 },
        { label: "拟稿人", prop: "draftUser" }
      ],
      formCfg: [
        {
          type: "select",
          prop: "numYear",
          label: "编号年份",
          config: { clearable: true },
          options: [{label:'近两年',value:''}],
          span: 8,
          style: { width: "100%" }
        },
        { type: "input", prop: "title", label: "标题", span: 8, value: "" },
        {
          type: "date-daterangedefault",
          prop: "$date",
          label: "拟稿日期",
          rangeSeparator: "-",
          span: 8
        },
        {
          type: "radios",
          prop: "3",
          label: "便函状态",
          span: 8,
          options: { 1: "已办", 2: "办结" }
        },
        [
          { type: "button-primary", prop: "$submit", value: "查询" },
          { type: "button", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      sonselect: "0"
    };
  },
  mounted(){
    // let _self=this;
    // window.addEventListener('message',function(e){
    //   console.log(e,'接收消息')
    //   if(!e.data){
    //   _self.pagination=e.data;
    //   }
    // })
  },
  methods: {
    ...mapActions(["setTodoItem"]),
    reset() {
      this.formData = { numYear:''};
      this.pagination = {
        pageNum: 1,
        pageSize: 20
      };
      this.$refs.searchForm.setText("numYear","");
    },
    btnevent(params) {
      switch (params.prop) {
        case "title":
          this.formData["title"] = params.value;
          break;
        case "numYear":
          this.formData["numYear"] = params.value;
          break;
        case "$date":
          if (!!params.value) {
            this.formData["draftBeginTime"] = formatData(params.value[0]);
            this.formData["draftEndTime"] = formatData(params.value[1]);
          } else {
            this.formData["draftBeginTime"] = "";
            this.formData["draftEndTime"] = "";
          }
          break;
      }
    },
    submit(params) {
      this.formData = params;
      this.loadData();
    },
    tableRowClassName(row) {
      if (row.isReadFlag == "0" && (this.sonselect == "0" || row.type == "0")) {
        return "warning-row";
      }
    },
    loadData(type) {
      this.tableData = [];
      if (!type) {
        this.pagination.pageNum = 1;
      }
      if (this.formData.draftTime1) {
        this.formData.draftBeginTime = this.formData.draftTime1[0];
        this.formData.draftEndTime = this.formData.draftTime1[1];
      }
      this.formData.type = this.sonselect;
      this.$api.bianhan
        .tableSearch(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          if (this.sonselect === "0") {
            this.needTodoNum = res.total;
          }
          this.tableData = res.list;
          this.pagination.total = res.total;
        });
    },
    jumpdeal(val) {
      // window.postMessage(this.pagination,location.origin);
      if (this.sonselect == "3") {
        //跳转到待办编辑页面
        if (val.type == 0) {
          this.hasOpened(val.id,{
            'name': "addproceorderdeal",
            'query': { 'id': val.id,numyear:this.formData.numYear }
          })
          // this.$intent.goNewPage(this, {
          //   name: "addproceorderdeal",
          //   query: { id: val.id }
          // });
        } else if (val.type == 1) {
          //已办
          this.$intent.goNewPage(this, {
            name: "proceHas",
            query: { type: 1, id: val.id,numyear:this.formData.numYear }
          });
        } else {
          //办结
          this.$intent.goNewPage(this, {
            name: "proceHas",
            query: { type: 2, id: val.id,numyear:this.formData.numYear }
          });
        }
      } else if (this.sonselect == "0") {
        this.hasOpened(val.id,{
            'name': "addproceorderdeal",
            'query': { 'id': val.id,numyear:this.formData.numYear }
          })
        // this.$intent.goNewPage(this, {
        //   name: "addproceorderdeal",
        //   query: { id: val.id }
        // });
      } else {
        this.$intent.goNewPage(this, {
          name: "proceHas",
          query: { type: this.sonselect, id: val.id,numyear:this.formData.numYear }
        });
      }
    },
    handleClick(tab) {
      this.reset();
      if (tab.index == 0 || tab.index == 1 || tab.index == 2) {
        this.tableCols = this.allCols;
      } else {
        this.tableCols = this.finshCols;
      }
      this.loadData();
    },
  },
  created() {
    this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
        this.formCfg.splice(0,1, {
          type: "select",
          prop: "numYear",
          label: "编号年份",
          config: { clearable: true },
          options: this.yearList,
          span: 8,
          style: { width: "100%" }
        })
      console.log(res)
    })
    this.loadData();
  }
};
</script>
<style lang="css">
  #bh_zf .el-table .caret-wrapper{
    opacity:0 !important;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
.mt20end {
  margin: 20px 0;
}

.mt20 {
  padding: 20px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.el-table .caret-wrapper{
    display:none !important;
  }
</style>
