<template>
  <div class="submitColumnn">
    <div style="margin: 20px 0">
      <el-button type="primary" style="margin-left:20px;" @click="add_btn">新增</el-button>
      <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </div>
    <m-table @refresh="loadData" @cellClick="cellClick" @select="select" size="medium" :isIndex="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
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
      tableData: [], // 表格列表数据
      deleteArry: '', // 拼接id
      tableCols: [{ label: '接收人员中文名', prop: 'receivePerson' }], // 表头
      // 分页
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 10,
      },
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 获取表格数据
    loadData() {
      this.$api.duty
        .receivePersonList(
          {},
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.list
        })
    },
    // 勾选默认栏目配置表格数据
    selectDefault() {},
    // 换行点击事件
    cellClick(row) {
      this.$router.push({
        path: '/secretary/dutyTrends/params/receivePerson/add',
        query: { rowData: row, type: 'save' },
      })
    },
    // 新增按钮
    add_btn() {
      this.$router.push({
        path: '/secretary/dutyTrends/params/receivePerson/add',
        query: { tabsType: 'add' },
      })
    },
    // 勾选的行
    select(row) {
      console.log(row, '888')
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
          this.$api.duty.deleteReceivePersonTableData({ ids: this.deleteArry }).then((res) => {
            if (res.code == 'SUCCESS') {
              this.deleteArry = ''
              this.$message({
                message: '删除成功',
                type: 'success',
              })
            }
            this.loadData() // 刷新列表
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

