<!--
 * @Author: your name
 * @Date: 2020-07-30 17:53:16
 * @LastEditTime: 2020-08-07 14:34:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\search\searchResult.vue
--> 
/**
* create by zz on 2020/7/30 
* 类注释：
* 备注：
*/
<template>
 <div class="searchResult">
    <div class="tableHeader">
      <div class="title-text">会议培训本年度查询结果</div>
    </div>
    <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        size="medium"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection='true'
        :isIndex='true'
      ></m-table>
 </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/mTable'
 export default {
     name:"searchResult",
     components: {
            mTable
        },
    props: {},
    data () {
        return {
            tableData:[
                    {
                        name: '总行',
                        draftTime: '2020-07-05',
                        sponsor: '行领导',
                        title: '22',
                        notice: "培训通知",
                        sanctions: "本行",
                        moving: '流转'
                    },
                    {
                        name: 'lol',
                        draftTime: '2020-07-05',
                        sponsor: 'lpl',
                        title: '17',
                        notice: "qwer",
                        sanctions: "df",
                        moving: 'wasd'
                    },
            ],
            tableCols:[
                    {label: '行名', prop: 'name'},
                    {label: '拟稿日期', prop: 'draftTime'},
                    {label: '主办部门', prop: 'sponsor'},
                    {label: '标题', prop: 'title'},
                    {label: '通知种类', prop: 'notice'},
                    {label: '制发层级', prop: 'sanctions'},
                    {label: '流转状态', prop: 'moving'},
            ],
            pagination: {
                    pageNum: 1,
                    total: 10
                },
        }
    },
   methods:{
        loadData(){},
        cellClick(row){
          this.$intent.goNewPage(this,{path:'/meeting/searchDetail',query:{data:row}})
        },
   }
 }
</script>

<style scoped lang="less" rel="stylesheet/less">
.tableHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409EFF;
      font-weight: 600;
      text-align: center;
    }
  }
 
</style>

