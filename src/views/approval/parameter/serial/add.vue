<!--
 * @Author: your name
 * @Date: 2020-08-04 19:22:10
 * @LastEditTime: 2020-08-05 19:11:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\approval\parameter\serial\add.vue
-->
<template>
    <div class="add">
        <el-button type="primary" style="margin-left:20px;" @click="save_btn">保存</el-button>
        <div class="addHeader">
            <div class="title-text">事务审批流水号维护表</div>
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
        name: "add",
        components: {
            FdForm
        },
        props: {},
        data() {
            return {
                formCfg: [

                    {type: 'select', prop: '11', label: '管理机构', span: 24, style: {width: '100%'}},
                    {type: 'select', prop: '12', label: '自动办结期限/月', span: 24, style: {width: '100%'}},
                    {type: 'input', prop: '13', label: '年度', span: 24, style: {width: '100%'}},
                    {type: 'input', prop: '14', label: '起始文号', span: 24, style: {width: '100%'}},
                    {type: 'input', prop: '15', label: '流水号', span: 24, style: {width: '100%'}},


                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            save_btn(){
                this.$intent.go(this,{path:"/approval/parameter/serial/save"})
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
.add{
    background: white;
    margin: 0 auto;

    .addHeader {
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
