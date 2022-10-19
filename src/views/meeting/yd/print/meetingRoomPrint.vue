<template>
  <div class="tablePrint tableForPrint">
    <el-row>
      <el-button class="printButton" v-show="printShow" @click="printThis()" type="info" plain>打印</el-button>
      <h1 style class="title-h1">中国建设银行会议保障需求单</h1>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table">
      <tbody>
        <tr>
          <td class="tl">会议名称</td>
          <td colspan="3" class="tr">{{formData.meetingName}}</td>
          <td class="tl">会议类型</td>
          <td class="tr">{{formData.meetType}}</td>
        </tr>
        <tr>
          <td class="tl">使用日期</td>
          <td class="tr">{{formData.meetUseDate}}</td>
          <td class="tl">开始时间</td>
          <td class="tr">{{formData.meetStartTime}}</td>
          <td class="tl">结束时间</td>
          <td class="tr">{{formData.meetEndTime}}</td>
        </tr>
        <tr>
          <td class="tl">会议室名称</td>
          <td class="tr">{{formData.roomName}}</td>
          <td class="tl" v-if="formData.layoutType=='1'">座位数</td>
          <td colspan="3" class="tr" v-if="formData.layoutType=='1'">{{formData.roomSeat}}</td>
          <td class="tl" v-if="formData.layoutType=='2'">主席座位数</td>
          <td class="tr" v-if="formData.layoutType=='2'">{{formData.hostSeat}}</td>
          <td class="tl" v-if="formData.layoutType=='2'">观众席座位数</td>
          <td class="tr" v-if="formData.layoutType=='2'">{{formData.rows+'行'+formData.cols+'列'}}</td>
        </tr>
        <tr>
          <td class="tl">参会人数</td>
          <td class="tr">{{formData.attendNums}}</td>
          <td class="tl">保障人数</td>
          <td class="tr">{{formData.guaranteeNums}}</td>
          <td class="tl">会议室位置</td>
          <td class="tr">{{formData.roomAddres}}</td>
        </tr>
        <tr>
          <td class="tl">主办部门</td>
          <td class="tr">{{formData.hostDepartment}}</td>
          <td class="tl">联系人</td>
          <td class="tr">{{formData.orderUserName}}</td>
          <td class="tl">联系人电话</td>
          <td class="tr">{{formData.orderUserPhon}}</td>
        </tr>
        <tr>
          <td class="tl">可提供服务</td>
          <td colspan="5" class="tr" v-if="formData.needServices && formData.needServices.length">{{formData.needServices}}</td>
          <td colspan="5" class="tr" v-else>无提供服务</td>
        </tr>
        <tr>
          <td class="tl">用&emsp;&emsp;途</td>
          <td colspan="5" class="tr">{{formData.useFor}}</td>
        </tr>
        <tr>
          <td class="tl">备&emsp;&emsp;注</td>
          <td colspan="5" class="tr">
            <div v-for="item in formData.bz" :key="item.id">
              <div v-if="item.status">
                <span class="adviceInfo pad_yj10">{{ item.content }}</span>
                <div class="align_r">{{item.departmentName}} {{item.userName}}</div>
                <div class="align_r">{{item.createTime}}</div>
                <!-- <span class="adviceInfo pad_yj10" style="white-space:pre-wrap;">({{ item.departmentName }}</span>
                <span class="adviceInfo pad_yj10">{{ item.userName }}</span>
                <span class="adviceInfo pad_yj10">{{ item.createTime }})</span> -->
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
  name: "meetingRoomPrint",
  data() {
    return {
      printShow:true,
      formData: {
        meetingName:'',
        meetUseDate:'',
        meetStartTime:'',
        meetEndTime:'',
        meetType:'',
        roomSeat:'',
        layoutType:'1',
        attendNums:'',
        guaranteeNums:'',
        roomAddres:'',
        hostDepartment:'',
        orderUserName:'',
        orderUserPhon:'',
        needServices:'',
        useFor:'',
        meetRemark:'',
      },
    };
  },
  mixins: [computedNodeHeight],
  methods: {
    printThis() {
      this.printShow=false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },

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
   this.formData=JSON.parse(this.$route.query.pageData)
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.tl{
  text-align: center;
  width:120px;
  line-height:25px;
}
.tr{
  padding: 5px;
  line-height:25px;
  word-break: break-all;
  text-align: left;
}
.tablePrint {
  width: 900px;
  min-height: 100%;
  margin: 0 auto;
  background-color: white;
}
.printTableList {
  width: 94%;
  margin: 0 auto;
  tr {
    height: 32px;
    td {
      vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 50px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.printButton {
  position: absolute;
  top: 60%;
  right: 3%;
}
td {
  border: solid #000 1px;
}
.align_r{
  text-align: right;
}
@media print {
  .printButton {
    display: none;
  }
}

</style>
