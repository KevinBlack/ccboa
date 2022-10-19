<template>
  <div class="checkBj">
    <div class="cformdata">
      <search-form
        :formData="formData"
        ref="searchForm"
        @reset="reset"
        @event="btnEvent"
        :hasShow="hasShow"
        :config='config'
        class="mt20"
        :openshow="openshow"
        @submit="submit"
        :formCfg="formCfg"
      >
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="查询日期">
            <el-date-picker
              v-model="formData.dataDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
      </search-form>
    </div>

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
      :searchData="searchData"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
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
import searchForm from "@/components/form/searchForm";
import orgTree from "components/tree/orgTree";
import shiwucommon from "../minixs/shiwucommon"; //事物审批公共方法
export default {
  name: "checkCy",
  components: {
    mTable,
    searchForm,
    orgTree
  },
  mixins: [ shiwucommon],
  props: {},
  data() {
    return {
      config:{labelWidth:'100px'},//查询条件label宽度
      hasShow:false,//查询条件不展示收起按钮
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      openshow: true,
      messType: "primary",
      needTodoNum: 0,
      paneTab: "typeSec",
      formData: {
        curbank: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        curbankId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        approveNo:"",
        numYear:''
      },
      formCfg: [],
      serverconfig: {
        labelWidth: "140px"
      },
      type: "2",
      tableData: [],
      tableCols: [
        { label: "发传阅时间", prop: "updateTime",width:100 },
        { label: "审批编号", prop: "approveNo",minwidth:180 },
        { label: "申请编号", prop: "applyNo",minwidth:180 },
        { label: "申请单位", prop: "curbank",minwidth:180 },
        { label: "标题", prop: "title",minwidth:200 },
        { label: "发送人", prop: "sendPersonCn",width:120 }
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20
      },
      options: [],
      deleteArry: "",
      searchData: {}
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
              .checkLzDelete({ id: this.deleteArry })
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
          message: "请选择要删除的数据！"
        });
      }
    },
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$refs.searchForm.setText("curbank", org.unitName);
        this.$set(this.formData, "curbankId", org.id);
      }
    },
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
        {
          type: "input",
          label: "审批编号",
          prop: "approveNo",
          span: 8,
          value: ""
        },
        [
          {
            type: "input",
            disabled: true,
            prop: "curbank",
            span: 16,
            style: { width: "76%" },
          },
          {
            type: "button-primary",
            prop: "$chooseBank",
            value: "选择",
            style: { marginLeft: "4px" }
          },
          { type: "formitem", label: "申请单位", span: 8 }
        ],
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button-primary", prop: "$reset", value: "重置" },
          { type: "formitem", style: { "text-align": "center","margin-left": "-0px" } }
        ]
      ];
    },
    loadData() {
      if (this.formData.dataDate) {
        this.formData.approveTimeStart = this.formData.dataDate[0];
        this.formData.approveTimeEnd = this.formData.dataDate[1];
      }
      this.$api.checkLz
        .adminCYTable(
          {
            ...this.searchData,
            ...this.formData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      let rowData = JSON.stringify(row);
      if(row.isReadflag==0){
        this.hasOpened(row.id,{
        path: "/approval/admin/CYDeail",
        'query': {
          'data': rowData,
          'type': "checkCy",
          'curbankId': this.formData.curbankId,
          numyear:this.formData.numYear
        }})
      }else{
      this.$intent.goNewPage(this, {
        path: "/approval/admin/CYDeail",
        query: {
          data: rowData,
          type: "checkCy",
          curbankId: this.formData.curbankId,
          numyear:this.formData.numYear
        }
      });
      }

    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    btnEvent(params) {
      if (params.prop == "$chooseBank") {
        this.title = "选择机构";
        this.isSingle = true;
        this.orgOrDept = 1;
        this.orgOrDeptId = "1";
        this.showOrgTree = true;
      } else if (params.prop == "approveNo") {
        this.formData["approveNo"] = params.value;
      }else if(params.prop == "numYear"){
          this.formData["numYear"] = params.value;
           if(params.value==''){
              this.$refs.searchForm.setText('approveNo', '');
              this.formData["approveNo"] ='';
          }else{
                this.$refs.searchForm.setText('approveNo', '〔'+params.value+'〕');
                this.formData["approveNo"] = '〔'+params.value+'〕';
          }
      }
    },
    //重置
    reset() {
      this.formData = {
        approveNo: "",
         curbank: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        curbankId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        numYear:'',
      };
      this.$refs.searchForm.setText(
        "curbank",
        JSON.parse(localStorage.getItem("userInfo")).shortUnitName
      );
      this.$refs.searchForm.setText("numYear","近两年");
      this.$refs.searchForm.setText(
        "approveNo",
        ""
      );
    },
    //开始查询
    submit(params) {
      this.formData = params;
      this.loadData(this.type);
    },
  },
  activated() {},
  mounted() {},
  created() {
        this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
        this.formCfg.splice(0,1, {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          config: { clearable: true },
          options: this.yearList,
          value:'',
          span: 8,
          style: { width: "100%" }
        })
      console.log(res)
    })
    this.initData();
    this.loadData();
    this.$nextTick(() => {
      this.formData = {
        approveNo: "",
        curbank: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        curbankId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        numYear:'',
      };
      this.$refs.searchForm.setText(
        "approveNo",
        ""
      );
      this.$refs.searchForm.setText(
        "curbank",
        JSON.parse(localStorage.getItem("userInfo")).shortUnitName
      );
    });
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cformdata {
  margin-top: 24px;
}
.searchForm {
    border: 1px solid #f0f0f0;
    padding: 20px 16px 0 0;
    margin-bottom: 10px;
    margin: 0 0 10px;
}
.ces-table-page{
  clear: both;
}
</style>
