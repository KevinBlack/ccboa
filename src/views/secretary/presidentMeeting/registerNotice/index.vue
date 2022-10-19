<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="未报名" name="tabs-look">
        </el-tab-pane>
        <el-tab-pane label="已报名" name="tabs-sleep"></el-tab-pane>
        <el-row>
          <el-date-picker v-model="value" @change='changeYear' type="year" placeholder="2020">
          </el-date-picker>
          <el-button type="primary" style="margin-left:20px;float:right" @click="exportData">导出</el-button>
        </el-row>
      </el-tabs>
    </div>
    <m-table @refresh="loadData()" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData"
      :tableCols="tableCols" :pagination="pagination" :isSelection='true' :searchData="searchData"></m-table>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import exportTable from "../../../../minixs/exportTable";
export default {
  name: "registerNotice",
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      year: '2020',
      value: '',
      activeName: "tabs-look",
      searchData: {},
      tableData: [
        // {st:'st',mc:'ming',ren:'ren',phone:'1234'}
      ],
      isBm: '0',
      tableCols: [
        { label: '序号', prop: 'rowNumber' },
        { label: '会议名称', prop: 'tzName' },
        { label: '发送人', prop: 'sendPersonName' },
        { label: '发送时间', prop: 'sendTime' },
      ],
      tableCols0: [
        { label: '序号', prop: 'rowNumber' },
        { label: '会议名称', prop: 'tzName' },
        { label: '发送人', prop: 'sendPersonName' },
        { label: '发送时间', prop: 'sendTime' },
      ],
      tableCols1: [
        { label: '序号', prop: 'rowNumber' },
        { label: '会议名称', prop: 'tzName' },
        { label: '发送人', prop: 'sendPersonName' },
        { label: '发送时间', prop: 'sendTime' },
        { label: '报名时间', prop: 'bmTime' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      options: [],
      deleteArry: ''
    }
  },
  computed: {},
  methods: {
    handleTabsClick (tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.isBm = '0'
        this.pagination.pageNum = 1
        this.loadData()
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols1);
        this.isBm = '1'
        this.pagination.pageNum = 1
        this.loadData()
      }
    },
    exportData () {
      exportTable.exportExcel("报名通知");
    },
    changeYear () {
      // console.log('111111111111111',this.value)
      this.year = this.value.getFullYear().toString()
      //   console.log('2222222222222222',this.year)
      this.loadData()
      //     this.$api.secreatary.meeting.getTopicList(
      //         {curYear:this.year},
      //         {
      //             PAGE_JUMP: this.pagination.pageNum,
      //             REC_IN_PAGE: this.pagination.pageSize,
      //         }
      //     ).then(res => {
      //         this.pagination.total = res.total    
      //         res.data.map(item=>{
      //             item.sendTime=formatData(item.sendTime,'YYYY-MM-DD')
      //         })
      //         this.tableData = res.data
      //     })
    },
    select (row) { },
    loadData () {
      this.$api.secreatary.meeting.getBmList(
        {
          bmFlag: this.isBm,
          curYear: this.year, ...this.searchData
        },
        {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        }

      ).then(res => {
        this.pagination.total = res.total
        res.data.map(item => {
          item.sendTime = formatData(item.sendTime, 'YYYY-MM-DD')
          item.bmTime = formatData(item.bmTime, 'YYYY-MM-DD')
        })
        this.tableData = res.data
      })
    },
    cellClick (row) {
      this.$router.push({
        path: '/secretary/presidentMeeting/registerNotice/registerDetail',
        query: { rowData: JSON.stringify(row) }
      })
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


