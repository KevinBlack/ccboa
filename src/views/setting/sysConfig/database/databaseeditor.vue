<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <div class="formdata">
      <p class="base-title">应用数据库配置</p>
      <fd-form
        style="margin:0 1%"
        :data="applyformData"
        :columns="applyformCfg"
        :config="serverconfig"
      ></fd-form>
      <p class="base-title">分库设置</p>
      <fd-form style="margin:0 1%" :data="SubLibrary" :columns="subformCfg" :config="serverconfig"></fd-form>
      <p class="base-title">数据库控件预警设置</p>
      <fd-form
        style="margin:0 1%"
        :data="earlyLibrary"
        :columns="earlyformCfg"
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
      earlyLibrary: {},
      SubLibrary: {},
      applyformData: {},
      applyformCfg: [
        { type: 'input', prop: '1', label: '数据库名称', span: 22, style: { width: '100%' } },
        { type: 'check-boxs', label: '模块分类', prop: 'checkbuttons2', options: '业务,系统', max: 1 },
        { type: 'input', prop: '1', label: '模块名称', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '模块关键字', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '功能名称', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '功能关键字', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '主服务器', span: 22, style: { width: '100%' } },
        { type: 'check-boxs', prop: 'checkbuttons1', label: '后台程序访问数据方式', options: '访问调用程序服务器,访问本数据库主服务器', max: 1 },
        { type: 'input', prop: '1', label: '数据库路径', span: 22, style: { width: '100%' } },
      ],
      subformCfg: [
        { type: 'input', prop: '1', label: '启用分库', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '分库方式', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '分库年份', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '分库月份', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '分库大小', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '分库大小序号', span: 22, style: { width: '100%' } },
      ],
      earlyformCfg: [
        { type: 'input', prop: '1', label: '数据库空间', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '数据库文档数目', span: 22, style: { width: '100%' } },
      ],
      serverconfig: {
        labelWidth: '160px'
      }
    }
  },
  methods: {
    closedata () {
      console.log("关闭")
      this.$router.push('/setting/sysConfig/database')
    },
    savedata () {
      console.log("保存")
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
    margin: 22px;
    color: #3c86f0;
  }
}
</style>