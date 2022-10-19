<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="全部">
        <!-- <optionalfield></optionalfield> -->
      </el-tab-pane>
      <el-tab-pane label="待办" name="待办"></el-tab-pane>
      <el-tab-pane label="已办" name="已办"></el-tab-pane>
      <el-tab-pane label="已收回" name="已收回"></el-tab-pane>
      <el-tab-pane label="办结" name="办结"></el-tab-pane>
      <el-row v-if="activeName=='全部'">
        <el-col>
          <el-form :model="search" ref="search" label-width="85px" class="demo-ruleForm mt20">
            <el-row>
              <el-col :span="5">
                <el-form-item prop="layouttime" label="布置时间">
                  <el-date-picker
                    v-model="search.layouttime"
                    type="date"
                    value-format="yyyy-MM-dd"
                     style="width: 100%"
                  ></el-date-picker>-
                </el-form-item>
              </el-col>
              <!-- <el-col class="line" :span="2">-</el-col> -->
              <el-col :span="4"  style="width:13%">
                <el-form-item prop="layouttimeTo" class="endTime">
                  <el-date-picker
                    v-model="search.layouttimeTo"
                    type="date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="所属团队" prop="teamname">
                  <el-select
                    v-model="search.teamname"
                    placeholder="请选择"
                    clearable
                    @change="checkchange"
                  >
                    <el-option
                      v-for="item in teamlist"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                      :style="{color:item.color}"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="派发人" prop="createname">
                  <el-select
                    v-model="search.createname"
                    clearable
                    placeholder="请选择"
                    no-data-text="请选择"
                  >
                    <el-option
                      v-for="item in userList"
                      :key="item.userId"
                      :label="item.userName"
                      :value="item.userId"
                      no-data-text="请选择"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="任务责任人" prop="person">
                  <el-select v-model="search.person" clearable placeholder="请选择" no-data-text="请选择">
                    <el-option
                      v-for="item in userList"
                      :key="item.userId"
                      :label="item.userName"
                      :value="item.userId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="截止时间" prop="endtime">
                  <el-date-picker v-model="search.endtime" style="width: 100%" type="date" value-format="yyyy-MM-dd"></el-date-picker>-
                </el-form-item>
              </el-col>
              <el-col :span="4" style="width:13%">
                <el-form-item prop="endtimeTo" class="endTime">
                  <el-date-picker v-model="search.endtimeTo" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="状态" prop="status">
                  <el-select v-model="search.status" clearable placeholder="请选择">
                    <el-option
                      v-for="item in statuslist"
                      :key="item.status"
                      :label="item.text"
                      :value="item.status"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="任务名称" prop="taskname">
                  <el-input v-model="search.taskname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="margin-left:60px">
                <el-button type="primary" @click="submitForm" v-if="btnSea">搜索</el-button>
                <el-button type="primary" @click="resetForm('search')"  v-if="btnSea">清空</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="addtask" icon="el-icon-circle-plus-outline" v-if="isAdd" style="float:left;margin-bottom: 10px;">新增任务</el-button>
          <el-button type="primary" @click="exportData" style="float:right;">导出</el-button>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col class="table_scroll">
          <el-table
            :data="tableData"
            v-loading="loading"
            style="width:100%"
            border
            id="table"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :default-sort="{ prot: 'date', order: 'descnding' }"
            @row-click="change"
            highlight-current-row
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="index" label="序号" width="60" ></el-table-column>
            <el-table-column
              prop="layouttime"
              sortable
              label="布置时间"
              width="160px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="taskname"
              sortable
              label="任务名称"
              show-overflow-tooltip
              width="160px"
            ></el-table-column>
            <el-table-column
              prop="teamname"
              sortable
              label="所属团队"
              show-overflow-tooltip
              width="160px"
            ></el-table-column>
            <el-table-column
              prop="createname"
              sortable
              label="派发人"
              show-overflow-tooltip
             width="160px"
            ></el-table-column>
            <el-table-column
              prop="noticetype"
              sortable
              label="任务通知方式"
              show-overflow-tooltip
              width="160px"
            ></el-table-column>
            <el-table-column
              prop="endtime"
              sortable
              label="截止时间"
              show-overflow-tooltip
             width="160px"
            ></el-table-column>
            <el-table-column
              prop="person"
              sortable
              label="任务责任人"
              show-overflow-tooltip
              width="180px"
            ></el-table-column>
            <el-table-column prop="status" sortable label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="fatherTaskname"
              label="上一级任务"
              show-overflow-tooltip
              width="160px"
            >
              <template slot-scope="scope">
                <span>无</span>
                <!-- <span @click.stop="toFatherTask(scope.row)">{{scope.row.fatherTaskname}}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="num" label="子任务数" ></el-table-column>
            <el-table-column label="任务点评" v-if="iscomplete" width="300px" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  v-if="scope.row.evaluateStatus=='1'? true:false"
                  @click.stop="evalute(scope.row.taskId)"
                >评价</el-button>
                <div v-if="scope.row.evaluateStatus=='2'? true:false">
                  <div style="display:flex">
                    <span>任务进度:</span>
                    <el-rate
                      v-model="scope.row.evaluate.split(',')[0]"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    ></el-rate>
                  </div>
                  <div style="display:flex">
                    <span>完成质量:</span>
                    <el-rate
                      v-model="scope.row.evaluate.split(',')[1]"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    ></el-rate>
                  </div>
                  <div style="display:flex">
                    <span>完成时效:</span>
                    <el-rate
                      v-model="scope.row.evaluate.split(',')[2]"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    ></el-rate>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top:10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="bank_countersignature.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="bank_countersignature.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-tabs>
    <!-- 弹窗 -->
    <taskDialog ref="dialog" :title="btntitle" v-if="dialogShow" @dialogClose="dialogClose"></taskDialog>
    <el-dialog title="任务评价" :visible.sync="dialogVisible" width="20%" :before-close="handleClose">
      <div style="display:flex">
        <span>任务进度:</span>
        <el-rate v-model="addrate1" show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </div>
      <div style="display:flex">
        <span>完成质量:</span>
        <el-rate v-model="addrate2" show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </div>
      <div style="display:flex">
        <span>完成时效:</span>
        <el-rate v-model="addrate3" show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEvalute">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
   
<script>
import mTable from "@/components/table/mTable.vue";
import optionalfield from "@/components/optionalfield/optionalfield.vue";
import taskDialog from "./component/dialog.vue";
import exportTable from "@/minixs/exportTable";
export default {
  name: "App",
  components: {
    mTable,
    optionalfield,
    taskDialog
  },
  data() {
    return {
      btnSea:false,
      isAdd:true,
      dialogShow: false,
      dialogVisible: false,
      iscomplete: false,
      loading: false,
      //table表格参数
      bank_countersignature: {
        function: "getList",
        state: "1,2,0", //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 10 //每页条数
      },
      //获取所属团队参数
      teamParams: {
        function: "getMyTeamTree"
      },
      // paramas: {
      //   function: "findByUser"
      // },
      //获取派发人
      userParams: {
        function: "findBySuperTeamId",
        teamId: ""
      },
      teamlist: [], //所属团队列表
      userList: [], //派法人列表
      statuslist: [
        {
          status: 1,
          text: "未发送"
        },
        {
          status: 2,
          text: "办理中"
        },
        {
          status: 3,
          text: "已处理(待审核)"
        },
        {
          status: 4,
          text: "已完成"
        },
        {
          status: 5,
          text: "收回"
        },
        {
          status: 6,
          text: "退回"
        }
      ],
      // newstatus: [],
      btntitle: "新增任务",
      search: {
        function: "geFindtList",
        page: 1, //当前页数
        limit: 10, //每页条数
        state: "1,2,0",
        layouttime: "",
        layouttimeTo: "",
        teamname: "",
        createname: "",
        person: "",
        endtime: "",
        endtimeTo: "",
        status: "",
        taskname: ""
      },
      value: "",
      activeName: "待办",
      tableData: [],
      total: 0,
      id: "",
      // list: [] //选择团队弹窗数据
      taskrate1: 0,
      taskrate2: 0,
      taskrate3: 0,
      addrate1: 0,
      addrate2: 0,
      addrate3: 0,
      evalute_params: {
        function: "getEvaluate",
        taskid: "",
        evaluate: ""
      }
    };
  },
  mounted() {},
  created() {
    this.initData();
    this.teamList();
    // this.getTeam();
    this.newstatus = this.statuslist.filter(
      el => el.status == 1 || el.status == 2
    );
  },
  methods: {
    dialogClose() {
      this.dialogShow = false;
    },
    evalute(id) {
      this.dialogVisible = true;
      this.evalute_params.taskid = id;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    exportData(){
     exportTable.exportExcel("我的任务");
    },
    submitEvalute() {
      this.evalute_params.evaluate = `${this.addrate1},${this.addrate2},${this.addrate3}`;
      console.log(this.evalute_params);
      this.$post
        .postData(
          "getEvaluate",
          JSON.stringify(this.evalute_params),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dialogVisible = false;
            this.initData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.haveRead == false) {
        return "warning-row";
      } else if (row.haveRead == true) {
        return "success-row";
      }
      return "";
    },
    // 页面初始化加载数据
    initData() {
      // this.loading = true;
      this.$post
        .postData(
          "getList",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.rwgl
        ) 
        .then(res => { 
          // this.tableData = res.data.rows;
          // this.pagination.total = res.data.total;
          this.tableData = res.data.rows;
          this.total = res.data.total;
          this.tableData.forEach(el => {
            this.taskrate1 = el.evaluate.split(',')
            // if (el.evaluate) {
            //   this.taskrate1 = parseInt(el.evaluate.substr(0, 1));
            //   this.taskrate2 = parseInt(el.evaluate.substr(2, 1));
            //   this.taskrate3 = parseInt(el.evaluate.substr(4, 1));
            //   // console.log(this.taskrate1, this.taskrate2, this.taskrate3);
            // }
          });

          // if (this.readFlag != "" && this.readFlag != 1) {
          //   this.$post
          //     .postData(
          //       "doUpdateReadRecord",
          //       JSON.stringify({
          //         function: "doUpdateReadRecord",
          //         pcsAvyId: res.data.pcsAvyId,
          //         processInstId: res.data.processInstId,
          //         multiTenancyId: res.data.multiTenancyId
          //       }),
          //       this.$businessCode.ggqbgl,null,loadingFlag
          //     )
          //     .then(res => {
          //       window.opener.location.reload();
          //       //更新状态用。暂时不用任何操作
          //     });
          // }
          // this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //所属团队列表
    teamList() {
      this.$post
        .postData(
          "getMyTeamTree",
          JSON.stringify(this.teamParams),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          this.teamlist = res.data.children;
          this.teamlist.forEach(el => {
            if (el.isdelete == "1") {
              this.$set(el, "color", "gray");
            }
          });
          console.log(this.teamlist);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //搜索
    submitForm() {
      console.log(this.search.layouttime, this.search.layouttimeTo);
      let layouttime = Date.parse(this.search.layouttime.replace(/\-/g, "/"));
      let layouttimeTo = Date.parse(
        this.search.layouttimeTo.replace(/\-/g, "/")
      );

      let endtime = Date.parse(this.search.endtime.replace(/\-/g, "/"));
      let endtimeTo = Date.parse(this.search.endtimeTo.replace(/\-/g, "/"));
      if (layouttimeTo < layouttime || endtimeTo < endtime) {
        this.$message({
          showClose: true,
          message: "起始日期不能大于结束日期",
          type: "warning"
        });
        return;
      }
      this.loading = true;
      this.$post
        .postData(
          "geFindtList",
          JSON.stringify(this.search),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows;
          this.total = res.data.total;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //tab切换
    handleTabsClick(tab, event) {
      // console.log(tab.index);
      if (tab.index == "0") {
        this.btnSea = true;
        this.isAdd = false;
        this.bank_countersignature.state = "1,2,3,4,5,6";
        this.search.state = "1,2,3,4,5,6";
        this.iscomplete = false;
        // this.newstatus = this.statuslist.filter(el => el.status !== 4);
      } else if (tab.index == "1") {
        this.btnSea = false;
        this.isAdd = true;
        this.bank_countersignature.state = "1,2,0";
        this.search.state = "1,2,0";
        this.iscomplete = false;
        // this.newstatus = this.statuslist.filter(
        //   el => el.status == 1 || el.status == 2
        // );
      } else if (tab.index == "2") {
        this.btnSea = false;
        this.isAdd = false;
        this.bank_countersignature.state = "3,6";
        this.search.state = "3,4,6";
        this.iscomplete = false;
        // this.newstatus = this.statuslist.filter(
        //   el => el.status == 3 || el.status == 6 || el.status == 4
        // );
      } else if (tab.index == "3") {
        this.btnSea = false;
        this.isAdd = false;
        this.bank_countersignature.state = "5";
        this.search.state = "5";
        this.iscomplete = false;
        // this.newstatus = this.statuslist.filter(el => el.status == 5);
      } else {
        this.btnSea = false;
        this.isAdd = false;
        this.bank_countersignature.state = "4";
        this.search.state = "4";
        this.iscomplete = true;
        // this.newstatus = this.statuslist.filter(el => el.status == 4);
      }
      this.initData();
    },
    toFatherTask(row) {
      console.log(111);
      if (row.fatherTaskid !== undefined) {
        if (row.fatherclick == "0") {
          const routeData = this.$router.resolve({
            name: "taskHandle",
            query: { taskid: row.fatherTaskid }
          });
          window.open(routeData.href, "_blank");
          // this.$router.push({
          //   name: "taskHandle",
          //   query: { taskid: row.fatherTaskid }
          // });
        } else {
          this.$message.error("您没有查看此任务的权限!");
        }
      }
    },
    //点击表格数据
    change(row) {
      console.log(row);
      // if (row.id) {
      //   this.id = row.id;
      //   if (row.status == "未发送") {
      //     const routeData = this.$router.resolve({
      //       path: "/addTask",
      //       query: { taskOrderId: this.id, status: 1 }
      //     });
      //     window.open(routeData.href, "_blank");
      //   } else if (row.status == "已收回") {
      //     const routeData = this.$router.resolve({
      //       path: "/addTask",
      //       query: { taskOrderId: this.id }
      //     });
      //     window.open(routeData.href, "_blank");
      //   } else {
      //     const routeData = this.$router.resolve({
      //       path: "/taskHandle",
      //       query: { taskOrderId: this.id }
      //     });
      //     window.open(routeData.href, "_blank");
      //   }
      // } else {
      //   this.id = row.taskId;
      //   if (row.status == "未发送") {
      //     const routeData = this.$router.resolve({
      //       path: "/addTask",
      //       query: { taskid: this.id, status: 1 }
      //     });
      //     window.open(routeData.href, "_blank");
      //   } else if (row.status == "已收回") {
      //     const routeData = this.$router.resolve({
      //       path: "/addTask",
      //       query: { taskid: this.id }
      //     });
      //     window.open(routeData.href, "_blank");
      //   } else {
      //     const routeData = this.$router.resolve({
      //       path: "/taskHandle",
      //       query: { taskid: this.id }
      //     });
      //     window.open(routeData.href, "_blank");
      //   }
      // }
      // console.log(this.id);
      this.id = row.taskId;
      if (row.status == "未发送") {
        const routeData = this.$router.resolve({
          path: "/addTask",
          query: { taskid: this.id, status: 1 ,haveRead:row.haveRead}
        });
        window.open(routeData.href, "_blank");
      } else if (row.status == "已收回") {
        const routeData = this.$router.resolve({
          path: "/addTask",
          query: { taskid: this.id, status: 5 ,haveRead:row.haveRead}
        });
        window.open(routeData.href, "_blank");
      } else if (row.status == "已完成") {
        const routeData = this.$router.resolve({
          path: "/taskHandle",
          query: { taskid: this.id,status:4 ,haveRead:row.haveRead}
        });
        window.open(routeData.href, "_blank");
      } else {
        const routeData = this.$router.resolve({
          path: "/taskHandle",
          query: { taskid: this.id ,haveRead:row.haveRead}
        });
        window.open(routeData.href, "_blank");
      }
      // else if (row.status == "办理中") {
      //   const routeData = this.$router.resolve({
      //     path: "/taskHandle",
      //     query: { taskid: this.id }
      //   });
      //   window.open(routeData.href, "_blank");
      //   // this.$router.push({ name: "taskHandle", query: { taskid: this.id } });
      // } else if (row.status == "待审核") {
      //   const routeData = this.$router.resolve({
      //     path: "/taskHandle",
      //     query: { taskid: this.id }
      //   });
      //   window.open(routeData.href, "_blank");
      // } else if (row.status == "已退回") {
      //   const routeData = this.$router.resolve({
      //     path: "/taskHandle",
      //     query: { taskid: this.id }
      //   });
      //   window.open(routeData.href, "_blank");
      // } else if (row.status == "已处理") {
      //   const routeData = this.$router.resolve({
      //     path: "/taskHandle",
      //     query: { taskid: this.id }
      //   });
      //   window.open(routeData.href, "_blank");
      // } else if (row.status == "已完成") {
      //   const routeData = this.$router.resolve({
      //     path: "/taskHandle",
      //     query: { taskid: this.id }
      //   });
      //   window.open(routeData.href, "_blank");
      // }
    },

    //分页
    handleSizeChange(val) {
      this.bank_countersignature.limit = val;
      this.initData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.initData();
      console.log(`当前页: ${val}`);
    },
    //新增任务
    addtask() {
      // this.$refs.dialog.openDialog();
      this.dialogShow = true;
    },
    //选择团队搜索
    checkchange(val) {
      console.log(val);
      this.userParams.teamId = val;
      this.$post
        .postData(
          "findBySuperTeamId",
          JSON.stringify(this.userParams),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          this.userList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
/deep/.el-select-dropdown.el-popper {
  max-height: 300px;
  overflow-y: auto;
}
.table_scroll ::-webkit-scrollbar {
  display: inline-block;
  width: 5px;
  height: 7px;
}
/deep/.el-table .warning-row {
  color: red;
  .el-table_2_column_12 {
    color: #606266;
  }
}
/deep/.endTime .el-form-item__content {
  margin-left: 0 !important;
}
/deep/.el-form-item__content {
  display: flex;
}
</style>
