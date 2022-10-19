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
        <el-button size="small" @click="closeWindow" plain>关闭</el-button>
        <el-button
          size="small"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.type)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
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
      <el-form ref="formData" :model="formData" label-width="130px" disabled>
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用日期">
              <el-input v-model="formData.meetUseDate"></el-input>
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
              <el-input v-model="formData.attendNums"></el-input>
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
          <div v-if="shyj && ((shyj.length==1 && shyj[0].status==0)||shyj.length==0)">
            <el-input
              type="textarea"
              resize="none"
              maxlength="500"
              autosize
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="shyj"
              :canDelet="false"
            ></opinionText>
          </div>
        </el-form-item>
        <el-form-item label="申请部门意见">
          <div v-if="sqbmyj && ((sqbmyj.length==1 && sqbmyj[0].status==0)||sqbmyj.length==0)">
            <el-input
              type="textarea"
              resize="none"
              maxlength="500"
              autosize
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="sqbmyj"
              :canDelet="false"
            ></opinionText>
          </div>
        </el-form-item>
        <el-form-item label="用户使用评价">
          <div v-if="(yhsypj && yhsypj.length==1 &&yhsypj[0].status==0)||(yhsypj && sqbmyj.length==0)">
            <el-input
              type="textarea"
              resize="none"
              maxlength="500"
              autosize
              v-model="formData.userEvaluation"
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="yhsypj"
              :canDelet="false"
            ></opinionText>
          </div>
        </el-form-item>
        <el-form-item label="备注">
          <div v-if="bz && bz.length==1 && bz[0].status==0">
            <el-input
              type="textarea"
              resize="none"
              maxlength="500"
              autosize
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="bz"
              :canDelet="false"
              :isRemarks="true"
            ></opinionText>
          </div>
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
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog
        v-dialogDrag
        title="取消预订"
        width="30%"
        :visible.sync="cancelOrderDialog"
        append-to-body
      >
        <span>请说明取消预订原因</span>
        <el-input
              type="textarea"
              :rows="3"
              maxlength="500"
              v-model="cancelReasonDailog.cancelReason"
            ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelOrderDialog = false">取消</el-button>
          <el-button type="primary" @click="sureCancelOrder">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import treeCofig from "@/components/tree/tree-fawen";
import timeDialog from "@/components/timedialog/timedialog";
import minixs from "@/minixs/index";
import opinionText from "@/components/opinionText/index";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "blueDetail2",
  components: { treeCofig,timeDialog,opinionText},
  mixins: [minixs,viewDraft],
  data() {
    return {
      pageTitle: "",
      orderStatu:'',//当前环节
      cancelOrderDialog: false,//取消预订弹窗
      timeShow: false,//查看流程弹窗
      curNodeName:'',//当前环节
      currentUser:'',//当前处理人
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
      // 【关闭】【取消预定】【维护】【流程调度】【查看流程】
      buttonList: [
        { name: "取消预订", type: "cancelOrder", show: false},
        { name: "维护", type: "editePage", show: true },
        { name: "流程调度", type: "flowNode", show: false },
        { name: "查看流程", type: "review", show: true },
        // { name: "操作指南", type: "operatTip", show: true }
      ],
      //会议类型
      meetingTypeList: [],
      isSeceretRelated: [
        { key: 0, value: "涉密" },
        { key: 1, value: "非涉密" }
      ],
      //所需服务
      serviceList: [],
      //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      //获取页面数据
      bank_dispach: {
        function: "getRoomOrderDetail",
        id: "",
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getAllNodeInfo",
        curNodeId: "001",
        tplNo: "",
        multiTenancyId: ""
      },
      //审批流程
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      //下拉框列表
      //取消预订弹窗取消预订原因
      cancelReasonDailog:{
        function:'cancelOrder',
        cancelReason:'',
        manager:''
      },
      defaultUser: {}, //完成并发送默认值
      dialogTypeNow: "",
      treeData: [], //树数据
      canTab: false, //标示是否左右三列布局
      loadingTree: false,
      hasRadio: false, //是否有单选
      setradio: "1", //默认为 是 按照顺序
      dialogType: "", //弹窗类型
      dialogTit: "选择环节和处理人", // 弹框标题
      titleWords: "选择部门",
      checkIds: [], //列表
      checkData: [], //完成并发送选中数据
      singelCheckF: true, // 单选true 多选为false
      addSendType: "",
      fixNoLoadingTree: false,
      dialogState: false,
      offenUse: false, //标示常用设置
      seletOptionsData: [], //弹窗下拉框数据
      checkOrg: false, //传阅多选
      sequenceFlag: false,
      treeTradeCode: "", //完成并发送  树  拆
      //确定完成并发送
      doFinishedSend: {
        function: "doFinishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        flag: '1',
        manager: ''
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //是否上传附件
      isUpload:'否',
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
    closeWindow() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    buttonClick(params) {
      switch (params) {
        //维护
        case "editePage":
          this.editePage();
          break;
        //取消预订
        case "cancelOrder":
          this.cancelOrder();
          break;
        // 查看流程
        case "review":
          this.flowScheme();
          break;
        // 流程调度
        case "flowNode":
          this.processScheduling();
          break;
        // 操作指南
        case "operatTip":
          this.instructions();
          break;
      }
    },
    //取消预订
    cancelOrder() {
      this.cancelOrderDialog=true;
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
                    multiTenancyId: this.formData.multiTenancyId,
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
    // 流程调度
    async processScheduling() {
      this.dialogTit = "流程调度";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoSend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.loadingTree = true;

      this.showCompDialog();
      setTimeout(() => {
        this.$post
          .postData(
            "getAllNodeInfo",
            JSON.stringify(this.bank_selectConfig),
            this.$businessCode.hysyd
          )
          .then(res => {
            this.seletOptionsData = res.data || [];
            this.bank_send.curTplNo = this.fromdata.tplNo;
            this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
            let parms = Object.assign(this.bank_send, this.fromdata);
            parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
            this.$post
              .postData("selWfNode", JSON.stringify(parms), this.$businessCode.hysyd)
              .then(res => {
                this.cantClick = false;
                if (res.message == "Loading") {
                  this.loadingTree = true;
                } else {
                  this.loadingTree = false;
                }
                this.treeData = (res.data && res.data.data) || [];
                this.defaultUser = (res.data && res.data.defaultUser) || {};
              })
              .catch(e => {
                this.cantClick = false;
                console.log(e);
              });
          });
      }, 100)
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
        .postData("doFinishAndSend", JSON.stringify(obj), this.$businessCode.hysyd)
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
    editePage(){
      let pageData={
        id:this.formData.id,
        orderStatu:this.orderStatu
      };
      this.goNewPage('/meeting/yd/maintenance',pageData);
    },
    goNewPage (path,pageData) {
      const routeData = this.$router.resolve({
        path: path,
        query: pageData
      });
      window.open(routeData.href, "_blank");
    },
    //初始值
    getFormDataById() {
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
            this.formData = Object.assign(this.formData,data.po);
            this.formData.attchment=data.attchment && JSON.parse(JSON.stringify(data.attchment));
            this.isUpload=data.isUpload;//是否上传附件 是\否
            this.bank_selectConfig.tplNo=data.po.tplno;
            this.bank_selectConfig.multiTenancyId=data.po.multitenancyid;
            this.bank_selectConfig.curNodeId = data.po.pcsnodeid;
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
    // 附件下载
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
    this.treeTradeCode = this.$businessCode.hysyd;
    this.orderStatu=this.$route.query.orderStatu;
    if(this.orderStatu=='审批中'){
      this.buttonList[3].show=true;
      this.buttonList[1].show=true;
    }else if(this.orderStatu=='预订成功'){
      this.buttonList[1].show=true;
    }
    //初始化加载数据
    this.bank_dispach.id = getFormId(
      this.$route.query.id,
      "hysydid"
    );
    this.getFormDataById(1);
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
