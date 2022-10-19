<template>
  <div class="check" style="min-height:90vh">
    <div style="margin: 20px 0">
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
        <el-button
          type="primary"
          style="margin-left:20px;"
          @click="add_btn"
          v-if="tableData&&tableData.length<1"
        >新增</el-button>
        <el-button
          type="danger"
          style="margin-left:20px;"
          @click="delete_btn"
          v-if="tableData&&tableData.length>0"
        >删除</el-button>
      </el-row>
    </div>
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
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "check",
  components: {
    mTable,
    selectOrgOrDept
  },
  props: {},
  data() {
    return {
      // isHeaderStyle:{
      //   width:"180px"
      // },
      searchData: {},
      tableData: [],
      tableCols: [
        { label: "印章审批类别", prop: "scUnit" },
        { label: "印章刻制类别", prop: "scFiletype" },
        { label: "用印方式", prop: "scHlevel" },
        { label: "审批用印性质", prop: "scFiletypeHw" },
        { label: "有效天数", prop: "scSlevel" },
        { label: "印章状态", prop: "haltMonths" }
      ],
      pagination: {
        pageNum: 1,
        total: 10
      },
      options: [],
      value1: "",
      deleteArry: [],
      manageBankId: "",
      manageBankName: ""
    };
  },
  computed: {},
  methods: {
    selectOrg(org) {
      // this.formData.orgName = org.unitName;
      // this.formData.unitId = org.id;
      this.manageBankName = org.unitName;
      this.manageBankId = org.id;
      this.loadData();
    },
    loadData() {
      this.$api.sealManage
        .userConTable(
          { ...this.searchData, scUnitId: this.manageBankId },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: 10
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.list;
        });
    },
    cellClick(row) {
      console.log("-----row---------->", row);
      let rowId = row.id;
      this.$router.push({
        path: "/sealManage/argumentPre/userConfig",
        query: { id: rowId }
      });
    },
    add_btn() {
      this.$router.push({
        path: "/sealManage/argumentPre/userConfig",
        query: {}
      });
    },
    select(row) {
      console.log(row, "删除");
      
      row.map(item => {
        this.deleteArry.push({ id: item.id, scUnitId: item.scUnitId });
      });
    },
    delete_btn() {
      console.log(this.deleteArry);
      if (this.deleteArry) {
        this.$confirm("是否确定删除当前选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.sealManage.userConDele(this.deleteArry).then(res => {
              if (res.code == "SUCCESS") {
                this.deleteArry = "";
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              }
              this.loadData();
            });
          })
          .catch(() => {});
      } else {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据"
        });
      }
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.manageBankName = JSON.parse(
      localStorage.getItem("userInfo")
    ).shortUnitName;
    this.manageBankId = JSON.parse(localStorage.getItem("userInfo")).unitId;
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


