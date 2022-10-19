<template>
  <div id="rexamineBankEntityDispach" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>

        <div class="grid_comtent">
          <el-button  size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button  size="small" plain @click="handleSend">发送</el-button>
          <el-button  size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="collect">收藏</el-button>
          <el-button  size="small" plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{ draftOrganTitle }}</h3>
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
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <!-- 当前环节注释 -->
            <div class="bank_dispach_annotation">
              <p class="bank_dispach_annotation_current">
                当前环节：
                <span>{{fromdata.currentNode}}</span>
              </p>
              <p class="bank_dispach_annotation_current">
                当前处理人：
                <span>{{fromdata.currentUser}}</span>
              </p>
              <!-- <p class="bank_article_illustrates">
                <el-form-item label="是否在线审批" prop="onlineSp" ref="onlineSp">
                  <el-radio
                    v-model="fromdata.onlineSp"
                    disabled
                    label="是"
                  >是</el-radio>
                  <el-radio
                    v-model="fromdata.onlineSp"
                    disabled
                    label="否"
                  >否</el-radio>
                </el-form-item>
              </p> -->
            </div>
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发文类型" prop="type" ref="type">
                    <el-select
                      v-model="fromdata.type"
                      :disabled="readFields.type"
                      placeholder="请选择"
                      style="width:100%"
                      @change="selectType"
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
                      :disabled="readFields.redHead"
                      placeholder="请选择"
                      style="width:100%"
                      @change="selectredhead"
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
                    <el-input v-model="fromdata.documentNo" :disabled="readFields.documentNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" props="emergencyLevel" ref="emergencyLevel">
                    <el-select
                      v-model="fromdata.emergencyLevel"
                      :disabled="readFields.emergencyLevel"
                      placeholder="请选择"
                      style="width:100%"
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
                    <el-select v-model="fromdata.businessType" :disabled="readFields.businessType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="businessType in SbusinessType"
                        :key="businessType.label"
                        :label="businessType.label"
                        :value="businessType.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showTextType">
                  <el-form-item label="文种" :span="8" prop="textType" ref="textType">
                    <el-select v-model="fromdata.textType" :disabled="readFields.textType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="textTypeitem in StextType"
                        :key="textTypeitem.label"
                        :label="textTypeitem.label"
                        :value="textTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showmeetingEndTime">
                  <el-form-item label="会议结束时间" :span="8" prop="meetingEndTime" ref="meetingEndTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="fromdata.meetingEndTime"
                      :disabled="readFields.meetingEndTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <!-- 秘密类型 -->
                <el-col :span="24">
                  <el-row>
                    <!-- 秘密类型 -->
                    <el-col :span="8">
                      <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                        <el-select
                          @change="secretTypechange"
                          v-model="fromdata.secretType"
                          :disabled="readFields.secretType"
                          placeholder="请选择"
                          style="width:100%"
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
                          :disabled="readFields.secretFlagType"
                          placeholder="请选择"
                          style="width:100%"
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
                    <el-col :span="8" v-if="secretTypeFlag && !flag && !workSecurityFlag">
                      <el-form-item label="秘密标志" :span="8" prop="secretFlagType" ref="secretFlagType">
                        <el-select
                          @change="workSecurityTab"
                          v-model="fromdata.secretFlagType"
                          :disabled="readFields.secretFlagType"
                          placeholder="请选择"
                          style="width:100%"
                        >
                          <el-option
                            v-for="secretFlagitem in SsecretFlag"
                            :key="secretFlagitem.label"
                            :label="secretFlagitem.label"
                            :value="secretFlagitem.label"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 秘密期限类型 -->
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
                          :disabled="readFields.secretLimitType"
                          placeholder="请选择"
                          style="width:100%"
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
                        label="密级标志"
                        :span="8"
                        prop="secretFlagType"
                        ref="secretFlagType"
                        v-if="flag && secretFlagTypeFlag"
                      >
                        <el-select
                          @change="workSecurityTabTime"
                          v-model="fromdata.secretFlagType"
                          :disabled="readFields.secretFlagType"
                          placeholder="请选择"
                          style="width:40%"
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
                          :disabled="readFields.secretFlagContent"
                          prop="secretFlagContent"
                          ref="secretFlagContent"
                        ></el-input>

                        <el-select
                          name="secretTimeType"
                          v-model="fromdata.secretTimeType"
                          :disabled="readFields.secretTimeType"
                          @change="workSecurityTabTime"
                          placeholder="请选择"
                          style="width:25%"
                          prop="secretTimeType"
                          ref="secretTimeType"
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
                          :disabled="readFields.secretFlagType"
                          placeholder="请选择"
                          style="width:40%"
                        >
                          <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                          ></el-option>
                        </el-select>
                        <i class="el-icon-star-off pad_10"></i>

                        <el-date-picker
                          type="date"
                          @blur="workSecurityTabTime"
                          placeholder="选择日期"
                          v-model="fromdata.secretFlagContent"
                          :disabled="readFields.secretFlagContent"
                          style="width: 40%;"
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
                          :disabled="readFields.secretFlagType"
                          placeholder="请选择"
                          style="width:45%"
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
                          :disabled="readFields.secretTimeType"
                          placeholder="请选择"
                          style="width:49%"
                          prop="secretTimeType"
                          ref="secretTimeType"
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
                      maxlength="500"
                      placeholder="填写备注可输入500字"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="showBySecret">
                  <el-form-item label="定密依据">
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        v-model="fromdata.secretGists"
                        :disabled="readFields.secretGists"
                        @input="inputChange"
                        name="secretGists"
                        style="flex:1"
                      ></el-input>
                      <button
                        @click="secretGistsbox"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门" prop="draftDepartment" ref="draftDepartment">
                    <el-input v-model="fromdata.draftDepartment" :disabled="readFields.draftDepartment"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="拟稿人"
                    prop="draftUser"
                    ref="draftUser"
                  >
                    <el-input v-model="fromdata.draftUser" :disabled="readFields.draftUser"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input v-model.number="fromdata.phone" :disabled="readFields.phone" maxlength="11" oninput="value=value.replace(/[^\-\,\d\*\ ]/g,'')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="!showUnionDepartment">
                  <el-form-item label="联合发文单位">
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        v-model="fromdata.unionDepartment"
                        :disabled="readFields.unionDepartment"
                        style="flex:1"
                        @input="inputChange"
                      ></el-input>
                      <el-button
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        @click="bankmain('dw')"
                      ><i class="el-icon-plus"></i>
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="发文依据">
                      <el-col>
                        <el-button size="small" plain @click="handleImport">引入</el-button>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="" v-if="showImportData">
                      <div class="border_yiju">
                        <el-row v-for="(item) in fromdata.sendBasis" :key="item.id">
                          <el-col :span="20" class="btn_openImport">
                            <el-button type="text" :class="(item.id=='')?'colorBlack':'colorLink'" @click="handleCheckImport(item)">{{item.documentCode}}</el-button>
                          </el-col>
                          <el-col :span="4" class="btn_delImport">
                            <el-button type="text" @click="handleDeleteImport(item)">删除</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </el-form-item>
                  </el-col>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                        <el-radio v-model="fromdata.isDirect" :disabled="readFields.isDirect" @change="directchange" label="是">是</el-radio>
                        <el-radio v-model="fromdata.isDirect" :disabled="readFields.isDirect" @change="directchange" label="否">否</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="直发范围" :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                        <el-select v-model="fromdata.directRange" :disabled="readFields.directRange" placeholder="请选择" style="width:100%">
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
                      <el-form-item label="直发文种类" :span="8" v-if="fromdata.isDirect==='否' ? false :true">
                        <el-select v-model="fromdata.directType" :disabled="readFields.directType" placeholder="请选择" style="width:100%">
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
                    <el-radio v-model="fromdata.isStandardFile" :disabled="readFields.isStandardFile" label="是">是</el-radio>
                    <el-radio v-model="fromdata.isStandardFile" :disabled="readFields.isStandardFile" label="否">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="档案利用范围" prop="userRange" ref="userRange">
                    <el-select
                      v-model="fromdata.userRange"
                      :disabled="readFields.userRange"
                      placeholder="请选择"
                      style="width:100%"
                    >
                      <el-option
                        v-for="archivesUserRange in archivesUserRange"
                        :key="archivesUserRange.label"
                        :label="archivesUserRange.label"
                        :value="archivesUserRange.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保管期限" prop="keepLimit" ref="keepLimit">
                    <el-select v-model="fromdata.keepLimit" :disabled="readFields.keepLimit" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="keepLimititem in SkeepLimit"
                        :key="keepLimititem.label"
                        :label="keepLimititem.label"
                        :value="keepLimititem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="拟稿日期"
                    prop="draftTime"
                    ref="draftTime"
                  >
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="fromdata.draftTime"
                      :disabled="readFields.draftTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期">
                    <el-date-picker
                      type="date"
                      v-model="fromdata.completeTime"
                      :disabled="readFields.completeTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="发文日期">
                    <el-date-picker
                      type="date"
                      v-model="fromdata.sendTime"
                      :disabled="readFields.sendTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" :disabled="readFields.title" placeholder="请输入正文标题"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input
                      type="textarea" resize="none" autosize
                      v-model="fromdata.attachTitle"
                      :disabled="readFields.attachTitle"
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
                  <el-form-item label="会签部门" prop="signDepartmentName" ref="signDepartmentName">
                    <el-input
                      v-model="fromdata.signDepartmentName"
                      disabled
                      placeholder="请选择会签部门"
                      style="width: 100%;"
                      @input="inputChange"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-plus"
                        @click="bankmain('hui')"
                      ></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item :label="formText.outsideSign" prop="outsideSign" ref="outsideSign">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.outsideSign" :disabled="readFields.outsideSign"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="主    送" prop="main" ref="main">
                    <!-- <el-input
                      v-model="fromdata.main"
                      @input="inputChange"
                      placeholder="请选择主送部门"
                      style="width: 100%;"
                    >
                      <el-button slot="append" icon="el-icon-plus" @click="bankmain('zhusong')"></el-button>
                    </el-input> -->
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.main"
                      ></el-input>
                      <button
                        @click="bankmain('zhusong')"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="抄    送" prop="copy" ref="copy">
                    <!-- <el-input
                      v-model="fromdata.copy"
                      @input="inputChange"
                      placeholder="请选择抄送部门"
                      style="width: 100%;"
                    >
                      <el-button slot="append" icon="el-icon-plus" @click="bankmain('chao')"></el-button>
                    </el-input> -->
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.copy"
                      ></el-input>
                      <button
                        @click="bankmain('chao')"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item :label="formText.inline" prop="inline" ref="inline">
                    <!-- <el-input
                      v-model="fromdata.inline"
                      @input="inputChange"
                      placeholder="请选择本行发送"
                      style="width: 100%;"
                    >
                      <el-button slot="append" icon="el-icon-plus" @click="bankmain('ben')"></el-button>
                    </el-input> -->
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.inline"
                      ></el-input>
                      <button
                        @click="bankmain('ben')"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <el-form-item label="签发意见" prop="opinionSend" ref="opinionSend">
                    <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
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
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.opinionSend"
                        v-if="!editedIdeaFields.opinionSend||fromdata.opinionSendId||!(fromdata.opinionSendList && fromdata.opinionSendList.length!=0)"
                        :disabled="editedIdeaFields.opinionSend"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=4)"
                        v-if="!editedIdeaFields.opinionSend"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="定密责任人意见" prop="opinionSecretPerson" ref="opinionSecretPerson">
                    <div v-for="(item) in fromdata.opinionSecretPersonList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
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
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.opinionSecretPerson"
                        v-if="!editedIdeaFields.opinionSecretPerson||fromdata.opinionSecretPersonId||!(fromdata.opinionSecretPersonList && fromdata.opinionSecretPersonList.length!=0)"
                        :disabled="editedIdeaFields.opinionSecretPerson"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=5)"
                        v-if="!editedIdeaFields.opinionSecretPerson"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="核稿意见" prop="opinionDraf" ref="opinionDraf">
                    <div v-for="(item) in fromdata.opinionDrafList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
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
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.opinionDraf"
                        v-if="!editedIdeaFields.opinionDraf||fromdata.opinionDrafId||!(fromdata.opinionDrafList && fromdata.opinionDrafList.length!=0)"
                        :disabled="editedIdeaFields.opinionDraf"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=2)"
                        v-if="!editedIdeaFields.opinionDraf"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="会签意见" prop="opinionSign" ref="opinionSign">
                    <div v-for="item in fromdata.opinionSignList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
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
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.opinionSign"
                        v-if="!editedIdeaFields.opinionSign||fromdata.opinionSignId||!(fromdata.opinionSignList && fromdata.opinionSignList.length!=0)"
                        :disabled="editedIdeaFields.opinionSign"
                        maxlength="500"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=3)"
                        v-if="!editedIdeaFields.opinionSign"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="审核意见" prop="opinionCheck" ref="opinionCheck">
                    <div v-for="item in fromdata.opinionCheckList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
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
                    </div>
                    <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.opinionCheck"
                        v-if="!editedIdeaFields.opinionCheck||fromdata.opinionCheckId||!(fromdata.opinionCheckList && fromdata.opinionCheckList.length!=0)"
                        :disabled="editedIdeaFields.opinionCheck"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=1)"
                        v-if="!editedIdeaFields.opinionCheck"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="备注" prop="comments" ref="comments">
                    <template>
                      <div v-for="(item) in fromdata.commentsList" :key="item.id">
                        <div v-if="item.status" class="d_flex">
                          <el-row class="d_b100">
                            <el-col
                              :span="22"
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
                      </div>
                      <el-input
                        type="textarea" resize="none" autosize
                        v-model="fromdata.comments"
                        v-if="!editedIdeaFields.comments||fromdata.commentsId||!(fromdata.commentsList && fromdata.commentsList.length!=0)"
                        disabled
                      ></el-input>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 退回 -->
    <el-dialog
      :visible.sync="showBack"
      v-dialogDrag
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="退回"
      class="dialog_backed"
    >
      <h6 class="back_tit mt-20">选择退回环节</h6>
      <m-table
        size="medium"
        :isSelection="false"
        :isIndex="true"
        :isPagination="false"
        :isSingelCheck="true"
        :isHandle="false"
        :tableData="backTableData"
        :tableCols="backtableCols"
        @handleTemplateRadio="handleTemplateRadio"
        style="margin-bottom: 20px;"
      ></m-table>
      <h6 class="back_tit mt-20">选择退回原因</h6>
      <el-form ref="backForm" :model="backFormData" label-width="130px">
        <el-form-item>
          <el-checkbox v-model="backFormData.comments" true-label="格式不正确" false-label>格式不正确</el-checkbox>
        </el-form-item>
        <el-form-item label="其他原因">
          <el-input v-model="backFormData.backReason" type="textarea" resize="none" autosize></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showBack = false">取 消</el-button>
        <el-button type="primary" @click="handleBackOff">退 回</el-button>
      </div>
    </el-dialog>
    <!-- 发送确认 -->
    <el-dialog
      :visible.sync="showSend"
      v-dialogDrag
      :modal-append-to-body="true"
      :close-on-click-modal="false"
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
                    >{{user.deptNames}}</el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
              </div>
            </template>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row v-if="false">
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
                    >{{user.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
              </div>
            </template>
          </el-col>
        </el-row>
      </div>
      <!-- <p class="send_ps">
        <b>注</b> : 密件只能公告至行领导和高管!
      </p> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSend = false">取 消</el-button>
        <el-button type="primary" @click="handleVerifySend">发 送</el-button>
      </div>
    </el-dialog>
    <!--发送对象弹窗-->
    <el-dialog
      :visible.sync="listSendObjstate"
      v-dialogDrag
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="发送对象"
    >
      <div class="sendRowButton" v-loading="loadingCheck">
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
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="handleCheckedCitiesChange(checkedCities,index)"
                    >
                      <el-checkbox
                        v-for="user in scope.row.orgDprt[index].name"
                        :label="user.deptIds"
                        :value="user.deptIds"
                        :key="user.deptIds"
                      ><span :style="{'width':item.width}">{{user.deptNames}}</span></el-checkbox>
                      <div class="clearfix"></div>
                    </el-checkbox-group>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSendObj">取 消</el-button>
        <el-button type="primary" @click="selectSendObj">确定</el-button>
      </div>
    </el-dialog>
    <!--生成文号-->
    <el-dialog v-dialogDrag title="生成文号" width="30%" :visible.sync="SetDocNoVisible">
      <div>
        <el-form v-for="(DocNoDataListitem,n,m) in DocNoDataList" :key="DocNoDataListitem">
          <el-form-item :label="n">
            <template
              v-for="DocNoDataListitems in DocNoDataListitem&&DocNoDataListitem.split(';')||[]"
            >
              <el-radio
                v-model="setDocNum"
                :label="DocNoDataListitems+'-'+m"
                :key="DocNoDataListitems"
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
    <!-- 办文说明 -->
    <el-dialog
      :visible.sync="showExplain"
      v-dialogDrag
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="办文说明"
    >
      <el-form>
        <el-form-item>
          <el-input type="textarea" resize="none" autosize rows="20" v-model="bwsmFromdata.explain" :disabled="readFields.explain"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveBWSM">保存</el-button>
      </div>
    </el-dialog>
    <!--退号-->
    <el-dialog v-dialogDrag title="退号" width="30%" :visible.sync="handeldoBackNoFuc">
      <span>是否确定退号</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeldoBackNoFuc = false">取消</el-button>
        <el-button type="primary" @click="doBackNoHandle">确定</el-button>
      </span>
    </el-dialog>
    <!--发文依据-->
    <el-dialog v-dialogDrag title="增加发文依据" class="dialogImport" :visible.sync="showImport">
      <el-row>
        <el-form label-width="130px">
          <el-form-item label="依据文件类型">
            <el-col>
              <el-select
                v-model="bankImport"
                style="width: 75%"
              >
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
            <el-col :span="18"><el-input v-model="documentCode" style="width: 100%;"></el-input></el-col>
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
          <td class="ckyjbt">文号 : </td>
          <td>{{bank_import.documentCode}}</td>
        </tr>
        <tr>
          <td class="ckyjbt">标题 : </td>
          <td><el-button type="text" @click="viewFile(bank_import, '1')">{{bank_import.title}}</el-button></td>
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
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :loadingTree="loadingTree"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :loadTreeSelect="loadTreeSelect"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :fromdata="fromdata"
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
    <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import minixs from "@/minixs/index";
import viewDraft from "@/minixs/viewDraft";
import exportTable from "@/minixs/exportTable";
import formTextChange from '@/components/formText/index';

export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList
  },
  mixins: [minixs,viewDraft],
  data() {
    return {
      formText:{
  inline:"本行发送",
  outsideSign:"行外会签",
},
      treeTradeCode:'',//人员树交易线
      //表单控制参数
      huanJieMessage: {},
      scwh: true,
      th: false,
      qicaozw: true,
      chulizw: false,
      chakanzw: false,
      qinggao: false,
      huifuqg: false,
      taohong: false,
      ckhqzt: false,
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "发送", type: "btn_fs", show: false },
        { name: "退回", type: "btn_th", show: false },
        { name: "办结", type: "btn_banjie", show: false },
        { name: "生成文号", type: "btn_scwh", show: this.scwh },
        { name: "退号", type: "btn_tuihao", show: this.th },
        { name: "生成上年度文号", type: "btn_scsndwh", show: this.scwh },
        { name: "删除此文", type: "btn_sccw", show: false },
        { name: "收藏", type: "btn_sc", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "打印处理单", type: "btn_dycld", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],
      //不可编辑控制域
      readFields: {
        type: false,
        redHead: false,
        documentNo: true,
        emergencyLevel: false,
        businessType: false,
        textType: false,
        secretType: false,
        secretFlagType: false,
        secretLimitType: false,
        secretFlagContent: false,
        secretTimeType: false,
        // knowScore: false,
        secretGists: false,
        draftDepartment: false,
        unionDepartment: false,
        draftUser: false,
        phone: false,
        draftTime: false,
        sendBasis: false,
        isDirect: false,
        directRange: false,
        directType: false,
        userRange: false,
        isStandardFile: false,
        keepLimit: false,
        completeTime: true,
        sendTime: false,
        title: false,
        attachTitle: false,
        signDepartmentName: false,
        finishSignDepartmentName: false,
        outsideSign: false,
        main: false,
        copy: false,
        inline: false,
        // opinionSend: false,
        // opinionDraf: false,
        // opinionCheck: false,
        // comments: false,
        // opinionSign: false,
        isSeparate: false,
        isArtificial: false,
        explain: false
      },
      //必填控制域
      requiredFields: {
        type: false,
        redHead: false,
        businessType: false,
        textType: false,
        secretGists: false,
        draftDepartment: false,
        userRange: false,
        isStandardFile: false,
        keepLimit: false,
        phone: false,
        isDirect: false,
        title: false,
        main: false,
        name: false,
        secretType: false,
        workSecretFlag: false,
        secretLimitType: false,
        secretFlagType: false
      },
      //可编辑意见域
      editedIdeaFields: {
        opinionSend: true,
        opinionDraf: true,
        opinionSecretPerson: true,
        opinionCheck: true,
        comments: true
      },
      //必填意见域
      requiredIdeaFields: {
        opinionSend: false,
        opinionDraf: false,
        opinionSecretPerson: false,
        opinionCheck: false,
        comments: false
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
       //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      draftOrganTitle: '',
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      //常用批示意见
      bank_selectCommonUseList:{
        function: "selectCommonUseList",
        id:'',
        userId:'',
        userName:'',
        content:'',
        sort:'',
        createtime:''
      },
      // 办文说明
      bwsmFromdata: {
        explain: ""
      },
      showExplain: false,
      //常用意见
      offenDevices:[],
      // 重发申请
      bank_rexamine: {
        function: "creatAgainOrder",
        sendOrderId: "",
        sendType: "实物"
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
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "toEditShiwuFw",
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
      //发公告至
      bank_sendnoticetree: {
        function: "sendnoticetree"
      },
       // 发送对象参数
      banl_sendObj: {
        function: "getTcDeptTypeDicList"
      },
      //选中对象 后最终确认发送
      bank_doFinalSend: {
        function: "doAgainFinalSend"
      },
      sendTableData: [],
      sendTableDatas: [
        {
          orgDprt: [
            // {
            //   id: "we5rd",
            //   name: [
            //     { deptIds: "23", deptNames: "建行好几十快递费" },
            //     { deptIds: "fsd", deptNames: "建wer行克里斯蒂" },
            //      { deptIds: "2e3", deptNames: "建dfcv行wer好几十快递费" },
            //       { deptIds: "2f3", deptNames: "建行v好df几十快递费" },
            //        { deptIds: "2v3", deptNames: "建d行好dfg几十快递费" },
            //   ]
            // },
          ]
        }
      ],
      sendTableDatasCol: [// { label: "建行" ,isIndeterminate: false},
      ],
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      // 退回参数
      // bank_back: {
      //   function: "returnWfNode",
      //   processInstId: "",
      //   currNode: ""
      // },
      // backRows: {},
      // backFormData: {
      //   function: "doReturn",
      //   sendOrderId: "",
      //   beBackNode: "",
      //   beBackNodeId: "",
      //   beBackUser: "",
      //   beBackUserId: "",
      //   backReason: "",
      //   comments: ""
      // },

      fromdata: {
        function: "",
        attachTitle: "",
        attachSort:[],
        attchmentFileInfo:[],
        businessType: "",
        canNotShouHuiIds: "",
        comments: "",
        commentsList: "",
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
        explain: "",
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
        opinionSend: "",
        opinionDraf: "",
        opinionCheckList: "",
        opinionDrafList: "",
        opinionSendList: "",
        opinionSecretPersonList: "",
        opinionSignList: "",
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
        signDepartmentName: "",
        signDepartmentId: "",
        signSequence: "",
        tel: "",
        textType: "",
        title: "",
        type: "",
        unionDepartment: "",
        unionDepartmentIds: "",
        updateTime: "",
        userRange: "",
        workSecretFlag: "",
        workflowId: "",
        eleSendSecretType: ""
      },
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
      SsecretFlag:[],
      SsecretFlagType: [],
      SsecretFlagContent: [],
      SdirectRange: [],
      archivesUserRange: [],
      SdirectType: [],
      SsignDepartment: [],
      Smain: [],
      Scopy: [],
      Sinline: [],
      SkeepLimit: [],
      SworkSecretFlag: [],
      secretOptionsFlag: [],
      SSsecretLimitType: [],
      SworkSecurity: [],
      SbusinessSecret: [],
      countriesSecret: [],
      SsecretLimit:[],
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
      rules: {},
      copyRules:{
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
        // draftDepartment: [
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
        // secretLimitType: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择秘密期限类型"
        //   }
        // ],
        // secretFlagType: [
        //   {
        //     required: true,
        //     trigger: "blur change",
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
      unCheckData: [], //联合发文单位选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      loadingTree:false,//是否懒加载
      loadTreeSelect:{
        pcsAvyId:'',
        curTplNo:'',
        curMultiTenancyId:''
      },
      dialogVisible: false, // 定密依据
      appendWriteDialog: true,
      isDirectFlag: false,
      clickTypes: 1,
      // nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      nowUserId: '', //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      showSend:false, //发送弹窗
      listSendObjstate: false, //选择发送对象的弹窗
      sendObjData: [],
      checkedCities: [], //发送对象 选中的数据
      checkedOutCities: [], //发送对象 选中的数据copy
      nowCheckList: [], //当前的选中项数据copy
      loadingCheck: false, //等待图标
      dialogTypeNow: "", //当前弹窗的标示
      checkedGonggaoIds: "", //公告的选中的id
      nowGongGaoCheckList: "", //公告至的数据

      // 生成文号/退号/生成上年文号
      docNoYear: "",
      docNoNum: "",
      DocNoDataList: [],
      SetDocNoVisible: false,
      setDocNum: "",
      doSaveDocumentNumFuc: {
        function: "doSaveDocumentNum",
        redHead: "",
        year: "",
        type: "CN000",
        num: ""
      },
      getNumListForm: {
        function: "getNumList",
        redHead: "",
        type: "CN000",
        year: ""
      },
      doBackNoFuc: {
        function: "doBackNo",
        redHead: "",
        year: "",
        type: "CN000",
        num: ""
      },
      handeldoBackNoFuc: false,
      showDraft:false,
      draftFlag:'newFile',//正文类型 默认空白文档
      wh: '',
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

      // 文种显示
      showTextType: true,
      showmeetingEndTime: false,
      showUnionDepartment: true,

      // 知悉范围定密依据是否显示
      showBySecret: false,

      // 退回参数
      bank_back: {
        function: "returnWfNode",
        processInstId: "",
        currNode: ""
      },
      backRows: {},
      backFormData: {
        function: "doReturn",
        sendOrderId: "",
        beBackNode: "",
        beBackNodeId: "",
        beBackUser: "",
        beBackUserId: "",
        backReason: "",
        comments: ""
      },
      backTableData: [], //表格数据
      backtableCols: [
        { label: "处理环节", prop: "node_Name", sort: true },
        { label: "处理人名称", prop: "userName", sort: true },
        { label: "处理时间", prop: "createTime", sort: true }
      ],
      showBack: false, // 退回显示隐藏

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

      readFlag:"",

      checkedCities: [], //发送对象 选中的数据
      checkedOutCities: [], //发送对象 选中的数据copy
      nowCheckList: [], //当前的选中项数据copy
      coluCheck: "", //专栏选中的项目
      coluData: [], //专栏数据
      loadingCheck: false, //等待图标
      dialogTypeNow: "", //当前弹窗的标示
      checkedGonggaoIds: "", //公告的选中的id
      nowGongGaoCheckList: "", //公告至的数据
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_fsdx = document.querySelector("#fsdx").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    // 按钮控制
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve("save");
          break;
        case "btn_wcbfs":
          this.completeSending();
          break;
        case "btn_fs":
          this.handleSend(1);
          break;
        case "btn_tsfs":
          this.handleSend(2);
          break;
        case "btn_fhqbm":
          this.handleSendHQPtmt();
          break;
        case "btn_ckzlc":
          this.handleCheckFLow();
          break;
        case "btn_th":
          this.handleShowBack();
          break;
        case "btn_banjie":
          this.handleDoFinish();
          break;
        case "btn_scwh":
          this.handleSetDocNo();
          break;
        case "btn_tuihao":
          this.handleClearDocNo();
          break;
        case "btn_scsndwh":
          this.handleSetLastyearDocNo();
          break;
        case "btn_sccw":
          this.delectArticle();
          break;
        case "btn_sc":
          this.collect();
          break;
        case "btn_cklc":
          this.flowScheme();
          break;
        case "btn_dycld":
          this.processSheet();
          break;
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
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //不可编辑意见域
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.formdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
      //     this.buttonList[this.buttonList.length - 1].show = true
      // }
    },
    setFormConfig() {
      this.$nextTick(() => {
        this.rules = {
          type: [
            {
              required: this.requiredFields.type,
              trigger: "change",
              message: "请选择发文类型"
            }
          ],
          redHead: [
            {
              required: this.requiredFields.redHead,
              trigger: "change",
              message: "请选择代字/红头"
            }
          ],
          businessType: [
            {
              required: this.requiredFields.businessType,
              trigger: "change",
              message: "请选择业务分类"
            }
          ],
          textType: [
            { required: this.requiredFields.textType, trigger: "change", message: "请选择文种" }
          ],
          draftDepartment: [
            { required: this.requiredFields.draftDepartment, trigger: "blur", message: "请输入主办部门" }
          ],
          userRange: [
            { required: this.requiredFields.userRange, trigger: "change", message: "请选择档案利用范围" }
          ],
          isStandardFile: [
            {
              required: this.requiredFields.isStandardFile,
              trigger: "change",
              message: "请选择规章/规范性文件"
            }
          ],
          keepLimit: [
            {
              required: this.requiredFields.keepLimit,
              trigger: "change",
              message: "请输入保管期限"
            }
          ],
          phone: [{ required: this.requiredFields.phone, trigger: "blur", message: "请输入联系电话" }],
          isDirect: [
            { required: this.requiredFields.isDirect, trigger: "change", message: "请选择直发文件" }
          ],
          title: [{ required: this.requiredFields.title, trigger: "blur", message: "请输入正文标题" }],
          main: [{ required: this.requiredFields.main, trigger: "change", message: "请选择主送" }],
          name: [
            { required: this.requiredFields.name, message: "请输入标题名称", trigger: "blur" },
            { min: 3, max: 5, message: "3-5个字", trigger: "blur" }
          ],
          secretType: [
            {
              required: this.requiredFields.secretType,
              trigger: ["blur", "change"],
              message: "请选择秘密类型"
            }
          ],
          workSecretFlag: [
            {
              required: this.fromdata.secretType!=""&&this.requiredFields.workSecretFlag,
              trigger: "blur",
              message: "请选择秘密标志"
            }
          ],
          secretLimitType: [
            {
              required: this.fromdata.secretType!=""&&this.requiredFields.secretLimitType,
              trigger: "change",
              message: "请选择秘密期限类型"
            }
          ],
          secretFlagType: [
            {
              required: this.fromdata.secretType!=""&&this.requiredFields.secretFlagType,
              trigger: "blur change",
              message: "请选择秘密标志"
            }
          ],
          secretGists: [
            {
              required: this.fromdata.secretType!=""&&this.requiredFields.secretGists,
              message: "不能为空",
              trigger: "blur"
            }
          ]
        }
      });
      this.$forceUpdate();
    },

    cancelSendObj(){
      this.listSendObjstate = false;

    },
    // 获取常用批示意见
    getCommonUse(){
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
      this.bank_selectCommonUseList.userId = userInfo&&userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo&&userInfo.humanName;
      this.bank_selectCommonUseList.function = 'selectCommonUseList';
      this.$post
          .postData(
            'selectCommonUseList',
            JSON.stringify(this.bank_selectCommonUseList),
            this.$businessCode.ggfawgl
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
                duration: 1000
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
              duration: 1000
            });
          });
    },
     // 新增常用批示意见
    addCommonUse(flag,id,content){
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.content = content;
      this.bank_selectCommonUseList.userId = userInfo&&userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo&&userInfo.humanName;
      this.bank_selectCommonUseList.function = 'doSaveCommonUse';
      this.$post
          .postData(
            'doSaveCommonUse',
            JSON.stringify(this.bank_selectCommonUseList),
            this.$businessCode.ggfawgl
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
                duration: 1000
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
              duration: 1000
            });
          });
    },
     // 删除常用批示意见
    deleteCommonUse(flag,id,content){
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
      this.bank_selectCommonUseList.id = id;
      this.bank_selectCommonUseList.userId = userInfo&&userInfo.humanId;
      this.bank_selectCommonUseList.userName = userInfo&&userInfo.humanName;
      this.bank_selectCommonUseList.function = 'doDeleteCommonUseList';
      this.$post
          .postData(
            'doDeleteCommonUseList',
            JSON.stringify(this.bank_selectCommonUseList),
            this.$businessCode.ggfawgl
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
                duration: 1000
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
              duration: 1000
            });
          });
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
        if(node&&node.deptNames&&node.deptNames.length){
          colNames.push(node.deptNames.length);
        }
      });
      colNames.push(name.length);
      labelLen = colNames.sort((a, b) => {
        return b - a;
      })[0];
      flexWidth = labelLen * 15;
      this.sendTableDatasCol[row].width = flexWidth + 40 + "px";
      return flexWidth +80 + "px";
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
      }else{
        this.nowCheckList.map((hascheck)=>{
          this.checkedCities.push(hascheck.deptIds);
        })
      }
    },
    handleCheckedCitiesChange(value, n) {
      let cancelId = '';
      let oldIds = [];
      let checkedCount = 0;
      let newCheckLists = [];
      if (value === "outcheck") {
        //去除 发送对象 全选
        this.nowCheckList = this.nowCheckList.filter((item)=>{
          let hasF = false;
          oldIds.push(item.deptIds);
          this.checkedCities.forEach((node)=>{
            if(node === item.deptIds){
              hasF = true;
            }
          })
          return hasF;
        })
        cancelId =  oldIds.filter((id)=>{ return this.checkedCities.indexOf(id)==-1})[0];
        this.sendTableDatas[0].orgDprt.forEach((node,row)=>{
          let cancelNum = 0;
          node.name.forEach(list=>{
            if(list.deptIds === cancelId){
              this.sendTableDatasCol[row].isIndeterminate = false;
            }
          })
        })
        return;
      }
      if (value === "gongcheck") {
        //去除 公告至对象 全选
        this.nowGongGaoCheckList = this.nowGongGaoCheckList.filter((item)=>{
          let hasF = false;
          oldIds.push(item.id);
          this.checkedGonggaoIds.forEach((node)=>{
            if(node === item.id){
              hasF = true;
            }
          })
          return hasF;
        })
        this.gongCheckData = this.nowGongGaoCheckList;
        this.checkIds = this.checkedGonggaoIds
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
      this.listSendObjstate = false;
      console.log("选中id" + this.checkedCities);
      console.log(this.nowCheckList);
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
      if(!id||!name){
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
        case "hui":
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
        case "dw":
          this.checkIds = this.fromdata.unionDepartmentIds
            ? this.fromdata.unionDepartmentIds.split(";")
            : [];
          this.checkData = this.unCheckData;
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
        case "gonggao":
          this.checkIds = this.fromdata.realInline
            ? this.fromdata.realInline.split(";")[0].split(",")
            : [];
          this.checkData = this.gongCheckData;
          break;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
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
            this.fromdata.signDepartmentName = names;
            this.fromdata.signDepartmentId = ids;
            this.huiCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = names;
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
            break;
          case "dw":
            this.fromdata.unionDepartment = names;
            this.fromdata.unionDepartmentIds = ids;
            this.unCheckData = this.checkData;
            break;
          case "dosend":
            this.bank_doSendShiwuFw.nextUserName = names;
            this.bank_doSendShiwuFw.nextUserId = ids;
            this.bank_doSendShiwuFw.nextNodeId = params.id;
            this.bank_doSendShiwuFw.nextNodeName = params.name;
            break;
          case "gonggao":
            this.fromdata.realInline = this.fromdata.sendOrderNoticeInfo = ids
              ? ids + ";" + names
              : "";
            this.gongCheckData = this.nowGongGaoCheckList = this.checkData;

            console.log("公告至数据列", this.nowGongGaoCheckList);
            this.checkedGonggaoIds = ids ? ids.split(",") : "";
            console.log("公告至", this.checkedGonggaoIds);
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
      let params = Object.assign(this.fromdata,this.bank_doSendShiwuFw);
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
      if (this.showBySecret&&this.fromdata.secretGists==='') {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "定密依据不能为空!",
          duration: 3000
        });
        return;
      }
      this.clickSaveAndSend = true;

      this.preserve();
      if (!this.saveCheck()) {
        return;
      }
      this.dialogTit = '完成并发送';
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.loadingTree = false;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          // this.loadTreeSelect.pcsAvyId = this.bank_send.pcsAvyId =  res.data&&res.data.length && res.data[0].PCSAVYID;
          this.loadTreeSelect.pcsAvyId = res.data&&res.data.length && res.data[0].PCSAVYID;
          this.loadTreeSelect.curTplNo = this.bank_send.curTplNo;
          this.loadTreeSelect.curMultiTenancyId = this.bank_send.curMultiTenancyId;
          let parms = Object.assign(this.fromdata,this.bank_send);
            parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
          this.$post
          .postData(
            "selWfNode",
            JSON.stringify(parms),
            this.$businessCode.ggfawgl
          )
          .then(res => {
            if(res.message == "Loading"){
              this.loadingTree = true;
            }else{
              this.loadingTree = false;
            }
            this.treeData = res.data;
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
      // let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      let res = this.scrollIntoForm();

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
              res = false;
            }
            break;
          case "解密时间":
            if (
              !this.fromdata.secretFlagType ||
              !this.fromdata.secretFlagContent
            ) {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: tips,
                duration: 1000
              });
              res = false;
            }
            break;
          case "解密条件":
            if (
              !this.fromdata.secretFlagType ||
              !this.fromdata.secretTimeType
            ) {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: tips,
                duration: 1000
              });
              res = false;
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
        res = false;
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
       res = false;
      }
      return res;
      // if (!regT.test(this.fromdata.phone)) {
      //   tips = "电话号码输入有误";
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
    //主送
    bankmain(n) {
      let name = "";
      this.canTab = true;
      this.loadingTree = false;
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
        case "dw":
          name = "单位";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "dosend":
          name = "完成并发送";
          this.canTab = false;
          break;
      }
      this.dialogTit = name;
      
      this.treeData = [];
      this.dialogType = n;
      if (n === "hui") {
        this.hasRadio = true;
        this.canTab = false;
        this.singelCheckF = false;
      }
      if (n=== "dw") {
        this.hasRadio = false;
        this.canTab = false;
        this.singelCheckF = false;
      }
      if (n === "gonggao") {
        // this.loadingTree = true;
        this.canTab = false;
        this.singelCheckF = false;
      }
      this.showCompDialog();
      if (n === "hui" || n==="dw") {
        this.$post.postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_mainXiao),
          this.$businessCode.ggfawgl
        )
        .then(res => {
            if(res.message == "Loading"){
                this.loadingTree = true;
              }else{
                this.loadingTree = false;
              }
            this.treeData = (res && res.data) || [];
          });
      } else if (n === "gonggao") {
        this.$post
          .postData(
            "sendnoticetree",
            JSON.stringify(this.bank_sendnoticetree),
            this.$businessCode.fawgl
          )
          .then(res => {
            this.treeData = (res && res.data) || [];
          });
      } else if (n === "ben") {
        this.$post.postData(
          "getTcSendObjDic",
          JSON.stringify({function: 'getTcSendObjDic'}),
          this.$businessCode.fawgl
        ).then(res => {
          this.treeData = (res && res.data) || [];
          if (this.treeData.length) {
              this.treeData.forEach(item => {
                item.content = JSON.parse(item.content);
                if (n === "ben") {
                  item.text = item.typeName;
                }
              });
            }
        })
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
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          
          this.SsendType = JSON.parse(res.data.sendType);
          this.SemergencyLevel = JSON.parse(res.data.emergencyLevel);
          this.SbusinessType = JSON.parse(res.data.businessType);
          this.StextType = JSON.parse(res.data.textType);
          this.SsecretType = JSON.parse(res.data.swSendSecretType);
          this.SsecretFlag =
            res.data && 
            res.data.secretFlag && 
            JSON.parse(res.data.secretFlag);
          // this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          // this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          this.SdirectRange = JSON.parse(res.data.directSendRange);
          this.archivesUserRange = JSON.parse(res.data.archivesUserRange);
          this.SdirectType = JSON.parse(res.data.directSendType);
          this.SkeepLimit = JSON.parse(res.data.swSendSecretLimit);
          this.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
          this.secretOptionsFlag =
            res.data &&
            res.data.tradeSecret &&
            JSON.parse(res.data.tradeSecret);
          this.countriesSecret =
            res.data &&
            res.data.countriesSecret &&
            JSON.parse(res.data.countriesSecret);
          this.SsecretLimit =
            res.data &&
            res.data.secretFlagContent &&
            JSON.parse(res.data.secretFlagContent);
          // this.rules = this.copyRules;
          this.$nextTick(()=>{
            this.$refs.fromdata.clearValidate();
          })
        });
    },
    //初始值 //input框内容
    toEditShiwuFw() {
      this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : getFormId(this.$route.query.id,'bankEntityDispachId');
      console.log(this.bank_dispach);
      let that = this;
      this.$post
        .postData(
          "toEditShiwuFw",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res)
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "实物发文处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "实物发文处理单";
          }
          that.fromdata = Object.assign(that.fromdata, res.data);

          that.nowUserId = res.data.currentUserId || ''

          that.bwsmFromdata.explain = res.data.explain
          //获取本地存储联系电话res.data.phone= 
          let tcHumanRole = JSON.parse(localStorage.getItem("userInfo"))
          this.fromdata.phone = tcHumanRole.telMobile

          // 更新为已读
          if (this.readFlag != 1) {
            this.getReadFlag();
          }
          
          that.fromdata.isArtificial = "否"
          that.fromdata.isSeparate = "否"
          if (that.fromdata.isDirect === '' || !that.fromdata.isDirect) {
            that.fromdata.isDirect = '否'
          }
          if (that.fromdata.isStandardFile === '' || !that.fromdata.isStandardFile) {
            that.fromdata.isStandardFile = '否'
          }
          
          let day = new Date();
          this.docNoYear = day.getFullYear();

          if (res.data.secretType) {
            that.secretTypechange(res.data.secretType, true);
          }
          if (res.data.secretLimitType) {
            that.workSecurityTab(res.data.secretLimitType, true);
          }
          this.directchange(this.fromdata.isDirect)

          if(this.fromdata.secretType&&this.fromdata.secretType !=="") {
            this.showBySecret = true
          } else {
            this.showBySecret = false
          }

          // 意见
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
          if (res.data.unionDepartmentIds) {
            that.unCheckData = that.concatTreeData(
              res.data.unionDepartmentIds,
              res.data.unionDepartment
            );
          }

          // 控制
          if(res.data.processInstId){
            this.$post
            .postData("getNextUserTaskNode", 
            JSON.stringify({function:"getNextUserTaskNode",processInstId:res.data.processInstId}), 
            this.$businessCode.ggfawgl
            )
            .then(res => {
                this.huanJieMessage = res.data.extAttributes;
                this.setConfig()
                this.setFormConfig()
                setTimeout(() => {
                  this.$refs.fromdata.clearValidate();
                })
              }).catch((err)=>{
                console.log(err)
              })
          }else{
            this.$post
            .postData("getpcsTplStartNode", 
            JSON.stringify({function:"getpcsTplStartNode",multiTenancyId:res.data.multiTenancyId}), 
            this.$businessCode.ggfawgl
            )
            .then(res => {
                console.log(res.data)
                this.huanJieMessage = res.data;
                this.setConfig()
                this.setFormConfig()
                setTimeout(() => {
                  this.$refs.fromdata.clearValidate();
                })
              }).catch((err)=>{
                console.log(err)
              })
          }

          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];
          
          //临时意见处理
          this.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          this.cuteData("opinionDraf", "opinionDrafList", "opinionDrafId");
          this.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          this.cuteData("opinionSecretPerson", "opinionSecretPersonList", "opinionSecretPersonId");
          this.cuteData("opinionCheck", "opinionCheckList", "opinionCheckId");
          this.cuteData("comments", "commentsList", "commentsId");
          this.bank_selectConfig.curNodeId = res.data.currentNodeId;
          this.bank_selectConfig.curTplNo = this.bank_send.curTplNo =
            res.data.pTplNo;
          this.bank_selectConfig.curMultiTenancyId = this.bank_send.curMultiTenancyId =
            res.data.multiTenancyId;
        })
        .catch(error => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "初始化请求失败",
            duration: 1000
          });
          console.log(error)
        });
    },
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
          this.$businessCode.ggfawgl
        )
        .then(res => {
          window.opener.location.reload();
        });
    },
    // 发文类型下拉框
    selectType(value) {
      if(!value) {
        this.fromdata.redHead = this.fromdata.documentNo = '';
        this.SredHead = []
      } else {
        this.bank_redheader.sendType = value;
        this.getTcDocTypeDicByParam();
      }
      if(value=="部门发文") {
        this.showUnionDepartment = false
      } else {
        this.showUnionDepartment = true
      }
      if(value=="行发文"||value=="部门发文"||value=="党务发文"){
        this.showTextType = true
        this.showmeetingEndTime = false
      } else if(value === "会议纪要") {
        this.showmeetingEndTime = true
        this.showTextType = false
      } else {
        this.showTextType = false
        this.showmeetingEndTime = false
      }
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.data) {
            this.SredHead = res.data;
            if(res.data !=="") {
              this.fromdata.redHead = res.data[0].redHead
            } else {
              this.fromdata.redHead = ''
            }
            this.selectredhead()
            this.$forceUpdate()
          }
        });
    },

    // 代字/红头  下拉 发文字号获取值
    selectredhead(val) {
      this.fromdata.documentNo = this.fromdata.redHead +
            "〔" +
            this.docNoYear +
            "〕" +
            this.wh +
            "号";
      this.$forceUpdate()
    },
    // 保存
    async preserve(type) {
      
      if (this.fromdata.title === '' || this.fromdata.redHead === '') {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "标题或文号不能为空!",
          duration: 1000
        })
        return
      } else {
        let successState = false;
        this.bank_dispach.id = getFormId(this.$route.query.id,'bankEntityDispachId');

        var obj = Object.assign(this.fromdata,this.bank_addShiwuFw);
        this.$post
        .postData("addShiwuFw", JSON.stringify(obj), this.$businessCode.fawglfj)
        .then(res => {
          if (res && res.success) {
            this.bank_addShiwuFw.id = this.bank_dispach.id = this.bank_doSendShiwuFw.id = getFormId(this.$route.query.id,'bankEntityDispachId',res.data.id);

            if (type&&type!='uploadfile') {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            this.showExplain = false
            if(type==="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
            }
            this.toEditShiwuFw();
            successState = true;
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
          successState = false;
        });
        return successState;
      }
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
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.preserve();
          window.location.href = "about:blank";
          window.close();
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
    // 办结
    handleDoFinish() {
      let doFinish_form = Object.assign(
        this.fromdata,
        {
          function: "doFinish",
          tplNo: this.fromdata.pTplNo
        }
      );
      this.$post
        .postData(
          "doFinish",
          JSON.stringify(doFinish_form),
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
    
    
    //清稿弹窗
    doClearDraft(flag) {
      if (!flag) {
        let that = this;
        this.getFileInfo(that).then(res => {
          if (res.state) {
            let data = that.$router.resolve({
              path: "/openAndSave_Word",
              query: {
                state: "viewFile",
                id: getFormId(that.$route.query.id, "bankEntityDispachId"),
                zhengWenState: 0,
                JYcode: that.$businessCode.fawgl,
                multiTenancyId: that.fromdata.multiTenancyId,
                relativePath: res ? res.filePath : "",
                fileName: res ? res.fileName : "",
                pageFlag: "fawen",
                cleanDraftFlag: true,
                showBtns: false
              }
            });
            window.open(data.href, "_blank");
          }
        });
      } else {
        this.backDrafting();
      }
    },
    //恢复清稿操作
    backDrafting() {
      this.bank_doRecoverFile.id = getFormId(
        this.$route.query.id,
        "bankEntityDispachId"
      );
      this.$post
        .postData(
          "doRecoverFile",
          JSON.stringify(this.bank_doRecoverFile),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "恢复清稿成功",
              duration: 1000
            });
            this.toEdit();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "操作失败",
            duration: 1000
          });
        });
    },
    //套红操作
    async findTemplete(file){
      let fileInfoTh = {
        state:false,
        templateUrl:'',//套红路径
        fileName:file.fileName,
        filePath:file.filePath,
      }
       this.bank_findTemplete.sendType = this.fromdata.type;
       this.bank_findTemplete.redHead =  this.fromdata.redHead;
       this.bank_findTemplete.id = getFormId(this.$route.query.id,"bankEntityDispachId");
      await this.$post
        .postData(
          "findTemplete",
          JSON.stringify(this.bank_findTemplete),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
             if(res.data){
               fileInfoTh.templateUrl = res.data;
             }
             fileInfoTh.state = true;
             this.getFileInfo(this,fileInfoTh).then((template)=>{
               if(template.state){
                 this.doDraft(template)
               }
             })
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
            message: "套红操作失败",
            duration: 500
          });
        });

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
      if(!getFormId(this.$route.query.id,"bankEntityDispachId")){
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
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState!=1?'viewFile':this.draftFlag,
          id:getFormId(this.$route.query.id,"bankEntityDispachId"),
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen'
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },

    // 删除此文
    delectArticle() {
      this.bank_dispach.id = getFormId(this.$route.query.id,'bankEntityDispachId');
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      console.log(
        this.bank_dispach.id,
        this.$route.query.id,
        deletesendorderid
      );
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
    // 收藏
    collect() {
      let that = this;
      let shiwutitle = this.fromdata.documentNo;//字号
      let draftInfo = this.fromdata.filePath?[].concat({fileName:this.fromdata.fileName,filePath:this.fromdata.filePath},this.fromdata.attchmentFileInfo):this.fromdata.attchmentFileInfo;//收藏时下载正文
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "rexamineBankEntityDispach",
        this.$businessCode.fawglfj,
        this.fromdata.title,//标题
        that
      );
    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      console.log(this.fromdata.processInstId);
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.ggfawgl
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
        path: '/swfwcld',
        query: {
          id:this.bank_dispach.id
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
          flowTranId: this.$businessCode.fawglfj,
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
    handleSaveBWSM() {
      this.fromdata.explain = this.bwsmFromdata.explain
      this.preserve()
    },
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) { // 审核意见
          this.fromdata.opinionCheck = this.fromdata.opinionCheck
            ? this.fromdata.opinionCheck + data
            : data;
        } else if (this.clickTypes == 2) { // 核稿意见
          this.fromdata.opinionDraf = this.fromdata.opinionDraf
            ? this.fromdata.opinionDraf + data
            : data;
        } else if (this.clickTypes == 3) { // 会签意见
          this.fromdata.opinionSign = this.fromdata.opinionSign
            ? this.fromdata.opinionSign + data
            : data;
        } else if (this.clickTypes == 4) { // 签发意见
          this.fromdata.opinionSend = this.fromdata.opinionSend
            ? this.fromdata.opinionSend + data
            : data;
        } else if (this.clickTypes == 5) { // 定密责任人意见
          this.fromdata.opinionSecretPerson = this.fromdata.opinionSecretPerson
            ? this.fromdata.opinionSecretPerson + data
            : data;
        }
        this.$forceUpdate();
      }
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
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
    // 重发申请
    handleRexamine () {
      this.$post.postData('creatAgainOrder', JSON.stringify(this.bank_rexamine), this.$businessCode.fawgl).then((res) => {
        console.log(res.data.id)
        const routeData = this.$router.resolve({
          path: '/rexamineEntityDispach',
          query: {
            id: res.data.id
          }
        });
        window.open(routeData.href, "_self");
      })
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
      // this.rules = this.copyRules;
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    secretTypechange(value, type) {
      if(this.fromdata.secretType&&this.fromdata.secretType !=="") {
        this.showBySecret = true
      } else {
        this.showBySecret = false
      }
      //type 回显处理
      if (value) {
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
        if (value == "商业秘密") {
          this.SbusinessSecret = this.secretOptionsFlag
        } else if (value == "国家秘密") {
          this.SbusinessSecret = this.countriesSecret
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
    // 退回
    handleTemplateRadio(value) {
      this.backFormData.sendOrderId = this.$route.query.id;
      this.backFormData.beBackNode = value.node_Name;
      this.backFormData.beBackNodeId = value.node_Code;
      this.backFormData.beBackUser = value.userName;
      this.backFormData.beBackUserId = value.userId;
    },
    handleShowBack() {
      this.bank_back.processInstId = this.fromdata.processInstId;
      this.bank_back.currNode = this.fromdata.currentNodeId;
      this.$post
        .postData(
          "returnWfNode",
          JSON.stringify(this.bank_back),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.backTableData = res.data;
        });
      this.showBack = true;
    },
    handleBackOff() {
      var obj = Object.assign(this.fromdata,this.backFormData);
      this.$post
        .postData("doReturn", JSON.stringify(obj), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success) {
            this.showBack = false;
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "退回成功",
              duration: 1000,
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
    // 发送
    handleSend() {
      this.showSend = true
    },
    handleSendObj() {
      this.loadingCheck = true;
      this.listSendObjstate = true;
      this.$post
        .postData(
          "getTcDeptTypeDicList",
          JSON.stringify(this.banl_sendObj),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.loadingCheck = false;
          this.sendTableDatas = [{orgDprt:[]}];
          this.sendTableDatasCol = [];
          let dataList = res.data;
          for (let i = 0; i < dataList.length; i++) {
            let temp = dataList[i];
            this.sendTableDatasCol.push({ label: temp.typeName ,isIndeterminate: false})
            this.sendTableDatas[0].orgDprt[i]={name:[]};
            if (temp.deptIds) {
              let idArr = temp.deptIds.split(";");
              let nameArr = temp.deptNames.split(";");
              for (let j = 0; j < idArr.length; j++) {
                var transArr = { deptIds: idArr[j], deptNames: nameArr[j] };
                this.sendTableDatas[0].orgDprt[i].name.push(transArr);
              }
            }
          }
        });
    },
    handleVerifySend() {
      let that = this;
      if(this.fromdata.type == '会议纪要'&&(!this.fromdata.meetingEndTime || this.fromdata.meetingEndTime=="")) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "会议结束时间不能为空！",
          duration: 2000
        });
        return;
      }
      if(this.checkedCities.length<=0) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择要发送的部门",
          duration: 2000
        });
        return;
      }
      let obj = Object.assign(this.fromdata,this.bank_doFinalSend);
      obj.function = "checkUser";
      // 添加校验所选部门是否有发文岗
      this.$post
        .postData("checkUser", JSON.stringify(obj), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success) {
            // obj.isSpecial = 0; //发送
            obj.function = "doAgainFinalSend";
            obj.userMap = res.data
            this.$post
              .postData(
                "doAgainFinalSend",
                JSON.stringify(obj),
                this.$businessCode.fawgl
              )
              .then(res => {
                if(res&&res.success) {
                  this.showSend = false;
                  this.$message({
                    type: "success",
                    offset: 400,
                    showClose: true,
                    message: "发送成功",
                    duration: 1500,
                    onClose: () => {
                      window.location.href = "about:blank";
                      window.opener.location.reload();
                      window.close();
                    }
                  });
                } else {
                  // this.showSend = false;
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: res.message,
                    duration: 1500,
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
    },

    // 生成文号/退号/生成上年文号
    SetDocNoHandle() {
      const [stra, strb] = this.setDocNum.split("-");
      this.doSaveDocumentNumFuc.num = stra;
      this.doSaveDocumentNumFuc.redHead = this.fromdata.redHead;
      this.doSaveDocumentNumFuc.year = this.getNumListForm.year;
      this.doSaveDocumentNumFuc.sendType = this.fromdata.type;
      this.$post
        .postData(
          "doSaveDocumentNum",
          JSON.stringify(this.doSaveDocumentNumFuc),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.fromdata.documentNo = this.fromdata.redHead +
            "〔" +
            this.getNumListForm.year +
            "〕" +
            this.doSaveDocumentNumFuc.num +
            "号";
          if (this.fromdata.directRange !== "") {
            this.fromdata.title = this.fromdata.title + "〔"+ this.fromdata.directRange +"〕"
          } else {
            this.fromdata.title = this.fromdata.title
          }
          this.preserve();
          this.$forceUpdate();
        });
      this.SetDocNoVisible = false;
      this.scwh = false
      this.th = true
    },
    handleSetDocNo() {
      this.SetDocNoVisible = true;
      let day = new Date();
      this.docNoYear = day.getFullYear();
      this.getNumListForm.redHead = this.fromdata.redHead;
      this.getNumListForm.year = this.docNoYear;
      let doCreateNumForm = {
        function: "getNumList",
        redHead: this.fromdata.redHead,
        redHeadName: this.fromdata.redHead,
        type: 'CN000',
        year: this.docNoYear,
        sendType: this.fromdata.type
      };
      this.$post
        .postData(
          "getNumList",
          JSON.stringify(doCreateNumForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          // this.docNoNum = res.data
          // this.selectredhead()
          this.DocNoDataList = res.data;
        });
    },
    handleClearDocNo() {
      this.handeldoBackNoFuc = true;
    },
    doBackNoHandle() {
      this.doBackNoFuc.redHead = this.fromdata.redHead;
      this.doBackNoFuc.year = this.fromdata.documentNo.split("〔")[1]
      this.doBackNoFuc.year = this.doBackNoFuc.year.split("〕")[0]
      this.doBackNoFuc.num = this.fromdata.documentNo.split("〕")[1];
      this.doBackNoFuc.num = this.doBackNoFuc.num.slice(0, -1);
      this.doBackNoFuc.type = 'CN000';
      this.doBackNoFuc.sendType = this.fromdata.type;
      this.$post
        .postData(
          "doBackNo",
          JSON.stringify(this.doBackNoFuc),
          this.$businessCode.fawgl
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

            this.fromdata.documentNo = this.fromdata.redHead +
              "〔" + this.docNoYear + "〕" + "号";
            this.fromdata.title = this.fromdata.title.split("〔")[0]
            this.scwh = true
            this.th = false
            this.preserve();
            this.$forceUpdate();
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
    handleSetLastyearDocNo() {
      this.SetDocNoVisible = true;
      let day = new Date();
      this.docNoYear = day.getFullYear() - 1;
      this.getNumListForm.redHead = this.fromdata.qianbaoCode;
      this.getNumListForm.year = this.docNoYear;
      let doCreateNumForm = {
        function: "getNumList",
        redHead: this.fromdata.redHead,
        redHeadName: this.fromdata.redHead,
        type: 'CN000',
        year: this.docNoYear,
        sendType: this.fromdata.type
      };
      this.$post
        .postData(
          "getNumList",
          JSON.stringify(doCreateNumForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          // this.docNoNum = res.data
          // this.selectredhead()
          this.DocNoDataList = res.data;
        });
    }
  },
  watch:{
    checkedCities:{
      handler(neww){
        let names = [];
        this.$nextTick(()=>{
           neww.forEach((node)=>{
            this.nowCheckList.forEach((item)=>{
              if(item.deptIds == node){
                names.push(item.deptNames);
              }
            })
          })
          this.fromdata.realMain = neww.length?neww.join(",")+";"+names.join(","):'';
        })
      }
    }
  },
  created() {
    this.formText = formTextChange('send')
    this.bank_dispach.id = this.uploadConfig.id = getFormId(this.$route.query.id,'bankEntityDispachId');
    this.bank_doSendShiwuFw.id = this.bank_rexamine.sendOrderId = this.bank_dispach.id;
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl;  //完成并发送 树   流程交易线   chai
    this.toEditShiwuFw();
    this.getSendOrderDicByParam();
    // this.rules = this.copyRules;
    this.$nextTick(()=>{
      this.$refs.fromdata.clearValidate();
    })
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
  .el-checkbox-group{
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
.bank_dispach {
  .dialog_backed{
    /deep/ .el-radio__label {
      display: none;
    }
  }

}
.sendRowButton {
  padding: 10px;
  height:400px;
  /deep/ .el-table__body,
  /deep/ .el-table__header {
    table-layout: auto;
  }
  /deep/ .el-table__body-wrapper{
    padding-right: 20px;
  }
  .el-checkbox-group {
    height: 500px;
    white-space: nowrap;
  }
  .tableH{
    .el-checkbox-group {
      height: auto;
      white-space: nowrap;
      width: fit-content;
    }
  }
  /deep/ .el-table{
    overflow: scroll;
    width: fit-content;
    max-width: fit-content;
  }
  /deep/ .el-table::before{
    display:none;
  }
  /deep/ .el-table td {
    white-space: nowrap;
    // width: fit-content;
    vertical-align: top;
    div {
      white-space: nowrap;
    }
  }
  /deep/ .el-table th{
    overflow: scroll;
    vertical-align: top;
  }
 /deep/ .back_tit {
    font-size: 16px;
    line-height: 26px;
    color: #409eff;
    margin-bottom: 10px;
  }
  /deep/ .el-table .cell {
    overflow: visible;
    white-space: nowrap;
    word-break: break-all;
    width: fit-content;
    max-height: 300px;
  }
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
