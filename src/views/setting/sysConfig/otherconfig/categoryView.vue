<template>
  <div class="content">
    <p class="base-title">视图分类配置</p>
    <div class="btn-list">
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
  name: 'servereditor',
  components: {
    FdForm
  },
  data () {
    return {
      applyformData: {},
      applyformCfg: [
        { type: 'check-boxs', prop: 'checkselect', label: '是否启用个人视图', options: '启用,禁用', max: 1 },
        { type: 'input', prop: '1', label: '账号首字母', style: { width: '100%' } },
        { type: 'input-area', prop: '1', label: '扩展账号前提', style: { width: '100%' }, config: { rows: 4 } },
        { type: 'select', prop: '3', label: '适用的数据库', options: '待办事项2,待办事项1', style: { width: "100%" } },
        [
          { type: 'span', style: { color: 'red' }, value: '1.建议只有人数较多、文_多的机构，如总行，启用个人视图M，启用此功能，将为每个人创建待办和$办视图，以加快访问速度，只有启用时才创建账号视图' },
          { type: 'span', style: { color: 'red' }, value: '2.账号字母列出了账号字母，不需配置，系统为每个字母创建对应的账号视图,如为|创建待办视图：“vwTodo.M”&待办视图：“wvwDone.M”' },
          { type: 'formitem', label: '备注' }
        ],
      ],
      serverconfig: {
        labelWidth: '160px'
      }
    }
  },
  methods: {
    savedata () {
      console.log("保存")
    },
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 140px;
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
  .btn-box {
    margin-left: 200px;
  }
}
</style>