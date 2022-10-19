<template>
  <div id="bankDispachDone" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>电子发文已办处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="maintenance">维护</el-button>
          <el-button size="small" plain v-show="bank_selectConfig.curNodeId != '800'&& smoaButtonFlag" @click="processScheduling">流程调度</el-button>
          <el-button size="small" plain v-show="smoaButtonFlag" @click="drafting(0)">查看正文</el-button>
          <!-- <el-button size="small" plain @click="handleFile" v-show="bank_selectConfig.curNodeId=='800'">归档</el-button> -->
          <el-button size="small" plain @click="handleFile" v-show="isRecentTowYear&&bank_selectConfig.curNodeId == '800'&& smoaButtonFlag">归档</el-button>
          <el-button size="small" plain @click="handleFileNew" v-show="isShowFileNew&&bank_selectConfig.curNodeId == '800'&& smoaButtonFlag">区块链归档</el-button>
          <el-button size="small" plain v-show="smoaButtonFlag" @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain v-show="smoaButtonFlag" @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain v-show="smoaButtonFlag" @click="collect('send', bank_dispach.id, unitId)">收藏</el-button>
          <el-button size="small" v-show="false" plain @click="handleHide">隐藏按钮</el-button>
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
      </div> -->

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current">
              当前环节：
              <span>{{fromdata.signState=='0'?'正在会签':fromdata.currentNode}}</span>
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
                    <el-select
                      v-model="fromdata.textType"
                      style="width:100%"
                      disabled
                    >
                      <!-- <el-option
                        v-for="textTypeitem in StextType"
                        :key="textTypeitem.label"
                        :label="textTypeitem.label"
                        :value="textTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showmeetingEndTime">
                  <el-form-item
                    label="会议结束时间"
                    :span="8"
                    prop="meetingEndTime"
                    ref="meetingEndTime"
                  >
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
                      <el-form-item label="秘密标志" :span="8" prop="secretFlagType" ref="secretFlagType">
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
                  <el-form-item label="主办部门" prop="hostDepartment" ref="hostDepartment">
                    <el-input v-model="fromdata.hostDepartment" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿人" prop="draftUser" ref="draftUser" :disabled="fromdata.state==1">
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
                <el-col :span="24">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                        <el-radio v-model="fromdata.isDirect" label="是" disabled>是</el-radio>
                        <el-radio v-model="fromdata.isDirect" label="否" disabled>否</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                      <el-form-item label="直发范围" :span="8">
                        <el-select v-model="fromdata.directRange" disabled placeholder="请选择" style="width:100%">
                          <el-option
                            v-for="directRangeitem in SdirectRange"
                            :key="directRangeitem.label"
                            :label="directRangeitem.label"
                            :value="directRangeitem.label"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                      <el-form-item label="直发文种类" :span="8">
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
                  <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime" :disabled="fromdata.state==1">
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
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.attachTitle" placeholder="请输入附件标题" disabled></el-input>
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
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.signDepartmentName"
                      placeholder="请选择会签部门"
                      style="width: 100%;"
                      disabled
                    >
                      <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="finishSignDepartmentName" ref="finishSignDepartmentName">
                    <el-input
                      v-model="fromdata.finishSignDepartmentName"
                      disabled
                      type="textarea"
                      resize="none"
                      autosize
                      placeholder="已完成的会签部门"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item :label="formText.outsideSign">
                    <el-input v-model="fromdata.outsideSign" type="textarea" resize="none" autosize disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="主    送" prop="main" ref="main">
                    <el-input
                      type="textarea" resize="none" autosize
                      v-model="fromdata.main"
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
                      type="textarea" resize="none" autosize
                      v-model="fromdata.copy"
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
                      type="textarea" resize="none" autosize
                      v-model="fromdata.inline"
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
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
                      </button> -->
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
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
                      </button> -->
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        v-model="fromdata.opinionCheck"
                        v-if="!(fromdata.opinionCheckList && fromdata.opinionCheckList.length!==0)"
                        :disabled="true"
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=1)"
                        v-if="!editedIdeaFields.opinionCheck"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button> -->
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
                    <template>
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
                      </div> -->
                      <div class="fix_height">
                        <el-input
                          type="textarea" resize="none" autosize
                          v-model="fromdata.comments"
                          v-if="!(fromdata.commentsList && fromdata.commentsList.length!==0)"
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
                    </template>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="字数超限原因" prop="exceedWordReason" ref="exceedWordReason" v-show="fromdata.isExceed && wordsLimitInfo.wordsLimit!=0">
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
                    </div> -->
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
                        v-if="fromdata.isExceed && wordsLimitInfo.wordsLimit<=0"
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
                  <div class="file_list_box" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                    <el-scrollbar>
                      <div v-for="(item, index) in  fromdata.attchmentFileInfo" :key="index" class="comp_list">  
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span class="down" :title="item.fileName" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)">{{item.fileName}}</span>
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
                              >删除</el-button> -->
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
            <h6 class="bank_dispach_file_tit" v-if="bank_selectConfig.curNodeId == '800'">专栏</h6>
            <div id="scfj" class="height_90" v-if="bank_selectConfig.curNodeId == '800'"></div>
            <div v-if="bank_selectConfig.curNodeId == '800'">
              <el-row>
                <el-col>
                  <el-form-item label="">
                    <el-input type="textarea" resize="none" autosize disabled v-model="fromdata.coulBack"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 公告部门 -->
            <h6 class="bank_dispach_file_tit" v-if="bank_selectConfig.curNodeId == '800'">公告部门</h6>
            <div id="scfj" class="height_90" v-if="bank_selectConfig.curNodeId == '800'"></div>
            <div v-if="bank_selectConfig.curNodeId == '800'">
              <el-row>
                <el-col>
                  <el-form-item label="">
                    <el-input type="textarea" resize="none" autosize disabled v-model="fromdata.sendNotice"></el-input>
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
                    :isIndex="false"
                    :tableData="tableData1"
                    :tableCols="tableCols"
                    :isPagination="false"
                  ></m-table>
                </el-col>
              </el-row>
            </div>
          </el-form>
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

        <!-- 办文说明 -->
        <el-dialog
          :visible.sync="showExplain"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
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
        <!--查看依据文件-->
        <el-dialog
          title="查看依据文件"
          :visible.sync="showImportList"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
        >
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
      </div>
    </div>
    <treeCopy
      :treeData="treeData"
      :defaultUser="defaultUser"
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
      :loadingTree="loadingTree"
      :treeTradeCode="treeTradeCode"
    ></treeCopy>
    <reasonTips
      @chaoChuTiSYuanY="chaoChuTiSYuanY"
      @drafting="drafting"
      ref="reasonTipsDom"
      :wordsLimitInfo="wordsLimitInfo"
    ></reasonTips>
  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
import minixs from "@/minixs/index";
import reasonTips from "@/components/wordReason/reason.vue";
import timeDialog from "@/components/timedialog/timedialog";
import uploadFiles from "@/components/uploadFile/uploadFile";
import treeCopy from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
import mTable from "components/table/mTable.vue";
import opinionText from "@/components/opinionText/indexDsipatch";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from '@/components/sideBar/sideBar';
import formTextChange from '@/components/formText/index';

export default {
  name: "BankDispachDone",
  components: {
    mTable,
    timeDialog,
    treeCopy,
    reasonTips,
    opinionText,
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
      guReasonFlag: false, //是否有固化超限原因
      treeTradeCode: "",
      unitId: '',
      // 底部表格
      tableData1: [],
      tableCols: [
        { label: "收文单位", prop: "receiveOrgName", align: "center" },
        { label: "发送时间", prop: "createTime", align: "center" },
        { label: "收到时间", prop: "receiveTime", align: "center" },
        { label: "办结时间", prop: "undertakeEndTime", align: "center" },
        { label: "次数", prop: "sendTime", align: "center" }
      ],

      defaultUser:{},//完成并发送默认值
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

      // 办文说明
      bwsmFromdata: {
        explain: ""
      },
      showExplain: false,

      draftOrganTitle: '',
      titleName: '',
      // 收回
      bank_regain: {
        function: 'doWithdrawTask',
        pcsAvyId: '',
        multiTenancyId: ''
      },
      dialogTypeNow: "",
      
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
      // 流程调度
      bank_flowConfig: {
        function: "selWfNode",
        curMultiTenancyId: "",
        curTplNo: "",
        wfeUnitId: ''
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
        function: "doSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        curNodeCode: "",
        tplNo: "",
        pcsAvyId: "",
        multiTenancyId: "",
        processInstId: "",
        isSystem: "1" // 流程调度标识（流程调度的单子不能收回）
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
        function: "getAllNodeInfo",
        curNodeId: "",
        curTplNo: "",
        pTplNo: "",
        multiTenancyId: "",
        pcsAvyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "toEdit",
        id: "",
        unitId: ""
        // id: "1"
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: "行发文"
      },
      //提交
      saveOrUpdateToQianbaoEntity: {
        function: "saveOrUpdateSign",
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
        mainIds: "",
        meetingEndTime: "",
        opinionCheck: "",
        opinionCheckList: [],
        opinionDrafList: [],
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
        wfeUnitId: '',
        eleSendSecretType: "",
        sizeFact: "", //正文字数
        isExceed: 0, // 是否超限 1超 0未超
        sizeLimit: 0, // 正文限制字数
        isModifyFile: 0, //1标示本文件签发后又进行了修改 0无
        coulBack: "", // 专栏
        exceedWordReasonList: []
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
      // nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      nowUserId: '', //当前用户id
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

      // 知悉范围定密依据是否显示
      showBySecret: false,

      // 是否能被收回
      readFlag:"",
      allowBack:"",

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

      // 文种显示
      showTextType: true,
      showmeetingEndTime: false,
      showUnionDepartment: false,
      selectUnionDepartment: false,

      needHGWC: false, // 流程判断:需要核稿且有值,才能流转行领导秘书和行领导签发流程(true为可流转,false为不可流转)
      needHGWC1: {},

      needQFHG: false,

      needIsnotHFW: true,
      loadingTree: false,
      //正文字数提示信息
      wordsLimitInfo: {
        wordsLimit: "",
        draftWords: "",
        reasonWords: "",
        stepsNames: "",
        dialogSetLimit: false,
        dialogDraftTips: false,
        dialogReasonTips: false,
        dialogNextStepTips: false,
        reasonDom: "exceedWordReason"
      },
      wordsLimit: false,

      mainPage: true,
      isFinish: false,
      interval: null,
      deptSend:"",
      outSend:"",
      shData: [],
      oldDataFlag: 0
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
      if (this.fromdata.signState == "0") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "正处于会签状态",
          duration: 2000
        });
        return;
      }
      if (!this.fromdata.filePath && !this.fromdata.fileName) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先起草正文",
          duation: 1500
        });
        return;
      }
      this.dialogTit = "流程调度";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "finishAndSendSighWf";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      // this.loadingTree = true;
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
            that.fromdata.wfeUnitId = that.bank_flowConfig.wfeUnitId = that.unitId
            let parms = Object.assign({}, that.fromdata,that.bank_flowConfig);
            parms.pcsAvyId = that.bank_flowConfig.pcsAvyId = res.data[0].PCSAVYID;
            parms.unitId = that.unitId;
            parms.function = "selWfNode"
            this.$post
              .postData(
                "selWfNode",
                JSON.stringify(parms),
                // this.$businessCode.fawgl
                this.$businessCode.fawgl
              )
              .then(resTree => {
                this.treeData = resTree.data;
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

        let obj3=await this.$post.postData(
            "getSendAttachmentPo",
            JSON.stringify(Object.assign(data,{function :"getSendAttachmentPo", dataId:this.$route.query.id})),this.$businessCode.fawgl
          ).then(res => {
            return res.data||[];
          })
          .catch(err => {
            console.log(err);
        });

        // if(obj1&&obj2){
          const routeData = this.$router.resolve({
              path: "/maintainFiles",
              query: {
                id: this.$route.query.id,
                type:'fw',
                sendType:this.fromdata.sendType,
                sign: 1,
                selectUrl:"toEdit",
                mainPage: this.mainPage,
                isFinish: this.isFinish,
                multiTenancyId:this.fromdata.multiTenancyId,
                title: this.draftOrganTitle,
                unitId: this.unitId,
                choseYear: this.$route.query.choseYear||""
              }
            });
          sessionStorage.setItem("fileObj",JSON.stringify(obj1))
          sessionStorage.setItem("suggessObj",JSON.stringify(obj2))
          sessionStorage.setItem("attachObj",JSON.stringify(obj3))
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
        case "finishAndSendSighWf":
          this.checkData = [];
          this.checkIds = [];
          break;
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
            this.fromdata.sequenceSign = "0";
            this.huiqianSend.deptIds = ids;
            this.huiqianSend.deptNames = names;
            this.createSighWf.deptIds = ids;
            this.createSighWf.deptNames = names;
            break;
          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
        }
        //下一环节处理人信息
        if (dtype === "finishAndSendSighWf") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
          this.bank_doSend.nextNodeId = params.id; //下以环节id
          this.bank_doSend.nextNodeName = params.name; //下一环节名称
          this.bank_doSend.nextUserName = names;
          this.bank_doSend.nextUserId = ids;
        }
      }
      this.dialogState = !this.dialogState;
      if (
        !this.dialogState &&
        dtype == "finishAndSendSighWf" &&
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

    //选择人员后 确定完成并发送
    saveSending() {
      // 永富建议用"发文"作为环节判断依据
      // if (this.bank_doSend.nextNodeName=="发文"&&(this.fromdata.opinionSendList.length<=0||this.fromdata.opinionSend=="")) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: "未签发，不可发送到“发文”环节",
      //     duration: 500
      //   });
      //   this.checkIds = [];
      //   this.checkData = [];
      //   return;
      // }
      // if (this.bank_doSend.nextNodeName=="行领导秘书"&&(!this.fromdata.opinionDrafList||this.fromdata.opinionDrafList.length<=0)) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: "核稿意见不能为空!",
      //     duration: 500
      //   });
      //   this.checkIds = [];
      //   this.checkData = [];
      //   return;
      // }
      this.bank_doSend.unitId = this.unitId;
      this.$post
        .postData(
          // "finishAndSendSighWf",
          "doSend",
          JSON.stringify(this.bank_doSend),
          this.baoWenZiDuan
        )
        .then(res => {
          console.log(res);
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500,
              onClose: ()=> {
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
      
      if (this.fromdata.secretType == "商业秘密") {
        switch (this.fromdata.secretLimitType) {
          case "保密期限":
            if (
              !this.fromdata.secretFlagType ||
              !this.fromdata.secretFlagContent ||
              !this.fromdata.secretTimeType
            ) {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: tips,
                duration: 1000
              });
              return;
            }
            break;
          case "解密时间":
            if (!this.fromdata.secretFlagType || !this.fromdata.secretFlagContent) {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: tips,
                duration: 1000
              });
              return;
            }
            break;
          case "解密条件":
            if (!this.fromdata.secretFlagType || !this.fromdata.secretTimeType) {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: tips,
                duration: 1000
              });
              return;
            }
            break;
          default:
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: tips,
              duration: 1000
            });
            return;
        }
      } else if (
        this.fromdata.secretType == "内部信息" &&
        !this.fromdata.secretFlagType
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return;
      } else if (
        this.fromdata.secretType == "工作秘密" &&
        !this.fromdata.secretFlagType
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return;
      }
      if (
        !this.fromdata.title ||
        !this.fromdata.phone ||
        !this.fromdata.secretType
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
    
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },

    //初始值 //input框内容
    toEdit() {
      console.log(this.bank_dispach);
      let that = this;
      that.bank_dispach.unitId = that.unitId;
      this.bank_dispach.choseYear = this.$route.query.choseYear||"";
      this.$post
        .postData(
          "toEdit",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
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
              that.$post.postData(
                'getByfawenId', 
                JSON.stringify({function: 'getByfawenId', sendOrderId: that.bank_dispach.id}),
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
                
  
                // let transObj = {processInstId: '', name: '', userName: ''}
                
                // that.tableData1.forEach(element => {
                //   transObj.processInstId = element.processInstId
                //   transObj.name = element.receiveOrgName
                //   transObj.userName = element.userName
                //   that.shData.push(transObj)
                //   transObj = {processInstId: '', name: '', userName: ''}
                // });
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
            }
          }
          this.bank_regain.multiTenancyId = res.data.multiTenancyId
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文处理单";
          }
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }
          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }
          that.fromdata = Object.assign(that.fromdata, res.data);

          that.isShowFileNew = that.fromdata.isShowNewFiledButton==0 ? true : false;

          that.nowUserId = res.data.currentUserId || ''

          if(res.data.currentNodeId!='800') {
            that.isFinish = true
          } else {
            that.isFinish = false
          }

          // 公文种类配置中,需要核稿,才能流转到办公室核稿、部门核稿，否则不能流转到部门签发环节
          if(that.fromdata.isCheckFile == 1) {
            that.needIsnotHFW = false
          } else {
            that.needIsnotHFW = true
          }

          // 需要有核稿意见才能流转到秘书和行领导环节
          if (
            (that.fromdata.opinionDraf &&
              that.fromdata.opinionDraf != "" &&
              that.fromdata.isCheckFile) ||
            (that.fromdata.opinionDrafList &&
              that.fromdata.opinionDrafList.length >= 1)
          ) {
            that.needHGWC = true;
          } else {
            that.needHGWC = false;
          }

          // 任何发文类型都必须有签发意见，否则无法流转到发文环节
          // 在此基础上，行级发文必须有核稿意见，才能流转到发文环节

          if(that.fromdata.opinionSendList.length>0) {
            if(that.fromdata.type=="行发文") {
              if(that.fromdata.opinionDrafList.length>0) {
                that.needQFHG = true
              } else {
                that.needQFHG = false
              }
            } else {
              that.needQFHG = true
            }
          } else {
            that.needQFHG = false
          }

          if (that.fromdata.type == "行发文" || that.fromdata.type == "部门发文" || that.fromdata.type == "党务发文") {
            that.showTextType = true;
            that.showmeetingEndTime = false;
            that.showUnionDepartment = true
          } else if (that.fromdata.type === "会议纪要") {
            that.showmeetingEndTime = true;
            that.showTextType = false;
            that.showUnionDepartment = false
          } else {
            that.showTextType = false;
            that.showmeetingEndTime = false;
            that.showUnionDepartment = false
          }
          if (res.data.type == "行发文") {
            this.selectUnionDepartment = true;
          } else {
            this.selectUnionDepartment = false;
          }
          if (res.data.type == "行发文" || res.data.type == "部门发文" || res.data.secretType == "党务发文") {
            this.showTextType = true;
            this.showMeetingEndTime = false;
          } else if (res.data.type === "会议纪要") {
            this.showMeetingEndTime = true;
            this.showTextType = false;
          } else {
            this.showTextType = false;
            this.showMeetingEndTime = false;
            this.fromdata.textType = ''
          }

          that.fromdata.sendBasis = res.data.sendBasis&&JSON.parse(res.data.sendBasis)||[]
          that.showImportData = that.fromdata.sendBasis.length>0
          
          this.bwsmFromdata.explain = res.data.explain ? res.data.explain : "";
          this.bank_doSend.curNodeCode = res.data.currentNodeId;
          this.bank_doSend.tplNo = res.data.pTplNo;
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
          this.bank_selectConfig.pTplNo = res.data.pTplNo;
          this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
          this.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;
          this.bank_flowConfig.curTplNo = res.data.pTplNo;
          this.bank_flowConfig.curMultiTenancyId = res.data.multiTenancyId;

          if(this.fromdata.secretType&&this.fromdata.secretType !=="") {
            this.showBySecret = true
          } else {
            this.showBySecret = false
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
          let hasReasonFlag = false;
          if (
            that.fromdata.exceedWordReasonList &&
            that.fromdata.exceedWordReasonList.length
          ) {
            that.fromdata.exceedWordReasonList.map(exceed => {
              if (exceed.status == 0) {
                that.fromdata.exceedWordReason = exceed.content;
                hasReasonFlag = true;
              } else {
                this.guReasonFlag = true;
              }
            });
          }

          if(that.fromdata.exceedWordReasonList.length>0) {
            that.wordsLimit = true;
          } else {
            that.wordsLimit = false;
          }

          if (res.data.mainIds) {
            that.zhuCheckData = that.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          if (res.data.signDepartmentId) {
            that.huiCheckData = that.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartmentName
            );
            // that.createSighWf.deptIds = res.data.signDepartmentId;
            // that.createSighWf.deptNames = res.data.signDepartmentName;
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

          that.wordsLimitInfo.draftWords = that.fromdata.sizeFact;
          that.wordsLimitInfo.wordsLimit = that.fromdata.sizeLimit || 0

          // 获取发过的专栏
          that.$api.adminConfig.coluBack({"zlwh": that.fromdata.documentNo, "unitId": that.unitId}).then(res => {
            if(res&&res.data) {
              that.fromdata.coulBack = res.data[0].zlSslm
            }
          })
        });
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam() {
      this.bank_redheader.unitId = this.unitId;
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
    async preserve(type) {
      this.bank_dispach.id = getFormId(this.$route.query.id,'bankDispachDoneId');
      this.saveOrUpdateToQianbaoEntity.sequenceSign = 0;
      this.saveOrUpdateToQianbaoEntity.unitId = this.unitId;
      var obj = Object.assign(this.fromdata, this.saveOrUpdateToQianbaoEntity);
      await this.$post
        .postData(
          "saveOrUpdateSign",
          JSON.stringify(obj),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.saveOrUpdateToQianbaoEntity.id = this.bank_dispach.id = this.bank_toQianbaoSend.id = getFormId(this.$route.query.id,'bankDispachDoneId',res.data.id);
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

            // this.createSighWf.processInstId = res.data.processInstId;
            // this.createSighWf.id = this.bank_dispach.id;
            // this.createSighWf.curMultiTenancyId = res.data.multiTenancyId;
            // this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            // this.createSighWf.curTplNo = res.data.pTplNo;
            // this.createSighWf.curNodeCode = res.data.curNodeCode;
            // this.createSighWf.sequenceSign = "0";

            this.toEdit();
          }
        });
    },
    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    //办结
    concludematter() {
      this.preserve();
      this.banjiedispatch.unitId = this.unitId;
      var obj = Object.assign(this.fromdata, this.banjiedispatch);
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.fawgl)
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
    drafting(state, judge) {
      let that = this;
      let tipLimit = false;
      this.zhengWenState = state;
      
      if (!this.fromdata.filePath && !this.fromdata.fileName && state != 1) {
        this.$message({
          type: "error",
          offset: 100,
          showClose: true,
          message: "请先起草正文",
          duation: 2000
        });
        return;
      }
      if (state == 1) {
        if (!this.fromdata.type || this.fromdata.type == "") {
          this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请选择发文类型",
            duation: 2000
          });
          return;
        } else if (!this.fromdata.redHead || this.fromdata.redHead == "") {
          this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请选择代字/红头",
            duation: 2000
          });
          return;
        }
        // else if(!this.fromdata.textType||this.fromdata.textType=="") {
        //   this.$message({
        //     type: "error",
        //     offset: 100,
        //     showClose: true,
        //     message: "请选择文种",
        //     duation: 2000
        //   });
        //   return;
        // }
      }
      if (state == 1) {
        tipLimit = this.judgeDraf(state, judge);
        if (tipLimit) {
          return;
        }
      }
      if (!getFormId(this.$route.query.id, "bankDispachId")) {
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
          // this.preserve().then(save => {
          //   if (save) {
              this.showDraft = true;
          //   }
          // });
        } else {
          this.getFileInfo(that).then(res => {
            if (res.state) {
              // this.preserve().then(save => {
              //   if (save) {
                  if (state != "taoHong") {
                    this.doDraft(res);
                  } else {
                    this.findTemplete(res);
                  }
              //   }
              // });
            }
          });
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
          zhengWenState:0,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          processInstId: this.fromdata.processInstId,
          formState:'complete',
          unitId: this.unitId
        }
      });
      this.showDraft = false;
      let str = "";
      if(this.fromdata.documentNo){
        str = this.fromdata.documentNo + this.fromdata.title
      }else{
        str = this.fromdata.title
      }
      localStorage.setItem("saveSpecialFileName",str)
      this.$forceUpdate();
      window.open(data.href, "_blank");
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
        path: '/dzfwcld',
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
      if(type&&this.fromdata.secretFlagType==="商业秘密"){
        this.fromdata.secretFlagType = "";
      }
      
      this.$forceUpdate();
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
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = false;
        this.secretOptionsFlag = [].concat(this.SsecretFlag);
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = true;
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
    directchange(val) {
      if (this.fromdata.isDirect == "否") {
        this.isDirectFlag = false
      } else if (this.fromdata.isDirect == "是") {
        this.isDirectFlag = true
      }
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
    downFile(file) {
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
    //超出正文字数提示  按钮说明原因
    chaoChuTiSYuanY(node) {
      this.chaoChuTiS = false;
      this.$refs[node].$el.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    },
    //校验正文超限原因填写
    judgeDraf(state, judge) {
      let flag = false;
      let userBuMen = JSON.parse(localStorage.getItem("userInfo")).firstUnitId;
      let stepJudge = JSON.parse(localStorage.getItem("tcHumanRole"));//行领导秘书 行领导 不提示超限
      let isHang = false;//行领导秘书 行领导 
      stepJudge.map((node)=>{
        if(node.codeName == '行领导秘书岗位'||node.codeName == '行签发岗位' ){
          isHang = true;
        }
      })
      if (this.fromdata.isOutDept!=1) {
        //同一部门时显示
        if (!judge && state == 1 && this.wordsLimitInfo.wordsLimit > 0) {
          //起草正文提示
          this.wordsLimitInfo.dialogSetLimit = true;
          flag = true;
        }
        if (this.wordsLimitInfo.wordsLimit > 0 && state != 1) {
          if (this.fromdata.isExceed&&this.fromdata.opinionDrafList.length==0 && !isHang) {
            if (
              !(
                this.fromdata.exceedWordReason ||
                this.fromdata.exceedWordReasonList.length
              )
            ) {
              this.wordsLimitInfo.dialogDraftTips = true;
              flag = true;
            } else {
              if (
                this.fromdata.exceedWordReason.length < 10 &&
                !this.guReasonFlag
              ) {
                this.wordsLimitInfo.dialogReasonTips = true;
                flag = true;
              }
            }
          }
        }
      }
      return flag;
    },
    // 归档
    handleFile() {
      this.$post
        .postData(
          "sendOrderFiledById",
          JSON.stringify({
            function: "sendOrderFiledById",
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
    this.formText = formTextChange('send')
    let curDay = new Date();
    let recentTowYear = curDay.getFullYear()-2;
    this.isRecentTowYear = this.$route.query.choseYear==""||(this.$route.query.choseYear>recentTowYear);
    //初始化加载数据
    this.bank_dispach.id = this.bank_doSend.id = this.uploadConfig.id = getFormId(this.$route.query.id,'bankDispachDoneId');
    this.titleName = this.$route.query.title;
    this.unitId = this.$route.query.unitId||"";
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.treeTradeCode = this.$businessCode.ggfawgl;
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.toEdit();
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
        border: 1px solid #f00;
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
.el-scrollbar {
  height: 100%;
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
