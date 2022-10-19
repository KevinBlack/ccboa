<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <el-col>
          <el-button @click="printThis()" v-show="printShow" type="info" plain>打印</el-button>
          <el-button @click="closeThis" v-show="printShow" type="info" plain>关闭</el-button>
        </el-col>
        <h1 style class="title-h1">中国建设银行行长办公会议通知</h1>
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
            <td style="text-align:center;vertical-align:middle">拟稿人</td>
            <td style="padding-left: 10px;vertical-align:middle">{{formData.draftUser}}</td>
            <td style="text-align:center;vertical-align:middle">联系电话</td>
            <td style="padding-left: 10px;vertical-align:middle">{{formData.tel}}</td>
            <td style="text-align:center;vertical-align:middle">拟稿日期</td>
            <td style="padding-left: 10px;vertical-align:middle">{{formData.draftDate}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">会议名称</td>
            <td colspan="5" style="padding-left: 10px;vertical-align:middle">{{formData.title}}</td>
          </tr>
          <tr style="height: 50px;">
            <td style="text-align:center;vertical-align:middle">会议时间</td>
            <td colspan="2" style="padding-left: 10px;vertical-align:middle">{{formData.hyTimeStr}}</td>
            <td style="text-align:center;vertical-align:middle">会议地点</td>
            <td colspan="2" style="padding-left: 10px;vertical-align:middle">{{formData.hyAdress}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">会议候场地点</td>
            <td colspan="5" style="padding-left: 10px;vertical-align:middle">{{formData.hyHcdd}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">出席</td>
            <td colspan="5" style="padding-left: 10px;vertical-align:middle">
              <tr>
                <span style="text-align:center;line-height: 100%;vertical-align:middle">行领导：</span>
                <span colspan="5" style="padding-left: 10px;vertical-align:middle">{{formData.cxLd}}</span>
              </tr>
              <tr>
                <span style="text-align:center;line-height: 100%;vertical-align:middle">行高管：</span>
                <span colspan="5" style="padding-left: 10px;vertical-align:middle">{{formData.cxGg}}</span>
              </tr>
            </td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">缺席</td>
            <td colspan="5" style="padding-left: 10px;vertical-align:middle">
              <tr>
                <span style="text-align:center;line-height: 100%;vertical-align:middle">行领导：</span>
                <span colspan="5" style="padding-left: 10px;vertical-align:middle">{{LDbankList}}</span>
              </tr>
              <tr>
                <span style="text-align:center;line-height: 100%;vertical-align:middle">行高管：</span>
                <span colspan="5" style="padding-left: 10px;vertical-align:middle">{{GGbankListed}}</span>
              </tr>
            </td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">主持人</td>
            <td colspan="5" style="padding-left: 10px;vertical-align:middle">{{formData.zcName}}</td>
          </tr>
          <tr>
            <td style="text-align:center;vertical-align:middle">会议内容</td>
            <td colspan="7" style="vertical-align:middle">
              <table
                cellspacing="0"
                cellpadding="0"
                style="font-family: 宋体;font-size: 19px;width: 100%;"
                id="print-table"
              >
                <tbody>
                  <tr>
                    <td style="text-align:center;vertical-align:middle">序号</td>
                    <td style="text-align:center;vertical-align:middle">议题名称</td>
                    <td style="text-align:center;vertical-align:middle">主汇报部门</td>
                    <td style="text-align:center;vertical-align:middle">主汇报人</td>
                    <td style="text-align:center;vertical-align:middle">会议材料</td>
                    <td style="text-align:center;vertical-align:middle">列席部门</td>
                  </tr>
                  <tr v-for="item in opinionFldData">
                    <td style="text-align:center;vertical-align:middle">{{item.orderNum}}</td>
                    <td style="text-align:center;vertical-align:middle">{{item.ytMc}}</td>
                    <td style="text-align:center;vertical-align:middle">{{item.deptName}}</td>
                    <td style="text-align:center;vertical-align:middle">{{item.strZhbr}}</td>
                    <td style="text-align:center;vertical-align:middle">
                      <!-- <template slot-scope="scope"> -->
                      <!-- <div class="comp_list"> -->
                      <div
                        v-for="(itemd,index) in  item.attchmentFileInfo"
                        :key="itemd.id"
                        class="comp_list"
                      >
                        <div>
                          <span class="numName">{{index+1}}.</span>
                          <span
                            class="name down"
                            @click="viewFile(itemd,null,itemd.fileName)"
                          >{{itemd.fileName}}</span>
                        </div>
                      </div>
                      <!-- </div> -->
                      <!-- </template> -->
                    </td>
                    <td style="text-align:center;vertical-align:middle">{{item.strLxName}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">报名信息</td>
            <td colspan="7" style="vertical-align:middle">
              <tr style="height: 32px;">
                <span style="text-align:center;line-height: 100%;vertical-align:middle">董事：</span>
                <span style="padding-left: 10px; vertical-align:middle">{{formData.lxDs}}</span>
              </tr>
              <tr style="height: 32px;">
                <span style="text-align:center;line-height: 100%;vertical-align:middle">监事：</span>
                <span style="padding-left: 10px;vertical-align:middle">{{formData.lxJs}}</span>
              </tr>
              <tr>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  class="printTableList"
                  style="font-family: 宋体;font-size: 19px;width: 100%;"
                  id="print-table"
                >
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:middle">序号</td>
                      <td style="text-align:center;vertical-align:middle">议题名称</td>
                      <td style="text-align:center;vertical-align:middle">部门</td>
                      <td style="text-align:center;vertical-align:middle">姓名</td>
                      <td style="text-align:center;vertical-align:middle">是否为部门主要负责人</td>
                      <td style="text-align:center;vertical-align:middle">部门主要负责人请假缘由</td>
                      <td style="text-align:center;vertical-align:middle">手机号码</td>
                    </tr>
                    <tr v-for="item in bmTableData">
                      <td style="text-align:center;vertical-align:middle">{{item.ytOrderNum}}</td>
                      <td style="text-align:center;vertical-align:middle">{{item.lxDeptName}}</td>
                      <td style="text-align:center;vertical-align:middle">{{item.ytName}}</td>
                      <td style="text-align:center;vertical-align:middle">{{item.chName}}</td>
                      <td
                        style="text-align:center;vertical-align:middle"
                      >{{item.isPersonInCharge === '2' ? "否" : item.isPersonInCharge === '1' ? "是" : ""}}</td>
                      <td style="text-align:center;vertical-align:middle">{{item.leaveReason}}</td>
                      <td style="text-align:center;vertical-align:middle">{{item.chCellPhone}}</td>
                    </tr>
                  </tbody>
                </table>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  name: "registerDetail",
  components: {},
  props: {},
  data() {
    return {
      printShow:true,
      id: "",
      tzId: "",
      tableData: [],
      formData: {},
      opinionFldData: [],
      attchmentFileInfo: [],
      bmTableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      leaders: "",
      mange: "",
      bankList: [],
      bankListed: [],
      LDbankList: "",
      GGbankListed: ""
    };
  },
  computed: {},
  methods: {
    // 数据转换
    formatIsPersonInCharge(row) {
      return row.isPersonInCharge === "0"
        ? "否"
        : row.isPersonInCharge === "1"
        ? "是"
        : "";
    },
    printThis() {
      this.printShow=false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
      // document.execCommand("print");
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    // 行领导出席列表
    attendance() {
      this.$api.secreatary.meetings
        .AttendanceList({
          tzId: this.id,
          managerFlag: 1
        })
        .then(res => {
          let ldNameary = [];
          res.data.map((item, index) => {
            ldNameary.push(item.ldName);
          });
          this.leaders = ldNameary.join(",");
        });
    },
    // 行高管出席列表
    Ldattendance() {
      this.$api.secreatary.meetings
        .AttendanceList({
          tzId: this.id,
          managerFlag: 0
        })
        .then(res => {
          let GgNamearray = [];
          res.data.map((item, index) => {
            GgNamearray.push(item.ldName);
          });
          this.mange = GgNamearray.join(",");
        });
    },
    //缺席列表
    attendanced() {
      this.$api.secreatary.meetings
        .AbsenceList({
          tzId: this.id,
          managerFlag: 1
        })
        .then(res => {
          this.bankList = [];
          res.data.map(item => {
            this.bankList.push({
              ldName: item.ldName,
              ldId: item.ldId,
              LdqxReason: item.qxReason,
              LDid: item.id,
              checked: false
            });
          });
          let LDarray = [];
          this.bankList.map(item => {
            LDarray.push(item.ldName);
          });
          this.LDbankList = LDarray.join(",");
          this.$forceUpdate();
        });
      this.$api.secreatary.meetings
        .AbsenceList({
          tzId: this.id,
          managerFlag: 0
        })
        .then(res => {
          this.bankListed = [];
          res.data.map(item => {
            this.bankListed.push({
              GgName: item.ldName,
              ldId: item.ldId,
              GgqxReason: item.qxReason,
              GGid: item.id,
              checked: false
            });
          });
          let GGarray = [];
          this.bankListed.map(item => {
            GGarray.push(item.GgName);
          });
          this.GGbankListed = GGarray.join(",");
          this.$forceUpdate();
        });
    },
    // 加载详情
    loadData() {
      this.$api.secreatary.meetings
        .getMainDetail({
          id: this.id
        })
        .then(res => {
          this.formData = res.data;
          console.log(res.data);
          let s = res.data.hyTimeStr.substring(
            0,
            res.data.hyTimeStr.indexOf(" ")
          );
          let t = res.data.hyTimeStr.substring(14, res.data.hyTimeStr.length);

          this.formData.hyTimeStr = s + t;
          console.log(this.formData.hyTimeStr);
        });
    },
    getFileList() {
      this.opinionFldData.forEach((item, index) => {
        this.$api.setSysConfig.getTextemList({ id: item.id }).then(res => {
          this.$nextTick(() => {
            console.log(res.data, "res.data");
            this.attchmentFileInfo = res.data;
            this.opinionFldData.forEach((item, index) => {
              if (this.attchmentFileInfo.length > 0) {
                if (item.id == this.attchmentFileInfo[0].dataId) {
                  item.attchmentFileInfo = this.attchmentFileInfo;
                }
              }
            });
            this.$forceUpdate();
          });
        });
      });
    },
    // 请求信息表格
    getHyTable() {
      // this.id = sessionStorage.getItem("zbId");
      this.$api.secreatary.meetings
        .hyTable(
          {
            tzId: this.id
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.opinionFldData = res.data;
          console.log("this.opinionFldData", this.opinionFldData);
          this.getFileList();
        });
    },
    // 获取报名信息
    bmTable() {
      this.$api.secreatary.meetings
        .getBmTable({
          tzId: this.id
        })
        .then(res => {
          this.bmTableData = res.data;
        });
    }
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.loadData();
    this.getHyTable();
    this.bmTable();
    this.attendance();
    this.Ldattendance();
    this.attendanced();
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
  padding: 3.3cm 2.7cm;
  background-color: white;
}
.printTableList {
  // width: 94%;
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
  font-size: 30px;
  font-weight: bold;
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
</style>
