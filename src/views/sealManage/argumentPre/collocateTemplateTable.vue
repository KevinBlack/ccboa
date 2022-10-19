<template>
  <div class="check">
    <div style="margin: 15px 0;">
      <el-row>
        <el-col :span="8">
          <select-org-or-dept @select="selectOrg" class="el-cs" :orgOrDept="orgOrDeptJg" :orgOrDeptId="orgOrDeptIdJg" :disabled="addDis">
            <el-input type="text" readonly="readonly" v-model="searchData.parentUnitNm" suffix-icon="el-icon-arrow-down" :disabled="addDis"/>
          </select-org-or-dept>
        </el-col>
        <el-col :span="8">
          <!-- <el-button type="primary" style="margin-left:20px;" @click="query">查询</el-button> -->
          <!-- <el-button type="primary" style="margin-left:20px;" @click="rest">重置</el-button> -->
          <el-button type="primary" style="margin-left:20px;" @click="add_btn">新建</el-button>
          <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <m-table @refresh="loadData" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true" :searchData="searchData"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from 'components/select/selectOrgOrDept'
import mTable from '@/components/table/tTable'
export default {
  name: 'csMaintain',
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      addDis: false,
      orgOrDeptJg: 1,
      orgOrDeptIdJg: '1',
      orgOrDept: 0,
      res: {},
      searchData: {
        unitId: '', //unitId
        unitNm: '', //部门名称
        parentUnitNm: JSON.parse(localStorage.getItem('userInfo')).unitName, //机构名称
        parentUnitId: JSON.parse(localStorage.getItem('userInfo')).unitId, //机构id
      },
      tableData: [
        // {tpyeNo:'1',parentUnitNm:'jigou',jbNm:'mingcheng'},
      ],
      tableCols: [
        { label: '序号', prop: 'xuhao' },
        { label: '文件字头', prop: 'header' },
        { label: '字号种类', prop: 'numberType' },
      ],
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 10, //每页条数
      },

      value1: '',
      deleteArry: '',
    }
  },
  computed: {},
  methods: {
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem('tcHumanRole'))
      this.draforgnmPeople = manger.filter((item) => {
        return (
          item.codeType === 'manager_type' &&
          (item.dicCode === 'sys_manager' || item.dicCode === 'busi_manager')
        )
      })
      this.searchData.parentUnitNm = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.searchData.parentUnitId = JSON.parse(localStorage.getItem('userInfo')).unitId
      if (this.draforgnmPeople.length !== 0) {
        this.addDis = false
        this.identity = true
      } else {
        this.addDis = true
        this.identity = false
      }
    },
    // 查询
    query() {
      this.loadData()
    },
    rest() {
      ;(this.searchData.parentUnitNm = JSON.parse(localStorage.getItem('userInfo')).unitName), //机构名称
        (this.searchData.parentUnitId = JSON.parse(localStorage.getItem('userInfo')).unitId)
      this.searchData.unitId = ''
      this.searchData.unitNm = ''
      this.loadData()
    },
    selectOrg(org) {
      console.log('选择机构')
      this.searchData.parentUnitNm = org.unitName
      this.searchData.parentUnitId = org.id
      this.loadOrg()
    },
    loadOrg(){
      this.searchData.parentUnitId = this.searchData.parentUnitId
      this.loadData()
    },
    selectDept(dept) {
      this.searchData.unitNm = dept.unitName
      this.searchData.unitId = dept.id
    },
    loadData() {
      this.$api.pubInfo
        .collocateTemplateTable({organId: this.searchData.parentUnitId}, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          for (const i in res.data) {
            res.data[i].upTime = this.transitionDate(res.data[i].upTime)
          }
          this.pagination.total = res.total
          this.tableData = res.list
        })
    },
    cellClick(row) {
      this.$router.push({
        path: '/sealManage/argumentPre/collocateTemplate',
        query: { id: row.id, organId: row.organId},
      })
    },
    // 转换日期
    transitionDate(dataString) {
      if (dataString) {
        let date = new Date(dataString)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      } else {
        return ''
      }
    },
    add_btn() {
      // let row = {}
      // row.type = 0

      this.$router.push({
        path: '/sealManage/argumentPre/collocateTemplate',
        query: { parentUnitId: this.searchData.parentUnitId, parentUnitNm: this.searchData.parentUnitNm},
      })
    },
    select(row) {
      let dataArry = []
      row &&
        row.map((item) => {
          dataArry.push(item.id)
        })
      this.deleteArry = dataArry
      this.deleteArry = dataArry.join(",")
      console.log(this.deleteArry)
    },
    //
    delete_btn() {
      if(this.deleteArry == ''){
        this.$message({
          message: '请选择要删除的模板',
          type: 'error',
        })
        return
      }
      this.$api.pubInfo.deleteMB({ ids: this.deleteArry }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
        }
        this.loadData()
      }).catch((e)=>{
        console.log(e)
      })
    },
  },
  created() {
    this.addDrafOrgNm()
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.check {
  min-height: calc(100vh - 180px);
}
.el-cs /deep/ .el-scrollbar {
  height: calc(100% - 30px) !important;
}
</style>


