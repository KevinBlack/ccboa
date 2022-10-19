<template>
  <div id="singleSuperviseHandleBJYB" class="bank_dispach greenLight">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>
        <div class="grid_comtent">
					<el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
					<el-button size="small" plain @click="dialogVisibleShouuhi = true" v-if="fromdata.curNodeCode!=800&&readFlag !='1'&&allowBack==true&&state == 2">收回</el-button>
					<el-button size="small" plain v-if="state == 2" @click="cuibanClick">催办</el-button>
					<el-button size="small" plain @click="flowScheme">查看流程</el-button>
					<el-button size="small" plain  @click="processSheet('/singlecld')">打印处理单</el-button>
          <el-button size="small" plain @click="shoucang">收藏</el-button>
					<el-button size="small" @click="caozuozhinan" plain>操作指南</el-button>
        </div>
      </el-col>
    </el-row>
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
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>

    <el-dialog title="生成文号" width="30%" :visible.sync="SetDocNoVisible">
      <div v-if="setDocFlag == 1">
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
      <div>
        <el-form-item label="编号">
          <el-input v-model="num"></el-input>
        </el-form-item>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SetDocNoVisible = false">取消</el-button>
        <el-button type="primary" @click="SetDocNoHandle">确定</el-button>
      </span>
    </el-dialog>


    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{fromdata.title}}</h3>
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
        >审批意见</a>
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
            <p class="bank_dispach_annotation_current" v-if="state == 2">
              当前处理人：
              <span>{{fromdata.curUser}}</span>
            </p>
            <p class="bank_article_illustrates bank_dispach_annotation_current">
              <span>专项督查办事项，请按时处理、及时反馈。</span>
            </p>
          </div>
          <el-form
            ref="fromdata"
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
                  <el-form-item label="立项依据" prop="projectBase" ref="projectBase">
                    <el-select
                      v-model="fromdata.projectBase"
                      placeholder="请选择"
                      disabled
                      style="width:100%"
                      @change="selectType"
                    >
                      <el-option
                        v-for="sendTypeitem in projectBaseList"
                        :key="sendTypeitem.label"
                        :label="sendTypeitem.label"
                        :value="sendTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急程度" :span="8" prop="pressingLevel" ref="pressingLevel">
                    <el-select
                      v-model="fromdata.pressingLevel" disabled
                      placeholder="请选择"
                      style="width:100%"
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
                <el-col :span="6" v-if="!donum">
                  <el-form-item label="编号" prop="superviseCode" ref="superviseCode">
                    <el-select
                      v-if="!donum"
                      v-model="fromdata.superviseCode" disabled
                      placeholder="请选择"
                      style="width:100%"
                    >
                      <el-option
                        v-for="redHeaditem in SredHead"
                        :key="redHeaditem.label"
                        :label="redHeaditem.label"
                        :value="redHeaditem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                
                <el-col v-if="!donum" :span="2" style="text-align:right">
                  <el-button plain disabled type="info">{{fromdata.doucumentNum}}号</el-button>
                </el-col>
                <el-col v-if="donum" :span="8" >
                  <el-form-item label="编号" prop="pTplNo" ref="pTplNo">
                     <el-input v-model="fromdata.doucumentNum" plain :title="fromdata.doucumentNum" disabled type="info">{{fromdata.doucumentNum}}</el-input>
                  </el-form-item>
                </el-col>
                
                <el-col :span="8">
                  <el-form-item label="登记日期" prop="registDate" ref="registDate">
                    <el-input v-model="fromdata.registDate" disabled @change="timeChangeDJ"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结项日期" prop="finishDate" ref="finishDate">
                    <el-input v-model="fromdata.finishDate" disabled @change="timeChangeJX"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="办理期限" prop="expireDate" ref="expireDate">
                    <el-input disabled v-model="fromdata.expireDate">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align:right">
                  <el-button plain disabled type="info">{{fromdata.handleTime}}</el-button>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="督办部门" prop="superviseDeptName" ref="superviseDeptName">
                    <el-input disabled v-model="fromdata.superviseDeptName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人" prop="contact" ref="contact">
                    <el-input disabled v-model="fromdata.contact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="contactPhone" ref="contactPhone">
                    <el-input disabled v-model="fromdata.contactPhone"
                     ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="督办依据" prop="superviseBasis" ref="superviseBasis">
                    <el-input v-model="fromdata.superviseBasis" disabled>
                      <el-button disabled slot="append" @click="appendMassage(fromdata.hostDepartment)">引入</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item v-for="(cbdwItem,index) in cbdwList" :key="index" :index="index">
                    <el-input :disabled="true" :value="cbdwItem">
                      <el-button slot="append" @click="deleteMassage(index)">删除</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="事由提要" prop="summary" ref="summary">
                    <el-input 
                    type="textarea"
                    resize="none"
                    autosize
                    v-model="fromdata.summary" 
                    disabled ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="详细描述" prop="detailDescription" ref="detailDescription">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-model="fromdata.detailDescription"
                      maxlength="500"
                      placeholder="填写详细描述可输入500字"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="承办单位" prop="undertakeOrgName" ref="undertakeOrgName">
                    <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.undertakeOrgName"
                        :title="fromdata.undertakeOrgName"
                        disabled
                        style="flex:1;color: red;"
                        class="hqbm"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="协办单位" prop="assistDeptName" ref="assistDeptName">
                     <div style="display:flex">
                      <el-input
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.assistDeptName"
                        :title="fromdata.assistDeptName"
                        placeholder="请选择协办单位"
                        readonly
                        class="redcolor hqbm"
                        disabled
                        style="flex:1;color: red;"
                      ></el-input>
                     </div>
                    <!-- <el-input
                      v-model="fromdata.assistDeptName"
                      :title="fromdata.assistDeptName"
                      disabled
                      readonly
                      class="redcolor"
                      placeholder="请选择协办单位"
                      style="width: 100%;"
                    >
                      <el-button
                        slot="append"
                        @click="getTreeData('xie')"
                        icon="el-icon-plus"
                        v-if="!sendXbSuccess"
                        disabled
                      ></el-button>
                    </el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label width="0">
                    <el-input
                      v-model="fromdata.assistFinishDeptName"
                      :title="fromdata.assistFinishDeptName"
                      style="min-height:53px !important;"
                      class="rightText"
                      placeholder
                      type="textarea"
                      resize="none"
                      autosize
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col>
                  <el-form-item label="传阅人员" prop="circllateName" ref="circllateName">
                    <el-input v-model="fromdata.circllateName"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
            <!-- 审批意见 -->
            <h6 class="bank_dispach_file_tit">审批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="行领导批示" prop="orgLeaderOpinion" ref="orgLeaderOpinion">
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <!-- </div> -->
                    <el-input type="textarea"
                      resize="none"
                      autosize v-model="fromdata.orgLeaderOpinion"
                      disabled
                      v-if="!(fromdata.opinionSuperviseOrgList && fromdata.opinionSuperviseOrgList.length)"
                      ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="立项审批意见" prop="deptOpinion" ref="deptOpinion">
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseDeptList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <el-input type="textarea"
                    resize="none"
                    autosize v-model="fromdata.deptOpinion"
                    disabled
                    v-if="!(fromdata.opinionSuperviseDeptList && fromdata.opinionSuperviseDeptList.length)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="审核意见" prop="projectBaseOpinion" ref="projectBaseOpinion">
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseBaseList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <el-input type="textarea"
                      resize="none"
                      disabled
                      autosize v-model="fromdata.projectBaseOpinion"
                      v-if="!(fromdata.opinionSuperviseBaseList && fromdata.opinionSuperviseBaseList.length)"
                      ></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-show="(this.fromdata.opinionDbOrgList&&this.fromdata.opinionDbOrgList.length>0||this.fromdata.isUndertakeOver == '1')">
                  <el-form-item label="持续跟踪意见">
                    <opinionText 
                      :opinionText="fromdata.opinionDbOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <el-input type="textarea"
                    resize="none"
                    autosize
                    disabled
                     v-model="fromdata.opinionDbOrg"
                    v-if="!(fromdata.opinionDbOrgList && fromdata.opinionDbOrgList.length)"
                    ></el-input></el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="承办单位办理情况">
                    <el-row class="tab_row">
                      <el-col :span="12" class="m10">
                        <el-form-item
                          label="承办开始时间"
                          prop="underTakeStartTime"
                          ref="underTakeStartTime"
                        >
                          <el-input v-model="fromdata.underTakeStartTime" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" class="m10">
                        <el-form-item label="承办完毕时间" prop="underTakeEndTime" ref="underTakeEndTime">
                          <el-input v-model="fromdata.underTakeEndTime" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" class="m10">
                        <el-form-item label="承办人" prop="underTakeUser" ref="underTakeUser">
                          <el-input v-model="fromdata.underTakeUser" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" class="m10">
                        <el-form-item label="联系电话" prop="underTakePhone" ref="underTakePhone">
                          <el-input v-model="fromdata.underTakePhone" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10">
                      <el-form-item label="承办意见" prop="underTakePhone" ref="underTakePhone">
                        <opinionText 
                            :opinionText="fromdata.opinionSuperviseUndertakeList" 
                            :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                            :nowUserId="nowUserId"
                            :curNodeCode="fromdata.curNodeCode"
                          ></opinionText>
                        <el-input type="textarea"
                          resize="none"
                          autosize
                          disabled
                          v-model="fromdata.undertakeOpnion" 
                          v-if="!(fromdata.opinionSuperviseUndertakeList && fromdata.opinionSuperviseUndertakeList.length)"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="m10">
                      <el-form-item label="承办附件" v-if="fromdata.underTakeAttchmentFileInfo&&fromdata.underTakeAttchmentFileInfo.length">
                        <div class="file_list_box" style="margin-left:0;">
                          <el-scrollbar>
                            <div v-for="(item,index) in fromdata.underTakeAttchmentFileInfo" :key="item.id" class="comp_list">  
                              <template>
                                <div class="command_file">
                                  <span class="order">{{index+1}}.</span>
                                   <span
                                      class="down"
                                      :title="item.fileName"
                                      @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.zxdbfj)"
                                    >{{item.fileName}}</span>
                                    <span class="name" :title="item.createrName">{{item.createrName}}</span>
                                    <span class="time">{{item.createTime}}</span>
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
                    </el-form-item>
                      </el-col>
                    </el-row>
                    
                    <el-col>
                      <!-- <loadAccessory></loadAccessory> -->
                    </el-col>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="24">
                  <el-form-item label="承办单位办理情况附件" prop="underTakeAttachmentDataId" ref="underTakeAttachmentDataId">
                    <el-input v-model="fromdata.underTakeAttachmentDataId" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>-->
                <!-- <loadAccessory></loadAccessory> -->
                <el-col :span="24">
                  <el-form-item label="协办单位办理情况" prop="documentNo" ref="documentNo">
                    <opinionText 
                      :opinionText="fromdata.opinionAssistFinishList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <el-input type="textarea"
                    resize="none"
                    autosize
                    disabled
                    v-if="!(fromdata.opinionAssistFinishList && fromdata.opinionAssistFinishList.length)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="结项审批"
                    prop="superviseFinishOpinion"
                    ref="superviseFinishOpinion"
                  >
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseFinishList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <el-input type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.superviseFinishOpinion" 
                      disabled
                      v-if="!(fromdata.opinionSuperviseFinishList && fromdata.opinionSuperviseFinishList.length)"
                      ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="办结情况" prop="setUpInfo" ref="setUpInfo">
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseSetupList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <el-input type="textarea"
                      resize="none"
                      autosize
                      disabled
                      v-model="fromdata.setUpInfo"
                      v-if="!(fromdata.opinionSuperviseSetupList && fromdata.opinionSuperviseSetupList.length)"
                      ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="催查记录" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.record" type="textarea" resize="none"
                    autosize disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="传阅意见" prop="documentNo" ref="documentNo">
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseCirculateList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :isCy='true'
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <el-input type="textarea"
                    resize="none"
                    autosize
                    disabled
                    v-if="!(fromdata.opinionSuperviseCirculateList && fromdata.opinionSuperviseCirculateList.length)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备注">
                    <template>
                      <opinionText 
                      :opinionText="fromdata.superviseRemarkList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :curNodeCode="fromdata.curNodeCode"
                      @deletService="deletService"
                      :isRemarks="true"
                      ></opinionText>
                      <el-input type="textarea"
                      resize="none"
                      disabled
                      autosize v-model="fromdata.superviseRemark"
                      v-if="!(fromdata.superviseRemarkList && fromdata.superviseRemarkList.length)"
                      ></el-input>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
             <!-- 传阅信息 -->
            <template>
              <h6 class="bank_dispach_file_tit">传阅信息</h6>
              <div id="cyxx" class="height_90"></div>
              <el-row>
                <el-col>
                  <el-form-item label="传阅人员"> 
                      <el-col class="m10 pr45">
                        <el-form-item  label-width="80px" label="未阅" prop="wbjFirstCirculate" ref="wbjFirstCirculate">
                          <el-input type="textarea"
                            resize="none"
                            autosize  v-model="fromdata.wbjFirstCirculate" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10 pr45">
                        <el-form-item label-width="80px" label="已阅" prop="ybjFirstCirculate" ref="ybjFirstCirculate">
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
            <el-row class="pr45">
              <!-- <loadAccessory></loadAccessory> -->
              <el-col>
                  <div
                    class="file_list_box"
                    v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in fromdata.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="order">{{index+1}}.</span>
                            <!-- 预览 -->
                            <span
                              class="down"
                              :title="item.fileName"
                              @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.zxdbfj)"
                            >{{item.fileName}}</span>
                            <span class="name" :title="item.createrName">{{item.createrName}}</span>
                            <span class="time">{{item.createTime}}</span>
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
              <el-col v-for="(item,n) in fkfj" :key="n">
                <el-form-item :label="item" :key="item">
                  <el-scrollbar class="file_list_box" style="margin-left:0;">
                    <div v-for="(item1,index) in fkfjList[n]" :key="item1.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="order">{{index+1}}.</span>
                          <span class="down" :title="item1.fileName" @click="viewDraftFile(item1.fileName,item1.filePath ,$businessCode.zxdbfj)">{{item1.fileName}}</span>
                          <span class="name">{{item1.createrName}}</span>
                          <span class="time">{{item1.createTime}}</span>
                          <div class="btns">
                            <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item1)"
                                round
                              >下载</el-button>
                          </div>
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
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :dialogTypeNow="dialogTypeNow"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="fromdata"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :loadingTree="loadingTree"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <el-dialog :visible.sync="numflag" title="生成编号">
      <el-form
        :model="numForm"
        :rules="rules"
        ref="numForm"
        label-width="100px"
        class="demo_ruleForm"
      >
        <el-col :span="14" class="dispatchParameterize_col">
          <el-form-item label="编号" prop="name">
            <el-input v-model="numForm.num" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="numflag = false">取 消</el-button>
        <el-button type="primary" @click = preserve>保存</el-button>
      </div>
    </el-dialog>
    <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import viewDraft from "@/minixs/viewDraft";
import exportTable from "@/minixs/exportTable";
import opinionText from "@/components/opinionText/index";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    uploadFiles,
    opinionText
  },
  data() {
    return {
      treeTradeCode:"",
      dialogVisibleShouuhi:false,//收回确定弹窗
			readFlag:"",
			allowBack:"",
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
      state: "", //判断是否为已办结单
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      DocNoDataList: [],
      SetDocNoVisible: false,
      setDocFlag:"",
      setDocNum: "",
      num:"",
      SsecretLimit: [
        { value: "0", label: "年" },
        { value: "1", label: "月" },
        { value: "2", label: "日" }
      ],
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      flag: false,
      deleteThis: false,
      // 秘密标志
      secretTypeFlag: false,
      SworkSecurity: false,
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
      SsecretTimeType: [],
      //确定完成并发送
      bank_doSend: {
        function: "doFinishAndSend",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        nextUserName: "", //人员名称
        nextUserId: "", //人员id
        pcsAvyId: "",
        processInstId: "",
        multiTenancyId: "",
        tplNo: ""
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: ""
      },
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        tplNo: "",
        multiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "selectById",
        id: this.$route.query.id,
        tiaoguo: this.$route.query.tiaoguo||'',
        // id: "1"
      },
      //下拉框列表
      bank_dispachfile: {
        function: "selConfigByParam",
        organizationId: ""
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: "行发文"
      },
      //提交
      bank_addToSendOrder: {
        function: "doStartWfe",
        id: "",
        multiTenancyId: "CN006",
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
        function: "unitTreeByFirst",
        flag: false
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      chenCheckData: [],
      assistDeptData: [],
      cbdwList: [], //督办依据添加
      buttons: [],
      buttonss: [],
      fromdata: {
        feedbackAttachmentMap:"",
        attachSort:[],
        attchmentFileInfo:[],
        secretTimeType: "",
        opinionSuperviseBaseList: [],//审核意见
        superviseRemarkList: [],//备注
        opinionSuperviseDeptList: [],//立项审批意见
        opinionSuperviseOrgList: [],//行领导批示
        opinionSuperviseFinishList: [],//结项审批
        opinionSuperviseSetupList:[],//办结情况
        opinionSuperviseCirculateList:[],//传阅意见
        opinionAssistFinishList:[],//协办单位办理情况
        processInstId: "", //流程实例标识
        pcsAvyId: "", //流程活动标示id
        handleTime:"",
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        curNodeName: "", //当前环节
        curUser: "", //当前环节处理人
        circllateName: "", //传阅人名称
        pressingLevel: "", //紧急程度
        projectBase: "", //立项依据
        doucumentNum: "", //编号
        registDate: "", //登记日期
        finishDate: "", //完成时间
        expireDate: "", //办理期限
        superviseDeptName: "", //督办部门
        contact: "", //联系人
        contactPhone: "", //联系人电话
        secretTypeName: "", //秘密类型名称
        secretLimitType: "", //密级类型
        superviseBasis: "", //督办依据
        summary: "", //事由提要
        detailDescription: "", //详细描述
        orgLeaderOpinion: "", // 行领导批示
        deptOpinion: "", //立项审批意见
        projectBaseOpinion: "", //审核意见
        underTakeInfo: "", //承办办理情况
        underTakeStartTime: "", //承办开始时间
        underTakeUser: "", //承办人
        underTakePhone: "", //承办人电话
        setUpInfo: "", //办结情况
        superviseRemark: "", //督办单备注
        security: "", //密级
        secretType: "", //秘密类型
        secretLimitName: "", //密级期限类型名称
        superviseCode: "",//编号
        sendOpinionMaxTime: "",
        undertakeOrgName: "", //承办单位名称
        undertakeOrg: "",//承办单位id
        assistDeptName: "", //协办部门名称
        assistDeptId: "",//协办部门id
        assistFinishDeptName: "",//已办结协办部门名称
        assistFinishDeptId: "",//已办结协办部门id
        curNodeId: "",
        tplNo: "",
        multiTenancyId: ""
      },
      handleDays: [],//办理期限
      projectBaseList: [],//立项依据
      SredHead: [],//编号
      SemergencyLevel: [],//紧急程度
      SsecretType: [],
      SsecretFlagType: [],
      chenCheckData: [], //树承办回显列表
      xieCheckData: [], //协办部门回显
      secretOptionsFlag: [],
      dateList: [
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
      rules:{
          pressingLevel: [{required:true,trigger: "change",message: "请选择紧急程度"}],
          projectBase: [{required: true,trigger: "change",message: "请选择立项依据"}],
          superviseCode: [{required: true,trigger: "change",message: "请输入编号"}],
          expireDate: [{required: true,trigger: "change",message: "请选择办理期限"}],
          contactPhone: [{required: true,trigger: "change",message: "请输入联系电话"}],
          superviseBasis: [{required:true ,trigger: "change",message: "请输入督办依据"}],
          summary: [{required: true,trigger: "change",message: "请输入事由提要"}],
          detailDescription: [{required:true,trigger: "change",message: "请输入详细描述"}],
          undertakeOrgName: [{required: true,trigger: "change",message: "请选择承办单位"}],
          assistDeptName: [{required: true,trigger: "change",message: "请选择协办单位"}],
      },
      imageUrl: "",
      fileList: [],
      tableData: [],
      active: "#wjys",
      timeShow: false, //查看流程
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      discheckData: [], //不可选数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      loadingTree:false,
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      dialogTypeNow: "", //当前弹窗类型
      baoWenZiDuan: this.$businessCode.zxdb,//专项督办交易线
      treeJyx: this.$businessCode.zxdbgg,//公共交易线
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: sessionStorage.getItem("ccboaHumanId"), //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      sendXbSuccess: false, //协办成功之后的按钮
      numflag:false,//生成编号弹框显隐标示
      donum:false,//编号宽度
      numForm:{},
      handleTime:"",
    // 生成文号/退号/生成上年文号
    doSaveDocumentNumFuc: {
      function: "doSaveDocumentNum",
      redHead: "",
      num: "",
      flag:"",
      id:""
    },
    };
  },
  mixins: [minixs,viewDraft,isNowUser],
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
    cuibanClick(){
      this.$post
        .postData(
          "cuiban",
          JSON.stringify({
            function:"cuiban",
            multiTenancyId:this.fromdata.multiTenancyId,
            processInstId:this.fromdata.processInstId,
            modualType:"supervise",
          }),
          this.$businessCode.zxdbgg
        )
        .then(res => {
            if(res.success){
              this.$message({
                type:'success',
                message:'催办成功'
              })
           }else{
             this.$message({
                type:'error',
                message:res.message
              })
           }
        });
    },
    tuihui(){
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.opinionSuperviseUndertakeList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.superviseRemarkList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.feedbackAttachmentMap;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.opinionAssistFinishList;
      let params = Object.assign(copyFrom,{function:'doWithdrawTask'})
      this.$post
        .postData(
          "doWithdrawTask",
          JSON.stringify(params),
          this.$businessCode.zxdbgg
        )
        .then(res => {
            if(res.success){
              this.$message({
                type:'success',
                message:'操作成功'
              })
              setTimeout(()=>{
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              },1000)
           }else{
             this.$message({
                type:'error',
                message:res.message
              })
           }
        });
    },
    fanhuishangyiclr(){
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.opinionSuperviseUndertakeList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.superviseRemarkList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.feedbackAttachmentMap;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.opinionAssistFinishList;
      let params = Object.assign(copyFrom,{function:'doReturnBeforeHuman'})
      this.$post
        .postData(
          "doReturnBeforeHuman",
          JSON.stringify(params),
          this.$businessCode.zxdbgg
        )
        .then(res => {
            if(res.success){
              this.$message({
                type:'success',
                message:'操作成功'
              })
              setTimeout(()=>{
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              },1000)
           }else{
             this.$message({
                type:'error',
                message:res.message
              })
           }
        });
    },
    //查看办理情况
    ckblqk(){},
    chuanyue(){},
    shoucang(){
      this.$confirm("您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
      let obj={
        function:'dbCollection',
        id: this.fromdata.id,//数据id
        flag:'dxdb',   //DXDB
        processInstId:this.fromdata.processInstId,
        documentCode: this.fromdata.doucumentNum >7?this.fromdata.doucumentNum:this.fromdata.superviseCode+this.fromdata.doucumentNum,  //文号
        curNodeCode: this.fromdata.curNodeCode,   //当前环节编号
        documentTitle:this.fromdata.title  //正文标题
      };
      this.$post
        .postData(
          "dbCollection",
          JSON.stringify(obj),
          this.$businessCode.zxdb
        )
        .then(res => {
          if (res.data && res.data.downloadUrl) {
            let file={
              function: "doDownloadFile",
              filePath:res.data.downloadUrl,
              fileName:res.data.fileName
            }
            this.$post
              .postData("doDownloadFile", JSON.stringify(file), this.$businessCode.nowjts)
              .then(res1 => {
                if (res1) {
                  if (res1 && res1.success) {
                    downLoadFileReName(
                      (this.$post.getEnvState()
                        ? location.origin
                        : "http://localhost:8080") +
                      "/ecpweb/getLocalFile.action?relativePath=" +
                      res1.filePath +
                      "&fileName=" +
                      res1.fileName,
                      res.data.fileName);
                  } else {
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
          }
        });})
    },
    deleteThisClick(){this.deleteThis=true},
    qiangzhishouhui(){
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.opinionSuperviseUndertakeList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.superviseRemarkList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.feedbackAttachmentMap;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.opinionAssistFinishList;
      let params = Object.assign(copyFrom,{function:'doWithdrawReturn'})
      this.$post
        .postData(
          "doWithdrawReturn",
          JSON.stringify(params),
          this.$businessCode.zxdb
        )
        .then(res => {
            if(res.success){
              this.$message({
                type:'success',
                message:'操作成功'
              })
              setTimeout(()=>{
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();
                window.close();
              },1000)
           }else{
             this.$message({
                type:'error',
                message:res.message
              })
           }
        });
    },
    getFrom(){
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.opinionSuperviseUndertakeList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.superviseRemarkList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.feedbackAttachmentMap;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.opinionAssistFinishList;
      return copyFrom;
    },
    chixugenzong(){
      let obj = {
        function: "doAgainSendUndertake",
      };
      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.opinionSuperviseUndertakeList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.superviseRemarkList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.feedbackAttachmentMap;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.opinionAssistFinishList;
      let params = Object.assign(copyFrom,obj);
      this.$post
        .postData(
          "doAgainSendUndertake",
          JSON.stringify(params),
          this.baoWenZiDuan
        )
        .then(res => {
            if(res.success){
              this.$message({
                type:'success',
                message:'操作成功'
              })
              setTimeout(()=>{
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              },1000)
              
           }
        });
    },
    timeChangeDJ(){
      this.fromdata.registDate = dateFormate.date(Date.parse(this.fromdata.registDate),'YYYY-MM-DD  HH:mm') 
    },
    timeChangeJX(){
      this.fromdata.finishDate = dateFormate.date(Date.parse(this.fromdata.finishDate),'YYYY-MM-DD  HH:mm') 
    },
    //生成编号
    createNum() {
      this.SetDocNoVisible = true;
      this.$post
        .postData(
          "getNumList",
          JSON.stringify({function:"getNumList",redHead:this.fromdata.superviseCode,id:this.fromdata.id}),
          this.baoWenZiDuan
        )
        .then(res => {
          if(res.data.flag == 1){
            this.setDocFlag = 1;
            this.DocNoDataList = res.data.map;
            this.setDocNum = Object.values(res.data.map)[0].split(";")[0] + "-0";
            this.$forceUpdate();
          }else{
            this.setDocFlag = 0;
          }
        });
    },
    //生成文号
    SetDocNoHandle() {
      const [stra, strb] = this.setDocNum.split("-");
      this.doSaveDocumentNumFuc.num = stra;
      this.doSaveDocumentNumFuc.flag = this.setDocFlag;
      this.doSaveDocumentNumFuc.id = this.fromdata.id;
      var day = new Date();
          var str = day.getFullYear();
      this.doSaveDocumentNumFuc.redHead = this.fromdata.superviseCode;
      this.$post
        .postData(
          "doSaveDocumentNum",
          JSON.stringify(this.doSaveDocumentNumFuc),
          this.baoWenZiDuan
        )
        .then(res => {
          let day = new Date();
          let str = day.getFullYear();
          let type = this.doSaveDocumentNumFuc.redHead;
          this.fromdata.doucumentNum = type +
            "〔" +
             str+
            "〕" +
            this.doSaveDocumentNumFuc.num + "号";
          this.preserve('2');
          this.donum = true;
        });
      this.SetDocNoVisible = false;
    },
    
    //办结督办单
    doFinish() {
      let obj = {
        function: "doFinish",
        id:this.fromdata.id,
        processInstId: this.fromdata.processInstId,
        tplNo:this.bank_doSend.tplNo,
        multiTenancyId:this.bank_doSend.multiTenancyId,
        pcsAvyId:this.bank_doSend.pcsAvyId,
        tplNo:this.fromdata.pTplNo
      };

      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.opinionSuperviseUndertakeList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.superviseRemarkList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.feedbackAttachmentMap;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.opinionAssistFinishList;
      let params = Object.assign(copyFrom,obj);

      this.$post
        .postData("doFinish", JSON.stringify(params), this.treeJyx)
        .then(res => {
          if(res.success){
            this.$message({
              type:'success',
              message:'办结成功'
            })
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            },1000)
             
          }
        });
    },
      
    // //督办
    // supreviseDb(){
    //    let checkboxdata=this.checkedsh.join(";")
    //    let shform = {
    //     function: "superviseReceive",
    //     id:this.receiveselect.id
    //   };
    //   this.$post
    //     .postData("superviseReceive", JSON.stringify(shform), this.fwTranId)
    //     .then(res => {
    //       if (res && res.success) {
    //         if (type) {
    //           this.$message({
    //             type: "success",
    //             showClose: true,
    //             offset: 400,
    //             message: "请求成功",
    //             duration: 1000
    //           });
    //         }
    //       }
    //     })
    //     .catch(erro => {
    //       this.$message({
    //         type: "error",
    //         offset: 400,
    //         showClose: true,
    //         message: "请求失败",
    //         duration: 1000
    //       });
    //     });
    // },

    //请求部门树数据
    getTreeData(n, m) {
      let name = "";
      let that = this;
      this.offenUse=false;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "chen":
          name = "承办部门";
          clearName = "undertakeOrgName";
          this.singelCheckF = true; //设置单选
          break;
        case "xie":
          name = "协办部门";
          clearName = "assistDeptName";
          break;
        case "fasong":
          name = "发送对象";
          clearName = "assistDeptName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(this.bank_main),
          this.treeJyx
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeOrgName") {
          this.fromdata.undertakeOrg = "";
          this.chenCheckData = [];
        }
        if (name === "assistDeptName") {
          this.fromdata.assistDeptId = "";
          this.xieCheckData = [];
        }
      }
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
          this.$businessCode.zxdbgg
        ).then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 500,
            });
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            },1000)
          }
        })
    },
    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
        case "chen":
          this.checkIds = this.fromdata.undertakeOrg
            ? this.fromdata.undertakeOrg.split(";")
            : [];
          this.checkData = this.chenCheckData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将协办选择人员 设置不可选
          if (this.xieCheckData.length) {
            newA = [].concat(this.xieCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.chenCheckData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.fromdata.assistDeptId
              ? this.fromdata.assistDeptId.split(";")
              : []
          );
          break;
        case "xie":
          this.checkIds = this.fromdata.assistDeptId
            ? this.fromdata.assistDeptId.split(";")
            : [];

          this.checkData = this.xieCheckData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将承办选择人员 设置不可选
          if (this.chenCheckData.length) {
            newA = [].concat(this.chenCheckData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.xieCheckData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.fromdata.undertakeOrg
              ? this.fromdata.undertakeOrg.split(";")
              : []
          );
          break;
        case "dosend":
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
        this.discheckData = this.checkData;

        switch (dtype) {
          case "chen":
            this.fromdata.undertakeOrgName = names;
            this.fromdata.undertakeOrg = ids;
            this.chenCheckData = this.checkData;

            break;
          case "xie":
            this.fromdata.assistDeptName = names;
            this.fromdata.assistDeptId = ids;
            this.xieCheckData = this.checkData;

            break;
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
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
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseCirculateList;
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionAssistFinishList;
      delete parseList.opinionSuperviseFinishList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.superviseRemarkList;
      let params = Object.assign(this.bank_doSend,parseList);
      this.$post
        .postData("doFinishAndSend", JSON.stringify(params), this.treeJyx)
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
    //发送办理单位
    sendUnit() {
      this.preserve('2').then((flag)=>{
        if(flag ==true){
          this.$confirm("承办单位："+this.fromdata.undertakeOrgName+
              "协办单位："+this.fromdata.assistDeptName   
            , "确认发送办理单位", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
          })
            .then(() => {
                var obj = {
                  id: this.fromdata.id,
                  function: "doSendUndertake"
                };
                this.$post
                  .postData("doSendUndertake", JSON.stringify(obj), this.baoWenZiDuan)
                  .then(res => {
                    if (!res.success) {
                      this.$message({
                        type: "error",
                        message: res.message
                      });
                    }else{
                      this.$message({
                        type: "success",
                        message: '发送办理单位成功'
                      });
                      setTimeout(()=>{
                        window.location.href = "about:blank";
                        window.opener.location.reload();
                        window.close();
                      },1500)
                    }
                  
                  });
            })
        }
      })
    },
    //点击 完成并发送 弹窗弹出
    async completeSending() {
      let judge = true;
      if(!this.fromdata.processInstId){
        this.preserve('2');
      }
      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
      //this.preserve();
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeNow = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.fromdata.nextNodeId = this.bank_doSend.nextNodeId; //下以环节id
      this.fromdata.nextNodeName = this.bank_doSend.nextNodeName;
      this.showCompDialog();
      this.preserve('2').then(
        (res)=>{
          if(res){
              this.$post.postData(
              "getNextNodeInfo",
              JSON.stringify(this.bank_selectConfig),
              this.treeJyx,
              true
            )
            .then(res => {
              this.seletOptionsData = res.data || [];
              let parms = Object.assign(this.bank_send,this.fromdata);
              parms.pcsAvyId = this.bank_send.pcsAvyId = res.data[0].PCSAVYID;

              this.$post
                .postData(
                  "selWfNode",
                  JSON.stringify(parms),
                  this.treeJyx,
                  true
                )
                .then(res => {
                  if(res.message == "Loading"){
                    this.loadingTree = true;
                  }else{
                    this.loadingTree = false;
                  }
                  this.treeData = res.data;
                })
                .catch(e => {
                });
            });
          }
        })
          
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
    //保存时校验
    saveCheck() {
      // let regT = /^[0-9]*$/;
      // let tips = "您有未输入字段!";
      // this.scrollIntoForm();
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
      // if (
      //   !this.fromdata.title ||
      //   !this.fromdata.submittedName ||
      //   !this.fromdata.handleType ||
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
      //   if (!regT.test(this.fromdata.phone)) {
      //     tips = "电话号码输入有误";
      //     this.$message({
      //       type: "error",
      //       showClose: true,
      //       offset: 400,
      //       message: tips,
      //       duration: 1000
      //     });
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }
    },
 //点击引入
    appendMassage(val) {
      this.cbdwList.push(val);
      this.fromdata.hostDepartment = "";
    },
    //引入删除
    deleteMassage(index) {
      this.cbdwList.splice(index, 1);
      //this.$forceUpdate()
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
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
        obj.push({
          id: item,
          name: names[n]
        });
      });
      return obj;
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
      //this.rules = this.copyRules;
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
      //this.rules = this.copyRules;
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
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
    // 下拉列表
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "selConfigByParam",
          JSON.stringify(this.bank_dispachfile),
          this.baoWenZiDuan
        )
        .then(res => {
          if(!this.fromdata.handleTime){
            this.handleTime = this.fromdata.handleTime = res.data.handleTime;
          } 
          this.projectBaseList = JSON.parse(res.data.basis);
          this.SemergencyLevel = JSON.parse(res.data.degree); 
          this.handleDays = JSON.parse(res.data.handleDays);
          this.SredHead = JSON.parse(res.data.number);
          if(!this.fromdata.expireDate){
            Object.assign(this.fromdata,{expireDate:res.data.term})
          }
          this.$nextTick(() => {
            this.$refs.fromdata.clearValidate();
          });
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      // this.getTcDocTypeDicByParam();
    },
    //初始值 //input框内容
    toEdit() {
      this.uploadConfig.id = this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageidDXDB") || "";
      let that = this;
      this.$post
        .postData(
          "selectById",
          JSON.stringify(this.bank_dispach),
          this.baoWenZiDuan
        )
        .then(res => {
          this.getIsNowUser(res)
          that.fromdata = res.data;
          //收回测试
            this.$post
            .postData(
              "checkTakeBack",
              JSON.stringify({function:"checkTakeBack",processInstId:res.data.processInstId}),
              this.$businessCode.zxdbgg
            )
            .then(res => {
              this.allowBack = res.allowBack;
            });
          //请求下拉数据
          this.getSendOrderDicByParam();
          this.bank_doSend.processInstId = res.data.processInstId;
          this.bank_doSend.multiTenancyId = res.data.multiTenancyId;
          this.bank_doSend.tplNo = res.data.pTplNo;
          this.bank_doSend.pcsAvyId = res.data.pcsAvyId;
          if(res.data.doucumentNum && res.data.doucumentNum.length >7){
            this.donum = true;
          }
          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.fromdata.attachSort = [];
          for(let i in this.fromdata.feedbackAttachmentMap){
            let k = 0;
            this.fkfj.push(i)
            this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i])
          }
          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_send.curTplNo = this.bank_selectConfig.tplNo =
            res.data.pTplNo;
          this.bank_send.curMultiTenancyId = this.bank_selectConfig.multiTenancyId =
            res.data.multiTenancyId;
          this.fromdata.superviseRemarkList =
            res.data.superviseRemarkList &&
            JSON.parse(res.data.superviseRemarkList);
          //初始化承、协办单位
          if (res.data.assistDeptId) {
            this.xieCheckData = this.concatTreeData(
              res.data.assistDeptId,
              res.data.assistDeptName
            );
          }
          if (res.data.undertakeOrg) {
            this.chenCheckData = this.concatTreeData(
              res.data.undertakeOrg,
              res.data.undertakeOrgName
            );
          }
          if(res.data.handleTime){
            this.handleTime = this.fromdata.handleTime = res.data.handleTime;
          }
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: erro,
          //   duration: 1000
          // });
        });
    },
    
    // 保存
    async preserve(type) {
      let successState = false;
      this.bank_dispach.id = sessionStorage.getItem("pageidDXDB") || "";
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseCirculateList;
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionAssistFinishList;
      delete parseList.opinionSuperviseFinishList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.superviseRemarkList;
      var obj = Object.assign(this.bank_addToSendOrder, parseList);
      await this.$post
        .postData("doStartWfe", JSON.stringify(obj), this.treeJyx)
        .then(res => {
          if (res && res.success) {
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            sessionStorage.setItem("pageidDXDB", res.data.id);
            if(type&&type!="2"&&type!="uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            if(type==="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
            }else{
            }
            this.toEdit();
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
      } else if (scrolled >= this.distance_qpyj && scrolled <= 1100) {
        this.active = "#qpyj";
      } else if (scrolled < this.distance_scfj) {
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
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.treeJyx
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
    processSheet(path,id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
            id:this.fromdata.id
        }
      });
      window.open(routeData.href, "_blank");
    },
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
              //this.doDraft(res);
              let data = this.$router.resolve({
                path: "/openAndSave_Word",
                query: {
                  state: this.zhengWenState != 1 ? "viewFile" : this.draftFlag,
                  id: this.fromdata.id,
                  zhengWenState: this.zhengWenState,
                  JYcode: this.$businessCode.swglfj,
                  multiTenancyId: this.fromdata.multiTenancyId,
                  relativePath: res ? res.filePath : "",
                  fileName: res ? res.fileName : "",
                  showBtns: false,
                  flowTranId:this.$businessCode.zxdb
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
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      var handbook = flagFile?self.$businessCode.zxdbfj:self.$businessCode.zxdbfj;
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
    // 操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "ZXDB"
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
          flowTranId:this.$businessCode.zxdbgg
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
    handleSave() {},
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
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "doDeletesendOrderOpinion",
          JSON.stringify(this.bank_deletToSendOrder),
          this.baoWenZiDuan
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
        .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById),this.$businessCode.zxdbfj)
        .then(res => {
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
          this.$businessCode.zxdbfj
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
    //正文跳转
    doDraft(fileInfo,saveName){
      let str = "";
      if(!saveName){
        str = this.fromdata.title
      }else{
        str = saveName;
      }
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
          flowTranId:this.$businessCode.zxdbgg,
          saveSpecialFileName:str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();

      window.open(data.href, "_blank");
    },
    downFile(file){
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
       this.$post
        .postData("doDownloadFile", JSON.stringify(this.bank_doDownloadFile),this.$businessCode.zxdbfj)
        .then(res => {
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
    }
  },
  created() {
		this.uploadConfig.code = this.$businessCode.zxdbfj;
		this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.treeTradeCode = this.$businessCode.zxdbgg;  //人员树交易线
    this.uploadConfig.flowTranId = this.treeTradeCode = this.zxdbgg;  //完成并发送 树 流程交易线   chai
    this.toEdit();
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.state = this.$route.query.state ? this.$route.query.state : "";
    this.bank_doSend.id = this.bank_dispach.id;
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};

const diffArr = (arr1, arr2) => {
  const eleIsNotnArr = (ele, arr) => {
    arr.some(m => m === ele);
    return marr1.filter(x => eleIsInArr(x, marr2));
  };
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
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid red;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: red;
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
.disable_w {
  width: 100%;
}
.tab_row {
  height: 50px;
}
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
.m10 {
  margin: 5px 0;
}
.redcolor {
  /deep/.el-input__inner{
    color: red !important;
  }
}
.fix_height>.dimi_btn{
    text-align: right;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: -55px;
    border: none !important;
  }
.bank_dispach_content .bank_dispach_file .bank_dispach_file_tit{
    height: 40px !important;
    line-height: 25px !important;
  }
.pr45 {
  padding-right: 45px;
}
.redcolor {
  /deep/.el-input__inner{
    color: red !important;
  }
}
/deep/ .hqbm .el-textarea__inner {
  color: red !important;
  min-height: 40px !important;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
/deep/ .hqbm1 .el-textarea__inner {
  min-height: 40px !important;
}

.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
}
/deep/ .rightText>.el-textarea__inner{
  min-height: 40px !important;
}
</style>
