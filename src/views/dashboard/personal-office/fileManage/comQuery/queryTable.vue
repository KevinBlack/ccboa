<template>
  <div>
    <m-table
      @refresh="loadData()"
      @cellClick="jumpdeal"
      @selection-change="getRowDatas(row)"
      size="medium"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/mTable'
export default {
  name: 'queryTable',
  components: {
    mTable,
  },
  data () {
    return {
      tableData: [
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" },
        { data: "12121", num: "1435345", title: "54654654654", depar: "567657" }
      ],

      tableCols: [
        { label: '文件标题', prop: 'data' },
        { label: '文号', prop: 'num' },
        { label: '文件日期', prop: 'title' },
        { label: '归档部门', prop: 'depar' },
        { label: '文件类型', prop: 'depar' },
        { label: '文件载体', prop: 'depar' },
        { label: '密级', prop: 'depar' },
        { label: '期限', prop: 'depar' },
        { label: '目录号', prop: 'depar' },
        { label: '案卷号', prop: 'depar' },
        { label: '归档号', prop: 'depar' },
        { label: '文件状态', prop: 'depar' },

      ],
      pagination: {
        pageNum: 1,
        total: 7
      },
      sonselect: 0
    }
  },
  methods: {
    loadData () {
      console.log("请求数据")
    },
    jumpdeal (val) {
      var id = val.num

      this.$confirm('您无权查看此文件，是否申请借阅', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          name: 'borrow',
          query: id
        })
      }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
      })
    },
    getRowDatas (row) {
      console.log("-----val----->", row)
    },

  },
  created () {
    this.loadData()
  }

}
</script>
<style scoped lang="less">
</style>
