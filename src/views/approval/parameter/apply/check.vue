<template>
  <div class="check">
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
        <el-button type="primary" style="margin-left:20px;" @click="add_btn">新增</el-button>
        <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
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
      searchData: {
        sort: "asc",
        sortKey: "editorNo"
      },
      tableData: [
        {
          zhuangtai: "zhuangtai",
          num: "3",
          shenqing: "shenqing",
          jiancheng: "jiancheng",
          zhuguan: "zhuguan",
          kuahang: "kuahang",
          jibie: "shyongjibie"
        }
      ],
      tableCols: [
        { label: "项目状态", prop: "isUse" },
        { label: "编号", prop: "editorNo" },
        { label: "申请项目", prop: "applyProject" },
        { label: "申请项目简称", prop: "projectShortName" },
        { label: "主管部门", prop: "manageDept" },
        { label: "跨行项目", prop: "isKhFlag" },
        { label: "适用机构级别", prop: "useBankLevel" }
      ],
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 20 //每页条数
      },
      options: [],
      value1: "",
      deleteArry: "",
      manageBankId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      manageBankName: JSON.parse(localStorage.getItem("userInfo")).unitName
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
      this.$api.argumentPre
        .applyItemTable(
          { ...this.searchData, manageBankId: this.manageBankId },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          res.data.map(item => {
            if (item.isUse === "1") {
              item.isUse = "启用";
            } else if (item.isUse === "0") {
              item.isUse = "未启用";
            }
            if (item.isKhFlag === "0") {
              item.isKhFlag = "非跨行";
            } else if (item.isKhFlag === "1") {
              item.isKhFlag = "跨行";
            }
          });
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    cellClick(row) {
    //   this.$router.push({
    //     path: "/approval/parameter/apply/save",
    //     query: { rowData: JSON.stringify(row) }
    //   });
      this.$intent.goNewPage(this, {
        path: "/approval/parameter/apply/save",
        query: {rowData: JSON.stringify(row)}
      });
    },
    add_btn() {
    //   this.$router.push({
    //     path: "/approval/parameter/apply/save",
    //     query: {}
    //   });
     this.$intent.goNewPage(this, {
        path: "/approval/parameter/apply/save",
        query: {type:'edit'}
      });
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm("是否确定删除当前选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.argumentPre
              .applyItemDelete({ id: this.deleteArry })
              .then(res => {
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
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.check {
  min-height: 90vh;
}
</style>


