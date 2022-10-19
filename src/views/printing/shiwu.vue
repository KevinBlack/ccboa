<template>
  <div>
    <div id="printHtml" class="tablePrint">
      <el-row id="rowClass">
        <h1
          style
          class="title-h1"
        ><span id="titles">{{formdata.unitName||formdata.curbank}}{{formdata.applyProjectName}}</span><span v-if="titleFlag"><br></span>审批<span v-if="!!formdata.cyFirstOpinionList">传阅</span>处理单</h1>
        <el-button v-show="printShow" class="printButton" @click="printThis()" type="info" plain>打印</el-button>
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
            <td style="text-align:center;vertical-align:middle">申请项目</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.applyProjectName}}</td>
            <td style="text-align:center;vertical-align:middle">主管部门</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.mainDepart}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="text-align:center;vertical-align:middle">审批编号</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.approveNo}}</td>

            <td style="text-align:center;vertical-align:middle">申请日期</td>
            <td
              style="padding-left: 10px;text-align:center;vertical-align:middle"
            >{{formdata.applyTime}}</td>
          </tr>
          <!--        <tr style="height: 800px;">-->
          <!--          <td style="text-align:center" colspan="5"></td>-->
          <!--        </tr>-->
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">联系人</td>
            <td
              style="width:40%;text-align:center;vertical-align:middle"
              colspan="2"
            >{{formdata.contactName}}</td>
            <td style="width：20%;text-align:center;vertical-align:middle">联系电话</td>
            <td style="width:30%;text-align:center;vertical-align:middle">{{formdata.contactTel}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请部门</td>
            <td
              colspan="4"
              style="text-align:center;vertical-align:middle"
            >{{formdata.draftDepartment}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">标题</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">{{formdata.title}}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">依据</td>
            <td colspan="4" style="text-align:center;vertical-align:middle">
              <span
                v-for="item in YRcheck"
                :key="item.id"
              >{{item.orderNo}};&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </td>
          </tr>
          <!--        事由提要-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">事由提要</td>
            <td colspan="4">{{formdata.reason}}</td>
          </tr>
          <!--       审批意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">审批意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formdata.checkOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        申请单位意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">申请单位意见</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formdata.applyOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--         办理情况-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">办理情况</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formdata.blqkOpinionList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        传阅意见-->
          <tr style="height: 140px;">
            <td style="width：20%;text-align:center;vertical-align:middle">传阅意见</td>
            <td colspan="4">
              <div class="chuanYue" v-for="item in formdata.cyOpinionList" :key="item.id">
                <div class="chuanYue1">{{item.content}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="height: 140px;" v-if="!!formdata.cyFirstOpinionList">
            <td style="width：20%;text-align:center;vertical-align:middle">一次传阅意见</td>
            <td colspan="4">
              <div class="chuanYue" v-for="item in formdata.cyFirstOpinionList" :key="item.id">
                <div class="chuanYue1">{{item.content}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
         <tr style="height: 140px;" v-if="!!formdata.cySecondOpinionList">
            <td style="width：20%;text-align:center;vertical-align:middle">二次传阅意见</td>
            <td colspan="4">
              <div class="chuanYue" v-for="item in formdata.cySecondOpinionList" :key="item.id">
                <div class="chuanYue1">{{item.content}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="height: 140px;" v-if="!!formdata.explainList">
            <td style="width：20%;text-align:center;vertical-align:middle">传阅说明</td>
            <td colspan="4">
              <div class="chuanYue" v-for="item in formdata.explainList" :key="item.id">
                <div class="chuanYue1">{{item.content}}</div>

                <div class="chuanYue2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.createUser}}
                  </span>
                  <div>{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        备注-->
       <tr style="height: 32px;">
            <td style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="4">
              <div class="qianF" v-for="item in formdata.markList" :key="item.id">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.departmentName}}&nbsp;
                    {{item.userName}}
                  </span>
                  <div　class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <!--        附件-->
          <tr style="height: 32px;">
            <td style="width:20%;vertical-align:middle;text-align:center">附件</td>

            <td colspan="4">
              <div
                v-for="(item,index) in  attchmentFileInfo"
                :key="item.id"
              >{{item.fileName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createrName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createTime}}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <table
        cellspacing="0"
        cellpadding="0"
        class="printTableList"
        style="font-family: 宋体;font-size: 19px;"
        id="print-table"
      >
        <tbody>
          <tr style="height: 40px;">
            <td style="width：20%;text-align:center;vertical-align:middle" rowspan="2">传阅人员</td>
            <td style="width:10%;text-align:center;vertical-align:middle">未阅</td>
            <td style="width:80%;text-align:left;vertical-align:middle">{{formdata.unreadPerson}}</td>
          </tr>

          <tr>
            <td style="width:10%;text-align:center;vertical-align:middle">已阅</td>
            <td style="width:80%;text-align:left;vertical-align:middle">{{formdata.readPerson}}</td>
          </tr>

          <br />
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formdata1:{},
      printShow: true,
      titleFlag:true,
      id: "",
      isKh: "",
      tableTitle: "",
      formdata: {},
      YRcheck: [],
      attchmentFileInfo: [],
      numyear:'',
    };
  },
  methods: {
    splitTable(con) {
       con = document.getElementById("printHtml");
      const con_t = con.offsetTop;
      const con_h = con.offsetHeight;
      const a4_h = 1010; //设置为a4纸一页高度 原来是900
      const page_b = 31; //打印纸底部留白高度
      const tableOffsetTop=con.children[1].offsetTop;
      const tableOffsetHeight=con.children[1].offsetHeight;
      let splitType='';//tr:直接分割tr,td:需要分割td里面内容
      let ch_index=0;//当前tr节点在数组中的位置
      const trChildren=con.children[1].children[0].children;//第一个table的tr节点
      
      //判断是否分割第一个table
      if(con_t + con_h > a4_h-page_b*2&&
         tableOffsetTop+tableOffsetHeight> a4_h-page_b*2){
         Array.from(trChildren).reduce((pre,cur,index)=>{
           //直接分割tr
             if(tableOffsetTop+cur.offsetHeight==a4_h-page_b*2){
                  splitType='tr';
                  ch_index=index;
                  $(trChildren[index]).after(`<tr class='hiddenDom'></tr>`)
                  return false;
            //分割ｔｄ
             }else if(tableOffsetTop+cur.offsetHeight>a4_h-page_b*2){
                  splitType='td';
                  ch_index=index;
                  return false;
            //继续循环
             }else{
               return true;
             }
         },tableOffsetTop)
         
         if(splitType=='td'){
           tdChildren=trChildren[8].children[1].children
         }
      //第二个table换页
      }else if(con_t + con_h > a4_h-page_b*2){
         con.children[3].className='breakBefore print-margin'
      }
    },
    splitTdContent() {},
    printThis() {
      this.printShow = false
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },
    beforePrint() {
      this.printShow = false
    },
    afterPrint() {
      this.printShow = true
    },
    getFileList() {
      let that = this;
      this.$api.setSysConfig
        .getTextemList({
          id: this.id,
          numYear:this.numyear
        })
        .then(res => {
          this.$nextTick(() => {
            if (res.data && res.data.length > 0) {
              that.attchmentFileInfo.push(...res.data);
            }
          });
        });
    },
    loadData() {
      this.$api.checkLz
        .checkLzDeal({ id: this.id, isKh: this.isKh,numYear:this.numyear})
        .then(res => {
          this.formdata = res.data;
          this.formdata = Object.assign(this.formdata,this.formdata1)
          if(res.code=="SUCCESS") {
            let strLength = (res.data.unitName || res.data.curbank) + res.data.applyProjectName
            if(this.getlength(strLength,35) > 840) {
              this.titleFlag = false
            } else {
              this.titleFlag = true
            }
          }
          // this.formdata.markList = res.markList;
          // this.formdata.checkOpinionList = res.checkOpinionList;
          // this.formdata.applyOpinionList = res.applyOpinionList;
          // this.formdata.sytyOpinionList = res.sytyOpinionList;
          // this.formdata.cyOpinionList = res.cyOpinionList;
          // this.formdata.cyFirstOpinionList=res.cyFirstOpinionList;
          // this.formdata.cySecondOpinionList=res.cySecondOpinionList;
          // this.formdata.blqkOpinionList = res.blqkOpinionList;
          // this.YRcheck = res.leadInfoList;
          setTimeout(() => {
            this.checkLzDealChai()
          }, 0);
          this.getFileList();
        });
    },
    // 拆分详情新街口
    checkLzDealChai() {
      this.$api.checkLz
        .checkLzDealChai({ id: this.id, isKh: this.khType,numYear:this.numyear })
        .then(res=>{
          console.log('拆分接口',res)
          this.formdata = {...this.formdata,...res}
        })
    },
    loadDataCy() {
      this.$api.checkLz.checkCYDeal({ id: this.id,numYear:this.numyear }).then(res => {
        this.formdata = Object.assign(this.formdata,this.formdata1)
        this.formdata = res.data;
        if(res.code=="SUCCESS") {
            let strLength = (res.data.unitName || res.data.curbank) + res.data.applyProjectName
            if(this.getlength(strLength,35) > 840) {
              this.titleFlag = false
            } else {
              this.titleFlag = true
            }
          }
        // this.formdata.markList = res.markList;
        // this.formdata.checkOpinionList = res.checkOpinionList;
        // this.formdata.applyOpinionList = res.applyOpinionList;
        // this.formdata.sytyOpinionList = res.sytyOpinionList;
        // this.formdata.cyOpinionList = res.cyOpinionList;
        // this.formdata.cyFirstOpinionList=res.cyFirstOpinionList;
        // this.formdata.cySecondOpinionList=res.cySecondOpinionList;
        // this.formdata.blqkOpinionList = res.blqkOpinionList;
        //   this.formdata.explainList = res.cyExplainList;
        // this.YRcheck = res.leadInfoList;
        setTimeout(() => {
            this.checkLzDealChai()
          }, 0);
        this.getFileList();
      });
    },
    // 校验标题实际长度方法
    getlength(str,font_size) {
      var str_leng = str.replace(/[^x00-xff]/gi,'aa').length
      return str_leng*font_size/2
    }
  },
  mounted() {
  },
  created() {
    let rowData = JSON.parse(this.$route.query.data);
    console.log("rowData", rowData);
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
    this.id = rowData.id;
    this.isKh = rowData.isKh;
    this.tableTitle = rowData.title;
    this.numyear=rowData.numyear||rowData.numYear?rowData.numyear||rowData.numYear:'';
    if (!!rowData.iscy) {
      this.loadDataCy();
    } else {
      this.loadData();
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
    word-break: break-all;
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
  .chuanYue1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
  }
.chuanYue2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
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
    height: 32px;
    td {
      width: 12%;
      border: 1px solid #000;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 1.3;
}
.printButton {
  position: absolute !important;
  top: 1% !important;
  right: 1% !important;
}
.hiddenDom{
  display:none;
}
@media print {
      .breakBefore{PAGE-BREAK-BEFORE:always} 
      .print-margin{
          margin-top:3.3cm;
      }
      .hiddenDom{
        height:6.6cm;
        display:block;
      }
  }
</style>
