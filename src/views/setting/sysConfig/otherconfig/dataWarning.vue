<template>
  <div class="content">
    <p class="base-title">数据库空间预警设置</p>
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
        { type: 'input', prop: '1', label: '数据库名称', style: { width: '100%' } },
        { type: 'input', prop: '1', label: '邮件接收人', style: { width: '100%' } },

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