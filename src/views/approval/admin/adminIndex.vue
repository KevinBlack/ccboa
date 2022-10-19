<template>
  <div class="checkLz">
    <el-tabs @tab-click="handleClick" v-model="paneTab">
      <el-tab-pane label="流转" name="typeFir"></el-tab-pane>
      <el-tab-pane label="办结" name="typeSec"></el-tab-pane>
    </el-tabs>
    <search-form
      ref="searchForm"
      :formData="formData"
      :openshow="openshow"
      :hasShow="hasShow"
      :config="config"
      @event="btnEvent"
      @reset="reset"
      class="mt20"
      @submit="submit"
      :formCfg="formCfg"
    ></search-form>
    <el-button
      type="danger"
      @click="deleteData"
      style="float:right;margin-top: -54px;margin-right: 20px;
    position: relative;
    z-index: 2;"
    >删除</el-button>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :pageSizeList='[20, 30, 50, 100, 200, 500]'
      :searchData="searchData"
    ></m-table>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import FdForm from "vue-elementui-freedomen/components/form";
import searchForm from "@/components/form/searchForm";
import shiwucommon from "../minixs/shiwucommon"; //事物审批公共方法
// import chooDepar from './chooDepar'
import orgTree from "components/tree/orgTree";
export default {
  name: "checkLz",
  components: {
    mTable,
    FdForm,
    searchForm,
    // chooDepar,
    orgTree
  },
   mixins: [ shiwucommon],
  props: {},
  data() {
    return {
      config: { labelWidth: "120px" }, //查询条件label宽度
      hasShow: false, //查询条件不展示收起按钮
      isfirstLoad: true,
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      status: "0",
      applyNameList: [], //申请项目LIST
      openshow: true,
      paneTab: "typeFir",
      messType: "primary",
      needTodoNum: 0,
      isCreateDia: false,
      isCreate: true,
      type: 1,
      searchData: {},
      tableData: [],
      tableCols: [
        { label: "申请时间", prop: "applyTime",width: 100 },
        { label: "审批编号", prop: "approveNo" },
        { label: "申请编号", prop: "applyNo" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "申请项目", prop: "applyProjectName" },
        { label: "标题", prop: "title" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "currentUser" }
      ],
      allCols: [
        { label: "申请时间", prop: "applyTime",width: 100 },
        { label: "审批编号", prop: "approveNo" },
        { label: "申请编号", prop: "applyNo" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "申请项目", prop: "applyProjectName" },
        { label: "标题", prop: "title" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "currentUser" }
      ],
      finshCols: [
        { label: "申请时间", prop: "applyTime",width: 100 },
        { label: "审批编号", prop: "approveNo" },
        { label: "申请编号", prop: "applyNo" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "申请项目", prop: "applyProjectName" },
        { label: "标题", prop: "title" }
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
        approveNo: "〔" + new Date().getFullYear() + "〕",
        applyNo: "〔" + new Date().getFullYear() + "〕",
        khType: "",
        isKh: 2,
        curbank: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        curbankId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      formCfg: [
         {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          config: { clearable: true },
          options: '近两年',
          span: 8,
          value:'',
          style: { width: "100%" }
        },
        { type: "input", prop: "title", label: "标题", span: 8, value: "" },
        {
          type: "input",
          prop: "applyNo",
          span: 8,
          label: "申请编号",
          value: ""
        },
        {
          type: "input",
          prop: "approveNo",
          span: 8,
          label: "审批编号",
          value: ""
        },
        {
          type: "date-daterange",
          prop: "$date",
          label: "申请日期",
          rangeSeparator: "-",
          span: 8,
          valueFormat: "yyyy-MM-dd"
        },
        [
          {
            type: "input",
            disabled: true,
            prop: "curbank",
            span: 16,
            style: { width: "76%" }
          },
          {
            type: "button-primary",
            prop: "$chooseBank",
            value: "选择",
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "申请/审批单位", span: 8 }
        ],
        {
          type: "select",
          prop: "applyProjectName",
          label: "申请项目",
          options: "",
          span: 8,
          config: { clearable: true },
          style: { width: "100%" }
        },
        {
          type: "radios",
          prop: "isKh",
          label: "跨行类型",
          options: { 2: "全部", 1: "跨行", 0: "非跨行" },
          span: 8
        },
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
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
    //批量删除表格数据
    deleteData() {
      if (this.deleteArry) {
        this.$confirm(
          "将彻底删除该文件及其所有关联文件，且无法恢复，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$api.checkLz
              .checkLzDelete({
                id: this.deleteArry,
                curbankId: this.formData.curbankId,
                adminType: "admin"
              })
              .then(res => {
                if (res.code == "SUCCESS") {
                  this.deleteArry = "";
                  this.loadData();
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              message: "取消删除",
              type: "info"
            });
          });
      } else {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据!"
        });
      }
    },
    init() {
      this.formCfg = [];
      console.log("11", this.applyNameList);
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
        { type: "input", prop: "title", label: "标题", span: 8, value: "" },
        {
          type: "input",
          prop: "applyNo",
          span: 8,
          label: "申请编号",
          value: ""
        },
        {
          type: "input",
          prop: "approveNo",
          span: 8,
          label: "审批编号",
          value: ""
        },
        {
          type: "date-daterange",
          prop: "$date",
          label: "申请日期",
          rangeSeparator: "-",
          span: 8,
          valueFormat: "yyyy-MM-dd"
        },
        [
          {
            type: "input",
            disabled: true,
            prop: "curbank",
            span: 16,
            style: { width: "76%" }
          },
          {
            type: "button-primary",
            prop: "$chooseBank",
            value: "选择",
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "申请/审批单位", span: 8 }
        ],
        {
          type: "select",
          prop: "applyProjectName",
          label: "申请项目",
          // options: this.applyNameList.join(","),
          options: this.applyNameList,
          span: 8,
          config: { clearable: true },
          style: { width: "100%" }
        },
        {
          type: "radios",
          prop: "isKh",
          label: "跨行类型",
          options: { 2: "全部", 1: "跨行", 0: "非跨行" },
          span: 8
        },
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-100px" }
          }
        ]
      ];
      if (!!this.formData.curbank) {
        console.log('this.formData.curbank设置3',this.formData.curbank)
        this.$refs.searchForm.setText("curbank", this.formData.curbank);
      }
    },
    getOrgList(org) {
      console.log(org,'事物审批')
      if (this.orgOrDeptId == "1") {
        console.log(org.unitName,'org.unitName,设置2')
        this.$refs.searchForm.setText("curbank", org.unitName);
        this.$set(this.formData, "curbankId", org.id);
        this.getApplayPrByCompany(org.id);
      }
    },
    getInitOrg() {
      let self = this;
      this.$api.setting.organization
        .getTree({
          unitClass: 1,
          searchType: "",
          unitCode: "1",
          type: "",
          queryType: "",
          opType: "",
          seletSelf: 0
        })
        .then(res => {
          let orgTree = res.data;
          //设置默认机构
          console.log(orgTree[0].unitName,'orgTree[0].unitName,设置1')
          self.$refs.searchForm.setText("curbank", orgTree[0].unitName);
          self.formData.curbank = orgTree[0].unitName;
          self.$set(self.formData, "curbankId", orgTree[0].unitCode);
          self.getApplayPrByCompany(orgTree[0].unitCode);
          this.loadData(this.type);
        });
    },
    handleClick(tab, event) {
      if (tab.name === "typeFir") {
        this.type = "1";
        this.status = "0";
        this.tableCols = this.allCols;
        this.loadData(this.type);
      } else if (tab.name === "typeSec") {
        this.type = "2";
        this.status = "1";
        this.tableCols = this.finshCols;
        this.loadData(this.type);
      } else {
        return;
      }
    },
    btnEvent(params) {
      if (params.prop == "$chooseBank") {
        this.title = "选择机构";
        this.isSingle = true;
        this.orgOrDept = 1;
        this.orgOrDeptId = "1";
        this.showOrgTree = true;
      } else if (params.prop == "applyNo") {
        this.formData["applyNo"] = params.value;
      } else if (params.prop == "approveNo") {
        this.formData["approveNo"] = params.value;
      } else if (params.prop == "applyProjectName") {
        this.formData["applyProjectName"] = params.value;
      } else if (params.prop == "title") {
        this.formData["title"] = params.value;
      } else if (params.prop == "$date") {
        this.formData["approveTimeStart"] = params.value[0];
        this.formData["approveTimeEnd"] = params.value[1];
      }else if(params.prop == "numYear"){
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
      }
    },
    //申请单位
    getApplayPrByCompany(curbankId) {
      let self = this;
      this.$api.checkLz
        .getApplayPrByCompany({
          curbankId: curbankId
        })
        .then(res => {
          this.applyNameList = [];
          // res.applyList &&
          //   res.applyList.map(item => {
          //     // this.applyNameList.push(item.applyProject);
          //     this.applyNameList.push(item);
          //   });
          var newList = [];
          res.applyList.forEach(element => {
            if (newList.indexOf(element) == -1) {
              newList.push(element);
            }
          });
          this.applyNameList = newList
            ? newList.map((item, index) => {
                return {
                  label: item,
                  value: item
                };
              })
            : [];
          if (this.isfirstLoad) {
            this.init();
            this.isfirstLoad = false;
          } else {
            var formCfgStore = JSON.parse(JSON.stringify(this.formCfg));
            self.formCfg = [];
            formCfgStore.splice(6, 1, {
              type: "select",
              prop: "applyProjectName",
              label: "申请项目",
              // options: this.applyNameList.join(","),
              options: this.applyNameList,
              span: 8,
              config: { clearable: true },
              style: { width: "100%" }
            });
            console.log(formCfgStore, "``````````````````````");
            self.formCfg = formCfgStore;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    setChooDepar(isshow) {
      this.isCreateDia = isshow.isCreateShow;
    },
    reset() {
      this.formData = {
        approveNo: "",
        applyNo: "",
        isKh: 2,
        numYear:'',
      };
      this.$refs.searchForm.setText("numYear","近两年");
      this.$refs.searchForm.setText("$date", "");
      this.$refs.searchForm.setText("title", "");
      this.$refs.searchForm.setText(
        "approveNo",
        ""
      );
      this.$refs.searchForm.setText(
        "applyNo",
        ""
      );
      this.$refs.searchForm.setText("isKh", "2");
      this.getInitOrg();
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
      this.formData.type = this.type;
      this.$api.checkLz
        .adminLZtable(
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
          // this.init()
        });
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        if( (value.applyProjectName=='主要负责人请假、备案申请'||
          value.applyProjectName=='主要负责人请假、备案申请') &&
        value.sourceType === "1"){
          dataArry.push(value.id+'_1');
        }else{
          dataArry.push(value.id+'_0');
        }
        
      });
      this.deleteArry = dataArry.join(",");
    },
    cellClick(row) {
      let rowCell = {
        id: row.id,
        isKh: row.isKh,
        type: "checkLz",
        status: this.status,
        curbankId: this.formData.curbankId,
        numyear:this.formData.numYear
      };
      if (
        (row.applyProjectName=='主要负责人请假、备案申请'||
          row.applyProjectName=='主要负责人请假、备案申请') &&
        row.sourceType === "1"
      ) {
        if(this.type=='1'){
          this.hasOpened(row.id,{
          name: "AskDetial",
          query: rowCell
        })
        }else{
        this.$intent.goNewPage(this, {
          name: "AskDetial",
          query: rowCell
        });
        }
      } else if(
        row.applyProjectName=='在京机构（部门）负责人疫情期间离京申请' ||
        row.sourceType === "2"
      ) {
          this.$intent.goNewPage(this, {
                    name: 'LjDetail',
                    query: rowCell,
         })
      }
      else{
         if(this.type=='1'){
          this.hasOpened(row.id, {
                    name: 'adminLZDeail',
                    query: rowCell,
         })
        }else{
                   this.$intent.goNewPage(this, {
                    name: 'adminLZDeail',
                    query: rowCell,
         })
        }

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
    //获取申请项目list
    // queryApplyName() {
    //   this.$api.argumentPre
    //     .applyItemTable({
    //       manageBankId: JSON.parse(localStorage.getItem("userInfo")).unitId
    //     })
    //     .then(res => {
    //       res.data &&
    //         res.data.map(item => {
    //           this.applyNameList.push(item.applyProject);
    //         });
    //       this.init();
    //     });
    // }
  },
  activated() {},
  mounted() {
    // this.queryApplyName();
    this.getInitOrg();
    this.$nextTick(() => {
      this.formData = {
        approveNo: "",
        applyNo: "",
        isKh: 2,
        numYear:'',
      };
      this.$refs.searchForm.setText(
        "approveNo",
        ""
      );
      this.$refs.searchForm.setText(
        "applyNo",
        ""
      );
      this.$refs.searchForm.setText("isKh", "2");
    });
  },
  created() {
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
/deep/.el-button {
  line-height: 0.9;
}
.searchForm {
  border: 1px solid #f0f0f0;
  padding: 20px 16px 0 0;
  margin-bottom: 10px;
  margin: 0 0 10px;
}
.ces-table-page {
  clear: both;
}
</style>


