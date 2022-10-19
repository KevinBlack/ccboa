<template>
  <div>
    <fd-form
      :data="formData"
      :columns="formCfg"
      @event="btnevent"
    >
    </fd-form>
    <div style="height:10px;width:100%;"></div>
    <el-button type="danger" style="margin-bottom:16px;" @click="deleteData">删除</el-button>
    <div style="height:10px;width:100%;"></div>
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
</template>

<script type="text/ecmascript-6">
    import mTable from '@/components/table/tTable'
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: 'viewColumn',
        components: {
            mTable,
            FdForm
        },
        data() {
            return {
                deleteArry: '',
                formCfg: [
                    [
                        {
                            type: 'select', prop: 'bankName', span: 10,
                            options: ''
                        },
                        // {type: 'button-primary', prop: '$deletedata', value: '删除', style: {marginLeft: '20px'}},

                    ]
                ],
                formData: {},
                tableData: [],

                tableCols: [
                    // {label: '专栏栏目', prop: 'bankName'},
                    {label: '行名', prop: 'zl'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize: 10
                },
                searchData: {}
            }
        },
        methods: {
            loadData() {
                this.$api.adminConfig.viewColumnConfig(
                    {
                        ...this.formData,
                        searchData: this.searchData,
                    },

                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize
                    }).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data.list || res.data;
                    if (res.data.bank) {
                        let bankOptions = []
                        res.data.bank.map(function (value, index) {
                            bankOptions.push(value.bankName)
                        })
                        this.formCfg = [
                            [
                                {
                                    type: 'select', prop: 'bankName', span: 10,
                                    options: bankOptions.join(",")
                                },
                                // {type: 'button-primary', prop: '$deletedata', value: '删除', style: {marginLeft: '20px'}},

                            ]
                        ]
                    }
                })
            },
            btnevent(params) {
                switch (params.prop) {
                    case 'bankName':
                        this.loadData()
                        /* this.$api.adminConfig.viewColumn(
                             {
                                 bankName: this.formData.bankName,
                                 PAGE_JUMP: this.pagination.pageNum,
                                 REC_IN_PAGE: 10
                             }
                         ).then(res => {
                         })*/
                        break;
                    case '$deletedata':

                        break;
                }

            },
            jumpdeal(val) {
                this.$router.push(
                    {
                        name: 'columnConfig',
                        query: {val: val}
                    }
                )
            },
            select(row) {
                let dataArry = []
                row.map(function (value, index) {
                    dataArry.push(value.id)
                })
                this.deleteArry = dataArry.join(",")
            },
            deleteData() {
                this.$api.adminConfig.deleteColumnConfig(
                    {id: this.deleteArry}
                ).then(res => {
                    if (res.code == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.loadData()
                    }
                })
            }
        },
        mounted() {

        },
        created() {
            this.loadData()
        }

    }
</script>
<style scoped lang="less">

</style>
