<!--
 * @Author: your name
 * @Date: 2020-08-14 15:42:19
 * @LastEditTime: 2020-08-14 17:38:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\adminLook\index.vue
--> 
<template>
    <div class="adminLook">
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
     name: 'adminLook',
     components: {
    mTable
  },
     data(){
         return{
             tableData: [
                {
                    applyDate:'2018-11-15 14:13:00',
                    applyPerson:'xxx',
                    code:'100100',
                    title:'关于河北省。。。。。。。。。。。。。。',
                    bm:'河北省分行',
                    presentPro:'盖印人审核',
                    operate:'xxx'
                },
                {
                    applyDate:'2018-11-15 14:13:00',
                    applyPerson:'xxx',
                    code:'100100',
                    title:'关于河北省。。。。。。。。。。。。。。',
                    bm:'河北省分行',
                    presentPro:'盖印人审核',
                    operate:'xxx'
                },
                {},{},{},{},{},{},{},{},
               
            ],
             tableCols: [
                {label: '申请时间', prop: 'applyDate'},
                {label: '申请人', prop: 'applyPerson'},
                {label: '编号', prop: 'code'},
                {label: '标题', prop: 'title'},
                {label: '用印部门', prop: 'bm'},
                {label: '当前环节', prop: 'presentPro'},
                {label: '操作人', prop: 'operate'},
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