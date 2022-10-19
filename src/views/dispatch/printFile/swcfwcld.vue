<template>

<!-- 一、	发文管理：
1.	电子发文处理单 -->

  <div class="tablePrint"> 
    <el-row>
      <h1 style="" class="title-h1">{{ draftOrganTitle }}</h1>
      <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
    </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
      <tbody>
      <tr>
        <td>正文标题</td>
        <td :colspan="5" id="type" style="width: 20%; padding-left: 10px;">{{fromdata.title}}</td>
      </tr>
      <tr>
        <td>发文字号</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.documentNo}}</td>
        <td>文件形式</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.fileFlag}}</td>
        <td>原签发人</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.oldQfr}}</td>          
      </tr>
      <tr>
        <td>主办部门</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.hostDepartment}}</td>
        <td>申请人</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.newDraftUser}}</td>
        <td>联系电话</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.phone}}</td>          
      </tr>
      <tr>
        <td>成文日期</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.completeTime}}</td>
        <td>申请日期</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.applyDate}}</td>
        <td>重发日期</td>
        <td style="width: 20%; padding-left: 10px;">{{fromdata.newSendDate}}</td>          
      </tr>
      <tr>
        <td style="text-align: center">直发文件</td>
        <td :colspan="fromdata.isDirect==='否' ? 5 :1" id="isDirect" style="padding-left: 10px;">{{fromdata.isDirect}}</td>
        <td v-if="fromdata.isDirect==='否' ? false :true" style="text-align: center">直发范围</td>
        <td v-if="fromdata.isDirect==='否' ? false :true" id="directRange" style="padding-left: 10px;">{{fromdata.directRange}}</td>
        <td v-if="fromdata.isDirect==='否' ? false :true" style="text-align: center">直发文种类</td>
        <td v-if="fromdata.isDirect==='否' ? false :true" id="directType" style="padding-left: 10px;">{{fromdata.directType}}</td>
      </tr>
      <tr>
        <td style="text-align: center">会签部门</td>
        <td colspan="5"
          style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
        >{{fromdata.signDepartmentName?fromdata.signDepartmentName+';'+(fromdata.finishSignDepartmentName?fromdata.finishSignDepartmentName:''):fromdata.finishSignDepartmentName?fromdata.finishSignDepartmentName:''}}</td>
      </tr>
      <tr>
        <td style="text-align: center">重发会签</td>
        <td colspan="5"
          style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
        >{{fromdata.finishNewSignDepartmentName}}</td>
      </tr>
      <tr>
        <td style="text-align: center">重发原因</td>
        <td colspan="5"
          style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
        >{{fromdata.newReason}}</td>
      </tr>
      <tr>
        <td style="text-align: center">修改内容</td>
        <td colspan="5"
          style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;"
        >{{fromdata.newContext}}</td>
      </tr>
      <tr>
        <td style="text-align: center;line-height: 64px !important;">签发意见</td>
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
  props: {
    routeId: String
  },
  mixins:[computedNodeHeight,textInternational,printStyle],
  data(){
    return{
        huiqian:false,//是否会签  
        banjie:false,//是否办结
        printShow:true,
        fromdata:{
            type:"",
            redHead:"",
            documentNo:"",
            emergencyLevel:"",
            businessType:"",
            textType:"",
            secretType:"",
            draftOrgan:"",
            unionDepartment:"",
            draftUser:"",
            phone:"",
            draftTime:"",
            sendBasis:"",
            isDirect:"",
            directRange:"",
            directType:"",
            userRange:"",
            isStandardFile:"",
            keepLimit:"",
            title:"",
            attachTitle:"",
            signDepartment:"",
            outsideSign:"",
            main:"",
            copy:"",
            inline:"",
            knowScore:"",
            secretGists:"",
            opinionSendList:"",
            opinionDrafList:"",
            commentsList:"",
            opinionCheck:"",
            completeTime:"",
            sendTime:"",
            isSeparate:"",
        },
      showMeeting: false,
      draftOrganTitle: "",
      isCountry: 'el-icon-star-off pad_10',
      unitId: ""
    }
  },
  methods:{
    async printThis(){
      this.printShow=false;
      await this.initPrintData();
      setTimeout(()=>{
          document.execCommand("print");
      },100)
    },
    beforePrint(){
        //this.printShow=false;
    },
    afterPrint(){
        this.printShow=true;
    },
    initData() {
      let receiveselect = {
        function: "toEditShiwuFw",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear||"",
        unitId: this.unitId
      };
      let that = this;
      this.$post
        .postData(
          "toEditShiwuFw",
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res)
          that.fromdata = res.data;
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "实物重发文处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "实物重发文处理单";
          }
          
          let day = new Date();
          this.docNoYear = day.getFullYear();
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
          
        })
        .catch(error => {
        //   this.$message({
        //     type: "error",
        //     offset: 400,
        //     showClose: true,
        //     message: "初始化请求失败",
        //     duration: 1000
        //   });
        //   console.log(error)
        });
    },
  },
  mounted(){
    this.textChange('send','print')
  },
  created(){
    if(window.matchMedia){
    let MediaQueryList = window.matchMedia('print')
    MediaQueryList.addListener((mql)=>{
            if(mql.matches){
                this.beforePrint();
            }else{
                this.afterPrint()
            }
        })
    };
    this.unitId = this.$route.query.unitId||"";
    this.initData();
  },
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
    right: 28%;
    z-index: 10;
    top: 6%;
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