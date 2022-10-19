<template>
  <div class="content">
    <p class="use_object_title">用户基信息表</p>
    <div class="btn-list">
      <el-button type="primary" @click="savedata">修改</el-button>
      <el-button type="primary" @click="closedata">取消</el-button>
    </div>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
        @event="btnevent"
      ></fd-form>
    </div>
  </div>
</template>
<script>
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'alterPwd',
  components: {
    FdForm
  },
  data () {
    return {
      formData: {},
      formCfg: [
        [
          { type: 'input', prop: '1', span: 5, style: { width: '30%' } },
          { type: 'span', value: '输入您正确的旧密码' },
          { type: 'formitem', label: '旧密码' }
        ],
        [
          { type: 'input', prop: '1', span: 5, style: { width: '30%' } },
          { type: 'span', value: '输入6-14位数字或字母（设置密码时避免与下面简单密码表中字符串相同）' },
          { type: 'formitem', label: '新密码' }
        ],
        [
          { type: 'input', prop: '1', span: 5, style: { width: '30%' } },
          { type: 'span', value: '请再次输入新密码！' },
          { type: 'formitem', label: '重复新密码' }
        ],
        [
          { type: 'span', value: '1' },
          { type: 'formitem', label: '简单密码表' }
        ],

      ],
      serverconfig: {
        labelWidth: '140px'
      }
    }
  },
  methods: {
    closedata () {
      console.log("关闭")
      this.$router.push('/setting/sysConfig/server')
    },
    savedata () {
      console.log("保存")
    },
    btnevent () {

    }
  },
    // beforeCreate() {
    //   window.location.href='http://11.168.240.3:9011/newpassword.jsp'
    // },
    beforeRouteEnter:(to,from,next)=>{
      next(
          window.location.href='http://11.168.240.3:9011/newpassword.jsp'
      )
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
}
.use_object_title {
  width: 100%;
  text-align: center;
  color: #e13b3d;
  font-size: 28px;
}
</style>
