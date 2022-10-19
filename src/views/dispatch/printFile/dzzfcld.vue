<template>
  <!-- 一、	发文管理：
  1.	电子发文处理单-->

  <div class="tablePrint">
    <div ref="dyclPrint" class="dyclPrint">
      <el-row id="dyclPrintOne">
        <h1 style class="title-h1">{{ draftOrganTitle }}</h1>
        <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        ref="tableUp"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="tableUp"
      >
        <tbody>
          <tr>
            <td style="text-align: center;width:90px;">发文类型</td>
            <td id="type" style="padding-left: 10px;">{{fromdata.type}}</td>
            <td style="text-align: center;width:90px;">代字/红头</td>
            <td id="redHead" style="width: 18%; padding-left: 10px;">{{fromdata.redHead}}</td>
            <td style="text-align: center;width:90px;">发文字号</td>
            <td id="documentNo" style="padding-left: 10px;">{{fromdata.documentNo}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">紧急程度</td>
            <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.emergencyLevel}}</td>
            <td style="text-align: center;width:90px;">业务分类</td>
            <td id="businessType" :colspan="(showTextType||showMeeting)?1:3" style="padding-left: 10px;">{{fromdata.businessType}}</td>
            <td style="text-align: center;width:90px;" v-if="showTextType" class="wenzhong">文&nbsp;&nbsp;种</td>
            <td v-if="showTextType" id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.textType}}</td>
            <td style="text-align: center;width:90px;" v-if="showMeeting" class="wenzhong">会议结束时间</td>
            <td v-if="showMeeting" id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.meetingEndTime}}</td>
          </tr>

          <tr>
            <td style="text-align: center;width:90px;">秘密类型</td>
            <td :colspan="(!fromdata.secretType||fromdata.secretType=='')?5:1" style="padding-left: 10px;">{{fromdata.secretType}}</td>
            <td v-if="fromdata.secretType&&fromdata.secretType!=''" style="text-align: center">{{(fromdata.secretType=='商业秘密')?'秘密期限类型':'秘密标志'}}</td>
            <td v-if="fromdata.secretType&&fromdata.secretType!=''" :colspan="(fromdata.secretLimitType=='')?3:1" style="padding-left: 10px;">{{(fromdata.secretType=='商业秘密')?fromdata.secretLimitType:fromdata.secretFlagType}}</td>
            <td v-if="fromdata.secretType!=''&&fromdata.secretLimitType!=''" style="text-align: center">密级和保密期限</td>
            <td v-if="fromdata.secretType!=''&&fromdata.secretLimitType!=''" style="padding-left: 10px;">
              {{fromdata.secretFlagType}}<i v-if="fromdata.secretLimitType!=''&&fromdata.secretFlagType!=''" :class="isCountry"></i>{{fromdata.secretFlagContent+fromdata.secretTimeType}}
            </td>
          </tr>
          <tr style="min-height:100px" v-if="fromdata.secretType">
            <td style="text-align: center;width:90px;">知悉范围</td>
            <td id="knowScore" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.knowScore}}</td>
          </tr>
          <tr style="min-height:100px" v-if="fromdata.secretType">
            <td style="text-align: center;width:90px;">定密依据</td> 
            <td id="secretGistIds" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.secretGists}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">主办部门</td>
            <td id="hostDepartment" :colspan="showUnionDepartment?1:5" style="padding-left: 10px;">{{fromdata.draftDepartment}}</td>
            <td v-if="showUnionDepartment" style="text-align: center;width:90px;">联合发文单位</td>
            <td v-if="showUnionDepartment" id="unionDepartment" colspan="3" style="padding-left: 10px;">{{fromdata.unionDepartment}}</td>
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
            <td id="sendBasis" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">
              <ul>
                <li v-for="item in fromdata.sendBasis" :key="item.id">
                  {{item.documentCode}}
                </li>
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
          <tr>
            <td style="text-align: center;width:90px;">
              档案利用范围
            </td>
            <td id="userRange" style="padding-left: 10px;">{{fromdata.userRange}}</td>
            <td style="text-align: center;width:90px;">
              规章或规范性文件
            </td>
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
            <td id="attachTitle" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.attachTitle}}</td>
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
            <td id="outsideSign" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.outsideSign}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">主&nbsp;&nbsp;送</td>
            <td id="main" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.main}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">抄&nbsp;&nbsp;送</td>
            <td id="copy" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.copy}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">{{formText.inline}}</td>
            <td id="inline" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.inline}}</td>
          </tr>
          <tr class="print_zr">
            <td style="text-align: center;width:90px;line-height: 64px !important;">签发意见</td>
            <td id="send_send" colspan="5" style="padding: 10px;" :style="{height:printPsyjStyle+'!important'}">
              <div v-if="hldmsFlag" style="height:150px"></div>
              <div v-if="fromdata.opinionSendList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
                <div class="d_flex" ref="domQFYJ">
                  <el-row class="d_b100">
                    <el-col class="pos_r">
                      <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                      <div class="adviceInfo">
                        <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                        <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }} </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;border-top:none;line-height: 64px !important;">核稿意见</td>
            <td id="opinionDraf" colspan="5" style="padding: 10px;border-top:none;">
              <div v-if="fromdata.opinionDrafList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.opinionDrafList" :key="item.id">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col>
                      <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                      <div class="adviceInfo">
                        <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                        <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }} </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </td>
          </tr>
          <tr class="print_zr">
            <td style="text-align: center;width:90px;line-height: 64px !important;">会签意见</td>
            <td colspan="5" id="opinionSign" style="padding: 10px;">
              <div v-if="fromdata.opinionSignList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="item in fromdata.opinionSignList" :key="item.id">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col class="pos_r">
                      <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                      <div class="adviceInfo">
                        <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                        <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }} </p>
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
              <div v-if="fromdata.opinionCheckList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="item in fromdata.opinionCheckList" :key="item.id">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col>
                      <p class="pad_yj10 pad_yj11" style="text-align:left;">{{ item.content }}</p>
                      <div class="adviceInfo">
                        <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                        <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }} </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;line-height: 64px !important;">备注</td>
            <td colspan="5" id="comments" style="padding: 10px;">
              <div v-if="fromdata.commentsList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
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
          <!-- <tr style="height: 40px;">
            <td style="text-align: center;width:90px;">正文字数</td>
            <td colspan="5" style="color:blue;padding: 10px;">{{fromdata.sizeFact}}</td>
          </tr> -->
          <tr style="height: 40px;" v-show="fromdata.isExceed && wordsLimitInfo.wordsLimit!=0">
            <td style="text-align: center;width:90px;line-height: 64px !important;">字数超限原因</td>
            <td colspan="5" style="padding: 10px;">
              <div v-if="fromdata.exceedWordReasonList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.exceedWordReasonList" :key="item.id">
                <div v-if="item.status" class="d_flex">
                  <el-row class="d_b100">
                    <el-col>
                      <p class="pad_yj10 pad_yj11" style="text-align:left;color: blue;">{{ item.content }}</p>
                      <div class="adviceInfo">
                        <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                        <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }} </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">成文日期</td>
            <td id="completeTime" colspan="2" style="padding-left: 10px;">{{fromdata.completeTime}}</td>
            <td style="text-align: center;width:90px;">发文日期</td>
            <td id="sendTime" colspan="2" style="padding-left: 10px;width: 35%;">{{fromdata.sendTime}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">附件分别发送</td>
            <td id="isSeparate" colspan="2" style="padding-left: 10px;">{{fromdata.isSeparate}}</td>
            <td style="text-align: center;width:90px;">是否半电子</td>
            <td id="isArtificial" colspan="2" style="padding-left: 10px;">{{fromdata.isArtificial}}</td>
          </tr>
          <!-- <tr>
            <td style="text-align: center;width:90px;">附件名称</td>
            <td colspan="5" style="text-align: left;padding-left: 10px;">
              <p style="line-height: 30px;" v-for="(item, index) in fromdata.attchmentFileInfo" :key="index">
                {{index+1}} {{item.fileName}}
              </p>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import dateFormate from "@/util/filters"
import computedNodeHeight from "@/minixs/computedNodeHeight";
import formTextChange from '@/components/formText/index';
import printStyle from "@/minixs/printStyle";

export default {
  mixins:[computedNodeHeight,printStyle],
  data() {
    return {
      formText:{
        inline:"本行发送",
        outsideSign:"行外会签",
      },
      crosPage: false, // 判断是否跨页
      transSendList: [], // 跨页后上部分的签发意见
      showUnionDepartment: false,
      psFlag:false,
      oneHeight:'',
      printPsyjDiv:"",
      printPsyj:"",
      hldmsFlag:false,//行领导秘书
      printPsyjStyle: "",
      OnedyclPrint: "",
      tableUp: "",
      heightQFYJ: "",

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
        opinionSendList: [],
        opinionDrafList: [],
        opinionSignList: [],
        opinionCheckList: [],
        commentsList: [],
        opinionCheck: "",
        completeTime: "",
        sendTime: "",
        isSeparate: "",
        exceedWordReasonList: [],
        secretType: "",
        secretFlagType: "",
        secretLimitType: "",
        secretTimeType: "",
        secretFlagContent: "",
      },
      showTextType: false,
      showMeeting: false,
      isCountry: 'el-icon-star-off pad_10',
      symm: true,
      gzlx: true,
      draftOrganTitle: "",
      //正文字数提示信息
      wordsLimitInfo: {
        wordsLimit: "",
        draftWords: "",
        reasonWords: "",
        stepsNames: "",
        dialogSetLimit: false,
        dialogDraftTips: false,
        dialogReasonTips: false,
        dialogNextStepTips: false,
        reasonDom: "exceedWordReason"
      },
      unitId: ""
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
    //initData
    initData() {
      let that = this;
      let receiveselect = {
        function: "toEditAddSend",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear||"",
        unitId: this.unitId
      };
      this.$post
        .postData(
          "toEditAddSend",
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res)
          that.fromdata = Object.assign({}, that.fromdata, res.data);
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文处理单";
          }

          if(that.fromdata.secretFlagContent&&that.fromdata.secretFlagContent.length>5) {
            that.fromdata.secretTimeType = "";
            that.fromdata.secretFlagContent = dateFormate.date(Date.parse(that.fromdata.secretFlagContent))
          }

          that.fromdata.completeTime = that.fromdata.completeTime?dateFormate.date(Date.parse(that.fromdata.completeTime)):""
          that.fromdata.sendTime = that.fromdata.sendTime?dateFormate.date(Date.parse(that.fromdata.sendTime)):""

          that.fromdata.sendBasis = res.data.sendBasis&&JSON.parse(res.data.sendBasis)

          
          if (that.fromdata.type == "行发文" || that.fromdata.type == "部门发文" || that.fromdata.type == "党务发文") {
            that.showMeeting = false
            that.showTextType = true
          } else if(that.fromdata.type == "会议纪要") {
            that.showMeeting = true
            that.showTextType = false
          } else {
            that.showMeeting = false
            that.showTextType = false
          }

          if(that.fromdata.secretType == "商业秘密") {
            this.symm = true
          } else {
            this.symm = false
          }
          if(that.fromdata.secretType == "工作类型") {
            this.gzlx = true
          } else {
            this.gzlx = false
          }
          
          if(that.fromdata.secretType == "国家秘密") {
            that.isCountry = "el-icon-star-on pad_10"
          }

          that.fromdata.meetingEndTime = that.fromdata.meetingEndTime?dateFormate.dataFormat(Date.parse(that.fromdata.meetingEndTime)):""
          that.fromdata.draftTime = that.fromdata.draftTime?dateFormate.date(Date.parse(that.fromdata.draftTime)):""
          
          that.wordsLimitInfo.draftWords = that.fromdata.sizeFact;
          that.wordsLimitInfo.wordsLimit = that.fromdata.sizeLimit || 0

          that.fromdata.opinionCheckList =
            res.data &&
            res.data.opinionCheckList &&
            JSON.parse(res.data.opinionCheckList);
          // if(that.fromdata.currentNode=='行领导秘书'&&that.fromdata.opinionCheckList.length>1) {
          //   let transArr = []
          //   transArr.push(that.fromdata.opinionCheckList.shift())
          //   that.fromdata.opinionCheckList = [].concat(transArr)
          // }
          
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
          that.fromdata.commentsList =
            res.data &&
            res.data.commentsList &&
            JSON.parse(res.data.commentsList);
          that.fromdata.exceedWordReasonList =
            res.data &&
            res.data.exceedWordReasonList &&
            JSON.parse(res.data.exceedWordReasonList);
          // 判断当前环节是否是行领导秘书
          if (
            res.data &&
            res.data.currentNode &&
            res.data.currentNode == "行领导秘书"
          ) {
            this.hldmsFlag = true;
            if (
              this.fromdata.opinionCheckList &&
              this.fromdata.opinionCheckList.length > 1
            ) {
              // this.fromdata.opinionCheckList = this.fromdata.opinionCheckList.slice(
              //   0,
              //   1
              // );
              let transArr = []
              transArr.push(that.fromdata.opinionCheckList.shift())
              that.fromdata.opinionCheckList = [].concat(transArr)
            }
          } else {
            that.hldmsFlag = false;
          }

          // that.$nextTick(() => {
          //   that.oneHeight = $(that.$refs.dyclPrint).height(); // 总体高度
          //   console.log("11", that.oneHeight);
          //   that.OnedyclPrint = $("#dyclPrintOne").height(); // 顶部div高度
          //   console.log("aa", that.OnedyclPrint);
            
          //   that.tableUp = $("#tableUp").height(); // 上面table高度
          //   console.log("bb", that.tableUp);
          //   that.heightQFYJ = $(that.$refs.domQFYJ).height(); // 获取签发意见的高
          //   console.log("33", that.heightQFYJ);
          //   that.printPsyj = parseInt((1090 - (that.OnedyclPrint + that.tableUp))/that.heightQFYJ);
          //   console.log("44", that.printPsyj);
          //   // let len = that.fromdata.opinionSendList.length
          //   // if (that.printPsyj>0&&len>0) {
          //   //   that.crosPage = true;
          //   //   that.transSendList = that.fromdata.opinionSendList.splice(0, that.printPsyj)
          //   //   console.log(that.transSendList)
          //   // }
          //   that.printPsyjStyle = that.printPsyj + "px";
          //   // $(this.$refs.print_psyj)[0].css("height",this.printPsyj+'px'+'!important');
          //   // console.log('44',this.$refs.print_psyj.style.height)

          //   if (
          //     that.fromdata.approvalOpinionList &&
          //     that.fromdata.approvalOpinionList.length <= 0
          //   ) {
          //     if (that.printPsyj > 150) {
          //       that.psFlag = true;
          //       //  that.printPsyjDiv = that.printPsyj;
          //       that.printPsyjStyle = that.printPsyj + "px";
          //     } else {
          //       that.psFlag = false;
          //       // that.printPsyjDiv = (that.printPsyj+'150')+"px";
          //       that.printPsyjStyle = that.printPsyj + 150 + "px";
          //     }
          //   } else {
          //     if (that.printPsyjDiv < that.printPsyj) {
          //       that.psFlag = true;
          //       // that.printPsyjDiv = that.printPsyj;
          //       that.printPsyjStyle = that.printPsyj + "px";
          //     } else {
          //       that.psFlag = false;
          //       // that.printPsyjDiv = (that.printPsyj+'150')+"px";
          //       that.printPsyjStyle = that.printPsyj + 150 + "px";
          //     }
          //   }
          // });
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
    height: 32px;
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
.pad_yj10 {
  padding: 0;
  white-space: pre-line;
  word-break: break-all;
}
</style>