<template>
  <div id="bankDispach" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>

        <div id="bankDispach" class="grid_comtent">
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            @click="closeHandler = true"
          >关闭</el-button>
          <el-button
            size="small"
            plain
            class="bank_grid_comtent_active"
            v-if="showSpecial"
            @click="handelcheckSpecial"
          >特殊发送列表</el-button>
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

    <div style="height: 100%;width: 100%;">
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
                        @change="selectType"
                        :disabled="readFields.type||fromdata.isHasDocumentNo=='true'||fromdata.signState=='0'"
                        placeholder="请选择"
                        style="width:100%"
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
                        :disabled="readFields.redHead||!fromdata.type||fromdata.isHasDocumentNo=='true'||fromdata.signState=='0'"
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
                      <el-input
                        v-model="fromdata.documentNo"
                        :disabled="readFields.documentNo||fromdata.signState=='0'"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="紧急程度"
                      :span="8"
                      props="emergencyLevel"
                      ref="emergencyLevel"
                    >
                      <el-select
                        v-model="fromdata.emergencyLevel"
                        :disabled="readFields.emergencyLevel||fromdata.signState=='0'"
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
                          :disabled="readFields.businessType||fromdata.signState=='0'"
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
                  <el-col :span="8" v-show="showTextType">
                    <el-form-item label="文种" :span="8" prop="textType" ref="textType">
                      <el-select
                        v-model="fromdata.textType"
                        :disabled="readFields.textType||fromdata.signState=='0'"
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
                  <el-col :span="8" v-show="showMeetingEndTime">
                    <el-form-item
                      label="会议结束时间"
                      :span="8"
                      prop="meetingEndTime"
                      ref="meetingEndTime"
                    >
                      <el-date-picker
                        type="datetime"
                        placeholder="选择日期"
                        v-model="fromdata.meetingEndTime"
                        :picker-options="dateOptions"
                        format="yyyy-MM-dd HH:mm:ss"
                        :disabled="readFields.meetingEndTime||fromdata.signState=='0'"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!-- 秘密类型 -->
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                          <el-select
                            v-model="fromdata.secretType"
                            :disabled="readFields.secretType||fromdata.signState=='0'"
                            placeholder="请选择"
                            style="width:100%"
                            @change="secretTypechange"
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
                            v-model="fromdata.secretFlagType"
                            :disabled="readFields.secretFlagType||fromdata.signState=='0'"
                            placeholder="请选择"
                            style="width:100%"
                            @change="workSecurityTab"
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
                            v-model="fromdata.secretFlagType"
                            :disabled="readFields.secretFlagType||fromdata.signState=='0'"
                            placeholder="请选择"
                            style="width:100%"
                            @change="workSecurityTab"
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
                            v-model="fromdata.secretLimitType"
                            :disabled="readFields.secretLimitType||fromdata.signState=='0'"
                            placeholder="请选择"
                            style="width:100%"
                            @change="workSecurityTab"
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
                      <el-col :span="8" v-if="flag && secretFlagTypeFlag">
                        <el-row>
                          <el-col :span="16">
                            <el-form-item
                              label="密级和保密期限"
                              :span="8"
                              prop="secretFlagType"
                              ref="secretFlagType"
                            >
                              <el-select
                                v-model="fromdata.secretFlagType"
                                :disabled="readFields.secretFlagType||fromdata.signState=='0'"
                                placeholder="请选择"
                                style="width:90%"
                                @change="workSecurityTabTime"
                              >
                                <el-option value label="请选择"></el-option>
                                <el-option
                                  v-for="secretFlagTypeitem in SbusinessSecret"
                                  :key="secretFlagTypeitem.label"
                                  :label="secretFlagTypeitem.label"
                                  :value="secretFlagTypeitem.label"
                                ></el-option>
                              </el-select>
                              <i
                                style="width:10%;text-align:center;"
                                class="el-icon-star-off pad_10"
                              ></i>
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
                                v-model="fromdata.secretFlagContent"
                                :disabled="readFields.secretFlagContent||fromdata.signState=='0'"
                                @input="inputChange2"
                                style="width:100%;margin:0 !important;"
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
                                name="secretTimeType"
                                v-model="fromdata.secretTimeType"
                                :disabled="readFields.secretTimeType||fromdata.signState=='0'"
                                placeholder="请选择"
                                @change="workSecurityTabTime"
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
                            v-model="fromdata.secretFlagType"
                            :disabled="readFields.secretFlagType||fromdata.signState=='0'"
                            placeholder="请选择"
                            style="width:45%"
                            @change="workSecurityTabTime"
                          >
                            <el-option value label="请选择"></el-option>
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
                            v-model="fromdata.secretFlagContent"
                            :disabled="readFields.secretFlagContent||fromdata.signState=='0'"
                            @blur="workSecurityTabTime"
                            @change="inputChange3"
                            placeholder="选择日期"
                            style="width: 49%;"
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
                            :disabled="readFields.secretFlagType||fromdata.signState=='0'"
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
                          <i class="el-icon-star-off pad_10"></i>
                          <el-select
                            name="secretTimeType"
                            @change="workSecurityTabTime"
                            v-model="fromdata.secretTimeType"
                            :disabled="readFields.secretTimeType||fromdata.signState=='0'"
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
                        :disabled="readFields.knowScore||fromdata.signState=='0'"
                        name="knowScore"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="showBySecret">
                    <el-form-item label="定密依据" prop="secretGists" ref="secretGists">
                      <div style="display:flex">
                        <el-input
                          type="textarea"
                          resize="none"
                          maxlength="500"
                          autosize
                          v-model="fromdata.secretGists"
                          :disabled="readFields.secretGists||fromdata.signState=='0'"
                          style="flex:1"
                        ></el-input>
                        <!-- @input="inputChange1" -->
                        <button
                          @click="secretGistsbox"
                          v-if="fromdata.signState!='0'"
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
                      <el-input
                        :title="fromdata.draftDepartment"
                        v-model="fromdata.draftDepartment"
                        :disabled="readFields.draftDepartment||fromdata.signState=='0'"
                        name="draftDepartment"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="拟稿人" prop="draftUser" ref="draftUser">
                      <el-input
                        v-model="fromdata.draftUser"
                        :disabled="readFields.draftUser||fromdata.signState=='0'"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话" prop="phone" ref="phone">
                      <el-input
                        v-model="fromdata.phone"
                        :disabled="readFields.phone||fromdata.signState=='0'"
                        @input.native="phoneChange"
                      ></el-input>
                    </el-form-item>
                    <!-- <div
                        :class="['el-form-item is-required el-form-item--small',{'is-error':!fromdata.phone&& phoneCheck}]"
                      >
                        <label for="phone" class="el-form-item__label" style="width: 130px;">联系电话</label>
                        <div class="el-form-item__content" style="margin-left: 130px;">
                          <div data-v-5283a677 class="el-input el-input--small">
                            <input ref="phoneError" @blur="inputChangePhone" :disabled="fromdata.signState=='0'" type="text" autocomplete="off" v-model="fromdata.phone" :class="(fromdata.signState=='0')?'el-input__inner1':'el-input__inner'" />
                          </div>
                          <div v-if="!fromdata.phone && phoneCheck" :class="{'el-form-item__error':!fromdata.phone}">请输入联系电话</div>
                        </div>
                    </div>-->
                  </el-col>
                  <el-col v-if="!showUnionDepartment">
                    <el-form-item label="联合发文单位" prop="unionDepartment" ref="unionDepartment">
                      <div style="display:flex">
                        <el-input
                          v-model="fromdata.unionDepartment"
                          :disabled="readFields.unionDepartment||fromdata.signState=='0'"
                          style="flex:1"
                          @input="inputChange"
                        ></el-input>
                        <el-button
                          type="button"
                          class="el-button el-button--default dimi_btn"
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
                        <el-button
                          size="small"
                          v-if="fromdata.signState!='0'"
                          plain
                          @click="handleImport"
                        >引入</el-button>
                      </el-col>
                    </el-form-item>
                    <el-form-item label v-if="showImportData">
                      <div class="border_yiju">
                        <el-row v-for="(item) in fromdata.sendBasis" :key="item.id">
                          <el-col :span="20" class="btn_openImport">
                            <el-button
                              type="text"
                              @click="handleCheckImport(item)"
                              :class="(item.id=='')?'colorBlack':'colorLink'"
                            >{{item.documentCode}}</el-button>
                          </el-col>
                          <el-col :span="4" class="btn_delImport">
                            <el-button
                              type="text"
                              v-if="fromdata.signState!='0'"
                              @click="handleDeleteImport(item)"
                            >删除</el-button>
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
                            :disabled="readFields.isDirect||fromdata.signState=='0'"
                            @change="directchange(1)"
                            @input="inputChange"
                            label="是"
                          >是</el-radio>
                          <el-radio
                            v-model="fromdata.isDirect"
                            :disabled="readFields.isDirect||fromdata.signState=='0'"
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
                            :disabled="readFields.directRange||fromdata.signState=='0'"
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
                            :disabled="readFields.directType||fromdata.signState=='0'"
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
                        :disabled="readFields.isStandardFile||fromdata.signState=='0'"
                        @change="directchange(2)"
                        label="是"
                      >是</el-radio>
                      <el-radio
                        v-model="fromdata.isStandardFile"
                        :disabled="readFields.isStandardFile||fromdata.signState=='0'"
                        @change="directchange(2)"
                        label="否"
                      >否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="档案利用范围" prop="userRange" ref="userRange">
                      <el-select
                        v-model="fromdata.userRange"
                        :disabled="readFields.userRange||fromdata.signState=='0'"
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
                      <el-row>
                        <el-col :span="10">
                          <el-button
                            :disabled="readFields.keepLimit||fromdata.signState=='0'"
                            @click="qixianjd"
                          >期限鉴定表</el-button>
                        </el-col>
                        <el-col :span="14">
                          <el-select
                            v-model="fromdata.keepLimit"
                            :disabled="readFields.keepLimit||fromdata.signState=='0'"
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
                        </el-col>
                      </el-row>
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
                        :disabled="readFields.draftTime||fromdata.signState=='0'"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="成文日期">
                      <el-date-picker
                        type="date"
                        v-model="fromdata.completeTime"
                        disabled
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="发文日期">
                      <el-date-picker
                        type="date"
                        v-model="fromdata.sendTime"
                        disabled
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col>
                    <el-form-item label="正文标题" prop="title" ref="title">
                      <el-input
                        v-model="fromdata.title"
                        :disabled="readFields.title||fromdata.signState=='0'"
                        placeholder="请输入正文标题"
                        @input="handleInputLength"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="附件标题">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.attachTitle"
                        :disabled="readFields.attachTitle||fromdata.signState=='0'"
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
                  <el-col :span="15">
                    <el-form-item label="会签部门" prop="signDepartmentName" ref="signDepartmentName">
                      <div style="display:flex">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          @input="inputChange"
                          v-model="fromdata.signDepartmentName"
                          :disabled="readFields.signDepartmentName||fromdata.signState=='0'"
                          placeholder="请选择会签部门"
                          style="flex:1;color: #F00;"
                          class="hqbm"
                        ></el-input>
                        <button
                          @click="bankmain('hui')"
                          v-if="!sendXbSuccess"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-plus"></i>
                        </button>
                        <button
                          @click="bankmain('hui', '1')"
                          v-if="sendXbSuccess"
                          type="button"
                          class="el-button el-button--default dimi_btn1"
                        >增发</button>
                        <button
                          @click="takeBackSign('shouhui')"
                          v-if="sendXbSuccess"
                          type="button"
                          class="el-button el-button--default dimi_btn1"
                        >收回</button>
                        <button
                          @click="takeBackSign('cuiban')"
                          v-if="sendXbSuccess"
                          type="button"
                          class="el-button el-button--default dimi_btn1"
                        >催办</button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :offset="1" :span="8">
                    <el-form-item
                      label-width="0"
                      prop="finishSignDepartmentName"
                      ref="finishSignDepartmentName"
                    >
                      <el-input
                        v-model="fromdata.finishSignDepartmentName"
                        disabled
                        placeholder="已完成的会签部门"
                        type="textarea"
                        resize="none"
                        autosize
                        style="width: 100%;"
                        class="hqbm1"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col>
                    <el-form-item
                      :label="formText.outsideSign"
                      prop="outsideSign"
                      ref="outsideSign"
                    >
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.outsideSign"
                        :disabled="readFields.outsideSign||fromdata.signState=='0'"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="主送" prop="main" ref="main">
                      <div style="display:flex">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          style="flex:1"
                          v-model="fromdata.main"
                          :disabled="fromdata.signState=='0'"
                        ></el-input>
                        <!-- @blur="inputChange1" -->
                        <button
                          @click="bankmain('zhusong')"
                          type="button"
                          class="el-button el-button--default dimi_btn2"
                          v-if="fromdata.signState!='0'"
                        >
                          <i class="el-icon-plus"></i>
                        </button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="抄送" prop="copy" ref="copy">
                      <div style="display:flex">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          style="flex:1"
                          @input="inputChange"
                          v-model="fromdata.copy"
                          :disabled="fromdata.signState=='0'"
                        ></el-input>
                        <button
                          @click="bankmain('chao')"
                          type="button"
                          class="el-button el-button--default dimi_btn2"
                          v-if="fromdata.signState!='0'"
                        >
                          <i class="el-icon-plus"></i>
                        </button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item :label="formText.inline" prop="inline" ref="inline">
                      <div style="display:flex">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          style="flex:1"
                          @input="inputChange"
                          v-model="fromdata.inline"
                          :disabled="fromdata.signState=='0'"
                        ></el-input>
                        <button
                          @click="bankmain('ben')"
                          type="button"
                          class="el-button el-button--default dimi_btn2"
                          v-if="fromdata.signState!='0'"
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
                          v-if="!editedIdeaFields.opinionSend&&fromdata.signState!='0'"
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
                        :canDelet="canDelet"
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
                          v-if="!editedIdeaFields.opinionDraf&&fromdata.signState!='0'"
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
                        :canDelet="canDelet"
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
                        :canDelet="canDelet"
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
                        :canDelet="canDelet"
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
                      <opinionText
                        :opinionText="fromdata.commentsList"
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
                        :isRemarks="true"
                        @deletService="deletService"
                        :canDelet="canDelet"
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
                          @blur="preserveForReason"
                          resize="none"
                          autosize
                          v-model="fromdata.exceedWordReason"
                          :disabled="editedIdeaFields.exceedWordReason||fromdata.signState=='0'"
                          v-if="fromdata.isExceed && wordsLimitInfo.wordsLimit!=0"
                        ></el-input>
                      </div>
                      <opinionText
                        :opinionText="fromdata.exceedWordReasonList"
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
                        :flagSize="true"
                        @deletService="deletService"
                        :canDelet="canDelet"
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
                    <el-form-item label="分别发送" prop="isSeparate" ref="isSeparate">
                      <el-radio
                        v-model="fromdata.isSeparate"
                        :disabled="readFields.isSeparate||fromdata.signState=='0'"
                        @change="inputLableChange('是')"
                        label="是"
                      >是</el-radio>
                      <el-radio
                        v-model="fromdata.isSeparate"
                        :disabled="readFields.isSeparate||fromdata.signState=='0'"
                        @change="inputLableChange('否')"
                        label="否"
                      >否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="半电子" prop="isArtificial" ref="isArtificial">
                      <el-radio
                        v-model="fromdata.isArtificial"
                        :disabled="readFields.isArtificial||fromdata.signState=='0'"
                        @change="isArtificialChange"
                        label="是"
                      >是</el-radio>
                      <el-radio
                        v-model="fromdata.isArtificial"
                        :disabled="readFields.isArtificial||fromdata.signState=='0'"
                        @change="isArtificialChange"
                        label="否"
                      >否</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!-- <loadAccessory></loadAccessory> -->
                  <uploadFiles
                    ref="uploadComponent"
                    @preserve="preserve"
                    :uploadConfig="uploadConfig"
                    v-if="!sendXbSuccess"
                  ></uploadFiles>
                  <el-col>
                    <div
                      class="file_list_box"
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
                              <span class="order">{{index+1}}.</span>
                              <span
                                class="down"
                                :title="item.fileName"
                                @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)"
                              >{{item.fileName}}</span>
                              <span class="name" :title="item.createrName">{{item.createrName}}</span>
                              <span class="time">{{item.createTime}}</span>
                              <div class="btns">
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="downRow(item,'up')"
                                  v-if="fromdata.attchmentFileInfo.length>1"
                                  :disabled="index==0||fromdata.signState=='0'"
                                  round
                                >上移</el-button>
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="downRow(item,'down')"
                                  v-if="fromdata.attchmentFileInfo.length>1"
                                  :disabled="index==fromdata.attchmentFileInfo.length-1||fromdata.signState=='0'"
                                  round
                                >下移</el-button>
                                <el-button
                                  type="warning"
                                  size="mini"
                                  v-if="fromdata.signState!='0'"
                                  @click.native="deleteRow(index,item.id)"
                                  :disabled="item.disabled&&ckhqzt||fromdata.signState=='0'"
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
              </div>
            </el-form>
          </div>
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
    <!-- 办文说明 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="showExplain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="办文说明"
    >
      <el-form>
        <el-form-item>
          <el-input
            type="textarea"
            resize="none"
            autosize
            rows="20"
            maxlength="2500"
            placeholder="办文说明限制2500字"
            v-model="bwsmFromdata.explain"
            :disabled="readFields.explain || fromdata.signState=='0'"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveBWSM">保存</el-button>
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
      <div class="tui_wen_content">
        <div class="tui_wen_left">
          <p class="tui_wen_list">选择退回环节</p>
          <el-scrollbar>
            <m-table
              size="medium"
              :isSelection="false"
              :isIndex="true"
              :isPagination="false"
              :isSingelCheck="true"
              :isHandle="false"
              :tableData="backTableData"
              :tableCols="backtableCols"
              :pagination="paginationBack"
              @handleTemplateRadio="handleTemplateRadio"
              style="margin-bottom: 20px;"
            ></m-table>
          </el-scrollbar>
        </div>
        <div class="tui_wen_right">
          <p class="tui_wen_list">选择退回原因</p>
          <el-form ref="backForm" :model="backFormData">
            <el-form-item style="height:250px;overflow:scroll;">
              <el-scrollbar>
                <el-checkbox-group v-model="backFormData.comments">
                  <el-checkbox
                    v-for="item in backReasonList"
                    :label="item.backReason"
                    :title="item.backReason"
                    :value="item.id"
                    :key="item.id"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-scrollbar>
            </el-form-item>
            <p class="tui_wen_list">其他原因</p>
            <el-form-item>
              <el-scrollbar>
                <el-input
                  v-model="backFormData.backReason"
                  type="textarea"
                  resize="none"
                  autosize
                  style="max-height:100px !important;"
                ></el-input>
              </el-scrollbar>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showBack = false">取 消</el-button>
        <el-button type="primary" @click="handleBackOff">退 回</el-button>
      </div>
    </el-dialog>
    <!-- 发送/特殊发送 -->
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
        <el-divider v-if="handleSendType==1"></el-divider>
        <el-row v-if="handleSendType==1">
          <el-col :span="2">
            <span class="style_zl">专栏</span>
          </el-col>
          <el-col :span="22">
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
          <el-col :span="3">
            <el-button @click="sendBrandTo">公告至</el-button>
          </el-col>
          <el-col :span="21">
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
        <el-button @click="cancelSendObjGong">取 消</el-button>
        <el-button type="primary" @click="handleSendConfirm">发 送</el-button>
      </div>
    </el-dialog>
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
    <!-- 收回弹窗 -->
    <el-dialog v-dialogDrag :title="dialoghuiqianTit" :visible.sync="shdialog" width="50%">
      <el-card class="dialog_regain">
        <el-checkbox-group v-model="checkedsh" @change="checkouthuiqian">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.processInstId"
            :key="index"
            :disabled="(item.processState == '已处理' || item.processState == '处理中')&&dialoghuiqianTit!='选择需要催办的会签部门'"
          >
            {{item.deptName}}
            <span>({{item.processState}})</span>
          </el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog = false">取 消</el-button>
        <el-button type="primary" @click="shQueding(typeofHQBM)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 树组件 -->
    <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
      :spicalTree="spicalTree"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :loadingTree="loadingTree"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :fromdata="fromdata"
      :checkOrg="checkOrg"
      :treeTradeCode="treeTradeCode"
      :sequenceFlag="isSXHQ"
      :setradio="sequenceSign"
      ref="treeComponent"
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

    <!--发送对象弹窗-->
    <el-dialog
      v-dialogDrag
      :visible.sync="listSendObjstate"
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
                        <span :style="{'width':item.width}">{{user.deptNames}}</span>
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
        <el-button @click="cancelSendObj">取 消</el-button>
        <el-button type="primary" @click="selectSendObj">确定</el-button>
      </div>
    </el-dialog>

    <!--查看会签流程-->
    <el-dialog title="查看会签流程" v-dialogDrag :visible.sync="cbxbchakan">
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

    <!-- 期限鉴定表 -->
    <el-dialog title="期限鉴定表" v-dialogDrag :visible.sync="dialogVisibleQXJD" class="dialog_backed">
      <m-table
        size="medium"
        :isIndex="false"
        :isSingelCheck="true"
        :isHandle="false"
        :height="450"
        :isPagination="true"
        :highlightcurrentrow="true"
        :tableData="tableData"
        :tableCols="tableColsQXJD"
        :pagination="paginationQXJDB"
        @handleCurrentChange="handleCurrentChangeQXJDB"
        @handleSizeChange="handleSizeChangeQXJDB"
        @handleTemplateRadio="handleQXJDRadio"
      ></m-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSureQXJD">确 定</el-button>
        <el-button type="primary" @click="handleNoClause">无对应条款</el-button>
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
    <!--退号-->
    <el-dialog title="退号" v-dialogDrag width="30%" :visible.sync="handeldoBackNoFuc">
      <span>此操作会将正文恢复到套红前的状态，是否确定退号？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeldoBackNoFuc = false">取消</el-button>
        <el-button type="primary" @click="doBackNoHandle">确定</el-button>
      </span>
    </el-dialog>
    <!-- 起草正文 -->
    <el-dialog
      v-dialogDrag
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
        <el-col :span="24" class="mrg-b-20">
          <el-radio v-model="draftFlag" label="frommoude">引用示例模板</el-radio>
        </el-col>
        <el-col :span="24">
          <el-radio v-model="draftFlag" label="newFile">空白文档</el-radio>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDraft = false">取 消</el-button>
        <el-button type="primary" @click="doDraft(null,null,'1')">确定</el-button>
      </div>
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

    <!--发文查重-->
    <el-dialog v-dialogDrag title="发文查重" :visible.sync="showQueryRepeat">
      <el-form
        :model="queryRepeatForm"
        ref="rulesQueryRepeat"
        :rules="rulesQueryRepeat"
        label-width="150px"
        class="demo-ruleForm mt20"
      >
        <el-row>
          <el-form-item label="对比年度" prop="comYear" ref="comYear">
            <el-radio-group v-model="queryRepeatForm.comYear">
              <el-radio label="1">近一年</el-radio>
              <el-radio label="3">近三年</el-radio>
              <el-radio label="5">近五年</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="业务分类" prop="serviceType" ref="serviceType">
            <el-input
              v-model="queryRepeatForm.serviceType"
              :title="queryRepeatForm.serviceType"
              placeholder="请选择"
              disabled
              style="width:100%"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item v-if="showTextType" label="文种" prop="contentType" ref="contentType">
            <el-input
              v-model="queryRepeatForm.contentType"
              placeholder="请选择"
              disabled
              style="width:100%"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-show="showMeetingEndTime"
            label="会议结束时间"
            prop="showMeetingEndTime"
            ref="showMeetingEndTime"
          >
            <el-input v-model="queryRepeatForm.meetingEndTime" disabled style="width: 100%;"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="规章或规范性文件" prop="isNormative" ref="isNormative">
            <el-radio v-model="queryRepeatForm.isNormative" disabled label="是">是</el-radio>
            <el-radio v-model="queryRepeatForm.isNormative" disabled label="否">否</el-radio>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item label="标题关键字" prop="documentTitle" ref="documentTitle">
            <el-input v-model="queryRepeatForm.documentTitle" placeholder="请输入"></el-input>
          </el-form-item>
        </el-row>-->
        <el-row>
          <el-form-item label="结果相似度" prop="threshold" ref="threshold">
            <el-radio-group v-model="queryRepeatForm.threshold">
              <el-radio label="0.5">50%以上</el-radio>
              <el-radio label="0.7">70%以上</el-radio>
              <el-radio label="0.8">80%以上</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="    text-align: center;">
        <el-button type="primary" @click="submitQueryRepeat">确 定</el-button>
        <el-button type="primary" @click="sresetQueryRepeat">重 置</el-button>
        <el-button @click="showQueryRepeat = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 退回说明 -->
    <el-dialog
      v-dialogDrag
      title="退回说明"
      :visible.sync="thShuoMingFlag"
      width="60%"
      class="xiugaicb"
    >
      <!-- <p class="xuanzTh">选择退回环节</p> -->
      <el-scrollbar>
        <m-table
          size="medium"
          :isSelection="false"
          :isPagination="false"
          :isHandle="false"
          :tableData="tableDataThShuoM"
          :tableCols="tableColsThShuoM"
          class="table_TH"
        ></m-table>
      </el-scrollbar>

      <span slot="footer" class="dialog-footer">
        <el-button @click="thShuoMingFlag = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--发文查重结果列表-->
    <el-dialog v-dialogDrag title="查看依据文件" :visible.sync="showQueryRepeatList">
      <m-table
        size="medium"
        :isSelection="false"
        :isIndex="true"
        :isPagination="false"
        :isHandle="true"
        :tableData="tableDataQueryRepeat"
        :tableCols="tableColsQueryRepeat"
        :pagination="paginationQueryRepeat"
        @cellClick="cellClick"
        @handleCurrentChange="handleCurrentChangeQueryRepeat"
        @handleSizeChange="handleSizeChangeQueryRepeat"
      ></m-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQueryRepeatList = false">关 闭</el-button>
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

    <el-table v-if="false" :data="sendTableDatas" style="width: 100%" height="50">
      <el-table-column>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
    </el-table>
    <reasonTips
      @chaoChuTiSYuanY="chaoChuTiSYuanY"
      @drafting="drafting"
      ref="reasonTipsDom"
      :wordsLimitInfo="wordsLimitInfo"
    ></reasonTips>
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
import dispatchIndex from "@/minixs/dispatchIndex";
import reasonTips from "@/components/wordReason/reason.vue";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
// import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import mTable from "@/components/table/mTable.vue";
import uploadFiles from "@/components/uploadFile/uploadFile";
import uploadSendFiles from "@/components/speicalSend/newsend";
import uploadFileSpecial from "@/components/uploadFile/uploadFileSpecial";
import minixs from "@/minixs/index";
import isNowUser from "@/minixs/isNowUser";
import exportTable from "@/minixs/exportTable";
import draftMuban from "@/minixs/draftMuban";
import dateFormate from "@/util/filters.js";
import { mapGetters } from "vuex";
import opinionText from "@/components/opinionText/indexDsipatch";
import closeMessage from "components/closeMessage/index";
import sideBar from "@/components/sideBar/sideBar";
import formTextChange from "@/components/formText/index";
const spacialTableCol = [
  { label: "附件名称", prop: "fileName", align: "center" },
  { label: "部门名称", prop: "deptName", align: "center" }
];
const finshDataQueryRepeat = [
  { label: "查重时间", prop: "cnkiStartTime", align: "center" },
  { label: "查重人", prop: "cnkiCreator", align: "center" },
  { label: "报告时间", prop: "cnkiEndTime", align: "center" },
  { label: "查重结果", prop: "cnkiResultNumber", align: "center" }
];
const ThShuoMfinshData = [
  { label: "执行环节", prop: "backNode", align: "center", width: "150px" },
  { label: "退回环节", prop: "beBackNode", align: "center", width: "150px" },
  { label: "退回原因", prop: "backReason", align: "center" },
  { label: "退回时间", prop: "backTime", align: "center", width: "180px" }
];
let keepMeetingTime = "";
export default {
  name: "BankDispach",
  components: {
    timeDialog,
    treeCofig,
    // secretBasls,
    appendWriteList,
    mTable,
    uploadFiles,
    uploadFileSpecial,
    reasonTips,
    opinionText,
    uploadSendFiles,
    closeMessage,
    sideBar
  },
  computed: {
    ...mapGetters(["fawenInfo", "signquoteInfo"])
  },
  data() {
    return {
      businessTypeList: [],
      transKeepLimit: "",
      closeHandler: false,
      showCloseDialog: false,
      sendFilePeop: [], //有附件人员信息
      sendFilePeopNum: "", //附件序号发送人员
      sendNoFilePeop: false, //无附件发送人员标示
      dialogSendState: false, //新特殊发送
      isArtificialControl: false, // 新增意见域控制条件：是否半电子
      sequenceSign: "",
      interval: null,
      isSXHQ: false, // 顺序会签单选按钮是否可编辑
      defaultUser: {}, //完成并发送默认值
      phoneCheck: false,
      fileListNow: "", //选中特殊发送附件的序号
      // 特殊发送列表
      showSpecial: false,
      showSpecialList: false,
      fjmc: [],
      bmmc: [],
      spacialArr: [],
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      backReasonList: [],
      treeTradeCode: "", //人员树交易线
      checkOrg: false,
      // 发文查重
      queryRepeatForm: {
        function: "getCnkiResult",
        documenId: "", //当前公文的id
        curProcessInstId: "",
        comYear: "", //对比年度
        serviceType: "", //业务分类
        contentType: "", //文种
        isNormative: "", //是否是规范性文章 （true、false）
        documentTitle: "", //标题关键字
        threshold: "" //相关度分数
      },
      tableDataQueryRepeat: [],

      spacialTableCol: spacialTableCol,

      tableColsQueryRepeat: finshDataQueryRepeat,
      paginationQueryRepeat: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      paginationQXJDB: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      // {documentId:this.queryRepeatForm.documenId,function:"getCnkis"}

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
      //显示原因输入框
      showReasonInput: false,
      guReasonFlag: false, //是否有固化超限原因
      //表单控制参数
      huanJieMessage: {},
      scwh: true,
      th: false,
      fhqbm: true,
      qicaozw: true,
      chulizw: false,
      chakanzw: false,
      qinggao: false,
      huifuqg: false,
      taohong: false,
      ckhqzt: false,
      tuihui: false,
      wancheng: false,
      fasong: false,
      teshufasong: false,
      showQueryRepeatListBtn: false,
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: this.wancheng },
        { name: "返回上一处理人", type: "btn_fhsyclr", show: false },
        { name: "起草正文", type: "btn_qczw", show: this.qicaozw },
        { name: "处理正文", type: "btn_clzw", show: this.chulizw },
        { name: "查看正文", type: "btn_ckzw", show: this.chakanzw },
        { name: "删除此文", type: "btn_sccw", show: false },
        { name: "发送", type: "btn_fs", show: this.fasong },
        { name: "特殊发送", type: "btn_tsfs", show: this.teshufasong },
        // { name: "特殊发送列表", type: "btn_tsfslb", show: this.showSpecial },
        { name: "发会签部门", type: "btn_fhqbm", show: this.fhqbm },
        { name: "查看会签状态", type: "btn_ckzlc", show: this.ckhqzt },
        { name: "退回", type: "btn_th", show: this.tuihui },
        { name: "退回说明", type: "btn_twsm", show: this.showTWSM },
        { name: "生成文号", type: "btn_scwh", show: this.scwh },
        { name: "生成上年度文号", type: "btn_scsndwh", show: this.scwh },
        { name: "退号", type: "btn_tuihao", show: this.th },
        { name: "套红头", type: "btn_taoh", show: this.taohong },
        { name: "清稿", type: "btn_qinggao", show: this.qinggao },
        { name: "恢复清稿前正文", type: "btn_huifuqg", show: this.huifuqg },
        { name: "查重", type: "btn_queryRepeat", show: false },
        {
          name: "查重结果",
          type: "btn_queryRepeatList",
          show: this.showQueryRepeatListBtn
        },
        { name: "办结", type: "btn_banjie", show: false },
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
        knowScore: false,
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
        completeTime: false,
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
        explain: false,
        exceedWordReason: false,
        secretBasls: false
      },
      //必填控制域
      requiredFields: {
        type: false,
        redHead: false,
        businessType: false,
        textType: false,
        draftDepartment: false,
        meetingEndTime: false,
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
        secretFlagType: false,
        secretGists: false,
        secretBasls: false
      },
      //可编辑意见域
      editedIdeaFields: {
        opinionSend: true,
        opinionDraf: true,
        opinionCheck: true,
        opinionSign: true,
        comments: true
      },
      //必填意见域
      requiredIdeaFields: {
        opinionSend: false,
        opinionDraf: false,
        opinionCheck: false,
        opinionSign: false,
        comments: false
      },

      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",

      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        sendObjData: [],
        hasFuCheck: true, //是否有特殊发送附件选择
        sendObjSpecialFile: [], //当前操作的附件与部门序号
        checkChange: false,
        attachTitle: "",
        multiTenancyId: "",
        processInstId: ""
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
      //套红文件
      bank_findTemplete: {
        function: "findTemplete",
        sendType: "",
        redHead: "",
        demesticFlag: false //默认windows
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: "doRecoverFile",
        id: ""
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
      //查看子流程
      cbxbchakan: false,
      tableData1: [],
      tableCols1: [
        {
          label: "发送时间",
          prop: "AVYEXCTRTM",
          align: "center",
          formatter(row) {
            return (row.TMS = dateFormate.dataFormat(
              Date.parse(new Date(row.TMS))
            ));
          }
        },
        { label: "部门", prop: "UNITNM", align: "center" },
        { label: "处理人", prop: "AVYEXCTRNM", align: "center" },
        { label: "状态", prop: "NODENAME", align: "center" },
        {
          label: "结束时间",
          prop: "ENDTM ",
          align: "center",
          formatter(row) {
            return row.ENDTM != ""
              ? (row.ENDTM = dateFormate.dataFormat(
                  Date.parse(new Date(row.ENDTM))
                ))
              : (row.ENDTM = "");
          }
        }
        // { label: "状态", prop: "NODENAME", align: "center",formatter(row){
        //     if(row.NODEID == 800){text='完成协办'}else{'正在协办'}
        // }},
      ],
      draftOrganTitle: "",
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      // 重发申请参数
      // bank_rexamine: {
      //   function: "creatAgainOrder",
      //   sendOrderId: "",
      //   sendType: "电子"
      // },
      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      securityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      secretFlagTypeFlag: false,
      // 密级和保密期限  解密时间  显示隐藏
      businessSecretFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      securitytiaojFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      secretFlagTypetiaojFlag: false,
      // 定密依弹窗
      secretDialog: true,
      // 确定完成并发送
      bank_doSend: {
        function: "doSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      // 完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      // 弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      // input框内容
      bank_dispach: {
        function: "toEdit",
        id: ""
        // id: "1"
      },
      // 下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam",
        organizationId: ""
        // organizationId: "2ec81dcb-9ed5-443a-a7e7-314ae0537478"
      },
      // 行发文参数
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: "行发文"
      },
      // 提交参数
      bank_addToSendOrder: {
        function: "addToSendOrder",
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
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      //发公告至
      bank_sendnoticetree: {
        function: "unitTreeByFirst",
        flag: true
      },
      //选中对象和公告至 后最终确认发送
      bank_doFinalSend: {
        function: "doFinalSend",
        isSpecial: 0
      },
      //常用意见
      offenDevices: [],
      // 办文说明
      bwsmFromdata: {
        explain: ""
      },
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
        exceedWordReasonList: [],
        wordsLimit: 0, //0不作限制
        explain: "",
        haveRead: "",
        sendBasis: [],
        inline: "",
        inlineIds: "",
        isExplain: 0, // 判断办文说明是否必填
        isCheckFile: 0, // 是否需要核稿
        isArtificial: "",
        isBack: "",
        isCanDelete: "",
        isClear: "false",
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
        meetingEndTime: "",
        main: "",
        mainIds: "",
        opinionCheck: "",
        opinionDraf: "",
        opinionSend: "",
        outsideSign: "",
        opinionCheckList: [],
        opinionDrafList: [],
        opinionSendList: [],
        opinionSignList: [],
        phone: "",
        realCopy: "",
        reasonLimit: "",
        reasonList: "",
        redHead: "",
        secretFlagContent: "",
        secretFlagType: "",
        secretGists: "",
        secretLimitType: "",
        security: "",
        secretTimeType: "",
        secretType: "",
        sendObjData: [],
        sendTime: "",
        sendType: "",
        sendUnitName: "",
        sequenceSign: "",
        shenpiConfigId: "",
        shenpiTitle: "",
        signDepartmentName: "",
        signDepartmentId: "",
        signSequence: "",
        signState: "",
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
        sendOrderNoticeInfo: "", //公告至
        realMain: "", //发送对象
        sizeFact: "", //正文字数
        isExceed: 0, // 是否超限 1超 0未超
        sizeLimit: 0, // 正文限制字数
        isModifyFile: 0, //1标示本文件签发后又进行了修改 0无
        secretBasls: [] //选中定密依据
      },
      formText: {
        inline: "本行发送",
        outsideSign: "行外会签"
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
      // 退回参数
      bank_back: {
        function: "returnWfNode",
        processInstId: "",
        currNode: ""
      },
      paginationBack: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      //上下移动附件
      bank_upDownFile: {
        function: "changeAttachSort",
        fileId: "",
        sortType: ""
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
        comments: []
      },
      backTableData: [], //表格数据
      backtableCols: [
        { label: "处理环节", prop: "node_Name" },
        { label: "处理人名称", prop: "userName" },
        {
          label: "处理时间",
          prop: "createTime",
          formatter(row) {
            return (row.createTime = dateFormate.dataFormat(
              Date.parse(new Date(row.createTime))
            ));
          }
        }
      ],
      // 发送对象参数
      banl_sendObj: {
        function: "getTcDeptTypeDicList"
      },
      sendTableData: [],
      sendTableDatas: [{ orgDprt: [] }],
      sendTableDatasCol: [
        // { label: "建行" ,isIndeterminate: false},
      ],
      sendCols: [],
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
      rules: {
        meetingEndTime: [
          {
            required: this.selfRules,
            // required: false,
            trigger: "change",
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
        secretFlagType: [
          {
            required: this.selfRules,
            trigger: "blur",
            message: "请选择"
          }
        ],
        secretFlagContent: [
          {
            required: this.selfRules,
            trigger: "blur",
            message: "请选择"
          }
        ],
        isNeedCheckcp: [
          {
            required: this.selfRules1,
            trigger: "blur",
            message: "请选择"
          }
        ]
      },
      rulesQueryRepeat: {
        comYear: [
          {
            required: true,
            trigger: "change",
            message: "请选择对比年度"
          }
        ],
        serviceType: [
          {
            required: true,
            trigger: "change",
            message: "请选择业务分类"
          }
        ],
        contentType: [
          {
            required: true,
            trigger: "change",
            message: "请选择文种"
          }
        ],
        // showMeetingEndTime: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择时间"
        //   }
        // ],
        isNormative: [
          {
            required: true,
            trigger: "change",
            message: "请选择规章或规范性文件"
          }
        ],
        // documentTitle: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请输入标题关键字"
        //   }
        // ],
        threshold: [
          {
            required: true,
            trigger: "change",
            message: "请选择结果相似度"
          }
        ]
      },
      imageUrl: "",
      fileList: [],
      tableData: [],
      dontNeedTh: false,
      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      unCheckData: [], //联合发文单位选中数据
      gongCheckData: [], //公告选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      showBusinessTypeDialog: false,
      showSend: false,
      showSendObj: false,
      spicalTree: false, //特殊发送专用
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      appendWriteDialog: true,
      isDirectFlag: false,
      clickTypes: 1,
      // nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      nowUserId: "", //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      showBack: false, //显示隐藏

      tableCols: [
        { label: "所属团队", prop: "teamname" },
        { label: "创建人", prop: "createUserName" },
        { label: "发布日期", prop: "createTime" }
      ],
      listSendObjstate: false,

      checkedCitiess: [], //回显选中的数据
      checkedCities: [], //发送对象 选中的数据
      checkedCitiNames: [], //发送对象 选中的数据名称
      nowCheckList: [], //当前的选中项copy
      loadingCheck: false, //等待图标
      loadingTree: false, //懒加载标示
      dialogTypeNow: "", //当前弹窗的标示
      checkedGonggaoIds: [], //公告的选中的id
      nowGongGaoCheckList: [], //公告至的数据
      coluCheck: "", //专栏选中的项目
      coluData: [], //专栏数据
      hqPtmt: false,
      // 会签部门增发
      createSighWf: {
        function: "createSighWf",
        processInstId: "",
        multiTenancyId: "CN000",
        pcsAvyId: "",
        tplNo: "",
        moduleType: "send_order",
        curNodeCode: "",
        deptIds: "",
        deptNames: "",
        id: "",
        isSequence: "0",
        avyds: "发送会签部门："
      },
      sendXbSuccess: false,
      addSendType: "",
      showHQ: false,
      shdialog: false, // 收回弹窗
      shData: [], // 收回数据
      checkedsh: [], // 收回列表
      checkeddq: [], // 读取的值
      fwTranHuiId: "A08462023", // 收回交易线
      typeofHQBM: "",
      dialoghuiqianTit: "",

      // 特殊发送
      handleSendType: 1,
      specialDialog: false,
      checkedAll: [],
      checkedAllName: "",

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
        num: "",
        multiTenancyId: "",
        sendType: "",
        id: ""
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
      showQueryRepeat: false,
      showQueryRepeatList: false,
      wh: "",
      // 文种显示
      showTextType: true,
      showMeetingEndTime: false,
      showUnionDepartment: true,
      selectUnionDepartment: false,

      // 知悉范围定密依据是否显示
      showBySecret: false,

      // 期限鉴定表参数
      referForm: {
        function: "getTcDictionaryLimit",
        draftDepartmentId: "",
        page: 1,
        total: 0,
        limit: 20
      },
      dialogVisibleQXJD: false,
      tableColsQXJD: [
        { label: "编号", prop: "numberNo", width: "100px" },
        { label: "条目描述", prop: "mark", align: "left" },
        { label: "保管期限", prop: "limitDate", width: "80px" }
      ],

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
      documentCode: "〔〕号",
      importDataArr: [],
      bank_import: {},

      readFlag: "",

      needHGWC: false, // 流程判断:需要核稿且有值,才能流转行领导秘书和行领导签发流程(true为可流转,false为不可流转)
      needHGWC1: {},

      needQFHG: false,

      needIsnotHFW: true,

      //退回说明
      showTWSM: false, // 是否显示退回说明按钮
      thShuoMingFlag: false, // 弹窗
      tableDataThShuoM: [],
      tableColsThShuoM: ThShuoMfinshData,
      bank_selectBackInfoListBySendOrderId: {
        function: "selectBackInfoListBySendOrderId",
        id: ""
      },

      docFstword: "",

      selfRules: false,
      selfRules1: false,
      nowBack: "",
      upDateSelf: true,
      canDelet: true,
      msgOSShow: false,
      msgData: "",
      changeDocNo: true,
      scwhState: ""
    };
  },
  mixins: [minixs, draftMuban, viewDraft, dispatchIndex, isNowUser],
  mounted() {
    this.interval = setInterval(() => {
      if (localStorage.getItem("notifyState") == "fawen") {
        localStorage.setItem("notifyState", "");
        window.location.reload();
      }
    }, 1000);
    //window.addEventListener("scroll", this.onScroll, true);
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
    // 新增意见域控制条件：是否半电子
    isArtificialChange(e) {
      e == "是"
        ? (this.isArtificialControl = true)
        : (this.isArtificialControl = false);
      this.preserve(null, null, null, null, true).then(save => {
        if (save) {
          this.$nextTick(() => {
            this.$forceUpdate();
          });
        }
      });
    },
    // 特殊发送列表
    handelcheckSpecial() {
      this.$post
        .postData(
          "selectIsSpecialReceiveBySendOrderId",
          JSON.stringify({
            function: "selectIsSpecialReceiveBySendOrderId",
            id: this.bank_dispach.id
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
    // 点击切换分页按钮切换页面
    handleCurrentChangeQueryRepeat(val) {
      this.paginationQueryRepeat.page = val;
      this.tableDataQueryRepeat = [];
      this.handleQueryRepeatList();
    },

    handleSizeChangeQueryRepeat(val) {
      this.paginationQueryRepeat.page = 1;
      this.paginationQueryRepeat.limit = val;
      this.tableDataQueryRepeat = [];
      this.handleQueryRepeatList();
    },

    // 点击查看数据列
    cellClick(row) {
      const routeData = this.$router.resolve({
        path: "/bankDispachQueryRepeat",
        query: {
          id: row.id, //id
          draftDepartment: this.fromdata.draftDepartment, //拟稿部门
          draftTime: this.fromdata.draftTime, //拟稿日期
          draftUser: this.fromdata.draftUser, //拟稿人
          phone: this.fromdata.phone //联系电话
          // receiveType: row.receiveType
        }
      });
      window.open(routeData.href, "_blank");
    },
    //保存附件标题
    saveAttachTitle(val) {
      if (val) {
        this.preserve(null, true);
      }
    },
    //按钮显示隐藏控制
    buttonControl(name, show) {
      for (var item in this.buttonList) {
        if (item.name == name) {
          item.show = show;
        }
      }
    },
    // 按钮控制
    buttonClick(params, state) {
      switch (params) {
        case "btn_bc":
          this.preserve("save", null, null, null, true);
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
        case "btn_tsfslb":
          this.handelcheckSpecial();
          break;
        case "btn_fhqbm":
          this.handleSendHQPtmt();
          break;
        case "btn_qczw":
          this.drafting("1");
          break;
        case "btn_ckzw":
          this.drafting("0");
          break;
        case "btn_clzw":
          this.drafting("2");
          break;
        case "btn_taoh":
          this.drafting("taoHong");
          break;
        case "btn_ckzlc":
          this.handleCheckFLow();
          break;
        case "btn_th":
          this.handleShowBack();
          break;
        case "btn_twsm":
          this.selectBackInfoListBySendOrderId();
          break;
        case "btn_return":
          this.handleDoFinish();
          break;
        case "btn_queryRepeat":
          this.handleQueryRepeat();
          break;
        case "btn_queryRepeatList":
          this.handleQueryRepeatList();
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
          this.collect("send", this.bank_dispach.id);
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
        case "btn_fhsyclr":
          this.handleGoBackup();
          break;
        case "btn_qinggao":
          this.doClearDraft(false, "1");
          break;
        case "btn_huifuqg":
          this.doClearDraft(true);
          break;
      }
    },

    handleInputLength(value) {
      let aa = this.fromdata.title;
      aa.length > 200 ? (aa = aa.slice(0, 200)) : "";
      this.$forceUpdate();
    },
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
    },
    cancelSendObj() {
      this.listSendObjstate = false;
    },
    //表头宽度调整
    flexColumnWidth(name, row) {
      let flexWidth = 100;
      let labelLen = 0;
      let colNames = [];
      let maxLen = 0;
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
      maxLen =
        this.sendTableDatasCol[row].label.length <= labelLen
          ? labelLen
          : this.sendTableDatasCol[row].label.length;
      flexWidth = labelLen * 15;
      this.sendTableDatasCol[row].width = flexWidth + 40 + "px";
      return flexWidth + 80 + "px";
    },
    //发送公告至
    sendBrandTo() {
      this.bankmain("gonggao");
    },
    handleCheckAllChange(val, n) {
      this.checkedAll = [];
      let nowLists = [];
      nowLists = this.sendTableDatas[0].orgDprt[n].name; //当前操作列表
      let dd = [];
      val
        ? this.sendTableDatas[0].orgDprt[n].name.forEach(item => {
            this.checkedCities.push(item.deptIds);
            this.checkedCitiNames.push(item.deptNames);
            dd.push({ id: item.deptIds, text: item.deptNames });
          })
        : (this.checkedCities = []);
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
    inputLableChange() {
      //控制特殊发送按钮
      this.preserve();
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    //定密依据input框值获取
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
    inputChange3(e) {
      let that = this;
      that.fromdata.secretFlagContent = dateFormate.date(
        Date.parse(new Date(that.fromdata.secretFlagContent))
      );
      that.$forceUpdate();
    },
    validatePhone() {
      if (this.fromdata.phone) {
        this.rules.phone.required = false;
      }
    },
    inputChangePhone(e) {
      this.fromdata.phone = this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g, "");
      this.$set(this.fromdata, "phone", this.fromdata.phone);
      this.$forceUpdate();
      this.$nextTick(() => {});
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
      ids = id.split(";");
      names = name.split(";");
      ids.map((item, n) => {
        if (item) {
          obj.push({
            id: item,
            name: names[n]
          });
        }
      });
      return obj;
    },

    // 主送,抄送,会签等弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "zhusong":
          // this.checkIds = this.fromdata.mainIds
          //   ? this.fromdata.mainIds.split(",")
          //   : [];
          // this.checkData = this.zhuCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "chao":
          // this.checkIds = this.fromdata.copyIds
          //   ? this.fromdata.copyIds.split(",")
          //   : [];
          // this.checkData = this.chaoCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "ben":
          // this.checkIds = this.fromdata.inlineIds
          //   ? this.fromdata.inlineIds.split(",")
          //   : [];
          // this.checkData = this.benCheckData;
          this.checkIds = [];
          this.checkData = [];
          break;
        case "hui":
          this.dialogTypeNow = "zengfa";
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

        case "dw":
          this.checkIds = this.fromdata.unionDepartmentIds
            ? this.fromdata.unionDepartmentIds.split(";")
            : [];
          this.checkData = this.unCheckData;
          break;
        case "gonggao":
          // this.checkIds = this.fromdata.sendOrderNoticeInfo
          //   ? this.fromdata.sendOrderNoticeInfo.split(";")[0].split(",")
          //   : [];
          this.checkIds = this.checkedGonggaoIds;
          this.checkData = this.gongCheckData;
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
        case "sendObj":
          this.checkIds = [];
          this.checkData =
            this.uploadConfig.sendObjData[
              this.uploadConfig.sendObjSpecialFile[this.fileListNow]
            ] || []; //批量选择发送
          this.checkData.map(node => {
            this.checkIds.push(node.id);
          });
          break;
        default:
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    // 完成并发送弹窗,主送/抄送/会签等弹窗确认
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
        let newPeopConcat = "";
        let newNameConcat = "";
        let orderNamesByeOrder = [];

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
          if (type == "zhusong" || type == "chao" || type == "ben") {
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
            // this.fromdata.main = this.fromdata.main
            //   ? this.fromdata.main + "，" + names
            //   : names;
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
            // this.fromdata.copy = this.fromdata.copy
            //   ? this.fromdata.copy + "、" + names.replace(/[;]/g,'、')
            //   : names.replace(/[;]/g,'、');
            this.fromdata.copy = this.fromdata.copy
              ? this.fromdata.copy + "，" + names
              : names;
            this.fromdata.copy = this.fromdata.copy.slice(
              0,
              this.fromdata.copy.length - 1
            );
            // this.fromdata.copy = this.fromdata.copy.replace(',', '，');
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
            break;
          case "ben":
            // this.fromdata.inline = this.fromdata.inline
            //   ? this.fromdata.inline + "、" + names.replace(/[;]/g,'、')
            //   : names.replace(/[;]/g,'、');
            this.fromdata.inline = this.fromdata.inline
              ? this.fromdata.inline + "，" + names
              : names;
            this.fromdata.inline = this.fromdata.inline.slice(
              0,
              this.fromdata.inline.length - 1
            );
            // this.fromdata.inline = this.fromdata.inline.replace(',', '，');
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
              // deptIds: that.fromdata.deptIds,
              // deptNames: that.fromdata.deptNames,
              sequenceSign: radio,
              id: that.fromdata.id,
              deptIds: newIds,
              deptNames: newNames,
              isSequence: radio
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
                    that.fromdata.sequenceSign = that.sequenceSign = radio; //1 是 0否
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
              that.createSighWf.deptIds = ids;
              that.createSighWf.deptNames = names;
              that.createSighWf.tplNo = that.fromdata.pTplNo;
              that.createSighWf.curNodeCode = that.fromdata.currentNodeId;
              that.createSighWf.processInstId = that.fromdata.processInstId;
              that.createSighWf.multiTenancyId = that.fromdata.multiTenancyId;
              that.createSighWf.pcsAvyId = that.fromdata.pcsAvyId;
              that.createSighWf.id = that.fromdata.id;
              that.fromdata.sequenceSign = that.sequenceSign = radio; //1 是 0否
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
    //完成并发送关闭
    sendingAndClose(params) {
      this.$post
        .postData("doSend", JSON.stringify(params), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success) {
            this.handleSetLoacl();
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 1500,
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
            duration: 2000
          });
        });
    },
    // 选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.fromdata, this.bank_doSend);
      if (
        this.bank_doSend.nextNodeName === "办公室核稿"
        //  || this.bank_doSend.nextNodeName === "部门核稿"
      ) {
        if (this.fromdata.signDepartmentName) {
          if (this.fromdata.signDepartmentName != "") {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "需要完成会签后才能发送核稿环节！",
              duration: 2000
            });
            return;
          }
        }
      }
      if (
        this.bank_doSend.nextNodeName == "发文" &&
        this.fromdata.isModifyFile == 1
      ) {
        this.$confirm("本文件签发后又进行了修改，是否需要重新签发？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //返回重签
            this.dialogState = false;
            this.checkData = [];
            this.checkIds = [];
          })
          .catch(() => {
            //确定发送
            this.sendingAndClose(params);
          });
      } else {
        this.sendingAndClose(params);
      }
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
      let stepJudge = JSON.parse(localStorage.getItem("tcHumanRole")); //行领导秘书 行领导 不提示超限
      let isHang = false; //行领导秘书 行领导
      stepJudge.map(node => {
        if (
          node.codeName == "行领导秘书岗位" ||
          node.codeName == "行签发岗位"
        ) {
          isHang = true;
        }
      });
      if (this.fromdata.isOutDept != 1) {
        //同一部门时显示
        if (!judge && state == 1 && this.wordsLimitInfo.wordsLimit > 0) {
          //起草正文提示
          this.wordsLimitInfo.dialogSetLimit = true;
          flag = true;
        }
        if (this.wordsLimitInfo.wordsLimit > 0 && state != 1) {
          if (
            this.fromdata.isExceed &&
            this.fromdata.opinionDrafList.length == 0 &&
            !isHang
          ) {
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
    // 点击 完成并发送 弹窗弹出
    completeSendingIsTrue() {
      let that = this;
      let draftReasonFlag = false; //正文超限的校验
      that.clickSaveAndSend = true;
      if (!that.saveCheck()) {
        return;
      }

      if (that.showBySecret && that.fromdata.secretGists === "") {
        that.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "定密依据不能为空!",
          duration: 2000
        });
        return;
      }
      if (!that.fromdata.filePath && !that.fromdata.fileName) {
        that.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先起草正文",
          duation: 1500
        });
        return;
      }
      if (that.fromdata.signState === "0") {
        that.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "正处于会签状态",
          duration: 2000
        });
        return;
      }
      //是否有正文校验
      if (!that.fromdata.filePath) {
        that.$message({
          type: "info",
          offset: 400,
          showClose: true,
          message: "请先起草正文",
          duration: 1500
        });
        return;
      }
      draftReasonFlag = that.judgeDraf(that.zhengWenState);
      if (draftReasonFlag) {
        return;
      }
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
    async completeSending() {
      let that = this;

      // if(that.fromdata.textType=="批复"&&!this.showImportData) {
      //   that.$message({
      //     type: "info",
      //     offset: 400,
      //     showClose: true,
      //     message: "请引入发文依据",
      //     duration: 1500
      //   });
      //   return;
      // }

      that.preserve(null, null, "sending", null, true).then(resP => {
        if (resP) {
        }
      });
    },
    //等待校验过滤的 完成并发送
    waitForFileterSend() {
      let that = this;
      if (
        that.fromdata.currentNode == "拟稿" &&
        !that.bwsmFromdata.explain &&
        that.fromdata.isExplain &&
        that.tableData.length <= 1
      ) {
        that.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "办文说明不能为空!",
          duration: 2000
        });
        return;
      }
      that.dialogTit = "完成并发送";
      that.offenUse = true;
      that.canTab = false;
      that.treeData = [];
      that.dialogType = "dosend";
      that.singelCheckF = true; // 单选true 多选为false
      that.dialogTypeNow = "";
      that.hasRadio = false;
      that.showCompDialog();
      that.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(that.bank_selectConfig),
          that.$businessCode.fawgl
        )
        .then(res => {
          that.seletOptionsData = res.data || [];

          //带约束条件判断环节
          that.seletOptionsData = that.shoNextNode(
            that.seletOptionsData,
            that.needHGWC1
          );
          let parms = Object.assign({}, this.fromdata, that.bank_send);
          parms.pcsAvyId = that.bank_send.pcsAvyId = res.data[0].PCSAVYID;
          that.$post
            .postData(
              "selWfNode",
              JSON.stringify(parms),
              that.$businessCode.ggfawgl
            )
            .then(res => {
              if (res.message == "Loading") {
                that.loadingTree = true;
              } else {
                that.loadingTree = false;
              }
              that.treeData = (res.data && res.data.data) || [];
              that.defaultUser = (res.data && res.data.defaultUser) || {};
            })
            .catch(e => {});
        });
    },
    // 主送,抄送,会签等弹窗
    bankmain(n, state) {
      let name = "";
      this.checkOrg = false;
      this.spicalTree = false;
      switch (n) {
        case "zhusong":
          this.loadingTree = false;
          name = "主送";
          break;
        case "chao":
          this.loadingTree = false;
          name = "抄送";
          break;
        case "ben":
          name = "本行发送";
          break;
        case "hui":
          name = "会签";
          break;
        case "dw":
          name = "单位";
          break;
        case "dosend":
          name = "完成并发送";
          break;
        case "gonggao":
          this.checkOrg = true;
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
      if (n === "dosend") {
        this.hasRadio = false;
        this.canTab = false;
        this.singelCheckF = true;
      }
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
      if (this.sendXbSuccess) {
        this.isSXHQ = true;
      } else {
        this.isSXHQ = false;
      }
      this.showCompDialog();
      if (n === "hui") {
        // this.bank_mainXiao.unitCodes = this.fromdata.draftDepartmentId; // 如果传了这个值，则会签时过滤本部门
        this.bank_mainXiao.unitCodes = ""; // 不传这个值，会签时不过滤本部门
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
      } else if (n === "gonggao" || n === "dw") {
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
    // 控制
    handleContral(value, stateF) {
      //stateF 是否是完成并发送
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
            if (stateF) {
              that.waitForFileterSend();
            }
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
            if (stateF) {
              that.waitForFileterSend();
            }
            setTimeout(() => {
              that.$refs.fromdata.clearValidate();
            });
          })
          .catch(err => {});
      }
    },
    //初始值 //input框内容
    toEdit(oneTip, loadingFlag, stateF, needOnce) {
      let that = this;
      let taoSecret = "";
      let userBuMen = JSON.parse(localStorage.getItem("userInfo")).currUnitId;
      let numTime = { 期号: "", 发送: "", 拟稿部门: "" }; //会议纪要套红信息
      let taoHongConfig = {};
      let qianFaUser = "";
      that.bank_dispach.id = getFormId(that.$route.query.id, "bankDispachId");
      that.bank_dispach.choseYear = this.$route.query.choseYear || "";

      that.$post
        .postData(
          "toEdit",
          JSON.stringify(that.bank_dispach),
          that.$businessCode.fawgl,
          null,
          loadingFlag
        )
        .then(res => {
          that.$route.query.readonlyFwcy ?? this.getIsNowUser(res, "fcy", "db");
          localStorage.setItem("relativePath", this.fromdata.filePath);
          console.log(res);
          that.$forceUpdate();
          if (res.data.isSpecialHead && res.data.isSpecialHead == "1") {
            that.draftOrganTitle =
              res.data && res.data.draftDepartment + "电子发文处理单";
          } else {
            that.draftOrganTitle =
              res.data && res.data.draftOrgan + "电子发文处理单";
          }
          that.fromdata = Object.assign(that.fromdata, res.data);
          that.businessTypeList = that.fromdata.businessType.split(";") || [];
          if (oneTip == 1) {
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

          if (that.fromdata.signState == "0") {
            that.canDelet = false;
          }

          that.sequenceSign =
            (that.fromdata.sequenceSign &&
              that.fromdata.sequenceSign.toString()) ||
            "0";

          that.nowUserId = res.data.currentUserId || "";
          res.data.isArtificial == "是"
            ? (this.isArtificialControl = true)
            : (this.isArtificialControl = false);
          if (res.data.isBack == "true") {
            that.showTWSM = true;
          } else {
            that.showTWSM = false;
          }

          // 公文种类配置中,需要核稿,才能流转到办公室核稿、部门核稿，否则不能流转到部门签发环节
          if (that.fromdata.isCheckFile == 1) {
            that.needIsnotHFW = false;
          } else {
            that.needIsnotHFW = true;
          }

          if (that.fromdata.isModifyFile == 1) {
            that.$msgbox("此文件签发后进行了修改。");
          }

          if (res.data.isCnkiShow == "1") {
            that.showQueryRepeatListBtn = true;
          } else {
            that.showQueryRepeatListBtn = false;
          }
          that.queryRepeatForm.serviceType = that.fromdata.businessType
            ? that.fromdata.businessType
            : "";
          that.queryRepeatForm.contentType = that.fromdata.textType
            ? that.fromdata.textType
            : "";
          that.queryRepeatForm.isNormative = that.fromdata.isStandardFile
            ? that.fromdata.isStandardFile
            : "";
          that.queryRepeatForm.meetingEndTime = dateFormate.dataFormat(
            Date.parse(new Date(that.fromdata.meetingEndTime))
          );

          that.queryRepeatForm.curProcessInstId = res.data.processInstId;
          that.wordsLimitInfo.draftWords = that.fromdata.sizeFact;

          that.showUnionDepartment =
            that.fromdata.unionDepartment && that.fromdata.unionDepartment != ""
              ? false
              : true;

          that.bwsmFromdata.explain = res.data.explain;
          //获取本地存储联系电话
          if (!(res.data && res.data.phone)) {
            let tcHumanRole = JSON.parse(localStorage.getItem("userInfo"));
            this.fromdata.phone = tcHumanRole.telMobile || "";
          }

          // 更新为已读
          if (that.readFlag != "" && that.readFlag != 1) {
            that.getReadFlag();
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

          // if (that.fromdata.isDirect === "" || !that.fromdata.isDirect) {
          //   that.fromdata.isDirect = "否";
          // }
          // if (
          //   that.fromdata.isStandardFile === "" ||
          //   !that.fromdata.isStandardFile
          // ) {
          //   that.fromdata.isStandardFile = "否";
          // }
          if (
            that.fromdata.isArtificial === "" ||
            !that.fromdata.isArtificial
          ) {
            that.fromdata.isArtificial = "否";
          }
          if (that.fromdata.isSeparate === "" || !that.fromdata.isSeparate) {
            that.fromdata.isSeparate = "否";
          }
          that.fromdata.opinionCheckList =
            (res.data &&
              res.data.opinionCheckList &&
              JSON.parse(res.data.opinionCheckList)) ||
            [];
          that.fromdata.opinionDrafList =
            (res.data &&
              res.data.opinionDrafList &&
              JSON.parse(res.data.opinionDrafList)) ||
            [];
          that.fromdata.opinionSendList =
            (res.data &&
              res.data.opinionSendList &&
              JSON.parse(res.data.opinionSendList)) ||
            [];
          that.fromdata.opinionSignList =
            (res.data &&
              res.data.opinionSignList &&
              JSON.parse(res.data.opinionSignList)) ||
            [];
          that.fromdata.commentsList =
            (res.data &&
              res.data.commentsList &&
              JSON.parse(res.data.commentsList)) ||
            [];

          //临时意见处理
          that.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          that.cuteData("opinionDraf", "opinionDrafList", "opinionDrafId");
          that.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          that.cuteData("opinionCheck", "opinionCheckList", "opinionCheckId");
          that.cuteData("comments", "commentsList", "commentsId");

          // 需要有核稿意见才能流转到秘书和行领导环节
          if (that.fromdata.isCheckFile == 1) {
            if (
              (that.fromdata.opinionDraf && that.fromdata.opinionDraf != "") ||
              (that.fromdata.opinionDrafList &&
                that.fromdata.opinionDrafList.length >= 1)
            ) {
              that.needHGWC = true;
            } else {
              that.needHGWC = false;
            }
          } else {
            that.needHGWC = true;
          }

          let attchmentFiles = [];
          let attchmentIds = [];
          if (res.data.attchmentFileInfo) {
            res.data.attchmentFileInfo.map(node => {
              attchmentFiles.push(node.createrName);
              attchmentIds.push(node.id);
            });
          }
          //秘密期限类型 -> 密级和保密期限
          if (res.data.secretType == "商业秘密") {
            if (this.fromdata.secretLimitType != "保密期限") {
              let contInfo = "";
              if (this.fromdata.secretLimitType == "解密条件") {
                contInfo = this.fromdata.secretTimeType;
              } else {
                contInfo = this.fromdata.secretFlagContent;
              }
              taoSecret = this.fromdata.secretFlagType + "☆" + contInfo;
            } else {
              taoSecret =
                this.fromdata.secretFlagType +
                "☆" +
                this.fromdata.secretFlagContent +
                this.fromdata.secretTimeType;
            }
          } else {
            taoSecret = this.fromdata.secretFlagType;
          }
          taoHongConfig = {
            id: res.data.id,
            主办单位: res.data.draftDepartment || "",
            主送: res.data.main || "",
            发文单位署名: res.data.sendUnitName || "",
            发文日期: window.getToday() || "", //发文日期
            密级标识: res.data.secretFlagType || "",
            成文日期: res.data.completeTime || "", //成文日期
            // 抄送: res.data.copy &&'抄送：'+res.data.copy +"。" || "",
            拟稿人: res.data.draftUser || "",
            文号: res.data.documentNo || "",
            // 本行发送: res.data.inline &&'本行发送：'+res.data.inline +"。" || "",
            标题: res.data.title || "",
            秘密类型: res.data.secretType || "",
            密级和保密期限: taoSecret || "",
            紧急程度: res.data.emergencyLevel || "",
            附件: "" //附件
          };
          if (res.data.attachTitle) {
            taoHongConfig["附件标题"] = "附件：" + res.data.attachTitle; //附件标题
          } else {
            taoHongConfig["无附件标题"] = "";
          }
          if (!res.data.copy && !res.data.inline) {
            taoHongConfig["无抄送本行发送"] = "";
          } else if (
            (res.data.copy || res.data.inline) &&
            !(res.data.copy && res.data.inline)
          ) {
            //仅有抄送或本行发送
            taoHongConfig["仅有抄送或本行发送"] = res.data.copy
              ? "抄送：" + res.data.copy + "。"
              : "" || res.data.inline
              ? "本行发送：" + res.data.inline + "。"
              : "";
          } else {
            // 都有时
            taoHongConfig["都有时本行发送"] =
              "本行发送：" + res.data.inline + "。";
            taoHongConfig["都有时抄送"] = "抄送：" + res.data.copy + "。";
          }
          // let isQi = this.fromdata.documentNo.charAt(this.fromdata.documentNo.length-1)=="期"?true:false;
          let isQi = this.fromdata.codeMethod == "1" ? true : false;

          // if(this.fromdata.type == '会议纪要'|| this.fromdata.type == '工作简报'){
          if (isQi) {
            numTime["期号"] = this.fromdata.documentNo.split("〕")[1];

            let concatInfo = ""; //拼接数据
            if (res.data.main) {
              //发送
              concatInfo = res.data.main + "。";
            }

            numTime["发送"] = "发送：" + concatInfo;
            numTime["拟稿部门"] = res.data.draftDepartment || "";
            //为抄送 本行发送 补6个空格
            if (!res.data.copy && !res.data.inline) {
              taoHongConfig["无抄送本行发送"] = "";
            } else if (
              (res.data.copy || res.data.inline) &&
              !(res.data.copy && res.data.inline)
            ) {
              //仅有抄送或本行发送
              if (concatInfo) {
                //解决多余空格
                taoHongConfig["仅有抄送或本行发送"] = res.data.copy
                  ? "　　　" + res.data.copy + "。"
                  : "" || res.data.inline
                  ? "　　　" + res.data.inline + "。"
                  : "";
              } else {
                taoHongConfig["仅有抄送或本行发送"] = res.data.copy
                  ? "" + res.data.copy + "。"
                  : "" || res.data.inline
                  ? "" + res.data.inline + "。"
                  : "";
              }
            } else {
              // 都有时
              taoHongConfig["都有时本行发送"] =
                "　　　" + res.data.inline + "。";
              taoHongConfig["都有时抄送"] = "　　　" + res.data.copy + "。";
            }
            Object.assign(taoHongConfig, numTime);
          }
          //红头建皖报
          this.fromdata.opinionSendList.map(opinion => {
            if (opinion.createTime == this.fromdata.sendOpinionMaxTime) {
              qianFaUser = opinion.userName;
            }
          });

          taoHongConfig["签发人"] = this.fromdata.qfrName || "";

          that.$store.dispatch("setFaWenInfo", taoHongConfig);

          if (this.fromdata.isDirect == "否") {
            this.isDirectFlag = false;
          } else if (this.fromdata.isDirect == "是") {
            this.isDirectFlag = true;
          }

          //发文类型
          if (res.data.type) {
            this.selectType(res.data.type, true);
          } else {
            that.fromdata.documentNo = res.data.documentNo || "";
          }
          if (res.data.secretType && !needOnce) {
            that.secretTypechange(res.data.secretType, true, oneTip);
          }
          if (res.data.secretLimitType) {
            that.workSecurityTab(res.data.secretLimitType, true, "1");
          }
          //正文字数超限原因
          that.fromdata.exceedWordReasonList =
            (res.data &&
              res.data.exceedWordReasonList &&
              JSON.parse(res.data.exceedWordReasonList)) ||
            [];
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

          //在下一环节时是否提示超限
          if (
            oneTip &&
            that.fromdata.currentNode != "拟稿" &&
            that.fromdata.isExceed &&
            that.fromdata.sizeLimit > 0 &&
            that.fromdata.exceedWordReasonList.length &&
            that.fromdata.isOutDept != 1 // isOutDept:1 //出部门
          ) {
            //当前超限原因是上一处理人时
            that.wordsLimitInfo.dialogNextStepTips = true;
          }
          // this.secretTypeBackvalue(res.data.secretType || "商业秘密");
          if (that.fromdata.secretType && that.fromdata.secretType !== "") {
            that.showBySecret = true;
          } else {
            that.showBySecret = false;
          }

          // 任何发文类型都必须有签发意见，否则无法流转到发文环节
          // 在此基础上，行级发文（需要核稿）必须有核稿意见，才能流转到发文环节

          if (that.fromdata.opinionSendList.length > 0) {
            // if(that.fromdata.isCheckFile == 1) {
            //   if(that.fromdata.opinionDrafList.length>0) {
            //     that.needQFHG = true
            //   } else {
            //     that.needQFHG = false
            //   }
            // } else {
            //   that.needQFHG = true
            // }
            that.needQFHG = true;
          } else {
            that.needQFHG = false;
          }
          if (!hasReasonFlag) {
            that.fromdata.exceedWordReason = "";
          }
          //处理会签 、主送、抄送、本行发送
          if (res.data.mainIds) {
            that.zhuCheckData = that.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          that.createSighWf.deptIds = res.data.signDepartmentId;
          that.createSighWf.deptNames = res.data.signDepartmentName;
          if (that.fromdata.signState === "0") {
            that.sendXbSuccess = true;
            that.fhqbm = false;
            that.ckhqzt = true;
          } else {
            that.sendXbSuccess = false;
            that.ckhqzt = false;
            that.fhqbm = true;
          }

          if (res.data.signDepartmentId) {
            that.huiCheckData = that.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartmentName
            );
          } else {
            that.huiCheckData = [];
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

          that.$post
            .postData(
              "selectBackReasonList",
              JSON.stringify({ function: "selectBackReasonList" }),
              that.$businessCode.fawgl,
              null,
              loadingFlag
            )
            .then(res => {
              that.backReasonList = res.data;
            });
          that.draftControl();

          that.handleContral(res.data.processInstId, stateF);

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
          }

          // if (
          //   that.fromdata.isStandardFile == "是" &&
          //   that.fromdata.ifProtect == 1
          // ) {
          //   that.selfRules1 = true;
          //   that.rules.isNeedCheckcp[0].required = selfRules1;
          // } else {
          //   that.selfRules1 = false;
          // }

          that.rules.isNeedCheckcp[0].required = (that.selfRules1 = (that.fromdata.isStandardFile == "是"&&that.fromdata.ifProtect == 1));

          that.uploadConfig.filesHas = that.fromdata.attchmentFileInfo;

          // that.uploadConfig.attachTitle =
          //   that.fromdata.attachTitle &&
          //   that.fromdata.attachTitle.replace(/[\n,\s]/g, "");
          that.fromdata.attachSort = [];

          that.bank_selectConfig.curNodeId = res.data.currentNodeId;
          that.bank_selectConfig.curTplNo = that.bank_send.curTplNo =
            res.data.pTplNo;
          that.bank_selectConfig.curMultiTenancyId = that.bank_send.curMultiTenancyId =
            res.data.multiTenancyId;
        })
        .catch(error => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "请求失败",
          //   duration: 1000
          // });
          console.log(error.message);
        });
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
          this.SsendType =
            (res.data && res.data.sendType && JSON.parse(res.data.sendType)) ||
            [];
          this.SemergencyLevel =
            (res.data &&
              res.data.emergencyLevel &&
              JSON.parse(res.data.emergencyLevel)) ||
            [];
          this.SbusinessType =
            (res.data &&
              res.data.businessType &&
              JSON.parse(res.data.businessType)) ||
            [];
          this.StextType =
            (res.data && res.data.textType && JSON.parse(res.data.textType)) ||
            [];
          this.SsecretType =
            (res.data &&
              res.data.eleSendSecretType &&
              JSON.parse(res.data.eleSendSecretType)) ||
            [];
          this.SsecretFlag = this.secretOptionsFlag =
            (res.data &&
              res.data.secretFlag &&
              JSON.parse(res.data.secretFlag)) ||
            [];
          this.SdirectRange =
            (res.data &&
              res.data.directSendRange &&
              JSON.parse(res.data.directSendRange)) ||
            [];
          this.archivesUserRange =
            (res.data &&
              res.data.archivesUserRange &&
              JSON.parse(res.data.archivesUserRange)) ||
            [];
          this.SdirectType =
            (res.data &&
              res.data.directSendType &&
              JSON.parse(res.data.directSendType)) ||
            [];
          this.SkeepLimit =
            (res.data &&
              res.data.eleSendSecretLimit &&
              JSON.parse(res.data.eleSendSecretLimit)) ||
            [];
          this.SworkSecretFlag =
            (res.data &&
              res.data.workSecretFlag &&
              JSON.parse(res.data.workSecretFlag)) ||
            [];
          this.SbusinessSecret =
            res.data &&
            res.data.tradeSecret &&
            JSON.parse(res.data.tradeSecret);
          this.SsecretLimit =
            res.data &&
            res.data.secretFlagContent &&
            JSON.parse(res.data.secretFlagContent);
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        });
    },
    // 设置已读
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
      that.selfRules = false;
      that.rules.meetingEndTime[0].required = that.selfRules;
      that.rules.main[0].required = !that.selfRules;
      if (value == "行发文" || value == "部门发文" || value == "党务发文") {
        that.docFstword = "";
        that.showTextType = true;
        that.showMeetingEndTime = false;
        that.showUnionDepartment = false;
        that.rules.main[0].required = true;
        that.$forceUpdate();
      } else if (value === "会议纪要") {
        that.showMeetingEndTime = true;
        that.showTextType = false;
        that.showUnionDepartment = true;
        that.selfRules = true;
        that.rules.meetingEndTime[0].required = that.selfRules;
        that.rules.main[0].required = !that.selfRules;
        that.$forceUpdate();
      } else {
        that.showTextType = false;
        that.showMeetingEndTime = false;
        that.showUnionDepartment = true;
        that.rules.main[0].required = true;
        that.$forceUpdate();
        this.fromdata.textType = "";
      }
    },

    // 下拉框 红头/代字内容
    getTcDocTypeDicByParam(type, state) {
      let that = this;
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(that.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          that.isExplain = res.data.isExplain;
          that.isCheckFile = res.data.isCheckFile;
          if (res.data && res.data != "") {
            that.SredHead = res.data;
          } else {
            that.SredHead = res.data = [{ redHead: "请选择" }];
          }
          if (type == 1 && state) {
            if (that.fromdata.redHead) {
              that.selectredhead(that.fromdata.redHead);
            } else {
              that.fromdata.redHead = that.fromdata.documentNo = "";
            }
          } else {
            //代字红头 初始值
            if (type != 1) {
              let transReaHead = [];
              res.data.forEach(element => {
                if (element.ownDepartment == that.fromdata.draftDepartment) {
                  transReaHead.push(element);
                }
              });
              if (transReaHead.length <= 0) {
                that.fromdata.redHead = res.data[0].redHead;
                that.selectredhead(that.fromdata.redHead);
                that.wordsLimitInfo.wordsLimit = res.data[0].wordsLimit || 0;
              } else if (transReaHead.length < 2) {
                that.fromdata.redHead = transReaHead[0].redHead;
                that.selectredhead(that.fromdata.redHead);
                that.wordsLimitInfo.wordsLimit = res.data[0].wordsLimit || 0;
              } else {
                transReaHead.sort((a, b) => {
                  return (
                    Date.parse(a.updateTime.replace(/-/g, "/")) -
                    Date.parse(b.updateTime.replace(/-/g, "/"))
                  );
                });
                that.fromdata.redHead = transReaHead[0].redHead;
                that.selectredhead(that.fromdata.redHead);
                that.wordsLimitInfo.wordsLimit = res.data[0].wordsLimit || 0;
              }
            }
          }
          that.$forceUpdate();
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
        this.wordsLimitInfo.wordsLimit = this.fromdata.sizeLimit =
          matchObjNode("redHead", val, this.SredHead).wordsLimit || 0;
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
    SetDocNoHandle(type) {
      let that = this;
      const [stra, strb] = that.setDocNum.split("-");
      if (!stra) {
        that.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择文号",
          duration: 1500
        });
        return;
      } else {
        that.wh = that.doSaveDocumentNumFuc.num = stra;
      }
      that.doSaveDocumentNumFuc.redHead = that.getNumListForm.redHead;
      that.doSaveDocumentNumFuc.year = that.getNumListForm.year;
      that.doSaveDocumentNumFuc.sendType = that.fromdata.type;
      that.doSaveDocumentNumFuc.id = getFormId(
        that.$route.query.id,
        "bankDispachId"
      );
      that.$post
        .postData(
          "doSaveDocumentNum",
          JSON.stringify(that.doSaveDocumentNumFuc),
          that.$businessCode.fawgl
        )
        .then(res => {
          if (res.success) {
            // if(that.scwhState == 1&&that.changeDocNo) {
            //   that.docNoYear = that.docNoNowYear;
            // } else if(that.scwhState == 2) {
            //   that.docNoYear = that.docNoYear-1;
            // }
            that.fromdata.documentNo =
              that.fromdata.redHead +
              "〔" +
              that.docNoYear +
              "〕" +
              that.docFstword +
              that.wh +
              that.nowBack;
            let transDirectRange = that.fromdata.directRange;
            let transTitle= that.fromdata.title;
            let isReuse = transTitle.includes(transDirectRange)
            console.log(transDirectRange+","+transTitle+","+isReuse);
            if (that.fromdata.directRange && that.fromdata.directRange !== "" && !isReuse) {
              that.fromdata.title =
                that.fromdata.title + "（" + that.fromdata.directRange + "）";
            }
            // if (that.fromdata.directRange && that.fromdata.directRange !== "") {
            //   that.fromdata.title =
            //     that.fromdata.title + "（" + that.fromdata.directRange + "）";
            // }
            that.fromdata.isHasDocumentNo = "true";
            that.preserve(null, null, null, null, true).then(saveD => {
              if (saveD) {
                that.directchange();
              }
            });
            that.SetDocNoVisible = false;
            that.scwh = false;
            that.taohong = true;
            that.$forceUpdate();
          } else {
            this.wh = this.doSaveDocumentNumFuc.num = "";
            that.preserve(null, null, null, null, true).then(saveD => {
              if (saveD) {
                this.SetDocNoVisible = false;
                this.msgOSShow = true;
                this.msgData = res.message;
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
            that.scwh = false;
            that.taohong = true;
            that.th = false;
            if (!matchDoc) {
              this.SetDocNoHandle("2", type);
              this.SetDocNoVisible = false;
            }
            // that.$forceUpdate();
            // that.$nextTick(()=>{
            //   that.preserve(null,null,null,null,true)
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
      that.doBackNoFuc.id = that.fromdata.id;
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
              duration: 1000
            });
            if (that.fromdata.codeMethod == "0") {
              that.nowBack = "号";
              that.docFstword = "";
            } else if (that.fromdata.codeMethod == "1") {
              that.nowBack = "期";
              that.docFstword = "第";
            }
            that.fromdata.documentNo =
              that.fromdata.redHead +
              "〔" +
              that.docNoYear +
              "〕" +
              that.docFstword +
              that.nowBack;
            // that.fromdata.title = that.fromdata.title&&that.fromdata.title.split("（")[0];
            that.scwh = true;
            that.th = false;
            that.wh = "";
            that.fromdata.isHasDocumentNo = "false";
            that.fromdata.isHasRedHead = "false"; //退号后 仍可套红
            that
              .preserve(null, null, null, "doBackNoSave", true)
              .then(saveState => {
                if (saveState) {
                  location.reload();
                }
              });
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

    // 表单校验滚动
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
    // 保存时校验
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
                duration: 2000
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
                duration: 2000
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
                duration: 2000
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
              duration: 2000
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
          duration: 2000
        });
        return;
      }
      return res;
    },
    //超限原因的处理
    preserveForReason() {
      if (this.fromdata.exceedWordReason.length < 10) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "超限原因不能少于10个字！",
          duration: 2000
        });
        return;
      }
      // if(this.fromdata.exceedWordReason){
      //   this.preserve(null,true);
      // }
    },
    // 保存
    async preserve(type, loadingFlag, stateF, doBack, needOnce, goBack) {
      //doBack 退号时 保存标识
      // if (this.fromdata.signState === "0") {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "正处于会签状态，不可做保存操作！",
      //     duration: 2000
      //   });
      //   return;
      // }
      let that = this;
      var obj = Object.assign({}, this.fromdata, this.bank_addToSendOrder);
      var successState = false;
      if (doBack) {
        obj.doBackNoSave = "true";
      }
      await this.$post
        .postData(
          "addToSendOrder",
          JSON.stringify(obj),
          this.$businessCode.fawgl,
          null,
          loadingFlag
        )
        .then(res => {
          if (res && res.success) {
            this.bank_addToSendOrder.id = this.bank_dispach.id = getFormId(
              this.$route.query.id,
              "bankDispachId",
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
                duration: 1500
              });
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
            }
            this.showExplain = false;
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              setTimeout(() => {
                this.$refs.uploadComponent.uploadFileNow();
              }, 3000);
              // this.$refs.uploadComponent.uploadFileNow();
            }
            if (!goBack) {
              this.toEdit(null, loadingFlag, stateF, needOnce);
            }
            successState = true;
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
            successState = false;
          }
        });
      return successState;
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
    handelclose() {
      this.showCloseDialog = true;
    },
    //清稿弹窗
    doClearDraft(flag, isQC) {
      if (!flag) {
        let that = this;
        this.getFileInfo(that).then(res => {
          if (res.state) {
            this.fromdata.isHasRedHead = "true";
            this.preserve().then(save => {
              if (save) {
                let data = that.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: getFormId(that.$route.query.id, "bankDispachId"),
                    zhengWenState: 2,
                    JYcode: that.$businessCode.fawglfj,
                    multiTenancyId: that.fromdata.multiTenancyId,
                    relativePath: res ? res.filePath : "",
                    fileName: res ? res.fileName : "",
                    pageFlag: "fawen",
                    cleanDraftFlag: true,
                    showBtns: true,
                    isQC: isQC ? isQC : "",
                    flowTranId: this.$businessCode.ggfawgl,
                    noNeedColsepage: 0
                  }
                });
                window.open(data.href, "_blank");
              }
            });
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
        "bankDispachId"
      );
      this.bank_doRecoverFile.multiTenancyId = this.fromdata.multiTenancyId;
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
              duration: 1500
            });
            this.toEdit();
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
            message: "操作失败",
            duration: 2000
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
        "bankDispachId"
      );
      this.bank_findTemplete.demesticFlag = !getMachineType(); //true为linux
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
                // this.fromdata.isHasRedHead = "true";
                this.preserve().then(save => {
                  if (save) {
                    this.doDraft(template);
                  }
                });
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
            message: erro.message,
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
              message: "后端获取文件失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "后端获取文件失败",
            duration: 2000
          });
          successInfo.state = false;
        });
      return successInfo;
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
          this.preserve().then(save => {
            if (save) {
              this.showDraft = true;
            }
          });
        } else {
          this.getFileInfo(that).then(res => {
            if (res.state) {
              this.preserve().then(save => {
                if (save) {
                  if (state != "taoHong") {
                    this.doDraft(res);
                  } else {
                    this.dontNeedTh = true;
                    this.findTemplete(res);
                  }
                }
              });
            }
          });
        }
      }
    },
    //正文跳转
    doDraft(fileInfo, saveName, isQC) {
      let str = "";
      if (!saveName) {
        if (this.fromdata.documentNo) {
          str = this.fromdata.documentNo + this.fromdata.title;
        } else {
          str = this.fromdata.title;
        }
      } else {
        str = saveName;
      }
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      let data = "";
      let fileConfig = fileInfo;
      if (this.zhengWenState == 1) {
        if (this.fileInfoOfMuBan.fileName) {
          fileConfig = this.fileInfoOfMuBan;
        }
      }
      if (this.draftFlag == "frommoude") {
        let routeData = this.$router.resolve({
          path: "fwSearch",
          query: {
            multiTenancyId: this.fromdata.multiTenancyId,
            processInstId: this.fromdata.processInstId,
            code: this.$businessCode.fawglfj,
            pageFlag: "bankDispach",
            wenjianId: getFormId(this.$route.query.id, "bankDispachId")
          }
        });
        window.open(routeData.href, "_blank");
        return;
      }
      data = this.$router.resolve({
        path: openPath,
        query: {
          state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
          id: getFormId(this.$route.query.id, "bankDispachId"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          tmpFileName: fileConfig ? fileConfig.fileNameTh : "",
          tmpFilePath: fileConfig ? fileConfig.filePathTh : "",
          isHasRedHead: this.fromdata.isHasRedHead,
          taoHongFlag: fileConfig && fileConfig.fileNameTh ? true : false,
          pageFlag: "fawen",
          isHasRedHead: this.fromdata.isHasRedHead,
          showBtns: this.zhengWenState == 0 ? false : true,
          processInstId: this.fromdata.processInstId,
          stepsNowName: this.fromdata.currentNode,
          flowTranId: this.$businessCode.ggfawgl, //流程交易线    chai
          saveSpecialFileName: str,
          isQC: isQC,
          maindept: this.fromdata.draftDepartment || "",
          uniondept: this.fromdata.unionDepartment || "",
          noNeedColsepage: this.zhengWenState == 0 ? 1 : 0
        }
      });
      if (this.zhengWenState == 2) {
        localStorage.setItem("bankDispachpage", "true");
      }

      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },

    // 删除此文
    delectArticle() {
      this.bank_DeleteSendOrder.id = getFormId(
        this.$route.query.id,
        "bankDispachId"
      );

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
                "doDeleteSendOrder",
                JSON.stringify(this.bank_DeleteSendOrder),
                this.$businessCode.fawgl
              )
              .then(res => {
                this.$message({
                  type: "success",
                  offset: 400,
                  showClose: true,
                  message: "删除成功!",
                  duration: 1500
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
            duation: 1500
          });
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
                    flowTranId: this.$businessCode.ggfawgl, //流程交易线     chai
                    noNeedColsepage: 1
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
            if (this.fromdata.signState == "0") {
              let num = this.tableData.length - 1;
              this.tableData[num].nodeName = "正在会签";
            }
            // this.tableData.
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
            path: "/dzfwcld",
            query: {
              id: this.bank_dispach.id,
              choseYear: this.$route.query.choseYear || ""
            }
          });
          window.open(routeData.href, "_blank");
        }
      });
    },
    // 办文说明
    handleExplain() {
      this.showExplain = true;
    },
    handleSaveBWSM() {
      if (this.bwsmFromdata.explain == "") {
        this.$message({
          type: "error",
          offset: 100,
          showClose: true,
          message: "办文说明不能为空!",
          duation: 1500
        });
        return;
      } else {
        this.fromdata.explain = this.bwsmFromdata.explain;
        this.preserve();
      }
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
          this.$businessCode.fawgl
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
          this.$businessCode.fawgl
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
            message: erro.message,
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
          this.$businessCode.fawgl
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
            message: erro.message,
            duration: 1000
          });
        });
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

    // 发送/特殊发送
    handleSend(val) {
      if (this.fromdata.isHasRedHead != "true") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "发送之前请先清稿！",
          duration: 2000
        });
        return;
      } else {
        this.preserve(null, null, null, null, true).then(save => {
          if (save) {
            this.nowCheckList = [];
            this.checkedCities = [];
            if (
              val == 1 &&
              !this.showSpecial &&
              this.fromdata.isSeparate == "是"
            ) {
              this.$alert(
                "若确认不进行特殊发送，请将“附件分别发送”改为“否”！",
                "提示",
                {
                  confirmButtonText: "确定"
                }
              );
            } else {
              this.handleSendType = val;
              if (val == 2) {
                this.dialogSendState = true;
              } else {
                this.$api.adminConfig.createColumn({}).then(res => {
                  let transArr = [];
                  res.data.forEach(element => {
                    transArr.push(element.zlSslm);
                  });
                  this.showSend = true;
                  this.coluData = transArr;
                });
              }
            }
          }
        });
      }
    },
    handleColuChange(val) {
      this.coluCheck = val;
    },
    //校验是否配置发文岗
    async checkNowUserAuthor(f) {
      this.bank_doFinalSend.isSpecial = 1;
      let backState = false;
      let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
      obj.function = "checkUser";
      if (f) {
        backState = true;
        return backState;
      }
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
      if (
        this.fromdata.type == "会议纪要" &&
        (!this.fromdata.meetingEndTime || this.fromdata.meetingEndTime == "")
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "会议结束时间不能为空！",
          duration: 2000
        });
        return;
      }
      if (this.coluCheck == "") {
        if (
          this.checkedCities.length <= 0 &&
          this.checkedGonggaoIds.length <= 0 &&
          !this.dialogSendState
        ) {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "请选择要发送的部门或公告",
          //   duration: 2000
          // });
          // return;
          this.$confirm("没有选择任何要发送的内容，是否继续？", "提示", {
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
        } else if (
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
              // 添加校验所选部门是否有发文岗
              this.$post
                .postData(
                  "checkUser",
                  JSON.stringify(obj),
                  this.$businessCode.fawgl
                )
                .then(res => {
                  if (res && res.success) {
                    obj.function = "doFinalSend";
                    this.$post
                      .postData(
                        "doFinalSend",
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
                                !(
                                  localStorage.getItem("st").indexOf("smarto") >
                                  -1
                                )
                              ) {
                                if (
                                  !(
                                    localStorage
                                      .getItem("st")
                                      .indexOf("smarto") > -1
                                  )
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
                              !(
                                localStorage.getItem("st").indexOf("smarto") >
                                -1
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
            })
            .catch(() => {
              return;
            });
        } else {
          if (this.handleSendType === 1) {
            this.bank_doFinalSend.isSpecial = 0;
            let obj = Object.assign(
              this.fromdata,
              this.bank_doFinalSend,
              this.checkedGonggaoIds
            );
            obj.function = "checkUser";
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
                  obj.function = "doFinalSend";
                  obj.userMap = res.data;
                  this.$post
                    .postData(
                      "doFinalSend",
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
                              !(
                                localStorage.getItem("st").indexOf("smarto") >
                                -1
                              )
                            ) {
                              if (
                                !(
                                  localStorage.getItem("st").indexOf("smarto") >
                                  -1
                                )
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
            attachTitleId: this.bank_dispach.id, // 表单id
            noiceDeptId: transGongIds // 天阳需要新参数1015
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
                    this.bank_doFinalSend.isSpecial = 0;
                    let obj = Object.assign(
                      this.fromdata,
                      this.bank_doFinalSend
                    );
                    obj.function = "checkUser";
                    // 添加校验所选部门是否有发文岗
                    this.$post
                      .postData(
                        "checkUser",
                        JSON.stringify(obj),
                        this.$businessCode.fawgl
                      )
                      .then(res => {
                        if (res && res.success) {
                          obj.function = "doFinalSend";
                          this.$post
                            .postData(
                              "doFinalSend",
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
                                      !(
                                        localStorage
                                          .getItem("st")
                                          .indexOf("smarto") > -1
                                      )
                                    ) {
                                      if (
                                        !(
                                          localStorage
                                            .getItem("st")
                                            .indexOf("smarto") > -1
                                        )
                                      ) {
                                        window.opener.location.reload();
                                      }
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
                                  this.handleSetLoacl();
                                  localStorage.setItem("tabRecord", "1");
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
                  })
                  .catch(() => {
                    return;
                  });
              } else {
                if (this.handleSendType === 1) {
                  this.bank_doFinalSend.isSpecial = 0;
                  let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
                  obj.function = "checkUser";
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
                        obj.function = "doFinalSend";
                        obj.userMap = res.data;
                        this.$post
                          .postData(
                            "doFinalSend",
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
                                    !(
                                      localStorage
                                        .getItem("st")
                                        .indexOf("smarto") > -1
                                    )
                                  ) {
                                    if (
                                      !(
                                        localStorage
                                          .getItem("st")
                                          .indexOf("smarto") > -1
                                      )
                                    ) {
                                      window.opener.location.reload();
                                    }
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
                                this.handleSetLoacl();
                                localStorage.setItem("tabRecord", "1");
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
    specialSendSave() {
      let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
      obj.isSpecial = 1;
      obj.function = "doFinalSend";
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
        .postData("doFinalSend", JSON.stringify(obj), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success && res.message == "") {
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
          } else if (res && res.success && res.message !== "") {
            this.$confirm(res.message, "提示", {
              confirmButtonText: "确定",
              type: "warning"
            }).then(() => {
              this.showSpecial = true;
              //特殊发送数据清空
              this.clearSpicalData();
              //  location.reload();
            });
          } else {
            let transMessage = res.message;
            let beginIndex = transMessage.indexOf("[");
            transMessage = transMessage.substring(
              beginIndex + 1,
              transMessage.length
            );
            let lastIndex = transMessage.lastIndexOf("]");
            transMessage = transMessage.substring(0, lastIndex);
            transMessage = transMessage.replace("[ERRORCODE=YDCP8COMB001]", "");
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: transMessage,
              duration: 2000
            });
            // setTimeout(() => {
            //  location.reload();
            // }, 1000);
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
          //  location.reload();
        });
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
                duration: 1500,
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
                duration: 2000
              });
            });
        })
        .catch(() => {
          return;
        });
    },
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
      obj.function = "doFinalSend";
      obj.specialSend = [
        // {
        //   "fileId": "",//无附件时为空
        //   "main": "",// 发送对象 无附件的部门id
        //   "copy": "",
        //   "inline": ""// 公告至 无附件的部门id
        // }
      ];

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
      this.$post
        .postData("doFinalSend", JSON.stringify(obj), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success && !res.message) {
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "发送成功",
              duration: 2500
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
              //location.reload();
            });
          } else {
            let transMessage = res.message;
            let beginIndex = transMessage.indexOf("[");
            transMessage = transMessage.substring(
              beginIndex + 1,
              transMessage.length
            );
            let lastIndex = transMessage.lastIndexOf("]");
            transMessage = transMessage.substring(0, lastIndex);
            transMessage = transMessage.replace("[ERRORCODE=YDCP8COMB001]", "");
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: transMessage || res.message,
              duration: 2000
            });
            // setTimeout(() => {
            //  location.reload();
            // }, 1000);
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
          //location.reload();
        });
    },
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
    // 退回
    handleTemplateRadio(value) {
      this.backFormData.sendOrderId = this.$route.query.id;
      this.backFormData.beBackNode = value.node_Name;
      this.backFormData.beBackNodeId = value.node_Code;
      this.backFormData.beBackUser = value.userName;
      this.backFormData.beBackUserId = value.userId;
    },
    handleShowBack() {
      this.preserve().then(save => {
        if (save) {
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
              this.paginationBack.total = res.data.total;
            });
          this.showBack = true;
        }
      });
    },
    handleBackOff() {
      if (!this.backFormData.beBackNodeId) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择退回环节",
          duration: 2000
        });
        return;
      } else if (
        this.backFormData.comments.length == 0 &&
        this.backFormData.backReason == ""
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请填写退回原因",
          duration: 2000
        });
        return;
      }
      if (
        this.backFormData.comments.length > 0 &&
        this.backFormData.backReason != ""
      ) {
        this.backFormData.backReason =
          this.backFormData.comments + "," + this.backFormData.backReason;
      } else if (
        this.backFormData.comments.length > 0 &&
        this.backFormData.backReason == ""
      ) {
        this.backFormData.backReason = this.backFormData.comments;
      }
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
              duration: 1500,
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
              message: res.message,
              duration: 1000
            });
            return;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: error.message,
            duration: 1000
          });
        });
    },

    // 退回说明
    selectBackInfoListBySendOrderId() {
      this.thShuoMingFlag = true;
      this.bank_selectBackInfoListBySendOrderId.id = this.fromdata.id;
      this.$post
        .postData(
          "selectBackInfoListBySendOrderId",
          JSON.stringify(this.bank_selectBackInfoListBySendOrderId),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableDataThShuoM = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

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
            item.label.map((node, m) => {
              if (m < item.label.length - 1) {
                str += node + $("#" + n + m).val();
                if (!$("#" + n + m).val()) {
                  pstr = false;
                  return;
                }
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

    // 秘密切换
    secretTypechange(value, type, oneTip) {
      if (oneTip != "1") {
        if (!type) {
          this.fromdata.workSecretFlag = "";
          this.fromdata.secretFlag = "";
          this.fromdata.secretFlagType = "";
          this.fromdata.secretLimitType = "";
          this.fromdata.security = "";
          this.fromdata.secretFlagContent = "";
          this.fromdata.secretTimeType = "";
        }
        // this.preserve(null,null,null,null,true);
      }
      if (value && value !== "") {
        this.showBySecret = true;
      } else {
        this.showBySecret = false;
      }
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
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
        if (value) {
          // if(value == "商业秘密"){
          this.rules.secretLimitType[0].required = true; //商业秘密
          // }else{
          this.rules.secretFlagType[0].required = true; //工作秘密 内部信息
          // }
        } else {
          this.rules.secretLimitType[0].required = false;
          this.rules.secretFlagType[0].required = false;
        }
      });
    },
    // 商业秘密
    workSecurityTabTime(value) {
      this.$forceUpdate();
      if (value) {
        this.rules.secretFlagContent[0].required = true;
      } else {
        this.rules.secretFlagContent[0].required = false;
      }
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
        } else {
          this.selfRules1 = false;
          this.fromdata.isNeedCheckcp = "";
        }
        this.rules.isNeedCheckcp[0].required = this.selfRules1;
      }
      if (val) {
        this.preserve();
      }
    },

    // 会签部门
    handleSendHQPtmt(newIds, newNames) {
      if (newNames) {
        this.createSighWf.avyds = "增发会签部门：" + newNames;
      } else {
        this.createSighWf.avyds =
          "发送会签部门：" + this.createSighWf.deptNames;
      }

      var obj = Object.assign(this.createSighWf, {
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
        pcsAvyId: this.fromdata.pcsAvyId,
        tplNo: this.fromdata.pTplNo,
        curNodeCode: this.fromdata.currentNodeId,
        deptIds: newIds,
        deptNames: newNames,
        sequenceSign: this.sequenceSign,
        id: this.fromdata.id
      });
      obj.function = "createSighWf";
      if (!this.fromdata.signDepartmentId) {
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
      } else {
        let transAvyds = "";
        if (newNames) {
          obj.deptIds = newIds;
          obj.deptNames = newNames;
        } else {
          obj.deptIds = this.fromdata.signDepartmentId;
          obj.deptNames = this.fromdata.signDepartmentName;
        }
        if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
          if (this.addSendType && this.addSendType == "1") {
            transAvyds = "是否增发“ ";
          } else {
            transAvyds = "是否发“ ";
          }
          this.preserve().then(save => {
            if (save) {
              // 提示是否发会签部门
              this.$confirm(transAvyds + obj.deptNames + " ”会签?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  if (newNames) {
                    obj.deptIds = newIds;
                    obj.deptNames = newNames;
                  } else {
                    obj.deptIds = this.fromdata.signDepartmentId;
                    obj.deptNames = this.fromdata.signDepartmentName;
                  }
                  this.$post
                    .postData(
                      "createSighWf",
                      JSON.stringify(obj),
                      this.$businessCode.fawgl
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
                        this.toEdit();
                        this.fhqbm = false;
                        this.sendXbSuccess = true;
                        this.chakanzw = true;
                        this.chulizw = false;
                        this.addSendType = transAvyds = "";
                      } else {
                        this.$message({
                          type: "error",
                          offset: 400,
                          showClose: true,
                          message: res.message,
                          duration: 1000
                        });
                      }
                    })
                    .catch(erro => {
                      this.$message({
                        type: "error",
                        offset: 400,
                        showClose: true,
                        message: erro.message,
                        duration: 1000
                      });
                    });
                })
                .catch(() => {
                  return;
                });
            } else {
              return;
            }
          });
        }
      }
    },
    //收回t催办
    takeBackSign(type) {
      this.shdialog = true;
      this.typeofHQBM = type;
      this.checkedsh = [];
      let isUrge = true;
      if (type == "shouhui") {
        this.dialoghuiqianTit = "选择需要收回的会签部门";
        isUrge = false;
      } else {
        this.dialoghuiqianTit = "选择需要催办的会签部门";
        isUrge = true;
      }
      const parms = {
        function: "getSubWfInfo",
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
        urge: isUrge
      };
      this.$post
        .postData(
          "getSubWfInfo",
          JSON.stringify(parms),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          if (res && res.success) {
            this.shData = [];
            this.shData = [...res.data].reverse();
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
      let dqdata = this.checkeddq.join(";");
      let transDeptName = "";

      if (!checkboxdata && !dqdata) {
        if (this.typeofHQBM === "shouhui") {
          transDeptName = "收回";
        } else if (this.typeofHQBM === "cuiban") {
          transDeptName = "催办";
        }
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择需要" + transDeptName + "的会签部门",
          duration: 1000
        });
        this.shdialog = false;
        return;
      }
      if (this.typeofHQBM === "shouhui") {
        let shform = {
          function: "takeBackSignHelp",
          pcsAvyId: this.fromdata.pcsAvyId,
          multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: "收回部门：" + dqdata,
          subProcessInstId: checkboxdata,
          id: this.bank_dispach.id
          // avyds: "收回部门：" + dqdata
        };
        this.$post
          .postData(
            "takeBackSignHelp",
            JSON.stringify(shform),
            this.$businessCode.ggfawgl
          )
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1000
              });
              if (this.fromdata.signDepartmentName === "") {
                this.ckhqzt = false;
                this.fhqbm = true;
              } else {
                this.ckhqzt = true;
                this.fhqbm = false;
              }
              this.toEdit();
              this.$forceUpdate();
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
          .catch(error => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: error.message,
              duration: 1000
            });
          });
        this.shdialog = false;
      } else if (this.typeofHQBM == "cuiban") {
        let parms = {
          function: "urgeHandle",
          pcsAvyId: this.fromdata.pcsAvyId,
          multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: "催办部门：" + dqdata,
          subProcessInstId: checkboxdata,
          id: this.bank_dispach.id,
          tplbsnid: "D_FWHQ"
          // avyds: "催办部门：" + dqdata
        };
        this.$post
          .postData(
            "urgeHandle",
            JSON.stringify(parms),
            this.$businessCode.ggfawgl
          )
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "催办成功",
                duration: 1000
              });
            }
          })
          .catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "催办失败",
              duration: 1000
            });
          });
        this.shdialog = false;
        // this.preserve()
      }
    },
    checkouthuiqian(item) {
      this.checkeddq = [];
      let transItem = this.shData.filter(item => {
        let num = this.checkedsh.indexOf(item.processInstId) > -1;
        if (num) {
          this.checkeddq.push(item.deptName);
        }
        return num;
      });
    },

    // 附件上传下载排序
    downRow(item, type) {
      this.bank_upDownFile.fileId = item.id;
      this.bank_upDownFile.sortType = type;
      this.$post
        .postData(
          "changeAttachSort",
          JSON.stringify(this.bank_upDownFile),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.toEdit();
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "改变顺序失败",
                duration: 1500
              });
            }
          }
        });
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
            this.$businessCode.fawglfj
          )
          .then(res => {
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
    checkFuFileChange(data) {
      this.uploadConfig.hasFuCheck = data == 0 ? true : false;
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

    // 查重点击确认
    submitQueryRepeat() {
      this.$refs["rulesQueryRepeat"].validate(valid => {
        if (valid) {
          this.$post
            .postData(
              "getCnkiResult",
              JSON.stringify(this.queryRepeatForm),
              this.$businessCode.fawgl
            )
            .then(res => {
              if (res.success == true) {
                this.showQueryRepeat = false;
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "数据查重完成请点击“查看结果按钮查看”",
                  duration: 500
                });
                this.showQueryRepeatListBtn = true;
                this.preserve();
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "请求出错",
                  duration: 500
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 查重点击重置
    sresetQueryRepeat() {
      (this.queryRepeatForm.comYear = ""),
        // (this.queryRepeatForm.serviceType = ""), //业务分类
        // (this.queryRepeatForm.contentType = ""), //文种
        // (this.queryRepeatForm.isNormative = ""), //是否是规范性文章 （true、false）
        // (this.queryRepeatForm.documentTitle = ""), //
        (this.queryRepeatForm.threshold = ""); //相关度分数
    },
    // 点击查看查重结果列表
    handleQueryRepeatList() {
      this.$post
        .postData(
          "getCnkis",
          JSON.stringify(
            Object.assign(
              {
                documentId: this.queryRepeatForm.documenId,
                function: "getCnkis"
              },
              this.paginationQueryRepeat
            )
          ),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.success == true) {
            this.showQueryRepeatList = true;
            this.tableDataQueryRepeat = res.data.rows;
            if (this.tableDataQueryRepeat.length > 0) {
              this.showQueryRepeatListBtn = true;
            } else {
              this.showQueryRepeatListBtn = false;
            }
            this.paginationQueryRepeat.total = res.data.total || 0;
            for (const key in this.tableDataQueryRepeat) {
              this.tableDataQueryRepeat[key].isButton = "查重结果";
            }
            // this.$message({
            //   type: "success",
            //   showClose: true,
            //   offset: 400,
            //   message: "数据查重完成请点击“查看结果按钮查看”",
            //   duration: 500
            // });
            // this.tableData = res.data.rows;
            // this.pagination.total = res.data.total;
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请求出错",
              duration: 500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleQueryRepeat() {
      this.showQueryRepeat = true;
    },

    //正文相关控制
    draftControl() {
      this.wancheng = true;
      if (this.fromdata.filePath) {
        this.qicaozw = false;
        if (this.fromdata.signState != "0") {
          this.chulizw = true;
        } else {
          this.chakanzw = true;
        }
        if (this.fromdata.isHasRedHead != "true") {
          this.taohong = true;
          this.qinggao = false;
          this.huifuqg = false;
          if (!this.sendXbSuccess) {
            this.chakanzw = false;
            if (this.fromdata.signState != "0") {
              this.chulizw = true;
            } else {
              this.chakanzw = true;
            }
          } else {
            this.chakanzw = true;
            this.chulizw = false;
          }
          //生成文号之后出现套红
          if (this.fromdata.isHasDocumentNo == "true") {
            this.taohong = true;
            //  this.buttonList[1].show = false;
            //  this.buttonList[10].show = false;
            //  this.buttonList[12].show = false;
            this.scwh = false;
            this.th = true;
            this.taohong = true;
            this.wancheng = false;
            this.tuihui = false;
          } else {
            this.taohong = false;
            this.fasong = false;
            this.tuihui = true;
            this.scwh = true;
            // this.buttonList[1].show = true;
            // this.buttonList[10].show = true;
          }
        } else {
          this.taohong = false;
          this.scwh = false;
          if (this.fromdata.isClear == "false") {
            this.huifuqg = false;
            //生成文号之后出现退号
            if (this.fromdata.isHasDocumentNo == "true") {
              this.th = true;
              if (this.fromdata.isHasRedHead != "true") {
                this.taohong = true;
              } else {
                this.qinggao = true;
              }
            } else {
              this.tuihui = true;
              this.scwh = true;
              //退号之后
            }
            this.wancheng = false;
            this.fasong = false;
            this.teshufasong = false;
            this.chakanzw = false;
            if (this.fromdata.signState != "0") {
              this.chulizw = true;
            } else {
              this.chakanzw = true;
            }
          } else {
            this.wancheng = false;
            this.qinggao = false;
            this.fasong = true;
            this.huifuqg = true;
            this.chakanzw = true;
            this.chulizw = false;
            if (this.fromdata.isSeparate == "是") {
              this.teshufasong = true;
            } else {
              this.teshufasong = false;
            }
          }
        }
        //  this.chakanzw = true;
        //       this.chulizw = false;
      } else {
        this.taohong = false;
        this.qinggao = false;
        this.qicaozw = true;
        this.huifuqg = false;
        this.chulizw = false;
      }
      //办公室核稿环节 ；发文环节未生成文号时 显示退回按钮
      if (this.fromdata.currentNode == "办公室核稿") {
        this.tuihui = true;
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
      ); //可编辑意见域
      //配置带约束条件的可编辑意见域
      // if(this.huanJieMessage && this.huanJieMessage.editedIdeaFieldsBycondition){
      //   if(this.huanJieMessage.editedIdeaFieldsBycondition.opinionSend && this.isArtificialControl){
      //     this.editedIdeaFields.opinionSend = false;
      //   } else {
      //     this.editedIdeaFields.opinionSend = true;
      //   }
      //   if(this.huanJieMessage.editedIdeaFieldsBycondition.opinionDraf && this.isArtificialControl){
      //     this.editedIdeaFields.opinionDraf = false;
      //   } else {
      //     this.editedIdeaFields.opinionDraf = true;
      //   }
      // }
      // if (JSON.parse(localStorage.getItem('userInfo')).humanName === this.fromdata.draftUser && this.$route.query.id) {//当前处理人为拟稿人 删除按钮
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
            {
              required: this.requiredFields.textType && this.showTextType,
              trigger: "change",
              message: "请选择文种"
            }
          ],
          secretType: [
            {
              required: this.requiredFields.secretType,
              trigger: ["blur", "change"],
              message: "请选择秘密类型"
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
              required: !this.selfRules,
              trigger: "blur",
              message: "不能为空"
            }
          ],
          secretTimeType: [
            {
              required: !this.selfRules,
              trigger: ["blur", "change"],
              message: "不能为空"
            }
          ],
          workSecretFlag: [
            {
              required:
                this.fromdata.secretType != "" &&
                this.requiredFields.workSecretFlag,
              trigger: ["blur", "change"],
              message: "请选择秘密标志"
            }
          ],
          secretLimitType: [
            {
              required:
                this.fromdata.secretType != "" &&
                this.requiredFields.secretLimitType,
              trigger: ["blur", "change"],
              message: "请选择秘密期限类型"
            }
          ],
          secretTypeName: [
            {
              required:
                this.fromdata.secretType != "" &&
                this.requiredFields.secretTypeName,
              trigger: "change",
              message: "请选择秘密类型"
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
          isSeparate: [
            {
              required: this.requiredFields.isSeparate,
              trigger: "change",
              message: "请选择"
            }
          ],
          isArtificial: [
            {
              required: this.requiredFields.isArtificial,
              trigger: "change",
              message: "请选择"
            }
          ],
          title: [
            {
              required: this.requiredFields.title,
              trigger: "change",
              message: "请输入正文标题"
            },
            { min: 0, max: 200, message: "输入内容超过200字限制,请修改!" }
          ],
          name: [
            {
              required: this.requiredFields.name,
              message: "请输入标题名称",
              trigger: "change"
            },
            { min: 3, max: 5, message: "3-5个字", trigger: "change" }
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
          emergencyName: [
            {
              required: this.requiredFields.emergencyName,
              trigger: "change",
              message: "请选择紧急程度"
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
              required: this.isDirectFlag,
              trigger: "change",
              message: "请选择直发范围"
            }
          ],
          directType: [
            {
              required: this.isDirectFlag,
              trigger: "change",
              message: "请选择直发文种类"
            }
          ],
          officeOpinion: [
            {
              required: this.requiredIdeaFields.officeOpinion,
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
          comments: [
            {
              required: this.requiredIdeaFields.comments,
              message: "不能为空",
              trigger: "change"
            }
          ],
          exceedWordReason: [
            {
              required: this.requiredIdeaFields.exceedWordReason,

              message: "请说明具体原因，不能少于10个字",
              trigger: "change"
            }
          ],
          meetingEndTime: [
            {
              required: this.selfRules,
              // required: false,
              message: "请选择会议结束时间",
              trigger: ["blur", "change"]
            }
          ],
          // main: [
          //   {
          //     required:
          //       this.requiredFields.main != "" && this.requiredFields.main && this.fromdata.type!='会议纪要',
          //     trigger: "blur",
          //     message: "请选择主送"
          //   }
          // ],
          main: [
            {
              required: !this.selfRules,
              trigger: "change",
              message: "请选择主送"
            }
          ],
          isNeedCheckcp: [
            {
              required: this.selfRules1,
              trigger: "blur",
              message: "请选择"
            }
          ]
        };
      });
      this.$forceUpdate();
    },

    // 查看会签流程
    handleCheckFLow() {
      this.$post
        .postData(
          "getSubProcessInfo",
          JSON.stringify({
            function: "getSubProcessInfo",
            processInstId: this.fromdata.processInstId,
            tplbsnid: "D_FWHQ"
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          this.tableData1 = res.data;
        });
      this.cbxbchakan = true;
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
      this.preserve(null, null, null, null, null, true).then(save => {
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
                    // this.$refs.treeComponent.saveSetDialog();
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
    // 无对应条款
    handleNoClause() {
      this.SkeepLimit.forEach(item => {
        if (item.label == "待鉴定") {
          this.fromdata.keepLimit = "待鉴定";
        }
      });
      this.dialogVisibleQXJD = false;
    },
    // 期限鉴定表
    qixianjd() {
      this.dialogVisibleQXJD = true;
      this.referForm.draftDepartmentId = this.fromdata.draftDepartmentId;
      this.$post
        .postData(
          "getTcDictionaryLimit",
          JSON.stringify(Object.assign(this.referForm, this.paginationQXJDB)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.tableData.map(node => {
            if (node.limitDate) {
              node.dispatchDate = false;
            } else {
              node.dispatchDate = true;
            }
          });
          this.paginationQXJDB.total = res.data.total;
        });
    },
    handleCurrentChangeQXJDB(val) {
      this.paginationQXJDB.page = val;
      this.tableData = [];
      this.qixianjd();
    },
    handleSizeChangeQXJDB(val) {
      this.paginationQXJDB.limit = val;
      this.paginationQXJDB.page = 1;
      this.tableData = [];
      this.qixianjd();
    },
    handleQXJDRadio(val) {
      this.transKeepLimit = val.limitDate;
    },
    handleSureQXJD() {
      this.fromdata.keepLimit = this.transKeepLimit;
      this.dialogVisibleQXJD = false;
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
    "uploadConfig.sendObjData": {
      handler(newv) {
        this.uploadConfig.sendObjData = newv;
        this.$forceUpdate();
      },
      deep: true
    },
    "fromdata.attachTitle": {
      handler(newv) {
        this.uploadConfig.attachTitle = newv && newv.replace(/[\n,\s]/g, "");
      },
      deep: true
    }

    // "fromdata.meetingEndTime": {
    //   handler(newv) {
    //     this.fromdata.meetingEndTime = newv?newv:dateFormate.dataFormat(Date.parse(new Date()));
    //     this.$forceUpdate();
    //   },
    //   deep: true
    // },
  },
  created() {
    this.formText = formTextChange("send");
    this.queryOfMuBan(); //起草正文 （带有格式的模板）
    //初始化加载数据
    this.queryRepeatForm.documenId = this.bank_dispach.id = this.uploadConfig.id = getFormId(
      this.$route.query.id,
      "bankDispachId"
    );
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl; //完成并发送 树 流程交易线   chai

    this.$post
      .postData(
        "selectIsSpecialReceiveBySendOrderId",
        JSON.stringify({
          function: "selectIsSpecialReceiveBySendOrderId",
          id: this.bank_dispach.id
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
    this.toEdit(1);
    this.getTcDocTypeDicByParam("1"); // 红头
    this.getSendOrderDicByParam(); // 下拉
  },
  destroyed() {
    clearInterval(this.interval);
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
/deep/ .hqbm .el-input__inner {
  background-color: #fff !important;
}
/deep/ .hqbm1 .el-textarea__inner {
  min-height: 40px !important;
}
/deep/ .no-width-label .el-form-item__content {
  margin: 0 !important;
}
/deep/ .no-width-label::before {
  content: "";
  width: 0px !important;
  margin: 0;
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
.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
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
.sendRowButton {
  padding: 10px;
  height: 400px;
  /deep/ .el-table__body,
  /deep/ .el-table__header {
    table-layout: auto;
  }
  /deep/ .el-table__body-wrapper {
    padding-right: 50px;
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
.el-scrollbar {
  height: 100%;
}
.bank_dispach {
  .dialog_backed {
    /deep/ .el-radio__label {
      display: none;
    }
  }
}
.draftWrap {
  /deep/ .el-dialog__body {
    padding: 0;
  }
}

/deep/ .dialogImport {
  .el-dialog {
    width: 30% !important;
  }
}
//正文超限原因
.size_yuanYin {
  /deep/ ::-webkit-input-placeholder {
    color: red !important;
  }
}
/deep/ .blue_size_yuanYin {
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #e4e7ed52 !important;
    color: blue !important;
  }
}
/deep/ .blue_size_yuanYin {
  .adviceInfo {
    position: absolute;
    width: 100%;
    right: 20px;
    bottom: 0;
    text-align: right;
    color: blue;
  }
}
.selectNodewrap {
  white-space: normal;
  padding-top: 10px;
  line-height: 40px;
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
}
.table_special {
  width: 98%;
  margin: auto;
  border: 1px solid #ccc;
  td {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    width: 50%;
    line-height: 35px;
    text-align: center;
  }
}
/deep/ .el-input__inner1 {
  text-indent: 2px;
  font-weight: normal;
  vertical-align: baseline;
  height: 32px;
  width: 100%;
  line-height: 32px;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  background-color: #e4e7ed52 !important;
  color: #000 !important;
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
.fix_height > .dimi_btn2 {
  text-align: right;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -55px;
  border: none !important;
}
//退文
.tui_wen_content {
  width: 100%;
  height: 500px;
  display: flex;
  .tui_wen_left {
    width: 65%;
    height: 480px;
    padding: 10px 20px;
    .el-scrollbar {
      height: 480px;
      overflow: scroll;
      position: relative;
    }
  }
  .tui_wen_right {
    width: 35%;
    height: 480px;
    padding: 10px 20px;
  }
  .tui_wen_list {
    padding: 20px 10px;
    font-size: 16px;
  }
  // /deep/ .el-radio__label {
  //   display: none;
  // }
  /deep/ .dialogImport {
    .el-dialog {
      width: 30% !important;
    }
  }
}
.table_TH {
  /deep/ .el-table__body-wrapper {
    .cell.el-tooltip {
      white-space: normal;
    }
  }
}
</style>