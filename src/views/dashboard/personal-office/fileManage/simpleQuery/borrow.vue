<template>
  <div class="content">
    <div class="btn_list">
      <div>发送审批人</div>
      <div @click="closeWin">关闭</div>
      <div>保存</div>
      <div @click="viewFile">查看文件</div>
    </div>
    <div class="borrow_title">电子借阅单</div>
    <fd-form
      style="margin:0 1%"
      :data="applyformData"
      :columns="applyformCfg"
      :config="serverconfig"
      @event="btnevent"
    ></fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'borrow',
  components: {
    FdForm
  },
  props: {},
  data () {
    return {
      applyformData: {},
      applyformCfg: [
        { type: 'input', prop: '1', label: '借阅人', span: 10, style: { width: '100%' } },
        { type: 'date', prop: '1', label: '借阅时间', span: 10, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '所属单位', span: 10, style: { width: '100%' } },

        { type: 'date', prop: '1', label: '审批时间', span: 10, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '审批意见', span: 20, style: { width: '100%' } },
        [
          { type: 'input', prop: '1', span: 20, style: { width: '81%' } },
          { type: 'button-primary', prop: '$selected', value: '选择', style: { margin: '0px 14px' } },
          { type: 'formitem', label: '审批人' }
        ],
        { type: 'input', prop: '1', label: '档号', span: 20, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '利用目的', span: 20, style: { width: '100%' } },
        { type: 'input', prop: '1', label: '借阅内容', span: 20, style: { width: '100%' } },

      ],
      serverconfig: {
        labelWidth: '100px'
      }
    }
  },
  methods: {
    btnevent (params) {
      switch (params.prop) {
        case '$selected':
          console.log("111111")
          break;
      }
    },
    closeWin () {
      this.$router.push('/dashboard/personalOffice/fileManagement')
    },
    viewFile () {
      this.$router.push('/dashboard/personalOffice/fileManagement/viewFile')
    }
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.borrow_title {
  width: 100%;
  text-align: center;
  font-size: 28px;
  color: #5d5d5d;
  margin-bottom: 26px;
}
.btn_list {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  div {
    width: 100px;
    height: 35px;
    border-radius: 5px;
    background: #3c86f0;
    margin: 5px 10px;
    text-align: center;
    line-height: 35px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
