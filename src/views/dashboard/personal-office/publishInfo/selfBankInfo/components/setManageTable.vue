<template>
  <div class="toDo">
    <div>
      <el-button type="primary" style="margin-left:20px;" @click="create_btn">新建</el-button>
      <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </div>
    <div class="list" style="margin-top:20px;">
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
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from 'components/table/tTable'
    export default {
        name: 'toDo',
        components: {
            mTable
        },
        props: {},
        data () {
            return {
                deleteArry:'',
                keyword: '',
                tableData: [

                ],
                searchData:{},
                tableCols: [
                    { label: '行名', prop: 'bankName' },
                    { label: '管理员', prop: 'manager' },
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize: 20
                },
            }
        },
        filters: {},
        computed: {},
        methods: {
            loadData() {
                this.$api.messPub.adminTable(
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
            create_btn(){
                this.$router.push("/dashboard/personalOffice/publishInfo/setInfoManager")
            },
            delete_btn(){
                if(!this.deleteArry){
                    this.$message({
                        type:'warning',
                        message:'请选择数据'
                    })
                    return;
                }
                this.$confirm("是否确定删除当前选中数据?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$api.messPub.adminDelete(
                            {id: this.deleteArry}
                        ).then(res => {
                            if(res.code=="SUCCESS"){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }
                            this.loadData()
                        })
                    })
                    .catch(() => {
                    });
            }
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
