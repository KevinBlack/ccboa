<!--
 * @Author: wy
 * @Date: 2020-07-21 16:55:10
 * @LastEditTime: 2020-07-24 14:40:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\newApply\components\viewToDo.vue
--> 
<template>
  <div class="viewToDo">
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="danger" @click="deleteToDo()">删除</el-button>
    </div>
    <div class="list">
      <m-table
        ref="orgTable"
        size="medium"
        :isPagination="true"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/mTable'

export default {
  name: 'viewToDo',
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
          department: 5
        }
      ],
      tableCols: [
        { label: '创建日期', prop: 'memberName' },
        { label: '标题', prop: 'roleName' },
        { label: '操作人', prop: 'memberNo' },
        { label: '拟稿人', prop: 'uass' }
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
    deleteToDo () {
      const selections = this.$refs.orgTable.$refs.cesTable.selection
      console.log(selections)
    },
    cellClick (row) {
      const memberNo = row.memberNo
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/newApply/newUserApply',
        query: {
          memberNo,
          isNeedDelBtn: '1'
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
</style>