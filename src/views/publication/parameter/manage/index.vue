
<!--
 * @Author: your name
 * @Date: 2020-10-08 15:31:50
 * @LastEditTime: 2021-03-22 16:10:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\editJournal\browsing\laigao.vue
--> 

<template>
  <div class="check">
    <el-row style="margin-bottom: 10px">
      <el-col :span="6">
        <select-org-or-dept class="el-cs" @select="selectOrg" :disabled="addDis" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" >
          <el-input :disabled="addDis" type="text" readonly="readonly" v-model="searchDataInfo" suffix-icon="el-icon-arrow-down" />
        </select-org-or-dept>
      </el-col>
      <el-button type="primary" style="margin-left:20px;" @click="create_btn">新建</el-button>
      <el-button type="primary" style="margin-left:20px;" @click="sx_btn">刷新</el-button>
      <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </el-row>
    <m-table @select="select" :searchData="searchData" @refresh="loadData" :isSelection="true" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" @cellClick="cellClick"></m-table>
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
      searchData: {},
      searchDataInfo: '',
      searchDataInfoId: '',
      tableData: [],
      tableCols: [
        { label: '刊物名称', prop: 'pubNm' },
        { label: '管理机构', prop: 'drafOrgNm' },
        { label: '拟投稿栏目', prop: 'pubColumnNm' },
        { label: '是否适用下级机构', prop: 'pubTyp' },
        { label: '刊物编辑人', prop: 'pubEditUnm' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      value1: '',
      value: '',
      deleteArry: '',
      pubMgIdArr: '', //删除数据集合
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
    }
  },
  methods: {
    // 选择机构
    selectOrg(org) {
      this.searchDataInfo = org.unitName
      this.searchDataInfoId = org.id
      this.loadData()
    },
    // 新建
    create_btn() {
      this.$router.push({
        path: '/publication/parameter/manage',
        query: {},
      })
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem('tcHumanRole'))
      this.draforgnmPeople = manger.filter((item) => {
        return item.codeType === 'manager_type' && (item.dicCode === 'sys_manager' || item.dicCode === 'busi_manager' )
      })
      this.searchDataInfo = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.searchDataInfoId = JSON.parse(localStorage.getItem('userInfo')).unitId
      if (this.draforgnmPeople.length !== 0) {
        this.addDis = false
        this.identity = true
      } else {
        this.addDis = true
        this.identity = false
      }
    },
    loadDataBegin() {
      this.addDrafOrgNm()
      this.loadData()
    },
    // 获取刊物管理列表init
    loadData() {
      /**
       * 判断登陆人
       * 1.是否业务管理员或系统管理员
       * 2.是否是是对应刊物的编辑人员或高级编辑人员
       */

      if (this.searchData.sortKey === 'pubColumnNm' || this.searchData.sortKey === 'pubEditUnm') {
        this.searchData = {}
      }
      this.$api.paraMeter
        .PublicationManagementlist(
          {
            searchType: 'MinePaging',
            creatOrgId: this.searchDataInfoId,
            ...this.searchData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data

          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].pubTyp === '01') {
              this.tableData[i].pubTyp = '否'
            } else if (this.tableData[i].pubTyp === '02') {
              this.tableData[i].pubTyp = '是'
            }
          }
        })
    },
    cellClick(row) {
      this.$router.push({
        path: '/publication/parameter/manage',
        query: {
          type: 'detail',
          cli: row.pubMgId,
        },
      })
    },
    select(rows) {
      let checkArr = []
      rows.forEach((item) => {
        checkArr.push(item.pubMgId)
      })
      this.pubMgIdArr = checkArr
    },
    sx_btn() {
      this.loadDataBegin()
    },
    // 删除
    delete_btn() {
      if (this.pubMgIdArr) {
        this.$confirm('是否确定删除当前选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$api.paraMeter
            .PublicationManagementDel({ pubMgIdArr: this.pubMgIdArr })
            .then((res) => {
              if (res.code == 'SUCCESS') {
                this.deleteArry = ''
                this.$message({
                  message: '删除成功',
                  type: 'success',
                })
              }
              this.loadDataBegin()
            })
        })
      } else {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据',
        })
      }
    },
  },
  created() {
    this.loadDataBegin()
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




