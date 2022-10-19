<template>
  <div class="content">
    <div>
      <fd-form
        :columns="[
        [
            {type: 'select', prop: 'select', options: {1: '接口1', 2: '接口2'}},
            {type: 'button-primary', prop: '$submit', value: '分库初始化'},
            {type: 'button-primary', prop: '$submit', value: '新建'},
            {type: 'button-primary', prop: '$submit', value: '删除'},
        ]
    ]"
      />
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
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'systable',
  components: {
    mTable,
    FdForm
  },
  props: {},
  data () {
    return {
      region: '',
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
        { label: '数据库全称', prop: 'data' },
        { label: '模块关键字', prop: 'serve' },
        { label: '功能关键字', prop: 'type' },
        { label: '服务器域名', prop: 'type' },
        { label: '数据库路径', prop: 'type' },
        { label: '是否分库', prop: 'type' },
        { label: '是否启用', prop: 'type' },
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
      this.$router.push('/setting/sysConfig/database/databaseDeal')
    },
    createdata () {
      this.$router.push('/setting/sysConfig/database/databaseEditor')
    },
    submit () {
      console.log("------>")
    }
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
