<template>
  <div>
    <el-row>
      <el-col>
        <el-form label-width="90px" class="demo-ruleForm mt20">
          <el-row style="display:flex">
            <el-form-item label="统计日期">
              <el-date-picker v-model="bank_Params.startTime" type="date" placeholder="起始日期" value-format="yyyy-MM-dd"></el-date-picker>至
              <el-date-picker v-model="bank_Params.endTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <div style="margin-left:20px">
              <el-button type="primary" @click="submitForm">统计</el-button>
            </div>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:20px">
      <el-tab-pane v-for="(item,index) in keyWordsList" :key="index" :label="item" :name="item"></el-tab-pane>
      <el-row>
        <el-col>
          <el-table
            :data="tableData"
            style="width:100%"
            border
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :default-sort="{ prot: 'date', order: 'descnding' }"
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="keyWords" label="关键词">
              <!-- <template slot-scope="scope">
                <el-button type="text">{{ scope.row.title }}</el-button>
              </template>-->
            </el-table-column>
            <el-table-column prop="solrNum" sortable label="搜索次数"></el-table-column>
            <el-table-column prop="solrPerson" sortable label="搜索人数"></el-table-column>
          </el-table>
          <el-pagination
            style="margin-top:10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="bank_Params.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="bank_Params.limit"
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
      bank_Params: {
        function: "countHot",
        page: 1,
        limit: 10,
        startTime: "",
        endTime: "",
        mbType: 0
      },
      activeName: "关键词",
      total: 0,
      tableLoading: false,
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 5, //每页数据
      keyWordsList: [
        "关键词",
        // "发文类型",
        // "业务分类",
        // "代字红头",
        // "文种",
        // "呈送件处理类型",
        // "呈送件字号",
        // "签报处理类型",
        // "签报类型",
        // "签报字号"
      ]
    };
  },
  created() {
    this.haveTableData();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index);
      this.bank_Params.mbType = tab.index;
      this.haveTableData();
    },
    submitForm() {
      this.haveTableData();
    },
    haveTableData() {
      this.$post
        .postData(
          "countHot",
          JSON.stringify(this.bank_Params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页
    handleSizeChange(val) {
      this.bank_Params.limit = val;
      // this.haveTableData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.bank_Params.page = val;
      // this.haveTableData();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.el-form-item__content {
  display: flex;
}
/deep/ .el-card__body {
  padding: 0;
}
.clearfix {
  height: 30px;
  border-bottom: 1px solid #eee;
  margin-top: 30px;
  font-weight: bolder;
}
.num {
  font-size: 12px;
}
/deep/.el-tabs--card > .el-tabs__header {
  border: none;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #e4e7ed;
  margin-right: 10px;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background: #409eff;
  color: #fff;
}
</style>