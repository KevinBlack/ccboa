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
      <el-button type="primary" @click="add">新建</el-button>
      <el-button type="danger" @click="deleteItem">删除</el-button>
    </div>

    <div class="list">
      <m-table
        @refresh="loadData()"
        ref="orgTable"
        size="medium"
        :isHandle="false"
        :searchData="searchData"
        :isPagination="true"
        :pagination="pagination"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        @cellClick="cellClick"
        @select="handleSelectionChange"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mTable from 'components/table/tTable'
  export default {
    name: 'view',
    components: {
      mTable
    },
    props: {},
    data() {
      return {
        btns: [
          {type: 'danger', label: '删除', handle: () => {
              this.deleteItem()
            }
          }
        ],
        searchData:{sort:'',sortKey:''},
        selectedIds: [],
        tableData: [
          {
            txlTname: '张三',
            txlTbgdh: '13200000000',
            txlTdh: '13022222222'
          },
          {
            txlTname: 1,
            txlTbgdh: 2,
            txlTdh: 4
          }
        ],
        tableCols: [
          {label: '姓名', prop: 'txlTname'},
          {label: '办公电话', prop: 'txlTbgdh'},
          {label: '手机号码', prop: 'txlTdh'}
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
      deleteItem() {
        if (!this.selectedIds || !this.selectedIds.length) {
          return this.$message.error('请选择要删除的数据')
        }
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.dailyWork.deleteList({
            id: this.selectedIds.join(',')
          }).then(res => {
            console.log(res)
            if (res.code === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.loadData()
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      add() {
        this.$router.push({path: '/dashboard/personalOffice/dailyWork/addressBook/addreBookview', query: {type: 'add'}})
      },
      cellClick(row) {
        this.$router.push({
          path: '/dashboard/personalOffice/dailyWork/addressBook/addreBookviewDetail',
          query: {orgIndexData: JSON.stringify(row)}
        })
      },
      loadData() {
        this.$api.dailyWork.addressList({addressBook: this.searchData}, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        }).then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data
        })
      }
    },
    activated() {
    },
    mounted() {
    },
    created() {
      this.loadData()
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
