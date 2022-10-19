<template>
  <div>
    <div class="yz_title">
      常规用印审批流水号维护
    </div>
    <fd-form
      :data="formData"
      :columns="formCfg"
      @event="btnevent"
    >
    </fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: 'letterTemplate',
        components: {
            FdForm
        },
        data() {
            return {
                formCfg:[
                    [
                        {type:'select',prop:'1',style:{marginRight:'20px'}},
                        {type:'select',prop:'2',style:{marginRight:'20px'}},
                        {type: 'button-primary', prop: 'searchData', span: 2, value: '查询',style:{marginRight:'20px'}},
                        {type: 'button-primary', prop: 'deleteData', span: 2, value: '删除'},
                    ]
                ],
                formData: {},
            }
        },
        methods: {

        }
    }
</script>
<style scoped lang="less">
  .yz_title{
    color:#3b85f0;
    width:100%;
    text-align:center;
    font-size:32px;
  }
</style>
