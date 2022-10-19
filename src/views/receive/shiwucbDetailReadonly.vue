<template>
  <div id="shiwucbDetailReadonly" class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
                     v-if="fromdata.filePath">查看正文
          </el-button>
          <el-button size="small" plain v-if="state == 2" @click="cuibanClick" v-show="readonlySwcy">催办</el-button>
          <el-button size="small" plain @click="blsh"
                     v-if="fromdata.curNodeCode!=800&&this.readFlag !=1 &&allowBack==true" v-show="readonlySwcy">收回
          </el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet('/swcbd')">打印处理单</el-button>
          <el-button size="small" plain @click="caozuozhinan" v-show="readonlySwcy">操作指南</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <!-- 收回弹窗 -->
    <el-dialog
      title="收回"
      :visible.sync="shdialog"
      width="50%"
    >
      <el-card>
        <el-checkbox-group v-model="checkedsh">
          <el-checkbox v-for="(item,index) in shData" :label="item.processInstId" :key="index"
                       :disabled="item.curNodeCode == 800">{{ item.deptName }}<span
            v-if="item.curNodeCode == 800">(已办结)</span></el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog = false">取 消</el-button>
        <el-button type="primary" @click="shQueding">确 定</el-button>
      </span>
    </el-dialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行实物收文承办单</h3>
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
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批对象</a>

        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            ref="fromdata"
            label-width="130px"
            :model="fromdata"
            :rules="rules"
            class="demo_ruleForm"
          >
            <div class="bank_dispach_annotation">
              <el-row>
                <el-col :span="16" style="display:flex">
                  <p class="bank_dispach_annotation_current">
                    当前环节：
                    <span>{{ curNodeName }}</span>
                  </p>
                  <p v-if="fromdata.curNodeCode!=800" class="bank_dispach_annotation_current">
                    当前处理人：
                    <span>{{ curUser }}</span>
                  </p>
                </el-col>
              </el-row>
            </div>
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input placeholder="正文标题" disabled v-model="fromdata.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题" prop="attachmentTitle" ref="attachmentTitle">
                    <!-- <el-input type="textarea" autosize resize="none" disabled v-model="fromdata.attachmentTitle"></el-input> -->
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
                  <el-form-item label="收文日期" prop="receiveTime" ref="receiveTime">
                    <el-date-picker
                      v-model="fromdata.receiveTime"
                      type="date"
                      disabled
                      placeholder="选择日期"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" prop="emergencyName" ref="emergencyName">
                    <el-select
                      v-model="fromdata.emergencyName"
                      placeholder="请选择"
                      disabled
                      style="width:100%"
                    >
                      <el-option
                        v-for="item in selectContents.emergency_level"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文字号" prop="documentCode" ref="documentCode">
                    <el-input disabled v-model="fromdata.documentCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      disabled
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      @change="selectType"
                      style="width:100%"
                    >
                      <el-option
                        v-for="item in selectContents.secret_type"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-col :span="10">
                    <el-form-item label="密级和保密期限" ref="secretFlagType" prop="secretFlagType" :span="8">
                      <el-select
                        v-model="fromdata.secretFlagType"
                        disabled
                        placeholder="请选择"
                        style="width:100%"
                        @change="selectMiHandler"
                      >
                        <el-option
                          v-for="item in selectMicontent"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" class="linecenter">
                    <el-form-item label="/" label-width="20px" prop="secretLimitType" ref="secretLimitType">
                      <el-select disabled v-model="fromdata.secretLimitType" placeholder="请选择">
                        <el-option
                          v-for="item in selectContents.secret_time_type"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="来文单位" prop="sendOrgName" ref="sendOrgName">
                    <el-input
                      v-model="fromdata.sendOrgName"
                      :title="fromdata.sendOrgName"
                      placeholder="请选择来文单位"
                      disabled
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期" prop="completeTime" ref="completeTime">
                    <el-date-picker
                      v-model="fromdata.completeTime"
                      type="date"
                      disabled
                      placeholder="选择日期"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实物收文类型" prop="receiveType" ref="receiveType">
                    <el-select disabled v-model="fromdata.receiveType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in selectContents.receive_type"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记人" prop="userName" ref="userName">
                    <el-input disabled v-model="fromdata.userName"></el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="转发文件" prop="isForword" ref="isForword">
                    <el-radio disabled v-model="fromdata.isForword" @change="directchange" label="1">是</el-radio>
                    <el-radio disabled v-model="fromdata.isForword" @change="directchange" label="0">否</el-radio>
                  </el-form-item>
                </el-col>


                <el-col>
                  <el-form-item
                    label="转发要求"
                    prop
                    ref="forwordRequirements"
                    v-show="fromdata.isForword *1"
                  >
                    <el-input
                      type="textarea"
                      placeholder="填写附件"
                      resize="none"
                      autosize
                      disabled
                      v-model="fromdata.forwordRequirements"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                    <el-radio disabled v-model="fromdata.isDirect" @change="directchange" :label="1">是</el-radio>
                    <el-radio disabled v-model="fromdata.isDirect" @change="directchange" :label="0">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="直发范围"
                    prop="directRange"
                    ref="directRange"
                    v-show="fromdata.isDirect*1"
                  >
                    <el-select disabled v-model="fromdata.directRange" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in selectContents.direct_send_range"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="直发文种类"
                    prop="directType"
                    ref="directType"
                    v-show="fromdata.isDirect*1"
                  >
                    <el-select disabled v-model="fromdata.directType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in selectContents.direct_send_type"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
<!--                <el-col>
                  <el-form-item label="发送对象">
                    <el-input
                      v-model="fromdata.sendSubName"
                      placeholder="请选择发送对象"
                      style="width: 100%;"
                      disabled
                    >
                      <el-button slot="append" icon="el-icon-plus" @click="getTreeData('fasong')"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>-->
                <!-- <el-col>
                  <el-form-item label="保管期限" prop="keepingLimitName" ref="keepingLimitName">
                      <el-select disabled v-model="fromdata.keepingLimitName" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="keep_limititem in keep_limit"
                          :key="keep_limititem.value"
                          :label="keep_limititem.value"
                          :value="keep_limititem.value"
                        ></el-option>
                      </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col v-if="fromdata.fromWhere == '实物收文'">
                  <el-form-item label="承办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                    <el-input
                      v-model="fromdata.undertakeDeptName" :title="fromdata.undertakeDeptName"
                      style="width: 100%;"
                      disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col v-else>
                  <el-form-item label="主办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                    <el-input
                      v-model="fromdata.undertakeDeptName" :title="fromdata.undertakeDeptName"
                      style="width: 100%;"
                      disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="协办部门">
                    <el-input
                      v-model="fromdata.assistDeptName" :title="fromdata.assistDeptName"
                      placeholder="请选择协办部门"
                      disabled
                      style="width: 100%;"
                    >

                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->

            <el-row class="pr45">
              <el-row>
                <el-col>
                  <h6 class="bank_dispach_file_tit">签批意见</h6>
                  <div id="qpyj" class="height_90"></div>
                </el-col>
              </el-row>

              <el-col>
                <el-form-item label="批示意见">
                  <el-input type="textarea" resize="none"
                            autosize v-if="fromdata.pishiOpinionList==''||!fromdata.pishiOpinionList"
                            disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.pishiOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="办公室批办意见">
                  <el-input type="textarea"
                            resize="none"
                            autosize v-if="fromdata.officeOpinionList==''||!fromdata.officeOpinionList"
                            disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.officeOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="承办部门办理情况">
                  <div v-if="!(fromdata.undertakeOrgOpinionList && fromdata.undertakeOrgOpinionList.length>0)">
                    <el-input type="textarea" resize="none" autosize disabled></el-input>
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
                <el-form-item label="传阅意见">
                  <el-input type="textarea" resize="none"
                            v-if="!(fromdata.circulateOpinionList && fromdata.circulateOpinionList.length>0)" autosize
                            disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.circulateOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :isCy="true"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="办结情况">
                  <el-input type="textarea" resize="none"
                            autosize
                            v-if="fromdata.handleTerminateOpinionList==''||!fromdata.handleTerminateOpinionList"
                            disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.handleTerminateOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="备    注">
                  <el-input type="textarea" resize="none"
                            autosize v-if="fromdata.remarksList==''||!fromdata.remarksList" disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.remarksList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                    :isRemarks="true"
                  ></opinionText>
                </el-form-item>
              </el-col>

            </el-row>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row class="pr45">
              <el-col>
                <div class="file_list_box" v-if="fromdata.receiveDocFileList&&fromdata.receiveDocFileList.length">
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
              <el-col v-if="fromdata.undertakeFileList&&fromdata.undertakeFileList.length">
                <el-form-item label="反馈附件">
                </el-form-item>
                <div class="file_list_box">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.undertakeFileList" :key="item.id" class="comp_list">
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
            <el-row class="pr45">
              <el-col>
                <el-form-item label="最终意见">
                  <template v-if="fromdata.curNodeCode==800">
                    <opinionText
                      :opinionText="fromdata.finalOpinionList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </template>
                  <el-input type="textarea" resize="none"
                            autosize v-model="fromdata.finalOpinion"
                            v-if="fromdata.finalOpinionList==''||!fromdata.finalOpinionList||fromdata.curNodeCode!=800"
                            disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="过程意见">
                  <el-input type="textarea" resize="none"
                            autosize v-if="fromdata.processOpinionList==''||!fromdata.processOpinionList"
                            disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.processOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <!-- 期限鉴定表 -->
    <el-dialog title="期限鉴定表" :visible.sync="dialogVisible" width="50%">
      <m-table
        size="medium"
        :isSelection="false"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        :highlightcurrentrow="true"
        @handleTableCurrentChange="handleCurrentChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :page-sizes="[10,15,20,25,30]"
      ></m-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import appendWriteList from "../../components/appendWriteList/appendWriteList";
import mTable from "components/table/mTable.vue";
import timeDialog from "@/components/timedialog/timedialog";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
import opinionText from "@/components/opinionText/index";
import isNowUser from "@/minixs/isNowUser";

const tableCol = [
  {label: "选择条目", prop: "mark", align: "center"},
  {label: "自动鉴定期限", prop: "limitDate", align: "center"}
];

import http from "@/http/http";

export default {
  name: "ReceiveDispatch",
  components: {
    appendWriteList,
    mTable,
    timeDialog,
    opinionText,
  },
  data() {
    return {
      readonlySwcy:true,
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
      showduban: true,
      shData: [],//收回数据
      checkedsh: [],//收回列表
      shdialog: false,//收回弹窗
      fasongCheckData: [],//fasong
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize: 10
      },
      //tree
      dialogVisibleTree: false,
      treeData: [],
      defaultProps: {
        children: [],
        label: "name",
        isLeaf: "leaf"
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: true
      },
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      deleteIds: "",
      checkedArr: [],
      tableCols: tableCol,
      curNodeName: "",
      referForm: {
        function: "selectQXHDBPage",
        page: 1,
        limit: 10
      },
      timeShow: false, //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      getJDBDropDownDataSource: {
        function: "getJDBDropDownDataSource"
      },
      //办结
      banjie_fn: {
        function: "doFinish",
        moduleType: "receive_doc_sw"
      },
      //实物收文下拉数据源
      getReceiveDropDownDataSource: {
        function: "getReceiveDropDownDataSource"
      },
      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      //承办部门树
      bank_send: {
        function: "selWfNode",
        pcsAvyId: ""
        // curTplNo: "testOA7ID"
        // curMultiTenancyId: "CN000"
      },
      //确定完成并发送
      bank_doSend: {
        function: "finishAndSendQHXBCB",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        undertake: ""
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: ""
      },
      bank_sendXb: {
        function: 'createHelpSubWf',
        processInstId: '',
        multiTenancyId: '',
        pcsAvyId: '',
        tplNo: '',
        moduleType: 'receive_doc_sw',
        curNodeCode: '',
        deptIds: '',
        deptNames: '',
        id: ''
      },
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      curUser: "",
      curNode: "",
      clickTypes: "",
      readFlag: "",
      appendWriteDialog: true,
      swglCode: this.$businessCode.swgl,
      swglggCode: this.$businessCode.swglgg,
      ggjyCode: this.$businessCode.ggywgn,
      receiveselect: {
        function: "selectByIdCB",
        id: '',
        tiaoguo: this.$route.query.tiaoguo||'',
      },
      saveOrUpdateSW: {
        function: "saveOrUpdateCB",
        id: ''
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      //直发文件是否
      directFlag: false,
      fromdata: {
        attachSort: [],
        receiveDocFileList: [],
        undertakeFileList: [],
        receiveVersion: "",
        curNodeCode: "",
        keepLimitName: "",//办理期限
        progress: "", //办理进度
        daysInAdvance: "",// 提前提醒天数
        superviserName: "",//督办人
        superviseDate: "",//督办日期
        direct_send_range: "", //直发范围
        keep_limit: "", //保管期限
        secret_flag_type: "", //秘密标志类型
        undertakeDeptName: "",
        processInstId: "", //流程实例标识
        processOpinion: "",
        finalOpinion: "",
        tplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        pishiOpinion: "", //批示意见
        isDirect: 0, // 是否直发
        forwordRequirements: "",
        // processOpinionList:[],
        // finalOpinionList:[],
        isForword: "0", //转发文件
        title: "",
        sendSubId: "",//发送对象id
        sendSubName: "",//发送对象名称
        attachmentTitle: "",
        receiveTime: "",
        emergencyName: "",
        documentCode: "",
        secretType: "",
        secretFlagType: "",
        secretLimitType: "",
        sendOrgName: "",
        completeTime: "",
        receiveType: "",
        userName: "",
        directRange: "",
        directType: "",
        limitDate: "",
        undertake: "",
        processOpinionList: "",
        helpOrgOpinionList: "",
        pishiOpinionList: "",
        deptId: "",
        finalOpinionList: "",
        undertakeOrgOpinionList: "",
      },
      showCy: true,
      allowBack: "",
      selectContents: {
        business_secret_flag_type: "", //商业秘籍
        country_secret_flag_type: "", //国家密级
        direct_send_type: "", //直发文种类
        emergency_level: "", //紧急程度
        receive_type: "",
        secret_time_type: "", //保密期限类型
        secret_type: "" //秘密类型
      },
      transIds: '',
      rules: {},
      copyRules: {},
      sendIds: [],
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      selectMicontent: [], //密级数据下拉框
      keep_limit: ""
    };
  },
  mixins: [viewDraft,isNowUser],
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
            flag:'swcb',   //er 电子收文  cy 传阅  swcb 实物承办  swsw 实物收文 xb 协办
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
    //收回
    blsh() {
      this.$post
        .postData("withdrawSubTask", JSON.stringify(
          {
            function: "withdrawSubTask",
            pcsAvyId: this.fromdata.pcsAvyId,
            multiTenancyId: this.fromdata.multiTenancyId,
            undertake: ""
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
    //发送
    fasongBtn() {
    },
    getBack() {
    },

    //tree 2020 8 18
    handleSaveTree() {
    },
    loadNode(node, resolve) {
    },
    // 组织树操作
    handleNodeClick(data) {
    },
    handleLoadTree(obj, resolve) {
    },
    // 初始化列表及分页
    handleLoadData() {
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
          name: names[n]
        });
      });
      return obj;
    },
    //拼接数据
    concatAttrData(name, data) {
      this.fromdata[name] = this.fromdata[name]
        ? this.fromdata[name] + data
        : data;
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
    //定密依据弹窗弹出
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //切换秘密类型
    selectType(type) {
      if (type.trim() === "商业秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.country_secret_flag_type
        );
      } else if (type.trim() === "国家秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.business_secret_flag_type
        );
      }
      this.fromdata.secretFlagType = "";
    },
    selectMiHandler(val) {
      this.fromdata.secretFlagType = val;
      this.$forceUpdate();
    },
    directchange(val) {
      if (this.fromdata.isDirect == 1) {
        this.fromdata.isDirect = 1;
      } else if (this.fromdata.isDirect == 0) {
        this.fromdata.isDirect = 0;
        this.fromdata.directRange = "";
        this.fromdata.directType = "";
      }
      if (this.fromdata.isForword == "1") {
        this.fromdata.isForword = "1";
      } else if (this.fromdata.isForword == "0") {
        this.fromdata.isForword = "0";
        this.fromdata.forwordRequirements = "";
      }
    },
    qixianjd() {
      this.dialogVisible = true;
      this.$post
        .postData(
          "selectQXHDBPage",
          JSON.stringify(this.referForm),
          this.swglCode
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.referForm.page = res.data.page;
          this.pagination.total = res.data.total;
        });
    },
    //收回t
    takeBackSign() {
      this.shdialog = true;
      const parms = {
        function: "takeBackSignHelp",
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
      };
      this.$post
        .postData(
          "takeBackSignHelp",
          JSON.stringify(parms),
          this.swglggCode
        ).then(res => {
        if (res && res.success) {
          this.shData = res.data.rows;
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })


    },
    //收回确定按钮
    shQueding() {
      let checkboxdata = this.checkedsh.join(";")
      let shform = {
        function: "takeBackSignHelp",
        pcsAvyId: this.fromdata.pcsAvyId,
        multiTenancyId: this.fromdata.multiTenancyId,
        subProcessInstId: checkboxdata,
        id: this.receiveselect.id
      };
      this.$post
        .postData("takeBackSignHelp", JSON.stringify(shform), this.swglCode)
        .then(res => {
          if (res && res.success) {
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1000
              });
              this.shdialog = false;
            }
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败",
            duration: 1000
          });
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
    async getFileInfo(self, flagFile) {
      var successInfo = {state: false};
      var handbook = flagFile ? self.$businessCode.fwbzfj : self.$businessCode.swglfj;
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
              duration: 1500
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
            duration: 1500
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
    handleCurrentChange(val) {
      // this.checkedArr = []
      // if (val.length>1) {

      //   this.checkedArr = val[0].limitDate;
      //   this.fromdata.limitDate = this.checkedArr;
      // } else {
      //   this.checkedArr = []
      // }
      console.log(val);
      this.checkedArr = val.limitDate;
      this.fromdata.limitDate = this.checkedArr;
      console.log(this.checkedArr);
    },
    handleSave() {
      this.dialogVisible = false;
    },
    // 打印处理单
    processSheet(path, id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: this.fromdata.id,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    getDataOne() {
      this.$post
        .postData(
          "selectByIdCB",
          JSON.stringify(this.receiveselect),
          this.swglCode
        )
        .then(res => {
          if (res.data) {
            this.getIsNowUser(res);
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.curUser = res.data.curUser;
            this.curNodeName = res.data.curNodeName;
            this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
            this.bank_selectConfig.tplNo = res.data.tplNo;
            this.bank_selectConfig.curNodeId = res.data.curNodeCode;
            this.bank_sendXb.processInstId = res.data.processInstId;
            this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
            this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
            this.bank_sendXb.tplNo = res.data.tplNo;
            this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
            this.bank_sendXb.curNodeCode = res.data.curNodeCode;
            this.bank_sendXb.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            //督办字段
            this.limitDate = res.data.limitDate;
            this.progress = res.data.progress;
            this.daysInAdvance = res.data.daysInAdvance;
            this.superviserName = res.data.superviserName;
            this.superviseDate = res.data.superviseDate;

            if (this.fromdata.isDirect == 1) {
              this.fromdata.isDirect = 1;
            } else if (this.fromdata.isDirect == 0) {
              this.fromdata.isDirect = 0;
            }
            if (this.fromdata.isForword == "1") {
              this.fromdata.isForword = "1";
            } else if (this.fromdata.isForword == "0") {
              this.fromdata.isForword = "0";
            }

            if (res.data.undertakeDeptId) {
              this.chenCheckData = this.concatTreeData(
                res.data.undertakeDeptId,
                res.data.undertakeDeptName,
                "dosend"
              );
            } else {
              this.chenCheckData = [];
            }
            if (res.data.assistDeptId) {
              this.transIds = res.data.assistDeptId
              console.log(this.transIds);

              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
            } else {
              this.xieCheckData = [];
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
          }
        });
    },
    getDataTwo() {
      this.$post
        .postData(
          "selectAttachmentListCb",
          JSON.stringify({
            function: "selectAttachmentListCb",
            id: this.receiveselect.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            //已上传的文件
            this.uploadConfig1.filesHas = this.fromdata.receiveDocFileList;
            this.uploadConfig.filesHas = this.fromdata.undertakeFileList;
            this.fromdata.attachSort = [];
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
    getDataThree() {
      this.$post
        .postData(
          "selectOpinionListCb",
          JSON.stringify({
            function: "selectOpinionListCb",
            id: this.receiveselect.id,
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
    receiveselectlist() {
      this.uploadConfig.id = this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWidCB") || "";
      this.uploadConfig.id = this.uploadConfig1.id;
      this.getDataOne();
      this.getDataTwo();
      this.getDataThree();
      this.$post
        .postData(
          "getJDBDropDownDataSource",
          JSON.stringify(this.getJDBDropDownDataSource),
          this.swglCode
        )
        .then(res => {
          this.keep_limit = res.data.keep_limit;
          this.selectContents.receive_type = res.data.receive_type;
        });
    },
    preserve(type) {
      let params = Object.assign(this.saveOrUpdateSW, this.fromdata);
      this.saveOrUpdateSW.id =
        this.receiveselect.id || sessionStorage.getItem("pageSWidCB") || "";
      this.$post
        .postData("saveOrUpdateCB", JSON.stringify(params), this.swglCode)
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWidCB", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                offset: 400,
                duration: 1000
              });
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.uploadConfig1.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            } else {
              this.receiveselectlist();
            }
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
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

      if (scrolled < this.distance_qpyj) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_qpyj &&
        scrolled < this.distance_cyxx - 180
      ) {
        this.active = "#qpyj";
      } else if (
        scrolled >= this.distance_cyxx - 200 &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#cyxx";
      } else {
        this.active = "#scfj";
      }
    },

    // 关闭
    handelclose() {
      window.location.href = "about:blank";
      window.close();
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
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
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeDeptName") {
          this.fromdata.undertakeDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "assistDeptName") {
          this.fromdata.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
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
    //请求承办部门树 单选时
    getChenTreeData() {
    },
    //请求部门树数据
    getTreeData(n, m) {
    },
    commit() {
      let bank_commit = {function: "doFinishHQXBCB", undertake: ""}
      var obj = Object.assign(bank_commit, this.fromdata);
      this.$post
        .postData(
          "doFinishHQXBCB",
          JSON.stringify(obj),
          this.swglggCode
        ).then(res => {
        window.location.href = "about:blank";
        window.close();
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
    //点击 完成并发送 弹窗弹出
    completeSending() {
    },
    //完成并发送时校验
    saveCheck() {
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
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
          case "fasong":
            this.fromdata.sendSubName = names;
            this.fromdata.sendSubId = ids;
            this.fasongCheckData = this.checkData;
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
      this.bank_doSend.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWidCB") || "";
      let params = Object.assign(this.bank_doSend, this.fromdata);
      this.$post
        .postData("finishAndSendQHXBCB", JSON.stringify(params), this.$businessCode.swglgg)
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
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "chen":
          this.checkIds = this.fromdata.undertakeDeptId
            ? this.fromdata.undertakeDeptId.split(",")
            : [];
          this.checkData = this.chenCheckData;
          if (this.dialogTypeBack) {
            this.checkData = [];
            this.checkIds = [];
          }
          break;
        case "xie":
          this.checkIds = this.fromdata.assistDeptId
            ? this.fromdata.assistDeptId.split(",")
            : [];
          this.checkData = this.xieCheckData;
          break;
        case "fasong":
          this.checkIds = this.fromdata.sendSubId
            ? this.fromdata.sendSubId.split(",")
            : [];
          this.checkData = this.fasongCheckData;
          break;
        case "dosend":
          this.checkIds = [];
          this.checkData = [];
          break;
      }
    },
    //删除意见(固化意见)
    deletService(id) {
    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.$post
        .postData("getHistoryActInfo", JSON.stringify(this.bank_cklc), this.swglggCode)
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
    banjie() {
      let params = Object.assign(this.fromdata, this.banjie_fn);
      this.$post
        .postData("doFinish", JSON.stringify(params), this.swglggCode)
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送成功",
                duration: 500,
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
          id: this.fromdata.undertakeFileList[n - 1].id,
          sort: this.fromdata.undertakeFileList[n].sort
        },
        {
          id: this.fromdata.undertakeFileList[n].id,
          sort: this.fromdata.undertakeFileList[n - 1].sort
        }
      )
      midObj = this.fromdata.undertakeFileList[n];
      this.fromdata.undertakeFileList[n] = this.fromdata.undertakeFileList[n - 1];
      this.fromdata.undertakeFileList[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.undertakeFileList[n + 1].id,
          sort: this.fromdata.undertakeFileList[n].sort
        },
        {
          id: this.fromdata.undertakeFileList[n].id,
          sort: this.fromdata.undertakeFileList[n + 1].sort
        }
      )
      midObj = this.fromdata.undertakeFileList[n];
      this.fromdata.undertakeFileList[n] = this.fromdata.undertakeFileList[n + 1];
      this.fromdata.undertakeFileList[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById), this.swglCode)
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 500,
              });
              this.fromdata.undertakeFileList.splice(n, 1);
              this.uploadConfig.filesHas = this.fromdata.undertakeFileList;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 500,
              });
            }
          }
        });
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
    cuibanClick(){
      this.$post
        .postData(
          "cuibanXC",
          JSON.stringify({
            function:"cuibanXC",
            multiTenancyId:this.fromdata.multiTenancyId,
            processInstId:this.fromdata.processInstId,
            modualType:"undertake",
            dataTypeXC:"sw_cb"
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
  watch: {},
  created() {
    let that = this;
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig1.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.swgl;
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag : "";
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    this.uploadConfig.flowTranId = this.$businessCode.swgl; //chai
    this.readonlySwcy = this.$route.query.tiaoguo ? false : true;
    this.receiveselectlist();
    this.$post
      .postData(
        "getReceiveDropDownDataSource",
        JSON.stringify(this.getReceiveDropDownDataSource),
        this.swglCode
      )
      .then(res => {
        if (res && res.success) {
          console.log("下拉", res.data);
          that.selectContents = Object.assign(
            {},
            that.selectContents,
            res.data
          );
          //this.selectType((this.fromdata.secretType = "商业秘密"));
          this.rules = this.copyRules;
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
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

.pl65 {
  padding-left: 65%;
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

      .bank_db_height {
        height: auto;
      }
    }

    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 20px 0;
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

.linecenter {
  /deep/ .el-form-item__label {
    width: 30px;
    text-align: center;
    padding: 0;
  }
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
.opinionTbody {
  background-color: #e4e7ed52 !important;
  color: #000;
  padding: 5px 15px 5px 5px !important;
  border: 1px solid #E4E7ED !important;
  border-radius: 4px !important;
  margin-top: 5px;
}

.lineContent {
  line-height: 24px;
  font-size: 14px;
  word-break: break-all;
  white-space: pre-line;
}

.adviceInfo {
  font-size: 14px !important;
  line-height: 20px;
}

.timeFont {
  font-size: 13px;
}

.pad_lr10 {
  padding: 0;
}

.isLeft {
  color: red;
}

.d_b100 {
  width: 100%;
}

.lineRight {
  text-align: left;
  margin-left: 10px;
}

.opinionTd {
  margin-bottom: 10px;
}

.deletIcon {
  text-align: right;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: -40px;
}

.disable_w {
  width: 100%;
}
.isBlue{
  color:blue !important;
}
</style>
