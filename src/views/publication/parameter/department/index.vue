
<!--
 * @Author: your name
 * @Date: 2020-10-08 15:31:50
 * @LastEditTime: 2021-03-22 13:44:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\editJournal\browsing\laigao.vue
--> 
<template>
  <div class="check">
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept class="el-cs" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @select="selectOrg" :disabled="addDis">
          <el-input :disabled="addDis" type="text" readonly="readonly" v-model="searchDataInfo" suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" style="margin-left:20px;" @click="create_btn">新建</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="Using">启用</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="Forbidden">禁用</el-button>
      <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </el-row>

    <m-table @select="select" @refresh="loadData" :isSelection="true" :searchData="searchData" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" @cellClick="cellClick"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import selectOrgOrDept from 'components/select/selectOrgOrDept'

export default {
  name: 'check',
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      orgOrDept:1,
      orgOrDeptId:'1',
      addDis: false, //是否可以选择机构
      searchDataInfo: '',
      deldata: [], //选中数据id
      parmList: [], //禁用用数据
      Alldata: [],
      tableData: [],
      searchData: {
        parentUnit: '',
      },
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      tableCols: [
        { label: '部门序号', prop: 'scComDepId' },
        { label: '部门名称', prop: 'unitNm' },
        { label: '统计等同名', prop: 'unionUnitNm' },
        {
          label: '类型',
          prop: 'scTypeList',
          formatter(row) {
            return (row.scTypeList = row.scType == 1 ? '系统自动' : '手动填写')
          },
        },
        {
          label: '启用',
          prop: 'isUseList',
          formatter(row) {
            return (row.isUseList = row.isUse == '1' ? '启用' : '禁用')
          },
        },
      ],
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.addDrafOrgNm()
      this.$api.paraMeter
        .MrgedDepartments(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem('tcHumanRole'))
      this.draforgnmPeople = manger.filter((item) => {
        return item.codeType === 'manager_type' && (item.dicCode === 'sys_manager' || item.dicCode === 'busi_manager' )
      })
      if (this.draforgnmPeople.length !== 0) {
        this.addDis = false
      } else {
        this.addDis = true
      }
      this.searchDataInfo = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.searchData.parentUnit = JSON.parse(localStorage.getItem('userInfo')).unitId
    },
    //禁用
    Forbidden() {
      if (this.deldata.length == 0) {
        this.$message({
          type: 'error',
          message: '请选择要禁用的数据!',
        })
        return
      }
      this.$confirm('确认禁用当前选中数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.paraMeter
            .EnableDisable({ sccomdepidArr: this.deldata, isUse: '0' })
            .then((res) => {
              if (res.code == 'SUCCESS') {
                this.deldata = []
                this.loadData()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用',
          })
        })
    },
    // 启用
    Using() {
      if (this.deldata.length == 0) {
        this.$message({
          type: 'error',
          message: '请选择要启用的数据!',
        })
        return
      }
      this.$confirm('确认启用当前选中数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.paraMeter
            .EnableDisable({ sccomdepidArr: this.deldata, isUse: '1' })
            .then((res) => {
              if (res.code == 'SUCCESS') {
                this.deldata = []
                this.loadData()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用',
          })
        })
    },
    //新建
    create_btn() {
      this.$router.push({
        path: '/publication/parameter/department/departmentManage',
        query: {
          creatOrgId: this.searchData.parentUnit,
          creatOrgNm: this.searchDataInfo,
        },
      })
    },
    // 删除
    delete_btn() {
      if (this.deldata.length == 0) {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!',
        })
        return
      }
      this.$confirm('确认删除当前选中数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.paraMeter.CategoryDelete({ sccomdepidArr: this.deldata }).then((res) => {
            if (res.code == 'SUCCESS') {
              this.$message({
                message: '删除成功',
                type: 'success',
              })
              this.deldata = []
              this.loadData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //选择机构
    selectOrg(org) {
      this.searchDataInfo = org.unitName
      this.searchData.parentUnit = org.id
      this.$api.paraMeter
        .MrgedDepartments(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    //详情跳转
    cellClick(row) {
      this.$router.push({
        path: '/publication/parameter/department/departmentManage',
        query: {
          scComDepId: row.scComDepId,
          creatOrgId: this.searchData.parentUnit,
          creatOrgNm: this.searchDataInfo,
        },
      })
    },
    // 选中数据集合
    select(row) {
      this.Alldata = row
      let arr = []
      row.map((item) => {
        arr.push(item.scComDepId)
      })
      this.deldata = arr
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/.radio-form .el-radio {
  margin: 10px;
}
.check {
  min-height: calc(100vh - 180px);
}
.el-cs /deep/ .el-scrollbar {
  height: calc(100% - 30px) !important;
}
</style>




