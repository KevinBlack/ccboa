<template>
    <div class="system-con">
        <div>
            <el-button type="primary" @click="savedata">保存</el-button>
            <el-button type="primary" @click="colsedata">关闭</el-button>
        </div>
        <p class="depart_title">印章系统配置</p>
        <div class="content">
            <fd-form :data="formData" :columns="formCfg" @event="btnevent"></fd-form>
        </div>
    </div>
</template>
<script>
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
    data(){
        return {
            formData: { },
            formCfg: [
                { type: 'select', prop: '1', label: '机构名称', span: 16, options: '机构1,机构1', style: { width: '100%' }},
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '常规用印审批单中，印章类别字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '印章类别', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '公文、介绍信中，印章类别字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '公文、介绍信印章类别', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '总行印章刻制，印章类别字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '印章刻制类别（总行）', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '非总行印章刻制，印章类别字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '印章刻制类别', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '常规用印审批，印章性质字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '常规用印审批用印性质', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '常规用印审批，经办人承诺默认意见取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '经办人承诺', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '天', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '介绍信有效天数', span: 24, },
                ],
                { type: 'input', prop: '1', label: '发网单位类型', span: 16},
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '印章废止，废止原因字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '废止原因', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '印章登记，印章状态字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '印章状态', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '用印机设备维护，维护类型字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '维护类型', span: 24, },
                ],
                [
                    { type: 'input-area', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '印章保管人登记，填写说明', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '填写原因', span: 24, },
                ],
                [
                    { type: 'input', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '份', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '归档打印次数', span: 24, },
                ],
                [
                    { type: 'input-area', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '部门用印审批单中，印章名称字段取值', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '印章名称', span: 24, },
                ],
                { type: 'radios', prop: '111', label: '是否启用二维码功能', span: 16, options: '启用,禁用'},
                { type: 'input', prop: '1', label: '启用二维码印章类别', span: 16},
                { type: 'check-boxs', prop: '1151', label: '启用二维码的用印类型', span: 16, options: '常规用印审批,公文用印登记,介绍信审批,部门用印审批' },
                { type: 'input', prop: '1', label: '二维码主体和事项字数总和', span: 16},
                [
                    { type: 'input-area', prop: '252222', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '主体与事项如果单独配置字数限制，则二者合计字数不超过配置的二维码主体和事项合计数字', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '二维码主体字数', span: 24},
                ],
                { type: 'input', prop: '1', label: '二维码事项字数', span: 16},
                { type: 'radios', prop: '111', label: '开启用印业务管理控制', span: 16, options: '是,否'},
                [
                    { type: 'span', value: '合法性审查意见的采纳情况', style: {display: 'block'}},
                    { type: 'input', prop: '111', span: 16, style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '业务事项有权签字人审批情况', style: {display: 'block'} },
                    { type: 'input', prop: '111', span: 16, style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '业务事项有权签字人审批情况', style: {display: 'block'} },
                    { type: 'input', prop: '111', span: 16, style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'formitem', label: '用印机构或部门对用印性质确认签字' },
                ],
                { type: 'input', prop: '1', label: '有权签字人授权确认签字', span: 16},
                [
                    { type: 'radios', prop: '252222',  options: '是,否', style: { width: 'calc(66.66667% - 40px)' }},
                    { type: 'span', value: '支行印章交接时向上级行印章保管人发送待办事宜', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '是否开启提示', span: 24},
                ],
                [
                    { type: 'radios', prop: '252222', span: 12, options: '是,否'},
                    { type: 'span', value: '编号方式', },
                    { type: 'radios', label: '编号方式', prop: '252222', span: 12, options: '按机构编号,按拟稿一级部门编号,按拟稿部门编号', style: { marginLeft: '20px' } },
                    { type: 'span', value: '编号范围', },
                    { type: 'check-boxs', prop: '252222', span: 12, 
                        options: '常规用印审批,部门用印审批,印章销毁审批,公文用印登记,印章刻制审批,印章保管交接,介绍信审批,印章废止审批,用印机设备维护审批', 
                        style: { marginLeft: '20px' } 
                    },
                    { type: 'formitem', label: '内设部门编号开启' },
                ],
                { type: 'radios', prop: '111', label: '是否开启空缺号', options: '是,否', },
                [
                    { type: 'radios', prop: '252222', options: '默认,一级机构,指定机构'},
                    { type: 'span', value: '该功能主要用于解决三级机构印章非保管在上级行的情况（无特殊情况的机构请选择“默认”选项）', style: { marginLeft: '20px' } },
                    { type: 'formitem', label: '印章集中保管位置', span: 24 },
                ],
            ]
        }
    },
    components: {
        FdForm
    },
}
</script>
<style lang="less" rel="stylesheet/less">
    .system-con{
        .depart_title {
            margin-bottom: 40px;
            font-size: 30px;
            line-height: 75px;
            color: #409eff;
            font-weight: 600;
            text-align: center;
        }
        .content{
            border: 1px solid #c3c3c3;
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
    }
</style>