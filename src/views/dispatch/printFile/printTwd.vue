<template>
  <!-- 一、	发文管理：
  1.	电子发文处理单-->

  <div class="tablePrint">
    <el-row>
      <h1 class="title-h1">{{ draftOrganTitle }}</h1>
      <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
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
          <td style="text-align: center">发文字号</td>
          <td id="title" colspan="3" style="padding-left: 10px;text-align: left;">{{fromdata.documentNo}}</td>
        </tr>
        <tr>
          <td style="text-align: center">秘密类型</td>
          <td id="attachTitle" style="text-align:left;padding-left:10px;">{{fromdata.secretType}}</td>
          <td style="text-align: center">成文日期</td>
          <td id="attachTitle" style="text-align:left;padding-left:10px;">{{fromdata.completeTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center">发文日期</td>
          <td id="attachTitle" style="text-align:left;padding-left:10px;">{{fromdata.sendTime}}</td>
          <td style="text-align: center">退文时间</td>
          <td id="draftUser" style="text-align:left;padding-left:10px;">{{fromdata.backTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center">正文标题</td>
          <td id="title" colspan="3" style="padding-left: 10px;text-align: left;">{{fromdata.title}}</td>
        </tr>
        <tr>
          <td style="text-align: center">附件标题</td>
          <td id="title" colspan="3" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.title}}</td>
        </tr>
        <tr>
          <td style="width: 11%; text-align: center">退文机构</td>
          <td id="documentNo" style="padding-left: 10px;">{{fromdata.backOrganization}}</td>
          <td style="text-align: center">退文人</td>
          <td id="draftUser" style="padding-left: 10px;">{{fromdata.backPeople}}</td>
        </tr>
        <tr>
          <td style="text-align: center">退文原因</td>
          <td id="title" colspan="3" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">{{fromdata.backReason}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import Vue from "vue";
import computedNodeHeight from "@/minixs/computedNodeHeight";
import printStyle from "@/minixs/printStyle";

export default {
  mixins:[computedNodeHeight,printStyle],
  data() {
    return {
      draftOrganTitle: "",
      huiqian: false, //是否会签
      banjie: false, //是否办结
      printShow: true,
      fromdata: {
        function: "",
        documentNo: "",
        secretType: "",
        completeTime: "",
        title: "",
        attachTitle: "",
        sendTime: "",
        backOrganization: "",
        backPeople: "",
        backTime: "",
        backReason: ""
      },
      unitId: ""
    };
  },
  methods: {
    async printThis() {
      this.printShow = false;
      await this.initPrintData();
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },
    beforePrint() {
      //this.printShow=false;
    },
    afterPrint() {
      this.printShow = true;
    },
    cuteData(data, name, type) {
      if (this.fromdata[name]) {
        this.fromdata[name].forEach(item => {
          if (!item.status) {
            this.fromdata[data] = item.content;
            this.fromdata[type] = item.id;
          }
        });
      }
    },
    concatAttrData(name, data) {
      this.fromdata[name] = this.fromdata[name]
        ? this.fromdata[name] + data
        : data;
    },
    //initData
    initData() {
      let that = this;
      let receiveselect = {
        function: "findByIdBackOrder",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear||"",
        unitId: this.unitId
      };
      this.$post
        .postData(
          "findByIdBackOrder",
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res)
          that.fromdata = res.data;
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "电子退文单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "电子退文单";
          }
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "请求失败",
          //   duration: 1000
          // });
        });
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
    this.unitId = this.$route.query.unitId||"";
    //initData
    this.initData();
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
      width: 12%;
      text-align: center;
      vertical-align: middle;
      
      
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
</style>