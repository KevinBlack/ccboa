'
' @Author: your name
' @Date: 2020-12-22 10:58:28
' @LastEditTime: 2020-12-23 16:39:09
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
                        <el-form-item label="到岗开始时间" v-if=!isNeedInput>
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.daoGangStartDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="到岗结束时间" v-if=!isNeedInput>
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.daoGangEndDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="离岗开始时间" v-if=isNeedInput>
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.liGangStartDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="离岗结束时间" v-if=isNeedInput>
                            <el-date-picker :style="{width: '200px'}" type="date" v-model="form.liGangEndDate" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="姓名">
                                <el-input
                                :style="{width: '200px'}"
                                type="text"
                                v-model="form.chineseNodeUser"
                                />
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' @click='query'>查询</el-button>
                            <el-button @click='reset'>重置</el-button>
                        </el-form-item>
                    </el-form>
            <el-tabs v-model="activeTab">
                <el-tab-pane label="在职" name="transfer"></el-tab-pane>
                 <el-tab-pane label="非在职" name="done"></el-tab-pane>
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
                daoGangStartDate: '',
                daoGangEndDate: '',
                type: ''
            },
            // 机构ID
            unitCode:'',
            tableData: [
            ],
            // 0离职 1在职
            bgrStatus:1,
            // 是否需要输入框
            isNeedInput:false,
            // 列表默认加载页签
            activeTab:'transfer',
            tableCols: [
                { label: '部门名称', prop: 'draftDepartment' },
                { label: '姓名', prop: 'draftUser' },
                { label: '联系方式', prop: 'lianXiFsh' },
                { label: '到岗日期', prop: 'daogangDate' }
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
                    this.bgrStatus = 1
                    this.isNeedInput = false
                    this.tableCols = [
                    { label: '部门名称', prop: 'draftDepartment' },
                    { label: '姓名', prop: 'draftUser' },
                    { label: '联系方式', prop: 'lianXiFsh' },
                    { label: '到岗日期', prop: 'daogangDate' }
                  ]
                } else {
                    this.bgrStatus = 0
                    this.isNeedInput = true
                    this.tableCols = [
                    { label: '部门名称', prop: 'draftDepartment' },
                    { label: '姓名', prop: 'draftUser' },
                    { label: '联系方式', prop: 'lianXiFsh' },
                    { label: '到岗日期', prop: 'daogangDate' },
                    { label: '离岗日期', prop: 'ligangDate' }
                  ]
                }
                this.loadData()
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
            this.form.statisticalDepartment = ''
            this.form.statisticalProperty = ''
            this.form.statisticalUnitsType = ''
            this.form.daoGangStartDate = ''
            this.form.daoGangEndDate = ''
            this.tableData = []
        },
        loadData(){
            this.tableData = [];
            let params = {
              bgrStatus: this.bgrStatus,
              draftOrganId:this.form.draftOrganId,
              daoGangStartDate: this.form.daoGangStartDate,
              daoGangEndDate: this.form.daoGangEndDate,
              liGangStartDate: this.form.liGangStartDate,
              liGangEndDate: this.form.liGangEndDate,
              chineseNodeUser:this.form.chineseNodeUser

            };
            this.$api.managementDetail.preserverDetailList(params,{
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize,
            }).then(res => {
                this.pagination.total = res.total;
                this.tableData = res.list;
            });
        },
        cellClick(row){
        let path = "/sealManage/keeperRegister/keeperRegisterForm"
        // 不允许打开同一页面
        this.handleOpenPage(path, row.id)
        //    this.$intent.goNewPage(this, {
        //    path: "/sealManage/keeperRegister/keeperRegisterForm",
        //    query: { id: row.id },
        //   });
        },
       handleOpenPage(path, id, readType, flag,draftOrganId) {
       let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
       if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      } 
      const routeData = this.$router.resolve({
        path: path,
        query: {id:id}
      });
      window.open(routeData.href, "_blank");
      
    },
        
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
p{border:1px solid;}
</style>