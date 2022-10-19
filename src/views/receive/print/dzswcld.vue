<template>
  <div class="tablePrint">
    <!--1.	电子收文处理单
    -->
    <el-row>
      <h3 class="title-h1">{{ fromdata.documentTitle }}</h3>
      <el-button class="printButton" v-show="printShow" @click="printThis()" type="info" plain>打印</el-button>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
    <!-- <thead style="border:none">
        <th style="border:none" colspan="6" class="th224">
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
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.title }}</td>
      </tr>
      <tr style="height: 32px;">
        <td style="text-align:center">附件标题</td>
        <td colspan="5" style="padding-left: 10px;white-space:pre-line;word-break:break-all">
          {{ fromdata.attachmentTitle }}
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
      <tr v-if="fromPage=='1'">
        <td style="text-align: center;">秘密类型</td>
        <td style="padding-left: 10px;">{{ fromdata.secretType }}</td>
        <td style="text-align: center;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">
          秘密期限类型
        </td>
        <td style="padding-left: 10px;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">
          {{ fromdata.secretLimitType }}
        </td>
        <td style="text-align: center;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType != '商业秘密'">
          秘密标志
        </td>
        <td style="padding-left: 10px;" colspan="3"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType != '商业秘密'">
          {{ fromdata.secretFlagType }}
        </td>
        <td style="text-align: center;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">
          密级和保密期限
        </td>
        <td style="padding-left: 10px;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">
          {{ fromdata.secretFlagType }}<i class="el-icon-star-off pad_10"></i>{{ fromdata.secretFlagContent }}
        </td>
        <td v-if="fromdata.fromWhere == '实物收文'" style="text-align: center;">密级和保密期限</td>
        <td v-if="fromdata.fromWhere == '实物收文'" style="padding-left: 10px;" colspan="2">{{ fromdata.secretLimitType }}
        </td>
        <td v-if="fromdata.fromWhere == '实物收文'" style="padding-left: 10px;" colspan="2">
          /{{ fromdata.secretFlagContent }}
        </td>
      </tr>
      <tr v-if="fromPage=='0'">
        <td style="text-align: center;">秘密类型</td>
        <td style="padding-left: 10px;">{{ fromdata.secretType }}</td>
        <td style="text-align: center;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&(fromdata.secretType == '商业秘密'||fromdata.secretType == '国家秘密')">
          秘密期限类型
        </td>
        <td style="padding-left: 10px;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&(fromdata.secretType == '商业秘密'||fromdata.secretType == '国家秘密')">
          {{ fromdata.secretLimitType }}
        </td>
        <td style="text-align: center;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&(fromdata.secretType != '商业秘密'&&fromdata.secretType != '国家秘密')">
          秘密标志
        </td>
        <td style="padding-left: 10px;" colspan="3"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&(fromdata.secretType != '商业秘密'&&fromdata.secretType != '国家秘密')">
          {{ fromdata.secretFlagType }}
        </td>
        <td style="text-align: center;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&(fromdata.secretType == '商业秘密'||fromdata.secretType == '国家秘密')">
          密级和保密期限
        </td>
        <td style="padding-left: 10px;"
            v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&(fromdata.secretType == '商业秘密'||fromdata.secretType == '国家秘密')">
          {{ fromdata.secretFlagType }}
          <span v-if="fromdata.secretType == '商业秘密'"><i class="el-icon-star-off pad_10"></i></span>
          <span v-if="fromdata.secretType == '国家秘密'"><i class="el-icon-star-on pad_10"></i></span>
          {{ fromdata.secretFlagContent }} {{ fromdata.secretTimeType }}
        </td>
        <td v-if="fromdata.fromWhere == '实物收文'" style="text-align: center;">密级和保密期限</td>
        <td v-if="fromdata.fromWhere == '实物收文'" style="padding-left: 10px;" colspan="2">{{ fromdata.secretFlagType }}
        </td>
        <td v-if="fromdata.fromWhere == '实物收文'" style="padding-left: 10px;" colspan="2">{{ fromdata.secretLimitType }}
        </td>
      </tr>
      <tr v-if="fromdata.secretType != ''">
        <td style="text-align: center">知悉范围</td>
        <td id="sendBasis" colspan="5" style="padding-left: 10px;white-space:pre-line;word-break:break-all">{{ fromdata.knowScore }}</td>
      </tr>
      <tr>
        <td style="text-align: center;">来文单位</td>
        <td style="padding-left: 10px;" colspan="3">{{ fromdata.sendOrgName }}</td>

        <td style="text-align: center;">成文日期</td>
        <td style="padding-left: 10px;">{{ fromdata.completeTime }}</td>
      </tr>
      <!-- 2)	行外电子收文（一级行） -->
      <tr v-if="isdb==1">
        <td style="text-align: center;">督办人</td>
        <td
          colspan="3"
          style="padding-left: 10px;"
        >{{ fromdata.superviserName }}
        </td>
        <td style="text-align: center;">督办日期</td>
        <td style="padding-left: 10px;">{{ fromdata.superviseDate }}</td>
      </tr>
      <tr>

        <td style="text-align: center;">登记人</td>
        <td style="padding-left: 10px;" colspan="5">{{ fromdata.userName }}</td>
      </tr>
      <tr
        v-if="!((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
        <td style="text-align: center">转发文件</td>
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.isForword == 1 ? "是" : "否" }}</td>
      </tr>
      <tr
        v-if="fromdata.isForword == 1 && !((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
        <td style="text-align: center">转发要求</td>
        <td colspan="5" style="padding-left: 10px;color:blue;">
          {{ fromdata.parentForwordRequirements }}<br>{{ fromdata.forwordRequirements }}
        </td>
      </tr>
      <tr
        v-if="!((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
        <td style="text-align: center;">直发文件</td>
        <td style="padding-left: 10px;">{{ fromdata.isDirect == 1 ? "是" : "否" }}</td>
        <td style="text-align: center;">直发范围</td>
        <td style="padding-left: 10px;">{{ fromdata.directRange }}</td>
        <td style="text-align: center;">直发文种类</td>
        <td style="padding-left: 10px;">{{ fromdata.directType }}</td>
      </tr>

      <tr>
        <td style="text-align: center;">承办部门</td>
        <td colspan="2" style="padding-left: 10px;">
          {{ fromdata.finishUndertakeDeptName }}{{ fromdata.undertakeDeptName }}
        </td>
        <td style="text-align: center;">协办部门</td>
        <td colspan="2" style="padding-left: 10px;">{{ fromdata.finishAssistDeptName }}{{ fromdata.assistDeptName }}
        </td>
      </tr>
      <tr class="print_zr">
        <td style="text-align: center">批示意见</td>
        <td class="pishiHeight" colspan="5" style="padding-left: 10px;">
          <div class="needAddHeight" style="height:151px;"></div>
          <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
            <div class="d_flex">
              <el-row class="d_b100">
                <el-col>
                  <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                  <div class="adviceInfo">
                    <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                    <p class="pad_yj10 pd_yj_useTime"> {{ item.createTime }} </p>
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
                    <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                    <p class="pad_yj10 pd_yj_useTime">{{ item.createTime }} </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </td>
      </tr>
      <tr class="print_zr needForcePage">
        <td style="text-align: center">承办部门办理情况</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.undertakeOrgOpinionList" :key="item.id">
            <div class="d_flex">
              <el-row class="d_b100">
                <el-col>
                  <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
                  <div class="adviceInfo">
                    <p class="pad_yj10"> {{ item.departmentName }} <span>{{ item.userName }}</span></p>
                    <p class="pad_yj10 pd_yj_useTime"> {{ item.createTime }} </p>
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
        <td style="text-align: center">传阅意见</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="(item,index) in fromdata.circulateOpinionList" :key="index">
            <div class="d_flex" v-if="item.content!=''">
              <el-row class="d_b100">
                <el-col>
                  <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
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
        <td style="text-align: center">办结情况</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.handleTerminateOpinionList" :key="item.id">
            <div class="d_flex">
              <el-row class="d_b100">
                <el-col>
                  <p class="pad_yj10 pad_yj11">{{ item.content }}</p>
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
import computedNodeHeight from "@/minixs/computedNodeHeight";
export default {
  data() {
    return {
      httpNum:0,
      fromPage: '',//0:待办,1已办
      //input框内容
      bank_dispach: {
        function: "getQianbaoKhShenpiPoById",
        id: ""
      },
      printShow: true,
      isdb: '',
      fromdata: {},
      isBreak:false,
    };
  },
  mixins: [computedNodeHeight],
  methods: {
    getDataOne() {
      let parms = {
        function: "selectById",
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
          "selectById",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.data) {
            ++this.httpNum;
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()
          }
        });
    },
    getDataTwo() {
      let parms = {
        function: "selectAttachmentList",
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
          "selectAttachmentList",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            ++this.httpNum;
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()

          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataThree() {
      let parms = {
        function: "selectSelfOpinionList",
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
          "selectSelfOpinionList",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            ++this.httpNum;
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFour() {
      let parms = {
        function: "selectOtherOpinionList",
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
          "selectOtherOpinionList",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            ++this.httpNum;
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFive() {
      let parms = {
        function: "selectWbjCirculate",
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
          "selectWbjCirculate",
          JSON.stringify(parms),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            ++this.httpNum;
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()
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
          let heigh1 = $('.firstPage').height();
          let pageHeight = 1200;//a4纸一页高度
          let titleHeight = 100;
          let height2 = $('.pishiHeight').height();//批示意见高度
          if (heigh1 + titleHeight < pageHeight) {
            this.isBreak=true;
            $('.pishiHeight').height(pageHeight - heigh1 - titleHeight + height2);
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
    this.isdb = this.$route.query.isdb || '';
    this.fromPage = this.$route.query.fromPage;
    //初始化加载数据
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
  .tablePrint {
    padding: 0 30px;
  }
  .pagebreak{
    height: 60px;
    page-break-after: always;
  }
}
</style>
