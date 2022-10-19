<template>
  <div>
    <!-- 日志 -->
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="团队任务数统计" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="任务参与情况统计" name="tabs-wait"></el-tab-pane>
      <el-row>
        <el-col>
          <el-form :model="search" label-width="100px" class="demo-ruleForm mt20">
            <el-row>
              <!-- <el-col :span="6">
                <el-form-item label="创建人" prop="createUserName">
                  <el-input v-model="bank_getList.createUserName"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="所属团队">
                  <el-select v-model="bank_getList.teamid" clearable placeholder="请选择团队">
                    <!-- <el-option
                      label="请选择团队"
                      value=""
                    ></el-option> -->
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
      title: "统计",
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
          { label: "团队名称", prop: "teamName",sort:true },
          { label: "团队成员总数", prop: "teamnumber",sort:true },
          { label: "成员所在部门总数", prop: "depnnumber",sort:true },
          { label: "子团队数量", prop: "sonteamnumber",sort:true },
          { label: "主任务总数", prop: "tasknumber",sort:true },
          { label: "子任务总数", prop: "tasksonnumber",sort:true },
          { label: "人均执行任务数", prop: "percapitatask",sort:true },
          { label: "任务平均执行天数", prop: "averageDays",sort:true }
        ],
         [
          { label: "成员名称", prop: "name",sort:true },
          { label: "派发任务总数", prop: "sendCount",sort:true },
          { label: "执行任务总数", prop: "finishCount",sort:true },
          { label: "团队任务总数", prop: "countAll",sort:true },
          { label: "任务平均完成天数", prop: "avgFunishCount",sort:true },
          { label: "任务参与度", prop: "joinCount",sort:true }
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
        function: "getStatistics",
        status: 1, // 1： 团队任务数统计 2：任务参与情况统计
        page: 1, //当前页数
        limit: 10, //每页条数
        teamid:''
      },
      bank_getUser:{
        function: "findByUserByTypes2"
      },
      sortDate:[{ prot: "date", order: "descnding" }],
      selectInfo:[]
    };
  },
  created() {
    this.getSelectData().then(()=>{
      let nowTit = sessionStorage.getItem("statisTitle");
      this.selectTab(nowTit?nowTit:'');
    });
    
  },
  methods: {
    handleTabsClick(tab) {
        console.log(tab);
      this.title = tab.label;
      this.active = tab.index;
      // if(this.active==1){
      //   this.bank_getList.teamid = this.selectInfo[0].id
      //   this.bank_getList.teamName = this.selectInfo[0].teamName
      // }else{
      //   this.bank_getList.teamid=''
      //   this.bank_getList.teamName = ''
      // }
      sessionStorage.setItem("statisTitle",this.title);
        if(this.active==1){
        this.bank_getList.teamid = this.selectInfo[0].id
        // this.bank_getList.teamName = this.selectInfo[0].teamName
      }else{
        this.bank_getList.teamid=''
        // this.bank_getList.teamName = ''
      }
      this.haveTableData();
    },
    //选中切换按钮
    selectTab(type){
      let param ={
        label:"团队任务数统计",
        index:'0'
      }
      param.label = type?type:'团队任务数统计';
      switch (type) {
        case "任务参与情况统计":
          param.index = 1;
          this.activeName = "tabs-wait";
          break;
        default:
          this.activeName = "tabs-all";
          break;
      }
      this.handleTabsClick(param);
    },
    //清空
    resetForm() {
        this.bank_getList.teamid= '';
        this.bank_getList.teamName = ''
    },
    haveTableData() {
      this.bank_getList.status = +this.active+1;
      console.log(this.bank_getList)
       this.$post
        .postData(
          "getStatistics",
          JSON.stringify(this.bank_getList),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res)
          this.tableData = res.data.taskCount.data || []
          this.pagination.total = res.data.taskCount.totalCount||0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页
    handleSizeChange(val) { 
      this.bank_getList.limit = val;
      this.pagination.limit = val;
      console.log(this.pagination.limit)
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
      console.log(this.bank_getUser)
      return new Promise((resolve,reject) => {
        this.$post
        .postData(
          "findByUserByTypes2",
          JSON.stringify(this.bank_getUser),
          this.$businessCode.tdgl
        )
        .then(res => {
          this.selectInfo = res.data||[];
          resolve(this)
        })
        .catch(err => {
          console.log(err);
        });
      })
    }
  }
};
</script>

<style>
</style>