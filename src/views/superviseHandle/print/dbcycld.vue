<template>
  <div class="tablePrint">
    <!--1)	收文协办单-->
    <el-row>
      <h1 style class="title-h1">{{fromdata.title}}</h1>
      <el-button v-if="printShow" class="printButton" @click="printThis()" type="info" plain>打印</el-button>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
    <thead style="border:none">
        <th style="border:none" colspan="6" class="th224">
          <p></p>
        </th>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">立项依据</td>
          <td style="padding-left: 10px;">{{fromdata.projectBase}}</td>
          <td style="text-align: center;">紧急程度</td>
          <td style="padding-left: 10px;">{{fromdata.pressingLevel}}</td>
          <td style="text-align: center;">编号</td>
          <td style="padding-left: 10px;" v-if='fromdata.doucumentNum.length>7'>{{fromdata.doucumentNum}}</td>
          <td style="padding-left: 10px;" v-else>{{fromdata.superviseCode}}{{fromdata.doucumentNum}}号</td>
        </tr>
        <tr>
          <td style="text-align: center;">登记日期</td>
          <td style="padding-left: 10px;padding-right: 10px;">{{fromdata.registDate}}</td>
          <td style="text-align: center;">结项日期</td>
          <td style="padding-left: 10px;padding-right: 10px;">{{fromdata.finishDate}}</td>
          <td style="text-align: center;" v-if="this.$route.query.openType == 'cb'">截止时间</td>
          <td style="padding-left: 10px;" v-if="this.$route.query.openType == 'cb'">{{fromdata.expectFinishTime}}</td>
          <td style="text-align: center;" v-if="this.$route.query.openType == 'dx'">办理期限</td>
          <td style="padding-left: 10px;" v-if="this.$route.query.openType == 'dx'">{{fromdata.expireDate}}{{fromdata.handleTime}}</td>
        </tr>
        <tr>
            <td style="text-align: center;">督办部门</td>
            <td style="padding-left: 10px;">{{fromdata.superviseDeptName}}</td>
            <td style="text-align: center;">联系人</td>
            <td style="padding-left: 10px;">{{fromdata.contact}}</td>
            <td style="text-align: center;">联系电话</td>
            <td style="padding-left: 10px;">{{fromdata.contactPhone}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">督办依据</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.superviseBasis}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">事由提要</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.summary}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">承办单位</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.undertakeOrgName}}</td>
        </tr>
        <tr>
					<td style="text-align: center;">协办单位</td>
					<td colspan="5" style="padding-left: 10px;">{{fromdata.assistDeptName}}</td>
        </tr>
       	
        <tr class="print_zr">
          <td style="text-align: center">立项审批意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.opinionSuperviseDeptList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}<span>&nbsp;&nbsp;{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">承办单位办理情况</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.opinionSuperviseUndertakeList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}<span>&nbsp;&nbsp;{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">协办单位办理情况</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.opinionAssistFinishList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}<span>&nbsp;&nbsp;{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
				<tr class="print_zr">
          <td style="text-align: center">行领导批示</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.opinionSuperviseOrgList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}<span>&nbsp;&nbsp;{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
				<tr class="print_zr">
          <td style="text-align: center">结项审批意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.opinionSuperviseFinishList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}<span>&nbsp;&nbsp;{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
				<tr class="print_zr">
          <td style="text-align: center">催查记录</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            {{fromdata.record}}
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">一次传阅意见</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.firstOpinions" :key="item.id">
              <div class="d_flex" v-if="item.opinions!=''">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.opinions}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.opinionDeptName}}<span>&nbsp;&nbsp;{{item.curUser}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.opinionCreateTime}} </p> 
                          </div>
                  </el-col>                </el-row>
              </div>
            </div>
          </td>
        </tr>
				<tr class="print_zr">
          <td style="text-align: center">二次传阅意见</td>
          <td colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.secondOpinions" :key="item.id">
              <div class="d_flex" v-if="item.opinions!=''">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.opinions}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.opinionDeptName}}<span>&nbsp;&nbsp;{{item.curUser}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.opinionCreateTime}} </p> 
                          </div>
                  </el-col>                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">传阅说明</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.circulateExplainList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.circulateExplain}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.opinionDeptName}}<span>&nbsp;&nbsp;{{item.sendUserName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">备注</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.superviseRemarkList" :key="item.id">
              <div v-if="item.status" class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10 pad_yj11">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}<span>&nbsp;&nbsp;{{item.userName}}</span></p>
                           <p class="pad_yj10 pd_yj_useTime"> {{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">附件</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <!-- <div v-for="item in fromdata.attchmentFileInfo" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.fileName}}</p>
                          <div class="adviceInfo">
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.createrName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div> -->
            <div v-for="(items,index) in fromdata.attchmentFileInfo"
              :key="items.id"
              class="comp_list"
            >
              <template>
                <div class="command_file">
                  <span class="name down">{{index+1}}.{{items.fileName}}&nbsp;&nbsp;</span>
                  <span class="name">{{items.createrName}}&nbsp;&nbsp;</span>
                  <span class="name">{{items.createTime}}</span>
                </div>
              </template>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">承办附件</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <!-- <div v-for="item in fromdata.underTakeAttchmentFileInfo" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.fileName}}</p>
                          <div class="adviceInfo">
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.createrName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div> -->
            <div v-for="(items,index) in fromdata.underTakeAttchmentFileInfo"
              :key="items.id"
              class="comp_list"
            >
              <template>
                <div class="command_file">
                  <span class="name down">{{index+1}}.{{items.fileName}}&nbsp;&nbsp;</span>
                  <span class="name">{{items.createrName}}&nbsp;&nbsp;</span>
                  <span class="name">{{items.createTime}}</span>
                </div>
              </template>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">协办附件</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <!-- <div v-for="item in fromdata.assistAttchmentFileInfo" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.fileName}}</p>
                          <div class="adviceInfo">
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.createrName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div> -->
            <div v-for="(items,index) in fromdata.assistAttchmentFileInfo"
              :key="items.id"
              class="comp_list"
            >
              <template>
                <div class="command_file">
                  <span class="name down">{{index+1}}.{{items.fileName}}&nbsp;&nbsp;</span>
                  <span class="name">{{items.createrName}}&nbsp;&nbsp;</span>
                  <span class="name">{{items.createTime}}</span>
                </div>
              </template>
            </div>
          </td>
        </tr>
        <tr class="printcy_zr">
          <td style="text-align:center">一次传阅人</td>
          <td colspan="5" style="padding-left:10px">{{fromdata.firstCirculateHumans}}</td>
        </tr>
        <tr class="printcy_zr">
					<td rowspan="2" style="text-align:center">二次传阅人</td>
          <td style="text-align:center">未阅</td>
          <td colspan="4" style="padding-left:10px">{{fromdata.wBJSecondCirculate}}</td>
        </tr>
				<tr class="printcy_zr">
          <td style="text-align:center">已阅</td>
          <td colspan="5" style="padding-left:10px">{{fromdata.yBJSecondCirculate}}</td>
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
        processInstId: "",
        manager:'',
        unitId:this.$route.query.unitId||'',
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
    }
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
    if(this.$route.query.openType == 'cb'){
      let parms = {
        function: "selectCirculateById",
        id: this.$route.query.id,
        mainDocId: this.$route.query.mainDocId,
        multiTenancyId: this.$route.query.multiTenancyId,
        circulateId: this.$route.query.circulateId,
      }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
        this.$post
			.postData(
				"selectCirculateById",
				JSON.stringify(parms),
				this.$businessCode.zxdb
			)
			.then(res => {
				this.fromdata = Object.assign(res.data);
			});
      }
      if(this.$route.query.openType == 'dx'){
        let parms = {
          function: "selectCirculateById",
          id: this.$route.query.id,
          mainDocId: this.$route.query.mainDocId,
          multiTenancyId: this.$route.query.multiTenancyId,
          circulateId: this.$route.query.circulateId,
        }
      if(this.$route.query.type == 'gly'){
        parms = Object.assign({
          manager:'',
          unitId:this.$route.query.unitId,
        },parms)
      }
        this.$post
        .postData(
          "selectCirculateById",
          JSON.stringify(parms),
          this.$businessCode.zxdb
        )
        .then(res => {
          this.fromdata = Object.assign(res.data);
        });
      }
		
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
  font-size: 35px;
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
</style>