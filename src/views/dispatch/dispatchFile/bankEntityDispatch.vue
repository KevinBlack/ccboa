<template>
  <div id="bankEntityDispatch" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>

        <div class="grid_comtent">
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="closeHandler = true"
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
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{ draftOrganTitle }}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <sideBar container="#bank_dispach_content"></sideBar>
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
                <el-col :span="8">
                  <el-form-item label="发文类型" prop="type" ref="type">
                    <el-select
                      v-model="fromdata.type"
                      :disabled="readFields.type"
                      placeholder="请选择"
                      style="width:100%"
                      @change="selectType"
                    >
                      <el-option value label="请选择"></el-option>
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
                      @change="selectredhead('1')"
                    >
                      <el-option value label="请选择"></el-option>
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
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" props="emergencyLevel" ref="emergencyLevel">
                    <el-select
                      v-model="fromdata.emergencyLevel"
                      :disabled="readFields.emergencyLevel"
                      placeholder="请选择"
                      style="width:100%"
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
                  <el-form-item label="业务分类" :span="8" prop="businessType" ref="businessType">
                    <!-- <el-select
                      v-model="fromdata.businessType"
                      multiple
                      :disabled="readFields.businessType"
                      placeholder="请选择"
                      style="width:100%"
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
                      class="hqbm"
                      disabled
                    >
                      <el-button slot="append" icon="el-icon-plus" :disabled="fromdata.signState=='0'" @click="handleBusinessDialog"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="showTextType">
                  <el-form-item label="文种" :span="8" prop="textType" ref="textType">
                    <el-select
                      v-model="fromdata.textType"
                      :disabled="readFields.textType"
                      placeholder="请选择"
                      style="width:100%"
                    >
                      <el-option value label="请选择"></el-option>
                      <el-option
                        v-for="textTypeitem in StextType"
                        :key="textTypeitem.label"
                        :label="textTypeitem.label"
                        :value="textTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-show="showmeetingEndTime">
                  <el-form-item label="会议结束时间" :span="8" prop="meetingEndTime" ref="meetingEndTime">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="fromdata.meetingEndTime"
                      :picker-options="dateOptions"
                      format="yyyy-MM-dd HH:mm:ss"
                      :disabled="readFields.meetingEndTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
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
                      <el-form-item
                        label="秘密标志"
                        :span="8"
                        prop="secretFlagType"
                        ref="secretFlagType"
                      >
                        <el-select
                          @change="workSecurityTab"
                          v-model="fromdata.secretFlagType"
                          :disabled="readFields.secretFlagType"
                          placeholder="请选择"
                          style="width:100%"
                        >
                          <el-option value label="请选择"></el-option>
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
                      <el-form-item
                        label="秘密标志"
                        :span="8"
                        prop="secretFlagType"
                        ref="secretFlagType"
                      >
                        <el-select
                          @change="workSecurityTab"
                          v-model="fromdata.secretFlagType"
                          :disabled="readFields.secretFlagType"
                          placeholder="请选择"
                          style="width:100%"
                        >
                          <el-option value label="请选择"></el-option>
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
                    <!-- 密级标志 -->
                    <el-col :span="8" v-if="flag && secretFlagTypeFlag">
                      <el-row>
                        <el-col :span="16">
                          <el-form-item
                            label="密级标志"
                            :span="8"
                            prop="secretFlagType"
                            ref="secretFlagType"
                          >
                            <el-select
                              @change="workSecurityTabTime"
                              v-model="fromdata.secretFlagType"
                              :disabled="readFields.secretFlagType"
                              placeholder="请选择"
                              style="width:90%"
                            >
                              <el-option value label="请选择"></el-option>
                              <el-option
                                v-for="secretFlagTypeitem in SbusinessSecret"
                                :key="secretFlagTypeitem.label"
                                :label="secretFlagTypeitem.label"
                                :value="secretFlagTypeitem.label"
                              ></el-option>
                            </el-select>
                            <i style="width:10%;text-align:center;" :class="isCountry"></i>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item
                            label
                            :span="8"
                            prop="secretFlagContent"
                            ref="secretFlagContent"
                            class="no-width-label"
                          >
                            <el-input
                              style="width:100%;margin:0 !important;"
                              v-model="fromdata.secretFlagContent"
                              :disabled="readFields.secretFlagContent"
                              @input="inputChange2"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item
                            label
                            :span="8"
                            prop="secretTimeType"
                            ref="secretTimeType"
                            class="no-width-label"
                          >
                            <el-select
                              v-model="fromdata.secretTimeType"
                              :disabled="readFields.secretTimeType"
                              @change="workSecurityTabTime"
                              placeholder="请选择"
                              style="width:100%;margin:0 !important;"
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
                      </el-row>
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
                          prop="secretFlagType"
                          ref="secretFlagType"
                          placeholder="请选择"
                          style="width:40%"
                        >
                          <el-option value label="请选择"></el-option>
                          <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                          ></el-option>
                        </el-select>
                        <i :class="isCountry"></i>
                        <el-date-picker
                          type="date"
                          @blur="workSecurityTabTime"
                          placeholder="选择日期"
                          v-model="fromdata.secretFlagContent"
                          :disabled="readFields.secretFlagContent"
                          prop="secretFlagContent"
                          ref="secretFlagContent"
                          style="width: 40%;"
                          @change="inputChange3"
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
                          <el-option value label="请选择"></el-option>
                          <el-option
                            v-for="secretFlagTypeitem in SbusinessSecret"
                            :key="secretFlagTypeitem.label"
                            :label="secretFlagTypeitem.label"
                            :value="secretFlagTypeitem.label"
                          ></el-option>
                        </el-select>
                        <i :class="isCountry"></i>
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
                  </el-row>
                </el-col>

                <el-col v-if="showBySecret">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
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
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.secretGists"
                        :disabled="readFields.secretGists"
                        name="secretGists"
                        style="flex:1"
                      ></el-input>
                      <button
                        @click="secretGistsbox"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门" prop="draftDepartment" ref="draftDepartment">
                    <el-input
                      v-model="fromdata.draftDepartment"
                      :disabled="readFields.draftDepartment"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿人" prop="draftUser" ref="draftUser">
                    <el-input v-model="fromdata.draftUser" :disabled="readFields.draftUser"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input
                      v-model="fromdata.phone"
                      :disabled="readFields.phone"
                      @input.native="phoneChange"
                    ></el-input>
                  </el-form-item>

                  <!-- <div
                      :class="['el-form-item is-required el-form-item--small',{'is-error':!fromdata.phone&& phoneCheck}]"
                    >
                      <label for="phone" class="el-form-item__label" style="width: 130px;">联系电话</label>
                      <div class="el-form-item__content" style="margin-left: 130px;">
                        <div data-v-5283a677 class="el-input el-input--small">
                          <input ref="phoneError" @blur="inputChangePhone" type="text" autocomplete="off" v-model="fromdata.phone" class="el-input__inner" />
                        </div>
                        <div v-if="!fromdata.phone && phoneCheck" :class="{'el-form-item__error':!fromdata.phone}">请输入联系电话</div>
                      </div>
                  </div>-->
                </el-col>
                <el-col v-if="!showUnionDepartment">
                  <el-form-item label="联合发文单位" prop="unionDepartment" ref="unionDepartment">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.unionDepartment"
                        :disabled="readFields.unionDepartment"
                        style="flex:1"
                        @input="inputChange"
                      ></el-input>
                      <el-button
                        type="button"
                        class="el-button el-button--default dimi_btn2"
                        @click="bankmain('dw')"
                        v-if="!selectUnionDepartment"
                      >
                        <i class="el-icon-plus"></i>
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
                        <el-radio
                          v-model="fromdata.isDirect"
                          :disabled="readFields.isDirect"
                          @change="directchange(1)"
                          @input="inputChange"
                          label="是"
                        >是</el-radio>
                        <el-radio
                          v-model="fromdata.isDirect"
                          :disabled="readFields.isDirect"
                          @change="directchange(1)"
                          @input="inputChange"
                          label="否"
                        >否</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="直发范围"
                        :span="8"
                        v-if="isDirectFlag"
                        prop="directRange"
                        ref="directRange"
                      >
                        <el-select
                          v-model="fromdata.directRange"
                          :disabled="readFields.directRange"
                          placeholder="请选择"
                          style="width:100%"
                          @input="inputChange"
                        >
                          <el-option value label="请选择"></el-option>
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
                        v-if="isDirectFlag"
                        prop="directType"
                        ref="directType"
                      >
                        <el-select
                          v-model="fromdata.directType"
                          :disabled="readFields.directType"
                          placeholder="请选择"
                          style="width:100%"
                          @input="inputChange"
                        >
                          <el-option value label="请选择"></el-option>
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
                    <el-radio
                      v-model="fromdata.isStandardFile"
                      :disabled="readFields.isStandardFile"
                      @change="directchange(2)"
                      label="是"
                    >是</el-radio>
                    <el-radio
                      v-model="fromdata.isStandardFile"
                      :disabled="readFields.isStandardFile"
                      @change="directchange(2)"
                      label="否"
                    >否</el-radio>
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
                      <el-option value label="请选择"></el-option>
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
                    <el-select
                      v-model="fromdata.keepLimit"
                      :disabled="readFields.keepLimit"
                      placeholder="请选择"
                      style="width:100%"
                    >
                      <el-option value label="请选择"></el-option>
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
                    <el-radio
                      v-model="fromdata.isNeedCheckcp"
                      :disabled="readFields.isNeedCheckcp||fromdata.signState=='0'"
                      @change="inputChange1('isXB')"
                      label="是"
                    >是</el-radio>
                    <el-radio
                      v-model="fromdata.isNeedCheckcp"
                      title="请经过消保审查后重新提交"
                      :disabled="readFields.isNeedCheckcp||fromdata.signState=='0'"
                      @change="inputChange1('isXB')"
                      label="否"
                    >否</el-radio>
                    <el-radio
                      v-model="fromdata.isNeedCheckcp"
                      title="不涉及消费者权益保护，无需进行消保审查"
                      :disabled="readFields.isNeedCheckcp||fromdata.signState=='0'"
                      @change="inputChange1('isXB')"
                      label="不涉及"
                    >不涉及</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
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
                    <el-input
                      v-model="fromdata.title"
                      :disabled="readFields.title"
                      placeholder="请输入正文标题"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input
                      @blur="saveAttachTitle"
                      type="textarea"
                      resize="none"
                      autosize
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
                    <div style="display:flex">
                      <el-input
                        v-model="fromdata.signDepartmentName"
                        type="textarea"
                        resize="none"
                        autosize
                        disabled
                        placeholder="请选择会签部门"
                        style="flex:1;color: #F00;"
                        @input="inputChange"
                      ></el-input>
                      <el-button
                        class="el-button el-button--default dimi_btn"
                        @click="bankmain('hui')"
                      >
                        <i class="el-icon-plus"></i>
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item :label="formText.outsideSign" prop="outsideSign" ref="outsideSign">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.outsideSign"
                      :disabled="readFields.outsideSign"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="主    送" prop="main" ref="main">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        v-model="fromdata.main"
                      ></el-input>
                      <button
                        @click="bankmain('zhusong')"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
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
                    </el-input>-->
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.copy"
                      ></el-input>
                      <button
                        @click="bankmain('chao')"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
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
                    </el-input>-->
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        @input="inputChange"
                        v-model="fromdata.inline"
                      ></el-input>
                      <button
                        @click="bankmain('ben')"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
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
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="签发意见" prop="opinionSend" ref="opinionSend">
                    <!-- <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
                          <div v-if="item.status" class="d_flex">
                            <el-row class="d_b100">
                              <el-col
                                :span="22"
                                :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                              >
                                <el-input
                                  type="textarea"
                                  resize="none"
                                  autosize
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
                        maxlength="500"
                        autosize
                        style="flex:1"
                        @blur="inputChange"
                        v-model="fromdata.opinionSend"
                        v-if="!editedIdeaFields.opinionSend||fromdata.opinionSendId||!(fromdata.opinionSendList && fromdata.opinionSendList.length!=0)"
                        :disabled="editedIdeaFields.opinionSend||fromdata.signState=='0'"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=4,fromdata.opinionSend&&fromdata.opinionSend.length)"
                        v-if="!editedIdeaFields.opinionSend"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
                      >
                        <i class="el-icon-edit"></i>
                      </button>
                    </div>
                    <opinionText
                      :opinionText="fromdata.opinionSendList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item
                    label="定密责任人意见"
                    prop="opinionSecretPerson"
                    ref="opinionSecretPerson"
                  >
                    <!-- <div v-for="(item) in fromdata.opinionSecretPersonList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            :span="22"
                            :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                          >
                            <el-input
                              type="textarea"
                              resize="none"
                              autosize
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
                        @blur="inputChange"
                        v-model="fromdata.opinionSecretPerson"
                        v-if="!editedIdeaFields.opinionSecretPerson||fromdata.opinionSecretPersonId||!(fromdata.opinionSecretPersonList && fromdata.opinionSecretPersonList.length!=0)"
                        :disabled="editedIdeaFields.opinionSecretPerson"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=5,fromdata.opinionSecretPerson&&fromdata.opinionSecretPerson.length)"
                        v-if="!editedIdeaFields.opinionSecretPerson"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
                      >
                        <i class="el-icon-edit"></i>
                      </button>
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
                  <el-form-item label="核稿意见" prop="opinionDraf" ref="opinionDraf">
                    <!-- <div v-for="(item) in fromdata.opinionDrafList" :key="item.id">
                          <div v-if="item.status" class="d_flex">
                            <el-row class="d_b100">
                              <el-col
                                :span="22"
                                :class="['pos_r',{'disable_w':(item.createTime!=fromdata.sendOpinionMaxTime||item.userId!=nowUserId)||fromdata.currentNodeId=='006'}]"
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
                                v-if="item.createTime==fromdata.sendOpinionMaxTime&&item.userId==nowUserId&&fromdata.currentNodeId!='006'"
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
                        maxlength="500"
                        autosize
                        style="flex:1"
                        @blur="inputChange"
                        v-model="fromdata.opinionDraf"
                        v-if="!editedIdeaFields.opinionDraf||fromdata.opinionDrafId||!(fromdata.opinionDrafList && fromdata.opinionDrafList.length!=0)"
                        :disabled="editedIdeaFields.opinionDraf||fromdata.signState=='0'"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=2,fromdata.opinionDraf&&fromdata.opinionDraf.length)"
                        v-if="!editedIdeaFields.opinionDraf"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
                      >
                        <i class="el-icon-edit"></i>
                      </button>
                    </div>
                    <opinionText
                      :opinionText="fromdata.opinionDrafList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="会签意见" prop="opinionSign" ref="opinionSign">
                    <!-- <div v-for="item in fromdata.opinionSignList" :key="item.id">
                          <div v-if="item.status" class="d_flex">
                            <el-row class="d_b100">
                              <el-col
                                :span="22"
                                :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
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
                        maxlength="500"
                        autosize
                        style="flex:1"
                        @blur="inputChange"
                        v-model="fromdata.opinionSign"
                        v-if="!editedIdeaFields.opinionSign||fromdata.opinionSignId||!(fromdata.opinionSignList && fromdata.opinionSignList.length!=0)"
                        :disabled="editedIdeaFields.opinionSign||fromdata.signState=='0'"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=3,fromdata.opinionSign&&fromdata.opinionSign.length)"
                        v-if="!editedIdeaFields.opinionSign&&fromdata.signState!='0'"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
                      >
                        <i class="el-icon-edit"></i>
                      </button>
                    </div>
                    <opinionText
                      :opinionText="fromdata.opinionSignList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="审核意见" prop="opinionCheck" ref="opinionCheck">
                    <!-- <div v-for="item in fromdata.opinionCheckList" :key="item.id">
                          <div v-if="item.status" class="d_flex">
                            <el-row class="d_b100">
                              <el-col
                                :span="22"
                                :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
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
                        maxlength="500"
                        autosize
                        style="flex:1"
                        @blur="inputChange"
                        v-model="fromdata.opinionCheck"
                        v-if="!editedIdeaFields.opinionCheck||fromdata.opinionCheckId||!(fromdata.opinionCheckList && fromdata.opinionCheckList.length!=0)"
                        :disabled="editedIdeaFields.opinionCheck||fromdata.signState=='0'"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=1,fromdata.opinionCheck&&fromdata.opinionCheck.length)"
                        v-if="!editedIdeaFields.opinionCheck&&fromdata.signState!='0'"
                        type="button"
                        class="el-button el-button--default dimi_btn2"
                      >
                        <i class="el-icon-edit"></i>
                      </button>
                    </div>
                    <opinionText
                      :opinionText="fromdata.opinionCheckList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="备注" prop="comments" ref="comments">
                    <!-- <div v-for="(item) in fromdata.commentsList" :key="item.id">
                          <div v-if="item.status" class="d_flex">
                            <el-row class="d_b100">
                              <el-col
                                :span="22"
                                :class="['pos_r',{'disable_w':item.createTime !=fromdata.sendOpinionMaxTime||item.userId!=nowUserId}]"
                              >
                                <el-input
                                  type="textarea"
                                  resize="none"
                                  autosize
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
                        maxlength="500"
                        autosize
                        v-model="fromdata.comments"
                        @blur="inputChange"
                        v-if="!editedIdeaFields.comments||fromdata.commentsId||!(fromdata.commentsList && fromdata.commentsList.length!=0)"
                        :disabled="editedIdeaFields.comments||fromdata.signState=='0'"
                      ></el-input>
                    </div>
                    <opinionText
                      :opinionText="fromdata.commentsList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :isRemarks="true"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 业务分类 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="showBusinessTypeDialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="业务分类"
    >
      <el-form>
        <el-form-item>
          <el-checkbox-group v-model="businessTypeList">
            <el-checkbox
              v-for="businessType in SbusinessType"
              :key="businessType.label"
              :label="businessType.label"
              :value="businessType.label"
              style="width:25%;float:left;"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="showBusinessTypeDialog = false">取 消</el-button> -->
        <el-button type="primary" @click="handleSaveBusinessType">保存</el-button>
      </div>
    </el-dialog>
    <!-- 退回 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="showBack"
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
      v-dialogDrag
      :visible.sync="showSend"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      title="发送确认"
    >
      <h6 class="back_tit">是否发送给以下对象</h6>
      <div class="send_content">
        <el-row>
          <el-col :span="3">
            <el-button @click="handleSendObj">发送对象</el-button>
          </el-col>
          <el-col :span="21">
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
        <el-divider></el-divider>
        <el-row v-if="false">
          <el-col :span="2">
            <el-button @click="sendBrandTo">公告至</el-button>
          </el-col>
          <el-col :span="22">
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
      <!-- <p class="send_ps">
        <b>注</b> : 密件只能公告至行领导和高管!
      </p>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSend = false">取 消</el-button>
        <el-button type="primary" @click="handleSendConfirm">发 送</el-button>
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
                    >
                      <span :style="{'width':item.width}">{{user.deptNames}}</span>
                    </el-checkbox>
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
    <el-dialog title="生成文号" v-dialogDrag width="30%" :visible.sync="SetDocNoVisible">
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
        <el-form-item class="size_yuanYin">
          <el-input
            type="textarea"
            resize="none"
            autosize
            maxlength="2500"
            placeholder="办文说明限制2500字"
            rows="20"
            v-model="bwsmFromdata.explain"
            :disabled="readFields.explain"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveBWSM">保存</el-button>
      </div>
    </el-dialog>
    <!--退号-->
    <el-dialog title="退号" v-dialogDrag width="30%" :visible.sync="handeldoBackNoFuc">
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
            <el-button
              type="text"
              style="text-align:left;padding-left:10px;line-height:25px;word-break:break-all;white-space:pre-line;"
              @click="viewDraftFile(bank_import.fileName,bank_import.filePath,$businessCode.fawglfj)"
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
    <!--定密依据-->
    <el-dialog v-dialogDrag title="定密依据" :visible.sync="secretBaslsDialogVisible">
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
    <el-dialog
      title="提示"
      v-dialogDrag
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
    <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
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
    <!-- <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls> -->
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
// import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import minixs from "@/minixs/index";
import isNowUser from "@/minixs/isNowUser";
import viewDraft from "@/minixs/viewDraft";
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/indexDsipatch";
import closeMessage from "components/closeMessage/index";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from "@/components/sideBar/sideBar";
import formTextChange from "@/components/formText/index";

export default {
  name: "BankEntityDispatch",
  components: {
    timeDialog,
    treeCofig,
    // secretBasls,
    appendWriteList,
    opinionText,
    closeMessage,
    sideBar
  },
  mixins: [minixs, viewDraft, dispatchIndex, isNowUser],
  data() {
    return {
      showBusinessTypeDialog: false,
      businessTypeList: [],
      formText: {
        inline: "本行发送",
        outsideSign: "行外会签"
      },
      closeHandler: false,
      showCloseDialog: false,
      defaultUser: {}, //完成并发送默认值
      phoneCheck: false,
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      treeTradeCode: "", //人员树交易线
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
      fasong: false,
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "删除此文", type: "btn_sccw", show: false },
        { name: "发送", type: "btn_fs", show: this.fasong },
        { name: "办结", type: "btn_banjie", show: false },
        { name: "退回", type: "btn_th", show: false },
        { name: "生成文号", type: "btn_scwh", show: this.scwh },
        { name: "生成上年度文号", type: "btn_scsndwh", show: this.scwh },
        { name: "退号", type: "btn_tuihao", show: this.th },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "打印处理单", type: "btn_dycld", show: false },
        { name: "收藏", type: "btn_sc", show: false },
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
        meetingEndTime: false,
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
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: ""
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
      draftOrganTitle: "",
      bank_DeleteSendOrder: {
        function: "doDeleteShiwuFw",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
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
      // 办文说明
      bwsmFromdata: {
        explain: ""
      },
      showExplain: false,
      //常用意见
      offenDevices: [],
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
        organizationId: "root",
        type: ""
      },
      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQV2",
        flag: true,
        unitCodes: ""
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
      bank_doSWFinalSend: {
        function: "doSWFinalSend",
        isSpecial: 0
      },
      sendTableData: [],
      sendTableDatas: [
        {
          orgDprt: []
        }
      ],
      sendTableDatasCol: [],
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      handleSendType: 1,
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
        directRange: "",
        directType: "",
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
        opinionSign: "",
        opinionCheckList: [],
        opinionDrafList: [],
        opinionSendList: [],
        opinionSecretPersonList: [],
        opinionSignList: [],
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
        sendBasis: [],
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
        eleSendSecretType: "",
        secretBasls: [] //选中定密依据
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
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
      SsecretFlag: [],
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
      SSsecretLimitType: [
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
      ],
      SworkSecurity: [],
      SbusinessSecret: [],
      countriesSecret: [],
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
      rules: {
        meetingEndTime: [
          {
            required: this.selfRules,
            trigger: "blur",
            message: "请选择会议结束时间"
          }
        ],
        main: [
          {
            required: !this.selfRules,
            trigger: "blur",
            message: "请选择主送"
          }
        ],
        secretLimitType: [
          {
            required: true,
            trigger: "blur",
            message: "请选择"
          }
        ],
        secretFlagType: [
          {
            required: true,
            trigger: "blur",
            message: "请选择"
          }
        ],
        secretFlagContent: [
          {
            required: true,
            trigger: "blur",
            message: "请选择"
          }
        ],
        secretTimeType: [
          {
            required: true,
            trigger: "blur",
            message: "请选择"
          }
        ],
        isNeedCheckcp: [
          {
            required: this.selfRules1,
            trigger: "change",
            message: "请选择主送"
          }
        ]
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
      loadingTree: false, //是否懒加载
      loadTreeSelect: {
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      dialogVisible: false, // 定密依据
      appendWriteDialog: true,
      isDirectFlag: false,
      clickTypes: 1,
      // nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      nowUserId: "", //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      showSend: false, //发送弹窗
      listSendObjstate: false, //选择发送对象的弹窗
      sendObjData: [],
      checkedCities: [], //发送对象 选中的数据
      checkedOutCities: [], //发送对象 选中的数据copy
      nowCheckList: [], //当前的选中项数据copy
      coluCheck: "", //专栏选中的项目
      coluData: [], //专栏数据
      loadingCheck: false, //等待图标
      dialogTypeNow: "", //当前弹窗的标示
      checkedGonggaoIds: "", //公告的选中的id
      nowGongGaoCheckList: "", //公告至的数据

      // 生成文号/退号/生成上年文号
      docNoYear: "",
      docNoNowYear: "",
      docNoLastYear: "",
      docNoNum: "",
      DocNoDataList: [],
      SetDocNoVisible: false,
      setDocNum: "",
      doSaveDocumentNumFuc: {
        function: "doSaveDocumentNum",
        redHead: "",
        year: "",
        type: "CN000",
        sendType: "",
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
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      wh: "",
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
      // 文种显示
      showTextType: true,
      showmeetingEndTime: false,
      showUnionDepartment: true,
      selectUnionDepartment: false,

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
        },
        {
          label: "便函",
          value: "4"
        }
      ],
      documentCode: "〔〕",
      importDataArr: [],
      bank_import: {},

      readFlag: "",
      isCountry: "el-icon-star-off pad_10",

      docFstword: "",
      // docEndword: "",

      nowBack: "",
      oldDataFlag: true,
      selfRules: false,
      selfRules1: false,
      msgOSShow: false,
      msgData: "",
      changeDocNo: true,
      scwhState: ""
    };
  },

  mounted() {
    // let beginTime = 0; //开始时间
    // let differTime = 0; //时间差
    // window.onunload = () => {
    //   differTime = new Date().getTime() - beginTime;
    //   if (differTime <= 5) {
    //     //关闭页面
    //     this.handleSetLoacl();
    //   }
    // };
    // window.onbeforeunload = () => {
    //   beginTime = new Date().getTime();
    // };
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_fsdx = document.querySelector("#fsdx").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    // 0625新需求
    handleBusinessDialog() {
      this.showBusinessTypeDialog = true;
    },
    handleSaveBusinessType() {
      this.businessTypeList = this.businessTypeList.filter(item => {
        return item != "";
      });
      this.fromdata.businessType = this.businessTypeList.join(";");
      this.showBusinessTypeDialog = false;
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
    },
    //保存附件标题
    saveAttachTitle(val) {
      if (val) {
        this.preserve(null, true);
      }
    },
    // 按钮控制
    buttonClick(params) {
      switch (params) {
        case "btn_bc":
          this.preserve("save");
          break;
        case "btn_wcbfs":
          this.completeSendingIsTrue();
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
          this.handleSetDocNo(1);
          break;
        case "btn_tuihao":
          this.handleClearDocNo();
          break;
        case "btn_scsndwh":
          this.handleSetDocNo(2);
          break;
        case "btn_sccw":
          this.delectArticle();
          break;
        case "btn_sc":
          this.collect("sendSw", this.bank_dispach.id);
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
          meetingEndTime: [
            {
              required: this.selfRules,
              trigger: "change",
              message: "请选择会议结束时间"
            }
          ],
          main: [
            {
              required: !this.selfRules,
              trigger: "change",
              message: "请选择主送"
            }
          ],
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
            {
              required: this.requiredFields.textType,
              trigger: "change",
              message: "请选择文种"
            }
          ],
          draftDepartment: [
            {
              required: this.requiredFields.draftDepartment,
              trigger: "change",
              message: "请输入主办部门"
            }
          ],
          userRange: [
            {
              required: this.requiredFields.userRange,
              trigger: "change",
              message: "请选择档案利用范围"
            }
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
          phone: [
            {
              required: this.requiredFields.phone,
              trigger: ["blur", "change"],
              message: "请输入联系电话"
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
              required: this.fromdata.isDirect == "是",
              trigger: "change",
              message: "请选择直发范围"
            }
          ],
          directType: [
            {
              required: this.fromdata.isDirect == "是",
              trigger: "change",
              message: "请选择直发文种类"
            }
          ],
          title: [
            {
              required: this.requiredFields.title,
              trigger: "change",
              message: "请输入正文标题"
            }
          ],
          name: [
            {
              required: this.requiredFields.name,
              message: "请输入标题名称",
              trigger: "change"
            },
            { min: 3, max: 5, message: "3-5个字", trigger: "change" }
          ],
          secretType: [
            {
              required: this.requiredFields.secretType,
              trigger: ["blur", "change"],
              message: "请选择秘密类型"
            }
          ],
          secretTimeType: [
            {
              required: this.fromdata.secretType != "",
              trigger: ["blur", "change"],
              message: "请选择"
            }
          ],
          workSecretFlag: [
            {
              required: this.fromdata.secretType != "",
              trigger: ["blur", "change"],
              message: "请选择秘密标志"
            }
          ],
          secretLimitType: [
            {
              required: this.fromdata.secretType != "",
              trigger: ["change", "blur"],
              message: "请选择秘密期限类型"
            }
          ],
          secretFlagType: [
            {
              required: this.fromdata.secretType != "",
              trigger: ["blur", "change"],
              message: "请选择秘密标志"
            }
          ],
          secretFlagContent: [
            {
              required: this.fromdata.secretType != "",
              message: "不能为空",
              trigger: "change"
            }
          ],
          secretGists: [
            {
              required:
                this.fromdata.secretType != "" &&
                this.requiredFields.secretGists,
              message: "不能为空",
              trigger: "change"
            }
          ],
          opinionSend: [
            {
              required: this.requiredIdeaFields.opinionSend,
              message: "不能为空",
              trigger: "change"
            }
          ],
          opinionDraf: [
            {
              required: this.requiredIdeaFields.opinionDraf,
              message: "不能为空",
              trigger: "change"
            }
          ],
          opinionCheck: [
            {
              required: this.requiredIdeaFields.opinionCheck,
              message: "不能为空",
              trigger: "change"
            }
          ],
          opinionSign: [
            {
              required: this.requiredIdeaFields.opinionSign,
              message: "不能为空",
              trigger: "change"
            }
          ],
          opinionSecretPerson: [
            {
              required: this.requiredIdeaFields.opinionSecretPerson,
              message: "不能为空",
              trigger: "change"
            }
          ],
          comments: [
            {
              required: this.requiredIdeaFields.comments,
              message: "不能为空",
              trigger: "change"
            }
          ],
          isNeedCheckcp: [
            {
              required: this.selfRules1,
              trigger: "change",
              message: "请选择"
            }
          ]
        };
      });
      this.$forceUpdate();
    },

    cancelSendObj() {
      this.listSendObjstate = false;
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
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    inputChange1(val) {
      if (val=='isXB') {
        this.preserve(null, true).then(resP => {
          if (resP) {
            location.reload();
          }
        });
      } else {
        this.preserve(null, true);
        this.$forceUpdate();
      }
    },
    inputChange2(e) {
      this.fromdata.secretFlagContent = this.fromdata.secretFlagContent.replace(
        /[^\d\*\ ]/g,
        ""
      );
      if (this.fromdata.secretTimeType == "") {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请先选择时间单位",
          duration: 1500
        });
        this.fromdata.secretFlagContent = "";
        return;
      } else if (this.fromdata.secretTimeType == "年") {
        if (!/^\d+$/.test(this.fromdata.secretFlagContent)) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请输入正确年份!",
            duration: 1500
          });
          this.fromdata.secretFlagContent = "";
        } else if (
          this.fromdata.secretFlagContent < 1 ||
          this.fromdata.secretFlagContent > 99
        ) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "填写范围：1-99，请重新填写",
            duration: 1500
          });
          this.fromdata.secretFlagContent = "";
        }
      } else if (this.fromdata.secretTimeType == "月") {
        if (!/^\d+$/.test(this.fromdata.secretFlagContent)) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请输入正确月份!",
            duration: 1500
          });
          this.fromdata.secretFlagContent = "";
        } else if (
          this.fromdata.secretFlagContent < 1 ||
          this.fromdata.secretFlagContent > 11
        ) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "填写范围：1-11，请重新填写",
            duration: 1500
          });
          this.fromdata.secretFlagContent = "";
        }
      } else if (this.fromdata.secretTimeType == "日") {
        if (!/^\d+$/.test(this.fromdata.secretFlagContent)) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请输入正确日期!",
            duration: 1500
          });
          this.fromdata.secretFlagContent = "";
        } else if (
          this.fromdata.secretFlagContent < 1 ||
          this.fromdata.secretFlagContent > 29
        ) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "填写范围：1-29，请重新填写",
            duration: 1500
          });
          this.fromdata.secretFlagContent = "";
        }
      }
      this.$forceUpdate();
      return;
    },
    inputChangePhone(e) {
      // this.fromdata.phone = this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g,'')
      this.$forceUpdate();
    },
    inputChange3(e) {
      let that = this;
      that.fromdata.secretFlagContent = dateFormate.date(
        Date.parse(new Date(that.fromdata.secretFlagContent))
      );
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
    //定密依据接收子组件传值
    // savesecretBaslsvalue(data) {
    //   this.fromdata.secretGists = data;
    //   this.$forceUpdate();
    // },
    //定密依据弹窗数值
    secretGistsbox() {
      this.selectSecretType.secretType = this.fromdata.secretType;
      this.$post
        .postData(
          "selectSecretType",
          JSON.stringify(this.selectSecretType),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.success) {
            this.secretBaslsDialogVisible = true;
            this.secretBaslsList = res.data || [];
            this.secretBaslsList = this.secretBaslsList.map((item, n) => {
              var obj = {
                label: item.label.split("(xx)")
              };
              obj.label.map((node, m) => {
                obj.subkey = n + "" + m;
              });
              obj.subval = "";
              return obj;
            });
            this.$forceUpdate();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
            this.secretBaslsDialogVisible = false;
            return;
          }
        });
    },
    //定密依据输入框值获取  并且确定
    savesecretBasls() {
      var str = "";
      var pstr = true;

      //填值
      if (this.secretBaslsYJ !== "") {
        this.secretBaslsList.map((item, n) => {
          if (n == this.secretBaslsYJ) {
            console.log(item.label);
            item.label.map((node, m) => {
              if (m < item.label.length - 1) {
                str += node + $("#" + n + m).val();
                if (!$("#" + n + m).val()) {
                  pstr = false;
                  return;
                }
                console.log(str);
              } else {
                str += node;
              }
            });
          }
        });
      }

      if (!pstr && this.secretBaslsYJ !== "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择或输入该选项的定密依据内容",
          duration: 2000
        });
        return;
      }
      this.secretBaslsDialogVisible = false;
      this.fromdata.secretGists = str;
      this.preserve();
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "zhusong":
          // this.checkIds = this.fromdata.mainIds
          //   ? this.fromdata.mainIds.split(";")
          //   : [];
          // this.checkData = this.zhuCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "chao":
          // this.checkIds = this.fromdata.copyIds
          //   ? this.fromdata.copyIds.split(";")
          //   : [];
          // this.checkData = this.chaoCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "hui":
          this.checkIds = this.fromdata.signDepartmentId
            ? this.fromdata.signDepartmentId.split(";")
            : [];
          this.checkData = this.huiCheckData;
          break;
        case "ben":
          // this.checkIds = this.fromdata.inlineIds
          //   ? this.fromdata.inlineIds.split(";")
          //   : [];
          // this.checkData = this.benCheckData;
          this.checkIds = [];
          this.checkData = [];
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
    showCompDialog(
      data,
      status,
      type,
      params,
      dtype,
      radio,
      newPeopInfo,
      orderByType
    ) {
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
        let newPeopConcat = "";
        that.checkIds = [];
        let gongId = []; //公告至
        let gongName = []; //公告至名字
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let zhuBenNames = [];
        let newNameConcat = "";
        let orderNamesByeOrder = [];

        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          if (type == "zhusong" || type == "chao" || type == "ben") {
            // for(var cname in newPeopInfo){
            //   newPeopConcat += newPeopInfo[cname].join(cname.split("/")[2])+cname.split("/")[0]+((cname.split("/")[1]=="hld"||cname.split("/")[1]=="ggry")?"、":"，");
            // }
            // names = newPeopConcat;
            if (Object.keys(newPeopInfo).length > 1 && orderByType) {
              for (var cname in newPeopInfo) {
                for (var oInType in orderByType) {
                  if (cname == oInType) {
                    newPeopConcat =
                      newPeopInfo[cname].join(cname.split("/")[3]) +
                      cname.split("/")[2] +
                      (cname.split("/")[1] == "hld" ||
                      cname.split("/")[1] == "ggry"
                        ? "、"
                        : "，");
                    orderNamesByeOrder[orderByType[oInType]] = newPeopConcat;
                    delete orderByType[oInType];
                  }
                }
              }
              let newNamesOrders = orderNamesByeOrder.filter(a => {
                return a;
              });
              // newNamesOrders.map((newOrder,mIndex)=>{
              //   if(mIndex!=newNamesOrders.length-1){
              //     newNamesOrders[mIndex] = newOrder.substr(0,newOrder.length-1);
              //   }
              // })
              names = newNamesOrders.join("");
            } else {
              for (var cname in newPeopInfo) {
                newPeopConcat +=
                  newPeopInfo[cname].join(cname.split("/")[3]) +
                  cname.split("/")[2] +
                  ((newPeopConcat.slice(
                    newPeopConcat.length - 1,
                    newPeopConcat.length
                  ) == "d" ||
                    newPeopConcat.slice(
                      newPeopConcat.length - 1,
                      newPeopConcat.length
                    ) == "y") &&
                  (cname.split("/")[2] == "hld" ||
                    cname.split("/")[2] == "ggry")
                    ? "、"
                    : "，");
              }
              names = newPeopConcat;
            }
          } else {
            names = names.join(";");
          }
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
            if (this.fromdata.main) {
              let lastStr = this.fromdata.main.slice(
                this.fromdata.main.length - 1,
                this.fromdata.main.length
              );
              let joinStr = lastStr == "d" || lastStr == "y" ? "、" : "，";
              this.fromdata.main = this.fromdata.main + joinStr + names;
            } else {
              this.fromdata.main = names;
            }
            this.fromdata.main = this.fromdata.main.slice(
              0,
              this.fromdata.main.length - 1
            );
            // this.fromdata.main = this.fromdata.main.replace(',', '，');
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            this.preserve(null, null, null, null, true);
            break;
          case "chao":
            this.fromdata.copy = this.fromdata.copy
              ? this.fromdata.copy + "，" + names
              : names;
            this.fromdata.copy = this.fromdata.copy.slice(
              0,
              this.fromdata.copy.length - 1
            );
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
            break;
          case "hui":
            this.fromdata.signDepartmentName = names;
            this.fromdata.signDepartmentId = ids;
            this.huiCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = this.fromdata.inline
              ? this.fromdata.inline + "，" + names
              : names;
            this.fromdata.inline = this.fromdata.inline.slice(
              0,
              this.fromdata.inline.length - 1
            );
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
    // 返回上级处理人
    handleGoBackup() {
      // if(!this.fromdata.opinionSend||this.fromdata.opinionSend==="") {
      //   this.$message({
      //     type: "error",
      //     message: "签发意见不能为空!",
      //     showClose: true,
      //     offset: 400,
      //     duration: 3000
      //   })
      //   return;
      // }
      this.preserve(null, null, null, null, true).then(save => {
        if (save) {
          this.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.$businessCode.fawgl
            )
            .then(res => {
              let parms = Object.assign({}, this.fromdata, this.bank_send);
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
              parms.function = "doReturnLastOperator";
              this.$post
                .postData(
                  "doReturnLastOperator",
                  JSON.stringify(parms),
                  this.$businessCode.fawgl
                )
                .then(res => {
                  if (res && res.success) {
                    this.handleSetLoacl();
                    this.$message({
                      type: "success",
                      showClose: true,
                      offset: 400,
                      message: "返回成功",
                      duration: 500,
                      onClose: () => {
                        localStorage.setItem("tabRecord", "1");
                        window.location.href = "about:blank";
                        if (
                          !(localStorage.getItem("st").indexOf("smarto") > -1)
                        ) {
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
                });
            });
        }
      });
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.fromdata, this.bank_doSendShiwuFw);
      this.$post
        .postData(
          "doSendShiwuFw",
          JSON.stringify(params),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.handleSetLoacl();
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1000,
              onClose: () => {
                localStorage.setItem("tabRecord", "1");
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
                window.close();
              }
            });
          } else {
            // this.$message({
            //   type: "error",
            //   offset: 400,
            //   showClose: true,
            //   message: res.message,
            //   duration: 2000
            // });
            console.log(res)
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
    // 点击 完成并发送 弹窗弹出
    completeSendingIsTrue() {
      let isTrue = JSON.parse(localStorage.getItem("tcHumanRole")).filter(
        item => {
          return item.codeType == "human_speAuth";
        }
      );
      let transUnitInfo =
        (localStorage.getItem("unitInfo") &&
          JSON.parse(localStorage.getItem("unitInfo"))) ||
        [];
      if (isTrue.length > 0 && this.fromdata.isReturnBefore == 1) {
        this.$post
          .postData(
            "isReturnState",
            JSON.stringify({
              function: "isReturnState",
              processInstId: this.fromdata.processInstId
            }),
            this.$businessCode.fawgl
          )
          .then(res => {
            if (res && res.success && res.data.isReturnState == "1") {
              this.$confirm("是否返回给：上一处理人?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.handleGoBackup();
                })
                .catch(() => {
                  this.completeSending();
                });
            } else {
              this.completeSending();
            }
          });
      } else {
        this.completeSending();
      }
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      let that = this;
      if (!this.saveCheck()) {
        return;
      }
      // if (this.showBySecret && this.fromdata.secretGists === "") {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "定密依据不能为空!",
      //     duration: 3000
      //   });
      //   return;
      // }
      // if(this.fromdata.textType=="批复"&&!this.showImportData) {
      //   this.$message({
      //     type: "info",
      //     offset: 400,
      //     showClose: true,
      //     message: "请引入发文依据",
      //     duration: 1500
      //   });
      //   return;
      // }
      this.clickSaveAndSend = true;

      this.preserve().then(resP => {
        if (resP) {
          this.dialogTit = "完成并发送";
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
              this.loadTreeSelect.pcsAvyId =
                res.data && res.data.length && res.data[0].PCSAVYID;
              this.loadTreeSelect.curTplNo = this.bank_send.curTplNo;
              this.loadTreeSelect.curMultiTenancyId = this.bank_send.curMultiTenancyId;
              let parms = Object.assign(this.fromdata, this.bank_send);
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(parms),
                  this.$businessCode.ggfawgl
                )
                .then(res => {
                  if (res.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  that.treeData = (res.data && res.data.data) || [];
                  that.defaultUser = (res.data && res.data.defaultUser) || {};
                });
            });
        }
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
    //电话校验
    phoneChange() {
      this.fromdata.phone = this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g, "");
      this.$forceUpdate();
    },
    //保存时校验
    saveCheck() {
      // let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      let res = this.scrollIntoForm();
      this.phoneCheck = true;
      // if(!this.fromdata.phone){
      //   this.$refs.phoneError.scrollIntoView({
      //     block: "center",
      //     behavior: "smooth"
      //   });
      //   return;
      // }
      if (
        this.fromdata.secretType == "商业秘密" ||
        this.fromdata.secretType == "国家秘密"
      ) {
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
              return;
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
        !this.fromdata.secretFlag
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
        this.bank_mainXiao.unitCodes = "";
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
      this.showCompDialog();
      if (n === "hui" || n === "dw") {
        this.$post
          .postData(
            "selUnitTreeByHQV2",
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
            "sendnoticetree",
            JSON.stringify(this.bank_sendnoticetree),
            this.$businessCode.fawgl
          )
          .then(res => {
            this.treeData = (res && res.data) || [];
          });
      } else if (n === "ben") {
        this.$post
          .postData(
            "getTcSendObjDic",
            JSON.stringify({
              function: "getTcSendObjDic",
              type: this.fromdata.type
            }),
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
        this.bank_main.type = this.fromdata.type;
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
      let that = this;
      that.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(that.bank_dispachfile),
          that.$businessCode.fawgl
        )
        .then(res => {
          that.SsendType =
            (res.data && res.data.sendType && JSON.parse(res.data.sendType)) ||
            [];
          that.SemergencyLevel =
            (res.data &&
              res.data.emergencyLevel &&
              JSON.parse(res.data.emergencyLevel)) ||
            [];
          that.SbusinessType =
            (res.data &&
              res.data.businessType &&
              JSON.parse(res.data.businessType)) ||
            [];
          that.StextType =
            (res.data && res.data.textType && JSON.parse(res.data.textType)) ||
            [];
          that.SsecretType =
            (res.data &&
              res.data.swSendSecretType &&
              JSON.parse(res.data.swSendSecretType)) ||
            [];
          that.SsecretFlag =
            (res.data &&
              res.data.secretFlag &&
              JSON.parse(res.data.secretFlag)) ||
            [];
          // this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          // this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          that.SdirectRange = JSON.parse(res.data.directSendRange);
          that.archivesUserRange = JSON.parse(res.data.archivesUserRange);
          that.SdirectType = JSON.parse(res.data.directSendType);
          that.SkeepLimit = JSON.parse(res.data.swSendSecretLimit);
          that.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
          that.secretOptionsFlag =
            res.data &&
            res.data.tradeSecret &&
            JSON.parse(res.data.tradeSecret);
          that.countriesSecret =
            res.data &&
            res.data.countriesSecret &&
            JSON.parse(res.data.countriesSecret);
          console.log(
            that.countriesSecret instanceof Array,
            that.countriesSecret
          );
          that.SsecretLimit =
            res.data &&
            res.data.swSecretFlagContent &&
            JSON.parse(res.data.swSecretFlagContent);
          // this.rules = this.copyRules;
          that.$nextTick(() => {
            that.$refs.fromdata.clearValidate();
            if (that.fromdata.secretType == "商业秘密") {
              that.SbusinessSecret = [].concat(that.secretOptionsFlag);
              that.isCountry = "el-icon-star-off pad_10";
              that.$forceUpdate();
            } else if (that.fromdata.secretType == "国家秘密") {
              that.isCountry = "el-icon-star-on pad_10";
              that.SbusinessSecret = [].concat(that.countriesSecret);
              that.$forceUpdate();
            }
          });
        });
    },
    // 控制
    handleContral(value) {
      let that = this;
      if (value) {
        that.$post
          .postData(
            "getNextUserTaskNode",
            JSON.stringify({
              function: "getNextUserTaskNode",
              processInstId: value
            }),
            that.$businessCode.ggfawgl
          )
          .then(res => {
            that.huanJieMessage = res.data.extAttributes;
            // 获取当前环节
            that.needHGWC1 =
              (res.data &&
                res.data.extAttributes &&
                res.data.extAttributes.acyNodeNextBount) ||
              {};

            that.setConfig();
            that.setFormConfig();
            setTimeout(() => {
              that.$refs.fromdata.clearValidate();
            });
          })
          .catch(err => {});
      } else {
        that.$post
          .postData(
            "getpcsTplStartNode",
            JSON.stringify({
              function: "getpcsTplStartNode",
              multiTenancyId: that.fromdata.multiTenancyId
            }),
            that.$businessCode.ggfawgl
          )
          .then(res => {
            that.huanJieMessage = res.data;
            // 获取当前环节
            that.needHGWC1 =
              (res.data &&
                res.data.extAttributes &&
                res.data.extAttributes.acyNodeNextBount) ||
              {};

            that.setConfig();
            that.setFormConfig();
            setTimeout(() => {
              that.$refs.fromdata.clearValidate();
            });
          })
          .catch(err => {});
      }
    },
    //初始值 //input框内容
    toEdit(needOnce) {
      let that = this;
      this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : getFormId(this.$route.query.id, "bankEntityDispachId");
      this.bank_dispach.choseYear = this.$route.query.choseYear || "";
      this.$post
        .postData(
          "toEditShiwuFw",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl
        )
        .then(res => {
          that.$route.query.readonlyFwcy ?? this.getIsNowUser(res, "fcy", "db");
          if (res.data.isSpecialHead && res.data.isSpecialHead == "1") {
            that.draftOrganTitle =
              res.data && res.data.draftDepartment + "实物发文处理单";
          } else {
            that.draftOrganTitle =
              res.data && res.data.draftOrgan + "实物发文处理单";
          }
          that.fromdata = Object.assign(that.fromdata, res.data);
          that.businessTypeList = that.fromdata.businessType.split(";") || [];
          if (needOnce == 1) {
            if (!that.fromdata.documentNo) {
              that.docNoYear = that.docNoNowYear = that.fromdata.currentTime.slice(
                0,
                4
              );
              that.docNoLastYear = (that.docNoNowYear - 1).toString();
            } else {
              that.docNoNowYear = that.fromdata.documentNo.slice(
                that.fromdata.documentNo.indexOf("〔") + 1,
                that.fromdata.documentNo.indexOf("〕")
              );
              that.docNoLastYear = that.docNoNowYear - 1;
              that.docNoYear = that.docNoNowYear;
            }
          }

          if (that.fromdata.meetingEndTime != "") {
            that.fromdata.meetingEndTime = dateFormate.dataFormat(
              Date.parse(new Date(that.fromdata.meetingEndTime))
            );
          }

          that.nowUserId = res.data.currentUserId || "";

          // 是否已经生成文号
          if (that.fromdata.isHasDocumentNo == "true") {
            that.scwh = false;
            // that.shiwufs = true;
            that.fasong = true;
            //  this.wancheng = false;
            //  this.tuihui = false;
          } else {
            that.fasong = false;
            // this.tuihui = true;
            that.scwh = true;
            // that.shiwufs = false;
          }
          that.th = !that.scwh;

          that.bwsmFromdata.explain = res.data.explain;
          //获取本地存储联系电话
          if (!(res.data && res.data.phone)) {
            let tcHumanRole = JSON.parse(localStorage.getItem("userInfo"));
            that.fromdata.phone = tcHumanRole.telMobile || "";
          }

          // 更新为已读
          if (that.readFlag != 1) {
            that.getReadFlag();
          }

          //发文类型
          if (res.data.type) {
            this.selectType(res.data.type, true);
          } else {
            that.fromdata.documentNo = res.data.documentNo || "";
          }

          // 签报依据
          if (
            res.data.sendBasis &&
            JSON.parse(res.data.sendBasis).length != 0
          ) {
            that.showImportData = true;
          }
          that.fromdata.sendBasis = that.importDataArr =
            (res.data &&
              res.data.sendBasis &&
              JSON.parse(res.data.sendBasis)) ||
            [];

          that.fromdata.isArtificial = "否";
          that.fromdata.isSeparate = "否";
          // if (that.fromdata.isDirect === "" || !that.fromdata.isDirect) {
          //   that.fromdata.isDirect = "否";
          // }
          // if (
          //   that.fromdata.isStandardFile === "" ||
          //   !that.fromdata.isStandardFile
          // ) {
          //   that.fromdata.isStandardFile = "否";
          // }

          if (res.data.secretType) {
            that.secretTypechange(res.data.secretType, true, "1");
          }
          if (res.data.secretLimitType) {
            that.workSecurityTab(res.data.secretLimitType, true, "1");
          }

          if (that.fromdata.secretType && that.fromdata.secretType !== "") {
            that.showBySecret = true;
          } else {
            that.showBySecret = false;
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
          if (res.data.unionDepartmentIds) {
            that.unCheckData = that.concatTreeData(
              res.data.unionDepartmentIds,
              res.data.unionDepartment
            );
          }

          if (this.fromdata.isDirect == "否") {
            this.isDirectFlag = false;
            // this.fromdata.title = this.fromdata.title.indexOf('（')>0?this.fromdata.title.substring(0, this.fromdata.title.indexOf('（')):this.fromdata.title;
          } else if (this.fromdata.isDirect == "是") {
            this.isDirectFlag = true;
          }

          // 控制
          // if (res.data.processInstId) {
          //   this.$post
          //     .postData(
          //       "getNextUserTaskNode",
          //       JSON.stringify({
          //         function: "getNextUserTaskNode",
          //         processInstId: res.data.processInstId
          //       }),
          //       this.$businessCode.ggfawgl
          //     )
          //     .then(res => {
          //       this.huanJieMessage = res.data.extAttributes;
          //       this.setConfig();
          //       this.setFormConfig();
          //       setTimeout(() => {
          //         this.$refs.fromdata.clearValidate();
          //       });
          //     })
          //     .catch(err => {
          //       console.log(err);
          //     });
          // } else {
          //   this.$post
          //     .postData(
          //       "getpcsTplStartNode",
          //       JSON.stringify({
          //         function: "getpcsTplStartNode",
          //         multiTenancyId: res.data.multiTenancyId
          //       }),
          //       this.$businessCode.ggfawgl
          //     )
          //     .then(res => {
          //       console.log(res.data);
          //       this.huanJieMessage = res.data;
          //       this.setConfig();
          //       this.setFormConfig();
          //       setTimeout(() => {
          //         this.$refs.fromdata.clearValidate();
          //       });
          //     })
          //     .catch(err => {
          //       console.log(err);
          //     });
          // }
          that.handleContral(res.data.processInstId);

          if (
            that.fromdata.type == "行发文" ||
            that.fromdata.type == "部门发文" ||
            that.fromdata.type == "党务发文"
          ) {
            that.showTextType = true;
            that.showMeetingEndTime = false;
            that.showUnionDepartment = false;
          } else if (that.fromdata.type == "会议纪要") {
            that.showMeetingEndTime = true;
            that.showTextType = false;
            that.showUnionDepartment = true;
            that.selfRules = true;
            that.rules.meetingEndTime[0].required = that.selfRules;
            that.rules.main[0].required = !that.selfRules;
          } else {
            that.showTextType = false;
            that.showMeetingEndTime = false;
            that.showUnionDepartment = true;
            this.fromdata.textType = "";
          }

          // if (
          //   that.fromdata.isStandardFile == "是" &&
          //   that.fromdata.ifProtect == 1
          // ) {
          //   that.selfRules1 = true;
          //   that.rules.isNeedCheckcp[0].required = that.selfRules1;
          // }
          that.rules.isNeedCheckcp[0].required = (that.selfRules1 = (that.fromdata.isStandardFile == "是"&&that.fromdata.ifProtect == 1));

          that.uploadConfig.filesHas = that.fromdata.attchmentFileInfo;
          that.fromdata.attachSort = [];

          //临时意见处理
          that.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          that.cuteData("opinionDraf", "opinionDrafList", "opinionDrafId");
          that.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          that.cuteData(
            "opinionSecretPerson",
            "opinionSecretPersonList",
            "opinionSecretPersonId"
          );
          that.cuteData("opinionCheck", "opinionCheckList", "opinionCheckId");
          that.cuteData("comments", "commentsList", "commentsId");
          that.bank_selectConfig.curNodeId = res.data.currentNodeId;
          that.bank_selectConfig.curTplNo = that.bank_send.curTplNo =
            res.data.pTplNo;
          that.bank_selectConfig.curMultiTenancyId = that.bank_send.curMultiTenancyId =
            res.data.multiTenancyId;
        })
        .catch(error => {
          that.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "初始化请求失败",
            duration: 1000
          });
          console.log(error);
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
          if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
            window.opener.location.reload();
          }
        });
    },
    // 发文类型下拉框
    selectType(value, node) {
      let that = this;
      if (!value) {
        that.fromdata.redHead = that.fromdata.documentNo = "";
        that.fromdata.unionDepartment = "";
        that.SredHead = [];
      } else {
        that.bank_redheader.sendType = value;
        that.getTcDocTypeDicByParam(node, "back");
      }
      if (!node) {
        that.fromdata.meetingEndTime = "";
      }
      if (value == "行发文") {
        that.selectUnionDepartment = true;
      } else {
        that.selectUnionDepartment = false;
      }
      if (value == "部门发文" || value == "行发文" || value == "党务发文") {
        that.showUnionDepartment = false;
      } else {
        that.showUnionDepartment = true;
      }
      that.selfRules = false;
      that.rules.meetingEndTime[0].required = that.selfRules;
      that.rules.main[0].required = !that.selfRules;
      if (value == "行发文" || value == "部门发文" || value == "党务发文") {
        that.docFstword = "";
        that.showTextType = true;
        that.showmeetingEndTime = false;
      } else if (value === "会议纪要") {
        // that.docFstword = "第"
        that.showmeetingEndTime = true;
        that.selfRules = true;
        that.rules.meetingEndTime[0].required = that.selfRules;
        that.rules.main[0].required = !that.selfRules;
        that.showTextType = false;
      } else {
        // that.docFstword = "第"
        that.showTextType = false;
        that.showmeetingEndTime = false;
      }
    },
    //下拉框 红头/代字内容
    getTcDocTypeDicByParam(type, state) {
      let that = this;
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.isExplain = res.data.isExplain;
          this.isCheckFile = res.data.isCheckFile;
          if (res.data && res.data != "") {
            that.SredHead = res.data;
          } else {
            that.SredHead = res.data = [{ redHead: "请选择" }];
          }
          if (type == 1 && state) {
            if (this.fromdata.redHead) {
              this.selectredhead(this.fromdata.redHead);
            } else {
              this.fromdata.redHead = that.fromdata.documentNo = "";
            }
          } else {
            //代字红头 初始值
            if (type != 1) {
              let transReaHead = [];
              res.data.forEach(element => {
                if (element.ownDepartment == this.fromdata.draftDepartment) {
                  transReaHead.push(element);
                }
              });
              if (transReaHead.length <= 0) {
                this.fromdata.redHead = res.data[0].redHead;
                that.selectredhead(that.fromdata.redHead);
              } else if (0 < transReaHead.length < 2) {
                this.fromdata.redHead = transReaHead[0].redHead;
                that.selectredhead(that.fromdata.redHead);
              } else {
                transReaHead.sort((a, b) => {
                  return Date.parse(a.time) - Date.parse(b.time);
                });
                console.log("2" + transReaHead);
                this.fromdata.redHead = transReaHead[0].redHead;
                that.selectredhead(that.fromdata.redHead);
              }
            }
          }

          this.$forceUpdate();
        });
    },

    // 代字/红头  下拉 发文字号获取值
    selectredhead(val) {
      if (val == "1") {
        let nowYear = new Date();
        this.docNoYear = this.docNoNowYear = nowYear.getFullYear();
        this.docNoLastYear = this.docNoNowYear - 1;
        this.changeDocNo = false;
      }
      this.nowBack = "";
      if (val != "请选择") {
        this.SredHead.map(item => {
          if (item.redHead == val) {
            this.fromdata.codeMethod = item.codeMethod;
            return;
          }
        });
        if (this.fromdata.codeMethod == "0") {
          this.nowBack = "号";
          this.docFstword = "";
        } else if (this.fromdata.codeMethod == "1") {
          this.nowBack = "期";
          this.docFstword = "第";
        }
        this.fromdata.documentNo =
          this.fromdata.isHasDocumentNo == "true"
            ? this.fromdata.documentNo
            : this.fromdata.redHead +
              "〔" +
              this.docNoYear +
              "〕" +
              this.docFstword +
              this.wh +
              this.nowBack;
      } else {
        this.fromdata.documentNo =
          this.fromdata.isHasDocumentNo == "true"
            ? this.fromdata.documentNo
            : "〔" +
              this.docNoYear +
              "〕" +
              this.docFstword +
              this.wh +
              this.nowBack;
      }
      this.$forceUpdate();
    },
    // 生成文号/退号/生成上年文号
    SetDocNoHandle() {
      let that = this;
      const [stra, strb] = this.setDocNum.split("-");
      if (!stra) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择文号",
          duration: 1500
        });
        return;
      } else {
        this.wh = this.doSaveDocumentNumFuc.num = stra;
      }
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
          if (res.success) {
            // if(that.scwhState == 1&&that.changeDocNo) {
            //   that.docNoYear = that.docNoNowYear;
            // } else if(that.scwhState == 2) {
            //   that.docNoYear = that.docNoYear-1;
            // }
            this.fromdata.documentNo =
              this.fromdata.redHead +
              "〔" +
              this.docNoYear +
              "〕" +
              this.docFstword +
              this.wh +
              this.nowBack;
            let transDirectRange = this.fromdata.directRange;
            let transTitle= this.fromdata.title;
            let isReuse = transTitle.includes(transDirectRange)
            console.log(transDirectRange+","+transTitle+","+isReuse);
            if (this.fromdata.directRange && this.fromdata.directRange !== "" && !isReuse) {
              this.fromdata.title =
                this.fromdata.title + "（" + this.fromdata.directRange + "）";
            } else {
              this.fromdata.title = this.fromdata.title;
            }
            this.fromdata.isHasDocumentNo = "true";
            this.preserve(null, null, null, true, null).then(saveD => {
              if (saveD) {
                this.directchange();
              }
            });
            this.SetDocNoVisible = false;
            this.scwh = false;
            this.th = true;
            this.$forceUpdate();
          } else {
            this.wh = this.doSaveDocumentNumFuc.num = "";
            this.preserve(null, null, null, null, true).then(saveD => {
              if (saveD) {
                this.msgOSShow = true;
                this.msgData = res.message;
                this.SetDocNoVisible = false;
                return;
              }
            });
          }
        });
    },
    handleSetDocNo(type) {
      let that = this;
      this.scwhState = type;
      if (type == "1") {
        that.docNoYear = that.docNoNowYear;
      } else if (type == "2") {
        that.docNoYear = that.docNoLastYear;
      }
      that.getNumListForm.redHead = that.fromdata.redHead;
      that.getNumListForm.year = that.docNoYear;
      let doCreateNumForm = {
        function: "getNumList",
        redHead: that.fromdata.redHead,
        redHeadName: that.fromdata.redHead,
        type: "CN000",
        year: that.docNoYear,
        sendType: that.fromdata.type
      };
      that.$post
        .postData(
          "getNumList",
          JSON.stringify(doCreateNumForm),
          that.$businessCode.fawgl
        )
        .then(res => {
          // this.docNoNum = res.data
          // this.selectredhead()

          // 未来会删掉
          if (res && res.success) {
            that.DocNoDataList = res.data;
            this.setDocNum = Object.values(res.data)[0].split(";")[0] + "-0"; // 未来会放开注释
            let matchDoc = false;
            for (let val in this.DocNoDataList) {
              if (val == "空缺文号") {
                this.SetDocNoVisible = true;
                this.$forceUpdate();
                matchDoc = true;
                break;
              }
            }

            // this.$forceUpdate(); // 未来会放开注释

            // 未来会删掉
            // that.setDocNum = Object.values(res.data)[0]
            // that.doSaveDocumentNumFuc.redHead = that.getNumListForm.redHead;
            // that.doSaveDocumentNumFuc.year = that.getNumListForm.year;
            // that.doSaveDocumentNumFuc.multiTenancyId = that.fromdata.multiTenancyId;
            // that.wh = that.doSaveDocumentNumFuc.num = that.setDocNum;
            // if (that.fromdata.codeMethod == "0") {
            //   that.nowBack = "号";
            //   that.docFstword = "";
            // } else if (that.fromdata.codeMethod == "1") {
            //   that.nowBack = "期";
            //   that.docFstword = "第";
            // }
            // that.fromdata.documentNo =
            // that.fromdata.redHead +
            //   "〔" +
            //   that.getNumListForm.year +
            //   "〕" +
            // that.docFstword +
            //   that.doSaveDocumentNumFuc.num +
            //   that.nowBack;
            // if (that.fromdata.isDirect=='是' && that.fromdata.directRange && that.fromdata.directRange !== "") {
            //   that.fromdata.title =
            //     that.fromdata.title + "〔" + that.fromdata.directRange + "〕";
            // }
            // that.SetDocNoVisible = false;
            that.scwh = false;
            that.taohong = true;
            that.th = !that.scwh;
            // that.fromdata.isHasDocumentNo = "true";
            if (!matchDoc) {
              this.SetDocNoHandle();
              this.SetDocNoVisible = false;
            }
            // that.$forceUpdate();
            // that.$nextTick(()=>{
            //   that.preserve(null,null,null,true,null)
            // })
          } else {
            that.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message:
                res.message == "" ? "取号失败，请联系管理员。" : res.message,
              duration: 500
            });
          }
        })
        .catch(error => {
          // that.$message({
          //   type: "error",
          //   showClose: true,
          //   offset: 400,
          //   message: error.message=="" ? "取号失败，请联系管理员。" : error.message,
          //   duration: 500
          // });
          console.log(error);
        });
    },
    handleClearDocNo() {
      this.handeldoBackNoFuc = true;
    },
    doBackNoHandle() {
      let that = this;
      that.doBackNoFuc.redHead = that.fromdata.redHead;
      that.doBackNoFuc.year = that.fromdata.documentNo.split("〔")[1];
      that.doBackNoFuc.year = that.doBackNoFuc.year.split("〕")[0];
      that.doBackNoFuc.num = that.fromdata.documentNo.split("〕")[1];
      that.doBackNoFuc.num = that.doBackNoFuc.num.slice(0, -1);
      if (that.doBackNoFuc.num.indexOf("第") > -1) {
        that.doBackNoFuc.num = that.doBackNoFuc.num.slice(1);
      }
      that.doBackNoFuc.type = "CN000";
      that.doBackNoFuc.sendType = that.fromdata.type;
      that.$post
        .postData(
          "doBackNo",
          JSON.stringify(that.doBackNoFuc),
          that.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            that.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "退号成功",
              duration: 500
            });
            if (that.fromdata.codeMethod == "0") {
              that.nowBack = "号";
              this.docFstword = "";
            } else if (that.fromdata.codeMethod == "1") {
              that.nowBack = "期";
              this.docFstword = "第";
            }
            that.fromdata.documentNo =
              that.fromdata.redHead +
              "〔" +
              that.docNoYear +
              "〕" +
              this.docFstword +
              that.nowBack;
            // that.fromdata.title = that.fromdata.title&&that.fromdata.title.split("〔")[0];
            that.scwh = true;
            that.th = !that.scwh;
            // that.shiwufs = false;
            that.fasong = false;
            that.wh = "";
            that.fromdata.isHasDocumentNo = "false";
            that.preserve(null, null, "doBackNoSave");
            location.reload();
          } else {
            that.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "退号失败，请联系管理员。",
              duration: 1000
            });
          }
        })
        .catch(err => {
          that.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "退号失败，请联系管理员。",
            duration: 1000
          });
        });
      that.handeldoBackNoFuc = false;
    },

    // 保存
    async preserve(type, loadingFlag, doBack, needOnce, goBack) {
      let that = this;
      // that.fromdata.businessType = that.fromdata.businessType.join(",");
      var successState = false;

      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "bankEntityDispachId"
      );

      var obj = Object.assign(this.fromdata, this.bank_addShiwuFw);
      if (doBack) {
        obj.doBackNoSave = "true";
      }
      await this.$post
        .postData("addShiwuFw", JSON.stringify(obj), this.$businessCode.fawglfj)
        .then(res => {
          if (res && res.success) {
            this.bank_addShiwuFw.id = this.bank_dispach.id = this.bank_doSendShiwuFw.id = getFormId(
              this.$route.query.id,
              "bankEntityDispachId",
              res.data.id
            );
            this.bank_selectConfig.curNodeId = res.data.currentNodeId;
            this.bank_selectConfig.curTplNo = this.bank_send.curTplNo =
              res.data.pTplNo;
            this.bank_selectConfig.curMultiTenancyId = this.bank_send.curMultiTenancyId =
              res.data.multiTenancyId;
            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            this.showExplain = false;
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
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
          if (!goBack) {
            this.toEdit(needOnce);
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
    async btnCloseHandler(val) {
      if (val == 1) {
        this.handleSetLoacl();
        window.close();
      } else if (val == 2) {
        this.handleSetLoacl();
        await this.preserve(1);
        localStorage.setItem("tabRecord", "1");
        window.location.href = "about:blank";
        if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
          window.opener.location.reload();
        }
        window.close();
      } else {
        this.closeHandler = false;
      }
    },
    handleClose(val) {
      this.handleSetLoacl();
      if (val == "1") {
        this.preserve().then(save => {
          if (save) {
            localStorage.setItem("tabRecord", "1");
            window.location.href = "about:blank";
            window.close();
          }
        });
      } else if (val == "2") {
        localStorage.setItem("tabRecord", "1");
        window.location.href = "about:blank";
        window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
    },
    // 办结
    handleDoFinish() {
      this.$confirm("确定要办结吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let doFinish_form = Object.assign(this.fromdata, {
            function: "doFinish",
            tplNo: this.fromdata.pTplNo
          });
          this.$post
            .postData(
              "doFinish",
              JSON.stringify(doFinish_form),
              this.$businessCode.ggfawgl
            )
            .then(res => {
              this.handleSetLoacl();
              this.$message({
                type: "success",
                offset: 400,
                showClose: true,
                message: "办结成功",
                duration: 1000,
                onClose: () => {
                  localStorage.setItem("tabRecord", "1");
                  window.location.href = "about:blank";
                  if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                    window.opener.location.reload();
                  }
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
        })
        .catch(() => {
          return;
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
                zhengWenState: 2,
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
    async findTemplete(file) {
      let fileInfoTh = {
        state: false,
        templateUrl: "", //套红路径
        fileName: file.fileName,
        filePath: file.filePath
      };
      this.bank_findTemplete.sendType = this.fromdata.type;
      this.bank_findTemplete.redHead = this.fromdata.redHead;
      this.bank_findTemplete.id = getFormId(
        this.$route.query.id,
        "bankEntityDispachId"
      );
      await this.$post
        .postData(
          "findTemplete",
          JSON.stringify(this.bank_findTemplete),
          this.$businessCode.fawgl
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
      if (!getFormId(this.$route.query.id, "bankEntityDispachId")) {
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
          this.getFileInfo(that).then(res => {
            if (res.state) {
              if (state != "taoHong") {
                this.doDraft(res);
              } else {
                this.findTemplete(res);
              }
            }
          });
        }
      }
    },
    //正文跳转
    doDraft(fileInfo, saveName) {
      // let str = "";
      // if(!saveName){
      //   if(this.fromdata.documentNo){
      //     str = this.fromdata.documentNo + this.fromdata.title
      //   }else{
      //     str = this.fromdata.title
      //   }
      // }else{
      //   str = saveName;
      // }
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
          id: getFormId(this.$route.query.id, "bankEntityDispachId"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          tmpFileName: fileInfo ? fileInfo.fileNameTh : "",
          tmpFilePath: fileInfo ? fileInfo.filePathTh : "",
          isHasRedHead: fileInfo && fileInfo.fileNameTh ? true : false,
          pageFlag: "fawen",
          flowTranId: this.$businessCode.fawgl //流程交易线    chai
          // saveSpecialFileName:str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },

    // 删除此文
    delectArticle() {
      this.bank_dispach.id = getFormId(
        this.$route.query.id,
        "bankEntityDispachId"
      );
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
            localStorage.setItem("tabRecord", "1");
            window.location.href = "about:blank";
            if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
              window.opener.location.reload();
            }
            window.close();
          } else {
            this.$post
              .postData(
                "doDeleteShiwuFw",
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
                localStorage.setItem("tabRecord", "1");
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
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
      this.preserve().then(save => {
        if (save) {
          const routeData = this.$router.resolve({
            path: "/swfwcld",
            query: {
              id: this.bank_dispach.id,
              choseYear: this.$route.query.choseYear || ""
            }
          });
          window.open(routeData.href, "_blank");
        }
      });
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
    handleSaveBWSM() {
      this.fromdata.explain = this.bwsmFromdata.explain;
      this.preserve();
    },
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
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 审核意见
          this.fromdata.opinionCheck = this.fromdata.opinionCheck
            ? this.fromdata.opinionCheck + data
            : data;
          if (
            this.fromdata.opinionCheck &&
            this.fromdata.opinionCheck.length >= 500
          ) {
            this.fromdata.opinionCheck = this.fromdata.opinionCheck.substr(
              0,
              500
            );
          }
        } else if (this.clickTypes == 2) {
          // 核稿意见
          this.fromdata.opinionDraf = this.fromdata.opinionDraf
            ? this.fromdata.opinionDraf + data
            : data;
          if (
            this.fromdata.opinionDraf &&
            this.fromdata.opinionDraf.length >= 500
          ) {
            this.fromdata.opinionDraf = this.fromdata.opinionDraf.substr(
              0,
              500
            );
          }
        } else if (this.clickTypes == 3) {
          // 会签意见
          this.fromdata.opinionSign = this.fromdata.opinionSign
            ? this.fromdata.opinionSign + data
            : data;
          if (
            this.fromdata.opinionSign &&
            this.fromdata.opinionSign.length >= 500
          ) {
            this.fromdata.opinionSign = this.fromdata.opinionSign.substr(
              0,
              500
            );
          }
        } else if (this.clickTypes == 4) {
          // 签发意见
          this.fromdata.opinionSend = this.fromdata.opinionSend
            ? this.fromdata.opinionSend + data
            : data;
          if (
            this.fromdata.opinionSend &&
            this.fromdata.opinionSend.length >= 500
          ) {
            this.fromdata.opinionSend = this.fromdata.opinionSend.substr(
              0,
              500
            );
          }
        } else if (this.clickTypes == 5) {
          // 定密责任人意见
          this.fromdata.opinionSecretPerson = this.fromdata.opinionSecretPerson
            ? this.fromdata.opinionSecretPerson + data
            : data;
          if (
            this.fromdata.opinionSecretPerson &&
            this.fromdata.opinionSecretPerson.length >= 500
          ) {
            this.fromdata.opinionSecretPerson = this.fromdata.opinionSecretPerson.substr(
              0,
              500
            );
          }
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
            this.toEdit();
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
    handleRexamine() {
      this.$post
        .postData(
          "creatAgainOrder",
          JSON.stringify(this.bank_rexamine),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res.data.id);
          const routeData = this.$router.resolve({
            path: "/rexamineEntityDispach",
            query: {
              id: res.data.id,
              choseYear: this.$route.query.choseYear || ""
            }
          });
          window.open(routeData.href, "_self");
        });
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
      if (state != "1") {
        this.fromdata.secretTimeType = this.SsecretTimeType[0].label;
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
        if (state != "1") {
          this.fromdata.secretTimeType = this.SsecretLimit[0].label;
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
        if (this.fromdata.secretType == "商业秘密") {
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
      if (oneTip != "1") {
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
      value = value && value.trim();
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
        } else if (value == "工作秘密") {
          this.flag = false;
          this.secretTypeFlag = true;
          this.workSecurityFlag = true;
        }
      } else {
        that.flag = false;
        that.secretTypeFlag = false;
        that.workSecurityFlag = false;
      }

      that.$nextTick(() => {
        that.$refs.fromdata.clearValidate();
        if (value) {
          that.rules.secretLimitType[0].required = true; //商业秘密
          that.rules.secretFlagType[0].required = true;
          that.rules.secretFlagContent[0].required = true;
          that.rules.secretTimeType[0].required = true;
        } else {
          that.rules.secretLimitType[0].required = false;
          that.rules.secretFlagType[0].required = false;
          that.rules.secretFlagContent[0].required = false;
          that.rules.secretTimeType[0].required = false;
        }
      });
    },
    directchange(val) {
      if (val != 2) {
        var directStr = "（" + this.fromdata.directRange + "）";
        if (this.fromdata.isDirect == "否") {
          this.isDirectFlag = false;
          this.fromdata.directRange = "";
          this.fromdata.directType = "";
          if (this.fromdata.isHasDocumentNo == "true") {
            this.fromdata.title = this.fromdata.title.replace(directStr, "");
          }
        } else if (this.fromdata.isDirect == "是") {
          this.isDirectFlag = true;
        }
      } else {
        if (
          this.fromdata.isStandardFile == "是" &&
          this.fromdata.ifProtect == 1
        ) {
          this.selfRules1 = true;
          this.rules.isNeedCheckcp[0].required = this.selfRules1;
        } else {
          this.fromdata.isNeedCheckcp = "";
        }
      }
      if (val) {
        this.preserve();
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
      var obj = Object.assign(this.fromdata, this.backFormData);
      this.$post
        .postData("doReturn", JSON.stringify(obj), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success) {
            this.showBack = false;
            this.handleSetLoacl();
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "退回成功",
              duration: 1000,
              onClose: () => {
                localStorage.setItem("tabRecord", "1");
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
    handleSend(val) {
      this.preserve().then(save => {
        if (save) {
          this.handleSendType = val;
          this.showSend = true;
        }
      });
    },
    handleColuChange(val) {
      this.coluCheck = val;
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
          this.sendTableDatas = [{ orgDprt: [] }];
          this.sendTableDatasCol = [];
          let dataList = res.data;
          for (let i = 0; i < dataList.length; i++) {
            let temp = dataList[i];
            this.sendTableDatasCol.push({
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
              }
            }
          }
        });
    },
    //选中对象数据
    selectSendObj() {
      // var obj = Object.assign(this.bank_doSWFinalSend, this.fromdata);
      // obj.function = "checkUser";
      // this.$post
      //   .postData("checkUser", JSON.stringify(obj), this.$businessCode.fawgl)
      //   .then(res => {
      //     if (res && res.success) {
      //     } else {
      //       this.$confirm(res.message, "提示", {
      //         confirmButtonText: "确定",
      //         cancelButtonText: "取消",
      //         type: "warning"
      //       })
      //         .then(() => {
      //           return;
      //         })
      //         .catch(() => {
      //           return;
      //         });
      //     }
      //   });
      this.listSendObjstate = false;
    },
    //确定发送
    handleSendConfirm() {
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
      // if(this.checkedCities.length<=0) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "请选择要发送的部门",
      //     duration: 2000
      //   });
      //   return;
      // }
      if (this.checkedCities.length <= 0) {
        this.$confirm("没有选择发送对象，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.showSend = false;
            this.$confirm("是否办结文件？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.handleDoFinish();
              })
              .catch(() => {
                return;
              });
          })
          .catch(() => {
            return;
          });
      } else {
        this.bank_doSWFinalSend.isSpecial = 0;
        let obj = Object.assign(this.fromdata, this.bank_doSWFinalSend);
        obj.function = "checkUser";
        // 添加校验所选部门是否有发文岗
        this.$post
          .postData("checkUser", JSON.stringify(obj), this.$businessCode.fawgl)
          .then(res => {
            if (res && res.success) {
              // obj.isSpecial = 0; //发送
              obj.function = "doSWFinalSend";
              obj.userMap = res.data;
              this.$post
                .postData(
                  "doSWFinalSend",
                  JSON.stringify(obj),
                  this.$businessCode.fawgl
                )
                .then(res => {
                  if (res && res.success && !res.message) {
                    this.showSend = false;
                    this.handleSetLoacl();
                    this.$message({
                      type: "success",
                      offset: 400,
                      showClose: true,
                      message: "发送成功",
                      duration: 1500,
                      onClose: () => {
                        localStorage.setItem("tabRecord", "1");
                        window.location.href = "about:blank";
                        if (
                          !(localStorage.getItem("st").indexOf("smarto") > -1)
                        ) {
                          if (
                            !(localStorage.getItem("st").indexOf("smarto") > -1)
                          ) {
                            window.opener.location.reload();
                          }
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
                      this.handleSetLoacl();
                      localStorage.setItem("tabRecord", "1");
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
                    let beginIndex = transMessage.indexOf("[");
                    transMessage = transMessage.substring(
                      beginIndex + 1,
                      transMessage.length
                    );
                    let lastIndex = transMessage.lastIndexOf("]");
                    transMessage = transMessage.substring(0, lastIndex);
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
      }
    }
  },
  watch: {
    checkedCities: {
      handler(neww) {
        let names = [];
        this.$nextTick(() => {
          neww.forEach(node => {
            this.nowCheckList.forEach(item => {
              if (item.deptIds == node) {
                names.push(item.deptNames);
              }
            });
          });
          this.fromdata.realMain = neww.length
            ? neww.join(",") + ";" + names.join(",")
            : "";
        });
      }
    },
    "fromdata.meetingEndTime": {
      handler(newv) {
        this.fromdata.meetingEndTime = newv
          ? newv
          : dateFormate.dataFormat(Date.parse(new Date()));
        this.$forceUpdate();
      },
      deep: true
    }
  },
  created() {
    this.formText = formTextChange("send");
    //初始化加载数据
    this.bank_dispach.id = this.bank_addShiwuFw.id = this.uploadConfig.id = getFormId(
      this.$route.query.id,
      "bankEntityDispachId"
    );
    let day = new Date();
    this.docNoYear = day.getFullYear();
    this.bank_doSendShiwuFw.id = this.bank_rexamine.sendOrderId = this.bank_dispach.id;
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl; //完成并发送 树   流程交易线   chai
    this.toEdit(1);
    this.getSendOrderDicByParam();
    this.getTcDocTypeDicByParam("1"); // 红头
    // this.rules = this.copyRules;
    this.$nextTick(() => {
      this.$refs.fromdata.clearValidate();
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
.dimi_btn2 {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
  border: none !important;
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
/deep/ .no-width-label .el-form-item__content {
  margin: 0 !important;
}
/deep/ .no-width-label::before {
  content: "";
  width: 0px !important;
  margin: 0;
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
.send_content {
  width: 100%;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  margin: 10px 0;
  .style_zl {
    display: inline-block;
    font-size: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    line-height: 30px;
    padding: 0 20px;
  }
}
.send_ps {
  line-height: 20px;
  b {
    color: red;
  }
}
/deep/ .dialogImport {
  .el-dialog {
    width: 30% !important;
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
  margin-right: 0;
}
.bank_dispach {
  .dialog_backed {
    /deep/ .el-radio__label {
      display: none;
    }
  }
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
.fix_height > .dimi_btn2 {
  text-align: right;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -55px;
  border: none !important;
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
// 定密依据样式
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
.size_yuanYin {
  /deep/ ::-webkit-input-placeholder {
    color: red !important;
  }
}
.secretStyle {
  display: inline-block;
}
/deep/ .dingMiStyle {
  /deep/ .el-radio {
    color: #606266;
    cursor: pointer;
    margin: 20px;
    display: block;
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
/deep/ .hqbm .el-textarea__inner {
  color: #f00 !important;
  min-height: 40px !important;
  background-color: #fff !important;
}
/deep/ .hqbm .el-input__inner {
  background-color: #fff !important;
}
</style>
