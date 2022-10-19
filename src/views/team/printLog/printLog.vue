<template>
  <!-- 一、	发文管理：
  1.	电子发文处理单-->

  <div class="tablePrint">
    <div ref="dyclPrint" class="dyclPrint">
      <el-row id="dyclPrintOne">
        <h1 style class="title-h1">{{ draftOrganTitle }}</h1>
        <el-button class="printButton" @click="printThis()" type="info" v-if="printShow" plain>打印</el-button>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        ref="tableUp"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="tableUp"
      >
      <!-- <thead style="border:none">
        <th style="border:none" colspan="6" class="th224 th225">
          <p></p>
        </th>
      </thead> -->
        <tbody>
          <tr>
            <td style="text-align:center;width:90px;">所属团队</td>
            <td style="padding-left:10px;width:30%;">{{formData.teamname}}</td>
            <td style="text-align:center;width:90px;">发布日期</td>
            <td style="padding-left: 10px;">{{formData.createTime}}</td>
          </tr>
          <tr v-if="timeShow">
            <td style="text-align:center;width:90px;">开始时间</td>
            <td style="padding-left:10px;width:15%;">{{formData.startTime}}</td>
            <td style="text-align:center;width:90px;">结束时间</td>
            <td style="padding-left: 10px;">{{formData.endTime}}</td>
          </tr>
          <tr v-if="weekShow">
            <td style="text-align:center;width:90px;">周</td>
            <td style="padding-left:10px;width:15%;">第{{formData.weeks}}周</td>
            <td style="text-align:center;width:90px;">&nbsp;</td>
            <td style="padding-left: 10px;">&nbsp;</td>
          </tr>
          <tr v-if="meetShow">
            <td style="text-align:center;width:90px;">会议时间</td>
            <td style="padding-left:10px;width:15%;">{{formData.meetingTime}}</td>
            <td style="text-align:center;width:90px;">会议地点</td>
            <td style="padding-left: 10px;">{{formData.meetingPlace}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">{{title1}}</td>
            <td colspan="3" style="padding: 10px;">
              {{content1}}
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">{{title2}}</td>
            <td colspan="3" style="padding: 10px;">
              {{content2}}
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">{{title3}}</td>
            <td colspan="3" style="padding: 10px;">
              {{content3}}
            </td>
          </tr>
          <tr v-if="isQT">
            <td style="text-align: center;width:90px;">其他</td>
            <td colspan="3" style="padding: 10px;">
              {{formData.other}}
            </td>
          </tr>
          <tr v-if="isBZ">
            <td style="text-align: center;width:90px;">帮助与支持</td>
            <td colspan="3" style="padding: 10px;">
              {{formData.helpSupport}}
            </td>
          </tr>
          <tr v-if="isBZ">
            <td style="text-align: center;width:90px;">备注</td>
            <td colspan="3" style="padding: 10px;">
              {{formData.remark}}
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">图片</td>
            <td colspan="3" style="padding: 10px;">
              <el-scrollbar>
                  <div v-for="item in formData.pictureAttachment" :key="item.id" class="tree_w">
                    <template>
                      <div class="command_wrap">
                        <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.rwglfj)">{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">附件</td>
            <td colspan="3" style="padding: 10px;">
              <el-scrollbar>
                  <div v-for="item in formData.fileAttachment" :key="item.id" class="tree_w">
                    <template>
                      <div class="command_wrap">
                        <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.rwglfj)">{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">发布范围</td>
            <td colspan="3" style="padding: 10px;">
              {{sharePerson}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import dateFormate from "@/util/filters"
import computedNodeHeight from "@/minixs/computedNodeHeight";
import printStyle from "@/minixs/printStyle";

export default {
  mixins:[computedNodeHeight,printStyle],
  data() {
    return {
        draftOrganTitle: "",
        timeShow: false,
        weekShow: false,
        meetShow: false,
        isQT: false,
        isBZ: false,
        printShow: true,
        formData: {},
        title1: "",
        title2: "",
        title3: "",
        content1: "",
        content2: "",
        content3: "",
        sharePerson: ""
    };
  },
  methods: {
    async printThis() {
        this.printShow = false;
        setTimeout(() => {
            document.execCommand("print");
        }, 100);
    },
    beforePrint() {
      //this.printShow=false;
    },
    afterPrint() {
      this.printShow = true;
    },
    //initData
    initData() {
      let that = this;
      let fun = "";
      switch (this.$route.query.status) {
        case "dayLog":
            fun = "getDetails";
            that.draftOrganTitle = "日报";
            that.title1 = "今日完成工作";
            that.title2 = "未完成工作";
            that.title3 = "需协调工作";
            break;
        case "weekLog":
            fun = "taskWeekly_getDetails";
            that.draftOrganTitle = "周报";
            that.title1 = "本周回顾";
            that.title2 = "下周计划";
            that.title3 = "表扬/建议";
            that.weekShow = true;
            that.isQT = true;
            break;
        case "monLog":
            fun = "taskMonthly_getDetails";
            that.draftOrganTitle = "月报";
            that.title1 = "本月工作内容";
            that.title2 = "本月工作总结";
            that.title3 = "下月工作计划";
            that.isBZ = true;
            break;
        case "meetLog":
            fun = "taskmeetingsummary_getDetails";
            that.draftOrganTitle = "日报";
            that.title1 = "今日完成工作";
            that.title2 = "未完成工作";
            that.title3 = "需协调工作";
            that.isQT = true;
            break;
        default:
            break;
      }
      let params = {
        function: fun,
        id: this.$route.query.id
      };
      this.$post
        .postData(
          fun,
          JSON.stringify(params),
          this.$businessCode.rwgl
        )
        .then(res => {
            console.log(res)
            that.formData = Object.assign({}, that.formData, res.data);
            switch (this.$route.query.status) {
                case "dayLog":
                    that.content1 = res.data.finishWorkToday||"";
                    that.content2 = res.data.unfinishedWorkToday||"";
                    that.content3 = res.data.coordination||"";
                    break;
                case "weekLog":
                    that.content1 = res.data.thisWeek||"";
                    that.content2 = res.data.nextweek||"";
                    that.content3 = res.data.praise||"";
                    break;
                case "monLog":
                    that.content1 = res.data.thisMonthWork||"";
                    that.content2 = res.data.thisMonthSummary||"";
                    that.content3 = res.data.nextMonthWork||"";
                    break;
                case "meetLog":
                    that.content1 = res.data.attendee||"";
                    that.content2 = res.data.meetingTheme||"";
                    that.content3 = res.data.meetingDetails||"";
                    break;
                default:
                    break;
            }
            let transPerson = JSON.parse(that.formData.shareId);
            transPerson.forEach(item => {
                let transArr = [];
                transArr.push(item.userName);
                that.sharePerson = transArr.join()
            });
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "请求失败",
          //   duration: 1000
          // });
        });
    }
  },
  created() {
    if (window.matchMedia) {
      let MediaQueryList = window.matchMedia("print");
      MediaQueryList.addListener(mql => {
        if (mql.matches) {
          this.beforePrint();
        } else {
          this.afterPrint();
        }
      });
    }
    this.unitId = this.$route.query.unitId||"";
    //initData
    this.initData();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.th225{
  height: 1.5cm !important;
}
.tablePrint {
  width: 850px;
  margin: 0 auto;
  background-color: white;
}
.printTableList {
  width: 94%;
  margin: 0 auto;
  margin-top: -30px;
  tr {
    height: 32px !important;
    td {
      vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
td {
  border: solid #000 1px;
}
.tcont {
  padding-bottom: 5px;
  border-bottom: 1px solid #dac6c5;
}
.tcont:last-child {
  border-bottom: none;
}
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
}
.printButton{
  right: 3%;
}
.tcont2 > div {
  float: right;
  /* background-color:#F2CACB; */
}
.issueTable {
  height: 100%;
  border-collapse: collapse;
  border: none;
  width: 100%;
}
.issueTable tr:nth-of-type(1) {
  border-top: none;
}
.issueTable tr:last-child {
  border-bottom: none;
}
.issueTable td {
  border: none;
}
.issueTable tr {
  line-height: 25px;
  text-align: center;
  border: solid 1px #000;
  border-left: none;
  border-right: none;
}
/deep/ .d_f1 .el-textarea__inner {
  border: none !important;
  background-color: #fff !important;
}
/deep/ .blue_size_yuanYin {
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #e4e7ed52 !important;
    color: blue !important;
  }
}
/deep/ .blue_size_yuanYin {
  .adviceInfo {
    position: absolute;
    width: 100%;
    right: 20px;
    bottom: 0;
    text-align: right;
    color: blue;
  }
}
// .pad_yj10 {
//   padding: 0;
//   margin-bottom: 6px;
//   white-space: pre-line;
//   word-break: break-all;
// }
</style>