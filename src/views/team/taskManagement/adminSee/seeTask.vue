<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="search" label-width="100px" class="demo-ruleForm mt20">
          <el-row>
            <el-col :span="9">
              <el-form-item label="布置时间">
                <el-date-picker v-model="search.layouttime" type="date" value-format="yyyy-MM-dd"></el-date-picker>至
                <el-date-picker v-model="search.layouttimeTo" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="所属团队">
                <el-select v-model="search.teamname" placeholder="请选择" clearable @change="checkchange">
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
              <el-form-item label="派发人">
                <el-select v-model="search.createname" placeholder="请选择" clearable no-data-text="请选择">
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
              <el-form-item label="任务责任人">
                <el-select v-model="search.person" placeholder="请选择" clearable no-data-text="请选择">
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
            <el-col :span="9">
              <el-form-item label="截止时间">
                <el-date-picker v-model="search.endtime" type="date" value-format="yyyy-MM-dd"></el-date-picker>至
                <el-date-picker v-model="search.endtimeTo" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="状态">
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
              <el-form-item label="任务名称">
                <el-input v-model="search.taskname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="margin-left:60px">
              <el-button type="primary" @click="submitForm">搜索</el-button>
              <el-button type="primary" @click="resetForm">清空</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <div slot="header" class="clearfix">
      <span>
        任务查询结果
        <span style="font-size:12px">(共{{total}}条)</span>
      </span>
      <div style="float: right;">
        <el-button type="primary">导出查询结果</el-button>
        <el-button type="primary">删除</el-button>
      </div>
    </div>
    <el-row style="margin-top:20px">
      <el-col>
        <el-scrollbar>
          <el-table
            :data="tableData"
            style="width:100%"
            border
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :default-sort="{ prot: 'date', order: 'descnding' }"
            @row-click="change"
            highlight-current-row
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="layouttime" sortable label="布置时间" width="180"></el-table-column>
            <el-table-column prop="taskname" sortable label="任务名称" width="180"></el-table-column>
            <el-table-column prop="teamname" sortable label="所属团队" width="180"></el-table-column>
            <el-table-column prop="createname" sortable label="派发人" width="150"></el-table-column>
            <el-table-column prop="noticetype" sortable label="任务通知方式" width="150"></el-table-column>
            <el-table-column prop="endtime" sortable label="截止时间" width="150"></el-table-column>
            <el-table-column prop="person" sortable label="任务责任人" width="150"></el-table-column>
            <el-table-column prop="status" sortable label="状态" width="150"></el-table-column>
            <el-table-column prop="fatherTaskname" label="上一级任务" width="150">
              <template slot-scope="scope">
                <span @click.stop="toFatherTask(scope.row)">{{scope.row.fatherTaskname}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="子任务数"></el-table-column>
          </el-table>
        </el-scrollbar>
        <el-pagination
          style="margin-top:10px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="search.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="search.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      newstatus: [],
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
      activeName: "tabs-wait",
      tableLoading: false,
      tableData: [],
      total: 0,
      id: ""
      // list: [] //选择团队弹窗数据
    };
  },
  created() {
    this.teamList();
  },
  methods: {
    //所属团队列表
    teamList() {
      this.$post
        .postData("getMyTeamTree", JSON.stringify(this.teamParams), this.$businessCode.tdgl)
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
    //分页
    handleSizeChange(val) {
      this.search.limit = val;
      this.submitForm();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.search.page = val;
      this.submitForm();
      console.log(`当前页: ${val}`);
    },
    //搜索
    submitForm() {
      console.log(this.search);
      this.$post
        .postData("geFindtList", JSON.stringify(this.search), this.$businessCode.rwgl)
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //清空
    resetForm() {
      this.search = {};
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
    },
    toFatherTask(row) {
      console.log(111);
      if (row.fatherTaskid !== undefined) {
        if (row.fatherclick == "0") {
          this.$router.push({
            name: "taskHandle",
            query: { taskid: row.fatherTaskid }
          });
        } else {
          this.$message.error("您没有查看此任务的权限!");
        }
      }
    },
    //点击表格数据
    change(row) {
      console.log(row);
      this.id = row.taskId;
      // console.log(this.id);
      if (row.status == "未发送") {
        this.$router.push({
          name: "addTask",
          query: { taskid: this.id, status: 1 }
        });
      } else if (row.status == "办理中") {
        this.$router.push({ name: "taskHandle", query: { taskid: this.id } });
      } else if (row.status == "待审核") {
        this.$router.push({ name: "taskHandle", query: { taskid: this.id } });
      } else if (row.status == "已退回") {
        this.$router.push({ name: "taskHandle", query: { taskid: this.id } });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.clearfix {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
</style>