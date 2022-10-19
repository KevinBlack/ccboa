/**
* create by zx on 2022/4/12 17:12
* 类注释：
* 备注：查询结果仅含‘制发’及‘承办’列表
        仅用于便函查阅
*/
<template>
  <div class="annual_sear">
    <!--    导出查询数据   必须放于最上边(以防与下边的table的id冲突)-->
    <t-table
      v-show="false"
      id='exportTable'
      :isIndex="true"
      :tableData="excelTableData"
      :tableCols="tableColsCustom"
      :excelTitle="excelTitle"
      :startExport="startExport"
      :tipDate="tipData"
    >
    </t-table>
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
        @click="downloadTables"
      >批量下载</el-button>
            <el-button
        type="primary"
        size="small"
        @click="exportTables"
      >自定义导出</el-button>
    </el-col>

    <t-table
      style="clear:both"
      @refresh="loadData()"
      @cellClick="cellClick"
       @handleSelectionChange="handleSelectionChange"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
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
    <exportself-dialog :dialogState='dialogVisible'
                        @handleClose='handleClose'
                       :stateLists='stateList'
                       :stateListDatas='stateListData'
                       :elementLists='elementList'
                       :elementListDatas='elementListData'
                       @handleSaveCustom='handleSaveCustom'
                       :objLists='objList'
                       :objListDatas='objListData'></exportself-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import searchForm from "components/form/searchForm";
import tTable from "components/table/tTable";
import orgTree from "components/tree/orgTree";
import beanList from "../../../util/beanList";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
//import exportExcel from "components/viewFlow/exportDataExcel";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import exportTableFun from "@/minixs/exportTable";
import exportselfDialog from "components/dialog/exportself";//自定义导出组件
export default {
  name: "bianhancy",
  components: {
    searchForm,
    tTable,
    orgTree,
  //  exportExcel,
    exportselfDialog
  },
  mixins: [bianhanPublic,exportTableFun,openOrDownLoadFile],
  data() {
    return {
      /**自定义导出弹窗相关参数 */
      dialogVisible:false,
      stateList:['当前环节','操作人'],
      stateListData:[{label:'当前环节',prop:'currentNode'},
                    {label:'操作人',prop:'currentUser'}],
      elementList: ['拟稿日期','拟稿部门','编号','类型','标题','承办部门'],
      elementListData:[{label:'拟稿日期',prop:'draftTime'},
                    {label:'拟稿部门',prop:'draftDepartment'},
                    {label:'抄送',prop:'copy'},
                    {label:'编号',prop:'documentNo'},
                    {label:'类型',prop:'type',formatter(row) {
            return beanList.bianHanType[row.type];
          }},
                    {label:'拟稿人',prop:'draftUser'},
                    {label:'标题',prop:'title'},
                    {label:'反馈方式',prop:'feedbackMode',formatter(row) {
            return beanList.bianHanFeedbackMode[row.feedbackMode];
          }},
                    {label:'联系电话',prop:'phone'},
                    {label:'承办部门',prop:'undertakeDepartment'},
                    {label:'主送',prop:'main'},
                    {label:'附件标题',prop:'attachmentName'}],
      objList:[],
      objListData:[{label:'传阅人员未阅',prop:'wyPle'},
                    {label:'传阅人员已阅',prop:'yyPle'}],
      /***自定义导出弹窗相关参数end */
      selectionArr:[],//
      config:{labelWidth:'120px'},//查询条件label宽度
      hasShow:false,//查询条件不展示收起按钮
      seletSelf:1,
      startExport: false, //判断是否开始导出数据
      tipData:'',//导出数据时间段
      openshow:true,
      excelTitle:'',
      excelTableData: [],
      formData: {
         documentNo:'',
         numYear:'',
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      yearList:[],
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
      tableColsCustom:[],
           //排序拟稿日期、编号、标题、承办部门、当前环节、操作人、拟稿部门、类型、
      //反馈方式、主送、抄送、拟稿人、联系电话、附件标题、传阅人员未阅、传阅人员已阅
      ColsCustom:[
         {label:'拟稿日期',prop:'draftTime'},
         {label:'编号',prop:'documentNo'},
         {label:'标题',prop:'title'},
         {label:'承办部门',prop:'undertakeDepartment'},
         {label:'当前环节',prop:'currentNode'},
         {label:'操作人',prop:'currentUser'},         
         {label:'拟稿部门',prop:'draftDepartment'},
         {label:'类型',prop:'type',formatter(row) {
            return beanList.bianHanType[row.type];
          }},
         {label:'反馈方式',prop:'feedbackMode',formatter(row) {
            return beanList.bianHanFeedbackMode[row.feedbackMode];
          }},
         {label:'主送',prop:'main'},
         {label:'抄送',prop:'copy'},
         {label:'拟稿人',prop:'draftUser'},
         {label:'联系电话',prop:'phone'},
         {label:'附件标题',prop:'attachmentName'},
         {label:'传阅人员未阅',prop:'wyPle'},
         {label:'传阅人员已阅',prop:'yyPle'}
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
      },
      export:{
        pageNum:1,
        // pages:5000,//分页
        pages:1000,
        total:0,
        step:6,
        exportTotal:0,
      },
      msg:'',
    };
  },
  created(){
      this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
        this.formCfg.splice(0,1, {
          type: "select",
          prop: "numYear",
          label: "编号年份",
          config: { clearable: true },
          options: this.yearList,
          span: 8,
          value:'',
          style: { width: "100%" }
        })
    })
  },
  mounted() {     
  //  console.log(yearlist)
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
    handleSelectionChange(valArr){
      let self=this;
      this.selectionArr = valArr?.map(item=>{
        return {...item,numYear:self.formData.numYear}
      });
    },
    downloadTables(){
      if (this.selectionArr.length==0) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择要下载的数据!",
          duration: 1500,
        })
        return;
      }
     let _self=this;
     this.$api.bianhan
        .bianhanCyfetchDown(this.selectionArr)
        .then(res => {
          _self.handleDownLoadState(res.data)
          //   this.interval = setInterval(() => {
          //         clearInterval(this.interval);
          //  _self.downFile({'filePath':res.data,'fileName':'便函查阅.zip'})
          // }, 4000)
        })
    },
    handleDownLoadState(downloadUrl) {
       let _self=this;
       let HAS_ZIP_TIPS=false;//是否已提示压缩中

      this.interval = setInterval(() => {
       this.$api.bianhan
        .bianhanCyCheckDown(downloadUrl)
        .then(res => {
          if (res.code&&res.data) {
            console.log(res,res.code&&res.data,'11')
             clearInterval(this.interval);
             console.log(this.msg,'msg1')
             if(!!this.msg){
               this.msg.close();
             }
            _self.downFile({'filePath':downloadUrl,'fileName':''},'',true)
            
          } else if(res.code&&!res.data) {
            if(!HAS_ZIP_TIPS){
             HAS_ZIP_TIPS=true;
             this.msg=this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: '文件压缩中，请稍后',
                duration: 0
              });
              console.log(this.msg,'msg')
            }
          } else {
            if(!!this.msg){
               this.msg.close();
             }
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.msg,
              duration: 2000
            });
            clearInterval(this.interval);
          }
        })
      }, 4000)
    },
    handleClose(){
      this.dialogVisible=false;
    },
    reset() {
      this.formData = {
        documentNo:'',
        draftOrganId:JSON.parse(localStorage.getItem('userInfo')).unitId,
        draftUser:'',
        numYear:'',
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
        .bianhanCyLB(_formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      //均跳转到办结页面
      if (row.type == 10||row.type==11||row.type==13) {
         //制发办结
          this.$intent.goNewPage(this, {
            name: "proceHas",
            query: { type:2, id: row.id,numyear:this.formData.numYear }
          });
        } else{
          //承办办结
          this.$intent.goNewPage(this, {
            name: "underdealHas",
            query: { type: 2, id: row.id,numyear:this.formData.numYear,ismulti:row.type }
          });
        }
    },
    //自定义导出
    handleSaveCustom(data){  
      console.log(data,'筛选') 
      this.hasFile=data.includes('附件标题');
      this.tableColsCustom = this.ColsCustom.filter(item => data.some(e => e === item.label));
      this.export.pageNum=1;
      this.export.exportTotal=0;
      this.zdyExport();
    },
    zdyExport(){
      this.handleReqAllData().then(res=>{
         //5000千条导出一个table表
            this.dialogVisible=false;
            let tableTotal = Math.ceil(this.export.total / this.export.pages);//2

           if(tableTotal>=2&&this.export.pageNum<=tableTotal){
              
              if(this.export.pageNum%(this.export.step-1)===0){
                let tableName = "便函查询表(" + (this.export.pageNum * this.export.pages - 
                this.export.pages*5+1) + "-" + this.export.pageNum * this.export.pages + ")";
                this.export.exportTotal=this.export.pageNum * this.export.pages;
                exportTableFun.exportExcel(tableName,'#exportTable');//便函查询表(1-5000)、便函查询表(5001-10000)
                this.export.pageNum++;
                this.zdyExport()
              }else{
                this.export.pageNum++;
                this.zdyExport()
              }

             
           }else if(tableTotal==1){ 
             exportTableFun.exportExcel("便函查询表",'#exportTable')
           }else{
             let total=this.export.exportTotal+this.excelTableData.length;
             let tableName = "便函查询表(" + this.export.exportTotal
              + "-" + total + ")";
                exportTableFun.exportExcel(tableName,'#exportTable');//便函查询表(1-5000)、便函查询表(5001-10000)

           }
           
       })
    },
    async handleReqAllData() {
      let _formData = this.formData;
      delete _formData.draftDepartment;
      delete _formData.draftOrgan;
      await this.$api.bianhan
        .bianhanCyLB({..._formData,hasFile:this.hasFile}, {
          PAGE_JUMP: this.export.pageNum,
          REC_IN_PAGE: this.export.pages,
        })
        .then(res => {
          //不足5000页进行数据拼接
          if(this.export.pageNum%this.export.step===0){
            this.excelTableData = res.data;
          }else{
            this.excelTableData.push(...res.data);
          }
          this.export.total=res.total;
        });
    },
    exportTables(data) {
      this.dialogVisible=true;
    }
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
