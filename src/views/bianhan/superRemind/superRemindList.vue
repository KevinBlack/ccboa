<template>
  <div style="height: calc(100vh - 165px);">
    <el-form label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构名称">
            <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'1'" style="width:100%;">
              <el-input type="text" readonly="readonly" placeholder="请选择" v-model="currentSelectSearchdata" suffix-icon="el-icon-arrow-down" />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" v-show="submitShow" style="margin-left:20px" @click="submit()">新建</el-button>
            <!-- <el-button @click="reset()">重置</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- <el-button type="danger" @click="deleteForms" style="float: right;margin-top: -54px; margin-right: 20px;
    position: relative;
    z-index: 2;">删除</el-button> -->

    <m-table @refresh="loadData()" @cellClick="jumpdeal" :isSelection="true" @select="select" size="medium" :isPagination="true" :isHandle="false" :searchData="searchData" :tableData="tableData" :tableCols="tableCols" :pagination="pagination"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
import beanList from '../../../util/beanList'
import selectOrgOrDept from 'components/select/selectOrgOrDept'
import bianhanPublic from '@/minixs/bianhan' //便函公共方法

export default {
  name: 'settingTable',
  components: {
    mTable,
    selectOrgOrDept,
  },
  mixins: [bianhanPublic],
  data() {
    return {
      submitShow: false,
      currentSelectSearchdata: JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
      searchData: {
        // unitName: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        unitId: JSON.parse(localStorage.getItem('userInfo')).unitId,
        searchDataUnitName: JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
      },
      tableData: [],
      tableCols: [
        { label: '机构名称', prop: 'unitName' },
        { label: '是否启用', prop: 'reminderType' },
        { label: '提醒对象', prop: 'reminderMethod' },
        { label: '提醒天数', prop: 'lengthOfStay' },
        { label: '首页待办提醒标题设置', prop: 'title' },
      ],
      pagination: {
        pageNum: 1,
        total: 20,
      },
      selectIds: [], //已选择的数据id
    }
  },
  methods: {
    deleteForms() {
      if (this.selectIds == 0) {
        this.$message({
          message: '请选择要删除的数据！',
          type: 'error',
        })
        return
      }
      this.$confirm('将彻底删除该数据，且无法恢复，是否确认继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        //to set delete function...
      })
    },
    //选择数据
    select(row) {
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.id)
      })
      this.selectIds = dataArry
    },
    submit() {
      // this.loadData()
      this.$router.push({
        name: 'bianhanSuperRemind',
        query: {
          searchDataUnitId: this.searchData.unitId,
          searchDataUnitName: this.searchData.searchDataUnitName,
        },
      })
    },
    // reset() {
    //   this.searchData = { unitId: JSON.parse(localStorage.getItem('userInfo')).unitId }
    //   this.currentSelectSearchdata = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // },
    selectOrg(org) {
      this.currentSelectSearchdata = org.unitName
      this.searchData.searchDataUnitName = org.unitName
      this.searchData.unitId = org.id
      this.loadData()
    },
    loadData() {
      this.$api.bianhan.backlogInquire({humanUnit: this.searchData.unitId}).then((res) => {
        this.tableData = res.data
        if (res.data.length > 0) {
          this.submitShow = false
        } else {
          this.submitShow = true
        }
        res.data.map(item => {
          if(item.reminderType == '0'){
            item.reminderType = '是'
          }else{
            item.reminderType = '否'
          }
          let num = item.reminderMethod
          let nam = num.replace(/[^0-9]/ig, "")
          if(nam == '12' || nam == '21'){
            item.reminderMethod = '当前处理人，当前处理人所在部门综合'
          }else if(nam == '1'){
            item.reminderMethod = '当前处理人'
          }else if(nam == '2'){
            item.reminderMethod = '当前处理人所在部门综合'
          }else {
            item.reminderMethod = ''
          }
        })
      })
    },
    jumpdeal(val) {
      var id = val.id
      this.$router.push({
        name: 'bianhanSuperRemind',
        query: {
          id: val.id,
          searchDataUnitId: this.searchData.unitId,
          searchDataUnitName: this.searchData.searchDataUnitName,
        },
      })
    },
  },
  created() {
    this.loadData(this.searchData.unitId)
  },
}
</script>
<style scoped lang="less">
</style>
