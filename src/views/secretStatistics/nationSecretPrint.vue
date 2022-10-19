<template>
  <div class="tablePrint">
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
          <th>文体产生类型</th>
          <th>发文日期</th>
          <th>签发日期</th>
          <th>发文字号</th>
          <th>密级</th>
          <th>标题</th>
          <th>拟稿部门</th>
          <th>拟稿人</th>
          <th>电话</th>
          <th>解密时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData" :key="index">
          <td>{{ item.sendType }}</td>
          <td>{{ item.sendTime }}</td>
          <td>{{ item.sendTime }}</td>
          <td>{{ item.documentNo }}</td>
          <td>{{ item.secretFlagType }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.draftDepartment }}</td>
          <td>{{ item.draftUser }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.decryptTime }}</td>
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
    this.tableData = JSON.parse(sessionStorage.getItem("nationSecretPrint"));
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.tablePrint {
  width: 1400px;
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
