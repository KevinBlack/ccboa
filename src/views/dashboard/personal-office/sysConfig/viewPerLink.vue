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
        name: 'linkTable',
        components: {
            mTable,
        },
        data() {
            return {
                searchData:{},
                deleteArry:'',
                tableData: [],
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
                perLink: {}
            }
        },
        methods: {
            loadData() {
                this.$api.dailyWork_sysConfig.viewLinkPer(
                    {
                        keys: "0",
                        searchData:this.searchData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data;
                })
            },
            jumpdeal(val) {
                console.log("-------val-->", val)
                this.perLink = val
                this.$intent.goNewPage(this, {
                    name: 'linkDeal',
                    query: {perLink:JSON.stringify(this.perLink)}
                })
            },
            deleteData() {
                console.log("-----deleteArry----->",this.deleteArry)
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
