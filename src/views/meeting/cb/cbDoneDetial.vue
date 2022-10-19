<!--
 * @Author: your name
 * @Date: 2020-09-21 10:42:34
 * @LastEditTime: 2021-09-10 14:27:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cb\cbDoneDetial.vue
--> 
<template>
  <div class="cbDoneDetial">
    <div>
      <div id="meetzhifa" class="tablePrint">
        <el-row>
          <h1 class="title-h1">{{formData.draftOrgan}}{{formData.draftDepartment}}{{tempType}}（承办单）</h1>
        </el-row>
        <table
          cellspacing="0"
          cellpadding="0"
          class="printTableList"
          style="font-family: 宋体;font-size: 19px;"
        >
          <tbody>
            <tr style="height: 32px;">
              <td style="width:20%;text-align:center;vertical-align:middle">会议名称</td>
              <td
                style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
                colspan="4"
              >{{formData.title}}</td>
            </tr>
            <tr style="height: 32px;">
              <td style="width:20%;text-align:center;vertical-align:middle;">主办部门</td>
              <td
                style="width:40%;text-align:left;vertical-align:middle;"
                colspan="2"
              >{{formData.maindept}}</td>
              <td style="width:20%;text-align:center;vertical-align:middle">拟稿人</td>
              <td style="width:30%;text-align:left;vertical-align:middle">{{formData.authorCn}}</td>
            </tr>
            <tr style="height: 32px;">
              <td style="width:20%;text-align:center;vertical-align:middle;">联系电话</td>
              <td
                style="width:40%;text-align:left;vertical-align:middle"
                colspan="2"
              >{{formData.tel}}</td>
              <td style="width:20%;text-align:center;vertical-align:middle">拟稿日期</td>
              <td style="width:30%;text-align:left;vertical-align:middle">{{formData.draftDate}}</td>
            </tr>
            <tr style="height: 32px;" v-if="formData.type!='系统会议通知'">
              <td
                style="width:20%;text-align:center;vertical-align:middle"
              >{{formData.type=="培训会议通知"?'培训时间':'会议时间'}}</td>
              <td
                style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
                colspan="4"
              >{{formData.hyTime}}</td>
            </tr>
            <tr style="height: 32px;" v-if="formData.type!='系统会议通知'">
              <td
                style="width:20%;text-align:center;vertical-align:middle"
              >{{formData.type=="培训会议通知"?'培训地点':'会议地点'}}</td>
              <td
                style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
                colspan="4"
              >{{formData.hyAdress}}</td>
            </tr>
            <tr style="height: 32px;" v-if="formData.type=='系统会议通知'">
              <td style="width:20%;text-align:center;vertical-align:middle">联合单位</td>
              <td
                style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
                colspan="4"
              >{{formData.unitdept}}</td>
            </tr>
            <tr>
              <td style="width:20%;text-align:center;vertical-align:middle">内容</td>
              <td style="text-align:left" colspan="4">
                <div v-html="formData.wordBody"></div>
              </td>
            </tr>
            <tr style="min-height: 140px;">
              <td style="width:20%;text-align:center;vertical-align:middle">签发意见</td>
              <td colspan="4">
                <div class="qianF" v-for="item in signIdeaList" :key="item.id">
                  <div class="p1">{{item.opinion}}</div>
                  <div class="p2">
                    <span>
                      {{item.deptName}}&nbsp;
                      {{item.userName}}
                    </span>
                    <div class="date">{{item.date}}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr style="min-height: 280px;">
              <td style="width:20%;text-align:center;vertical-align:middle">办理意见</td>
              <!-- <td colspan="4">{{formData.checkList}}</td> -->
              <td colspan="4">
                <div class="piece" v-for="item in examineIdeaList" :key="item.id">
                  <div class="text1">{{item.opinion}}</div>
                  <div class="text2">
                    <span>
                      {{item.deptName}}&nbsp;
                      {{item.userName}}
                    </span>
                    <div>{{item.date}}</div>
                  </div>
                </div>
              </td>
            </tr>

            <tr style="min-height: 280px;">
              <td style="width:20%;text-align:center;text-align:center;vertical-align:middle">传阅意见</td>
              <!-- <td colspan="4">{{formData.cyList}}</td> -->
              <td colspan="4">
                <div class="chuanYue" v-for="item in cyIdeaList" :key="item.id">
                  <div class="chuanYue1">{{item.opinion}}</div>

                  <div class="chuanYue2">
                    <span>
                      {{item.deptName}}&nbsp;
                      {{item.userName}}
                    </span>
                    <div>{{item.date}}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="headerClick">
      <!-- <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>{{type}}</span>
      </div>-->
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" style="margin-right: 10px;" @click="buttonClick('关闭')">关闭</el-button>
        <span v-if="!formData.finishTime">
          <el-button v-if="formData.isReadflag == '0' && isLastHandler" class="bank_grid_comtent_active" plain @click="buttonClick('收回')">收回</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('催办')">催办</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('传阅')">传阅</el-button>
          <el-button
            class="bank_grid_comtent_active"
            v-if="formData.wyPle"
            plain
            @click="buttonClick('传阅收回')"
          >传阅收回</el-button>
          <!-- <el-button plain @click="buttonClick('查看传阅记录')">查看传阅记录</el-button> -->
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('查看流程')">查看流程</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('打印处理单')">打印处理单</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('收藏')">收藏</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('操作指南')">操作指南</el-button>
        </span>
        <span v-else>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('查看流程')">查看流程</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('打印处理单')">打印处理单</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('收藏')">收藏</el-button>
          <el-button class="bank_grid_comtent_active" plain @click="buttonClick('操作指南')">操作指南</el-button>
        </span>
        <el-button
          v-if="formData.isFeedback=='0'"
          plain
          class="bank_grid_comtent_active"
          @click="buttonClick('查看报名表')"
        >查看报名表</el-button>
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
                <!-- <span>{{formData.creator}}</span> -->
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
                  <el-input v-model="formData.title" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议名称" v-else>
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
                <el-form-item label="拟稿人" disabled>
                  <el-input v-model="formData.authorCn"></el-input>
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
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训时间" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyTime" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议时间" v-else>
                  <el-input v-model="formData.hyTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.type!='系统会议通知'">
              <el-col :span="24">
                <el-form-item label="培训地点" v-if="formData.type=='培训会议通知'">
                  <el-input v-model="formData.hyAdress" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议地点" v-else>
                  <el-input v-model="formData.hyAdress" disabled></el-input>
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
            <el-row>
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
              <template>
                <el-row v-if="!(signIdeaList && signIdeaList.length!=0)" style="margin-bottom:5px;">
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :rows="3"
                      v-model="formData.signIdea"
                      :disabled="true"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-col :span="23">
                  <div v-for="item in signIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span>{{item.deptName}}</span>
                            <span class="pad_lr10">{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="办理意见" prop="pbIdea">
              <template>
                <el-row
                  v-if="!(examineIdeaList && examineIdeaList.length!=0)"
                  style="margin-bottom:5px;"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formData.pbIdea"
                      :disabled="true"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-col :span="23">
                  <div v-for="item in examineIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span>{{item.deptName}}</span>
                            <span class="pad_lr10">{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="传阅意见" prop="cyyj">
              <template>
                <el-row v-if="!(cyIdeaList && cyIdeaList.length!=0)" style="margin-bottom:5px;">
                  <el-col :span="23">
                    <el-input type="textarea" :rows="3" v-model="formData.cyIdea" :disabled="true"></el-input>
                  </el-col>
                </el-row>
                <el-col :span="23">
                  <div v-for="item in cyIdeaList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col class="content-container">
                          <div>{{item.opinion}}</div>
                          <div class="adviceInfo">
                            <span>{{item.deptName}}</span>
                            <span class="pad_lr10">{{item.userName}}</span>
                            <p class="creat_time">{{item.date}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-form-item>
            <el-form-item label="反馈信息">
              <el-radio-group v-model="formData.isFeedback" @change="change" :disabled="true">
                <el-radio v-model="formData.isFeedback" :label="'0'" disabled>是</el-radio>
                <el-radio v-model="formData.isFeedback" :label="'1'" disabled>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-row v-if="formData.type=='系统会议通知'">
          <el-col :span="12">
            <el-form-item label="提醒方式">
              <el-select style="width:100%" v-model="select1.value1" placeholder="请选择">
                <el-option
                  v-for="item in select1"
                  :key="item.value1"
                  :label="item.value1"
                  :value="item.value1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.type=='系统会议通知'">
            <el-form-item label="提醒时间">
              <el-select style="width:100%" v-model="select2.value2" placeholder="请选择">
                <el-option
                  v-for="item in select2"
                  :key="item.value2"
                  :label="item.value2"
                  :value="item.value2"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="23">
                <el-form-item label="传阅人员">
                  <el-row>
                    <el-form-item label="未阅">
                      <p
                        :disabled="true"
                        style="border:1px solid #ccc;min-height:30px"
                      >{{formData.wyPle}}</p>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="已阅">
                      <p
                        :disabled="true"
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
            </el-form-item>-->
          </el-form>
        </div>
      </div>
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
    <!-- <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart> -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>

    <!-- 传阅收回选人 -->
    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
    <!-- 传阅 -->
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :scircularizeLevel="scircularizeLevel"
      :checkIds="checkIds"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      @showCompDialog="showCompDialogForCy"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/tree/tree-fawen";
// import flowChart from "components/dialog/flowChart";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import { mapGetters, mapActions } from "vuex";
import minixs from "../../../minixs/index";
import cyPersonList from "../../bianhan/components/cyPersonList";
import UE from "components/editor/ue.vue";
import exportTable from "../../../minixs/exportTable";
import beanList from "../../../util/beanList";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
export default {
  name: "cbDoneDetial",
  components: {
    selectPerson,
    shiwuFlow,
    cyPersonList,
    UE,
    treeCofigForCy,
  },
  props: {},
  mixins: [minixs, openOrDownLoadFile],
  data() {
    return {
       numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      isLastHandler: false, // 是否为上一处理人 是 为 true
      tempType: "",
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      scircularizeLevel: "1", //传阅常用联系人修改 12.21
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      cyCheckData: [], //选中数据
      isCY: "",
      seletOptionsDataForCy: [],
      // config: {
      //   initialFrameWidth: null,
      //   initialFrameHeight: 350,
      //   toolbars: [[
      //     'fullscreen', 'source', '|', 'undo', 'redo', '|',
      //     'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
      //     'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
      //     'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
      //     'directionalityltr', 'directionalityrtl', 'indent', '|',
      //     'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
      //     'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
      //     'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
      //     'horizontal', 'date', 'time', 'spechars', '|',
      //     'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
      //     'preview', 'searchreplace', 'help', 'drafts'
      //   ]]
      // },
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth",
      },
      // signIdeaList: [],//签发意见
      examineIdeaList: [], //办理意见
      cyIdeaList: [], //传阅意见
      id: this.$route.query.id,
      select: "",
      radio: "",
      checkList: ["行名", "部门", "姓名", "手机"],
      rules: {},
      formData: {},
      currentUser: JSON.parse(localStorage.getItem("userInfo")).humanName,
      type: "",
      showFlowChart: false,
      flowChartList: [], //流程列表

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
    // ...mapGetters([
    //   'todoItem'
    // ])
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
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.formData.mainId,numYear:this.numyear})
        .then((res) => {
          // this.formData.attchmentFileInfoZhi = res.data
          this.$nextTick(() => {
            this.formData.attchmentFileInfo = [];
            this.formData.attchmentFileInfo = res.data;
            this.$set(this.formData, "attchmentFileInfoZhi", res.data);
          });
        });
      // this.$api.setSysConfig.getTextemList({ id: this.id }).then(res => {
      //   this.formData.attchmentFileInfo = res.data
      // })
    },
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
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.save();
          break;
        case "完成并发送":
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.offenUse = true;
          this.toNext();
          break;
        case "收藏":
          // let deptTableHead = ''
          // deptTableHead = this.formData.draftOrgan + this.formData.draftDepartment + this.formData.type + '（承办单）'
          // exportTable.getPdf(deptTableHead, this.formData.attchmentFileInfo, "meetzhifa", "A08462002", "biaoti", this)
          // this.formData.wordBody =
          //   process.env.NODE_ENV == "production"
          //     ? this.$refs.ue.getUEContent()
          //     : "";
          // let deptTableHead = "";
          // deptTableHead =
          //   this.formData.draftOrgan +
          //   this.formData.draftDepartment +
          //   this.tempType;
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
                .cbCollect({ id: this.formData.id,numYear:this.numyear})
                .then((res) => {
                  let obj = {};
              let arr = [];
              obj.filePath = res.filePath;
              obj.fileName = res.fileName;
              this.downFile(obj);
                });
            })
            .catch(() => {
              
            });

          break;
        case "传阅":
          // this.singelCheckF = false;
          // this.offenUse = false;
          // this.dialogTypeNow = 'cy';
          // this.chuanYue();
          this.getTreeDataForCy("cy");
          break;
        case "传阅收回":
          this.$api.meeting.noCyList({ mainId: this.id }).then((res) => {
            if (res.data.length == 0) {
              this.$message({ type: "success", message: "暂无未阅人员" });
            } else {
              res.data.forEach((item) => {
                item.name = item.curUserCn;
              });
              this.cyData = res.data;
              this.showCyPerson = true;
            }
          });
          break;
        case "查看流程":
          this.$api.meeting.cbgetProcess({ id: this.id,numYear:this.numyear }).then((res) => {
            this.showFlowChart = true;
            this.flowChartList = res.list;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
          break;
        case "收回":
          this.$api.meeting
            .zfBack({
              id: this.id,
              avyId: this.formData.avyId,
              oldCurrentNode: this.formData.oldCurrentNode,
              type: "CB", //代表承办收承办，不传type时为制发收制发
            })
            .then((res) => {
              this.$message({
                message: "收回完成",
                type: "success",
              });
              this.$intent.closeWindow(this);
            });
          break;
        case "催办":
          this.$api.meeting
            .cuiban({ id: this.id, typeFlag: "1" })
            .then((res) => {
              this.$message({
                message: "催办成功",
                type: "success",
              });
            });
          break;
        case "操作指南":
          this.handBook("HYGL");
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/meetingCbPrint",
            query: { id: this.id,numYear:this.numyear },
          });
          break;
        case "查看报名表":
          this.$intent.goNewPage(this, {
            path: "/meeting/clookBaoMing",
            query: {
              id: this.formData.mainId,
              flag: "cb",
              curbankId: this.formData.curbankId,
              numYear:this.numyear
            },
          });
          break;
      }
    },
    // caozuozhinan () {
    //   this.$post
    //     .postData(
    //       "getAttchment",
    //       JSON.stringify({
    //         function: "getAttchment",
    //         moduleCode: "HYGL"
    //       }),
    //       this.$businessCode.fwbz
    //     )
    //     .then(res => {
    //       console.log("res", res)
    //       if (res && res.success) {
    //         this.getInstFileInfo(this, res.data).then(resF => {
    //           if (resF.state) {
    //             let data = this.$router.resolve({
    //               path: "/openAndSave_WordTs",
    //               query: {
    //                 state: "viewFile",
    //                 id: this.formData.id,
    //                 zhengWenState: 0,
    //                 JYcode: 'A08462002',
    //                 multiTenancyId: '000000iiii',
    //                 relativePath: resF ? resF.filePath : "",
    //                 fileName: resF ? resF.fileName : "",
    //                 showBtns: false
    //               }
    //             });
    //             window.open(data.href, "_blank");
    //           }
    //         });
    //       } else {
    //         this.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件不存在",
    //           duration: 1500
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件不存在",
    //         duration: 1500
    //       });
    //     });
    // },
    // //获取操作指南文件路径
    // async getInstFileInfo (self, flagFile) {
    //   console.log("-----flagFile--->", flagFile)
    //   var successInfo = { state: false };
    //   let bank_doDownloadFile = { function: "doDownloadFile" }
    //   bank_doDownloadFile.fileName = flagFile.fileName;
    //   bank_doDownloadFile.filePath = flagFile.filePath;
    //   await self.$post
    //     .postData(
    //       "doDownloadFile",
    //       JSON.stringify(bank_doDownloadFile),
    //       self.$businessCode.fwbzfj
    //     )
    //     .then(res => {
    //       console.log("-----res", res)
    //       if (res && res.success) {
    //         successInfo.filePath = res.filePath;
    //         successInfo.fileName = res.fileName;
    //         successInfo.state = true;
    //       } else {
    //         self.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件获取失败，请重新上传",
    //           duration: 1500
    //         });
    //         successInfo.state = false;
    //       }
    //     })
    //     .catch(erro => {
    //       self.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件获取失败，请联系管理员",
    //         duration: 1500
    //       });
    //       successInfo.state = false;
    //     });
    //   return successInfo;
    // },
    close() {
      this.$intent.closeWindow(this);
    },
    toNext() {
      this.$api.meeting
        .getPerson({
          id: this.id,
          // multiID: this.todoItem.multiID,
          // pcsAvyId: this.todoItem.pcsAvyId,
          // tplNo: this.todoItem.tplNo
        })
        .then((res) => {
          this.seletOptionsData = res.list;
          // this.treeData = res.result;
          this.treeData = res.result.data;
          this.dialogState = true;
        });
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      switch (dtype) {
        case "next":
          this.next(data[0], params);
          break;
        case "cy":
          this.cy(data);
          break;
        default:
          break;
      }
    },
    //完成并发送
    next(person, params) {
      this.formData.typeFlag = "1";
      this.formData.currentUserId = person.idStr;
      this.formData.currentUser = person.name;
      this.setFormWorkFlowData();
      this.formData.nextAvyId = params.id;
      this.formData.currentNode = params.name;
      this.$api.meeting.cbUpdateData(this.formData).then((res) => {
        this.$message({
          message: "发送成功",
          type: "success",
        });
      });
    },
    //获取传阅人员列表
    getTreeDataForCy(n) {
      // debugger
      if (n == "cy") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();

      this.$post
        .postData(
          "selectUserByCirculate", //传阅常用联系人修改 12.21
          JSON.stringify({
            function: "selectUserByCirculate", //传阅常用联系人修改 12.21
            level: this.scircularizeLevel, //传阅常用联系人修改 12.21
            flag: true,
          }),
          this.$businessCode.swgl
        )
        .then((res) => {
          if (res.message == "Loading") {
            this.loadingTreeForCy = true;
          } else {
            this.loadingTreeForCy = false;
          }
          this.treeData = (res && res.data) || [];
          this.treeData[0].disabled = true;
        });
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          this.checkIds = this.formData.cyToEn
            ? this.formData.cyToEn.split(",")
            : [];
          if (this.cyCheckData.length) {
            newA = [].concat(this.cyCheckData);
            newA.map((item) => {
              //选中的不可操作
              item.disabled = true;
            });
          }
          this.checkData = this.cyCheckData;
          break;
      }
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      console.log(4666, data);
      // debugger
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = [];
        let oldNames = [];
        let newNames = [];
        let codes = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map((item) => {
            names.push(item.name || item.text);
            if (item.idStr) {
              ids.push(item.idStr);
            }
            that.checkIds.push(item.id);
            if (item.code) {
              codes.push(item.code);
            }
          });
          this.formData.humenCode = codes.join(",");
          console.log(7777777, this.formData.humenCode);
          oldIds = this.formData.cyToEn.split(",");
          oldNames = this.formData.wyPle.split(",");
          // newIds = ids.filter((item) => {
          //   return oldIds.indexOf(item) == -1;
          // })
          newIds = ids;
          newNames = names.filter((item) => {
            return oldNames.indexOf(item) == -1;
          });
          newNames = newNames.join(",");
          newIds = newIds.join(",");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        switch (dtype) {
          case "cy":
            this.formData.currentUser = newNames;
            this.formData.currentUserId = newIds;
            this.cyCheckData = this.checkData;
            break;
        }
        if (!!this.formData.currentUser) {
          this.cy();
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    //发传阅
    cy() {
      this.formData.currentNode = "承办";
      this.$api.meeting.sendChuanYue(this.formData).then((res) => {
        this.loadData();
        this.$message({
          message: "传阅成功",
          type: "success",
        });
      });
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(",");
      names = name.split(",");
      ids.map((item, n) => {
        if (!!item) {
          obj.push({
            id: item,
            name: names[n],
          });
        }
      });
      return obj;
    },
    // //获取传阅人员列表
    // chuanYue () {
    //   this.$api.meeting.getCyPerson({}).then(res => {
    //     this.treeData = res.result.data;
    //     this.dialogState = true;
    //   })
    // },
    // //发传阅
    // cy (person) {
    //   let ids = [], names = [], codes = [];
    //   person.forEach(item => {
    //     ids.push(item.idStr)
    //     names.push(item.name)
    //     codes.push(item.code)
    //   })
    //   this.formData.currentUserId = ids.join(',')
    //   this.formData.currentUser = names.join(',')
    //   this.formData.humenCode = codes.join(',')
    //   this.formData.currentNode = "承办";
    //   this.$api.meeting.sendChuanYue(this.formData).then(res => {
    //     this.loadData()
    //     this.$message({
    //       message: '传阅成功',
    //       type: 'success'
    //     });
    //   })
    // },
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
    //   保存
    save() {
      this.formData.typeFlag = "0";
      this.$api.meeting.cbUpdateData(this.formData).then((res) => {
        this.loadData();
        this.$message({
          message: "保存成功",
          type: "success",
        });
      });
    },
    change() {},
    onScroll() {
      // const scrolled = Math.floor(
      //   document.body.scrollTop ||
      //   document.documentElement.scrollTop ||
      //   window.pageXOffset
      // );
      // if (scrolled < this.distance_qpyj - 650) {
      //   this.active = "#wjys";
      // } else if (scrolled > this.distance_qpyj - 650 && scrolled < this.distance_scfj - 400) {
      //   this.active = "#qpyj";
      // } else if (scrolled > this.distance_scfj - 400) {
      //   this.active = "#scfj";
      // }
    },
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

          const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || {};
          // 判断是否为上一处理人
          const oldUserCodeArr = this.formData.currentUserOldId ? this.formData.currentUserOldId.split('#').filter(item => item) : [];
          if (oldUserCodeArr && oldUserCodeArr.length > 0) {
            this.isLastHandler = oldUserCodeArr[oldUserCodeArr.length - 1] === userInfo.humanCode;
          }

          if (this.formData.type == "培训会议通知") {
            this.tempType = "培训通知";
          } else {
            this.tempType = this.formData.type;
          }
          // const telArr = res1.meetCbOrderDo.tel.split(',')
          // if (telArr.length == 2) {
          //   this.formData.tel = telArr[1]
          // } else {
          //   this.formData.tel = telArr[0]
          // }
          //获取传阅未阅已选人员
          if (this.formData.cyToEn) {
            this.cyCheckData = this.concatTreeData(
              this.formData.cyToEn,
              this.formData.wyPle
            );
          } else {
            this.cyCheckData = [];
          }
          this.signIdeaList = res1.sendList; //签发意见
          this.examineIdeaList = res1.pbIdeaList; //办理意见
          this.cyIdeaList = res1.cyList; //传阅意见
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
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cbDoneDetial {
  // background: white;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
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
    padding-bottom: 20px;
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
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
}
.content-container:hover {
  border: 1px solid #8996af;
}
.adviceInfo {
  width: 100%;
  right: 10%;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 0 0 16px;
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
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
.opinionStyle {
  color: #606266;
  word-break: break-all;
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
.tablePrint {
  position: absolute;
  z-index: -999;
}
.printTableList {
  width: 94%;
  margin: 0 auto;

  tr {
    height: 32px;
    td {
      word-break: break-all;
      width: 12%;
      // text-align: center;
      // vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
// .printButton {
//   position: absolute;
//   right: 28%;
//   z-index: 10;
//   top: 6%;
// }
td {
  border: solid #000 1px;
}
.tcont {
  padding-bottom: 5px;
  border-bottom: 1px solid #dac6c5;
}
.tcont:last-child {
  border-bottom: none;
}
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
}
.tcont2 > div {
  float: right;
  /* background-color:#F2CACB; */
}
.issueTable {
  height: 100%;
  border-collapse: collapse;
  border: none;
  width: 100%;
}
.issueTable tr:nth-of-type(1) {
  border-top: none;
}
.issueTable tr:last-child {
  border-bottom: none;
}
.issueTable td {
  border: none;
}
.issueTable tr {
  line-height: 25px;
  text-align: center;
  border: solid 1px #000;
  border-left: none;
  border-right: none;
}
.d_flex {
  display: flex;
  // padding-bottom: 20px;
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
