<!--
 * @Author: wy
 * @Date: 2020-07-17 10:38:12
 * @LastEditTime: 2021-02-26 18:07:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\inquireResult.vue
--> 
<template>
  <div class="inquireResult">
    <div>
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
      <el-button type="primary" @click="exportData">导出</el-button>
    </div>
    <div class="list">
      <div class="orgInfoTitle">工作交流查询结果</div>
      <m-table
        ref="orgTable"
        size="medium"
        :isPagination="true"
        :pagination="pagination"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script >
import mTable from 'components/table/mTable'
import exportTable from "../../../../../../minixs/exportTable"

export default {
  name: 'inquireResult',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      keyword: '',
      tableData: [
        {
          memberName: 1,
          roleName: 2,
          memberNo: 3
        },
        {
          memberName: 1,
          roleName: 2,
          memberNo: 3
        }
      ],
      tableCols: [
        { label: '起草日期', prop: 'memberName' },
        { label: '拟稿人', prop: 'roleName' },
        { label: '标题', prop: 'memberNo' },
        { label: '接收人', prop: 'memberNo1' }
      ],
      pagination: {
        pageNum: 1,
        total: 20
      }
    }
  },
  filters: {},
  computed: {},
  methods: {
    //导出
    exportData(){
        exportTable.exportExcel("工作交流查询结果");
    },
    cellClick (row) {
      const department1 = row.department1
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/vDWorkCommFormLastSave',
        query: {
          department1
        }
      })
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.inquireResult {
  .orgInfoTitle {
    margin-bottom: 35px;
    font-size: 30px;
    line-height: 55px;
    color: #3b85f0;
    font-weight: 600;
    text-align: center;
  }
}
</style>