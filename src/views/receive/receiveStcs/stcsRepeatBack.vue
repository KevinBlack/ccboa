 <template>
  <div>
    <el-row>
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="统计日期1">
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
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="统计日期2">
                <div class="block">
                  <el-date-picker
                    @change="timeChange2"
                    v-model="times2"
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
            <!-- <el-col :span="6">
              <el-form-item label="收文单位" prop="hostDepartment">
                <el-input v-model="ruleForm.hostDepartment" readonly="readonly" placeholder="请选择"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary">选择</el-button>
            </el-col>-->
            <el-col :span="8">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">统计</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col :span="24" style="padding:20px;">
        <table class="stcs_table">
          <tr class="table-first">
            <td>
              <h3 style="font-weight: bold;">统计结果</h3>
            </td>
            <td class="txtRight">
              <el-button style="text-align:right;" size="small" @click="exportExc" v-preventClick class="mrg-b-20">导 出</el-button>
            </td>
          </tr>
          <tr>
            <td>表头：下机机构上报文件重复，被退回率统计</td>
          </tr>
          <tr>
            <td>
              统计日期1：{{start1}}
              <span v-if="start1">至</span>
              {{end1}}
              <br />
              统计日期2：{{start2}}
              <span v-if="start2">至</span>
              {{end2}}
              <br />
              <span style="font-weight: 700;">说明：</span>
              <br />1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。
              <br />2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
              <br />3.境内：包括境内下级分行，境内子公司
              <br />4.境外：包括海外机构（海外分行+境外子公司+代表处）
            </td>
          </tr>
        </table>
      </el-col>
      <!-- <el-col class="mt20end">    v-if="isEnd" -->
      <el-col style="margin: 20px 0;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="unitName" label="机构名称" style="width:20%;" align="center"></el-table-column>

          <el-table-column label="上级文件" align="center">
            <el-table-column prop="sbCount1" label="上报文件1" style="width:10%;" align="center"></el-table-column>
            <el-table-column prop="sbCount2" label="上报文件2" style="width:10%;" align="center"></el-table-column>
            <el-table-column prop="sbwRate" label="上报文件增减（±%）" style="width:10%;" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="重发率" align="center">
            <el-table-column prop="reSendCount1" label="重发文件1" style="width:10%;" align="center"></el-table-column>
            <el-table-column prop="reSendCount2" label="重发文件2" style="width:10%;" align="center"></el-table-column>
            <el-table-column prop="reSendRate" label="重发率增减（±%）" style="width:10%;" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="被退回率" align="center">
            <el-table-column prop="backCount1" label="被退回文件1" style="width:10%;" align="center"></el-table-column>
            <el-table-column prop="backCount2" label="被退回文件2" style="width:10%;" align="center"></el-table-column>
            <el-table-column prop="backRate" label="被退回率增减（±%）" style="width:10%;" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="重发、被退回率" align="center">
            <el-table-column
              prop="resendBackCount1"
              label="重发被退回件数1"
              style="width:10%;"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="resendBackCount2"
              label="重发被退回件数2"
              style="width:10%;"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="resendBackRate"
              label="重发、被退回率增减（±%）"
              style="width:10%;"
              align="center"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="24" style="padding:20px ;">
        <table class="stcs_table">
          <tr>
            <td>
              <br />
              <span style="font-weight: 700;">说明：</span>
              <br />1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。
              <br />2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
              <br />3.境内：包括境内下级分行，境内子公司
              <br />4.境外：包括海外机构（海外分行+境外子公司+代表处）
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";
export default {
  // 按收文类型统计
  name: "StcsRecordType",
  data() {
    return {
      start1:'',
      end1:'',
      start2:'',
      end2:'',
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
        function: "statisticsLowerBankReSendAndBackDocPercent",
        state: 1,
        startTime: "", //   统计起始日期
        endTime: "", //    统计结束日期
        startTime2: "", //   统计起始日期
        endTime2: "" //    统计结束日期
      },

      tableData: [],
      times: "",
      times2: ""
    };
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("收文下机机构上报文件重复，被退回率统计表",".el-table");
    },
    initData() {
      this.$post
        .postData(
          "statisticsLowerBankReSendAndBackDocPercent",
          JSON.stringify(this.ruleForm),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择时间
    timeChange(rangeTime) {
      if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
        this.ruleForm.startTime = "";
        this.ruleForm.endTime = "";
        return false;
      }
      this.ruleForm.startTime = this.start1 = dateFormate.date(Date.parse(this.times[0]));
      //this.start1 = dateFormate.date(Date.parse(this.times[0]),"YYYY-MM");
      this.ruleForm.endTime = this.end1 = dateFormate.date(Date.parse(this.times[1]));
      // this.end1 = dateFormate.date(Date.parse(this.times[1]),"YYYY-MM")
      // this.ruleForm.endTime = this.ruleForm.endTime.split('-');
      // this.ruleForm.endTime[2] = parseInt(this.ruleForm.endTime[2])+30;
      // this.ruleForm.endTime = this.ruleForm.endTime.join('-');
    },
    // 选择时间
    timeChange2(rangeTime) {
      if (this.ruleForm.endTime) {
        if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
          this.ruleForm.startTime2 = "";
          this.ruleForm.endTime2 = "";
          // return false;
        } else {
            this.ruleForm.startTime2 = dateFormate.date(Date.parse(this.times2[0]));
            if(this.ruleForm.startTime2 > this.ruleForm.endTime){
              this.ruleForm.startTime2 = this.start2 = dateFormate.date(Date.parse(this.times2[0]));
              //this.start2 = dateFormate.date(Date.parse(this.times2[0]),"YYYY-MM");
              this.ruleForm.endTime2 = this.end2 = dateFormate.date(Date.parse(this.times2[1]));
              // this.end2 = dateFormate.date(Date.parse(this.times2[1]),"YYYY-MM")
              // this.ruleForm.endTime2 = this.ruleForm.endTime2.split('-');
              // this.ruleForm.endTime2[2] = parseInt(this.ruleForm.endTime2[2])+30;
              // this.ruleForm.endTime2 = this.ruleForm.endTime2.join('-');
            } else {
              this.times2 = "";
              this.$message({
                type: "error",
                message: "日期2必须大于日期1"
              });
            }
          }
      } else {
        this.times2 = "";
        this.$message({
          type: "error",
          message: "请先选择第一个日期"
        });
      }
    },
    submitForm(formName) {
      if (this.times && this.times2) {
        this.initData();
      } else {
        this.$message({
          type: "error",
          message: "请选择日期"
        });
      }
    },
    resetForm(formName) {
      (this.times = ""),
        (this.times2 = ""),
        (this.ruleForm.startTime = ""), //   统计起始日期
        (this.ruleForm.endTime = ""); //    统计结束日期
      this.ruleForm.startTime2 = "";
      this.ruleForm.endTime2 = "";
    }
  },
  created() {
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
</style>
