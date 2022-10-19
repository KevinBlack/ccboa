introductionDepart'
' @Author: your name
' @Date: 2020-12-21 14:03:16
' @LastEditTime: 2020-12-22 14:05:22
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA1\src\views\sealManage\statistical\introductionStatistical.vue
'
'
' @Author: your name
' @Date: 2020-12-12 10:54:37
' @LastEditTime: 2020-12-21 11:34:33
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA1\src\views\sealManage\facilityManage\statistical.vue
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
                        <el-form-item label="申请部门"  >
                            <select-org-or-dept  @select="selectOrg1" :orgOrDept="0" :orgOrDeptId="unitCode" >
                                <el-input
                                type="text"
                                readonly
                                placeholder="部门名称"
                                v-model="form.statisticalDepartment"
                                suffix-icon="el-icon-arrow-down"
                                />
                            </select-org-or-dept>
                        </el-form-item>
                        <el-form-item label="用印开始时间">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.startUseDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="用印结束时间">
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.endUseDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="导出类型">
                            <el-radio-group v-model="form.type">
                                <el-radio label="HTML"></el-radio>
                                <el-radio label="Excel"></el-radio>
                              </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' @click='query'>开始统计</el-button>
                            <el-button @click='reset'>重置</el-button>
                        </el-form-item>
                    </el-form>
                    <p style = "text-align:center; border-bottom:none">
                     按申请部门统计表
                    </p>
                    <p style = "text-align:center;">
                       统计日期:{{form.startUseDate?form.startUseDate+'至':''}}{{form.endUseDate}}
                    </p>
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
            // 是否展示按印章类别统计下拉框
            inNeedStatisticalSealType:false,
            // 是否展示按用印性质统计下拉框
            inNeedStatisticalProperty:false,
            // 是否展示按用发往单位类型统计统计下拉框w
            isNeedStatisticalUnitsType:false,
            // 机构ID
            unitCode:'',
            tableData: [
            ],
            tableCols: [
                { label: '申请部门', prop: 'draftDepartment' },
                { label: '介绍信数量（系统内+系统外）', prop: 'draftNumCount' },
                { label: '用印数量（系统外）', prop: 'markNumCount' }
            ],
            pagination: {
                pageNum: 1,
                total: 0,
                pageSize: 10
            },
        }
    },
    watch:{
    },
    mounted(){
        this.form.type = 'HTML'
    },
    methods: {
        // 选机构
       selectOrg (org) {
         console.log(org)
         this.$set(this.form, "draftOrgan", org.unitName)
         this.$set(this.form, "statisticalDepartment", '')
         this.$set(this.form, "statisticalDepartmentId", '')
         this.form.draftOrganId = org.id
         this.unitCode = org.id
        },
        // 选部门
        selectOrg1(org){
         console.log(org)
         this.$set(this.form, "statisticalDepartment", org.unitName)
         this.form.statisticalDepartmentId = org.id
        },
        // 开始统计按钮点击事件
        query(){
            if(this.form && this.form.type === 'HTML' || this.form && this.form.type === ''){
                  this.$api.sealStatistical.statisticalIntroduction({
                      draftOrganId:this.form.draftOrganId,
                      draftOrgan:this.form.draftOrgan,
                      draftDepartmentId:this.form.statisticalDepartmentId ,
                      draftDepartment:this.form.statisticalDepartment,
                      startUseDate:this.form.startUseDate,
                      endUseDate:this.form.endUseDate,
                      AAA:''
                  }).then(res => {
                      // res.list.forEach((item,index)=>{
                        //  res.list[index].indexNum = index + 1
                     // })
                      this.tableData = res.list
                      console.log("打印这个数据",res)
                })
            } else {
               exportTable.exportExcel('按申请部门统计表')
            }
        },
        // 重置按钮
        reset(formName){
            this.form.statisticalType = ''
            this.form.statisticalDepartment = ''
            this.form.statisticalProperty = ''
            this.form.statisticalUnitsType = ''
            this.form.draftOrgan = ''
            this.form.startUseDate = ''
            this.form.endUseDate = ''
            this.tableData = []
            this.form.type = 'HTML'
        },
        loadData(){
            
        },
        cellClick(row){

        },
        
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
p{border:1px solid;}
</style>