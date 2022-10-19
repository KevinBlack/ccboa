<template>
  <div class="index">
    <el-tabs v-model="actionTabsName">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="待办" name="todo"></el-tab-pane>
      <el-tab-pane label="已办" name="done"></el-tab-pane>
      <el-tab-pane label="办结" name="end"></el-tab-pane>
      <el-col class="mt20end">
        <el-button v-show="!isShowBtn" type="primary" @click="addData">拟稿</el-button>
      </el-col>
    </el-tabs>
    <m-table @refresh="loadData" @cellClick="cellClick" size="medium" :isIndex="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
export default {
  name: 'index',
  components: {
    mTable,
  },
  data() {
    return {
      // 待办显示拟稿按钮
      isShowBtn: true,
      // tabs类型
      type: '0',
      // 表格数据
      tableData: [],
      // 表头
      tableCols: [
        { label: '来搞时间', prop: 'createDate' },
        { label: '投稿刊物', prop: 'submitPublication' },
        { label: '投稿栏目', prop: 'submitColumn' },
        { label: '投稿单位', prop: 'submitUnit' },
        { label: '投稿部门', prop: 'submitDept' },
        { label: '稿件状态', prop: 'submitStatus' },
        { label: '发布日期', prop: 'publishDate' },
      ],
      // 分页
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 10,
      },
      // 默认全部
      actionTabsName: 'all',
    }
  },
  watch: {
    // 监听tabs切换
    actionTabsName: {
      handler(val) {
        // 0 全部 1 待办 2 已办 3 办结
        switch (val) {
          case 'all':
            this.isShowBtn = true
            this.type = '0'
            this.loadData(this.type)
            break
          case 'todo':
            this.isShowBtn = false
            this.type = '1'
            this.loadData(this.type)
            break
          case 'done':
            this.isShowBtn = true
            this.type = '2'
            this.loadData(this.type)
            break
          case 'end':
            this.isShowBtn = true
            this.type = '3'
            this.loadData(this.type)
            break
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 拟稿
    addData() {
      this.$intent.goNewPage(this, {
        path: '/sendHandle',
        query: { type: 'add' },
      })
    },
    // 获取表格数据
    loadData(type) {
      this.$api.duty
        .informationTransList(
          { filterState: type },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.list
        })
    },
    // 换行点击事件
    cellClick(row) {
      let rowData = JSON.stringify(row)
      this.$intent.goNewPage(this, {
        path: '/sendHandle',
        query: { data: rowData, type: 'detail' },
      })
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.mt20end {
  margin: 20px 0;
}
.mt20 {
  padding: 20px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
</style>
