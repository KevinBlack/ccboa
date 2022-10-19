/**
* create by zx on 2020/7/17 14:07
* 类注释：专项督查办批量处理单
* 备注：
*/
<template>
  <div class="draftBatch">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>专项督查办</span>
      </div>
      <div class="right">
        <el-button v-for="(item,index) in buttonList" @click="buttonClick(item)" :key="index" size="mini">{{item}}
        </el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">中国建设银行专属督查办批量处理单</div>
    </div>
    <fd-form
      ref="fdForm"
      style="margin:0 10%"
      :data="formData"
      @evnet="itemClick"
      :columns="formCfg">
    </fd-form>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: "draftBatch",
        components: {FdForm},
        props: {},
        data() {
            return {
                buttonList: ['关闭', '保存', '完成并发送', '删除此文', '查看流程', "打印处理单", '操作指南'],
                formCfg: [
                    [
                        {type: 'span', value: '当前环节:'},
                        {type: 'span', prop: '1', value: '立项登记', style: {'color': 'red'}},
                        {type: 'span', value: '当前处理人:'},
                        {type: 'span', prop: '2', value: '张三', style: {'color': 'red'}},
                        {type: 'formitem',}
                    ],
                    {type: 'select', prop: '3', label: '立项依据', span: 12, rule: "must", style: {width: '100%'}},
                    {type: 'select', prop: '3', label: '紧急程度', span: 12, rule: "must", style: {width: '100%'}},
                    [
                        {type: 'select', prop: 'binahao', label: '编号', style: {width: '44%'}},
                        {type: 'span', value: '[2020]编号'},
                        {
                            type: 'formitem', label: "编号", rule({data, resolve}) {
                                resolve(!data.binahao && "不能为空")
                            }
                        }
                    ],
                    {type: 'select', prop: '3', label: '督办部门', span: 8, style: {width: '100%'}},
                    {type: 'input', prop: '1', label: '联系人', span: 8,},
                    {type: 'input', prop: '1', label: '联系电话', span: 8,},
                    {type: 'input', prop: '1', label: '登记日期', span: 8,},
                    [
                        {type: 'button-primary', prop: '2', value: '引入'},
                        {type: 'button-primary', prop: '2', value: '重写'},
                        {type: 'formitem', label: "督办依据"}
                    ],
                    {type: 'input', prop: '1', label: '标题', span: 24,},
                    {type: 'input', prop: '3', label: '批量督查办事项', span: 24},
                    {type: 'input', prop: '3', label: '立项审批意见', span: 24},
                    {type: 'input', prop: '3', label: '批量督办办结情况', span: 24},
                    {type: 'input', prop: '3', label: '备注', span: 24},
                    {type: 'input', prop: '3', label: '附件', span: 24},

                ],
                formData: {},
            }
        },
        computed: {},
        methods: {
            buttonClick(item) {
                switch (item) {
                    case "打印处理单":
                        setTimeout(function () {
                            window.print()
                        }, 500)
                        break
                    case '保存':
                        if (this.$refs.fdForm.valid()) {

                        }
                        break

                }
                console.log("---->", item)
            },
            itemClick(params) {
            },
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
  .draftBatch {
    background: white;
  }

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      float: right;
    }
  }

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
