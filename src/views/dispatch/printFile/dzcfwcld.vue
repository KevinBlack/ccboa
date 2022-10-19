<template>
  <!-- 一、	发文管理：
  1.	电子发文处理单-->

  <div class="tablePrint">
    <div ref="dyclPrint" class="dyclPrint">
      <el-row id="dyclPrintOne">
        <h1 style class="title-h1">{{draftOrganTitle}}</h1>
        <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
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
            <td id="title" style="text-align: center;width:90px;">正文标题</td>
            <td id="title" :colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
          </tr>
          <tr>
            <td id="newTitle" style="text-align: center;width:90px;">修改后正文标题</td>
            <td id="newTitle" :colspan="5" style="padding-left: 10px;">{{fromdata.newTitle}}</td>
          </tr>
          <tr>
            <td id="attachTitle" style="text-align: center;width:90px;">附件标题</td>
            <td id="attachTitle" :colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.attachTitle}}</td>
          </tr>
          <tr>
            <td id="newAttachTitle" style="text-align: center;width:90px;">修改后附件标题</td>
            <td id="newAttachTitle" :colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.newAttachTitle}}</td>
          </tr>
          <tr>
            <td id="documentNo" style="text-align: center;width:90px;">发文字号</td>
            <td id="documentNo" style="padding-left: 10px;">{{fromdata.documentNo}}</td>
            <td id="fileFlag" style="text-align: center;width:90px;">文件形式</td>
            <td id="fileFlag" style="padding-left: 10px;">{{fromdata.fileFlag}}</td>
            <td id="oldQfr" style="text-align: center;width:90px;">原签发人</td>
            <td id="oldQfr" style="padding-left: 10px;">{{fromdata.oldQfr}}</td>          
          </tr>
          <tr>
            <td id="hostDepartment" style="text-align: center;width:90px;">主办部门</td>
            <td id="hostDepartment" style="padding-left: 10px;">{{fromdata.hostDepartment}}</td>
            <td id="newDraftUser" style="text-align: center;width:90px;">申请人</td>
            <td id="newDraftUser" style="padding-left: 10px;">{{fromdata.newDraftUser}}</td>
            <td id="phone" style="text-align: center;width:90px;">联系电话</td>
            <td id="phone" style="padding-left: 10px;">{{fromdata.phone}}</td>          
          </tr>
          <tr>
            <td id="completeTime" style="text-align: center;width:90px;">成文日期</td>
            <td id="completeTime" style="padding-left: 10px;">{{fromdata.completeTime}}</td>
            <td id="applyDate" style="text-align: center;width:90px;">申请日期</td>
            <td id="applyDate" style="padding-left: 10px;">{{fromdata.applyDate}}</td>
            <td id="newSendDate" style="text-align: center;width:90px;">重发日期</td>
            <td id="newSendDate" style="padding-left: 10px;">{{fromdata.newSendDate}}</td>          
          </tr>
          <tr>
            <td id="isDirect" style="text-align: center;width:90px;">直发文件</td>
            <td id="isDirect" :colspan="fromdata.isDirect==='否' ? 5 :1" style="padding-left: 10px;">{{fromdata.isDirect}}</td>
            <td id="directRange" v-if="fromdata.isDirect==='否' ? false :true" style="text-align: center;width:90px;">直发范围</td>
            <td id="directRange" v-if="fromdata.isDirect==='否' ? false :true" style="padding-left: 10px;">{{fromdata.directRange}}</td>
            <td id="directType" v-if="fromdata.isDirect==='否' ? false :true" style="text-align: center;width:90px;">直发文种类</td>
            <td id="directType" v-if="fromdata.isDirect==='否' ? false :true" style="padding-left: 10px;">{{fromdata.directType}}</td>
          </tr>
          <tr v-if="fromdata.sendType=='电子'">
            <td style="text-align: center;width:90px;">会签部门</td>
            <td colspan="5"
              style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
            >{{fromdata.signDepartmentName?fromdata.signDepartmentName+';'+(fromdata.finishSignDepartmentName?fromdata.finishSignDepartmentName:''):fromdata.finishSignDepartmentName?fromdata.finishSignDepartmentName:''}}</td>
          </tr>
          <tr v-if="fromdata.sendType=='电子'">
            <td style="text-align: center;width:90px;">重发会签</td>
            <td colspan="5"
              style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
            >{{fromdata.finishNewSignDepartmentName}}</td>
          </tr>
          <tr>
            <td id="newReason" style="text-align: center;width:90px;">重发原因</td>
            <td id="newReason" colspan="5"
              style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
            >{{fromdata.newReason}}</td>
          </tr>
          <tr>
            <td id="newContext" style="text-align: center;width:90px;">修改内容</td>
            <td id="newContext" colspan="5"
              style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
            >{{fromdata.newContext}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;line-height: 64px !important;">签发意见</td>
            <td id="send_send" colspan="5" style="padding: 10px;" :style="{height:printPsyjStyle+'!important'}">
              <div v-if="fromdata.opinionSendList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <!-- <div v-if="hldmsFlag" style="height:151px" :class="{needAddHeight:hldmsFlag}"></div> -->
              <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
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
          <div style="page-break-after:always" v-if="psFlag"></div>
          <tr>
            <td style="text-align: center;width:90px;line-height: 64px !important;">办公室负责人意见</td>
            <td id="send_send" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.repeatOfficeList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.repeatOfficeList" :key="item.id">
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
          <tr v-if="fromdata.sendType=='电子'">
            <td style="text-align: center;width:90px;line-height: 64px !important;">会签意见</td>
            <td id="send_send" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.opinionSignList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.opinionSignList" :key="item.id">
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
          <tr style="height:100px">
            <td style="text-align: center;width:90px;line-height: 64px !important;">申请部门意见</td>
            <td id="opinionDraf" colspan="5" style="padding: 10px;">
              <div v-if="fromdata.repeatApplyDeptList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
              <div v-for="(item) in fromdata.repeatApplyDeptList" :key="item.id">
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
          <tr style="height:100px">
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
          <tr v-if="fromdata.sendType=='电子'">
            <td id="isSeparate" style="text-align: center;width:90px;">附件分别发送</td>
            <td id="isSeparate" colspan="2" style="padding-left: 10px;">{{fromdata.isSeparate}}</td>
            <td id="isArtificial" style="text-align: center;width:90px;">是否半电子</td>
            <td id="isArtificial" colspan="2" style="padding-left: 10px;">{{fromdata.isArtificial}}</td>
          </tr>
          <!-- <tr v-if="fromdata.sendType=='电子'">
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
import dateFormate from '@/util/filters.js'
import computedNodeHeight from "@/minixs/computedNodeHeight";
import textInternational from "@/minixs/textInternational";
import printStyle from "@/minixs/printStyle";

export default {
  mixins:[computedNodeHeight, textInternational,printStyle],
  data() {
    return {
      psFlag:false,
      oneHeight:'',
      printPsyjDiv:"",
      printPsyj:"",
      hldmsFlag:false,//行领导秘书
      printPsyjStyle: "",
      OnedyclPrint: "",
      TwodyclPrint: "",

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
        repeatOfficeList: [],
        opinionSignList: [],
        repeatApplyDeptList: [],
        commentsList: [],
        opinionCheck: "",
        completeTime: "",
        sendTime: "",
        isSeparate: ""
      },
      showMeeting: false,
      isCountry: 'el-icon-star-off pad_10',
      symm: true,
      gzlx: true,
      draftOrganTitle: "",
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
    initData() {
      let that = this;
      let receiveselect = {
        function: "toEditAgainOrder",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear||"",
        unitId: this.unitId
      };
      this.$post
        .postData(
          "toEditAgainOrder",
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          that.fromdata = res.data;

          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + that.fromdata.sendType + "发文重发审批处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + that.fromdata.sendType + "发文重发审批处理单";
          }

          // 判断当前环节是否是行领导秘书
          if(res.data && res.data.currentNode && res.data.currentNode == "行领导秘书处理"){
            this.hldmsFlag = true;
          }else{
            this.hldmsFlag = false;
          }
          
          that.fromdata.opinionSendList =
            res.data &&
            res.data.opinionSendList &&
            JSON.parse(res.data.opinionSendList);
          that.fromdata.repeatOfficeList =
            res.data &&
            res.data.repeatOfficeList &&
            JSON.parse(res.data.repeatOfficeList);
          that.fromdata.opinionSignList =
            res.data &&
            res.data.opinionSignList &&
            JSON.parse(res.data.opinionSignList);
          that.fromdata.repeatApplyDeptList =
            res.data &&
            res.data.repeatApplyDeptList &&
            JSON.parse(res.data.repeatApplyDeptList);
          that.fromdata.commentsList =
            res.data &&
            res.data.commentsList &&
            JSON.parse(res.data.commentsList);

          // this.$nextTick(() => {
          //   if(that.fromdata.currentNode=='行领导秘书') {
          //     this.oneHeight = $(this.$refs.dyclPrint).height();
          //     console.log("11", this.oneHeight);
          //     this.OnedyclPrint = $("#dyclPrintOne").height();
          //     console.log("aa", this.OnedyclPrint);
          //     // this.TwodyclPrint = $("#dyclPrintTwo").height();
              
          //     this.TwodyclPrint = $("#print-table").height();
          //     console.log("bb", this.TwodyclPrint);
          //     this.printPsyjDiv = $(this.$refs.print_psyj_div).height();
          //     console.log(
          //       "22",
          //       this.printPsyjDiv,
          //       "cc",
          //       this.OnedyclPrint + this.TwodyclPrint
          //     );
          //     // this.printPsyj = 1090 - this.oneHeight;
          //     this.printPsyj = 1090 - (this.OnedyclPrint + this.TwodyclPrint);
          //     console.log("33", this.printPsyj);
          //     this.printPsyjStyle = this.printPsyj + "px";
          //     // $(this.$refs.print_psyj)[0].css("height",this.printPsyj+'px'+'!important');
          //     // console.log('44',this.$refs.print_psyj.style.height)

          //     if (
          //       this.fromdata.approvalOpinionList &&
          //       this.fromdata.approvalOpinionList.length <= 0
          //     ) {
          //       if (this.printPsyj > 150) {
          //         this.psFlag = true;
          //         //  this.printPsyjDiv = this.printPsyj;
          //         this.printPsyjStyle = this.printPsyj + "px";
          //       } else {
          //         this.psFlag = false;
          //         // this.printPsyjDiv = (this.printPsyj+'150')+"px";
          //         this.printPsyjStyle = this.printPsyj + 150 + "px";
          //       }
          //     } else {
          //       if (this.printPsyjDiv < this.printPsyj) {
          //         this.psFlag = true;
          //         // this.printPsyjDiv = this.printPsyj;
          //         this.printPsyjStyle = this.printPsyj + "px";
          //       } else {
          //         this.psFlag = false;
          //         // this.printPsyjDiv = (this.printPsyj+'150')+"px";
          //         this.printPsyjStyle = this.printPsyj + 150 + "px";
          //       }
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
          console.log(erro)
        });
    }
  },
  mounted(){
    this.textChange('send','print')
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
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
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
</style>