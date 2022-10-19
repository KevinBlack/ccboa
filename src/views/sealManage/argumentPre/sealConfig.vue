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
        name: 'sealConfig',
        components: {
            mTable,
            FdForm
        },
        data() {
            return {
                formCfg:[
                    {type: 'select',  prop: 'bankName', span: 10,
                        // options:bankOptions.join(",")
                    }
                ],
                formData: {

                },
                userID:{curUserId:'21'},
                tableData: [
                    {bankName: "12121", zl: "1435345"},
                    {bankName: "12121", zl: "1435345"},
                ],

                tableCols: [
                    {label: '印章审批类别', prop: 'bankName'},
                    {label: '印章刻制类别(总行)', prop: 'zl'},
                    {label: '印章刻制类别', prop: 'zl'},
                    {label: '用印方式', prop: 'zl'},
                    {label: '承诺', prop: 'zl'},
                    {label: '有效天数', prop: 'zl'},
                    {label: '印章状态', prop: 'zl'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10
                },
                sonselect: 0
            }
        },
        methods: {
            loadData() {
                this.$api.adminConfig.viewColumnCOnfig(
                    this.userID,
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: 10
                    }).then(res => {

                    this.pagination.total = res.total;
                    this.tableData = res.data.list;

                    let bankOptions=[]
                    let b=0
                    res.data.bank.map(function(value,index){
                        bankOptions.push(value.bankName)
                    })
                    this.formCfg=[
                        {type: 'select',  prop: 'bankName', span: 10,
                            options:bankOptions.join(",")
                        }
                    ]
                })
            },
            btnevent(params){
                if(params.prop=='bankName'){
                    console.log("------>")
                    // this.$api.adminConfig.viewColumn(
                    //     {
                    //         curUserId:'21',
                    //         bankName:this.formData.bankName
                    //     },
                    //     {
                    //         PAGE_JUMP: this.pagination.pageNum,
                    //         REC_IN_PAGE: 10
                    //     }).then(res => {
                    //
                    //
                    // })
                }
            },
        },
        mounted(){

        },
        created() {
            // this.loadData()
        }

    }
</script>
<style scoped lang="less">
</style>
