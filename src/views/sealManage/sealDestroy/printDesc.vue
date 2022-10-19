<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row>
        <h1 style class="title-h1">{{form.draftOrgan}}印章销毁审批单</h1>
        <el-button class="printButton" @click="printThis()" type="info" plain v-if="show">打印</el-button>
        <!-- <el-button class="printButton1" @click="backDarft()" type="info" plain>返回</el-button> -->
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:middle">编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;min-width:150px"
            >{{form.documentNo}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle;min-width:120px;">申请日期</td>
            <td
              colspan="4"
              style="min-width:200px;text-align:center;vertical-align:middle"
            >{{form.cdate}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle;min-width:150px;">申请单位</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;min-width:150px;"
            >{{form.draftDepartment}}</td>
            <td style="text-align:center;vertical-align:middle;min-width:100px;">申请人</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;min-width:150px;"
            >{{form.creator}}</td>
            <td style="text-align:center;vertical-align:middle;min-width:150px;">联系电话</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;width:80px"
            >{{form.tel}}</td>
          </tr>
          <tr>
            <td style="text-align:center;vertical-align:middle">印章销毁名称</td>
            <td
              colspan="10"
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{form.sealName}}</td>
          </tr>
          <tr>
            <td style="text-align:center;vertical-align:middle">销毁原因</td>
            <td
              colspan="10"
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{form.destoryCause}}</td>
          </tr>
          <tr style="height: 200px;">
            <td style="width：20%;text-align:center;vertical-align:middle">档案部门鉴定意见</td>
            <td colspan="10" v-if="form.qpYjs.length">
              <div class="qianF" v-for="(item,index) in form.qpYjs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">{{form.qpYj}}</td>
          </tr>
          <tr style="height: 200px;">
            <td style="width：20%;text-align:center;vertical-align:middle">公示情况</td>
            <td colspan="10" v-if="form.shYjs.length">
              <div class="qianF" v-for="(item,index) in form.shYjs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">{{form.shYj}}</td>
          </tr>
          <tr style="height: 200px;">
            <td style="width：20%;text-align:center;vertical-align:middle">办公室领导审签</td>
            <td colspan="10" v-if="form.offShYjs.length">
              <div class="qianF" v-for="(item,index) in form.offShYjs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">{{form.offShYj}}</td>
          </tr>
          <tr>
            <td style="text-align:center;vertical-align:middle">销毁日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle;min-width:150px"
            >{{form.destoryDate}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle;min-width:120px;">销毁地点</td>
            <td
              colspan="4"
              style="min-width:200px;text-align:center;vertical-align:middle"
            >{{form.destoryPlace}}</td>
          </tr>
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">销毁人</td>
            <td colspan="10" v-if="form.yxhs.length">
              <div class="qianF" v-for="(item,index) in form.yxhs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">{{form.yxh}}</td>
          </tr>
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">监销人</td>
            <td colspan="10" v-if="form.yjxs.length">
              <div class="qianF" v-for="(item,index) in form.yjxs" :key="index">
                <div class="p2">
                  <span class="Span">{{ item.nr }}</span>
                  <div class="date" style="matgin-top:10px;">{{ item.lk }}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">{{form.yjx}}</td>
          </tr>
          <tr style="height: 200px;">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>

            <td colspan="10" v-if="form.remarks.length">
              <div class="beiZh" v-for="(item,index) in form.remarks" :key="index">
                <div class="name">
                  <span class="Span">{{item.nr}}</span>
                  <div>{{item.lk}}</div>
                  <div>{{item.ct}}</div>
                </div>
              </div>
            </td>
            <td colspan="10" v-else style="text-align:center;vertical-align:middle">
              <div class="beiZh">
                <div class="name">
                  <span class="Span">{{form.remark}}</span>
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
  data() {
    return {
      id: "",
      isKh: "",
      tableTitle: "",
      form: {
        draftOrgan: "",
        currentUserId: "", // 当前环节应当的操作人ID
        currentUser: "", // 当前环节应当的操作人Nm
        currentNodeId: "", // 当前环节ID
        currentNode: "起草", //当前环节
        draftDepartment: "", // 申请单位
        draftDepartmentId: "", //申请单位Id
        cdate: formatData(new Date().getTime(), "YYYY-MM-DD"), // 申请日期
        creator: "", //申请人
        creatorId: "", //申请人Id
        documentNo: "", // 编号
        sealName: "", // 印章销毁名称
        remark: "", //备注
        tel: "", //联系电话
        destoryDate: "", // 销毁日期
        destoryPlace: "", // 印章销毁地点
        destoryPer: "", //印章销毁人
        yxh: "", //销毁人
        jxrV: "", //印章监销人
        yjx: "", // 监销人
        qpYj: "", //档案部门鉴定意见
        shYj: "", //公示情况
        offShYj: "", // 办公室领导审签
        remark: "", //备注
        jxrV: "", //印章监销人
        qpYjs: [], //档案部门鉴定意见
        shYjs: [], //公示情况
        offShYjs: [], // 办公室领导审签
        remarks: [] //备注
      },
      YRcheck: "",
      beizhu: [],
      retrialIdeas: [],
      fzBjs: [],
      texts: "",
      show: true,
      jyYj2s: [],
      reasons: [], //用印事由
      flBjs: [], //法律审查意见
      upLdBjs: [], //上级有权审批人审批
      ldBjs: [], //有权审批人审批
      jyYjs: [], //监印人审核
      yyBgrs: [], //印章保管人
      thIdeas: [], //印章保管人
      shjiIdeas: [] //上级行业务部门数据'
    };
  },
  methods: {
    backDarft() {
      this.$intent.closeWindow(this);
    },
    printThis() {
      this.show = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 1000);
    },
    loadData() {
      // 详情接口
      if (this.$route.query.id) {
        this.$api.sealManage.sealDestroy
          .destroyForm({ id: this.$route.query.id })
          .then(res => {
            console.log(res, "xiangiqng");
            this.form = res.data;
          });
      } else {
        this.$message({
          type: "warning",
          message: "您还没有保存任何数据,确定打印?"
        });
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.piece {
  overflow: hidden;
}
.Span {
  text-align: left;
  width: 100%;
  display: block;
  padding: 10px;
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
    // float: right;
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
  word-wrap: break-word;
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
.printButton1 {
  position: absolute !important;
  top: 1% !important;
  left: 10% !important;
  right: 1% !important;
}
/deep/.el-table td,
.el-table th .is-leaf {
  border-left: 1px solid #000 !important;
}
/deep/.is-center {
  border-bottom: 1px solid #000 !important;
}
</style>
