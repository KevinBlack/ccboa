<!--
 * @Author: your name
 * @Date: 2020-12-17 16:35:01
 * @LastEditTime: 2021-01-26 15:33:16
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
      <h1 style class="title-h1">{{formData.topTitle}}信息发布单</h1>
    </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
      <tbody>
        <tr>
          <td style="text-align: center">标题</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.title}}</td>
        </tr>
        <tr>
          <td style="width: 16%; text-align: center">投稿部门</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.drafDepNm}}</td>
          <td style="width: 16%; text-align: center">发布状态</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.pubStaut}}</td>
        </tr>
        <tr>
          <td>简报名称</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.jbNm}}</td>
          <td style="width: 16%; text-align: center">简报编号</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.jbNo}}</td>
        </tr>
        <tr>
          <td>拟稿日期</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.drafTime}}</td>
          <td style="width: 16%; text-align: center">发布日期</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.pubTime}}</td>
        </tr>
        <tr style="height: 40px;" class="shenpishow">
          <td style="text-align: center">发送对象</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.sendUnm}}</td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">签发意见</td>
          <td colspan="4" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.issuingOpinions}}</div>
            <div class="qianF" v-for="item in formData.issuingOpinionsArrays" :key="item.id">
              <div class="p1">{{item.opinionText}}</div>
              <div class="p2">
                <span>
                  {{item.depnm}}&nbsp;
                  {{item.unm}}&nbsp;
                  {{time(item.opinionTime)}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">审核意见</td>
          <td colspan="4" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.auditOpinions}}</div>
            <div class="qianF" v-for="item in formData.auditOpinionsArrays" :key="item.id">
              <div class="p1">{{item.opinionText}}</div>
              <div class="p2">
                <span>
                  {{item.depnm}}&nbsp;
                  {{item.unm}}&nbsp;
                  {{time(item.opinionTime)}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
          <td colspan="4" style="text-align:center;vertical-align:middle">
            <div class="p1">{{formData.remark}}</div>
            <div class="qianF" v-for="item in formData.remarkArrays" :key="item.id">
              <div class="p1">{{item.opinionText}}</div>
              <div class="p2">
                <span>
                  {{item.depnm}}&nbsp;
                  {{item.unm}}&nbsp;
                  {{time(item.opinionTime)}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <!-- <tr style="height: 40px;" class="shenpishow" v-for="(item, index) in formData.issuingOpinionsArrays" :key="index">
          <td style="text-align: center">{{index === 0 ? '签发意见' : ''}}</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{item.opinionText+'    '+ (item && item.depnm)+' ' + (item && item.unm)+ ' ' + (item && transitionDate(item.opinionTime)) }}</td>
        </tr>
        <tr style="height: 40px;" class="shenpishow" v-if=formData.issuingOpinions>
          <td style="text-align: center">{{(formData.issuingOpinionsArrays &&　formData.issuingOpinionsArrays.length > 0) ? '' : '签发意见'}}</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.issuingOpinions+'    '+ (formData && formData.curUsernm)+' ' + (formData && formData.drafDepNm)+ ' ' + (formData && transitionDate(formData.tms)) }}</td>
        </tr>

        <tr style="height: 40px;" class="shenpishow" v-for="(item, index) in formData.auditOpinionsArrays" :key="index">
          <td style="text-align: center">{{index === 0 ? '审核意见' : ''}}</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{item.opinionText　+'    '+ (item && item.depnm)+' ' + (item && item.unm)+ ' ' + (item && transitionDate(item.opinionTime)) }}</td>
        </tr>
        <tr style="height: 40px;" class="shenpishow" v-if=formData.auditOpinions>
          <td style="text-align: center">{{(formData.auditOpinionsArrays && formData.auditOpinionsArrays.length > 0) ? '' : '审核意见'}}</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.auditOpinions+'    '+ (formData && formData.curUsernm)+' ' + (formData && formData.drafDepNm)+ ' ' + (formData && transitionDate(formData.tms)) }}</td>
        </tr>

        <tr style="height: 40px;" class="shenpishow" v-for="(item, index) in formData.remarkArrays" :key="index">
          <td style="text-align: center">{{index === 0 ? '备注' : ''}}</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{item.opinionText+'    '+ (item && item.depnm)+' ' + (item && item.unm)+ ' ' + (item && transitionDate(item.opinionTime)) }}</td>
        </tr>
        <tr style="height: 40px;" class="shenpishow" v-if=formData.remark>
          <td style="text-align: center">{{(formData.remarkArrays && formData.remarkArrays.length > 0) ? '' : '备注'}}</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.remark+'    '+ (formData && formData.curUsernm)+' ' + (formData && formData.drafDepNm)+ ' ' + (formData && transitionDate(formData.tms)) }}</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['remarkArrays'],
  data() {
    return {
      printShow: true,
      formData: {},
      count: [],
    }
  },
  methods: {
    loadData() {
      this.formData = JSON.parse(this.$route.query.formData)
      console.log('大约顶顶顶', this.formData)
    },
    // 打印
    printThis() {
      this.printShow = false
      setTimeout(() => {
        document.execCommand('print')
      }, 100)
    },
    // 转换日期
    time(dataString) {
      if (dataString) {
        let date = new Date(dataString)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      } else {
        return ''
      }
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
    initData() {},
  },
  created() {
    this.loadData()
    if (window.matchMedia) {
      let MediaQueryList = window.matchMedia('print')
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
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 20px;
    width: 100%;
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
