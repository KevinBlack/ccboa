<template>
  <div id="bankEntityDispatchDone" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="maintenance">维护</el-button>
          <el-button size="small" plain v-show="bank_selectConfig.curNodeId != '800'&& smoaButtonFlag" @click="processScheduling">流程调度</el-button>
          <!-- <el-button size="small" plain @click="handleFile" v-show="bank_selectConfig.curNodeId=='800'">归档</el-button> -->
          <el-button size="small" plain @click="handleFile" v-show="isRecentTowYear&&bank_selectConfig.curNodeId == '800'&& smoaButtonFlag">归档</el-button>
          <el-button size="small" plain @click="handleFileNew" v-show="isShowFileNew&&bank_selectConfig.curNodeId == '800'&& smoaButtonFlag">区块链归档</el-button>
          <el-button size="small" plain v-show="smoaButtonFlag" @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain v-show="smoaButtonFlag" @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain v-show="smoaButtonFlag" @click="collect('sendSw', bank_dispach.id)">收藏</el-button>
          <el-button size="small" v-show="false" plain @click="handleHide">隐藏按钮</el-button>
          <!-- <el-button size="small" plain @click="handleShowRegain" v-if="fromdata.currentNodeId!=800&&readFlag !=1 &&allowBack==true">收回</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button> -->
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{ draftOrganTitle }}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <sideBar container="#bank_dispach_content"></sideBar>
          <!-- 侧边栏导航 -->
          <!-- <div class="bank_dispach_side_nav">
            <a
              href="javascript:void(0);"
              id="#wjys"
              :class="active == '#wjys' ? 'active' : ''"
              @click="toTarget('#wjys')"
            >文件要素</a>
            <a
              href="javascript:void(0);"
              id="#fsdx"
              :class="active == '#fsdx' ? 'active' : ''"
              @click="toTarget('#fsdx')"
            >发送对象</a>
            <a
              href="javascript:void(0);"
              id="#qpyj"
              :class="active == '#qpyj' ? 'active' : ''"
              @click="toTarget('#qpyj')"
            >签批意见</a>
            <a
              href="javascript:void(0);"
              id="#scfj"
              :class="active == '#scfj' ? 'active' : ''"
              @click="toTarget('#scfj')"
            >附件</a>
          </div> -->

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前环节：
              <span>{{fromdata.currentNode}}</span>
            </p>
            <p class="bank_dispach_annotation_current" style="width:88%;">
              当前处理人：
              <span>{{fromdata.currentUser}}</span>
            </p>
            <el-button size="small" class="bank_article_illustrates" @click="handleExplain">办文说明</el-button>
          </div>
          <el-form
            ref="fromdata"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发文类型" prop="type" ref="type">
                    <el-select
                      v-model="fromdata.type"
                      placeholder="请选择"
                      style="width:100%"
                      @change="selectType"
                      disabled
                    >
                      <el-option
                        v-for="sendTypeitem in SsendType"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="代字/红头" prop="redHead" ref="redHead">
                    <el-select
                      v-model="fromdata.redHead"
                      placeholder="请选择"
                      style="width:100%"
                      @change="selectredhead"
                      disabled
                    >
                      <!-- <el-option
                        v-for="redHeaditem in SredHead"
                        :key="redHeaditem.redHead"
                        :label="redHeaditem.redHead"
                        :value="redHeaditem.redHead"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发文字号" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.documentNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" props="emergencyLevel" ref="emergencyLevel">
                    <el-select
                      v-model="fromdata.emergencyLevel"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <!-- <el-option
                        v-for="emergencyLevelitem in SemergencyLevel"
                        :key="emergencyLevelitem.label"
                        :label="emergencyLevelitem.label"
                        :value="emergencyLevelitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务分类" :span="8" prop="businessType" ref="businessType">
                    <!-- <el-select v-model="fromdata.businessType" placeholder="请选择" style="width:100%" disabled>
                      <el-option
                        v-for="businessType in SbusinessType"
                        :key="businessType.label"
                        :label="businessType.label"
                        :value="businessType.label"
                      ></el-option>
                    </el-select> -->
                    <el-input
                      placeholder="请选择"
                      v-model="fromdata.businessType"
                      :title="fromdata.businessType"
                      disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showTextType">
                  <el-form-item label="文种" :span="8" prop="textType" ref="textType">
                    <el-select v-model="fromdata.textType" placeholder="请选择" style="width:100%" disabled>
                      <!-- <el-option
                        v-for="textTypeitem in StextType"
                        :key="textTypeitem.label"
                        :label="textTypeitem.label"
                        :value="textTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showMeetingEndTime">
                  <el-form-item label="会议结束时间" :span="8" prop="meetingEndTime" ref="meetingEndTime">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="fromdata.meetingEndTime"
                      format="yyyy-MM-dd HH:mm:ss"
                      disabled
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- 秘密类型 -->
                <el-col :span="24">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                        <el-select
                          v-model="fromdata.secretType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
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
                      <el-form-item label="秘密标志" :span="8" prop="secretFlagType" ref="secretFlagType">
                        <el-select
                          @change="workSecurityTab"
                          v-model="fromdata.secretFlagType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
                          <!-- <el-option
                            v-for="workSecurityitem in SworkSecretFlag"
                            :key="workSecurityitem.label"
                            :label="workSecurityitem.label"
                            :value="workSecurityitem.label"
                          ></el-option> -->
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 内部信息 -->
                    <el-col :span="8" v-show="secretTypeFlag && !flag && !workSecurityFlag">
                      <el-form-item label="秘密标志" :span="8" prop="secretFlagType" ref="secretFlagType">
                        <el-select
                          @change="workSecurityTab"
                          v-model="fromdata.secretFlagType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
                          <!-- <el-option
                            v-for="secretFlagitem in secretOptionsFlag"
                            :key="secretFlagitem.label"
                            :label="secretFlagitem.label"
                            :value="secretFlagitem.label"
                          ></el-option>-->
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
                          v-model="fromdata.secretLimitType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
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
                    <el-col :span="8">
                      <el-form-item
                        label="密级和保密期限"
                        :span="8"
                        prop="secretFlagType"
                        ref="secretFlagType"
                        v-if="flag && secretFlagTypeFlag"
                      >
                        <el-select
                          @change="workSecurityTabTime"
                          v-model="fromdata.secretFlagType"
                          placeholder="请选择"
                          style="width:40%"
                          disabled
                        >
                          <!-- <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                          ></el-option> -->
                        </el-select>
                        <i :class="isCountry"></i>
                        <el-input
                          style="width:22%"
                          @input="workSecurityTabTime"
                          v-model="fromdata.secretFlagContent"
                          prop="secretFlagContent"
                          ref="secretFlagContent"
                          disabled
                        ></el-input>

                        <el-select
                          name="secretTimeType"
                          v-model="fromdata.secretTimeType"
                          @change="workSecurityTabTime"
                          placeholder="请选择"
                          style="width:25%"
                          prop="secretTimeType"
                          ref="secretTimeType"
                          disabled
                        >
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
                    <el-col :span="8">
                      <el-form-item
                        label="密级和保密期限"
                        :span="8"
                        prop="secretFlagType"
                        ref="secretFlagType"
                        v-if="flag && businessSecretFlag"
                      >
                        <el-select
                          @change="workSecurityTabTime"
                          v-model="fromdata.secretFlagType"
                          placeholder="请选择"
                          style="width:40%"
                          disabled
                        >
                          <!-- <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                            disabled
                          ></el-option> -->
                        </el-select>
                        <i :class="isCountry"></i>

                        <el-date-picker
                          type="date"
                          @blur="workSecurityTabTime"
                          placeholder="选择日期"
                          v-model="fromdata.secretFlagContent"
                          style="width: 40%;"
                          disabled
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <!-- 选择解密条件 -->
                    <el-col :span="8">
                      <el-form-item
                        label="密级和保密期限"
                        prop="secretFlagType"
                        ref="secretFlagType"
                        v-if="flag && secretFlagTypetiaojFlag"
                      >
                        <el-select
                          @change="workSecurityTabTime"
                          v-model="fromdata.secretFlagType"
                          placeholder="请选择"
                          style="width:45%"
                          disabled
                        >
                          <!-- <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                          ></el-option> -->
                        </el-select>
                        <i :class="isCountry"></i>

                        <el-select
                          name="secretTimeType"
                          @change="workSecurityTabTime"
                          v-model="fromdata.secretTimeType"
                          placeholder="请选择"
                          style="width:49%"
                          prop="secretTimeType"
                          ref="secretTimeType"
                          disabled
                        >
                          <!-- <el-option
                            v-for="secretLimititem in SsecretLimit"
                            :key="secretLimititem.label"
                            :label="secretLimititem.label"
                            :value="secretLimititem.label"
                          ></el-option> -->
                        </el-select>
                      </el-form-item>
                    </el-col>
                    </el-row>
                </el-col>
                <el-col v-if="showBySecret">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea" resize="none" autosize
                      v-model="fromdata.knowScore"
                      disabled
                      name="knowScore"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="showBySecret">
                  <el-form-item label="定密依据">
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        v-model="fromdata.secretGists"
                        disabled
                        name="secretGists"
                        style="flex:1"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门" prop="draftDepartment" ref="draftDepartment">
                    <el-input v-model="fromdata.draftDepartment" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="拟稿人"
                    prop="draftUser"
                    ref="draftUser"
                    :disabled="fromdata.state==1"
                  >
                    <el-input v-model="fromdata.draftUser" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input v-model="fromdata.phone" maxlength="11" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="showUnionDepartment">
                  <el-form-item label="联合发文单位">
                    <el-input v-model="fromdata.unionDepartment" disabled></el-input>
                  </el-form-item>
                </el-col>
                
                <el-col>
                  <el-form-item label="发文依据">
                    <el-col>
                      <!-- <el-button size="small" plain @click="handleImport">引入</el-button> -->
                    </el-col>
                  </el-form-item>
                  <el-form-item label="" v-if="showImportData">
                    <div class="border_yiju">
                      <el-row v-for="(item) in fromdata.sendBasis" :key="item.id">
                        <el-col :span="20" class="btn_openImport">
                          <el-button type="text" :class="(item.id=='')?'colorBlack':'colorLink'" @click="handleCheckImport(item)">{{item.documentCode}}</el-button>
                        </el-col>
                        <!-- <el-col :span="4" class="btn_delImport">
                          <el-button type="text" @click="handleDeleteImport(item)">删除</el-button>
                        </el-col> -->
                      </el-row>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                        <el-radio v-model="fromdata.isDirect" label="是" disabled>是</el-radio>
                        <el-radio v-model="fromdata.isDirect" label="否" disabled>否</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="直发范围" :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                        <el-select v-model="fromdata.directRange" placeholder="请选择" style="width:100%" disabled>
                          <!-- <el-option
                            v-for="directRangeitem in SdirectRange"
                            :key="directRangeitem.label"
                            :label="directRangeitem.label"
                            :value="directRangeitem.label"
                          ></el-option> -->
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="直发文种类" :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                        <el-select v-model="fromdata.directType" placeholder="请选择" style="width:100%" disabled>
                          <!-- <el-option
                            v-for="directTypeitem in SdirectType"
                            :key="directTypeitem.label"
                            :label="directTypeitem.label"
                            :value="directTypeitem.label"
                          ></el-option> -->
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="规章/规范性文件" prop="isStandardFile" ref="isStandardFile">
                    <el-radio v-model="fromdata.isStandardFile" label="是" disabled>是</el-radio>
                    <el-radio v-model="fromdata.isStandardFile" label="否" disabled>否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="档案利用范围" prop="userRange" ref="userRange">
                    <el-input v-model="fromdata.userRange" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保管期限" prop="keepLimit" ref="keepLimit">
                    <el-select v-model="fromdata.keepLimit" placeholder="请选择" style="width:100%" disabled>
                      <!-- <el-option
                        v-for="keepLimititem in SkeepLimit"
                        :key="keepLimititem.label"
                        :label="keepLimititem.label"
                        :value="keepLimititem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-if="fromdata.isStandardFile=='是'&&fromdata.ifProtect==1">
                  <el-form-item label="是否经过消保审查" label-width="136px" prop="isNeedCheckcp" ref="isNeedCheckcp">
                    <el-radio
                      v-model="fromdata.isNeedCheckcp"
                      disabled
                      label="是"
                    >是</el-radio>
                    <el-radio
                      v-model="fromdata.isNeedCheckcp"
                      title="请经过消保审查后重新提交"
                      disabled
                      label="否"
                    >否</el-radio>
                    <el-radio
                      v-model="fromdata.isNeedCheckcp"
                      title="不涉及消费者权益保护，无需进行消保审查"
                      disabled
                      label="不涉及"
                    >不涉及</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="拟稿日期"
                    prop="draftTime"
                    ref="draftTime"
                    :disabled="fromdata.state==1"
                  >
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="fromdata.draftTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期" disabled>
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="fromdata.completeTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="发文日期" disabled>
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="fromdata.sendTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" placeholder="请输入正文标题" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.attachTitle"
                      disabled
                      placeholder="请输入附件标题"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 发送对象 -->
            <h6 class="bank_dispach_file_tit">发送对象</h6>
            <div id="fsdx" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="会签部门">
                    <div style="display:flex">
                        <el-input
                          type="textarea" resize="none" autosize
                          @input="inputChange"
                          v-model="fromdata.signDepartmentName"
                          disabled
                          placeholder="请选择会签部门"
                          style="flex:1;color: #F00;"
                          class="hqbm"
                        ></el-input>
                      </div>
                  </el-form-item>
                </el-col>
                <!-- <el-col :offset="1" :span="8">
                  <el-form-item prop="finishSignDepartmentName" ref="finishSignDepartmentName">
                    <el-input
                      v-model="fromdata.finishSignDepartmentName"
                      disabled
                      placeholder="已完成的会签部门"
                      style="width: 100%;"
                      class="hqbm1"
                    ></el-input>
                  </el-form-item>
                </el-col> -->

                <el-col>
                  <el-form-item :label="formText.outsideSign" prop="outsideSign" ref="outsideSign">
                    <el-input v-model="fromdata.outsideSign" type="textarea" resize="none" autosize disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="主    送" prop="main" ref="main">
                    <el-input
                      v-model="fromdata.main"
                      @input="inputChange"
                      type="textarea" resize="none" autosize
                      style="width: 100%;"
                      disabled
                    >
                      <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('zhusong')"></el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="抄    送" prop="copy" ref="copy">
                    <el-input
                      v-model="fromdata.copy"
                      @input="inputChange"
                      type="textarea" resize="none" autosize
                      style="width: 100%;"
                      disabled
                    >
                      <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('chao')"></el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item :label="formText.inline" prop="inline" ref="inline">
                    <el-input
                      v-model="fromdata.inline"
                      @input="inputChange"
                      type="textarea" resize="none" autosize
                      style="width: 100%;"
                      disabled
                    >
                      <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('ben')"></el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="签发意见">
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        v-model="fromdata.opinionSend"
                        v-if="fromdata.opinionSendId||!(fromdata.opinionSendList && fromdata.opinionSendList.length!=0)"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSendList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="定密责任人意见">
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.opinionSecretPerson"
                        v-if="fromdata.opinionSecretPersonId||!(fromdata.opinionSecretPersonList && fromdata.opinionSecretPersonList.length!=0)"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSecretPersonList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="核稿意见">
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        v-model="fromdata.opinionDraf"
                        v-if="fromdata.opinionDrafId||!(fromdata.opinionDrafList && fromdata.opinionDrafList.length!=0)"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionDrafList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="审核意见">
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        v-model="fromdata.opinionCheck"
                        v-if="fromdata.opinionCheckId||!(fromdata.opinionCheckList && fromdata.opinionCheckList.length!=0)"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionCheckList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="会签意见">
                    <!-- <div v-for="item in fromdata.opinionSignList" :key="item.id">
                      <div v-if="item.id" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="24"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
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
                          <el-col
                            :span="2"
                            v-if="item.createTime ==fromdata.sendOpinionMaxTime&&item.userId==nowUserId"
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
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        v-model="fromdata.opinionSign"
                        v-if="!(fromdata.opinionSignList && fromdata.opinionSignList.length!=0)"
                        :disabled="true"
                        maxlength="500"
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=3)"
                        v-if="!editedIdeaFields.opinionSign"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button> -->
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSignList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备注">
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
                        v-model="fromdata.comments"
                        v-if="fromdata.commentsId||!(fromdata.commentsList && fromdata.commentsList.length!=0)"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.commentsList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      :isRemarks="true"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 本行 -->
            <h6 class="bank_dispach_file_tit" v-if="bank_selectConfig.curNodeId == '800'">本行发送</h6>
            <div id="scfj" class="height_90" v-if="bank_selectConfig.curNodeId == '800'"></div>
            <div v-if="bank_selectConfig.curNodeId == '800'">
              <el-row>
                <el-col>
                  <el-form-item label="">
                    <el-input type="textarea" resize="none" autosize disabled v-model="deptSend"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 外行 -->
            <h6 class="bank_dispach_file_tit" v-if="bank_selectConfig.curNodeId == '800'">行外发送</h6>
            <div id="scfj" class="height_90" v-if="bank_selectConfig.curNodeId == '800'"></div>
            <div v-if="bank_selectConfig.curNodeId == '800'">
              <el-row>
                <el-col>
                  <el-form-item label="">
                    <el-input type="textarea" resize="none" autosize disabled v-model="outSend"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 回执 -->
            <h6 class="bank_dispach_file_tit" v-if="bank_selectConfig.curNodeId == '800'"></h6>
            <div id="scfj" class="height_90" v-if="bank_selectConfig.curNodeId == '800'"></div>
            <div v-if="bank_selectConfig.curNodeId == '800'">
              <el-row style="margin-top: 40px;">
                <el-col>
                  <m-table
                    size="medium"
                    :isIndex="true"
                    :tableData="tableData1"
                    :tableCols="tableCols"
                    :isPagination="false"
                    :pagination="pagination"
                  ></m-table>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 办文说明 -->
    <el-dialog
      :visible.sync="showExplain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      v-dialogDrag
      title="办文说明"
    >
      <el-form>
        <el-form-item>
          <el-input disabled type="textarea" resize="none" autosize rows="20" v-model="bwsmFromdata.explain"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!--收回-->
    <el-dialog
      :visible.sync="showRegain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      v-dialogDrag
      title="收回"
    >
      <h6 class="back_tit">确定要收回该文件吗?</h6>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showRegain = false">取 消</el-button>
        <el-button type="primary" @click="handleRegain">收 回</el-button>
      </div>
    </el-dialog>
    <!--查看依据文件-->
    <el-dialog title="查看依据文件" v-dialogDrag :visible.sync="showImportList">
      <table style="width: 100%;">
        <tr>
          <td class="ckyjbt">文号 : </td>
          <td>{{bank_import.documentCode}}</td>
        </tr>
        <tr>
          <td class="ckyjbt">标题 : </td>
          <td><el-button type="text" style="text-align:left;padding-left:10px;line-height:25px;word-break:break-all;white-space:pre-line;" @click="viewFile(bank_import, '1')">{{bank_import.title}}</el-button></td>
        </tr>
        <tr>
          <td class="ckyjbt">附件 : </td>
          <td>
            <el-row v-for="(item) in bank_import.attachList" :key="item.id">
              <el-col :span="18">
                <el-button type="text" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)">{{item.sort+'. '+item.fileName}}</el-button>
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
    <!-- <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :fromdata="fromdata"
    ></treeCofig> -->
    <treeCopy
      :treeData="treeData"
      :defaultUser="defaultUser"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :fromdata="fromdata"
      :loadingTree="loadingTree"
      :treeTradeCode="treeTradeCode"
    ></treeCopy>
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
import timeDialog from "@/components/timedialog/timedialog";
import treeCopy from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import mTable from "components/table/mTable.vue";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
import minixs from "@/minixs/index";
import opinionText from "@/components/opinionText/indexDsipatch";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from '@/components/sideBar/sideBar';
import formTextChange from '@/components/formText/index';

export default {
  name: "BankEntityDispatchDone",
  components: {
    timeDialog,
    treeCopy,
    secretBasls,
    appendWriteList,
    opinionText,
    mTable,
    sideBar
  },
  mixins: [minixs,viewDraft,dispatchIndex],
  data() {
    return {
      smoaButtonFlag:true,//商密oa过来文件控制按钮显隐 只显示关闭、维护,区块连归档不展示
      isShowFileNew: false,
      isRecentTowYear: true,
      formText:{
        inline:"本行发送",
        outsideSign:"行外会签",
      },
      // 文种显示
      showTextType: true,
      showMeetingEndTime: false,
      showUnionDepartment: true,
      loadingTree:false,
      treeTradeCode:'',//人员树交易线
      defaultUser:{},//完成并发送默认值
      unitId: "",

      deptSend:"",
      outSend:"",
      // 底部表格
      tableData1: [],
      tableCols: [
        { label: "收文单位", prop: "receiveOrgName", align: "center" },
        { label: "发送时间", prop: "createTime", align: "center" },
        { label: "收到时间", prop: "receiveTime", align: "center" },
        { label: "办结时间", prop: "undertakeEndTime", align: "center" },
        { label: "次数", prop: "sendTime", align: "center" }
      ],
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },

      // 上传
      uploadConfig:{
        id:'',
        url:'uploadFiles',
        code:''
      },
      //删除附件
      bank_deleteFileById:{
        function:'deleteFileById',
        id:''
      },

      draftOrganTitle: '',
      titleName: '',
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      secretFlagTypeFlag: false,
      // 密级和保密期限  解密时间  显示隐藏
      businessSecretFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      secretFlagTypetiaojFlag: false,
      // 定密依弹窗
      secretDialog: true,
      //确定完成并发送
      bank_doSendShiwuFw: {
        function: "doSendShiwuFw",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "252329e6-a7aa-45fb-839d-c20c8595e930",
        curTplNo: "testOA7ID",
        curMultiTenancyId: "CN000",
        wfeUnitId: ""
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getAllNodeInfo",
        curNodeId: "001",
        tTplNo: "testOA3ID",
        multiTenancyId: "CN000"
      },
      //input框内容
      bank_dispach: {
        function: "toEditShiwuFw",
        id: "",
        unitId: ""
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
      bank_addShiwuFw: {
        function: "addShiwuFw",
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
      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      fromdata: {
        function: "",
        attachTitle: "",
        attachSort:[],
        attchmentFileInfo:[],
        businessType: "",
        canNotShouHuiIds: "",
        comments: "",
        commentsList: [],
        copy: "",
        copyIds: "",
        currentDate: "",
        currentNode: "",
        currentNodeId: "",
        currentTime: "",
        currentUser: "",
        documentNo: "",
        draftDepartment: "",
        draftDepartmentId: "",
        draftOrgan: "",
        draftOrganId: "",
        draftTime: "",
        draftUser: "",
        draftUserId: "",
        emergencyLevel: "",
        exceedWordReason: "",
        haveRead: "",
        draftOrgan: "",
        inline: "",
        inlineIds: "",
        isArtificial: "",
        isBack: "",
        isCanDelete: "",
        isClear: "",
        isDirect: "",
        isHasDocumentNo: "",
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
        meetingEndTime: "",
        opinionCheck: "",
        opinionCheckList: [],
        opinionDrafList: [],
        opinionSecretPersonList: [],
        opinionSendList: [],
        opinionSignList: [],
        outsideSign: "",
        phone: "",
        processInstId: "",
        realCopy: "",
        realInline: "",
        realMain: "",
        reasonLimit: "",
        reasonList: "",
        redHead: "",
        secretFlag: "",
        secretFlagContent: "",
        secretFlagType: "",
        secretGists: "",
        secretLimitType: "",
        secretTimeType: "",
        secretType: "",
        sendBasis: "",
        sendTime: "",
        sendUnitName: "",
        sequenceSign: "",
        shenpiConfigId: "",
        shenpiTitle: "",
        signDepartment: "",
        signDepartmentId: "",
        signSequence: "",
        tel: "",
        textType: "",
        title: "",
        type: "",
        unionDepartment: "",
        updateTime: "",
        userRange: "",
        secretTypeflag: "",
        workflowId: "",
        wfeUnitId: "",
        eleSendSecretType: ""
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
      SsecretTypeflag: [],
      rules: {
        // type: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择发文类型"
        //   }
        // ],
        // redHead: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择代字/红头"
        //   }
        // ],
        // businessType: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择业务分类"
        //   }
        // ],
        // textType: [
        //   { required: true, trigger: "change", message: "请选择文种" }
        // ],
        // secretType: [
        //   { required: true, trigger: "change", message: "秘密类型" }
        // ],
        // draftOrgan: [
        //   { required: true, trigger: "blur", message: "请输入主办部门" }
        // ],
        // userRange: [
        //   { required: true, trigger: "change", message: "请选择档案利用范围" }
        // ],
        // isStandardFile: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择规章/规范性文件"
        //   }
        // ],
        // keepLimit: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请输入保管期限"
        //   }
        // ],
        // phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
        // isDirect: [
        //   { required: true, trigger: "change", message: "请选择直发文件" }
        // ],
        // title: [{ required: true, trigger: "blur", message: "请输入正文标题" }],
        // main: [{ required: true, trigger: "change", message: "请选择主送" }],
        // name: [
        //   { required: true, message: "请输入标题名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "3-5个字", trigger: "blur" }
        // ],
        // secretLimitType: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择秘密期限类型"
        //   }
        // ],
        // secretTypeflag: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择秘密标志"
        //   }
        // ],
        // secretFlagType: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择秘密标志"
        //   }
        // ]
      },
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
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      appendWriteDialog: true,
      clickTypes: 1,
      // nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      nowUserId: '', //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //套红文件
      bank_findTemplete: {
        function: "findTemplete",
        sendType:'',
        redHead:''
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: "doRecoverFile",
        id:''
      },
      // 办文说明
      bwsmFromdata: {
        explain: ""
      },

      // 知悉范围定密依据是否显示
      showBySecret: false,

      // 收回
      bank_regain: {
        function: 'doWithdrawTask',
        pcsAvyId: '',
        multiTenancyId: ''
      },

      // 是否能被收回
      readFlag:"",
      allowBack:"",
      showRegain: false, // 是否收回

      // 发文依据
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
      documentCode: "〔〕",
      importDataArr: [],
      bank_import: {},

      // 流程调度
      bank_flowConfig: {
        function: "selWfNode",
        curMultiTenancyId: "",
        curTplNo: "",
        wfeUnitId: ""
      },

      isCountry: "el-icon-star-off pad_10",
      interval: null,
      oldDataFlag: 0,
      shData:[],
    };
  },

  mounted() {
    this.interval = setInterval(() => {
      if(localStorage.getItem("notifyState") == 'fawen') {
        localStorage.setItem("notifyState", '')
        window.location.reload();
      }
    }, 1000)
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_fsdx = document.querySelector("#fsdx").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    handleHide() {
      this.$post
        .postData(
          "synchronousUpdate",
          JSON.stringify({
            function: "synchronousUpdate",
            id: this.bank_dispach.id,
            multiTenancyId: this.fromdata.multiTenancyId
          }),
          this.$businessCode.fawgl
        )
        .then(res => {})
    },
    async processScheduling() {
      let that = this;
      this.dialogTit = "流程调度";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoSend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.bank_selectConfig.unitId = this.unitId;
          this.$post
            .postData(
              "getAllNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.$businessCode.fawgl
            )
            .then(res => {
              if (res.success) {
                this.seletOptionsData = res.data.filter(item=>item.PCSAVYID!=800) || [];
                that.bank_flowConfig.wfeUnitId = that.unitId
                let parms = Object.assign({}, this.fromdata,this.bank_flowConfig);
                parms.pcsAvyId = this.bank_flowConfig.pcsAvyId = res.data[0].PCSAVYID;
                parms.unitId = this.unitId;
                parms.function = "selWfNode"
                this.$post
                  .postData(
                    "selWfNode",
                    JSON.stringify(parms),
                    this.$businessCode.fawgl
                  )
                  .then(resTree => {
                    this.treeData = resTree.data;
                    console.log(this.treeData);
                    if (resTree.message == "Loading") {
                      this.loadingTree = true;
                    } else {
                      this.loadingTree = false;
                    }
                    that.treeData = resTree.data&&resTree.data.data||[];
                    that.defaultUser = resTree.data&&resTree.data.defaultUser||{};
                    this.dialogState = !this.dialogState;
                  })
                  .catch(e => {
                    console.log(e);
                  });
              } else {
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: res.message,
                  duration: 1000
                });
              }
            });
    },
    async maintenance(){
      let data={
          id: this.$route.query.id,
          sendType: this.$route.query.sendType,
          unitId: this.unitId
        }
        let obj1=await this.$post.postData(
            "getSendOrderEditDataById",
            JSON.stringify(Object.assign(data,{function :"getSendOrderEditDataById",})),this.$businessCode.fawgl
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        let obj2=await this.$post.postData(
            "getSendOrderOpintions",
            JSON.stringify(Object.assign(data,{function :"getSendOrderOpintions"})),this.$businessCode.fawgl
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        // if(obj1&&obj2){
          const routeData = this.$router.resolve({
              path: "/maintainFiles",
              query: {
                id: this.$route.query.id,
                sendType: this.$route.query.sendType,
                type:'fw',
                sign: 1,
                selectUrl:"toEditShiwuFw",
                mainPage: 'false',
                title: this.draftOrganTitle,
                unitId: this.unitId,
                choseYear: this.$route.query.choseYear||""
              }
            });
          sessionStorage.setItem("fileObj",JSON.stringify(obj1))
          sessionStorage.setItem("suggessObj",JSON.stringify(obj2))
          window.open(routeData.href, "_blank");
        // }
    },
    // 收回
    handleShowRegain () {
      this.showRegain = true
    },
    handleRegain () {
      this.bank_regain.pcsAvyId = this.fromdata.pcsAvyId;
      this.bank_regain.unitId = this.unitId;
      this.$post.postData('doWithdrawTask', JSON.stringify(this.bank_regain), this.$businessCode.fawgl).then((res) => {
        this.showRegain = false;
        this.$message({
          type: "success",
          offset: 400,
          showClose: true,
          message: "收回成功",
          duration: 1000,
          onClose: () => {
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          }
        });
      }).catch(() => {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "后端返回失败",
          duration: 1000
        });
      })
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
      if (!id || !name) {
        return;
      }
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
    // 商业秘密
    workSecurityTabTime(value) {
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    workSecurityTab(value, type, state) {
      let transStr = this.fromdata.secretTimeType;
      this.fromdata.secretTimeType = "";
      if(state!="1") {
        this.fromdata.secretTimeType = this.SsecretTimeType[0].label
      } else {
        this.fromdata.secretTimeType = transStr;
      }
      if (value == "保密期限") {
        this.secretFlagTypeFlag = true;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = false;
      } else if (value == "解密时间") {
        this.secretFlagTypeFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = true;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = false;
      } else if (value == "解密条件") {
        if(state!="1") {
          this.fromdata.secretTimeType = this.SsecretLimit[0].label
        }
        this.secretFlagTypeFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = true;
      } else {
        this.secretFlagTypeFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = false;
      }
      if (!type) {
        this.fromdata.secretFlagContent = "";
        this.fromdata.secretTimeType = "";
        if(this.fromdata.secretType == '商业秘密'){
         this.fromdata.secretFlagType = "";
        }
        
        // if(state!="1"){
        //   this.preserve(null,null,null,null,true);
        // }
      }
      if (type && this.fromdata.secretFlagType === "商业秘密") {
        this.fromdata.secretFlagType = "";
      }

      this.$forceUpdate();
      // this.rules = this.copyRules;
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    secretTypechange(value, type, oneTip) {
      let that = this;
      if(oneTip!='1') {
        if (!type) {
          that.fromdata.workSecretFlag = "";
          that.fromdata.secretFlag = "";
          that.fromdata.secretFlagType = "";
          that.fromdata.secretLimitType = "";
          that.fromdata.security = "";
          that.fromdata.secretFlagContent = "";
          that.fromdata.secretTimeType = "";
        }
        // that.preserve(null,null,null,true);
      }
      value = value&&value.trim();
      if (value && value !== "") {
        that.showBySecret = true;
      } else {
        that.showBySecret = false;
      }
      //type 回显处理
      if (value) {
        that.flag = true;
        that.secretTypeFlag = false;
        if (value == "商业秘密") {
          that.SbusinessSecret = [].concat(that.secretOptionsFlag);
          that.isCountry = "el-icon-star-off pad_10";
          that.$forceUpdate();
        } else if (value == "国家秘密") {
          that.isCountry = "el-icon-star-on pad_10";
          that.SbusinessSecret = [].concat(that.countriesSecret);
          that.$forceUpdate();
        }
        // this.copyRules.secretLimitType[0].required = true;
        // this.copyRules.secretFlagType[0].required = true;
        // }
        // else if (value == "国家秘密") {
        //   this.flag = false;
        //   this.secretTypeFlag = true;
        //   this.workSecurityFlag = false;
        //   // this.copyRules.secretFlag[0].required = true;
        //   this.secretOptionsFlag = [].concat(this.SsecretFlag);
        // }
        // else if (value == "工作秘密") {
        //   this.flag = false;
        //   this.secretTypeFlag = true;
        //   this.workSecurityFlag = true;
        //   // this.copyRules.secretFlagType[0].required = true;
        //   this.secretOptionsFlag = [].concat(this.SworkSecretFlag);
      } else {
        that.flag = false;
        that.secretTypeFlag = false;
        that.workSecurityFlag = false;
      }
      
      that.$refs.fromdata.clearValidate();
      this.$nextTick(() => {
        if (value){
          this.rules.secretLimitType[0].required = true;//商业秘密
        }else{
          this.rules.secretLimitType[0].required = false;
        }
      });
    },
    directchange(val) {
      if (this.fromdata.isDirect == "否") {
        this.isDirectFlag = false;
      } else if (this.fromdata.isDirect == "是") {
        this.isDirectFlag = true;
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
          this.checkIds = this.fromdata.signDepartmentId
            ? this.fromdata.signDepartmentId.split(",")
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
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
      // let judge = true;
      let that = this;
      // if (this.dialogType === "dosend") {
      //   judge = this.saveCheck();
      // }
      // if (!judge) {
      //   return;
      // }
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

        switch (type) {
          case "zhusong":
            this.fromdata.main = names;
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            break;
          case "chao":
            this.fromdata.copy = names;
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
            break;
          case "hui":
            this.fromdata.signDepartment = names;
            this.fromdata.signDepartmentId = ids;
            this.huiCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = names;
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
            break;
          case "dosend":
            this.bank_doSendShiwuFw.nextUserName = names;
            this.bank_doSendShiwuFw.nextUserId = ids;
            this.bank_doSendShiwuFw.nextNodeId = params.id;
            this.bank_doSendShiwuFw.nextNodeName = params.name;
            break;
        }
        this.$forceUpdate();
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogType);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.fromdata, this.bank_doSendShiwuFw);
      params.unitId = this.unitId;
      this.$post
        .postData("doSendShiwuFw", JSON.stringify(params), this.$businessCode.fawgl)
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
    completeSending() {
      // if (!this.bank_doSendShiwuFw.id) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "请先保存数据",
      //     duration: 1000
      //   });
      //   return;
      // }
      this.clickSaveAndSend = true;

      this.preserve();
      if (!this.saveCheck()) {
        return;
      }
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.bank_selectConfig.unitId = this.unitId;
      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          this.fromdata.wfeUnitId = this.bank_send.wfeUnitId = this.unitId
          this.bank_send.unitId = this.unitId;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
              this.$businessCode.fawgl
            )
            .then(res => {
              console.log("树" + res.data);
              this.treeData = res.data;
            })
            .catch(e => {
              console.log(e);
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
    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      if (!this.scrollIntoForm()) {
        return false;
      }
      if (!regT.test(this.fromdata.phone)) {
        tips = "电话号码输入有误";
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      } else {
        return true;
      }
    },
    //主送
    bankmain(n) {
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
      }
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogType = n;
      if (n === "hui") {
        this.hasRadio = true;
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.showCompDialog();
      if (n === "hui") {
        this.bank_mainXiao.unitId = this.unitId;
        this.$post.postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_mainXiao),
          this.$businessCode.fawgl
        ).then(res => {
          console.log(JSON.stringify(res.data));
          this.treeData = (res && res.data) || [];
          // if (this.treeData.length) {
          //   this.treeData.forEach(item => {
          //     item.content = JSON.parse(item.content);
          //     if (n === "hui") {
          //       item.text = item.typeName;
          //     }
          //   });
          // }
        });
      } else {
        this.$post
          .postData(
            "getTcPriDeliveryDic",
            JSON.stringify(this.bank_main),
            this.$businessCode.fawgl
          )
          .then(res => {
            console.log(JSON.stringify(res.data));
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
    // 下拉列表
    getSendOrderDicByParam() {
      this.bank_dispachfile.unitId = this.unitId;
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res.data);
          this.SsendType = JSON.parse(res.data.sendType);
          this.SemergencyLevel = JSON.parse(res.data.emergencyLevel);
          this.SbusinessType = JSON.parse(res.data.businessType);
          this.StextType = JSON.parse(res.data.textType);
          this.SsecretType = JSON.parse(res.data.eleSendSecretType);
          this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          this.SdirectRange = JSON.parse(res.data.directSendRange);
          this.SdirectType = JSON.parse(res.data.directSendType);
          this.SkeepLimit = JSON.parse(res.data.eleSendSecretLimit);
          this.SsecretTypeflag = JSON.parse(res.data.secretTypeflag);
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEditShiwuFw() {
      let that = this;
      this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : getFormId(this.$route.query.id,'bankEntityDispachDoneId');
      this.bank_dispach.choseYear = this.$route.query.choseYear||"";
      that.bank_dispach.unitId = that.unitId;
      this.$post
        .postData(
          "toEditShiwuFw",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.oldDataFlag = res.data.oldDataFlag;
          if (this.oldDataFlag == 1) {
            that.tableData1 = res.data.oldOaReceiveData&&res.data.oldOaReceiveData||[];
            that.tableData1 = JSON.parse(that.tableData1)
              that.tableData1.map((node) => {
                that.downToUpProcessInstId = node.processInstId
            })

            let transObj = {processInstId: '', name: '', userName: '', orgId: '', lowerBankFlag: ''}
            
            that.tableData1.forEach(element => {
              transObj.processInstId = element.processInstId
              transObj.name = element.receiveOrgName
              transObj.userName = element.userName
              transObj.orgId = element.receiveOrgId
              transObj.lowerBankFlag = element.lowerBankFlag
              that.shData.push(transObj)
              transObj = {processInstId: '', name: '', userName: '', orgId: '', lowerBankFlag: ''}
            });
            this.deptSend = res.data.deptSend
            this.outSend = res.data.outSend
          } else {
            if (res.data.currentNodeId == '800') {
              that.bank_dispach.id = that.bank_dispach.id
                ? that.bank_dispach.id
                : that.$route.query.id
              that.$post.postData(
                'getByfawenId', 
                JSON.stringify({function: 'getByfawenId', sendOrderId: that.bank_dispach.id, unitId: that.unitId}),
                that.$businessCode.fawgl
              ).then(res => {
                that.tableData1 = res.data?res.data:[];
                if (that.tableData1.length>0) {
                  that.tableData1.map((node) => {
                    if(node.lowerBankFlag == '下级上报上级行') {
                      that.downToUpProcessInstId = node.processInstId
                    }
                  })
                }
                
  
                this.$post.postData("toReceiveDeptData", 
                  JSON.stringify(
                    {
                      function: 'toReceiveDeptData',
                      shData: res.data,
                      unitId: that.unitId
                    }
                  ), 
                  this.$businessCode.fawgl).then(res => {
                  this.deptSend = res.data.deptSend
                  this.outSend = res.data.outSend
                })
              })
              //收回测试
              that.$post
              .postData(
                "checkTakeBack",
                JSON.stringify({function:"checkTakeBack",processInstId:that.fromdata.processInstId, unitId:that.unitId}),
                that.$businessCode.fawgl
              )
              .then(res => {
                  that.allowBack = res.allowBack;
              });
            }
          }
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "实物发文处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "实物发文处理单";
          }
          that.fromdata = Object.assign(that.fromdata, res.data);

          that.isShowFileNew = that.fromdata.isShowNewFiledButton==0 ? true : false;

          that.nowUserId = res.data.currentUserId || ''
          
          console.log("toedit", res.data);
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true, "1");
          }
          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true, "1");
          }

          if(this.fromdata.secretType&&this.fromdata.secretType !=="") {
            this.showBySecret = true
          } else {
            this.showBySecret = false
          }

          if (that.fromdata.type == "行发文" || that.fromdata.type == "部门发文" || that.fromdata.secretType == "党务发文") {
            that.showTextType = true;
            that.showMeetingEndTime = false;
          } else if (that.fromdata.type === "会议纪要") {
            that.showMeetingEndTime = true;
            that.showTextType = false;
          } else {
            that.showTextType = false;
            that.showMeetingEndTime = false;
          }

          this.bank_flowConfig.curTplNo = res.data.tplNo;
          this.bank_flowConfig.curMultiTenancyId = res.data.multiTenancyId;
          this.bank_selectConfig.curNodeId = res.data.currentNodeId;
          this.bank_selectConfig.curTplNo = res.data.tplNo;
          this.bank_selectConfig.pTplNo = res.data.pTplNo;
          this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
          this.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;

          that.fromdata.sendBasis = res.data.sendBasis&&JSON.parse(res.data.sendBasis)||[]
          that.showImportData = that.fromdata.sendBasis.length>0

          that.bwsmFromdata.explain = res.data.explain ? res.data.explain : "";
          that.fromdata.opinionCheckList =
            res.data &&
            res.data.opinionCheckList &&
            JSON.parse(res.data.opinionCheckList);
          that.fromdata.opinionSecretPersonList =
            res.data &&
            res.data.opinionSecretPersonList &&
            JSON.parse(res.data.opinionSecretPersonList);
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
          that.fromdata.commentsList =
            res.data &&
            res.data.commentsList &&
            JSON.parse(res.data.commentsList);
          //处理会签 、主送、抄送、本行发送
          if (res.data.mainIds) {
            that.zhuCheckData = that.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          if (res.data.signDepartmentId) {
            that.huiCheckData = that.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartment
            );
          }
          if (res.data.copyIds) {
            that.chaoCheckData = that.concatTreeData(
              res.data.copyIds,
              res.data.copy
            );
          }
          if (res.data.inlineIds) {
            that.benCheckData = that.concatTreeData(
              res.data.inlineIds,
              res.data.inline
            );
          }

          that.uploadConfig.filesHas = that.fromdata.attchmentFileInfo;
          that.fromdata.attachSort = [];
          
          //临时意见处理
          that.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          that.cuteData("opinionDraf", "opinionDrafList", "opinionDrafId");
          that.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          that.cuteData("opinionSecretPerson", "opinionSecretPersonList", "opinionSecretPersonId");
          that.cuteData("opinionCheck", "opinionCheckList", "opinionCheckId");
          that.cuteData("comments", "commentsList", "commentsId");
        })
        .catch(erro => {
          that.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam() {
      this.bank_redheader.unitId = this.unitId;
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

    // 代字/红头  下拉 发文字号获取值
    selectredhead(redHeadITEM) {
      this.fromdata.documentNo = redHeadITEM;
    },
    // 保存
    preserve(type) {
      this.bank_dispach.id = getFormId(this.$route.query.id,'bankEntityDispachDoneId');

      var obj = Object.assign(this.fromdata, this.bank_addShiwuFw);
      obj.unitId = this.unitId;
      console.log(this.bank_addShiwuFw);
      this.$post
        .postData("addShiwuFw", JSON.stringify(obj), this.$businessCode.fawglfj)
        .then(res => {
          if (res && res.success) {
            this.bank_addShiwuFw.id = this.bank_dispach.id = this.bank_doSendShiwuFw.id = getFormId(this.$route.query.id,'bankEntityDispachDoneId',res.data.id);

            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
              if(type==="uploadfile"){
                this.uploadConfig.id = res.data.id;
                this.$refs.uploadComponent.uploadFileNow();  
              }
            }
            this.toEditShiwuFw();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1000
          });
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
    handelclose() {
      window.location.href = "about:blank";
      window.close();
    },

     //请求文件路径
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.fromdata.filePath;
      self.bank_doDownloadFile.unitId = this.unitId;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then(res => {
          if (res && res.success) {
            if(thInfo){
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            }else{
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          }else{
             self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
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
         successInfo.state = false
        });
        return successInfo
    },
    // 起草正文
    drafting(state) {
      let that = this;

      this.zhengWenState = state;
      if(!this.fromdata.filePath&&!this.fromdata.fileName&&state!=1){
         this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请先起草正文",
            duation: 500
          });
        return;
      }
      if(!getFormId(this.$route.query.id,"bankDispachId")){
        this.preserve().then((res)=>{
          if(res){
            if(state == 1){
               this.showDraft = true;
             }else{
               let fileInfo = {
                  filePath:this.fromdata.filePath,
                  fileName:this.fromdata.fileName,
               }
               this.doDraft(fileInfo)
             }
          }
        });
      }else{
        if(state == 1){
            this.showDraft = true;
          }else{
            this.getFileInfo(that).then((res)=>{
              if(res.state){
                if(state!='taoHong'){
                  this.doDraft(res)
                }else{
                  this.findTemplete(res);
                }

              }
            })

          }
      }

    },
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:getFormId(this.$route.query.id,"bankDispachId"),
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          unitId: this.unitId
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 删除此文
    delectArticle() {
      this.bank_dispach.id = getFormId(this.$route.query.id,'bankEntityDispachDoneId');
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      console.log(
        this.bank_dispach.id,
        this.$route.query.id,
        deletesendorderid
      );
      this.bank_DeleteSendOrder.id = deletesendorderid;
      this.bank_DeleteSendOrder.unitId = this.unitId;

      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.bank_dispach.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else {
            this.$post
              .postData(
                "doDeleteSendOrder",
                JSON.stringify(this.bank_DeleteSendOrder),
                this.$businessCode.fawgl
              )
              .then(res => {
                this.$message({
                  type: "success",
                  offset: 400,
                  showClose: true,
                  message: "删除成功!"
                });
                window.location.href = "about:blank";
                window.opener.location.reload();
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
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.bank_cklc.unitId = this.unitId;
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.fawgl
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
      const routeData = this.$router.resolve({
        path: '/swfwcld',
        query: {
          id:this.bank_dispach.id,
          unitId: this.unitId,
          choseYear: this.$route.query.choseYear||""
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
    // 办文说明
    handleExplain() {
      this.showExplain = true;
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
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.bank_deletToSendOrder.unitId = this.unitId;
      this.$post
        .postData(
          "doDeletesendOrderOpinion",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.toEditShiwuFw();
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
        id:this.fromdata.attchmentFileInfo[n-1].id,
        sort:this.fromdata.attchmentFileInfo[n].sort
        },
        {
        id:this.fromdata.attchmentFileInfo[n].id,
        sort:this.fromdata.attchmentFileInfo[n-1].sort
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
        id:this.fromdata.attchmentFileInfo[n+1].id,
        sort:this.fromdata.attchmentFileInfo[n].sort
        },
        {
        id:this.fromdata.attchmentFileInfo[n].id,
        sort:this.fromdata.attchmentFileInfo[n+1].sort
        }
      )
      midObj = this.fromdata.attchmentFileInfo[n];
      this.fromdata.attchmentFileInfo[n] = this.fromdata.attchmentFileInfo[n + 1];
      this.fromdata.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n,id) {
      this.bank_deleteFileById.id = id;
      this.bank_deleteFileById.unitId = this.unitId;
       this.$post
        .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById), this.$businessCode.fawglfj)
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
            }else{
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
    downFile(file){
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.bank_doDownloadFile.unitId = this.unitId;
      this.$post
      .postData("doDownloadFile", JSON.stringify(this.bank_doDownloadFile), this.$businessCode.fawglfj)
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
            }else{
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
    viewFile(file, tache) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      if (!file.filePath&&tache=="1") {
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
      this.bank_doDownloadFile.unitId = this.unitId;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
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
                downLoadFileReName(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  res.fileName
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
    // 归档旧
    handleFile() {
      this.$post
        .postData(
          "sendOrderSwFiledById",
          JSON.stringify({
            function: "sendOrderSwFiledById",
            id: this.bank_dispach.id,
            unitId: this.unitId
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res&&res.success) {
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "归档成功!"
            });
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 500
            });
          }
        });
    },
    // 归档新
    handleFileNew() {
      this.$post
        .postData(
          "doRepeatSendBusinessDataOperationFile",
          JSON.stringify({
            function: "doRepeatSendBusinessDataOperationFile",
            id: this.bank_dispach.id,
            multiTenancyId: this.fromdata.multiTenancyId
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res&&res.success) {
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "新归档成功!"
            });
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 500
            });
          }
        });
    }
  },
  created() {
    this.formText = formTextChange('send');
    let curDay = new Date();
    let recentTowYear = curDay.getFullYear()-2;
    this.isRecentTowYear = this.$route.query.choseYear==""||(this.$route.query.choseYear>recentTowYear);
    //初始化加载数据
    this.bank_dispach.id = this.uploadConfig.id = getFormId(this.$route.query.id,'bankEntityDispachDoneId');
    this.bank_doSendShiwuFw.id = this.bank_dispach.id;
    this.titleName = this.$route.query.title;
    this.unitId = this.$route.query.unitId||"";
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.treeTradeCode = this.$businessCode.ggfawgl;  //完成并发送 树 流程交易线   chai
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.toEditShiwuFw();
    // this.getSendOrderDicByParam();

   // start:
    if(this.$route.query.id.slice(0,4) === "SMOA"){
        this.smoaButtonFlag = false;
    }
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
            color: #f00;
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
  color: #f00 !important;
  min-height: 40px !important;
  background-color: #fff !important;
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
/deep/ .el-textarea.is-disabled .el-textarea__inner{
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
.pad_lr10{
  padding:0 10px;
}
.disable_w {
  width: 100%;
}
.tree_w {
  height: 200px;
  padding:20px;
  overflow:scroll;
  margin:20px 0 0 130px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size:14px;
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
    .down{
      cursor: pointer;
    }
    .down:hover{
    color: #3b85ef
    }
  }
}
</style>
