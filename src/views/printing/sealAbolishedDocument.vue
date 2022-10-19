<template>
  <div>
    <div id="printHtml" class="sealDocument">
      <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <!-- <el-button @click="closeThis" type="info" plain>返回</el-button> -->
        </el-col>
      </el-row>
      <el-row>
        <h1 class="title-h1">{{this.$route.query.registeHeader}}</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
      >
        <tbody>
          <tr style="height: 40px;">
            <td style="width:15%;text-align:center;vertical-align:middle;">申请人</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;padding:0 5px;"
              colspan="3"
            >{{form.draftUser}}</td>
            <td style="width:15%;text-align:center;vertical-align:middle">申请单位</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="3"
            >{{form.sdept}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:15%;text-align:center;vertical-align:middle;">申请时间</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;padding:0 5px;"
              colspan="3"
            >{{form.draftDate}}</td>
            <td style="width:15%;text-align:center;vertical-align:middle">编号</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="3"
            >{{form.documentNo}}</td>
          </tr>
        </tbody>
      </table>

      <br />
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList docTable"
        style="font-family: 宋体;font-size: 19px;"
      >
        <thead style="lineHeight:26px">用印公文:</thead>
        <tbody>
          <tr>
            <td colspan="5" style="width:100%">
              <el-table
                border
                size="medium"
                :data="tableData"
                :header-row-style="{textAlign:'center'}"
              >
                <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
                <el-table-column label="公文名称" prop="TITLE" align="center"></el-table-column>
                <el-table-column label="公文编号" prop="DOCUMENTCODE" align="center"></el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <p>印章名称及每份个数</p>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.sealDetail}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <p>用印份数</p>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.useSealCount}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用印总数" prop="useSealSum" align="center">
                  <span slot-scope="scope">{{scope.row.sum}}</span>
                </el-table-column>
              </el-table>
              <div style="border-top:1px solid #000;display:flex;text-align:center">
                <p style="width:51px;border-right:1px solid #000;color:#000;lineHeight:32px">汇总</p>
                <p :style="{color:'#000',padding:'0 10px',lineHeight:'32px'}">{{sumary}}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
      >
        <tbody>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">标题</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.title}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">用印原因</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.yyReason}}</td>
          </tr>
          <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">发往单位</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.sendDept}}</td>
          </tr>
          <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">用印时间</td>
            <td style="width:80%;text-align:left;vertical-align:middle" colspan="4">{{form.useTime}}</td>
          </tr>
          <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">用印方式</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.fldYyfs}}</td>
          </tr>
          <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">印章保管人意见</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.yzBgrYj}}</td>
          </tr>
          <!-- <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">盖章状态</td>
            <td style="width:80%;text-align:left;vertical-align:middle;padding:0 5px" colspan="4">{{form.yzBgrYj}}</td>
          </tr>-->
          <tr style="min-height: 140px;">
            <td style="width:20%;text-align:center;vertical-align:middle">备注</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.remark}}</td>
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
      form: {},
      // 用印公文汇总
      sumary: '',
      tableData: []
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
      this.$api.sealManage.detailDocument({ id: this.$route.query.id }).then(res => {
        this.form = JSON.parse(JSON.stringify(res.data))
        this.tableData = JSON.parse(JSON.stringify(JSON.parse(res.data.rtfAssetList)))
        console.log(this.tableData);
        this.sumary = this.tableData[0].sumary
        this.fldYyfsValue = res.data.fldYyfs
      })
    },
  },
  created () {
    if (this.$route.query.id) {
      this.loadData();
    }
  },
};
</script>
<style lang="less" rel="stylesheet/less">
.sealDocument {
  width: 900px;
  margin: 0 auto;
  background-color: white;
  .docTable {
    table {
      border-color: #000;
    }
    .el-table--border,
    .el-table--group {
      border: none;
    }
    .el-table {
      color: #000;
      td {
        border-bottom: none;
      }
    }
    .el-table--border td {
      border-right: none;
    }
    .el-table--border th {
      border-right: 1px solid #000 !important;
    }
    .el-table th.is-leaf {
      border-bottom: 1px solid #000 !important;
    }
    .el-table thead,
    .el-table__empty-text {
      color: #000;
    }
  }
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
  .printTableList {
    width: 94%;
    margin: 0 auto;

    tr {
      height: 40px;
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
    border: 1px solid #000;
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
