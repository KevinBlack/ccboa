<template>
  <div class="tablePrint">
    <!--  非跨行签报
    1.	电子签报处理单
    2.	电子签报办结单-->
    <div ref="dyclPrint" class="dyclPrint">
    <el-row>
      <h1 style class="title-h1">{{directTitle}}电子签报传阅单</h1>
      <!-- <h1 style class="title-h2"></h1> -->
      <el-button class="printButton" v-if="printShow" @click="printThis()" type="info" plain>打印</el-button>
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
              id="handleTypeName"
              style=" padding-left:10px; word-break: break-all;min-width:20%;max-width:30%;"
              colspan="2"
            >{{fromdata.handleTypeName}}</td>
            <td style=" text-align: center;width:110px;">紧急程度</td>
            <td
              id="emergencyLevelName"
              style=" padding-left:10px;word-break: break-all;min-width:20%;max-width:30%;"
            >{{fromdata.emergencyLevelName}}</td>
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
              v-if="!fromdata.secretLimitType"
            >秘密标志</td>
            <td
              id="workSecretFlag"
              style=" padding-left:10px;word-break: break-all;"
              v-if="fromdata.workSecretFlag"
              colspan="1"
            >{{fromdata.workSecretFlag}}</td>
            <td
              id="secretFlag"
              style=" padding-left:10px;word-break: break-all;"
              v-if="fromdata.secretFlag"
              colspan="1"
            >{{fromdata.secretFlag}}</td>
            <td
              id="documentNo"
              style=" padding-left:10px;word-break: break-all;"
              v-if="!fromdata.secretFlag && !fromdata.workSecretFlag && !fromdata.secretLimitType"
              colspan="1"
            ></td>
            <td
              style=" text-align: center;width:110px;word-break: break-all;"
              v-if="fromdata.secretLimitType"
            >秘密期限类型</td>
            <td
              id="secretLimitType"
              style=" padding-left:10px;word-break: break-all;"
              v-if="fromdata.secretLimitType"
              colspan="1"
            >{{fromdata.secretLimitType}}</td>
            <td style=" text-align: center;width:110px;">密级和保密期限</td>
            <!-- 选择保密期限 -->
            <td
              id="security"
              style=" padding-left:10px;word-break: break-all;"
              colspan="1"
              v-if="fromdata.secretLimitName && fromdata.secretTimeType"
            >
              {{fromdata.security}}
              <i class="el-icon-star-off pad_10"></i>
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
              <i class="el-icon-star-off pad_10"></i>
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
              <i class="el-icon-star-off pad_10"></i>
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
          <tr class="print_zr" v-if="fromdata.secretType">
            <td style="text-align: center;width:90px;">知悉范围</td>
            <td
              id="knowScore"
              colspan="6"
              style="padding-left:10px;word-break: break-all;"
            >{{fromdata.knowScore}}</td>
          </tr>
          <tr class="print_zr" v-if="fromdata.secretType">
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
          <td id="send_send" colspan="6" style="padding-left:10px;">
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
        <!-- <tr class="print_zr">
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
        <!-- <tr class="print_zr">
          <td style="text-align: center;width:90px;">备&nbsp;&nbsp;注</td>
          <td colspan="6" id="comments" style="padding-left:10px;">
            <div v-for="item in fromdata.remarkList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pos_r">
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
        </tr> -->
        <tr>
          <td style="text-align: center;width:90px;">正文字数</td>
          <td colspan="6" id style="padding-left:10px;">{{fromdata.sizeFact}}</td>
        </tr>
        	<tr class="print_zr" v-if="fromdata.firstOpinions!=''&&fromdata.firstOpinions && fromdata.firstOpinions.length==undefined&&fromdata.firstOpinions.opinions!=''">
          <td class="printSbPsyjMore">一次传阅意见</td>
          <td colspan="6" style="padding-left: 10px;">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{fromdata.firstOpinions.opinions}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{fromdata.firstOpinions.opinionDeptName}} <span>{{fromdata.firstOpinions.currentUser}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> 
                           {{fromdata.firstOpinions.opinionCreateTime}} </p> 
                          </div>
                  </el-col>                
                  </el-row>
              </div>
          </td>
        </tr>
        <tr class="print_zr" v-if="fromdata.firstOpinions!=''&&fromdata.firstOpinions && fromdata.firstOpinions.length!=undefined">
          <td class="printSbPsyjMore">一次传阅意见</td>
          <td colspan="6" style="padding-left: 10px;">
            <div v-for="item in fromdata.firstOpinions" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.opinions}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.opinionDeptName}} <span>{{item.currentUser}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> 
                           {{item.opinionCreateTime}} </p> 
                          </div>
                  </el-col>                
                  </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr" v-if="!fromdata.firstOpinions ||( fromdata.firstOpinions && fromdata.firstOpinions.length=='0')">
          <td class="printSbPsyjMore">一次传阅意见</td>
          <td colspan="6" style="padding-left: 10px;">
          </td>
        </tr>
				<tr class="print_zr">
          <td class="printSbPsyjMore">二次传阅意见</td>
          <td colspan="6" style="padding-left: 10px;">
            <div v-for="item in fromdata.secondOpinions" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col
                    :span="24"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
                  >
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                           <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>

        <tr class="print_zr">
          <td class="printSbPsyj">传阅说明</td>
          <td id="send_send" colspan="6" style="padding-left:10px;">
            <div v-for="item in fromdata.circulateExplainList" :key="item.id">
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
        <tr style="min-height: 50px;">
          <td rowspan="3" style="text-align:center">传阅人员</td>
          <td style="text-align:center;width:90px;" colspan="1">一次传阅人</td>
          <td colspan="5" style="padding:5px">{{fromdata.firstCirculateHumans}}</td>
        </tr>
        <tr style="min-height: 50px;">
          <td style="text-align:center;width:90px;" colspan="1">二次传阅人(未阅)</td>
          <td colspan="5" style="padding:5px">{{fromdata.WBJSecondCirculate}}</td>
        </tr>
        <tr style="min-height: 50px;">
          <td style="text-align:center;width:90px;" colspan="1">二次传阅人(已阅)</td>
          <td colspan="5" style="padding:5px">{{fromdata.YBJSecondCirculate}}</td>
        </tr>
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
  mixins:[computedNodeHeight,printStyle],
  data() {
    return {
      directTitle: "中国建设银行",
      //input框内容
      bank_dispach: {
        function: "selectById",
        id: "",
        multiTenancyId:"",
        mainDocId: "",
      },
      printShow: true,
      fromdata: {
        title: "",
        submittedName: "",
        handleTypeName: "",
        emergencyLevelName: "",
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
        draftDepartmentOpinion: "",
        handleSituation: "",
        draftDepartmentOpinionList: "",
        remarkList: "",
        qianbaoWords: ""
      }
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
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_dispach.multiTenancyId = this.$route.query.multiTenancyId;
    this.bank_dispach.mainDocId= this.$route.query.mainDocId;
    this.bank_dispach.unitId= this.$route.query.unitId ? this.$route.query.unitId : '';
    this.$post
      .postData(
        "selectById",
        JSON.stringify(this.bank_dispach),
        this.$businessCode.qbgl
      )
      .then(res => {
        this.fromdata = res.data;
        //获取签报处理单主标题
        // this.directTitle = res.data && res.data.orgName;
        if(res.data && res.data.isSpecialHead && res.data.isSpecialHead == "1"){
            this.directTitle = this.fromdata.draftDepartmentName;
          }else{
            this.directTitle = res.data && res.data.orgName;
          }
        if (this.fromdata.handleTypeName == "1") {
          this.fromdata.handleTypeName = "阅件";
        } else if (this.fromdata.handleTypeName == "0") {
          this.fromdata.handleTypeName = "批件";
        }

        this.fromdata.sendBasis =
          res.data.sendBasis && JSON.parse(res.data.sendBasis);
        this.$forceUpdate();
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
      // text-align: center;
      vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 50px;
  width: 720px;
  margin: 0 auto;
}
.title-h2{
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 50px;
  width: 720px;
  margin: 0 auto;
}
.printButton {
  position: absolute;
  top: 60%;
  right: 3%;
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