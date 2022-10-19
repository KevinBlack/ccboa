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
* 备注：会议预订/我的预订
*/
<template>
  <div class="myBook">
    <div class="process_content">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="全部" name="tab0"></el-tab-pane>
        <el-tab-pane label="已取消" name="tab1"></el-tab-pane>
        <el-tab-pane label="审批中" name="tab2"></el-tab-pane>
        <el-tab-pane label="预订成功" name="tab3"></el-tab-pane>
        <el-tab-pane label="使用完毕" name="tab4"></el-tab-pane>
        <el-row>
          <el-col>
            <m-table
              size="medium"
              :isIndex="true"
              :isPagination="true"
              :isHandle="false"
              :tableData="tableData"
              :tableCols="tableCols"
              :pagination="pagination"
              :state="httpData.state"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"
              @cellClick="cellClick"
              v-loading="tableLoading"
              :default-sort="sortDate"
            ></m-table>
          </el-col>
        </el-row>
    </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/mTable.vue";
const data0 = [
  { label: "会议室名称", prop: "roomName", align: "center" },
  { label: "会议名称", prop: "meetingName", align: "center" },
  { label: "使用时间", prop: "meetUseDate", align: "center" },
  { label: "会议类型", prop: "meetType", align: "center" },
  { label: "主办部门", prop: "hostDepartment", align: "center" },
  { label: "当前状态", prop: "orderStatus", align: "center" },
  { label: "申请日期", prop: "cteatTime", align: "center" }
]
const data1 = [
  { label: "会议室名称", prop: "roomName", align: "center" },
  { label: "会议名称", prop: "meetingName", align: "center" },
  { label: "会议类型", prop: "meetType", align: "center" },
  { label: "申请日期", prop: "cteatTime", align: "center" },
  { label: "取消时间", prop: "cancelTime", align: "center" },
  { label: "取消人", prop: "cancelUserName", align: "center" },
]
const data2 = [
  { label: "申请日期", prop: "cteatTime", align: "center" },
  { label: "会议室名称", prop: "roomName", align: "center" },
  { label: "会议名称", prop: "meetingName", align: "center" },
  { label: "会议类型", prop: "meetType", align: "center" },
  { label: "使用时间", prop: "meetUseDate", align: "center" },
  { label: "当前处理人", prop: "crrentProcessor", align: "center" }
]
const data3 = [
  { label: "申请日期", prop: "cteatTime", align: "center" },
  { label: "会议室名称", prop: "roomName", align: "center" },
  { label: "会议名称", prop: "meetingName", align: "center" },
  { label: "会议类型", prop: "meetType", align: "center" },
  { label: "使用时间", prop: "meetUseDate", align: "center" }
]
export default {
  name: "myBook",
  components: {
    mTable
  },
  data() {
    return {
      httpData: {
        function: "getMyOrder",
        status: '0,1,2,3,4',
        page: 1,
        total: 0,
        limit: 20
      },
      tableLoading: false,
      activeName: "tab0",
      sortDate: [],
      currentTab: '0',
      tableData: [],
      tableCols: data0,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
    };
  },
  computed: {},
  methods: {
    //点击 全部0 已取消1  审批中2  预订成功3  使用完毕4
    handleTabsClick(tab, event) {
      this.currentTab = tab.index
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.page = 1;
      this.pagination.total = 0;
      this.httpData.state = tab.index;
      sessionStorage.setItem('tab_sw',tab.name);
      this.httpData.page = 1;
      switch(tab.index){
        case '0':
          this.tableCols = data0;
          this.httpData.status = '0,1,2,3,4';
          break
        case '1':
         this.tableCols = data1;
          this.httpData.status = '2';
          break
        case '2':
          this.tableCols = data2;
          this.httpData.status = '0,3';
          break
        case '3':
          this.tableCols = data3;
          this.httpData.status = '1';
          break
        case '4':
          this.tableCols = data3;
          this.httpData.status = '4';
          break
      };
      this.handleLoadData(tab.index);
      this.tableLoading = false;
    },
     // 页面初始化加载数据
    handleLoadData(tabindex="0") {
      sessionStorage.setItem('page_sw',JSON.stringify(this.httpData));
      this.$post.postData("getMyOrder", JSON.stringify(this.httpData), this.$businessCode.hysyd).then(res => {
          this.tableData = res.data.rows||[];
          this.pagination.total = res.data&&res.data.total||0;
        })
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.httpData.page = val
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData(this.currentTab)
    },

    handleSizeChange(val) {
      this.httpData.limit = val
      this.pagination.page = this.httpData.page = 1
      this.pagination.limit = val
      this.tableData = []
      this.handleLoadData(this.currentTab)
    },
    cellClick(row, column, cell, event) {
      let pageData={
        id:row.id,
        orderStatu:'',
        roomId:row.roomId
      };
      switch(this.currentTab){
        case '0':
          if(row.orderStatus=='已取消'){
            pageData.orderStatu='1';
          }else if(row.orderStatus=='审批中'){
            if(row.state=='1'){//state 1:已办 0：待办
              pageData.orderStatu='2';
            }
          }else if(row.orderStatus=='预订成功'){
            pageData.orderStatu='3';
          }else if(row.orderStatus=='使用完毕'){
            pageData.orderStatu='4';
          }
          break
        case '2':
          if(row.state=='1'){//state 1:已办 0：待办
            pageData.orderStatu='2';
          }
          break
        case '1':
          pageData.orderStatu='1';
          break
        case '3':
          pageData.orderStatu='3';
          break
        case '4':
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
    if(sessionStorage.getItem('tab_sw')){
      this.activeName=sessionStorage.getItem('tab_sw');
      if (this.activeName == "tab0") {
        this.tableCols = data0;
        this.currentTab ='0';
      }
      if (this.activeName == "tab1") {
        this.tableCols = data1;
        this.currentTab ='1';
      }
      if (this.activeName == "tab2") {
        this.tableCols = data2;
        this.currentTab ='2';
      }
      if (this.activeName == "tab3") {
        this.tableCols = data3;
        this.currentTab ='3';
      }
      if (this.activeName == "tab4") {
        this.tableCols = data3;
        this.currentTab ='4';
      }
    }
    if(sessionStorage.getItem('page_sw')){
      this.httpData = Object.assign(this.httpData,JSON.parse(sessionStorage.getItem('page_sw')));
      this.pagination={
        page: this.httpData.page, //第几页
        total: this.httpData.total, //共有条数
        limit: this.httpData.limit, //每页条数
      }
    }
     this.handleLoadData(this.currentTab);
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
</style>
