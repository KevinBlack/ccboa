
<template>
  <div class="adminCbDetail" id="meetzhifa">
    <div class="headerClick">
      <div class="right">
        <!-- <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button> -->
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="formHeader">
      <!-- <div
        class="title-text"
        v-if="formData.curbankId=='111111111'"
      >{{formData.curbank}}{{formData.draftDepartment}}{{formData.type}}（承办单）</div>-->
      <div class="shiwuTitle">{{formData.draftOrgan}}{{formData.draftDepartment}}{{tempType}}（承办单）</div>
    </div>
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
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批意见</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>
      <div class="bank_dispach_file">
        <div class="process_content">
          <div class="cur_box">
            <div class="cur_sess">
              <p>
                当前环节：
                <span>{{formData.undertakeCurrentlinks}}</span>
              </p>
              <p v-if="!formData.finishTime">
                当前处理人：
                <span>{{formData.currentNowName}}</span>
              </p>
            </div>
          </div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <div id="wjys" class="height_90"></div>
          <el-form :rules="rules" :model="formData" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训名称" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.title" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="会议名称" v-else>
                  <el-input v-model="formData.title" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主办部门">
                  <el-input v-model="formData.maindept" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿人">
                  <el-input v-model="formData.authorCn" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="formData.tel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="拟稿日期">
                  <el-input v-model="formData.draftDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训时间" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyTime" :disabled="isWeiHu"></el-input>
                </el-form-item>
                <el-form-item label="会议时间" v-else>
                  <el-input v-model="formData.hyTime" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训地点" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyAdress" :disabled="isWeiHu"></el-input>
                </el-form-item>
                <el-form-item label="会议地点" v-else>
                  <el-input v-model="formData.hyAdress" :disabled="isWeiHu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
              <el-col :span="24">
                <el-form-item label="委托承办单位">
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="formData.entrustUnit" :disabled="true"></el-input>
                    </el-col>
                    <!-- <el-col :span="2">
                  <el-button type="primary" style="float:right">选择</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" style="float:right">删除</el-button>
                    </el-col>-->
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row v-if="formData.type!='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="内容">
              <div class="editor_box" style="position:relative;z-index:1">
                <UE :config="config" id="UE" ref="ue"></UE>
              </div>
            </el-form-item>
          </el-col>
            </el-row>-->
            <div
              class="editor_box"
              style="position:relative;z-index:1"
              v-if="formData.type!='本部会议通知'"
            >
              <label>内容</label>
              <UE :config="config" id="UE" ref="ue"></UE>
            </div>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item label="签发意见" prop="signIdea">
              <!-- <el-button
            type="primary"
            size="mini"
            @click="addSucc('signIdeaList')"
            :disabled="isWeiHu"
              >新增意见</el-button>-->
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(signIdeaList.length-1)}]"
                  v-for="(item,index) in signIdeaList"
                  :key="index"
                >
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-col :span="2">
                        <span>内容</span>
                      </el-col>
                      <el-col :span="19">
                        <el-input
                          :disabled="true"
                          type="textarea"
                          v-model="item.opinion"
                          class="d_f1"
                        ></el-input>
                      </el-col>
                      <!-- <el-col :span="2" style="margin-left:12px">
                    <el-button
                      type="danger"
                      @click="deleSugg('examineIdeaList',index,item.id)"
                      :disabled="isWeiHu"
                    >删除</el-button>
                      </el-col>-->
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:12px">
                    <el-col :span="2">
                      <span>用户部门</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.deptName" :disabled="true"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.userName" :disabled="true"></el-input>
                      </el-col>
                    </div>
                    <el-col :span="2">
                      <span>提交时间</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.date" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="办理意见" prop="pbIdea">
              <el-button
                type="primary"
                size="mini"
                @click="addSucc('examineIdeaList')"
                :disabled="isWeiHu"
              >新增意见</el-button>
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(examineIdeaList.length-1)}]"
                  v-for="(item,index) in examineIdeaList"
                  :key="index"
                >
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-col :span="2">
                        <span>内容</span>
                      </el-col>
                      <el-col :span="19">
                        <el-input
                          :disabled="isWeiHu"
                          type="textarea"
                          v-model="item.opinion"
                          class="d_f1"
                        ></el-input>
                      </el-col>
                      <el-col :span="2" style="margin-left:12px">
                        <el-button
                          type="danger"
                          @click="deleSugg('examineIdeaList',index,item.id)"
                          :disabled="isWeiHu"
                        >删除</el-button>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:12px">
                    <el-col :span="2">
                      <span>用户部门</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.deptName" :disabled="isWeiHu"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.userName" :disabled="isWeiHu"></el-input>
                      </el-col>
                    </div>
                    <el-col :span="2">
                      <span>提交时间</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.date" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- <template>
            <el-row v-if=" !(examineIdeaList && examineIdeaList.length!=0)">
              <el-col :span="23">
                <el-input type="textarea" :rows="3" v-model="formData.pbIdea" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <div v-for="item in examineIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      class="d_f1"
                      :autosize="{minRow:3,maxRow:15}"
                      :value="item.opinion"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.date}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
              </template>-->
            </el-form-item>
            <!-- 2021/12/16 修改 传阅意见在 维护时 不能编辑、新增、删除 -->
            <el-form-item label="传阅意见" prop="cyyj">
              <!-- <el-button
                type="primary"
                size="mini"
                @click="addSucc('cyIdeaList')"
                :disabled="isWeiHu"
              >新增意见</el-button> -->
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(cyIdeaList.length-1)}]"
                  v-for="(item,index) in cyIdeaList"
                  :key="index"
                >
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-col :span="2">
                        <span>内容</span>
                      </el-col>
                      <el-col :span="19">
                        <el-input
                          :disabled="true"
                          type="textarea"
                          v-model="item.opinion"
                          class="d_f1"
                        ></el-input>
                      </el-col>
                      <el-col :span="2" style="margin-left:12px">
                        <!-- <el-button
                          type="danger"
                          @click="deleSugg('cyIdeaList',index,item.id)"
                          :disabled="isWeiHu"
                        >删除</el-button> -->
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:12px">
                    <el-col :span="2">
                      <span>用户部门</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.deptName" :disabled="true"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.userName" :disabled="true"></el-input>
                      </el-col>
                    </div>
                    <el-col :span="2">
                      <span>提交时间</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.date" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- <template>
            <el-row v-if="!(cyIdeaList && cyIdeaList.length!=0)">
              <el-col :span="23">
                <el-input type="textarea" :rows="3" v-model="formData.cyIdea" disabled></el-input>
              </el-col>
            </el-row>
            <div v-for="item in cyIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      class="d_f1"
                      :autosize="{minRow:3,maxRow:15}"
                      :value="item.opinion"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.date}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
              </template>-->
            </el-form-item>
            <el-form-item label="反馈信息">
              <el-radio-group v-model="formData.isFeedback" @change="change">
                <el-radio v-model="formData.isFeedback" :label="'0'" disabled>是</el-radio>
                <el-radio v-model="formData.isFeedback" :label="'1'" disabled>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col :span="23">
                <el-form-item label="传阅人员">
                  <el-row>
                    <el-form-item label="未阅">
                      <p
                        :disabled="isWeiHu"
                        style="border:1px solid #ccc;min-height:30px"
                      >{{formData.wyPle}}</p>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="已阅">
                      <p
                        :disabled="isWeiHu"
                        style="border:1px solid #ccc;min-height:30px"
                      >{{formData.yyPle}}</p>
                    </el-form-item>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-form-item label="制发单附件" v-if="formData.type!='本部会议通知'">
              <el-col :span="23">
                <div
                  class="tree_w"
                  v-if="formData.attchmentFileInfoZhi&&formData.attchmentFileInfoZhi.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in  formData.attchmentFileInfoZhi"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span class="numName">{{index+1}}.</span>
                          <span
                            class="name down"
                            @click="viewFile(item,null,item.fileName)"
                          >{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
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
            </el-form-item>
            <!-- <el-form-item label="承办单附件" v-if="formData.type!='本部会议通知'">
          <el-col :span="23">
            <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList" :disabled="isWeiHu"></upload-file-ts>
            <div
              class="tree_w"
              v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
            >
              <el-scrollbar>
                <div
                  v-for="(item,index) in  formData.attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                      <span class="name">{{item.createrName}}</span>
                      <span class="name">{{item.createTime}}</span>
                      <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="upRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==0"
                          round
                        >上移</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==formData.attchmentFileInfo.length-1"
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
            </el-form-item>-->
          </el-form>
        </div>
      </div>
    </div>
    <select-persons
      v-model="dialogState"
      :seletOptionsData="seletOptionsData"
      :orgOrDeptId="selsecOrgOrDeptId"
      @showCompDialog="showCompDialog"
    />
    <!-- 常用批语 -->
    <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts>
    <!-- <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart> -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>

    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
  </div>
</template>

<script type="text/ecmascript-6">
import writeListTs from "../../../components/appendWriteList/writeListTs";
// import editor from '@/components/editor/editor.vue';
// import selectPerson from 'components/tree/tree-fawen'
import selectPersons from "components/viewFlow/dispatchTree";
// import flowChart from "components/dialog/flowChart";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import { mapGetters, mapActions } from "vuex";
import minixs from "../../../minixs/index";
import cyPersonList from "../../bianhan/components/cyPersonList";
import UE from "components/editor/ue.vue";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "../../../minixs/exportTable";
import beanList from "../../../util/beanList";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";

export default {
  name: "adminCbDetail",
  components: {
    // selectPerson,
    selectPersons,
    shiwuFlow,
    cyPersonList,
    UE,
    uploadFileTs,
    writeListTs,
  },
  props: {},
  mixins: [minixs, openOrDownLoadFile],
  data() {
    return {
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      tempType: "",
      selsecOrgOrDeptId: "", //流程调度机构
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth",
      },
      currentUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      currentUserId: JSON.parse(localStorage.getItem("userInfo")).humanId,
      signIdeaList: [], //签发意见
      examineIdeaList: [], //办理意见
      cyIdeaList: [], //传阅意见
      id: this.$route.query.id,
      select: "",
      isWeiHu: true,
      radio: "",
      checkList: ["行名", "部门", "姓名", "手机"],
      rules: {},
      formData: {},
      huanJieMessage: {},
      readFields: {
        authorCn: false,
        draftDate: false,
        title: false,
        tel: false,
        unitdept: false,
        hyTime: false,
        hyAdress: false,
        host: false,
        attend: false,
        attendance: false,
        summary: false,
        entrustUnit: false,
        wordBody: false,
        isFeedback: false,
      }, //不可编辑控制域
      editedIdeaFields: {
        cyyj: true,
        pbyj: true,
        qfyj: true,
      }, //可编辑意见域
      requiredIdeaFields: {
        cyyj: false,
        pbyj: false,
        qfyj: false,
      }, //必填意见域
      requiredFields: {
        creator: "",
        isFeedBack: "",
        tel: "",
        draftDate: "",
        title: "",
        maindept: "",
        wordBody: "",
      }, //必填控制域
      // buttonList: [
      //   { name: "保存", type: "baocun", show: false },
      //   { name: "完成并发送", type: "wanchengfasong", show: false },
      //   // { name: "收回", type: "shouhui", show: false },
      //   // { name: "催办", type: "cuiban", show: false },
      //   { name: "传阅", type: "cy", show: false },
      //   { name: "传阅收回", type: "cysh", show: false },
      //   { name: '查看流程', type: 'cklc', show: false },
      //   { name: '打印处理单', type: 'dycld', show: false },
      //   { name: '收藏', type: 'shoucang', show: false },
      //   { name: '操作指南', type: 'cazuozhinan', show: false },
      //   { name: '维护', type: 'weihu', show: false },
      //   { name: '办结', type: 'banjie', show: false },
      // ],
      buttonList: [
        { name: "关闭", show: true },
        { name: "保存", show: false },
        { name: "查看流程", show: true },
        { name: "流程调度", show: true },
        { name: "维护", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
      ],
      type: "",
      showFlowChart: false,
      flowChartList: [], //流程列表
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型

      treeData: [], //人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      // 传阅收回选人
      cyData: [],
      showCyPerson: false,
      cyArr: [],
      cyObj: {},
    };
  },
  computed: {
    ...mapGetters(["todoItem"]),
  },
  mounted() {
    // this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    // this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    // this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    // this.$nextTick(() => {
    //   document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
    // });
    // window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    // ...mapActions([
    //   'setTodoItem'
    // ]),
    deleSugg(sugg, n, dataId) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (dataId) {
            this.$api.meeting.hyIdeaDel({ id: dataId }).then((res) => {
              if (res.code == "SUCCESS") {
                this.formData.mark = "";
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
                this.loadData();
              }
            });
          } else {
            switch (sugg) {
              // case sugg='signIdeaList':
              //     this.signIdeaList.splice(n,1)
              //     break;
              case (sugg = "examineIdeaList"):
                this.examineIdeaList.splice(n, 1);
                break;
              case (sugg = "cyIdeaList"):
                this.cyIdeaList.splice(n, 1);
                break;
            }
          }
        })
        .catch(() => {});
    },
    addSucc(range) {
      let AdepartmentName = JSON.parse(localStorage.getItem("userInfo"))
        .firstUnitName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AuserName = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD");
      switch (range) {
        case (range = "examineIdeaList"):
          this.examineIdeaList.push({
            opinion: "",
            deptName: AdepartmentName,
            userName: AcreateUser,
            DATE: AcreateTime,
            type: "6",
          });
          break;
        case (range = "cyIdeaList"):
          this.cyIdeaList.push({
            opinion: "",
            deptName: AdepartmentName,
            userName: AcreateUser,
            date: AcreateTime,
            type: "2",
          });
          break;
      }
    },
    //常用批语
    showWriteList(type) {
      this.clickTypes = type;
      this.appendWriteDialog = true;
      // this.$nextTick(() => {
      //   this.$refs.writelist.openDialog();
      // });
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "chuli":
          this.$set(
            this.formData,
            "pbIdea",
            this.formData.pbIdea ? this.formData.examineIdea + data : data
          );
          break;
      }
    },
    // 附件
    // uploadConfig: {
    //   formId: "meet",
    //   filesHas: [],
    //   isSpecial: 0,

    // },
    getFileList() {
      // this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
      //   this.formData.attchmentFileInfo = res.data
      // })
      //制发单附件
      this.$api.setSysConfig
        .getTextemList({ id: this.formData.mainId ,numYear:this.numyear})
        .then((res) => {
          this.formData.attchmentFileInfo = [];
          this.formData.attchmentFileInfo = res.data;
          // this.formData.attchmentFileInfoZhi = res.data;
          this.$set(this.formData, "attchmentFileInfoZhi", res.data);

          //参会单附件
          // this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
          //   this.formData.attchmentFileInfo = res.data
          //   this.$forceUpdate();
          // })
        });
    },
    // fileList (files) {
    //   if (this.formData.attchmentFileInfo && this.formData.attchmentFileInfo.length) {
    //     this.formData.attchmentFileInfo.push(...files)
    //   } else {
    //     this.formData.attchmentFileInfo = files
    //   }
    //   if (!this.formData.attachs) {
    //     this.formData.attachs = [];
    //   }
    //   files.forEach(item => {
    //     this.formData.attachs.push(item.id)
    //   })
    //   this.formData.attachid = this.formData.attachs.join(',')
    //   this.$forceUpdate();
    // },
    // // 附件上传下载排序
    // upRow (n) {
    //   let midObj;
    //   let attachSort = [];
    //   attachSort.push(
    //     {
    //       id: this.formData.attchmentFileInfo[n - 1].id,
    //       sort: this.formData.attchmentFileInfo[n].sort
    //     },
    //     {
    //       id: this.formData.attchmentFileInfo[n].id,
    //       sort: this.formData.attchmentFileInfo[n - 1].sort
    //     }
    //   );
    //   midObj = this.formData.attchmentFileInfo[n];
    //   this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[n - 1];
    //   this.formData.attchmentFileInfo[n - 1] = midObj;
    //   this.$forceUpdate();
    //   this.$api.setSysConfig.sortFile({ attachSort: PJF.util.json2str(attachSort) }).then(res => {

    //   })
    // },
    // downRow (n) {
    //   let midObj;
    //   let attachSort = [];
    //   attachSort.push(
    //     {
    //       id: this.formData.attchmentFileInfo[n + 1].id,
    //       sort: this.formData.attchmentFileInfo[n].sort
    //     },
    //     {
    //       id: this.formData.attchmentFileInfo[n].id,
    //       sort: this.formData.attchmentFileInfo[n + 1].sort
    //     }
    //   );
    //   midObj = this.formData.attchmentFileInfo[n];
    //   this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
    //     n + 1
    //   ];
    //   this.formData.attchmentFileInfo[n + 1] = midObj;
    //   this.$forceUpdate();
    //   this.$api.setSysConfig.sortFile({ attachSort: PJF.util.json2str(attachSort) }).then(res => {

    //   })
    // },
    // deleteRow (n, id) {
    //   this.$confirm("是否删除附件?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(res => {
    //     this.$post
    //       .postData(
    //         "deleteFileById",
    //         JSON.stringify({ id: id, function: "deleteFileById" }),
    //         this.$businessCode.fawglfj
    //       )
    //       .then(res => {
    //         if (res) {
    //           if (res && res.success) {
    //             this.$message({
    //               type: "success",
    //               showClose: true,
    //               message: "删除成功",

    //             });
    //             this.formData.attchmentFileInfo.splice(n, 1);
    //             this.$forceUpdate();
    //             this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
    //           } else {
    //             this.$message({
    //               type: "error",
    //               showClose: true,
    //               message: "删除失败",
    //             });
    //           }
    //         }
    //       });
    //   })
    // },
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          "A0846C071"
        )
        .then((res) => {
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
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500,
              });
            }
          }
        });
    },
    getHuanJie() {
      // typeFlag区分制发与承办  0制发,1承办
      this.$api.meeting
        .getHuanJie({ id: this.id, typeFlag: "1" })
        .then((res) => {
          this.huanJieMessage = res.Fields;
          this.requiredFields = this.setRequiredFields(
            this.requiredFields,
            this.huanJieMessage.requiredFields
          ); //可编辑控制域
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
          ); //可编辑意见
        });
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.isWeiHu = true;
          this.buttonList[1].show = false;
          this.buttonList[4].show = true;
          this.save();
          break;
        case "流程调度":
          // this.singelCheckF = true;
          // this.dialogTypeNow = 'next';
          // this.offenUse = true;
          this.toNext();
          break;
        case "维护":
          this.isWeiHu = false;
          this.buttonList[1].show = true;
          this.buttonList[4].show = false;
          break;
        case "传阅":
          this.singelCheckF = false;
          this.offenUse = false;
          this.dialogTypeNow = "cy";
          this.chuanYue();
          break;
        case "传阅收回":
          this.$api.meeting.noCyList({ mainId: this.id }).then((res) => {
            // console.log(7878787, res)
            if (res.data.length == 0) {
              this.$message({ type: "success", message: "暂无未阅人员" });
            } else {
              res.data.forEach((item) => {
                item.name = item.curUserCn;
              });
              this.cyData = res.data;
              this.showCyPerson = true;
              console.log("this.cyData", this.cyData);
            }
          });
          break;
        // case '催办':
        //   this.$api.meeting.cuiban({ id: this.id, typeFlag: '1' }).then(res => {
        //     this.$message({
        //       message: '催办成功',
        //       type: 'success'
        //     });
        //   })
        //   break;
        case "收回":
        // this.$api.meeting.cbChOldBack({
        //   id: this.id,
        //   // avyId: this.todoItem.avyId,
        //   // avyId: this.formData.avyId,
        //   // isCanOrCb: this.formData.isCanOrCb //0 参会   1承办
        // }).then(res => {
        //   this.$message({
        //     message: '收回完成',
        //     type: 'success'
        //   });
        // })
        // break;
        // case "流程调度":
        //   this.flowAlter()
        //   break
        case "查看流程":
          this.$api.meeting.cbgetProcess({ id: this.id,numYear:this.numyear }).then((res) => {
            this.showFlowChart = true;
            this.flowChartList = res.list;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
          break;
        case "打印处理单":
          this.$intent.go(this, {
            path: "/meetingCbPrint",
            query: { id: this.id,numYear:this.numyear },
          });
          break;
        case "收藏":
          // let deptTableHead = "";
          // deptTableHead =
          //   this.formData.draftOrgan +
          //   this.formData.draftDepartment +
          //   this.tempType +
          //   "（承办单）";
          // exportTable.getPdf(
          //   deptTableHead,
          //   this.formData.attchmentFileInfo,
          //   "meetzhifa",
          //   "A08462002",
          //   "biaoti",
          //   this
          // );
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.$api.meeting
                .cbCollect({ id: this.formData.id,numYear:this.numyear })
                .then((res) => {
                  let obj = {};
                  let arr = [];
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
                });
            })
            .catch(() => {});

          break;
        case "办结":
          this.formData.currentNode = "办结";
          this.$api.meeting.cbUpdateData(this.formData).then((res) => {
            this.$message({
              message: "办结完成",
              type: "success",
            });
            this.$intent.closeWindow(this);
          });
          break;
        // case '操作指南':
        //   this.$message({
        //     message: '暂无文档',
        //     type: 'warning'
        //   });
        //   break;
      }
    },
    close() {
      this.$confirm("关闭前是否保存?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          if (this.id) {
            // this.formdata.type = '0'
            this.$api.meeting.cbUpdateData(this.formData).then((res) => {
              this.$intent.closeWindow(this);
            });
          }
        })
        .catch(() => {
          this.$intent.closeWindow(this);
        });
    },
    toNext() {
      this.$api.meeting
        .diaodu({
          id: this.id,
        })
        .then((res) => {
          this.seletOptionsData = res.list;
          this.dialogState = true;
        });
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, params, dtype);
      if (!status) {
        return;
      }
      this.dialogState = false;
      this.next(data[0], params);
    },
    //完成并发送
    next(person, params) {
      // console.log(32324, person, 9999, params)
      this.formData.admin = "admin";
      this.formData.typeFlag = "1";
      this.formData.isUp = person.id.split("#")[1];
      this.formData.undertakeHandlePersonIds = person.idStr;
      this.formData.undertakeHandlePerson = person.name;
      this.formData.nextAvyId = params.id;
      this.formData.undertakeCurrentlinks = params.name;
      console.log(99999, "this.formData", this.formData);
      this.$api.meeting.cbUpdateData(this.formData).then((res) => {
        this.$message({
          message: "发送成功",
          type: "success",
        });
        this.$intent.closeWindow(this);
      });
    },
    //获取传阅人员列表
    chuanYue() {
      this.$api.meeting.getCyPerson({}).then((res) => {
        this.treeData = res.result.data;
        this.dialogState = true;
      });
    },
    //发传阅
    cy(person) {
      let ids = [],
        names = [];
      person.forEach((item) => {
        ids.push(item.idStr);
        names.push(item.name);
      });
      this.formData.currentUserId = ids.join(",");
      this.formData.currentUser = names.join(",");
      this.formData.currentNode = "承办";
      this.$api.meeting.sendChuanYue(this.formData).then((res) => {
        this.loadData();
        this.$message({
          message: "传阅成功",
          type: "success",
        });
      });
    },
    //传阅收回
    cyPersonList(data) {
      let ids = [];
      data.map((item) => {
        ids.push(item.id);
      });
      this.$api.meeting.cheHuiCy({ ids: ids.join(",") }).then((res) => {
        this.loadData();
        this.$message({
          message: "传阅收回成功",
          type: "success",
        });
      });
    },
    //流程调度
    flowAlter() {
      // this.$api.meeting.flowControl(
      //   {
      //     id: this.id,
      //   }
      // ).then(res => {
      //   this.dialogState = true
      //   this.treeData.push(res.data)
      //   this.seletOptionsData = res.list
      // })
    },
    //   保存
    save() {
      this.formData.admin = "admin";
      this.formData.opinionList = [...this.examineIdeaList, ...this.cyIdeaList];
      this.formData.contentList = [];
      this.$api.meeting.adminCbUpdate(this.formData).then((res) => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        }
        this.loadData();
      });
    },
    change() {},
    // onScroll () {
    //   const scrolled = Math.floor(
    //     document.body.scrollTop ||
    //     document.documentElement.scrollTop ||
    //     window.pageXOffset
    //   );
    //   if (scrolled < this.distance_qpyj - 650) {
    //     this.active = "#wjys";
    //   } else if (scrolled > this.distance_qpyj - 650 && scrolled < this.distance_scfj - 400) {
    //     this.active = "#qpyj";
    //   } else if (scrolled > this.distance_scfj - 400) {
    //     this.active = "#scfj";
    //   }
    // },
    toTarget(target) {
      this.active = target;
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    loadData() {
      this.$api.meeting
        .cbDetial1({
          id: this.id,
          numYear:this.numyear
        })
        .then((res1) => {
          this.formData = res1.meetCbOrderDo;
          this.formData.draftDate = res1.meetCbOrderDo.draftDate.split(" ")[0];

          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          this.selsecOrgOrDeptId = this.formData.undertakeOrganId; //流程调度机构
          if (this.formData.finishTime) {
            this.buttonList[3].show = false;
            this.buttonList[4].show = true;
          } else {
            this.buttonList[3].show = true;
            this.buttonList[4].show = true;
          }
          // const telArr = res1.meetCbOrderDo.tel.split(',')
          // if (telArr.length == 2) {
          //   this.formData.tel = telArr[1]
          // } else {
          //   this.formData.tel = telArr[0]
          // }
          this.signIdeaList = res1.sendList; //签发意见
          this.examineIdeaList = res1.pbIdeaList; //办理意见
          this.cyIdeaList = res1.cyList; //传阅意见
          // this.getHuanJie()
          if (
            this.formData.type != "本部会议通知" &&
            this.formData.type != "部门会议通知"
          ) {
            this.getFileList();
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody);
              this.$refs.ue.setDsabled();
            }, 1000);
          }
        });
    },
  },
  activated() {},
  created() {
    this.loadData();
    // if (this.$route.query.leixing == '本部会议通知') {
    //   this.hyConList1()
    // }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
.adminCbDetail {
  // background: white;
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
  .bank_dispach_content {
    width: 100%;
    height: auto;
  }
  .process_content {
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
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
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
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
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  padding: 0 10px;
}
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
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
//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .command_file {
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
    }
    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
</style>
