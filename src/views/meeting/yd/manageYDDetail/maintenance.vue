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
        <!-- 【关闭】【保存】 -->
        <el-button size="small" @click="closeHandler = true" plain>关闭</el-button>
        <el-button size="small" plain @click="preserve">保存</el-button>
      </div>
    </div>
    <div class="blueHeader">
      <div class="title-text">{{pageTitle}}会议室预订单</div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{formData.crrentLink}}</span>
          </p>
          <p v-if="orderStatu=='审批中'">
            当前处理人：
            <span>{{formData.crrentProcessor}}</span>
          </p>
          <p class="headmsg" v-if="orderStatu=='审批中' && formData.approvalTimeLimit">{{'该会议室审批有效期限剩余'+formData.approvalTimeLimit+'天'}}</p>
        </div>
      </div>
      <el-form ref="formData" :model="formData" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用日期">
              <el-date-picker
                v-model="formData.meetUseDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间范围">
              <el-time-select
                style="width:50%;"
                placeholder="起始时间"
                v-model="formData.meetStartTime"
                :picker-options="{
                    start: '08:00',
                    step: '00:30',
                    end: '18:00',
                    maxTime:formData.meetEndTime
                  }"
              ></el-time-select>
              <el-time-select
                style="width:50%;"
                placeholder="结束时间"
                v-model="formData.meetEndTime"
                :picker-options="{
                    start: '08:00',
                    step: '00:30',
                    end: '18:00',
                    minTime: formData.meetStartTime
                  }"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议类型">
              <el-select
                style="width:100%"
                v-model="formData.meetType">
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
          <el-col :span="8">
            <el-form-item label="会议室名称">
              <el-input v-model="formData.roomName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参会人数">
              <el-input v-model="formData.attendNums" @change="checkNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议室座位数">
              <el-input v-model="formData.roomSeat"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否涉密">
              <el-radio-group v-model="formData.isSecrete">
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
            <el-form-item label="所需服务">
              <el-checkbox-group
                v-model="formData.needServices"
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
            <el-form-item label="会议名称">
              <el-input v-model="formData.meetingName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主办部门">
              <el-input v-model="formData.hostDepartment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="主持行领导">
              <el-input v-model="formData.hostName">
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="selectLeader('hostLeader')">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="参会行领导">
              <el-input v-model="formData.attendUsers">
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="selectLeader('attendLeader')">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input v-model="formData.orderUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人联系电话">
              <el-input v-model="formData.orderUserPhon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会议内容">
          <el-input
            type="textarea"
            :autosize="{minRows: 2, maxRows: 6}"
            maxlength="500"
            v-model="formData.conferenceContent"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-button icon="el-icon-plus" circle style="margin-bottom: 5px;" @click="addOpinion(shyj)"></el-button>
          <el-row v-if="shyj && ((shyj.length==1 && shyj[0].status==1)||(shyj.length>1))">
            <el-row  class="opinionContent" type="flex" align="middle" v-for="(item,index) in shyj" :key="index" >
              <el-row v-if="item.status=='1'">
                <el-row class="opinionBox" >
                  <el-form-item label="意见:">
                    <el-input
                      type="textarea"
                      resize="none"
                      maxlength="500"
                      autosize
                      v-model="item.content"
                    ></el-input>
                  </el-form-item>
                  <el-col :span="12">
                    <el-form-item label="用户部门:">
                      <el-input v-model="item.departmentName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门ID:">
                      <el-input v-model="item.departmentId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户中文名:">
                      <el-input v-model="item.userName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户ID:">
                      <el-input v-model="item.userId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="提交时间:">
                      <el-input v-model="item.createTime"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="opinionBox opinionbtnBox">
                  <el-button icon="el-icon-delete" circle @click="deleteOpion(item.id,shyj,index)"></el-button>
                </el-row>
              </el-row>
            </el-row>
          </el-row>
        </el-form-item>
        <el-form-item label="申请部门意见">
          <el-button icon="el-icon-plus" circle style="margin-bottom: 5px;" @click="addOpinion(sqbmyj)"></el-button>
          <el-row v-if="sqbmyj && ((sqbmyj.length==1 && sqbmyj[0].status==1)||(sqbmyj.length>1))">
            <el-row  class="opinionContent" type="flex" align="middle" v-for="(item,index) in sqbmyj" :key="index" >
              <el-row v-if="item.status=='1'">
                <el-row class="opinionBox">
                  <el-form-item label="意见:">
                    <el-input
                      type="textarea"
                      resize="none"
                      maxlength="500"
                      autosize
                      v-model="item.content"
                    ></el-input>
                  </el-form-item>
                  <el-col :span="12">
                    <el-form-item label="用户部门:">
                      <el-input v-model="item.departmentName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门ID:">
                      <el-input v-model="item.departmentId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户中文名:">
                      <el-input v-model="item.userName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户ID:">
                      <el-input v-model="item.userId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="提交时间:">
                      <el-input v-model="item.createTime"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="opinionBox opinionbtnBox">
                  <el-button icon="el-icon-delete" circle @click="deleteOpion(item.id,sqbmyj,index)"></el-button>
                </el-row>
              </el-row>
            </el-row>
          </el-row>
        </el-form-item>
        <el-form-item label="用户使用评价">
          <el-button icon="el-icon-plus" circle style="margin-bottom: 5px;" @click="addOpinion(yhsypj)"></el-button>
          <el-row v-if="yhsypj && ((yhsypj.length==1 && yhsypj[0].status==1)||(yhsypj.length>1))">
            <el-row  class="opinionContent" type="flex" align="middle" v-for="(item,index) in yhsypj" :key="index" >
              <el-row v-if="item.status=='1'">
                <el-row class="opinionBox">
                  <el-form-item label="评价:">
                    <el-input
                      type="textarea"
                      resize="none"
                      maxlength="500"
                      autosize
                      v-model="item.content"
                    ></el-input>
                  </el-form-item>
                  <el-col :span="12">
                    <el-form-item label="用户部门:">
                      <el-input v-model="item.departmentName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门ID:">
                      <el-input v-model="item.departmentId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户中文名:">
                      <el-input v-model="item.userName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户ID:">
                      <el-input v-model="item.userId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="提交时间:">
                      <el-input v-model="item.createTime"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="opinionBox opinionbtnBox">
                  <el-button icon="el-icon-delete" circle @click="deleteOpion(item.id,yhsypj,index)"></el-button>
                </el-row>
              </el-row>
            </el-row>
          </el-row>
        </el-form-item>
        <el-form-item label="备注">
          <el-button icon="el-icon-plus" circle style="margin-bottom: 5px;" @click="addOpinion(bz)"></el-button>
          <el-row v-if="bz && ((bz.length==1 && bz[0].status==1)||(bz.length>1))">
            <el-row  class="opinionContent" type="flex" align="middle" v-for="(item,index) in bz" :key="index" >
              <el-row v-if="item.status=='1'">
                <el-row class="opinionBox">
                  <el-form-item label="备注:">
                    <el-input
                      type="textarea"
                      resize="none"
                      maxlength="500"
                      autosize
                      v-model="item.content"
                    ></el-input>
                  </el-form-item>
                  <el-col :span="12">
                    <el-form-item label="用户部门:">
                      <el-input v-model="item.departmentName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门ID:">
                      <el-input v-model="item.departmentId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户中文名:">
                      <el-input v-model="item.userName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户ID:">
                      <el-input v-model="item.userId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="提交时间:">
                      <el-input v-model="item.createTime"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="opinionBox opinionbtnBox">
                  <el-button icon="el-icon-delete" circle @click="deleteOpion(item.id,bz,index)"></el-button>
                </el-row>
              </el-row>
            </el-row>
          </el-row>
        </el-form-item>
        <el-row v-if="formData.cancelReason">
          <el-form-item label="取消原因">
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.cancelReason"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="thyy && thyy.length>0 && !(thyy.length==1 && thyy[0].status==0)">
          <el-form-item label="退回原因">
            <opinionText
              :opinionText="thyy"
              :canDelet="false"
              :isRemarks="true"
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
              <div class="tree_w" v-if="formData.attchment&&formData.attchment.length">
                <el-scrollbar>
                  <div v-for="(item,index) in  formData.attchment" :key="index" class="comp_list">
                    <template>
                      <div class="command_file">
                        <span class="name" style="width: 50px;">{{index+1}}</span>
                        <!-- 预览 -->
                        <span
                          class="name down"
                          :title="item.fileName"
                          @click="viewDraftFile(item.fileName,item.filePath,$businessCode.hysydfj)"
                        >{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
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
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
  </div>
</template>

<script type="text/ecmascript-6">
import opinionText from "@/components/opinionText/index";
import treeLeader from "@/components/tree/leaderTree";
import closeMessage from '@/components/closeMessage/index';
import uploadFile from "@/components/uploadFile/meetUploadlFile";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "maintenance",
  components: {opinionText,treeLeader,closeMessage,uploadFile},
  data() {
    return {
      closeHandler:false,
      pageTitle: "",
      orderStatu:'',//当前环节
      cancelOrderDialog: false,//取消预订弹窗
      timeShow: false,//查看流程弹窗
      curNodeName:'',//当前环节
      currentUser:'',//当前处理人
      islock:false,
      //当前用户
      nowUserName: JSON.parse(localStorage.getItem("userInfo")).humanName,
      formData: {
        approvalTimeLimit: "",//距离审批失效时间
        multiTenancyId: "", //多实体标识
        id: "",
        roomName: "", //会议室名称
        roomAddress: "", //会议室位置
        roomSeat: "", //会议室座位数
        meetUseDate: "",
        meetStartTime: "",
        meetEndTime: "",
        hostDepartment: "",
        orderUserName: "",
        orderUserPhon: "",
        meetRemark: "", //备注
        meetingName: "", //会议名称
        meetType: "", //会议类型
        isSecrete: 1, //是否涉密
        attendNums: "", //参会人数
        conferenceContent: "", //会议内容
        hostName: "", //主持行领导
        hostNameId: "", //主持行领导id
        attendUsers: "", //参会行领导
        attendUsersId: "", //参会行领导id
        needServices: [], //所需服务
        applicatPartComment: "", //申请部门意见
        userEvaluation: "", //用户使用评价
        backReason: "", //退回原因
        cancelReason: "", //取消原因
        attchment: [],//附件
      },
      thyy:[],//退回原因列表
      shyj:[],//审批意见列表
      bz:[],//备注列表
      sqbmyj:[],//申请部门意见列表
      yhsypj:[],//用户使用评价
      processInstId: "",
      tableData: [],//查看流程表格数据
      multiTenancyId: "", //多实体标识
      buttonList: [
        { name: "保存", type: "saveOrder", show: true },
        { name: "退出编辑", type: "backEditePage", show: true },
        { name: "完成并发送", type: "saveAndSend", show: true },
        { name: "取消预订", type: "cancelOrder", show: true},
        { name: "查看流程", type: "review", show: true },
        { name: "流程调度", type: "flowNode", show: true },
        { name: "撤回", type: "review", show: true },
        { name: "操作指南", type: "operatTip", show: true }
      ],
      //会议类型
      meetingTypeList: [],
      isSeceretRelated: [
        { key: 0, value: "涉密" },
        { key: 1, value: "非涉密" }
      ],
      //所需服务
      serviceList: [],
      //获取页面数据
      bank_dispach: {
        function: "getRoomOrderDetail",
        id: "",
      },
      //保存
      saveFun: {
        function: "saveOrderDetails",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "", //部门人员名字
        sequenceSign: ""
      },
      //审批流程
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      dialogTit:"",
      dialogType: "", //弹窗类型
      leaderDialogVisible: false, //领导人弹窗
      checkIds: [], //列表
      checkData: [], //完成并发送选中数据
      hostLeaderCheckData: [], //主持行领导选中数据
      attendLeaderCheckData: [], //参会行领导选中数据
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
  mixins: [viewDraft],
  methods: {
    //参会人数不得大于座位数
    checkNum(){
      if(this.formData.attendNums&&this.formData.roomSeat){
        if((this.formData.attendNums-0)>(this.formData.roomSeat-0)){
          this.$alert("参会人数超出会议室容量", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              if (action == "confirm") {
                this.formData.attendNums=this.formData.roomSeat;
              }
            }
          });
        }
      }
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
    closeDialog(visible) {
      this.leaderDialogVisible = visible;
    },
    //校验会议室使用时间是否已占用
    async checkUseTime() {
      if (
        this.formData.meetStartTime &&
        this.formData.meetEndTime
      ) {
        let httpData = {
          id:this.formData.id,
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
              }
            }
          })
          .catch(err => {
            this.$message.error("网络异常");
          });
      }
    },
    async preserve(type) {
      await this.checkUseTime();
      if (this.islock) {
        return;
      }
      if (this.yhsypj.length<1) {
        this.formData.userEvaluation = "";
      }
      let parseList = JSON.parse(JSON.stringify(this.formData));
      let yjyObj={
        thyy:this.thyy,
        shyj:this.shyj,
        bz:this.bz,
        sqbmyj:this.sqbmyj,
        yhsypj:this.yhsypj
      };
      var obj = Object.assign(this.saveFun, parseList,yjyObj);
      this.$post
        .postData(
          "saveOrderDetails",
          JSON.stringify(obj),
          this.$businessCode.hysyd,
        )
        .then(res => {
          if (res && res.success) {
            if(type!='uploadfile'&&type!='file'){
              this.$message({
                type: "success",
                offset: 400,
                showClose: true,
                message: '保存成功',
                duration: 1000
              });
            }
            if(res.data){
              this.saveFun.id = getFormId(
                this.$route.query.id,
                "hysydid",
                res.data.id
              );
              let data = JSON.parse(JSON.stringify(res.data));
              this.serviceList = [];
              let services = "";
              this.formData = Object.assign(
                this.formData,
                JSON.parse(JSON.stringify(res.data.po))
              );
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
              this.maxTime = res.data.maxTime;
              if(type=='uploadfile'){
                this.uploadConfig.id = res.data.po.id;
                this.$refs.uploadComponent.uploadFileNow('1');
              }
            }
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
    },
    async btnCloseHandler(val){
      if(val == 1){
        window.close();
      }else if(val == 2){
        await this.preserve();
        window.location.href = "about:blank";
        window.opener.location.reload();window.close();
      }else{
        this.closeHandler = false
      }
    },
    getMeetTypeList(type){//type:1会议类型；0所需服务
      let httpData={
        function:'doFindParams',
        paramType:type,
      };
      this.$post
        .postData(
          "doFindParams",
          JSON.stringify(httpData),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            if(type=='1'){
              this.meetingTypeList=res.data
            }else{
              this.serviceList=res.data
            }
          }else{
            this.$message.error(res.data.message);
          }
        })
        .catch(erro => {
          this.$message.error("请求失败");
        });
    },
    goNewPage (path,pageData) {
      const routeData = this.$router.resolve({
        path: path,
        query: pageData
      });
      window.open(routeData.href, "_blank");
    },
    //初始值
    getFormDataById(flags) {
      let that = this;
      this.bank_dispach.id = getFormId(this.$route.query.id, "hysydid");
      this.$post
        .postData(
          "getRoomOrderDetail",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.hysyd,
        )
        .then(res => {
          if(res.data){
            let data=JSON.parse(JSON.stringify(res.data));
            this.isUpload=data.isUpload;//是否上传附件 是\否
            if(this.isUpload=='是'){
              this.uploadConfig.filesHas=data.attchment && JSON.parse(JSON.stringify(data.attchment));
              this.formData.attchment=data.attchment && JSON.parse(JSON.stringify(data.attchment));
              
            }
            if(flags){
                this.preserve('file');
                return
            }
            if(res.data.po){
              this.formData = Object.assign(this.formData,data.po);
              this.serviceList = [];
              if (data.po.serviceList && data.po.serviceList.length > 0) {
                let services=data.po.serviceList;
                for (
                  var i = 0;
                  i < services.split(",").length;
                  i++
                ) {
                  this.serviceList.push({
                    paramCode: "code" + i,
                    paramName: services.split(",")[i].trim()
                  });
                }
              }
              if(this.formData.needServices && (typeof(this.formData.needServices)=='string')){
                if(this.formData.needServices.length>0){
                  this.formData.needServices=this.formData.needServices.split(";");
                }else{
                  this.formData.needServices=[];
                }
              }else{
                this.formData.needServices=[];
              }
            }
            this.shyj=res.data.shyj;
            this.sqbmyj=res.data.sqbmyj;
            this.bz=res.data.bz;
            this.thyy=res.data.thyy;
            this.yhsypj=res.data.yhsypj;
          }
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
    //增加意见
    addOpinion(idea){
      let opi={
        content:"",
        departmentName:"",
        departmentId:"",
        userName:"",
        userId:"",
        createTime:"",
        status:1
      };
      idea.unshift(opi);
    },
    //删除意见
    deleteOpion(id,idea,index){
      if(id && id.length>0){
        this.$post
          .postData(
            "delOpionByid",
            JSON.stringify({function:'delOpionByid','id':id}),
            this.$businessCode.hysyd,
          ).then(res => {
            if(res && res.success){
              this.$message({
                type: "success",
                offset: 400,
                showClose: true,
                message: "删除成功",
                duration: 1000
              });
              idea.splice(index,1);
            }else{
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 1000
              });
            }

        }).catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
      }else{
        idea.splice(index,1);
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
          zhengWenState: false,//是否可编辑
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
              this.getFormDataById('changesort');
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
    this.orderStatu=this.$route.query.orderStatu;
    //初始化加载数据
    this.bank_dispach.id = getFormId(
      this.$route.query.id,
      "hysydid"
    );
    this.uploadConfig.code = this.$businessCode.hysydfj;
    this.getFormDataById();
    this.getMeetTypeList('1');
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
    height: 50px;
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
    .opinionContent{
      background-color: #FFF;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
    .opinionBox{
      float: left;
      width: calc(100% - 100px);
      padding: 5px 15px;
      box-sizing: border-box;
    }
    .opinionbtnBox{
      width: 100px;
      height: 100%;
    }
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
