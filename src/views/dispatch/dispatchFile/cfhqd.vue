<template>
    <div class="tablePrint"> 
        <el-row>
            <h1 style="" class="title-h1">中国建设银行重发会签单</h1>
            <el-button class="printButton" @click="printThis()" type="info" plain>打印</el-button>
        </el-row>
    <table cellspacing="0" cellpadding="0" class="printTableList" style="font-family: 宋体;font-size: 19px;" id="print-table">
            <tbody>
            <tr>
                <td style="text-align: center">正文标题</td>
                <td id="title" colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
            </tr>
            <tr>
                <td style="text-align: center">修改后标题</td>
                <td id="title" colspan="5" style="padding-left: 10px;">{{fromdata.title}}</td>
            </tr>
            <tr>
                <td>发文字号</td>
                <td id="type" style="width: 20%; padding-left: 10px;">{{fromdata.documentNo}}</td>
                <td style="width: 16%; text-align: center">文件形式</td>
                <td id="redHead" style="width: 18%; padding-left: 10px;">{{fromdata.redHead}}</td>
                <td style="width: 11%; text-align: center">原签发人</td>
                <td id="documentNo" style="width: 26%; padding-left: 10px;"></td>
            </tr>
            <tr>
                <td style="text-align: center">主办部门</td>
                <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.draftOrgan}}</td>
                <td style="text-align: center">申请人</td>
                <td id="businessType" style="padding-left: 10px;">{{fromdata.businessType}}</td>
                <td style="text-align: center" class="wenzhong">联系电话</td>
                <td id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.phone}}</td>
            </tr>
             <tr>
                <td style="text-align: center">成文日期</td>
                <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.completeTime}}</td>
                <td style="text-align: center">申请日期</td>
                <td id="businessType" style="padding-left: 10px;">{{fromdata.businessType}}</td>
                <td style="text-align: center" class="wenzhong">重发日期</td>
                <td id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.phone}}</td>
            </tr>
            <tr>
                <td style="text-align: center">会签部门</td>
                <td id="signDepartment" colspan="5" style="padding-left: 10px;">{{fromdata.signDepartment}}</td>
            </tr>
            <tr>
                <td style="text-align: center">重发会签部门</td>
                <td id="signDepartment" colspan="5" style="padding-left: 10px;">{{fromdata.signDepartment}}</td>
            </tr>
            <tr>
                <td style="text-align: center">重发原因</td>
                <td id="signDepartment" colspan="5" style="padding-left: 10px;">{{fromdata.signDepartment}}</td>
            </tr>
            <tr>
                <td style="text-align: center">修改内容</td>
                <td id="signDepartment" colspan="5" style="padding-left: 10px;">{{fromdata.signDepartment}}</td>
            </tr>
            <tr style="height:100px">
                <td style="text-align: center">会签意见</td>
                <td colspan="5" id="opinionSign" style="padding-left: 10px;">{{fromdata.commentsList}}</td>
            </tr>
            <tr>
                <td style="text-align: center">申请部门意见</td>
                <td id="outsideSign" colspan="5" style="padding-left: 10px;">{{fromdata.outsideSign}}</td>
            </tr>
            <tr>
                <td style="text-align: center">部门原会签最终意见</td>
                <td id="main" colspan="5" style="padding-left: 10px;">{{fromdata.main}}</td>
            </tr>
            <tr style="height:100px">
                <td style="text-align: center">部门会签最终意见</td>
                <td colspan="5" id="comments" style="padding-left: 10px;"></td>
            </tr>
            <tr style="height:100px">
                <td style="text-align: center">会签过程意见</td>
                <td colspan="5" id="comments" style="padding-left: 10px;"></td>
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