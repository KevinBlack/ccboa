<template>
  <div id="printHtml" class="tablePrint">
    <el-row class="displayrow">
      <el-button class="printButton" @click="printThis()" type="info" plain>打印</el-button>
      <el-button @click="closeThis" type="info" plain style="margin-left:100px">关闭</el-button>
    </el-row>
    <h2 class="title-h1">主要负责人请假（备案）表</h2>
    <table class="printTableList" id="print-table">
      <tbody>
        <tr>
          <td>
            姓
            <span style="visibility:hidden">姓名</span>名
          </td>
          <!--负责人姓名-->
          <td colspan="2" style="width: 216px;text-align:center">{{formdata.responsiblePerson}}</td>
          <td style="text-align:center;">
            单
            <span style="visibility:hidden">姓名</span>位
          </td>
          <td style="text-align:center;width:284px">{{formdata.responsibleUnit}}</td>
        </tr>
        <tr>
          <td>出发日期</td>
          <td
            colspan="2"
            style="text-align:center"
          >{{formdata.departDate}} {{formdata.departTiming}}</td>
          <td style="text-align:center">返回日期</td>
          <td style="text-align:center">{{formdata.backDate}} {{formdata.backTiming}}</td>
        </tr>
        <tr>
          <td>请假事项</td>
          <td colspan="4">
            <el-checkbox-group v-model="formdata.leavesType" disabled>
              <el-checkbox
                v-for="item in vacationTypes"
                :key="item.type"
                :label="item.type"
              >{{item.val}}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr class="baClass">
          <td>备案事项</td>
          <td colspan="4">
            <el-checkbox-group v-model="formdata.recordsType" disabled>
              <el-checkbox
                v-for="item in recordsTypes"
                :key="item.type"
                :label="item.type"
              >{{item.val}}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td>前置审批依据</td>
          <td colspan="4" style="text-align:center">
            {{formdata.beforeLeadInfo}}
            <p v-for="item in YRcheck" :key="item.id">{{item.orderNo}}</p>
          </td>
        </tr>
        <tr v-if="formdata.beforeHoliday == '1'">
          <td>休假前置审批依据</td>
          <td colspan="4">
            <p
              v-for="item in Xjcheck"
              :key="item.id"
            >{{item.leaveType + ' ' + item.leaveTime.replace(/#/ig,'至') + ' ' + item.leaveReason.replace(/\n/ig,' ')}}</p>
          </td>
        </tr>
        <tr v-if="formdata.goAbroad == '1'">
          <td>因私出境审批依据</td>
          <td colspan="4">
            <p
              v-for="item in Yscheck"
              :key="item.id"
            >{{item.leaveCountry+' '+item.leaveTime.replace(/#/ig,'至')+' '+item.leaveReason.replace(/\n/ig,' ')}}</p>
          </td>
        </tr>
        <tr>
          <td class="height60"><span style="display:block;">请假、备案</span>期间联系方式</td>
          <td colspan="4" style="text-align:center">{{formdata.otherTel}}</td>
        </tr>
        <tr>
          <td class="height60">
            主持工作
            <span style="display:block">人员姓名</span>
          </td>
          <td colspan="2" style="text-align:center">{{formdata.directPerson}}</td>
          <td style="text-align:center;padding-left:0">
            主持工作
            <span style="display:block">人员职务</span>
          </td>
          <td style="text-align:center">{{formdata.directPostion}}</td>
        </tr>
        <tr>
          <td colspan="5" class="td_style pos_r">
            事由报告：
            <p style="text-indent:33px">{{formdata.reason}}</p>
            <p
              v-if="!!formdata.approveTime"
              style="position: absolute;bottom: 10px;right: 10px;"
            >报送日期:{{formdata.approveTime.slice(0,4)}}年{{formdata.approveTime.slice(5,7)}}月{{formdata.approveTime.slice(8,10)}}日</p>
            <p
              v-else
              style="position: absolute;bottom: 10px;right: 33px;"
            >报送日期:{{formdata.applyTime.slice(0,4)}}年{{formdata.applyTime.slice(5,7)}}月{{formdata.applyTime.slice(8,10)}}日</p>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="td_style">
            行领导批示：
            <!-- <div class="qianF" v-for="item in formdata.checkOpinionList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.createUser}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>-->
          </td>
        </tr>
      </tbody>
    </table>
    <p
      style="line-height: 2;font-size: 16px;font-family: 楷体;
      padding-left: 23px;text-align: center;"
    >*休假、出境等事项，须填写总行人力资源部、国际业务部相关批件标题及文号。</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      id: "",
      isKh: "",
      tableTitle: "",
      formdata: {},
      YRcheck: [],
      Xjcheck: [],
      Yscheck: [],
      attchmentFileInfo: [],
      vacationTypes: [
        { type: 1, val: "境内出差" },
        { type: 2, val: "境外出差" },
        { type: 3, val: "休假" },
        { type: 4, val: "因私出境" }
      ],
      recordsTypes: [
        { type: 1, val: "随同行领导在境内外出差" },
        { type: 2, val: "公休假（节假日）期间离开工作驻地（辖区）" },
        { type: 3, val: "参加总行一类二类会议"}
      ],
      numyear: ""
    };
  },
  methods: {
    printThis() {
      document.execCommand("print");
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    loadData() {
      this.$api.checkLz
        .checkLzDealV({ id: this.id, isKh: this.isKh, numYear: this.numyear })
        .then(res => {
          res.data.leavesType = JSON.parse(res.data.leavesType);
          res.data.recordsType = JSON.parse(res.data.recordsType);
          this.formdata = res.data;
          if (res.data.leaveBase && res.data.leaveBase != "{}") {
            this.Xjcheck = [];
            this.Xjcheck.push(JSON.parse(res.data.leaveBase));
            this.$set(
              this.formdata,
              "leaveBase",
              JSON.parse(res.data.leaveBase)
            );
          } else {
            this.Xjcheck = [];
          }
          if (res.data.leaveCountryBase && res.data.leaveCountryBase != "{}") {
            this.Yscheck = [];
            this.Yscheck.push(JSON.parse(res.data.leaveCountryBase));
            this.$set(
              this.formdata,
              "leaveCountryBase",
              JSON.parse(res.data.leaveCountryBase)
            );
          } else {
            this.Yscheck = [];
          }
          this.formdata.markList = res.markList;
          this.formdata.checkOpinionList = res.checkOpinionList;
          this.formdata.applyOpinionList = res.applyOpinionList;
          this.formdata.sytyOpinionList = res.sytyOpinionList;
          this.formdata.cyOpinionList = res.cyOpinionList;
          this.formdata.blqkOpinionList = res.blqkOpinionList;

          this.formdata.beforeHoliday = res.beforeHoliday;
          this.formdata.goAbroad = res.goAbroad;

          this.YRcheck = res.leadInfoList;
          let time1 = new Date(this.formdata.departDate);
          let mounth1 = time1.getMonth() + 1;
          this.formdata.departDate =
            time1.getFullYear() +
            "年" +
            mounth1 +
            "月" +
            time1.getDate() +
            "日";
          let time2 = new Date(this.formdata.backDate);
          let mounth2 = time2.getMonth() + 1;
          this.formdata.backDate =
            time2.getFullYear() +
            "年" +
            mounth2 +
            "月" +
            time2.getDate() +
            "日";
          if (this.formdata.departTiming == 1) {
            this.formdata.departTiming = "上午";
          } else if (this.formdata.departTiming == 2) {
            this.formdata.departTiming = "下午";
          } else if (this.formdata.departTiming == 3) {
            this.formdata.departTiming = "晚上";
          }
          if (this.formdata.backTiming == 1) {
            this.formdata.backTiming = "上午";
          } else if (this.formdata.backTiming == 2) {
            this.formdata.backTiming = "下午";
          } else if (this.formdata.backTiming == 3) {
            this.formdata.backTiming = "晚上";
          }
        });
    },
    loadDataCy() {
      this.$api.checkLz
        .checkCYDeal({ id: this.id, numYear: this.numyear })
        .then(res => {
          this.formdata = res.data;
          this.formdata.markList = res.markList;
          this.formdata.checkOpinionList = res.checkOpinionList;
          this.formdata.applyOpinionList = res.applyOpinionList;
          this.formdata.sytyOpinionList = res.sytyOpinionList;
          this.formdata.cyOpinionList = res.cyOpinionList;
          this.formdata.blqkOpinionList = res.blqkOpinionList;
          this.YRcheck = res.leadInfoList;
        });
    }
  },
  created() {
    let rowData = JSON.parse(this.$route.query.data);
    console.log("rowData", rowData);
    this.id = rowData.id;
    this.isKh = rowData.isKh;
    this.tableTitle = rowData.title;
    this.numyear =
      rowData.numyear || rowData.numYear
        ? rowData.numyear || rowData.numYear
        : "";
    if (!!rowData.iscy) {
      this.loadDataCy();
    } else {
      this.loadData();
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}
.printTableList {
  width: 94%;
  margin: 0 auto;
  tr {
    td {
      vertical-align: middle;
      line-height: 1.3;
      word-break: break-all;
      font-family: "楷体" !important;
      padding-left: 10px;
      font-size: 20px !important;
      padding-top: 0;
      padding-bottom: 0;
    }
    .height60{
      height: 60px;
    }
    td:first-of-type {
      padding-left: 0;
      text-align: center;
      vertical-align: middle;
      word-break: break-all;
      width: 170px;
      padding-left: 4px;
      padding-right: 4px;
    }
    .td_style {
      height: 6cm;
      text-align: left !important;
      padding-left: 10px !important;
      vertical-align: top !important;
      padding-top: 10px;
    }
  }
  tr:nth-of-type(1),
  tr:nth-of-type(2),
  tr:nth-of-type(3),
  tr:nth-of-type(4),
  tr:nth-of-type(5),
  tr:nth-of-type(6),
  tr:nth-of-type(7) {
    height: 60px !important;
  }
}
.baClass .el-checkbox {
  height:19.5px!important;
}
.title-h1 {
  font-family: "黑体" !important;
  font-size: 26px;
  text-align: center;
  line-height: 1.3;
}
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
    word-break: break-all;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}

td {
  border: solid #000 1px;
}
.pos_r {
  position: relative;
}

.printButton {
  position: absolute !important;
  top: 1% !important;
  right: 1% !important;
}
/deep/.el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #fff;
}
/deep/.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #333;
  font-size: 20px;
}
/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #606266;
}
/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #fff;
  border-color: #606266;
}
@page {
  size: A4;
  margin: 0;
  // padding: 3.3cm 2.7cm;
  padding: 2.54cm 3.17cm;
}

@media print {
  .print_list {
    width: 100%;
  }

  .displayrow {
    display: none;
  }
}
</style>
