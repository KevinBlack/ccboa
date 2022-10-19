<template>
  <div class="content">
    <p class="base-title">意见中不能包含的特殊字符</p>
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
        [
          { type: 'input-area', prop: 'checkselect1', config: { rows: 4 }, style: { width: '75%' } },
          { type: 'span', value: '多个请以英文半角符;分隔', style: { color: 'red' } },
          { type: 'formitem', label: '意见中不能包含的特殊字符' }
        ],
        [
          { type: 'input', prop: '2', style: { width: '75%' } },
          { type: 'span', value: '分钟' },
          { type: 'formitem', label: '配置的字符UNICODE' }
        ],
        [
          { type: 'span', value: '用于配置在意见域中不能出现的特殊字符！', style: { color: 'red' } },
          { type: 'br' },
          { type: 'span', style: { color: 'red' }, value: '如果您在该配置文件中配置了相关的特殊字符，那么用户在可填写意见输入包含以上特殊字符的意见，则用户提交的时候会出现提示信息，并强制中断用户提交和保存操作！' },
          { type: 'formitem', label: '备注' }
        ],

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
