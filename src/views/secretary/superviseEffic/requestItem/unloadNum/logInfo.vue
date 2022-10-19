<!--
 * @Author: wy
 * @Date: 2020-07-29 19:35:32
 * @LastEditTime: 2020-07-31 15:46:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\superviseEffic\requestItem\unloadNum\logInfo.vue
--> 
<template>
  <div class="logInfo">
    <div class="list">
      <m-table
        ref="orgTable"
        size="medium"
        :isPagination="true"
        :pagination="pagination"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/mTable'

export default {
  name: 'logInfo',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      keyword: '',
      tableData: [
        {
          memberName: 1,
          roleName: 2,
          memberNo: 3
        },
        {
          memberName: 1,
          roleName: 2,
          memberNo: 3
        }
      ],
      tableCols: [
        { label: '卸数开始时间', prop: 'memberName' },
        { label: '卸数结束时间', prop: 'roleName' },
        { label: '服务器响应用时', prop: 'memberNo' },
        { label: '操作人', prop: 'memberNo' }
      ],
      pagination: {
        pageNum: 1,
        total: 10
      }
    }
  },
  filters: {},
  computed: {},
  methods: {
    cellClick (row) {

    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>