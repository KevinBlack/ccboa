<!--
 * @Author: your name
 * @Date: 2020-10-08 15:31:50
 * @LastEditTime: 2021-03-22 13:44:13
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
      <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </el-row>
    <m-table @refresh="loadData()" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true" :searchData="searchData"></m-table>
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
      orgOrDept: 1,
      orgOrDeptId: '1',
      addDis: false,
      identity: Boolean,
      searchData: {},
      searchDataInfo: '',
      searchDataInfoId: '',
      tableData: [],
      tableCols: [{ label: '评审意见', prop: 'opinionContext' }],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      value1: '',
      value: '',
      deleteArry: '',
      opinionIdArr: [],
      creatOrgId: '',
    }
  },
  computed: {},
  created() {
    this.loadData()
  },
  methods: {
    //初始化列表
    loadData() {
      this.addDrafOrgNm()
      this.$api.paraMeter
        .pinshenyjlist(
          { creatOrgId: this.creatOrgId, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    // 进入详情
    cellClick(row) {
      this.$router.push({
        path: '/publication/parameter/review/reviewIdea',
        query: {
          queryItem: 'cellClick',
          row1: row.opinionId,
          creatOrgId: this.creatOrgId,
          creatOrgName: this.searchDataInfo,
        },
      })
    },
    // 新建
    create_btn() {
      this.$router.push({
        path: '/publication/parameter/review/reviewIdea',
        params: {},
        query: {
          queryItem: 'new',
          creatOrgId: this.creatOrgId,
          creatOrgName: this.searchDataInfo,
        },
      })
    },
    //删除
    delete_btn() {
      if (this.opinionIdArr.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!',
        })
        return
      }
      this.$confirm('确认删除评审意见?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.paraMeter.pinshenyjDel({ opinionIdArr: this.opinionIdArr }).then((res) => {
            if (res.code == 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
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
    // 选择机构
    selectOrg(org) {
      this.searchDataInfo = org.unitName
      this.creatOrgId = org.id
      this.$api.paraMeter
        .pinshenyjlist(
          { creatOrgId: this.creatOrgId },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
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
        this.identity = true
      } else {
        this.addDis = true
        this.identity = false
      }
      this.searchDataInfo = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.creatOrgId = JSON.parse(localStorage.getItem('userInfo')).unitId
    },
    select(row) {
      let arrs = []
      row.map((item) => {
        arrs.push(item.opinionId)
      })
      this.opinionIdArr = arrs
    },
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




