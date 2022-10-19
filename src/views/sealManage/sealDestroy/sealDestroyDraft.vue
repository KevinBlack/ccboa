<template>
  <!-- 这是印章管理》印章销毁新建/修改页 -->
  <div class="drafting" ref="drafting">
    <el-header>
      <div class="common-header">
        <div class="headerClicks grid_comtent">
          <el-button
            v-for="(item, index) in buttonList"
            :key="index"
            v-show="buttonList[index].show"
            @click="headerBtnClick(item.type)"
            plain
            size="mini"
          >{{item.name}}</el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="title" ref="mainTitle">{{Ttitle}}印章销毁审批单</div>
      <el-form
        :model="form"
        :rules="rules"
        ref="elForm"
        label-width="120px"
        class="drafting-mainform"
      >
        <el-row class="box" :span="24">
          <el-col :span="3" style="width: auto;margin-right: 20px;">
            <el-form-item label="当前环节:" label-width="100px">
              <span style="color:#f60">{{form.currentNode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: auto;margin-right: 20px;">
            <el-form-item label="当前处理人:" label-width="120px">
              <span style="color:#f60">{{form.currentUser}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" label-width="130px" prop="documentNo">
              <el-input v-model="form.documentNo" :disabled="readFields.bh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期" label-width="130px" prop="cdate">
              <el-date-picker
                style="width: 100%;"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择日期"
                :disabled="readFields.sqrq"
                v-model="form.cdate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请单位" label-width="130px" prop="draftDepartment">
              <el-input
                placeholder="申请人名称"
                v-model="form.draftDepartment"
                :disabled="readFields.sqdw"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人" label-width="130px" prop="creator">
              <el-input v-model="form.creator" :disabled="readFields.sqr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" label-width="130px" prop="tel">
              <el-input v-model="form.tel" :disabled="readFields.lxdh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="印章销毁名称" label-width="130px" prop="sealName">
              <el-select
                multiple
                v-model="sealIdList"
                :disabled="readFields.mc"
                style="width:100%"
                filterable
                @change="changeName"
              >
                <el-option
                  v-for="item in deptList"
                  :key="item.sealNameId"
                  :label="item.sealName"
                  :value="item.sealNameId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="销毁原因" label-width="130px" prop="destoryCause">
              <el-input v-model="form.destoryCause" :disabled="readFields.reson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="档案部门鉴定意见" label-width="130px" prop="qpYj">
              <el-row v-if="form.qpYjs && form.qpYjs.length==0 || !editedIdeaFields.qpYj">
                <el-input
                  type="textarea"
                  v-model="form.qpYj"
                  resize="none"
                  :disabled="editedIdeaFields.qpYj"
                ></el-input>
              </el-row>
              <div class="d_flex" v-if="form.qpYjs.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item) in form.qpYjs"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <!-- <div
                        class="el-icon-delete"
                        @click="deleteItem(item)"
                        style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                        v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>-->
                    <div style="word-break: break-all;">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <!-- <span style="margin-right:10px">{{ item.ct }}</span> -->
                      <span>{{item.lk}}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公示情况" label-width="130px" prop="shYj">
              <el-row v-if="form.shYjs && form.shYjs.length==0 || !editedIdeaFields.shYj">
                <el-input
                  type="textarea"
                  v-model="form.shYj"
                  resize="none"
                  :disabled="editedIdeaFields.shYj"
                ></el-input>
              </el-row>
              <div class="d_flex" v-if="form.shYjs.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item) in form.shYjs"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <!-- <div
                        class="el-icon-delete"
                        @click="deleteItem(item)"
                        style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                        v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>-->
                    <div style="word-break: break-all;">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <!-- <span style="margin-right:10px">{{ item.ct }}</span> -->
                      <span>{{item.lk}}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="办公室领导审签" label-width="130px" prop="offShYj">
              <el-row v-if="form.offShYjs && form.offShYjs.length==0 || !editedIdeaFields.offShYj">
                <el-input
                  type="textarea"
                  v-model="form.offShYj"
                  resize="none"
                  :disabled="editedIdeaFields.offShYj"
                ></el-input>
              </el-row>
              <div class="d_flex" v-if="form.offShYjs.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item) in form.offShYjs"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <!-- <div
                        class="el-icon-delete"
                        @click="deleteItem(item)"
                        style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                        v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>-->
                    <div style="word-break: break-all;">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <!-- <span style="margin-right:10px">{{ item.ct }}</span> -->
                      <span>{{item.lk}}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="销毁日期" label-width="130px" prop="destoryDate">
              <el-date-picker
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择日期"
                :disabled="readFields.destoryDate"
                v-model="form.destoryDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="销毁地点" label-width="130px" prop="destoryPlace">
              <el-input v-model="form.destoryPlace" :disabled="readFields.destoryPlace"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="z-index:10;">
          <el-col :span="24">
            <el-form-item
              label="销毁人"
              label-width="130px"
              v-if="form.yxhs!==undefined&&form.yxhs.length>0"
            >
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in form.yxhs"
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
            <el-form-item label="销毁人" label-width="130px" v-else-if="readFields.yxh" prop="yxh">
              <el-input type="textarea" resize="none" disabled></el-input>
              <!-- <el-radio-group v-model="form.yxh" :disabled="readFields.yxh">
                <el-radio label="已销毁"></el-radio>
              </el-radio-group>-->
            </el-form-item>
            <el-form-item label="销毁人" label-width="130px" prop="yxh" v-else>
              <el-radio-group v-model="form.yxh" :disabled="readFields.yxh">
                <el-radio label="已销毁"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="z-index:10;">
          <el-col :span="24">
            <el-form-item
              label="监销人"
              label-width="130px"
              v-if="form.yjxs!==undefined&&form.yjxs.length>0"
            >
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in form.yjxs"
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
            <el-form-item label="监销人" label-width="130px" v-else-if="readFields.yjx" prop="yjx">
              <el-input type="textarea" resize="none" disabled></el-input>
            </el-form-item>
            <el-form-item label="监销人" label-width="130px" v-else prop="yjx">
              <el-radio-group v-model="form.yjx" :disabled="readFields.yjx">
                <el-radio label="已监销"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" label-width="130px" prop="remark">
              <el-row v-if="form.remarks && form.remarks.length==0 || !editedIdeaFields.remark">
                <el-input
                  type="textarea"
                  v-model="form.remark"
                  resize="none"
                  :disabled="editedIdeaFields.remark"
                ></el-input>
              </el-row>
              <div class="d_flex" v-if="form.remarks.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item) in form.remarks"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <!-- <div
                        class="el-icon-delete"
                        @click="deleteItem(item)"
                        style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                        v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>-->
                    <div style="word-break: break-all;">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <!-- <span style="margin-right:10px">{{ item.ct }}</span> -->
                      <span>{{item.lk}}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="印模"
              label-width="130px"
              v-if="filesList&&filesList.length"
              prop="filesList"
            >
              <el-row>
                <el-form-item>
                  <el-col :span="24">
                    <!-- <div class="tree_w">
                      <el-scrollbar>
                        <div v-for="(item,index) in  filesList" :key="item.id" class="comp_list">
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="upRow(index)"
                                  v-if="filesList.length>1"
                                  :disabled="index==0"
                                  round
                                >上移</el-button>
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="downRow(index)"
                                  v-if="filesList.length>1"
                                  :disabled="index==filesList.length-1"
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
                    </div>-->
                    <upfileList :canmoveOrdown="isShow" label :fileList="filesList"></upfileList>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="外部单位销毁"
              label-width="130px"
              v-if="filesArray&&filesArray.length"
              prop="filesArray"
            >
              <el-row>
                <el-form-item>
                  <el-col :span="24">
                    <div class="tree_w">
                      <el-scrollbar>
                        <div v-for="(item,index) in  filesArray" :key="item.id" class="comp_list">
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="upRowSet(index)"
                                  v-if="filesArray.length>1"
                                  :disabled="index==0"
                                  round
                                >上移</el-button>
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="downRowSet(index)"
                                  v-if="filesArray.length>1"
                                  :disabled="index==filesArray.length-1"
                                  round
                                >下移</el-button>
                                <el-button
                                  type="warning"
                                  size="mini"
                                  @click.native="deleteRowSet(index,item.id)"
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
                </el-form-item>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>

    <!-- 完成并发送选人组件 -->
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

    <!-- 上传印模 -->
    <el-dialog title="引入印模" v-dialogDrag width="40%" :visible.sync="isShowFile">
      <upload-file-ts :uploadConfig="uploadConfig" :fileId="fileId" @fileList="fileList"></upload-file-ts>
    </el-dialog>
    <!-- 引入外部单位销毁 -->
    <el-dialog title="引入外部单位销毁" v-dialogDrag width="40%" :visible.sync="isShowFileSet">
      <upload-file-ts :uploadConfig="uploadConfigSet" @fileList="fileListSet"></upload-file-ts>
    </el-dialog>
    <!-- 查看流程 -->
    <shiwu-flow :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></shiwu-flow>

    <!-- 生成编号 -->
    <bian-hao
      :fileNo="fileNo"
      @isok="isok"
      :isShow="bianshow"
      @isclose="isclose"
      :kongQuelist="kongQuelist"
    ></bian-hao>
  </div>
</template>
<script>
// 设置页面元素显隐、置灰、校验等功能，
import pageSetMixins from "@/minixs/index";
// 添加message-one和message-some组件需要用到的方法
import messageMixins from "@/minixs/messageMixins.js";

// 导入选人组件（完成并发送时使用）
import selectPerson from "@/components/tree/treeTansun";

import uploadFileTs from "components/uploadFile/uploadFileTs"; //上传组件

// 导入部门机构选择组件
import selectOrgOrDept from "components/select/selectOrgOrDept";

// 导入留言输入显示组件
import MessageOne from "@/components/optionalfield/message-one.vue";
import MessageSome from "@/components/optionalfield/message-some.vue";
// 常用批语
import appendWriteList from "components/viewFlow/perWrit";

// 查看流程组件
import shiwuFlow from "@/components/viewFlow/shiwuFlow";

//上级行树组件
import supbankTree from "components/tree/superiorBank.vue";

import openOrDownLoadFile from "@/minixs/shiwuLineWord"; //在线预览

import bianHao from "@/components/createDocumentNo/bianHao"; //生成编号

import exportTable from "../../../minixs/exportTable";

import sealMarkMgrDocument from "../../printing/sealMarkMgrDocument.vue";
import upfileList from "../../bianhan/components/showUploadFile"; //附件展示

import viewDraft from "@/minixs/viewDraft";

import minixs from "@/minixs/index";

import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";

export default {
  name: "sealDestroy",
  components: {
    "select-org-or-dept": selectOrgOrDept,
    "message-some": MessageSome,
    "select-person": selectPerson,
    "upload-file-ts": uploadFileTs,
    "shiwu-flow": shiwuFlow,
    appendWriteList: appendWriteList,
    "supbank-tree": supbankTree,
    "bian-hao": bianHao,
    sealMarkMgrDocument,
    upfileList
  },
  mixins: [pageSetMixins, messageMixins, openOrDownLoadFile,minixs,draftMuban,viewDraft,dispatchIndex,isNowUser],
  data() {
    return {
      sealIdList: [],
      // 当前处理人
      currentUserNames:"",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      Ttitle: "",
      fileNo: "",
      isShow: true,
      rules: {}, // 校验规则
      checked: false,
      checkYjx: false,
      readFields: {
        sqdw: false, // 申请单位
        sqrq: false, // 申请日期
        sqr: false, // 申请人
        lxdh: false, // 联系电话
        bh: false // 编号
      }, // 不可编辑的控制域（即只读）。设置元素的disabled属性。设置了的为true
      requiredFields: {
        sqdw: false, // 申请单位
        sqrq: false, // 申请日期
        sqr: false, // 申请人
        lxdh: false, // 联系电话
        bh: false, // 编号
        mc: false, // 印章销毁名称
        reson: false, // 销毁原因
        destoryDate: false, // 销毁日期
        destoryPlace: false, // 销毁地点
        yxh: false, // 销毁人
        yjx: false // 监销人
      }, // 必填的控制域。在rules中配置。设置了的为true
      editedIdeaFields: {
        qpYj: true, // 申请单位主要负责人签批
        shYj: true, //公示情况
        offShYj: true, // 办公室领导审签
        remark: true // 备注
      }, // 可编辑意见域。设置元素的disabled属性，设置了的为false。我最后又取反了一次，让其与语义相同。(同readFields相反，我也很恼火)
      requiredIdeaFields: {
        qpYj: false, // 档案部门鉴定意见
        shYj: false, //公示情况

        offShYj: false, // 办公室领导审签
        remark: false // 备注
      }, // 必填意见域。在rules中配置。设置了的为true
      buttonList: [
        { name: "关闭", type: "gb", show: false },
        { name: "保存", type: "bc", show: false },
        { name: "完成并发送", type: "wcbfs", show: false },
        { name: "删除此文", type: "sccw", show: false },
        { name: "生成编号", type: "scbh", show: false },
        { name: "引入外部单位销毁", type: "yrwbdwxh", show: false },
        { name: "办结", type: "bj", show: false },
        { name: "引入印模", type: "yrym", show: false },
        { name: "归档打印", show: false, type: "gd" },
        { name: "查看流程", type: "cklc", show: false },
        { name: "收藏", show: false, type: "sc" },
        { name: "打印处理单", type: "dycld", show: false },
        { name: "操作指南", type: "czzn", show: false },
        { name: "流程调度", type: "lcdd", show: false }
      ], // 功能按钮.设置了的为true
      // 表格
      form: {
        currentUserId: "", // 当前环节应当的操作人ID
        currentUser: "", // 当前环节应当的操作人Nm
        currentNodeId: "", // 当前环节ID
        currentNode: "起草", //当前环节
        draftDepartment: "", // 申请单位
        draftDepartmentId: "", //申请单位Id
        cdate: "", // 申请日期
        creator: "", //申请人
        creatorId: "", //申请人Id
        documentNo: "", // 编号
        sealName: [], // 印章销毁名称
        remark: "", //备注
        tel: "", //联系电话
        destoryDate: "", // 销毁日期
        destoryPlace: "", // 印章销毁地点
        destoryPer: "", //印章销毁人
        yxh: "", //销毁人
        jxrV: "", //印章监销人
        yjx: "", // 监销人
        qpYj: "", //档案部门鉴定意见
        shYj: "", //公示情况
        offShYj: "", // 办公室领导审签
        remark: "", //备注
        jxrV: "", //印章监销人
        qpYjs: [], //档案部门鉴定意见
        shYjs: [], //公示情况
        offShYjs: [], // 办公室领导审签
        remarks: [] //备注
      },
      /* 完成并发送相关参数 */
      singelCheckF: true, // 单选，多选标志。true-单选 false-多选
      dialogTypeNow: "next",
      dialogType: "dosend",
      offenUse: true,
      loadingTree: true, // 是懒加载还是非懒加载
      canTab: false,
      hasRadio: false, // 是否单选
      checkOrg: false,
      attTitleID: [], //附件名称所有ID
      filesArrayID: [],
      seletOptionsData: [], // 环节
      treeData: [], // 部门（人员树）
      dialogTit: "选择人员",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      id: "",
      treeTradeCode: "", // 发文交易线，如果不设置就为默认的2023的交易线，设置了值就用设置的交易线
      huanJieMessage: {},
      showOrgTree: false,
      dialogTitle: "发上级行",
      isSingle: true,
      documentNoNum: 0, //记录是否已生成编号
      documentNoNum1: "1",
      orgOrDept: 1,
      kongQuelist: [], //空缺文号
      orgOrDeptId: "0",
      uploadConfig: {
        filesHas: [],
        id: "",
        fileType: true,
        isSpecial: 0,
        formId: "xiaohui"
      },
      fileId: "",
      uploadConfigSet: {
        filesHas: [],
        id: "",
        fileType: true,
        isSpecial: 0,
        formId: "set"
      },
      backFlag1: false,
      isShowFile: false,
      isShowFileSet: false,
      filesList: [],
      filesArray: [],
      documentNoStatus: false,
      showFlowChart: false,
      tableData: [],
      bianshow: false,
      isLoginUser: true,
      pageType: "",

      localUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前人员ID
      lastOptionTime: "0",
      deptList: []
    };
  },
  methods: {
    //按钮公共调用
    headerBtnClick(params) {
      switch (params) {
        case "gb": //关闭
          this.$confirm("是否保存并退出当前页面?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            distinguishCancelAndClose: true,
            type: "warning",
            callback: action => {
              if (action === "confirm") {
                if (this.id != null && this.id != "") {
                  // this.updateData();
                  this.$refs["elForm"].validate(valid => {
                    if (valid) {
                      this.$api.sealManage.sealDestroy
                        .destroySave({ ...this.form, id: this.id })
                        .then(res => {
                          console.log(res);
                          this.$message({
                            type: "success",
                            message: "保存成功"
                          });
                          this.destroyForm();
                          this.$intent.closeWindow(this);
                        })
                        .catch(err => {});
                    } else {
                      this.$message({
                        type: "warning",
                        message: "请填写必填项"
                      });
                    }
                  });
                } else {
                  // this.saveData();
                  this.$refs["elForm"].validate(valid => {
                    if (valid) {
                      if (this.filesList.length == 0) {
                        this.$message({
                          type: "warning",
                          message: "请引入印模"
                        });
                      } else {
                        this.$api.sealManage.sealDestroy
                          .destroyAdd(this.form)
                          .then(res => {
                            console.log(res);
                            this.$message({
                              type: "success",
                              message: "保存成功"
                            });
                            this.id = res.id;
                            this.createFile();
                            this.$intent.closeWindow(this);
                          })
                          .catch(err => {});
                      }
                    } else {
                      this.$message({
                        type: "warning",
                        message: "请填写必填项"
                      });
                    }
                  });
                }
                // this.$intent.closeWindow(this);
              } else if (action === "cancel") {
                this.$intent.closeWindow(this);
              } else if (action === "close") {
              }
            }
          });
          break;
        case "bc": //保存
          if (this.id != null && this.id != "") {
            this.updateData();
          } else {
            this.saveData();
          }
          break;
        case "wcbfs": //完成并发送
          if (this.requiredFields.bh == true && this.documentNoNum1 == "1") {
            this.$message({
              type: "warning",
              message: "请先生成编号"
            });
          } else {
            if (
              this.backFlag1 &&
              this.form.supUser &&
              this.form.currentNode != "起草"
            ) {
              this.$confirm("是否返回" + this.form.supUser + "?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.backPerson();
                })
                .catch(() => {
                  this.send();
                });
            } else {
              this.send();
            }
          }

          break;
        case "cb": //催办
          this.cuiBan();
          break;
        case "scbh": //生成编号
          console.log(this.documentNoNum1, "00");
          if (this.documentNoNum1 == "2") {
            this.$message({
              type: "warning",
              message: "编号以生成,请不要重复生成!"
            });
            return;
          }
          this.$refs["elForm"].validate(valid => {
            if (valid) {
              this.$api.sealManage
                .getSealNum({
                  markOrderType: "7",
                  statusType: true,
                  id: this.$route.query.id
                })
                .then(res => {
                  if (res.codeList) {
                    this.bianshow = true;
                    this.kongQuelist = res.codeList;
                    this.fileNo = res.fileNo;
                  } else {
                    this.documentNoNum1 = "2";
                    this.$set(this.form, "documentNo", res.data);
                    if (this.id != null && this.id != "") {
                      console.log(33);
                      this.$api.sealManage.sealDestroy
                        .destroySave({ ...this.form, id: this.id })
                        .then(res => {
                          this.destroyForm();
                        });
                    }
                    this.getLink();
                    this.$message({
                      type: "success",
                      message: "生成编号成功!"
                    });
                  }
                });
            } else {
              this.$message({
                type: "warning",
                message: "请输入必填项"
              });
            }
          });
          break;
        case "bj": //办结
          if (this.filesArray.length == 0) {
            this.$message({
              type: "warning",
              message: "请引入外部单位销毁证明"
            });
          } else {
            this.$confirm("是否办结?", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
              distinguishCancelAndClose: true,
              type: "warning",
              callback: action => {
                if (action === "confirm") {
                  this.$api.sealManage.sealDestroy
                    .destend({ over: true, id: this.id })
                    .then(res => {
                      this.$message({
                        type: "success",
                        message: "办结成功"
                      });
                      this.$intent.closeWindow(this);
                    });
                } else if (action === "cancel") {
                } else if (action === "close") {
                }
              }
            });
          }

          break;
        case "sccw": //删除此文
          this.descDel();
          break;
        case "yrym": //引入印模
          this.uploadYM();
          break;
        case "yrwbdwxh": //引入销毁证明
          this.uploadXH();
          break;
        case "gddy": //归档打印
          this.print();
          break;
        case "cklc": //查看流程
          this.getProcess();
          break;
        case "bjgb": //办结关闭
          this.$intent.closeWindow(this);
          break;
        case "dycld": //打印处理单
          this.$intent.goNewPage(this, {
            path: "/sealManage/sealDestroy/printDesc",
            query: { id: this.id }
          });
          break;
        case "czzn": //操作指南
          this.handBook("YZGL");
          break;
        case "sc": //收藏
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
                .shoucang({ markOrderType: "7", id: this.id })
                .then(res => {
                  console.log(res, "获取收藏返回值");
                  this.downFile(res);
                  // this.$message({
                  //   type: "success",
                  //   offset: "200",
                  //   message: "收藏完成"
                  // });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });

          break;
        default:
          break;
      }
    },
    //获取详情
    destroyForm() {
      this.$api.sealManage.sealDestroy
        .destroyForm({ id: this.id })
        .then(res => {
          this.form = res.data;
          this.sealIdList = res.data.sealNameId ? res.data.sealNameId.split("#,").map(item => item.split("|,")[0]) : [];
          this.id = res.data.id;
          this.backFlag1 = res.backFlag1;
          if (this.form.currentNode == "起草") {
            console.log(this.form.currentNode);
            this.isShow = true;
          } else {
            console.log(this.form.currentNode);
            this.isShow = false;
          }
          console.log(this.isShow, "this.isShow create");
          // this.documentNoStatus =
          //   this.form.documentNo.split("〕")[1].length > 1;
          let As = res.data.documentNo.split("〕")[1];
          console.log("true", As);
          if (As === "号") {
            this.documentNoNum1 = "1";
          } else {
            this.documentNoNum1 = "2";
          }
          // for (var key in this.form) {
          //   this.form[key].filter(item => {
          //     this.lastOptionTime =
          //       this.lastOptionTime > item.dateTime
          //         ? this.lastOptionTime
          //         : item.dateTime;
          //   });
          // }
          this.getLink();
          this.getFileList();
          this.getFileArray();
        });
    },
    changeName(val) {
      let list = this.deptList.filter(item => val.includes(item.sealNameId));
      this.form.sealName = list.map(item => item.sealName).join(',');
      this.form.sealNameId = list.map(item => `${item.sealNameId}|,${item.sealName}`).join('#,');
      console.log('this.form.sealName', this.form.sealNameId)
      console.log('this.form.sealName',this.form.sealName)
    },
    //保存
    saveData() {
      console.log(this.form);
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          if (this.filesList.length == 0) {
            this.$message({
              type: "warning",
              message: "请引入印模"
            });
          } else {
            this.$api.sealManage.sealDestroy
              .destroyAdd(this.form)
              .then(res => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.id = res.id;
                this.fileId = res.id;
                sessionStorage.setItem("fileId", this.fileId);
                try {
                  if (this.form.attachid.length > 0) {
                    this.createFile();
                  }
                } catch (e) {
                  console.log(e);
                }
                this.$intent.replace(this, {
                  path: "/sealManage/sealDestroy/sealDestroyDraft",
                  query: { id: this.id }
                });
                this.uploadConfig.id = this.id;
                this.destroyForm();
              })
              .catch(err => {});
          }
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项"
          });
        }
      });
    },
    updateData() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.sealManage.sealDestroy
            .destroySave({ ...this.form, id: this.id })
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.destroyForm();
            })
            .catch(err => {});
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项"
          });
        }
      });
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      // bank_doDownloadFile.filePath = '/home/ap'+file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
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
                duration: 500
              });
            }
          }
        });
    },
    //催办
    cuiBan() {
      this.$api.sealManage.sealDestroy
        .cuiBan({
          id: this.id
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: res.msg,
              type: "success"
            });
          }
        });
    },
    //返回上一处理人
    async backPerson() {
      this.id == null || this.id == ""
        ? await this.$api.sealManage.sealDestroy
            .destroyAdd(this.form)
            .then(res => {
              this.id = res.id;
              this.createFile();
              this.createFileSet();
            })
        : this.$api.sealManage.sealDestroy
            .destroySave({ ...this.form, id: this.id })
            .then(res => {
              this.createFile();
              this.createFileSet();
            });
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.sealManage.sealDestroy
            .destroySendFor({ backFlag1: true, id: this.id })
            .then(res => {
              if (res.code === "SUCCESS") {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.$intent.closeWindow(this);
              }
            })
            .catch(err => {});
          // this.$api.sealManage.sealDestroy
          //   .destbeBack({
          //     id: this.id,
          //     thType: "1"
          //   })
          //   .then(res => {
          //     if (res.code == "SUCCESS") {
          //       this.$message({
          //         message: res.msg,
          //         type: "success"
          //       });
          //       this.$intent.closeWindow(this);
          //     }
          //   });
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填项"
          });
        }
      });
    },
    //完成并发送
    async send() {
      if (this.filesList.length == 0) {
        this.$message({
          type: "warning",
          message: "请引入印模"
        });
      } else {
        // if (this.requiredFields.bh == true && this.documentNoNum1 == "1") {
        //   this.$message({
        //     type: "warning",
        //     message: "请先生成编号"
        //   });
        // } else {
        this.id == null || this.id == ""
          ? await this.$api.sealManage.sealDestroy
              .destroyAdd(this.form)
              .then(res => {
                this.id = res.id;
                this.createFile();
                this.createFileSet();
              })
          : this.$api.sealManage.sealDestroy
              .destroySave({ ...this.form, id: this.id })
              .then(res => {
                this.createFile();
                this.createFileSet();
              });
        this.$refs["elForm"].validate(valid => {
          if (valid) {
            this.dialogState = true;
            this.$api.sealManage.sealDestroy
              .destroySend({ id: this.id })
              .then(res => {
                this.seletOptionsData = this.shoNextNode(
                  res.list,
                  this.huanJieMessage.acyNodeNextBount
                );
              })
              .catch(err => {});
          } else {
            this.$message({
              type: "warning",
              message: "请填写必填项"
            });
          }
        });
        // }
      }
    },
    showCompDialog(data, status, type, params, dtype) {
      console.log(
        "data",
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
      this.dialogState = false;
      if (status) {
        this.form.nextUserName = data[0].name;
        // this.form.nextUserId =
        //   data[0].idStr.toString() + "#" + data[0].deptId.toString();
        this.form.nextUserId = data[0].id;
        this.form.nextAvyId = params.id;
        this.form.nextAvyName = params.name;
        this.form.id = this.id;
        this.form.clLx = "完成并发送";
        this.form.unitId = data[0].id.split("#")[1];
        // this.form.over = true; //办结标示
        this.$api.sealManage.sealDestroy
          .destroySendFor(this.form)
          .then(res => {
            if (res.code === "SUCCESS") {
              this.$intent.closeWindow(this);
            }
          })
          .catch(err => {});
      }
    },

    // 生成编号
    // getSealNum(type, v) {
    //   var data = {
    //     markOrderType: "7",
    //     statusType: type
    //   };
    //   if (type) {
    //     if (this.documentNoNum1 == "1") {
    //       this.$message({
    //         type: "warning",
    //         message: "编号以生成,请不要重复生成!"
    //       });
    //       return;
    //     }
    //     data.id = this.id;
    //   } else {
    //     data.draftDepartmentId = this.form.draftDepartmentId;
    //   }
    //   if (v) {
    //     data.fileNo = v;
    //   }
    //   this.$api.sealManage.getSealNum(data).then(res => {
    //     if (res.codeList) {
    //       this.bianshow = true;
    //       this.kongQuelist = res.codeList;
    //       this.fileNo = res.fileNo;
    //     } else {
    //       this.documentNoNum1 = "1";
    //       this.$set(this.form, "documentNo", res.data);
    //       this.getLink();
    //     }
    //     if (this.id != null && this.id != "") {
    //       this.updateData();
    //     }
    //     if (v) {
    //       this.bianshow = false;
    //     }
    //   });
    // },
    /**
     * 生成编码
     */
    generateNumber(val) {
      // if (this.documentNoNum === 1) {
      //   this.$message({
      //     type: "warning",
      //     message: "已生成编号！"
      //   });
      //   return;
      //   // break;
      // }
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.sealManage
            .getSealNum({
              markOrderType: "7",
              statusType: true,
              id: this.$route.query.id,
              fileNo: val
            })
            .then(res => {
              this.documentNoNum1 = "2";
              this.$set(this.form, "documentNo", res.data);

              this.getLink();
              this.$message({
                type: "success",
                message: "生成编号成功!"
              });

              this.bianshow = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项"
          });
        }
      });
    },
    //获取环节
    getLink() {
      this.$api.sealManage.sealDestroy.getdesLink({ id: this.id }).then(res => {
        console.log(res, "获取环节");
        this.huanJieMessage = res.Fields;
        // 设置必填的控制域
        this.requiredFields = this.setRequiredFields(
          this.requiredFields,
          this.huanJieMessage.requiredFields
        );
        //设置不可编辑控制域
        this.readFields = this.setReadFields(
          this.readFields,
          this.huanJieMessage.readFields
        );
        this.buttonList = this.showButton(
          this.buttonList,
          this.huanJieMessage.visibleButtons,
          this.huanJieMessage.visibleButtonsBycondition
        ); //带约束条件可操作按钮
        //设置可编辑意见域
        this.editedIdeaFields = this.setEditedIdeaFields(
          this.editedIdeaFields,
          this.huanJieMessage.editedIdeaFields,
          this.huanJieMessage.editedIdeaFieldsBycondition
        );
        //设置必填的意见域
        this.requiredIdeaFields = this.setRequiredIdeaFields(
          this.requiredIdeaFields,
          this.huanJieMessage.requiredIdeaFields
        );
        this.setRuleConfig();
      });
    },
    setRuleConfig() {
      this.rules = {
        cdate: [
          {
            required: this.requiredFields.sqrq,
            message: "不能为空",
            trigger: "change"
          }
        ],
        tel: [
          {
            required: this.requiredFields.lxdh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        sealName: [
          {
            required: this.requiredFields.mc,
            message: "不能为空",
            trigger: "change"
          }
        ],
        documentNo: [
          {
            required: this.requiredFields.bh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        draftDepartment: [
          {
            required: this.requiredFields.sqdw,
            message: "不能为空",
            trigger: "change"
          }
        ],
        destoryCause: [
          {
            required: this.requiredFields.reson,
            message: "不能为空",
            trigger: "change"
          }
        ],
        creator: [
          {
            required: this.requiredFields.sqr,
            message: "不能为空",
            trigger: "change"
          }
        ],
        qpYj: [
          {
            required: this.requiredIdeaFields.qpYj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        shYj: [
          {
            required: this.requiredIdeaFields.shYj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        offShYj: [
          {
            required: this.requiredIdeaFields.offShYj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        destoryDate: [
          {
            required: this.requiredFields.destoryDate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        destoryPlace: [
          {
            required: this.requiredFields.destoryPlace,
            message: "不能为空",
            trigger: "change"
          }
        ],
        yxh: [
          {
            required: this.requiredFields.yxh,
            message: "不能为空",
            trigger: "change"
          }
        ],
        yjx: [
          {
            required: this.requiredFields.yjx,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.remark,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
    },

    //归档打印
    print() {},
    //删除此文
    descDel() {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.sealManage.sealDestroy
          .destroyDel({ id: this.id })
          .then(res => {
            if (res && res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.$intent.closeWindow(this);
            }
          });
      });
    },
    //引入印模
    uploadYM() {
      this.isShowFile = true;
    },
    // createFile() {
    //   this.$api.setSysConfig
    //     .saveFile({
    //       id: this.id,
    //       fileId: this.form.attachid,
    //       fileType: "0"
    //     })
    //     .then(res => {});
    // },
    async createFile(callback) {
      await this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.form.attachid,
          fileType: "0"
        })
        .then(res => {
          callback;
        });
    },
    createFileSet() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id + "1",
          fileId: this.form.filesid,
          fileType: "0"
        })
        .then(res => {});
    },
    //获取印模列表
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.id
        })
        .then(res => {
          console.log(res);
          // this.filesList = res.data;
          this.$nextTick(() => {
            // this.$set(this.uploadConfig, "filesHas", res.data);
            // this.filesList = res.data;
            this.filesList = res.data;
            this.$forceUpdate();
            this.uploadConfig.filesHas = this.filesList;
          });
          console.log(this.filesList, "this.filesList");
        })
        .catch(err => {});
    },

    //上传印模
    fileList(files) {
      this.isShowFile = false;
      if (this.filesList && this.filesList.length) {
        this.filesList.push(...files);
      } else {
        this.filesList = files;
      }
      files.forEach(item => {
        this.attTitleID.push(item.id);
      });
      this.uploadConfig.filesHas = this.filesList;
      this.form.attachid = this.attTitleID.join(",");
      this.$forceUpdate();
    },

    //删除印模
    deleteRow(n, id) {
      console.log(n, id);
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify({ id: id, function: "deleteFileById" }),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                // this.getFileList();
                // this.getFileArray();
                this.filesList.splice(n, 1);
                this.$forceUpdate();
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
          });
      });
    },
    deleteRowSet(n, id) {
      console.log(n, id);
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify({ id: id, function: "deleteFileById" }),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.filesArray.splice(n, 1);
                this.$forceUpdate();
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
          });
      });
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.filesList[n - 1].id,
          sort: this.filesList[n].sort
        },
        {
          id: this.filesList[n].id,
          sort: this.filesList[n - 1].sort
        }
      );
      midObj = this.filesList[n];
      this.filesList[n] = this.filesList[n - 1];
      this.filesList[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.filesList[n + 1].id,
          sort: this.filesList[n].sort
        },
        {
          id: this.filesList[n].id,
          sort: this.filesList[n + 1].sort
        }
      );
      midObj = this.filesList[n];
      this.filesList[n] = this.filesList[n + 1];
      this.filesList[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    // 外部单位销毁上传下载排序
    upRowSet(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.filesArray[n - 1].id,
          sort: this.filesArray[n].sort
        },
        {
          id: this.filesArray[n].id,
          sort: this.filesArray[n - 1].sort
        }
      );
      midObj = this.filesArray[n];
      this.filesArray[n] = this.filesArray[n - 1];
      this.filesArray[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    downRowSet(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.filesArray[n + 1].id,
          sort: this.filesArray[n].sort
        },
        {
          id: this.filesArray[n].id,
          sort: this.filesArray[n + 1].sort
        }
      );
      midObj = this.filesArray[n];
      this.filesArray[n] = this.filesArray[n + 1];
      this.filesArray[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    isok(v) {
      this.generateNumber(val);
      // this.getSealNum(true, v);
    },
    isclose() {
      this.bianshow = false;
    },
    //引入销毁证明
    uploadXH() {
      this.isShowFileSet = true;
    },
    //引入外部单位销毁
    fileListSet(files) {
      this.isShowFileSet = false;
      if (this.filesArray && this.filesArray.length) {
        this.filesArray.push(...files);
      } else {
        this.filesArray = files;
      }
      files.forEach(item => {
        this.filesArrayID.push(item.id);
      });
      this.uploadConfigSet.filesHas = files;
      this.form.filesid = this.filesArrayID.join(",");
      this.$forceUpdate();
    },
    //获取单位销毁证明列表
    getFileArray() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.id + "1"
        })
        .then(res => {
          console.log(res);
          this.$nextTick(() => {
            this.$set(this.uploadConfigSet, "filesHas", res.data);
            this.filesArray = res.data;
          });
          console.log(this.filesArray, "this.filesArray");
        })
        .catch(err => {});
    },
    //查看流程
    getProcess() {
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.form.workflowId,
          subProcessInstId:
            this.form.workflowId == this.form.supWorkflowId
              ? ""
              : this.form.supWorkflowId
        })
        .then(res => {
          console.log(res);
          this.showFlowChart = true;
          this.tableData = res.data;
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        })
        .catch(err => {});
    },
    // 查询印章废止名称
    seachTitle() {
      this.$api.sealManage.sealDestroy
        .seachTitle({
          sealStatus: "A03",
          sealName: "",
          draftOrganId: this.form.draftOrganId
        })
        .then(res => {
          let deptAry = res.list;
          for (let i = 0; i < deptAry.length; i++) {
            this.deptList.push({
              sealNameId: deptAry[i].id,
              sealName: deptAry[i].sealName
            });
          }
          console.log(this.deptList, "this.deptList");
        });
    }
  },
  created() {
    this.Ttitle = JSON.parse(localStorage.unitInfo)[0].unitName;
    console.log(this.$route.query);
    this.form.currentUser = this.$route.query.deptDetail
      ? JSON.parse(this.$route.query.deptDetail).humanName
      : "";
    this.form.currentUserId = this.$route.query.deptDetail
      ? JSON.parse(this.$route.query.deptDetail).humanId
      : "";
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.fileId = this.$route.query.id;
      sessionStorage.setItem("fileId", this.fileId);
      this.uploadConfig.id = this.id;
      this.uploadConfigSet.id = this.id + "1";
      this.destroyForm();
    } else {
      this.form.tel = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).telMobile //联系电话
        : "";
      this.form.draftDepartment = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).firstUnitName //申请单位
        : "";
      this.form.draftDepartmentId = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).firstUnitId.toString()
        : ""; //申请单位Id
      this.form.creator = JSON.parse(
        localStorage.getItem("userInfo")
      ).humanName; //申请人
      this.form.draftOrganId = JSON.parse(localStorage.userInfo).unitId;
      this.form.creatorId = this.$route.query.deptDetail
        ? JSON.parse(this.$route.query.deptDetail).humanId
        : ""; //申请人Id
      this.$api.sealManage
        .getSealNum({
          markOrderType: "7",
          statusType: false,
          draftDepartmentId: this.form.draftDepartmentId
        })
        .then(res => {
          this.$set(this.form, "documentNo", res.data);
          this.$set(this.form, "cdate", res.newDateYY);
        });
      // this.getSealNum(false);
      this.getLink(); // 获取环节
    }
    this.seachTitle(); //查询印章废止名称
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.red {
  color: "#E00";
}
.textCenter {
  text-align: center;
}
.drafting {
  background: #fff;
  min-height: 100vh;
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
      float: right;
    }
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
// .el-header {
//     width: 100%;
//     background-color: #409eff;
//     color: #333;
//     line-height: 60px;
//     z-index: 2;
// .slider-contaner {
//     width: 100%;
//     height: 60px;
//     overflow: hidden;
//     position: relative;
// }
// .slider {
//     width: 1200px;
//     height: 60px;
// }
// }
.common-header {
  width: 100%;
  display: flex;
  background: #409eff;
  justify-content: space-between;
  align-items: center;
  .back {
    line-height: 60px;
    height: 60px;
    margin-left: 2%;
    color: #eee;
  }
}

.el-main {
  width: 100%;
  .box {
    width: 100%;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    height: 40px;
    margin: 0 0 20px 0;
  }
  .processOffset {
    margin-top: 10px;
    margin-right: 50px;
  }
  /deep/ .el-badge__content {
    height: 22px;
  }
  .title {
    width: 100%;
    min-height: 90px;
    line-height: 90px;
    text-align: center;
    // font-size: 35px;
    // color: #409eff;
    font-size: 44px;
    color: #096dd9;
    font-weight: 500;
  }
  .drafting-mainform {
    width: 92%;
    border: 1px solid #dcdfe6;
    padding: 2% 2%;
    margin: auto;
  }
  .wrap {
    position: relative;
  }
  .wrap::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(100, 100, 1000, 0.2);
    z-index: 1;
  }
  .card-minPadding {
    /deep/ .el-card__body {
      padding: 0 10px;
    }
  }
  .not-show {
    display: none;
  }
  .img-init {
    display: inline-block;
    min-width: 100px;
    min-height: 100px;
    max-width: 400px;
    max-height: 400px;
    border: 1px solid #c5c5c5;
  }
  .my-label {
    width: 100px;
    line-height: 32px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
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
    border: 1px solid #999;
    border-radius: 2px;
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
.pad_lr10 {
  margin: 0 0 0 16px;
  padding: 0 0 0 10px;
}
.creat_time {
  position: relative;
  top: -10px;
}
.headerClicks {
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #409eff;
  display: flex;
  .el-button {
    margin: 10px 0 0 10px;
  }
}
.file-form {
  height: 200px;
  padding: 1px 20px;
  overflow: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .file-item {
    display: flex;
    margin-bottom: 16px;
    .text-default {
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
    .btns {
      .margin-default {
        margin-right: 15px;
      }
    }
  }
}
</style>
