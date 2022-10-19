<template>
  <div>
    <fd-form
      :data="formData"
      :columns="formCfg"
      @event="btnevent"
    >
    </fd-form>
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
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: 'alternative',
        components: {
            mTable,
            FdForm
        },
        data() {
            return {
                formData: {
                    curUserId:'21',

                },
                userID:{curUserId:'21',},
                tableData: [
                    {bankName: "12121", zl: "1435345"},
                    {bankName: "12121", zl: "1435345"},

                ],

                tableCols: [
                    {label: '编辑日期', prop: 'bankName'},
                    {label: '标题', prop: 'zl'},

                ],
                formCfg: [
                ],
                optiona: {1: '选项1', 2: '选项2'},
                pagination: {
                    pageNum: 1,
                    total: 10
                },
                sonselect: 0
            }
        },
        methods: {
            loadData() {
                this.$api.adminConfig.viewColumn(
                    this.userID,
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: 10
                    }).then(res => {
                    this.pagination.total = res.total;
                    this.tableData = res.data
                })
            },
            btnevent(params){
                if(params.prop=='bankName'){
                    console.log("------>")
                }
            },
        },
        created() {
            this.formCfg= [
                {type: 'select',  prop: 'bankName',span:8,
                    options:this.optiona
                }

            ]
            // this.loadData()
        }

    }
</script>
<style scoped lang="less">
</style>
