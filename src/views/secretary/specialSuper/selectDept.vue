/**
* create by zx on 2020/7/17 09:22
* 类注释：专项督查办选择部门
* 备注：
*/
<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">选择拟稿部门</div>
    </div>
    <fd-form
      style="margin:0 10%"
      :data="formData"
      @submit="submit"
      :columns="formCfg">
    </fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: "selectDept",
        components: {
            FdForm
        },
        props: {},
        watch: {
            $route() {
              this.type=this.$route.params.id
            }
        },
        data() {
            return {
                type: this.$route.params.id,
                formCfg: [
                    {type: 'select', prop: '12', label: '部门', span: 12},
                    [
                        {type: 'button-primary', prop: '$submit', value: '开始查询'},
                        {type: 'formitem', style: {'text-align': 'center'}}
                    ],
                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            submit() {
                if (this.type=="single"){
                    this.$intent.go(this,{name:"draftSingle"})
                }else {
                    this.$intent.go(this,{name:"draftBatch"})
                }
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
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
</style>
