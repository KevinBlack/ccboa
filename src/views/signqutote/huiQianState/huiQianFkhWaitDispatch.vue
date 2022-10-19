<template>
  <!-- 中国建设银行电子签报会签意见单
    非跨行  跨行请示行
  -->
  <div id="signquteWaitFKhHq" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>中国建设银行电子签报会签意见单 -->
        </p>
        <div class="grid_comtent" v-if="fromdata.isMutil == 1">
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="closeHandler = true"
            v-show="readonlyQbcy"
          >关闭</el-button>
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="handelclose1"
            v-show="!readonlyQbcy"
          >关闭</el-button>
          <el-button size="small" plain @click="preserve('save')">保存</el-button>
          <el-button size="small" plain @click="shdialog2 = true">反馈意见</el-button>
          <el-button
            size="small"
            plain
            @click="completeSending"
            v-if="fromdata.isShowSendXb=='0'&&!fromdata.isLastXb"
          >选择会签人</el-button>
          <el-button
            size="small"
            plain
            @click="shxbr('sh')"
            v-if="fromdata.isShowSendXb=='1'&&!fromdata.isLastXb"
          >收回会签人</el-button>
          <el-button
            size="small"
            plain
            @click="shxbr('cb')"
            v-if="fromdata.isShowSendXb=='1'&&!fromdata.isLastXb"
          >催办</el-button>
          <el-button size="small" plain @click="drafting('0')">查看正文</el-button>
          <el-button
            size="small"
            plain
            @click="collect('qianbao_huiqian',fromdata.id,fromdata.multiTenancyId)"
          >收藏</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
        </div>
        <div class="grid_comtent" v-else>
          <!-- <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button size="small" plain @click="preserve('save')">保存</el-button>
          <el-button size="small" plain @click="completeSendingIsTrue">选择会签人</el-button>
          <el-button size="small" plain @click="sendFinalIdea">提交最终意见</el-button>
          <el-button size="small" plain @click="sendTackBtn">收回</el-button>
          <el-button size="small" plain @click="handleClearYj">清空所有过程意见</el-button>
          <el-button size="small" plain @click="drafting('0')">查看正文</el-button>
          <el-button size="small" plain @click="delectArticle">删除此文</el-button>
          <el-button size="small" plain @click="collect('qianbao_huiqian',fromdata.id,fromdata.multiTenancyId)">收藏</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>-->

          <!-- 表单控制 -->
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="closeHandler = true"
            v-show="readonlyQbcy"
          >关闭</el-button>
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="handelclose1"
            v-show="!readonlyQbcy"
          >关闭</el-button>
          <el-button
            size="small"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.type)"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
        </div>
      </el-col>
    </el-row>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <!-- 清空所有过程意见 -->
    <el-dialog v-dialogDrag title="清空所有过程意见" :visible.sync="clearYjFlag" width="60%">
      <span>请确认是否删除所有过程意见，是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearYjFlag = false">取 消</el-button>
        <el-button type="primary" @click="sureClearYj">确 定</el-button>
      </span>
    </el-dialog>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <!-- 多人协办收回 -->
    <el-dialog v-dialogDrag :title="titleTypeForDr" :visible.sync="shdialog1" width="50%">
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox
            v-for="item in shDataDR"
            :label="item.curUser"
            :key="item.id"
          >{{ item.curUser }}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQDRueding">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 多人协办反馈意见弹窗 -->
    <el-dialog
      v-dialogDrag
      :before-close="handleCloseManyAssist"
      title="反馈意见"
      :visible.sync="shdialog2"
      width="50%"
    >
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
        <el-button @click="handleCloseManyAssist">取 消</el-button>
        <el-button type="primary" @click="doFinishManyAssist">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-dialogDrag title="收回" width="30%" :visible.sync="sendTackVisible">
      <span>是否确定收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendTackVisible = false">取消</el-button>
        <el-button type="primary" @click="sendTackHandle">确定</el-button>
      </span>
    </el-dialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{directTitle}}电子签报会签意见单</h3>
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
        >签批意见</a>
        <!-- <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>-->
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current" style="width:15%;">
              当前环节：
              <span>{{fromdata.curNodeName}}</span>
            </p>
            <p class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{fromdata.currentUser}}</span>
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
                  <el-form-item label="标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" placeholder="请输入正文标题" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="呈送" prop="submittedName" ref="submittedName">
                    <el-input v-model="fromdata.submittedName" placeholder="请输入附件标题" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleTypeName" ref="handleTypeName">
                    <el-input v-model="fromdata.handleTypeName" placeholder disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    label="紧急程度"
                    :span="8"
                    prop="emergencyLevelName"
                    ref="emergencyLevelName"
                  >
                    <el-select
                      v-model="fromdata.emergencyLevelName"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option
                        v-for="emergencyLevelitem in SemergencyLevel"
                        :key="emergencyLevelitem.label"
                        :label="emergencyLevelitem.label"
                        :value="emergencyLevelitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="签报类型" prop="qianBaoTypeName" ref="qianBaoTypeName">
                    <el-select
                      v-model="fromdata.qianBaoTypeName"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option
                        v-for="sendTypeitem in SqianbaoType"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="签报字号" prop="qianbaoCode" ref="qianbaoCode">
                    <el-select
                      v-model="fromdata.qianbaoCode+''+fromdata.documentNo"
                      placeholder="请选择"
                      disabled
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="sendTypeitem in SqbZihaoList"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                    <!-- <el-input  v-model="fromdata.qianbaoCode+''+fromdata.documentNo" disabled></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="fromdata.draftTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="拟稿部门" prop="draftDepartmentName" ref="draftDepartmentName">
                    <el-input v-model="fromdata.draftDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系人" prop="draftUserName" ref="draftUserName">
                    <el-input v-model="fromdata.draftUserName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input v-model="fromdata.phone" disabled @input.native="phoneChange"></el-input>
                  </el-form-item>
                </el-col>

                <!-- mimi -->
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      @change="secretTypechange"
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretTypeitem in SsecretType"
                        :key="secretTypeitem.label"
                        :label="secretTypeitem.label"
                        :value="secretTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 工作秘密 -->
                <el-col :span="8" v-if="secretTypeFlag && !flag && workSecurityFlag">
                  <el-form-item label="秘密标志" :span="8" prop="workSecretFlag" ref="workSecretFlag">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.workSecretFlag"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="workSecurityitem in SworkSecurity"
                        :key="workSecurityitem.label"
                        :label="workSecurityitem.label"
                        :value="workSecurityitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 内部信息 -->
                <el-col :span="8" v-show="secretTypeFlag && !flag && !workSecurityFlag">
                  <el-form-item label="秘密标志" :span="8" prop="secretFlag" ref="secretFlag">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.secretFlag"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagitem in secretOptionsFlag"
                        :key="secretFlagitem.label"
                        :label="secretFlagitem.label"
                        :value="secretFlagitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    label="秘密期限类型"
                    :span="8"
                    v-if="flag"
                    prop="secretLimitType"
                    ref="secretLimitType"
                  >
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.secretLimitType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretLimitTypeitem in SSsecretLimitType"
                        :key="secretLimitTypeitem.label"
                        :label="secretLimitTypeitem.label"
                        :value="secretLimitTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择保密期限 -->
                <el-col
                  :span="8"
                  v-if="flag && securityFlag"
                  style="display:flex;align-items:center;"
                >
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="security"
                    ref="security"
                    style="width: 60%;"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                  <!-- <i class="el-icon-star-on pad_10" v-show="nationSecurFlag"></i> -->
                  <el-form-item
                    label
                    prop="secretLimitName"
                    ref="secretLimitName"
                    label-width="0px"
                    style="width: 20%;"
                  >
                    <el-input
                      @input="workSecurityTabTime('secretLimitName')"
                      v-model="fromdata.secretLimitName"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label
                    prop="secretTimeType"
                    ref="secretTimeType"
                    label-width="0px"
                    style="width: 20%;"
                  >
                    <el-select
                      name="secretTimeType"
                      v-model="fromdata.secretTimeType"
                      @change="workSecurityTabTime"
                      placeholder="请选择"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretTimeTypeitem in SsecretTimeType"
                        :key="secretTimeTypeitem.label"
                        :label="secretTimeTypeitem.label"
                        :value="secretTimeTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择解密时间 -->
                <el-col
                  :span="8"
                  v-if="flag && businessSecretFlag"
                  style="display:flex;align-items:center;"
                >
                  <el-form-item label="密级和保密期限" :span="8" prop="security" ref="security">
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                  <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                  <el-form-item label prop="secretLimit" ref="secretLimit" label-width="0px">
                    <el-date-picker
                      type="date"
                      @blur="workSecurityTabTime"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="fromdata.secretLimit"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- 选择解密条件 -->
                <el-col
                  :span="8"
                  v-if="flag && securitytiaojFlag"
                  style="display:flex;align-items:center;"
                >
                  <el-form-item label="密级和保密期限" :span="8" prop="security" ref="security">
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                  <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                  <el-form-item label prop="secretTimeType" ref="secretTimeType" label-width="0px">
                    <el-select
                      name="secretTimeType"
                      @change="workSecurityTabTime"
                      v-model="fromdata.secretTimeType"
                      placeholder="请选择"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretLimititem in SsecretLimit"
                        :key="secretLimititem.label"
                        :label="secretLimititem.label"
                        :value="secretLimititem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col v-show="fromdata.secretType">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      v-model="fromdata.knowScore"
                      maxlength="500"
                      resize="none"
                      autosize
                      placeholder="填写知悉范围可输入500字"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="fromdata.secretType">
                  <el-form-item label="定密依据">
                    <div>
                      <el-input
                        type="textarea"
                        v-model="fromdata.secretGists"
                        placeholder="填写定密依据可输入500字"
                        maxlength="500"
                        resize="none"
                        autosize
                        disabled
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="签报依据" v-show="!fromdata.sendBasis">
                    <el-input type="text" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="签报依据" v-if="showImportData">
                    <div class="border_yiju">
                      <el-row v-for="(item) in fromdata.sendBasis" :key="item.documentCode">
                        <el-col :span="20" class="btn_openImport">
                          <el-button
                            type="text"
                            @click="handleCheckImport(item)"
                            :class="(item.id=='')?'colorBlack':'colorLink'"
                          >{{item.documentCode}}</el-button>
                        </el-col>
                        <!-- <el-col :span="4" class="btn_delImport">
                          <el-button type="text" @click="handleDeleteImport(item)">删除</el-button>
                        </el-col>-->
                      </el-row>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="会签部门">
                    <div style="display:flex">
                      <!-- <el-input v-model="fromdata.signDepartmentName" disabled></el-input> -->
                      <el-input
                        v-model="fromdata.signDepartmentName"
                        type="textarea"
                        resize="none"
                        autosize
                        disabled
                        style="width: 100%;"
                        class="hqbm1"
                      ></el-input>
                      <!-- <button
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        @click="bankmain('hui')"
                      >
                        <i class="el-icon-plus"></i> 
                      </button>-->
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="附件名称">
                    <el-input
                      autosize
                      resize="none"
                      type="textarea"
                      v-model="fromdata.attachTitle"
                      disabled
                    ></el-input>
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
                  <!-- <div v-for="item in fromdata.approvalOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    maxlength="500"
                    v-model="fromdata.approvalOpinion"
                    :disabled="editedIdeaFields.approvalOpinion"
                    v-if="!editedIdeaFields.approvalOpinion  || (editedIdeaFields.approvalOpinion && !(fromdata.approvalOpinionList && fromdata.approvalOpinionList.length))"
                  ></el-input>
                  <opinionText
                    :opinionText="fromdata.approvalOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核意见">
                  <!-- <div v-for="item in fromdata.checkOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    maxlength="500"
                    v-model="fromdata.checkOpinion"
                    :disabled="editedIdeaFields.checkOpinion"
                    v-if="!editedIdeaFields.checkOpinion  || (editedIdeaFields.checkOpinion && !(fromdata.checkOpinionList && fromdata.checkOpinionList.length))"
                  ></el-input>
                  <opinionText
                    :opinionText="fromdata.checkOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="会签意见">
                  <!-- <div v-for="item in fromdata.signOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    maxlength="500"
                    v-model="fromdata.signOpinion"
                    :disabled="editedIdeaFields.signOpinion"
                    v-if="!editedIdeaFields.signOpinion  || (editedIdeaFields.signOpinion && !(fromdata.signOpinionList && fromdata.signOpinionList.length))"
                  ></el-input>
                  <opinionText
                    :opinionText="fromdata.signOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="拟稿部门意见">
                  <!-- <div v-for="(item) in fromdata.draftDepartmentOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    maxlength="500"
                    v-model="fromdata.draftDepartmentOpinion"
                    :disabled="editedIdeaFields.draftDepartmentOpinion"
                    v-if="!editedIdeaFields.draftDepartmentOpinion  || (editedIdeaFields.draftDepartmentOpinion && !(fromdata.draftDepartmentOpinionList && fromdata.draftDepartmentOpinionList.length))"
                  ></el-input>
                  <opinionText
                    :opinionText="fromdata.draftDepartmentOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="传阅意见">
                  <!-- <div v-for="(item) in fromdata.circulationList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    maxlength="500"
                    v-model="fromdata.circulation"
                    :disabled="editedIdeaFields.circulation"
                    v-if="!editedIdeaFields.circulation  || (editedIdeaFields.circulation && !(fromdata.circulationList && fromdata.circulationList.length))"
                  ></el-input>
                  <opinionText
                    :opinionText="fromdata.circulationList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="备    注">
                  <!-- <div v-for="(item) in fromdata.remarkList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    maxlength="500"
                    :disabled="editedIdeaFields.remark"
                    v-model="fromdata.remark"
                    v-if="!editedIdeaFields.remark  || (editedIdeaFields.remark && !(fromdata.remarkList && fromdata.remarkList.length))"
                  ></el-input>
                  <opinionText
                    :opinionText="fromdata.remarkList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                    :isRemarks="true"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="主办部门附件">
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    style="flex:1"
                    disabled
                    v-if="!(fromdata.mainDeptAttachment&&fromdata.mainDeptAttachment.length)"
                  ></el-input>
                  <div>
                    <el-row>
                      <el-col>
                        <div
                          class="file_list_box tree_zhuban"
                          v-if="fromdata.mainDeptAttachment&&fromdata.mainDeptAttachment.length"
                        >
                          <el-scrollbar style="padding: 0px 15px 0 0;">
                            <div
                              v-for="(items, index) in fromdata.mainDeptAttachment"
                              :key="items.id"
                              class="comp_list"
                            >
                              <template>
                                <div class="command_file">
                                  <!-- 预览 -->
                                  <span class="order">{{index+1}}.</span>
                                  <span
                                    class="down"
                                    :title="items.fileName"
                                    @click="viewDraftFile(items.fileName,items.filePath ,$businessCode.qbglfj)"
                                  >{{items.fileName}}</span>
                                  <span
                                    class="name"
                                    :title="items.createrName"
                                  >{{items.createrName}}</span>
                                  <span class="time">{{items.createTime}}</span>
                                  <div class="btns">
                                    <el-button
                                      type="primary"
                                      size="mini"
                                      @click.native="downFile(items)"
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
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="会签部门最终意见">
                  <!-- 上面固化，下面临时 -->
                  <!-- <div v-for="item in fromdata.finalOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->

                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.finalOpinion"
                      :disabled="editedIdeaFields.finalOpinion"
                      v-if="!editedIdeaFields.finalOpinion  || (editedIdeaFields.finalOpinion && !(fromdata.finalOpinionList && fromdata.finalOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=1,fromdata.finalOpinion&&fromdata.finalOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.finalOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>

                  <opinionText
                    :opinionText="fromdata.finalOpinionList"
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="会签过程意见">
                  <!-- <div v-for="item in fromdata.processOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||fromdata.currentUserId!=item.userId||item.nodeCode!=fromdata.curNodeCode}]"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&fromdata.currentUserId==item.userId&&item.nodeCode==fromdata.curNodeCode"
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
                  </div>-->
                  <div class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.processOpinion"
                      :disabled="editedIdeaFields.processOpinion||fromdata.isMutil==1"
                      v-if="(!editedIdeaFields.processOpinion||(editedIdeaFields.processOpinion && !(fromdata.processOpinionList && fromdata.processOpinionList.length)))||fromdata.isMutil != 1"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=2,fromdata.processOpinion&&fromdata.processOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.processOpinion&&fromdata.isMutil != 1"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
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
            <!-- 附件 -->
            <!-- <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                
                <el-col>
                  <div
                    class="tree_w"
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
                              <span class="name down" :title="item.fileName" @click="viewFile(item)">{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
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
            </div>-->
          </el-form>
        </div>
      </div>
    </div>

    <treeCofig
      :defaultUser="defaultUser"
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :dialogTypeNow="dialogTypeNow"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      :fromdata="fromdata"
      @showCompDialog="showCompDialog"
      :sequenceFlag="sequenceFlag"
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
    <!--签报依据-->
    <el-dialog v-dialogDrag title="增加签报依据" class="dialogImport" :visible.sync="showImport">
      <el-row>
        <el-form label-width="130px">
          <el-form-item label="依据文件类型">
            <el-col>
              <el-select v-model="bankImport" style="width: 75%">
                <el-option
                  v-for="item in bankImportList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="文件字号">
            <el-col :span="18">
              <el-input v-model="documentCode" style="width: 100%;"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showImport = false">取消</el-button>
        <el-button type="primary" @click="handleImportSure">确定</el-button>
      </span>
    </el-dialog>
    <!--查看依据文件-->
    <el-dialog v-dialogDrag title="查看依据文件" :visible.sync="showImportList">
      <table style="width: 100%;">
        <tr>
          <td class="ckyjbt">文号 :</td>
          <td>{{bank_import.documentCode}}</td>
        </tr>
        <tr>
          <td class="ckyjbt">标题 :</td>
          <td>
            <el-button type="text" @click="viewFile(bank_import, '1')">{{bank_import.title}}</el-button>
          </td>
        </tr>
        <tr>
          <td class="ckyjbt">附件 :</td>
          <td>
            <el-row v-for="(item) in bank_import.attachList" :key="item.id">
              <el-col :span="18">
                <el-button
                  type="text"
                  @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.qbglfj)"
                >{{item.sort+'. '+item.fileName}}</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="text" @click="downFile(item)">下载</el-button>
              </el-col>
            </el-row>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showImportList = false">关 闭</el-button>
      </span>
    </el-dialog>

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
// import uploadFiles from "@/components/uploadFile/uploadFile";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import minixs from "@/minixs/index";
import http from "@/http/http";
import exportTable from "@/minixs/exportTable"; // 收藏
import opinionText from "@/components/opinionText/index";
import closeMessage from "components/closeMessage/index";
import viewDraft from "@/minixs/viewDraft";
import signquoteIndex from "@/minixs/signquoteIndex";
import isNowUser from "@/minixs/isNowUser";

export default {
  name: "signquteWaitFKhHq",
  components: {
    // uploadFiles,
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    opinionText,
    closeMessage
  },
  mixins: [minixs, viewDraft, signquoteIndex, isNowUser],
  data() {
    return {
      readonlyQbcy: true,
      shdialog1: false,
      shDataDR: [],
      checkNames: [],
      checkIdNames: [],
      checkpcyNames: [],
      checkedsh: [], //收回列表
      titleTypeForDr: "",
      fkyjDRXB: false,
      shdialog2: false,
      iswcbfs: false,
      closeHandler: false,
      showCloseDialog: false,
      nowUserId: "", //当前用户id
      defaultUser: {}, //完成并发送默认值
      directTitle: "中国建设银行",
      offenDevices: [], //常用批示意见
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
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },

      sequenceFlag: false, //会签/协办是否按顺序发送部门置灰
      // 控制03
      huanJieMessage: {},
      //只读
      readFields: {
        title: false,
        submittedName: false,
        handleTypeName: false,
        emergencyLevelName: false,
        qianBaoTypeName: false,
        qianbaoCode: false,
        draftTime: false,
        draftDepartmentName: false,
        draftUserName: false,
        phone: false,
        secretType: false,
        workSecretFlag: false,
        secretFlag: false,
        secretLimitType: false,
        security: false,
        secretLimitName: false,
        secretTimeType: false,
        secretLimit: false,
        sendBasis: false,
        signDepartmentName: false,
        attachTitle: false
      },
      requiredFields: {
        title: false,
        submittedName: false,
        handleTypeName: false,
        emergencyLevelName: false,
        qianBaoTypeName: false,
        qianbaoCode: false,
        draftTime: false,
        draftDepartmentName: false,
        draftUserName: false,
        phone: false,
        secretType: false,
        workSecretFlag: false,
        secretFlag: false,
        secretLimitType: false,
        security: false,
        secretLimitName: false,
        secretTimeType: false,
        secretLimit: false,
        sendBasis: false,
        signDepartmentName: false,
        attachTitle: false
      }, //必填控制域
      editedIdeaFields: {
        approvalOpinion: true,
        checkOpinion: true,
        signOpinion: true,
        draftDepartmentOpinion: true,
        circulation: true,
        remark: true,
        finalOpinion: true,
        processOpinion: true
      }, //可编辑意见域
      requiredIdeaFields: {
        approvalOpinion: false,
        checkOpinion: false,
        signOpinion: false,
        draftDepartmentOpinion: false,
        circulation: false,
        remark: false,
        finalOpinion: false,
        processOpinion: false
      }, //必填意见域
      // 【关闭】【保存】【查看正文】【选择会签人】【清空所有过程意见】
      // 【提交最终意见】【查看流程】【打印处理单】【收藏】【操作指南】
      // <el-button size="small" plain @click="sendFinalIdea">提交最终意见</el-button>
      //     <el-button size="small" plain @click="sendTackBtn">收回</el-button>
      //     <el-button size="small" plain @click="handleClearYj">清空所有过程意见</el-button>
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "查看正文", type: "btn_ckzw", show: false },
        { name: "选择会签人", type: "btn_xzhqr", show: false },
        { name: "清空所有过程意见", type: "btn_qkAllGcYj", show: false },
        { name: "提交最终意见", type: "btn_tjzzyj", show: false }, //综合
        // { name: "收回", type: "btn_sh", show: false },
        // { name: "删除此文", type: "btn_sccw", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "打印处理单", type: "btn_dycld", show: false },
        { name: "收藏", type: "btn_sc", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],

      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },

      //收回
      sendTackVisible: false,
      sendTackFuc: {
        function: "doWithdrawTask",
        serviceInstans: "DZQB_HQ"
        // QB_DZQB  电子签报,QB_SWQB  实物签报 ,QB_KHQBQS 跨行签报请示,KHQB_SP  跨行签报审批 ,DZQB_HQ  会签 ,QB_XB 协办
      },

      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        subTempAddF: true //是否可以上传附件 true是不能上传   false是可以上传
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },

      //提交最终意见
      doFinishHQXBCB: {
        function: "doFinishHQXBCB",
        id: "",
        avyds: "：协办完成"
      },
      //发会签部门
      createSighWf: {
        function: "createSighWf",
        deptIds: "",
        deptNames: ""
      },
      //办结
      banjiedispatch: {
        function: "doFinish",
        multiTenancyID: "", // parm.getString("multiTenancyId");
        tplNo: "", // parm.getString("tplNo");
        pcsAvyId: "", // parm.getString("pcsAvyId");
        processInstId: "", // parm.getString("processInstId");
        moduleType: "qb_etc", // parm.getString("moduleType");
        curNodeCode: ""
      },
      deleteToQianbaoEntityById: {
        function: "deleteToQianbaoEntityById",
        id: ""
      },
      //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      //xiaoM  会签部门
      bank_mmainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      securityFlag: false,
      // 密级和保密期限  解密时间  显示隐藏
      businessSecretFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      securitytiaojFlag: false,
      // 定密依弹窗
      secretDialog: true,
      //确定完成并发送
      bank_toQianbaoSend: {
        function: "toQianbaoHuiqianDoSend",
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
      loadingTree: false,
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "getToQianbaoHuiqianEntityById",
        id: ""
      },
      //下拉框列表
      // bank_dispachfile: {
      //   function: "getTcQbsignParamDicInfo",
      //   organizationId: ""
      // },
      //提交
      saveOrUpdateToQianbaoHuiqianEntity: {
        function: "saveOrUpdateToQianbaoHuiqianEntity",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "", //部门人员名字
        sequenceSign: ""
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      fromdata: {
        // function: "getToQianbaoHuiqianEntityById",
        title: "",
        submittedName: "",
        handleTypeName: "0",
        emergencyLevelName: "",
        qianBaoTypeName: "",
        qianbaoCode: "",
        documentNo: "",
        draftTime: "",
        draftDepartmentName: "",
        draftUserName: "",
        sendBasis: "",
        secretGists: "",
        signDepartmentName: "",
        attachTitle: "",
        approvalOpinion: "",
        checkOpinion: "",
        signOpinion: "",
        draftDepartmentOpinion: "",
        remark: "",
        sizeFact: "",
        secretFlag: "",
        workSecretFlag: "",
        secretType: "",
        secretLimitType: "",
        security: "",
        secretLimitName: "",
        secretTimeType: "",
        secretLimit: "",
        currentUser: "",
        curNodeName: "",
        secretGists: "",
        knowScore: "",
        handleSituation: "",
        processInstId: "", //流程实例标识
        tplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        processOpinion: "", //会签过程意见
        finalOpinion: "", //会签最终意见
        mainDeptAttachment: [],
        attachSort: [],
        attchmentFileInfo: []
      },
      SemergencyLevel: [],
      SqbZihaoList: [],
      SqianbaoType: [],
      SsecretType: [],
      SsecretFlag: [],
      SsecretLimit: [],
      SbusinessSecret: [],
      SworkSecurity: [],
      secretOptionsFlag: [],
      SsecretTimeType: [
        {
          label: "年"
        },
        {
          label: "月"
        },
        {
          label: "日"
        }
      ],
      //mimi
      rules: {
        secretGists: [
          {
            required: false,
            trigger: "blur",
            message: "请输入定密依据"
          }
        ],
        secretLimitType: [
          {
            required: false,
            trigger: "blur",
            message: "请输入秘密期限类型"
          }
        ],
        secretFlag: [
          {
            required: false,
            trigger: "blur",
            message: "请输入秘密标志"
          }
        ],
        workSecretFlag: [
          {
            required: false,
            trigger: "blur",
            message: "请输入秘密标志"
          }
        ],
        security: [
          {
            required: false,
            trigger: "blur",
            message: "请输入密级和保密期限"
          }
        ],
        secretLimitName: [
          {
            required: false,
            trigger: ["change", "blur"],
            message: "请输入密级和保密期限"
          }
        ],
        secretTimeType: [
          {
            required: false,
            trigger: "blur",
            message: "请输入密级和保密期限"
          }
        ],
        secretLimit: [
          {
            required: false,
            trigger: "blur",
            message: "请输入密级和保密期限"
          }
        ]
      },
      copyRules: {
        // qianBaoTypeName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择签报类型"
        //   }
        // ],
        // submittedName: [
        //   {
        //     required: true,
        //     trigger: ["blur"],
        //     message: "请输入呈送"
        //   }
        // ],
        // qianbaoCode: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择签报字号"
        //   }
        // ],
        // handleTypeName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择处理类型"
        //   }
        // ],
        // draftDepartmentName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择拟稿部门"
        //   }
        // ],
        // draftUserName: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择联系人"
        //   }
        // ],
        // secretType: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择秘密类型"
        //   }
        // ],
        // workSecretFlag: [
        //   { required: false, trigger: "change", message: "请选择秘密标志" }
        // ],
        // secretFlag: [
        //   { required: false, trigger: "change", message: "请选择秘密标志" }
        // ],
        // secretLimitType: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择秘密期限类型"
        //   }
        // ],
        // security: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择密级和保密期限"
        //   }
        // ],
        // phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
        // title: [{ required: true, trigger: "blur", message: "请输入正文标题" }]
      },
      SSsecretLimitType: [],

      imageUrl: "",
      fileList: [],
      tableData: [],
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
      dialogTypeNow: "",
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      // showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id,
      // 签报依据
      showImport: false,
      showImportData: false,
      showImportList: false,
      bankImport: "",
      bankImportList: [
        {
          label: "发文",
          value: "CN000"
        },
        {
          label: "收文",
          value: "CN001"
        },
        {
          label: "签报",
          value: "CN002"
        }
      ],
      documentCode: "〔〕号",
      importDataArr: [],
      bank_import: {},

      //清空所有过程意见弹窗
      clearYjFlag: false,
      doDeleteProcessOpinion: {
        function: "doDeleteProcessOpinion",
        multiTenancyId: "",
        id: ""
      },
      treeTradeCode: "", //完成并发送  树  拆
      isMutil: 0
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    // this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    //电话操作
    phoneChange() {
      this.fromdata.phone = this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g, "");
      this.$forceUpdate();
    },
    buttonClick(params) {
      switch (params) {
        //保存
        case "btn_bc":
          this.preserve("save");
          break;
        // 选择会签人
        case "btn_xzhqr":
          // this.completeSending();
          this.completeSendingIsTrue();
          break;
        // 提交最终意见
        case "btn_tjzzyj":
          this.sendFinalIdea();
          break;
        //收回
        case "btn_sh":
          this.sendTackBtn();
          break;
        // { name: "清空所有过程意见", type: "btn_qkAllGcYj", show: false },
        case "btn_qkAllGcYj":
          this.handleClearYj();
          break;
        //查看正文
        case "btn_ckzw":
          this.drafting("0");
          break;
        // 删除此文
        case "btn_sccw":
          this.delectArticle();
          break;
        // 收藏
        case "btn_sc":
          this.collect(
            "qianbao_huiqian",
            this.fromdata.id,
            this.fromdata.multiTenancyId
          );
          break;
        // 查看流程
        case "btn_cklc":
          this.flowScheme();
          break;
        // 打印处理单
        case "btn_dycld":
          this.processSheet();
          break;
        // 操作指南
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
      if (this.$route.query.readonlyQbcy == "qbcy") {
        //文件查阅
        this.readFields = {
          title: true,
          submittedName: true,
          handleTypeName: true,
          emergencyLevelName: true,
          qianBaoTypeName: true,
          qianbaoCode: true,
          draftTime: true,
          draftDepartmentName: true,
          draftUserName: true,
          phone: true,
          secretType: true,
          workSecretFlag: true,
          secretFlag: true,
          secretLimitType: true,
          security: true,
          secretLimitName: true,
          secretTimeType: true,
          secretLimit: true,
          sendBasis: true,
          signDepartmentName: true,
          attachTitle: true
        };
        this.editedIdeaFields = {
          approvalOpinion: true,
          checkOpinion: true,
          signOpinion: true,
          draftDepartmentOpinion: true,
          circulation: true,
          remark: true,
          finalOpinion: true,
          processOpinion: true
        };
        this.buttonList = [
          { name: "查看正文", type: "btn_ckzw", show: true }, //一直都有        起草正文与查看正文不能同时出现
          { name: "查看流程", type: "btn_cklc", show: true }, //一直都有
          { name: "打印处理单", type: "btn_dycld", show: true }, //一直都有
          { name: "收藏", type: "btn_sc", show: true } //一直都有
        ];
      } else {
        this.readFields = this.setReadFields(
          this.readFields,
          this.huanJieMessage.readFields
        ); //不可编辑控制域
        this.editedIdeaFields = this.setEditedIdeaFields(
          this.editedIdeaFields,
          this.huanJieMessage.editedIdeaFields,
          this.huanJieMessage.editedIdeaFieldsBycondition
        ); //可编辑意见域
        this.buttonList = this.showButton(
          this.buttonList,
          this.huanJieMessage.visibleButtons,
          this.huanJieMessage.visibleButtonsBycondition
        ); //按钮
      }
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //可编辑意见域
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.formdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
      //     this.buttonList[this.buttonList.length - 1].show = true
      // }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          title: [
            {
              required: this.requiredFields.title,
              trigger: "change",
              message: "请输入标题"
            }
          ],
          submittedName: [
            {
              required: this.requiredFields.submittedName,
              trigger: "change",
              message: "请输入呈送"
            }
          ],
          handleTypeName: [
            {
              required: this.requiredFields.handleTypeName,
              trigger: "change",
              message: "请选择处理类型"
            }
          ],
          emergencyLevel: [
            {
              required: this.requiredFields.emergencyLevel,
              trigger: "change",
              message: "请选择紧急程度"
            }
          ],
          qianBaoTypeName: [
            {
              required: this.requiredFields.qianBaoTypeName,
              trigger: "change",
              message: "请输入签报类型"
            }
          ],
          qianbaoCode: [
            {
              required: this.requiredFields.qianbaoCode,
              trigger: "change",
              message: "请选择签报字号"
            }
          ],
          documentNo: [
            {
              required: this.requiredFields.documentNo,
              trigger: "change",
              message: "请输入签报字号"
            }
          ],
          draftTime: [
            {
              required: this.requiredFields.draftTime,
              trigger: "change",
              message: "请输入拟稿日期"
            }
          ],
          draftDepartmentName: [
            {
              required: this.requiredFields.draftDepartmentName,
              trigger: "change",
              message: "请输入拟稿单位"
            }
          ],
          draftUserName: [
            {
              required: this.requiredFields.draftUserName,
              trigger: "change",
              message: "请输入联系人"
            }
          ],
          phone: [
            {
              required: this.requiredFields.phone,
              trigger: "change",
              message: "请输入联系电话"
            }
          ],
          secretType: [
            {
              required: this.requiredFields.secretType,
              trigger: "change",
              message: "请选择秘密类型"
            }
          ],
          workSecretFlag: [
            {
              required: this.requiredFields.workSecretFlag,
              trigger: "change",
              message: "请选择秘密标志"
            }
          ],
          secretFlag: [
            {
              required: this.requiredFields.secretFlag,
              trigger: "change",
              message: "请选择秘密标志"
            }
          ],
          secretLimitType: [
            {
              required: this.requiredFields.secretLimitType,
              trigger: "change",
              message: "请选择秘密期限类型"
            }
          ],
          security: [
            {
              required: this.requiredFields.security,
              trigger: "blur",
              message: "请选择密级和保密期限"
            }
          ],
          secretLimitName: [
            {
              required: this.requiredFields.secretLimitName,
              trigger: ["change", "blur"],
              message: "请选择"
            }
          ],
          secretTimeType: [
            {
              required: this.requiredFields.secretTimeType,
              trigger: "blur",
              message: "请选择"
            }
          ],
          secretLimit: [
            {
              required: this.requiredFields.secretLimit,
              trigger: "change",
              message: "请选择"
            }
          ],
          knowScore: [
            {
              required: this.requiredFields.knowScore,
              trigger: "change",
              message: "请输入知悉范围"
            }
          ],
          secretGists: [
            {
              required: this.requiredFields.secretGists,
              trigger: "blur",
              message: "请输入定密依据"
            }
          ],
          sendBasis: [
            {
              required: this.requiredFields.sendBasis,
              trigger: "change",
              message: "请输入签报依据"
            }
          ],
          signDepartmentName: [
            {
              required: this.requiredFields.signDepartmentName,
              trigger: "change",
              message: "请选择会签部门"
            }
          ],

          attachment: [
            {
              required: this.requiredFields.attachment,
              trigger: "change",
              message: "请输入附件名称"
            }
          ],
          approvalOpinion: [
            {
              required: this.requiredIdeaFields.approvalOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          checkOpinion: [
            {
              required: this.requiredIdeaFields.checkOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          signOpinion: [
            {
              required: this.requiredIdeaFields.signOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          draftDepartmentOpinion: [
            {
              required: this.requiredIdeaFields.draftDepartmentOpinion,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          circulation: [
            {
              required: this.requiredIdeaFields.circulation,
              message: "不能为空",
              trigger: "blur"
            }
          ],
          remark: [
            {
              required: this.requiredIdeaFields.remark,
              message: "不能为空",
              trigger: "blur"
            }
          ]
        };

        //mimi
        if (this.fromdata.secretType) {
          this.rules.secretGists[0].required = true;
          this.$forceUpdate();
        } else {
          this.rules.secretGists[0].required = false;
          this.$refs.fromdata.clearValidate();
          this.$forceUpdate();
        }
        this.rules.workSecretFlag[0].required = false;
        this.rules.secretLimitType[0].required = false;
        this.rules.secretFlag[0].required = false;
        if (this.fromdata.secretType == "商业秘密") {
          this.rules.secretLimitType[0].required = true;
        } else if (this.fromdata.secretType == "内部信息") {
          this.rules.secretFlag[0].required = true;
        } else if (this.fromdata.secretType == "工作秘密") {
          this.rules.workSecretFlag[0].required = true;
        } else {
          this.rules.workSecretFlag[0].required = false;
          this.rules.secretLimitType[0].required = false;
          this.rules.secretFlag[0].required = false;
        }

        this.rules.security[0].required = false;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        this.rules.secretLimit[0].required = false;
        if (this.fromdata.secretLimitType == "保密期限") {
          //选择保密期限
          this.rules.security[0].required = true;
          this.rules.secretLimitName[0].required = true;
          this.rules.secretTimeType[0].required = true;
          // 选择解密时间
          this.rules.secretLimit[0].required = false;
        } else if (this.fromdata.secretLimitType == "解密时间") {
          //选择保密期限
          this.rules.security[0].required = true;
          this.rules.secretLimitName[0].required = false;
          this.rules.secretTimeType[0].required = false;
          // 选择解密时间
          this.rules.secretLimit[0].required = true;
        } else if (this.fromdata.secretLimitType == "解密条件") {
          //选择保密期限
          this.rules.security[0].required = true;
          this.rules.secretLimitName[0].required = false;
          this.rules.secretTimeType[0].required = true;
          // 选择解密时间
          this.rules.secretLimit[0].required = false;
        } else {
          this.rules.security[0].required = false;
          this.rules.secretLimitName[0].required = false;
          this.rules.secretTimeType[0].required = false;
          this.rules.secretLimit[0].required = false;
        }
      });
      this.$forceUpdate();
    },

    //清空所有过程意见
    handleClearYj() {
      this.clearYjFlag = true;
    },
    sureClearYj() {
      this.doDeleteProcessOpinion.multiTenancyId = this.fromdata.multiTenancyId;
      this.doDeleteProcessOpinion.id = this.fromdata.id;
      this.$post
        .postData(
          "doDeleteProcessOpinion",
          JSON.stringify(this.doDeleteProcessOpinion),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          this.$message({
            type: "success",
            showClose: true,
            offset: 400,
            message: res.message,
            duration: 1000
          });
          window.location.reload();
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 2000
          });
          this.getToQianbaoHuiqianEntityById();
        });
      this.clearYjFlag = false;
    },

    //收回
    sendTackBtn() {
      this.sendTackVisible = true;
    },
    //收回弹窗确定操作
    sendTackHandle() {
      // approvalOpinionList  checkOpinionList  signOpinionList draftDepartmentOpinionList
      //   circulationList  remarkList   mainDeptAttachment
      // finalOpinionList  processOpinionList
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.signOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.mainDeptAttachment;
      delete parseList.finalOpinionList;
      delete parseList.processOpinionList;
      var obj = Object.assign(this.sendTackFuc, parseList);
      obj.function = "doWithdrawTask";
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
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
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                this.handleSetLoacl();
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 1000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败",
            duration: 1000
          });
        });
      this.sendTackVisible = false;
    },

    //提交最终意见
    async sendFinalIdea() {
      this.fromdata.finalOpinion =
        this.fromdata.finalOpinion && this.fromdata.finalOpinion.trim();
      if (
        !(
          this.fromdata.finalOpinion ||
          (this.fromdata.finalOpinionList &&
            this.fromdata.finalOpinionList.length)
        )
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入会签部门最终意见",
          duration: 1000
        });
        return;
      }

      await this.preserve();

      if (this.fromdata.orderType == "跨行单会签") {
        this.doFinishHQXBCB.serviceInstans = "DZQB_HQ";
      }
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.signOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.mainDeptAttachment;
      delete parseList.finalOpinionList;
      delete parseList.processOpinionList;
      var obj = Object.assign(this.doFinishHQXBCB, parseList);
      obj.function = "doFinishHQXBCB";
      await this.$post
        .postData(
          "doFinishHQXBCB",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "提交最终意见成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                this.handleSetLoacl();
                window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "提交最终意见失败",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "提交最终意见失败",
            duration: 1000
          });
        });
    },
    handleCloseManyAssist() {
      this.fromdata.processOpinion = "";
      this.shdialog2 = false;
    },
    doFinishManyAssist() {
      if (this.fromdata.processOpinion && this.fromdata.processOpinion != "") {
        let copyFrom = JSON.parse(JSON.stringify(this.fromdata));
        let params = Object.assign(
          { function: "doFinishManyAssist" },
          copyFrom
        );
        this.$post
          .postData(
            "doFinishManyAssist",
            JSON.stringify(params),
            this.$businessCode.qbgl
          )
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
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
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
              message: "反馈失败",
              duration: 1000
            });
          });
      } else {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请填写过程意见",
          duration: 1000
        });
      }
    },
    //发送会签部门
    huiqianSend() {
      this.preserve();
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.signOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.mainDeptAttachment;
      delete parseList.finalOpinionList;
      delete parseList.processOpinionList;
      var obj = Object.assign(this.createSighWf, parseList);
      obj.function = "createSighWf";
      console.log(obj);
      if (!this.createSighWf.deptIds && !this.createSighWf.deptNames) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择会签部门",
          duration: 1000
        });
        return;
      }
      this.$post
        .postData("createSighWf", JSON.stringify(obj), this.$businessCode.qbgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送会签部门成功",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "发送会签部门失败",
            duration: 1000
          });
        });
    },
    //办结
    concludematter() {
      this.preserve();
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.signOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.mainDeptAttachment;
      delete parseList.finalOpinionList;
      delete parseList.processOpinionList;
      var obj = Object.assign(this.banjiedispatch, parseList);
      obj.function = "doFinish";
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.ggqbgl)
        .then(res => {
          if (res && res.success) {
            // this.$message({
            //   type: "success",
            //   showClose: true,
            //   offset: 400,
            //   message: "办结成功",
            //   duration: 500,
            //   onClose: () => {
            //     window.location.href = "about:blank";
            //     window.opener.location.reload();
            //     this.handleSetLoacl();window.close();
            //   }
            // });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "办结失败",
            duration: 1000
          });
        });
    },

    //会签部门弹框
    bankmain() {
      this.dialogTit = "选择会签部门";
      this.sequenceFlag = false; //会签/协办是否按顺序发送部门置灰
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeNow = "huiqian";
      this.hasRadio = true;
      this.canTab = false;
      this.singelCheckF = false;
      this.showCompDialog();
      this.$post
        .postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_mmainXiao),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          // if (res.message == "Loading") {
          //   this.loadingTree = true;
          // } else {
          //   this.loadingTree = false;
          // }
          this.treeData = (res && res.data) || [];
        });
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
          ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "huiqian":
            this.fromdata.signDepartmentName = names;
            this.fromdata.signDepartmentId = ids;
            this.huiCheckData = this.checkData;
            // this.fromdata.sequenceSign = "0";
            this.huiqianSend.deptIds = ids;
            this.huiqianSend.deptNames = names;
            this.createSighWf.deptIds = ids;
            this.createSighWf.deptNames = names;
            this.createSighWf.sequenceSign = radio;
            this.saveOrUpdateToQianbaoHuiqianEntity.sequenceSign = radio;
            break;
          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
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

    //定密依据接收子组件传值
    savesecretBaslsvalue(data) {
      this.fromdata.secretGists = data;
      this.$forceUpdate();
    },
    //定密依据弹窗弹出
    // secretGistsbox() {
    //   this.secretDialog = true;
    //   this.$nextTick(() => {
    //     this.$refs.arr.openDialog();
    //   });
    // },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "zhusong":
          this.checkIds = this.fromdata.mainIds
            ? this.fromdata.mainIds.split(";")
            : [];
          this.checkData = this.zhuCheckData;
          break;
        case "chao":
          this.checkIds = this.fromdata.copyIds
            ? this.fromdata.copyIds.split(";")
            : [];
          this.checkData = this.chaoCheckData;
          break;
        case "huiqian":
          this.checkIds = this.fromdata.signDepartmentId
            ? this.fromdata.signDepartmentId.split(";")
            : [];
          this.checkData = this.huiCheckData;
          break;
        case "ben":
          this.checkIds = this.fromdata.inlineIds
            ? this.fromdata.inlineIds.split(";")
            : [];
          this.checkData = this.benCheckData;
          break;
        case "toQianbaoSend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },

    //选择人员后 确定完成并发送
    saveSending() {
      this.iswcbfs = false;
      // this.bank_toQianbaoSend.id = this.bank_dispach.id
      //   ? this.bank_dispach.id
      //   : sessionStorage.getItem("sHqsignpageid") || "";
      this.bank_toQianbaoSend.id = this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "sHqsignpageid"
      );
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.signOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.mainDeptAttachment;
      delete parseList.finalOpinionList;
      delete parseList.processOpinionList;
      let params = Object.assign(this.bank_toQianbaoSend, parseList);
      this.$post
        .postData(
          "toQianbaoHuiqianDoSend",
          JSON.stringify(params),
          this.$businessCode.qbgl
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
                if (this.fromdata.isMutil != "1") {
                  window.location.href = "about:blank";
                  // window.opener.location.reload();
                  // this.handleSetLoacl();
                  if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                    window.opener.location.reload();
                  }
                  this.handleSetLoacl();
                  window.close();
                } else {
                  location.reload();
                }
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败，请联系管理员",
              duration: 1500
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
    //返回上一处理人
    doBacksyclrHandle() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.signOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.mainDeptAttachment;
      delete parseList.finalOpinionList;
      delete parseList.processOpinionList;
      var obj = Object.assign(
        { function: "returnBeforeHuman", tplbsnid: "DZQB_HQ" },
        parseList
      );
      this.$post
        .postData(
          "returnBeforeHuman",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                // window.opener.location.reload();
                // this.handleSetLoacl();
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                this.handleSetLoacl();
                window.close();
              }
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
    //点击 完成并发送 弹窗弹出
    completeSendingIsTrue() {
      this.$post
        .postData(
          "isReturnState",
          JSON.stringify({
            function: "isReturnState",
            processInstId: this.fromdata.processInstId
          }),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          if (res && res.success) {
            // isReturnState     "0"无 或 "1"有
            if (this.fromdata.isMutil != 1 && res.data.isReturnState == "1") {
              this.$confirm("是否返回给：上一处理人?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.doBacksyclrHandle();
                })
                .catch(() => {
                  this.completeSending();
                });
            } else {
              this.completeSending();
            }
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 2000
          });
        });
    },

    //收回协办人
    shxbr(type) {
      this.checkedsh = [];
      this.shdialog1 = true;
      let parms;
      //let fun=''
      if (type == "cb") {
        this.titleTypeForDr = "催办操作";
        //fun="selectTakeBackManyAssistUser";
        parms = {
          function: "selectTakeBackManyAssistUser",
          id: this.fromdata.id,
          isMutil: this.fromdata.isMutil,
          type: "cuiban",
          multiTenancyId: this.fromdata.multiTenancyId
        };
      } else {
        //fun="selectTakeBackManyAssistUser";
        this.titleTypeForDr = "收回操作";
        parms = {
          function: "selectTakeBackManyAssistUser",
          id: this.fromdata.id,
          isMutil: this.fromdata.isMutil,
          multiTenancyId: this.fromdata.multiTenancyId
        };
      }
      this.$post
        .postData(
          "selectTakeBackManyAssistUser",
          JSON.stringify(parms),
          this.$businessCode.qbgl
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
          if (this.shDataDR[j].curUser == a[i]) {
            if (this.checkNames.indexOf(this.shDataDR[j].curUser) == -1)
              this.checkNames.push(this.shDataDR[j].curUser);
            if (this.checkIdNames.indexOf(this.shDataDR[j].id) == -1)
              this.checkIdNames.push(this.shDataDR[j].id);
            if (this.checkpcyNames.indexOf(this.shDataDR[j].pcsAvyId) == -1)
              this.checkpcyNames.push(this.shDataDR[j].pcsAvyId);
          }
        }
      }
    },
    shQDRueding() {
      if (this.checkNames.length < 1) {
        this.$message({
          message: "请选择人员",
          type: "error"
        });
        return;
      }
      if (this.titleTypeForDr == "催办操作") {
        let parms = {
          function: "cuibanManyAssist",
          ids:
            this.checkIdNames.length > 1
              ? this.checkIdNames.join(";")
              : this.checkIdNames[0],
          humanNames:
            this.checkNames.length > 1
              ? this.checkNames.join(";")
              : this.checkNames[0],
          pcsAvyIds: this.fromdata.pcsAvyIds,
          multiTenancyId: this.fromdata.multiTenancyId
        };
        this.$post
          .postData(
            "cuibanManyAssist",
            JSON.stringify(parms),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                message: "催办成功",
                type: "success"
              });
              this.shdialog1 = false;
              this.$forceUpdate();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
      } else {
        let parms = {
          function: "takeBackByMainManyAssist",
          ids:
            this.checkIdNames.length > 1
              ? this.checkIdNames.join(";")
              : this.checkIdNames[0],
          humanNames:
            this.checkNames.length > 1
              ? this.checkNames.join(";")
              : this.checkNames[0],
          pcsAvyIds:
            this.checkpcyNames.length > 1
              ? this.checkpcyNames.join(";")
              : this.checkpcyNames[0],
          multiTenancyId: this.fromdata.multiTenancyId
        };
        this.$post
          .postData(
            "takeBackByMainManyAssist",
            JSON.stringify(parms),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                message: "收回成功",
                type: "success"
              });
              this.shdialog1 = false;
              // setTimeout(() => {
              //  window.close();
              // }, 1000);
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
              this.$forceUpdate();
              location.reload();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
      }
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      let judge = true;
      judge = this.saveCheck();
      if (!judge) {
        return;
      }
      this.preserve();
      this.iswcbfs = true;
      this.dialogTit = "选择会签人";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoSend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      setTimeout(() => {
        this.bank_selectConfig.curNodeName = this.fromdata.curNodeName;
        this.bank_selectConfig.curNodeId = this.fromdata.curNodeCode;
        if (this.fromdata.isMutil == 1) {
          Object.assign(this.bank_selectConfig, { isMutil: 1 });
        }
        this.$post
          .postData(
            "getNextNodeInfo",
            JSON.stringify(this.bank_selectConfig),
            this.$businessCode.qbgl
          )
          .then(res => {
            let parms = Object.assign(this.bank_send, this.fromdata);
            if (this.fromdata.isMutil == 1) {
              this.seletOptionsData = res.data.filter(item => {
                if (item.AVYNODENM == this.fromdata.curNodeName) {
                  return item;
                }
              });
            } else {
              this.seletOptionsData = res.data || [];
            }
            this.bank_send.curTplNo = this.fromdata.tplNo;
            this.bank_send.curMultiTenancyId = this.fromdata.multiTenancyId;
            // parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
            parms.pcsAvyId =
              this.fromdata.isMutil == 1
                ? this.banjiedispatch.curNodeCode
                : res.data[0].PCSAVYID;

            if (this.fromdata.isMutil == 1) {
              this.singelCheckF = true; // 单选true 多选为false
            } else {
              this.$post
                .postData(
                  "checkMultiHqXb",
                  JSON.stringify({
                    function: "checkMultiHqXb",
                    multiTenancyId: this.fromdata.multiTenancyId,
                    tplNo: this.fromdata.tplNo,
                    pcsAvyId: parms.pcsAvyId
                  }),
                  this.$businessCode.qbgl
                )
                .then(res => {
                  if (res.success && res.isMulti) {
                    this.singelCheckF = false; // 单选true 多选为false
                  } else {
                    this.singelCheckF = true; // 单选true 多选为false
                  }
                });
            }
            this.$post
              .postData(
                "selWfNode",
                JSON.stringify(parms),
                this.$businessCode.qbgl
              )
              .then(res => {
                if (res && res.success) {
                  this.treeData = res.data;
                  if (res.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  this.treeData = (res.data && res.data.data) || [];
                  this.defaultUser = (res.data && res.data.defaultUser) || {};
                } else {
                  this.iswcbfs = false;
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
                this.iswcbfs = false;
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: res.message,
                  duration: 2000
                });
              });
          });
      }, 1000);
    },

    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let result = true;
      that.$refs.fromdata.validate((valid, object) => {
        if (!valid) {
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

    //mimi
    workSecurityTabTime(value) {
      if (value == "secretLimitName") {
        var limt =
          this.fromdata.secretTimeType == "年"
            ? 99
            : this.fromdata.secretTimeType == "月"
            ? 11
            : this.fromdata.secretTimeType == "日"
            ? 29
            : "";
        if (limt == "") {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请重新填写",
            duration: 2000
          });
          this.fromdata.secretLimitName = "";
          return;
        }
        if (this.fromdata.secretLimitName > limt) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "填写范围1-" + limt + "，请重新填写",
            duration: 2000
          });
          this.fromdata.secretLimitName = "";
          return;
        }
      }
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    workSecurityTab(value, type) {
      this.$forceUpdate();
      if (value == "保密期限") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = true;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
        this.securityFlag = true;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      } else if (value == "解密时间") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        // 选择解密时间
        this.rules.secretLimit[0].required = true;
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = true;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      } else if (value == "解密条件") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = true;
      } else {
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      }
      if (!type) {
        this.fromdata.security = "";
        this.fromdata.secretLimitName = "";
        this.fromdata.secretTimeType = "";
        this.fromdata.secretLimit = "";
      }

      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    secretTypechange(value, type) {
      //type 回显处理
      if (value == "商业秘密") {
        this.rules.secretLimitType[0].required = true;
        this.rules.secretFlag[0].required = false;
        this.rules.workSecretFlag[0].required = false;
        this.flag = true;
        this.secretTypeFlag = false;
        this.SSsecretLimitType = [
          {
            label: "保密期限",
            value: 1
          },
          {
            label: "解密时间",
            value: 2
          },
          {
            label: "解密条件",
            value: 3
          }
        ];
      } else if (value == "内部信息") {
        this.rules.secretFlag[0].required = true;
        this.rules.secretLimitType[0].required = false;
        this.rules.workSecretFlag[0].required = false;
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = false;
        this.secretOptionsFlag = [].concat(this.SsecretFlag);
      } else if (value == "工作秘密") {
        this.rules.workSecretFlag[0].required = true;
        this.rules.secretLimitType[0].required = false;
        this.rules.secretFlag[0].required = false;
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = true;
        this.secretOptionsFlag = [].concat(this.SworkSecurity);
      } else {
        this.rules.workSecretFlag[0].required = false;
        this.rules.secretLimitType[0].required = false;
        this.rules.secretFlag[0].required = false;
        this.flag = false;
        this.secretTypeFlag = false;
        this.workSecurityFlag = false;
      }
      if (!type) {
        this.fromdata.workSecretFlag = "";
        this.fromdata.secretFlag = "";
        this.fromdata.secretLimitType = "";
        this.fromdata.security = "";
      }

      //mimi
      console.log(this.rules.secretGists[0]);
      if (this.fromdata.secretType) {
        this.rules.secretGists[0].required = true;
      } else {
        this.fromdata.secretGists = "";
        this.fromdata.knowScore = "";
        this.rules.secretGists[0].required = false;
        this.$refs.fromdata.clearValidate();
      }
      this.$forceUpdate();

      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },

    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      let res = this.scrollIntoForm();
      //mimi
      return res;
      // if (this.flag) {
      //   if (!this.fromdata.secretLimitType || !this.fromdata.security) {
      //     this.$message({
      //       type: "error",
      //       showClose: true,
      //       offset: 400,
      //       message: tips,
      //       duration: 1000
      //     });
      //     return;
      //   }
      // } else {
      //   if (this.secretTypeFlag && !this.fromdata.secretFlag) {
      //     this.$message({
      //       type: "error",
      //       showClose: true,
      //       offset: 400,
      //       message: tips,
      //       duration: 1000
      //     });
      //     return;
      //   }
      // }
      // if (this.fromdata.secretType == "商业秘密") {
      //   switch (this.fromdata.secretLimitType) {
      //     case "保密期限":
      //       if (
      //         !this.fromdata.security ||
      //         !this.fromdata.secretLimitName ||
      //         !this.fromdata.secretTimeType
      //       ) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         res = false;
      //       }
      //       break;
      //     case "解密时间":
      //       if (!this.fromdata.security || !this.fromdata.secretLimit) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         res = false;
      //       }
      //       break;
      //     case "解密条件":
      //       if (!this.fromdata.security || !this.fromdata.secretTimeType) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         res = false;
      //       }
      //       break;
      //     default:
      //       this.$message({
      //         type: "error",
      //         showClose: true,
      //         offset: 400,
      //         message: tips,
      //         duration: 1000
      //       });
      //       res = false;
      //   }
      // } else if (
      //   this.fromdata.secretType == "内部信息" &&
      //   !this.fromdata.secretFlag
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   res = false;
      // } else if (
      //   this.fromdata.secretType == "工作秘密" &&
      //   !this.fromdata.workSecretFlag
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   res = false;
      // }

      // return res;

      // if (
      //   !this.fromdata.title ||
      //   !this.fromdata.submittedName ||
      //   !this.fromdata.handleType ||
      //   !this.fromdata.qianBaoTypeName ||
      //   !this.fromdata.qianbaoCode ||
      //   !this.fromdata.draftDepartmentName ||
      //   !this.fromdata.draftUserName ||
      //   // !this.fromdata.phone ||
      //   !this.fromdata.secretType
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   return false;
      // } else {
      //   return true;
      // }
    },

    //初始值 //input框内容
    getToQianbaoHuiqianEntityById() {
      // if (!sessionStorage.getItem("sHqsignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("sHqsignpageid") || "";
      // }
      this.bank_dispach.id = getFormId(this.$route.query.id, "sHqsignpageid");
      this.bank_dispach.moduleType = this.$route.query.moduleType;
      this.$post
        .postData(
          "getToQianbaoHuiqianEntityById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.getIsNowUser(res, "fcy", "db");
          this.fromdata = Object.assign(this.fromdata, res.data);
          this.nowUserId = this.fromdata.currentUserId;
          //获取签报处理单主标题
          // this.directTitle = res.data && res.data.orgName;
          if (
            res.data &&
            res.data.isSpecialHead &&
            res.data.isSpecialHead == "1"
          ) {
            this.directTitle = this.fromdata.draftDepartmentName;
          } else {
            this.directTitle = res.data && res.data.orgName;
          }

          // 签报依据
          if (
            res.data.sendBasis &&
            JSON.parse(res.data.sendBasis).length != 0
          ) {
            this.showImportData = true;
          }
          this.fromdata.sendBasis = this.importDataArr =
            res.data && res.data.sendBasis && JSON.parse(res.data.sendBasis);

          this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
          this.banjiedispatch.tplNo = res.data.tplNo;
          this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
          this.banjiedispatch.processInstId = res.data.processInstId;
          this.banjiedispatch.curNodeCode = res.data.curNodeCode;
          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_selectConfig.curTplNo = res.data.tplNo;
          this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

          this.createSighWf.processInstId = res.data.processInstId;
          this.createSighWf.id = this.bank_dispach.id;
          this.createSighWf.multiTenancyId = res.data.multiTenancyId;
          this.createSighWf.pcsAvyId = res.data.pcsAvyId;
          this.createSighWf.tplNo = res.data.tplNo;
          this.createSighWf.curNodeCode = res.data.curNodeCode;
          // this.createSighWf.sequenceSign = "0";
          this.createSighWf.sequenceSign = this.saveOrUpdateToQianbaoHuiqianEntity.sequenceSign = this.setradio =
            (res.data.sequenceSign && res.data.sequenceSign.toString()) || "1";

          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];

          //mimi
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }

          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }

          if (this.fromdata.handleTypeName == "1") {
            this.fromdata.handleTypeName = "阅件";
          } else if (this.fromdata.handleTypeName == "0") {
            this.fromdata.handleTypeName = "批件";
          }
          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          if (res.data.signDepartmentId) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartmentName
            );
            this.createSighWf.deptIds = res.data.signDepartmentId;
            this.createSighWf.deptNames = res.data.signDepartmentName;
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

          if (this.readFlag != "" && this.readFlag != 1) {
            this.$post
              .postData(
                "doUpdateReadRecord",
                JSON.stringify({
                  function: "doUpdateReadRecord",
                  pcsAvyId: res.data.pcsAvyId,
                  processInstId: res.data.processInstId,
                  multiTenancyId: res.data.multiTenancyId
                }),
                this.$businessCode.ggqbgl
              )
              .then(res => {
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                //更新状态用。暂时不用任何操作
              });
          }

          //表单验证
          if (res.data.processInstId) {
            this.$post
              .postData(
                "getNextUserTaskNode",
                JSON.stringify({
                  function: "getNextUserTaskNode",
                  processInstId: res.data.processInstId
                }),
                this.$businessCode.ggqbgl
              )
              .then(res => {
                this.huanJieMessage = res.data.extAttributes;
                this.setConfig();
                this.setFormConfig();
                // setTimeout(() => {
                //   this.$refs.fromdata.clearValidate();
                // });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$post
              .postData(
                "getpcsTplStartNode",
                JSON.stringify({
                  function: "getpcsTplStartNode",
                  multiTenancyId: res.data.multiTenancyId
                }),
                this.$businessCode.ggqbgl
              )
              .then(res => {
                console.log(res.data);
                this.huanJieMessage = res.data;
                this.setConfig();
                this.setFormConfig();
                // setTimeout(() => {
                //   this.$refs.fromdata.clearValidate();
                // });
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },
    // 保存
    async preserve(type) {
      let successState = false;
      // this.bank_dispach.id = this.$route.query.id
      //   ? this.$route.query.id
      //   : sessionStorage.getItem("sHqsignpageid") || "";
      this.bank_dispach.id = getFormId(this.$route.query.id, "sHqsignpageid");
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.signOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.mainDeptAttachment;
      delete parseList.finalOpinionList;
      delete parseList.processOpinionList;
      var obj = Object.assign(
        this.saveOrUpdateToQianbaoHuiqianEntity,
        parseList
      );
      await this.$post
        .postData(
          "saveOrUpdateToQianbaoHuiqianEntity",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            // this.saveOrUpdateToQianbaoHuiqianEntity.id = this.bank_dispach.id =
            //   res.data.id;
            // this.bank_toQianbaoSend.id = res.data.id;
            // sessionStorage.setItem("sHqsignpageid", res.data.id);
            this.saveOrUpdateToQianbaoHuiqianEntity.id = this.bank_dispach.id = this.bank_toQianbaoSend.id = getFormId(
              this.$route.query.id,
              "sHqsignpageid",
              res.data.id
            );
            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            window.opener ?? window.opener.location.reload();
            this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
            this.banjiedispatch.tplNo = res.data.tplNo;
            this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
            this.banjiedispatch.processInstId = res.data.processInstId;
            this.banjiedispatch.curNodeCode = res.data.curNodeCode;

            this.bank_selectConfig.curNodeId = res.data.curNodeCode;
            this.bank_selectConfig.curTplNo = res.data.tplNo;
            this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

            this.createSighWf.processInstId = res.data.processInstId;
            this.createSighWf.id = this.bank_dispach.id;
            this.createSighWf.multiTenancyId = res.data.multiTenancyId;
            this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            this.createSighWf.tplNo = res.data.tplNo;
            this.createSighWf.curNodeCode = res.data.curNodeCode;
            // this.createSighWf.sequenceSign = "0";
            this.createSighWf.sequenceSign = res.data.sequenceSign;
            //附件
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }

            this.getToQianbaoHuiqianEntityById();
            successState = true;
          } else {
            this.$confirm(res.message, {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "error"
            }).then(() => {
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
              window.close();
            });
          }
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "保存失败",
          //   duration: 1000
          // });
          console.log(erro);
        });
      return successState;
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
            this.$businessCode.qbglfj
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
                this.fromdata.attchmentFileInfo.splice(n, 1);
                this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
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
          this.$businessCode.qbglfj
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

    // 预览
    viewFile(file, tache) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      if (!file.filePath && tache == "1") {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "依据没有正文！",
          duration: 500
        });
        return;
      }
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
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
                duration: 500
              });
            }
          }
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

      // if (scrolled < this.distance_qpyj) {
      //   this.active = "#wjys";
      // } else if (
      //   scrolled >= this.distance_qpyj - 200 &&
      //   scrolled < this.distance_scfj
      // ) {
      //   this.active = "#qpyj";
      // } else {
      //   this.active = "#scfj";
      // }
      if (scrolled < this.distance_qpyj) {
        this.active = "#wjys";
      } else {
        this.active = "#qpyj";
      }
    },
    // 返回上级页面
    goBack() {
      window.history.go(-1);
    },
    // 关闭
    async btnCloseHandler(val) {
      if (val == 1) {
        this.handleSetLoacl();
        window.close();
      } else if (val == 2) {
        await this.preserve();
        window.location.href = "about:blank";
        if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
          window.opener.location.reload();
        }
        this.handleSetLoacl();
        window.close();
      } else {
        this.closeHandler = false;
      }
    },
    // handelclose() {
    //   this.$confirm("是否保存并退出当前页面?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.preserve();
    //       window.location.href = "about:blank";
    //       this.handleSetLoacl();window.close();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         offset: 100,
    //         showClose: true,
    //         message: "已取消关闭",
    //         duation: 1000
    //       });
    //     });
    // },
    // 关闭
    handleClose(val) {
      if (val == "1") {
        this.preserve().then(save => {
          if (save) {
            window.location.href = "about:blank";
            this.handleSetLoacl();
            window.close();
          }
        });
      } else if (val == "2") {
        window.location.href = "about:blank";
        this.handleSetLoacl();
        window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
    },
    handelclose1() {
      window.location.href = "about:blank";
      window.close();
    },
    //请求文件路径
    async getFileInfo(self) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.qbglfj
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
              message: "获取文件失败",
              duration: 1500
            });
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
    // 起草正文
    drafting(state) {
      let that = this;
      this.zhengWenState = state;
      if (!this.fromdata.filePath && !this.fromdata.fileName && state != 1) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先起草正文",
          duation: 500
        });
        return;
      }
      if (!getFormId(this.$route.query.id, "sHqsignpageid")) {
        this.preserve().then(res => {
          if (res) {
            if (state == 1) {
              this.showDraft = true;
            } else {
              let fileInfo = {
                filePath: this.fromdata.filePath,
                fileName: this.fromdata.fileName
              };
              this.doDraft(fileInfo);
            }
          }
        });
      } else {
        if (state == 1) {
          this.showDraft = true;
        } else {
          this.getFileInfo(that).then(resF => {
            if (resF.state) {
              this.preserve().then(res => {
                if (res) {
                  if (state != "taoHong") {
                    this.doDraft(resF);
                  } else {
                    this.findTemplete(resF);
                  }
                }
              });
            }
          });
        }
      }
    },
    //正文跳转
    doDraft(fileInfo, saveName) {
      let str = "";
      if (!saveName) {
        if (this.fromdata.documentNo) {
          str =
            this.fromdata.qianbaoCode +
            this.fromdata.documentNo +
            this.fromdata.title;
        } else {
          str = this.fromdata.title;
        }
      } else {
        str = saveName;
      }
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
          id: getFormId(this.$route.query.id, "sHqsignpageid"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.qbglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          flowTranId: this.$businessCode.qbgl, //流程交易线    chai
          saveSpecialFileName: str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },

    // 删除此文
    delectArticle() {
      // if (!sessionStorage.getItem("sHqsignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("sHqsignpageid") || "";
      // }
      // this.bank_dispach.id = sessionStorage.getItem("sHqsignpageid") || "";
      this.bank_dispach.id = getFormId(this.$route.query.id, "sHqsignpageid");
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      this.deleteToQianbaoEntityById.id = deletesendorderid;
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.deleteToQianbaoEntityById.id) {
            window.location.href = "about:blank";
            if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
              window.opener.location.reload();
            }
            this.handleSetLoacl();
            window.close();
          } else {
            this.$post
              .postData(
                "deleteToQianbaoEntityById",
                JSON.stringify(this.deleteToQianbaoEntityById),
                this.$businessCode.qbgl
              )
              .then(res => {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 500,
                    onClose: () => {
                      window.location.href = "about:blank";
                      if (
                        !(localStorage.getItem("st").indexOf("smarto") > -1)
                      ) {
                        window.opener.location.reload();
                      }
                      this.handleSetLoacl();
                      window.close();
                    }
                  });
                } else {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "删除失败",
                    duration: 1000
                  });
                }
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
    shoucang() {
      let that = this;
      let shiwutitle = this.fromdata.qianbaoCode; //字号
      let draftInfo = this.fromdata.filePath
        ? [].concat(
            {
              fileName: this.fromdata.fileName,
              filePath: this.fromdata.filePath
            },
            this.fromdata.mainDeptAttachment
          )
        : this.fromdata.mainDeptAttachment; //收藏时下载正文

      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "signquteWaitFKhHq",
        this.$businessCode.qbglfj,
        this.fromdata.title, //标题
        that
      );
    },
    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "QBGL"
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
                    id: this.fromdata.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.qbgl //流程交易线     chai
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
    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.ggqbgl
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
    processSheet() {
      this.preserve().then(save => {
        if (save) {
          const routeData = this.$router.resolve({
            path: "/qbdzHqCld",
            query: {
              id: this.bank_dispach.id,
              khState: "2",
              choseYear: this.$route.query.choseYear
            }
          });
          window.open(routeData.href, "_blank");
        }
      });
      // this.bank_dispach.id = getFormId(this.$route.query.id, "sHqsignpageid");
      // let parseList = JSON.parse(JSON.stringify(this.fromdata));
      // delete parseList.approvalOpinionList;
      // delete parseList.checkOpinionList;
      // delete parseList.signOpinionList;
      // delete parseList.draftDepartmentOpinionList;
      // delete parseList.circulationList;
      // delete parseList.remarkList;
      // delete parseList.mainDeptAttachment;
      // delete parseList.finalOpinionList;
      // delete parseList.processOpinionList;
      // var obj = Object.assign(
      //   this.saveOrUpdateToQianbaoHuiqianEntity,
      //   parseList
      // );
      // this.$post
      //   .postData(
      //     "saveOrUpdateToQianbaoHuiqianEntity",
      //     JSON.stringify(obj),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     if (res && res.success) {
      //       const routeData = this.$router.resolve({
      //         path: "/qbdzHqCld",
      //         query: {
      //           id: this.bank_dispach.id
      //         }
      //       });
      //       window.open(routeData.href, "_blank");
      //     }else{
      //       this.$message({
      //         type: "error",
      //         offset: 400,
      //         showClose: true,
      //         message: "保存失败",
      //         duration: 1000
      //       });
      //     }
      //   })
      //   .catch(erro => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "保存失败",
      //       duration: 1000
      //     });
      //   });
    },

    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 会签部门最终意见
          this.fromdata.finalOpinion = this.fromdata.finalOpinion
            ? this.fromdata.finalOpinion + data
            : data;
          if (
            this.fromdata.finalOpinion &&
            this.fromdata.finalOpinion.length >= 500
          ) {
            this.fromdata.finalOpinion = this.fromdata.finalOpinion.substr(
              0,
              500
            );
          }
        } else if (this.clickTypes == 2) {
          // 会签过程意见
          this.fromdata.processOpinion = this.fromdata.processOpinion
            ? this.fromdata.processOpinion + data
            : data;
          if (
            this.fromdata.processOpinion &&
            this.fromdata.processOpinion.length >= 500
          ) {
            this.fromdata.processOpinion = this.fromdata.processOpinion.substr(
              0,
              500
            );
          }
        }
        this.$forceUpdate();
      }
    },
    changeDage(e) {
      this.$forceUpdate();
    },
    //常用批语弹窗弹出
    writelistbox(arr, num) {
      if (num >= 500) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "当前字数超出500字",
          duration: 2000
        });
        return;
      }
      this.appendWriteDialog = true;
      this.getCommonUse(0);
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
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
          this.$businessCode.ggqbgl
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
          this.$businessCode.ggqbgl
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
          this.$businessCode.ggqbgl
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
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            // this.getToQianbaoHuiqianEntityById();
            window.location.reload();
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
            message: "删除失败",
            duration: 2000
          });
        });
    }

    // 签报依据
    // handleImport() {
    //   this.bankImport = "";
    //   this.documentCode = "〔〕号";
    //   this.showImport = true;
    // },
    // handleImportSure() {
    //   let that = this;
    //   let transJudge = false;
    //   if(this.bankImport == "") {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "文件类型不能为空！",
    //       duration: 500
    //     });
    //     return;
    //   }
    //   if(this.documentCode == "") {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "文号不能为空！",
    //       duration: 500
    //     });
    //     return;
    //   }
    //   if(that.importDataArr.length>0) {
    //     that.importDataArr.forEach(item => {
    //       if(item.documentCode == this.documentCode) {
    //         transJudge = true
    //       }
    //     });
    //   }
    //   if (transJudge) {
    //     this.$message({
    //       type: "error",
    //         showClose: true,
    //         offset: 400,
    //         message: "已存在本文件字号依据，不可重复添加！",
    //         duration: 500
    //       });
    //     return;
    //   }
    //   if (this.bankImport != "") {
    //     let transJYX = "";
    //     switch (this.bankImport) {
    //       case "CN000": //发文
    //         this.$businessCode.ggfawgl = "A08462001";
    //         break;
    //       case "CN001": //收文
    //         this.$businessCode.ggfawgl = "A08462003";
    //         break;
    //       case "CN002": //签报
    //         this.$businessCode.ggfawgl = "A08462005";
    //         break;
    //     }

    //     if (this.bankImport == "4") {
    //       this.$api.checkLz
    //         .importBas({
    //           documentNo: this.documentCode,
    //           currentUserOldId: JSON.parse(localStorage.getItem("userInfo"))
    //             .humanId
    //         })
    //         .then(res => {
    //           if (!res.result.id) {
    //             this.$message({
    //               type: "warning",
    //               message: "没有找到相应文档"
    //             });
    //           } else {
    //             let transObj = {
    //             id: res.result.id,
    //             title: res.result.title
    //           }
    //           that.importDataArr.push(transObj)
    //           that.fromdata.sendBasis = that.importDataArr
    //           that.showImport = false
    //           that.showImportData = true
    //           that.preserve()

    //             // that.bank_import = res.data;
    //             // that.importDataArr.push(res.data);
    //             // that.fromdata.sendBasis = that.importDataArr;
    //             // that.showImport = false;
    //             // that.showImportData = true;
    //             // that.preserve();
    //           }
    //         });
    //     } else {
    //        let that = this
    //       let obj = {
    //         function: "importBasis",
    //         multiTenancyId: this.bankImport,
    //         documentCode: this.documentCode
    //       };

    //       that.$post
    //         .postData(
    //           "importBasis",
    //           JSON.stringify(obj),
    //           that.$businessCode.ggfawgl
    //         )
    //         .then(res => {
    //           if (res && res.data && res.success) {
    //             // let transArr = [];
    //             // transArr = that.fromdata.sendBasis
    //             //   ? that.fromdata.sendBasis
    //             //   : [];
    //             // transArr.push(res.data);
    //             // that.importDataArr = transArr;
    //             // that.fromdata.sendBasis = that.importDataArr;
    //           //   that.bank_import = res.data;
    //           // that.importDataArr.push(res.data);
    //           // that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
    //           //   that.showImport = false;
    //           //   that.showImportData = true;
    //           //   that.$businessCode.ggfawgl = "A08462001";

    //           //   that.preserve();
    //           that.bank_import = res.data;
    //           that.importDataArr.push(res.data);
    //           that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
    //           that.showImport = false;
    //           that.showImportData = true;
    //           that.preserve();
    //             // that.$forceUpdate()
    //           } else {
    //             // this.$message({
    //             //   type: "error",
    //             //   message: res.message,
    //             //   showClose: true,
    //             //   duration: 1500
    //             // });
    //             // that.showImport = false;
    //             let transObj = {
    //             documentCode: this.documentCode,
    //             id: "",
    //             title: ""
    //           }
    //           this.importDataArr.push(transObj);
    //           this.showImport = false;
    //           that.preserve();
    //           }
    //         });
    //     }
    //   }
    // },
    // handleCheckImport(data) {
    //   if (data.id == ''||!data.id) {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "该文件不存在于库中！",
    //       duration: 500
    //     });
    //     return;
    //   } else {

    //     if(data.bankImport == '4') {
    //       this.handleOpenPage("/proceHas", data.id, '2');
    //       return;
    //     }
    //     if (data.orderType && data.orderType !== "") {
    //       if (data.orderType == "非跨行") {
    //         this.handleOpenPage("/signquoteOverFkhDispatch", data.id);
    //       } else if (data.orderType == "跨行请示") {
    //         this.handleOpenPage("/signquoteOverKhQshDispatch", data.id);
    //       } else if (data.orderType == "跨行审批") {
    //         this.handleOpenPage("/signquoteOverKhSphDispatch", data.id);
    //       } else if (data.orderType == "实物") {
    //         this.handleOpenPage("/signquoteOverEntityDispatch", data.id);
    //       }
    //     } else {
    //      this.showImportList = true;
    //       this.bank_import = data;
    //     }
    //   }
    // },
    // handleOpenPage(path, id, readType) {
    //   const routeData = this.$router.resolve({
    //     path: path,
    //     query: {
    //       id: id,
    //       readFlag: readType
    //     }
    //   });
    //   window.open(routeData.href, "_blank");
    // },
    // handleDeleteImport(data) {
    //   this.fromdata.sendBasis.forEach((item, index) => {
    //     if (item.documentCode == data.documentCode) {
    //       this.fromdata.sendBasis.splice(index, 1);
    //     }
    //   });
    //   if (this.fromdata.sendBasis.length == 0) {
    //     this.showImportData = false;
    //   }
    //   this.preserve();
    //   // this.$forceUpdate();
    // }
  },
  created() {
    //初始化加载数据
    // this.bank_dispach.id = this.uploadConfig.id = this.$route.query.id ? this.$route.query.id : "";
    // this.bank_toQianbaoSend.id = this.bank_dispach.id;
    // this.receiveselectlist();
    this.bank_dispach.id = this.uploadConfig.id = this.bank_toQianbaoSend.id = getFormId(
      this.$route.query.id,
      "sHqsignpageid"
    );
    //初始化修改交易线 (传后台)
    this.uploadConfig.code = this.$businessCode.qbglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.readonlyQbcy = this.$route.query.readonlyQbcy ? false : true;
    this.getToQianbaoHuiqianEntityById();
    // this.getTcQbsignParamDicInfo();
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
.el-scrollbar {
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.pad_10 {
  padding: 0 5px;
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
.disable_w {
  width: 100%;
}

//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 130px;
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
    .down {
      cursor: pointer;
    }
    .down:hover {
      color: #3b85ef;
    }
  }
}
.tree_zhuban {
  margin: 0;
}
/deep/ .hqbm1 .el-textarea__inner {
  min-height: 40px !important;
}
/deep/ .dialogImport {
  .el-dialog {
    width: 30% !important;
  }
}
.pr45 {
  padding-right: 45px;
}
/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>
