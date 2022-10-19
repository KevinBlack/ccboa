<template>
  <div class="depManageView">
    <el-tabs @tab-click="handleClick" v-model="paneTab">
      <el-tab-pane label="启用" name="typeFir"></el-tab-pane>
      <el-tab-pane label="未启用" name="typeSec"></el-tab-pane>
    </el-tabs>
    <el-row style="margin-bottom: 10px" :gutter="20">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择机构"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="5">
        <select-org-or-dept @select="selectDept" :orgOrDept="0" :orgOrDeptId="searchData.orgCode">
          <el-input
            readonly
            type="text"
            placeholder="请选择部门"
            v-model="searchData.unitSearchName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="5">
        <el-input v-model="searchData.unitName" placeholder="请输入部门名称"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="inquery">查询</el-button>
        <el-button type="primary" @click="toCreate()">新建</el-button>
        <el-button type="primary" @click="toChange()">部门变更</el-button>
        <el-button type="primary" style="margin-bottom:16px;" @click="toSort">排序</el-button>
        <el-button type="primary" @click="synchro">同步</el-button>
      </el-col>
    </el-row>
    <div>
      <m-table
        @refresh="loadData"
        :isIndex="true"
        :sortable="false"
        :searchData="searchData"
        @cellClick="cellClick"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "depManageView",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      paneTab: "typeFir",
      getData: {
        unitClass: 0,
        unitCode: "0",
      },
      tableData: [],
      searchData: {
        // orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        // orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        orgName: "",
        orgCode: "",
        unitClass: 0,
        // unitName: "",
        unitSearchName: "",
        seletSelf: 0,
        unitCode: "",
      },
      tableCols: [
        { label: "部门简称", prop: "unitShort" },
        { label: "部门全称", prop: "unitName" },
        { label: "部门类别", prop: "unitTypeName" },
        { label: "部门综合代表", prop: "comUserName" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      validFlag: 1,
    };
  },
  computed: {},
  methods: {
    synchro() {
      if (this.searchData.unitSearchName) {
        this.$confirm(
          "请您确定是否为非工作时间，工作时间同步数据可能会造成系统错误！",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          this.$api.setting.organization
            .synchro({ unitCode: this.searchData.unitCode })
            .then((res) => {
              console.log(res);
            });
        });
      } else {
        this.$message({
          message: "请选择要同步信息的部门",
          type: "warning",
        });
      }
    },
    toCreate() {
      this.$router.push(
        "/setting/orgDepartment/departManage/creDepManageConfig"
      );
    },
    handleClick(tab, event) {
      if (tab.name === "typeFir") {
        this.validFlag = 1;
        this.loadData();
      } else if (tab.name === "typeSec") {
        this.validFlag = 0;
        this.loadData();
      } else {
        return;
      }
    },
    toSort() {
      // this.$intent.go(this, {
      //   path: "/setting/orgDepartment/orgManage/sortDept",
      // });
      this.$router.push({
        path: "/setting/orgDepartment/orgManage/sortDept",
      });
    },
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.orgCode = org.id;
      this.searchData.unitCode = org.id;
      this.searchData.seletSelf = 0;
      this.searchData.unitSearchName = "";
      if (this.searchData.orgCode) this.loadData();
    },
    selectDept(dept) {
      this.searchData.unitSearchName = dept.unitName;
      this.searchData.unitCode = dept.id;
      this.searchData.seletSelf = 1;
      this.loadData();
    },
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      console.log(this.searchData);
      this.$api.setting.organization
        .getOrgList(
          { ...this.searchData, validFlag: this.validFlag },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    cellClick(row) {
      this.$intent.go(this, {
        path: "/setting/orgDepartment/departManage/depManageConfig",
        query: {
          detail: JSON.stringify(row),
          isAdd: JSON.stringify(false),
          searchData1: JSON.stringify(this.searchData),
          pagination1: JSON.stringify(this.pagination),
          paneTab1: JSON.stringify(this.paneTab),
          flag: 1,
        },
      });
    },
    toChange() {
      this.$intent.go(this, {
        path: "/setting/orgDepartment/orgManage/depManageAltera",
      });
    },
    inquery() {
      if (this.searchData.orgCode) this.loadData();
    },
  },
  activated() {},
  mounted() {},
  created() {
    if (
      this.$route.query &&
      this.$route.query.flag2 &&
      this.$route.query.flag2 == 2
    ) {
      console.log("kkk");
      this.searchData = JSON.parse(this.$route.query.searchData2);
      this.pagination = JSON.parse(this.$route.query.pagination2);
      this.paneTab = this.$route.query.paneTab2;
      if (this.paneTab === "typeFir") {
        this.validFlag = 1;
      } else if (this.paneTab === "typeSec") {
        this.validFlag = 0;
      }
      this.loadData("0");
    } else {
      this.$api.setting.organization
        .getTree({
          unitClass: 1,
          unitCode: "1",
          // type: '',
          // queryType: '',
          // seletSelf: 0
        })
        .then((res) => {
          let data = [];
          data = res.data;
          if (data && data.length > 0) {
            this.searchData.orgName = data[0].unitName;
            this.searchData.orgCode = data[0].unitCode;
            this.searchData.unitCode = data[0].unitCode;
            this.loadData();
          }
        })
        .catch((err) => {});
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
// .depManageView {
// }
/*.leftTree {
      float: left;
      width: 20%;
      margin-top: 25px;
    }
    .right {
      width: 80%;
      float: right;
    }
    .el-col-12 {
      width: 100%;
    }*/
</style>
