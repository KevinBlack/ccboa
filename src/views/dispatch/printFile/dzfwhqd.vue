<template>
  <div class="tablePrint"> 
    <el-row>
      <h1 style="" class="title-h1">{{ draftOrganTitle }}</h1>
      <el-button class="printButton" @click="printThis()" v-if="printShow" type="info" plain>打印</el-button>
    </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
      <tbody>
        <tr>
          <td style="text-align:center;width:90px;">发文类型</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{fromdata.type}}</td>
          <td style="text-align:center;width:90px;">代字/红头</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{fromdata.redHead}}</td>
          <td style="text-align:center;width:90px;">发文字号</td>
          <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.documentNo}}</td>
        </tr>
        <tr>
            <td style="text-align: center">紧急程度</td>
            <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.emergencyLevel}}</td>
            <td style="text-align: center">业务分类</td>
            <td id="businessType" style="padding-left: 10px;">{{fromdata.businessType}}</td>
            <td v-if="!showMeeting" style="text-align: center" class="wenzhong">文&nbsp;&nbsp;种</td>
            <td v-if="showMeeting" style="text-align: center" class="wenzhong">会议结束时间</td>
            <td v-if="!showMeeting" id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.textType}}</td>
            <td v-if="showMeeting" id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.meetingEndTime}}</td>
        </tr>
        <tr>
          <td>秘密类型</td>
            <td :colspan="gzlx?5:1" style="width: 20%; padding-left: 10px;">{{fromdata.secretType}}</td>
            <td v-if="!gzlx" style="width: 16%; text-align: center">{{(fromdata.secretType=='商业秘密')?'秘密期限类型':'秘密标志'}}</td>
            <td v-if="!gzlx" :colspan="!symm?3:1" style="width: 18%; padding-left: 10px;">{{(fromdata.secretType=='商业秘密')?fromdata.secretLimitType:fromdata.secretFlagType}}</td>
            <td v-if="symm" style="width: 11%; text-align: center">密级和保密期限</td>
            <td v-if="symm" style="width: 26%; padding-left: 10px;">
              <span v-if="(fromdata.secretTimeType)&&(fromdata.secretType=='商业秘密')">
                {{fromdata.secretFlagType}}<i :class="isCountry"></i>{{fromdata.secretFlagContent+fromdata.secretTimeType}}
              </span>
              <span v-if="!(fromdata.secretTimeType)&&(fromdata.secretType=='商业秘密')">
                {{fromdata.secretFlagType}}<i :class="isCountry"></i>{{fromdata.secretFlagContent}}
              </span>
            </td>   
        </tr>
        <tr>
            <td style="text-align: center">主办部门</td>
            <td :colspan="showUnionDepartment?5:1" id="hostDepartment" style="padding-left: 10px;">{{fromdata.draftDepartment}}</td>
            <td v-if="!showUnionDepartment" style="text-align: center">联合发文单位</td>
            <td v-if="!showUnionDepartment" id="unionDepartment" colspan="3" style="padding-left: 10px;">{{fromdata.unionDepartment}}</td>
        </tr>

        <tr>
            <td style="text-align: center">拟&nbsp;稿&nbsp;人</td>
            <td id="draftUser" style="padding-left: 10px;">{{fromdata.draftUser}}</td>
            <td style="text-align: center">联系电话</td>
            <td id="phone" style="padding-left: 10px;">{{fromdata.phone}}</td>
            <td style="text-align: center">拟稿日期</td>
            <td id="draftTime" style="padding-left: 10px;">{{fromdata.draftTime}}</td>
        </tr>
        <tr>
            <td style="text-align: center">发文依据</td>
            <td id="sendBasis" colspan="5" style="padding-left: 10px;text-align: left;">
              <ul>
                <li v-for="item in fromdata.sendBasis" :key="item.id">
                  {{item.documentCode}}
                </li>
              </ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: center">直发文件</td>
            <td :colspan="!isDirectFlag?5:1" id="isDirect" style="padding-left: 10px;">{{fromdata.isDirect}}</td>
            <td v-if="isDirectFlag" style="text-align: center">直发范围</td>
            <td v-if="isDirectFlag" id="directRange" style="padding-left: 10px;">{{fromdata.directRange}}</td>
            <td v-if="isDirectFlag" style="text-align: center">直发文种类</td>
            <td v-if="isDirectFlag" id="directType" style="padding-left: 10px;">{{fromdata.directType}}</td>
        </tr>
        <tr v-if="fromdata.isStandardFile=='是'&&fromdata.ifProtect==1">
          <td id="sendBasis" style="text-align: center;width:90px;">是否经过消保审查</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.isNeedCheckcp}}</td>
        </tr>
        <tr>
            <td style="text-align: center">档案利用<br>范围</td>
            <td id="userRange" style="padding-left: 10px;">{{fromdata.userRange}}</td>
            <td style="text-align: center">规章或规范性<br>文件</td>
            <td id="isStandardFile" style="padding-left: 10px;">{{fromdata.isStandardFile}}</td>
            <td style="text-align: center">保管期限</td>
            <td id="keepLimit" style="padding-left: 10px;">{{fromdata.keepLimit}}</td>
        </tr>
        <tr>
            <td style="text-align: center">正文标题</td>
            <td id="title" colspan="5" style="padding-left: 10px;text-align: left;">{{fromdata.title}}</td>
        </tr>
        <tr>
            <td style="text-align: center">附件标题</td>
            <td id="attachTitle" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.attachTitle}}</td>
        </tr>
        <tr>
            <td style="text-align: center">会签部门</td>
            <td id="signDepartment" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.signDepartment?fromdata.signDepartment+';'+(fromdata.finishSignDepartmentName||''):''}}</td>
        </tr>
        <tr>
            <td style="text-align: center">{{formText.outsideSign}}</td>
            <td id="outsideSign" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.outsideSign}}</td>
        </tr>
        <tr>
            <td style="text-align: center">主&nbsp;&nbsp;送</td>
            <td id="main" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.mainSend}}</td>
        </tr>
        <tr>
            <td style="text-align: center">抄&nbsp;&nbsp;送</td>
            <td id="copy" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.copySend}}</td>
        </tr>
        <tr>
            <td style="text-align: center">{{formText.inline}}</td>
            <td id="inline" colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.inlineSend}}</td>
        </tr>
        <tr>
            <td style="text-align: center;line-height: 64px !important;">签发意见</td>
            <td id="opinionDraf" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.opinionSendList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
                <div v-if="item.status" class="d_flex">
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
            <td style="text-align: center;line-height: 64px !important;">核稿意见</td>
            <td id="opinionDraf" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.opinionDrafList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.opinionDrafList" :key="item.id">
                <div v-if="item.status" class="d_flex">
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
            <td style="text-align: center;line-height: 64px !important;">会签意见</td>
            <td id="opinionDraf" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.opinionSignList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="item in fromdata.opinionSignList" :key="item.id">
                <div v-if="item.status" class="d_flex">
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
            <td style="text-align: center;line-height: 64px !important;">审核意见</td>
            <td id="opinionDraf" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.opinionCheckList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="item in fromdata.opinionCheckList" :key="item.id">
                <div v-if="item.status" class="d_flex">
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
            <td style="text-align: center;line-height: 64px !important;">备注</td>
            <td colspan="5" id="opinionSign" style="padding: 10px;">
              <div v-if="fromdata.commentsList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.commentsList" :key="item.id">
                <div v-if="item.status" class="d_flex">
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
          <td style="text-align: center">正文字数</td>
          <td colspan="5" style="color:blue;padding: 10px;">{{fromdata.sizeFact}}</td>
        </tr> -->
        <tr style="height: 40px;" v-if="fromdata.isExceed && wordsLimitInfo.wordsLimit!=0">
          <td style="text-align: center;line-height: 64px !important;">字数超限原因</td>
          <td colspan="5" style="color:blue;padding: 10px;">
            <div v-if="fromdata.exceedWordReasonList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
            <div v-for="(item) in fromdata.exceedWordReasonList" :key="item.id">
              <div v-if="item.status" class="d_flex blue_size_yuanYin">
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
            <td style="text-align: center;line-height: 64px !important;">最终意见</td>
            <td colspan="5" id="opinionSign" style="padding: 10px;">
              <div v-if="fromdata.finalOpinionList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.finalOpinionList" :key="item.id">
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
            <td style="text-align: center;line-height: 64px !important;">过程意见</td>
            <td id="opinionDraf" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.opinionSendList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.processOpinionList" :key="item.id">
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
          <td style="text-align: center">附件分别发送</td>
          <td id="isSeparate" colspan="2" style="padding-left: 10px;">{{fromdata.isSeparate}}</td>
          <td style="text-align: center">是否半电子</td>
          <td id="isArtificial" colspan="2" style="padding-left: 10px;">{{fromdata.isArtificial}}</td>
        </tr>
        <!-- <tr>
          <td>附件名称</td>
          <td colspan="5" style="text-align: left;padding-left: 10px;">
            <p style="line-height: 30px;" v-for="(item, index) in fromdata.attchmentFileInfo" :key="index">
              {{index+1}} {{item.fileName}}
            </p>
          </td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>


<script>
import Vue from 'vue'
import dateFormate from '@/util/filters.js'
import computedNodeHeight from "@/minixs/computedNodeHeight";
import formTextChange from '@/components/formText/index';
import printStyle from "@/minixs/printStyle";

export default {
  mixins:[computedNodeHeight,printStyle],
  data(){
    return {
      formText:{
        inline:"本行发送",
        outsideSign:"行外会签",
      },
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
        meetingEndTime: "",
        copy: "",
        inline: "",
        knowScore: "",
        secretGists: "",
        opinionSendList: [],
        opinionDrafList: [],
        opinionSignList: [],
        opinionCheckList: [],
        finalOpinionList: [],
        processOpinionList: [],
        commentsList: [],
        opinionCheck: "",
        completeTime: "",
        sendTime: "",
        isSeparate: "",
        exceedWordReasonList: []
      },
      showMeeting: false,
      isCountry: 'el-icon-star-off pad_10',
      symm: true,
      gzlx: true,
      isDirectFlag: false,
      showUnionDepartment: true,
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
  methods:{
    async printThis(){
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
    cuteData(data, name, type) {
      if (this.fromdata[name]) {
        this.fromdata[name].forEach(item => {
          if (!item.status) {
            this.fromdata[data] = item.content;
            this.fromdata[type] = item.id;
          }
        });
      }
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
        function: "getSignInfo",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear||"",
        unitId: this.unitId
      };
      this.$post
        .postData(
          "getSignInfo",
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          that.fromdata = res.data;
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文会签单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文会签单";
          }

          that.fromdata.sendBasis = res.data.sendBasis&&JSON.parse(res.data.sendBasis)

          if(that.fromdata.type!="会议纪要") {
            that.showMeeting = false
          } else {
            that.showMeeting = true
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

          if (that.fromdata.type == "部门发文" || that.fromdata.type == "行发文") {
            this.showUnionDepartment = false;
          } else {
            this.showUnionDepartment = true;
          }

          if(that.fromdata.secretType == "国家秘密") {
            that.isCountry = "el-icon-star-on pad_10"
          }

          // 直发范围控制
          if (this.fromdata.isDirect == "否") {
            this.isDirectFlag = false;
          } else if (this.fromdata.isDirect == "是") {
            this.isDirectFlag = true;
          }

          that.fromdata.meetingEndTime = that.fromdata.meetingEndTime?dateFormate.dataFormat(Date.parse(that.fromdata.meetingEndTime)):""
          that.fromdata.draftTime = that.fromdata.draftTime?dateFormate.date(Date.parse(that.fromdata.draftTime)):""
          
          that.wordsLimitInfo.draftWords = that.fromdata.sizeFact;
          that.wordsLimitInfo.wordsLimit = that.fromdata.sizeLimit || 0

          that.fromdata.opinionSendList =
            res.data &&
            res.data.opinionSendList &&
            JSON.parse(res.data.opinionSendList);
          that.fromdata.opinionDrafList =
            res.data &&
            res.data.opinionDrafList &&
            JSON.parse(res.data.opinionDrafList);
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
          that.fromdata.finalOpinionList =
            res.data &&
            res.data.finalOpinionList &&
            JSON.parse(res.data.finalOpinionList);
          that.fromdata.processOpinionList =
            res.data &&
            res.data.processOpinionList &&
            JSON.parse(res.data.processOpinionList);
          //处理会签 、主送、抄送、本行发送
          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          if (res.data.signDepartmentIds) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentIds,
              res.data.signDepartment
            );
          }
          if (res.data.copyIds) {
            this.chaoCheckData = this.concatTreeData(
              res.data.copyIds,
              res.data.copy
            );
          }
          if (res.data.inlineIds) {
            this.benCheckData = this.concatTreeData(
              res.data.inlineIds,
              res.data.inline
            );
          }
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
    this.unitId = this.$route.query.unitId||"";
    //initData
    this.initData();
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.tablePrint{
    width: 900px;
    margin: 0 auto;
    background-color: white;
}
.printTableList{
    width: 94%;
    margin: 0 auto;
    tr{
        height:32px;
        td{
            width: 12%; text-align: center;vertical-align: middle;
        }
    }
}
.title-h1{
    font-family: 宋体;font-size: 35px;text-align: center;line-height: 100px;
}
.printButton{
    position: absolute;
    top: 60%;
    right: 3%;
}
td {
	border: solid #000 1px;
}
.tcont{padding-bottom:5px;border-bottom:1px solid #DAC6C5;}
.tcont:last-child{
	border-bottom:none;
}
.tcont font{
	/* background-color:#F2CACB; */
	}
.tcont2{text-align:right;padding-top:5px;width:100%;height:30px;}
.tcont2>div{float:right;
/* background-color:#F2CACB; */
}
.issueTable{
	height:100%;
	border-collapse: collapse;
	border: none;
	width: 100%;
}
.issueTable tr:nth-of-type(1){
	border-top: none;
}
.issueTable tr:last-child{
	border-bottom: none;
}
.issueTable td{
	border: none;
}
 .issueTable tr {
 	  line-height: 25px;
 	  text-align:center;
      border: solid 1px #000;
      border-left: none;
      border-right: none;
  }
.pad_yj10 {
  padding: 0;
  white-space: pre-line;
  word-break: break-all;
}
</style>