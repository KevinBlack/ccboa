<template>
  <div id="receiveSponsorDetail" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>中国建设银行收文协办单
        </p>
        <div class="grid_comtent" v-if="fromdata.isMutil == 1">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button size="small" plain @click="shxbr('sh')" v-if="fromdata.isShowSendXb ==false&&fromdata.isLastXb==false"  v-show="readonlySwcy">收回</el-button>
          <el-button size="small" plain @click="shxbr('cb')" v-if="fromdata.isShowSendXb ==false&&fromdata.isLastXb==false"  v-show="readonlySwcy">催办</el-button>
          <el-button size="small" plain @click="viewDraftFile(fromdata.fileName, fromdata.filePath, $businessCode.swglfj,fromdata.title,fromdata.documentCode)" v-if="fromdata.filePath">查看正文</el-button>
          <el-button size="small" plain @click="completeSendingDr" v-if="fromdata.isShowSendXb ==true&&fromdata.isLastXb==false"  v-show="readonlySwcy">选择协办人</el-button>
          <el-button size="small" plain @click="shdialog2 = true"  v-show="readonlySwcy">反馈意见</el-button>
          
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet('/swxbd')">打印处理单</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
          <el-button size="small" plain @click="caozuozhinan"  v-show="readonlySwcy">操作指南</el-button>
        </div>
        <div class="grid_comtent" v-else>
          <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button size="small" v-for="(item,index) in buttonList" @click="buttonClick(item.type)" :key="index"
                     v-show="buttonList[index].show"
                     :disabled="cantDisabled"
                     plain>{{ item.name }}
          </el-button>
        </div>
      </el-col>
    </el-row>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
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
    <!-- 多人协办反馈意见弹窗 -->
    <el-dialog title="反馈意见" :visible.sync="shdialog2" width="50%" show-close="false" :before-close="handleCloseshdialog2" v-dialogDrag>
      <el-card>
        <el-input
          type="textarea"
          maxlength="500"
          resize="none"
          autosize
          @input="changeDage($event)"
          v-model="fromdata.processOpinion"
        ></el-input>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qxdialog2">取 消</el-button>
        <el-button type="primary" @click="doFinishManyAssist">确 定</el-button>
      </span>
    </el-dialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{ fromdata.documentTitle }}</h3>
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
                  <el-form-item label="收文字号">
                    <el-input v-model="fromdata.documentCode" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input type="textarea" autosize resize="none" v-model="fromdata.attachmentTitle"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-col :span="8">
                    <el-form-item label="收文日期">
                      <el-date-picker
                        type="date"
                        disabled
                        placeholder="选择日期"
                        v-model="fromdata.receiveTime"
                        style="width: 100%;"
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
                  >
                    <el-input v-model="fromdata.userName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8">
                    <el-input v-model="fromdata.secretType" disabled></el-input>
                  </el-form-item>
                </el-col>
                <div>
                </div>
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
                        v-model="fromdata.secretFlagType" disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="linecenter">
                    <el-form-item label="/" label-width="20px">
                      <el-input
                        :value="fromdata.secretLimitType" disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div v-if="!((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
                  <el-col>
                    <el-form-item label="转发文件" prop="isForword" ref="isForword">
                      <el-radio-group disabled v-model="fromdata.isForword">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item
                      label="转发要求"
                      prop="forwordRequirements"
                      ref="forwordRequirements"
                      v-show="fromdata.isForword *1"
                    >
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        disabled
                        :class="[{'bluecolor':fromdata.forwordRequirements !=''}]"
                        v-model="fromdata.forwordRequirements"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-show="fromdata.isForword*1">
                    <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                      <el-radio-group disabled v-model="fromdata.isDirect">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="直发范围"
                      prop="directRange"
                      ref="directRange"
                      v-show="fromdata.isDirect*1"
                    >
                      <el-input
                        disabled
                        v-model="fromdata.directRange" placeholder="请选择">

                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="直发文种类"
                      prop="directType"
                      ref="directType"
                      v-show="fromdata.isDirect*1"
                    >
                      <el-input
                        disabled
                        v-model="fromdata.directType">
                      </el-input>
                    </el-form-item>
                  </el-col>
<!--                  <el-col>
                    <el-form-item label="发送对象"
                                  v-show="fromdata.isForword *1"
                                  prop="sendSubName" ref="sendSubName">
                      <el-input
                        v-model="fromdata.sendSubName"
                        placeholder="请选择发送对象"
                        disabled
                        style="width: 100%;"
                      >
                        <el-button slot="append" :disabled="readFields.sendSubName" icon="el-icon-plus"
                                   @click="getTreeData('fasong')"></el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>-->
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
                      v-model="fromdata.assistDeptName" disabled :title="fromdata.assistDeptName"
                      placeholder="请选择协办部门"
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <h6 class="bank_dispach_file_tit">签批意见</h6>
              <div id="qpyj1" class="height_90"></div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="批示意见">
                    <div v-if="!(fromdata.pishiOpinionList && fromdata.pishiOpinionList.length>0)">
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
                    <div v-if="!(fromdata.officeOpinionList && fromdata.officeOpinionList.length>0)">
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
                  <el-form-item label="办结情况">
                    <div v-if="!(fromdata.handleTerminateOpinionList&&fromdata.handleTerminateOpinionList.length>0)">
                      <el-input type="textarea" resize="none" autosize disabled></el-input>
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
                    <el-row class="d_b100 opinionTbody" v-if="fromdata.circulateOpinionList && fromdata.circulateOpinionList.length>0">
                      <div v-for="(item,index) in fromdata.circulateOpinionList" :key="index" class="opinionTd">
                        <div class="d_flex">
                          <el-col
                            class="pos_r"
                          >
                            <div class="lineContent">
                              <div>{{ item.opinions }}</div>
                              <div class="adviceInfo">
                                {{ item.opinionDeptName }}
                                <span class="pad_lr10">{{ item.curUser }}</span>
                                <br>
                                <span class="pad_lr10 timeFont">{{ item.opinionCreateTime }}</span>
                              </div>
                            </div>
                            <div
                              class="deletIcon"
                              v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId&&item.nodeCode==fromdata.curNodeCode"
                              @click="deletService(item.id)"
                            >
                              <i data-v-648654e0="" class="icon-font el-icon-delete"></i>
                            </div>
                          </el-col>
                        </div>
                      </div>
                    </el-row>
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
                    <div v-for="(item,index) in fromdata.receiveDocFileList" :key="item.id" class="comp_list">
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
                <uploadFiles ref="uploadComponent" @preserve="preserve" :uploadConfig="uploadConfig1"></uploadFiles>
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
                            <div class="btns">
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id)"
                                :disabled="item.disabled"
                                round
                              >删除
                              </el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                round
                              >下载
                              </el-button>
                            </div>
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
            <div id="qpyj" class="height_90"></div>
            <div class="pr45">
              <el-row>
                <el-col>
                  <el-form-item label="最终意见">
                    <template>
                      <div class="fix_height">
                        <el-input
                          type="textarea"
                          maxlength="500"
                          resize="none"
                          rows="3"
                          autosize
                          @input="changeDage($event)"
                          v-model="fromdata.finalOpinion"
                          :disabled="editedIdeaFields.finalOpinion"
                          v-if="fromdata.finalOpinion!=''||!editedIdeaFields.finalOpinion||(editedIdeaFields.finalOpinion && !(fromdata.finalOpinionList && fromdata.finalOpinionList.length))"
                        ></el-input>
                        <button
                          @click="writelistbox(clickTypes=1)"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                          v-show="!editedIdeaFields.finalOpinion"
                        >
                          <i class="el-icon-edit"></i>
                        </button>
                      </div>
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
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        maxlength="500"
                        resize="none"
                        autosize
                        @input="changeDage($event)"
                        v-model="fromdata.processOpinion"
                        :disabled="editedIdeaFields.processOpinion"
                        v-if="(!editedIdeaFields.processOpinion  || (editedIdeaFields.processOpinion && !(fromdata.processOpinionList && fromdata.processOpinionList.length)))||fromdata.isMutil != 1"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=2)"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.processOpinion"
                      >
                        <i class="el-icon-edit"></i>
                      </button>
                    </div>
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
      :defaultUser="defaultUser"
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
      :fromdata="fromdata"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :loadingTree="loadingTree"
      :treeTradeCode="treeTradeCode"
      :iswcbfs="iswcbfs"
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
    <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
import opinionText from "@/components/opinionText/index";
import closeMessage from '@/components/closeMessage/index';
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    uploadFiles,
    opinionText,
    closeMessage
  },
  data() {
    return {
      readonlySwcy:true,
      shdialog1:false,
      shDataDR:[],
      checkNames:[],
      checkIdNames:[],
      checkpcyNames:[],
      checkedsh: [], //收回列表
      titleTypeForDr:'',
      fkyjDRXB:false,
      shdialog2:false,
      iswcbfs:false,
      closeHandler:false,
      defaultUser: {},//完成并发送默认值
      cantDisabled: false,
      treeTradeCode: "",
      shData:[],
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
      //提交
      bank_addToSendOrder: {
        function: "doSaveOrUpdateXB",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      loadingTree: false,
      fromdata: {
        sendOrgName: "",
        curUser: "",
        fromWhere: "",
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
        finalOpinionList: "",
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
        isDirect: 0,
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
        mainIds: "",
        meetingEndtime: "",
        processOpinion: "",
        processOpinionList: "",
        outsideSign: "",
        phone: "",
        realCopy: "",
        realInline: "",
        realMain: "",
        reasonLimit: "",
        reasonList: "",
        deptId: "",
        redHead: "",
        secretFlag: "",
        secretFlagType: "",
        secretGists: "",
        secretLimitName: "",
        secretTimeType: "",
        secretTypeName: "",
        secretType: "",
        secrerFlagType: "",
        secretLimitType: "",
        secretFlagContent: "",
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
        nextNodeId: "",
        nextNodeName: "",
        nextUserName: "",
        nextUserId: "",
        isRead: "",
        receiveDocType: "",
        parentIsEnd: 0,//主文档是否办结 1已办结 0未办结
      },
      showCy: true,//传阅都没有意见的显示
      readFlag: "",
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
      rules: {},
      imageUrl: "",
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
      ggjyCode: this.$businessCode.ggywgn,
      swglggCode: this.$businessCode.swglgg,
      appendWriteDialog: true,
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      clickTypes: 1,
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId,
      clickSaveAndSend: false, //点击完成并发送标示
      //正文
      //控制03
      huanJieMessage: {},
      readFields: {},
      requiredFields: {},//必填控制域
      editedIdeaFields: {
        processOpinion: true,
        finalOpinion: true,
      },//可编辑意见域
      requiredIdeaFields: {
        processOpinion: false,
        finalOpinion: false,
      },//必填意见域
      buttonList: [
        //buttonList[3]
        {name: '保存', type: 'btn_bc', show: false},
        {name: "查看正文", type: "btn_ckzw", show: false},
        {name: "选择协办人", type: "btn_wcbfs", show: false},
        {name: "清空过程意见", type: "btn_qkgcyj", show: false},
        {name: "提交最终意见", type: "btn_tjzzyj", show: false},
        {name: "查看流程", type: "btn_cklc", show: false},
        {name: "打印处理单", type: "btn_dycld", show: false},
        {name: "收藏", type: "btn_sc", show: false},
        {name: "操作指南", type: "btn_czzn", show: false},
      ],
      offenDevices: [],
      //常用批示意见
      bank_selectCommonUseList: {
        function: "selectCommonUseList",
        id: "",
        userId: "",
        userName: "",
        content: "",
        sort: "",
        createtime: ""
      },
    };
  },
  mixins: [minixs, viewDraft,isNowUser],
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    //this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function () {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    clearMassage() {
      this.$confirm("确认清空过程意见？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: action => {
          if (action == "confirm") {
            this.$post
              .postData(
                "doDeleteProcessOpinion",
                JSON.stringify({
                  function: "doDeleteProcessOpinion",
                  id: this.fromdata.id,
                  multiTenancyId: this.fromdata.multiTenancyId
                }),
                this.swglggCode
              ).then(res => {
                if (res && res.success) {
                  this.fromdata.processOpinion='';
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "操作成功",
                    duration: 500,
                  });
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "操作失败",
                    duration: 500,
                  });
                }
                this.toEdit();
              }
            )
          }
        }
      });
    },
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve('save');
          break;
        case "btn_wcbfs":
          this.completeSending();
          break;
        case "btn_tjzzyj":
          this.commit();
          break;
        case "btn_qkgcyj":
          this.clearMassage();
          break;
        case "btn_ckzw":
          this.viewDraftFile(this.fromdata.fileName, this.fromdata.filePath, this.$businessCode.swglfj,this.fromdata.title,this.fromdata.documentCode);
          break;
        case "btn_sc":
          this.shoucang();
          break;
        case "btn_cklc":
          this.flowScheme();
          break;
        case "btn_dycld":
          this.processSheet('/swxbd');
          break;
        case "btn_czzn":
          this.caozuozhinan();
          break;

      }
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
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(this.requiredFields, this.huanJieMessage.requiredFields)//必填控制
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
      if(this.$route.query.readonlySwcy == "swcy"){//文件查阅
          this.buttonList = [
          {name: "查看正文", type: "btn_ckzw", show: true},
          {name: "查看流程", type: "btn_cklc", show: true},
          {name: "打印处理单", type: "btn_dycld", show: true},
          {name: "收藏", type: "btn_sc", show: true}
          ];
          this.editedIdeaFields = {
            processOpinion: true,
            finalOpinion: true,
          }
      }else{
        this.buttonList = this.showButton(this.buttonList, this.huanJieMessage.visibleButtons, this.huanJieMessage.visibleButtonsBycondition)//按钮
        this.editedIdeaFields = this.setEditedIdeaFields(this.editedIdeaFields, this.huanJieMessage.editedIdeaFields, this.huanJieMessage.editedIdeaFieldsBycondition)//可编辑意见域
      }
      this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.huanJieMessage.requiredIdeaFields)//可编辑意见域
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.formdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
      //     this.buttonList[this.buttonList.length - 1].show = true
      // }
      if (this.fromdata.filePath) {
        this.buttonList[1].show = true;
      } else {
        this.buttonList[1].show = false;
      }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          processOpinion: [{required: this.requiredIdeaFields.pishiOpinion, message: '不能为空', trigger: 'blur'},
            {min: 0, max: 500, message: "输入内容超过500字限制,请修改!"}],
          finalOpinion: [{required: this.requiredIdeaFields.officeOpinion, message: '不能为空', trigger: 'blur'},
            {min: 0, max: 500, message: "输入内容超过500字限制,请修改!"}],
        }
      })
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      })
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(";");
      names = name.split(";");
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
    //收回t催办
    takeBackSign(type) {
      this.shdialog = true;
      if (type == "shouhui") {
        let parms = {
          function: "getSubWfInfo",
          processInstId: this.fromdata.processInstId,
          multiTenancyId: this.fromdata.multiTenancyId,
          undertake: ""
        };
        this.$post
          .postData(
            "getSubWfInfo",
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
      } else if (type == "cuiban") {
        let parms = {
          function: "urgeHandle",
          subProcessInstId: this.fromdata.subProcessInstId,
          multiTenancyId: this.fromdata.multiTenancyId,
        };
        this.$post
          .postData(
            "urgeHandle",
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
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
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
          this.iswcbfs=false;
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
    qxdialog2(){
      this.shdialog2 = false;
      this.fromdata.processOpinion = '';
    },
    handleCloseshdialog2(){
      this.shdialog2 = false;
      this.fromdata.processOpinion = '';
    },
    doFinishManyAssist(){
      if(this.fromdata.processOpinion&&this.fromdata.processOpinion!=''){
        let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
        let params = Object.assign({function:"doFinishManyAssist"}, copyFrom);
        this.$post
          .postData("doFinishManyAssist", JSON.stringify(params), this.swglggCode)
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "反馈成功",
                duration: 500,
                onClose: () => {
                  this.handleSetLoacl();
                  window.location.href = "about:blank";
                  if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                  window.close();
                }
              });
            }else{
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 1000
              })
            }
          }).catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "反馈失败",
              duration: 1000
            });
          });
      }else{
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请填写过程意见",
          duration: 1000
        });
      }
      
    },
    //选择人员后 确定完成并发送
    saveSending() {
      this.iswcbfs = false;
      this.bank_doSend.id = this.bank_doSend.id
        ? this.bank_doSend.id
        : sessionStorage.getItem("pageRsid") || "";
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.remarksList;
      delete copyFrom.handleTerminateOpinionList;
      delete copyFrom.pishiOpinionList;
      delete copyFrom.officeOpinionList;
      delete copyFrom.finalOpinionList;
      let params = Object.assign(this.bank_doSend, copyFrom);
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
            });
            setTimeout(()=>{
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                if(this.fromdata.isMutil != '1'){
                  this.handleSetLoacl();
                  window.close();
                }else{
                  this.toEdit();
                }
            },1000)
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            })
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
              this.shdialog1 = false;
              this.checkNames = [];
              this.checkIdNames = [];
              this.checkpcyNames = [];
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
              window.opener??window.opener.location.reload();
              if(this.shDataDR.length>this.checkpcyNames.length){
                this.checkNames = [];
                this.checkIdNames = [];
                this.checkpcyNames = [];
                this.toEdit();
              }else{
                this.checkNames = [];
                this.checkIdNames = [];
                this.checkpcyNames = [];
                this.toEdit();
                // setTimeout(()=>{
                //   window.close();
                // },1000)
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
    //点击 选择协办弹窗弹出
    completeSending() {
      if(this.fromdata.isReturnBefore == 1){
        this.$confirm("是否返回给：上一处理人?", "提示", {
          showClose: false,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              this.fhsyclr();
            } else {
              this.iswcbfs=true;//多人协办
              this.preserve();
              this.dialogTit = "完成并发送";
              this.offenUse = true;
              this.canTab = false;
              this.treeData = [];
              this.dialogType = "dosend";
              this.dialogTypeNow = "dosend";
              this.dialogTypeBack = true;
              this.hasRadio = false;
              this.showCompDialog();
              this.bank_selectConfig.multiTenancyId = this.fromdata.multiTenancyId;
              this.bank_selectConfig.tplNo = this.fromdata.tplNo;
              this.bank_selectConfig.curNodeId = this.fromdata.curNodeCode;
                this.$post
                  .postData(
                    "getNextNodeInfo",
                    JSON.stringify(this.bank_selectConfig),
                    this.swglggCode
                  )
                  .then(res => {
                    this.bank_send.function = 'selWfNode';
                      let parms = Object.assign(this.bank_send, this.fromdata);
                    if(this.fromdata.isMutil == 1){
                      // this.seletOptionsData = res.data || [];
                      // this.seletOptionsData = this.seletOptionsData.filter((item)=>{
                      //   return item.PCSAVYID == this.fromdata.curNodeCode
                      // })
                      this.seletOptionsData = this.fromdata.nodeList;
                      this.bank_send.curTplNo = this.fromdata.tplNo;
                      this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
                      parms.pcsAvyId = this.bank_send.pcsAvyId = this.seletOptionsData[0].PCSAVYID;
                    }else{
                      this.seletOptionsData = res.data || [];
                      this.bank_send.curTplNo = this.fromdata.tplNo;
                      this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
                      parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
                    }
                     if(this.fromdata.isMutil == 1){
                        this.singelCheckF = true; // 单选true 多选为false
                      }else{
                        this.$post
                          .postData(
                          "checkMultiHqXb",
                            JSON.stringify({
                              function:"checkMultiHqXb",
                              multiTenancyId:this.fromdata.multiTenancyId,
                              tplNo:this.fromdata.tplNo,
                              pcsAvyId:parms.pcsAvyId,
                            }),
                            this.swglggCode
                          )
                          .then(res => {
                            if(res.success&&res.isMulti){
                              this.singelCheckF = false; // 单选true 多选为false
                            }else{
                              this.singelCheckF = true; // 单选true 多选为false
                            }
                          });
                      }
                    this.$post
                      .postData("selWfNode", JSON.stringify(parms), this.swglggCode)
                      .then(res => {
                        if (res.message == "Loading") {
                          this.loadingTree = true;
                        } else {
                          this.loadingTree = false;
                        }
                        this.treeData = res.data && res.data.data || [];
                        this.defaultUser = res.data && res.data.defaultUser || {};
                        
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  });
            }
          }
        })
      }else{
        this.preserve();
        this.iswcbfs=true;
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
        this.bank_selectConfig.multiTenancyId = this.fromdata.multiTenancyId;
        this.bank_selectConfig.tplNo = this.fromdata.tplNo;
        this.bank_selectConfig.curNodeId = this.fromdata.curNodeCode;
        setTimeout(() => {
          this.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.swglggCode
            )
            .then(res => {
              this.bank_send.function = 'selWfNode';
              let parms = Object.assign(this.bank_send, this.fromdata);
              if(this.fromdata.isMutil == 1){
                this.seletOptionsData = res.data || [];
                this.seletOptionsData = this.seletOptionsData.filter((item)=>{
                  return item.PCSAVYID == this.fromdata.curNodeCode
                })
                this.bank_send.curTplNo = this.fromdata.tplNo;
                this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
                parms.pcsAvyId = this.bank_send.pcsAvyId = this.seletOptionsData[0].PCSAVYID;
              }else{
                this.seletOptionsData = res.data || [];
                this.bank_send.curTplNo = this.fromdata.tplNo;
                this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
                parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
              }
              
              if(this.fromdata.isMutil == 1){
                this.singelCheckF = true; // 单选true 多选为false
              }else{
                this.$post
                  .postData(
                  "checkMultiHqXb",
                    JSON.stringify({
                      function:"checkMultiHqXb",
                      multiTenancyId:this.fromdata.multiTenancyId,
                      tplNo:this.fromdata.tplNo,
                      pcsAvyId:parms.pcsAvyId,
                    }),
                    this.swglggCode
                  )
                  .then(res => {
                    if(res.success&&res.isMulti){
                      this.singelCheckF = false; // 单选true 多选为false
                    }else{
                      this.singelCheckF = true; // 单选true 多选为false
                    }
                  });
              }
              this.$post
                .postData("selWfNode", JSON.stringify(parms), this.swglggCode)
                .then(res => {
                  if (res.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  
                  this.treeData = res.data && res.data.data || [];
                  this.defaultUser = res.data && res.data.defaultUser || {};
                  
                })
                .catch(e => {
                  console.log(e);
                });
            });
        }, 100)
      }
    },
    completeSendingDr(){
        this.preserve();
        this.iswcbfs=true;
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
        this.bank_selectConfig.multiTenancyId = this.fromdata.multiTenancyId;
        this.bank_selectConfig.tplNo = this.fromdata.tplNo;
        this.bank_selectConfig.curNodeId = this.fromdata.curNodeCode;
        setTimeout(() => {
          this.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.swglggCode
            )
            .then(res => {
              this.bank_send.function = 'selWfNode';
              let parms = Object.assign(this.bank_send, this.fromdata);
              if(this.fromdata.isMutil == 1){
                this.seletOptionsData = res.data || [];
                this.seletOptionsData = this.seletOptionsData.filter((item)=>{
                  return item.PCSAVYID == this.fromdata.curNodeCode
                })
                this.bank_send.curTplNo = this.fromdata.tplNo;
                this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
                parms.pcsAvyId = this.bank_send.pcsAvyId = this.seletOptionsData[0].PCSAVYID;
              }else{
                this.seletOptionsData = res.data || [];
                this.bank_send.curTplNo = this.fromdata.tplNo;
                this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
                parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
              }
              
              if(this.fromdata.isMutil == 1){
                this.singelCheckF = true; // 单选true 多选为false
              }else{
                this.$post
                  .postData(
                  "checkMultiHqXb",
                    JSON.stringify({
                      function:"checkMultiHqXb",
                      multiTenancyId:this.fromdata.multiTenancyId,
                      tplNo:this.fromdata.tplNo,
                      pcsAvyId:parms.pcsAvyId,
                    }),
                    this.swglggCode
                  )
                  .then(res => {
                    if(res.success&&res.isMulti){
                      this.singelCheckF = false; // 单选true 多选为false
                    }else{
                      this.singelCheckF = true; // 单选true 多选为false
                    }
                  });
              }
              this.$post
                .postData("selWfNode", JSON.stringify(parms), this.swglggCode)
                .then(res => {
                  if (res.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  
                  this.treeData = res.data && res.data.data || [];
                  this.defaultUser = res.data && res.data.defaultUser || {};
                  
                })
                .catch(e => {
                  console.log(e);
                });
            });
        }, 100)
    },
    //递归数据
    chbehavior(org){
     const haveChildren = Array.isArray(org.children)&&org.children.length>0;
     
    },
    //返回上一处理人
    fhsyclr() {
      let obj = {
        function: "doReturnBeforeHumanAssistOrUndertake",
        processInstId: this.fromdata.processInstId,
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      };
      obj = Object.assign(obj, this.fromdata);
      this.$post
        .postData("doReturnBeforeHumanAssistOrUndertake", JSON.stringify(obj), this.swglCode)
        .then(res => {
          this.cantClick = false;
          if (res && res.success) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            setTimeout(() => {
              this.handleSetLoacl();
              window.location.href = "about:blank";
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
              window.close();
            }, 1000);
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.cantClick = false;
          this.$message({
            message: err,
            type: "error"
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
    changeDage(e) {
      this.$forceUpdate()
    },
    commit() {
      if ((!this.fromdata.finalOpinion || this.fromdata.finalOpinion == '')
        && (!this.fromdata.finalOpinionList || this.fromdata.finalOpinionList.length == 0)) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请填写最终意见",
          duration: 500,
        });
        return
      }
      if (this.fromdata.parentIsEnd == 1) {
        this.$confirm("主办文件已办结，当前意见不能反馈，是否结束流程？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              this.sureCommit();
            }
          }
        });
      } else {
        this.sureCommit();
      }
    },
    sureCommit() {
      this.cantDisabled = true;
      let bank_commit = {function: "doFinishHQXBCB", avyds: "协办完成："}
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.remarksList;
      delete copyFrom.handleTerminateOpinionList;
      delete copyFrom.pishiOpinionList;
      delete copyFrom.officeOpinionList;
      var obj = Object.assign(bank_commit, copyFrom);
      obj.function = "doFinishHQXBCB";
      this.$post
        .postData(
          "doFinishHQXBCB",
          JSON.stringify(obj),
          this.$businessCode.swglgg
        ).then(res => {
        if (res && res.success) {
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "提交成功",
            duration: 500,
          });
          setTimeout(() => {
            this.handleSetLoacl();
            window.location.href = "about:blank";
            if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
            window.close();
          }, 1000)
        } else {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: res.message,
            duration: 1000
          });
          this.cantDisabled = false;
        }
      }).catch(err => {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: err.message,
          duration: 1000
        });
        this.cantDisabled = false;
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
          this.getIsNowUser(res,'fcy','db');
          this.fromdata = Object.assign(this.fromdata, res.data);
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
          if(this.fromdata.isMutil == 1){

          }else{
            this.$post
            .postData("getNextUserTaskNode",
              JSON.stringify({function: "getNextUserTaskNode", processInstId: res.data.processInstId}),
              this.swglggCode
            )
            .then(res => {
              this.huanJieMessage = res.data.extAttributes;
              this.setConfig()
              this.setFormConfig()
              //if (this.$route.query.type != 'add')this.loadData()
            })
          }
          
          if (this.readFlag != 1) {
            this.$post
              .postData(
                "doUpdateReadRecord",
                JSON.stringify({
                  function: "doUpdateReadRecord",
                  pcsAvyId: res.data.pcsAvyId,
                  processInstId: res.data.processInstId,
                  multiTenancyId: res.data.multiTenancyId,
                  tableId:this.$route.query.tableId||'',
                }),
                this.swglggCode
              ).then(res => {
              //更新状态用。暂时不用任何操作
              if (res && res.success) {
                window.opener.location.reload();
              }
            })
          }
          this.bank_send.pcsAvyId = res.data.pcsAvyId;
          this.bank_send.tplNo = res.data.tplNo;
          this.bank_send.multiTenancyId = res.data.multiTenancyId;
          this.bank_send.curNodeId = res.data.curNodeCode;

          this.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;
          this.bank_selectConfig.tplNo = res.data.tplNo;
          this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId
          this.bank_selectConfig.curNodeId = res.data.curNodeCode

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
          this.$forceUpdate()
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
            id: this.bank_dispach.id
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.uploadConfig1.filesHas = this.fromdata.receiveDocFileList;
            this.uploadConfig.filesHas = this.fromdata.helpFileList;
            this.fromdata.attachSort = [];
            this.$forceUpdate()
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
            id: this.bank_dispach.id
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
            this.$forceUpdate()

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
          this.swglggCode
        ).then(res => {
        //更新状态用。暂时不用任何操作
      })
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
    // 代字/红头  下拉 发文字号获取值
    selectredhead(redHeadITEM) {
      this.fromdata.documentCode = redHeadITEM;
    },
    // 保存
    async preserve(type) {
      this.cantDisabled = true;
      this.bank_dispach.id = sessionStorage.getItem("pageRsid") || "";
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.remarksList;
      delete copyFrom.handleTerminateOpinionList;
      delete copyFrom.pishiOpinionList;
      delete copyFrom.officeOpinionList;
      let obj = Object.assign(this.bank_addToSendOrder, copyFrom);
      // console.log(this.bank_addToSendOrder);
      let successState = false;
      await this.$post
        .postData("doSaveOrUpdateXB", JSON.stringify(obj), this.swglCode)
        .then(res => {
          if (res && res.success) {
            successState = true;
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            sessionStorage.setItem("pageRsid", res.data.id);
            this.fromdata = Object.assign(this.fromdata, res.data)
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
              this.cantDisabled = false;
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.uploadConfig1.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
              this.cantDisabled = false;
            } else {
              this.cantDisabled = false;
              this.toEdit();
            }
          }
        }).catch(() => {
        this.cantDisabled = false;
      })
      return successState;
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
    async btnCloseHandler(val){
      if(val == 1){
        this.handleSetLoacl();
        window.close();
      }else if(val == 2){
        await this.preserve(1);
        this.handleSetLoacl();
        window.location.href = "about:blank";
        if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
        window.close();
      }else{
        this.closeHandler = false
      }
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
            this.handleSetLoacl();
            window.location.href = "about:blank";
            if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
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
                this.handleSetLoacl();
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
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
    processSheet(path, id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: this.fromdata.id,
          type:'1',//1:待办；2已办，办结
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");

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
    handleSave() {
    },
    //定密依据弹窗弹出
    writelistbox() {
      this.appendWriteDialog = true;
      this.getCommonUse(0);
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 签批意见
          this.fromdata.finalOpinion = this.fromdata.finalOpinion
            ? this.fromdata.finalOpinion + data
            : data;
        } else if (this.clickTypes == 2) {
          // 办公室批办意见
          this.fromdata.processOpinion = this.fromdata.processOpinion
            ? this.fromdata.processOpinion + data
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
          this.$businessCode.swgl
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
              duration: 1500
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
            duration: 1500
          });
        });
    },
    // 新增常用批示意见
    addCommonUse(flag, id, content) {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.content = content;
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "doSaveCommonUse";
      this.$post
        .postData(
          "doSaveCommonUse",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.swgl
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
              duration: 1500
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
            duration: 1500
          });
        });
    },
    // 删除常用批示意见
    deleteCommonUse(flag, id, content) {
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
      this.bank_selectCommonUseList.function = "doDeleteCommonUseList";
      this.$post
        .postData(
          "doDeleteCommonUseList",
          JSON.stringify(this.bank_selectCommonUseList),
          this.$businessCode.swgl
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
              duration: 1500
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
            duration: 1500
          });
        });
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "deleteOpinionById",
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
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.helpFileList[n - 1].id,
          sort: this.fromdata.helpFileList[n].sort
        },
        {
          id: this.fromdata.helpFileList[n].id,
          sort: this.fromdata.helpFileList[n - 1].sort
        }
      )
      midObj = this.fromdata.helpFileList[n];
      this.fromdata.helpFileList[n] = this.fromdata.helpFileList[n - 1];
      this.fromdata.helpFileList[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.helpFileList[n + 1].id,
          sort: this.fromdata.helpFileList[n].sort
        },
        {
          id: this.fromdata.helpFileList[n].id,
          sort: this.fromdata.helpFileList[n + 1].sort
        }
      )
      midObj = this.fromdata.helpFileList[n];
      this.fromdata.helpFileList[n] = this.fromdata.helpFileList[n + 1];
      this.fromdata.helpFileList[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById), this.$businessCode.swgl)
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
              this.fromdata.helpFileList.splice(n, 1);
              this.uploadConfig.filesHas = this.fromdata.helpFileList;
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
    }
  },
  created() {
    //初始化加载数据
    this.treeTradeCode = this.$businessCode.swglgg;  //人员树交易线
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig1.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.$businessCode.swgl; //chai
    this.uploadConfig1.flowTranId = this.$businessCode.swgl; //chai
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag : "";
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;
    // this.readonlySwcy = this.$route.query.tiaoguo ? false : true;
    this.cantDisabled =this.$route.query.readonlySwcy ? true : false;
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
}
.timeFont {
  font-size: 13px;
}
.deletIcon {
  text-align: right;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: -40px;
}
</style>
