<!--
 * @Author: your name
 * @Date: 2020-08-01 11:03:25
 * @LastEditTime: 2020-08-04 17:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\blueDetail.vue
-->
/**
* create by zz on 2020/8/1 11:00
* 类注释：
* 备注：
*/
<template>
  <div class="blueDetail">
    <div class="headerClick bank_dispack_side">
      <div class="right grid_comtent">
        <!-- <el-button size="small" @click="closebtn" plain>关闭</el-button> -->
        <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
        <el-button
          size="small"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.type)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
      <!--  || (item.type=='cancelOrder'
      && formData.crrentProcessor===formData.orderUserName && thyy && thyy.length>=2)-->
    </div>
    <div class="blueHeader">
      <div class="title-text">{{pageTitle}}会议室预订单</div>
    </div>
    <div class="process_content bank_dispach_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{formData.crrentLink}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{formData.crrentProcessor}}</span>
          </p>
          <p
            class="headmsg"
            v-if="formData.approvalTimeLimit"
          >{{'该会议室审批有效期限剩余'+formData.approvalTimeLimit+'天'}}</p>
        </div>
      </div>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用日期" prop="meetUseDate" ref="meetUseDate">
              <el-date-picker
                v-model="formData.meetUseDate"
                value-format="yyyy-MM-dd"
                :disabled="readFields.meetUseDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间范围" prop="meetStartTime" ref="meetStartTime">
              <el-time-select
                style="width:50%;"
                placeholder="起始时间"
                v-model="formData.meetStartTime"
                :disabled="readFields.meetStartTime || (formData.crrentLink=='起草'&&isBackQc=='0') || isFirst == false"
                :picker-options="{
                    start: meetUseTime_start,
                    step: '00:30',
                    end: '24:00',
                    maxTime:formData.meetEndTime
                  }"
              ></el-time-select>
              <el-time-select
                style="width:50%;"
                placeholder="结束时间"
                v-model="formData.meetEndTime"
                :disabled="readFields.meetEndTime || (formData.crrentLink=='起草'&&isBackQc=='0') || isFirst == false"
                :picker-options="{
                    start: meetUseTime_start,
                    step: '00:30',
                    end: '24:00',
                    minTime: formData.meetStartTime
                  }"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议类型" prop="meetType" ref="meetType">
              <el-select
                style="width:100%"
                v-model="formData.meetType"
                @change="checkMeetType"
                :disabled="readFields.meetType"
              >
                <el-option
                  v-for="(item,index) in meetingTypeList"
                  :key="index"
                  :label="item.paramName"
                  :value="item.paramName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议室名称">
              <el-input maxlength="25" v-model="formData.roomName" :disabled="readFields.roomName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="参会人数" prop="attendNums" ref="attendNums">
              <el-input maxlength="10" v-model="formData.attendNums" @input="toNumber(formData.attendNums,'attendNums')" @change="checkNum" :disabled="readFields.attendNums"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议室座位数" prop="roomSeat" ref="roomSeat">
              <el-input maxlength="10" v-model="formData.roomSeat" @input="toNumber(formData.roomSeat,'attendNums')" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否涉密" prop="isSecrete" ref="isSecrete">
              <el-radio-group v-model="formData.isSecrete" :disabled="readFields.isSecrete">
                <el-radio
                  v-for="item in isSeceretRelated"
                  :label="item.key"
                  :key="item.key"
                >{{item.value}}</el-radio>
              </el-radio-group>
              <p style="color: red;line-height: 1.0;font-size: 12px;" v-if="formData.isSecrete===0">会议开始前，请提示参会人员将手机存放至会场外的手机存放柜中，并宣布会议保密纪律；会议进行中，请打开手机信号屏蔽器；全程妥善保管会议涉及的秘密文件（材料）；会议结束后，请对会场进行检查，避免秘密文件（材料）遗失；会议录音拷贝需经本部门主要负责人同意。</p>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所需服务" prop="needServices" ref="needServices">
              <el-checkbox-group
                v-model="formData.needServices"
                v-if="serviceList.length>0"
                :disabled="readFields.needServices"
              >
                <el-checkbox
                  v-for="item in serviceList"
                  :label="item.paramName"
                  :key="item.paramCode"
                >{{item.paramName}}</el-checkbox>
              </el-checkbox-group>
              <el-input v-if="serviceList.length==0" value="无提供服务" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称" prop="meetingName" ref="meetingName">
              <el-input maxlength="25" v-model="formData.meetingName" :disabled="readFields.meetingName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主办部门" prop="hostDepartment" ref="hostDepartment">
              <el-input v-model="formData.hostDepartment" :disabled="readFields.hostDepartment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="主持行领导" prop="hostName" ref="hostName">
              <el-input v-model="formData.hostName" :disabled="readFields.hostName" maxlength="200">
                <el-button
                  slot="append"
                  icon="el-icon-circle-plus-outline"
                  :disabled="readFields.hostName"
                  @click="selectLeader('hostLeader')"
                >选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="参会行领导" prop="attendUsers" ref="attendUsers">
              <el-input v-model="formData.attendUsers" :disabled="readFields.attendUsers" maxlength="200">
                <el-button
                  slot="append"
                  icon="el-icon-circle-plus-outline"
                  :disabled="readFields.attendUsers"
                  @click="selectLeader('attendLeader')"
                >选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人" prop="orderUserName" ref="orderUserName">
              <el-input v-model="formData.orderUserName" :disabled="readFields.orderUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人联系电话" prop="orderUserPhon" ref="orderUserPhon">
              <el-input  maxlength="200" v-model="formData.orderUserPhon" @input="toNumber(formData.orderUserPhon,'orderUserPhon','phone')" :disabled="readFields.orderUserPhon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会议内容" prop="conferenceContent" ref="conferenceContent">
          <el-input
            type="textarea"
            :autosize="{minRows: 2, maxRows: 6}"
            v-model="formData.conferenceContent"
            :disabled="readFields.conferenceContent"
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-row class="pr45">
          <el-form-item label="审核意见" prop="auditComment" ref="auditComment">
            <div v-if="!editedIdeaFields.auditComment">
              <el-radio-group v-model="formData.opinionRadio" @change="addinput">
                <el-radio :label="'同意'">同意</el-radio>
                <el-radio :label="'不同意'">不同意</el-radio>
              </el-radio-group>
            </div>
            <div style="display:flex" v-if="!editedIdeaFields.auditComment||formData.auditComment||(shyj && shyj.length==1 && shyj[0].status==0)||(shyj && shyj.length==0)">
              <el-input
                type="textarea"
                resize="none"
                maxlength="500"
                autosize
                style="flex:1"
                @input="inputChange"
                @focus="autoAdd"
                v-model="formData.auditComment"
                :disabled="editedIdeaFields.auditComment"
              ></el-input>
              <button
                @click="writelistbox(clickTypes=0,formData.auditComment&&formData.auditComment.length)"
                v-if="!editedIdeaFields.auditComment"
                type="button"
                class="el-button el-button--default dimi_btn"
              >
                <i class="el-icon-edit"></i>
              </button>
            </div>
            <div v-if="!(shyj && shyj.length==1 && shyj[0].status==0)">
              <opinionText
                :opinionText="shyj"
                :sendOpinionMaxTime="formData.maxTime"
                :nowUserId="nowUserId"
                @deletService="deletService"
                :curNodeCode="formData.pcsnodeid"
              ></opinionText>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="pr45">
          <el-form-item label="申请部门意见" prop="applicatPartComment" ref="applicatPartComment">
            <div style="display:flex" v-if="!editedIdeaFields.applicatPartComment||formData.applicatPartComment||(sqbmyj && sqbmyj.length==1 &&sqbmyj[0].status==0)||(sqbmyj && sqbmyj.length==0)">
              <el-input
                type="textarea"
                resize="none"
                maxlength="500"
                autosize
                style="flex:1"
                @input="inputChange"
                v-model="formData.applicatPartComment"
                :disabled="editedIdeaFields.applicatPartComment"
              ></el-input>
              <button
                @click="writelistbox(clickTypes=1,formData.applicatPartComment&&formData.applicatPartComment.length)"
                v-if="!editedIdeaFields.applicatPartComment"
                type="button"
                class="el-button el-button--default dimi_btn"
              >
                <i class="el-icon-edit"></i>
              </button>
            </div>
            <div v-if="!(sqbmyj && sqbmyj.length==1 && sqbmyj[0].status==0)">
              <opinionText
                :opinionText="sqbmyj"
                :sendOpinionMaxTime="formData.maxTime"
                :nowUserId="nowUserId"
                @deletService="deletService"
                :curNodeCode="formData.pcsnodeid"
              ></opinionText>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="pr45">
          <el-form-item label="用户使用评价" prop="userEvaluation" ref="userEvaluation">
            <div style="display:flex" v-if="!editedIdeaFields.userEvaluation||formData.userEvaluation||(yhsypj && yhsypj.length==1 &&yhsypj[0].status==0)||(yhsypj && sqbmyj.length==0)">
              <el-input
                type="textarea"
                resize="none"
                maxlength="500"
                autosize
                style="flex:1"
                @input="inputChange"
                v-model="formData.userEvaluation"
                :disabled="editedIdeaFields.userEvaluation"
              ></el-input>
              <button
                @click="writelistbox(clickTypes=5,formData.userEvaluation&&formData.userEvaluation.length)"
                v-if="!editedIdeaFields.userEvaluation"
                type="button"
                class="el-button el-button--default dimi_btn"
              >
                <i class="el-icon-edit"></i>
              </button>
            </div>
            <div v-if="!(yhsypj && yhsypj.length==1 && yhsypj[0].status==0)">
              <opinionText
                :opinionText="yhsypj"
                :sendOpinionMaxTime="formData.maxTime"
                :nowUserId="nowUserId"
                @deletService="deletService"
                :curNodeCode="formData.pcsnodeid"
              ></opinionText>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="pr45">
          <el-form-item label="备注" prop="meetRemark" ref="meetRemark">
            <div v-if="!editedIdeaFields.meetRemark||formData.meetRemark||(bz && bz.length==1 && bz[0].status==0)||(bz && bz.length==0)">
              <el-input
                type="textarea"
                resize="none"
                maxlength="500"
                autosize
                placeholder="如有特殊要求，请填写相关信息"
                @input="inputChange"
                v-model="formData.meetRemark"
                :disabled="editedIdeaFields.meetRemark"
              ></el-input>
            </div>
            <div v-if="!(bz && bz.length==1 && bz[0].status==0)">
              <opinionText
                :opinionText="bz"
                :sendOpinionMaxTime="formData.maxTime"
                :nowUserId="nowUserId"
                @deletService="deletService"
                :curNodeCode="formData.pcsnodeid"
                :isRemarks="true"
              ></opinionText>
            </div>
          </el-form-item>
        </el-row>
        <el-row v-if="formData.cancelReason">
          <el-form-item label="取消原因">
            <el-input type="textarea" :rows="3" v-model="formData.cancelReason" disabled></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="thyy && thyy.length>0 && !(thyy.length==1 && thyy[0].status==0)">
          <el-form-item label="退回原因">
            <opinionText
              :opinionText="thyy"
              :canDelet="false"
            ></opinionText>
          </el-form-item>
        </el-row>
        <el-row v-if="isUpload==='是'">
          <el-form-item label="附件">
            <uploadFile
              ref="uploadComponent"
              @preserve="preserve"
              @initsearch="getFormDataById"
              :uploadConfig="uploadConfig"
            ></uploadFile>
            <el-col>
              <div class="file_list_box"
                    v-if="formData.attchment&&formData.attchment.length" style="margin: 20px 0 0 0px;">
                <el-scrollbar  style="padding: 0px 15px 0 0;">
                  <div v-for="(item,index) in  formData.attchment" :key="index" class="comp_list">
                    <template>
                      <div class="command_file">
                        <span class="order">{{index+1}}.</span>
                        <!-- 预览 -->
                        <span
                          class="down"
                          :title="item.fileName"
                          @click="viewDraftFile(item.fileName,item.filePath,$businessCode.hysydfj)"
                        >{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="time">{{item.createTime}}</span>
                        <div class="btns">
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="downRow(item,'up')"
                            v-if="formData.attchment.length>1"
                            :disabled="index==0  || formData.isLock == 1 || uploadConfig.subTempAddF"
                            round
                          >上移</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="downRow(item,'down')"
                            v-if="formData.attchment.length>1"
                            :disabled="(index==formData.attchment.length-1)  || (formData.isLock == 1) || uploadConfig.subTempAddF"
                            round
                          >下移</el-button>
                          <el-button
                            type="warning"
                            size="mini"
                            @click.native="deleteRow(index,item.id)"
                            :disabled="item.disabled || formData.isLock == 1 || uploadConfig.subTempAddF"
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
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <treeCofig
      :defaultUser="defaultUser"
      :treeData="treeData"
      :treeTradeCode="treeTradeCode"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :titleWords="titleWords"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="formData"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></treeCofig>
    <treeLeader
      :title="dialogTit"
      :dialogType="dialogType"
      :isSingle="false"
      :dialogVisible="leaderDialogVisible"
      :checkData="checkData"
      :checkIds="checkIds"
      @visible="showLeaderDialog"
      @closed="closeDialog"
    ></treeLeader>
    <el-dialog
      v-dialogDrag
      title="退回申请人"
      width="30%"
      :visible.sync="backtoApplicatDialog"
      append-to-body
    >
      <span>请说明退回原因</span>
      <el-input type="textarea" :rows="3" maxlength="500" v-model="backReasonDailog.backReason"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="backtoApplicatDialog = false">取消</el-button>
        <el-button type="primary" @click="sureBackApplication">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="取消预订"
      width="30%"
      :visible.sync="cancelOrderDialog"
      append-to-body
    >
      <span>请说明取消预订原因</span>
      <el-input type="textarea" :rows="3" maxlength="500" v-model="cancelReasonDailog.cancelReason"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderDialog = false">取消</el-button>
        <el-button type="primary" @click="sureCancelOrder">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="提示"
      :visible.sync="messageDialog"
      width="20%"
      append-to-body
      >
      <div style="padding: 50px;text-align: center;color: #000;">如召开视频会议，需提前与视频会议室管理员联系，电话:{{formData.roomPhone}}</div>
    </el-dialog>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      :offenDevices="offenDevices"
      @deleteCommonUse="deleteCommonUse"
      @addCommonUse="addCommonUse"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
  </div>
</template>

<script type="text/ecmascript-6">
import treeCofig from "@/components/tree/tree-fawen";
import treeLeader from "@/components/tree/leaderTree";
import timeDialog from "@/components/timedialog/timedialog";
import minixs from "@/minixs/index";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import opinionText from "@/components/opinionText/index";
import closeMessage from '@/components/closeMessage/index';
import uploadFile from "@/components/uploadFile/meetUploadlFile";
import viewDraft from "@/minixs/viewDraft";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "blueDetail",
  components: { treeCofig, timeDialog, treeLeader, appendWriteList,opinionText,closeMessage,uploadFile},
  mixins: [minixs,viewDraft,isNowUser],
  data() {
    return {
      closeHandler:false,
      pageTitle: "",
      status: "", //1
      backtoApplicatDialog: false, //退回申请人弹窗
      cancelOrderDialog: false, //取消预订弹窗
      leaderDialogVisible: false, //领导人弹窗
      appendWriteDialog: false, //常用意见弹窗
      messageDialog:false,//提示信息弹窗
      timeShow: false, //查看流程弹窗
      curNodeName: "", //当前环节
      currentUser: "", //当前处理人
      meetUseTime_start: "",
      isBackQc: "", //是否为重新流转回的当前环节 0是 1否
      isFirst:"false",//是否可以编辑时间 true是，false否
      approvalType: "1", //是否审批
      isLeaderUse:"",//是否行领导专用
      islock: false, //会议室在选择的使用时间段是否被占用
      rules: {},
      formData: {
        approvalTimeLimit: "", //距离审批失效时间
        multitenancyid: "", //多实体标识
        id: "",
        roomId: "",
        roomName: "", //会议室名称
        roomSeat:"",
        meetUseDate: "",
        meetStartTime: "",
        meetEndTime: "",
        hostDepartment: "",
        hostDepartmentId: "",
        orderUserName: "",
        orderUserPhon: "",
        guaranteeNums: "", //保障人数
        meetRemark: "", //备注
        meetingName: "", //会议名称
        meetType: "", //会议类型
        meetFormart: "", //会议形式
        isSecrete: 1, //是否涉密
        attendNums: "", //参会人数
        conferenceContent: "", //会议内容
        useFor: "", //用途
        topicName: "", //议题
        hostName: "", //主持行领导
        hostNameId: "", //主持行领导id
        attendUsers: "", //参会行领导
        attendUsersId: "", //参会行领导id
        needServices: [], //所需服务
        serviceList: [], //所需服务列表
        auditComment: "", //审核意见
        applicatPartComment: "", //申请部门意见
        userEvaluation: "", //用户使用评价
        backReason: "", //退回原因
        cancelReason: "", //取消原因
        maxTime: "" ,//最后一条意见创建时间
        opinionRadio:'1', //同意/不同意
        attchment: [],//附件
      },
      serviceList: [], //所需服务列表
      thyy: [{ status: 0 }], //退回原因列表
      shyj: [{ status: 0 }], //审批意见列表
      bz: [{ status: 0 }], //备注列表
      sqbmyj: [{ status: 0 }], //申请部门意见列表
      yhsypj: [{ status: 0 }], //用户使用评价
      defaultUser: {}, //完成并发送默认值
      dialogTypeNow: "",
      treeData: [], //树数据
      canTab: false, //标示是否左右三列布局
      loadingTree: false,
      hasRadio: false, //是否有单选
      setradio: "1", //默认为 是 按照顺序
      dialogType: "", //弹窗类型
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      titleWords: "选择部门",
      checkIds: [], //列表
      checkData: [], //完成并发送选中数据
      hostLeaderCheckData: [], //主持行领导选中数据
      attendLeaderCheckData: [], //参会行领导选中数据
      singelCheckF: true, // 单选true 多选为false
      addSendType: "",
      fixNoLoadingTree: false,
      dialogState: false,
      offenUse: false, //标示常用设置
      seletOptionsData: [], //弹窗下拉框数据
      checkOrg: false, //传阅多选
      sequenceFlag: false,
      treeTradeCode: "", //完成并发送  树  拆
      processInstId: "",
      tableData: [], //查看流程表格数据
      huanJieMessage: {}, //环节控制
      showHj: {},
      multiTenancyId: "", //多实体标识
      isProcessInstId: "", //是否有环节控制
      readFlag: "", //表单已读未读
      //只读
      readFields: {
        roomName: false, //会议室名称
        roomSeat:false,//会议室座位数
        meetUseDate: false,
        meetStartTime: false,
        meetEndTime: false,
        hostDepartment: false,
        orderUserName: false,
        orderUserPhon: false,
        meetingName: false, //会议名称
        meetType: false, //会议类型
        isSecrete: false, //是否涉密
        attendNums: false, //参会人数
        conferenceContent: false, //会议内容
        hostName: false, //主持行领导
        attendUsers: false, //参会行领导
        needServices: false, //所需服务
        auditComment: true, //审核意见
        applicatPartComment: true, //申请部门意见
        userEvaluation: false, //用户使用评价
        backReason: true, //退回原因
        cancelReason: true //取消原因
      },
      //必填控制域
      requiredFields: {
        roomName: false, //会议室名称
        meetUseDate: false,
        meetStartTime: false,
        meetEndTime: false,
        hostDepartment: false,
        orderUserName: false,
        orderUserPhon: false,
        meetRemark: false, //备注
        meetingName: false, //会议名称
        meetType: false, //会议类型
        isSecrete: false, //是否涉密
        attendNums: false, //参会人数
        conferenceContent: false, //会议内容
        hostName: false, //主持行领导
        attendUsers: false, //参会行领导
        needServices: false, //所需服务
      },
      //意见域必填控制
      requiredIdeaFields: {
        auditComment: false, //审核意见
        applicatPartComment: false, //申请部门意见
        userEvaluation: false //用户使用评价
      },
      //意见域是否可编辑
      editedIdeaFields: {
        auditComment: true, //审核意见
        applicatPartComment: true, //申请部门意见
        userEvaluation: true, //用户使用评价
        backReason: false, //退回原因
        cancelReason: false, //取消原因
        meetRemark: true, //备注
      },
      isMeetManager: false, //是否会议室管理员
      //流程按钮组
      // 【关闭】【保存】【完成并发送】【退回申请人】【预定】
      // 【同意预定】【取消预定】【查看流程】【打印处理单】【操作指南】
      buttonList: [
        { name: "保存", type: "saveOrder", show: false },
        // { name: "删除此文", type: "deleteDoc", show: false },
        { name: "完成并发送", type: "saveAndSend", show: false },
        { name: "退回申请人", type: "backApplication", show: false },
        { name: "预订", type: "order", show: false },
        { name: "同意预订", type: "orderSucc", show: false },
        { name: "取消预订", type: "cancelOrder", show: false },
        // { name: "收回", type: "holdBack", show: false },
        { name: "查看流程", type: "review", show: false },
        { name: "打印处理单", type: "printCase", show: false },
        { name: "操作指南", type: "operatTip", show: false }
      ],
      //会议类型
      meetingTypeList: [],
      //会议形式
      meetingFormList: [
        { key: 0, value: "会议" },
        { key: 1, value: "会见" }
      ],
      isSeceretRelated: [
        { key: 0, value: "涉密" },
        { key: 1, value: "非涉密" }
      ],
      //行领导
      leaderList: [],
      //确定完成并发送
      doFinishedSend: {
        function: "saveAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        curNodeCode: ""
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      //获取页面数据
      bank_dispach: {
        function: "getRoomOrderDetail",
        id: "",
        meetUseDate: "",
        roomId: ""
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "delOpionByid",
        id: ""
      },
      //常用批示意见
      bank_selectCommonUseList: {
        function: "selectCommonUseList",
        id: "",
        userId: "",
        userName: "",
        content: "",
        sort: "",
        createtime: ""
      },
      //当前用户id
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanCode,
      clickTypes: 1, //TYPE 0审核意见 1申请部门意见 2备注 3取消原因 4退回原因 5用户使用评价
      //常用意见
      offenDevices: [],
      //下拉框列表
      bank_dispachfile: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      //保存
      saveFun: {
        function: "startOrder",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "", //部门人员名字
        sequenceSign: ""
      },
      //删除此文
      deleteDoc: {
        function: "delCurrent",
        id: ""
      },
      //收回
      sendTackFuc: {
        function: "retrieveTask"
      },
      //退回申请人
      backReasonDailog: {
        function: "doBackTask",
        backReason: ""
      },
      //预订
      orderFun: {
        function: "order"
      },
      //取消预订弹窗取消预订原因
      cancelReasonDailog: {
        function: "cancelOrder",
        cancelReason: ""
      },
      //同意预订
      agreeOrderFun: {
        function: "doTaskFinished"
      },
      //是否上传附件
      isUpload:'否',
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        attachTitle: "", //附件标题
        noattachTitleCheck:true,//是否不校验附件名称
        subTempAddF: false, //是否可以上传附件 true是不能上传   false是可以上传
        width:'0',//附件组件中的margin-left值
      },
      //附件上移，下移
      bank_upDownFile: {
        function: "changeAttachSort",
        fileId: "",
        sortType: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
    };
  },
  computed: {},
  methods: {
    async useTimeChange(rule, value, callback) {
      if (
        this.formData.crrentLink == "起草" &&
        this.isBackQc == "1" &&
        this.formData.meetStartTime &&
        this.formData.meetEndTime
      ) {
        await this.checkUseTime();
      }
    },
    closeWindow() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      this.handleSetLoacl();
      window.close();
    },
    closebtn() {
      if (this.buttonList[0].show) {
        this.closeHandler=true;
      } else {
        this.closeWindow();
      }
    },
    // async btnCloseHandler(val){
    //   if(val == 1){
    //     window.close();
    //   }else if(val == 2){
    //     await this.preserve();
    //     window.location.href = "about:blank";
    //     window.opener.location.reload();
    // this.handleSetLoacl();window.close();
    //   }else{
    //     this.closeHandler = false
    //   }
    // },

   

    async btnCloseHandler(val){
      var that = this;
      if(val == 1){
        that.handleSetLoacl();window.close();
      }else if(val == 2){
        await that.preserve();
        window.location.href = "about:blank";
        window.opener.location.reload();
        that.handleSetLoacl();
        window.close();
      }else{
        that.closeHandler = false
      }
    },
    buttonClick(params) {
      switch (params) {
        //保存
        case "saveOrder":
          this.preserve(0);
          break;
        //删除此文
        // case "deleteDoc":
        //   this.delectArticle();
        //   break;
        // 保存并发送
        case "saveAndSend":
          this.completeSending();
          break;
        //退回申请人
        case "backApplication":
          this.backApplication();
          break;
        //预订
        case "order":
          this.order();
          break;
        //取消预订
        case "cancelOrder":
          this.cancelOrder();
          break;
        //同意预订
        case "orderSucc":
          this.agreeOrder();
          break;
        //收回
        case "holdBack":
          this.sendTackBtn();
          break;
        // 查看流程
        case "review":
          this.flowScheme();
          break;
        // 打印处理单
        case "printCase":
          this.processSheet();
          break;
        // 操作指南
        case "operatTip":
          this.instructions();
          break;
      }
    },
    //退回申请人
    backApplication() {
      this.backtoApplicatDialog = true;
    },
    //退回申请人点击确定
    sureBackApplication() {
      if(this.backReasonDailog.backReason && this.backReasonDailog.backReason.length>0){
        let parseList = JSON.parse(JSON.stringify(this.formData));
        var obj = Object.assign(parseList, this.backReasonDailog);
        this.$post
          .postData("doBackTask", JSON.stringify(obj), this.$businessCode.hysyd)
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "退回成功",
                duration: 1000,
                onClose: () => {
                  window.location.href = "about:blank";
                  window.opener.location.reload();
                  this.handleSetLoacl();
                  window.close();
                }
              });
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message==""?"退回失败":res.message,
                duration: 2000
              });
            }
            this.backtoApplicatDialog = false;
          })
          .catch(err => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退回失败",
              duration: 2000
            });
            this.backtoApplicatDialog = false;
          });
      }else{
        this.$message.error('请填写退回原因！')
      }
    },
    //预订
    order() {
      let judge = true;
      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
      let parseList = JSON.parse(JSON.stringify(this.formData));
      var obj = Object.assign(parseList, this.orderFun);
      this.$post
        .postData("order", JSON.stringify(obj), this.$businessCode.hysyd)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "预订成功",
              duration: 1000,
              onClose: () => {
                this.closeWindow();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.data && res.data.error,
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "网络错误",
            duration: 2000
          });
        });
    },
    //取消预订
    cancelOrder() {
      this.cancelOrderDialog = true;
    },
    //取消预订确定
    sureCancelOrder() {
      if(this.cancelReasonDailog.cancelReason && this.cancelReasonDailog.cancelReason.length>0){
        let parseList = JSON.parse(JSON.stringify(this.formData));
        var obj = Object.assign(parseList, this.cancelReasonDailog);
        this.$post
          .postData("cancelOrder", JSON.stringify(obj), this.$businessCode.hysyd)
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "取消预订成功",
                duration: 1000,
                onClose: () => {
                  window.location.href = "about:blank";
                  window.opener.location.reload();
                  this.handleSetLoacl();
                  window.close();
                }
              });
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: "取消预订失败",
                duration: 2000
              });
            }

            this.cancelOrderDialog = false;
          })
          .catch(err => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "网络错误",
              duration: 2000
            });
            this.cancelOrderDialog = false;
          });
      }else{
        this.$message.error('请填写取消原因！')
      }
    },
    //同意预订
    agreeOrder() {
      let parseList = JSON.parse(JSON.stringify(this.formData));
      var obj = Object.assign(parseList, this.agreeOrderFun);
      this.$post
        .postData(
          "doTaskFinished",
          JSON.stringify(obj),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "操作成功",
              duration: 1000,
              onClose: () => {
                this.closeWindow();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "操作失败",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "网络错误",
            duration: 2000
          });
        });
    },
    //收回
    sendTackBtn() {
      this.$confirm(
        "是否确定收回？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              this.sendTackHandle();
            }
          }
        }
      );
    },
    //收回弹窗确定操作
    sendTackHandle() {
      let parseList = JSON.parse(JSON.stringify(this.formData));
      var obj = Object.assign(parseList, this.sendTackFuc);
      this.$post
        .postData("retrieveTask", JSON.stringify(obj), this.$businessCode.hysyd)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败",
            duration: 2000
          });
        });
      this.sendTackVisible = false;
    },
    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "HYSYDSP"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.formData.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.formData.multitenancyid,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
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
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify({function:"doDownloadFile",fileName:flagFile.fileName,filePath:flagFile.filePath}),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
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
    //表单控制
    biaoDKz(loadingFlag) {
      if (this.isProcessInstId) {
        this.$post
          .postData(
            "getNextUserTaskNode",
            JSON.stringify({
              function: "getNextUserTaskNode",
              processInstId: this.isProcessInstId
            }),
            this.$businessCode.hysyd,
            null,
            loadingFlag
          )
          .then(res => {
            if (res.data) {
              this.huanJieMessage = Object.assign(
                this.huanJieMessage,
                res.data.extAttributes
              );
            }
            this.showHj =
              (res.data &&
                res.data.extAttributes &&
                res.data.extAttributes.acyNodeNextBount) ||
              {};

            this.setConfig();
            this.setFormConfig();
            setTimeout(() => {
              this.$refs.formData.clearValidate();
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$post
          .postData(
            "getpcsTplStartNode",
            JSON.stringify({
              function: "getpcsTplStartNode",
              multiTenancyId: this.isMultiTenancyId
            }),
            this.$businessCode.hysyd,
            null,
            loadingFlag
          )
          .then(res => {
            if (res.data) {
              this.huanJieMessage = res.data;
            }
            this.showHj =
              (res.data &&
                res.data.extAttributes &&
                res.data.acyNodeNextBount) ||
              {};
            this.setConfig();
            this.setFormConfig();
            setTimeout(() => {
              this.$refs.formData.clearValidate();
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //可编辑意见域
      //主持行领导必填控制
      if(this.isLeaderUse=='1'){
        this.requiredFields.hostName=true;
      }else{
        this.requiredFields.hostName=false;
      }
      if(!(this.formData.crrentLink == "起草" && this.isBackQc == "1")){
        this.buttonList[5].show=true;//取消预订按钮显示
      }
    },
    meetTime_required (rule, value, callback) {
      if (this.requiredFields.meetEndTime && !this.formData.meetEndTime) {
        callback(new Error("请选择结束时间"));
      } else {
        if(this.formData.meetStartTime && this.formData.meetEndTime){
          if(new Date(this.formData.meetUseDate+' '+this.formData.meetStartTime)<new Date()){
            if(new Date().getMinutes()<30){
              this.meetUseTime_start=new Date().getHours()+':30'
            }else{
              this.meetUseTime_start=(new Date().getHours()+1)+':00'
            }
            callback(new Error("请重新选择时间!"));
          }else{
            callback();
          }
        }else{
          callback();
        }
      }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          meetUseDate: [
            {
              required: this.requiredFields.meetUseDate,
              trigger: "change",
              message: "请输入使用时间"
            }
          ],
          meetStartTime: [
            {
              required: this.requiredFields.meetStartTime || this.requiredFields.meetEndTime,
              trigger: "change",
              message: "请选择起始时间"
            },
            { validator: this.meetTime_required, trigger: "change" }
          ],
          /*meetEndTime: [
            {
              required: this.requiredFields.meetEndTime,
              trigger: "change",
              message: "请输入会议结束时间"
            }
          ],*/
          hostDepartment: [
            {
              required: this.requiredFields.hostDepartment,
              trigger: "change",
              message: "请输入主办部门"
            }
          ],
          orderUserName: [
            {
              required: this.requiredFields.orderUserName,
              trigger: "change",
              message: "请输入申请人姓名"
            }
          ],
          orderUserPhon: [
            {
              required: this.requiredFields.orderUserPhon,
              trigger: "change",
              message: "请输入申请人联系电话"
            }
          ],
          guaranteeNums: [
            {
              required: this.requiredFields.guaranteeNums,
              trigger: "change",
              message: "请输入保障人数"
            }
          ],
          meetRemark: [
            {
              required: this.requiredFields.meetRemark,
              trigger: "change",
              message: "请输入备注"
            }
          ],
          meetingName: [
            {
              required: this.requiredFields.meetingName,
              trigger: "change",
              message: "请输入会议名称"
            }
          ],
          meetType: [
            {
              required: this.requiredFields.meetType,
              trigger: "change",
              message: "请输入会议类型"
            }
          ],
          meetFormart: [
            {
              required: this.requiredFields.meetFormart,
              trigger: "change",
              message: "请输入会议形式"
            }
          ],
          isSecrete: [
            {
              required: this.requiredFields.isSecrete,
              trigger: "change",
              message: "请选择是否涉密"
            }
          ],
          attendNums: [
            {
              required: this.requiredFields.attendNums,
              trigger: "change",
              message: "请输入参会人数"
            }
          ],
          conferenceContent: [
            {
              required: this.requiredFields.conferenceContent,
              trigger: "change",
              message: "请输入会议内容"
            }
          ],
          useFor: [
            {
              required: this.requiredFields.useFor,
              trigger: "change",
              message: "请输入用途"
            }
          ],
          topicName: [
            {
              required: this.requiredFields.topicName,
              trigger: "change",
              message: "请输入议题"
            }
          ],
          hostName: [
            {
              required: this.requiredFields.hostName,
              trigger: "change",
              message: "请添加主持行领导"
            }
          ],
          attendUsers: [
            {
              required: this.requiredFields.attendUsers,
              trigger: "change",
              message: "请添加参会行领导"
            }
          ],
          needServices: [
            {
              required: this.requiredFields.needServices,
              trigger: "change",
              message: "请选择所需服务"
            }
          ],
          auditComment: [
            {
              required: this.requiredFields.topicName,
              trigger: "change",
              message: "请输入审核意见"
            }
          ],
          applicatPartComment: [
            {
              required: this.requiredFields.applicatPartComment,
              trigger: "change",
              message: "请输入申请部门意见"
            }
          ]
        };
      });

      this.$forceUpdate();
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let result = true;
      this.$refs.formData.validate((valid, object) => {
        if (!valid) {
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
    // 保存 type 0:保存 1完成并发送 2打印前先保存
    async preserve(type, loadingFlag) {
      let judge = true;
      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
      let successState = false;
      let parseList = JSON.parse(JSON.stringify(this.formData));
      var obj = Object.assign(this.saveFun, parseList);
      await this.$post
        .postData(
          "startOrder",
          JSON.stringify(obj),
          this.$businessCode.hysyd,
          null,
          loadingFlag
        )
        .then(res => {
          if (res && res.success) {
            this.saveFun.id = getFormId(
              this.$route.query.id,
              "hysydid",
              res.data.po.id
            );
            this.bank_selectConfig.curNodeId = res.data.po.pcsnodeid;
            this.bank_selectConfig.curTplNo = res.data.po.tplno;
            this.bank_selectConfig.curMultiTenancyId =
              res.data.po.multitenancyid;
            this.doFinishedSend.curNodeCode = res.data.po.pcsnodeid;
            //更新表单控制
            this.isProcessInstId = res.data.po.pcsinst;
            this.isMultiTenancyId = res.data.po.multitenancyid;
            this.deleteDoc.id = res.data.po.id;
            this.biaoDKz(loadingFlag);
            if (type == 0) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
              this.getFormDataById(1)
              window.opener.location.reload();
            }
              // this.$refs.formData.validate((valid) => {
              //   if(!valid){
              //     return false;                 
              //   }else if(type == 0){
              //     this.$message({
              //       type: "success",
              //       showClose: true,
              //       offset: 400,
              //       message: "保存成功",
              //       duration: 1000,
              //     });
              //     this.getFormDataById(1)
              //     window.opener.location.reload();
              //   }
              // })
              
            if(type=='uploadfile'){
              this.uploadConfig.id = res.data.po.id;
              this.$refs.uploadComponent.uploadFileNow('1');
            }
            //所需服务格式转化
            this.formData = Object.assign(
              this.formData,
              JSON.parse(JSON.stringify(res.data.po))
            );
            if (
              this.formData.needServices &&
              typeof this.formData.needServices == "string"
            ) {
              if (this.formData.needServices.length > 0) {
                this.formData.needServices = this.formData.needServices.split(
                  ";"
                );
              } else {
                this.formData.needServices = [];
              }
            } else {
              this.formData.needServices = [];
            }
            this.shyj = res.data.shyj;
            this.sqbmyj = res.data.sqbmyj;
            this.bz = res.data.bz;
            this.thyy = res.data.thyy;
            this.formData.maxTime = res.data.maxTime;
            successState = true;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1000
          });
        });
      return successState;
    },

    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
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
          newIds = newIds.join(";");
          newNames = newNames.join(";");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.formData.nextNodeId = params.id; //下以环节id
          this.formData.nextNodeName = params.name; //下一环节名称
          this.formData.nextUserName = names;
          this.formData.nextUserId = ids;
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
    //选择人员后 确定完成并发送
    saveSending() {
      let copyFrom = JSON.parse(JSON.stringify(this.formData));
      let obj = Object.assign(this.doFinishedSend, copyFrom);
      this.$post
        .postData("saveAndSend", JSON.stringify(obj), this.$businessCode.hysyd)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();
                window.close();
              }
            });
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.data,
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1000
          });
        });
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "dosend": //完成并发送
          this.checkIds = [];
          this.checkData = [];
          break;
        case "hostLeader": //主持行领导
          // this.checkIds = this.formData.hostNameId
          //   ? this.formData.hostNameId.split(";")
          //   : [];
          // this.checkData = this.hostLeaderCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "attendLeader": //参会行领导
          // this.checkIds = this.formData.attendUsersId
          //   ? this.formData.attendUsersId.split(";")
          //   : [];
          // this.checkData = this.attendLeaderCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
      }
    },
    //校验会议室使用时间是否已占用
    async checkUseTime() {
      if (
        this.formData.crrentLink == "起草" &&
        this.isBackQc == "1" &&
        this.formData.meetStartTime &&
        this.formData.meetEndTime
      ) {
        let httpData = {
          operationType: "7",
          function: "hys",
          roomId: this.formData.roomId,
          meetStartTime:
            this.formData.meetUseDate +
            " " +
            this.formData.meetStartTime +
            ":00",
          meetEndTime:
            this.formData.meetUseDate + " " + this.formData.meetEndTime + ":00"
        };
        const res = await this.$post
          .postData("hys", JSON.stringify(httpData), this.$businessCode.hysyd)
          .then(res => {
            //isLock     0被占用   1未占用
            if (res && res.success) {
              if (res.isLock == "0") {
                this.islock = true;
                this.$message.error("当前会议室已被占用！");
              } else if (res.isLock == "1") {
                this.islock = false;
                this.$refs.formData.validateField("meetStartTime", "111");
              }
            }
          })
          .catch(err => {
            //this.$message.error("网络异常");
          });
      }
    },
    //点击 完成并发送 弹窗弹出
    async completeSending() {
      let judge = true;
      let that = this;
      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
      await this.checkUseTime();
      if (this.islock) {
        return;
      }
      this.dialogTit = "完成并发送";
      this.titleWords = "选择部门";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeNow = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.preserve(1).then(res => {
        if (res) {
          this.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.$businessCode.hysyd
            )
            .then(res => {
              //带约束条件判断环节
              this.seletOptionsData = res.data || [];

              //传值 1.所有的环节 2.带约束条件的环节
              this.seletOptionsData = this.shoNextNode(
                this.seletOptionsData,
                this.showHj
              );

              let parms = Object.assign(this.bank_send, this.formData);
              parms.pcsAvyId = this.bank_send.pcsAvyId =
                res.data && res.data[0].PCSAVYID;
              parms.curTplNo = this.bank_send.curTplNo =
                res.data && res.data[0].PTPLNO;
              parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
                res.data && res.data[0].MULTITENANCYID;
              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(parms),
                  this.$businessCode.hysyd
                )
                .then(res => {
                  if(res.success){
                    this.treeData = res.data.data || [];
                    if (res.message == "Loading") {
                      this.loadingTree = true;
                    } else {
                      this.loadingTree = false;
                    }
                    this.defaultUser = (res.data && res.data.defaultUser) || {};
                  }else{
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message: res.message,
                      duration: 1000
                    });
                  }
                })
                .catch(e => {
                  console.log(e);
                });
            });
        }
      });
    },
    //选择行领导弹窗
    async selectLeader(type) {
      this.dialogTit = "选择行领导";
      this.dialogType = type;

      if (type == "hostLeader") {
        this.titleWords = "主持行领导";
        this.showLeaderDialog(null, null, type);
      } else {
        this.titleWords = "参会行领导";
        this.showLeaderDialog(null, null, type);
      }
    },
    showLeaderDialog(data, status, type) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        that.checkData = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(";");
          this.transIds = ids = ids.join(";");
          newIds = newIds.join(";");
          newNames = newNames.join(";");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        switch (type) {
          case "hostLeader": //主持行领导
            this.formData.hostName =
              !this.formData.hostName ||
              this.formData.hostName.substr(-1) == ";"
                ? this.formData.hostName + names
                : this.formData.hostName + ";" + names;
            //this.formData.hostNameId=ids;
            //this.hostLeaderCheckData=this.checkData;
            break;

          case "attendLeader": //参会行领导
            this.formData.attendUsers =
              !this.formData.attendUsers ||
              this.formData.attendUsers.substr(-1) == ";"
                ? this.formData.attendUsers + names
                : this.formData.attendUsers + ";" + names;
            //this.formData.attendUsersId=ids;
            //this.attendLeaderCheckData=this.checkData;
            break;
        }
      }
      this.leaderDialogVisible = !this.leaderDialogVisible;
      if (this.leaderDialogVisible) {
        //打开弹窗数据回显
        this.backDialogData(type);
      }
    },
    closeDialog(visible) {
      this.leaderDialogVisible = visible;
    },
    // 删除此文
    delectArticle() {
      let copyFrom = JSON.parse(JSON.stringify(this.formData));
      this.deleteDoc = Object.assign(copyFrom, this.deleteDoc);
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.deleteDoc.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            this.handleSetLoacl();
            window.close();
          } else {
            this.$post
              .postData(
                "delCurrent",
                JSON.stringify(this.deleteDoc),
                this.$businessCode.hysyd
              )
              .then(res => {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 1000,
                    onClose: () => {
                      window.location.href = "about:blank";
                      window.opener.location.reload();
                      this.handleSetLoacl();
                      window.close();
                    }
                  });
                } else {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "删除失败",
                    duration: 1000
                  });
                }
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
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.formData.pcsinst;
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.hysyd
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
    processSheet() {
      this.preserve(2).then(res => {
        if (res) {
          const routeData = this.$router.resolve({
            path: "/meeting/yd/meetingRoomYDPrint",
            query: {
              id: this.formData.id,
              roomId:this.formData.roomId,
            }
          });
          window.open(routeData.href, "_blank");
        }
      });
    },
    getMeetTypeList(type) {
      //type:1会议类型；0所需服务
      let httpData = {
        function: "doFindParams",
        paramType: type
      };
      this.$post
        .postData(
          "doFindParams",
          JSON.stringify(httpData),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            if (type == "1") {
              this.meetingTypeList = res.data;
            } else {
              this.serviceList = res.data;
              this.formData.serviceList = res.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(erro => {
          this.$message.error("请求失败");
        });
    },
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        // 0审核意见 1申请部门意见
        if (this.clickTypes == 0) {
          // 审核意见
          this.formData.auditComment = this.formData.auditComment
            ? this.formData.auditComment + data
            : data;
          if (
            this.formData.auditComment &&
            this.formData.auditComment.length >= 500
          ) {
            this.formData.auditComment = this.formData.auditComment.substr(
              0,
              500
            );
          }
        } else if (this.clickTypes == 1) {
          // 申请部门意见
          this.formData.applicatPartComment = this.formData.applicatPartComment
            ? this.formData.applicatPartComment + data
            : data;
          if (
            this.formData.applicatPartComment &&
            this.formData.applicatPartComment.length >= 500
          ) {
            this.formData.applicatPartComment = this.formData.applicatPartComment.substr(
              0,
              500
            );
          }
        }else if(this.clickTypes == 5){//用户使用评价
          this.formData.userEvaluation = this.formData.userEvaluation
            ? this.formData.userEvaluation + data
            : data;
          if (
            this.formData.userEvaluation &&
            this.formData.userEvaluation.length >= 500
          ) {
            this.formData.userEvaluation = this.formData.userEvaluation.substr(
              0,
              500
            );
          }
        }
        this.$forceUpdate();
      }
    },
    // 获取常用批示意见
    getCommonUse() {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "selectCommonUseList";
      this.$post
        .postData(
          "selectCommonUseList",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.offenDevices = res.data;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 1000
          });
        });
    },
    // 新增常用批示意见
    addCommonUse(flag, id, content) {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.content = content;
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "doSaveCommonUse";
      this.$post
        .postData(
          "doSaveCommonUse",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.getCommonUse();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 1000
          });
        });
    },
    // 删除常用批示意见
    deleteCommonUse(flag, id, content) {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "doDeleteCommonUseList";
      this.$post
        .postData(
          "doDeleteCommonUseList",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.getCommonUse();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 1000
          });
        });
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "delOpionByid",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.getFormDataById(1);
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 2000
          });
        });
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    writelistbox(btnType, num) {
      this.clickTypes = btnType;
      if (num >= 500) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "当前字数超出500字",
          duration: 2000
        });
        return;
      }
      this.appendWriteDialog = true;
      this.getCommonUse();
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //初始值
    getFormDataById(loadingFlag,flags) {
      let that = this;
      this.bank_dispach.id = getFormId(this.$route.query.id, "hysydid");
      this.$post
        .postData(
          "getRoomOrderDetail",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.hysyd,
          null,
          loadingFlag
        )
        .then(res => {
          console.log(res.data,"------------>>>>??")
          
          if (res.data) {
            this.getIsNowUser(res,'fcy','db');
            let data = JSON.parse(JSON.stringify(res.data));
            this.uploadConfig.filesHas=data.attchment && JSON.parse(JSON.stringify(data.attchment));
            this.formData.attchment=data.attchment && JSON.parse(JSON.stringify(data.attchment));
            this.serviceList = [];
            let services = "";
            this.isUpload=data.isUpload;//是否上传附件 是\否
            if(flags){
              this.preserve();
              return
            }
            if (data.po.id) {
              if(!flags){
                this.formData = Object.assign(
                  this.formData,
                  JSON.parse(JSON.stringify(res.data.po))
                );
              }
              this.formData.roomPhone = data.roomPhone;
              this.formData.curNodeCode =res.data.po.pcsnodeid;
              if(!this.$route.query.meetStartTime){
                if(new Date()>new Date(this.formData.meetUseDate)){
                  if(new Date().getMinutes()<30){
                    this.meetUseTime_start=new Date().getHours()+':30'
                  }else{
                    this.meetUseTime_start=(new Date().getHours()+1)+':00'
                  }
                }else{
                  this.meetUseTime_start="00:00";
                }
              }
              if (data.po.serviceList && data.po.serviceList.length > 0) {
                services = data.po.serviceList;
                for (var i = 0; i < services.split(",").length; i++) {
                  if(services.split(",")[i].length){
                    this.serviceList.push({
                      paramCode: "code" + i,
                      paramName: services.split(",")[i].trim()
                    });
                  }
                }
              }
              if (
                this.formData.needServices &&
                typeof this.formData.needServices == "string"
              ) {
                if (this.formData.needServices.length > 0) {
                  this.formData.needServices = this.formData.needServices.split(
                    ";"
                  );
                } else {
                  this.formData.needServices = [];
                }
              } else {
                this.formData.needServices = [];
              }
              this.shyj = res.data.shyj;
              this.sqbmyj = res.data.sqbmyj;
              this.bz = res.data.bz;
              this.thyy = res.data.thyy;
              this.yhsypj=res.data.yhsypj;
              this.formData.maxTime = res.data.maxTime;
            } else {
              this.formData.orderUserName = data.po.orderUserName;
              this.formData.orderUserPhon = data.po.orderUserPhon;
              this.formData.crrentLink = data.po.crrentLink;
              this.formData.crrentProcessor = data.po.crrentProcessor;
              this.formData.hostDepartment = data.po.hostDepartment;
              this.formData.hostDepartmentId = data.po.hostDepartmentId;
              this.formData.roomSeat = data.po.roomSeat;
              this.formData.roomPhone = data.roomPhone;
              this.formData.approvalTimeLimit = data.po.approvalTimeLimit;
              if (data.po.serviceList && data.po.serviceList.length > 0) {
                this.formData.serviceList = data.po.serviceList;
                services = data.po.serviceList;
                for (var i = 0; i < services.split(",").length; i++) {
                  if(services.split(",")[i].length){
                    this.serviceList.push({
                      paramCode: "code" + i,
                      paramName: services.split(",")[i].trim()
                    });
                  }
                }
              }
            }
            this.isFirst = res.data.isFirst;//时间范围保存后禁用
            this.isBackQc = data.isBackQc; //是否为重新流转到当前环节
            this.approvalType = data.approvalType; //是否审批
            //表单控制
            this.isProcessInstId = res.data.po.pcsinst;
            this.isLeaderUse = res.data.isLeaderUse;
            this.isMultiTenancyId = 'HYSYDSP';
            this.deleteDoc.id = this.formData.id;
            this.uploadConfig.id = data.po.id;
            this.chekshouhui();
          }
          if (this.readFlag != "" && this.readFlag != 1) {
            this.$post
              .postData(
                "doUpdateReadRecord",
                JSON.stringify({
                  function: "doUpdateReadRecord",
                  pcsAvyId: res.data.po.pcsactid,
                  processInstId: res.data.po.pcsinst,
                  multiTenancyId: 'HYSYDSP'
                }),
                this.$businessCode.hysyd,
                null,
                loadingFlag
              )
              .then(res => {
                window.opener.location.reload();
                this.handleSetLoacl();
                //更新状态用。暂时不用任何操作
              });
          }
          this.biaoDKz(loadingFlag);
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },
    toNumber(val,key,type){
      if(type=='phone'){
        val=val.replace(/[\u4e00-\u9fa5]/g,'');
      }else{
        val=val.replace(/[^\d]/g,'');
      }
      this.formData[key]=val;
    },
    //下一环节是否已读判断收回是否展示
    chekshouhui(){
      this.$post
        .postData(
          "checkTakeBack",
          JSON.stringify({function:"checkTakeBack",processInstId:this.isProcessInstId}),
          this.$businessCode.hysyd
        )
        .then(res => {
          this.allowBack=res.allowBack;
        });
    },
    //参会人数不得大于座位数
    checkNum(){
      if(this.formData.attendNums&&this.formData.roomSeat){
        if((this.formData.attendNums-0)>(this.formData.roomSeat-0)){
          this.$alert("参会人数超出会议室容量", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.formData.attendNums=this.formData.roomSeat;
            }
          });
        }
      }
    },
    //会议类型为视频相关增加提示
    checkMeetType(){
      if(this.formData.meetType.indexOf('视频')>-1){
        this.messageDialog=true;
      }
    },
    addinput(){
      if(this.formData.auditComment.indexOf('同意')==0){
        this.formData.auditComment=this.formData.opinionRadio+this.formData.auditComment.substr(2)
      }else if(this.formData.auditComment.indexOf('不同意')==0){
        this.formData.auditComment=this.formData.opinionRadio+this.formData.auditComment.substr(3)
      }else if(this.formData.auditComment && this.formData.auditComment.length>0){
        this.formData.auditComment=this.formData.opinionRadio+','+this.formData.auditComment
      }else{
        this.formData.auditComment=this.formData.opinionRadio
      }
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      );
    },
    autoAdd(){
      if((this.formData.auditComment.length==2 && this.formData.auditComment.indexOf('同意')==0)||(this.formData.auditComment.length==3 && this.formData.auditComment.indexOf('不同意')==0)){
        this.formData.auditComment=this.formData.opinionRadio+','
      }
    },
    //正文跳转
    doDraft(fileInfo,saveName) {
      let data;
      let fileConfig = fileInfo;
      data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: getFormId(this.$route.query.roomId, "roomId"),
          zhengWenState: 0,//是否可编辑
          JYcode: this.$businessCode.hysydfj,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          tmpFileName: fileConfig ? fileConfig.fileNameTh : "",
          tmpFilePath: fileConfig ? fileConfig.filePathTh : "",
          showBtns: this.zhengWenState == 0 ? false : true,
          saveSpecialFileName:saveName
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.formData.attachSort.push(
        {
          id: this.formData.attchment[n - 1].id,
          sort: this.formData.attchment[n].sort
        },
        {
          id: this.formData.attchment[n].id,
          sort: this.formData.attchment[n - 1].sort
        }
      );
      midObj = this.formData.attchment[n];
      this.formData.attchment[n] = this.formData.attchment[n - 1];
      this.formData.attchment[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(item, type) {
      this.bank_upDownFile.fileId = item.id;
      this.bank_upDownFile.sortType = type;
      this.$post
        .postData(
          "changeAttachSort",
          JSON.stringify(this.bank_upDownFile),
          this.$businessCode.hysydfjDownload
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.getFormDataById(1,'changesort');
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "改变顺序失败,请联系管理员",
                duration: 1500
              });
            }
          }
        });
    },
    deleteRow(n, id) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.bank_deleteFileById.id = id;
          this.$post
            .postData(
              "deleteFileById",
              JSON.stringify(this.bank_deleteFileById),
              this.$businessCode.hysydfjDownload
            )
            .then(res => {
              if (res) {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 1000
                  });
                  this.formData.attchment.splice(n, 1);
                  this.uploadConfig.filesHas = this.formData.attchment;
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "删除失败",
                    duration: 1000
                  });
                }
              }
            });
        })
        .catch(() => {});
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.hysydfjDownload
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                "/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName,
                file.fileName
              );
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 1000
              });
            }
          }
        });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.pageTitle=JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.formData.roomName = this.$route.query.roomName;
    this.formData.roomId = this.$route.query.roomId;
    this.formData.roomAddres = this.$route.query.address;
    this.formData.meetUseDate = this.$route.query.meetUseDate;
    if(this.$route.query.meetStartTime){
      if(new Date()>new Date(this.formData.meetUseDate)){//预定当天的
        // if(new Date().getMinutes()<30){
        //   this.meetUseTime_start=new Date().getHours()+':30'
        // }else{
        //   this.meetUseTime_start=(new Date().getHours()+1)+':00'
        // }
        // if(this.$route.query.meetStartTime=='00:00'){
        //   if(new Date().getMinutes()<30){
        //       this.meetUseTime_start=new Date().getHours()+':30'
        //     }else{
        //       this.meetUseTime_start=(new Date().getHours()+1)+':00'
        //     }  
        // }else{
        //   //预订下午，当前时间小于12点
        //   if(new Date().getHours()<12){
        //       this.meetUseTime_start='12:00'
        //   }else{
        //     if(new Date().getMinutes()<30){
        //       this.meetUseTime_start=new Date().getHours()+':30'
        //     }else{
        //       this.meetUseTime_start=(new Date().getHours()+1)+':00'
        //     } 
        //   }
          
        // }
        if(this.$route.query.meetStartTime=='12:00' && new Date().getHours()<12){
          //预订下午，当前时间小于12点
          this.meetUseTime_start='12:00'
        }else{
          if(new Date().getMinutes()<30){
              this.meetUseTime_start=new Date().getHours()+':30'
            }else{
              this.meetUseTime_start=(new Date().getHours()+1)+':00'
            } 
        }
        if(this.$route.query.meetStartTime=='00:00'){
          if(new Date().getHours()<8){
            this.formData.meetStartTime='08:00'
          }else{
            this.formData.meetStartTime=this.meetUseTime_start
          }
          this.formData.meetEndTime='12:00'
        }else{
          if(new Date().getHours()<12){
            this.formData.meetStartTime='12:00';
            this.formData.meetEndTime='18:00'
          }else{
            this.formData.meetStartTime=this.meetUseTime_start
            if(new Date().getHours()<18){
              this.formData.meetEndTime='18:00'
            }
          }
        }
      }else{//预定非当天的
        this.meetUseTime_start = this.$route.query.meetStartTime;
        if(this.$route.query.meetStartTime=='00:00'){
          this.formData.meetStartTime='08:00';
          this.formData.meetEndTime='12:00'
        }else{
          this.formData.meetStartTime='12:00';
          this.formData.meetEndTime='18:00'
        }
      }
    }
    this.treeTradeCode = this.$businessCode.hysyd;
    let roles = JSON.parse(localStorage.getItem("tcHumanRole"));
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].dicCode == "hysglG") {
        this.isMeetManager = true;
        break;
      }
    }
    //初始化加载数据
    this.bank_dispach.id = getFormId(this.$route.query.id, "hysydid");
    this.bank_dispach.meetUseDate = this.$route.query.meetUseDate;
    this.bank_dispach.roomId = this.$route.query.roomId;
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.uploadConfig.code = this.$businessCode.hysydfj;
    this.getFormDataById(1);
    this.getMeetTypeList("1");
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.blueDetail {
  background-color: rgb(240, 245, 250);
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 70px;
    line-height: 50px;

    .right {
      margin-left: 20px;
      float: left;
    }
  }

  .blueHeader {
    padding: 8px 70px;
    margin-top: 50px;
    .title-text {
      width: 100%;
      height: 90px;
      line-height: 90px;
      text-align: center;
      color: #096dd9;
      font-size: 44px;
      font-weight: 500;
    }
  }
  .process_content {
    width: 92%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    .cur_box {
      width: 100%;
      height: 30px;
      margin-bottom: 20px;
      margin-left: 0;
      line-height: 30px;
      border: 1px solid red;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;
          span {
            color: red;
          }
        }
        .headmsg {
          float: right;
          color: red;
          margin-right: 10px;
        }
      }
    }
    .bottom-span {
      span {
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
  }
  .d_flex {
    display: flex;
    margin-bottom: 20px;
    .d_b100 {
      width: 100%;
    }
    .d_f1 {
      flex: 1;
    }
    .adviceInfo {
      position: absolute;
      width: 100%;
      right: 20px;
      bottom: 0;
      text-align: right;
      color: #606266;
    }
  }
  .disable_w {
    width: 100%;
  }
  .pad_lr10 {
    padding: 0 10px;
  }
  .dimi_btn {
    background: #f5f7fa;
    height: 40px;
    margin-left: 20px;
    padding: 10px 20px;
    text-align: right;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: -55px;
    border: none!important;
  }
  //上传附件
  .tree_w {
    height: 200px;
    padding: 20px;
    overflow: scroll;
    margin: 20px 0 0 130px;
    margin-left: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .command_file {
      display: flex;
      font-size: 14px;
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
      }
      .name {
        white-space: nowrap;
        height: 42px;
        padding: 0 10px;
        line-height: 42px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .down {
        cursor: pointer;
        min-width: 550px;
        padding: 0 50px 0 10px;
        cursor: pointer;
        flex: auto;
      }
      .down:hover {
        color: #3b85ef;
      }
    }
  }
}
</style>
