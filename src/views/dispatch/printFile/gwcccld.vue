<template>
  <!-- 一、	发文管理：
  1.	电子发文处理单-->

  <div class="tablePrint">
    <el-row>
      <h1 style class="title-h1">{{ draftOrganTitle }}</h1>
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
          <td style="text-align: center">规章或规范性文件</td>
          <td id="attachTitle" colspan="4" style="padding-left: 10px;text-align: left;">{{fromdata.isNormative}}</td>
        </tr>
        <tr>
          <td style="text-align: center">拟稿部门</td>
          <td id="draftUser" style="padding-left: 10px;">{{fromdata.draftDepartment}}</td>
          <td style="width: 11%; text-align: center">拟稿日期</td>
          <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.draftTime}}</td>
        </tr>
        <tr>
          <td style="width: 11%; text-align: center">拟稿人</td>
          <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.draftUser}}</td>
          <td style="text-align: center">联系电话</td>
          <td id="draftUser" style="padding-left: 10px;">{{fromdata.phone}}</td>
        </tr>
        <tr>
          <td style="width: 11%; text-align: center">业务分类</td>
          <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.serviceType}}</td>
          <td style="text-align: center">文种</td>
          <td id="draftUser" style="padding-left: 10px;">{{fromdata.contentType}}</td>
        </tr>
        <tr>
          <td style="width: 11%; text-align: center">提交人</td>
          <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.cnkiCreator}}</td>
          <td style="text-align: center">报告时间</td>
          <td id="draftUser" style="padding-left: 10px;">{{fromdata.cnkiEndTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center">查重结果</td>
          <td id="title" colspan="4" style="text-align:left;padding-left:10px;line-height:25px;word-break: break-all;white-space: pre-line;">
            <!-- <el-row class="row" v-for="(item,index) in ccjgData" :key="index">
              <el-col :span="24">
                <el-form-item :label="(index+1)+' 标题：'" prop="title" class="row_span">
                  <el-button type="text" @click="drafting('0', item.result[0])" :id="item.result[0].file_id">{{item.result[0].file_title}}</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="文号：" prop="title" class="row_span">
                  <span>无</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="相似度：" prop="title" class="row_span">
                  <span>{{Math.ceil((item.result[0].segment)*100)}}%</span>
                  <el-button type="text" @click="drafting('0')" :id="item.result[0].file_id"> <span style="margin-left:15px">[查看正文详情]</span></el-button>
                </el-form-item>
              </el-col>
            </el-row> -->
            {{fromdata.cnkiResultNumber}}
          </td>
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
      printShow: true,
      draftOrganTitle: "",
      fromdata: {
        draftDepartment: "", //拟稿部门
        draftTime: "", //拟稿日期
        draftUser: "", //拟稿人
        phone: "", //联系电话

        documentTitle: "", //标题关键字
        isNormative: "", //规章或规范性文件

        serviceType: "", //业务分类
        contentType: "", //文种
        cnkiCreator: "", //提交人
        cnkiEndTime: "" //报告时间
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
    //initData
    initData() {
      let that = this;
      let receiveselect = {
        function: "getCnki",
        id: this.$route.query.id,
        choseYear: this.$route.query.choseYear||"",
        unitId: this.unitId
      };
      this.$post
        .postData(
          "getCnki",
          JSON.stringify(receiveselect),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res)
          that.fromdata = res.data;
          that.draftOrganTitle = this.$route.query.title;
          this.fromdata.draftDepartment = this.$route.query.draftDepartment; //拟稿部门
          this.fromdata.draftTime = this.$route.query.draftTime; //拟稿日期
          this.fromdata.draftUser = this.$route.query.draftUser; //拟稿人
          this.fromdata.phone = this.$route.query.phone; //联系电话
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
  min-height: 600px;
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