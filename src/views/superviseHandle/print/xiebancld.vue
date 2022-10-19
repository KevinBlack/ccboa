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
    <!-- <thead style="border:none">
        <th style="border:none" colspan="6" class="th224">
          <p></p>
        </th>
      </thead> -->
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
          <td style="text-align: center;">截止日期</td>
          <!-- <td style="padding-left: 10px;">{{fromdata.expireDate}}/{{fromdata.handleTime}}</td> -->
          <td style="padding-left: 16px;">{{fromdata.expectFinishTime}}</td>
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
          <td style="text-align: center;">事由提要</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.summary}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">详细描述</td>
          <td colspan="5" style="padding-left: 10px;word-break: break-all;">{{fromdata.detailDescription}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">承办单位</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.undertakeOrgName}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">协办单位</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.assistName}}<span v-if="fromdata.assistFinishDeptName!=''&&fromdata.assistName!=''">;</span>{{fromdata.assistFinishName}}</td>
          <!-- <span v-if="fromdata.assistFinishName&&fromdata.assistName">,</span> -->
        </tr>
        <tr>
            <td style="text-align: center;">督办依据</td>
            <td colspan="5" style="padding-left: 10px;">{{fromdata.superviseBasis}}</td>
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
          <td style="text-align: center">最终意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.opinionFinalList" :key="item.id">
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
          <td style="text-align: center">过程意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.opinionProcessList" :key="item.id">
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
                  <el-col
                    :span="22"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
                  >
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
                  <el-col
                    :span="22"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
                  >
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
                  <el-col
                    :span="22"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
                  >
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
      fkfjList:[],//反馈附件
      fkfj:[],//反馈附件
      fromdata: {
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
    let parms = {
      function: "selAssistById",
      id: this.$route.query.id
    }
    if(this.$route.query.type == 'gly'){
      parms = Object.assign({
        manager:'',
        unitId:this.$route.query.unitId,
      },parms)
    }
		this.$post
			.postData(
				"selAssistById",
				JSON.stringify(parms),
				this.$businessCode.zxdb
			)
			.then(res => {
        this.fromdata = Object.assign(res.data);
			});
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
  word-break: break-all;
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