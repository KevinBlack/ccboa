<template>
  <div class="receive_dispatch" id="reCircularizeDispatch1">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain class="bank_grid_comtent_active" size="small" @click="maintenance">维护</el-button>
          <el-button size="small" plain @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
                     v-if="fromdata.filePath">查看正文
          </el-button>
          <el-button size="small" plain @click="processSheet('/swcycld')">打印处理单</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>


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
            <div class="bank_dispach_annotation">
              <el-row>
                <el-col :span="12">
                  <p class="bank_dispach_annotation_current">
                    当前处理人：
                    <span>{{ curUser }}</span>
                  </p>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否阅件:" style="float: right;padding-right: 20px;">
                    <el-radio disabled v-model="fromdata.isRead" :label="1">是</el-radio>
                    <el-radio disabled v-model="fromdata.isRead" :label="0">否</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row class="inlineBox">
              <el-col>
                <el-form-item label="正文标题">
                  <el-input placeholder="正文标题" disabled v-model="fromdata.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="附件标题">
                  <el-input
                    type="textarea"
                    autosize
                    disabled
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
                    style="width:100%"
                    disabled
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
                  <el-input v-model="fromdata.documentCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收文字数" prop="receiveWords" ref="receiveWords">
                  <el-input v-model="fromdata.receiveWords" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务分类" prop="bussinessType" ref="bussinessType">
                  <el-input v-model="fromdata.bussinessType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文种" prop="documentClass" ref="documentClass">
                  <el-input v-model="fromdata.documentClass" disabled></el-input>
                </el-form-item>
              </el-col>
              <div>
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
                <!-- </el-row> -->
              </div>

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
              <div
                v-if="!((fromdata.fromWhere == '电子收文' ||  fromdata.fromWhere=='电子发文' || fromdata.fromWhere=='实物发文' ) && fromdata.orgId=='U010000')">
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
<!--                <el-col>
                  <el-form-item label="发送对象">
                    <el-input
                      v-model="fromdata.sendSubName"
                      placeholder="请选择发送对象"
                      disabled
                      style="width: 100%;"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>-->
                <el-col>
                  <el-form-item label="保管期限" prop="keepingLimit" ref="keepingLimit">
                    <el-col :span="3">
                      <el-button>期限鉴定表</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-input v-model="fromdata.keepingLimit" disabled>

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
                    disabled
                    style="width: 100%;"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="协办部门">
                  <el-input
                    v-model="fromdata.assistDeptName"
                    disabled
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
              <el-col>
                <el-form-item label="选择传阅人" prop="circulatePersonNames" ref="circulatePersonNames">
                  <el-input
                    v-model="fromdata.circulatePersonNames"
                    disabled
                    placeholder="请选择选择传阅人"
                    style="width: 100%;"
                  >
                    <el-button slot="append" @click="takeBackSignCY('shouhui','cy')"
                               v-if="fromdata.circulatePersonNames !=''">收回
                    </el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row class="pr45 inlineBox">
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
                            v-if="fromdata.undertake_org_opinion==''||!fromdata.undertake_org_opinion"
                            disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.undertake_org_opinion"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="协办部门办理情况">
                  <el-input type="textarea"
                            resize="none"
                            autosize v-if="fromdata.help_org_opinion==''||!fromdata.help_org_opinion"
                            disabled></el-input>
                  <opinionText
                    :opinionText="fromdata.help_org_opinion"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    :canDelet="false"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 传阅信息 -->
            <template v-show="false">
              <h6 class="bank_dispach_file_tit">传阅信息</h6>
              <div id="cyxx" class="height_90"></div>
              <el-row class="pr45">
                <el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Object">
                  <el-form-item label="一次传阅意见">
                    <el-input
                      type="textarea"
                      resize="none"
                      v-if="Object.keys(fromdata.firstOpinions).length == 0"
                      autosize
                      disabled
                    ></el-input>
                    <opinionText
                      :opinionText="fromdata.firstOpinions"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :isLength="fromdata.firstOpinions.opinions&&fromdata.firstOpinions.opinions!=''"
                      :isObj="true"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col v-if="fromdata.firstOpinions&&fromdata.firstOpinions.constructor == Array">
                  <el-form-item label="一次传阅意见">
                    <el-input
                      type="textarea"
                      resize="none"
                      v-if="fromdata.firstOpinions.length == 0"
                      autosize
                      disabled
                    ></el-input>
                    <opinionText
                      :opinionText="fromdata.firstOpinions"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :isArr="true"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col v-if="fromdata.firstOpinions == undefined">
                  <el-form-item label="一次传阅意见">
                    <el-input type="textarea" resize="none" autosize disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Array"
                >
                  <el-form-item label="二次传阅意见">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-if="fromdata.secondOpinions.length == 0"
                      disabled
                    ></el-input>
                    <opinionText
                      :opinionText="fromdata.secondOpinions"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :isArr="true"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="fromdata.secondOpinions&&fromdata.secondOpinions.constructor == Object"
                >
                  <el-form-item label="二次传阅意见">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-if="Object.keys(fromdata.secondOpinions).length == 0"
                    ></el-input>
                    <opinionText
                      :opinionText="fromdata.secondOpinions"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :isLength="fromdata.secondOpinions.opinions&&fromdata.secondOpinions.opinions!=''"
                      :isObj="true"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
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
                  <el-form-item label="传阅说明">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-if="fromdata.circulateExplainList==''||!fromdata.circulateExplainList"
                      disabled
                    ></el-input>
                    <opinionText
                      :opinionText="fromdata.circulateExplainList"
                      :sendOpinionMaxTime="fromdata.opinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                      :isCYexplain="true"
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
                <el-col>
                  <el-form-item
                    label="传阅人员"
                  >
                    <el-row>
                      <el-col class="m10">
                        <el-form-item
                          label="一次传阅人"
                          prop="firstCirculateHumans"
                          ref="firstCirculateHumans"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            v-model="fromdata.firstCirculateHumans"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10">
                        <el-form-item
                          label="二次传阅人(未阅)"
                          prop="WBJSecondCirculate"
                          ref="WBJSecondCirculate"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            v-model="fromdata.WBJSecondCirculate"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10">
                        <el-form-item
                          label="二次传阅人(已阅)"
                          prop="YBJSecondCirculate"
                          ref="YBJSecondCirculate"
                        >
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            v-model="fromdata.YBJSecondCirculate"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>

            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row class="pr45 inlineBox">
              <el-col>
                <div class="file_list_box" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.attchmentFileInfo"
                         :key="item.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <!-- 预览 -->
                          <span
                            class="down"
                            :title="item.fileName"
                            @click="viewDraftFile(item.fileName,item.filePath,$businessCode.swglfj)"
                          >{{ item.fileName }}</span>
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
                          <span class="down" @click="downFile(item1)">{{ item1.fileName }}</span>
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
      :isCY="isCY"
      :fromdata="fromdata"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></treeCofig>
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
    <el-dialog
      title="操作"
      :visible.sync="shdialog1"
      width="50%"
    >
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox v-for="(item,index) in shData" :label="item.id" :key="index">{{ item.curUser }}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appendWriteList from "../../../components/appendWriteList/appendWriteList";
import treeCofig from "../../../components/tree/tree-fawen";
import timeDialog from "@/components/timedialog/timedialog";
import exportTable from "@/minixs/exportTable";
import opinionText from "@/components/opinionText/index";
import viewDraft from "@/minixs/viewDraft";
const tableCol = [
  {label: "选择条目", prop: "mark", align: "center"},
  {label: "自动鉴定期限", prop: "limitDate", align: "center"}
];
export default {
  name: "ReceiveDispatch",
  components: {
    appendWriteList,
    treeCofig,
    timeDialog,
    opinionText
  },
  data() {
    return {
      isCY: "",
      dialogVisibleShouuhi: false,//收回确定弹窗
      shdialog1: false,
      shData: [],
      fkfj: [],//反馈附件
      fkfjList: [],//反馈附件
      uploadConfig: {
        id: '',
        url: 'uploadFiles',
        code: '',
        filesHas: []
      },
      checkedsh: [],//收回列表
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
      checkedtw: [],//退文选项
      twyy: "",//退文原因字段描述
      twData: [],//退文原因列表
      showduban: true,
      dubanhtml: "督办",
      shdialog: false,//收回弹窗
      fasongCheckData: [],//fasong
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize: 10
      },
      tableCols: tableCol,
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
      fwTranId: this.$businessCode.swgl,
      fwTranHuiId: this.$businessCode.swglgg,
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        // curTplNo: "testOA3ID",
        // curMultiTenancyId: "CN000"
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: ""
      },
      state: "",
      tableData: [],
      timeShow: false, //查看流程
      bank_cklc: {
        function: "getWfHistory",
        processInstId: "",
        manager: '1',
        unitId: this.$route.query.unitId,
      },
      receiveselect: {
        function: "selectByIdCY",
        id: '',
        mainDocId: '',
        multiTenancyId: '',
        manager: '1',
        unitId: this.$route.query.unitId,
      },
      saveOrUpdateSW: {
        function: "doSaveOrUpdateCY",
        id: ""
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      //直发文件是否
      directFlag: false,
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      firstData: {},
      fromdata: {
        attachSort: [],
        attchmentFileInfo: [],
        receiveVersion: "",
        curNodeCode: "",
        limitDate: "",//办理期限
        progress: "", //办理进度
        daysInAdvance: "",// 提前提醒天数
        superviseUserName: "",//督办人
        opinions: "",
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
        circulatePersonIds: "",
        circulatePersonNames: "",
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
        keepingLimit: "",
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
      loadingTree: false,
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
      dialogTypeZF: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      selectMicontent: [], //密级数据下拉框
      checkedArr: [],
      keep_limit: "",
      addSendType: "",
    };
  },
  mixins: [viewDraft],
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
            flag:'cy',   //er 电子收文  cy 传阅  swcb 实物承办  swsw 实物收文 xb 协办
            documentCode: this.fromdata.documentCode,  //文号
            curNodeCode: this.fromdata.curNodeCode,
            manager: '1',
            unitId: this.$route.query.unitId,   //当前环节编号
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
        receiveType: "2",
        mainDocId: this.$route.query.mainDocId,
        multiTenancyId: this.$route.query.multiTenancyId,
        manager: '1',
        unitId: this.$route.query.unitId,
        choseYear: this.$route.query.choseYear
      }
      let obj1 = await this.$post.postData(
        "getReceiveCirculateInfoById",
        JSON.stringify(Object.assign(data, {function: "getReceiveCirculateInfoById",})), this.$businessCode.swgl
      ).then(res => {
        return res.data;
      })
        .catch(err => {
          console.log(err);
        });
      // let obj2=await this.$post.postData(
      //     "getReceiveCirculateSuggestInfoById",
      //     JSON.stringify(Object.assign(data,{function :"getReceiveCirculateSuggestInfoById",})),this.$businessCode.swgl
      //   ).then(res => {
      //     return res.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      // });
      if (obj1) {
        const routeData = this.$router.resolve({
          path: "/maintainFilesSW",
          query: {
            id: this.$route.query.id,
            type: 'sw',
            sign: 'swcy',
            selectUrl: 'selectById',
            mainDocId: this.$route.query.mainDocId,
            multiTenancyId: this.$route.query.multiTenancyId,
            title: this.fromdata.documentTitle,
            unitId: this.$route.query.unitId,
            choseYear: this.$route.query.choseYear
          }
        });
        sessionStorage.setItem("fileObj", JSON.stringify(obj1))
        // sessionStorage.setItem("suggessObj",JSON.stringify(obj2))
        window.open(routeData.href, "_blank");
      }
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
    yiyue() {
      let copyFrom = {
        function: "areadlyRead",
      }
      copyFrom = Object.assign(copyFrom, this.fromdata)
      this.$post
        .postData("areadlyRead", JSON.stringify(copyFrom), this.$businessCode.swglgg)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "操作成功",
              duration: 500,
            });
            setTimeout(() => {
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            }, 1000)
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "操作失败",
              duration: 500,
            });
          }

        })
        .catch(e => {
          console.log(e);
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
          this.$businessCode.swglgg
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
    receiveselectlist() {
      this.uploadConfig.id = this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData(
          "selectByIdCY",
          JSON.stringify(this.receiveselect),
          this.$businessCode.swglgg
        )
        .then(res => {
          if (res.data) {
            this.fromdata = res.data;
            //获取传阅意见
            this.$post
              .postData("getCirculateSuggestInfoById", JSON.stringify(
                {
                  function: 'getCirculateSuggestInfoById',
                  id: this.fromdata.id,
                  manager: '1',
                  unitId: this.$route.query.unitId,
                }
              ), this.fwTranId)
              .then(res => {
                console.log(res);
                if (res) {
                  if (res && res.success) {
                    for (let i = 0; i < res.data.length; i++) {
                      this.fromdata[res.data[i].key] = res.data[i].value
                    }
                    this.$forceUpdate();
                  }
                }
              });
            this.curUser = res.data.curUser;
            this.curNodeName = res.data.curNodeName;
            this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
            this.bank_selectConfig.tplNo = res.data.tplNo;
            this.bank_sendXb.processInstId = res.data.processInstId;
            this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
            this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
            this.bank_sendXb.tplNo = res.data.tplNo;
            this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
            this.bank_sendXb.curNodeCode = res.data.curNodeCode;
            this.bank_sendXb.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            this.firstData = res.data.firstOpinions;

            this.limitDate = res.data.limitDate;
            this.progress = res.data.progress;
            this.daysInAdvance = res.data.daysInAdvance;
            this.superviseUserName = res.data.superviseUserName;
            this.superviseDate = res.data.superviseDate;
            //已上传的文件
            this.fromdata.attchmentFileInfo = res.data.fileList;
            this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
            this.fromdata.attachSort = [];
            for (let i in this.fromdata.feedbackAttachmentMap) {
              let k = 0;
              this.fkfj.push(i)
              this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i])
            }
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
            }

            if (res.data.assistDeptId) {
              this.transIds = res.data.assistDeptId

              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
            }
            if (res.data.circulatePersonNames) {
              this.cyCheckData = this.concatTreeData(
                res.data.circulatePersonIds,
                res.data.circulatePersonNames
              );
            }

            //临时意见处理
            this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
            this.cuteData("remarks", "remarksList", "remarksId");
            this.cuteData(
              "handleTerminateOpinion",
              "handleTerminateOpinionList",
              "handleTerminateOpinionId",
              "undertakeOrgOpinionList",
              "helpOrgOpinionList"
            );
            this.cuteData(
              "officeOpinion",
              "officeOpinionList",
              "officeOpinionId"
            );
          }
        });
    },
    getNewName(value) {
      let a = value;
      this.checkNames = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < this.shData.length; j++) {
          if (this.shData[j].processInstId == a[i]) {
            this.checkNames.push(this.shData[j].deptName)
          }
        }
      }
      this.checkNames = this.checkNames.join(';')
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
    async getFileInfo(self) {
      var successInfo = {state: false};
      self.bank_doDownloadFile.fileName = self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = self.fromdata.filePath;
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
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
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
    //发送传阅人
    sendCy(newIds, newNames) {

      this.preserve('2');
      let obj = {
        function: "sendCirculate",
        circulatePersonIds: this.fromdata.circulatePersonIds,
        circulatePersonNames: this.fromdata.circulatePersonNames,
        multiTenancyId: this.fromdata.multiTenancyId,
        id: this.fromdata.id,
        isCirculate: "1"
      }
      //增发
      if (newNames) {
        obj.circulatePersonIds = newIds;
        obj.circulatePersonNames = newNames;
      } else {
        obj.circulatePersonIds = this.fromdata.circulatePersonIds;
        obj.circulatePersonNames = this.fromdata.circulatePersonNames;
      }
      if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
        this.$post
          .postData("sendCirculate", JSON.stringify(obj), this.$businessCode.swglgg)
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送传阅人成功",
                duration: 500,
              });
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "发送传阅人失败",
                duration: 500,
              });
            }

          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    //请求承办部门树 单选时
    getChenTreeData() {
      this.clearCheckData("");
      this.$post
        .postData("selWfNode", JSON.stringify(this.bank_send), this.$businessCode.swglgg)
        .then(res => {
          this.treeData = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    //请求部门树数据
    getTreeData(n, m) {
      if (n == "cy") {
        this.isCY = true
        this.dialogType = "dosend";
      } else {
        this.isCY = false
        this.dialogType = "hui";
      }
      this.dialogTypeZF = n;
      let name = "";
      this.addSendType = m;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
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
          clearName = "assistDeptName";
          break;
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.clearCheckData(clearName);
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
            JSON.stringify({function: "getForwordOrgDept", orgFlag: "org"}),
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
            this.$businessCode.swglgg
          )
          .then(res => {
            this.loadingTree = false;
            that.treeData = (res && res.data) || [];
          });

      } else {
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(this.bank_mainXiao),
            this.fwTranHuiId
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
        if (name === "circulatePersonNames") {
          this.fromdata.circulatePersonIds = "";
          this.cyCheckData = [];
        }
      }
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      let judge = true;
      let that = this;
      if (!this.fromdata.processInstId) {
        this.preserve('1');
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
          this.$businessCode.swglgg
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          this.bank_send.curTplNo = this.fromdata.tplNo;
          this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
          let parms = Object.assign(this.bank_send, this.fromdata);
          parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
          this.$post
            .postData("selWfNode", JSON.stringify(this.bank_send), this.$businessCode.swglgg)
            .then(res => {
              if (res.message == "Loading") {
                this.loadingTree = true;
              } else {
                this.loadingTree = false;
              }
              this.treeData = res.data;
            }).catch(e => {
            console.log(e);
          });
        });
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];

        let newIds = [];
        let oldIds = 0
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
          if (this.addSendType == '1') {
            oldIds = this.fromdata.circulatePersonIds.split(";")
            oldNames = this.fromdata.circulatePersonNames.split(";")
            newIds = ids.filter((item) => {
              return oldIds.indexOf(item) == -1;
            })
            newNames = names.filter((item) => {
              return oldNames.indexOf(item) == -1;
            })
          }

          names = names.join(";");
          this.transIds = ids = ids.join(";");
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
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
        }
        if (this.addSendType == '1') {
          this.sendCy(newIds, newNames);
        }
        if (this.addSendType != '1' && dtype == "cy") {
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
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
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
        case "fasong":
          this.checkIds = this.fromdata.sendSubId
            ? this.fromdata.sendSubId.split(";")
            : [];
          this.checkData = this.fasongCheckData;
          break;
        case "dosend":
          this.checkIds = [];
          this.checkData = [];
          break;
      }
    },
    //可被收回传阅单的列表
    takeBackSignCY() {
      this.checkedsh = [];
      this.shdialog1 = true;
      let parms = {
        function: "selectallowBackCirculate",
        id: this.fromdata.id,
        multiTenancyId: this.fromdata.multiTenancyId,
      };
      this.$post
        .postData(
          "selectallowBackCirculate",
          JSON.stringify(parms),
          this.$businessCode.swglgg
        ).then(res => {
        if (res && res.success) {
          this.shData = res.data;
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    shQuedingCY() {
      let checkboxdata = this.checkedsh.join(";");
      let parms = {
        function: "takeBackCirculate",
        id: this.fromdata.id,
        ids: checkboxdata,
        multiTenancyId: this.fromdata.multiTenancyId,
        isCirculate: ''
      };
      this.$post
        .postData(
          "takeBackCirculate",
          JSON.stringify(parms),
          this.$businessCode.swglgg
        ).then(res => {
        if (res && res.success) {
          this.shdialog1 = false;
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: "收回成功",
            duration: 1000
          });
          this.receiveselectlist();
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    async preserve(type) {
      // let judge = true;
      // judge = this.scrollIntoForm();
      // if (!judge) {
      //   return;
      // }
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.remarksList;
      delete copyFrom.handleTerminateOpinionList;
      delete copyFrom.pishiOpinionList;
      delete copyFrom.officeOpinionList;
      delete copyFrom.undertakeOrgOpinionList;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.finalOpinionList;
      delete copyFrom.helpOrgOpinionList;
      delete copyFrom.feedbackAttachmentMap;
      let obj = Object.assign(this.saveOrUpdateSW, copyFrom);
      let successState = false;
      await this.$post
        .postData("doSaveOrUpdateCY", JSON.stringify(obj), this.$businessCode.swgl)
        .then(res => {
          if (res && res.success) {
            if (type != "2") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 1000
              });
            }
            this.receiveselectlist();
            successState = true;
          }
        })
        .catch(err => {
          this.$message({
            type: "err",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1000
          });
        });
      return successState;
    },
  },
  watch: {},
  created() {
    let that = this;
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    this.receiveselect.mainDocId = this.$route.query.mainDocId ? this.$route.query.mainDocId : "";
    this.receiveselect.multiTenancyId = this.$route.query.multiTenancyId ? this.$route.query.multiTenancyId : "";
    this.state = this.$route.query.state ? this.$route.query.state : "";
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
      padding: 10px 0;
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
  height: 10px;
}

.inlineBox {
  display: inline-block;
  width: 100%;
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

td {
  text-align: center;
}
</style>

