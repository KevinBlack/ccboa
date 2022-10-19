<!--
 * @Author: your name
 * @Date: 2020-12-17 16:35:01
 * @LastEditTime: 2021-11-11 18:01:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA2\src\views\publication\tgMangement\wriScript\xxgjcld.vue
--> 
<template>
  <!-- 一、	投稿管理：
  1.	信息稿件处理单-->

  <div class="tablePrint">
    <el-row style="width:100%">
      <el-button class="print" @click="printThis()" v-show="printShow" type="info" plain>打印</el-button>
      <el-button class="close" @click="printThisClose()" v-show="printShow" type="info" plain>关闭</el-button>
    </el-row>
    <el-row>
      <h1 style class="title-h1">{{this.$route.query.title}}</h1>
    </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
      <tbody>
        <tr>
          <td>印章设备名称</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.deviceName}}</td>
          <td style="width: 16%; text-align: center">设备型号</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.deviceType}}</td>
          <td style="width: 16%; text-align: center">设备编号</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.deviceNumber}}</td>
        </tr>
        <tr>
          <td style="text-align: center">维护类型</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.maintainType}}</td>
        </tr>
        <tr>
          <td style="text-align: center">取章时长</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.sealCloseTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center">印章名称</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.sealName1}}</td>
        </tr>
        <tr>
          <td>申请人</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.sqPerson}}</td>
          <td style="width: 16%; text-align: center">申请部门</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.yzDept}}</td>
          <td style="width: 16%; text-align: center">申请时间</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.cdate}}</td>
        </tr>
        <tr>
          <td>编号</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.documentNo}}</td>
          <td style="width: 16%; text-align: center">维护完成时间</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.endTime}}</td>
        </tr>
        <tr>
          <td>设备开启时间1</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.startTime1}}</td>
          <td style="width: 16%; text-align: center">设备关闭时间1</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.closeTime1}}</td>
          <td style="width: 16%; text-align: center">处理时长1</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.clTime1}}</td>
        </tr>
        <tr>
          <td>设备开启时间2</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.startTime2}}</td>
          <td style="width: 16%; text-align: center">设备关闭时间2</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.closeTime2}}</td>
          <td style="width: 16%; text-align: center">处理时长2</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.clTime2}}</td>
        </tr>
        <tr>
          <td style="text-align: center">维护原因</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.maintainCause}}</td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">申请部门领导审批</td>
          <td colspan="5" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.spYj}}</div>
            <div class="qianF" v-for="item in opinion.spYj" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{ item && item.qm }}<br />
                  {{ item && item.dateTime }}
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">申请单位行领导审批</td>
          <td colspan="5" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.hsp}}</div>
            <div class="qianF" v-for="item in opinion.hsp" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{ item && item.qm }}<br />
                  {{ item && item.dateTime }}
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">上级行审批</td>
          <td colspan="5" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.shunYj}}</div>
            <div class="qianF" v-for="item in opinion.shunYj" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{ item && item.qm }}<br />
                  {{ item && item.dateTime }}
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">处理情况</td>
          <td colspan="5" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.clQk}}</div>
            <div class="qianF" v-for="item in  opinion.clQk" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{ item && item.qm }}<br />
                  {{ item && item.dateTime }}
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">审请单位监印</td>
          <td colspan="5" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.monitorOption}}</div>
            <div class="qianF" v-for="item in  opinion.monitorOption" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{ item && item.qm }}<br />
                  {{ item && item.dateTime }}
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
          <td colspan="5" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.remark}}</div>
            <div class="qianF" v-for="item in  opinion.remark" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{ item && item.qm }}<br />
                  {{ item && item.dateTime }}
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Vue from 'vue'
import dateFormate from '@/util/filters.js'
export default {
  data() {
    return {
      itemTable:'',
      topBankApprove: [],
      auditOpinionsList: [],
      auditOpinions: '',
      printShow: true,
      opinion: '',
      formData: {
        type: '',
        mathStatistics: '',
        isagree: '',
        deviceName: '',
        deviceType: '',
        deviceNumber: '',
        maintainType: '',
        sealCloseTime: '',
        allSealName: '',
        allSealName1: '',
        selallSealName: [],
        sqPerson: '',
        yzDept: '',
        cdate: '',
        serialNumber: '',
        endTime: '',
        startTime1: '',
        closeTime1: '',
        clTime1: '',
        startTime2: '',
        closeTime2: '',
        clTime2: '',
        maintainCause: '',
        depLeaderApproval: '',
        unitLeaderApproval: '',
        upperApproval: '',
        clQk: '',
        monitorOption: '',
        remark: ''
      },
    }
  },
  methods: {
    time(e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + '  '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    // 打印
    printThis() {
      this.printShow = false
      setTimeout(() => {
        document.execCommand('print')
      }, 100)
    },
    // 关闭
    printThisClose() {
      this.$intent.closeWindow(this)
    },
    beforePrint() {
      this.printShow = false
    },
    afterPrint() {
      this.printShow = true
    },
    xq() {
      this.$api.paraMeter.Manuscriptxq({ gId: this.$route.query.rowData }).then((res) => {
        if (res.code == 'SUCCESS') {
          console.log(res, '详情数据')
          this.formData = res.data
          this.formData.drafTime = dateFormate.date(Date.parse(res.data.drafTime), 'YYYY-MM-DD')
          // this.formData.drafTime = formatData(res.data.drafTime, 'YYYY-MM-DD')
          this.auditOpinionsList = this.formData.objectMap.auditOpinionsList
        }
      })
    },
    initData() {
      this.$api.sealManage.useSealMaintain.UseSealMaintainDetail({ id: this.$route.query.id })
        .then(res => {
          console.log(res, '请求的详情页数据')
          this.formData=Object.assign(this.formData, res.data.view)
          this.opinion = Object.assign(this.opinion, res.data.opinion)
          this.formData.sealName1 = this.$route.query.name
          console.log(this.opinion, '请求的详情页数据')
          // this.topBankApprove = [...this.opinion[5],...this.opinion[6]]
          // this.value = this.formData.deviceName
        })
    },
  },
  created() {
    if (window.matchMedia) {
      let MediaQueryList = window.matchMedia('print')
      this.itemTable =  this.$route.query.shortFirstUnitName
      MediaQueryList.addListener((mql) => {
        if (mql.matches) {
          this.beforePrint()
        } else {
          this.afterPrint()
        }
      })
    }
    //initData
    this.initData()
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.p1{
  text-align: left;
}
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 20px;
    width: 100%;
    text-align: left;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-top: 10px;
    text-align: right;
  }
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
    height: 40px;
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
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
}
.print {
  float: left;
  margin: 20px 20px;
}
.close {
  float: right;
  margin: 20px 20px;
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
/deep/ .d_f1 .el-textarea__inner {
  border: none !important;
  background-color: #fff !important;
}
</style>