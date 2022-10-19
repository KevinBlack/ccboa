<!--
 * @Author: your name
 * @Date: 2020-11-26 15:44:26
 * @LastEditTime: 2021-07-20 14:50:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\printing\meetBmTable.vue
--> 

<template>
  <!-- 报名表打印处理单 -->
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <el-button @click="closeThis" type="info" plain>关闭</el-button>
        </el-col>
      </el-row>
      <el-row>
        <h1 class="title-h1">报名表</h1>
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
      //   // 承办部门
      //   entrustUnit: '',
      //   // 参会部门
      //   joinmeetDept: '',
      // 反馈信息
      tempArr: [],
      returnCnArr: [],
      returnEnArr: [],
      isNecessArr: [],
      attendObj: {},
      attendArr: [],
      tableData: [],
      tableCols: [],
      returnHtmlData: "",
      //   isBaoming: false,//没有报名表
      //   isSure: false,//不打印报名表
      //   formData: {},
      id: this.$route.query.id,
    };
  },
  methods: {
    printThis() {
      //   if (this.isBaoming) {
      //     this.$confirm("是否打印报名表?", "提示", {
      //       confirmButtonText: "是",
      //       cancelButtonText: "否",
      //       type: "warning"
      //     }).then(() => {
      //       this.isSure = true
      //     }).catch(() => {
      //       this.isSure = false
      //     });
      //   }
      document.execCommand("print");
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    // loadData () {
    //   this.$api.meeting
    //     .zfDetail1({
    //       id: this.$route.query.id,
    //     })
    //     .then((res) => {
    //       this.formData = res.meetSendOrderDo;
    //       this.formData.sendList = res.sendList;
    //       // this.formData.commentsList = res.commentsList;
    //       this.formData.cyList = res.cyList;
    //       this.formData.checkList = res.checkList;
    //       this.formData.cbList = res.cbList
    //       this.joinmeetDept = ''
    //       this.entrustUnit = ''
    //       let entrustUnitArr = [], joinmeetDeptArr = []
    //       if (res.cbList && res.cbList.length > 0) {
    //         res1.cbList.forEach(item => {
    //           if (item.isCanOrCb == '0') {
    //             joinmeetDeptArr.push(item.joinmeetDept)
    //           } else {
    //             entrustUnitArr.push(item.entrustUnit)
    //           }
    //         })
    //         this.joinmeetDept = joinmeetDeptArr.join(',')
    //         this.entrustUnit = entrustUnitArr.join(',')
    //       }
    //       // this.getHuanJie();
    //     });
    // },
    baoming() {
      this.$api.meeting.zflookBmb({ id: this.id }).then((res) => {
        if (res.dataList && res.dataList.length > 0) {
          //   this.isBaoming = true
          if (res.tableName && res.tableName.length > 0) {
            this.tempArr = res.tableName.split("&");
            this.returnCnArr = this.tempArr[0].split(",");
            this.returnEnArr = this.tempArr[1].split(",");
            this.isNecessArr = this.tempArr[2].split(",");
            this.attendArr = [];
            this.returnCnArr.forEach((item, index) => {
              this.attendObj = {};
              this.attendObj.label = item;
              this.attendObj.prop = this.returnEnArr[index];
              this.tableCols.push(this.attendObj);
            });
          }
          let str = res.dataList;
          let infoArr = str.substring(0, str.length - 1).split("#");
          // let tempArr = []
          console.log(1, infoArr);
          infoArr.forEach((item, index) => {
            // this.tableData=
            // let infoConArr = []
            console.log(JSON.parse(item));
            this.tableData.push(...JSON.parse(item));
            // infoConArr = item.split('&')
            // tempArr = tempArr.concat(infoConArr)
          });
          console.log(this.tableData);

          // infoArr.forEach((item, index) => {
          //   let infoConArr = []
          //   infoConArr = item.split('&')
          //   tempArr = tempArr.concat(infoConArr)
          // })
          // tempArr.forEach((item, index) => {
          //   let manArr = []
          //   manArr = item.split(',')
          //   let obj = {}
          //   this.tableCols.forEach((item1, index1) => {

          //     obj[item1.prop] = manArr[index1]
          //   })
          //   this.tableData.push(obj)
          // })
        }
      });
    },
  },
  created() {
    this.baoming();
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
