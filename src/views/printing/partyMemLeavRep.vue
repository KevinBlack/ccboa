<template>
  <div class="tablePrint">
    <el-header>
      <div class="btn">
        <el-button @click="printThis()" type="info" plain>打印</el-button>
        <!-- <el-button class="btnstyle" @click="closeThis()" >关闭</el-button> -->
      </div>
    </el-header>
    <div class="title-h1">{{dataForm.curBank}}党委成员离京报告表</div>

    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;">
      <tbody>
        <!-- 上面  font-size: 12px;  colspan="2"-->
        <tr style="height: 26px;">
          <td style="width:15%;text-align:center;vertical-align:middle; font-size: 48px">报告人</td>
          <td style="width:40%;text-align:left;vertical-align:middle;">{{dataForm.name}}</td>
          <td style="width:15%;text-align:center;vertical-align:middle;font-size: 48px">前往地点</td>
          <td style="width:40%;text-align:left;vertical-align:middle">{{dataForm.address}}</td>
        </tr>
        <tr style="height: 26px;">
          <td style="width:10%;text-align:center;vertical-align:middle;font-size: 48px">计划离京时间</td>
          <td
            style="width:40%;text-align:left;vertical-align:middle"
          >{{dataForm.ljTime}} {{dataForm.ljTimeDetail}}</td>
          <td style="width:10%;text-align:center;vertical-align:middle;font-size: 48px">计划返京时间</td>
          <td
            style="width:40%;text-align:left;vertical-align:middle"
          >{{dataForm.fjTime}} {{dataForm.fjTimeDetail}}</td>
        </tr>

        <!-- 批示意见 -->
        <tr style="min-height: 170px;">
          <td style="width:20%;text-align:left;vertical-align:middle;" colspan="4">
            <div style="margin:10px 10px">批示意见:</div>

            <div style="min-height: 170px;" v-if="option.length=='0'">
              <div class="piece">
                <div class="text1">{{dataForm.comments}}</div>
                <!-- <div class="text2">
                <span>{{dataForm.authorDept}} {{dataForm.curUserName}} {{dataForm.updateTime}}</span>
                </div>-->
              </div>
            </div>

            <div style="min-height: 170px;" v-else>
              <div class="piece" v-for="item in option" :key="item.id">
                <div class="text1">{{item.content}}</div>
                <div class="text2">
                  <!-- <span>{{item.sign}}</span> -->
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <!-- 出差事由 -->

        <tr style="height: 170px;">
          <td style="width:20%;text-align:left;vertical-align:middle;margin-top:10px" colspan="4">
            <div style="margin:10px 10px">出差事由：</div>

            <div style="min-height: 170px;">
              <div
                style="height: 170px;width:100%;padding-left: 12px;line-height: initial;text-indent: 30px; text-align:left;vertical-align:middle"
              >{{dataForm.outReason}}</div>
            </div>
          </td>
        </tr>
        <tr style="height: 100px;">
          <td style="width:20%;text-align:center;vertical-align:middle;margin-top:10px">
            <div style="margin:10px 10px">总行陪同人员：</div>
          </td>
          <td
            style="height: 100px; width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
            colspan="4"
          >{{dataForm.ptPersion}}</td>
        </tr>
        <!-- 备注 -->
        <tr style="min-height: 170px;">
          <td style="width:20%;text-align:left;vertical-align:middle;margin-top:10px" colspan="4">
            <div style="margin:10px 10px">备注:</div>

            <!-- <div style="height: 170px;" v-if="dataForm.currentNode ==='起草'"> -->
            <div style="height: 70px;" v-if="dataForm.remark">
              <div class="piece">
                <div class="text1">{{dataForm.remark}}</div>
              </div>
            </div>

            <!-- <div v-else style="min-height: 170px;"> -->
            <div style="min-height: 170px;">
              <div class="piece" v-for="item in remarks" :key="item.id">
                <div class="text1">{{item.content}}</div>
                <div class="text2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </div>
          </td>
          <!-- <td colspan="4" v-if="dataForm.currentNode ==='起草'">
          <div class="piece">
            <div class="text1">{{dataForm.remark}}</div>
          </div>
        </td>
        <td colspan="4" v-else>
          <div class="piece" v-for="item in remarks" :key="item.id">
            <div class="text1">{{item.content}}</div>
            <div class="text2">
              <span>
                {{item.deptName}}&nbsp;
                {{item.createUser}}
              </span>
            <div>{{item.createTime}}</div>
            </div>
          </div>
          </td>-->
        </tr>
      </tbody>
    </table>
    <!-- 下面 -->
    <!-- <div class="authorInfo">
      <div>填报人：{{dataForm.authorCn}}</div>
      <div>填报时间：{{dataForm.draftTime}}</div>
    </div>-->

    <div class="person">
      <p>
        <span>填报人:</span>
        <span>{{dataForm.authorCn}}</span>
      </p>
      <p>
        <span>填报时间：</span>
        <span>{{dataForm.draftTime}}</span>
      </p>
      <div style=" height:auto; margin-top:10px" v-show="imgShow">
        <img :src="pointCodePath" />
      </div>
    </div>
  </div>
</template>
<script >
// import uploadFileTs from "components/uploadFile/uploadFileTs";
import minixs from "@/minixs/index";
export default {
  mixins: [minixs],
  data() {
    return {
      pointCodePath: "", // 二维码路径
      imgShow: false,
      option: [], // 批示意见
      remarks: [], // 备注
      flowChartList: [],
      dataForm: {
        draftTime: "",
        authorCn: "",
        name: "",
        address: "",
        ljTime: "",
        ljTimeDetail: "",
        fjTime: "",
        fjTimeDetail: "",
        comments: "",
        outReason: "",
        ptPersion: "",
        remark: ""
      },
      Leaderlist: [], //行领导数据
      rules: {},
      type: null
    };
  },
  mounted() {
    if (this.$route.query.id) {
      // this.dataForm.id =  this.$route.query.id ? this.$route.query.id : null
      this.getDetail();
      this.getLeater();
    }
  },
  methods: {
    closeThis() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    printThis() {
      document.execCommand("print");
    },
    //获取二维码
    pointFun(filePaths, fileNames) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = filePaths;
      bank_doDownloadFile.filePath = fileNames;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          "A0846C071"
        )
        .then(res => {
          var host = window.location.host;
          if (res && res.success) {
            this.imgShow = true;
            this.pointCodePath =
              "http://" +
              host +
              "/ecpweb/getLocalFile.action?relativePath=" +
              res.filePath +
              "&fileName=" +
              res.fileName +
              "&openFile=true";
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "条形码下载失败",
              duration: 500
            });
          }
        });
    },
    // 获取详情
    getDetail() {
      this.$api.secreatary.partyMemLeavRep
        .getMemLeavRepDetail({
          id: this.$route.query.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$nextTick(() => {
              this.dataForm = res.data;
              this.option = res.exeList;
              this.remarks = res.remList;
              console.log(this.remarks, "222222");

              this.dataForm.draftTime = res.data.draftTime; 
              this.Leaderlist.map(item => {
                if (item.leaderHumanId == res.data.name) {
                  this.dataForm.name = item.leaderCnName;
                  return item[0].leaderCnName;
                } 
              });
              this.pointFun(res.fileName, res.filePath);
              console.log(this.dataForm.name, "报告人");
            });
          } 
        })
        .catch(() => {
          console.log("error");
        });
    },
    // 获取报告人
    getLeater() {
      this.$api.secreatary.activety.findLeader({}).then(res => {
        console.log(res, "行领导");
        this.Leaderlist = res.data;
      });
    }
  }
};
</script>
<style lang="less">
.detailComments {
  position: relative;
  height: 150px;
  margin-bottom: 10px;
  .el-textarea {
    height: 100%;
    padding-bottom: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #8996af !important;
    }
    .el-textarea__inner {
      height: 100%;
      border: none !important;
      &:hover {
        border: none !important;
      }
    }
  }
  .finishedInfo {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    text-align: right;
    color: #606266;
    background: #e4e7ed52;
    span {
      padding-right: 10px;
    }
  }
}
</style>
<style lang="less" rel="stylesheet/less" scoped>
@page {
  size: A4;
}

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}

.maintitle {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin: 30px 0;
  font-weight: bold;
}

.authorInfo {
  font-family: 宋体;
  font-size: 16px;
  padding-bottom: 10px;
  width: 94%;
  /* float: right; */
  /* display: none;
      bottom: 20px;
      right: 3px;
      position: fixed; */

  margin: 15px 10px 0 640px;
  /* display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-self:flex-end; */
  /* align-items: center; */
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

.piece {
  overflow: hidden;
}
.piece .text1 {
  float: left;
  margin-left: 12px;
  /* margin-top: 24px; */
  line-height: initial;
  width: 100%;
  text-indent: 30px;
  /* line-height: 20%; */
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
.person {
  text-align: right;
  color: #606266;
  margin: 15px 25px 0 0;

  p {
    line-height: 1.5;
    font-size: 14px;
  }
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

@media print {
  .tablePrint {
    width: 90%;
  }

  .el-button--info.is-plain {
    display: none;
  }
  .printTableList {
    width: 100%;
  }
  .piece {
    overflow: hidden;
  }
  .person {
    overflow: hidden;
    text-align: right;
    color: #606266;
    margin: 15px 15px 0 0;
    p {
      line-height: 1.5;
      font-size: 14px;
    }
  }

  .tablePrint {
    width: 900px;
    margin: 0 auto;
    background-color: white;
  }

  .maintitle {
    font-size: 30px;
    color: rgb(14, 117, 214);
    text-align: center;
    margin: 30px 0;
    font-weight: bold;
  }

  .authorInfo {
    font-family: 宋体;
    font-size: 16px;
    padding-bottom: 10px;
    width: 94%;
    /* float: right; */
    /* display: none;
      bottom: 20px;
      right: 3px;
      position: fixed; */

    margin: 15px 10px 0 640px;
    /* display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-self:flex-end; */
    /* align-items: center; */
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

  .piece {
    overflow: hidden;
  }
  .piece .text1 {
    float: left;
    margin-left: 12px;
    /* margin-top: 24px; */
    line-height: initial;
    width: 100%;
    text-indent: 30px;
    /* line-height: 20%; */
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
  .person {
    text-align: right;
    color: #606266;
    margin: 15px 10px 0 0;

    p {
      line-height: 1.5;
      font-size: 14px;
    }
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
}
</style>
<!--<style scoped lang="less" rel="stylesheet/less">-->
<!--  .container{-->
<!--    .content-header{-->
<!--      display: flex;-->
<!--      font-size: 14px;-->
<!--      padding: 10px;-->
<!--      border: 1px solid #f9aa21;-->
<!--      background: #fef7e7;-->
<!--      box-sizing: border-box;-->
<!--      p{-->
<!--        padding-right: 20px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  .el-col ::v-deep{-->
<!--    border: 1px solid transparent;-->
<!--  }-->
<!--  .el-header{-->
<!--    background-color: rgb(96, 186, 221);-->
<!--    line-height: 60px;-->
<!--  }-->
<!--  .title{-->
<!--    color: #ffffff;-->
<!--  }-->
<!--  .btn{-->
<!--    float:right;-->
<!--  }-->
<!--  .btnstyle{-->
<!--    color:rgb(14, 117, 214) ;-->
<!--  }-->
<!--  .btnstyle:hover{-->
<!--    background-color: rgb(14, 117, 214);-->
<!--    color: cornsilk;-->
<!--  }-->
<!--  .maintitle{-->
<!--    font-size: 30px;-->
<!--    color:rgb(14, 117, 214) ;-->
<!--    text-align: center;-->
<!--    margin-top: 30px;-->
<!--    font-weight: bold;-->
<!--  }-->
<!--  .container{-->
<!--    width: 800px;-->
<!--    padding-bottom: 20px;-->
<!--    margin: 30px auto;-->
<!--    border: 1px solid rgb(218, 215, 215);-->
<!--    padding: 20px 20px;-->
<!--    position: relative;-->
<!--  }-->
<!--  .c-header{-->
<!--    background-color: #fef7e7;-->
<!--    border:1px solid  #f9aa21;-->
<!--    height: 30px;-->
<!--    line-height: 30px;-->
<!--    font-size: 12px;-->
<!--  }-->
<!--  .el-table .cell{-->
<!--    white-space:pre-line;-->
<!--  }-->
<!--  .el-form-item ::v-deep {-->
<!--    margin-bottom: 12px;-->
<!--  }-->
<!--  .form-word{-->
<!--    width: 80px;-->
<!--    float: left;-->
<!--    line-height: 20px;-->
<!--    font-size: 14px;-->
<!--    color:  #606266;-->
<!--    text-align: center;-->
<!--  }-->
<!--  .person{-->
<!--    text-align: right;-->
<!--    color: #606266;-->
<!--    p{-->
<!--      line-height: 1.5;-->
<!--      font-size: 14px;-->
<!--    }-->
<!--  }-->
<!--</style>-->
