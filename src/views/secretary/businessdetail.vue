<template>
  <div id="receiveBjYb" class="receive_dispatch">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <!-- <i class="el-icon-arrow-left"></i>收文处理单 -->
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="dialogVisibleShouuhi = true" v-if="fromdata.curNodeCode!=800&&readFlag !='1'&&allowBack==true">收回</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
          <el-button size="small" plain @click="viewDraftFile(fromdata.fileName,fromdata.filePath,$businessCode.swglfj)" v-if="fromdata.filePath">查看正文</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <!-- <el-button plain @click="ckcbzt">查看承办状态</el-button>
          <el-button plain @click="ckxbzt">查看协办状态</el-button> -->
          <el-button size="small" plain  @click="processSheet('/swswcld')">打印处理单</el-button>
          <el-button size="small" plain @click="caozuozhinan">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisibleShouuhi"
        width="30%">
        <span>是否收回</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleShouuhi = false">取 消</el-button>
          <el-button type="primary" @click="shouhuibutton">确 定</el-button>
        </span>
      </el-dialog>


    <div class="nav"></div>
    <header class="bank_dispach_header">
      <!-- <h3 class="bank_dispach_tit" v-if="isSupervise == 1">中国建设银行公文督查办单</h3>
      <h3 class="bank_dispach_tit" v-else>中国建设银行实物收文处理单</h3> -->
      <h3 class="bank_dispach_tit">{{fromdata.documentTitle}}</h3>
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
        >签批对象</a>
        <a
          href="javascript:void(0);"
          :class="active == '#cyxx' ? 'active' : ''"
          @click="toTarget('#cyxx')"
        >传阅信息</a>
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
            label-width="130px"
            :model="fromdata"
            :rules="rules"
            class="demo_ruleForm"
            :disabled="true"
          >
            <!-- 当前环节注释 -->
            <div class="bank_dispach_annotation" :class="{bank_db_height:isSupervise == 1}">
              <el-row>
                <el-col :span="10" style="display:flex">
                  <p class="bank_dispach_annotation_current">
                    当前环节：
                    <span>{{curNodeName}}</span>
                  </p>
                  <p v-if="fromdata.curNodeCode!=800" class="bank_dispach_annotation_current">
                    当前处理人：
                    <span>{{curUser}}</span>
                  </p>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="是否阅件:" class="pl65">
                      <el-radio v-model="fromdata.isRead" disabled :label="1">是</el-radio>
                      <el-radio v-model="fromdata.isRead" disabled :label="0">否</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="isSupervise == 1">
                <el-col :span="8" style="display:flex;color:red;">
                    请抓紧办理，办结后及时退部门“综合处理”归档
                </el-col>
              </el-row>
            </div>

            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>

               <div v-if="isSupervise == 1">

                    <el-col :span="8">
                  <el-form-item label="办理期限" prop="limitDate" ref="limitDate">
                      <el-input v-model="fromdata.limitDate" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办理进度" :span="8" prop="progress" ref="progress">
                    <el-input v-model="fromdata.progress" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="提前提醒天数" prop="daysInAdvance" ref="daysInAdvance">
                    <el-input v-model="fromdata.daysInAdvance" disabled></el-input>
                  </el-form-item>
                </el-col>
               
                </div>


                <el-col>
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input placeholder="正文标题" v-model="fromdata.title"></el-input>
                  </el-form-item>
                </el-col>
                   <el-col>
                  <el-form-item label="收文字号" prop="documentCode" ref="documentCode">
                    <el-input v-model="fromdata.documentCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题" prop="attachmentTitle" ref="attachmentTitle">
                    <el-input type="textarea" autosize resize="none" placeholder="附件标题" v-model="fromdata.attachmentTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收文日期" prop="receiveTime" ref="receiveTime">
                    <el-date-picker
                      v-model="fromdata.receiveTime"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" prop="emergencyName" ref="emergencyName">
                    <el-select
                      v-model="fromdata.emergencyName"
                      placeholder="请选择"
                      style="width:100%"     
                    >
                      <el-option
                        v-for="item in selectContents.emergency_level"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            
             
                <el-col>
                     <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      @change="selectType"
                      style="width:100%"
                    >
                      <el-option
                        v-for="item in selectContents.secret_type"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :span="8">
                    <el-form-item label="密级和保密期限" ref="secretFlagType" prop="secretFlagType">
                      <el-select
                        v-model="fromdata.secretFlagType"
                        placeholder="请选择"
                        style="width:100%"
                        disabled
                        @change="selectMiHandler"
                      >
                        <el-option
                          v-for="item in selectMicontent"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="linecenter">
                    <el-form-item label="/" label-width="20px" prop="secretLimitType" ref="secretLimitType">
                      <el-select v-model="fromdata.secretLimitType">
                        <el-option
                          v-for="item in selectContents.secret_time_type"
                          :key="item.value"
                          disabled
                          :label="item.value"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="来文单位" prop="sendOrgName" ref="sendOrgName">
                    <el-input
                      v-model="fromdata.sendOrgName"
                      :title="fromdata.sendOrgName"
                      placeholder="请选择来文单位"
                      style="width: 100%;"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期" prop="completeTime" ref="completeTime">
                    <el-date-picker
                      v-model="fromdata.completeTime"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="实物收文类型" prop="receiveType" ref="receiveType">
                    <el-select v-model="fromdata.receiveType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in selectContents.receive_type"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记人" prop="userName" ref="userName">
                    <el-input disabled v-model="fromdata.userName"></el-input>
                  </el-form-item>
                </el-col>

                <div v-if="isSupervise == 1">
                  <el-col :span="8" style="height:1px;">
                  <el-form-item label="" >
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="督办人" prop="superviserName" ref="superviserName">
                    <el-input v-model="fromdata.superviserName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="督办日期" prop="superviseDate" ref="superviseDate">
                    <el-input v-model="fromdata.superviseDate" disabled></el-input>
                  </el-form-item>
                </el-col>
                </div>
                
                <el-col>
                  <el-form-item label="转发文件" prop="isForword" ref="isForword">
                    <el-radio v-model="fromdata.isForword" label="1">是</el-radio>
                    <el-radio v-model="fromdata.isForword" label="0">否</el-radio>
                  </el-form-item>
                </el-col>


                <el-col>
                  <el-form-item
                    label="转发要求"
                    prop
                    ref="forwordRequirements"
                    v-show="fromdata.isForword *1"
                  >
                    <el-input
                      type="textarea"
                      placeholder="填写附件"
                      v-model="fromdata.forwordRequirements"
                      resize="none"
                      autosize
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                    <el-radio v-model="fromdata.isDirect" label="1">是</el-radio>
                    <el-radio v-model="fromdata.isDirect" label="0">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="直发范围"
                    prop="directRange"
                    ref="directRange"
                    v-show="fromdata.isDirect*1"
                  >
                    <el-select v-model="fromdata.directRange" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in selectContents.direct_send_range"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="直发文种类"
                    prop="directType"
                    ref="directType"
                    v-show="fromdata.isDirect*1"
                  >
                    <el-select v-model="fromdata.directType" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in selectContents.direct_send_type"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="发送对象">
                    <el-input
                      v-model="fromdata.sendSubName"
                      placeholder="请选择发送对象"
                      style="width: 100%;"
                    >
                       </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="保管期限" prop="keepingLimitName" ref="keepingLimitName">
                    <el-col :span="3">
                      <el-button>期限鉴定表</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-select v-model="fromdata.keepingLimitName" placeholder="请选择" style="width:100%">
                        <el-option
                          v-for="keep_limititem in keep_limit"
                          :key="keep_limititem.value"
                          :label="keep_limititem.value"
                          :value="keep_limititem.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="承办部门" prop="undertakeDeptName" ref="undertakeDeptName">
                    <el-input
                      v-model="fromdata.undertakeDeptName"
                      :title="fromdata.undertakeDeptName"
                      placeholder="请选择承办部门"
                      style="width: 100%;"
                    >
                         </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" width="0">
                    <el-input
                      v-model="fromdata.finishUndertakeDeptName"
                      :title="fromdata.finishUndertakeDeptName"
                      style="width: 100%;"
                      disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="协办部门">
                    <el-input
                      v-model="fromdata.assistDeptName"
                      :title="fromdata.assistDeptName"
                      placeholder="请选择协办部门"
                      style="width: 100%;"
                    >
                       </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" width="0">
                    <el-input
                      v-model="fromdata.finishAssistDeptName"
                      :title="fromdata.finishAssistDeptName"
                      placeholder=""
                      style="width: 100%;"
                      disabled
                    >
                    </el-input>
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
                  <div v-for="item in fromdata.pishiOpinionList" :key="item.id">
                    <div v-if="item.status" class="fix_height">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
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
                  <el-input type="textarea" resize="none" autosize v-if="fromdata.pishiOpinionList==''||!fromdata.pishiOpinionList" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="办公室批办意见">
                  <div v-for="item in fromdata.officeOpinionList" :key="item.id">
                    <div v-if="item.status" class="fix_height">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
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
                  <div class="fix_height">
                  </div>
                <el-input type="textarea" resize="none" autosize v-if="fromdata.officeOpinionList==''||!fromdata.officeOpinionList" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="承办部门办理情况">
                  <div v-for="item in fromdata.undertakeOrgOpinionList" :key="item.id">
                    <div v-if="item.status" class="fix_height">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
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
                <el-input type="textarea" resize="none" autosize v-if="fromdata.undertakeOrgOpinionList==''||!fromdata.undertakeOrgOpinionList" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="协办部门办理情况">
                  <div v-for="item in fromdata.helpOrgOpinionList" :key="item.id">
                    <div v-if="item.status" class="fix_height">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
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
                <el-input type="textarea" resize="none" autosize v-if="fromdata.helpOrgOpinionList==''||!fromdata.helpOrgOpinionList" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="传阅意见">
                  <div v-for="item in fromdata.circulateOpinionList" :key="item.createTime">
                    <div class="d_flex" v-if="item.opinions&&item.opinions!=''">
                      <el-row class="d_b100">
                        <el-col>
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            :value="item.opinions"
                            :disabled="true"
                            rows="3"
                            class="d_f1"
                          ></el-input>
                          <div class="adviceInfo">
                            {{item.opinionDeptName}}
                            <span class="pad_lr10">{{item.curUser}}</span>
                            {{item.opinionCreateTime}}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <el-input
                    type="textarea"
                    resize="none"
                    autosize
                    v-if="showCy"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="办结情况">
                  <div v-for="(item) in fromdata.handleTerminateOpinionList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
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
                <el-input type="textarea" resize="none" autosize v-if="fromdata.handleTerminateOpinionList==''||!fromdata.handleTerminateOpinionList" disabled></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="备    注">
                  <div v-for="(item) in fromdata.remarksList" :key="item.id">
                    <div v-if="item.status" class="d_flex">
                      <el-row class="d_b100">
                        <el-col
                          :span="22"
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
                        <el-col
                          :span="2"
                          v-if="item.createTime ==fromdata.opinionMaxTime&&item.userId==nowUserId"
                        >
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                <el-input type="textarea" resize="none" autosize v-if="fromdata.remarksList==''||!fromdata.remarksList" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 传阅信息 -->
            <template>
              <h6 class="bank_dispach_file_tit">传阅信息</h6>
              <div id="cyxx" class="height_90"></div>
              <el-row>
                <el-col>
                  <el-form-item label="传阅人员"> 
                      <el-col class="m10">
                        <el-form-item label="未阅" prop="wbjFirstCirculate" ref="wbjFirstCirculate">
                          <el-input type="textarea"
                            resize="none"
                            autosize  v-model="fromdata.wbjFirstCirculate" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10">
                        <el-form-item label="已阅" prop="ybjFirstCirculate" ref="ybjFirstCirculate">
                          <el-input type="textarea"
                            resize="none"
                            autosize v-model="fromdata.ybjFirstCirculate" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
        
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row>
              <el-col>
                <div class="tree_w" style="margin-left:138px;" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                  <el-scrollbar>
                    <div v-for="item in  fromdata.attchmentFileInfo" :key="item.id" class="comp_list">  
                      <template>
                        <div class="command_wrap">
                          <span class="name down" :title="item.fileName" @click="viewFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                :disabled="false"
                                round
                              >下载</el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div> 
              </el-col>
              <el-col v-for="(item,n) in fkfj" :key="n">
                <el-form-item :label="item" :key="item">
                  <el-scrollbar>
                    <div v-for="item1 in fkfjList[n]" :key="item1.id" class="tree_w">  
                      <template>
                        <div class="command_wrap">
                          <span class="name down" :title="item1.fileName" @click="viewFile(item1)">{{item1.fileName}}</span>
                          <span class="name">{{item1.createrName}}</span>
                          <span class="name">{{item1.createTime}}</span>
                          <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item1)"
                              round
                            >下载</el-button>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </el-form-item>
              </el-col>
            </el-row>
              </el-form>
        </div>
      </div>
    </div>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <!-- 期限鉴定表 -->
    <el-dialog title="期限鉴定表" :visible.sync="dialogVisible" width="50%">
      <m-table
        size="medium"
        :isSelection="false"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        :highlightcurrentrow="true"
        @handleTableCurrentChange="handleCurrentChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :page-sizes="[10,15,20,25,30]"
      ></m-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import appendWriteList from "../../components/appendWriteList/appendWriteList";
import treeCofig from "../../components/tree/tree-fawen";
import mTable from "components/table/mTable.vue";
import timeDialog from "@/components/timedialog/timedialog";
import uploadFiles from "../../components/uploadFile/uploadFile";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
const tableCol = [
  { label: "选择条目", prop: "mark", align: "center" },
  { label: "自动鉴定期限", prop: "limitDate", align: "center" }
];

export default {
  name: "ReceiveDispatch",
  components: {
    appendWriteList,
    treeCofig,
    mTable,
    timeDialog,
    uploadFiles
  },
  mixins: [viewDraft],
  data() {
    return {
      dialogVisibleShouuhi:false,//收回确定弹窗
      fkfj:[],//反馈附件
      fkfjList:[],//反馈附件
      uploadConfig:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[]
      },
       //下载文件
      bank_doDownloadFile:{
        function: "doDownloadFile",
        fileName: "",
        filePath:""
      },
      //删除附件
      bank_deleteFileById:{
        function:'deleteFileById',
        id:''
      },
      showduban:true,
      dubanhtml:"督办",
      isSupervise:"",
      shData:[],//收回数据
      checkedsh:[],//收回列表
      fasongCheckData:[],//fasong
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize: 10
      },
      //tree
      dialogVisibleTree: false,
      treeData: [],
      defaultProps: {
        children: [],
        label: "name",
        isLeaf: "leaf"
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: true
      },
      readFlag:"",
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      deleteIds: "",
      tableCols: tableCol,
      curNodeName: "",
      referForm: {
        function: "selectQXHDBPage",
        page: 1,
        limit: 10
      },
      timeShow: false, //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        processInstId: ""
      },
      getJDBDropDownDataSource: {
        function: "getJDBDropDownDataSource"
      },
      //办结
      banjie_fn: {
        function: "doFinish",
        moduleType:"receive_doc_sw"
      },
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      //实物收文下拉数据源
      getReceiveDropDownDataSource: {
        function: "getReceiveDropDownDataSource"
      },
      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      //承办部门树
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //确定完成并发送
      bank_doSend: {
        function: "finishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "" //人员id
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "deleteOpinionById",
        id: ""
      },
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "001",
        tplNo: "",
        // curMultiTenancyId: "CN000"
        multiTenancyId: ""
      },
      bank_sendXb:{
        function:'createHelpSubWf',
        processInstId:'',
        multiTenancyId:'',
        pcsAvyId:'',
        tplNo:'',
        moduleType:'receive_doc_sw',
        curNodeCode:'',
        deptIds:'' ,
        deptNames:'',
        id:'',
        avyds:""
      },
      showCy:true,//传阅都没有意见的显示
      curUser: "",
      curNode: "",
      clickTypes: "",
      appendWriteDialog: true,
      swglCode: this.$businessCode.swgl,
      swglggCode: this.$businessCode.swglgg,
      ggjyCode: this.$businessCode.ggywgn,
      receiveselect: {
        function: "selectSWById",
        id: ''
      },
      saveOrUpdateSW: {
        function: "saveOrUpdateSW",
        id: ''
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      //直发文件是否
      directFlag: false,
      fromdata: {
        secretFlagType:"",
        secretLimitType:"",
        assistDeptName:"",
        attachSort:[],
        attchmentFileInfo:[],
        receiveVersion:"",
        curNodeCode:"",
        isHasCB:"",//1-有未办结的承办，显示增发收回催办，0-无未办结的承办 隐藏增发收回催办
        isHasXB:"",
        limitDate:"",//办理期限
        progress:"", //办理进度
        daysInAdvance:"",// 提前提醒天数
        superviserName:"",//督办人
        superviseDate:"",//督办日期
        direct_send_range: "", //直发范围
        keepLimitName: "", //保管期限
        secret_flag_type: "", //秘密标志类型
        undertakeDeptName: "",
        processInstId: "", //流程实例标识
        tplNo: "", //模板编号
        multiTenancyId: "", //多实体标识
        pcsAvyId: "", //流程活动标示
        pishiOpinion: "", //批示意见
        isDirect: "0", // 是否直发
        forwordRequirements: "",
        isForword: "0", //转发文件
        title: "",
        sendSubId:"",//发送对象id
        sendSubName:"",//发送对象名称
        attachmentTitle: "",
        receiveTime: "",
        emergencyName: "",
        documentCode: "",
        secretType: "",
        security: "",
        secretLimitName: "",
        sendOrgName: "",
        completeTime: "",
        receiveType: "",
        userName: "",
        isForword: "",
        isDirect: "",
        directRange: "",
        directType: "",
        keepLimitName: "",
      },
      selectContents: {
        business_secret_flag_type: "", //商业秘籍
        country_secret_flag_type: "", //国家密级
        direct_send_type: "", //直发文种类
        emergency_level: "", //紧急程度
        receive_type: "",
        secret_time_type: "", //保密期限类型
        secret_type: "" //秘密类型
      },
      transIds: '',
      rules: {
      },
      copyRules: {
        undertakeDeptName: [
          { trigger: "change", required: true, message: "请选择承办部门" }
        ]
      },
      allowBack:"",//收回按钮的判断
      sendIds:[],
      shdialogType:"",//是收回还是催办
      shdialogTypeUnder:"",//是收回还是催办是否加字段
      tabMiJi: true, //秘密级别切换
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      nowUserId: localStorage.getItem("ccboaHumanId"), //当前用户id
      selectMicontent: [], //密级数据下拉框
      checkedArr: [],
      keep_limit: ""
    };
  },

  mounted() {
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_cyxx = document.querySelector("#cyxx").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(function() {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    //发送
    fasongBtn(){
      let idN= this.receiveselect.id || sessionStorage.getItem("pageSWid") || "";
      this.$post
      .postData("doSend", JSON.stringify({function:"doSend",deptIds:this.fromdata.sendSubId,id:idN}), this.swglCode)
        .then(res => {
          if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送成功",
                duration: 1000
              });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: reeor.message,
            duration: 1000
          });
        });
    },
    //点击督办
    shouwenduban(){
      const gobackform = {
        function: "superviseReceive",
        id:this.receiveselect.id
      };
      this.$post
        .postData("superviseReceive", JSON.stringify(gobackform), this.swglCode)
        .then(res => {
          if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "成功",
                duration: 1000
              });
            this.receiveselectlist();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "失败",
            duration: 1000
          });
        });
    },
    //取消督办
    unshouwenduban(){
      const gobackform = {
        function: "cancelSuperviseReceive",
        id:this.receiveselect.id
      };
      this.$post
        .postData("cancelSuperviseReceive", JSON.stringify(gobackform), this.swglCode)
        .then(res => {
          if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "成功",
                duration: 1000
              });
            this.receiveselectlist();
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "失败",
            duration: 1000
          });
        });
    },
    getBack(){
      //收回
      const gobackform = {
        function: "doWithdrawTask",
        pcsAvyId: this.bank_sendXb.pcsAvyId,
      };
      this.$post
        .postData("doWithdrawTask", JSON.stringify(gobackform), this.swglggCode)
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1000
              });
            }
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
    },
    shoucang() {
      let that = this;
      let shiwutitle = this.fromdata.documentCode;//字号
      let draftInfo = this.fromdata.filePath?[].concat({fileName:this.fromdata.fileName,filePath:this.fromdata.filePath},this.fromdata.attchmentFileInfo):this.fromdata.attchmentFileInfo;//收藏时下载正文
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "receiveBjYb",
        this.$businessCode.swglfj,
        this.fromdata.title,//标题
        that
      );
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
    //拼接数据
    concatAttrData(name, data) {
      this.fromdata[name] = this.fromdata[name]
        ? this.fromdata[name] + data
        : data;
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
    //定密依据接收子组件传值
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          this.concatAttrData("pishiOpinion", data);
        } else if (this.clickTypes == 2) {
          this.concatAttrData("officeOpinion", data);
        } else if (this.clickTypes == 3) {
          this.concatAttrData("undertakeOrgOpinion", data);
        }
        this.$forceUpdate();
      }
    },
    //定密依据弹窗弹出
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //切换秘密类型
    selectType(type) {
      if (type.trim() === "商业秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.country_secret_flag_type
        );
      } else if (type.trim() === "国家秘密") {
        this.selectMicontent = [].concat(
          this.selectContents.business_secret_flag_type
        );
      }
      this.fromdata.security = "";
    },
    selectMiHandler(val) {
      this.fromdata.security = val;
      this.$forceUpdate();
    },
     //按钮收回
    shouhuibutton(){
        this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify({function:"doWithdrawTask",
          pcsAvyId:this.fromdata.pcsAvyId,
          multiTenancyId:this.fromdata.multiTenancyId,
          processInstId:this.fromdata.processInstId}),
          this.swglggCode
        ).then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 500,
             
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          }
        })
    },

    //发送承办
    sendCb(){ 
      this.bank_sendXb.deptIds = this.fromdata.undertakeDeptId;
      this.bank_sendXb.deptNames =  this.fromdata.undertakeDeptName;
      this.bank_sendXb.avyds="发送承办部门:"+this.bank_sendXb.deptNames;
      let cbParm = Object.assign(this.bank_sendXb,{undertake:true})
      this.$post
        .postData(
          "createHelpSubWf",
          JSON.stringify(cbParm),
          this.swglCode
        )
        .then(res => {
          if(res&&res.success){
            this.$message({
              message:"发送成功",
              type:'success'
            })
            if(type == "1"){
              this.preserve('save');
            }
          }else{
            this.$message({
              message:res.message,
              type:'error'
            })
          }
             
        }).catch(err =>{
          this.$message({
            message:err,
            type:'error'
          })
        });

    },
    //发送协办
    sendXb(type){
      if(this.bank_sendXb.undertake)delete this.bank_sendXb.undertake
      if(type=="1"){
        this.bank_sendXb.deptIds = this.fromdata.assistDeptId;
        this.bank_sendXb.deptNames =  this.fromdata.assistDeptName;
         this.bank_sendXb.avyds="发送协办部门:"+this.bank_sendXb.deptNames;
      }else{
        this.bank_sendXb.deptIds = this.transIds;
        this.bank_sendXb.deptNames = this.fromdata.assistDeptName;
        this.bank_sendXb.avyds="发送协办部门:"+this.bank_sendXb.deptNames;

      }
      this.$post
        .postData(
          "createHelpSubWf",
          JSON.stringify(this.bank_sendXb),
          this.swglCode
        )
        .then(res => {
          if(res&&res.success){
            this.$message({
              message:"发送成功",
              type:'success'
            })
            if(type == "1"){
              this.preserve('save');
            }
          }else{
            this.$message({
              message:res.message,
              type:'error'
            })
          }
             
        }).catch(err =>{
          this.$message({
            message:err,
            type:'error'
          })
        });
    },
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "SWGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getFileInfo(this,res.data).then(resF => {
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
                    flowTranId:this.$businessCode.swgl, 
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
    handleCurrentChange(val) {
      // this.checkedArr = []
      // if (val.length>1) {

      //   this.checkedArr = val[0].limitDate;
      //   this.fromdata.limitDate = this.checkedArr;
      // } else {
      //   this.checkedArr = []
      // }
      this.checkedArr = val.limitDate;
      this.fromdata.limitDate = this.checkedArr;
      console.log(this.checkedArr);
    },
    handleSave() {
      this.dialogVisible = false;
    },
    // 打印处理单
    processSheet(path,id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
            id:this.receiveselect.id
        }
      });
      window.open(routeData.href, "_blank");
    },
    // handleSelectionChange() {},
    receiveselectlist() {
      this.receiveselect.id = this.receiveselect.id
        ? this.receiveselect.id
        : sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData(
          "selectSWById",
          JSON.stringify(this.receiveselect),
          this.swglCode
        )
        .then(res => {
          if (res.data) {
            this.fromdata = res.data;
            this.curUser = res.data.curUser;
            this.curNodeName = res.data.curNodeName;
            this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
            this.bank_selectConfig.tplNo = res.data.tplNo;
            this.bank_sendXb.processInstId = res.data.processInstId;
            this.bank_sendXb.multiTenancyId = res.data.multiTenancyId;
            this.bank_sendXb.pcsAvyId = res.data.pcsAvyId;
            this.bank_sendXb.tplNo = res.data.tplNo;
            this.bank_sendXb.receive_doc_sw = res.data.receive_doc_sw;
            this.bank_sendXb.curNodeCode = res.data.curNodeCode;
            this.bank_sendXb.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            //督办字段
            this.isSupervise = res.data.isSupervise;
            this.limitDate = res.data.limitDate;
            this.progress = res.data.progress;
            this.daysInAdvance = res.data.daysInAdvance;
            this.superviserName = res.data.superviserName;
            this.superviseDate = res.data.superviseDate;
            //已上传的文件
            this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
            this.fromdata.attachSort = [];
            //getback
            if(res.data.circulateOpinionList){
              for(let i =0;i<res.data.circulateOpinionList.length;i++){
                if(res.data.circulateOpinionList[i].content!=''){
                  this.showCy = false;
                }
              }
            }

            //反馈处理
            for(let i in this.fromdata.feedbackAttachmentMap){
              let k = 0;
              this.fkfj.push(i)
              this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i])
            }
            if (this.fromdata.isDirect == "1") {
              this.fromdata.isDirect = "1";
            } else if (this.fromdata.isDirect == "0") {
              this.fromdata.isDirect = "0";
            }
            if (this.fromdata.isForword == "1") {
              this.fromdata.isForword = "1";
            } else if (this.fromdata.isForword == "0") {
              this.fromdata.isForword = "0";
            }
            if (this.fromdata.isDirect == "1") {
              this.fromdata.isDirect = "1";
            } else if (this.fromdata.isDirect == "0") {
              this.fromdata.isDirect = "0";
            }
            if (this.fromdata.isForword == "1") {
              this.fromdata.isForword = "1";
            } else if (this.fromdata.isForword == "0") {
              this.fromdata.isForword = "0";
            }

            if (res.data.undertakeDeptId) {
              this.chenCheckData = this.concatTreeData(
                res.data.undertakeDeptId,
                res.data.undertakeDeptName,
                "dosend"
              );
            }
            if (res.data.assistDeptId) {
              this.transIds = res.data.assistDeptId
            
              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
            }
            //临时意见处理
            this.cuteData("pishiOpinion", "pishiOpinionList", "pishiOpinionId");
            this.cuteData("remarks", "remarksList", "remarksId");
            this.cuteData(
              "handleTerminateOpinion",
              "handleTerminateOpinionList",
              "handleTerminateOpinionId",
              "helpOrgOpinionList",
              "undertakeOrgOpinionList"
            );
            this.cuteData(
              "officeOpinion",
              "officeOpinionList",
              "officeOpinionId"
            );
            //收回测试
            this.$post
            .postData(
              "checkTakeBack",
              JSON.stringify({function:"checkTakeBack",processInstId:this.fromdata.processInstId}),
              this.swglggCode
            )
            .then(res => {
              this.allowBack = res.allowBack;
            });
          }
        });

      this.$post
        .postData(
          "getJDBDropDownDataSource",
          JSON.stringify(this.getJDBDropDownDataSource),
          this.swglCode
        )
        .then(res => {
          this.keep_limit = res.data.keep_limit;
          this.selectContents.receive_type = res.data.receive_type;
        });
        
    },
    preserve(type) {
      let params = Object.assign(this.saveOrUpdateSW, this.fromdata);
      this.saveOrUpdateSW.id =
        this.receiveselect.id || sessionStorage.getItem("pageSWid") || "";
      this.$post
        .postData("saveOrUpdateSW", JSON.stringify(params), this.swglCode)
        .then(res => {
          if (res && res.success) {
            sessionStorage.setItem("pageSWid", res.data.id);
            if (type) {
              this.$message({
                type: "success",
                offset: 400,
                duration: 1000
              });
            }
            if(type==="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
            }else{
              this.receiveselectlist();
            }
          }
        })
    },
    isCanGetBack(){
      //收回测试
      this.$post
      .postData(
        "checkTakeBack",
        JSON.stringify({function:"checkTakeBack",processInstId:this.fromdata.processInstId}),
        this.swglggCode
      )
      .then(res => {
        this.allowBack = res.allowBack;
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
        scrolled >= this.distance_qpyj &&
        scrolled < this.distance_cyxx - 180
      ) {
        this.active = "#qpyj";
      } else if (
        scrolled >= this.distance_cyxx - 200 &&
        scrolled < this.distance_scfj
      ) {
        this.active = "#cyxx";
      } else {
        this.active = "#scfj";
      }
    },

    // 关闭 
    handelclose() {
      window.location.href = "about:blank";
      window.close();
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
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeDeptName") {
          this.fromdata.undertakeDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "assistDeptName") {
          this.fromdata.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.$post
        .postData("getHistoryActInfo", JSON.stringify(this.bank_cklc), this.swglggCode)
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
        .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById), this.swglCode)
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
          this.$businessCode.swglfj
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

    downFile(file){
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
       this.$post
        .postData("doDownloadFile", JSON.stringify(this.bank_doDownloadFile), this.$businessCode.swglfj)
        .then(res => {
          console.log(res);
          if (res) {
              if (res && res.success) {
                downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName, file.fileName);
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
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      var handbook = flagFile?self.$businessCode.fwbzfj:self.$businessCode.swglfj;
      self.bank_doDownloadFile.fileName = flagFile
        ? flagFile.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = flagFile
        ? flagFile.filePath
        : self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          handbook 
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
    // 起草正文
    drafting(state) {
      let that = this;
      this.zhengWenState = state;
      if (!this.fromdata.filePath && !this.fromdata.fileName && state != 1) {
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先上传正文",
          duation: 500
        });
        return;
      }
      if (!this.fromdata.id) {
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
              //this.doDraft(res);
              let data = this.$router.resolve({
                path: "/openAndSave_Word",
                query: {
                  state: "viewFile",
                  id: this.fromdata.id,
                  zhengWenState: this.zhengWenState,
                  JYcode: this.$businessCode.swglfj,
                  multiTenancyId: this.fromdata.multiTenancyId,
                  relativePath: res ? res.filePath : "",
                  fileName: res ? res.fileName : "",
                  showBtns: false,
                  flowTranId:this.$businessCode.swglgg
                }
              });
              this.showDraft = false;
              this.$forceUpdate();
              window.open(data.href, "_blank");
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
          id:this.fromdata.id,
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.swglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          showBtns:false,
          flowTranId:this.$businessCode.swgl,    //流程交易线     chai
        }
      });
      this.showDraft = false;
      this.$forceUpdate();

      window.open(data.href, "_blank");
    },
    
  },
  watch: {},
  created() {
    let that = this;
    this.uploadConfig.code = this.$businessCode.swglfj;
    this.uploadConfig.flowTranId = this.$businessCode.swgl;  //流程交易线   chai
    this.receiveselect.id = this.$route.query.id ? this.$route.query.id : "";
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.receiveselectlist();
    this.$post
      .postData(
        "getReceiveDropDownDataSource",
        JSON.stringify(this.getReceiveDropDownDataSource),
        this.swglCode
      )
      .then(res => {
        if (res && res.success) {
          console.log("下拉", res.data);
          that.selectContents = Object.assign(
            {},
            that.selectContents,
            res.data
          );
          //this.selectType((this.fromdata.secretType = "商业秘密"));
          //this.rules = this.copyRules;
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted(){
      this.$nextTick(()=>{
        let a = this.$refs.title;
        console.log(a)
        //this.$set(this.$refs.title.$children[1],this.$refs.title.$children[1].readonly,true)
        this.$forceUpdate()
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
.pl65 {
  float: right;
  padding-right: 10px;
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
      .bank_db_height {
        height: auto;
      }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 20px 0;
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
  color: red !important;
  height: 40px !important;
  min-height: 40px !important;
}
/deep/ .hqbm1 .el-textarea__inner {
  height: 40px !important;
  min-height: 40px !important;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
}
.linecenter {
  /deep/ .el-form-item__label {
    width: 30px;
    text-align: center;
    padding: 0;
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
.disable_w {
  width: 100%;
}
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(102, 30, 30, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  height: 100%;
}
.command_wrap {
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

</style>
