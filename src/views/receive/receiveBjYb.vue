<template>
  <div id="receiveBjYb" class="receive_dispatch">
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
          <el-button size="small" plain @click="dialogVisibleShouuhi = true"
                     v-if="fromdata.curNodeCode!=800&&readFlag !='1'&&allowBack==true" v-show="readonlySwcy">收回
          </el-button>
          <el-button size="small" plain @click="cuiban" v-if="fromdata.curNodeCode!=800" v-show="readonlySwcy">催办</el-button>
          
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <!-- <el-button plain @click="ckcbzt">查看承办状态</el-button>
          <el-button plain @click="ckxbzt">查看协办状态</el-button> -->
          <el-button size="small" plain @click="processSheet('/swswcld')">打印处理单</el-button>

          <el-button size="small" plain @click="shoucang">收藏</el-button>

          <el-button size="small" plain @click="caozuozhinan" v-show="readonlySwcy">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleShouuhi"
      width="30%">
      <span>是否收回</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleShouuhi = false">取 消</el-button>
          <el-button type="primary" @click="shouhuibutton">确 定</el-button>
        </span>
    </el-dialog>


    <div class="nav"></div>
    <header class="bank_dispach_header">
      <!-- <h3 class="bank_dispach_tit" v-if="isSupervise == 1">中国建设银行公文督查办单</h3>
      <h3 class="bank_dispach_tit" v-else>中国建设银行实物收文处理单</h3> -->
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
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批对象</a>
        <a
          href="javascript:void(0);"
          :class="active == '#cyxx' ? 'active' : ''"
          @click="toTarget('#cyxx')"
        >传阅信息</a>
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
            <!-- 当前环节注释 -->
            <div class="bank_dispach_annotation" :class="{bank_db_height:isSupervise == 1}">
              <el-row>
                <el-col :span="14" style="display:flex">
                  <p class="bank_dispach_annotation_current">
                    当前环节：
                    <span>{{ curNodeName }}</span>
                  </p>
                  <p v-if="fromdata.curNodeCode!=800" class="bank_dispach_annotation_current">
                    当前处理人：
                    <span>{{ curUser }}</span>
                  </p>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="是否阅件:" style="float: right;padding-right: 20px;">
                    <el-radio v-model="fromdata.isRead" disabled :label="1">是</el-radio>
                    <el-radio v-model="fromdata.isRead" disabled :label="0">否</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="isSupervise == 1">
                <el-col :span="8" style="display:flex;color:red;margin-top: -15px;">
                  请抓紧办理，办结后及时退部门“综合处理”归档
                </el-col>
              </el-row>
            </div>

            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>

                <div v-if="isSupervise == 1">

                  <el-col :span="8">
                    <el-form-item label="办理期限" prop="limitDate" ref="limitDate">
                      <el-input v-model="fromdata.limitDate" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="办理进度" :span="8" prop="progress" ref="progress">
                      <el-input v-model="fromdata.progress" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="提前提醒天数" prop="daysInAdvance" ref="daysInAdvance">
                      <el-input v-model="fromdata.daysInAdvance" disabled></el-input>
                    </el-form-item>
                  </el-col>

                </div>


                <el-col>
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input placeholder="正文标题" disabled v-model="fromdata.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="收文字号" prop="documentCode" ref="documentCode">
                    <el-input v-model="fromdata.documentCode" disabled></el-input>
                  </el-form-item>
                </el-col>
                <div>
                  <el-col>
                    <el-form-item label="附件标题" prop="attachmentTitle" ref="attachmentTitle">
                      <!-- <el-input type="textarea" autosize resize="none" placeholder="附件标题" v-model="fromdata.attachmentTitle"></el-input> -->
                      <el-input
                        maxlength="500"
                        type="textarea"
                        autosize
                        resize="none"
                        placeholder="附件标题"
                        v-model="fromdata.attachmentTitle"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>

                </div>

                <el-col>
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
                        disabled
                        placeholder="请选择"
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
                </el-col>

                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      @change="selectType"
                      disabled
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
                        placeholder="请选择"
                        style="width:100%"
                        disabled
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
                      <el-select v-model="fromdata.secretLimitType" disabled>
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
                <!-- <el-col v-if="fromdata.secretType != ''">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-model="fromdata.knowScore"
                      name="knowScore"
                    ></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="16">
                  <el-form-item label="来文单位" prop="sendOrgName" ref="sendOrgName">
                    <el-input
                      v-model="fromdata.sendOrgName"
                      :title="fromdata.sendOrgName"
                      disabled
                      placeholder="请选择来文单位"
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
                    <el-select v-model="fromdata.receiveType" disabled placeholder="请选择" style="width:100%">
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

                <div v-if="isSupervise == 1">
                  <el-col :span="8" style="height:1px;">
                    <el-form-item label="">
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="督办人" prop="superviser" ref="superviser">
                      <el-input v-model="fromdata.superviser" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="督办日期" prop="superviseDate" ref="superviseDate">
                      <el-input v-model="fromdata.superviseDate" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </div>

                <el-col>
                  <el-form-item label="转发文件" prop="isForword" ref="isForword">
                    <el-radio v-model="fromdata.isForword" disabled label="1">是</el-radio>
                    <el-radio v-model="fromdata.isForword" disabled label="0">否</el-radio>
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
                      v-model="fromdata.forwordRequirements"
                      resize="none"
                      disabled
                      autosize
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                    <el-radio disabled v-model="fromdata.isDirect" :label="1">是</el-radio>
                    <el-radio disabled v-model="fromdata.isDirect" :label="0">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="直发范围"
                    prop="directRange"
                    ref="directRange"
                    v-show="fromdata.isDirect*1"
                  >
                    <el-select v-model="fromdata.directRange" placeholder="请选择" disabled style="width:100%">
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
                    <el-select v-model="fromdata.directType" disabled placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in selectContents.direct_send_type"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="保管期限" prop="keepingLimitName" ref="keepingLimitName">
                    <el-col :span="3">
                      <el-button>期限鉴定表</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-select v-model="fromdata.keepingLimitName" disabled placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="keep_limititem in keep_limit"
                          :key="keep_limititem.value"
                          :label="keep_limititem.value"
                          :value="keep_limititem.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="承办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                    <el-input
                      v-model="fromdata.undertakeDeptName"
                      :title="fromdata.undertakeDeptName"
                      placeholder="请选择承办部门"
                      disabled
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" width="0">
                    <el-input
                      v-model="fromdata.finishUndertakeDeptName"
                      :title="fromdata.finishUndertakeDeptName"
                      style="width: 100%;"
                      disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="协办部门">
                    <el-input
                      v-model="fromdata.assistDeptName"
                      :title="fromdata.assistDeptName"
                      placeholder="请选择协办部门"
                      disabled
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" width="0">
                    <el-input
                      v-model="fromdata.finishAssistDeptName"
                      :title="fromdata.finishAssistDeptName"
                      placeholder=""
                      style="width: 100%;"
                      disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row class="pr45">
              <el-col>
                <el-form-item label="批示意见">
                  <el-input type="textarea" resize="none" autosize
                            v-if="fromdata.pishiOpinionList==''||!fromdata.pishiOpinionList" disabled></el-input>
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
                  <el-input type="textarea" resize="none" autosize
                            v-if="fromdata.officeOpinionList==''||!fromdata.officeOpinionList" disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.officeOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>

              <el-col v-show="fromdata.isShowFb == 1">
                <el-form-item label="部门分办意见">
                  <div v-if="!(fromdata.deptFbOpinionList && fromdata.deptFbOpinionList.length>0)">
                    <el-input
                      :disabled="true"
                    ></el-input>
                  </div>
                  <opinionText
                    :opinionText="fromdata.deptFbOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="承办部门办理情况">
                  <el-input type="textarea" resize="none" autosize
                            v-if="fromdata.undertakeOrgOpinionList==''||!fromdata.undertakeOrgOpinionList"
                            disabled></el-input>
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
                  <el-input type="textarea" resize="none" autosize
                            v-if="fromdata.helpOrgOpinionList==''||!fromdata.helpOrgOpinionList" disabled></el-input>
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
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-if="!(fromdata.circulateOpinionList && fromdata.circulateOpinionList.length>0)"
                    disabled
                  ></el-input>
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
                  <el-input type="textarea" resize="none" autosize
                            v-if="fromdata.handleTerminateOpinionList==''||!fromdata.handleTerminateOpinionList"
                            disabled></el-input>
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
              <el-col v-if="fromdata.isSupervise == 1">
                <el-form-item label="催办记录">
                  <div class="el-textarea el-input--small is-disabled" style="color:blue">
                    <span v-for="(item,index) in initCbRecord" :key="index">
                      {{ item }}<br/>

                    </span>
                    <!-- <span v-for="item in fromdata.cbRecord" :key="item">
                      {{item}}<br/>
                    </span> -->
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 传阅信息 -->
            <template>
              <h6 class="bank_dispach_file_tit">传阅信息</h6>
              <div id="cyxx" class="height_90"></div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="传阅人员">
                    <el-col class="m10">
                      <el-form-item label="未阅" prop="wbjFirstCirculate" ref="wbjFirstCirculate">
                        <el-input type="textarea"
                                  resize="none"
                                  autosize v-model="fromdata.wbjFirstCirculate" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="m10">
                      <el-form-item label="已阅" prop="ybjFirstCirculate" ref="ybjFirstCirculate">
                        <el-input type="textarea"
                                  resize="none"
                                  autosize v-model="fromdata.ybjFirstCirculate" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row class="pr45">
              <el-col>
                <el-form-item label="发送对象">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="fromdata.sendSubName"
                    placeholder="请选择发送对象"
                    style="width: 100%;"
                    disabled
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item
                  label="公告至"
                >
                  <el-input
                    type="textarea"
                    autosize
                    v-model="fromdata.gonggaoName"
                    disabled
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row class="pr45">
              <el-col>
                <div class="file_list_box" style="margin-left:138px;"
                     v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.attchmentFileInfo" :key="item.id" class="comp_list">
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
                              :disabled="false"
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
              <el-col v-for="(item,n) in fkfj" :key="n">
                <el-form-item :label="item" :key="item">
                  <el-scrollbar>
                    <div v-for="(item1,index) in fkfjList[n]" :key="item1.id" class="file_list_box" style="margin-left:2px !important;">
                      <template>
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <span class="down" :title="item1.fileName"
                                @click="viewDraftFile(item1.fileName,item1.filePath,$businessCode.swglfj)">{{ item1.fileName }}</span>
                          <span class="name">{{ item1.createrName }}</span>
                          <span class="time">{{ item1.createTime }}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item1)"
                              round
                            >下载
                            </el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </el-form-item>
              </el-col>
            </el-row>
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
    ></treeCofig>
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
import treeCofig from "../../components/tree/tree-fawen";
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

export default {
  name: "ReceiveDispatch",
  components: {
    appendWriteList,
    treeCofig,
    mTable,
    timeDialog,
    opinionText
  },
  mixins: [viewDraft,isNowUser],
  data() {
    return {
      readonlySwcy:true,
      dialogVisibleShouuhi: false,//收回确定弹窗
      fkfj: [],//反馈附件
      fkfjList: [],//反馈附件
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
      initCbRecord: "",
      showduban: true,
      dubanhtml: "督办",
      isSupervise: "",
      shData: [],//收回数据
      checkedsh: [],//收回列表
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
      readFlag: "",
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      deleteIds: "",
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
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
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
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //确定完成并发送
      bank_doSend: {
        function: "finishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
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
        id: '',
        avyds: ""
      },
      curUser: "",
      curNode: "",
      clickTypes: "",
      appendWriteDialog: true,
      swglCode: this.$businessCode.swgl,
      swglggCode: this.$businessCode.swglgg,
      ggjyCode: this.$businessCode.ggywgn,
      receiveselect: {
        function: "selectSWById",
        id: '',
        tiaoguo: this.$route.query.tiaoguo||'',
      },
      saveOrUpdateSW: {
        function: "saveOrUpdateSW",
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
        // knowScore:"",
        handleTerminateOpinionList: [],
        cbRecord: '',
        secretFlagType: "",
        secretLimitType: "",
        assistDeptName: "",
        attachSort: [],
        attchmentFileInfo: [],
        receiveVersion: "",
        curNodeCode: "",
        isHasCB: "",//1-有未办结的承办，显示增发收回催办，0-无未办结的承办 隐藏增发收回催办
        isHasXB: "",
        limitDate: "",//办理期限
        progress: "", //办理进度
        daysInAdvance: "",// 提前提醒天数
        superviser: "",//督办人
        superviseDate: "",//督办日期
        direct_send_range: "", //直发范围
        keepLimitName: "", //保管期限
        secret_flag_type: "", //秘密标志类型
        undertakeDeptName: "",
        processInstId: "", //流程实例标识
        tplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        pishiOpinion: "", //批示意见
        isDirect: 0, // 是否直发
        forwordRequirements: "",
        isForword: "0", //转发文件
        title: "",
        sendSubId: "",//发送对象id
        sendSubName: "",//发送对象名称
        gonggaoName: "",//公告至名称
        attachmentTitle: "",
        receiveTime: "",
        emergencyName: "",
        documentCode: "",
        secretType: "",
        security: "",
        secretLimitName: "",
        sendOrgName: "",
        completeTime: "",
        receiveType: "",
        userName: "",
        directRange: "",
        directType: "",
      },
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
      copyRules: {
        undertakeDeptName: [
          {trigger: "change", required: true, message: "请选择承办部门"}
        ]
      },
      allowBack: "",//收回按钮的判断
      sendIds: [],
      shdialogType: "",//是收回还是催办
      shdialogTypeUnder: "",//是收回还是催办是否加字段
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
      checkedArr: [],
      keep_limit: ""
    };
  },
  methods: {
    //发送
    fasongBtn() {
      let idN = this.receiveselect.id || sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData("doSend", JSON.stringify({
          function: "doSend",
          deptIds: this.fromdata.sendSubId,
          id: idN
        }), this.swglCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: reeor.message,
            duration: 1000
          });
        });
    },
    //点击督办
    shouwenduban() {
      const gobackform = {
        function: "superviseReceive",
        id: this.receiveselect.id
      };
      this.$post
        .postData("superviseReceive", JSON.stringify(gobackform), this.swglCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "成功",
              duration: 1000
            });
            this.receiveselectlist();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "失败",
            duration: 1000
          });
        });
    },
    //取消督办
    unshouwenduban() {
      const gobackform = {
        function: "cancelSuperviseReceive",
        id: this.receiveselect.id
      };
      this.$post
        .postData("cancelSuperviseReceive", JSON.stringify(gobackform), this.swglCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "成功",
              duration: 1000
            });
            this.receiveselectlist();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "失败",
            duration: 1000
          });
        });
    },
    getBack() {
      //收回
      const gobackform = {
        function: "doWithdrawTask",
        pcsAvyId: this.bank_sendXb.pcsAvyId,
      };
      this.$post
        .postData("doWithdrawTask", JSON.stringify(gobackform), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1000
              });
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
            flag:'swsw',   //er 电子收文  cy 传阅  swcb 实物承办  swsw 实物收文 xb 协办
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
      this.fromdata.security = "";
    },
    selectMiHandler(val) {
      this.fromdata.security = val;
      this.$forceUpdate();
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
            processInstId: this.fromdata.processInstId
          }),
          this.swglggCode
        ).then(res => {
        if (res && res.success) {
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "收回成功",
            duration: 500,

          });
          window.location.href = "about:blank";
          window.opener.location.reload();
          window.close();
        }
      })
    },

    //发送承办
    sendCb() {
      this.bank_sendXb.deptIds = this.fromdata.undertakeDeptId;
      this.bank_sendXb.deptNames = this.fromdata.undertakeDeptName;
      this.bank_sendXb.avyds = "发送承办部门:" + this.bank_sendXb.deptNames;
      let cbParm = Object.assign(this.bank_sendXb, {undertake: true})
      this.$post
        .postData(
          "createHelpSubWf",
          JSON.stringify(cbParm),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              message: "发送成功",
              type: 'success'
            })
            if (type == "1") {
              this.preserve('save');
            }
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }

        }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      });

    },
    //发送协办
    sendXb(type) {
      if (this.bank_sendXb.undertake) delete this.bank_sendXb.undertake
      if (type == "1") {
        this.bank_sendXb.deptIds = this.fromdata.assistDeptId;
        this.bank_sendXb.deptNames = this.fromdata.assistDeptName;
        this.bank_sendXb.avyds = "发送协办部门:" + this.bank_sendXb.deptNames;
      } else {
        this.bank_sendXb.deptIds = this.transIds;
        this.bank_sendXb.deptNames = this.fromdata.assistDeptName;
        this.bank_sendXb.avyds = "发送协办部门:" + this.bank_sendXb.deptNames;

      }
      this.$post
        .postData(
          "createHelpSubWf",
          JSON.stringify(this.bank_sendXb),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              message: "发送成功",
              type: 'success'
            })
            if (type == "1") {
              this.preserve('save');
            }
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }

        }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
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
    handleCurrentChange(val) {
      // this.checkedArr = []
      // if (val.length>1) {

      //   this.checkedArr = val[0].limitDate;
      //   this.fromdata.limitDate = this.checkedArr;
      // } else {
      //   this.checkedArr = []
      // }
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
          id: this.receiveselect.id,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    // handleSelectionChange() {},
    getDataOne() {
      this.$post
        .postData(
          "selectSWById",
          JSON.stringify(this.receiveselect),
          this.swglCode
        )
        .then(res => {
          if (res.data) {
            this.getIsNowUser(res);
            this.fromdata = Object.assign(this.fromdata, res.data);
            let shouwenInfo={
              '文号': res.data.documentCode || "",
              '标题': res.data.title || "",
            };
            this.$store.dispatch("setshouwenInfo", shouwenInfo);
            if (res.data.level && res.data.level == "1") {
              //传阅常用联系人修改 12.21
              this.scircularizeLevel = "2"; //传阅常用联系人修改 12.21
            } else {
              this.scircularizeLevel = "1"; //传阅常用联系人修改 12.21
            }
            if (!res.data.isRead) {
              this.fromdata.isRead = 0;
            }
            if (!res.data.isForword) {
              this.fromdata.isForword = "0";
            }
            if (res.data.cbRecord) {
              this.fromdata.cbRecord = this.fromdata.cbRecord.split(";");
              this.initCbRecord = this.fromdata.cbRecord
            }
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
            this.isSupervise = res.data.isSupervise;
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

            this.limitDate = res.data.limitDate;
            this.progress = res.data.progress;
            this.daysInAdvance = res.data.daysInAdvance;
            this.superviser = res.data.superviser;
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
              this.chenName1.push(res.data.undertakeDeptName);
              this.chenId1.push(res.data.undertakeDeptId);
            } else {
              this.chenCheckData = [];
            }
            if (res.data.assistDeptId) {
              this.transIds = res.data.assistDeptId;

              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
              this.xieName1.push(res.data.undertakeDeptName);
              this.xieId1.push(res.data.undertakeDeptId);
            } else {
              this.xieCheckData = [];
            }
            // if (res.data.sendSubId) {
            //   this.fasongCheckData = this.concatTreeData(
            //     res.data.sendSubId,
            //     res.data.sendSubName
            //   );
            // }
            if (res.data.circulatePersonNames) {
              this.cyCheckData = this.concatTreeData(
                res.data.circulatePersonIds,
                res.data.circulatePersonNames
              );
            } else {
              this.cyCheckData = [];
            }
            //临时意见处理
            // this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
            // this.cuteData("remarks", "remarksList", "remarksId");
            // this.cuteData(
            //   "handleTerminateOpinion",
            //   "handleTerminateOpinionList",
            //   "handleTerminateOpinionId"
            // );
            // this.cuteData(
            //   "undertakeOrgOpinion",
            //   "undertakeOrgOpinionList",
            //   "undertakeOrgOpinionId"
            // );

            // this.cuteData(
            //   "undertakeOrgOpinionList",
            //   "helpOrgOpinionList",
            //   "circulateOpinionList"
            // );
            // this.cuteData(
            //   "officeOpinion",
            //   "officeOpinionList",
            //   "officeOpinionId"
            // );
          }
        });

    },
    getDataTwo() {
      this.$post
        .postData(
          "selectAttachmentListSw",
          JSON.stringify({
            function: "selectAttachmentListSw",
            id: this.receiveselect.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            //已上传的文件
            this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
            this.uploadConfig.attachTitle =
              this.fromdata.attachmentTitle &&
              this.fromdata.attachmentTitle.replace(/[\n,\s]/g, "");
            this.fromdata.attachSort = [];
            //反馈处理
            this.fkfj = [];
            for (let i in this.fromdata.feedbackAttachmentMap) {
              let k = 0;
              this.fkfj.push(i);
              this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i]);
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
          "selectSelfOpinionListSw",
          JSON.stringify({
            function: "selectSelfOpinionListSw",
            id: this.receiveselect.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFour() {
      this.$post
        .postData(
          "selectOtherOpinionListSw",
          JSON.stringify({
            function: "selectOtherOpinionListSw",
            id: this.receiveselect.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFive() {
      this.$post
        .postData(
          "selectWbjCirculateSw",
          JSON.stringify({
            function: "selectWbjCirculateSw",
            id: this.receiveselect.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取已发送的公告至对象
    getDataSix() {
      this.$post
        .postData(
          "selectByFaWenIdForSendOrderNotice",
          JSON.stringify({
            function: "selectByFaWenIdForSendOrderNotice",
            id: this.receiveselect.id,
            tiaoguo: this.$route.query.tiaoguo||'',
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata.gonggaoName = res.data?JSON.parse(JSON.stringify(res.data)):'';
            this.$forceUpdate();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    receiveselectlist() {
      this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      this.getDataOne();
      this.getDataTwo();
      this.getDataThree();
      this.getDataFour();
      this.getDataFive();
      this.getDataSix();
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
        this.receiveselect.id || sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData("saveOrUpdateSW", JSON.stringify(params), this.swglCode)
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                offset: 400,
                duration: 1000
              });
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            } else {
              this.receiveselectlist();
            }
          }
        })
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
    cuiban() {
      this.$post
        .postData("cuiban", JSON.stringify({
          function: "cuiban",
          multiTenancyId: this.fromdata.multiTenancyId,
          isSupervise: this.fromdata.isSupervise,
          processInstId: this.fromdata.processInstId,
        }), this.swglggCode)
        .then(res => {
          if (res) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "催办成功",
              duration: 1500,
            });
            this.receiveselectlist();
          }
        });
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.attchmentFileInfo[n - 1].id,
          sort: this.fromdata.attchmentFileInfo[n].sort
        },
        {
          id: this.fromdata.attchmentFileInfo[n].id,
          sort: this.fromdata.attchmentFileInfo[n - 1].sort
        }
      )
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[n - 1];
      this.fromdata.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
          id: this.fromdata.attchmentFileInfo[n + 1].id,
          sort: this.fromdata.attchmentFileInfo[n].sort
        },
        {
          id: this.fromdata.attchmentFileInfo[n].id,
          sort: this.fromdata.attchmentFileInfo[n + 1].sort
        }
      )
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[n + 1];
      this.fromdata.attchmentFileInfo[n + 1] = midObj;
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
              this.fromdata.attchmentFileInfo.splice(n, 1);
              this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
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
            this.receiveselectlist();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1500
            });
          }
        });
    },
  },
  watch: {},
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function () {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
      let a = this.$refs.title;
      this.$forceUpdate()
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  created() {
    let that = this;
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.$businessCode.swgl;  //流程交易线   chai
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag : "";
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
          //this.rules = this.copyRules;
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
  float: right;
  padding-right: 10px;
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
  font-size: 12px;
}

.pad_lr10 {
  padding: 0 10px;
}

.disable_w {
  width: 100%;
}

.disable_w {
  width: 100%;
}

.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(102, 30, 30, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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

</style>
