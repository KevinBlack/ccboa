<!--
 * @Author: wy
 * @Date: 2020-07-31 11:05:55
 * @LastEditTime: 2020-07-31 11:21:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\superviseEffic\param\holidayInfo.vue
--> 
<template>
  <div class="holidayInfo">
    <div class="list">
      <el-select v-model="value" placeholder="请选择" :style="{marginBottom:'10px'}">
        <el-option
          v-for="item in options"
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
        :isIndex="true"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/mTable'

export default {
  name: 'holidayInfo',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      //下拉框
      options: [{
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
      value: '',
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
        { label: '年度', prop: 'memberName' },
        { label: '法定节假日', prop: 'roleName' },
        { label: '调为工作日的休息日', prop: 'memberNo' },
        { label: '调为休息日的工作日', prop: 'uass' }
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
    cellClick (row) {
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