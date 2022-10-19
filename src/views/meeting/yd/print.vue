<!--
 * @Author: your name
 * @Date: 2020-07-31 15:51:51
 * @LastEditTime: 2020-08-01 16:33:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\print.vue
--> 
/**
* create by zz on 2020/7/31 16:00
* 类注释：
* 备注：
*/
<template>
 <div class="print">
    <div class="printHeader">
      <div class="title-text">打印维护单</div>
    </div>
    <m-table
    size="medium"
    :tableData="tableData"
    :tableCols="tableCols"
    :pagination="pagination"
    :isSelection='true'
    :isIndex='true'
    >
    </m-table>
 </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/mTable'
 export default {
   name:"print",
   components: {
     mTable
   },
   data () {
     return {
       tableData:[
                    {
                        time: '2020-02-17',
                        room: '309',
                        types: '一般会议',
                        section: '测试部',
                        contact: "十七",
                        contactNum: "17171717",
                        lingdao: "测试",
                    },
                    {
                        time: '2020-02-17',
                        room: '309',
                        types: '一般会议',
                        section: '测试部',
                        contact: "十七",
                        contactNum: "17171717",
                        lingdao: "测试",
                    },
                    {
                        time: '2020-02-17',
                        room: '309',
                        types: '一般会议',
                        section: '测试部',
                        contact: "十七",
                        contactNum: "17171717",
                        lingdao: "测试",
                    },
                    
            ],
            tableCols:[
                    {label: '使用时间', prop: 'time'},
                    {label: '会议室', prop: 'room'},
                    {label: '会议类型', prop: 'types'},
                    {label: '主办部门', prop: 'section'},
                    {label: '联系人', prop: 'contact'},
                    {label: '联系电话', prop: 'contactNum'},
                    {label: '参会领导', prop: 'lingdao'},
            ],
            pagination: {
                    pageNum: 1,
                    total: 10
                },
     }
   },
  computed: {},
  methods: {
  },
  activated() {
  },
  mounted() {
  },
  created() {
  }
 }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .printHeader {
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
