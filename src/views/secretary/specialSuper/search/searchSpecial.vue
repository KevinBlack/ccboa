/**
* create by zx on 2020/7/21 10:28
* 类注释：专项督查办查询
* 备注：
*/
<template>
    <div class="searchSpecial">
      <div class="formHeader">
        <div class="title-text">专项督查办查询</div>
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
        name: "searchSpecial",
        components: {
            FdForm
        },
        props: {},
        data() {
            return {
                formCfg: [
                    {type: 'date', prop: '1', label: '登记时间', span: 12, style: {width: '100%'}},
                    {type: 'date', prop: '2', label: '至', span: 12, style: {width: '100%'}},
                    {type: 'date', prop: '3', label: '承办开始时间', span: 12, style: {width: '100%'}},
                    {type: 'date', prop: '4', label: '至', span: 12, style: {width: '100%'}},
                    {type: 'input', prop: '5', label: '立项依据', span: 24,},
                    {type: 'radios', prop: '6', label: '处理类型', span: 24, options: {1: '全部', 2: '流转',3:'办结'}},
                    {type: 'radios', prop: '7', label: '流转状态', span: 24, options: {1: '全部', 2: '电子',3:'实物'}},
                    {type: 'radios', prop: '8', label: '表单类型', span: 24, options: {1: '协办单', 2: '非协办单',3:'实物'}},
                    {type: 'select', prop: '11', label: '行名', span: 24, style: {width: '100%'}},
                    {type: 'select', prop: '12', label: '承办单位', span: 24, style: {width: '100%'}},
                    {type: 'radios', prop: '16', label: '办理状态', span: 24, options: {1: '正在办理', 2: '延时办理',3:'按时办结',4:"超时办结"}},
                    {type: 'input', prop: '13', label: '是由提要', span: 24, },
                    {type: 'input', prop: '14', label: '编号', span: 24, style: {'margin-bottom': '5px'}},
                    [
                        {type: 'button-primary', prop: '$submit', value: '开始查询'},
                        {type: 'button', prop: '$reset', value: '重置'},
                        {type: 'formitem', style: {'text-align': 'center'}}
                    ],
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
