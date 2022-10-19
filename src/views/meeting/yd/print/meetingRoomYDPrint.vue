<template>
  <div class="tablePrint tableForPrint">
    <el-row>
      <el-button class="printButton" v-show="printShow" @click="printThis()" type="info" plain>打印</el-button>
      <h1 style class="title-h1">{{pageTitle}}会议室预订单</h1>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table">
      <tbody>
        <tr>
          <td class="tl">使&nbsp;用&nbsp;日&nbsp;期</td>
          <td class="tr" colspan="1">{{formData.meetUseDate}}</td>
          <td class="tl">时&nbsp;间&nbsp;范&nbsp;围</td>
          <td class="tr" colspan="3">{{formData.meetStartTime+'-'+formData.meetEndTime}}</td>
        </tr>
        <tr>
          <td class="tl">会议类型</td>
          <td class="tr" colspan="5">{{formData.meetType}}</td>
        </tr>
        <tr>
          <td class="tl">会议室名称</td>
          <td class="tr" colspan="5">{{formData.roomName}}</td>
        </tr>
        <tr>
          <td class="tl">参&nbsp;会&nbsp;人&nbsp;数</td>
          <td class="tr" colspan="1">{{formData.attendNums}}</td>
          <td class="tl">会议室座位数</td>
          <td class="tr" colspan="3">{{formData.roomSeat}}</td>
        </tr>
        <tr>
          <td class="tl">是否涉密</td>
          <td class="tr" colspan="5">
            {{formData.isSecrete===0?"涉密":"非涉密"}}
            <span style="color: red;line-height: 1.0;" v-if="formData.isSecrete===0">(会议开始前，请提示参会人员将手机存放至会场外的手机存放柜中，并宣布会议保密纪律；会议进行中，请打开手机信号屏蔽器；全程妥善保管会议涉及的秘密文件（材料）；会议结束后，请对会场进行检查，避免秘密文件（材料）遗失；会议录音拷贝需经本部门主要负责人同意。)</span>
          </td>
        </tr>
        <tr>
          <td class="tl">所需服务</td>
          <td colspan="5" class="tr" v-if="formData.needServices && formData.needServices.length>0">{{formData.needServices}}</td>
          <td colspan="5" class="tr" v-else>无提供服务</td>
        </tr>
        <tr>
          <td class="tl">会议名称</td>
          <td colspan="5" class="tr">{{formData.meetingName}}</td>
        </tr>
        <tr>
          <td class="tl">主&nbsp;办&nbsp;部&nbsp;门</td>
          <td class="tr" style="width: 170px">{{formData.hostDepartment}}</td>
          <td class="tl">主持行领导</td>
          <td class="tr">{{formData.hostName}}</td>
        </tr>
        <tr>
          <td class="tl">参会行领导</td>
          <td colspan="5" class="tr">{{formData.attendUsers}}</td>
        </tr>
        <tr>
          <td class="tl">申请人</td>
          <td class="tr">{{formData.orderUserName}}</td>
          <td class="tl">申请人联系电话</td>
          <td class="tr" colspan="3">{{formData.orderUserPhon}}</td>
        </tr>
        <tr>
          <td class="tl">会议内容</td>
          <td colspan="5" class="tr white-space">{{formData.conferenceContent}}</td>
        </tr>
        <tr>
          <td class="tl">审核意见</td>
          <td colspan="5" class="tr">
            <div v-for="item in formData.shyj" :key="item.id">
              <div v-if="item.status">
                <div class="white-space">{{item.content}}</div>
                <div class="align_r">{{item.departmentName}} {{item.userName}}</div>
                <div class="align_r">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="tl">申请部门意见</td>
          <td colspan="5" class="tr">
            <div v-for="item in formData.sqbmyj" :key="item.id">
              <div v-if="item.status">
                <div class="white-space">{{item.content}}</div>
                <div class="align_r">{{item.departmentName}} {{item.userName}}</div>
                <div class="align_r">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="tl">用户使用评价</td>
          <td colspan="5" class="tr">
            <div v-for="item in formData.yhsypj" :key="item.id">
              <div v-if="item.status">
                <div class="white-space">{{item.content}}</div>
                <div class="align_r">{{item.departmentName}} {{item.userName}}</div>
                <div class="align_r">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="formData.thyy && formData.thyy.length>0 && !(formData.thyy.length==1 && formData.thyy[0].status==0)">
          <td class="tl">退回原因</td>
          <td colspan="5" class="tr">
            <div v-for="item in formData.thyy" :key="item.id">
              <div v-if="item.status">
                <div class="white-space">{{item.content}}</div>
                <div class="align_r">{{item.departmentName}} {{item.userName}}</div>
                <div class="align_r">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="formData.cancelReason">
          <td class="tl">取消原因</td>
          <td colspan="5" class="tr white-space"><p>{{formData.cancelReason}}</p></td>
        </tr>
        <tr>
          <td class="tl">备&nbsp;&nbsp;注</td>
          <td colspan="5" class="tr">
            <div v-for="item in formData.bz" :key="item.id">
              <div v-if="item.status">
                <span class="white-space">{{ item.content }}</span>
                <div class="align_r">{{item.departmentName}} {{item.userName}}</div>
                <div class="align_r">{{item.createTime}}</div>
                <!-- <span class="adviceInfo pad_yj10">({{ item.departmentName }}</span>
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
  name: "meetingRoomYDPrint",
  data() {
    return {
      pageTitle: "",
      printShow:true,
      formData: {
        approvalTimeLimit: "",//距离审批失效时间
        multiTenancyId: "", //多实体标识
        id: "",
        roomName: "", //会议室名称
        roomAddres: "", //会议室位置
        roomSeat: "", //会议室座位数
        meetUseDate: "",
        meetStartTime: "",
        meetEndTime: "",
        hostDepartment: "",
        orderUserName: "",
        orderUserPhon: "",
        meetRemark: "", //备注
        meetingName: "", //会议名称
        meetType: "", //会议类型
        isSecrete: 1, //是否涉密
        attendNums: "", //参会人数
        conferenceContent: "", //会议内容
        hostName: "", //主持行领导
        hostNameId: "", //主持行领导id
        attendUsers: "", //参会行领导
        attendUsersId: "", //参会行领导id
        needServices: "", //所需服务
        auditComment: "", //审核意见
        applicatPartComment: "", //申请部门意见
        backReason: "", //退回原因
        cancelReason: "", //取消原因
        shyy:[],
        sqbmyj:[],
        yhsypj:[],
        thyy:[],
        bz:[],
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
    afterPrint() {
      this.printShow = true;
    },
    //初始值
    initData() {
      this.$post
        .postData(
          "getRoomOrderDetail",
          JSON.stringify({
            function: "getRoomOrderDetail",
            id: this.$route.query.id,
            roomId:this.$route.query.roomId,
          }),
          this.$businessCode.hysyd
        )
        .then(res => {
          if(res.data){
            this.formData = Object.assign(this.formData,JSON.parse(JSON.stringify(res.data.po)));
            this.formData.shyj=JSON.parse(JSON.stringify(res.data.shyj));
            this.formData.sqbmyj=JSON.parse(JSON.stringify(res.data.sqbmyj));
            this.formData.thyy=JSON.parse(JSON.stringify(res.data.thyy));
            this.formData.bz=JSON.parse(JSON.stringify(res.data.bz));
            this.formData.yhsypj=JSON.parse(JSON.stringify(res.data.yhsypj));
            setTimeout(()=>{
              this.printThis();
            },500)
          }
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
    this.pageTitle=JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.initData();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.tl{
  text-align: center;
  line-height:25px;
  width: 140px;
}
.tr{
  padding: 5px;
  line-height:25px;
  word-break: break-all;
  text-align: left;
}
.white-space{
  white-space:pre-wrap;
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
  width: 720px;
  // margin: 0 auto;
  width: 100%;
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
