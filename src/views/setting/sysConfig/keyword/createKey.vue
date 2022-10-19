<template>
  <div class="content">
    <div class="key_title">
      新建主题词部门
    </div>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        :data="applyformData"
        :columns="applyformCfg"
        :config="serverconfig"
      ></fd-form>
    </div>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: 'createKey',
        components: {
            FdForm
        },
        data () {
            return {
                applyformData: {},
                applyformCfg: [
                    { type: 'select', prop: 'curBank', label: '机构名称', span: 22, style: { width: '100%' } },
                    { type: 'select', prop: 'topicWord', label: '主题词', span: 22, style: { width: '100%' } },
                    { type: 'select', prop: 'deptName', label: '对应部门', span: 22, style: { width: '100%' } },
                ],
                serverconfig: {
                    labelWidth: '160px'
                }
            }
        },
        methods: {
            closedata () {
                this.$router.push('/setting/sysConfig/keyword')
            },
            savedata () {
                this.$api.setSysConfig.createKeyWord(
                    this.applyformData
                ).then(res => {
                    let resCode = JSON.parse(res.dataCntnt)
                    if(resCode.code=="SUCCESS"){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.$router.push('/setting/sysConfig/keyword')
                    }
                })
            },
            loadData(){
                this.$api.setSysConfig.selectData(
                    {}
                ).then(res => {
                    let bankOptions=[]
                    let b=0
                    res.data.map(function(value,index){
                        bankOptions.push(value.mtTmpOne)
                    })
                    this.applyformCfg= [
                        { type: 'select', prop: 'curBank', label: '机构名称', span: 22, style: { width: '100%' } },
                        { type: 'select', prop: 'topicWord', label: '主题词',
                            span: 22, style: { width: '100%' } ,
                            options:bankOptions.join(",")
                        },
                        { type: 'select', prop: 'deptName', label: '对应部门', span: 22, style: { width: '100%' } },
                    ]
                })
            }
        },
        created(){
            this.loadData()
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    .formdata {
      margin-top: 24px;
    }
    .base-title {
      margin: 22px;
      color: #3c86f0;
    }
  }
  .key_title{
    width:100%;
    text-align:center;
    font-size:30px;
    color:royalblue;
    margin:10px 0px;
  }
</style>
