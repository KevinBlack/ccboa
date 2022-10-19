'
' @Author: your name
' @Date: 2020-12-21 14:03:16
' @LastEditTime: 2020-12-23 16:28:42
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA1\src\views\sealManage\statistical\introductionStatistical.vue
'
<template>
  <div>
    <div class="draft">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="流转" name="transfer"></el-tab-pane>
        <el-tab-pane label="办结" name="done"></el-tab-pane>
      </el-tabs>
      <el-form ref="statisticalForm" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="编号年份">
              <el-select
                v-model="form.choseYear"
                @change="selectYear"
                placeholder="近两年"
                style="width: 100%;"
              >
                <el-option
                  v-for="yearItem in yearList"
                  :key="yearItem"
                  :label="yearItem"
                  :value="yearItem"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请机构">
              <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'0'">
                <el-input
                  type="text"
                  readonly
                  placeholder="机构名称"
                  v-model="form.draftOrgan"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请日期">
              <el-date-picker
                v-model="draftTime1"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator
                style="width:100%"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="activeTab == 'done'">
            <el-form-item label="用印时间">
              <el-date-picker
                v-model="draftTime2"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator
                style="width:100%"
                start-placeholder="用印开始日期"
                end-placeholder="用印结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="编号">
              <el-input v-model="form.documentNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="danger" @click="deleteForms" style="float:right;">删除</el-button>

      <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        @select="select"
        size="medium"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
        :searchData="formList"
        :pageSizeList="[20,30,50,100,200,500]"
      ></m-table>
    </div>
  </div>
</template>
<script>
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import exportTable from "../../../minixs/exportTable";
export default {
  name: "introductionDetail",
  components: {
    mTable,
    selectOrgOrDept
  },
  data() {
    return {
      // 编号年份List
      yearList: [],
      draftTime1: [],
      draftTime2: [],//用印时间数组
      // 搜索数据参数
      form: {
        choseYear: "近两年",
        numYear: "",
        draftOrganId: "", //机构id
        title: "", //标题
        startDate: "", //申请开始日期
        endDate: "", //申请结束日期
        documentNo: "", //编号
        // documentNo: "〔" + new Date().getFullYear() + "〕", //编号
        useStartDate:'',//用印生效开始时间
        useEndDate:'',//用印生效结束时间
      },
      processType: 4,

      //   列表参数
      formList: {
        choseYear: "",
        numYear: "",
        processType: this.processType, //查询业务类型
        draftOrganId: "", //机构id
        title: "", //标题
        startDate: "", //申请开始日期
        endDate: "", //申请结束日期
        documentNo: "", //编号
        useStartDate:'',//用印生效开始时间
        useEndDate:'',//用印生效结束时间
      },
      // 机构ID
      unitCode: "",
      tableData: [],
      // 列表默认加载页签
      activeTab: "transfer",
      // 区分调用接口 2已完结 4流转中
      tableCols: [
        { label: "申请时间", prop: "draftDate" ,width: 150},
        { label: "申请人", prop: "draftUser" ,width: 100},
        { label: "编号", prop: "documentNo" ,width: 200},
        { label: "标题", prop: "title" },
        { label: "用印部门", prop: "draftDepartment" ,width: 200},
        { label: "当前环节", prop: "currentNode" ,width: 200},
        { label: "操作人", prop: "currentUser" ,width: 100}
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      selectIds: [] //删除id集合
    };
  },
  watch: {
    activeTab: {
      handler(val) {
        // this.reset()
        if (val === "transfer") {
          this.processType = 4;
          this.tableCols = [
            { label: "申请时间", prop: "draftDate",width: 150 },
            { label: "申请人", prop: "draftUser" ,width: 100},
            { label: "编号", prop: "documentNo" ,width: 200},
            { label: "标题", prop: "title" },
            { label: "用印部门", prop: "draftDepartment",width: 200 },
            { label: "当前环节", prop: "currentNode",width: 200 },
            { label: "操作人", prop: "currentUser" ,width: 100}
          ];
        } else {
          this.processType = 2;
          this.tableCols = [
            { label: "申请时间", prop: "draftDate" ,width: 200},
            { label: "编号", prop: "documentNo" ,width: 200},
            { label: "标题", prop: "title" },
            { label: "用印部门", prop: "draftDepartment" ,width: 200}
          ];
        }
        this.pagination = { pageNum: 1, pageSize: 20 };
        this.loadData();
      }
    },
    draftTime1(val,oldVal){
      console.log(val,oldVal)
      if(val==null){
        this.draftTime1 = []
      }
    },
    draftTime2(val,oldVal){
      console.log(val,oldVal)
      if(val==null){
        this.draftTime2 = []
      }
    }
  },
  mounted() {},
  
  methods: {
    getNumYearList() {
      return new Promise((resolve, reject) => {
        this.$api.numYear.getNumYearList({tbParam:'jsxyyAdmin'}).then(res => {
          this.yearList = getNumYear(res.data);
          this.formList.numYear = this.form.numYear;
          resolve(res.data);
        });
      });
    },
    selectYear(val) {
      console.log(val);
      if (val == "近两年") {
        this.form.numYear = "";
        this.form.documentNo = "";
        // this.form.documentNo = "〔" + new Date().getFullYear() + "〕"
      } else {
        this.form.numYear = val;
        this.form.documentNo = "〔" + val + "〕";
      }
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.selectIds = dataArry;
      console.log(this.selectIds);
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
        this.$api.sealManage.delIntroduction({ ids: this.selectIds }).then(res => {
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
    // 选机构
    selectOrg(org) {
      console.log(org);
      this.$set(this.form, "draftOrgan", org.unitName);
      this.form.draftOrganId = org.id;
      this.unitCode = org.id;
    },
    // 查询搜索
    query() {
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.formList.startDate = this.draftTime1[0] ? this.draftTime1[0] : "";
      this.formList.endDate = this.draftTime1[1] ? this.draftTime1[1] : "";
      if(this.activeTab=='done'){
        this.formList.useStartDate = this.draftTime2[0] ? this.draftTime2[0] : "";
      this.formList.useEndDate = this.draftTime2[1] ? this.draftTime2[1] : "";
      }
      this.formList.processType = this.processType;
      this.formList.draftOrganId = this.form.draftOrganId;
      this.formList.title = this.form.title;
      this.formList.numYear = this.form.numYear;
      this.formList.documentNo = this.form.documentNo;
      this.loadData();
    },
    // 重置按钮
    reset() {
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.draftTime1 = [];
      this.draftTime2 = [];
       this.form.draftOrganId = JSON.parse(localStorage.getItem("userInfo")).unitId;
      this.form.draftOrgan = JSON.parse(localStorage.getItem("userInfo")).unitName;
      this.form.startDate = "";
      this.form.endDate = "";
      this.form.title = "";
      this.form.choseYear = "近两年";
      this.form.numYear = "";
      this.form.documentNo = "";

      this.formList.useStartDate = this.draftTime2[0] ? this.draftTime2[0] : "";
      this.formList.useEndDate = this.draftTime2[1] ? this.draftTime2[1] : "";
      this.formList.startDate = this.draftTime1[0] ? this.draftTime1[0] : "";
      this.formList.endDate = this.draftTime1[1] ? this.draftTime1[1] : "";
      this.formList.processType = this.processType;
      this.formList.draftOrganId = this.form.draftOrganId;
      this.formList.title = this.form.title;
      this.formList.documentNo = "";
      this.formList.numYear = "";
      this.tableData = [];
      this.loadData();
    },
    //列表数据
    loadData() {
      this.tableData = [];
      this.formList.processType = this.processType;
      this.$api.sealManage
        .introductionDetailList(this.formList, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.list;
          
        });
    },
    cellClick(row) {
      let path;
      path = "/LookJsx";
      this.handleOpenPage(path, row.id);
      // this.$intent.goNewPage(this, {
      //   path,
      //   query: {
      //     id: row.id,
      //     markOrderType: "2",
      //     type: this.processType,//判断是流转还是办结单 2办结  4流转
      //     model:'Ck',
      //     draftOrganId:this.form.draftOrganId,
      //     numYear:this.form.numYear
      //   }
      // });
    },
    handleOpenPage(path, id, readType, flag) {
      let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
      if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
        id:id,
        markOrderType: "2",
        type: this.processType, //判断是流转还是办结单 2办结  4流转
        model: "Ck",
        draftOrganId: this.form.draftOrganId,
        numYear: this.form.numYear}
      });
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    let Jb = JSON.parse(localStorage.getItem("userInfo"));
    console.log(Jb)
    this.formList.draftOrganId = Jb.unitId
    this.form.draftOrganId = Jb.unitId
      this.$set(this.form, "draftOrgan", Jb.unitName);
    this.getNumYearList().then(res => {
      this.loadData();
    });
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
p {
  border: 1px solid;
}
.el-form {
  margin-top: 20px;
}
.ces-table-page{
  min-height: 500px;
}
</style>