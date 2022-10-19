<!--
 * @Author: your name
 * @Date: 2020-10-11 10:34:09
 * @LastEditTime: 2020-10-13 09:51:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA2\src\views\secretary\leaderActivity\settingPermission\settingPermission.vue
--> 
/**
* create by zx on 2020/7/23 15:15
* 类注释：编辑权限配置
* 备注：
*/
<template>
  <div class="settingPermission">
    <div class="formHeader">
      <div class="title-text">编辑权限配置</div>
    </div>
    <fd-form style="margin:0 10%" :data="formData" @submit="submit" :columns="formCfg"></fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: "settingPermission",
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
          { type: 'formitem', label: '编辑人员中文名', }
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
