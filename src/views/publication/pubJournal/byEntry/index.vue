<!--
 * @Author: your name
 * @Date: 2020-10-24 09:51:32
 * @LastEditTime: 2021-03-17 14:55:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\publication\pubJournal\byEntry\index.vue
--> 
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-select v-model="searchData.value" @change="selectChange" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item.pubNm" :value="item.pubMgId">
        </el-option>
      </el-select>
    </div>
    <m-table @refresh="loadData" @cellClick="cellClick" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true' :searchData="searchData"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import dateFormate from '@/util/filters.js'

export default {
  name: 'byEntry',
  components: {
    mTable,
  },
  data() {
    return {
      searchData: {},
      tableData: [],
      tableCols: [
        {
          label: '发布日期',
          prop: 'pubTime',
          formatter(row) {
            return row.pubTime == '' || row.pubTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.pubTime)))
          },
        },
        { label: '标题', prop: 'title' },
        { label: '刊物名称', prop: 'journalTypeName' },
        { label: '刊物期号', prop: 'issue' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
    }
  },
  mounted() {
    this.$api.pubStatistics.checkSearchParams({}).then((res) => {
      this.options = res.data
    })
  },
  methods: {
    // 下拉框的值改变时
    selectChange() {
      this.loadData()
    },
    create_btn() {
      this.$intent.goNewPage(this, {
        path: '/publication/editJournal/editJournal/altBusiness/business',
      })
    },
    loadData() {
      this.$api.pubStatistics
        .getTableList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    cellClick(row) {
      this.$router.push({
        path: '/publication/pubJournal/byEntry/dailyNews',
        query: { rowData: row },
      })
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




