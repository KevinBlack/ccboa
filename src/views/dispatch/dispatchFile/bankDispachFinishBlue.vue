<template>
  <div id="bankDispachFinishBlue" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>电子发文已办处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="drafting(0)">查看正文</el-button>
          <el-button size="small" plain @click="handleSend(1)">发送</el-button>
          <el-button size="small" plain v-if="teshufasong" @click="handleSend(2)">特殊发送</el-button>
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            v-if="showSpecial"
            @click="handelcheckSpecial"
          >特殊发送列表</el-button>
          <!-- <el-button size="small" plain @click="handleDoFinish">办结</el-button> -->
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="collect('send', collectId)">收藏</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
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
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#fsdx' ? 'active' : ''"
          @click="toTarget('#fsdx')"
        >发送对象</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批意见</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>-->

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
          <el-form ref="fromdata" :model="fromdata" label-width="130px" class="demo_ruleForm">
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发文类型" prop="type" ref="type" type="hidden">
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
                      <el-option
                        v-for="redHeaditem in SredHead"
                        :key="redHeaditem.redHead"
                        :label="redHeaditem.redHead"
                        :value="redHeaditem.redHead"
                      ></el-option>
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
                  <el-form-item label="业务分类" :span="8" prop="businessType" ref="businessType">
                    <!-- <el-select
                      v-model="fromdata.businessType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option
                        v-for="businessType in SbusinessType"
                        :key="businessType.label"
                        :label="businessType.label"
                        :value="businessType.label"
                      ></el-option>
                    </el-select>-->
                    <el-input
                      placeholder="请选择"
                      v-model="fromdata.businessType"
                      :title="fromdata.businessType"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showTextType">
                  <el-form-item label="文种" :span="8" prop="textType" ref="textType">
                    <el-select
                      v-model="fromdata.textType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <!-- <el-option
                        v-for="textTypeitem in StextType"
                        :key="textTypeitem.label"
                        :label="textTypeitem.label"
                        :value="textTypeitem.label"
                      ></el-option>-->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showmeetingEndTime">
                  <el-form-item label="会议结束时间" :span="8" prop="meetingEndTime" ref="meetingEndTime">
                    <el-date-picker
                      type="datetime"
                      v-model="fromdata.meetingEndTime"
                      disabled
                      format="yyyy-MM-dd HH:mm:ss"
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
                          @change="secretTypechange"
                          v-model="fromdata.secretType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
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
                      <el-form-item
                        label="秘密标志"
                        :span="8"
                        prop="secretFlagType"
                        ref="secretFlagType"
                      >
                        <el-select
                          @change="workSecurityTab"
                          v-model="fromdata.secretFlagType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
                          <el-option
                            v-for="workSecurityitem in SworkSecretFlag"
                            :key="workSecurityitem.label"
                            :label="workSecurityitem.label"
                            :value="workSecurityitem.label"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 内部信息 -->
                    <el-col :span="8" v-show="secretTypeFlag && !flag && !workSecurityFlag">
                      <el-form-item
                        label="秘密标志"
                        :span="8"
                        prop="secretFlagType"
                        ref="secretFlagType"
                      >
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
                          @change="workSecurityTab"
                          v-model="fromdata.secretLimitType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
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
                          <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                          ></el-option>
                        </el-select>
                        <i class="el-icon-star-off pad_10"></i>
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
                          <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                            disabled
                          ></el-option>
                        </el-select>
                        <i class="el-icon-star-off pad_10"></i>

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
                          <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                          ></el-option>
                        </el-select>
                        <i class="el-icon-star-off pad_10"></i>

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
                          <el-option
                            v-for="secretLimititem in SsecretLimit"
                            :key="secretLimititem.label"
                            :label="secretLimititem.label"
                            :value="secretLimititem.label"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col v-if="showBySecret">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
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
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.secretGists"
                        disabled
                        name="secretGists"
                        style="flex:1"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门" prop="hostDepartment" ref="hostDepartment">
                    <el-input v-model="fromdata.hostDepartment" disabled></el-input>
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
                  <el-form-item label v-if="showImportData">
                    <div class="border_yiju">
                      <el-row v-for="(item) in fromdata.sendBasis" :key="item.id">
                        <el-col :span="20" class="btn_openImport">
                          <el-button
                            type="text"
                            :class="(item.id=='')?'colorBlack':'colorLink'"
                            @click="handleCheckImport(item)"
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
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                        <el-radio v-model="fromdata.isDirect" label="是" disabled>是</el-radio>
                        <el-radio v-model="fromdata.isDirect" label="否" disabled>否</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="直发范围"
                        :span="8"
                        v-if="fromdata.isDirect==='否' ? false :true"
                      >
                        <el-select
                          v-model="fromdata.directRange"
                          disabled
                          placeholder="请选择"
                          style="width:100%"
                        >
                          <el-option
                            v-for="directRangeitem in SdirectRange"
                            :key="directRangeitem.label"
                            :label="directRangeitem.label"
                            :value="directRangeitem.label"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="直发文种类"
                        :span="8"
                        v-if="fromdata.isDirect==='否' ? false :true"
                      >
                        <el-select
                          v-model="fromdata.directType"
                          placeholder="请选择"
                          style="width:100%"
                          disabled
                        >
                          <el-option
                            v-for="directTypeitem in SdirectType"
                            :key="directTypeitem.label"
                            :label="directTypeitem.label"
                            :value="directTypeitem.label"
                          ></el-option>
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
                    <el-select
                      v-model="fromdata.keepLimit"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option
                        v-for="keepLimititem in SkeepLimit"
                        :key="keepLimititem.label"
                        :label="keepLimititem.label"
                        :value="keepLimititem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-if="fromdata.isStandardFile=='是'&&fromdata.ifProtect==1">
                  <el-form-item
                    label="是否经过消保审查"
                    label-width="136px"
                    prop="isNeedCheckcp"
                    ref="isNeedCheckcp"
                  >
                    <el-radio v-model="fromdata.isNeedCheckcp" disabled label="是">是</el-radio>
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
                  <el-form-item label="成文日期" :disabled="true">
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
                  <el-form-item label="发文日期" :disabled="true">
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
                      placeholder="请输入附件标题"
                      disabled
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
                <el-col :span="12">
                  <el-form-item label="会签部门">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.signDepartmentName"
                        disabled
                        placeholder="请选择会签部门"
                        style="flex:1;color: #F00;"
                        class="hqbm"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="8">
                  <el-form-item prop="finishSignDepartmentName" ref="finishSignDepartmentName">
                    <el-input
                      v-model="fromdata.finishSignDepartmentName"
                      disabled
                      placeholder="已完成的会签部门"
                      style="width: 100%;"
                      class="hqbm1"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item :label="formText.outsideSign">
                    <el-input
                      v-model="fromdata.outsideSign"
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="主    送" prop="main" ref="main">
                    <el-input
                      v-model="fromdata.main"
                      type="textarea"
                      resize="none"
                      autosize
                      style="width: 100%;"
                      disabled
                    >
                      <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('zhusong')"></el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="抄    送">
                    <el-input
                      v-model="fromdata.copy"
                      type="textarea"
                      resize="none"
                      autosize
                      style="width: 100%;"
                      disabled
                    >
                      <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('chao')"></el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item :label="formText.inline">
                    <el-input
                      v-model="fromdata.inline"
                      type="textarea"
                      resize="none"
                      autosize
                      style="width: 100%;"
                      disabled
                    >
                      <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('ben')"></el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col>
                  <el-form-item label="重新发送">
                    <el-input
                      v-model="fromdata.newMain"
                      placeholder="请选择重新发送部门"
                      style="width: 100%;"
                      disabled
                    >
                      <el-button slot="append" icon="el-icon-plus" @click="handleSendObj"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="公告至">
                    <el-input
                      v-model="fromdata.realInline"
                      style="width: 100%;"
                      disabled
                    >
                      <el-button slot="append" icon="el-icon-plus" @click="bankmain('gonggao')"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="专栏">
                    <el-select
                      v-model="fromdata.coluCheck"
                      @change="handleColuChange"
                      clearable
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="coluItem in coluData"
                        :key="coluItem"
                        :label="coluItem"
                        :value="coluItem"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>-->
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="签发意见">
                    <!-- <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
                      <div v-if="item.id" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="24"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea" resize="none" autosize
                              :value="item.content"
                              disabled
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        v-model="fromdata.opinionSend"
                        v-if="!(fromdata.opinionSendList && fromdata.opinionSendList.length!=0)"
                        :disabled="true"
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=4)"
                        v-if="!editedIdeaFields.opinionSend"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>-->
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
                  <el-form-item label="核稿意见">
                    <!-- <div v-for="(item) in fromdata.opinionDrafList" :key="item.id">
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        v-model="fromdata.opinionDraf"
                        v-if="!(fromdata.opinionDrafList && fromdata.opinionDrafList.length!=0)"
                        :disabled="true"
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=2)"
                        v-if="!editedIdeaFields.opinionDraf"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>-->
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
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
                      </button>-->
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
                  <el-form-item label="审核意见">
                    <!-- <div v-for="item in fromdata.opinionCheckList" :key="item.id">
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        v-model="fromdata.opinionCheck"
                        v-if="!(fromdata.opinionCheckList && fromdata.opinionCheckList.length!=0)"
                        :disabled="true"
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=1)"
                        v-if="!editedIdeaFields.opinionCheck"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>-->
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
                  <el-form-item label="备注">
                    <!-- <div v-for="(item) in fromdata.commentsList" :key="item.id">
                      <div v-if="item.id" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="24"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea" resize="none" autosize
                              :value="item.content"
                              disabled
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.comments"
                        v-if="!(fromdata.commentsList && fromdata.commentsList.length!=0)"
                        :disabled="true"
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
                <el-col>
                  <el-form-item
                    label="字数超限原因"
                    prop="exceedWordReason"
                    ref="exceedWordReason"
                    v-show="fromdata.isExceed && wordsLimitInfo.wordsLimit!=0"
                  >
                    <!-- <div v-for="(item) in fromdata.exceedWordReasonList" :key="item.id">
                      <div v-if="item.status" class="d_flex blue_size_yuanYin">
                        <el-row class="d_b100">
                          <el-col
                            :span="24"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              :value="item.content"
                              :disabled="true"
                              resize="none"
                              autosize
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        maxlength="500"
                        :placeholder="guReasonFlag?'':'请说明具体原因不能少于10个字'"
                        class="size_yuanYin"
                        resize="none"
                        autosize
                        v-model="fromdata.exceedWordReason"
                        disabled
                        v-if="!(fromdata.isExceed && wordsLimitInfo.wordsLimit!=0)"
                      ></el-input>
                    </div>
                    <opinionText
                      :opinionText="fromdata.exceedWordReasonList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      :flagSize="true"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="正文字数">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-model="fromdata.sizeFact"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分别发送">
                    <el-radio v-model="fromdata.isSeparate" disabled label="是">是</el-radio>
                    <el-radio v-model="fromdata.isSeparate" disabled label="否">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="半电子">
                    <el-radio v-model="fromdata.isArtificial" disabled label="是">是</el-radio>
                    <el-radio v-model="fromdata.isArtificial" disabled label="否">否</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!-- <uploadFiles ref="uploadComponent" @preserve="preserve" :uploadConfig="uploadConfig"></uploadFiles> -->
                <el-col>
                  <div
                    class="file_list_box"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item, index) in  fromdata.attchmentFileInfo"
                        :key="index"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
                            <div class="btns">
                              <!-- <el-button
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
                              >删除</el-button>-->
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
            </div>
            <!-- 专栏 -->
            <h6 class="bank_dispach_file_tit">专栏</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label>
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-model="fromdata.coulBack"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 公告部门 -->
            <h6 class="bank_dispach_file_tit">公告部门</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label>
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-model="fromdata.sendNotice"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 本行 -->
            <h6 class="bank_dispach_file_tit">本行发送</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label>
                    <el-input type="textarea" resize="none" autosize disabled v-model="deptSend"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 外行 -->
            <h6 class="bank_dispach_file_tit">行外发送</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label>
                    <el-input type="textarea" resize="none" autosize disabled v-model="outSend"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 回执 -->
            <h6 class="bank_dispach_file_tit"></h6>
            <div id="scfj" class="height_90"></div>
            <div>
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
    <el-dialog
      :visible.sync="showRegain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="收回"
    >
      <h6 class="back_tit">确定要收回该文件吗?</h6>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showRegain = false">取 消</el-button>
        <el-button type="primary" @click="handleRegain">收 回</el-button>
      </div>
    </el-dialog>
    <!--发送对象弹窗-->
    <el-dialog
      :visible.sync="listSendObjstate"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="发送对象"
    >
      <div class="sendRowButton">
        <el-scrollbar style="height:100%;">
          <el-table class="tableH" :data="sendTableDatas" style="margin-top: 20px">
            <el-table-column
              v-for="(item,index) in sendTableDatasCol"
              :label="item.label"
              :key="item.id"
              :width="flexColumnWidth(item.label,index)"
            >
              <template slot-scope="scope">
                <div>
                  <div :style="{'width':item.width}">
                    <el-checkbox
                      :indeterminate="false"
                      v-model="item.isIndeterminate"
                      @change="checkAll=>handleCheckAllChange(checkAll,index)"
                    >全选</el-checkbox>
                  </div>
                  <div :style="{'width':item.width}">
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="handleCheckedCitiesChange(checkedCities,index)"
                    >
                      <el-checkbox
                        v-for="user in scope.row.orgDprt[index].name"
                        :label="user.deptIds"
                        :value="user.deptIds"
                        :key="user.deptIds"
                      >
                        <span>{{user.deptNames}}</span>
                      </el-checkbox>
                      <div class="clearfix"></div>
                    </el-checkbox-group>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="listSendObjstate = false">取 消</el-button>
        <el-button type="primary" @click="selectSendObj">确定</el-button>
      </div>
    </el-dialog>
    <!-- 发送/特殊发送 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="showSend"
      :modal-append-to-body="false"
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
                    v-model="checkedCities"
                    @change="handleCheckedCitiesChange('outcheck')"
                  >
                    <el-checkbox
                      v-for="user in nowCheckList"
                      :label="user.deptIds"
                      :value="user.deptIds"
                      :key="user.deptIds"
                      :title="user.deptNames"
                      class="checkbox_sendAndSpesend"
                    >{{user.deptNames}}</el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
              </div>
            </template>
          </el-col>
        </el-row>
        <el-divider v-if="handleSendType==1"></el-divider>
        <el-row v-if="handleSendType==1">
          <el-col :span="4">
            <span class="style_zl">专栏</span>
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
        <el-divider v-if="handleSendType==1"></el-divider>
        <el-row v-if="handleSendType==1">
          <el-col :span="4">
            <el-button @click="sendBrandTo">公告至</el-button>
          </el-col>
          <el-col :span="20">
            <template>
              <div class="command_wrap">
                <el-scrollbar>
                  <el-checkbox-group
                    v-model="checkedGonggaoIds"
                    @change="handleCheckedCitiesChange('gongcheck')"
                  >
                    <el-checkbox
                      v-for="user in nowGongGaoCheckList"
                      :label="user.id"
                      :value="user.id"
                      :key="user.id"
                      :title="user.name"
                      class="checkbox_sendAndSpesend"
                    >{{user.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
              </div>
            </template>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSendObjGong">取 消</el-button>
        <el-button type="primary" @click="handleSendConfirm">发 送</el-button>
      </div>
    </el-dialog>
    <!-- 特殊发送 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="specialDialog"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      @close="handleSendObjCancel"
      title="特殊发送"
    >
      <el-row>
        <el-col>
          <!-- 附件 -->
          <el-row class="mgn-b-10">
            <el-col :span="12">
              <h6 class="bank_dispach_file_tit">附件</h6>
            </el-col>
            <el-col v-if="false" :span="12" style="text-align: right;">
              <el-button
                size="small"
                :disabled="uploadConfig.hasFuCheck"
                @click="backbankmain('sendObjAll','noBackShow')"
              >批量选择发送单位</el-button>
            </el-col>
          </el-row>
          <el-row>
            <!-- <loadAccessory></loadAccessory> -->
            <uploadFileSpecial
              @backbankmain="backbankmain"
              ref="uploadSpecialComponent"
              @preserve="preserve"
              :specialDialog="specialDialog"
              :uploadConfig="uploadConfig"
            ></uploadFileSpecial>
          </el-row>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSendObjCancel">取 消</el-button>
        <el-button type="primary" @click="specialSendSave">确 定</el-button>
      </div>
    </el-dialog>
    <!--特殊发送列表-->
    <el-dialog v-dialogDrag title="特殊发送列表" :visible.sync="showSpecialList">
      <m-table
        size="medium"
        :isSelection="false"
        :isIndex="false"
        :isHandle="false"
        :isPagination="false"
        :tableData="spacialArr"
        :tableCols="spacialTableCol"
      ></m-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="showSpecialList = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 办文说明 -->
    <el-dialog
      :visible.sync="showExplain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="办文说明"
    >
      <el-form>
        <el-form-item>
          <el-input
            disabled
            type="textarea"
            resize="none"
            autosize
            rows="20"
            v-model="bwsmFromdata.explain"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!--查看依据文件-->
    <el-dialog
      title="查看依据文件"
      :visible.sync="showImportList"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <table style="width: 100%;">
        <tr>
          <td class="ckyjbt">文号 :</td>
          <td>{{bank_import.documentCode}}</td>
        </tr>
        <tr>
          <td class="ckyjbt">标题 :</td>
          <td>
            <el-button
              type="text"
              style="text-align:left;padding-left:10px;line-height:25px;word-break:break-all;white-space:pre-line;"
              @click="viewFile(bank_import, '1')"
            >{{bank_import.title}}</el-button>
          </td>
        </tr>
        <tr>
          <td class="ckyjbt">附件 :</td>
          <td>
            <el-row v-for="(item) in bank_import.attachList" :key="item.id">
              <el-col :span="18">
                <el-button
                  type="text"
                  @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)"
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
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
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
      @showCompDialog="showCompDialog"
      :fromdata="fromdata"
      :treeTradeCode="treeTradeCode"
      :checkOrg="true"
    ></treeCofig>
    <!--新版特殊发送-->
    <uploadSendFiles
      ref="uploadNewSendFiles"
      :dialogState="dialogSendState"
      @clearNowCheck="clearNowCheck"
      @deletSendInfo="deletSendInfo"
      @newSendToggle="newSendToggle"
      @handleSendObj="handleSendObj"
    ></uploadSendFiles>
  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import minixs from "@/minixs/index";
import isNowUser from "@/minixs/isNowUser";
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";
import mTable from "components/table/mTable.vue";
import uploadFiles from "@/components/uploadFile/uploadFile";
import uploadSendFiles from "@/components/speicalSend/newsend";
import uploadFileSpecial from "@/components/uploadFile/uploadFileSpecial";
import opinionText from "@/components/opinionText/indexDsipatch";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from "@/components/sideBar/sideBar";
import formTextChange from "@/components/formText/index";

const spacialTableCol = [
  { label: "附件名称", prop: "fileName", align: "center" },
  { label: "部门名称", prop: "deptName", align: "center" }
];
const tableCols = [
  { label: "收文单位", prop: "receiveOrgName", align: "center" },
  { label: "发送时间", prop: "createTime", align: "center" },
  { label: "收到时间", prop: "receiveTime", align: "center" },
  { label: "办结时间", prop: "undertakeEndTime", align: "center" },
  { label: "次数", prop: "sendTime", align: "center" }
];

export default {
  name: "BankDispachDone",
  components: {
    timeDialog,
    treeCofig,
    // uploadFiles,
    uploadFileSpecial,
    mTable,
    opinionText,
    uploadSendFiles,
    sideBar
  },
  mixins: [minixs, viewDraft, dispatchIndex, isNowUser],
  data() {
    return {
      formText: {
        inline: "本行发送",
        outsideSign: "行外会签"
      },
      tableCols: tableCols,
      sendFilePeop: [], //有附件人员信息
      sendFilePeopNum: "", //附件序号发送人员
      sendNoFilePeop: false, //无附件发送人员标示
      dialogSendState: false, //新特殊发送
      guReasonFlag: false, //是否有固化超限原因
      teshufasong: false,
      // 特殊发送
      handleSendType: 1,
      specialDialog: false,
      checkedAll: [],
      checkedAllName: "",
      spicalTree: false, //特殊发送专用
      fileListNow: "", //选中特殊发送附件的序号
      // 特殊发送列表
      showSpecial: false,
      showSpecialList: false,
      showSend: false,
      showSendObj: false,
      coluData: [], //专栏数据

      fjmc: [],
      bmmc: [],
      spacialArr: [],
      spacialTableCol: spacialTableCol,

      deptSend: "",
      outSend: "",
      // 底部表格
      tableData1: [],
      shData: [], // 收回部门列表

      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },

      treeTradeCode: "", //人员树交易线
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        sendObjData: [],
        sendObjSpecialFile: [] //当前操作的附件与部门序号
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },

      draftOrganTitle: "",
      titleName: "",
      // 收回
      bank_regain: {
        function: "doWithdrawTask",
        pcsAvyId: "",
        multiTenancyId: "send_order"
      },
      dialogTypeNow: "",
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
        curTplNo: "", // parm.getString("tplNo");
        pcsAvyId: "", // parm.getString("pcsAvyId");
        processInstId: "", // parm.getString("processInstId");
        moduleType: "qb_etc", // parm.getString("moduleType");
        curNodeCode: ""
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
      bank_doSend: {
        function: "finishAndSendSighWf",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        curNodeCode: "",
        tplNo: "",
        pcsAvyId: "",
        multiTenancyId: "",
        processInstId: ""
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
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: "",
        pcsAvyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "toEditOpenSend",
        id: ""
        // id: "1"
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: "行发文"
      },
      //提交
      saveOrUpdateToQianbaoEntity: {
        function: "doSaveOpenSend",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "", //部门人员名字
        sequenceSign: ""
      },
      //主送、抄送
      bank_main: {
        function: "getTcPriDeliveryDic",
        organizationId: "root"
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      timeTest: "",
      coluCheck: "", //专栏选中的项目
      fromdata: {
        function: "",
        attachTitle: "",
        attachSort: [],
        attchmentFileInfo: [],
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
        inline: "",
        haveRead: "",
        hostDepartment: "",
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
        newMainIds: "",
        meetingEndTime: "",
        newMain: "",
        opinionCheck: "",
        opinionCheckList: [],
        opinionDrafList: [],
        opinionSendList: [],
        opinionSignList: [],
        outsideSign: "",
        phone: "",
        realCopy: "",
        realInline: "",
        realInlineIds: "",
        realNewMain: "",
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
        realMain: "",
        coluCheck: "", //专栏选中的项目
        coulBack: "", // 专栏
        sendNotice: ""
      },
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
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
      SbusinessSecret: [],
      SsecretLimit: [],
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
      copyRules: {
        qianBaoTypeName: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择签报类型"
          }
        ],
        submittedName: [
          {
            required: true,
            trigger: ["blur"],
            message: "请输入呈送"
          }
        ],
        qianbaoCode: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择签报字号"
          }
        ],
        handleType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择处理类型"
          }
        ],
        draftDepartmentName: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择拟稿部门"
          }
        ],
        draftUserName: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择联系人"
          }
        ],
        secretType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密类型"
          }
        ],
        workSecretFlag: [
          { required: false, trigger: "change", message: "请选择秘密标志" }
        ],
        secretFlag: [
          { required: false, trigger: "change", message: "请选择秘密标志" }
        ],
        secretLimitType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密期限类型"
          }
        ],
        security: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择密级和保密期限"
          }
        ],
        phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
        title: [{ required: true, trigger: "blur", message: "请输入正文标题" }]
      },
      rules: {
        type: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择发文类型"
          }
        ],
        redHead: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择代字/红头"
          }
        ],
        businessType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择业务分类"
          }
        ],
        textType: [
          { required: true, trigger: ["blur", "change"], message: "请选择文种" }
        ],
        hostDepartment: [
          { required: true, trigger: "blur", message: "请输入主办部门" }
        ],
        userRange: [
          { required: true, trigger: "change", message: "请选择档案利用范围" }
        ],
        isStandardFile: [
          {
            required: true,
            trigger: "change",
            message: "请选择规章/规范性文件"
          }
        ],
        keepLimit: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请输入保管期限"
          }
        ],
        phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
        isDirect: [
          { required: true, trigger: "change", message: "请选择直发文件" }
        ],
        title: [{ required: true, trigger: "blur", message: "请输入正文标题" }],
        main: [{ required: true, trigger: "blur", message: "请选择主送" }],
        name: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
          { min: 3, max: 5, message: "3-5个字", trigger: "blur" }
        ],
        secretType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密类型"
          }
        ],
        secretLimitType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密期限类型"
          }
        ],
        workSecretFlag: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密标志"
          }
        ],
        secretFlagType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密标志"
          }
        ]
      },
      imageUrl: "",
      fileList: [],
      tableData: [
        { date: "处理环节", fileId: "date", title: "center", tache: "1" },
        { date: "处理环节", fileId: "date", title: "center", tache: "1" }
      ],

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
      baoWenZiDuan: this.$businessCode.fawgl,
      appendWriteDialog: true,
      showRegain: false, // 是否收回
      clickTypes: 1,

      sendTableDatas: [{ orgDprt: [] }],
      sendTableDatasCol: [
        // { label: "建行" ,isIndeterminate: false},
      ],
      listSendObjstate: false,
      loadingCheck: false,
      checkedCities: [], //发送对象 选中的数据
      nowCheckList: [], //当前的选中项copy
      // 发送对象参数
      banl_sendObj: {
        function: "getTcDeptTypeDicList"
      },
      //发公告至
      bank_sendnoticetree: {
        function: "unitTreeByFirst",
        flag: true
      },
      //选中对象和公告至 后最终确认发送
      doSendOpenSend: {
        function: "doSendOpenSend"
      },
      gongCheckData: [], //公告选中数据
      // nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      nowUserId: "", //当前用户id
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //套红文件
      bank_findTemplete: {
        function: "findTemplete",
        sendType: "",
        redHead: ""
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: "doRecoverFile",
        id: ""
      },
      // 办文说明
      bwsmFromdata: {
        explain: ""
      },
      showExplain: false,

      // 知悉范围定密依据是否显示
      showBySecret: false,

      // 文种显示
      showTextType: true,
      showmeetingEndTime: false,
      showUnionDepartment: false,
      selectUnionDepartment: false,

      //选中对象和公告至 后最终确认发送
      bank_doFinalSend: {
        function: "doSendOpenSend",
        isSpecial: 0
      },

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
      checkedGonggaoIds: [], //公告的选中的id
      nowGongGaoCheckList: [], //公告至的数据
      collectId: ""
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_fsdx = document.querySelector("#fsdx").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    // 特殊发送列表
    handelcheckSpecial() {
      this.$post
        .postData(
          "selectIsSpecialReceiveBySendOrderId",
          JSON.stringify({
            function: "selectIsSpecialReceiveBySendOrderId",
            id: this.$route.query.redId
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.data) {
            this.showSpecial = true;
            this.spacialArr = [];

            this.fjmc = Object.keys(res.data);
            this.bmmc = Object.values(res.data);
            for (let i = 0; i < this.fjmc.length; i++) {
              let spacialObj = {
                fileName: this.fjmc[i],
                deptName: this.bmmc[i]
              };
              this.spacialArr.push(spacialObj);
            }
          }
        });
      this.showSpecialList = true;
    },
    // 办结
    handleDoFinish() {
      let dofinishOpenSend_form = Object.assign(this.fromdata, {
        function: "dofinishOpenSend",
        tplNo: this.fromdata.pTplNo
      });
      this.$post
        .postData(
          "dofinishOpenSend",
          JSON.stringify(dofinishOpenSend_form),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          this.$message({
            type: "success",
            offset: 400,
            showClose: true,
            message: "办结成功",
            duration: 1000,
            onClose: () => {
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            }
          });
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

    // 发送/特殊发送
    handleSend(val) {
      this.handleSendType = val;
      this.fromdata.newMainIds = "";
      if (val == 2) {
        this.dialogSendState = true;
      } else {
        this.$api.adminConfig.createColumn({}).then(res => {
          let transArr = [];
          res.data.forEach(element => {
            transArr.push(element.zlSslm);
          });
          console.log(transArr);
          this.coluData = transArr;
          this.showSend = true;
        });
        this.showSend = true;
      }
    },
    handleColuChange(val) {
      this.coluCheck = val;
    },
    //校验是否配置发文岗
    async checkNowUserAuthor() {
      this.bank_doFinalSend.isSpecial = 1;
      let backState = false;
      let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
      obj.function = "checkUser";
      // 添加校验所选部门是否有发文岗
      await this.$post
        .postData("checkUser", JSON.stringify(obj), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success) {
            backState = true;
          } else {
            this.$confirm(res.message, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                return;
              })
              .catch(() => {
                return;
              });
            backState = false;
          }
        });
      return backState;
    },
    handleSendConfirm(sendFlag) {
      let that = this;
      // if(this.fromdata.type == '会议纪要'&&(!this.fromdata.meetingEndTime || this.fromdata.meetingEndTime=="")) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "会议结束时间不能为空！",
      //     duration: 2000
      //   });
      //   return;
      // }
      if (this.coluCheck == "") {
        if (
          this.checkedCities.length <= 0 &&
          this.checkedGonggaoIds.length <= 0
        ) {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择要发送的部门或公告",
            duration: 2000
          });
          return;
        }
        if (
          this.checkedCities.length <= 0 &&
          this.checkedGonggaoIds.length > 0
        ) {
          this.$confirm("没有选择发送对象，是否继续并完结？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.bank_doFinalSend.isSpecial = 0;
              let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
              obj.function = "checkUser";
              obj.againSendType = this.againSendType;
              // 添加校验所选部门是否有发文岗
              this.$post
                .postData(
                  "checkUser",
                  JSON.stringify(obj),
                  this.$businessCode.fawgl
                )
                .then(res => {
                  if (res && res.success) {
                    obj.function = "doSendOpenSend";
                    this.$post
                      .postData(
                        "doSendOpenSend",
                        JSON.stringify(obj),
                        this.$businessCode.fawgl
                      )
                      .then(res => {
                        if (res && res.success && !res.message) {
                          this.cancelSendObjGong();
                          this.$message({
                            type: "success",
                            offset: 400,
                            showClose: true,
                            message: "发送成功",
                            duration: 1500,
                            onClose: () => {
                              window.location.href = "about:blank";
                              if (
                                !(
                                  localStorage.getItem("st").indexOf("smarto") >
                                  -1
                                )
                              ) {
                                window.opener.location.reload();
                              }
                              window.close();
                            }
                          });
                        } else if (res && res.success && res.message !== "") {
                          this.$confirm(res.message, "提示", {
                            confirmButtonText: "确定",
                            showCancelButton: false,
                            type: "warning"
                          }).then(() => {
                            window.location.href = "about:blank";
                            if (
                              !(
                                localStorage.getItem("st").indexOf("smarto") >
                                -1
                              )
                            ) {
                              window.opener.location.reload();
                            }
                            //window.close();不需要关闭
                          });
                        } else {
                          // this.showSend = false;
                          let transMessage = res.message;
                          // let beginIndex = transMessage.indexOf("[");
                          // transMessage = transMessage.substring(
                          //   beginIndex + 1,
                          //   transMessage.length
                          // );
                          // let lastIndex = transMessage.lastIndexOf("]");
                          // transMessage = transMessage.substring(0, lastIndex);
                          transMessage = transMessage.replace(
                            "[ERRORCODE=YDCP8COMB001]",
                            ""
                          );
                          this.$message({
                            type: "error",
                            offset: 400,
                            showClose: true,
                            message: transMessage,
                            duration: 1500
                            // onClose: () => {
                            //   window.location.href = "about:blank";
                            //   window.opener.location.reload();
                            //   window.close();
                            // }
                          });
                        }
                      })
                      .catch(erro => {
                        this.$message({
                          type: "error",
                          offset: 400,
                          showClose: true,
                          message: erro.message,
                          duration: 2000
                        });
                      });
                  } else {
                    this.$confirm(res.message, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    })
                      .then(() => {
                        return;
                      })
                      .catch(() => {
                        return;
                      });
                  }
                });
            })
            .catch(() => {
              return;
            });
        } else {
          if (this.handleSendType === 1) {
            let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
            obj.function = "checkUser";
            obj.againSendType = this.againSendType;
            // 添加校验所选部门是否有发文岗
            this.$post
              .postData(
                "checkUser",
                JSON.stringify(obj),
                this.$businessCode.fawgl
              )
              .then(res => {
                if (res && res.success) {
                  // obj.isSpecial = 0; //发送
                  obj.function = "doSendOpenSend";
                  obj.userMap = res.data;
                  this.$post
                    .postData(
                      "doSendOpenSend",
                      JSON.stringify(obj),
                      this.$businessCode.fawgl
                    )
                    .then(res => {
                      if (res && res.success && !res.message) {
                        this.cancelSendObjGong();
                        this.$message({
                          type: "success",
                          offset: 400,
                          showClose: true,
                          message: "发送成功",
                          duration: 1500,
                          onClose: () => {
                            window.location.href = "about:blank";
                            if (
                              !(
                                localStorage.getItem("st").indexOf("smarto") >
                                -1
                              )
                            ) {
                              window.opener.location.reload();
                            }
                            window.close();
                          }
                        });
                      } else if (res && res.success && res.message !== "") {
                        this.$confirm(res.message, "提示", {
                          confirmButtonText: "确定",
                          showCancelButton: false,
                          type: "warning"
                        }).then(() => {
                          window.location.href = "about:blank";
                          if (
                            !(localStorage.getItem("st").indexOf("smarto") > -1)
                          ) {
                            window.opener.location.reload();
                          }
                          window.close();
                        });
                      } else {
                        // this.showSend = false;
                        let transMessage = res.message;
                        // let beginIndex = transMessage.indexOf("[");
                        // transMessage = transMessage.substring(
                        //   beginIndex + 1,
                        //   transMessage.length
                        // );
                        // let lastIndex = transMessage.lastIndexOf("]");
                        // transMessage = transMessage.substring(0, lastIndex);
                        transMessage = transMessage.replace(
                          "[ERRORCODE=YDCP8COMB001]",
                          ""
                        );
                        this.$message({
                          type: "error",
                          offset: 400,
                          showClose: true,
                          message: transMessage,
                          duration: 1500
                          // onClose: () => {
                          //   window.location.href = "about:blank";
                          //   window.opener.location.reload();
                          //   window.close();
                          // }
                        });
                      }
                    })
                    .catch(erro => {
                      this.$message({
                        type: "error",
                        offset: 400,
                        showClose: true,
                        message: erro.message,
                        duration: 2000
                      });
                    });
                } else {
                  this.$confirm(res.message, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  })
                    .then(() => {
                      return;
                    })
                    .catch(() => {
                      return;
                    });
                }
              });
          } else if (this.handleSendType === 2) {
            //特殊发送
            if (!this.checkedCities.length && !this.dialogSendState) {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: "请选择发送对象"
              });
              return;
            }
            this.checkNowUserAuthor(this.dialogSendState).then(backData => {
              if (backData) {
                if (sendFlag != "new") {
                  this.specialDialog = true;
                }
                let aa = [];
                this.checkedAll = [];

                let faChecks = [];
                let commonGongDatas = [];
                let commonFaDatas = [];
                this.nowGongGaoCheckList.map(item => {
                  aa.push({ id: item.id, text: item.name });
                });

                this.bank_doFinalSend.isSpecial = 1; //特殊发送
                let namesBu = [];
                this.nowCheckList.map(node => {
                  namesBu.push(node.deptNames);
                  faChecks.push({ id: node.deptIds, text: node.deptNames });
                });
                if (aa.length) {
                  commonGongDatas = [{ content: aa, typeName: "公告至" }];
                }
                if (faChecks.length) {
                  commonFaDatas = [
                    { content: faChecks, typeName: "发送对象至" }
                  ];
                }
                this.checkedAll = [].concat(commonFaDatas, commonGongDatas);
                namesBu = namesBu.length ? namesBu.join(",") : "";
                if (!that.fromdata.sendOrderNoticeInfo) {
                  that.checkedAllName = that.uploadConfig.checkedAllName = namesBu;
                } else {
                  that.checkedAllName = that.uploadConfig.checkedAllName =
                    that.fromdata.sendOrderNoticeInfo.split(";")[1] +
                    "," +
                    namesBu;
                }
                that.$forceUpdate();
                //处理 特殊发送的附件 与发送人员的关系
                let hasFileInfo = "";
                let sendInfo = []; //带附件的发送人员
                let sendNoFileInfo = []; //无附件的发送人员
                that.sendFilePeop.map(n => {
                  n.map(m => {
                    if (!m.nofile) {
                      sendInfo.push(m);
                    } else {
                      sendNoFileInfo.push(m);
                    }
                  });
                });
                if (that.sendNoFilePeop) {
                  sendInfo.map(n => {
                    that.nowCheckList.map(m => {
                      if (n.deptIds == m.deptIds) {
                        if (hasFileInfo) {
                          hasFileInfo += "," + n.deptNames;
                        } else {
                          hasFileInfo += n.deptNames;
                        }
                      }
                    });
                  });
                } else {
                  sendNoFileInfo.map(n => {
                    that.nowCheckList.map(m => {
                      if (n.deptIds == m.deptIds) {
                        if (hasFileInfo) {
                          hasFileInfo += "," + n.deptNames;
                        } else {
                          hasFileInfo += n.deptNames;
                        }
                      }
                    });
                  });
                }
                if (hasFileInfo) {
                  that.$message({
                    type: "error",
                    typestate: "tipsForFile",
                    showClose: true,
                    offset: 400,
                    message:
                      "发送单位" +
                      hasFileInfo +
                      "不能同时在无附件发送和有附件发送中",
                    duration: 1500
                  });
                  return;
                } else {
                  if (sendFlag == "new" && !that.sendNoFilePeop) {
                    that.listSendObjstate = false;
                    that.sendFilePeop[that.sendFilePeopNum] = [].concat(
                      that.nowCheckList
                    );
                    that.$refs.uploadNewSendFiles.setSendPeopData(
                      that.nowCheckList
                    );
                  }

                  if (that.sendNoFilePeop) {
                    that.listSendObjstate = false;
                    that.$refs.uploadNewSendFiles.setSendPeopData(
                      that.nowCheckList
                    );
                    that.sendFilePeop[that.sendFilePeopNum] = []
                      .concat(that.nowCheckList)
                      .filter(nf => {
                        nf.nofile = true;
                        return nf;
                      });
                  }
                }
              }
            });
          }
        }
      } else if (this.coluCheck != "") {
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
        let transGongIds = "";
        if (
          Object.prototype.toString.call(this.checkedGonggaoIds) ==
          "[object Array]"
        ) {
          transGongIds = this.checkedGonggaoIds.join(";");
        } else {
          transGongIds = this.checkedGonggaoIds;
        }
        this.$api.adminConfig
          .createColumn({
            zlSslm: this.coluCheck,
            zlWh: this.fromdata.documentNo, // 文号
            zlTitle: this.fromdata.title, // 标题
            attachId: "", // 附件id
            attachTitle: "", // 附件名称
            fileName: this.fromdata.fileName, // 正文名称
            filePath: this.fromdata.filePath, // 正文路径
            attachTitleId: this.$route.query.redId, // 表单id
            noiceDeptId: transGongIds
          })
          .then(res => {
            if (res.code == "SUCCESS") {
              let receiveId = res.id;
              this.$api.setSysConfig
                .saveFile({
                  id: receiveId,
                  fileId: this.fromdata.attchmentFileInfo,
                  fileType: "0"
                })
                .then(res => {});
              if (
                this.checkedCities.length <= 0 &&
                this.checkedGonggaoIds.length > 0
              ) {
                this.$confirm("没有选择发送对象，是否继续并完结？", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    let obj = Object.assign(
                      this.fromdata,
                      this.bank_doFinalSend
                    );
                    obj.function = "checkUser";
                    obj.againSendType = this.againSendType;
                    // 添加校验所选部门是否有发文岗
                    this.$post
                      .postData(
                        "checkUser",
                        JSON.stringify(obj),
                        this.$businessCode.fawgl
                      )
                      .then(res => {
                        if (res && res.success) {
                          obj.function = "doSendOpenSend";
                          this.$post
                            .postData(
                              "doSendOpenSend",
                              JSON.stringify(obj),
                              this.$businessCode.fawgl
                            )
                            .then(res => {
                              if (res && res.success && !res.message) {
                                this.cancelSendObjGong();
                                this.$message({
                                  type: "success",
                                  offset: 400,
                                  showClose: true,
                                  message: "发送成功",
                                  duration: 1500,
                                  onClose: () => {
                                    window.location.href = "about:blank";
                                    if (
                                      !(
                                        localStorage
                                          .getItem("st")
                                          .indexOf("smarto") > -1
                                      )
                                    ) {
                                      window.opener.location.reload();
                                    }
                                    window.close();
                                  }
                                });
                              } else if (
                                res &&
                                res.success &&
                                res.message !== ""
                              ) {
                                this.$confirm(res.message, "提示", {
                                  confirmButtonText: "确定",
                                  showCancelButton: false,
                                  type: "warning"
                                }).then(() => {
                                  window.location.href = "about:blank";
                                  if (
                                    !(
                                      localStorage
                                        .getItem("st")
                                        .indexOf("smarto") > -1
                                    )
                                  ) {
                                    window.opener.location.reload();
                                  }
                                  window.close();
                                });
                              } else {
                                // this.showSend = false;
                                let transMessage = res.message;
                                let beginIndex = transMessage.indexOf("[");
                                transMessage = transMessage.substring(
                                  beginIndex + 1,
                                  transMessage.length
                                );
                                let lastIndex = transMessage.lastIndexOf("]");
                                transMessage = transMessage.substring(
                                  0,
                                  lastIndex
                                );
                                this.$message({
                                  type: "error",
                                  offset: 400,
                                  showClose: true,
                                  message: transMessage,
                                  duration: 1500
                                  // onClose: () => {
                                  //   window.location.href = "about:blank";
                                  //   window.opener.location.reload();
                                  //   window.close();
                                  // }
                                });
                              }
                            })
                            .catch(erro => {
                              this.$message({
                                type: "error",
                                offset: 400,
                                showClose: true,
                                message: erro.message,
                                duration: 2000
                              });
                            });
                        } else {
                          this.$confirm(res.message, "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                          })
                            .then(() => {
                              return;
                            })
                            .catch(() => {
                              return;
                            });
                        }
                      });
                  })
                  .catch(() => {
                    return;
                  });
              } else {
                if (this.handleSendType === 1) {
                  let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
                  obj.function = "checkUser";
                  obj.againSendType = this.againSendType;
                  // 添加校验所选部门是否有发文岗
                  this.$post
                    .postData(
                      "checkUser",
                      JSON.stringify(obj),
                      this.$businessCode.fawgl
                    )
                    .then(res => {
                      if (res && res.success) {
                        // obj.isSpecial = 0; //发送
                        obj.function = "doSendOpenSend";
                        obj.userMap = res.data;
                        this.$post
                          .postData(
                            "doSendOpenSend",
                            JSON.stringify(obj),
                            this.$businessCode.fawgl
                          )
                          .then(res => {
                            if (res && res.success && !res.message) {
                              this.cancelSendObjGong();
                              this.$message({
                                type: "success",
                                offset: 400,
                                showClose: true,
                                message: "发送成功",
                                duration: 1500,
                                onClose: () => {
                                  window.location.href = "about:blank";
                                  if (
                                    !(
                                      localStorage
                                        .getItem("st")
                                        .indexOf("smarto") > -1
                                    )
                                  ) {
                                    window.opener.location.reload();
                                  }
                                  window.close();
                                }
                              });
                            } else if (
                              res &&
                              res.success &&
                              res.message !== ""
                            ) {
                              this.$confirm(res.message, "提示", {
                                confirmButtonText: "确定",
                                showCancelButton: false,
                                type: "warning"
                              }).then(() => {
                                window.location.href = "about:blank";
                                if (
                                  !(
                                    localStorage
                                      .getItem("st")
                                      .indexOf("smarto") > -1
                                  )
                                ) {
                                  window.opener.location.reload();
                                }
                                window.close();
                              });
                            } else {
                              // this.showSend = false;
                              let transMessage = res.message;
                              // let beginIndex = transMessage.indexOf("[");
                              // transMessage = transMessage.substring(
                              //   beginIndex + 1,
                              //   transMessage.length
                              // );
                              // let lastIndex = transMessage.lastIndexOf("]");
                              // transMessage = transMessage.substring(
                              //   0,
                              //   lastIndex
                              // );
                              transMessage = transMessage.replace(
                                "[ERRORCODE=YDCP8COMB001]",
                                ""
                              );
                              this.$message({
                                type: "error",
                                offset: 400,
                                showClose: true,
                                message: transMessage,
                                duration: 1500
                                // onClose: () => {
                                //   window.location.href = "about:blank";
                                //   window.opener.location.reload();
                                //   window.close();
                                // }
                              });
                            }
                          })
                          .catch(erro => {
                            this.$message({
                              type: "error",
                              offset: 400,
                              showClose: true,
                              message: erro.message,
                              duration: 2000
                            });
                          });
                      } else {
                        this.$confirm(res.message, "提示", {
                          confirmButtonText: "确定",
                          cancelButtonText: "取消",
                          type: "warning"
                        })
                          .then(() => {
                            return;
                          })
                          .catch(() => {
                            return;
                          });
                      }
                    });
                } else if (this.handleSendType === 2) {
                  //特殊发送
                  if (!this.checkedCities.length) {
                    this.$message({
                      type: "error",
                      offset: 400,
                      showClose: true,
                      message: "请选择发送对象"
                    });
                    return;
                  }
                  this.checkNowUserAuthor().then(backData => {
                    if (backData) {
                      this.specialDialog = true;
                      let aa = [];
                      this.checkedAll = [];

                      let faChecks = [];
                      let commonGongDatas = [];
                      let commonFaDatas = [];
                      this.nowGongGaoCheckList.map(item => {
                        aa.push({ id: item.id, text: item.name });
                      });

                      this.bank_doFinalSend.isSpecial = 1; //特殊发送
                      let namesBu = [];
                      this.nowCheckList.map(node => {
                        namesBu.push(node.deptNames);
                        faChecks.push({
                          id: node.deptIds,
                          text: node.deptNames
                        });
                      });
                      if (aa.length) {
                        commonGongDatas = [{ content: aa, typeName: "公告至" }];
                      }
                      if (faChecks.length) {
                        commonFaDatas = [
                          { content: faChecks, typeName: "发送对象至" }
                        ];
                      }
                      this.checkedAll = [].concat(
                        commonFaDatas,
                        commonGongDatas
                      );
                      namesBu = namesBu.length ? namesBu.join(",") : "";
                      if (!that.fromdata.sendOrderNoticeInfo) {
                        that.checkedAllName = that.uploadConfig.checkedAllName = namesBu;
                      } else {
                        that.checkedAllName = that.uploadConfig.checkedAllName =
                          that.fromdata.sendOrderNoticeInfo.split(";")[1] +
                          "," +
                          namesBu;
                      }
                      that.$forceUpdate();
                    }
                  });
                }
              }
            }
          });
      }
    },
    // 关闭/取消发送
    cancelSendObjGong() {
      this.showSend = false;
      this.checkedCities = [];
      this.nowCheckList = [];
      this.checkedGonggaoIds = [];
      this.nowGongGaoCheckList = [];
      this.uploadConfig.sendObjData = [];
      this.uploadConfig.uploadInfo = [];
      this.uploadConfig.sendObjSpecialFile = [];
      this.fromdata.sendOrderNoticeInfo = "";
      this.coluCheck = "";
    },
    // 特殊发送
    specialSendSave() {
      let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
      obj.isSpecial = 1;
      obj.function = "doSendOpenSend";
      let noFileObj = []; //无附件 发送对象
      let noFileGong = []; //无附件 公告至
      let noFileBumen =
        (this.checkedAllName && this.checkedAllName.split(",")) || [];
      obj.specialSend = [
        // {
        //   "fileId": "",//无附件时为空
        //   "main": "",// 发送对象 无附件的部门id
        //   "copy": "",
        //   "inline": ""// 公告至 无附件的部门id
        // }
      ];

      if (this.uploadConfig.uploadInfo && this.uploadConfig.uploadInfo.length) {
        obj.specialSend = this.uploadConfig.uploadInfo.filter(d => {
          return d.main;
        });
        this.nowCheckList.map(item => {
          noFileBumen.map(node => {
            if (item.deptNames == node) {
              noFileObj.push(item.deptIds);
            }
          });
        });
        this.nowGongGaoCheckList.map(item => {
          noFileBumen.map(node => {
            if (item.name == node) {
              noFileGong.push(item.id);
            }
          });
        });
        if (noFileObj.length) {
          obj.specialSend.push({
            fileId: "", //无附件时为空
            main: noFileObj.join(",") // 发送对象 无附件的部门id
            // copy: "",
            // inline: noFileGong.join(",") // 公告至 无附件的部门id
          });
        }
      } else {
        obj.specialSend[0] = {
          fileId: ""
        };
        obj.specialSend[0].main = this.checkedCities.join(",");
        // obj.specialSend[0].inline = this.checkedGonggaoIds.join(",");
      }
      this.$post
        .postData(
          "doSendOpenSend",
          JSON.stringify(obj),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success && !res.message) {
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "发送成功",
              duration: 1500
            });
            this.showSpecial = true;
            //特殊发送数据清空
            this.clearSpicalData();
            location.reload();
          } else {
            let transMessage = res.message;
            // 1216 fu gai long
            // let beginIndex = transMessage.indexOf("[");
            // transMessage = transMessage.substring(
            //   beginIndex + 1,
            //   transMessage.length
            // );
            // let lastIndex = transMessage.lastIndexOf("]");
            // transMessage = transMessage.substring(0, lastIndex);
            transMessage = transMessage.replace("[ERRORCODE=YDCP8COMB001]", "");
            console.log("1" + transMessage);
            transMessage = transMessage.replace("[", ":");
            console.log("2" + transMessage);
            transMessage = transMessage.replace("]", "");
            console.log("3" + transMessage);
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: transMessage,
              duration: 2000
            });
            // location.reload();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 2000
          });
          location.reload();
        });
    },
    backbankmain(data, type, n) {
      this.needBack = type == "needBackShow" ? true : false;
      this.dialogTypeNow = data;
      this.dialogTit = "选择发送对象";
      this.spicalTree = true;
      this.canTab = true;
      this.treeData = [];
      this.fileListNow = n;
      this.dialogType = data;
      this.showCompDialog();
      this.treeData = this.checkedAll;
    },
    clearSpicalData() {
      this.showSend = false;
      this.specialDialog = false;
      this.uploadConfig.uploadInfo = [];
      this.nowCheckList = [];
      this.checkedCities = [];
    },
    handleSendObjCancel() {
      this.fromdata.sendObjData = [];
      this.$refs.uploadSpecialComponent.nowFilesListClear();
      this.specialDialog = false;
    },

    //新版特殊发送
    newSendToggle(d, data) {
      this.nowCheckList = [];
      if (!d) {
        this.dialogSendState = false;
      } else {
        this.sendSpecialSave(data);
      }
    },
    deletSendInfo(d) {
      //操作发送信息
      this.sendFilePeop.splice(d, 1);
    },
    clearNowCheck() {
      this.nowCheckList = [];
    },
    sendSpecialSave(data) {
      let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
      let names = [];
      let ids = [];
      obj.isSpecial = 1;
      obj.function = "doSendOpenSend";
      obj.specialSend = [];
      data.map(n => {
        if (n.fileId != "nofile") {
          obj.specialSend.push({
            fileId: n.fileId,
            main: n.SENDPEOPID,
            copy: "",
            inline: "" //无附件的部门id
          });
        } else {
          obj.specialSend.push({
            fileId: "", //无附件时为空
            main: n.SENDPEOPID || "" // 发送对象 无附件的部门id
          });
        }
        if (n.SENDPEOPID) {
          ids.push(n.SENDPEOPID);
          names.push(n.SENDPEOP);
        }
      });
      this.fromdata.realMain = ids.join(",") + ";" + names.join(",");
      this.fromdata.realNewMain = ids.join(",") + ";" + names.join(",");
      this.fromdata.newMainIds = ids.join(",");
      this.$post
        .postData(
          "doSendOpenSend",
          JSON.stringify(obj),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success && !res.message) {
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "发送成功",
              duration: 1500
            });
            this.dialogSendState = false;
            this.showSpecial = true;
            this.sendFilePeop = [];
            location.reload();
          } else if (res && res.success && res.message !== "") {
            this.$confirm(res.message, "提示", {
              confirmButtonText: "确定",
              type: "warning"
            }).then(() => {
              this.dialogSendState = false;
              this.showSpecial = true;
              this.sendFilePeop = [];
              location.reload();
            });
          } else {
            let transMessage = res.message;
            // let beginIndex = transMessage.indexOf("[");
            // transMessage = transMessage.substring(
            //   beginIndex + 1,
            //   transMessage.length
            // );
            // let lastIndex = transMessage.lastIndexOf("]");
            // transMessage = transMessage.substring(0, lastIndex);
            // 1216 fu gai long
            transMessage = transMessage.replace("[ERRORCODE=YDCP8COMB001]", "");
            transMessage = transMessage.replace("[", ":");
            transMessage = transMessage.replace("]", "");
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: transMessage || res.message,
              duration: 2000
            });
            // location.reload();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: erro.message,
            duration: 2000
          });
        });
    },
    // 选择重发对象
    handleSendObj(d, f) {
      let that = this;
      //附件发送人员序号/无附件发送人员标示
      this.sendFilePeopNum = d;
      this.sendNoFilePeop = f;
      this.loadingCheck = true;
      this.listSendObjstate = true;
      this.sendTableDatas = [];
      if (that.dialogSendState) {
        that.checkedCities = [];
        // that.nowCheckList = [];
      }
      this.$post
        .postData(
          "getTcDeptTypeDicList",
          JSON.stringify(this.banl_sendObj),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.loadingCheck = false;
          this.sendTableDatas = [{ orgDprt: [] }];
          this.sendTableDatasCol.splice(0);
          let dataList = res.data;
          if (that.dialogSendState) {
            if (that.sendFilePeop[that.sendFilePeopNum]) {
              that.sendFilePeop[that.sendFilePeopNum].map(n => {
                that.checkedCities.push(n.deptIds);
              });
            }
          }

          for (let i = 0; i < dataList.length; i++) {
            let temp = dataList[i];
            let checkA = 0; //选中个数
            this.$set(this.sendTableDatasCol, i, {
              label: temp.typeName,
              isIndeterminate: false
            });
            this.sendTableDatas[0].orgDprt[i] = { name: [] };
            if (temp.deptIds) {
              let idArr = temp.deptIds.split(";");
              let nameArr = temp.deptNames.split(";");

              for (let j = 0; j < idArr.length; j++) {
                var transArr = { deptIds: idArr[j], deptNames: nameArr[j] };
                this.sendTableDatas[0].orgDprt[i].name.push(transArr);
                that.checkedCities.map(elem => {
                  if (elem == idArr[j]) {
                    //是否全选处理
                    checkA++;
                  }
                });
              }
              if (checkA == idArr.length) {
                this.$set(this.sendTableDatasCol, i, {
                  label: temp.typeName,
                  isIndeterminate: true
                });
              }
            }
          }
        });
    },
    //表头宽度调整
    flexColumnWidth(name, row) {
      let flexWidth = 100;
      let labelLen = 0;
      let colNames = [];
      if (
        !this.sendTableDatas[0] ||
        !this.sendTableDatas[0].orgDprt.length ||
        !this.listSendObjstate
      ) {
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
      flexWidth = labelLen * 15;
      this.sendTableDatasCol[row].width = flexWidth + 40 + "px";
      return flexWidth + 80 + "px";
    },
    //发送公告至
    sendBrandTo() {
      this.bankmain("gonggao");
    },
    handleCheckAllChange(val, n) {
      let nowLists = [];
      nowLists = this.sendTableDatas[0].orgDprt[n].name; //当前操作列表
      val
        ? this.sendTableDatas[0].orgDprt[n].name.forEach(item => {
            this.checkedCities.push(item.deptIds);
          })
        : (this.checkedCities = []);
      this.sendTableDatasCol[n].isIndeterminate = val;
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
      } else {
        this.nowCheckList.map(hascheck => {
          this.checkedCities.push(hascheck.deptIds);
        });
      }
    },
    handleCheckedCitiesChange(value, n) {
      let cancelId = "";
      let oldIds = [];
      let checkedCount = 0;
      let newCheckLists = [];
      if (value === "outcheck") {
        //去除 发送对象 全选
        this.nowCheckList = this.nowCheckList.filter(item => {
          let hasF = false;
          oldIds.push(item.deptIds);
          this.checkedCities.forEach(node => {
            if (node === item.deptIds) {
              hasF = true;
            }
          });
          return hasF;
        });
        cancelId = oldIds.filter(id => {
          return this.checkedCities.indexOf(id) == -1;
        })[0];
        this.sendTableDatas[0].orgDprt.forEach((node, row) => {
          let cancelNum = 0;
          node.name.forEach(list => {
            if (list.deptIds === cancelId) {
              this.sendTableDatasCol[row].isIndeterminate = false;
            }
          });
        });
        let names = [];
        this.$nextTick(() => {
          this.checkedCities.forEach(node => {
            this.nowCheckList.forEach(item => {
              if (item.deptIds == node) {
                names.push(item.deptNames);
              }
            });
          });
          this.fromdata.newMain = names.join(";");
          this.fromdata.realNewMain = this.checkedCities.length
            ? this.checkedCities.join(",") + ";" + names.join(",")
            : "";
          this.fromdata.realMain = this.checkedCities.length
            ? this.checkedCities.join(",") + ";" + names.join(",")
            : "";
          this.fromdata.newMainIds = this.checkedCities.join(",");
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
        let transGongName = [];
        this.nowGongGaoCheckList.forEach(item => {
          transGongName.push(item.name);
        });
        this.checkIds = this.checkedGonggaoIds;
        this.fromdata.sendOrderNoticeInfo = this.checkIds
          ? this.checkIds.join(",") + ";" + transGongName.join(",")
          : "";
        return;
      }

      value.forEach(item => {
        this.sendTableDatas[0].orgDprt[n].name.forEach(node => {
          if (item === node.deptIds) {
            newCheckLists.push({
              deptIds: node.deptIds,
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
          if (node.deptIds === item.deptIds) {
            hasF = false;
          }
        });
        return hasF;
      });
      //过滤右侧已勾选项
      newCheckLists = newCheckLists.filter(item => {
        let hasF = true;
        this.nowCheckList.forEach(node => {
          if (node.deptIds === item.deptIds) {
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
        : this.nowCheckList.filter(item => item.deptIds != value.deptIds);
      this.$forceUpdate();
    },
    //选中对象数据
    selectSendObj() {
      if (this.dialogSendState) {
        //无附件发送人员校验
        this.handleSendType = 2;
        this.handleSendConfirm("new");
        return;
      } else {
        this.handleSendType = 1;
        this.listSendObjstate = false;
      }
    },

    // 收回
    handleShowRegain() {
      this.showRegain = true;
    },
    handleRegain() {
      this.bank_regain.pcsAvyId = this.fromdata.pcsAvyId;
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify(this.bank_regain),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          this.showRegain = false;
          this.$message({
            type: "success",
            offset: 400,
            showClose: true,
            message: "发送成功",
            duration: 1500,
            onClose: () => {
              window.location.href = "about:blank";
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
              window.close();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "后端返回失败",
            duration: 1000
          });
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
          text: names[n]
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
          this.checkIds = this.fromdata.newMainIds
            ? this.fromdata.newMainIds.split(",")
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
        // case "ben":
        //   this.checkIds = this.fromdata.inlineIds
        //     ? this.fromdata.inlineIds.split(",")
        //     : [];
        //   this.checkData = this.benCheckData;
        //   break;
        case "gonggao":
          this.checkIds = this.checkedGonggaoIds;
          this.checkData = this.gongCheckData;
          // this.checkIds = this.fromdata.inlineIds
          //   ? this.fromdata.inlineIds.split(",")
          //   : [];
          // this.checkData = this.benCheckData;
          break;
        case "finishAndSendSighWf":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype, radio) {
      let judge = true;
      let that = this;
      if (this.dialogType === "dosend") {
        judge = this.saveCheck();
      }
      if (!judge) {
        return;
      }
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let gongId = []; //公告至
        let gongName = []; //公告至名字
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let nodesname = []; //发送对象
        let allnodesname = []; //发送对象 和 公告至
        let hasFilesObj = []; //发送对象的id
        let hasFileGong = []; //公告至对象的id
        let zhuBenNames = [];

        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
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

          gongId = ids.join(";");
          gongName = names.join(";");
          zhuBenNames = names.join(";");
          names = names.join(";");
          ids = ids.join(";");
          newIds = newIds.join(";");
          newNames = newNames.join(";");
        } else {
          names = "";
          ids = "";
          gongId = "";
          gongName = "";
          newIds = "";
          newNames = "";
          zhuBenNames = "";
          that.checkIds = [];
        }

        switch (type) {
          case "zhusong":
            this.fromdata.main = this.fromdata.main
              ? this.fromdata.main + "、" + names.replace(/[;]/g, "、")
              : names.replace(/[;]/g, "、");
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            this.preserve();
            break;
          case "chao":
            this.fromdata.copy = this.fromdata.copy
              ? this.fromdata.copy + "、" + names.replace(/[;]/g, "、")
              : names.replace(/[;]/g, "、");
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = this.fromdata.inline
              ? this.fromdata.inline + "、" + names.replace(/[;]/g, "、")
              : names.replace(/[;]/g, "、");
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
            break;
          case "hui":
            let obj = Object.assign(that.createSighWf, {
              processInstId: that.fromdata.processInstId,
              multiTenancyId: that.fromdata.multiTenancyId,
              pcsAvyId: that.fromdata.pcsAvyId,
              tplNo: that.fromdata.pTplNo,
              curNodeCode: that.fromdata.currentNodeId,
              deptIds: that.fromdata.deptIds,
              deptNames: that.fromdata.deptNames,
              sequenceSign: that.bank_doSend.sequenceSign,
              id: that.fromdata.id,
              deptIds: ids,
              deptNames: names
            });
            if (this.addSendType === "1") {
              obj.function = "checkPostHelpSubWf";
              that.$post
                .postData(
                  "checkPostHelpSubWf",
                  JSON.stringify(obj),
                  that.$businessCode.ggfawgl
                )
                .then(res => {
                  if (res && res.success) {
                    that.fromdata.signDepartmentName = names;
                    that.fromdata.signDepartmentId = ids;
                    that.huiCheckData = ids.length ? that.checkData : [];
                    // that.createSighWf.deptIds = ids;
                    // that.createSighWf.deptNames = names;
                    that.createSighWf.tplNo = that.fromdata.pTplNo;
                    that.createSighWf.curNodeCode = that.fromdata.currentNodeId;
                    that.createSighWf.processInstId =
                      that.fromdata.processInstId;
                    that.createSighWf.multiTenancyId =
                      that.fromdata.multiTenancyId;
                    that.createSighWf.pcsAvyId = that.fromdata.pcsAvyId;
                    that.createSighWf.id = that.fromdata.id;
                    that.bank_doSend.sequenceSign = radio; //1 是 0否
                    if (!ids.length) {
                      that.checkIds = [];
                    }
                    // if (this.addSendType === "1") {
                    //   this.handleSendHQPtmt(newIds, newNames);
                    // }
                    this.handleSendHQPtmt(newIds, newNames);
                    that.$forceUpdate();
                  } else {
                    if (!ids) {
                      that.fromdata.signDepartmentName = "";
                      that.fromdata.signDepartmentId = "";
                      that.huiCheckData = [];
                      return;
                    }

                    that.$forceUpdate();
                    that
                      .$confirm(res.message, "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                      })
                      .then(() => {
                        return;
                      })
                      .catch(() => {
                        return;
                      });
                  }
                });
            } else {
              that.fromdata.signDepartmentName = names;
              that.fromdata.signDepartmentId = ids;
              that.huiCheckData = ids.length ? that.checkData : [];
              // that.createSighWf.deptIds = ids;
              // that.createSighWf.deptNames = names;
              that.createSighWf.tplNo = that.fromdata.pTplNo;
              that.createSighWf.curNodeCode = that.fromdata.currentNodeId;
              that.createSighWf.processInstId = that.fromdata.processInstId;
              that.createSighWf.multiTenancyId = that.fromdata.multiTenancyId;
              that.createSighWf.pcsAvyId = that.fromdata.pcsAvyId;
              that.createSighWf.id = that.fromdata.id;
              that.bank_doSend.sequenceSign = radio; //1 是 0否
              if (!ids.length) {
                that.checkIds = [];
              }
            }

            if (
              that.fromdata.currentNode === "综合处理" &&
              that.fromdata.signDepartmentName
            ) {
              that.showHQ = true;
            }
            break;

          case "dw":
            this.fromdata.unionDepartment = names;
            this.fromdata.unionDepartmentIds = ids;
            this.unCheckData = this.checkData;
            break;
          case "dosend":
            this.bank_doSend.nextUserName = names;
            this.bank_doSend.nextUserId = ids;
            this.bank_doSend.nextNodeId = params.id;
            this.bank_doSend.nextNodeName = params.name;
            break;
          case "gonggao":
            this.fromdata.sendOrderNoticeInfo = gongId
              ? gongId.replace(/[;]/g, ",") +
                ";" +
                gongName.replace(/[;]/g, ",")
              : "";
            this.gongCheckData = this.nowGongGaoCheckList = this.checkData;
            this.checkedGonggaoIds = ids ? ids.split(";") : "";
            this.fromdata.realInline = names;
            this.fromdata.realInlineIds = ids;
            break;
          case "sendObj":
            allnodesname = [].concat(
              this.checkedAllName ? this.checkedAllName.split(",") : []
            );
            //筛选发送对象 与 公告至
            this.checkedCities.map(item => {
              that.checkIds.map(node => {
                if (node == item) {
                  hasFilesObj.push(item); //发送对象的id
                }
              });
            });
            this.checkedGonggaoIds.map(item => {
              that.checkIds.map(node => {
                if (node == item) {
                  hasFileGong.push(item); //公告至对象的id
                }
              });
            });
            if (this.handleSendType == 1) {
              this.fromdata.sendObjData = this.checkData;
            } else {
              this.uploadConfig.sendObjData[this.fileListNow] = [];
              this.uploadConfig.sendObjData[this.fileListNow] = this.checkData;

              //附件与所选部门拼接
              this.uploadConfig.uploadInfo[this.fileListNow] = {
                fileId:
                  (this.uploadConfig.uploadInfo[this.fileListNow] &&
                    this.uploadConfig.uploadInfo[this.fileListNow].fileId) ||
                  "", //无附件时为空
                main: hasFilesObj.join(","), // 发送对象 附件的部门id
                // copy: "",
                inline: hasFileGong.join(",") // 公告至 附件的部门id
              };
            }

            // this.uploadConfig.checkChange = !this.uploadConfig.checkChange;
            allnodesname.filter(node => {
              let hasNode = true;
              this.checkData.map(item => {
                if (node == item.text) {
                  hasNode = false;
                }
              });
              if (hasNode) {
                nodesname.push(node);
              }
              return hasNode;
            });
            this.checkedAllName = this.uploadConfig.checkedAllName = nodesname.join(
              ","
            );
            this.$forceUpdate();
            this.$refs.uploadSpecialComponent.nowFilesListCheck();
            break;
          case "sendObjAll":
            this.checkedCities.map(item => {
              that.checkIds.map(node => {
                if (node == item) {
                  hasFilesObj.push(item); //发送对象的id
                }
              });
            });
            this.checkedGonggaoIds.map(item => {
              that.checkIds.map(node => {
                if (node == item) {
                  hasFileGong.push(item); //公告至对象的id
                }
              });
            });
            allnodesname = [].concat(
              this.checkedAllName ? this.checkedAllName.split(",") : []
            );
            this.uploadConfig.sendObjSpecialFile.map(node => {
              this.uploadConfig.sendObjData[
                node
              ] = this.fromdata.sendObjData = this.checkData;
              this.uploadConfig.uploadInfo[node] = {
                fileId: "0990b93a0f4248e8a0c8b3f9cd817881", //无附件时为空
                main: hasFilesObj.join(","), // 发送对象 附件的部门id
                // copy: "",
                inline: hasFileGong.join(",") // 公告至 附件的部门id
              };
            });
            // this.uploadConfig.checkChange = !this.uploadConfig.checkChange;
            allnodesname.filter(node => {
              let hasNode = true;
              this.checkData.map(item => {
                if (node == item.text) {
                  hasNode = false;
                }
              });
              if (hasNode) {
                nodesname.push(node);
              }
              return hasNode;
            });
            this.checkedAllName = this.uploadConfig.checkedAllName = nodesname.join(
              ","
            );
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
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },

    //选择人员后 确定完成并发送
    saveSending() {
      this.$post
        .postData(
          "finishAndSendSighWf",
          JSON.stringify(this.bank_doSend),
          this.baoWenZiDuan
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
            window.location.href = "about:blank";
            if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
              window.opener.location.reload();
            }
            window.close();
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
      let judge = true;
      judge = this.saveCheck();
      if (!judge) {
        return;
      }
      this.preserve();

      this.dialogTit = "选择会签人";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "finishAndSendSighWf";
      this.dialogType = "hui";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      console.log(this.bank_selectConfig);

      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          // this.bank_send.tplNo = res.data && res.data[0].PTPLNO;
          // this.bank_send.multiTenancyId =
          //   res.data && res.data[0].MULTITENANCYID;
          let parms = Object.assign(this.fromdata, this.bank_send);
          parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
          parms.multiTenancyId = res.data[0].MULTITENANCYID;
          parms.tplNo = res.data[0].PTPLNO;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(parms),
              this.$businessCode.ggfawgl
            )
            .then(res => {
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
      console.log(this.fromdata.main);
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
    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      this.scrollIntoForm();
      if (!this.flag) {
        if (!this.secretLimitType) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: tips,
            duration: 1000
          });
          return false;
        }
      }
      if (
        !this.fromdata.type ||
        !this.fromdata.redHead ||
        !this.fromdata.documentNo ||
        !this.fromdata.businessType ||
        !this.fromdata.textType ||
        !this.fromdata.secretType ||
        !this.fromdata.hostDepartment ||
        !this.fromdata.phone ||
        !this.fromdata.isDirect ||
        !this.fromdata.userRange ||
        !this.fromdata.title ||
        !this.fromdata.isStandardFile ||
        !this.fromdata.keepLimit
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      } else {
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
      }
    },
    //主送
    bankmain(n, state) {
      let name = "";
      switch (n) {
        case "zhusong":
          this.loadingTree = false;
          name = "主送";
          break;
        case "chao":
          this.loadingTree = false;
          name = "抄送";
          break;
        case "hui":
          name = "会签";
          break;
        case "dw":
          name = "单位";
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
          break;
        case "sendObj":
          this.dialogTypeNow = "sendObj";
          name = "选择发送对象";
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
      if (n === "dw") {
        this.hasRadio = false;
        this.canTab = false;
        this.singelCheckF = false;
      }
      if (n === "gonggao") {
        // this.loadingTree = true;
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.addSendType = state;
      this.showCompDialog();
      if (n === "hui" || n === "dw") {
        this.$post
          .postData(
            "selUnitTreeByHQ",
            JSON.stringify(this.bank_mainXiao),
            this.$businessCode.ggfawgl
          )
          .then(res => {
            if (res.message == "Loading") {
              this.loadingTree = true;
            } else {
              this.loadingTree = false;
            }
            this.treeData = (res && res.data) || [];
          });
      } else if (n === "gonggao") {
        this.$post
          .postData(
            // "sendnoticetree",
            "unitTreeByFirst",
            JSON.stringify(this.bank_sendnoticetree),
            this.$businessCode.ggfawgl
          )
          .then(res => {
            this.treeData = (res && res.data) || [];
          });
      } else if (n === "sendObj") {
        this.treeData = this.checkedAll;
      } else if (n === "ben") {
        this.$post
          .postData(
            "getTcSendObjDic",
            JSON.stringify({ function: "getTcSendObjDic" }),
            this.$businessCode.fawgl
          )
          .then(res => {
            this.treeData = (res && res.data) || [];
            if (this.treeData.length) {
              this.treeData.forEach(item => {
                item.content = JSON.parse(item.content);
                if (n === "ben") {
                  item.text = item.typeName;
                }
              });
            }
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
                if (item.typeName) {
                  item.text = item.typeName;
                }
              });
            }
          });
      }
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEdit() {
      let that = this;
      this.bank_dispach.choseYear = this.$route.query.choseYear || "";
      this.$post
        .postData(
          "toEditOpenSend",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl
        )
        .then(res => {
          that.$route.query.readonlyFwcy ?? this.getIsNowUser(res);
          console.log(res);
          if (res && res.success) {
            if (res.data.isSpecialHead && res.data.isSpecialHead == "1") {
              that.draftOrganTitle =
                res.data && res.data.draftDepartment + "电子发文处理单";
            } else {
              that.draftOrganTitle =
                res.data && res.data.draftOrgan + "电子发文处理单";
            }
            if (res.data.secretType) {
              this.secretTypechange(res.data.secretType, true);
            }
            if (res.data.secretLimitType) {
              this.workSecurityTab(res.data.secretLimitType, true);
            }
            // that.fromdata = res.data;
            Object.assign(that.fromdata, res.data, true);

            that.nowUserId = res.data.currentUserId || "";

            this.timeTest = res.data.meetingEndTime;
            this.fromdata.realInline = "";

            that.fromdata.sendBasis =
              (res.data.sendBasis && JSON.parse(res.data.sendBasis)) || [];
            that.showImportData = that.fromdata.sendBasis.length > 0;

            if (
              that.fromdata.type == "行发文" ||
              that.fromdata.type == "部门发文" ||
              that.fromdata.type == "党务发文"
            ) {
              that.showTextType = true;
              that.showmeetingEndTime = false;
              that.showUnionDepartment = true;
            } else if (that.fromdata.type === "会议纪要") {
              that.showmeetingEndTime = true;
              that.showTextType = false;
              that.showUnionDepartment = false;
            } else {
              that.showTextType = false;
              that.showmeetingEndTime = false;
              that.showUnionDepartment = false;
              this.fromdata.textType = "";
            }

            that.bwsmFromdata.explain = res.data.explain
              ? res.data.explain
              : "";

            this.bank_doSend.curNodeCode = res.data.curNodeCode;
            this.bank_doSend.tplNo = res.data.tplNo;
            this.bank_doSend.pcsAvyId = res.data.pcsAvyId;
            this.bank_doSend.multiTenancyId = res.data.multiTenancyId;
            this.bank_doSend.processInstId = res.data.processInstId;
            this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
            this.banjiedispatch.curTplNo = res.data.pTplNo;
            this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
            this.banjiedispatch.processInstId = res.data.processInstId;
            this.banjiedispatch.curNodeCode = res.data.curNodeCode;
            this.bank_selectConfig.curNodeId = res.data.currentNodeId;
            this.bank_selectConfig.curTplNo = res.data.tplNo;
            this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;
            this.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;

            this.createSighWf.processInstId = res.data.processInstId;
            this.createSighWf.id = this.bank_dispach.id;
            this.createSighWf.multiTenancyId = res.data.multiTenancyId;
            this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            this.createSighWf.curTplNo = res.data.pTplNo;
            this.createSighWf.curNodeCode = res.data.curNodeCode;
            this.createSighWf.sequenceSign = "0";

            if (this.fromdata.secretType && this.fromdata.secretType !== "") {
              this.showBySecret = true;
            } else {
              this.showBySecret = false;
            }

            if (this.fromdata.isSeparate == "是") {
              this.teshufasong = true;
            } else {
              this.teshufasong = false;
            }

            that.fromdata.opinionCheckList =
              res.data &&
              res.data.opinionCheckList &&
              JSON.parse(res.data.opinionCheckList);
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
            that.fromdata.mainSend =
              res.data && res.data.mainSend && JSON.parse(res.data.mainSend);
            that.fromdata.exceedWordReasonList =
              res.data &&
              res.data.exceedWordReasonList &&
              JSON.parse(res.data.exceedWordReasonList);
            //正文字数超限原因 临时原因
            // let hasReasonFlag = false;
            // if (
            //   that.fromdata.exceedWordReasonList &&
            //   that.fromdata.exceedWordReasonList.length
            // ) {
            //   that.fromdata.exceedWordReasonList.map(exceed => {
            //     if (exceed.status == 0) {
            //       that.fromdata.exceedWordReason = exceed.content;
            //       hasReasonFlag = true;
            //     } else {
            //       this.guReasonFlag = true;
            //     }
            //   });
            // }
            // that.wordsLimitInfo.draftWords = that.fromdata.sizeFact;
            // that.wordsLimitInfo.wordsLimit = that.fromdata.sizeLimit || 0;

            if (res.data.realNewMain) {
              this.checkedCities = res.data.realNewMain
                .split(";")[0]
                .split(",");
              console.log(this.checkedCities);
            }
            if (res.data.newMainIds) {
              this.zhuCheckData = this.concatTreeData(
                res.data.newMainIds,
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

            this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
            this.fromdata.attachSort = [];
          }
          // 获取发过的专栏
          that.$api.adminConfig
            .coluBack({ zlwh: that.fromdata.documentNo })
            .then(res => {
              if (res && res.data) {
                that.fromdata.coulBack = res.data[0].zlSslm;
              }
            });

          that.$post
            .postData(
              "getByfawenId",
              JSON.stringify({
                function: "getByfawenId",
                sendOrderId: that.$route.query.redId
              }),
              that.$businessCode.fawgl
            )
            .then(res => {
              that.tableData1 = res.data ? res.data : [];
              if (that.tableData1.length > 0) {
                that.tableData1.map(node => {
                  if (node.lowerBankFlag == "下级上报上级行") {
                    that.downToUpProcessInstId = node.processInstId;
                  }
                });
              }

              // let transObj = {processInstId: '', name: '', userName: '', orgId: ''}

              // that.tableData1.forEach(element => {
              //   transObj.processInstId = element.processInstId
              //   transObj.name = element.receiveOrgName
              //   transObj.userName = element.userName
              //   transObj.orgId = element.receiveOrgId
              //   that.shData.push(transObj)
              //   transObj = {processInstId: '', name: '', userName: '', orgId: ''}
              // });
              this.$post
                .postData(
                  "toReceiveDeptData",
                  JSON.stringify({
                    function: "toReceiveDeptData",
                    shData: res.data
                  }),
                  this.$businessCode.fawgl
                )
                .then(res => {
                  this.deptSend = res.data.deptSend;
                  this.outSend = res.data.outSend;
                });
            });
        });
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.baoWenZiDuan
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
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "bankDispachFinishBlueId"
      );
      this.saveOrUpdateToQianbaoEntity.sequenceSign = 0;
      var obj = Object.assign(this.fromdata, this.saveOrUpdateToQianbaoEntity);
      this.$post
        .postData(
          "doSaveOpenSend",
          JSON.stringify(obj),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            // this.saveOrUpdateToQianbaoEntity.id = this.bank_dispach.id =
            //   res.data.id;
            // this.bank_toQianbaoSend.id = res.data.id;
            // sessionStorage.setItem("signpageid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
              if (type === "uploadfile") {
                this.uploadConfig.id = res.data.id;
                this.$refs.uploadComponent.uploadFileNow();
              }
            }
            this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
            this.banjiedispatch.tplNo = res.data.pTplNo;
            this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
            this.banjiedispatch.processInstId = res.data.processInstId;
            this.banjiedispatch.curNodeCode = res.data.curNodeCode;
            this.bank_doSend.curNodeCode = res.data.curNodeCode;
            this.bank_doSend.tplNo = res.data.tplNo;
            this.bank_doSend.pcsAvyId = res.data.pcsAvyId;
            this.bank_doSend.multiTenancyId = res.data.multiTenancyId;
            this.bank_doSend.processInstId = res.data.processInstId;
            this.bank_selectConfig.curNodeId = res.data.currentNodeId;
            this.bank_selectConfig.tplNo = res.data.tplNo;
            this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;
            this.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;

            this.createSighWf.processInstId = res.data.processInstId;
            this.createSighWf.id = this.bank_dispach.id;
            this.createSighWf.curMultiTenancyId = res.data.multiTenancyId;
            this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            this.createSighWf.curTplNo = res.data.pTplNo;
            this.createSighWf.curNodeCode = res.data.curNodeCode;
            this.createSighWf.sequenceSign = "0";

            this.toEdit();
          }
        });
      // .catch(error => {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: error.message,
      //     duration: 1000
      //   });
      // });
    },
    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    //发送会签部门
    huiqianSend() {
      this.preserve();
      var obj = Object.assign(this.fromdata, this.createSighWf);
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
        .postData("createSighWf", JSON.stringify(obj), this.$businessCode.fawgl)
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
      var obj = Object.assign(this.fromdata, this.banjiedispatch);
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.ggfawgl)
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
            //     window.close();
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
          self.$businessCode.fawglfj
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
          type: "error",
          offset: 100,
          showClose: true,
          message: "请先起草正文",
          duation: 500
        });
        return;
      }
      this.getFileInfo(that).then(res => {
        if (res.state) {
          this.doDraft(res);
        }
      });
    },
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
    //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: getFormId(this.$route.query.id, "bankDispachId"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          tmpFileName: fileInfo ? fileInfo.fileNameTh : "",
          tmpFilePath: fileInfo ? fileInfo.filePathTh : "",
          isHasRedHead: fileInfo && fileInfo.fileNameTh ? true : false,
          pageFlag: "fawen",
          processInstId: this.fromdata.processInstId,
          flowTranId: this.$businessCode.fawgl //流程交易线    chai
        }
      });
      this.showDraft = false;
      let str = "";
      if (this.fromdata.documentNo) {
        str = this.fromdata.documentNo + this.fromdata.title;
      } else {
        str = this.fromdata.title;
      }
      localStorage.setItem("saveSpecialFileName", str);
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 删除此文
    delectArticle() {
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "bankDispachFinishBlueId"
      );
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      this.bank_DeleteSendOrder.id = deletesendorderid;

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
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.ggfawgl
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
        path: "/dzfwcld",
        query: {
          id: this.fromdata.sendOrderId,
          choseYear: this.$route.query.choseYear || ""
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "FWGL"
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
                    JYcode: this.$businessCode.fawglfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.fawgl //流程交易线    chai
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
          self.$businessCode.fawglfj
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
    // 办文说明
    handleExplain() {
      this.showExplain = true;
    },
    handleSave() {},
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
    //删除意见
    deletService(type, n) {
      if (type === "qianfa") {
        this.fromdata.opinionSendList.splice(n, 1);
      } else if (type === "hegao") {
        this.fromdata.opinionDrafList.splice(n, 1);
      } else if (type === "huiqian") {
        this.fromdata.opinionSignList.splice(n, 1);
      }
    },
    // 商业秘密
    workSecurityTabTime(value) {
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    workSecurityTab(value, type) {
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
        this.fromdata.secretFlagContent = "";
      }
      if (type && this.fromdata.secretFlagType === "商业秘密") {
        this.fromdata.secretFlagType = "";
      }

      this.$forceUpdate();
      this.rules = this.copyRules;
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    secretTypechange(value, type) {
      //type 回显处理
      if (value == "商业秘密") {
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
        //this.copyRules.secretLimitType[0].required = true;
        //this.copyRules.secretFlagType[0].required = true;
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = false;
        this.copyRules.secretFlag[0].required = true;
        this.secretOptionsFlag = [].concat(this.SsecretFlag);
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = true;
        // this.copyRules.secretFlagType[0].required = true;
        this.secretOptionsFlag = [].concat(this.SworkSecretFlag);
      } else {
        this.flag = false;
        this.secretTypeFlag = false;
        this.workSecurityFlag = false;
      }
      if (!type) {
        this.fromdata.secretFlagType = "";
        this.fromdata.secretFlag = "";
        this.fromdata.secretLimitType = "";
        this.fromdata.secretFlagType = "";
      }
      this.$refs.fromdata.clearValidate();
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
          this.$businessCode.fawglfj
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
          this.$businessCode.fawglfj
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
                duration: 500
              });
            }
          }
        });
    }
  },
  watch: {
    checkedCities: {
      handler(neww) {
        let names = [];
        if (!this.listSendObjstate) {
          return;
        }
        this.$nextTick(() => {
          neww.forEach(node => {
            this.nowCheckList.forEach(item => {
              if (item.deptIds == node) {
                names.push(item.deptNames);
              }
            });
          });
          this.fromdata.newMain = names.join(";");
          this.fromdata.realNewMain = neww.length
            ? neww.join(",") + ";" + names.join(",")
            : "";
          this.fromdata.realMain = neww.length
            ? neww.join(",") + ";" + names.join(",")
            : "";
          this.fromdata.newMainIds = neww.join(",");
        });
      },
      deep: true
    }
  },
  created() {
    this.formText = formTextChange("send");
    //初始化加载数据
    this.bank_dispach.id = this.bank_doSend.id = this.uploadConfig.id = getFormId(
      this.$route.query.id,
      "bankDispachFinishBlueId"
    );
    this.collectId = this.$route.query.redId || "";
    this.titleName = this.$route.query.title;
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl; //完成并发送 树   流程交易线   chai
    this.$post
      .postData(
        "selectIsSpecialReceiveBySendOrderId",
        JSON.stringify({
          function: "selectIsSpecialReceiveBySendOrderId",
          id: this.$route.query.redId
        }),
        this.$businessCode.fawgl
      )
      .then(res => {
        if (res && res.data) {
          this.showSpecial = true;
          this.spacialArr = [];

          this.fjmc = Object.keys(res.data);
          this.bmmc = Object.values(res.data);
          for (let i = 0; i < this.fjmc.length; i++) {
            let spacialObj = {
              fileName: this.fjmc[i],
              deptName: this.bmmc[i]
            };
            this.spacialArr.push(spacialObj);
          }
        }
      });
    this.toEdit();
    this.$api.adminConfig.createColumn({}).then(res => {
      let transArr = [];
      res.data.forEach(element => {
        transArr.push(element.zlSslm);
      });
      console.log(transArr);
      this.coluData = transArr;
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
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}

.send_content {
  width: 100%;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  margin: 10px 0;
}
.send_ps {
  line-height: 20px;
  b {
    color: red;
  }
}
.command_wrap {
  height: 200px;
  width: 100%;
  .el-checkbox-group {
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.clearfix {
  overflow: hidden;
}
.sendObj_h {
  width: 100%;
  white-space: nowrap;
  display: inline-block;
  background: rgb(238, 241, 246);
  color: rgb(96, 98, 102);
  padding: 10px;
}
.el-checkbox {
  padding: 3px 0;
  float: left;
  width: 100%;
}
.sendRowButton {
  padding: 10px;
  height: 400px;
  /deep/ .el-table__body,
  /deep/ .el-table__header {
    table-layout: auto;
  }
  /deep/ .el-table__body-wrapper {
    padding-right: 20px;
  }
  .el-checkbox-group {
    height: 500px;
    white-space: nowrap;
  }
  .tableH {
    .el-checkbox-group {
      height: auto;
      white-space: nowrap;
      width: fit-content;
    }
  }
  /deep/ .el-table {
    overflow: scroll;
    width: fit-content;
    max-width: fit-content;
  }
  /deep/ .el-table::before {
    display: none;
  }
  /deep/ .el-table td {
    white-space: nowrap;
    // width: fit-content;
    vertical-align: top;
    div {
      white-space: nowrap;
    }
  }
  /deep/ .el-table th {
    overflow: scroll;
    vertical-align: top;
  }

  /deep/ .el-table .cell {
    overflow: visible;
    white-space: nowrap;
    word-break: break-all;
    width: fit-content;
    max-height: 300px;
  }
}
.back_tit {
  font-size: 16px;
  line-height: 26px;
  color: #409eff;
  margin-bottom: 10px;
}
.dialog_regain {
  padding-bottom: 20px;
  h6 {
    font-size: 16px;
    line-height: 30px;
    margin-bottom: 20px;
  }
}
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
/deep/ .checkbox_sendAndSpesend {
  width: 12% !important;
  :nth-last-child(1) {
    width: 90% !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }
}
</style>
