<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back" @click="goBack">
          <i class="el-icon-arrow-left"></i>模板及范文流转
        </p>

        <div class="grid_comtent">
          <!-- <el-button plain class="bank_grid_comtent_active" @click="goBack">关闭</el-button>
          <el-button plain @click="preserve(1)" v-show="showPreserve">保存</el-button>
          <el-button plain @click="completeSending" v-show="showComlete">完成并发送</el-button>
          <el-button plain @click="sendFile" v-show="showSend">发布</el-button>
          <el-button plain v-show="showZj" @click="sendZj">发征集部门</el-button>
          <el-button plain @click="checkZj">查看征集状态</el-button>
          <el-button plain v-show="showSh" @click="callBack">收回</el-button>
          <el-button plain @click="delectArticle" v-show="showDelect">删除此文</el-button>-->

          <!-- 控制01 -->
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <!--  <el-button plain @click="sczw" size="small" v-if="curNodeName=='登记'">上传正文</el-button>
          <el-button size="small" plain @click="drafting('0')" v-if="fromdata.filePath">查看正文</el-button>-->
          <!-- <el-button size="small" plain @click="sendCy">发送传阅人</el-button> -->
          <el-button
            size="small"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.type)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
          <el-button
            size="small"
            plain
            @click="callBack"
            v-if="this.state == 2 && readFlag != 1 && allowBack==true"
          >收回</el-button>
          <el-button plain @click="flowScheme" v-show="showScheme">查看流程</el-button>
          <el-button plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog> -->

    <div class="nav bank_dispach_content"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{title}}</h3>
    </header>
    <div class="form_content bank_dispach_file">
      <div class="form_tip bank_dispach_annotation">
        <span>
          当前环节：
          <span class="red">{{fromData.muBanVo.curNodeName}}</span>
        </span>
        <span style="margin-left:30px">
          当前处理人：
          <span class="red">{{fromData.muBanVo.currentUser}}</span>
        </span>
      </div>
      <el-form
        ref="muban"
        :model="fromData.muBanVo"
        :rules="rules"
        label-width="110px"
        class="demo_ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="示例类型" prop="sampleType">
              <el-select
                v-model="fromData.muBanVo.sampleType"
                placeholder="请选择"
                :disabled="readFields.sampleType"
              >
                <el-option label="模板" value="模板"></el-option>
                <el-option label="范文" value="范文"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件类型" prop="fileType">
              <el-select
                v-model="fromData.muBanVo.fileType"
                placeholder="请选择文件类型"
                :disabled="readFields.fileType"
              >
                <el-option label="发文" value="发文"></el-option>
                <el-option label="签报" value="签报"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="发文类型" prop="postType">
              <el-select
                v-model="fromData.muBanVo.postType"
                placeholder="请选择"
                @change="selectType"
                :disabled="readFields.postType"
              >
                <!-- <el-option label="1" value="11"></el-option>
                <el-option label="2" value="22"></el-option>-->
                <el-option
                  v-for="item in sendType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务分类" prop="businessType">
              <el-select
                v-model="fromData.muBanVo.businessType"
                placeholder="请选择"
                :disabled="readFields.businessType"
              >
                <!-- <el-option label="3" value="33"></el-option>
                <el-option label="4" value="44"></el-option>-->
                <el-option
                  v-for="item in businessType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '发文'">
          <el-col :span="12">
            <el-form-item label="代字/红头" prop="redHead">
              <el-select
                v-model="fromData.muBanVo.redHead"
                placeholder="请选择"
                :disabled="readFields.redHead"
              >
                <el-option
                  v-for="item in SredHead"
                  :key="item.redHead"
                  :label="item.redHead"
                  :value="item.redHead"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文种" prop="documentCode">
              <el-select
                v-model="fromData.muBanVo.documentCode"
                placeholder="请选择"
                :disabled="readFields.documentCode"
              >
                <el-option
                  v-for="item in textType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select
                v-model="fromData.muBanVo.dealType"
                placeholder="请选择"
                :disabled="readFields.dealType"
              >
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签报类型" prop="qianbaoType">
              <el-select
                v-model="fromData.muBanVo.qianbaoType"
                placeholder="请选择"
                :disabled="readFields.qianbaoType"
              >
                <el-option
                  v-for="item in qianbaoType"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '签报'">
          <el-col :span="12">
            <el-form-item label="签报字号" prop="qbNumber">
              <el-select
                v-model="fromData.muBanVo.qbNumber"
                placeholder="请选择"
                :disabled="readFields.qbNumber"
              >
                <el-option
                  v-for="item in qbNumber"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="fromData.muBanVo.fileType == '呈送件'">
          <el-col :span="12">
            <el-form-item label="处理类型" prop="dealType">
              <el-select
                v-model="fromData.muBanVo.dealType"
                placeholder="请选择"
                :disabled="readFields.dealType"
              >
                <el-option label="批件" value="批件"></el-option>
                <el-option label="阅件" value="阅件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="呈送字号" prop="csNumber">
              <el-select
                v-model="fromData.muBanVo.csNumber"
                placeholder="请选择"
                :disabled="readFields.csNumber"
              >
                <el-option label="e" value="ee"></el-option>
                <el-option label="ff" value="ff"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例标题" prop="fileTitle">
              <el-input
                maxlength="200"
                v-model="fromData.muBanVo.fileTitle"
                :disabled="readFields.fileTitle"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="关键词">
              <el-input
                maxlength="200"
                v-model="fromData.muBanVo.keywords"
                :disabled="readFields.keywords"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="示例可见范围" prop="visibleRange">
              <el-button
                :disabled="readFields.visibleRange"
                v-if="state == 1"
                @click="chooseBtn"
              >选择可见范围</el-button>
              <div class="choose_sl">{{chooseRangeStr}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板/范文" prop="attachments" ref="attachments">
              <el-row>
                <!-- <loadAccessory></loadAccessory> -->
                <el-input type="hidden" v-model="attachments"></el-input>
                <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
                  v-if="fromData.muBanVo.attachments.length<1"
                ></uploadFiles>
                <el-col>
                  <div
                    class="file_list_box"
                    style="margin-left:0"
                    v-if="fromData.muBanVo.attachments&&fromData.muBanVo.attachments.length&&fromData.muBanVo.curNodeCode!=='800'"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in  fromData.muBanVo.attachments"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span
                              class="down"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fwglfj)"
                            >{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="upRow(index)"
                                v-if="fromData.muBanVo.attachments.length>1 && showUploadFile"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(index)"
                                v-if="fromData.muBanVo.attachments.length>1 && showUploadFile"
                                :disabled="index==fromData.muBanVo.attachments.length-1"
                                round
                              >下移</el-button>
                              <el-button
                                type="warning"
                                size="mini"
                                v-if="showUploadFile&& state == 1"
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
                <el-col v-for="(item,n) in fkfj" :key="n">
                  <el-form-item :label="item" :key="item">
                    <el-scrollbar>
                      <div v-for="item1 in fkfjList[n]" :key="item1.id" class="tree_w">
                        <template>
                          <div class="command_wrap">
                            <span
                              class="name down"
                              @click="viewDraftFile(item1.fileName,item1.filePath ,$businessCode.fwglfj)"
                            >{{item1.fileName}}</span>
                            <span class="name">{{item1.createrName}}</span>
                            <span class="name">{{item1.createTime}}</span>
                          </div>
                        </template>
                      </div>
                    </el-scrollbar>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审批意见">
              <!-- <div class="spyj_warp" v-if="leadershipOpinionDisabled.length > 0">
                <div
                  class="spyj text"
                  v-for="(item,index) in leadershipOpinionDisabled"
                  :key="index"
                >
                  <el-input v-model="item.content" type="textarea" class="remark" style="border: 0;" :readonly="true"></el-input>
                  <span class="spyj_right" style="display: block; text-align: right;">
                    <span class="spanname">{{item.departmentName}}</span>
                    <span class="spanname">{{item.userName}}</span>
                    <span>{{item.createTime}}</span>
                  </span>
                </div>
              </div>-->
              <div
                style="display:flex;margin-top:10px"
                v-if="!editedIdeaFields.leadershipOpinion || leadershipOpinionDisabled.length == 0"
              >
                <el-input
                  type="textarea"
                  resize="none"
                  maxlength="500"
                  autosize
                  style="flex:1"
                  v-model="fromData.muBanVo.leadershipOpinion"
                  :disabled="editedIdeaFields.leadershipOpinion"
                ></el-input>
                <!-- v-if="!infoDisabled" -->
                <button
                  @click="writelistbox"
                  v-if="!editedIdeaFields.leadershipOpinion"
                  type="button"
                  class="el-button el-button--default dimi_btn"
                >
                  <i class="el-icon-edit"></i>
                </button>
              </div>
              <opinionText 
                :opinionText="leadershipOpinionDisabled" 
                :canDelet="canDelet"
                :sendOpinionMaxTime="fromData.sendOpinionMaxTime"
                :nowUserId="nowUserId"
              ></opinionText>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="作者">
              <el-input
                maxlength="200"
                v-model="fromData.muBanVo.author"
                :disabled="editedIdeaFields.author"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="备注">
              <el-input
                v-if="showBzInp  && state == 1"
                maxlength="500"
                type="textarea"
                resize="none"
                autosize
                :disabled="editedIdeaFields.remark"
                v-model="fromData.muBanVo.remark"
                style="margin-top:10px"
              ></el-input>
              <opinionText 
                :opinionText="remark" 
                :canDelet="canDelet"
                :sendOpinionMaxTime="fromData.sendOpinionMaxTime"
                :nowUserId="nowUserId"
              ></opinionText>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="zjyj_title" v-if="showYjzj">意见征集</div>
      <el-form
        ref="yjzj"
        :model="yjzjfromData"
        v-if="showYjzj"
        label-width="110px"
        class="demo_ruleForm"
      >
        <el-row class="zjyj_box">
          <el-col :span="24">
            <el-form-item label="意见征集部门">
              <el-input
                maxlength="500"
                style="margin-right:10px"
                disabled
                type="textarea"
                v-model="yjzjfromData.deptNames"
                resize="none"
                autosize
              ></el-input>
              <el-button
                size="small"
                type="primary"
                class="choose_btn"
                @click="chooseDepart"
                v-if="!showThreeBtn"
                :disabled="this.state != 1"
              >选择</el-button>
              <span v-if="showThreeBtn">
                <el-button
                  size="small"
                  type="primary"
                  @click="addDepart"
                  :disabled="this.state!=1"
                >增发</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="shDepart('shou')"
                  :disabled="this.state!=1"
                >收回</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="shDepart('cuiban')"
                  :disabled="this.state!=1"
                >催办</el-button>
              </span>
              <el-input maxlength="200" style="margin-left:10px" disabled v-model="yjzjfromData.a"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="征集意见">
              <opinionText 
                :opinionText="solicitOpinionDisabled" 
                :canDelet="canDelet"
                :sendOpinionMaxTime="fromData.sendOpinionMaxTime"
                :nowUserId="nowUserId"
              ></opinionText>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="意见附件">
              <el-col>
                <el-scrollbar>
                  <div
                    v-for="item in fromData.muBanVo.feedbackAttachmentList"
                    :key="item.id"
                    class="tree_w"
                  >
                    <template>
                      <div class="command_wrap">
                        <span
                          class="name down"
                          @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fwglfj)"
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
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
      :title="dialoghuiqianTit"
      :visible.sync="chooseDept"
      width="30%"
      @close="canclechooseDept"
    >
      <el-checkbox-group v-model="checkeDept">
        <el-checkbox
          v-for="dept in deptArr"
          :label="dept"
          :key="dept.deptId"
          :disabled="dept.disabled"
        >{{dept.deptName}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canclechooseDept">取 消</el-button>
        <el-button type="primary" @click="handlechooseDept">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="征集状态" :visible.sync="zjVisible" width="60%" @close="cancleZj">
      <el-table
        ref="multipleTable"
        :data="tableDataZj"
        border
        tooltip-effect="dark"
        style="width: 100%"
        class="scroll"
        height="400"
      >
        <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="TMS" label="发送时间">
          <template slot-scope="scope">
            <span>{{scope.row.TMS |formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="UNITNM" label="部门"></el-table-column>
        <el-table-column prop="AVYEXCTRNM" label="处理人"></el-table-column>
        <el-table-column prop="NODENAME" label="征集状态"></el-table-column>
        <el-table-column prop="ENDTM" label="结束时间"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleZj">取 消</el-button>
      </span>
    </el-dialog>
    <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
      :loadingTree="loadingTree"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogTypeDosend"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="fromData.muBanVo"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      :offenDevices="offenDevices"
      @deleteCommonUse="deleteCommonUse"
      @addCommonUse="addCommonUse"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <chooseRange
      :subdialogTit="subdialogTit"
      :subsingelCheckF="subsingelCheckF"
      :chooseRangeData="chooseRangeData"
      @subshowCompDialog="subshowCompDialog"
      :nowCheckList="nowCheckList"
      :nowCheckIds="nowCheckIds"
      :fromdata="fromData"
      v-if="showChooseRang"
    ></chooseRange>
    <treeDepartment
      :treedialogTit="treedialogTit"
      :treesingelCheckF="treesingelCheckF"
      @treeshowCompDialog="treeshowCompDialog"
      :nowCheckList="treeCheckList"
      :nowCheckIds="treeCheckIds"
      :unitCodes="unitCodes"
      :isAdd="isAdd"
      v-if="showTreeDepart"
    ></treeDepartment>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="showTimeLine"></timeDialog>
    <!-- <timeLine v-if="showTimeLine" :processInstId="processInstId" :historyTradeCode="historyTradeCode" @subTimeLine="subTimeLine"></timeLine> -->
    <!--关闭-->
    <el-dialog v-dialogDrag title="关闭" :visible.sync="showCloseDialog">
      <el-row>
        <el-col
          style="text-aling:center;font-size:16px;line-height:60px;text-indent:2em;"
        >是否保存并退出当前页面?</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('2')">否</el-button>
        <el-button type="primary" @click="handleClose('1')">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
import chooseRange from "../components/chooseRange";
import timeLine from "../components/timeLine";
import loadAccessory from "../../../components/LoadAccessory/LoadAccessory";
import timeDialog from "../../../components/timedialog/timedialog";
import appendWriteList from "../../../components/appendWriteList/appendWriteList";
import treeCofig from "../../../components/tree/tree-fawen";
import treeDepartment from "../components/tree-department";
import minixs from "@/minixs/index";
import uploadFiles from "../../../components/uploadFile/uploadFileFw";
import { formatDate } from "@/util/date.js";
import opinionText from "@/components/opinionText/indexfw";
import http from "@/http/http";
export default {
  name: "App",
  components: {
    // loadAccessory,
    timeDialog,
    treeDepartment,
    appendWriteList,
    chooseRange,
    treeCofig,
    uploadFiles,
    opinionText
  },
  mixins: [minixs, viewDraft],
  /**业务代码同addMuban.vue*/
  data() {
    return {
      canDelet: true,
      showCloseDialog: false, //关闭提示
      tableData: [],
      defaultUser: {}, //完成并发送默认值
      unitCodes: "", //过滤部门新增
      readFlag: this.$route.query.readFlag,
      allowBack: "",
      historyTradeCode: this.$businessCode.ggfwgl1,
      treeTradeCode: "",
      dialoghuiqianTit: "",
      typeofHQBM: "",
      offenDevices: [],
      state: this.$route.query.state,
      nowCheckIds: [], // 可见范围选中数据的id
      nowCheckList: [], // 可见范围选中的数据
      treeCheckIds: [], // 征集意见选中数据的id
      treeCheckList: [], // 征集意见选中的数据
      tableDataZj: [], // 意见征集状态
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      /**111 */
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        width: "auto",
        isSpecial: 5,
        formId: "formFile"
      },
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
      /**222 */
      isAdmin: false,
      canEdit: true,
      showPreserve: true,
      showComlete: true,
      showScheme: true,
      showSend: true,
      showZj: false,
      showSh: true,
      showDelect: true,
      showThreeBtn: false,
      attachments: "",
      nowUserId: '', //当前用户id
      fromData: {
        function: "document_save",
        muBanVo: {
          attachSort: [],
          curNodeName: "",
          currentUser: "",
          id: "",
          workflowId: "",
          workflowCode: "",
          authorId: "",
          fabuTime: "",
          fanwen: "0", //0:模板范文；1管理员起草页面
          sampleType: "", //示例类型
          fileType: "", //文件类型
          postType: "", //发文类型
          businessType: "", //业务分类
          redHead: "", //红头
          documentCode: "", //文种
          dealType: "", //处理类型
          qianbaoType: "", //签报类型
          csNumber: "", //呈送字号
          qbNumber: "", //签报字号
          fileTitle: "", //示例标题
          keywords: "",
          visibleRange: [],
          subVisibleRange: [],
          deletefileid: "",
          uploadfileid: "",
          author: "",
          remark: "",
          leadershipOpinion: "",
          attachments: []
        }
      },
      //控制03
      huanJieMessage: {},
      readFields: {
        sampleType: this.statefalse,
        postType: false,
        fileType: false,
        businessType: false,
        redHead: false,
        documentCode: false,
        dealType: false,
        qianbaoType: false,
        qbNumber: false,
        csNumber: false,
        fileTitle: false,
        keywords: false,
        visibleRange: false,
        attachments: false
      },
      requiredFields: {
        sampleType: false,
        postType: false,
        fileType: false,
        businessType: false,
        redHead: false,
        documentCode: false,
        dealType: false,
        qianbaoType: false,
        qbNumber: false,
        csNumber: false,
        fileTitle: false,
        visibleRange: false,
        attachments: false
      }, //必填控制域
      editedIdeaFields: {
        leadershipOpinion: true,
        author: true,
        remark: true
      }, //可编辑意见域
      requiredIdeaFields: {},
      //必填意见域
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "发布", type: "btn_send", show: false },
        { name: "发征集部门", type: "btn_sendZj", show: false },
        { name: "查看征集状态", type: "btn_checkZj", show: false },
        { name: "收回", type: "btn_callBack", show: false },
        { name: "删除此文", type: "btn_del", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],
      yjzjfromData: {
        deptNames: "",
        deptIds: ""
      },
      dosendMubansub_parmas: {
        function: "dosendMubansub",
        deptNames: "",
        deptIds: "",
        avyds: "发送征集部门："
      },
      showYjzj: false,
      // yjzjrules:[]
      leadershipOpinionDisabled: [],
      remark: [],
      rules: {
        sampleType: [
          { required: true, message: "请选择示例类型", trigger: "change" }
        ],
        fileType: [
          { required: true, message: "请选择文件类型", trigger: "change" }
        ],
        postType: [
          { required: true, message: "请选择发文类型", trigger: "change" }
        ],
        businessType: [
          { required: true, message: "请选择业务分类", trigger: "change" }
        ],
        documentCode: [
          { required: true, message: "请选择文种", trigger: "change" }
        ],
        redHead: [
          { required: true, message: "请选择代字红头", trigger: "change" }
        ],
        dealType: [
          { required: true, message: "请选择处理类型", trigger: "change" }
        ],
        qianbaoType: [
          { required: true, message: "请选择签报类型", trigger: "change" }
        ],
        qbNumber: [
          { required: true, message: "请选择签报字号", trigger: "change" }
        ],
        csNumber: [
          { required: true, message: "请选择呈送字号", trigger: "change" }
        ],
        fileTitle: { required: true, message: "请输入标题", trigger: "blur" },
        attachments: {
          required: true,
          message: "请上传附件",
          trigger: "change"
        },
        visibleRange: { required: true, message: "请选择可见范围" }
      },
      delParams: {
        function: "document_delete",
        id: ""
      },
      //   签报
      qbParams: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      //发文
      fwParams: {
        function: "getSendOrderDicByParam",
        organizationId: ""
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: ""
      },
      //完成并发送下拉框
      getNextNodeInfo_parmas: {
        function: "getNextNodeInfo",
        tplNo: "",
        curNodeCode: "",
        multiTenancyId: ""
      },
      selWfNode_parmas: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //完成并发送
      doSendMuBanPo_params: {
        function: "doSendMuBanPo",
        id: "",
        nextUserId: "",
        nextUserName: "",
        nextNodeId: ""
      },
      loadingTree: false,
      detail_params: {
        function: "document_getInfo",
        id: ""
      },
      // 收回
      takeBackSubflow_parmas: {
        function: "takeBackSubflow",
        id: "",
        multiTenancyId: "",
        pcsAvyId: "",
        subProcessInstId: "",
        takeBackDeptNames: ""
      },
      //流程
      getHistoryActInfo_params: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      //征集状态
      getSubProcessInfo_parmas: {
        function: "getSubProcessInfo",
        processInstId: "",
        tplbsnid: "mf_mf_yj"
      },
      //发文下拉框数据
      sendType: [], //发文类型
      businessType: [], //业务类型
      textType: [], //文种
      SredHead: [], //代字红头
      //签报
      qianbaoType: [], //签报类型
      qbNumber: [],
      searchAll_params: {
        function: "setup_SearchAll"
      },
      //常用批示意见
      option_selectCommonUseList: {
        function: "selectCommonUseList",
        id: "",
        userId: "",
        userName: "",
        content: "",
        sort: "",
        createtime: ""
      },
      chooseRangeData: [],
      chooseRangeStr: "",
      title: "模板及范文上传单",
      fileList: [],
      appendWriteDialog: true,
      clickTypes: 1,
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "部门选择", // 弹框标题
      showChooseRang: false,
      showTimeLine: false,
      canTab: false, //标示是否左右三列布局
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      treeData: [],
      dialogTypeDosend: "dosend",
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      offenUse: true, //标示常用设置
      seletOptionsData: [], //弹窗下拉框数据
      infoDisabled: false,
      showSpyj: false, //审批意见
      showBzText: true, //备注展示
      showBzInp: true, //备注输入框
      processInstId: "",
      treesingelCheckF: false, // 单选true 多选为false
      treedialogTit: "选择征集部门", // 弹框标题
      showTreeDepart: false,
      isAdd: false, //是否增发
      deptArr: [],
      checkeDept: [],
      chooseDept: false,
      solicitOpinionDisabled: [],
      continue: false,
      zjVisible: false,
      showUploadFile: false
    };
  },
  filters: {
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    doDraft(fileInfo) {
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      let data = "";
      let fileConfig = fileInfo;
      data = this.$router.resolve({
        path: openPath,
        query: {
          state: "viewFile",
          id: this.uploadConfig.id,
          zhengWenState: 0,
          JYcode: this.$businessCode.fwglfj,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          showBtns: false
        }
      });
      window.open(data.href, "_blank");
    },
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve(1);
          break;
        case "btn_wcbfs":
          this.completeSending();
          break;
        case "btn_del":
          this.delectArticle();
          break;
        case "btn_cklc":
          this.flowScheme();
          break;
        case "btn_send":
          this.sendFile();
          break;
        case "btn_sendZj":
          this.sendZj();
          break;
        case "btn_checkZj":
          this.checkZj();
          break;
        case "btn_callBack":
          this.callBack();
          break;
        case "btn_czzn":
          this.instructions();
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
        this.huanJieMessage.editedIdeaFields
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //可编辑意见域
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          sampleType: [
            {
              required: this.requiredFields.sampleType,
              trigger: "change",
              message: "请选择示例类型"
            }
          ],
          postType: [
            {
              required: this.requiredFields.postType,
              trigger: "change",
              message: "请选择文件类型"
            }
          ],
          fileType: [
            {
              required: this.requiredFields.fileType,
              trigger: "change",
              message: "请选择发文类型"
            }
          ],
          businessType: [
            {
              required: this.requiredFields.businessType,
              trigger: "change",
              message: "请选择业务分类"
            }
          ],
          redHead: [
            {
              required: this.requiredFields.redHead,
              trigger: "change",
              message: "请选择代字/红头"
            }
          ],
          documentCode: [
            {
              required: this.requiredFields.documentCode,
              trigger: "change",
              message: "请选择文种"
            }
          ],
          dealType: [
            {
              required: this.requiredFields.dealType,
              trigger: "change",
              message: "请选择处理类型"
            }
          ],
          qianbaoType: [
            {
              required: this.requiredFields.qianbaoType,
              trigger: "change",
              message: "请选择签报类型"
            }
          ],
          qbNumber: [
            {
              required: this.requiredFields.qbNumber,
              trigger: "change",
              message: "请选择签报字号"
            }
          ],
          csNumber: [
            {
              required: this.requiredFields.csNumber,
              trigger: "change",
              message: "请选择呈送字号"
            }
          ],
          fileTitle: [
            {
              required: this.requiredFields.fileTitle,
              trigger: "change",
              message: "请选择示例标题"
            }
          ],
          attachments: [
            {
              required: this.requiredFields.attachments,
              trigger: "change",
              message: "请上传附件"
            }
          ],
          visibleRange: [
            {
              required: this.requiredFields.visibleRange,
              trigger: "change",
              message: "请选择示例可见范围"
            }
          ]
        };
      });
      setTimeout(() => {
        this.$refs.muban.clearValidate();
      });
      this.$forceUpdate();
    },
    // 关闭
    handleClose(val) {
      if (val == "1") {
        this.preserveAsync().then(save => {
          if (save) {
            window.location.href = "about:blank";
            window.close();
          }
        });
      } else if (val == "2") {
        window.location.href = "about:blank";
        window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
    },
    // 获取签报下拉列表
    getQbList() { 
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.qbParams),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.qianbaoType = res.data.qianbaoType
            ? JSON.parse(res.data.qianbaoType)
            : [];
          this.qbNumber = res.data.qbZihaoList
            ? JSON.parse(res.data.qbZihaoList)
            : [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取发文下拉列表
    getFwList() { 
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.fwParams),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.sendType = JSON.parse(res.data.sendType);
          this.businessType = JSON.parse(res.data.businessType);
          this.textType = JSON.parse(res.data.textType);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化
    getDetail() { 
      let that = this;
      that.detail_params.id = that.$route.query.id;
      that.uploadConfig.id = that.$route.query.id;
      that.$post
        .postData(
          "document_getInfo",
          JSON.stringify(that.detail_params),
          that.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res.data);
          that.fromData.muBanVo = Object.assign(
            that.fromData.muBanVo,
            res.data
          );
          if (that.fromData.muBanVo.curNodeCode == "001") {
            that.getQbList();
            that.getFwList();
          }
          that.unitCodes = res.data.deptId;
          that.remark = res.data.opinionMap.remark;
          that.leadershipOpinionDisabled =
            res.data.opinionMap.leadershipOpinionDisabled;

          that.processInstId = res.data.processInstId;
          
          that.canDelet = !res.data.signState==1; // SignState值为0时是未发过征集意见，1是已发过征集意见
          let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
          that.nowUserId = userInfo.humanId || ''
          if (that.state == 2) {
            that.$post
              .postData(
                "checkTakeBack",
                JSON.stringify({
                  function: "checkTakeBack",
                  processInstId: res.data.processInstId
                }),
                that.$businessCode.fwgl1
              )
              .then(res => {
                that.allowBack = res.allowBack;
              });
          }

          if (that.readFlag != 1) {
            that.$post
              .postData(
                "doUpdateReadRecord",
                JSON.stringify({
                  function: "doUpdateReadRecord",
                  pcsAvyId: that.fromData.muBanVo.pcsAvyId,
                  processInstId: that.fromData.muBanVo.processInstId,
                  multiTenancyId: that.fromData.muBanVo.multiTenancyId
                }),
                that.$businessCode.fwgl1
              )
              .then(res => {
                //更新状态用。暂时不用任何操作
                if (res && res.success) {
                  window.opener.location.reload();
                }
              });
          }

          /**111 */
          if (res.data.processInstId) {
            that.$post
              .postData(
                "getNextUserTaskNode",
                JSON.stringify({
                  function: "getNextUserTaskNode",
                  processInstId: res.data.processInstId
                }),
                that.$businessCode.ggfwgl1
              )
              .then(res => {
                that.huanJieMessage = res.data.extAttributes;
                if (that.state == 1) {
                  that.setConfig();
                  that.setFormConfig();
                }
              })
              .catch(err => {
                console.log(err);
              });
            //readFlag
            // if(that.readFlag != 1){
            //   that.getReadFlag();
            // }
          } else {
            that.$post
              .postData(
                "getpcsTplStartNode",
                JSON.stringify({
                  function: "getpcsTplStartNode",
                  multiTenancyId: res.data.multiTenancyId
                }),
                that.$businessCode.ggfwgl1
              )
              .then(res => {
                that.huanJieMessage = res.data;
                that.setConfig();
                that.setFormConfig();
              })
              .catch(err => {
                console.log(err);
              });
          }

          that.fromData.muBanVo.curNodeCode = res.data.curNodeCode;
          // alert(res.data.curNodeCode)
          // debugger
          that.btnShow();

          let rangeArr = [];
          that.nowCheckList = JSON.parse(res.data.visibleRange) || [];
          that.fromData.muBanVo.visibleRange =
            JSON.parse(res.data.visibleRange) || [];
          that.nowCheckList.forEach(item => {
            that.nowCheckIds.push(item.id);
            rangeArr.push(item.name);
          });
          that.chooseRangeStr = rangeArr.join("，");

          if (res.data.subVisibleRange&&res.data.subVisibleRange.length>0) {
            let transDptN = [], transDptI = [];
            let arr = JSON.parse(res.data.subVisibleRange);
            arr.forEach(item => {
              transDptN.push(item.name);
              transDptI.push(item.id);
            });
            that.yjzjfromData.deptNames = transDptN.join(";");
            that.yjzjfromData.deptIds = transDptI.join(";");
          } else {
            that.yjzjfromData.deptNames = "";
            that.yjzjfromData.deptIds = "";
          }

          that.showThreeBtn = res.data.signState==1;
          
          that.treeCheckList = res.data.subVisibleRange
            ? JSON.parse(res.data.subVisibleRange)
            : [];
          that.fromData.muBanVo.subVisibleRange = res.data.subVisibleRange;
          if (that.treeCheckList && that.treeCheckList.length) {
            JSON.parse(res.data.subVisibleRange).forEach(item => {
              that.treeCheckIds.push(item.id);
            });
          }

          //已上传的文件
          that.solicitOpinionDisabled =
            res.data.opinionMap.solicitOpinionDisabled;
          console.log(that.fromData.muBanVo);
          that.processInstId = that.fromData.muBanVo.processInstId;

          if (
            res.data.solicitOpinionDepFinash != undefined &&
            res.data.solicitOpinionDepFinash != ""
          ) {
            that.yjzjfromData.a = res.data.solicitOpinionDepFinash;
          } else {
            that.yjzjfromData.a = "";
          }
          if (res.data.chiProcessInstId) {
            that.deptArr = res.data.chiProcessInstId;
          }

          console.log(that.fromData.muBanVo.attachments);
          that.uploadConfig.filesHas = that.fromData.muBanVo.attachments;
          that.fromData.muBanVo.attachSort = [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    btnShow() {
      console.log(this.fromData.muBanVo.curNodeCode);
      if (this.fromData.muBanVo.curNodeCode == "001") {
        //拟稿
        this.showPreserve = true;
        this.showComlete = true;
        this.showScheme = true;
        this.showDelect = true;
        this.showUploadFile = true;
        if (this.isAdmin) {
          this.showSend = true;
          this.showScheme = false;
          this.showComlete = false;
        }
      } else if (this.fromData.muBanVo.curNodeCode == "003") {
        //处审核
        this.canEdit = false;
        this.infoDisabled = true;
        this.showPreserve = true;
        this.showComlete = true;
        this.showScheme = true;
        this.showSend = true;
        this.showUploadFile = true;
      } else if (this.fromData.muBanVo.curNodeCode == "002") {
        //综合处理
        this.showPreserve = true;
        this.showComlete = true;
        this.showYjzj = true;
      } else if (this.fromData.muBanVo.curNodeCode == "004") {
        //申请部门领导审批
        this.infoDisabled = true;
        this.showUploadFile = true;
      } else if (this.fromData.muBanVo.curNodeCode == "800") {
        //处理完毕办结
        this.canEdit = false;
        this.showBzInp = false;
        this.showYjzj = true;
      }
    },
    checkZj() {
      this.zjVisible = true;
      this.getSubProcessInfo_parmas.processInstId = this.processInstId;
      this.$post
        .postData(
          "getSubProcessInfo",
          JSON.stringify(this.getSubProcessInfo_parmas),
          this.$businessCode.ggfwgl1
        )
        .then(res => {
          if (res.data) {
            console.log(res.data);
            this.tableDataZj = res.data;
          }
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.fromData.muBanVo.redHead = ""
      this.getTcDocTypeDicByParam();
    },
    //获取代字红头
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.data) {
            this.SredHead = res.data;
          }
        });
    },
    goBack() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    upSuccess(response, file, fileList) {},
    upError(err, file, fileList) {
      console.log(err, file);
    },
    writelistvalue(data) {
      if (data) {
        console.log(data);
        this.fromData.muBanVo.leadershipOpinion =
          this.fromData.muBanVo.leadershipOpinion != ""
            ? this.fromData.muBanVo.leadershipOpinion + data
            : data;
      }
    },
    getCommonUse() {
      console.log(this.option_selectCommonUseList);
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.option_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.option_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.option_selectCommonUseList.function = "selectCommonUseList";
      this.$post
        .postData(
          "selectCommonUseList",
          JSON.stringify(this.option_selectCommonUseList),
          this.$businessCode.fwgl1
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
              duration: 1000
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 1000
          });
        });
    },
    addCommonUse(flag, id, content) {
      console.log(this.fromData.muBanVo.id);
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.option_selectCommonUseList.id = id;
      this.option_selectCommonUseList.content = content;
      this.option_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.option_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.option_selectCommonUseList.function = "doSaveCommonUse";
      this.$post
        .postData(
          "doSaveCommonUse",
          JSON.stringify(this.option_selectCommonUseList),
          this.$businessCode.fwgl1
        )
        .then(res => {
          if (res && res.success) {
            this.getCommonUse();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "添加常用批语失败",
            duration: 1000
          });
        });
    },
    // 删除常用批示意见
    deleteCommonUse(flag, id, content) {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.option_selectCommonUseList.id = id;
      this.option_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.option_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.option_selectCommonUseList.function = "doDeleteCommonUseList";
      this.$post
        .postData(
          "doDeleteCommonUseList",
          JSON.stringify(this.option_selectCommonUseList),
          this.$businessCode.fwgl1
        )
        .then(res => {
          if (res && res.success) {
            this.getCommonUse();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
            return;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 1000
          });
        });
    },
    writelistbox() {
      this.appendWriteDialog = true;
      this.getCommonUse(0);
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    chooseBtn() {
      this.$post
        .postData(
          "setup_SearchAll",
          JSON.stringify(this.searchAll_params),
          this.$businessCode.ggfwgl1
        )
        .then(res => {
          console.log(res);
          // let chooseRangeObj = Object.assign({},res.data)
          this.chooseRangeData = res.data;
          if (res.data) {
            this.showChooseRang = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    chooseDepart() {
      this.treeshowCompDialog(this.treeCheckList, true);
      // this.showTreeDepart = true;
    },
    addDepart() {
      this.isAdd = true;
      this.treeshowCompDialog(this.treeCheckList, true);
      // this.showTreeDepart = true;
    },
    subshowCompDialog(data, type) {
      // console.log(data);
      if (type) {
        this.nowCheckIds = [];
        this.fromData.muBanVo.visibleRange = this.nowCheckList = data;
        let checkArr = [];
        data.forEach(item => {
          checkArr.push(item.name);
          this.nowCheckIds.push(item.id);
        });
        this.chooseRangeStr = checkArr.join("，");
      } else {
        
      }
      this.showChooseRang = false;
    },
    flowScheme() {
      this.showTimeLine = true;
      let params;
      if (this.processInstId != undefined && this.processInstId != "") {
        this.getHistoryActInfo_params.processInstId = this.processInstId;
        params = this.getHistoryActInfo_params;
      } else {
        params = this.AddgetHistoryActInfo_params;
      }
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(params),
          this.historyTradeCode
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.tableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          }
        });
    },
    subTimeLine() {
      this.showTimeLine = false;
    },
    async completeSending() {
      this.treeData = [];
      this.$refs["muban"].validate(async valid => {
        if (valid) {
          await this.preserve(2); // 1表示直接保存  2表示完成并发送后的保存
        } else {
          console.log("error submit!!");
          this.continue = false;
          return false;
        }
      });
    },
    async preserve(type) {
      // if (type === "uploadfile") {  //这段代码好像没用
      //   /**111 */
      //   if (this.doSendMuBanPo_params.id != "") {
      //     this.$refs.uploadComponent.uploadFileNow();
      //     return;
      //   } else {
      //     this.$message.error("请先保存!");
      //     return;
      //   }
      // }
      this.fromData.function = "document_save";
      // console.log(this.fromData.muBanVo.keywords)
      // this.fromData.muBanVo = Object.assign(this.fromData.muBanVo,{keywords:this.fromData.muBanVo.keywords})
      // console.log(this.fromData.muBanVo)
      let res = await this.$post.postData(
        "document_save",
        JSON.stringify(this.fromData),
        this.$businessCode.fwgl1
      );
      this.doSendMuBanPo_params.id = res.data.id;
      this.getNextNodeInfo_parmas.tplNo = res.data.tplNo; //弹出dialog中的下拉框 参数
      this.getNextNodeInfo_parmas.curNodeId = res.data.curNodeCode;
      this.getNextNodeInfo_parmas.multiTenancyId = res.data.multiTenancyId;
      this.selWfNode_parmas.curTplNo = res.data.tplNo; //弹出dialog中的树 参数
      this.selWfNode_parmas.curMultiTenancyId = res.data.multiTenancyId;
      // this.selWfNodeParmas.curTplNo = res.data.pTplNo
      if (res.success) {
        if (type != 2) {
          this.$message({
            message: "保存成功!",
            type: "success"
          });
          debugger
          //页面url上+ id
          this.$router.replace({
            path: "/detailFw",
            query: {
              id: res.data.id,
              state: this.state
            }
          });
          this.getDetail(res.data.id);
        }
        this.fromData.muBanVo.id = res.data.id;
        if (res.data.id) {
          this.isPreserve = true;
        }

        if (type === "uploadfile") {
          this.uploadConfig.id = res.data.id;
          this.fromData.muBanVo.id = res.data.id;
          this.$refs.uploadComponent.uploadFileNow();
        }

        if (type == 2) {
          let res1 = await this.$post.postData(
            "getNextNodeInfo",
            JSON.stringify(this.getNextNodeInfo_parmas),
            this.$businessCode.fwgl1
          );
          let parmSelf = Object.assign(
            this.selWfNode_parmas,
            this.fromData.muBanVo
          );
          parmSelf.pcsAvyId = res1.data[0] ? res1.data[0].PCSAVYID : "";

          this.fromData.function = "selWfNode";
          let res2 = await this.$post.postData(
            "selWfNode",
            JSON.stringify(parmSelf),
            this.$businessCode.fwgl1
          );

          if (res.data[0] && res.data[0].file_name) {
            this.attachments = "123";
            this.setConfig();
            this.setFormConfig();
          }
          console.log(res1, res2);
          this.seletOptionsData = res1.data; //下拉框数据
          if (res2.message == "Loading") this.loadingTree = true;
          this.treeData = (res2.data && res2.data.data) || [];
          this.defaultUser = (res2.data && res2.data.defaultUser) || {};
          this.dialogState = true;
        }
      }

      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    //同步保存
    async preserveAsync(type) {
      let successState = false;
      this.fromData.function = "document_save";
      await this.$post
        .postData(
          "document_save",
          JSON.stringify(this.fromData),
          this.$businessCode.fwgl1
        )
        .then(res => {
          if (res && res.success) {
            window.opener && window.opener.location.reload();
            successState = true;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "保存失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 2000
          });
        });
      return successState;
    },
    sendFile() {
      if(this.chooseRangeStr=="") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择可见范围",
          duration: 2000
        });
        return;
      }
      this.fromData.function = "dofinishworkflow";

      if (this.leadershipOpinionDisabled.length > 0) {
        this.$post
          .postData(
            "dofinishworkflow",
            JSON.stringify(this.fromData),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: "发布成功!",
                type: "success"
              });
              this.$router.push("/modelFw");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.error("审批意见不能为空!");
      }
    },
    //收回
    callBack() {
      this.fromData.function = "doWithdrawTask";
      console.log(this.fromData);
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify(this.fromData),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "收回成功!",
              type: "success"
            });
            this.$router.push("/modelFw");
          } else {
            this.$message.error("收回失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delectArticle() {
      if (this.fromData.muBanVo.id !== "") {
        this.delParams.id = this.fromData.muBanVo.id;
      }
      this.$confirm("是否删除此文?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post
          .postData(
            "document_delete",
            JSON.stringify(this.delParams),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: "删除成功!",
                type: "success",
                showClose: true,
                duration: 1500,
                onClose: () => {
                  window.location.href = "about:blank";
                  window.opener.location.reload();
                  window.close();
                }
              });
            } else {
              this.$message.error("删除失败!");
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    treeshowCompDialog(data, type) {
      let that = this;
      this.fromData.muBanVo.subVisibleRange = this.treeCheckList = data || [];
      this.showTreeDepart = type;
      // console.log(this.fromData.muBanVo.chiProcessInstId)
      debugger
      if (!type||this.isAdd) {
        let deptNamesArr = [];
        let deptIdsArr = [];
        this.treeCheckIds = []
        data.forEach(item => {
          deptNamesArr.push(item.name);
          deptIdsArr.push(item.id);
          this.treeCheckIds.push(item.id);
        });
        console.log(this.yjzjfromData.deptNames);
        // console.log(this.yjzjfromData.deptNames);
        // this.yjzjfromData.deptNames = this.yjzjfromData.deptNames==''?deptNamesArr.join(';'):this.yjzjfromData.deptNames+deptNamesArr.join(';')
        // this.yjzjfromData.deptIds = this.yjzjfromData.deptIds==''?deptIdsArr.join(';'):this.yjzjfromData.deptIds+deptIdsArr.join(';')
        that.treeCheckList.map(item => {
          //选中的不可操作
          item.disabled = true;
        });
        if (
          this.isAdd &&
          data.length != this.fromData.muBanVo.chiProcessInstId.length
        ) {
          this.sendZj(data);
        }
        this.showZj = true;
        this.yjzjfromData.deptNames = deptNamesArr.join(";");
        this.yjzjfromData.deptIds = deptIdsArr.join(";");
        this.setConfig();
        this.setFormConfig();
      } else {
        that.treeCheckList.map(item => {
          //选中的不可操作
          item.disabled = false;
        });
        if (this.treeCheckList.length == 0) {
          this.treeCheckIds = [];
        } else {
          this.treeCheckIds = [];
          data.forEach(item => {
            this.treeCheckIds.push(item.id);
          });
        }
      }
    },
    sendZj(data) {
      if (this.isAdd) {
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let that = this;

        this.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });

          oldIds = this.yjzjfromData.deptIds.split(";");
          oldNames = this.yjzjfromData.deptNames.split(";");
          console.log(oldIds instanceof Array, oldNames instanceof Array, ids instanceof Array, names instanceof Array)
          newIds = ids.filter(item => {
            return oldIds.indexOf(item) == -1;
          });
          newNames = names.filter(item => {
            return oldNames.indexOf(item) == -1;
          });

          names = names.join(";");
          ids = ids.join(";");
          newIds = newIds.join(";");
          newNames = newNames.join(";");

          this.dosendMubansub_parmas.deptNames = newNames;
          this.dosendMubansub_parmas.deptIds = newIds;
          this.dosendMubansub_parmas.avyds = "增发征集部门：" + newNames;
        }
      } else {
        this.dosendMubansub_parmas.deptNames = this.yjzjfromData.deptNames;
        this.dosendMubansub_parmas.deptIds = this.yjzjfromData.deptIds;
        this.dosendMubansub_parmas.avyds =
          "发送征集部门：" + this.yjzjfromData.deptNames;
      }

      this.dosendMubansub_parmas.processInstId = this.processInstId;
      this.dosendMubansub_parmas.pcsAvyId = this.fromData.muBanVo.pcsAvyId;
      this.dosendMubansub_parmas.curNodeCode = this.fromData.muBanVo.curNodeCode;
      this.dosendMubansub_parmas.id = this.$route.query.id;
      this.dosendMubansub_parmas.multiTenancyId = this.fromData.muBanVo.multiTenancyId;
      this.dosendMubansub_parmas.tplNo = this.fromData.muBanVo.tplNo;
      // this.dosendMubansub_parmas.subVisibleRange = this.fromData.muBanVo.subVisibleRange;
      console.log(this.dosendMubansub_parmas)
      this.$post
        .postData(
          "dosendMubansub",
          JSON.stringify(this.dosendMubansub_parmas),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.showThreeBtn = false;
            this.$message({
              showClose: true,
              message: "发送成功",
              type: "success"
            });
            this.getDetail();
          } else {
            this.getDetail();
            this.$message({
              showClose: true,
              message: res.message,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    },
    showCompDialog(data, type, a, selectInfo) {
      this.dialogState = false;
      console.log(data, selectInfo);
      if (type) {
        let nextUserId = data[0].id;
        this.doSendMuBanPo_params.nextUserId = nextUserId;
        this.doSendMuBanPo_params.nextUserName = data[0].name;
        this.doSendMuBanPo_params.nextNodeId = selectInfo.id;
        this.doSendMuBanPo_params.nextNodeName = selectInfo.name;
        console.log(this.doSendMuBanPo_params);
        this.$post
          .postData(
            "doSendMuBanPo",
            JSON.stringify(this.doSendMuBanPo_params),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              this.dialogState = false;
              this.$message({
                message: "发送成功!",
                type: "success"
              });
              setTimeout(() => {
                this.goBack();
              }, 2000);
            }
          })
          .catch(err => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    shDepart(type) {
      if (!this.deptArr||this.deptArr.length<=0) {
        this.$message({
          type: "info",
          message: "没有需要收回的部门可供选择！"
        });
        return;
      }
      this.chooseDept = true; // 打开收回弹窗
      this.typeofHQBM = type;
      if (type == "shou") {
        this.dialoghuiqianTit = "选择需要收回的意见征集部门";
      } else {
        this.dialoghuiqianTit = "选择需要催办的意见征集部门";
      }
        let shouhui_parmas = {
          function: "getSubWfInfo",
          id: this.$route.query.id,
          multiTenancyId: this.fromData.muBanVo.multiTenancyId,
          processInstId: this.processInstId,
          pcsAvyId: this.fromData.muBanVo.pcsAvyId,
          serviceIntans: "MF_MF_YJ"
        };

        this.$post
          .postData(
            "getSubWfInfo",
            JSON.stringify(shouhui_parmas),
            this.$businessCode.fwgl1
          )
          .then(res => {
            let desabledIdArr = [];
            res.data.forEach((item, i) => {
              if (item.processState == "未处理") {
                desabledIdArr.push(item.deptId);
              }
            });

            if (this.deptArr.length > 0) {
              this.deptArr.forEach((node, n) => {
                let disCheck = true;
                desabledIdArr.forEach((item, i) => {
                  if (node.deptId == item) {
                    disCheck = false;
                  }
                });
                this.deptArr[n].disabled = disCheck;
              });
            }

            this.$forceUpdate();
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: "warning"
            });
          });
      
    },
    handlechooseDept() {
      let that = this;
      console.log(that.checkeDept);
      if (that.checkeDept.length == 0) {
        that.$message({
          showClose: true,
          message: "请" + that.dialoghuiqianTit,
          type: "warning"
        });
        return;
      }

      let deptNamesArr = [];
      let processInstIdArr = [];
      that.checkeDept.forEach(item => {
        deptNamesArr.push(item.deptName);
        processInstIdArr.push(item.processInstId);
      });
      that.takeBackSubflow_parmas.id = that.$route.query.id;
      that.takeBackSubflow_parmas.multiTenancyId = that.fromData.muBanVo.multiTenancyId;
      that.takeBackSubflow_parmas.pcsAvyId = that.fromData.muBanVo.pcsAvyId;
      that.takeBackSubflow_parmas.subProcessInstId = processInstIdArr.join(";");
      that.takeBackSubflow_parmas.takeBackDeptNames = deptNamesArr.join(";");
      // that.takeBackSubflow_parmas.subVisibleRange = that.fromData.muBanVo.subVisibleRange;
      if (that.typeofHQBM === "shou") {
        that.$post
          .postData(
            "takeBackSubflow",
            JSON.stringify(that.takeBackSubflow_parmas),
            that.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              that.chooseDept = false;
              that.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 2000
              });
              that.isAdd = that.yjzjfromData.deptNames == "" ? false : true;
              deptNamesArr.forEach(m => {
                that.treeCheckList.forEach(n => {
                  that.treeCheckList.splice(that.treeCheckList.findIndex(n => n.text==m), 1)
                })
              })
              processInstIdArr.forEach(m => {
                that.treeCheckIds.forEach(n => {
                  that.treeCheckIds.splice(that.treeCheckIds.findIndex(n => n.text==m), 1)
                })
              })
              //isAdd false是选择，true是增发
              that.isAdd = that.treeCheckList.length == 0 ? false : true;
              that.getDetail();
            } else {
              that.getDetail();
              that.$message({
                showClose: true,
                message: res.message,
                type: "warning"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: "warning"
            });
          });
      } else {
        let parms = {
          function: "urgeHandle",
          subProcessInstId: processInstIdArr.join(";"),
          multiTenancyId: this.fromData.muBanVo.multiTenancyId,
          pcsAvyId: this.fromData.muBanVo.pcsAvyId,
          tplbsnid: "MF_MF_YJ"
        };
        this.$post
          .postData(
            "urgeHandle",
            JSON.stringify(parms),
            this.$businessCode.ggfwgl1
          )
          .then(res => {
            if (res.success) {
              this.chooseDept = false;
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "催办成功",
                duration: 2000
              });
              this.getDetail();
            } else {
              this.getDetail();
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 2000
              });
              return;
            }
            this.shdialog = false;
          });
      }
    },
    canclechooseDept() {
      this.chooseDept = false;
      this.checkeDept = [];
    },
    upRow(n) {
      let midObj;
      this.fromData.muBanVo.attachSort.push(
        {
          id: this.fromData.muBanVo.attachments[n - 1].id,
          sort: this.fromData.muBanVo.attachments[n].sort
        },
        {
          id: this.fromData.muBanVo.attachments[n].id,
          sort: this.fromData.muBanVo.attachments[n - 1].sort
        }
      );
      midObj = this.fromData.muBanVo.attachments[n];
      this.fromData.muBanVo.attachments[n] = this.fromData.muBanVo.attachments[
        n - 1
      ];
      this.fromData.muBanVo.attachments[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromData.muBanVo.attachSort.push(
        {
          id: this.fromData.muBanVo.attachments[n + 1].id,
          sort: this.fromData.muBanVo.attachments[n].sort
        },
        {
          id: this.fromData.muBanVo.attachments[n].id,
          sort: this.fromData.muBanVo.attachments[n + 1].sort
        }
      );
      midObj = this.fromData.muBanVo.attachments[n];
      this.fromData.muBanVo.attachments[n] = this.fromData.muBanVo.attachments[
        n + 1
      ];
      this.fromData.muBanVo.attachments[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.bank_deleteFileById.id = id;
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify(this.bank_deleteFileById),
            this.$businessCode.fwglfj
          )
          .then(res => {
            console.log(res);
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "删除成功",
                  duration: 500
                });
                this.fromData.muBanVo.attachments.splice(n, 1);
                this.uploadConfig.filesHas = this.fromData.muBanVo.attachments;
                this.attachments = "";
                this.setConfig();
                this.setFormConfig();
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "删除失败",
                  duration: 500
                });
              }
            }
          });
      });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fwglfj
        )
        .then(res => {
          console.log(res);
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
    cancleZj() {
      this.zjVisible = false;
    },
    getReadOnly() {
      if (this.$route.query.state != 1) {
        for (let i in this.readFields) {
          this.readFields[i] = true;
        }
        for (let i in this.editedIdeaFields) {
          this.editedIdeaFields[i] = true;
        }
      }
    },

    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "MBFWGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.fromData.muBanVo.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromData.muBanVo.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.fwbz //流程交易线     chai
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

    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile.fileName;
      self.bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fwbzfj
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
    }
  },
  created() {
    //初始化加载数据
    // this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    // this.bank_doSend.id = this.bank_dispach.id;
    
    this.uploadConfig.code = this.$businessCode.fwglfj;
    this.uploadConfig.newcode = this.$businessCode.fwgl;

    this.treeTradeCode = this.$businessCode.ggfwgl1; //人员树交易线

    this.getReadOnly();

    if (JSON.parse(localStorage.getItem("userInfo"))) {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.fromData.muBanVo.author = userInfo.humanName;
    }
    if (JSON.parse(localStorage.getItem("tcHumanRole"))) {
      let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.isAdmin = tcHumanRole.some(item => {
        item.codeName == "系统管理员" || item.codeName == "超级管理员";
      });
      console.log(this.isAdmin);
    }
    this.getDetail();
  },
  watch: {
    "fromData.muBanVo.fileType": function(newv, oldv) {
      if (oldv == "发文") {
        this.fromData.muBanVo.postType = "";
        this.fromData.muBanVo.businessType = "";
        this.fromData.muBanVo.redHead = "";
        this.fromData.muBanVo.documentCode = "";
      } else if (oldv == "签报") {
        this.fromData.muBanVo.dealType = "";
        this.fromData.muBanVo.qianbaoType = "";
        this.fromData.muBanVo.qbNumber = "";
      } else if (oldv == "呈送件") {
        this.fromData.muBanVo.dealType = "";
        this.fromData.muBanVo.csNumber = "";
      }
    }
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
.form_content {
  width: 92%;
  margin: 0 auto;
  background-color: #ffffff14;
  border: 1px solid #bfbfbf;
  padding: 10px 20px;
  margin-bottom: 20px;
  .form_tip {
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid #faaa20;
    background-color: #fef7e7;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
    .red {
      color: #ff3300;
    }
  }
  .choose_sl {
    width: 100%;
    min-height: 50px;
    padding-left: 10px;
    line-height: 30px;
    margin-top: 10px;
    border: 1px solid #dcdfe6;
  }
  .el-select {
    width: 100%;
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
.spyj_warp {
  min-height: 70px;
  // height: 55px;
  padding: 20px;
  background-color: #e4e7ed52;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}
.spyj_box {
  height: 55px;
  border: 1px solid #eee;
  padding: 10px 20px;
  background-color: #f2f2f2;
  color: #392a31;
  border-bottom: 1px solid #dac6c5;
  .spyj_left {
    float: left;
  }
  .spyj_right {
    float: right;
  }
}
.zjyj_title {
  padding-left: 34px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #3b85ef;
}
.zjyj_box .el-input {
  width: 37%;
}
.zjyj_box .el-textarea {
  width: 37%;
}
.choose_btn {
  margin: 0 15px;
}
.text {
  // display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .spanname {
    margin-right: 10px;
  }
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  padding: 10px 20px;
  float: right;
}
/deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #f00;
}
/deep/.el-form-item__content {
  margin-left: 0;
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
