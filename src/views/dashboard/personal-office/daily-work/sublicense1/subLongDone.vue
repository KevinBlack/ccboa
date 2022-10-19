/**
* create by wl on 2020-9-16 18.10
* 类注释：表单控制
* 备注：
*控制01:按钮循环
*控制02：加入元素 如：:disabled="readFields.isRead"
*控制03：data中加入huanJieMessage readFields requiredFields editedIdeaFields requiredIdeaFields buttonList
*控制04：引入minixs
*控制05：buttonClick方法外抛
*控制06：setConfig（）setFormConfig（）其中setFormConfig是必填校验。参考案例
*控制07：无流程id不请求控制。有责请求   processInstId   且无流程id  默认显示保存和操作指南以及关闭
*
*
*/
<template>
  <div id="subLongAdd" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>授权处理单
        </p>
        <div class="grid_comtent">
          <!-- 控制01 -->
          <!-- <el-button
            size="small"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.type)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>-->
          <el-button
            size="small"
            v-if="fromdata.curNodeCode == '800'&&flag&&fromdata.status=='1'"
            plain
            @click="breakArticle"
          >中止授权</el-button>
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button
            size="small"
            plain
            @click="dialogVisibleShouuhi = true"
            v-if="fromdata.curNodeCode!=800&&fromdata.allowBack&&readFlag!='1'"
          >收回</el-button>
          
          <el-button size="small" plain @click="shoucang()">收藏</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="caozuozhinan()">操作指南</el-button>

          <!-- <el-button plain @click="preserve('save')">保存</el-button>
          <el-button plain @click="completeSending">完成并发送</el-button>
          <el-button plain @click="banjie">办结</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <el-button plain @click="delectArticle">删除登记</el-button>
 <el-button plain @click="collect">收藏</el-button>-->
          <!-- <el-button plain @click="processSheet">打印处理单</el-button>
          -->
          <!-- <el-button plain @click="drafting">起草正文</el-button> -->
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisibleShouuhi" width="30%">
      <span>是否收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleShouuhi = false">取 消</el-button>
        <el-button type="primary" @click="shouhuibutton">确 定</el-button>
      </span>
    </el-dialog>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行长期转授权登记单</h3>
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
                  <el-form-item label="授权级别" prop="authLevel" ref="authLevel">
                    <el-radio-group v-model="fromdata.authLevel">
                      <el-radio :label="1" :disabled="true">行政文件签发</el-radio>
                      <el-radio :label="0" :disabled="true">部门级文件签发</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <!-- <el-form-item label="标题" prop="authLevel">
                    <el-radio-group v-model="fromdata.authLevel">
                      <el-radio :key='1' :label="1">行政文件签发</el-radio>
                      <el-radio :key='0' :label="0">部门级文件签发</el-radio>
                    </el-radio-group>
                  </el-form-item>-->
                </el-col>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="被授权人" prop="beAuthUserName">
                      <el-col :span="20">
                        <el-input
                          v-model="fromdata.beAuthUserName"
                          placeholder="请选择被授权人"
                          :disabled="true"
                          style="width: 100%;"
                        >
                          <el-button slot="append" :disabled="true" @click="getTreeData('bei')" icon="el-icon-plus"></el-button>
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="被授权部门" prop="beAuthDeptName" ref="beAuthDeptName">
                      <el-input v-model="fromdata.beAuthDeptName" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="授权开始时间" prop="startTime" ref="startTime">
                      <el-date-picker
                        v-model="fromdata.startTime"
                        :disabled="true"
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
                        :disabled="true"
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
                </el-row>

                <el-col :span="24">
                  <el-form-item label="授权原因" prop="authReason" ref="authReason">
                    <el-input
                      type="textarea"
                      :disabled="true"
                      v-model="fromdata.authReason"
                      maxlength="11"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备    注">
                    <!-- <div v-for="(item) in fromdata.remarksList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
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
                    </div> -->
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      v-model="fromdata.remarks"
                      :disabled="true"
                      v-if="!editedIdeaFields.remarks  || (readFields.remarks && !(fromdata.remarksList && fromdata.remarksList.length))"
                    ></el-input>
                    <opinionText 
                    :opinionText="fromdata.remarkList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :isRemarks="true"
                  ></opinionText>
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
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        :disabled="true"
                        @change="handleCheckAllChange"
                      >全选</el-checkbox>
                      <el-checkbox
                        v-for="(item,index) in modules"
                        :disabled="true"
                        :key="index"
                        :label="item.moduleKeyWord"
                        :value="index"
                      >{{item.moduleName}}</el-checkbox>
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
                    <!-- <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
                      <div v-if="item.status" class="fix_height">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
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
                              :disabled="editedIdeaFields.pishiOpinion"
                              type="button"
                              class="el-button el-button--default dimi_btn"
                              @click="deletService(item.id)"
                            >
                              <i class="el-icon-delete"></i>
                            </button>
                          </el-col>
                        </el-row>
                      </div>
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        maxlength="500"
                        resize="none"
                        autosize
                        style="flex:1"
                        v-model="fromdata.pishiOpinion"
                        :disabled="editedIdeaFields.pishiOpinion"
                        v-if="!editedIdeaFields.pishiOpinion  || (editedIdeaFields.pishiOpinion && !(fromdata.pishiOpinionList && fromdata.pishiOpinionList.length))"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=1)"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.pishiOpinion"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
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
                  <el-form-item label="办公室批办意见" prop="isPass" ref="isPass">
                    <el-radio-group v-model="fromdata.isPass">
                      <el-radio :label="1" :disabled="editedIdeaFields.isPass">同意</el-radio>
                      <el-radio :label="0" :disabled="editedIdeaFields.isPass">不同意</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="办公室批办意见">
                    <!-- <div v-for="item in fromdata.officeOpinionList" :key="item.id">
                      <div v-if="item.status" class="fix_height">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        maxlength="500"
                        autosize
                        v-model="fromdata.officeOpinion"
                        :disabled="editedIdeaFields.officeOpinion"
                        v-if="!editedIdeaFields.officeOpinion  || (editedIdeaFields.officeOpinion && !(fromdata.officeOpinionList && fromdata.officeOpinionList.length))"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=2)"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.officeOpinion"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
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
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit tit1">授权书</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row v-if="fromdata.curNodeCode != '800'"  class="pr45">
                <!-- <loadAccessory></loadAccessory> -->
                <!-- <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
                ></uploadFiles>-->
                <el-col>
                  <div
                    class="tree_w"
                    style="margin-left:138px;"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in  fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_wrap">
                            <span
                              class="name down"
                              :title="item.fileName"
                              @click="viewFile(item)"
                            >{{item.fileName}}</span>
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
import loadAccessory from "../../../../../components/LoadAccessory/LoadAccessory";
import timeDialog from "../../../../../components/timedialog/timedialog";
import exportTable from "@/minixs/exportTable";
import treeCofig from "../../../../../components/tree/tree-fawen";
import secretBasls from "../../../../../components/secretBasls/secretBasls";
import appendWriteList from "../../../../../components/appendWriteList/appendWriteList";
import uploadFiles from "../../../../../components/uploadFile/uploadFile";
import dateFormate from "@/util/filters.js";
import minixs from "../../../../../minixs/index";
import opinionText from "@/components/opinionText/index";

export default {
  name: "App",
  components: {
    loadAccessory,
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    uploadFiles,
    opinionText
  },
  data() {
    return {
      showDraft: true,
      dialogVisibleShouuhi: false, //收回弹框
      allowBack: "",
      readFlag: "",
      secretDialog:false,
      modules: [], // 授权模板
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        noattachTitleCheck: true
      },
      ruleForm: [],
      routeData: [],
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
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
      flag: false,//是否为登记人
      //完成并发送弹窗下拉框
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
      saveOrUpdateSW: {
        function: "doStartWfe",
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
        authLevel: 1,
        id: "",
        authStatusName: "",
        draftUserId: "",
        pcsAvyId: "",
        multiTenancyId: "",
        tplNo: "",
        authModule: "",
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
      checkedCities: [],
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      //控制03
      huanJieMessage: {},
      readFields: {
        authLevel: false,
        beAuthUserName: false,
        startTime: false,
        endTime: false,
        authReason: false,
        authModule: false,
        // isPass: false,
        remarks: false,
        pishiOpinion: false,
        officeOpinion: false
      },
      requiredFields: {
        authLevel: false,
        beAuthUserName: false,
        startTime: false,
        endTime: false,
        authReason: false,
        authModule: false,
        remarks: false
        // isPass: false
      }, //必填控制域
      editedIdeaFields: {
        isPass: true,
        pishiOpinion: true,
        officeOpinion: true
      }, //可编辑意见域
      requiredIdeaFields: {
        isPass: true,
        pishiOpinion: false,
        officeOpinion: false
      },
      //必填意见域
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "关闭", type: "btn_gb", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "办结", type: "btn_bj", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "删除登记", type: "btn_scdj", show: false },
        { name: "中止授权", type: "btn_zzsq", show: false },
        { name: "打印处理单", type: "btn_dycld", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],
      //常用批示意见
      bank_selectCommonUseList: {
        function: "selectCommonUseList",
        id: "",
        userId: "",
        userName: "",
        content: "",
        sort: "",
        createtime: ""
      }
    };
  },
  mixins: [minixs],
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
    //收藏
    shoucang() {
      let that = this;
      let shiwutitle = (this.fromdata.draftDept || "") + "长期转授权登记单";
      let draftInfo = this.fromdata.filePath?[].concat({fileName:this.fromdata.fileName,filePath:this.fromdata.filePath},this.fromdata.attchmentFileInfo):this.fromdata.attchmentFileInfo;//收藏时下载正文
      //收藏时下载正文
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "subLongAdd",  
        this.$businessCode.sqglfj,
        this.fromdata.title,
        that
      );
    },
    //按钮收回
    shouhuibutton() {
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify({
            function: "doWithdrawTask",
            pcsAvyId: this.fromdata.pcsAvyId,
            multiTenancyId: this.fromdata.multiTenancyId,
            processInstId: this.fromdata.processInstId}),
            this.$businessCode.sqglgg
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 2000
            });
            setTimeout(() => {
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            }, 1000);
          }
        });
    },
    //附件删除
    deleteRow(n, id) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.$businessCode.zxdbfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 2000
              });
              this.fromdata.attchmentFileInfo.splice(n, 1);
              this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 2000
              });
            }
          }
        });
    },
    //readFlag
    getReadFlag() {
      this.$post
        .postData(
          "doUpdateReadRecord",
          JSON.stringify({
            function: "doUpdateReadRecord",
            pcsAvyId: this.fromdata.pcsAvyId,
            processInstId: this.fromdata.processInstId,
            multiTenancyId: this.fromdata.multiTenancyId
          }),
          this.$businessCode.sqglgg
        )
        .then(res => {
          //更新状态用。暂时不用任何操作
          if (res && res.success) {
            window.opener.location.reload();
          }
        });
    },
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve("save");
          break;
        case "btn_bj":
          this.banjie();
          break;
        case "btn_wcbfs":
          this.completeSending();
          break;
        case "btn_fscbbm":
          this.sendCb();
          break;
        case "btn_fsxbbm":
          this.sendXb("1");
          break;
        case "btn_gb":
          this.handelclose();
          break;
        case "btn_qxdb":
          this.unshouwenduban();
          break;
        case "btn_scdj":
          this.delectArticle();
          break;
        case "btn_cklc":
          this.flowScheme();
          break;
        case "btn_ckzw":
          this.drafting("0");
          break;
        case "btn_zzsq":
          this.breakArticle();
          break;
        case "btn_czzn":
          this.caozuozhinan();
          break;
      }
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制
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
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.fromdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
      //     this.buttonList[this.buttonList.length - 1].show = true
      // }
      //未加入环节控制约束条件
      // if(this.huanJieMessage.visibleButtons.btn_fsxbbm){
      //   if(this.fromdata.isHasXB == 1){
      //     this.buttonList[8].show=false;
      //   }else if(this.fromdata.isHasXB ==0){
      //     this.buttonList[8].show=true;
      //   }
      // }
      // if(this.huanJieMessage.visibleButtons.btn_fscbbm){
      //   if(this.fromdata.isHasCB == 1){
      //     this.buttonList[7].show=false;
      //   }else if(this.fromdata.isHasCB ==0){
      //     this.buttonList[7].show=true;
      //   }
      // }
      // if(this.huanJieMessage.visibleButtons.btn_wcbfs){
      //   if(this.fromdata.isHasXB ==1 || this.fromdata.isHasCB == 1){
      //     this.buttonList[6].show=false;
      //   }else{
      //   this.buttonList[6].show=true;
      //  }
      // }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          authLevel: [
            {
              required: this.requiredFields.authLevel,
              trigger: "change",
              message: "请选择授权级别"
            }
          ],
          beAuthUserName: [
            {
              required: this.requiredFields.beAuthUserName,
              trigger: "change",
              message: "请选择被授权人"
            }
          ],
          startTime: [
            {
              required: this.requiredFields.startTime,
              trigger: "change",
              message: "请选择授权开始日期"
            }
          ],
          endTime: [
            {
              required: this.requiredFields.endTime,
              trigger: "change",
              message: "请选择授权结束日期"
            }
          ],
          authReason: [
            {
              required: this.requiredFields.authReason,
              trigger: "change",
              message: "请填写授权原因"
            }
          ],
          authModule: [
            {
              required: this.requiredFields.authModule,
              trigger: "change",
              message: "请选择授权模块"
            }
          ],
          pishiOpinion: [
            {
              required: this.requiredIdeaFields.pishiOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          officeOpinion: [
            {
              required: this.requiredIdeaFields.officeOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          // handleTerminateOpinion: [{required: this.requiredIdeaFields.handleTerminateOpinion, message: '不能为空', trigger: 'blur'}],
          remarks: [
            {
              required: this.requiredIdeaFields.remarks,
              message: "不能为空",
              trigger: "blur"
            }
          ]
          // handleTerminateOpinion: [{required: this.requiredIdeaFields.handleTerminateOpinion, message: '不能为空', trigger: 'blur'}],
          // helpOrgOpinion: [{required: this.requiredIdeaFields.helpOrgOpinion, message: '不能为空', trigger: 'blur'}],
        };
      });
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 审核意见
          this.fromdata.pishiOpinion = this.fromdata.pishiOpinion
            ? this.fromdata.pishiOpinion + data
            : data;
        } else if (this.clickTypes == 2) {
          // 核稿意见
          this.fromdata.opinionDraf = this.fromdata.opinionDraf
            ? this.fromdata.opinionDraf + data
            : data;
        } else if (this.clickTypes == 3) {
          // 会签意见
          this.fromdata.opinionSign = this.fromdata.opinionSign
            ? this.fromdata.opinionSign + data
            : data;
        } else if (this.clickTypes == 4) {
          // 签发意见
          this.fromdata.opinionSend = this.fromdata.opinionSend
            ? this.fromdata.opinionSend + data
            : data;
        }
        this.$forceUpdate();
      }
    },
    // 获取常用批示意见
    getCommonUse() {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "selectCommonUseList";
      this.$post
        .postData(
          "selectCommonUseList",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.sqglgg
        )
        .then(res => {
          if (res && res.success) {
            this.offenDevices = res.data;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 2000
          });
        });
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "doDeletesendOrderOpinion",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.fawgl
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
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 2000
          });
        });
    },
    timebijiao1() {
      this.fromdata.startTime = dateFormate.date(
        Date.parse(this.fromdata.startTime),
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(1111, this.fromdata.startTime);

      // this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      if (
        this.fromdata.endTime &&
        this.fromdata.endTime < this.fromdata.startTime
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "起始时间需小于结束时间",
          duration: 2000
        });
        this.fromdata.startTime = "";
      }
    },
    timebijiao() {
      this.fromdata.endTime = dateFormate.date(
        Date.parse(this.fromdata.endTime),
        "YYYY-MM-DD HH:mm:ss"
      );
      if (this.fromdata.endTime < this.fromdata.startTime) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "结束时间需大于起始时间",
          duration: 2000
        });
        this.fromdata.endTime = "";
      }
    },
    handleCheckAllChange(val) {
      console.log("All", val);

      // this.checkedCities = val ? cityOptions : [];
      // this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log("checkedCities", this.checkedCities);
      console.log("value", value);
      this.fromdata.authModule =
        this.checkedCities.length > 0 ? this.checkedCities.join(",") : "";
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    add() {
      this.dialogFormVisible = true;
    },
    // getTreeData(n) {
    //   let name = "";
    //   let that = this;
    //   let clearName = "";
    //   this.canTab = false;
    //   this.singelCheckF = true;
    //   this.dialogType = "hui";
    //   this.treeData = [];
    //   //手动清空时处理
    //   this.dialogTypeNow = n;
    //   switch (n) {
    //     case "shou":
    //       name = "授权人";
    //       clearName = "authUserName";
    //       break;
    //     case "bei":
    //       name = "被授权人";
    //       clearName = "beAuthUserName";
    //       break;
    //   }
    //   this.clearCheckData(clearName);
    //   this.dialogTit = name;
    //   this.showCompDialog();
    //   this.$post
    //     .postData(
    //       "selectUserByTree",
    //       JSON.stringify({ function: "selectUserByTree" }),
    //       this.$businessCode.sqglgg
    //     )
    //     .then(res => {
    //       console.log(JSON.stringify(res.data));
    //       that.treeData = (res && res.data) || [];
    //       if (that.treeData.length) {
    //         that.treeData.forEach(item => {
    //           item.content = JSON.parse(item.content);
    //           if (that.dialogType === "hui") {
    //             item.text = item.typeName;
    //           }
    //         });
    //       }
    //     });
    // },
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
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.zxdbfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              });
              if (openPlugin) {
                this.zhengWenState = 0;
                this.doDraft(res);
              } else {
                window.open(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  "_blank"
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 2000
              });
            }
          }
        });
    },
    //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: this.fromdata.id,
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.sqglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          showBtns: false,
          flowTranId:this.$businessCode.sqgl,//流程交易线    chai
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
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.zxdbfj
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
                duration: 2000
              });
            }
          }
        });
    },
    /*-------------------------------------------------------------------*/
    //请求部门树数据
    getTreeData(n, m) {
      if (n == "cy") {
        //传阅步骤   ISCY不需要
        this.isCY = true;
        this.dialogType = "dosend";
      } else {
        this.isCY = false;
        this.dialogType = "hui";
      }
      this.offenUse = false;
      this.dialogTypeZF = n;
      let name = "";
      this.addSendType = m;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = true;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "chen":
          name = "承办部门";
          clearName = "undertakeDeptName";
          !this.fromdata.receiveVersion || this.fromdata.receiveVersion === 1
            ? (this.singelCheckF = true)
            : "";
          break;
        case "xie":
          name = "协办部门";
          clearName = "assistDeptName";
          break;
        case "fasong":
          name = "发送对象";
          clearName = "sendSubName";
          break;
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
        case "shou":
          name = "授权人";
          clearName = "authUserName";
          break;
        case "bei":
          name = "被授权人";
          clearName = "beAuthUserName";
          break;
      }
      //this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      // if (n == "chen") {
      //   this.getChenTreeData();
      //   return;
      // }
      if (m == 1) {
        this.dialogTypeNow = "zengfa";
      }
      //增加一个类型接口
      if (n == "fasong") {
        this.$post
          .postData(
            "getForwordOrgDept",
            JSON.stringify({ function: "getForwordOrgDept", orgFlag: "org" }),
            this.fwTranId
          )
          .then(res => {
            if (res.message == "Loading") {
              this.loadingTree = true;
            } else {
              this.loadingTree = false;
            }
            that.treeData = (res && res.data) || [];
          });
      } else if (n == "cy") {
        this.$post
          .postData(
            "selectUserByUnitTreeCY",
            JSON.stringify({
              function: "selectUserByUnitTreeCY",
              unitCode: "",
              flag: true
            }),
            this.$businessCode.sqglgg
          )
          .then(res => {
            this.loadingTree = false;
            that.treeData = (res && res.data) || [];
          });
      } else if (n == "shou" || n == "bei") {
        this.$post
          .postData(
            "selectUserByTree",
            JSON.stringify({ function: "selectUserByTree" }),
            this.$businessCode.sqglgg
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
      } else {
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(this.bank_mainXiao),
            this.$businessCode.sqglgg
          )
          .then(res => {
            if (res.message == "Loading") {
              this.loadingTree = true;
            } else {
              this.loadingTree = false;
            }
            that.treeData = (res && res.data) || [];
          });
      }
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      let judge = true;
      let that = this;
      if (!this.fromdata.processInstId) {
        this.preserve("1");
      }

      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
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
          this.$businessCode.sqglgg
        )
        .then(res => {
          console.log(this.bank_send);
          this.seletOptionsData = res.data || [];
          this.bank_send.curTplNo = this.fromdata.tplNo;
          this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
          let parms = Object.assign(this.bank_send, this.fromdata);
          parms.pcsAvyId = this.bank_selectConfig.pcsAvyId = res.data[0]
            .PCSAVYID
            ? res.data[0].PCSAVYID
            : this.bank_selectConfig.pcsAvyId;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(parms),
              this.$businessCode.sqglgg
            )
            .then(res => {
              if (res.message == "Loading") {
                this.loadingTree = true;
              } else {
                this.loadingTree = false;
              }
              this.treeData = res.data;
            })
            .catch(e => {
              console.log(e);
            });
        });
    },
    //完成并发送时校验
    saveCheck() {
      let tips = "您有未输入字段!";
      this.scrollIntoForm();
      // if (!this.fromdata.undertakeDeptName || !this.fromdata.undertakeDeptId) {
      //         title 正文标题 attachmentTitle 附件标题  receiveTime 收文日期 emergencyName 紧急程度 documentCode 收文字号
      //  secretTypeName 秘密类型 security 密级和保密期限 secretLimitName 密级和保密期限
      // sendOrgName 来文单位 completeTime 成文日期 receiveType 实物收文类型 draftUserName 登记人
      // isForword 转发文件 isDirect 直发文件  directRange 直发范围
      // directType 直发文种类 limitDate 保管期限 undertakeDeptName 承办部门
      if (!this.fromdata.title) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 2000
        });
        return false;
      } else {
        return true;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let buMenName = "";
        let buMenId = "";
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];

        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          if (this.addSendType == "1") {
            if (this.dialogTypeZF == "chen") {
              oldIds = this.fromdata.undertakeDeptId.split(";");
              oldNames = this.fromdata.undertakeDeptName.split(";");
            } else if (this.dialogTypeZF == "xie") {
              oldIds = this.fromdata.assistDeptId.split(";");
              oldNames = this.fromdata.assistDeptName.split(";");
            } else {
              oldIds = this.fromdata.circulatePersonIds.split(";");
              oldNames = this.fromdata.circulatePersonNames.split(";");
            }
            newIds = ids.filter(item => {
              return oldIds.indexOf(item) == -1;
            });
            newNames = names.filter(item => {
              return oldNames.indexOf(item) == -1;
            });
          }

          names = names.join(";");
          this.transIds = ids = ids.join(";");
          newIds = newIds.join(";");
          newNames = newNames.join(";");

          buMenName = data[0].deptName || "";
          buMenId = data[0].deptId || "";
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
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
          case "cy":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
          case "zengfa":
            if (this.dialogTypeZF == "xie") {
              this.fromdata.assistDeptName = names;
              this.fromdata.assistDeptId = ids;
              this.xieCheckData = this.checkData;
            } else if (this.dialogTypeZF == "chen") {
              this.fromdata.undertakeDeptName = names;
              this.fromdata.undertakeDeptId = ids;
              this.chenCheckData = this.checkData;
            } else {
              this.fromdata.circulatePersonNames = names;
              this.fromdata.circulatePersonIds = ids;
              this.cyCheckData = this.checkData;
            }
            break;
          case "shou":
            this.fromdata.authUserName = names;
            this.fromdata.authUserId = ids;
            this.undertakeDeptData = this.checkData;
            this.fromdata.beAuthDeptId = buMenId;
            this.fromdata.beAuthDeptName = buMenName;
            break;
          case "bei":
            this.fromdata.beAuthUserName = names;
            this.fromdata.beAuthUserId = ids;
            this.assistDeptData = this.checkData;
            this.fromdata.beAuthDeptId = buMenId;
            this.fromdata.beAuthDeptName = buMenName;
            break;
        }
        if (this.addSendType == "1") {
          if (this.dialogTypeZF == "xie") {
            this.sendXb(newIds, newNames);
          } else if (this.dialogTypeZF == "chen") {
            this.sendCb(newIds, newNames);
          } else {
            this.sendCy(newIds, newNames);
          }
        }
        //传阅步骤
        if (this.addSendType != "1" && dtype == "cy") {
          this.sendCy();
        }
        //这里什么时候需要sendXb('1')需要再次核对。修改承办的时候将false改成true
        // if(this.fromdata.isHasXB == 1 && dtype != "fasong" || this.fromdata.isHasCB == 1 ){
        //     if(this.dialogTypeZF == "xie"){this.bank_sendXb.avyds = "发送协办部门"}
        //     if(this.dialogTypeZF == "chen"){this.bank_sendXb.avyds = "发送承办部门"}
        //     if(this.dialogTypeZF == "xie"){
        //       this.sendXb('1')
        //     }
        //     if(this.dialogTypeZF == "chen"){
        //       this.sendCb('1')
        //     }
        //   }
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
      if (dtype == "fasong") {
        this.fasongBtn();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      // this.receiveselect.id = this.uploadConfig.id =
      // getFormId(this.$route.query.id,'receiveDispachId');
      this.bank_doSend.id = this.uploadConfig.id = this.fromdata.id
        ? this.fromdata.id
        : sessionStorage.getItem("pageSWid") || "";
      let params = Object.assign(this.bank_doSend, this.fromdata);

      let copyFrom = JSON.parse(JSON.stringify(this.fromdata));
      delete copyFrom.remarksList;
      delete copyFrom.handleTerminateOpinionList;
      delete copyFrom.pishiOpinionList;
      delete copyFrom.officeOpinionList;
      delete copyFrom.undertakeOrgOpinionList;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.finalOpinionList;
      delete copyFrom.helpOrgOpinionList;
      delete copyFrom.circulateOpinionList;
      delete copyFrom.feedbackAttachmentMap;
      this.bank_doSend.id = getFormId(this.$route.query.id, "pageSWid");
      let obj = Object.assign(this.bank_doSend, copyFrom);
      this.$post
        .postData(
          "doFinishAndSend",
          JSON.stringify(obj),
          this.$businessCode.sqglgg
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 2000,
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
            duration: 2000
          });
        });
    },
    //弹窗回显数据
    backDialogData(type) {
      if (type != "cy") {
        this.isCY = false;
      }
      let newA = [];
      switch (type) {
        case "chen":
          this.checkIds = this.fromdata.undertakeDeptId
            ? this.fromdata.undertakeDeptId.split(";")
            : [];
          this.checkData = this.chenCheckData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将协办选择人员 设置不可选
          if (this.xieCheckData.length) {
            newA = [].concat(this.xieCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.chenCheckData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.fromdata.assistDeptId
              ? this.fromdata.assistDeptId.split(";")
              : []
          );
          break;
        case "xie":
          this.checkIds = this.fromdata.assistDeptId
            ? this.fromdata.assistDeptId.split(";")
            : [];

          this.checkData = this.xieCheckData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将承办选择人员 设置不可选
          if (this.chenCheckData.length) {
            newA = [].concat(this.chenCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.xieCheckData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.fromdata.undertakeDeptId
              ? this.fromdata.undertakeDeptId.split(";")
              : []
          );
          break;
        case "fasong":
          this.checkIds = this.fromdata.sendSubId
            ? this.fromdata.sendSubId.split(";")
            : [];

          this.checkData = this.fasongCheckData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          if (this.fasongCheckData.length) {
            newA = [].concat(this.fasongCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          //this.checkData = this.fasongCheckData;
          break;
        case "cy":
          this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
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
        case "dosend":
          this.checkIds = [];
          this.checkData = [];
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
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.sqglgg
        )
        .then(res => {
          if (res) {
            this.tableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          }
        });
    },
    banjie() {
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata));
      delete copyFrom.remarksList;
      delete copyFrom.handleTerminateOpinionList;
      delete copyFrom.pishiOpinionList;
      delete copyFrom.officeOpinionList;
      delete copyFrom.undertakeOrgOpinionList;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.finalOpinionList;
      delete copyFrom.helpOrgOpinionList;
      delete copyFrom.circulateOpinionList;
      delete copyFrom.feedbackAttachmentMap;
      let params = Object.assign(copyFrom, this.banjie_fn);
      this.$post
        .postData("doFinish", JSON.stringify(params), this.$businessCode.sqglgg)
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "办结成功",
                duration: 2000
              });
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 2000
              });
            }
          }
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
      let params = Object.assign(parms,this.fromdata);
      this.$post
        .postData(
          "supspensionAuthorizationCQ",
          JSON.stringify(params),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "操作成功",
              duration: 2000
            });
            this.fromdata.actualEndTime =
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1) +
              "-" +
              new Date().getDay();
            this.toEdit();
            window.opener.location.reload();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "操作失败",
            duration: 2000
          });
        });
    },

    //初始值 //input框内容
    toEdit() {
      this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageSWid") || "";
      let that = this;
      console.log(this.bank_dispach.id);
      this.$post
        .postData(
          "selectByIdCQ",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.sqgl
        )
        .then(res => {
          this.curUser = res.data.curUser;
          this.curNodeName = res.data.curNodeName;
          this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
          this.bank_selectConfig.tplNo = res.data.tplNo;
          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          that.fromdata = res.data;
          that.checkedCities = res.data.authModule
            ? res.data.authModule.split(",")
            : [];
          let user = JSON.parse(localStorage.unitInfo)
          console.log("use",user[0].humanName)
          //登陆人不是登记人
          this.flag =user[0].humanName==res.data.draftUserName ? true : false;
          console.log("form", that.fromdata);
          this.getReadFlag();

          //上传附件
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
          // this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
          // this.cuteData("remarks", "remarksList", "remarksId");
          // this.cuteData(
          //   "officeOpinion",
          //   "officeOpinionList",
          //   "officeOpinionId"
          // );
        });
    },
    //操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "CQSQ"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getFileInfo(this,res.data).then(resF => {
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
                    flowTranId:this.$businessCode.sqgl,    //流程交易线   
                  
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
              duration: 2000
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 2000
          });
        });
    },
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      var handbook = flagFile?self.$businessCode.fwbzfj:self.$businessCode.sqglfj;
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
          }else{
             self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 2000
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
            duration: 2000
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    // 保存
    preserve(type) {
      let params = Object.assign(this.saveOrUpdateSW, this.fromdata);
      this.saveOrUpdateSW.id = this.bank_dispach.id;
      this.$post
        .postData(
          "doStartWfe",
          JSON.stringify(params),
          this.$businessCode.sqglgg
        )
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "保存成功",
              duration: 2000
            });
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            } else {
              this.toEdit();
            }
            window.opener.location.reload();
            this.toEdit();
          } else {
            this.$message({
              type: "error",
              message: res.message,
              duration: 2000
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
          // window.location.href = "about:blank";
          window.close();
          window.history.go(-1);
          window.opener.location.reload();
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
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
      this.$post
        .postData(
          "deleteByIdCQ",
          JSON.stringify(parms),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            debugger
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 2000,
              onClose: () => {
                      window.history.go(-1);
                      window.opener.location.reload();
                    }
            });
            // window.history.go(-1);
            // window.opener.location.reload();
          }else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "删除失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 2000
          });
        });
      })
      // window.history.go(-1);
      // window.opener.location.reload();
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
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 2000
          });
        });
    },
    getMukuai() {
      let selectAgent = { function: "selectAgent" };
      this.$post
        .postData(
          "selectAgent",
          JSON.stringify(selectAgent),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res && res.success) {
            this.modules = res.data;
            console.log(111, this.modules);
          }
        });
    }
  },
  created() {
    this.getMukuai();
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.uploadConfig.code = this.$businessCode.sqglfj;
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    console.log(2518,this.readFlag)
    this.uploadConfig.id = this.$route.query.id ? this.$route.query.id : "";
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
/deep/.el-checkbox__input.is-disabled+span.el-checkbox__label{
   color: #606266;
 }
 /deep/.el-radio__input.is-disabled+span.el-radio__label{
   color: #606266;
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
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
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
    color: #3b85ef;
  }
}
</style>
