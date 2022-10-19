<!--
 * @Author: wy
 * @Date: 2020-07-21 11:26:15
 * @LastEditTime: 2020-07-21 11:34:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\addressBook\components\view.vue
-->
<template>
  <div class="view">
    <div  style="margin-bottom: 10px">
      <el-button type="primary" @click="toCalendar">按日历显示</el-button>
      <el-button type="primary" @click="add">新建</el-button>
      <el-button type="danger" @click="delt">删除</el-button>
    </div>

    <div class="list">
      <m-table
        ref="orgTable"
        size="medium"
        :searchData="searchData"
        :isPagination="true"
        :pagination="pagination"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        @cellClick="cellClick"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mTable from 'components/table/mTable'
  export default {
    name: 'view',
    components: {
      mTable
    },
    props: {},
    data() {
      return {
        listLoading: 'false',
        btns: [
          {type: 'danger', label: '删除', handle: () => {
            this.deleteItem()
            }
          }
        ],
        searchData: {
        },
        selectedIds: [],
        tableData: [],
        tableCols: [
          {label: '日期', prop: 'hyDsj'},
          {label: '时间', prop: 'hyDsd'},
          {label: '地点', prop: 'hyDdd'},
          {label: '主题', prop: 'hyDzt'},
          {label: '参加人员', prop: 'hyDry'}
        ],
        pagination: {
          pageNum: 1,
          pageSize: 20,
          total: 0
        }
      }
    },
    filters: {},
    computed: {},
    methods: {
      delt() {
        if (!this.selectedIds.length) {
          return this.$message.error('请选择要删除的数据')
        }
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.dailyWork.delSchedule({
            id: this.selectedIds.toString()
          }).then(res => {
            if (res.code === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.loadData()
            } else {
              this.$message.error(res.message)
            }
          }).catch(() => {
            console.log('errir')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      toCalendar() {
        this.$router.push('/dashboard/personalOffice/dailyWork/schedule')
      },
      handleSelectionChange(val) {
        this.selectedIds = val.map(x => x.id)
      },
      handleCurrentChange(val) {
        this.pagination.pageNum = val
        this.loadData()
      },
      handleSizeChange(val) {
        this.pagination.pageSize = val
        this.loadData()
      },
      add() {
        this.$router.push({path: '/dashboard/personalOffice/dailyWork/schedule/newSchedule', query: {type: 'add'}})
      },
      cellClick(row) {
        this.$router.push({
          path: '/dashboard/personalOffice/dailyWork/schedule/newSchedule',
          query: {
            type: 'edit',
            workInfo: JSON.stringify(row),
            backType: 'list'
          }
        })
      },
      loadData() {
        this.listLoading = true
        this.$api.dailyWork.newScheduleList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        }).then(res => {
          this.listLoading = false
          this.pagination.total = res.total
          this.tableData = res.data
        }).catch(() => {
          this.listLoading = false
        })
      }
    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
