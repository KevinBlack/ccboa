<!--
 * @Author: wy
 * @Date: 2020-07-17 10:37:58
 * @LastEditTime: 2021-02-26 18:10:42
 * @LastEditors: Please set LastEditors
 * @Description: 列表
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\view.vue
--> 
<template>
  <div class="view">
    <el-button type="danger" @click="deleteData" v-if="isShowDel" style="margin-bottom: 10px;">删除</el-button>
    <div class="list">
      <m-table
        id="tableId"
        ref="orgTable"
        size="medium"
        @refresh="loadData()"
        @select="select"
        :isPagination="true"
        :pagination="pagination"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        :searchData="searchData"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script >
import mTable from 'components/table/tTable'

export default {
  name: 'view',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      isShowDel: false,
      keyword: '',
      searchData:{sort:'',sortKey:''},
      tableData: [],
      deleteArry: [],
      tableCols: [
        { label: '发布时间', prop: 'createDate' },
        { label: '标题', prop: 'title' },
        { label: '发送人', prop: 'draftUserName' }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  filters: {},
  computed: {},
  methods: {
    loadData() {
        this.$api.dailyWork.viewWorkList(
            {
              searchData:this.searchData
            },
            {
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize
            }
        ).then(res => {
            this.pagination.total = res.total;
            this.tableData = res.data;
            if (res.data.length>0) {
              if (res.data[0].manage === '1') {
                this.isShowDel = true
              }
            }
        })
    },
    select (row) {
        console.log(row,'111111');
        let dataArry = []
        row.map(function (value, index) {
            dataArry.push(value.id)
        })
        this.deleteArry = dataArry.join(",")
    },
    cellClick (row) {
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/workCommviewDetail',
        query: {
          row
        }
      })
    },
    deleteData() {
      if(this.deleteArry.length == '0'){
          this.$message({
              type:"warning",
              message:'请选择数据'
          })
      }else{
          this.$confirm("是否确定删除当前数据?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
          })
          .then(() => {
              this.$api.dailyWork.deleteWorkManage(
                  {id: this.deleteArry}
              ).then(res => {
                  if (res.code == "SUCCESS") {
                      this.$message({
                          type: 'success',
                          message: '删除成功'
                      })
                      this.deleteArry=''
                      this.loadData()
                  }
              })
          })
          .catch(() => {
          });
      }
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