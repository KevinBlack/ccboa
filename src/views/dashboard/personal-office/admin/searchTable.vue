<template>
  <div>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
    import mTable from '@/components/table/mTable'
    export default {
        name: 'columnTable',
        components: {
            mTable,
        },
        data() {
            return {
                tableData: [
                    {zlTitle: "12121", zlWh: "1435345",draftOrganid:'11111',draftDepartment:'2222'},
                    {zlTitle: "12121", zlWh: "1435345",draftOrganid:'11111',draftDepartment:'2222'},
                    {zlTitle: "12121", zlWh: "1435345",draftOrganid:'11111',draftDepartment:'2222'},
                ],
                tableCols: [
                    {label: '专栏标题', prop: 'zlTitle'},
                    {label: '文号', prop: 'zlWh'},
                    {label: '制发行', prop: 'draftOrganid'},
                    {label: '主办部门', prop: 'draftDepartment'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10
                },
            }
        },
        methods: {
        },
        mounted(){

        },
        created() {
            console.log("----------------",this.$route.query)
            this.pagination.total = this.$route.query.total;
            this.tableData = this.$route.query.dataList;

        }

    }
</script>
<style scoped lang="less">
</style>
