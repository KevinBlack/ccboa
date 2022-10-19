<template>
  <div class="tablePrint tableForPrint">
    <!--1)	收文协办单-->
    <el-row>
      <h1 style class="title-h1">{{ fromdata.documentTitle }}</h1>
      <el-button v-show="printShow" class="printButton" @click="printThis()" type="info" plain>打印</el-button>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
    <!-- <thead style="border:none">
          <th style="border:none" colspan="7" class="th224">
          <p></p>
          </th>
      </thead> -->
      <tbody>
      <tr>
        <td style="text-align: center;">收件日期:</td>
        <td style="padding-left: 10px;">{{ fromdata.receiveTime }}</td>
        <td style="text-align: center;">来件渠道:</td>
        <td style="padding-left: 10px;">{{ fromdata.fromType }}</td>
        <td style="text-align: center;">登记人:</td>
        <td style="padding-left: 10px;">{{ fromdata.recorder }}</td>
      </tr>
      <tr>
        <td style="text-align: center;">收件类型</td>
        <td style="padding-left: 10px;">{{ fromdata.fileTypeForXd }}</td>
        <td style="text-align: center;">密级</td>
        <td style="padding-left: 10px;">{{ fromdata.security }}</td>
        <td style="text-align: center;">缓急</td>
        <td style="padding-left: 10px;">{{ fromdata.emergencyName }}</td>
      </tr>
      <tr>
        <td style="text-align: center;">收件编号</td>
        <td style="padding-left: 10px;">{{ fromdata.fileCode }}</td>
        <td style="text-align: center;">来件单位</td>
        <td style="padding-left: 10px;">{{ fromdata.sendOrgName }}</td>
        <td style="text-align: center;">数量</td>
        <td style="padding-left: 10px;">{{ fromdata.count }}</td>
      </tr>

      <tr>
        <td style="text-align: center;">承办部门</td>
        <td colspan="5" style="padding-left: 10px;">{{ fromdata.undertakeDeptName }}</td>
      </tr>
      <tr class="print_zr">
        <td style="text-align: center">备 注</td>
        <td id="send_send" colspan="5" style="padding-left: 10px;">
          <div v-for="item in fromdata.remarksList" :key="item.id">
            <div v-if="item.status" class="d_flex">
              <el-row class="d_b100">
                <el-col class="pad_yj10 pad_yj11">
                  {{ item.content }}
                  <span class="adviceInfo pad_yj10">({{ item.departmentName }}</span>
                  <span class="adviceInfo pad_yj10">{{ item.userName }}</span>
                  <span class="adviceInfo pad_yj10">{{ item.createTime }})</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import Vue from "vue";
import computedNodeHeight from "@/minixs/computedNodeHeight";
export default {
  data() {
    return {
      //input框内容
      printShow: true,
      fromdata: {}
    };
  },
  mixins:[computedNodeHeight],
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
    this.$post
      .postData(
        "selectXDHJInfoById",
        JSON.stringify({
          function: "selectXDHJInfoById",
          id: this.$route.query.id
        }),
        this.$businessCode.swgl
      )
      .then(res => {
        this.fromdata = res.data;
        this.fromdata.sendDeptId = JSON.parse(res.data.sendDeptId);
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
      width: 12%;
      // text-align: center;
      vertical-align: middle;
    }
  }
}

.title-h1 {
  font-family: 宋体;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
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
.pad_yj10 {
  white-space: pre-line;
  word-break: break-all;
}
</style>
