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
        name: 'letterTemplate',
        components: {
            mTable,
            FdForm
        },
        data() {
            return {
                formCfg:[],
                formData: {

                },
                userID:{curUserId:'21'},
                tableData: [
                    {bankName: "12121", zl: "1435345"},
                    {bankName: "12121", zl: "1435345"},
                ],

                tableCols: [
                    {label: '序号', prop: 'bankName'},
                    {label: '文件字头', prop: 'zl'},
                    {label: '字号种类', prop: 'zl'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10
                },
                sonselect: 0
            }
        },
        methods: {
            aloadData() {
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
            loadData(){},
            btnevent(params){
                if(params.prop=='bankName'){
                    console.log("------>")
                    this.$api.adminConfig.viewColumn(
                        {
                            curUserId:'21',
                            bankName:this.formData.bankName
                        },
                        {
                            PAGE_JUMP: this.pagination.pageNum,
                            REC_IN_PAGE: 10
                        }).then(res => {


                    })
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
