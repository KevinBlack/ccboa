<template>
  <div class="viewPersonal">
    <el-button type="danger" @click="deleteData">删除</el-button>
    <div style="width:100%;height:16px;"></div>
    <div class="list">
      <m-table
        @refresh="loadData()"
        size="medium"
        @select="select"
        :isPagination="true"
        :isHandle="false"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :searchData="searchData"
        @cellClick="jumpdeal"
      ></m-table>
    </div>
  </div>
</template>

<script >
    import mTable from 'components/table/tTable'

    export default {
        name: 'viewPersonal',
        components: {
            mTable
        },
        props: ['tableData'],
        data() {
            return {
                deleteArry:'',
                searchData:{sort:'',sortKey:''},
                keyword: '',
                tableData: [],
                tableCols: [
                    {label: '日期', prop: 'rzRdate'},
                    {label: '记录人', prop: 'rzRauthor'},
                    {label: '摘要', prop: 'rzRtitle'},
                    // {label: '内容', prop: 'rzRcontent'},
                    {label: '共享用户', prop: 'rzRqx'}
                ],
                pagination: {
                    pageNum: 1,
                    pageSize: 20,
                    total:0
                }
            }
        },
        watch: {
            newName() {
                // this.pagination.total = this.tableData.length
            }
        },
        filters: {},
        computed: {
            newName(){
                return this.tableData
            }
        },
        methods: {
            cellClick(row) {
                const department1 = row.department1
                this.$router.push({
                    path: '/dashboard/personalOffice/dailyWork/viewPersonalDetail',
                    query: {
                        department1
                    }
                })
            },
            loadData() {
                this.$api.dailyWork.viewPersonalLog(
                    {
                        searchData:this.searchData
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }
                ).then(res => {
                    console.log("分页响应",res)
                    this.pagination.total = res.total;
                    this.tableData = res.data;
                    console.log('分页数据',this.pagination)
                })
            },
            deleteData() {
                if(!this.deleteArry){
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
                        this.$api.dailyWork.deletePersonalLog(
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
            jumpdeal (val) {
              this.$router.push({
                  name:'viewworkDeal',
                  query:{data:val}
                })
            },
            select (row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
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
