<template>
  <div class="submitDate">
    <div style="margin: 20px 0">
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-col :span="6">
          <select-org-or-dept :orgOrDeptId="'0'" @select="selectOrg">
            <el-input type="text" readonly="readonly" placeholder="请选择" v-model="searchData.draftOrgan" suffix-icon="el-icon-arrow-down" />
          </select-org-or-dept>
        </el-col>
        <el-button type="primary" style="margin-right:20px;margin-left:20px;" @click="add_btn">新增</el-button>
        <el-button type="danger" style="margin-right:20px;" @click="delete_btn">删除</el-button>
      </el-row>
    </div>
    <m-table ref="reportEditDataTable"
     @refresh="loadData"
      @cellClick="cellClick"
       @select="select"
        size="medium"
        :isIndex="true"
         :tableData="tableData"
          :tableCols="tableCols"
           :isSelection='true'
            :searchData="searchData"
            :pagination="pagination" 
            ></m-table>
  </div>
</template>

<script>
import mTable from '@/components/table/tTable'
import selectOrgOrDept from 'components/select/selectOrgOrDept'

export default {
  name: 'submitDate',
  components: {
    mTable,
    selectOrgOrDept,
  },
  data() {
    return {
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      searchData: {},
      tableData: [],
      tableCols: [
        { label: '主管单位', prop: 'draftOrgan' },
        { label: '编辑人员', prop: 'editPerson' },
      ],
      deleteArry: '',
    }
  },
  methods: {
    /** @description: 机构查询框 */
    selectOrg(org) {
      this.searchData.draftOrgan = org.unitName
      this.searchData.draftOrganId = org.id
      this.pagination = {
        pageNum: 1,
        pageSize: 20,
      }
      this.loadData()
    },
    /** @description: 获取表格数据 */
    loadData(isRefresh, pagination) {
      this.commonLoadListData(this.$refs.publicationDataListTable,pagination, {
          ...(this.searchData || {})
      }, null, this.$api.duty.getReportEditTableList, res => {            
        this.tableData = res.list;
        this.pagination.total = res.total
      })
    },
    /** @description: 当前行换行事件 */
    cellClick(row) {
      let rowData = JSON.stringify(row)
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/reportEdit/add',
        query: { data: rowData, tabsType: 'save' },
      })
    },
    /** @description: 勾选的当前行 */
    select(row) {
      this.deleteArry = row && row.map(item => item.id).join(',');
    },
    /** @description: 新增按钮 */
    add_btn() {
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/reportEdit/add',
        query: { data: '', tabsType: 'add' },
      })
    },
    /** @description: 删除按钮 */
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm('是否确定删除当前选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$api.duty.deleteReportEditData({ ids: this.deleteArry }).then((res) => {
            if (res.code == 'SUCCESS') {
              this.deleteArry = ''
              this.$message({
                message: '删除成功',
                type: 'success',
              })
            }
            this.loadData() /** @description: 刷新列表 */
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据',
        })
      }
    },
  },
  created() {
    this.searchData = {
      draftOrgan:JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
      draftOrganId:JSON.parse(localStorage.getItem('userInfo')).unitId,
      orgName: this.currentUserInfo.unitName,
      unitCode: this.currentUserInfo.unitId,
      unitClass: 1,
    }
  },
  mounted() {    
    this.loadData()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>

