
<template>
  <!-- 会议制发单打印处理单 -->
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <el-button @click="closeThis" type="info" plain>关闭</el-button>
        </el-col>
      </el-row>
      <el-row>
        <h1 class="title-h1">《每日动态》备选稿件</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
      >
        <tbody>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle">拟投稿刊物</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">拟投稿栏目</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿人单位</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿人部门</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿人</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
            <td style="width:20%;text-align:center;vertical-align:middle">联系电话</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿日期</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle">标题</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width:20%;text-align:center;vertical-align:middle">新标题</td>
            <td
              style="width:80%;padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="4"
            >{{}}</td>
          </tr>
          <tr style="min-height: 280px;">
            <td style="width:20%;text-align:center;vertical-align:middle">评审意见</td>
            <!-- <td colspan="4">{{formData.checkList}}</td> -->
            <td colspan="4">
              <div class="piece" v-for="item in formData.checkList" :key="item.id">
                <div class="text1">{{item.opinion}}</div>
                <div class="text2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div>{{item.DATE}}</div>
                </div>
              </div>
            </td>
          </tr>

          <tr style="min-height: 280px;">
            <td style="width:20%;text-align:center;text-align:center;vertical-align:middle">租刊意见</td>
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
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      formData: {},
      // id:JSON.parse(this.$route.query.id),
    };
  },
  methods: {
    printThis () {
      document.execCommand("print");
    },
    closeThis () {
      this.$intent.closeWindow(this)
    },
    loadData () {
    },
  },
  created () {
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
