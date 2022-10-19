<!--
 * @Author: wy
 * @Date: 2020-07-07 15:26:15
 * @LastEditTime: 2020-10-16 16:03:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\themeLexicon\genus\index.vue
-->
<template>
  <div class="genus">
    <div style="padding: 20px">
      <el-select style="margin-right: 10px" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="newProj()">新建</el-button>
      <el-button type="primary" @click="del()">删除</el-button>
    </div>
    <m-table
      ref="genusTable"
      @refresh="loadData()"
      size="medium"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :searchData="searchData"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'

export default {
  name: 'genus',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      options: [{
        value: '111111111',
        label: '中国建设银行'
      }],
      value: '111111111',
      searchData: {},
      tableData: [],
      tableCols: [
        { label: '类别词', prop: 'mtTmpOne' },
        { label: '类属词', prop: 'mtTmpTwo' }
      ],
      pagination: {
        pageNum: 1
      }
    }
  },
  computed: {},
  methods: {
    loadData () {
      this.$api.themeLexicon.genusView({ searchData: this.searchData }, {
        PAGE_JUMP: this.pagination.pageNum,
        REC_IN_PAGE: 10
      }).then(res => {
        this.pagination.total = res.total
        this.tableData = JSON.parse(JSON.stringify(res.data))
      })
    },
    cellClick (row) {
      this.$router.push({
        name: 'genusConfig',
        query: {
          id: row.id
        }
      })
    },
    //新建
    newProj () {
      this.$router.push({
        name: 'genusConfig'
      })
    },
    //删除
    del () {
      let selection = this.$refs.genusTable.$refs.cesTable.selection
      if (selection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据'
        })
      } else {
        let idArr = []
        selection.map(item => {
          idArr.push(item.id)
        })
        let id = idArr.join(',')
        this.$api.themeLexicon.genusDelete({ id }).then(res => {
          this.loadData()
          this.$message({
            type: 'warning',
            message: '已删除！'
          })
        })
      }
    }
  },
  activated () {
  },
  mounted () {
    this.loadData()
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.genus {
  min-height: 100vh;
}
</style>
