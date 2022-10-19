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
* 备注：会议预订/预订审批
*/
<template>
  <div class="approve">
    <div class="process_content">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
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
            :state="currentTab"
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
const finshData = [
  { label: "会议名称", prop: "meetingName", align: "center" },
  { label: "会议室名称", prop: "roomName", align: "center" },
  { label: "会议类型", prop: "meetType", align: "center" },
  { label: "使用时间", prop: "meetUseDate", align: "center" },
  { label: "申请日期", prop: "cteatTime", align: "center" },
  { label: "申请人", prop: "orderUserName", align: "center" },
  { label: "申请人联系方式", prop: "orderUserPhon", align: "center" },
  { label: "当前环节", prop: "crrentLink", align: "center" }
]
const otherData = [
  { label: "会议名称", prop: "meetingName", align: "center" },
  { label: "会议室名称", prop: "roomName", align: "center" },
  { label: "会议类型", prop: "meetType", align: "center" },
  { label: "使用时间", prop: "meetUseDate", align: "center" },
  { label: "申请日期", prop: "cteatTime", align: "center" },
  { label: "申请人", prop: "orderUserName", align: "center" },
  { label: "申请人联系方式", prop: "orderUserPhon", align: "center" },
  { label: "到达时间", prop: "arriveTime", align: "center" }
]
const allData = [
  { label: "会议名称", prop: "meetingName", align: "center" },
  { label: "会议室名称", prop: "roomName", align: "center" },
  { label: "会议类型", prop: "meetType", align: "center" },
  { label: "使用时间", prop: "meetUseDate", align: "center" },
  { label: "申请日期", prop: "cteatTime", align: "center" },
  { label: "申请人", prop: "orderUserName", align: "center" },
  { label: "申请人联系方式", prop: "orderUserPhon", align: "center" }
]
export default {
  name: "approve",
  components: {
    mTable
  },
  data() {
    return {
      tableLoading: false,
      activeName: "tabs-wait",
      sortDate: [{ prop: "useTime", order: "descnding" },{ prop: "applicationTime", order: "descnding" }],
      currentTab: '1',
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      getTableOrderAll: {
        //全部
        function: "allTask",
        state: 0, //全部0 待办1  已办2
        tplbsnid: "HYSYDSP",
        totalCount: "0"
      },
      getTableOther: {
        //待办已办
        function: "getWFTaskQB",
        state: 1, //全部0 待办1  已办2
        tplbsnid: "HYSYDSP",
        totalCount: "0"
      },
      routeParam:{
        id:'',
        readFlag:'',
        orderStatu:'2'
      }
    };
  },
  computed: {},
  methods: {
    //点击 全部0 待办1  已办2
    handleTabsClick(tab, event) {
      this.currentTab = tab.index;
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.page = 1;
      this.pagination.total = 0;
      this.getTableOther.state = tab.index;
      if (tab.index == "0") {
        this.tableCols = allData;
      }
      if (tab.index == "1") {
        this.tableCols = otherData;
      }
      if (tab.index == "2") {
        this.tableCols = finshData;
      }
      sessionStorage.setItem('tab_sw',tab.name);
      this.handleLoadData(tab.index);
      this.tableLoading = false;
    },
     // 页面初始化加载数据
    handleLoadData(tabindex="1") {
      this.currentTab=tabindex;
      if(tabindex=="0") {
        let httpData=Object.assign(this.getTableOrderAll,JSON.parse(JSON.stringify(this.pagination)));
        sessionStorage.setItem('page_sw',JSON.stringify(httpData));
        this.$post
          .postData(
            "allTask",
            JSON.stringify(httpData),
            this.$businessCode.hysyd
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          })
          .catch(err => {
            console.log(err);
          });
      }else{
        let httpData=Object.assign(this.getTableOther,JSON.parse(JSON.stringify(this.pagination)));
        this.getTableOther.state=tabindex;
        sessionStorage.setItem('page_sw',JSON.stringify(httpData));
        this.$post
          .postData(
            "getWFTaskQB",
            JSON.stringify(httpData),
            this.$businessCode.hysyd
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.getTableOther.total = res.data.total;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.tableData = [];
      this.handleLoadData(this.currentTab)
    },

    handleSizeChange(val) {
      this.pagination.page = 1;
      this.pagination.limit = val;
      this.tableData = [];
      this.handleLoadData(this.currentTab)
    },
    cellClick(row, column, cell, event) {
      let pageData={
        id:row.id,
        readFlag:row.readFlag,
        orderStatu:'',
        roomId:row.roomId
      };
      //state 1:已办 0：待办
      if((this.currentTab=='0'&&row.state=='0') || this.currentTab=='1'){//全部tab中待办状态和待办tab中
          this.goNewPage('/meeting/yd/blueDetail',pageData)
      }else{
        pageData.orderStatu='2';//审批中且已办
        this.goNewPage('/meeting/yd/blueDetail1',pageData)
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
      if (this.activeName == "tabs-all") {
        this.tableCols = allData;
        this.currentTab ='0';
      }
      if (this.activeName == "tabs-wait") {
        this.tableCols = otherData;
        this.currentTab ='1';
      }
      if (this.activeName == "tabs-done") {
        this.tableCols = finshData;
        this.currentTab ='2';
      }
    }
    if(sessionStorage.getItem('page_sw')){
      if(this.activeName=='tabs-all'){
        this.getTableOrderAll = Object.assign(this.getTableOrderAll,JSON.parse(sessionStorage.getItem('page_sw')));
        this.pagination={
          page: this.getTableOrderAll.page, //第几页
          total: this.getTableOrderAll.total, //共有条数
          limit: this.getTableOrderAll.limit, //每页条数
        };
        this.handleLoadData('0');
      }else{
        this.getTableOther = Object.assign(this.getTableOther,JSON.parse(sessionStorage.getItem('page_sw')));
        this.pagination={
          page: this.getTableOther.page, //第几页
          total: this.getTableOther.total, //共有条数
          limit: this.getTableOther.limit, //每页条数
        };
        this.handleLoadData(this.getTableOther.state);
      }
    }else{
      this.handleLoadData();
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
</style>
