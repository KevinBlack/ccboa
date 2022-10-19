<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="savedata">确定</el-button>
    </div>
    <div class="formdata">
      <p class="base-title">修改口令</p>
      <fd-form style="margin:0 1%" :data="alterpwd" :columns="alterConfig" :config="serverconfig"></fd-form>
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
      alterpwd: {},
      alterConfig: [
        [
          { type: 'input', prop: 'pp' },
          { type: 'span', value: '请输入用户名全称，如：“张三/CCBHK”', style: { marginLeft: '15px' } },
          { type: 'formitem', label: '系统用户名' }
        ],
        [
          { type: 'input', prop: 'pp' },
          { type: 'span', value: '密码长度为6-14位任意字符，区分大小写', style: { marginLeft: '15px' } },
          { type: 'formitem', label: '新密码' }
        ],
        [
          { type: 'input', prop: 'pp' },
          { type: 'span', value: '请再输一次密码', style: { marginLeft: '15px' } },
          { type: 'formitem', label: '重复密码' }
        ],
      ],
      serverconfig: {
        labelWidth: '160px'
      }
    }
  },
  methods: {
    savedata () {
      console.log("保存数据")
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
    text-align: center;
    margin: 22px;
    color: #535353;
    font-size: 20px;
    font-weight: 800;
  }
}
</style>