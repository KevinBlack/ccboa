
<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">FTP配置</div>
    </div>
    <el-button type="primary" @click="savedata">保存</el-button>
    <fd-form
      style="margin:0 10%"
      :data="formData"
      :columns="formCfg">
    </fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: "FTPconfig",
        components: {
            FdForm
        },
        props: {},

        data() {
            return {
                formCfg: [
                    {type:'input',label:'FTP_主机',prop:'1',style:{width:'100%'}},
                    {type:'input',label:'FTP_端口',prop:'1',style:{width:'100%'}},
                    {type:'input',label:'FTP_用户',prop:'1',style:{width:'100%'}},
                    {type:'input',label:'FTP_密码',prop:'1',style:{width:'100%'}},
                    {type:'input',label:'网站域名',prop:'1',style:{width:'100%'}},
                    {type:'input-area',label:'网络定义',prop:'1',style:{width:'100'},config:{rows:4}},
                    {type:'span',value:'格式：星期时间段|最大传输K|S；未定义的时间段，以网络环境ＦＴＰ默认最大速率传输；时间段格式时和分配成标准２位数',
                      style:{color:'red'}
                    }
                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            savedata(){
                // this.$router.push({name: 'registerKindTable', query: {formdata: JSON.stringify(this.formdata)}})
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
    margin-left:400px;
  }
</style>
