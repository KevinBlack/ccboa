<template>
  <!--制发打印单-->
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <el-col>
          <el-button @click="printThis()" v-show="printShow" type="info" plain>打印</el-button>
          <!-- <el-button @click="closeThis" type="info" plain>返回</el-button> -->
        </el-col>
      </el-row>
      <el-row>
        <h1 class="title-h1">中国建设银行领导批示登记表</h1>
      </el-row>

      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
      >
        <tr>
          <td style="width:20%;text-align:center;vertical-align:middle;">文件标题</td>
          <td
            colspan="5"
            style="width:40%;text-align:center;vertical-align:middle;"
          >{{formdata.title}}</td>
        </tr>
        <tr>
          <td style="width:20%;text-align:center;vertical-align:middle;">文号</td>
          <td style="text-align:center;vertical-align:middle;">{{formdata.documentNo}}</td>
          <td style="width:20%;text-align:center;vertical-align:middle;">文件类型</td>
          <td style="text-align:center;vertical-align:middle;">{{formdata.documentType}}</td>
          <td style="width:20%;text-align:center;vertical-align:middle;">主办部门</td>
          <td style="text-align:center;vertical-align:middle;">{{formdata.zbDept}}</td>
        </tr>
        <tr>
          <td style="width:20%;text-align:center;vertical-align:middle;">联系人</td>
          <td style="text-align:center;vertical-align:middle;">{{formdata.contact}}</td>
          <td style="width:20%;text-align:center;vertical-align:middle;">联系电话</td>
          <td style="text-align:center;vertical-align:middle;">{{formdata.tel}}</td>
          <td style="width:20%;text-align:center;vertical-align:middle;">成文日期</td>
          <!-- <td style="text-align:left;vertical-align:middle;">{{formdata.createDate}}-10-1</td> -->
          <td style="text-align:center;vertical-align:middle;">{{formdata.createDate}}</td>
        </tr>
        <tr style="min-height:200px">
          <td style="width:20%;text-align:center;vertical-align:middle">领导批示</td>
          <td colspan="5">
            <div class="piece" v-for="item in formdata.opinion" :key="item.id">
              <div class="text1">{{item.content}}</div>
              <div class="text2">
                <span>{{item.deptName}} &nbsp;&nbsp; {{item.leaderName}}</span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
            <div style="text-align:center;vertical-align:middle;">{{formdata.leaderOpinion}}</div>
          </td>
        </tr>
        <tr>
          <td style="width:20%;text-align:center;vertical-align:middle;">取文部门</td>
          <td colspan="5" style="text-align:left;vertical-align:middle;">{{formdata.getDocDept}}</td>
        </tr>
        <tr style="min-height:300px">
          <td style="width:20%;text-align:center;vertical-align:middle;">备注</td>
          <td colspan="5">
            <div class="piece" v-for="item in formdata.remarkList" :key="item.id">
              <div class="text1">{{item.content}}</div>
              <div class="text2">
                <span>{{item.deptName}} &nbsp;&nbsp; {{item.leaderName}}</span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
            <div style="text-align:center;vertical-align:middle;">{{formdata.remark}}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      printShow:true,
      formdata: {},
      options: [
        // (1:发文,2:收文,3:签报,4:其他)
        {
          value: "1",
          label: "发文"
        },
        {
          value: "2",
          label: "收文"
        },
        {
          value: "3",
          label: "签报"
        },
        {
          value: "4",
          label: "其他"
        }
      ]
      // id:JSON.parse(this.$route.query.id),
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
    closeThis() {
      this.$intent.closeWindow(this);
    },
    loadData() {
      console.log(JSON.parse(this.$route.query.detail));
      this.formdata = JSON.parse(this.$route.query.detail);
      if (this.formdata.documentType == 1) {
        this.formdata.documentType = "发文";
      } else if (this.formdata.documentType == 2) {
        this.formdata.documentType = "收文";
      } else if (this.formdata.documentType == 3) {
        this.formdata.documentType = "签报";
      } else {
        this.formdata.documentType = "其他";
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    // margin-left: 8px;
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
</style>
