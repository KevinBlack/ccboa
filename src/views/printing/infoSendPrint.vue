<template>
  <div>
    <div id="printHtml" ref="printHtml" class="tablePrint">
      <div class="no-print">            
        <el-button @click="printThis" type="info" plain>打印</el-button>
        <!-- <el-button @click="closeThis" type="info" plain>返回</el-button> -->
      </div>
      <el-row>
        <h1 style class="title-h1">{{tableTitle}}</h1>
      </el-row>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">投稿刊物</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formdata.submitPublication}}</td>
            <td style="text-align:center;vertical-align:middle">投稿栏目</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formdata.submitColumn}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">投稿单位</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
              colspan="2"
            >{{formdata.submitUnit}}</td>

            <td style="text-align:center;vertical-align:middle">投稿部门</td>
            <td
              style="padding-left: 10px;text-align:left;vertical-align:middle"
            >{{formdata.submitDept}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">投稿人</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;padding-left: 10px;"
              colspan="2"
            >{{formdata.submitPerson}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">手机号</td>
            <td style="width:30%;text-align:left;vertical-align:middle;padding-left: 10px;">{{formdata.tel}}</td>
          </tr>

          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">拟稿日期</td>
            <td
              style="width:40%;text-align:left;vertical-align:middle;padding-left: 10px;"
              colspan="2"
            >{{formdata.createDate}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">报送日期</td>
            <td style="width:30%;text-align:left;vertical-align:middle;padding-left: 10px;">{{formdata.submitDate}}</td>
          </tr>

          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">活动类别</td>
            <td colspan="4" style="text-align:left;vertical-align:middle;padding-left: 10px;">
              <!-- <div class="qianF">{{ activityCategoryNames.join(';') }}</div> -->
              <div class="qianF">{{ formdata.activeTypeName }}</div>
              <!-- <div class="qianF" v-for="item in formdata.checkDataList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div> -->
            </td>
            <!-- <td colspan="4" style="text-align:center;vertical-align:middle">{{formdata.activityType}}</td> -->
          </tr>
          <!--内容-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">内容</td>
            <td colspan="4" style="text-align:left;vertical-align:middle;padding-left: 10px;">{{formdata.content}}</td>
          </tr>
          <!--审核意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">审核意见</td>
            <td colspan="4" style="text-align:left;vertical-align:middle">
              <!-- {{formdata.checkList}} -->
              <div v-if="formdata.checkList && formdata.checkList.length > 0">
                  <div class="piece" v-for="item in formdata.checkList" :key="item.id">
                  <div class="text1">{{item.content}}</div>
                  <div class="text2" v-if="item.content? true : false">
                    {{item.departmentName}}
                    <span>{{item.createUser}}&nbsp;</span>
                    <div>{{item.createTime}}</div>
                  </div>
                </div>
              </div>
              <div v-else>{{formdata.auditIdeaIn}}</div>
            </td>
          </tr>
          <!--备注-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="4" style="text-align:left;vertical-align:middle">
              <!-- {{formdata.remark}} -->
              <div v-if="formdata.remarkList && formdata.remarkList.length > 0">
                <div class="piece" v-for="item in formdata.remarkList" :key="item.id">
                  <div class="text1">{{item.content}}</div>
                  <div class="text2" v-if="item.content? true : false">
                    {{item.departmentName}}
                    <span>{{item.createUser}}&nbsp;</span>
                    <div>{{item.createTime}}</div>
                  </div>
                </div>
              </div>
              <div v-else>{{formdata.remarkIn}}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableTitle: "", /** @description: 打印单标题 */
      formdata: {}, /** @description: 打印单的值 */
    };
  },
  computed: {
    /** @description: 活动类别名称 */
    activityCategoryNames() {
      const [currentActivityCategoryItem] =
       this.formdata.checkDataList && this.formdata.checkDataList.filter(item => item.id === this.formdata.activityType[0]) || []
      return  this.formdata.checkDataList && this.formdata.checkDataList.filter(item => this.formdata.activityType.includes(item.id)).map(item => item.activityCategory) || []
    }
  },
  methods: {
    /** @description: 打印 */
    printThis() {
      this.$print(this.$refs.printHtml)
    },
    closeThis() {
      window.location.href = "about:blank";
      window.opener.location.reload()
      window.close();
      // this.gotoSourceRoutePage({
      //   sourceRouteName: this.sourceRouteNameFromParams
      // })
      // this.$intent.closeWindow(this);
      
    },
  },
  created() {
    let rowData = JSON.parse(this.$route.query.data); /** @description: 当前行转为对象格式 */
    this.tableTitle = rowData.title; /** @description: 报送单标题 */
    this.formdata = rowData; /** @description: 当前行赋值给报送单 */
    console.log(this.formdata,"chulizhiqian")
    this.formdata.createDate =  this.formdata.createDate.split(" ")[0]
    console.log(this.formdata.createDate.split(" "),"数据")
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.piece {
  overflow: hidden;
}
.piece .text1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.piece .text2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}
.chuanYue {
  overflow: hidden;
}
.chuanYue .chuanYue1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.chuanYue .chuanYue2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.guoCh {
  overflow: hidden;
}
.guoCh .guoCh1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.guoCh .guoCh2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.beiZh {
  overflow: hidden;
}
.beiZh .content {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.beiZh .name {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
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
    height: 32px;
    td {
      width: 12%;
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
.tcont2 > div {
  float: right;
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
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.pos_r {
  position: relative;
}
.printButton {
  position: absolute !important;
  top: 1% !important;
  right: 1% !important;
}
</style>

