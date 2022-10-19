<template>
  <div class="content">
    <div class="file_title">档案查询结果</div>
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
  name: 'fileManagement',
  components: {
    mTable,
    FdForm
  },
  props: {},
  data () {
    return {
      region: '',
      tableData: [
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' },
        { data: '12121', serve: '1435345' }
      ],

      tableCols: [
        { label: '文件标题', prop: 'data' },
        { label: '文号', prop: 'serve' },
        { label: '文件日期', prop: 'serve' },
        { label: '归档部门', prop: 'serve' },
        { label: '文件类型', prop: 'serve' },
        { label: '文件载体', prop: 'serve' },
        { label: '密级', prop: 'serve' },
        { label: '期限', prop: 'serve' },
        { label: '目录号', prop: 'serve' },

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
      this.winOpen()

    },
    btnevent (params) {
      switch (params.prop) {
        case '$deletedata':
          console.log("222222")
          break;

      }
    },
    winOpen () {
      this.$confirm('您无权查看此文件，是否申请借阅', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$router.push('/dashboard/personalOffice/fileManagement/borrow')
      }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
      })
    },
    created () {
      this.loadData()
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.file_title {
  width: 100%;
  text-align: center;
  font-size: 28px;
  color: #458cf1;
  margin-bottom: 16px;
}
</style>
