<template>
  <div class="tablePrint tableForPrint">
    <!-- 行外电子收文（一级行 -->
    <el-row>
      <h1 style="" class="title-h1">中国建设银行电子收文处理单</h1>
      <el-button class="printButton" @click="printThis()" type="info" plain>打印</el-button>
    </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;"
           id="print-table">
      <!-- <thead style="border:none">
          <th style="border:none" colspan="7" class="th224">
          <p></p>
          </th>
      </thead> -->
      <tbody>
      <tr style="height: 32px;">
        <td style="text-align:center">办理期限</td>
        <td colspan="3" id="sendOrgName" style="padding-left: 10px;">{{ fromdata.sendOrgName }}</td>
        <td style="text-align:center">办理进度</td>
        <td id="completeTime" style="padding-left: 10px;">{{ fromdata.completeTime }}</td>
      </tr>
      <tr style="height: 32px;">
        <td style="width:10%;text-align:center">收文日期</td>
        <td id="receiveTime" style="width:22%;padding-left: 10px;">{{ fromdata.receiveTime }}</td>
        <td style="width:10%;text-align:center">紧急程度</td>
        <td id="emergencyName" style="width:22%;padding-left: 10px;">{{ fromdata.emergencyName }}</td>
        <td style="width:10%;text-align:center">登记人</td>
        <td id="documentCode" style="width:26%;padding-left: 10px;">{{ fromdata.draftUserName }}</td>
      </tr>
      <tr style="height: 32px;">
        <td style="width:10%;text-align:center">收文字号</td>
        <td id="documentCode" style="width:26%;padding-left: 10px;">{{ fromdata.documentCode }}</td>
        <td style="text-align:center">秘密类型</td>
        <td id="secretTypeName" style="padding-left: 10px;">{{ fromdata.secretTypeName }}</td>
        <td style="text-align:center" class="biaozhi" id="mjbs">密级和保密期限</td>
        <td id="secretLimitName" style="padding-left: 10px;" class="biaozhi">{{ fromdata.security }}</td>
      </tr>
      <tr style="height: 32px;">
        <td style="text-align:center">来文单位</td>
        <td colspan="3" id="sendOrgName" style="padding-left: 10px;">{{ fromdata.sendOrgName }}</td>
        <td style="text-align:center">成文日期</td>
        <td id="completeTime" style="padding-left: 10px;">{{ fromdata.completeTime }}</td>
      </tr>

      <tr style="height: 32px;">
        <td style="width:10%;text-align:center">转发文件</td>
        <td id="documentCode" style="width:26%;padding-left: 10px;" class="blue">{{ fromdata.isForword }}</td>
        <td style="text-align:center">文种</td>
        <td id="secretTypeName" style="padding-left: 10px;" class="blue">{{ fromdata.secretTypeName }}</td>
        <td style="text-align:center">业务分类</td>
        <td id="secretLimitName" style="padding-left: 10px;" class="blue">{{ fromdata.security }}</td>
      </tr>
      <tr style="height: 32px;">
        <td style="text-align:center">转发要求</td>
        <td colspan="5" class="blue" style="padding-left: 10px;">{{ fromdata.forwordRequirements }}</td>
      </tr>
      <tr style="height: 32px;display: none;">
        <td style="text-align:center">直发文件</td>
        <td id="isDirect" style="padding-left: 10px;" class="blue">{{ fromdata.isDirect }}</td>
        <td style="text-align:center">直发范围</td>
        <td id="directRange" style="padding-left: 10px;" class="blue">{{ fromdata.directRange }}</td>
        <td style="text-align:center">直发文种类</td>
        <td id="directType" style="padding-left: 10px;" class="blue">{{ fromdata.directType }}</td>
      </tr>

      <tr style="height: 32px;">
        <td style="text-align:center">正文标题</td>
        <td colspan="5" id="documentTitle" style="padding-left: 10px;">{{ fromdata.title }}</td>
      </tr>
      <tr style="height: 32px;">
        <td style="text-align:center">附件标题</td>
        <td colspan="5" id="attachmentTitle" style="padding-left: 10px;">{{ fromdata.attachmentTitle }}</td>
      </tr>
      <tr style="height: 32px;">
        <td style="text-align:center">承办部门</td>
        <td colspan="2" id="undertakeOrgName" style="padding-left: 10px;">{{ fromdata.undertakeDeptName }}</td>
        <td style="text-align:center">协办部门</td>
        <td colspan="2" id="helpOrgName" style="padding-left: 10px;">{{ fromdata.assistDeptName }}</td>
      </tr>

      <tr style="height: 255px;">
        <td style="text-align:center">批示意见</td>
        <td colspan="5" id="pishiOpinionDisabled" style="padding-left: 10px;">{{ fromdata.pishiOpinionList }}</td>
      </tr>
      <tr style="height: 100px;">
        <td style="text-align:center">办公室<br>批办意见
        </td>
        <td colspan="5" id="officeOpinionDisabled" style="padding-left: 10px;">
          <div>
            <div><font>{{ fromdata.pishiOpinionList }}</font>
              <div class="tcont2" style="text-align:right;">
                <div><font>　办公室&nbsp;</font><font>办公室综合&emsp;</font><br><font>2019-10-15 16:00:54</font>&nbsp;</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr style="height: 100px;">
        <td style="text-align:center">承办部门<br>办理情况</td>
        <td colspan="5" id="undertakeOrgOpinionDisabled" style="padding-left: 10px;">
          <div>
            <div><font>{{ fromdata.undertakeOrgOpinionList }}</font>
              <div class="tcont2" style="text-align:right;">
                <div><font>　党委办公室&nbsp;</font><font>党委综合&emsp;</font><br><font>2019-12-04 13:56:55</font>&nbsp;</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr style="height: 100px;">
        <td style="text-align:center">协办部门<br>办理情况</td>
        <td colspan="5" id="finalOpinionDisabled" style="padding-left: 10px;">{{ fromdata.helpOrgOpinion }}</td>
      </tr>
      <tr style="height: 100px;">
        <td style="text-align:center">传阅意见</td>
        <td colspan="5" id="handleTerminateOpinionDisabled" style="padding-left: 10px;">
          <div>
            <div><font>fd</font>
              <div class="tcont2" style="text-align:right;">
                <div><font>　党委办公室&nbsp;</font><font>党委综合&emsp;</font><br><font>2019-12-04 13:56:55</font>&nbsp;</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr style="height: 100px;">
        <td style="text-align:center">办结情况</td>
        <td colspan="5" id="handleTerminateOpinionDisabled" style="padding-left: 10px;">
          <div>
            <div><font>fd</font>
              <div class="tcont2" style="text-align:right;">
                <div><font>　党委办公室&nbsp;</font><font>党委综合&emsp;</font><br><font>2019-12-04 13:56:55</font>&nbsp;</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr style="height: 100px;">
        <td style="text-align:center">备&nbsp;&nbsp;注</td>
        <td colspan="5" id="remarksDisabled" style="padding-left: 10px;">
          <div>
            <div><font>秘书</font>
              <div class="tcont2" style="text-align:right;">
                <div><font>　办公室　秘书处&nbsp;</font><font>秘书3&emsp;</font><br><font>2019-10-15 16:24:38</font>&nbsp;</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr style="height: 50px;">
        <td rowspan="2" style="text-align:center">传阅人员</td>
        <td style="text-align:center">未阅</td>
        <td colspan="3" id="attache" style="padding-left:10px"></td>
      </tr>
      <tr style="height: 50px;">
        <td style="text-align:center">已阅</td>
        <td colspan="3" id="attache" style="padding-left:10px"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import Vue from 'vue';
import computedNodeHeight from "@/minixs/computedNodeHeight";

export default {
  data() {
    return {
      pishiOpinionList: "",
      undertakeOrgOpinionList: "",
      handleTerminateOpinionList: "",
      remarksList: "",
      fromdata: {
        title: "",
        attachmentTitle: "",
        receiveTime: "",
        emergencyName: "",
        documentCode: "",
        secretTypeName: "",
        security: "",
        sendOrgName: "",
        completeTime: "",
        directType: "",
        draftUserName: "",
        forwordRequirements: "",
        isForword: "",
        forwordRequirements: "",
        isDirect: "",
        directRange: "",
        directType: "",
        undertakeDeptName: "",
        assistDeptName: "",
        pishiOpinionList: "",
        undertakeOrgOpinionList: "",
        handleTerminateOpinionList: "",
        remarksList: "",
        helpOrgOpinion: "",
        outsideSign: "",
        main: "",
        copy: "",
        inline: "",
        knowScore: "",
        secretGists: "",
        opinionSendList: "",
        opinionDrafList: "",
        commentsList: "",
        opinionCheck: "",
        completeTime: "",
        sendTime: "",
        isSeparate: "",

      }

    }
  },
  mixins: [computedNodeHeight],
  methods: {
    printThis() {
      document.execCommand("print");
    }
  },
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
      text-align: center;
      vertical-align: middle;
    }
  }
}

.blue {
  color: blue;
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
  border-bottom: 1px solid #DAC6C5;
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
