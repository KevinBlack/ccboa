<template>
  <div id="bankRecountersign" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>会签处理单
        </p>
        <div class="grid_comtent" v-if="fromdata.isMutil == 1">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <!-- <el-button size="small" plain @click="preserve('save')">保存</el-button> -->
          <el-button size="small" plain @click="shdialog2=true">反馈意见</el-button>
          <el-button
            size="small"
            plain
            @click="completeSending"
            v-if="fromdata.isShowSendXb=='0'&&!fromdata.isLastXb"
          >选择多人会签</el-button>
          <el-button
            size="small"
            plain
            @click="shxbr('sh')"
            v-if="fromdata.isShowSendXb=='1'&&!fromdata.isLastXb"
          >收回多人会签</el-button>
          <el-button
            size="small"
            plain
            @click="shxbr('cb')"
            v-if="fromdata.isShowSendXb=='1'&&!fromdata.isLastXb"
          >催办多人会签</el-button>
          <el-button size="small" plain @click="drafting('0')" v-if="fromdata.filePath">查看正文</el-button>
          <el-button size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="processSheet('/dzfwcld')">打印处理单</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
        </div>
        <div class="grid_comtent" v-else>
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
      </div>-->

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
                <el-col :span="24">
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" disabled>
                      <!-- <template slot="append"><a href="#" @click="handleShowNewTitle">修改标题</a></template> -->
                    </el-input>
                  </el-form-item>
                  <el-form-item v-if="showNewTitle" label="修改后标题" prop="newTitle">
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
                      style="flex:1"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item v-if="showNewAttachTitle" label="修改后附件标题" prop="newAttachTitle">
                    <el-input
                      v-model="fromdata.newAttachTitle"
                      type="textarea"
                      resize="none"
                      autosize
                      style="flex:1"
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
                          maxlength="500"
                          style="flex:1"
                          @input="inputChange"
                          v-model="fromdata.finalOpinion"
                          v-if="!editedIdeaFields.finalOpinion||fromdata.finalOpinionId|| !(fromdata.finalOpinionList && fromdata.finalOpinionList.length!==0)"
                          :disabled="editedIdeaFields.finalOpinion"
                        ></el-input>
                        <button
                          @click="writelistbox(clickTypes=2,fromdata.finalOpinion&&fromdata.finalOpinion.length)"
                          v-if="!editedIdeaFields.finalOpinion"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-edit"></i>
                        </button>
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
                          maxlength="500"
                          style="flex:1"
                          @input="inputChange"
                          v-model="fromdata.processOpinion"
                          v-if="(!editedIdeaFields.processOpinion||fromdata.processOpinionId || !(fromdata.processOpinionList && fromdata.processOpinionList.length!==0))&&fromdata.isMutil != 1"
                          :disabled="editedIdeaFields.processOpinion"
                        ></el-input>
                        <button
                          @click="writelistbox(clickTypes=1,fromdata.processOpinion&&fromdata.processOpinion.length)"
                          v-if="!editedIdeaFields.processOpinion&&fromdata.isMutil != 1"
                          type="button"
                          class="el-button el-button--default dimi_btn"
                        >
                          <i class="el-icon-edit"></i>
                        </button>
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
        <!--查看依据文件-->
      </div>
    </div>
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
    <!-- 清空所有过程意见 -->
    <el-dialog v-dialogDrag title="清空所有过程意见" :visible.sync="clearYjFlag" width="60%">
      <span>请确认是否删除所有过程意见，是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearYjFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleDelOpin">确 定</el-button>
      </span>
    </el-dialog>
    <!--关闭-->
    <el-dialog v-dialogDrag title="关闭" :visible.sync="showCloseDialog">
      <el-row>
        <el-col
          style="text-aling:center;font-size:16px;line-height:60px;text-indent:2em;"
        >"是否保存并退出当前页面?"</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('2')">否</el-button>
        <el-button type="primary" @click="handleClose('1')">是</el-button>
      </span>
    </el-dialog>
    <!-- 多人协办反馈意见弹窗 -->
    <el-dialog
      v-dialogDrag
      title="反馈意见"
      :before-close="handleCloseManyAssist"
      :visible.sync="shdialog2"
      width="50%"
    >
      <el-card>
        <el-input
          type="textarea"
          maxlength="500"
          resize="none"
          autosize
          @input="changeDage($event)"
          v-model="fromdata.processOpinion"
        ></el-input>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseManyAssist">取 消</el-button>
        <el-button type="primary" @click="doFinishManyAssist">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 多人协办收回 -->
    <el-dialog v-dialogDrag :title="titleTypeForDr" :visible.sync="shdialog1" width="50%">
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox v-for="item in shDataDR" :label="item.id" :key="item.id">{{ item.curUser }}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQDRueding">确 定</el-button>
      </span>
    </el-dialog>
    <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
      :loadingTree="loadingTree"
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
      :treeTradeCode="treeTradeCode"
      :iswcbfs="iswcbfs"
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
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
import minixs from "@/minixs/index";
import isNowUser from "@/minixs/isNowUser";
import textInternational from "@/minixs/textInternational";
import viewDraft from "@/minixs/viewDraft";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/indexDsipatch";
import closeMessage from "components/closeMessage/index";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from "@/components/sideBar/sideBar";

export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    appendWriteList,
    opinionText,
    closeMessage,
    sideBar
  },
  mixins: [minixs, viewDraft, dispatchIndex, textInternational, isNowUser],
  data() {
    return {
      shdialog1: false,
      shDataDR: [],
      checkNames: [],
      checkIdNames: [],
      checkpcyNames: [],
      checkedsh: [], //收回列表
      titleTypeForDr: "",
      iswcbfs: false,
      shdialog2: false,

      closeHandler: false,
      showCloseDialog: false,
      //清空所有过程意见弹窗
      clearYjFlag: false,

      defaultUser: {}, //完成并发送默认值
      zf: false,
      treeTradeCode: "", //人员树交易线
      //表单控制参数
      huanJieMessage: {},
      scwh: true,
      th: false,
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "查看正文", type: "btn_ckzw", show: false },
        { name: "选择会签人", type: "btn_xzhqr", show: false },
        { name: "提交最终意见", type: "btn_tjzzyj", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "打印处理单", type: "btn_dycld", show: false },
        { name: "清空过程意见", type: "btn_delopin", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],
      //可编辑意见域
      editedIdeaFields: {
        finalOpinion: true,
        processOpinion: true,
        opinionSend: true,
        repeatOffice: true,
        opinionSign: true,
        comments: true
      },
      //必填意见域
      requiredIdeaFields: {
        finalOpinion: false,
        processOpinion: false,
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
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "doDeletesendOrderOpinion",
        id: ""
      },

      loadingTree: false,
      draftOrganTitle: "",
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
        function: "getAgainSignInfo",
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
        attachTitle: "",
        attachSort: [],
        attchmentFileInfo: [],
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
        pTplNo: "",
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
        repeatApplyDeptList: "",
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
      rules: {},
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

      nowUserId: "", //当前用户id

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

      //常用意见
      offenDevices: [],
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

      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },

      // 文种显示
      showTextType: true,
      showmeetingEndTime: false,
      showUnionDepartment: true,
      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      // 修改标题
      showNewTitle: false,
      showNewAttachTitle: false
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
    this.$nextTick(function() {
      this.textChange("send", "page");
      // document
      //   .querySelector("#bank_dispach_content")
      //   .addEventListener("scroll", this.onScroll);
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
        case "btn_ckzw":
          this.drafting();
          break;
        case "btn_delopin":
          this.handleClearYj();
          break;
        case "btn_xzhqr":
          this.completeSendingIsTrue();
          break;
        case "btn_tjzzyj":
          this.commit();
          break;
        case "btn_sc":
          this.collect("againSign", this.bank_dispach.id);
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
      // this.requiredFields = this.setRequiredIdeaFields(
      //   this.requiredFields,
      //   this.huanJieMessage.requiredFields
      // ); //必填控制
      // this.readFields = this.setReadFields(
      //   this.readFields,
      //   this.huanJieMessage.readFields
      // ); //不可编辑控制域
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
          // type: [
          //   {
          //     required: this.requiredFields.type,
          //     trigger: "change",
          //     message: "请选择发文类型"
          //   }
          // ],
          // redHead: [
          //   {
          //     required: this.requiredFields.redHead,
          //     trigger: "change",
          //     message: "请选择代字/红头"
          //   }
          // ],
          // businessType: [
          //   {
          //     required: this.requiredFields.businessType,
          //     trigger: "change",
          //     message: "请选择业务分类"
          //   }
          // ],
          // textType: [
          //   { required: this.requiredFields.textType, trigger: "change", message: "请选择文种" }
          // ],
          // draftDepartment: [
          //   { required: this.requiredFields.draftDepartment, trigger: "blur", message: "请输入主办部门" }
          // ],
          // userRange: [
          //   { required: this.requiredFields.userRange, trigger: "change", message: "请选择档案利用范围" }
          // ],
          // isStandardFile: [
          //   {
          //     required: this.requiredFields.isStandardFile,
          //     trigger: "change",
          //     message: "请选择规章/规范性文件"
          //   }
          // ],
          // keepLimit: [
          //   {
          //     required: this.requiredFields.keepLimit,
          //     trigger: "change",
          //     message: "请输入保管期限"
          //   }
          // ],
          // phone: [{ required: this.requiredFields.phone, trigger: "blur", message: "请输入联系电话" }],
          // isDirect: [
          //   { required: this.requiredFields.isDirect, trigger: "change", message: "请选择直发文件" }
          // ],
          // title: [{ required: this.requiredFields.title, trigger: "blur", message: "请输入正文标题" }],
          // main: [{ required: this.requiredFields.main, trigger: "change", message: "请选择主送" }],
          // name: [
          //   { required: this.requiredFields.name, message: "请输入标题名称", trigger: "blur" },
          //   { min: 3, max: 5, message: "3-5个字", trigger: "blur" }
          // ],
          // secretType: [
          //   {
          //     required: this.requiredFields.secretType,
          //     trigger: ["blur", "change"],
          //     message: "请选择秘密类型"
          //   }
          // ],
          // workSecretFlag: [
          //   { required: this.requiredFields.workSecretFlag, trigger: "blur", message: "请选择秘密标志" }
          // ],
          // secretLimitType: [
          //   {
          //     required: this.requiredFields.secretLimitType,
          //     trigger: "change",
          //     message: "请选择秘密期限类型"
          //   }
          // ],
          // secretFlagType: [
          //   {
          //     required: this.requiredFields.secretFlagType,
          //     trigger: "blur change",
          //     message: "请选择秘密标志"
          //   }
          // ]
        };
      });
      this.$forceUpdate();
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
      this.$post
        .postData(
          "finishAndSendSighWf",
          JSON.stringify(Object.assign({}, this.fromdata, this.bank_doSend)),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            if (this.fromdata.isMutil != 1) {
              this.handleSetLoacl();
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送成功",
                duration: 1500,
                onClose: () => {
                  window.location.href = "about:blank";
                  if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                    window.opener.location.reload();
                  }
                  window.close();
                }
              });
            } else {
              location.reload();
            }
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
    //收回协办人
    shxbr(type) {
      this.checkedsh = [];
      this.shdialog1 = true;
      let parms;
      //let fun=''
      if (type == "cb") {
        this.titleTypeForDr = "催办操作";
        //fun="selectTakeBackManyAssistUser";
        parms = {
          function: "selectTakeBackManyAssistUser",
          id: this.fromdata.id,
          isMutil: this.fromdata.isMutil,
          type: "cuiban",
          multiTenancyId: this.fromdata.multiTenancyId
        };
      } else {
        //fun="selectTakeBackManyAssistUser";
        this.titleTypeForDr = "收回操作";
        parms = {
          function: "selectTakeBackManyAssistUser",
          id: this.fromdata.id,
          isMutil: this.fromdata.isMutil,
          multiTenancyId: this.fromdata.multiTenancyId
        };
      }
      this.$post
        .postData(
          "selectTakeBackManyAssistUser",
          JSON.stringify(parms),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.shDataDR = res.data;
            this.$forceUpdate();
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    getNewName(value) {
      let a = value;
      this.checkNames = [];
      this.checkIdNames = [];
      this.checkpcyNames = [];
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < this.shDataDR.length; j++) {
          if (this.shDataDR[j].id == a[i]) {
            this.checkNames.push(this.shDataDR[j].curUser);
            this.checkIdNames.push(this.shDataDR[j].id);
            this.checkpcyNames.push(this.shDataDR[j].pcsAvyId);
          }
        }
      }
    },
    shQDRueding() {
      let that = this;
      if (this.checkNames.length < 1) {
        this.$message({
          message: "请选择人员",
          type: "error"
        });
        return;
      }
      if (this.titleTypeForDr == "催办操作") {
        let parms = {
          function: "cuibanManyAssist",
          ids:
            this.checkIdNames.length > 1
              ? this.checkIdNames.join(";")
              : this.checkIdNames[0],
          humanNames:
            this.checkNames.length > 1
              ? this.checkNames.join(";")
              : this.checkNames[0],
          pcsAvyIds: this.fromdata.pcsAvyIds,
          isMutil: this.fromdata.isMutil,
          multiTenancyId: this.fromdata.multiTenancyId
        };
        this.$post
          .postData(
            "cuibanManyAssist",
            JSON.stringify(parms),
            this.$businessCode.fawgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                message: "催办成功",
                type: "success"
              });
              this.shdialog1 = false;
              this.$forceUpdate();
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
      } else {
        let parms = {
          function: "takeBackByMainManyAssist",
          ids:
            this.checkIdNames.length > 1
              ? this.checkIdNames.join(";")
              : this.checkIdNames[0],
          humanNames:
            this.checkNames.length > 1
              ? this.checkNames.join(";")
              : this.checkNames[0],
          pcsAvyIds:
            this.checkpcyNames.length > 1
              ? this.checkpcyNames.join(";")
              : this.checkpcyNames[0],
          multiTenancyId: this.fromdata.multiTenancyId,
          isMutil: this.fromdata.isMutil
        };
        this.$post
          .postData(
            "takeBackByMainManyAssist",
            JSON.stringify(parms),
            this.$businessCode.fawgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                message: "收回成功",
                type: "success",
                duration: 500
              });
              this.shdialog1 = false;
              if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                window.opener.location.reload();
              }
              setTimeout(() => {
                if (that.checkNames.length == that.shDataDR.length) {
                  window.close();
                } else {
                  this.$forceUpdate();
                  location.reload();
                }
              }, 1000);
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
      }
    },
    handleCloseManyAssist() {
      this.fromdata.processOpinion = "";
      this.shdialog2 = false;
    },
    doFinishManyAssist() {
      if (this.fromdata.processOpinion && this.fromdata.processOpinion != "") {
        let copyFrom = JSON.parse(JSON.stringify(this.fromdata));
        let params = Object.assign(copyFrom, {
          function: "doFinishManyAssist"
        });
        this.$post
          .postData(
            "doFinishManyAssist",
            JSON.stringify(params),
            this.$businessCode.fawgl
          )
          .then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "反馈成功",
                duration: 500,
                onClose: () => {
                  this.handleSetLoacl();
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
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 1500
              });
            }
          })
          .catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "反馈失败",
              duration: 1000
            });
          });
      } else {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请填写过程意见",
          duration: 1000
        });
      }
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      let that = this;
      this.preserve().then(resP => {
        if (resP) {
          this.dialogTit = "选择会签人";
          this.offenUse = true;
          this.canTab = false;
          this.treeData = [];
          this.dialogTypeNow = "finishAndSendSighWf";
          this.dialogType = "dosend";
          this.dialogTypeBack = true;
          this.singelCheckF = true; // 单选true 多选为false
          this.hasRadio = false;
          this.iswcbfs = true;
          this.showCompDialog();
          this.bank_selectConfig.curTplNo = that.fromdata.tplNo;
          this.bank_selectConfig.curMultiTenancyId =
            that.fromdata.multiTenancyId;
          this.bank_selectConfig.currentNode = that.fromdata.currentNode;
          this.bank_selectConfig.isMutil = that.fromdata.isMutil;
          this.$post
            .postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.$businessCode.fawgl
            )
            .then(res => {
              this.seletOptionsData = res.data || [];
              let params = Object.assign({}, this.fromdata, this.bank_send);
              params.function = "selWfNode";
              if (that.fromdata.isMutil == 1) {
                that.seletOptionsData = that.seletOptionsData.filter(item => {
                  return item.PCSAVYID == that.fromdata.currentNodeId;
                });
                that.bank_send.curTplNo = params.curTplNo = that.fromdata.tplNo;
                that.bank_send.curMultiTenancyId = params.curMultiTenancyId =
                  that.fromdata.multiTenancyId;
                that.bank_send.curNodeId = params.curNodeId =
                  that.fromdata.currentNodeId;
                params.pcsAvyId = that.seletOptionsData[0].PCSAVYID;
                params.flag = true;
                params.unitCode = "";
              } else {
                // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
                params.pcsAvyId = res.data && res.data[0].PCSAVYID;
                params.curTplNo = res.data && res.data[0].PTPLNO;
                params.curMultiTenancyId =
                  res.data && res.data[0].MULTITENANCYID;
              }
              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(params),
                  this.$businessCode.ggfawgl
                )
                .then(resTree => {
                  if (resTree.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  this.treeData = (resTree.data && resTree.data.data) || [];
                  this.defaultUser =
                    (resTree.data && resTree.data.defaultUser) || {};
                })
                .catch(e => {
                  console.log(e);
                });
            });
        }
      });
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
      this.preserve().then(save => {
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
              parms.function = "doReturnLastOperatorForSign";
              this.$post
                .postData(
                  "doReturnLastOperatorForSign",
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
                      duration: 500
                    });
                  }
                });
            });
        }
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
      this.bank_dispach.choseYear = this.$route.query.choseYear || "";
      this.$post
        .postData(
          "getAgainSignInfo",
          JSON.stringify(this.bank_dispach),
          that.$businessCode.fawgl
        )
        .then(res => {
          that.$route.query.readonlyFwcy ?? this.getIsNowUser(res, "fcy", "db");
          console.log(JSON.parse(localStorage.getItem("userInfo")));
          console.log(res);
          if (res.data.isSpecialHead && res.data.isSpecialHead == "1") {
            that.draftOrganTitle =
              res.data && res.data.draftDepartment + "电子发文重发会签处理单";
          } else {
            that.draftOrganTitle =
              res.data && res.data.draftOrgan + "电子发文重发会签处理单";
          }
          that.fromdata = Object.assign(that.fromdata, res.data);

          that.nowUserId = res.data.currentUserId || "";

          that.fromdata.meetingEndTime = res.data.meetingEndTime
            ? dateFormate.dataFormat(
                Date.parse(new Date(res.data.meetingEndTime))
              )
            : "";

          if (typeof that.fromdata.curUserIds == "string") {
            that.fromdata.curUserIds = that.fromdata.curUserIds.split(",");
          }

          if (that.fromdata.newTitle) {
            that.showNewTitle = true;
          }
          if (that.fromdata.newAttachTitle != "") {
            that.showNewAttachTitle = true;
          }

          // 控制
          if (res.data.processInstId) {
            that.$post
              .postData(
                "getNextUserTaskNode",
                JSON.stringify({
                  function: "getNextUserTaskNode",
                  processInstId: res.data.processInstId
                }),
                that.$businessCode.ggfawgl
              )
              .then(res => {
                that.huanJieMessage = res.data.extAttributes;
                that.setConfig();
                that.setFormConfig();
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            that.$post
              .postData(
                "getpcsTplStartNode",
                JSON.stringify({
                  function: "getpcsTplStartNode",
                  multiTenancyId: res.data.multiTenancyId
                }),
                that.$businessCode.ggfawgl
              )
              .then(res => {
                console.log(res.data);
                that.huanJieMessage = res.data;
                that.setConfig();
                that.setFormConfig();
              })
              .catch(err => {
                console.log(err);
              });
          }

          if (res.data.secretType) {
            that.secretTypechange(res.data.secretType, true);
          }
          if (res.data.secretLimitType) {
            that.workSecurityTab(res.data.secretLimitType, true);
          }

          if (that.fromdata.isDirect === "否") {
            that.zf = false;
          } else {
            that.zf = true;
          }

          if (
            that.fromdata.type == "部门发文" ||
            that.fromdata.type == "行发文"
          ) {
            this.showUnionDepartment = false;
          } else {
            this.showUnionDepartment = true;
          }
          if (
            res.data.type == "行发文" ||
            res.data.type == "部门发文" ||
            res.data.secretType == "党务发文"
          ) {
            this.showTextType = true;
            this.showmeetingEndTime = false;
          } else if (res.data.type === "会议纪要") {
            this.showmeetingEndTime = true;
            this.showTextType = false;
          } else {
            this.showTextType = false;
            this.showmeetingEndTime = false;
          }

          // 更新为已读
          if (that.$route.query.readFlag && that.readFlag != 1) {
            that.getReadFlag();
          }
          that.bank_doSend.curNodeCode = res.data.curNodeCode;
          that.bank_doSend.tplNo = res.data.tplNo;
          that.bank_doSend.pcsAvyId = res.data.pcsAvyId;
          that.bank_doSend.multiTenancyId = res.data.multiTenancyId;
          that.bank_doSend.processInstId = res.data.processInstId;
          that.banjiedispatch.multiTenancyId = res.data.multiTenancyId;
          that.banjiedispatch.curTplNo = res.data.pTplNo;
          that.banjiedispatch.pcsAvyId = res.data.pcsAvyId;
          that.banjiedispatch.processInstId = res.data.processInstId;
          that.banjiedispatch.curNodeCode = res.data.curNodeCode;
          that.bank_selectConfig.curNodeId = res.data.currentNodeId;
          that.bank_selectConfig.curTplNo = res.data.tplNo;
          that.bank_selectConfig.curMultiTenancyId = res.data.multiTenancyId;
          that.bank_selectConfig.pcsAvyId = res.data.pcsAvyId;

          that.createSighWf.processInstId = res.data.processInstId;
          that.createSighWf.id = that.bank_dispach.id;
          that.createSighWf.multiTenancyId = res.data.multiTenancyId;
          that.createSighWf.pcsAvyId = res.data.pcsAvyId;
          that.createSighWf.curTplNo = res.data.pTplNo;
          that.createSighWf.curNodeCode = res.data.curNodeCode;
          that.createSighWf.sequenceSign = "0";

          if (that.fromdata.secretType && that.fromdata.secretType !== "") {
            that.showBySecret = true;
          } else {
            that.showBySecret = false;
          }

          that.fromdata.opinionSendList = res.data && res.data.opinionSendList;
          that.fromdata.repeatOfficeList =
            res.data && res.data.repeatOfficeList;
          that.fromdata.opinionSignList = res.data && res.data.opinionSignList;
          that.fromdata.repeatApplyDeptList =
            res.data && res.data.repeatApplyDeptList;
          that.fromdata.finalOpinionList =
            res.data && res.data.finalOpinionList;
          that.fromdata.processOpinionList =
            res.data && res.data.processOpinionList;
          that.fromdata.commentsList = res.data && res.data.commentsList;

          that.fromdata.mainSend = res.data && res.data.mainSend;

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
            that.createSighWf.deptIds = res.data.signDepartmentId;
            that.createSighWf.deptNames = res.data.signDepartmentName;
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

          //临时意见处理
          that.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          that.cuteData("repeatOffice", "repeatOfficeList", "repeatOfficeId");
          that.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          that.cuteData(
            "repeatApplyDept",
            "repeatApplyDeptList",
            "repeatApplyDeptId"
          );
          that.cuteData("finalOpinion", "finalOpinionList", "finalOpinionId");
          that.cuteData(
            "processOpinion",
            "processOpinionList",
            "processOpinionId"
          );
          that.cuteData("comments", "commentsList", "commentsId");
        })
        .catch(err => {
          console.log(err.message);
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
    async preserve(type) {
      let successState = false;
      this.bank_dispach.id = this.bank_saveOrUpdateAgainSign.id = this.$route
        .query.id
        ? this.$route.query.id
        : sessionStorage.getItem("signpageid") || "";
      this.bank_saveOrUpdateAgainSign.sequenceSign = 0;
      var obj = Object.assign(
        {},
        this.fromdata,
        this.bank_saveOrUpdateAgainSign
      );
      await this.$post
        .postData(
          "saveOrUpdateAgainSign",
          JSON.stringify(obj),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            console.log(res, "保存返回");

            this.bank_saveOrUpdateAgainSign.id = this.bank_dispach.id =
              res.data.id;
            // this.bank_toQianbaoSend.id = res.data.id;
            sessionStorage.setItem("signpageid", res.data.id);
            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            if (this.fromdata.newTitle) {
              this.showNewTitle = true;
            }
            if (this.fromdata.newAttachTitle) {
              this.showNewAttachTitle = true;
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
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
            console.log(res, "赋值的");
            this.createSighWf.processInstId = res.data.processInstId;
            this.createSighWf.id = this.bank_dispach.id;
            this.createSighWf.curMultiTenancyId = res.data.multiTenancyId;
            this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            this.createSighWf.curTplNo = res.data.pTplNo;
            this.createSighWf.curNodeCode = res.data.curNodeCode;
            this.createSighWf.sequenceSign = "0";

            this.toEdit();
            successState = true;
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
    //发送会签部门
    huiqianSend() {
      this.preserve();
      var obj = Object.assign({}, this.fromdata, this.createSighWf);
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
      var obj = Object.assign({}, this.fromdata, this.banjiedispatch);
      this.$post
        .postData("doFinish", JSON.stringify(obj), this.$businessCode.ggfawgl)
        .then(res => {
          if (res && res.success) {
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
    async btnCloseHandler(val) {
      this.handleSetLoacl();
      if (val == 1) {
        window.close();
      } else if (val == 2) {
        await this.preserve(1);
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
            window.location.href = "about:blank";
            window.close();
          }
        });
      } else if (val == "2") {
        window.location.href = "about:blank";
        window.close();
      } else {
        this.showCloseDialog = false;
      }
    },
    handelclose() {
      this.showCloseDialog = true;
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
    doDraft(fileInfo) {
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      let data = this.$router.resolve({
        path: openPath,
        query: {
          state: "viewFile",
          id: getFormId(this.$route.query.id, "bankDispachId"),
          zhengWenState: this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          multiTenancyId: this.fromdata.multiTenancyId,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          tmpFileName: fileInfo ? fileInfo.fileNameTh : "",
          tmpFilePath: fileInfo ? fileInfo.filePathTh : "",
          isHasRedHead: fileInfo && fileInfo.fileNameTh ? true : false,
          pageFlag: "fawen",
          showBtns: this.zhengWenState == 0 ? false : true,
          processInstId: this.fromdata.processInstId,
          stepsNowName: this.fromdata.currentNode,
          flowTranId: this.$businessCode.fawgl //流程交易线    chai
        }
      });
      if (this.zhengWenState == 2) {
        localStorage.setItem("bankDispachpage", "true");
      }

      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
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
      this.preserve().then(save => {
        if (save) {
          const routeData = this.$router.resolve({
            path: "/dzfwcfhqd",
            query: {
              id: this.bank_dispach.id,
              choseYear: this.$route.query.choseYear || ""
            }
          });
          window.open(routeData.href, "_blank");
        }
      });
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
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
    handleSave() {},
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
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 过程意见
          this.fromdata.processOpinion = this.fromdata.processOpinion
            ? this.fromdata.processOpinion + data
            : data;
        } else if (this.clickTypes == 2) {
          // 最终意见
          this.fromdata.finalOpinion = this.fromdata.finalOpinion
            ? this.fromdata.finalOpinion + data
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
    // 提交最终意见
    commit() {
      if (
        (!this.fromdata.finalOpinion || this.fromdata.finalOpinion === "") &&
        !(
          this.fromdata.finalOpinionList &&
          this.fromdata.finalOpinionList.length !== 0
        )
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请填写最终意见",
          duration: 1000
        });
        return;
      }
      this.preserve().then(save => {
        if (save) {
          let bank_commit = {
            function: "doFinishHQXBCB",
            deptId: this.fromdata.deptId,
            deptName: this.fromdata.deptName,
            curNodeCode: this.fromdata.currentNodeId,
            parentId: this.fromdata.againOrderId
          };
          var obj = Object.assign({}, this.fromdata, bank_commit);

          this.$post
            .postData(
              "doFinishHQXBCB",
              JSON.stringify(obj),
              this.$businessCode.ggfawgl
            )
            .then(res => {
              this.handleSetLoacl();
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "提交成功",
                duration: 500,
                onClose: () => {
                  window.location.href = "about:blank";
                  if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                    window.opener.location.reload();
                  }
                  window.close();
                }
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: err.eassage,
                duration: 1000
              });
              return false;
            });
        }
      });
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
          this.$businessCode.fawglfj
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
    //清空所有过程意见
    handleClearYj() {
      this.clearYjFlag = true;
    },
    //确认清空所有过程意见
    handleDelOpin() {
      this.$post
        .postData(
          "doDeleteProcessOpinion",
          JSON.stringify({
            function: "doDeleteProcessOpinion",
            multiTenancyId: this.fromdata.multiTenancyId,
            id: this.bank_doSend.id
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 3000
            });
            this.fromdata.processOpinion = "";
            this.preserve();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 3000
            });
          }
          this.clearYjFlag = false;
        });
    }
  },
  created() {
    //初始化加载数据
    this.bank_dispach.id = this.uploadConfig.id = this.bank_saveOrUpdateAgainSign.id = this.bank_doSend.id = this
      .$route.query.id
      ? this.$route.query.id
      : "";
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl; //完成并发送 树   流程交易线   chai
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
