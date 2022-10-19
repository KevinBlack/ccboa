<!--
 * @Author: your name
 * @Date: 2020-11-14 14:08:27
 * @LastEditTime: 2021-05-24 10:33:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\publication\editJournal\browsing\index.vue
--> 
<template>
  <!-- 来搞浏览 -->
  <div class="check">
    <div style="margin: 15px 0">
      <el-select placeholder="请选择" v-model="searchDataValue" @change="selectChange" clearable>
        <el-option v-for="item in options" :key="item.value" :label="item.pubNm" :value="item.pubMgId">
        </el-option>
      </el-select>
    </div>
    <m-table @refresh="loadData" @cellClick="cellClick" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="false" :searchData="searchData"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import dateFormate from '@/util/filters.js'

export default {
  name: 'browsing',
  components: {
    mTable,
  },
  data() {
    return {
      searchDataValue: '',
      searchData: {},
      chooseItem: '',
      tableData: [],
      tableCols: [
        {
          label: '收稿日期',
          prop: 'editTime',
          formatter(row) {
            return row.tougaoTime == '' || row.tougaoTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.tougaoTime)))
          },
        },
        { label: '标题', prop: 'title' },
        { label: '来稿单位', prop: 'drafOrgNm' },
        { label: '采用情况', prop: 'cyStaut' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
    }
  },
  created() {
    this.loadData()
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
    handleOpenPage(path, id, readType, flag) {
      
      let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
      if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      } 
      const routeData = this.$router.resolve({
        path: path,
        query: {id:id}
      });
      window.open(routeData.href, "_blank");
      
    },
    // 当前行
    cellClick(row) {
      console.log(row.gId)

      this.$intent.goNewPage(this, {
        name: 'laigao',
        query: { data: row.gId, statu: 0 },
      })

      // this.$intent.goNewPage(this,{
      //   name:'laigao'
      // })
    },
    // 获取表格数据
    loadData() {
    this.searchData.drafOrgId = ''
    this.searchData.remark2 = JSON.parse(localStorage.getItem('userInfo')).unitId
    
      this.$api.pubStatistics
        .pubBrowsingList(
          { ...this.searchData, pubMgId: this.chooseItem ? this.chooseItem : '' },
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
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>



