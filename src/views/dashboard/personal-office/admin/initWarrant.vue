<template>
  <div class="content">
    <p class="use_object_title">同步转授权至商密OA</p>
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
  name: 'alterWin',
  components: {
    FdForm
  },
  data () {
    return {
      formData: {},
      formCfg: [],


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
  color: #458cf1;
  font-size: 28px;
}
.btn_list {
  width: 100%;
  margin-bottom: 20px;
}
</style>