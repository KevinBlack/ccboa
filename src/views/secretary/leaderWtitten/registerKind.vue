
<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">选择拟稿部门</div>
    </div>
    <fd-form
      style="margin:0 10%"
      :data="formData"
      :columns="formCfg">
    </fd-form>
    <div class="btn_list">
      <el-button type="primary" @click="savedata">确定</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: "registerKind",
        components: {
            FdForm
        },
        props: {},

        data() {
            return {
                formCfg: [
                    {type: 'select', prop: '12', options:"1,3,2",label: '部门', span: 12},
                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            savedata(){
                this.$router.push({name: 'registerKindTable', query: {formdata: JSON.stringify(this.formdata)}})
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
  .btn_list{
    margin-left:400px;
  }
</style>
