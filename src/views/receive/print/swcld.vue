<template>

<!-- 1)	传统实物收文2)	多承办部门实物收文公用页面。其中ctsw为判断传统实物是否显示 -->
<div>

        <div id="printHtml" class="tablePrint">

        <el-row>
            <h1 style="" class="title-h1">中国建设银行电子实物收文处理单1</h1>
        </el-row>
            <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
            <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
			 <!-- <thead style="border:none">
          <th style="border:none" colspan="7" class="th224">
          <p></p>
          </th>
      </thead> -->
       <tbody>
            <tr style="height: 32px;">
                <td style="width:10%;text-align:center">收文日期</td>
                <td style="width:22%;padding-left: 10px;">{{fromdata.receiveTime}}</td>
                <td style="width:10%;text-align:center">紧急程度</td>
                <td style="width:22%;padding-left: 10px;">{{fromdata.emergencyName}}</td>
                <td style="width:10%;text-align:center">登记人</td>
                <td style="width:26%;padding-left: 10px;">{{fromdata.draftUserName}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="width:10%;text-align:center">收文字号</td>
                <td style="width:26%;padding-left: 10px;">{{fromdata.documentCode}}</td>
                <td style="text-align:center">秘密类型</td>
                <td style="padding-left: 10px;">{{fromdata.secretTypeName}}</td>
                <td style="text-align:center" class="biaozhi" id="mjbs">密级和保密期限</td>
                <td style="padding-left: 10px;" class="biaozhi">{{fromdata.security}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">来文单位</td>
                <td colspan="3" style="padding-left: 10px;">{{fromdata.sendOrgName}}</td>
                <td style="text-align:center">成文日期</td>
                <td style="padding-left: 10px;">{{fromdata.completeTime}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">转发文件</td>
                <td colspan="5" style="padding-left: 10px;">{{fromdata.isForword}}</td>
            </tr>
            <tr style="height: 32px;" v-show="iszf">
                <td style="text-align:center">转发要求</td>
                <td colspan="3" style="padding-left: 10px;">{{fromdata.directType}}</td>
                <td style="text-align:center">直发文种类</td>
                <td style="padding-left: 10px;">{{fromdata.isDirect}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">保管期限</td>
                <td colspan="5" style="padding-left: 10px;">{{fromdata.limitDate}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">正文标题</td>
                <td colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">附件标题</td>
                <td colspan="5" style="padding-left: 10px;white-space:pre-line;word-break:break-all">{{fromdata.attachmentTitle}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">主题词</td>
                <td colspan="5" style="padding-left: 10px;">{{fromdata.attachmentTitle}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">业务分类</td>
                <td colspan="5" style="padding-left: 10px;">{{fromdata.attachmentTitle}}</td>
            </tr>
            <tr style="height: 32px;">
                <td style="text-align:center">承办部门</td>
                <td colspan="2" style="padding-left: 10px;">{{fromdata.undertakeDeptName}}</td>
                <td style="text-align:center">协办部门</td>
                <td colspan="2" style="padding-left: 10px;">{{fromdata.assistDeptName}}</td>
            </tr>

            <tr style="height: 255px;">
                <td style="text-align:center">批示意见</td>
                <td colspan="5" style="padding-left: 10px;">

                <!-- <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
                     <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo">
                            {{item.departmentName}}
                            <span class="pad_lr10">{{item.userName}}</span>
                            {{item.createTime}}
                          </div>
                        </el-col>
                        <el-col
                          :span="2"
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                        >
                          <button
                            type="button"
                            class="el-button el-button--default dimi_btn"
                            @click="deletService(item.id)"
                          >
                            <i class="el-icon-delete"></i>
                          </button>
                        </el-col>
                      </el-row>
                    </div>
                  </div> -->


                </td>
            </tr>
             <tr style="height: 100px;" v-if="isDcb">
                <td style="text-align:center">分办意见
                </td>
                <td colspan="5" style="padding-left: 10px;"><div><div><font>{{fromdata.pishiOpinionList}}</font><div class="tcont2" style="text-align:right;"><div><font>　办公室&nbsp;</font><font>办公室综合&emsp;</font><br><font>2019-10-15 16:00:54</font>&nbsp;</div></div></div></div></td>
            </tr>
            <tr style="height: 100px;">
                <td style="text-align:center">办公室<br>批办意见
                </td>
                <td colspan="5" style="padding-left: 10px;">

                     <!-- <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
                     <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo">
                            {{item.departmentName}}
                            <span class="pad_lr10">{{item.userName}}</span>
                            {{item.createTime}}
                          </div>
                        </el-col>
                        <el-col
                          :span="2"
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                        >
                          <button
                            type="button"
                            class="el-button el-button--default dimi_btn"
                            @click="deletService(item.id)"
                          >
                            <i class="el-icon-delete"></i>
                          </button>
                        </el-col>
                      </el-row>
                    </div>
                  </div> -->

                    </td>
            </tr>
            <tr style="height: 100px;">
                <td style="text-align:center">承办部门<br>办理情况</td>
                <td colspan="5" style="padding-left: 10px;">
                    <!-- <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo">
                            {{item.departmentName}}
                            <span class="pad_lr10">{{item.userName}}</span>
                            {{item.createTime}}
                          </div>
                        </el-col>
                        <el-col
                          :span="2"
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                        >
                          <button
                            type="button"
                            class="el-button el-button--default dimi_btn"
                            @click="deletService(item.id)"
                          >
                            <i class="el-icon-delete"></i>
                          </button>
                        </el-col>
                      </el-row>
                    </div> -->
                </td>
            </tr>
            <tr style="height: 100px;">
                <td style="text-align:center">协办部门<br>办理情况</td>
                <td colspan="5" style="padding-left: 10px;">
                    <div>
                        <div v-for="item in fromdata.helpOrgOpinion"><font></font>
                        <div class="tcont2" style="text-align:right;"></div></div>
                    </div>
                </td>
            </tr>
            <tr style="height: 100px;">
                <td style="text-align:center">传阅意见</td>
                <td colspan="5" style="padding-left: 10px;"><div><div><font>fd</font><div class="tcont2" style="text-align:right;"><div><font>　党委办公室&nbsp;</font><font>党委综合&emsp;</font><br><font>2019-12-04 13:56:55</font>&nbsp;</div></div></div></div></td>
            </tr>
            <tr style="height: 100px;">
                <td style="text-align:center">办结情况</td>
                <td colspan="5" style="padding-left: 10px;">
                 <!-- <div v-for="(item) in fromdata.handleTerminateOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo">
                            {{item.departmentName}}
                            <span class="pad_lr10">{{item.userName}}</span>
                            {{item.createTime}}
                          </div>
                        </el-col>
                        <el-col
                          :span="2"
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                        >
                          <button
                            type="button"
                            class="el-button el-button--default dimi_btn"
                            @click="deletService(item.id)"
                          >
                            <i class="el-icon-delete"></i>
                          </button>
                        </el-col>
                      </el-row>
                    </div>
                  </div> -->

                </td>
            </tr>
            <tr style="height: 100px;">
                <td style="text-align:center">备&nbsp;&nbsp;注</td>
                <td colspan="5" style="padding-left: 10px;">

                        <!-- <div v-for="(item) in fromdata.remarksList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
                            :value="item.content"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo">
                            {{item.departmentName}}
                            <span class="pad_lr10">{{item.userName}}</span>
                            {{item.createTime}}
                          </div>
                        </el-col>
                        <el-col
                          :span="2"
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                        >
                          <button
                            type="button"
                            class="el-button el-button--default dimi_btn"
                            @click="deletService(item.id)"
                          >
                            <i class="el-icon-delete"></i>
                          </button>
                        </el-col>
                      </el-row>
                    </div>
                  </div> -->




                </td>
            </tr>
            <tr style="height: 50px;">
                <td rowspan="2" style="text-align:center">传阅人员</td>
                <td style="text-align:center">未阅</td>
                <td colspan="4" style="padding-left:10px"></td>
            </tr>
            <tr style="height: 50px;">
                <td style="text-align:center">已阅</td>
                <td colspan="4" style="padding-left:10px"></td>
            </tr>
        </tbody>
        </table>

        </div>

</div>

</template>


<script>
import Vue from 'vue'
export default {
    data(){
        return{
            pishiOpinionList:"",
            undertakeOrgOpinionList:"",
            handleTerminateOpinionList:"",
            remarksList:"",
            isDcb:"",
            iszf:false,
            printShow:true,
            fromdata:{
                title:"",
                attachmentTitle:"",
                receiveTime:"",
                emergencyName:"",
                documentCode:"",
                secretTypeName:"",
                security:"",
                sendOrgName:"",
                completeTime:"",
                directType:"",
                draftUserName:"",
                forwordRequirements:"",
                isForword:"",
                isDirect:"",
                directRange:"",
                undertakeDeptName:"",
                assistDeptName:"",
                pishiOpinionList:"",
                undertakeOrgOpinionList:"",
                handleTerminateOpinionList:"",
                remarksList:"",
                helpOrgOpinion:"",
                outsideSign:"",
                main:"",
                copy:"",
                inline:"",
                knowScore:"",
                secretGists:"",
                opinionSendList:"",
                opinionDrafList:"",
                commentsList:"",
                opinionCheck:"",
                sendTime:"",
                isSeparate:"",

            }

        }
    },
    methods:{
        printThis(){
            this.printShow=false;
            setTimeout(()=>{
                document.execCommand("print");
            },100)
        },
        beforePrint(){
            //this.printShow=false;
        },
        afterPrint(){
            this.printShow=true;
        },
        cuteData(data, name, type) {
            if (this.fromdata[name]) {
                this.fromdata[name].forEach(item => {
                if (!item.status) {
                    this.fromdata[data] = item.content;
                    this.fromdata[type] = item.id;
                }
                });
            }
            },
            concatAttrData(name, data) {
            this.fromdata[name] = this.fromdata[name]
                ? this.fromdata[name] + data
                : data;
            },
        //initData
        initData(){
            let receiveselect = {
                function: "selectSWById",
                id: this.$route.query.id
            };

            this.$post
            .postData(
                "selectSWById",
                JSON.stringify(receiveselect),
                this.$businessCode.swgl
                )
                .then(res => {

                if (res.data && res.success) {
                    console.log(res.data)
                    Object.assign(this.fromdata,res.data);

                    if (this.fromdata.isDirect == "1") {
                        this.fromdata.isDirect = "是";
                    } else if (this.fromdata.isDirect == "0") {
                        this.fromdata.isDirect = "否";
                    }
                    if (this.fromdata.isForword == "1") {
                        this.fromdata.isForword = "是";
                        this.iszf = true;
                    } else if (this.fromdata.isForword == "0") {
                        this.fromdata.isForword = "否";
                    }

                    //临时意见处理
                        this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
                        this.cuteData("remarks", "remarksList", "remarksId");
                        this.cuteData(
                            "handleTerminateOpinion",
                            "handleTerminateOpinionList",
                            "handleTerminateOpinionId"
                        );
                        this.cuteData(
                            "officeOpinion",
                            "officeOpinionList",
                            "officeOpinionId"
                        );
                }
            });
        }


    },
    created(){
        if(window.matchMedia){
        let MediaQueryList = window.matchMedia('print')
        MediaQueryList.addListener((mql)=>{
                if(mql.matches){
                    this.beforePrint();
                }else{
                    this.afterPrint()
                }
            })
        };

        //initData
        this.initData();

    },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.tablePrint{
    width: 900px;
    margin: 0 auto;
    background-color: white;
}
.printTableList{
    width: 94%;
    margin: 0 auto;
    tr{
        height:32px;
        td{
            width: 12%; text-align: center;vertical-align: middle;
        }
    }
}
.title-h1{
    font-family: 宋体;font-size: 30px;text-align: center;line-height: 100px;
}
.printButton{
    position: absolute;
    right: 28%;
    z-index: 10;
    top: 6%;
}
td {
	border: solid #000 1px;
}
.tcont{padding-bottom:5px;border-bottom:1px solid #DAC6C5;}
.tcont:last-child{
	border-bottom:none;
}
.tcont2{text-align:right;padding-top:5px;width:100%;height:30px;}
.tcont2>div{float:right;
/* background-color:#F2CACB; */
}
.issueTable{
	height:100%;
	border-collapse: collapse;
	border: none;
	width: 100%;
}
.issueTable tr:nth-of-type(1){
	border-top: none;
}
.issueTable tr:last-child{
	border-bottom: none;
}
.issueTable td{
	border: none;
}
 .issueTable tr {
 	  line-height: 25px;
 	  text-align:center;
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
</style>
