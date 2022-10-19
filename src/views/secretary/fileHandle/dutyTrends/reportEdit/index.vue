<template>
  <div class="submitDate">
    <div style="margin: 20px 0">
      <el-select v-model="value1" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-right:20px;margin-left:20px;" @click="add_btn">新增</el-button>
      <el-button type="danger" style="margin-right:20px;" @click="delete_btn">删除</el-button>

    </div>
    <m-table @refresh="loadData()" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true' :searchData="searchData"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'

export default {
  name: 'submitDate',
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: {},
      tableData: [],
      tableCols: [
        { label: '主管单位', prop: 'manageBank' },
        { label: '编辑人员', prop: 'autoEndTime' },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
      },
      options: [],
      value1: '',
      deleteArry: '',
    }
  },
  computed: {},
  methods: {
    loadData() {
      this.$api.argumentPre
        .baseConfigTable(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: 10,
        })
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    cellClick(row) {
      let rowData = JSON.stringify(row)
      this.$router.push({
        path: '/approval/parameter/base/checkDetail',
        query: { data: rowData, type: 'check' },
      })
    },
    select(row) {
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.id)
      })
      this.deleteArry = dataArry.join(',')
    },
    //  新增按钮
    add_btn() {
      this.$router.push({
        path: '/secretary/dutyTrends/params/reportEdit/add',
        query: { data: '', type: 'edit' },
      })
    },
    // 删除按钮
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm('是否确定删除当前选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.argumentPre.baseConfigDelete({ id: this.deleteArry }).then((res) => {
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
          .catch(() => {})
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据',
        })
      }
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>

