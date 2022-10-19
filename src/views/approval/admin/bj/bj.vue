<!--
 * @Author: your name
 * @Date: 2020-08-06 10:11:57
 * @LastEditTime: 2020-08-07 14:26:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\approval\admin\bj.vue
-->
<template>
    <div class="bj2018">
        <el-select v-model="value1" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
            <m-table
                @refresh="loadData()"
                @cellClick="cellClick"
                size="medium"
                :tableData="tableData"
                :tableCols="tableCols"
                :pagination="pagination"
                :isSelection='true'
            ></m-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import mTable from '@/components/table/mTable'
    export default {
        name: "bj",
        components: {
            mTable
        },
        props: {},
        data() {
            return {
                tableData:[
                        {
                            name: '行名，部门',
                            shenpi:'3',
                            shenqing: '行名，部门',
                            danwei:'3',
                            title: '行名，部门',
                        },
                        {
                            name: '行名',
                            shenpi:'3',
                            shenqing: '部门',
                            danwei:'34',
                            title: '部门',
                        },
                ],
                tableCols:[
                        {label: '申请时间', prop: 'name'},
                        {label: '审批编号', prop: 'shenpi'},
                        {label: '申请编号', prop: 'shenqing'},
                        {label: '申请单位', prop: 'danwei'},
                        {label: '标题', prop: 'title'},
                ],
                pagination: {
                        pageNum: 1,
                        total: 10
                    },
                options:[],
                value1:""
                }
        },
        computed: {},
        methods: {
            loadData(){},
            cellClick(row){
                 this.$intent.goNewPage(this,{path:'/approval/admin/bj/2018Detail',query:{data:row}})
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

</style>
