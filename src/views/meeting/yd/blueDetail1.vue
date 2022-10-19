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
          <p v-if="status=='2'">
            当前处理人：
            <span>{{formData.crrentProcessor}}</span>
          </p>
          <p class="headmsg" v-if="status=='2'&&formData.approvalTimeLimit">{{'该会议室审批有效期限剩余'+formData.approvalTimeLimit+'天'}}</p>
        </div>
      </div>
      <el-form ref="formData" :model="formData" label-width="130px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用日期">
              <el-input v-model="formData.meetUseDate" disabled></el-input>
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
                   disabled
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
                   disabled
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议类型">
              <el-select
                style="width:100%"
                v-model="formData.meetType"
                 disabled>
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
              <el-input v-model="formData.roomName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参会人数">
              <el-input v-model="formData.attendNums" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议室座位数">
              <el-input v-model="formData.roomSeat" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否涉密">
              <el-radio-group v-model="formData.isSecrete"  disabled>
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
                   disabled
                >{{item.paramName}}</el-checkbox>
              </el-checkbox-group>
              <el-input v-if="serviceList.length==0" value="无提供服务" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称">
              <el-input v-model="formData.meetingName"  disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row disabled>
          <el-col :span="8">
            <el-form-item label="主办部门">
              <el-input v-model="formData.hostDepartment" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="主持行领导">
              <el-input v-model="formData.hostName"  disabled>
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="selectLeader('hostLeader')"  disabled>选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="参会行领导">
              <el-input v-model="formData.attendUsers" disabled>
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="selectLeader('attendLeader')" disabled>选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input v-model="formData.orderUserName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人联系电话">
              <el-input v-model="formData.orderUserPhon" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会议内容">
          <el-input
            type="textarea"
            :autosize="{minRows: 2, maxRows: 6}"
            maxlength="500"
            v-model="formData.conferenceContent"
             disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="审核意见">
          <div v-if="shyj && ((shyj.length==1 && shyj[0].status==0)||shyj.length==0)">
            <el-input
              type="textarea"
              resize="none"
              maxlength="500"
              autosize
               disabled
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="shyj"
              :canDelet="false"
               disabled
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
               disabled
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="sqbmyj"
              :canDelet="false"
               disabled
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
               disabled
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="yhsypj"
              :canDelet="false"
               disabled
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
               disabled
            ></el-input>
          </div>
          <div v-else>
            <opinionText
              :opinionText="bz"
              :canDelet="false"
              :isRemarks="true"
               disabled
            ></opinionText>
          </div>
        </el-form-item>
        <el-row v-if="formData.cancelReason">
          <el-form-item label="取消原因">
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.cancelReason"
               disabled
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="thyy && thyy.length>0 && !(thyy.length==1 && thyy[0].status==0)">
          <el-form-item label="退回原因">
            <opinionText
              :opinionText="thyy"
              :canDelet="false"
              :isRemarks="true"
               disabled
            ></opinionText>
          </el-form-item>
        </el-row>
        <!-- <el-row v-if="isUpload==='是'">
          <el-form-item label="附件">
            <el-col>
              <div class="tree_w" v-if="formData.attchment&&formData.attchment.length">
                <el-scrollbar>
                  <div v-for="(item,index) in  formData.attchment" :key="index" class="comp_list">
                    <template>
                      <div class="command_file">
                        <span class="name" style="width: 50px;">{{index+1}}.</span>
                   
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
        </el-row> -->
        <el-row >
          <el-col>
            <div
              class="file_list_box"
              style="margin-left:138px;"
              v-if="formData.attchment&&formData.attchment.length"
            >
              <el-scrollbar  style="padding: 0px 15px 0 0;">
                <div
                  v-for="(item,index) in formData.attchment"
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
                        @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.qbglfj)"
                      >{{item.fileName}}</span>
                      <!-- @click="viewFile(item)" -->
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
          </el-col>
        </el-row>
      </el-form>
    </div>
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
    <el-dialog v-dialogDrag title="收回" width="30%" :visible.sync="sendTackVisible">
      <span>是否确定收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendTackVisible = false">取消</el-button>
        <el-button type="primary" @click="sendTackHandle">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import timeDialog from "@/components/timedialog/timedialog";
import minixs from "@/minixs/index";
import opinionText from "@/components/opinionText/index";
import viewDraft from "@/minixs/viewDraft";
import uploadFiles from "@/components/uploadFile/uploadSingelFile";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "blueDetail2",
  components: { 
    uploadFiles,timeDialog,opinionText},
  mixins: [minixs,viewDraft,isNowUser],
  data() {
    return {
      pageTitle: "",
      status:'',//1已取消；2审批中且已办；3预订成功；4使用完毕
      cancelOrderDialog: false,//取消预订弹窗
      sendTackVisible: false,//收回弹窗
      timeShow: false,//查看流程弹窗
      curNodeName:'',//当前环节
      currentUser:'',//当前处理人
      //当前用户
      isMeetingManager:false,//是否会议室管理员岗位
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
        auditComment: "", //审核意见
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
      huanJieMessage: {},//环节控制
      showHj: {},
      multiTenancyId: "", //多实体标识
      // 【关闭】【收回】【取消预订】【查看流程】【打印处理单】【操作指南】
      buttonList: [
        { name: "收回", type: "holdBack", show: false },
        { name: "取消预订", type: "cancelOrder", show: false},
        { name: "查看流程", type: "review", show: true },
        { name: "打印处理单", type: "printCase", show: true },
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
      //行领导
      leaderList:[],
      //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      //获取页面数据
      bank_dispach: {
        function: "getRoomOrderDetail",
        id: "",
        roomId:""
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //审批流程
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      //下拉框列表
      bank_dispachfile: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      //取消预订弹窗取消预订原因
      cancelReasonDailog:{
        function:'cancelOrder',
        cancelReason:''
      },
      //收回
      sendTackFuc: {
        function: "retrieveTask"
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
    //会议室预定状态初始化赋值
    getstatus(orderStatus){
      if (orderStatus=="审批中"){
        this.status='2'
      }else if(orderStatus=="预订成功"){
        this.status='3'
      }else if(orderStatus=="已取消"){
        this.status='1'
      }else if(orderStatus=="使用完毕"){
        this.status='4'
      }else{
        return ''
      }
    },
    closeWindow() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      this.handleSetLoacl();
      window.close();
    },
    buttonClick(params) {
      switch (params) {
        //收回
        case "holdBack":
          this.sendTackBtn();
          break;
        //取消预订
        case "cancelOrder":
          this.cancelOrder();
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
    //收回
    sendTackBtn() {
      this.sendTackVisible = true;
    },
    //收回弹窗确定操作
    sendTackHandle() {
      let parseList = JSON.parse(JSON.stringify(this.formData));
      var obj = Object.assign(parseList,this.sendTackFuc);
      this.$post
        .postData(
          "retrieveTask",
          JSON.stringify(obj),
          this.$businessCode.hysyd
        )
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
    // 打印处理单
    processSheet() {
      const routeData = this.$router.resolve({
        path: "/meeting/yd/meetingRoomYDPrint",
        query: {
          id: this.formData.id,
          roomId:this.formData.roomId,
        }
      });
      window.open(routeData.href, "_blank");
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
    //下一环节是否已读判断收回是否展示
    chekshouhui(){
      this.$post
        .postData(
          "checkTakeBack",
          JSON.stringify({function:"checkTakeBack",processInstId:this.formData.pcsinst}),
          this.$businessCode.hysyd
        )
        .then(res => {
          if(this.status=='2'){
            if(res.allowBack){
              this.buttonList[0].show=true;
            }
          }
        });
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
            this.getIsNowUser(res);
            let data=JSON.parse(JSON.stringify(res.data));
            this.formData = Object.assign(this.formData,data.po);
            this.formData.attchment=data.attchment && JSON.parse(JSON.stringify(data.attchment));
            this.isUpload=data.isUpload;//是否上传附件 是\否
            this.getstatus(this.formData.orderStatus);
            this.chekshouhui();
            if (data.po.serviceList && data.po.serviceList.length > 0) {
                let services=data.po.serviceList;
                for (var i = 0;i < services.split(",").length;i++) {
                  if(services.split(",")[i].length){
                    this.serviceList.push({
                      paramCode: "code" + i,
                      paramName: services.split(",")[i].trim()
                    });
                  }
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
            if(this.status=='2'||this.status=='3'){
              this.buttonList[1].show=true;
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
    let roles=JSON.parse(localStorage.getItem("tcHumanRole"));
    for(var i=0;i<roles.length;i++){
      if(roles[i].dicCode=='hysglG'){
        this.isMeetingManager=true;
        break;
      }
    }
    //初始化加载数据
    this.bank_dispach.id = getFormId(
      this.$route.query.id,
      "hysydid"
    );
    this.bank_dispach.roomId = this.$route.query.roomId;
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
