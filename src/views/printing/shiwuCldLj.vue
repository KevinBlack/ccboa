<template>
  <div id="printHtml" class="tablePrint">
    <el-row class="displayrow">
      <el-button class="printButton" @click="printThis()" type="info" plain>打印</el-button>
    </el-row>
    <h2 class="title-h1" style="line-height: 1.3;">
      {{formdata.unitName||formdata.curbank}}在京机构（部门）负责人疫情期间离京申请
      <span v-if="titleFlag">
        <br />
      </span>审批处理单
    </h2>
    <table class="printTableList" id="print-table">
      <tbody>
        <tr>
          <td>标题</td>
          <td colspan="5" class="center">{{formdata.title}}</td>
        </tr>
        <tr style="height: 32px;">
          <td>申请日期</td>
          <td colspan="2" class="center">{{formdata.applyTime}}</td>
          <td class="center">主管部门</td>
          <td colspan="2" class="center">{{formdata.mainDepart}}</td>
        </tr>
        <tr>
          <td>审批编号</td>
          <td colspan="5" class="center">
            <template
              v-if="((!formdata.approveNo ||formdata.approveNo=='')&&formdata.isKh!=1)||(formdata.isKh==1&&formdata.approveNo=='')"
            >{{formdata.virtualApproveNo}}</template>
            <template v-else>{{formdata.approveNo}}</template>
          </td>
        </tr>
        <tr>
          <td>申请编号</td>
          <td colspan="5" class="center">
            <template v-if="formdata.applyNo">{{formdata.applyNo}}</template>
            <template v-else>{{formdata.virtualApplyNo}}</template>
          </td>
        </tr>
        <tr>
          <td>
            姓
            <span class="blank"></span>名
          </td>
          <!--负责人姓名-->
          <td colspan="2" class="center">{{formdata.responsiblePerson}}</td>
          <td class="center">
            单
            <span class="blank"></span>位
          </td>
          <td ccolspan="2" class="center">{{formdata.responsibleUnit}}</td>
        </tr>
        <tr>
          <td>员工编号</td>
          <td colspan="2" class="center" style="214px">{{formdata.syncHumanCode}}</td>
          <td class="center">目的地</td>
          <td colspan="2" class="center">{{formdata.destination}}</td>
        </tr>
        <tr>
          <td>出发日期</td>
          <td
            colspan="2"
            class="center"
            style="214px"
          >{{formdata.departDate}} {{formdata.departTiming}}</td>
          <td class="center">返回日期</td>
          <td colspan="2" class="center">{{formdata.backDate}} {{formdata.backTiming}}</td>
        </tr>
        <tr>
          <td>具体事项</td>
          <td colspan="5">
            <el-checkbox-group disabled v-model="formdata.leavesType">
              <el-checkbox
                v-for="item in vacationTypes"
                :key="item.type"
                :label="item.type"
              >{{item.val}}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td>
            <span style="display:block;">离京期间</span>联系方式
          </td>
          <td colspan="5" class="center">{{formdata.otherTel}}</td>
        </tr>
        <tr>
          <td>事由报告</td>
          <td colspan="5" class="center">{{formdata.reason}}</td>
        </tr>
        <tr>
          <td>报送人</td>
          <td colspan="2" class="center">{{formdata.contactName}}</td>
          <td class="center">申请部门</td>
          <td colspan="2" class="center">{{formdata.draftDepartment}}</td>
        </tr>
        <tr>
          <td>座机号码</td>
          <td colspan="2" class="center">{{formdata.specealPlane}}</td>
          <td class="center">手机号码</td>
          <td class="center" colspan="2">{{formdata.phoneNum}}</td>
        </tr>
        <!--       审批意见-->
        <tr style="height: 140px;">
          <td>审批意见</td>
          <td colspan="5">
            <div class="qianF" v-for="item in formdata.checkOpinionList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.createUser}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <!--       行领导批示-->
        <!-- <tr style="height: 140px;">
          <td>行领导批示</td>
          <td colspan="5">
            <div class="qianF" v-for="item in formdata.hldpsOpinionList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.createUser}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr> -->
        <!--       机构（部门）主要负责人意见-->
        <tr style="height: 140px;">
          <td>申请机构 (部门) 主要负责人意见</td>
          <td colspan="5">
            <div class="qianF" v-for="item in formdata.zyfzrOpinionList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.createUser}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        
        <!--        申请单位意见-->
        <tr style="height: 140px;">
          <td>申请单位意见</td>
          <td colspan="5">
            <div class="qianF" v-for="item in formdata.applyOpinionList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.createUser}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <!--  办理情况-->
        <tr style="height: 140px;">
          <td>办理情况</td>
          <td colspan="5">
            <div class="qianF" v-for="item in formdata.blqkOpinionList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.createUser}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <!--        备注-->
        <tr>
          <td>备注</td>
          <td colspan="5">
            <div class="qianF" v-for="item in formdata.markList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <!--附件-->
        <tr style="height: 32px;" v-if="formdata.isKh != '1'">
          <td style="width:20%;vertical-align:middle;text-align:center">附件</td>

          <td colspan="4">
            <div
              v-for="(item,index) in  attchmentFileInfo"
              :key="item.id"
            >{{item.fileName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createrName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createTime}}</div>
          </td>
        </tr>
        <tr style="height: 32px;" v-else-if="formdata.isKh == '1' && attchmentFileInfo1.length>0">
          <td style="width:20%;vertical-align:middle;text-align:center">附件</td>

          <td colspan="4">
            <div
              v-for="(item,index) in  attchmentFileInfo1"
              :key="item.id"
            >{{item.fileName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createrName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createTime}}</div>
          </td>
        </tr>
        <tr style="height: 32px;" v-else-if="formdata.isKh == '1' && attchmentFileInfoPZ.length>0">
          <td style="width:20%;vertical-align:middle;text-align:center">附件</td>

          <td colspan="4">
            <div
              v-for="(item,index) in  attchmentFileInfoPZ"
              :key="item.id"
            >{{item.fileName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createrName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createTime}}</div>
          </td>
        </tr>
        <tr style="height: 32px;" v-else-if="formdata.isKh == '1' && attchmentFileInfoSP.length>0">
          <td style="width:20%;vertical-align:middle;text-align:center">附件</td>

          <td colspan="4">
            <div
              v-for="(item,index) in attchmentFileInfoSP"
              :key="item.id"
            >{{item.fileName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createrName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createTime}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      titleFlag: true,
      Xjcheck: [],
      Yscheck: [],
      id: "",
      isKh: "",
      tableTitle: "",
      formdata: {},
      YRcheck: [],
      attchmentFileInfo: [],
      attchmentFileInfo1: [],
      attchmentFileInfoPZ: [],
      attchmentFileInfoSP: [],
      vacationTypes: [
        { type: 1, val: "离京出差" },
        { type: 2, val: "离京休假" },
        { type: 3, val: "公休日（节假日）期间离京" }
      ],
      numyear: ""
    };
  },
  methods: {
    printThis() {
      document.execCommand("print");
    },
    getFileList() {
      // let that = this;
      // this.$api.setSysConfig
      //   .getTextemList({
      //     id: this.id,
      //     numYear:this.numyear
      //   })
      //   .then(res => {
      //     this.$nextTick(() => {
      //       if (res.data && res.data.length > 0) {
      //         that.attchmentFileInfo.push(...res.data);
      //       }
      //     });
      //   });
      let that = this;
      if (this.formdata.isKh != "1") {
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            numYear: this.numyear
            // fileType:'1001'
          })
          .then(res => {
            that.$nextTick(() => {
              // that.$set(that.formdata, "attchmentFileInfo", res.data);
              that.attchmentFileInfo.push(...res.data);
            });
          });
      } else {
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1001",
            numYear: this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              // this.$set(this.formdata, "attchmentFileInfo", res.data);
              that.attchmentFileInfo1.push(...res.data);
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1002",
            numYear: this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              // this.$set(this.formdata, "attchmentFileInfoPZ", res.data);
              that.attchmentFileInfoPZ.push(...res.data);
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.id,
            fileType: "1003",
            numYear: this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              // this.$set(this.formdata, "attchmentFileInfoSP", res.data);
              that.attchmentFileInfoSP.push(...res.data);
            });
          });
      }
    },
    loadData() {
      this.$api.checkLj
        .checkLzDealV({ id: this.id, isKh: this.isKh, numYear: this.numyear })
        .then(res => {
          this.formdata = res.data;
          if (res.code == "SUCCESS") {
            let strLength =
              (res.data.unitName || res.data.curbank) +
              res.data.applyProjectName;
            if (this.getlength(strLength, 35) > 695.91) {
              this.titleFlag = false;
            } else {
              this.titleFlag = true;
            }
          }
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
          this.formdata.backLeaveOpinionList = res.backLeaveOpinionList;
          this.formdata.zyfzrOpinionList = res.zyfzrOpinionList;
          this.formdata.hldpsOpinionList = res.hldpsOpinionList;
          this.formdata.leavesType = JSON.parse(res.data.leavesType);
          this.$set(this.formdata, "beforeHoliday", res.beforeHoliday);
          this.$set(this.formdata, "goAbroad", res.goAbroad);
          this.$set(this.formdata, "backLeaveInfo", res.backLeaveInfo);
          this.YRcheck = res.leadInfoList;
          let time = new Date(this.formdata.applyTime);
          let mounth = time.getMonth() + 1;
          this.formdata.applyTime =
            time.getFullYear() + "年" + mounth + "月" + time.getDate() + "日";
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
          if (
            this.formdata.departTiming == 1 ||
            this.formdata.departTiming == "1"
          ) {
            this.formdata.departTiming = "上午";
          } else if (
            this.formdata.departTiming == 2 ||
            this.formdata.departTiming == "2"
          ) {
            this.formdata.departTiming = "下午";
          } else if (
            this.formdata.departTiming == 3 ||
            this.formdata.departTiming == "3"
          ) {
            this.formdata.departTiming = "晚上";
          }
          if (
            this.formdata.backTiming == 1 ||
            this.formdata.backTiming == "1"
          ) {
            this.formdata.backTiming = "上午";
          } else if (
            this.formdata.backTiming == 2 ||
            this.formdata.backTiming == "2"
          ) {
            this.formdata.backTiming = "下午";
          } else if (
            this.formdata.backTiming == 3 ||
            this.formdata.backTiming == "3"
          ) {
            this.formdata.backTiming = "晚上";
          }
          this.getFileList();
        });
    },
    loadDataCy() {
      this.$api.checkLz
        .checkCYDeal({ id: this.id, numYear: this.numyear })
        .then(res => {
          this.formdata = res.data;
          if (res.code == "SUCCESS") {
            let strLength =
              (res.data.unitName || res.data.curbank) +
              res.data.applyProjectName;
            if (this.getlength(strLength, 35) > 840) {
              this.titleFlag = false;
            } else {
              this.titleFlag = true;
            }
          }
          this.formdata.markList = res.markList;
          this.formdata.checkOpinionList = res.checkOpinionList;
          this.formdata.applyOpinionList = res.applyOpinionList;
          this.formdata.sytyOpinionList = res.sytyOpinionList;
          this.formdata.cyOpinionList = res.cyOpinionList;
          this.formdata.blqkOpinionList = res.blqkOpinionList;
          this.YRcheck = res.leadInfoList;
          this.getFileList();
        });
    },
    // 校验标题实际长度方法
    getlength(str, font_size) {
      var str_leng = str.replace(/[^x00-xff]/gi, "aa").length;
      return (str_leng * font_size) / 2;
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
  padding: 0 2.7cm;
  background-color: white;
}
.printTableList {
  // width: 94%;
  margin: 0 auto;
  tr {
    height: 32px;
    td {
      vertical-align: middle;
      word-break: break-all;
      padding-left: 10px;
      font-size: 16px !important;
    }
    .center {
      text-align: center;
      vertical-align: center;
    }
    .blank {
      width: 30px;
      display: inline-block;
    }
    td:first-of-type {
      padding-left: 0;
      text-align: center;
      vertical-align: middle;
      word-break: break-all;
      width: 138px;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
}
.qianF {
  overflow: hidden;
  word-break: break-all;
  padding-right: 10px;
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
.chuanYue {
  overflow: hidden;
  .chuanYue1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .chuanYue2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}

.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 1.3;
}
td {
  border: solid #000 1px;
}

.printButton {
  position: absolute !important;
  top: 1% !important;
  right: 1% !important;
}
/deep/.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
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
  padding: 3.3cm 2.7cm;
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
