<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="right">
        <el-button @click="close">关闭</el-button>
        <el-button v-for="(item, index) in FEIbuttonList" @click="buttonClick(item.name)" :key="index" v-show="item.show" size="mini" plain>{{ item.name }}</el-button>
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
          <p v-if="this.$route.query.type == '02' ||this.$route.query.type == '04'?false:true">
            当前处理人：
            <span>{{ formData.curUsernm}}</span>
          </p>
        </div>
      </div>
      <el-form :rules="rules" ref="formData" :model="formData" label-width="120px">
        <el-row v-if="this.$route.query.type == '04' ? true : false">
          <el-col :span="12">
            <el-form-item label="是否归档">
              <el-radio-group v-model="formData.remark1" :disabled="false">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否抽取">
              <el-radio-group v-model="formData.remark2" :disabled="false">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" :disabled="isAlldisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="拟稿部门" prop="drafDepNm" style="width：100%">
              <el-select v-model="formData.drafDepNm" style="width: 80%" :disabled="true">
                <el-option v-for="item in departmentList" :key="item.currUnitId" :label="item.currUnitName" :value="item.currUnitId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布状态" prop="pubStaut">
              <el-input v-model="formData.pubStaut" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="简报名称" prop="jbNm">
              <el-select v-model="formData.jbNm" placeholder="请选择" :disabled="isAlldisabled" @change="jbNmchange($event)">
                <el-option v-for="(item, index) in departmentListJb" :key="index" :label="item.jbNm" :value="item.tpyeNo"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简报编号" prop="jbNo">
              <el-input v-model="formData.jbNo" style="width：100%" :disabled="formDatAjbNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="拟稿人" prop="drafUnm">
              <el-input v-model="formData.drafUnm" :disabled="isAlldisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="formData.phone" :disabled="isAlldisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="拟稿日期" prop="drafTime">
              <el-date-picker :disabled="true" v-model="formData.drafTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布日期" prop="pubTime">
              <el-date-picker :disabled="true" v-model="formData.pubTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="发送对象" prop="sendUnm">
              <!-- <el-input v-model="formData.sendUnm" :disabled="isAlldisabled"></el-input> -->
              <el-input type="textarea" :autosize="{ minRows: 1}" class="zhusong" resize="none" v-model="formData.sendUnm" :disabled="isAlldisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="签发意见" prop="issuingOpinions">
          <el-row v-if="issuingOpinionsArrays.length == 0 ? true : false">
            <el-input type="textarea" v-model="formData.issuingOpinions" :disabled="editedIdeaFields.issuingOpinions" style="margin-bottom: 9px"></el-input>
          </el-row>
          <div v-else class="opinionTbody">
            <div class="lineContent" v-for="(item, index) in issuingOpinionsArrays" :key="index">
              <div>{{item.opinionText}}</div>
              <div class="adviceInfo">{{item&&item.depnm}}<span class="pad_lr10">{{item&&item.unm}}</span><br>{{item&&transitionDate(item.opinionTime)}}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="审核意见" prop="auditOpinions">
          <el-row v-if="auditOpinionsArrays.length == 0 ? true : false">
            <el-input type="textarea" v-model="formData.auditOpinions" :disabled="editedIdeaFields.auditOpinions" style="margin-bottom: 9px"></el-input>
          </el-row>
          <div v-else class="opinionTbody">
            <div class="lineContent" v-for="(item, index) in auditOpinionsArrays" :key="index">
              <div>{{item.opinionText}}</div>
              <div class="adviceInfo">{{item&&item.depnm}}<span class="pad_lr10">{{item&&item.unm}}</span><br>{{item&&transitionDate(item.opinionTime)}}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-row v-if="remarkArrays.length == 0 ? true : false">
            <el-input type="textarea" v-model="formData.remark" :disabled="editedIdeaFields.remark" style="margin-bottom: 9px"></el-input>
          </el-row>
          <div v-else class="opinionTbody">
            <div class="lineContent" v-for="(item, index) in remarkArrays" :key="index">
              <div>{{item.opinionText}}</div>
              <div class="adviceInfo">{{item&&item.depnm}}<span class="pad_lr10">{{item&&item.unm}}</span><br>{{item&&transitionDate(item.opinionTime)}}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="发布范围" prop="scope">
          <el-row class="scope">
            <div style="min-height:42px">
              <div class="box">本行领导：</div>
              <div class="box_1 box_2">{{sendHumanName}}</div>
            </div>
            <div style="min-height:42px">
              <div class="box">本行部门：</div>
              <div class="box_1">{{senDeptName}}</div>
            </div>
            <div style="min-height:42px">
              <div class="box">其他机构：</div>
              <div class="box_1 box_2">{{sendOrgName}}</div>
            </div>
          </el-row>
        </el-form-item>
         <h6 class="bank_dispach_file_tit">附件</h6>
         <div id="scfj" class="height_90"></div>
         <upfileList :canmoveOrdown="false" label="" :fileList="formData.attchmentFileInfo" ></upfileList>
      </el-form>

    </div>
    <!-- 选择人员树 -->
    <!-- <select-person v-dialogDrag :orgOrDeptId='selsecOrgOrDeptId' :treeData="treeData" :loadingTree="loadingTree" :seletOptionsData="seletOptionsData" :offenUse="offenUse" :dialogType="dialogType" :dialogTypeNow="dialogTypeNow" :fromData="formData" dialogTit="选择人员" :checkIds="checkIds" :checkData="checkData" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog">
    </select-person> -->

    <!--流程调度树-->
    <select-person v-model="dialogState" :orgOrDeptId='selsecOrgOrDeptId' :seletOptionsData="seletOptionsData" :nextNodeId='nextNodeId' @showCompDialog="showCompDialog"></select-person>
    <!-- <flow-chart v-model="showFlowChart" :tableData="flowChartList" :tableCols="tableCols"></flow-chart> -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>

    <org-tree v-model="showOrgTree" title="选择部门" :outBank="true" :isSingle="false" :orgOrDeptId="orgOrDeptId" :orgOrDept="orgOrDept" :queryType="queryTypeJg" :departmentHead='departmentHead' :type="orgTypeJg" @orgList="getOrgList"></org-tree>
    <!-- :isSearchAll="true" -->

    <el-dialog v-dialogDrag title="收回发布" :visible.sync="recycleIsdialog" width="40%" height="200px">
      <span>已发布本行领导</span>
      <m-table style="margin-bottom:20px" @select="recyclesSelect1" :isSelection="true" size="medium" :tableData="recyclesTableData1" :tableCols="recyclesTableCols1" :isPagination="false" :pagination="pagination"></m-table>
      <span>已发布部门</span>
      <m-table style="margin-bottom:20px" @select="recycleSelect" :isSelection="true" size="medium" :tableData="recycleTableData" :tableCols="recycleTableCols" :isPagination="false" :pagination="pagination"></m-table>
      <span>已发布群组</span>
      <m-table style="margin-bottom:20px" @select="recyclesSelect" :isSelection="true" size="medium" :tableData="recyclesTableData" :tableCols="recyclesTableCols" :isPagination="false" :pagination="pagination"></m-table>
      <el-button type="primary" @click="recycleSure">确定</el-button>
      <el-button @click="recycleClose">取消</el-button>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from 'components/tree/orgTree1'
import mTable from '@/components/table/tTable'
// import selectPerson from 'components/tree/treeTansun'
import selectPerson from 'components/viewFlow/dispatchTree' //流程调度树
import shiwuFlow from '@/components/viewFlow/shiwuFlow'
import minixs from '@/minixs/index'
import exportTable from '@/minixs/exportTable'
import exportTableQueryScript from '@/minixs/exportTableQueryScript'
import upfileList from "@/views/bianhan/components/showUploadFile"; //附件展示
export default {
  name: 'departInfodepartfinish',
  components: {
    selectPerson,
    orgTree,
    mTable,
    shiwuFlow,
    upfileList
  },
  mixins: [minixs, exportTableQueryScript],
  data() {
    return {
      noPar: '',
      isFile: false,
      isExtract: false,
      num: '',
      orgTypeJg: '', //为all时，拉取一级部门与机构 ,""拉取只拉去部门或者机构
      queryTypeJg: 'peer', //up:上级   low:下级  peer:同级 ''其他
      departmentHead: true,
      nextNodeId: '起草',
      selsecOrgOrDeptId: '', //流程调度机构id
      ifView: Number, //打开正文时的状态值
      isAlldisabled: false, //表单反显
      processISOr: false, //是否进行完成并发送
      formDatAjbNo: false,
      //套红文件
      bank_findTemplete: {
        function: 'doDownloadFile',
        sendType: '',
        redHead: '',
      },
      //下载文件
      bank_doDownloadFile: {
        function: 'doDownloadFile',
        fileName: '',
        filePath: '',
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: 'doRecoverCleanDraft',
        id: '',
      },
      senOrgId: '',
      sendOrgName: '',
      sendOrgTime: '',
      sendHumanName: '',
      // 增发部门ID数组
      senDeptIdArrays: [],
      // 增发部门名称数组
      senDeptNameArrays: [],
      // 增发机构ID数组
      senOrgIdArrays: [],
      // 增发部门名称数组
      senOrgNameArrays: [],
      // 增发机构ID数组
      sendHumanCodeArrays: [],
      // 增发部门名称数组
      sendHumanNameArrays: [],
      // 推号标识
      backNumFlag: false,
      // 回收列表对象
      recycleListObject: {},
      senDeptId: '',
      senDeptName: '',
      sendDeptTime: '',
      // 强制回收选中数据
      dataArrays: [],
      dataArrays1: [],
      dataArray: [],
      // 收回发布
      recycleIsdialog: false,
      // 强制回收列表数据
      recycleTableData: [],
      recyclesTableData: [],
      recyclesTableData1: [],
      recycleTableDataIds: [],
      recycleTableDataNames: [],
      // 强制回收表头配置
      recycleTableCols: [
        { label: '部门名称', prop: 'senDeptName' },
        { label: '发送时间', prop: 'sendDeptTime' },
      ],
      recyclesTableCols: [
        { label: '群组名称', prop: 'sendOrgName' },
        { label: '发送时间', prop: 'sendOrgTime' },
      ],
      recyclesTableCols1: [
        { label: '本行领导', prop: 'sendHumanName' },
        { label: '发送时间', prop: 'sendHumanTime' },
      ],
      cyData: [],
      // 收回弹窗
      showCyPerson: false,
      // 生成编号返回数据
      resData: {},
      deleteapplyCode: '',
      // 备注数组
      remarkArrays: [],
      // 签发意见数组
      issuingOpinionsArrays: [],
      // 审核意见数组
      auditOpinionsArrays: [],
      backList: [],
      // 强制回收数据
      tableBackData: [],
      // 强制回收表头配置
      tableBackCols: [
        { label: '拟稿日期', prop: 'drafTime' },
        { label: '标题', prop: 'title' },
        { label: '简报编号', prop: 'jbNo' },
        { label: '拟稿部门', prop: 'drafDepNm' },
        { label: '当前环节', prop: 'curNodeName' },
        { label: '操作人', prop: 'curUsernm' },
      ],
      // 分页数据
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },
      // 发布弹窗
      showOrgTree: false,
      // 部门编号
      orgOrDeptId: '',
      orgOrDept: 0,
      // 文号数组
      delCode: [],
      // 是否展示文号弹窗
      isdialog: false,
      isNeedQCZW: true,
      projectShortName: '',
      newjbName: '', // 每次下拉选中的简报名称
      newbianHao: '', // 每次下拉选中的简报id
      ch: false,
      // 是否需要强制收回按钮
      isNeedForceButton: false,
      FEIbuttonList: [
        { name: '保存', type: 'chakansq', show: false }, //0
        { name: '处理正文', type: 'btn_clzw', show: false }, //4  1
        { name: '查看正文', type: 'ckzw', show: false }, //5  2
        { name: '催办', type: 'cuiban', show: false }, //3
        { name: '收回', type: 'chehui', show: false }, //2  4
        { name: '发布', type: 'banjie', show: false }, //11   5
        { name: '增发', type: 'zjfs', show: false }, //9    6
        { name: '收回发布', type: 'qzsh', show: false }, //10   7
        { name: '归档', type: 'guidang', show: false }, //14   8
        { name: '查看流程', type: 'chalook', show: true }, //6   9
        { name: '打印处理单', type: 'dycld', show: true }, //8   10
        { name: '收藏', type: 'shoucang', show: true }, //7   11
        { name: '维护', type: 'weihu', show: false }, //1  12
        { name: '流程调度', type: 'lcdd', show: false }, //12  13
        { name: '同步', type: 'tongbu', show: false }, //13   14
      ],
      tableCols: [
        { label: '操作人Id', prop: 'EXCID' },
        { label: '操作人名称', prop: 'EXCNM' },
        { label: '节点名称', prop: 'NODE' },
        { label: '节点ID', prop: 'NODEID' },
        { label: '活动创建日期', prop: 'TMS' },
      ],
      huanJieMessage: {},
      showFlowChart: false,
      departmentListJb: [], //简报下拉数据
      departmentList: [], //部门下拉数据
      treeData: [], //人员树
      dialogType: 'dosend',
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: 'next',
      seletOptionsData: [],
      offenUse: true,
      loadingTree: true,
      formData: {
        attchmentFileInfo: [],
        remark1:'',
        remark2:'',
        isFile: '',
        isExtract: '',
        auditOpinions: '', //	审核意见
        bianHao: '', //简报id
        curHumanId: this.$route.query.objList ? JSON.parse(this.$route.query.objList).humanId : '', //当前用户humanId
        curNodeCode: '', //当前环节id
        curNodeName: '拟稿', // //当前环节名称
        curPcsAvyId: '', // //当前活动id
        curUserDepId: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).currUnitId
          : '', //	当前用户所属部门id
        curUserId: this.$route.query.objList ? JSON.parse(this.$route.query.objList).humanCode : '', //当前操作人id
        curUsernm: this.$route.query.objList ? JSON.parse(this.$route.query.objList).humanName : '', //当前操作人名称
        departmentBankIds: '', //	本行部门ids
        departmentBankNames: '', //	本行部门Name
        drafDepId: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).firstUnitId
          : '', //拟稿部门id
        drafDepNm: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).firstUnitName
          : '', //	拟稿部门名称
        drafOrgId: this.$route.query.objList ? JSON.parse(this.$route.query.objList).unitId : '', //	拟稿机构id
        drafOrgName: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).unitName
          : '', //	拟稿机构name
        drafTime: formatData(new Date().getTime(), 'YYYY-MM-DD'), //	拟稿日期
        drafUid: this.$route.query.objList ? JSON.parse(this.$route.query.objList).humanCode : '', //	拟稿人id
        drafUnm: this.$route.query.objList ? JSON.parse(this.$route.query.objList).humanName : '', //拟稿人名称
        finishYear: '', //	办结年份
        haveRead: '', //	是否已读 1是0否
        histUserid: '', //	历史操作人
        isClean: '', //	是否清稿 1是0否
        issuingOpinions: '', //	签发意见
        jbNm: '', //	简报名称
        jbNo: '', //	简报编号
        jbNoStr: '', //	废弃字段
        leadersBankIds: '', //	本行领导id
        leadersBankNames: '', //	本行领导name
        multiTenancyId: '', //	流程多实体标示
        otherOrgIds: '', //	其他机构id
        otherOrgName: '', //其他机构name
        pTplNo: '', //	流程模板id
        phone: '', //联系电话
        processInstId: '', //	流程实例id
        processStaut: '', //流程状态：扭转,办结
        pubMainFilePath: '', //	正文附件地址
        pubStaut: '', //	发布状态
        pubTime: '', //	发布日期
        releaseInformation: '', //	发布信息
        remark: '', //	备注
        sendUid: '', //发送对象id
        sendUnm: '', //	发送对象名称
        supNodeCode: '', //上一环节id
        supPcsAvyId: '', //	上一活动id
        supUserDepId: '', //	上一处理人部门id
        supUserHumanId: '', //	上一处理人humanId
        supUserid: '', //上一处理id
        supUsernm: '', //	上一处理人名称
        title: '', //标题
        topTitle: this.$route.query.objList
          ? JSON.parse(this.$route.query.objList).unitName +
            JSON.parse(this.$route.query.objList).currUnitName
          : '', //	表头
      },
      //可编辑意见域
      editedIdeaFields: {
        issuingOpinions: true, //签发意见
        auditOpinions: true, //审核意见
        remark: true, //备注
      },
      //必填意见域
      requiredIdeaFields: {
        issuingOpinions: false, //签发意见
        auditOpinions: false, //审核意见
        remark: false, //备注
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
        sendUnm: false, //发送对象
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
        sendUnm: false, //发送对象
      },
      id: '',
      rowData: {},
      jbNm: '',
      processInstId: '',
      clhjdata: {
        curTplNo: '',
        curNodeId: '',
        curMultiTenancyId: '',
        // nodeIdArr: []
      },
      flowChartList: [],
      rules: {},
      dataqc: {
        //起草获取权限数据参数
        humanId: '',
        multiTenancyId: 'CN025',
        //详情获取权限数据参数
        pcsAvyId: '',
        pcsTpId: '',
      },
      department: {
        currUnitId: '',
        currUnitName: '',
        unitName: '',
        unitId: '',
      },
    }
  },
  watch: {
    backList: {
      handler(val) {
        for (const i in val) {
          if (val[i].opinionName === 'remark') {
            this.remarkArrays.push(val[i])
            this.formData.remarkArrays = this.remarkArrays
          } else if (val[i].opinionName === 'issuingOpinions') {
            this.issuingOpinionsArrays.push(val[i])
            this.formData.issuingOpinionsArrays = this.issuingOpinionsArrays
          } else if (val[i].opinionName === 'auditOpinions') {
            this.auditOpinionsArrays.push(val[i])
            this.formData.auditOpinionsArrays = this.auditOpinionsArrays
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
      getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.$route.query.depInfoPubId || this.formData.id}).then(res => {
        this.$set(this.formData, "attchmentFileInfo", res.data);
      });
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: 'doDownloadFile' }
      bank_doDownloadFile.fileName = file.fileName
      bank_doDownloadFile.filePath = file.filePath
      this.$post
        .postData('doDownloadFile', JSON.stringify(bank_doDownloadFile), this.$businessCode.fawglfj)
        .then((res) => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState() ? location.origin : 'http://localhost:8080') +
                  '/ecpweb/getLocalFile.action?relativePath=' +
                  res.filePath +
                  '&fileName=' +
                  res.fileName,
                file.fileName
              )
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                offset: 400,
                message: '下载失败',
                duration: 500,
              })
            }
          }
        })
    },
    buttonClick(params) {
      switch (params) {
        case '保存':
          this.save()
          break
        case '催办':
          this.catalyze()
          break
        case '打印处理单':
          this.onPrint()
          break
        case '维护':
          this.maintain()
          break
        case '流程调度':
          this.dispatch()
          break
        case '查看流程':
          if (this.formData.processInstId) {
            this.$api.pubInfo
              .Lookcx({ curProcessInstId: this.formData.processInstId })
              .then((res) => {
                this.showFlowChart = true
                this.flowChartList = res.data
                this.$nextTick(() => {
                  this.$refs.dialogLine.openDialog()
                })
              })
          } else {
            this.$message.warning('未启动流程')
          }
          break
        case '收藏':
          exportTableQueryScript.collect(this, this.$route.query.depInfoPubId, 'depInfoPubId', 'A08462976')
          break
        case '收回':
          this.withdraw()
          break
        case '增发':
          this.recycleLoadData()
          this.addPublick()
          break
        case '收回发布':
          this.constraintBack()
          break
        case '发布':
          this.publick()
          break
        //处理正文
        case '处理正文':
          this.disposeText()
          break
        //查看正文
        case '查看正文':
          this.lookBody()
          break
        // 清稿
        case '清稿':
          this.doClearDraft()
          break
        // 清稿恢复
        case '清稿恢复':
          this.recoverClearDraft()
          break
        case '同步':
          this.peer()
          break
        case '归档':
          this.guidang()
          break
      }
    },
    guidang() {
      this.$api.pubInfo.getWord({ depInfoPubId: this.formData.depInfoPubId }).then((res) => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.msg,
        })
      })
    },
    peer() {
      this.$api.pubInfo.deptInfoData({ pubId: this.formData.depInfoPubId }).then((res) => {
        console.log(res.data, '获取未修改数据')
        this.formDataObject = res.data.data[0]
        this.$api.pubInfo
          .updataObject({
            ...this.formDataObject,
            title: this.formData.title,
            jbNo: this.formData.jbNo,
            pubMainFilePath: this.formData.pubMainFilePath,
          })
          .then((res) => {
            console.log(res, '获取返回数据')
          })
      })
    },
    handleClose() {
      this.isdialog = false
      this.isdialogCY = false
    },
    lookBody() {
      let bank_doDownloadFile = { function: 'doDownloadFile' }
      let num = this.num
      const pathArrays = this.formData.pubMainFilePath.split(',')
      bank_doDownloadFile.fileName = pathArrays[0]
      bank_doDownloadFile.filePath = pathArrays[1]
      let id = this.formData.depInfoPubId
      this.doDraftLook(id, bank_doDownloadFile, num)
    },
    //文号确定按钮
    delecurrentCode(row) {
      if (this.deleteapplyCode) {
        this.formData.jbNo =
          this.jbName + '〔' + new Date().getFullYear() + '〕' + '第' + this.deleteapplyCode + '期'
        this.isdialog = false
        this.save('1')
      } else {
        this.$message.warning('请选择编号')
      }
    },
    // 催办
    catalyze() {
      this.$api.pubInfo.press({ depInfoPubId: this.formData.depInfoPubId }).then((res) => {
        this.$message.success('催办成功')
      })
    },
    //关闭文号
    closeWH() {
      this.isdialog = false
    },
    // 维护
    maintain() {
      this.isAlldisabled = false
      if (this.$route.query.type == '03') {
        this.FEIbuttonList[0].show = true
        this.FEIbuttonList[12].show = true
        this.FEIbuttonList[1].show = true
        this.FEIbuttonList[10].show = true
        this.FEIbuttonList[13].show = true
      } else if (this.$route.query.type == '04') {
        this.isFile = false
        this.isExtract = false
        this.FEIbuttonList[0].show = true
        // this.FEIbuttonList[12].show = true
        this.FEIbuttonList[1].show = true
        this.FEIbuttonList[9].show = true
        this.FEIbuttonList[11].show = true
        this.FEIbuttonList[10].show = true
        this.FEIbuttonList[8].show = true
      }
    },
    //打印处理单
    onPrint() {
      this.$intent.goNewPage(this, {
        path: '/departPrint',
        query: { formData: JSON.stringify(this.formData) },
      })
    },
    //收回
    withdraw() {
      this.$api.pubInfo.Che({ depInfoPubId: this.formData.depInfoPubId }).then((res) => {
        this.$intent.closeWindow(this)
      })
    },
    //发布
    publick() {
      this.orgOrDeptId = this.formData.drafOrgId //一级部门id
      this.showOrgTree = true
    },
    //请求文件路径
    async getFileInfo(self, thInfo) {
      var successInfo = { state: false }
      const pathArrays = this.formData.pubMainFilePath.split(',')
      this.bank_doDownloadFile.fileName = thInfo ? thInfo.templateUrl.fileName : pathArrays[0]
      this.bank_doDownloadFile.filePath = thInfo ? thInfo.templateUrl.filePath : pathArrays[1]
      await self.$post
        .postData(
          'doDownloadFile',
          JSON.stringify(this.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then((res) => {
          if (res && res.success) {
            if (thInfo) {
              successInfo.filePath = thInfo.filePath
              successInfo.fileName = thInfo.fileName
              successInfo.filePathTh = res.filePath
              successInfo.fileNameTh = res.fileName
            } else {
              successInfo.filePath = res.filePath
              successInfo.fileName = res.fileName
            }

            successInfo.state = true
          } else {
            self.$message({
              type: 'error',
              offset: 400,
              showClose: true,
              message: '后端获取失败',
              duration: 500,
            })
          }
        })
        .catch((erro) => {
          self.$message({
            type: 'error',
            offset: 400,
            showClose: true,
            message: '获取失败',
            duration: 500,
          })
          successInfo.state = false
        })
      return successInfo
    },
    // 流程调度
    dispatch() {
      this.processISOr = true
      this.formData.draftOrganId = JSON.parse(localStorage.getItem('userInfo'))
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.dialogState = true
          this.$api.pubInfo.getJbdispatch(this.formData).then((res) => {
            console.log(res.list, '获取 流程 ')
            let now = res.list.filter((item) => {
              if (item.AVYNODENM !== '处理完毕【办结】') {
                return item
              }
            })
            //带约束条件判断环节
            //过滤重复环节
            let PCSAVYIDs = []
            this.seletOptionsData = now.filter((item) => {
              if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                PCSAVYIDs.push(item.PCSAVYID)
                console.log(item)
                return item
              }
            })
            this.seletOptionsData = this.shoNextNode(
              this.seletOptionsData,
              this.huanJieMessage.acyNodeNextBount
            )
            this.nextNodeId = res.list[1].AVYNODENM

            // this.$nextTick(() => {
            //   // console.log(res)
            //   // console.log(this.seletOptionsData)
            //   // this.seletOptionsData = res.list.slice(1)
            //   this.seletOptionsData = res.list.slice(1)
            // })

            // this.$nextTick(() => {
            //   let PCSAVYIDs=[];
            //   this.seletOptionsData = res.list.filter(item=>{
            //     if(!PCSAVYIDs.includes(item.PCSAVYID)){
            //       PCSAVYIDs.push(item.PCSAVYID);
            //       return item;
            //     }
            //   })
            //   this.seletOptionsData = this.shoNextNode(this.seletOptionsData, this.huanJieMessage.acyNodeNextBount)
            // })
          })
        } else {
          this.$message.warning('请确认表单完整性')
        }
      })
    },
    // 选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.processISOr = false
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      let inforUser = data[0].id.split('#')
      this.formData.nextHuamnNm = data[0].name
      this.formData.nextHumanId = data[0].idStr
      this.formData.nextHumanCode = data[0].unitName
      this.formData.nextDeptId = inforUser[1]
      this.formData.nextPcsNodeID = params.id
      this.formData.nextPcsNodeNM = params.name
      this.formData.userType = 'systemManage'
      this.$api.pubInfo.OverOk(this.formData).then((res) => {
        this.$message({
          message: '完成并发送成功',
          type: 'success',
        })
        this.messageWarn(data[0].idStr)
        this.$intent.closeWindow(this)
      })
    },
    //消息提醒
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          userId: userId, //完成并发送选择的人员用户ID（humanID)
          productCode: 'buMXX', //项目编号（对应字典（提醒项目分类））
          urgentType: '', //紧急程度（部分功能有）
          infoType: '信息刊物部门信息', //类型（模块名称中文（例如 收文，发文））
          infoTitle: this.formData.topTitl + '信息发布单', //业务标题
          infoUser: this.formData.curUsernm, //当前操作人名称
        })
        .then((res) => {})
        .catch((err) => {})
    },
    // 增发
    addPublick() {
      this.$api.pubInfo.deptInfoData({ pubId: this.formData.depInfoPubId }).then((res) => {
        if (!res.data.data) return
        this.formDataObject = res.data.data[0]
        console.log(this.formDataObject)
        if (res.data.data[0].senDeptId !== ',,') {
          this.senDeptIdArrays = res.data.data[0].senDeptId.split(',')
        }
        if (res.data.data[0].senDeptName !== ',,') {
          this.senDeptNameArrays = res.data.data[0].senDeptName.split(',')
        }
        if (res.data.data[0].sendOrgId !== ',,') {
          this.senOrgIdArrays = res.data.data[0].sendOrgId.split(',')
        }
        if (res.data.data[0].sendOrgName !== ',,') {
          this.senOrgNameArrays = res.data.data[0].sendOrgName.split(',')
        }
        if (res.data.data[0].sendHumanCode !== ',,') {
          this.sendHumanCodeArrays = res.data.data[0].sendHumanCode.split(',')
        }
        if (res.data.data[0].sendHumanName !== ',,') {
          this.sendHumanNameArrays = res.data.data[0].sendHumanName.split(',')
        }
        this.orgOrDeptId = this.formData.drafOrgId //一级部门id
        this.showOrgTree = true
      })
    },
    getArrEqual(arr1, arr2) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    },
    //增发  选择部门或群组勾选数据
    getOrgList(data) {
      console.log(data)
      //存储勾选的部门和群组数据
      let ids = [],
        names = [],
        idsQ = [],
        namesQ = [],
        qunzuId = [], //他行群组id
        qunzuName = [], //他行群组name
        qunzuIdOther = [], //部门id
        qunzuNameOther = [], // 部门name
        peopleIds = [],
        peopleNames = [],
        peopleTime = [],
        //存储
        idsArrays = [],
        namesArrays = [],
        sendIdArrays = [],
        sendNameArrays = [],
        peopleIdsOther = [],
        peopleNamesOther = []
      // senDeptNameArrays =[],
      // senDeptIdArrays = []

      data.forEach((item) => {
        if (item.groupClass == '他行群组') {
          qunzuId.push(item.id.split('/')[0])
          qunzuName.push(item.unitName)
        } else {
          if (item.groupClass == '部门') {
            qunzuIdOther.push(item.id.split('/')[0])
            qunzuNameOther.push(item.unitName)
          }
          if (item.unitClass == 0) {
            ids.push(item.unitCode)
            names.push(item.unitName)
          }
          if (item.nodeType == 'human') {
            peopleIds.push(item.unitCode)
            peopleNames.push(item.unitName)
            peopleTime.push(item.login_time)
          }
        }
      })
      console.log(peopleNames)
      idsQ = qunzuIdOther.concat(ids)
      namesQ = qunzuNameOther.concat(names)
      let len = idsQ.length
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (idsQ[i] === idsQ[j]) {
            idsQ.splice(j, 1)
            namesQ.splice(j, 1)
            len--
            j--
          }
        }
      }
      let options = []
      let size = idsQ.length
      for (let i = 0; i < size; i++) {
        let a = {}
        a.id = idsQ[i]
        a.name = namesQ[i]
        options.push(a)
      }
      let arr = options,
        to_remove = this.recycleTableDataIds
      let new_arr = arr.filter((x) => !to_remove.some((item) => x.id === item))
      let idsK = []
      let namesK = []

      new_arr.forEach((item) => {
        idsK.push(item.id)
        namesK.push(item.name)
      })
      idsQ = this.recycleTableDataIds.concat(idsK)
      namesQ = this.recycleTableDataNames.concat(namesK)

      //群组id
      this.senOrgIdArrays.splice(this.senOrgIdArrays.length - 1, 1)
      for (const i in qunzuId) {
        let yesss2 = true
        for (const index in this.senOrgIdArrays) {
          if (qunzuId[i] === this.senOrgIdArrays[index]) {
            yesss2 = false
          }
        }
        if (yesss2) {
          sendIdArrays.push(qunzuId[i].split('/')[0])
        }
      }
      //群组名称
      this.senOrgNameArrays.splice(this.senOrgNameArrays.length - 1, 1)
      for (const i in qunzuName) {
        let yesss3 = true
        for (const index in this.senOrgNameArrays) {
          if (qunzuName[i] === this.senOrgNameArrays[index]) {
            yesss3 = false
          }
        }
        if (yesss3) {
          sendNameArrays.push(qunzuName[i])
        }
      }
      qunzuId = this.senOrgIdArrays.concat(sendIdArrays)
      qunzuName = this.senOrgNameArrays.concat(sendNameArrays)

      //本行领导
      this.sendHumanCodeArrays.splice(this.sendHumanCodeArrays.length - 1, 1)
      for (const i in peopleIds) {
        let yesss2 = true
        for (const index in this.sendHumanCodeArrays) {
          if (peopleIds[i] === this.sendHumanCodeArrays[index]) {
            yesss2 = false
          }
        }
        if (yesss2) {
          peopleIdsOther.push(peopleIds[i].split('/')[0])
        }
      }
      this.sendHumanNameArrays.splice(this.sendHumanNameArrays.length - 1, 1)
      for (const i in peopleNames) {
        let yesss3 = true
        for (const index in this.sendHumanNameArrays) {
          if (peopleNames[i] === this.sendHumanNameArrays[index]) {
            yesss3 = false
          }
        }
        if (yesss3) {
          peopleNamesOther.push(peopleNames[i])
        }
      }
      peopleIds = this.sendHumanCodeArrays.concat(peopleIdsOther)
      peopleNames = this.sendHumanNameArrays.concat(peopleNamesOther)

      this.$api.pubInfo
        .updataObject({
          ...this.formDataObject,
          briefingNo: this.formData.jbNo,
          title: this.formData.title,
          jbNo: this.formData.jbNo,
          mainFilePath: this.formData.pubMainFilePath,
          mainFileName: this.formData.pubMainFilePath,
          senDeptId: ',' + idsQ.join(',') + ',',
          senDeptName: ',' + namesQ.join(',') + ',',
          sendOrgId: ',' + this.removeNull(qunzuId).join(',') + ',',
          sendOrgName: ',' + this.removeNull(qunzuName).join(',') + ',',
          sendHumanCode: ',' + this.removeNull(peopleIds).join(',') + ',',
          sendHumanName: ',' + this.removeNull(peopleNames).join(',') + ',',
        })
        .then((res) => {
          // debugger
          // this.$intent.closeWindow(this)
          this.$message({
            message: '增发成功',
            type: 'success',
          })
        })
    },
    // 移除对象数组的空值
    removeNull(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == null || arr[i] == '' || JSON.stringify(arr[i]) == '{}') {
          arr.splice(i, 1)
          i = i - 1
        }
      }
      return arr
    },
    // 收回发布  （收回发布处理逻辑勾选的数据从数组中删除，留下的数据发送给后端，保持接口）
    constraintBack() {
      this.recycleIsdialog = true
      this.recycleLoadData()
    },
    // 部门强制收回多选数据
    recycleSelect(row) {
      var arrrr = []
      for (const i in this.recycleTableData) {
        var yesss = true
        for (const index in row) {
          if (this.recycleTableData[i].senDeptId == row[index].senDeptId) {
            yesss = false
          }
        }
        if (yesss) {
          arrrr.push(this.recycleTableData[i])
        }
      }
      this.dataArrays = arrrr
    },
    //群组部门强制收回多选数据
    recyclesSelect(row) {
      var arrrr1 = []
      for (const i in this.recyclesTableData) {
        var yesss1 = true
        for (const index in row) {
          if (this.recyclesTableData[i].senOrgId == row[index].senOrgId) {
            yesss1 = false
          }
        }
        if (yesss1) {
          arrrr1.push(this.recyclesTableData[i])
        }
      }

      this.dataArray = arrrr1
    },
    //群组部门强制收回多选数据
    recyclesSelect1(row) {
      var arrrr2 = []
      for (const i in this.recyclesTableData1) {
        var yesss2 = true
        for (const index in row) {
          if (this.recyclesTableData1[i].sendHumanCode == row[index].sendHumanCode) {
            yesss2 = false
          }
        }
        if (yesss2) {
          arrrr2.push(this.recyclesTableData1[i])
        }
      }

      this.dataArrays1 = arrrr2
    },
    // 强制回收确定按钮
    recycleSure() {
      let arrId = []
      let arrName = []
      let arrTime = []
      let arrOrgId = []
      let arrOrgName = []
      let arrOrgTime = []
      let arrHumanCode = []
      let arrHumanName = []
      let arrHumanTime = []
      for (const i in this.dataArrays) {
        arrId.push(this.dataArrays[i].senDeptId)
        arrName.push(this.dataArrays[i].senDeptName)
        arrTime.push(this.dataArrays[i].sendDeptTime)
      }
      for (const i in this.dataArray) {
        arrOrgId.push(this.dataArray[i].senOrgId)
        arrOrgName.push(this.dataArray[i].sendOrgName)
        arrOrgTime.push(this.dataArray[i].sendOrgTime)
      }
      for (const i in this.dataArrays1) {
        arrHumanCode.push(this.dataArrays1[i].sendHumanCode)
        arrHumanName.push(this.dataArrays1[i].sendHumanName)
        arrHumanTime.push(this.dataArrays1[i].sendHumanTime)
      }
      console.log(this.dataArrays1, '获取dataArrays1')
      this.recycleListObject.senDeptId = ',' + arrId.join(',') + ','
      this.recycleListObject.senDeptName = ',' + arrName.join(',') + ','
      this.recycleListObject.sendDeptTime = ',' + arrTime.join(',') + ','
      this.recycleListObject.sendOrgId = ',' + arrOrgId.join(',') + ','
      this.recycleListObject.sendOrgName = ',' + arrOrgName.join(',') + ','
      this.recycleListObject.sendOrgTime = ',' + arrOrgTime.join(',') + ','
      this.recycleListObject.sendHumanCode = ',' + arrHumanCode.join(',') + ','
      this.recycleListObject.sendHumanName = ',' + arrHumanName.join(',') + ','
      this.recycleListObject.sendHumanTime = ',' + arrHumanTime.join(',') + ','

      console.log(
        this.recycleListObject.senDeptName,
        this.recycleListObject.sendOrgName,
        this.recycleListObject.sendHumanName
      )
      this.$api.pubInfo
        .updataObject({
          ...this.recycleListObject,
        })
        .then((res) => {
          this.recycleLoadData()
          this.$message({
            message: '回收成功',
            type: 'success',
          })
          this.recycleIsdialog = false
        })
    },
    // 强制回收取消按钮
    recycleClose() {
      this.recycleIsdialog = false
    },
    recycleLoadData() {
      this.recycleTableData = []
      this.recyclesTableData = []
      this.recyclesTableData1 = []
      this.recycleTableDataIds = []
      this.recycleTableDataNames = []

      this.$api.pubInfo
        .deptInfoData(
          { pubId: this.formData.depInfoPubId },
          {
            PAGE_JUMP: 1,
            REC_IN_PAGE: 6,
          }
        )
        .then((res) => {
          console.log(res.data.data[0], '获取回收列表')
          if (res.data.data.length !== 0) {
            this.senDeptName = res.data.data[0].senDeptName.split(',')
            this.sendOrgName = res.data.data[0].sendOrgName.split(',')
            this.sendHumanName = res.data.data[0].sendHumanName.split(',')
            var arr = this.senDeptName.filter((el) => {
              return el !== ''
            })
            var arrOrg = this.sendOrgName.filter((el) => {
              return el !== ''
            })
            var arrHuman = this.sendHumanName.filter((el) => {
              return el !== ''
            })
            this.senDeptName = arr.join('、')
            this.sendOrgName = arrOrg.join('、')
            this.sendHumanName = arrHuman.join('、')

            this.recycleListObject = res.data.data[0]
            const senDeptIdArrays = res.data.data[0].senDeptId.split(',')
            const senDeptNameArrays = res.data.data[0].senDeptName.split(',')
            const sendDeptTimeArrays = res.data.data[0].sendDeptTime.split(',')

            const senOrgIdArrays = res.data.data[0].sendOrgId.split(',')
            const senOrgNameArrays = res.data.data[0].sendOrgName.split(',')
            const sendOrgTimeArrays = res.data.data[0].sendOrgTime.split(',')

            const sendHumanCodeArrays = res.data.data[0].sendHumanCode.split(',')
            const sendHumanNameArrays = res.data.data[0].sendHumanName.split(',')
            const sendHumanTimeArrays = res.data.data[0].sendHumanTime.split(',')
            for (const i in senDeptIdArrays) {
              if (senDeptIdArrays[i]) {
                const dataArrays = {
                  senDeptId: senDeptIdArrays[i],
                  senDeptName: senDeptNameArrays[i],
                  sendDeptTime: sendDeptTimeArrays[i],
                }

                this.recycleTableData.push(dataArrays)
                this.recycleTableDataIds.push(dataArrays.senDeptId)
                this.recycleTableDataNames.push(dataArrays.senDeptName)
              }
            }
            this.dataArrays = this.recycleTableData

            for (const index in senOrgIdArrays) {
              if (senOrgIdArrays[index]) {
                const datasArrays = {
                  senOrgId: senOrgIdArrays[index],
                  sendOrgName: senOrgNameArrays[index],
                  sendOrgTime: sendOrgTimeArrays[index],
                }
                this.recyclesTableData.push(datasArrays)
                // this.recyclesTableDataIds.push(datasArrays.senOrgId)
                // this.recyclesTableDataNames.push(datasArrays.sendOrgName)
              }
            }
            this.dataArray = this.recyclesTableData

            for (const index in sendHumanCodeArrays) {
              if (sendHumanCodeArrays[index]) {
                const datasArrays1 = {
                  sendHumanCode: sendHumanCodeArrays[index],
                  sendHumanName: sendHumanNameArrays[index],
                  sendHumanTime: sendHumanTimeArrays[index],
                }
                this.recyclesTableData1.push(datasArrays1)
                // this.recyclesTableDataIds1.push(datasArrays1.sendHumanCode)
                // this.recyclesTableDataNames1.push(datasArrays1.sendHumanName)
              }
            }
            this.dataArrays1 = this.recyclesTableData1

            this.orgOrDeptId = this.formData.drafOrgId //一级部门id
          }
        })
    },

    //清稿弹窗
    doClearDraft() {
      let that = this
      this.getFileInfo(that).then((res) => {
        if (res.state) {
          let data = that.$router.resolve({
            path: '/openAndSave_Word',
            query: {
              tanSun: '3',
              state: 'viewFile',
              id: this.formData.depInfoPubId,
              zhengWenState: 2,
              JYcode: that.$businessCode.fawglfj,
              multiTenancyId: that.formData.multiTenancyId,
              relativePath: res ? res.filePath : '',
              fileName: res ? res.fileName : '',
              cleanDraftFlag: false,
              showBtns: true,
              EditType: '1',
            },
          })
          window.open(data.href, '_blank')
        }
      })
    },
    //恢复清稿操作
    recoverClearDraft() {
      this.$api.pubInfo.checkBackups({ pdnId: this.formData.depInfoPubId }).then((res) => {
        this.formData.pubMainFilePath = res.data[1].mainFileName + ',' + res.data[1].mainFilePath
        this.save('1')
      })
    },
    //关闭
    close() {
      this.$intent.closeWindow(this)
    },
    // 保存
    save(val) {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (localStorage.getItem('bumenxinxi')) {
            let jinGeData = JSON.parse(localStorage.getItem('bumenxinxi'))
            this.formData.xksqFileName = jinGeData.fileName
            this.formData.xksqFilePath = jinGeData.filePath
            localStorage.removeItem('bumenxinxi')
          }
          this.departmentList.map((item) => {
            if (item.unitCode === this.formData.drafDepId) {
              this.oaUnitName = item.oaUnitName
            }
          })

          if (this.resData && this.resData.no && this.backNumFlag) {
            this.formData.briefNo = this.resData.no ? this.resData.no : ''
            this.formData.qiHao = this.deleteapplyCode
              ? this.deleteapplyCode
              : this.resData && this.resData.curMaxNo + ''
          }
          console.log(this.formData.jbNo, '1354')
          let jbN = this.formData.jbNo
          let fir = jbN.indexOf('第')
          let sec = jbN.indexOf('期')
          let las = Number(jbN.substring(fir + 1, sec))
          if (isNaN(las) === true) {
            this.$message({
              type: 'warning',
              message: '简报编号填写错误，请重新填写',
            })
            return true
          }
          this.formData.qiHao = las

          let noParams = {
            qihao: this.formData.qiHao,
            drafOrgId: this.formData.drafOrgId,
            jbNm: this.formData.jbNm,
          }
          // this.$api.paraMeter.NumberAffirm(noParams).then(res => {
          //   console.log(res, '获取res')
          // })
          this.formData.userType = 'systemManage'
          this.$api.pubInfo
            .getJbList(
              { depInfoPubId: this.$route.query.depInfoPubId, type: 'detail' },
              {
                PAGE_JUMP: 1,
                REC_IN_PAGE: 10,
              }
            )
            .then((res) => {
              this.noPar = res.data.page[0].jbNo
              console.log(this.noPar, '前流水号')
              if (this.noPar === jbN) {
                this.$api.pubInfo.getJbDetail(this.formData).then((res) => {
                  if (res.code == 'SUCCESS') {
                    this.$message({
                      message: '成功',
                      type: 'success',
                    })
                    this.formData = res.data
                    localStorage.setItem('row', JSON.stringify(this.formData))
                    // this.clqx1()
                    //流程等于空
                    if (
                      this.formData.processInstId == '' ||
                      this.formData.processInstId == undefined
                    ) {
                      this.getStartprocess()
                    }
                    //存在流程id
                    if (this.formData.processInstId) {
                      if (this.processISOr == true) {
                        let clhjList = {}
                        clhjList.curTplNo = this.formData.pTplNo
                        clhjList.curNodeId = this.formData.curNodeCode
                        clhjList.curMultiTenancyId = this.formData.multiTenancyId
                        this.$api.pubInfo.clHj(clhjList).then((res) => {
                          this.dialogState = true
                          this.$nextTick(() => {
                            this.seletOptionsData = res.list
                          })
                        })
                      }
                    }
                  }
                })
              } else {
                this.$api.paraMeter.AdminExmine(this.formData).then((res) => {
                  if (res.code == 'SUCCESS') {
                    this.$message({
                      message: '成功',
                      type: 'success',
                    })
                    this.formData = res.data
                    localStorage.setItem('row', JSON.stringify(this.formData))
                    // this.clqx1()
                    //流程等于空
                    if (
                      this.formData.processInstId == '' ||
                      this.formData.processInstId == undefined
                    ) {
                      this.getStartprocess()
                    }
                    //存在流程id
                    if (this.formData.processInstId) {
                      if (this.processISOr == true) {
                        let clhjList = {}
                        clhjList.curTplNo = this.formData.pTplNo
                        clhjList.curNodeId = this.formData.curNodeCode
                        clhjList.curMultiTenancyId = this.formData.multiTenancyId
                        this.$api.pubInfo.clHj(clhjList).then((res) => {
                          this.dialogState = true
                          this.$nextTick(() => {
                            this.seletOptionsData = res.list
                          })
                        })
                      }
                    }
                  }
                })
              }
            })
        } else {
          this.$message.warning('请确认表单完整性')
        }
      })
    },
    //启动流程
    getStartprocess(val) {
      this.$api.pubInfo.qdlc(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          /* this.$message({
            message: '启动流程成功',
            type: 'success',
          }) */
          this.formData = res.data
          top.location =
            window.location.href.split('?')[0] + '?' + 'depInfoPubId=' + res.data.depInfoPubId
          if (this.processISOr == true) {
            let clhjList = {}
            clhjList.curTplNo = res.data.pTplNo
            clhjList.curNodeId = res.data.curNodeCode
            clhjList.curMultiTenancyId = res.data.multiTenancyId
            this.$api.pubInfo.clHj(clhjList).then((res) => {
              this.dialogState = true
              this.$nextTick(() => {
                this.seletOptionsData = res.list
              })
            })
          }
        }
      })
    },
    //打开金格文档申请跳转
    doDraft(fileInfo) {
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
    // 处理正文
    disposeText() {
      this.writeApply('chuli')
      this.ifView = 2
    },
    //查看正文
    checkText() {
      this.writeApply('cakan')
      this.ifView = 0
    },
    writeApply(flag) {
      if (this.formData.pubMainFilePath) {
        if (flag === "chuli") {
          this.ifView = 2;
        } else if (flag === "cakan") {
          this.ifView = 0;
        }
        this.shiwuState = 'viewFile'

        let bank_doDownloadFile = { function: 'doDownloadFile' }
        const pathArrays = this.formData.pubMainFilePath.split(',')
        bank_doDownloadFile.fileName = pathArrays[0]
        bank_doDownloadFile.filePath = pathArrays[1]

        this.$post
          .postData('doDownloadFile', JSON.stringify(bank_doDownloadFile), 'A0846C071')
          .then((res) => {
            if (res) {
              res.ifView = this.ifView;
              res.flag = flag
              this.doDraft(res)
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                offset: 400,
                message: '下载失败',
                duration: 500,
              })
            }
          })
      } else {
        this.$message({
          message: '暂无正文模板',
          type: 'warning',
        })
      }
    },
    //简报名称下拉
    jbNmchange(val) {
      if (val) {
        this.departmentListJb.map((item) => {
          if (item.tpyeNo === val) {
            this.newjbName = item.jbNm
            this.newbianHao = item.tpyeNo
          }
        })
        this.formData.jbNo = this.newjbName + '〔' + new Date().getFullYear() + '〕' + '第期'
        this.formData.jbNm = this.newjbName
        this.formData.bianHao = this.newbianHao
      }
    },
    // 转换日期
    transitionDate(dataString) {
      if (dataString) {
        let date = new Date(dataString)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      } else {
        return ''
      }
    },
    //起草通过本地储存获取简报数据
    jbNmmethod(value1, value2) {
      //获取简报名称下拉内容   参数value1当前机构united value2是配置文件的部门id
      this.$api.pubInfo
        .getInfoList({
          parentUnitId: value1,
          unitId: value2,
        })
        .then((res) => {
          this.departmentListJb = res.data
          this.formData.jbNm = res.data[0].jbNm
          this.formData.jbNo = res.data[0].jbNm + '〔' + new Date().getFullYear() + '〕' + '第期'
          this.formData.bianHao = res.data[0].tpyeNo
        })
    },
    //获取当前日期
    getcurrtDate(val) {
      let date = new Date()
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      return Y + M + D
    },
    isShouhui() {
      let loginNm = JSON.parse(localStorage.getItem('userInfo')).humanCode
      if (loginNm == this.formData.curUserid) {
        this.FEIbuttonList[7].show = true
        this.FEIbuttonList[6].show = true
      } else {
        this.FEIbuttonList[7].show = false
        this.FEIbuttonList[6].show = false
      }
    },
  },
  created() {
    this.getFileList()
    if (this.$route.query.type == '01') {
      this.FEIbuttonList[4].show = true
      this.FEIbuttonList[3].show = false
      this.FEIbuttonList[2].show = true
      this.FEIbuttonList[6].show = false //流程调度
      this.FEIbuttonList[7].show = false //流程调度
    } else if (this.$route.query.type == '02') {
      this.FEIbuttonList[6].show = true
      this.FEIbuttonList[2].show = true
      this.FEIbuttonList[7].show = true
    } else if (this.$route.query.type == '03') {
      this.FEIbuttonList[12].show = true //维护
      this.FEIbuttonList[10].show = true //打印处理单
      this.FEIbuttonList[13].show = true //流程调度
      this.FEIbuttonList[6].show = false //流程调度
      this.FEIbuttonList[11].show = true //流程调度
    } else if (this.$route.query.type == '04') {
        this.FEIbuttonList[0].show = false
        this.FEIbuttonList[2].show = true
        this.FEIbuttonList[12].show = true
        this.FEIbuttonList[9].show = true
        this.FEIbuttonList[11].show = true
        this.FEIbuttonList[10].show = true
        this.FEIbuttonList[8].show = true
    }
    if (this.$route.query.depInfoPubId) {
      this.$api.pubInfo
        .getJbList(
          { depInfoPubId: this.$route.query.depInfoPubId, type: 'detail' },
          {
            PAGE_JUMP: 1,
            REC_IN_PAGE: 10,
          }
        )
        .then((res) => {
          this.formData = Object.assign({},this.formData,res.data.page[0])
          let loginNm = JSON.parse(localStorage.getItem('userInfo')).humanName
          console.log(loginNm)
          console.log(this.formData.supUsernm)
          console.log(this.formData.curUsernm)
          if (this.$route.query.type == '01') {
            if (
              loginNm == this.formData.supUsernm &&
              this.formData.curUsernm !== this.formData.supUsernm &&
              this.formData.pubStaut !== '已发布' &&
              this.formData.haveRead == '0'
            ) {
              this.FEIbuttonList[4].show = true
            } else {
              this.FEIbuttonList[4].show = false
            }
          }

          // haveRead
          console.log(this.formData.remark1, '获取remark1')
          this.noPar = res.data.page[0].jbNo
          let numberNum = ''
          if (this.formData.jbNo) {
            numberNum = this.formData.jbNo
          } else {
            numberNum = ''
          }
          this.num = numberNum + this.formData.topTitle + '信息发布单'
          // console.log(this.formData)
          this.selsecOrgOrDeptId = this.formData.drafOrgId
          this.recycleLoadData()
          //是否收回、增发
          if (this.$route.query.type == '02') {
            this.isShouhui()
          }
          this.dataqc.pcsAvyId = res.data.page[0].curNodeCode //当前节点id
          this.dataqc.pcsTpId = res.data.page[0].pTplNo
          //返回签发意见 审核意见 备注
          this.$api.pubInfo.backData({ pubId: this.formData.depInfoPubId }).then((res) => {
            this.backList = res.list
          })
          this.isAlldisabled = true
          //简报下拉数据根据当前机构核部门进行请求
          // 判断 在 不办结时调用这个接口
          if (!(this.$route.query.type == '02' || this.$route.query.type == '04')) {
            this.$api.pubInfo
              .getInfoList({
                parentUnitId: this.formData.drafOrgId,
                unitId: this.formData.drafDepId,
              })
              .then((res) => {
                this.departmentListJb = res.data
              })
          }
          //收回发布按钮超过三天隐藏
          let shfbcurrDate = this.formData.pubTime.replace(/-/g, '')
          let shfbcurrDateDay = this.getcurrtDate().replace(/-/g, '')
          if (Number(shfbcurrDateDay) - Number(shfbcurrDate) > 3) {
            this.FEIbuttonList[7].show = false
          }
        })
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.scope {
  display: block;
  resize: vertical;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #000;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  background-color: #e4e7ed52 !important;
}
.scope .box {
  width: 11%;
  padding: 5px 15px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.scope .box_1 {
  width: 100%;
  border-bottom: 1px solid #fff;
  padding: 5px 0;
  padding-left: 11%;
  min-height: 42px;
}
.box_2 {
  border-bottom: 0px !important;
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
// .adviceInfo {
//   position: absolute;
//   width: 100%;
//   right: 20px;
//   bottom: 0;
//   text-align: right;
//   color: #606266;
// }
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
  content: '';
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
// .adviceInfo {
//   position: absolute;
//   width: 95%;
//   bottom: 0;
//   text-align: right;
//   color: #606266;
// }

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
}.adviceInfo {
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

/deep/.radio-form .el-radio {
  margin: 10px;
}

/deep/.zhusong .el-textarea__inner,
/deep/.chaosong .el-textarea__inner {
  min-height: 31px !important;
}
</style>
