<!--
 * @Author: your name
 * @Date: 2020-10-24 09:51:11
 * @LastEditTime: 2020-11-06 18:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\dashboard\personal-office\sysConfig\useObject.vue
--> 
<template>
  <div class="content">
    <p class="use_object_title">常用发送对象登记</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
      <el-button type="primary">保存并新建</el-button>
    </div>
    <div class="formdata">
      <fd-form style="margin:0 1%" :data="formData" :columns="formCfg" :config="serverconfig"></fd-form>
    </div>
  </div>
</template>
<script>
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'useObject',
  components: {
    FdForm,
  },
  data() {
    return {
      formData: {},
      formCfg: [
        { type: 'input', prop: '1', label: '中文名', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '所属部门', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '英文名', span: 22, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '序号', span: 22, style: { width: '100%' } },
      ],
      serverconfig: {
        labelWidth: '140px',
      },
    }
  },
  methods: {
    closedata() {
      console.log('关闭')
      this.$router.push('/setting/sysConfig/server')
    },
    savedata() {
      console.log('保存')
    },
  },
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
  color: #3b85f0;
  font-size: 28px;
}
</style>