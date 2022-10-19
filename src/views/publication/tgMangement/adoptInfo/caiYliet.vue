<template>
  <div class="check">
    <m-table @select="select"
        :searchData="searchData" @refresh="loadData" :isSelection="true" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" @cellClick="cellClick"></m-table>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'

import dateFormate from '@/util/filters.js'
export default {
  name: 'adoptInfo',
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      searchData: {
        type:''
      },
      tableData: [],
      //   接收时间、、、
      tableCols: [
        {
          label: '接收时间',
          prop: 'pubTime',
          formatter(row) {
            return row.pubTime == '' || row.pubTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.pubTime)))
          },
        },
        { label: '标题', prop: 'title' },
        { label: '刊物名称', prop: 'pubNm' },
        { label: '期号', prop: 'remark3' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      value1: '',
      deleteArry: [], //删除数据id 集合
    }
  },
  computed: {},
  methods: {
    //列表初始化
    loadData() {
      this.searchData.type = 'myUsed'
      this.$api.paraMeter
        .ManuscriptList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          console.log(res, '和稿件列表')
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    //列表初始化删除
    delete_btn() {
      this.$api.paraMeter.ManuscriptListdel({ gIdArr: this.deleteArry }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
        }
        this.loadData()
      })
    },
    //详情
    cellClick(row) {
      console.log(2222)
      let now = JSON.stringify(row)
      this.$router.push({
        // path: '/publication/tgMangement/adoptInfo/detel',
        path: '/publication/tgMangement/adoptInfo',
        query: { rowData: now },
      })
    },
    //选中删除数据集合
    select(row) {
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.id)
      })
      this.deleteArry = dataArry
    },
    //
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


