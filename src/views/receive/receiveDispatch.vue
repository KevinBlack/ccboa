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
  <!-- 优化内容： 接口提示问题，意见集保存的时候不要 -->
  <div id="receiveDispatch" class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <!--<el-button plain @click="preserve('save')">保存</el-button>
           <el-button plain @click="banjie">办结</el-button>
          <el-button plain @click="completeSending">完成并发送</el-button>
          <el-button plain @click="sendCb">发送承办部门</el-button>
          <el-button plain @click="sendXb('1')">发送协办部门</el-button>
          <el-button plain @click="unshouwenduban" v-if="isSupervise == 1">取消督办</el-button>
          <el-button plain @click="shouwenduban" v-else v-if="isSupervise == 0">督办</el-button>
          <el-button plain>传阅</el-button>
          <el-button plain>收藏</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <el-button plain @click="ckxbzt('chen')">查看承办状态</el-button>
          <el-button plain @click="ckxbzt('xie')">查看协办状态</el-button>
          <el-button plain  @click="processSheet('/swcld')">打印处理单</el-button>
          <el-button plain>操作指南</el-button>-->
          <!-- <el-button size="small" plain @click="sendCy">发送传阅人</el-button> -->
          <!-- 控制01 -->
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="closeHandler = true"
          >关闭</el-button>
          <el-button
            plain
            @click="sczw"
            size="small"
            v-if="curNodeName=='登记'"
            v-show="readonlySwcy"
          >上传正文</el-button>
          <el-button
            size="small"
            plain
            @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj,fromdata.title,fromdata.documentCode)"
            v-if="fromdata.filePath"
          >查看正文</el-button>
          <!-- <el-button size="small" plain @click="sendCy">发送传阅人</el-button> -->
          <el-button
            :disabled="cantClick"
            size="small"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.type)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{ item.name }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      v-dialogDrag
      :visible.sync="showSend"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      @close="cancelSendObjGong"
      title="发送确认"
    >
      <h6 class="back_tit">是否发送给以下对象</h6>
      <div class="send_content">
        <el-row>
          <el-col :span="4">
            <el-button @click="handleSendObj">发送对象</el-button>
          </el-col>
          <el-col :span="20">
            <template>
              <div class="command_wrap">
                <el-scrollbar>
                  <el-checkbox-group
                    v-model="checkedCities1"
                    @change="handleCheckedCitiesChange1('outcheck')"
                  >
                    <el-checkbox
                      v-for="user in nowCheckList"
                      :label="user.id"
                      :value="user.id"
                      :key="user.id"
                    >{{ user.name }}</el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
              </div>
            </template>
          </el-col>
        </el-row>
        <el-divider v-if="mmlx==true"></el-divider>
        <el-row v-if="mmlx==true">
          <el-col :span="4">
            <el-button>专栏</el-button>
            <!-- <span class="style_zl"></span> -->
          </el-col>
          <el-col :span="20">
            <el-select v-model="coluCheck" @change="handleColuChange" clearable>
              <el-option
                v-for="coluItem in coluData"
                :key="coluItem"
                :label="coluItem"
                :value="coluItem"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-divider v-if="mmlx==true"></el-divider>
        <el-row v-if="mmlx==true">
          <el-col :span="4">
            <el-button @click="sendBrandTo">公告至</el-button>
          </el-col>
          <el-col :span="20">
            <template>
              <div class="command_wrap">
                <el-scrollbar>
                  <el-checkbox-group
                    v-model="checkedGonggaoIds"
                    @change="handleCheckedCitiesChange1('gongcheck')"
                  >
                    <el-checkbox
                      v-for="user in nowGongGaoCheckList"
                      :label="user.id"
                      :value="user.id"
                      :key="user.id"
                    >{{ user.name }}</el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
              </div>
            </template>
          </el-col>
        </el-row>
      </div>
      <!--      <p class="send_ps">
              <b>注</b> : 密件只能公告至行领导和高管!
      </p>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSendObjGong">取 消</el-button>
        <el-button type="primary" @click="fasongBtn">发 送</el-button>
      </div>
    </el-dialog>
    <!-- //qzsh -->
    <el-dialog title="强制收回" v-dialogDrag :visible.sync="qzshDialog" width="50%">
      <el-card>
        <div style="margin: 15px 0;"></div>
        <el-checkbox
          :indeterminate="qzshIsIndeterminate"
          v-model="qzshCheckAll"
          @change="qzshCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="qzshCheck" @change="qzshCheckChange">
          <el-checkbox
            v-for="(item,index) in qzshData"
            :label="item.processInstId"
            :key="index"
          >{{ item.orgName }}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qzshDialog = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingQZSH">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传正文 -->
    <el-dialog title="上传正文" :visible.sync="swzwdialog" width="50%">
      <el-card>
        <uploadFiles
          style="margin-left: 0px;"
          ref="uploadComponentSczw"
          @preserve="preserve"
          :uploadConfig="uploadConfigswzw"
        ></uploadFiles>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="swzwdialog = false;uploadzwFlag = false">取 消</el-button>
        <el-button type="primary" @click="swzwdialog = false;uploadzwFlag = false">确 定</el-button>
      </span>
    </el-dialog>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <cyIsSend ref="dialogLineCY" v-if="cyIsSendShow"></cyIsSend>

    <el-dialog title="提示" :visible.sync="dialogVisiblefasong" width="30%">
      <span>确认是否发送{{ fromdata.sendSubName }}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblefasong = false">取 消</el-button>
        <el-button type="primary" @click="fasongBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 传阅步骤 -->
    <el-dialog title="收回传阅人" :visible.sync="shdialog1" width="50%">
      <el-card>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedsh" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item,index) in shData" :label="item" :key="index">{{ item.curUser }}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看子流程" :visible.sync="cbxbchakan">
      <el-table border :data="tableData1" class="scroll" height="400">
        <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
        <el-table-column
          v-for="item in tableCols1"
          :key="item.id"
          :prop="item.prop"
          :formatter="item.formatter"
          :label="item.label"
          align="center"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" type="primary" @click="cbxbchakan = false">取 消</el-button>
      </span>
    </el-dialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <!-- <h3 class="bank_dispach_tit" v-if="isSupervise == 1">中国建设银行公文督查办单</h3>
      <h3 class="bank_dispach_tit" v-else>中国建设银行实物收文处理单</h3>-->
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
                    <el-radio-group
                      :disabled="readFields.isRead"
                      v-model="fromdata.isRead"
                      @change="undateDate($event)"
                    >
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="isSupervise == 1"
                  style="display:flex;color:red;margin-top: -15px;"
                >请抓紧办理，办结后及时退部门“综合处理”归档</el-col>
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
                      <el-date-picker
                        v-model="fromdata.limitDate"
                        :disabled="readFields.limitDate"
                        type="date"
                        @change="timeChangeBl"
                        placeholder="选择日期"
                        style="width: 100%;"
                      ></el-date-picker>
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
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input
                      placeholder="正文标题"
                      maxlength="200"
                      v-model="fromdata.title"
                      :disabled="readFields.title"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="收文字号" prop="documentCode" ref="documentCode">
                    <el-input v-model="fromdata.documentCode" :disabled="readFields.documentCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题" prop="attachmentTitle" ref="attachmentTitle">
                    <el-input
                      type="textarea"
                      autosize
                      maxlength="500"
                      resize="none"
                      placeholder="附件标题"
                      v-model="fromdata.attachmentTitle"
                      :disabled="readFields.attachmentTitle"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-col :span="8">
                    <el-form-item label="收文日期" prop="receiveTime" ref="receiveTime">
                      <el-date-picker
                        v-model="fromdata.receiveTime"
                        :disabled="readFields.receiveTime"
                        type="date"
                        @change="timeChange"
                        placeholder="选择日期"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="紧急程度" :span="8" prop="emergencyName" ref="emergencyName">
                      <el-select
                        v-model="fromdata.emergencyName"
                        :disabled="readFields.emergencyName"
                        placeholder="请选择"
                        style="width:100%"
                      >
                        <el-option value label="请选择"></el-option>
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
                      :disabled="readFields.secretType"
                      style="width:100%"
                    >
                      <el-option value label="请选择"></el-option>
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
                    <el-form-item
                      label="密级和保密期限"
                      ref="secretFlagType"
                      prop="secretFlagType"
                      :span="8"
                    >
                      <el-select
                        v-model="fromdata.secretFlagType"
                        placeholder="请选择"
                        style="width:100%"
                        :disabled="readFields.secretFlagType||(fromdata.secretType ==''&&fromdata.secretType =='请选择')"
                        @change="selectMiHandler"
                      >
                        <el-option value label="请选择"></el-option>
                        <el-option
                          v-for="item in selectMicontent"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                          :disabled="readFields.secretFlagType||(fromdata.secretType ==''&&fromdata.secretType =='请选择')"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" class="linecenter">
                    <el-form-item
                      label="/"
                      label-width="20px"
                      prop="secretLimitType"
                      ref="secretLimitType"
                    >
                      <el-select
                        v-model="fromdata.secretLimitType"
                        :disabled="readFields.secretLimitType"
                        placeholder="请选择"
                        @change="selectMiHandlerTs"
                      >
                        <el-option value label="请选择"></el-option>
                        <el-option
                          v-for="item in selectContents.secret_time_type"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                          :disabled="readFields.secretLimitType"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- <el-col v-if="fromdata.secretType != '' && fromdata.receiveType == 1">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.knowScore"
                      :disabled="readFields.knowScore"
                      name="knowScore"
                    ></el-input>
                  </el-form-item>
                </el-col>-->
                <el-col :span="16">
                  <el-form-item
                    label="来文单位"
                    prop="sendOrgName"
                    ref="sendOrgName"
                    style="overflow:hidden;"
                  >
                    <el-input
                      v-model="fromdata.sendOrgName"
                      placeholder="请选择来文单位"
                      :title="fromdata.sendOrgName"
                      :disabled="readFields.sendOrgName"
                      style="width: 95%;z-index: 2;"
                    ></el-input>
                    <el-select
                      :disabled="readFields.sendOrgName"
                      v-model="fromdata.sendOrgName"
                      placeholder="请选择"
                      style="width: 100%;z-index: 1;position:absolute;left: 0;"
                    >
                      <el-option value="请选择"></el-option>
                      <el-option
                        v-for="item in selectContents.send_org"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期" prop="completeTime" ref="completeTime">
                    <el-date-picker
                      v-model="fromdata.completeTime"
                      :disabled="readFields.completeTime"
                      @change="timeChangecw"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-col :span="8">
                    <el-form-item label="实物收文类型" prop="receiveType" ref="receiveType">
                      <el-select
                        v-model="fromdata.receiveType"
                        :disabled="readFields.receiveType"
                        placeholder="请选择"
                        style="width:100%"
                      >
                        <el-option value label="请选择"></el-option>
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

                  <el-col :span="8">
                    <el-form-item label="登记部门" prop="draftDept" ref="draftDept">
                      <el-input disabled v-model="fromdata.draftDept" :title="fromdata.draftDept"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col v-if="isSupervise == 1">
                  <!-- <el-col :span="8" style="height:1px;">
                  <el-form-item label="" >
                  </el-form-item>
                  </el-col>-->
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
                </el-col>

                <el-col>
                  <el-form-item label="转发文件" prop="isForword" ref="isForword">
                    <el-radio-group
                      :disabled="fromdata.isSendSub == 1||readFields.isForword"
                      v-model="fromdata.isForword"
                      @change="directchange"
                    >
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
                    v-show="fromdata.isForword *1 || fromdata.isSendSub == 1"
                  >
                    <el-input
                      disabled
                      v-model="fromdata.parentForwordRequirements"
                      v-if="fromdata.parentForwordRequirements"
                      resize="none"
                      autosize
                      type="textarea"
                      style="margin-bottom:20px;"
                      class="bluecolor"
                    ></el-input>
                    <el-input
                      type="textarea"
                      placeholder="填写转发要求，最多不超过200字"
                      maxlength="200"
                      resize="none"
                      autosize
                      :class="[{'bluecolor':fromdata.isSendSub == 1}]"
                      :disabled="fromdata.isSendSub == 1 || readFields.forwordRequirements"
                      v-model="fromdata.forwordRequirements"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-show="fromdata.isForword*1">
                  <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                    <el-radio-group
                      :disabled="fromdata.isSendSub == 1||readFields.isDirect"
                      v-model="fromdata.isDirect"
                      @change="directchange"
                    >
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-show="fromdata.isForword*1">
                  <el-form-item
                    label="直发范围"
                    prop="directRange"
                    ref="directRange"
                    v-show="fromdata.isDirect*1|| fromdata.isSendSub == 1"
                  >
                    <el-select
                      :disabled="fromdata.isSendSub == 1 || readFields.directRange"
                      v-model="fromdata.directRange"
                      placeholder="请选择"
                      style="width:100%"
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="item in selectContents.direct_send_range"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-show="fromdata.isForword*1">
                  <el-form-item
                    label="直发文种类"
                    prop="directType"
                    ref="directType"
                    v-show="fromdata.isDirect*1"
                  >
                    <el-select
                      :disabled="fromdata.isSendSub == 1 || readFields.directType"
                      v-model="fromdata.directType"
                      placeholder="请选择"
                      style="width:100%"
                    >
                      <el-option value label="请选择"></el-option>
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
                      <el-button :disabled="readFields.keepingLimitName" @click="qixianjd">期限鉴定表</el-button>
                    </el-col>
                    <el-col :span="9" style="width:31.4%">
                      <el-select
                        :disabled="readFields.keepingLimitName"
                        v-model="fromdata.keepingLimitName"
                        placeholder="请选择"
                        style="width:100%"
                      >
                        <el-option value="请选择"></el-option>
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
                <el-col v-if="fromdata.receiveVersion == 1 || fromdata.receiveVersion == 5">
                  <el-col>
                    <el-form-item label="承办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                      <div style="display:flex">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          v-model="fromdata.undertakeDeptName"
                          readonly
                          :disabled="readFields.undertakeDeptName"
                          :title="fromdata.undertakeDeptName"
                          placeholder="请选择承办部门"
                          style="flex:1;"
                          class="hqbm2"
                        ></el-input>
                        <button
                          @click="getTreeData('chen')"
                          v-if="fromdata.isHasCB != 1"
                          :disabled="readFields.undertakeDeptName"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-plus"></i>
                        </button>
                        <div v-show="!readFields.undertakeDeptName">
                          <button
                            :disabled="readFields.undertakeDeptName"
                            @click="getTreeData('chen',1)"
                            v-if="fromdata.isHasCB == 1"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >增发</button>
                          <button
                            :disabled="readFields.undertakeDeptName"
                            @click="takeBackSign('shouhui','chen')"
                            v-if="fromdata.isHasCB == 1"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >收回</button>
                          <button
                            :disabled="readFields.undertakeDeptName"
                            @click="takeBackSign('cuiban','chen')"
                            v-if="fromdata.isHasCB == 1"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >催办</button>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col v-if="fromdata.receiveVersion != 1 && fromdata.receiveVersion != 5">
                  <el-col :span="12">
                    <el-form-item label="承办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                      <div style="display:flex">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          v-model="fromdata.undertakeDeptName"
                          readonly
                          :disabled="readFields.undertakeDeptName"
                          :title="fromdata.undertakeDeptName"
                          placeholder="请选择承办部门"
                          style="flex:1;color: red;"
                          class="hqbm"
                        ></el-input>
                        <button
                          @click="getTreeData('chen')"
                          :disabled="readFields.undertakeDeptName"
                          v-if="fromdata.isHasCB != 1"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-plus"></i>
                        </button>
                        <div v-show="!readFields.undertakeDeptName">
                          <button
                            :disabled="readFields.undertakeDeptName"
                            @click="getTreeData('chen',1)"
                            v-if="fromdata.isHasCB == 1"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >增发</button>
                          <button
                            :disabled="readFields.undertakeDeptName"
                            @click="takeBackSign('shouhui','chen')"
                            v-if="fromdata.isHasCB == 1"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >收回</button>
                          <button
                            :disabled="readFields.undertakeDeptName"
                            @click="takeBackSign('cuiban','chen')"
                            v-if="fromdata.isHasCB == 1"
                            type="button"
                            class="el-button el-button--default dimi_btn1"
                          >催办</button>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label width="0">
                      <el-input
                        v-model="fromdata.finishUndertakeDeptName"
                        disabled
                        :title="fromdata.finishUndertakeDeptName"
                        style="width: 100%;"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="协办部门" prop="assistDeptName" ref="assistDeptName">
                    <!-- <el-input
                      v-model="fromdata.assistDeptName"
                      readonly
                      placeholder="请选择协办部门"
                      style="width: 100%;"
                      :disabled="readFields.assistDeptName"
                    >
                      <el-button slot="append" @click="getTreeData('xie',1)" v-if="fromdata.isHasXB == 1">增发</el-button>
                      <el-button slot="append" @click="takeBackSign('shouhui','xie')" v-if="fromdata.isHasXB == 1">收回</el-button>
                      <el-button slot="append" @click="takeBackSign('cuiban','xie')" v-if="fromdata.isHasXB == 1">催办</el-button>
                      <el-button slot="append" @click="getTreeData('xie')" icon="el-icon-plus" v-else></el-button>
                    </el-input>-->
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        readonly
                        :disabled="readFields.assistDeptName&&fromdata.assistDeptName"
                        :title="fromdata.assistDeptName"
                        v-model="fromdata.assistDeptName"
                        placeholder="请选择协办部门"
                        style="flex:1;color: red;"
                        class="hqbm"
                      ></el-input>
                      <button
                        @click="getTreeData('xie')"
                        :disabled="readFields.assistDeptName"
                        v-if="fromdata.isHasXB != 1"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                      <div v-show="!readFields.assistDeptName">
                        <button
                          @click="getTreeData('xie',1)"
                          :disabled="readFields.assistDeptName"
                          v-if="fromdata.isHasXB == 1"
                          type="button"
                          class="el-button el-button--default dimi_btn1"
                        >增发</button>
                        <button
                          @click="takeBackSign('shouhui','xie')"
                          :disabled="readFields.assistDeptName"
                          v-if="fromdata.isHasXB == 1"
                          type="button"
                          class="el-button el-button--default dimi_btn1"
                        >收回</button>
                        <button
                          @click="takeBackSign('cuiban','xie')"
                          :disabled="readFields.assistDeptName"
                          v-if="fromdata.isHasXB == 1"
                          type="button"
                          class="el-button el-button--default dimi_btn1"
                        >催办</button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label width="0">
                    <el-input
                      v-model="fromdata.finishAssistDeptName"
                      :disabled="readFields.finishAssistDeptName"
                      :title="fromdata.finishAssistDeptName"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="传阅人" prop="circulatePersonNames" ref="circulatePersonNames">
                    <el-input
                      v-model="fromdata.circulatePersonNames"
                      :title="fromdata.circulatePersonNames"
                      style="width: 100%;"
                      :disabled="true"
                    >
                      <el-button
                        slot="append"
                        style="border: 1px solid #000;color: #000;"
                        @click="takeBackSignCY('shouhui','cy')"
                        v-if="fromdata.isHasCY == 1"
                      >收回</el-button>
                      <!-- <el-button slot="append" @click="takeBackSign('shouhui','cy')" v-if="fromdata.isHasCY == 1">收回</el-button> -->
                      <!-- <el-button slot="append" @click="getTreeData('cy')" icon="el-icon-plus" v-else></el-button>-->
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
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      @input="changeDage($event)"
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
                      <i class="el-icon-edit"></i>
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
                <el-form-item label="办公室批办意见" prop="officeOpinion" ref="officeOpinion">
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      style="flex:1"
                      resize="none"
                      @input="changeDage($event)"
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
                      <i class="el-icon-edit"></i>
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
              <el-col
                v-if="fromdata.receiveVersion != 1&&fromdata.receiveVersion != 5 && fromdata.isShowFb == 1"
              >
                <el-form-item label="部门分办意见" prop="deptFbOpinion" ref="deptFbOpinion">
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      style="flex:1"
                      resize="none"
                      @input="changeDage($event)"
                      maxlength="500"
                      autosize
                      v-model="fromdata.deptFbOpinion"
                      :disabled="editedIdeaFields.deptFbOpinion"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=6)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-show="!editedIdeaFields.deptFbOpinion"
                    >
                      <i class="el-icon-edit"></i>
                    </button>
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
                <el-form-item label="承办部门办理情况" prop="undertakeOrgOpinion" ref="undertakeOrgOpinion">
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      style="flex:1"
                      resize="none"
                      @input="changeDage($event)"
                      maxlength="500"
                      autosize
                      v-model="fromdata.undertakeOrgOpinion"
                      :disabled="editedIdeaFields.undertakeOrgOpinion"
                      v-if="!editedIdeaFields.undertakeOrgOpinion  || (editedIdeaFields.undertakeOrgOpinion && !(fromdata.undertakeOrgOpinionList && fromdata.undertakeOrgOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=5)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-show="!editedIdeaFields.undertakeOrgOpinion"
                    >
                      <i class="el-icon-edit"></i>
                    </button>
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
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-if="fromdata.helpOrgOpinionList==''||!fromdata.helpOrgOpinionList"
                    disabled
                  ></el-input>
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
                    v-if="!(fromdata.circulateOpinionList && fromdata.circulateOpinionList.length>0)"
                    autosize
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
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      @input="changeDage($event)"
                      autosize
                      v-model="fromdata.handleTerminateOpinion"
                      :disabled="editedIdeaFields.handleTerminateOpinion"
                      v-if="!editedIdeaFields.handleTerminateOpinion  || (editedIdeaFields.handleTerminateOpinion && !(fromdata.handleTerminateOpinionList && fromdata.handleTerminateOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=3)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-show="!editedIdeaFields.handleTerminateOpinion"
                    >
                      <i class="el-icon-edit"></i>
                    </button>
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
                <el-form-item label="备    注">
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    @input="changeDage($event)"
                    autosize
                    v-model="fromdata.remarks"
                    :disabled="editedIdeaFields.remarks"
                    v-if="!editedIdeaFields.remarks||(editedIdeaFields.remarks && !(fromdata.remarksList && fromdata.remarksList.length))"
                  ></el-input>
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
                  <div class="el-textarea el-input--small is-disabled">
                    <span v-for="(item,index) in initCbRecord" :key="index">
                      {{ item }}
                      <br />
                    </span>
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
                      <el-form-item
                        label-width="80px"
                        label="未阅"
                        prop="wbjFirstCirculate"
                        ref="wbjFirstCirculate"
                      >
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          v-model="fromdata.wbjFirstCirculate"
                          :disabled="true"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="m10">
                      <el-form-item
                        label-width="80px"
                        label="已阅"
                        prop="ybjFirstCirculate"
                        ref="ybjFirstCirculate"
                      >
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          v-model="fromdata.ybjFirstCirculate"
                          :disabled="true"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-row class="pr45">
              <el-col>
                <el-form-item label="发送对象" prop="sendSubName" ref="sendSubName">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="fromdata.sendSubName"
                    placeholder="请选择发送对象"
                    disabled
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="公告至" prop="gonggaoName" ref="gonggaoName">
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
              <!-- <loadAccessory></loadAccessory> -->
              <uploadFiles
                v-if="!readFields.isSCFJ"
                ref="uploadComponent"
                @preserve="preserve"
                :uploadConfig="uploadConfig"
              ></uploadFiles>
              <el-col>
                <div
                  class="file_list_box"
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
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <span
                            class="down"
                            :title="item.fileName"
                            @click="viewDraftFile(item.fileName,item.filePath,$businessCode.swglfj)"
                          >{{ item.fileName }}</span>
                          <span class="name">{{ item.createrName }}</span>
                          <span class="time">{{ item.createTime }}</span>
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
                              v-if="!readFields.isSCFJ"
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
                    <div
                      v-for="(item1,index) in fkfjList[n]"
                      :key="item1.id"
                      class="file_list_box"
                      style="margin-left:2px !important;"
                    >
                      <template>
                        <div class="command_file">
                          <span class="order">{{ index + 1 }}.</span>
                          <span
                            class="down"
                            :title="item.fileName"
                            @click="viewDraftFile(item1.fileName,item1.filePath,$businessCode.swglfj)"
                          >{{ item1.fileName }}</span>
                          <span class="name">{{ item1.createrName }}</span>
                          <span class="time">{{ item1.createTime }}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item1)"
                              round
                            >下载</el-button>
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
      :chenBanOnly="chenBanOnly"
      :useNewDialog="useNewDialog"
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
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :scircularizeLevel="scircularizeLevel"
      :checkIds="checkIds"
      :fromdata="fromdata"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      @showCompDialog="showCompDialogForCy"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>
    <!-- 期限鉴定表 -->
    <el-dialog title="期限鉴定表" :visible.sync="dialogVisible" width="50%">
      <m-table
        size="medium"
        :isSelection="false"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        :highlightcurrentrow="true"
        @handleTableCurrentChange="handleTableCurrentChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
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
    <!-- 收回弹窗 -->
    <el-dialog :title="titleType" :visible.sync="shdialog" width="50%">
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.processInstId"
            :key="index"
            :disabled="item.processState == '处理完毕'||(titleType=='收回'&&item.processState == '处理中')"
          >{{ item.deptName }}（{{ item.processState }}）</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog = false">取 消</el-button>
        <el-button type="primary" @click="shQueding">确 定</el-button>
      </span>
    </el-dialog>
    <!--收回公告-->
    <el-dialog title="收回公告" :visible.sync="shggdialog" width="50%">
      <el-card>
        <el-checkbox
          :indeterminate="isIndeterminate_gg"
          v-model="checkAll_gg"
          @change="checkAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedshgg" @change="ggchange">
          <el-checkbox
            v-for="(item,index) in shggData"
            :label="item.id"
            :key="index"
          >{{ item.curDepartment }}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shggdialog = false">取 消</el-button>
        <el-button type="primary" @click="shggQueding">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleSecret" width="30%">
      <span>涉密文件不可发送传阅。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSecret = false">确 定</el-button>
        <!-- <el-button type="primary" @click="fasongBtn">确 定</el-button> -->
      </span>
    </el-dialog>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFile/uploadFile";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import treeCofig from "@/components/tree/tree-fawen";
import mTable from "components/table/mTable.vue";
import treeCofigForCy from "@/components/tree/tree-cy";
import timeDialog from "@/components/timedialog/timedialog";
import cyIsSend from "@/components/dialog/cyIsSend";
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft"; //2022-4-8
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/index";
import closeMessage from "@/components/closeMessage/index";
import isNowUser from "@/minixs/isNowUser";

const tableCol = [
  { label: "选择条目", prop: "mark", align: "center" },
  { label: "自动鉴定期限", prop: "limitDate", align: "center" }
];

export default {
  name: "ReceiveDispatch",
  components: {
    appendWriteList,
    treeCofig,
    mTable,
    timeDialog,
    cyIsSend,
    uploadFiles,
    treeCofigForCy,
    opinionText,
    closeMessage
  },
  data() {
    return {
      dialogVisibleSecret: false,
      readonlySwcy: true,
      qzshIsIndeterminate: false,
      qzshCheckAll: false,
      closeHandler: false,
      chenBanOnly: false,
      useNewDialog: false,
      initCbRecord: "",
      //qzsh
      qzshDialog: false,
      qzshCheck: [], //收回数据
      qzshData: [], //收回列表
      ggLx: "",
      defaultUser: {}, //完成并发送默认值
      cantClick: false, //防止多次点击
      mmlx: false,
      sendOrderNoticeInfo: "",
      // 发送对象参数pcsAvyId
      banl_sendObj: {
        function: "getTcDeptTypeDicList"
      },
      //选中对象 后最终确认发送
      bank_doSWFinalSend: {
        function: "doSWFinalSend"
      },
      showSend: false,
      showSendObj: false,
      handleSendType: "1",
      checkedCitiess: [], //回显选中的数据
      checkedCities1: [], //发送对象 选中的数据
      checkedCitiNames: [], //发送对象 选中的数据名称
      nowCheckList: [], //当前的选中项copy
      loadingCheck: false, //等待图标
      loadingTree: false, //懒加载标示
      dialogTypeNow: "", //当前弹窗的标示
      checkedGonggaoIds: [], //公告的选中的id
      nowGongGaoCheckList: [], //公告至的数据
      sendTableDatas: [{ orgDprt: [] }],
      sendTableDatasCol: [
        // { label: "建行" ,isIndeterminate: false},
      ],
      hqPtmt: false,
      scircularizeLevel: "1", //传阅常用联系人修改 12.21
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      seletOptionsDataForCy: [],
      treeTradeCode: "",
      cyper: "",
      cyid: "",
      checkAll: false,
      isIndeterminate: true,
      titleType: "",
      isCY: "",
      dialogVisiblefasong: false, //发送确定弹窗
      fkfj: [], //反馈附件
      fkfjList: [], //反馈附件
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        uploadBtn: true,
        attachTitle: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      showduban: true,
      dubanhtml: "督办",
      isSupervise: "",
      shData: [], //收回数据
      checkedsh: [], //收回列表
      shdialog: false, //收回弹窗
      shdialog1: false, //收回弹窗
      shggdialog: false, //收回公告弹窗
      checkedshgg: [], //收回公告列表
      shggData: [], //收回公告数据
      fasongCheckData: [], //fasong
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },
      offenDevices: [],
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
      treeFormCY: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: true,
        main: ""
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
        limit: 10,
        undertakeDeptId: ""
      },
      timeShow: false, //查看流程
      cbxbShow: false,
      cyIsSendShow: false, //传阅
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
        flag: true,
        showMyDept: ""
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
        function: "doFinishAndSend",
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
        curNodeId: "",
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: ""
      },
      bank_sendXb: {
        function: "createHelpSubWf",
        processInstId: "",
        multiTenancyId: "",
        pcsAvyId: "",
        tplNo: "",
        moduleType: "receive_doc_sw",
        curNodeCode: "",
        deptIds: "",
        deptNames: "",
        id: "",
        avyds: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      //查看子流程
      cbxbchakan: false,
      tableCols1: [
        {
          label: "发送时间",
          prop: "TMS",
          align: "center",
          formatter(row) {
            return (row.TMS = dateFormate.date(Date.parse(new Date(row.TMS))));
          }
        },
        { label: "部门", prop: "UNITNM", align: "center" },
        { label: "处理人", prop: "AVYEXCTRNM", align: "center" },
        { label: "完成时间", prop: "AVYEXCTRTM", align: "center" },
        { label: "状态", prop: "NODENAME", align: "center" }
        // { label: "状态", prop: "NODENAME", align: "center",formatter(row){
        //     if(row.NODEID == 800){text='完成协办'}else{'正在协办'}
        // }},
      ],
      tableData1: [],
      curUser: "",
      curNode: "",
      clickTypes: "",
      appendWriteDialog: true,
      swglCode: this.$businessCode.swgl,
      swglggCode: this.$businessCode.swglgg,
      ggjyCode: this.$businessCode.ggywgn,
      receiveselect: {
        function: "selectSWById",
        id: "",
        receiveVersion: this.receiveVersion ? this.receiveVersion : ""
      },

      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      readFlag: "",
      saveOrUpdateSW: {
        function: "doStartWfe",
        id: ""
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
        undertakeDeptId: "",
        deptFbOpinion: "",
        cbRecord: "",
        feedbackAttachmentMap: "",
        createSendOrderReceiveNotice: [],
        attachSort: [],
        attchmentFileInfo: [],
        curNodeCode: "",
        createTime: "",
        isRead: 1,
        isHasCB: "", //1-有未办结的承办，显示增发收回催办，0-无未办结的承办 隐藏增发收回催办
        isHasXB: "",
        limitDate: "", //办理期限
        progress: "", //办理进度
        daysInAdvance: "", // 提前提醒天数
        superviser: "", //督办人
        superviseDate: "", //督办日期
        direct_send_range: "", //直发范围
        keepingLimitName: "", //保管期限
        secret_flag_type: "", //秘密标志类型
        undertakeDeptName: "",
        processInstId: "", //流程实例标识
        tplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        pishiOpinion: "", //批示意见
        isDirect: 0, // 是否直发
        forwordRequirements: "",
        finishAssistDeptName: "",
        parentForwordRequirements: "",
        finishUndertakeDeptName: "",
        isForword: "0", //转发文件,
        circulatePersonIds: "",
        circulatePersonNames: "",
        title: "",
        sendSubId: "", //发送对象id
        sendSubName: "", //发送对象名称
        gonggaoName: "", //公告至对象
        attachmentTitle: "",
        receiveTime: "",
        emergencyName: "",
        documentCode: "",
        secretType: "",
        security: "",
        secretFlagType: "",
        secretLimitType: "",
        secretLimitName: "",
        sendOrgName: "",
        completeTime: "",
        receiveType: "",
        userName: "",
        draftDept: "",
        draftDeptId: "",
        directRange: "",
        directType: "",
        receiveVersion: "",
        pishiOpinionList: "",
        remarksList: "",
        officeOpinion: "",
        handleTerminateOpinionList: "",
        officeOpinionList: "",
        deptFbOpinionList: "",
        undertakeOrgOpinion: "",
        undertakeOrgOpinionList: ""
      },
      receiveVersion: "",
      selectContents: {
        business_secret_flag_type: "", //商业秘籍
        country_secret_flag_type: "", //国家密级
        direct_send_type: "", //直发文种类
        emergency_level: "", //紧急程度
        receive_type: "",
        secret_time_type: "", //保密期限类型
        secret_type: "", //秘密类型
        send_org: "" //来文单位
      },
      transIds: "",
      uploadConfigswzw: {
        id: "",
        url: "doHandleMainWord",
        code: "",
        multiTenancyId: "",
        formId: "swswzw",
        uploadBtn: false,
        noattachTitleCheck: true
      },
      showCy: true, //传阅都没有意见的显示
      uploadzwFlag: false, //上传正文标示
      rules: {},
      // copyRules: {
      //   undertakeDeptName: [
      //     { trigger: "change", required: true, message: "请选择承办部门" }
      //   ]
      // },
      //控制03
      huanJieMessage: {},
      readFields: {
        // knowScore:false,
        limitDate: false, //办理期限
        isRead: false,
        title: false,
        attachmentTitle: false,
        receiveTime: false,
        emergencyName: false,
        documentCode: false,
        secretType: false,
        secretFlagType: false,
        userName: false,
        sendOrgName: false,
        completeTime: false,
        receiveType: false,
        isForword: false,
        forwordRequirements: false,
        directRange: false,
        directType: false,
        sendSubName: false,
        undertakeDeptName: false,
        assistDeptName: false,
        circulatePersonNames: false,
        finishAssistDeptName: false,
        pishiOpinion: false,
        officeOpinion: false,
        isSCFJ: false
      },
      requiredFields: {
        limitDate: false,
        title: false,
        attachmentTitle: false,
        receiveTime: false,
        emergencyName: false,
        documentCode: false,
        secretType: false,
        secretFlagType: false,
        secretLimitType: false,
        sendOrgName: false,
        completeTime: false,
        receiveType: false,
        isForword: false,
        isDirect: false,
        directRange: false,
        directType: false,
        undertakeDeptName: false
      }, //必填控制域1` `
      editedIdeaFields: {
        remarks: true,
        pishiOpinion: true,
        officeOpinion: true,
        undertakeOrgOpinion: true,
        handleTerminateOpinion: true,
        helpOrgOpinion: true,
        deptFbOpinion: true
      }, //可编辑意见域
      requiredIdeaFields: {
        remarks: false,
        pishiOpinion: false,
        officeOpinion: false,
        undertakeOrgOpinion: false,
        handleTerminateOpinion: false,
        helpOrgOpinion: false
      },
      //必填意见域
      buttonList: [
        { name: "上传正文", type: "btn_sczw", show: false }, //[3]
        { name: "保存", type: "btn_bc", show: false }, //[0]
        { name: "完成并发送", type: "btn_wcbfs", show: false }, //[5]
        { name: "返回上一处理人", type: "btn_fhsyclr", show: false }, //[13]
        { name: "发送", type: "btn_send", show: false }, //[1]
        { name: "公告", type: "btn_gg", show: false }, //[2]
        { name: "收回公告", type: "btn_qzshgg", show: false }, //[12]
        { name: "强制收回", type: "btn_qzsh", show: false }, //[11]
        { name: "督办", type: "btn_duban", show: false }, //[14]
        { name: "取消督办", type: "btn_qxdb", show: false }, //[15]
        { name: "办结", type: "btn_banjie", show: false }, //[10]
        { name: "传阅", type: "btn_cy", show: false }, //[8]
        { name: "发送承办部门", type: "btn_fscbbm", show: false }, //[6]
        { name: "查看承办状态", type: "btn_ckcbzt", show: false }, //[17]
        { name: "发送协办部门", type: "btn_fsxbbm", show: false }, //[7]
        { name: "查看协办状态", type: "btn_ckxbzt", show: false }, //[18]
        { name: "删除", type: "btn_sccw", show: false }, //[4]
        { name: "查看流程", type: "btn_cklc", show: false }, //[16]
        { name: "打印处理单", type: "btn_dycld", show: false }, //[19]
        { name: "收藏", type: "btn_sc", show: false }, //[9]
        { name: "操作指南", type: "btn_czzn", show: false } //[20]
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
      },
      coluCheck: "", //专栏选中的项目
      coluData: [], //专栏数据
      swzwdialog: false,
      sendIds: [],
      shdialogType: "", //是收回还是催办
      shdialogTypeUnder: "", //是收回还是催办是否加字段
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      chenName1: [], //承办选中数据
      chenId1: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      xieName1: [], //协办增发选中数据
      xieId1: [], //协办增发选中数据
      cyCheckData: [], //协办选中数据
      cyName1: [], //协办增发选中数据
      cyId1: [], //协办增发选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      checkOrg: false,
      dialogType: "", //弹窗类型
      dialogTypeZF: "", //弹窗类型
      hasRadio: false, //是否有单选
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanCode,
      selectMicontent: [], //密级数据下拉框s
      keep_limit: "",
      addSendType: "",
      checkNames: [],
      isIndeterminate_gg: true,
      checkAll_gg: false
    };
  },
  mixins: [minixs, viewDraft, isNowUser],
  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    // this.$nextTick(()=>{
    //       let fwList={
    //       "title":"立项依据th",
    //       "documentCode":"紧急程度th",
    //     }
    //     console.log(this.$refs.title)
    //     for(let key in fwList){
    //       console.log(this.$refs[key])
    //       this.$refs[key].label = fwList[key]
    //     }
    //   })
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    handleColuChange(val) {
      // this.coluCheck = val

      // this.handleSendType = val;
      this.$api.adminConfig.createColumn({}).then(res => {
        let transArr = [];
        res.data.forEach(element => {
          transArr.push(element.zlSslm);
        });
        console.log(transArr);
        this.coluData = transArr;
        this.showSend = true;
      });
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];

        let newIds = [];
        let oldIds = [];
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          if (this.addSendType == "1") {
            oldIds = this.fromdata.circulatePersonIds.split(";");
            oldNames = this.fromdata.circulatePersonNames.split(";");
            ids.filter((item, i) => {
              if (oldIds.indexOf(item) == -1) {
                newNames.push(names[i]);
                newIds.push(ids[i]);
              }
            });
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
        if (this.addSendType == "1") {
          this.sendCy(newIds, newNames);
        }
        if (this.addSendType != "1" && dtype == "cy") {
          this.sendCy();
        }
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    //请求传阅部门树数据
    getTreeDataForCy(n, m) {
      let that = this;
      if (!this.fromdata.filePath) {
        this.$message({
          type: "error",
          message: "请引入正文后传阅"
        });
        return;
      }
      // let transSecretLimitType = ['公布前','公告前','会议开始前']

      if (
        that.fromdata.secretType != "" &&
        that.fromdata.secretType != "请选择" &&
        that.fromdata.secretType != "工作秘密"
      ) {
        // if (!(that.fromdata.secretType=='商业秘密'&&(transSecretLimitType.includes(that.fromdata.secretLimitType)||(transSecretLimitType.includes(that.fromdata.secretTimeType))))) {
        //   that.dialogVisibleSecret = true;
        //   return;
        // }
        this.cyIsSendShow = true;
        this.$nextTick(() => {
          this.$refs.dialogLineCY.openDialog();
        });
        return;
      }
      if (n == "cy") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      this.addSendType = m;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      if (n == "cy" && m == "1") {
        this.dialogTypeNowForCy = "zengfa";
      }
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
        case "gonggao":
          name = "公告至";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();
      if (m == 1) {
        this.dialogTypeNowForCy = "zengfa";
      }
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
          this.treeData = (res && res.data) || [];
          this.treeData[0].disabled = true;
        });
    },
    //回显传阅人员
    backDialogDataForCy(type) {
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
        case "zengfa":
          this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
          if (this.cyCheckData.length) {
            newA = [].concat(this.cyCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              console.log(item);
            });
          }
          this.checkData = this.cyCheckData;
          break;
      }
    },
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve("save");
          break;
        case "btn_send":
          this.handleSend();
          break;
        case "btn_gg":
          this.handleGg();
          break;
        case "btn_banjie":
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
        case "btn_duban":
          this.shouwenduban();
          break;
        case "btn_qxdb":
          this.unshouwenduban();
          break;
        case "btn_sccw":
          this.shanchuchiwen();
          break;
        case "btn_cy":
          if (this.fromdata.isHasCY == 1) {
            this.getTreeDataForCy("cy", 1);
          } else {
            this.getTreeDataForCy("cy");
          }
          break;
        case "btn_sc":
          this.shoucang();
          break;
        case "btn_cklc":
          this.flowScheme();
          break;
        case "btn_ckcbzt":
          this.ckxbzt("chen");
          break;
        case "btn_fhsyclr":
          this.fhsyclr();
          break;
        case "btn_qzsh":
          this.qzsh();
          break;
        case "btn_qzshgg":
          this.qzshgg();
          break;
        case "btn_ckxbzt":
          this.ckxbzt("xie");
          break;
        case "btn_sczw":
          this.sczw();
          break;
        case "btn_dycld":
          this.processSheet("/swswcld");
          break;
        case "btn_czzn":
          this.caozuozhinan();
          break;
      }
    },
    //qzsh
    qzsh() {
      this.qzshCheck = [];
      this.qzshDialog = true;
      this.qzshCheckAll = false;
      this.$post
        .postData(
          "selectBySendOrderIdAndCreateTime",
          JSON.stringify({
            function: "selectBySendOrderIdAndCreateTime",
            sendOrderId: this.fromdata.id
          }),
          this.swglggCode
        )
        .then(res => {
          console.log(res);
          this.qzshData = res.data || [];
        })
        .catch(err => {});
    },
    //收回公告
    qzshgg() {
      this.checkedshgg = [];
      this.shggdialog = true;
      this.$post
        .postData(
          "selectSendOrderNoticeIntervalList",
          JSON.stringify({
            function: "selectSendOrderNoticeIntervalList",
            shouwenId: this.fromdata.id
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          this.shggData = res.data || [];
        })
        .catch(err => {});
    },
    //qzsh
    shQuedingQZSH() {
      if (this.qzshCheck.length == 0) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择数据",
          duration: 200
        });
        return;
      }
      if (this.qzshCheck.length > 1) {
        this.qzshCheck = this.qzshCheck.join(",");
      }
      if (this.qzshCheck.length == 1) {
        this.qzshCheck = this.qzshCheck[0];
      }
      this.$post
        .postData(
          "deleteByProcessInstIds",
          JSON.stringify({
            function: "deleteByProcessInstIds",
            processInstIds: this.qzshCheck,
            flag: ""
          }),
          this.swglggCode
        )
        .then(res => {
          if (res.success) {
            this.qzshDialog = false;
            location.reload();
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 200
            });
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 200
            });
          }
        })
        .catch(err => {});
    },
    fhsyclr() {
      let obj = {
        function: "doReturnBeforeHuman",
        processInstId: this.fromdata.processInstId,
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      };
      obj = Object.assign(obj, this.fromdata);
      this.$post
        .postData("doReturnBeforeHuman", JSON.stringify(obj), this.swglCode)
        .then(res => {
          this.cantClick = false;
          if (res && res.success) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            setTimeout(() => {
              this.handleSetLoacl(); //2022-4-8
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
    undateDate(e) {
      this.$forceUpdate();
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); //必填控制
      if (this.$route.query.readonlySwcy == "swcy") {
        //文件查阅
        this.readFields = {
          // knowScore:true,
          limitDate: true, //办理期限
          isRead: true,
          title: true,
          attachmentTitle: true,
          receiveTime: true,
          emergencyName: true,
          documentCode: true,
          secretType: true,
          secretFlagType: true,
          userName: true,
          sendOrgName: true,
          completeTime: true,
          receiveType: true,
          isForword: true,
          forwordRequirements: true,
          directRange: true,
          directType: true,
          sendSubName: true,
          undertakeDeptName: true,
          assistDeptName: true,
          circulatePersonNames: true,
          finishAssistDeptName: true,
          pishiOpinion: true,
          officeOpinion: true,
          isSCFJ: true,
          isDirect: true,
          keepingLimitName: true,
          secretLimitType: true
        };
        this.buttonList = [
          { name: "查看流程", type: "btn_cklc", show: true },
          { name: "打印处理单", type: "btn_dycld", show: true },
          { name: "收藏", type: "btn_sc", show: true }
        ];
        this.editedIdeaFields = {
          remarks: true,
          pishiOpinion: true,
          officeOpinion: true,
          undertakeOrgOpinion: true,
          handleTerminateOpinion: true,
          helpOrgOpinion: true,
          deptFbOpinion: true
        };
      } else {
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
      }
      // this.readFields = this.setReadFields(
      //   this.readFields,
      //   this.huanJieMessage.readFields
      // ); //不可编辑控制域
      // this.buttonList = this.showButton(
      //   this.buttonList,
      //   this.huanJieMessage.visibleButtons,
      //   this.huanJieMessage.visibleButtonsBycondition
      // ); //按钮
      // this.editedIdeaFields = this.setEditedIdeaFields(
      //   this.editedIdeaFields,
      //   this.huanJieMessage.editedIdeaFields,
      //   this.huanJieMessage.editedIdeaFieldsBycondition
      // ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //可编辑意见域
      if (this.huanJieMessage.visibleButtons.btn_send) {
        if (this.fromdata.isForword != 1) {
          this.buttonList[4].show = false;
        } else if (
          this.fromdata.isShowSend == 1 &&
          this.fromdata.isForword == 1
        ) {
          this.buttonList[4].show = true;
        }
      }
      if (this.huanJieMessage.visibleButtons.btn_banjie) {
        //办结按钮显示
        if (this.fromdata.receiveVersion != 2) {
          //receiveVersion 1:传统实物收文 2多承办 5部门实物收文
          this.buttonList[12].show = false;
          if (this.fromdata.isHasXB == 0) {
            //没承办和协办可以办结
            this.buttonList[10].show = true;
          } else {
            //不显示
            this.buttonList[10].show = false;
          }
        } else {
          if (this.fromdata.isHasCB == 0) {
            //没承办和协办可以办结
            this.buttonList[10].show = true;
          } else {
            //不显示
            this.buttonList[10].show = false;
          }
        }
      }
      if (this.huanJieMessage.visibleButtons.btn_gg) {
        if (
          this.fromdata.secretType == "请选择" ||
          this.fromdata.secretType == "" ||
          (this.fromdata.secretLimitType &&
            this.fromdata.secretLimitType.includes("公布前") > 0)
        ) {
          this.mmlx = true;
          this.buttonList[5].show = true;
          this.buttonList[6].show = true;
        } else {
          this.mmlx = false;
          this.buttonList[5].show = false;
          this.buttonList[6].show = false;
        }
      }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          title: [
            {
              required: this.requiredFields.title,
              trigger: "change",
              message: "请输入正文标题"
            }
          ],
          attachmentTitle: [
            {
              required: this.requiredFields.attachmentTitle,
              trigger: "change",
              message: "请输入附件标题"
            }
          ],
          receiveTime: [
            {
              required: this.requiredFields.receiveTime,
              trigger: "change",
              message: "请选择收文日期"
            }
          ],
          limitDate: [
            {
              required: this.requiredFields.limitDate,
              trigger: "change",
              message: "请选择办理期限"
            }
          ],
          emergencyName: [
            {
              required: this.requiredFields.emergencyName,
              trigger: "change",
              message: "请选择紧急程度"
            }
          ],
          documentCode: [
            {
              required: this.requiredFields.documentCode,
              trigger: "change",
              message: "请输入收文字号"
            }
          ],
          secretType: [
            {
              required: this.requiredFields.secretType,
              trigger: "change",
              message: "请选择秘密类型"
            }
          ],
          secretFlagType: [
            {
              required: this.requiredFields.secretFlagType,
              trigger: "change",
              message: "请选择密级和保密期限"
            }
          ],
          secretLimitType: [
            {
              required: this.requiredFields.secretLimitType,
              trigger: "change",
              message: "请选择密级和保密期限"
            }
          ],
          sendOrgName: [
            {
              required: this.requiredFields.sendOrgName,
              trigger: "change",
              message: "请选择来文单位"
            }
          ],
          completeTime: [
            {
              required: this.requiredFields.completeTime,
              trigger: "change",
              message: "请选择成文日期"
            }
          ],
          receiveType: [
            {
              required: this.requiredFields.receiveType,
              trigger: "change",
              message: "请选择实物收文类型"
            }
          ],
          isForword: [
            {
              required: this.requiredFields.isForword,
              trigger: "change",
              message: "请选择转发文件"
            }
          ],
          isDirect: [
            {
              required: this.requiredFields.isDirect,
              trigger: "change",
              message: "请选择直发文件"
            }
          ],
          directRange: [
            {
              required: this.requiredFields.directRange,
              trigger: "change",
              message: "请选择直发范围"
            }
          ],
          directType: [
            {
              required: this.requiredFields.directType,
              trigger: "change",
              message: "请选择直发文种类"
            }
          ],
          keepingLimitName: [
            {
              required: this.requiredFields.keepingLimitName,
              trigger: "change",
              message: "请选择保管期限"
            }
          ],
          undertakeDeptName: [
            {
              required: this.requiredFields.undertakeDeptName,
              trigger: "",
              message: "请选择承办部门"
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
          handleTerminateOpinion: [
            {
              required: this.requiredIdeaFields.handleTerminateOpinion,
              message: "不能为空",
              trigger: "blur"
            },
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }
          ],
          undertakeOrgOpinion: [
            {
              required:
                this.requiredIdeaFields.undertakeOrgOpinion &&
                this.fromdata.undertakeOrgOpinionList.length == 0,
              message: "不能为空",
              trigger: "blur"
            },
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }
          ],
          remarks: [
            {
              required: this.requiredIdeaFields.remarks,
              message: "不能为空",
              trigger: "blur"
            },
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }
          ],
          helpOrgOpinion: [
            {
              required: this.requiredIdeaFields.helpOrgOpinion,
              message: "不能为空",
              trigger: "blur"
            },
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }
          ]
        };
        //isSuperviseRuqer必填的单项校验
        if (this.requiredFields.limitDate && this.isSuperviseRuqer()) {
          this.rules.limitDate[0].required = true;
        } else {
          this.rules.limitDate[0].required = false;
        }
        if (
          this.fromdata.officeOpinionList &&
          this.fromdata.officeOpinionList.length > 0
        ) {
          this.rules.officeOpinion[0].required = false;
        }
      });
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    isHasFasong() {
      if (this.fromdata.sendSubName) {
        this.dialogVisiblefasong = true;
      } else {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择发送对象",
          duration: 1500
        });
      }
    },
    selectOne() {},
    chuanyue() {},
    shoucang() {
      this.$confirm(
        "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let obj = {
            function: "collection",
            id: this.fromdata.id, //数据id
            processInstId: this.fromdata.processInstId,
            flag: "swsw", //er 电子收文  cy 传阅  swcb 实物承办  swsw 实物收文 xb 协办
            documentCode: this.fromdata.documentCode, //文号
            curNodeCode: this.fromdata.curNodeCode, //当前环节编号
            documentTitle: this.fromdata.title //正文标题
          };
          this.$post
            .postData("collection", JSON.stringify(obj), this.swglCode)
            .then(res => {
              if (res.data && res.data.downloadUrl) {
                let file = {
                  function: "doDownloadFile",
                  filePath: res.data.downloadUrl,
                  fileName: res.data.fileName
                };
                this.$post
                  .postData(
                    "doDownloadFile",
                    JSON.stringify(file),
                    this.$businessCode.nowjts
                  )
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
                          duration: 500
                        });
                      }
                    }
                  });
              }
            });
        })
        .catch(() => {});
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
                    flowTranId: this.$businessCode.swgl //流程交易线     chai
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
    shanchuchiwen() {
      this.$confirm("是否删除当前实物收文?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.fromdata.processInstId) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1500
            });
            setTimeout(() => {
              this.handleSetLoacl();
              window.location.href = "about:blank";
              window.close();
            }, 1000);
          } else {
            //删除
            this.$post
              .postData(
                "deleteSWById",
                JSON.stringify({
                  function: "deleteSWById",
                  id: this.fromdata.id
                }),
                this.swglCode
              )
              .then(res => {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 1500
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
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: res.message,
                    duration: 1500
                  });
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
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    //时间格式转换
    timeChange(type) {
      this.fromdata.receiveTime = dateFormate.date(
        Date.parse(this.fromdata.receiveTime),
        "YYYY-MM-DD  HH:mm:ss"
      );
      if (
        new Date(this.fromdata.completeTime) >
        new Date(this.fromdata.receiveTime)
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "成文日期不得超过收文日期",
          duration: 1500
        });
        this.fromdata.receiveTime = "";
      }
    },
    timeChangeBl(type) {
      this.fromdata.limitDate = dateFormate.date(
        Date.parse(this.fromdata.limitDate),
        "YYYY-MM-DD  HH:mm:ss"
      );
    },
    timeChangecw() {
      this.fromdata.completeTime = dateFormate.date(
        Date.parse(this.fromdata.completeTime),
        "YYYY-MM-DD  HH:mm:ss"
      );
      if (
        new Date(this.fromdata.completeTime) >
        new Date(this.fromdata.receiveTime)
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "成文日期不得超过收文日期",
          duration: 1500
        });
        this.fromdata.completeTime = "";
      }
    },
    //发送
    fasongBtn() {
      let judge = true;
      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
      if (!this.fromdata.forwordRequirements) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入转发要求",
          duration: 1500
        });
        this.receiveselectlist();
        return;
      }
      let oldsendSubId =
        this.fromdata.sendSubId &&
        JSON.parse(JSON.stringify(this.fromdata.sendSubId));
      let oldsendSubName =
        this.fromdata.sendSubName &&
        JSON.parse(JSON.stringify(this.fromdata.sendSubName));
      if (this.checkedCities1) {
        this.fromdata.sendSubId = this.checkedCities1.join(";");
        this.nowCheckList.map((item, index) => {
          this.fromdata.sendSubName =
            this.fromdata.sendSubName +
            (index == 0 && this.fromdata.sendSubName ? ";" : "") +
            item.name +
            (index == this.nowCheckList.length - 1 ? "" : ";");
        });
      }
      if (
        !(
          (this.checkedGonggaoIds && this.checkedGonggaoIds.length > 0) ||
          (this.checkedCities1 && this.checkedCities1.length > 0)
        )
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择发送对象或者公告至部门",
          duration: 1500
        });
        return;
      }
      if (this.coluCheck != "" && this.mmlx == true) {
        if (this.checkedGonggaoIds.length <= 0) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择要公告的部门！",
            duration: 2000
          });
          return;
        }
        this.$api.adminConfig
          .createColumn({
            zlSslm: this.coluCheck,
            zlWh: this.fromdata.documentCode, // 文号
            zlTitle: this.fromdata.title, // 标题
            attachId: "", // 附件id
            attachTitle: "", // 附件名称
            fileName: this.bank_doDownloadFile.fileName, // 正文名称
            filePath: this.bank_doDownloadFile.filePath // 正文路径
          })
          .then(res => {
            if (res.code == "SUCCESS") {
              let receiveId = res.id;
              this.$api.setSyConfig
                .saveFile({
                  id: receiveId,
                  fileId: this.fromdata.attchmentFileInfo,
                  fileType: "0"
                })
                .then(res => {});
            }
          });
      }
      this.preserve("2").then(flag => {
        if (!this.fromdata.sendSubId) {
          if (this.checkedGonggaoIds && this.checkedGonggaoIds.length > 0) {
            let objHttp = Object.assign(this.bank_doSWFinalSend, this.fromdata);
            objHttp.function = "createSendOrderReceiveNotice";
            let names = "";
            this.gongCheckData.forEach(item => {
              names = names + (names ? "," : "") + item.name;
            });
            objHttp.sendOrderNoticeInfo = this.checkedGonggaoIds
              ? this.checkedGonggaoIds.toString().replace("/[]/", "") +
                ";" +
                names
              : "";
            this.$post
              .postData(
                "createSendOrderReceiveNotice",
                JSON.stringify(objHttp),
                this.$businessCode.fawgl
              )
              .then(res => {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "发送成功",
                    duration: 1500
                  });
                  this.cancelSendObjGong();
                  this.receiveselectlist();
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: res.message,
                    duration: 1500
                  });
                }
                this.cantClick = false;
              });
          }
        } else {
          this.$post
            .postData(
              "selectNotTemp",
              JSON.stringify({
                function: "selectNotTemp",
                unitId: this.checkedCities1.join(";"),
                multiTenancyId: this.fromdata.multiTenancyId
              }),
              this.swglCode
            )
            .then(res => {
              if (res && res.success) {
                let idN = (this.receiveselect.id = getFormId(
                  this.$route.query.id,
                  "receiveDispachId"
                ));
                this.$post
                  .postData(
                    "doSend",
                    JSON.stringify({
                      function: "doSend",
                      deptIds: this.checkedCities1.join(";"),
                      id: idN
                    }),
                    this.swglCode
                  )
                  .then(res => {
                    if (res && res.success) {
                      if (this.sendOrderNoticeInfo == "") {
                        this.cantClick = false;
                        this.cancelSendObjGong();
                        this.receiveselectlist();
                        this.$message({
                          type: "success",
                          showClose: true,
                          offset: 400,
                          message: "发送成功",
                          duration: 1500
                        });
                      } else {
                        var obj = Object.assign(
                          this.bank_doSWFinalSend,
                          this.fromdata
                        );
                        obj.function = "createSendOrderReceiveNotice";
                        obj.sendOrderNoticeInfo = this.sendOrderNoticeInfo;
                        this.$post
                          .postData(
                            "createSendOrderReceiveNotice",
                            JSON.stringify(obj),
                            this.$businessCode.fawgl
                          )
                          .then(res => {
                            if (res && res.success) {
                              this.cantClick = false;
                              this.cancelSendObjGong();
                              this.receiveselectlist();
                              this.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: "发送成功",
                                duration: 1500
                              });
                            } else {
                              this.cantClick = false;
                              this.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: res.message,
                                duration: 1500
                              });
                            }
                          });
                      }
                    } else {
                      this.fromdata.sendSubId = oldsendSubId;
                      this.fromdata.sendSubName = oldsendSubName;
                      this.preserve("2");
                      this.cantClick = false;
                      this.$message({
                        type: "error",
                        offset: 400,
                        showClose: true,
                        message: res.message,
                        duration: 1500
                      });
                    }
                  })
                  .catch(erro => {
                    this.cantClick = false;
                    this.fromdata.sendSubId = oldsendSubId;
                    this.fromdata.sendSubName = oldsendSubName;
                    this.preserve("2");
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message: erro.message,
                      duration: 1500
                    });
                  });
              } else {
                this.fromdata.sendSubId = oldsendSubId;
                this.fromdata.sendSubName = oldsendSubName;
                this.preserve("2");
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: res.message,
                  duration: 2000
                });
              }
            })
            .catch(erro => {
              this.fromdata.sendSubId = oldsendSubId;
              this.fromdata.sendSubName = oldsendSubName;
              this.preserve("2");
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: erro.message,
                duration: 1500
              });
            });
        }
      });
    },
    //点击督办
    shouwenduban() {
      this.preserve("2").then(flag => {
        this.dubanclick();
      });
    },
    async dubanclick() {
      let gobackform = {
        function: "superviseReceive",
        id: this.receiveselect.id
      };
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
      let obj = Object.assign(gobackform, copyFrom);
      await this.$post
        .postData("superviseReceive", JSON.stringify(obj), this.swglCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "督办操作成功",
              duration: 1500
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
            duration: 1500
          });
        });
    },
    //取消督办
    unshouwenduban() {
      this.preserve("2").then(flag => {
        let gobackform = {
          function: "cancelSuperviseReceive",
          id: this.receiveselect.id
        };
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
        let obj = Object.assign(gobackform, copyFrom);
        this.$post
          .postData(
            "cancelSuperviseReceive",
            JSON.stringify(obj),
            this.swglCode
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "成功",
                duration: 1500
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
              duration: 1500
            });
          });
      });
    },
    getBack() {
      //收回
      const gobackform = {
        function: "doWithdrawTask",
        pcsAvyId: this.bank_sendXb.pcsAvyId
      };
      this.$post
        .postData("doWithdrawTask", JSON.stringify(gobackform), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            this.receiveselect.id = getFormId(
              this.$route.query.id,
              "receiveDispachId",
              res.data.id
            );
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1500
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
            duration: 1500
          });
        });
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
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 签批意见
          this.fromdata.pishiOpinion = this.fromdata.pishiOpinion
            ? this.fromdata.pishiOpinion + data
            : data;
        } else if (this.clickTypes == 2) {
          // 办公室批办意见
          this.fromdata.officeOpinion = this.fromdata.officeOpinion
            ? this.fromdata.officeOpinion + data
            : data;
        } else if (this.clickTypes == 3) {
          // 办结情况
          this.fromdata.handleTerminateOpinion = this.fromdata
            .handleTerminateOpinion
            ? this.fromdata.handleTerminateOpinion + data
            : data;
        } else if (this.clickTypes == 4) {
          // 签发意见
          this.fromdata.opinionSend = this.fromdata.opinionSend
            ? this.fromdata.opinionSend + data
            : data;
        } else if (this.clickTypes == 5) {
          // 承办部门办理情况
          this.fromdata.undertakeOrgOpinion = this.fromdata.undertakeOrgOpinion
            ? this.fromdata.undertakeOrgOpinion + data
            : data;
        } else if (this.clickTypes == 6) {
          // 承办部门办理情况
          this.fromdata.deptFbOpinion = this.fromdata.deptFbOpinion
            ? this.fromdata.deptFbOpinion + data
            : data;
        }
        this.$forceUpdate();
      }
    },
    //定密依据弹窗弹出
    writelistbox() {
      this.appendWriteDialog = true;
      this.getCommonUse(0);
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    changeDage(e) {
      this.$forceUpdate();
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
    //切换秘密类型
    selectType(type) {
      if (type == "" || type == "请选择") {
        this.fromdata.secretFlagType = "";
        this.fromdata.secretLimitType = "";
        return;
      }
      if (type.trim() === "商业秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.business_secret_flag_type
        );
      } else if (type.trim() === "国家秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.country_secret_flag_type
        );
      }
      this.fromdata.secretFlagType = "";
      if (
        this.fromdata.secretType == "请选择" ||
        (this.fromdata.secretLimitType &&
          this.fromdata.secretLimitType.includes("公布前") > 0)
      ) {
        this.mmlx = true;
        if (this.huanJieMessage.visibleButtons.btn_gg) {
          this.buttonList[5].show = true;
          this.buttonList[6].show = true;
        }
      } else {
        this.mmlx = false;
        this.buttonList[5].show = false;
        this.buttonList[6].show = false;
      }
    },
    selectMiHandlerTs(val) {
      this.fromdata.secretLimitType = val;

      if (
        this.fromdata.secretType == "请选择" ||
        this.fromdata.secretLimitType.includes("公布前")
      ) {
        if (this.huanJieMessage.visibleButtons.btn_gg) {
          this.buttonList[5].show = true;
          this.buttonList[6].show = true;
        }
      } else {
        this.buttonList[5].show = false;
        this.buttonList[6].show = false;
      }
      this.$forceUpdate();
    },

    selectMiHandler(val) {
      // secretLimitType;
      this.fromdata.secretFlagType = val;
      this.$forceUpdate();
      if (
        this.fromdata.secretType == "请选择" ||
        this.fromdata.secretLimitType.includes("公布前")
      ) {
        this.buttonList[5].show = true;
        this.buttonList[6].show = true;
      } else {
        this.buttonList[5].show = false;
        this.buttonList[6].show = false;
      }
    },
    directchange(val) {
      // debugger
      if (this.fromdata.isForword == "1") {
        if (
          this.huanJieMessage.visibleButtons.btn_send &&
          this.fromdata.isShowSend == 1
        ) {
          console.log(this.huanJieMessage.visibleButtons);
          this.buttonList[4].show = true;
        }
        if (this.fromdata.isDirect == undefined) {
          this.fromdata.isDirect = 0;
        }
      } else if (this.fromdata.isForword == "0") {
        if (this.huanJieMessage.visibleButtons.btn_send) {
          this.buttonList[4].show = false;
        }
        this.fromdata.directRange = "";
        this.fromdata.directType = "";
      }
      if (this.fromdata.isDirect == 1) {
        //this.setConfig();
      } else if (this.fromdata.isDirect == 0) {
        this.fromdata.forwordRequirements = "";
        this.fromdata.directType = "";
        this.fromdata.directRange = "";
        this.fromdata.sendSubName = "";
      }
      this.$forceUpdate();
    },
    qixianjd() {
      this.dialogVisible = true;

      this.referForm.undertakeDeptId = this.fromdata.undertakeDeptId;
      console.log(this.referForm.undertakeDeptId, "---------");

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
    //可被收回传阅单的列表
    takeBackSignCY() {
      this.checkedsh = [];
      this.shdialog1 = true;
      let parms = {
        function: "selectallowBackCirculate",
        id: this.fromdata.id,
        multiTenancyId: this.fromdata.multiTenancyId
      };
      this.$post
        .postData(
          "selectallowBackCirculate",
          JSON.stringify(parms),
          this.swglggCode
        )
        .then(res => {
          if (res && res.success) {
            this.shData = res.data;
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
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < this.shData.length; j++) {
          if (this.shData[j].processInstId == a[i]) {
            this.checkNames.push(this.shData[j].deptName);
          }
        }
      }
      this.checkNames = this.checkNames.join(";");
    },
    //收回公告全选
    checkAllChange(val) {
      if (val) {
        let allArray = [];
        for (let i = 0; i < this.shggData.length; i++) {
          allArray.push(this.shggData[i].id);
        }
        this.checkedshgg = allArray;
      } else {
        this.checkedshgg = [];
      }
      this.isIndeterminate_gg = false;
    },
    //收回公告选择
    ggchange(value) {
      let checkedCount = value.length;
      this.checkAll_gg = checkedCount === this.shggData.length;
      this.isIndeterminate_gg =
        checkedCount > 0 && checkedCount < this.shggData.length;
    },
    //收回公告确定按钮
    shggQueding() {
      let checkGgboxdata = this.checkedshgg.join(",");
      let shform = {
        function: "doSendOrderNoticeByIdList",
        id: checkGgboxdata
      };
      if (!checkGgboxdata) {
        return;
      }
      this.$post
        .postData(
          "doSendOrderNoticeByIdList",
          JSON.stringify(shform),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回公告成功",
              duration: 200
            });
            this.shggdialog = false;
            this.getDataFive();
          } else {
            this.$message.error("收回公告失敗");
          }
        });
    },
    handleCheckAllChange(val) {
      this.checkedsh = val ? this.shData : [];
      this.isIndeterminate = false;
      this.$forceUpdate();
    },

    handleCheckedCitiesChange(value) {
      let a = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.shData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.shData.length;
      this.checkNames = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < this.shData.length; j++) {
          if (this.shData[j].processInstId == a[i].processInstId) {
            this.checkNames.push(this.shData[j].deptName);
          }
        }
      }
      this.checkNames = this.checkNames.join(";");
    },
    shQuedingCY() {
      if (this.checkedsh.length < 1) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择要收回人员",
          duration: 500
        });
        return;
      }
      let checkboxdata = [];
      for (let i = 0; i < this.checkedsh.length; i++) {
        checkboxdata.push(this.checkedsh[i].id);
      }
      checkboxdata = checkboxdata.join(";");
      let parms = {
        function: "takeBackCirculate",
        id: this.fromdata.id,
        ids: checkboxdata,
        multiTenancyId: this.fromdata.multiTenancyId
      };
      this.$post
        .postData("takeBackCirculate", JSON.stringify(parms), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            this.shdialog1 = false;
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1500
            });
            this.receiveselectlist();
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    //收回t催办
    takeBackSign(type, isC) {
      this.checkedsh = [];
      this.shdialog = true;
      let parms = {
        function: "getSubWfInfo",
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId
      };
      if (isC == "xie") {
        if (parms.undertake) {
          delete parms.undertake;
        }
        this.shdialogTypeUnder = false;
      } else if (isC == "chen") {
        Object.assign(parms, { undertake: "" });
        this.shdialogTypeUnder = true;
      }
      if (type == "shouhui") {
        this.titleType = "收回";
        this.shdialogType = "shouhui";
      } else if (type == "cuiban") {
        this.titleType = "催办";
        this.shdialogType = "cuiban";
      }
      this.$post
        .postData("getSubWfInfo", JSON.stringify(parms), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            this.shData = res.data;
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },

    //收回确定按钮
    shQueding() {
      let checkboxdata = this.checkedsh.join(";");
      let shform = {
        pcsAvyId: this.fromdata.pcsAvyId,
        multiTenancyId: this.fromdata.multiTenancyId,
        subProcessInstId: checkboxdata,
        id: this.receiveselect.id
      };

      if (this.shdialogTypeUnder == true) {
        //'承办部门：' +
        let cbList = "收回承办部门：" + this.checkNames;
        Object.assign(shform, { undertake: "", takeBackDeptNames: cbList });
      } else {
        let cbList = "收回协办部门：" + this.checkNames;
        Object.assign(shform, { takeBackDeptNames: cbList });
        delete shform.undertake;
      }
      if (!checkboxdata) {
        return;
      }
      if (this.shdialogType == "shouhui") {
        Object.assign(shform, { function: "takeBackSignHelp" });
        this.$post
          .postData("takeBackSignHelp", JSON.stringify(shform), this.swglggCode)
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1500
              });
              this.shdialog = false;
              if (res.showFlag) {
                if (this.shdialogTypeUnder == true) {
                  this.fromdata.isHasCB = 1;
                  //发送承办部门按钮不显示 ctl
                  // if(this.huanJieMessage.visibleButtons.btn_fscbbm){
                  //   this.buttonList[7].show=false;
                  // }
                } else {
                  this.fromdata.isHasXB = 1;
                  //发送承办部门按钮不显示 ctl
                  // if(this.huanJieMessage.visibleButtons.btn_fsxbbm){
                  //   this.buttonList[8].show=false;
                  // }
                }
                //等于1隐藏办结
                if (this.huanJieMessage.visibleButtons.btn_banjie) {
                  this.buttonList[10].show = false;
                }
              } else {
                if (this.shdialogTypeUnder == true) {
                  this.fromdata.isHasCB = 0;
                  // if(this.huanJieMessage.visibleButtons.btn_fscbbm){
                  //   this.buttonList[7].show=true;
                  // }
                } else {
                  this.fromdata.isHasXB = 0;
                  // if(this.huanJieMessage.visibleButtons.btn_fsxbbm){
                  //   this.buttonList[8].show=true;
                  // }
                }
                //等于0显示办结
                if (this.huanJieMessage.visibleButtons.btn_banjie) {
                  if (this.fromdata.receiveVersion == 1) {
                    if (this.fromdata.isHasXB == 0) {
                      //没承办和协办可以办结
                      this.buttonList[10].show = true;
                    } else {
                      //不显示
                      this.buttonList[10].show = false;
                    }
                  } else {
                    if (
                      this.fromdata.isHasXB == 0 &&
                      this.fromdata.isHasCB == 0
                    ) {
                      //没承办和协办可以办结
                      this.buttonList[10].show = true;
                    } else {
                      //不显示
                      this.buttonList[10].show = false;
                    }
                  }
                }
              }
              this.receiveselectlist();
            }
          });
      } else if (this.shdialogType == "cuiban") {
        Object.assign(shform, { function: "urgeHandle" });
        this.$post
          .postData("urgeHandle", JSON.stringify(shform), this.swglggCode)
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "催办成功",
                duration: 1500
              });
              this.shdialog = false;
              this.receiveselectlist();
              // if(res.showFlag){
              //   //ctl
              //   this.fromdata.isHasXB =1;
              //   this.buttonList[6].show=false;
              // }else{
              //   this.fromdata.isHasXB =0;
              //   this.buttonList[6].show=true;
              // }
              this.$forceUpdate();
            }
          });
      }
      // if(this.fromdata.isHasXB ==1 || this.fromdata.isHasCB == 1){
      //   this.buttonList[6].show=false;
      // }else{
      //   this.buttonList[6].show=true;
      // }
    },
    //督办
    supreviseDb() {
      let checkboxdata = this.checkedsh.join(";");
      let shform = {
        function: "superviseReceive",
        id: this.receiveselect.id
      };
      this.$post
        .postData("superviseReceive", JSON.stringify(shform), this.swglCode)
        .then(res => {
          if (res && res.success) {
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "请求成功",
                duration: 1500
              });
            }
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1500
          });
        });
    },

    //取消督办
    unsupreviseDb() {
      let checkboxdata = this.checkedsh.join(";");
      let shform = {
        function: "cancelSuperviseReceive",
        id: this.receiveselect.id
      };
      this.$post
        .postData(
          "cancelSuperviseReceive",
          JSON.stringify(shform),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "请求成功",
                duration: 1500
              });
            }
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1500
          });
        });
    },
    //查看承办状态
    ckxbzt(type) {
      //this.cbxbShow = true;
      this.cbxbchakan = true;
      if (type == "chen") {
        this.$post
          .postData(
            "getSubProcessInfo",
            JSON.stringify({
              function: "getSubProcessInfo",
              processInstId: this.fromdata.processInstId,
              tplbsnid: "SWSW_CB"
            }),
            this.swglggCode
          )
          .then(res => {
            this.tableData1 = res.data;
          });
      } else if (type == "xie") {
        this.$post
          .postData(
            "getSubProcessInfo",
            JSON.stringify({
              function: "getSubProcessInfo",
              processInstId: this.fromdata.processInstId,
              //tplbsnid:"SWSWXB,SWSWCT_XB",
              tplbsnid:
                this.fromdata.receiveVersion == 1 ||
                this.fromdata.receiveVersion == 5
                  ? "SWSWCT_XB"
                  : "SWSW_XB"
            }),
            this.swglggCode
          )
          .then(res => {
            this.tableData1 = res.data;
          });
      }
    },
    //发送承办
    async sendCb(newIds, newNames, oldIds, oldNames) {
      this.preserve("2").then(flag => {
        this.cantClick = true;
        if (flag == true) {
          this.bank_sendXb.deptIds = this.fromdata.undertakeDeptId;
          this.bank_sendXb.deptNames = this.fromdata.undertakeDeptName;
          let obj = Object.assign(this.bank_sendXb, { undertake: true });

          //增发
          if (!this.fromdata.undertakeDeptId) {
            this.cantClick = false;
            obj.deptIds = "";
            obj.deptNames = "";
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "请选择承办部门",
              duration: 1500
            });
            return;
          }
          if (newNames) {
            obj.deptIds = newIds;
            obj.deptNames = newNames;
          } else {
            obj.deptIds = this.fromdata.undertakeDeptId;
            obj.deptNames = this.fromdata.undertakeDeptName;
          }
          obj.avyds = "发送承办部门:" + obj.deptNames;
          if (
            (this.addSendType == "1" && newNames) ||
            this.addSendType != "1"
          ) {
            this.$post
              .postData("createHelpSubWf", JSON.stringify(obj), this.swglCode)
              .then(res => {
                if (res && res.success) {
                  this.cantClick = false;
                  this.$message({
                    message: "发送成功",
                    type: "success"
                  });
                } else {
                  this.cantClick = false;
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
                this.receiveselectlist();
              })
              .catch(err => {
                this.cantClick = false;
                this.$message({
                  message: err,
                  type: "error"
                });
                this.receiveselectlist();
              });
          }
        }
      });
    },
    getHuanJie() {
      this.$post
        .postData(
          "getNextUserTaskNode",
          JSON.stringify({
            function: "getNextUserTaskNode",
            processInstId: this.fromdata.processInstId
          }),
          this.swglggCode
        )
        .then(res => {
          this.huanJieMessage = res.data.extAttributes;
          this.setConfig();
          this.setFormConfig();
        })
        .catch(err => {
          console.log(err);
        });
      //readFlag
      if (this.readFlag != 1) {
        this.getReadFlag();
      }
    },
    //发送协办
    async sendXb(newIds, newNames, oldIds, oldNames) {
      this.preserve("2").then(flag => {
        if (flag == true) {
          this.cantClick = true;
          if (this.bank_sendXb.undertake) delete this.bank_sendXb.undertake;
          if (newIds == "1") {
            this.bank_sendXb.deptIds = this.fromdata.assistDeptId;
            this.bank_sendXb.deptNames = this.fromdata.assistDeptName;
            this.bank_sendXb.avyds =
              "发送协办部门:" + this.bank_sendXb.deptNames;
          } else {
            this.bank_sendXb.deptIds = this.transIds;
            this.bank_sendXb.deptNames = this.fromdata.assistDeptName;
            this.bank_sendXb.avyds =
              "发送协办部门:" + this.bank_sendXb.deptNames;
          }
          let obj = Object.assign({}, this.bank_sendXb);

          //增发
          if (!this.fromdata.assistDeptId) {
            obj.deptIds = "";
            obj.deptNames = "";
            this.cantClick = false;
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "请选择协办部门",
              duration: 1500
            });
            return;
          }
          if (newNames) {
            obj.deptIds = newIds;
            obj.deptNames = newNames;
          } else {
            obj.deptIds = this.fromdata.assistDeptId;
            obj.deptNames = this.fromdata.assistDeptName;
          }
          obj.avyds = "发送协办部门:" + obj.deptNames;
          if (
            (this.addSendType == "1" && newNames) ||
            this.addSendType != "1"
          ) {
            this.$post
              .postData("createHelpSubWf", JSON.stringify(obj), this.swglCode)
              .then(res => {
                this.cantClick = false;
                if (res && res.success) {
                  this.$message({
                    message: "发送成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
                this.receiveselectlist();
              })
              .catch(err => {
                this.cantClick = false;
                this.$message({
                  message: err,
                  type: "error"
                });
                this.receiveselectlist();
              });
          }
        }
        this.$forceUpdate();
      });
    },

    handleTableCurrentChange(val) {
      this.checkedArr = val.limitDate;
      this.fromdata.keepingLimitName = this.checkedArr;
    },
    handleSizeChange(val) {
      this.referForm.limit = this.pagination.limit = val;
      this.pagination.page = this.referForm.page = 1;
      this.tableData = [];
      this.qixianjd();
    },
    handleCurrentChange(val) {
      this.pagination.page = this.referForm.page = val;
      this.tableData = [];
      this.qixianjd();
    },
    handleSave() {
      this.dialogVisible = false;
      //  this.preserve();
    },
    // 打印处理单
    processSheet(path, id) {
      this.preserve().then(save => {
        if (save) {
          const routeData = this.$router.resolve({
            path: path,
            query: {
              id: this.receiveselect.id,
              isdb: this.fromdata.isSupervise,
              receiveVersion: this.fromdata.receiveVersion,
              choseYear: this.$route.query.choseYear
            }
          });
          window.open(routeData.href, "_blank");
        }
      });
    },
    getDataOne() {
      this.$post
        .postData(
          "selectSWById",
          JSON.stringify(this.receiveselect),
          this.swglCode
        )
        .then(res => {
          if (res.data) {
            this.getIsNowUser(res, "fcy", "db");
            this.fromdata = Object.assign(this.fromdata, res.data);
            let shouwenInfo = {
              文号: res.data.documentCode || "",
              标题: res.data.title || ""
            };
            this.$store.dispatch("setshouwenInfo", shouwenInfo);
            if (res.data.level && res.data.level == "1") {
              //传阅常用联系人修改 12.21
              this.scircularizeLevel = "2"; //传阅常用联系人修改 12.21
            } else {
              this.scircularizeLevel = "1"; //传阅常用联系人修改 12.21
            }
            // if (!res.data.isRead) {
            //   this.fromdata.isRead = 0;
            // }
            // if (!res.data.isForword) {
            //   // this.fromdata.isForword = "0";
            //   this.fromdata.isForword = 0;
            // }
            if (res.data.cbRecord) {
              this.fromdata.cbRecord = this.fromdata.cbRecord.split(";");
              this.initCbRecord = this.fromdata.cbRecord;
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

            if (res.data.processInstId) {
              this.$post
                .postData(
                  "getNextUserTaskNode",
                  JSON.stringify({
                    function: "getNextUserTaskNode",
                    processInstId: res.data.processInstId
                  }),
                  this.swglggCode
                )
                .then(res => {
                  this.huanJieMessage = res.data.extAttributes;
                  this.setConfig();
                  this.setFormConfig();
                })
                .catch(err => {
                  console.log(err);
                });
              //readFlag
              if (this.readFlag != 1) {
                this.$post
                  .postData(
                    "doUpdateReadRecord",
                    JSON.stringify({
                      function: "doUpdateReadRecord",
                      pcsAvyId: res.data.pcsAvyId,
                      processInstId: res.data.processInstId,
                      multiTenancyId: res.data.multiTenancyId,
                      tableId: this.$route.query.tableId || ""
                    }),
                    this.swglggCode
                  )
                  .then(res => {
                    //更新状态用。暂时不用任何操作
                    if (res && res.success) {
                      if (!this.$route.query.noRefresh) {
                        setTimeout(() => {
                          if (
                            !(localStorage.getItem("st").indexOf("smarto") > -1)
                          ) {
                            window.opener.location.reload();
                          }
                        }, 1000);
                      }
                    }
                  });
              }
            } else {
              this.$post
                .postData(
                  "getpcsTplStartNode",
                  JSON.stringify({
                    function: "getpcsTplStartNode",
                    multiTenancyId: res.data.multiTenancyId
                  }),
                  this.swglggCode
                )
                .then(res => {
                  this.huanJieMessage = res.data;
                  this.setConfig();
                  this.setFormConfig();
                })
                .catch(err => {
                  console.log(err);
                });
              //设置当前日期
              if (!res.data.receiveTime || res.data.receiveTime == "") {
                let d = new Date();
                this.fromdata.receiveTime =
                  new Date().getFullYear() +
                  "-" +
                  (new Date().getMonth() + 1) +
                  "-" +
                  d.getDate();
              }
            }

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
            // if (this.fromdata.isForword == "1") {

            //   this.fromdata.isForword = "1";
            // } else if (this.fromdata.isForword == "0") {
            //   this.fromdata.isForword = "0";
            //   //this.fromdata.isForword = 0;
            // }
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
            // if (res.data.circulatePersonNames) {
            //   this.cyCheckData = this.concatTreeData(
            //     res.data.circulatePersonIds,
            //     res.data.circulatePersonNames
            //   );
            // } else {
            //   this.cyCheckData = [];
            // }
            //  if(res.data.undertakeDeptName&&res.data.undertakeDeptName!=''){
            //   let newUnderTakeName = res.data.undertakeDeptName.split('')
            //    newUnderTakeName.forEach((item,i)=>{
            //   if(item == ';'){
            //       if(newUnderTakeName[i+1]==''||newUnderTakeName[i+1]==';')newUnderTakeName.splice(i+1,1)
            //       if(newUnderTakeName[i-1]=='')newUnderTakeName.splice(i-1,1)
            //       if(i==0||i==newUnderTakeName.length-1)newUnderTakeName.splice(i,1)
            //     }
            //   })
            //   this.fromdata.undertakeDeptName=newUnderTakeName.join('')
            //   let newUnderTakeId = res.data.undertakeDeptId.split('')
            //   newUnderTakeId.forEach((item,i)=>{
            //       if(item == ';'){
            //         if(newUnderTakeId[i+1]==''||newUnderTakeId[i+1]==';')newUnderTakeId.splice(i+1,1)
            //         if(newUnderTakeId[i-1]=='')newUnderTakeId.splice(i-1,1)
            //         if(i==0||i==newUnderTakeId.length-1)newUnderTakeId.splice(i,1)
            //       }
            //     })
            //     this.fromdata.undertakeDeptId=newUnderTakeId.join('')
            // }
            // if(res.data.assistDeptName&&res.data.assistDeptName!=''){
            //   let newAssistDeptName = res.data.assistDeptName.split('')
            //   let newAssistDepId = res.data.assistDeptId.split('')
            //   newAssistDeptName.forEach((item,i)=>{
            //     if(item == ';'){
            //       if(newAssistDeptName[i+1]==''||newAssistDeptName[i+1]==';')newAssistDeptName.splice(i+1,1)
            //       if(newAssistDeptName[i-1]=='')newAssistDeptName.splice(i-1,1)
            //       if(i==0||i==newAssistDeptName.length-1)newAssistDeptName.splice(i,1)
            //     }
            //   })
            //   this.fromdata.assistDeptName=newAssistDeptName.join('')
            //   newAssistDepId.forEach((item,i)=>{
            //     if(item == ';'){
            //       if(newAssistDepId[i+1]==''||newAssistDepId[i+1]==';')newAssistDepId.splice(i+1,1)
            //       if(newAssistDepId[i-1]=='')newAssistDepId.splice(i-1,1)
            //       if(i==0||i==newAssistDepId.length-1)newAssistDepId.splice(i,1)
            //     }
            //   })
            //   this.fromdata.assistDeptId=newAssistDepId.join('')
            // }
            this.$post
              .postData(
                "selectWbjCirculateSw",
                JSON.stringify({
                  function: "selectWbjCirculateSw",
                  id: this.receiveselect.id
                }),
                this.swglCode
              )
              .then(res => {
                if (res && res.success) {
                  this.fromdata = Object.assign(this.fromdata, res.data);
                  if (res.data.circulatePersonNames) {
                    this.fromdata.circulatePersonNames =
                      res.data.circulatePersonNames;
                    this.fromdata.circulatePersonIds =
                      res.data.circulatePersonIds;
                    this.cyCheckData = this.concatTreeData(
                      res.data.circulatePersonIds,
                      res.data.circulatePersonNames
                    );
                  } else {
                    this.cyCheckData = [];
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
            if (res.data.isForword == "" || !res.data.isForword) {
              this.fromdata.isForword = 0;
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
            this.$forceUpdate();
          }
        });
    },
    getDataTwo() {
      this.$post
        .postData(
          "selectAttachmentListSw",
          JSON.stringify({
            function: "selectAttachmentListSw",
            id: this.receiveselect.id
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
            if (res.data.circulateOpinionList) {
              for (let i = 0; i < res.data.circulateOpinionList.length; i++) {
                if (res.data.circulateOpinionList[i].opinions != "") {
                  this.showCy = false;
                }
              }
            }
            //反馈处理
            this.fkfj = [];
            this.fkfjList = [];
            for (let i in this.fromdata.feedbackAttachmentMap) {
              let k = 0;
              this.fkfj.push(i);
              this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i]);
            }
            this.$forceUpdate();
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
            id: this.receiveselect.id
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.clearOpinion();
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //清除意见域输入框内容
    clearOpinion() {
      this.fromdata.pishiOpinion = ""; //批示意见
      this.fromdata.officeOpinion = ""; //办公室批办意见
      this.fromdata.deptFbOpinion = ""; //部门分办意见
      this.fromdata.undertakeOrgOpinion = ""; //承办部门办理情况
      this.fromdata.helpOrgOpinionList = ""; //协办部门办理情况
      this.fromdata.handleTerminateOpinion = ""; //办结情况
      this.fromdata.remarks = ""; //备注
    },
    getDataFour() {
      this.$post
        .postData(
          "selectOtherOpinionListSw",
          JSON.stringify({
            function: "selectOtherOpinionListSw",
            id: this.receiveselect.id
          }),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.$forceUpdate();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取已发送的公告至对象
    getDataFive() {
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
            this.fromdata.gonggaoName = res.data
              ? JSON.parse(JSON.stringify(res.data))
              : "";
            this.$forceUpdate();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    receiveselectlist() {
      this.receiveselect.id = getFormId(
        this.$route.query.id,
        "receiveDispachId"
      );
      this.getDataOne();
      this.getDataTwo();
      this.getDataThree();
      this.getDataFour();
      this.getDataFive();

      this.$post
        .postData(
          "getReceiveDropDownDataSource",
          JSON.stringify(this.getReceiveDropDownDataSource),
          this.swglCode
        )
        .then(res => {
          if (res && res.success) {
            this.selectContents = Object.assign(this.selectContents, res.data);
            this.keep_limit = res.data.keep_limit;
            this.selectContents.receive_type = res.data.receive_type;
            if (this.fromdata.secretType != "") {
              if (this.fromdata.secretType.trim() === "商业秘密") {
                this.selectMicontent = [].concat(
                  this.selectContents.business_secret_flag_type
                );
              } else if (this.fromdata.secretType.trim() === "国家秘密") {
                this.selectMicontent = [].concat(
                  this.selectContents.country_secret_flag_type
                );
              }
            }
            this.$nextTick(() => {
              this.$refs.fromdata.clearValidate();
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //督办必填校验
    isSuperviseRuqer() {
      return this.fromdata.isSupervise == 1 ? true : false;
    },
    async preserve(type) {
      this.cantClick = true;
      this.receiveselect.id = getFormId(
        this.$route.query.id,
        "receiveDispachId"
      );
      if (this.receiveselect.id) {
        this.swzwdialog = false;
        this.uploadzwFlag = false;
      }
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
      let obj = Object.assign(this.saveOrUpdateSW, copyFrom);
      let successState = false;
      await this.$post
        .postData("doStartWfe", JSON.stringify(obj), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            this.receiveselect.id = getFormId(
              this.$route.query.id,
              "receiveDispachId",
              res.data.id
            );
            this.fromdata = Object.assign(this.fromdata, res.data);
            this.uploadConfig.id = res.data.id;
            this.uploadConfigswzw.id = res.data.id;
            if (type && type != "2" && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 1500
              });
            }
            if (type == "uploadfile") {
              if (this.uploadzwFlag) {
                this.$refs.uploadComponentSczw.uploadFileNow();
                this.uploadzwFlag = false;
              } else {
                this.$refs.uploadComponent.uploadFileNow();
              }
            }
            this.receiveselectlist();
            successState = true;
            this.cantClick = false;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1500
            });
            this.cantClick = false;
          }
        })
        .catch(err => {
          this.cantClick = false;
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1500
          });
        });
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
    async btnCloseHandler(val) {
      if (val == 1) {
        this.handleSetLoacl();
        window.close();
      } else if (val == 2) {
        await this.preserve(1);
        this.handleSetLoacl();
        window.location.href = "about:blank";
        if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
          window.opener.location.reload();
        }
        window.close();
      } else {
        this.closeHandler = false;
      }
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
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      var handbook = flagFile
        ? self.$businessCode.fwbzfj
        : self.$businessCode.swglfj;
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
        if (name === "sendSubName") {
          this.fromdata.sendSubName = "";
          this.fasongCheckData = [];
        }
      }
    },
    //发送传阅人
    async sendCy(newIds, newNames, oldIds, oldNames) {
      this.preserve("2").then(flag => {
        if (flag == true) {
          let obj = {
            function: "sendCirculate",
            circulatePersonIds: this.fromdata.circulatePersonIds,
            circulatePersonNames: this.fromdata.circulatePersonNames,
            multiTenancyId: this.fromdata.multiTenancyId,
            id: this.fromdata.id
          };
          //增发
          if (newNames) {
            obj.circulatePersonIds = newIds;
            obj.circulatePersonNames = newNames;
          } else {
            obj.circulatePersonIds = this.fromdata.circulatePersonIds;
            obj.circulatePersonNames = this.fromdata.circulatePersonNames;
          }
          if (
            (this.addSendType == "1" && newNames) ||
            this.addSendType != "1"
          ) {
            this.cantClick = true;
            this.$post
              .postData("sendCirculate", JSON.stringify(obj), this.swglggCode)
              .then(res => {
                this.cantClick = false;
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "发送传阅人成功",
                    duration: 1500
                  });
                  this.receiveselectlist();
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "发送传阅人失败",
                    duration: 1500
                  });
                  this.fromdata.circulatePersonIds = oldIds;
                  this.fromdata.circulatePersonNames = oldNames;
                }
              })
              .catch(e => {
                this.cantClick = false;
                console.log(e);
              });
          }
        }
      });
    },
    //收回传阅人
    takeBackCy() {
      this.$post
        .postData(
          "takeBackCirculate",
          JSON.stringify({
            function: "takeBackCirculate",
            multiTenancyId: this.fromdata.multiTenancyId,
            id: this.fromdata.id
          }),
          this.swglggCode
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata.circulatePersonIds = res.data.circulatePersonIds;
            this.fromdata.circulatePersonNames = res.data.circulatePersonNames;
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1500
            });
            this.receiveselectlist();
            this.$forceUpdate();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "收回失败",
              duration: 1500
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //请求部门树数据
    getTreeData(n, m) {
      this.ggLx = "";
      if (n == "cy") {
        let judge = true;
        judge = this.scrollIntoForm();
        if (!judge) {
          return;
        }
        this.isCY = true;
        this.dialogType = "dosend";
        this.checkOrg = true;
      } else if (n == "fasong") {
        this.checkOrg = true;
        this.dialogType = "gonggao";
      } else if (n == "gonggao") {
        this.dialogType = "gonggao";
        this.checkOrg = true;
      } else {
        this.isCY = false;
        this.dialogType = "hui";
        this.checkOrg = false;
      }
      this.singelCheckF = false;
      if (
        n == "chen" &&
        (this.fromdata.receiveVersion == 5 || this.fromdata.receiveVersion == 1)
      ) {
        this.singelCheckF = true;
      }
      if (m == "2") {
        this.ggLx = "2";
      }
      this.offenUse = false;
      this.dialogTypeZF = n;
      let name = "";
      this.addSendType = m;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      if (n == "cy" && m == "1") {
        this.dialogTypeNow = "zengfa";
      }
      this.useNewDialog = false;
      this.chenBanOnly = false;
      switch (n) {
        case "chen":
          name = "承办部门";
          clearName = "undertakeDeptName";
          this.chenBanOnly = false;
          !this.fromdata.receiveVersion ||
          this.fromdata.receiveVersion === 1 ||
          this.fromdata.receiveVersion === 5
            ? (this.singelCheckF = true)
            : "";
          break;
        case "xie":
          this.useNewDialog = true;
          this.chenBanOnly = true;
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
        case "gonggao":
          this.useNewDialog = true;
          this.chenBanOnly = true;
          this.checkOrg = true;
          this.dialogTypeNow = "gonggao";
          name = "公告至";
          break;
      }
      if (n === "gonggao") {
        // this.loadingTree = true;
        this.canTab = false;
        this.singelCheckF = false;
      }
      //this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      if (m == 1) {
        this.dialogTypeNow = "zengfa";
      }
      //增加一个类型接口
      if (n == "fasong") {
        this.$post
          .postData(
            "getForwordOrgDept",
            JSON.stringify({ function: "getForwordOrgDept", orgFlag: "org" }),
            this.swglggCode
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
              flag: true,
              main: ""
            }),
            this.swglggCode
          )
          .then(res => {
            if (res.message == "Loading") {
              this.loadingTree = true;
            } else {
              this.loadingTree = false;
            }
            that.treeData = (res && res.data) || [];
          });
      } else if (n === "gonggao") {
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(this.bank_mainXiao),
            this.swglggCode
          )
          .then(res => {
            if (res.message == "Loading") {
              this.loadingTree = true;
            } else {
              this.loadingTree = false;
            }
            that.treeData = (res && res.data) || [];
          });
      } else {
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(this.bank_mainXiao),
            this.swglggCode
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
    async completeSending() {
      this.useNewDialog = false;
      if (!this.fromdata.filePath) {
        this.$message({
          type: "error",
          message: "请引入正文后发送"
        });
        return;
      }
      this.checkOrg = false;
      let judge = true;
      let that = this;
      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
      if (this.fromdata.isReturnBefore == 1) {
        this.$confirm("是否返回给：上一处理人?", "提示", {
          showClose: false,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              this.fhsyclr();
            } else {
              this.preserve("2").then(() => {
                if (this.buttonList[8].show) {
                  this.$confirm("是否对此文进行督办？", "提示", {
                    showClose: false,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    callback: action1 => {
                      if (action1 == "confirm") {
                        this.dubanclick().then(() => {
                          this.completeSendClick();
                        });
                      } else {
                        this.completeSendClick();
                      }
                    }
                  });
                } else {
                  this.completeSendClick();
                }
              });
            }
          }
        });
      } else {
        this.preserve("2").then(() => {
          if (this.buttonList[8].show && this.fromdata.isSupervise != 1) {
            this.$confirm("是否对此文进行督办？", "提示", {
              showClose: false,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              callback: action2 => {
                if (action2 == "confirm") {
                  this.dubanclick().then(() => {
                    this.completeSendClick();
                  });
                } else {
                  this.completeSendClick();
                }
              }
            });
          } else {
            this.completeSendClick();
          }
        });
      }
    },
    completeSendClick() {
      this.cantClick = true;
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeNow = "dosend";
      this.addSendType = "";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
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
          this.seletOptionsData = res.data || [];
          this.bank_send.curTplNo = this.fromdata.tplNo;
          this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
          let parms = Object.assign(this.bank_send, this.fromdata);
          parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
          this.$post
            .postData("selWfNode", JSON.stringify(parms), this.swglggCode)
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
          duration: 1500
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
        let ids1 = [];

        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let hasFilesObj = [];

        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            ids1.push(item.id);
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
            //this.fromdata.sendSubName = names;
            //this.fromdata.sendSubId = ids;
            this.checkedCities1 = ids1;
            this.fasongCheckData = this.checkData;
            this.nowCheckList = this.checkData;
            this.checkedCities1.map(item => {
              that.checkIds.map(node => {
                if (node == item) {
                  hasFilesObj.push(item); //发送对象的id
                }
              });
            });
            break;
          case "gonggao":
            // this.fromdata.sendSubName = names;
            // this.fromdata.sendSubId = ids;
            // this.fasongCheckData = this.checkData;
            this.sendOrderNoticeInfo = ids
              ? ids.replace(/[;]/g, ",") + ";" + names.replace(/[;]/g, ",")
              : "";
            this.gongCheckData = this.nowGongGaoCheckList = this.checkData;
            this.checkedGonggaoIds = ids ? ids.split(";") : "";
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
        }
        if (this.addSendType == "1") {
          if (newIds) {
            if (this.dialogTypeZF == "xie") {
              this.sendXb(newIds, newNames, oldIds, oldNames);
            } else if (this.dialogTypeZF == "chen") {
              this.sendCb(newIds, newNames, oldIds, oldNames);
            } else {
              this.sendCy(newIds, newNames, oldIds, oldNames);
            }
          } else {
            this.dialogState = false;
            return false;
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
        if (dtype == "gonggao" && this.ggLx == "2") {
          var obj = Object.assign(this.bank_doSWFinalSend, this.fromdata);
          obj.function = "createSendOrderReceiveNotice";
          obj.sendOrderNoticeInfo = this.sendOrderNoticeInfo;
          this.$post
            .postData(
              "createSendOrderReceiveNotice",
              JSON.stringify(obj),
              this.$businessCode.fawgl
            )
            .then(res => {
              if (res && res.success) {
                this.cantClick = false;
                this.getDataFive();
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "发送成功",
                  duration: 1500
                });
              } else {
                this.cantClick = false;
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: res.message,
                  duration: 1500
                });
              }
            });
        }
      }
      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      // if (dtype == "fasong") {
      //   this.fasongBtn();
      // }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      this.cantClick = true;
      this.receiveselect.id = this.uploadConfig.id = getFormId(
        this.$route.query.id,
        "receiveDispachId"
      );

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
      this.bank_doSend.id = getFormId(this.$route.query.id, "receiveDispachId");
      let obj = Object.assign(this.bank_doSend, copyFrom);
      this.$post
        .postData("doFinishAndSend", JSON.stringify(obj), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1500,
              onClose: () => {
                this.handleSetLoacl();
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                window.close();
              }
            });
          } else {
            this.cantClick = false;
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "发送失败",
              duration: 1500
            });
          }
        })
        .catch(erro => {
          this.cantClick = false;
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送失败",
            duration: 1500
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
            if (this.addSendType == 1) {
              item.disabled = true;
            }
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
            if (this.addSendType == 1) {
              item.disabled = true;
            }
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
          this.checkIds = this.checkedCities1 ? this.checkedCities1 : [];
          this.checkData = this.fasongCheckData;
          // this.checkData = this.fasongCheckData.filter(item => {
          //   // item.disabled = false;
          //   item.hideType = false;
          //   return true;
          // });
          // if (this.fasongCheckData.length) {
          //   newA = [].concat(this.fasongCheckData);
          //   newA.map(item => {
          //     //选中的不可操作
          //     item.disabled = true;
          //     item.hideType = true;
          //   });
          // }
          // this.checkData = this.fasongCheckData;
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
          this.checkData = newA;
          break;
        case "zengfa":
          this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
          if (this.cyCheckData.length) {
            newA = [].concat(this.cyCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = false;
            });
          }
          this.checkData = newA;
          break;
        case "gonggao":
          this.checkIds = this.checkedGonggaoIds;
          this.checkData = this.gongCheckData;
          break;
        case "dosend":
          this.checkIds = [];
          this.checkData = [];
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
          this.swglggCode
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
      this.$confirm("是否确定办结?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.cantClick = true;
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
            .postData("doFinish", JSON.stringify(params), this.swglggCode)
            .then(res => {
              if (res) {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "办结成功",
                    duration: 1500
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
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: res.message,
                    duration: 1500
                  });
                  this.cantClick = false;
                }
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消办结"
          });
          this.cantClick = false;
        });
    },
    //上传正文
    sczw() {
      if (this.fromdata.filePath && this.fromdata.filePath != "") {
        this.$confirm("此操作会覆盖之前已编辑保存的正文?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.uploadConfigswzw.id = this.fromdata.id;
            this.uploadConfigswzw.code = this.$businessCode.swglfj;
            this.uploadConfigswzw.multiTenancyId = this.fromdata.multiTenancyId;
            this.swzwdialog = true;
            this.uploadzwFlag = true;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消上传"
            });
          });
      } else {
        this.uploadConfigswzw.id = this.fromdata.id;
        this.uploadConfigswzw.code = this.$businessCode.swglfj;
        this.uploadConfigswzw.multiTenancyId = this.fromdata.multiTenancyId;
        this.swzwdialog = true;
        this.uploadzwFlag = true;
      }
    },
    //正文跳转
    doDraft(fileInfo, saveName) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: this.fromdata.id,
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.swglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          showBtns: false,
          flowTranId: this.$businessCode.swgl, //流程交易线    chai
          processInstId: this.fromdata.processInstId,
          saveSpecialFileName: saveName
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
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
      );
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
        n - 1
      ];
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
      );
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
        n + 1
      ];
      this.fromdata.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.swglCode
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 1500
              });
              this.fromdata.attchmentFileInfo.splice(n, 1);
              this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 1500
              });
            }
          }
        });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.swglfj
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
                duration: 1500
              });
            }
          }
        });
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
        )
        .then(res => {
          //更新状态用。暂时不用任何操作
          if (res && res.success) {
            setTimeout(() => {
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
            }, 1000);
          }
        });
    },
    //21-1-5
    cancelSendObjGong() {
      this.showSend = false;
      this.checkedCities1 = [];
      this.nowCheckList = [];
      this.checkedGonggaoIds = [];
      this.nowGongGaoCheckList = [];
      this.gongCheckData = [];
      this.fromdata.sendOrderNoticeInfo = "";
      this.sendOrderNoticeInfo = "";
      this.fasongCheckData = [];
    },
    cancelSendObj() {
      this.listSendObjstate = false;
    },
    //表头宽度调整
    flexColumnWidth(name, row) {
      let flexWidth = 100;
      let labelLen = 0;
      let colNames = [];
      if (!this.sendTableDatas[0].orgDprt.length || !this.listSendObjstate) {
        return;
      }
      this.sendTableDatas[0].orgDprt[row].name.map(node => {
        if (node && node.deptNames && node.deptNames.length) {
          colNames.push(node.deptNames.length);
        }
      });
      colNames.push(name.length);
      labelLen = colNames.sort((a, b) => {
        return b - a;
      })[0];
      flexWidth = labelLen * 20;
      this.sendTableDatasCol[row].width = flexWidth - 20 + "px";
      return flexWidth + "px";
    },
    //发送公告至
    sendBrandTo() {
      this.getTreeData("gonggao");
    },
    handleCheckAllChange1(val, n) {
      this.checkedAll = [];
      let nowLists = [];
      nowLists = this.sendTableDatas[0].orgDprt[n].name; //当前操作列表
      let dd = [];
      val
        ? this.sendTableDatas[0].orgDprt[n].name.forEach(item => {
            this.checkedCities1.push(item.deptIds);
            this.checkedCitiNames.push(item.deptNames);
            dd.push({ id: item.deptIds, text: item.deptNames });
          })
        : (this.checkedCities1 = []);
      this.sendTableDatasCol[n].isIndeterminate = val;
      this.checkedAll = [{ content: dd, typeName: "发送对象" }];
      //清除当前tab 已勾选项
      this.nowCheckList = this.nowCheckList.filter(item => {
        let hasF = true;
        nowLists.forEach(node => {
          if (node.deptIds === item.deptIds) {
            hasF = false;
          }
        });
        return hasF;
      });
      if (val) {
        for (var i = 0, len = nowLists.length; i < len; i++) {
          let addNode = true;
          this.nowCheckList.forEach((node, m) => {
            if (nowLists[i].deptIds === node.id) {
              addNode = false;
              if (!val) {
                this.nowCheckList.splice(m);
              }
            }
          });

          if (addNode && val) {
            this.nowCheckList.push(nowLists[i]);
          }
        }
      }
    },
    handleCheckedCitiesChange1(value, n) {
      console.log(this.checkedCities1);
      let cancelId = "";
      let oldIds = [];
      let checkedCount = 0;
      let newCheckLists = [];
      if (value === "outcheck") {
        //去除 发送对象 全选
        this.nowCheckList = this.nowCheckList.filter(item => {
          let hasF = false;
          oldIds.push(item.id);
          this.checkedCities1.forEach(node => {
            if (node === item.id) {
              hasF = true;
            }
          });
          return hasF;
        });
        cancelId = oldIds.filter(id => {
          return this.checkedCities1.indexOf(id) == -1;
        })[0];
        this.sendTableDatas[0].orgDprt.forEach((node, row) => {
          let cancelNum = 0;
          node.name.forEach(list => {
            if (list.id === cancelId) {
              this.sendTableDatasCol[row].isIndeterminate = false;
            }
          });
        });
        return;
      }
      if (value === "gongcheck") {
        //去除 公告至对象 全选
        this.nowGongGaoCheckList = this.nowGongGaoCheckList.filter(item => {
          let hasF = false;
          oldIds.push(item.id);
          this.checkedGonggaoIds.forEach(node => {
            if (node === item.id) {
              hasF = true;
            }
          });
          return hasF;
        });
        this.gongCheckData = this.nowGongGaoCheckList;
        this.checkIds = this.checkedGonggaoIds;
        return;
      }

      value.forEach(item => {
        this.sendTableDatas[0].orgDprt[n].name.forEach(node => {
          if (item === node.id) {
            newCheckLists.push({
              id: node.id,
              deptNames: node.deptNames
            });
            checkedCount++;
          }
        });
      });

      //清除当前tab 已勾选项
      this.nowCheckList = this.nowCheckList.filter(item => {
        let hasF = true;
        this.sendTableDatas[0].orgDprt[n].name.forEach(node => {
          if (node.id === item.id) {
            hasF = false;
          }
        });
        return hasF;
      });
      //过滤右侧已勾选项
      newCheckLists = newCheckLists.filter(item => {
        let hasF = true;
        this.nowCheckList.forEach(node => {
          if (node.id === item.id) {
            hasF = false;
          }
        });
        return hasF;
      });
      this.sendTableDatasCol[n].isIndeterminate =
        checkedCount === this.sendTableDatas[0].orgDprt[n].name.length; //全选设置
      //对当前tab 勾选项进行合并
      value.length > 0
        ? (this.nowCheckList = [].concat(this.nowCheckList, newCheckLists))
        : this.nowCheckList.filter(item => item.id != value.id);
      this.$forceUpdate();
    },
    // handleSelect(val){
    //   this.handleSendType = val;
    //   this.$api.adminConfig.createColumn({}).then(res => {
    //     let transArr = []
    //     res.data.forEach(element => {
    //       transArr.push(element.zlSslm)
    //     });
    //     console.log(transArr)
    //     this.coluData = transArr
    //     this.showSend = true;
    //   })

    // },
    handleSend(val) {
      if (!this.fromdata.filePath) {
        this.$message({
          type: "error",
          message: "请引入正文后发送"
        });
        return;
      }
      if (
        this.fromdata.secretType == "" ||
        this.fromdata.secretType == "请选择" ||
        this.fromdata.secretLimitType == "" ||
        this.fromdata.secretLimitType == "公布前"
      ) {
        this.mmlx = true;
      } else {
        this.mmlx = false;
      }
      this.handleColuChange();
      this.showSend = true;
    },
    handleGg() {
      this.getTreeData("gonggao", 2);
    },
    handleSendObj() {
      this.getTreeData("fasong");
      // this.loadingCheck = true;
      // this.listSendObjstate = true;
      // this.$post
      //   .postData(
      //     "getTcDeptTypeDicList",
      //     JSON.stringify(this.banl_sendObj),
      //     this.$businessCode.fawgl
      //   )
      //   .then(res => {
      //     this.loadingCheck = false;
      //     this.sendTableDatas = [{ orgDprt: [] }];
      //     this.sendTableDatasCol = [];
      //     let dataList = res.data;
      //     for (let i = 0; i < dataList.length; i++) {
      //       let temp = dataList[i];
      //       this.sendTableDatasCol.push({
      //         label: temp.typeName,
      //         isIndeterminate: false
      //       });
      //       this.sendTableDatas[0].orgDprt[i] = { name: [] };
      //       if (temp.deptIds) {
      //         let idArr = temp.deptIds.split(";");
      //         let nameArr = temp.deptNames.split(";");
      //         for (let j = 0; j < idArr.length; j++) {
      //           var transArr = { deptIds: idArr[j], deptNames: nameArr[j] };
      //           this.sendTableDatas[0].orgDprt[i].name.push(transArr);
      //         }
      //       }
      //     }
      //   });
    },
    //强制收回多选勾选事件
    qzshCheckChange(value) {
      let checkedCount = value.length;
      this.qzshCheckAll = checkedCount === this.qzshData.length;
      this.qzshIsIndeterminate =
        checkedCount > 0 && checkedCount < this.qzshData.length;
    },
    //强制收回全选
    qzshCheckAllChange(val) {
      this.qzshCheck = [];
      if (val) {
        this.qzshData.map(item => {
          this.qzshCheck.push(item.processInstId);
        });
      }
      this.qzshIsIndeterminate = false;
    }
  },
  watch: {
    checkedCities1: {
      handler(neww) {
        let names = [];
        this.$nextTick(() => {
          neww.forEach(node => {
            this.nowCheckList.forEach(item => {
              if (item.id == node) {
                names.push(item.name);
              }
            });
          });
          this.fromdata.realMain = neww.length
            ? neww.join(",") + ";" + names.join(",")
            : "";
        });
      }
    },
    "fromdata.attachmentTitle": {
      handler(newv) {
        this.uploadConfig.attachTitle = newv && newv.replace(/[\n,\s]/g, "");
      },
      deep: true
    }
  },
  created() {
    let that = this;

    this.receiveVersion = this.receiveselect.receiveVersion = this.$route.query.receiveVersion;
    console.log(this.fromdata.receiveVersion, "00000", this.receiveVersion);

    this.treeTradeCode = this.$businessCode.swglgg; //人员树交易线
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.swglgg; //完成并发送 树 流程交易线   chai
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.$businessCode.swgl; //chai
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.receiveselect.id = this.uploadConfig.id = this.uploadConfigswzw.id = getFormId(
      this.$route.query.id,
      "receiveDispachId"
    );
    this.receiveselectlist();
    // this.$post
    //   .postData(
    //     "getReceiveDropDownDataSource",
    //     JSON.stringify(this.getReceiveDropDownDataSource),
    //     this.swglCode
    //   )
    //   .then(res => {
    //     if (res && res.success) {
    //       that.selectContents = Object.assign(
    //         {},
    //         that.selectContents,
    //         res.data
    //       );
    //       //this.rules = Object.assign(this.rules,this.copyRules);
    //       this.$nextTick(() => {
    //         this.$refs.fromdata.clearValidate();
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
  min-height: 40px !important;
}
/deep/ .hqbm2 .el-textarea__inner {
  color: black !important;
  min-height: 40px !important;
}
/deep/ .hqbm1 .el-textarea__inner {
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

.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-scrollbar {
  height: 100%;
  width: 100%;
}

.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  height: 200px;
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

  /deep/ .el-textarea__inner {
    min-height: 60px !important;
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
