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
    <m-table ref="submitDateDataTable" @refresh="loadData" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData" :tableCols="tableCols" :isSelection='true' :searchData="searchData"></m-table>
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
  props: {},
  mounted() {
    this.loadData()
  },
  data() {
    return {
      searchData: {},
      tableData: [],
      tableCols: [
        { label: '截止时间', prop: 'blockingTime' },
        { label: '超时提示内容', prop: 'timeOverAlertInfo' },
      ],
      deleteArry: '',
    }
  },
  computed: {},
  methods: {
    selectOrg(org) {
      this.searchData.draftOrgan = org.unitName
      this.searchData.draftOrganId = org.id
      this.loadData()
    },
    /** @description: 获取表格数据方法 */
    loadData(isRefresh, pagination) {
      this.commonLoadListData(this.$refs.submitDateDataTable,pagination, this.searchData, null, this.$api.duty.getSubmitDateTableList, res => {            
        this.tableData = res.list;
      })
    },
    /** @description: 换行事件 */
    cellClick(row) {
      let rowData = JSON.stringify(row)
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/submitDate/add',
        query: { data: rowData, type: 'save' },
      })
    },
    /** @description: 勾选行 */
    select(row) {
      this.deleteArry = row && row.map(item => item.id).join(',');
    },
    /** @description: 新增按钮 */
    add_btn() {
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/submitDate/add',
        query: { data: '', type: 'edit' },
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
          this.$api.duty.deleteSubmitDate({ ids: this.deleteArry }).then((res) => {
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
}
</script>
