<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain @click="preserve('save')">保存</el-button>
          <el-button plain @click="completeSending">完成并发送</el-button>
          <el-button plain @click="drafting">起草正文</el-button>
          <el-button plain @click="delectArticle">删除此文</el-button>
          <el-button plain @click="collect">收藏</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <el-button plain @click="processSheet">打印处理单</el-button>
          <el-button plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行电子收回单（商密）</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#sssm' ? 'active' : ''"
          @click="toTarget('#sssm')"
        >收文说明</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前环节：
              <span>{{fromdata.currentNode}}</span>
            </p>
            <p class="bank_dispach_annotation_current" style="width:88%;">
              当前处理人：
              <span>{{fromdata.currentUser}}</span>
            </p>
            <el-button size="small" class="bank_article_illustrates" @click="handleExplain">办文说明</el-button>
          </div>
          <el-form
            ref="fromdata"
            disabled="disabled"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发文字号" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.documentNo" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿单位">
                    <el-input v-model="fromdata.unionDepartment"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="拟稿人"
                    prop="draftUser"
                    ref="draftUser"
                    :disabled="fromdata.state==1"
                  >
                    <el-input v-model="fromdata.draftUser"></el-input>
                  </el-form-item>
                </el-col>
      
                <el-col >
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" placeholder="请输入正文标题"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input v-model="fromdata.attachTitle" type="textarea" placeholder="请输入附件标题"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 收文说明 -->
            <h6 class="bank_dispach_file_tit">收文说明</h6>
            <div id="sssm" class="height_90"></div>
            <div>
              <el-row>
                <el-col span="8">
                  <el-form-item label="收回单位">
                    <el-input
                      v-model="fromdata.signDepartment"
                      placeholder="请选择会签部门"
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="收回人">
                    <el-input v-model="fromdata.outsideSign"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="收回时间">
                    <el-input v-model="fromdata.time"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="被收回单位">
                    <el-input v-model="fromdata.time"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="16">
                  <el-form-item label="被收回部门">
                    <el-input v-model="fromdata.time"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="收回原因">
                    <el-input  type="textarea" v-model="fromdata.time"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showExplain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="办文说明"
    >
      <el-input type="textarea"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>

    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>
  </div>
</template>

<script>
import loadAccessory from "../../../components/LoadAccessory/LoadAccessory";
import timeDialog from "../../../components/timedialog/timedialog";
import treeCofig from "../../../components/tree/tree-fawen";
import secretBasls from "../../../components/secretBasls/secretBasls";
import appendWriteList from "../../../components/appendWriteList/appendWriteList";

import http from "@/http/http";
export default {
  name: "App",
  components: {
    loadAccessory,
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList
  },
  data() {
    return {
      bank_cklc: {
        function: "getHistory",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      //秘密期限类型
      flag: true,
      // 秘密标志
      secretflag: true,
      secretTypeflag: false,
      // 定密依弹窗
      secretDialog: true,
      //确定完成并发送
      bank_doSend: {
        function: "doSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "252329e6-a7aa-45fb-839d-c20c8595e930",
        curTplNo: "testOA7ID",
        curMultiTenancyId: "CN000"
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        curTplNo: "testOA3ID",
        curMultiTenancyId: "CN000"
      },
      //input框内容
      bank_dispach: {
        function: "toEdit",
        id: ""
        // id: "1"
      },
      //下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam",
        organizationId: ""
        // organizationId: "2ec81dcb-9ed5-443a-a7e7-314ae0537478"
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: "行发文"
      },
      //提交
      bank_addToSendOrder: {
        function: "addToSendOrder",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
      },
      //主送、抄送
      bank_main: {
        function: "getTcPriDeliveryDic",
        organizationId: "root"
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      fromdata: {
        function: "",
        attachTitle: "",
        businessType: "",
        canNotShouHuiIds: "",
        comments: "",
        commentsList: "",
        copy: "",
        copyIds: "",
        currentDate: "",
        currentNode: "",
        currentNodeId: "",
        currentTime: "",
        currentUser: "",
        documentNo: "",
        draftDepartment: "",
        draftDepartmentId: "",
        draftOrgan: "",
        draftOrganId: "",
        draftTime: "",
        draftUser: "",
        draftUserId: "",
        emergencyLevel: "",
        exceedWordReason: "",
        haveRead: "",
        draftOrgan: "",
        inline: "",
        inlineIds: "",
        isArtificial: "",
        isBack: "",
        isCanDelete: "",
        isClear: "",
        isDirect: "",
        isHasDocumentNo: "",
        isHasRedHead: "",
        isRepeat: "",
        isSeparate: "",
        isSign: false,
        isSignOver: "",
        isStandardFile: "",
        isWithdraw: "",
        keepLimit: "",
        knowScore: "",
        lawDepartment: "",
        main: "",
        mainIds: "",
        meetingEndTime: "",
        opinionCheck: "",
        opinionCheckList: "",
        opinionDrafList: "",
        opinionSendList: "",
        opinionSignList: "",
        outsideSign: "",
        phone: "",
        realCopy: "",
        realInline: "",
        realMain: "",
        reasonLimit: "",
        reasonList: "",
        redHead: "",
        secretFlag: "",
        secretFlagContent: "",
        secretFlagType: "",
        secretGists: "",
        secretLimitType: "",
        secretTimeType: "",
        secretType: "",
        sendBasis: "",
        sendTime: "",
        sendUnitName: "",
        sequenceSign: "",
        shenpiConfigId: "",
        shenpiTitle: "",
        signDepartment: "",
        signDepartmentIds: "",
        signSequence: "",
        tel: "",
        textType: "",
        title: "",
        type: "",
        unionDepartment: "",
        updateTime: "",
        userRange: "",
        workSecretFlag: "",
        workflowId: "",
        eleSendSecretType: ""
      },
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
      SsecretTimeType: [],
      SsecretFlagType: [],
      SsecretFlagContent: [],
      SdirectRange: [],
      SdirectType: [],
      SsignDepartment: [],
      Smain: [],
      Scopy: [],
      Sinline: [],
      SkeepLimit: [],
      SworkSecretFlag: [],
      imageUrl: "",
      fileList: [],
      tableData: [
        { date: "处理环节", fileId: "date", title: "center", tache: "1" },
        { date: "处理环节", fileId: "date", title: "center", tache: "1" }
      ],

      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
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
      baoWenZiDuan: "A08461302",
      appendWriteDialog: true,
      clickTypes: 1
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_sssm = document.querySelector("#sssm").offsetTop - 60;
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
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(",");
      names = name.split(",");
      ids.map((item, n) => {
        obj.push({
          id: item,
          text: names[n]
        });
      });
      return obj;
    },
    secretTypechange(value) {
      if (value == "商业秘密") {
        this.flag = true;
        this.secretflag = true;
        this.secretTypeflag = false;
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitType = "";
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitType = "";
      } else {
        this.flag = false;
        this.secretflag = false;
        this.secretTypeflag = false;
      }
    },
    //定密依据接收子组件传值
    savesecretBaslsvalue(data) {
      this.fromdata.secretGists = data;
      this.$forceUpdate();
    },
    //定密依据弹窗弹出
    secretGistsbox() {
      this.secretDialog = true;
      this.$nextTick(() => {
        this.$refs.arr.openDialog();
      });
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "zhusong":
          this.checkIds = this.fromdata.mainIds
            ? this.fromdata.mainIds.split(",")
            : [];
          this.checkData = this.zhuCheckData;
          break;
        case "chao":
          this.checkIds = this.fromdata.copyIds
            ? this.fromdata.copyIds.split(",")
            : [];
          this.checkData = this.chaoCheckData;
          break;
        case "hui":
          this.checkIds = this.fromdata.signDepartmentIds
            ? this.fromdata.signDepartmentIds.split(",")
            : [];
          this.checkData = this.huiCheckData;
          break;
        case "ben":
          this.checkIds = this.fromdata.inlineIds
            ? this.fromdata.inlineIds.split(",")
            : [];
          this.checkData = this.benCheckData;
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
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
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(",");
          ids = ids.join(",");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (type) {
          case "zhusong":
            this.fromdata.main = names;
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            break;
          case "chao":
            this.fromdata.copy = names;
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
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
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogType);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.fromdata, this.bank_doSend);
      this.$post
        .postData("doSend", JSON.stringify(params), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
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
    //点击 完成并发送 弹窗弹出
    completeSending() {
      if (!this.bank_doSend.id) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请先保存数据",
          duration: 1000
        });
        return;
      }
      this.preserve();
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.baoWenZiDuan
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
              this.baoWenZiDuan
            )
            .then(res => {
              console.log("树" + res.data);
              this.treeData = res.data;
            })
            .catch(e => {
              console.log(e);
            });
        });
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      console.log(this.fromdata.main);
      this.$refs.fromdata.validate((valid, object) => {
        if (valid) {
          return true;
        } else {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          return true;
        }
      });
    },
    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      this.scrollIntoForm();
      if (!this.flag) {
        if (!this.secretLimitType) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: tips,
            duration: 1000
          });
          return false;
        }
      }
      if (
        !this.fromdata.type ||
        !this.fromdata.redHead ||
        !this.fromdata.documentNo ||
        !this.fromdata.businessType ||
        !this.fromdata.textType ||
        !this.fromdata.secretType ||
        !this.fromdata.draftOrgan ||
        !this.fromdata.phone ||
        !this.fromdata.isDirect ||
        !this.fromdata.userRange ||
        !this.fromdata.title ||
        !this.fromdata.isStandardFile ||
        !this.fromdata.keepLimit
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      } else {
        if (!regT.test(this.fromdata.phone)) {
          tips = "电话号码输入有误";
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: tips,
            duration: 1000
          });
          return false;
        } else {
          return true;
        }
      }
    },
    //主送
    bankmain(n) {
      let name = "";
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
        case "hui":
          name = "会签";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "dosend":
          name = "完成并发送";
          break;
      }
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogType = n;
      if (n === "hui") {
        this.hasRadio = true;
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.showCompDialog();
      this.$post
        .postData(
          "getTcPriDeliveryDic",
          JSON.stringify(this.bank_main),
          this.baoWenZiDuan
        )
        .then(res => {
          console.log(JSON.stringify(res.data));
          this.treeData = (res && res.data) || [];
          if (this.treeData.length) {
            this.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (n === "hui") {
                item.text = item.typeName;
              }
            });
          }
        });
    },
    // 下拉列表
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.baoWenZiDuan
        )
        .then(res => {
          this.SsendType = JSON.parse(res.data.sendType);
          this.SemergencyLevel = JSON.parse(res.data.emergencyLevel);
          this.SbusinessType = JSON.parse(res.data.businessType);
          this.StextType = JSON.parse(res.data.textType);
          this.SsecretType = JSON.parse(res.data.eleSendSecretType);
          this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          this.SdirectRange = JSON.parse(res.data.directSendRange);
          this.SdirectType = JSON.parse(res.data.directSendType);
          this.SkeepLimit = JSON.parse(res.data.eleSendSecretLimit);
          this.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          if (res.data.signDepartmentIds) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentIds,
              res.data.signDepartment
            );
          }
          if (res.data.copyIds) {
            this.chaoCheckData = this.concatTreeData(
              res.data.copyIds,
              res.data.copy
            );
          }
          if (res.data.inlineIds) {
            this.benCheckData = this.concatTreeData(
              res.data.inlineIds,
              res.data.inline
            );
          }
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEdit() {
      this.bank_dispach.id = localStorage.getItem('pageid') || '';
      console.log(this.bank_dispach);
      let that = this;

      this.$post
        .postData(
          "toEdit",
          JSON.stringify(this.bank_dispach),
          this.baoWenZiDuan
        )
        .then(res => {
          that.fromdata = res.data;
          that.fromdata.opinionCheckList =
            res.data &&
            res.data.opinionCheckList &&
            JSON.parse(res.data.opinionCheckList);
          that.fromdata.opinionDrafList =
            res.data &&
            res.data.opinionDrafList &&
            JSON.parse(res.data.opinionDrafList);
          that.fromdata.opinionSendList =
            res.data &&
            res.data.opinionSendList &&
            JSON.parse(res.data.opinionSendList);
          that.fromdata.opinionSignList =
            res.data &&
            res.data.opinionSignList &&
            JSON.parse(res.data.opinionSignList);
        });
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.baoWenZiDuan
        )
        .then(res => {
          if (res.data) {
            this.SredHead = res.data;
          }
        });
    },

    // 代字/红头  下拉 发文字号获取值
    selectredhead(redHeadITEM) {
      this.fromdata.documentNo = redHeadITEM;
    },
    // 保存
    preserve(type) {
            this.bank_dispach.id = localStorage.getItem('pageid') || "";

      var obj = Object.assign(this.fromdata, this.bank_addToSendOrder);
      console.log(this.bank_addToSendOrder.id);
      this.$post
        .postData("addToSendOrder", JSON.stringify(obj), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            localStorage.setItem('pageid',res.data.id);

            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
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

      if (scrolled < this.distance_sssm) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_sssm &&
        scrolled < this.distance_qpyj - 180
      ) {
        this.active = "#sssm";
      }
    },
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.preserve();
          this.goBack();
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 1000
          });
        });
    },

    // 起草正文
    drafting() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    // 删除此文
    delectArticle() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    // 收藏
    collect() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      // this.$nextTick(() => {
      //   this.$refs.dialogLine.openDialog();
      // });
      console.log(11);
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      console.log(this.bank_cklc);

      this.$post
        .postData(
          "getHistory",
          JSON.stringify(this.bank_cklc),
          this.baoWenZiDuan
        )
        .then(res => {
          if (res) {
            console.log(res);
          }
        });
    },
    // 打印处理单
    processSheet() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    // 操作指南
    instructions() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    // 办文说明
    handleExplain() {
      this.showExplain = true;
    },
    handleSave() {},
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //定密依据接收子组件传值
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
    //删除意见
    deletService(type, n) {
      if (type === "qianfa") {
        this.fromdata.opinionSendList.splice(n, 1);
      } else if (type === "hegao") {
        this.fromdata.opinionDrafList.splice(n, 1);
      } else if (type === "huiqian") {
        this.fromdata.opinionSignList.splice(n, 1);
      }
    }
  },
  created() {
    //初始化加载数据
    this.bank_dispach.id = this.bank_doSend.id = this.$route.query.id
      ? this.$route.query.id
      : "";

    this.toEdit();
    this.getSendOrderDicByParam();
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

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
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
</style>
