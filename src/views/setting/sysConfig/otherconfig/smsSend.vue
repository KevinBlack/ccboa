<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <div class="formdata">
      <p class="base-title">短信发送配置</p>
      <fd-form
        @event="btnevent"
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
  name: 'servereditor',
  components: {
    FdForm
  },
  data () {
    return {
      applyformData: {},
      applyformCfg: [
        { type: 'check-boxs', prop: 'checkselect', label: '是否启用短信功能', span: 22, options: '启用', style: { width: '100%' } },
        { type: 'check-boxs', prop: 'checkselect1', label: '是否启用微信功能', span: 22, options: '启用', style: { width: '100%' } },
        [
          { type: 'input-area', prop: '1', span: 22, style: { width: '70%' }, config: { rows: 4 } },
          { type: 'button-primary', prop: '$selected', value: '选择', style: { margin: '0px 14px' } },
          { type: 'button-primary', prop: '$setfull', value: '清空' },
          { type: 'formitem', label: '手工发送短信的人员' }
        ],
        { type: 'input-area', prop: '1', label: '手工发送短信人员的英文名', style: { width: '85%' }, config: { rows: 4 } },
        [
          { type: 'input-area', prop: '1', span: 22, style: { width: '70%' }, config: { rows: 4 } },
          { type: 'button-primary', prop: '$selected', value: '选择', style: { margin: '0px 14px' } },
          { type: 'button-primary', prop: '$setfull', value: '清空' },
          { type: 'formitem', label: '发送微信的人员' }
        ],
        { type: 'input-area', prop: '1', label: '发送微信人员的英文名', style: { width: '85%' }, config: { rows: 4 } },

      ],
      serverconfig: {
        labelWidth: '180px'
      }
    }
  },
  methods: {
    closedata () {
      console.log("关闭")
      this.$router.push('/setting/sysConfig/gradprotect')
    },
    savedata () {
      console.log("保存")
    },
    btnevent (params) {
      switch (params.prop) {
        case '$selected':
          console.log("111111")
          break;
        case '$setfull':
          console.log("222222")
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
  .base-title {
    width: 100%;
    text-align: center;
    margin: 22px;
    color: #5d5d5d;
    font-size: 18px;
    font-weight: bolder;
  }
}
</style>