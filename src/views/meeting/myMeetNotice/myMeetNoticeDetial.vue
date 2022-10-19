<!--
 * @Author: your name
 * @Date: 2020-09-30 10:43:55
 * @LastEditTime: 2020-11-14 18:53:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cb\chDoneDetial.vue
--> 
<template>
  <div class="chDoneDetial" id="meetzhifa">
    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
        <span>
          <el-button plain @click="buttonClick('查看流程')">查看流程</el-button>
          <el-button plain @click="buttonClick('打印处理单')">打印处理单</el-button>
          <el-button plain @click="buttonClick('操作指南')">操作指南</el-button>
          <el-button plain @click="buttonClick('收藏')">收藏</el-button>
        </span>
      </div>
    </div>
    <div class="formHeader">
      <div
        class="title-text"
        v-if="formData.curbankId=='111111111'"
      >{{formData.curbank}}{{formData.draftDepartment}}{{formData.type}}（参会单）</div>
      <div class="title-text" v-else>{{formData.draftDepartment}}{{formData.type}}（参会单）</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
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
          v-if="formData.type!='本部会议通知'"
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <!-- <span>{{formData.creator}}</span> -->
            <span>{{formData.undertakeCurrentlinks}}</span>
          </p>
          <p>
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
            <el-form-item label="会议名称">
              <el-input v-model="formData.title" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主办部门">
              <el-input v-model="formData.maindept" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拟稿人">
              <el-input v-model="formData.authorCn" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="formData.tel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拟稿日期">
              <el-input v-model="formData.draftDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type=='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="主持人">
              <el-input v-model="formData.host" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="this.formData.type=='本部会议通知'||this.formData.type=='系统会议通知'">
          <el-col :span="24">
            <el-form-item label="联合单位">
              <el-input v-model="formData.unitdept" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type=='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="出席">
              <el-input v-model="formData.attend" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type=='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="列席">
              <el-input v-model="formData.attendance" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type=='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="摘要">
              <el-input v-model="formData.summary" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-form-item align="right" style="margin-right:5.5%">
            <el-button disabled>增加</el-button>
          </el-form-item>
          <el-row>
            <el-form-item label="会议内容">
              <div class="box1" v-if="listArr.length>0">
                <div
                  class="con-box clear-fix"
                  v-for="item in listArr"
                  :key="item.id"
                  style="border:1px solid #ccc;margin-bottom:1px"
                >
                  <div class="con-left">
                    <div class="clear-fix">
                      <div class="con-left-p1">会议议题</div>
                      <div class="con-left-p2">{{item.topic}}</div>
                    </div>
                    <div class="clear-fix">
                      <div class="con-left-p1">参会部门</div>
                      <div class="con-left-p2">{{item.joinDept}}</div>
                    </div>
                    <div class="clear-fix">
                      <div
                        style="height:100px;line-height:100px"
                        class="con-left-p1 bottom-none"
                      >会议材料</div>
                      <div style="height:100px;line-height:100px" class="con-left-p2 bottom-none">
                        <el-col :span="23">
                          <div
                            class="tree_w tree_w1"
                            v-if="item.attchmentFileInfo&&item.attchmentFileInfo.length"
                          >
                            <el-scrollbar>
                              <div
                                v-for="(item1,index1) in  item.attchmentFileInfo"
                                :key="item1.id"
                                class="comp_list"
                              >
                                <template>
                                  <div class="command_file">
                                    <span
                                      class="name down"
                                      @click="downFile(item1)"
                                    >{{item1.fileName}}</span>
                                    <span class="name">{{item1.createrName}}</span>
                                    <span class="name">{{item1.createTime}}</span>
                                    <div class="btns">
                                      <el-button
                                        type="primary"
                                        size="mini"
                                        @click.native="downFile(item1)"
                                        round
                                      >下载</el-button>
                                    </div>
                                  </div>
                                </template>
                              </div>
                            </el-scrollbar>
                          </div>
                        </el-col>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="con-right" v-if="isShow">
                    <el-button @click="hyBtnClick('编辑',item)">编辑</el-button>
                    <el-button @click="hyBtnClick('删除',item)">删除</el-button>
                  </div>
                  <div class="con-right" v-if="!isShow">
                    <el-button @click="hyBtnClick('增发',item)">增发</el-button>
                  </div>-->
                </div>
              </div>
            </el-form-item>
          </el-row>
        </el-row>
        <!-- <el-row v-if="formData.type=='系统会议通知'"> -->
        <el-row v-if="formData.type!='本部会议通知'&&formData.type!='部门会议通知'">
          <el-col :span="24">
            <el-form-item label="委托承办单位">
              <el-row>
                <el-col :span="20">
                  <el-input v-model="formData.entrustUnit" disabled></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" style="float:right" disabled>选择</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" style="float:right" disabled>删除</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type!='本部会议通知'">
          <el-col :span="24">
            <el-form-item label="内容">
              <!-- <el-input
                type="textarea"
                :rows="10"
                resize="none"
                v-model="formData.wordBody"
                disabled
              ></el-input>-->
              <div class="editor_box">
                <!-- <label>便函内容</label> -->
                <UE :config="config" id="UE" ref="ue"></UE>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <h6 class="bank_dispach_file_tit">签批意见</h6>
        <div id="qpyj" class="height_90"></div>
        <el-form-item label="签发意见" prop="opinionSend">
          <template>
            <el-row v-if="!(signIdeaList && signIdeaList.length!=0)">
              <el-col :span="23">
                <el-input type="textarea" :rows="3" v-model="formData.signIdea" :disabled="true"></el-input>
              </el-col>
              <!-- <el-col :span="1" style="text-align: right">
                <i class="icon-font el-icon-edit select-chang" @click="showWriteList('qianfa')"></i>
              </el-col>-->
            </el-row>
            <div v-for="item in signIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      rows="3"
                      class="d_f1"
                      :disabled="true"
                      :value="item.opinion"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.DATE}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="办理意见" prop="opinionCheck">
          <template>
            <el-row v-if="!(examineIdeaList && examineIdeaList.length!=0)">
              <el-col :span="23">
                <el-input type="textarea" :rows="3" v-model="formData.examineIdea" :disabled="true"></el-input>
              </el-col>
              <!-- <el-col :span="1" style="text-align: right">
                <i class="icon-font el-icon-edit select-chang" @click="showWriteList('chuli')"></i>
              </el-col>-->
            </el-row>
            <div v-for="item in examineIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      rows="3"
                      class="d_f1"
                      :value="item.opinion"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.DATE}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="传阅意见" prop="cyyj">
          <template>
            <el-row v-if="!(cyIdeaList && cyIdeaList.length!=0)">
              <el-col :span="23">
                <el-input type="textarea" :rows="3" v-model="formData.cyIdea" :disabled="true"></el-input>
              </el-col>
              <!-- <el-col :span="1" style="text-align: right">
                <i class="icon-font el-icon-edit select-chang" @click="showWriteList('chuanyue')"></i>
              </el-col>-->
            </el-row>
            <div v-for="item in cyIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      rows="3"
                      class="d_f1"
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
          </template>
        </el-form-item>
        <el-form-item label="反馈信息">
          <el-radio-group v-model="formData.isFeedback" @change="change">
            <el-radio v-model="formData.isFeedback" :label="'0'" disabled>是</el-radio>
            <el-radio v-model="formData.isFeedback" :label="'1'" disabled>否</el-radio>
          </el-radio-group>
          <el-row style="padding-left:7%;margin:5px 0 20px" v-if="formData.isFeedback=='0'">
            <el-col :span="24">
              <m-table
                size="medium"
                :isHandle="false"
                :sortable="false"
                :tableData="tableData"
                :tableCols="tableCols"
                :isSelection="false"
                :isIndex="false"
                :isPagination="false"
              ></m-table>
            </el-col>
          </el-row>
          <!-- <el-form-item align="center">
            <el-button style="margin:0 10px" @click="buttonClick('选择参会人')">选择参会人</el-button>
            <el-button @click="buttonClick('提交报名表')">提交报名表</el-button>
          </el-form-item>-->
          <!-- <el-checkbox-group v-if="radio=='1'" v-model="checkList">
            <el-checkbox label="行名" disabled></el-checkbox>
            <el-checkbox label="部门" disabled></el-checkbox>
            <el-checkbox label="姓名" disabled></el-checkbox>
            <el-checkbox label="性别"></el-checkbox>
            <el-checkbox label="民族"></el-checkbox>
            <el-checkbox label="职务"></el-checkbox>
            <el-checkbox label="邮箱"></el-checkbox>
            <el-checkbox label="手机" disabled></el-checkbox>
            <el-checkbox label="固定电话"></el-checkbox>
            <el-checkbox label="身份证号"></el-checkbox>
            <el-checkbox label="到达时间"></el-checkbox>
            <el-checkbox label="接站信息"></el-checkbox>
          </el-checkbox-group>-->
        </el-form-item>
        <el-row>
          <el-col :span="23">
            <el-form-item label="传阅人员">
              <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                <div class="clear-fix chuanyue1">
                  <p class="chuanyue-p1">未阅</p>
                  <el-input
                    class="chuanyue-p2"
                    :disabled="true"
                    v-model="formData.wyPle"
                    style="border:0;outline:medium"
                  ></el-input>
                </div>
                <div class="clear-fix chuanyue">
                  <p class="chuanyue-p1">已阅</p>
                  <el-input class="chuanyue-p2" :disabled="true" v-model="formData.yyPle"></el-input>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <h6 class="bank_dispach_file_tit" v-if="formData.type!='本部会议通知'">附件</h6>
        <div id="scfj" class="height_90" v-if="formData.type!='本部会议通知'"></div>
        <el-form-item label="制发单附件" v-if="formData.type!='本部会议通知'">
          <el-col :span="23">
            <div
              class="tree_w"
              v-if="formData.attchmentFileInfoZhi&&formData.attchmentFileInfoZhi.length"
            >
              <el-scrollbar>
                <div
                  v-for="item in  formData.attchmentFileInfoZhi"
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
        <el-form-item label="参会单附件" v-if="formData.type!='本部会议通知'">
          <el-col :span="23">
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
      </el-form>
    </div>
    <select-person
      :canTab="false"
      :loadingTree="true"
      :hasRadio="hasRadio"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person>
    <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart>
    <!-- 传阅收回选人 -->
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
// import editor from '@/components/editor/editor.vue';
import selectPerson from 'components/tree/tree-fawen'
import flowChart from "components/dialog/flowChart";
import { mapGetters, mapActions } from "vuex";
import minixs from "../../../minixs/index";
import cyPersonList from "../../bianhan/components/cyPersonList";
import UE from 'components/editor/ue.vue';
import mTable from "@/components/table/tTable";
import exportTable from "../../../minixs/exportTable";

export default {
  name: "myMeetNoticeDetial",
  components: {
    selectPerson,
    flowChart,
    cyPersonList,
    UE,
    mTable
  },
  props: {},
  mixins: [minixs],
  data () {
    return {
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350,
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
          'horizontal', 'date', 'time', 'spechars', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          'preview', 'searchreplace', 'help', 'drafts'
        ]]
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      tableData: [],
      tempArr: [],
      returnCnArr: [],
      returnEnArr: [],
      isNecessArr: [],
      tableCols: [],
      attendObj: {},
      attendArr: [],
      currentUser: JSON.parse(localStorage.getItem('userInfo')).humanName,
      currentUserId: JSON.parse(localStorage.getItem('userInfo')).humanId,
      signIdeaList: [],//签发意见
      examineIdeaList: [],//办理意见
      cyIdeaList: [],//传阅意见
      id: this.$route.query.id,
      select: "",
      radio: "",
      checkList: ["行名", "部门", "姓名", "手机"],
      rules: {},
      formData: {
        //   currentNode: "制发",
        // draftTime: formatData(new Date().getTime(), "YYYY-MM-DD"),
        // authorCn: JSON.parse(localStorage.getItem('userInfo')).humanName,
        // draftDepartment: JSON.parse(localStorage.getItem('userInfo')).currUnitName,
        // phone: JSON.parse(localStorage.getItem('userInfo')).telMobile.split(",")[1] ? JSON.parse(localStorage.getItem('userInfo')).telMobile.split(",")[1] : "",
        // documentNo: "",
        // isFeedbackMode: "0",
      },
      // buttonList: [
      //   // { name: "完成并发送", type: "shouhui", show: true },
      //   { name: "收回", type: "shouhui", show: true },
      //   { name: "催办", type: "cuiban", show: true },
      //   { name: "传阅", type: "cy", show: true },
      //   { name: "传阅收回", type: "cysh", show: true },
      //   { name: '查看流程', type: 'cklc', show: true },
      //   { name: "查看报名表", type: "ckbaomingbiao", show: true },
      //   { name: '打印处理单', type: 'dycld', show: true },
      //   { name: '收藏', type: 'shoucang', show: true },
      //   { name: '操作指南', type: 'cazuozhinan', show: true },
      //   { name: '维护', type: 'weihu', show: true },
      // ],
      // bm: this.$route.query.bm,
      type: '',
      // select1: [
      //   {
      //     value1: '应用内提醒',
      //     label1: '1',
      //   }
      // ],
      // select2: [
      //   {
      //     value2: '提前一天',
      //     label2: '1',
      //   }
      // ],
      showFlowChart: false,
      flowChartList: [],//流程列表

      treeData: [],//人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false,//显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false,//是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      // 传阅收回选人
      cyData: [],
      showCyPerson: false,
      cyArr: [],
      cyObj: {},
    }
  },
  computed: {
    ...mapGetters([
      'todoItem'
    ])
  },
  mounted () {
    this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(() => {
      document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    ...mapActions([
      'setTodoItem'
    ]),
    getHuanJie () {
      // typeFlag区分制发与承办  0制发,1承办
      this.$api.meeting.getHuanJie({ id: this.id, typeFlag: '1' }).then(res => {
        // console.log(123456)
        this.huanJieMessage = res.Fields
        //   this.requiredFields = this.setRequiredFields(this.requiredFields, this.huanJieMessage.requiredFields)//可编辑控制域
        // this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
        // this.buttonList = this.showButton(this.buttonList, this.huanJieMessage.visibleButtons, this.huanJieMessage.visibleButtonsBycondition)//按钮
        // this.editedIdeaFields = this.setEditedIdeaFields(this.editedIdeaFields, this.huanJieMessage.editedIdeaFields, this.huanJieMessage.editedIdeaFieldsBycondition)//可编辑意见域
        // this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.huanJieMessage.requiredIdeaFields)//可编辑意见
      })
    },
    //设置工作流数据
    setFormWorkFlowData () {
      this.formData.avyId = this.todoItem.avyId
      this.formData.multiID = this.todoItem.multiID
      this.formData.pcsAvyId = this.todoItem.pcsAvyId
      this.formData.tplNo = this.todoItem.tplNo
    },
    buttonClick (params) {
      switch (params) {
        case "关闭":
          this.close()
          break
        case '保存':
          this.save()
          break
        case '完成并发送':
          this.singelCheckF = true;
          this.dialogTypeNow = 'next';
          this.offenUse = true;
          this.toNext();
          break;
        case '传阅':
          this.singelCheckF = false;
          this.offenUse = false;
          this.dialogTypeNow = 'cy';
          this.chuanYue();
          break;
        case '传阅收回':
          // this.$api.meeting.cheHuiCy({ id: this.id }).then(res => {
          //   this.loadData()
          //   this.$message({
          //     message: '撤回成功',
          //     type: 'success'
          //   });
          // })
          this.$api.meeting.noCyList({ mainId: this.id }).then(res => {
            // console.log(7878787, res)
            if (res.data.length == 0) {
              this.$message({ type: "success", message: "暂无未阅人员" })
            } else {
              res.data.forEach(item => {
                item.name = item.curUserCn
              })
              this.cyData = res.data;
              this.showCyPerson = true;
            }
          })
          break;
        case '催办':
          this.$api.meeting.cuiban({ id: this.id, typeFlag: '1' }).then(res => {
            this.$message({
              message: '催办成功',
              type: 'success'
            });
          })
          break;
        case '收回':
          this.$api.meeting.cbChOldBack({ id: this.id }).then(res => {
            this.$message({
              message: '收回完成',
              type: 'success'
            });
            this.$intent.closeWindow(this);
          })
          break;
        case "打印处理单":
          this.$intent.go(this, { path: "/meetingChPrint", query: { id: this.id } })
          break;
        case '操作指南':
          this.$message({
            message: '暂无文档',
            type: 'warning'
          });
          break;
        case "收藏":
          let deptTableHead = ''
          if (this.formData.curbankId == '111111111') {
            deptTableHead = this.formData.curbank + this.formData.draftDepartment + this.formData.type + '（参会单）'
          } else {
            deptTableHead = this.formData.draftDepartment + this.formData.type + '（参会单）'
          }
          exportTable.getPdf(deptTableHead, this.formData.attchmentFileInfo, "meetzhifa")
          break;
        case "查看流程":
          this.$api.meeting.cbgetProcess({ id: this.id }).then(res => {
            this.showFlowChart = true;
            this.flowChartList = res.list
          })
          break;
        case "查看报名表":
          this.$intent.goNewPage(this, {
            path: "/meeting/clookBaoMing",
            query: { id: this.id, flag: 'cb' },
          });
          break;
        case '催办':
          this.$api.meeting.cuiban({ id: this.id, typeFlag: '1' }).then(res => {
            this.$message({
              message: '催办成功',
              type: 'success'
            });
          })
          break;
      }
    },
    close () {
      // this.$confirm("是否保存并退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      //   if (this.id) {
      //     // this.formdata.type = '0'
      //     this.$api.meeting.cbUpdateData(this.formData).then(res => {
      //       this.$intent.closeWindow(this);
      //     })
      //   }
      // }).catch(() => {
      this.$intent.closeWindow(this);
      // });
    },
    toNext () {
      this.$api.meeting.cbgetPerson({
        id: this.id,
        // multiID: this.todoItem.multiID,
        // pcsAvyId: this.todoItem.pcsAvyId,
        // tplNo: this.todoItem.tplNo
      }).then(res => {
        this.seletOptionsData = res.list
        // this.treeData = res.result;
        this.treeData = res.result.data;
        this.dialogState = true;
      })
    },
    //选人成功后
    showCompDialog (data, status, type, params, dtype) {
      this.dialogState = false;
      switch (dtype) {
        case "next":
          this.next(data[0], params)
          break
        case "cy":
          this.cy(data)
          break
        // case "cb":
        //   this.cb(data)
        //   break
        default:
          break
      }
    },
    //完成并发送
    next (person, params) {
      this.formData.typeFlag = '1'
      this.formData.currentUserId = person.idStr;
      this.formData.currentUser = person.name;
      this.setFormWorkFlowData();
      this.formData.nextAvyId = params.id
      this.formData.currentNode = params.name
      // this.formData.title = '44new'
      this.$api.meeting.cbUpdateData(this.formData).then(res => {
        this.$message({
          message: '发送成功',
          type: 'success'
        });
        // this.$intent.closeWindow(this)
      })
    },
    //获取传阅人员列表
    chuanYue () {
      this.$api.meeting.getCyPerson({}).then(res => {
        this.treeData = res.result.data;
        this.dialogState = true;
      })
    },
    //发传阅
    cy (person) {
      let ids = [], names = [];
      person.forEach(item => {
        ids.push(item.idStr)
        names.push(item.name)
      })
      this.formData.currentUserId = ids.join(',')
      this.formData.currentUser = names.join(',')
      this.formData.currentNode = "承办";
      this.$api.meeting.sendChuanYue(this.formData).then(res => {
        this.loadData()
        this.$message({
          message: '传阅成功',
          type: 'success'
        });
      })
    },
    //传阅收回
    cyPersonList (data) {
      let ids = [];
      data.map(item => {
        ids.push(item.id)
      })
      this.$api.meeting.cheHuiCy({ ids: ids.join(",") }).then(res => {
        this.loadData()
        this.$message({
          message: '传阅收回成功',
          type: 'success'
        });
      })
    },
    //   保存
    save () {
      this.formData.typeFlag = '0'
      this.$api.meeting.cbUpdateData(this.formData).then(res => {
        this.loadData()
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
    },
    getFileList () {
      // this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
      //   this.formData.attchmentFileInfo = res.data
      // })
      this.$api.setSysConfig.getTextemList({ id: this.formData.mainId }).then(res => {
        this.formData.attchmentFileInfoZhi = res.data

      })
      this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
        this.formData.attchmentFileInfo = res.data
      })
    },
    getFileList1 (id, index) {
      this.$api.setSysConfig.getTextemList({ id: id }).then(res => {
        this.listArr[index].attchmentFileInfo = res.data
      })
    },
    // 会议内容列表查询
    hyConList1 () {
      this.$api.meeting.hyConList({ id: this.formData.mainId }).then(res => {
        this.listArr = res.list
        this.listArr.forEach((item, index) => {
          this.getFileList1(item.id, index)
        })
      })
    },
    change () {

    },
    onScroll () {
      const scrolled = Math.floor(
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageXOffset
      );
      if (scrolled < this.distance_wjys) {
        this.active = "#wjys";
      } else if (scrolled >= this.distance_wjys - 200 && scrolled < this.distance_qpyj) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    toTarget (target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    loadData () {
      this.$api.meeting.cbDetial1({
        id: this.id
      }
      )
        .then(res1 => {
          this.tableData = []
          this.tableCols = []
          this.formData = res1.meetCbOrderDo
          const telArr = res1.meetCbOrderDo.tel.split(',')
          if (telArr.length == 2) {
            this.formData.tel = telArr[1]
          } else {
            this.formData.tel = telArr[0]
          }
          if (this.formData.isFeedback == '0') {
            this.tempArr = []
            this.returnCnArr = []
            this.returnEnArr = []
            this.isNecessArr = []
            this.tempArr = this.formData.returnHtml.split('&')
            // console.log(7878, this.tempArr)
            this.returnCnArr = this.tempArr[0].split(',')
            this.returnEnArr = this.tempArr[1].split(',')
            this.isNecessArr = this.tempArr[2].split(',')
            this.attendArr = []
            this.returnCnArr.forEach((item, index) => {
              this.attendObj = {}
              this.attendObj.label = item

              this.attendObj.prop = this.returnEnArr[index]

              // if (item == '姓名' || item == '行名' || item == '部门') {
              //   this.attendObj.type = ""
              //   // this.attendObj.formatter = function (row) {
              //   //   console.log("------>", row)
              //   //   return true

              //   // }
              // } else {
              //   this.attendObj.type = "Input"
              // }
              //  if (item == '姓名' || item == '行名' || item == '部门') {
              //   this.attendObj.type = ""
              //   // this.attendObj.formatter = function (row) {
              //   //   console.log("------>", row)
              //   //   return true

              //   // }
              // } else {
              this.attendObj.type = ""
              this.tableCols.push(this.attendObj)
            })
            let newArr = []
            newArr = this.tableCols.concat()
            // newArr.pop()
            // console.log(23243253, newArr)

            if (this.formData.returnHtmlData && this.formData.returnHtmlData.length > 0) {
              let arr1 = []
              let obj2 = {}
              arr1 = this.formData.returnHtmlData.split('&')
              // console.log(121, arr1)
              arr1.forEach((item, index) => {
                let arr2 = []
                let obj1 = {}
                arr2 = item.substr(0, item.length - 1).split(',')
                // console.log(999, arr2)

                arr2.forEach((item1, index1) => {
                  // console.log(7878, index1)
                  obj1[newArr[index1].prop] = item1
                })
                // console.log(999, obj1)
                this.tableData.push(obj1)
              })

            }
          }
          this.signIdeaList = res1.sendList//签发意见
          this.examineIdeaList = res1.pbIdeaList//办理意见
          this.cyIdeaList = res1.cyList//传阅意见

          if (this.formData.type == '本部会议通知') {
            this.hyConList1()
          }
          if (this.formData.type != '本部会议通知') {
            this.getFileList()
            setTimeout(() => {
              this.$refs.ue.setUEContent(this.formData.wordBody)
              this.$refs.ue.setDsabled()
            }, 1000)
          }
        })
    }
  },
  activated () {
  },
  created () {
    this.loadData()
    // if (this.$route.query.leixing == '本部会议通知') {
    //   this.hyConList1()
    // }

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.chDoneDetial {
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

  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
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
.clear-fix{
    border-bottom: 1px solid #ccc;
  }
  .clear-fix:last-of-type{
    border:none;
  }
  .con-left-p1 {
    width: 12%;
    min-height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 0;
  }

  .con-left-p2 {
    width: 88%;
    min-height: 30px;
    line-height: 30px;
    float: left;
    border-left: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
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

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.tree_w1 {
  height: 100px;
  padding: 0;
  // overflow: scroll;
  margin: 0;
}
</style>
