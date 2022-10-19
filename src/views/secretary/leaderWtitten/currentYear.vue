
<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">领导批示管理查询</div>
    </div>
    <fd-form
      style="margin:0 10%"
      :data="formData"
      :columns="formCfg">
    </fd-form>
    <div class="btn_list">
      <el-button type="primary" @click="savedata">开始查询</el-button>
      <el-button type="primary" @click="savedata">重写</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: "registerKindTable",
        components: {
            FdForm
        },
        props: {},
        watch: {
            $route() {
                this.type=this.$route.params.id
            }
        },
        data() {
            return {
                type: this.$route.params.id,
                formCfg: [
                    {type:"date",prop:"1",label:'登记日期',span:10,style:{width:'330px'}},
                    {type:"date",prop:"1",label:'至',span:10,style:{width:'330px'}},
                    [
                        {type:'select',option:'1,2,3',span:10},
                        {type:'input',span:10,style:{width:'63%'}},
                        {type:'formitem',label:'行名'}
                    ],
                    [
                        {type:'select',option:'1,2,3',span:10},
                        {type:'input',span:10,style:{width:'63%'}},
                        {type:'formitem',label:'主办部门'}
                    ],
                    {
                      type:'check-boxs',label:'文件类型',prop:'1q11',options:'全部,发文,收文,签报,其他'
                    },
                    {type:'input',label:'领导姓名',prop:'1',style:{width:'96%'}},
                    {type:'input',label:'文号',prop:'1',style:{width:'96%'}},
                    {type:'input',label:'文件标题',prop:'1',style:{width:'96%'}},
                    {type:'input',label:'批示意见',prop:'1',style:{width:'96%'}},

                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            savedata(){
                console.log("-----")
            }
        },
        activated() {
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .btn_list{
    margin-left:45%;
  }
</style>
