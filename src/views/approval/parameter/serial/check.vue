<template>
  <div class="check">
    <el-row style="margin-bottom: 10px" :gutter="20">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择"
            v-model="formData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="1">
        <span style="width:2px;height:20px;display:inline-block"></span>
      </el-col>
      <el-col :span="6">
        <el-input v-model="formData.year" placeholder="请输入年度"></el-input>
      </el-col>
      <el-button type="primary" style="margin-right:20px;margin-left:20px" @click="add_btn">新增</el-button>
      <el-button type="primary" style="margin-right:20px;margin-left:20px" @click="sear_btn">查询</el-button>
      <el-button type="danger" style="margin-right:20px;" @click="delete_btn">删除</el-button>
    </el-row>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "check",
  components: {
    mTable,
    selectOrgOrDept
  },
  props: {},
  data () {
    return {
      searchData: {
        sort:"desc",
        sortKey:"year"
      },
      tableData: [],
      tableCols: [
        { label: '管理机构', prop: 'unitLongName' },
        { label: '申请项目', prop: 'applyLongProject' },
        { label: '年度', prop: 'year' },
        { label: '流水号', prop: 'waterNo' },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize:20
      },
      options: [],
      formData: {
          orgName: JSON.parse(localStorage.getItem('userInfo')).unitName,
          unitId:JSON.parse(localStorage.getItem('userInfo')).unitId
      },
      deleteArry: '',

    }
  },
  computed: {},
  methods: {
    sear_btn () {
      this.loadData()
    },
    selectOrg (org) {
      this.formData.orgName = org.unitName;
      this.formData.unitId = org.id;
      this.loadData()
    },
    loadData () {
      this.$api.argumentPre.streamTable(
        {
          ...this.searchData,
          ...this.formData
        },
        {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE:this.pagination.pageSize,
        }
      ).then(res => {
        this.pagination.total = res.total
        this.tableData = res.data
      })
    },
    cellClick (row) {
      let rowData = JSON.stringify(row)
      this.$router.push({
        path: '/approval/parameter/serial/save',
        query: { data: rowData, type: 'check' }
      })
    },
    add_btn () {
      this.$intent.go(this, {
        path: '/approval/parameter/serial/save',
        query: { data: '', type: 'edit' }
      })
    },
    delete_btn () {
      if (this.deleteArry) {
        this.$confirm("是否确定删除当前选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.argumentPre.deleteStream(
              { id: this.deleteArry }
            ).then(res => {
              if (res.code == "SUCCESS") {
                this.deleteArry = ''
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
              this.loadData()
            })
          })
          .catch(() => { });

      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据'
        })
      }

    },
    select (row) {
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.id)
      })
      this.deleteArry = dataArry.join(",")
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .check{
    min-height: 90vh;
  }
</style>

