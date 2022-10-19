<!--
 * @Author: your name
 * @Date: 2020-08-13 14:59:05
 * @LastEditTime: 2020-09-16 18:53:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\setting\sysConfig\gradprotect\gradeditor.vue
--> 
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
        { type: 'select', prop: '1', label: '管理员类型', span: 22, options: '管理1,管理2,管理3', style: { width: '100%' } },
        { type: 'select', prop: '1', label: '管理员中文名', span: 22, options: '管理1,管理2,管理3', style: { width: '100%' } },
        { type: 'input', prop: '1', label: '管理员英文名', span: 22, style: { width: '100%' } },

      ],
      serverconfig: {
        labelWidth: '160px'
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