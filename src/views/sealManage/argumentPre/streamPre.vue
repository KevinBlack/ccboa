<template>
  <div>
    <el-tabs v-model="moduleId" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabList"
        :label="item.label"
        :name="item.name"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div>
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-col :span="6">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择"
              v-model="manageBankName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入代字" v-model="ftTitle"></el-input>
        </el-col>
        <el-button type="primary" style="margin-right:20px;margin-left:20px;" @click="createData">新增</el-button>
        <el-button
          type="primary"
          style="margin-right:20px;margin-left:20px;"
          @click="searchTable"
        >查询</el-button>
        <el-button type="danger" style="margin-right:20px;" @click="deleteData">删除</el-button>
      </el-row>
    </div>
    <fd-form :data="formData" :columns="formCfg" @event="btnevent"></fd-form>
    <div style="width:100%;height:20px;"></div>
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
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import FdForm from "vue-elementui-freedomen/components/form";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "letterTemplate",
  components: {
    mTable,
    FdForm,
    selectOrgOrDept
  },
  data() {
    return {
      portType: "A08463342",
      loadPortType: "A08463342",
      moduleId: "公文用印登记",
      type: "1",
      deleteArry: [],
      tabLabel: "",
      formCfg: [],
      tableData: [
        // {xuhao: "12121", fYear: "1435345",id:'1'},
        // {xuhao: "12121", fYear: "1435345",id:'2'},
      ],
      tableCols: [
        { label: "序号", prop: "xuhao", width: 80 },
        { label: "年度", prop: "fYear", width: 200 },
        { label: "文件代字", prop: "ftTitle" },
        { label: "机构", prop: "unitName" }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      tabList: [
        { name: "公文用印登记", label: "公文用印登记" },
        { name: "介绍信审批", label: "介绍信审批" },
        { name: "常规用印审批", label: "常规用印审批" },
        { name: "部门用印审批", label: "部门用印审批" },
        { name: "刻制审批", label: "刻制审批" },
        { name: "废止审批", label: "废止审批" },
        { name: "销毁审批", label: "销毁审批" },
        { name: "印章保管交接审批", label: "印章保管交接审批" },
        { name: "用印机审批", label: "用印机审批" }
      ],
      searchData: {},
      // formCfg: [
      //     [
      //         {type: 'select', prop: '1',placeholder:'请选择机构',style: {marginRight: '20px'}},
      //         {type: 'select', prop: '2', placeholder:'请选择文件代字',style: {marginRight: '20px'}},
      //         {
      //             type: 'button-primary',
      //             prop: 'createData',
      //             span: 2,
      //             value: '新建',
      //             style: {marginRight: '20px'}
      //         },
      //         {
      //             type: 'button-primary',
      //             prop: 'searchData',
      //             span: 2,
      //             value: '查询',
      //             style: {marginRight: '20px'}
      //         },
      //         {type: 'button-primary', prop: 'deleteData', span: 2, value: '删除'},
      //
      //     ]
      // ],
      formData: {},
      manageBankName: "",
      unitId: "",
      ftTitle: ""
    };
  },
  methods: {
    selectOrg(org) {
      this.manageBankName = org.unitName;
      this.unitId = org.id;
    },
    handleClick(tab, event) {
      this.pagination = { pageNum: 1, pageSize: 20 };
      switch (tab.name) {
        case "公文用印登记":
          this.type = "1";
          this.loadData(this.type);
          break;
        case "介绍信审批":
          this.type = "2";
          this.loadData(this.type);
          break;
        case "常规用印审批":
          this.type = "3";
          this.loadData(this.type);
          break;
        case "部门用印审批":
          this.type = "4";
          this.loadData(this.type);
          break;
        case "刻制审批":
          this.type = "5";
          this.loadData(this.type);
          break;
        case "废止审批":
          this.type = "6";
          this.loadData(this.type);
          break;
        case "销毁审批":
          this.type = "7";
          this.loadData(this.type);
          break;
        case "印章保管交接审批":
          this.type = "9";
          this.loadData(this.type);
          break;
        case "用印机审批":
          this.type = "11";
          this.loadData(this.type);
          break;
      }
      this.tabLabel = this.moduleId;
      console.log(this.tabLabel);
    },
    loadData(type) {
      this.$api.sealManage
        .argumentTable(
          {
            ...this.searchData,
            type: type || this.type,
            unitId: this.unitId
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.list;
        });
    },
    cellClick(row) {
      row.tabLabel = this.moduleId;
      let path = "/sealManage/argumentPre/groove";
      // this.$router.push({
      //   path: "/sealManage/argumentPre/groove",
      //   query: { rowData: row }
      // });
      this.$intent.go(this, {
        path,
        query: { rowData: row }
      });
      // this.$intent.go(this, {
      //   path,
      //   query: {
      //     id: row.id,
      //     markOrderType: row.markOrderType,
      //     ys: this.activeTab,
      //     orgLevel: this.orgLevel
      //   }
      // });
    },
    select(row) {
      this.deleteArry = [];
      row.map(item => {
        this.deleteArry.push({ id: item.id, unitId: item.unitId });
      });
      // let dataArry = []
      // row.map(function (value, index) {
      //     dataArry.push(value.id)
      // })
      // console.log('dataArry',dataArry)
      // this.deleteArry = dataArry.join(",")
    },
    //查询
    searchTable() {
      this.$api.sealManage
        .argumentTable(
          {
            ...this.searchData,
            type: this.type,
            unitId: this.unitId,
            ftTitle: this.ftTitle
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.list;
        });
    },
    //删除
    deleteData() {
      // switch (this.moduleId) {
      //   case "常规用印审批":
      //     this.portType = "A08463383";
      //     this.goDelete(this.portType);
      //     break;
      //   case "介绍信审批":
      //     this.portType = "A08463347";
      //     this.goDelete(this.portType);
      //     break;
      //   case "部门用印审批":
      //     this.portType = "A08463351";
      //     this.goDelete(this.portType);
      //     break;
      //   case "刻制审批":
      //     this.portType = "A08463356";
      //     this.goDelete(this.portType);
      //     break;
      //   case "废止审批":
      //     this.portType = "A08463361";
      //     this.goDelete(this.portType);
      //     break;
      //   case "销毁审批":
      //     this.portType = "A08463366";
      //     this.goDelete(this.portType);
      //     break;
      //   case "印章保管交接审批":
      //     this.portType = "A08463371";
      //     this.goDelete(this.portType);
      //     break;
      // }
      if (this.deleteArry && this.deleteArry.length > 0) {
        this.$api.sealManage.argumentDele(this.deleteArry).then(res => {
          if (res.code == "SUCCESS") {
            this.loadData(this.type);
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.deleteArry = [];
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据"
        });
        return;
      }
    },
    // goDelete() {
    //   console.log("this.deleteArry", this.deleteArry);
    //   if (!this.deleteArry) {
    //     this.$message({
    //       type: "warning",
    //       message: "请选择要删除的数据",
    //     });
    //     return;
    //   }
    //   this.$api.sealManage.argumentDele(this.deleteArry).then((res) => {
    //     if (res.code == "SUCCESS") {
    //       this.loadData(this.TYPE);
    //       this.$message({
    //         type: "success",
    //         message: "删除成功",
    //       });
    //       this.deleteArry = [];
    //     }
    //   });
    // },
    //新建
    createData() {
      this.$router.push({
        name: "groove",
        query: { title: this.moduleId }
      });
    },
    btnevent(params) {
      console.log(params);
      switch (params.value) {
        case "新建":
          this.$router.push({
            name: "groove",
            query: { title: this.moduleId }
          });
          break;
        case "删除":
          this.deleteData();
          break;
        case "查询":
          break;
      }
    }
  },
  created() {
    this.manageBankName = JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
    this.loadData(this.type);
  }
};
</script>
<style scoped lang="less">
.ces-table-page {
  min-height: 500px;
}
</style>
