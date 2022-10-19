<template>
  <div class="check">
    <div style="margin: 15px 0;">
      <el-row>
        <!-- <el-col :span="8">
     <el-select v-model="value" placeholder="总行" style="width:90%">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
     </el-select> 
        </el-col>-->
        <el-col :span="8">
          <select-org-or-dept class="el-cs" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @select="selectOrg" style="width:90%">
            <el-input type="text" readonly="readonly" v-model="formData.unitNm" suffix-icon="el-icon-arrow-down" />
          </select-org-or-dept>
        </el-col>
        <el-col :span="8">
          <div class="block">

            <el-date-picker v-model="searchData.year" type="year" format="yyyy" value-format="yyyy" @change="Yearjt"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
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
  name: 'jbcsMaintain',
  components: {
    selectOrgOrDept,
    mTable,
  },
  props: {},
  data() {
    return {
      orgOrDept: 1,
      orgOrDeptId: '1',
      formData: {
        unitNm: JSON.parse(localStorage.getItem('userInfo')).unitName,
      },

      value: '',

      res: {},
      searchData: {
        unitId: JSON.parse(localStorage.getItem('userInfo')).unitId, //机构编号
        year: new Date().getFullYear().toString(), //年份
      },
      tableData: [
        // {unitNm:"1",inforNm:"jbname",year:"year",startNo:"start",curMaxNo:"biggest"},
      ],
      tableCols: [
        { label: '机构名称', prop: 'unitNm' },
        { label: '简报名称', prop: 'inforNm' },
        { label: '年度', prop: 'year' },
        { label: '起始序号', prop: 'startNo' },
        { label: '当前最大序号', prop: 'curMaxNo' },
      ],
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },

      value1: '',
      deleteArry: '',
    }
  },
  computed: {},
  methods: {
    //监听时间
    Yearjt(val) {
      this.searchData.year = val
      this.loadData()
    },
    selectOrg(org) {
      this.formData.unitNm = org.unitName
      this.searchData.unitId = org.id //选中机构id
      this.loadData()
    },
    loadData() {
      // this.formData.type = this.type
      this.$api.pubInfo
        .bhProtect(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          console.log(res)
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    cellClick(row) {
      row.type = 1
      // this.$intent.go(this,{path:"/publication/departInfo/bigMaintain/maintain"})
      this.$router.push({
        path: '/publication/departInfo/bigMaintain/jbMaintain',
        query: { rowData: row },
      })
    },
    add_btn() {
      let row = {}
      row.type = 0
      this.$router.push({
        path: '/publication/departInfo/bigMaintain/jbMaintain',
        query: { rowData: row },
      })
    },
    //选中数据
    select(row) {
      console.log('000000', row)
      let dataArry = []
      if (row) {
        row.map((item) => {
          dataArry.push(item.no)
        })
      }
      this.deleteArry = dataArry
      console.log(this.deleteArry)
    },
    //
    delete_btn(row) {
      this.$api.pubInfo.deleteBh({ noArr: this.deleteArry }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
        }
        this.loadData()
      })
    },
  },
  activated() {},
  mounted() {},
  created() {
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


