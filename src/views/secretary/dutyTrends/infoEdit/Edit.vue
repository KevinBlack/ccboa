<!--
 * @Author:zj
 * @Date: 2020-06-19 15:58:18
 * @LastEditTime: 2020-11-01 14:53:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\index.vue
-->
<template>
  <div class="organizationView">
    <el-form>
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-col :span="10">
          <el-form-item label="日期">
            <el-date-picker
              @change="change"
              v-model="formData.dateStr"
              style="margin-let:20px"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
            <el-button type="danger" style="margin-left:20px" @click="toDelete">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="list">
      <m-table
        ref="editManuscriptDataTable"
        @select="selectRow"
        @refresh="loadData"
        :isIndex="true"
        :isHandle="false"
        :isSelection="true"
        :searchData="searchData"
        :tableData="tableData"
        :tableCols="tableCols"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/tTable";

export default {
  /** @description: 系统一规范 */
  name: "orgManageView",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: {
      },
      tableData: [],
      tableCols: [
        { label: "拟稿日期", prop: "createDate" },
        { label: "标题", prop: "title" },
      ],
      formData: {
        dateStr: "",
      },
      deleteList: [],
    };
  },
  filters: {},
  computed: {},
  created() {
    this.$set(this.formData, 'dateStr', this.getCurrentDateTime())
    this.updateQueryConditionData(this.formData)
  },
  mounted() {
    this.loadData();
  },
  methods: {
    selectRow(rows) {
      this.deleteList = rows;
    },
    change() {
      this.search_btn();
    },
    /** @description: 查询 */
    search_btn() {
      this.loadData();
    },
    loadData(isRefresh, pagination) {
      this.commonLoadListData(this.$refs.editManuscriptDataTable,pagination, 
      { createDate: this.formData.dateStr ,...this.searchData
      }, null, this.$api.duty.getEditList, res => {            
        this.tableData = res.list;
      })
    },
    toDelete() {
      console.log(this.deleteList);

      if (this.deleteList.length === 0) {
        this.$message({
          message: "请选择要删除的数据",
          type: "warning",
        });
      } else {
        this.$api.duty.deleteEditList({ ids: this.getStrFromListAndSeparator(this.deleteList.map(item => item.id)) }).then((res) => {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.loadData();
        });
      }
    },

    cellClick(row) {
      this.$intent.goNewPage(this, {
        name: "errorInfoDealForm",
        query: {          
          /** @description: 来源路由名 据此中详情页中导航回来*/
          sourceRouteName: 'submitColumnb',
          detail: JSON.stringify(row)
        },
        params: {
          paramsData: this.deepCopy(this.formData)
        }
      });
    }
  },
  watch: {
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-form-item__content {
  display: inline-block;
}
</style>
