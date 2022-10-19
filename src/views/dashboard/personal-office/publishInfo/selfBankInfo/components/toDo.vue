
<template>
  <div class="toDo">
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
  name: 'toDo',
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
        { label: '拟稿日期', prop: 'memberName' },
        { label: '标题', prop: 'roleName' },
        { label: '拟稿人', prop: 'memberNo' }
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
      this.$router.push({
        path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
        query: {
          isNeedCancel: '1'
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
