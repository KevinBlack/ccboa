<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <h1 style class="title-h1">{{"《"+formdata.pubNm+"》"+"备选稿件"}}</h1>
        <el-button class="printButton" @click="printThis" type="info" plain>打印</el-button>
      </el-row>
      <!-- <el-row>
        <h1 style class="title-h1">{{"《"+formdata.pubNm+"》"+"备选稿件"}}</h1>
      </el-row> -->
      <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
        <tbody>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">拟投稿刊物</td>
            <td style="padding-left: 10px;text-align:center;vertical-align:middle" colspan="2">{{formdata.pubNm}}</td>
            <td style="text-align:center;vertical-align:middle">拟投稿栏目</td>
            <td style="padding-left: 10px;text-align:center;vertical-align:middle" colspan="2">{{formdata.colNm}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">拟稿人单位</td>
            <td style="padding-left: 10px;text-align:center;vertical-align:middle" colspan="2">{{formdata.drafOrgNm}}</td>
            <td style="text-align:center;vertical-align:middle">拟稿人部门</td>
            <td style="padding-left: 10px;text-align:center;vertical-align:middle">{{formdata.drafDepNm}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">投稿人</td>
            <td style="width:40%;text-align:center;vertical-align:middle" colspan="2">{{formdata.drafUnm}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">联系电话</td>
            <td style="width:30%;text-align:center;vertical-align:middle">{{formdata.phone}}</td>
          </tr>

          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">拟稿日期</td>
            <td style="width:40%;text-align:center;vertical-align:middle" colspan="2">{{formdata.drafTime}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">标题</td>
            <td style="width:30%;text-align:center;vertical-align:middle">{{formdata.title}}</td>
          </tr>

          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">新标题</td>
            <!-- <td style="width:30%;text-align:center;vertical-align:middle">{{formdata.newTitle}}</td> -->
            <td colspan="4" style="text-align:center;vertical-align:middle">{{newTitle}}</td>

          </tr>

          <!-- 审核意见 -->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">评审意见</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">
              <div class="qianF" v-for="item in auditOpinionsList" :key="item.id">
                <div class="p1">{{item.opinionText}}</div>
                <div class="p2">
                  <span>
                    {{item.depnm}}&nbsp;
                    {{item.unm}}&nbsp;
                    {{time(item.opinionTime)}}
                  </span>
                </div>
              </div>
            </td>
          </tr>
          <!-- 期刊意见 -->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">期刊意见</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">
              <div class="qianF" v-for="item in zukanOpinionsList" :key="item.id">
                <div class="p1">{{item.opinionText}}</div>
                <div class="p2">
                  <span>
                    {{item.depnm}}&nbsp;
                    {{item.unm}}&nbsp;
                    {{time(item.opinionTime)}}
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  </div>
</template>


<script>
import dateFormate from '@/util/filters.js'
export default {
  data() {
    return {
      tableTitle: '', // 打印单标题
      formdata: {}, // 打印单的值
      id: '',
      zukanOpinionsList: [],
      auditOpinionsList: [],
      newTitle: '',
    }
  },
  methods: {
    // 下拉框的值改变时
    time(e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + '  '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    // 打印
    printThis() {
      document.execCommand('print')
    },
    loadData() {
      this.$api.pubStatistics.pubBrowsingListDetails({ gId: this.id }).then((res) => {
        this.formdata = res.data
        this.auditOpinionsList = this.formdata.objectMap.assessOpinionsList
        this.zukanOpinionsList = this.formdata.objectMap.zukanOpinionsList
        this.formdata.drafTime = dateFormate.date(
          Date.parse(this.formdata.drafTime),
          "YYYY-MM-DD"
        );
      })
    },
  },
  created() {
    this.id = this.$route.query.data
    this.newTitle = this.$route.query.title
    if (this.id) {
      this.loadData()
    }
  },
}
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
    margin-top: 20px;
    width: 100%;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-top: 10px;
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
</style>

