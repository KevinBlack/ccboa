<template>
  <div id="bankRecountersignDone" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>会签处理单
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain @click="maintenance">维护</el-button>
          <el-button plain v-show="bank_selectConfig.curNodeId != '800'&&fromdata.isShowSendXb != 1&&fromdata.isShowLC!=1" @click="processScheduling">流程调度</el-button>
          <el-button plain @click="drafting(0)">查看正文</el-button>
          <el-button plain @click="flowScheme">查看流程</el-button>
          <!-- <el-button plain @click="collect('againSign', bank_dispach.id)">收藏</el-button> -->
          <el-button plain @click="processSheet">打印处理单</el-button>
          <!-- <el-button plain size="small" @click="handleShowRegain">收回</el-button>
          <el-button plain @click="instructions">操作指南</el-button>-->
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
            <!-- <el-button size="small" class="bank_article_illustrates" @click="handleExplain">办文说明</el-button> -->
          </div>
          <el-form ref="fromdata" :model="fromdata" label-width="130px" class="demo_ruleForm">
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" disabled>
                      <!-- <template slot="append"><a href="#" @click="handleShowNewTitle">修改标题</a></template> -->
                    </el-input>
                  </el-form-item>
                  <el-form-item v-if="showNweTitle" label="修改后标题" prop="newTitle">
                    <el-input v-model="fromdata.newTitle" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="附件标题" prop="attachTitle">
                    <el-input
                      v-model="fromdata.attachTitle"
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                    >
                      <!-- <template slot="append"><a href="#" @click="handleshowNewAttachTitle">修改附件标题</a></template> -->
                    </el-input>
                  </el-form-item>
                  <el-form-item label="修改后附件标题" prop="newAttachTitle">
                    <el-input
                      v-model="fromdata.newAttachTitle"
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发文字号" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.documentNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文件形式" prop="fileFlag" ref="fileFlag">
                    <el-input v-model="fromdata.fileFlag" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原签发人" prop="oldQfr" ref="oldQfr">
                    <el-input v-model="fromdata.oldQfr" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门" prop="hostDepartment" ref="hostDepartment">
                    <el-input v-model="fromdata.hostDepartment" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人" prop="newDraftUser" ref="newDraftUser">
                    <el-input v-model="fromdata.newDraftUser" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="phone" ref="phone">
                    <el-input v-model="fromdata.phone" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期" prop="completeTime" ref="completeTime">
                    <el-input v-model="fromdata.completeTime" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请日期" prop="applyDate" ref="applyDate">
                    <el-input v-model="fromdata.applyDate" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="重发日期" prop="newSendDate" ref="newSendDate">
                    <el-input v-model="fromdata.newSendDate" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                    <el-radio v-model="fromdata.isDirect" disabled label="是">是</el-radio>
                    <el-radio v-model="fromdata.isDirect" disabled label="否">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="直发范围" v-if="fromdata.isDirect==='否' ? false :true">
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
                  <el-form-item label="直发文种类" v-if="fromdata.isDirect==='否' ? false :true">
                    <el-select
                      v-model="fromdata.directType"
                      disabled
                      placeholder="请选择"
                      style="width:100%"
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
                <el-col :span="24">
                  <el-form-item
                    label="会签部门"
                    prop="finishSignDepartmentName"
                    ref="finishSignDepartmentName"
                  >
                    <el-input v-model="fromdata.finishSignDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 发送对象 -->
            <h6 class="bank_dispach_file_tit">重发原因</h6>
            <div id="fsdx" class="height_90"></div>
            <div>
              <el-row>
                <el-col>
                  <div>
                    <el-form-item label="重发会签">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.newSignDepartmentName"
                        placeholder="请选择会签部门"
                        style="width: 100%;"
                        disabled
                        class="hqbm"
                      >
                        <!-- <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button> -->
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col>
                  <el-form-item label="重发原因" prop="newReason" ref="newReason">
                    <el-input
                      v-model="fromdata.newReason"
                      type="textarea"
                      resize="none"
                      autosize
                      rows="3"
                      class="d_f1"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="修改内容" prop="newContext" ref="newContext">
                    <el-input
                      v-model="fromdata.newContext"
                      type="textarea"
                      resize="none"
                      autosize
                      rows="3"
                      class="d_f1"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 会签意见 -->
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="签发意见">
                    <!-- <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        v-model="fromdata.opinionSend"
                        v-if="fromdata.opinionSendId || !(fromdata.opinionSendList && fromdata.opinionSendList.length!==0)"
                        disabled
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
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="办公室负责人意见">
                    <!-- <div v-for="(item) in fromdata.repeatOfficeList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
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
                        v-model="fromdata.repeatOffice"
                        v-if="fromdata.repeatOfficeId||!(fromdata.repeatOfficeList && fromdata.repeatOfficeList.length!==0)"
                        disabled
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=2)"
                        v-if="!editedIdeaFields.repeatOffice"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>-->
                    </div>
                    <opinionText
                      :opinionText="fromdata.repeatOfficeList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                    <!-- <el-input type="textarea" resize="none" autosize v-model="fromdata.repeatOffice" disabled></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="会签意见">
                    <!-- <div v-for="item in fromdata.opinionSignList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
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
                        v-if="!(fromdata.opinionSignList && fromdata.opinionSignList.length!==0)"
                        disabled
                        maxlength="500"
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=3)"
                        v-if="!editedIdeaFields.opinionSign && (!(fromdata.opinionSignList && fromdata.opinionSignList.length!==0))"
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
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="申请部门意见">
                    <!-- <div v-for="(item) in fromdata.repeatApplyDeptList" :key="item.id">
                      <div v-if="item.status" class="d_flex">
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
                        v-model="fromdata.repeatApplyDept"
                        v-if="!(fromdata.repeatApplyDeptList && fromdata.repeatApplyDeptList.length!==0)"
                        disabled
                      ></el-input>
                      <!-- <button
                        @click="writelistbox(clickTypes=2)"
                        v-if="!editedIdeaFields.repeatApplyDept && (!(fromdata.repeatApplyDeptList && fromdata.repeatApplyDeptList.length!==0))"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>-->
                    </div>
                    <opinionText
                      :opinionText="fromdata.repeatApplyDeptList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                    <!-- <el-input type="textarea" resize="none" autosize v-model="fromdata.repeatApplyDept">
                      <el-button slot="append" icon="el-icon-edit" @click="handleDptmMsg"></el-button>
                    </el-input>-->
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
                        v-model="fromdata.comments"
                        v-if="fromdata.commentsId||!(fromdata.commentsList && fromdata.commentsList.length!=0)"
                        disabled
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
                <el-col>
                  <el-form-item label="最终意见">
                    <template>
                      <!-- <div v-for="(item) in fromdata.finalOpinionList" :key="item.id">
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
                      </div>-->
                      <div class="fix_height">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          style="flex:1"
                          @input="inputChange"
                          v-model="fromdata.finalOpinion"
                          v-if="fromdata.finalOpinionId|| !(fromdata.finalOpinionList && fromdata.finalOpinionList.length!==0)"
                          disabled
                        ></el-input>
                        <!-- <button
                          @click="writelistbox(clickTypes=2)"
                          v-if="!editedIdeaFields.finalOpinion"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-edit"></i>
                        </button>-->
                      </div>
                      <opinionText
                        :opinionText="fromdata.finalOpinionList"
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
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
                      </div>-->
                      <div class="fix_height">
                        <el-input
                          type="textarea"
                          resize="none"
                          autosize
                          style="flex:1"
                          @input="inputChange"
                          v-model="fromdata.processOpinion"
                          v-if="fromdata.processOpinionId || !(fromdata.processOpinionList && fromdata.processOpinionList.length!==0)"
                          disabled
                        ></el-input>
                        <!-- <button
                          @click="writelistbox(clickTypes=1)"
                          v-if="!editedIdeaFields.processOpinion"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-plus"></i>
                        </button>-->
                      </div>
                      <opinionText
                        :opinionText="fromdata.processOpinionList"
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
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
          </el-form>
        </div>
      </div>
    </div>
    <!--收回-->
    <el-dialog
      :visible.sync="showRegain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      v-dialogDrag
      title="收回"
    >
      <h6 class="back_tit">确定要收回该文件吗?</h6>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showRegain = false">取 消</el-button>
        <el-button type="primary" @click="handleRegain">收 回</el-button>
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
            <el-button type="text" style="text-align:left;padding-left:10px;line-height:25px;word-break:break-all;white-space:pre-line;" @click="viewFile(bank_import, '1')">{{bank_import.title}}</el-button>
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
      :checkOrg="checkOrg"
      :fromdata="fromdata"
      :treeTradeCode="treeTradeCode"
      :loadingTree="loadingTree"
    ></treeCopy>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import uploadFiles from "@/components/uploadFile/uploadFile";
import treeCofig from "@/components/tree/tree-fawen";
import treeCopy from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";
import viewDraft from "@/minixs/viewDraft";
import minixs from "@/minixs/index";
import textInternational from "@/minixs/textInternational";
import opinionText from "@/components/opinionText/indexDsipatch";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from '@/components/sideBar/sideBar';

export default {
  name: "App",
  components: {
    timeDialog,
    treeCopy,
    opinionText,
    sideBar
  },
  mixins: [minixs,viewDraft,dispatchIndex,textInternational],
  data() {
    return {
      loadingTree: false,
      unitId: "",
      checkOrg:false,
      treeTradeCode:'',//人员树交易线
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

      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
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
        processInstId: "",
        isSystem: "1" // 流程调度标识（流程调度的单子不能收回）
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        curNodeId: "",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: "",
        wfeUnitId: ""
      },
      //弹窗下拉框
      bank_selectConfig: {
        function: "getAllNodeInfo",
        curNodeId: "",
        curTplNo: "",
        curMultiTenancyId: "",
        tTplNo: "",
        multiTenancyId: "",
        pcsAvyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "getAgainSignInfo",
        id: "",
        unitId: ""
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
      //保存
      bank_saveOrUpdateAgainSign: {
        function: "saveOrUpdateAgainSign",
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
        opinionCheckList: "",
        opinionDrafList: "",
        opinionSendList: "",
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
        wfeUnitId: "",
        eleSendSecretType: "",
        finalOpinion: "",
        processOpinion: ""
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
      // 知悉范围定密依据是否显示
      showBySecret: false,

      // 是否能被收回
      readFlag:"",
      allowBack:"",
      showRegain: false, // 是否收回
      // 收回
      bank_regain: {
        function: 'withdrawSubTask',
        pcsAvyId: '',
        multiTenancyId: 'CN005'
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
      showUnionDepartment: true,

      // 文种显示
      showTextType: true,
      showmeetingEndTime: false,

      // 修改标题
      showNweTitle: false,
      showNewAttachTitle: false,
      
      //正文
      showDraft:false,
      draftFlag:'newFile',//正文类型 默认空白文档
      zhengWenState:'',

      // 流程调度
      bank_flowConfig: {
        function: "selWfNode",
        curMultiTenancyId: "",
        curTplNo: "",
        workflowId: ""
      },
      mainPage: true,
      isFinish: false,
      interval: null,
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
    this.$nextTick(function() {
      this.textChange('send','page')
      // document
      //   .querySelector("#bank_dispach_content")
      //   .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
    
  },
  methods: {
    async processScheduling() {
      let that = this;
      this.dialogTit = "流程调度";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "finishAndSendSighWf";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.bank_selectConfig.unitId = this.unitId;
      // this.loadingTree = true;
          this.$post
            .postData(
              "getAllNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.$businessCode.fawgl
            )
            .then(res => {
              if (res.success) {
                this.seletOptionsData = res.data.filter(item=>item.PCSAVYID!=800) || [];
                that.bank_flowConfig.wfeUnitId = that.unitId
                let parms = Object.assign({}, this.fromdata,this.bank_flowConfig);
                parms.pcsAvyId = this.bank_flowConfig.pcsAvyId = res.data[0].PCSAVYID;
                parms.unitId = this.unitId;
                parms.function = "selWfNode"
                this.$post
                  .postData(
                    "selWfNode",
                    JSON.stringify(parms),
                    this.$businessCode.fawgl
                  )
                  .then(resTree => {
                    this.treeData = resTree.data;
                    console.log(this.treeData);
                    if (resTree.message == "Loading") {
                      this.loadingTree = true;
                    } else {
                      this.loadingTree = false;
                    }
                    this.treeData = resTree.data&&resTree.data.data||[];
                    this.defaultUser = resTree.data&&resTree.data.defaultUser||{};
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
          unitId: this.unitId
        }
        let obj1=await this.$post.postData(
            "getAgainSignInfoAdmin",
            JSON.stringify(Object.assign(data,{function :"getAgainSignInfoAdmin",})),this.$businessCode.fawgl
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        let obj2=await this.$post.postData(
            "getAgainSignOrderOpintions",
            JSON.stringify(Object.assign(data,{function :"getAgainSignOrderOpintions"})),this.$businessCode.fawgl
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        let obj3=await this.$post.postData(
            "getSendAttachmentPo",
            JSON.stringify(Object.assign(data,{function :"getSendAttachmentPo", dataId:this.fromdata.againOrderId})),this.$businessCode.fawgl
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        // if(obj1&&obj2){
          const routeData = this.$router.resolve({
              path: "/maintainFiles",
              query: {
                id: this.$route.query.id,
                sendType:'电子',
                type:'fw',
                sign: 4,
                selectUrl:"getAgainSignInfo",
                mainPage: this.mainPage,
                isFinish: this.isFinish,
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
      this.$post.postData('withdrawSubTask', JSON.stringify(this.bank_regain), this.$businessCode.fawgl).then((res) => {
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
          this.bank_doSend.curNodeCode = this.fromdata.currentNodeId;
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
      this.bank_doSend.unitId = this.unitId;
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
          this.fromdata.wfeUnitId = this.bank_send.wfeUnitId = this.unitId
          this.$post
            .postData(
              "selWfNode",
              JSON.stringify(this.bank_send),
              this.$businessCode.fawgl
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
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEdit() {
      let that = this;
      that.bank_dispach.unitId = that.$route.query.unitId||"";
      this.bank_dispach.choseYear = this.$route.query.choseYear||"";
      this.$post
        .postData(
          "getAgainSignInfo",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(JSON.parse(localStorage.getItem("userInfo")));
          console.log(res);
          if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
            that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文重发会签处理单";
          } else {
            that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文重发会签处理单";
          }
          // if (res.data.secretType) {
          //   this.secretTypechange(res.data.secretType, true);
          // }
          // if (res.data.secretLimitType) {
          //   this.workSecurityTab(res.data.secretLimitType, true);
          // }
          that.fromdata = Object.assign(that.fromdata, res.data);

          that.nowUserId = res.data.currentUserId || ''

          that.fromdata.meetingEndTime = dateFormate.dataFormat(Date.parse(new Date(that.fromdata.meetingEndTime)))

          if (that.fromdata.newTitle && that.fromdata.showNweTitle !== '') {
            this.showNweTitle = true
          } else {
            this.showNweTitle = false
          }

          if(res.data.currentNodeId!='800') {
            that.isFinish = true
          } else {
            that.isFinish = false
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
          this.bank_selectConfig.pTplNo = res.data.tplNo;
          this.bank_selectConfig.tplNo = res.data.tplNo;
          this.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;
          this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
          this.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;

          this.bank_flowConfig.curTplNo = res.data.tplNo;
          this.bank_flowConfig.curMultiTenancyId = res.data.multiTenancyId;

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
          that.fromdata.repeatOfficeList =
            res.data &&
            res.data.repeatOfficeList
          that.fromdata.opinionSignList =
            res.data &&
            res.data.opinionSignList
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
          that.cuteData("repeatOffice", "repeatOfficeList", "repeatOfficeId");
          that.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          that.cuteData("finalOpinion", "finalOpinionList", "finalOpinionId");
          that.cuteData("processOpinion", "processOpinionList", "processOpinionId");
          that.cuteData("comments", "commentsList", "commentsId");
        });
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
      this.bank_saveOrUpdateAgainSign.sequenceSign = 0;
      var obj = Object.assign(this.fromdata, this.bank_saveOrUpdateAgainSign);
      obj.unitId = this.unitId;
      this.$post
        .postData(
          "saveOrUpdateAgainSign",
          JSON.stringify(obj),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.bank_saveOrUpdateAgainSign.id = this.bank_dispach.id =
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
              if (this.showNweTitle) this.showNweTitle = true
              if (this.showNewAttachTitle) this.showNewAttachTitle = true
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
      obj.unitId  =this.unitId;
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.fawgl)
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
          })
        })
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
      if(!getFormId(this.$route.query.id,"bankDispachId")){
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
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState!=1?'viewFile':this.draftFlag,
          id:getFormId(this.$route.query.id,"bankDispachId"),
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          formState:'complete',
          showBtns:this.zhengWenState==0?false:true,
          processInstId:this.fromdata.processInstId,
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
        path: "/dzfwcfhqd",
        query: {
          id: this.bank_dispach.id,
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
      if (type && this.fromdata.secretFlagType === "商业秘密") {
        this.fromdata.secretFlagType = "";
      }

      this.$forceUpdate();
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
        //this.copyRules.secretLimitType[0].required = true;
        //this.copyRules.secretFlagType[0].required = true;
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = false;
        // this.copyRules.secretFlag[0].required = true;
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
    //收回
    handleBack(){
      this.$post.postData("withdrawSubTask", JSON.stringify(
          {function:"withdrawSubTask",
           pcsAvyId:this.fromdata.pcsAvyId,
           multiTenancyId:this.fromdata.multiTenancyId,
           unitId: this.unitId}
        ), this.$businessCode.fawgl)
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
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "收回失败"+erro.message,
            duration: 1000
          })
        })
    }
  },
  created() {
    //初始化加载数据
    this.bank_dispach.id = this.uploadConfig.id = this.bank_doSend.id = this.$route.query.id
      ? this.$route.query.id
      : "";
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.unitId = this.$route.query.unitId||"";
    this.treeTradeCode = this.$businessCode.ggfawgl;  //完成并发送 树 流程交易线   chai
    this.toEdit();
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
</style>
