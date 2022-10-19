<template>
  <div id="rexamineDispach" class="bank_dispach">
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
                <span>{{fromdata.signState=='0'?'正在会签':fromdata.currentNode}}</span>
              </p>
              <p class="bank_dispach_annotation_current">
                当前处理人：
                <span>{{fromdata.currentUser}}</span>
              </p>
              <!-- <el-button size="small" class="bank_article_illustrates" @click="handleExplain">办文说明</el-button> -->
              <p class="bank_article_illustrates" v-if="fromdata.sendType=='电子'">
                <el-form-item label="是否在线审批" prop="onlineSp" ref="onlineSp">
                  <el-radio
                    v-model="fromdata.onlineSp"
                    :disabled="readFields.onlineSp&&fromdata.signState=='0'"
                    @input="inputChangeOnline"
                    label="是"
                  >是</el-radio>
                  <el-radio
                    v-model="fromdata.onlineSp"
                    :disabled="readFields.onlineSp&&fromdata.signState=='0'"
                    @input="inputChangeOnline"
                    label="否"
                  >否</el-radio>
                </el-form-item>
              </p>
            </div>
            <!-- 文件要素 -->
            <h6 class="bank_dispach_file_tit mrg-b-20">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <!-- <el-input v-model="fromdata.title" disabled>
                      <template slot="append"><a v-if="!(fromdata.signState=='0')" @click="handleShowNewTitle">修改标题</a></template>
                    </el-input>-->
                    <div style="display:flex">
                      <el-input style="flex:1" disabled v-model="fromdata.title"></el-input>
                      <button
                        @click="handleShowNewTitle"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-if="!(fromdata.signState=='0')"
                      >
                        <!-- <i class="el-icon-edit"></i> -->
                        修改标题
                      </button>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="showNweTitle" label="修改后标题" prop="newTitle">
                    <el-input v-model="fromdata.newTitle" :disabled="fromdata.signState=='0'"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="附件标题" prop="attachTitle">
                    <!-- <el-input type="textarea" resize="none" autosize v-model="fromdata.attachTitle" disabled>
                      <template slot="append"><a href="#" @click="handleShowNweAttachTitle">修改附件标题</a></template>
                    </el-input>-->
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        style="flex:1"
                        disabled
                        v-model="fromdata.attachTitle"
                      ></el-input>
                      <button
                        @click="handleShowNweAttachTitle"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-if="!(fromdata.signState=='0')"
                      >
                        <!-- <i class="el-icon-edit"></i> -->
                        修改附件标题
                      </button>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="showNweAttachTitle" label="修改后附件标题" prop="newAttachTitle">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.newAttachTitle"
                      :disabled="fromdata.signState=='0'"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发文字号" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.documentNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文件形式" prop="sendType" ref="sendType">
                    <el-input v-model="fromdata.sendType" disabled></el-input>
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
                    <el-input v-model="fromdata.phone" maxlength="11" disabled></el-input>
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
                  <el-form-item label="直发范围" :span="8" v-if="fromdata.isDirect==='否' ? false :true">
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
                  <el-form-item
                    label="直发文种类"
                    :span="8"
                    v-if="fromdata.isDirect==='否' ? false :true"
                  >
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
                <el-col :span="24" v-if="fromdata.sendType=='电子'">
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
            <h6 class="bank_dispach_file_tit mrg-b-20">重发原因</h6>
            <div id="fsdx" class="height_90"></div>
            <div>
              <el-row>
                <el-col :span="15" v-if="fromdata.sendType=='电子'">
                  <el-form-item
                    label="重发会签"
                    prop="newSignDepartmentName"
                    ref="newSignDepartmentName"
                  >
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.newSignDepartmentName"
                        placeholder="请选择会签部门"
                        disabled
                        style="flex:1;color: #F00;"
                        @input="inputChange"
                        class="hqbm"
                      ></el-input>
                      <button
                        @click="bankmain('hui')"
                        v-if="!sendXbSuccess&&fromdata.currentNode!='发文人员重发'"
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
                <el-col :offset="1" :span="8" v-if="fromdata.sendType=='电子'">
                  <el-form-item
                    prop="finishNewSignDepartmentName"
                    ref="finishNewSignDepartmentName"
                  >
                    <el-input
                      v-model="fromdata.finishNewSignDepartmentName"
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
                  <el-form-item label="重发原因" prop="newReason" ref="newReason">
                    <el-input
                      v-model="fromdata.newReason"
                      :disabled="readFields.newReason||fromdata.signState=='0'"
                      type="textarea"
                      resize="none"
                      autosize
                      maxlength="500"
                      rows="3"
                      class="d_f1"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="修改内容" prop="newContext" ref="newContext">
                    <el-input
                      v-model="fromdata.newContext"
                      :disabled="readFields.newContext||fromdata.signState=='0'"
                      type="textarea"
                      resize="none"
                      autosize
                      maxlength="500"
                      rows="3"
                      class="d_f1"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 签批意见 -->
            <h6 class="bank_dispach_file_tit mrg-b-20">签批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="签发意见">
                    <!-- <div v-for="(item) in fromdata.opinionSendList" :key="item.id">
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
                        @blur="inputChange1"
                        v-model="fromdata.opinionSend"
                        v-if="!editedIdeaFields.opinionSend||fromdata.opinionSendId||!(fromdata.opinionSendList && fromdata.opinionSendList.length!==0)"
                        :disabled="(editedIdeaFields.opinionSend||fromdata.signState=='0')&&isOnlineSp"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=4,fromdata.opinionSend&&fromdata.opinionSend.length)"
                        v-if="!editedIdeaFields.opinionSend&&fromdata.signState!='0'"
                        type="button"
                        class="el-button el-button--default dimi_btn"
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
                  <el-form-item label="办公室负责人意见">
                    <!-- <div v-for="(item) in fromdata.repeatOfficeList" :key="item.id">
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        maxlength="500"
                        style="flex:1"
                        @blur="inputChange1"
                        v-model="fromdata.repeatOffice"
                        v-if="!editedIdeaFields.repeatOffice||fromdata.repeatOfficeId||!(fromdata.repeatOfficeList && fromdata.repeatOfficeList.length!==0)"
                        :disabled="(editedIdeaFields.repeatOffice||fromdata.signState=='0')&&isOnlineSp"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=2,fromdata.repeatOffice&&fromdata.repeatOffice.length)"
                        v-if="!editedIdeaFields.repeatOffice&&fromdata.signState!='0'"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-edit"></i>
                      </button>
                    </div>
                    <opinionText
                      :opinionText="fromdata.repeatOfficeList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="canDelet"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                    <!-- <el-input type="textarea" resize="none" autosize v-model="fromdata.repeatOffice" disabled></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col v-if="fromdata.sendType=='电子'">
                  <el-form-item label="会签意见">
                    <!-- <div v-for="item in fromdata.opinionSignList" :key="item.id">
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        maxlength="500"
                        style="flex:1"
                        @blur="inputChange1"
                        v-model="fromdata.opinionSign"
                        v-if="!editedIdeaFields.opinionSign || (fromdata.opinionSignId||!(fromdata.opinionSignList && fromdata.opinionSignList.length!==0))"
                        :disabled="editedIdeaFields.opinionSign||fromdata.signState=='0'"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=3,fromdata.opinionSign&&fromdata.opinionSign.length)"
                        v-if="!editedIdeaFields.opinionSign&&fromdata.signState!='0'"
                        type="button"
                        class="el-button el-button--default dimi_btn"
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
                  <el-form-item label="申请部门意见">
                    <!-- <div v-for="(item) in fromdata.repeatApplyDeptList" :key="item.id">
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
                    </div>-->
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        maxlength="500"
                        style="flex:1"
                        @blur="inputChange1"
                        v-model="fromdata.repeatApplyDept"
                        v-if="!editedIdeaFields.repeatApplyDept || (fromdata.repeatApplyDeptId||!(fromdata.repeatApplyDeptList && fromdata.repeatApplyDeptList.length!==0))"
                        :disabled="(editedIdeaFields.repeatApplyDept||fromdata.signState=='0')&&isOnlineSp"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=1,fromdata.repeatApplyDept&&fromdata.repeatApplyDept.length)"
                        v-if="!editedIdeaFields.repeatApplyDept&&fromdata.signState!='0'"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                    </div>
                    <opinionText
                      :opinionText="fromdata.repeatApplyDeptList"
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="canDelet"
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
                        maxlength="500"
                        autosize
                        v-model="fromdata.comments"
                        @blur="inputChange1"
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
                      :canDelet="canDelet"
                      :curNodeCode="fromdata.currentNodeId"
                    ></opinionText>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit mrg-b-20" v-if="fromdata.sendType=='电子'">附件</h6>
            <div id="scfj" class="height_90" v-if="fromdata.sendType=='电子'"></div>
            <div v-if="fromdata.sendType=='电子'">
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
                <uploadFiles
                  ref="uploadComponent"
                  v-if="fromdata.signState!='0'"
                  @preserve="preserve"
                  :uploadConfig="uploadConfig"
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
                                v-if="fromdata.signState!='0'"
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
    <!-- 办文说明 -->
    <el-dialog
      :visible.sync="showExplain"
      v-dialogDrag
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="办文说明"
    >
      <el-input type="textarea" resize="none" autosize></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">取 消</el-button>
        <el-button type="primary" @click="preserve">保存</el-button>
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
    <!--查看会签流程-->
    <el-dialog v-dialogDrag title="查看子流程" :visible.sync="cbxbchakan">
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
    <!-- 重新发送弹窗 -->
    <el-dialog title="选择重发类型" v-dialogDrag :visible.sync="dialog_resand" width="50%">
      <el-card class="dialog_regain">
        <el-radio-group v-model="checkedcf">
          <el-row>
            <el-col style="margin-bottom: 10px;">
              <el-radio :label="0">上级行退文</el-radio>
            </el-col>
            <el-col style="margin-bottom: 10px;">
              <el-radio :label="1">本行收回</el-radio>
            </el-col>
            <el-col style="margin-bottom: 10px;">
              <el-radio :label="2">增发</el-radio>
            </el-col>
            <el-col style="margin-bottom: 10px;">
              <el-radio :label="3">其它(注:当前选项中才可以追加以此文件为准的前缀)</el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_resand = false">取 消</el-button>
        <el-button type="primary" @click="handleResand()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发送/特殊发送 -->
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
        <el-row>
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
      </p>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSend = false">取 消</el-button>
        <el-button type="primary" @click="handleSendConfirm">发 送</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      :visible.sync="specialDialog"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      title="特殊发送"
    >
      <el-row>
        <el-col>
          <!-- 附件 -->
          <el-row class="mgn-b-10">
            <el-col :span="12">
              <h6 class="bank_dispach_file_tit">附件</h6>
            </el-col>
            <el-col :span="12" style="text-align: right;">
              <el-button
                size="small"
                :disabled="uploadConfig.hasFuCheck"
                @click="backbankmain('sendObjAll','noBackShow')"
              >批量选择发送单位</el-button>
            </el-col>
          </el-row>
          <div id="scfj" class="height_90"></div>
          <el-row>
            <!-- <loadAccessory></loadAccessory> -->
            <uploadFileSpecial
              @backbankmain="backbankmain"
              ref="uploadComponent"
              @preserve="preserve"
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
    <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
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
      :fromdata="fromdata"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
      :sequenceFlag="isSXHQ"
      :setradio="sequenceSign"
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
import treeCofig from "@/components/tree/tree-fawen";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import scrollIntoForm from "@/util/scrollValid";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import isNowUser from "@/minixs/isNowUser";
import textInternational from "@/minixs/textInternational";
import dispatchIndex from "@/minixs/dispatchIndex";
import viewDraft from "@/minixs/viewDraft";
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";
import opinionText from "@/components/opinionText/indexDsipatch";
import closeMessage from "components/closeMessage/index";
import sideBar from "@/components/sideBar/sideBar";

export default {
  name: "RexamineDispatch",
  components: {
    opinionText,
    timeDialog,
    treeCofig,
    appendWriteList,
    uploadFiles,
    closeMessage,
    sideBar
  },
  mixins: [minixs, viewDraft, dispatchIndex, textInternational, isNowUser],
  data() {
    return {
      closeHandler: false,
      showCloseDialog: false,
      sequenceSign: "",
      isSXHQ: false, // 顺序会签单选按钮是否可编辑
      isOnlineSp: true,
      needXSSP: {},
      fawglCode: "",
      defaultUser: {}, //完成并发送默认值
      treeTradeCode: "", //人员树交易线
      // nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前用户id
      nowUserId: "", //当前用户id
      //表单控制参数
      huanJieMessage: {},
      scwh: true,
      th: false,
      fhqbm: true,
      ckhqzt: false,
      qinggao: false,
      chulizw: false,
      chakanzw: false,
      buttonList: [
        { name: "保存", type: "btn_bc", show: false },
        { name: "完成并发送", type: "btn_wcbfs", show: false },
        { name: "重新发送", type: "btn_cxfs", show: false },
        // { name: "特殊发送", type: "btn_tsfs", show: false },
        { name: "发会签部门", type: "btn_fhqbm", show: this.fhqbm },
        { name: "修改正文", type: "btn_clzw", show: this.chulizw },
        { name: "查看正文", type: "btn_ckzw", show: this.chakanzw },
        { name: "清稿", type: "btn_qinggao", show: this.qinggao },
        { name: "恢复清稿前正文", type: "btn_huifuqg", show: this.huifuqg },
        { name: "查看会签状态", type: "btn_ckzlc", show: this.ckhqzt },
        { name: "删除此重发审批单", type: "btn_sccw", show: false },
        { name: "返回上一处理人", type: "btn_fhsyclr", show: false },
        { name: "办结", type: "btn_banjie", show: false },
        { name: "查看流程", type: "btn_cklc", show: false },
        { name: "打印处理单", type: "btn_dycld", show: false },
        { name: "操作指南", type: "btn_czzn", show: false }
      ],
      //不可编辑控制域
      readFields: {
        title: false,
        fileFlag: false,
        oldQfr: false,
        hostDepartment: false,
        phone: false,
        isDirect: false,
        newReason: false,
        newContext: false,
        onlineSp: false
      },
      //必填控制域
      requiredFields: {
        title: false,
        fileFlag: false,
        oldQfr: false,
        hostDepartment: false,
        phone: false,
        isDirect: false,
        newReason: false,
        newContext: false
      },
      //可编辑意见域
      editedIdeaFields: {
        opinionSend: true,
        repeatOffice: true,
        opinionSign: true,
        repeatApplyDept: true,
        comments: true
      },
      //必填意见域
      requiredIdeaFields: {
        opinionSend: false,
        repeatOffice: false,
        opinionSign: false,
        repeatApplyDept: false,
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

      draftOrganTitle: "",
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      // 修改标题
      showNweTitle: false,
      showNweAttachTitle: false,
      //秘密期限类型
      flag: true,
      // 申请部门意见弹框
      showDptmMsg: false,
      // 秘密标志
      secretflag: true,
      secretTypeflag: false,
      //确定完成并发送
      bank_doSend: {
        function: "doSendAgainOrder",
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
        function: "toEditAgainOrder",
        id: ""
        // id: "1"
      },
      //查看子流程
      cbxbchakan: false,
      tableData1: [],
      tableCols1: [
        {
          label: "发送时间",
          prop: "TMS",
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
          prop: "ENDTM",
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
      //下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam",
        organizationId: ""
        // organizationId: "2ec81dcb-9ed5-443a-a7e7-314ae0537478"
      },
      // bank_redheader: {
      //   function: "getTcDocTypeDicByParam",
      //   organizationId: "root",
      //   sendType: "行发文"
      // },
      //提交
      bank_addToSendOrder: {
        function: "saveAgainOrder",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
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
        title: "",
        newTitle: "",
        attachTitle: "",
        attachSort: [],
        attchmentFileInfo: [],
        newAttachTitle: "",
        documentNo: "",
        fileFlag: "电子",
        oldQfr: "",
        hostDepartment: "",
        newDraftUser: "",
        phone: "",
        completeTime: "",
        applyDate: "",
        newSendDate: "",
        isDirect: "",
        directRange: "",
        directType: "",
        draftDepartment: "",
        draftDepartmentId: "",
        draftUserId: "",
        draftUser: "",
        finishSignDepartmentName: "",
        newSignDepartmentName: "",
        newSignDepartmentId: "",
        finishNewSignDepartmentName: "",
        finishNewSignDepartmentId: "",
        newReason: "",
        newContext: "",
        opinionSendId: "",
        repeatOffice: "",
        opinionSignId: "",
        repeatApplyDept: "",
        comments: "",
        isSeparate: "",
        isArtificial: "",
        currentNode: "",
        currentUser: "",
        repeatApplyDept: "",
        repeatOffice: "",
        opinionSend: "",
        opinionSign: "",
        repeatApplyDeptList: [],
        repeatOfficeList: [],
        opinionSendList: [],
        opinionSignList: [],
        commentsList: [],
        signState: "",
        onlineSp: "是",
        sequenceSign: ""
      },
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
      SsecretTimeType: [],
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
      rules: {
        // title: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "正文标题不能为空!"
        //   }
        // ],
        // fileFlag: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "文件形式不能为空!"
        //   }
        // ],
        // oldQfr: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "原签发人不能为空!"
        //   }
        // ],
        // hostDepartment: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "主办部门不能为空!"
        //   }
        // ],
        // phone: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "电话不能为空!"
        //   }
        // ],
        // isDirect: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "直发文件不能为空!"
        //   }
        // ],
        // newReason: [
        //   { required: true, trigger: ["blur", "change"], message: "重发原因不能为空!" }
        // ],
        // newContext: [
        //   { required: true, trigger: ["blur", "change"], message: "修改内容不能为空!" }
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
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      loadingTree: false, //懒加载标示
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      dialogTypeNow: "", //当前弹窗的标示
      hasRadio: false, //是否有单选
      appendWriteDialog: true,
      clickTypes: 1,
      idss: [],
      names: [],

      //xiaoM 会签 true 主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQV2",
        flag: true,
        unitCodes: ""
      },

      // 会签部门增发,
      createSighWf: {
        function: "createSighWf",
        processInstId: "",
        multiTenancyId: "",
        pcsAvyId: "",
        tplNo: "",
        moduleType: "send_order",
        curNodeCode: "",
        deptIds: "",
        deptNames: "",
        id: "",
        isSequence: "0",
        avyds: "发送会签部门"
      },
      sendXbSuccess: false,
      addSendType: "",
      showHQ: false,
      shdialog: false, // 收回弹窗
      shData: [], // 收回数据
      checkedsh: [], // 收回列表
      checkeddq: [], // 读取的值
      fwTranHuiId: "A08462001", // 收回交易线
      typeofHQBM: "",
      dialoghuiqianTit: "",

      // 重新发送
      showBtn_reSend: false,
      dialog_resand: false,
      checkedcf: 0, // 重发选择
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
      //常用意见
      offenDevices: [],
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "doDeletesendOrderOpinion",
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
        redHead: ""
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: "doRecoverFile",
        multiTenancyId: "",
        id: ""
      },

      //选中对象和公告至 后最终确认发送
      bank_doFinalSend: {
        function: "doFinalSend",
        isSpecial: 0
      },
      showSend: false,
      showSendObj: false,

      nowCheckList: [], //当前的选中项copy
      checkedGonggaoIds: "", //公告的选中的id
      // 特殊发送
      handleSendType: 1,
      specialDialog: false,
      checkedAll: [],
      checkedAllName: "",
      checkedCitiess: [], //回显选中的数据
      checkedCities: [], //发送对象 选中的数据
      checkedCitiNames: [], //发送对象 选中的数据名称
      loadingCheck: false, //等待图标
      nowGongGaoCheckList: "", //公告至的数据

      readFlag: "",

      // 删除此文
      bank_DeleteSendOrder: {
        function: "deleteAgainOrderById",
        id: ""
      },
      isDirectFlag: false,
      fawglfjCode: this.$businessCode.fawglfj,
      canDelet: true,
      zhengWenState: ""
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
    // 发送
    handleSend(val) {
      this.handleSendType = val;
      this.showSend = true;
    },
    handleSendConfirm() {
      let that = this;
      if (this.checkedCities.length <= 0 && this.checkedGonggaoIds.length > 0) {
        this.$confirm("没有选择发送对象，是否继续并完结？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.bank_doFinalSend.isSpecial = 0;
            let obj = Object.assign(this.fromdata, this.bank_doFinalSend);
            obj.function = "doFinalSend";
            this.$post
              .postData(
                "doFinalSend",
                JSON.stringify(obj),
                this.$businessCode.fawgl
              )
              .then(res => {
                if (res && res.success) {
                  this.showSend = false;
                  this.handleSetLoacl();
                  this.$message({
                    type: "success",
                    offset: 400,
                    showClose: true,
                    message: "发送成功",
                    duration: 1500,
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
                  this.showSend = false;
                  this.handleSetLoacl();
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "发送失败",
                    duration: 1500,
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
                    if (res && res.success) {
                      this.showSend = false;
                      this.handleSetLoacl();
                      this.$message({
                        type: "success",
                        offset: 400,
                        showClose: true,
                        message: "发送成功",
                        duration: 1500,
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
                      this.showSend = false;
                      this.handleSetLoacl();
                      this.$message({
                        type: "error",
                        offset: 400,
                        showClose: true,
                        message: "发送失败",
                        duration: 1500,
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
                faChecks.push({ id: node.deptIds, text: node.deptNames });
              });
              if (aa.length) {
                commonGongDatas = [{ content: aa, typeName: "公告至" }];
              }
              if (faChecks.length) {
                commonFaDatas = [{ content: faChecks, typeName: "发送对象至" }];
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
            }
          });
        }
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
        // obj.specialSend = this.uploadConfig.uploadInfo; //1216
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
            // this.$message({
            //   type: "error",
            //   offset: 400,
            //   showClose: true,
            //   message: "发送失败",
            //   duration: 500
            // });
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
    clearSpicalData() {
      this.showSend = false;
      this.specialDialog = false;
      this.uploadConfig.uploadInfo = [];
      this.nowCheckList = [];
      this.checkedCities = [];
    },
    handleSendObjCancel() {
      this.fromdata.sendObjData = [];
      this.specialDialog = false;
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
        this.checkIds = this.checkedGonggaoIds;
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
    backbankmain(data, type) {
      this.needBack = type == "needBackShow" ? true : false;
      this.dialogTypeNow = data;
      this.dialogTit = "选择发送对象";
      this.canTab = true;
      this.treeData = [];
      this.dialogType = data;
      this.showCompDialog();
      this.treeData = this.checkedAll;
    },

    // 查看会签流程
    handleCheckFLow() {
      this.$post
        .postData(
          "getSubProcessInfo",
          JSON.stringify({
            function: "getSubProcessInfo",
            processInstId: this.fromdata.processInstId,
            tplbsnid: "D_CFWHQ"
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          this.tableData1 = res.data;
        });
      this.cbxbchakan = true;
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
        case "btn_cxfs":
          this.handleShowResend();
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
          this.collect("sendAgain", this.bank_dispach.id);
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
          this.doClearDraft(false);
          break;
        case "btn_huifuqg":
          this.doClearDraft(true);
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
          title: [
            {
              required: this.requiredFields.title,
              trigger: ["blur", "change"],
              message: "正文标题不能为空!"
            }
          ],
          fileFlag: [
            {
              required: this.requiredFields.fileFlag,
              trigger: ["blur", "change"],
              message: "文件形式不能为空!"
            }
          ],
          oldQfr: [
            {
              required: this.requiredFields.oldQfr,
              trigger: ["blur", "change"],
              message: "原签发人不能为空!"
            }
          ],
          hostDepartment: [
            {
              required: this.requiredFields.hostDepartment,
              trigger: ["blur", "change"],
              message: "主办部门不能为空!"
            }
          ],
          phone: [
            {
              required: this.requiredFields.phone,
              trigger: ["blur", "change"],
              message: "电话不能为空!"
            }
          ],
          isDirect: [
            {
              required: this.requiredFields.isDirect,
              trigger: ["blur", "change"],
              message: "直发文件不能为空!"
            }
          ],
          newReason: [
            {
              required: this.requiredFields.newReason,
              trigger: "change",
              message: "重发原因不能为空!"
            }
          ],
          newContext: [
            {
              required: this.requiredFields.newContext,
              trigger: "change",
              message: "修改内容不能为空!"
            }
          ]
        };
      });
      this.$forceUpdate();
    },
    // 初始化
    toEdit(oneTip, loadingFlag) {
      let that = this;
      this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageid") || "";
      this.bank_dispach.choseYear = this.$route.query.choseYear || "";
      this.$post
        .postData(
          "toEditAgainOrder",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.fawgl,
          null,
          loadingFlag
        )
        .then(res => {
          that.$route.query.readonlyFwcy ?? this.getIsNowUser(res, "fcy", "db");
          console.log(res);
          if (res.data.isSpecialHead && res.data.isSpecialHead == "1") {
            that.draftOrganTitle =
              res.data &&
              res.data.draftDepartment +
                res.data.sendType +
                "发文重发审批处理单";
          } else {
            that.draftOrganTitle =
              res.data &&
              res.data.draftOrgan + res.data.sendType + "发文重发审批处理单";
          }
          that.fromdata = Object.assign(that.fromdata, res.data);

          if (that.fromdata.signState == "0") {
            that.canDelet = false;
          }

          that.sequenceSign = that.fromdata.sequenceSign.toString();

          that.nowUserId = res.data.currentUserId || "";

          if (!res.data.onlineSp) {
            that.fromdata.onlineSp = "是";
            that.isOnlineSp = true;
          } else {
            that.fromdata.onlineSp = res.data.onlineSp;
            that.fromdata.onlineSp == "是"
              ? (that.isOnlineSp = true)
              : (that.isOnlineSp = false);
          }

          // 会签部门按钮是否显示
          if (that.fromdata.signState == "0") {
            that.sendXbSuccess = true;
            that.fhqbm = false;
            that.ckhqzt = true;
            that.chakanzw = true;
            that.chulizw = false;
          } else {
            that.sendXbSuccess = false;
            that.ckhqzt = false;
            that.fhqbm = true;
            that.chakanzw = false;
            that.chulizw = true;
          }

          // 直发范围控制
          if (this.fromdata.isDirect == "否") {
            this.isDirectFlag = false;
          } else if (this.fromdata.isDirect == "是") {
            this.isDirectFlag = true;
          }

          // 更新为已读
          if (this.$route.query.readFlag && this.readFlag != 1) {
            this.getReadFlag();
          }

          that.fromdata.fileFlag = "电子";
          if (that.fromdata.newTitle && that.fromdata.showNweTitle !== "") {
            this.showNweTitle = true;
          } else {
            this.showNweTitle = false;
          }
          if (
            that.fromdata.newAttachTitle &&
            that.fromdata.showNweAttachTitle !== ""
          ) {
            this.showNweAttachTitle = true;
          } else {
            this.showNweAttachTitle = false;
          }
          if (that.fromdata.currentNodeId === "010") {
            this.showBtn_reSend = true;
          }
          this.bank_selectConfig.curNodeId = res.data.currentNodeId;
          this.bank_selectConfig.curTplNo = this.bank_send.curTplNo =
            res.data.pTplNo;
          this.bank_selectConfig.curMultiTenancyId = this.bank_send.curMultiTenancyId =
            res.data.multiTenancyId;

          that.fromdata.repeatApplyDeptList =
            res.data &&
            res.data.repeatApplyDeptList &&
            JSON.parse(res.data.repeatApplyDeptList);
          that.fromdata.opinionSendList =
            res.data &&
            res.data.opinionSendList &&
            JSON.parse(res.data.opinionSendList);
          that.fromdata.opinionSignList =
            res.data &&
            res.data.opinionSignList &&
            JSON.parse(res.data.opinionSignList);
          that.fromdata.repeatOfficeList =
            res.data &&
            res.data.repeatOfficeList &&
            JSON.parse(res.data.repeatOfficeList);
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

          if (res.data.newSignDepartmentId) {
            this.huiCheckData = this.concatTreeData(
              res.data.newSignDepartmentId,
              res.data.newSignDepartmentName
            );
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

          // 控制
          if (res.data.processInstId) {
            this.$post
              .postData(
                "getNextUserTaskNode",
                JSON.stringify({
                  function: "getNextUserTaskNode",
                  processInstId: res.data.processInstId
                }),
                this.$businessCode.ggfawgl
              )
              .then(res => {
                this.huanJieMessage = res.data.extAttributes;
                // 获取当前环节
                that.needXSSP =
                  (res.data &&
                    res.data.extAttributes &&
                    res.data.extAttributes.acyNodeNextBount) ||
                  {};

                this.setConfig();
                this.setFormConfig();
                setTimeout(() => {
                  this.$refs.fromdata.clearValidate();
                });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$post
              .postData(
                "getpcsTplStartNode",
                JSON.stringify({
                  function: "getpcsTplStartNode",
                  multiTenancyId: res.data.multiTenancyId
                }),
                this.$businessCode.ggfawgl
              )
              .then(res => {
                console.log(res.data);
                this.huanJieMessage = res.data;
                // 获取当前环节
                that.needXSSP =
                  (res.data &&
                    res.data.extAttributes &&
                    res.data.extAttributes.acyNodeNextBount) ||
                  {};
                this.setConfig();
                this.setFormConfig();
                setTimeout(() => {
                  this.$refs.fromdata.clearValidate();
                });
              })
              .catch(err => {
                console.log(err);
              });
          }

          that.draftControl();

          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];

          //临时意见处理
          this.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          this.cuteData(
            "repeatApplyDept",
            "repeatApplyDeptList",
            "repeatApplyDeptId"
          );
          this.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          this.cuteData("repeatOffice", "repeatOfficeList", "repeatOfficeId");
          this.cuteData("comments", "commentsList", "commentsId");
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
    //正文相关控制
    draftControl() {
      if (this.fromdata.filePath) {
        if (this.fromdata.signState != "0") {
          this.chulizw = true;
        } else {
          this.chakanzw = true;
        }
        if (this.fromdata.isHasRedHead != "true") {
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
        } else {
          if (this.fromdata.isClear == "false") {
            this.huifuqg = false;
            this.chakanzw = false;
            if (this.fromdata.signState != "0") {
              this.chulizw = true;
            } else {
              this.chakanzw = true;
            }
          } else {
            this.qinggao = false;
            this.huifuqg = true;
            this.chakanzw = true;
            this.chulizw = false;
          }
        }
      } else {
        this.qinggao = false;
        this.huifuqg = false;
        this.chulizw = false;
      }
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
            this.fromdata[type] = item.status || "kler";
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
          this.SsendType = JSON.parse(res.data.sendType);
          this.SemergencyLevel = JSON.parse(res.data.emergencyLevel);
          this.SbusinessType = JSON.parse(res.data.businessType);
          this.StextType = JSON.parse(res.data.textType);
          this.SsecretType = JSON.parse(res.data.eleSendSecretType);
          this.SsecretTimeType = JSON.parse(res.data.eleSendSecretLimit);
          this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          this.SdirectRange = JSON.parse(res.data.directSendRange);
          this.SdirectType = JSON.parse(res.data.directSendType);
          this.SkeepLimit = JSON.parse(res.data.eleSendSecretLimit);
          this.SworkSecretFlag = JSON.parse(res.data.workSecretFlag);
        });
    },

    // 顶部菜单区
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
    // 保存
    async preserve(type, loadingFlag) {
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
      let successState = false;
      if (!scrollIntoForm) {
        return;
      }

      let params = Object.assign(this.fromdata, this.bank_addToSendOrder);
      // this.$post.postData("saveAgainOrder", JSON.stringify(this.obj), this.$businessCode.fawgl).then(res => {
      await this.$post
        .postData(
          "saveAgainOrder",
          JSON.stringify(params),
          this.$businessCode.fawgl,
          null,
          loadingFlag
        )
        .then(res => {
          if (res && res.success) {
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            localStorage.setItem("pageid", res.data.id);

            if (type) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
              if (this.showNweTitle) this.showNweTitle = true;
              if (this.showNweAttachTitle) this.showNweAttachTitle = true;
              if (type === "uploadfile") {
                this.uploadConfig.id = res.data.id;
                this.$refs.uploadComponent.uploadFileNow();
              }
            }
            successState = true;
            this.toEdit(null, loadingFlag);
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
    //保存时校验
    saveCheck() {
      // let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      let res = this.scrollIntoForm();

      // if (this.fromdata.secretType == "商业秘密") {
      //   switch (this.fromdata.secretLimitType) {
      //     case "保密期限":
      //       if (
      //         !this.fromdata.secretFlagType ||
      //         !this.fromdata.secretFlagContent ||
      //         !this.fromdata.secretTimeType
      //       ) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         res = false;
      //       }
      //       break;
      //     case "解密时间":
      //       if (
      //         !this.fromdata.secretFlagType ||
      //         !this.fromdata.secretFlagContent
      //       ) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         res = false;
      //       }
      //       break;
      //     case "解密条件":
      //       if (
      //         !this.fromdata.secretFlagType ||
      //         !this.fromdata.secretTimeType
      //       ) {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: tips,
      //           duration: 1000
      //         });
      //         res = false;
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
      //   !this.fromdata.secretFlagType
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   res = false;
      // } else if (
      //   this.fromdata.secretType == "工作秘密" &&
      //   !this.fromdata.secretFlagType
      // ) {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //  res = false;
      // }
      return res;
    },
    //完成并发送弹窗
    // 完成并发送弹窗,主送/抄送/会签等弹窗确认
    showCompDialog(data, status, type, params, dtype, radio) {
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

        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          if (this.addSendType === "1") {
            oldIds = this.fromdata.newSignDepartmentId.split(";");
            oldNames = this.fromdata.newSignDepartmentName.split(";");
            newIds = ids.filter(item => {
              return oldIds.indexOf(item) == -1;
            });
            newNames = names.filter(item => {
              return oldNames.indexOf(item) == -1;
            });
          }

          gongId = ids.join(",");
          gongName = names.join(",");
          names = names.join(";");
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
          that.checkIds = [];
        }

        switch (type) {
          case "zhusong":
            this.fromdata.main = this.fromdata.main
              ? this.fromdata.main + "," + names
              : names;
            this.fromdata.mainIds = ids;
            this.zhuCheckData = this.checkData;
            break;
          case "chao":
            this.fromdata.copy = this.fromdata.copy
              ? this.fromdata.copy + "," + names
              : names;
            this.fromdata.copyIds = ids;
            this.chaoCheckData = this.checkData;
            break;
          case "hui":
            let obj = Object.assign(that.createSighWf, {
              processInstId: that.fromdata.processInstId,
              multiTenancyId: that.fromdata.multiTenancyId,
              pcsAvyId: that.fromdata.pcsAvyId,
              tplNo: that.fromdata.pTplNo,
              curNodeCode: that.fromdata.currentNodeId,
              deptIds: that.fromdata.deptIds,
              deptNames: that.fromdata.deptNames,
              sequenceSign: that.fromdata.sequenceSign.toString(),
              id: that.fromdata.id,
              deptIds: ids,
              deptNames: names
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
                    that.fromdata.newSignDepartmentName = names;
                    that.fromdata.newSignDepartmentId = ids;
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
                    this.handleSendHQPtmt(newIds, newNames);
                    that.$forceUpdate();
                  } else {
                    if (!ids) {
                      that.fromdata.newSignDepartmentName = "";
                      that.fromdata.newSignDepartmentid = "";
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
              that.fromdata.newSignDepartmentName = names;
              that.fromdata.newSignDepartmentId = ids;
              that.huiCheckData = ids.length ? that.checkData : [];
              // that.createSighWf.deptIds = ids;
              // that.createSighWf.deptNames = names;
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
              that.fromdata.newSignDepartmentName
            ) {
              that.showHQ = true;
            }
            break;
          case "ben":
            this.fromdata.inline = this.fromdata.inline
              ? this.fromdata.inline + "," + names
              : names;
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
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
            this.fromdata.sendOrderNoticeInfo = this.fromdata.sendOrderNoticeInfo = gongId
              ? gongId + ";" + gongName
              : "";
            this.gongCheckData = this.nowGongGaoCheckList = this.checkData;
            this.checkedGonggaoIds = ids ? ids.split(";") : "";
            break;
          case "sendObj":
            allnodesname = [].concat(
              this.checkedAllName ? this.checkedAllName.split(",") : []
            );
            this.uploadConfig.sendObjSpecialFile.map(node => {
              this.uploadConfig.sendObjData[
                node
              ] = this.fromdata.sendObjData = this.checkData;
            });
            this.uploadConfig.checkChange = !this.uploadConfig.checkChange;
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
                copy: "",
                inline: hasFileGong.join(",") // 公告至 附件的部门id
              };
            });
            this.uploadConfig.checkChange = !this.uploadConfig.checkChange;
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
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogType);
      }

      this.$forceUpdate();
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
          this.dialogTypeNow = "zengfa";
          this.checkIds = this.fromdata.newSignDepartmentId
            ? this.fromdata.newSignDepartmentId.split(";")
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
        case "gonggao":
          this.checkIds = this.fromdata.sendOrderNoticeInfo
            ? this.fromdata.sendOrderNoticeInfo.split(";")[0].split(",")
            : [];
          this.checkData = this.gongCheckData;
          break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
        case "sendObj":
          this.checkIds = [];
          this.checkData = this.fromdata.sendObjData || []; //批量选择发送
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
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.fromdata, this.bank_doSend);
      params.function = "doSendAgainOrder";
      this.$post
        .postData(
          "doSendAgainOrder",
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
              duration: 500,
              onClose: () => {
                window.location.href = "about:blank";
                if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
                  window.opener.location.reload();
                }
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
    async completeSending() {
      let that = this;
      if (this.fromdata.signState === "0") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "正处于会签状态",
          duration: 1000
        });
        return;
      }
      if (!this.bank_doSend.id) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请先保存数据",
          duration: 1000
        });
        return;
      }
      if (!this.saveCheck()) {
        return;
      }
      this.preserve().then(resP => {
        if (resP) {
          this.offenUse = true;
          this.canTab = false;
          this.treeData = [];
          this.dialogType = "dosend";
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
              console.log(res);

              this.seletOptionsData = res.data || [];
              //带约束条件判断环节
              that.seletOptionsData = that.shoNextNode(
                that.seletOptionsData,
                that.needXSSP
              );
              this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
              let transObj = Object.assign(this.fromdata, this.bank_send);
              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(transObj),
                  this.$businessCode.fawgl
                )
                .then(res => {
                  if (res.message == "Loading") {
                    this.loadingTree = true;
                  } else {
                    this.loadingTree = false;
                  }
                  this.treeData = (res.data && res.data.data) || [];
                  this.defaultUser = (res.data && res.data.defaultUser) || {};
                })
                .catch(e => {});
            });
        }
      });
    },
    //主送
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
      if (n === "hui") {
        this.hasRadio = true;
        this.canTab = false;
        this.singelCheckF = false;
        this.dialogTypeNow = "hui";
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
    // 删除此文
    handleDeleteDoc() {
      this.$post
        .postData(
          "deleteAgainOrderById ",
          JSON.stringify({
            function: "deleteAgainOrderById",
            id: this.bank_dispach.id
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 500
            });
            window.location.href = "about:blank";
            if (!(localStorage.getItem("st").indexOf("smarto") > -1)) {
              window.opener.location.reload();
            }
            window.close();
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
            path: "/dzcfwcld",
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

    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    inputChange1(e) {
      this.preserve(null, true);
      this.$forceUpdate();
    },
    inputChangeOnline(e) {
      this.fromdata.onlineSp == "是"
        ? (this.isOnlineSp = true)
        : (this.isOnlineSp = false);
      this.preserve();
    },
    // 申请部门意见
    handleDptmMsg() {
      this.showDptmMsg = true;
    },
    // 新标题
    handleShowNewTitle() {
      this.showNweTitle = !this.showNweTitle;
    },
    handleShowNweAttachTitle() {
      this.showNweAttachTitle = !this.showNweAttachTitle;
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(";");
      names = name.split(";");
      ids.map((item, n) => {
        if (item != "") {
          obj.push({
            id: item,
            name: names[n]
          });
        }
      });
      return obj;
    },
    secretTypechange(value) {
      if (value == "商业秘密") {
        this.flag = true;
        this.secretflag = true;
        this.secretTypeflag = false;
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitType = "";
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
        this.secretLimitType = "";
      } else {
        this.flag = false;
        this.secretflag = false;
        this.secretTypeflag = false;
      }
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
    selectType(value) {
      this.bank_redheader.sendType = value;
      // this.getTcDocTypeDicByParam();
    },
    //定密依据接收子组件传值
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 申请部门意见
          this.fromdata.repeatApplyDept = this.fromdata.repeatApplyDept
            ? this.fromdata.repeatApplyDept + data
            : data;
          if (
            this.fromdata.repeatApplyDept &&
            this.fromdata.repeatApplyDept.length >= 500
          ) {
            this.fromdata.repeatApplyDept = this.fromdata.repeatApplyDept.substr(
              0,
              500
            );
          }
        } else if (this.clickTypes == 2) {
          // 办公室负责人意见
          this.fromdata.repeatOffice = this.fromdata.repeatOffice
            ? this.fromdata.repeatOffice + data
            : data;
          if (
            this.fromdata.repeatOffice &&
            this.fromdata.repeatOffice.length >= 500
          ) {
            this.fromdata.repeatOffice = this.fromdata.repeatOffice.substr(
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
            message: res.message,
            duration: 1000
          });
        });
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

    // 会签部门
    handleSendHQPtmt(newIds, newNames) {
      let that = this;
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
        tplNo: that.fromdata.pTplNo,
        curNodeCode: this.fromdata.currentNodeId,
        // deptIds: this.fromdata.deptIds,
        // deptNames: this.fromdata.deptNames,
        sequenceSign: this.sequenceSign,
        id: this.fromdata.id
      });
      obj.function = "createSighWf";
      if (!this.fromdata.newSignDepartmentId) {
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
          obj.deptIds = this.fromdata.newSignDepartmentId;
          obj.deptNames = this.fromdata.newSignDepartmentName;
        }
        if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
          if (this.addSendType && this.addSendType == "1") {
            transAvyds = "是否增发“ ";
          } else {
            transAvyds = "是否发“ ";
          }
          // 提示是否发会签部门
          this.$confirm(transAvyds + obj.deptNames + " ”部门?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
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
                    that.fhqbm = false;
                    that.sendXbSuccess = true;
                    that.chakanzw = true;
                    that.chulizw = false;
                    that.addSendType = transAvyds = "";
                    that.preserve();
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
                .catch(error => {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: error.message,
                    duration: 1000
                  });
                });
            })
            .catch(() => {
              location.reload();
              return;
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
      let transDeptName = "";
      if (!checkboxdata && !dqdata) {
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
              if (this.fromdata.newSignDepartmentName === "") {
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
            this.$businessCode.fawgl
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

    // 重新发送
    handleShowResend(val) {
      if (
        (this.fromdata.opinionSend || this.fromdata.opinionSend == "") &&
        !this.fromdata.opinionSendList
      ) {
        this.$message({
          type: "error",
          message: "签发意见不能为空!",
          showClose: true,
          offset: 400,
          duration: 3000
        });
        return;
      }
      this.preserve(null, true);
      this.dialog_resand = true;
    },
    handleResand() {
      this.handleSetLoacl();
      this.$router.push({
        path: "/rexamineBankDispach",
        query: {
          id: this.fromdata.sendOrderId,
          againSendType: this.checkedcf,
          againId: this.$route.query.id
        }
      });
      this.dialog_resand = false;
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
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
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

    //清稿弹窗
    doClearDraft(flag) {
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
                    JYcode: that.fawglfjCode,
                    multiTenancyId: that.fromdata.multiTenancyId,
                    relativePath: res ? res.filePath : "",
                    fileName: res ? res.fileName : "",
                    pageFlag: "fawen",
                    cleanDraftFlag: true,
                    showBtns: true,
                    flowTranId: this.fawglCode
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
                this.fromdata.isHasRedHead = "true";
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
              message: "未上传模板，请上传后套红",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "未上传模板，请上传后套红",
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
          self.fawglfjCode
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
    doDraft(fileInfo) {
      let openPath = getMachineType() ? "/openAndSave_Word" : "openAndSave_Wps";
      let data = "";
      let fileConfig = fileInfo; //
      if (this.zhengWenState == 1) {
        //
        if (this.fileInfoOfMuBan.fileName) {
          fileConfig = this.fileInfoOfMuBan;
        }
      }
      if (this.draftFlag == "frommoude") {
        let routeData = this.$router.resolve({
          path: "fwSearch",
          query: {
            multiTenancyId: this.fromdata.multiTenancyId, //
            processInstId: this.fromdata.processInstId, //
            code: this.$businessCode.fawglfj, //
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
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          tmpFileName: fileInfo ? fileInfo.fileNameTh : "",
          tmpFilePath: fileInfo ? fileInfo.filePathTh : "",
          isHasRedHead: fileInfo && fileInfo.fileNameTh ? true : false,
          pageFlag: "fawen",
          // formState:'finish',
          showBtns: this.zhengWenState == 0 ? false : true,
          processInstId: this.fromdata.processInstId,
          stepsNowName: this.fromdata.currentNode,
          flowTranId: this.fawglCode //流程交易线    chai
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
              let parms = Object.assign(this.fromdata, this.bank_send);
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
    }
  },
  created() {
    //初始化加载数据
    this.bank_dispach.id = this.uploadConfig.id = this.bank_doSend.id = this
      .$route.query.id
      ? this.$route.query.id
      : "";
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.fawglCode = this.$businessCode.fawgl;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl; //完成并发送 树   流程交易线   chai
    this.readFlag = this.$route.query.readFlag
      ? this.$route.query.readFlag
      : "";
    this.toEdit();
    this.getSendOrderDicByParam();
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
/deep/ .hqbm .el-textarea__inner {
  color: #f00 !important;
  min-height: 40px !important;
  background-color: #fff !important;
}
/deep/ .hqbm1 .el-textarea__inner {
  min-height: 40px !important;
}

.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
  color: #909399;
}
.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
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
.dialog_regain {
  padding-bottom: 20px;
  h6 {
    font-size: 16px;
    line-height: 30px;
    margin-bottom: 20px;
  }
}
.disable_w {
  width: 100%;
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
