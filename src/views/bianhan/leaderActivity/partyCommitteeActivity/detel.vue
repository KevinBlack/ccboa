<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <h1 style class="title-h1">{{unitName}}党委成员活动安排</h1>
        <el-button class="printButton" @click="printThis()" type="info" plain v-if="show">打印</el-button>
        <!-- <el-button class="printButton1" @click="backDarft()" type="info" plain>返回</el-button> -->
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="tablePrintTable"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:middle">活动名称</td>
            <td
              colspan="10"
              style="padding-left: 10px;text-align:left;vertical-align:middle"
            >{{formdata.title}}</td>
          </tr>
          <tr>
            <td style="text-align:center;vertical-align:middle">开始日期</td>
            <td
              style="text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.startDate}}</td>
            <td colspan="2" style="text-align:center;vertical-align:middle">开始时间</td>
            <td
              style="text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.startTime}}</td>
            <td colspan="2"  style="text-align:center;vertical-align:middle">结束时间</td>
            <td
              colspan="2"
              style="text-align:center;vertical-align:middle"
            >{{formdata.endTime}}</td>
          </tr>
          <tr style="min-height: 45px;">
            <td style="text-align:center;vertical-align:middle; line-height: 24px;">行领导</td>
            <td
              colspan="4"
              style="padding-left: 10px;text-align:left;vertical-align:middle"
            >{{hname}}</td>
            <td colspan="2" style="width：20%;text-align:center;vertical-align:middle; line-height: 24px;">同时添加至</td>
            <td
              colspan="4"
              style="padding-left: 10px;width:30%;text-align:left;vertical-align:middle"
            >{{formdata.newDate}}</td>
          </tr>
          <tr >
            <td style="width：20%;text-align:center;vertical-align:middle">活动地点</td>
            <td
              colspan="4"
              style="padding-left: 10px;width:30%;text-align:left;vertical-align:middle"
            >{{formdata.activeAddress}}</td>
            <td colspan="2" style="width：20%;text-align:center;vertical-align:middle">活动类型</td>
            <td
              colspan="4"
              style="padding-left: 10px;text-align:left;vertical-align:middle"
            >{{formdata.activeType}}</td>
          </tr>
          <tr >
            <td style="width：20%;text-align:center;vertical-align:middle">活动内容</td>
            <td
              colspan="10"
              style="padding-left: 10px;text-align:left;vertical-align:middle"
            >{{formdata.activeContent}}</td>
          </tr>
          <!--        申请单位意见-->

          <tr >
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="10" style="padding-left: 10px;text-align:celeftnter;vertical-align:middle">{{formdata.remark}}</td>
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
      unitName: JSON.parse(localStorage.getItem("userInfo")).unitName,
      hname: "",
      arrays: [],
      formdata: {},
      show: true
    };
  },
  methods: {
    //获取行领导
    loadData(id) {
      this.$api.secreatary.activety.formbank({}).then(res => {
        this.arrays = [];
        console.log(res, "行领导");
        let arr = id.split(","); //行领导专属组回显
        console.log(arr);
        res.data.data2.map((item, index) => {
          arr.forEach(i => {
            if (i == item.leaderHumanId) {
              this.arrays.push(item.leaderCnName);
              this.hname = this.arrays.join("、");
            }
          });
        });
      });
    },
    details(id) {
      this.$api.secreatary.activety.Details({ id: id }).then(res => {
        console.log(res, "详情");
        if (res.code === "SUCCESS") {
          this.formdata = res.data.data;
          this.loadData(this.formdata.leaderCheckedValue);
        }
      });
    },
    backDarft() {
      this.$intent.closeWindow(this);
    },
    printThis() {
      this.show = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 1000);
    }
  },
  created() {
    if (this.$route.query.id) {
      this.details(this.$route.query.id);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less"  >
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
  padding: 3.2cm 2.7cm;
  background-color: white;
}
.tablePrintTable {
  width: 94%;
  margin: 0 auto;
}
.tablePrintTable tr td{
  padding: 13px 0;
}
.title-h1 {
  font-family: 宋体;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
}
/* // .printButton {
//   position: absolute;
//   right: 28%;
//   z-index: 10;
//   top: 6%;
// } */
tr {
  height: 32px;
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
  /*left: 3% !important;*/
  right: 1% !important;
}
.printButton1 {
  position: absolute !important;
  top: 1% !important;
  left: 10% !important;
  right: 1% !important;
}
/deep/.el-table td,
.el-table th .is-leaf {
  border-left: 1px solid #000 !important;
}
/deep/.is-center {
  border-bottom: 1px solid #000 !important;
}
</style>
