<!--
 * @Author: wy
 * @Date: 2020-07-13 16:57:58
 * @LastEditTime: 2020-07-16 17:47:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\sublicense\components\role.vue
--> 
<template>
  <div class="done">
    <div class="list">
      <el-select v-model="yearValue" placeholder="请选择年份" :style="{ marginBottom:'10px'}">
        <el-option
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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

<script type="text/ecmascript-6">
import mTable from 'components/table/mTable'

export default {
  name: 'done',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      //下拉框
      yearOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      yearValue: '',
      keyword: '',
      tableData: [
        {
          memberName: 1,
          roleName: 2,
          memberNo: 3,
          uass: 4,
          department: 5,
          department1: 0
        },
        {
          memberName: 1,
          roleName: 2,
          memberNo: 3,
          uass: 4,
          department: 5,
          department1: 1
        }
      ],
      tableCols: [
        { label: '登记日期', prop: 'memberName' },
        { label: '授权人', prop: 'roleName' },
        { label: '被授权人', prop: 'memberNo' },
        { label: '授权开始时间', prop: 'uass' },
        { label: '授权结束时间', prop: 'department' },
        { label: '转授权状态', prop: 'department1' }
      ],
      pagination: {
        pageNum: 1,
        total: 10
      }
    }
  },
  filters: {},
  computed: {},
  methods: {
    delete () {
      const selections = this.$refs.orgTable.$refs.cesTable.selection
      console.log(selections)
    },
    cellClick (row) {
      const memberNo = row.memberNo
      const department1 = row.department1
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/sublicense/doneDetail',
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
</style>