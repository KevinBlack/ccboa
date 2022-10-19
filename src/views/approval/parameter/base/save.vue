<!--
 * @Author: your name
 * @Date: 2020-08-04 19:50:12
 * @LastEditTime: 2020-08-06 14:44:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\approval\parameter\base\save.vue
-->
<template>
    <div class="save">
        <el-button type="primary" style="margin-left:20px;" @click="edit_btn">编辑</el-button>
        <div class="saveHeader">
            <div class="title-text">事务审批基本配置</div>
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
        name: "save",
        components: {
            FdForm
        },
        props: {},
        data() {
            return {
                formCfg: [

                    {type: 'input', prop: '11', label: '管理机构', span: 24, style: {width: '100%'}},
                    {type: 'input', prop: '12', label: '自动办结期限/月', span: 24, style: {width: '100%'}},


                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            edit_btn(){
                this.$intent.go(this,{path:"/approval/parameter/base/add",query:{data:this.formData}})
            },
            itemClick(){

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
.save{
    background: white;
    margin: 0 auto;

    .saveHeader {
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
}
</style>

