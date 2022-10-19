<!--
 * @Author: your name
 * @Date: 2021-09-07 11:39:14
 * @LastEditTime: 2021-09-08 09:27:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0917fenku\src\components\viewFlow\exportDataExcel1.vue
 *值班动态查询导出组件
--> 

<template>
  <div class="searchform">
    <el-col :span="4" style="position: relative;left:0px;top:0px;"></el-col>
    <div class="formHeadershiwu">
      <div class="title_text">{{excelTitle}}</div>
    </div>
    <el-table
      id="table"
      :data="tableData"
      stripe
      style="width: 100%;color:black"
      align="center"
      :cell-style="{textAlign:'center'}"
      :header-cell-style="{background:'#eef1f6',color:'#3B85F0',textAlign:'center'}"
    >
      <el-table-column style="color:black;width: 100%;" :label="'值班动态查询'">
        <el-table-column
          v-for="(item,index) in tableCols"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import exportTable from "@/minixs/exportTable";
export default {
  name: "search",
  components: {
    mTable,
  },
  props: {
    // 表格数据
    tableData: { type: Array, default: () => [] },
    // 表格列配置
    tableCols: { type: Array, default: () => [] },
    //导出文件名
    excelTitle: { type: String, default: "导出数据" },
    //判断是否开始导出数据
    startExport: { type: Boolean, default: false },
  },
  data() {
    return {
      isPagination: false,
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {},
  watch: {
    startExport(newVal, oldVal) {
      if (newVal) {
        exportTable.exportExcel(this.excelTitle, "#table", true);
      }
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeadershiwu {
  padding: 8px 70px;

  .title_text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}

.down {
  // position: absolute;
  // bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.pickTime .el-date-editor .el-range-separator {
  padding: 0px 20px !important;
  width: 10%;
}
.el-form-item el-range-separator {
  padding: 0px 20px !important;
  width: 10%;
}
</style>
