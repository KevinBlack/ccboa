<template>
  <div class="tablePrint">
    <!--4.	实物收文处理单
        1)	传统实物收文
        转发文件选择“是”，下方显示转发要求和是否直发两个字段，参考多承办部门实物收文——转发文件选择“是”。
    -->
    <el-row>
      <h3 class="title-h1">{{ fromdata.documentTitle }}</h3>
      <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
    <!-- <thead style="border:none">
          <th style="border:none" colspan="7" class="th224">
          <p></p>
          </th>
      </thead> -->
      <tbody class="firstPage">
        <tr v-if="isdb==1">
          <td style="text-align: center;">办理期限</td>
          <td style="padding-left: 10px;">{{ fromdata.limitDate }}</td>
          <td style="text-align: center;">办理进度</td>
          <td style="padding-left: 10px;">{{ fromdata.progress }}</td>
          <td style="text-align: center;">提前提醒天数</td>
          <td style="padding-left: 10px;">{{ fromdata.daysInAdvance }}</td>
        </tr>
        <tr>
          <td style="text-align: center">正文标题</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{ fromdata.title }}</td>
        </tr>
        <tr>
          <td style="text-align: center">附件标题</td>
          <td
            id="sendBasis"
            colspan="5"
            style="padding-left: 10px;white-space:pre-line;word-break:break-all"
          >{{ fromdata.attachmentTitle }}
          </td>
        </tr>
        <tr>
          <td style="text-align: center;">收文日期</td>
          <td style="padding-left: 10px;">{{ fromdata.receiveTime }}</td>
          <td style="text-align: center;">紧急程度</td>
          <td style="padding-left: 10px;">{{ fromdata.emergencyName }}</td>
          <td style="text-align: center;">收文字号</td>
          <td style="padding-left: 10px;">{{ fromdata.documentCode }}</td>
        </tr>
        <tr>
          <td style="text-align: center;">秘密类型</td>
          <td style="padding-left: 10px;">{{ fromdata.secretType }}</td>
          <td style="text-align: center;">密级和保密期限</td>
          <td
            colspan="3"
            style="padding-left: 10px;"
          >{{ fromdata.secretFlagType }}/{{ fromdata.secretLimitType }}
          </td>
        </tr>
        <tr>
          <td style="text-align: center;">来文单位</td>
          <td colspan="3" style="padding-left: 10px;">{{ fromdata.sendOrgName }}</td>
          <td style="text-align: center;">成文日期</td>
          <td style="padding-left: 10px;">{{ fromdata.completeTime }}</td>
        </tr>
        <tr v-if="isdb==1">
          <td style="text-align: center;">督办人</td>
          <td colspan="3" style="padding-left: 10px;">{{ fromdata.superviser }}</td>
          <td style="text-align: center;">督办日期</td>
          <td style="padding-left: 10px;">{{ fromdata.superviseDate }}</td>
        </tr>
        <tr>
          <td style="text-align: center">转发文件</td>
          <td
            id="sendBasis"
            colspan="5"
            style="padding-left: 10px;"
          >{{ fromdata.isForword == 1 ? "是" : "否" }}
          </td>
        </tr>
        <tr v-if="fromdata.isForword == 1">
          <td style="text-align: center">转发要求</td>
          <td
            id="sendBasis"
            colspan="5"
            style="padding-left: 10px;"
          >{{ fromdata.parentForwordRequirements }}<br>{{ fromdata.forwordRequirements }}
          </td>
        </tr>
        <tr v-if="fromdata.isForword == 1">
          <td style="text-align: center;">直发文件</td>
          <td style="padding-left: 10px;">{{ fromdata.isDirect == 1 ? "是" : "否" }}</td>
          <td style="text-align: center;">直发范围</td>
          <td style="padding-left: 10px;">{{ fromdata.directRange }}</td>
          <td style="text-align: center;">直发文种类</td>
          <td style="padding-left: 10px;">{{ fromdata.directType }}</td>
        </tr>
        <tr>
          <td style="text-align: center">保管期限</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{ fromdata.keepingLimitName }}</td>
        </tr>
        <tr>
          <td style="text-align: center;">登记人</td>
          <td colspan="5" style="padding-left: 10px;">{{ fromdata.userName }}</td>
        </tr>
        <tr>
          <td style="text-align: center;">承办部门</td>
          <td colspan="2" style="padding-left: 10px;">
            {{ fromdata.finishUndertakeDeptName }}{{ fromdata.undertakeDeptName }}
          </td>
          <td style="text-align: center;">协办部门</td>
          <td colspan="2" style="padding-left: 10px;">
            {{ fromdata.finishAssistDeptName }}{{ fromdata.assistDeptName }}
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">批示意见</td>
          <td colspan="5" class="pishiHeight" style="padding-left: 10px;">
            <div class="needAddHeight" style="height:151px;"></div>
            <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{ item.departmentName }}<span> {{ item.userName }}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{ item.createTime }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">办公室批办意见</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.officeOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{ item.departmentName }} <span>{{ item.userName }}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{ item.createTime }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
<!--        <tr class="print_zr" v-if="receiveVersion != 1&&receiveVersion != 5 && fromdata.isShowFb == 1">
          <td style="text-align: center">部门分办意见</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.deptFbOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{ item.departmentName }} <span>{{ item.userName }}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{ item.createTime }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>-->
        <tr class="print_zr needForcePage">
          <td style="text-align: center">承办部门办理情况</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.undertakeOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{ item.departmentName }} <span>{{ item.userName }}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{ item.createTime }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <div class="pagebreak" v-if="isBreak"></div>
      <tbody>
        <tr class="print_zr">
          <td style="text-align: center">协办部门办理情况</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.helpOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{ item.departmentName }} <span>{{ item.userName }}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{ item.createTime }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr" v-if="fromdata.circulateOpinionList">
          <td style="text-align: center">传阅意见</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="(item,index) in fromdata.circulateOpinionList" :key="index">
              <div class="d_flex" v-if="item.content!=''">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{ item.departmentName }} <span>{{ item.userName }}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{ item.createTime }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">办结情况</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.handleTerminateOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{ item.departmentName }} <span>{{ item.userName }}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{ item.createTime }}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">备 注</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.remarksList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
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
        <tr class="printcy_zr">
          <td rowspan="2" style="text-align:center">传阅人员</td>
          <td style="text-align:center">未阅</td>
          <td colspan="4" style="padding-left:10px">{{ fromdata.wbjFirstCirculate }}</td>
        </tr>
        <tr class="printcy_zr">
          <td style="text-align:center">已阅</td>
          <td colspan="4" style="padding-left:10px">{{ fromdata.ybjFirstCirculate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import Vue from "vue";
import computedNodeHeight from "@/minixs/computedNodeHeight";
export default {
  data() {
    return {
      httpNum: 0,
      //input框内容
      bank_dispach: {
        function: "getQianbaoKhShenpiPoById",
        id: ""
      },
      isdb: "",
      receiveVersion: "",
      printShow: true,
      fromdata: {},
      isBreak:false,
    };
  },
  mixins:[computedNodeHeight],
  methods: {
    getDataOne() {
      let parms = {
        function: "selectSWById",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectSWById",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.data) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate();
            ++this.httpNum;
          }
        });
    },
    getDataTwo() {
      let parms = {
        function: "selectAttachmentListSw",
        id: this.$route.query.id
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectAttachmentListSw",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate();
            ++this.httpNum;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataThree() {
      let parms = {
        function: "selectSelfOpinionListSw",
        id: this.$route.query.id
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectSelfOpinionListSw",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate();
            ++this.httpNum;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFour() {
      let parms = {
        function: "selectOtherOpinionListSw",
        id: this.$route.query.id
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectOtherOpinionListSw",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate();
            ++this.httpNum;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFive() {
      let parms = {
        function: "selectWbjCirculateSw",
        id: this.$route.query.id
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectWbjCirculateSw",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate();
            ++this.httpNum;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData() {
      this.getDataOne();
      this.getDataTwo();
      this.getDataThree();
      this.getDataFour();
      this.getDataFive();
      this.pageinit();
    },
    beforePrint() {
      //this.printShow=false;
    },
    afterPrint() {
      this.printShow = true;
    },
    printThis() {
      this.printShow = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },
    pageinit() {
      let time1 = setInterval(() => {
        if (this.httpNum == 5) {
          let heigh1=$('.firstPage').height();
          let pageHeight=1200;//a4纸一页高度
          let titleHeight=100;
          let height2=$('.pishiHeight').height();//批示意见高度
          if(heigh1+titleHeight< pageHeight){
            this.isBreak=true;
            $('.pishiHeight').height(pageHeight-heigh1-titleHeight+height2);
          }
          clearInterval(time1);
        }
      }, 1000)
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
    this.isdb = this.$route.query.isdb || "";
    this.receiveVersion = this.$route.query.receiveVersion;
    console.log(this.receiveVersion, "000000000000===");
    //初始化加载数据
    this.initData();
  }
}
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
      width: 12%;
      // text-align: center;
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
  top: 50%;
  left: 30%;
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
  white-space: pre-line;
  word-break: break-all;
}
@media print {
  .tablePrint{
    padding: 0 30px;
  }
  .pagebreak{
    height: 60px;
    page-break-after: always;
  }
}
</style>
