<template>
  <div id="receiveSponsorReadonly" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>中国建设银行收文协办单
        </p>
        <div class="grid_comtent" v-if="fromdata.isMutil == 1">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
                     v-if="fromdata.filePath">查看正文
          </el-button>
          <el-button size="small" plain @click="shxbr('cb')" v-if="fromdata.isShowSendXb ==false&&state == 2&&fromdata.isLastXb==false"  v-show="readonlySwcy">催办</el-button>
          <el-button size="small" plain @click="shxbr('sh')" v-if="fromdata.isShowSendXb ==false&&state == 2&&fromdata.isLastXb==false"  v-show="readonlySwcy">收回</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet('/swxbd')">打印处理单</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
          <el-button size="small" plain @click="caozuozhinan"  v-show="readonlySwcy">操作指南</el-button>
        </div>
        <div class="grid_comtent" v-else>
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
                     v-if="fromdata.filePath">查看正文
          </el-button>
          <el-button size="small" plain @click="shxbr('sh')" v-if="fromdata.isShowSendXb ==false&&state == 2" v-show="readonlySwcy">收回</el-button>
          <el-button size="small" plain @click="shxbr('cb')" v-if="fromdata.isShowSendXb ==false&&state == 2"  v-show="readonlySwcy">催办</el-button>
          <el-button size="small" plain v-if="state == 2&&fromdata.isShowSendXb ==true" @click="cuibanClick"  v-show="readonlySwcy">催办</el-button>
          <el-button size="small" plain @click="blsh"
                     v-if="fromdata.curNodeCode!=800&&this.readFlag!=1&&allowBack==true&&fromdata.isShowSendXb ==true"  v-show="readonlySwcy">收回
          </el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet('/swxbd')">打印处理单</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
          <el-button size="small" plain @click="caozuozhinan"  v-show="readonlySwcy">操作指南</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 多人协办收回 -->
    <el-dialog :title="titleTypeForDr" :visible.sync="shdialog1" width="50%">
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox
            v-for="item in shDataDR"
            :label="item.id"
            :key="item.id"
          >{{ item.curUser }}
          </el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="needClear">取 消</el-button>
        <el-button type="primary" @click="shQDRueding">确 定</el-button>
      </span>
    </el-dialog>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行收文协办单</h3>
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
          :class="active == '#qpyj1' ? 'active' : ''"
          @click="toTarget('#qpyj1')"
        >签批意见</a>
        <a
          href="javascript:void(0);"
          :class="active == '#fsdx' ? 'active' : ''"
          @click="toTarget('#fsdx')"
        >附件</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >反馈意见</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前环节：
              <span>{{ fromdata.curNodeName }}</span>
            </p>
            <p v-if="fromdata.curNodeCode!=800" class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{ fromdata.curUser }}</span>
            </p>
          </div>
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="正文标题">
                    <el-input v-model="fromdata.title" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <!-- <el-input type="textarea" autosize resize="none" v-model="fromdata.attachmentTitle" disabled></el-input> -->
                    <!-- <el-form-item label="附件标题"> -->
                    <el-input
                      type="textarea"
                      autosize
                      resize="none"
                      placeholder="附件标题"
                      v-model="fromdata.attachmentTitle"
                      style="white-space:pre-line;word-break:break-all"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文日期" :disabled="true">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="fromdata.receiveTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8">
                    <el-input
                      v-model="fromdata.emergencyName"
                      disabled
                      style="width:100%"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文字号">
                    <el-input v-model="fromdata.documentCode" disabled></el-input>
                  </el-form-item>
                </el-col>
                <div
                  v-if="fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子发文'||  fromdata.fromWhere == ''">
                  <el-col :span="8">
                    <el-form-item label="收文字数" prop="receiveWords" ref="receiveWords">
                      <el-input v-model="fromdata.receiveWords" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="业务分类" prop="bussinessTypeName" ref="bussinessTypeName">
                      <el-input v-model="fromdata.bussinessTypeName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="文种" prop="documentClassName" ref="documentClassName">
                      <el-input v-model="fromdata.documentClassName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <el-col :span="8">
                  <el-form-item label="来文单位">
                    <el-input v-model="fromdata.sendOrgName" :title="fromdata.sendOrgName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="成文日期"
                    :disabled="fromdata.state==1"
                  >
                    <el-date-picker
                      disabled
                      type="date"
                      placeholder="选择日期"
                      v-model="fromdata.completeTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="登记人"
                    disabled
                  >
                    <el-input v-model="fromdata.userName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8">
                    <el-input v-model="fromdata.secretType" disabled></el-input>
                  </el-form-item>
                </el-col>
                <div
                  v-if="fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子发文'||  fromdata.fromWhere == ''">
                  <el-col :span="8" v-if="fromdata.secretType == '商业秘密'">
                    <el-form-item label="秘密期限类型" :span="8">
                      <el-input v-model="fromdata.secretLimitType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="fromdata.secretType != '商业秘密'">
                    <el-form-item label="秘密标志" :span="8">
                      <el-input v-model="fromdata.secretFlagType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="fromdata.secretType == '商业秘密'">
                    <el-form-item
                      label="密级和保密期限"
                      :span="8"
                    >
                      <el-input v-model="fromdata.secretFlagType" disabled style="width:40%"></el-input>
                      <i class="el-icon-star-off pad_10"></i>
                      <el-input style="width:40%" v-model="fromdata.secretFlagContent" disabled>
                        <el-button slot="append">{{ fromdata.secretTimeType }}</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </div>


                <div v-if="fromdata.fromWhere == '实物收文'">
                  <el-col :span="8">
                    <el-form-item label="密级和保密期限">
                      <el-input
                        style="width:calc(50% - 10px)"
                        v-model="fromdata.secretFlagType" disabled
                      ></el-input>
                      <span style="display:inline-block;text-align: center;width:20px;">/</span>
                      <el-input
                        style="width:calc(50% - 10px)"
                        :value="fromdata.secretLimitType" disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <el-col v-if="fromdata.fromWhere == '实物收文'">
                  <el-form-item label="承办部门" label-width="130px">
                    <el-input v-model="fromdata.undertakeDeptName"
                              :title="fromdata.undertakeDeptName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-else>
                  <el-form-item label="主办部门" label-width="130px">
                    <el-input v-model="fromdata.undertakeDeptName"
                              :title="fromdata.undertakeDeptName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="协办部门">
                    <el-input
                      v-model="fromdata.assistDeptName" disabled
                      :title="fromdata.assistDeptName"
                      placeholder="请选择协办部门"
                      style="width: 100%;"
                    >
                      <el-button slot="append" @click="getTreeData('xie')" :disabled="true"
                                 icon="el-icon-plus"></el-button>

                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <h6 class="bank_dispach_file_tit">签批意见</h6>
              <div id="qpyj" class="height_90"></div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="批示意见">
                    <div v-if="!(fromdata.pishiOpinionList&&fromdata.pishiOpinionList.length>0)">
                      <el-input type="textarea" resize="none" autosize disabled></el-input>
                    </div>
                    <opinionText
                      :opinionText="fromdata.pishiOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="办公室批办意见">
                    <div v-if="!(fromdata.officeOpinionList&&fromdata.officeOpinionList.length>0)">
                      <el-input type="textarea" resize="none" autosize disabled></el-input>
                    </div>
                    <opinionText
                      :opinionText="fromdata.officeOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="承办部门办理情况">
                    <div v-if="!(fromdata.undertakeOrgOpinionList && fromdata.undertakeOrgOpinionList.length>0)">
                      <el-input type="textarea" resize="none"
                                autosize disabled></el-input>
                    </div>
                    <opinionText
                      :opinionText="fromdata.undertakeOrgOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="协办部门办理情况">
                    <div v-if="!(fromdata.helpOrgOpinionList && fromdata.helpOrgOpinionList.length>0)">
                      <el-input type="textarea" resize="none" autosize disabled></el-input>
                    </div>
                    <opinionText
                      :opinionText="fromdata.helpOrgOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="办结情况">
                    <div v-if="!(fromdata.handleTerminateOpinionList&&fromdata.handleTerminateOpinionList.length>0)">
                      <el-input type="textarea"
                                resize="none"
                                autosize disabled></el-input>
                    </div>
                    <opinionText
                      :opinionText="fromdata.handleTerminateOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="传阅意见">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-if="showCy"
                      disabled
                    ></el-input>
                    <opinionText
                      :opinionText="fromdata.circulateOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :isArr="true"
                      :isCy="true"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备    注">
                    <el-input type="textarea" resize="none" autosize
                              v-if="fromdata.remarksList==''||!fromdata.remarksList" disabled></el-input>
                    <opinionText
                      :opinionText="fromdata.remarksList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :isRemarks="true"
                    ></opinionText>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row class="pr45">
              <el-col v-if="fromdata.receiveDocFileList&&fromdata.receiveDocFileList.length">
                <div class="file_list_box">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.receiveDocFileList" :key="item.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <span class="down" :title="item.fileName" @click="viewDraftFile(item.fileName,item.filePath,$businessCode.swglfj)">{{ item.fileName }}</span>
                          <span class="name">{{ item.createrName }}</span>
                          <span class="time">{{ item.createTime }}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item)"
                              round
                            >下载
                            </el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>
              </el-col>
              <el-col>
                <el-form-item label="反馈附件">
                </el-form-item>
                <div class="file_list_box" v-if="fromdata.helpFileList&&fromdata.helpFileList.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.helpFileList" :key="item.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <span class="down" :title="item.fileName" @click="viewDraftFile(item.fileName,item.filePath,$businessCode.swglfj)">{{ item.fileName }}</span>
                          <span class="name">{{ item.createrName }}</span>
                          <span class="time">{{ item.createTime }}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item)"
                              round
                            >下载
                            </el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>

              </el-col>
            </el-row>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">反馈意见</h6>
            <div id="fkyj" class="height_90"></div>
            <div class="pr45">
              <el-row>
                <el-col>
                  <el-form-item label="最终意见">
                    <el-input type="textarea" resize="none" v-model="fromdata.finalOpinion" autosize
                              v-if="fromdata.finalOpinionList==''||!fromdata.finalOpinionList||fromdata.curNodeCode!=800"
                              disabled></el-input>
                    <template v-if="fromdata.curNodeCode==800">
                      <opinionText
                        :opinionText="fromdata.finalOpinionList"
                        :sendOpinionMaxTime="fromdata.opinionMaxTime"
                        :nowUserId="nowUserId"
                        @deletService="deletService"
                        :curNodeCode="fromdata.curNodeCode"
                      ></opinionText>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="过程意见">
                    <el-input type="textarea" resize="none" autosize
                              v-if="fromdata.processOpinionList==''||!fromdata.processOpinionList" disabled></el-input>
                    <opinionText
                      :opinionText="fromdata.processOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
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
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :dialogTypeNow="dialogTypeNow"
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
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft"; 
import opinionText from "@/components/opinionText/index";
import isNowUser from "@/minixs/isNowUser";

export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    opinionText
  },
  mixins: [viewDraft,isNowUser],
  data() {
    return {
      readonlySwcy:true,
      // xbstart
      shdialog1:false,
      shDataDR:[],
      checkNames:[],
      checkIdNames:[],
      checkpcyNames:[],
      checkedsh: [], //收回列表
      titleTypeForDr:'',
      // xbend
      state:this.$route.query.state||'',
      uploadConfig1: {
        id: '',
        url: 'uploadFiles',
        code: '',
        filesHas: []
      },
      uploadConfig: {
        id: '',
        url: 'uploadFiles',
        code: '',
        filesHas: []
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: 'deleteFileById',
        id: ''
      },
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
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
        function: "finishAndSendQHXBCB",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        curNodeId: "",
        pcsAvyId: "",
        tplNo: "",
        multiTenancyId: ""
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        pcsAvyId: "",
        curNodeId: "",
        tplNo: "",
        multiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "selectReceiveXBById",
        id: "",
        tiaoguo: this.$route.query.tiaoguo||'',
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
      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      readFlag: "",
      fromdata: {
        attachSort: [],
        receiveDocFileList: [],
        helpFileList: [],
        receiveVersion: "",
        curNodeCode: "",
        handleTerminateOpinionList: [],
        helpOrgOpinionList: [],
        officeOpinionList: [],
        pishiOpinionList: [],
        undertakeOrgOpinionList: [],
        processOpinion: "",
        finalOpinion: "",
        documentClassName: "",
        curNodeName: "",
        attachTitle: "",
        businessType: "",
        canNotShouHuiIds: "",
        undertakeOrgOpinion: "",
        security: "",
        copy: "",
        copyIds: "",
        currentUser: "",
        documentCode: "",
        draftOrgan: "",
        completeTime: "",
        draftUser: "",
        draftUserId: "",
        emergencyLevel: "",
        inline: "",
        inlineIds: "",
        isArtificial: "",
        isCanDelete: "",
        isClear: "",
        isDirect: "",
        isHasdocumentCode: "",
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
        fromWhere: "",
        mainIds: "",
        meetingEndTime: "",
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
        secretLimitName: "",
        secretTimeType: "",
        secretTypeName: "",
        secretType: "",
        secrerFlagType: "",
        secretLimitType: "",
        sendBasis: "",
        receiveTime: "",
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
        eleSendSecretType: "",
        sendOrgName: "",
      },
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      sendType: [],
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
      rules: {
        type: [
          {
            required: true,
            trigger: "change",
            message: "请选择发文类型"
          }
        ],
        redHead: [
          {
            required: true,
            trigger: "change",
            message: "请选择代字/红头"
          }
        ],
        businessType: [
          {
            required: true,
            trigger: "change",
            message: "请选择业务分类"
          }
        ],
        textType: [
          {required: true, trigger: "change", message: "请选择文种"}
        ],
        secretTypeName: [
          {required: true, trigger: "change", message: "秘密类型"}
        ],
        draftOrgan: [
          {required: true, trigger: "blur", message: "请输入主办部门"}
        ],
        userRange: [
          {required: true, trigger: "change", message: "请选择档案利用范围"}
        ],
        isStandardFile: [
          {
            required: true,
            trigger: "change",
            message: "请选择规章/规范性文件"
          }
        ],
        phone: [{required: true, trigger: "blur", message: "请输入联系电话"}],
        isDirect: [
          {required: true, trigger: "change", message: "请选择直发文件"}
        ],
        title: [{required: true, trigger: "blur", message: "请输入正文标题"}],
        main: [{required: true, trigger: "change", message: "请选择主送"}],
        name: [
          {required: true, message: "请输入标题名称", trigger: "blur"},
          {min: 3, max: 5, message: "3-5个字", trigger: "blur"}
        ],
        secretLimitName: [
          {
            required: true,
            trigger: "change",
            message: "请选择秘密期限类型"
          }
        ],
        workSecretFlag: [
          {
            required: true,
            trigger: "change",
            message: "请选择秘密标志"
          }
        ],
        secretFlagType: [
          {
            required: true,
            trigger: "change",
            message: "请选择秘密标志"
          }
        ]
      },
      showCy: true,
      imageUrl: "",
      allowBack: "",
      fileList: [],
      tableData: [],
      emergencyLevel: '',
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
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      dialogTypeNow: '',//当前弹窗类型
      swglCode: this.$businessCode.swgl,
      swglggCode: this.$businessCode.swglgg,
      ggjyCode: this.$businessCode.ggywgn,
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      clickSaveAndSend: false //点击完成并发送标示
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function () {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    //收回协办人
    shxbr(type){
      this.checkedsh = [];
      this.shdialog1 = true;
      let parms;
      //let fun=''
      if(type=='cb'){
        this.titleTypeForDr = '催办操作';
        //fun="selectTakeBackManyAssistUser";
        parms = {
          function: "selectTakeBackManyAssistUser",
          id: this.fromdata.id,
          isMutil: this.fromdata.isMutil,
          type:'cuiban'
        };
      }else{
        //fun="selectTakeBackManyAssistUser";
        this.titleTypeForDr = '收回操作';
        parms = {
          function: "selectTakeBackManyAssistUser",
          id: this.fromdata.id,
          isMutil: this.fromdata.isMutil
        };
      }
      this.$post
        .postData(
          "selectTakeBackManyAssistUser",
          JSON.stringify(parms),
          this.swglggCode
        )
        .then(res => {
          if (res && res.success) {
            this.shDataDR = res.data;
            this.$forceUpdate();
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    getNewName(value) {
      let a = value;
      this.checkNames = [];
      this.checkIdNames = [];
      this.checkpcyNames = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < this.shDataDR.length; j++) {
          if (this.shDataDR[j].id == a[i]) {
            if(this.checkNames.indexOf(this.shDataDR[j].curUser)==-1)this.checkNames.push(this.shDataDR[j].curUser);
            if(this.checkIdNames.indexOf(this.shDataDR[j].id)==-1)this.checkIdNames.push(this.shDataDR[j].id);
            if(this.checkpcyNames.indexOf(this.shDataDR[j].pcsAvyId)==-1)this.checkpcyNames.push(this.shDataDR[j].pcsAvyId);
          }
        }
      }
    },
    shQDRueding(){
      if(this.checkNames.length<1){
        this.$message({
          message: '请选择数据',
          type: "error"
        });
        return
      }
      if(this.titleTypeForDr == '催办操作'){
        let parms = {
            function: "cuibanManyAssist",
            ids: this.checkIdNames.length>1?this.checkIdNames.join(';'):this.checkIdNames[0],
            humanNames: this.checkNames.length>1?this.checkNames.join(';'):this.checkNames[0],
            pcsAvyIds: this.fromdata.pcsAvyIds
          };
          this.$post
          .postData(
            "cuibanManyAssist",
            JSON.stringify(parms),
            this.swglggCode
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                message: '催办成功',
                type: "success"
              });
              this.checkNames = [];
              this.checkIdNames = [];
              this.checkpcyNames = [];
              this.shdialog1 = false;
              this.$forceUpdate();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
        });
      }else{
        let parms = {
            function: "takeBackByMainManyAssist",
            id:this.fromdata.id,
            ids: this.checkIdNames.length>1?this.checkIdNames.join(';'):this.checkIdNames[0],
            humanNames: this.checkNames.length>1?this.checkNames.join(';'):this.checkNames[0],
            pcsAvyIds: this.checkpcyNames.length>1?this.checkpcyNames.join(';'):this.checkpcyNames[0],
            mainDocId:this.fromdata.mainDocId,
          };
          this.$post
          .postData(
            "takeBackByMainManyAssist",
            JSON.stringify(parms),
            this.swglggCode
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                message: '收回成功',
                type: "success"
              });
              this.shdialog1 = false;
              window.opener.location.reload();
              if(this.shDataDR.length>this.checkpcyNames.length){
                this.checkNames = [];
                this.checkIdNames = [];
                this.checkpcyNames = [];
                this.toEdit();
              }else{
                this.checkNames = [];
                this.checkIdNames = [];
                this.checkpcyNames = [];
                setTimeout(()=>{
                  window.close();
                },1000)
              }
              this.$forceUpdate();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
        });
      }
      
    },
    needClear(){
      this.shdialog1 = false;
      this.checkNames = [];
      this.checkIdNames = [];
      this.checkpcyNames = [];
    },
    //收回
    blsh() {
      this.$post
        .postData("withdrawSubTask", JSON.stringify(
          {
            function: "withdrawSubTask",
            pcsAvyId: this.fromdata.pcsAvyId,
            multiTenancyId: this.fromdata.multiTenancyId
          }
        ), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
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
            message: "收回失败" + erro.message,
            duration: 1000
          });
        });
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
    secretTypechange(value) {
      if (value == "商业秘密") {
        this.flag = true;
        this.secretflag = true;
        this.secretTypeflag = false;
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitName = "";
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitName = "";
      } else {
        this.flag = false;
        this.secretflag = false;
        this.secretTypeflag = false;
      }
    },
    //处理回显秘密类型
    secretTypeBackvalue(value) {
      if (value == "商业秘密") {
        this.flag = true;
        this.secretflag = true;
        this.secretTypeflag = false;
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
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
    showCompDialog(data, status, type, params, dtype) {
      console.log(1046, type)
      let that = this;
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
          names = names.join(";");
          this.transIds = ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "chen":
            this.fromdata.undertakeDeptName = names;
            this.fromdata.undertakeDeptId = ids;
            this.chenCheckData = this.checkData;
            break;
          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
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
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      this.bank_doSend.id = this.bank_doSend.id
        ? this.bank_doSend.id
        : sessionStorage.getItem("pageRsid") || "";
      let params = Object.assign(this.bank_doSend, this.fromdata);
      this.$post
        .postData("finishAndSendQHXBCB", JSON.stringify(params), this.swglggCode)
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
    //点击 选择协办弹窗弹出
    completeSending() {
      console.log(this.bank_selectConfig)
      this.preserve();
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
          this.swglCode
        )
        .then(res => {
          console.log(res);
          this.seletOptionsData = res.data || [];
          // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          this.$post
            .postData("selWfNode", JSON.stringify(this.bank_send), this.swglggCode)
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


    // 下拉列表
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.swglCode
        )
        .then(res => {
          console.log(res.data);
          // this.sendType = JSON.parse(res.data.sendType);
          this.emergencyLevel = JSON.parse(res.data.emergencyLevel);
          this.businessType = JSON.parse(res.data.businessType);
          this.textType = JSON.parse(res.data.textType);
          this.secretType = JSON.parse(res.data.eleSendSecretType);
          this.secretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          this.secretFlagType = JSON.parse(res.data.secretFlag);
          this.SdirectRange = JSON.parse(res.data.directSendRange);
          this.SdirectType = JSON.parse(res.data.directSendType);
          this.SkeepLimit = JSON.parse(res.data.eleSendSecretLimit);
          this.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    commit() {
      let bank_commit = {function: "doFinishHQXBCB"}
      var obj = Object.assign(bank_commit, this.fromdata);
      this.$post
        .postData(
          "doFinishHQXBCB",
          JSON.stringify(obj),
          this.swglggCode
        ).then(res => {
        if (res && res.success) {
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "发送成功",
            duration: 500,
          });
          setTimeout(() => {
            window.location.href = "about:blank";
            window.close();
          }, 1000)

        }
      }).catch(err => {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: err.message,
          duration: 1000
        });
        return false;
      })
    },
    getDataOne() {
      this.$post
        .postData(
          "selectReceiveXBById",
          JSON.stringify(this.bank_dispach),
          this.swglCode
        )
        .then(res => {
          this.getIsNowUser(res);
          //已上传的文件
          this.fromdata = Object.assign(this.fromdata, res.data);
          if (this.fromdata.isDirect == "1") {
            this.fromdata.isDirect = "1";
          } else if (this.fromdata.isDirect == "0") {
            this.fromdata.isDirect = "0";
          }
          if (this.fromdata.isForword == "1") {
            this.fromdata.isForword = "1";
          } else if (this.fromdata.isForword == "0") {
            this.fromdata.isForword = "0";
          }
          this.bank_send.pcsAvyId = res.data.pcsAvyId;
          this.bank_send.tplNo = res.data.tplNo;
          this.bank_send.multiTenancyId = res.data.multiTenancyId;
          this.bank_send.curNodeId = res.data.curNodeCode;

          this.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;
          this.bank_selectConfig.tplNo = res.data.tplNo;
          this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId
          this.bank_selectConfig.curNodeId = res.data.curNodeCode


          this.secretTypeBackvalue(res.data.secretTypeName || "商业秘密");
          //处理会签 、主送、抄送、本行发送
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
          } else {
            this.huiCheckData = [];
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
          //收回测试
          this.$post
            .postData(
              "checkTakeBack",
              JSON.stringify({function: "checkTakeBack", processInstId: this.fromdata.processInstId}),
              this.swglggCode
            )
            .then(res => {
              this.allowBack = res.allowBack;
            });
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 1000
          });
        });
    },
    getDataTwo() {
      this.$post
        .postData(
          "selectAttachmentListXb",
          JSON.stringify({
            function: "selectAttachmentListXb",
            id: this.bank_dispach.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.uploadConfig1.filesHas = this.fromdata.receiveDocFileList;
            this.uploadConfig.filesHas = this.fromdata.helpFileList;
            this.fromdata.attachSort = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataThree() {
      this.$post
        .postData(
          "selectOpinionListXb",
          JSON.stringify({
            function: "selectOpinionListXb",
            id: this.bank_dispach.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            if (res.data.circulateOpinionList) {
              for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                if (res.data.circulateOpinionList[i].content != '') {
                  this.showCy = false;
                }
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //初始值 //input框内容
    toEdit() {
      this.uploadConfig.id = this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageRsid") || "";
      this.uploadConfig.id = this.uploadConfig1.id;
      this.getDataOne();
      this.getDataTwo();
      this.getDataThree();
    },
    isCanGetBack() {
      //收回测试
      this.$post
        .postData(
          "checkTakeBack",
          JSON.stringify({function: "checkTakeBack", processInstId: this.fromdata.processInstId}),
          this.swglggCode
        )
        .then(res => {
          this.allowBack = res.allowBack;
        });
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.swglCode
        )
        .then(res => {
          if (res.data) {
            this.SredHead = res.data;
          }
        });
    },
    shoucang(){
      this.$confirm('您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obj={
            function:'collection',
            id: this.fromdata.id,//数据id
            processInstId:this.fromdata.processInstId,
            flag:'xb',   //er 电子收文  cy 传阅  swcb 实物承办  swsw 实物收文 xb 协办
            documentCode: this.fromdata.documentCode,  //文号
            curNodeCode: this.fromdata.curNodeCode,   //当前环节编号
            documentTitle:this.fromdata.title  //正文标题
          };
          this.$post
            .postData(
              "collection",
              JSON.stringify(obj),
              this.swglCode
            )
            .then(res => {
              if (res.data && res.data.downloadUrl) {
                let file={
                  function: "doDownloadFile",
                  filePath:res.data.downloadUrl,
                  fileName:res.data.fileName
                }
                this.$post
                  .postData("doDownloadFile", JSON.stringify(file), this.$businessCode.nowjts)
                  .then(res1 => {
                    if (res1) {
                      if (res1 && res1.success) {
                        downLoadFileReName(
                          (this.$post.getEnvState()
                            ? location.origin
                            : "http://localhost:8080") +
                          "/ecpweb/getLocalFile.action?relativePath=" +
                          res1.filePath +
                          "&fileName=" +
                          res1.fileName,
                          res.data.fileName
                        );
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
              }
            });
        })
        .catch(() => {

        });
    },
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "SWGL"
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
                    flowTranId: this.$businessCode.swgl,
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
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    //请求文件路径
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = {state: false};
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
          self.$businessCode.swglfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    //正文跳转
    doDraft(fileInfo,saveName) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id: this.fromdata.id,
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.swglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '',
          showBtns: false,
          flowTranId: this.$businessCode.swgl,    //流程交易线     chai
          processInstId:this.fromdata.processInstId,
          saveSpecialFileName:saveName
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
        .postData("doDownloadFile", JSON.stringify(this.bank_doDownloadFile), this.$businessCode.swglfj)
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName, file.fileName);
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
    // 代字/红头  下拉 发文字号获取值
    selectredhead(redHeadITEM) {
      this.fromdata.documentCode = redHeadITEM;
    },
    // 保存
    preserve(type) {
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

      if (scrolled < this.distance_fsdx) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_fsdx &&
        scrolled < this.distance_qpyj - 180
      ) {
        this.active = "#fsdx";
      } else if (
        scrolled >= this.distance_qpyj - 200 &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    // 关闭
    handelclose() {
      window.location.href = "about:blank";
      window.close();
    },

    // 删除此文
    delectArticle() {
      this.bank_dispach.id = localStorage.getItem("pageRsid") || "";
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      console.log(
        this.bank_dispach.id,
        this.$route.query.id,
        deletesendorderid
      );
      this.bank_DeleteSendOrder.id = deletesendorderid;

      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.bank_dispach.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else {
            this.$post
              .postData(
                "doDeleteSendOrder",
                JSON.stringify(this.bank_DeleteSendOrder),
                this.swglCode
              )
              .then(res => {
                this.$message({
                  type: "success",
                  offset: 400,
                  showClose: true,
                  message: "删除成功!"
                });
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              });
          }
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
    // 收藏
    collect() {

    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      console.log(this.fromdata.processInstId);
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.swglggCode
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
    processSheet(path) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: this.fromdata.id,
          type:'2',//1:待办；2已办，办结
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 操作指南
    instructions() {

    },
    handleSave() {
    },
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
          this.fromdata.processOpinion = this.fromdata.processOpinion
            ? this.fromdata.processOpinion + data
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
          this.swglCode
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
    cuibanClick(){
      this.$post
        .postData(
          "cuibanXC",
          JSON.stringify({
            function:"cuibanXC",
            multiTenancyId:this.fromdata.multiTenancyId,
            processInstId:this.fromdata.processInstId,
            modualType:"xieban",
            dataTypeXC:"sw_xb"
          }),
          this.$businessCode.swglgg
        )
        .then(res => {
            if(res.success){
              this.$message({
                type:'success',
                message:'催办成功'
              })
           }else{
             this.$message({
                type:'error',
                message:res.message
              })
           }
        });
    },
  },
  created() {
    //初始化加载数据
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig1.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.$businessCode.swgl; //chai
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag : "";
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.uploadConfig.flowTranId = this.swglgg;  //完成并发送 树 流程交易线   chai
    this.readonlySwcy = this.$route.query.tiaoguo ? false : true;
    this.toEdit();
    // this.getSendOrderDicByParam();
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
        height: auto;
        min-height: 40px;
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

/deep/ .hqbm .el-textarea__inner {
  color: red !important;
  height: 40px !important;
  min-height: 40px !important;
}

/deep/ .hqbm1 .el-textarea__inner {
  height: 40px !important;
  min-height: 40px !important;
}

.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}

.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
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

/deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
}

.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  padding: 0 10px;
}

.disable_w {
  width: 100%;
}

.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 0px 0 0 130px;
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
    color: #3b85ef
  }
}

.bluecolor {
  /deep/ .el-textarea__inner {
    color: blue !important;
    font-weight: 600 !important;
    font-size: 16px;
  }
}
</style>
