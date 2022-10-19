<template>
  <div class="submitColumnn">
    <div style="margin: 20px 0">
      <el-button v-show="!isShowBtns" type="primary" style="margin-left:20px;" @click="add_btn">新增</el-button>
      <el-button v-show="!isShowBtns" type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </div>
    <el-tabs v-model="actionTabsName">
      <el-tab-pane label="行内投稿栏目配置" name="first"></el-tab-pane>
      <el-tab-pane label="跨行投稿栏目配置" name="second"></el-tab-pane>
      <el-tab-pane label="子公司投稿栏目配置" name="third"></el-tab-pane>
      <el-tab-pane label="默认栏目配置" name="four"></el-tab-pane>
    </el-tabs>
    <m-table v-if="!isShowTable" @refresh="loadData" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
    <m-table v-else @refresh="loadDefaultData" @cellClick="cellDefaultClick" @select="selectDefault" size="medium" :tableData="tableDefaultData" :tableCols="tableDefaultCols" :pagination="paginationDefault" :isSelection="true"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'

export default {
  name: 'submitColumn',
  components: {
    mTable,
  },
  data() {
    return {
      isShowTable: false,
      isShowBtns: false,
      tableData: [],
      tableDefaultData: [],
      deleteArry: '',
      actionTabsName: 'first',
      route: '',
      tableCols: [
        { label: '配置类别', prop: 'columnTypeTx' },
        { label: '栏目名称', prop: 'columnCategory' },
      ],
      tableDefaultCols: [
        { label: '行内默认栏目', prop: 'innerDefaultConfig_Name' },
        { label: '跨行默认栏目', prop: 'outerDefaultConfig_Name' },
        { label: '子公司默认栏目', prop: 'companyDefaultConfig_Name' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 10,
      },
      paginationDefault: {
        pageNum: 1,
        pageSize: 10,
        total: 10,
      },
    }
  },
  watch: {
    // 监听tabs切换
    actionTabsName: {
      handler(val) {
        switch (val) {
          case 'first':
            this.isShowTable = false
            this.isShowBtns = false
            this.type = '1'
            this.loadData(this.type)
            break
          case 'second':
            this.isShowTable = false
            this.isShowBtns = false
            this.type = '2'
            this.loadData(this.type)
            break
          case 'third':
            this.isShowTable = false
            this.isShowBtns = false
            this.type = '3'
            this.loadData(this.type)
            break
          case 'four':
            this.isShowTable = true
            this.showBtns()
            this.type = '00002'
            this.route = '00001'
            this.loadDefaultData(this.route)
            break
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 获取表格数据
    loadData(type) {
      this.$api.duty
        .submitColumnList(
          { columnType: this.type },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.columnCategoryList
        })
    },
    // 获取默认栏目配置表格数据
    loadDefaultData(type) {
      if (this.type === '00002') {
        this.$api.duty
          .submitColumnDefalutList(
            {
              route: type,
            },
            {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize,
            }
          )
          .then((res) => {
            this.paginationDefault.total = res.total
            this.tableDefaultData = [res]
          })
      } else {
        this.$api.duty
          .submitColumnList(
            { columnType: this.type },
            {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize,
            }
          )
          .then((res) => {
            this.pagination.total = res.total
            this.tableData = res.columnCategoryList
          })
      }
    },
    // 勾选默认栏目配置表格数据
    selectDefault() {},
    // 换行点击事件
    cellClick(row) {
      this.$router.push({
        path: '/secretary/dutyTrends/params/submitColumn/add',
        query: { rowData: row, type: 'save' },
      })
    },
    // 换行默认栏目配置点击事件
    cellDefaultClick(row) {
      this.$router.push({
        path: '/secretary/dutyTrends/params/submitColumn/addDefault',
        query: { rowData: row, type: 'save', tabsType: this.type },
      })
    },
    // 新增按钮
    add_btn() {
      if (this.type === '00002') {
        this.$router.push({
          path: '/secretary/dutyTrends/params/submitColumn/addDefault',
          query: { tabsType: this.type },
        })
      } else {
        this.$router.push({
          path: '/secretary/dutyTrends/params/submitColumn/add',
          query: { tabsType: this.type },
        })
      }
    },
    // 勾选的行
    select(row) {
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.id)
      })
      this.deleteArry = dataArry.join(',')
    },
    // 删除
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm('是否确定删除当前选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$api.duty.DeleteTableData({ ids: this.deleteArry }).then((res) => {
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
    // 默认栏目配置新增按钮有无
    showBtns() {
      if (this.tableDefaultData && this.tableDefaultData.length === 0) {
        this.isShowBtns = true
      } else {
        this.isShowBtns = false
      }
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




