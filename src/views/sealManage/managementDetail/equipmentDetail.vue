'
' @Author: your name
' @Date: 2020-12-22 10:58:28
' @LastEditTime: 2020-12-23 16:38:58
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA1\src\views\sealManage\managementDetail\preserverDetail.vue
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
                        <el-form-item label="启用开始时间" >
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.startUseDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="启用结束时间" >
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.endUseDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="设备名称">
                                <el-input
                                :style="{width: '200px'}"
                                type="text"
                                v-model="form.title"
                                />
                        </el-form-item>
                        <el-form-item label="设备型号">
                                <el-input
                                :style="{width: '200px'}"
                                type="text"
                                v-model="form.deviceType"
                                />
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' @click='query'>查询</el-button>
                            <el-button @click='reset'>重置</el-button>
                        </el-form-item>
                    </el-form>
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
                startUseDate: '',
                endUseDate: '',
                type: ''
            },
            // 机构ID
            unitCode:'',
            tableData: [
            ],
            // 列表默认加载页签
            activeTab:'transfer',
            tableCols: [
                { label: '设备名称', prop: 'title' },
                { label: '设备', prop: 'deviceType' },
                { label: '使用机构', prop: 'useJg' },
                { label: '设备状态', prop: 'deviceStatus' },
                { label: '启用日期', prop: 'useDate' }
            ],
            pagination: {
                pageNum: 1,
                total: 0,
                pageSize: 10
            },
        }
    },
    watch:{},
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
        reset(formName){
            this.form.title = ''
            this.form.deviceType = ''
            this.form.draftOrgan = ''
            this.form.draftOrganId = ''
            this.form.startUseDate = ''
            this.form.endUseDate = ''
            this.tableData = []
        },
        loadData(){
            this.tableData = [];
            let params = {
              draftOrganId:this.form.draftOrganId,
              startUseDate: this.form.startUseDate,
              endUseDate: this.form.endUseDate,
              deviceType: this.form.deviceType,
              title:this.form.title

            };
            this.$api.managementDetail.equipmentDetailList(params,{
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize,
            }).then(res => {
                this.pagination.total = res.total;
                this.tableData = res.list;
            });
        },
        cellClick(row){
           this.clickId = row.id
            this.$router.push({
               path: "/sealManage/facilityManage/register",
               query: { id: this.clickId }
            });
        },
        
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
p{border:1px solid;}
</style>