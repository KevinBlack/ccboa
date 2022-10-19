<template>
  <div v-cloak>
    <el-row>
      <el-col>
        <el-form
          :model="bank_countersignature"
          ref="bank_countersignature"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="统计日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange"
                    v-model="draftTime"
                    type="monthrange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    style="max-width:300px;"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                  <!-- :picker-options="pickerOptions" -->
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="width:33.3%; height: 10px;">
            </el-col>
            <el-col :span="8">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">开始统计</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col :span="24" style="padding:10px;">
        <table class="stcs_table">
          <tr class="table-first">
            <td>
              <h3 style="font-weight: bold;">统计结果</h3>
            </td>
            <td class="txtRight">
              <el-button @click="exportData">导出</el-button>
            </td>
          </tr>
          <tr>
            <td>表头：签报正文字数统计表</td>
          </tr>
          <tr>
            <td>
              统计日期：{{bank_countersignature.draftTimeStart.split('-')[0]}}年{{bank_countersignature.draftTimeStart.split('-')[1]}}月-
              {{bank_countersignature.draftTimeEnd.split('-')[0]}}年{{bank_countersignature.draftTimeEnd.split('-')[1]}}月
              <br />
              <span style="font-weight: 700;">说明：</span>
              <br />1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。
              <br />2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
            </td>
          </tr>
        </table>
      </el-col>
      <!-- <el-col class="mt20end">    v-if="isEnd" -->
      <el-col style="margin: 10px 0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="false"
          :isPagination="true"
          :isHandle="false"
          id="table"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
           @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";

const finshData = [
  { label: "部门名称", prop: "bumen", align: "center" },
  { label: "字数<=500件数", prop: "xyCount", align: "center" },
  { label: "字数区间501-1000件数", prop: "qjCount", align: "center" },
  { label: "字数>=1000件数", prop: "dyCount", align: "center" }
];
export default {
  // 协办情况
  components: {
    mTable,
    dateFormate
  },
  data() {
    return {
      bank_countersignature: {
        function: "queryTJQianbaoCount",
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0,
        draftTimeStart:"",
        draftTimeEnd:"",
      },
      draftTime: "",
      down: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: ""
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0
      }
    };
  },
  methods: {
    initData() {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_countersignature));
      if( this.bank_countersignature.draftTimeStart == '' ){
        this.$message({
          type: "warning",
          offset: 400,
          showClose: true,
          message: "请选择统计日期",
          duration: 1000
        });
        return
      }

      this.$post
        .postData(
          "queryTJQianbaoCount",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = this.bank_countersignature.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleTabsClick(tab, event) {
      this.tableLoading = true;
      if (tab.index == "3") {
        this.tableCols = finshData;
        this.isEnd = true;
      } else {
        this.tableCols = otherData;
        this.isEnd = false;
      }
      this.tableLoading = false;
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (this.draftTime && this.draftTime[0]) {
        this.bank_countersignature.draftTimeStart = dateFormate.month(
          Date.parse(this.draftTime[0])
        );
        this.bank_countersignature.draftTimeEnd = dateFormate.month(
          Date.parse(this.draftTime[1])
        );
      }else{
        this.bank_countersignature.draftTimeStart = ""
        this.bank_countersignature.draftTimeEnd = ""
      }
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData()
    },
    //切换每页条数
    handleSizeChange(val) {
      this.pagination.page = this.bank_countersignature.page = 1
      this.bank_countersignature.limit = val
      this.pagination.limit = val
      this.tableData = []
      this.initData()
    },
    cellClick(row, column, cell, event) {
      // console.log(row.id);
      // this.$router.push({
      //   path: "/countersignend",
      //   query: {
      //     id: row.id
      //   }
      // });
    },
    submitForm(formName) {
      this.bank_countersignature.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    resetForm(formName) {
      this.draftTime= "";

      this.bank_countersignature.function = "queryTJQianbaoCount";
      this.bank_countersignature.draftTimeStart = "";
      this.bank_countersignature.draftTimeEnd = "";
      this.bank_countersignature.page = this.pagination.page = 1;
      this.bank_countersignature.limit = this.pagination.limit = 10;
      this.bank_countersignature.total = this.pagination.total = 0;
    },
    exportData(){
      exportTable.exportExcel("签报正文字数统计表");
    }
  },
  created() {
    if(sessionStorage.getItem('QBLIST')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.bank_countersignature.page, //第几页
      total: this.bank_countersignature.totalCount, //共有条数
      limit: this.bank_countersignature.limit, //每页条数
    }
    // this.initData();
  }
};
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 10px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}

.arrowup {
  text-align: center;
}
.table-first {
  border-bottom: 2px solid #f0f0f0;
}
.stcs_table tr {
  height: 35px;
  line-height: 35px;
}
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
  margin: 20px 0 !important;
}
.mt20 {
    margin-top: 10px;
}
/deep/ .bank_dispach_content>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px !important;
}
</style>
