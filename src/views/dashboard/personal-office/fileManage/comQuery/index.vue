<template>
  <div class="content">
    <div class="btn_list">
      <el-button type="primary" @click="searchdata">开始查询</el-button>
      <el-button type="primary" @click="refulldata">重写</el-button>
    </div>
    <div class="borrow_title">设置档案查询条件</div>
    <fd-form
      style="margin:0 1%"
      :data="applyformData"
      :columns="applyformCfg"
      :config="serverconfig"
      @event="btnevent"
    ></fd-form>
    <div class="qiery_tid">
      <p>责任说明：</p>
      <p>1.文件范围中的“档案”指已归档文件,一般为历史文件；“文件”指未归档文件，一般为当年文件</p>
      <p>2.输入多个条件时，条件之间用英文状态下的“,”分隔</p>
      <p>3.不输入任何条件，将查询所以文件 ，一般用户每页最多显示100条记录</p>
      <p>4.查询结果可以通过打印输出到excel表中</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'comQuery',
  components: {
    FdForm
  },
  props: {},
  data () {
    return {
      applyformData: {},
      applyformCfg: [

        { type: 'check-boxs', prop: '11', label: '文件范围', options: '档案,文件', max: 1 },
        { type: 'check-boxs', prop: '12', label: '文件类型', options: '档案', max: 1 },
        { type: 'input', prop: '1', label: '文件标题', span: 20 },
        [
          { type: 'date', prop: '1', span: 4 },
          { type: 'span', value: '至' },
          { type: 'date', prop: '1', span: 4 },
          { type: 'formitem', label: '文件日期' }
        ],
        [
          { type: 'input', prop: '1', span: 20, style: { width: '81%' } },
          { type: 'button-primary', prop: '$selected', value: '选择', style: { margin: '0px 14px' } },
          { type: 'formitem', label: '归档部门' }
        ],
        [
          { type: 'input', prop: '1', span: 20, style: { width: '81%' } },
          { type: 'button-primary', prop: '$selected', value: '选择', style: { margin: '0px 14px' } },
          { type: 'formitem', label: '责任者' }
        ],
        { type: 'check-boxs', prop: '111', label: '文件密级', options: '一般,秘密,机密,绝密', max: 1 },
        { type: 'input', prop: '1', label: '附件标题', span: 20 },
        { type: 'input', prop: '1', label: '文件代字', span: 20 },
        { type: 'input', prop: '1', label: '文件代号', span: 20 },
        { type: 'check-boxs', prop: '111', label: '文佳载体', options: '字纸文件,电子文件,半电子文件,空', max: 1 },
        { type: 'check-boxs', prop: '111', label: '保管期限', options: '永久,30年,10年,暂存,空', max: 1 },
        { type: 'input', prop: '1', label: '归档年度', span: 20 },
        { type: 'input', prop: '1', label: '目录号', span: 20 },
        { type: 'input', prop: '1', label: '全宗号', span: 20 },
        [
          { type: 'input', prop: '1', span: 20, style: { width: '81%' } },
          { type: 'button-primary', prop: '$selected', value: '选择', style: { margin: '0px 14px' } },
          { type: 'formitem', label: '案卷号' }
        ],
        { type: 'check-boxs', prop: '111', label: '文件状态', options: '待归档,实物归档,电子归档,不归档,暂存,空', max: 1 },

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
    searchdata () {
      this.$router.push('/dashboard/personalOffice/fileManagement/queryTable')
    },
    refulldata () {

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
  color: #e13b3d 100%;
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
.qiery_tid {
  margin-top: 20px;
  font-size: 14px;
  p {
    margin: 12px;
  }
}
</style>
