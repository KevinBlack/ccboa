/**
* create by zx on 2020-7-2 14:21
* 类注释：
* 备注：
*/
<template>
  <div class="teamList">
    <el-row style="margin-bottom: 10px" :gutter="20">
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
      <el-col :span="6">
        <el-select
          v-model="searchData.groupType"
          placeholder="请选择"
          style="width:100%"
          @change="loadData"
        >
          <el-option v-for="item in ['机构','部门']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="toAdd">新增</el-button>
        <el-button type="danger" @click="toDelete">删除</el-button>
      </el-col>
    </el-row>

    <m-table
      @refresh="loadData"
      :isSelection="true"
      :searchData="searchData"
      @cellClick="cellClick"
      :isHandle="false"
      @select="selectRow"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from "components/select/selectOrgOrDept";
import mTable from "components/table/tTable";

export default {
  name: "teamList",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      selectRows: [],
      searchData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        groupUnitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        groupType: "机构",
        sortKey: "",
        sort: "",
      },
      tableData: [],
      tableCols: [
        { label: "群组序号", prop: "groupNo" },
        { label: "群组名称", prop: "groupName" },
        { label: "群组成员", prop: "groupMembersName" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    selectRow(rows) {
      this.selectRows = [];
      rows.map((item) => {
        this.selectRows.push(item.id);
      });
    },
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.groupUnitId = org.id;
      this.loadData();
    },
    loadData() {
      this.searchData.searchData = deepClone(this.searchData);
      this.$api.setSysConfig
        .getTeamList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    toAdd() {
      this.$intent.go(this, {
        path: "/setting/orgDepartment/teamManage/editTeam",
      });
    },
    toDelete() {
      if (this.selectRows.length == 0) {
        return;
      }
      this.$confirm("确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.setSysConfig
          .deleteTeam({ id: this.selectRows.join(",") })
          .then((res) => {
            this.loadData();
          });
      });
    },
    cellClick(row) {
      this.$intent.go(this, {
        path: "/setting/orgDepartment/teamManage/editTeam",
        query: { detail: JSON.stringify(row) },
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
