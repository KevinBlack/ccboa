<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <el-button @click="closeThis" type="info" plain>关闭</el-button>
        </el-col>
        <h1 style class="title-h1">中国建设银行行长办公会议正式通知</h1>
        <!-- <el-button class="printButton" @click="printThis()" type="info" plain>打印</el-button>
        <el-button class="printButton" @click="closeThis" type="info" plain>关闭</el-button>-->
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
            <td colspan="5" style="padding-left: 10px;vertical-align:middle">{{formData.hyName}}</td>
          </tr>
          <tr style="height: 50px;">
            <td style="text-align:center;vertical-align:middle">会议时间</td>
            <td style="padding-left: 10px;vertical-align:middle">{{formData.hyTime}}</td>
            <td style="text-align:center;vertical-align:middle">会议地点</td>
            <td style="padding-left: 10px;vertical-align:middle">{{formData.hyAdress}}</td>
            <td style="text-align:center;vertical-align:middle">会议候场地点</td>
            <td style="padding-left: 10px;vertical-align:middle">{{formData.hyHcdd}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">主持人</td>
            <td colspan="5" style="padding-left: 10px;vertical-align:middle">{{formData.zcName}}</td>
          </tr>
          <tr>
            <td style="text-align:center;vertical-align:middle">会议内容</td>
            <td colspan="5">
              <table
                cellspacing="0"
                cellpadding="0"
                class="printTableList"
                style="font-family: 宋体;font-size: 19px;"
                id="print-table"
              >
                <tbody>
                  <tr>
                    <td style="text-align:center;vertical-align:middle">议题序号</td>
                    <td style="text-align:center;vertical-align:middle">列席部门</td>
                    <td style="text-align:center;vertical-align:middle">议题名称</td>
                    <td style="text-align:center;vertical-align:middle">会议材料</td>
                    <td style="text-align:center;vertical-align:middle">参会人员姓名</td>
                    <td style="text-align:center;vertical-align:middle">是否为部门主要负责人</td>
                    <td style="text-align:center;vertical-align:middle">部门主要负责人请假缘由</td>
                    <td style="text-align:center;vertical-align:middle">参会人员手机号码</td>
                  </tr>
                  <tr v-for="item in tableData">
                    <td style="text-align:center;vertical-align:middle">{{item.ytOrderNum}}</td>
                    <td style="text-align:center;vertical-align:middle">{{item.lxDeptName}}</td>
                    <td style="text-align:center;vertical-align:middle">{{item.ytName}}</td>
                    <td style="text-align:center;vertical-align:middle">
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
                    </td>
                    <td style="text-align:center;vertical-align:middle">{{item.chName}}</td>
                    <td
                      style="text-align:center;vertical-align:middle"
                    >{{item.isPersonInCharge === '2' ? "否" : item.isPersonInCharge === '1' ? "是" : ""}}</td>
                    <td style="text-align:center;vertical-align:middle">{{item.leaveReason}}</td>
                    <td style="text-align:center;vertical-align:middle">{{item.chCellPhone}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">议题序号</td>
            <td style="text-align:center;vertical-align:middle">列席部门</td>
            <td style="text-align:center;vertical-align:middle">议题名称</td>
            <td style="text-align:center;vertical-align:middle">会议材料</td>
            <td style="text-align:center;vertical-align:middle">参会人员姓名</td>
            <td style="text-align:center;vertical-align:middle">是否为部门主要负责人</td>
            <td style="text-align:center;vertical-align:middle">部门主要负责人请假缘由</td>
            <td style="text-align:center;vertical-align:middle">参会人员手机号码</td>
          </tr>
          <tr style="height: 32px;" v-for="item in tableData">
            <td style="text-align:center;vertical-align:middle">{{item.ytOrderNum}}</td>
            <td style="text-align:center;vertical-align:middle">{{item.lxDeptName}}</td>
            <td style="text-align:center;vertical-align:middle">{{item.ytName}}</td>
            <td style="text-align:center;vertical-align:middle">{{item.hyCl}}</td>
            <td style="text-align:center;vertical-align:middle">{{item.chName}}</td>
            <td
              style="text-align:center;vertical-align:middle"
            >{{item.isPersonInCharge === '0' ? "否" : item.isPersonInCharge === '1' ? "是" : ""}}</td>
            <td style="text-align:center;vertical-align:middle">{{item.leaveReason}}</td>
            <td style="text-align:center;vertical-align:middle">{{item.chCellPhone}}</td>
          </tr>
        </tbody>
      </table>-->
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
      id: "",
      tzId: "",
      tableData: [],
      formData: {}
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
      document.execCommand("print");
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    // getFileList () {
    //   this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
    //     this.formData.attchmentFileInfo = res.data
    //     this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
    //   })
    // },
    // //附件块
    // fileList(files) {
    // if (this.formData.attchmentFileInfo && this.formData.attchmentFileInfo.length) {
    //     this.formData.attchmentFileInfo.push(...files)
    //   } else {
    //     this.formData.attchmentFileInfo = files
    //   }
    //   if (!this.formData.attachs) {
    //     this.formData.attachs = [];
    //   }
    //   files.forEach(item => {
    //     this.formData.attachs.push(item.id)
    //   })
    //   this.formData.attachid = this.formData.attachs.join(',')
    //   this.$forceUpdate();
    // },
    // submitForm() {
    //     this.$refs["rForm"].validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    // 加载详情
    loadData() {
      this.$api.secreatary.meetings
        .getZsDetail({ id: this.id })
        .then(res => {
          this.formData = res.data;
          console.log("---------------------res.data", this.formData);
          this.formData.hyTime = formatData(
            res.data.hyTime,
            "YYYY-MM-DD HH:mm:ss"
          );
          // let s = res.data.hyTimeStr.substring(
          //   0,
          //   res.data.hyTimeStr.indexOf(" ")
          // );
          // let t = res.data.hyTimeStr.substring(14, res.data.hyTimeStr.length);

          // this.formData.hyTimeStr = s + t;
          this.tzId = res.data.tzId;
        })
        .then(() => {
          this.getBmTable();
        });
    },
    getFileList() {
      this.tableData.forEach((item, index) => {
        this.$api.setSysConfig.getTextemList({ id: item.ytId }).then(res => {
          this.$nextTick(() => {
            this.attchmentFileInfo = res.data;
            this.tableData.forEach((item, index) => {
              if (this.attchmentFileInfo.length > 0) {
                if (item.ytId == this.attchmentFileInfo[0].dataId) {
                  item.attchmentFileInfo = this.attchmentFileInfo;
                }
              }
              this.tableData.splice(index, 1, item);
            });
            this.$forceUpdate();
          });
        });
      });
    },
    // 请求报名信息表格
    getBmTable() {
      this.$api.secreatary.meetings
        .BmgetBmTable({ tzId: this.tzId })
        .then(res => {
          this.tableData = res.data;
          this.getFileList();
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
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
.printButton {
  position: absolute;
  right: 28%;
  z-index: 10;
  top: 6%;
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
// .printButton {
//   position: absolute !important;
//   top: 1% !important;
//   /*left: 3% !important;*/
//   right: 1% !important;
// }
@media print {
  @page {
    margin: 15px 0 0;
  }
  .printHtml {
    padding-top: 0!important;
    padding-bottom: 0!important;
  }
  tr {
    break-inside: avoid;
  }
  .breakBefore {
    break-before: always;
    td {
      border-top: 1px solid #000;
    }
  }
  .print-margin {
    // margin-top: 3.3cm;
  }
  .el-button--info.is-plain {
    display: none;
  }
}
</style>
