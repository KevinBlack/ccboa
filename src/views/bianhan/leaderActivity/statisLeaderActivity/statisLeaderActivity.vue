/**
* create by zx on 2020/7/24 14:42
* 类注释：领导活动安排统计
* 备注：
*/
<template>
  <div class="statisLeaderActivity">
    <div class="formHeader">
      <div class="title-text">领导活动安排统计</div>
    </div>
    <div style="margin:20px 0">
      <el-button type="primary" @click="exportExcel">导出excel</el-button>
    </div>
    <el-form
      :model="form"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top:20px;"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="主持行领导">
            <el-select v-model="form.leaderCheckedValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.leaderHumanId"
                :label="item.leaderCnName"
                :value="item.leaderHumanId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker v-model="form.endDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="submit">统计查询</el-button>
          <el-button @click="rest">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <m-table
      id="table"
      @refresh="loadData()"
      :isHandle="false"
      :searchData="formData"
      :isPagination="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "@/components/table/tTable";
import exportTable from "@/minixs/exportTable";
export default {
  name: "statisLeaderActivity",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      form: {
        startDate: "", //开始时间
        endDate: "", //结束时间
        attendBankLeader: "", //行领导
        leaderCheckedValue:''
      },

      formData: {},
      // 表格字段
      tableCols: [
        { label: "活动类型", prop: "activeType" },
        { label: "次数", prop: "number" }
      ],
      // 分页
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      tableData: [], //表格数据
      options: [] //行领导
    };
  },
  computed: {},
  methods: {
    // 点击行方法
    cellClick(row) {
      console.log(row, "行数据");
    },
    submit() {
      this.loadData();
    },
    rest() {
      this.form.startDate = ""; //开始时间
      this.form.endDate = ""; //结束时间
      this.form.leaderCheckedValue = ""; //行领导
    },
    // 获取统计表格数据
    loadData() {
      this.$api.secreatary.activety
        .tongjilist(
          { ...this.form },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "统计");
          this.tableData = res.data;
          this.pagination.total = res.total;

        });
    },
    // 导出excel
    exportExcel() {
      console.log(this.tableData);
      if (this.tableData.lenght<=0) {
        this.$message({
          showClose: true,
          message: "请查询后导出！！！",
          type: "error"
        });
        return
      }
      exportTable.exportExcel("领导活动安排统计");
    }
  },
  activated() {},
  mounted() {},
  created() {
    // this.loadData();
    //获取行领导
    this.$api.secreatary.activety.statistical({}).then(res => {
      console.log(res, "统计行领导");
      this.options = res.data;
    });
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
</style>
