<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <h1 style class="title-h1">秘书活动安排处理单</h1>
        <el-button class="printButton" @click="printThis()" type="info" plain v-if="show">打印</el-button>
        <!-- <el-button class="printButton1" @click="backDarft()" type="info" plain>返回</el-button> -->
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
            <td style="text-align:center;vertical-align:middle">活动名称</td>
            <td style="padding-left: 10px;text-align:center;vertical-align:middle">{{formdata.title}}</td>
            <td style="text-align:center;vertical-align:middle">开始日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.startDate}}</td>
            <td style="text-align:center;vertical-align:middle">开始时间</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.startTime}}</td>
          </tr>
          <tr>
            <td style="text-align:center;vertical-align:middle">结束时间</td>
            <td
              colspan="10"
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formdata.endTime}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">活动地点</td>
            <td colspan="10" style="text-align:center;vertical-align:middle">{{formdata.activeAddress}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">活动类型</td>
            <td colspan="10" style="text-align:center;vertical-align:middle">{{formdata.activeType}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">活动内容</td>
            <td colspan="10" style="text-align:center;vertical-align:middle">{{formdata.activeContent}}</td>
          </tr>
          <!--        申请单位意见-->
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="10" style="text-align:center;vertical-align:middle">{{formdata.remark}}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  </div>
</template>


<script>
export default {
    name:'printProcessing',
  data() {
    return {
      formdata: {},
      show: true
    };
  },
  methods: {
    backDarft() {
      this.$intent.closeWindow(this);
    },
        
        
details(id) {
      this.$api.secreatary.activety.Detailsms({ id: id }).then(res => {
        console.log(res, "秘书详情");
        if (res.code === "SUCCESS" && res.data.data) {
          this.formdata = res.data.data;
        }
      });
    },
    printThis() {
      this.show = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 1000);
    }
  },
  created() {
    if(this.$route.query.id){
    this.details(this.$route.query.id)
    }
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
  font-size: 35px;
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
