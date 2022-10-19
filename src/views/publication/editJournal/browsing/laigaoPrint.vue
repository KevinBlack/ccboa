<!--
 * @Author: your name
 * @Date: 2020-12-17 16:35:01
 * @LastEditTime: 2021-05-27 09:08:55
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
      <h1 style class="title-h1">{{"《"+formData.pubNm+"》"+"稿件处理单"}}</h1>
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
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.curUsernm}}</td>
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
        <tr>
          <td>最新评分</td>
          <td id="type" style="width: 20%; padding-left: 10px;">{{formData.grade}}</td>
          <!-- <td style="width: 16%; text-align: center">系统</td> -->
          <!-- <td id="redHead" style="width: 18%; padding-left: 10px;"></td> -->
          <td colspan="4" style="text-align:center;vertical-align:middle">
            <div class="qianF" v-for="item in count" :key="item.id">
              <div class="p1">{{item}}</div>

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
      printShow: true,
      formData: {},
      count: [],
    }
  },
  methods: {
    loadData() {
      this.$api.pubStatistics
        .pubBrowsingListDetails({ gId: this.$route.query.data })
        .then((res) => {
          this.formData = res.data
          this.formData.drafTime = dateFormate.date(
            Date.parse(this.formData.drafTime),
            "YYYY-MM-DD"
          );
          if (this.formData.objectMap.role === '1') {
            this.isNotEditOrTopEditPerson = false
            if (this.formData.objectMap.gradelist.length !== 0) {
              this.newGrade = this.formData.grade
              let list = []
              this.formData.objectMap.gradelist.map((item) => {
                list.push(item.unm + ':' + item.grade)
              })
              this.count = list
            } else {
              this.formData.grade = '1'
              this.newGrade = '1'
              this.count = ['系统:1']
            }
            // 编辑人员
          } else if (this.formData.objectMap.role === '0') {
            this.isNotEditOrTopEditPerson = true
            if (this.formData.objectMap.gradelist.length !== 0) {
              this.newGrade = this.formData.grade
              let list = []
              this.formData.objectMap.gradelist.map((item) => {
                list.push(item.unm + ':' + item.grade)
              })
              this.count = list
            } else {
              this.formData.grade = '1'
              this.newGrade = '1'
              this.count = ['系统:1']
            }
          }
        })
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
    initData() {
      let obj = {}
      obj.pubMgId = this.$route.query.drafUid
      // this.$api.paraMeter.PublicationListData(obj).then((res) => {
      //   console.log(res)
      // })
      console.log(obj)
    },
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