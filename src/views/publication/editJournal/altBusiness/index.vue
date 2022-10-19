<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-select v-model="searchDataValue" @change="selectChange" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item.pubNm" :value="item.pubMgId">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left:20px;" size="mini" @click="upDate_btn">修改状态</el-button>
      <el-button type="danger" style="margin-left:20px;" size="mini" @click="delete_btn">删除</el-button>
    </div>
    <m-table @refresh="loadData" @cellClick="cellClick" @select="select" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true" :searchData="searchData"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import dateFormate from '@/util/filters.js'
export default {
  name: 'check',
  components: {
    mTable,
  },
  data() {
    return {
      searchDataValue: '',
      searchData: {},
      tableData: [],
      tableCols: [
        {
          label: '收稿日期',
          prop: 'tougaoTime',
          formatter(row) {
            return row.tougaoTime == '' || row.tougaoTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.tougaoTime)))
          },
        },
        {
          label: '入备选库时间',
          prop: 'beixuanTime',
          formatter(row) {
            return row.tougaoTime == '' || row.tougaoTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.tougaoTime)))
          },
        },
        { label: '标题', prop: 'title' },
        { label: '评审意见', prop: 'assessOpinions' },
        { label: '组刊意见', prop: 'zukanOpinions' },
        { label: '最新评审人', prop: 'editUnm' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      value: '',
      deleteArry: '',
      gIdArray: [],
    }
  },
  mounted() {
    // 查询框接口
    this.$api.pubStatistics
      .checkSearchParams({
        searchType: 'Mine',
        remark1: JSON.parse(localStorage.getItem('userInfo')).humanCode,
      })
      .then((res) => {
        this.options = res.data
      })
  },

  methods: {
    // 下拉框的值改变时
    selectChange(e) {
      this.chooseItem = e
      this.loadData()
    },
    // 获取列表数据
    loadData() {
      // const reqData = {
      //   // ...this.searchData,
      // }
    this.searchData.drafOrgId = ''
    this.searchData.remark2 = JSON.parse(localStorage.getItem('userInfo')).unitId
      this.$api.pubStatistics
        .pubBrowsingList(
          {
            pubMgId: this.chooseItem ? this.chooseItem : '',
            pubStates: 3,
            cyStaut: 3,
            ...this.searchData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          console.log(res, '666')
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    // 勾选的当前行
    select(row) {
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.gId)
      })
      this.deleteArry = dataArry.join(',')
      this.gIdArray = dataArry
      console.log(dataArry, this.deleteArry)
    },
    // 修改状态
    upDate_btn() {
      if (this.deleteArry) {
        this.$api.pubStatistics.upDateAltBusinessStatus({ gIdArr: this.gIdArray }).then((res) => {
          if (res.code == 'SUCCESS') {
            this.deleteArry = ''
            this.$message({
              message: '修改状态成功',
              type: 'success',
            })
          }
          this.loadData()
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要修改状态的数据',
        })
      }
    },
    // 删除
    delete_btn() {
      //调用了修改状态的方法，没有真正的删除
      if (this.deleteArry) {
        this.$confirm('是否确定删除当前选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$api.pubStatistics.upDateAltBusinessStatus({ gIdArr: this.gIdArray }).then((res) => {
            if (res.code == 'SUCCESS') {
              this.deleteArry = ''
              this.$message({
                message: '删除成功',
                type: 'success',
              })
            }
            this.loadData()
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据',
        })
      }
    },
    // 点击列表当前行
    cellClick(row) {
      this.$intent.goNewPage(this, { name: 'business1', query: { data: row.gId } })
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




