<template>
  <div class="content">
    <div style="padding: 20px">
      <el-button type="primary" @click="createdata">新建</el-button>
      <el-button type="primary">删除</el-button>
    </div>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/mTable'

export default {
  name: 'systable',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      tableData: [
        { data: '12121', serve: '1435345', type: 'sdsds' },
        { data: '12121', serve: '1435345', type: 'sdsds' },
        { data: '12121', serve: '1435345', type: 'sdsds' },
        { data: '12121', serve: '1435345', type: 'sdsds' },
        { data: '12121', serve: '1435345', type: 'sdsds' },
        { data: '12121', serve: '1435345', type: 'sdsds' },
        { data: '12121', serve: '1435345', type: 'sdsds' },
        { data: '12121', serve: '1435345', type: 'sdsds' }
      ],

      tableCols: [
        { label: 'web站点', prop: 'data' },
        { label: 'Domino服务器', prop: 'serve' },
        { label: '服务类型', prop: 'type' }
      ],
      pagination: {
        pageNum: 1,
        total: 15
      }
    }
  },
  methods: {
    loadData () {
      console.log("------>")
    },
    cellClick (row) {
      this.$router.push('/setting/sysConfig/server/serverdeal')
    },
    createdata () {
      this.$router.push('/setting/sysConfig/server/servereditor')
    },
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.content {
}
</style>
