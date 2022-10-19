<template>
  <div class="organizationView">
    <!-- <div class="leftTree">
       <el-tree :props="props" :load="loadNode" lazy></el-tree>
    </div>-->
    <el-tabs @tab-click="handleClick" v-model="paneTab">
      <el-tab-pane label="启用" name="typeFir"></el-tab-pane>
      <el-tab-pane label="未启用" name="typeSec"></el-tab-pane>
    </el-tabs>
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6" style="margin-left: 20px">
        <el-input v-model="searchData.unitName" placeholder="请输入机构名称或机构编码"></el-input>
      </el-col>
      <el-button type="primary" style="margin-left:20px;margin-bottom:16px;" @click="search_btn">查询</el-button>
      <el-button
        v-if="isSysManger&&isSysManger.length>0"
        type="primary"
        style="margin-left:20px;margin-bottom:16px;"
        @click="toSort"
      >排序</el-button>
      <el-button type="primary" style="margin-left:20px;margin-bottom:16px;" @click="toCreated">新建</el-button>
      <el-button type="primary" @click="synchro">同步</el-button>
    </el-row>

    <div class="list">
      <m-table
        @refresh="loadData"
        ref="orgTable"
        :isPagination="true"
        :isIndex="true"
        :searchData="searchData"
        :sortable="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from "components/select/selectOrgOrDept";
import mTable from "components/table/tTable";

export default {
  // 系统一规范
  name: "orgManageView",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      isSysManger: [],
      paneTab: "typeFir",
      keyword: "",
      searchData: {
        // orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        // unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        orgName: "",
        unitCode: "",
        unitClass: 1,
      },
      tableData: [],
      tableCols: [
        { label: "机构简称", prop: "unitShort" },
        { label: "机构全称", prop: "unitName" },
        { label: "机构类别", prop: "unitTypeName" },
        { label: "机构综合代表", prop: "comUserName" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      validFlag: 1,
    };
  },
  filters: {},
  computed: {},
  methods: {
    synchro() {
      if (this.searchData.unitCode) {
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
          message: "请选择要同步信息的机构",
          type: "warning",
        });
      }
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
    //查询
    search_btn() {
      this.loadData();
    },
    toSort() {
      // this.$intent.go(this, {
      //   path: "/setting/orgDepartment/orgManage/sortOrg",
      // });
      this.$router.push({
        path: "/setting/orgDepartment/orgManage/sortOrg",
      });
    },
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.unitCode = org.id;
      this.pagination = {
        pageNum: 1,
        pageSize: 20,
      };
      this.loadData();
    },
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      this.isSysManger = [];
      let arr = [];
      arr = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.isSysManger = arr.filter((item) => {
        return item.codeType == "manager_type" && item.dicCode == "sys_manager";
      });
      console.log("this.isSysManger", this.isSysManger);
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
      // }).catch(err => {

      // });
    },
    delete() {
      const selections = this.$refs.orgTable.$refs.cesTable.selection;
      console.log(selections);
    },
    toAdd() {
      this.$router.push({
        path: "/setting/orgDepartment/orgManage/orgManageConfig",
        query: {
          isAdd: JSON.stringify(true),
        },
      });
    },
    cellClick(row) {
      const memberNo = row.memberNo;
      this.$router.push({
        path: "/setting/orgDepartment/orgManage/orgManageConfig",
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
    toCreated() {
      this.$router.push("/setting/orgDepartment/orgManage/creOrgManageConfig");
    },
  },
  activated() {},
  mounted() {},
  created() {
    // this.loadData();
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
            this.searchData.unitCode = data[0].unitCode;
            this.loadData("0");
          }
        })
        .catch((err) => {});
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/*.list {
      margin: 25px 0px 50px;
      float: right;
      width: 80%;
    }

    .leftTree {
      float: left;
      width: 20%;
      margin-top: 25px;
    }*/
</style>
