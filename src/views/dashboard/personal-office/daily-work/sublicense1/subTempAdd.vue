<template>
<!-- guyun.sc    是的话校验综合岗和部门领导岗；行秘书岗和行签发岗   可以起草

liguo.cd   判断是否是审计机构  判断是部门领导和行签发岗功能不能选择授权人       部门综合和行秘书岗登记能选择授权人 -->

  <div id="subTempAdd" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>授权处理单
        </p>
        <div class="grid_comtent">
          <el-button
            plain
            class="bank_grid_comtent_active"
            size="small"
            @click="closeHandler = true"
          >关闭</el-button>
          <!-- <el-button plain size="small" v-if="!fromdata.authStatusName||fromdata.authStatusName == '未启用' " @click="submitForm('save')">保存</el-button> -->
          <el-button plain size="small" v-if="fromdata.edit && !todoOpen" @click="preserve">保存</el-button>
          <el-button plain size="small" v-if="bank_dispach.id" @click="shoucang()">收藏</el-button>

          <el-button
            plain
            size="small"
            v-show="fromdata.sendButtonView&&flag&&fromdata.authStatus != '4'&&fromdata.authStatus != '3'&&fromdata.authStatus != '2' && !todoOpen"
            @click="sendButton()"
          >发送</el-button>
          <el-button
            plain
            size="small"
            v-if="fromdata.authStatus =='0'&&flag&&fromdata.id&&kszh"
            @click="delectArticle"
          >删除登记</el-button>
          <el-button
            plain
            size="small"
            v-if="fromdata.authStatus&&fromdata.authStatus == '1'&&flag"
            @click="breakArticle"
          >中止授权</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button plain size="small" @click="caozuozhinan()">操作指南</el-button>
        </div>
      </el-col>
    </el-row>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行临时转授权登记单</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >授权登记</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >授权模块</a>
        <a
          v-if="seetOff"
          href="javascript:void(0);"
          :class="active == '#fsr' ? 'active' : ''"
          @click="toTarget('#fsr')"
        >发送人</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >授权书</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前状态：
              <span>{{fromdata.authStatusName}}</span>
            </p>
            <!-- <p class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{fromdata.currentUser}}</span>
            </p>-->
          </div>
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">授权登记</h6>
            <!-- :disabled="!this.fromdata.edit" -->
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="授权人 " prop="authUserName" ref="authUserName">
                        <el-col :span="20">
                          <el-input
                            v-model="fromdata.authUserName"
                            placeholder="请选择授权人"
                            style="width: 100%;"
                            :disabled="fromdata.leader || !fromdata.edit || todoOpen"
                            readonly
                          >
                            <el-button
                              slot="append"
                              :disabled="fromdata.leader|| !fromdata.edit || todoOpen"
                              @click="getTreeData('shou')"
                              icon="el-icon-plus"
                            ></el-button>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <!-- <el-form-item label="授权部门" prop="authDeptName" ref="authDeptName">
                        <el-input v-model="fromdata.authDeptName" :disabled="true"></el-input>
                      </el-form-item>-->
                      <el-form-item label="授权部门" prop="authDeptNameNew" ref="authDeptName">
                        <el-input v-model="authDeptNameNew" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="8">
                    <el-form-item label="被授权人" prop="beAuthUserName" ref="beAuthUserName">
                      <el-col :span="20">
                        <el-input
                          v-model="fromdata.beAuthUserName"
                          readonly
                          placeholder="请选择被授权人"
                          style="width: 100%;"
                          :disabled="!fromdata.edit || todoOpen" 
                        >
                          <el-button
                            slot="append"
                            @click="getTreeDataForCy('bei')"
                            icon="el-icon-plus"
                            :disabled="!fromdata.edit || todoOpen"
                          ></el-button>
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="被授权部门" prop="beAuthDeptName" ref="beAuthDeptName">
                      <el-input v-model="beAuthDeptName" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-col :span="8">
                  <el-form-item label="授权开始日期" prop="authStartTime" ref="authStartTime">
                    <el-date-picker
                      v-model="fromdata.authStartTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      @change="timebijiao1()"
                      align="right"
                      :disabled="!fromdata.edit || todoOpen"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="授权结束时间" prop="authEndTime" ref="authEndTime">
                    <el-date-picker
                      v-model="fromdata.authEndTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      align="right"
                      @change="timebijiao()"
                      :disabled="!fromdata.edit || todoOpen"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中止时间" prop="supspensionTime" ref="supspensionTime">
                    <el-input v-model="fromdata.supspensionTime" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="授权原因" prop="authReason" ref="authReason">
                    <!-- <el-input
                      type="input"
                      @click="clearCheck()"
                      v-model="fromdata.authReason"
                      maxlength="200"
                    ></el-input>-->
                    <el-input
                      type="textarea"
                      v-model="fromdata.authReason"
                      placeholder="请输入授权原因"
                      @click="clearCheck()"
                      maxlength="500"
                      resize="none"
                      autosize
                      :disabled="!fromdata.edit || todoOpen"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备    注">
                    <el-input
                      type="textarea"
                      maxlength="200"
                      autosize
                      resize="none"
                      :disabled="!fromdata.edit || todoOpen"
                      v-model="fromdata.remarks"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记人" prop="draftUserName" ref="draftUserName">
                    <el-input v-model="fromdata.draftUserName" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记部门" prop="draftDeptName" ref="draftDeptName">
                    <el-input v-model="fromdata.draftDeptName" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记日期" prop="draftTime" ref="draftTime">
                    <el-input v-model="fromdata.draftTime" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 审批意见 -->
            <h6 class="bank_dispach_file_tit">授权模块</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="授权模块" prop="authModule" ref="authModule">
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox
                        :disabled="!fromdata.edit || todoOpen"
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                      >全选</el-checkbox>
                      <el-checkbox
                        :disabled="!fromdata.edit || todoOpen"
                        name="authModule"
                        v-for="(item,index) in modules"
                        :key="index"
                        :label="item.moduleKeyWord"
                        :value="index"
                      >{{item.moduleName}}</el-checkbox>
                      <!-- <el-checkbox>全部</el-checkbox>
                        <el-checkbox>发文管理</el-checkbox>
                        <el-checkbox>收文管理</el-checkbox>
                        <el-checkbox>签报管理</el-checkbox>
                        <el-checkbox>便函管理</el-checkbox>
                        <el-checkbox>呈送件</el-checkbox>
                        <el-checkbox>专项督办</el-checkbox>
                        <el-checkbox>会议培训</el-checkbox>
                        <el-checkbox>事物审批</el-checkbox>
                        <el-checkbox>信息报送</el-checkbox>
                        <el-checkbox>行办会议</el-checkbox>
                        <el-checkbox>行办参会</el-checkbox>
                        <el-checkbox>信息审批</el-checkbox>
                        <el-checkbox>印章管理</el-checkbox>
                        <el-checkbox>会议室预定</el-checkbox>
                        <el-checkbox>文件处理</el-checkbox>
                        <el-checkbox>部门信息</el-checkbox>
                        <el-checkbox>电话记录</el-checkbox>
                      <el-checkbox>值班表通讯录联系人库</el-checkbox>-->
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 发送人 -->
            <div v-if="seetOff">
              <el-row>
                <el-col>
                  <el-form-item label="发送人" prop="authModule" ref="authModule">
                    <div></div>
                    <!-- <span style="margin-left:10px;border:1px solid #E4E7ED;padding:5px" 
                        v-for="tag in senRn"
                        :key="tag.name"
                        :type="tag.type">
                        {{tag.name}}
                    </span>-->
                    <span
                      style="margin-left:10px;border:1px solid #E4E7ED;padding:5px"
                      v-for="tag in senRn"
                      :key="tag"
                      :type="tag"
                      :disabled="!fromdata.edit || todoOpen"
                    >{{tag}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div id="fsr" class="height_90"></div>
            <!-- 发送人END -->
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit tit1">授权书</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <uploadFiles
                  v-if="fromdata.edit && !todoOpen"
                  ref="uploadComponent"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
                ></uploadFiles>
                <el-col>
                  <div
                    class="file_list_box"
                    style="margin-left:138px;"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar style="padding: 0px 15px 0 0;">
                      <div
                        v-for="(item,index) in  fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewFile(item)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(item,'up')"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="index==0  || fromdata.isLock == 1 || uploadConfig.subTempAddF || todoOpen"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(item,'down')"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="(index==fromdata.attchmentFileInfo.length-1)  || (fromdata.isLock == 1) || uploadConfig.subTempAddF || todoOpen"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id)"
                                :disabled="item.disabled || !fromdata.edit || todoOpen"
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
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <treeCofigForCy
      :sType="sType"
      :pId="pId"
      :offType="offType"
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :checkIds="checkIds"
      :orgId="shouQuanNewId"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      :scircularizeLevel="scircularizeLevel"
      @showCompDialog="showCompDialogForCy"
      @changeState="changeState"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <secretBasls ref="arr" v-if="secretDialog"></secretBasls>
    <!--  @childsavesecretBasls="savesecretBaslsvalue" -->

    <!--关闭-->
    <el-dialog v-dialogDrag title="关闭" :visible.sync="showCloseDialog">
      <el-row>
        <el-col
          style="text-aling:center;font-size:16px;line-height:60px;text-indent:2em;"
        >是否保存并退出当前页面?</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('2')">否1</el-button>
        <el-button type="primary" @click="handleClose('1')">是1</el-button>
      </span>
    </el-dialog>

    <el-dialog v-dialogDrag title="提示" width="20%" :visible.sync="sendTackVisible">
      <!-- <span>请上传授权书。</span> -->
      <el-row>
        <el-col style="text-aling:center;font-size:16px;line-height:60px;text-indent:2em;">请上传授权书。</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendTackVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import timeDialog from "../../../../../components/timedialog/timedialog";
import treeCofig from "../../../../../components/tree/tree-subadd";
import treeCofigForCy from "@/components/tree/tree-cyforsub";
import secretBasls from "../../../../../components/secretBasls/secretBasls";
import appendWriteList from "../../../../../components/appendWriteList/appendWriteList";
import uploadFiles from "../../../../../components/uploadFile/uploadFile";
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/index";
import closeMessage from "@/components/closeMessage/index";
export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    uploadFiles,
    treeCofigForCy,
    opinionText,
    closeMessage
  },
  data() {
    return {
      todoOpen:true,
      closeHandler: false,
      sendTackVisible: false,
      showCloseDialog: false,
      nowUserId: "", //当前用户id
      kszh: true, //在转授权开始时间后按钮隐藏的方法
      seetOff: false,
      senRnNames: [],
      senRn: [],
      pId: "",
      offType: "",
      sType: "",
      beAuthDeptName: "",
      authDeptNameNew: "", //shouquanbumen
      authDeptNameNewId: "",
      orgId: "",
      scircularizeLevel: "1", //传阅常用联系人修改 12.21
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      seletOptionsDataForCy: [],
      subAddConfig: {
        function: "selectUserByRole",
        unitId: "",
        roleCode: "deptqfG"
      },
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        noattachTitleCheck: true,
        subliceseTip: true
      },
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      secretDialog: false,
      modules: [], // 授权模板
      checkAll: "",
      checkedCities: [],
      checkedCitiesAll: [],
      cities: [],
      isIndeterminate: true,
      ruleForm: [],
      routeData: [],
      dialogFormVisible: false,
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistory",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      flag: false,
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      undertakeDeptData: [],
      assistDeptData: [],
      cbdwList: [], //督办依据添加
      //input框内容
      bank_dispach: {
        function: "selectById",
        id: ""
        // id: "1"
      },
      state: false, //如果大于2不可以编辑
      //确定完成并发送
      bank_doSend: {
        function: "doSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      fromdata: {
        authDeptNameNew: "",
        authDeptNameNewId: "",
        beAuthDeptName: "",
        beAuthDeptId: "",
        id: "",
        attachSort: [],
        authStatusName: "",
        multiTenancyId: "",
        authModule: "",
        draftUserId: "",
        draftUserName: "",
        draftDeptId: "",
        draftDeptName: "",
        authUserId: "",
        authUserName: "",
        beAuthUserId: "",
        beAuthUserName: "",
        authDeptId: "", //Sqbm
        authDeptName: "",
        beAuthDeptId: "", //bSHOUQUAN
        draftTime: "",
        authStartTime: "",
        authEndTime: "",
        authReason: "",
        authStatus: "",
        remarks: "",
        supspensionTime: ""
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
      //上下移动附件
      bank_upDownFile: {
        function: "changeAttachSort",
        fileId: "",
        sortType: ""
      },
      rules: {
        authUserName: [
          { required: true, message: "请选择授权人", target: "blur" }
        ],
        beAuthUserName: [
          { required: true, message: "请选择被授权人", target: "blur" }
        ],
        authStartTime: [
          { required: true, message: "请选择授权开始时间", target: "change" }
        ],
        authEndTime: [
          {
            required: true,
            message: "请选择授权开始结束时间",
            target: "change"
          }
        ],
        // multiTenancyId:[{ type:"array",required:true,message:"请选择授权模块",target:"change"}],
        authReason: [
          { required: true, message: "请选择授权原因", target: "change" }
        ]
      },
      baoWenZiDuan: this.$businessCode.grxxbg,
      imageUrl: "",
      active: "#wjys",
      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      benCheckData: [], //本行选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      dialogTypeNow: "", //当前弹窗类型
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: sessionStorage.getItem("ccboaHumanId"), //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      authmoduleList: [],
      multiTenancyIdList: [],
      nowTime: "",
      userid: "",
      beAuthCheckData: [], //被授权人选择数据
      shouQuanNewId: "", // shouquanren id
      shouquanbumen: "",
      beishouquanbumen: "",
      isSj:""
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    // 点击保存时判断登记人和授权人不是同一个人时，保存时提示需要上传授权书，提示时间过短，请修改为提示框不自动消失，点击确定后才消失。
    //点击保存时判断登记人和授权人不是同一个人时，选择是授权模块只是印章管理并且是分行，才提示需要上传授权书,unitId ==  U010000是总行
    preserveJudge() {
      if (this.fromdata.id) {
         if(!(//如果不是同一个人
            this.fromdata.attchmentFileInfo &&
            this.fromdata.attchmentFileInfo.length
          ) &&this.fromdata.authUserId != this.fromdata.draftUserId){
            if(JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"){//不是同一人总行显示弹窗
              this.sendTackVisible = true;
            }else{//不是同一人,分行
              if(this.checkedCities.length){
                  if(this.checkedCities[0] == "YZGL"&&this.checkedCities.length == 1){
                    this.sendTackVisible = false;
                  }else if(this.checkedCities.length>1 ){
                    this.sendTackVisible = true;
                  }
              }
            }
          }else if(//如果是同一个人不显示弹窗
            this.fromdata.authUserId == this.fromdata.draftUserId){
              this.sendTackVisible = false;
          }
          this.preserve("save");//无论探不探窗都要保存
      } else {
        this.preserve("save");
      }
    },
    changeState(newName) {
      this.offType = true;
      this.pId = "";
      this.sType = true;
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        this.offType = true;
        this.pId = "pId";
        this.sType = false;
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let beiShouId = []; //被授权id 转换
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
            beiShouId.push(item.idStr);
          });
          if (this.addSendType == "1") {
            oldIds = this.fromdata.circulatePersonIds.split(";");
            oldNames = this.fromdata.circulatePersonNames.split(";");
            newIds = ids.filter(item => {
              return oldIds.indexOf(item) == -1;
            });
            newNames = names.filter(item => {
              return oldNames.indexOf(item) == -1;
            });
          }

          names = names.join(";");
          this.transIds = ids = ids.join(";");
          newIds = newIds.join(";");
          newNames = newNames.join(";");
          beiShouId = beiShouId.join(";");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
          beiShouId = "";
        }
        switch (dtype) {
          case "cy":
            this.fromdata.beAuthUserName = names;
            this.fromdata.beAuthUserId = ids;
            console.log("beibeibei", this.fromdata);
            this.beAuthCheckData = this.checkData;
            break;
          case "bei":
            this.fromdata.beAuthUserName = names;
            this.fromdata.beAuthUserId = beiShouId;
            this.assistDeptData = this.checkData;
            // this.beAuthDeptName = this.authDeptNameNew;
            this.beAuthDeptName = this.checkData[0].deptName;
            // this.fromdata.beAuthDeptName = names;
            // this.fromdata.beAuthDeptId = ids;
            this.clearCheck();
            break;
        }
        if (this.addSendType == "1") {
          this.sendCy(newIds, newNames);
        }
        if (this.addSendType != "1" && dtype == "cy") {
          this.sendCy();
        }
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    //请求选择被授权部门树数据
    getTreeDataForCy(n, m) {
      this.offType = true;
      this.pId = "pId";
      this.sType = false;

      let transArr =
      (localStorage.getItem("unitInfo") &&
        JSON.parse(localStorage.getItem("unitInfo"))) ||
      [];
      if (transArr.length > 1) {
        this.yrdbm = true;
      }
      if (n == "bei") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
        // this.shouQuanNewId = this.isSj?JSON.parse(localStorage.getItem("userInfo")).unitId:JSON.parse(localStorage.getItem("userInfo")).firstUnitId;
        if(this.isSj){
          this.shouQuanNewId = JSON.parse(localStorage.getItem("userInfo")).unitId
        }else{
          if(this.fromdata.leader){
            if(this.yrdbm){
              this.shouQuanNewId = this.authDeptNameNewId
            }else{
              this.shouQuanNewId = JSON.parse(localStorage.getItem("userInfo")).firstUnitId
            }
          }else {
            // alert(this.fromdata.authDeptId)
            this.shouQuanNewId = this.authDeptNameNewId||this.fromdata.authDeptId

          }
        }
      }
      let name = "";
      this.addSendType = m;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = true;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      switch (n) {
        case "bei":
          name = "选择被授权人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      console.log(
        this.fromdata.authUserName == " ",
        "this.fromdata.authUserName",
        this.fromdata.authUserName
      );
      if (
        this.fromdata.authUserName == " " ||
        this.fromdata.authUserName == ""
      ) {
        this.$message({
          type: "error",
          message: "请先选择授权人",
          duration: 2000
        });
        return false;
      }
      this.showCompDialogForCy();
      if (m == 1) {
        this.dialogTypeNowForCy = "zengfa";
      }
      console.log(JSON.parse(localStorage.getItem("userInfo"))
              .firstUnitId)
      this.$post
        .postData(
          "selectUserByUnitTree", //传阅常用联系人修改
          JSON.stringify({
            function: "selectUserByUnitTree", //传阅常用联系人修改
            authUnitCode: JSON.parse(localStorage.getItem("userInfo"))
              .firstUnitId,
            flag: true,
            pId: "pId",
            // unitCode: JSON.parse(localStorage.getItem("userInfo")).firstUnitId
            unitCode: this.isSj?JSON.parse(localStorage.getItem("userInfo")).unitId:JSON.parse(localStorage.getItem("userInfo")).firstUnitId
          }),
          this.$businessCode.sqgl
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
          if (res.message == "Loading") {
            this.loadingTreeForCy = true;
          } else {
            this.loadingTreeForCy = false;
          }
          that.treeData = (res && res.data) || [];
          that.treeData[0].disabled = true;
        });
    },
    //回显传阅人员
    backDialogDataForCy(type) {
      let newA = [];
      let concatIds = [];
      switch (type) {
        case "bei":

          this.checkData = this.assistDeptData.filter(item => {
            item.disabled = false;
            concatIds.push(item.id)
            item.hideType = false;
            return true;
          });
          //将授权选择人员 设置不可选
          if (this.undertakeDeptData.length) {
            newA = [].concat(this.undertakeDeptData);
            newA.map(item => {
              //选中的不可操作
              concatIds.push(item.id)
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.assistDeptData, newA);
          this.checkIds = [].concat(concatIds);
          break;
      }
    },
    //收藏
    shoucang() {
      let that = this;
      let shiwutitle = (this.fromdata.draftDept || "") + "临时转授权登记单";
      let draftInfo = this.fromdata.filePath
        ? [].concat(
            {
              fileName: this.fromdata.fileName,
              filePath: this.fromdata.filePath
            },
            this.fromdata.attchmentFileInfo
          )
        : this.fromdata.attchmentFileInfo; //收藏时下载正文
      //收藏时下载正文
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "subTempAdd",
        this.$businessCode.sqglfj,
        this.fromdata.title,
        that
      );
    },

    //操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "LSZSQ"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.fromdata.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.swgl //流程交易线     chai
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
              duration: 2000
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 2000
          });
        });
    },
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      var handbook = flagFile
        ? self.$businessCode.fwbzfj
        : self.$businessCode.sqglfj;
      self.bank_doDownloadFile.fileName = flagFile
        ? flagFile.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = flagFile
        ? flagFile.filePath
        : self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          handbook
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
              duration: 2000
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
            duration: 2000
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    //发送
    sendButton() {
      var demo = {
        id: this.fromdata.id,
        function: "sendButton"
      };
      this.$post
        .postData("sendButton", JSON.stringify(demo), this.$businessCode.sqgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              message: "发送成功",
              duration: 2000,
              onClose: () => {
               window.location.reload();
              }
            });

            // this.senRn=[];
            // // this.senRnNames=Object.values(res.data);
            // for(var i=0;i<this.senRnNames.length;i++){
            //   let spacialObj = {
            //     "name": this.senRnNames[i],
            //     "type":""
            //   }
            //     this.senRn.push(spacialObj)
            // }
            // this.seetOff=true;
          }

          //   this.$post
          // .postData(
          //   "getSendRenYuan",
          //   JSON.stringify({ function: 'getSendRenYuan', id: this.fromdata.id}),
          //   this.$businessCode.sqgl
          // )
          // .then(res => {
          //   if (res && res.success) {
          //     this.senRn=[];
          //     this.senRnNames=Object.values(res.data);
          //     for(var i=0;i<this.senRnNames.length;i++){
          //       let spacialObj = {
          //         "name": this.senRnNames[i],
          //         "type":""
          //       }
          //         this.senRn.push(spacialObj)
          //     }
          //     this.seetOff=true;
          //   } else {
          //     this.$message({
          //       type: "error",
          //       offset: 400,
          //       showClose: true,
          //       message: "操作失败",
          //       duration: 1000
          //     });
          //   }
          // })
          // .catch(erro => {
          //   this.$message({
          //     type: "error",
          //     offset: 400,
          //     showClose: true,
          //     message: "操作失败",
          //     duration: 1000
          //   });
          // });
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "操作失败",
            duration: 2000
          });
        });
    },
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.sqglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              });
              if (openPlugin) {
                this.zhengWenState = 0;
                this.doDraft(res);
              } else {
                window.open(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  "_blank"
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 2000
              });
            }
          }
        });
    },
    //正文跳转
    doDraft(fileInfo,saveName) {
      let str = "";
      if(!saveName){
        str = this.fromdata.authReason
      }else{
        str = saveName;
      }
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: this.fromdata.id,
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.sqglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          showBtns: false,
          flowTranId: this.$businessCode.sqgl, 
          saveSpecialFileName:str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();

      window.open(data.href, "_blank");
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.sqglfj
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
                duration: 2000
              });
            }
          }
        });
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.attchmentFileInfo[n - 1].id,
          sort: this.fromdata.attchmentFileInfo[n].sort
        },
        {
          id: this.fromdata.attchmentFileInfo[n].id,
          sort: this.fromdata.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
        n - 1
      ];
      this.fromdata.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(item, type) {
      this.bank_upDownFile.fileId = item.id;
      this.bank_upDownFile.sortType = type;
      this.$post
        .postData(
          "changeAttachSort",
          JSON.stringify(this.bank_upDownFile),
          this.$businessCode.sqglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              // this.getToQianbaoEntityById();
              this.toEdit();
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "改变顺序失败,请联系管理员",
                duration: 2000
              });
            }
          }
        });
    },
    // downRow(n) {
    //   let midObj;
    //   this.fromdata.attachSort.push(
    //     {
    //       id: this.fromdata.attchmentFileInfo[n + 1].id,
    //       sort: this.fromdata.attchmentFileInfo[n].sort
    //     },
    //     {
    //       id: this.fromdata.attchmentFileInfo[n].id,
    //       sort: this.fromdata.attchmentFileInfo[n + 1].sort
    //     }
    //   );
    //   midObj = this.fromdata.attchmentFileInfo[n];
    //   this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
    //     n + 1
    //   ];
    //   this.fromdata.attchmentFileInfo[n + 1] = midObj;
    //   this.$forceUpdate();
    // },
    //附件删除
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
              this.$businessCode.sqglfj
            )
            .then(res => {
              if (res) {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 2000
                  });
                  this.fromdata.attchmentFileInfo.splice(n, 1);
                  this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
                  // window.location.reload()
                  this.$forceUpdate();
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "删除失败",
                    duration: 2000
                  });
                }
              }
            });
        })
        .catch(() => {});
    },
    handleCheckAllChange(val) {
      let list = [];
      this.multiTenancyIdList = [];
      this.authmoduleList = [];
      let all = this.modules;
      if (val) {
        all.forEach(item => {
          list.push(item);
          this.authmoduleList.push(item.moduleKeyWord);
          this.multiTenancyIdList.push(item.appCatShortName);
        });
        this.checkedCities = this.authmoduleList;
        this.fromdata.multiTenancyId =
          this.multiTenancyIdList.length > 0
            ? this.multiTenancyIdList.join(",")
            : "";
        this.fromdata.authModule =
          this.authmoduleList.length > 0 ? this.authmoduleList.join(",") : "";
      } else {
        this.checkedCities = [];
        this.checkedCitiesAll = [];
        this.fromdata.authModule = "";
        this.fromdata.multiTenancyId = "";
      }
    },
    handleCheckedCitiesChange(value) {
      this.authmoduleList = [];
      this.multiTenancyIdList = [];
      let authmoduleList = [];
      let all = this.modules;
      if (value.length > 0) {
        this.checkedCities.forEach((item, index) => {
          all.find(item1 => {
            if (item1.moduleKeyWord == item) {
              this.authmoduleList.push(item1.moduleKeyWord);
              this.multiTenancyIdList.push(item1.appCatShortName);
            }
          });
        });
        this.fromdata.multiTenancyId =
          this.multiTenancyIdList.length > 0
            ? this.multiTenancyIdList.join(",")
            : "";
        this.fromdata.authModule =
          this.authmoduleList.length > 0 ? this.authmoduleList.join(",") : "";
      }
    },
    add() {
      this.dialogFormVisible = true;
    },
    //请求部门树数据
    getTreeData(n) {
      //console.log(this.$refs.tree.getCheckedNodes());
      let treeInfo = {
        function: "selectUserByRole",
        unitId: this.unitCode,
        roleCode: "deptqfG"
      };
      let beiShouquan = {
        function: "selectUserByCirculate",
        flag: true,
        level: 2,
        unitCode: this.unitCode
      };
      let postUrl = "";
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "shou":
          name = "选择授权人";
          clearName = "authUserName";
          postUrl = "selectUserByRole";
          break;
        case "bei":
          name = "被授权人";
          clearName = "beAuthUserName";
          postUrl = "selectUserByCirculate";
          treeInfo = beiShouquan;
          break;
      }

      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      let unit = JSON.parse(localStorage.getItem("tcHumanRole")) || [];
      // let arr = unit.map((item)=>{
      //     return item.dicId
      // })
      let a = false; //行领导秘书岗位
      let b = false; //综合岗位

      let attr = [];
      for (var i = 0; i < unit.length; i++) {
        if (unit[i].dicId == "343") {
          a = true;
        }
        if (unit[i].dicId == "357") {
          b = true;
        }
      }
      console.log(a, b, "abcd");
      if (a && b) {
        this.$post
          .postData(
            "selHumanByDeptTypeAndRoleId", //
            JSON.stringify({
              function: "selHumanByDeptTypeAndRoleId", //
              isSj:this.isSj?this.isSj:""
            }),
            this.$businessCode.sqgl
          )
          .then(res => {
            console.log(res.data, "0000000000000");
            that.treeData = (res && res.data) || [];
          })
          .catch(err => {
            console.log(err);
          });
      } else if (!a && !b) {
        this.$post
          .postData(
            "selectUserByRole", //
            JSON.stringify({
              function: "selectUserByRole", //
              unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
            }),
            this.$businessCode.sqgl
          )
          .then(res => {
            console.log(res.data, "0000000000000");
            that.treeData = (res && res.data) || [];
          })
          .catch(err => {
            console.log(err);
          });
      } else if (!a && b) {
        this.$post
          .postData(
            "selHumanLevelByRole", //
            JSON.stringify({
              function: "selHumanLevelByRole",
              unitCode: this.isSj?JSON.parse(localStorage.getItem("userInfo")).unitId:this.unitCode,
              roleCode: "deptqfG"
            }),
            this.$businessCode.sqgl
          )
          .then(res => {
            console.log(res.data, "0000000000000");
            that.treeData = (res && res.data) || [];
          })
          .catch(err => {
            console.log(err);
          });
      } else if (a && !b) {
        console.log(a, b, "aaabbb");
        this.$post
          .postData(
            "selectUserByunit", //
            JSON.stringify({
              function: "selectUserByunit", //
              unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
              deptType: "hld"
            }),
            this.$businessCode.sqgl
          )
          .then(res => {
            console.log(res.data, "0000000000000");
            that.treeData = (res && res.data) || [];
          })
          .catch(err => {
            console.log(err);
          });
      }
      // else if(){
      //   this.$post
      //     .postData(
      //       postUrl,
      //       JSON.stringify(treeInfo),
      //       this.$businessCode.sqgl
      //     )
      //     .then(res => {
      //       that.treeData = (res && res.data) || [];

      //     });
      // }
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        // if (name === "assistDeptName") {
        //   this.fromdata.assistDeptId = "";
        //   this.chenCheckData = [];
        // }
        // if (name === "assistDeptName") {
        //   this.fromdata.assistDeptId = "";
        //   this.xieCheckData = [];
        // }
      }
    },

    clearCheck() {
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    timebijiao1() {
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      });
      let nowTime = dateFormate.date(
        Date.parse(new Date()),
        "YYYY-MM-DD HH:mm:ss"
      );
      let a = parseInt(Date.parse(this.fromdata.authStartTime));
      let b = parseInt(Date.parse(this.fromdata.authEndTime));
      this.fromdata.authStartTime = dateFormate.date(
        Date.parse(this.fromdata.authStartTime),
        "YYYY-MM-DD HH:mm:ss"
      );
      // this.bank_countersignature.authEndTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      if (this.fromdata.authStartTime < nowTime && nowTime) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "授权起始时间需大于当前时间",
          duration: 2000
        });
        this.fromdata.authStartTime = "";
        return;
      }
      if (
        this.fromdata.authEndTime &&
        this.fromdata.authEndTime < this.fromdata.authStartTime
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "授权起始时间需大于授权结束时间",
          duration: 2000
        });
        this.fromdata.authStartTime = "";
      } else if (b - a > 3600 * 1000 * 24 * 90 * 4) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "授权时间不得大于1年",
          duration: 2000
        });
        this.fromdata.authStartTime = "";
      }
    },
    timebijiao() {
      let a = parseInt(Date.parse(this.fromdata.authStartTime));
      let b = parseInt(Date.parse(this.fromdata.authEndTime));
      this.fromdata.authEndTime = dateFormate.date(
        Date.parse(this.fromdata.authEndTime),
        "YYYY-MM-DD HH:mm:ss"
      );
      if (
        new Date(this.fromdata.authStartTime) >
        new Date(this.fromdata.authEndTime)
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "结束时间需大于起始时间",
          duration: 2000
        });
        this.fromdata.authEndTime = "";
      } else if (b - a > 3600 * 1000 * 24 * 90 * 4) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "授权时间不得大于1年",
          duration: 2000
        });
        this.fromdata.authEndTime = "";
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      let concatIds = [];
      switch (type) {
        case "shou":
          
          this.checkData = this.undertakeDeptData.filter(item => {
            item.disabled = false;
            item.hideType = false;
            item.TYPE = 'user';
            concatIds.push(item.id);
            return true;
          });
          //将被授权选择人员 设置不可选
          if (this.assistDeptData.length) {
            newA = [].concat(this.assistDeptData);
            newA.map(item => {
               concatIds.push(item.id);
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.undertakeDeptData, newA);
          this.checkIds = [].concat(concatIds
          );
          break;

        case "bei":
          
          this.checkData = this.assistDeptData.filter(item => {
            item.disabled = false;
            item.hideType = false;
            item.TYPE = 'user';
            concatIds.push(item.id)
            return true;
          });
          //将授权选择人员 设置不可选
          if (this.undertakeDeptData.length) {
            newA = [].concat(this.undertakeDeptData);
            newA.map(item => {
              //选中的不可操作
              concatIds.push(item.id)
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.assistDeptData, newA);
          this.checkIds = [].concat(concatIds);
          break;

        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },

    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let buMenName = "";
      let buMenId = "";
      let judge = true;
      let that = this;
      if (this.dialogType === "dosend") {
        judge = this.saveCheck();
      }
      if (!judge) {
        return;
      }
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let shouQuanId = []; //授权id 转换
        that.checkIds = [];
        this.shouQuanNewId = "";

        if (data.length) {
          this.checkData = [].concat(data);
          console.log(this.checkData, "this.checkData");
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
            shouQuanId.push(item.idStr);
          });
          console.log(ids, "data[0].deptName", names, data);
          names = names.join(",");
          ids = ids.join(",");

          buMenName = data[0].deptName || "";
          buMenId = data[0].deptId || "";
          shouQuanId = shouQuanId.join(",");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
          shouQuanId = "";
        }

        switch (dtype) {
          case "zhusong":
            this.fromdata.main = names;
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            break;
          case "hui":
            this.fromdata.signDepartment = names;
            this.fromdata.signDepartmentIds = ids;
            this.huiCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = names;
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
            break;
          case "dosend":
            this.bank_doSend.nextUserName = names;
            this.bank_doSend.nextUserId = ids;
            this.bank_doSend.nextNodeId = params.id;
            this.bank_doSend.nextNodeName = params.name;
            break;
          case "shou":
            this.fromdata.authUserName = names;
            this.fromdata.authUserId = shouQuanId;
            this.undertakeDeptData = this.checkData;
            console.log(this.checkData, "this.checkDatathis.checkData");
            //this.shouQuanNewId = JSON.parse(localStorage.getItem("userInfo")).firstUnitId;
            // this.shouQuanNewId =
            //   (this.checkData[0] && this.checkData[0].id.split("#")[1]) || "";
            // this.shouQuanNewId = this.isSj?JSON.parse(localStorage.getItem("userInfo")).unitId
            //   :(this.checkData[0] && this.checkData[0].id.split("#")[1]);
            this.shouQuanNewId =
              (this.checkData[0] && this.checkData[0].id.split("#")[1]) || "";
            // this.fromdata.authDeptName = buMenName;
            // this.fromdata.authDeptId = buMenId;
            this.fromdata.authDeptNameNew = buMenName;
            this.fromdata.authDeptNameNewId = buMenId;
            this.clearCheck();
            break;
          case "bei":
            this.fromdata.beAuthUserName = names;
            this.fromdata.beAuthUserId = ids;
            this.assistDeptData = this.checkData;
            this.fromdata.beAuthDeptName = buMenName;
            this.fromdata.beAuthDeptId = buMenId;
            this.clearCheck();
            break;
        }
        this.$forceUpdate();
        console.log("aaas", this.shouQuanNewId);

        if (
          this.fromdata.authUserName == " " ||
          this.fromdata.authUserName == ""
        ) {
          this.authDeptNameNewId = "";
          this.authDeptNameNew = "";
          this.$message({
            type: "error",
            message: "请先选择授权人",
            duration: 2000
          });
          return false;
        }
        this.$post
          .postData(
            "selectUnitByUnitId", //传阅常用联系人修改
            JSON.stringify({
              function: "selectUnitByUnitId", //传阅常用联系人修改
              unitId: this.shouQuanNewId
            }),
            this.$businessCode.sqgl
          )
          .then(res => {
            this.authDeptNameNew = res.data.unitName;
            this.shouQuanNewId = this.authDeptNameNewId = res.data.unitCode;

            console.log(this.authDeptNameNewId, "this.authDeptNameNewId");
            this.BeiAuthDeptNameNew = res.data.unitName;
            this.authDeptId = res.data.unitId;
            this.beAuthDeptId = res.data.unitId;

            console.log(res, "resresres", res.data.unitName);
          });
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.bank_doSend, this.fromdata);
      this.$post
        .postData("doSend", JSON.stringify(params), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 2000,
              onClose: () => {
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              }
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

    //初始值 //input框内容
    toEdit() {
      this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageSWid") || "";

      let that = this;
      let demo = [];
      this.$post
        .postData(
          "selectById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.sqgl
        )
        .then(res => {
          this.fromdata = Object.assign(this.fromdata, res.data);
          //todoOpen 判断当前登入人和登记人是一个人的话就可编辑
          if(this.fromdata.draftUserName == JSON.parse(localStorage.getItem("userInfo")).humanName){
              this.todoOpen = false;
          }
          // this.fromdata.draftDeptId = tes.data.draftDeptId;
          this.senRn = (res && res.data && res.data.sendRenYuan) || [];
          if (this.senRn) {
            this.seetOff = true;
          } else {
            this.seetOff = false;
          }
          this.nowUserId = this.fromdata.currentUserId;
          this.authDeptNameNew = that.fromdata.authDeptName;
          this.authDeptNameNewId = that.fromdata.authDeptNameNewId;
          this.beAuthDeptName = that.fromdata.beAuthDeptName;
          this.beAuthDeptId = that.fromdata.beAuthDeptId;
          that.checkedCities = res.data.authModule
            ? res.data.authModule.split(",")
            : [];
            console.log(that.checkedCities)
          this.authDeptNameNew = res.data.authDeptName;
          //  console.log(res.data.authDeptName,that.fromdata,"11",that.checkedCities,"11111111111111",this.authDeptNameNew)
          //上传附件
          if (res.data.id) {
            sessionStorage.setItem("pageSWid", res.data.id);
            this.uploadConfig.subTempAddF = false;
            this.uploadConfig.subliceseTip = false;
            this.uploadConfig.id = res.data.id;
          }

          this.fromdata.beAuthUserId = this.fromdata.beAuthUserId.length? this.fromdata.beAuthUserId +"#"+this.fromdata.authDeptId:"";
          this.fromdata.authUserId = this.fromdata.authUserId.length? this.fromdata.authUserId +"#"+this.fromdata.authDeptId:"";
          if(this.fromdata.beAuthDeptName){
              this.assistDeptData = [{
                id:this.fromdata.beAuthUserId,
                name:this.fromdata.beAuthUserName,
              }]
          }
          if(this.fromdata.authDeptName){
            this.undertakeDeptData = [{
              id:this.fromdata.authUserId,
              name:this.fromdata.authUserName,
            }]
          }

          //判断是否为被授权人查看.
          let user = JSON.parse(localStorage.unitInfo);
          if (
            user[0].humanCode == res.data.draftAuthCode ||
            user[0].humanCode == res.data.authCode
          ) {
            this.flag = true;
          } else {
            this.flag = false;
          }

          if (that.fromdata.authStartTime != "") {
            //这里不添加判断的话时间就不能选择
            that.fromdata.authStartTime = dateFormate.date(
              Date.parse(that.fromdata.authStartTime),
              "YYYY-MM-DD HH:mm:ss"
            );

            let c = formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss");
            if (c >= that.fromdata.authStartTime) {
              that.kszh = false; //在转授权开始时间后按钮隐藏 所以判断当前时间大于开始时间让KSZH为false;
            }
          }

          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.uploadConfig.attachTitle =
            this.fromdata.attachmentTitle &&
            this.fromdata.attachmentTitle.replace(/[\n,\s]/g, "");
          this.fromdata.attachSort = [];
          if (that.fromdata.leader) {
            // this.fromdata.authUserName = res.data.draftUserName;
            this.fromdata.authDeptName = res.data.draftDeptName;
            this.fromdata.authUserId = res.data.draftUserId;
            this.authDeptNameNew = res.data.draftDeptName;
            // this.authDeptNameNewId = res.data.draftUserId;
             this.authDeptNameNewId = res.data.draftDeptId;
            console.log("aaa", this.fromdata);
          }
          setTimeout(() => {
            this.$refs.fromdata.clearValidate();
          });
          this.getOrgInfo();
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 2000
          });
        });
    },

    submitForm(type) {
      let resT = true;
      this.$refs["fromdata"].validate(valid => {
        if (!valid) {
          this.$message({
            type: "error",
            message: "请完善表单数据",
            duration: 2000
          });
          resT = false;
        }
      });
      return resT;
    },
    //liu lan
    scrollIntoForm() {
      let that = this;
      let result = true;
      this.$refs.fromdata.validate((valid, object) => {
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
    // 保存
    async preserve(type) {
      let successState = false;
      let res = this.scrollIntoForm();
      let resFlag = this.submitForm();
      console.log(res, "res");
      // if (!res) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "保存失败",
      //     duration: 2000
      //   });
      // }
      if (!resFlag) {
        return;
      }
      if (this.fromdata.authModule == "" || this.fromdata.authModule == " ") {
        if (this.multiTenancyIdList.length == 0) {
          this.$message({
            type: "error",
            message: "请选择授权模块",
            duration: 2000
          });
          return;
        }
      }

      // if (
      //   this.multiTenancyIdList.length == 0 ||
      //   !this.fromdata.authModule ||
      //   this.fromdata.authModule == ""
      // ) {

      // }
      let offForm = this.scrollIntoForm();

      //  if(!offForm){
      //     this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "保存失败",
      //     duration: 1000
      //   });
      //  }

      let parms = { function: "saveOrUpdate" };

      var obj = Object.assign(parms, this.fromdata);

      obj.authDeptName = this.authDeptNameNew;
      obj.beAuthDeptName = this.beAuthDeptName;
      obj.authUserId = this.fromdata.authUserId.length? this.fromdata.authUserId.split("#")[0]:'';
      obj.beAuthUserId = this.fromdata.beAuthUserId.length? this.fromdata.beAuthUserId.split("#")[0]:'';
      if (
        this.fromdata.authUserName == " " ||
        this.fromdata.authUserName == ""
      ) {
        this.$message({
          type: "error",
          offset: 100,
          showClose: true,
          message: "请选择授权人",
          duation: 2000
        });
        return false;
        // this.$message({
        //       type: "error",
        //       message:"保存失败",
        //       duration: 1000
        //     });
      } else if (
        this.fromdata.beAuthUserName == " " ||
        this.fromdata.beAuthUserName == ""
      ) {
        this.$message({
          type: "error",
          message: "请选择被授权人",
          duration: 2000
        });
         return false;
      }
      if (this.fromdata.nextUserId != undefined) {
        obj.beAuthDeptId = this.fromdata.nextUserId.split("#")[1];
      }
      //this.shouQuanNewId = this.checkData[0]&&this.checkData[0].id.split("#")[1]||'';
      await this.$post
        .postData(
          "saveOrUpdate",
          JSON.stringify(obj),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            // this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            // this.bank_doSend.id = res.data.id;
            // if (type) {
            //   this.$message({
            //     type: "success",
            //     showClose: true,
            //     offset: 400,
            //     message: res.message,
            //     duration: 1000
            //   });
            // }


            //tyl注释
            // if (type && type != "uploadfile") {
            //   if (
            //     !(
            //       this.fromdata.attchmentFileInfo &&
            //       this.fromdata.attchmentFileInfo.length
            //     ) &&
            //     this.fromdata.authUserId != this.fromdata.draftUserId
            //   ) {
            //     this.sendTackVisible = true;

            //   } 
            //   else {
            //     this.$message({
            //       type: "success",
            //       showClose: true,
            //       offset: 400,
            //       message: "保存成功",
            //       duration: 2000
            //     });
            //   }
            //   window.opener.location.reload();
            // }

            if (res.data.id) {
              sessionStorage.setItem("pageSWid", res.data.id);
              this.uploadConfig.subTempAddF = false;
              this.uploadConfig.id = res.data.id;
            }
             if (type && type != "uploadfile") {
               if(obj.authUserId == this.fromdata.draftUserId){//如果是同一个人不显示弹窗 根据ID判断
                    this.sendTackVisible = false;
                    this.$message({
                      type: "success",
                      showClose: true,
                      offset: 400,
                      message: "保存成功",
                      duration: 2000
                    });
                }else if(!(this.fromdata.attchmentFileInfo && this.fromdata.attchmentFileInfo.length) && obj.authUserId != this.fromdata.draftUserId){//如果不是同一个人
                  if(JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"){//不是同一人,是总行，显示弹窗
                    this.sendTackVisible = true;
                  }else{//不是同一人,是分行
                    if(this.checkedCities.length){
                      // console.log(this.checkedCities);
                      // console.log(this.checkedCities[0] == "YZGL")
                        if((this.checkedCities[0] == " " && this.checkedCities[1] == "YZGL" && this.checkedCities.length==2) || (this.checkedCities[0] == "YZGL" && this.checkedCities.length==1)){//只选择印章管理模块是不显示弹窗
                        this.sendTackVisible = false;
                          this.$message({
                            type: "success",
                            showClose: true,
                            offset: 400,
                            message: "保存成功",
                            duration: 2000
                          });
                        }else if(this.checkedCities.length>1 ){
                          this.sendTackVisible = true;
                        }
                    }
                  }
                }
              window.opener.location.reload();

            //   if(!(//如果不是同一个人
            //     this.fromdata.attchmentFileInfo &&
            //     this.fromdata.attchmentFileInfo.length
            //   ) &&this.fromdata.authUserId != this.fromdata.draftUserId){
            //     if(JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"){//不是同一人总行显示弹窗
            //       this.sendTackVisible = true;
            //     }else{//不是同一人,分行
            //       if(this.checkedCities.length){
            //           if(this.checkedCities[0] == "YZGL"&&this.checkedCities.length == 1){
            //             this.$message({
            //               type: "success",
            //               showClose: true,
            //               offset: 400,
            //               message: "保存成功",
            //               duration: 2000
            //             });
            //           }else if(this.checkedCities.length>1 ){
            //             this.sendTackVisible = true;
            //           }
            //       }
            //     }
            //   }else if(//如果是同一个人不显示弹窗
            //     this.fromdata.authUserId == this.fromdata.draftUserId){
            //       debugger
            //       this.sendTackVisible = false;
            //       this.$message({
            //       type: "success",
            //       showClose: true,
            //       offset: 400,
            //       message: "保存成功",
            //       duration: 2000
            //     });
            //   }
            //   window.opener.location.reload();
            }
            // if (res.data.id) {
            //   sessionStorage.setItem("pageSWid", res.data.id);
            //   this.uploadConfig.subTempAddF = false;
            //   this.uploadConfig.id = res.data.id;
            // }

            // if(loadingFlag !="needSave"){   //手动保存的时候进行刷新
            //   window.opener.location.reload();
            // }

            // window.close();
            // window.opener.location.reload();
            this.toEdit();
            successState = true;
          } else {
            this.$message({
              type: "error",
              message: res.message,
              duration: 2000
            });
          }
        })
      .catch(erro => {
        console.log(erro)
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "保存失败",
          duration: 2000
        });
      });
      return successState;
    },

    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      if (scrolled < this.distance_qpyj) {
        this.active = "#wjys";
      } else if (scrolled >= this.distance_qpyj && scrolled <= 1100) {
        this.active = "#qpyj";
      } else if (scrolled < this.distance_scfj) {
        this.active = "#scfj";
      }
    },
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    // 关闭
    // handelclose() {
    //   this.$confirm("是否退出当前页面?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       // this.preserve();
    //       // window.location.href = "about:blank";
    //       // window.close();
    //       window.close();
    //       window.history.go(-1);
    //       window.opener.location.reload();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         offset: 100,
    //         showClose: true,
    //         message: "已取消关闭",
    //         duation: 1000
    //       });
    //     });
    // },
    // 关闭

    btnCloseHandler(val) {
      //  console.log('val',val)
      if (val === '1') {
        window.close();
        window.location.href = "about:blank";
        window.opener.location.reload();
      } else if (val == '2') {
          this.closeHandler = false
          this.$refs["fromdata"].validate(valid=>{
          if(valid) {
            this.preserve();
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else {
            this.$message({
            type: "warning",
            message: "请填写必填项后保存",
            duration: 2000
          });
          }
        })
      } else {
        this.closeHandler = false;
      }
    },
    handleClose(val) {
      
      if (val == "1") {
        this.preserve().then(save => {
          if (save) {
            window.location.href = "about:blank";
            window.close();
          }
        });
      } else if (val == "2") {
        window.location.href = "about:blank";
        window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
    },

    // 起草正文
    drafting() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!",
        duration: 2000
      });
    },

    delectArticle() {
      //deleteById
      let parms = { function: "deleteById", id: this.fromdata.id };
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post
        .postData("deleteById", JSON.stringify(parms), this.$businessCode.sqgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000,
              onClose: () => {
                      window.close();
                      window.opener.location.reload();
                    }
            })
            // window.close();
            // window.history.go(-1);
            // window.opener.location.reload();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "删除失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {});
      })
    },

    // 终止
    breakArticle() {
      let parms = {
        function: "supspensionAuthorization",
        id: this.fromdata.id
      };
      this.$post
        .postData(
          "supspensionAuthorization",
          JSON.stringify(parms),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "操作成功",
              duration: 2000
            });
            this.fromdata.supspensionTime =
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1) +
              "-" +
              new Date().getDay();
            this.toEdit();
            window.opener.location.reload();
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
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "操作失败",
            duration: 2000
          });
        });
    },
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.fromdata.opinionCheck = this.fromdata.opinionCheck
            ? this.fromdata.opinionCheck + data
            : data;
        } else if (this.clickTypes == 2) {
          this.fromdata.officeOpinion += data;
        } else if (this.clickTypes == 3) {
          this.fromdata.undertakeOrgOpinion += data;
        }
        this.$forceUpdate();
      }
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "doDeletesendOrderOpinion",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.grxxbg
        )
        .then(res => {
          if (res && res.success) {
            ssage({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
            this.$refresh;
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

    getMukuai() {
      let selectAgent = { function: "selectAgent" };
      this.$post
        .postData(
          "selectAgent",
          JSON.stringify(selectAgent),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            this.modules = res.data;
          }
        });
    },
    getOrgInfo() {
      this.$post
        .postData(
          "selHumanByDeptTypeAndRoleId",
          JSON.stringify({ function: "selHumanByDeptTypeAndRoleId" }),
          this.$businessCode.sqgl
        )
        .then(res => {
          console.log(res, "resres");
          console.log("resresdata", res.data.unitCode);
          if (res && res.success) {
            //this.fromdata.beAuthDeptName = names;
            this.fromdata.beAuthDeptId = res.data.unitCode;
            this.fromdata.authDeptName = this.fromdata.beAuthDeptName =
              (res.data && res.data.unitName) || "";
          }
        });
    },
    update() {
      let obj = {
        function: "updateTotodorecord",
        dataId: this.bank_dispach.id,
        humanId: this.userid,
        updateFlag: 1,
        readFlag: 1,
        todoFlag: 1
      };
      this.$post
        .postData(
          "updateTotodorecord",
          JSON.stringify(obj),
          this.$businessCode.dbgl
        )
        .then(res => {
          if (res && res.success) {
          }
        });
    },
    processSheet() {
      this.preserve().then(save => {
        if(save){
          const routeData = this.$router.resolve({
            path: "/zhuanshouqPrint",
            query: {
              id: this.bank_dispach.id
            }
          });
          window.open(routeData.href, "_blank");
        }
      });

      // const routeData = this.$router.resolve({
      //     path: "/zhuanshouqPrint",
      //     query: {
      //       id: this.bank_dispach.id
      //     }
      //   });
      // window.open(routeData.href, "_blank");
      // this.preserve().then(save => {
      //   const routeData = this.$router.resolve({
      //       path: "/zhuanshouqPrint",
      //       query: {
      //         id: this.bank_dispach.id
      //       }
      //     });
      //   window.open(routeData.href, "_blank");
      // })
    }
  },
  created() {
    this.getMukuai();
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.unitCode = this.subAddConfig.unitId = this.shouQuanNewId = this.$route.query.unitCode;

    this.treeTradeCode = this.$businessCode.sqgl;
    this.uploadConfig.code = this.$businessCode.sqglfj;
    this.uploadConfig.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.state = this.$route.query.state > 1 ? true : false;
    this.toEdit();
    this.nowTime = dateFormate.date(
      Date.parse(new Date()),
      "YYYY-MM-DD HH:mm:ss"
    );
    this.userid = this.$route.query.userid;
    if (this.$route.query.type == "0") {
      this.update();
    }
    this.isSj = this.$route.query.isSj ? this.$route.query.isSj : "";
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
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
    visibility: hidden;
    width: 180px;
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

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
          right: 10px;
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

    el-form-item {
      margin: 10px 0;
    }
  }
  /deep/.el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #606266;
  }
  //  /deep/.el-radio__input.is-disabled+span.el-radio__label{
  //    color: #606266;
  //  }
  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.tit1 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.btnbox {
  padding: 10px 200px;
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
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
.pos_r {
  position: relative;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}
.disable_w {
  width: 100%;
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

.pr45 {
  padding-right: 45px;
}
</style>
