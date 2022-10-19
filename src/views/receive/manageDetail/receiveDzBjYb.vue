<template>
  <div class="receive_dispatch" id="bankDispachDone2">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>
        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain class="bank_grid_comtent_active" size="small" @click="maintenance">维护</el-button>
          <el-button size="small" plain @click="processScheduling" v-if="fromdata.curNodeCode!=800">流程调度</el-button>
           <el-button size="small" plain @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
                     v-if="fromdata.filePath">查看正文
          </el-button>
          <el-button plain class="bank_grid_comtent_active" size="small" v-if="fromdata.curNodeCode==800&&fromdata.isInner==1" @click="guidang">归档</el-button>
          <el-button plain class="bank_grid_comtent_active" size="small" v-if="fromdata.isNewBack==1" @click="xinguidang">区块连归档</el-button>
          <el-button size="small" v-show="fromdata.curNodeCode==800&&fromdata.isSevendDays <= 7" plain
                     @click="lcjh('exeActivateTask',fromdata.pcsAvyId,fromdata.multiTenancyId,fromdata.processInstId,fwTranId,'','DZSW',fromdata.manager,fromdata.unitId)">
            重新流转
          </el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
         
          <el-button size="small" plain @click="processSheet('/dzswcld')">打印处理单</el-button>
          <el-button size="small" plain @click="collect">收藏</el-button>
        </div>
      </el-col>
    </el-row>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <!-- //收回弹窗-->
    <el-dialog
      title="退文原因"
      :visible.sync="shouhuidialog"
      width="30%"
    >
      <el-card>
        <el-checkbox-group v-model="checkedtw">
          <el-checkbox v-for="(item,index) in twData" :label="item.backReason" :key="index">{{ item.backReason }}
          </el-checkbox>
        </el-checkbox-group>
        <el-input type="textaera" v-model="twyy"></el-input>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shouhuidialog = false">取 消</el-button>
        <el-button type="primary" @click="tuiwenqueding = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <!-- <h3 class="bank_dispach_tit" v-if="isSupervise == 1">中国建设银行公文督查办单</h3>
      <h3 class="bank_dispach_tit" v-else>中国建设银行电子收文处理单</h3> -->
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
            :disabled="true"
          >
            <!-- 当前环节注释 -->
            <div class="bank_dispach_annotation" :class="{bank_db_height:isSupervise == 1}">
              <el-row>
                <el-col :span="16" style="display:flex">
                  <p class="bank_dispach_annotation_current">
                    当前环节：
                    <span>{{ fromdata.curNodeName }}</span>
                  </p>
                  <p v-if="fromdata.curNodeCode!=800" class="bank_dispach_annotation_current">
                    当前处理人：
                    <span>{{ curUser }}</span>
                  </p>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否阅件:" style="float: right;padding-right: 20px;">
                    <el-radio v-model="fromdata.isRead" :label="1">是</el-radio>
                    <el-radio v-model="fromdata.isRead" :label="0">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="isSupervise == 1" style="display:flex;color:red;margin-top:-15px;">
                  请抓紧办理，办结后及时退部门“综合处理”归档
                </el-col>
              </el-row>
            </div>

            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col v-if="isSupervise == 1">
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
                </el-col>
                <el-col>
                  <el-form-item label="正文标题">
                    <el-input placeholder="正文标题" v-model="fromdata.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input
                      type="textarea"
                      autosize
                      resize="none"
                      placeholder="附件标题"
                      v-model="fromdata.attachmentTitle"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文日期">
                    <el-date-picker
                      v-model="fromdata.receiveTime"
                      type="date"
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
                    <el-input v-model="fromdata.documentCode"></el-input>
                  </el-form-item>
                </el-col>
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
                <!-- <el-row> -->
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8">
                    <el-input v-model="fromdata.secretType" readonly></el-input>
                  </el-form-item>
                </el-col>
                <div
                  v-if="fromdata.fromWhere == '电子收文' || fromdata.fromWhere == '实物发文' ||  fromdata.fromWhere == '电子发文'||  fromdata.fromWhere == ''">
                  <el-col :span="8" v-if="fromdata.secretType == '商业秘密'">
                    <el-form-item label="秘密期限类型" :span="8">
                      <el-input v-model="fromdata.secretLimitType" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="fromdata.secretType != '商业秘密'">
                    <el-form-item label="秘密标志" :span="8">
                      <el-input v-model="fromdata.secretFlagType" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="fromdata.secretType == '商业秘密'">
                    <el-form-item
                      label="密级和保密期限"
                      :span="8"
                    >
                      <el-input v-model="fromdata.secretFlagType" readonly style="width:40%"></el-input>
                      <i class="el-icon-star-off pad_10"></i>
                      <el-input style="width:40%" v-model="fromdata.secretFlagContent" readonly>
                        <el-button slot="append">{{ fromdata.secretTimeType }}</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div v-if="fromdata.fromWhere == '实物收文'">
                  <el-col :span="8">
                    <el-form-item label="密级和保密期限">
                      <el-input
                        v-model="fromdata.secretFlagType" readonly="readonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="linecenter">
                    <el-form-item label="/" label-width="20px">
                      <el-input
                        :value="fromdata.secretLimitType" readonly="readonly"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <el-col v-if="fromdata.secretType != ''">
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
                </el-col>
                <!-- </el-row> -->
                <el-col :span="16">
                  <el-form-item label="来文单位">
                    <el-input
                      v-model="fromdata.sendOrgName"
                      placeholder="请选择来文单位"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期">
                    <el-date-picker
                      v-model="fromdata.completeTime"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="文种" :span="8">
                    <el-input  v-model="fromdata.documentClassName"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item label="登记人">
                    <el-input disabled v-model="fromdata.userName"></el-input>
                  </el-form-item>
                </el-col>

                <div v-if="isSupervise == 1">
                  <el-col :span="8" style="height:1px;">
                    <el-form-item label="">
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="督办人" prop="superviserName" ref="superviserName">
                      <el-input v-model="fromdata.superviserName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="督办日期" prop="superviseDate" ref="superviseDate">
                      <el-input v-model="fromdata.superviseDate" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div v-if="!((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
                  <el-col>
                    <el-form-item label="是否转发" prop="isForword" ref="isForword">
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
                      <el-input disabled v-model="fromdata.parentForwordRequirements"
                                v-if="fromdata.parentForwordRequirements" style="margin-bottom:20px;"></el-input>
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        placeholder="填写附件"
                        v-model="fromdata.forwordRequirements"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否直发" prop="isDirect" ref="isDirect">
                      <el-radio v-model="fromdata.isDirect" disabled :label="1">是</el-radio>
                      <el-radio v-model="fromdata.isDirect" disabled :label="0">否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="直发范围" v-if="isDirectFlag"
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
                      label="直发文种类" v-if="isDirectFlag"
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
                  <el-col>
                    <el-form-item label="保管期限" prop="keepingLimitName" ref="keepingLimitName">
                      <el-col :span="3">
                        <el-button>期限鉴定表</el-button>
                      </el-col>
                      <el-col :span="12">
                        <el-input v-model="fromdata.keepingLimitName" disabled>

                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </div>
                <el-col>
                  <el-form-item label="承办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                    <el-input
                      v-model="fromdata.undertakeDeptName"
                      placeholder="请选择承办部门"
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="协办部门">
                    <el-input
                      v-model="fromdata.assistDeptName"
                      placeholder="请选择协办部门"
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" width="0">
                    <el-input
                      v-model="fromdata.finishAssistDeptName"
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
                    :canDelet="false"
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
                    :canDelet="false"
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
                    :canDelet="false"
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
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="传阅意见">
                  <el-input type="textarea" resize="none" autosize v-if="showCy" disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.circulateOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
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
                    :canDelet="false"
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
                    :canDelet="false"
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
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 传阅信息 -->
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
            <el-row class="pr45">
              <el-col>
                <el-form-item label="发送对象">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="fromdata.sendSubName"
                    disabled
                    placeholder="请选择发送对象"
                    style="width: 100%;"
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
          </el-form>
          <el-form
            ref="fromdata"
            label-width="130px"
            :model="fromdata"
            :rules="rules"
            class="demo_ruleForm">
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row class="pr45">
              <el-col>
                <div class="file_list_box" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.attchmentFileInfo" :key="item.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <span class="down" :title="item.fileName" @click="viewDraftFile(item.fileName,item.filePath,$businessCode.swglfj)">{{ item.fileName }}</span>
                          <span class="name" :title="item.createrName">{{ item.createrName }}</span>
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
                          <!-- <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span> -->
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>
              </el-col>
              <el-col v-for="(item,n) in fkfj" :key="n">
                <el-form-item :label="item" :key="item">
                  <el-scrollbar class="file_list_box" style="margin-left:0;">
                    <div v-for="(item1,index) in fkfjList[n]" :key="item1.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <span class="down" :title="item1.fileName" @click="viewDraftFile(item1.fileName,item1.filePath,$businessCode.swglfj)">{{ item1.fileName }}</span>
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
    <!-- <treeCofig
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
    ></treeCofig> -->
    <treeCopy
      :treeData="treeData"
      :canTab="canTab"
      :defaultUser="defaultUser"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :checkOrg="checkOrg"
      :fromdata="fromdata"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCopy>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleShouuhi"
      width="30%">
      <span>确认是否收回</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleShouuhi = false">取 消</el-button>
          <el-button type="primary" @click="shouhuibutton">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import treeCopy from "@/components/tree/tree-fawen";
import timeDialog from "@/components/timedialog/timedialog";
import viewDraft from "@/minixs/viewDraft";
import sevenDay from "@/minixs/sevenDay";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/index";

const tableCol = [
  {label: "选择条目", prop: "mark", align: "center"},
  {label: "自动鉴定期限", prop: "limitDate", align: "center"}
];
export default {
  name: "ReceiveDispatch",
  components: {
    appendWriteList,
    treeCopy,
    timeDialog,
    opinionText
  },
  data() {
    return {
      initCbRecord: "",
      checkOrg: false,
      defaultUser: {}, //完成并发送默认值
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
      shouhuidialog: false,//退文原因弹窗
      checkedtw: [],//退文选项
      twyy: "",//退文原因字段描述
      twData: [],//退文原因列表
      showduban: true,
      dubanhtml: "督办",
      isSupervise: "",
      shdialog: false,//收回弹窗
      fasongCheckData: [],//fasong
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize: 10
      },
      tableCols: tableCol,
      tableData: [],
      dialogVisible: false,
      curNodeName: "",
      referForm: {
        function: "selectQXHDBPage",
        page: 1,
        limit: 10
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
        curMultiTenancyId: "",
        manager: '1',
        unitId: this.$route.query.unitId,
      },
      //确定完成并发送
      bank_doSend: {
        function: "finishAndSendEtc",
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
      readFlag: "",
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
      allowBack: "",
      curUser: "",
      fwTranId: this.$businessCode.swgl,
      fwTranHuiId: this.$businessCode.swgl,

      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getAllNodeInfo",
        curNodeId: "001",
        // curTplNo: "testOA3ID",
        // curMultiTenancyId: "CN000"
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: "",
        manager: '1',
        unitId: this.$route.query.unitId,
      },
      timeShow: false, //查看流程
      bank_cklc: {
        function: "getWfHistory",
        processInstId: "",
        manager: '1',
        unitId: this.$route.query.unitId,
      },
      curNode: "",
      clickTypes: "",
      appendWriteDialog: true,
      receiveselect: {
        function: "selectById",
        id: '',
        manager: '1',
        unitId: this.$route.query.unitId,
      },
      saveOrUpdateSW: {
        function: "saveOrUpdate",
        id: ""
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      //直发文件是否
      directFlag: false,
      showCy: true, //传阅都没有意见的显示

      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      fromdata: {
        secretType:'',
        manager: '1',
        unitId: this.$route.query.unitId,
        attachSort: [],
        attchmentFileInfo: [],
        receiveVersion: "",
        curNodeCode: "",
        limitDate: "",//办理期限
        progress: "", //办理进度
        daysInAdvance: "",// 提前提醒天数
        superviserName: "",//督办人
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
        attachmentTitle: "",
        receiveTime: "",
        emergencyName: "",
        documentCode: "",
        secretTypeName: "",
        secretType: "",
        secrerFlagType: "",
        secretLimitType: "",
        secretFlagContent: "",
        security: "",
        secretLimitName: "",
        sendOrgName: "",
        completeTime: "",
        receiveType: "",
        fromWhere: "",
        userName: "",
        directRange: "",
        directType: "",
        parentForwordRequirements: "",
        keepingLimitName: "",
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
      rules: {},
      copyRules: {
        undertakeDeptName: []
      },
      sendIds: [],
      shdialogType: "",//是收回还是催办
      shdialogTypeUnder: "",//是收回还是催办是否加字段
      isHasCB: false,//协办成功之后的按钮
      isDirectFlag: false,
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      selectMicontent: [], //密级数据下拉框
      checkedArr: [],
      keep_limit: "",

      //input框内容
      bank_dispach: {
        function: "getToQianbaoSwEntityById",
        id: ""
        // id: "1"
      },
      //xiaoM  会签部门
      bank_mmainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      //发会签部门
      createSighWf: {
        function: "createSighWf",
        deptIds: "",
        deptNames: "",
        avyds: "发送会签部门"
      },
      //实物保存
      saveOrUpdateToQianbaoSwEntity: {
        function: "saveOrUpdateToQianbaoSwEntity",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "", //部门人员名字
        sequenceSign: ""
      },
      //确定完成并发送
      bank_toQianbaoSend: {
        function: "doFinishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        flag: '1',
        manager: '1',
        unitId: this.$route.query.unitId,
      },
      loadingTree: false,
    };
  },
  mixins: [viewDraft, sevenDay],
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
    // 收藏
    collect(){
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
            flag:'er',   //er 电子收文  cy 传阅  swcb 实物承办  swsw 实物收文 xb 协办
            documentCode: this.fromdata.documentCode,  //文号
            curNodeCode: this.fromdata.curNodeCode,   //当前环节编号
            manager: '1',
            unitId: this.$route.query.unitId,
            documentTitle:this.fromdata.title  //正文标题
          };
          this.$post
            .postData(
              "collection",
              JSON.stringify(obj),
              this.$businessCode.swgl
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
    //维护
    async maintenance() {
      let data = {
        id: this.$route.query.id,
        receiveType: "1",
        manager: '1',
        unitId: this.$route.query.unitId,
        choseYear: this.$route.query.choseYear
      }
      let obj1 = await this.$post.postData(
        "getReceiveInfoById",
        JSON.stringify(Object.assign(data, {function: "getReceiveInfoById",})), this.$businessCode.swgl
      ).then(res => {
        return res.data;
      })
        .catch(err => {
          console.log(err);
        });
      let obj2 = await this.$post.postData(
        "getReceiveSuggestInfoById",
        JSON.stringify(Object.assign(data, {function: "getReceiveSuggestInfoById",})), this.$businessCode.swgl
      ).then(res => {
        return res.data;
      })
        .catch(err => {
          console.log(err);
        });
      let obj3 = await this.$post.postData(
        "getSysFiles",
        JSON.stringify(Object.assign(data, {
          function: "getSysFiles",
          id: this.fromdata.id,
          parentId: this.fromdata.parentId || '',
          processInstId: this.fromdata.processInstId || '',
          documentType: '',
          choseYear: this.$route.query.choseYear
        })), this.$businessCode.swgl
      ).then(res => {
        return res.data;
      })
        .catch(err => {
          console.log(err);
        });
      if (obj1) {
        const routeData = this.$router.resolve({
          path: "/maintainFilesSW",
          query: {
            id: this.$route.query.id,
            receiveType: "1",
            parentId: this.fromdata.parentId,
            processInstId: this.fromdata.processInstId,
            documentType: '',
            type: 'sw',
            sign: 'swsw',
            selectUrl: 'selectById',
            title: this.fromdata.documentTitle,
            unitId: this.$route.query.unitId,
            choseYear: this.$route.query.choseYear
          }
        });
        sessionStorage.setItem("fileObj", JSON.stringify(obj1))
        sessionStorage.setItem("suggessObj", JSON.stringify(obj2))
        sessionStorage.setItem("attachObj", JSON.stringify(obj3))
        window.open(routeData.href, "_blank");
      }
    },
    // 点击流程调度
    async processScheduling() {
      // let judge = true;
      // judge = this.saveCheck();
      // if (!judge) {
      //   return;
      // }
      this.dialogTit = "流程调度";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoSend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.loadingTree = true;
      // this.showCompDialog();
      // this.preserve().then(res => {
      //   if (res) {
      this.showCompDialog();
      setTimeout(() => {
        this.$post
          .postData(
            "getAllNodeInfo",
            JSON.stringify(this.bank_selectConfig),
            this.$businessCode.swgl
          )
          .then(res => {
            this.seletOptionsData = res.data || [];
            this.bank_send.curTplNo = this.fromdata.tplNo;
            this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
            let parms = Object.assign(this.bank_send, this.fromdata);
            parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
            this.$post
              .postData("selWfNode", JSON.stringify(parms), this.$businessCode.swgl)
              .then(res => {
                this.cantClick = false;
                if (res.message == "Loading") {
                  this.loadingTree = true;
                } else {
                  this.loadingTree = false;
                }
                this.treeData = (res.data && res.data.data) || [];
                this.defaultUser = (res.data && res.data.defaultUser) || {};
              })
              .catch(e => {
                this.cantClick = false;
                console.log(e);
              });
          });
      }, 100)
      //   }
      // });
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype, radio) {
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
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          if (this.addSendType === "1") {
            oldIds = this.fromdata.signDepartmentId.split(";");
            oldNames = this.fromdata.signDepartmentName.split(";");
            newIds = ids.filter(item => {
              return oldIds.indexOf(item) == -1;
            });
            newNames = names.filter(item => {
              return oldNames.indexOf(item) == -1;
            });
          }

          names = names.join(";");
          ids = ids.join(";");

          newIds = newIds.join(";");
          newNames = newNames.join(";");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "hui":
            this.fromdata.signDepartmentName = names;
            this.fromdata.signDepartmentId = ids;
            this.huiCheckData = ids.length ? this.checkData : [];
            this.createSighWf.deptIds = ids;
            this.createSighWf.deptNames = names;
            this.createSighWf.sequenceSign = radio;
            this.saveOrUpdateToQianbaoSwEntity.sequenceSign = radio;

            if (!ids.length) {
              this.checkIds = [];
            }
            if (
              this.fromdata.curNodeName === "综合处理" &&
              this.fromdata.signDepartmentName
            ) {
              this.showHQ = true;
            } else {
              this.showHQ = false;
            }
            break;

          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
        }

        if (this.addSendType === "1") {
          this.handleSendHQPtmt(newIds, newNames, oldIds, oldNames);
        }

        //下一环节处理人信息
        if (dtype === "toQianbaoSend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogState = !this.dialogState;
      if (
        !this.dialogState &&
        dtype == "toQianbaoSend" &&
        this.dialogTypeBack
      ) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    // 会签部门
    handleSendHQPtmt(newIds, newNames, oldIds, oldNames) {
      // this.bank_dispach.id = this.$route.query.id
      //   ? this.$route.query.id
      //   : sessionStorage.getItem("sfkhSignpageid") || "";
      this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");

      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;

      this.createSighWf.avyds = "发送会签部门:" + this.createSighWf.deptNames;
      var obj = Object.assign(this.createSighWf, parseList);

      if (!this.createSighWf.deptIds) {
        obj.deptIds = "";
        obj.deptNames = "";
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择会签部门",
          duration: 1000
        });
        return;
      }
      if (newNames) {
        obj.deptIds = newIds;
        obj.deptNames = newNames;
      }
      if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
        this.preserve();
        this.$post
          .postData(
            "createSighWf",
            JSON.stringify(obj),
            this.$businessCode.swgl
          )
          .then(res => {
            if (res && res.success) {
              this.preserve();
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送会签部门成功",
                duration: 1000
              });
              this.getToQianbaoEntityById();
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 1000
              });
              this.getToQianbaoEntityById();

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
            this.getToQianbaoEntityById();
          });
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      // this.bank_toQianbaoSend.id = this.bank_dispach.id
      //   ? this.bank_dispach.id
      //   : sessionStorage.getItem("sentitySignpageid") || "";
      this.bank_toQianbaoSend.id = this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "sentitySignpageid"
      );
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.handleSituationList;
      delete parseList.handRoundOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      let params = Object.assign(this.bank_toQianbaoSend, parseList);
      params = Object.assign(params, {manager: ''});
      this.$post
        .postData(
          "doFinishAndSend",
          JSON.stringify(params),
          this.$businessCode.swgl
        )
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
            // this.dialogState = !this.dialogState;
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "发送失败",
              duration: 500
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
        // case "huiqian":
        //   this.checkIds = this.fromdata.signDepartmentId
        //     ? this.fromdata.signDepartmentId.split(",")
        //     : [];
        //   this.checkData = this.huiCheckData;
        //   break;
        case "hui":
          this.checkIds = this.fromdata.signDepartmentId
            ? this.fromdata.signDepartmentId.split(";")
            : [];
          this.checkData = this.huiCheckData;
          if (this.addSendType == 1) {
            this.checkData.map(item => {
              //选中的不可操作
              item.disabled = true;
            });
          }
          break;
        case "ben":
          this.checkIds = this.fromdata.inlineIds
            ? this.fromdata.inlineIds.split(",")
            : [];
          this.checkData = this.benCheckData;
          break;
        case "toQianbaoSend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    // 初始化列表及分页
    handleLoadData() {
      this.$post
        .postData(
          "getTcSendNoticeConfigDic",
          JSON.stringify(Object.assign(this.dispatchaffiche, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        });
      this.$post
        .postData(
          "getOrgInfo",
          JSON.stringify(this.unitForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.ruleForm.unitName = res.data && res.data.unitName;
          this.ruleForm.organizationName = res.data && res.data.unitName;
          this.ruleForm.organizationId = res.data && res.data.unitId;
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
    isCanGetBack() {
      //收回测试
      this.$post
        .postData(
          "checkTakeBack",
          JSON.stringify({function: "checkTakeBack", processInstId: this.fromdata.processInstId}),
          this.$businessCode.swgl
        )
        .then(res => {
          this.allowBack = res.allowBack;
        });
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
          this.$businessCode.swgl
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

    getDataOne() {
      this.$post
        .postData(
          "selectById",
          JSON.stringify(this.receiveselect),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.data) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            let transSecretFlagContent = this.fromdata.secretFlagContent&&this.fromdata.secretFlagContent||""
            this.fromdata.secretFlagContent = transSecretFlagContent.length>9 ? dateFormate.date(Date.parse(new Date(transSecretFlagContent))) : transSecretFlagContent;
            if (res.data.level && res.data.level == '1') {//传阅常用联系人修改 12.21
              this.scircularizeLevel = '2';//传阅常用联系人修改 12.21
            } else {
              this.scircularizeLevel = '1';//传阅常用联系人修改 12.21
            }
            if (res.data.cbRecord) {
              this.fromdata.cbRecord = this.fromdata.cbRecord.split(';');
              this.initCbRecord = this.fromdata.cbRecord;
            }
            if (res.data.sendUserName) this.nigaoren = res.data.sendUserName.split(';')[1]
            if (res.data.sendUserName) this.fasongren = res.data.sendUserName.split(';')[0]
            if (res.data.sendUserId) this.nigaorenId = res.data.sendUserId.split(';')[1]
            if (res.data.sendUserId) this.fasongrenId = res.data.sendUserId.split(';')[0]
            this.radioWD1 = this.nigaoren
            this.radioWD2 = this.fasongren
            //     nigaoren:"",
            // fasongren:"",
            // nigaorenId:"",
            // fasongrenId:"",
            // answerUserId:""//huidaren
            this.isAskShow = res.data.isAskShow;
            if (res.data.isAskShow == "1") {
              this.isAskShow = true;
            } else if (res.data.isAskShow == "0") {
              this.isAskShow = false;
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

              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
            } else {
              this.xieCheckData = [];
            }
            if (res.data.circulatePersonNames) {
              this.cyCheckData = this.concatTreeData(
                res.data.circulatePersonIds,
                res.data.circulatePersonNames
              );
            } else {
              this.cyCheckData = [];
            }
          }
        });


    },
    getDataTwo() {
      this.$post
        .postData(
          "selectAttachmentList",
          JSON.stringify({
            function: "selectAttachmentList",
            id: this.receiveselect.id,
            manager: '1',
            unitId: this.$route.query.unitId,
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            //已上传的文件
            //已上传的文件

            for (let i in this.fromdata.feedbackAttachmentMap) {
              let k = 0;
              this.fkfj.push(i)
              this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i])
            }
            this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
            this.uploadConfig.attachTitle = this.fromdata.attachmentTitle && this.fromdata.attachmentTitle.replace(/[\n,\s]/g, '');
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
          "selectSelfOpinionList",
          JSON.stringify({
            function: "selectSelfOpinionList",
            id: this.receiveselect.id,
            manager: '1',
            unitId: this.$route.query.unitId,
          }),
          this.$businessCode.swgl
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
          "selectOtherOpinionList",
          JSON.stringify({
            function: "selectOtherOpinionList",
            id: this.receiveselect.id,
            manager: '1',
            unitId: this.$route.query.unitId,
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            if (res.data.circulateOpinionList) {
              for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                if (res.data.circulateOpinionList[i].opinions != '') {
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
    getDataFive() {
      this.$post
        .postData(
          "selectWbjCirculate",
          JSON.stringify({
            function: "selectWbjCirculate",
            id: this.receiveselect.id,
            manager: '1',
            unitId: this.$route.query.unitId,
          }),
          this.$businessCode.swgl
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
            id: this.receiveselect.id
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
      this.uploadConfig.id = this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      this.getDataOne();
      this.getDataTwo();
      this.getDataThree();
      this.getDataFour();
      this.getDataFive();
      this.getDataSix();
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
        .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById), this.fwTranId)
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
    // 打印处理单
    processSheet(path, id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: this.receiveselect.id,
          manager:'',
          unitId:this.$route.query.unitId,
          type:'gly',
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
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
          flowTranId: this.$businessCode.swglgg,
          showBtns: false,
          processInstId:this.fromdata.processInstId,
          saveSpecialFileName:saveName
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 关闭
    handelclose() {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
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
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.bank_cklc.unitId=this.$route.query.unitId;
      console.log(this.fromdata.processInstId);
      this.$post
        .postData(
          "getWfHistory",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.swgl
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
    //归档
    guidang(){
      this.$post
        .postData(
          "receiveDocEtcFiled",
          JSON.stringify({
            function: "receiveDocEtcFiled",
            id: this.fromdata.id,
            unitCode: this.fromdata.orgId,
            unitId:this.$route.query.unitId,
            manager: '1',
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: '归档成功!',
              duration: 500,
            });
          }else{
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 500,
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新归档
    xinguidang(){
      this.$post
        .postData(
          "newReceiveFiled",
          JSON.stringify({
            function: "newReceiveFiled",
            id: this.fromdata.id,
            unitCode: this.fromdata.orgId,
            unitId:this.$route.query.unitId,
            multiTenancyId:this.fromdata.multiTenancyId,
            manager: '1',
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: '归档成功!',
              duration: 500,
            });
          }else{
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 500,
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {},
  created() {
    let that = this;
    this.treeTradeCode = this.$businessCode.swglgg;
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag : "";
    this.receiveselectlist();
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

.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
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
</style>

