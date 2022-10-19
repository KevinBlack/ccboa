<!--
 * @Author: liyaling
 * @Date: 2020-11-07 18:15:19
 * @LastEditTime:
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\MenuPermissionConfig\permissionAssignment\index.vue
-->
<template>
  <div class="setSecretBase">
    <div style="marginBottom:6px">
      <el-button @click="add" type="primary" v-if="addButton">新增</el-button>
      <el-button @click="delItem" type="danger">删除</el-button>
    </div>
    <t-table
      @cellClick="cellClick"
      @refresh="loadData"
      @select="select"
      size="medium"
      :sortable="false"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></t-table>
  </div>
</template>

  <script>
import configsApis from "@/httpTansun/api/setting/setSysConfig.js";
import tTable from "components/table/tTable";
import beanList from "../../../util/beanList";
export default {
  name: "setSecretBase",
  components: {
    tTable,
  },
  props: {},
  data() {
    return {
      // 是否有新增按钮
      addButton: true,
      //机构下拉框
      searchOrgOptions: [],
      //业务分类下拉框
      searchClassiOpt: [],
      tableData: [],
      tableCols: [
        { label: "序号", prop: "id" },
        {
          label: "秘密类型",
          prop: "secretTypeName",
          formatter: (row) => {
            return beanList.yesOrNo[row.secretType];
          },
        },
        { label: "依据内容", prop: "secretContent" },
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
      //删除传的参数
      selectedRow: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    loadData() {
      configsApis.setSecretBaseConfigList({}).then((res) => {
        this.pagination.total = res.total;
        console.log("----dingmiyiju list-------", res);
        this.tableData = JSON.parse(JSON.stringify(res.data));
        return this.tableData;
      });
    },
    add() {
      this.$router.push({
        name: "asas",
        query: { type: "0", tableData: this.tableData },
      });
    },
    //删除
    delItem() {
      if (Object.keys(this.selectedRow).length === 0) {
        this.$message({
          type: "warning",
          message: "请选择至少一条数据",
        });
        return;
      }
      const data = {
        ids: this.selectedRow.join("|"),
        ifDel: 1,
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?").then(() => {
        configsApis.setSecretBaseConfigSave(data).then((res) => {
          console.log("----shanchu---", res);
          this.loadData();
        });
      });
    },
    cellClick(row) {
      console.log("---- 传递-------", row);
      this.$router.push({
        name: "asas",
        query: { type: "1", row: row, tableData: this.tableData },
      });
    },
    select(row) {
      this.selectedRow = [];
      row.map((item) => {
        this.selectedRow.push(item.id);
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    //加载机构下拉框
    this.loadData();
  },
};
</script>

  <style lang="less" rel="stylesheet/less">
.mainProcessControl {
  min-height: 90vh;
  .flexSetting .el-form-item__content {
    display: flex;
  }
  .el-transfer {
    width: 100%;
  }
  .el-transfer .el-transfer-panel {
    width: 37% !important;
  }
}
</style>
