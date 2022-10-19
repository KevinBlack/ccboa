<template>
  <div>
    <!-- 日志 -->
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="日报" name="tabs-all">
        <!-- <optionalfield></optionalfield> -->
      </el-tab-pane>
      <el-tab-pane label="周报" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="月报" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="会议纪要" name="tabs-end"></el-tab-pane>

      <el-row>
        <el-col>
          <el-form :model="search" label-width="100px" class="demo-ruleForm mt20">
            <el-row>
              <el-col :span="6">
                <el-form-item label="创建人" prop="createUserName">
                  <el-input v-model="bank_getList.createUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属团队">
                  <el-select v-model="bank_getList.teamid" clearable placeholder="请选择团队">
                    <el-option
                      label="请选择团队"
                      value=""
                    ></el-option>
                    <el-option
                      v-for="item in selectInfo"
                      :key="item.id"
                      :label="item.teamName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="margin-left:20px">
                <el-button type="primary" @click="haveTableData">搜索</el-button>
                <el-button type="primary" @click="resetForm">清空</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addlog">新增{{title}}</el-button>
      <el-row style="margin-top:10px">
        <el-col  style="margin: 20px 0;">
          <el-scrollbar>
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :tableCols="tableCols[active]"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
export default {
  components:{
    mTable
  },
  data() {
    return {
      title: "日报",
      active: '0',
      activeName: "tabs-all",
      tableData: [],
      currentPage: 1, //初始页
      limit: 5, //每页数据
      total: 0,
      value: "",
      tableLoading: false,
      tableCols:[
        [
          { label: "所属团队", prop: "teamname",sort:true,width:'150px'},
          { label: "创建人", prop: "createUserName",sort:true },
          { label: "发布日期", prop: "createTime",sort:true }
        ],
         [
          { label: "所属团队", prop: "teamname",sort:true,width:'150px'},
          { label: "创建人", prop: "createUserName",sort:true },
          { label: "开始时间", prop: "startTime",sort:true },
          { label: "结束时间", prop: "endTime",sort:true },
          { label: "周", prop: "weeks",sort:true }
        ],
        [
          { label: "所属团队", prop: "teamname",sort:true,width:'150px' },
          { label: "创建人", prop: "createUserName",sort:true },
          { label: "开始时间", prop: "startTime",sort:true },
          { label: "结束时间", prop: "endTime",sort:true },
        ],
        [
          { label: "所属团队", prop: "teamname",sort:true,width:'150px' },
          { label: "创建人", prop: "createUserName",sort:true },
          { label: "发布日期", prop: "createTime",sort:true },
        ]
      ],
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },
      search: {
        name: "",
        team: []
      },
      bank_getList:{
        function: "taskdaily_getList",
        status: 1, // 1： 日报 。2：周报。3：月报。4：会议纪要
        page: 1, //当前页数
        limit: 10, //每页条数
        createUserName:'',//创建人
        teamid:''
      },
      bank_getUser:{
        function: "findByUser"
      },
      sortDate:[{ prot: "date", order: "descnding" }],
      selectInfo:[]
    };
  },
  created() {
    let nowTit = sessionStorage.getItem("logTitle");
    this.selectTab(nowTit?nowTit:'');
    this.getSelectData();
    this.haveTableData()
  },
  methods: {
    handleTabsClick(tab) {
      this.title = tab.label;
      console.log(this.title)
      this.active = tab.index;
      sessionStorage.setItem("logTitle",this.title);
      this.haveTableData();
    },
    //选中切换按钮
    selectTab(type){
      let param ={
        label:"日报",
        index:'0'
      }
      param.label = type?type:'日报';
      switch (type) {
        case "周报":
          param.index = 1;
          this.activeName = "tabs-wait";
          break;
         case "月报":
          param.index = 2;
          this.activeName = "tabs-done";
          break;
         case "会议纪要":
          param.index = 3;
          this.activeName = "tabs-end";
          break;
        default:
          this.activeName = "tabs-all";
          break;
      }
      this.handleTabsClick(param);
    },
    //新增日志
    addlog(tye) {
      let routeData;
      let path = "";
      if (this.title == "日报") {
        path = "/dayLog";
        sessionStorage.setItem("logTitle", this.title);
      } else if (this.title == "周报") {
        path = "/weekLog";
        sessionStorage.setItem("logTitle", this.title);
      } else if (this.title == "月报") {
        path = "/monthLog";
        sessionStorage.setItem("logTitle", this.title);
      } else {
        path = "/mettingLog";
        sessionStorage.setItem("logTitle", this.title);
      }
      routeData = this.$router.resolve({path:path})
      window.open(routeData.href,'_blank');
    },
    //清空
    resetForm() {
        this.bank_getList.createUserName='';
        this.bank_getList.teamid= '';
    },
    haveTableData() {
      this.bank_getList.status = +this.active+1;
       this.$post
        .postData(
          "taskdaily_getList",
          JSON.stringify(this.bank_getList),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res.data)
          this.tableData = res.data&&res.data.rows||[];
          this.pagination.total = res.data&&res.data.total||0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击行查看
     cellClick(row, column, cell, event) {
      let path = '';
      if (this.title == "日报") {
        path = "/dayLog";
      } else if (this.title == "周报") {
        path = "/weekLog";
      } else if (this.title == "月报") {
        path = "/monthLog";
      } else {
        path = "/mettingLog";
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: row.id
        }
      });
      window.open(routeData.href, "_blank");
    },
    //分页
    handleSizeChange(val) {
      this.bank_getList.limit = val;
      this.pagination.limit = val;
      this.pagination.page = this.bank_getList.page = 1;
      this.tableData = [];
      this.haveTableData();
    },
    handleCurrentChange(val) {
      this.bank_getList.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.haveTableData();
    },
     //下拉框数据
    getSelectData(){
      this.$post
        .postData(
          "findByUser",
          JSON.stringify(this.bank_getUser),
          this.$businessCode.tdgl 
        )
        .then(res => {
          this.selectInfo = res.data||[];
          console.log(this.selectInfo)
        })
        .catch(err => {
          console.log(err);
        });
    }
  } 
};
</script>

<style>
</style>