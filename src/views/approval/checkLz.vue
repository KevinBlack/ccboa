<template>
  <div class="checkLz">
    <el-tabs @tab-click="handleClick" v-model="paneTab">
      <el-tab-pane label="全部" name="typeFir">
        <search-form
          :formData="formData"
          :hasShow="hasShow"
          :openshow="openshow"
           @event="btnevent"
          @reset="reset"
          class="mt20"
          @submit="submit"
          :formCfg="formCfg"
        >
          <!-- <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
              <el-date-picker
                v-model="formData.draftTime1"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                style="width:100%"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col> -->
        </search-form>
      </el-tab-pane>
      <el-tab-pane name="typeSec">
        <span slot="label">
          待办
          <el-badge :value="needTodoNum" class="item" :type="messType"></el-badge>
        </span>
      </el-tab-pane>
      <el-tab-pane label="已办" name="typeThr"></el-tab-pane>
      <el-tab-pane label="办结" name="typeFor"></el-tab-pane>
      <el-col class="mt20end">
        <el-button
          type="primary"
          style="margin-left:20px;"
          @click="createApply"
          v-show="isCreate"
        >起草</el-button>
        <!--        <span style="color:red;margin-left:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统试运行期间，新系统只支持本行内业务流转，跨行业务请到原OA3.6中办理。</span>-->
      </el-col>
    </el-tabs>
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
      :tableRowClassNames="tableRowClassName"
    ></m-table>
    <choo-depar v-if="isCreateDia" @setChooDepar="setChooDepar"></choo-depar>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import FdForm from "vue-elementui-freedomen/components/form";
import searchForm from "@/components/form/searchForm";
import chooDepar from "./chooDepar";
import shiwucommon from "../approval/minixs/shiwucommon"; //事物审批公共方法
export default {
  name: "checkLz",
  components: {
    mTable,
    FdForm,
    searchForm,
    chooDepar
  },
  mixins: [ shiwucommon],
  props: {},
  data() {
    return {
      hasShow: false, //查询条件不展示收起按钮
      messType: "primary",
      needTodoNum: 0,
      openshow: true,
      isCreateDia: false,
      paneTab: "typeSec",
      isCreate: true,
      type: 0,
      searchData: {},
      tableData: [],
      tableCols: [
        { label: "申请时间", prop: "applyTime", width: 100 },
        { label: "审批编号", prop: "approveNo", minwith: 200 },
        { label: "申请编号", prop: "applyNo", minwith: 200 },
        { label: "申请单位", prop: "draftDepartment", width: 100 },
        { label: "标题", prop: "title", minwith: 300 },
        { label: "当前环节", prop: "currentNode", width: 100 },
        { label: "操作人", prop: "currentUser", width: 100 },
        { label: "联系人", prop: "contactName", width: 100 }
      ],
      allCols: [
        { label: "申请时间", prop: "applyTime", width: 100 },
        { label: "审批编号", prop: "approveNo", minwith: 200 },
        { label: "申请编号", prop: "applyNo", minwith: 200 },
        { label: "申请单位", prop: "draftDepartment", width: 100 },
        { label: "标题", prop: "title", minwith: 300 },
        { label: "当前环节", prop: "currentNode", width: 100 },
        { label: "操作人", prop: "currentUser", width: 100 },
        { label: "联系人", prop: "contactName", width: 100 }
      ],
      finshCols: [
        { label: "申请时间", prop: "applyTime", width: 100 },
        { label: "审批编号", prop: "approveNo", minwith: 200 },
        { label: "申请编号", prop: "applyNo", minwith: 200 },
        { label: "申请单位", prop: "draftDepartment", width: 140 },
        { label: "标题", prop: "title", minwith: 400 }
      ],
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 20 //每页条数
      },
      options: [],
      value1: "",
      deleteArry: "",
      formData: {
        khType: "",
        title:'',
        numYear:'',
      },
      formCfg: [
        {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          config: { clearable: true },
          options: '近两年',
          value:'',
          span: 8,
          style: { width: "100%" }
        },
        { type: "input", prop: "title", label: "标题", span: 8, value: "" },
        {
          type: "date-daterangedefault",
          prop: "$date",
          label: "申请日期",
          rangeSeparator: "-",
          span: 8
        },
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ]
    };
  },
  computed: {},
  methods: {
    tableRowClassName(row) {
      if (
        row.isReadFlag == "0" &&
        this.paneTab == "typeSec" || row.type&&row.type == "0"
      ) {
        return "warning-row";
      }
    },
    setChooDepar(isshow) {
      this.isCreateDia = isshow.isCreateShow;
    },
    reset() {
      this.formData = {numYear:''};     
      this.$refs.searchForm.setText("numYear","近两年");     
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
            this.formData["applyTimeStart"] = formatData(params.value[0]);
            this.formData["applyTimeEnd"] = formatData(params.value[1]);
          } else {
            this.formData["applyTimeStart"] = "";
            this.formData["applyTimeEnd"] = "";
          }
          break;
      }
    },
    submit(params) {
      this.formData = params;
      this.loadData();
    },
    createApply() {
      this.isCreateDia = true;
      this.$forceUpdate();
    },
    loadData(type) {
      if (this.formData.draftTime1) {
        this.formData.applyTimeStart = this.formData.draftTime1[0];
        this.formData.applyTimeEnd = this.formData.draftTime1[1];
      }
      this.formData.type = this.type;
      this.$api.checkLz
        .checkLzAllTable(
          { ...this.formData, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          if (this.paneTab == "typeSec") {
            this.needTodoNum = res.total;
            if (this.needTodoNum > 0) {
              this.messType = "danger";
            } else {
              this.messType = "primary";
            }
          }
          this.pagination.total = res.total;
          this.tableData = res.list;
        });
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    cellClick(row) {
      //改版后数据且是请假备案申请项目,进入新版页面
      if (
        row.applyProjectName=='主要负责人请假、备案申请' &&
        row.sourceType === "1"
      ) {
        //是否是代办页面
        const iswait =
          this.type === 0 || (this.type === 3 && row.type === "0")
            ? true
            : false;
        if(iswait){
           this.hasOpened(row.id,{
          name: "approvalDetailv",
          query: { id: row.id, isKh: row.isKh, type: "checkLz", iswait: iswait,
                  state:row.type||this.type,pcsAvyId:row.pcsAvyId,workFlowId:row.workFlowId,
                  multiID:row.multiID,currentUserId:row.currentUserId,numyear:this.formData.numYear }
        })
        }else{
        this.$intent.goNewPage(this, {
          name: "approvalDetailv",
          query: { id: row.id, isKh: row.isKh, type: "checkLz", iswait: iswait,
                  state:row.type||this.type,pcsAvyId:row.pcsAvyId,workFlowId:row.workFlowId,
                  multiID:row.multiID,currentUserId:row.currentUserId,numyear:this.formData.numYear}
        });
        }
      }
      else if (
        row.applyProjectName=='在京机构（部门）负责人疫情期间离京申请' &&
        row.sourceType === "2"
      ) {
        //是否是代办页面
        const iswait =
          this.type === 0 || (this.type === 3 && row.type === "0")
            ? true
            : false;
        if(iswait){
           this.hasOpened(row.id,{
              name: "approvalDetailLj",
              query: { id: row.id, isKh: row.isKh, type: "checkLz", iswait: iswait,
                      state:row.type||this.type,pcsAvyId:row.pcsAvyId,workFlowId:row.workFlowId,
                      multiID:row.multiID,currentUserId:row.currentUserId,numyear:this.formData.numYear }
            })
        }else{
        this.$intent.goNewPage(this, {
          name: "approvalDetailLj",
          query: { id: row.id, isKh: row.isKh, type: "checkLz", iswait: iswait,
                  state:row.type||this.type,pcsAvyId:row.pcsAvyId,workFlowId:row.workFlowId,
                  multiID:row.multiID,currentUserId:row.currentUserId,numyear:this.formData.numYear}
        });
        }
      }
      
      else if (this.type === 0 || (this.type === 3 && row.type === "0")) {
        this.hasOpened(row.id,{
          name: "approvalDetail",
          query: { id: row.id, isKh: row.isKh, type: "checkLz",state:row.type||this.type,pcsAvyId:row.pcsAvyId,workFlowId:row.workFlowId,
                  multiID:row.multiID,currentUserId:row.currentUserId,numyear:this.formData.numYear}
        })
        // this.$intent.goNewPage(this, {
        //   name: "approvalDetail",
        //   query: { id: row.id, isKh: row.isKh, type: "checkLz",state:row.type||this.type,pcsAvyId:row.pcsAvyId,workFlowId:row.workFlowId,
        //           multiID:row.multiID,currentUserId:row.currentUserId}
        // });
      } else if (
        this.type === 1 ||
        this.type === 2 ||
        (this.type === 3 && (row.type === "1" || row.type === "2"))
      ) {
       // row.type = this.type;
        let rowData = JSON.stringify(row);
        this.$intent.goNewPage(this, {
          name: "finapprovalDetail",
          query: { id: row.id, isKh: row.isKh, type: "checkLz",state:row.type||this.type,pcsAvyId:row.pcsAvyId,workFlowId:row.workFlowId,
                  multiID:row.multiID,currentUserId:row.currentUserId,numyear:this.formData.numYear}
        });
      }
    },
    delete_btn() {
      this.$api.checkLz.checkLzDelete({ id: this.deleteArry }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
        this.loadData();
      });
    },
    itemClick(params) {
      if (params.prop == "khType") {
        this.loadData();
      }
    },
    handleClick(tab, event) {
      if (tab.name === "typeFir") {
        this.tableCols = this.allCols;
        this.type = 3;
        this.isCreate = false;
        this.pagination.pageNum = 1;
        this.loadData(this.type);
      } else if (tab.name === "typeSec") {
        this.tableCols = this.allCols;
        this.type = 0;
        this.isCreate = true;
        this.pagination.pageNum = 1;
        this.loadData(this.type);
      } else if (tab.name === "typeThr") {
        this.tableCols = this.allCols;
        this.type = 1;
        this.isCreate = false;
        this.pagination.pageNum = 1;
        this.loadData(this.type);
      } else if (tab.name === "typeFor") {
        this.tableCols = this.finshCols;
        this.type = 2;
        this.pagination.pageNum = 1;
        this.isCreate = false;
        this.loadData(this.type);
      } else {
        return;
      }
    }
  },
  activated() {},
  mounted() {
    document.title="事务审批";
  },
  created() {
        this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
        this.formCfg.splice(0,1, {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          config: { clearable: true },
          options: this.yearList,
          span: 8,
          style: { width: "100%" }
        })
      console.log(res)
    })
    let str = "fdgfdgfd.gfdgfdgfd.DOC";
    let snum = str.lastIndexOf(".");
    let changeFile = str.substring(0, snum + 1);
    let changeType = str.substring(snum + 1).toLowerCase();
    str = changeFile + changeType;
    console.log("----------str------>", str);
    this.loadData(this.type);
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}

.mt20end {
  margin: 20px 0;
}
</style>


