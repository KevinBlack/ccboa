<template>
  <div>
    <div id="printHtml" class="sealDocument">
      <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain v-if="show">打印</el-button>
          <!-- <el-button @click="closeThis" type="info" plain>返回</el-button> -->
        </el-col>
      </el-row>
      <el-row>
        <h1 class="title-h1">{{this.form.deptTableHeader?this.form.deptTableHeader:this.form.draftOrgan}}印章保管交接处理单</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
      >
        <tbody>
          <tr style="height: 40px;">
            <td style="width:15%;text-align:center;vertical-align:middle;">印章名称</td>
            <td
              style="width:30%;text-align:left;vertical-align:middle;padding:0 5px"
            >{{form.title}}</td>
            <td style="width:15%;text-align:center;vertical-align:middle">编号</td>
            <td style="width:40%;text-align:left;vertical-align:middle;padding:0 5px">{{form.documentCode}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:15%;text-align:center;vertical-align:middle">交接类型</td>
            <td
              style="width:30%;text-align:left;vertical-align:middle;padding:0 5px"
            >{{form.jiaojieType=='51'?'日常':'岗位'}}</td>
            <td style="width:15%;text-align:center;vertical-align:middle">联系电话</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;padding:0 5px"
            >{{form.phone}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">移交人</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="3"
            >{{form.creator}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">拟稿日期</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.cdate}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">接收人</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.chineseNodeUser}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">交出时间</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.finishTime}}</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">交出原因</td>
            <td
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.reason}}</td>
          </tr>
          
    
          <tr style="height: 80px;">
            <td style="width:20%;text-align:center;vertical-align:middle">审批意见</td>
            <td colspan="10" v-if="form.fzIdeas">
              <div class="beiZh" v-for="(item,index) in form.fzIdeas" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">{{form.ygBmYj}}</td>
          </tr>
        
          <tr style="height: 40px;">
            <td style="width:20%;text-align:center;vertical-align:middle">接收人确认</td>
            <td colspan="10" v-if="form.jyBjs!==undefined&&form.jyBjs.length>0">
              <div class="beiZh" v-for="(item,index) in form.jyBjs" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td
              v-else
              style="width:80%;text-align:left;vertical-align:middle;padding:0 5px"
              colspan="4"
            >{{form.jyBj}}</td>
          </tr>
       
          <tr style="height: 80px;">
            <td style="width:20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="10" v-if="form.remarks">
              <div class="beiZh" v-for="(item,index) in form.remarks" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">{{form.remark}}</td>
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
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      form: {},
      show: true //控制打印按钮
    };
  },
  methods: {
  
    printThis() {
      this.show = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 1000);
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    loadData() {
      const query = this.$route.query;
      this.$api.sealManage.sealCommon
        .getKeeperSealKeeperChangeDetail({ id: this.$route.query.id, draftOrganId: query && query.draftOrganId ? query.draftOrganId : '' ,numYear:this.numYears})
        .then(res => {
          console.log(res, "ss");
          this.form = JSON.parse(JSON.stringify(res.data));
        });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.loadData();
    }
  }
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

  .Span {
    text-align: left;
    width: 100%;
    display: block;
    padding: 10px;
  }
  .beiZh {
    overflow: hidden;
  }
  .beiZh .content {
    // float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .beiZh .name {
    // float: right;
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
td {
  word-wrap: break-word;
  word-break: break-all;
}
</style>
