<!--
 * @Author: wy
 * @Date: 2020-07-13 16:57:46
 * @LastEditTime: 2020-07-17 15:47:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\sublicense\components\config.vue
--> 
<template>
  <div class="view">
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
  name: 'view',
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
          memberNo: 3,
          uass: 4,
          department: 5,
          department1: 0
        },
        {
          memberName: 1,
          roleName: 2,
          memberNo: 3,
          uass: 4,
          department: 5,
          department1: 1
        }
      ],
      tableCols: [
        { label: '登记日期', prop: 'memberName' },
        { label: '授权人', prop: 'roleName' },
        { label: '被授权人', prop: 'memberNo' },
        { label: '授权开始时间', prop: 'uass' },
        { label: '授权结束时间', prop: 'department' },
        { label: '转授权状态', prop: 'department1' }
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
      const memberNo = row.memberNo
      const department1 = row.department1
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/sublicense/viewDetail',
        query: {
          memberNo,
          department1
        }
      })
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