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
            <el-col :span="8">
              <el-form-item label="承办部门" prop="undertakeDeptName">
                <el-input
                  v-model="ruleForm.undertakeDeptName"
                  readonly="readonly"
                  placeholder="请选择"
                >
                  <el-button :disabled="iszhg" slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="initData">开始统计</el-button>
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
            <td>表头：按收文类型统计</td>
          </tr>
          <tr>
            <td>
              统计日期：{{start1}}
              <span v-if="start1">至</span>
              {{end1}}
              <br />
              <span style="font-weight: 700;">说明：</span>
              <br />1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。
              <br />2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
            </td>
          </tr>
        </table>
      </el-col>
      <!-- <el-col class="mt20end">    v-if="isEnd" -->
      
      <el-col style="margin: 20px 0;" v-if="iszh">
        <el-table :data="tableData">
          <el-table-column prop="unitName" label="承办部门"></el-table-column>
          <el-table-column label="行外收文">
            <el-table-column prop="sjjgCount" label="审计机构来文"></el-table-column>
            <el-table-column prop="xjhCount" label="下级机构来文">
              <el-table-column prop="jnCount" label="境内"></el-table-column>
              <el-table-column prop="jwjgCount" label="境外"></el-table-column>
              </el-table-column>
          </el-table-column>
          <el-table-column prop="hnCount" label="行内收文"></el-table-column>
          <el-table-column prop="totleCount" label="合计"></el-table-column>
        </el-table>
      </el-col>
      <el-col style="margin: 20px 0;" v-else>
        <el-table :data="tableData">
          <el-table-column prop="unitName" label="承办部门"></el-table-column>
          <el-table-column label="行外收文">
            <el-table-column prop="sjhCount" label="上级行来文"></el-table-column>
            <el-table-column prop="sjjgCount" label="审计机构来文"></el-table-column>
            <el-table-column prop="tjhCount" label="同级行来文"></el-table-column>
            <el-table-column prop="xjhCount" label="下级机构来文"></el-table-column>
            <el-table-column prop="xtwCount" label="系统外收文"></el-table-column>
          </el-table-column>
          <el-table-column prop="hnCount" label="行内收文"></el-table-column>
          <el-table-column prop="totleCount" label="合计"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="padding:20px ;">
        <table class="stcs_table">
          <tr>
            <td v-if="true">
              <br />
              <span style="font-weight: 700;">说明：</span>
              <br />（1）境内：包括境内下级分行，境内子公司
              <br />（2）境外：包括海外机构（海外分行+境外子公司+代表处）
              <br />（3）系统外来文：建行以外的其它单位来文，如人民银行、银监会等。统计数据见文件交换系统
            </td>

            <td v-else>
              <br />
              <span style="font-weight: 700;">说明：</span>
              <br />（1）系统外：建行以外的其他单位，如人民银行、银监会等 。（起草实物发文并且实物类型包含系统外的文件）
              <br />注：实物收文发给本级机构的实物收文记录在“行内收文”中；起草的实物收文实物类型包含行内的文件也记录在“行内收文”中
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="ruleForm"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
  </div>
</template>

<script>
import dateFormate from "@/util/filters.js";
import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
export default {
  // 按收文类型统计
  name: "StcsRecordType",
  components: {
    // mTable
    treeCofig
  },
  data() {
    return {
      start1: "",
      end1: "",
      tableData: [],
      down: false,
      // 承办单位
      undertakeDeptIdData: { function: "unitTreeAll", openSubDept: true },
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
        function: "statisticsByReceiveType",
        startTime: "", //   统计起始日期
        undertakeDeptName: "",
        undertakeDeptId: "",
        endTime: "" //    统计结束日期
      },
      times: "",
      tableLoading: false,
      activeName: "tabs-all",
      isEnd: false,
      //tree
      treeData: [],
      singelCheckF: true,
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      shouCheckData: [], //收文选中数据
      laiCheckData: [], //来文选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogTit: "", // 弹框标题
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false,
      iszh:false,
      iszhg:false,
    };
  },
  methods: {
    // 单位选择
    getTreeData(n) {
      let obj = {};
      let name = "";
      this.offenUse = false;
      this.dialogTypeNow = n;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.treeData = [];
      //手动清空时处理
      switch (n) {
        case "chen":
          //this.bank_main
          name = "承办部门";
          obj = Object.assign(obj, this.undertakeDeptIdData);
          clearName = "undertakeDeptName";
          break;
        case "shou":
          obj = Object.assign(obj, this.receiveOrgIdData);
          name = "收文单位";
          clearName = "receiveOrgName";
          break;
        case "lai":
          obj = Object.assign(obj, this.sendOrgIdData);
          name = "来文单位";
          clearName = "sendOrgName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "getForwordOrgDept",
          JSON.stringify(obj),
          this.$businessCode.swglgg
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
          that.treeData[0].disabled = true;
        });
    },

    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeOrganName") {
          this.ruleForm.undertakeOrganId = "";
          this.chenCheckData = [];
        }
        if (name === "sendOrgName") {
          this.ruleForm.sendOrgId = "";
          this.shouCheckData = [];
        }
        if (name === "receiveOrgName") {
          this.ruleForm.receiveOrgId = "";
          this.laiCheckData = [];
        }
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
        }

        switch (dtype) {
          case "chen":
            this.ruleForm.undertakeDeptName = names.join("");
            this.ruleForm.undertakeDeptId = ids.join("");
            this.chenCheckData = this.checkData;
            break;
          case "shou":
            this.ruleForm.receiveOrgName = names.join("");
            this.ruleForm.receiveOrgId = ids.join("");
            this.laiCheckData = this.checkData;
            break;
          case "lai":
            this.ruleForm.sendOrgName = names.join("");
            this.ruleForm.sendOrgId = ids.join("");
            this.shouCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },

    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
        case "chen":
          this.checkIds = this.ruleForm.undertakeOrganId;
          break;
        case "shou":
          this.checkIds = this.ruleForm.receiveOrgId;
          break;
        case "lai":
          this.checkIds = this.ruleForm.sendOrgId;
          break;
      }
    },
    initData() {
      if (this.times) {
        this.$post
          .postData(
            "statisticsByReceiveType",
            JSON.stringify(this.ruleForm),
            this.$businessCode.swglgg
          )
          .then(res => {
            this.tableData = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "error",
          message: "请选择日期"
        });
      }
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
      this.ruleForm.startTime = this.start1 = dateFormate.date(
        Date.parse(this.times[0])
      );
      //this.start1 = dateFormate.date(Date.parse(this.times[0]),"YYYY-MM");
      this.ruleForm.endTime = this.end1 = dateFormate.date(
        Date.parse(this.times[1])
      );
      //= dateFormate.date(Date.parse(this.times[1]),"YYYY-MM")
      // this.ruleForm.endTime = this.ruleForm.endTime.split('-');
      // this.ruleForm.endTime[2] = parseInt(this.ruleForm.endTime[2])+30;
      // this.ruleForm.endTime = this.ruleForm.endTime.join('-');
    },
    cellClick(row, column, cell, event) {
      console.log(row.id);
      this.$router.push({
        path: "/countersignend",
        query: {
          id: row.id
        }
      });
    },
    resetForm(formName) {
      //this.$refs[formName].resetFields();
      this.ruleForm.undertakeDeptName = "";
      this.ruleForm.undertakeDeptId = "";
      this.ruleForm.startTime = "";
      this.ruleForm.endTime = "";
      this.times = "";
    },
    exportExc() {
      exportTable.exportExcel("收文类型统计表", ".el-table");
    }
  },

  created() {
    // this.initData();
    this.treeTradeCode = this.$businessCode.swglgg; //人员树交
    let list = JSON.parse(localStorage.getItem("unitInfo"));
    let unitIdMine = JSON.parse(localStorage.getItem("userInfo")).unitId;
    let currUnitName = JSON.parse(localStorage.getItem("userInfo")).currUnitName;
    if(unitIdMine == 'U010000'){
      this.iszh=true;
    }
    let isZHG = false;
    let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
    tcHumanRole.forEach(element => {
      if(element.dicCode == "zongheG") {
        isZHG = true;
      }
    });
    if (isZHG) {
      this.ruleForm.undertakeDeptName = currUnitName;
      this.iszhg = true;
    } else {
      this.ruleForm.undertakeDeptName = "";
      this.iszhg = false;
    }
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
