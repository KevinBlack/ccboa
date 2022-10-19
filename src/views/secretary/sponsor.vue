<template>
  <div class="tablePrint">
    <!--4.	实物收文处理单
        1)	传统实物收文
        转发文件选择“是”，下方显示转发要求和是否直发两个字段，参考多承办部门实物收文——转发文件选择“是”。
    -->
    <el-row>
         <h1 class="title-h1">主办下级行请示事项办理情况
</h1> 
      <h3 class="title-h1">{{fromdata.documentTitle}}</h3>
      <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
    </el-row>
    <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
      <tbody>
        <!-- <tr v-if="isdb==1">
          <td style="text-align: center;">办理期限</td>
          <td style="padding-left: 10px;">{{fromdata.limitDate}}</td>
          <td style="text-align: center;">办理进度</td>
          <td style="padding-left: 10px;">{{fromdata.progress}}</td>
          <td style="text-align: center;">提前提醒天数</td>
          <td style="padding-left: 10px;">{{fromdata.daysInAdvance}}</td>
        </tr> -->
        <tr>
          <td style="text-align: center">是否办结</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.isEnd}}</td>
        </tr>
        <tr>
          <td style="text-align: center">收文时间</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.receiveTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">文号</td>
          <td style="padding-left: 10px;">{{fromdata.documentCode}}</td>
          <td style="text-align: center;">来文单位</td>
          <td style="padding-left: 10px;">{{fromdata.sendOrgName}}</td>
          <td style="text-align: center;">紧急程度</td>
          <td style="padding-left: 10px;">{{fromdata.emergencyName}}</td>
           </tr>
        <tr>
          <td style="text-align: center;">标题</td>
          <td style="padding-left: 10px;">{{fromdata.title}}</td>
          <td style="text-align: center;">主题词</td>
          <td style="padding-left: 10px;">{{fromdata.topic}}</td>
          <td style="text-align: center">督办时间</td>
          <td id="title" style="padding-left: 10px;">{{fromdata.superviseDate}}</td>
        </tr>
         <tr>
          <td style="text-align: center;">承办部门</td>
          <td colspan="2" style="padding-left: 10px;">{{fromdata.undertakeDeptName}}</td>
          <td style="text-align: center;">协办部门</td>
          <td colspan="2" style="padding-left: 10px;">{{fromdata.archiveDeptName}}</td>
        </tr>
         <tr>
          <td style="text-align: center;">办理期限</td>
          <td style="padding-left: 10px;">{{fromdata.limitDate}}</td>
          <td style="text-align: center;">办理状态</td>
          <td style="padding-left: 10px;">{{fromdata.progress}}</td>
          <td style="text-align: center">办结时间</td>
          <td id="title" style="padding-left: 10px;">{{fromdata.undertakeEndTime}}</td>
        </tr>
        <tr>
          <td style="text-align: center">发送协办时间</td>
          <td id="title" colspan="2" style="padding-left: 10px;">{{fromdata.xbStartTime}}</td>
          <td style="text-align: center">结束协办时间</td>
          <td id="title" colspan="2" style="padding-left: 10px;">{{fromdata.xbEndTime}}</td>
        </tr>

         <tr class="print_zr">
          <td style="text-align: center">办公室批办意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.officeOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">承办部门管理情况</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.undertakeOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr">
          <td style="text-align: center">办结情况</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.helpOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
           <tr class="print_zr">
          <td style="text-align: center">备    注</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.remarksList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr>
         <tr>
          <!-- <td style="text-align: center;">备注</td>
          <td style="padding-left: 10px;">{{fromdata.remarksList}}</td> -->
          <td style="text-align: center;">催办信息</td>
          <td style="padding-left: 10px;">{{fromdata.cbRecord}}</td>
          <td style="text-align: center">催办次数</td>
          <td id="title" style="padding-left: 10px;">{{fromdata.cbCount}}</td>
        </tr>
         <tr>
          <td style="text-align: center">首次催办时间</td>
          <td id="title" colspan="2" style="padding-left: 10px;">{{fromdata.cbFirstTime}}</td>
          <td style="text-align: center">末次催办时间</td>
          <td id="title" colspan="2" style="padding-left: 10px;">{{fromdata.cbLastTime}}</td>
        </tr>

        

        


<!-- 


        <tr>
          <td style="text-align: center;">来文单位</td>
          <td
            colspan="3"
            style="padding-left: 10px;"
          >{{fromdata.sendDeptName}}</td>
          <td style="text-align: center;">成文日期</td>
          <td style="padding-left: 10px;">{{fromdata.completeTime}}</td>
        </tr>
        <tr v-if="isdb==1">
          <td style="text-align: center;">督办人</td>
          <td
            colspan="3"
            style="padding-left: 10px;"
          >{{fromdata.superviser}}</td>
          <td style="text-align: center;">督办日期</td>
          <td style="padding-left: 10px;">{{fromdata.superviseDate}}</td>
        </tr>
        <tr>
          <td style="text-align: center">转发文件</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.isForword == 1?"是":"否"}}</td>
        </tr>
        <tr v-if="fromdata.isForword == 1">
          <td style="text-align: center">转发要求</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.forwordRequirements}}</td>
        </tr>
        <tr v-if="fromdata.isForword == 1">
          <td style="text-align: center;">直发文件</td>
          <td style="padding-left: 10px;">{{fromdata.isDirect == 1?"是":"否"}}</td>
          <td style="text-align: center;">直发范围</td>
          <td style="padding-left: 10px;">{{fromdata.directRange}}</td>
          <td style="text-align: center;">直发文种类</td>
          <td style="padding-left: 10px;">{{fromdata.directType}}</td>
        </tr>
        <tr>
          <td style="text-align: center">保管期限</td>
          <td id="sendBasis" colspan="5" style="padding-left: 10px;">{{fromdata.keepingLimitName}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">登记人</td>
          <td colspan="5" style="padding-left: 10px;">{{fromdata.userName}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">承办部门</td>
          <td colspan="2" style="padding-left: 10px;">{{fromdata.finishUndertakeDeptName}}<div v-if="fromdata.finishUndertakeDeptName&&fromdata.undertakeDeptName">,</div>{{fromdata.undertakeDeptName}}</td>
          <td style="text-align: center;">协办部门</td>
          <td colspan="2" style="padding-left: 10px;">{{fromdata.finishAssistDeptName}}<div v-if="fromdata.finishAssistDeptName&&fromdata.assistDeptName">,</div>{{fromdata.assistDeptName}}</td>
        </tr> -->
        <!-- <tr class="print_zr">
          <td style="text-align: center">批示意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr> -->
        <!-- <tr class="print_zr">
          <td style="text-align: center">办公室批办意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.officeOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr> -->
        <!-- <tr class="print_zr">
          <td style="text-align: center">承办部门办理情况</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.undertakeOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr> -->
        <!-- <tr class="print_zr">
          <td style="text-align: center">协办部门办理情况</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.helpOrgOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="print_zr" v-if="fromdata.circulateOpinionList">
          <td style="text-align: center">传阅意见</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.circulateOpinionList" :key="item.id">
              <div class="d_flex" v-if="item.opinions!=''">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.opinions}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.opinionDeptName}}</p>  
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.curUser}}</span>{{item.opinionCreateTime}} </p> 
                          </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </td>
        </tr> -->
        <!-- <tr class="print_zr">
          <td style="text-align: center">办结情况</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.handleTerminateOpinionList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr> -->
        <!-- <tr class="print_zr">
          <td style="text-align: center">备    注</td>
          <td id="send_send" colspan="5" style="padding-left: 10px;">
            <div v-for="item in fromdata.remarksList" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col>
                    <p class="pad_yj10">{{item.content}}</p>
                          <div class="adviceInfo">
                          <p class="pad_yj10"> {{item.departmentName}}</p>
                           <p class="pad_yj10 pd_yj_useTime"> <span>{{item.userName}}</span>{{item.createTime}} </p> 
                          </div>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </td>
        </tr>
        <tr class="printcy_zr">
          <td rowspan="2" style="text-align:center">传阅人员</td>
          <td style="text-align:center">未阅</td>
          <td colspan="4" style="padding-left:10px">{{fromdata.wbjFirstCirculate}}</td>
        </tr>
        <tr class="printcy_zr">
          <td style="text-align:center">已阅</td>
          <td colspan="4" style="padding-left:10px">{{fromdata.ybjFirstCirculate}}</td>
        </tr> -->
      </tbody>
    </table>
    <!-- </table> -->
       <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
      <caption style="height:50px;line-height:50px">流程记录</caption>
      <!-- <tr>
        <td style="text-align: center">协办部门_类型</td>
        <td id="emergencyLevel" style="padding-left: 10px;" colspan="2">{{fromdata.assistDeptName}}</td>
        <td style="text-align: center"></td>
        <td id="businessType" style="padding-left: 10px;">{{fromdata.businessType}}</td> -->
        <!-- <td style="text-align: center" class="wenzhong">协办开始时间_统计</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong" colspan="2">{{fromdata.assistStartTime}}</td>
      </tr> --> 
      <!-- <tr>
        <td style="text-align: center">协办结束时间_统计</td>
        <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.assistEndTime}}</td>
        <td style="text-align: center">协办部门处理用时_统计</td>
        <td id="businessType" style="padding-left: 10px;">{{fromdata.assistDisposeDuration}}</td>
        <td style="text-align: center" class="wenzhong">协办部门处理用时占比</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.zbDeptRate}}</td>
      </tr> -->

       <tr>
          <td style="text-align: center;">处理环节</td>
          <td style="padding-left: 10px;">{{lcData.nodeName}}</td>
          <td style="text-align: center;">操作时间</td>
          <td style="padding-left: 10px;">{{lcData.completeTime}}</td>
        
        </tr>
          <tr>
              <td style="text-align: center">处理人</td>
          <td id="title" style="padding-left: 10px;">{{lcData.operatorName}}</td>
          <td style="text-align: center">处理记录</td>
          <td id="sendBasis" style="padding-left: 10px;">{{lcData.operation}}</td>
        </tr>

      
    </table>
      <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
      <caption style="height:50px;line-height:50px">统计计算相关信息</caption>
      <tr>
        <td style="text-align: center">发送协办时间_最早</td>
        <td id="emergencyLevel" style="padding-left: 10px;" colspan="2">{{fromdata.xbStartTime}}</td>
        <!-- <td style="text-align: center"></td>
        <td id="businessType" style="padding-left: 10px;">{{fromdata.businessType}}</td> -->
        <td style="text-align: center" class="wenzhong">协办次数</td>
        <td id="textType" style="padding-left: 10px;" colspan="2" class="wenzhong">{{fromdata.xbCount}}</td>
      </tr>
      <tr>
        <td style="text-align: center">发送协办时间_统计</td>
        <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.xbStartTime}}</td>
        <td style="text-align: center">结束协办时间_统计</td>
        <td id="businessType" style="padding-left: 10px;">{{fromdata.xbEndTime}}</td>
        <td style="text-align: center" class="wenzhong">协办反馈用时</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.xbDisposeDuration}}</td>
      </tr>
      <tr>
        <td style="text-align: center">督办时间_统计</td>
        <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.superviseDate}}</td>
        <td style="text-align: center">办结时间_统计</td>
        <td id="businessType" style="padding-left: 10px;">{{fromdata.undertakeEndTime}}</td>
        <td style="text-align: center" class="wenzhong">处理工作日</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.disposeDuration}}</td>
      </tr>
      <tr>
        <td style="text-align: center">承办部门_类型</td>
        <td id="emergencyLevel" style="padding-left: 10px;">{{fromdata.undertakeDeptName}}</td>
        <td style="text-align: center">主办部门处理用时</td>
        <td id="businessType" style="padding-left: 10px;">{{fromdata.assistDisposeDuration}}</td>
        <td style="text-align: center" class="wenzhong">主办部门处理用时占比</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{fromdata.undertakeDisposeDuration}}</td>
      </tr>
    </table>
       <table
      cellspacing="0"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;"
      id="print-table"
    >
      <caption style="height:50px;line-height:50px">协办相关信息</caption>
      <tr>
        <td style="text-align: center">协办部门_类型</td>
        <td id="emergencyLevel" style="padding-left: 10px;" colspan="2">{{hYData.assistDeptName}}</td>
        <!-- <td style="text-align: center"></td>
        <td id="businessType" style="padding-left: 10px;">{{fromdata.businessType}}</td> -->
        <td style="text-align: center" class="wenzhong">协办开始时间_统计</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong" colspan="2">{{hYData.assistStartTime}}</td>
      </tr>
      <tr>
        <td style="text-align: center">协办结束时间_统计</td>
        <td id="emergencyLevel" style="padding-left: 10px;">{{hYData.assistEndTime}}</td>
        <td style="text-align: center">协办部门处理用时_统计</td>
        <td id="businessType" style="padding-left: 10px;">{{hYData.assistDisposeDuration}}</td>
        <td style="text-align: center" class="wenzhong">协办部门处理用时占比</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{hYData.zbDeptRate}}</td>
      </tr>
      
    </table>
    <table
      cellspacing="0"
      border="1"
      cellpadding="0"
      class="printTableList"
      style="font-family: 宋体;font-size: 19px;margin-top:30px"
      id="print-table"
    >
      <tr>
        <td style="text-align: center">协办部门_类型</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{hYData.assistDeptName}}</td>
      </tr>
      <tr>
        <td style="text-align: center">协办开始时间_统计</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{hYData.assistStartTime}}</td>
      </tr>
      <tr>
        <td style="text-align: center">协办结束时间_统计</td>
        <td id="textType" style="padding-left: 10px;" class="wenzhong">{{hYData.assistEndTime}}</td>
      </tr>
    </table>
  </div>
</template>


<script>
import Vue from "vue";
export default {
data() {
    return {
      actionType: "",
      selectedit: true,
      showOrgTree: false,
      showOrgTree1: false,
      hYData: [],
      selectDept: [],
      selectDept1: [],
      isSave: false,
      dialogVisibleShouuhi: false, //收回确定弹窗
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        // code: "",
        filesHas: []
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      showduban: true,
      dubanhtml: "督办",
      isSupervise: "",
      shData: [], //收回数据
      checkedsh: [], //收回列表
      fasongCheckData: [], //fasong
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize: 10
      },
      //tree
      dialogVisibleTree: false,
      treeData: [],
      defaultProps: {
        children: [],
        label: "name",
        isLeaf: "leaf"
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: true
      },
      readFlag: "",
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      deleteIds: "",
      // tableCols: tableCol,
      curNodeName: "",
      referForm: {
        function: "selectQXHDBPage",
        page: 1,
        limit: 10
      },
      timeShow: false, //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      getJDBDropDownDataSource: {
        function: "selectSuperviseTjById"
      },
      //办结
      banjie_fn: {
        function: "doFinish",
        moduleType: "receive_doc_sw"
      },
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      //实物收文下拉数据源
      getReceiveDropDownDataSource: {
        function: "getReceiveDropDownDataSource"
      },
      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      //承办部门树
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //确定完成并发送
      bank_doSend: {
        function: "finishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: ""
      },
      bank_sendXb: {
        function: "createHelpSubWf",
        processInstId: "",
        multiTenancyId: "",
        pcsAvyId: "",
        tplNo: "",
        moduleType: "receive_doc_sw",
        curNodeCode: "",
        deptIds: "",
        deptNames: "",
        id: "",
        avyds: ""
      },
      showCy: true, //传阅都没有意见的显示
      curUser: "",
      curNode: "",
      clickTypes: "",
      appendWriteDialog: true,
      swglCode: this.$businessCode.swgl,
      swglggCode: this.$businessCode.swglgg,
      ggjyCode: this.$businessCode.ggywgn,
      receiveselect: {
        function: "selectSuperviseTjById",
        id: ""
      },
      saveOrUpdateSW: {
        function: "saveOrUpdateSW",
        id: ""
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      lcData: [],
      //直发文件是否
      directFlag: false,
      fromdata: {
        isEnd: "", // 是否办结
        isStatis: "", // 是否纳入统计
        receiveTime: "", // 收文时间
        documentCode: "", // 收文字号
        sendOrgId: "", // 来文单位
        sendOrgName: "",
        emergencyName: "", // 紧急程度
        title: "", // 标题
        topic: "", // 主题词
        undertakeDeptId: "", // 承办部门ID
        undertakeDeptName: "", // 承办部门名称
        archiveDeptId: "", // 归档部门ID
        archiveDeptName: "", // 归档部门名称
        superviseDate: "", // 督办日期
        limitDate: "", // 办理期限
        progress: "", // 办理进度
        undertakeEndTime: "", // 承办结束时间
        xbStartTime: "", // 协办开始时间
        xbEndTime: "", // 协办结束时间
        cbRecord: "", // 催办记录
        cbCount: "", // 催办次数
        cbFirstTime: "", // 首次催办时间
        cbLastTime: "", // 末次催办时间
        xbCount: "", // 协办次数
        xbDisposeDuration: "", // 协办反馈用时
        disposeDuration: "", // 处理工作日
        undertakeDisposeDuration: "", // 主办部门办理时长
        helpFlag: "", // 协办标志：有协办，无协办
        curUser: "", // 当前处理人
        orgId: "", // 收文单位（不包含部门）
        orgName: "", // 收文单位（不包含部门）
        receiveOrgId: "", // 收文单位ID(包含部门)
        receiveOrgName: "", // 收文单位名称
        zbDeptRate: "", //主办部门用时占比
        undertakeDeptName: "",
        assistDisposeDuration: "", // 协办部门处理用时
        documentTitle: "主办下级行请示事项办理情况",
        undertakeOrgOpinionList: "",
        officeOpinionList: ""
        
      },
      selectContents: {
        businessSecretFlagType: "", //商业秘籍
        countrySecretFlagType: "", //国家密级
        directSendType: "", //直发文种类
        emergencyLevel: "", //紧急程度
        receiveType: "",
        secretTimeType: "", //保密期限类型
        secretType: "" //秘密类型
      },
      transIds: "",
      rules: {},
      copyRules: {
        undertakeDeptName: [
          { trigger: "change", required: true, message: "请选择承办部门" }
        ]
      },
      editedIdeaFields: {
        remarks: true,
        pishiOpinion: true,
        officeOpinion: true,
        undertakeOrgOpinion: true,
        handleTerminateOpinion: true,
        helpOrgOpinion: true
      },
      allowBack: "", //收回按钮的判断
      sendIds: [],
      shdialogType: "", //是收回还是催办
      shdialogTypeUnder: "", //是收回还是催办是否加字段
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      selectMicontent: [], //密级数据下拉框
      checkedArr: [],
      keep_limit: "",
      idTab: "",
      idState: "",
      idTabs:'',
    };
  },
  methods: {
    // beforePrint() {
    //   //this.printShow=false;
    // },
    // afterPrint() {
    //   this.printShow = true;
    // },
     receiveselectlist() {
        let receiveselect = {
                function: "selectSuperviseTjById",
                id: this.$route.query.id
            };
       
      
      this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      if (this.idTab == "2") {
        this.$post
          .postData(
            "selectSuperviseTjById",
            JSON.stringify(receiveselect),
            this.swglCode
          )
          .then(res => {
            if (res.data) {
              this.fromdata = res.data;
              this.hYData = res.data.subProcessList;
              this.lcData = res.data.processList;
              this.curUser = res.data.curUser;
              this.curNodeName = res.data.curNodeName;
              this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
              this.bank_selectConfig.tplNo = res.data.tplNo;
              this.bank_sendXb.processInstId = res.data.processInstId;
              this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
              this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
              this.bank_sendXb.tplNo = res.data.tplNo;
              this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
              this.bank_sendXb.curNodeCode = res.data.curNodeCode;
              this.bank_sendXb.id = res.data.id;
              this.bank_doSend.id = res.data.id;
              //督办字段
              this.isSupervise = res.data.isSupervise;
              this.limitDate = res.data.limitDate;
              this.progress = res.data.progress;
              this.daysInAdvance = res.data.daysInAdvance;
              this.superviserName = res.data.superviserName;
              this.superviseDate = res.data.superviseDate;
              //已上传的文件
              this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
              this.fromdata.attachSort = [];
              //getback
              if (res.data.circulateOpinionList) {
                for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                  if (res.data.circulateOpinionList[i].content != "") {
                    this.showCy = false;
                  }
                }
              }
              //反馈处理
              for (let i in this.fromdata.feedbackAttachmentMap) {
                let k = 0;
                this.fkfj.push(i);
                this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i]);
              }
              if (this.fromdata.isDirect == "1") {
                this.fromdata.isDirect = "1";
              } else if (this.fromdata.isDirect == "0") {
                this.fromdata.isDirect = "0";
              }
              if (this.fromdata.isForword == "1") {
                this.fromdata.isForword = "1";
              } else if (this.fromdata.isForword == "0") {
                this.fromdata.isForword = "0";
              }
              if (this.fromdata.isDirect == "1") {
                this.fromdata.isDirect = "1";
              } else if (this.fromdata.isDirect == "0") {
                this.fromdata.isDirect = "0";
              }
              if (this.fromdata.isForword == "1") {
                this.fromdata.isForword = "1";
              } else if (this.fromdata.isForword == "0") {
                this.fromdata.isForword = "0";
              }

              if (res.data.undertakeDeptId) {
                this.chenCheckData = this.concatTreeData(
                  res.data.undertakeDeptId,
                  res.data.undertakeDeptName,
                  "dosend"
                );
              }
              if (res.data.assistDeptId) {
                this.transIds = res.data.assistDeptId;

                this.xieCheckData = this.concatTreeData(
                  res.data.assistDeptId,
                  res.data.assistDeptName
                );
              }
              //临时意见处理
              // this.cuteData(
              //   "pishiOpinion",
              //   "pishiOpinionList",
              //   "pishiOpinionId"
              // );
              // this.cuteData("remarks", "remarksList", "remarksId");
              // this.cuteData(
              //   "handleTerminateOpinion",
              //   "handleTerminateOpinionList",
              //   "handleTerminateOpinionId",
              //   "helpOrgOpinionList",
              //   "undertakeOrgOpinionList"
              // );
              // this.cuteData(
              //   "officeOpinion",
              //   "officeOpinionList",
              //   "officeOpinionId"
              // );
              //收回测试
              // this.$post
              //   .postData(
              //     "checkTakeBack",
              //     JSON.stringify({
              //       function: "checkTakeBack",
              //       processInstId: this.fromdata.processInstId
              //     }),
              //     this.swglggCode
              //   )
              //   .then(res => {
              //     this.allowBack = res.allowBack;
              //   });
            }
          });
      } else if (this.idState) {
        this.receiveselect.id = this.receiveselect.id
          ? this.receiveselect.id
          : sessionStorage.getItem("pageSWid") || "";

        this.$post
          .postData(
            "selectSuperviseTjById",
            JSON.stringify(receiveselect),
            this.swglCode
          )
          .then(res => {
            if (res.data) {
              this.fromdata = res.data;
              this.hYData = res.data.subProcessList;
              this.lcData = res.data.processList;
              this.curUser = res.data.curUser;
              this.curNodeName = res.data.curNodeName;
              this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
              this.bank_selectConfig.tplNo = res.data.tplNo;
              this.bank_sendXb.processInstId = res.data.processInstId;
              this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
              this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
              this.bank_sendXb.tplNo = res.data.tplNo;
              this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
              this.bank_sendXb.curNodeCode = res.data.curNodeCode;
              this.bank_sendXb.id = res.data.id;
              this.bank_doSend.id = res.data.id;
              //督办字段
              this.isSupervise = res.data.isSupervise;
              this.limitDate = res.data.limitDate;
              this.progress = res.data.progress;
              this.daysInAdvance = res.data.daysInAdvance;
              this.superviserName = res.data.superviserName;
              this.superviseDate = res.data.superviseDate;
              //已上传的文件
              this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
              this.fromdata.attachSort = [];
              //getback
              if (res.data.circulateOpinionList) {
                for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                  if (res.data.circulateOpinionList[i].content != "") {
                    this.showCy = false;
                  }
                }
              }
              //反馈处理
              for (let i in this.fromdata.feedbackAttachmentMap) {
                let k = 0;
                this.fkfj.push(i);
                this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i]);
              }
              if (this.fromdata.isDirect == "1") {
                this.fromdata.isDirect = "1";
              } else if (this.fromdata.isDirect == "0") {
                this.fromdata.isDirect = "0";
              }
              if (this.fromdata.isForword == "1") {
                this.fromdata.isForword = "1";
              } else if (this.fromdata.isForword == "0") {
                this.fromdata.isForword = "0";
              }
              if (this.fromdata.isDirect == "1") {
                this.fromdata.isDirect = "1";
              } else if (this.fromdata.isDirect == "0") {
                this.fromdata.isDirect = "0";
              }
              if (this.fromdata.isForword == "1") {
                this.fromdata.isForword = "1";
              } else if (this.fromdata.isForword == "0") {
                this.fromdata.isForword = "0";
              }

              if (res.data.undertakeDeptId) {
                this.chenCheckData = this.concatTreeData(
                  res.data.undertakeDeptId,
                  res.data.undertakeDeptName,
                  "dosend"
                );
              }
              if (res.data.assistDeptId) {
                this.transIds = res.data.assistDeptId;

                this.xieCheckData = this.concatTreeData(
                  res.data.assistDeptId,
                  res.data.assistDeptName
                );
              }
              //临时意见处理
              // this.cuteData(
              //   "pishiOpinion",
              //   "pishiOpinionList",
              //   "pishiOpinionId"
              // );
              // this.cuteData("remarks", "remarksList", "remarksId");
              // this.cuteData(
              //   "handleTerminateOpinion",
              //   "handleTerminateOpinionList",
              //   "handleTerminateOpinionId",
              //   "helpOrgOpinionList",
              //   "undertakeOrgOpinionList"
              // );
              // this.cuteData(
              //   "officeOpinion",
              //   "officeOpinionList",
              //   "officeOpinionId"
              // );
             
            }
          });
      } else if (this.idTabs) {
        this.receiveselect.id = this.receiveselect.id
          ? this.receiveselect.id
          : sessionStorage.getItem("pageSWid") || "";

        this.$post
          .postData(
            "selectSuperviseTjById",
            JSON.stringify(receiveselect),
            this.swglCode
          )
          .then(res => {
            if (res.data) {
              this.fromdata = res.data;
              this.hYData = res.data.subProcessList;
              this.lcData = res.data.processList;
              this.curUser = res.data.curUser;
              this.curNodeName = res.data.curNodeName;
              this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
              this.bank_selectConfig.tplNo = res.data.tplNo;
              this.bank_sendXb.processInstId = res.data.processInstId;
              this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
              this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
              this.bank_sendXb.tplNo = res.data.tplNo;
              this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
              this.bank_sendXb.curNodeCode = res.data.curNodeCode;
              this.bank_sendXb.id = res.data.id;
              this.bank_doSend.id = res.data.id;
              //督办字段
              this.isSupervise = res.data.isSupervise;
              this.limitDate = res.data.limitDate;
              this.progress = res.data.progress;
              this.daysInAdvance = res.data.daysInAdvance;
              this.superviserName = res.data.superviserName;
              this.superviseDate = res.data.superviseDate;
              //已上传的文件
              this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
              this.fromdata.attachSort = [];
           
            
             
              
            }
          });
      }

      this.$post
        .postData(
          "selectSuperviseTjById",
          JSON.stringify(this.getJDBDropDownDataSource),
          this.swglCode
        )
        .then(res => {
        
        });
    },
    printThis() {
      this.printShow = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
    }
  },
   created(){
    // debugger
    this.actionType = this.$route.query.type;
    let that = this;
    // this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.$businessCode.swgl; //流程交易线   chai
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    // debugger
   
    this.idTab = this.$route.query.ids;
    this.idState = this.$route.query.ids;
    this.idTabs = this.$route.query.ids;

    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.receiveselectlist();

  },
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
  top: 50%;
  left: 30%;
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
