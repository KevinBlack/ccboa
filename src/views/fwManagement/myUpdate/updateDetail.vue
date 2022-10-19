<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" @click="goBack">
          <i class="el-icon-arrow-left"></i>模板及范文流转
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="goBack">关闭</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <!-- <el-button plain @click="instructions">操作指南</el-button> -->
        </div>
      </el-col>
    </el-row>

    <!-- <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog> -->

    <div class="nav bank_dispach_content"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title}}</h3>
    </header>
    <div class="form_content">
      <div class="form_tip bank_dispach_annotation">
        <span>
          当前环节：
          <span class="red">{{fromData.muBanVo.curNodeName}}</span>
        </span>
        <span style="margin-left:30px">
          当前处理人：
          <span class="red">{{fromData.muBanVo.currentUser}}</span>
        </span>
      </div>
      <el-form
        ref="muban"
        :model="fromData.muBanVo"
        :rules="rules"
        label-width="110px"
        class="demo_ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="示例类型" prop="sampleType">
              <el-select v-model="fromData.muBanVo.sampleType" placeholder="请选择" disabled>
                <el-option label="模板" value="模板"></el-option>
                <el-option label="范文" value="范文"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件类型" prop="fileType">
              <el-select v-model="fromData.muBanVo.fileType" placeholder="请选择文件类型" disabled>
                <el-option label="发文" value="发文"></el-option>
                <el-option label="签报" value="签报"></el-option>
                <el-option label="便函" value="便函" v-show="fromData.muBanVo.sampleType=='范文'"></el-option>
                <el-option label="呈送件" value="呈送件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="发文类型" prop="postType">
              <el-select
                v-model="fromData.muBanVo.postType"
                placeholder="请选择"
                @change="selectType"
                disabled
              >
                <!-- <el-option label="1" value="11"></el-option>
                <el-option label="2" value="22"></el-option>-->
                <el-option
                  v-for="item in sendType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务分类" prop="businessType">
              <el-select v-model="fromData.muBanVo.businessType" placeholder="请选择" disabled>
                <!-- <el-option label="3" value="33"></el-option>
                <el-option label="4" value="44"></el-option>-->
                <el-option
                  v-for="item in businessType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="代字/红头" prop="redHead">
              <el-select v-model="fromData.muBanVo.redHead" placeholder="请选择" disabled>
                <el-option
                  v-for="item in SredHead"
                  :key="item.redHead"
                  :label="item.redHead"
                  :value="item.redHead"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文种" prop="documentCode">
              <el-select v-model="fromData.muBanVo.documentCode" placeholder="请选择" disabled>
                <el-option
                  v-for="item in textType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="fromData.muBanVo.dealType" placeholder="请选择" disabled>
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签报类型" prop="qianbaoType">
              <el-select v-model="fromData.muBanVo.qianbaoType" placeholder="请选择" disabled>
                <el-option
                  v-for="item in qianbaoType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="签报字号" prop="qbNumber">
              <el-select v-model="fromData.muBanVo.qbNumber" placeholder="请选择" disabled>
                <el-option
                  v-for="item in qbNumber"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="fromData.muBanVo.fileType == '呈送件'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="fromData.muBanVo.dealType" placeholder="请选择" disabled>
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="呈送字号" prop="csNumber">
              <el-select v-model="fromData.muBanVo.csNumber" placeholder="请选择" disabled>
                <el-option label="e" value="ee"></el-option>
                <el-option label="ff" value="ff"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例标题" prop="fileTitle">
              <el-input v-model="fromData.muBanVo.fileTitle" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="关键词">
              <el-input v-model="fromData.muBanVo.keywords" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例可见范围" prop="visibleRange">
              <el-button disabled>选择可见范围</el-button>
              <div class="choose_sl">{{chooseRangeStr}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板/范文">
              <el-scrollbar>
                  <div v-for="item in fromData.muBanVo.attachments" :key="item.id" class="tree_w">
                    <template>
                      <div class="command_wrap">
                        <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                        <div class="btns" >
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审批意见">
              <opinionText 
                  :opinionText="leadershipOpinionDisabled" 
                  :canDelet="false"
                ></opinionText>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="作者">
              <el-input v-model="fromData.muBanVo.author" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="备注">
               <opinionText 
                :opinionText="remark" 
                :canDelet="false"
              ></opinionText>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="zjyj_title" v-if="showYjzj">意见征集</div>
      <el-form
        ref="yjzj"
        :model="yjzjfromData"
        v-if="showYjzj"
        label-width="110px"
        class="demo_ruleForm"
      >
        <el-row class="zjyj_box">
          <el-col :span="24">
            <el-form-item label="意见征集部门">
              <el-input
                style="margin-right:10px"
                disabled
                type="textarea"
                v-model="yjzjfromData.deptNames"
                :autosize="{ minRows: 2}"
              ></el-input>
              <el-input style="margin-left:10px" disabled v-model="yjzjfromData.finishPeop"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="征集意见">
              <opinionText 
                :opinionText="solicitOpinionDisabled" 
                :canDelet="false"
              ></opinionText>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="意见附件">
              <el-scrollbar>
                  <div v-for="item in fromData.muBanVo.feedbackAttachmentList" :key="item.id" class="tree_w">
                    <template>
                      <div class="command_wrap">
                        <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                        <div class="btns" >
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
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <timeLine v-if="showTimeLine" :processInstId="processInstId" :historyTradeCode="historyTradeCode" @subTimeLine="subTimeLine"></timeLine>
  </div>
</template>

<script>
import chooseRange from "../components/chooseRange";
import timeLine from "../components/timeLine";
import loadAccessory from "../../../components/LoadAccessory/LoadAccessory";
import timeDialog from "../../../components/timedialog/timedialog";
import appendWriteList from "../../../components/appendWriteList/appendWriteList";
import treeCofig from "../components/tree-muban";
import treeDepartment from "../components/tree-department";
import opinionText from "@/components/opinionText/indexfw";

import http from "@/http/http";
export default {
  name: "App",
  components: {
    // loadAccessory,
    // timeDialog,
    treeDepartment,
    appendWriteList,
    chooseRange,
    timeLine,
    treeCofig,
    opinionText
  },
  data() {
    return {
      historyTradeCode: this.$businessCode.ggfwgl1,
      isAdmin: false,
      canEdit: true,
      showPreserve: true,
      showComlete: true,
      showScheme: true,
      showSend: true,
      showZj: false,
      showSh: true,
      showDelect: true,
      showThreeBtn: false,
      fromData: {
        function: "document_save",
        muBanVo: {
          curNodeName: "",
          currentUser: "",
          id: "",
          workflowId: "",
          workflowCode: "",
          authorId: "",
          fabuTime: "",
          fanwen: "",
          sampleType: "", //示例类型
          fileType: "", //文件类型
          postType: "", //发文类型
          businessType: "", //业务分类
          redHead: "", //红头
          documentCode: "", //文种
          dealType: "", //处理类型
          qianbaoType: "", //签报类型
          csNumber: "", //呈送字号
          qbNumber: "", //签报字号
          fileTitle: "", //示例标题
          keywords: "",
          visibleRange: [],
          deletefileid: "",
          uploadfileid: "",
          author: "",
          remark: "",
          leadershipOpinion: ""
        }
      },
      yjzjfromData: {
        deptNames: "",
        deptIds: "",
        finishPeop:'',
        finishPeopId:''
      },
      dosendMubansub_parmas: {
        function: "dosendMubansub",
        deptNames: "",
        deptIds: ""
      },
      showYjzj: false,
      // yjzjrules:[]
      leadershipOpinionDisabled: [],
      solicitOpinionDisabled: [],
      remark: [],
      rules: {
        sampleType: [
          { required: true, message: "请选择示例类型", trigger: "change" }
        ],
        fileType: [
          { required: true, message: "请选择文件类型", trigger: "change" }
        ],
        postType: [
          { required: true, message: "请选择发文类型", trigger: "change" }
        ],
        businessType: [
          { required: true, message: "请选择业务分类", trigger: "change" }
        ],
        documentCode: [
          { required: true, message: "请选择文种", trigger: "change" }
        ],
        redHead: [
          { required: true, message: "请选择代字红头", trigger: "change" }
        ],
        dealType: [
          { required: true, message: "请选择处理类型", trigger: "change" }
        ],
        qianbaoType: [
          { required: true, message: "请选择签报类型", trigger: "change" }
        ],
        qbNumber: [
          { required: true, message: "请选择签报字号", trigger: "change" }
        ],
        csNumber: [
          { required: true, message: "请选择呈送字号", trigger: "change" }
        ],
        fileTitle: { required: true, message: "请输入标题", trigger: "blur" },
        visibleRange: { required: true, message: "请选择可见范围" }
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile", 
        fileName: "",
        filePath: ""
      },
      //删除附件
      delParams: {
        function: "document_delete",
        id: "" 
      },
      //   签报
      qbParams: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      //发文
      fwParams: {
        function: "getSendOrderDicByParam",
        organizationId: ""
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: ""
      },
      //完成并发送下拉框
      getNextNodeInfo_parmas: {
        function: "getNextNodeInfo",
        tplNo: "",
        curNodeCode: "",
        multiTenancyId: ""
      },
      selWfNode_parmas: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //完成并发送
      doSendMuBanPo_params: {
        function: "doSendMuBanPo",
        id: "",
        nextUserId: "",
        nextUserName: "",
        nextNodeId: ""
      },
      detail_params: {
        function: "document_getInfo",
        id: ""
      },
      // 收回
      takeBackSubflow_parmas: {
        function: "takeBackSubflow",
        id: "",
        multiTenancyId: "",
        pcsAvyId: "",
        subProcessInstId: "",
        takeBackDeptNames: ""
      },
      //发文下拉框数据
      sendType: [], //发文类型
      businessType: [], //业务类型
      textType: [], //文种
      SredHead: [], //代字红头
      //签报
      qianbaoType: [], //签报类型
      qbNumber: [],
      searchAll_params: {
        function: "setup_SearchAll"
      },
      chooseRangeData: [],
      chooseRangeStr: "",
      title: "模板及范文上传单",
      fileList: [],
      appendWriteDialog: true,
      clickTypes: 1,
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "人员选择", // 弹框标题
      showChooseRang: false,
      showTimeLine: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      treeData: [],
      dialogType: "",
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      offenUse: true, //标示常用设置
      seletOptionsData: [], //弹窗下拉框数据
      infoDisabled: false,
      showSpyj: false, //审批意见
      showBzText: true, //备注展示
      showBzInp: true, //备注输入框
      processInstId: "",
      treesingelCheckF: false, // 单选true 多选为false
      treedialogTit: "选择征集部门", // 弹框标题
      showTreeDepart: false,
      isAdd: false, //是否增发
      deptArr: [],
      checkeDept: [],
      chooseDept: false
    };
  },

  mounted() {},
  created() {
    //初始化加载数据
    // this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    // this.bank_doSend.id = this.bank_dispach.id;
    this.getQbList();
    this.getFwList();
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.fromData.muBanVo.author = userInfo.humanName;
    }
    if (JSON.parse(localStorage.getItem("tcHumanRole"))) {
      let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.isAdmin = tcHumanRole.some(item => {
        item.codeName == "系统管理员" || item.codeName == "超级管理员";
      });
      console.log(this.isAdmin);
    }
    this.getDetail();
  },
  watch: {
    "fromData.muBanVo.fileType": function(newv, oldv) {
      if (oldv == "发文") {
        this.fromData.muBanVo.postType = "";
        this.fromData.muBanVo.businessType = "";
        this.fromData.muBanVo.redHead = "";
        this.fromData.muBanVo.documentCode = "";
      } else if (oldv == "签报") {
        this.fromData.muBanVo.dealType = "";
        this.fromData.muBanVo.qianbaoType = "";
        this.fromData.muBanVo.qbNumber = "";
      } else if (oldv == "呈送件") {
        this.fromData.muBanVo.dealType = "";
        this.fromData.muBanVo.csNumber = "";
      }
    }
  },
  methods: {
    getQbList() {
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.qbParams),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.qianbaoType = JSON.parse(res.data.qianbaoType);
          this.qbNumber = JSON.parse(res.data.qbZihaoList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFwList() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.fwParams),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.sendType = JSON.parse(res.data.sendType);
          this.businessType = JSON.parse(res.data.businessType);
          this.textType = JSON.parse(res.data.textType);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDetail() {
      this.detail_params.id = this.$route.query.id;
      this.$post
        .postData(
          "document_getInfo",
          JSON.stringify(this.detail_params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res.data);
          this.fromData.muBanVo = Object.assign(
            this.fromData.muBanVo,
            res.data
          );
          this.leadershipOpinionDisabled =
            res.data.opinionMap.leadershipOpinionDisabled;
          this.solicitOpinionDisabled =
            res.data.opinionMap.solicitOpinionDisabled;
          this.remark = res.data.opinionMap.remark;
          console.log(this.fromData.muBanVo);
          this.processInstId = this.fromData.muBanVo.processInstId;
          if (
            res.data.solicitOpinionDep != undefined &&
            res.data.solicitOpinionDep != ""
          ) {
            this.yjzjfromData.deptNames = res.data.solicitOpinionDep;
            this.yjzjfromData.deptIds = res.data.solicitOpinionDepId;
            this.showThreeBtn = true;
          }
          this.yjzjfromData.finishPeop = res.data.solicitOpinionDepFinash||'';
          this.yjzjfromData.finishPeopId = res.data.solicitOpinionDepIdFinash||'';
          if (res.data.chiProcessInstId) {
            this.deptArr = res.data.chiProcessInstId;
          }
          this.fromData.muBanVo.visibleRange = JSON.parse(
            this.fromData.muBanVo.visibleRange
          );
          let rangeArr = [];
          this.fromData.muBanVo.visibleRange.forEach(item => {
            rangeArr.push(item.name);
          });
          this.chooseRangeStr = rangeArr.join("，");
          this.btnShow();
        })
        .catch(err => {
          console.log(err);
        });
    },
    btnShow() {
      console.log(this.fromData.muBanVo.curNodeCode);
      if (this.fromData.muBanVo.curNodeCode == "001") {
        //拟稿
        this.showBzText = false;
        this.showPreserve = true;
        this.showComlete = true;
        this.showScheme = true;
        this.showDelect = true;
        if (this.isAdmin) {
          this.showSend = true;
          this.showScheme = false;
          this.showComlete = false;
        }
      } else if (this.fromData.muBanVo.curNodeCode == "003") {
        //处审核
        this.canEdit = false;
        this.infoDisabled = true;
        this.showPreserve = true;
        this.showComlete = true;
        this.showScheme = true;
        this.showSend = true;
      } else if (this.fromData.muBanVo.curNodeCode == "002") {
        //综合处理
        this.showPreserve = true;
        this.showComlete = true;
        this.showYjzj = true;
      } else if (this.fromData.muBanVo.curNodeCode == "004") {
        //申请部门领导审批
        this.infoDisabled = true;
      } else if (this.fromData.muBanVo.curNodeCode == "800") {
        //处理完毕办结
        this.canEdit = false;
        this.showBzInp = false;
        this.showYjzj = true;
      }
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //获取代字红头
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.data) {
            this.SredHead = res.data;
          }
        });
    },
    goBack() {
     window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    upSuccess(response, file, fileList) {},
    upError(err, file, fileList) {
      console.log(err, file);
    },

    flowScheme() {
      this.showTimeLine = true;
    },
    subTimeLine() {
      this.showTimeLine = false;
    },
     downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fwglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState() ? location.origin : "") +
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
                duration: 500
              });
            }
          }
        });
    },
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
.form_content {
  width: 92%;
  margin: 0 auto;
  background-color: #ffffff14;
  border: 1px solid #bfbfbf;
  padding: 10px 20px;
  margin-bottom: 20px;
  .form_tip {
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid #faaa20;
    background-color: #fef7e7;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
    .red {
      color: #ff3300;
    }
  }
  .choose_sl {
    width: 100%;
    min-height: 50px;
    padding-left: 10px;
    line-height: 30px;
    margin-top: 10px;
    border: 1px solid #dcdfe6;
  }
  .el-select {
    width: 100%;
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
.spyj_warp {
  min-height: 70px;
  // height: 55px;
  background-color: #f2f2f2;
}
.spyj_box {
  // height: 55px;
  border: 1px solid #eee;
  padding: 10px 20px;
  background-color: #f2f2f2;
  color: #392a31;
  border-bottom: 1px solid #eee;
  .spyj_left {
    float: left;
  }
  .spyj_right {
    float: right;
  }
}
.zjyj_title {
  padding-left: 34px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #3b85ef;
}
.zjyj_box .el-input {
  width: 37%;
}
.zjyj_box .el-textarea {
  width: 37%;
}
.choose_btn {
  margin: 0 15px;
}
.text {
  // display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .spanname {
    margin-right: 10px;
  }
}
/deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #f00;
}
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
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
</style>
