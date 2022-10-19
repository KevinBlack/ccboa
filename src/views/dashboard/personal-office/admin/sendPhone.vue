<template>
  <div class="content">
    <p class="use_object_title">手工发送短信</p>
    <div class="btn-list">
      <el-button type="primary" @click="savedata">保存</el-button>
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
        name: 'createColumn',
        components: {
            FdForm
        },
        data () {
            return {
                formData: {

                },
                formCfg: [
                {
                    type:'input',prop:'tel',label:'手机号'
                },
                {
                    type:'input-area',prop:'content',label:'内容'
                }
            ],
                serverconfig: {
                    labelWidth: '140px'
                }
            }
        },
        methods: {
            savedata () {
                this.$api.adminConfig.sendPhone(
                    this.formData

                ).then(res => {
                    if(res.code=="SUCCESS"){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }

                })
            },

        },
        created() {

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
    color: #e13b3d;
    font-size: 28px;
  }
  .btn_list {
    width: 100%;
    margin-left: 30%;
    display: flex;
    div {
      width: 80px;
      height: 30px;
      background: #2574e2;
      text-align: center;
      line-height: 30px;
      margin: 12px;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
</style>
