<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <el-button @click="printThis()" v-show="printShow" type="info" plain>打印</el-button>
        <!-- <el-button @click="goBack" type="info" plain>返回</el-button> -->
        <h1 style class="title-h1">{{formData.draftOrgan}}领导活动资料管理单</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体; font-size: 19px"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px">
            <td style="width：20%;text-align:center;vertical-align:middle">日期</td>
            <td
              style="width: 40%; text-align: center; vertical-align: middle"
              colspan="2"
            >{{ formData.activeDate }}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">时间</td>
            <td
              style="width: 30%; text-align: center; vertical-align: middle"
            >{{ formData.activeTime }}</td>
          </tr>
          <tr style="height: 32px">
            <td style="width：20%;text-align:center;vertical-align:middle">地点</td>
            <td
              colspan="4"
              style="text-align: left; vertical-align: middle"
            >{{ formData.activeAddress }}</td>
          </tr>
          <tr style="height: 100px">
            <td style="width：20%;text-align:center;vertical-align:middle">参加行领导</td>
            <td
              colspan="4"
              style="text-align: left; vertical-align: middle"
            >{{ formData.attendMemCn }}</td>
          </tr>
          <tr style="height: 32px">
            <td style="width：20%;text-align:center;vertical-align:middle">活动名称</td>
            <td colspan="4" style="text-align: left; vertical-align: middle">{{ formData.title }}</td>
          </tr>
          <tr style="height: 32px">
            <td style="width：20%;text-align:center;vertical-align:middle">活动类型</td>
            <td
              colspan="4"
              style="text-align: left; vertical-align: middle"
            >{{ formData.activeType }}</td>
          </tr>
          <tr style="height: 32px">
            <td style="width：20%;text-align:center;vertical-align:middle">活动描述</td>
            <td
              colspan="4"
              style="text-align: left; vertical-align: middle"
            >{{ formData.activeContent }}</td>
          </tr>
          <tr style="height: 32px">
            <td style="width：20%;text-align:center;vertical-align:middle">附件名称</td>
            <td colspan="4" style="text-align: left; vertical-align: middle">{{ formData.attTitle }}</td>
          </tr>
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
      printShow:true,
      formData: {
        draftOrgan: "",
        activeDate: "", //日期
        activeTime: "", //时间
        activeAddress: "", //地点
        attendMemCn: "", //参与人员
        attendMemCnId: "", //参与人员ID
        title: "", //活动名称
        activeType: "", //活动类型
        activeContent: "", //活动描述
        attFullDir: "", //附件位置
        attTitle: "", //附件名称
        id: "",
        attchmentFileInfo: "", //附件参数
        handleButton: "", //区分完成并发送和办结的标识
        currentDept: "" //选择人员以后发送部门
      }
    };
  },
  methods: {
    printThis() {
      // document.execCommand("print");
      this.printShow=false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },
    loadData() {
      this.$api.activityInformation
        .viewActivity({ id: this.$route.query.dataList })
        .then(res => {
          this.formData = res.data;
          this.formData.attTitle = res.data.attTitle.replace(/n/g, ";");
        });
    }
  },
  created() {
    this.loadData();
  }
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
  padding: 3.3cm 2.7cm;
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
      // vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
}
// .printButton {
//   position: absolute;
//   right: 28%;
//   z-index: 10;
//   top: 6%;
// }
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
  /*left: 3% !important;*/
  right: 1% !important;
}
</style>
