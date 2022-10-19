<template>
  <div class="submitColumnn">
    <div style="margin: 20px 0">
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-col :span="6">
          <select-org-or-dept :orgOrDeptId="'0'" @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择"
              v-model="searchData.draftOrgan"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-button type="primary" style="margin-left:20px;" @click="add_btn">新增</el-button>
        <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
      </el-row>
    </div>
    <m-table
      ref="templateConfigDataTable"
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :isIndex="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "submitColumn",
  components: {
    mTable,
    selectOrgOrDept,
  },
  data() {
    return {
      searchData: {}, /** @description: 查询框值 */
      tableData: [], /** @description: 表格数据 */
      deleteArry: "", /** @description: 拼接id */
      tableCols: [{ label: "模板配置", prop: "name" }],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    selectOrg(org) {
      this.searchData.draftOrgan = org.unitName;
      this.searchData.draftOrganId = org.id;
      this.loadData();
    },
    /** @description: 获取表格数据 */
    loadData(isRefresh, pagination) {
      this.commonLoadListData(this.$refs.templateConfigDataTable,pagination, {
          ...(this.searchData || {})
      }, null, this.$api.duty.getModelTableList, res => {            
        this.tableData = res.list;
      })
    },
    /** @description: 换行点击事件 */
    cellClick(row) {
      this.$intent.goNewPage(this, {
        path: "/secretary/dutyTrends/params/model/add",
        query: { rowData: JSON.stringify(row), tabsType: 'edit' },
      });
    },
    /** @description: 新增按钮 */
    add_btn() {
      this.$intent.goNewPage(this, {
        path: "/secretary/dutyTrends/params/model/add",
        query: { data: "", tabsType: "add" },
      });
    },
    /** @description: 勾选的行 */
    select(row) {
      this.deleteArry = row && row.map(item => item.id).join(',');
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
            .deleteModelData({ ids: this.deleteArry })
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
  },
};
</script>
