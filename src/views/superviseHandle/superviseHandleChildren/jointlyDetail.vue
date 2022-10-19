<template>
  <div id="jointlyDetail" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>
        <div>
          <div v-if="state =='2'||state =='3'" class="grid_comtent"> 
            <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
            <el-button size="small" plain @click="shouhuibutton" v-if="fromdata.curNodeCode!=800&&readFlag !='1'&&allowBack==true">收回</el-button>
            <el-button size="small" plain v-if="state == 2" @click="cuibanClick">催办</el-button>
            <el-button size="small" plain @click="flowScheme">查看流程</el-button>
            <el-button size="small" plain @click="processSheet('/xiebancld')">打印处理单</el-button>
            <el-button size="small" plain @click="collect">收藏</el-button>
            <el-button size="small" plain @click="caozuozhinan">操作指南</el-button>
          </div>
          <!-- <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain @click="preserve('save')">保存</el-button>
          <el-button plain @click="completeSending">完成并发送</el-button>
          <el-button plain @click="drafting">起草正文</el-button>
          <el-button plain @click="delectArticle">删除此文</el-button>
          <el-button plain @click="collect">收藏</el-button>
          <el-button plain @click="doAssistFinish">提交最终意见</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <el-button plain @click="processSheet">打印处理单</el-button>
          <el-button plain @click="instructions">操作指南</el-button> -->
          <div v-else class="grid_comtent">
            <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
            <el-button size="small" v-for="(item,index) in buttonList" @click="buttonClick(item.type)" :key="index"
              v-show="buttonList[index].show" 
              v-preventClick
              plain>{{item.name}}
            </el-button>
          </div>
          
        </div>
      </el-col>
    </el-row>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisibleShouuhi"
        width="30%">
        <span>是否收回</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleShouuhi = false">取 消</el-button>
          <el-button type="primary" @click="shouhuibutton">确 定</el-button>
        </span>
      </el-dialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{fromdata.title}}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >反馈意见</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >附件</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前环节：
              <span>{{fromdata.curNodeName}}</span>
            </p>
            <p class="bank_dispach_annotation_current" v-if="state!='3'">
              当前处理人：
              <span>{{fromdata.curUser}}</span>
            </p>
            <p class="bank_article_illustrates bank_dispach_annotation_current"><span>专项督查办事项，请按时处理、及时反馈。</span></p>
          </div>
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="立项依据" prop="projectBase" ref="projectBase">
                    <el-select
                      v-model="fromdata.projectBase"
                      placeholder="请选择"
                      disabled
                      style="width:100%"
                      @change="selectType"
                    >
                      <el-option
                        v-for="sendTypeitem in projectBaseList"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" props="pressingLevel" ref="pressingLevel">
                    <el-select
                      v-model="fromdata.pressingLevel"
                      placeholder="请选择"
                      disabled
                      style="width:100%"
                    >
                      <el-option
                        v-for="emergencyLevelitem in SemergencyLevel"
                        :key="emergencyLevelitem.label"
                        :label="emergencyLevelitem.label"
                        :value="emergencyLevelitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="编号" prop="doucumentNum" ref="doucumentNum">
                     <el-input v-model="fromdata.doucumentNum" plain :title="fromdata.doucumentNum" disabled type="info">{{fromdata.doucumentNum}}</el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记日期" prop="registDate" ref="registDate">
                    <el-input v-model="fromdata.registDate" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结项日期" prop="finishDate" ref="finishDate">
                    <el-input v-model="fromdata.finishDate" disabled ></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                  <el-form-item label="办理期限" prop="expireDate" ref="expireDate">
                    <el-select v-model="fromdata.expireDate"
                      disabled
                     placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="businessType in handleDays"
                        :key="businessType.label"
                        :label="businessType.label"
                        :value="businessType.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2"  style="text-align:right">
                  <el-button plain disabled type="info">{{fromdata.handleTime}}</el-button>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item label="截止时间" prop="expireDate" ref="expireDate">
                    <el-input v-model="fromdata.expectFinishTime" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="督办部门" prop="superviseDeptName" ref="superviseDeptName">
                    <el-input v-model="fromdata.superviseDeptName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人" prop="contact" ref="contact">
                    <el-input v-model="fromdata.contact" disabled></el-input>
                  </el-form-item>
                </el-col>
               <el-col :span="8">
                  <el-form-item label="联系电话" prop="contactPhone" ref="contactPhone">
                    <el-input v-model="fromdata.contactPhone" disabled maxlength="11"  ></el-input>
                  </el-form-item>
                </el-col>
     
                <el-col>
                  <el-form-item label="督办依据" prop="superviseBasis" ref="superviseBasis">
                    <el-input v-model="fromdata.superviseBasis" disabled>
                      <!-- <el-button slot="append" @click="appendMassage(fromdata.hostDepartment)">引入</el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item v-for="(cbdwItem,index) in cbdwList" :key="index" :index="index">
                    <el-input disabled :value="cbdwItem">
                      <el-button slot="append" @click="deleteMassage(index)">删除</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="事由提要" prop="summary" ref="summary">
                    <el-input v-model="fromdata.summary"
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="详细描述">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.detailDescription"
                      maxlength="500"
                      disabled
                      placeholder="填写备注可输入500字"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="承办单位" prop="undertakeOrgName" ref="undertakeOrgName">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.undertakeOrgName"
                        :title="fromdata.undertakeOrgName"
                        disabled
                        class="hqbm"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="协办单位" prop="assistName" ref="assistName">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.assistName"
                        :title="fromdata.assistName"
                        disabled
                        class="hqbm"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label width="0">
                    <el-input
                      v-model="fromdata.assistFinishName"
                      :title="fromdata.assistFinishName"
                      style="min-height:53px !important;"
                      class="rightText"
                      placeholder
                      type="textarea"
                      resize="none"
                      autosize
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                 <el-col class="pr45">
                  <el-form-item label="行领导批示">
                    <!-- <div v-if="fromdata.opinionSuperviseOrgList.length"> -->
                      
                      <el-input type="textarea"
                        resize="none"
                        disabled
                        autosize
                        v-if="!(fromdata.opinionSuperviseOrgList && fromdata.opinionSuperviseOrgList.length)"
                      ></el-input>
                      <opinionText 
                      :opinionText="fromdata.opinionSuperviseOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="false"
                    ></opinionText>
                   </el-form-item>
                </el-col>
                <el-col class="pr45">
                  <el-form-item label="立项审批意见">
                    
                     <el-input type="textarea"
                      resize="none"
                      autosize
                      disabled v-if="!(fromdata.opinionSuperviseDeptList && fromdata.opinionSuperviseDeptList.length)"></el-input>
                      <opinionText 
                      :opinionText="fromdata.opinionSuperviseDeptList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="false"
                    ></opinionText>
                    </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 审批意见 -->
            <h6 class="bank_dispach_file_tit">反馈意见</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col :span="24">
                  <el-form-item label="最终意见" prop="documentNo" ref="documentNo">
                   
                       <el-input type="textarea"
                       resize="none"
                       maxlength="500"
                      autosize v-model="fromdata.opinionFinal" 
                      :disabled="editedIdeaFields.opinionFinal||state== '2' || state == '3'"
                      v-if="!editedIdeaFields.opinionFinal||(editedIdeaFields.opinionFinal 
                      && !(fromdata.opinionFinalList && fromdata.opinionFinalList.length))"
                      ></el-input>
                      <opinionText 
                      :opinionText="fromdata.opinionFinalList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="false"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="过程意见" prop="documentNo" ref="documentNo">
                   
                      <el-input type="textarea"
                        v-model="fromdata.opinionProcess" 
                        resize="none"
                        autosize
                       maxlength="500"
                        :disabled="editedIdeaFields.opinionProcess||state== '2' || state == '3'"
                        v-if="!editedIdeaFields.opinionProcess||(editedIdeaFields.opinionProcess 
                        && !(fromdata.opinionProcessList && fromdata.opinionProcessList.length))"
                      ></el-input>
                      <opinionText 
                      :opinionText="fromdata.opinionProcessList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="true"
                    ></opinionText>
                  </el-form-item>
                </el-col>  
                  
              </el-row>
               <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row class="pr45">
              <!-- <loadAccessory></loadAccessory> -->
              <el-col>
                <el-form-item label="督办附件">
                  <div
                    class="file_list_box"
                    style="margin-left: 0;"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <!-- 预览 -->
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.zxdbfj)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                round
                              >下载</el-button>
                            </div>
                          </div>
                        </template>
                      </div>
                    </el-scrollbar>
                  </div>
                  </el-form-item>
                </el-col>
              <el-col>
              <el-form-item label="承办附件">
                <div class="file_list_box" v-if="fromdata.underTakeAttchmentFileInfo&&fromdata.underTakeAttchmentFileInfo.length" style="margin-left:0;">
                  <el-scrollbar>
                    <div 
                    v-for="(item,index) in fromdata.underTakeAttchmentFileInfo" 
                    :key="item.id" class="comp_list">  
                      <template>
                        <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <!-- 预览 -->
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.zxdbfj)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                          <div class="btns">
                             <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                round
                              >下载</el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>   
                </el-form-item>

              </el-col>
              <el-col>
              <el-form-item label="反馈附件">
              <uploadFiles ref="uploadComponent" style="margin-left:0;" v-if="state != '2'&&state !='3'&&fromdata.curNodeCode!='001'" @preserve="preserve" :uploadConfig="uploadConfig1"></uploadFiles>
                <div class="file_list_box" v-if="fromdata.assistAttchmentFileInfo&&fromdata.assistAttchmentFileInfo.length" style="margin-left:0;">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.assistAttchmentFileInfo" :key="item.id" class="comp_list">  
                      <template>
                        <div class="command_file">
                          <span class="order">{{index+1}}.</span>
                            <!-- 预览 -->
                            <span
                              class="down"
                              :title="item.fileName"
                             @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.zxdbfj)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="warning"
                              size="mini"
                              v-if="state !='2'&&state !='3'"
                              @click.native="deleteRow(index,item.id)"
                              :disabled="item.disabled"
                              round
                            >删除</el-button>
                             <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                round
                              >下载</el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>   
                </el-form-item>

              </el-col>
            </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
     <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="fromdata"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :loadingTree="loadingTree"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";
import opinionText from "@/components/opinionText/index";
import closeMessage from 'components/closeMessage/index';
import viewDraft from "@/minixs/viewDraft";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    appendWriteList,
    uploadFiles,
    opinionText,
    closeMessage
  },
  data() {
    return {
      closeHandler:false,
      defaultUser:{},//完成并发送默认值
      treeTradeCode:"",
      dialogVisibleShouuhi:false,//收回确定弹窗
      readFlag:"",
      allowBack:"",
      state:"1",
      uploadConfig1:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true,
      },
      uploadConfig2:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        width:'0',
        noattachTitleCheck:true,
      },
      uploadConfig:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true,
      },
       //下载文件
      bank_doDownloadFile:{
        function: "doDownloadFile",
        fileName: "",
        filePath:""
      },
      //删除附件
      bank_deleteFileById:{
        function:'deleteFileById',
        id:''
      },
      tableData: [],
      distance_scfj:0,
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      rules: {},
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
     fromdata: {
        handleTime:"",
        attachSort: [],
        attchmentFileInfo: [],
        assistAttchmentFileInfo: [],
        underTakeAttchmentFileInfo:[],
        pcsAvyId:'',
        opinionSuperviseBaseList:[],
        superviseRemarkList:[],
        opinionSuperviseDeptList:[],
        opinionSuperviseOrgList:[],
        opinionSuperviseFinishList:[],
        opinionSuperviseSetupList:"",
        processInstId:'',//流程实例标识
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        curNodeName:'',//当前环节
        curUser:'',//当前环节处理人
        curNodeCode:'',
        circllateName:'',//传阅人名称
        pressingLevel:'',//紧急程度
        projectBase:'',//立项依据
        doucumentNum:'',//编号
        registDate:'',//登记日期
        finishDate:'',//完成时间
        expireDate:'',//办理期限
        expectFinishTime:"",
        superviseDeptName:'',//督办部门
        contact:'',//联系人
        contactPhone:'',//联系人电话
        superviseBasis:'',//督办依据
        summary:'',//事由提要
        detailDescription:'',//详细描述
        undertakeOrgName:'',//承办单位名称
        assistName:'',//协办部门名称
        orgLeaderOpinion:'',// 行领导批示
        deptOpinion:'',//立项审批意见
        projectBaseOpinion:'',//审核意见
        undertakeOrg:'',
        setUpInfo:'',//办结情况
        superviseRemark:'',//督办单备注
        security:'',//密级
        superviseCode:'',
        sendOpinionMaxTime:"",
        assistDeptId:"",
        opinionFinal:'',//最终意见
        opinionProcess:'',//过程意见
        opinionFinalList:[],//最终意见list
        opinionProcessList:[],//过程意见list
        clickSaveAndSend: false ,//点击完成并发送标示
        assistFinishName:'',
        assistFinishDeptId:'',
      },dateList: [
        {
          label: "年"
        },
        {
          label: "月"
        },
        {
          label: "日"
        }
      ],
      //保存
      bank_addToSendOrder: {
        function: "doUpdateByAssist",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
      },
      //确定完成并发送
      bank_doSend: {
        function: "doSendByAssist",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        tplNo: "",
        multiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "selAssistById",
        id: this.$route.query.id,
        tiaoguo: this.$route.query.tiaoguo||'',
        // id: "1"
      },
      //下拉框列表
      bank_dispachfile: {
        function: "selConfigByParam",
        organizationId: ""
      },
      flag: false,
      active: "#wjys",
       scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      timeShow: false, //查看流程
      buttons:[],
      buttonss:[],
      chenCheckData:[],
      assistDeptData:[],dialogTit: "选择下一处理环节和处理人", // 弹框标题benCheckData: [], //本行选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      checkIds: [], //列表
      checkData: [], //选中数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      dialogTypeNow: "" ,//当前弹窗类型
      baoWenZiDuan: this.$businessCode.zxdb,
      treeJyx:this.$businessCode.zxdbgg,
      handleDays:[],
      projectBaseList: [],
      SredHead: [],
      SemergencyLevel: [],
      appendWriteDialog: true,
      xieCheckData:[],//协办部门回显
      cbdwList:[],//督办依据添加
      clickTypes: 1,
      loadingTree:false,
      huanJieMessage:{},
      readFields:{
      },
      requiredFields: {
      },//必填控制域
      editedIdeaFields: {
        opinionProcess: true,
        opinionFinal: true,
      },//可编辑意见域
      requiredIdeaFields: {
        opinionProcess: false,
        opinionFinal: false,
      },//必填意见域
      buttonList: [
        {name: '保存', type: 'btn_bc', show: false},
        {name: "完成并发送", type: "btn_wcbfs", show: false},
        {name: "提交最终意见", type: "btn_tjzzyj", show: false}, 
        {name: "查看流程", type: "btn_cklc", show: false}, 
        {name: "打印处理单", type: "btn_dycld", show: false}, 
        {name: "收藏", type: "btn_sc", show: false}, 
        {name: "操作指南", type: "btn_czzn", show: false}, 
      ],
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanCode,
    }
  },
  mixins: [minixs,viewDraft,isNowUser],
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    cuibanClick(){
      this.$post
        .postData(
          "cuiban",
          JSON.stringify({
            function:"cuiban",
            multiTenancyId:this.fromdata.multiTenancyId,
            processInstId:this.fromdata.processInstId,
            modualType:"assist",
          }),
          this.$businessCode.zxdbgg
        )
        .then(res => {
            if(res.success){
              this.$message({
                type:'success',
                message:'催办成功'
              })
           }else{
             this.$message({
                type:'error',
                message:res.message
              })
           }
        });
    },
    buttonClick(params){
        switch(params){
            case "btn_bc":
                this.preserve('save');
                break;
            case "btn_wcbfs":
                this.completeSendingIsTrue();
                break;
            case "btn_tjzzyj":
                this.doAssistFinish();
                break;
            case "btn_cklc":
                this.flowScheme();
                break;
            case "btn_dycld":
                this.processSheet('/xiebancld');
                break;
            case "btn_sc":
                this.collect();
                break;
            case "btn_czzn":
                this.caozuozhinan();
                break;

        }
    },
    	setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(this.requiredFields, this.huanJieMessage.requiredFields)//必填控制
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
      this.buttonList = this.showButton(this.buttonList, this.huanJieMessage.visibleButtons, this.huanJieMessage.visibleButtonsBycondition)//按钮
      this.editedIdeaFields = this.setEditedIdeaFields(this.editedIdeaFields, this.huanJieMessage.editedIdeaFields, this.huanJieMessage.editedIdeaFieldsBycondition)//可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.huanJieMessage.requiredIdeaFields)//可编辑意见域
    },
    setFormConfig() {
      this.$nextTick(()=>{
        this.rules = {
          opinionProcess: [{required: this.requiredIdeaFields.opinionProcess, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          opinionFinal: [{required: this.requiredIdeaFields.opinionFinal, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
        }
      })
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      })

    },
     //请求部门树数据
    getTreeData(n,m) {
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "chen":
          name = "承办部门";
          clearName = "undertakeOrgName";
          break;
        case "xie":
          name = "协办部门";
          clearName = "assistName";
          break;
        case "fasong":
          name = "发送对象";
          clearName = "assistName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(this.bank_main),
          this.treeJyx
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
          if (that.treeData.length) {
            that.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (that.dialogType === "hui") {
                item.text = item.typeName;
              }
            });
          }
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeOrgName") {
          this.fromdata.undertakeOrg = "";
          this.chenCheckData = [];
        }
        if (name === "assistName") {
          this.fromdata.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
    },
    // 下拉 发文字号获取值
    selectredhead(redHeadITEM) {
      this.fromdata.documentNo = redHeadITEM;
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      // this.getTcDocTypeDicByParam();
    },
    //按钮收回
    shouhuibutton(){
      this.$confirm("是否确定收回并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify({function:"doWithdrawTask",
          pcsAvyId:this.fromdata.pcsAvyId,
          multiTenancyId:this.fromdata.multiTenancyId,
          processInstId:this.fromdata.processInstId}),
          this.$businessCode.zxdbgg
        ).then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1500,
            });
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
              this.handleSetLoacl();
              window.close();
            },1000)
          }else{
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "收回失败",
              duration: 1500,
            });
          }
        })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
        
    },
    //点击 完成并发送 弹窗弹出
     completeSending() {
      this.preserve();
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeNow = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.fromdata.pcsAvyId = this.bank_send.pcsAvyId; 
      this.fromdata.nextNodeId = this.bank_doSend.nextNodeId ; //下以环节id
      this.fromdata.nextNodeName = this.bank_doSend.nextNodeName; 
      this.showCompDialog();
      setTimeout(()=>{
        this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.treeJyx,
          true
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          let parms = Object.assign(this.bank_send,this.fromdata);
          parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
    
          this.$post
            .postData("selWfNode", JSON.stringify(parms), this.treeJyx,true)
            .then(res => {
              if(res.message == "Loading"){
                this.loadingTree = true;
              }else{
                this.loadingTree = false;
              }
              this.treeData = res.data&&res.data.data||[];
              this.defaultUser = res.data&&res.data.defaultUser||{};
            })
            .catch(e => {
            });
        });
      },500)
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(";");
          this.transIds = ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "chen":
            this.fromdata.undertakeOrgName = names;
            this.fromdata.undertakeOrg = ids;
            this.chenCheckData = this.checkData;
            break;
          case "xie":
            this.fromdata.assistName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.fromdata.pcsAvyId = params.pcsAvyId; 
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "chen":
          this.checkIds = this.fromdata.undertakeOrg
            ? this.fromdata.undertakeOrg.split(";")
            : [];
          this.checkData = this.chenCheckData;
          // if (this.dialogTypeBack) {
          //   this.checkData = [];
          //   this.checkIds = [];
          // }
          break;
        case "xie":
          this.checkIds = this.fromdata.assistDeptId
            ? this.fromdata.assistDeptId.split(";")
            : [];
          this.checkData = this.xieCheckData;
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
     //选择人员后 确定完成并发送
    saveSending() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseCirculateList;
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionSuperviseFinishList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.attchmentFileInfo;
      delete parseList.underTakeAttchmentFileInfo;
      let params = Object.assign(this.bank_doSend, this.fromdata);
      this.$post
        .postData("doSendByAssist", JSON.stringify(params), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1500,
            });
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
              this.handleSetLoacl();
              window.close();
            },1500)
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1500
          });
        });
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let result = true;
      this.$refs.fromdata.validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          result = false;
        }
      });
      return result;
    },
    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      if (!this.scrollIntoForm()) {
        return false;
      }
      if (!regT.test(this.fromdata.phone)) {
        tips = "电话号码输入有误";
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1500
        });
        return false;
      } else {
        return true;
      }
    },
 
   // 下拉列表
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "selConfigByParam",
          JSON.stringify(this.bank_dispachfile),
          this.baoWenZiDuan
        )
        .then(res => {
          this.projectBaseList = JSON.parse(res.data.basis)||[];
          this.SemergencyLevel = JSON.parse(res.data.degree)||[];
          this.handleDays = JSON.parse(res.data.handleDays)||[];
          this.SredHead = JSON.parse(res.data.number);
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        });
    },

    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
      this.active = target
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
    //  if (scrolled < this.distance_qpyj) {
    //     this.active = "#wjys";
    //   } else if (
    //     scrolled >= this.distance_qpyj && scrolled <= 1100
    //   ) {
    //     this.active = "#qpyj";
    //   } else if(scrolled < this.distance_scfj) {
    //     this.active = "#scfj";
    //   }
    },
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    async btnCloseHandler(val){
      if(val == 1){
        this.handleSetLoacl();
        window.close();
      }else if(val == 2){
        await this.preserve();
        window.location.href = "about:blank";
        window.opener.location.reload();
        this.handleSetLoacl();
        window.close();
      }else{
        this.closeHandler = false
      }
    },
    // 关闭
    handelclose() {
      if(this.state == 2 || this.state == 3){
        //window.location.href = "about:blank";
        //window.opener.location.reload();
        this.handleSetLoacl();
        window.close();
      }else{
        this.handleClose = true;
      }
    },
    // 删除此文
    delectArticle() {
      this.bank_dispach.id = localStorage.getItem("pageidDBXB") || "";
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      this.bank_DeleteSendOrder.id = deletesendorderid;

      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.bank_dispach.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            this.handleSetLoacl();
            window.close();
          } else {
            this.$post
              .postData(
                "doDeleteSendOrder",
                JSON.stringify(this.bank_DeleteSendOrder),
                this.baoWenZiDuan
              )
              .then(res => {
                this.$message({
                  type: "success",
                  offset: 400,
                  showClose: true,
                  message: "删除成功!"
                });
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();
                window.close();
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 1000
          });
        });
    },
    //点击 完成并发送 弹窗弹出
    completeSendingIsTrue(){
        if(this.fromdata.isReturnBefore == 1){
          this.$confirm("是否返回给：上一处理人?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.fanhuishangyiclr('1');
          }).catch(() => {
            this.completeSending();
          });
        }else{
          this.completeSending();
        }
    },
    fanhuishangyiclr(){
      this.$confirm("是否确定返回上一处理人并关闭当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
          delete copyFrom.opinionSuperviseCirculateList;
          delete copyFrom.opinionSuperviseUndertakeList;
          delete copyFrom.opinionSuperviseSetupList;
          delete copyFrom.opinionSuperviseFinishList;
          delete copyFrom.superviseRemarkList;
          delete copyFrom.opinionSuperviseOrgList;
          delete copyFrom.opinionSuperviseDeptList;
          delete copyFrom.opinionSuperviseBaseList;
          delete copyFrom.feedbackAttachmentMap;
          delete copyFrom.underTakeAttchmentFileInfo;
          delete copyFrom.attchmentFileInfo;
          delete copyFrom.opinionAssistFinishList;
          let params = Object.assign(copyFrom,{function:'doReturnBeforeHuman'})
          this.$post
            .postData(
              "doReturnBeforeHuman",
              JSON.stringify(params),
              this.$businessCode.zxdbgg
            )
            .then(res => {
                if(res.success){
                  this.$message({
                    type:'success',
                    message:'操作成功'
                  })
                  setTimeout(()=>{
                    window.location.href = "about:blank";
                    window.opener.location.reload();
                    this.handleSetLoacl();
                    window.close();
                  },1000)
              }else{
                this.$message({
                    type:'error',
                    message:res.message
                  })
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1000
          });
        });
     
    },
    // 收藏
    collect(){
      this.$confirm("您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
      let obj={
        function:'dbCollection',
        id: this.fromdata.id,//数据id
        flag:'zxdbxb',   //DXDB
        processInstId:this.fromdata.processInstId,
        documentCode: this.fromdata.doucumentNum,  //文号
        curNodeCode: this.fromdata.curNodeCode,   //当前环节编号
        documentTitle:this.fromdata.title  //正文标题
      };
      this.$post
        .postData(
          "dbCollection",
          JSON.stringify(obj),
          this.$businessCode.zxdb
        )
        .then(res => {
          if (res.data && res.data.downloadUrl) {
            let file={
              function: "doDownloadFile",
              filePath:res.data.downloadUrl,
              fileName:res.data.fileName
            }
            this.$post
              .postData("doDownloadFile", JSON.stringify(file), this.$businessCode.nowjts)
              .then(res1 => {
                if (res1) {
                  if (res1 && res1.success) {
                    downLoadFileReName(
                      (this.$post.getEnvState()
                        ? location.origin
                        : "http://localhost:8080") +
                      "/ecpweb/getLocalFile.action?relativePath=" +
                      res1.filePath +
                      "&fileName=" +
                      res1.fileName,
                     res.data.fileName);
                  } else {
                    this.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: "下载失败",
                      duration: 500,
                    });
                  }
                }
              });
          }
        });
        })
    },
    //提交最终意见
    doAssistFinish(){
      if(!this.fromdata.opinionFinal){
          this.$message({
            message:'请填写最终意见',
            type: "error",
            duration: 1500,
          })
          return
      }
      this.$confirm("是否提交最终意见并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
      let bank_commit = {
        function:'doAssistFinish',
      }
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.underTakeAttchmentFileInfo;
      var obj = Object.assign(bank_commit, copyFrom);
      
      this.$post
      .postData(
        "doAssistFinish",
        JSON.stringify(obj),
        this.baoWenZiDuan
      ).then(res=>{
        if(res&&res.success){
          this.$message({
            message:'提交成功',
            type:'success'
          })
          setTimeout(()=>{
            window.location.href = "about:blank";
            window.opener.location.reload();
            this.handleSetLoacl();
            window.close();
          },1500)
        }else{
          this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: res.message,
          duration: 1500
        });
        }
      }).catch(err=>{
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: err.message,
          duration: 1500
        });
        return false;
      })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
            
    },
      //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.treeJyx
        )
        .then(res => {
          if (res) {
            this.tableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          }
        });
    },
    // 打印处理单
    async processSheet(path,id) {
      if(!this.fromdata.id){
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先保存",
          duation: 500
        });
        return
      }
      if(this.state>1){
        const routeData = this.$router.resolve({
          path: path, 
          query: {
              id:this.fromdata.id
          }
        });
        window.open(routeData.href, "_blank");
      }else{
        await this.preserve()
        const routeData = this.$router.resolve({
            path: path, 
            query: {
                id:this.fromdata.id
            }
          });
          window.open(routeData.href, "_blank");
      }
    },
    // 起草正文
    drafting(state) {
      let that = this;
      this.zhengWenState = state;
      if (!this.fromdata.filePath && !this.fromdata.fileName && state != 1) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先上传正文",
          duation: 500
        });
        return;
      }
      if (!this.fromdata.id) {
        this.preserve().then(res => {
          if (res) {
            if (state == 1) {
              this.showDraft = true;
            } else {
              let fileInfo = {
                filePath: this.fromdata.filePath,
                fileName: this.fromdata.fileName
              };
              this.doDraft(fileInfo);
            }
          }
        });
      } else {
        if (state == 1) {
          this.showDraft = true;
        } else {
          this.getFileInfo(that).then(res => {
            if (res.state) {
              //this.doDraft(res);
              let data = this.$router.resolve({
                path: "/openAndSave_Word",
                query: {
                  state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
                  id: this.fromdata.id,
                  zhengWenState: this.zhengWenState,
                  JYcode: this.$businessCode.swglfj,
                  multiTenancyId: this.fromdata.multiTenancyId,
                  relativePath: res ? res.filePath : "",
                  fileName: res ? res.fileName : "",
                  showBtns: false,
                  flowTranId:this.$businessCode.zxdb
                }
              });
              this.showDraft = false;
              this.$forceUpdate();
              window.open(data.href, "_blank");
            }
          });
        }
      }
    },
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      var handbook = flagFile?self.$businessCode.zxdbfj:self.$businessCode.zxdbfj;
      self.bank_doDownloadFile.fileName = flagFile
        ? flagFile.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = flagFile
        ? flagFile.filePath
        : self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          handbook 
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          }else{
             self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    // 操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "ZXDB"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getFileInfo(this,res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.fromdata.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "", 
                    showBtns: false,
          flowTranId:this.$businessCode.zxdbgg
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    handleSave() {},
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //定密依据接收子组件传值
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.fromdata.opinionCheck = this.fromdata.opinionCheck
            ? this.fromdata.opinionCheck + data
            : data;
        } else if (this.clickTypes == 2) {
          this.fromdata.officeOpinion += data;
        } else if (this.clickTypes == 3) {
          this.fromdata.undertakeOrgOpinion += data;
        }
        this.$forceUpdate();
      }
    },
    //删除意见(固化意见)
    deletService(id) {
      this.$post
        .postData(
          "doDeleteOpinionById",
          JSON.stringify({
            function: "doDeleteOpinionById",
            id: id
          }),
          this.$businessCode.zxdb
        )
        .then(res => {
          if (res && res.success) {
            this.toEdit();
            window.location.reload();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1500
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1500
          });
        });
    },
     //初始值 //input框内容
    toEdit() {
      this.uploadConfig1.id = this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageidDBXB") || "";
      this.uploadConfig.id = this.uploadConfig1.id; 
      let that = this;
      this.$post
        .postData(
          "selAssistById",
          JSON.stringify(this.bank_dispach),
          this.baoWenZiDuan
        )
        .then(res => {
          let ymdb = this.state > 1 ? 'fdb':'db'
          this.getIsNowUser(res,'fcy',ymdb)
          that.fromdata = Object.assign(this.fromdata,res.data);
           //收回测试
           if(this.state == 2){
              this.$post
            .postData(
              "checkTakeBack",
              JSON.stringify({function:"checkTakeBack",processInstId:res.data.processInstId}),
              this.$businessCode.zxdbgg
            )
            .then(res => {
              this.allowBack = res.allowBack;
            });
           }
          if(this.state < 2){
            this.$post
              .postData("getNextUserTaskNode", 
              JSON.stringify({function:"getNextUserTaskNode",processInstId:res.data.processInstId}), 
              this.$businessCode.zxdbgg
              )
              .then(res => {
                  this.huanJieMessage = res.data.extAttributes;
                  this.setConfig()
                  this.setFormConfig()
                }).catch((err)=>{
                })
          if(this.readFlag != 1){
            this.$post
              .postData(
                "doUpdateReadRecord",
                JSON.stringify({
                  function:"doUpdateReadRecord",
                  pcsAvyId:res.data.pcsAvyId,
                  processInstId:res.data.processInstId,
                  multiTenancyId:res.data.multiTenancyId
                  }),
                this.$businessCode.zxdbgg
              ).then(res => {
                //更新状态用。暂时不用任何操作
                if(res&&res.success){
                  window.opener.location.reload();
                }
              })
            }
          }
          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.uploadConfig1.filesHas = this.fromdata.assistAttchmentFileInfo;
          this.uploadConfig2.filesHas = this.fromdata.underTakeAttchmentFileInfo;
          this.fromdata.attachSort = [];
          this.bank_selectConfig.curNodeId = res.data.curNodeCode
          this.bank_send.curTplNo = this.bank_selectConfig.tplNo = res.data.pTplNo
          this.bank_send.curMultiTenancyId = this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId
          this.fromdata.superviseRemarkList = res.data.superviseRemarkList||[];
          
          //临时意见处理
          // this.cuteData("orgLeaderOpinion", "opinionSuperviseOrgList", "orgLeaderOpinionId");
          // this.cuteData("deptOpinion", "opinionSuperviseDeptList", "deptOpinionId");
          // this.cuteData("projectBaseOpinion", "opinionSuperviseBaseList", "projectBaseOpinionId");
          // this.cuteData("superviseFinishOpinion", "superviseFinishOpinion", "superviseFinishOpinionId");
          // this.cuteData("setUpInfo", "opinionSuperviseSetupList", "setUpInfoId");
          // this.cuteData("superviseRemark", "superviseRemarkList", "superviseRemarkId");
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: erro,
          //   duration: 1000
          // });
        });
    },
    //保存1
    preserve(type) {
      this.bank_dispach.id = sessionStorage.getItem("pageidDBXB") || "";

      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionAssistFinishList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.assistAttchmentFileInfo;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.opinionSuperviseBaseList;
      var obj = Object.assign(this.bank_addToSendOrder, copyFrom);
      this.$post
        .postData("doUpdateByAssist", JSON.stringify(obj), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            sessionStorage.setItem("pageidDBXB", res.data.id);

            if (type&&type!="uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1500
              });
            }
            if(type==="uploadfile"){
              this.uploadConfig1.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
            }
            this.toEdit();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1500
          });
        });
    },
 // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
        id:this.fromdata.assistAttchmentFileInfo[n-1].id,
        sort:this.fromdata.assistAttchmentFileInfo[n].sort
        },
        {
        id:this.fromdata.assistAttchmentFileInfo[n].id,
        sort:this.fromdata.assistAttchmentFileInfo[n-1].sort
        }
      )
      midObj = this.fromdata.assistAttchmentFileInfo[n];
      this.fromdata.assistAttchmentFileInfo[n] = this.fromdata.assistAttchmentFileInfo[n - 1];
      this.fromdata.assistAttchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
        id:this.fromdata.assistAttchmentFileInfo[n+1].id,
        sort:this.fromdata.assistAttchmentFileInfo[n].sort
        },
        {
        id:this.fromdata.assistAttchmentFileInfo[n].id,
        sort:this.fromdata.assistAttchmentFileInfo[n+1].sort
        }
      )
      midObj = this.fromdata.assistAttchmentFileInfo[n];
      this.fromdata.assistAttchmentFileInfo[n] = this.fromdata.assistAttchmentFileInfo[n + 1];
      this.fromdata.assistAttchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n,id) {
       this.$confirm("是否确定删除此附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            this.bank_deleteFileById.id = id;
            this.$post
              .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById),this.$businessCode.zxdbfj)
              .then(res => {
                if (res) {
                    if (res && res.success) {
                    this.$message({
                      type: "success",
                      showClose: true,
                      offset: 400,
                      message: "删除成功",
                      duration: 1500,
                    });
                    this.fromdata.assistAttchmentFileInfo.splice(n, 1);
                    this.uploadConfig.filesHas = this.fromdata.assistAttchmentFileInfo;
                    this.toEdit();
                  }else{
                    this.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: "删除失败",
                      duration: 1500,
                    });
                  }        
                }
              });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });   
    },
    //正文跳转
    doDraft(fileInfo,saveName){
      let str = "";
      if(!saveName){
        str = this.fromdata.title
      }else{
        str = saveName;
      }
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:this.fromdata.id,
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.swglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          showBtns:false,
          flowTranId:this.$businessCode.zxdbgg,
          saveSpecialFileName:str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();

      window.open(data.href, "_blank");
    },
    viewFile(file){
      let fileType = ['.doc','.docx','.wps','.xls','.xlsx','ppt'];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.zxdbfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map((item)=>{
                if(res.fileName.toLocaleLowerCase().indexOf(item)>-1){
                  openPlugin = true;
                }
              })
              if(openPlugin){
                this.zhengWenState = 0;
                this.doDraft(res)
              }else{
                window.open(((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName)+'&openFile=true','_blank');
              }
              
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 1500
              });
            }
          }
        });
    },
    downFile(file){
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
       this.$post
        .postData("doDownloadFile", JSON.stringify(this.bank_doDownloadFile), this.$businessCode.zxdbfj)
        .then(res => {
          if (res) {
              if (res && res.success) {
                downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName, file.fileName);
              }else{
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 1500,
                });
              }        
          }
        });
    }
  },
  created() {
    this.uploadConfig1.code = this.$businessCode.zxdbfj;
    this.uploadConfig.code = this.$businessCode.zxdbfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.zxdb;  //完成并发送 树 流程交易线   chai
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.bank_doSend.id = this.bank_dispach.id;
    this.state = this.$route.query.state ? this.$route.query.state : "";
   
    this.toEdit();
    this.getSendOrderDicByParam();
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
  height: 90px;
  line-height: 90px;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.bank_dispack_side {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    visibility: hidden;
    width: 180px;
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}

.bank_dispach_content {
  width: 100%;
  height: auto;
  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;
    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      background: #3b85ef;
      color: #fff;
    }
  }

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid red;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: red;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
          right: 10px;
        }
      }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 10px;
    }

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
  }
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
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}
.disable_w {
  width: 100%;
}
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  height: 100%;
}
.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  font-size:14px;
  .one_btn {
    width: 80px;
    height: 42px;
    line-height: 42px;
  }
  .btns {
    width: 300px;
    height: 42px;
    line-height: 42px;
    white-space: nowrap;
    text-align: right;
  }
  .name {
    white-space: nowrap;
    height: 42px;
    line-height: 42px;
    display: inline-block;
    text-overflow: ellipsis;
    width: 200px;
    overflow: hidden;
  }
  .down{
    cursor: pointer;
  }
  .down:hover{
   color: #3b85ef
  }
}
.tab_row {
  height: 50px;
}
.redcolor {
  /deep/.el-input__inner{
    color: red !important;
  }
}
.grid_comtent>.el-button--default .el-button {
  border: 1px solid #fff !important;
  background: #0563c8 !important;
  color: #fff !important;
}
.grid_comtent>.el-button--default:hover{
  background-color: #103ebd !important;
  transform:scale(1.1) !important;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
/deep/ .hqbm .el-textarea__inner {
  min-height: 40px !important; 
}

.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
}
/deep/ .rightText>.el-textarea__inner{
  min-height: 40px !important;
}
</style>
