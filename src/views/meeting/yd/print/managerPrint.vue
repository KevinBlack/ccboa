<template>
  <div class="tablePrint tableForPrint">
    <el-row class="btnstyle">
      <el-button @click="printThis()" v-show="printShow" type="info" plain>打印</el-button>
      <el-button @click="closeWindow()" type="info" plain>关闭</el-button>
    </el-row>
    <el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        >
        <thead>
        <tr>
          <th style="width: 15%">使用时间</th>
          <th style="width: 10%">会议室名称</th>
          <th style="width: 10%">会议类型</th>
          <th style="width: 10%">主办部门</th>
          <th style="width: 10%">申请人</th>
          <th style="width: 10%">联系电话</th>
          <th style="width: 35%">参会领导</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData" :key="index">
          <td>{{ item.meetUseDate }}</td>
          <td>{{ item.roomName }}</td>
          <td>{{ item.meetType }}</td>
          <td>{{ item.hostDepartment }}</td>
          <td>{{ item.orderUserName }}</td>
          <td>{{ item.orderUserPhon }}</td>
          <td>{{ item.attendUsers }}</td>
        </tr>
        </tbody>
      </table>
    </el-row>
  </div>
</template>

<script>
import computedNodeHeight from "@/minixs/computedNodeHeight";
export default {
  name: "managerPrint",
  data() {
    return {
      tableData: [],
      printShow:true,
    }
  },
  mixins: [computedNodeHeight],
  methods: {
    printThis() {
      this.printShow=false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },
    afterPrint() {
      this.printShow = true;
    },
    closeWindow(){
      window.close();
    }
  },
  created() {
    if (window.matchMedia) {
      let MediaQueryList = window.matchMedia("print");
      MediaQueryList.addListener(mql => {
        if (!mql.matches) {
          this.afterPrint();
        }
      });
    }
    this.tableData = JSON.parse(sessionStorage.getItem("managerPrintData"));
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.tablePrint {
  width: 900px;
  min-height: 100%;
  margin: 0 auto;
  background-color: white;
  .btnstyle{
    margin-left: 3%;
  }
}

.printTableList {
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  tr {
    height: 32px;
    td,th {
      vertical-align: middle;
      text-align: center;
      min-width:100px;
      word-break: break-all;
    }
  }
}
td,th {
  border: solid #000 1px;
}

.align_r {
  text-align: right;
}

@media print {
  .btnstyle {
    display: none;
  }
}

</style>
