<template>
  <div class="content">
    <el-row style="margin-bottom: 14px" :gutter="20">
      <el-col :span="4">
        <el-select
          placeholder="请选择类型"
          v-model="searchData.roleId"
          @change="listInit"
          style="width: 100%"
        >
          <el-option
            v-for="item in managerTypeList"
            :key="item.dicId"
            :label="item.codeName"
            :value="item.dicId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <select-org-or-dept
          @select="selectOrg"
          :orgOrDept="1"
          :orgOrDeptId="'1'"
          style="width:100%;"
        >
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择"
            v-model="searchData.unitName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6" style="margin-left: 10px">
        <el-input placeholder="请输入UASS账号" v-model="searchData.humanName"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="listInit">查询</el-button>
        <el-button type="primary" @click="toAdd">新增</el-button>
        <el-button type="danger" @click="toDelete">删除</el-button>
      </el-col>
    </el-row>
    <m-table
      @refresh="listInit"
      :isSelection="true"
      @select="select"
      :searchData="searchData"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      managerTypeList: [],
      selectRows: [],
      region: "",
      tableData: [],

      Aid: JSON.parse(localStorage.getItem("userInfo")).humanId,

      searchData: {
        // mbankNames: JSON.parse(localStorage.getItem('userInfo')).unitName,
        // managerUnitId: JSON.parse(localStorage.getItem("tcManagerRole"))[0]
        //   .managerUnitId,
      },
      tableCols: [
        { label: "管理员中文名", prop: "humanName" },
        { label: "UASS账号", prop: "account" },
        { label: "管理机构名", prop: "managerUnitName" },
        { label: "所在部门", prop: "deptLevelName" },
        { label: "联系电话", prop: "telMobile" },
        { label: "创建人", prop: "createHumanName" },
        { label: "创建时间", prop: "createTime" },
        { label: "修改人", prop: "updateHumanName" },
        { label: "修改时间", prop: "updateTime" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  methods: {
    selectOrg(org) {
      this.$set(this.searchData, "unitName", org.unitName);
      this.searchData.unitCode = org.id;
      this.listInit();
    },
    loadData() {
      //请求下拉数据
      this.$api.setSysConfig
        .dictTable("ADICS2030", {
          isCodeName: "分级维护",
          isCodeType: "manager_type",
          searchData: this.searchData,
        })
        .then((res) => {
          this.managerTypeList = res.data;
          this.searchData.roleId = this.managerTypeList[0].dicId;
          this.listInit();
        });
    },
    listInit() {
      //请求列表数据
      if (this.searchData.roleId == "402") {
        this.tableCols = [
          { label: "管理员中文名", prop: "humanName" },
          { label: "UASS账号", prop: "account" },
          { label: "管理机构名", prop: "managerUnitName" },
          { label: "所在部门", prop: "deptLevelName" },
          { label: "创建人", prop: "createHumanName" },
          { label: "创建时间", prop: "createTime" },
          { label: "修改人", prop: "updateHumanName" },
          { label: "修改时间", prop: "updateTime" },
        ];
      } else {
        this.tableCols = [
          { label: "管理员中文名", prop: "humanName" },
          { label: "UASS账号", prop: "account" },
          { label: "管理机构名", prop: "managerUnitName" },
          { label: "所在部门", prop: "deptLevelName" },
          { label: "联系电话", prop: "telMobile" },
          { label: "创建人", prop: "createHumanName" },
          { label: "创建时间", prop: "createTime" },
          { label: "修改人", prop: "updateHumanName" },
          { label: "修改时间", prop: "updateTime" },
        ];
      }

      this.$api.setSysConfig
        .getGradList(
          {
            roleId: parseInt(this.searchData.roleId),
            unitCode: this.searchData.unitCode,
            humanName: this.searchData.humanName,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;

          this.tableData.map((item) => {
            item.updateTime
              ? (item.updateTime = item.updateTime.split(".")[0])
              : "";

            item.createTime
              ? (item.createTime = item.createTime.split(".")[0])
              : "";
          });
        });
    },
    select(rows) {
      this.selectRows = rows;
    },
    cellClick(row) {
      this.$intent.go(this, {
        path: "/setting/sysConfig/gradprotect/createdgrad",
        query: {
          detail: JSON.stringify(row),
          isAdd: JSON.stringify(false),
        },
      });
    },
    toDelete() {
      let roleId = [];
      let humanId = [];
      let managerUnitId = [];
      let dicCode = "";
      this.managerTypeList.map((item) => {
        if (item.dicId == this.searchData.roleId) {
          dicCode = item.dicCode;
        }
      });
      this.selectRows.map((item) => {
        roleId.push(item.roleId);
        humanId.push(item.humanId);
        managerUnitId.push(item.managerUnitId);
      });
      if (humanId.length > 1) {
        this.$message({ type: "success", message: "只能删除一个" });
        return;
      }

      //判断不能删除自己
      if (humanId.indexOf(this.Aid) !== -1) {
        this.$message({ type: "warning", message: "您不能删除自己" });
        return;
      }

      this.$api.setSysConfig //验证
        .deleteGrad({
          humanId: parseInt(humanId.join(",")),
          roleId: parseInt(roleId.join(",")),
          managerUnitId: managerUnitId.join(","),
          codeType: dicCode,
        })
        .then((res) => {
          if (res.ifConfirm && res.ifConfirm == "confirm") {
            this.$confirm(res.msg, "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning",
            }).then(() => {
              this.$api.setSysConfig //删除
                .deleteGrad({
                  humanId: parseInt(humanId.join(",")),
                  roleId: parseInt(roleId.join(",")),
                  managerUnitId: managerUnitId.join(","),
                  codeType: dicCode,
                  ifConfirm: res.ifConfirm,
                })
                .then((res) => {
                  this.listInit();
                });
            });
          } else {
            this.listInit();
          }
        });
    },
    toAdd() {
      this.$router.push({
        path: "/setting/sysConfig/gradprotect/createdgrad",
        query: {
          isAdd: JSON.stringify(true),
        },
      });
    },
  },
  created() {
    this.$api.setting.organization
      .getTree({
        unitClass: 1,
        unitCode: "1",
      })
      .then((res) => {
        let data = [];
        data = res.data;
        if (data && data.length > 0) {
          this.searchData.unitName = data[0].unitName;
          this.searchData.unitCode = data[0].unitCode;
          this.loadData();
        }
      })
      .catch((err) => {});
    // this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cSpace {
  width: 100%;
  height: 20px;
}
</style>
