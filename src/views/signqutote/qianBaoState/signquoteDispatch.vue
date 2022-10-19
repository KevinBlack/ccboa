<template>
  <!-- 签报电子处理单 -->
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>签报处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="preserve('save')">保存</el-button>
          <el-button size="small" plain @click="completeSending">完成并发送</el-button>
          <el-button size="small" plain @click="drafting">起草正文</el-button>
          <el-button size="small" plain @click="delectArticle">删除此文</el-button>
          <el-button size="small" plain @click="collect">收藏</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行电子签报处理单</h3>
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
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>

      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <!-- 当前环节注释 -->
          <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current" style="width:15%;">
              当前环节：
              <span>{{fromdata.currentNode}}</span>
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
                    <el-input v-model="fromdata.title" placeholder="请输入正文标题"  :disabled="signState"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="呈送" prop="submittedName" ref="submittedName">
                    <el-input v-model="fromdata.submittedName" placeholder="请输入附件标题" :disabled="signState"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleTypeName" ref="handleTypeName">
                    <el-radio v-model="fromdata.handleTypeName" label="0" :disabled="signState">批件</el-radio>
                    <el-radio v-model="fromdata.handleTypeName" label="1" :disabled="signState">阅件</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8">
                    <el-select
                      v-model="fromdata.emergencyLevelName"
                      placeholder="请选择"
                      style="width:100%"
                       :disabled="signState"
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
                       :disabled="signState"
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
                    <el-select v-model="fromdata.qianbaoCode" placeholder="请选择" style="width:50%" :disabled="signState">
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
                    <el-input v-model="fromdata.phone" maxlength="11" :disabled="signState"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      @change="secretTypechange"
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      style="width:100%"
                       :disabled="signState"
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
                  <el-form-item label="秘密标志" :span="8" prop="workSecretFlag" ref="workSecretFlag">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.workSecretFlag"
                      placeholder="请选择"
                      style="width:100%"
                       :disabled="signState"
                    >
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
                       :disabled="signState"
                    >
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
                       :disabled="signState"
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
                    prop="security"
                    ref="security"
                    v-if="flag && securityFlag"
                  >
                    <el-select
                    @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      style="width:40%"
                       :disabled="signState"
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
                      v-model="fromdata.secretLimitName"
                      prop="secretLimitName"
                      ref="secretLimitName"
                       :disabled="signState"
                    ></el-input>

                    <el-select
                      name="secretTimeType"
                      v-model="fromdata.secretTimeType"
                      @change="workSecurityTabTime"
                      placeholder="请选择"
                      style="width:25%"
                      prop="secretTimeType"
                      ref="secretTimeType"
                       :disabled="signState"
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
                    prop="security"
                    ref="security"
                    v-if="flag && businessSecretFlag"
                  >
                    <el-select
                    @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      style="width:40%"
                       :disabled="signState"
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
                      v-model="fromdata.secretLimit"
                      style="width: 50%;"
                       :disabled="signState"
                    ></el-date-picker>


                  </el-form-item>
                </el-col>
                <!-- 选择解密条件 -->
                <el-col :span="8">
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="security"
                    ref="security"
                    v-if="flag && securitytiaojFlag"
                  >
                    <el-select
                    @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      style="width:40%"
                       :disabled="signState"
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
                      style="width:50%"
                      prop="secretTimeType"
                      ref="secretTimeType"
                       :disabled="signState"
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
                <el-col v-if="false">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      v-model="fromdata.knowScore"
                      maxlength="500"
                      placeholder="填写备注可输入500字"
                       :disabled="signState"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="false">
                  <el-form-item label="定密依据">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        v-model="fromdata.secretGists"
                        placeholder="填写备注可输入500字"
                        maxlength="500"
                         :disabled="signState"
                      ></el-input>
                      <button
                        @click="secretGistsbox"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                         :disabled="signState"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="签报依据">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        v-model="fromdata.sendBasis"
                        placeholder="请输入签报依据"
                        maxlength="500"
                         :disabled="signState"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="会签部门">
                    <div class="fix_height">
                      <el-input v-model="fromdata.signDepartmentName"  :disabled="signState"></el-input>
                      <button
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        @click="bankmain('hui')"
                         :disabled="signState"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="附件名称">
                    <el-input v-model="fromdata.attachTitle" :disabled="signState"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row>
              <el-col>
                <el-form-item label="批示意见">
                  <div v-for="item in fromdata.approvalOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  <el-input type="textarea" v-model="fromdata.approvalOpinion"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核意见">
                  <div v-for="item in fromdata.checkOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  <el-input type="textarea" v-model="fromdata.checkOpinion"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="会签意见">
                  <div v-for="item in fromdata.signOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  <el-input type="textarea" v-model="fromdata.signOpinion"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="拟稿部门意见">
                  <div v-for="item in fromdata.draftDepartmentOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                      type="textarea"
                      style="flex:1"
                      v-model="fromdata.draftDepartmentOpinion"
                    ></el-input>
                    <button
                      @click="writelistbox(clickTypes=1)"
                      type="button"
                      class="el-button el-button--default dimi_btn"
                    >
                      <i class="el-icon-plus"></i>
                    </button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="备    注">
                  <div v-for="(item) in fromdata.remarkList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
                        >
                          <el-input
                            type="textarea"
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
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
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
                  <el-input type="textarea" v-model="fromdata.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <loadAccessory></loadAccessory>
                <el-col></el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>

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
import loadAccessory from "@/components/LoadAccessory/LoadAccessory";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
// import http from "@/http/http";
export default {
  name: "App",
  components: {
    loadAccessory,
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList
  },
  data() {
    return {
      //全部、待办、已办、办结
      signState:true,
      deleteToQianbaoEntityById: {
        function: "deleteToQianbaoEntityById",
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
      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      securityFlag:false,
       // 密级和保密期限  解密时间  显示隐藏
       businessSecretFlag:false, 
        // 密级和保密期限  解密条件  显示隐藏
        securitytiaojFlag:false,
      // 定密依弹窗
      secretDialog: true,
      //确定完成并发送
      bank_toQianbaoSend: {
        function: "toQianbaoSend",
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
        curMultiTenancyId: "CN000"
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        curTplNo: "testOA3ID",
        curMultiTenancyId: "CN000"
      },
      //input框内容
      bank_dispach: {
        function: "getToQianbaoEntityById",
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
      //提交
      saveOrUpdateToQianbaoEntity: {
        function: "saveOrUpdateToQianbaoEntity",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      fromdata: {
        function: "getToQianbaoEntityById",
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
        qianbaoWords: "",
        secretFlag: "",
        workSecretFlag: "",
        secretType: "",
        secretLimitType: "",
        security: "",
        secretLimitName: "",
        secretTimeType: "",
        secretLimit: "",
        currentUser: "",
        currentNode: "",
        secretGists: "",
        knowScore: "",
        handleSituation: "",
        processInstId: "", //流程实例标识
        pTplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "" //流程活动标示
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
      rules: {},
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
        handleTypeName: [
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
      baoWenZiDuan: "A08461305",
      fwTranHuiId: "A08461303",
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: localStorage.getItem("ccboaHumanId") //当前用户id
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
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
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "deleteOpinionById",
          JSON.stringify(this.bank_deletToSendOrder),
          this.fwTranId
        )
        .then(res => {
          if (res && res.success) {
            // this.receiveselectlist();
               this.getToQianbaoEntityById();
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
    // receiveselectlist() {
    //   this.bank_toQianbaoSend.id = this.bank_dispach.id
    //     ? this.bank_dispach.id
    //     : sessionStorage.getItem("sdzSignpageid") || "";
    //   this.$post
    //     .postData(
    //       "selectSWById",
    //       JSON.stringify(this.receiveselect),
    //       this.fwTranId
    //     )
    //     .then(res => {
    //       if (res.data) {
    //         console.log(res.data);
    //         this.fromdata = res.data;
    //         this.curUser = res.data.curUser;
    //         this.curNodeName = res.data.curNodeName;
    //         this.bank_doSend.id = res.data.id;

    //         //临时意见处理
    //         // this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
    //         // this.cuteData("remarks", "remarkList", "remarkId");
    //         // this.cuteData(
    //         //   "handleTerminateOpinion",
    //         //   "handleTerminateOpinionList",
    //         //   "handleTerminateOpinionId"
    //         // );
    //         // this.cuteData(
    //         //   "officeOpinion",
    //         //   "officeOpinionList",
    //         //   "officeOpinionId"
    //         // );
    //       }
    //     });
    // },

    //会签部门弹框
    bankmain() {
      this.dialogTit = "选择会签部门";
      this.treeData = [];
      this.dialogType = "hui";
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
        case "huiqian":
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
        case "toQianbaoSend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },

    //选择人员后 确定完成并发送
    saveSending() {
      this.bank_toQianbaoSend.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("sdzSignpageid") || "";

      let params = Object.assign(this.bank_toQianbaoSend, this.fromdata);
      this.$post
        .postData(
          "toQianbaoSend",
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

      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "toQianbaoSend";
      this.dialogType = "hui";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;

          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
              this.$businessCode.qbgl
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
    workSecurityTabTime(value){
      console.log(value)
      // this.fromdata.security = value;
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    workSecurityTab(value,type) {
      // this.fromdata.secretFlag = value;
      console.log(value)
      this.$forceUpdate();
      if(value == "保密期限"){
          this.securityFlag = true;
          // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag=false; 
        // 密级和保密期限  解密条件  显示隐藏
         this.securitytiaojFlag=false;
      }else if(value == "解密时间"){
          this.securityFlag = false;
       // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag=true; 
        // 密级和保密期限  解密条件  显示隐藏
         this.securitytiaojFlag=false;

      }else if(value == "解密条件"){
          this.securityFlag = false;
       // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag=false; 
        // 密级和保密期限  解密条件  显示隐藏
         this.securitytiaojFlag=true;

      }else {
          this.securityFlag = false;
       // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag=false; 
        // 密级和保密期限  解密条件  显示隐藏
         this.securitytiaojFlag=false;

      }
      if (!type) {
        this.fromdata.security = "";
        this.fromdata.secretLimitName = "";
        this.fromdata.secretTimeType = "";
        this.fromdata.secretLimit = "";
      }
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
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = false;
        this.secretOptionsFlag = [].concat(this.SsecretFlag);
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = true;
        this.secretOptionsFlag = [].concat(this.SworkSecurity);
      } else {
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
      this.rules = this.copyRules;
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    //保存时校验
    saveCheck() {
      let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      this.scrollIntoForm();
      if (this.flag) {
        if (!this.fromdata.secretLimitType || !this.fromdata.security) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: tips,
            duration: 1000
          });
          return;
        }
      } else {
        if (this.secretTypeFlag && !this.fromdata.secretFlag) {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: tips,
            duration: 1000
          });
          return;
        }
      }
      if (
        !this.fromdata.title ||
        !this.fromdata.submittedName ||
        !this.fromdata.handleTypeName ||
        !this.fromdata.qianBaoTypeName ||
        !this.fromdata.qianbaoCode ||
        !this.fromdata.draftDepartmentName ||
        !this.fromdata.draftUserName ||
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
    // 操作指南
    instructions() {},

    // 下拉列表
    getTcQbsignParamDicInfo() {
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.qbgl
        )
        .then(res => {
          console.log("下拉框", res.data);
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
            this.SsecretLimit =
            res.data &&
            res.data.secretLimit &&
            JSON.parse(res.data.secretLimit);
            
          this.rules = this.copyRules;
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        });
    },

    //初始值 //input框内容
    getToQianbaoEntityById() {
      if (!sessionStorage.getItem("sdzSignpageid")) {
        this.bank_dispach.id = this.$route.query.id;
      } else {
        this.bank_dispach.id = sessionStorage.getItem("sdzSignpageid") || "";
      }
      console.log(this.bank_dispach);
      let that = this;

      this.$post
        .postData(
          "getToQianbaoEntityById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.qbgl
        )
        .then(res => {
          that.fromdata = res.data;
          
          if (res.data.secretType) {
            that.secretTypechange(res.data.secretType, true);
          }

          if(res.data.secretLimitType){
            that.workSecurityTab(res.data.secretLimitType, true);

          }
          if (that.fromdata.handleTypeName == "1") {
            that.fromdata.handleTypeName = "1";
          } else if (that.fromdata.handleTypeName == "0") {
            that.fromdata.handleTypeName = "0";
          }
           if(!this.fromdata.documentNo){
            var date = new Date();
          var str = date.getFullYear();
          this.fromdata.documentNo = "〔" + str + "〕 号";
          }else{
            this.fromdata.documentNo = res.data.documentNo;
          }
          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          this.bank_mmainXiao.deptIds = res.data.signDepartmentId;
          this.bank_mmainXiao.deptNames = res.data.signDepartmentName;
          if (res.data.signDepartmentId) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentId,
              res.data.signDepartmentName
            );
            if (this.fromdata.signState === "0" && this.fromdata.curNodeName === "综合处理" && this.fromdata.signDepartmentName) {
              this.showHQ = true;
            } else {
              this.showHQ = false;
            }
            if(this.fromdata.signState === "0"){
                this.sendXbSuccess = false;
              }else{
                this.sendXbSuccess = true;
              }
          } else {
            this.huiCheckData = [];
          }
          // if (res.data.signDepartmentId) {
          //   this.huiCheckData = this.concatTreeData(
          //     res.data.signDepartmentId,
          //     res.data.signDepartmentName
          //   );
          // }
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
    preserve(type) {
      this.bank_dispach.id = this.$route.query.id
        ? this.$route.query.id
        : sessionStorage.getItem("sdzSignpageid") || "";
      var obj = Object.assign(this.saveOrUpdateToQianbaoEntity, this.fromdata);
      this.$post
        .postData(
          "saveOrUpdateToQianbaoEntity",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.saveOrUpdateToQianbaoEntity.id = this.bank_dispach.id =
              res.data.id;
            this.bank_toQianbaoSend.id = res.data.id;
            sessionStorage.setItem("sdzSignpageid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            this.getToQianbaoEntityById();
          }
        })
        .catch(erro => {
          console.log(777);
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "保存失败",
          //   duration: 1000
          // });
          console.log(erro);
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

      if (scrolled < this.distance_qpyj) {
        this.active = "#wjys";
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

    // 起草正文
    drafting() {
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    // 删除此文
    delectArticle() {
      if (!sessionStorage.getItem("sdzSignpageid")) {
        this.bank_dispach.id = this.$route.query.id;
      } else {
        this.bank_dispach.id = sessionStorage.getItem("sdzSignpageid") || "";
      }
      this.bank_dispach.id = sessionStorage.getItem("sdzSignpageid") || "";
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      console.log(
        this.bank_dispach.id,
        this.$route.query.id,
        deletesendorderid
      );
      this.deleteToQianbaoEntityById.id = deletesendorderid;
      console.log(this.deleteToQianbaoEntityById);
      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.deleteToQianbaoEntityById.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else {
            this.$post
              .postData(
                "deleteToQianbaoEntityById",
                JSON.stringify(this.deleteToQianbaoEntityById),
                this.$businessCode.qbgl
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
          "getWorkflowHistory",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.qbgl
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
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
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
    }
  },
  created() {
     if(!this.$route.query.signState){
       this.signState = false;
    } 
    //判断 待办  已办  办结
    if(this.$route.query.signState === "1"){
       this.signState = false;
    } 
    if(this.$route.query.signState === "2" || this.$route.query.signState === "3"){
      this.signState = true;
    }
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_toQianbaoSend.id = this.bank_dispach.id;
    // this.receiveselectlist();

    this.getToQianbaoEntityById();
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

.nav {
  width: 100%;
  height: 110px;
}
.pad_10 {
  padding: 0 5px;
}
.bank_dispach_header {
  width: 100%;
  height: 90px;
  line-height: 90px;
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
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
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
</style>