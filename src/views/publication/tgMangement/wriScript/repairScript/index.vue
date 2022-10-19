<template>
  <div class="qcDetail">
    <div class="headerClick">
      <!-- 深拷贝递归的赋值新对象中的所有值或属性，而拷贝只赋值引用 -->
      <div class="right">
        <el-button plain size="mini" @click="closeBtn('关闭')">关闭</el-button>
        <el-button v-for="(item,index) in FEIbuttonList" @click="closeBtn(item.name)" :key="index" v-show="item.show" size="mini" plain :disabled="isSongshenhe">{{item.name}}</el-button>
        <el-button plain size="mini" v-show="csBtn" @click="closeBtn('收回')" :disabled="isSongshenhe">收回</el-button>
        <!-- <el-button plain size="mini" v-show="csBtn" @click="closeBtn('催办')" :disabled="isSongshenhe">催办</el-button> -->
      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">{{drafOrgNmTg}}信息稿件处理单</div>
    </div>
    <div class="process_content">
      <div class="bank_dispach_content" id="bank_dispach_content">
        <div class="cur_box">
          <div class="cur_sess">
            <p v-show="linkIsHide">
              当前环节：
              <span>{{pubStautList}}</span>
            </p>
            <p v-show="linkIsHide">
              当前处理人：
              <span>{{formData.curUsernm}}</span>
              <!-- 加一级部门 -->
              <!-- <span>{{drafDepNm}}-{{formData.curUsernm}}</span> -->
            </p>
            <p style="float:right">
              稿件状态：
              <span>{{this.cyStaut}}</span>
            </p>
          </div>
        </div>
        <el-form ref="ruleForm" :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿刊物" prop="pubNm">
                <el-select @change="changePubMg" v-model="pubNmList" style="width:100%" placeholder="请选择" :disabled="readFields.pubNm">
                  <el-option v-for="item in options" :key="item.value" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投稿栏目" prop="colNm">
                <el-select ref="select" @click.native="changePubColumnNm" v-model="formData.colNm" style="width:100%" placeholder="请选择" :disabled="readFields.colNm">
                  <el-option v-for="item in options2" :key="item.value" :label="item.value" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿单位" prop="drafOrgNm">
                <el-select @change="changePubMg" v-model="formData.drafOrgNm" style="width:100%" placeholder="请选择" :disabled="true">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投稿部门" prop="drafDepNm">
                <el-select ref="select" @change="changeDrafDepNm" v-model="formData.drafDepNm" style="width:100%" placeholder="请选择" :disabled="readFields.drafDepNm">
                  <el-option v-for="item in optionsDrafDepNm" :key="item.value" :label="item.shortFirstUnitName" :value="item.shortFirstUnitName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="拟稿人" prop="drafUnm">
                <el-input placeholder="拟稿人" v-model="formData.drafUnm" :disabled="readFields.drafUnm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input onkeyup="value=value.replace(/[^\-\,\d\*\ ]/g, '')" v-model="formData.phone" :disabled="readFields.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="拟稿日期" prop="drafTime">
                <el-date-picker :disabled="readFields.drafTime" style="width:100%" v-model="formData.drafTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title" :disabled="readFields.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="editedIdeaFields.auditOpinions == true && auditOpinionsList.length>0 ? false : true">
            <el-col :span="24">
              <el-form-item>
                <el-radio-group v-model="formData.pubIsShow" @change="pubIsShow" :disabled="editedIdeaFields.choosePubIsShow">
                  <el-radio label="0">同意</el-radio>
                  <el-radio label="1">不同意</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="审核意见" prop="auditOpinions">
                <el-input v-if="editedIdeaFields.auditOpinions == true && auditOpinionsList.length>0 ? false : true" type="textarea" @focus="audFocus" @blur="audBlur" v-model="formData.auditOpinions" :disabled="editedIdeaFields.auditOpinions"></el-input>
                <div class="opinionTbody" v-if="auditOpinionsList.length>0 ? true : false" style="margin-bottom: 10px;margin-top: 10px">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <div class="lineContent" v-for="item in auditOpinionsList" :key="item.id" >
                          <div>{{item.opinionText}}</div>
                          <div class="adviceInfo">
                            {{item.depnm}}
                            <span class="pad_lr10">{{item.unm}}</span>
                            <br>
                            {{timeAuditOpinionsList(item.opinionTime)}}
                          </div>
                        </div>
                        <!-- {{item.optionText}} -->
                        <!-- <el-input type="textarea" :value="item.opinionText" :disabled="true" :autosize="{minRow:5,maxRow:15}" class="d_f1"></el-input> -->
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <i v-show="!editedIdeaFields.auditOpinions" @click="campileIcon('repairScript')" class="el-icon-edit" style="font-size: 19px;line-height: 35px;margin-left: 15px;"></i>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="23">
              <el-form-item label="">
                <div v-for="item in auditOpinionsList" :key="item.id" style="margin-bottom: 10px;margin-top: 10px">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <el-input type="textarea" :value="item.opinionText" :disabled="true" :autosize="{minRow:5,maxRow:15}" class="d_f1"></el-input>
                        <div class="adviceInfo">
                          {{item.depnm}}
                          <span class="pad_lr10">{{item.unm}}</span>
                          <br>
                          {{timeAuditOpinionsList(item.opinionTime)}}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row> -->

        </el-form>
      </div>
      <!-- 审核意见 -->
      <appendWriteList :offenDevices="offenDevices" ref="writelist" v-show="appendWriteDialog" @childsaveselect="writelistvalue" @addCommonUse="addCommonUse" @deleId="deleteMassage"></appendWriteList>
      <!-- 选择机构树 -->
      <org-tree v-model="showOrgTree" :title="titleTree" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList"></org-tree>
      <!-- 选择审核人员树 -->
      <select-person v-dialogDrag :singelCheckF="singelCheckFSendObject" :treeData="treeDataSendObject" :fromdata="formData" :loadingTree="loadingTreeSendObject" :seletOptionsData="seletOptionsDataSendObject" :offenUse="offenUse" :dialogType="dialogTypeSendObject" :dialogTypeNow="dialogTypeNowSendObject" dialogTit="选择人员" :checkIds="checkIdsSendObject" :checkData="checkDataSendObject" :dialogState="dialogState" @showCompDialog="showCompDialogSendObject" :hasRadio="hasRadioSendObject"></select-person>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from 'components/tree/orgTree'
import selectPerson from 'components/tree/treeTansun'
// import selectPerson from 'components/tree/tree-fawen'
import appendWriteList from 'components/viewFlow/perWrit'
import dateFormate from '@/util/filters.js'
import minixs from '@/minixs/index'
import exportTable from '@/minixs/exportTableQueryScript'
import viewDraft from "@/minixs/viewDraft";
import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: 'qcDetail',
  components: {
    selectPerson,
    orgTree,
    appendWriteList,
  },
  mixins: [minixs, exportTable,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data() {
    return {
      uid: '', //表单id
      num: '',
      tcHumanRoles:'', //是否返回上一人
      auditOpinionsLs: '',
      orgId: JSON.parse(localStorage.getItem('userInfo')).currUnitId,
      curUseridLength: Number, //不是0的情况当前处理人和当前登录人是一样的
      csBtn: false,
      auditOpinionsList: [],
      linkIsHide: true, //当前环节和当前处理人是否显示
      byaudop: '',
      isSongshenhe: false,
      pubStautList: '撰稿',
      rules: {},
      cyStaut: '',
      checkOrg: false,
      offenUse: true,
      xjzw: 'true',
      clickXjzw: 'false',
      toug: 'false',
      itemTable: JSON.parse(localStorage.getItem('userInfo')).unitName,
      offenDevices: [], //常用批语展示数据
      appendWriteDialog: false, //常用批语
      clickTypes: '', //常用批语类型
      isShow: false,
      treeDataSendObject: [], //人员数（常用发送对象）
      loadingTree: true,
      loadingTree1: true,
      loadingTreeSendObject: true,
      hasRadioSendObject: false,
      objChangePubColumnNm: Object, //刊物对象
      options2: [],
      dialogTypeSendObject: 'dosend',
      seletOptionsDataSendObject: [],
      dialogTypeNowSendObject: 'next',
      pubNmList: '', //临时部门
      audit: '', //审核人员
      checkIdsSendObject: [],
      checkDataSendObject: [],
      singelCheckFSendObject: true,  // 是否多选
      verifyData: Boolean,
      dialogState: false,
      titleTree: '选择机构',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
      shiwuState: 'newFile',
      ele: {},
      FEIbuttonList: [
        { name: '保存并关闭', type: 'Saveandclose', show: false },
        { name: '保存', type: 'Save', show: false },
        { name: '新建正文', type: 'Newzheng', show: false },
        { name: '处理正文', type: 'Chulizw', show: false },
        { name: '查看正文', type: 'ckzw', show: false },
        { name: '删除此文', type: 'sccw', show: false },
        { name: '送审核', type: 'Songshenhe', show: false },
        { name: '投稿', type: 'Toug', show: false },
        { name: '退撰稿人', type: 'Tuigr', show: false },
        { name: '打印处理单', type: 'printHandleNote', show: false },
        { name: '收藏', type: 'collection', show: false },
      ],
      ifView: Number,
      saveCleanFile: false,
      name: '',
      phoneno: false,
      loginNm: JSON.parse(localStorage.getItem('userInfo')).humanName,
      drafDepNm: JSON.parse(localStorage.getItem('userInfo')).firstUnitName,
      drafOrgNmTg:'',//特殊表头
      formData: {
        PCSAVYID: '',
        PTPLNO: '',
        pubMgId: '', //刊物id
        pubNm: '', //刊物名称
        gId: '', //稿件id
        nextHumanId: '', //下一处理人Id
        nextHumanNm: '', //下一处理人name
        nextPcsNodeID: '', //下一环节id
        nextPcsNodeNM: '', //下一环节name
        title: '', //标题
        colId: '', //栏目id
        colNm: '', //栏目名称
        drafDepId: '', //拟稿部门id
        drafDepNm: '', //拟稿部门名称
        drafOrgId: '', //拟稿所属机构id
        drafOrgNm: '', //拟稿所属机构name
        drafUid: '', //拟稿人id
        drafUnm: '', //拟稿人名称
        assessOpinions: '', //评审意见
        zukanOpinions: '', //组刊意见
        auditOpinions: '', //	审批意见
        pubIsShow: '',
        processInstId: '', //	流程实例Id
        pTplNo: '', //	流程模板Id
        supUserid: '', //	上一个处理人id
        supUsernm: '', //	上一个处理人name
        curPcsAvyId: '', //	当前活动Id
        curNodeCode: '', //	当前环节id
        curNodeName: '', //	当前环节name
        curUserid: '', //	当前处理人id
        curUsernm: '', //	当前处理人name
        supNodeCode: '', //	上一环节id
        pubMainFilePath: '', //	正文附件地址
        caiyongOrgId: '', //	采用机构id
        caiyongOrgNm: '', //	采用机构名称
        grade: '', //	最新评分
        startDate: '', //	投稿查询起始时间
        endDate: '', //投稿查询结束时间
        drafTime: ''
          ? dateFormate.date(Date.parse(new Date()), 'YYYY-MM-DD')
          : dateFormate.date(Date.parse(new Date()), 'YYYY-MM-DD'), //投稿时间
        editTime: '', //编辑时间
        pubStaut: '', //投稿状态
        phone: '',
        curUserDeptId: this.$route.query.currUnitId, //	当前用户真实部门id  currUnitId
        curUserHumanId: '', //	当前用户humanid
        remark1: '', //	备用字段1
        remark2: '', //	备用字段2
        remark3: '', //	备用字段3
        remark4: '', //	备用字段4
        supUserDeptId: '', //	上一用户真实部门id
        supUserHumanId: '', //	上一用户humanid
      },
      //可编辑意见域
      editedIdeaFields: {
        auditOpinions: true, //签发意见
        choosePubIsShow: true,
      },
      //必填意见域
      requiredIdeaFields: {
        auditOpinions: '', //签发意见
      },
      //不可编辑控制域
      readFields: {
        pubNm: false, //投稿刊物
        drafOrgNm: false, //投稿单位
        drafDepNm: false, //投稿部门
        drafUnm: false, //投稿人
        phone: false, //手机
        drafTime: false, //拟稿日期
        colNm: false, //投稿栏目
        titleDis: false, //标题
        choosePubIsShow: false, //意见
        auditOpinions: false, //详细意见
      },
      //必填控制域
      requiredFields: {
        pubNm: '', //投稿刊物
        colId: '', //投稿栏目
        drafOrgNm: '', //投稿单位
        drafDepNm: '', //投稿部门
        drafUnm: '', //投稿人
        phone: '', //手机
        drafTime: '', //拟稿日期
        title: '',
      },
      input: '',
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      options1: [],
      optionsDrafDepNm: [],
      huanJieMessage: {},
      label: '',
    }
  },
  watch: {
    'formData.auditOpinions'() {
      if (this.formData.auditOpinions == '') {
        this.formData.pubIsShow = []
      }
    },
  },
  methods: {
    // 审核意见时间处理
    timeAuditOpinionsList(e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + '  '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    // 投稿部门下拉框
    changeDrafDepNm(e) {
      let obj = {}
      obj = this.optionsDrafDepNm.find((item) => {
        return item.shortFirstUnitName === e
      })
      this.formData.drafDepId = obj.firstUnitId
    },
    audFocus() {
      console.log(222)
      if (this.formData.auditOpinions === '同意' || this.formData.auditOpinions === '不同意') {
        console.log('添加逗号')
        this.formData.auditOpinions = this.label + ','
      }
    },
    audBlur() {
      if (this.formData.auditOpinions === '同意,' || this.formData.auditOpinions === '不同意,') {
        console.log('添加逗号')
        this.formData.auditOpinions = this.label
      }
    },
    //意见选择
    pubIsShow(index) {
      if (index === '0') {
        this.label = '同意'
      } else {
        this.label = '不同意'
      }
      if (this.formData.auditOpinions) {
        let array = this.formData.auditOpinions.split(',')
        if (
          (array.length == 1 && this.formData.auditOpinion == '同意') ||
          this.formData.auditOpinion == '不同意'
        ) {
          array.splice(0, 0, this.label)
        } else {
          if (array[0] == '同意' || array[0] == '不同意') {
            array.splice(0, 1, this.label)
          } else {
            array.splice(0, 0, this.label)
          }
        }
        this.formData.auditOpinions = array.join(',')
      } else {
        this.$set(this.formData, 'auditOpinions', this.label + '')
      }
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case 'repairScript':
          this.$set(
            this.formData,
            'auditOpinions',
            this.formData.auditOpinions ? this.formData.auditOpinions + ',' + data : data
          )
          break
      }
    },
    //新增批语
    addCommonUse(data) {
      this.$api.paraMeter
        .perWritingCr({
          hyDnr: data,
        })
        .then((res) => {
          if (res.code == 'SUCCESS') {
            this.$api.paraMeter.perWritingSe({}).then((res) => {
              this.offenDevices = res.data
            })
          }
        })
    },
    //删除批语
    deleteMassage(data) {
      this.$api.paraMeter
        .perWritingDe({
          id: data,
        })
        .then((res) => {
          if (res.code == 'SUCCESS') {
            this.$api.paraMeter.perWritingSe({}).then((res) => {
              this.offenDevices = res.data
            })
          }
        })
    },
    // 选择刊物
    changePubMg(e) {
      this.pubNmList = e
      var list = e.replace('(上级行)', '')
      let obj = {}
      obj = this.options1.find((item) => {
        return item.pubNm === list
      })
      console.log(obj)
      this.objChangePubColumnNm = obj
      this.formData.pubNm = list
      this.formData.pubMgId = obj.pubMgId
      this.formData.remark2 = obj.creatOrgId
      // 重新选择刊物时置空投稿栏目
      this.formData.colNm = ''
    },
    // 选择栏目
    changePubColumnNm() {
      if (this.formData.pubNm) {
        this.options2 = this.objChangePubColumnNm.pubColumnNm.split(',')
      } else {
        this.$message({
          message: '请先选择投稿刊物',
          type: 'warning',
          duation: 1000,
        })
        this.$refs.select.blur()
      }
    },
    // 点击编辑的图标
    campileIcon(type) {
      this.$api.paraMeter.perWritingSe({}).then((res) => {
        this.offenDevices = res.data
      })
      this.clickTypes = type
      this.appendWriteDialog = true
      this.$nextTick(() => {
        this.$refs.writelist.openDialog()
      })
    },
    //常用发送对象选人成功
    showCompDialogSendObject(data, status, type, params, dtype) {
      this.dialogState = false
      switch (dtype) {
        case 'next':
          this.next(data, params)
          break
      }
    },
    //送审核选择人
    next(data, params) {
      console.log(params)
      let names = [],
        ids = [],
        code = [],
        nextId = []
      data.forEach((item) => {
        names.push(item.name)
        ids.push(item.idStr)
        nextId.push(item.id.split('#')[1])
      })
      this.audit = names.join(',')
      if (this.audit !== '') {
        this.formData.nextHumanId = ids.join(',')
        // this.formData.nextHumanCode = code.join(',')
        this.formData.nextHumanNm = names.join(',')
        this.formData.nextDeptId = nextId.join(',')
        this.formData.nextPcsNodeID = params.id
        this.formData.nextPcsNodeNm = params.name
        this.formData.PCSAVYID = params.id ? params.id : ''
        this.formData.PTPLNO = this.seletOptionsDataSendObject[0].PTPLNO
          ? this.seletOptionsDataSendObject[0].PTPLNO
          : ''
        this.formData.AVYNODENM = params.name ? params.name : ''
        this.$api.paraMeter.ManuscriptSendSecond(this.formData).then((res) => {
          this.isSongshenhe = true
          this.$message({
            type: 'success',
            offset: 50,
            message: '成功送交' + this.audit + '用户',
          })
          this.$intent.closeWindow(this)
          this.messageWarn(data[0].idStr)
        })
      }
    },
    //微信消息提醒
    messageWarn(userId) {
      this.$api.meeting
        .infoRemind({
          userId: userId, //完成并发送选择的人员用户ID（humanID)
          productCode: 'meiRDT', //项目编号（对应字典（提醒项目分类））
          urgentType: '', //紧急程度（部分功能有）
          infoType: '信息刊物每日动态', //类型（模块名称中文（例如 收文，发文））
          infoTitle: this.formData.drafOrgNm + '信息稿件处理单', //业务标题
          infoUser: this.formData.curUsernm, //当前操作人名称
          pcUrl: location.hash.replace('#/',''),
          instId: this.$route.query.rowData
        })
        .then((res) => {
          console.log(res, '获取返回数据--wx消息提醒')
        })
        .catch((err) => {})
    },
    // 消息提醒
    // messageLogging() {
    //   let fok = {
    //     userId: JSON.parse(localStorage.getItem('userInfo')).humanId, //用户ID（humanCode）
    //     productCode: 'cuiB', //项目编号（对应字典（提醒项目分类））
    //     urgentType: '', //紧急程度（部分功能有）
    //     infoType: '信息刊物每日动态', //类型（模块名称中文（例如 收文，发文））
    //     infoTitle: this.itemTable + '信息稿件处理单', //业务标题
    //     infoUser: this.formData.drafUnm, //提交人（起草人）
    //   }
    //   this.$api.paraMeter.messageLogging(fok).then((res) => {
    //     if (res.code == 'SUCCESS') {
    //       console.log(res, '获取返回数据--消息提醒')
    //     }
    //   })
    // },
    workText() {
      if (this.formData.pathName) {
        this.shiwuState = 'viewFile'
        let bank_doDownloadFile = { function: 'doDownloadFile' }
        bank_doDownloadFile.fileName = this.formData.pathName
        bank_doDownloadFile.filePath = this.formData.pubMainFilePath
          this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
            .then(res => {
            if (res) {
              res.ifView = 1
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
    //申请跳转
    doDraft(fileInfo) {
      let Path= getMachineType() ? "/openAndSave_WordTs" : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: Path,
        query: {
          state: this.shiwuState,
          id: this.formData.gId,
          tanSun: '2',
          zhengWenState: this.ifView,
          JYcode: 'A0846C002',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '测试.doc',
          multiTenancyId: '000076767qwq0',
          showBtns: true,
          saveCleanFile: this.saveCleanFile,
          serverUrl: '128.192.221.164',
          saveNameAndNumber: this.num
        },
      })
      this.$forceUpdate()
      var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
    //新建正文
    viewApply() {
      if (!this.formData.gId) {
        this.$api.paraMeter.ManuscriptSave(this.formData).then((res) => {
          let Path= getMachineType() ? "/openAndSave_WordTs" : "openAndSave_Wps_Tansun";
          let data = this.$router.resolve({
            path: Path,
            query: {
              state: 'newFile',
              id: res.data.gId,
              tanSun: '2',
              zhengWenState: 1,
              JYcode: 'A0846C002',
              relativePath: '',
              fileName: '',
              multiTenancyId: '000076767qwq0',
              showBtns: true,
              serverUrl: '128.192.221.164',
              saveNameAndNumber: this.num
            },
          })
          this.$forceUpdate()
          var one = data.href.split('?')[0]
          var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
          window.open(newPath, "_blank")
          // window.open(data.href, '_blank')
          this.$intent.replace(this, {
            name: 'repairScript',
            query: { rowData: res.data.gId },
          })
          this.xq()
        })
      } else {
        let data = this.$router.resolve({
          path: '/openAndSave_WordTs',
          query: {
            state: 'newFile',
            id: this.formData.gId,
            tanSun: '2',
            zhengWenState: 1,
            JYcode: 'A0846C002',
            relativePath: '',
            fileName: '',
            multiTenancyId: '000076767qwq0',
            showBtns: true,
            serverUrl: '128.192.221.164',
            saveNameAndNumber: this.num
          },
        })
        this.$forceUpdate()
        window.open(data.href, '_blank')
      }
    },
    // 选择机构按钮方法
    getOrgList(org) {
      if (this.orgOrDeptId == '1') {
        this.$set(this.formData, 'drafOrgNm', org.unitName)
        this.$set(this.formData, 'drafOrgNmId', org.id)
      } else {
        let deptId = []
        let deptName = []
        org.map((item) => {
          deptId.push(item.id)
          deptName.push(item.unitName)
        })
        this.$set(this.formData, 'drafDepNm', deptName.join(','))
        this.$set(this.formData, 'drafDepNmId', deptId.join(','))
      }
    },
    // 选择机构按钮
    selectOrgNew() {
      this.title = '选择机构'
      this.isSingle = true
      this.orgOrDept = 1
      this.orgOrDeptId = '1'
      this.showOrgTree = true
    },
    // 选择部门按钮
    selectDepar() {
      if (!this.formData.drafOrgNm) {
        this.$message({
          message: '请先选择投稿单位',
          type: 'error',
        })
        return
      }
      this.title = '选择部门'
      this.isSingle = false
      this.orgOrDept = 0
      this.orgOrDeptId = this.formData.drafOrgNmId
      this.showOrgTree = true
    },
    configAll() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ) //必填控制域
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields) //不可编辑控制域
      this.FEIbuttonList = this.showButton(
        this.FEIbuttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ) //按钮
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ) //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ) //必填意见域
    },
    initRule() {
      this.rules = {
        pubNm: [
          {
            required: this.requiredFields.pubNm,
            message: '投稿刊物不能为空',
            trigger: 'change',
          },
        ],
        colNm: [
          {
            required: this.requiredFields.colNm,
            message: '投稿栏目不能为空',
            trigger: 'change',
          },
        ],
        drafOrgNm: [
          {
            required: this.requiredFields.drafOrgNm,
            message: '投稿单位不能为空',
            trigger: 'change',
          },
        ],
        drafDepNm: [
          {
            required: this.requiredFields.drafDepNm,
            message: '投稿部门不能为空',
            trigger: 'change',
          },
        ],
        drafUnm: [
          {
            required: this.requiredFields.drafUnm,
            message: '投稿人不能为空',
            trigger: 'change',
          },
        ],
        phone: [
          {
            required: this.requiredFields.phone,
            message: '联系电话不能为空',
            trigger: 'change',
          },
        ],
        drafTime: [
          {
            required: this.requiredFields.drafTime,
            message: '投稿日期不能为空',
            trigger: 'change',
          },
        ],
        title: [
          {
            required: this.requiredFields.title,
            message: '标题不能为空',
            trigger: 'change',
          },
        ],
        auditOpinions: [
          {
            required: this.requiredIdeaFields.auditOpinions,
            message: '审核意见不能为空',
            trigger: 'change',
          },
        ],
      }
    },
    //按钮
    closeBtn(params) {
      switch (params) {
        case '关闭':
          this.close()
          break
        case '保存并关闭':
          this.saveClose()
          break
        case '保存':
          this.save()
          break
        case '处理正文':
          this.ifView = 1
          this.saveCleanFile = false
          this.workText()
          break
        case '查看正文':
          this.lookBody()
          break
        case '新建正文':
          this.viewApply()
          break
        case '送审核':
          this.verify()
          if (this.verifyData) return this.sedAudit()
          break
        case '投稿':
          this.verify()
          if (this.verifyData) return this.contribute()
          break
        case '退撰稿人':
          this.verify()
          if (this.verifyData) return this.tuigr()
          break
        case '打印处理单':
          this.printProcessingList()
          break
        case '收回':
          this.takeBack()
          break
        case '催办':
          this.catelyze()
          break
        case '删除此文':
          this.deleteArticle()
          break
        case '收藏':
          this.collection()
          break
      }
    },
    collection(){
      exportTable.collect(this, this.$route.query.rowData, 'gId', 'A08462974')
    },
    lookBody(){
      let bank_doDownloadFile = { function: 'doDownloadFile' }
      let num = this.num
      bank_doDownloadFile.fileName = this.formData.pathName
      bank_doDownloadFile.filePath = this.formData.pubMainFilePath
      let id = this.formData.gId
      this.doDraftLook(id, bank_doDownloadFile, num)
    },
    // 删除此文
    deleteArticle(){
      let deleteArray = []
      const id =  this.$route.query.rowData
      this.$confirm('是否确定删除当前表单数据并退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if(id){
            deleteArray.push(id)
            console.log('有数据id删除这条数据')
            this.$api.paraMeter.ManuscriptListdel({ gIdArr: deleteArray }).then((res) => {
              if (res.code == 'SUCCESS') {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                })
                this.$intent.closeWindow(this)
              }
            })
          }else{
            console.log('没有数据id退出该页面')
            this.$intent.closeWindow(this)
          }
        })
          .catch(() => {
            console.log('点击取消')
          })
    },
    // 催办
    catelyze() {
      this.messageLogging()
    },
    //收回
    takeBack() {
      this.$api.paraMeter.takeBack(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            type: 'success',
            offset: 50,
            message: '成功收回',
          })
          this.$intent.closeWindow(this)
        } else if (res.code == 'fail') {
          this.$message({
            type: 'error',
            offset: 50,
            message: '审核人员已读，收回失败！',
          })
        }
      })
    },
    //送审核
    sedAudit() {
      this.$api.paraMeter.ManuscriptSave(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          console.log(res,this.formData,'获取送审和返回数据')
            if(this.tcHumanRoles == 'false' || this.formData.supUserNm == "" || this.formData.supUserNm == null){
          this.processAcquisition(res.data)
            }else{
                this.$confirm(
                  "是否返回" + this.formData.supUserNm + "?", "提示", {
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    type: "warning"
                  }
                )
                .then(() => {
                  console.log('点击确定--退回' + this.formData.supUserNm)
                  this.tuigr()
                })
                .catch(() => {
                  this.dialogState = true
                  this.processAcquisition(this.formData)
                })
            }
        }
      })
    },
    //投稿
    contribute() {
      this.$api.paraMeter.Manuscripttougao(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            type: 'success',
            message: '投稿成功!',
          })
          this.$intent.closeWindow(this)
        }
      })
    },
    //退撰稿人
    tuigr() {
      this.$api.paraMeter.ManuscriptSave(this.formData).then((res) => {
        let gid = this.$route.query.rowData ? this.$route.query.rowData : ''
        this.$api.paraMeter.ManuscriptTuigr({ gId: gid }).then((res) => {
          if (res.code == 'SUCCESS') {
            this.$message({
              type: 'success',
              offset: 50,
              message: '成功送交' + this.audit + '用户',
            })
            this.$intent.closeWindow(this)
          }
        })
      })
    },
    //打印处理单
    printProcessingList() {
      if (this.$route.query.rowData) {
        this.$intent.goNewPage(this, {
          path: '/xxgjcld',
          query: {
            rowData: this.$route.query.rowData,
            shortFirstUnitName: this.formData.drafDepNm,
            auditOpinions: this.formData.auditOpinions,
          },
        })
      } else {
        this.$message({
          type: 'error',
          message: '请先保存数据',
        })
      }
    },
    chehui() {
      this.$api.paraMeter.Manuscriptche({}).then((res) => {})
    },
    //获取刊物机构部门下拉数据
    loadData(){
      this.$api.paraMeter.PublicationManagementlist({ searchType: 'MyAndParent' }).then((res) => {
        this.options = res.data

        let arr = []
        let arr1 = []
        let ownerId = JSON.parse(localStorage.getItem('userInfo')).unitId

        this.options.forEach((item) => {
          if (item.pubTyp === '02' && item.creatOrgId !== ownerId) {
            arr.push(item.pubNm + '(上级行)')
          } else {
            arr1.push(item.pubNm)
          }
        })
        let list = [...arr, ...arr1]
        this.options = list

        this.options1 = res.data
      })
      this.$api.paraMeter.getDeptList({}).then((res) => {
        this.optionsDrafDepNm = res.result
      })
    },
    closeTrip() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            //点是
            this.saveClose()
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        },
      });
    },
    //关闭
    close() {
      if (this.formData.pubStaut === '04' || this.curUseridLength === 0) {
        this.$intent.closeWindow(this)
      } else {
        this.closeTrip()
      }
    },
    //保存并关闭
    saveClose() {
      this.$api.paraMeter.ManuscriptSave(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            type: 'success',
            message: '保存成功!',
          })
          this.$intent.closeWindow(this)
        }
      })
    },
    verify() {
      this.$refs['ruleForm'].validate((valid) => {
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
    //保存
    save() {
      this.formData.gId = this.$route.query.rowData ? this.$route.query.rowData : ''
      this.$api.paraMeter.ManuscriptSave(this.formData).then((res) => {
        if (res.code == 'SUCCESS') {
          this.$message({
            type: 'success',
            message: '保存成功!',
          })
          this.$intent.replace(this, {
            name: 'repairScript',
            query: { rowData: res.data.gId },
          })
          this.xq()
        }
      })
    },
    //获取控制域信息
    chooseField() {
      const code = {
        pcsTpId: this.formData.pTplNo ? this.formData.pTplNo : '',
        humanId: JSON.parse(localStorage.getItem('userInfo')).humanId,
        pcsAvyId: this.formData.curNodeCode ? this.formData.curNodeCode : '',
        multiTenancyId: 'CN023',
      }
      this.$api.paraMeter.AccessConfiguration(code).then((res) => {
        this.huanJieMessage = res.data
        this.configAll()
        this.initRule()
      })
    },
    //获取控制域信息无意间域校验
    chooseFieldNoInitRule() {
      const code = {
        pcsTpId: this.formData.pTplNo ? this.formData.pTplNo : '',
        humanId: JSON.parse(localStorage.getItem('userInfo')).humanId,
        pcsAvyId: this.formData.curNodeCode ? this.formData.curNodeCode : '',
        multiTenancyId: 'CN023',
      }
      this.$api.paraMeter.AccessConfiguration(code).then((res) => {
        this.huanJieMessage = res.data
        this.configAll()
      })
    },
    //投稿状态
    whetherShowSend() {
      this.formData.creatOrgId = JSON.parse(localStorage.getItem('userInfo')).unitId
      this.$api.paraMeter.ContributeDirectlyxz(this.formData).then((res) => {
        let chooseId = res.data.directRoleId //可直接投稿的岗位id
        let myId = JSON.parse(localStorage.getItem('tcHumanRole'))
        if (chooseId) {
          let myIdNumber = chooseId.map(Number)

          let array = []
          myId.forEach((item) => {
            array.push(item.dicId)
          })
          let fok = []
          for (let task of myIdNumber) {
            this.ele = array.find((item) => {
              return item === task
            })
            fok.push(this.ele)
          }
          let fuk = []
          for (let i = 0; i < fok.length; i++) {
            if (fok[i] == undefined) {
              fuk.push(i)
            }
          }
          if (fuk.length !== fok.length) {
            this.toug = 'true'
          } else {
            this.toug = 'false'
          }
        } else {
          this.toug = 'false'
        }
      })
    },
    pubPath() {
      // 正文是否存在
      if (this.formData.pubMainFilePath) {
        this.chooseField()
        this.xjzw = 'false'
        this.clickXjzw = 'true'
        this.whetherShowSend()
      } else {
        this.chooseField()
      }
    },
    reloadTree(list) {
      let that = this;
      this.formData.pcsAvyId = list[0].PCSAVYID;
      // this.$nextTick(() => {
        let PCSAVYIDs=[];
        this.seletOptionsDataSendObject = list.filter(item=>{
          if(!PCSAVYIDs.includes(item.PCSAVYID)){
            PCSAVYIDs.push(item.PCSAVYID);
            return item;
          }
        })
        // this.seletOptionsDataSendObject = this.shoNextNode(this.seletOptionsDataSendObject, this.huanJieMessage.acyNodeNextBount)
      // })
      that.$set(that.formData, "function", "selWfNode");
      that.$set(that.formData, "curTplNo", that.seletOptionsDataSendObject[0].PTPLNO);
      that.$set(that.formData, "curMultiTenancyId", that.seletOptionsDataSendObject[0].MULTITENANCYID);
      that.$set(that.formData, "wfeUnitId", that.formData.drafOrgId);
      that.formData.pcsAvyId = that.seletOptionsDataSendObject[0].PCSAVYID;
      console.log(that.formData.pcsAvyId,'获取pcsAvyId',that.formData.function,'获取function',that.formData.curTplNo,'获取curTplNo',that.formData.curMultiTenancyId,'获取curMultiTenancyId',that.formData.wfeUnitId,'获取drafOrgId')
      that.$post
        .postData("selWfNode", JSON.stringify(that.formData), "A08462007")
        .then(res => {
          if (res.message == "Loading") {
            that.loadingTreeSendObject = true;
          } else {
            that.loadingTreeSendObject = false;
          }
          that.dialogState = true;
          that.treeDataSendObject = (res.data && res.data.data) || [];
          that.defaultUser = (res.data && res.data.defaultUser) || {};
        })
        .catch(e => {});
    },
    //获取流程
    processAcquisition(arr) {
      let clhjList = {}
      clhjList.curTplNo = this.formData.pTplNo
      clhjList.curNodeId = this.formData.curNodeCode
      clhjList.curMultiTenancyId = this.formData.multiTenancyId
      this.$api.pubInfo.clHj(clhjList).then((res) => {
        this.seletOptionsDataSendObject = res.list
      })

      // this.$api.paraMeter.processAcquisition(this.formData).then((res) => {
      //   // if (res.result.message == 'Loading') {
      //   this.dialogState = true
      //   this.$nextTick(() => {
      //     this.seletOptionsDataSendObject = res.list
      //   })
      //   // } else {
      //   //   this.dialogState = false
      //   // }
      // })
    },
    // 处理人和当前登录人不一样
    cdPeople() {
      this.readFields = {
        pubNm: true,
        colNm: true,
        drafOrgNm: true,
        drafDepNm: true,
        drafUnm: true,
        phone: true,
        drafTime: true,
        title: true,
      }
      this.editedIdeaFields.choosePubIsShow = true
      this.editedIdeaFields.auditOpinions = true
      this.FEIbuttonList[4].show = true
      this.FEIbuttonList[9].show = true
      this.FEIbuttonList[10].show = true
    },
    // 请求数据
    xq() {
      this.$api.paraMeter.Manuscriptxq({ gId: this.$route.query.rowData }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.uid = this.$route.query.rowData
          this.formData = res.data
          this.num = this.formData.title + '稿件处理单'
          console.log(this.num)
          this.tcHumanRoles = res.tcHumanRoles.isDirectBack
          let Jb = JSON.parse(localStorage.getItem('userInfo'))
          this.$api.pubInfo
            .getisorunitName({
              unitCode: res.data.drafDepId, //firstUnitId
            })
            .then((res) => {
              if (res.data.unitAndConfig.isSpecialHead == '0') {
                this.drafOrgNmTg = Jb.unitName //表头部门
              } else if (res.data.unitAndConfig.isSpecialHead == '1') {
                console.log(222, res.data.unitAndConfig.unitName )
                this.drafOrgNmTg = res.data.unitAndConfig.unitName //表头部门
              }
            })
            console.log(this.drafOrgNmTg)
          // this.drafOrgNmTg = Jb.unitName
          //
          this.auditOpinionsList = res.data.objectMap.auditOpinionsList
          this.pubNmList = this.formData.pubNm
          // 当前处理人是否是自己
          let humanId = JSON.parse(localStorage.getItem('unitInfo'))
          let arryHumanId = []
          humanId.forEach((item) => {
            arryHumanId.push(item.humanCode)
          })
          let curUserid = arryHumanId.filter((item) => {
            return item == this.formData.curUserid
          })
          this.curUseridLength = curUserid.length

          if (typeof curUserid === 'object') {
            // 收回和催办
            if (
              this.loginNm == this.formData.supUserNm &&
              this.formData.curUsernm !== this.formData.supUserNm &&
              this.formData.pubStaut !== '04' 
              && this.formData.haveRead == '0'
            ) {
              this.csBtn = true
            } else {
              this.csBtn = false
            }
            if (this.curUseridLength === 0) {
              console.log(this.formData.pubStaut, '获取pubStaut')
              console.log(this.formData.cyStaut, '获取cyStaut')
              if (this.formData.pubStaut == '04') {
                if (this.formData.cyStaut == '2') {
                  this.cyStaut = '已采用'
                } else {
                  this.cyStaut = '已投稿'
                }
                this.linkIsHide = false
              } else if (this.formData.pubStaut == '02') {
                this.pubStautList = '审签中'
                this.cyStaut = '未采用'
              }
              this.cdPeople()
            } else {
              // 稿件状态
              if (this.formData.cyStaut == '1') {
                this.cyStaut = '未采用'
              } else if (this.formData.cyStaut == '2') {
                this.cyStaut = '已采用'
              } else if (this.formData.cyStaut == '3') {
                this.cyStaut = '备选'
              }
              console.log(this.formData.pubStaut,'当前环节')
              // 当前环节
              switch (this.formData.pubStaut) {
                case '01':
                  this.pubStautList = '撰稿'
                  this.chooseField()
                  this.pubPath()
                  break
                case '02':
                  this.pubStautList = '审签中'
                  this.chooseField()
                  this.pubPath()
                  break
                case '04':
                  this.pubStautList = '已投稿'
                  this.readFields = {
                    pubNm: true,
                    colNm: true,
                    drafOrgNm: true,
                    drafDepNm: true,
                    drafUnm: true,
                    phone: true,
                    drafTime: true,
                    title: true,
                  }
                  this.FEIbuttonList[9].show = false
                  break
              }
              if (this.formData.curNodeName === '撰写稿件') {
                this.pubStautList = '撰稿'
              }
              // = this.formData.curNodeName
              // 电话数据处理
              this.formData.phone = this.formData.phone
                ? this.formData.phone.replace(/,/g, ' ')
                : ''
              // this.formData.auditOpinions = ''
            }
          }
        }
      })
    },
  },
  activated() {},
  created() {
    // 判断是否为详情条转
    if (this.$route.query.rowData) {
      this.xq()
      this.whetherShowSend()
    } else {
      this.chooseField()
      this.pubPath()
      //不是详情跳转获取登录人信息集合
      let Jb = JSON.parse(localStorage.getItem('userInfo'))
      let Kd = this.$route.query.shortFirstUnitName
      // 拟稿人赋值
      this.formData.drafUnm = this.formData.curUsernm = Jb.humanName
      this.name = Jb.humanName
      this.formData.drafUid = Jb.humanId
      this.formData.drafDepId = this.$route.query.currUnitCode
      this.formData.drafOrgId = Jb.unitId
      this.formData.phone = Jb.telMobile ? Jb.telMobile.replace(/,/g, ' ') : ''
      this.formData.drafDepNm = Kd //投稿部门
      this.formData.drafOrgNm = Jb.unitName
      this.cyStaut = '未采用'
      this.$api.pubInfo
        .getisorunitName({
          unitCode: this.$route.query.currUnitCode, //firstUnitId
        })
        .then((res) => {
          if (res.data.unitAndConfig.isSpecialHead == '0') {
            this.drafOrgNmTg = Jb.unitName //表头部门
          } else if (res.data.unitAndConfig.isSpecialHead == '1') {
            this.drafOrgNmTg = res.data.unitAndConfig.unitName //表头部门
          }
        })
    }
    this.loadData()
  },
  mounted() {},
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.opinionTbody{
  background-color: rgba(228,231,237,.32)!important;
  color: #000;
  padding: 5px 15px 5px 5px!important;
  border: 1px solid #e4e7ed!important;
  border-radius: 4px!important;
  margin-top: 5px;
}
.el-button--primary.is-plain.is-disabled {
  color: #409eff;
  background-color: #fff;
  border-color: #d9ecff;
}
.qcDetail {
  background: white;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-right: 130px;
      float: right;
    }
  }

  .qcHeader {
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

  .process_content {
    width: 80%;
    // min-height: 460px;
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
        padding-right: 40px;
        p {
          padding-right: 20px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 20px;
          float: left;
          span {
            color: #f9aa21;
          }
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
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
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
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.height_90 {
  height: 200px;
  margin-top: -200px;
}
.adviceInfo {
  font-size: 14px!important;
  line-height: 20px;
}
.lineContent {
    line-height: 24px;
    font-size: 14px;
    word-break: break-all;
    white-space: pre-line;
}
.pad_lr10 {
  padding-right: 0px;
}
</style>
