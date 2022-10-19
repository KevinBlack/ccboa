<template>
  <!-- 签报电子处理单  (非跨行) 已办-->
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>签报处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>

        </div>
      </el-col>
    </el-row>

    <!-- 起草正文 -->
    <el-dialog
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
    <el-dialog title="收回" width="30%" :visible.sync="sendTackVisible">
      <span>是否确定收回</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendTackVisible = false">取消</el-button>
        <el-button type="primary" @click="sendTackHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="退号" width="30%" :visible.sync="handeldoBackNoFuc">
      <span>是否确定退号</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handeldoBackNoFuc = false">取消</el-button>
        <el-button type="primary" @click="doBackNoHandle">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="生成文号" width="30%" :visible.sync="SetDocNoVisible">
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
    <el-dialog title="查看会签状态" :visible.sync="ckhqzt">
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
        <el-button size="big" type="primary" @click="ckhqzt = false">取 消</el-button>
      </span>
    </el-dialog>
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
            <p class="bank_dispach_annotation_current">
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
                    <el-input v-model="fromdata.title" placeholder="请输入正文标题" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="呈送" prop="submittedName" ref="submittedName">
                    <el-input v-model="fromdata.submittedName" placeholder="请输入附件标题" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleTypeName" ref="handleTypeName">
                    <el-radio v-model="fromdata.handleTypeName" label="0" disabled>批件</el-radio>
                    <el-radio v-model="fromdata.handleTypeName" label="1" disabled>阅件</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    label="紧急程度"
                    :span="8"
                    prop="emergencyLevelName"
                    ref="emergencyLevelName"
                  >
                    <el-select
                      v-model="fromdata.emergencyLevelName"
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
                    <el-input
                      v-model.number="fromdata.phone"
                      disabled
                      oninput="value=value.replace(/[^\-\,\d\*\ ]/g,'')"
                    ></el-input>
                  </el-form-item>
                </el-col>
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
                  <el-form-item label="秘密标志" :span="8" prop="workSecretFlag" ref="workSecretFlag">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.workSecretFlag"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
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
                      disabled
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
                    prop="security"
                    ref="security"
                    v-if="flag && securityFlag"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
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
                      v-model="fromdata.secretLimitName"
                      prop="secretLimitName"
                      ref="secretLimitName"
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
                    prop="security"
                    ref="security"
                    v-if="flag && businessSecretFlag"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
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

                    <el-date-picker
                      type="date"
                      @blur="workSecurityTabTime"
                      placeholder="选择日期"
                      v-model="fromdata.secretLimit"
                      style="width: 50%;"
                      disabled
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
                      style="width:50%"
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
                <el-col v-if="false">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea" resize="none" autosize
                      v-model="fromdata.knowScore"
                      maxlength="500"
                      placeholder="填写备注可输入500字"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="false">
                  <el-form-item label="定密依据">
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
                        v-model="fromdata.secretGists"
                        placeholder="填写备注可输入500字"
                        maxlength="500"
                        disabled
                      ></el-input>
                      <button
                        @click="secretGistsbox"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        disabled
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col v-show="mimiShow">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      v-model="fromdata.knowScore"
                      maxlength="500"
                      resize="none"
                      autosize
                      placeholder="填写备注可输入500字"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="mimiShow">
                  <el-form-item label="定密依据">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        v-model="fromdata.secretGists"
                        placeholder="填写备注可输入500字"
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
                  <el-form-item label="签报依据" v-show="!fromdata.sendBasis">
                    <el-input type="text" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="签报依据" v-if="showImportData">
                    <div class="border_yiju">
                      <el-row v-for="(item) in fromdata.sendBasis" :key="item.id">
                        <el-col :span="20" class="btn_openImport">
                          <el-button
                            type="text"
                            @click="handleCheckImport(item)"
                          >{{item.documentCode}}</el-button>
                        </el-col>
                        <!-- <el-col :span="4" class="btn_delImport">
                          <el-button type="text" @click="handleDeleteImport(item)">删除</el-button>
                        </el-col> -->
                      </el-row>
                    </div>
                  </el-form-item>
                </el-col>


              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="会签部门" prop="signDepartmentName" ref="signDepartmentName">
                    <el-input
                      v-model="fromdata.signDepartmentName"
                      placeholder="请选择会签部门"
                      disabled
                      style="width: 100%;"
                      @input="inputChange"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-plus"
                        @click="bankmain('hui')"
                        v-if="!sendXbSuccess"
                        disabled
                      ></el-button>
                      <el-button slot="append" @click="bankmain('hui', '1')" v-if="sendXbSuccess">增发</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('shouhui')"
                        v-if="sendXbSuccess"
                      >收回</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('cuiban')"
                        v-if="sendXbSuccess"
                      >催办</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="finishSignDepartmentName" ref="finishSignDepartmentName">
                    <el-input
                      v-model="fromdata.finishSignDepartmentName"
                      placeholder="已完成的会签部门"
                      style="width: 100%;"
                      @input="inputChange"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
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
            <el-row>
              <el-col>
                <el-form-item label="批示意见">
                  <div v-for="item in fromdata.approvalOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                  <el-input
                    type="textarea" resize="none" autosize maxlength="500"
                    v-model="fromdata.approvalOpinion"
                    disabled
                    v-if="!(fromdata.approvalOpinionList && fromdata.approvalOpinionList.length)"
                  ></el-input>
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
                  <el-input
                    type="textarea" resize="none" autosize maxlength="500"
                    v-model="fromdata.checkOpinion"
                    disabled
                    v-if="!(fromdata.checkOpinionList && fromdata.checkOpinionList.length)"
                  ></el-input>
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
                  <el-input
                    type="textarea" resize="none" autosize maxlength="500"
                    v-model="fromdata.signOpinion"
                    disabled
                    v-if="!(fromdata.signOpinionList && fromdata.signOpinionList.length)"
                  ></el-input>
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
                  <el-input
                    type="textarea" resize="none" autosize maxlength="500"
                    v-model="fromdata.draftDepartmentOpinion"
                    disabled
                    v-if="!(fromdata.draftDepartmentOpinionList && fromdata.draftDepartmentOpinionList.length)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="办理情况">
                  <div v-for="item in fromdata.handleSituationList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                  <el-input
                    type="textarea" resize="none" autosize maxlength="500"
                    v-model="fromdata.handleSituation"
                    disabled
                    v-if="!(fromdata.handleSituationList && fromdata.handleSituationList.length)"
                  ></el-input>
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
                  <el-input
                    type="textarea" resize="none" autosize maxlength="500"
                    v-model="fromdata.remark"
                    disabled
                    v-if="!(fromdata.remarkList && fromdata.remarkList.length)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row>
                <!-- <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
                ></uploadFiles>-->
                <el-col>

                  <span
                    disabled
                    class="fu_jian_style"
                    v-if="!(fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length)">
                    暂无更多附件信息
                  </span>


                  <div
                    class="tree_w"
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
                            <!-- 预览 -->
                            <span class="name down" :title="item.fileName" @click="viewFile(item)">{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <!-- <div class="btns">
                              <el-button
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
                              >删除</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                round
                              >下载</el-button>
                            </div>-->
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

    <el-dialog :title="dialogTuiWenTit" :visible.sync="tuiWendialog" width="60%">
      <div class="tui_wen_content">
        <div class="tui_wen_left">
          <p class="tui_wen_list">选择退回环节</p>
          <el-scrollbar>
            <m-table
              size="medium"
              :isSelection="false"
              :isIndex="true"
              :isPagination="false"
              :isHandle="false"
              :isSingelCheck="true"
              :tableData="tableData"
              :tableCols="tableCols"
              @handleTemplateRadio="handleTemplateRadio"
              v-loading="tableLoading"
            ></m-table>
          </el-scrollbar>
        </div>
        <div class="tui_wen_right">
          <p class="tui_wen_list">选择退回原因</p>
          <el-checkbox-group v-model="tuiwen">
            <el-checkbox
              v-for="item in tuiwenyy"
              :label="item.label"
              :key="item.label"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
          <p class="tui_wen_list">其他原因</p>
          <el-input
            type="textarea" resize="none" autosize
            v-model="tuiwenyuanyin"
            maxlength="500"
            :autosize="{minRows:5,maxRows:8}"
            placeholder="请输入退回原因"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tuiWendialog = false">取 消</el-button>
        <el-button type="primary" @click="sureTuiWen">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialoghuiqianTit" :visible.sync="shdialog" width="50%">
      <el-card class="dialog_regain">
        <!-- <h6>选择要收回的会签部门</h6> -->
        <el-checkbox-group v-model="checkedsh" @change="checkouthuiqian">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.deptName"
            :key="index"
            :disabled="item.curNodeCode == 800"
          >
            {{item.deptName}}
            <span v-if="item.curNodeCode == 800">(已办结)</span>
          </el-checkbox>
          <!-- <el-checkbox v-for="(item,index) in shData" :label="item.processInstId" :key="index" :disabled="item.processState != '未处理'">{{item.deptName}}（{{item.processState}}）</el-checkbox> -->
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog = false">取 消</el-button>
        <el-button type="primary" @click="shQueding(typeofHQBM)">确 定</el-button>
      </span>
    </el-dialog>
    <treeCofig
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
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>

    <!--签报依据-->
    <el-dialog title="增加签报依据" class="dialogImport" :visible.sync="showImport">
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
    <el-dialog title="查看依据文件" :visible.sync="showImportList">
      <table style="width: 100%;">
        <tr>
          <td class="ckyjbt">文号 : </td>
          <td>{{bank_import.documentCode}}</td>
        </tr>
        <tr>
          <td class="ckyjbt">标题 : </td>
          <td><el-button type="text" @click="viewFile(bank_import)">{{bank_import.title}}</el-button></td>
        </tr>
        <tr>
          <td class="ckyjbt">附件 : </td>
          <td>
            <el-row v-for="(item) in bank_import.attachList" :key="item.id">
              <el-col :span="18">
                <el-button type="text" @click="viewFile(item)">{{item.sort+'. '+item.fileName}}</el-button>
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
</template>
<script>
    import uploadFiles from "@/components/uploadFile/uploadFile";
    import timeDialog from "@/components/timedialog/timedialog";
    import treeCofig from "@/components/tree/tree-fawen";
    import secretBasls from "@/components/secretBasls/secretBasls";
    import appendWriteList from "@/components/appendWriteList/appendWriteList";
    import mTable from "@/components/table/mTable.vue";
    // import minixs from "@/minixs/index";
    import dateFormate from "@/util/filters.js";

    const finshData = [
        { label: "处理环节", prop: "nextNodeName", align: "center" },
        { label: "处理人名称", prop: "nextUserName", align: "center" },
        { label: "处理时间", prop: "completeTime", align: "center" }
    ];
    export default {
        name: "App",
        components: {
            uploadFiles,
            timeDialog,
            treeCofig,
            secretBasls,
            appendWriteList,
            mTable
        },
        // mixins: [minixs],
        data() {
            return {
                //正文
                showDraft: false,
                draftFlag: "newFile", //正文类型 默认空白文档
                zhengWenState: "",
                draftInfo: {
                    fileName: "",
                    filePath: ""
                },

                //查看会签状态
                getSubProcessInfoFuc: {
                    function: "getSubProcessInfo",
                    processInstId: "",
                    tplbsnid: "QB_HQ"
                },
                //查看会签状态
                ckhqzt: false,
                tableCols1: [
                    {
                        label: "发送时间",
                        prop: "TMS",
                        align: "center",
                        formatter(row) {
                            return (row.TMS = dateFormate.date(Date.parse(new Date(row.TMS))));
                        }
                    },
                    { label: "部门", prop: "UNITNM", align: "center" },
                    { label: "处理人", prop: "AVYEXCTRNM", align: "center" },
                    { label: "完成时间", prop: "AVYEXCTRTM", align: "center" },
                    { label: "状态", prop: "NODENAME", align: "center" }
                ],
                tableData1: [],
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
                //退文原因
                tuiwenyuanyin: "",
                //退文选择原因
                tuiwenyy: [
                    {
                        label: "文档格式不正确"
                    },
                    {
                        label: "文档内容不清晰"
                    }
                ],
                // 退文选择原因checkbox
                tuiwen: [],
                tableLoading: false,
                //退文环节列表
                tableData: [],
                tableCols: finshData,
                //退文
                getBackHistory: {
                    function: "getBackHistory",
                    processInstId: ""
                },
                //退文确定
                backSureTuiWen: {
                    function: "doQianbaoBack",
                    multiTenancyId: "",
                    tplNo: "",
                    pcsAvyId: "",
                    processInstId: "",
                    curNodeCode: "",
                    curUserId: "",
                    curUserName: "",
                    nextNodeCode: "",
                    nextUserId: "",
                    nextUserName: ""
                },

                //发会签部门
                createSighWf: {
                    function: "createSighWf",
                    deptIds: "",
                    deptNames: "",
                    avyds: "发送会签部门"
                },
                //办结
                banjiedispatch: {
                    function: "doFinish",
                    // multiTenancyID: "", // parm.getString("multiTenancyId");
                    tplNo: "", // parm.getString("tplNo");
                    pcsAvyId: "", // parm.getString("pcsAvyId");
                    processInstId: "", // parm.getString("processInstId");
                    moduleType: "qb_etc", // parm.getString("moduleType");
                    curNodeCode: ""
                },
                deleteToQianbaoEntityById: {
                    function: "deleteToQianbaoEntityById",
                    id: ""
                },
                //查看流程
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
                securityFlag: false,
                // 密级和保密期限  解密时间  显示隐藏
                businessSecretFlag: false,
                // 密级和保密期限  解密条件  显示隐藏
                securitytiaojFlag: false,
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
                    pcsAvyId: "",
                    curTplNo: "",
                    curMultiTenancyId: ""
                },
                loadingTree: false,
                //弹窗下拉框
                bank_selectConfig: {
                    function: "getNextNodeInfo",
                    curNodeId: "",
                    curTplNo: "",
                    curMultiTenancyId: ""
                },
                //input框内容
                bank_dispach: {
                    function: "getToQianbaoEntityById",
                    id: ""
                },
                //下拉框列表
                bank_dispachfile: {
                    function: "getTcQbsignParamDicInfo",
                    organizationId: ""
                },
                //提交
                saveOrUpdateToQianbaoEntity: {
                    function: "saveOrUpdateToQianbaoEntity",
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
                    function: "getToQianbaoEntityById",
                    title: "",
                    submittedName: "",
                    handleTypeName: "0",
                    phone: "",
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
                    curNodeName: "",
                    secretGists: "",
                    knowScore: "",
                    handleSituation: "",
                    processInstId: "", //流程实例标识
                    tplNo: "", //模板编号
                    multiTenancyId: "", //多实体标识
                    pcsAvyId: "", //流程活动标示
                    attachSort: [],
                    attchmentFileInfo: []
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
                    // qianBaoTypeName: [
                    //   {
                    //     required: true,
                    //     trigger: ["blur", "change"],
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
                    // draftDepartmentName: [
                    //   {
                    //     required: true,
                    //     trigger: ["blur", "change"],
                    //     message: "请选择拟稿部门"
                    //   }
                    // ],
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
                    //   { required: false, trigger: "change", message: "请选择秘密标志" }
                    // ],
                    // secretFlag: [
                    //   { required: false, trigger: "change", message: "请选择秘密标志" }
                    // ],
                    // secretLimitType: [
                    //   {
                    //     required: true,
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
                    // phone: [{ type:"number",required: true, trigger: "blur", message: "请输入联系电话" }],
                    // title: [{ required: true, trigger: "blur", message: "请输入正文标题" }]
                },
                //删除 单条意见
                bank_deletToSendOrder: {
                    function: "doDeletesendOrderOpinion",
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
                setradio: "1", //默认为 是 按照顺序
                dialogVisible: false, // 定密依据
                appendWriteDialog: true,
                clickTypes: 1,
                nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id

                dialogTuiWenTit: "退回",
                tuiWendialog: false,

                // 会签部门增发,
                sendXbSuccess: false,
                addSendType: "",
                showHQ: false,
                shdialog: false, // 收回弹窗
                shData: [], // 收回数据
                checkedsh: [], // 收回列表
                checkeddq: [], // 读取的值
                ggywgn: "A08462023", // 收回交易线
                typeofHQBM: "",
                dialoghuiqianTit: "收回",
                allowBack:"",
                mimiShow: false,

                // 签报依据
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
                bank_import: {}

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
                if (!getFormId(this.$route.query.id, "sfkhSignpageid")) {
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
                        this.getFileInfo(that).then(resF => {
                            if (resF.state) {
                                this.preserve().then(res => {
                                    if (res) {
                                        if (state != "taoHong") {
                                            this.doDraft(resF);
                                        } else {
                                            this.findTemplete(resF);
                                        }
                                    }
                                })
                            }
                        });
                    }
                }
            },
            //正文跳转
            doDraft(fileInfo) {
                let data = this.$router.resolve({
                    path: "/openAndSave_Word",
                    query: {
                        state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
                        id: getFormId(this.$route.query.id, "sfkhSignpageid"),
                        zhengWenState: this.zhengWenState,
                        JYcode: this.$businessCode.qbglfj,
                        multiTenancyId: this.fromdata.multiTenancyId,
                        relativePath: fileInfo ? fileInfo.filePath : "",
                        fileName: fileInfo ? fileInfo.fileName : ""
                    }
                });
                this.showDraft = false;
                this.$forceUpdate();
                window.open(data.href, "_blank");
            },

            //查看会签状态
            handleHuiqianState() {
                this.ckhqzt = true;
                this.getSubProcessInfoFuc.processInstId = this.fromdata.processInstId;
                this.$post
                    .postData(
                        "getSubProcessInfo",
                        JSON.stringify(this.getSubProcessInfoFuc),
                        this.$businessCode.qbgl
                    )
                    .then(res => {
                        this.tableData1 = res.data;
                    });
            },

            //合成格式
            handleHeCgs() {
                console.log("合成格式");
            },

            //生成文号
            SetDocNoHandle() {
                const [stra, strb] = this.setDocNum.split("-");
                this.doSaveDocumentNumFuc.num = stra;
                this.doSaveDocumentNumFuc.redHead = this.getNumListForm.redHead;
                this.doSaveDocumentNumFuc.year = this.getNumListForm.year;
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
            // 生成文号/退号/生成上年文号
            handleSetDocNo() {
                this.SetDocNoVisible = true;
                var day = new Date();
                var str = day.getFullYear();
                this.getNumListForm.redHead = this.fromdata.qianbaoCode;
                this.getNumListForm.year = str;
                this.$post
                    .postData(
                        "getNumList",
                        JSON.stringify(this.getNumListForm),
                        this.$businessCode.qbgl
                    )
                    .then(res => {
                        this.DocNoDataList = res.data;
                        this.setDocNum = Object.values(res.data)[0].split(";")[0] + "-0";
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
                delete parseList.signOpinionList;
                delete parseList.remarkList;
                delete parseList.handleSituationList;
                var obj = Object.assign(this.sendTackFuc, parseList);
                this.$post
                    .postData(
                        "doWithdrawTask",
                        JSON.stringify(obj),
                        this.$businessCode.ggywgn
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
            //退文列表展示
            signBack() {
                this.tuiWendialog = true;

                this.$post
                    .postData(
                        "getBackHistory",
                        JSON.stringify(this.getBackHistory),
                        this.$businessCode.qbgl
                    )
                    .then(res => {
                        this.tableData = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //退文列表选中
            handleTemplateRadio(val) {
                this.backSureTuiWen.nextNodeCode = val.nextNodeCode;
                this.backSureTuiWen.nextNodeName = val.nextNodeName;
                this.backSureTuiWen.nextUserId = val.nextUserId;
                this.backSureTuiWen.nextUserName = val.nextUserName;
            },
            //退文点击确定
            sureTuiWen() {
                this.backSureTuiWen.backExplain = this.tuiwenyuanyin;
                let parseList = JSON.parse(JSON.stringify(this.fromdata));
                delete parseList.approvalOpinionList;
                delete parseList.checkOpinionList;
                delete parseList.draftDepartmentOpinionList;
                delete parseList.signOpinionList;
                delete parseList.remarkList;
                delete parseList.handleSituationList;
                var obj = Object.assign(this.backSureTuiWen, parseList);
                this.$post
                    .postData("doQianbaoBack", JSON.stringify(obj), this.$businessCode.qbgl)
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: "退回成功",
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
                                message: "退回失败",
                                duration: 1000
                            });
                        }

                        this.tuiWendialog = false;
                    })
                    .catch(err => {
                        this.$message({
                            type: "error",
                            offset: 400,
                            showClose: true,
                            message: "退回失败",
                            duration: 1000
                        });
                    });
            },
            //办结
            concludematter() {
                this.preserve();
                let parseList = JSON.parse(JSON.stringify(this.fromdata));
                delete parseList.approvalOpinionList;
                delete parseList.checkOpinionList;
                delete parseList.draftDepartmentOpinionList;
                delete parseList.signOpinionList;
                delete parseList.remarkList;
                delete parseList.handleSituationList;
                var obj = Object.assign(this.banjiedispatch, parseList);
                this.$post
                    .postData("doFinish", JSON.stringify(obj), this.$businessCode.ggywgn)
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
                            message: "办结失败",
                            duration: 1000
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
                if (n === "hui") {
                    this.$post
                        .postData(
                            "selUnitTreeByHQ",
                            JSON.stringify(this.bank_mmainXiao),
                            this.$businessCode.ggywgn
                        )
                        .then(res => {
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
                            this.saveOrUpdateToQianbaoEntity.sequenceSign = radio;

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
                        if (this.addSendType == 1) {
                            this.checkData.map(item => {
                                //选中的不可操作
                                item.disabled = true;
                            });
                        }
                        break;
                    case "ben":
                        this.checkIds = this.fromdata.inlineIds
                            ? this.fromdata.inlineIds.split(";")
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
                //   : sessionStorage.getItem("sfkhSignpageid") || "";
                this.bank_toQianbaoSend.id = this.bank_dispach.id = getFormId(
                    this.$route.query.id,
                    "sfkhSignpageid"
                );
                let parseList = JSON.parse(JSON.stringify(this.fromdata));
                delete parseList.approvalOpinionList;
                delete parseList.checkOpinionList;
                delete parseList.draftDepartmentOpinionList;
                delete parseList.signOpinionList;
                delete parseList.remarkList;
                delete parseList.handleSituationList;
                let params = Object.assign(this.bank_toQianbaoSend, parseList);
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
            async completeSending() {
                let judge = true;
                judge = this.saveCheck();
                if (!judge) {
                    return;
                }
                this.dialogTit = "完成并发送";
                this.offenUse = true;
                this.canTab = false;
                this.treeData = [];
                this.dialogTypeNow = "toQianbaoSend";
                this.dialogType = "dosend";
                this.dialogTypeBack = true;
                this.singelCheckF = true; // 单选true 多选为false
                this.hasRadio = false;
                this.loadingTree = true;
                this.showCompDialog();
                this.preserve().then(res => {
                    if (res) {
                        this.$post
                            .postData(
                                "getNextNodeInfo",
                                JSON.stringify(this.bank_selectConfig),
                                this.$businessCode.qbgl
                            )
                            .then(res => {
                                this.seletOptionsData = res.data || [];
                                let parms = Object.assign(this.bank_send, this.fromdata);
                                parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;
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
                                        this.treeData = res.data;
                                        if (res.message == "Loading") {
                                            this.loadingTree = true;
                                        } else {
                                            this.loadingTree = false;
                                        }
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
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
            workSecurityTabTime(value) {
                this.$forceUpdate();
                this.$nextTick(() => {
                    this.$refs.fromdata.clearValidate();
                });
            },
            workSecurityTab(value, type) {
                this.$forceUpdate();
                if (value == "保密期限") {
                    this.securityFlag = true;
                    // 密级和保密期限  解密时间  显示隐藏
                    this.businessSecretFlag = false;
                    // 密级和保密期限  解密条件  显示隐藏
                    this.securitytiaojFlag = false;
                } else if (value == "解密时间") {
                    this.securityFlag = false;
                    // 密级和保密期限  解密时间  显示隐藏
                    this.businessSecretFlag = true;
                    // 密级和保密期限  解密条件  显示隐藏
                    this.securitytiaojFlag = false;
                } else if (value == "解密条件") {
                    this.securityFlag = false;
                    // 密级和保密期限  解密时间  显示隐藏
                    this.businessSecretFlag = false;
                    // 密级和保密期限  解密条件  显示隐藏
                    this.securitytiaojFlag = true;
                } else {
                    this.securityFlag = false;
                    // 密级和保密期限  解密时间  显示隐藏
                    this.businessSecretFlag = false;
                    // 密级和保密期限  解密条件  显示隐藏
                    this.securitytiaojFlag = false;
                }
                if (!type) {
                    this.fromdata.security = "";
                    this.fromdata.secretLimitName = "";
                    this.fromdata.secretTimeType = "";
                    this.fromdata.secretLimit = "";
                }
                // this.rules = this.copyRules;
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
                // this.rules = this.copyRules;
                this.$nextTick(() => {
                    this.$refs.fromdata.clearValidate();
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
                                !this.fromdata.security ||
                                !this.fromdata.secretLimitName ||
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
                            if (!this.fromdata.security || !this.fromdata.secretLimit) {
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
                            if (!this.fromdata.security || !this.fromdata.secretTimeType) {
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
                    !this.fromdata.workSecretFlag
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
                    return true;
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

                        // this.rules = this.copyRules;
                        this.$nextTick(() => {
                            this.$refs.fromdata.clearValidate();
                        });
                    });
            },

            //初始值 //input框内容
            getToQianbaoEntityById() {
                // if (!sessionStorage.getItem("sfkhSignpageid")) {
                //   this.bank_dispach.id = this.$route.query.id;
                // } else {
                //   this.bank_dispach.id = sessionStorage.getItem("sfkhSignpageid") || "";
                // }
                this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");
                this.$post
                    .postData(
                        "getToQianbaoEntityById",
                        JSON.stringify(this.bank_dispach),
                        this.$businessCode.qbgl
                    )
                    .then(res => {
                        this.fromdata = res.data;


                        // 签报依据
                        if (
                            res.data.sendBasis &&
                            JSON.parse(res.data.sendBasis).length != 0
                        ) {
                            this.showImportData = true;
                        }
                        this.fromdata.sendBasis = this.importDataArr =
                            res.data && res.data.sendBasis && JSON.parse(res.data.sendBasis);



                        this.allowBack = res.data.fieldStatusMap && res.data.fieldStatusMap.allowBack;
                        // 退文参数赋值
                        this.getBackHistory.processInstId = res.data.processInstId;

                        //退文确定
                        this.backSureTuiWen.multiTenancyId = res.data.multiTenancyId;

                        this.backSureTuiWen.tplNo = res.data.tplNo;
                        this.backSureTuiWen.pcsAvyId = res.data.pcsAvyId;
                        this.backSureTuiWen.processInstId = res.data.processInstId;
                        this.backSureTuiWen.curNodeCode = res.data.curNodeCode;
                        this.backSureTuiWen.curUserId = res.data.currentUserId;
                        this.backSureTuiWen.curUserName = res.data.currentUser;

                        this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
                        this.banjiedispatch.tplNo = res.data.tplNo;
                        this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
                        this.banjiedispatch.processInstId = res.data.processInstId;
                        this.banjiedispatch.curNodeCode = res.data.curNodeCode;
                        this.bank_selectConfig.curNodeId = res.data.curNodeCode;
                        this.bank_selectConfig.curTplNo = res.data.tplNo;
                        this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;

                        this.createSighWf.processInstId = res.data.processInstId;
                        this.createSighWf.id = this.bank_dispach.id;
                        this.createSighWf.multiTenancyId = res.data.multiTenancyId;
                        this.createSighWf.pcsAvyId = res.data.pcsAvyId;
                        this.createSighWf.tplNo = res.data.tplNo;
                        this.createSighWf.curNodeCode = res.data.curNodeCode;
                        this.createSighWf.sequenceSign = this.saveOrUpdateToQianbaoEntity.sequenceSign = this.setradio =
                            res.data.sequenceSign || "0";

                        // if (
                        //   this.fromdata.curNodeName === "综合处理" &&
                        //   this.fromdata.signDepartmentName &&
                        //   this.fromdata.signState === "1"
                        // ) {
                        //   this.sendXbSuccess = true;
                        // }else{
                        //   this.sendXbSuccess = false;
                        // }

                        if (res.data.secretType) {
                            this.mimiShow=true
                            this.secretTypechange(res.data.secretType, true);
                        }

                        if (res.data.secretLimitType) {
                            this.workSecurityTab(res.data.secretLimitType, true);
                        }
                        if(this.fromdata.knowScore || this.fromdata.secretGists){
                            this.mimiShow =true
                        }


                        if (this.fromdata.handleTypeName == "1") {
                            this.fromdata.handleTypeName = "1";
                        } else if (this.fromdata.handleTypeName == "0") {
                            this.fromdata.handleTypeName = "0";
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

                        if (this.readFlag != 1) {
                            this.$post
                                .postData(
                                    "doUpdateReadRecord",
                                    JSON.stringify({
                                        function: "doUpdateReadRecord",
                                        pcsAvyId: res.data.pcsAvyId,
                                        processInstId: res.data.processInstId,
                                        multiTenancyId: res.data.multiTenancyId
                                    }),
                                    this.$businessCode.ggywgn
                                )
                                .then(res => {
                                    window.opener.location.reload();
                                    //更新状态用。暂时不用任何操作
                                });
                        }


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
                            if (
                                this.fromdata.signState === "0" &&
                                this.fromdata.curNodeName === "综合处理" &&
                                this.fromdata.signDepartmentName
                            ) {
                                this.showHQ = true;
                            } else {
                                this.showHQ = false;
                            }
                            if (this.fromdata.signState === "0") {
                                this.sendXbSuccess = false;
                            } else {
                                this.sendXbSuccess = true;
                            }
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
                //   : sessionStorage.getItem("sfkhSignpageid") || "";
                this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");
                let parseList = JSON.parse(JSON.stringify(this.fromdata));
                delete parseList.approvalOpinionList;
                delete parseList.checkOpinionList;
                delete parseList.draftDepartmentOpinionList;
                delete parseList.signOpinionList;
                delete parseList.remarkList;
                delete parseList.handleSituationList;
                var obj = Object.assign(this.saveOrUpdateToQianbaoEntity, parseList);
                await this.$post
                    .postData(
                        "saveOrUpdateToQianbaoEntity",
                        JSON.stringify(obj),
                        this.$businessCode.qbgl
                    )
                    .then(res => {
                        if (res && res.success) {
                            // this.saveOrUpdateToQianbaoEntity.id = this.bank_dispach.id =
                            //   res.data.id;
                            // this.bank_toQianbaoSend.id = res.data.id;
                            // sessionStorage.setItem("sfkhSignpageid", res.data.id);
                            this.saveOrUpdateToQianbaoEntity.id = this.bank_dispach.id = this.bank_toQianbaoSend.id = getFormId(
                                this.$route.query.id,
                                "sfkhSignpageid",
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
                            // 退文参数赋值
                            this.getBackHistory.processInstId = res.data.processInstId;

                            this.backSureTuiWen.tplNo = res.data.tplNo;
                            this.backSureTuiWen.pcsAvyId = res.data.pcsAvyId;
                            this.backSureTuiWen.processInstId = res.data.processInstId;
                            this.backSureTuiWen.curNodeCode = res.data.curNodeCode;
                            this.backSureTuiWen.curUserId = res.data.currentUserId;
                            this.backSureTuiWen.curUserName = res.data.currentUser;

                            this.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
                            this.banjiedispatch.tplNo = res.data.tplNo;
                            this.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
                            this.banjiedispatch.processInstId = res.data.processInstId;
                            this.banjiedispatch.curNodeCode = res.data.curNodeCode;

                            this.bank_selectConfig.curNodeId = res.data.curNodeCode;
                            this.bank_selectConfig.curTplNo = res.data.tplNo;
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
                            this.getToQianbaoEntityById();
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
                                location.href =
                                    (this.$post.getEnvState()?location.origin:"http://localhost:8080")+"/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName;
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
                this.$intent.closeWindowImpo(this)
            },

            // 删除此文
            delectArticle() {
                // if (!sessionStorage.getItem("sfkhSignpageid")) {
                //   this.bank_dispach.id = this.$route.query.id;
                // } else {
                //   this.bank_dispach.id = sessionStorage.getItem("sfkhSignpageid") || "";
                // }
                //  this.bank_dispach.id =  getFormId(this.$route.query.id, 'sfkhSignpageid',res.data.id);
                this.bank_dispach.id = getFormId(this.$route.query.id, "sfkhSignpageid");
                // this.bank_dispach.id = sessionStorage.getItem("sfkhSignpageid") || "";
                let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
                this.deleteToQianbaoEntityById.id = deletesendorderid;
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
            collect() {
                this.$message({
                    type: "success",
                    offset: 400,
                    showClose: true,
                    message: "保存成功!"
                });
            },
            // //查看流程
            // flowScheme() {
            //   this.timeShow = true;
            //   this.bank_cklc.processInstId = this.fromdata.processInstId;
            //   this.$post
            //     .postData(
            //       "getWorkflowHistory",
            //       JSON.stringify(this.bank_cklc),
            //       this.$businessCode.qbgl
            //     )
            //     .then(res => {
            //       if (res) {
            //         this.tableData = res.data;
            //         this.$nextTick(() => {
            //           this.$refs.dialogLine.openDialog();
            //         });
            //       }
            //     });
            // },
            //查看流程
            flowScheme() {
                this.timeShow = true;
                this.bank_cklc.processInstId = this.fromdata.processInstId;
                this.$post
                    .postData(
                        "getHistoryActInfo",
                        JSON.stringify(this.bank_cklc),
                        this.$businessCode.ggywgn
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
                    path: "/qbdzCldFkhPrint",
                    query: {
                        id: this.bank_dispach.id
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

            //数据更新
            inputChange(e) {
                this.$forceUpdate();
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

                this.createSighWf.avyds = "发送会签部门:" + this.createSighWf.deptNames;
                var obj = Object.assign(this.createSighWf, parseList);

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
            //收回t催办
            takeBackSign(type) {
                this.shdialog = true;
                this.typeofHQBM = type;
                if (type == "shouhui") {
                    this.dialoghuiqianTit = "选择需要收回的会签部门";
                } else {
                    this.dialoghuiqianTit = "选择需要催办的会签部门";
                }
                const parms = {
                    function: "getSubWfInfo",
                    processInstId: this.fromdata.processInstId,
                    multiTenancyId: this.fromdata.multiTenancyId
                };
                this.$post
                    .postData("getSubWfInfo", JSON.stringify(parms), this.ggywgn)
                    .then(res => {
                        if (res && res.success) {
                            this.shData = res.data;
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
                if (this.typeofHQBM === "shouhui") {
                    let shform = {
                        function: "takeBackSignHelp",
                        pcsAvyId: this.fromdata.pcsAvyId,
                        multiTenancyId: this.fromdata.multiTenancyId,
                        takeBackDeptNames: checkboxdata,
                        subProcessInstId: dqdata,
                        id: this.bank_dispach.id
                    };
                    this.$post
                        .postData("takeBackSignHelp", JSON.stringify(shform), this.ggywgn)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: "success",
                                    showClose: true,
                                    offset: 400,
                                    message: "收回成功",
                                    duration: 1000
                                });
                                // this.getToQianbaoEntityById();
                                // if (!this.fromdata.signDepartmentName) {
                                //   this.sendXbSuccess = false;
                                //   this.showHQ = false;
                                // }
                                this.$forceUpdate();
                            }
                        })
                        .catch(erro => {
                            this.$message({
                                type: "error",
                                offset: 400,
                                showClose: true,
                                message: "收回失败",
                                duration: 1000
                            });
                        });
                    this.shdialog = false;
                    this.getToQianbaoEntityById();
                } else if (this.typeofHQBM == "cuiban") {
                    let parms = {
                        function: "urgeHandle",
                        subProcessInstId: dqdata,
                        multiTenancyId: this.fromdata.multiTenancyId
                    };
                    this.$post
                        .postData("urgeHandle", JSON.stringify(parms), this.ggywgn)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: "success",
                                    showClose: true,
                                    offset: 400,
                                    message: "催办成功",
                                    duration: 1000
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
                            this.shdialog = false;
                        });
                }
            },
            checkouthuiqian(item) {
                this.checkeddq = [];
                let transItem = this.shData.filter(item => {
                    let num = this.checkedsh.indexOf(item.deptName) > -1;
                    if (num) {
                        this.checkeddq.push(item.processInstId);
                    }
                    return num;
                });
            },

            // 签报依据
            handleImport() {
                this.bankImport=[];
                this.documentCode='〔〕';
                this.showImport = true;
            },
            handleImportSure() {
                let that = this;
                let obj = {
                    function: "importBasis",
                    multiTenancyId: this.bankImport,
                    documentCode: this.documentCode
                }

                that.$post.postData(
                    "importBasis",
                    JSON.stringify(obj),
                    that.$businessCode.ggywgn
                ).then((res) => {
                    if(res&&res.data&&res.success) {


                        this.importDataArr.push(res.data)
                        that.fromdata.sendBasis = this.importDataArr
                        that.showImportData = true
                        that.preserve()
                        // that.$forceUpdate()
                    } else {
                        this.$message({
                            type: "error",
                            message: res.message,
                            showClose: true,
                            duration: 1500
                        })
                    }
                    that.showImport = false
                })
            },
            handleCheckImport(data) {
                console.log(data);
                if (data.orderType && data.orderType !== "") {
                    if (data.orderType == "非跨行") {
                        this.handleOpenPage("/signquoteOverFkhDispatch", data.id);
                    } else if (data.orderType == "跨行请示") {
                        this.handleOpenPage("/signquoteOverKhQshDispatch", data.id);
                    }else if (data.orderType == "跨行审批") {
                        this.handleOpenPage("/signquoteOverKhSphDispatch", data.id);
                    }else if (data.orderType == "实物") {
                        this.handleOpenPage("/signquoteOverEntityDispatch", data.id);
                    }
                } else {
                    this.bank_import = data
                    this.showImportList = true;
                }
            },
            handleOpenPage(path, id, readType) {
                const routeData = this.$router.resolve({
                    path: path,
                    query: {
                        id: id,
                        readFlag: readType
                    }
                });
                window.open(routeData.href, "_blank");
            },
            handleDeleteImport(data) {
                this.fromdata.sendBasis.forEach(item => {
                    if (item.id == data.id) {
                        this.fromdata.sendBasis.splice(item, 1);
                    }
                });
                this.preserve()
                // this.$forceUpdate();
            },


        },
        created() {
            // if (!this.$route.query.signState) {
            //   this.signState = false;
            // }
            // //判断 待办  已办  办结
            // if (this.$route.query.signState === "1") {
            //   this.signState = false;
            //   // this.getTcQbsignParamDicInfo();
            // }
            // if (
            //   this.$route.query.signState === "2" ||
            //   this.$route.query.signState === "3"
            // ) {
            //   this.signState = true;
            // }
            //初始化加载数据
            this.bank_dispach.id = this.uploadConfig.id = this.bank_toQianbaoSend.id = getFormId(
                this.$route.query.id,
                "sfkhSignpageid"
            );
            this.readFlag = this.$route.query.readFlag
                ? this.$route.query.readFlag
                : "";
            //初始化修改交易线 (传后台)
            this.uploadConfig.code = this.$businessCode.qbglfj;
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
    /deep/ .el-radio__label {
      display: none;
    }
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
          height: 40px;
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

  /deep/ .dialogImport {
    .el-dialog {
      width: 30% !important;
    }
  }
</style>


