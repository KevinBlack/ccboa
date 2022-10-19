<template>
  <div class="tablePrint"> 
    <el-row>
      <h1 style="" class="title-h1">{{ draftOrganTitle }}</h1>
      <el-button class="printButton" @click="printThis()" v-if="printShow" type="info" plain>打印</el-button>
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
          <td id="title">正文标题</td>
          <td id="title" :colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
        </tr>
        <tr>
          <td id="newTitle">修改后正文标题</td>
          <td id="newTitle" :colspan="5" style="padding-left: 10px;">{{fromdata.newTitle}}</td>
        </tr>
        <tr>
          <td id="attachTitle">附件标题</td>
          <td id="attachTitle" :colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.attachTitle}}</td>
        </tr>
        <tr>
          <td id="newAttachTitle">修改后附件标题</td>
          <td id="newAttachTitle" :colspan="5" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.newAttachTitle}}</td>
        </tr>
        <tr>
          <td id="documentNo">发文字号</td>
          <td id="documentNo" style="padding-left: 10px;">{{fromdata.documentNo}}</td>
          <td id="fileFlag">文件形式</td>
          <td id="fileFlag" style="padding-left: 10px;">{{fromdata.fileFlag}}</td>
          <td id="oldQfr">原签发人</td>
          <td id="oldQfr" style="padding-left: 10px;">{{fromdata.oldQfr}}</td>          
        </tr>
        <tr>
          <td id="hostDepartment">主办部门</td>
          <td id="hostDepartment" style="padding-left: 10px;">{{fromdata.hostDepartment}}</td>
          <td id="newDraftUser">申请人</td>
          <td id="newDraftUser" style="padding-left: 10px;">{{fromdata.newDraftUser}}</td>
          <td id="phone">联系电话</td>
          <td id="phone" style="padding-left: 10px;">{{fromdata.phone}}</td>          
        </tr>
        <tr>
          <td id="completeTime">成文日期</td>
          <td id="completeTime" style="padding-left: 10px;">{{fromdata.completeTime}}</td>
          <td id="applyDate">申请日期</td>
          <td id="applyDate" style="padding-left: 10px;">{{fromdata.applyDate}}</td>
          <td id="newSendDate">重发日期</td>
          <td id="newSendDate" style="padding-left: 10px;">{{fromdata.newSendDate}}</td>          
        </tr>
        <tr>
          <td id="isDirect" style="text-align: center">直发文件</td>
          <td id="isDirect" :colspan="fromdata.isDirect==='否' ? 5 :1" style="padding-left: 10px;">{{fromdata.isDirect}}</td>
          <td id="directRange" v-if="fromdata.isDirect==='否' ? false :true" style="text-align: center">直发范围</td>
          <td id="directRange" v-if="fromdata.isDirect==='否' ? false :true" style="padding-left: 10px;">{{fromdata.directRange}}</td>
          <td id="directType" v-if="fromdata.isDirect==='否' ? false :true" style="text-align: center">直发文种类</td>
          <td id="directType" v-if="fromdata.isDirect==='否' ? false :true" style="padding-left: 10px;">{{fromdata.directType}}</td>
        </tr>
        <tr>
          <td style="text-align: center">会签部门</td>
          <td colspan="2"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.signDepartmentName?fromdata.signDepartmentName+';'+fromdata.finishSignDepartmentName:fromdata.finishSignDepartmentName}}</td>
          <td id="newSignDepartmentName" style="text-align: center">重发会签</td>
          <td id="newSignDepartmentName" colspan="2"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.newSignDepartmentName}}</td>
        </tr>
        <tr>
          <td id="newReason" style="text-align: center">重发原因</td>
          <td id="newReason" colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.newReason}}</td>
        </tr>
        <tr>
          <td id="newContext" style="text-align: center">修改内容</td>
          <td id="newContext" colspan="5"
            style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
          >{{fromdata.newContext}}</td>
        </tr>
        <tr>
          <td style="text-align: center;line-height: 64px !important;">签发意见</td>
          <td id="send_send" colspan="5" style="padding: 10px;">
            <div v-if="fromdata.opinionSendList.length==0&&fromdata.isArtificial=='是'" style="height:90px"></div>
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
        <tr>
          <td style="text-align: center;line-height: 64px !important;">办公室负责人意见</td>
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
        <tr>
          <td style="text-align: center;line-height: 64px !important;">会签意见</td>
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
          <td style="text-align: center;line-height: 64px !important;">申请部门意见</td>
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
          <td style="text-align: center;line-height: 64px !important;">备注</td>
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
        <tr style="height:100px">
          <td style="text-align: center;line-height: 64px !important;">最终意见</td>
          <td id="opinionDraf" colspan="5" style="padding: 10px;">
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
        <tr style="height:100px">
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
          <td id="isSeparate" style="text-align: center">附件分别发送</td>
          <td id="isSeparate" colspan="2" style="padding-left: 10px;">{{fromdata.isSeparate}}</td>
          <td id="isArtificial" style="text-align: center">是否半电子</td>
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
import textInternational from "@/minixs/textInternational";
import printStyle from "@/minixs/printStyle";

export default {
  mixins:[computedNodeHeight, textInternational,printStyle],
  data(){
    return {
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
        finalOpinionList: [],
        processOpinionList: [],
        opinionCheck: "",
        completeTime: "",
        sendTime: "",
        isSeparate: ""
      },
      showMeeting: false,
      isCountry: 'el-icon-star-off pad_10',
      symm: true,
      gzlx: true,
      isDirectFlag: false,
      draftOrganTitle: "",
      showUnionDepartment: true,
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
    initData() {
      let that = this;
      let receiveselect = {
        function: "getAgainSignInfo",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear||"",
        unitId: this.$route.query.unitId
      };
      this.$post
        .postData(
          "getAgainSignInfo",
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          that.fromdata = res.data;
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文重发会签处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文重发会签处理单";
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
          that.fromdata.finalOpinionList =
            res.data &&
            res.data.finalOpinionList &&
            JSON.parse(res.data.finalOpinionList);
          that.fromdata.processOpinionList =
            res.data &&
            res.data.processOpinionList &&
            JSON.parse(res.data.processOpinionList);
          that.fromdata.commentsList =
            res.data &&
            res.data.commentsList &&
            JSON.parse(res.data.commentsList);
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