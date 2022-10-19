<template>
  <div>
    <el-button type="danger" @click="deleteData" style="margin:16px">删除</el-button>
    <m-table
      @refresh="loadData()"
      @selection-change="getRowDatas(row)"
      @select="select"
      @cellClick="jumpdeal"
      size="medium"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from '@/components/table/tTable'

    export default {
        name: 'pibliclinkTable',
        components: {
            mTable,
        },
        data() {
            return {
                tableData: [
                    {hyDnr: "12121", hyName: "1435345", hyaddress: '34343434'},
                    {hyDnr: "12121", hyName: "1435345", hyaddress: '4343434'},
                    {hyDnr: "12121", hyName: "1435345", hyaddress: '43434343'},

                ],

                tableCols: [
                    {label: '序号', prop: 'hyDnr'},
                    {label: '连接名称', prop: 'hyName'},
                    {label: '链接地址', prop: 'hyAddress'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize:10
                },
                perLink: {},
                searchData:{}
            }
        },
        methods: {
            loadData() {
                this.$api.dailyWork_sysConfig.viewLinkPer(
                    {
                        keys: "1",
                        searchData:this.searchData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,

                    }
                ).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data;
                })
            },
            jumpdeal(val) {
                this.perLink = val
                this.$intent.goNewPage(this, {
                    name: 'linkDeal',
                    query: {perLink:JSON.stringify(this.perLink)}
                })
            },
            deleteData() {
                this.$api.dailyWork_sysConfig.deleteLink(
                    {
                        id:this.deleteArry
                    }
                ).then(res => {
                    this.loadData()
                })
            },
            select(row) {
                let dataArry=[]
                row.map(function(value,index){
                    dataArry.push(value.id)
                })
                this.deleteArry=dataArry.join(",")
            },

        },
        created() {
            this.loadData()
        }

    }
</script>
<style scoped lang="less">
</style>
