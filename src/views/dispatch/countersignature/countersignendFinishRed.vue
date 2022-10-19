<template>
  <div id="countersignendFinishRed" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>会签处理单
        </p>

        <div class="grid_comtent">
          <el-button plain size="small" class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain size="small" @click="drafting(0)">查看正文</el-button>
          <el-button plain size="small" @click="flowScheme">查看流程</el-button>
          <el-button plain size="small" @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="collect('sign', bank_dispach.id)">收藏</el-button>
          <el-button plain size="small" @click="instructions">操作指南</el-button>
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
                      placeholder="请选择"
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
                  <el-form-item label="会议结束时间">
                    <el-input v-model="fromdata.meetingEndTime" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
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
                <el-col v-if="!showUnionDepartment">
                  <el-form-item label="联合发文单位">
                    <el-input v-model="fromdata.unionDepartment" disabled></el-input>
                  </el-form-item>
                </el-col>
                
                <el-col>
                  <el-form-item label="发文依据" v-if="showImportData">
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
                      <el-form-item label="直发范围" :span="8" v-if="zf">
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
                    <el-col :span="8">
                      <el-form-item label="直发文种类" :span="8" v-if="zf">
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
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.attachTitle" placeholder="请输入附件标题" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="会签部门">
                    <el-input v-model="fromdata.signDepartment" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 发送对象 -->
            <h6 class="bank_dispach_file_tit">发送对象</h6>
            <div id="fsdx" class="height_90"></div>
            <div>
              <el-row>
                <!-- <el-col>
                  <el-form-item label="会签部门">
                    <el-input
                      v-model="fromdata.signDepartment"
                      placeholder="请选择会签部门"
                      style="width: 100%;"
                      disabled
                    >
                      <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>-->

                <el-col>
                  <el-form-item :label="formText.outsideSign">
                    <el-input v-model="fromdata.outsideSign" type="textarea" resize="none" autosize disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="主    送" prop="main" ref="main">
                    <el-input
                      v-model="fromdata.mainSend"
                      type="textarea" resize="none" autosize
                      placeholder="请选择主送部门"
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
                      v-model="fromdata.copySend"
                      type="textarea" resize="none" autosize
                      placeholder="请选择抄送部门"
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
                      v-model="fromdata.inlineSend"
                      type="textarea" resize="none" autosize
                      :placeholder="'请选择'+formText.inline"
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
                <el-col>
                  <el-form-item label="最终意见">
                    <template>
                      <!-- <div v-for="(item) in fromdata.finalOpinionList" :key="item.id">
                        <div v-if="item.status" class="d_flex">
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
                              v-if="item.createTime == fromdata.sendOpinionMaxTime && item.userId == nowUserId"
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
                          @input="inputChange"
                          v-model="fromdata.finalOpinion"
                          v-if="!(fromdata.finalOpinionList && fromdata.finalOpinionList.length!==0)"
                          disabled
                        ></el-input>
                        <!-- <button
                          @click="writelistbox(clickTypes=2)"
                          v-if="(!(fromdata.finalOpinionList && fromdata.finalOpinionList.length!==0))"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-plus"></i>
                        </button> -->
                      </div>
                      <opinionText 
                        :opinionText="fromdata.finalOpinionList" 
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
                        :canDelet="false"
                        @deletService="deletService"
                        :curNodeCode="fromdata.currentNodeId"
                      ></opinionText>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="过程意见">
                    <template>
                      <!-- <div v-for="(item) in fromdata.processOpinionList" :key="item.id">
                        <div v-if="item.status" class="d_flex">
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
                          @input="inputChange"
                          v-model="fromdata.processOpinion"
                          v-if="!(fromdata.processOpinionList && fromdata.processOpinionList.length!==0)"
                          disabled
                        ></el-input>
                      </div>
                      <opinionText 
                        :opinionText="fromdata.processOpinionList" 
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
                        :canDelet="false"
                        @deletService="deletService"
                        :curNodeCode="fromdata.currentNodeId"
                      ></opinionText>
                    </template>
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
                <!-- <loadAccessory></loadAccessory> -->
                <!-- <uploadFiles ref="uploadComponent" @preserve="preserve" :uploadConfig="uploadConfig"></uploadFiles> -->
                <el-col>
                  <div class="file_list_box" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                    <el-scrollbar>
                      <div v-for="(item, index) in  fromdata.attchmentFileInfo" :key="item.id" class="comp_list">  
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
          </el-form>
        </div>
      </div>
    </div>
    <!--查看依据文件-->
    <el-dialog title="查看依据文件"
      :visible.sync="showImportList"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      v-dialogDrag
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
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import minixs from "@/minixs/index";
import isNowUser from "@/minixs/isNowUser";
import viewDraft from "@/minixs/viewDraft";
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/indexDsipatch";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from '@/components/sideBar/sideBar';
import formTextChange from '@/components/formText/index';

export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    opinionText,
    sideBar
  },
  mixins: [minixs,viewDraft,dispatchIndex,isNowUser],
  data() {
    return {
      formText:{
        inline:"本行发送",
        outsideSign:"行外会签",
      },
      guReasonFlag: false, //是否有固化超限原因
      // 办文说明
      bwsmFromdata: {
        explain: ""
      },
      zf: false,
      treeTradeCode:'',//人员树交易线
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
        curTplNo: "",
        curMultiTenancyId: ""
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
        function: "getSignInfo",
        id: ""
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
        finalOpinionList: [],
        processOpinionList: [],
        outsideSign: "",
        phone: "",
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
        eleSendSecretType: "",
        finalOpinion: "",
        processOpinion: "",
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
      baoWenZiDuan: this.$businessCode.fawgl,
      appendWriteDialog: true,
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
      showUnionDepartment: true,
      // 文种显示
      showTextType: true,
      showmeetingEndTime: false,
      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",

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
      
      this.$post
        .postData(
          "finishAndSendSighWf",
          JSON.stringify(Object.assign(this.fromdata, this.bank_doSend)),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
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
          this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          this.bank_send.curTplNo = res.data && res.data[0].PTPLNO;
          this.bank_send.curMultiTenancyId =
            res.data && res.data[0].MULTITENANCYID;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
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
        case "finishAndSendSighWf":
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
      this.$post
        .postData(
          "getTcPriDeliveryDic",
          JSON.stringify(this.bank_main),
          this.baoWenZiDuan
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
    },
    // 下拉列表
    getSendOrderDicByParam() {
      // this.$post
      //   .postData(
      //     "getSendOrderDicByParam",
      //     JSON.stringify(this.bank_dispachfile),
      //     this.baoWenZiDuan
      //   )
      //   .then(res => {
      //     this.SsendType = JSON.parse(res.data.sendType);
      //     this.SemergencyLevel = JSON.parse(res.data.emergencyLevel);
      //     this.SbusinessType = JSON.parse(res.data.businessType);
      //     this.StextType = JSON.parse(res.data.textType);
      //     this.SsecretType = JSON.parse(res.data.eleSendSecretType);
      //     this.SsecretFlag = this.secretOptionsFlag =
      //       res.data && res.data.secretFlag && JSON.parse(res.data.secretFlag);
      //     // this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
      //     // this.SsecretFlagType = JSON.parse(res.data.secretFlag);
      //     this.SdirectRange = JSON.parse(res.data.directSendRange);
      //     this.SdirectType = JSON.parse(res.data.directSendType);
      //     this.SkeepLimit = JSON.parse(res.data.eleSendSecretLimit);
      //     this.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
      //     this.SbusinessSecret =
      //       res.data &&
      //       res.data.tradeSecret &&
      //       JSON.parse(res.data.tradeSecret);
      //        this.SsecretLimit =
      //       res.data &&
      //       res.data.secretFlagContent &&
      //       JSON.parse(res.data.secretFlagContent);
      //     if (res.data.mainIds) {
      //       this.zhuCheckData = this.concatTreeData(
      //         res.data.mainIds,
      //         res.data.main
      //       );
      //     }
      //     if (res.data.signDepartmentIds) {
      //       this.huiCheckData = this.concatTreeData(
      //         res.data.signDepartmentIds,
      //         res.data.signDepartment
      //       );
      //     }
      //     if (res.data.copyIds) {
      //       this.chaoCheckData = this.concatTreeData(
      //         res.data.copyIds,
      //         res.data.copy
      //       );
      //     }
      //     if (res.data.inlineIds) {
      //       this.benCheckData = this.concatTreeData(
      //         res.data.inlineIds,
      //         res.data.inline
      //       );
      //     }
      //   });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEdit() {
      let that = this;
      this.bank_dispach.choseYear = this.$route.query.choseYear||"";
      this.$post
        .postData(
          "getSignInfo",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.getIsNowUser(res);
          console.log(JSON.parse(localStorage.getItem("userInfo")));
          console.log(res);
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文会签单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文会签单";
          }
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }
          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }
          that.fromdata = Object.assign(that.fromdata, res.data);

          that.nowUserId = res.data.currentUserId || ''

          that.fromdata.meetingEndTime = dateFormate.dataFormat(Date.parse(new Date(that.fromdata.meetingEndTime)))

          that.fromdata.sendBasis = res.data.sendBasis&&JSON.parse(res.data.sendBasis)||[]
          that.showImportData = that.fromdata.sendBasis.length>0

          if (that.fromdata.isDirect === "否") {
            that.zf = false
          } else {
            that.zf = true
          }

          if (that.fromdata.type == "部门发文" || that.fromdata.type == "行发文") {
            this.showUnionDepartment = false;
          } else {
            this.showUnionDepartment = true;
          }
          if (res.data.type == "行发文" || res.data.type == "部门发文" || res.data.secretType == "党务发文") {
            this.showTextType = true;
            this.showmeetingEndTime = false;
          } else if (res.data.type === "会议纪要") {
            this.showmeetingEndTime = true;
            this.showTextType = false;
          } else {
            this.showTextType = false;
            this.showmeetingEndTime = false;
          }

          that.bwsmFromdata.explain = res.data.explain ? res.data.explain : "";

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

          if(this.fromdata.secretType&&this.fromdata.secretType !=="") {
            this.showBySecret = true
          } else {
            this.showBySecret = false
          }
          
          that.fromdata.opinionSendList =
            res.data &&
            res.data.opinionSendList
          that.fromdata.opinionSignList =
            res.data &&
            res.data.opinionSignList
          that.fromdata.opinionDrafList =
            res.data &&
            res.data.opinionDrafList
          that.fromdata.opinionCheckList =
            res.data &&
            res.data.opinionCheckList
          that.fromdata.finalOpinionList =
            res.data &&
            res.data.finalOpinionList
          that.fromdata.processOpinionList =
            res.data &&
            res.data.processOpinionList
          that.fromdata.commentsList =
            res.data &&
            res.data.commentsList

          that.fromdata.mainSend =
            res.data && res.data.mainSend;
          that.fromdata.exceedWordReasonList =
            res.data &&
            res.data.exceedWordReasonList &&
            JSON.parse(res.data.exceedWordReasonList);
          //正文字数超限原因 临时原因
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
          that.wordsLimitInfo.draftWords = that.fromdata.sizeFact;
          that.wordsLimitInfo.wordsLimit = that.fromdata.sizeLimit || 0

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

          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];

          //临时意见处理
          that.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          that.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          that.cuteData("opinionDraf", "opinionDrafList", "opinionDrafId");
          that.cuteData("opinionCheck", "opinionCheckList", "opinionCheckId");
          that.cuteData("finalOpinion", "finalOpinionList", "finalOpinionId");
          that.cuteData("processOpinion", "processOpinionList", "processOpinionId");
          that.cuteData("comments", "commentsList", "commentsId");
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
      this.bank_dispach.id = this.$route.query.id
        ? this.$route.query.id
        : sessionStorage.getItem("signpageid") || "";
      this.saveOrUpdateToQianbaoEntity.sequenceSign = 0;
      var obj = Object.assign(this.fromdata, this.saveOrUpdateToQianbaoEntity);
      this.$post
        .postData(
          "saveOrUpdateSign",
          JSON.stringify(obj),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.saveOrUpdateToQianbaoEntity.id = this.bank_dispach.id =
              res.data.id;
            // this.bank_toQianbaoSend.id = res.data.id;
            sessionStorage.setItem("signpageid", res.data.id);
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
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.fromdata.filePath;
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
      this.getFileInfo(that).then((res)=>{
        if(res.state){
          this.doDraft(res)
        }
      })

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
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          formState:'finish',
          processInstId: this.fromdata.processInstId,
          flowTranId:this.$businessCode.fawgl,//流程交易线    chai
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
    // 删除此文
    delectArticle() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
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
        path: "/dzfwhqd",
        query: {
          id: this.bank_dispach.id,
          choseYear: this.$route.query.choseYear||""
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
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.getInstFileInfo(this,res.data).then(resF => {
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
                    flowTranId:this.$businessCode.fawgl,//流程交易线    chai
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
          }else{
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
        // this.secretOptionsFlag = [].concat(this.SworkSecretFlag);
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
    // 提交最终意见
    commit(){
      let bank_commit = {
        function:"doFinishHQXBCB",
        deptId: this.fromdata.signOrderDepartmentId,
        deptName: this.fromdata.signDepartment,
        curNodeCode: this.fromdata.currentNodeId,
        parentId: this.fromdata.sendOrderId
      }
      var obj = Object.assign(this.fromdata, bank_commit);
      this.$post
      .postData(
        "doFinishHQXBCB",
        JSON.stringify(obj),
        this.$businessCode.ggfawgl
      ).then(res=>{
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
      }).catch(err=>{
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: err.eassage,
          duration: 1000
        });
        return false;
      })      
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
  created() {
    this.formText = formTextChange('send')
    this.bank_dispach.id = this.uploadConfig.id = this.bank_doSend.id = this.$route.query.id
      ? this.$route.query.id
      : "";
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl;  //完成并发送 树   流程交易线   chai
    this.toEdit();
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
