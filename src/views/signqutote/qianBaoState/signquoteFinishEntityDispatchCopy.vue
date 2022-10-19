<template>
  <!-- 签报实物处理单 已办-->
  <div id="signquteFinishEntityGly" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>签报处理单
        </p>
        <div class="grid_comtent">
          <!-- 【关闭】【维护】【流程调度】【退号】【解锁】【加锁】【查看正文】归档 重新流转【查看流程】【打印处理单】【收藏】 -->
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <!-- <el-button size="small" plain @click="preserve('save')">保存</el-button>
          <el-button size="small" plain @click="concludematter">办结</el-button>
          <el-button size="small" plain @click="completeSending">完成并发送</el-button>
          
          <el-button size="small" plain @click="handleSetDocNo">生成文号</el-button>
          <el-button size="small" plain @click="handleClearDocNo">退号</el-button>
          <el-button size="small" plain @click="handleHeCgs">合成格式</el-button> -->
          <!-- <el-button size="small" plain @click="sendTackBtn"  v-if="allowBack =='1' && readFlag == '0'">收回</el-button> -->
          <!-- <el-button size="small" plain @click="drafting('0')">查看正文</el-button> -->
          <!-- <el-button size="small" plain @click="delectArticle">删除此文</el-button> -->
          <!-- <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button> -->
          <el-button size="small" plain @click="maintenance">维护</el-button>
          <el-button size="small" plain v-show="bank_selectConfig.curNodeId != '800'" @click="processScheduling">流程调度</el-button>
          <el-button size="small" plain @click="pigeonhole('newDoGuidangIsFiled')" v-show="pigeonholeFlag && historyTuijiejia && isNewGd">区块链归档</el-button>
          <el-button size="small" plain @click="pigeonhole('doGuidangIsFiled')" v-show="pigeonholeFlag && historyTuijiejia">归档</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="collect('qianbao_sw',fromdata.id,fromdata.multiTenancyId)">收藏</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog  v-dialogDrag  title="收回" width="30%" :visible.sync="sendTackVisible">
      <span>是否确定收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendTackVisible = false">取消</el-button>
        <el-button type="primary" @click="sendTackHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog  v-dialogDrag  title="退号" width="30%" :visible.sync="handeldoBackNoFuc">
      <span>是否确定退号</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeldoBackNoFuc = false">取消</el-button>
        <el-button type="primary" @click="doBackNoHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog  v-dialogDrag  title="生成文号" width="30%" :visible.sync="SetDocNoVisible">
      <div>
        <el-form v-for="(DocNoDataListitem,n,m) in DocNoDataList" :key="DocNoDataListitem+m">
          <el-form-item :label="n">
            <template
              v-for="DocNoDataListitems in DocNoDataListitem && DocNoDataListitem.split(';')||[]"
            >
              <el-radio
                v-model="setDocNum"
                :label="DocNoDataListitems+'-'+m"
                :key="DocNoDataListitems+n+m"
              >{{DocNoDataListitems}}</el-radio>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SetDocNoVisible = false">取消</el-button>
        <el-button type="primary" @click="SetDocNoHandle">确定</el-button>
      </span>
    </el-dialog>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{directTitle}}</h3>
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
        >附件</a> -->
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation" >
            <p class="bank_dispach_annotation_current" style="width:15%;">
              当前环节：
              <span>{{fromdata.curNodeName}}</span>
            </p>
            <p class="bank_dispach_annotation_current"  v-if="fromdata.curNodeCode != 800">
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
                    <el-input
                      v-model="fromdata.submittedName"
                      placeholder="请输入呈送"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleType" ref="handleType">
                    <el-radio v-model="fromdata.handleType" label="0" disabled>批件</el-radio>
                    <el-radio v-model="fromdata.handleType" label="1" disabled>阅件</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8"  prop="emergencyLevel" ref="emergencyLevel">
                    <el-select
                      v-model="fromdata.emergencyLevel"
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
                      v-model="fromdata.qianbaoCode"
                      placeholder="请选择"
                      style="width:50%"
                      disabled
                    >
                      <el-option
                        v-for="sendTypeitem in SqbZihaoList"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                    <el-input
                      style="width:50%"
                      v-model="fromdata.documentNo"
                      prop="documentNo"
                      ref="documentNo"
                      disabled
                    ></el-input>
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
                      <!-- <el-option
                        v-for="secretTypeitem in SsecretType"
                        :key="secretTypeitem.label"
                        :label="secretTypeitem.label"
                        :value="secretTypeitem.label"
                      ></el-option> -->
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
                      <!-- <el-option
                        v-for="workSecurityitem in SworkSecurity"
                        :key="workSecurityitem.label"
                        :label="workSecurityitem.label"
                        :value="workSecurityitem.label"
                      ></el-option> -->
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
                      <!-- <el-option
                        v-for="secretFlagitem in secretOptionsFlag"
                        :key="secretFlagitem.label"
                        :label="secretFlagitem.label"
                        :value="secretFlagitem.label"
                      ></el-option> -->
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
                      <!-- <el-option
                        v-for="secretLimitTypeitem in SSsecretLimitType"
                        :key="secretLimitTypeitem.label"
                        :label="secretLimitTypeitem.label"
                        :value="secretLimitTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择保密期限 -->
                <el-col :span="8" v-if="flag && securityFlag" style="display:flex;align-items:center;">
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
                      <!-- <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                    <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                    <!-- <i class="el-icon-star-on pad_10" v-show="nationSecurFlag"></i> -->
                  <el-form-item label prop="secretLimitName"
                      ref="secretLimitName" label-width="0px" style="width: 20%;">
                    <el-input
                      @input="workSecurityTabTime('secretLimitName')"
                      v-model="fromdata.secretLimitName"
                      disabled
                        
                    ></el-input>
                  </el-form-item>
                  <el-form-item label prop="secretTimeType"
                      ref="secretTimeType" label-width="0px" style="width: 20%;">
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
                      <!-- <el-option
                        v-for="secretTimeTypeitem in SsecretTimeType"
                        :key="secretTimeTypeitem.label"
                        :label="secretTimeTypeitem.label"
                        :value="secretTimeTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择解密时间 -->
                <el-col :span="8" v-if="flag && businessSecretFlag" style="display:flex;align-items:center;">
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="security"
                    ref="security"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                    <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px" ></i>
                    <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                    <el-form-item label prop="secretLimit"
                      ref="secretLimit" label-width="0px">
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
                <el-col :span="8"  v-if="flag && securitytiaojFlag" style="display:flex;align-items:center;">
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="security"
                    ref="security"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                    <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                    <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                  <el-form-item  label prop="secretTimeType"
                      ref="secretTimeType" label-width="0px">
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
                      <!-- <el-option
                        v-for="secretLimititem in SsecretLimit"
                        :key="secretLimititem.label"
                        :label="secretLimititem.label"
                        :value="secretLimititem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 国家秘密  保密期限 -->
                <el-col
                  :span="8"
                  style="display:flex;align-items:center;"
                  v-if="flag && nationsecurityFlag"
                >
                  <el-form-item
                    label="密级标志"
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
                      <!-- <el-option
                        v-for="secretFlagTypeitem in ScountriesCecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-on pad_10" style="height: 32px;line-height:16px"></i>
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

                <!-- 选择 国家秘密  解密时间 -->
                <el-col
                  :span="8"
                  style="display:flex;align-items:center;"
                  v-if="flag && nationbusinessSecretFlag"
                >
                  <el-form-item label="密级标志" :span="8" prop="security" ref="security">
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagTypeitem in ScountriesCecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-on pad_10" style="height: 32px;line-height:16px"></i>
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
                <!-- 选择 国家秘密  解密条件 -->
                <el-col
                  :span="8"
                  style="display:flex;align-items:center;"
                  v-if="flag && nationsecuritytiaojFlag"
                >
                  <el-form-item label="密级标志" :span="8" prop="security" ref="security">
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagTypeitem in ScountriesCecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                  <i class="el-icon-star-on pad_10" style="height: 32px;line-height:16px"></i>
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
                      <!-- <el-option
                        v-for="secretLimititem in SsecretLimit"
                        :key="secretLimititem.label"
                        :label="secretLimititem.label"
                        :value="secretLimititem.label"
                      ></el-option> -->
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
                    <div  style="display:flex">
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

                <!-- <el-col>
                  <el-form-item label="签报依据">
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize 
                        v-model="fromdata.sendBasis"
                        placeholder="请输入签报依据"
                        maxlength="500"
                        disabled
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col> -->
                <el-col>
                  <el-form-item label="会签部门">
                    <div  style="display:flex">
                      <el-input placeholder="请选择会签部门" @input="inputChange" v-model="fromdata.signDepartmentName" disabled></el-input>
                      <button
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        @click="bankmain('hui')"
                       disabled
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="附件名称">
                    <el-input autosize resize="none" type="textarea" v-model="fromdata.attachTitle" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row  class="pr45">
              <el-col>
                <el-form-item label="批示意见">
                  <!-- <div v-for="item in fromdata.approvalOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          
                        >
                          <el-input
                            type="textarea" resize="none" autosize 
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea" resize="none" autosize  maxlength="2500"
                    v-model="fromdata.approvalOpinion"
                    disabled
                    v-if="!(fromdata.approvalOpinionList && fromdata.approvalOpinionList.length)"
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
              <el-col v-if="false">
                <el-form-item label="定密责任人意见">
                  <!-- <div v-for="item in fromdata.secretPersonIdeaList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          
                        >
                          <el-input
                            type="textarea" resize="none" autosize 
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea" resize="none" autosize  maxlength="500"
                    v-model="fromdata.secretPersonIdea"
                    disabled
                    v-if="!(fromdata.secretPersonIdeaList && fromdata.secretPersonIdeaList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.secretPersonIdeaList" 
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
                          :span="24"
                          
                        >
                          <el-input
                            type="textarea" resize="none" autosize 
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea" resize="none" autosize  maxlength="500"
                    v-model="fromdata.checkOpinion"
                    disabled
                    v-if="!(fromdata.checkOpinionList && fromdata.checkOpinionList.length)"
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
                          :span="24"
                          
                        >
                          <el-input
                            type="textarea" resize="none" autosize 
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea" resize="none" autosize  maxlength="500"
                    v-model="fromdata.signOpinion"
                    disabled
                    v-if="!(fromdata.signOpinionList && fromdata.signOpinionList.length)"
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
                  <!-- <div v-for="item in fromdata.draftDepartmentOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          
                        >
                          <el-input
                            type="textarea" resize="none" autosize 
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
                      </el-row>
                    </div>
                  </div> -->
                    <el-input
                      type="textarea" resize="none" autosize maxlength="500"
                      style="flex:1"
                      v-model="fromdata.draftDepartmentOpinion"
                      disabled
                      v-if="!(fromdata.draftDepartmentOpinionList && fromdata.draftDepartmentOpinionList.length)"
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
                <el-form-item label="办理情况">
                  <!-- <div v-for="item in fromdata.handleSituationList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          
                        >
                          <el-input
                            type="textarea" resize="none" autosize 
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
                      </el-row>
                    </div>
                  </div> -->
                    <el-input
                      type="textarea" resize="none" autosize maxlength="500"
                      style="flex:1"
                      v-model="fromdata.handleSituation"
                      disabled
                      v-if="!(fromdata.handleSituationList && fromdata.handleSituationList.length)"
                    ></el-input>
                  <opinionText 
                    :opinionText="fromdata.handleSituationList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <!-- <el-col>
                <el-form-item label="传阅意见">
                    <el-input
                      type="textarea" resize="none" autosize maxlength="500"
                      style="flex:1"
                      v-model="fromdata.handRoundOpinion"
                     disabled
                      v-if="!(fromdata.handRoundOpinionList && fromdata.handRoundOpinionList.length)"
                    ></el-input>
                  <opinionText 
                    :opinionText="fromdata.handRoundOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col> -->
              <el-col>
                <el-form-item label="备    注">
                  <!-- <div v-for="(item) in fromdata.remarkList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          
                        >
                          <el-input
                            type="textarea" resize="none" autosize 
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea" resize="none" autosize maxlength="500"
                    v-model="fromdata.remark"
                    disabled
                    v-if="!(fromdata.remarkList && fromdata.remarkList.length)"
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
            </el-row>
            <!-- 附件 -->
            <!-- <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>

                  <span 
                  disabled
                  class="fu_jian_style"
                    v-if="!(fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length)">
                    暂无更多附件信息
                  </span>

                  <div
                    class="file_list_box"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar style="padding: 0px 15px 0 0;">
                      <div
                        v-for="(item, index) in fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span class="down" :title="item.fileName" @click="viewFile(item)">{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
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
                  </div>
                </el-col>
              </el-row>
            </div> -->
          </el-form>
        </div>
      </div>
    </div>

    <!-- <treeCofig
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
    ></treeCofig> -->
    <!-- <treeCopy
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
      :treeTradeCode="treeTradeCode"
    ></treeCopy> -->
    <!-- <treeCofig
      :defaultUser="defaultUser"
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :setradio="setradio"
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
      :treeTradeCode="treeTradeCode"
    ></treeCofig> -->
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
// import uploadFiles from "@/components/uploadFile/uploadFile";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import treeCopy from "@/components/tree/treeCopy";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import exportTable from "@/minixs/exportTable"; // 收藏
import proxyOfEvent from "@/util/proxyEvent.js"
import minixs from "@/minixs/index";
import opinionText from "@/components/opinionText/index";
import signquoteIndex from "@/minixs/signquoteIndex";
export default {
  name: "signquteFinishEntityGly",
  components: {
    // uploadFiles,
    timeDialog,
    treeCofig,
    treeCopy,
    secretBasls,
    appendWriteList,
    opinionText
  },
  mixins: [minixs,signquoteIndex],
  data() {
    return {
      nowUserId: "", //当前用户id
      interval: null,
      checkData:"",
      sequenceFlag:'',
      defaultUser:{},//完成并发送默认值
      directTitle:"中国建设银行实物签报处理单",
      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      historyTuijiejia:true,//判断是历史数据不显示退号、解锁、加锁、归档按钮
      // 生成文号/退号/生成上年文号
      doSaveDocumentNumFuc: {
        function: "doSaveDocumentNum",
        redHead: "",
        year: "",
        type: "CN002",
        num: ""
      },
      getNumListForm: {
        function: "getNumList",
        redHead: "",
        type: "CN002",
        year: ""
      },
      docNoYear: "",
      docNoNum: "",
      DocNoDataList: [],
      SetDocNoVisible: false,
      setDocNum: "",

      //退号
      doBackNoFuc: {
        function: "doBackNo",
        redHead: "",
        year: "",
        type: "CN002",
        num: ""
      },
      handeldoBackNoFuc: false,

      //收回
      sendTackVisible: false,
      sendTackFuc: {
        function: "doWithdrawTask"
      },

      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: []
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

      //全部、待办、已办、办结
      signState: true,
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
      deleteToQianbaoSwEntityById: {
        function: "deleteToQianbaoSwEntityById",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
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
      //国家秘密
      nationSecurFlag: true,
      nationsecurityFlag: false, //密级和保密期限  保密期限  显示隐藏
      nationbusinessSecretFlag: false, //密级和保密期限  解密时间  显示隐藏
      nationsecuritytiaojFlag: false, //密级和保密期限  解密条件  显示隐藏
      // 定密依弹窗
      secretDialog: true,
      //确定完成并发送
      bank_toQianbaoSend: {
        function: "toQianbaoSwSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        isSystem:"1"
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
      // bank_selectConfig: {
      //   function: "getNextNodeInfo",
      //   curNodeId: "",
      //   curTplNo: "",
      //   curMultiTenancyId: ""
      // },
      bank_selectConfig: {
        function: "getAllNodeInfo",
        curNodeId: "",
        tplNo: "",
        multiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "getToQianbaoSwEntityById",
        id: ""
        // id: "1"
      },
      //下拉框列表
      bank_dispachfile: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: "行发文"
      },
      //实物保存
      saveOrUpdateToQianbaoSwEntity: {
        function: "saveOrUpdateToQianbaoSwEntity",
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
        // function: "saveOrUpdateToQianbaoSwEntity",
        title: "",
        submittedName: "",
        handleTypeName: "0",
        handleType:"0",
        emergencyLevel: "",
        qianBaoTypeName: "",
        qianbaoCode: "",
        documentNo: "",
        draftTime: "",
        draftDepartmentName: "",
        draftUserName: "",
        sendBasis: "",
        secretGists: "",
        signDepartmentName: "",
        attachment: "",
        approvalOpinion: "",
        secretPersonIdea: "", //定密人意见
        handleSituation: "", //办理情况
        checkOpinion: "",
        signOpinion: "",
        draftDepartmentOpinion: "",
        handRoundOpinion: "", //传阅意见
        remark: "",
        phone: "",
        sizeFact: "",
        secretFlag: "",
        workSecretFlag: "",
        secretType: "",
        secretLimitType: "",
        security: "",
        secretLimitName: "",
        secretLimit:"",
        currentUser: "",
        currentNode: "",
        secretGists: "",
        knowScore: "",
        handleSituation: "",
        processInstId: "", //流程实例标识
        pTplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        signState: "",
        attachSort: [],
        attchmentFileInfo: [],
        secretTimeType:"",
      },
      SemergencyLevel: [],
      SqbZihaoList: [],
      SqianbaoType: [],
      SsecretType: [],
      SsecretFlag: [],
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
            trigger: ['change','blur'],
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
        //     trigger: "change",
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
        // // draftDepartmentName: [
        // //   {
        // //     required: true,
        // //     trigger: ["blur", "change"],
        // //     message: "请选择拟稿部门"
        // //   }
        // // ],
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
        //   { required: false, trigger: "blur", message: "请选择秘密标志" }
        // ],
        // secretFlag: [
        //   { required: false, trigger: "blur", message: "请选择秘密标志" }
        // ],
        // secretLimitType: [
        //   {
        //     required: false,
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
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
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
      fwTranHuiId: "A08461303",
      appendWriteDialog: true,
      clickTypes: 1,
      allowBack:"",
      treeTradeCode: "", //完成并发送  树  拆
      
      //归档按钮显示
      pigeonholeFlag:false,
      doGuidangIsFiled:{
        function:"doGuidangIsFiled",
        multiTenancyId:"",
        id:""
      },
      unitId: this.$route.query.unitId
      // mimiShow: false
    };
  },

  mounted() {
    this.interval = setInterval(() => {
      if(localStorage.getItem("notifyState") == 'qianbao') {
        localStorage.setItem("notifyState", '')
        window.location.reload();
      }
    }, 1000)
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    // this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
     
    proxyOfEvent.$on("reloadNowPage",function(){
      window.location.reload();
    })
  },
  methods: {
         //电话操作
    phoneChange(){
      this.fromdata.phone=this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g,'');
      this.$forceUpdate();
    },
    async maintenance(){
      let data={
          id: this.$route.query.id,
          orderType: decodeURIComponent(this.$route.query.orderType),
          title: '中国建设银行实物签报处理单'
        }
        let obj1=await this.$post.postData(
            "getQianbaoById",
            JSON.stringify(Object.assign(data,{function :"getQianbaoById", unitId: this.unitId})),this.$businessCode.qbgl
          ).then(res => {
            return res&&res.data||[];
          })
          .catch(err => {
            console.log(err);
        });
        let obj2=await this.$post.postData(
            "getOpinionSysInfoById",
            JSON.stringify(Object.assign(data,{function :"getOpinionSysInfoById", unitId: this.unitId})),this.$businessCode.qbgl
          ).then(res => {
            return res&&res.data||[];
          })
          .catch(err => {
            console.log(err);
        });

        let obj3=await this.$post.postData(
            "selectSysQianbaoFile",
            JSON.stringify(Object.assign(data,{function :"selectSysQianbaoFile",tplbsnid: 'SWQB',id: this.$route.query.id, unitId: this.unitId})),this.$businessCode.qbgl
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });

        // if(obj1&&obj2){
          const routeData = this.$router.resolve({
              path: "/maintainFilesQb",
              query: {
                id: this.$route.query.id,
                type:'qb',
                sign: 1,
                selectUrl: 'getToQianbaoSwEntityById',
                title:this.directTitle,
                mainPage:true,
                tplbsnid:'SWQB',
                orderType:decodeURIComponent(this.$route.query.orderType),
                curNodeCode:this.fromdata.curNodeCode,
                unitId: this.unitId,
                choseYear:this.$route.query.choseYear
              }
            });
          sessionStorage.setItem("fileObj",JSON.stringify(obj1))
          sessionStorage.setItem("suggessObj",JSON.stringify(obj2))
          sessionStorage.setItem("attachObj",JSON.stringify(obj3))
          window.open(routeData.href, "_blank");
        // }
    },

    //合成格式
    handleHeCgs(){
      console.log('合成格式')
    },




    // 生成文号/退号/生成上年文号 弹窗
    SetDocNoHandle() {
      const [stra, strb] = this.setDocNum.split("-");
      this.doSaveDocumentNumFuc.num = stra;
      this.doSaveDocumentNumFuc.redHead = this.getNumListForm.redHead;
      this.doSaveDocumentNumFuc.year = this.getNumListForm.year;
      this.doSaveDocumentNumFuc.unitId = this.unitId;
      this.$post
        .postData(
          "doSaveDocumentNum",
          JSON.stringify(this.doSaveDocumentNumFuc),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.fromdata.documentNo =
            "〔" +
            this.getNumListForm.year +
            "〕" +
            this.doSaveDocumentNumFuc.num +
            "号";

          this.preserve();
        });
      this.SetDocNoVisible = false;
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
      this.showCompDialog();
      this.bank_selectConfig.unitId = this.unitId;
       this.$post
        .postData(
          "getAllNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.seletOptionsData =
            res.data.filter(item => item.PCSAVYID != 800) || [];
          

          let parms = Object.assign(this.bank_send, this.fromdata);
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
              parms.curTplNo = this.bank_send.curTplNo =
                res.data && res.data[0].PTPLNO;
              parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
                res.data && res.data[0].MULTITENANCYID;
              parms.unitId = this.unitId;
              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(parms),
                  this.$businessCode.qbgl
                )
                .then(res => {
                  if(res&&res.success){
                  this.treeData = res.data;
                  if (res.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  this.treeData = res.data&&res.data.data||[];
                  this.defaultUser =  res.data&&res.data.defaultUser||{};
                }else{
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message:res.message,
                      duration: 2000
                    });
                  }
                  
                  
                })
                .catch(erro => {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message:res.message,
                    duration: 2000
                  });
                });
          // this.$post
          //   .postData(
          //     "selectUserByUnitTree",
          //     JSON.stringify({
          //       function: "selectUserByUnitTree",
          //       st: localStorage.getItem("st"),
          //       flag: true
          //     }),
          //     this.$businessCode.ggqbgl
          //   )
          //   .then(res => {
          //     this.treeData = res.data;
          //     console.log(this.treeData);
          //     if (res.message == "Loading") {
          //       this.loadingTree = true;
          //     } else {
          //       this.loadingTree = false;
          //     }
          //   })
          //   .catch(e => {
          //     console.log(e);
          //   });
        });
        
      // this.$post
      //       .postData(
      //         "getNextNodeInfo",
      //         JSON.stringify(this.bank_selectConfig),
      //         this.$businessCode.qbgl
      //       )
      //       .then(res => {
      //         this.seletOptionsData = res.data || [];
      //         // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
      //         // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
      //         // this.bank_send.curTplNo = res.data && res.data[0].PTPLNO;
      //         // this.bank_send.curMultiTenancyId =
      //         //   res.data && res.data[0].MULTITENANCYID;
      //         let parms = Object.assign(this.bank_send, this.fromdata);
      //         parms.pcsAvyId = this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
      //         parms.curTplNo = this.bank_send.curTplNo =
      //           res.data && res.data[0].PTPLNO;
      //         parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
      //           res.data && res.data[0].MULTITENANCYID;

      //         this.$post
      //           .postData(
      //             "selWfNode",
      //             JSON.stringify(parms),
      //             this.$businessCode.qbgl
      //           )
      //           .then(res => {
      //             this.treeData = res.data;
      //             if (res.message == "Loading") {
      //               this.loadingTree = true;
      //             } else {
      //               this.loadingTree = false;
      //             }
      //             this.treeData = res.data&&res.data.data||[];
      //         this.defaultUser =  res.data&&res.data.defaultUser||{};
      //           })
      //           .catch(e => {
      //             console.log(e);
      //           });
      //       });
      // this.loadingTree = true;
      // this.showCompDialog();
      // this.preserve().then(res => {
      //   if (res) {
          // this.$post
          //   .postData(
          //     "getAllNodeInfo",
          //     JSON.stringify(this.bank_selectConfig),
          //     this.$businessCode.qbgl
          //   )
          //   .then(res => {
          //     this.seletOptionsData = res.data.filter(item=>item.PCSAVYID!=800) || [];
          //     // let parms = Object.assign(this.bank_send, this.fromdata);
          //     // parms.pcsAvyId = this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          //     // parms.curTplNo = this.bank_send.curTplNo =
          //     //   res.data && res.data[0].PTPLNO;
          //     // parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
          //     //   res.data && res.data[0].MULTITENANCYID;
              
          //     this.$post
          //       .postData(
          //         "selectUserByUnitTree",
          //         JSON.stringify({function: "selectUserByUnitTree",st: localStorage.getItem('st'),flag: true}),
          //         this.$businessCode.ggqbgl
          //       )
          //       .then(res => {
          //         this.treeData = res.data;
          //         console.log(this.treeData);
          //         if (res.message == "Loading") {
          //           this.loadingTree = true;
          //           this.dialogState = !this.dialogState;
          //         } else {
          //           this.loadingTree = false;
          //         }
          //       })
          //       .catch(e => {
          //         console.log(e);
          //       });
          //   });
      //   }
      // });
    },
    // 生成文号/退号/生成上年文号
    handleSetDocNo() {
      this.SetDocNoVisible = true;
      var day = new Date();
      var str = day.getFullYear();
      this.getNumListForm.redHead = this.fromdata.qianbaoCode;
      this.getNumListForm.year = str;
      this.getNumListForm.unitId = this.unitId;
      this.$post
        .postData(
          "getNumList",
          JSON.stringify(this.getNumListForm),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.DocNoDataList = res.data;
          this.setDocNum = Object.values(res.data)[0].split(";")[0]+'-0';
          this.$forceUpdate();
        });
    },

    //退号弹窗
    handleClearDocNo() {
      this.handeldoBackNoFuc = true;
    },
    //确定退号
    doBackNoHandle() {
      this.doBackNoFuc.redHead = this.fromdata.qianbaoCode;
      this.doBackNoFuc.year = this.fromdata.documentNo.slice(1, 5);
      this.doBackNoFuc.num = this.fromdata.documentNo.split("〕")[1];
      this.doBackNoFuc.num = this.doBackNoFuc.num.slice(0, -1);
      this.doBackNoFuc.unitId = this.unitId;
      this.$post
        .postData(
          "doBackNo",
          JSON.stringify(this.doBackNoFuc),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "退号成功",
              duration: 500
            });
            this.fromdata.documentNo =
              "〔" + this.doBackNoFuc.year + "〕" + "号";
            this.preserve();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退号失败",
              duration: 1000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "退号失败",
            duration: 1000
          });
        });
      this.handeldoBackNoFuc = false;
    },

    //收回
    sendTackBtn() {
      this.sendTackVisible = true;
    },
    //收回弹窗确定操作
    sendTackHandle() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.handleSituationList;
      delete parseList.handRoundOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      var obj = Object.assign(this.sendTackFuc, parseList);
      obj.function = "doWithdrawTask";
      obj.unitId = this.unitId;
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify(obj),
          this.$businessCode.ggqbgl
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
                window.opener.location.reload();
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

    //办结
    concludematter() {
      this.preserve();
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.handleSituationList;
      delete parseList.handRoundOpinionList;
      delete parseList.signOpinionList;
      delete parseList.remarkList;
      var obj = Object.assign(this.banjiedispatch, parseList);
      obj.function = "doFinish";
      obj.unitId = this.unitId;
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.ggqbgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "办结成功",
              duration: 500,
              onClose: () => {
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
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
            message: "办结失败",
            duration: 1000
          });
        });
    },

    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.bank_deletToSendOrder.unitId = this.unitId;
      this.$post
        .postData(
          "deleteOpinionById",
          JSON.stringify(this.bank_deletToSendOrder),
          this.fwTranId
        )
        .then(res => {
          if (res && res.success) {
            // this.receiveselectlist();
            this.getToQianbaoSwEntityById();
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
            message: "删除失败",
            duration: 1000
          });
        });
    },

       //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },

    //会签部门弹框
    // bankmain() {
    //   this.dialogTit = "选择会签部门";
    //   this.treeData = [];
    //   this.dialogType = "hui";
    //   this.dialogTypeNow = "huiqian";
    //   this.hasRadio = true;
    //   this.canTab = false;
    //   this.singelCheckF = false;
    //   this.showCompDialog();
    //   this.$post
    //     .postData(
    //       "selUnitTreeByHQ",
    //       JSON.stringify(this.bank_mmainXiao),
    //       this.$businessCode.ggqbgl
    //     )
    //     .then(res => {
    //       this.treeData = (res && res.data) || [];
    //     });
    // },

    //会签部门弹框
    bankmain(n, state) {
      let name = "";
      switch (n) {
        case "zhusong":
          name = "主送";
          break;
        case "chao":
          name = "抄送";
          break;
        case "hui":
          name = "会签";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "dosend":
          name = "完成并发送";
          break;
        case "gonggao":
          this.dialogTypeNow = "gonggao";
          name = "公告至";
      }
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogType = n;
       this.loadingTree = false;
      if (n === "hui") {
        this.hasRadio = true;
        this.canTab = false;
        this.singelCheckF = false;
        this.dialogTypeNow = "hui";
      }
      this.addSendType = state;
      this.showCompDialog();
      this.bank_mmainXiao.unitId = this.unitId;
      if (n === "hui") {
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(this.bank_mmainXiao),
            this.$businessCode.ggqbgl
          )
          .then(res => {
            this.treeData = (res && res.data) || [];
          });
      } else {
        this.bank_main.unitId = this.unitId;
        this.$post
          .postData(
            "getTcPriDeliveryDic",
            JSON.stringify(this.bank_main),
            this.$businessCode.fawgl
          )
          .then(res => {
            this.treeData = (res && res.data) || [];
            if (this.treeData.length) {
              this.treeData.forEach(item => {
                item.content = JSON.parse(item.content);
                if (n === "hui") {
                  item.text = item.typeName;
                }
              });
            }
          });
      }
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
    //完成并发送弹窗
    // showCompDialog(data, status, type, params, dtype) {
    //   let that = this;
    //   if (status) {
    //     //确定保存时
    //     let names = [];
    //     let ids = [];
    //     that.checkIds = [];
    //     if (data.length) {
    //       this.checkData = [].concat(data);
    //       data.map(item => {
    //         names.push(item.name || item.text);
    //         ids.push(item.id);
    //         that.checkIds.push(item.id);
    //       });
    //       names = names.join(";");
    //       ids = ids.join(";");
    //     } else {
    //       names = "";
    //       ids = "";
    //       that.checkIds = [];
    //     }

    //     switch (dtype) {
    //       case "huiqian":
    //         this.fromdata.signDepartmentName = names;
    //         this.fromdata.signDepartmentId = ids;
    //         this.huiCheckData = this.checkData;
    //         break;
    //       case "xie":
    //         this.fromdata.assistDeptName = names;
    //         this.fromdata.assistDeptId = ids;
    //         this.xieCheckData = this.checkData;
    //         break;
    //     }
    //     //下一环节处理人信息
    //     if (dtype === "toQianbaoSend") {
    //       this.fromdata.nextNodeId = params.id; //下以环节id
    //       this.fromdata.nextNodeName = params.name; //下一环节名称
    //       this.fromdata.nextUserName = names;
    //       this.fromdata.nextUserId = ids;
    //     }
    //   }

    //   this.dialogState = !this.dialogState;
    //   if (
    //     !this.dialogState &&
    //     dtype == "toQianbaoSend" &&
    //     this.dialogTypeBack
    //   ) {
    //     //关闭弹窗 并确认完成发送
    //     this.saveSending();
    //   }
    //   //关闭弹窗 并确认完成发送
    //   if (this.dialogState) {
    //     this.backDialogData(this.dialogTypeNow);
    //   }
    // },

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
      params.unitId = this.unitId;
      this.$post
        .postData(
          "toQianbaoSwSend",
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
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              }
            });
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
    //点击 完成并发送 弹窗弹出
    async completeSending() {
      let judge = true;
      judge = this.saveCheck();
      if (!judge) {
        return;
      }
      // this.preserve();
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoSend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.bank_selectConfig.unitId = this.unitId;
      this.preserve().then(resSave => {
        if (resSave) {
          this.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.$businessCode.qbgl
            )
            .then(res => {
              this.seletOptionsData = res.data || [];
              // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
              // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
              // this.bank_send.curTplNo = res.data && res.data[0].PTPLNO;
              // this.bank_send.curMultiTenancyId =
              //   res.data && res.data[0].MULTITENANCYID;
              let parms = Object.assign(this.bank_send, this.fromdata);
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
              parms.curTplNo = this.bank_send.curTplNo =
                res.data && res.data[0].PTPLNO;
              parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
                res.data && res.data[0].MULTITENANCYID;
              parms.unitId = this.unitId;
              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(parms),
                  this.$businessCode.qbgl
                )
                .then(res => {
                   if(res&&res.success){
                    this.treeData = res.data;
                    if (res.message == "Loading") {
                      this.loadingTree = true;
                    } else {
                      this.loadingTree = false;
                    }
                    // this.treeData = res.data&&res.data.data||[];
                    // this.defaultUser =  res.data&&res.data.defaultUser||{};
                  }else{
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message:res.message,
                      duration: 2000
                    });
                  }
                })
                .catch(erro => {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message:res.message,
                    duration: 2000
                  });
                });
                //   this.treeData = res.data;
                //   if (res.message == "Loading") {
                //     this.loadingTree = true;
                //   } else {
                //     this.loadingTree = false;
                //   }
                // })
                // .catch(e => {
                //   console.log(e);
                // });
            });
        }
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
     //mimi
    workSecurityTabTime(value) {
      if (value == "secretLimitName") {
        var limt = this.fromdata.secretTimeType == "年" ? 99  : this.fromdata.secretTimeType == "月" ? 11 : this.fromdata.secretTimeType == "日" ? 29 : "";
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
      this.securityFlag = false;
      // 密级和保密期限  解密时间  显示隐藏
      this.businessSecretFlag = false;
      // 密级和保密期限  解密条件  显示隐藏
      this.securitytiaojFlag = false;
      this.nationsecurityFlag = false; //密级和保密期限  保密期限  显示隐藏
      this.nationbusinessSecretFlag = false; //密级和保密期限  解密时间  显示隐藏
      this.nationsecuritytiaojFlag = false; //密级和保密期限  解密条件  显示隐藏
      this.$forceUpdate();
      if (value == "保密期限") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = true;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
        if (this.fromdata.secretType == "商业秘密") {
          // //选择保密期限
          // this.rules.security[0].required = true;
          // this.rules.secretLimitName[0].required = true;
          // this.rules.secretTimeType[0].required = true;
          // // 选择解密时间
          // this.rules.secretLimit[0].required = false;
          this.securityFlag = true;
          // 密级和保密期限  解密时间  显示隐藏
          this.businessSecretFlag = false;
          // 密级和保密期限  解密条件  显示隐藏
          this.securitytiaojFlag = false;
        } else if (this.fromdata.secretType == "国家秘密") {
          this.nationsecurityFlag = true; //密级和保密期限  保密期限  显示隐藏
          this.nationbusinessSecretFlag = false; //密级和保密期限  解密时间  显示隐藏
          this.nationsecuritytiaojFlag = false; //密级和保密期限  解密条件  显示隐藏
        }
        this.$forceUpdate();
      } else if (value == "解密时间") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        // 选择解密时间
        this.rules.secretLimit[0].required = true;
        if (this.fromdata.secretType == "商业秘密") {
          // //选择保密期限
          // this.rules.security[0].required = true;
          // this.rules.secretLimitName[0].required = false;
          // this.rules.secretTimeType[0].required = false;
          // // 选择解密时间
          // this.rules.secretLimit[0].required = true;
          this.securityFlag = false;
          // 密级和保密期限  解密时间  显示隐藏
          this.businessSecretFlag = true;
          // 密级和保密期限  解密条件  显示隐藏
          this.securitytiaojFlag = false;
        } else if (this.fromdata.secretType == "国家秘密") {
          this.nationsecurityFlag = false; //密级和保密期限  保密期限  显示隐藏
          this.nationbusinessSecretFlag = true; //密级和保密期限  解密时间  显示隐藏
          this.nationsecuritytiaojFlag = false; //密级和保密期限  解密条件  显示隐藏
        }
        this.$forceUpdate();
      } else if (value == "解密条件") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
        if (this.fromdata.secretType == "商业秘密") {
          // //选择保密期限
          // this.rules.security[0].required = true;
          // this.rules.secretLimitName[0].required = false;
          // this.rules.secretTimeType[0].required = true;
          // // 选择解密时间
          // this.rules.secretLimit[0].required = false;
          this.securityFlag = false;
          // 密级和保密期限  解密时间  显示隐藏
          this.businessSecretFlag = false;
          // 密级和保密期限  解密条件  显示隐藏
          this.securitytiaojFlag = true;
        } else if (this.fromdata.secretType == "国家秘密") {
          this.nationsecurityFlag = false; //密级和保密期限  保密期限  显示隐藏
          this.nationbusinessSecretFlag = false; //密级和保密期限  解密时间  显示隐藏
          this.nationsecuritytiaojFlag = true; //密级和保密期限  解密条件  显示隐藏
        }
        this.$forceUpdate();
      } else {
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
        this.nationsecurityFlag = false; //密级和保密期限  保密期限  显示隐藏
        this.nationbusinessSecretFlag = false; //密级和保密期限  解密时间  显示隐藏
        this.nationsecuritytiaojFlag = false; //密级和保密期限  解密条件  显示隐藏
        this.$forceUpdate();
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
      this.flag = false;
        this.secretTypeFlag = false;
        this.workSecurityFlag = false;
        this.securityFlag = false;
      // 密级和保密期限  解密时间  显示隐藏
      this.businessSecretFlag = false;
      // 密级和保密期限  解密条件  显示隐藏
      this.securitytiaojFlag = false;
      this.nationsecurityFlag = false; //密级和保密期限  保密期限  显示隐藏
      this.nationbusinessSecretFlag = false; //密级和保密期限  解密时间  显示隐藏
      this.nationsecuritytiaojFlag = false; //密级和保密期限  解密条件  显示隐藏

      //type 回显处理
      if (value == "商业秘密" || value == "国家秘密") {
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

    },

    // 下拉列表
    getTcQbsignParamDicInfo() {
      this.bank_dispachfile.unitId = this.unitId;
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.SsecretType =
            res.data && res.data.secretType && JSON.parse(res.data.secretType);
          this.SsecretFlag = this.secretOptionsFlag =
            res.data && res.data.secretFlag && JSON.parse(res.data.secretFlag);
          this.SbusinessSecret =
            res.data &&
            res.data.businessSecret &&
            JSON.parse(res.data.businessSecret);
          this.SemergencyLevel =
            res.data &&
            res.data.emergencyLevel &&
            JSON.parse(res.data.emergencyLevel);
          this.SqianbaoType =
            res.data &&
            res.data.qianbaoType &&
            JSON.parse(res.data.qianbaoType);
          this.SworkSecurity =
            res.data &&
            res.data.workSecurity &&
            JSON.parse(res.data.workSecurity);
          this.SqbZihaoList =
            res.data &&
            res.data.qbZihaoList &&
            JSON.parse(res.data.qbZihaoList);

          // this.rules = this.copyRules;
          this.$nextTick(() => {
            this.$refs["fromdata"].clearValidate();
          });
        });
    },
    
    //归档
    pigeonhole(func){
      this.doGuidangIsFiled.id = this.fromdata.id;
      this.doGuidangIsFiled.multiTenancyId = this.fromdata.multiTenancyId;
      this.doGuidangIsFiled.unitId = this.unitId;
      this.doGuidangIsFiled.function = func;
      this.$post
        .postData(
          func,
          JSON.stringify(this.doGuidangIsFiled),
          this.$businessCode.qbgl
        )
        .then(res => {
          if(res.success){
          // console.log(res);
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "归档成功",
              duration: 1000
            });
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "归档失败",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "归档失败",
            duration: 1000
          });
        });
    },
    
    //初始值 //input框内容
    getToQianbaoSwEntityById() {
      // if (!sessionStorage.getItem("sentitySignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("sentitySignpageid") || "";
      // }
      this.bank_dispach.unitId = this.unitId;
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "sentitySignpageid"
      );
      this.$post
        .postData(
          "getToQianbaoSwEntityById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.qbgl
        )
        .then(res => {
          // this.fromdata = res.data;
           this.fromdata = Object.assign(this.fromdata,res.data);
           this.nowUserId = this.fromdata.currentUserId;
          //获取签报处理单主标题
          // this.directTitle = res.data && res.data.orgName + "实物签报处理单";
          if(res.data && res.data.isSpecialHead && res.data.isSpecialHead == "1"){
            this.directTitle = this.fromdata.draftDepartmentName + "实物签报处理单";
          }else{
            this.directTitle = res.data && res.data.orgName + "实物签报处理单";
          }


          if(res.data && res.data.curNodeCode == '800'){
            this.pigeonholeFlag = true;
          }else {
            this.pigeonholeFlag = false;
          }

          this.allowBack =res.data &&
            res.data.fieldStatusMap && res.data.fieldStatusMap.allowBack;
          this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
          this.banjiedispatch.tplNo = res.data.pTplNo;
          this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
          this.banjiedispatch.processInstId = res.data.processInstId;
          this.banjiedispatch.curNodeCode = res.data.curNodeCode;
          // this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          // this.bank_selectConfig.curTplNo = res.data.pTplNo;
          // this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;
          // this.bank_selectConfig.tplNo = res.data.tplNo;
          // this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;

          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_selectConfig.curTplNo = res.data.pTplNo;
          this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

          this.createSighWf.processInstId = res.data.processInstId;
          this.createSighWf.id = this.bank_dispach.id;
          this.createSighWf.multiTenancyId = res.data.multiTenancyId;
          this.createSighWf.pcsAvyId = res.data.pcsAvyId;
          this.createSighWf.tplNo = res.data.tplNo;
          this.createSighWf.curNodeCode = res.data.curNodeCode;
          this.createSighWf.sequenceSign = this.saveOrUpdateToQianbaoSwEntity.sequenceSign = this.setradio =
            (res.data.sequenceSign && res.data.sequenceSign.toString()) || "0";


          //mimi
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }

          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }

          // if (this.fromdata.handleTypeName == "1") {
          //   this.fromdata.handleTypeName = "1";
          // } else if (this.fromdata.handleTypeName == "0") {
          //   this.fromdata.handleTypeName = "0";
          // }
            if (this.fromdata.handleType == "1") {
            this.fromdata.handleType = "1";
          } else if (this.fromdata.handleType == "0") {
            this.fromdata.handleType = "0";
          }
          if (!this.fromdata.documentNo) {
            var date = new Date();
            var str = date.getFullYear();
            this.fromdata.documentNo = "〔" + str + "〕 号";
          } else {
            this.fromdata.documentNo = res.data.documentNo;
          }

          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }

        //  if (this.readFlag != 1) {
        //     this.$post
        //       .postData(
        //         "doUpdateReadRecord",
        //         JSON.stringify({
        //           function: "doUpdateReadRecord",
        //           pcsAvyId: res.data.pcsAvyId,
        //           processInstId: res.data.processInstId,
        //           multiTenancyId: res.data.multiTenancyId
        //         }),
        //         this.$businessCode.ggqbgl
        //       )
        //       .then(res => {
        //         window.opener.location.reload();
        //         //更新状态用。暂时不用任何操作
        //       });
        //   }


          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];

          this.createSighWf.deptIds = res.data.signDepartmentId;
          this.createSighWf.deptNames = res.data.signDepartmentName;

          if (res.data.signDepartmentId) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartmentName
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
      //   : sessionStorage.getItem("sentitySignpageid") || "";
      this.bank_dispach.id = getFormId(
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
      var obj = Object.assign(this.saveOrUpdateToQianbaoSwEntity, parseList);
      obj.function = "saveOrUpdateToQianbaoSwEntity";
      obj.unitId = this.unitId;
      await this.$post
        .postData(
          "saveOrUpdateToQianbaoSwEntity",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            // this.saveOrUpdateToQianbaoSwEntity.id = this.bank_dispach.id =
            //   res.data.id;
            // this.bank_toQianbaoSend.id = res.data.id;
            // sessionStorage.setItem("sentitySignpageid", res.data.id);
            this.saveOrUpdateToQianbaoSwEntity.id = this.bank_dispach.id = this.bank_toQianbaoSend.id = getFormId(
              this.$route.query.id,
              "sentitySignpageid",
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
            window.opener.location.reload();
            this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
            this.banjiedispatch.tplNo = res.data.pTplNo;
            this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
            this.banjiedispatch.processInstId = res.data.processInstId;
            this.banjiedispatch.curNodeCode = res.data.curNodeCode;

            this.bank_selectConfig.curNodeId = res.data.curNodeCode;
            this.bank_selectConfig.curTplNo = res.data.pTplNo;
            this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

             this.createSighWf.processInstId = res.data.processInstId;
            this.createSighWf.id = this.bank_dispach.id;
            this.createSighWf.multiTenancyId = res.data.multiTenancyId;
            this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            this.createSighWf.tplNo = res.data.tplNo;
            this.createSighWf.curNodeCode = res.data.curNodeCode;
            this.createSighWf.sequenceSign = res.data.sequenceSign;

            //附件
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
            this.getToQianbaoSwEntityById();
            successState = true;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "保存失败",
              duration: 1000
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
      this.bank_deleteFileById.id = id;
      this.bank_deleteFileById.unitId = this.unitId;
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
    viewFile(file){
      let fileType = ['.doc','.docx','.wps','.xls','.xlsx','ppt'];
      let openPlugin = false;
      let that = this;
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
              fileType.map((item)=>{
                if(res.fileName.toLocaleLowerCase().indexOf(item)>-1){
                  openPlugin = true;
                }
              })
              if(openPlugin){
                this.zhengWenState = 0;
                this.doDraft(res)
              }else{
                window.open(((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName)+'&openFile=true','_blank');
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
    handelclose() {
      // this.$confirm("是否保存并退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.preserve();
      //     window.location.href = "about:blank";
      //     window.close();
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       offset: 100,
      //       showClose: true,
      //       message: "已取消关闭",
      //       duation: 1000
      //     });
      //   });
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
          }else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: '获取文件失败',
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
      if (!getFormId(this.$route.query.id, "sentitySignpageid")) {
        if (state == 1) {
              this.showDraft = true;
            } else {
              let fileInfo = {
                filePath :this.fromdata.filePath,
                fileName : this.fromdata.fileName,
              }
              this.doDraft(fileInfo);
            }
        // this.preserve().then(res => {
        //   if (res) {
        //     if (state == 1) {
        //       this.showDraft = true;
        //     } else {
        //       let fileInfo = {
        //         filePath :this.fromdata.filePath,
        //         fileName : this.fromdata.fileName,
        //       }
        //       this.doDraft(fileInfo);
        //     }
        //   }
        // });
      } else {
        if (state == 1) {
          this.showDraft = true;
        } else {
          this.getFileInfo(that).then(resF => {
            if (resF.state) {
              if (state != "taoHong") {
                    this.doDraft(resF);
                  } else {
                    this.findTemplete(resF);
                  }
              // this.preserve().then(res => {
              //   if (res) {
              //     if (state != "taoHong") {
              //       this.doDraft(resF);
              //     } else {
              //       this.findTemplete(resF);
              //     }
              //   }
              // })
            }
          });
        }
      }
    },
    //正文跳转
    doDraft(fileInfo,saveName) {
      let str = "";
      if(!saveName){
        if(this.fromdata.documentNo){
          str = this.fromdata.qianbaoCode + this.fromdata.documentNo + this.fromdata.title
        }else{
          str = this.fromdata.title
        }
      }else{
        str = saveName;
      }
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
          id: getFormId(this.$route.query.id, "sentitySignpageid"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.qbglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          saveSpecialFileName:str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },

    // 删除此文
    delectArticle() {
      // if (!sessionStorage.getItem("sentitySignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("sentitySignpageid") || "";
      // }
      // this.bank_dispach.id = sessionStorage.getItem("sentitySignpageid") || "";
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "sentitySignpageid"
      );
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      this.deleteToQianbaoSwEntityById.id = deletesendorderid;
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.deleteToQianbaoSwEntityById.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else {
            this.$post
              .postData(
                "deleteToQianbaoSwEntityById",
                JSON.stringify(this.deleteToQianbaoSwEntityById),
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
                      window.opener.location.reload();
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
      let shiwutitle = this.fromdata.qianbaoCode+this.fromdata.documentNo;//字号
      let draftInfo = this.fromdata.filePath?[].concat({fileName:this.fromdata.fileName,filePath:this.fromdata.filePath},this.fromdata.attchmentFileInfo):this.fromdata.attchmentFileInfo;//收藏时下载正文
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "signquteFinishEntityGly",
        this.$businessCode.qbglfj,
        this.fromdata.title,//标题
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
            moduleCode: "QBGL",
            unitId: this.unitId
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
                    flowTranId: this.$businessCode.qbgl, //流程交易线     chai
                    unitId: this.unitId
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
      this.bank_cklc.unitId = this.unitId;
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
      const routeData = this.$router.resolve({
        path: "/qbSwcldPrint",
        query: {
          id: this.bank_dispach.id,
          unitId: this.unitId,
          choseYear:this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
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
          this.fromdata.opinionCheck = this.fromdata.opinionCheck
            ? this.fromdata.opinionCheck + data
            : data;
        } else if (this.clickTypes == 2) {
          this.fromdata.officeOpinion += data;
        } else if (this.clickTypes == 3) {
          this.fromdata.undertakeOrgOpinion += data;
        }
        this.$forceUpdate();
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
      obj.function = "createSighWf";
      obj.unitId = this.unitId;

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
            this.$businessCode.qbgl
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
  },
  created() {
    // if (!this.$route.query.signState) {
    //   this.signState = false;
    // }
    // //判断 待办  已办  办结
    // if (this.$route.query.signState === "1") {
    //   this.signState = false;
    // }
    // if (
    //   this.$route.query.signState === "2" ||
    //   this.$route.query.signState === "3"
    // ) {
    //   this.signState = true;
    // }
    //初始化加载数据
    // this.bank_dispach.id = this.uploadConfig.id = this.$route.query.id ? this.$route.query.id : "";
    // this.bank_toQianbaoSend.id = this.bank_dispach.id;
    // this.receiveselectlist();
    this.bank_dispach.id = this.uploadConfig.id = this.bank_toQianbaoSend.id = getFormId(
      this.$route.query.id,
      "sentitySignpageid"
    );
    //初始化修改交易线 (传后台)
    this.uploadConfig.code = this.$businessCode.qbglfj;
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.historyTuijiejia = this.$route.query.choseYear ? false : true; 
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    this.isNewGdBtn();
    this.getToQianbaoSwEntityById();
    this.getTcQbsignParamDicInfo();
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
    clearInterval(this.interval)
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
  padding: 0 10px;
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

  .fu_jian_style {
    font-size: 14px;
    color: #606266;
    margin: 20px 0 0 130px;
}
.pr45 {
  padding-right: 45px;
}
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>
