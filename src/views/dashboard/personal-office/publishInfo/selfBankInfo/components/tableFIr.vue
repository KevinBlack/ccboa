<template>
  <div class="selfBankInfo">
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      :searchData="searchData"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection='true'
    ></m-table>
  </div>
</template>
<script>
    import mTable from 'components/table/tTable'
    export default {
        name: 'selfBankInfo',
        components: {
            mTable
        },
        data() {
            return {
                activeName: 'newPro',
                deleteArry:'',
                keyword: '',
                tableDataFir: [],
                tableDataSec: [],
                tableDataThr: [],
                searchData:{},
                tableCols: [
                    { label: '拟稿日期', prop: 'createDate' },
                    { label: '标题', prop: 'title' },
                    { label: '拟稿人', prop: 'draftUser' },
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize: 10
                },
            };
        },
        created(){
            this.loadData()
        },
        methods: {
            loadData(){
                this.$api.messPub.finMessTable(
                    {
                        searchData:this.searchData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {
                    this.pagination.total = res.total
                    this.tableData = res.data
                })
            },
            //新建管理员设置
            createBtn() {
            },
            //删除数据
            deleteBtn() {

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            cellClick (row) {
                this.$router.push({
                    path: '/dashboard/personalOffice/publishInfo/setInfoManager',
                    query: {
                        id: row.id
                    }
                })
            },
            select(row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .selfBankInfo {
    .noneRel {
      min-height: 61vh;
      margin-top: 100px;
      font-size: 28px;
      line-height: 50px;
      font-weight: 600;
      text-align: center;
    }
  }
</style>
