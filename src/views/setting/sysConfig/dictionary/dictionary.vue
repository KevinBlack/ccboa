<template>
  <div class="content">
    <p class="base-title">字典维护</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata" v-if="!isSave">保存</el-button>
      <el-button type="primary" @click="editordata" v-else>编辑</el-button>
    </div>
    <div class="formdata">

      <fd-form
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
      ></fd-form>
    </div>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: 'servereditor',
        components: {
            FdForm
        },
        data () {
            return {
                isSave:true,
                isEdit:false,
                rowData:{},
                formData: {},
                formCfg: [],
                serverconfig: {
                    labelWidth: '160px'
                },
                levelOption:[],
                resData:[]
            }
        },
        methods: {
            initData(){
                this.formCfg= [
                    { type: 'input', prop: 'dicCode', label: '类别编码', disabled:this.isEdit?true:false,span: 22},
                    { type: 'input', prop: 'codeName', label: '类别名称',disabled:this.isSave, span: 22},
                    { type: 'input', prop: 'operator', label: '创建人', disabled:true,span: 22},
                    { type: 'input', prop: 'dicStartTime', label: '创建时间', disabled:true,span: 22},
                    { type: 'input', prop: 'dicEndTime', label: '最后创建时间', disabled:true,span: 22},
                    { type: 'input-area', prop: 'remark', label: '备注', disabled:this.isSave,config:{rows:4},span: 22},
                ]
            },
            loadData(){
                this.$api.setSysConfig.dictCreate(
                    {}
                ).then(res => {
                      this.formData=res.data
                })
            },
            closedata () {
                this.$router.go(-1)
            },
            savedata () {
                this.resData&&this.resData.map(item=>{
                    if(item.unitLevelName===this.formData.unitLevelName){
                        this.formData.LevelId=item.id
                    }
                })
                if(this.rowData&&this.rowData.dicId){
                    this.$api.setSysConfig.dictAlter(
                        this.formData
                    ).then(res=>{
                        if(res.code=="SUCCESS"){
                            this.$router.push('/setting/sysConfig/dictionaryPre')
                        }
                    })
                }else{
                    this.$api.setSysConfig.dictCreate(
                        this.formData
                    ).then(res=>{
                        if(res.code=="SUCCESS"){
                            this.$router.push('/setting/sysConfig/dictionaryPre')
                        }
                    })
                }
            },
            editordata(){
              this.isSave=false
                this.initData()
            },
        },
        created(){
            if(this.$route.query.rowData){
                this.isSave=true
                this.isEdit=true
                this.rowData=this.$route.query.rowData
                this.formData=this.rowData
            }else{
                this.loadData()
                this.isEdit=false
                this.isSave=false
            }
            this.initData()
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
      width:100%;
      text-align: center;
      font-size: 32px;
      color: #3c86f0;
    }
  }
</style>
