<template>
  <div class="tablePrint">
    <!--4.	实物收文处理单
        1)	传统实物收文
        转发文件选择“是”，下方显示转发要求和是否直发两个字段，参考多承办部门实物收文——转发文件选择“是”。
    -->
    <el-row>
      <h1 class="title-h1">{{ fromdata.documentTitle }}</h1>
      <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
    >
    <!-- <thead style="border:none">
          <th style="border:none" colspan="7" class="th224">
          <p></p>
          </th>
      </thead> -->
      <tbody>
      <tr>
        <td style="text-align: center">正文标题</td>
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.title }}</td>
      </tr>
      <tr>
        <td style="text-align: center;">收文日期</td>
        <td style="padding-left: 10px;" colspan="2">{{ fromdata.receiveTime }}</td>
        <td style="text-align: center;">紧急程度</td>
        <td style="padding-left: 10px;" colspan="2">{{ fromdata.emergencyName }}</td>
      </tr>
      <tr>
        <td style="text-align: center;">收文字号</td>
        <td style="padding-left: 10px;" colspan="2">{{ fromdata.documentCode }}</td>
        <!-- <td style="text-align: center;">收文字数</td>
        <td style="padding-left: 10px;">{{fromdata.receiveWords}}</td> -->
        <td style="text-align: center;">业务分类</td>
        <td style="padding-left: 10px;" colspan="2">{{ fromdata.bussinessType }}</td>
      </tr>
      <tr>
        <td style="text-align: center">文种</td>
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.documentClass }}</td>
      </tr>
      <tr
        v-if="fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' || fromdata.fromWhere == '电子收文'|| fromdata.fromWhere == '电子发文'">
        <td style="text-align: center;">秘密类型</td>
        <td style="padding-left: 10px;">{{ fromdata.secretType }}</td>
        <td style="text-align: center;" v-if="fromdata.secretType == '商业秘密'">秘密期限类型</td>
        <td style="padding-left: 10px;" v-if="fromdata.secretType == '商业秘密'">{{ fromdata.secretLimitType }}</td>
        <td style="text-align: center;" v-if="fromdata.secretType == '商业秘密'">密级和保密期限</td>
        <td style="padding-left: 10px;" v-if="fromdata.secretType == '商业秘密'">
          {{ fromdata.secretFlagContent }}/{{ fromdata.secretTimeType }}
        </td>
        <td style="text-align: center;" v-if="fromdata.secretType != '商业秘密'">秘密标志</td>
        <td style="padding-left: 10px;" colspan="3" v-if="fromdata.secretType != '商业秘密'">{{ fromdata.secretFlagType }}
        </td>
      </tr>
      <tr v-if="fromdata.fromWhere == '实物收文'">
        <td style="text-align: center;">秘密类型</td>
        <td style="padding-left: 10px;">{{ fromdata.secretType }}</td>
        <td style="text-align: center;">密级和保密期限</td>
        <td style="padding-left: 10px;" colspan="3">{{ fromdata.secretFlagType }}/{{ fromdata.secretLimitType }}</td>
      </tr>
      <tr>
        <td style="text-align: center;">来文单位</td>
        <td
          colspan="3"
          style="padding-left: 10px;"
        >{{ fromdata.sendOrgName }}
        </td>
        <td style="text-align: center;">成文日期</td>
        <td style="padding-left: 10px;">{{ fromdata.completeTime }}</td>
      </tr>
      <tr v-if="isdb==1">
        <td style="text-align: center;">督办人</td>
        <td
          colspan="3"
          style="padding-left: 10px;"
        >{{ fromdata.superviser }}
        </td>
        <td style="text-align: center;">督办日期</td>
        <td style="padding-left: 10px;">{{ fromdata.superviseDate }}</td>
      </tr>
      <tr
        v-if="!((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
        <td style="text-align: center">转发文件</td>
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.isForword == 1 ? "是" : "否" }}</td>
      </tr>
      <tr
        v-if="fromdata.isForword == 1 && !((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
        <td style="text-align: center">转发要求</td>
        <td colspan="5" style="padding-left: 10px;">
          {{ fromdata.parentForwordRequirements }}<br>{{ fromdata.forwordRequirements }}
        </td>
      </tr>
      <tr
        v-if="fromdata.isForword == 1 && !((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
        <td style="text-align: center;">直发文件:</td>
        <td style="padding-left: 10px;">{{ fromdata.isDirect == 1 ? "是" : "否" }}</td>
        <td style="text-align: center;">直发范围:</td>
        <td style="padding-left: 10px;">{{ fromdata.directRange }}</td>
        <td style="text-align: center;">直发文种类:</td>
        <td style="padding-left: 10px;">{{ fromdata.directType }}</td>
      </tr>
      <tr
        v-if="!((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
        <td style="text-align: center">保管期限</td>
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.keepingLimit }}</td>
      </tr>
      <tr>
        <td style="text-align: center">正文标题</td>
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.title }}</td>
      <tr>
        <td style="text-align: center;">承办部门</td>
        <td colspan="2" style="padding-left: 10px;">{{ fromdata.finishUndertakeDeptName}}{{fromdata.undertakeDeptName}}
        </td>
        <td style="text-align: center;">协办部门</td>
        <td colspan="2" style="padding-left: 10px;">{{ fromdata.finishAssistDeptName}}{{fromdata.assistDeptName}}
        </td>
      </tr>
      <tr class="print_zr">
        <td style="text-align: center">批示意见</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.pishi_opinion" :key="item.id">
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
        <td style="text-align: center">办公室批办意见</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.office_opinion" :key="item.id">
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
        <td style="text-align: center">承办部门办理情况</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.undertake_org_opinion" :key="item.id">
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
        <td style="text-align: center">协办部门办理情况</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.help_org_opinion" :key="item.id">
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
      <tr class="print_zr" v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Object">
        <td style="text-align: center">一次传阅意见</td>
        <td colspan="5" style="padding-left: 10px;">
          <div class="d_flex">
            <el-row class="d_b100">
              <el-col>
                <p class="pad_yj10 pad_yj11">{{ fromdata.firstOpinions.opinions }}</p>
                <div class="adviceInfo">
                  <p class="pad_yj10"> {{ fromdata.firstOpinions.opinionDeptName }}
                    <span>{{ fromdata.firstOpinions.curUser }}</span></p>
                  <p class="pad_yj10 pd_yj_useTime"> {{ fromdata.firstOpinions.opinionCreateTime }} </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </td>
      </tr>
      <tr class="print_zr" v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Array">
        <td style="text-align: center">一次传阅意见</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.firstOpinions" :key="item.id">
            <div class="d_flex">
              <el-row class="d_b100">
                <el-col>
                  <p class="pad_yj10 pad_yj11">{{ item.opinions }}</p>
                  <div class="adviceInfo">
                    <p class="pad_yj10"> {{ item.opinionDeptName }} <span>{{ item.curUser }}</span></p>
                    <p class="pad_yj10 pd_yj_useTime"> {{ item.opinionCreateTime }} </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </td>
      </tr>
      <tr class="print_zr" v-if="fromdata.firstOpinions == undefined">
        <td style="text-align: center">一次传阅意见</td>
        <td colspan="5" style="padding-left: 10px;">
        </td>
      </tr>
      <tr class="print_zr">
        <td style="text-align: center">二次传阅意见</td>
        <td colspan="5" style="padding-left: 10px;"
            v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Array">
          <div v-for="item in fromdata.secondOpinions" :key="item.id">
            <div class="d_flex" v-if="item.opinions != ''">
              <el-row class="d_b100">
                <el-col>
                  <p class="pad_yj10 pad_yj11">{{ item.opinions }}</p>
                  <div class="adviceInfo">
                    <p class="pad_yj10"> {{ item.opinionDeptName }} <span>{{ item.curUser }}</span></p>
                    <p class="pad_yj10 pd_yj_useTime"> {{ item.opinionCreateTime }} </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </td>
        <td colspan="5" style="padding-left: 10px;"
            v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Object"
        >
          <div
            class="d_flex"
            v-if="fromdata.secondOpinions.opinions&&fromdata.secondOpinions.opinions!=''"
          >
            <el-row class="d_b100">
              <el-col>
                <p class="pad_yj10 pad_yj11">{{ fromdata.secondOpinions.opinions }}</p>
                <div class="adviceInfo">
                  <p class="pad_yj10"> {{ fromdata.secondOpinions.opinionDeptName }}
                    <span>{{ fromdata.secondOpinions.curUser }}</span></p>
                  <p class="pad_yj10 pd_yj_useTime"> {{ fromdata.secondOpinions.opinionCreateTime }} </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </td>
      </tr>
      <tr class="print_zr">
        <td style="text-align: center">办结情况</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.handle_terminate_opinion" :key="item.id">
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
        <td style="text-align: center">传阅说明</td>
        <td colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.circulateExplainList" :key="index">
            <div class="d_flex">
              <el-row class="d_b100">
                <el-col>
                  <p class="pad_yj10 pad_yj11">{{ item.circulateExplain }}</p>
                  <div class="adviceInfo">
                    <p class="pad_yj10"> {{ item.opinionDeptName }} <span>{{ item.sendUserName }}</span></p>
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
          <div v-for="item in fromdata.remarks" :key="item.id">
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
        <td style="text-align:center">一次传阅人</td>
        <td colspan="5" style="padding-left:10px">{{ fromdata.firstCirculateHumans }}</td>
      </tr>
      <tr class="printcy_zr">
        <td rowspan="2" style="text-align:center">二次传阅人</td>
        <td style="text-align:center">未阅</td>
        <td colspan="4" style="padding-left:10px">{{ fromdata.WBJSecondCirculate }}</td>
      </tr>
      <tr class="printcy_zr">
        <td style="text-align:center">已阅</td>
        <td colspan="5" style="padding-left:10px">{{ fromdata.YBJSecondCirculate }}</td>
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
      //input框内容
      bank_dispach: {
        function: "getQianbaoKhShenpiPoById",
        id: ""
      },
      isdb: '',
      printShow: true,
      fromdata: {},
    };
  },
  mixins:[computedNodeHeight],
  methods: {
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
    this.isdb = this.$route.query.isdb || '';
    let parms = {
      function: "selectByIdCY",
      id: this.$route.query.id,
      multiTenancyId: this.$route.query.multiTenancyId,
      mainDocId: this.$route.query.mainDocId,
    }
    if(this.$route.query.type == 'gly'){
      parms = Object.assign({
        manager:'',
        unitId:this.$route.query.unitId,
      },parms)
    }
    //初始化加载数据
    this.$post
      .postData(
        "selectByIdCY",
        JSON.stringify(parms),
        this.$businessCode.swgl,
        true,
      )
      .then(res => {
        this.fromdata = res.data;
      })
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
  font-size: 30px;
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
</style>
