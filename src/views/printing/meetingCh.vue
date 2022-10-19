
<template>
  <!-- 会议参会单打印处理单 -->
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <el-button @click="closeThis" type="info" plain>关闭</el-button>
        </el-col>
      </el-row>
      <el-row>
        <h1 class="title-h1">{{formData.draftOrgan}}{{formData.draftDepartment}}{{tempType}}</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
      >
        <tbody>
          <tr style="height: 32px;">
            <td
              style="width:20%;text-align:center;vertical-align:middle"
            >{{formData.type=="培训会议通知"?'培训名称':'会议名称'}}</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.title}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle;">主办部门</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;"
              colspan="2"
            >{{formData.maindept}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿人</td>
            <td style="width:30%;text-align:left;vertical-align:middle">{{formData.authorCn}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle;">联系电话</td>
            <td style="width:40%;text-align:left;vertical-align:middle" colspan="2">{{formData.tel}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿日期</td>
            <td style="width:30%;text-align:left;vertical-align:middle">{{formData.draftDate}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type!='系统会议通知'">
            <td
              style="width:20%;text-align:center;vertical-align:middle"
            >{{formData.type=="培训会议通知"?'培训时间':'会议时间'}}</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.hyTime}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type!='系统会议通知'">
            <td
              style="width:20%;text-align:center;vertical-align:middle"
            >{{formData.type=="培训会议通知"?'培训地点':'会议地点'}}</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.hyAdress}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">主持人</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.host}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'||formData.type=='系统会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">联合单位</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.unitdept}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">出席</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.attend}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">列席</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.attendance}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type=='本部会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">摘要</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.summary}}</td>
          </tr>
          <!-- 本部会议内容打印 -->
          <tr style="height: 32px;" v-for="item in listArr" :key="item.id">
            <td style="width:20%;text-align:center;vertical-align:middle;">会议议题</td>
            <td style="width:40%;text-align:left;vertical-align:middle" colspan="2">{{item.topic}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">参会部门</td>
            <td style="width:30%;text-align:left;vertical-align:middle">{{item.joinDept}}</td>
          </tr>
          <tr style="height: 32px;" v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
            <td style="width:20%;text-align:center;vertical-align:middle">委托承办单位</td>
            <td
              style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="4"
            >{{formData.entrustUnit}}</td>
          </tr>
          <tr style v-if="formData.type!='本部会议通知'">
            <td style="padding-left: 10px;text-align:left;vertical-align:middle;" colspan="5">
              <div v-html="formData.wordBody"></div>
            </td>
            <!-- <td></td>
            <td style="text-align:left" colspan="5">
              <div v-html="formData.wordBody"></div>
            </td>-->
          </tr>
          <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">签发意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formData.sendList" :key="item.id">
                <div class="p1">{{item.opinion}}</div>
                <div class="p2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div class="date">{{item.date}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="min-height: 280px;">
            <td style="width:20%;text-align:center;vertical-align:middle">办理意见</td>
            <!-- <td colspan="4">{{formData.checkList}}</td> -->
            <td colspan="4">
              <div class="piece" v-for="item in formData.pbIdeaList" :key="item.id">
                <div class="text1">{{item.opinion}}</div>
                <div class="text2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div>{{item.date}}</div>
                </div>
              </div>
            </td>
          </tr>

          <tr style="min-height: 280px;">
            <td style="width:20%;text-align:center;text-align:center;vertical-align:middle">传阅意见</td>
            <!-- <td colspan="4">{{formData.cyList}}</td> -->
            <td colspan="4">
              <div class="chuanYue" v-for="item in formData.cyList" :key="item.id">
                <div class="chuanYue1">{{item.opinion}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div>{{item.date}}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table
        v-if="tableData&&tableData.length>0"
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px;">
            <td
              v-for="item in tableCols"
              :key="item.prop"
              style=" text-align:center;vertical-align:middle"
            >{{item.label}}</td>
          </tr>
          <tr style="height: 64px;" v-for="item in tableData" :key="item">
            <td
              style="text-align:center;vertical-align:middle"
              v-for="(item1,index) in tableCols"
              :key="index"
            >{{item[item1.prop]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      numyear:this.$route.query.numyear||this.$route.query.numYear?this.$route.query.numyear||this.$route.query.numYear:'',
      formData: {},
      // id:JSON.parse(this.$route.query.id),
      tableData: [],
      tableCols: [],
      tempArr: [],
      returnCnArr: [],
      returnEnArr: [],
      isNecessArr: [],
      attendArr: [],
      listArr: [],
      tempType: "",
    };
  },
  methods: {
    printThis() {
      document.execCommand("print");
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    loadData() {
      this.$api.meeting
        .cbDetial1({
          id: this.$route.query.id,
          numYear:this.numyear
        })
        .then((res1) => {
          this.listArr = [];
          //   this.formData = res.meetSendOrderDo;
          //   this.formData.sendList = res.sendList;
          //   // this.formData.commentsList = res.commentsList;
          //   this.formData.cyList = res.cyList;
          //   this.formData.checkList = res.checkList;
          //   // this.getHuanJie();
          //   this.formData = res.meetCbOrderDo;
          this.tableData = [];
          this.tableCols = [];
          this.formData = res1.meetCbOrderDo;
          this.formData.draftDate = res1.meetCbOrderDo.draftDate.split(" ")[0];

          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          const telArr = res1.meetCbOrderDo.tel.split(",");
          if (telArr.length == 2) {
            this.formData.tel = telArr[1];
          } else {
            this.formData.tel = telArr[0];
          }
          if (this.formData.isFeedback == "0") {
            this.tempArr = [];
            this.returnCnArr = [];
            this.returnEnArr = [];
            this.isNecessArr = [];
            this.tempArr = this.formData.returnHtml.split("&");
            // console.log(7878, this.tempArr)
            this.returnCnArr = this.tempArr[0].split(",");
            this.returnEnArr = this.tempArr[1].split(",");
            this.isNecessArr = this.tempArr[2].split(",");
            this.attendArr = [];
            this.returnCnArr.forEach((item, index) => {
              this.attendObj = {};
              this.attendObj.label = item;

              this.attendObj.prop = this.returnEnArr[index];

              // if (item == '姓名' || item == '行名' || item == '部门') {
              //   this.attendObj.type = ""
              //   // this.attendObj.formatter = function (row) {
              //   //   console.log("------>", row)
              //   //   return true

              //   // }
              // } else {
              //   this.attendObj.type = "Input"
              // }
              //  if (item == '姓名' || item == '行名' || item == '部门') {
              //   this.attendObj.type = ""
              //   // this.attendObj.formatter = function (row) {
              //   //   console.log("------>", row)
              //   //   return true

              //   // }
              // } else {
              this.attendObj.type = "";
              this.tableCols.push(this.attendObj);
            });
            if (
              this.formData.returnHtmlData &&
              this.formData.returnHtmlData.length > 0
            ) {
              this.tableData = JSON.parse(this.formData.returnHtmlData);
            }
            // let newArr = []
            // newArr = this.tableCols.concat()
            // // newArr.pop()
            // // console.log(23243253, newArr)

            // if (this.formData.returnHtmlData && this.formData.returnHtmlData.length > 0) {
            //   let arr1 = []
            //   let obj2 = {}
            //   arr1 = this.formData.returnHtmlData.split('&')
            //   // console.log(121, arr1)
            //   arr1.forEach((item, index) => {
            //     let arr2 = []
            //     let obj1 = {}
            //     arr2 = item.substr(0, item.length - 1).split(',')
            //     // console.log(999, arr2)

            //     arr2.forEach((item1, index1) => {
            //       // console.log(7878, index1)
            //       obj1[newArr[index1].prop] = item1
            //     })
            //     // console.log(999, obj1)
            //     this.tableData.push(obj1)
            //   })

            // }
          }
          this.formData.sendList = res1.sendList; //签发意见
          this.formData.pbIdeaList = res1.pbIdeaList; //办理意见
          this.formData.cyList = res1.cyList; //传阅意见

          if (this.formData.type == "本部会议通知") {
            this.$api.meeting
              .hyConList({ id: this.formData.mainId })
              .then((res) => {
                this.listArr = res.list;
                // this.formData.attchmentFileInfo = []
                // this.listArr.forEach((item, index) => {
                //   // this.getFileList1(item.id, index)
                //   this.formData.attchmentFileInfo.push(...item.attachList)
                // })
              });
          }
        });
    },
  },
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
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
  margin-top: 0 !important;
}
// .printButton {
//   position: absolute;
//   right: 28%;
//   z-index: 10;
//   top: 6%;
// }
td {
  border: solid #000 1px;
  word-break: break-all;
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
  position: absolute;
  top: 55%;
  right: 3%;
}
@page {
  size: A4;
  margin: 25pt;
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
