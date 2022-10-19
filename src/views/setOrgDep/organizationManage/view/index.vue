<!--
 * @Author: wy
 * @Date: 2020-06-19 15:58:18
 * @LastEditTime: 2020-11-20 09:40:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\index.vue
-->
<template>
  <div class="organizationView">
    <!-- <div class="leftTree">
       <el-tree :props="props" :load="loadNode" lazy></el-tree>
    </div>-->
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
        <el-input v-model="searchData.unitName" placeholder="请输入机构名称"></el-input>
      </el-col>
      <el-button type="primary" style="margin-left:20px;margin-bottom:16px;" @click="search_btn">查询</el-button>
      <el-button type="primary" style="margin-left:20px;margin-bottom:16px;" @click="toSort">排序</el-button>
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
      keyword: "",
      searchData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        unitClass: 1,
      },
      tableData: [],
      tableCols: [
        { label: "编号", prop: "orderBy" },
        { label: "机构简称", prop: "unitShort" },
        { label: "机构编码", prop: "unitCode" },
        { label: "机构全称", prop: "unitName" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  filters: {},
  computed: {},
  methods: {
    //查询
    search_btn() {
      this.loadData();
    },
    toSort() {
      this.$intent.go(this, {
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
      this.$api.setting.organization
        .getOrgList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
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
        },
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    // this.loadData();
    this.loadData("0");
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
