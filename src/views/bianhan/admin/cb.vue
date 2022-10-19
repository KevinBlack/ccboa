/**
* create by zx on 2020/8/25 14:19
* 类注释：承办
* 备注：
*/
<template>
  <div class="cb">
    <el-tabs @tab-click="handletabClick" v-model="paneTab">
      <el-tab-pane label="流转" name="typeFir"></el-tab-pane>
      <el-tab-pane label="办结" name="typeSec"></el-tab-pane>
    </el-tabs>
    <search-form
      :formData="formData"
      @reset="reset"
      class="mt20"
      :config='config'
       :hasShow="hasShow"
      :openshow="openshow"
      ref="searchFrom"
      @submit="submit"
      @event="btnevent"
      :formCfg="formCfg"
    >
    </search-form>
    <el-button type="danger" @click="deleteForms" style="float: right;margin-top: -54px; margin-right: 20px;
    position: relative;
    z-index: 2;">删除</el-button>
    <m-table
      @refresh="loadData"
      @cellClick="jumpdeal"
      :isHandle="false"
      :isIndex="false"
      @select="select"
      :isSelection="true"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :pageSizeList='[20, 30, 50, 100, 200, 500]'
      :default-sort="{prop:'receiveDate',order:'desc'}"
    ></m-table>

    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :seletSelf="seletSelf"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import searchForm from "components/form/searchForm";
import orgTree from "components/tree/orgTree";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: "cb",
  components: {
    mTable,
    searchForm,
    orgTree
  },
  mixins: [bianhanPublic],
  data() {
    return {
      config:{labelWidth:'100px'},//查询条件label宽度
      hasShow:false,//查询条件不展示收起按钮
      selectIds: [], //已选择的表单id
      title: "",
      seletSelf: 1, //机构树
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      paneTab: "typeFir",
      needTodoNum: 0,
      tableData: [],
      type: 4,
      formData: {
        sort: "desc",
        numYear:'',
        sortKey: "draftTime",
        documentNo: ""
      },
      openshow: true,
      tableCols: [
        { label: "接收日期", prop: "draftTime",width:86 },
        { label: "编号", prop: "documentNo" ,minwidth:200},
        { label: "标题", prop: "title" ,minwidth:238},
        { label: "当前环节", prop: "currentNode",minwidth:120 },
        { label: "承办部门", prop: "undertakeDepartment",minwidth:120 },
        { label: "操作人", prop: "currentUser" },
        { label: "拟稿人", prop: "draftUser" }
      ],
      initCols: [
        { label: "接收日期", prop: "draftTime",width:86 },
        { label: "编号", prop: "documentNo",minwidth:200 },
        { label: "标题", prop: "title",minwidth:238 },
        { label: "当前环节", prop: "currentNode",minwidth:120 },
        { label: "承办部门", prop: "undertakeDepartment",minwidth:120 },
        { label: "操作人", prop: "currentUser" },
        { label: "拟稿人", prop: "draftUser" }
      ],
      finishCols: [
        { label: "接收日期", prop: "draftTime",width:86 },
        { label: "编号", prop: "documentNo",minwidth:200 },
        { label: "标题", prop: "title" ,minwidth:238},
        { label: "承办部门", prop: "undertakeDepartment",minwidth:120 },
        { label: "拟稿人", prop: "draftUser" }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      formCfg: [
        {
          type: "select",
          prop: "numYear",
          label: "编号年份",
          config: { clearable: true },
          options: '近两年',
          span: 8,
          style: { width: "100%" }
        },
        { type: "input", prop: "title", label: "标题", span: 8,value: '' },
        { type: "input", prop: "documentNo", label: "编号", span: 8,value: ''},
        { type: "input", prop: "draftUser", label: "拟稿人", span: 8 },
        {type:'date-daterange',
          prop: "$date",
          label: "拟稿日期",
          rangeSeparator:'-',
          span: 8,
          valueFormat:"yyyy-MM-dd"
        },
        [
          {
            type: "input",
            prop: "draftOrgan",
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
          { type: "formitem", label: "承办机构",span:8  }
        ],
        [
          {
            type: "input",
            prop: "draftDepartment",
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
          { type: "formitem", label: "承办部门",span:8  }
        ],
        [
          { type: "button-primary", prop: "$submit", value: "查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ]
    };
  },
  methods: {
    //批量删除选择
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.selectIds = dataArry;
    },
    deleteForms() {
      if (this.selectIds == 0) {
        this.$message({
          message: "请选择要删除的数据！",
          type: "error"
        });
        return;
      }
      this.$confirm(
        "将彻底删除该文件及其所有关联文件，且无法恢复，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$api.bianhan
          .deleteFormOfzh({ ids: this.selectIds, type: "cb",
          unitId:this.formData.draftOrganId,
           curUnitId:JSON.parse(localStorage.getItem('userInfo')).currUnitId})
          .then(res => {
            if (res.code == "SUCCESS") {
              this.deleteArry = "";
              //this.pagination.pageSize=1;
              
              this.$message({
                message: "删除成功",
                type: "success"
              });
               this.loadData();
            }
          });
      });
    },
    handletabClick(tab, event) {
      if (tab.name === "typeFir") {
        this.type = "4";
        this.tableCols = this.initCols;
      } else if (tab.name === "typeSec") {
        this.type = "5";
        this.tableCols = this.finishCols;
      } else {
        return;
      }
      if (this.formData.draftOrganId != undefined) {
          this.loadData();
      } else {
          this.getInitOrg();
      }
    },
    getInitOrg() {
      this.$set(
        this.formData,
        "draftOrganId",
        JSON.parse(localStorage.getItem("userInfo")).unitId
      );
      this.loadData();
        this.$refs.searchFrom.setText(
          "draftOrgan",
          JSON.parse(localStorage.getItem("userInfo")).shortUnitName
        );
    },
    submit(params) {
      this.formData = params;
      this.pagination.pageNum = 1;
      if (this.formData.draftOrganId == undefined) {
        this.$message({
          message: "请先选择机构",
          type: "success"
        });
        return;
      }
      this.loadData();
    },
    reset() {
      this.formData = {
        documentNo: "",
        draftOrganId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        draftUser: "",
        numYear:'',
      };
      this.$refs.searchFrom.setText("$date","");
      this.$refs.searchFrom.setText("title","");
      this.$refs.searchFrom.setText("numYear","近两年");
      this.$refs.searchFrom.setText(
        "draftOrgan",
        JSON.parse(localStorage.getItem("userInfo")).shortUnitName
      );
      this.$set(
        this.formData,
        "draftOrganId",
        JSON.parse(localStorage.getItem("userInfo")).unitId
      );
      this.$refs.searchFrom.setText(
        "documentNo",
        ""
      );
      this.$refs.searchFrom.setText("draftUser", "");
      this.$refs.searchFrom.setText("draftDepartment", "");
      this.$set(this.formData, "undertakeDepartmentId", "");
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$refs.searchFrom.setText("draftOrgan", org.unitName);
        this.$set(this.formData, "draftOrganId", org.id);
      } else {
        let deptId = [];
        let deptName = [];
        org.map(item => {
          deptId.push(item.id);
          deptName.push(item.unitName);
        });
        this.$refs.searchFrom.setText("draftDepartment", deptName.join(","));
        this.$set(this.formData, "undertakeDepartmentId", deptId.join(","));
      }
    },
    btnevent(params) {
      switch (params.prop) {
        case "title":
          this.formData["title"]=params.value;
          break;
        case "numYear":
           this.formData["numYear"] = params.value;
          if(params.value==''){
               this.$refs.searchFrom.setText('documentNo', '');
                this.formData["documentNo"] ='';
          }else{
                this.$refs.searchFrom.setText('documentNo', '〔'+params.value+'〕');
                this.formData["documentNo"] = '〔'+params.value+'〕';
          }
          break;
        case "$date":
          if(!!params.value){
          this.formData["draftBeginTime"]=params.value[0];
          this.formData["draftEndTime"]=params.value[1];
          }else{
             this.formData["draftBeginTime"]='';
             this.formData["draftEndTime"]='';
          }
          break;
        case "$selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.seletSelf = 1;
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
          this.seletSelf = 0;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.formData.draftOrganId;
          this.showOrgTree = true;
          break;
        case "draftUser":
          this.formData["draftUser"] = params.value;
          break;
        case "documentNo":
          this.formData["documentNo"] = params.value;
          break;
      }
    },
    loadData() {
      this.formData.type = this.type;

      //当搜索条件为当前操作人时，后端所需字段为undertakeHandlePerson
      if (this.formData.sortKey == "currentUser") {
        this.formData.sortKey = "undertakeHandlePerson";
      }
      let _formData = this.formData;
      delete _formData.draftDepartment;
      delete _formData.draftOrgan;

      this.$api.bianhan
        .ubderTable(_formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          try {
            this.tableData = res.list.filter(item => {
              item.draftTime = item.draftTime.slice(0, 10);
              return item;
            });
          } catch (e) {
            this.tableData = [];
          }

          this.pagination.total = res.total;
        });
    },
    jumpdeal(val) {
      if (val.type == 0 || val.type == 1) {
       this.hasOpened(val.id,{
            'name': "adminunderdeal",
            'query': { type: -1, id: val.id,numyear:this.formData.numYear,ismulti:val.type}
          })
        // this.$intent.goNewPage(this, {
        //   name: "adminunderdeal",
        //   query: { type: -1, id: val.id }
        // });
      } else {
        this.$intent.goNewPage(this, {
          name: "adminunderdealHas",
          query: { type: -1, id: val.id,numyear:this.formData.numYear,ismulti:val.type}
        });
      }
    }
  },
  mounted() {
    //获取默认机构并加载数据
    this.getInitOrg();
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
  },
  activated() {}
};
</script>
<style scoped lang="less">
.add_memo {
  width: 60px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border: 1px dashed #3b84ee;
  margin-left: 50px;
  margin-top: 20px;
  cursor: pointer;
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

