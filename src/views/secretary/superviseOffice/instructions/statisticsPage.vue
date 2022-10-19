<template>
  <div>
    <el-row>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm mt20"
        :class="{mtdown:down}"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item label="统计类型">
              <el-radio-group v-model="ruleForm.statisType" @change="tableData = ''">
                <el-radio label="主办">主办</el-radio>
                <el-radio label="独立承办">独立承办</el-radio>
                <el-radio label="配合协办">配合协办</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="统计跨度">
              <el-radio-group v-model="ruleForm.statisScope" @change="timeTypeChange()">
                <el-radio label="月份">月份</el-radio>
                <el-radio label="年度">年度</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>-->
          <el-col :span="10">
            <el-form-item label="统计日期">
              <div class="block">
                <el-date-picker
                  @change="timeChange"
                  v-model="times"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  size="small"
                  type="daterange"
                  range-separator="-"
                  start-placeholde="开始日期"
                  end-placeholde="结束日期"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-button type="primary" @click="submitForm">开始统计</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-col :span="24" style="padding:20px;">
        <table class="stcs_table">
          <tr class="table-first">
            <td>
              <h3 style="font-weight: bold;">统计结果</h3>
            </td>
            <td class="txtRight">
              <el-button
                style="text-align:right;"
                size="small"
                @click="exportExc"
                v-preventClick
                class="mrg-b-20"
              >导 出</el-button>
            </td>
          </tr>
          <tr>
            <td v-if="ruleForm.statisType == '主办'">表头：各部门主办下级行请示事项办理效率统计表</td>
            <td v-if="ruleForm.statisType == '独立承办'">表头：各部门独立承办下级行请示事项办理效率统计表</td>
            <td v-if="ruleForm.statisType == '配合协办'">表头：各部门配合协办下级行请示事项办理效率统计表</td>
          </tr>
          <tr>
            <td>
              统计日期：{{ruleForm.startTime }}
              <span v-if="ruleForm.startTime">至</span>
              {{ruleForm.endTime }}
              <!-- <br />
              <span style="font-weight: 700;">说明：</span>
              <br />1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。
              <br />2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
              <br />3.境内：包括境内下级分行，境内子公司
              <br />4.境外：包括海外机构（海外分行+境外子公司+代表处）-->
            </td>
          </tr>
        </table>
      </el-col>
      <!-- <el-col class="mt20end">
        <el-col style="margin: 20px 0;" class="el_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="unitName" label="部门名称" align="center"></el-table-column>
          <el-table-column prop="swswCount" label="承办件数" align="center"></el-table-column>
          <el-table-column prop="swswCount" label="已办结件数" align="center"></el-table-column>
          <el-table-column prop="swswCount" label="未办结件数" align="center"></el-table-column>
          <el-table-column prop="swswCount" label="办结率" align="center"></el-table-column>
          <el-table-column prop="swswCount" label="处理工作日" align="center"></el-table-column>
          <el-table-column prop="swswCount" label="与上年同期相比" align="center"></el-table-column>
          <el-table-column prop="swswCount" label="最长处理工作日" align="center"></el-table-column>
        </el-table>
      </el-col>

      v-if="isEnd"-->
       <el-col style="margin: 20px 0;" class="el_table" v-show="ruleForm.statisType == '主办'">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="dept_name" label="主办部门" align="center"></el-table-column>
        <el-table-column prop="zb_count" label="主办件数" align="center"></el-table-column>
        <el-table-column prop="zb_bj_count" label="已办结件数" align="center"></el-table-column>
        <el-table-column prop="wbj_count" label="未办结件数" align="center"></el-table-column>
        <el-table-column prop="bj_rate" label="办结率" align="center"></el-table-column>
        <el-table-column prop="disposeDuration" label="处理工作日" align="center"></el-table-column>

        <el-table-column label="需要其他部门协办事项" align="center">
          <el-table-column prop="qt_count" label="牵头件数" align="center"></el-table-column>
          <el-table-column prop="qt_bj_count" label="已办结件数" align="center"></el-table-column>
          <el-table-column prop="qt_wbj_count" label="未办结件数" align="center"></el-table-column>
          <el-table-column prop="xb_count" label="协办次数" align="center"></el-table-column>
          <el-table-column prop="hasXb_time" label="处理工作日" align="center"></el-table-column>
          <el-table-column prop="exceed_ten_days" label="主办部门超10个工作日" align="center"></el-table-column>
          <el-table-column prop="xb_fk_time" label="协办反馈用时" align="center"></el-table-column>
          <el-table-column prop="assist_exceed_three_days" label="协办部门超过3个工作日" align="center"></el-table-column>
          <el-table-column prop="qt_zb_time" label="主办部门处理用时" align="center"></el-table-column>
          <el-table-column prop="zb_avg_rate" label="主办部门用时占比平均值" align="center"></el-table-column>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col style="margin: 20px 0;" class="el_table1" v-show="ruleForm.statisType == '独立承办'">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="dept_name" label="部门名称" align="center"></el-table-column>
        <el-table-column prop="zb_count" label="承办件数" align="center"></el-table-column>
        <el-table-column prop="zb_bj_count" label="已办结件数" align="center"></el-table-column>
        <el-table-column prop="wbj_count" label="未办结件数" align="center"></el-table-column>
        <el-table-column prop="bj_rate" label="办结率" align="center"></el-table-column>
        <el-table-column prop="zb_time" label="处理工作日" align="center"></el-table-column>
        <el-table-column prop="exceed_five_days" label="超过5个工作日件数" align="center"></el-table-column>
        <el-table-column prop="max_zb_time" label="最长处理工作日" align="center"></el-table-column>
      </el-table>
    </el-col>
    <el-col style="margin: 20px 0;" class="el_table2" v-show="ruleForm.statisType == '配合协办'">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="dept_name" label="部门名称" align="center"></el-table-column>
        <el-table-column prop="xb_count" label="协办配合次数" align="center"></el-table-column>
        <el-table-column prop="xb_time" label="协办处理工作日" align="center"></el-table-column>
        <el-table-column prop="max_xb_time" label="协办处理最长用时" align="center"></el-table-column>
      </el-table>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";
export default {
  // 下级机构来文情况统计
  name: "StcsNextInstitutionSendLetter",

  components: {
    // mTable
  },
  data() {
    return {
      //timeType:'monthrange',
      tableData: [],
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
      startTime: "",
      endTime: "",
      ruleForm: {
        function: "statisticsQsReceiveSupervise",
        state: 1,
        startTime: "", //   统计起始日期
        endTime: "", //    统计结束日期
        statisScope: "",
        statisType: "主办"
      },
      times: ""
    };
  },
  methods: {
    exportExc() {
      // debugger
      switch (this.ruleForm.statisType) {
        case "主办":
          exportTable.exportExcel(
            "各部门主办下级行请示事项办理效率统计表",
            ".el_table"
          );
          break;
        case "独立承办":
          exportTable.exportExcel(
            "各部门独立承办下级行请示事项办理效率统计表",
            ".el_table1"
          );
          break;
        case "配合协办":
          exportTable.exportExcel(
            "各部门配合协办下级行请示事项办理效率统计表",
            ".el_table2"
          );
          break;
      }
    },
    initData() {
      if(this.ruleForm.startTime == ''){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择统计时间",
          duration: 1000
        });
        return
      }
      this.startTime=this.times[0];
      this.endTime=this.times[1];
      this.$post
        .postData(
          "statisticsQsReceiveSupervise",
          JSON.stringify(this.ruleForm),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data || [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    // 选择时间
    timeChange(rangeTime) {
      if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
        this.ruleForm.startTime = "";
        this.ruleForm.endTime = "";
        return false;
      }
      this.ruleForm.startTime = rangeTime[0];
      this.ruleForm.endTime = rangeTime[1];
    },
    submitForm(formName) {
      this.initData();
    },
    resetForm(formName) {
      (this.times = ""),
        (this.startTime = ""),
        (this.endTime = ""),
        (this.ruleForm.startTime = ""), //   统计起始日期
        (this.ruleForm.endTime = ""); //    统计结束日期
      this.ruleForm.statisType = "主办"; //    统计结束日期
    }
  },
  created() {
    //this.initData();
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
  padding: 20px 0 0 0;
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
.el_table > .cell {
  text-align: center;
}
</style>
<style>
.el_table >>> .cell {
  text-align: center;
}
</style>
<style scope>
.el_table1 {
  background: red;
}
</style>
