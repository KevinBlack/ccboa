<template>
  <div>
    <div id="printHtml" ref="printHtml" class="tablePrint">
      <div class="no-print">
        <el-button @click="printThis" type="info" plain>打印</el-button>
        <el-button @click="closeThis" type="info" plain>返回</el-button>
      </div>
      <el-row>
        <h1 style class="title-h1">{{formData.draftOrgan+"信息报送处理单"}}</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">投稿刊物</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formData.submitPublication}}</td>
            <td style="text-align:center;vertical-align:middle">投稿栏目</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formData.submitColumn}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">投稿单位</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formData.draftOrgan}}</td>

            <td style="text-align:center;vertical-align:middle">投稿部门</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formData.submitDept}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">投稿人</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formData.submitPerson}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">手机号</td>
            <td style="width:30%;text-align:left;vertical-align:middle" colspan="2">{{formData.tel}}</td>
          </tr>

          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">投稿日期</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formData.submitDate}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">稿件状态</td>
            <td
              style="width:30%;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formData.gjStatus}}</td>
          </tr>

          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">活动类别</td>
            <td
              colspan="5"
              style="text-align:left;vertical-align:middle"
            >{{ formData.activeTypeName }}</td>
          </tr>
          <!--内容-->
          <tr style="min-height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">内容</td>
            <td colspan="5" style="text-align:left;vertical-align:middle">{{formData.content}}</td>
          </tr>
          <!--审签意见-->
          <!-- <tr style="min-height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">审签意见</td>
            <td colspan="5" style="text-align:left;vertical-align:middle">
              <div v-if="auditIdea && auditIdea.length > 0">
                <div class="piece" v-for="item in auditIdea" :key="item.id">
                  <div class="text1">{{item.content}}</div>
                  <div class="text2">
                    {{item.deptName}}
                    <span>{{item.humanName}}&nbsp;</span>
                    <div>{{item.auditTime}}</div>
                  </div>
                </div>
              </div>
            </td>
          </tr>-->
          <!--备注-->
          <!-- <tr style="min-height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="5" style="text-align:left;vertical-align:middle">
              <div v-if="remark && remark.length > 0">
                <div class="piece" v-for="item in remark" :key="item.id">
                  <div class="text1">{{item.content}}</div>
                  <div class="text2">
                    {{item.deptName}}
                    <span>{{item.humanName}}&nbsp;</span>
                    <div>{{item.remarkTime}}</div>
                  </div>
                </div>
              </div>
            </td>
          </tr>-->
        </tbody>
      </table>
      <br />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {},
      id: this.$route.query.id,
      auditIdea: [],
      remark: [],
    };
  },
  computed: {},
  methods: {
    loadData() {
      this.$api.duty.dutyTrendsSearchDetail({ id: this.id }).then((res) => {
        console.log(9999, res);
        this.formData = res.bxgjMainOrderDo;
        this.$set(
          this.formData,
          "submitDate",
          res.bxgjMainOrderDo.submitDate
            ? res.bxgjMainOrderDo.submitDate.split(" ")[0]
            : ""
        );
        this.$set(
          this.formData,
          "gjStatus",
          this.$route.query.gjStatus ? this.$route.query.gjStatus : ""
        );
        // this.auditIdea = JSON.parse(res.bxgjMainOrderDo.auditIdea);
        // this.remark = JSON.parse(res.bxgjMainOrderDo.remark);
      });
    },
    /** @description: 打印 */
    printThis() {
      document.execCommand("print");
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.piece {
  overflow: hidden;
}
.piece .text1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.piece .text2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}
.chuanYue {
  overflow: hidden;
}
.chuanYue .chuanYue1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.chuanYue .chuanYue2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.guoCh {
  overflow: hidden;
}
.guoCh .guoCh1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.guoCh .guoCh2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.beiZh {
  overflow: hidden;
}
.beiZh .content {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.beiZh .name {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}
.printTableList {
  width: 94%;
  margin: 0 auto;
  table-layout: fixed;
  tr {
    height: 32px;
    td {
      width: 12%;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
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
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.pos_r {
  position: relative;
}
.printButton {
  position: absolute !important;
  top: 1% !important;
  right: 1% !important;
}
@page {
  size: A4;
  margin: 10pt;
}
@media print {
  .print_list {
    width: 100%;
  }

  .el-button--info.is-plain {
    display: none;
  }
  // .PageNext {
  //   page-break-after: always;
  // }
  tr {
    page-break-inside: avoid;
  }
}
</style>

