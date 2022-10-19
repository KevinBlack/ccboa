<template>
  <div>
    <div class="btn_list">
      <m-form :formCfg="formCfg" :formData="formData" :showButton="false" :isInline="true"></m-form>
    </div>
    <el-button type="danger" style="margin-bottom:16px;" @click="deleteData">删除</el-button>
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
      :searchData="searchData"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from '@/components/table/tTable'
    import mForm from 'components/form/mForm'

    export default {
        name: 'viewColumn',
        components: {
            mTable,
            mForm
        },
        data () {
            return {
                searchData: {},
                deleteArry: '',
                formData: {},
                formCfg: [
                    {
                        prop: 'draftOrganid',
                        type: 'select',
                        isArray: true,
                        options: [],
                        change: () => {
                            this.selectEventL()
                        },
                        input: () => {
                            this.$forceUpdate()
                        }
                    },
                    {
                        prop: 'zlSslm',
                        type: 'select',
                        isArray: true,
                        options: [],
                        change: () => {
                            this.selectEventR()
                        },
                        input: () => {
                            this.$forceUpdate()
                        }
                    },
                ],
                tableData: [],
                tableCols: [
                    { label: '专栏标题', prop: 'zlTitle' },
                    { label: '文号', prop: 'zlWh' },
                    { label: '发布日期', prop: 'publicDate' },
                ],
                pagination: {
                    pageNum: 1,
                    total: 10,
                    pageSize:10
                },
                bankOptions1: [],
                bankOptions2: []
            }
        },
        methods: {

            loadData () {
                this.$api.adminConfig.viewColumn(
                    {
                        ...this.formData,
                        searchData: this.searchData,
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }
                ).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data.listthree;
                    this.bankOptions1 = []
                    this.bankOptions2 = []
                    var that = this
                    res.data.listOne && res.data.listOne.map(function (value, index) {
                        that.bankOptions1.push(value.draftOrganid)
                    })
                    res.data.listtwo && res.data.listtwo.map(function (value, index) {
                        that.bankOptions2.push(value.zlSslm)
                    })
                    this.formData.draftOrganid = this.bankOptions1[0]
                    this.$set(this.formData, 'zlSslm', this.bankOptions2[0])
                    this.formCfg[0].options = this.bankOptions1
                    this.formCfg[1].options = this.bankOptions2
                    this.pagination.total = res.total;
                    if (res.data.listthree) {
                        this.tableData = res.data.listthree;
                    } else {
                        this.tableData = res.data;
                    }
                })
            },
            selectEventL () {
                this.$api.adminConfig.viewColumn(
                    {
                        searchData: this.searchData,
                        draftOrganid: this.formData.draftOrganid,
                    },
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: this.pagination.pageSize,
                    }
                ).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data.listtwo;
                    this.bankOptions2 = []
                    let that = this
                    res.data.listone.map(function (value, index) {
                        that.bankOptions2.push(value.zlSslm)
                    })
                    // this.formData.zlSslm = this.bankOptions2[0]
                    this.formCfg[1].options = this.bankOptions2
                })
            },
            selectEventR () {
                this.$api.adminConfig.viewColumn(
                    {
                        searchData: this.searchData,
                        draftOrganid: this.formData.draftOrganid,
                        zlSslm: this.formData.zlSslm,
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
            deleteData () {
                this.$api.adminConfig.deleteColumn(
                    { id: this.deleteArry }
                ).then(res => {
                    if (res.code == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.loadData()
                    }

                })
            },
            jumpdeal (val) {
                console.log(val)
                this.$router.push({
                    path:'/dashboard/personalOffice/admin/createColumn',
                    query:{val:val}
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
        mounted () {

        },
        created () {
            this.loadData()
            // this.selectEventL()
        }
    }
</script>
<style scoped lang="less">
  .btn_list {
    width: 100%;
    display: flex;
  }
</style>
