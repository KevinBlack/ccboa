'
' @Author: your name
' @Date: 2020-12-22 11:00:48
' @LastEditTime: 2020-12-23 16:38:21
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA1\src\views\sealManage\managementDetail\maintainDetail.vue
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
                        <el-form-item label="申请开始时间">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.startDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="申请结束时间">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.endDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="编号">
                           <el-input
                                :style="{width: '200px'}"
                                type="text"
                                v-model="form.deviceNumber"
                                />
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' @click='query'>查询</el-button>
                            <el-button @click='reset'>重置</el-button>
                        </el-form-item>
                    </el-form>
            <el-tabs v-model="activeTab">
                <el-tab-pane label="审批" name="transfer"></el-tab-pane>
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
                type: ''
            },
            // 机构ID
            unitCode:'',
            tableData: [
            ],
            processType:4,
            // 列表默认加载页签
            activeTab:'transfer',
            tableCols: [
                { label: '申请时间', prop: 'draftDepartment' },
                { label: '编号', prop: 'deviceNumber' },
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
                if(val === 'transfer'){
                    this.processType = 4
                    this.tableCols = [
                    { label: '申请时间', prop: 'draftDepartment' },
                    { label: '编号', prop: 'deviceNumber' },
                    { label: '用印部门', prop: 'draftDepartment' },
                    { label: '当前环节', prop: 'currentNode' },
                    { label: '操作人', prop: 'currentUser' }
                  ]
                } else {
                    this.processType = 2
                    this.tableCols = [
                    { label: '申请时间', prop: 'draftDepartment' },
                    { label: '编号', prop: 'deviceNumber' },
                    { label: '用印部门', prop: 'draftDepartment' }
                  ]
                }
            }
        }
    },
    mounted(){
        this.form.type = 'HTML'
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
        reset(formName){
            this.form.draftOrgan = ''
            this.form.draftOrganId = ''
            this.form.deviceNumber = ''
            this.form.startDate = ''
            this.form.endDate = ''
            this.tableData = []
            this.form.type = 'HTML'
        },
        loadData(){
            this.tableData = [];
            let params = {
              processType: this.processType,
              draftOrganId:this.form.draftOrganId,
              startDate: this.form.startDate,
              deviceNumber:this.form.deviceNumber,
              endDate: this.form.endDate
            };
            this.$api.managementDetail.maintainDetailList(params,{
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize,
            }).then(res => {
                this.pagination.total = res.total;
                this.tableData = res.list;
            });
        },
        cellClick(row){
           console.log(row, '列表点击的数据')
            this.clickId = row.id
            this.$router.push({
                path: "/sealManage/facilityManage/approval",
                query: { id: this.clickId }
            });
        },
        
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
p{border:1px solid;}
</style>