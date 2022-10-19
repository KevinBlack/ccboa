<template>
  <div class="content">
    <p class="use_object_title">链接设置</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <div class="formdata">
      <fd-form
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
        name: 'createLink',
        components: {
            FdForm
        },
        data() {
            return {
                linkFromData: {},
                formData: {

                },
                formCfg: [],
                serverconfig: {
                    labelWidth: '140px'
                }
            }
        },
        created() {

            this.formCfg = [
                {type: 'input', label: '序号', prop: 'hyDnr', style: {width: '100%'}},
                {type: 'input', label: '链接名称', prop: 'hyName', style: {width: '100%'}},
                {type: 'input', label: '链接地址', prop: 'hyAddress', style: {width: '100%'}},
                {
                    type: 'check-boxs',
                    label: '公用地址',
                    prop: 'keys',
                    options: {1: '是', 0: '否'},
                },
            ]
        },
        methods: {
            closedata() {
                console.log("关闭")
                this.$router.push('/dashboard/personalOffice/sysConfig/viewPerLink')
            },
            savedata() {
                this.formData.keys = this.formData.keys[0]
                    this.$api.dailyWork_sysConfig.createLink(
                        this.formData
                    ).then(res => {
                        if (res.code == "SUCCESS") {
                            this.$message(
                                {
                                    type: 'success',
                                    message: "保存成功"
                                }
                            )
                        }
                        if(this.formData.keys=='0'){
                            this.$router.push("/dashboard/personalOffice/sysConfig/viewPerLink")
                        }else if(this.formData.keys=='1'){
                            this.$router.push("/dashboard/personalOffice/sysConfig/viewPublicLink")
                        }
                    })
            },
            btnevent() {

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
    color: #e13b3d;
    font-size: 28px;
  }
</style>
