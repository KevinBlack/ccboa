<template>
  <div class="submitColumnn">
    <el-tabs @tab-click="handleClick" v-model="paneTab" v-if='!isZh'>
      <el-tab-pane label="上级行接收人员" name="typeFir"></el-tab-pane>
      <el-tab-pane label="本行接收人员" name="typeSec"></el-tab-pane>
    </el-tabs>
    <div style="margin: 20px 0">
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-button type="primary" style="margin-left:20px;" @click="add_btn">新增</el-button>
        <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
      </el-row>
    </div>
    <m-table ref="receivePersonDataTable"
     @refresh="loadData" 
     @cellClick="cellClick"
      @select="select" 
      size="medium" 
      :isIndex="true" 
      :isHandle="false" 
      :tableData="tableData" 
      :tableCols="tableCols" 
      :isSelection="true"
      :pagination="pagination" 
      ></m-table>
  </div>
</template>

<script> 
import mTable from '@/components/table/tTable'

export default {
  name: 'submitColumn',
  components: {
    mTable,
  },
  data() {
    return {
      paneTab: "typeSec",
      rType:'0',
      isZh:JSON.parse(localStorage.getItem('userInfo')).unitId==='U010000',
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      searchData: {},
      tableData: [], /** @description: 表格列表数据 */
      deleteArry: '', /** @description: 拼接id */
      tableCols: [{ label: '接收人员中文名', prop: 'receivePerson' }], /** @description: 表头 */
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
      handleClick(tab, event) {
        //上级行接收人员
      if (tab.name === "typeFir") {
        this.rType = "1";
        //本行接收人员
      } else if (tab.name === "typeSec") {
        this.rType = "0";
      } else {
        return;
      }
       this.loadData();
    },
    selectOrg(org) {
      this.searchData.draftOrgan = org.unitName
      this.searchData.draftOrganId = org.id
      this.loadData()
    },
    /** @description: 获取表格数据 */
    loadData(isRefresh, pagination) {
      this.commonLoadListData(this.$refs.publicationDataListTable,pagination, {rType:this.rType}, null, this.$api.duty.receivePersonList, res => {            
        this.tableData = res.list;
        this.pagination.total = res.total
      })
    },
    /** @description: 换行点击事件 */
    cellClick(row) {
      console.log(row,"row")
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/receivePerson/check',
        query: { rowData: JSON.stringify(row), type: 'save' },
      })
    },
    /** @description: 新增按钮 */
    add_btn() {
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/receivePerson/add',
        query: { tabsType: 'add' },
      })
    },
    /** @description: 勾选的行 */
    select(row) {
      this.deleteArry = row && row.map(item => item.id).join(',');
    },
    /** @description: 删除 */
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm('是否确定删除当前选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$api.duty.deleteData({ ids: this.deleteArry }).then((res) => {
            if (res.code == 'SUCCESS') {
              this.deleteArry = ''
              this.$message({
                message: '删除成功',
                type: 'success',
              })
            }
            this.loadData()
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据',
        })
      }
    },
  },
}
</script>

