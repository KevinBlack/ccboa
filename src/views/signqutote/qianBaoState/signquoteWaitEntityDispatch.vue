<template>
  <!-- 签报实物处理单 -->
  <div id="signquteWaitEntity" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>签报处理单
        </p>
        <div class="grid_comtent">
          <!-- <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="preserve('save')">保存</el-button>
          <el-button size="small" plain @click="concludematter">办结</el-button>
          <el-button size="small" plain @click="completeSending">完成并发送</el-button>
          <el-button size="small" plain @click="sendTackBtn">收回</el-button>
          <el-button size="small" plain @click="handleSetDocNo">生成文号</el-button>
         // <el-button size="small" plain @click="handleClearDocNo">退号</el-button>
         // <el-button size="small" plain @click="drafting('taoHong')">合成格式</el-button>
          <el-button size="small" plain @click="drafting('1')">起草正文</el-button>
          <el-button size="small" plain @click="drafting('2')">处理正文</el-button>
          <el-button size="small" plain @click="drafting('0')">查看正文</el-button>
          <el-button size="small" plain @click="delectArticle">删除此文</el-button>
          <el-button size="small" plain @click="collect">收藏</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>-->
          <!-- 表单控制 -->
          <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true" v-show="readonlyQbcy">关闭</el-button>
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose1" v-show="!readonlyQbcy">关闭</el-button>
          <el-button
            size="small"
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.type)"
            :disabled="createDocNo"
            :key="index"
            v-show="buttonList[index].show"
            plain
          >{{item.name}}</el-button>
        </div>
      </el-col>
    </el-row>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <el-dialog
      v-dialogDrag
      title="提示"
      :visible.sync="msgOSShow"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="30%"
    >
      <span>{{ msgData }}</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="msgOSShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog  v-dialogDrag  title="定密依据" :visible.sync="secretBaslsDialogVisible">
      <el-col>
        <el-radio-group v-model="secretBaslsYJ" class="dingMiStyle">
          <el-radio
            v-for="(item,index) in secretBaslsList"
            :key="index"
            :label="index"
            :value="item.label"
          >
            <div class="secretStyle" v-for="(items,indexs) in item.label" :key="indexs">
              <span>{{items}}</span>
              <input v-if="indexs<item.label.length-1" class="secretInput" :id="index+''+indexs" />
            </div>
          </el-radio>
        </el-radio-group>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="secretBaslsDialogVisible = false">取 消</el-button>
        <el-button size="big" type="primary" @click="savesecretBasls">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 办结确认弹窗 -->
    <el-dialog  v-dialogDrag  title="办结确认" :visible.sync="banjieTcFlag" width="60%">
      <p class="xuanzTh">请确认是否办结?</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureBanjieFun">确 认</el-button>
        <el-button @click="banjieTcFlag = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 起草正文 -->
    <el-dialog  v-dialogDrag 
      :visible.sync="showDraft"
      :modal-append-to-body="false"
      width="600px"
      height="600px"
      title="起草正文"
    >
      <el-row>
        <el-col :span="24" class="mrg-b-20">
          <el-radio v-model="draftFlag" label="localFile">本地打开</el-radio>
        </el-col>
        <el-col :span="24">
          <el-radio v-model="draftFlag" label="newFile">空白文档</el-radio>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDraft = false">取 消</el-button>
        <el-button type="primary" @click="doDraft">确定</el-button>
      </div>
    </el-dialog>

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
      <h3 class="bank_dispach_tit">{{directTitle}}实物签报处理单</h3>
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
                    <el-input
                      v-model="fromdata.title"
                      placeholder="请输入正文标题"
                      :disabled="readFields.title"
                      maxlength="200"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="呈送" prop="submittedName" ref="submittedName">
                    <el-input
                      v-model="fromdata.submittedName"
                      placeholder="请输入呈送人"
                      :disabled="readFields.submittedName"
                      maxlength="200"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleType" ref="handleType">
                    <el-radio
                      v-model="fromdata.handleType"
                      label="0"
                      :disabled="readFields.handleType"
                    >批件</el-radio>
                    <el-radio
                      v-model="fromdata.handleType"
                      label="1"
                      :disabled="readFields.handleType"
                    >阅件</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" prop="emergencyLevel" ref="emergencyLevel">
                    <el-select
                      v-model="fromdata.emergencyLevel"
                      placeholder="请选择"
                      style="width:100%"
                      :disabled="readFields.emergencyLevel"
                    >
                      <el-option value label="请选择"></el-option>
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
                      :disabled="readFields.qianBaoTypeName"
                    >
                      <el-option value label="请选择"></el-option>
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
                      :disabled="readFields.qianbaoCode || fieldStatusMap == '1'"
                      
                    >
                    <!-- @change="qianbaoNum" -->
                      <el-option value label="请选择"></el-option>
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
                    <el-input
                      v-model="fromdata.draftDepartmentName"
                      :disabled="readFields.draftDepartmentName"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系人" prop="draftUserName" ref="draftUserName">
                    <el-input v-model="fromdata.draftUserName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input
                      v-model="fromdata.phone"
                      :disabled="readFields.phone"
                      @input.native="phoneChange"
                      maxlength="200"
                    ></el-input>
                  </el-form-item>
                  <!-- <div
                      :class="['el-form-item is-required el-form-item--small',{'is-error':!fromdata.phone&& phoneCheck}]"
                    >
                      <label for="phone" class="el-form-item__label" style="width: 130px;">联系电话</label>
                      <div class="el-form-item__content" style="margin-left: 130px;">
                        <div data-v-5283a677 class="el-input el-input--small">
                          <input ref="phoneError" @blur="phoneChange" type="text" autocomplete="off" v-model="fromdata.phone" class="el-input__inner" />
                        </div>
                        <div v-if="!fromdata.phone && phoneCheck" :class="{'el-form-item__error':!fromdata.phone}">请输入联系电话</div>
                      </div>
                    </div> -->
                </el-col>
                <!-- mimi -->
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      @change="secretTypechange"
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      style="width:100%"
                      :disabled="readFields.secretType"
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
                      :disabled="readFields.workSecretFlag"
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
                      :disabled="readFields.secretFlag"
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
                      :disabled="readFields.secretLimitType"
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
                <!-- 选择 商业秘密  保密期限 -->
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
                      :disabled="readFields.security"
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
                      :disabled="readFields.secretLimitName"
                        
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
                      :disabled="readFields.secretTimeType"
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
                <!-- 选择 商业秘密  解密时间 -->
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
                      :disabled="readFields.security"
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
                      :disabled="readFields.secretLimit"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- 选择 商业秘密  解密条件 -->
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
                      :disabled="readFields.security"
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
                      :disabled="readFields.secretTimeType"
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
                      :disabled="readFields.security"
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in ScountriesCecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
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
                      :disabled="readFields.secretLimitName"
                        
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
                      :disabled="readFields.secretTimeType"
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
                      :disabled="readFields.security"
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in ScountriesCecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
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
                      :disabled="readFields.secretLimit"
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
                      :disabled="readFields.security"
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="secretFlagTypeitem in ScountriesCecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
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
                      :disabled="readFields.secretTimeType"
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
                  <el-form-item label="知悉范围" prop="knowScore" ref="knowScore">
                    <el-input
                      type="textarea"
                      v-model="fromdata.knowScore"
                      maxlength="500"
                      resize="none"
                      autosize
                      placeholder="填写知悉范围可输入500字"
                      :disabled="readFields.knowScore"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="fromdata.secretType">
                  <el-form-item label="定密依据" prop="secretGists" ref="secretGists">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        v-model="fromdata.secretGists"
                        placeholder="填写定密依据可输入500字"
                        maxlength="500"
                        resize="none"
                        autosize
                        style="flex:1"
                        @input="inputChange"
                        :disabled="readFields.secretGists"
                      ></el-input>
                      <button
                        @click="secretGistsbox"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        :disabled="readFields.secretGists"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="会签部门" prop="signDepartmentName" ref="signDepartmentName">
                    <div style="display:flex;">
                      <el-input
                        placeholder="请选择会签部门"
                        @input="inputChange"
                        v-model="fromdata.signDepartmentName"
                        readonly
                        :disabled="!readonlyQbcy"
                      ></el-input>
                      <button
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        @click="bankmain('hui')"
                        :disabled="readFields.signDepartmentName || !readonlyQbcy"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="附件名称" prop="attachTitle" ref="attachTitle">
                    <el-input
                      maxlength="500"
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.attachTitle"
                      :disabled="readFields.attachTitle"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row  class="pr45">
              <el-col>
                <el-form-item label="批示意见" prop="approvalOpinion" ref="approvalOpinion">
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
                  </div> -->
                  <div  class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="2500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.approvalOpinion"
                      :disabled="editedIdeaFields.approvalOpinion"
                      v-if="!editedIdeaFields.approvalOpinion  || (editedIdeaFields.approvalOpinion && !(fromdata.approvalOpinionList && fromdata.approvalOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=1,fromdata.approvalOpinion&&fromdata.approvalOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.approvalOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  
                  <opinionText 
                    :opinionText="fromdata.approvalOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col v-if="false">
                <el-form-item label="定密责任人意见" prop="secretPersonIdea" ref="secretPersonIdea">
                  <!-- <div v-for="item in fromdata.secretPersonIdeaList" :key="item.id">
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
                  </div> -->
                  <div  class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.secretPersonIdea"
                      :disabled="editedIdeaFields.secretPersonIdea"
                      v-if="!editedIdeaFields.secretPersonIdea  || (editedIdeaFields.secretPersonIdea && !(fromdata.secretPersonIdeaList && fromdata.secretPersonIdeaList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=2,fromdata.secretPersonIdea&&fromdata.secretPersonIdea.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.secretPersonIdea"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText 
                    :opinionText="fromdata.secretPersonIdeaList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核意见" prop="checkOpinion" ref="checkOpinion">
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
                  </div> -->
                  <div  class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.checkOpinion"
                      :disabled="editedIdeaFields.checkOpinion"
                      v-if="!editedIdeaFields.checkOpinion  || (editedIdeaFields.checkOpinion && !(fromdata.checkOpinionList && fromdata.checkOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=3,fromdata.checkOpinion&&fromdata.checkOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.checkOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText 
                    :opinionText="fromdata.checkOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="会签意见" prop="signOpinion" ref="signOpinion">
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
                  </div> -->
                  <div  class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.signOpinion"
                      :disabled="editedIdeaFields.signOpinion"
                      v-if="!editedIdeaFields.signOpinion  || (editedIdeaFields.signOpinion && !(fromdata.signOpinionList && fromdata.signOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=4,fromdata.signOpinion&&fromdata.signOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.signOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText 
                    :opinionText="fromdata.signOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item
                  label="拟稿部门意见"
                  prop="draftDepartmentOpinion"
                  ref="draftDepartmentOpinion"
                >
                  <!-- <div v-for="item in fromdata.draftDepartmentOpinionList" :key="item.id">
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
                  </div> -->
                  <div  class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.draftDepartmentOpinion"
                      :disabled="editedIdeaFields.draftDepartmentOpinion"
                      v-if="!editedIdeaFields.draftDepartmentOpinion  || (editedIdeaFields.draftDepartmentOpinion && !(fromdata.draftDepartmentOpinionList && fromdata.draftDepartmentOpinionList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=5,fromdata.draftDepartmentOpinion&&fromdata.draftDepartmentOpinion.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.draftDepartmentOpinion"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText 
                    :opinionText="fromdata.draftDepartmentOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="办理情况" prop="handleSituation" ref="handleSituation">
                  <!-- <div v-for="item in fromdata.handleSituationList" :key="item.id">
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
                  </div> -->
                  <div  class="fix_height">
                    <el-input
                      type="textarea"
                      maxlength="500"
                      resize="none"
                      autosize
                      style="flex:1"
                      @input="changeDage($event)"
                      v-model="fromdata.handleSituation"
                      :disabled="editedIdeaFields.handleSituation"
                      v-if="!editedIdeaFields.handleSituation  || (editedIdeaFields.handleSituation && !(fromdata.handleSituationList && fromdata.handleSituationList.length))"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=6,fromdata.handleSituation&&fromdata.handleSituation.length)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                      v-if="!editedIdeaFields.handleSituation"
                    >
                      <i class="icon-font el-icon-edit select-chang"></i>
                    </button>
                  </div>
                  <opinionText 
                    :opinionText="fromdata.handleSituationList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="备    注" prop="remark" ref="remark">
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
                  </div> -->
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.remark"
                    :disabled="editedIdeaFields.remark"
                    v-if="!editedIdeaFields.remark  || (editedIdeaFields.remark && !(fromdata.remarkList && fromdata.remarkList.length))"
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
            </el-row>
            <!-- 附件 -->
            <!-- <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  @initsearch="getToQianbaoSwEntityById"
                  :uploadConfig="uploadConfig"
                ></uploadFiles>
                <el-col>
                  <div
                    class="file_list_box"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar style="padding: 0px 15px 0 0;">
                      <div
                        v-for="(item,index) in fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewFile(item)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(item,'up')"
                                v-if="fromdata.attchmentFileInfo.length>1"
                                :disabled="index==0"
                                round
                              >上移</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downRow(item,'down')"
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
            </div> -->
          </el-form>
        </div>
      </div>
    </div>

    <treeCofig
      ref="treeComponent"
      :defaultUser="defaultUser"
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :fixNoLoadingTree="fixNoLoadingTree"
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
      :offenDevices="offenDevices"
      @deleteCommonUse="deleteCommonUse"
      @addCommonUse="addCommonUse"
      @childsaveselect="writelistvalue"
    ></appendWriteList>

     <!--关闭-->
    <el-dialog v-dialogDrag title="关闭" :visible.sync="showCloseDialog">
      <el-row>
        <el-col style="text-aling:center;font-size:16px;line-height:60px;text-indent:2em;">是否保存并退出当前页面?</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('2')">否</el-button>
        <el-button type="primary" @click="handleClose('1')">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFile/uploadSingelFile";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
// import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable"; // 收藏
import opinionText from "@/components/opinionText/index";
import closeMessage from '@/components/closeMessage/index';
import viewDraft from "@/minixs/viewDraft";
import signquoteIndex from "@/minixs/signquoteIndex";
import isNowUser from "@/minixs/isNowUser";

export default {
  name: "App",
  components: {
    uploadFiles,
    timeDialog,
    treeCofig,
    // secretBasls,
    appendWriteList,
    opinionText,
    closeMessage
  },
  mixins: [minixs,viewDraft,signquoteIndex,isNowUser],
  data() {
    return {
      readonlyQbcy:true,
      closeHandler:false,
      showCloseDialog: false,
      nowUserId: "", //当前用户id
      defaultUser:{},//完成并发送默认值
      createDocNo:false,//禁用多次生成文号
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
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      sequenceFlag: false, //会签/协办是否按顺序发送部门置灰
      banjieTcFlag: false, //办结弹窗
      //套红文件
      bank_findTemplete: {
        function: "findTemplete",
        // sendType: "",
        redHead: ""
      },

      // 控制03
      huanJieMessage: {},
      //只读
      readFields: {
        title: false,
        submittedName: false,
        handleType: false,
        emergencyLevel: false,
        qianBaoTypeName: false,
        qianbaoCode: false,
        documentNo: false,
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
        knowScore: false,
        secretGists: false,
        sendBasis: false,
        signDepartmentName: false,
        attachTitle: false
      },
      requiredFields: {
        title: false,
        submittedName: false,
        handleType: false,
        emergencyLevel: false,
        qianBaoTypeName: false,
        qianbaoCode: false,
        documentNo: false,
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
        knowScore: false,
        secretGists: false,
        sendBasis: false,
        signDepartmentName: false,
        attachTitle: false
      }, //必填控制域
      editedIdeaFields: {
        approvalOpinion: true,
        secretPersonIdea: true,
        checkOpinion: true,
        signOpinion: true,
        draftDepartmentOpinion: true,
        handleSituation: true,
        circulation: true,
        remark: true
      }, //可编辑意见域
      requiredIdeaFields: {
        approvalOpinion: false,
        secretPersonIdea: false,
        checkOpinion: false,
        signOpinion: false,
        draftDepartmentOpinion: false,
        handleSituation: false,
        circulation: false,
        remark: false
      }, //必填意见域
      // 【关闭】【保存】【完成并发送】【处理正文】【删除此文】
      // 【办结】【生成文号】【退号】【查看流程】【打印处理单】【收藏】【操作指南】
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "处理正文", type: "btn_clzw", show: false },
        // { name: "查看正文", type: "btn_ckzw", show: false },
        { name: "删除此文", type: "btn_sccw", show: false },
        { name: "办结", type: "btn_banjie", show: false },
        // { name: "收回", type: "btn_sh", show: false },
        { name: "生成文号", type: "btn_scwh", show: false },
        { name: "退号", type: "btn_thao", show: false },
        // { name: "合成格式", type: "btn_hcgs", show: false },
        // { name: "起草正文", type: "btn_qczw", show: false },
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

      // 生成文号/退号/生成上年文号
      doSaveDocumentNumFuc: {
        function: "doSaveDocumentNum",
        redHead: "",
        year: "",
        type: "CN002",
        num: ""
      },
      //生成文号标识
      fieldStatusMap: false,
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
       //上下移动附件
      bank_upDownFile: {
        function: "changeAttachSort",
        fileId: "",
        sortType: ""
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
        function: "selUnitTreeByHQV2",
        flag: true,
        unitCodes:""
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
      fixNoLoadingTree: false,
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
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
        handleType: "0",
        emergencyLevel: "",
        qianBaoTypeName: "",
        qianbaoCode: "",
        documentNo: "",
        draftTime: "",
        draftDepartmentName: "",
        draftUserName: "",
        sendBasis: "",
        signDepartmentName: "",
        attachTitle: "",
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
        secretFlag: "",
        secretLimitType: "",
        security: "",
        secretLimitName: "",
        secretLimit:"",
        currentUser: "",
        currentNode: "",
        secretGists: "",
        knowScore: "",
        processInstId: "", //流程实例标识
        pTplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        signState: "",
        attachSort: [],
        attchmentFileInfo: [],
        secretTimeType:"",
        secretBasls: [], //选中定密依据
        isReturnBefore:0,
      },
      //定密依据
      secretBaslsYJ: "",
      secretBaslsList: [],
      secretBaslsInput: "",
      secretBaslsInput1: "",
      secretBaslsInput2: "", //定密依据输入内容
      //定密依据
      selectSecretType: {
        function: "selectSecretType",
        secretType: ""
      },
      secretBaslsDialogVisible: false, // 定密依据弹窗
      SemergencyLevel: [],
      SqbZihaoList: [],
      SqianbaoType: [],
      SsecretType: [],
      SsecretFlag: [],
      SbusinessSecret: [],
      ScountriesCecret: [],
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
            trigger: ['change','blur'],
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
      copyRules: {},
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

      banjie: "",
      isProcessInstId: "",
      isMultiTenancyId: "",
      //生成文号标识
      // fieldStatusMap: false,
      isSignFinish: false, //判断是否能够继续完成并发送
      qicaozw: false,
      chulizw: false,
      chakanzw: false,
      hechengzw: false,
      tuihaoFlag: false, //退号按钮的显示隐藏
      shengchengFlag: false,
      signStateFlag: false, //会签状态
      banjieFlag: false, // 办结
      treeTradeCode: "", //完成并发送  树  拆
      thatFilter: this,
      //是否返回上一处理人
      handeldoBacksyclr: false,
      returnBeforeHuman: {
        function: "returnBeforeHuman",
        tplbsnid: "SWQB"
      },
      msgOSShow: false,
      msgData: ""
      // phoneCheck:false
    };
  },
  // filters:{
  //   // (fromdata.secretTimeType == '年'? fromdata.secretTimeType<'2' || fromdata.secretTimeType == '月' fromdata.secretTimeType<'3' || '4' )
  //   limitNameCheck(val,self){
  //     console.log(this,val);
  //      console.log(self.fromdata.secretLimitName);
  //     var limt = self.fromdata.secretTimeType == '年'? 99:(self.fromdata.secretTimeType == '月'?11:29);
  //     if(self.fromdata.secretLimitName>limt){
  //       self.$message({
  //         type: "error",
  //         offset: 400,
  //         showClose: true,
  //         message: "超过限制范围，请重新输入",
  //         duration: 2000
  //       });
  //     }else{
  //       console.log(self.fromdata.secretLimitName);

  //       return self.fromdata.secretLimitName;
  //     }
  //   }
  // },
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

    //获取超限原因
    qianbaoNum(value) {
      this.$refs.fromdata.clearValidate();
      if(value||this.fromdata.qianbaoCode){
        this.rules.qianbaoCode[0].required = false;
      }else{
        this.rules.qianbaoCode[0].required = true;
      }
      let a = value;
      for (let j = 0; j < this.SqbZihaoList.length; j++) {
        if (this.SqbZihaoList[j].label == a) {
          // this.wordsLimitInfo.wordsLimit = 
          this.fromdata.sizeLimit =
            this.SqbZihaoList[j].value || 0;
        }
      }
      // this.preserve(null,true)
      this.$forceUpdate();

    },

    // //电话操作
    // phoneChange() {
    //   this.$forceUpdate();
    // },

    //电话操作
    phoneChange() {
      this.fromdata.phone = this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g, "");
      this.$forceUpdate();
    },
    // 附件名称保存
    attachTitleHandel() {
      if (this.fromdata.attachTitle) {
        this.preserve(null,true);
      }
    },

    //合成格式
    // handleHeCgs() {
    //   console.log("合成格式");
    // },

    buttonClick(params) {
      switch (params) {
        //保存
        case "btn_bc":
          this.preserve("save");
          break;
        // 办结
        case "btn_banjie":
          this.concludematter();
          break;
        // 完成并发送
        case "btn_wcbfs":
          // this.completeSending();
          this.completeSendingIsTrue();
          break;
        //收回
        case "btn_sh":
          this.sendTackBtn();
          break;
        //生成文号
        case "btn_scwh":
          this.handleSetDocNo();
          break;
        //退号
        case "btn_thao":
          this.handleClearDocNo();
          break;
        //合成格式   套红
        // case "btn_hcgs":
        //   this.drafting("taoHong");
        //   break;
        // //起草正文
        // case "btn_qczw":
        //   this.drafting("1");
        //   break;
        //处理正文
        case "btn_clzw":
          // this.drafting("2");
          this.drafting("taoHong"); //处理正文直接变为套红样式
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
          // this.shoucang();
          this.collect("qianbao_sw",this.fromdata.id,this.fromdata.multiTenancyId);
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
        if(this.$route.query.readonlyQbcy == "qbcy"){//文件查阅
           this.readFields ={
            title: true,
            submittedName: true,
            handleType: true,
            emergencyLevel: true,
            qianBaoTypeName: true,
            qianbaoCode: true,
            documentNo: true,
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
            knowScore: true,
            secretGists: true,
            sendBasis: true,
            signDepartmentName: true,
            attachTitle: true
          }
          this.editedIdeaFields = {
            approvalOpinion: true,
            secretPersonIdea: true,
            checkOpinion: true,
            signOpinion: true,
            draftDepartmentOpinion: true,
            handleSituation: true,
            circulation: true,
            remark: true
          }
          this.buttonList= [
            { name: "查看正文", type: "btn_ckzw", show: true }, //一直都有        起草正文与查看正文不能同时出现
            { name: "查看流程", type: "btn_cklc", show: true }, //一直都有
            { name: "打印处理单", type: "btn_dycld", show: true }, //一直都有
            { name: "收藏", type: "btn_sc", show: true }, //一直都有
          ]
      }else{
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
          handleType: [
            {
              required: this.requiredFields.handleType,
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
              trigger: "change",
              message: "请选择密级和保密期限"
            }
          ],
          secretLimitName: [
            {
              required: this.requiredFields.secretLimitName,
              trigger: "change",
              message: "请选择"
            }
          ],
          secretTimeType: [
            {
              required: this.requiredFields.secretTimeType,
              trigger: "change",
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
              trigger: ['change','blur'],
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

          attachTitle: [
            {
              required: this.requiredFields.attachTitle,
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
          secretPersonIdea: [
            {
              required: this.requiredIdeaFields.secretPersonIdea,
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
          handleSituation: [
            {
              required: this.requiredIdeaFields.handleSituation,
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

    //生成文号
    SetDocNoHandle() {
      const [stra, strb] = this.setDocNum.split("-");
      this.doSaveDocumentNumFuc.num = stra;
      this.doSaveDocumentNumFuc.redHead = this.getNumListForm.redHead;
      this.doSaveDocumentNumFuc.year = this.getNumListForm.year;
      this.doSaveDocumentNumFuc.type = 'CN002';
      this.$post
        .postData(
          "doSaveDocumentNum",
          JSON.stringify(this.doSaveDocumentNumFuc),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res.success) {
            this.fromdata.documentNo =
              "〔" +
              this.getNumListForm.year +
              "〕" +
              this.doSaveDocumentNumFuc.num +
              "号";
            this.preserve();
          } else {
            this.msgOSShow = true;
            this.msgData = res.message;
          }
        });
      this.SetDocNoVisible = false;
    },
    // 生成文号/退号/生成上年文号
    handleSetDocNo() {
      // var day = new Date();
      // var str = day.getFullYear();
      this.getNumListForm.redHead = this.fromdata.qianbaoCode;
      this.getNumListForm.year = this.docNoYear;
      this.getNumListForm.type = 'CN002'
      this.$post
        .postData(
          "getNumList",
          JSON.stringify(this.getNumListForm),
          this.$businessCode.qbgl
        )
        .then(res => {
          if(res && res.success){
            this.DocNoDataList = res.data;
            this.setDocNum = Object.values(res.data)[0].split(";")[0] + "-0";
            let matchDoc = false;
            for(let val in this.DocNoDataList){
              if(val == "空缺文号"){
                this.SetDocNoVisible = true;
                this.$forceUpdate();
                matchDoc = true;
                break
              }
               
            }
            if(!matchDoc){
              this.SetDocNoHandle()
              this.SetDocNoVisible = false;
            }
            
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "取号失败,请联系管理员。",
              duration: 2000
            });
            this.SetDocNoVisible = false;
          }
          
        })
        .catch(error => {
          this.SetDocNoVisible = false;
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "取号失败,请联系管理员。",
              duration: 2000
            });
        })
    },
    // // 生成文号/退号/生成上年文号 弹窗
    // SetDocNoHandle() {
    //   const [stra, strb] = this.setDocNum.split("-");
    //   this.doSaveDocumentNumFuc.num = stra;
    //   this.doSaveDocumentNumFuc.redHead = this.getNumListForm.redHead;
    //   this.doSaveDocumentNumFuc.year = this.getNumListForm.year;
    //   this.$post
    //     .postData(
    //       "doSaveDocumentNum",
    //       JSON.stringify(this.doSaveDocumentNumFuc),
    //       this.$businessCode.qbgl
    //     )
    //     .then(res => {
    //       this.fromdata.documentNo =
    //         "〔" +
    //         this.getNumListForm.year +
    //         "〕" +
    //         this.doSaveDocumentNumFuc.num +
    //         "号";

    //       this.preserve();
    //     });
    //   this.SetDocNoVisible = false;
    // },
    // // 生成文号/退号/生成上年文号
    // handleSetDocNo() {
    //   this.SetDocNoVisible = true;
    //   var day = new Date();
    //   var str = day.getFullYear();
    //   this.getNumListForm.redHead = this.fromdata.qianbaoCode;
    //   this.getNumListForm.year = str;
    //   this.$post
    //     .postData(
    //       "getNumList",
    //       JSON.stringify(this.getNumListForm),
    //       this.$businessCode.qbgl
    //     )
    //     .then(res => {
    //       this.DocNoDataList = res.data;
    //       this.setDocNum = Object.values(res.data)[0].split(";")[0] + "-0";
    //       this.$forceUpdate();
    //     });
    // },
     //生成文号  新
    // handleSetDocNo(){
    //   var day = new Date();
    //   var str = day.getFullYear();
    //   this.getNumListForm.redHead = this.fromdata.qianbaoCode;
    //   this.getNumListForm.year = str;
    //   this.createDocNo = true;//禁用多次生成文号
    //   this.$post
    //     .postData(
    //       "getNumList",
    //       JSON.stringify(this.getNumListForm),
    //       this.$businessCode.qbgl
    //     )
    //     .then(res => {
    //       if(res && res.success){
    //         this.DocNoDataList = res.data;
          
    //       this.setDocNum = Object.values(res.data)[0];
    //       this.fromdata.documentNo =
    //         "〔" +
    //         this.getNumListForm.year +
    //         "〕" +
    //         this.setDocNum +
    //         "号";
    //       this.preserve();
    //       }else{
    //         this.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "取号失败,请联系管理员。",
    //           duration: 2000
    //         });
    //       }
    //       this.createDocNo = false;
    //     })
    //     .catch(error => {
    //         this.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "取号失败,请联系管理员。",
    //           duration: 2000
    //         });
    //         this.createDocNo = false;
    //     })
    // },


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
      this.doBackNoFuc.id = this.fromdata.id;
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
              duration: 1000
            });
            this.fromdata.documentNo =
              "〔" + this.doBackNoFuc.year + "〕" + "号";
            this.preserve();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退号失败,请联系管理员。",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "退号失败,请联系管理员。",
            duration: 2000
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
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
                this.handleSetLoacl();window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败",
            duration: 2000
          });
        });
      this.sendTackVisible = false;
    },

    //办结
    concludematter() {
      this.banjieTcFlag = true;
    },

    //办结确认弹窗
    sureBanjieFun() {
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
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.ggqbgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "办结成功",
              duration: 1000,
              onClose: () => {
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
                this.handleSetLoacl();window.close();
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "办结失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "办结失败",
            duration: 2000
          });
        });
      this.banjieTcFlag = false;
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
      this.sequenceFlag = false; //会签/协办是否按顺序发送部门置灰
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
      this.fixNoLoadingTree = true;
      if (n === "hui") {
        this.hasRadio = true;
        this.canTab = false;
        this.singelCheckF = false;
        this.dialogTypeNow = "hui";
      }
      this.addSendType = state;
      this.showCompDialog();
      if (n === "hui") {
        // this.$post
        //   .postData(
        //     "selUnitTreeByHQ",
        //     JSON.stringify(this.bank_mmainXiao),
        //     this.$businessCode.ggqbgl
        //   )
        //   .then(res => {
        //     this.treeData = (res && res.data) || [];
        //   });

        this.bank_mmainXiao.unitCodes = this.fromdata.draftDepartmentId;
        this.$post
          .postData(
            "selUnitTreeByHQV2",
            JSON.stringify(this.bank_mmainXiao),
            this.$businessCode.ggqbgl
          )
          .then(res => {
             if (res.message == "Loading") {
                this.loadingTree = true;
              } else {
                this.loadingTree = false;
              }
            this.treeData = (res && res.data) || [];
           
          });
          
      } else {
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
    doBacksyclrHandle() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.approvalOpinionList;
      delete parseList.checkOpinionList;
      delete parseList.draftDepartmentOpinionList;
      delete parseList.signOpinionList;
      delete parseList.circulationList;
      delete parseList.remarkList;
      delete parseList.handleSituationList;
      var obj = Object.assign(this.returnBeforeHuman, parseList);
      obj.function = "returnBeforeHuman";
      this.$post
        .postData(
          "returnBeforeHuman",
          JSON.stringify(this.returnBeforeHuman),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$refs.treeComponent.saveSetDialog();//返回上一处理人微信消息提醒
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

        switch (type) {
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
            if (dtype != "zengfa") {
              this.preserve();
              // this.showHQ =true;
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
    // //定密依据弹窗数值
    // secretGistsbox() {
    //   this.secretBaslsDialogVisible = true;
    //   this.selectSecretType.secretType = this.fromdata.secretType;
    //   this.$post
    //     .postData(
    //       "selectSecretType",
    //       JSON.stringify(this.selectSecretType),
    //       this.$businessCode.qbgl
    //     )
    //     .then(res => {
    //       this.secretBaslsList = res.data || [];
    //       this.secretBaslsList = this.secretBaslsList.map((item, n) => {
    //         var obj = {
    //           label: item.label.split("(xx)")
    //         };
    //         obj.label.map((node, m) => {
    //           obj.subkey = n + "" + m;
    //         });
    //         obj.subval = "";
    //         return obj;
    //       });
    //       this.$forceUpdate();
    //     });
    // },
    // //定密依据输入框值获取  并且确定
    // savesecretBasls() {
    //   var str = "";
    //   var pstr = true;

    //   //填值
    //   if (this.secretBaslsYJ !== "") {
    //     this.secretBaslsList.map((item, n) => {
    //       if (n == this.secretBaslsYJ) {
    //         console.log(item.label);
    //         item.label.map((node, m) => {
    //           if (m < item.label.length - 1) {
    //             str += node + $("#" + n + m).val();
    //             if (!$("#" + n + m).val()) {
    //               pstr = false;
    //               return;
    //             }
    //             console.log(str);
    //           } else {
    //             str += node;
    //           }
    //         });
    //       }
    //     });
    //   }

    //   if (!pstr && this.secretBaslsYJ !== "") {
    //     this.$message({
    //       type: "error",
    //       offset: 400,
    //       showClose: true,
    //       message: "请选择或输入该选项的定密依据内容",
    //       duration: 2000
    //     });
    //     return;
    //   }
    //   this.secretBaslsDialogVisible = false;
    //   this.fromdata.secretGists = str;
    //   this.preserve();
    // },
    //定密依据input框值获取
    inputChange1() {
      this.preserve(null,true);
      this.$forceUpdate();
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
          // this.checkIds = this.fromdata.signDepartmentId
          //   ? this.fromdata.signDepartmentId.split(";")
          //   : [];
          // this.checkData = this.huiCheckData;
          // if (this.addSendType == 1) {
          //   this.checkData.map(item => {
          //     //选中的不可操作
          //     item.disabled = true;
          //   });
          // }
          this.dialogTypeNow = "zengfa";
          this.checkIds = this.fromdata.signDepartmentId
            ? this.fromdata.signDepartmentId.split(";")
            : [];
          this.checkData = this.huiCheckData;
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
      params.function = "toQianbaoSwSend"
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
              message: "后端返回失败，请联系管理员",
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
    completeSendingIsTrue(){
      // let isTrue = JSON.parse(localStorage.getItem("tcHumanRole")).filter((item)=>{
      //   return item.codeType == 'human_speAuth'
      // })
      // if(isTrue.length > 0 && this.fromdata.isReturnBefore == 1){
      //    this.$confirm("是否返回给：上一处理人?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.doBacksyclrHandle();
      //   }).catch(() => {
      //     this.completeSending();
      //   });
      // }else{
      //   this.completeSending();
      // }
      this.$post
            .postData(
              "isReturnState",
              JSON.stringify({
                  function: "isReturnState",
                  processInstId:this.fromdata.processInstId
                }),
              this.$businessCode.ggqbgl
            )
            .then(res => {
              if (res&&res.success) {
                // isReturnState     "0"无 或 "1"有
                if(res.data.isReturnState == "1"){
                  this.$confirm("是否返回给：上一处理人?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  })
                  .then(() => {
                    this.doBacksyclrHandle();
                  }).catch(() => {
                    this.completeSending();
                  });
                }else{
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
      this.preserve().then(resSave => {
        console.log("3+"+resSave);
        
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
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
              parms.curTplNo = this.bank_send.curTplNo =
                res.data && res.data[0].PTPLNO;
              parms.curMultiTenancyId = this.bank_send.curMultiTenancyId =
                res.data && res.data[0].MULTITENANCYID;

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
            });
        }
      });
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
      this.fromdata.secretLimitName = this.fromdata.secretLimitName.replace(/[^\d\*\ ]/g,'')
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
        if(this.fromdata.secretLimitName == 0){
          this.fromdata.secretLimitName = ''
        }
      }
      // this.preserve(null,true)
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
        this.fromdata.secretTimeType = '';//置空年月日、时间
        this.fromdata.secretLimitName = '';
      }

      //mimi
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
      // this.phoneCheck = true;
      // if(!this.fromdata.phone){
      //   this.$refs.phoneError.scrollIntoView({
      //     block: "center",
      //    behavior: "smooth"
      //   });
      //   return;
      // }
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

    // 下拉列表
    getTcQbsignParamDicInfo() {
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.SsecretType =
            res.data &&
            res.data.qianbaoTypeSW &&
            JSON.parse(res.data.qianbaoTypeSW);
          this.SsecretFlag = this.secretOptionsFlag =
            res.data && res.data.secretFlag && JSON.parse(res.data.secretFlag);
          this.SbusinessSecret =
            res.data &&
            res.data.businessSecret &&
            JSON.parse(res.data.businessSecret);
          this.ScountriesCecret =
            res.data &&
            res.data.countriesCecret &&
            JSON.parse(res.data.countriesCecret);
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
          this.SsecretLimit =
            res.data &&
            res.data.secretLimit &&
            JSON.parse(res.data.secretLimit);

          if (this.SqbZihaoList && this.SqbZihaoList.length < 2) {
            this.fromdata.qianbaoCode = this.SqbZihaoList[0].label;
            this.fromdata.sizeLimit = this.SqbZihaoList[0].value;
          }

          this.morenqianbao = res.data && res.data.firstQbZihao && JSON.parse(res.data.firstQbZihao) && JSON.parse(res.data.firstQbZihao)[0].label || '';
          
          if(this.fromdata.qianbaoCode){
            this.fromdata.qianbaoCode= this.fromdata.qianbaoCode;
          }else if(!this.fromdata.qianbaoCode && this.morenqianbao){
            this.fromdata.qianbaoCode= this.morenqianbao;
          }else if(!this.fromdata.qianbaoCode && !this.morenqianbao){
             this.fromdata.qianbaoCode=""
          }else if(this.fromdata.qianbaoCode && this.morenqianbao){
             this.fromdata.qianbaoCode=this.fromdata.qianbaoCode
          }
          this.$forceUpdate();


          // if (this.SqbZihaoList && this.SqbZihaoList.length < 2) {
          //   this.fromdata.qianbaoCode = this.SqbZihaoList[0].label;
          //   this.fromdata.sizeLimit = this.SqbZihaoList[0].value;
          // }
          // this.rules = this.copyRules;
          this.$nextTick(() => {
            this.$refs["fromdata"].clearValidate();
          });
        });
    },

    //初始值 //input框内容
    getToQianbaoSwEntityById(oneTip,loadingFlag) {
      // if (!sessionStorage.getItem("sentitySignpageid")) {
      //   this.bank_dispach.id = this.$route.query.id;
      // } else {
      //   this.bank_dispach.id = sessionStorage.getItem("sentitySignpageid") || "";
      // }
      let taoHongConfig = {};
      let taoSecret = "";
      if (this.bank_dispach.id=="") {
        this.bank_dispach.id = getFormId(
          this.$route.query.id,
          "sentitySignpageid"
        );
      }
      // this.bank_dispach.id = getFormId(
      //   this.$route.query.id,
      //   "sentitySignpageid"
      // );
      this.bank_dispach.moduleType = this.$route.query.moduleType;
      this.$post
        .postData(
          "getToQianbaoSwEntityById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.qbgl,null,loadingFlag
        )
        .then(res => {
          this.getIsNowUser(res,'fcy','db')
          this.fromdata = Object.assign(this.fromdata,res.data);
          this.nowUserId = this.fromdata.currentUserId;
          //获取签报处理单主标题
          // this.directTitle = res.data && res.data.orgName;
          if(res.data && res.data.isSpecialHead && res.data.isSpecialHead == "1"){
            this.directTitle = this.fromdata.draftDepartmentName;
          }else{
            this.directTitle = res.data && res.data.orgName;
          }
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
          this.createSighWf.sequenceSign = this.saveOrUpdateToQianbaoSwEntity.sequenceSign = this.setradio =
            (res.data.sequenceSign && res.data.sequenceSign.toString()) || "0";

            this.doSaveDocumentNumFuc.type =  res.data.multiTenancyId;
            this.getNumListForm.type =  res.data.multiTenancyId;
            this.doBackNoFuc.type =  res.data.multiTenancyId;

          if (this.fromdata.handleType == "1") {
            this.fromdata.handleType = "1";
          } else if (this.fromdata.handleType == "0") {
            this.fromdata.handleType = "0";
          }
          this.docNoYear = this.fromdata.createTime.slice(0,4);
          if (!this.fromdata.documentNo) {
            // var date = new Date();
            // var str = date.getFullYear();
            this.fromdata.documentNo = "〔" + this.docNoYear + "〕号";
          } else {
            this.fromdata.documentNo = res.data.documentNo;
          }

          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }

          //mimi
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }

          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }
          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
         
          this.fromdata.attachSort = [];

          this.createSighWf.deptIds = res.data.signDepartmentId;
          this.createSighWf.deptNames = res.data.signDepartmentName;

          //秘密期限类型 -> 密级和保密期限
          if(res.data.secretType == "商业秘密" || res.data.secretType == "国家秘密"){
            let starFlag = res.data.secretType == "商业秘密"?"☆":"★";
            if(this.fromdata.secretLimitType!='保密期限'){
              let contInfo = ""
              if(this.fromdata.secretLimitType=='解密条件'){
                contInfo = this.fromdata.secretTimeType
              }else{
                contInfo = this.fromdata.secretLimit
              }
              taoSecret = this.fromdata.security + starFlag + contInfo;
            }else{
              taoSecret = this.fromdata.security + starFlag +this.fromdata.secretLimitName+this.fromdata.secretTimeType;
            }
          }else if(res.data.secretType == "工作秘密"){
            taoSecret = this.fromdata.workSecretFlag;
          }else{
            taoSecret = this.fromdata.secretFlag
          }
          if (res.data.id) {
             taoHongConfig = {
              id: res.data.id,
              密级和保密期限: taoSecret || "",
              成文日期: res.data.draftTime || "",
              呈送: res.data.submittedName || "",
              拟稿部门: res.data.draftDepartmentName|| "",
              文号: res.data.qianbaoCode + this.fromdata.documentNo || "",
              标题: res.data.title || "",
              紧急程度: res.data.emergencyLevel || "",
            };
            if(res.data.attachTitle){
              taoHongConfig['附件标题'] = "附件：" + res.data.attachTitle;//附件标题
            }else{
              taoHongConfig['无附件标题'] = '';
            }
            this.$store.dispatch("setSignquoteInfo", taoHongConfig);
          }
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

          if (!(res.data && res.data.phone)) {
            let tcHumanRole = JSON.parse(localStorage.getItem("userInfo"));
            this.fromdata.phone = tcHumanRole.telMobile || "";
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
                this.$businessCode.ggqbgl,null,loadingFlag
              )
              .then(res => {
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
                //更新状态用。暂时不用任何操作
              });
          }

          //表单控制请求参数
          this.isProcessInstId = res.data.processInstId;
          this.isMultiTenancyId = res.data.multiTenancyId;

          //判断是否能够继续完成并发送
          this.isSignFinish =
            res.data.fieldStatusMap && res.data.fieldStatusMap.isSignFinish;

          //判断是否合成格式 生成文号 退号按钮进行隐藏
          this.fieldStatusMap =
            res.data.fieldStatusMap && res.data.fieldStatusMap.isDocumentNo;

          if (this.qicaozw == true) {
            // this.chakanzw = false;
            this.chulizw = false;
          }
          if (this.chulizw == true) {
            // this.chakanzw = false;
            this.qicaozw = false;
          }
          // if (this.chakanzw == true) {
          //   this.chulizw = false;
          //   this.qicaozw = false;
          // }

          //起草正文  处理正文  查看正文  合成格式
          if (!this.fromdata.filePath && !this.fromdata.fileName) {
            //判断起草正文   无起草正文  显示起草正文
            this.qicaozw = true;
            this.chulizw = false;
            // this.chakanzw = false;
            // this.hechengzw = false;
          }
          if (this.fromdata.filePath && this.fromdata.fileName) {
            //有起草正文  起草正文隐藏
            this.qicaozw = false;
            this.chulizw = true;
            // this.chakanzw = false;
            // this.hechengzw = false;
          }
          if (
            res.data.fieldStatusMap &&
            res.data.fieldStatusMap.isDocumentNo == "1" //==1  退号显示    合成格式显示   处理正文显示   生成文号隐藏
            // ==0 生成文号显示     退号隐藏    合成格式隐藏  处理正文隐藏
          ) {
            this.tuihaoFlag = true;
            this.shengchengFlag = false;
            this.banjieFlag = true;
            // this.hechengzw = true;
            // this.chulizw = true;
            // this.chakanzw = true;
          } else {
            this.shengchengFlag = true;
            this.banjieFlag = false;
            this.tuihaoFlag = false;
            // this.hechengzw = false;
            // this.chulizw = true;
            // this.chakanzw = false;
          }

          // 判断是否办结 ==800
          // this.banjie

          this.biaoDKz(loadingFlag);
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 2000
          });
        });
    },

    //表单控制
    biaoDKz(loadingFlag) {
      if (this.isProcessInstId) {
        this.$post
          .postData(
            "getNextUserTaskNode",
            JSON.stringify({
              function: "getNextUserTaskNode",
              processInstId: this.isProcessInstId
            }),
            this.$businessCode.ggqbgl,null,loadingFlag
          )
          .then(res => {
            this.huanJieMessage = res.data.extAttributes;
            this.setConfig();
            this.setFormConfig();
            setTimeout(() => {
              this.$refs.fromdata.clearValidate();
            });
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
              multiTenancyId: this.isMultiTenancyId
            }),
            this.$businessCode.ggqbgl,null,loadingFlag
          )
          .then(res => {
            this.huanJieMessage = res.data;
            this.setConfig();
            this.setFormConfig();
            setTimeout(() => {
              this.$refs.fromdata.clearValidate();
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 保存
    async preserve(type,loadingFlag) {
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
      await this.$post
        .postData(
          "saveOrUpdateToQianbaoSwEntity",
          JSON.stringify(obj),
          this.$businessCode.qbgl,null,loadingFlag
        )
        .then(res => {
          if (res && res.success) {
            this.fromdata.processInstId = res.data.processInstId;
            // this.saveOrUpdateToQianbaoSwEntity.id = this.bank_dispach.id =
            //   res.data.id;
            // this.bank_toQianbaoSend.id = res.data.id;
            // sessionStorage.setItem("sentitySignpageid", res.data.id);
            this.saveOrUpdateToQianbaoSwEntity.id = this.bank_dispach.id = this.bank_toQianbaoSend.id = getFormId(
              this.$route.query.id,
              "sentitySignpageid",
              res.data.id
            );
            console.log("1+saveOrUpdateToQianbaoSwEntity"+this.saveOrUpdateToQianbaoSwEntity.id+this.bank_dispach.id+this.bank_toQianbaoSend.id);
            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            console.log(window.opener);
            //8月版本代码注释
            window.opener&&window.opener.location.reload();
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
            
            this.doSaveDocumentNumFuc.type =  res.data.multiTenancyId;
            this.getNumListForm.type =  res.data.multiTenancyId;
            this.doBackNoFuc.type =  res.data.multiTenancyId;

            //附件
            if (type&&type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
            console.log("1+走到上面了！");
            
            this.getToQianbaoSwEntityById(null,loadingFlag);
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
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "保存失败",
          //   duration: 2000
          // });
          console.log(erro)
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
    downRow(item, type) {
      this.bank_upDownFile.fileId = item.id;
      this.bank_upDownFile.sortType = type;
      this.$post
        .postData(
          "changeAttachSort",
          JSON.stringify(this.bank_upDownFile),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.getToQianbaoSwEntityById();
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "改变顺序失败,请联系管理员",
                duration: 1500
              });
            }
          }
        });
    },
    // downRow(n) {
    //   let midObj;
    //   this.fromdata.attachSort.push(
    //     {
    //       id: this.fromdata.attchmentFileInfo[n + 1].id,
    //       sort: this.fromdata.attchmentFileInfo[n].sort
    //     },
    //     {
    //       id: this.fromdata.attchmentFileInfo[n].id,
    //       sort: this.fromdata.attchmentFileInfo[n + 1].sort
    //     }
    //   );
    //   midObj = this.fromdata.attchmentFileInfo[n];
    //   this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[
    //     n + 1
    //   ];
    //   this.fromdata.attchmentFileInfo[n + 1] = midObj;
    //   this.$forceUpdate();
    // },
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
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "删除成功",
                  duration: 1000
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

    // 预览
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
                duration: 2000
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
    async btnCloseHandler(val){
      if(val == 1){
        this.handleSetLoacl();window.close();
      }else if(val == 2){
        await this.preserve();
        window.location.href = "about:blank";
        if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
        this.handleSetLoacl();window.close();
      }else{
        this.closeHandler = false
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
      if(val=='1') {
        this.preserve().then(save => {
          if(save) {
            // window.location.href = "about:blank";
            this.handleSetLoacl();window.close();
          }
        });
      } else if(val=='2') {
        // window.location.href = "about:blank";
        this.handleSetLoacl();window.close();
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

    //套红操作
    async findTemplete(file) {
      let fileInfoTh = {
        state: false,
        templateUrl: "", //套红路径
        fileName: (file && file.fileName) || "",
        filePath: (file && file.filePath) || ""
      };
      // this.bank_findTemplete.sendType = this.fromdata.type;
      this.bank_findTemplete.redHead = this.fromdata.qianbaoCode;
      this.bank_findTemplete.demesticFlag = !getMachineType();//true为linux
      this.bank_findTemplete.id = getFormId(
        this.$route.query.id,
        "sentitySignpageid"
      );
      await this.$post
        .postData(
          "findTemplete",
          JSON.stringify(this.bank_findTemplete),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            if (res.data) {
              fileInfoTh.templateUrl = res.data;
            }
            fileInfoTh.state = true;
            this.getFileInfo(this, fileInfoTh).then(template => {
              if (template.state) {
                this.doDraft(template);
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "请先上传模板",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请先上传模板",
            duration: 2000
          });
        });
    },
    //请求文件路径
    async getFileInfo(self, thInfo) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = thInfo
        ? thInfo.templateUrl.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo
        ? thInfo.templateUrl.filePath
        : self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.qbglfj
        )
        .then(res => {
          if (res && res.success) {
            if (thInfo) {
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            } else {
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "获取模板失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取模板失败",
            duration: 2000
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    // 起草正文
    drafting(state) {
      // 处理正文判断是否选择签报字号  进行套红
      if (state == "taoHong" && (!this.fromdata.qianbaoCode  || this.fromdata.qianbaoCode == "请选择")) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请先选择签报字号",
          duation: 2000
        });
        return;
      }

      // if (localStorage.getItem("sentitySignpageidPage") && state == 2) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "正文已经打开，请先保存并关闭",
      //     duation: 2000
      //   });
      //   return;
      // }

      let that = this;

      this.zhengWenState = state;
      if (!getFormId(this.$route.query.id, "sentitySignpageid")) {
        this.preserve().then(res => {
          if (res) {
            if (state == 1) {
              this.showDraft = true;
            } else {
              let fileInfo = {
                filePath: this.fromdata.filePath,
                fileName: this.fromdata.fileName
              };
              this.findTemplete(fileInfo);
            }
          }
        });
      } else {
        if (state == 1) {
           this.preserve().then(save => {
            if (save) {
              this.showDraft = true;
            }
          })
        } else {
          if (state != "taoHong") {
            this.doDraft(res);
          } else {
            this.preserve().then(res => {
              if (res) {
                this.findTemplete();
              }
            });
          }
          //   this.getFileInfo(that).then(resF => {
          //   if (resF.state) {
          //     this.preserve().then(res => {
          //       if (res) {
          //         if (state != "taoHong") {
          //           this.doDraft(resF);
          //         } else {
          //           this.findTemplete(resF);
          //         }
          //       }
          //     })
          //   }
          // });
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
          state: "newFile",
          id: getFormId(this.$route.query.id, "sentitySignpageid"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.qbglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          tmpFileName: fileInfo ? fileInfo.fileNameTh : "",
          tmpFilePath: fileInfo ? fileInfo.filePathTh : "",
          pageFlag: "sentitySignpageidPage",
          taoHongFlag: true,
          stepsNowName: this.fromdata.curNodeName,
          flowTranId: this.$businessCode.qbgl, //流程交易线    chai
          processInstId:this.fromdata.processInstId, 
          saveSpecialFileName:str,
          noNeedColsepage:this.zhengWenState == 0 ? 1 : 0,
        }
      });

      if (this.zhengWenState == 2) {
        localStorage.setItem("sentitySignpageidPage", "true");
      }
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
      if (this.fieldStatusMap == "1") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已生成文号，无法删除",
          duration: 2000
        });
        return;
      }

      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.deleteToQianbaoSwEntityById.id) {
            window.location.href = "about:blank";
            if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
            this.handleSetLoacl();window.close();
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
                    duration: 1000,
                    onClose: () => {
                      window.location.href = "about:blank";
                      if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
                      this.handleSetLoacl();window.close();
                    }
                  });
                } else {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "删除失败",
                    duration: 2000
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
            duation: 2000
          });
        });
    },

    // 收藏
    shoucang() {
      let that = this;
      let shiwutitle = this.fromdata.qianbaoCode + this.fromdata.documentNo; //字号
      let draftInfo = this.fromdata.filePath
        ? [].concat(
            {
              fileName: this.fromdata.fileName,
              filePath: this.fromdata.filePath
            },
            this.fromdata.attchmentFileInfo
          )
        : this.fromdata.attchmentFileInfo; //收藏时下载正文
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "signquteWaitEntity",
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
                    flowTranId: this.$businessCode.qbgl, //流程交易线     chai
                    noNeedColsepage:1,
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
        if(save) {
          const routeData = this.$router.resolve({
              path: "/qbSwcldPrint",
              query: {
                id: this.bank_dispach.id,
                choseYear:this.$route.query.choseYear
              }
            });
          window.open(routeData.href, "_blank");
        }
      })
      // this.bank_dispach.id = getFormId(
      //   this.$route.query.id,
      //   "sentitySignpageid"
      // );
      // let parseList = JSON.parse(JSON.stringify(this.fromdata));
      // delete parseList.approvalOpinionList;
      // delete parseList.checkOpinionList;
      // delete parseList.draftDepartmentOpinionList;
      // delete parseList.handleSituationList;
      // delete parseList.handRoundOpinionList;
      // delete parseList.signOpinionList;
      // delete parseList.remarkList;
      // var obj = Object.assign(this.saveOrUpdateToQianbaoSwEntity, parseList);
      // this.$post
      //   .postData(
      //     "saveOrUpdateToQianbaoSwEntity",
      //     JSON.stringify(obj),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     if (res && res.success) {
      //       const routeData = this.$router.resolve({
      //         path: "/qbSwcldPrint",
      //         query: {
      //           id: this.bank_dispach.id
      //         }
      //       });
      //       window.open(routeData.href, "_blank");
      //     } else {
      //       this.$message({
      //         type: "error",
      //         offset: 400,
      //         showClose: true,
      //         message: "保存失败",
      //         duration: 2000
      //       });
      //     }
      //   })
      //   .catch(erro => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "保存失败",
      //       duration: 2000
      //     });
      //   });
    },

    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 批示意见
          this.fromdata.approvalOpinion = this.fromdata.approvalOpinion
            ? this.fromdata.approvalOpinion + data
            : data;
            if(this.fromdata.approvalOpinion && this.fromdata.approvalOpinion.length>=500){
              this.fromdata.approvalOpinion = this.fromdata.approvalOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 2) {
          // 定密责任人意见
          this.fromdata.secretPersonIdea = this.fromdata.secretPersonIdea
            ? this.fromdata.secretPersonIdea + data
            : data;
            if(this.fromdata.secretPersonIdea && this.fromdata.secretPersonIdea.length>=500){
              this.fromdata.secretPersonIdea = this.fromdata.secretPersonIdea.substr(0,500)
            }
        } else if (this.clickTypes == 3) {
          // 审核意见
          this.fromdata.checkOpinion = this.fromdata.checkOpinion
            ? this.fromdata.checkOpinion + data
            : data;
            if(this.fromdata.checkOpinion && this.fromdata.checkOpinion.length>=500){
              this.fromdata.checkOpinion = this.fromdata.checkOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 4) {
          // 会签意见
          this.fromdata.signOpinion = this.fromdata.signOpinion
            ? this.fromdata.signOpinion + data
            : data;
            if(this.fromdata.signOpinion && this.fromdata.signOpinion.length>=500){
              this.fromdata.signOpinion = this.fromdata.signOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 5) {
          // 拟稿部门意见
          this.fromdata.draftDepartmentOpinion = this.fromdata
            .draftDepartmentOpinion
            ? this.fromdata.draftDepartmentOpinion + data
            : data;
            if(this.fromdata.draftDepartmentOpinion && this.fromdata.draftDepartmentOpinion.length>=500){
              this.fromdata.draftDepartmentOpinion = this.fromdata.draftDepartmentOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 6) {
          // 办理情况
          this.fromdata.handleSituation = this.fromdata.handleSituation
            ? this.fromdata.handleSituation + data
            : data;
            if(this.fromdata.handleSituation && this.fromdata.handleSituation.length>=500){
              this.fromdata.handleSituation = this.fromdata.handleSituation.substr(0,500)
            }
        } else if (this.clickTypes == 7) {
          // 备    注
          this.fromdata.remark = this.fromdata.remark
            ? this.fromdata.remark + data
            : data;
            if(this.fromdata.remark && this.fromdata.remark.length>=500){
              this.fromdata.remark = this.fromdata.remark.substr(0,500)
            }
        }
        this.$forceUpdate();
      }
    },
    changeDage(e) {
      this.$forceUpdate();
    },
    //常用批语弹窗弹出
    writelistbox(arr,num) {
      if(num>=500){
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
            this.getToQianbaoSwEntityById();
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
      delete parseList.handleSituationList;
      // this.createSighWf.avyds = "发送会签部门:" + this.createSighWf.deptNames;
      if (newNames) {
        this.createSighWf.avyds = "发送会签部门:" + newNames;
      } else {
        this.createSighWf.avyds = "发送会签部门:" + this.createSighWf.deptNames;
      }
      var obj = Object.assign(this.createSighWf, parseList);
      obj.function = "createSighWf";

      if (!this.createSighWf.deptIds) {
        obj.deptIds = "";
        obj.deptNames = "";
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择会签部门",
          duration: 2000
        });
        return;
      }
      if (newNames) {
        obj.deptIds = newIds;
        obj.deptNames = newNames;
      } else {
        obj.deptIds = this.fromdata.signDepartmentId;
        obj.deptNames = this.fromdata.signDepartmentName;
      }
      if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
        this.$post
          .postData(
            "createSighWf",
            JSON.stringify(obj),
            this.$businessCode.qbgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送会签部门成功",
                duration: 1000
              });
              this.preserve();
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
              message: res.message,
              duration: 2000
            });
          });
      }
    }
  },
  watch: {
    //定密依据
    "fromdata.secretGists":{
       handler(newv) {
        this.$forceUpdate();
      },
      deep: true
    },
    // "fromdata.isLock": {
    //   handler(newv) {
    //     this.uploadConfig.isLock = newv;
    //     this.$forceUpdate();
    //   },
    //   deep: true
    // },
    // "uploadConfig.subTempAddF": {
    //   handler(newv) {
    //     this.uploadConfig.subTempAddF = newv;
    //     this.$forceUpdate();
    //   },
    //   deep: true
    // },
     //附件名称校验
     "fromdata.attachTitle":{
       handler(newv){
         this.uploadConfig.attachTitle =
           newv &&
           newv.replace(/[\n,\s]/g, "");
       }
     }
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
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.readonlyQbcy = this.$route.query.readonlyQbcy ? false : true;
    this.getToQianbaoSwEntityById();
    this.getTcQbsignParamDicInfo();
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

.secretInput {
  display: none;
  border-bottom: 1px solid #ccc;
  text-align: center;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 0px;
  border: 0;
  border-bottom: 1px solid #606266;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 5px;
  margin: 0 6px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.secretStyle {
  display: inline-block;
}
.dingMiStyle {
  /deep/ .el-radio {
    color: #606266;
    cursor: pointer;
    margin: 20px;
    display: block;
  }
  // /deep/ .el-input__inner {
  //   -webkit-appearance: none;
  //   background-color: #FFF;
  //   background-image: none;
  //   border-radius: 0px;
  //   border: 0;
  //   border-bottom: 1px solid #606266;
  //   box-sizing: border-box;
  //   color: #606266;
  //   display: inline-block;
  //   font-size: inherit;
  //   height: 40px;
  //   line-height: 40px;
  //   outline: 0;
  //   /* padding: 0 15px; */
  //   transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  //   width: 100%;
  // }
}
.pr45 {
  padding-right: 45px;
}
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>
