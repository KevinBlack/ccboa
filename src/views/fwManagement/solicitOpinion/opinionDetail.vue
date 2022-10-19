<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" @click="goBack">
          <i class="el-icon-arrow-left"></i>模板及范文意见征集
        </p>

        <div class="grid_comtent">
          <el-button plain size="small" class="bank_grid_comtent_active" @click="goBack">关闭</el-button>
          <!-- <el-button plain @click="preserve(1)" v-show="showPreserve">保存</el-button>
          <el-button plain @click="completeSending">选择征集人</el-button>
          <el-button plain @click="updateOpinion">提交征集意见</el-button>-->
          
          


          <!-- <el-button plain @click="completeSending" v-show="showComlete">完成并发送</el-button>
          <el-button plain @click="sendFile" v-show="showSend">发布</el-button>
          <el-button plain v-show="showZj">发征集部门</el-button>
          <el-button plain v-show="showSh" @click="callBack">收回</el-button>
          <el-button plain @click="delectArticle" v-show="showDelect">删除此文</el-button>-->

           <el-button size="small" v-for="(item,index) in buttonList" @click="buttonClick(item.type)" :key="index"
            v-show="buttonList[index].show" plain>{{item.name}}
          </el-button>
          <el-button size="small" plain @click="callBack" v-if="state == 2">收回</el-button>
          <el-button plain @click="flowScheme" v-show="showScheme">查看流程</el-button>
          <el-button plain @click="instructions">操作指南</el-button> 
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <div class="nav bank_dispach_content"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title}}</h3>
    </header>
    <div class="form_content bank_dispach_file">
      <div class="form_tip bank_dispach_annotation">
        <span>
          当前环节：
          <span class="red">{{fromData.muBanVo.curNodeName}}</span>
        </span>
        <span style="margin-left:30px">
          当前处理人：
          <span v-show="opinionShow" class="red">{{fromData.muBanVo.currentUser}}</span>
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select v-model="fromData.muBanVo.dealType" placeholder="请选择" :disabled="readFields.dealType">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
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
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '呈送件'">
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
              <el-button disabled @click="chooseBtn">选择可见范围</el-button>
              <div class="choose_sl">{{chooseRangeStr}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板/范文">
              <!-- <uploadFiles
                ref="uploadComponent"
                @preserve="preserve"
                :uploadConfig="uploadDisabledConfig"
                :disabled="!uploadDisabled"
              ></uploadFiles> -->
              <el-col>
                <el-scrollbar>
                  <div v-for="item in fromData.muBanVo.attachments" :key="item.id" class="tree_w">
                    <template>
                      <div class="command_wrap">
                        <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)">{{item.fileName}}</span>
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
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审批意见">
              <div class="fix_height">
                <el-input
                  type="textarea"
                  resize="none"
                  autosize
                  v-model="leadershipOpinionDisabled"
                  v-if="!(leadershipOpinionDisabled && leadershipOpinionDisabled.length!=0)"
                  :disabled="true"
                ></el-input>
              </div>
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
        <el-row>
          <el-col>
            <div class="zjyj_title">意见征集</div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="征集意见">
                  <div style="display:flex;margin-top:10px" v-if="opinionShow && state == 1">
                    <el-input
                      type="textarea"
                      style="flex:1"
                      v-model="fromData.muBanVo.solicitOpinion"
                    ></el-input>
                    <!-- v-if="!infoDisabled" -->
                    <button
                      @click="writelistbox"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                    >
                      <i class="el-icon-edit select-chang"></i>
                    </button>
                  </div>
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
                  <el-row >
                    <!-- <loadAccessory></loadAccessory> -->
                    <uploadFiles
                      ref="uploadComponent"
                      @preserve="preserve"
                      :uploadConfig="uploadConfig"
                       v-if="fromData.muBanVo.feedbackAttachmentList.length==0 && state == 1"
                    ></uploadFiles>
                    <el-col>
                      <div
                        class="tree_w"
                        v-if="fromData.muBanVo.feedbackAttachmentList&&fromData.muBanVo.feedbackAttachmentList.length"
                      >
                        <el-scrollbar>
                          <div
                            v-for="(item,index) in  fromData.muBanVo.feedbackAttachmentList"
                            :key="item.id"
                            class="comp_list"
                          >
                            <template>
                              <div class="command_wrap">
                                <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)">{{item.fileName}}</span>
                                <span class="name">{{item.createrName}}</span>
                                <span class="name">{{item.createTime}}</span>
                                <div class="btns">
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="upRow(index)"
                                    v-if="fromData.muBanVo.feedbackAttachmentList.length>1 && state == 1"
                                    :disabled="index==0"
                                    round
                                  >上移</el-button>
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="downRow(index)"
                                    v-if="fromData.muBanVo.feedbackAttachmentList.length>1 && state == 1"
                                    :disabled="index==fromData.muBanVo.feedbackAttachmentList.length-1"
                                    round
                                  >下移</el-button>
                                  <el-button
                                    type="warning"
                                    size="mini"
                                    @click.native="deleteRow(index,item.id)"
                                    :disabled="item.disabled"
                                    v-if="state == 1"
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
                                <span class="name down" @click="viewDraftFile(item1.fileName,item1.filePath ,$businessCode.fawglfj)">{{item1.fileName}}</span>
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
          </el-col>
        </el-row>
      </el-form>
      <!-- <div class="zjyj_title">意见征集</div>
      <el-form ref="yjzj" :model="yjzjfromData" label-width="110px" class="demo_ruleForm">
        
      </el-form>-->
    </div>
    <treeCofig
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
      :seletOptionsData="seletOptionsData"
      :treeTradeCode="treeTradeCode"
      @showCompDialog="showCompDialog"
      :fromdata="fromData"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      :offenDevices="offenDevices"
      @deleteCommonUse="deleteCommonUse"
      @addCommonUse="addCommonUse"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <chooseRange
      :subdialogTit="subdialogTit"
      :subsingelCheckF="subsingelCheckF"
      :chooseRangeData="chooseRangeData"
      @subshowCompDialog="subshowCompDialog"
      v-if="showChooseRang"
    ></chooseRange>
    <treeDepartment
      :treedialogTit="treedialogTit"
      :treesingelCheckF="treesingelCheckF"
      @treeshowCompDialog="treeshowCompDialog"
      v-if="showTreeDepart"
    ></treeDepartment>
    <!-- <timeLine v-if="showTimeLine" :processInstId="processInstId" :historyTradeCode="historyTradeCode" @subTimeLine="subTimeLine"></timeLine> -->
  </div>
</template>

<script>
import chooseRange from "../components/chooseRange";
// import timeLine from "../components/timeLine";
import loadAccessory from "../../../components/LoadAccessory/LoadAccessory";
import timeDialog from "@/components/timedialog/timedialog";
import appendWriteList from "../../../components/appendWriteList/appendWriteList";
import treeCofig from "../../../components/tree/tree-fawen";
import minixs from "@/minixs/index";
import treeDepartment from "../components/tree-department";
import uploadFiles from "../../../components/uploadFile/uploadFileFw";
import http from "@/http/http";
import opinionText from "@/components/opinionText/indexDsipatch";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "App",
  components: {
    // loadAccessory,
    timeDialog,
    treeDepartment,
    appendWriteList,
    chooseRange,
    // timeLine,
    treeCofig,
    uploadFiles,
    opinionText
  },
  mixins: [minixs,viewDraft],
    /**业务代码同addMuban.vue*/
  data() {
    return {
      timeShow:false,
      readFlag: "",//已读未读
      treeTradeCode:'',//交易线拆分
      historyTradeCode: this.$businessCode.ggfwgl1,
      state: this.$route.query.state,
      uploadDisabled: false,
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      /**111 */
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        width: "auto",
        isSpecial: 4,
        formId: "formFile"
      },
      // uploadDisabledConfig:{
      //   id: "",
      //   url: "uploadFiles",
      //   code: "",
      //   filesHas: [],
      //   width: "auto"
      // },
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
      huanJieMessage:{},
      readFields:{
        sampleType:false,
        postType:false,
        fileType:false,
        businessType:false,
        redHead:false,
        documentCode:false,
        dealType:false,
        qianbaoType:false,
        qbNumber:false,
        csNumber:false,
        fileTitle:false,
        keywords:false,
        visibleRange:false,
        author:false,
        opinionCheck:false,
        remark:false,
      },
      requiredFields: {
      },//必填控制域
      editedIdeaFields: {
        solicitOpinion: true,
        dealType:false
      },//可编辑意见域
      requiredIdeaFields: {
      },
      //必填意见域
      buttonList: [
        {name: '保存', type: 'btn_bc', show: false},
        {name: "选择征集人", type: "btn_completeSending", show: false},
        {name: "提交征集意见", type: "btn_updateOpinion", show: false},
        {name: "收回", type: "btn_callBack", show: false},
        {name: "查看流程", type: "btn_cklc", show: false},
        {name: "操作指南", type: "btn_czzn", show: false}
      ],
      /**222 */
      isAdmin: false,
      canEdit: true,
      showPreserve: true,
      showComlete: true,
      showScheme: true,
      showSend: true,
      showZj: true,
      showSh: true,
      showDelect: true,
      opinionShow: true,
      //常用意见
      offenDevices:[],
      fromData: {
        function: "huqianSave",
        muBanVo: {
          attachSort: [],
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
          // leadershipOpinion: "",
          solicitOpinion: "",
          finalOpinion: 0,
          feedbackAttachmentList:[],
          multiTenancyId: ''
        }
      },
      //常用批示意见
      option_selectCommonUseList:{
        function: "selectCommonUseList",
        id:'',
        userId:'',
        userName:'',
        content:'',
        sort:'',
        createtime:''
      },
      yjzjfromData: {
        a: "11"
      },
      showYjzj: false,
      // yjzjrules:[]
      leadershipOpinionDisabled: [],
      solicitOpinionDisabled: [],
      remark: [],
      rules: {
        sampleType: [{ required: true, message: "请选择示例类型", trigger: "change" }],
        fileType: [{ required: true, message: "请选择文件类型", trigger: "change" }],
        postType: [{ required: true, message: "请选择发文类型", trigger: "change" }],
        businessType: [{ required: true, message: "请选择业务分类", trigger: "change" }],
        documentCode: [{ required: true, message: "请选择文种", trigger: "change" }],
        redHead: [{ required: true, message: "请选择代字红头", trigger: "change" }],
        dealType: [{ required: true, message: "请选择处理类型", trigger: "change" }],
        qianbaoType: [{ required: true, message: "请选择签报类型", trigger: "change" }],
        qbNumber: [{ required: true, message: "请选择签报字号", trigger: "change" }],
        csNumber: [{ required: true, message: "请选择呈送字号", trigger: "change" }],
        fileTitle: { required: true, message: "请输入标题", trigger: "blur" },
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
        function: "finishAndSendsubflow",
        id: "",
        nextUserId: "",
        nextUserName: "",
        nextNodeId: "",
        nextNodeName: "",
        curNodeCode: "",
        tplNo: "",
        pcsAvyId: "",
        multiTenancyId: "",
        processInstId: ""
      },
      loadingTree: false,
      detail_params: {
        function: "mubanAdvice_findById",
        id: ""
      },
      //收回
      callBack_params: {
        function: "takeBackChildFlow",
        pcsAvyId: "",
        multiTenancyId: ""
      },
      //提交征集意见
      updateOpinions_params: {
        function: "doFinishSubFlow",
        id: "",
        multiTenancyId: "",
        deptId: "",
        deptName: "",
        parentId: "",
        tplNo: "",
        pcsAvyId: "",
        processInstId: "",
        curNodeCode: ""
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
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      dialogTypeDosend: "dosend",
      seletOptionsData: [], //弹窗下拉框数据
      infoDisabled: false,
      showSpyj: false, //审批意见
      showBzText: true, //备注展示
      showBzInp: true, //备注输入框
      processInstId: "",
      treesingelCheckF: true, // 单选true 多选为false
      treedialogTit: "选择征集部门", // 弹框标题
      showTreeDepart: false
    };
  },

  mounted() {},
  created() {
    //初始化加载数据
    // this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    // this.bank_doSend.id = this.bank_dispach.id;
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.getQbList();
    this.getFwList();
    this.treeTradeCode = this.$businessCode.fwgl1;

    this.uploadConfig.newcode = this.$businessCode.fwgl;
    this.uploadConfig.code = this.$businessCode.fwglfj;
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
    doDraft(fileInfo) {
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      let data = '';
      let fileConfig = fileInfo;
      data = this.$router.resolve({
        path: openPath,
        query: {
          state: "viewFile",
          id:'',
          zhengWenState: 0,
          JYcode: this.$businessCode.fwglfj,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          showBtns: false,
        }
      });
      window.open(data.href, "_blank");
    },
    buttonClick(params){
        switch(params){
          case "btn_bc":
              this.preserve(1);
              break;
          case "btn_completeSending":
              this.completeSending();
              break;
          case "btn_updateOpinion":
              this.updateOpinion();
              break;
          case "btn_callBack":
              this.callBack();
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
      this.requiredFields = this.setRequiredIdeaFields(this.requiredFields, this.huanJieMessage.requiredFields)//必填控制
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
      this.buttonList = this.showButton(this.buttonList, this.huanJieMessage.visibleButtons, this.huanJieMessage.visibleButtonsBycondition)//按钮
      this.editedIdeaFields = this.setEditedIdeaFields(this.editedIdeaFields, this.huanJieMessage.editedIdeaFields, this.huanJieMessage.editedIdeaFieldsBycondition)//可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.huanJieMessage.requiredIdeaFields)//可编辑意见域
    },
    setFormConfig() {
     this.$nextTick(()=>{
       this.rules = {
        }
     })
     this.$forceUpdate();
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
      this.uploadConfig.id = this.$route.query.id;
      this.$post
        .postData(
          "mubanAdvice_findById",
          JSON.stringify(this.detail_params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res.data);
          this.fromData.muBanVo = Object.assign(
            this.fromData.muBanVo,
            res.data
          );

          this.getNextNodeInfo_parmas.tplNo = res.data.tplNo;
          this.getNextNodeInfo_parmas.curNodeId = res.data.curNodeCode;
          this.getNextNodeInfo_parmas.multiTenancyId = res.data.multiTenancyId;
          if (this.readFlag != "" && this.readFlag != 1) {
            this.$post
              .postData(
                "doUpdateReadRecord",
                JSON.stringify({
                  function: "doUpdateReadRecord",
                  pcsAvyId: res.data.pcsAvyId,
                  processInstId: res.data.processInstId,
                  multiTenancyId: res.data.multiTenancyId
                }),
                this.$businessCode.fwgl1,null,true
              )
              .then(res => {
                 window.opener&&window.opener.location.reload();
                //更新状态用。暂时不用任何操作
              });
          }
          if(res.data.processInstId){
            this.$post
            .postData("getNextUserTaskNode", 
            JSON.stringify({function:"getNextUserTaskNode",processInstId:res.data.processInstId}), 
            this.$businessCode.ggfwgl1
            )
            .then(res => {
                this.huanJieMessage = res.data.extAttributes;
                this.setConfig()
                this.setFormConfig()
              }).catch((err)=>{
                console.log(err)
              })
              //readFlag
              // if(this.readFlag != 1){
              //   this.getReadFlag();
              // }
          }else{
            this.$post
            .postData("getpcsTplStartNode", 
            JSON.stringify({function:"getpcsTplStartNode",multiTenancyId:res.data.multiTenancyId}), 
            this.$businessCode.ggfwgl1
            )
            .then(res => {
                this.huanJieMessage = res.data;
                this.setConfig();
                this.setFormConfig();
              }).catch((err)=>{
                console.log(err)
              })
          }


          this.leadershipOpinionDisabled =
            res.data.opinionMap.leadershipOpinionDisabled;
          this.solicitOpinionDisabled =
            res.data.opinionMap.solicitOpinionDisabled;
          this.remark = res.data.opinionMap.remark;
          console.log(this.fromData.muBanVo);
          //已上传的文件
          // console.log(this.fromData.muBanVo.feedbackAttachmentList)
          this.uploadConfig.filesHas = this.fromData.muBanVo.feedbackAttachmentList;
          this.fromData.muBanVo.attachSort = [];
          this.processInstId = this.fromData.muBanVo.processInstId;
          this.fromData.muBanVo.visibleRange = JSON.parse(
            this.fromData.muBanVo.visibleRange
          );
          let rangeArr = [];
          this.fromData.muBanVo.visibleRange.forEach(item => {
            rangeArr.push(item.name);
          });
          if (this.fromData.muBanVo.curNodeCode == "800") {
            this.opinionShow = false;
          }
          this.chooseRangeStr = rangeArr.join("，");
          
          this.selWfNode_parmas.curTplNo = res.data.tplNo;
          this.selWfNode_parmas.curMultiTenancyId = res.data.multiTenancyId;
          this.doSendMuBanPo_params.curNodeCode = res.data.curNodeCode;
          this.doSendMuBanPo_params.tplNo = res.data.tplNo;
          this.doSendMuBanPo_params.multiTenancyId = res.data.multiTenancyId;
          this.doSendMuBanPo_params.processInstId = res.data.processInstId;
          this.doSendMuBanPo_params.pcsAvyId = res.data.pcsAvyId;
          this.doSendMuBanPo_params.id = res.data.id;
          this.updateOpinions_params.multiTenancyId = res.data.multiTenancyId;
          this.updateOpinions_params.id = res.data.id;
          this.updateOpinions_params.deptId = res.data.deptId;
          this.updateOpinions_params.deptName = res.data.deptName;
          this.updateOpinions_params.parentId = res.data.parentId;
          this.updateOpinions_params.tplNo = res.data.tplNo;
          this.updateOpinions_params.pcsAvyId = res.data.pcsAvyId;
          this.updateOpinions_params.processInstId = res.data.processInstId;
          this.updateOpinions_params.curNodeCode = res.data.curNodeCode;
        })
        .catch(err => {
          console.log(err);
        });
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
    writelistvalue(data) {
      if (data) {
        console.log(data);
        this.fromData.muBanVo.solicitOpinion =
          this.fromData.muBanVo.solicitOpinion != ""
            ? this.fromData.muBanVo.solicitOpinion + data
            : data;
      }
    },
    writelistbox() {
      this.appendWriteDialog = true;
      this.getCommonUse(0);
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    getCommonUse(){
      console.log( this.option_selectCommonUseList)
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
      this.option_selectCommonUseList.userId = userInfo&&userInfo.humanId;
      this.option_selectCommonUseList.userName = userInfo&&userInfo.humanName;
      this.option_selectCommonUseList.function = 'selectCommonUseList';
      this.$post
          .postData(
            'selectCommonUseList',
            JSON.stringify(this.option_selectCommonUseList),
            this.$businessCode.fwgl1
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
    addCommonUse(flag,id,content){
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
      this.option_selectCommonUseList.id = id;
      this.option_selectCommonUseList.content = content;
      this.option_selectCommonUseList.userId = userInfo&&userInfo.humanId;
      this.option_selectCommonUseList.userName = userInfo&&userInfo.humanName;
      this.option_selectCommonUseList.function = 'doSaveCommonUse';
      this.$post
          .postData(
            'doSaveCommonUse',
            JSON.stringify(this.option_selectCommonUseList),
            this.$businessCode.fwgl1
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
              message: res.message,
              duration: 1000
            });
          });
    },
     // 删除常用批示意见
    deleteCommonUse(flag,id,content){
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
      this.option_selectCommonUseList.id = id;
      this.option_selectCommonUseList.userId = userInfo&&userInfo.humanId;
      this.option_selectCommonUseList.userName = userInfo&&userInfo.humanName;
      this.option_selectCommonUseList.function = 'doDeleteCommonUseList';
      this.$post
          .postData(
            'doDeleteCommonUseList',
            JSON.stringify(this.option_selectCommonUseList),
            this.$businessCode.fwgl1
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
              message: res.message,
              duration: 1000
            });
          });
    },
    chooseBtn() {
      this.$post
        .postData(
          "setup_SearchAll",
          JSON.stringify(this.searchAll_params),
          this.$businessCode.ggfwgl1
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
    subshowCompDialog(data, type) {
      console.log(data);
      this.fromData.muBanVo.visibleRange = data;
      let checkArr = [];
      data.forEach(item => {
        checkArr.push(item.name);
      });
      this.chooseRangeStr = checkArr.join("，");
      this.showChooseRang = false;
    },
    flowScheme() {
      this.showTimeLine = true;
      let params = {
        function : 'getHistoryActInfo',
        processInstId: this.fromData.muBanVo.processInstId
      }
      // if(this.processInstId!=undefined && this.processInstId!=''){
      //   this.getHistoryActInfo_params.processInstId = this.processInstId
      //     params = this.getHistoryActInfo_params
      // }else{
      //     params = {};
      // }
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(params),
          this.historyTradeCode
        )
        .then(res => {
          console.log(res);
          if (res) {
            this.tableData = res.data;
            this.timeShow = true;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          }
        });
    },
    subTimeLine() {
      this.showTimeLine = false;
    },
    async completeSending() {
      this.$refs["muban"].validate(async valid => {
        if (valid) {
          await this.preserve(2);
        }
      });
    },
    async preserve(type) {
      // if (type === "uploadfile") {
      //   this.$refs.uploadComponent.uploadFileNow();
      //   return;
      //   /**111 */
      //   // if (this.doSendMuBanPo_params.id != "") {
      //   //   this.uploadConfig.id = res.data.id;
      //   //   this.$refs.uploadComponent.uploadFileNow();
      //   //   return;
      //   // }else{
      //   //   this.$message.error('请先保存!')
      //   // }
      // }
      // console.log(this.fromData);
      
          // if (this.fromData.muBanVo.solicitOpinion == "") {
          //   this.$message({
          //     message: "请先填写征集意见!",
          //     type: "warning"
          //   });
          // } else {
            let res = await this.$post.postData(
              "huqianSave",
              JSON.stringify(this.fromData),
              this.$businessCode.fwgl1
            );
            if (res.success) {
              if (type != 2) {
                this.$message({
                  message: "保存成功!",
                  type: "success"
                });
              }

              if (type === "uploadfile") {
                this.uploadConfig.id = res.data.id;
                this.fromData.muBanVo.id = res.data.id;
                this.$refs.uploadComponent.uploadFileNow();
              }
              // this.fromData.muBanVo.id = res.id;
              if (type == 2) {
                let res1 = await this.$post.postData(
                  "getNextNodeInfo",
                  JSON.stringify(this.getNextNodeInfo_parmas),
                  this.$businessCode.fwgl1
                );
                let parmSelf = Object.assign(this.selWfNode_parmas, this.fromData.muBanVo);
                parmSelf.pcsAvyId = res1.data[0] ? res1.data[0].PCSAVYID : '';
                
                this.fromData.function = 'selWfNode';
                let res2 = await this.$post.postData(
                  "selWfNode",
                  JSON.stringify(parmSelf),
                  this.$businessCode.fwgl1
                );
                console.log(res1, res2);
                this.seletOptionsData = res1.data;
                this.treeData = res2.data && res2.data.data || [];
                if(res2.message == "Loading"){
                  this.loadingTree = true;
                }else{
                  this.loadingTree = false;
                }
                // if (this.fromData.muBanVo.solicitOpinion == "") {
                //   // this.$message.error("请先填写征集意见!");
                //   return;
                // } else {
                  this.dialogState = true;
                  this.offenUse = true;//显示下一环节下拉框
                // }
              }
              this.getDetail();
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
    },
    //提交征集意见
    async updateOpinion() {
      console.log(this.updateOpinions_params);
      this.fromData.muBanVo.finalOpinion = 1;
      if (this.fromData.muBanVo.solicitOpinion == "") {
        this.$message({
          message: "请先填写征集意见!",
          type: "warning"
        });
      } else {
        let res = await this.$post.postData(
          "huqianSave",
          JSON.stringify(this.fromData),
          this.$businessCode.fwgl1
        );
        Object.assign(this.updateOpinions_params, this.fromData.muBanVo);
        let res2 = await this.$post.postData(
          "doFinishSubFlow",
          JSON.stringify(this.updateOpinions_params),
          this.$businessCode.fwgl1
        );
        if (res2.success) {
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "提交成功!",
            duration: 1500,
            onClose: () => {
              this.goBack();
            }
          });
        }
      }
    },
    sendFile() {
      this.fromData.function = "dofinishworkflow";
      console.log(this.fromData);
      this.$post
        .postData(
          "dofinishworkflow",
          JSON.stringify(this.fromData),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "发布成功!",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //收回
    callBack() {
      this.callBack_params.pcsAvyId = this.fromData.muBanVo.pcsAvyId;
      this.callBack_params.multiTenancyId = this.fromData.muBanVo.multiTenancyId;
      this.$post
        .postData(
          "takeBackChildFlow",
          JSON.stringify(this.callBack_params),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "收回成功!",
              type: "success"
            });
            setTimeout(() => {
              this.goBack();
            }, 2000);
          } else {
            this.$message.error("收回失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showCompDialog(data, type,a, selectInfo) {
      this.dialogState = false;
      console.log(data);
      if (type) {
        let nextUserId = data[0].id;
        this.doSendMuBanPo_params.nextUserId = nextUserId;
        this.doSendMuBanPo_params.nextUserName = data[0].name;
        this.doSendMuBanPo_params.nextNodeId = selectInfo.id;
        this.doSendMuBanPo_params.nextNodeName = selectInfo.name;
        Object.assign(this.doSendMuBanPo_params, this.fromData.muBanVo);
        console.log(this.doSendMuBanPo_params);
        this.$post
          .postData(
            "finishAndSendsubflow",
            JSON.stringify(this.doSendMuBanPo_params),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.dialogState = false;
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送成功!",
                duration: 1500,
                onClose: () => {
                  this.goBack();
                }
              });
            }else{
               this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message
               })
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
          id: this.fromData.muBanVo.feedbackAttachmentList[n - 1].id,
          sort: this.fromData.muBanVo.feedbackAttachmentList[n].sort
        },
        {
          id: this.fromData.muBanVo.feedbackAttachmentList[n].id,
          sort: this.fromData.muBanVo.feedbackAttachmentList[n - 1].sort
        }
      );
      midObj = this.fromData.muBanVo.feedbackAttachmentList[n];
      this.fromData.muBanVo.feedbackAttachmentList[
        n
      ] = this.fromData.muBanVo.feedbackAttachmentList[n - 1];
      this.fromData.muBanVo.feedbackAttachmentList[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromData.muBanVo.attachSort.push(
        {
          id: this.fromData.muBanVo.feedbackAttachmentList[n + 1].id,
          sort: this.fromData.muBanVo.feedbackAttachmentList[n].sort
        },
        {
          id: this.fromData.muBanVo.feedbackAttachmentList[n].id,
          sort: this.fromData.muBanVo.feedbackAttachmentList[n + 1].sort
        }
      );
      midObj = this.fromData.muBanVo.feedbackAttachmentList[n];
      this.fromData.muBanVo.feedbackAttachmentList[
        n
      ] = this.fromData.muBanVo.feedbackAttachmentList[n + 1];
      this.fromData.muBanVo.feedbackAttachmentList[n + 1] = midObj;
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
              this.fromData.muBanVo.feedbackAttachmentList.splice(n, 1);
              this.uploadConfig.filesHas = this.fromData.muBanVo.feedbackAttachmentList;
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
              downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName, file.fileName);
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
  padding: 20px;
 background-color: #e4e7ed52;
  border: 1px solid #E4E7ED;
}

.spyj{
  border: 1px solid #eee;
  padding: 10px 20px;
  background-color:#e4e7ed52;
  color: #392a31;
  border-bottom: 1px solid #E4E7ED;
}

.spyj_box {
  height: 55px;
  border: 1px solid #eee;
  padding: 10px 20px;
  background-color:#e4e7ed52;
  color: #392a31;
  border-bottom: 1px solid #E4E7ED;
  .spyj_left {
    float: left;
  }
  .spyj_right {
    float: right;
  }
}
.dimi_btn{
  text-align: right;
    cursor: pointer;
    top: 0;
    right: -55px;
    border: none!important;
    background: #ffffff14;
    height: 40px;
    margin-left: 20px;
    padding: 10px 20px;
    float: right;
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
