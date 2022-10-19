
<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">值班动态查询</div>
    </div>
    <fd-form
      style="margin:0 10%"
      :data="formData"
      :columns="formCfg"
      @submit="btnEvent"
    >
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
        name: "searchPhone",
        components: {
            FdForm
        },
        props: {},

        data() {
            return {
                formCfg: [
                    {type:'check-boxs',label:'类型',prop:'1111',options:'稿件,发布'},
                    {type:'date',label:'发布时间',prop:'1',span:10},
                    {type:'date',label:'结束时间',prop:'1',span:10},
                    {type:'input',label:'关键字',prop:'2',span:20},

                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            btnEvent(){

            },
            savedata(){

            },
            submission(){

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
    margin-top:30px;
    margin-bottom:30px;
    margin-left:45%;
  }
  .duty_tid{
    margin-left:20%;
    font-size:14px;
    span{
      color:red;
      cursor:pointer;
    }
  }
</style>
