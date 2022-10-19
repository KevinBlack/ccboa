<template>
    <div class="tablePrint"> 
        <el-row>
            <h1 style="" class="title-h1">中国建设银行流转发文退文单</h1>
            <el-button class="printButton" @click="printThis()" type="info" plain>打印</el-button>
        </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
            <tbody>
            <tr>
                <td>发文类型</td>
                <td id="type" style="width: 20%; padding-left: 10px;">{{fromdata.type}}</td>
                <td style="width: 16%; text-align: center">代字/红头</td>
                <td id="redHead" style="width: 18%; padding-left: 10px;">{{fromdata.redHead}}</td>
                <td style="width: 11%; text-align: center">发文字号</td>
                <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.documentNo}}</td>
            </tr>
            <tr>
                <td style="text-align: center">紧急程度</td>
                <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.emergencyLevel}}</td>
                <td style="text-align: center">业务分类</td>
                <td id="businessType" style="padding-left: 10px;">{{fromdata.businessType}}</td>
                <td style="text-align: center" class="wenzhong">文&nbsp;&nbsp;种</td>
                <td id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.textType}}</td>
            </tr>


            <tr>
                <td>秘密类型</td>
                <td id="type" style="width: 20%; padding-left: 10px;">{{fromdata.secretType}}</td>
                <td style="width: 16%; text-align: center">秘密期限类型</td>
                <td id="redHead" style="width: 18%; padding-left: 10px;">{{fromdata.secretLimitType}}</td>
                <td style="width: 11%; text-align: center">秘密标志</td>
                <td id="documentNo" style="width: 26%; padding-left: 10px;">{{fromdata.workSecretFlag}}</td>
            </tr>
            <tr>
                <td style="text-align: center">主办部门</td>
                <td id="hostDepartment" style="padding-left: 10px;">{{fromdata.draftOrgan}}</td>
                <td style="text-align: center">联合发文单位</td>
                <td id="unionDepartment" colspan="3" style="padding-left: 10px;">{{fromdata.unionDepartment}}</td>
            </tr>

            <tr>
                <td style="text-align: center">拟&nbsp;稿&nbsp;人</td>
                <td id="draftUser" style="padding-left: 10px;">{{fromdata.draftUser}}</td>
                <td style="text-align: center">联系电话</td>
                <td id="phone" style="padding-left: 10px;">{{fromdata.phone}}</td>
                <td style="text-align: center">拟稿日期</td>
                <td id="draftTime" style="padding-left: 10px;">{{fromdata.draftTime}}</td>
            </tr>
            <tr>
                <td style="text-align: center">发文依据</td>
                <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.sendBasis}}</td>
            </tr>
            <tr>
                <td style="text-align: center">直发文件</td>
                <td id="isDirect" style="padding-left: 10px;">{{fromdata.isDirect}}</td>
                <td style="text-align: center">直发范围</td>
                <td id="directRange" style="padding-left: 10px;">{{fromdata.directRange}}</td>
                <td style="text-align: center">直发文种类</td>
                <td id="directType" style="padding-left: 10px;">{{fromdata.directType}}</td>
            </tr>
            <tr>
                <td style="text-align: center">档案利用<br>范围</td>
                <td id="userRange" style="padding-left: 10px;">{{fromdata.userRange}}</td>
                <td style="text-align: center">规章或规范性<br>文件</td>
                <td id="isStandardFile" style="padding-left: 10px;">{{fromdata.isStandardFile}}</td>
                <td style="text-align: center">保管期限</td>
                <td id="keepLimit" style="padding-left: 10px;">{{fromdata.keepLimit}}</td>
            </tr>
            <tr>
                <td style="text-align: center">正文标题</td>
                <td id="title" colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
            </tr>
            <tr>
                <td style="text-align: center">附件标题</td>
                <td id="attachTitle" colspan="5" style="padding-left: 10px;">{{fromdata.attachTitle}}</td>
            </tr>
            <tr>
                <td style="text-align: center">会签部门</td>
                <td id="signDepartment" colspan="5" style="padding-left: 10px;">{{fromdata.signDepartment}}</td>
            </tr>
            <tr>
                <td style="text-align: center">主&nbsp;&nbsp;送</td>
                <td id="main" colspan="5" style="padding-left: 10px;">{{fromdata.main}}</td>
            </tr>
            <tr>
                <td style="text-align: center">抄&nbsp;&nbsp;送</td>
                <td id="copy" colspan="5" style="padding-left: 10px;">{{fromdata.copy}}</td>
            </tr>
            <tr>
                <td style="text-align: center">本行发送</td>
                <td id="inline" colspan="5" style="padding-left: 10px;">{{fromdata.inline}}</td>
            </tr>
            <tr style="height:255px">
                <td style="text-align: center">签发意见</td>
                <td id="send_send" colspan="5" style="padding-left: 10px;">{{fromdata.opinionSendList}}</td>
            </tr>
            <tr style="height:100px">
                <td style="text-align: center">核稿意见</td>
                <td id="opinionDraf" colspan="5" style="padding-left: 10px;">{{fromdata.opinionDrafList}}</td>
            </tr>
            <tr style="height:100px">
                <td style="text-align: center">会签意见</td>
                <td colspan="5" id="opinionSign" style="padding-left: 10px;">{{fromdata.commentsList}}</td>
            </tr>
             <tr style="height:100px">
                <td style="text-align: center">审核意见</td>
                <td colspan="5" id="" style="padding-left: 10px;">{{fromdata.opinionCheck}}</td>
            </tr>
             <tr style="height:100px">
                <td style="text-align: center">备注</td>
                <td colspan="5" id="comments" style="padding-left: 10px;"></td>
            </tr>
            <tr>
                <td style="text-align: center">成文日期</td>
                <td id="completeTime" colspan="2" style="padding-left: 10px;">{{fromdata.completeTime}}</td>
                <td style="text-align: center">发文日期</td>
                <td id="sendTime" colspan="2" style="padding-left: 10px;">{{fromdata.sendTime}}</td>
            </tr>
            <tr>
                <td style="text-align: center">附件分别<br>发送</td>
                <td id="isSeparate" colspan="5" style="padding-left: 10px;">否</td>
            </tr>
        </tbody></table>
    </div>
</template>


<script>
import Vue from 'vue'
export default {
    data(){
        return{
            huiqian:"",//会签页面   
            fromdata:{
                type:"",
                redHead:"",
                documentNo:"",
                emergencyLevel:"",
                businessType:"",
                textType:"",
                secretType:"",
                draftOrgan:"",
                unionDepartment:"",
                draftUser:"",
                phone:"",
                draftTime:"",
                sendBasis:"",
                isDirect:"",
                directRange:"",
                directType:"",
                userRange:"",
                isStandardFile:"",
                keepLimit:"",
                title:"",
                attachTitle:"",
                signDepartment:"",
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
                completeTime:"",
                sendTime:"",
                isSeparate:"",

            }
            
        }
    },
    methods:{
        printThis(){
            document.execCommand("print");
        }
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
    font-family: 宋体;font-size: 35px;text-align: center;line-height: 100px;
}
.printButton{
    position: absolute;
    top: 60%;
    right: 3%;
}
td {
	border: solid #000 1px;
}
.tcont{padding-bottom:5px;border-bottom:1px solid #DAC6C5;}
.tcont:last-child{
	border-bottom:none;
}
.tcont font{
	/* background-color:#F2CACB; */
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

</style>