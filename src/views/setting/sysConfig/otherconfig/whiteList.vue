<template>
  <div class="content">
    <p class="base-title">正文延时白名单设置</p>
    <div class="btn-list">
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <div class="formdata">
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
        { type: 'check-boxs', prop: 'checkselect', label: '是否启用', options: '启用,禁用', max: 1 },
        [
          { type: 'input', prop: '1', style: { width: '50%' } },
          { type: 'span', value: '分钟' },
          { type: 'formitem', label: '开始自动保存时间' }
        ],
        [
          { type: 'input', prop: '1', style: { width: '50%' } },
          { type: 'span', value: '分钟' },
          { type: 'formitem', label: '自动保存间隔' }
        ],
        [
          { type: 'input', prop: '1', style: { width: '50%' } },
          { type: 'span', value: '分钟' },
          { type: 'formitem', label: '登录重复尝试次数' }
        ],
        { type: 'input', prop: '1', label: '白名单' }
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
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }
}
</style>
