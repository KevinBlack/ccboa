/**
* create by zx on 2020/7/16 16:24
* 类注释：
* 备注：
*/
<template>
  <div class="nowYearSearch">
    <div class="formHeader">
      <div class="title-text">公文督查办查询</div>
    </div>
    <fd-form
      style="margin:0 10%"
      :data="formData"
      @event="itemClick"
      :columns="formCfg">
    </fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: "nowYearSearch",
        components: {
            FdForm
        },
        props: {},
        data() {
            return {
                option1: {1: '协办单', 2: '非协办单',3:'实物'},
                formCfg: [

                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            itemClick(params){

            }
        },
        activated() {
        },
        mounted() {
        },
        created() {
            this.formCfg= [{type: 'date', prop: '1', label: '收文日期', span: 12, style: {width: '100%'}},
                {type: 'date', prop: '2', label: '至', span: 12, style: {width: '100%'}},
                {type: 'date', prop: '3', label: '督办日期', span: 12, style: {width: '100%'}},
                {type: 'date', prop: '4', label: '至', span: 12, style: {width: '100%'}},
                {type: 'check-boxs', prop: '5', label: '多次批办', span: 24, options: '邮件'},
                {type: 'radios', prop: '6', label: '公文状态', span: 24, options: {1: '全部', 2: '流转',3:'办结'}},
                {type: 'radios', prop: '7', label: '公文类型', span: 24, options: {1: '全部', 2: '电子',3:'实物'}},
                {type: 'radios', prop: '8', label: '表单类型', span: 24, options: this.option1},
                {type: 'radios', prop: '9', label: '督办事项', span: 24, options: {1: '全部', 2: '请示事项',3:'其他事项'}},
                {type: 'radios', prop: '10', label: '来文单位', span: 24, options: {1: '总行', 2: '其他'}},
                {type: 'select', prop: '11', label: '收文单位', span: 24, style: {width: '100%'}},
                {type: 'select', prop: '12', label: '承办单位', span: 24, style: {width: '100%'}},
                {type: 'input', prop: '13', label: '标题', span: 24, },
                {type: 'input', prop: '14', label: '文号', span: 24, style: {'margin-bottom': '5px'}},
                {type: 'span', value: '注：输入的简易密码和日志信息过滤字符用分号（；），设置密码时不要使用分号及空格', style: {'color': 'red'}},
                [
                    {type: 'button-primary', prop: '$submit', value: '开始查询'},
                    {type: 'button', prop: '$reset', value: '重置'},
                    {type: 'formitem', style: {'text-align': 'center'}}
                ]
            ];
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
      color: #409EFF;
      font-weight: 600;
      text-align: center;
    }
  }
</style>
