<template>
  <div class="tablePrint">
    <!-- 签报实物处理单-->
    <div ref="dyclPrint" class="dyclPrint">
      <el-row style="text-align:right;height: 100px;">
        <img :src="pictureLoad" v-show="pictureLoad" style="z-inde:10000;height: 95px;">
        <el-button v-show="printShow" class="printButton" @click="printThis()" type="info" plain>打印</el-button>
      </el-row>
      <el-row>
       <h1 class="title-h1">{{directTitle}}实物签报处理单</h1>
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
            <td style="text-align: center;width:90px;">标&nbsp;&nbsp;题</td>
            <td
              id="title"
              colspan="6"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.title}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">呈&nbsp;&nbsp;送</td>
            <td
              id="submittedName"
              colspan="6"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.submittedName}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">处理类型</td>
            <td
              id="handleType"
              style=" padding-left:10px; word-break: break-all;min-width:20%;max-width:30%;"
              colspan="2"
            >{{fromdata.handleType}}</td>
            <td style=" text-align: center;width:110px;">紧急程度</td>
            <td
              id="emergencyLevel"
              style=" padding-left:10px;word-break: break-all;min-width:20%;max-width:30%;"
            >{{fromdata.emergencyLevel}}</td>
            <td style=" text-align: center;width:110px;">签报类型</td>
            <td
              id="qianBaoTypeName"
              style=" padding-left:10px;word-break: break-all;min-width:20%;max-width:30%;"
            >{{fromdata.qianBaoTypeName}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">签报字号</td>
            <td
              id="qianbaoCode"
              colspan="2"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.qianbaoCode}}{{fromdata.documentNo}}</td>
            <td style="text-align: center;width:110px;">联系人</td>
            <td
              id="draftUserName"
              style="padding-left:10px;word-break: break-all;"
              colspan="1"
            >{{fromdata.draftUserName}}</td>
            <td style="text-align: center;width:110px;">联系电话</td>
            <td
              id="phone"
              style="padding-left:10px;word-break: break-all;"
              colspan="1"
            >{{fromdata.phone}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">拟稿部门</td>
            <td
              id="draftDepartmentName"
              colspan="4"
              style="padding-left:10px;    width: 300px;word-break: break-all;"
            >{{fromdata.draftDepartmentName}}</td>
            <td style="text-align: center;width:90px;">拟稿日期</td>
            <td
              id="draftTime"
              colspan="1"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.draftTime}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">秘密类型</td>
            <td
              id="type"
              style=" padding-left:10px;word-break: break-all;"
              colspan="2"
            >{{fromdata.secretType}}</td>
            <td
              style=" text-align: center;width:110px;"
              v-show="!fromdata.secretLimitType"
            >秘密标志</td>
            <td
              id="workSecretFlag"
              style=" padding-left:10px;word-break: break-all;"
              v-show="fromdata.workSecretFlag"
              colspan="1"
            >{{fromdata.workSecretFlag}}</td>
            <td
              id="secretFlag"
              style=" padding-left:10px;word-break: break-all;"
              v-show="fromdata.secretFlag"
              colspan="1"
            >{{fromdata.secretFlag}}</td>
            <td
              id="documentNo"
              style=" padding-left:10px;word-break: break-all;"
              v-show="!fromdata.secretFlag && !fromdata.workSecretFlag && !fromdata.secretLimitType"
              colspan="1"
            ></td>
            <td
              style=" text-align: center;width:110px;"
              v-show="fromdata.secretLimitType"
            >秘密期限类型</td>
            <td
              id="secretLimitType"
              style=" padding-left:10px;word-break: break-all;"
              v-show="fromdata.secretLimitType"
              colspan="1"
            >{{fromdata.secretLimitType}}</td>
            <td
              style=" text-align: center;width:110px;"
              v-if="fromdata.secretType == '国家秘密'"
            >密级标志</td>
            <td style=" text-align: center;width:110px;" v-else>密级和保密期限</td>
            <!-- 选择保密期限 -->
            <td
              id="security"
              style=" padding-left:10px;word-break: break-all;"
              colspan="1"
              v-if="fromdata.secretLimitName && fromdata.secretTimeType"
            >
              {{fromdata.security}}
              <i
                class="el-icon-star-on pad_10"
                v-if="fromdata.secretType == '国家秘密'"
              ></i>
              <i class="el-icon-star-off pad_10" v-else></i>
              {{fromdata.secretLimitName}} {{fromdata.secretTimeType}}
            </td>
            <!-- 选择解密时间 -->
            <td
              id="security"
              style=" padding-left:10px;word-break: break-all;"
              colspan="1"
              v-if="!fromdata.secretLimitName && fromdata.secretLimit"
            >
              {{fromdata.security}}
              <i
                class="el-icon-star-on pad_10"
                v-if="fromdata.secretType == '国家秘密'"
              ></i>
              <i class="el-icon-star-off pad_10" v-else></i>
              {{fromdata.secretLimit}}
            </td>
            <!-- 选择解密条件 -->
            <td
              id="security"
              style=" padding-left:10px;word-break: break-all;"
              colspan="1"
              v-if="!fromdata.secretLimitName && fromdata.secretTimeType "
            >
              {{fromdata.security}}
              <i
                class="el-icon-star-on pad_10"
                v-if="fromdata.secretType == '国家秘密'"
              ></i>
              <i class="el-icon-star-off pad_10" v-else></i>
              {{fromdata.secretTimeType}}
            </td>
            <!-- 没有选择的秘密显示空 -->
            <td
              id="security"
              style=" padding-left:10px;word-break: break-all;"
              colspan="1"
              v-if="!fromdata.secretLimitName && !fromdata.secretTimeType && !fromdata.secretLimit"
            ></td>
          </tr>
          <tr class="print_zr" v-show="fromdata.secretType">
            <td style="text-align: center;width:90px;">知悉范围</td>
            <td
              id="knowScore"
              colspan="6"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.knowScore}}</td>
          </tr>
          <tr class="print_zr" v-show="fromdata.secretType">
            <td style="text-align: center;width:90px;">定密依据</td>
            <td
              id="secretGists"
              colspan="6"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.secretGists}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">签报依据</td>
            <td
              id="sendBasis"
              colspan="6"
              style="padding-left:10px;word-break: break-all;"
            >
              <div v-for="(item) in fromdata.sendBasis" :key="item.id">
                <span>{{item.documentCode}}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px;">会签部门</td>
            <td
              id="signDepartmentName"
              colspan="6"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.signDepartmentName && fromdata.finishSignDepartmentName?fromdata.signDepartmentName+';'+fromdata.finishSignDepartmentName:fromdata.signDepartmentName || fromdata.finishSignDepartmentName}}</td>
          </tr>

          <tr class="print_zr">
            <td style="text-align: center;width:90px;">附件名称</td>
            <td
              id="attachTitle"
              colspan="6"
              style="padding-left:10px;word-break: break-all;white-space: pre-line;"
            >{{fromdata.attachTitle}}</td>
          </tr>
        <tr class="print_zr">
          <td class="printSbPsyj">批示意见</td>
          <td
            id="send_send"
            colspan="6"
            ref="print_psyj_div"
            style="padding-left:10px;"
            
          >
            <div class="needAddHeight" style="height:150px"></div>
            <div v-for="item in fromdata.approvalOpinionList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pos_r">
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{item.createTime}}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td class="printSbPsyj">审核意见</td>
          <td id="opinionDraf" colspan="6" style="padding-left:10px;">
            <div v-for="item in fromdata.checkOpinionList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pos_r">
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{item.createTime}}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td class="printSbPsyj">会签意见</td>
          <td colspan="6" id="opinionSign" style="padding-left:10px;">
            <div v-for="item in fromdata.signOpinionList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pos_r">
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{item.createTime}}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td class="printSbPsyjMore">拟稿部门意见</td>
          <td colspan="6" id style="padding-left:10px;">
            <div v-for="item in fromdata.draftDepartmentOpinionList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pos_r">
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{item.createTime}}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td class="printSbPsyj">办理情况</td>
          <td id="send_send" colspan="6" style="padding-left:10px;">
            <div style="height:150px" v-show="!fromdata.handleSituationList"></div>
            <div v-for="item in fromdata.handleSituationList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="pos_r">
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{item.createTime}}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <!-- <tr  class="print_zr">
            <td style="text-align: center;width:90px;">传阅意见</td>
            <td id="send_send" colspan="6" style="padding-left:10px;">
              <div v-for="item in fromdata.circulationList" :key="item.id">
                <div v-if="item.status" class="d_flex">
                  <el-row class="d_b100">
                    <el-col
                      :span="24"
                      class="pos_r"
                    >
                      <p class="pad_yj10">{{item.content}}</p>
                      <div class="adviceInfo">
                        <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                        <p class="pad_yj10 pd_yj_useTime">
                          {{item.createTime}}
                        </p>
                      </div>
                    </el-col>
                    
                  </el-row>
                </div>
              </div>
            </td>
        </tr>-->
        <tr class="print_zr">
          <td class="printSbPsyj">备&nbsp;&nbsp;注</td>
          <td colspan="6" id="comments" style="padding-left:10px;">
            <div v-for="item in fromdata.remarkList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <!-- <el-col class="pos_r">
                    <p class="pad_yj10">{{item.content}}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{item.createTime}}
                      </p>
                    </div>
                  </el-col> -->
                  <el-col class="pad_yj10 pad_yj11">
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
        <!-- <tr>
          <td style="text-align: center;width:90px;">正文字数</td>
          <td colspan="6" id style="padding-left:10px;">{{fromdata.sizeFact}}</td>
        </tr> -->
        <!-- <tr style="min-height: 50px;">
            <td rowspan="2" style="text-align:center">传阅人员</td>
            <td style="text-align:center;width:90px;" colspan="1">未阅</td>
            <td colspan="5" style="padding:5px">{{fromdata.readCirculatePerson}}</td>
          </tr>
          <tr style="min-height: 50px;">
            <td style="text-align:center;width:90px;" colspan="1">已阅</td>
            <td colspan="5" style="padding:5px">{{fromdata.endCirculatePerson}}</td>
        </tr>-->
        <!-- <tr class="print_zr">
          <td style="text-align: center;width:90px;">附件</td>
          <td colspan="6" id="comments" style="padding-left:10px;">
            <div>
              <el-row>
                <el-col>
                  <div
                    class="tree_w tree_zhuban"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(items,index) in fromdata.attchmentFileInfo"
                        :key="items.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="name down">{{index+1}}.{{items.fileName}}</span>
                            <span class="name">{{items.createrName}}</span>
                            <span class="name">{{items.createTime}}</span>
                          </div>
                        </template>
                      </div>
                    </el-scrollbar>
                  </div>
                </el-col>
              </el-row>
            </div>
          </td>
        </tr> -->
        <!-- <tr style="page-break-inside: avoid;">
          <td style="page-break-inside: avoid;">
            <img :src="pictureLoad" alt=""  v-show="pictureLoad">
          </td>
        </tr> -->
        <!-- <tr style="" class="nobd">
          <td colspan="6" class="nobd">
            <img :src="pictureLoad" alt="">
            <img src="@/assets/images/bglogo.png" alt="">
          </td>

        </tr> -->
      </tbody>
    </table>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import computedNodeHeight from "@/minixs/computedNodeHeight.js"
import printStyle from "@/minixs/printStyle";
export default {
  data() {
    return {
      directTitle: "中国建设银行",
      //input框内容
      printShow: true,
      bank_dispach: {
        function: "getToQianbaoSwEntityById",
        id: ""
      },
      fromdata: {
        title: "",
        submittedName: "",
        handleType: "",
        emergencyLevel: "",
        qianBaoTypeName: "",
        qianbaoCode: "",
        draftTime: "",
        draftDepartmentName: "",
        draftUserName: "",
        draftUserName: "",
        phone: "",
        secretType: "",
        secretLimitType: "",
        workSecretFlag: "",
        secretFlag: "",
        sendBasis: "",
        signDepartmentName: "",
        attachTitle: "",
        approvalOpinionList: "",
        checkOpinionList: "",
        signOpinionList: "",
        draftDepartmentOpinionList: "",
        handleSituationList: "",
        remarkList: "",
        qianbaoWords: "",
        circulationList: ""
      },
      tiaoXingMa:{
        function:"tiaoXingMa"
      },
      pictureLoad:""
    };
  },
  mixins:[computedNodeHeight,printStyle],
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
    pointFun(filePaths, fileNames) {
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
      var obj = Object.assign(this.tiaoXingMa, parseList);
      // tiaoXingMa
      this.$post
      .postData(
        "tiaoXingMa",
        JSON.stringify(obj),
        this.$businessCode.qbgl
      )
      .then(res => {
        this.pointFun(res.data.fileName, res.data.filePath);
      })
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
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_dispach.unitId = this.$route.query.unitId ? this.$route.query.unitId : "";
    this.$post
      .postData(
        "getToQianbaoSwEntityById",
        JSON.stringify(this.bank_dispach),
        this.$businessCode.qbgl
      )
      .then(res => {
        this.fromdata = res.data;
        //获取签报处理单主标题
        // this.directTitle = res.data && res.data.orgName;
        if (
          res.data &&
          res.data.isSpecialHead &&
          res.data.isSpecialHead == "1"
        ) {
          this.directTitle = this.fromdata.draftDepartmentName;
        } else {
          this.directTitle = res.data && res.data.orgName;
        }
        if (this.fromdata.handleType == "1") {
          this.fromdata.handleType = "阅件";
        } else if (this.fromdata.handleType == "0") {
          this.fromdata.handleType = "批件";
        }
        this.fromdata.sendBasis =
          res.data.sendBasis && JSON.parse(res.data.sendBasis);

        this.loadPng()
        // this.$forceUpdate();
        // this.$nextTick(() => {
          // this.oneHeight = $(this.$refs.dyclPrint).height();
          // console.log("11", this.oneHeight);
          // this.OnedyclPrint = $("#dyclPrintOne").height();
          // console.log("aa", this.OnedyclPrint);
          // // this.TwodyclPrint = $("#dyclPrintTwo").height();

          // this.TwodyclPrint = $("#print-table").height();
          // console.log("bb", this.TwodyclPrint);
          // this.printPsyjDiv = $(this.$refs.print_psyj_div).height();
          // console.log(
          //   "22",
          //   this.printPsyjDiv,
          //   "cc",
          //   this.OnedyclPrint + this.TwodyclPrint
          // );
          // // this.printPsyj = 1090 - this.oneHeight;
          // this.printPsyj = 1090 - (this.OnedyclPrint + this.TwodyclPrint);
          // console.log("33", this.printPsyj);
          // this.printPsyjStyle = this.printPsyj + "px";
          // // $(this.$refs.print_psyj)[0].css("height",this.printPsyj+'px'+'!important');
          // // console.log('44',this.$refs.print_psyj.style.height)

          // if (
          //   this.fromdata.approvalOpinionList &&
          //   this.fromdata.approvalOpinionList.length <= 0
          // ) {
          //   if (this.printPsyj > 80) {
          //     this.psFlag = true;
          //     //  this.printPsyjDiv = this.printPsyj;
          //     this.printPsyjStyle = this.printPsyj + "px";
          //   } else {
          //     this.psFlag = false;
          //     // this.printPsyjDiv = (this.printPsyj+'80')+"px";
          //     this.printPsyjStyle = this.printPsyj + 80 + "px";
          //   }
          // } else {
          //   if (this.printPsyjDiv < this.printPsyj) {
          //     this.psFlag = true;
          //     // this.printPsyjDiv = this.printPsyj;
          //     this.printPsyjStyle = this.printPsyj + "px";
          //   } else {
          //     this.psFlag = false;
          //     // this.printPsyjDiv = (this.printPsyj+'80')+"px";
          //     this.printPsyjStyle = this.printPsyj + 80 + "px";
          //   }
          // }
        // });
      })
      .catch(erro => {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请求失败",
          duration: 1000
        });
      });
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
      // width: 12%;
      // text-align: center;
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
.title-h2 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 50px;
  width: 720px;
  margin: 0 auto;
}
.printButton {
  position: absolute !important;
  top: 5% !important;
  left: 3% !important;
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
.pad_10 {
  padding: 0 5px;
}
.pad_yj10 {
  white-space: pre-line;
  word-break: break-all;
}

.code-img{
  height:auto; 
  margin-top:10px;
  position: relative;
  top: -153px;
  right: 62%;
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
.printSbPsyj{
  text-align: center;
  width:90px; 
  line-height:64px !important;
}
.printSbPsyjMore{
  text-align: center;
  width:90px; 
  line-height:32px !important;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>