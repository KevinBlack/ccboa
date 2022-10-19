<!--
 * @Author: wy
 * @Date: 2020-07-31 10:33:58
 * @LastEditTime: 2020-07-31 15:49:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\superviseEffic\signOff\reportForm\draftDepart.vue
--> 
<template>
  <div class="draftDepart">
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
  name: 'draftDepart',
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
        { label: '拟稿部门', prop: 'memberName' },
        { label: '办理件数', prop: 'roleName' },
        { label: '已办结件数', prop: 'memberNo' },
        { label: '会签次数', prop: 'uass' },
        { label: '处理工作日', prop: 'department' },
        { label: '会签反馈用时', prop: 'department' },
        { label: '拟稿部门办理用时', prop: 'department' },
        { label: '拟稿部门用时占比平均值', prop: 'department' },
        { label: '已发布', prop: 'department' },
        { label: '锁定', prop: 'department' }
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