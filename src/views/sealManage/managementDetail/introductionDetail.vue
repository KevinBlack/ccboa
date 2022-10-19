'
' @Author: your name
' @Date: 2020-12-21 14:03:16
' @LastEditTime: 2020-12-23 16:38:12
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA1\src\views\sealManage\statistical\introductionStatistical.vue
'
<template>
    <div>
        <div class="draft">
                    <el-form ref="statisticalForm" :model="form" label-width="120px">
                        <el-form-item label="行名">
                            <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'0'" >
                                <el-input
                                type="text"
                                readonly
                                placeholder="机构名称"
                                v-model="form.draftOrgan"
                                suffix-icon="el-icon-arrow-down"
                                />
                            </select-org-or-dept>
                        </el-form-item>
                        <el-form-item label="标题">
                           <el-input
                                :style="{width: '200px'}"
                                type="text"
                                v-model="form.title"
                                suffix-icon="el-icon-arrow-down"
                                />
                        </el-form-item>
                        <el-form-item label="编号">
                           <el-input
                                :style="{width: '200px'}"
                                type="text"
                                v-model="form.documentNo"
                                suffix-icon="el-icon-arrow-down"
                                />
                        </el-form-item>
                        <el-form-item label="用印开始时间" v-if="!isNeedInput">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.startDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="用印结束时间" v-if="!isNeedInput">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.endDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="用印/生效日期" v-if="isNeedInput">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.useStartDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="用印/失效效日期" v-if="isNeedInput">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.useEndDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' @click='query'>查询</el-button>
                            <el-button @click='reset'>重置</el-button>
                        </el-form-item>
                    </el-form>
            <el-tabs v-model="activeTab">
                <el-tab-pane label="流转" name="transfer"></el-tab-pane>
                 <el-tab-pane label="办结" name="done"></el-tab-pane>
            </el-tabs>
            <m-table
                @refresh="loadData()"
                @cellClick="cellClick"
                size="medium"
                :tableData="tableData"
                :tableCols="tableCols"
                :pagination="pagination"
                :isSelection="false"
            ></m-table>
        </div>
    </div>
</template>
<script>
import mTable from '@/components/table/tTable'
import selectOrgOrDept from "components/select/selectOrgOrDept";
import exportTable from "../../../minixs/exportTable";
export default {
    name:"introductionStatistical",
    components: {
        mTable,
    selectOrgOrDept
  },
    data(){
        return {
            form: {
                name: '',
                startDate: '',
                endDate: '',
            },
            // 机构ID
            unitCode:'',
            tableData: [
            ],
            // 是否需要对应日期框
            isNeedInput:false,
            // 列表默认加载页签
            activeTab:'transfer',
            // 区分调用接口 2已完结 4流转中
            processType: 4,
            tableCols: [
                { label: '申请时间', prop: 'draftDate' },
                { label: '编号', prop: 'documentNo' },
                { label: '标题', prop: 'title' },
                { label: '用印部门', prop: 'draftDepartment' },
                { label: '当前环节', prop: 'currentNode' },
                { label: '操作人', prop: 'currentUser' }
            ],
            pagination: {
                pageNum: 1,
                total: 0,
                pageSize: 10
            },
        }
    },
    watch:{
        activeTab:{
            handler(val){
                // this.reset()
                if(val === 'transfer'){
                    this.isNeedInput = false
                    this.processType = 4
                    this.tableCols = [
                    { label: '申请时间', prop: 'draftDate' },
                    { label: '编号', prop: 'documentNo' },
                    { label: '标题', prop: 'title' },
                    { label: '用印部门', prop: 'draftDepartment' },
                    { label: '当前环节', prop: 'currentNode' },
                    { label: '操作人', prop: 'currentUser' }
                  ]
                } else {
                    this.isNeedInput = true
                    this.processType = 2
                    this.tableCols = [
                    { label: '用印/生效时间', prop: 'draftDepartment' },
                    { label: '编号', prop: 'documentNo' },
                    { label: '标题', prop: 'title' },
                    { label: '申请单位', prop: 'draftDepartment' }
                  ]
                }
                this.loadData()
            }
        }
    },
    mounted(){
    },
    methods: {
        // 选机构
       selectOrg (org) {
         console.log(org)
         this.$set(this.form, "draftOrgan", org.unitName)
         this.form.draftOrganId = org.id
         this.unitCode = org.id
        },
        // 开始统计按钮点击事件
        query(){
            this.loadData()
        },
        // 重置按钮
        reset(){
            this.form.draftOrgan = ''
            this.form.draftOrganId = ''
            this.form.startDate = ''
            this.form.endDate = ''
            this.form.useStartDate = ''
            this.form.useEndDate = ''
            this.form.title = ''
            this.form.documentNo = ''
            this.tableData = []
        },
        loadData(){
            this.tableData = [];
            let params = {
              processType: this.processType,
              draftOrganId:this.form.draftOrganId,
              title:this.form.title,
              documentNo:this.form.documentNo,
              startDate: this.form.startDate,
              endDate: this.form.endDate,
              useStartDate: this.form.useStartDate,
              useEndDate: this.form.useEndDate 
            };
            this.$api.managementDetail.introductionDetailList(params,{
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize,
            }).then(res => {
                this.pagination.total = res.total;
                this.tableData = res.list;
            });
        },
        cellClick(row){
           let path;
            path = "/sealManage/useSeal/draft/introduction";
            this.$intent.goNewPage(this, {
                path,
                query: {
                id: row.id,
                markOrderType: '2',
                orgLevel: this.orgLevel
                }
            });
        },
        
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
p{border:1px solid;}
</style>