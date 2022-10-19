'
' @Author: your name
' @Date: 2020-12-12 10:54:37
' @LastEditTime: 2020-12-25 16:22:34
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
                        <el-form-item label="统计类型">
                            <el-select :style="{width: '200px'}" v-model="form.statisticalType">
                                 <el-option label="按用印部门统计" value="按用印部门统计"></el-option>
                                 <el-option label="按印章类别统计" value="按印章类别统计"></el-option>
                                 <el-option label="按用印性质统计" value="按用印性质统计"></el-option>
                                 <el-option label="按用印发往单位类型统计统计" value="按用印发往单位类型统计统计"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="按用印部门统计"  v-if="isNeedStatisticalDepartment">
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
                        <el-form-item label="按印章类别统计" v-if="inNeedStatisticalSealType">
                            <el-select :style="{width: '200px'}" v-model="form.statisticalSealType">
                                 <el-option
                                    v-for="item in statisticalSealTypeOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="按用印性质统计" v-if="inNeedStatisticalProperty">
                            <el-select :style="{width: '200px'}" v-model="form.statisticalProperty">
                                 <el-option
                                    v-for="item in statisticalPropertyOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="按用发往单位类型统计统计" v-if="isNeedStatisticalUnitsType">
                            <el-select :style="{width: '200px'}" v-model="form.statisticalUnitsType">
                                 <el-option label="系统内" value="0"></el-option>
                                 <el-option label="系统外" value="1"></el-option>
                            </el-select>
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
                     {{form.statisticalType? form.statisticalType+'表' :'统计类型'}}
                    </p>
                    <p style = "text-align:center;">
                       统计日期{{form.startUseDate?form.startUseDate+'至':''}}{{form.endUseDate}}
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
    name:"normalStatistical",
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
            // 是否展示按用印部门统计下拉框
            isNeedStatisticalDepartment:false,
            // 是否展示按印章类别统计下拉框
            inNeedStatisticalSealType:false,
            // 是否展示按用印性质统计下拉框
            inNeedStatisticalProperty:false,
            // 是否展示按用发往单位类型统计统计下拉框w
            isNeedStatisticalUnitsType:false,
            // 存放印章类型数据
            statisticalSealTypeOption:[],
            // 存放用印性质数据
            statisticalPropertyOption:[],
            // 机构ID
            unitCode:'',
            tableData: [
            ],
            tableCols: [
                { label: '用印部门', prop: 'name' },
                { label: '本级行申请单个数', prop: 'draftOrgan' },
                { label: '本级行用印数量', prop: 'time' },
                { label: '下级行申请单个数', prop: 'num' },
                { label: '下级行用印数量', prop: 'num' }
            ],
            pagination: {
                pageNum: 1,
                total: 0,
                pageSize: 10
            },
        }
    },
    watch:{
        "form.statisticalType":{
            handler(val){
                this.isNeedStatisticalDepartment = val === '按用印部门统计'
                this.inNeedStatisticalSealType = val === '按印章类别统计'
                this.inNeedStatisticalProperty = val === '按用印性质统计'
                this.isNeedStatisticalUnitsType = val === '按用印发往单位类型统计统计'
                this.tableCols = []
                this.tableData = []
                switch(val){
                    case '按用印部门统计':
                    this.tableCols = [
                        { label: '序号', prop: 'indexNum' },
                        { label: '用印部门', prop: 'draftDepartment' },
                        { label: '本级行申请单个数', prop: 'markNumCount' },
                        { label: '本级行用印数量', prop: 'draftNumCount' },
                        { label: '下级行申请单个数', prop: 'num' },
                        { label: '下级行用印数量', prop: 'num' }
                    ]
                    
                    break;
                    case '按印章类别统计':
                    this.tableCols = [
                        { label: '序号', prop: 'indexNum' },
                        { label: '印章类别', prop: 'sealTypeName' },
                        { label: '用印数量', prop: 'markNumCount' }
                    ]
                    break;
                    case '按用印性质统计':
                    this.tableCols = [
                        { label: '序号', prop: 'indexNum' },
                        { label: '用印性质', prop: 'yyXz' },
                        { label: '数量', prop: 'draftNumCount' }
                    ]
                    break;
                    case '按用印发往单位类型统计统计':
                    this.tableCols = [
                        { label: '序号', prop: 'indexNum' },
                        { label: '发往单位类型', prop: 'sendType' },
                        { label: '数量', prop: 'draftNumCount' }
                    ]
                    break;
                }
            }
        },
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
         this.$api.sealManage.userConTable(
                    {scUnitId: this.form.draftOrganId},
                    {
                        PAGE_JUMP: this.pagination.pageNum,
                        REC_IN_PAGE: 10
                    }
                ).then(res => {
                    const arraysData = res.list[0]　&& res.list[0].markName
                    const arraysData1 = res.list[0] && res.list[0].scFiletypeHw
                    const statisticalSealTypeOption =  arraysData && arraysData.split(',')
                    const statisticalPropertyOption =  arraysData &&　arraysData1.split(',')
                    if(statisticalSealTypeOption){
                        this.statisticalSealTypeOption =  statisticalSealTypeOption.map(item=>{
                                                const transt = {}
                                                transt.value = item
                                                transt.label = item
                                                return transt
                                            })
                    } else if(statisticalPropertyOption){
                        this.statisticalPropertyOption =  statisticalPropertyOption.map(item=>{
                                                const transt = {}
                                                transt.value = item
                                                transt.label = item
                                                return transt
                                            })
                    } else {
                        this.form.statisticalSealType = ''
                        this.form.statisticalProperty = ''
                        this.statisticalSealTypeOption = []
                        this.statisticalPropertyOption = []
                    }
                })
        },
        // 选部门
        selectOrg1(org){
         console.log(org)
         this.$set(this.form, "statisticalDepartment", org.unitName)
         this.form.statisticalDepartmentId = org.id
        },
        // 开始统计按钮点击事件
        query(){
            // if(!this.form.type) return this.$message.warning("请选择导出类型 ")
            if(this.form && this.form.type === 'HTML' || this.form && this.form.type === ''){
                if(this.form && this.form.statisticalType === "按用印部门统计"){
                  this.$api.sealStatistical.statisticalDepartment({
                      draftOrganId:this.form.draftOrganId,
                      draftOrgan:this.form.draftOrgan,
                      draftDepartmentId:this.form.statisticalDepartmentId ,
                      draftDepartment:this.form.statisticalDepartment,
                      startUseDate:this.form.startUseDate,
                      endUseDate:this.form.endUseDate,
                      AAA:''
                  }).then(res => {
                      res.list.forEach((item,index)=>{
                          res.list[index].indexNum = index + 1
                      })
                      this.tableData = res.list
                      console.log("打印这个数据",res)
                })
                } else if (this.form && this.form.statisticalType === "按印章类别统计"){
                  this.$api.sealStatistical.statisticalSealType({
                      draftOrganId:this.form.draftOrganId,
                      draftOrgan:this.form.draftOrgan,
                      yyType:this.form.statisticalSealType,
                      startUseDate:this.form.startUseDate,
                      endUseDate:this.form.endUseDate
                  }).then(res => {
                      
                      res.list.forEach((item,index)=>{
                          res.list[index].indexNum = index + 1
                      })
                      this.tableData = res.list
                      console.log("打印这个数据",res)
                })
                }else if(this.form && this.form.statisticalType === "按用印性质统计"){
                  this.$api.sealStatistical.statisticalProperty({
                      draftOrganId:this.form.draftOrganId,
                      draftOrgan:this.form.draftOrgan,
                      startUseDate:this.form.startUseDate,
                      yyXz:this.form.statisticalProperty,
                      endUseDate:this.form.endUseDate
                  }).then(res => {
                      res.list.forEach((item,index)=>{
                          res.list[index].indexNum = index + 1
                      })
                      this.tableData = res.list
                      console.log("打印这个数据",res)
                })
                } else if(this.form && this.form.statisticalType === "按用印发往单位类型统计统计") {
                  this.$api.sealStatistical.statisticalUnitsType({
                      draftOrganId:this.form.draftOrganId,
                      draftOrgan:this.form.draftOrgan,
                      startUseDate:this.form.startUseDate,
                      endUseDate:this.form.endUseDate,
                      sendType:this.form.statisticalUnitsType
                  }).then(res => {
                      for(const i in res && res.list){
                          if(res.list[i].sendType === '0'){
                              res.list[i].sendType = '系统内'
                          } else if(res.list[i].sendType === '1') {
                              res.list[i].sendType = '系统外'
                          }
                          res.list.forEach((item,index)=>{
                              res.list[index].indexNum = index + 1
                      })
                      }
                      this.tableData = res.list
                      console.log("打印这个数据",res)
                })
                } else {
                    this.$message.warning("请选择统计类型")
                }
            } else {
               exportTable.exportExcel('用印查询信息')
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