<!--
 * @Author: your name
 * @Date: 2020-12-17 16:35:01
 * @LastEditTime: 2021-03-11 19:08:26
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
      <h1 style class="title-h1">{{itemTable}}信息稿件处理单</h1>
    </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
      <tbody>
        <tr>
          <td>投稿刊物</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.pubNm}}</td>
          <td style="width: 16%; text-align: center">投稿栏目</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.colNm}}</td>
        </tr>
        <tr>
          <td>投稿单位</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.drafOrgNm}}</td>
          <td style="width: 16%; text-align: center">投稿部门</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.drafDepNm}}</td>
        </tr>
        <tr>
          <td>拟稿人</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.drafUnm}}</td>
          <td style="width: 16%; text-align: center">联系电话</td>
          <td id="redHead" style="width: 18%; padding-left: 10px;">{{formData.phone}}</td>
        </tr>
        <tr style="height: 40px;" class="shenpishow">
          <td style="text-align: center">拟稿日期</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.drafTime}}</td>
        </tr>
        <tr style="height: 40px;" class="shenpishow">
          <td style="text-align: center">标题</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.title}}</td>
        </tr>
        <!-- <tr style="height: 40px;" class="shenpishow">
          <td style="text-align: center">审核意见</td>
          <td id="shenpiTitle" colspan="5" style="padding-left: 10px;">{{formData.auditOpinions}}</td>
        </tr> -->
        <tr style="height: 140px;">
          <td style="width：20%;text-align:center;vertical-align:middle">审核意见</td>
          <td colspan="4" style="text-align:center;vertical-align:middle">
            <div class="p1">{{auditOpinions}}</div>
            <div class="qianF" v-for="item in auditOpinionsList" :key="item.id">
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
      auditOpinionsList: [],
      auditOpinions: '',
      printShow: true,
      formData: {
        pubMgId: '', //刊物id
        pubNm: '', //刊物名称
        gId: '', //稿件id
        nextHumanId: '', //下一处理人Id
        nextHumanNm: '', //下一处理人name
        nextPcsNodeID: '', //下一环节id
        nextPcsNodeNM: '', //下一环节name
        title: '', //标题
        colId: '', //栏目id
        colNm: '', //栏目名称
        drafDepId: '', //拟稿部门id
        drafDepNm: '', //拟稿部门名称
        drafOrgId: '', //拟稿所属机构id
        drafOrgNm: '', //拟稿所属机构name
        drafUid: '', //拟稿人id
        drafUnm: '', //拟稿人名称
        phone: '', //联系电话
        assessOpinions: '', //评审意见
        zukanOpinions: '', //组刊意见
        auditOpinions: '', //	审批意见
        processInstId: '', //	流程实例Id
        pTplNo: '', //	流程模板Id
        supUserid: '', //	上一个处理人id
        supUsernm: '', //	上一个处理人name
        curPcsAvyId: '', //	当前活动Id
        curNodeCode: '', //	当前环节id
        curNodeName: '', //	当前环节name
        curUserid: '', //	当前处理人id
        curUsernm: '', //	当前处理人name
        supNodeCode: '', //	上一环节id
        pubMainFilePath: '', //	正文附件地址
        caiyongOrgId: '', //	采用机构id
        caiyongOrgNm: '', //	采用机构名称
        grade: '', //	最新评分
        startDate: '', //	投稿查询起始时间
        endDate: '', //投稿查询结束时间

        drafTime: ''
          ? dateFormate.date(Date.parse(new Date()), 'YYYY-MM-DD')
          : dateFormate.date(Date.parse(new Date()), 'YYYY-MM-DD'), //投稿时间
        editTime: '', //编辑时间
        // pubStaut:'',//投稿状态
        // cyStaut:'',//采用状态
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
      this.auditOpinions = this.$route.query.auditOpinions
      // 判断是否为详情条转
      if (this.$route.query.rowData) {
        console.log(this.$route.query.rowData)
        this.xq()
      } else {
        //不是详情跳转获取登录人信息集合
        let Jb = JSON.parse(localStorage.getItem('userInfo'))
        // 拟稿人赋值
        this.formData.drafUnm = this.formData.curUsernm = Jb.humanName
        this.name = Jb.humanName
        this.formData.drafUid = Jb.humanId
        this.formData.drafDepNm = this.$route.query.shortFirstUnitName
        // this.formData.drafDepId = Jb.currUnitId
        this.formData.drafOrgNm = Jb.shortUnitName
        this.formData.drafOrgId = Jb.unitId
        this.formData.phone = Jb.telMobile
      }
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