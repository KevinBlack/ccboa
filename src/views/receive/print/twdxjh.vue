<template>
  <div class="tablePrint tableForPrint">
    <!--1)	收文协办单-->
    <el-row>
      <h1 style class="title-h1">{{fromdata.documentTitle}}</h1>
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
          <th style="border:none" colspan="7" class="th224">
          <p></p>
          </th>
      </thead> -->
      <tbody>
          <tr>
          <td style="text-align: center">正文标题</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
        </tr>
        <tr>
          <td style="text-align: center">附件标题</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;white-space:pre-line;word-break:break-all">{{fromdata.attachTitle}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">收文日期:</td>
          <td style="padding-left: 10px;" colspan="2">{{fromdata.receiveTime}}</td>
          <td style="text-align: center;">紧急程度:</td>
          <td style="padding-left: 10px;" colspan="2">{{fromdata.emergencyLevel}}</td>

        </tr>
				<tr>
					<td style="text-align: center;">收文字号:</td>
          <td style="padding-left: 10px;" colspan="2">{{fromdata.documentCode}}</td>
					<td style="text-align: center;">收文字数</td>
          <td style="padding-left: 10px;" colspan="2">{{fromdata.receiveWords}}</td>
				</tr>
        <tr>

          <td style="text-align: center;">业务分类</td>
          <td style="padding-left: 10px;" colspan="2">{{fromdata.bussinessTypeName}}</td>
          <td style="text-align: center;">文种</td>
          <td style="padding-left: 10px;" colspan="2">{{fromdata.documentClassName}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">秘密类型</td>
           <td v-if="fromdata.fromWhere != '实物收文'&&fromdata.fromWhere != '电子收文' && fromdata.fromWhere != '实物发文'&& fromdata.fromWhere != '电子收文' &&  fromdata.fromWhere != '电子发文'" colspan="4">{{fromdata.secretType}}</td>
          <td v-else style="padding-left: 10px;">{{fromdata.secretType}}</td>
          <td style="text-align: center;" v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">秘密期限类型</td>
          <td style="padding-left: 10px;" v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">{{fromdata.secretLimitType}}</td>
          <td style="text-align: center;" v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType != '商业秘密'">秘密标志</td>
          <td style="padding-left: 10px;" colspan="3" v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType != '商业秘密'">{{fromdata.secretLimitType}}</td>
          <td style="text-align: center;" v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">密级和保密期限</td>
          <td style="padding-left: 10px;" v-if="(fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere == '电子发文')&&fromdata.secretType == '商业秘密'">{{fromdata.secretFlagType}}/{{fromdata.secretFlagContent}}</td>
          <td v-if="fromdata.fromWhere == '实物收文'" style="text-align: center;">密级和保密期限</td>
          <td v-if="fromdata.fromWhere == '实物收文'" style="padding-left: 10px;" colspan="2">{{fromdata.secretLimitType}}</td>
          <td v-if="fromdata.fromWhere == '实物收文'" style="padding-left: 10px;" colspan="2">/{{fromdata.secretFlagContent}}</td>

        </tr>
        <tr>
          <td style="text-align: center;">来文单位</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.sendOrgName}}</td>

        </tr>
				<tr>
					<td style="text-align: center;">成文日期</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.completeTime}}</td>
				</tr>
				<tr>
					<td style="text-align: center;">承办部门</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.finishUndertakeDeptName}}</td>
				</tr>
				<tr>
					<td style="text-align: center;">协办部门</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.finishAssistDeptName}}</td>
				</tr>
        <tr>
          <td style="text-align: center">退文人</td>
          <td id="sendBasis" colspan="2" style="padding-left: 10px;">{{fromdata.backUserName}}</td>
					<td style="text-align: center">收文时间</td>
          <td id="sendBasis" colspan="2" style="padding-left: 10px;">{{fromdata.receiveTime}}</td>
				</tr>
				<tr>
          <td style="text-align: center">退文时间</td>
          <td id="sendBasis" colspan="2" style="padding-left: 10px;">{{fromdata.backTime}}</td>
					<td style="text-align: center">退文原因</td>
          <td id="sendBasis" colspan="2" style="padding-left: 10px;white-space: pre-line;word-break: break-all;">{{fromdata.reason}}</td>
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
      fromdata: {
      },
      printShow: true,
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
    let parms = {
      function:"selectBackById",
      id:this.$route.query.id,
      choseYear: this.$route.query.choseYear
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
        "selectBackById",
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
</style>
