<!--
 * @Author: your name
 * @Date: 2020-08-14 15:43:35
 * @LastEditTime: 2020-08-14 17:38:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\adminLook\equipmentLook\equipmentLook.vue
--> 
<template>
    <div class="equipmentLook">
         <el-tabs>
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="待办"></el-tab-pane>
      <el-tab-pane label="已办"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
    </el-tabs>
    <div>
      <el-select v-model="value" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection='true'
      
    ></m-table>
    </div>
</template>
<script>
import mTable from '@/components/table/tTable'
export default {
     name: 'equipmentLook',
     components: {
    mTable
  },
    data(){
         return{
             tableData: [
                {
                    startDate:'2018-11-15 14:13:00',
                    equipName:'建冀省行测试',
                    equipModel:'cs',
                    jigou:'河北省分行',
                    equipState:'启用',
                },
                {
                    startDate:'2018-11-15 14:13:00',
                    equipName:'建冀省行测试',
                    equipModel:'cs',
                    jigou:'河北省分行',
                    equipState:'启用',
                   
                },
                {},{},{},{},{},{},{},{},
    
            ],
             tableCols: [
                {label: '启用日期', prop: 'startDate'},
                {label: '设备名称', prop: 'equipName'},
                {label: '设备型号', prop: 'equipModel'},
                {label: '使用机构', prop: 'jigou'},
                {label: '设备状态', prop: 'equipState'},
            ],
            pagination: {
                pageNum: 1,
                total: 30
            },
         }
     },
     methods:{
         loadData() {
      },
      cellClick(row) {
          // this.$intent.goNewPage(this, {path: '/approval/qcDetail', query: {data: row, type: 'checkLz'}})
      },
     }
}
</script>
<style scoped lang="less" rel="stylesheet/less">

</style>