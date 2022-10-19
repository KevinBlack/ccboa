<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="right">
        <el-button @click="close">关闭</el-button>
        <el-button
          v-for="(item, index) in FEIbuttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="item.show"
          size="mini"
          plain
        >{{ item.name }}</el-button>
      </div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <el-row>
        <h1 class="title-h1">{{ formData.topTitle}}信息发布单</h1>
      </el-row>
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{ formData.curNodeName }}</span>
          </p>
          <p>
            当前处理人：
            <span>{{ formData.curUsernm}}</span>
          </p>
        </div>
      </div>
      <el-form
        :rules="rules"
        ref="formData"
        :model="formData"
        label-width="120px"
        :disabled="false"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" :disabled="readFields.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="拟稿部门" prop="drafDepNm" style="width：100%">
              <el-select
                v-model="formData.drafDepNm"
                style="width: 80%"
                :disabled="readFields.drafDepNm"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item.currUnitId"
                  :label="item.currUnitName"
                  :value="item.currUnitId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布状态" prop="pubStaut">
              <el-input v-model="formData.pubStaut" :disabled="readFields.pubStaut"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="简报名称" prop="jbNm">
              <el-select
                v-model="formData.jbNm"
                placeholder="请选择"
                :disabled="readFields.jbNm"
                @change="jbNmchange($event)"
              >
                <el-option
                  v-for="(item, index) in departmentListJb"
                  :key="index"
                  :label="item.jbNm"
                  :value="item.tpyeNo"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简报编号" prop="jbNo">
              <el-input v-model="formData.jbNo" style="width：100%" :disabled="readFields.jbNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="拟稿人" prop="drafUnm">
              <el-input v-model="formData.drafUnm" :disabled="readFields.drafUnm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="formData.phone" :disabled="readFields.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="拟稿日期" prop="drafTime">
              <el-date-picker
                :disabled="readFields.drafTime"
                v-model="formData.drafTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布日期" prop="pubTime">
              <el-date-picker
                :disabled="readFields.pubTime"
                v-model="formData.pubTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="23">
            <el-form-item label="发送对象" prop="sendUnm">
              <!-- <el-input resize="none" v-model="formData.sendUnm" type="textarea" :autosize="{ minRows: 1}" :disabled="readFields.sendUnm"></el-input> -->
              <el-input
                type="textarea"
                :autosize="{ minRows: 1}"
                class="zhusong"
                resize="none"
                v-model="formData.sendUnm"
                :disabled="readFields.sendUnm"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="add-icon" v-if="!readFields.sendUnm">
            <i class="icon-font el-icon-plus select-chang" @click="selectMainOrCopy()"></i>
          </el-col>
        </el-row>
        <el-form-item label="签发意见" prop="issuingOpinions">
          <el-row
            v-show="editedIdeaFields.issuingOpinions === true  && issuingOpinionsArrays.length >= 1 ? false : true"
          >
            <el-input
              type="textarea"
              v-model="formData.issuingOpinions"
              :disabled="editedIdeaFields.issuingOpinions"
              style="margin-bottom: 9px"
            ></el-input>
          </el-row>
          <div v-show="issuingOpinionsArrays.length >= 1 ? true : false" class="opinionTbody">
            <div class="lineContent" v-for="(item, index) in issuingOpinionsArrays" :key="index">
              <div>{{item.opinionText}}</div>
              <div class="adviceInfo">
                {{item&&item.depnm}}
                <span class="pad_lr10">{{item&&item.unm}}</span>
                <br/>
                {{item&&transitionDate(item.opinionTime)}}
              </div>
            </div>
          </div>
          <!-- <el-row v-for="(item, index) in issuingOpinionsArrays" :key="index">
            <el-input
              type="textarea"
              v-model="item.opinionText"
              :disabled="true"
              style="margin-bottom: 9px"
            ></el-input>
            <div class="adviceInfo">
              {{item&&item.depnm}}
              <span class="pad_lr10">{{item&&item.unm}}</span>
              <br />
              {{item&&transitionDate(item.opinionTime)}}
            </div>
          </el-row> -->
        </el-form-item>
        <el-form-item label="审核意见" prop="auditOpinions">
          <el-row
            v-show="editedIdeaFields.auditOpinions === true  && auditOpinionsArrays.length >= 1 ? false : true"
          >
            <el-input
              type="textarea"
              v-model="formData.auditOpinions"
              :disabled="editedIdeaFields.auditOpinions"
              style="margin-bottom: 9px"
            ></el-input>
          </el-row>
          <div class="opinionTbody" v-show="auditOpinionsArrays.length >= 1 ? true : false">
            <div class="lineContent" v-for="(item, index) in auditOpinionsArrays" :key="index">
              <div>{{item.opinionText}}</div>
              <div class="adviceInfo">
                {{item&&item.depnm}}
                <span class="pad_lr10">{{item&&item.unm}}</span>
                <br/>
                {{item&&transitionDate(item.opinionTime)}}
              </div>
            </div>
          </div>
          <!-- <el-row v-for="(item, index) in auditOpinionsArrays" :key="index">
            <el-input
              type="textarea"
              v-model="item.opinionText"
              :disabled="true"
              style="margin-bottom: 9px"
            ></el-input>
            <div class="adviceInfo">
              {{item&&item.depnm}}
              <span class="pad_lr10">{{item&&item.unm}}</span>
              <br />
              {{item&&transitionDate(item.opinionTime)}}
            </div>
          </el-row> -->
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-row
            v-show="editedIdeaFields.remark === true  && remarkArrays.length >= 1 ? false : true"
          >
            <el-input
              type="textarea"
              v-model="formData.remark"
              :disabled="editedIdeaFields.remark"
              style="margin-bottom: 9px"
            ></el-input>
          </el-row>
          <div class="opinionTbody"  v-show="remarkArrays.length >= 1 ? true : false">
            <div class="lineContent" v-for="(item, index) in remarkArrays" :key="index">
              <div>{{item.opinionText}}</div>
              <div class="adviceInfo">
                {{item&&item.depnm}}
                <span class="pad_lr10">{{item&&item.unm}}</span>
                <br/>
                {{item&&transitionDate(item.opinionTime)}}
              </div>
            </div>
          </div>
          <!-- <el-row v-for="(item, index) in remarkArrays" :key="index">
            <el-input
              type="textarea"
              v-model="item.opinionText"
              :disabled="true"
              style="margin-bottom: 9px"
            ></el-input>
            <div class="adviceInfo">
              {{item&&item.depnm}}
              <span class="pad_lr10">{{item&&item.unm}}</span>
              <br/>
              {{item&&transitionDate(item.opinionTime)}}
            </div>
          </el-row> -->
        </el-form-item>
         <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              :canmoveOrdown="true"
              label=""
              :fileList="formData.attchmentFileInfo"
            >
              <upload-file-ts
                :uploadConfig="uploadConfig"
                :fileId="fileId"
                @fileList="fileList"
                :disabled="formData.hasDocumentNo=='true'"
              ></upload-file-ts>
            </upfileList>
      </el-form>
    </div>
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
    <!--    文号编号组成-->
    <el-dialog
      title="文号选择"
      :visible.sync="isdialog"
      width="30% !important"
      height="200px"
      :before-close="handleClose"
    >
      <el-row class="isdialog">
        <el-col :span="4">
          <span>当前文号</span>
          <!-- <el-button el-button type="primary" @click="currentCode">使用当前文号</el-button> -->
        </el-col>
        <el-col :span="20">
          <el-radio-group @change="disoAn" v-model="formQiHao1">
            <el-radio :label="formQiHao"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <div>
        <el-row class="isdialog">
          <el-col :span="4">
            <span>空缺文号</span>
            <!-- <el-button el-button type="primary" @click="currentCode">使用当前文号</el-button> -->
          </el-col>
          <el-col
            :span="20"
            class="el-table__body-wrapper"
            style="overflow-y: auto;max-height: 200px;margin-top: 8px;"
          >
            <!-- <el-radio :label="1"></el-radio> -->
            <el-radio-group
              @change="diso"
              style="display:block;line-height:31px;"
              v-model="deleteapplyCode"
              v-for="item in delCode"
              :key="item.index"
            >
              <el-radio :label="item" style="margin-right: 16px">
                {{
                item
                }}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="delecurrentCode">确定</el-button>
        <el-button @click="closeWH">取消</el-button>
      </span>
    </el-dialog>
    <org-tree
      v-model="showOrgTree"
      title="选择部门"
      :outBank="true"
      :isSingle="false"
      :orgOrDeptId="orgOrDeptId"
      :orgOrDept="orgOrDept"
      :queryType="queryTypeJg"
      :departmentHead="departmentHead"
      @orgList="getOrgList"
    ></org-tree>
    <!-- 选择人员树 -->
    <select-person
      v-dialogDrag
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :checkOrg="checkOrg"
      :offenUse="offenUse"
      :fromdata="formData"
      :seletOptionsData="seletOptionsData"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from "components/tree/orgTree1";
import mTable from "@/components/table/tTable";
import selectPerson from "@/components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
import exportTableQueryScript from "@/minixs/exportTableQueryScript";
import upfileList from "@/views/bianhan/components/showUploadFile"; 
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "departInfodepart",
  components: {
    selectPerson,
    orgTree,
    shiwuFlow,
    upfileList,
    uploadFileTs
  },
  mixins: [minixs, exportTableQueryScript,viewDraft],
  data() {
    return {
      fileId: "",
      uploadConfig: {
        id: "",
        filesHas: [],
        isSpecial: 0,
      },
      verifyData: Boolean,
      qfYj: "false",
      num: "",
      departmentHead: true,
      dialogTit: "",
      canTab: false,
      checkOrg: false,
      zhuCheckData: [], //发送对象选中的数据
      tcHumanRoles: "", //是否返回上一人
      orgTypeJg: "", //为all时，拉取一级部门与机构 ,""拉取只拉去部门或者机构
      queryTypeJg: "peer", //up:上级   low:下级  peer:同级 ''其他
      hcgsbtn: false,
      objKow: {},
      ifView: Number, //打开正文时的状态值
      processISOr: false, //是否进行完成并发送
      newjbName: "", // 每次下拉选中的简报名称
      newbianHao: "", // 每次下拉选中的简报id
      fdate: "", //合成格式的时间
      //套红文件
      bank_findTemplete: {
        function: "doDownloadFile",
        sendType: "",
        redHead: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: "doRecoverCleanDraft",
        id: ""
      },
      qczwBtn: true, //起草正文按钮
      clzwBtn: false, //处理正文按钮
      scbhBtn: true, // 生成编号按钮
      thBtn: false, //退号按钮
      resData: {}, //生成编号返回数据
      deleteapplyCode: "", //单选按钮选中的编号
      delCode: [], //存储所用过文号数组
      formQiHao: "",
      formQiHao1: "",
      remarkArrays: [], // 备注意见数组
      issuingOpinionsArrays: [], // 签发意见数组
      auditOpinionsArrays: [], // 审核意见数组
      backList: [],
      // 强制回收数据
      tableBackData: [],
      // 强制回收表头配置
      tableBackCols: [
        { label: "拟稿日期", prop: "drafTime" },
        { label: "标题", prop: "title" },
        { label: "简报编号", prop: "jbNo" },
        { label: "拟稿部门", prop: "drafDepNm" },
        { label: "当前环节", prop: "curNodeName" },
        { label: "操作人", prop: "curUsernm" }
      ],
      // 分页数据
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20 //每页条数
      },
      showOrgTree: false, // 发布弹窗
      // 部门编号
      // orgOrDeptIdJg: JSON.parse(localStorage.getItem('userInfo')).unitId,
      orgOrDeptId: "0",
      orgOrDept: 0,
      // 是否展示文号弹窗
      isdialog: false,
      isNeedQCZW: true,
      // 是否需要强制收回按钮
      isNeedForceButton: false,
      huanJieMessage: {},
      FEIbuttonList: [
        // { name: "保存", type: "chakansq", show: false },
        // { name: "收回", type: "chehui", show: false },
        // { name: "删除此文", type: "btn_sccw", show: false },
        // { name: "完成并发送", type: "overok", show: false },
        // { name: "起草正文", type: "qczw", show: false },
        // { name: "处理正文", type: "btn_clzw", show: false },
        // { name: "查看正文", type: "ckzw", show: false },
        // { name: "生成编号", type: "gemeratenum", show: false }, //7
        // { name: "退号", type: "backGemeratenum", show: false },
        // { name: "查看流程", type: "chalook", show: false },
        // { name: "打印处理单", type: "dycld", show: false },
        // { name: "发布", type: "banjie", show: false },
        // { name: "合成格式", type: "hcgs", show: false }, //12
        // { name: "清稿", type: "qianggao", show: false }, //13
        // { name: "清稿恢复", type: "qghf", show: false },
        // { name: "收藏", type: "collection", show: false }

        
        { name: "保存", type: "chakansq", show: false },
        { name: "完成并发送", type: "overok", show: false },
        { name: "起草正文", type: "qczw", show: false },
        { name: "处理正文", type: "btn_clzw", show: false },
        { name: "查看正文", type: "ckzw", show: false },
        { name: "删除此文", type: "btn_sccw", show: false },
        { name: "收回", type: "chehui", show: false },
        { name: "生成编号", type: "gemeratenum", show: false }, 
        { name: "退号", type: "backGemeratenum", show: false },
        { name: "合成格式", type: "hcgs", show: false },    //9
        { name: "清稿", type: "qianggao", show: false },    //10
        { name: "清稿恢复", type: "qghf", show: false },
        { name: "发布", type: "banjie", show: false },
        { name: "查看流程", type: "chalook", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "收藏", type: "collection", show: false }
      ],
      arr3: [
        "Fdate",
        "Creator",
        "SendObj",
        "Findex",
        "Section",
        "title",
        "drafDepNm",
        "pubStaut",
        "jbNm",
        "jbNo",
        "phone",
        "drafTime",
        "pubTime",
        "issuingOpinions",
        "auditOpinions",
        "remark"
      ],
      showFlowChart: false,
      departmentListJb: [], //简报下拉数据
      departmentList: [], //部门下拉数据
      //完成并发送弹出数据
      treeData: [], //选择人员树
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      loadingTree: true,
      synthesisFormat: "",
      formData: {
        hasDocumentNo: "false",
        qiHao: "",
        auditOpinions: "", //	审核意见
        bianHao: "", //简报id
        curHumanId: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).humanId
          : "", //当前用户humanId
        curNodeCode: "", //当前环节id
        curNodeName: "拟稿", // //当前环节名称
        curPcsAvyId: "", // //当前活动id
        curUserDepId: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).currUnitId
          : "", //	当前用户所属部门id
        curUserId: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).humanCode
          : "", //当前操作人id
        curUsernm: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).humanName
          : "", //当前操作人名称
        departmentBankIds: "", //	本行部门ids
        departmentBankNames: "", //	本行部门Name
        drafDepId: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).firstUnitId
          : "", //拟稿部门id
        drafDepNm: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).firstUnitName
          : "", //	拟稿部门名称
        drafOrgId: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).unitId
          : "", //	拟稿机构id
        drafOrgName: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).unitName
          : "", //	拟稿机构name
        drafTime: formatData(new Date().getTime(), "YYYY-MM-DD"), //	拟稿日期
        drafUid: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).humanCode
          : "", //	拟稿人id
        drafUnm: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).humanName
          : "", //拟稿人名称
        finishYear: "", //	办结年份
        haveRead: "", //	是否已读 1是0否
        histUserid: "", //	历史操作人
        isClean: "0", //	是否清稿 1是0否
        issuingOpinions: "", //	签发意见
        jbNm: "", //	简报名称
        jbNo: "", //	简报编号
        jbNoStr: "", //	废弃字段
        leadersBankIds: "", //	本行领导id
        leadersBankNames: "", //	本行领导name
        multiTenancyId: "", //	流程多实体标示
        otherOrgIds: "", //	其他机构id
        otherOrgName: "", //其他机构name
        pTplNo: "", //	流程模板id
        phone: "", //联系电话
        processInstId: "", //	流程实例id
        processStaut: "", //流程状态：扭转,办结
        pubMainFilePath: "", //	正文附件地址
        pubStaut: "", //	发布状态
        pubTime: "", //	发布日期
        releaseInformation: "", //	发布信息
        remark: "", //	备注
        sendUid: "", //发送对象id
        sendUnm: "", //	发送对象名称
        supNodeCode: "", //上一环节id
        supPcsAvyId: "", //	上一活动id
        supUserDepId: "", //	上一处理人部门id
        supUserHumanId: "", //	上一处理人humanId
        supUserid: "", //上一处理id
        supUsernm: "", //	上一处理人名称
        title: "", //标题
        briefNo: "", //信息编号主键id
        topTitle: "", //	表头
        attchmentFileInfo: []
      },
      //可编辑意见域
      editedIdeaFields: {
        issuingOpinions: true, //签发意见
        auditOpinions: true, //审核意见
        remark: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        issuingOpinions: false, //签发意见
        auditOpinions: false, //审核意见
        remark: false //备注
      },
      //不可编辑控制域
      readFields: {
        title: false, //标题
        drafDepNm: false, //拟稿部门
        pubStaut: false, //发布状态
        jbNm: false, //简报名称
        jbNo: false, //简报编号
        drafUnm: false, //拟稿人
        phone: false, //手机
        drafTime: false, //拟稿日期
        pubTime: false, //发布日期
        sendUnm: false //发送对象
      },
      //必填控制域
      requiredFields: {
        title: false, //标题
        drafDepNm: false, //拟稿部门
        pubStaut: false, //发布状态
        jbNm: false, //简报名称
        jbNo: false, //简报编号
        drafUnm: false, //拟稿人
        phone: false, //手机
        drafTime: false, //拟稿日期
        pubTime: false, //发布日期
        sendUnm: false //发送对象
      },
      id: "",
      flowChartList: [],
      rules: {},
      //流程的参数
      dataqc: {
        humanId: "",
        multiTenancyId: "CN025",
        //详情获取权限数据参数
        pcsAvyId: "",
        pcsTpId: ""
      },
      pubMait: {},
      pubMait2: {}
    };
  },
  watch: {
    backList: {
      handler(val) {
        for (const i in val) {
          if (val[i].opinionName === "remark") {
            this.remarkArrays.push(val[i]);
            this.formData.remarkArrays = this.remarkArrays;
          } else if (val[i].opinionName === "issuingOpinions") {
            this.issuingOpinionsArrays.push(val[i]);
            this.formData.issuingOpinionsArrays = this.issuingOpinionsArrays;
            console.log(this.formData.issuingOpinionsArrays);
            if (this.formData.qiHao) {
              if (this.formData.issuingOpinionsArrays.length > 0) {
                this.qfYj = "true";
              } else {
                this.qfYj = "false";
              }
            } else {
              this.hcgsbtn = true;
              this.hfqGao = "true";
            }
            this.getHuanJie();
          } else if (val[i].opinionName === "auditOpinions") {
            this.auditOpinionsArrays.push(val[i]);
            this.formData.auditOpinionsArrays = this.auditOpinionsArrays;
          }
        }
      },
      immediate: true
    },
    scbhBtn: {
      handler(val) {
        console.log(val, "asdasd");
        this.FEIbuttonList[7].show = val;
        this.FEIbuttonList[8].show = true;
      },
      immediate: true
    }
  },
  methods: {
       //起草保存文件
    async createFile(callback) {
      await this.$api.setSysConfig
        .saveFile({
          id: this.$route.query.depInfoPubId || this.formData.depInfoPubId,
          fileId: this.formData.attachid,
          fileType: "0"
        })
        .then(res => {
          callback;
        });
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.$route.query.depInfoPubId || this.formData.depInfoPubId }).then(res => {
        this.formData.attchmentFileInfo = res.data;
        this.$forceUpdate();
        this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
      });
    },
    fileList(files) {
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
        console.log(this.formData.attchmentFileInfo,55555555555555)
      }
      this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
      if (!this.formData.attachs) {
        this.formData.attachs = [];
      }
      files.forEach(item => {
        this.formData.attachs.push(item.id);
      });
      this.formData.attach = this.formData.attachs.join(",");
      this.formData.attachid = this.formData.attachs.join(",");
      this.$forceUpdate();
    },
    verify() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.verifyData = true
        } else {
          this.verifyData = false
          this.$message({
            type: 'error',
            message: '请填写必填项',
          })
        }
      })
    },
    diso() {
      this.formQiHao1 = "";
    },
    disoAn() {
      this.deleteapplyCode = "";
    },
    backDialogData() {
      console.log(this.zhuCheckData, "----完成并发送选择的数据");
      console.log(this.formData.sendUnm, "----完成并发送");
      console.log(this.checkIds, "----完成并发送选择的ID");
      console.log(this.checkData, "----完成并发送选择的DATA");
      if (!this.formData.sendUnm) {
        this.zhuCheckData = [];
      } else {
        //删除已经手动删除选项
        let self = this;
        try {
          this.zhuCheckData = this.zhuCheckData.filter(item => {
            if (self.formData.sendUnm.indexOf(item) != -1) {
              return item;
            }
          });
        } catch (e) {
          console.log("完成并发送" + e);
        }
      }
      //勾选已经选择的选项
      this.checkIds = [];
      this.checkData = [];
      for (var i = 0; i < this.zhuCheckData.length; i++) {
        this.checkIds.push(this.zhuCheckData[i].id);
        this.checkData.push({
          id: this.zhuCheckData[i].id,
          disabled: true,
          hideType: false
        });
      }
    },
    selectMainOrCopy() {
      console.log("点击加号图标");
      this.loadingTree = false;
      this.offenUse = false;
      this.dialogTit = "发送对象";
      this.canTab = true;
      this.treeData = [];
      this.dialogTypeNow = "zhusong";
      let self = this;
      this.$post
        .postData(
          "getTcPriDeliveryDic",
          JSON.stringify({
            function: "getTcPriDeliveryDic",
            organizationId: "root"
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res, "获取结果");
          try {
            self.treeData = res.data;
          } catch (e) {
            self.treeData = [];
          }
          console.log("主送数据-----------------start");
          console.log(this.treeData);
          if (self.treeData.length) {
            self.treeData.filter(item => {
              item.content = JSON.parse(item.content);
              if (!!item && item.typeName) {
                item.text = item.typeName;
                this.$set(item, "id", item.typeName);
              }
              return item;
            });
          }
          console.log(this.treeData);
          console.log("主送数据-----------------end");
          this.backDialogData();
          this.dialogState = true;
        });
    },
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.save();
          break;
        case "打印处理单":
          this.onPrint();
          break;
        case "完成并发送":
          this.verify()
          if (this.verifyData) return this.sedAudit()
          break;
        case "查看流程":
          if (this.formData.processInstId) {
            this.$api.pubInfo
              .Lookcx({ curProcessInstId: this.formData.processInstId })
              .then(res => {
                this.showFlowChart = true;
                this.flowChartList = res.data;
                this.$nextTick(() => {
                  this.$refs.dialogLine.openDialog();
                });
              });
          } else {
            this.$message.warning("未启动流程");
          }
          break;
        case "生成编号":
          this.generateNum();
          break;
        case "退号":
          this.backGenerateNum();
          break;
        case "发布":
          this.verify()
          if (this.verifyData) return this.publick()
          break;
        case "合成格式":
          this.compoundFormat();
          break;
        case "起草正文":
          this.startText();
          break;
        case "处理正文":
          this.disposeText();
          break;
        case "查看正文":
          this.lookBody();
          break;
        case "删除此文":
          this.delectArticle();
          break;
        case "清稿":
          this.formData.isClean = "1";
          this.doClearDraft();
          break;
        case "清稿恢复":
          this.recoverClearDraft();
          break;
        case "收藏":
          this.collection();
          break;
      }
    },
    sedAudit() {
      if (this.formData.pubMainFilePath != "") {
        console.log(this.formData, "获取上一处理人");
        if (
          this.tcHumanRoles == "false" ||
          this.formData.supUsernm == "" ||
          this.formData.supUsernm == null ||
          this.tcHumanRoles == ""

        ) {
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.dialogType = "dosend";
          this.offenUse = true;
          this.dialogTit = "选择人员";
          this.loadingTree = true;
          this.canTab = false;
          this.processISOr = true;
          this.sendFinish();
        } else {
          console.log("送回指定人（上一人）");
          this.$confirm(
            "是否返回" + this.formData.supUsernm + "?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              console.log("确定");

              this.$api.pubInfo.getJbDetail(this.formData).then(res => {
                this.$api.pubInfo
                  .Tui({ depInfoPubId: this.formData.depInfoPubId })
                  .then(res => {
                    if (res.code == "SUCCESS") {
                      this.$intent.closeWindow(this);
                    }
                  });
              });
            })
            .catch(() => {
              this.singelCheckF = true;
              this.dialogTypeNow = "next";
              this.dialogType = "dosend";
              this.offenUse = true;
              this.loadingTree = true;
              this.canTab = false;
              this.processISOr = true;
              this.sendFinish();
            });
        }
      } else {
        this.$message({
          type: "error",
          message: "没有进行正文处理，无法发送"
        });
      }
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
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
                duration: 500
              });
            }
          }
        });
    },
    // 收藏
    collection() {
      exportTableQueryScript.collect(this, this.$route.query.depInfoPubId, 'depInfoPubId', 'A08462976')
    },
    lookBody() {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      let num = this.num;
      const pathArrays = this.formData.pubMainFilePath.split(",");
      bank_doDownloadFile.fileName = pathArrays[0];
      bank_doDownloadFile.filePath = pathArrays[1];
      let id = this.formData.depInfoPubId;
      this.doDraftLook(id, bank_doDownloadFile, num);
    },
    //选中数据
    select(row) {},
    time(e) {
      let date = new Date(e);
      let Y = date.getFullYear() + "年";
      let M =
        (date.getMonth() + 1 < 10
          ? +(date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      let D = this.change(date.getDate()) + "日";
      let h = this.change(date.getHours()) + ":";
      let m = this.change(date.getMinutes()) + ":";
      let s = this.change(date.getSeconds());
      return Y + M + D;
    },
    change(t) {
      if (t < 10) {
        return t;
      } else {
        return t;
      }
    },
    // 合成格式
    compoundFormat() {
      this.formData.sendUid = "isSynthesisFormat";
      this.fdate = this.issuingOpinionsArrays[0]
        ? this.issuingOpinionsArrays[0].opinionTime
        : "";
      let Fdate = this.time(this.fdate); //签发日期
      let Creator = this.formData.drafUnm; //拟稿人
      let SendObj = this.formData.sendUnm; //发送对象
      let Findex = this.formData.qiHao == 0 ? "" : this.formData.qiHao; //期号
      let Section = this.formData.drafDepNm; //拟稿部门
      let pubStaut = this.formData.pubStaut; //发布状态
      let jbNm = this.formData.jbNm; //简报名称
      let jbNo = this.formData.jbNo; //简报编号
      let phone = this.formData.phone; //联系电话
      let pubTime = this.formData.pubTime; //发布日期
      let drafTime = this.formData.drafTime; //拟稿日期
      let issuingOpinions = this.formData.issuingOpinions; //签发意见
      let auditOpinions = this.formData.auditOpinions; //审核意见
      let arr = [];
      let arr2 = [];
      let arr4 = [];

      if (this.formData.pubMainFilePath) {
        this.$api.pubInfo
          .getInfoList({ tpyeNo: this.formData.bianHao })
          .then(res => {
            if (res.data[0].tplPath) {
              this.pubMait2 = res.data[0].hcggShuQian.split(";");
              for (const list in this.pubMait2) {
                const item1 = this.pubMait2[list].split("|");
                arr.push(item1[0]);
                arr2.push(item1[1]);
              }
              this.objKow = {};
              for (let i = 0; i < arr2.length; i++) {
                for (let j = 0; j < this.arr3.length; j++) {
                  if (arr2[i] === this.arr3[j]) {
                    arr4.push(arr2[i]);
                  }
                }
              }
              let arr2Arry = arr4.map(e => eval(e));
              for (var i = 0; i < arr.length; i++) {
                this.objKow[arr[i]] = arr2Arry[i];
              }
              console.log(this.objKow);
              const pathArrays = this.formData.pubMainFilePath.split(",");
              this.bank_doDownloadFile.fileName = pathArrays[0];
              this.bank_doDownloadFile.filePath = pathArrays[1];
              this.$post
                .postData(
                  "doDownloadFile",
                  JSON.stringify(this.bank_doDownloadFile),
                  "A0846C071"
                )
                .then(res => {
                  if (res) {
                    this.$store.dispatch("setDepartQc", this.objKow);
                    this.doDraftQc(res);
                  } else {
                    this.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: "下载失败",
                      duration: 500
                    });
                  }
                });
            }
          });
      } else {
        this.$message({
          message: "暂无正文模板",
          type: "warning"
        });
      }
    },
    //请求文件路径
    async getFileInfo(self, thInfo) {
      var successInfo = { state: false };
      const pathArrays = this.formData.pubMainFilePath.split(",");
      this.bank_doDownloadFile.fileName = thInfo
        ? thInfo.templateUrl.fileName
        : pathArrays[0];
      this.bank_doDownloadFile.filePath = thInfo
        ? thInfo.templateUrl.filePath
        : pathArrays[1];
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then(res => {
          if (res && res.success) {
            if (thInfo) {
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            } else {
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    //清稿弹窗
    doClearDraft() {
      // this.formData.jbNoStr = this.formData.pubMainFilePath
      console.log(this.formData.pubMainFilePath, "获取需要清稿的稿件");
      let that = this;
      this.getFileInfo(that).then(res => {
        if (res.state) {
          // let data = that.$router.resolve({
          //   path: "/openAndSave_WordHk",
          let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
          let data = that.$router.resolve({
            path: Path,
            query: {
              tanSun: "3",
              state: "viewFile",
              id: this.formData.depInfoPubId,
              zhengWenState: 1,
              JYcode: that.$businessCode.fawglfj,
              multiTenancyId: that.formData.multiTenancyId,
              relativePath: res ? res.filePath : "",
              fileName: res ? res.fileName : "",
              cleanDraftFlag: true,
              showBtns: true,
              EditType: "1",
              saveCleanFile: true,
              jbNoStr: this.formData.pubMainFilePath,
              saveNameAndNumber: this.num,
              isClean: this.formData.isClean
            }
          });
          var one = data.href.split('?')[0]
          var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
          window.open(newPath, "_blank");
        }
      });
    },
    //恢复清稿操作
    recoverClearDraft() {
      if (this.formData.jbNoStr) {
        this.$api.pubInfo
          .getJbList(
            { depInfoPubId: this.$route.query.depInfoPubId, type: "detail", frompage: '1'},
            {
              PAGE_JUMP: 1,
              REC_IN_PAGE: 10
            }
          )
          .then(res => {
            this.formData.pubMainFilePath = res.data.page[0].jbNoStr;
            this.formData.isClean = "0";
            this.hfqGao = "true";
            this.qGao = "false";
            this.getHuanJie();
            this.save("1");
            this.$message({
              message: "清稿恢复成功",
              type: "success"
            });
          });
      } else {
        this.$message({
          message: "清稿恢复异常",
          type: "success"
        });
      }
    },
    //关闭
    close() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            //点是
            this.save();
            this.$intent.closeWindow(this);
            // this.saveClose()
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        },
      });
    },
    // 保存
    save(val) {
      if (localStorage.getItem("bumenxinxi")) {
        let jinGeData = JSON.parse(localStorage.getItem("bumenxinxi"));
        this.formData.xksqFileName = jinGeData.fileName;
        this.formData.xksqFilePath = jinGeData.filePath;
        localStorage.removeItem("bumenxinxi");
      }
      this.departmentList.map(item => {
        if (item.unitCode === this.formData.drafDepId) {
          this.oaUnitName = item.oaUnitName;
        }
      });
      if (this.resData && this.resData.no && this.backNumFlag) {
        this.formData.briefNo = this.resData.no ? this.resData.no : "";
        this.formData.qiHao = this.deleteapplyCode
          ? this.deleteapplyCode
          : this.resData && this.resData.curMaxNo + "";
      }
      console.log(this.formData, "获取保存数据");
      this.$api.pubInfo.getJbDetail(this.formData).then(res => {
        console.log(this.formData,111) 
        if (res.code == "SUCCESS") {
          this.$message({
            message: "成功",
            type: "success"
          });
          console.log(res,11111)
          this.fileId = this.$route.query.depInfoPubId = res.data.depInfoPubId;
          sessionStorage.setItem("fileId", this.fileId);
          this.formData = Object.assign({},this.formData,res.data);

          this.getFileList();
          localStorage.setItem("row", JSON.stringify(this.formData));
          //流程等于空
          if (this.formData.processInstId == "") {
            this.getStartprocess(val);
          }
          //存在流程id
          if (this.formData.processInstId != "") {
            if (this.processISOr == true) {
              let clhjList = {};
              clhjList.curTplNo = this.formData.pTplNo;
              clhjList.curNodeId = this.formData.curNodeCode;
              clhjList.curMultiTenancyId = this.formData.multiTenancyId;
              this.$api.pubInfo.clHj(clhjList).then(res => {
                this.dialogState = true;
                this.$nextTick(() => {
                  this.seletOptionsData = res.list;
                });
              });
            }
          }
          this.getHuanJie();
        }
      });
    },
    departMainBody() {
      this.synthesisFormat = "";
      // console.log(this.formData, '起草正文获取稿件内容')
      this.$api.pubInfo
        .getInfoList({ tpyeNo: this.formData.bianHao })
        .then(res => {
          this.ifView = 1;
          this.fdate = this.issuingOpinionsArrays[0]
            ? this.issuingOpinionsArrays[0].opinionTime
            : "";
          let Fdate = this.fdate; //签发日期
          let Creator = this.formData.drafUnm; //拟稿人
          let SendObj = this.formData.sendUnm; //发送对象
          let Findex = this.formData.qiHao == 0 ? "" : this.formData.qiHao; //期号
          let Section = this.formData.drafDepNm; //拟稿部门
          let pubStaut = this.formData.pubStaut; //发布状态
          let jbNm = this.formData.jbNm; //简报名称
          let jbNo = this.formData.jbNo; //简报编号
          let phone = this.formData.phone; //联系电话
          let pubTime = this.formData.pubTime; //发布日期
          let drafTime = this.formData.drafTime; //拟稿日期
          let issuingOpinions = this.formData.issuingOpinions; //签发意见
          let auditOpinions = this.formData.auditOpinions; //审核意见
          if (res.data[0].tplPath) {
            let path = res.data[0].tplPath; //模板路径
            this.pubMait = res.data[0].qcShuQian.split(";");
            let arr = [];
            let arr2 = [];
            let arr4 = [];
            for (const list in this.pubMait) {
              const item1 = this.pubMait[list].split("|");
              arr.push(item1[0]);
              arr2.push(item1[1]);
            }
            this.objKow = {};
            for (let i = 0; i < arr2.length; i++) {
              for (let j = 0; j < this.arr3.length; j++) {
                if (arr2[i] === this.arr3[j]) {
                  console.log(arr2[i]);
                  arr4.push(arr2[i]);
                }
              }
            }
            console.log(arr4);
            let arr2Arry = arr2.map(e => {
              try {
                eval(e);
                return eval(e);
              } catch (error) {
                console.log(error);
              }
            });
            console.log(arr2Arry);
            for (var i = 0; i < arr.length; i++) {
              this.objKow[arr[i]] = arr2Arry[i];
            }
            let pubMainFilePathName = path.split("/");
            let pathName = pubMainFilePathName[pubMainFilePathName.length - 1]; //模板名称
            this.bank_doDownloadFile.fileName = pathName;
            this.bank_doDownloadFile.filePath = path;
            this.$post
              .postData(
                "doDownloadFile",
                JSON.stringify(this.bank_doDownloadFile),
                "A0846C071"
              )
              .then(res => {
                if (res) {
                  this.$store.dispatch("setDepartQc", this.objKow);
                  this.doDraftQc(res);
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "下载失败",
                    duration: 500
                  });
                }
              });
          } else {
            this.$message({
              type: "error",
              message: "该数据无正文模板"
            });
          }
        });
    },
    // 起草正文带模板
    doDraftQc(fileInfo) {
      console.log(fileInfo, "fileInfo--起草正文");
      let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: Path,
        query: {
          // isSynthesisFormat: this.synthesisFormat, //是否合成格式
          isSynthesisFormat: JSON.stringify(this.formData)
            ? JSON.stringify(this.formData)
            : "", //是否合成格式
          state: "viewFile",
          id: this.formData.depInfoPubId,
          zhengWenState: this.ifView,
          JYcode: "A0846C002",
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "测试.doc",
          tmpFilePath: fileInfo ? fileInfo.filePath : "",
          tmpFileName: fileInfo ? fileInfo.fileName : "测试.doc",
          multiTenancyId: "000076767qwq0",
          showBtns: true,
          depart: 2,
          tanSun: "234",
          saveCleanFile: true,
          saveNameAndNumber: this.num,
          isClean: this.formData.isClean
        },
      })
      this.$forceUpdate()
      var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
    //启动流程
    getStartprocess(val) {
      this.$api.pubInfo.qdlc(this.formData).then(res => {
        if (res.code == "SUCCESS") {
          console.log(res,11)
          /* this.$message({
            message: '启动流程成功',
            type: 'success',
          }) */
          this.formData = res.data;
          this.formData.attchmentFileInfo = res.data.attchmentFileInfo
          this.getFileList()
          top.location =
            window.location.href.split("?")[0] +
            "?" +
            "depInfoPubId=" +
            res.data.depInfoPubId;
          if (this.processISOr == true) {
            let clhjList = {};

            clhjList.curTplNo = res.data.pTplNo;
            clhjList.curNodeId = res.data.curNodeCode;
            clhjList.curMultiTenancyId = res.data.multiTenancyId;
            this.$api.pubInfo.clHj(clhjList).then(res => {
              this.dialogState = true;
              this.$nextTick(() => {
                console.log(res,2222)
     
                this.seletOptionsData = res.list;
              });
            });
          }
           try {
              if (this.formdata.attachid.length > 0) {
                this.createFile();
              }
            } catch (e) {
              console.log(e);
            }
          // if (val == "jinge") {
          //   this.doDraft();
          // }
        }
      });
    },
    // 删除此文
    delectArticle() {
      this.$api.pubInfo
        .delete({ depInfoPubId: this.formData.depInfoPubId })
        .then(res => {
          this.$message.success("删除成功");
          this.$intent.closeWindow(this);
        });
    },
    // 起草正文
    startText() {
      if (this.formData.processInstId) {
        if (this.formData.bianHao) {
          this.fdate = "";
          this.departMainBody();
        }
      } else {
        this.$message({
          type: "error",
          message: "请先保存数据"
        });
      }
    },
    //打开金格文档申请跳转
    // doDraft(fileInfo) {
    //   console.log(fileInfo, "fileInfo--处理、查看正文");
    //   let data = this.$router.resolve({
    //     path: "/openAndSave_Word",
    //     query: {
    //       tanSun: "3",
    //       state: fileInfo && fileInfo.flag === "cakan" ? "viewFile" : "newFile",
    //       id: this.formData.depInfoPubId,
    //       zhengWenState: this.ifView,
    //       JYcode: "A0846C002",
    //       relativePath: fileInfo ? fileInfo.filePath : "",
    //       fileName: fileInfo ? fileInfo.fileName : "测试.doc",
    //       EditType: "2",
    //       cleanDraftFlag: false,
    //       multiTenancyId: "000076767qwq0",
    //       showBtns: true,
    //       serverUrl: "128.192.221.164",
    //       saveCleanFile: true,
    //       saveNameAndNumber: this.num,
    //       isClean: this.formData.isClean
    //     }
    //   });
    //   console.log(fileInfo, "fileInfo");
    //   this.$forceUpdate();
    //   window.open(data.href, "_blank");
    // },
    // 处理正文
    disposeText() {
      this.writeApply("chuli");
    },
    //查看正文
    checkText() {
      this.writeApply("cakan");
    },
    //正文方法
    writeApply(flag) {
      if (this.formData.pubMainFilePath) {
        if (flag === "chuli") {
          this.ifView = 2;
        } else if (flag === "cakan") {
          this.ifView = 0;
        }
        this.shiwuState = "viewFile";

        let bank_doDownloadFile = { function: "doDownloadFile" };
        const pathArrays = this.formData.pubMainFilePath.split(",");
        bank_doDownloadFile.fileName = pathArrays[0];
        bank_doDownloadFile.filePath = pathArrays[1];

        this.$post
          .postData(
            "doDownloadFile",
            JSON.stringify(bank_doDownloadFile),
            "A0846C071"
          )
          .then(res => {
            if (res) {
              res.ifView = this.ifView;
              res.flag = flag;
              this.doDraftQc(res);
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          });
      } else {
        this.$message({
          message: "暂无正文模板",
          type: "warning"
        });
      }
    },
    //完成并发送
    sendFinish() {
      this.processISOr = true;
      if (this.formData.processInstId) {
        this.$api.pubInfo
          .getJbDetail({
            ...this.formData,
            oaUnitName: this.oaUnitName,
            briefNo: this.formData.briefNo
          })
          .then(res => {
            console.log(res,44444)

            try {
               if (this.formdata.attachid.length > 0) {
                   this.createFile();
                }
              } catch (e) {
                console.log(e);
              }
            let clhjList = {};
            clhjList.curTplNo = res.data.pTplNo;
            clhjList.curNodeId = res.data.curNodeCode;
            clhjList.curMultiTenancyId = res.data.multiTenancyId;
            this.$api.pubInfo.clHj(clhjList).then(res => {
              // this.reloadTree(res.list);
              this.dialogState = true;
              this.$nextTick(() => {
                // this.seletOptionsData = res.list
                let PCSAVYIDs = [];
                this.seletOptionsData = res.list.filter(item => {
                  if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                    PCSAVYIDs.push(item.PCSAVYID);
                    return item;
                  }
                });
                this.seletOptionsData = this.shoNextNode(
                  this.seletOptionsData,
                  this.huanJieMessage.acyNodeNextBount
                );
              });
            });
          });
      } else {
        console.log('没有流程ID', this.formData.processInstId)
        // this.getStartprocess();
      }
    },
    reloadTree(list) {
      let that = this;
      // that.$nextTick(() => {
      let PCSAVYIDs = [];
      that.seletOptionsData = list.filter(item => {
        if (!PCSAVYIDs.includes(item.PCSAVYID)) {
          PCSAVYIDs.push(item.PCSAVYID);
          return item;
        }
      });
      // that.seletOptionsData = that.shoNextNode(that.seletOptionsData, that.huanJieMessage.acyNodeNextBount)
      // })
      // this.seletOptionsDataSendObject = list;
      console.log(that.seletOptionsData, "1003");
      that.$set(that.formData, "function", "selWfNode");
      that.$set(that.formData, "curTplNo", that.formData.pTplNo);
      that.$set(
        that.formData,
        "curMultiTenancyId",
        that.formData.multiTenancyId
      );
      that.$set(that.formData, "wfeUnitId", that.formData.drafOrgId);
      // that.$set(that.formData, "pcsAvyId", that.formData.curNodeCode);
      that.$set(that.formData, "pcsAvyId", that.seletOptionsData[0].PCSAVYID);
      console.log(
        that.formData.pcsAvyId,
        "获取pcsAvyId",
        that.formData.function,
        "获取function",
        that.formData.curTplNo,
        "获取curTplNo",
        that.formData.curMultiTenancyId,
        "获取curMultiTenancyId",
        that.formData.wfeUnitId,
        "获取drafOrgId"
      );

      that.$post
        // .postData("selWfNode", JSON.stringify(that.formData), "A08462023")
        .postData("selWfNode", JSON.stringify(that.formData), "A08462023")
        .then(res => {
          if (res.message == "Loading") {
            that.loadingTree = true;
          } else {
            that.loadingTree = false;
          }
          that.dialogState = true;
          that.treeData = (res.data && res.data.data) || [];
          that.defaultUser = (res.data && res.data.defaultUser) || {};
        })
        .catch(e => {});
    },
    // 选人成功后
    showCompDialog(data, status, type, params, dtype) {
      if (this.dialogTit == "发送对象") {
        this.dialogState = false;
        if (!status) {
          return;
        }
        let name = [];
        data.forEach(item => {
          try {
            if (typeof item === "object") {
              if (!!item.id && typeof item.id != undefined) {
                name.push(item.id);
              } else if (typeof item.text != undefined) {
                name.push(item.text);
                item.id = item.text;
              }
            } else if (item != undefined) {
              name.push(item);
            }
          } catch (e) {
            console.log(e);
          }
        });
        this.zhuCheckData = [];
        this.zhuCheckData = data;
        this.$set(this.formData, "sendUnm", name.join(","));
      } else {
        console.log(data);
        this.processISOr = false;
        const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        this.dialogState = false;
        let inforUser = data[0].id.split("#");
        this.formData.nextHumanNm = data[0].name;
        this.formData.nextHumanId = data[0].idStr;
        this.formData.nextDeptId = inforUser[1];
        this.formData.nextPcsNodeID = params.id;
        this.formData.nextPcsNodeNM = params.name;
        this.$api.pubInfo.OverOk(this.formData).then(res => {
          this.$message({
            message: "完成并发送成功",
            type: "success"
          });
          this.messageWarn(data[0].idStr);
          this.$intent.closeWindow(this);
        });
      }
    },
    //消息提醒
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          userId: userId, //完成并发送选择的人员用户ID（humanID)
          productCode: "buMXX", //项目编号（对应字典（提醒项目分类））
          urgentType: "", //紧急程度（部分功能有）
          infoType: "信息刊物部门信息", //类型（模块名称中文（例如 收文，发文））
          infoTitle: this.formData.title, //业务标题
          infoUser: this.formData.curUsernm, //当前操作人名称
          pcUrl: location.hash.replace("#/", ""),
          instId: this.$route.query.depInfoPubId
        })
        .then(res => {})
        .catch(err => {});
    },
    //使用当前文号
    currentCode() {
      this.formData.jbNo =
        this.formData.jbNm +
        "〔" +
        new Date().getFullYear() +
        "〕" +
        "第" +
        this.resData.curMaxNo +
        "期";
      this.formData.briefNo = this.resData.no;
      this.formData.qiHao = this.resData.curMaxNo;
      this.isdialog = false;
      let noParams = {
        qihao: this.formData.qiHao,
        drafOrgId: this.formData.drafOrgId,
        jbNm: this.formData.jbNm
      };

      this.$api.paraMeter.NumberAffirm(noParams).then(res => {
        console.log(res, "获取res");
        if (res) {
          this.save("1");
          this.getHuanJie();
        }
      });
    },
    //文号弹窗方法
    handleClose() {
      this.isdialog = false;
      this.isdialogCY = false;
    },
    //文号弹窗取消
    closeWH() {
      this.isdialog = false;
    },
    //文号确定按钮
    delecurrentCode(row) {
      console.log(this.formQiHao1, this.deleteapplyCode);

      if (this.deleteapplyCode) {
        this.formData.jbNo =
          this.formData.jbNm +
          "〔" +
          new Date().getFullYear() +
          "〕" +
          "第" +
          this.deleteapplyCode +
          "期";
        this.isdialog = false;
        this.formData.qiHao = this.deleteapplyCode;
        this.formData.briefNo = this.resData.no;
        let noParams = {
          qihao: this.formData.qiHao,
          drafOrgId: this.formData.drafOrgId,
          jbNm: this.formData.jbNm
        };
        this.$api.paraMeter.NumberAffirm(noParams).then(res => {
          console.log(res, "获取res");
          if (res) {
            this.save("1");
            this.getHuanJie();
          }
        });
      } else if (this.formQiHao1) {
        this.currentCode();
      } else {
        this.$message.warning("请选择编号");
      }
    },
    //生成编号
    generateNum() {
      //有签发意见才可以生成编号
      if (this.issuingOpinionsArrays.length > 0) {
        var _this = this;
        this.$api.pubInfo.generateNumber(this.formData).then(res => {
          this.resData = res.data;
          const arraysData = JSON.parse(res.data.kongqueNo); //存储所有生成过的编号

          if (arraysData.length > 0) {
            this.deleteapplyCode = "";
            this.delCode = arraysData;
            this.formQiHao = res.data.curMaxNo;
            this.isdialog = true;
          } else {
            this.formData.jbNo =
              this.formData.jbNm +
              "〔" +
              new Date().getFullYear() +
              "〕" +
              "第" +
              res.data.curMaxNo +
              "期";
            this.formData.briefNo = res.data.no;
            //this.formData.qiHao = this.deleteapplyCode? this.deleteapplyCode: this.resData.curMaxNo + ''
            this.formData.qiHao = res.data.curMaxNo;
            let noParams = {
              qihao: this.formData.qiHao,
              drafOrgId: this.formData.drafOrgId,
              jbNm: this.formData.jbNm
            };
            this.$api.paraMeter.NumberAffirm(noParams).then(res => {
              if (res.code === 'SUCCESS') {
                this.$api.pubInfo.getJbDetail(this.formData).then(res => {
                  if (res.code == "SUCCESS") {
                    // _this.$message({
                    //   message: '保存成功',
                    //   type: 'success',
                    // })
                    console.log("点击生成编号--生成编号");
                    this.getHuanJie();
                  }
                });
              }
            })
          }
        });
      } else {
        this.$message({
          message: "请先到部门领导签发环节生成签发意见",
          type: "error"
        });
      }
    },
    // 退号
    backGenerateNum() {
      this.formData.sendUid = "";
      console.log(this.formData, "获取保存信息");
      // this.$api.pubInfo.getJbDetail(this.formData).then((res) => {
      // if(res.code == 'SUCCESS'){
      this.$api.pubInfo.retreatNumber(this.formData).then(res => {
        this.$message.success("退号成功");
        this.formData.jbNo =
          this.formData.jbNm + "〔" + new Date().getFullYear() + "〕" + "第期";
        this.formData.isClean = "0";
        this.formData.qiHao = "";
        this.formData.briefNo = "";
        this.recoverClearDraft();
        this.save("1");
        this.getHuanJie();
        //this.FEIbuttonList[11].show=false
      });
      // }
      if (this.formData.sendUid === "isSynthesisFormat") {
        this.hcgsbtn = true;
        this.qGao = "false";
        this.hfqGao = "true";
      } else {
        this.hcgsbtn = false;
      }
      this.getHuanJie();
      // })
    },
    //发布
    publick() {
      this.orgOrDeptId = this.formData.drafOrgId; //一级部门id
      this.showOrgTree = true;
    },
    //发布 选择部门或群组勾选数据
    getOrgList(data) {
      console.log(data, "获取data");
      let ids = [],
        names = [],
        qunzuId = [],
        qunzuIdOther = [],
        qunzuName = [],
        qunzuNameOther = [],
        peopleIds = [],
        peopleNames = [];
      data.forEach(item => {
        if (item.groupClass == "他行群组") {
          qunzuId.push(item.id.split("/")[0]);
          qunzuName.push(item.unitName);
        } else {
          if (item.groupClass == "部门") {
            qunzuIdOther.push(item.id.split("/")[0]);
            qunzuNameOther.push(item.unitName);
          }
          if (item.unitClass == 0) {
            ids.push(item.unitCode);
            names.push(item.unitName);
          }
          if (item.nodeType == "human") {
            peopleIds.push(item.unitCode);
            peopleNames.push(item.unitName);
          }
        }
      });
      console.log(
        "部门二合一",
        qunzuIdOther.concat(ids).join(","),
        qunzuNameOther.concat(names).join(","),
        "它行",
        qunzuId.join(","),
        qunzuName.join(","),
        "部门领导",
        peopleIds.join(","),
        peopleNames.join(",")
      );

      //确定发布调39接口
      this.$api.pubInfo
        .sureIssue({
          ...this.formData,
          depIdArr: qunzuIdOther.concat(ids).join(","),
          depNameArr: qunzuNameOther.concat(names).join(","),
          orgIdArr: qunzuId.join(","),
          orgNameArr: qunzuName.join(","),
          humanCodeArr: peopleIds.join(","),
          humanNameArr: peopleNames.join(",")
        })
        .then(res => {
          this.$message({
            type: "success",
            offset: 50,
            message: "发布成功"
          });
          this.$intent.closeWindow(this);
        });
    },
    //简报名称下拉
    jbNmchange(val) {
      if (val) {
        this.departmentListJb.map(item => {
          if (item.tpyeNo === val) {
            this.newjbName = item.jbNm;
            this.newbianHao = item.tpyeNo;
          }
        });
        this.formData.jbNo =
          this.newjbName + "〔" + new Date().getFullYear() + "〕" + "第期";
        this.formData.jbNm = this.newjbName;
        this.formData.bianHao = this.newbianHao;
      }
    },
    // 转换日期
    transitionDate(dataString) {
      if (dataString) {
        let date = new Date(dataString);
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        let h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
          ":";
        let m =
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) + ":";
        let s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      } else {
        return "";
      }
    },
    //起草通过本地储存获取简报数据
    jbNmmethod(value1, value2) {
      //获取简报名称下拉内容   参数value1当前机构united value2是配置文件的部门id
      this.$api.pubInfo
        .getInfoList({
          parentUnitId: value1,
          unitId: value2
        })
        .then(res => {
          this.departmentListJb = res.data;
          this.formData.jbNm = res.data[0].jbNm;
          this.formData.jbNo =
            res.data[0].jbNm + "〔" + new Date().getFullYear() + "〕" + "第期";
          this.formData.bianHao = res.data[0].tpyeNo;
        });
    },
    //打印处理单
    onPrint() {
      this.$intent.goNewPage(this, {
        path: "/departPrint",
        query: { formData: JSON.stringify(this.formData) }
      });
    },
    //设置控制域
    getHuanJie() {
      this.$api.pubInfo.clHjkzbtn(this.dataqc).then(res => {
        if (res.code == "SUCCESS") {
          this.huanJieMessage = res.data;
          this.requiredFields = this.setRequiredFields(
            this.requiredFields,
            this.huanJieMessage.requiredFields
          ); //必填控制域
          this.readFields = this.setReadFields(
            this.readFields,
            this.huanJieMessage.readFields
          ); //不可编辑控制域
          this.FEIbuttonList = this.showButton(
            this.FEIbuttonList,
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
          ); //必填意见域
          this.rules = {
            title: [
              {
                required: this.requiredFields.title,
                message: "标题不能为空",
                trigger: "blur"
              },
              { max: 200, message: "不能超过200字", trigger: "change" }
            ],
            drafDepNm: [
              {
                required: this.requiredFields.drafDepNm,
                message: "拟稿部门不能为空",
                trigger: "change"
              }
            ],
            pubStaut: [
              {
                required: this.requiredFields.pubStaut,
                message: "发布状态不能为空",
                trigger: "change"
              }
            ],
            jbNm: [
              {
                required: this.requiredFields.jbNm,
                message: "简报名称不能为空",
                trigger: "change"
              }
            ],
            jbNo: [
              {
                required: this.requiredFields.jbNo,
                message: "简报编号不能为空",
                trigger: "change"
              }
            ],
            drafUnm: [
              {
                required: this.requiredFields.drafUnm,
                message: "拟稿人不能为空",
                trigger: "change"
              }
            ],
            phone: [
              {
                required: this.requiredFields.phone,
                message: "联系电话不能为空",
                trigger: "change"
              }
            ],
            drafTime: [
              {
                required: this.requiredFields.drafTime,
                message: "拟稿日期不能为空",
                trigger: "change"
              }
            ],
            pubTime: [
              {
                required: this.requiredFields.pubTime,
                message: "发布日期不能为空",
                trigger: "change"
              }
            ],
            sendUnm: [
              {
                required: this.requiredFields.sendUnm,
                message: "发送对象不能为空",
                trigger: "change"
              }
              // { max: 200, message: '不能超过200字', trigger: 'change' },
            ],
            issuingOpinions: [
              {
                required: this.requiredIdeaFields.issuingOpinions,
                message: "签发意见不能为空",
                trigger: "change"
              }
            ],
            auditOpinions: [
              {
                required: this.requiredIdeaFields.auditOpinions,
                message: "审核意见不能为空",
                trigger: "change"
              }
            ],
            remark: [
              {
                required: this.requiredIdeaFields.remark,
                message: "备注不能为空",
                trigger: "change"
              }
            ]
          };
          if (!this.formData.qiHao) {
            console.log(22222333);
            this.FEIbuttonList[10].show = false;
            this.FEIbuttonList[9].show = false;
          } else {
            let visiblebtn = this.huanJieMessage.visibleButtons;
            let visiblebtn2 = this.huanJieMessage.visibleButtonsBycondition;
            console.log(visiblebtn, "获取环节信息");
            for (let i in visiblebtn) {
              for (let k in visiblebtn2) {
                if (i == "hcgs" || k == "hcgs") {
                  this.FEIbuttonList[9].show = true;
                }
              }
            }
          }
          if (this.formData.sendUid !== "isSynthesisFormat") {
            this.FEIbuttonList[10].show = false;
            this.qGao = "false";
          } else {
            this.FEIbuttonList[9].show = false;
          }
        }
      });
    }
  },
  created() {
    if (this.$route.query.depInfoPubId) {
      this.uploadConfig.id = this.$route.query.depInfoPubId
      this.fileId = this.$route.query.id
      sessionStorage.setItem("fileId", this.fileId);
      this.$api.pubInfo
        .getJbList(
          { depInfoPubId: this.$route.query.depInfoPubId, type: "detail", frompage: '1'},
          {
            PAGE_JUMP: 1,
            REC_IN_PAGE: 10
          }
        )
        .then(res => {
          this.formData = res.data.page[0];
          if (this.formData.isClean == "1") {
            this.hfqGao = "false";
            this.qGao = "true";
            console.log(2222);
          } else {
            this.qGao = "false";
            this.hfqGao = "true";
          }
          let numberNum = "";
          if (this.formData.jbNo) {
            numberNum = this.formData.jbNo;
          } else {
            numberNum = "";
          }
          this.num = numberNum + this.formData.title + "信息发布单";
          console.log(this.num, "this.num");
          console.log(res, "获取formData");
          if (res.tcHumanRoles) {
            this.tcHumanRoles = res.tcHumanRoles.isDirectBack;
          }
          const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
          this.dataqc.pcsAvyId = res.data.page[0].curNodeCode; //当前节点id
          this.dataqc.pcsTpId = res.data.page[0].pTplNo;
          this.dataqc.humanId = userInfoData.humanId; //当前用户id
          if (this.formData.sendUid === "isSynthesisFormat") {
            this.hcgsbtn = false;
            console.log("hcgsbtntrue2");
          } else {
            this.hcgsbtn = true;
            console.log("hcgsbtnfalse");
          }
          // //起草正文和处理正文按钮显隐
          if (
            this.formData.pubMainFilePath == "" ||
            this.formData.pubMainFilePath == undefined
          ) {
            this.qczwBtn = true;
            this.clzwBtn = false;
          } else if (this.formData.pubMainFilePath) {
            this.qczwBtn = false;
            this.clzwBtn = true;
          }
          // //生成编号和退号按钮显隐
          // if (
          //   this.formData.qiHao == '' ||
          //   this.formData.qiHao == 0 ||
          //   this.formData.qiHao == undefined
          // ) {
          //   this.scbhBtn = true //生成编号
          //   this.thBtn = false //退号
          // } else {
          //   this.scbhBtn = false //生成编号
          //   this.thBtn = true //退号
          // }
          // if (this.formData.isClean == '' || this.formData.qiHao == undefined) {
          // }
          this.getFileList();
          this.getHuanJie();
          //返回签发意见 审核意见 备注
          this.$api.pubInfo
            .backData({ pubId: this.formData.depInfoPubId })
            .then(res => {
              this.backList = res.list;
              // if (this.formData.issuingOpinionsArrays.length > 0) {
              //   console.log('有签发意见----签发以后（有签发意见）显示：处理正文、生成编号')
              //   if (this.formData.qiHao) {
              //     console.log('有编号----生成编号后显示：退号、合成格式、处理正文')
              //     if (this.formData.sendUid === 'isSynthesisFormat') {
              //       console.log('合成格式后显示：清稿、处理正文')
              //     } else {
              //       console.log('没有合成格式')
              //     }
              //   } else {
              //     console.log('没有编号----相当回到（1）签发后没生成编号的状态。')
              //   }
              // } else {
              //   console.log('没有签发意见')
              // }
            });
          //简报下拉数据根据当前机构核部门进行请求
          this.$api.pubInfo
            .getInfoList({
              parentUnitId: this.formData.drafOrgId,
              unitId: this.formData.drafDepId
            })
            .then(res => {
              this.departmentListJb = res.data;
            });
        });
    }
    // 起草
    if (this.$route.query.objList) {
      let Jb = JSON.parse(localStorage.getItem("userInfo"));
      this.formData.phone = Jb.telMobile ? Jb.telMobile.replace(/,/g, " ") : "";
      //本地获取同一机构下的部门
      const unitInfoArrays = JSON.parse(localStorage.getItem("unitInfo"));
      const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
      for (const i in unitInfoArrays) {
        if (unitInfoArrays[i].unitId === userInfoData.unitId) {
          this.departmentList.push(unitInfoArrays[i]);
        }
        this.jbNmmethod(
          JSON.parse(this.$route.query.objList).unitId,
          JSON.parse(this.$route.query.objList).firstUnitId
        );
        this.dataqc.humanId = userInfoData.humanId; //当前用户id
      }
      this.getFileList();
      this.getHuanJie();
      // 修改表头
      this.$api.pubInfo
        .getisorunitName({
          unitCode: JSON.parse(this.$route.query.objList).firstUnitId //firstUnitId
        })
        .then(res => {
          if (res.data.unitAndConfig.isSpecialHead == "0") {
            this.formData.topTitle =
              JSON.parse(this.$route.query.objList).unitName +
              res.data.unitAndConfig.unitShort; //部门简称
          } else if (res.data.unitAndConfig.isSpecialHead == "1") {
            this.formData.topTitle = res.data.unitAndConfig.unitName; //部门全称
          }
        });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-table__body-wrapper::-webkit-scrollbar {
  display: block;
  width: 6px;
  height: 6px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(54, 54, 54, 0.3);
}
.el-table__body-wrapper::-webkit-scrollbar-track-piece {
  background: white;
}
.isdialog {
  height: 34px;
  line-height: 34px;
}
/deep/.zhusong .el-textarea__inner,
/deep/.chaosong .el-textarea__inner {
  min-height: 31px !important;
}
.zfTwo {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .title-h1 {
    margin-bottom: 15px;
    font-size: 30px;
    text-align: center;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
  }
  .process_content {
    width: 80%;
    // min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          display: inline-block;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
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
.adviceInfo {
  font-size: 14px!important;
  line-height: 20px;
  text-align: right;
}
.lineContent {
    line-height: 24px;
    font-size: 14px;
    word-break: break-all;
    white-space: pre-line;
}
.opinionTbody{
  background-color: rgba(228,231,237,.32)!important;
  color: #000;
  padding: 5px 15px 5px 5px!important;
  border: 1px solid #e4e7ed!important;
  border-radius: 4px!important;
  margin-top: 5px;
}
.pad_lr10 {
  padding-right: 0px;
}
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
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  float: left;
  width: 80%;
  border-right: 1px solid #ccc;
  .con-left-p1 {
    width: 12%;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 1px solid #ccc;
    border-left: 0;
    border-top: 0;
  }
  .con-left-p2 {
    width: 88%;
    height: 30px;
    line-height: 30px;
    float: left;
    border-bottom: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
}
.con-right {
  float: left;
  width: 20%;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.chuanyue1 {
  border-bottom: 1px solid #ccc;
}
.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  height: 50px;
  line-height: 50px;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
}
.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
  }
}
/deep/.radio-form .el-radio {
  margin: 10px;
}
.zfTwo .process_content .cur_box {
  border: 1px solid #f60;
}
.add-icon {
  height: 45px;
  line-height: 27px;
  padding-left: 10px;
}
</style>
