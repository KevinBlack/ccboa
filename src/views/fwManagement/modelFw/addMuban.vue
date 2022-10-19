// *控制03：data中加入  huanJieMessage readFields requiredFields editedIdeaFields requiredIdeaFields buttonList

<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" @click="goBack">
          <i class="el-icon-arrow-left"></i>模板及范文流转
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <!-- <el-button plain @click="preserve(1)">保存</el-button>
          <el-button plain @click="completeSending">完成并发送</el-button>
          <el-button plain @click="delectArticle" v-show="fromData.muBanVo.id!=''">删除此文</el-button>-->
          <el-button
            size="small"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.type)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <el-button plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog> -->

    <div class="nav bank_dispach_content"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title}}</h3>
    </header>
    <div class="form_content bank_dispach_file">
      <div class="form_tip">
        <span>
          当前环节：
          <span class="red">{{this.fromData.muBanVo.curNodeName}}</span>
        </span>
        <span style="margin-left:30px">
          当前处理人：
          <span class="red">{{this.fromData.muBanVo.currentUser}}</span>
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
              <el-select v-model="fromData.muBanVo.sampleType" placeholder="请选择">
                <el-option label="模板" value="模板"></el-option>
                <el-option label="范文" value="范文"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件类型" prop="fileType">
              <el-select v-model="fromData.muBanVo.fileType" placeholder="请选择文件类型">
                <el-option label="发文" value="发文"></el-option>
                <el-option label="签报" value="签报"></el-option>
                <!-- <el-option label="便函" value="便函" v-show="fromData.muBanVo.sampleType=='范文'"></el-option> -->
                <!-- <el-option label="呈送件" value="呈送件"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="发文类型" prop="postType">
              <el-select v-model="fromData.muBanVo.postType" placeholder="请选择" @change="selectType">
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
              <el-select v-model="fromData.muBanVo.businessType" placeholder="请选择">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="代字/红头" prop="redHead">
              <el-select v-model="fromData.muBanVo.redHead" placeholder="请选择">
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
              <el-select v-model="fromData.muBanVo.documentCode" placeholder="请选择">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="fromData.muBanVo.dealType" placeholder="请选择">
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签报类型" prop="qianbaoType">
              <el-select v-model="fromData.muBanVo.qianbaoType" placeholder="请选择">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="签报字号" prop="qbNumber">
              <el-select v-model="fromData.muBanVo.qbNumber" placeholder="请选择">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '呈送件'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="fromData.muBanVo.dealType" placeholder="请选择">
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="呈送字号" prop="csNumber">
              <el-select v-model="fromData.muBanVo.csNumber" placeholder="请选择">
                <el-option label="e" value="ee"></el-option>
                <el-option label="ff" value="ff"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例标题" prop="fileTitle">
              <el-input maxlength="200" v-model="fromData.muBanVo.fileTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="关键词">
              <el-input maxlength="200" v-model="fromData.muBanVo.keywords"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例可见范围" prop="visibleRange">
              <el-button @click="chooseBtn">选择可见范围</el-button>
              <div class="choose_sl">{{chooseRangeStr}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mb10">
          <el-col :span="24">
            <el-form-item label="模板/范文" prop="attachments" ref="attachments">
              <el-row>
                <el-input type="hidden" v-model="attachments"></el-input>
                <!-- <loadAccessory></loadAccessory> -->
                <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
                  :isPreserve="isPreserve"
                  v-if="fromData.muBanVo.attachments.length<1"
                ></uploadFiles>
                <el-col>
                  <div
                    class="tree_w"
                    v-if="fromData.muBanVo.attachments&&fromData.muBanVo.attachments.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in  fromData.muBanVo.attachments"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_wrap">
                            <span
                              class="name down"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fwglfj)"
                            >{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index)"
                                v-if="fromData.muBanVo.attachments.length>1"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index)"
                                v-if="fromData.muBanVo.attachments.length>1"
                                :disabled="index==fromData.muBanVo.attachments.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
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
                </el-col>
                <el-col v-for="(item,n) in fkfj" :key="n">
                  <el-form-item :label="item" :key="item">
                    <el-scrollbar>
                      <div v-for="item1 in fkfjList[n]" :key="item1.id" class="tree_w">
                        <template>
                          <div class="command_wrap">
                            <span
                              class="name down"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fwglfj)"
                            >{{item1.fileName}}</span>
                            <span class="name">{{item1.createrName}}</span>
                            <span class="name">{{item1.createTime}}</span>
                          </div>
                        </template>
                      </div>
                    </el-scrollbar>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="m10">
          <el-col>
            <el-form-item label="审批意见">
              <!-- <div v-for="(item,index) in fromdata.opinionCheckList" :key="item.id" class="d_flex">
                <el-row class="d_b100">
                  <el-col
                    :span="22"
                    :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime}]"
                  >
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      rows="3"
                      class="d_f1"
                    ></el-input>
                    <span class="adviceInfo">{{item.departmentName+" "+item.createTime}}</span>
                  </el-col>
                  <el-col :span="2" v-if="index==0&& item.createTime ==fromdata.opinionMaxTime">
                    <button
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      @click="deletService('huiqian',n)"
                    >
                      <i class="el-icon-delete"></i>
                    </button>
                  </el-col>
                </el-row>
              </div>-->
              <div style="display:flex">
                <el-input
                  type="textarea"
                  maxlength="500"
                  style="flex:1"
                  v-model="fromData.opinionCheck"
                  :disabled="infoDisabled"
                ></el-input>
                <button
                  v-if="!infoDisabled"
                  @click="writelistbox"
                  type="button"
                  class="el-button el-button--default dimi_btn"
                >
                  <i class="el-icon-plus"></i>
                </button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="作者">
              <el-input maxlength="200" v-model="fromData.muBanVo.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="备注">
              <el-input
                maxlength="200"
                type="textarea"
                resize="none"
                autosize
                v-model="fromData.muBanVo.remark"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <treeCofig
      :defaultUser="defaultUser"
      :treeData="treeData"
      :loadingTree="loadingTree"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogTypeDosend"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="fromData.muBanVo"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <chooseRange
      :subdialogTit="subdialogTit"
      :subsingelCheckF="subsingelCheckF"
      :chooseRangeData="chooseRangeData"
      @subshowCompDialog="subshowCompDialog"
      :nowCheckList="nowCheckList"
      :nowCheckIds="nowCheckIds"
      :fromdata="fromData"
      v-if="showChooseRang"
    ></chooseRange>
    <timeLine
      v-if="showTimeLine"
      :processInstId="processInstId"
      :historyTradeCode="historyTradeCode"
      @subTimeLine="subTimeLine"
    ></timeLine>
  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
import chooseRange from "../components/chooseRange";
import timeLine from "../components/timeLine";
import loadAccessory from "../../../components/LoadAccessory/LoadAccessory";
import timeDialog from "../../../components/timedialog/timedialog";
import minixs from "@/minixs/index";
import appendWriteList from "../../../components/appendWriteList/appendWriteList";
import treeCofig from "../../../components/tree/tree-fawen";
import uploadFiles from "../../../components/uploadFile/uploadFileFw";
import http from "@/http/http";
export default {
  name: "App",
  components: {
    // loadAccessory,
    // timeDialog,
    appendWriteList,
    chooseRange,
    timeLine,
    treeCofig,
    uploadFiles
  },
  mixins: [minixs, viewDraft],
  data() {
    return {
      historyTradeCode: this.$businessCode.ggfwgl1,
      treeTradeCode: "",
      attachments: "",
      nowCheckIds: [], // 可见范围选中数据的id
      nowCheckList: [], // 可见范围选中的数据
      isPreserve: false, //是否保存
      /**111 */
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        width: "auto",
        isSpecial: 5,
        formId: "formFile"
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
      huanJieMessage: {},
      readFields: {
        sampleType: false,
        postType: false,
        fileType: false,
        businessType: false,
        redHead: false,
        documentCode: false,
        dealType: false,
        qianbaoType: false,
        qbNumber: false,
        csNumber: false,
        fileTitle: false,
        keywords: false,
        visibleRange: false,
        attachments: true
      },
      requiredFields: {
        sampleType: false,
        postType: false,
        fileType: false,
        businessType: false,
        redHead: false,
        documentCode: false,
        dealType: false,
        qianbaoType: false,
        qbNumber: false,
        csNumber: false,
        fileTitle: false,
        visibleRange: false,
        attachments: true
      }, //必填控制域
      editedIdeaFields: {
        opinionCheck: true,
        author: true,
        remark: true
      }, //可编辑意见域
      requiredIdeaFields: {},
      //必填意见域
      buttonList: [
        { name: "保存", type: "btn_bc", show: true },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "删除此文", type: "btn_del", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],
      // 表单
      fromData: {
        function: "document_save",
        muBanVo: {
          attachSort: [],
          curNodeName: "拟稿",
          currentUser: "",
          id: "",
          workflowId: "",
          workflowCode: "",
          authorId: "",
          fabuTime: "",
          fanwen: "0", //0:模板范文；1管理员起草页面
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
          attachments: []
        }
      },
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
        attachments: {
          required: true,
          message: "请上传附件",
          trigger: "change"
        },
        visibleRange: { required: true, message: "请选择可见范围" }
      },
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
        curNodeId: "",
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
        nextNodeId: "",
        nextNodeName: ""
      },
      defaultUser: {}, //完成并发送默认值
      loadingTree: false,
      detail_params: {
        function: "document_getInfo",
        id: ""
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
      chooseRangeData: [], //选择可选范围
      chooseRangeStr: "",
      title: "模板及范文上传单",
      appendWriteDialog: true,
      clickTypes: 1,
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "部门选择", // 弹框标题
      // sendList: [],
      outerAddTeam: false,
      showChooseRang: false,
      showTimeLine: false,
      canTab: false, //标示是否左右三列布局
      // offenUse: false, //标示常用设置
      dialogTypeDosend: "dosend", //弹窗类型
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
      infoDisabled: true,
      continue: false,
      rangeArr: []
    };
  },

  mounted() {},
  created() {
    this.uploadConfig.code = this.$businessCode.fwglfj;
    this.uploadConfig.newcode = this.$businessCode.fwgl;

    this.treeTradeCode = this.$businessCode.ggfwgl1; //人员树交易线

    if (JSON.parse(localStorage.getItem("userInfo"))) {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.fromData.muBanVo.author = userInfo.humanName;
      this.fromData.muBanVo.currentUser = userInfo.humanName;

      this.fromData.muBanVo.visibleRange = this.nowCheckList = [
        {
          TYPE: "user",
          id: userInfo.firstUnitId,
          name: userInfo.shortFirstUnitName,
          pId: userInfo.unitId
        }
      ];
      this.nowCheckIds.push(userInfo.firstUnitId);
      this.chooseRangeStr = userInfo.shortFirstUnitName;
    }
    this.$route.query.id =
      this.$route.query.id == undefined ? "" : this.$route.query.id;
    if (this.$route.query.id) {
      this.isPreserve = true;
    }

    this.getDetail(this.$route.query.id); //详情
    this.getQbList(); //签报的下拉框
    this.getFwList(); //发文的下拉框
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
    doDraft(fileInfo) {
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      let data = "";
      let fileConfig = fileInfo;
      data = this.$router.resolve({
        path: openPath,
        query: {
          state: "viewFile",
          id: "",
          zhengWenState: 0,
          JYcode: this.$businessCode.fwglfj,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          showBtns: false
        }
      });
      window.open(data.href, "_blank");
    },
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve(1);
          break;
        case "btn_wcbfs":
          this.completeSending();
          break;
        case "btn_del":
          this.delectArticle();
          break;
        case "btn_cklc":
          this.flowScheme();
          break;
        case "btn_czzn":
          this.instructions();
          break;
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
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          sampleType: [
            {
              required: this.requiredFields.sampleType,
              trigger: "change",
              message: "请选择示例类型"
            }
          ],
          postType: [
            {
              required: this.requiredFields.postType,
              trigger: "change",
              message: "请选择文件类型"
            }
          ],
          fileType: [
            {
              required: this.requiredFields.fileType,
              trigger: "change",
              message: "请选择发文类型"
            }
          ],
          businessType: [
            {
              required: this.requiredFields.businessType,
              trigger: "change",
              message: "请选择业务分类"
            }
          ],
          redHead: [
            {
              required: this.requiredFields.redHead,
              trigger: "change",
              message: "请选择代字/红头"
            }
          ],
          documentCode: [
            {
              required: this.requiredFields.documentCode,
              trigger: "change",
              message: "请选择文种"
            }
          ],
          dealType: [
            {
              required: this.requiredFields.dealType,
              trigger: "change",
              message: "请选择处理类型"
            }
          ],
          qianbaoType: [
            {
              required: this.requiredFields.qianbaoType,
              trigger: "change",
              message: "请选择签报类型"
            }
          ],
          qbNumber: [
            {
              required: this.requiredFields.qbNumber,
              trigger: "change",
              message: "请选择签报字号"
            }
          ],
          csNumber: [
            {
              required: this.requiredFields.csNumber,
              trigger: "change",
              message: "请选择呈送字号"
            }
          ],
          fileTitle: [
            {
              required: this.requiredFields.fileTitle,
              trigger: "change",
              message: "请选择示例标题"
            }
          ],
          attachments: [
            {
              required: this.requiredFields.attachments,
              trigger: "change",
              message: "请上传附件"
            }
          ],
          visibleRange: [
            {
              required: this.requiredFields.visibleRange,
              trigger: "change",
              message: "请选择示例可见范围"
            }
          ]
        };
      });
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.muban.clearValidate();
      });
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.location.href = "about:blank";
          window.close();
          window.opener.location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    getQbList() {
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.qbParams),
          this.$businessCode.qbgl
        )
        .then(res => {
          console.log(res);
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
          console.log(res);
          this.sendType = JSON.parse(res.data.sendType);
          this.businessType = JSON.parse(res.data.businessType);
          this.textType = JSON.parse(res.data.textType);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择类型
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.fromData.muBanVo.redHead = ""
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
          } else {
            this.SredHead = [];
          }
        });
    },
    goBack() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    writelistvalue(data) {
      if (data) {
        console.log(data);
        this.fromData.opinionCheck = this.fromData.opinionCheck
          ? this.fromData.opinionCheck + data
          : data;
      }
    },
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //选择可见范围
    chooseBtn() {
      this.$post
        .postData(
          "setup_SearchAll",
          JSON.stringify(this.searchAll_params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          // let chooseRangeObj = Object.assign({},res.data)
          this.chooseRangeData = res.data;
          if (res.data) {
            this.showChooseRang = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    subshowCompDialog(data,type) {
      if (!type) {
        this.showChooseRang = false;
      } else {
        this.fromData.muBanVo.visibleRange = this.nowCheckList = data;
        let checkArr = [];
        this.nowCheckIds = [];
        data.forEach(item => {
          checkArr.push(item.name);
          this.nowCheckIds.push(item.id);
        });
        this.chooseRangeStr = checkArr.join("，");
        this.showChooseRang = false;
      }
    },
    //查看流程
    flowScheme() {
      this.showTimeLine = true;
    },
    subTimeLine() {
      this.showTimeLine = false;
    },
    //完成并发送  先保存
    async completeSending() {
      this.attachments = "123";
      this.$refs["muban"].validate(async valid => {
        if (valid) {
          await this.preserve(2); // 1表示直接保存  2表示完成并发送后的保存
        } else {
          console.log("error submit!!");
          this.continue = false;
          return false;
        }
      });
    },
    async preserve(type) {
      // if (type === "uploadfile") {  //这段代码好像没用
      //   /**111 */
      //   if (this.doSendMuBanPo_params.id != "") {
      //     this.$refs.uploadComponent.uploadFileNow();
      //     return;
      //   } else {
      //     this.$message.error("请先保存!");
      //     return;
      //   }
      // }
      this.fromData.function = "document_save";
      let res = await this.$post.postData(
        "document_save",
        JSON.stringify(this.fromData),
        this.$businessCode.fwgl1
      );
      if (res.success) {
        if (type != "uploadfile" && type != 2) {
          this.$message({
            message: "保存成功!",
            type: "success"
          });
        }
        this.doSendMuBanPo_params.id = res.data.id;
        this.getNextNodeInfo_parmas.tplNo = res.data.tplNo; //弹出dialog中的下拉框 参数
        this.getNextNodeInfo_parmas.curNodeId = res.data.curNodeCode;
        this.getNextNodeInfo_parmas.multiTenancyId = res.data.multiTenancyId;

        this.selWfNode_parmas.curTplNo = res.data.tplNo; //弹出dialog中的树 参数
        this.selWfNode_parmas.curMultiTenancyId = res.data.multiTenancyId;
        // this.selWfNodeParmas.curTplNo = res.data.pTplNo

        this.fromData.muBanVo.id = res.data.id;
        if (res.data.id) {
          this.isPreserve = true;
        }

        if (type === "uploadfile") {
          this.uploadConfig.id = res.data.id;
          this.fromData.muBanVo.id = res.data.id;
          this.isPreserve = true;
          this.$refs.uploadComponent.uploadFileNow();
        }
        //页面url上+ id
        this.$router.replace({
          path: "/addMuban",
          query: {
            id: res.data.id
          }
        });
        window.opener && window.opener.location.reload();
        this.getDetail(res.data.id);
        if (type == 2) {
          let res1 = await this.$post.postData(
            "getNextNodeInfo",
            JSON.stringify(this.getNextNodeInfo_parmas),
            this.$businessCode.fwgl1
          );
          let parmSelf = Object.assign(
            this.selWfNode_parmas,
            this.fromData.muBanVo
          );
          parmSelf.pcsAvyId = res1.data[0].PCSAVYID;

          this.fromData.function = "selWfNode";
          let res2 = await this.$post.postData(
            "selWfNode",
            JSON.stringify(parmSelf),
            this.$businessCode.fwgl1
          );

          // if( res.data[0] && res.data[0].file_name ){
          this.attachments = "123";
          //   this.setConfig()
          //   this.setFormConfig()
          // }
          console.log(res1, res2);
          this.seletOptionsData = res1.data; //下拉框数据
          if (res2.message == "Loading") this.loadingTree = true;
          this.treeData = res2.data.data; //树
          this.defaultUser = (res2.data && res2.data.defaultUser) || {};
          this.dialogState = true;
        }
      }

      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    getDetail(id) {
      let that = this;
      this.detail_params.id = id;
      this.uploadConfig.id = id;
      this.$post
        .postData(
          "document_getInfo",
          JSON.stringify(this.detail_params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          this.fromData.muBanVo = Object.assign(
            this.fromData.muBanVo,
            res.data
          );
          if (res.data.processInstId) {
            this.$post
              .postData(
                "getNextUserTaskNode",
                JSON.stringify({
                  function: "getNextUserTaskNode",
                  processInstId: res.data.processInstId
                }),
                this.$businessCode.ggfwgl1
              )
              .then(res => {
                this.huanJieMessage = res.data.extAttributes;
                this.setConfig();
                this.setFormConfig();
              })
              .catch(err => {
                console.log(err);
              });
            //readFlag
            // if(this.readFlag != 1){
            //   this.getReadFlag();
            // }
          } else {
            this.$post
              .postData(
                "getpcsTplStartNode",
                JSON.stringify({
                  function: "getpcsTplStartNode",
                  multiTenancyId: res.data.multiTenancyId
                }),
                this.$businessCode.ggfwgl1
              )
              .then(res => {
                this.huanJieMessage = res.data;
                this.setConfig();
                this.setFormConfig();
              })
              .catch(err => {
                console.log(err);
              });
          }
          //已上传的文件
          this.uploadConfig.filesHas = this.fromData.muBanVo.attachments;
          this.fromData.muBanVo.attachSort = [];
          this.processInstId = this.fromData.muBanVo.processInstId;

          that.nowCheckList = JSON.parse(res.data.visibleRange) || [];
          that.nowCheckList.map(node => {
            node.disabled = true;
          });
          that.fromData.muBanVo.visibleRange =
            JSON.parse(res.data.visibleRange) || [];
          that.nowCheckList.forEach(item => {
            that.nowCheckIds.push(item.id);
            that.rangeArr.push(item.name);
          });
          that.nowCheckIds = Array.from(new Set([...that.nowCheckIds]));
          that.rangeArr = Array.from(new Set([...that.rangeArr]));
          that.chooseRangeStr = that.rangeArr.join("，");
          console.log(that.nowCheckIds, that.rangeArr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    delectArticle() {
      if (this.fromData.muBanVo.id !== "") {
        this.delParams.id = this.fromData.muBanVo.id;
        this.$confirm("是否删除此文?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$post
            .postData(
              "document_delete",
              JSON.stringify(this.delParams),
              this.$businessCode.fwgl1
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "删除成功!",
                  type: "success"
                });
                this.$router.push("/modelFw");
              } else {
                this.$message.error("删除失败!");
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        });
      } else {
        this.$router.push("/modelFw");
      }
    },
    showCompDialog(data, type, a, selectInfo) {
      console.log(data);
      this.dialogState = false;
      if (type) {
        let nextUserId = data[0].id;
        //  let nextUserId = data[0].id.substring(0,data[0].id.indexOf("#"));
        this.doSendMuBanPo_params.nextUserId = nextUserId;
        this.doSendMuBanPo_params.nextUserName = data[0].name;
        this.doSendMuBanPo_params.nextNodeId = selectInfo.id;
        this.doSendMuBanPo_params.nextNodeName = selectInfo.name;
        console.log(this.doSendMuBanPo_params);
        this.$post
          .postData(
            "doSendMuBanPo",
            JSON.stringify(this.doSendMuBanPo_params),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.dialogState = false;
              this.$message({
                message: "发送成功!",
                type: "success"
              });
              setTimeout(() => {
                this.goBack();
              }, 2000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    upRow(n) {
      let midObj;
      this.fromData.muBanVo.attachSort.push(
        {
          id: this.fromData.muBanVo.attachments[n - 1].id,
          sort: this.fromData.muBanVo.attachments[n].sort
        },
        {
          id: this.fromData.muBanVo.attachments[n].id,
          sort: this.fromData.muBanVo.attachments[n - 1].sort
        }
      );
      midObj = this.fromData.muBanVo.attachments[n];
      this.fromData.muBanVo.attachments[n] = this.fromData.muBanVo.attachments[
        n - 1
      ];
      this.fromData.muBanVo.attachments[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromData.muBanVo.attachSort.push(
        {
          id: this.fromData.muBanVo.attachments[n + 1].id,
          sort: this.fromData.muBanVo.attachments[n].sort
        },
        {
          id: this.fromData.muBanVo.attachments[n].id,
          sort: this.fromData.muBanVo.attachments[n + 1].sort
        }
      );
      midObj = this.fromData.muBanVo.attachments[n];
      this.fromData.muBanVo.attachments[n] = this.fromData.muBanVo.attachments[
        n + 1
      ];
      this.fromData.muBanVo.attachments[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.$businessCode.fwglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 500
              });
              this.fromData.muBanVo.attachments.splice(n, 1);
              this.uploadConfig.filesHas = this.fromData.muBanVo.attachments;
              this.attachments = "";
              this.setConfig();
              this.setFormConfig();
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 500
              });
            }
          }
        });
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
                duration: 500
              });
            }
          }
        });
    },

    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "MBFWGL"
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
                    id: this.fromData.muBanVo.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromData.muBanVo.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.fwbz //流程交易线     chai
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

    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile.fileName;
      self.bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
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
    }
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
    line-height: 42px;
    display: inline-block;
    text-overflow: ellipsis;
    width: 200px;
    overflow: hidden;
  }
  .down {
    cursor: pointer;
  }
  .down:hover {
    color: #3b85ef;
  }
}
</style>
