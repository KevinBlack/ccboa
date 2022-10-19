<template>
  <div class="searchform">
    <!--    导出查询数据   必须放于最上边(以防与下边的table的id冲突)-->
    <export-excel
      v-show="false"
      :tableData="excelTableData"
      :tableCols="tableCols"
      :excelTitle="excelTitle"
      :startExport="startExport"
      :tipDate="tipData"
    ></export-excel>
    <search-form
      ref="searchForm"
      :formData="formData"
      :formCfg="formCfg"
      :config='config'
      :openshow="openshow"
      :hasShow="hasShow"
      @reset="reset"
      @event="btnevent"
      @submit="submit"
    >
    </search-form>
    <el-col :span="24" style="text-align: right;margin-bottom: 5px;">
      <el-button type="primary" @click="exportSearch">导出</el-button>
    </el-col>
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      :isIndex="true"
      :searchData="searchData"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :pageSizeList='[20, 30, 50, 100, 200, 500]'
    ></m-table>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      :seletSelf="seletSelf"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import searchForm from "components/form/searchForm";
import mTable from "components/table/tTable";
// import orgTree from "components/viewFlow/orgTreeLevel";
import shiwucommon from "../minixs/shiwucommon"; //事物审批公共方法
import orgTree from "components/tree/orgTree";
import exportExcel from "components/viewFlow/exportDataExcel";
export default {
  name: "search",
  components: {
    searchForm,
    mTable,
    orgTree,
    exportExcel
  },
   mixins: [ shiwucommon],
  props: {},
  data() {
    return {
      config:{labelWidth:'100px'},//查询条件label宽度
      hasShow:false,//查询条件不展示收起按钮
      seletSelf: 1,
      tipData: "", //导出数据时间段
      startExport: false, //判断是否开始导出数据
      excelTitle: "事务审批查询",
      excelTableData: [],
      openshow: true,
      orgListStr: [],
      isdialog: false,
      isSava: true,
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      searchData: {},
      applyNameList: [], //申请项目LIST
      formCfg:[
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
        { type: "input", prop: "title", label: "标题", span: 8,value: '' },
        {type: "input",prop: "approveNo",label: "审批编号",span: 8,value: ""},
        { type: "input",prop: "applyNo",label: "申请编号",span: 8,value: ""},
        {
          type:'date-daterange',
          prop: "$date",
          label: "查询日期",
          rangeSeparator:'-',
          span: 8,
          valueFormat:"yyyy-MM-dd"
        },
        [                  
          {
            type: "input",
            prop: "approveUnitName",
            span: 16,
            style: { width: "76%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectOrg",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "请示/审批行", span: 8 }
        ],
        [
          {
            type: "input",
            prop: "manageDept",
            span: 16,
            style: { width: "76%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectDepar",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "申请部门", span: 8 }
        ],
        {
          type: "select",
          prop: "applyProjectName",
          label: "申请项目",
          config: { clearable: true },
          options: '',
          span: 8,
          style: { width: "100%" }
        },
        { type: "input", prop: "contactName", label: "联系人", span: 8 },
        {
          type: "radios",
          prop: "type",
          label: "审批状态",
          span: 8,
          value:4,
          options: { 4: "全部", 3: "流转", 2: "办结" }
        },
        {
          type: "radios",
          prop: "khType",
          label: "跨行类型",
          span: 8,
          value:0,
          options: { 2: "全部", 1: "跨行", 0: "非跨行" }
        },
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-90px" }
          },
        ]
      ],
      formData: {
        khType: "2",
        approveNo: "",
        applyNo: "",
        numYear:'',
      },
      tableData: [],
      tableCols: [
        { label: "申请日期", prop: "applyTime",width: 100 },
        { label: "申请编号", prop: "applyNo" },
        { label: "审批编号", prop: "approveNo" },
        { label: "标题", prop: "title" },
        { label: "申请项目", prop: "applyProjectName" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "联系人", prop: "contactName" },
        { label: "当前处理人", prop: "currentUser" },
        { label: "当前环节", prop: "currentNode" }
      ],
      allCols: [
        { label: "申请日期", prop: "applyTime",width: 100 },
        { label: "申请编号", prop: "applyNo" },
        { label: "审批编号", prop: "approveNo" },
        { label: "标题", prop: "title" },
        { label: "申请项目", prop: "applyProjectName" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "联系人", prop: "contactName" },
        { label: "当前处理人", prop: "currentUser" },
        { label: "当前环节", prop: "currentNode" }
      ],
      finshCols: [
        { label: "申请日期", prop: "applyTime",width: 100 },
        { label: "申请编号", prop: "applyNo" },
        { label: "审批编号", prop: "approveNo" },
        { label: "标题", prop: "title" },
        { label: "申请项目", prop: "applyProjectName" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "联系人", prop: "contactName" }
      ],
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 20 //每页条数
      },
      haskhType: false
    };
  },
  computed: {},
  methods: {
    //初始化查询条件
    initData() {
      this.formCfg = [
         {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          config: { clearable: true },
          options: this.yearList,
          value:'',
          span: 8,
          style: { width: "100%" }
        },
        { type: "input", prop: "title", label: "标题", span: 8,value: '' },
        {type: "input",prop: "approveNo",label: "审批编号",span: 8,value: ""},
        { type: "input",prop: "applyNo",label: "申请编号",span: 8,value: ""},
        {
          type:'date-daterange',
          prop: "$date",
          label: "查询日期",
          rangeSeparator:'-',
          span: 8,
          valueFormat:"yyyy-MM-dd"
        },
        [                  
          {
            type: "input",
            prop: "approveUnitName",
            span: 16,
            style: { width: "76%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectOrg",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "请示/审批行", span: 8 }
        ],
        [
          {
            type: "input",
            prop: "manageDept",
            span: 16,
            style: { width: "76%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectDepar",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "申请部门", span: 8 }
        ],
        {
          type: "select",
          prop: "applyProjectName",
          label: "申请项目",
          config: { clearable: true },
          options: this.applyNameList.join(","),
          span: 8,
          style: { width: "100%" }
        },
        { type: "input", prop: "contactName", label: "联系人", span: 8 },
        {
          type: "radios",
          prop: "type",
          label: "审批状态",
          span: 8,
          value:4,
          options: { 4: "全部", 3: "流转", 2: "办结" }
        },
        {
          type: "radios",
          prop: "khType",
          label: "跨行类型",
          span: 8,
          value:0,
          options: { 2: "全部", 1: "跨行", 0: "非跨行" }
        },
        [         
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-90px" }
          },
        ]
      ];
    },
    reset() {
      this.formData = {
        approveNo: "",
        applyNo: "",
        numYear:'',
      };
      this.$refs.searchForm.setText("numYear","近两年");
      this.$refs.searchForm.setText("$date","");
      this.$refs.searchForm.setText("title","");
       this.$refs.searchForm.setText("contactName","");
      this.$refs.searchForm.setText(
        "approveNo",
        ""
      );
      this.$refs.searchForm.setText(
        "applyNo",
        ""
      );
       if (this.haskhType) {
            this.formCfg.splice(11, 1);
            this.haskhType = false;
          } 
       this.$refs.searchForm.setText("approveUnitName","");
       this.$refs.searchForm.setText("manageDept","");
       this.$refs.searchForm.setText("applyProjectName","");
      this.$refs.searchForm.setText("type","4");
      this.$refs.searchForm.setText("khType","0");

    },
    submit(params) {
      this.formData = params;
      if (!!this.formData.type && this.formData.type == 2) {
        //办结数据
        this.tableCols = this.finshCols;
      } else {
        this.tableCols = this.allCols;
      }
      this.loadData();
    },
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      if (this.formData.type == "4") {
        this.formData.type = "1";
      }
      this.$api.checkLz
        .APSearchTable(
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
          this.pagination.total = res.total || 0;
          this.tableData = res.list;
        });
    },
    cellClick(row) {
       let rowCell = {
        id: row.id,
        isKh: row.isKh,
        type: "checkLz",
        numyear:this.formData.numYear
      };
      //改版后数据且是请假备案申请项目,进入新版页面
      if((row.applyProjectName=='主要负责人请假、备案申请'
      ||row.applyProjectName=='主要负责人请假、备案申请')
      &&row.sourceType=='1'){
        //是否是代办页面
        const iswait=row.type === "0"?true:false;
        if(iswait){
          this.hasOpened(row.id, {
            name: "approvalDetailv",
            query: {id: row.id,isKh: row.isKh,type: "checkLz",iswait:iswait,numyear:this.formData.numYear}
          })
        }else{
          this.$intent.goNewPage(this, {
            name: "approvalDetailv",
            query: {id: row.id,isKh: row.isKh,type: "checkLz",iswait:iswait,numyear:this.formData.numYear}
          });
        }
      }else if (row.type === "0") {
        this.hasOpened(row.id,{
          name: "approvalDetail",
          query: rowCell})
        // this.$intent.goNewPage(this, {
        //   name: "approvalDetail",
        //   query: rowCell
        // });
      } else if (row.type === "1" || row.type === "2") {
        let rowData = JSON.stringify(row);
        this.$intent.goNewPage(this, {
          name: "finapprovalDetail",
          query: rowCell
        });
      }
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.formData.manageBankId = org.id;
        this.$refs.searchForm.setText("approveUnitName", org.unitName);
        this.$set(this.formData, "curbankId", org.id);
      } else {
        let deptId = [];
        let deptName = [];
        org.map(item => {
          deptId.push(item.id);
          deptName.push(item.unitName);
        });
        this.$refs.searchForm.setText("manageDept", deptName.join(","));
        // this.$refs.searchForm.setText('manageDept', deptName.join(","))
        // this.$set(this.formData, 'manageDept', deptName.join(","))
        this.$set(this.formData, "draftDepartmentId", deptId.join(","));
      }
    },
    handleClose() {
      this.isdialog = false;
    },
    delecurrentCode() {
      this.isdialog = false;
    },
    select() {},
    //导出查询数据
    exportSearch() {
      this.$api.checkLz
        .APSearchTable(
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
          this.excelTableData = res.list;
          this.tipData =
            "统计日期：" +
            this.formData.approveTimeStart +
            "至" +
            this.formData.approveTimeEnd +
            "计量单位：份";
          this.$nextTick(item => {
            this.startExport = true;
          });
          setTimeout(() => {
            this.startExport = false;
          }, 2000);
        });
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true;
          break;
        case "numYear":
          this.formData["numYear"] = params.value;
          if(params.value==''){
              this.$refs.searchForm.setText('applyNo', '');
              this.formData["applyNo"] ='';
              this.$refs.searchForm.setText('approveNo', '');
              this.formData["approveNo"] ='';
          }else{
                this.$refs.searchForm.setText('approveNo', '〔'+params.value+'〕');
                this.formData["approveNo"] = '〔'+params.value+'〕';
                this.$refs.searchForm.setText('applyNo', '〔'+params.value+'〕');
                this.formData["applyNo"] = '〔'+params.value+'〕';
          }
          break;
        case "$selectDepar":
          if (!this.formData.curbankId) {
            this.$message({
              message: "请先选择机构",
              type: "success"
            });
            return;
          }
          this.title = "部门";
          this.isSingle = false;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.formData.curbankId;
          this.showOrgTree = true;
          break;
        case "$selectDoOrg":
          this.isdialog = true;
          break;
        case "khType":
          //console.log("params", params);
          if (params.value == 0) {
            this.formCfg.splice(11, 1);
            this.haskhType = false;
          } else if (!this.haskhType) {
            this.haskhType = true;
            this.formCfg.splice(11, 0, {
              type: "radios",
              prop: "khLevel",
              span: 10,  
              class:'khclass',
              label: "跨行层级",
              options: { 3: "全部", 2: "本级行上报", 1: "下级行上报" }
            });
          }

          break;
        case "contactName":
           this.formData["contactName"]=params.value;
           break;
        case "title":
          this.formData["title"]=params.value;
          break;
        case "applyNo":
          this.formData["applyNo"] = params.value;
          break;
        case "approveNo":
          this.formData["approveNo"] = params.value;
          break;
        case "applyProjectName":
          this.formData["applyProjectName"] = params.value;
          break;
        case "$date":
         // console.log("params", params);
          this.formData["approveTimeStart"]=params.value[0];
          this.formData["approveTimeEnd"]=params.value[1];
          break;
      }
    },
    //获取申请项目list
    queryApplyName() {
      this.$api.argumentPre
        .applyItemTable({
          manageBankId: JSON.parse(localStorage.getItem("userInfo")).unitId
        })
        .then(res => {
          res.data &&
            res.data.map(item => {
              this.applyNameList.push(item.applyProject);
            });
          this.initData();
        });
    },
  },
  activated() {},
  mounted() {
        this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
        this.formCfg.splice(0,1, {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          value:'',
          config: { clearable: true },
          options: this.yearList,
          span: 8,
          style: { width: "100%" }
        })
      console.log(res)
    })
    document.title="事务审批";
    this.queryApplyName();
    this.$nextTick(() => {
      this.$refs.searchForm.setText("type","4");
      this.$refs.searchForm.setText("khType","0");
    });
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.down {
  font-size: 12px;
  text-align: center;
}
.pickTime .el-date-editor .el-range-separator {
  padding: 0px 20px !important;
  width: 10%;
}
.el-form-item el-range-separator {
  padding: 0px 20px !important;
  width: 10%;
}
/deep/.el-button{
  line-height: 0.9;
}
.searchForm {
    border: 1px solid #f0f0f0;
    padding: 20px 16px 0 0;
    margin-bottom: 10px;
    margin: 16px 0 10px;
}
.ces-table-page{
  clear: both;
}
</style>
