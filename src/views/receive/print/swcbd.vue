<template>
  <div class="tablePrint">
    <!--1)	收文协办单-->
    <el-row>
      <h1 style class="title-h1">{{fromdata.documentTitle}}</h1>
      <el-button class="printButton" v-show="printShow" @click="printThis()" type="info" plain>打印</el-button>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
    <!-- <thead style="border:none">
          <th style="border:none" colspan="7" class="th224">
          <p></p>
          </th>
      </thead> -->
      <tbody>
        <tr>
          <td style="text-align: center;">收文日期</td>
          <td style="padding-left: 10px;">{{fromdata.receiveTime}}</td>
          <td style="text-align: center;">紧急程度</td>
          <td style="padding-left: 10px;">{{fromdata.emergencyName}}</td>
          <td style="text-align: center;">登记人</td>
          <td style="padding-left: 10px;">{{fromdata.userName}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">收文字号</td>
          <td style="padding-left: 10px;">{{fromdata.documentCode}}</td>
          <td style="text-align: center;">秘密类型</td>
          <td style="padding-left: 10px;">{{fromdata.secretType}}</td>
          <td style="text-align: center;">密级和保密期限</td>
          <td style="padding-left: 10px;">{{fromdata.secretFlagType}}/{{fromdata.secretLimitType}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">来文单位</td>
          <td
            colspan="3"
            style="padding-left: 10px;"
          >{{fromdata.sendOrgName}}</td>
          <td style="text-align: center;">成文日期</td>
          <td style="padding-left: 10px;">{{fromdata.completeTime}}</td>
        </tr>
       <!-- <tr v-if="fromdata.isForword == 1">
          <td style="text-align: center">转发要求</td>
          <td  colspan="5" style="padding-left: 10px;">{{fromdata.forwordRequirements}}</td>
        </tr>
         <tr v-if="fromdata.isForword == 1">
          <td style="text-align: center;">直发文件:</td>
          <td style="padding-left: 10px;">{{fromdata.isDirect == 1?"是":"否"}}</td>
          <td style="text-align: center;">直发范围:</td>
          <td style="padding-left: 10px;">{{fromdata.directRange}}</td>
          <td style="text-align: center;">直发文种类:</td>
          <td style="padding-left: 10px;">{{fromdata.directType}}</td>
        </tr>
        <tr>
          <td style="text-align: center">保管期限</td>
          <td  colspan="5" style="padding-left: 10px;">{{fromdata.keepingLimitName}}</td>
        </tr>-->
        <tr>
          <td style="text-align: center">正文标题</td>
          <td  colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
        </tr>
        <tr>
          <td style="text-align: center">附件标题</td>
          <td  colspan="5" style="padding-left: 10px;white-space:pre-line;word-break:break-all">{{fromdata.attachmentTitle}}</td>
        </tr>
        <!-- <tr v-if="this.$route.query.id.DZ">
          <td style="text-align: center">主题词</td>
          <td  colspan="5" style="padding-left: 10px;">{{fromdata.attachmentTitle}}</td>
        </tr>
        <tr>
          <td style="text-align: center">业务分类</td>
          <td  colspan="5" style="padding-left: 10px;">{{fromdata.attachmentTitle}}</td>
        </tr> -->
        <tr>
          <td style="text-align: center;">承办部门</td>
          <td colspan="2" style="padding-left: 10px;">{{fromdata.finishUndertakeDeptName}}{{fromdata.undertakeDeptName}}</td>
          <td style="text-align: center;">协办部门</td>
          <td colspan="2" style="padding-left: 10px;">{{fromdata.assistDeptName}}</td>
        </tr>
        <tr>
          <td style="text-align: center">实物收文类型</td>
          <td  colspan="5" style="padding-left: 10px;">{{fromdata.receiveType}}</td>
        </tr>
        <tr style="min-height:100px;">
          <td style="text-align: center">批示意见</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col
                    :span="22"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
                  >
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime">{{item.createTime}} </p>
                          </div>
                  </el-col>
                  <el-col
                    :span="2"
                    v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                  >
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">办公室批办意见</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.officeOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime">{{item.createTime}} </p>
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
       <!-- <tr style="height:100px;">
           仅比传统实物收文多这一个字段，该字段办公室批办环节可见，其他环节不可见
          <td style="text-align: center">分办意见</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.officeOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col
                    :span="22"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
                  >
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p>
                          </div>
                  </el-col>
                  <el-col
                    :span="2"
                    v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                  >
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>-->
        <tr class="print_zr">
          <td style="text-align: center">承办部门办理情况</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.undertakeOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime">{{item.createTime}} </p>
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">协办部门办理情况</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.helpOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime">{{item.createTime}} </p>
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">传阅意见</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.circulateOpinionList" :key="item.id">
              <div class="d_flex" v-if="item.opinions!=''">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.opinions}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.opinionDeptName}} <span>{{item.curUser}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime">{{item.opinionCreateTime}} </p>
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">办结情况</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.handleTerminateOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime">{{item.createTime}} </p>
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
       <tr class="print_zr">
          <td style="text-align: center">备    注</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.remarksList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="pad_yj10 pad_yj11">
                    {{item.content}}
                    <span class="adviceInfo pad_yj10">({{item.departmentName}}</span>
                    <span class="adviceInfo pad_yj10">{{item.userName}}</span>
                    <span class="adviceInfo pad_yj10">{{item.createTime}})</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">协办部门最终意见</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.finalOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime">{{item.createTime}} </p>
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">协办部门过程意见</td>
          <td  colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.processOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                  <div class="adviceInfo">
                    <p class="pad_yj10"> {{item.departmentName}} <span>{{item.userName}}</span></p>
                    <p class="pad_yj10 pd_yj_useTime">{{item.createTime}} </p>
                  </div>
                </el-row>
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
  data() {
    return {
      //input框内容
      printShow: true,
      fromdata: {
      }
    };
  },
  mixins: [computedNodeHeight],
  methods: {
    beforePrint() {
      //this.printShow=false;
    },
    afterPrint() {
      this.printShow = true;
    },
    printThis() {
      this.printShow = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    },
    getDataOne(){
      let parms ={
        function:"selectByIdCB",
        id:this.$route.query.id
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectByIdCB",
        JSON.stringify(parms),
         this.$businessCode.swgl,
        )
        .then(res => {
          if (res.data) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()
          }
        });
    },
    getDataTwo(){
      let parms ={
        function:"selectAttachmentListCb",
        id:this.$route.query.id
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectAttachmentListCb",
          JSON.stringify(parms),
          this.$businessCode.swgl,
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataThree(){
      let parms ={
        function:"selectOpinionListCb",
        id:this.$route.query.id
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
      this.$post
        .postData(
          "selectOpinionListCb",
          JSON.stringify(parms),
          this.$businessCode.swgl,
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData(){
      this.getDataOne();
      this.getDataTwo();
      this.getDataThree();
    },
  },
  created() {
    if (window.matchMedia) {
      let MediaQueryList = window.matchMedia("print");
      MediaQueryList.addListener(mql => {
        if (mql.matches) {
          this.beforePrint();
        } else {
          this.afterPrint();
        }
      });
    }
    //初始化加载数据
    this.initData();
    }
};
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
    height: 32px;
    td {
      width: 12%;
      // text-align: center;
      vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
}
.printButton {
  position: absolute;
  top: 60%;
  right: 3%;
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
.tcont font {
  /* background-color:#F2CACB; */
}
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
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
.pad_yj10 {
  white-space: pre-line;
  word-break: break-all;
}
</style>
