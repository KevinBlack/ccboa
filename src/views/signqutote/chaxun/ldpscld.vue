<template>
  <div class="tablePrint">
    <!--  非跨行签报
    1.	电子签报处理单
    2.	电子签报办结单-->
    <div ref="dyclPrint" class="dyclPrint">
      <el-row id="dyclPrintOne">
        <h1 style class="title-h1">中国建设银行领导批示登记表</h1>
        <!-- <h1 style class="title-h2"></h1> -->
        <el-button class="printButton" v-show="printShow" @click="printThis()" type="info" plain>打印</el-button>
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
            <td style="text-align: center;width:90px; line-height:25px;">文件标题</td>
            <td
              id="title"
              colspan="6"
              style="padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.title}}</td>
          </tr>
          <tr>
            <td style="text-align: center;width:90px; line-height:25px;">文&nbsp;&nbsp;号</td>
            <td
              id="documentNo"
              style="padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.documentNo}}</td>
            <td style="text-align: center;width:90px; line-height:25px;">文件类型</td>
            <td
              id="qianBaoTypeName"
              colspan="2"
              style=" padding: 5px; line-height:25px; word-break: break-all;"
            >{{fromdata.qianBaoTypeName}}</td>
            <td style=" text-align: center;width:110px; line-height:25px;">主办部门</td>
            <td
              id="draftDepartmentName"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.draftDepartmentName}}</td>
          </tr>
          <tr>
            <td style=" text-align: center;width:110px; line-height:25px;">联系人</td>
            <td
              id="draftUserName"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.draftUserName}}</td>
            <td style="text-align: center;width:90px; line-height:25px;">联系电话</td>
            <td
              id="phone"
              colspan="2"
              style="padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.phone}}</td>
            <td style="text-align: center;width:110px; line-height:25px;">成文日期</td>
            <td
              id="draftTime"
              style="padding: 5px; line-height:25px;word-break: break-all;"
              colspan="1"
            >{{fromdata.draftTime}}</td>
          </tr>
        <tr class="print_zr">
          <td style="text-align: center;width:90px; line-height:25px;">内&nbsp;&nbsp;容</td>
          <td colspan="6" id="opinionSign" style="padding: 5px; line-height:25px;">
            <div class="opinionTbody">
              <div v-for="(item) in fromdata.approvalOpinionList" :key="item">
                <div  class="d_flex">
                  <el-row class="d_b100">
                    <el-col
                      class="pos_r"
                    >
                      <div class="lineContent">
                        <span class="pad_lr10">{{item.userName}}
                          {{item.createTime.slice(0,4)}}年{{item.createTime.slice(5,7)}}月{{item.createTime.slice(8,10)}}日在{{item.departmentName}}呈报的{{fromdata.title}}上批示：{{item.content}}</span>   
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center;width:90px; line-height:25px;">备&nbsp;&nbsp;注</td>
          <td colspan="6" id style="padding: 5px; line-height:25px;">
            <div v-for="item in fromdata.beizhu" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pos_r">
                    <p class="pad_yj10">{{item.content}}</p>
                    <div class="adviceInfo">
                      <p class="pad_yj10">{{item.departmentName}} <span>{{item.userName}}</span></p>
                      <p class="pad_yj10 pd_yj_useTime">
                        {{item.createTime}}
                      </p>
                    </div>
                  </el-col>
                </el-row>
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
import Vue from "vue";
import computedNodeHeight from "@/minixs/computedNodeHeight";
export default {
  mixins: [computedNodeHeight],
  data() {
    return {
      directTitle: "中国建设银行",
      //input框内容
      bank_dispach: {
          id: '',
          nodeCode:""
      },
      psFlag: false,
      oneHeight: "",
      printPsyjDiv: "",
      printPsyj: "",
      hldmsFlag: false, //行领导秘书
      printShow: true,
      newHeight: "",
      printPsyjStyle: "",
      OnedyclPrint: "",
      TwodyclPrint: "",
      fromdata: {
        function: "selectById",
        title: "",
        documentNo: "",
        draftDepartmentName: "",
        // 文件类型
        userName: "",
        // 联系电话
        createTime: "",
        content: "",
        // 备注
        beizhu:[]
      },
    };
  },
  mounted() {
  },
  methods: {
    beforePrint() {
      //this.printShow=false;
    },
    afterPrint() {
      this.printShow = true;
    },
    printThis() {
      this.printShow = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },
    selectById() {
      this.bank_dispach.id = this.$route.query.id;
      this.bank_dispach.nodeCode = this.$route.query.nodeCode;
      this.bank_dispach.function = "getLeaderPishiTableInfo";
      this.$post
        .postData(
          "getLeaderPishiTableInfo",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          // this.fromdata = res.data;
           this.fromdata = Object.assign(this.fromdata,res.data);
          
          // this.fromdata.approvalOpinionList= [{"content":"同验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题意","createTime":"2021-07-16 14:59:11","dataId":"5863531a-c4d4-45d7-891b-75cf93512f1f","departmentId":"10000000007","departmentName":"办公室  机要科","id":"8cc418c2-6040-47ea-8ae6-c35194ff1b9c","maxRows":0,"nodeCode":"800","start":0,"status":1,"type":"pishi_opinion","userId":"10000010","userName":"左元林"},
          // {"content":"同意","createTime":"2021-07-16 14:59:11","dataId":"5863531a-c4d4-45d7-891b-75cf93512f1f","departmentId":"10000000007","departmentName":"办公室  机要科","id":"8cc418c2-6040-47ea-8ae6-c35194ff1b9c","maxRows":0,"nodeCode":"800","start":0,"status":1,"type":"pishi_opinion","userId":"10000010","userName":"左元林"},{"content":"同意","createTime":"2021-07-16 14:59:11","dataId":"5863531a-c4d4-45d7-891b-75cf93512f1f","departmentId":"10000000007","departmentName":"办公室  机要科","id":"8cc418c2-6040-47ea-8ae6-c35194ff1b9c","maxRows":0,"nodeCode":"800","start":0,"status":1,"type":"pishi_opinion","userId":"10000010","userName":"左元林"}]
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },
  },
  created() {
    if (window.matchMedia) {
      let MediaQueryList = window.matchMedia("print");
      MediaQueryList.addListener(mql => {
        if (mql.matches) {
          this.beforePrint();
        } else {
          this.afterPrint();
        }
      });
    }
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    
    this.selectById()
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
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
      //text-align: center;
      vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 50px;
  width: 720px;
  margin: 0 auto;
}
.title-h2 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 50px;
  width: 720px;
  margin: 0 auto;
}
.printButton {
  position: absolute;
  top: 60%;
  right: 3%;
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
.tcont font {
  /* background-color:#F2CACB; */
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
.pad_10 {
  padding: 0 5px;
}
.pad_yj10 {
  white-space: pre-line;
  word-break: break-all;
}
</style>