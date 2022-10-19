<!--
 * @Author: your name
 * @Date: 2020-07-31 15:53:34
 * @LastEditTime: 2020-08-11 14:22:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\query.vue
-->
/**
* create by lxx on 2020/01/18 16:00
* 类注释：
* 备注：会议预订/历史预订
*/
<template>
  <div class="historyYd">
    <div class="process_content">
      <tTable
         :isIndex="true"
         :isPagination="true"
         :pagination="pagination"
         :sortable="false"
         :tableData="tableData"
         :tableCols="tableCols"
         @refresh='search'
         @cellClick="cellClick"
         :pageSizeList=[20,30,50,100,200]></tTable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import tTable from "@/components/table/tTable";
export default {
  name: "historyYd",
  components: {
    tTable
  },
  data() {
    return {
      // 分页数据
      pagination: {
        pageSize: 20,
        pageNum: 1,
        total: 1
      },
      tableCols:[
        { label: "会议名称", prop: "meetingName", align: "center" },
        { label: "会议室名称", prop: "roomName", align: "center" },
        { label: "会议类型", prop: "meetType", align: "center" },
        { label: "使用时间", prop: "meetUseDate", align: "center" },
        { label: "申请日期", prop: "cteatTime", align: "center" },
        { label: "申请人", prop: "orderUserName", align: "center" },
        { label: "申请人联系方式", prop: "orderUserPhon", align: "center" },
        { label: "当前状态", prop: "orderStatus", align: "center" }
      ],
      tableData:[],
      routeParam:{
        id:'',
        orderStatu:'2'
      }
    };
  },
  computed: {},
  methods: {
    search(){
      let httpData={
        function:'getHistoryOrder',
        tplbsnid:'HYSYDSP',
        page:this.pagination.pageNum,
        limit:this.pagination.pageSize,
        totalCount:0
      };
      sessionStorage.setItem('page_sw',JSON.stringify(this.pagination));
      this.$post
        .postData(
          "getHistoryOrder",
          JSON.stringify(httpData),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            if(res.data){
              this.tableData = res.data.rows;
              this.pagination.total=res.data.total;
            }
          }else{
            if(res.data){
              this.$message.error(res.data.message);
            }
          }
        })
        .catch(erro => {
         this.$message.error("请求失败");
        });
    },
    cellClick(row, column, cell, event) {
      let pageData={
        id:row.id,
        readFlag:row.readFlag,
        orderStatu:'',
        roomId:row.roomId
      };
      switch(row.orderStatus){
        case '审批中':
          if(row.state=='1'){//state 1:已办 0：待办
            pageData.orderStatu='2';
          }
          break
        case '已取消':
          pageData.orderStatu='1';
          break
        case '预订成功':
          pageData.orderStatu='3';
          break
        case '使用完毕':
          pageData.orderStatu='4';
          break
      }
      if(pageData.orderStatu!=''){
        this.goNewPage('/meeting/yd/blueDetail1',pageData)
      }else{
        this.goNewPage('/meeting/yd/blueDetail',pageData)
      }
    },
    goNewPage (path,pageData) {
      const routeData = this.$router.resolve({
        path: path,
        query: pageData
      });
      window.open(routeData.href, "_blank");
    },
  },
  activated() {},
  mounted() {},
  created() {
    if(sessionStorage.getItem('page_sw')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('page_sw')));
    }
    this.search();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
