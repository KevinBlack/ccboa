<!--
 * @Author: your name
 * @Date: 2020-09-01 10:05:02
 * @LastEditTime: 2020-11-03 14:36:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\otherconfig\textNum.vue
--> 
<template>
  <div class="content">
    <p class="base-title">正文字数超限原因配置单</p>
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
        { type: 'input', prop: 'checkselect', label: '机构名称' },
        [
          { type: 'input-area', prop: 'checkselect1', label: '不能包含的关键字', config: { rows: 4 }, style: { width: '80%' } },
          { type: 'span', value: '多个请以英文半角符;分隔', style: { color: 'red' } },
          { type: 'formitem', label: '不能包含的关键字' }
        ],
        { type: 'input', prop: 'checkselect', label: '字数最小个数' },

      ],
      serverconfig: {
        labelWidth: '120px'
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