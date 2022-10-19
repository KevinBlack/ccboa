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
                <el-form-item label="创建人" prop="name">
                  <el-input v-model="search.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属团队">
                  <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                      v-for="item in search.team"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="margin-left:20px">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">清空</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addlog">新增{{title}}</el-button> -->
      <el-row style="margin-top:10px">
        <el-col>
          <el-table
            :data="tableData"
            style="width:90%"
            border
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :default-sort="{ prot: 'date', order: 'descnding' }"
            highlight-current-row
            @current-change="change"
          >
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="date" sortable label="所属团队" width="350"></el-table-column>
            <el-table-column prop="address" sortable label="创建人" width="350"></el-table-column>
            <el-table-column prop="date" v-if="active==0 || active==3" sortable label="发布日期"></el-table-column>
            <el-table-column
              prop="date"
              v-if="active==1 || active==2"
              sortable
              label="开始时间"
              width="350"
            ></el-table-column>
            <el-table-column prop="date" v-if="active==1 || active==2" sortable label="结束时间"></el-table-column>
            <el-table-column prop="address" v-if="active==1" sortable label="周" width="120"></el-table-column>
          </el-table>
          <el-pagination
            style="margin-top:10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "日报",
      active: 0,
      activeName: "tabs-all",
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 5, //每页数据
      total: "",
      value: "",
      search: {
        name: "",
        team: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          }
        ]
      }
    };
  },
  created() {
    this.haveTableData();
  },
  methods: {
    handleTabsClick(tab, event) {
      //   console.log(tab);
      this.title = tab.label;
      this.active = tab.index;
      console.log(this.active);
      console.log(this.title);
    },
    //新增日志
    // addlog() {
    //   if (this.title == "日报") {
    //     this.$router.push("/dayLog");
    //     sessionStorage.setItem("logTitle", JSON.stringify(this.title));
    //   } else if (this.title == "周报") {
    //     this.$router.push("/weekLog");
    //     sessionStorage.setItem("logTitle", JSON.stringify(this.title));
    //   } else if (this.title == "月报") {
    //     this.$router.push("/monthLog");
    //     sessionStorage.setItem("logTitle", JSON.stringify(this.title));
    //   } else {
    //     this.$router.push("/mettingLog");
    //     sessionStorage.setItem("logTitle", JSON.stringify(this.title));
    //   }
    // },
    //搜索
    submitForm() {},
    //清空
    resetForm() {
        this.search.name='';
        this.value=''
    },
    haveTableData() {
      this.tableData = [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 3,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 3,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 3,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ];
      this.total = this.tableData.length;
    },
    // 点击行查看
    change(row) {
      console.log(row);

    },
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.haveTableData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.haveTableData();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
</style>