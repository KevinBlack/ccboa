<template>
  <div class="sealKeeperChangeForm">
    <div class="headerClick">
      <div class="right">
        <el-button
          @click="closeData"
          v-if="this.$route.query.type=='see'||this.$route.query.type=='banjie'"
          class="bank_grid_comtent_active"
        >关闭</el-button>
        <el-button
          @click="headerBtnClick('查看流程')"
          v-if="this.$route.query.type=='see'||this.$route.query.type=='banjie'"
          class="bank_grid_comtent_active"
        >查看流程</el-button>
        <el-button
          @click="headerBtnClick('打印处理单')"
          v-if="this.$route.query.type=='see'||this.$route.query.type=='banjie'"
          class="bank_grid_comtent_active"
        >打印处理单</el-button>
        <el-button
          @click="headerBtnClick('收藏')"
          v-if="this.$route.query.type=='see'||this.$route.query.type=='banjie'"
          class="bank_grid_comtent_active"
        >收藏</el-button>
        <el-button
          @click="headerBtnClick('收回')"
          v-if="this.$route.query.type=='see'&&ifShouHui=='1'"
          class="bank_grid_comtent_active"
        >收回</el-button>
        <div v-if="this.$route.query.type=='modify'||this.$route.query.type=='new'">
          <el-button
            class="bank_grid_comtent_active"
            v-for="(item,index) in buttonList"
            v-show="item.show"
            @click="headerBtnClick(item.name)"
            :key="index"
            plain
          >{{item.name}}</el-button>

          <!-- <el-button @click="headerBtnClick('打印处理单')" class="bank_grid_comtent_active">打印处理单</el-button> -->
        </div>
      </div>
    </div>
    <div class="formHeader" style="margin: 50px 0 50px 0;">
      <div class="shiwuTitle">{{form && form.draftOrgan ? form.draftOrgan : unitName }}印章保管交接处理单</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <el-form
        ref="elForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="drafting-mainform"
      >
        <el-row class="box" :span="24">
          <el-col :span="12">
            <el-form-item label="当前环节:" label-width="90px">
              <span style="color: red">{{form.currentNode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前处理人:" label-width="100px">
              <span style="color: red">{{ currentUserNames }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="交接类型" prop="jiaojieType" ref="jiaojieType">
              <el-radio-group
                v-model="form.jiaojieType"
                :disabled="readFields.jjlx||this.$route.query.type=='banjie'"
                @change="jiaojType"
              >
                <el-radio label="51">日常</el-radio>
                <el-radio label="52">岗位</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号" prop="documentCode" ref="documentCode">
              <el-input
                v-model="form.documentCode"
                :disabled="readFields.bh||this.$route.query.type=='banjie'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="印章名称" prop="title" ref="title">
              <el-select
                v-model="form.titles"
                :disabled="readFields.yzmc||this.$route.query.type=='banjie'"
                filterable
                multiple
                placeholder="请选择"
                style="width:100%"
                @change="getPersonList"
                @visible-change="yzmCbtn"
              >
                <el-option
                  v-for="item in allSeals"
                  :key="item.id"
                  :label="item.yzJiancheng"
                  :value="item.id"
                ></el-option>
              </el-select>
              <!-- <el-input
                v-model="form.title"
                :disabled="readFields.lxdh||this.$route.query.type=='banjie'"
              ></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone" ref="phone">
              <el-input
                v-model="form.phone"
                :disabled="readFields.lxdh||this.$route.query.type=='banjie'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="移交人" prop="creator" ref="creator">
              <el-input v-model="form.creator" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拟稿日期" prop="cdate" ref="cdate">
              <el-input v-model="form.cdate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="接收人" prop="chineseNodeUserId" ref="chineseNodeUserId">
              <el-select
                v-model="form.chineseNodeUser"
                @change="getchineseUser"
                @visible-change="hasTitleId"
                filterable
                placeholder="请选择"
                style="width:100%"
                :disabled="readFields.jsr||this.$route.query.type=='banjie'"
              >
                <el-option
                  v-for="item in receiveMans"
                  :key="item.id"
                  :label="item.chineseNodeUser"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交出时间" prop="jiaochuTime" ref="jiaochuTime">
              <el-input v-model="form.jiaochuTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="交出原因" prop="reason" ref="reason">
          <el-input
            v-model="form.reason"
            :disabled="readFields.jcyy||this.$route.query.type=='banjie'"
          ></el-input>
        </el-form-item>

        <el-form-item label="审批意见" prop="fzIdea" ref="fzIdea">
          <!-- <el-input
            v-model="form.fzIdea"
            :disabled="editedIdeaFields.spyj"
            type="textarea"
            maxlength="500"
          ></el-input>-->
          <el-input
            v-if="
                  !editedIdeaFields.spyj || !(form.fzIdeas && form.fzIdeas.length != 0)
                "
            type="textarea"
            v-model="form.fzIdea"
            resize="none"
            maxlength="500"
            show-word-limit
            :disabled="editedIdeaFields.spyj||this.$route.query.type=='banjie'"
          ></el-input>
          <div class="d_flex">
            <el-row class="d_b100" style="margin: 5px 0;">
              <el-col
                :span="24"
                style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                v-for="(item, index) in form.fzIdeas"
                :key="index"
              >
                <div class="br">{{ item.nr }}</div>
                <div class="adviceInfo">
                  <span>{{ item.lk }}</span>
                  <br />
                  <span>{{ item.ct }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="接收人确认" v-if="form.jyBjs!==undefined&&form.jyBjs.length>0">
          <div class="d_flex">
            <el-row class="d_b100" style="margin: 5px 0;">
              <el-col
                :span="24"
                style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                v-for="(item, index) in form.jyBjs"
                :key="index"
              >
                <div class="br">
                  <span>
                    <el-checkbox v-model="checked1" :disabled="true">{{item.nr}}</el-checkbox>
                  </span>
                  <div>{{item.nr}}</div>
                </div>
                <div class="adviceInfo">
                  <span>{{ item.lk }}</span>
                  <br />
                  <span>{{ item.ct }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="接收人确认" prop="jyBj" ref="jyBj" v-else>
          <el-checkbox
            v-model="checked"
            :disabled="readFields.jyBj||this.$route.query.type=='banjie'"
          >同意接收</el-checkbox>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-if="
                  !editedIdeaFields.remark || !(form.remarks &&form.remarks.length != 0)
                "
            type="textarea"
            v-model="form.remark"
            resize="none"
            maxlength="500"
            show-word-limit
            :disabled="editedIdeaFields.remark||this.$route.query.type=='banjie'"
          ></el-input>
          <div class="d_flex">
            <el-row class="d_b100" style="margin: 5px 0;">
              <el-col
                :span="24"
                style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                v-for="(item, index) in form.remarks"
                :key="index"
              >
                <div class="br">{{ item.nr }}</div>
                <div class="adviceInfo">
                  <span>{{ item.lk }}</span>
                  <br />
                  <span>{{ item.ct }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 编号弹窗 -->
    <bian-hao
      :fileNo="fileNo"
      @isok="isok"
      :isShow="bianshow"
      @isclose="isclose"
      :kongQuelist="kongQuelist"
    ></bian-hao>
    <!-- 查看流程组件 -->
    <shiwu-flow :tableData="doneProgressList" ref="dialogLine"></shiwu-flow>
    <!-- 完成并发送选人组件 -->
    <div class="myselectperson">
      <select-person
        :treeData="treeData"
        :canTab="canTab"
        :loadingTree="loadingTree"
        :hasRadio="hasRadio"
        :checkOrg="checkOrg"
        :offenUse="offenUse"
        :dialogType="dialogType"
        :seletOptionsData="seletOptionsData"
        :dialogTypeNow="dialogTypeNow"
        :dialogTit="dialogTit"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        :fromdata="form"
        :treeTradeCode="treeTradeCode"
        @showCompDialog="showCompDialog"
      ></select-person>
    </div>
  </div>
</template>

<script>
// 设置页面元素显隐、置灰、校验等功能，
import pageSetMixins from "@/minixs/index";
// 添加message-one和message-some组件需要用到的方法
import messageMixins from "@/minixs/messageMixins.js";
// 导入选人组件（完成并发送时使用）
import selectPerson from "components/tree/treeTansun";
// 查看流程组件
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
//编号控制
import bianHao from "@/components/createDocumentNo/bianHao";
import shiwuLineWord from "@/minixs/shiwuLineWord";

import viewDraft from "@/minixs/viewDraft";

import minixs from "@/minixs/index";

import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "sealKeeperChangeForm",
  components: {
    "select-person": selectPerson,
    "shiwu-flow": shiwuFlow,
    bianHao
  },
  mixins: [pageSetMixins, messageMixins, shiwuLineWord,minixs,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data: function data() {
    return {
      numYears:this.$route.query.numYear ?this.$route.query.numYear: "",
      // 当前处理人
      currentUserNames:"",
      zsqr:"",
      newArr: [],
      ifShouHui: "", //判断是否打开过
      bianshow: false,
      kongQuelist: [], //空缺文号
      fileNo: "", //当前文号
      workflowId: "", //查看流程id
      doneProgressList: [],
      documentNoNum1: "1",
      checked: false,
      checked1: true, //
      buttonList: [
        { name: "关闭", type: "close" },
        { name: "保存", type: "save" },
        { name: "完成并发送", type: "saveAndSend" },
        { name: "生成编号", type: "scbh" },
        { name: "删除此文", type: "sccw" },
        { name: "办结", type: "banjie" },
        { name: "查看流程", type: "flowLook" },
        { name: "打印处理单", type: "dycld" },
        { name: "收藏", type: "shoucang" }
      ],
      allSeals: [], //全部印章
      //单位名称
      unitName: JSON.parse(localStorage.userInfo).unitName,
      receiveMans: [],
      // 完成并发送相关参数
      singelCheckF: true, // 单选，多选标志。true-单选 false-多选
      dialogTypeNow: "next",
      dialogType: "dosend",
      offenUse: true,
      loadingTree: true,
      canTab: false,
      // loadingTree: true,      // 是懒加载还是非懒加载
      hasRadio: false, // 是否单选
      checkOrg: false,
      seletOptionsData: [], // 环节
      treeData: [], // 部门（人员树）
      dialogTit: "选择人员",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      treeTradeCode: this.$businessCode.swglgg, // 发文交易线，如果不设置就为默认的2023的交易线，设置了值就用设置的交易线
      //表单数据
      form: {
        id: "",
        draftDepartment: !!JSON.parse(
          localStorage.getItem("sealKeeperChangeList")
        )
          ? JSON.parse(localStorage.getItem("sealKeeperChangeList"))
              .currUnitName
          : "", //拟稿部门名称
        draftDepartmentId: JSON.parse(
          localStorage.getItem("sealKeeperChangeList")
        )
          ? JSON.parse(localStorage.getItem("sealKeeperChangeList")).currUnitId
          : "", //拟稿部门ID
        draftOrgan: JSON.parse(localStorage.getItem("sealKeeperChangeList"))
          ? JSON.parse(localStorage.getItem("sealKeeperChangeList")).unitName
          : "", //拟稿机构简称
        draftOrganId: JSON.parse(localStorage.getItem("sealKeeperChangeList"))
          ? JSON.parse(localStorage.getItem("sealKeeperChangeList")).unitId
          : "", //拟稿机构ID
        workflowId: "", //流程ID
        currentNode: "起草", //当前环节名称
        currentNodeId: "", //当前环节节点ID
        currentUser: JSON.parse(localStorage.userInfo).humanName, //当前处理人中文名
        currentUserId: JSON.parse(localStorage.userInfo).humanId, //当前处理人ID
        title: [], //印章名称
        titleId: [],
        documentCode: "", // 编号
        jiaojieType: "", // 交接类型
        phone: "", // 联系电话
        creatorId: "", // 移交人
        creator: "", // 移交人名称
        cdate: "", // 拟稿日期
        chineseNodeUserId: "", // 接收人
        chineseNodeUser: "", // 接收人名称
        jiaochuTime: "", // 交出时间
        reason: "", // 交出原因
        fzIdea: "", // 审批意见
        remark: "", // 备注
        fzIdea: "", //审批意见
        jyBj: "", //接收人确认
        flIdea: "",
        FLidea: "",
        spr: "", //批准人
        isTxTime: "", //是否填写交接时间
        sealCustodianPerson: "" //根据印章取实际保管人（完成并发送校验用）
      },
      readFields: {
        yzmc: false, //印章名称
        bh: false, //编号
        jjlx: false, //交接类型
        lxdh: false, //联系电话
        yjr: false, //移交人
        ngrq: false, //拟搞日期
        jsr: false, //接收人
        jcsj: false, //交出时间
        jcyy: false, //交出原因
        spyj: false, //审批意见
        remark: false //备注
      }, // 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
      requiredFields: {
        yzmc: false, //印章名称
        bh: false, //编号
        jjlx: false, //交接类型
        lxdh: false, //联系电话
        yjr: false, //移交人
        ngrq: false, //拟搞日期
        jsr: false, //接收人
        jcsj: false, //交出时间
        jcyy: false, //交出原因
        jyBj: false
      }, // 必填的控制域。在rules中配置。设置了的为true
      editedIdeaFields: {
        spyj: true, //审批意见
        remark: true //备注
      }, // 可编辑意见域。设置元素的disabled属性，设置了的为false。我最后又取反了一次，让其与语义相同。(同readFields相反，我也很恼火)
      requiredIdeaFields: {
        spyj: false, //审批意见
        remark: false //备注
      }, // 必填意见域。在rules中配置。设置了的为true
      stepMessage: {
        /* 按钮 */
        visibleButtons: [], // 可见操作按钮
        visibleButtonsBycondition: {}, // 带约束条件的可见操作按钮
        /* 控制域 */
        requiredFields: [], // 必填控制域
        readFields: [], // 不可编辑控制域
        /* 意见域 */
        editedIdeaFields: [], // 可编辑意见域
        editedIdeaFieldsBycondition: {}, // 带约束条件的可编辑意见域
        requiredIdeaFields: [] // 必填意见域
      }, // 某环节的页面配置原始数据
      finalDocStatus: "see", // 最终的页面状态 new-新建 modify-编辑 see-查看 managerModify-管理员编辑
      aplyId: "", //保管交接申请业务编号
      rules: {},
      typeS: ""
    };
  },
  computed: {},
  watch: {
    checked(val, oldval) {
      console.log(val, oldval);
      
      if (val) {
        this.form.jyBj = "同意接收";
      } else {
        this.form.jyBj = "";
      }

      console.log(val, 'test')
    }
  },
  created: function() {
    if (this.$route.query.type == "see") {
      for (const key in this.readFields) {
        if (this.readFields.hasOwnProperty(key)) {
          this.readFields[key] = true;
        }
      }
      for (const key in this.editedIdeaFields) {
        if (this.editedIdeaFields.hasOwnProperty(key)) {
          this.editedIdeaFields[key] = true;
        }
      }
    }
    //将登录人员的12位机构号转为9位并存储到localStorage里
    this.$sealUtil.setUnitSyncCodeToLocalStorage(this);

    this.docStatus = this.$route.query.type || "see"; // 文档状态 new-新建 modify-编辑 see-查看
    this.finalDocStatus = this.docStatus; // 文档的最终状态

    //获取印章名称

    if (this.$route.query.id) {
      //非起草
      this.form.id = this.aplyId = this.$route.query.id; //业务编号
      //
      this.initProcessRules(this.form.id);
      //查询数据详情
      this.getDetail();
    } else {
      // this.getregName();
      //移交人
      console.log(JSON.parse(localStorage.userInfo));
      this.form.creatorId = JSON.parse(localStorage.userInfo).humanId;

      this.form.creator = JSON.parse(localStorage.userInfo).humanName;
      this.currentUserNames = JSON.parse(localStorage.userInfo).humanName;
      //联系电话
      this.form.phone = JSON.parse(
        localStorage.getItem("sealKeeperChangeList")
      ).telMobile;
      //调用编号接口
      this.$api.sealManage
        .getSealNum({
          markOrderType: "9",
          statusType: false,
          draftDepartmentId: this.form.draftDepartmentId
        })
        .then(res => {
          console.log(res, "编号");
          this.$set(this.form, "documentCode", res.data);
          this.form.cdate = res.newDate;
        });

      this.initProcessRules("");
    }
  },
  methods: {
    isok(val) {
      console.log("w2", val);
      this.getAplyID(val);
      // this.generateNumber(val);
    },
    isclose() {
      this.bianshow = false;
    },
    jiaojType(val) {
      console.log(val);
      this.form.title = "";
      this.form.titleId = '';
      this.typeS = val;
      this.form.chineseNodeUser = "";
      this.form.chineseNodeUserId = "";
      this.getregName(val,false);
    },
    closeData() {
      this.$intent.closeWindow(this);
    },
    //获取印章名称
    getregName(type,flag) {
      this.$api.sealManage.sealCommon
        .searchSealKeeperChange({ jiaojieType: type })
        .then(res => {
          console.log("印章名称数据：", res, this.form);
          this.allSeals = res.list;
          //获取不到章用详情返回
          if (this.form.id&&flag) {
            let arr1 = this.form.title.split(","); //名称
            let arr2 = this.form.titleId.split(","); //id
            console.log(arr1, arr2);
            //没有章时获取详情起草的章 、Id
            this.allSeals = arr1.map((yzJiancheng, i) => ({
              yzJiancheng,
              id: arr2[i]
            }));
            console.log(this.newArr, "dd222");

          }
           if(this.form.titleId.length==0){//空字符
            this.getPersonList([]);

          }else{
            this.getPersonList(this.form.titleId.split(","));

          }

        })
        .catch(err => {
          console.log("印章名称报错：", err);
        });
    },
    yzmCbtn(val) {
      console.log(val);
      if (val && this.form.jiaojieType == "") {
        this.$message({
          message: "请勾选交接类型",
          type: "warning"
        });
      }
    },
    //获取印章保管人
    getPersonList(val) {
      console.log(val, "222", this.typeS, this.allSeals);
      this.form.title = val;
      this.form.titleId = val.join(",");
      this.$api.sealManage.sealCommon
        .searchKeeperSealKeeperChange({
          regId: val.join(","),
          type: this.typeS || this.form.jiaojieType
        })
        .then(res => {
          console.log("印章保管人数据：", res);
          this.receiveMans = res.list;
        })
        .catch(err => {
          console.log("印章保管人查询报错：", err);
        });
    },
    hasTitleId(val) {
      console.log(val, this.form.titleId);
      if (val && this.form.titleId.length == 0) {
        this.$message({
          message: "请先选择印章名称",
          type: "warning"
        });
      }
      return;
    },
    getchineseUser(val) {
      console.log(val);
      this.form.chineseNodeUser = val.chineseNodeUser;
      this.form.chineseNodeUserId = val.draftUserId;
    },
    // 打印处理单
    printForm() {
      this.$intent.goNewPage(this, {
        path: "/sealManage/useSeal/draft/common/BG",
        query: {
          id: this.$route.query.id ? this.$route.query.id : this.form.id,
          numYear: this.numYears
        }
      });
    },
    getDetail() {
      let self = this;
      this.$api.sealManage.sealCommon
        .getKeeperSealKeeperChangeDetail({ id: this.form.id,numYear:this.numYears })
        .then(res => {
          console.log("详情数据：", res);
          this.zsqr = res.zsqr;
          // res.data.documentNo = res.data.documentNo || res.data.documentCode;
          this.ifShouHui = res.ifShouHui;
          this.form = res.data;
          this.form.titles = res.data.title.split(',');
          // this.currentUserNames = res.data.currentUser

          this.workflowId = res.data.workflowId;
          console.log(this.form.jyBj, "this.form.jyBj");
          if (res.data.authUserId) {
            this.currentUserNames =
              res.data.authUserName + "（由" + this.form.currentUser + "授权）";
          } else {
            this.currentUserNames = res.data.currentUser;
          }
          if (this.form.jyBj == "同意接收") {
            this.checked = true;
          } else {
            this.checked = false;
          }
          this.form.jiaochuTime = res.data.finishTime;
          this.backFlag1 = res.backFlag1;
          if (res.data.documentCode) {
            let As = res.data.documentCode.split("〕")[1];
            console.log("true", As);

            if (As === "号") {
              this.documentNoNum1 = "1";
            } else {
              this.documentNoNum1 = "2";
            }
          }

          if(this.form.currentNode=='起草'){
          this.getregName(res.data.jiaojieType,false);
          } else{
            this.getregName(res.data.jiaojieType,true);
          }
          // this.getPersonList(res.data.titleId.split(","));

          this.initProcessRules(res.data.id);
        })
        .catch(err => {
          console.log("详情报错：", err);
        });
    },
    //取得编号
    getAplyID(val) {
      let self = this;
      this.$api.sealManage.sealCommon
        .getNumSealKeeperChange({
          statusType: true,
          markOrderType: "9",
          id: this.form.id,
          draftDepartmentId: this.form.draftDepartmentId,
          draftOrganId: this.form.draftOrganId,
          fileNo: val
        })
        .then(res => {
          console.log("生成的编号：", res, this);
          this.form.documentCode = res.data;
          this.documentNoNum1 = "2";
          this.$message({
            message: "生成编号成功",
            type: "success"
          });
          this.saveAddData().then(res => {
            self.getDetail();
          });
          this.bianshow = false;
        })
        .catch(err => {
          console.log("生成编号报错：", err);
        });
    },
    //办结
    toEnd() {
      let that = this;
      this.saveAddData()
        .then(res => {
          this.$api.sealManage.sealCommon
            .wcbfssSealKeeperChange({ over: true, id: this.form.id })
            .then(res => {
              console.log("办结数据：", res);
              this.$message({
                message: "办结成功!",
                type: "success"
              });
              this.$intent.closeWindow(this);
            })
            .catch(err => {
              console.log("办结报错：", err);
            });
        })
        .catch(err => {
          console.log("印章保管交接数据存档报错：", err);
        });
    },
    // 查看（已完成的）流程
    toSeeDoneProcess() {
      if (this.workflowId === "" || this.workflowId == undefined) {
        this.doneProgressList = [
          {
            DSC: "", // 处理记录
            EXCNM: JSON.parse(localStorage.userInfo).humanName, // 处理人的名字
            HUMANCODE: JSON.parse(localStorage.userInfo).syncHumanCode, // 处理人的编号
            NODE: "起草（新建）", // 环节
            TM: this.form.cdate // 操作/申请时间
          }
        ];
        this.$refs.dialogLine.openDialog();
        return;
      }
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.workflowId,
          numYear: this.numYears
        })
        .then(res => {
          console.log(res);
          this.doneProgressList = res.data;
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        });
    },
    // 选人完成后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log(
        "完成并发送选人data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        let id_name = [];
        data &&
          data.map(item => {
            chooseDataName.push(item.name);
            chooseDataId.push(item.id);
          });
        this.form.nextAvyName = params.name;
        this.form.nextAvyId = params.id;
        this.form.nextUserName = chooseDataName.join(",");
        this.form.nextUserId = chooseDataId.join(",");
        this.$set(this.form, "over", "");
        console.log(this.form);
        this.$api.sealManage.sealCommon
          .wcbfssSealKeeperChange({ ...this.form })
          .then(res => {
            console.log("完成并发送数据：", res);
            this.$message({
              message: "完成并发送成功",
              type: "success"
            });
            this.$intent.closeWindow(this);
          })
          .catch(err => {
            this.getDetail();
          });
      }
    },
    //关闭
    close() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.saveAddData().then(res => {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "印章保管交接保存成功！",
              duration: 2000
            });
            this.$intent.closeWindow(this);
          });
        })
        .catch(action => {
          if (action == "close") {
          } else {
            this.$intent.closeWindow(this);
          }
        });
    },
    headerBtnClick(btnName) {
      switch (btnName) {
        case "收回":
          this.$api.sealManage.sealCommon
            .shouHui({
              id: this.form.id
            })
            .then(res => {
              console.log(res);
              if (res.code == "SUCCESS") {
                this.$message({
                  type: "success",
                  offset: "200",
                  message: "收回成功!"
                });
              }
              this.$intent.closeWindow(this);
              // this.$router.push(
              //   "/sealManage/useSeal/draft/common/sealKeeperChangeList"
              // );
            })
            .catch(err => {});
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.sealManage
                .shoucang({
                  markOrderType: "9",
                  id: this.$route.query.id || this.form.id,
                  numYear: this.numYears
                })
                .then(res => {
                  console.log(res, "收藏");
                  let obj = {};
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
                  // downLoadFileReName()
                  this.$message({
                    type: "success",
                    offset: "200",
                    message: "收藏完成"
                  });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "删除此文":
          this.$api.sealManage.sealCommon
            .deleteSealKeeperChange({
              id: this.form.id
            })
            .then(res => {
              console.log("删除此文", res, this);
              this.$intent.closeWindow(this);
              // this.$router.push(
              //   "/sealManage/useSeal/draft/common/sealKeeperChangeList"
              // );
            })
            .catch(err => {});
          break;
        case "打印处理单":
          this.printForm();
          break;
        case "关闭":
          this.close();
          break;
        case "保存":
          this.$refs["elForm"].validate((valid, object) => {
            if (valid) {
              let that = this;
              this.saveAddData()
                .then(res => {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "印章保管交接保存成功！",
                    duration: 2000
                  });
                  this.form.id = res.id;
                  this.$intent.replace(this, {
                    name: "sealKeeperChangeForm",
                    query: { type: "modify", id: res.id }
                  });
                  this.initProcessRules(res.id);
                })
                .catch(err => {
                  console.log("印章保管交接数据存档报错：", err);
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "印章保管交接保存失败",
                    duration: 2000
                  });
                });
            } else {
              this.$message({
                type: "warning",
                message: "请填写必填项后保存"
              });
              //滚动到必填项
              for (let i in object) {
                let dom = this.$refs[i];
                dom.$el.scrollIntoView({
                  block: "center",
                  behavior: "smooth"
                });
                break;
              }
            }
          });

          break;
        case "生成编号":
          this.$refs["elForm"].validate((valid, object) => {
            if (valid) {
              let self = this;
              let jbN = this.form.documentCode;
              let fir = jbN.indexOf('〕')
              let sec = jbN.indexOf('号')
              let las = Number(jbN.substring(fir + 1, sec))
              this.las = las
              if (las) {
                this.$message({
                  type: 'warning',
                  message: '已有编号不可重复生成',
                })
              } else {
                this.$api.sealManage.sealCommon
                  .getNumSealKeeperChange({
                    statusType: true,
                    markOrderType: "9",
                    id: this.form.id,
                    draftDepartmentId: this.form.draftDepartmentId,
                    draftOrganId: this.form.draftOrganId
                  })
                  .then(res => {
                    console.log("生成的编号：", res, this);
                    if (res.codeList) {
                      this.bianshow = true;
                      this.kongQuelist = res.codeList;
                      this.fileNo = res.fileNo;
                    } else {
                      this.form.documentCode = res.data;
                      this.documentNoNum1 = "2";
                      this.$message({
                        message: "生成编号成功",
                        type: "success"
                      });
                      this.saveAddData().then(res => {
                        self.getDetail();
                      });
                    }
                  })
                  .catch(err => {
                    console.log("生成编号报错：", err);
                  });
              }
            } else {
              this.$message({
                type: "warning",
                message: "请填写必填项后生成编号"
              });
              //滚动到必填项
              for (let i in object) {
                let dom = this.$refs[i];
                dom.$el.scrollIntoView({
                  block: "center",
                  behavior: "smooth"
                });
                break;
              }
            }
          });

          break;
        case "完成并发送":
          // this.$api.sealManage.markMgr
          //   .getMarkProcess({id:this.$route.query.id}).then(res=>{
          //     console.log('122',res)
          //   })
          // this.$confirm("是否返回给上一处理人?", "提示", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // })

          // .then(() => {

          // })
          // .catch(() => {
          // if (!this.form.id) {
          //   console.log("没有id");
          //   this.saveAddData().then(res => {
          //     this.form.id = res.id;
          //     this.getProcress();
          //   });
          // } else {
          //   console.log("id");
          //   if (this.requiredFields.bh == true && this.documentNoNum1 == "1") {
          //     this.$message({
          //       type: "warning",
          //       message: "请先生成编号"
          //     });
          //   } else {
          //     this.saveAddData().then(res => {
          //       this.form.id = res.id;
          //       this.getProcress();
          //     });
          //   }
          //   // this.saveAddData().then(res => {
          //   //   this.form.id = res.id;
          //   //   this.getProcress();
          //   // });
          // }
          // });

          // })
          // .catch(() => {
          if (this.backFlag1 && this.form.currentNode != "起草") {
            this.$confirm("是否返回给" + this.form.supUserName+ '?', "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$api.sealManage.sealCommon
                  .wcbfssSealKeeperChange({
                    id: this.form.id,
                    backFlag1: this.backFlag1
                  })
                  .then(res => {
                    // console.log("完成并发送数据：", res);
                    if (res.code == "SUCCESS") {
                      this.$message({
                        message: "操作成功",
                        type: "success"
                      });
                      this.$intent.closeWindow(this);
                    }
                  })
                  .catch(err => {
                    this.getDetail();
                  });
              })
              .catch(() => {
                if (!this.form.id) {
                  console.log("没有id");
                  this.saveAddData().then(res => {
                    this.form.id = res.id;
                    this.getProcress();
                  });
                } else {
                  console.log("id");
                  if (
                    this.requiredFields.bh == true &&
                    this.documentNoNum1 == "1"
                  ) {
                    this.$message({
                      type: "warning",
                      message: "请先生成编号"
                    });
                  } else {
                    this.saveAddData().then(res => {
                      this.form.id = res.id;
                      this.getProcress();
                    });
                  }
                  // this.saveAddData().then(res => {
                  //   this.form.id = res.id;
                  //   this.getProcress();
                  // });
                }
              });
          } else {
            if (!this.form.id) {
              console.log("没有id");
              this.saveAddData().then(res => {
                this.form.id = res.id;
                this.getProcress();
              });
            } else {
              console.log("id");
              if (
                this.requiredFields.bh == true &&
                this.documentNoNum1 == "1"
              ) {
                this.$message({
                  type: "warning",
                  message: "请先生成编号"
                });
              } else {
                this.saveAddData().then(res => {
                  this.form.id = res.id;
                  this.getProcress();
                });
              }
              // this.saveAddData().then(res => {
              //   this.form.id = res.id;
              //   this.getProcress();
              // });
            }
          }

          // });

          break;
        case "查看流程":
          this.toSeeDoneProcess();
          break;
        case "办结":
          console.log(this.form.jyBj);
          if (!this.checked) {
            if (!(this.form.jyBjs && this.form.jyBjs.length>0)) {
              this.$message({
                type: "warning",
                message: "请选择接收人处理意见"
              });
              return;
            }
          }
          this.$refs["elForm"].validate((valid, object) => {
            if (valid) {
              this.$confirm("是否办结表单?", "提示", {
                confirmButtonText: "是",
                cancelButtonText: "否",
                type: "warning"
              })
                .then(() => {
                  this.toEnd();
                })
                .catch(() => {});
            } else {
              this.$message({
                type: "warning",
                message: "请填写必填项后办结"
              });
              //滚动到必填项
              for (let i in object) {
                let dom = this.$refs[i];
                dom.$el.scrollIntoView({
                  block: "center",
                  behavior: "smooth"
                });
                break;
              }
            }
          });
          break;
        default:
          console.log("你点击了按钮:" + btnName);
      }
    },
    //获取完成并发送流程
    getProcress() {
      this.$refs["elForm"].validate((valid, object) => {
        if (valid) {
          this.$api.sealManage.sealCommon
            .wcbfsSealKeeperChange({ id: this.form.id })
            .then(res => {
              console.log("完成并发送流程数据：", res);
              this.dialogState = true;
              // this.seletOptionsData = res.list;
              let PCSAVYIDs = [];
              this.seletOptionsData = res.list.filter(item => {
                if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                  PCSAVYIDs.push(item.PCSAVYID);
                  return item;
                }
              });
            })
            .catch(err => {
              console.log("完成并发送流程报错：", err);
            });
        } else {
          this.invalidFun(object);
        }
      });
    },
    invalidFun(object) {
      for (let i in object) {
        let dom = this.$refs[i];
        dom.$el.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        break;
      }
      this.$message({
        type: "error",
        message: "请填写必填项"
      });
    },
    //保存
    saveAddData: function() {
      this.form.Unit_Dept_EmpID = JSON.parse(
        localStorage.userInfo
      ).humanId.toString();
      this.form.Token_Inf_ID = localStorage.st_token;
      console.log("保存的参数列表：" + this.form);
      //发送交易
      return this.$api.sealManage.sealCommon.saveForm(this.form);
    },
    initProcessRules(id) {
      //获取页面配置权限//起草时id为空
      this.$api.sealManage.sealCommon
        .getKeeperSealKeeperChangeLimits({ id: id })
        .then(res => {
          console.log(res);
          this.getStepPageConfig(res.Fields); //处理页面配置
          setTimeout(() => {
            console.log("清除页面初始化时的校验提示信息");
            if (this.$refs["elForm"]) {
              this.$refs["elForm"].clearValidate(); // 清除校验提示信息
            }
          }, 100);
        })
        .catch(error => {
          console.log("获取页面配置信息失败:", error);
          var _msg =
            "获取页面配置信息失败，只能查看！" +
            this.$sealUtil.getErrorStrInfo(error);
          this.$sealUtil.showMsg(this, "notify", "error", "", _msg);
          this.finalDocStatus = "see";
          this.seePageConfig = this.getSeePageConfig(this.getPageConfig());
          this.loadPageConfig(this.seePageConfig);
        });
    },
    // 获取当前环节的查看模式页面配置
    getSeePageConfig(stepPageConfig) {
      let config = this.$sealUtil.deepClone(stepPageConfig);
      // 只显示关闭
      config.buttonList = config.buttonList.map(item => {
        item.show = false;
        if (item.name === "关闭") {
          item.show = true;
        }
        return item;
      });
      // 所有栏位置灰
      this.setObjSelfValues(config.readFields, true);
      this.setObjSelfValues(config.editedIdeaFields, false);
      return config;
    },
    // 加载页面配置信息 TODO:也许不需要深复制
    loadPageConfig(config) {
      console.log("要加载的配置文件:", config);
      // 规则
      this.rules = this.$sealUtil.deepClone(config.rules);
      // 按钮
      this.buttonList = this.$sealUtil.deepClone(config.buttonList);
      // 控制域
      this.readFields = this.$sealUtil.deepClone(config.readFields);
      this.requiredFields = this.$sealUtil.deepClone(config.requiredFields);
      // 意见域
      this.editedIdeaFields = this.$sealUtil.deepClone(config.editedIdeaFields);
      this.requiredIdeaFields = this.$sealUtil.deepClone(
        config.requiredIdeaFields
      );
      // 强制渲染
      this.$forceUpdate();
    },
    // 保存现在页面的配置信息
    getPageConfig() {
      let config = {};
      config.rules = this.$sealUtil.deepClone(this.rules);
      config.buttonList = this.$sealUtil.deepClone(this.buttonList);
      // 控制域
      config.readFields = this.$sealUtil.deepClone(this.readFields);
      config.requiredFields = this.$sealUtil.deepClone(this.requiredFields);
      // 意见域
      config.editedIdeaFields = this.$sealUtil.deepClone(this.editedIdeaFields);
      config.requiredIdeaFields = this.$sealUtil.deepClone(
        this.requiredIdeaFields
      );
      return config;
    },
    // 获取某一环节的页面配置信息
    getStepPageConfig(huanJieMessage) {
      this.huanJieMessage = huanJieMessage;
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      );
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
      this.setRuleConfig(
        { ...this.requiredFields, ...this.editedIdeaFields },
        this.requiredIdeaFields
      );
    },
    // 设置对象自身属性上的所有值为指定值
    setObjSelfValues(obj, value) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = value;
        }
      }
    },
    // 设置form表格的rules设置
    setRuleConfig(requiredFields, requiredIdeaFields) {
      this.rules = {
        title: [
          {
            required: requiredFields.yzmc,
            message: "请选择印章",
            trigger: "change"
          }
        ], // 印章
        documentCode: [
          {
            required: requiredFields.bh,
            message: "请点击“生成编号”按钮生成编号",
            trigger: "blur"
          }
        ], // 编号
        jiaojieType: [
          {
            required: requiredFields.jjlx,
            message: "请选择交接类型",
            trigger: "change"
          }
        ], //交接类型
        cdate: [
          // 如果加上type:'date'，则必须为日期对象，否则会报错
          {
            required: requiredFields.ngrq,
            message: "拟稿日期不可为空",
            trigger: "change"
          }
        ], // 拟稿日期
        creator: [
          {
            required: requiredFields.yjr,
            message: "必须要有移交人",
            trigger: "blur"
          }
        ], // 移交人(名字)

        chineseNodeUserId: [
          {
            required: requiredFields.jsr,
            message: "请选择接收人",
            trigger: "change"
          }
        ], //接收人
        phone: [
          {
            required: requiredFields.lxdh,
            message: "请输入（申请人）联系电话（只能为数字和短横线-）"
          }
        ], // 联系电话

        reason: [
          {
            required: requiredFields.jcyy,
            message: "请输入交出原因",
            trigger: "blur"
          }
        ], // 交出原因
        fzIdea: [
          {
            required: requiredIdeaFields.spyj,
            message: "请输入审批意见",
            trigger: "change"
          }
        ], // 审批意见
        jyBj: [
          {
            required: requiredFields.jyBj,
            message: "请选择接收人确认",
            trigger: "change"
          }
        ] // 审批意见
      };
      // return rules;
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
html,
body {
  overflow-y: scroll;
}
html,
body {
  overflow: scroll;
  min-height: 101%;
}
html {
  overflow: -moz-scrollvars-vertical;
}
.adviceInfo {
  line-height: 20px;
  font-size: 14px;
}
.br {
  font-size: 14px;
  line-height: 24px;
  word-wrap: break-word;
  word-break: break-all;
}
.box {
  width: 97%;
  border: 1px solid red;
  background: #fef7e7;
  box-sizing: border-box;
  height: 42px;
  margin: 0 0 30px 2%;
}
.read {
  color: "#E00";
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.sealKeeperChangeForm {
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 70px;
    line-height: 70px;

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
    padding: 0px 70px 0px 70px;
    height: 75px;
    .title-text {
      margin-bottom: 5px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      text-align: center;
    }
  }

  .process_content {
    width: 80%;
    min-height: 420px;
    padding: 10px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;
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
.bank_dispach_side_nav {
  width: 45px;
  height: auto;
  position: fixed;
  padding: 0px 0px 0px 0px;
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
</style>