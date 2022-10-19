<!--
 * @Author: your name
 * @Date: 2020-10-11 10:33:57
 * @LastEditTime: 2020-10-13 20:26:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \OA2\src\views\approval\parameter\base\add.vue
--> 
/**
* create by zx on 2020/8/3 14:31
* 类注释：
* 备注：
*/
<template>
  <div class="add">
    <el-button type="primary" style="margin-left:20px;" @click="save_btn">保存</el-button>
    <div class="addHeader">
      <div class="title-text">事务审批基本配置</div>
    </div>
    <fd-form style="margin:0 10%" :data="formData" @event="itemClick" :columns="formCfg"></fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: "add",
  components: {
    FdForm
  },
  props: {},
  data () {
    return {
      formCfg: [
        { type: 'select', prop: '11', label: '管理机构', span: 24, style: { width: '100%' }, options: '123,3445' },
        { type: 'select', prop: '12', label: '自动办结期限/月', span: 24, style: { width: '100%' } },


      ],
      formData: {

      },
    }
  },
  computed: {},
  methods: {
    save_btn () {
      // console.log('123-->',this.formData)
      this.$intent.go(this, { path: "/approval/parameter/base/save", query: { data: this.formData } })
    },
    itemClick () {

    }
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
.add {
  background: white;
  margin: 0 auto;

  .addHeader {
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
}
</style>
