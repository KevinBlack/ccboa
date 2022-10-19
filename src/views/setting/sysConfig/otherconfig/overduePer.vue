<template>
  <div class="content">
    <p class="base-title">超期待办个人提醒参数配置</p>
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
        { type: 'check-boxs', prop: 'checkselect', label: '是否启用超时提醒', options: '启用,禁用', max: 1 },
        { type: 'date', prop: 'checkselect1', label: '统计启用时间', style: { width: '85%' } },
        { type: 'select', prop: '1', label: '统计周期时间', options: '选项1,选项2,选项3', style: { width: '85%' } },
        { type: 'select', prop: '2', label: '未处理天数', options: '选项1,选项2,选项3', style: { width: '85%' } },
        { type: 'select', prop: '3', label: '未处理天数待办数量', options: '选项1,选项2,选项3', style: { width: '85%' } },
        [
          { type: 'span', value: '待办超时提醒功能：系统按照统计周期定期检索未处理天数（统计日期-待办接受日期）大于等于本设置参数“未处理的天数”的待办，某个接收人的超期待办件数大于等于本设置中参数“未处理的待办数量”，则向待办接受人发送提醒邮件' },
          { type: 'formitem', label: '备注', style: { color: "red" } }
        ]
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