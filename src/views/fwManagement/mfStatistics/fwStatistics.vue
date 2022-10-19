<template>
  <div>
    <el-row>
      <el-col>
        <el-form>
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
      <el-tab-pane label="模板" name="0"></el-tab-pane>
      <el-tab-pane label="范文" name="1"></el-tab-pane>
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
            <el-table-column prop="sampleName" label="示例标题">
              <!-- <template slot-scope="scope">
                <el-button type="text">{{ scope.row.title }}</el-button>
              </template>-->
            </el-table-column>
            <el-table-column prop="uploadDeptName" label="上传部门"></el-table-column>
            <el-table-column prop="lookNum" label="浏览次数"></el-table-column>
            <el-table-column prop="paraphraseNum" v-if="modelName=='模板'" label="套用次数"></el-table-column>
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
      activeName: "0",
      // search: {
      //   fabuTimeFrom: "", //起始日期
      //   fabuTimeTo: "" //结束时间
      // },
      bank_Params: {
        function:'countModel',
        page: 1,
        limit: 10,
        startTime: "",
        endTime: "",
        mbType: 0
      },
      modelName: "模板",
      total: 0,
      tableLoading: false,
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 5 //每页数据
      // total: "",
    };
  },
  created() {
    this.haveTableData();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.index);
      if (tab.index == "0") {
        this.modelName = "模板";
        this.bank_Params.mbType = 0;
        this.haveTableData();
      } else {
        this.modelName = "范文";
        this.bank_Params.mbType = 1;
        this.haveTableData();
      }
    },
    submitForm() {
      this.haveTableData();
    },
    haveTableData() {
       this.$post
        .postData(
          "countModel",
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
      this.haveTableData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.bank_Params.page = val;
      this.haveTableData();
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