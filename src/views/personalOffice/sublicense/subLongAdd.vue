<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>授权处理单
        </p>
        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain @click="preserve('save')">保存</el-button>
          <el-button plain @click="completeSending">完成并发送</el-button>
          <el-button plain @click="banjie">办结</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <!-- <el-button plain @click="drafting">起草正文</el-button> -->
          <el-button plain @click="delectArticle">删除登记</el-button>
          <el-button plain @click="breakArticle">中止授权</el-button>
          <!-- <el-button plain @click="collect">收藏</el-button> -->
          <!-- <el-button plain @click="processSheet">打印处理单</el-button>
          <el-button plain @click="instructions">操作指南</el-button>-->
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行长期转授权登记单11111111</h3>
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
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >授权书</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前环节：
              <span>{{fromdata.curNodeName}}</span>
            </p>
            <p class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{fromdata.curUser}}</span>
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
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                   <el-form-item label="标题" prop="authLevel" ref="authLevel">
                    <el-radio-group v-model="fromdata.authLevel">
                      <el-radio :label="1">行政文件签发</el-radio>
                      <el-radio :label="0">部门级文件签发</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <!-- <el-form-item label="标题" prop="authLevel">
                    <el-radio-group v-model="fromdata.authLevel">
                      <el-radio :key='1' :label="1">行政文件签发</el-radio>
                      <el-radio :key='0' :label="0">部门级文件签发</el-radio>
                    </el-radio-group>
                  </el-form-item> -->
                </el-col>
                <!-- <el-row> -->
                  <el-col :span="8">
                    <el-form-item label="被授权人" prop="beAuthUserName">
                      <el-col :span="20">
                        <el-input
                          v-model="fromdata.beAuthUserName"
                          placeholder="请选择被授权人"
                          style="width: 100%;"
                        >
                          <el-button slot="append" @click="getTreeData('bei')" icon="el-icon-plus"></el-button>
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="被授权部门" prop="beAuthDeptName" ref="beAuthDeptName">
                      <el-input v-model="fromdata.beAuthDeptName" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                <!-- </el-row> -->
                <el-col :span="8">
                  <el-form-item label="授权开始时间" prop="startTime" ref="startTime">
                    <el-date-picker
                      v-model="fromdata.startTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      align="right"
                      @change="timebijiao1()"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="授权结束时间" prop="endTime" ref="endTime">
                    <el-date-picker
                      v-model="fromdata.endTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      align="right"
                      @change="timebijiao()"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实际结束时间" prop="actualEndTime" ref="actualEndTime">
                    <el-input v-model="fromdata.actualEndTime" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="授权原因" prop="authReason" ref="authReason">
                    <el-input type="textarea" v-model="fromdata.authReason" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备    注">
                    <div v-for="(item) in fromdata.remarksList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              :value="item.content"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo">
                              {{item.departmentName}}
                              <span class="pad_lr10">{{item.userName}}</span>
                              {{item.createTime}}
                            </div>
                          </el-col>
                          <el-col
                            :span="2"
                            v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                          >
                            <button
                              type="button"
                              class="el-button el-button--default dimi_btn"
                              @click="deletService(item.id)"
                            >
                              <i class="el-icon-delete"></i>
                            </button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <el-input type="textarea" v-model="fromdata.remarks"></el-input>
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
              <el-row  class="pr45">
                <el-col>
                  <el-form-item label="授权模块" prop="authModule" ref="authModule">
                    <el-checkbox-group></el-checkbox-group>
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" 
                      @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="handleCheckedCitiesChange"
                    >
                    <el-checkbox v-for="item in modules"
                          :key="item.module_key_word"
                          :label="item.module_name"
                          :value="item.module_key_word"
                          >
                        </el-checkbox>
                      <!-- <el-checkbox :label="FW_CFSP|FW_HSW|FW_CFHQ|FW_HSW|FW_HQ">发文管理</el-checkbox>
                        <el-checkbox :label="DZSW|DZSWXB|SWSW|SWCB|SWXB">收文管理</el-checkbox>
                        <el-checkbox :label="QB_DZQB|QB_HQ|QB_KHQBQS|QB_KHQBSP|QB_XBQB_SWQB">签报管理</el-checkbox>
                        <el-checkbox>便函管理</el-checkbox>
                        <el-checkbox :label="DXZXDB|DXZXDB_CB|DXZXDB_XB|PLZXDB|PLZXDB_CB|PLZXDB_XB">专项督办</el-checkbox>
                        <el-checkbox>会议培训</el-checkbox>
                        <el-checkbox>事务审批</el-checkbox>
                      <el-checkbox>印章管理</el-checkbox>-->
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="批示意见">
                    <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
                      <div v-if="item.status" class="fix_height">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              :value="item.content"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo">
                              {{item.departmentName}}
                              <span class="pad_lr10">{{item.userName}}</span>
                              {{item.createTime}}
                            </div>
                          </el-col>
                          <el-col
                            :span="2"
                            v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                          >
                            <button
                              type="button"
                              class="el-button el-button--default dimi_btn"
                              @click="deletService(item.id)"
                            >
                              <i class="el-icon-delete"></i>
                            </button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="fix_height">
                      <el-input type="textarea" v-model="fromdata.pishiOpinion"></el-input>
                      <button
                        @click="writelistbox(clickTypes=1)"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="办公室批办意见" prop="isPass" ref="isPass">
                    <el-radio-group v-model="fromdata.isPass">
                      <el-radio :label="1">同意</el-radio>
                      <el-radio :label="0">不同意</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label>
                    <div v-for="item in fromdata.pishiOpinionList"  :key="item.id">
                      <div v-if="item.status" class="fix_height">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              :value="item.content"
                              :disabled="true"
                              rows="3"
                              class="d_f1"
                            ></el-input>
                            <div class="adviceInfo">
                              {{item.departmentName}}
                              <span class="pad_lr10">{{item.userName}}</span>
                              {{item.createTime}}
                            </div>
                          </el-col>
                          <el-col
                            :span="2"
                            v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                          >
                            <button
                              type="button"
                              class="el-button el-button--default dimi_btn"
                              @click="deletService(item.id)"
                            >
                              <i class="el-icon-delete"></i>
                            </button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="fix_height">
                      <el-input type="textarea" v-model="fromdata.officeOpinion" :disabled="true"></el-input>
                      <button
                        @click="writelistbox(clickTypes=2)"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit tit1">授权书</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <!-- <el-row>
                <el-col>
                  <el-form-item label="授权书">
                    <loadAccessory></loadAccessory>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row class="pr45">
              <!-- <loadAccessory></loadAccessory> -->
              <uploadFiles  ref="uploadComponent" @preserve="preserve" :uploadConfig="uploadConfig"></uploadFiles>
              <el-col>
                <div class="tree_w" style="margin-left:138px;" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.attchmentFileInfo" :key="item.id" class="comp_list">  
                      <template>
                        <div class="command_wrap">
                          <span class="name down" :title="item.fileName" @click="viewFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="upRow(index)"
                              v-if="fromdata.attchmentFileInfo.length>1"
                              :disabled="index==0"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(index)"
                              v-if="fromdata.attchmentFileInfo.length>1"
                              :disabled="index==fromdata.attchmentFileInfo.length-1"
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
import uploadFiles from "../../../components/uploadFile/uploadFile";
import dateFormate from "@/util/filters.js";

export default {
  name: "App",
  components: {
    loadAccessory,
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    uploadFiles
  },
  data() {
    return {
        modules: [],  // 授权模板
      uploadConfig:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true
      },
      ruleForm: [],
      routeData: [],
      dialogFormVisible: false,
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
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
        function: "doFinishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      banjie_fn: {
        function: "doFinish",
        moduleType: "receive_doc_sw"
      },
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "selectByIdCQ",
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
      saveOrUpdateSW: {
        function: "saveOrUpdateCQ",
        id: ""
      },
      //提交
      bank_addToSendOrder: {
        function: "addToSendOrder",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "doDeletesendOrderOpinion",
        id: ""
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
      undertakeDeptData: [],
      assistDeptData: [],
      cbdwList: [], //督办依据添加
      fromdata: {
        authLevel:"",
        id: "",
        authStatusName: "",
        draftUserId: "",
        pcsAvyId: "",
        multiTenancyId: "",
        tplNo: "",
        authModule:[],
        draftUserName: "",
        draftDeptId: "",
        draftDeptName: "",
        authUserId: "",
        beAuthUserId: "",
        beAuthUserName: "",
        authDeptId: "",
        authDeptName: "",
        beAuthDeptId: "",
        beAuthDeptName: "",
        draftTime: "",
        startTime: "",
        endTime: "",
        authReason: "",
        authStatus: "",
        remarks: "",
        actualEndTime: "",
        pishiOpinion: "",
        isPass: "",
        curNodeName: "",
        curUser: "",
        processInstId: ""
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
      rules: {},
      imageUrl: "",
      fileList: [],
      tableData: [],
      active: "#wjys",
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
      dialogTypeNow: "", //当前弹窗类型
      baoWenZiDuan: this.$businessCode.grxxbg,
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: sessionStorage.getItem("ccboaHumanId"), //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      isIndeterminate: true,
      checkAll: false,
      checkedCities: []
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
    uploadFiles(){
      this.$post
        .postData("uploadFiles", JSON.stringify(params), this.$businessCode.ggywgn)
        .then(res => {
          this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow(); 
        })
    },
    timebijiao1() {
      this.fromdata.startTime = dateFormate.date(
        Date.parse(this.fromdata.startTime),
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(1111,this.fromdata.startTime)

      // this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      if (this.fromdata.authEndTime < this.fromdata.authStartTime) {
        //     this.$message({
        //       type: "error",
        //       offset: 400,
        //       showClose: true,
        //       message: "起始时间需大于当前时间",
        //       duration: 1000
        //     });
        //     this.fromdata.authStartTime="";
      }
    },
    timebijiao() {
      this.fromdata.endTime = dateFormate.date(
        Date.parse(this.fromdata.endTime),
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log("ssssssss",this.fromdata.endTime)

      // if(this.fromdata.authEndTime < this.fromdata.authStartTime){
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "结束时间需大于起始时间",
      //       duration: 1000
      //     });
      //     this.fromdata.authEndTime="";
      // }
    },
    handleCheckAllChange(val) {
      // this.checkedCities = val ? cityOptions : [];
      // this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    add() {
      this.dialogFormVisible = true;
    },
    info() {},
    getTreeData(n) {
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
          name = "授权人";
          clearName = "authUserName";
          break;
        case "bei":
          name = "被授权人";
          clearName = "beAuthUserName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "selectUserByTree",
          JSON.stringify({ function: "selectUserByTree" }),
          this.$businessCode.sqgl
        )
        .then(res => {
          console.log(JSON.stringify(res.data));
          that.treeData = (res && res.data) || [];
          if (that.treeData.length) {
            that.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (that.dialogType === "hui") {
                item.text = item.typeName;
              }
            });
          }
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "assistDeptName") {
          this.fromdata.assistDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "assistDeptName") {
          this.fromdata.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
    },
    //数据更新
    inputChange(e) {
      console.log(e);
      this.$forceUpdate();
    },
    //数据截取
    cuteData(data, name, type) {
      if (this.fromdata[name]) {
        this.fromdata[name].forEach(item => {
          if (!item.status) {
            this.fromdata[data] = item.content;
            this.fromdata[type] = item.id;
          }
        });
      }
    },
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
        case "shou":
          this.checkIds = this.fromdata.authUserId
            ? this.fromdata.undertakeDeptId.split(",")
            : [];
          this.checkData = this.chenCheckData;
          if (this.dialogTypeBack) {
            this.checkData = [];
            this.checkIds = [];
          }
          break;
        case "bei":
          this.checkIds = this.fromdata.beAuthUserId
            ? this.fromdata.beAuthUserId.split(",")
            : [];
          this.checkData = this.xieCheckData;
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let buMenName = "";
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(";");
          this.transIds = ids = ids.join(";");
          buMenName =
            data[0].deptName  ||
            "";
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }
        this.fromdata.beAuthDeptName = buMenName;
        switch (dtype) {
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
          case "shou":
            this.fromdata.authUserName = names;
            this.fromdata.authUserId = ids;
            this.undertakeDeptData = this.checkData;
            break;
          case "bei":
            this.fromdata.beAuthUserName = names;
            this.fromdata.beAuthUserId = ids;
            this.assistDeptData = this.checkData;
            break;
        }
        //这里什么时候需要sendXb('1')需要再次核对。修改承办的时候将false改成true
        if (
          (this.fromdata.isHasXB == true && dtype != "fasong") ||
          this.fromdata.isHasCB == true
        ) {
          if (dtype == "xie") {
            this.bank_sendXb.avyds = "发送协办部门";
          }
          if (dtype == "chen") {
            this.bank_sendXb.avyds = "发送承办部门";
          }
          if (dtype == "xie") {
            this.sendXb("1");
          }
          if (dtype == "chen") {
            this.sendCb("1");
          }
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogState = !this.dialogState;

      if (!this.dialogState) {
        this.saveSending();
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      this.bank_doSend.id = this.fromdata.id
        ? this.fromdata.id
        : sessionStorage.getItem("pageSWid") || "";
      let params = Object.assign(this.bank_doSend, this.fromdata);
      this.$post
        .postData(
          "doFinishAndSend",
          JSON.stringify(params),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500,
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
            duration: 1000
          });
        });
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeNow = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.sqgl
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
          this.bank_send.curTplNo = this.fromdata.tplNo;
          this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
              this.$businessCode.sqgl
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
      let result = true;
      this.$refs.fromdata.validate((valid, object) => {
        if (!valid) {
          let split = "";
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

  
    // 终止
    breakArticle() {
      let parms = {
        function: "supspensionAuthorizationCQ",
        id: this.fromdata.id
      };
      this.$post
        .postData(
          "supspensionAuthorizationCQ",
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
              duration: 1000
            });
            this.fromdata.actualEndTime =
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1) +
              "-" +
              new Date().getDay();
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
            message: "操作失败",
            duration: 1000
          });
        });
    },
    banjie() {
      let params = Object.assign(this.fromdata, this.banjie_fn);
      this.$post
        .postData("doFinish", JSON.stringify(params), this.$businessCode.sqgl)
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "办结成功",
                duration: 500
              });
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            }
          }
        });
    },
    // 下拉列表
    getSendOrderDicByParam() {},
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEdit() {
      this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageid") || "";
      let that = this;
      this.$post
        .postData(
          "selectByIdCQ",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.sqgl
        )
        .then(res => {
          that.fromdata = res.data;
          this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
          this.bank_selectConfig.tplNo = res.data.tplNo;
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
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
          //临时意见处理
          this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
          this.cuteData("remarks", "remarksList", "remarksId");
          this.cuteData(
            "officeOpinion",
            "officeOpinionList",
            "officeOpinionId"
          );
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
      let params = Object.assign(this.saveOrUpdateSW, this.fromdata);
      this.saveOrUpdateSW.id = this.bank_dispach.id;
      this.$post
        .postData(
          "saveOrUpdateCQ",
          JSON.stringify(params),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success === 'true') {
            sessionStorage.setItem("pageSWid", res.data.id);
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "保存成功",
              duration: 1000
            });
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            } else {
              this.toEdit();
            }
            window.close();
            window.opener.location.reload();
            this.toEdit(); 
          }else{
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        });
      // .catch(erro => {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "保存失败",
      //     duration: 1000
      //   });
      // });
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
      console.log(this.distance_scfj);
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
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.preserve();
          window.location.href = "about:blank";
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

    delectArticle() {
      //deleteById
      let parms = { function: "deleteByIdCQ", id: this.fromdata.id };
      this.$post
        .postData(
          "deleteByIdCQ",
          JSON.stringify(parms),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000
            });
            window.history.go(-1);
            window.opener.location.reload();
          }
          
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 1000
          });
        });
      window.history.go(-1);
      window.opener.location.reload();
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
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      console.log(this.fromdata.processInstId);
      this.$post
        .postData(
          "getHistory",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.sqgl
        )
        .then(res => {
          console.log(res);
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
          this.concatAttrData("pishiOpinion", data);
        } else if (this.clickTypes == 2) {
          this.concatAttrData("officeOpinion", data);
        } else if (this.clickTypes == 3) {
          this.concatAttrData("undertakeOrgOpinion", data);
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
          this.baoWenZiDuan
        )
        .then(res => {
          if (res && res.success) {
            this.toEdit();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
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
    getMukuai(){
      let selectAgent = {function: "selectAgent"};
      this.$post.postData(
        "selectAgent",
        JSON.stringify(selectAgent),
        this.$businessCode.sqgl
      ).then(res => {
        if(res && res.success){
          this.modules = res.data;
          console.log(111,this.modules)
        }
      })
    },
  },
  created() {
    this.getMukuai();
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.uploadConfig.code = this.$businessCode.sqglfj
    this.uploadConfig.id =  this.$route.query.id ? this.$route.query.id : "";
    this.toEdit();
    //this.getSendOrderDicByParam();
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

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
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
.tit1 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
</style>
