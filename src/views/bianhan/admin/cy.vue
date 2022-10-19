/**
* create by zx on 2020/8/25 14:19
* 类注释：传阅
* 备注：
*/
<template>
  <div class="cy">
    <el-tabs @tab-click="handletabClick" v-model="paneTab">
      <el-tab-pane label="未阅" name="typeFir"></el-tab-pane>
      <el-tab-pane label="已阅" name="typeSec"></el-tab-pane>
    </el-tabs>
    <search-form
      :formData="searchData"
      :openshow="openshow"
       ref="searchFrom"
      @reset="reset"
      :config='config'
       :hasShow="hasShow"
      class="mt20"
      @event="btnevent"
      @submit="submit"
      :formCfg="formCfg"
    >
    </search-form>
    <el-button type="danger" @click="deleteForms" style="float: right;margin-top: -54px;margin-right: 20px;
    position: relative;
    z-index: 2;">删除</el-button>
    <m-table
      @refresh="loadData"
      @cellClick="jumpdeal"
      :isHandle="false"
      :isIndex="false"
      :isSelection="true"
      @select="select"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :pageSizeList='[20, 30, 50, 100, 200, 500]'
      :default-sort="{prop:'sendTime',order:'desc'}"
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
import mTable from "@/components/table/tTable";
import searchForm from "components/form/searchForm";
import orgTree from "components/tree/orgTree";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: "cy",
  components: {
    mTable,
    orgTree,
    searchForm,
    selectOrgOrDept
  },
  mixins: [bianhanPublic],
  data() {
    return {
      config:{labelWidth:'100px'},//查询条件label宽度
      hasShow:false,//查询条件不展示收起按钮
      selectIds: [], //已选择的表单id
      title: "",
      seletSelf: 1, //机构树
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      showOrgTree: false,
      currentSelectSearchdata: JSON.parse(localStorage.getItem("userInfo"))
        .shortUnitName,
      paneTab: "typeFir",
      needTodoNum: 0,
      openshow: true,
      searchData: {
        draftOrganId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        documentNo: "",
        numYear:'',
      },
      tableData: [],
      tableCols: [
        { label: "传阅日期", prop: "sendTime",width:160 },
        { label: "编号", prop: "documentNo",minwidth:200 },
        { label: "标题", prop: "title",minwidth:338 },
        { label: "拟稿部门", prop: "draftDepartment",minwidth:120 }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      type: 7,
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
        { type: "input", prop: "title", label: "标题", span: 8 },
        {
          type: "input",
          prop: "documentNo",
          label: "编号",
          span: 8,
          value: ""
        },
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
          { type: "formitem", label: "机构",span:8  }
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
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
         this.$refs.searchFrom.setText("draftOrgan", org.unitName);
        this.$set(this.searchData, "draftOrganId", org.id);
      } 
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
          .deleteFormOfzh({ ids: this.selectIds, type: "cy",
          unitId:this.searchData.draftOrganId,
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
    btnevent(params) {
      switch (params.prop) {
        case "$date":
          this.searchData["sendBeginTime"]=params.value[0];
          this.searchData["sendEndTime"]=params.value[1];
          break;
        case "numYear":
           this.searchData["numYear"] = params.value;
          if(params.value==''){
               this.$refs.searchFrom.setText('documentNo', '');
                this.searchData["documentNo"] ='';
          }else{
                this.$refs.searchFrom.setText('documentNo', '〔'+params.value+'〕');
                this.searchData["documentNo"] = '〔'+params.value+'〕';
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
        case "title":
          this.searchData["title"] = params.value;
          break;
        case "draftUser":
          this.searchData["draftUser"] = params.value;
          break;
        case "documentNo":
          this.searchData["documentNo"] = params.value;
          break;
      }
    },
    handletabClick(tab, event) {
      if (tab.name === "typeFir") {
        this.type = "7";
      } else if (tab.name === "typeSec") {
        this.type = "8";
      } else {
        return;
      }
      if (this.searchData.draftOrganId != undefined) {
          this.loadData();
      } else {
          this.getInitOrg();
      }
    },
    selectOrg(org) {
      this.currentSelectSearchdata = org.unitName;
      this.searchData.draftOrganId = org.id;
    },
    loadData() {
      this.searchData.type = this.type;
      this.$api.bianhan
        .chuanyueList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    submit(params) {
      this.searchData = params;
      this.pagination.pageNum = 1;
      this.loadData();
    },
    reset() {
      this.searchData = {
        documentNo: "",
        draftOrganId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        numYear:''
      };
      this.$refs.searchFrom.setText("$date","");
      this.$refs.searchFrom.setText("numYear","近两年");
      this.$refs.searchFrom.setText("title","");
       this.$refs.searchFrom.setText("draftOrgan", JSON.parse(localStorage.getItem("userInfo")).shortUnitName);
      this.$set(this.searchData, "draftOrganId",JSON.parse(localStorage.getItem("userInfo")).unitId);
      this.$refs.searchFrom.setText(
        "documentNo",
        ""
      );
      this.$refs.searchFrom.setText("draftUser", "");
    },
    getInitOrg() {
      this.$set(
        this.searchData,
        "draftOrganId",
        JSON.parse(localStorage.getItem("userInfo")).unitId
      );
      this.loadData();
        this.$refs.searchFrom.setText(
          "draftOrgan",
          JSON.parse(localStorage.getItem("userInfo")).shortUnitName
        );
    },
    jumpdeal(val) {
      if(this.type=='7'){
         this.hasOpened(val.id,{
            'name': "admincirculate",
            'query': { id: val.id, type: val.type, main: -1,numyear:this.searchData.numYear}
          })
      }else{
      this.$intent.goNewPage(this, {
        path: "/admincirculate",
        query: { id: val.id, type: val.type, main: -1,numyear:this.searchData.numYear }
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

