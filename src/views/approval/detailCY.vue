
<template>
<!-- 事物审批传阅单 -->
  <div class="qcDetail" id="shiwuzhifa">
    <!--引入详情 -->
    <el-dialog
      v-dialogDrag
      title="查看依据文件"
      :visible.sync="isdialogYRDeal"
      width="80%"
      height="300px"
      :before-close="YRhandleCloseDeal"
    >
      <div style="margin-top:4px">
        <el-form :model="YRDeal" label-width="160px">
          <el-form-item label="文号" style="width:80%;margin-top:16px;">
            <el-input v-model="YRDeal.orderNo" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="标题" style="width:80%;margin-top:16px;">
            <el-button type="text" @click="viewFile(YRDeal, '1')">{{YRDeal.title}}</el-button>
          </el-form-item>
          <!--     附件     -->
          <el-row>
            <el-form-item label="附件">
              <el-col :span="24">
                <div class="tree_w" v-if="YRDeal.file&&YRDeal.file.length">
                  <el-scrollbar>
                    <div v-for="(item,index) in  YRDeal.file" :key="item.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span
                            class="name down"
                            @click="viewFile(item)"
                            :title="item.fileName"
                          >{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
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
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer">
        <!--        <el-button type="primary" @click="YRBacksure">确定</el-button>-->
        <el-button @click="YRhandleCloseDeal">取消</el-button>
      </span>
    </el-dialog>

    <!--    选择人员树-->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :seletOptionsData="[]"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <!--  传阅收回  -->
    <el-dialog
      v-dialogDrag
      title="选择传阅收回人员"
      :visible.sync="isdialogCY"
      width="40%"
      height="200px"
      :before-close="handleClose"
    >
      <div style="margin-top:26px">
        <el-checkbox-group v-model="CYBackPer">
          <el-checkbox
            style="margin-right:16px;"
            v-for="item in perCode"
            :key="item.id"
            :label="item.curUserId+'_'+item.curUserCn+','+item.id"
          >{{item.curUserCn}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="CYBacksure">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
    <!--  传阅说明  -->
    <el-dialog
      v-dialogDrag
      title="传阅说明"
      :visible.sync="CYexplain"
      width="40%"
      height="200px"
      :before-close="explainBtn"
    >
      <div style="margin-top:4px">
        <el-form label-width="160px">
          <el-form-item label="传阅说明" style="width:80%;margin-top:16px;">
            <el-input type="textarea" :rows="5" v-model="CYmessage"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="saveExplain">确定</el-button>
        <el-button @click="explainBtn">取消</el-button>
      </span>
    </el-dialog>
    <!--  反馈传阅意见  -->
    <el-dialog
      v-dialogDrag
      title="反馈传阅意见"
      :visible.sync="CYfeedback"
      width="40%"
      height="200px"
      :before-close="feedBackBtn"
    >
      <div style="margin-top:4px">
        <el-form ref="YRelForm" label-width="160px">
          <el-form-item label="反馈传阅意见" style="width:80%;margin-top:16px;">
            <el-input type="textarea" :rows="5" v-model="feedbackMessage"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="savefeedback">确定</el-button>
        <el-button @click="feedBackBtn">取消</el-button>
      </span>
    </el-dialog>

    <div class="headerClick">
      <div class>
        <el-button plain size="mini" class="bank_grid_comtent_active" @click="closeData()">关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          size="mini"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class>
      <div
        class="shiwuTitle"
      >{{formData.unitName||formData.curbank}}{{formData.applyProjectName}}审批传阅处理单</div>
    </div>
    <div class="process_content">
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
        <div class="cur_box">
          <div class="cur_sess">
            <p>
              <!--              当前环节：-->
              <!--              <span>{{this.formData.currentNode}}</span>-->
            </p>
            <p>
              当前处理人：
              <span>{{this.formData.curUserCn}}</span>
            </p>
            <p>
              是否跨行：
              <span>
                <el-radio-group v-model="formData.isKh" :disabled="true">
                  <el-radio label="0">非跨行</el-radio>
                  <el-radio label="1">跨行</el-radio>
                </el-radio-group>
              </span>
            </p>
            <el-button
              type="primary"
              style="float: right;margin-right:40px;margin-top:8px;color:#fff!important"
              @click="viewAppro"
            >查看审批说明</el-button>
          </div>
        </div>

        <div id="wjys" class="height_90"></div>
        <h6 class="bank_dispach_file_tit">文件要素</h6>
        <el-form :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请项目">
                <el-input v-model="formData.applyProjectName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主管部门">
                <el-input v-model="formData.mainDepart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审批编号">
                <el-input v-if="formData.approveNo" v-model="formData.approveNo" :disabled="true"></el-input>
                <el-input v-else v-model="formData.virtualApproveNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="!!formData.applyNo">
              <el-form-item label="申请编号">
                <el-input v-model="formData.applyNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期" prop="applyTime">
                <el-input v-model="formData.applyTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formData.approveTime">
              <el-form-item label="接收日期" prop="approveTime">
                <el-input v-model="formData.approveTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请部门">
                <el-input v-model="formData.draftDepartment" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="formData.contactName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="formData.contactTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="formData.title" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="引入依据">
              <div v-for="(item,index) in YRcheck" :key="index">
                <span @click="YRJump(item)" style="display:inline-block;width:40%;">{{item.orderNo}}</span>
                <el-button @click="YRJump(item)" size="mini" type="primary">查看详情</el-button>
              </div>
            </el-form-item>
          </el-row>

          <el-form-item label="事由提要">
            <el-input
              type="textarea"
              :autosize="{minRow:6,maxRow:15}"
              v-model="formData.reason"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <h6 class="bank_dispach_file_tit">签批意见</h6>
          <div id="qpyj" class="height_90"></div>

          <!--          审批意见-->
          <el-form-item label="审批意见">
            <div
              v-for="item in formData.checkOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              v-if="!(this.formData.checkOpinionList&&this.formData.checkOpinionList.length)"
              type="textarea"
              :rows="3"
              v-model="formData.examineIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <!--申请单位意见-->
          <el-form-item label="申请单位意见">
            <div
              v-for="item in formData.applyOpinionList"
              :key="item.id"
 		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.applyOpinionList&&this.formData.applyOpinionList.length)"
              :rows="3"
              v-model="formData.exaunitIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <!--          <el-form-item label="办理情况">-->
          <!--            <el-input type="textarea" :rows="3" v-model="formData.blIdea" :disabled="true"></el-input>-->
          <!--          </el-form-item>-->

          <!--          办理情况-->
          <el-form-item label="办理情况" prop="blIdea">
            <div v-for="item in formData.blqkOpinionList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.blqkOpinionList&&this.formData.blqkOpinionList.length)"
              :rows="3"
              v-model="formData.blIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <!--          <el-form-item label="一次传阅意见">-->
          <!--            <el-input type="textarea" :rows="3" v-model="formData.firsrCyidea"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="一次传阅意见">
            <div
              v-for="item in formData.cyFirstOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              v-if="!(formData.cyFirstOpinionList&&formData.cyFirstOpinionList.length)"
              type="textarea"
              :rows="3"
              v-model="formData.firsrCyidea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="二次传阅意见">
            <div
              v-for="item in formData.cySecondOpinionList"
              :key="item.id"
		class='opinion-wrapper'
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              v-if="!(formData.cySecondOpinionList&&formData.cySecondOpinionList.length)"
              type="textarea"
              :rows="3"
              v-model="formData.secondCyidea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!--          <el-form-item label="二次传阅意见">-->
          <!--            <el-input type="textarea" :rows="3" v-model="formData.secondCyidea"></el-input>-->
          <!--          </el-form-item>-->

          <!--          传阅说明-->
          <el-form-item label="传阅说明">
            <div v-for="item in formData.explainList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName }}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.explainList&&this.formData.explainList.length>0)"
              :autosize="{minRow:5,maxRow:15}"
              :disabled="true"
              v-model="formData.cyExplain"
            ></el-input>
          </el-form-item>

          <!--          备注-->
          <el-form-item label="备注">
            <div v-for="item in formData.markList" :key="item.id" class='opinion-wrapper'>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24" class="content-container">
                    <div>{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.departmentName}}
                      <span class="pad_lr10">{{item.userName}}</span>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.markList&&this.formData.markList.length>0)"
              :rows="3"
              v-model="formData.mark"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-col :span="24">
            <el-form-item label="一次传阅人员" style="margin-top:20px">
              <el-row>
                <el-form-item>
                  <el-input type="textarea" v-model="formData.firstCyPerson" :disabled="true"></el-input>
                </el-form-item>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="二次传阅人员" style="margin-top:20px">
              <el-row>
                <el-col>
                  <el-form-item label="未阅">
                    <el-input
                      type="textarea"
                      v-model="formData.secondUnreadPersion"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="已阅">
                    <el-input type="textarea" v-model="formData.secondReadPersion" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <div style="width:100%;">
            <h6 class="bank_dispach_file_tit">附件</h6>
          </div>
          <div id="scfj" class="height_90"></div>
          <el-row>
            <!--          非跨行附件-->
            <div v-if="!!formData.isKh">
              <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-form-item>
                  <el-col :span="22">
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfo"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
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
                </el-form-item>
              </el-row>
            </div>
            <div v-else>
              <!--          请示单位附件-->
              <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-form-item style="marginLeft:-20px">
                  <el-col>请示单位附件</el-col>
                  <el-col :span="22">
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfo"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
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
                </el-form-item>
              </el-row>
              <!--          批转单位附件-->
              <el-row v-if="formData.attchmentFileInfoPZ&&formData.attchmentFileInfoPZ.length">
                <el-form-item style="marginLeft:-20px">
                  <el-col>批转单位附件</el-col>
                  <el-col :span="22">
                    <!--                <upload-file-ts :uploadConfig="uploadConfigPZ" @fileList="fileList"></upload-file-ts>-->
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfoPZ&&formData.attchmentFileInfoPZ.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfoPZ"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
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
                </el-form-item>
              </el-row>
              <!--          审批单位附件-->
              <el-row v-if="formData.attchmentFileInfoSP&&formData.attchmentFileInfoSP.length">
                <el-form-item style="marginLeft:-20px">
                  <el-col>审批单位附件</el-col>
                  <el-col :span="22">
                    <!--                <upload-file-ts :uploadConfig="uploadConfigSP" @fileList="fileList"></upload-file-ts>-->
                    <div
                      class="tree_w"
                      v-if="formData.attchmentFileInfoSP&&formData.attchmentFileInfoSP.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  formData.attchmentFileInfoSP"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
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
                </el-form-item>
              </el-row>
            </div>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--    传阅人员树-->
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :scircularizeLevel="scircularizeLevel"
      :checkIds="checkIds"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      :fromdata="formData"
      @showCompDialog="showCompDialogForCy"
      :treeTradeCode="treeTradeCode"
      :orgId="orgId"
    >
    <!--二次传阅添加传阅说明-->
     <template v-slot:secondCirculation v-if="ifShoeShuoming">
        <div class="explainBox">
          <div class="explainTitle">传阅说明</div>
          <div class="explainTextarea">
            <el-input type="textarea" :rows="3" v-model="formData.cyExplain"></el-input>
          </div>
        </div>
      </template>
    </treeCofigForCy>
    </treeCofigForCy>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/tree/tree-fawen";
import openOrDownLoadFile from "../../minixs/shiwuLineWord";
import shiwucommon from "../approval/minixs/shiwucommon";//事物审批公共方法
import viewDraft from "@/minixs/viewDraft";
import exportTable from "../../minixs/exportTable";
import treeCofigForCy from "@/components/tree/tree-cyTansun";
export default {
  name: "qcDetail",
  components: {
    selectPerson,
    treeCofigForCy
  },
  mixins: [openOrDownLoadFile,shiwucommon,viewDraft],
  data() {
    return {
      orgId: "", //传阅选择一级部门
      treeTradeCode: this.$businessCode.swglgg, //人员树交易线
      dialogTypeForCy: "",
      dialogTypeNowForCy: "",
      dialogTitForCy: "",
      scircularizeLevel: "2",
      loadingTreeForCy: "",
      singelCheckFForCy: "",
      dialogStateForCy: false,
      seletOptionsDataForCy: [],
      YRcheck: [],
      SP: "SP",
      QS: "QS",
      SP: "SP",
      YRDeal: {},
      CYexplain: false,
      CYfeedback: false,
      isapplyNo: false,
      ifShoeShuoming: false,
      firCYidea: true,
      secCYidea: true,
      rowData: {},
      isShow: false,
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },

      perCode: [],
      CYBackPer: [],
      isdialogCY: false,
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: false, // 单选true 多选为false
      dialogTypeNow: "next",
      treeData: [{ name: "中国建设银行", id: "007" }],

      fromType: "",
      checkType: [],
      select: "",
      radio: "",
      rules: {},
      formData: {
        title:""
      },
      khType: "",
      buttonList: [
        { name: "保存", show: true },
        { name: "查看申请", show: true },
        { name: "发传阅", show: true },
        { name: "传阅收回", show: false },
        { name: "已阅", show: true },
        { name: "反馈传阅意见", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
        { name: "操作指南", show: true }
      ],
      id: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
      zfId: "",
      CYmessage: "",
      feedbackMessage: "",
      shiwuState: "",
      formdata: {},
      isdialogYRDeal: false
    };
  },
  computed: {},
  methods: {
    YRhandleCloseDeal() {
      this.isdialogYRDeal = false;
    },
    backPerCY() {
      this.$api.checkLz
        .CYbackPer({
          userId: this.CYBackPer[0].split("_")[0]
        })
        .then(res => {})
        .catch(error => {
          this.CYBackPer = [];
        });
    },
    //查看申请
    //申请跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_WordTs",
        query: {
          state: "viewFile",
          id: this.id,
          zhengWenState: fileInfo.ifView,
          JYcode: "A08462002",
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          multiTenancyId: "000076767qwq0",
          cleanDraftFlag: true,
          showBtns: fileInfo.ifView == 0 ? false : true,
          serverUrl: "128.192.221.164"
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //查看申请
    viewApply() {
      if (!this.formData.xksqFileName && !this.formData.xksqFilePath) {
        this.$message({
          type: "warning",
          message: "此文档没有申请文档"
        });
        return;
      }
      let that = this;
      let file = {
        fileName: this.formData.xksqFileName,
        filePath: this.formData.xksqFilePath
      };
      var userinfoUnitId = JSON.parse(localStorage.getItem("userInfo")).unitId
      var unitidFlag
      var saveDataSums
      if(userinfoUnitId != this.formData.ejhAttachid) {
        unitidFlag = true
        if(this.formData.applyNo) {
          saveDataSums= this.formData.applyNo
        } else {
          saveDataSums= this.formData.virtualApplyNo
        }
      } else {
        unitidFlag = false
        if(this.formData.approveNo) {
         saveDataSums= this.formData.approveNo
        }else {
          saveDataSums= this.formData.virtualApproveNo
        }
      }
      this.viewFile(
        file,
        true,
        (saveDataSums) + this.formData.title
      );
    },
    //传阅说明关闭
    explainBtn() {
      this.CYexplain = false;
    },
    handleClose() {
      this.isdialogCY = false;
    },
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.saveData();
          break;
        case "发传阅":
          this.getTreeDataForCy("cy");
          break;
        case "已阅":
          this.finRead();
          break;
        case "传阅收回":
          this.circulRe();
          break;
        case "反馈传阅意见":
          this.feedback();
          break;
        case "查看申请":
          this.viewApply();
          break;
        case "打印处理单":
          this.printForm();
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(()=>{
             this.$api.checkLz
            .handleCollection({ id: this.id, dataType: 0,docType:1,numYear:this.numyear })
            .then(res => {
              this.downFile(res);
            })
          });
         
          // let titleId = "";
          // if (null ?? !this.formData.isKh) {
          //   titleId = "printHtmlBH";
          // } else {
          //   titleId = "printHtmlKH";
          // }
          // let that = this;
          // let shiwutitle =
          //   (this.formData.unitName || this.formData.curbank) +
          //   this.formData.applyProjectName +
          //   "审批处理单";
          // let draftInfo = this.formData.xksqFilePath
          //   ? [].concat(
          //       {
          //         fileName: this.formData.xksqFileName,
          //         filePath: this.formData.xksqFilePath
          //       },
          //       this.formData.attchmentFileInfo
          //     )
          //   : this.formData.attchmentFileInfo; //收藏时下载正文
          // exportTable.getPdf(
          //   shiwutitle,
          //   draftInfo,
          //   titleId,
          //   this.$businessCode.fawglfj,
          //   shiwutitle,
          //   that
          // );
          break;
        case "操作指南":
          this.handBook("SWSP");
          break;
      }
    },
    printForm() {
      let rowData = {};
      rowData.title =
        (this.formData.unitName || this.formData.curbank) +
        this.formData.applyProjectName +
        "审批处理单";
      rowData.id = this.id;
      rowData.idKh = this.formData.isKh;
      rowData.iscy = true;
      let copyRow = JSON.stringify(rowData);
      if (this.formData.isKh == 0) {
        this.$intent.goNewPage(this, {
          path: "/shiwuBenhang",
          query: { data: copyRow,numYear:this.numyear }
        });
      } else if (this.formData.isKh == 1) {
        this.$intent.goNewPage(this, {
          path: "/shiwuBenhangkh",
          query: { data: copyRow,numYear:this.numyear }
        });
      }
    },
    closeData() {
      this.$intent.closeWindow(this);
    },
    //反馈意见
    feedback() {
      this.CYfeedback = true;
    },
    feedBackBtn() {
      this.CYfeedback = false;
    },
    savefeedback() {
      if (this.formData.cyCount == "1") {
        this.formData.firsrCyidea = this.feedbackMessage;
      } else if (this.formData.cyCount == "2") {
        this.formData.secondCyidea = this.feedbackMessage;
      }
      this.$api.checkLz.checkCYAlter(this.formData).then(res => {
        this.CYfeedback = false;
        // this.queryDeal()
        if (res.code == "SUCCESS") {
          this.$message({
            message: "反馈传阅意见成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        }
      });
    },
    saveData() {
      if (this.id) {
        this.$api.checkLz.checkCYAlter(this.formData).then(res => {
          this.queryDeal();
          if (res.code == "SUCCESS") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
      } else {
        this.formData.khType = this.khType;
        this.formData.id = this.id;
        this.$api.checkLz.checkCYCreate(this.formData).then(res => {
          this.queryDeal();
          if (res.code == "SUCCESS") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
      }
    },
    //已阅
    finRead() {
      this.$api.checkLz
        .checkCYAlter({
          ...this.formData,
          isReadflag: "1"
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.$intent.closeWindow(this);
        });
    },
    //请求详情
    queryDeal() {
      this.$api.checkLz
        .checkCYDeal({
          id: this.id,
          numYear:this.numyear
          // parentId: this.rowData.parentId
        })
        .then(res => {
          this.formData = res.data;
          this.$set(
            this.formdata,
            "curUserId",
            JSON.parse(localStorage.getItem("userInfo")).humanId
          );
          this.$set(this.formdata, "deptId", res.data.curDepartId);
          sessionStorage.setItem("depId", res.data.curDepartId);
          this.orgId = res.data.curDepartId;
          this.id = res.data.id;
          this.zfId = res.zfId;
          this.formData.deptId=res.depId;
          this.formData.applyTime = res.applyTime;
          this.formData.cyFirstOpinionList = res.cyFirstOpinionList;
          this.formData.cySecondOpinionList = res.cySecondOpinionList;
          this.formData.markList = res.markList;
          this.formData.applyOpinionList = res.applyOpinionList;
          this.formData.checkOpinionList = res.checkOpinionList;
          this.formData.blqkOpinionList = res.blqkOpinionList;
          this.formData.explainList = res.cyExplainList;
          //申请文件
          this.formData.xksqFileName = res.xksqFileName;
          this.formData.xksqFilePath = res.xksqFilePath;
          //传阅说明
          if (this.formData.cyCount == "1") {
            this.ifShoeShuoming = true;
          } else {
            this.ifShoeShuoming = false;
          }
          //引入依据
          this.YRcheck = res.leadFileList;
          console.log(this.YRcheck, "---------", res.leadFileList);
          if (
            this.formData.secondReadPersion ||
            this.formData.secondUnreadPersion
          ) {
            this.buttonList[3].show = true;
          } else {
            this.buttonList[3].show = false;
          }
          //cyCount>=2不显示传阅按钮
          if (this.formData.cyCount >= 2) {
            this.buttonList[2].show = false;
            this.buttonList[3].show = false;
          }
          if (this.formData.cyCount == "1") {
            this.firCYidea = false;
            this.secCYidea = true;
          } else if (this.formData.cyCount == "2") {
            this.firCYidea = true;
            this.secCYidea = false;
          }
          this.getFileList();
        });
    },
    //查看说明
    viewAppro() {
      let that = this;
      if (this.formData.manageSystemName) {
        let file = {
          fileName: this.formData.manageSystemName,
          filePath: this.formData.manageSystemPath
        };
        this.viewFile(file, true);
      } else {
        this.$message({
          type: "warning",
          message: "暂无审批说明文档"
        });
      }
    },
    saveExplain() {
      this.formData.cyExplain = this.CYmessage;
      this.CYmessage = "";
      this.CYexplain = false;
      this.$api.checkLz.checkCYAlter(this.formData).then(res => {
        this.$api.checkLz
          .CYqueryPerTree({
            ...this.formData,
            ccbToken: localStorage.getItem("st")
          })
          .then(res => {
            this.dialogState = true;
            this.treeData = res.result.data;
            // this.seletOptionsData = res.list
          });
      });
    },
    //传阅请求树
    finAndSend() {
      this.CYexplain = true;
    },
    //选人成功操作
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        let id_name = [];
        let dataForm = {};
        if (data.length < 1) {
          this.$message({
            type: "warning",
            message: "请选择传阅人员"
          });
        } else {
          data &&
            data.map(item => {
              id_name.push(item.idStr + "_" + item.name);
              chooseDataName.push(item.name);
              chooseDataId.push(item.idStr);
            });
          dataForm.currentCode = "传阅";
          dataForm.curUserIds = id_name.join(",");
          // dataForm.curUserNames=chooseDataId.join(",")
          this.$api.checkLz
            .checkCYCreate({
              ...this.formData,
              ...dataForm
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.$intent.closeWindow(this);
              }
            });
        }
      }
    },
    //传阅收回选择人员
    circulRe() {
      this.$api.checkLz
        .regainCircul({
          id: this.id,
          dataType: "传阅"
        })
        .then(res => {
          this.perCode = res.list;
          if (this.perCode && this.perCode.length > 0) {
            this.isdialogCY = true;
          } else {
            this.$message({
              type: "warning",
              message: "当前登录人没有可收回传阅单"
            });
          }
        });
    },
    //传阅收回
    CYBacksure() {
      console.log("this.CYBackPer");
      if (!(this.CYBackPer && this.CYBackPer.length > 0)) {
        this.$message({
          type: "warning",
          message: "请选择传阅收回人员"
        });
        return;
      }
      let idArr = [];
      let nameArr = [];
      let residueName = [];
      let perID = [];
      let perCodeList = JSON.parse(JSON.stringify(this.perCode));
      this.CYBackPer &&
        this.CYBackPer.map(item => {
          idArr.push(item.split(",")[1]);
          nameArr.push(item.split(",")[0]);
        });
      nameArr &&
        nameArr.map(item => {
          perID.push(item.split("_")[0]);
        });
      perID &&
        perID.map(itemID => {
          for (let i = perCodeList.length - 1; i >= 0; i--) {
            if (itemID === perCodeList[i].curUserId) {
              perCodeList.splice(i, 1);
            } else {
              // perCodeList.splice(i, 1)
            }
          }
        });
      perCodeList &&
        perCodeList.map(item => {
          residueName.push(item.curUserId + "_" + item.curUserCn);
        });
      this.$api.checkLz
        .CYretrieve({
          mainId: this.id,
          checkId_names: nameArr.join(","),
          unCheckId_names: residueName.join(","),
          dataType: "传阅",
          ids: idArr.join(",")
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "收回成功",
              type: "success"
            });
            this.isdialogCY = false;
            this.$intent.closeWindow(this);
          }
        });
    },
    //传阅群组
    //获取传阅人员列表
    getTreeDataForCy(n) {
      if (n == "cy") {
        this.isCY = true;
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();
      this.orgIdForCy = JSON.parse(localStorage.getItem("userInfo")).currUnitId;
      this.treeDataforCy = {
        unitCode: JSON.parse(localStorage.getItem("userInfo")).currUnitId,
        id: ""
      };
      this.treeDataforCy[0].disabled = true;
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        let id_name = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            id_name.push(item.id + "_" + (item.name || item.text));
          });
          this.cy(id_name);
          // oldIds = this.formData.wyIds.split(" ")
          // oldNames = this.formData.wyPle.split(" ")
          // newIds = ids.filter((item)=>{
          //     return oldIds.indexOf(item)==-1;
          // })
          // newNames = names.filter((item)=>{
          //     return oldNames.indexOf(item)==-1;
          // })
          //
          // newNames = newNames.join(",");
          // newIds = newIds.join(",");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        // switch (dtype) {
        //     case "cy":
        //         this.formData.curUserName = newNames;
        //         this.formData.curUserId = newIds;
        //         this.cyCheckData = this.checkData;
        //         break;
        // }
        // if(!!this.formData.curUserName){
        //     this.cy();
        // }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
          this.checkIds = this.formData.wyIds
            ? this.formData.wyIds.split(";")
            : [];
          // if (this.cyCheckData.length) {
          //     newA = [].concat(this.cyCheckData);
          //     newA.map(item => {
          //         //选中的不可操作
          //         item.disabled = true;
          //     });
          // }
          this.checkData = this.cyCheckData;
          break;
      }
    },
    cy(id_name) {
      this.formData.curUserIds = id_name.join(",");
      console.log("传阅");
      this.$api.checkLz
        .checkCYCreate({
          ...this.formData,
          currentCode: "传阅"
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.queryDeal();
            this.$message({
              message: "操作成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
    },

    //侧边滚动
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
      if (scrolled < this.distance_wjys + 100) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_wjys - 200 &&
        scrolled < this.distance_qpyj + 200
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },
    //附件上传
    //附件块
    getFileList() {
      if (this.formData.isKh === "0") {
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            numYear:this.numyear
            // fileType:'1001'
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfo", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfo
            });
          });
      } else {
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            fileType: "1001",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfo", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfo
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            fileType: "1002",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoPZ", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfoPZ
            });
          });
        this.$api.setSysConfig
          .getTextemList({
            id: this.zfId,
            fileType: "1003",
            numYear:this.numyear
          })
          .then(res => {
            this.$nextTick(() => {
              this.$set(this.formData, "attchmentFileInfoSP", res.data);
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfoSP
            });
          });
      }
    }
  },
  activated() {},

  created() {
    if (this.$route.query.type || this.$route.query.id) {
      this.fromType = this.$route.query.type;
      // this.rowData = JSON.parse(this.$route.query.data)
      this.id = this.$route.query.id;
      this.queryDeal();
    }
  },
  mounted() {
    console.log("00000000000000000", this.orgId);
    sessionStorage.setItem(
      "st1",
      JSON.parse(localStorage.getItem("userInfo")).currUnitId
    );
    this.$api.checkLz.checkCYDeal({ id: this.id }).then(res => {
      this.formdata = res.data;
      this.formdata.markList = res.markList;
      this.formdata.checkOpinionList = res.checkOpinionList;
      this.formdata.applyOpinionList = res.applyOpinionList;
      this.formdata.sytyOpinionList = res.sytyOpinionList;
      this.formdata.cyOpinionList = res.cyOpinionList;
      this.formdata.blqkOpinionList = res.blqkOpinionList;
      this.YRcheck = res.leadFileList;
    });
    // 一次性计算赋值，减少滚动计算节点位置次数
    this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
    this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
    this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
    this.$nextTick(() => {
      document
        .querySelector("#bank_dispach_content")
        .addEventListener("scroll", this.onScroll);
    });
    window.addEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.qcDetail {
  // background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-left: 20px;
      float: right;
    }
  }

  .qcHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .process_content {
    width: 90%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 56px;
      margin-bottom: 20px;
      line-height: 56px;
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;

          span {
            color: #f60;
          }
        }
      }
      el-button span {
        color: #fff !important;
      }
    }

    .bottom-span {
      margin-top: 20px;

      span {
        margin-top: 20px;
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
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
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}

.bank_dispach_file_tit {
  width: 100%;
  /*height: 50px;*/
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.height_90 {
  height: 200px;
  margin-top: -180px;
}

.adviceInfo {
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.content-container {
  background-color: rgba(228, 231, 237, 0.32);
  border-radius: 4px;
  padding: 4px 6px 0 6px;
  word-break: break-all;
}
.opinion-wrapper{
    border:1px solid #e4e7ed;
    border-top: 0;
    border-bottom: 0;
}
.opinion-wrapper:first-child{
  border:1px solid #e4e7ed;
  border-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.opinion-wrapper:last-child{
    border-bottom-left-radius: 4px;
   border-bottom-right-radius: 4px;
    border:1px solid #e4e7ed;
    border-top: 0;
}

//.content-container:hover {
  //border: 1px solid #8996af;
//}
.pad_lr10 {
  margin: 0 16px;
}
//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
    }
    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.piece {
  overflow: hidden;
}
.piece .text1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.piece .text2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}
.chuanYue {
  overflow: hidden;
}
.chuanYue .chuanYue1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.chuanYue .chuanYue2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.guoCh {
  overflow: hidden;
}
.guoCh .guoCh1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.guoCh .guoCh2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.beiZh {
  overflow: hidden;
}
.beiZh .content {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.beiZh .name {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}
.printTableList {
  width: 94%;
  margin: 0 auto;

  tr {
    height: 32px;
    td {
      width: 12%;
      // text-align: center;
      // vertical-align: middle;
    }
  }
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
// .printButton {
//   position: absolute;
//   right: 28%;
//   z-index: 10;
//   top: 6%;
// }
td {
  border: solid #000 1px;
}
.tcont {
  padding-bottom: 5px;
  border-bottom: 1px solid #dac6c5;
}
.tcont:last-child {
  border-bottom: none;
}
.tcont2 {
  text-align: right;
  padding-top: 5px;
  width: 100%;
  height: 30px;
}
.tcont2 > div {
  float: right;
}
.issueTable {
  height: 100%;
  border-collapse: collapse;
  border: none;
  width: 100%;
}
.issueTable tr:nth-of-type(1) {
  border-top: none;
}
.issueTable tr:last-child {
  border-bottom: none;
}
.issueTable td {
  border: none;
}
.issueTable tr {
  line-height: 25px;
  text-align: center;
  border: solid 1px #000;
  border-left: none;
  border-right: none;
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
.printButton {
  position: absolute !important;
  top: 1% !important;
  /*left: 3% !important;*/
  right: 1% !important;
}
.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
  z-index: -999;
  position: absolute;
}
/deep/.explainTitle{
      line-height: 3;
}
</style>
<style lang="less" rel="stylesheet/less">
.el-message-box__btns .el-button:last-child{
  transform: translateX(-68px)!important;
}
</style>