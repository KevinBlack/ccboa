<template>
  <div>
    <p class="depart_title">选择拟稿部门</p>
    <div class="content">
      <fd-form
        style="margin:30px 20%"
        :data="formData"
        :columns="formCfg"
        @event="btnevent"
      >
      </fd-form>
      <div class="btn_list">
        <el-button type="primary" @click="savedata">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: 'viewColumn',
        components: {
            FdForm
        },
        data() {
            return {
                formData: {
                },
                formCfg:[
                    {
                        type:'select',prop:'111',label:'部门',options:'1,32,34,56'
                    }
                ]
            }
        },
        methods: {
            loadData() {
                this.$api.adminConfig.viewColumnConfig(
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
                if(params.prop=='111'){

                }
            },
            savedata(){
              this.$router.push({
                  name:'facilityRegister',
                  query:{
                      depart:'1111'
                  }
              })
            }
        },
        mounted(){

        },
        created() {
            // this.loadData()

        }

    }
</script>
<style scoped lang="less">
  .content{
    width:80%;
    height:300px;
    margin:0 auto;
    border:1px solid #ccc;
    margin-top:20px;
  }
  .depart_title{
    width:100%;
    text-align:center;
    color:cornflowerblue;
    font-size:30px;
    margin:0px 20px;
  }
  .btn_list{
    margin-left:60%;
  }
</style>
