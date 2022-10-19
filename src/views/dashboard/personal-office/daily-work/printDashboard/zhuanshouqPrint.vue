<template>
  <div class="tablePrint">
    <!-- 	非跨行签报
    1.	电子签报处理单
    2.	电子签报办结单-->
    <div ref="dyclPrint" class="dyclPrint">
      <el-row>
        <h1 style class="title-h1">中国建设银行临时转授权登记单</h1>
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
            <td style="text-align: center;width:90px; line-height:25px;">授权人</td>
            <td
              id="authUserName"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
              colspan="2"
            >{{fromdata.authUserName}}</td>
            <td style=" text-align: center;width:110px; line-height:25px;">授权部门</td>
            <td
              id="authDeptNameNew"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
              colspan="3"
            >{{fromdata.authDeptNameNew}}</td>
            
          </tr>
          <tr>
            <td style="text-align: center;width:90px; line-height:25px;">被授权人</td>
            <td
              id="beAuthUserName"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
              colspan="2"
            >{{fromdata.beAuthUserName}}</td>
            <td style=" text-align: center;width:110px; line-height:25px;">被授权部门</td>
            <td
              id="beAuthUserName"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
              colspan="3"
            >{{fromdata.beAuthDeptName}}</td>
            
          </tr>
          <tr>
            <td style=" text-align: center;width:110px; line-height:25px;">授权开始日期</td>
            <td
              id="authStartTime"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.authStartTime}}</td>
            <td style="text-align: center;width:90px; line-height:25px;">授权结束时间</td>
            <td
              id="authEndTime"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.authEndTime}}</td>
            <td style="text-align: center;width:90px; line-height:25px;">中止时间</td>
            <td
              id="supspensionTime"
              colspan="2"
              style="padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.supspensionTime}}</td>
          </tr>
          <tr class="print_zr">
            <td style="text-align: center;width:90px; line-height:25px;">授权原因</td>
            <td
              id="authReason"
              colspan="6"
              style="padding: 5px; line-height:25px;word-break: break-all;white-space: pre-line;"
            >{{fromdata.authReason}}</td>
          </tr>
          <tr class="print_zr">
            <td style="text-align: center;width:90px; line-height:25px;">备&nbsp;&nbsp;注</td>
            <td
              id="authReason"
              colspan="6"
              style="padding: 5px; line-height:25px;word-break: break-all;white-space: pre-line;"
            >{{fromdata.remarks}}
            </td>
          </tr>
          <tr>
            <td style=" text-align: center;width:110px; line-height:25px;">登记人</td>
            <td
              id="draftUserName"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.draftUserName}}</td>
            <td style=" text-align: center;width:110px; line-height:25px;">登记部门</td>
            <td
              id="draftDeptName"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
            >{{fromdata.draftDeptName}}</td>
            <td style="text-align: center;width:90px; line-height:25px;">登记日期</td>
            <td
              id="draftTime"
              style=" padding: 5px; line-height:25px;word-break: break-all;"
              colspan="2"
            >{{fromdata.draftTime}}</td>
          </tr>
          <tr class="print_zr">
            <td style="text-align: center;width:90px; line-height:25px;">授权模块</td>
            <td
              id="authReason"
              colspan="6"
              style="padding: 5px; line-height:25px;word-break: break-all;white-space: pre-line;"
            >
            {{fromdata.moduleWordNameList}}
            </td>
          </tr>
          <tr class="print_zr">
            <td style="text-align: center;width:90px; line-height:25px;">发送人</td>
            <td
              id="senRn"
              colspan="6"
              style="padding: 5px; line-height:25px;word-break: break-all;white-space: pre-line;"
            >
            {{fromdata.senRn}}
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
      //input框内容
      bank_dispach: {
        function: "selectById",
        id: ""
      },
      printShow: true,
      fromdata: {
        authDeptNameNew:"",
        authDeptNameNewId:"",
        beAuthDeptName:"",
        beAuthDeptId:"",
        id: "",
        attachSort: [],
        authStatusName: "",
        multiTenancyId: "",
        authModule:"",
        draftUserId:"",
        draftUserName:"",
        draftDeptId:"",
        draftDeptName:"",
        authUserId:"",
        authUserName:"",
        beAuthUserId:"",
        beAuthUserName:"",
        authDeptId:"",//Sqbm
        authDeptName:"",
        beAuthDeptId: "",//bSHOUQUAN
        draftTime: "",
        authStartTime: "",
        authEndTime: "",
        authReason: "",
        authStatus: "",
        remarks: "",
        supspensionTime: "",
        senRn:"",
        authDeptNameNew:"",
        moduleWordNameList:""
      }
    };
  },
  methods: {
    beforePrint() {
    },
    afterPrint() {
      this.printShow = true;
    },
    printThis() {
      this.printShow = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    }
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
    this.$post
      .postData(
        "selectById",
        JSON.stringify(this.bank_dispach),
        this.$businessCode.sqgl
      )
      .then(res => {
        this.fromdata = res.data;
        this.fromdata.senRn = res && res.data && res.data.sendRenYuan && res.data.sendRenYuan.toString() || "";
        this.fromdata.authDeptNameNew = res && res.data && res.data.authDeptName || [];
        this.fromdata.authDeptNameNewId = res && res.data && res.data.authDeptNameNewId || [];
        this.fromdata.moduleWordNameList = res && res.data && res.data.moduleWordNameList || [];
        let str = [];
        let arr = [];
        this.fromdata.moduleWordNameList = this.fromdata.moduleWordNameList.map(i=>{
           str.push(i.moduleName);
        })
        this.fromdata.moduleWordNameList = str.toString();
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