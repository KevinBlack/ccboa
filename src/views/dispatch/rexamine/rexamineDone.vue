<template>
  <div id="rexamineDone" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>

        <div class="grid_comtent">
          <el-button  size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button  size="small" plain v-if="fromdata.sendType=='电子'" @click="drafting(0)">查看正文</el-button>
          <el-button  size="small" plain @click="handleShowRegain" v-if="fromdata.currentNodeId!=800&&readFlag !=1 &&allowBack==true">收回</el-button>
          <el-button size="small" plain @click="handleUrge">催办</el-button>
          <el-button  size="small" plain @click="flowScheme">查看流程</el-button>
          <el-button size="small" plain @click="handleCheckFLow" v-if="ckhqzt">查看会签状态</el-button>
          <!-- <el-button size="small" plain @click="collect('sendAgain', bank_dispach.id)">收藏</el-button> -->
          <el-button  size="small" plain @click="processSheet">打印处理单</el-button>
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
          <el-form
            ref="fromdata"
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
            <h6 class="bank_dispach_file_tit mrg-b-20">文件要素</h6>
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
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.attachTitle" disabled>
                      <!-- <template slot="append"><a href="#" @click="handleShowNweAttachTitle">修改附件标题</a></template> -->
                    </el-input>
                  </el-form-item>
                  <el-form-item v-if="showNweAttachTitle" label="修改后附件标题" prop="newAttachTitle">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.newAttachTitle" disabled></el-input>
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
                <el-col>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="直发文件" prop="isDirect" ref="isDirect">
                        <el-radio v-model="fromdata.isDirect" disabled label="是">是</el-radio>
                        <el-radio v-model="fromdata.isDirect" disabled label="否">否</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="直发范围" v-if="fromdata.isDirect==='否' ? false :true">
                        <el-select v-model="fromdata.directRange" disabled placeholder="请选择" style="width:100%">
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
                        <el-select v-model="fromdata.directType" disabled placeholder="请选择" style="width:100%">
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
                <el-col :span="24" v-if="fromdata.sendType=='电子'">
                  <el-form-item label="会签部门" prop="finishSignDepartmentName" ref="finishSignDepartmentName">
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
                <el-col>
                  <el-row>
                    <el-col :span="15" v-if="fromdata.sendType=='电子'">
                      <div>
                        <el-form-item label="重发会签">
                          <el-input
                            type="textarea" resize="none" autosize
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
                    <el-col :span="8" v-if="fromdata.sendType=='电子'">
                      <el-form-item prop="finishNewSignDepartmentName" ref="finishNewSignDepartmentName">
                        <el-input v-model="fromdata.finishNewSignDepartmentName" placeholder="已完成的会签部门" style="width: 100%;" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-form-item label="重发原因" prop="newReason" ref="newReason">
                    <el-input v-model="fromdata.newReason" type="textarea" resize="none" autosize rows="3" class="d_f1" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="修改内容" prop="newContext" ref="newContext">
                    <el-input v-model="fromdata.newContext" type="textarea" resize="none" autosize rows="3" class="d_f1" disabled></el-input>
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
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
                      </button> -->
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
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
                      </button> -->
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
                <el-col v-if="fromdata.sendType=='电子'">
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
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
                      </button> -->
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
                    </div> -->
                    <div class="fix_height">
                      <el-input
                        type="textarea" resize="none" autosize
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
                      </button> -->
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
                    </el-input> -->
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
                        </div> -->
                        <div class="fix_height">
                          <el-input
                            type="textarea"
                            resize="none"
                            autosize
                            v-model="fromdata.comments"
                            @blur="inputChange1"
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
                <!-- <uploadFiles ref="uploadComponent" @preserve="preserve" :uploadConfig="uploadConfig"></uploadFiles> -->
                <el-col>
                  <div class="file_list_box" v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
                    <el-scrollbar>
                      <div v-for="(item, index) in  fromdata.attchmentFileInfo" :key="index" class="comp_list">  
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <span class="down"
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
                              >删除</el-button> -->
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
    <el-dialog
      :visible.sync="showExplain"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      v-dialogDrag
      title="办文说明"
    >
      <el-input type="textarea" resize="none" autosize></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExplain = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
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
    <!--查看会签流程-->
    <el-dialog title="查看子流程" v-dialogDrag :visible.sync="cbxbchakan">
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
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import scrollIntoForm from '@/util/scrollValid';
import minixs from "@/minixs/index";
import isNowUser from "@/minixs/isNowUser";
import textInternational from "@/minixs/textInternational";
import viewDraft from "@/minixs/viewDraft";
import exportTable from "@/minixs/exportTable";
import opinionText from "@/components/opinionText/indexDsipatch";
import dispatchIndex from "@/minixs/dispatchIndex";
import sideBar from '@/components/sideBar/sideBar';

export default {
  name: "RexamineDone",
  components: {
    opinionText,
    timeDialog,
    treeCofig,
    appendWriteList,
    sideBar
  },
  mixins: [minixs,viewDraft,dispatchIndex,textInternational,isNowUser],
  data() {
    return {
      //查看子流程
      ckhqzt: false,
      cbxbchakan: false,
      tableData1: [],
      tableCols1: [
        {
          label: "发送时间",
          prop: "AVYEXCTRTM",
          align: "center",
          formatter(row) {
            return (row.TMS = dateFormate.dataFormat(Date.parse(new Date(row.TMS))));
          }
        },
        { label: "部门", prop: "UNITNM", align: "center" },
        { label: "处理人", prop: "AVYEXCTRNM", align: "center" },
        { label: "状态", prop: "NODENAME", align: "center" },
        { label: "结束时间", prop: "ENDTM ", align: "center" }
        // { label: "状态", prop: "NODENAME", align: "center",formatter(row){
        //     if(row.NODEID == 800){text='完成协办'}else{'正在协办'}
        // }},
      ],

      treeTradeCode:'',//人员树交易线
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

      draftOrganTitle: '',
      // 收回
      bank_regain: {
        function: 'doWithdrawTask',
        pcsAvyId: '',
        multiTenancyId: 'CN005'
      },
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
        curMultiTenancyId: "CN000"
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
        id: "",
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
        attachSort:[],
        attchmentFileInfo:[],
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
        signDepartment: "",
        newSignDepartmentName: "",
        newReason: "",
        newContext: "",
        opinionSendId: "",
        processInstId: "",
        repeatOffice: "",
        opinionSignId: "",
        repeatApplyDept: "",
        comments: "",
        isSeparate: "",
        isArtificial: "",
        currentNode: '',
        currentUser: ''
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
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      showRegain: false, // 是否收回
      appendWriteDialog: true,
      clickTypes: 1,
      idss: [],
      names: [],
      obj: [],

      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
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

      // 是否能被收回
      readFlag:"",
      allowBack:"",
      isDirectFlag: false
    };
  },

  mounted() {
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
    // 催办
    handleUrge() {
      this.$post
        .postData(
          "urgeMain",
          JSON.stringify({
            function: "urgeMain",
            multiTenancyId: this.fromdata.multiTenancyId,
            processInstId: this.fromdata.processInstId,
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          if (res&&res.success) {
            this.$message({
              type: "success",
              offset: 400,
              showClose: true,
              message: "催办成功",
              duration: 1000
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1500
            });
          }
        });
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
    // 收回
    handleShowRegain () {
      this.showRegain = true
    },
    handleRegain () {
      this.bank_regain.pcsAvyId = this.fromdata.pcsAvyId;
      this.$post.postData('doWithdrawTask', JSON.stringify(this.bank_regain), this.$businessCode.ggfawgl).then((res) => {
        this.showRegain = false;
        this.$message({
          type: "success",
          offset: 400,
          showClose: true,
          message: "发送成功",
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
    // 申请部门意见
    handleDptmMsg () {
      this.showDptmMsg = true
    },
    // 新标题
    handleShowNewTitle () {
      this.showNweTitle = !this.showNweTitle
    },
    handleShowNweAttachTitle () {
      this.showNweAttachTitle = !this.showNweAttachTitle
    },
    //数据转换
    concatTreeData(id, name) {
      // let ids = [];
      // let names = [];
      // let obj = [];
      this.idss = id.split(",");
      this.names = name.split(",");
      this.idss.map((item, n) => {
        this.obj.push({
          id: item,
          text: this.names[n]
        });
      });
      return this.obj;
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
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
      let judge = true;
      let that = this;
      if (this.dialogType === "dosend") {
        judge = scrollIntoForm.call(this);
        let regT = /^[0-9]*$/;
        let tips = "电话号码输入有误!";
        if (!regT.test(this.fromdata.phone)) {
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
          names = names.join(",");
          ids = ids.join(",");
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
            this.fromdata.newSignDepartmentName = names;
            this.fromdata.newHostDepartmentId = ids;
            this.huiCheckData = this.checkData;
            break;
          case "ben":
            this.fromdata.inline = names;
            this.fromdata.inlineIds = ids;
            this.benCheckData = this.checkData;
            break;
          case "dosend":
            this.bank_doSend.nextUserName = names;
            this.bank_doSend.nextUserId = ids;
            this.bank_doSend.nextNodeId = params.id;
            this.bank_doSend.nextNodeName = params.name;
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
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let params = Object.assign(this.fromdata,this.bank_doSend);
      this.$post
        .postData("doSendAgainOrder", JSON.stringify(params), this.$businessCode.fawgl)
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "发送成功",
              duration: 500
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
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
      this.preserve();
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.$post.postData("getNextNodeInfo", JSON.stringify(this.bank_selectConfig), this.$businessCode.fawgl).then(res => {
        this.seletOptionsData = res.data || [];
        this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
        this.$post.postData("selWfNode", JSON.stringify(this.bank_send), this.$businessCode.fawgl).then(res => {
          this.treeData = res.data;
        })
        .catch(e => {
        });
      });
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
        case "dosend":
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
          if (res.data.mainIds) {
            this.zhuCheckData = this.concatTreeData(
              res.data.mainIds,
              res.data.main
            );
          }
          if (res.data.signDepartmentIds) {
            this.huiCheckData = this.concatTreeData(
              res.data.signDepartmentIds,
              res.data.signDepartment
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
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      // this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEditAgainOrder() {
      // this.bank_dispach.id = localStorage.getItem('pageid') || '';
      let that = this;
      this.bank_dispach.choseYear = this.$route.query.choseYear||"";
      this.$post.postData("toEditAgainOrder", JSON.stringify(this.bank_dispach), this.$businessCode.fawgl).then(res => {
        that.$route.query.readonlyFwcy??this.getIsNowUser(res);
        console.log(res);
        this.bank_regain.multiTenancyId = res.data.multiTenancyId
        if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
          that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文重发审批处理单";
        } else {
          that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文重发审批处理单";
        }
        that.fromdata = Object.assign(that.fromdata, res.data);
        that.fromdata.fileFlag = '电子'
        if (that.fromdata.newTitle && that.fromdata.showNweTitle !== '') {
          this.showNweTitle = true
        } else {
          this.showNweTitle = false
        }
        if (that.fromdata.newAttachTitle && that.fromdata.showNweAttachTitle !== '') {
          this.showNweAttachTitle = true
        } else {
          this.showNweAttachTitle = false
        }

        if (that.fromdata.signState === "0") {
          that.ckhqzt = true;
        } else {
          that.fhqbm = true;
        }

        // 直发范围控制
        if (this.fromdata.isDirect == "否") {
          this.isDirectFlag = false;
        } else if (this.fromdata.isDirect == "是") {
          this.isDirectFlag = true;
        }
        
        this.bank_selectConfig.curNodeId = res.data.currentNodeId;
        this.bank_selectConfig.curTplNo = this.bank_send.curTplNo =
          res.data.pTplNo;
        this.bank_selectConfig.curMultiTenancyId = this.bank_send.curMultiTenancyId =
          res.data.multiTenancyId;

        that.fromdata.opinionSendList =
          res.data &&
          res.data.opinionSendList &&
          JSON.parse(res.data.opinionSendList);
        that.fromdata.repeatOfficeList =
          res.data &&
          res.data.repeatOfficeList &&
          JSON.parse(res.data.repeatOfficeList);
        that.fromdata.opinionSignList =
          res.data &&
          res.data.opinionSignList &&
          JSON.parse(res.data.opinionSignList);
        that.fromdata.repeatApplyDeptList =
          res.data &&
          res.data.repeatApplyDeptList &&
          JSON.parse(res.data.repeatApplyDeptList);
        that.fromdata.commentsList =
          res.data &&
          res.data.commentsList &&
          JSON.parse(res.data.commentsList);
        
        this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
        this.fromdata.attachSort = [];

        //临时意见处理
        this.cuteData("opinionSend", "opinionSendList", "opinionSendId");
        this.cuteData("repeatApplyDept", "repeatApplyDeptList", "repeatApplyDeptId");
        this.cuteData("opinionSign", "opinionSignList", "opinionSignId");
        this.cuteData("repeatOffice", "repeatOfficeList", "repeatOfficeId");
        this.cuteData("remark", "commentsList", "remarkId");

        //收回测试
        this.$post
        .postData(
          "checkTakeBack",
          JSON.stringify({function:"checkTakeBack",processInstId:this.fromdata.processInstId}),
          this.$businessCode.ggfawgl
        )
        .then(res => {
            this.allowBack = res.allowBack;
        });
      }).catch(erro=>{
          console.log(erro.message)
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
    // 保存
    preserve(type) {
      if (!scrollIntoForm) {
        return
      }
      console.log(this.fromdata)
      let params = Object.assign(this.fromdata,this.bank_addToSendOrder)
      // this.$post.postData("saveAgainOrder", JSON.stringify(this.obj), this.$businessCode.fawgl).then(res => {
      this.$post.postData("saveAgainOrder", JSON.stringify(params), this.$businessCode.fawglfj).then(res => {
        if (res && res.success) {
          this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id
          this.bank_doSend.id = res.data.id
          localStorage.setItem('pageid',res.data.id)

          if (type) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "保存成功",
              duration: 1000
            })
            if(type==="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
            }
            if (this.showNweTitle) this.showNweTitle = true
            if (this.showNweAttachTitle) this.showNweAttachTitle = true
            this.toEditAgainOrder()
          }
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
      window.location.href = "about:blank";
      window.close();
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
      this.getFileInfo(that).then((res)=>{
        if(res.state){
          this.doDraft(res)
        }
      })

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
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:getFormId(this.$route.query.id,"bankDispachId"),
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          formState:'complete',
          processInstId: this.fromdata.processInstId,
          flowTranId:this.$businessCode.fawgl,//流程交易线    chai
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
    // 删除此文
    delectArticle() {
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
      this.bank_cklc.processInstId = this.fromdata.processInstId
      this.$post.postData("getHistoryActInfo", JSON.stringify(this.bank_cklc), this.$businessCode.ggfawgl).then(res => {
        if (res) {
          this.tableData = res.data
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        }
      });
    },
    // 打印处理单
    processSheet() {
      const routeData = this.$router.resolve({
        path: '/dzcfwcld',
        query: {
            id:this.bank_dispach.id,
            choseYear: this.$route.query.choseYear||""
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
    handleSave() {},
    writelistbox() {
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    //删除意见(固化意见)
    deletService(type) {
      if (type === "qianfa") {
        //请求接口后 删除 
        this.fromdata.opinionSendList.splice(0, 1);
      } else if (type === "hegao") {
        this.fromdata.opinionDrafList.splice(0, 1);
      } else if (type === "huiqian") {
        this.fromdata.opinionSignList.splice(0, 1);
      }
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
    downFile(file){
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
    }
  },
  created() {
    //初始化加载数据
    this.bank_dispach.id = this.uploadConfig.id = this.$route.query.id? this.$route.query.id: "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.ggfawgl;  //完成并发送 树   流程交易线   chai
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.toEditAgainOrder();
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
.disable_w{
  width: 100%;
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
