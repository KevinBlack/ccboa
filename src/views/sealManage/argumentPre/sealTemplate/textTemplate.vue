<template>
  <div class="content">
    <p class="use_object_title">印章版记维护</p>
    <div class="btn-list">
      <el-button type="primary" @click="savedata" v-if="!textStatus">保存</el-button>
      <el-button type="primary" @click="editordata" v-if="textStatus">编辑</el-button>
    </div>
    <div class="formdata">
      <fd-form
        ref="fd"
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
        @event="btnevent"
      ></fd-form>
    </div>

  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    export default {
        name: 'textTemplate',
        components: {
            FdForm
        },
        data () {
            return {
                textStatus:true,
                formData: {},
                formCfg: [],
                serverconfig: {
                    labelWidth: '140px'
                }
            }
        },
        mounted(){
          this.createForm()
        },
        methods: {
            rewrite () {
                this.formData.zlSslm=''
                console.log("000000",this.formData)
            },
            createForm(){
                this.formCfg= [
                    { type: 'input', label:'字号种类',prop: 'zlSslm' ,disabled:this.textStatus},
                    [
                        { type: 'input',prop: 'zlSslm', span: 20 ,disabled:this.textStatus},
                        {type:'span',value:'模板标签对应关系格式为：“标签名|表单域名称”，多个标签请用半角分号隔开；例如：$$book1;$$book2;$book3',style:{color:'red'}},
                        { type: 'formitem', label: '所属栏目' }
                    ],
                    { type: 'input', label:'模板',prop: 'zlSslm',disabled:this.textStatus},
                ]
            },
            savedata () {
                this.textStatus=true
                this.createForm()
                // this.$api.adminConfig.searchColumn(
                //     this.formData
                // ).then(res => {
                //
                //
                // })
            },
            editordata(){
                this.textStatus=false
                this.createForm()
            },
            btnevent (params) {
                console.log("------",params)
                switch (params.prop) {
                    case '$submit':
                        this.savedata()
                        break;
                    case '$setfull':
                        break;
                }
            }
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
  }
  .use_object_title {
    width: 100%;
    text-align: center;
    color: #458cf1;
    font-size: 28px;
  }
  .btn_list {
    width: 100%;
    margin:20px;

  }
</style>
