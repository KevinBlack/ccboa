/**
* create by zx on 2020/8/31 15:12
* 类注释：
* 备注：查询结果仅含‘制发’及‘承办’列表
*/
<template>
  <div class="annual_sear">
    <!--    导出查询数据   必须放于最上边(以防与下边的table的id冲突)-->
    <export-excel
      v-show="false"
      :tableData="excelTableData"
      :tableCols="tableCols"
      :excelTitle="excelTitle"
      :startExport="startExport"
      :tipDate="tipData"
    >
    </export-excel>
    <search-form
      :formData="formData"
      :formCfg="formCfg"
       ref="searchForm"
      :openshow="openshow"
      :config='config'
       :hasShow="hasShow"
      @reset="reset"
      @event="btnevent"
      @submit="submit"
    >
    </search-form>
    <el-col :span="24" style="text-align:right;margin: 10px 0;">
      <el-button
        type="primary"
        size="small"
        @click="exportTables"
      >导出</el-button>
    </el-col>

    <t-table
      style="clear:both"
      @refresh="loadData()"
      @cellClick="cellClick"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="true"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
       :pageSizeList='[20, 30, 50, 100, 200, 500]'
    ></t-table>

    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="seletSelf"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import searchForm from "components/form/searchForm";
import tTable from "components/table/tTable";
import orgTree from "components/tree/orgTree";
import beanList from "../../../util/beanList";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import exportExcel from "components/viewFlow/exportDataExcel";
export default {
  name: "annsearch",
  components: {
    searchForm,
    tTable,
    orgTree,
    exportExcel
  },
  mixins: [bianhanPublic],
  data() {
    return {
      config:{labelWidth:'120px'},//查询条件label宽度
      hasShow:false,//查询条件不展示收起按钮
      seletSelf:1,
      startExport: false, //判断是否开始导出数据
      tipData:'',//导出数据时间段
      openshow:true,
      excelTitle:'',
      excelTableData: [],
      formData: {
        //  documentNo:'〔'+new Date().getFullYear()+'〕',
        documentNo:'',
         numYear:''
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      formCfg: [
         {
          type: "select",
          prop: "numYear",
          label: "编号年份",
          config: { clearable: true },
          options: '近两年',
          span: 8,
          value:'',
          style: { width: "100%" }
        },
        { type: "input", prop: "title", label: "标题", span: 8,value: '' },
        { type: "input", prop: "documentNo", label: "编号", span: 8,value: '' },
        { type: "input", prop: "draftUser", label: "拟稿人", span: 8 },
        {
          type:'date-daterangedefault',
          prop: "$date",
          label: "拟稿日期",
          rangeSeparator:'-',
          span: 8
        },
        [
          {
            type: "input",
            prop: "draftOrgan",
            span: 16,
            style: { width: "75%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectOrg",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "制发/承办行名", span: 8 }
        ],
        [
          {
            type: "input",
            prop: "draftDepartment",
            span: 16,
            style: { width: "75%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selectDepar",
            value: "选择",
            disabled: this.isSave,
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "制发/承办部门", span: 8 }
        ],
        {
          type: "radios",
          prop: "processType",
          label: "处理类型",
          span: 8,
          options: { 1: "全部", 2: "制发", 3: "承办" }
        },
        {
          type: "radios",
          prop: "type",
          label: "流转状态",
          span: 8,
          options: { 1: "全部", 2: "流转", 3: "办结" }
        },
        [
          { type: "button-primary", prop: "$submit", value: "查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ],
      tableData: [],
      tableCols: [
        { label: "拟稿日期", prop: "draftTime",width:100 },
        { label: "编号", prop: "documentNo",minwidth:160  },
        { label: "标题", prop: "title",minwidth:220 },
         { label: "承办部门", prop: "undertakeDepartment",width:200 },
        { label: "当前环节", prop: "currentNode",width:120 },
        { label: "操作人", prop: "currentUser" },
        { label: "拟稿部门", prop: "draftDepartment",width:120  },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            return beanList.bianHanType[row.type];
          }
        }
      ],
      allCols: [
        { label: "拟稿日期", prop: "draftTime",width:100 },
        { label: "编号", prop: "documentNo",minwidth:160  },
        { label: "标题", prop: "title",minwidth:220 },
         { label: "承办部门", prop: "undertakeDepartment",width:200 },
        { label: "当前环节", prop: "currentNode",width:120 },
        { label: "操作人", prop: "currentUser" },
        { label: "拟稿部门", prop: "draftDepartment",width:120  },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            return beanList.bianHanType[row.type];
          }
        }
      ],
      finshCols: [
        { label: "拟稿日期", prop: "draftTime",width:100 },
        { label: "编号", prop: "documentNo",minwidth:160 },
        { label: "标题", prop: "title",minwidth:330},
        { label: "拟稿部门", prop: "draftDepartment",width:120  },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            return beanList.bianHanType[row.type];
          }
        }
      ],      
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      }
    };
  },
  mounted() {     
    //获取默认机构并加载数据
     this.$set(this.formData, "draftOrganId", JSON.parse(localStorage.getItem('userInfo')).unitId);   
    //默认处理类型及流转状态设置
    this.$refs.searchForm.setText("processType", 1);
     this.$refs.searchForm.setText("type",1);
    //加载数据
     //  this.loadData(); 
     this.$refs.searchForm.setText("draftOrgan", JSON.parse(localStorage.getItem('userInfo')).shortUnitName); 

  },
  methods: {
    reset() {
      this.formData = {
        documentNo:'',
        draftOrganId:JSON.parse(localStorage.getItem('userInfo')).unitId,
        draftUser:'',
        numYear:''
      };
      this.$refs.searchForm.setText("$date","");
      this.$refs.searchForm.setText("numYear","近两年");
      this.$refs.searchForm.setText("title","");
      this.$refs.searchForm.setText("draftOrgan", JSON.parse(localStorage.getItem('userInfo')).shortUnitName); 
      this.$set(this.formData, "draftOrganId", JSON.parse(localStorage.getItem('userInfo')).unitId);   
      this.$refs.searchForm.setText('documentNo', '');
      this.$refs.searchForm.setText('draftUser', '');
      this.$refs.searchForm.setText("draftDepartment", '');
      this.$refs.searchForm.setText("processType", 1);
      this.$refs.searchForm.setText("type",1);
      this.$set(this.formData, "draftDepartmentId", '');
    },
    btnevent(params) {
      switch (params.prop) {
        case "title":
          this.formData["title"]=params.value;
          break;
        case "$date":
          if(!!params.value){
          this.formData["draftBeginTime"]=formatData(params.value[0]);
          this.formData["draftEndTime"]=formatData(params.value[1]);
          }else{
             this.formData["draftBeginTime"]='';
             this.formData["draftEndTime"]='';
          }
          break;
        case "numYear":
          this.formData["numYear"] = params.value;
          if(params.value==''){
               this.$refs.searchForm.setText('documentNo', '');
                this.formData["documentNo"] ='';
          }else{
                this.$refs.searchForm.setText('documentNo', '〔'+params.value+'〕');
                this.formData["documentNo"] = '〔'+params.value+'〕';
          }
          break;
        case "$selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true;
          break;
        case "$selectDepar":
          if (!this.formData.draftOrganId) {
            this.$message({
              message: "请先选择机构",
              type: "success"
            });
            return;
          }
          this.title = "部门";
          this.isSingle = false;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.formData.draftOrganId;
          this.showOrgTree = true;
          break;
        case "documentNo":
          delete this.formData.documentNo;
          break;
        case "draftUser":
           delete this.formData.draftUser;
          break;

      }
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$refs.searchForm.setText("draftOrgan", org.unitName);
        this.$set(this.formData, "draftOrganId", org.id);
      } else {
        let deptId = [];
        let deptName = [];
        org.map(item => {
          deptId.push(item.id);
          deptName.push(item.unitName);
        });
        this.$refs.searchForm.setText("draftDepartment", deptName.join(","));
        this.$set(this.formData, "draftDepartmentId", deptId.join(","));
        
      }
    },
    submit(params) {
      this.formData = params;
      this.pagination.pageNum=1;
      if(!!this.formData.type&&this.formData.type==3){
          //办结
          this.tableCols = this.finshCols;
      }else{
          this.tableCols = this.allCols;
      }
      this.loadData();
    },
    loadData() {
      let _formData = this.formData;
      delete _formData.draftDepartment;
      delete _formData.draftOrgan;
      this.$api.bianhan
        .searchByYear(_formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      if (row.type == 10) {
        //跳转到制发页面
                  this.hasOpened(row.id,{
            'name': "addproceorderdeal",
            'query': { id: row.id,numyear:this.formData.numYear}
          })
        // this.$intent.goNewPage(this, {
        //     name: "addproceorderdeal",
        //     query: { id: row.id }
        //   });  
          //制发已办     
        } else if(row.type==11){
          this.$intent.goNewPage(this, {
            name: "proceHas",
            query: { type:1, id: row.id,numyear:this.formData.numYear }
          });
          //制发办结
        }else if(row.type==13){
          this.$intent.goNewPage(this, {
            name: "proceHas",
            query: { type:2, id: row.id,numyear:this.formData.numYear}
          });
        }else if(row.type==20){
        //跳转到承办待办页面
                   this.hasOpened(row.id,{
            'name': "underdeal",
            'query': { id: row.id,numyear:this.formData.numYear,ismulti:row.type }
          })
        //  this.$intent.goNewPage(this, {
        //     name: "underdeal",
        //     query: { id: row.id }
        //   });         
        }else if(row.type==21){
          //承办已办
          this.$intent.goNewPage(this, {
            name: "underdealHas",
            query: { type: 1, id: row.id,numyear:this.formData.numYear,ismulti:row.type}
          });
        } else{
          //承办办结
          this.$intent.goNewPage(this, {
            name: "underdealHas",
            query: { type: 2, id: row.id,numyear:this.formData.numYear,ismulti:row.type }
          });
        }
    },
    exportTables() {
      let month='';
      let day='';
      if(new Date().getMonth()+1<10){
        month='0'+new Date().getMonth()+1;
      }
      if(new Date().getDay()<10){
        day='0'+new Date().getDay();
      }
      this.excelTitle="便函本年度查询结果"+new Date().getFullYear()+month+day;
      let _formData = this.formData;
      delete _formData.draftDepartment;
      delete _formData.draftOrgan;
      this.$api.bianhan
        .searchByYear(_formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.excelTableData = res.data;
          this.$nextTick(() => {
              this.startExport = true;
          });
         
          setTimeout(() => {
            this.startExport = false;
          }, 2000);
        });
    }
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
          value:'',
          span: 8,
          style: { width: "100%" }
        })
    })
  }
};
</script>
<style scoped lang="less">
.annual_sear {
  margin: 0 auto;

  .annual_content {
    .draft_data {
      width: 90%;
      margin: 0 auto;
      display: flex;
    }

    .pro_type {
      width: 90%;
      margin: 0 auto;
      display: flex;
      margin-bottom: 12px;

      div {
        width: 90%;
        height: 16px;
        padding: 12px 0;
        border: 1px solid #ccc;
        margin-left: 22px;
        margin-top: 8px;

        label {
          margin-top: 3px;
          margin-left: 16px;
        }
      }
    }

    .title_box {
      width: 90%;
      margin: 0 auto;
      display: flex;

      input {
        width: 90%;
        height: 30px;
        margin: 0 auto;
        margin-left: 52px;
      }
    }
  }
}

.btn_list {
  width: 30%;
  height: 50px;
  display: flex;
  margin: 0 auto;

  div {
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    cursor: pointer;
    margin: 16px;
  }

  div:first-child {
    background: #2b66e3;
    color: #fff;
  }

  div:last-child {
    border: 1px solid #2b66e3;
    color: #2b66e3;
  }
}

.form_taxt {
  width: 90%;
  height: 100%;
  margin: 0 auto;

  .el-range-editor,
  .el-input__inner {
    width: 100%;
  }

  .radio_box {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    line-height: 40px;
    padding-left: 4%;
  }

  .el-input {
    width: 100%;
  }
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
</style>
