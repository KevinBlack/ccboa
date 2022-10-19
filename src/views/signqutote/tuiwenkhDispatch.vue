<template>

<!-- 部门核稿
跨行的下级发给上级 上级退的
非跨行有查看流程
跨行无查看流程
 -->

  <!-- 中国建设银行电子签报退文单 -->
  <div id="signquteKhTui" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>签报处理单 -->
        </p>
<!--【关闭】【查看正文】【退回说明】【查看流程】【打印处理单】【操作指南】 -->
        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="drafting('0')">查看正文</el-button>
          <!-- <el-button size="small" plain @click="shoucang">收藏</el-button> -->
          <el-button size="small" plain @click="tuiHXgYyHandel">退回说明</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet">打印退文单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>


         <!-- 退回说明 -->
    <el-dialog v-dialogDrag  title="退回说明" :visible.sync="thShuoMingFlag" width="60%" class="xiugaicb">
      <!-- <p class="xuanzTh">选择退回环节</p> -->
      <el-scrollbar>
        <m-table
          size="medium"
          :isSelection="false"
          :isPagination="false"
          :isHandle="false"
          :tableData="tableDataThShuoM"
          :tableCols="tableColsThShuoM"
          v-loading="tableLoading"
          class="table_TH"
        ></m-table>
      </el-scrollbar>
      
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="thShuoMingFlag = false">关 闭</el-button>
      </span>
    </el-dialog>
    



    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{directTitle}}电子签报退文单</h3>
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
          <!-- <div class="bank_dispach_annotation">
            <p class="bank_dispach_annotation_current" style="width:15%;">
              当前环节：
              <span>{{fromdata.currentNode}}</span>
            </p>
            <p class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{fromdata.currentUser}}</span>
            </p>
          </div> -->
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
                    <el-input v-model="fromdata.submittedName" placeholder="请输入呈送" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="处理类型" prop="handleTypeName" ref="handleTypeName">
                    <el-input v-model="fromdata.handleTypeName" placeholder="请输入处理类型" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="紧急程度">
                    <el-input v-model="fromdata.emergencyLevelName" placeholder="请输入紧急程度" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="签报类型" prop="qianBaoTypeName" ref="qianBaoTypeName">
                    <el-input v-model="fromdata.qianBaoTypeName" placeholder="请输入签报类型" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="签报字号" prop="qianbaoCode" ref="qianbaoCode">
                    <el-input v-model="fromdata.qianbaoCode" placeholder="请输入签报字号" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
                    <el-input v-model="fromdata.draftTime" placeholder="请输入拟稿日期" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿部门" prop="draftDepartmentName" ref="draftDepartmentName">
                    <el-input v-model="fromdata.draftDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="联系人" prop="draftUserName" ref="draftUserName">
                    <el-input v-model="fromdata.draftUserName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input v-model="fromdata.phone"  disabled @input.native="phoneChange"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                 <!-- mimi -->
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      @change="secretTypechange"
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
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
                  <el-form-item label="秘密标志" :span="8" prop="workSecretFlag" ref="workSecretFlag">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.workSecretFlag"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="workSecurityitem in SworkSecurity"
                        :key="workSecurityitem.label"
                        :label="workSecurityitem.label"
                        :value="workSecurityitem.label"
                      ></el-option> -->
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
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagitem in secretOptionsFlag"
                        :key="secretFlagitem.label"
                        :label="secretFlagitem.label"
                        :value="secretFlagitem.label"
                      ></el-option> -->
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
                      <el-option value label="请选择"></el-option>
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
                <el-col :span="8" v-if="flag && securityFlag" style="display:flex;align-items:center;">
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
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                    <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                    <!-- <i class="el-icon-star-on pad_10" v-show="nationSecurFlag"></i> -->
                  <el-form-item label prop="secretLimitName"
                      ref="secretLimitName" label-width="0px" style="width: 20%;">
                    <el-input
                      @input="workSecurityTabTime('secretLimitName')"
                      v-model="fromdata.secretLimitName"
                      disabled
                        
                    ></el-input>
                  </el-form-item>
                  <el-form-item label prop="secretTimeType"
                      ref="secretTimeType" label-width="0px" style="width: 20%;">
                    <el-select
                      name="secretTimeType"
                      v-model="fromdata.secretTimeType"
                      @change="workSecurityTabTime"
                      placeholder="请选择"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
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
                <el-col :span="8" v-if="flag && businessSecretFlag" style="display:flex;align-items:center;">
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="security"
                    ref="security"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                    <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px" ></i>
                    <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                    <el-form-item label prop="secretLimit"
                      ref="secretLimit" label-width="0px">
                    <el-date-picker
                      type="date"
                      @blur="workSecurityTabTime"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="fromdata.secretLimit"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- 选择解密条件 -->
                <el-col :span="8"  v-if="flag && securitytiaojFlag" style="display:flex;align-items:center;">
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="security"
                    ref="security"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.security"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
                      <!-- <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option> -->
                    </el-select>
                  </el-form-item>
                    <i class="el-icon-star-off pad_10" style="height: 32px;line-height:16px"></i>
                    <!-- <i class="el-icon-star-on pad_10" v-if="nationSecurFlag"></i> -->
                  <el-form-item  label prop="secretTimeType"
                      ref="secretTimeType" label-width="0px">
                    <el-select
                      name="secretTimeType"
                      @change="workSecurityTabTime"
                      v-model="fromdata.secretTimeType"
                      placeholder="请选择"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option value label="请选择"></el-option>
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
              <!-- <el-row>
                <el-col :span="8">
                  <el-form-item label="退文机构" prop="createDeptName" ref="createDeptName">
                    <el-input v-model="fromdata.createDeptName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="退文人" prop="createUserName" ref="createUserName">
                    <el-input v-model="fromdata.createUserName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="退文时间" prop="backTime" ref="backTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="fromdata.backTime"
                      style="width:100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="退文原因">
                    <el-input type="textarea" resize="none" autosize  v-model="fromdata.backExplain" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->

              <el-col v-show="fromdata.secretType">
                  <el-form-item label="知悉范围">
                    <el-input
                      type="textarea"
                      v-model="fromdata.knowScore"
                      maxlength="500"
                      resize="none"
                      autosize
                      placeholder="填写知悉范围可输入500字"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="fromdata.secretType">
                  <el-form-item label="定密依据">
                    <div>
                      <el-input
                        type="textarea"
                        v-model="fromdata.secretGists"
                        placeholder="填写定密依据可输入500字"
                        maxlength="500"
                        resize="none"
                        autosize
                        disabled
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>


              <el-row>
                <el-col>
                  <el-form-item label="签报依据" v-show="!fromdata.sendBasis">
                    <el-input type="text" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="签报依据" v-if="showImportData">
                    <div class="border_yiju">
                      <el-row v-for="(item) in fromdata.sendBasis" :key="item.documentCode">
                        <el-col :span="20" class="btn_openImport">
                         <el-button
                                type="text"
                                @click="handleCheckImport(item)"
                                :class="(item.id=='')?'colorBlack':'colorLink'"
                              >{{item.documentCode}}</el-button>
                        </el-col>
                        <!-- <el-col :span="4" class="btn_delImport">
                          <el-button type="text" @click="handleDeleteImport(item)">删除</el-button>
                        </el-col> -->
                      </el-row>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-show="khState == '1'">
                  <el-form-item label="会签部门">
                    <el-input v-model="fromdata.signDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-show="khState == '1'">
                  <el-form-item >
                    <el-input v-model="fromdata.finishSignDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-show="khState == '2'">
                  <el-form-item label="协办部门">
                    <el-input v-model="fromdata.signDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-show="khState == '2'">
                  <el-form-item >
                    <el-input v-model="fromdata.finishSignDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>
                
                <el-col>
                  <el-form-item label="附件名称">
                    <el-input autosize resize="none" type="textarea" v-model="fromdata.attachTitle" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="传阅人" prop="circulatePersonNames" ref="circulatePersonNames">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        v-model="fromdata.circulatePersonNames"
                        maxlength="500"
                        resize="none"
                        autosize
                        disabled
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <el-row class="pr45">
              <el-col v-show="khState == '1'">
                <el-form-item label="上级单位批示意见">
                  <!-- <div v-for="item in fromdata.agreementOpinionList" :key="item.id">
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
                  </div> -->
                  <el-input type="textarea" resize="none" autosize   v-model="fromdata.agreementOpinion"  disabled v-if="!(fromdata.agreementOpinionList && fromdata.agreementOpinionList.length)"></el-input>
                  <opinionText 
                    :opinionText="fromdata.agreementOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col v-show="khState == '1'">
                <el-form-item label="上级单位办理情况">
                  <!-- <div v-for="item in fromdata.agreementHandleSituationList" :key="item.id">
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
                  </div> -->
                  <el-input type="textarea" resize="none" autosize  v-model="fromdata.agreementHandleSituation"  disabled v-if="!(fromdata.agreementHandleSituationList && fromdata.agreementHandleSituationList.length)"></el-input>
                  <opinionText 
                    :opinionText="fromdata.agreementHandleSituationList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                  <!-- 上级行办理附件 -->
                  <el-col>
                    <div>
                      <el-row>
                        <el-col>
                          <div
                            class="file_list_box tree_zhuban"
                            v-if="fromdata.upAttchmentFileInfo&&fromdata.upAttchmentFileInfo.length"
                          style="height:auto;"
                          >
                            <el-scrollbar  style="padding: 0px 15px 0 0;">
                              <div
                                v-for="(items, index) in fromdata.upAttchmentFileInfo"
                                :key="items.id"
                                class="comp_list"
                              >
                                <template>
                                  <div class="command_file">
                                    <span class="order">{{index+1}}.</span>
                                    <span
                                      class="down"
                                       @click="viewDraftFile(items.fileName,items.filePath ,$businessCode.qbglfj)"
                                    >{{items.fileName}}</span>
                                    <span class="name" :title="items.createrName">{{items.createrName}}</span>
                                    <span class="time">{{items.createTime}}</span>
                                    <div class="btns">
                                    <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="downFile(items)"
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
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col  v-show="khState == '1'">
                <el-form-item label="请示单位意见">
                  <!-- <div v-for="item in fromdata.consultOpinionList" :key="item.id">
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
                  </div> -->
                  <el-input type="textarea" resize="none" autosize  v-model="fromdata.consultOpinion" disabled v-if="!(fromdata.consultOpinionList && fromdata.consultOpinionList.length)"></el-input>
                  <opinionText 
                    :opinionText="fromdata.consultOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col  v-show="khState == '1'">
                <el-form-item label="核稿意见">
                  <!-- <div v-for="item in fromdata.hegaoOpinionList" :key="item.id">
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
                  </div> -->
                  <el-input type="textarea" resize="none" autosize  v-model="fromdata.hegaoOpinion"  disabled v-if="!(fromdata.hegaoOpinionList && fromdata.hegaoOpinionList.length)"></el-input>
                  <opinionText 
                    :opinionText="fromdata.hegaoOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col  v-show="khState == '1'">
                <el-form-item label="会签意见">
                  <!-- <div v-for="item in fromdata.signOpinionList" :key="item.id">
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
                  </div> -->
                  <el-input type="textarea" resize="none" autosize  v-model="fromdata.signOpinion"  disabled v-if="!(fromdata.signOpinionList && fromdata.signOpinionList.length)"></el-input>
                  <opinionText 
                    :opinionText="fromdata.signOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col v-show="khState == '1'">
                <el-form-item label="拟稿部门意见">
                  <!-- <div v-for="item in fromdata.draftDepartmentOpinionList" :key="item.id">
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
                  </div> -->
                  <el-input type="textarea" resize="none" autosize   v-model="fromdata.draftDepartmentOpinion" disabled v-if="!(fromdata.draftDepartmentOpinionList && fromdata.draftDepartmentOpinionList.length)"></el-input>
                  <opinionText 
                    :opinionText="fromdata.draftDepartmentOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col v-show="khState == '1'">
                <el-form-item label="办理情况">
                  <!-- <div v-for="item in fromdata.handleSituationList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-model="fromdata.handleSituation"
                    disabled
                    v-if="!(fromdata.handleSituationList && fromdata.handleSituationList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.handleSituationList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>



              <el-col  v-show="khState == '2'">
                <el-form-item label="签批意见">
                  <!-- <div v-for="item in fromdata.agreementOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime&&item.userId!=nowUserId}]"
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-model="fromdata.agreementOpinion"
                    disabled
                    v-if="!(fromdata.agreementOpinionList && fromdata.agreementOpinionList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.agreementOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col   v-show="khState == '2'">
                <el-form-item label="办理情况">
                  <!-- <div v-for="item in fromdata.agreementHandleSituationList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-model="fromdata.handleSituation"
                    disabled
                    v-if="!(fromdata.agreementHandleSituationList && fromdata.agreementHandleSituationList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.agreementHandleSituationList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col  v-show="khState == '2'">
                <el-form-item label="协办意见">
                  <!-- <div v-for="item in fromdata.helpOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                      </el-row>
                    </div>
                  </div> -->
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-model="fromdata.helpOpinion"
                    disabled
                    v-if="!(fromdata.helpOpinionList && fromdata.helpOpinionList.length)"
                  ></el-input>
                  <opinionText 
                    :opinionText="fromdata.helpOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col  v-show="khState == '2'">
                <el-form-item label="请示单位意见">
                  <!-- <div v-for="item in fromdata.consultOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                      </el-row>
                    </div>
                  </div>
                  <div style="display:flex">
                    
                  </div> -->
                  <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      style="flex:1"
                      v-model="fromdata.consultOpinion"
                      disabled
                      v-if="!(fromdata.consultOpinionList && fromdata.consultOpinionList.length)"
                    ></el-input>
                    <opinionText 
                    :opinionText="fromdata.consultOpinionList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col  v-show="khState == '2'">
                <el-form-item label="请示单位附件">
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    style="flex:1"
                    disabled
                    v-if="!(fromdata.consultAttachment&&fromdata.consultAttachment.length)"
                  ></el-input>

                  <div>
                    <el-row>
                      <el-col>
                        <div
                          class="file_list_box tree_zhuban"
                          v-if="fromdata.consultAttachment&&fromdata.consultAttachment.length"
                        style="margin: 20px 0 0 0px;"
                        >
                          <el-scrollbar style="padding: 0px 15px 0 0;">
                            <div
                              v-for="(items, index) in fromdata.consultAttachment"
                              :key="items.id"
                              class="comp_list"
                            >
                              <template>
                                <div class="command_file">
                                  <!-- 预览 -->
                                  <span class="order">{{index+1}}.</span>
                                  <span
                                    class="down"
                                    :title="items.fileName"
                                     @click="viewDraftFile(items.fileName,items.filePath ,$businessCode.qbglfj)"
                                  >{{items.fileName}}</span>
                                  <span class="name" :title="items.createrName">{{items.createrName}}</span>
                                  <span class="time">{{items.createTime}}</span>
                                  <div class="btns">
                                    <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="downFile(items)"
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
                </el-form-item>
              </el-col>


              <el-col>
                <el-form-item label="传阅意见">
                  <!-- <div v-for="item in fromdata.circulationList" :key="item.id">
                    <div class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="24"
                          :class="['pos_r',{'disable_w':item.createTime !=fromdata.opinionMaxTime||item.userId!=nowUserId}]"
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
                      </el-row>
                    </div>
                  </div> -->
                  
                  <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      style="flex:1"
                      v-model="fromdata.circulation"
                      disabled
                      v-if="!(fromdata.circulationList && fromdata.circulationList.length)"
                    ></el-input>
                    <opinionText 
                    :opinionText="fromdata.circulationList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="备    注">
                  <!-- <div v-for="(item) in fromdata.remarkList" :key="item.id">
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
                  </div> -->
                  <el-input type="textarea" resize="none" autosize    v-model="fromdata.remark" disabled v-if="!(fromdata.remarkList && fromdata.remarkList.length)"></el-input>
                  <opinionText 
                    :opinionText="fromdata.remarkList" 
                    :sendOpinionMaxTime="fromdata.opinionMaxTime"
                    :nowUserId="nowUserId"
                    @deletService="deletService"
                    :curNodeCode="fromdata.curNodeCode"
                    :canDelet="false"
                    :isRemarks="true"
                  ></opinionText>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="正文字数">
                  <el-input v-model="fromdata.sizeFact" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col   v-show="khState == '2'">
                <el-form-item label="是否将附件反馈给请示单位" label-width="200" disabled>
                  <el-radio v-model="fromdata.isReturnAttachment" label="1">是</el-radio>
                  <el-radio v-model="fromdata.isReturnAttachment" label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <uploadFiles
                  ref="uploadComponent"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
                ></uploadFiles>
                <el-col>
                  <div
                    class="file_list_box"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar style="padding: 0px 15px 0 0;">
                      <div
                        v-for="(item, index) in fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <!-- 预览 -->
                            <span class="order">{{index+1}}.</span>
                            <span class="down" :title="item.fileName"  @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.qbglfj)">{{item.fileName}}</span>
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
                              >下移</el-button> -->
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
      :sequenceFlag='sequenceFlag'
       :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <!-- <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls> -->
  <!--签报依据-->
    <el-dialog v-dialogDrag  title="增加签报依据" class="dialogImport" :visible.sync="showImport">
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
    <el-dialog v-dialogDrag  title="查看依据文件" :visible.sync="showImportList">
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
                <el-button type="text"  @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.qbglfj)">{{item.sort+'. '+item.fileName}}</el-button>
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
import uploadFiles from "@/components/uploadFile/uploadFile";
import timeDialog from "../../components/timedialog/timedialog";
import treeCofig from "../../components/tree/tree-fawen";
import appendWriteList from "../../components/appendWriteList/appendWriteList";
import exportTable from "@/minixs/exportTable"; // 收藏
import http from "@/http/http";
import mTable from "@/components/table/mTable.vue";

import minixs from "@/minixs/index";
import opinionText from "@/components/opinionText/index";
import viewDraft from "@/minixs/viewDraft";


const ThShuoMfinshData = [
  {
    label: "执行环节",
    prop: "zhixinghuanjie",
    align: "center", 
    width:"150px",
    formatter: (row, column) => {
      return row.curNodeName + "(" + row.createUserName + ")";
    }
  },
  {
    label: "退回环节",
    prop: "tuihuihuanjie",
    align: "center", 
    width:"150px",
    formatter: (row, column) => {
      return row.backNodeName + "(" + row.beBackUser + ")";
    }
  },
  { label: "退回原因", prop: "backExplain", align: "center" },
  { label: "退回时间", prop: "backTime", align: "center", width:"150px" }
];


export default {
  name: "signquteKhTui",
  components: {
    uploadFiles,
    timeDialog,
    treeCofig,
    appendWriteList,
    mTable,
    opinionText
  },
  mixins: [minixs,viewDraft],
  data() {
    return {
      showCloseDialog: false,
      nowUserId: "", //当前用户id
      khState:"1",  //2审批   1请示
      directTitle:"中国建设银行",
      sequenceFlag:false, //会签/协办是否按顺序发送部门置灰
      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },


      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        subTempAddF: true  //是否可以上传附件 true是不能上传   false是可以上传
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

      //删除
      deleteToQianbaoEntityById: {
        function: "deleteToQianbaoEntityById",
        id: ""
      },
      //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: "",
        multiTenancyId:"",
        unitId: ""
      },
      CnmultiTenancyId:"",
      //xiaoM  会签部门
      // bank_mmainXiao: {
      //   function: "selUnitTreeByHQ",
      //   flag: true
      // },
      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
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
      //弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "getToQianbaoBackEntityById",
        id: ""
      },
      //下拉框列表
      // bank_dispachfile: {
      //   function: "getTcQbsignParamDicInfo",
      //   organizationId: ""
      // },
      // bank_redheader: {
      //   function: "getTcDocTypeDicByParam",
      //   organizationId: "root",
      //   sendType: "行发文"
      // },
      //实物保存
      saveOrUpdateToQianbaoHuiqianEntity: {
        function: "saveOrUpdateToQianbaoHuiqianEntity",
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
        function: "saveOrUpdateToQianbaoHuiqianEntity",
        title: "",
        submittedName: "",
        handleTypeName: "",
        emergencyLevel: "",
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
        secretPersonIdea: "", //定密人意见
        handleSituation: "", //办理情况
        checkOpinion: "",
        signOpinion: "",
        draftDepartmentOpinion: "",
        handRoundOpinion: "", //传阅意见
        remark: "",
        sizeFact: "",
        secretFlag: "",
        workSecretFlag: "",
        secretType: "",
        secretFlag: "",
        secretLimitType: "",
        security: "",
        secretLimitName: "",
        currentUser: "",
        currentNode: "",
        secretGists: "",
        knowScore: "",
        processInstId: "", //流程实例标识
        pTplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        finalOpinion: "",
        processOpinion: "",
        backDepartmentName: "",
        operatorName: "",
        backTime: "",
        backExplain: "",
        attachSort: [],
        attchmentFileInfo: [],
        isReturnAttachment: "1",
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      // SemergencyLevel: [],
      // SqbZihaoList: [],
      // SqianbaoType: [],
      // SsecretType: [],
      // SsecretFlag: [],
      // SbusinessSecret: [],
      // SsecretTimeType: [],
      // SworkSecurity: [],
      secretOptionsFlag: [],
       //mimi
      rules: {
        secretGists: [
          {
            required: false,
            trigger: "blur",
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
      // copyRules: {
      //   qianBaoTypeName: [
      //     {
      //       required: true,
      //       trigger: "change",
      //       message: "请选择签报类型"
      //     }
      //   ],
      //   submittedName: [
      //     {
      //       required: true,
      //       trigger: ["blur"],
      //       message: "请输入呈送"
      //     }
      //   ],
      //   qianbaoCode: [
      //     {
      //       required: true,
      //       trigger: ["blur", "change"],
      //       message: "请选择签报字号"
      //     }
      //   ],
      //   handleTypeName: [
      //     {
      //       required: true,
      //       trigger: ["blur", "change"],
      //       message: "请选择处理类型"
      //     }
      //   ],
      //   draftDepartmentName: [
      //     {
      //       required: true,
      //       trigger: ["blur", "change"],
      //       message: "请选择拟稿部门"
      //     }
      //   ],
      //   draftUserName: [
      //     {
      //       required: true,
      //       trigger: ["blur", "change"],
      //       message: "请选择联系人"
      //     }
      //   ],
      //   secretType: [
      //     {
      //       required: true,
      //       trigger: ["blur", "change"],
      //       message: "请选择秘密类型"
      //     }
      //   ],
      //   workSecretFlag: [
      //     { required: false, trigger: "blur", message: "请选择秘密标志" }
      //   ],
      //   secretFlag: [
      //     { required: false, trigger: "blur", message: "请选择秘密标志" }
      //   ],
      //   secretLimitType: [
      //     {
      //       required: false,
      //       trigger: ["blur", "change"],
      //       message: "请选择秘密期限类型"
      //     }
      //   ],
      //   security: [
      //     {
      //       required: true,
      //       trigger: ["blur", "change"],
      //       message: "请选择密级和保密期限"
      //     }
      //   ],
      //   phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
      //   title: [{ required: true, trigger: "blur", message: "请输入正文标题" }]
      // },
      // SSsecretLimitType: [],
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
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id,
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
      bank_import: {},


      //退回说明
      thShuoMingFlag:false,// 弹窗
      tableDataThShuoM: [],
      tableColsThShuoM: ThShuoMfinshData,
      selectBackInfoById:{
        function:"selectBackInfoById",
        id:""
      },

      tableLoading: false,
      treeTradeCode:'' //完成并发送  树  拆
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

         //电话操作
    phoneChange(){
      this.fromdata.phone=this.fromdata.phone.replace(/[^\-\,\d\*\ ]/g,'');
      this.$forceUpdate();
    },
     //退回说明
    tuiHXgYyHandel(){
      this.thShuoMingFlag = true;
      this.selectBackInfoById.id = this.fromdata.id;
      this.$post
        .postData(
          "selectBackInfoById",
          JSON.stringify(this.selectBackInfoById),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableDataThShuoM = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //删除意见(固化意见)
    // deletService(id) {
    //   this.bank_deletToSendOrder.id = id;
    //   this.$post
    //     .postData(
    //       "deleteOpinionById",
    //       JSON.stringify(this.bank_deletToSendOrder),
    //       this.fwTranId
    //     )
    //     .then(res => {
    //       if (res && res.success) {
            // this.receiveselectlist();
                // this.getToQianbaoBackEntityById();
    //       } else {
    //         this.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "后端返回失败",
    //           duration: 1000
    //         });
    //       }
    //     })
    //     .catch(erro => {
    //       this.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "删除失败",
    //         duration: 1000
    //       });
    //     });
    // },
    // receiveselectlist() {
    //   this.bank_toQianbaoSend.id = this.bank_dispach.id
        // ? this.bank_dispach.id
        // : sessionStorage.getItem("sTwKhSignpageid") || "";
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
    //         if (res.data.undertakeDeptId) {
    //           this.chenCheckData = this.concatTreeData(
    //             res.data.undertakeDeptId,
    //             res.data.undertakeDeptName,
    //             "dosend"
    //           );
    //         }
    //         if (res.data.assistDeptId) {
    //           this.xieCheckData = this.concatTreeData(
    //             res.data.assistDeptId,
    //             res.data.assistDeptName
    //           );
    //         }
    //         //临时意见处理
    //         this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
    //         this.cuteData("remarks", "remarkList", "remarkId");
    //         this.cuteData(
    //           "handleTerminateOpinion",
    //           "handleTerminateOpinionList",
    //           "handleTerminateOpinionId"
    //         );
    //         this.cuteData(
    //           "officeOpinion",
    //           "officeOpinionList",
    //           "officeOpinionId"
    //         );
    //       }
    //     });
    // },

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
    //数据更新
    inputChange() {
      this.$forceUpdate();
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
          names = names.join(",");
          ids = ids.join(",");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "huiqian":
            this.fromdata.signDepartmentName = names;
            this.fromdata.signDepartmentIds = ids;
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
          text: names[n]
        });
      });
      return obj;
    },

    //定密依据接收子组件传值
    // savesecretBaslsvalue(data) {
    //   this.fromdata.secretGists = data;
    //   this.$forceUpdate();
    // },
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
        : sessionStorage.getItem("sTwKhSignpageid") || "";

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
       setTimeout(() => {
      this.$post
        .postData(
          "getNextNodeInfo",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.seletOptionsData = res.data || [];
          this.bank_send.tplNo = res.data && res.data[0].PCSAVYID;
          this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
          this.bank_send.curTplNo = res.data && res.data[0].PTPLNO;
          this.bank_send.curMultiTenancyId =
            res.data && res.data[0].MULTITENANCYID;
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
              this.$businessCode.qbgl
            )
            .then(res => {
              this.treeData = res.data;
            })
            .catch(e => {
              console.log(e);
            });
        });
         }, 1000);
    },

       //表单校验滚动  mimi
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
      if (value == "secretLimitName") {
        var limt = this.fromdata.secretTimeType == "年" ? 99  : this.fromdata.secretTimeType == "月" ? 11 : this.fromdata.secretTimeType == "日" ? 29 : "";
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
      }
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    workSecurityTab(value, type) {
      this.$forceUpdate();
      if (value == "保密期限") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = true;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
        this.securityFlag = true;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      } else if (value == "解密时间") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = false;
        // 选择解密时间
        this.rules.secretLimit[0].required = true;
        this.securityFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = true;
        // 密级和保密期限  解密条件  显示隐藏
        this.securitytiaojFlag = false;
      } else if (value == "解密条件") {
        //选择保密期限
        this.rules.security[0].required = true;
        this.rules.secretLimitName[0].required = false;
        this.rules.secretTimeType[0].required = true;
        // 选择解密时间
        this.rules.secretLimit[0].required = false;
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

      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    secretTypechange(value, type) {
      //type 回显处理
      if (value == "商业秘密") {
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
      }

      console.log(this.rules.secretGists[0]);
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
      //         return;
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
      //         return;
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
      //         return;
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
      //       return;
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
      //   return;
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
      //   return;
      // }

      // return true;

      // if (
      //   !this.fromdata.title ||
      //   !this.fromdata.submittedName ||
      //   !this.fromdata.handleTypeName ||
      //   !this.fromdata.qianBaoTypeName ||
      //   !this.fromdata.qianbaoCode ||
      //   !this.fromdata.draftDepartmentName ||
      //   !this.fromdata.draftUserName ||
      //   !this.fromdata.phone ||
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
       // 收藏
    shoucang() {
      let that = this;
      let shiwutitle = this.fromdata.qianbaoCode; //字号
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
        "signquteKhTui",
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
                    flowTranId: this.$businessCode.qbgl //流程交易线     chai
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
    // // 操作指南
    // instructions() {
    //   this.$post
    //     .postData(
    //       "getAttchment",
    //       JSON.stringify({
    //         function: "getAttchment",
    //         moduleCode: "QBGL"
    //       }),
    //       this.$businessCode.fwbz
    //     )
    //     .then(res => {
    //       if (res && res.success) {
    //         this.getInstFileInfo(this,res.data).then(resF => {
    //           if (resF.state) {
    //             let data = this.$router.resolve({
    //               path: "/openAndSave_Word",
    //               query: {
    //                 state: "viewFile",
    //                 id: this.fromdata.id,
    //                 zhengWenState: 0,
    //                 JYcode: this.$businessCode.fwbzfj,
    //                 multiTenancyId: this.fromdata.multiTenancyId,
    //                 relativePath: resF ? resF.filePath : "",
    //                 fileName: resF ? resF.fileName : "", 
    //                 showBtns: false,
    //                 flowTranId:this.$businessCode.qbgl,    //流程交易线     chai
    //               }
    //             });
    //             window.open(data.href, "_blank");
    //           }
    //         });
    //       } else {
    //         this.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件不存在",
    //           duration: 1500
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件不存在",
    //         duration: 1500
    //       });
    //     });
    // },

    // //获取操作指南文件路径
    // async getInstFileInfo(self, flagFile) {
    //   var successInfo = { state: false };
    //   self.bank_doDownloadFile.fileName = flagFile.fileName;
    //   self.bank_doDownloadFile.filePath = flagFile.filePath;
    //   await self.$post
    //     .postData(
    //       "doDownloadFile",
    //       JSON.stringify(self.bank_doDownloadFile),
    //       self.$businessCode.fwbzfj 
    //     )
    //     .then(res => {
    //       if (res && res.success) {
    //         successInfo.filePath = res.filePath;
    //         successInfo.fileName = res.fileName;
    //         successInfo.state = true;
    //       }else{
    //          self.$message({
    //           type: "error",
    //           offset: 400,
    //           showClose: true,
    //           message: "文件获取失败，请重新上传",
    //           duration: 1500
    //         });
    //         successInfo.state = false;
    //       }
    //     })
    //     .catch(erro => {
    //       self.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "文件获取失败，请联系管理员",
    //         duration: 1500
    //       });
    //       successInfo.state = false;
    //     });
    //   return successInfo;
    // },

    // 下拉列表
    // getTcQbsignParamDicInfo() {
    //   this.$post
    //     .postData(
    //       "getTcQbsignParamDicInfo",
    //       JSON.stringify(this.bank_dispachfile),
    //       this.$businessCode.qbgl
    //     )
    //     .then(res => {
    //       console.log("下拉框", res.data);
    //       this.SsecretType =
    //         res.data && res.data.secretType && JSON.parse(res.data.secretType);
    //       this.SsecretFlag = this.secretOptionsFlag =
    //         res.data && res.data.secretFlag && JSON.parse(res.data.secretFlag);
    //       this.SbusinessSecret =
    //         res.data &&
    //         res.data.businessSecret &&
    //         JSON.parse(res.data.businessSecret);
    //       this.SemergencyLevel =
    //         res.data &&
    //         res.data.emergencyLevel &&
    //         JSON.parse(res.data.emergencyLevel);
    //       this.SqianbaoType =
    //         res.data &&
    //         res.data.qianBaoTypeName &&
    //         JSON.parse(res.data.qianBaoTypeName);
    //       this.SworkSecurity =
    //         res.data &&
    //         res.data.workSecurity &&
    //         JSON.parse(res.data.workSecurity);
    //       this.SqbZihaoList =
    //         res.data &&
    //         res.data.qbZihaoList &&
    //         JSON.parse(res.data.qbZihaoList);
    //       if (res.data.mainIds) {
    //         this.zhuCheckData = this.concatTreeData(
    //           res.data.mainIds,
    //           res.data.main
    //         );
    //       }
    //       if (res.data.signDepartmentIds) {
    //         this.huiCheckData = this.concatTreeData(
    //           res.data.signDepartmentIds,
    //           res.data.signDepartmentName
    //         );
    //       }
    //       if (res.data.copyIds) {
    //         this.chaoCheckData = this.concatTreeData(
    //           res.data.copyIds,
    //           res.data.copy
    //         );
    //       }
    //       if (res.data.inlineIds) {
    //         this.benCheckData = this.concatTreeData(
    //           res.data.inlineIds,
    //           res.data.inline
    //         );
    //       }
    //       this.fromdata.qianbaoCode = this.SqbZihaoList[0].label;
    //       this.fromdata.qianBaoTypeName = this.SqianbaoType[0].label;

    //       this.rules = this.copyRules;
    //       this.$nextTick(() => {
    //         this.$refs["fromdata"].clearValidate();
    //       });
    //     });
    // },

    //初始值 //input框内容
    getToQianbaoBackEntityById() {
      if (!sessionStorage.getItem("sTwKhSignpageid")) {
        this.bank_dispach.id = this.$route.query.id;
      } else {
        this.bank_dispach.id = sessionStorage.getItem("sTwKhSignpageid") || "";
      }
      this.bank_dispach.moduleType = this.$route.query.moduleType;
      // let that = this;

      this.$post
        .postData(
          "getToQianbaoBackEntityById",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.fromdata = res.data;
          this.nowUserId = this.fromdata.currentUserId;
          //获取签报处理单主标题
          this.directTitle = res.data && res.data.orgName;
          // if(res.data && res.data.isSpecialHead && res.data.isSpecialHead == "1"){
          //   this.directTitle = this.fromdata.draftDepartmentName;
          // }else{
          //   this.directTitle = res.data && res.data.orgName;
          // }

          this.tuiWenCKLiuCheng = res.data && res.data.workflowHistList &&　res.data.workflowHistList.data;

          // 签报依据
          if (
            res.data.sendBasis &&
            JSON.parse(res.data.sendBasis).length != 0
          ) {
            this.showImportData = true;
          }
           this.fromdata.sendBasis = this.importDataArr =
            res.data && res.data.sendBasis && JSON.parse(res.data.sendBasis);


          this.CnmultiTenancyId = res.data && res.data.multiTenancyId || "";

          if (this.fromdata.secretType == "商业秘密") {
            this.flag = true;
            this.secretTypeFlag = false;
          } else if (this.fromdata.secretType == "内部信息") {
            this.flag = false;
            this.secretTypeFlag = true;
            this.workSecurityFlag = false;
            this.secretOptionsFlag = [].concat(this.SsecretFlag);
          } else if (this.fromdata.secretType == "工作秘密") {
            this.flag = false;
            this.secretTypeFlag = true;
            this.workSecurityFlag = true;
            this.secretOptionsFlag = [].concat(this.SworkSecurity);
          } else {
            this.flag = false;
            this.secretTypeFlag = false;
            this.workSecurityFlag = false;
          }

          if (this.fromdata.secretLimitType == "保密期限") {
            this.securityFlag = true;
            // 密级和保密期限  解密时间  显示隐藏
            this.businessSecretFlag = false;
            // 密级和保密期限  解密条件  显示隐藏
            this.securitytiaojFlag = false;
          } else if (this.fromdata.secretLimitType == "解密时间") {
            this.securityFlag = false;
            // 密级和保密期限  解密时间  显示隐藏
            this.businessSecretFlag = true;
            // 密级和保密期限  解密条件  显示隐藏
            this.securitytiaojFlag = false;
          } else if (this.fromdata.secretLimitType == "解密条件") {
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


         //mimi
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }

          if (res.data.secretLimitType) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }



          // that.fromdata = res.data;
          // console.log("getToQianbaoBackEntityById", res.data);
          // console.log("label", that.fromdata.handleTypeName);
          // if (res.data.secretType) {
          //   that.secretTypechange(res.data.secretType, true);
          // }
          if (this.fromdata.handleTypeName == "1") {
            this.fromdata.handleTypeName = "阅件";
          } else if (this.fromdata.handleTypeName == "0") {
            this.fromdata.handleTypeName = "批件";
          }

          // if (this.fromdata.isReturnAttachment && this.fromdata.isReturnAttachment == 0) {
          //   this.fromdata.isReturnAttachment = "0";
          // } else {
          //   this.fromdata.isReturnAttachment = "1";
          // }

          // this.fromdata.isReturnAttachment = res.data && res.data.isReturnAttachment || "1";
          // console.log(this.fromdata.isReturnAttachment)

          // if (this.fromdata.isReturnAttachment && this.fromdata.isReturnAttachment == 1) {
          //   this.fromdata.isReturnAttachment = "1";
          // } else {
          //   this.fromdata.isReturnAttachment = "0";
          // }
          if(res.data && res.data.isReturnAttachment === 0){
            this.fromdata.isReturnAttachment = "0";
          }else{
            this.fromdata.isReturnAttachment = "1";
          }

          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];
          // that.fromdata.documentNo = "〔2019〕 号";
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
      if (!sessionStorage.getItem("sTwKhSignpageid")) {
        this.bank_dispach.id = this.$route.query.id;
      } else {
        this.bank_dispach.id = sessionStorage.getItem("sTwKhSignpageid") || "";
      }
      var obj = Object.assign(
        this.saveOrUpdateToQianbaoHuiqianEntity,
        this.fromdata
      );
      await this.$post
        .postData(
          "saveOrUpdateToQianbaoHuiqianEntity",
          JSON.stringify(obj),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.saveOrUpdateToQianbaoHuiqianEntity.id = this.bank_dispach.id =
              res.data.id;
            this.bank_toQianbaoSend.id = res.data.id;
            sessionStorage.setItem("sTwKhSignpageid", res.data.id);
            if (type&&type!='uploadfile') {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            window.opener.location.reload();
             //附件
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
            this.getToQianbaoBackEntityById();
             successState = true;
          }
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "保存失败",
          //   duration: 1000
          // });
          console.log(erro);
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
    viewFile(file, tache){
      let fileType = ['.doc','.docx','.wps','.xls','.xlsx','ppt'];
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
    // goBack() {
    //   window.history.go(-1);
    // },
    // 关闭
    // handelclose() {
    //   this.$confirm("是否保存并退出当前页面?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.preserve();
    //       window.location.href = "about:blank";
    //       window.close();
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
    // handleClose(val) {
    //   if(val=='1') {
    //     this.preserve().then(save => {
    //       if(save) {
    //         window.location.href = "about:blank";
    //         window.close();
    //       }
    //     });
    //   } else if(val=='2') {
    //     window.location.href = "about:blank";
    //     window.close();
    //   } else {
    //     this.showCloseDialog = false;
    //   }
    // },
    // handelclose() {
    //   this.showCloseDialog = true;
    // },
    handelclose() {
      window.location.href = "about:blank";
      window.close();
    },


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
      if (!getFormId(this.$route.query.id, "sTwKhSignpageid")) {
        this.preserve().then(res => {
          if (res) {
            if (state == 1) {
              this.showDraft = true;
            } else {
              let fileInfo = {
                filePath :this.fromdata.filePath,
                fileName : this.fromdata.fileName,
              }
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
              this.doDraft(res);
            }
          });
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
          state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
          id: getFormId(this.$route.query.id, "sTwKhSignpageid"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.qbglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          flowTranId:this.$businessCode.qbgl,//流程交易线    chai
          saveSpecialFileName:str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },


    // 删除此文
    // delectArticle() {
    //   if (!sessionStorage.getItem("sTwKhSignpageid")) {
    //     this.bank_dispach.id = this.$route.query.id;
    //   } else {
    //     this.bank_dispach.id = sessionStorage.getItem("sTwKhSignpageid") || "";
    //   }
    //   this.bank_dispach.id = sessionStorage.getItem("sTwKhSignpageid") || "";
    //   let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
    //   console.log(
    //     this.bank_dispach.id,
    //     this.$route.query.id,
    //     deletesendorderid
    //   );
    //   this.deleteToQianbaoEntityById.id = deletesendorderid;
    //   console.log(this.deleteToQianbaoEntityById);
    //   this.$confirm("是否删除并退出当前页面?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       if (!this.deleteToQianbaoEntityById.id) {
    //         window.location.href = "about:blank";
    //         window.opener.location.reload();
    //         window.close();
    //       } else {
    //         this.$post
    //           .postData(
    //             "deleteToQianbaoEntityById",
    //             JSON.stringify(this.deleteToQianbaoEntityById),
    //             this.$businessCode.qbgl
    //           )
    //           .then(res => {
    //             this.$message({
    //               type: "success",
    //               offset: 400,
    //               showClose: true,
    //               message: "删除成功!"
    //             });
    //             window.location.href = "about:blank";
    //             window.opener.location.reload();
    //             window.close();
    //           });
    //       }
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
    // 收藏
    // collect() {
    //   this.$message({
    //     type: "success",
    //     offset: 400,
    //     showClose: true,
    //     message: "保存成功!"
    //   });
    // },
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
      this.bank_cklc.multiTenancyId = this.CnmultiTenancyId;
      this.tableData = this.tuiWenCKLiuCheng;
      this.$nextTick(() => {
        this.$refs.dialogLine.openDialog();
      });
      // this.$post
      //   .postData("getHistoryActInfo", JSON.stringify(this.bank_cklc), this.$businessCode.ggqbgl)
      //   .then(res => {
      //     console.log(res);
      //     if (res) {
      //       this.tableData = res.data;
      //       this.$nextTick(() => {
      //         this.$refs.dialogLine.openDialog();
      //       });
      //     }
      //   });
    },
    // 打印处理单
    processSheet() {
      const routeData = this.$router.resolve({
        path: "/qbdzTwKhPrint",
        query: {
          id: this.bank_dispach.id,
          khState:this.khState,
          choseYear:this.$route.query.choseYear
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
    //意见可添加
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.fromdata.finalOpinion = this.fromdata.finalOpinion
            ? this.fromdata.finalOpinion + data
            : data;
        } else if (this.clickTypes == 2) {
          this.fromdata.processOpinion = this.fromdata.processOpinion
            ? this.fromdata.processOpinion + data
            : data;
        } else if (this.clickTypes == 3) {
          this.fromdata.undertakeOrgOpinion += data;
        }
        this.$forceUpdate();
      }
    },
    
    // 签报依据
    // handleImport() {
    //   this.bankImport = "";
    //   this.documentCode = "〔〕";
    //   this.showImport = true;
    // },
    // handleImportSure() {
    //   let that = this;
    //   let transJudge = false;
    //   if(this.bankImport == "") {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "文件类型不能为空！",
    //       duration: 500
    //     });
    //     return;
    //   }
    //   if(this.documentCode == "") {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "文号不能为空！",
    //       duration: 500
    //     });
    //     return;
    //   }
    //   if(that.importDataArr.length>0) {
    //     that.importDataArr.forEach(item => {
    //       if(item.documentCode == this.documentCode) {
    //         transJudge = true
    //       } 
    //     });
    //   }
    //   if (transJudge) {
    //     this.$message({
    //       type: "error",
    //         showClose: true,
    //         offset: 400,
    //         message: "已存在本文件字号依据，不可重复添加！",
    //         duration: 500
    //       });
    //     return;
    //   }
    //   if (this.bankImport != "") {
    //     let transJYX = "";
    //     switch (this.bankImport) {
    //       case "CN000": //发文
    //         this.$businessCode.ggfawgl = "A08462001";
    //         break;
    //       case "CN001": //收文
    //         this.$businessCode.ggfawgl = "A08462003";
    //         break;
    //       case "CN002": //签报
    //         this.$businessCode.ggfawgl = "A08462005";
    //         break;
    //     }

    //     if (this.bankImport == "4") {
    //       this.$api.checkLz
    //         .importBas({
    //           documentNo: this.documentCode,
    //           currentUserOldId: JSON.parse(localStorage.getItem("userInfo"))
    //             .humanId
    //         })
    //         .then(res => {
    //           if (!res.result.id) {
    //             this.$message({
    //               type: "warning",
    //               message: "没有找到相应文档"
    //             });
    //           } else {
    //             let transObj = {
    //             id: res.result.id,
    //             title: res.result.title
    //           }
    //           that.importDataArr.push(transObj)
    //           that.fromdata.sendBasis = that.importDataArr
    //           that.showImport = false
    //           that.showImportData = true
    //           that.preserve()

    //             // that.bank_import = res.data;
    //             // that.importDataArr.push(res.data);
    //             // that.fromdata.sendBasis = that.importDataArr;
    //             // that.showImport = false;
    //             // that.showImportData = true;
    //             // that.preserve();
    //           }
    //         });
    //     } else {
    //        let that = this
    //       let obj = {
    //         function: "importBasis",
    //         multiTenancyId: this.bankImport,
    //         documentCode: this.documentCode
    //       };

    //       that.$post
    //         .postData(
    //           "importBasis",
    //           JSON.stringify(obj),
    //           that.$businessCode.ggfawgl
    //         )
    //         .then(res => {
    //           if (res && res.data && res.success) {
    //             // let transArr = [];
    //             // transArr = that.fromdata.sendBasis
    //             //   ? that.fromdata.sendBasis
    //             //   : [];
    //             // transArr.push(res.data);
    //             // that.importDataArr = transArr;
    //             // that.fromdata.sendBasis = that.importDataArr;
    //           //   that.bank_import = res.data;
    //           // that.importDataArr.push(res.data);
    //           // that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
    //           //   that.showImport = false;
    //           //   that.showImportData = true;
    //           //   that.$businessCode.ggfawgl = "A08462001";

    //           //   that.preserve();
    //           that.bank_import = res.data;
    //           that.importDataArr.push(res.data);
    //           that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
    //           that.showImport = false;
    //           that.showImportData = true;
    //           that.preserve();
    //             // that.$forceUpdate()
    //           } else {
    //             // this.$message({
    //             //   type: "error",
    //             //   message: res.message,
    //             //   showClose: true,
    //             //   duration: 1500
    //             // });
    //             // that.showImport = false;
    //             let transObj = {
    //             documentCode: this.documentCode,
    //             id: "",
    //             title: ""
    //           }
    //           this.importDataArr.push(transObj);
    //           this.showImport = false;
    //           that.preserve();
    //           }
    //         });
    //     }
    //   } 
    // },
    // handleCheckImport(data) {
    //   if (data.id == ''||!data.id) {
    //     this.$message({
    //       type: "error",
    //       showClose: true,
    //       offset: 400,
    //       message: "该文件不存在于库中！",
    //       duration: 500
    //     });
    //     return;
    //   } else {
         
      
    //     if(data.bankImport == '4') {
    //       this.handleOpenPage("/proceHas", data.id, '2');
    //       return;
    //     }
    //     if (data.orderType && data.orderType !== "") {
    //       if (data.orderType == "非跨行") {
    //         this.handleOpenPage("/signquoteOverFkhDispatch", data.id);
    //       } else if (data.orderType == "跨行请示") {
    //         this.handleOpenPage("/signquoteOverKhQshDispatch", data.id);
    //       } else if (data.orderType == "跨行审批") {
    //         this.handleOpenPage("/signquoteOverKhSphDispatch", data.id);
    //       } else if (data.orderType == "实物") {
    //         this.handleOpenPage("/signquoteOverEntityDispatch", data.id);
    //       }
    //     } else {
    //      this.showImportList = true;   
    //       this.bank_import = data;
    //     }
    //   }
    // },
    // handleOpenPage(path, id, readType) {
    //   const routeData = this.$router.resolve({
    //     path: path,
    //     query: {
    //       id: id,
    //       readFlag: readType
    //     }
    //   });
    //   window.open(routeData.href, "_blank");
    // },
    // handleDeleteImport(data) {
    //   this.fromdata.sendBasis.forEach(item => {
    //     if (item.documentCode == data.documentCode) {
    //       this.fromdata.sendBasis.splice(index, 1);
    //     }
    //   });
    //   this.preserve()
    //   // this.$forceUpdate();
    // }
  },
  created() {
    //初始化加载数据
    this.bank_dispach.id = this.uploadConfig.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_toQianbaoSend.id = this.bank_dispach.id;
    // this.receiveselectlist();
//初始化修改交易线 (传后台)
    this.uploadConfig.code = this.$businessCode.qbglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl;  //流程交易线   chai
    this.getToQianbaoBackEntityById();
    // this.getTcQbsignParamDicInfo();
    this.khState = this.$route.query.khState || '1'
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

/deep/ .hqbm1 .el-textarea__inner {
  min-height: 40px !important;
}
/deep/ .dialogImport {
    .el-dialog {
      width: 30% !important;
    }
  }
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100% !important;
}
.table_TH {
  /deep/ .el-table__body-wrapper{
    .cell.el-tooltip{
      white-space: normal;
    }
  }
}
</style>
