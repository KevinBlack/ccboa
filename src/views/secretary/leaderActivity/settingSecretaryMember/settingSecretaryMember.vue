<!--
 * @Author: your name
 * @Date: 2021-01-15 16:50:06
 * @LastEditTime: 2021-01-28 16:35:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \oa0301\src\views\secretary\leaderActivity\settingSecretaryMember\settingSecretaryMember.vue
--> 
/**
* create by zx on 2020/7/23 15:15
* 类注释：秘书成员配置
* 备注：
*/ 
<template>
  <div class="settingSecretaryMember">
    <div class="formHeader">
      <div class="title-text">秘书成员配置</div>
    </div>
    <fd-form style="margin:0 10%" :data="formData" @submit="submit" :columns="formCfg"></fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: "settingSecretaryMember",
  components: {
    FdForm
  },
  props: {},
  data () {
    return {
      formCfg: [
        { type: 'button-primary', prop: '$submit', value: '保存 ' },
        [
          { type: 'input', prop: 'chineseName', style: { width: '600px' }, config: { rows: 8 } },
          { type: 'button-primary', prop: 'select', value: '选择', style: { 'margin-left': '10px' } },
          { type: 'formitem', label: '秘书处理人员中文名', }
        ]
      ],
      formData: {},
    }
  },
  computed: {},
  methods: {
    submit () {
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;

  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
</style>
