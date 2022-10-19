<!--
 * @Author: your name
 * @Date: 2020-08-07 15:29:53
 * @LastEditTime: 2020-08-08 10:36:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\approval\checkCy.vue
-->
<template>
  <div class="checkBj">
    <el-tabs>
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="流转"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
    </el-tabs>
    <el-button type="danger" style="margin-left:20px;margin-bottom:16px;" @click="delete_btn">删除</el-button>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection='true'
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from '@/components/table/tTable'

    export default {
        name: "checkCy",
        components: {
            mTable
        },
        props: {},
        data() {
            return {
                searchData:{},
                tableData: [

                ],
                tableCols: [
                    {label: '申请时间', prop: 'ApplyTime'},
                    {label: '审批编号', prop: 'approveNo'},
                    {label: '申请编号', prop: 'applyNo'},
                    {label: '申请单位', prop: 'approveDepart'},
                    {label: '标题', prop: 'title'},
                    {label: '发送人', prop: 'updatePerson'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10
                },
                options: [],
                deleteArry:''
            }
        },
        computed: {},
        methods: {
            loadData() {
                this.$api.checkLz.checkCYAllTable(
                    this.searchData,
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: 10
                    }
                ).then(res => {
                    this.pagination.total = res.total
                    this.tableData = res.data
                })
            },
            cellClick(row) {
                let rowData=JSON.stringify(row.id)
                this.$intent.goNewPage(this, {path: '/approval/detailCY', query: {data: rowData, type: 'checkCy'}})
            },
            select(row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
            delete_btn(){
                this.$api.checkLz.checkCYDelete(
                    {id:this.deleteArry}
                ).then(res => {
                    if(res.code=="SUCCESS"){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    this.loadData()
                })
            }
        },
        activated() {
        },
        mounted() {
        },
        created() {
            this.loadData()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
