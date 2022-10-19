<template>
  <div class="submitDate">
    <div style="margin: 20px 0">
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-col :span="6">
          <select-org-or-dept :orgOrDeptId="'0'" @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择机构名称"
              v-model="searchData.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-button
          v-show="!isShowAddBtn"
          type="primary"
          style="margin-right:20px;margin-left:20px;"
          @click="add_btn"
        >新增</el-button>
        <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
      </el-row>
    </div>
    <m-table
      ref="publishLimitDataTable"
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :isSelection="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script>
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "publishLimit",
  components: {
    mTable,
    selectOrgOrDept,
  },
  created() {
    this.searchData = {
      orgName: this.currentUserInfo.unitName,
      orgCode: this.currentUserInfo.unitId,
      unitClass: 0,
      unitName: "",
      unitSearchName: "",
    }
  },
  mounted() {
    this.loadData()
  },
  data() {
    return {
      isShowAddBtn: false,
      deleteArry: "", /** @description: 删除拼接id */
      /** @description: 初始化查询区域条件 */
      searchData: {},
      tableData: [], /** @description: 表格数据 */
      tableCols: [{ label: "发布范围", prop: "draftOrgan" }], /** @description: 表头 */
    };
  },
  methods: {
    /** @description: 选人框确定按钮 */
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.orgId = org.id;
      this.loadData(); /** @description: 刷新列表 */
    },
    /** @description: 勾选的行 */
    select(row) {
      this.deleteArry = row[0].id;
    },
    /** @description: 删除 */
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm("是否确定删除当前选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$api.duty
            .deletePublishLimitData({ ids: this.deleteArry })
            .then((res) => {
              if (res.code == "SUCCESS") {
                this.deleteArry = "";
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
              }
              this.loadData();
            });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据",
        });
      }
    },
    /** @description: 获取表格数据方法 */
    loadData(isRefresh, pagination) {
      this.commonLoadListData(this.$refs.publishLimitDataTable,pagination, {
          ...(this.searchData || {})
      }, null, this.$api.duty.getPublishLimitList, res => {            
        this.tableData = res.list;
      })
    },
    /** @description: 换行事件 */
    cellClick(row) {
      this.$intent.goNewPage(this, {
        path: "/secretary/dutyTrends/params/publishLimit/add",
        query: { type: "edit", rowData: JSON.stringify(row), },
      });
    },
    /** @description: 新增按钮 */
    add_btn() {
      this.$intent.goNewPage(this, {
        path: "/secretary/dutyTrends/params/publishLimit/add",
        query: { type: "add", rowData: "",  },
      });
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


