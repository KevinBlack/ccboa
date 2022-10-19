<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <div class="formdata">
      <fd-form style="margin:0 1%" :data="formData" :columns="formCfg" :config="serverconfig"></fd-form>
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
      formData: {},
      formCfg: [
        { type: 'input', prop: '1', label: '主web站点', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'Domino主服务器', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '备Web站点', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'Domino备服务器', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '代理服务器', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'VIPWeb站点', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'VIP主服务器', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'VIP备服务器', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'VIP001Web站点', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'VIP001主服务器', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: 'VIP001备服务器', span: 22, style: { width: '100%' } },
        {          type: 'check-boxs', prop: '2', label: '服务器分类',
          options: '办公服务器,接口服务器,DSMA服务器,归档服务器,FTP服务器,其他服务器'        },
        { type: 'input', prop: '1', label: '说明', span: 22, style: { width: '100%' } },

      ],
      serverconfig: {
        labelWidth: '140px'
      }
    }
  },
  methods: {
    closedata () {
      console.log("关闭")
      this.$router.push('/setting/sysConfig/server')
    },
    savedata () {
      console.log("保存")
        console.log("------,formCfg",this.formCfg[0])
        this.formCfg[0].value=''
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
</style>
