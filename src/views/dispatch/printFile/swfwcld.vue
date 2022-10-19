<template>
  <!-- 一、	发文管理：
  1.	电子发文处理单-->

  <div class="tablePrint">
    <el-row style="text-align:right;height: 100px;">
      <img :src="pictureLoad" v-show="pictureLoad" style="z-inde:10000;height: 95px;">
      <el-button v-show="printShow" class="printButton" @click="printThis()" type="info" plain>打印</el-button>
     </el-row>
     <el-row>
       <h1 class="title-h1">{{draftOrganTitle}}</h1>
     </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
      <tbody>
        <tr>
          <td style="text-align: center;width:90px;">发文类型</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{fromdata.type}}</td>
          <td style="text-align: center;width:90px;">代字/红头</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{fromdata.redHead}}</td>
          <td style="text-align: center;width:90px;">发文字号</td>
          <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.documentNo}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">紧急程度</td>
          <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.emergencyLevel}}</td>
          <td style="text-align: center;width:90px;">业务分类</td>
          <td
            id="businessType"
            :colspan="(showTextType||showMeeting)?1:3"
            style="padding-left: 10px;"
          >{{fromdata.businessType}}</td>
          <td v-if="showTextType" class="wenzhong">文&nbsp;&nbsp;种</td>
          <td v-if="showMeeting" class="wenzhong">会议结束时间</td>
          <td
            v-if="showTextType"
            id="textType"
            style="padding-left: 10px;"
            class="wenzhong"
          >{{fromdata.textType}}</td>
          <td
            v-if="showMeeting"
            id="textType"
            style="padding-left: 10px;"
            class="wenzhong"
          >{{fromdata.meetingEndTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">秘密类型</td>
          <td
            :colspan="(!fromdata.secretType||fromdata.secretType=='')?5:1"
            style="padding-left: 10px;"
          >{{fromdata.secretType}}</td>
          <td v-if="fromdata.secretType&&fromdata.secretType!=''" style="text-align: center">秘密期限类型</td>
          <td
            v-if="fromdata.secretType&&fromdata.secretType!=''"
            :colspan="(fromdata.secretLimitType=='')?3:1"
            style="padding-left: 10px;"
          >{{fromdata.secretLimitType}}</td>
          <td
            v-if="fromdata.secretType!=''&&fromdata.secretLimitType!=''"
            style="text-align: center"
          >{{fromdata.secretLimitType=='保密期限'?'密级标志':'密级和保密期限'}}</td>
          <td
            v-if="fromdata.secretType!=''&&fromdata.secretLimitType!=''"
            style="padding-left: 10px;"
          >
            {{fromdata.secretFlagType}}
            <i v-if="fromdata.secretLimitType!=''&&fromdata.secretFlagType!=''" :class="isCountry"></i>
            {{fromdata.secretFlagContent+fromdata.secretTimeType}}
          </td>
        </tr>
        <tr v-if="fromdata.secretType">
          <td style="text-align: center;width:90px;">知悉范围</td>
          <td
            id="knowScore"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.knowScore}}</td>
        </tr>
        <tr v-if="fromdata.secretType">
          <td style="text-align: center;width:90px;">定密依据</td>
          <td
            id="secretGistIds"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.secretGists}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">主办部门</td>
          <td
            id="hostDepartment"
            :colspan="showUnionDepartment?1:5"
            style="padding-left: 10px;"
          >{{fromdata.draftDepartment}}</td>
          <td
            v-if="showUnionDepartment"
            style="text-align: center;width:90px;"
          >联合发文单位</td>
          <td
            v-if="showUnionDepartment"
            id="unionDepartment"
            colspan="3"
            style="padding-left: 10px;"
          >{{fromdata.unionDepartment}}</td>
        </tr>

        <tr>
          <td style="text-align: center;width:90px;">拟&nbsp;稿&nbsp;人</td>
          <td id="draftUser" style="padding-left: 10px;">{{fromdata.draftUser}}</td>
          <td style="text-align: center;width:90px;">联系电话</td>
          <td id="phone" style="padding-left: 10px;">{{fromdata.phone}}</td>
          <td style="text-align: center;width:90px;">拟稿日期</td>
          <td id="draftTime" style="padding-left: 10px;">{{fromdata.draftTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">发文依据</td>
          <td
            id="sendBasis"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >
            <ul>
              <li v-for="item in fromdata.sendBasis" :key="item.id">{{item.documentCode}}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">直发文件</td>
          <td id="isDirect" style="padding-left: 10px;">{{fromdata.isDirect}}</td>
          <td style="text-align: center;width:90px;">直发范围</td>
          <td id="directRange" style="padding-left: 10px;">{{fromdata.directRange}}</td>
          <td style="text-align: center;width:90px;">直发文种类</td>
          <td id="directType" style="padding-left: 10px;">{{fromdata.directType}}</td>
        </tr>
        <tr v-if="fromdata.isStandardFile=='是'&&fromdata.ifProtect==1">
          <td id="sendBasis" style="text-align: center;width:90px;">是否经过消保审查</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.isNeedCheckcp}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">档案利用范围</td>
          <td id="userRange" style="padding-left: 10px;">{{fromdata.userRange}}</td>
          <td style="text-align: center;width:90px;">规章或规范性文件</td>
          <td id="isStandardFile" style="padding-left: 10px;">{{fromdata.isStandardFile}}</td>
          <td style="text-align: center;width:90px;">保管期限</td>
          <td id="keepLimit" style="padding-left: 10px;">{{fromdata.keepLimit}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">正文标题</td>
          <td id="title" colspan="5" style="text-align:left;padding-left:10px;">{{fromdata.title}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">附件标题</td>
          <td
            id="title"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.attachTitle}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">会签部门</td>
          <td
            id="signDepartment"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.signDepartmentName?fromdata.signDepartmentName+';'+(fromdata.finishSignDepartmentName?fromdata.finishSignDepartmentName:''):fromdata.finishSignDepartmentName?fromdata.finishSignDepartmentName:''}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">{{formText.outsideSign}}</td>
          <td
            id="outsideSign"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.outsideSign}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">主&nbsp;&nbsp;送</td>
          <td
            id="main"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.main}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">抄&nbsp;&nbsp;送</td>
          <td
            id="copy"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.copy}}</td>
        </tr>
        <tr>
          <td style="text-align: center;width:90px;">{{formText.inline}}</td>
          <td
            id="inline"
            colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.inline}}</td>
        </tr>
      <!-- </tbody>
    </table>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
      <tbody> -->
        <tr ref="print_psyj" class="print_zr">
          <td style="text-align: center;width:90px;line-height: 64px !important;">签发意见</td>
          <td
            id="send_send"
            colspan="5"
            style="padding: 10px;"
            :style="{height:printPsyjStyle+'!important'}"
          >
            <div style="height:90px !important;"></div>
            <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="pos_r">
                    <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">
                        {{ item.departmentName }}
                        <span>{{ item.userName }}</span>
                      </p>
                      <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <div style="page-break-after:always" v-if="psFlag"></div>
        <tr class="print_zr">
          <td style="text-align: center;width:90px;line-height: 64px !important;">定密责任人意见</td>
          <td colspan="5" id="helpOrgOpinion" style="padding: 10px;">
            <div v-for="(item) in fromdata.opinionSecretPersonList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="pos_r">
                    <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">
                        {{ item.departmentName }}
                        <span>{{ item.userName }}</span>
                      </p>
                      <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center;width:90px;line-height: 64px !important;">核稿意见</td>
          <td id="opinionDraf" colspan="5" style="padding: 10px;">
            <div v-for="(item) in fromdata.opinionDrafList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="pos_r">
                    <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">
                        {{ item.departmentName }}
                        <span>{{ item.userName }}</span>
                      </p>
                      <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center;width:90px;line-height: 64px !important;">审核意见</td>
          <td colspan="5" id style="padding: 10px;">
            <div v-for="item in fromdata.opinionCheckList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="pos_r">
                    <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">
                        {{ item.departmentName }}
                        <span>{{ item.userName }}</span>
                      </p>
                      <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center;width:90px;line-height: 64px !important;">备注</td>
          <td colspan="5" id="comments" style="padding: 10px;">
            <div style="min-height:135px !important;line-height:135px !important;"></div>
            <div v-for="(item) in fromdata.commentsList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pad_yj10 pad_yj11" style="text-align:left;">
                    {{ item.content }}
                    <span class="adviceInfo pad_yj10">({{ item.departmentName }}</span>
                    <span class="adviceInfo pad_yj10">{{ item.userName }}</span>
                    <span class="adviceInfo pad_yj10">{{ item.createTime }})</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <!-- <tr style="" class="nobd">
          <td colspan="6" class="nobd">
            <img :src="imgUrl" alt="">
          </td>

        </tr> -->
      </tbody>
    </table>
  </div>
</template>


<script>
import Vue from "vue";
import dateFormate from "@/util/filters.js";
import computedNodeHeight from "@/minixs/computedNodeHeight";
import formTextChange from '@/components/formText/index';
import printStyle from "@/minixs/printStyle";

export default {
  props: {
    routeId: String
  },
  mixins:[computedNodeHeight,printStyle],
  data() {
    return {
      formText:{
        inline:"本行发送",
        outsideSign:"行外会签",
      },
      showUnionDepartment: false,
      psFlag: false,
      oneHeight: "",
      printPsyjDiv: "",
      printPsyj: "",
      hldmsFlag: false, //行领导秘书
      printPsyjStyle: "",
      OnedyclPrint: "",
      TwodyclPrint: "",
      imgUrl:'',
      huiqian: false, //是否会签
      banjie: false, //是否办结
      printShow: true,
      fromdata: {
        type: "",
        redHead: "",
        documentNo: "",
        emergencyLevel: "",
        businessType: "",
        textType: "",
        secretType: "",
        draftOrgan: "",
        unionDepartment: "",
        draftUser: "",
        phone: "",
        draftTime: "",
        sendBasis: "",
        isDirect: "",
        directRange: "",
        directType: "",
        userRange: "",
        isStandardFile: "",
        keepLimit: "",
        title: "",
        attachTitle: "",
        signDepartment: "",
        outsideSign: "",
        main: "",
        copy: "",
        inline: "",
        knowScore: "",
        secretGists: "",
        opinionSendList: "",
        opinionDrafList: "",
        commentsList: "",
        opinionCheck: "",
        completeTime: "",
        sendTime: "",
        isSeparate: "",
        secretType: "",
        secretFlagType: "",
        secretLimitType: "",
        secretTimeType: "",
        secretFlagContent: ""
      },
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId,
      showTextType: false,
      showMeeting: false,
      draftOrganTitle: "",
      isCountry: "el-icon-star-off pad_10",
      symm: true,
      gzlx: true,
      unitId: "",
      pictureLoad:""
    };
  },
  methods: {
    async printThis() {
      this.printShow = false;
      await this.initPrintData();
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
    concatAttrData(name, data) {
      this.fromdata[name] = this.fromdata[name]
        ? this.fromdata[name] + data
        : data;
    },
    pointFun(filePaths, fileNames) {
      // <thead style="border:none">
      //   <th style="border:none" colspan="7">
      //     <p style="font-size:35px;line-height:48px;text-align:center;font-weight: 600;">{{directTitle}}实物签报处理单</p>
      //   </th>
      // </thead>
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = filePaths;
      bank_doDownloadFile.filePath = fileNames;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          "A0846C071"
        )
        .then(res => {
          var host = window.location.host;
          if (res && res.success) {
            this.pictureLoad =
              "http://" +
              host +
              "/ecpweb/getLocalFile.action?relativePath=" +
              res.filePath +
              "&fileName=" +
              res.fileName +
              "&openFile=true";
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "条形码下载失败",
              duration: 500
            });
          }
        });
    },
    loadPng(){
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      var obj = Object.assign({function:"tiaoXingMa"}, parseList);
      // tiaoXingMa
      this.$post
      .postData(
        "tiaoXingMa",
        JSON.stringify(obj),
        this.$businessCode.fawgl
      )
      .then(res => {
        this.pointFun(res.data.fileName, res.data.filePath);
      })
    },
    doDraft(fileInfo,saveName) {
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      this.$forceUpdate();
      console.log(openPath)
    },
    initData() {
      let that = this;
      let fun = this.$route.query.isCFW?"againSendEdit":"toEditShiwuFw";
      let receiveselect = {
        function: fun,
        id: this.$route.query.id,
        againId: this.$route.query.againId||"",
        againSendType: this.$route.query.againSendType||"",
        choseYear: this.$route.query.choseYear||"",
        unitId: this.unitId
      };
      this.$post
        .postData(
          fun,
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          that.fromdata = Object.assign({}, that.fromdata, res.data);
          this.loadPng();
          if (res.data.isSpecialHead && res.data.isSpecialHead == "1") {
            that.draftOrganTitle =
              res.data && res.data.draftDepartment + "实物发文处理单";
          } else {
            that.draftOrganTitle =
              res.data && res.data.draftOrgan + "实物发文处理单";
          }

          if (
            that.fromdata.secretFlagContent &&
            that.fromdata.secretFlagContent.length > 5
          ) {
            that.fromdata.secretTimeType = "";
            that.fromdata.secretFlagContent = dateFormate.date(
              Date.parse(that.fromdata.secretFlagContent)
            );
          }

          that.fromdata.sendBasis =
            res.data.sendBasis && JSON.parse(res.data.sendBasis);

          if (
            that.fromdata.type == "行发文" ||
            that.fromdata.type == "部门发文" ||
            that.fromdata.type == "党务发文"
          ) {
            that.showMeeting = false;
            that.showTextType = true;
          } else if (that.fromdata.type == "会议纪要") {
            that.showMeeting = true;
            that.showTextType = false;
          } else {
            that.showMeeting = false;
            that.showTextType = false;
          }

          if (that.fromdata.secretFlagType) {
            this.symm = true;
          } else {
            this.symm = false;
          }
          if (that.fromdata.secretType == "") {
            this.gzlx = true;
          } else {
            this.gzlx = false;
          }

          if (that.fromdata.secretType == "国家秘密") {
            that.isCountry = "el-icon-star-on pad_10";
          }

          that.fromdata.meetingEndTime = that.fromdata.meetingEndTime
            ? dateFormate.dataFormat(Date.parse(that.fromdata.meetingEndTime))
            : "";
          that.fromdata.draftTime = that.fromdata.draftTime
            ? dateFormate.date(Date.parse(that.fromdata.draftTime))
            : "";

          let day = new Date();
          this.docNoYear = day.getFullYear();
          that.fromdata.opinionCheckList =
            res.data &&
            res.data.opinionCheckList &&
            JSON.parse(res.data.opinionCheckList);
          that.fromdata.opinionDrafList =
            res.data &&
            res.data.opinionDrafList &&
            JSON.parse(res.data.opinionDrafList);
          that.fromdata.opinionSendList =
            res.data &&
            res.data.opinionSendList &&
            JSON.parse(res.data.opinionSendList);
          that.fromdata.opinionSignList =
            res.data &&
            res.data.opinionSignList &&
            JSON.parse(res.data.opinionSignList);
          that.fromdata.opinionSecretPersonList =
            res.data &&
            res.data.opinionSecretPersonList &&
            JSON.parse(res.data.opinionSecretPersonList);
          that.fromdata.commentsList =
            res.data &&
            res.data.commentsList &&
            JSON.parse(res.data.commentsList);
          console.log(that.fromdata.opinionSendList);
        });
    }
  },
  mounted(){
    
  },
  created() {
    this.formText = formTextChange('send')
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
    //initData
    this.unitId = this.$route.query.unitId||"";
     this.initData();
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
    height: 32px !important;
    td {
      text-align: center;
      vertical-align: middle;
    }
  }
}
.title-h1 {
  margin-top: 1%!important;
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 70px;
}
.printButton {
  position: absolute;
  right: 28%;
  z-index: 10;
  top: 6%;
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
.tcont font {
  /* background-color:#F2CACB; */
}
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
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
.pad_yj10 {
  padding: 0;
  white-space: pre-line;
  word-break: break-all;
}
tr {
  page-break-inside: avoid;//new
  td {
    page-break-inside: avoid;//new
  }
}
.code-img{
  height: auto;
  position: absolute;
  top: 0px;
  right: 3%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.nobd{
  page-break-inside: avoid;
  page-break-after:always;
  border:none;
  padding-top: 20px;
  text-align: right !important;
}
</style>