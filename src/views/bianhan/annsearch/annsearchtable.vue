<template>
  <div>
    <m-table
      @refresh="loadData()"
      :isPagination="true"
      :isIndex="true"
      :isSelection="true"
      :searchData="formdata"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import beanList from "../../../util/beanList";
    import mTable from '@/components/table/tTable'

    export default {
        name: 'annsearchtable',
        components: {
            mTable

        },
        data() {
            return {
                formdata: JSON.parse(this.$route.query.formdata),
                tableData: [],
                tableCols: [
                    {label: '接受日期', prop: 'draftTime'},
                    {label: '编号', prop: 'documentNo',minwidth:220},
                    {label: '标题', prop: 'title',minwidth:338},
                    {label: '当前环节', prop: 'currentNode'},
                    {label: '操作人', prop: 'currentUser'},
                    {label: '拟稿人', prop: 'draftUser'},
                    {
                        label: '类型', prop: 'type', formatter(row) {
                            return beanList.bianHanType[row.type]
                        }
                    },
                ],
                pagination: {
                    pageNum: 1,
                    total: 7
                },
            }
        },
        methods: {
            loadData() {
                this.$api.bianhan.searchByYear(this.formdata, {
                    PAGE_JUMP: this.pagination.pageNum,
                    REC_IN_PAGE: 10
                }).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data
                })
            }
        },
        created() {
            this.loadData()
        }

    }
</script>
<style scoped lang="less">
</style>
