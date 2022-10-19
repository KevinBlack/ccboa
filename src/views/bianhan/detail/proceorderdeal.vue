
<template>
  <div class="process_order" id="bianhanzhifa" v-if="isShowDocument">
    <!-- 将表单内容抽成一个table表格，用于收藏表单数据 -->
    <!-- <collectionPage
      :formdata="formdata"
      :formList="formList"
      pagetype="zf"
      :editedIdeaFields="editedIdeaFields"
    ></collectionPage>-->

    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" v-show="false" @click="setGobalUE">测试编辑器</el-button>
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')">关闭</el-button>
        <template v-if="!isfinish">
          <el-button
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonList[index].show"
            :disabled="buttonDisabled"
            class="bank_grid_comtent_active"
            plain
          >{{item.name}}</el-button>
        </template>
        <template v-else>
          <el-button plain @click="buttonClick('查看流程')">查看流程</el-button>
          <el-button plain @click="buttonClick('打印处理单')">打印处理单</el-button>
          <el-button plain @click="buttonClick('收藏')">收藏</el-button>
          <el-button plain @click="buttonClick('操作指南')">操作指南</el-button>
        </template>
        <!-- <template v-if="isAuthorizeOthers&&!isfinish">
          <el-button
            class="bank_grid_comtent_active"
            v-for="(item,index) in buttonListAuthorizeOthers"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonListAuthorizeOthers[index].show"
            plain
          >{{item.name}}</el-button>
        </template>
        <template v-else>
          <el-button
            class="bank_grid_comtent_active"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
        </template>-->
      </div>
    </div>

    <div class="formHeader">
      <!--表头-->
      <div class="shiwuTitle">{{formdata.deptTableHead}}</div>
    </div>

    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <sidebarNavigation container="#bank_dispach_content"></sidebarNavigation>

      <div class="bank_dispach_file">
        <div class="process_content">
          <el-form label-width="120px" :model="formdata" :rules="rules" ref="elForm">
            <div class="cur_box">
              <div class="cur_sess">
                <p>
                  当前环节：
                  <span>{{formdata.currentNode}}</span>
                </p>
                <p>
                  当前处理人：
                  <span>{{formdata.currentNowName}}</span>
                </p>
              </div>
              <div class="feed_back">
                <template>
                  <el-form-item
                    label="反馈方式："
                    prop="feedbackMode"
                    ref="feedbackMode"
                    style="line-height:20px;"
                  >
                    <el-radio-group
                      v-model="formdata.feedbackMode"
                      :disabled="readFields.feedbackMode"
                    >
                      <el-radio :label="'0'">无需反馈</el-radio>
                      <el-radio :label="'1'">反馈意见</el-radio>
                      <el-radio :label="'2'">反馈意见及附件</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
              </div>
            </div>
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row>
              <el-col :span="formdata.feedbackMode=='1'||formdata.feedbackMode=='2'?16:24">
                <el-form-item :label="bianhanLabelzf.title" prop="title" ref="title">
                  <el-input
                    v-model="formdata.title"
                    :disabled="readFields.Title||!!formdata.bhCbDept"
                    maxlength="500"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.feedbackMode=='1'||formdata.feedbackMode=='2'">
                <el-form-item label="反馈截止日期" prop="feedTime" ref="feedTime">
                  <el-date-picker
                    :picker-options="pickerOptions"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    v-model="formdata.feedTime"
                    :disabled="readFields.feedTime"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="编号" prop="documentNo" ref="documentNo">
                  <el-input v-model="formdata.documentNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  v-if="isZH"
                  label
                  prop="isbnbh"
                  ref="isbnbh"
                  style="text-align: right"
                >
                  <el-checkbox
                    v-model="formdata.bnbh"
                    :disabled="!isBnEdit||formdata.hasDocumentNo=='true'"
                    true-label="1"
                    false-label="0"
                  >部内便函</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="主送" prop="main" ref="main">
              <el-row>
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 1}"
                    class="zhusong"
                    resize="none"
                    v-model="formdata.main"
                    :disabled="readFields.main||!!formdata.bhCbDept"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!readFields.main">
                  <i class="icon-font el-icon-plus select-chang" @click="selectMainOrCopy('main')"></i>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="抄送" prop="copy" ref="copy">
              <el-row>
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 1}"
                    class="chaosong"
                    resize="none"
                    v-model="formdata.copy"
                    :disabled="readFields.copy||!!formdata.bhCbDept"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!readFields.copy">
                  <i class="icon-font el-icon-plus select-chang" @click="selectMainOrCopy('copy')"></i>
                </el-col>
              </el-row>
            </el-form-item>
            <div class="editor_box" style="position:relative">
              <label>内容</label>
              <UE :config="config" id="UE" ref="ue"></UE>
            </div>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿部门" prop="draftDepartmentOne" ref="draftDepartmentOne">
                  <el-select
                    v-model="formdata.draftDepartmentOne"
                    disabled
                    @change="changeFirstUnitName"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in deptList"
                      :key="item.currUnitId"
                      :label="item.departmentStr"
                      :value="item.humanId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
                  <el-date-picker
                    type="date"
                    v-model="formdata.draftTime"
                    style="width: 100%"
                    :disabled="readFields.CreateDate"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿人" prop="draftUser" ref="draftUser">
                  <el-input v-model="formdata.draftUser" :disabled="readFields.Creator"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="phone" ref="phone">
                  <el-input
                    v-model="formdata.phone"
                    :disabled="readFields.Telephone"
                    @keyup.native="btKeyDown"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="移动端展示" prop="showApp" v-if="isZH">
              <el-radio-group v-model="formdata.showApp" :disabled="readFields.showApp">
                <el-radio :label="'0'">是</el-radio>
                <el-radio :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-form-item
              label="签发意见"
              class="error_mes_postion"
              prop="opinionSend"
              ref="opinionSend"
            >
              <template>
                <el-row
                  class="error-infor-tips"
                  v-if="!editedIdeaFields.yjps||!(formdata.sendList && formdata.sendList.length!=0)"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formdata.opinionSend"
                      :disabled="editedIdeaFields.yjps"
                    ></el-input>
                  </el-col>
                  <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.yjps">
                    <i class="icon-font el-icon-edit select-chang" @click="showWriteList('qianfa')"></i>
                  </el-col>
                </el-row>
                <format-form-fild
                  :isInput="isInput"
                  :arrayList="formdata.sendList"
                  v-on:deteleteOptionFun="deteleteOptionFun"
                  :currentUserId="formdata.currentUserId"
                  :isUndertakeOver="formdata.isUndertakeOver"
                  :lastOptionTime="lastOptionTime"
                ></format-form-fild>
              </template>
            </el-form-item>
            <el-form-item label="审核意见" prop="opinionCheck" ref="opinionCheck">
              <template>
                <el-row
                  class="error-infor-tips"
                  v-if="!editedIdeaFields.shyj||!(formdata.checkList && formdata.checkList.length!=0)"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formdata.opinionCheck"
                      :disabled="editedIdeaFields.shyj"
                    ></el-input>
                  </el-col>
                  <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.shyj">
                    <i class="icon-font el-icon-edit select-chang" @click="showWriteList('shenhe')"></i>
                  </el-col>
                </el-row>
                <format-form-fild
                  :isInput="isInput"
                  :arrayList="formdata.checkList"
                  :isUndertakeOver="formdata.isUndertakeOver"
                  :lastOptionTime="lastOptionTime"
                  :currentUserId="formdata.currentUserId"
                  v-on:deteleteOptionFun="deteleteOptionFun"
                ></format-form-fild>
              </template>
            </el-form-item>
            <el-form-item label="传阅意见" prop="cyyj" ref="cyyj">
              <el-row
                class="error-infor-tips"
                v-if="!editedIdeaFields.cyyj|| !(formdata.cyList && formdata.cyList.length!=0)"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows:3}"
                    resize="none"
                    v-model="formdata.cyyj"
                    :disabled="editedIdeaFields.cyyj"
                  ></el-input>
                </el-col>
                <el-col :span="1" style="text-align: right" v-if="!editedIdeaFields.cyyj">
                  <i class="icon-font el-icon-edit select-chang"></i>
                </el-col>
              </el-row>
              <format-form-fild :isInput="isInput" :arrayList="formdata.cyList"></format-form-fild>
            </el-form-item>
            <el-form-item label="备注" prop="comments" ref="comments">
              <template>
                <el-col
                  :span="24"
                  v-if="!editedIdeaFields.Remark||!(formdata.commentsList && formdata.commentsList.length!=0)"
                >
                  <el-col :span="23">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows:3}"
                      resize="none"
                      v-model="formdata.comments"
                      placeholder="填写意见不可多于500字"
                      maxlength="500"
                      :disabled="editedIdeaFields.Remark"
                      show-word-limit
                    ></el-input>
                  </el-col>
                </el-col>
                <format-form-fild
                  :isInput="isInput"
                  :arrayList="formdata.commentsList"
                  :isUndertakeOver="formdata.isUndertakeOver"
                  :lastOptionTime="lastOptionTime"
                  :currentUserId="formdata.currentUserId"
                  v-on:deteleteOptionFun="deteleteOptionFun"
                ></format-form-fild>
              </template>
            </el-form-item>
            <el-row>
              <el-col :span="23">
                <el-form-item label="传阅人员">
                  <div class="con-box" style="border:1px solid #ccc;margin-bottom:1px">
                    <div class="clear-fix chuanyue1">
                      <p class="chuanyue-p1">未阅</p>
                      <el-input
                        class="chuanyue-p2 chuanyue-textarea"
                        v-model="formdata.wyPle"
                        disabled
                        type="textarea"
                        :autosize="{ minRows:2}"
                        resize="none"
                      ></el-input>
                    </div>
                    <div class="clear-fix chuanyue chuanyue-textarea2">
                      <p class="chuanyue-p1">已阅</p>
                      <el-input
                        class="chuanyue-p2"
                        v-model="formdata.yyPle"
                        type="textarea"
                        disabled
                        :autosize="{ minRows:2}"
                        resize="none"
                      ></el-input>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              label="承办单位"
              v-show="formdata.feedbackMode!=0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col :span="23">
                  <el-table :data="formList.cbList" border id="yijiantable">
                    <el-table-column label-class-name="displayClass">
                      <template slot="header">{{formdata.title}}{{formdata.documentNo}}反馈意见</template>

                      <el-table-column prop="undertakeDepartment" label="部门名称" width="200"></el-table-column>
                      <el-table-column>
                        <template slot="header">
                          <span>意见</span>
                        </template>
                        <template slot-scope="scope">
                          <div
                            class="formatFildContainer"
                            v-if="scope.row.opinionDoList&&scope.row.opinionDoList.length>0"
                          >
                            <template>
                              <div v-for="item in scope.row.opinionDoList" :key="item.id">
                                <div class="d_flex">
                                  <el-row class="d_b100">
                                    <el-col :span="24" class="elcol">
                                      <div>{{item.content}}</div>
                                      <div
                                        class="adviceInfo"
                                        style="position:relative;background-color:transparent"
                                      >
                                        {{item.departmentName}}
                                        <span
                                          class="pad_lr10"
                                        >{{item.userName}}</span>
                                        <p class="creat_time">{{item.createTime}}</p>
                                      </div>
                                    </el-col>
                                  </el-row>
                                </div>
                              </div>
                            </template>
                          </div>
                          <!-- 承办无意见时不显示附件 -->
                          <template
                            v-if="scope.row.opinionDoList&&scope.row.opinionDoList.length>0"
                          >
                            <div
                              class="name down"
                              @click="viewFile(item)"
                              v-for="item in scope.row.attachList"
                              :key="item.id"
                            >{{item.fileName}}</div>
                          </template>
                        </template>
                      </el-table-column>
                      <el-table-column prop="finishTime" label="反馈时间" width="200"></el-table-column>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              label="承办单位"
              v-show="formdata.feedbackMode==0&&formdata.undertakeDepartment"
            >
              <el-row>
                <el-col
                  v-for="item in formList.cbList"
                  :key="item.id"
                  :span="6"
                >{{item.undertakeDepartment}}</el-col>
              </el-row>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <upfileList
              :canmoveOrdown="formdata.hasDocumentNo=='false'"
              label="制发单附件"
              :fileList="formdata.attchmentFileInfo"
            >
              <upload-file-ts
                :uploadConfig="uploadConfig"
                :fileId="fileId"
                @fileList="fileList"
                :disabled="formdata.hasDocumentNo=='true'"
              ></upload-file-ts>
            </upfileList>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog
      title="请选择要使用的文号"
      :visible.sync="bianhaoDialog"
      class="bianhaoDialog"
      @close="buttonDisabled = false"
    >
      <el-scrollbar style="height:280px;">
        <el-form>
          <el-form-item label="当前文号">
            <el-radio
              @change="currentCode"
              v-model="bianhao"
              :label="currentFileNo"
            >{{currentFileNo}}号</el-radio>
          </el-form-item>

          <el-form-item label="空缺文号">
            <el-radio-group
              v-model="bianhao"
              v-for="item in bianhaoList"
              :key="item.index"
              @change="setCurrentCode"
            >
              <el-radio :label="item">{{item}}号</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bianhaoDialog = false">取 消</el-button>
        <el-button type="primary" @click="toSetBianhao">确 定</el-button>
      </div>
    </el-dialog>

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
      :fromdata="formdata"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person>

    <!-- 传阅选择人员弹窗 -->
    <treeCofigForCy
      :treeData="treeDataForCy"
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

    <write-list-ts v-model="appendWriteDialog" @childsaveselect="writelistvalue"></write-list-ts>

    <!-- 查看流程弹窗 -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <cb-flow v-model="showCbFlow" :tableData="formList.cbList"></cb-flow>
    <!--发办理单位（含下级部门）-->
    <org-tree
      v-model="showOrgTree"
      title="选择部门"
      :outBank="otherBank"
      :otherBank="otherBank"
      :isSingle="false"
      :orgOrDeptId="orgOrDeptId"
      :orgOrDept="0"
      @orgList="getOrgList"
    ></org-tree>
    <!--发办理单位（仅包含一级部门）-->
    <org-tree
      v-model="showOrgTree1"
      title="选择部门"
      :outBank="true"
      :isSingle="false"
      :orgOrDeptId="orgOrDeptId"
      :orgOrDept="0"
      queryType="peer"
      :isSearchAll="true"
      @orgList="getOrgList"
    ></org-tree>
    <cy-person-list
      v-model="showCyPerson"
      title="选择人员"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
  </div>
</template>

<script >
import beanList from "../../../util/beanList";
import selectPerson from "components/tree/treeTansun";
import WriteListTs from "components/viewFlow/writeListTs";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import { mapGetters, mapActions } from "vuex";
import minixs from "../../../minixs/index";
import viewDraft from "@/minixs/viewDraft";
import orgTree from "components/tree/orgTree";
import orgTree1 from "components/tree/orgTree1";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import cyPersonList from "../components/cyPersonList";
import UE from "components/editor/ue.vue";
import exportTable from "../../../minixs/exportTable";
import cbFlow from "../components/cbFlow";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import sidebarNavigation from "../components/sidebarNavigation";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
import formatFormFild from "../components/formatFormFiled";
// import collectionPage from "../components/collectionPage";
import upfileList from "../components/showUploadFile"; //附件展示
import formTextChange from "@/minixs/yongyinText/changgui"; //控制label
export default {
  name: "addproceorderdeal",
  components: {
    WriteListTs,
    selectPerson,
    shiwuFlow,
    orgTree,
    orgTree1,
    uploadFileTs,
    cyPersonList,
    cbFlow,
    UE,
    sidebarNavigation,
    formatFormFild,
    treeCofigForCy,
    // collectionPage,
    upfileList
  },
  mixins: [
    minixs,
    openOrDownLoadFile,
    bianhanPublic,
    formTextChange,
    viewDraft
  ],
  mounted() {
    // let _self=this;
    // window.addEventListener('message',function(e){
    //   console.log(e,'接收消息')
    //   _self.postMessage_store=e.data;
    // })
    //label动态获取
    this.$nextTick(function() {
      this.formTextChange("bhgl_zf");
    });
    this.id = this.$route.query.id;
    this.fileId = this.$route.query.id;
    sessionStorage.setItem("fileId", this.fileId);
    if (this.id) {
      this.uploadConfig.id = this.id;
      this.loadData();
    } else {
      this.isShowDocument = true;
      this.getNullBianHao();
      this.getHuanJie();
    }
    this.getdeptList();
    // this.handleSetLoacl();
  },
  data() {
    return {
      isShowDocument: true,
      isAuthorizeOthers: true, // 是否转授权给其他人， true 为转授权不能修改任意内容，false 为 未转授权
      otherBank: true, //是否展示他行群组
      // postMessage_store:'',
      isInput: true,
      isBnEdit: false, //部门内便函标志是否可编辑,保存前不可编辑，false为不可编辑
      lastOptionTime: "0",
      isfinish: false, //表单是否是办结状态
      fileId: "",
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
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      buttonDisabled: false, //按钮是否禁用,解决网络延迟引起的点击按钮报错问题
      //总行
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000",
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      showCbFlow: false,
      config: beanList.ueconfig, //ueeditor配置信息，需要引入util文件夹下beanList.js文件
      showOrgTree: false,
      showOrgTree1: false,
      showCyPerson: false,
      orgOrDeptId: JSON.parse(localStorage.getItem("userInfo")).currUnitId,
      cyData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 1000 * 60 * 60 * 24;
        }
      },
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      huanJieMessage: {},
      rules: {},
      id: "",
      numyear: this.$route.query.numyear ? this.$route.query.numyear : "",
      type: "",
      showFlowChart: false,
      flowChartList: [], //流程列表
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wcbfs", show: false },
        { name: "生成编号", type: "scbh", show: false },
        { name: "退号", type: "tuihao", show: false },
        { name: "发办理单位", type: "fsbldw", show: false },
        { name: "增发", type: "zengfa", show: false },
        { name: "收回", type: "shouhui", show: false },
        { name: "承办收回", type: "cbsh", show: false },
        { name: "承办催办", type: "chengbancuiban", show: false },
        { name: "查看承办部门流程", type: "ckcbbmlc", show: false },
        { name: "导出反馈意见", type: "daochufankuiyijian", show: false },
        { name: "批量下载反馈附件", type: "daochufankuiyijian", show: false },
        { name: "传阅", type: "cy", show: false },
        { name: "传阅收回", type: "cysh", show: false },
        // {name: "查看传阅记录", type: "ckcyjl", show: false},
        { name: "办结", type: "banjie", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        // {name: "查看回执", type: "chakanhuizhi", show: false},
        { name: "查看流程", type: "cklc", show: false },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "czzn", show: false }
      ],
      buttonListAuthorizeOthers: [
        { name: "查看流程", type: "ckliucheng", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true },
        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "caozuozhinan", show: true }
      ],
      formList: { cbList: [] },
      formdata: {
        wcbfsbc: "0", //完成并发送是1，保存是2, 0是其他没有处理
        bnbh: "0", //部内便函没有勾选是0，反之是1
        hasDocumentNo: "false",
        currentNode: "制发",
        draftTime: formatData(new Date().getTime(), "YYYY-MM-DD"),
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanId
          : "",
        currentNowName: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortFirstUnitName +
            " " +
            JSON.parse(localStorage.getItem("bianhan")).humanName
          : "",
        draftUser: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanName
          : "",
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).currUnitId
          : "",
        draftOrgan: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortUnitName
          : "",
        draftOrganId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).unitId
          : "",
        draftDepartmentOne: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).shortFirstUnitName ||
            JSON.parse(localStorage.getItem("bianhan")).draftDepartmentOne
          : "",
        draftDepartmentOneId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).firstUnitId
          : "",

        phone: "",
        documentNo: "",
        // feedbackMode: "0",
        showApp: "0",
        currentUserDept: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).currUnitName
          : "",
        currentUserDeptId: this.$route.query.deptDetail
          ? JSON.parse(localStorage.getItem("bianhan")).currUnitId
          : ""
      },
      documentNo: "",
      bianhaoNum: "",
      bianhao: "",
      currentFileNo: "",
      bianhaoList: [],
      bianhaoDialog: false,
      readFields: {
        Creator: false,
        IsFeedBack: false,
        IsSenInfo: false,
        Telephone: false,
        CreateDate: false,
        DraftDepart: false,
        Title: false,
        isMobileServiceShow: false,
        isbnbh: false, //是否是部内便函
        feedTime: false,
        copy: false,
        main: false,
        mainBody: false
      }, //不可编辑控制域
      requiredFields: {
        Creator: "",
        IsFeedBack: "",
        IsSenInfo: "",
        Telephone: "",
        DraftDepart: "",
        CreateDate: "",
        Title: "",
        isMobileServiceShow: "",
        isbnbh: "",
        feedTime: "",
        copy: "",
        main: ""
      }, //必填控制域
      editedIdeaFields: {
        Remark: true,
        cyyj: true,
        shyj: true,
        yjps: true
      }, //可编辑意见域
      requiredIdeaFields: {
        Remark: false,
        cyyj: false,
        shyj: false,
        yjps: false
      }, //必填意见域
      appendWriteDialog: false, //常用批语
      clickTypes: "", //常用批语类型
      treeData: [], //人员树
      treeDataForCy: [],
      canTab: false,
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      dialogTit: "选择人员",
      offenUse: true,
      loadingTree: true,
      checkOrg: false,
      deptList: [],
      fileNotype: 1
    };
  },
  computed: {
    ...mapGetters(["todoItem"])
  },
  created() {},
  methods: {
    ...mapActions(["setTodoItem"]),
    setGobalUE() {
      window.globalUE = this.$refs.ue.globalUE();
    },
    /**拟稿部门列表 */
    getdeptList() {
      this.$api.bianhan.getDeptList({}).then(res => {
        this.deptList = res.result;

        //确定当前联系人联系电话
        if (this.$route.query.deptDetail) {
          let unitInfo = JSON.parse(localStorage.getItem("unitInfo"));
          for (let i = 0; i < unitInfo.length; i++) {
            if (
              unitInfo[i].currUnitId ==
              JSON.parse(localStorage.getItem("bianhan")).currUnitId
            ) {
              this.formdata.phone = unitInfo[i].telMobile
                ? !!unitInfo[i].telMobile
                  ? unitInfo[i].telMobile.replace(/,/g, " ")
                  : ""
                : "";
            }
          }
        }
      });
    },
    //若表单为收回的表单，可以删除当前处理人最后一条意见
    deteleteOptionFun(item) {
      this.$api.bianhan.delProcessList(item).then(res => {
        this.loadData();
      });
    },
    /**拟稿部门切换 */
    changeFirstUnitName(val) {
      let option = {
        humanId: "",
        humanName: "",
        shortFirstUnitName: "",
        currUnitId: "",
        shortUnitName: "",
        unitId: "",
        firstUnitId: ""
      };

      this.deptList.forEach(item => {
        if (item.humanId == val) {
          option = item;
        }
      });
      this.formdata.currentUserId = option.humanId;
      this.formdata.currentNowName =
        option.shortFirstUnitName + " " + option.humanName;
      this.formdata.draftUserId = option.humanId;
      this.formdata.draftDepartment = option.shortFirstUnitName;
      this.formdata.draftDepartmentId = option.currUnitId;
      this.formdata.draftOrgan = option.shortUnitName;
      this.formdata.draftOrganId = option.unitId;
      this.formdata.draftDepartmentOne =
        option.shortFirstUnitName ||
        JSON.parse(localStorage.getItem("bianhan")).draftDepartmentOne;
      this.formdata.draftDepartmentOneId = option.firstUnitId;

      //确定当前联系人联系电话
      let unitInfo = JSON.parse(localStorage.getItem("unitInfo"));
      for (let i = 0; i < unitInfo.length; i++) {
        if (unitInfo[i].currUnitId == val.currUnitId) {
          this.formdata.phone = unitInfo[i].telMobile
            ? !!unitInfo[i].telMobile
              ? unitInfo[i].telMobile.replace(/,/g, " ")
              : ""
            : "";
        }
      }

      this.formdata.currentUserDept = option.currUnitName;
      this.formdata.currentUserDeptId = option.currUnitId;
    },
    backToOldUser() {
      this.formdata.type = "1";
      this.buttonDisabled = true;
      this.formdata.nextAvyId = this.formdata.supNodeCode;
      this.$api.bianhan
        .alertAddData(this.formdata)
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });

          this.$intent.closeWindow(this);
          this.messageWarn(
            person.idStr,
            this.formdata.title,
            this.formdata.currentUser,
            "addproceorder",
            this.formdata.id
          );
        })
        .catch(err => {
          this.buttonDisabled = false;
          this.loadData();
        });
    },
    buttonClick(params) {
      this.formdata.wcbfsbc = "0";
      switch (params) {
        case "关闭":
          this.close();
          break;
        case "保存":
          this.formdata.wcbfsbc = "2";
          //this.formdata.hasDocumentNo == "false"
          if (
            (this.formdata.currentNode === "起草" ||
              this.formdata.currentNode === "制发") &&
            process.env.NODE_ENV == "production" &&
            !!this.$refs.ue.getUEContent()
          ) {
            this.$confirm("是否将正文统一为三号字体？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$refs.ue.changeFontSize("21px");
                this.save();
              })
              .catch(() => {
                this.save();
              })
              .finally(() => {});
          } else {
            this.save();
          }

          break;
        case "完成并发送":
          this.formdata.wcbfsbc = "1";
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.dialogType = "dosend";
          this.offenUse = true;
          this.loadingTree = true;
          this.canTab = false;
          this.checkData = []; //清空选中数据，避免和传阅选中数据混合

          this.formdata.backType = 0;
          if (this.formdata.backFlag1 && !!this.formdata.oldUserName) {
            this.$confirm(
              "是否返回" + this.formdata.oldUserName + "?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                this.formdata.backType = 1;
              })
              .finally(() => {
                if (this.formdata.backType == 1) {
                  this.backToOldUser();
                } else {
                  this.toNext();
                }
              });
          } else {
            this.toNext();
          }
          break;
        case "生成编号":
          let _self = this;
          this.formdata.type = "0";
          this.formdata.content =
            process.env.NODE_ENV == "production"
              ? this.$refs.ue.getUEContent()
              : "";
          if (this.id) {
            if (
              process.env.NODE_ENV == "production" &&
              this.formdata.content == ""
            ) {
              this.$message({
                message: "请填写正文内容",
                type: "success"
              });
              return false;
            }
            this.$api.bianhan
              .alertAddData(this.formdata)
              .then(res => {
                _self.toGetBianhao();
              })
              .catch(item => {
                this.buttonDisabled = false;
              });
          } else {
            this.$api.bianhan
              .createAddData(this.formdata)
              .then(res => {
                _self.toGetBianhao();
              })
              .catch(item => {
                this.buttonDisabled = false;
              });
          }
          break;
        case "退号":
          //waterNoRule为null不支持退号，0表示按机构生成，1表示按部门生成
          if (!this.formdata.waterNoRule) {
            this.$message({
              message: "此文为历史数据，不支持退号",
              type: "error"
            });
            return;
          }
          this.$confirm("您是否要执行退号并解锁操作？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.backBianhao();
          });

          break;
        case "查看承办部门流程":
          this.showCbFlow = true;
          break;
        case "传阅":
          this.getTreeDataForCy("cy");
          break;
        case "传阅收回":
          this.$api.bianhan
            .getNoCyList({
              parentDocId: this.id,
              cyType: "ZF",
              numYear: this.numyear
            })
            .then(res => {
              if (res.data && res.data.length == 0) {
                this.$message({ type: "success", message: "暂无未阅人员" });
              } else {
                res.data.forEach(item => {
                  item.name = item.curUserCn;
                });
                this.cyData = res.data;
                this.dialogTypeNow = "cy";
                this.showCyPerson = true;
              }
            });
          break;
        case "收藏":
          exportTable.collect(this, this.id, "zf", "", this.numyear);
          break;
        case "办结":
          if (this.formdata.feedBack == "false") {
            this.$confirm("承办部门未全部反馈，是否办结?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.toEnd();
            });
          } else {
            this.$confirm("确定要办结吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.toEnd();
            });
          }
          break;
        case "删除此文":
          if (this.formdata.hasDocumentNo == "true") {
            this.$message({
              message: "已生成编号，无法删除",
              type: "waring"
            });
          } else {
            this.$confirm("是否删除此文?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.deleteBianhan();
            });
          }
          break;
        case "发办理单位":
          if (this.formdata.bnbh == 1) {
            this.orgOrDeptId = this.formdata.draftDepartmentOneId; //一级部门id
          } else {
            this.orgOrDeptId = JSON.parse(
              localStorage.getItem("userInfo")
            ).unitId;
          }
          this.showOrgTree = true;
          break;
        case "增发":
          if (this.formdata.bnbh == 1) {
            this.orgOrDeptId = this.formdata.draftDepartmentOneId;
          } else {
            this.orgOrDeptId = JSON.parse(
              localStorage.getItem("userInfo")
            ).unitId;
          }
          this.showOrgTree = true;
          break;
        case "承办收回":
          this.$api.bianhan
            .getCbDeptList({ id: this.id, type: "1", numYear: this.numyear })
            .then(res => {
              if (res.list && res.list.length == 0) {
                this.$message({ type: "success", message: "暂无需回收承办" });
              } else {
                res.list.forEach(item => {
                  item.name = item.undertakeDepartment;
                });
                this.cyData = res.list;
                this.dialogTypeNow = "cb";
                this.showCyPerson = true;
              }
            });

          break;
        case "承办催办":
          this.$api.bianhan
            .getCbDeptList({ id: this.id, type: "2", numYear: this.numyear })
            .then(res => {
              if (res.list && res.list.length == 0) {
                this.$message({ type: "success", message: "暂无需催办承办" });
              } else {
                res.list.forEach(item => {
                  item.name = item.undertakeDepartment;
                });
                this.cyData = res.list;
                this.dialogTypeNow = "cbcb";
                this.showCyPerson = true;
              }
            });
          break;
        case "查看流程":
          this.$refs.dialogLine.openDialog();
          this.$api.bianhan
            .getLiuCheng({ id: this.id, type: "0", numYear: this.numyear })
            .then(res => {
              this.showFlowChart = true;
              this.flowChartList = res.list;
            });
          break;
        case "操作指南":
          this.handBook("BHGL");
          break;
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/bianhanZf",
            query: { id: this.id, numYear: this.numyear }
          });
          break;
        case "导出反馈意见":
          exportTable.exportExcel("承办意见", "#yijiantable", true, true);
          break;
        case "批量下载反馈附件":
          this.batchExporFeedbackFile();
          break;
      }
    },
    selectMainOrCopy(n) {
      let name = "";
      this.dialogType = "zhu";
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
      }
      this.loadingTree = false;
      this.offenUse = false;
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogTypeNow = n;
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
          try {
            self.treeData = res.data;
          } catch (e) {
            self.treeData = [];
          }

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

          if (n == "main") {
            self.backDialogData("main");
          } else if (n == "copy") {
            self.backDialogData("chao");
          }
          self.dialogState = true;
        });
    },
    //仅能输入数字和‘-’
    btKeyDown(e) {
      this.formdata.phone = e.target.value.replace(/[^\d||\-]/g, "");
    },
    setFormConfig() {
      this.rules = {
        feedbackMode: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        title: [
          {
            required: this.requiredFields.Title,
            message: "不能为空",
            trigger: "change"
          },
          { max: 200, message: "不能超过200字", trigger: "change" }
        ],
        feedTime: [
          {
            required: this.requiredFields.feedTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftDepartmentOne: [
          {
            required: this.requiredFields.DraftDepart,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftTime: [
          {
            required: this.requiredFields.CreateDate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftUser: [
          {
            required: this.requiredFields.Creator,
            message: "不能为空",
            trigger: "change"
          }
        ],
        main: [
          {
            required: this.requiredFields.main,
            message: "不能为空",
            trigger: "change"
          }
        ],
        copy: [
          {
            required: this.requiredFields.copy,
            message: "不能为空",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: this.requiredFields.Telephone,
            message: "不能为空",
            trigger: "change"
          }
        ],
        isMobileServiceShow: [
          {
            required: this.requiredFields.isMobileServiceShow,
            message: "不能为空",
            trigger: "change"
          }
        ],

        opinionSend: [
          {
            required: this.requiredIdeaFields.yjps,
            message: "不能为空",
            trigger: "change"
          }
        ],
        opinionCheck: [
          {
            required: this.requiredIdeaFields.shyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        comments: [
          {
            required: this.requiredIdeaFields.Remark,
            message: "不能为空",
            trigger: "change"
          }
        ],
        cyyj: [
          {
            required: this.requiredIdeaFields.cyyj,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
      if (process.env.NODE_ENV == "production" && this.readFields.mainBody) {
        setTimeout(() => {
          this.$refs.ue.setDsabled();
        }, 1000);
      }
    },
    toEnd() {
      this.formdata.currentNode = "办结";
      this.buttonDisabled = true;
      let form_data = JSON.parse(JSON.stringify(this.formdata));
      //去除大字段，防止字段超长报错
      delete form_data.cbList;
      delete form_data.bhCbDept;
      this.$api.bianhan
        .alertAddData(form_data)
        .then(res => {
          this.$message({
            message: "办结完成",
            type: "success"
          });
          this.$intent.closeWindow(this);
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    //编号初始化
    getNullBianHao() {
      this.$api.bianhan.setBianhao(this.formdata).then(res => {
        this.formdata.documentNo = res.resNum + " 号";
        this.formdata.deptTableHead = res.deptTableHead;
      });
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "main": //主送
          //如果this.formdata.main没有数据，则取消勾选
          if (!this.formdata.main) {
            this.zhuCheckData = [];
          } else {
            //删除已经手动删除选项
            let self = this;
            try {
              this.zhuCheckData = this.zhuCheckData.filter(item => {
                if (self.formdata.main.indexOf(item) != -1) {
                  return item;
                }
              });
            } catch (e) {
              console.log("主送" + e);
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

          break;
        case "copy": //抄送
        case "chao": //抄送
          //如果this.formdata.main没有数据，则取消勾选
          if (!this.formdata.copy) {
            this.chaoCheckData = [];
          } else {
            //删除已经手动删除选项
            let self = this;
            try {
              this.chaoCheckData = this.chaoCheckData.filter(item => {
                if (self.formdata.copy.indexOf(item.id) != -1) {
                  return item;
                }
              });
            } catch (e) {
              console.log(e);
            }
          }

          //勾选已经选择的选项
          this.checkIds = [];
          this.checkData = [];
          for (var i = 0; i < this.chaoCheckData.length; i++) {
            this.checkIds.push(this.chaoCheckData[i].id);
            this.checkData.push({
              id: this.chaoCheckData[i].id,
              disabled: true,
              hideType: false
            });
          }
          break;
      }
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      if (!status) {
        return;
      }
      switch (dtype) {
        case "next":
          if (
            (this.formdata.currentNode === "起草" ||
              this.formdata.currentNode === "制发") &&
            process.env.NODE_ENV == "production" &&
            !!this.$refs.ue.getUEContent()
          ) {
            this.$confirm("是否将正文统一为三号字体？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$refs.ue.changeFontSize("21px");
                //更新content字段
                this.formdata.content =
                  process.env.NODE_ENV == "production"
                    ? this.$refs.ue.getUEContent()
                    : "";
                this.next(data[0], params);
              })
              .catch(() => {
                this.next(data[0], params);
              })
              .finally(() => {});
          } else {
            this.next(data[0], params);
          }

          break;
        case "main":
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
          if (!!this.main) {
            this.$set(this.formdata, "main", this.main + "," + name.join(","));
          } else {
            this.$set(this.formdata, "main", name.join(","));
          }

          break;
        case "copy":
          let name1 = [];
          data.forEach(item => {
            try {
              if (typeof item === "object") {
                if (!!item.id && typeof item.id != undefined) {
                  name1.push(item.id);
                } else if (typeof item.text != undefined) {
                  name1.push(item.text);
                  item1.id = item.text;
                }
              } else if (item != undefined) {
                name1.push(item);
              }
            } catch (e) {
              console.log(e);
            }
          });
          this.chaoCheckData = [];
          this.chaoCheckData = data;
          if (!!this.copy) {
            this.$set(this.formdata, "copy", this.copy + "," + name1.join(","));
          } else {
            this.$set(this.formdata, "copy", name1.join(","));
          }
          break;
        default:
          break;
      }
    },
    //发承办
    getOrgList(data) {
      if (this.formdata.hasDocumentNo == "false") {
        this.$message({
          message: "暂未生成编号，无法发送办理单位",
          type: "error"
        });
        return false;
      }
      let ids = [],
        names = [];
      data.forEach(item => {
        ids.push(item.id);
        names.push(item.unitName);
      });
      this.$api.bianhan
        .sendCB({
          id: this.id,
          undertakeDepartmentId: ids.join(","),
          undertakeDepartment: names.join(","),
          numYear: this.numyear
        })
        .then(res => {
          if (res.errorName) {
            if (res.sussName) {
              this.$alert(
                "<span style='color:red;display:block'>发送失败单位：" +
                  res.errorName +
                  "</span><span style='color:green'>" +
                  "发送成功单位：" +
                  res.sussName +
                  "</span>",
                {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  type: "warning"
                }
              ).finally(() => {
                this.loadData();
              });
            } else {
              this.$alert(
                "<span style='color:red'>发送失败单位：</span>" + res.errorName,
                {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  type: "error"
                }
              ).finally(() => {
                this.loadData();
              });
            }
          } else {
            this.$alert(
              "</span><span style='color:green;display:block'>" +
                "已发送至" +
                res.sussName +
                "</span>",
              {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                type: "success"
              }
            ).finally(() => {
              this.loadData();
            });
          }
        });
    },
    //传阅承办收回
    cyPersonList(data) {
      let ids = [];
      data.map(item => {
        ids.push(item.id);
      });
      if (this.dialogTypeNow == "cy") {
        this.$api.bianhan.cheHuiCy({ ids: ids.join(",") }).then(res => {
          this.loadData();
          this.$message({
            message: "传阅收回成功",
            type: "success"
          });
        });
      } else if (this.dialogTypeNow == "cbcb") {
        //id: this.id, type: "2"
        this.$api.bianhan
          .cuiban({ ids: ids.join(","), type: "2" })
          .then(res => {
            this.$message({
              message: "催办成功",
              type: "success"
            });
          });
      } else {
        this.$api.bianhan
          .cbBack({
            ids: ids.join(","),
            draftTime: this.formdata.draftTime,
            avyId: this.formdata.pcsAvyId,
            type: "1"
          })
          .then(res => {
            this.loadData();
            this.$message({
              message: "承办收回完成",
              type: "success"
            });
          });
      }
    },
    //完成并发送
    next(person, params) {
      this.formdata.currentUserId = person.id;
      this.formdata.currentUser = person.name;
      this.setFormWorkFlowData();
      this.formdata.nextAvyId = params.id;
      this.formdata.currentNode = params.name;
      this.formdata.type = "1";
      this.buttonDisabled = true;

      this.$api.bianhan
        .alertAddData(this.formdata)
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });

          this.$intent.closeWindow(this);
          this.messageWarn(
            person.idStr,
            this.formdata.title,
            this.formdata.currentUser,
            "addproceorder",
            this.formdata.id
          );
        })
        .catch(err => {
          this.buttonDisabled = false;
          this.loadData();
        });
    },
    //设置工作流数据
    setFormWorkFlowData() {
      try {
        this.formdata.avyId = this.todoItem.avyId;
        this.formdata.multiID = this.todoItem.multiID;
        this.formdata.pcsAvyId = this.todoItem.pcsAvyId;
        this.formdata.tplNo = this.todoItem.tplNo;
      } catch {}
    },
    //关闭
    close() {
      this.buttonDisabled = true;
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.formdata.type = "0";
            this.formdata.content =
              process.env.NODE_ENV == "production"
                ? this.$refs.ue.getUEContent()
                : "";

            if (this.id) {
              this.$api.bianhan.alertAddData(this.formdata).then(res => {
                this.$intent.closeWindow(this);
              });
            } else {
              this.$api.bianhan.createAddData(this.formdata).then(res => {
                try {
                  if (this.formdata.attachid.length > 0) {
                    this.createFile();
                  }
                } catch (e) {
                  console.log(e);
                }

                this.$intent.closeWindow(this);
              });
            }
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
            this.buttonDisabled = false;
          }
        }
      });
    },
    //常用批语
    showWriteList(type) {
      this.clickTypes = type;
      this.appendWriteDialog = true;
    },
    //常用批语
    writelistvalue(data) {
      switch (this.clickTypes) {
        case "qianfa":
          this.$set(
            this.formdata,
            "opinionSend",
            this.formdata.opinionSend ? this.formdata.opinionSend + data : data
          );
          break;
        case "shenhe":
          this.$set(
            this.formdata,
            "opinionCheck",
            this.formdata.opinionCheck
              ? this.formdata.opinionCheck + data
              : data
          );
          break;
      }
    },
    //获取编号
    toGetBianhao() {
      this.buttonDisabled = true;
      this.$api.bianhan
        .setBianhao({ id: this.id })
        .then(res => {
          let list = res.list;
          /**
           * 返回数据不存在code字段，则提示返回msg
           */
          if (typeof res.code == "undefined") {
            this.$message({ message: res.msg, type: "error" });
          }
          if (list.length == 0) {
            this.documentNo = res.resNum + res.fileNo + "号";
            // this.$set(this.formdata,"documentNo",res.resNum + res.fileNo + "号");
            this.$set(this.formdata, "fileNo", res.fileNo);
            this.bianhaoNum = res.resNum;
            this.formdata.hasDocumentNo = true;
            this.formdata.fileNo = res.fileNo;
            this.formdata.type = "0";
            this.saveBianhao(1, res.fileNo, this.documentNo);
            // this.save().then(() => {
            //   this.$api.bianhan.alertAddData(this.formdata).then(res => {
            //     this.$message({
            //       message: "编号生成成功",
            //       type: "success"
            //     });
            //   });
            // });
          } else {
            // list.push(res.fileNo);
            // for (let i = 0; i < list.length; i++) {
            //   list[i] = list[i] + "号";
            // }
            this.currentFileNo = res.fileNo;
            this.bianhaoNum = res.resNum;
            this.bianhaoList = list.sort((a, b) => {
              return a - b;
            });
            this.bianhao = "";
            this.bianhaoDialog = true;
            // this.save();
          }
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    //退号
    backBianhao() {
      this.$api.bianhan
        .backianhao({
          id: this.id,
          unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
        })
        .then(res => {
          this.getHuanJie();
          this.bianhaoDialog = false;
          this.$message({
            message: "退号成功",
            type: "success"
          });
          this.loadData();
          this.$refs.ue.setEable();
        });
    },
    //保存标号

    saveBianhao(dataType, waterNo, documentNo) {
      //判断编号是否已被占用，并作处理
      this.$api.bianhan
        .handleNum({
          id: this.formdata.id,
          no: waterNo
        })
        .then(res => {
          if (res.code1 == 2) {
            debugger;
            this.$message({
              type: "warning",
              message: res.msg
            });
            //  this.formdata.documentNo = this.bianhaoNum + " 号";
            // this.save();
            this.loadData();
          } else {
            this.$api.bianhan
              .saveBianhao({
                unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
                dataType: dataType,
                waterNo: waterNo,
                bHMainOrderDo: this.id,
                documentNo: documentNo,
                hasDocumentNo: true
              })
              .then(res => {
                if (res.code1 == 2) {
                  debugger;
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                } else {
                  this.$message({
                    message: "生成编号成功",
                    type: "success"
                  });
                }
                //this.save();
                this.loadData();
              });
          }
        });
    },
    //选择编号
    setCurrentCode() {
      this.formdata.fileNo = this.bianhao;
      this.fileNotype = 2;
      //this.toSetBianhao(2)
    },
    //选择编号
    currentCode() {
      this.bianhao = this.currentFileNo;
      this.formdata.fileNo = this.currentFileNo;
      this.fileNotype = 1;
      // this.toSetBianhao(1)
    },
    //设置编号
    toSetBianhao(type) {
      if (this.bianhao) {
        this.documentNo = this.bianhaoNum + this.bianhao + "号";
        this.formdata.hasDocumentNo = true;
        this.formdata.type = "0";
        this.buttonDisabled = true;
        this.saveBianhao(type, this.formdata.fileNo, this.documentNo);
        this.bianhaoDialog = false;
        // this.$api.bianhan
        //   .alertAddData(this.formdata)
        //   .then(res => {
        //     this.save();
        //     this.$message({
        //       message: "编号生成成功",
        //       type: "success"
        //     });
        //     this.bianhaoDialog = false;
        //     this.loadData();
        //   })
        //   .catch(item => {
        //     this.buttonDisabled = false;
        //   });
      }
    },
    //完成并发送
    toNext() {
      if (
        process.env.NODE_ENV == "production" &&
        !this.$refs.ue.getUEContent()
      ) {
        this.$message({
          type: "error",
          message: "正文内容为空，请输入正文内容"
        });
        return;
      }
      this.$refs["elForm"].validate((valid, object) => {
        if (valid) {
          this.formdata.content =
            process.env.NODE_ENV == "production"
              ? this.$refs.ue.getUEContent()
              : "";

          if (this.formdata.id) {
            this.buttonDisabled = true;
            this.$api.bianhan
              .getPerson({
                id: this.id,
                type: "0"
              })
              .then(res => {
                //传值 1.所有的环节 2.带约束条件的环节
                this.seletOptionsData = res.list;
                this.seletOptionsData = this.shoNextNode(
                  this.seletOptionsData,
                  this.huanJieMessage.acyNodeNextBount
                );
                this.treeData = res.result.data;
                this.loadingTree = true;
                this.dialogState = true;

                //解决无部门配置时出现两棵树的情况
                this.$nextTick(() => {
                  //带约束条件判断环节
                  //过滤重复环节
                  //this.seletOptionsData = res.list;
                  let PCSAVYIDs = [];
                  this.seletOptionsData = res.list.filter(item => {
                    if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                      PCSAVYIDs.push(item.PCSAVYID);
                      return item;
                    }
                  });
                });
                this.buttonDisabled = false;
              })
              .catch(res => {
                this.buttonDisabled = false;
              });
          } else {
            this.formdata.type = "0";
            this.buttonDisabled = true;

            this.$api.bianhan
              .createAddData(this.formdata)
              .then(res => {
                this.id = res.result.id;
                this.fileId = res.result.id;
                sessionStorage.setItem("fileId", this.fileId);
                try {
                  if (this.formdata.attachid.length > 0) {
                    this.createFile();
                  }
                } catch (e) {
                  console.log(e);
                }
                this.setTodoItem(res.result);
                this.uploadConfig.id = this.id;
                this.loadData();
                this.$api.bianhan
                  .getPerson({
                    id: this.id,
                    type: "0"
                  })
                  .then(res => {
                    this.seletOptionsData = this.shoNextNode(
                      this.seletOptionsData,
                      this.huanJieMessage.acyNodeNextBount
                    );

                    this.treeData = res.result.data;
                    this.loadingTree = true;
                    this.dialogState = true;

                    //解决无部门配置时出现两棵树的情况
                    this.$nextTick(() => {
                      this.seletOptionsData = res.list;
                    });
                    this.buttonDisabled = false;
                  })
                  .catch(res => {
                    this.buttonDisabled = false;
                  });
              })
              .catch(res => {
                this.buttonDisabled = false;
              });
          }
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
    //获取传阅人员列表
    getTreeDataForCy(n) {
      if (n == "cy") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeDataForCy = [];
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
            flag: true
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.message == "Loading") {
            this.loadingTreeForCy = true;
          } else {
            this.loadingTreeForCy = false;
          }
          this.treeDataForCy = (res && res.data) || [];
          this.treeDataForCy[0].disabled = true;
        });
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          this.checkIds = this.formdata.wyIds
            ? this.formdata.wyIds.split(";")
            : [];
          if (this.cyCheckData.length) {
            newA = [].concat(this.cyCheckData);
            newA.map(item => {
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
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        oldIds = this.formdata.wyIds.split(" ");

        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
            try {
              if (item.idStr.indexOf("#") != -1) {
                if (!oldIds.includes(item.idStr.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.idStr.toString())) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            } catch (e) {
              if (item.id.indexOf("#") != -1) {
                if (!oldIds.includes(item.id.split("#")[0])) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              } else {
                if (!oldIds.includes(item.id)) {
                  newIds.push(item.id);
                  newNames.push(item.name || item.text);
                }
              }
            }
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
            this.formdata.curUserName = newNames;
            this.formdata.curUserId = newIds;
            this.cyCheckData = this.checkData;
            break;
        }
        if (!!this.formdata.curUserName) {
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
      //this.formdata.type = "0";
      //传阅前意见固化
      this.formdata.type = "1";
      this.$api.bianhan
        .alertAddData(this.formdata)
        .then(res => {
          this.formdata.currentNode = "制发";
          this.$api.bianhan.sendChuanYue(this.formdata).then(res => {
            this.loadData();
            this.$message({
              message: "传阅成功",
              type: "success"
            });
          });
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    //删除
    deleteBianhan() {
      this.buttonDisabled = true;
      this.$api.bianhan
        .deleteBianHan({ id: this.formdata.id })
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        })
        .catch(item => {
          this.buttonDisabled = false;
        });
    },
    // 保存去除校验
    save() {
      let that = this;
      this.formdata.type = "0";
      this.formdata.content =
        process.env.NODE_ENV == "production"
          ? this.$refs.ue.getUEContent()
          : "";
      if (this.id) {
        if (
          process.env.NODE_ENV == "production" &&
          this.formdata.content == ""
        ) {
          this.$message({
            message: "请填写正文内容",
            type: "success"
          });
          return false;
        }
        this.$api.bianhan
          .alertAddData(this.formdata)
          .then(res => {
            this.$message({ type: "sucess", message: "保存成功" });
            //解决之间点击完成并发送取消后保存不刷新页面
            if (window.location.href.indexOf("id") == -1) {
              this.$intent.replace(this, {
                name: "addproceorderdeal",
                query: { type: "edit", id: this.id }
              });
            }
            this.loadData();
          })
          .catch(item => {
            this.buttonDisabled = false;
          });
      } else {
        this.$api.bianhan
          .createAddData(this.formdata)
          .then(res => {
            this.id = res.result.id;
            this.fileId = res.result.id;
            this.$message({ type: "sucess", message: "保存成功" });
            sessionStorage.setItem("fileId", this.fileId);
            try {
              if (this.formdata.attachid.length > 0) {
                this.createFile();
              }
            } catch (e) {
              console.log(e);
            }

            this.setTodoItem(res.result);
            this.$intent.replace(this, {
              name: "addproceorderdeal",
              query: { type: "edit", id: this.id }
            });
            this.uploadConfig.id = this.id;
            this.loadData();
          })
          .catch(item => {
            this.buttonDisabled = false;
          });
      }
    },
    //加载详情
    loadData() {
      this.buttonDisabled = true;
      this.$api.bianhan
        .distriDeal({
          id: this.id,
          numYear: this.numyear
        })
        .then(res => {
          try {
            this.formdata = res.bHMainOrderDo;
            this.$set(this.formdata, "backFlag1", res.backFlag1);
            if (!!this.formdata.beAuthUserId) {
              this.formdata.currentNowName =
                this.formdata.draftDepartment +
                " " +
                this.formdata.beAuthUserName +
                "(此文件由" +
                this.formdata.authUserName +
                "授权)";
            }

            this.isBnEdit = res.isBnEdit;
            this.otherBank = this.formdata.bnbh == "1" ? false : true;

            const userInfo =
              (localStorage.getItem("userInfo") &&
                JSON.parse(localStorage.getItem("userInfo"))) ||
              "";
            // 判断当前登录人是否为 授权人或者被授权人， 否的话直接 赋值为 false
            // if (this.formdata.beAuthUserId && (userInfo.humanId == this.formdata.beAuthUserId || userInfo.humanId == this.formdata.currentUserId)) {
            //   // 判断是否转授权给其他人
            //   this.isAuthorizeOthers = (Boolean(this.formdata.beAuthUserId) || this.formdata.beAuthUserId === 0) && this.formdata.beAuthUserId !== userInfo.humanId ;
            // } else {
            //   this.isAuthorizeOthers = false;
            // }
            // this.isRouteFrom(this.formdata.beAuthUserName || '')
            /*若果不存在字段isUndertakeOver，或者字段值为0，则文件没有
            回收过。若字段值为1，则文件回收过*/
            try {
              this.formdata.isUndertakeOver = res.bHMainOrderDo.isUndertakeOver;
            } catch (e) {
              this.$set(this.formdata, "isUndertakeOver", "0");
            }
            this.formdata.draftDepartmentOne =
              res.bHMainOrderDo.draftDepartmentOne;
            this.formdata.draftDepartmentOneId =
              res.bHMainOrderDo.draftDepartmentOneId;
            this.formdata.sendList = res.sendList;
            this.formdata.commentsList = res.commentsList;
            try {
              this.formdata.cyList = res.cyList.filter(item => {
                //取传阅意见附件
                this.$api.setSysConfig
                  .getTextemList({
                    id: item.dataId,
                    fileType: "10010",
                    numYear: this.numyear
                  })
                  .then(res => {
                    this.$set(item, "attachmentPos", res.data);
                    this.$forceUpdate();
                  });
                return item;
              });
            } catch (e) {
              this.formdata.cyList = res.cyList;
            }

            this.formdata.checkList = res.checkList;

            //筛选所有可删除意见最后一条意见添加时间
            this.lastOptionTime = "0"; //时间重置
            this.getLastOptionTime("lastOptionTime", res.sendList);
            this.getLastOptionTime("lastOptionTime", res.checkList);
            this.getLastOptionTime("lastOptionTime", res.commentsList);

            //有finishTime字段且不为空，则表单已经办结
            if (!!res.bHMainOrderDo.finishTime) {
              this.isfinish = true;
            }

            try {
              this.formList.cbList = res.cbList.filter(item => {
                if (res.bHMainOrderDo.feedbackMode != 0) {
                  this.$api.setSysConfig
                    .getTextemList({ id: item.id, numYear: this.numyear })
                    .then(res => {
                      this.$set(item, "attachList", res.data);
                    });
                  return item;
                } else {
                  return item;
                }
              });
            } catch (e) {
              this.formdata.cyList = res.cyList;
            }
            this.formdata.draftDepartmentOne =
              this.formdata.draftDepartmentOne || this.formdata.draftDepartment;
            this.formdata.wyIds = res.wyIds;
            this.formdata.yyIds = res.yyIds;
            //获取传阅未阅已选人员
            if (res.wyIds) {
              this.cyCheckData = this.concatTreeData(
                res.wyIds,
                res.bHMainOrderDo.wyPle
              );
            } else {
              this.cyCheckData = [];
            }
            this.formdata.attachid = [];
            this.getFileList();
            this.getHuanJie();
            let self = this;
            setTimeout(() => {
              self.$nextTick(() => {
                self.buttonDisabled = false;
                self.$refs.ue.setUEContent(self.formdata.content);
              });
              self.$refs.ue.setUEContent(self.formdata.content);

              if (self.formdata.hasDocumentNo == "true") {
                self.$refs.ue.setDsabled();
              }
            }, 1000);
          } catch (e) {
            this.buttonDisabled = false;
          }
        });
    },
    /**
     * @param variable[string],自定义vue对象属性,用于存储意见列表最新时间
     * @param array[array],需要处理的数组
     */
    getLastOptionTime(variable, array) {
      array?.filter(item => {
        this[variable] =
          this[variable] > item.createTime ? this[variable] : item.createTime;
      });
    },
    // 判断是否为 首页进入并且为授权人
    isRouteFrom(authorizedPersonName) {
      const query = this.$route.query;
      if (query.routeFrom === "home" && this.isAuthorizeOthers) {
        this.$confirm(`此文正在由 ${authorizedPersonName} 处理`, {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          distinguishCancelAndClose: true,
          customClass: "but_model",
          type: "warning"
        })
          .then(response => {
            this.isShowDocument = true;
          })
          .catch(action => {
            if (action === "cancel") {
              this.$intent.closeWindow(this);
            } else {
              this.isShowDocument = true;
            }
          });
      } else {
        this.isShowDocument = true;
      }
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(" ");
      names = name.split(" ");
      ids.map((item, n) => {
        if (!!item) {
          obj.push({
            id: item,
            name: names[n]
          });
        }
      });
      return obj;
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.id, numYear: this.numyear })
        .then(res => {
          this.formdata.attchmentFileInfo = res.data;
          this.$forceUpdate();
          this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
        });
    },
    getHuanJie() {
      let self = this;
      this.$api.bianhan
        .getHuanJie({
          id: this.id,
          type: "0",
          currentUserId: this.$route.query.deptDetail
            ? JSON.parse(localStorage.getItem("bianhan")).humanId
            : ""
        })
        .then(res => {
          this.huanJieMessage = res.Fields;
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

          //批量下载反馈附件继承导出反馈意见显示条件
          let daochufankuiyijian = false;
          for (let i = 0; i < this.buttonList.length; i++) {
            if (this.buttonList[i].name == "导出反馈意见") {
              daochufankuiyijian = this.buttonList[i].show;
            }

            if (this.buttonList[i].name == "批量下载反馈附件") {
              this.buttonList[i].show = daochufankuiyijian;
            }
          }
          this.editedIdeaFields = this.setEditedIdeaFields(
            this.editedIdeaFields,
            this.huanJieMessage.editedIdeaFields,
            this.huanJieMessage.editedIdeaFieldsBycondition
          ); //可编辑意见域
          this.requiredIdeaFields = this.setRequiredIdeaFields(
            this.requiredIdeaFields,
            this.huanJieMessage.requiredIdeaFields
          ); //可编辑意见域
          this.setFormConfig();
        });
    },
    fileList(files) {
      if (
        this.formdata.attchmentFileInfo &&
        this.formdata.attchmentFileInfo.length
      ) {
        this.formdata.attchmentFileInfo.push(...files);
      } else {
        this.formdata.attchmentFileInfo = files;
      }
      this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
      if (!this.formdata.attachs) {
        this.formdata.attachs = [];
      }
      files.forEach(item => {
        this.formdata.attachs.push(item.id);
      });
      this.formdata.attach = this.formdata.attachs.join(",");
      this.formdata.attachid = this.formdata.attachs.join(",");
      this.$forceUpdate();
    },
    //起草保存文件
    async createFile(callback) {
      await this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formdata.attachid,
          fileType: "0"
        })
        .then(res => {
          callback;
        });
    },
    //批量下载反馈附件
    batchExporFeedbackFile() {
      for (let i = 0; i < this.formList.cbList.length; i++) {
        let self = this;
        let item = this.formList.cbList[i].attachList;
        for (let n = 0; !!item && n < item.length; n++) {
          setTimeout(() => {
            this.downFile(item[n], this.formList.cbList[i].cbUnitShort + "_");
          }, (n / 10) * 500);
        }
      }
    }
  },
  beforeDestroy() {
    // window.opener.postMessage(this.postMessage_store,location.origin);
  }
};
</script>
<style lang="less">
// 在reset.css 文件中有人设置了，位移60px，在此将其重置为0，不修改 reset.css 文件
.but_model {
  .el-message-box__btns {
    .el-button {
      transform: translateX(65px) !important;
    }
    .el-button:last-of-type {
      transform: translateX(-65px) !important;
    }
  }
}
</style>

<style scoped lang="less">
/deep/.zhusong .el-textarea__inner,
/deep/.chaosong .el-textarea__inner {
  min-height: 31px !important;
}
/deep/.displayClass {
  display: none;
}
/deep/.el-textarea__inner[disabled] {
  background-color: #e4e7ed52 !important;
  color: #606266 !important;
  cursor: not-allowed;
}
/deep/.chuanyue-textarea textarea.el-textarea__inner {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 32px;
  border: 0;
  outline: medium;
  padding: 0;
  min-height: 31px !important;
  height: auto;
  line-height: 31px;
}
/deep/.chuanyue-textarea2 textarea.el-textarea__inner {
  min-height: 31px !important;
  margin-top: 0px;
  margin-bottom: 0px;
  height: 32px;
  padding: 0;
  height: auto;
  line-height: 31px;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}

.height_90 {
  height: 200px;
  margin-top: -200px;
}
.error_mes_postion {
  position: relative;
  /deep/.el-form-item__error {
    top: 82px;
  }
}
.bank_dispach_content {
  width: 100%;
  height: auto;
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.process_order {
  min-height: 1000px;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    width: 100%;
    height: 70px;
    line-height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
    align-items: center;
    line-height: initial;
    display: flex;
    justify-content: flex-end;
    align-content: center;

    .left {
      margin-left: 20px;
    }

    .right {
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;
  }

  .process_content {
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;

    .cur_box {
      .cur_sess {
        float: left;
        display: flex;
        margin-top: 12px;

        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
        }
      }

      .feed_back {
        float: right;
        display: flex;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        color: #0f100e;
      }
    }

    .form_taxt {
      width: 90%;
      height: 100%;
      margin: 0 auto;

      .el-form-item__label {
        text-align: left !important;
      }

      .annex_btn_list {
        width: 86%;
        margin: 0 auto;
        margin-top: 16px;
        display: flex;

        div {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #0562c7;
          color: #fff;
          border-radius: 5px;
          margin-left: 16px;
          cursor: pointer;
        }

        div:nth-child(4) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }

        div:nth-child(5) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }
      }
    }

    .editor_box {
      height: 450px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 130px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}

.select-chang {
  padding: 5px;
  font-size: 18px;
  margin-right: 8px;
  cursor: pointer;
}

.adviceInfo {
  position: absolute;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
  user-select: text;
  background-color: rgba(228, 231, 237, 0.32);
}

.pad_lr10 {
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
}

.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}

.chuanyue1 {
  border-bottom: 1px solid #ccc;
}

.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  float: left;
  color: #606266;
  border-right: 1px solid #ccc;
  text-align: center;
  min-height: 62px;
  line-height: 62px;
}

.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.error-infor-tips {
  margin-bottom: 24px;
}

/deep/ .bianhaoDialog .el-dialog {
  max-width: 360px;
  .el-dialog__body {
    //  max-height: 160px;
    overflow: auto;
  }
  .el-radio__inner {
    border: 1px solid #666;
  }
  .el-radio-group {
    width: 80%;
    float: right;
    line-height: 20px;
    height: 20px;
    margin-top: 10px;
  }
}
</style>
