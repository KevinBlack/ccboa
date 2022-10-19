<template>
  <div id="singleSuperviseHandleAdd" class="bank_dispach greenLight">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>发文处理单
        </p>
        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="closeHandler = true">关闭</el-button>
          <el-button size="small" v-for="(item,index) in buttonList" v-preventClick @click="buttonClick(item.type)" :key="index"
            v-show="buttonList[index].show"
            plain>{{item.name}}  
          </el-button>
        </div>
      </el-col>
    </el-row>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
    <el-dialog :title="dialoghuiqianTit" 
    v-dialogDrag
    :visible.sync="shdialog" width="50%">
      <el-card class="dialog_regain">
        <!-- <h6>选择要收回的协办部门</h6> -->
        <el-checkbox-group v-model="checkedsh">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.processInstId"
            @change="checkouthuiqian(item)"
            :key="index"
            v-show="item.curNodeCode != 800"
          >
            {{item.assistOrgName}}
          </el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog = false">取 消</el-button>
        <el-button type="primary" @click="shQueding(typeofHQBM)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生成文号弹窗 -->
    <el-dialog
      title="失败信息" 
      :visible.sync="dialogForscwhFail"
      v-dialogDrag
      width="50%"
      >
      <el-card>
        {{dialogForscwhFailMessage}}
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogForscwhFail = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="操作" 
      :visible.sync="shdialog1"
      v-dialogDrag
      width="50%"
      >
      <el-card>
        <el-checkbox-group v-model="checkedsh" @change="getNewName">
          <el-checkbox v-for="(item,index) in shData" :label="item.id" :key="index" >{{item.curUser}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="deleteThis"
        width="30%">
        <span>确认是否删除此文?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteThis = false">取 消</el-button>
          <el-button type="primary" @click="deleteThisWork">确 定</el-button>
        </span>
      </el-dialog>

    <el-dialog title="生成文号" width="30%" v-dialogDrag :visible.sync="SetDocNoVisible">
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
      <div v-else>
         <el-form>
          <el-form-item label="编号">
            <el-input v-model="doSaveDocumentNumFuc.num" @input="isNumber"></el-input>
          </el-form-item>
        </el-form>
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
            <p class="bank_dispach_annotation_current">
              当前处理人：
              <span>{{fromdata.curUser}}</span>
            </p>
            <p class="bank_article_illustrates bank_dispach_annotation_current">
              <span>专项督查办事项，请按时处理、及时反馈。</span>
            </p>
          </div>
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px" 
            class="demo_ruleForm"
            :disabled="state =='2'||state == '3'"
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
                      style="width:100%"
                      @change="selectType"
                      :disabled="readFields.projectBase"
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
                      v-model="fromdata.pressingLevel"
                      placeholder="请选择"
                      style="width:100%"
                      :disabled="readFields.pressingLevel"
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
                      v-model="fromdata.superviseCode"
                      placeholder="请选择"
                      :disabled="readFields.superviseCode"
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
                     <el-input v-model="fromdata.doucumentNum" plain  :title="fromdata.doucumentNum"  disabled type="info">{{fromdata.doucumentNum}}</el-input>
                  </el-form-item>
                </el-col>
                
                <el-col :span="8">
                  <el-form-item label="登记日期" prop="registDate" ref="registDate">
                    <el-input v-model="fromdata.registDate" @change="timeChangeDJ" :disabled="readFields.registDate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结项日期" prop="finishDate" ref="finishDate">
                    <el-input v-model="fromdata.finishDate" @change="timeChangeJX" :disabled="readFields.finishDate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="办理期限" prop="expireDate" ref="expireDate">
                    <el-input v-model="fromdata.expireDate" @input="getValue($event)" :disabled="readFields.expireDate">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align:right">
                  <el-button plain disabled type="info">{{handleTime}}</el-button>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="督办部门" prop="superviseDeptName" ref="superviseDeptName">
                    <el-input v-model="fromdata.superviseDeptName" :disabled="readFields.superviseDeptName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人" prop="contact" ref="contact">
                    <el-input v-model="fromdata.contact" :disabled="readFields.contact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="contactPhone" ref="contactPhone">
                    <el-input v-model="fromdata.contactPhone"
                      @input="changeContactPhone"
                     :disabled="readFields.contactPhone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="督办依据" prop="superviseBasis" ref="superviseBasis">
                    <el-input v-model="fromdata.superviseBasis" :disabled="readFields.superviseBasis" @input="changeValue($event)">
                      <!-- <el-button slot="append" :disabled="readFields.superviseBasis" @click="appendMassage(fromdata.superviseBasis)">引入</el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col>
                  <el-form-item v-for="(cbdwItem,index) in cbdwList" :key="index" :index="index">
                    <el-input :disabled="true" :value="cbdwItem">
                      <el-button slot="append" @click="deleteMassage(index)">删除</el-button>
                    </el-input>
                  </el-form-item>
                </el-col> -->
                <el-col>
                  <el-form-item label="事由提要" prop="summary" ref="summary">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize 
                      v-model="fromdata.summary" 
                      :disabled="readFields.summary" 
                      maxlength="500" 
                      placeholder="填写事由提要可输入500字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="详细描述" prop="detailDescription" ref="detailDescription">
                    <el-input
                      type="textarea"
                      resize="none"
                      autosize
                      v-model="fromdata.detailDescription"
                      :disabled="readFields.detailDescription"
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
                        readonly
                        :disabled="readFields.undertakeOrgName"
                        placeholder="请选择承办部门"
                        style="flex:1;color: red;"
                        class="hqbm"
                      ></el-input>
                      <button
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        :disabled="(readFields.undertakeOrgName&&fromdata.isUndertakeOver!='0')||readFields.isADDCB" 
                        @click="getTreeData('chen')"
                        icon="el-icon-plus"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
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
                        :disabled="readFields.assistDeptId"
                        style="flex:1;color: red;"
                      ></el-input>
                      <button
                        @click="getTreeData('xie')"
                        icon="el-icon-plus"
                        v-if="fromdata.isUndertakeOver == 0"
                        :disabled="!(fromdata.isUndertakeOver == 0 ||((fromdata.isUndertakeOver == 2||fromdata.isUndertakeOver == 3)))||readFields.assistDeptId"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                      >
                        <i class="el-icon-plus"></i>
                      </button>
                      <el-button
                      type="button"
                      class="el-button el-button--default dimi_btn1"
                      @click="getTreeData('xie', '1')" 
                      v-if="fromdata.isUndertakeOver != 0"
                      :disabled="!(fromdata.isUndertakeOver !=0)||readFields.assistDeptId"
                      >增发</el-button>
                      <el-button
                        :disabled="!(fromdata.isUndertakeOver !=0)||readFields.assistDeptId"
                        @click="takeBackSign('shouhui')"
                        v-if="fromdata.isUndertakeOver != 0"
                         type="button"
                        class="el-button el-button--default dimi_btn1"
                      >收回</el-button>
                    </div>
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
                <el-col>
                  <el-form-item label="传阅人员" prop="circulatePersonNames" ref="circulatePersonNames">
                    <el-input
                      v-model="fromdata.circulatePersonNames"
                      readonly
                      placeholder=""
                      style="width: 100%;"
                      :disabled="readFields.circulatePersonNames"
                    >
                      <el-button slot="append" @click="takeBackSignCY('shouhui','cy')" v-if="fromdata.isHasCY == 1">收回</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 审批意见 -->
            <h6 class="bank_dispach_file_tit">审批意见</h6>
            <div id="qpyj" class="height_90"></div>
            <div>
              <el-row class="pr45">
                <el-col>
                  <el-form-item label="行领导批示" prop="orgLeaderOpinion" ref="orgLeaderOpinion">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        @input="changeDage"
                        maxlength="500"
                        autosize
                        v-model="fromdata.orgLeaderOpinion"
                        :disabled="editedIdeaFields.orgLeaderOpinion"
                        v-if="!editedIdeaFields.orgLeaderOpinion  
                        || (editedIdeaFields.orgLeaderOpinion && !(fromdata.opinionSuperviseOrgList && fromdata.opinionSuperviseOrgList.length))"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=1
                        ,fromdata.orgLeaderOpinion&&fromdata.orgLeaderOpinion.length
                        )"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.orgLeaderOpinion"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="立项审批意见" prop="deptOpinion" ref="deptOpinion">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        @input="changeDage"
                        maxlength="500"
                        autosize
                        v-model="fromdata.deptOpinion"
                        :disabled="editedIdeaFields.deptOpinion"
                        v-if="!editedIdeaFields.deptOpinion  
                        || (editedIdeaFields.deptOpinion && !(fromdata.opinionSuperviseDeptList && fromdata.opinionSuperviseDeptList.length))"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=2,
                        fromdata.deptOpinion&&fromdata.deptOpinion.length
                        )"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.deptOpinion"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseDeptList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="审核意见" prop="projectBaseOpinion" ref="projectBaseOpinion">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        @input="changeDage"
                        maxlength="500"
                        autosize
                        v-model="fromdata.projectBaseOpinion"
                        :disabled="editedIdeaFields.projectBaseOpinion"
                        v-if="!editedIdeaFields.projectBaseOpinion  
                        || (editedIdeaFields.projectBaseOpinion && !(fromdata.opinionSuperviseBaseList && fromdata.opinionSuperviseBaseList.length))"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=3,
                        fromdata.projectBaseOpinion&&fromdata.projectBaseOpinion.length
                        )"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.projectBaseOpinion"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseBaseList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col v-show="fromdata.isUndertakeOver == '1'||(fromdata.opinionDbOrgList&&fromdata.opinionDbOrgList.length>0)">
                  <el-form-item label="持续跟踪意见">
                    <el-input type="textarea"
                        resize="none" 
                        autosize
                        @input="changedata"
                        v-model="fromdata.opinionDbOrg" 
                        v-if="fromdata.isUndertakeOver == '1'&&!editedIdeaFields.opinionDbOrg"
                      ></el-input>
                      <opinionText 
                      :opinionText="fromdata.opinionDbOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    </el-form-item>
                </el-col>
                <!-- :disabled="fromdata.isUndertakeOver != '1'||editedIdeaFields.opinionDbOrg" -->
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
                        <el-input type="textarea"
                          resize="none"
                          autosize
                          v-model="fromdata.undertakeOpnion" disabled
                          v-if="!(fromdata.opinionSuperviseUndertakeList && fromdata.opinionSuperviseUndertakeList.length)"
                          ></el-input>
                          <opinionText 
                            :opinionText="fromdata.opinionSuperviseUndertakeList" 
                            :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                            :nowUserId="nowUserId"
                            :curNodeCode="fromdata.curNodeCode"
                          ></opinionText>
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

                <!-- <el-col>
                  <el-form-item label="承办单位办理情况附件" prop="underTakeAttachmentDataId" ref="underTakeAttachmentDataId">
                    <el-input v-model="fromdata.underTakeAttachmentDataId" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>-->
                <!-- <loadAccessory></loadAccessory> -->
                <el-col>
                  <el-form-item label="协办单位办理情况" prop="documentNo" ref="documentNo">
                    <el-input type="textarea"
                    resize="none"
                    autosize
                    disabled
                    v-if="!(fromdata.opinionAssistFinishList && fromdata.opinionAssistFinishList.length)"
                    ></el-input>
                    <opinionText 
                      :opinionText="fromdata.opinionAssistFinishList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item
                    label="结项审批"
                    prop="superviseFinishOpinion"
                    ref="superviseFinishOpinion"
                  >
                    
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        @input="changeDage"
                        maxlength="500"
                        autosize
                        v-model="fromdata.superviseFinishOpinion"
                        :disabled="editedIdeaFields.superviseFinishOpinion"
                        v-if="!editedIdeaFields.superviseFinishOpinion  
                        || (editedIdeaFields.superviseFinishOpinion && !(fromdata.opinionSuperviseFinishList && fromdata.opinionSuperviseFinishList.length))"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=4,
                        fromdata.superviseFinishOpinion&&fromdata.superviseFinishOpinion.length
                        )"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.superviseFinishOpinion"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseFinishList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="办结情况" prop="setUpInfo" ref="setUpInfo">
                    
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        @input="changeDage"
                        maxlength="500"
                        autosize
                        v-model="fromdata.setUpInfo"
                        :disabled="editedIdeaFields.setUpInfo"
                        v-if="!editedIdeaFields.setUpInfo  
                        || (editedIdeaFields.setUpInfo && !(fromdata.opinionSuperviseSetupList && fromdata.opinionSuperviseSetupList.length))"
                      ></el-input>
                      <button
                        @click="writelistbox(clickTypes=5,
                        fromdata.setUpInfo&&fromdata.setUpInfo.length
                        )"
                        type="button"
                        class="el-button el-button--default dimi_btn"
                        v-show="!editedIdeaFields.setUpInfo"
                      >
                        <i class="icon-font el-icon-edit select-chang"></i>
                      </button>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseSetupList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="催查记录" prop="record" ref="record">
                    <el-input v-model="fromdata.record" type="textarea" resize="none"
                    autosize disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="传阅意见">
                    <el-input type="textarea"
                      resize="none"
                      autosize disabled
                      v-if="!(fromdata.opinionSuperviseCirculateList && fromdata.opinionSuperviseCirculateList.length)"
                      ></el-input>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseCirculateList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :isCy="true"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备注">
                    <template>
                      <el-input type="textarea"
                      resize="none"
                      maxlength="500"
                      autosize v-model="fromdata.superviseRemark" :disabled="editedIdeaFields.superviseRemark"
                      v-if="!editedIdeaFields.superviseRemark||(editedIdeaFields.superviseRemark 
                      && !(fromdata.superviseRemarkList && fromdata.superviseRemarkList.length))"
                      ></el-input>
                      <opinionText 
                      :opinionText="fromdata.superviseRemarkList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :curNodeCode="fromdata.curNodeCode"
                      @deletService="deletService"
                      :isRemarks="true"
                      ></opinionText>
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
              <uploadFiles v-if="fromdata.isUndertakeOver=='1'||fromdata.isUndertakeOver=='0'" ref="uploadComponent" @preserve="preserve" :uploadConfig="uploadConfig"></uploadFiles>
              <!-- <uploadFiles v-if="state<2&&fromdata.doucumentNum.length<8" ref="uploadComponent" @preserve="preserve" :uploadConfig="uploadConfig"></uploadFiles> -->
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
                              v-if="fromdata.isUndertakeOver=='1'||fromdata.isUndertakeOver=='0'"
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
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :checkIds="checkIds"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :scircularizeLevel="scircularizeLevel"
      :seletOptionsData="seletOptionsDataForCy"
      @showCompDialog="showCompDialogForCy"
      :fromdata="fromdata"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>
    <treeCofig
      :treeData="treeData"
      :defaultUser="defaultUser"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :useNewDialog="useNewDialog"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :fromdata="fromdata"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
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
    <el-dialog 
    v-dialogDrag
    :visible.sync="numflag" title="生成编号">
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
import treeCofigForCy from "@/components/tree/tree-cy";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/index";
import closeMessage from 'components/closeMessage/index';
import viewDraft from "@/minixs/viewDraft";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    uploadFiles,
    treeCofigForCy,
    opinionText,
    closeMessage
  },
  data() {
    return {
      dialogForscwhFail:false,
      dialogForscwhFailMessage:'',
      closeHandler:false,
      useNewDialog:false,
      defaultUser:{},//完成并发送默认值
      scircularizeLevel:'1',//传阅常用联系人修改 12.21
      treeTradeCode:"",
      dialogTypeForCy:'',
      dialogTypeNowForCy:'',
      dialogTitForCy:'',
      loadingTreeForCy:'',
      singelCheckFForCy:'',
      dialogStateForCy:false,
      seletOptionsDataForCy:[],
      cyper:'',
      cyid:'',
      fkfj:[],//反馈附件
      checkedsh:[],
      shData:[],
      shdialog1:false,//收回弹窗
      shdialog: false, //收回弹窗
      checkedshid:[],//收回列表ids
      checkedshassistDeptId:[],//收回列表ids
      checkeddq: [], // 读取的值
      checkedids:[],//增发协办单的id
      dialoghuiqianTit:"",
      checkNames:[],
      cyCheckData:[],
      dialogTypeZF:"",
      addSendType:'',
      transIds:'',
      fkfjList:[],//反馈附件
      uploadConfig:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true
      },
      uploadConfig1:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true
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
      nodata: "",
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
      offenDevices: [],
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
        id: this.$route.query.id
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
        function: "doDeleteOpinionById",
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
      handleTime:"",
      chenCheckData: [],
      assistDeptData: [],
      cbdwList: [], //督办依据添加
      buttons: [],
      buttonss: [],
      fromdata: {
        feedbackAttachmentMap:[],
        attachSort:[],
        pTplNo:"",
        handleTime:'',
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
        superviseOrgId:"",
        processInstId: "", //流程实例标识
        pcsAvyId: "", //流程活动标示id
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        curNodeName: "", //当前环节
        curUser: "", //当前环节处理人
        circulatePersonNames: "", //传阅人名称
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
        superviseBasis: '', //督办依据
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
      takeBackDeptIdsNew:"",
      handleDays: [],//办理期限
      projectBaseList: [],//立项依据
      SredHead: [],//编号
      SemergencyLevel: [],//紧急程度
      SsecretType: [],
      SsecretFlagType: [],
      xieCheckData: [], //协办部门回显
      secretOptionsFlag: [],
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
      createSighWf: {
        function: "doAddAssist",
        deptIds: "",
        deptNames: "",
        doAddAssistByType:'1',
        id:''
      },
      rules: {},
      imageUrl: "",
      fileList: [],
      tableData: [],
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
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanCode,
      clickSaveAndSend: false, //点击完成并发送标示
      sendXbSuccess: false, //协办成功之后的按钮
      numflag:false,//生成编号弹框显隐标示
      donum:false,//编号宽度
      flowTranId:"",
      numForm:{},
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      //控制03
    huanJieMessage:{},
    readFields:{
      circulatePersonNames:false,
      projectBase:false,
      pressingLevel:false,
      superviseCode:false,
      pTplNo:false,
      registDate:false,
      finishDate:false,
      expireDate:false,
      contactPhone:false,
      superviseBasis:false,
      superviseDeptName:false,
      contact:false,
      summary:false,
      detailDescription:false,
      undertakeOrgName:false,
      assistDeptId:false,
      circulatePersonNames:false,
      isADDCB:false,
      isCXGZ:false,
    },
    requiredFields: {
      circulatePersonNames:false,
      projectBase:false,
      superviseCode:false,
      pressingLevel:false,
      pTplNo:false,
      expireDate:false,
      contactPhone:false,
      superviseBasis:false,
      summary:false,
      detailDescription:false,
      undertakeOrgName:false,
      assistDeptId:false,
    },//必填控制域
    editedIdeaFields: {
      opinionDbOrg: true,
      orgLeaderOpinion: true,
      deptOpinion: true,
      projectBaseOpinion: true,
      superviseFinishOpinion: true,
      setUpInfo: true,
      circulateOpinion: true,
      superviseRemark: true,
    },//可编辑意见域
    requiredIdeaFields: {
      opinionDbOrg: false,
      orgLeaderOpinion: false,
      deptOpinion: false,
      projectBaseOpinion: false,
      superviseFinishOpinion: false,
      setUpInfo: false,
      circulateOpinion: false,
      superviseRemark: false,
    },//必填意见域

    buttonList: [
      {name: '保存', type: 'btn_bc', show: false},
      {name: "完成并发送", type: "btn_wcbfs", show: false},
      {name: "返回上一处理人", type: "btn_fhsyclr", show: false},
      {name: "删除此文", type: "btn_sccw", show: false},
      {name: "生成编号", type: "btn_scbh", show: false}, 
      {name: "传阅", type: "btn_cy", show: false},
      {name: "发送办理单位", type: "btn_fsbldw", show: false},
      {name: "发送协办单位", type: "btn_fsxbdw", show: false}, 
      {name: "查看办理情况", type: "btn_ckblqk", show: false},
      {name: "退回", type: "btn_th", show: false},
      {name: "催办", type: "btn_cb", show: false},
      {name: "强制收回", type: "btn_qzsh", show: false},
      {name: "持续跟踪", type: "btn_cxgz", show: false},
      {name: "结项", type: "btn_finish", show: false}, 
      {name: "查看流程", type: "btn_cklc", show: false}, 
      {name: "打印处理单", type: "btn_dycld", show: false}, 
      {name: "收藏", type: "btn_sc", show: false}, 
      {name: "操作指南", type: "btn_czzn", show: false}, 

    ],
    // 生成文号/退号/生成上年文号
    doSaveDocumentNumFuc: {
      function: "doSaveDocumentNum",
      redHead: "",
      num: "",
      flag:"",
      id:"",
      year:"",
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
    buttonClick(params){
        switch(params){
            case "btn_bc":
                this.preserve('save');
                break;
            case "btn_wcbfs":
                this.completeSendingIsTrue();
                break;
            case "btn_fsbldw":
                this.sendUnit();
                break;
            case "btn_cb":
                this.cuiban();
                break;
            case "btn_cy":
              if(this.fromdata.isHasCY == 1){
                this.getTreeDataForCy('cy',1);
              }else{
                this.getTreeDataForCy('cy');
              }
                break;
            case "btn_cxgz":
                this.chixugenzong();
                break;
            case "btn_th":
                this.tuihui();
                break;
            case "btn_sccw":
                this.deleteThisWork();
                break;
            case "btn_qzsh":
                this.qiangzhishouhui();
                break;
            case "btn_fsxbdw":
                this.handleSendHQPtmt();
                break;
            case "btn_fhsyclr":
                this.fanhuishangyiclr();
                break;
            case "btn_scbh":
                this.createNum();
                break;
            case "btn_finish":
                this.doFinish();
                break;
            case "btn_ckblqk":
                this.ckblqk();
                break;
            case "btn_sc":
                this.shoucang();
                break;
            case "btn_cklc":
                this.flowScheme();
                break;
            case "btn_dycld":
                this.processSheet('/singlecld');
                break;
            case "btn_czzn":
                this.caozuozhinan();
                break;

        }
    },
    async btnCloseHandler(val){
      if(val == 1){
        this.handleSetLoacl();
        window.close();
      }else if(val == 2){
        await this.preserve();
        window.location.href = "about:blank";
        window.opener.location.reload();
        this.handleSetLoacl();
        window.close();
      }else{
        this.closeHandler = false
      }
    },
     //请求传阅部门树数据
    getTreeDataForCy(n,m) {
      if(n=="cy"){
        this.isCY=true
        this.dialogTypeForCy = "dosend";
      }
      let name = "";
      this.addSendType = m;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForCy = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForCy = n;
      if(n=='cy'&&m=='1'){
        this.dialogTypeNowForCy='zengfa'
      }
      switch (n) {
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTitForCy = name;
      this.showCompDialogForCy();
      if(m==1){
        this.dialogTypeNowForCy = "zengfa";
      }
       this.$post
      .postData(
        "selectUserByCirculate",//传阅常用联系人修改 12.21
        JSON.stringify({
            function: "selectUserByCirculate",//传阅常用联系人修改 12.21
            level: this.scircularizeLevel,//传阅常用联系人修改 12.21
            flag: true
          }),
        this.$businessCode.zxdbgg
      )
      .then(res => {
        if (res.message == "Loading") {
          this.loadingTreeForCy = true;
        } else {
          this.loadingTreeForCy = false;
        }
        this.treeData = (res && res.data) || [];
        this.treeData[0].disabled = true;
      });
    },
    //回显传阅人员
    backDialogDataForCy(type) {
      let newA = [];
      switch (type) {
        case "cy":
            this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
            if (this.cyCheckData.length) {
              newA = [].concat(this.cyCheckData);
              newA.map(item => {
                //选中的不可操作
                item.disabled = true;
              });
            }
            this.checkData = this.cyCheckData;
            
            break;
        case "zengfa":
            this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
            if (this.cyCheckData.length) {
              newA = [].concat(this.cyCheckData);
              newA.map(item => {
                //选中的不可操作
                item.disabled = true;
                console.log(item)
              });
            }
            this.checkData = this.cyCheckData;
            break;
      }
    },
    //传阅人员
    showCompDialogForCy(data, status, type, params, dtype){
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        
        let newIds = [];
        let oldIds = [];
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
          this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
              names.push(item.name || item.text);
              ids.push(item.id);
              that.checkIds.push(item.id);
          });
           if (this.addSendType == '1') {
            oldIds = this.fromdata.circulatePersonIds.split(";")
            oldNames = this.fromdata.circulatePersonNames.split(";")
            ids.filter((item,i)=>{
              if(oldIds.indexOf(item)==-1){
                newNames.push(names[i])
                newIds.push(ids[i])
              }
            })
          }
          
          names = names.join(";");
          this.transIds = ids = ids.join(";");
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
          case "cy":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
          case "zengfa":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
        }
        if (this.addSendType == '1') {
            this.sendCy(newIds, newNames);
        }
        if(this.addSendType != '1' && dtype == "cy"){
          this.sendCy();
        }
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }

      this.dialogStateForCy = !this.dialogStateForCy;
      //打开弹窗 回显
      if (this.dialogStateForCy) {
        this.backDialogDataForCy(this.dialogTypeNowForCy);
      }
    },
    changeValue(e){
      this.$forceUpdate();
    },
    cuiban(){
        this.$confirm("是否进行催办操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
          })
            .then(() => {
              this.$post
            .postData(
              "doSuperviseUrge",
              JSON.stringify({
                function:"doSuperviseUrge",
                id:this.fromdata.id,
                tplbsnid:"DXZXDB_CB",
                pcsAvyId:this.fromdata.pcsAvyId,
                undertakeOrg:this.fromdata.undertakeOrg
              }),
              this.$businessCode.zxdb
            )
            .then(res => {
              if(res.success){
                this.$message({
                  type:'success',
                  offset: 100,
                  showClose: true,
                  message: "已催办成功",
                  duation: 1000
                })
                this.toEdit();
              }else{
                this.$message({
                    type:'error',
                    message:res.message
                  })
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1000
          });
        });


    },
    tuihui(){
      this.$confirm("是否进行退回操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消退回操作",
            duation: 1000
          });
        });
      
    },
    fanhuishangyiclr(){
      this.$confirm("是否确定返回上一处理人并关闭当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1000
          });
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
      this.$confirm("是否强制收回当前督办单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1500
          });
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
      if(this.fromdata.opinionDbOrg == ''){
        this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请填写持续跟踪意见",
            duation: 1500
          });
          return
      }
      this.$confirm("是否确定持续跟踪并关闭当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
                      this.handleSetLoacl();
                      window.close();
                    },1000)
                    
                }
              });
        }).catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1500
          });
        });
    },
    //设置控制域
		setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(this.requiredFields, this.huanJieMessage.requiredFields)//必填控制
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
      this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.huanJieMessage.requiredIdeaFields)//可编辑意见域
      this.editedIdeaFields = this.setEditedIdeaFields(this.editedIdeaFields, this.huanJieMessage.editedIdeaFields, this.huanJieMessage.editedIdeaFieldsBycondition)//可编辑意见域
      this.buttonList = this.showButton(this.buttonList, this.huanJieMessage.visibleButtons, this.huanJieMessage.visibleButtonsBycondition)//按钮
      let orgZt = this.readFields.undertakeOrgName;
      let orgZt1 = this.readFields.assistDeptId;
      let isADDCB = this.readFields.isADDCB;
      if(this.fromdata.doucumentNum.length>7){
        for(let i in this.readFields){
          this.readFields[i] = true;
        }
        if(this.fromdata.isUndertakeOver == '0'){
          Object.assign(this.readFields,{undertakeOrgName:orgZt})
          Object.assign(this.readFields,{assistDeptId:orgZt1})
        }else if(this.fromdata.isUndertakeOver == '2'){
          Object.assign(this.readFields,{assistDeptId:orgZt1})
        }else{
          Object.assign(this.readFields,true)
        }
        Object.assign(this.readFields,{isADDCB:isADDCB})
      }
    },
    setFormConfig() {
     this.$nextTick(()=>{
       this.rules = {
          pressingLevel: [{required: this.requiredFields.pressingLevel,trigger: "change",message: "请选择紧急程度"}],
          projectBase: [{required: this.requiredFields.projectBase,trigger: "change",message: "请选择立项依据"}],
          superviseCode: [{required: this.requiredFields.superviseCode,trigger: "change",message: "请输入编号"}],
          expireDate: [{required: this.requiredFields.expireDate,trigger: "change",message: "请输入办理期限"}],
          contactPhone: [{required: this.requiredFields.contactPhone,trigger: "change",message: "请输入联系电话"}],
          superviseBasis: [{required: this.requiredFields.superviseBasis,trigger: "change",message: "请输入督办依据"}],
          summary: [{required: this.requiredFields.summary,trigger: "change",message: "请输入事由提要"}],
          detailDescription: [{required: this.requiredFields.detailDescription,trigger: "change",message: "请输入详细描述"}],
          undertakeOrgName: [{required: this.requiredFields.undertakeOrgName,trigger: "change",message: "请选择承办单位"}],
          assistDeptName: [{required: this.requiredFields.assistDeptName,trigger: "change",message: "请选择协办单位"}],
      
        
          orgLeaderOpinion: [{required: this.requiredIdeaFields.orgLeaderOpinion, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          deptOpinion: [{required: this.requiredIdeaFields.deptOpinion, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          projectBaseOpinion: [{required: this.requiredIdeaFields.projectBaseOpinion, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          superviseFinishOpinion: [{required: this.requiredIdeaFields.superviseFinishOpinion, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          setUpInfo: [{required: this.requiredIdeaFields.setUpInfo, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          circulateOpinion: [{required: this.requiredIdeaFields.circulateOpinion, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          superviseRemark: [{required: this.requiredIdeaFields.superviseRemark, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
        }
     })
     this.$forceUpdate();  
     setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      })
    },
    timeChangeDJ(){
      this.fromdata.registDate = dateFormate.date(Date.parse(this.fromdata.registDate),'YYYY-MM-DD') 
    },
    timeChangeJX(){
      this.fromdata.finishDate = dateFormate.date(Date.parse(this.fromdata.finishDate),'YYYY-MM-DD') 
    },
    getNewName(value){
      let a = value;
      this.checkNames = [];
      for(let i=0;i<a.length;i++){
        for(let j = 0; j <this.shData.length;j++){
            if(this.shData[j].processInstId == a[i]){
              this.checkNames.push(this.shData[j].deptName)
            }
        }
      }
      this.checkNames = this.checkNames.join(';')
    },
    //生成编号
    createNum() {
      if(this.fromdata.opinionSuperviseDeptList&&this.fromdata.opinionSuperviseDeptList.length){
      this.$confirm("是否确定生成编号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post
        .postData(
          "getNumList",
          JSON.stringify({function:"getNumList",redHead:this.fromdata.superviseCode,id:this.fromdata.id}),
          this.baoWenZiDuan
          )
          .then(res => {
            if(res.success){
              if(res.flag == 1){
                
                this.setDocFlag = 1;
                this.DocNoDataList =res.data;
                this.setDocNum = Object.values(res.data)[0].split(";")[0] + "-0";
               let matchDoc = false;
                for(let val in this.DocNoDataList){
                  if(val == "空缺文号"){
                    this.SetDocNoVisible = true;
                    this.$forceUpdate();
                    matchDoc = true;
                    break
                  }
                  
                }
                if(!matchDoc){
                  this.SetDocNoHandle()
                  this.SetDocNoVisible = false;
                }
                //this.SetDocNoHandle();
              }else{
                this.SetDocNoVisible = true;
                this.setDocFlag = 0;
              }
            }else{
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 1500,
              });
            }
          });
        
        }).catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1500
          });
        }); 
        }else{
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "立项审批意见未填写，无法生成文号",
          duration: 1500,
        });
      }
    },
    isNumber(){
      this.doSaveDocumentNumFuc.num = this.doSaveDocumentNumFuc.num.replace(/\D/g,'')
    },
    //生成文号
    SetDocNoHandle() {
        if(this.fromdata.opinionSuperviseDeptList&&this.fromdata.opinionSuperviseDeptList.length){
        // const [stra, strb] = this.setDocNum.split("-");
        // this.doSaveDocumentNumFuc.num = stra; 
        // this.doSaveDocumentNumFuc.flag = this.setDocFlag;
        // this.doSaveDocumentNumFuc.id = this.fromdata.id;
        if(this.setDocFlag == 0){
          this.doSaveDocumentNumFuc.num = this.doSaveDocumentNumFuc.num;
          this.$post
          .postData(
            "selNumBySd",
            JSON.stringify({
              function:'selNumBySd',
              superviseCode:this.fromdata.superviseCode,
              num:this.doSaveDocumentNumFuc.num
            }),
            this.baoWenZiDuan
          )
          .then(res => {
            if(res.success == false){
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 1500,
              });
            }else{
              this.doSaveDocumentNumFuc.flag = this.setDocFlag;
              this.doSaveDocumentNumFuc.id = this.fromdata.id;
              // var day = new Date();
              // var str = day.getFullYear();
              this.doSaveDocumentNumFuc.redHead = this.fromdata.superviseCode;
              this.$post
                .postData(
                  "doSaveDocumentNum",
                  JSON.stringify(this.doSaveDocumentNumFuc),
                  this.baoWenZiDuan
                )
                .then(res => {
                  if(res&&res.success){
                    let day = new Date();
                    let str = day.getFullYear();
                    let type = this.doSaveDocumentNumFuc.redHead;
                    this.fromdata.doucumentNum = res.documentNum;
                    // this.fromdata.doucumentNum = type +
                    //   "〔" +
                    //   str+
                    //   "〕" +
                    //   this.doSaveDocumentNumFuc.num + "号";
                    this.preserve();
                    this.$message({
                      type: "success",
                      showClose: true,
                      offset: 400,
                      message: "生成文号成功",
                      duration: 1500,
                    });
                    this.donum = true;

                  }else{
                    this.dialogForscwhFailMessage = res.message;
                    this.dialogForscwhFail = true;
                  }
                  
                });
              this.SetDocNoVisible = false;
            }
          })
        }else{
          const [stra, strb] = this.setDocNum.split("-");
          this.doSaveDocumentNumFuc.num = stra; 
          this.doSaveDocumentNumFuc.flag = this.setDocFlag;
          this.doSaveDocumentNumFuc.id = this.fromdata.id;
          var day = new Date();
          var str = day.getFullYear();
          this.doSaveDocumentNumFuc.redHead = this.fromdata.superviseCode;
          this.doSaveDocumentNumFuc.year = str;
          this.$post
            .postData(
              "doSaveDocumentNum",
              JSON.stringify(this.doSaveDocumentNumFuc),
              this.baoWenZiDuan
            )
            .then(res => {
              if(res&&res.success){
                let day = new Date();
                let str = day.getFullYear();
                let type = this.doSaveDocumentNumFuc.redHead;
                // this.fromdata.doucumentNum = type +
                //   "〔" +
                //   str+
                //   "〕" +
                //   this.doSaveDocumentNumFuc.num + "号";
                this.fromdata.doucumentNum = res.documentNum;
                this.preserve();
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "生成文号成功",
                  duration: 1500,
                });
                this.donum = true;
                this.SetDocNoVisible = false;
              }else{
                this.SetDocNoVisible = false;
                this.dialogForscwhFailMessage = res.message;
                this.dialogForscwhFail = true;
              }
            });
        }
        }else{
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "立项审批意见未填写，无法生成文号",
            duration: 1500,
          });
        }
    },
    
    //办结督办单
    doFinish() {
      if(this.fromdata.isUndertakeOver == 2||this.fromdata.isUndertakeOver == 3){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "承办单未办结，无法结项",
          duration: 1500,
        });
        return
      }
      this.$confirm("是否确定办结督办单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
                type: "success",
                offset: 100,
                showClose: true,
                message: "已办结",
                duation: 1500
              });
              setTimeout(()=>{
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();
                window.close();
              },1500)
              
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1500
          });
        });
      
    },

    //请求部门树数据
    getTreeData(n, m) {
      if(n=="cy"){
        this.isCY=true
        this.dialogType = "cy";
      }else{
        this.isCY = false
        this.dialogType = "hui";
      }
      if(n === 'chen'){
        this.singelCheckF = true;
      }else{
        this.singelCheckF = false;
      }
      if( n == 'xie'){
        this.useNewDialog = true;
      }else{
        this.useNewDialog = false;
      }
      this.dialogTypeZF = n;
      let name = "";
      let that = this;
      this.offenUse=false;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
      this.addSendType = m;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      if(m == 1){
        this.dialogTypeNow = 'zengfa';
      }
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
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
      }
      this.dialogTit = name;
      this.showCompDialog();
      if(n == "cy"){
        this.$post
          .postData(
            "selectUserByUnitTreeCY",
            JSON.stringify({
                function: "selectUserByUnitTreeCY",
                unitCode: "",
                flag: true
              }),
            this.$businessCode.zxdbgg
          )  
          .then(res => {
            if (res.message == "Loading") {
              this.loadingTree = true;
            } else {
              this.loadingTree = false;
            }
            that.treeData = (res && res.data) || [];
          });
          return
      }
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
        if (name === "circulatePersonNames") {
          this.fromdata.circulatePersonIds = "";
          this.cyCheckData = [];
        }
      }
    },
    deleteThisWork(){
      this.$confirm("是否确定删除当前督办单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if(!this.fromdata.id){
            window.location.href = "about:blank";
            this.handleSetLoacl();
            window.close();
          }
            this.$post
          .postData(
            "deleteBySupervise",
            JSON.stringify({function:"deleteBySupervise",
            id:this.fromdata.id}),
            this.baoWenZiDuan
          ).then(res => {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 1500,
              });
              setTimeout(()=>{
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();
                window.close();
              },1000)
            }else{
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 1500,
              });
            }
          }
          )
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消操作",
            duation: 1000
          });
        });
      
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
        case "cy":
            this.checkIds = this.fromdata.circulatePersonIds
            ? this.fromdata.circulatePersonIds.split(";")
            : [];
            if (this.cyCheckData.length) {
              newA = [].concat(this.cyCheckData);
              newA.map(item => {
                //选中的不可操作
                item.disabled = true;
                // item.hideType = true;
              }); 
            }
            this.checkData = newA;
            break;
          case "zengfa":
            if(this.dialogTypeZF == "xie"){
            this.checkIds = this.fromdata.assistDeptId
                ? this.fromdata.assistDeptId.split(";")
                : [];

              this.checkData = this.xieCheckData.filter(item => {
                item.disabled = true;
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
            }else{
              this.checkIds = this.fromdata.circulatePersonIds
              ? this.fromdata.circulatePersonIds.split(";")
              : [];
              if (this.cyCheckData.length) {
                newA = [].concat(this.cyCheckData);
                newA.map(item => {
                  //选中的不可操作
                  item.disabled = true;
                  // item.hideType = true;
                }); 
              }
              this.checkData = newA;
            }
            
            break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
      }
    },
  
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let nowIds="";
      let nowNames="";
      let nowNamesChen="";
      let nowIdsChen="";
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
           if (this.addSendType == '1') {
            if(this.dialogTypeZF == 'xie'){
              nowIds = this.fromdata.assistDeptId
              oldIds = this.fromdata.assistDeptId.split(";")
              nowNames = this.fromdata.assistDeptName
              oldNames = this.fromdata.assistDeptName.split(";")
            }else if(this.dialogTypeZF == 'cy'){
              oldIds = this.fromdata.circulatePersonIds.split(";")
              oldNames = this.fromdata.circulatePersonNames.split(";")
            }
            ids.filter((item,i)=>{
              if(oldIds.indexOf(item)==-1){
                newNames.push(names[i])
                newIds.push(ids[i])
              }
            })
          }
          nowIds = this.fromdata.assistDeptId;
          nowNames = this.fromdata.assistDeptName;
          nowNamesChen=this.fromdata.undertakeOrgName;
          nowIdsChen=this.fromdata.undertakeOrg;
          names = names.join(";");
          this.transIds = ids = ids.join(";");
          newIds = newIds.join(";");
          newNames = newNames.join(";");
        } else {
          names = "";
          ids = "";
          newIds = "";
          newNames = "";
          that.checkIds = [];
        }
        //this.discheckData = this.checkData;
      
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
          case "cy":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
          case "zengfa":
            if(this.dialogTypeZF == "xie"){
              this.fromdata.assistDeptName = names;
              this.fromdata.assistDeptId = ids;
              this.xieCheckData = this.checkData;
            }else{
              this.fromdata.circulatePersonNames = names;
              this.fromdata.circulatePersonIds = ids;
              this.cyCheckData = this.checkData;
            }
            break;
        }
        if (this.addSendType === "1"&&this.dialogTypeZF == 'xie') {
            this.handleSendHQPtmt(newIds, newNames, oldIds, oldNames);
        }
        if (this.addSendType == '1'&&this.dialogTypeZF == 'cy') {
          this.sendCy(newIds, newNames);
        }
        if(this.addSendType != '1' &&this.dialogTypeZF == 'cy'){
          this.sendCy();
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
      }
      if(dtype == 'chen' || dtype == 'xie'){
        let depIds = this.checkIds.join(';')
        this.$post
        .postData(
          "checkUnintUserPost",
          JSON.stringify({
            function:'checkUnintUserPost',
            deptIds:depIds
          }),
          this.baoWenZiDuan
        )
        .then(res => {
          if(res&&res.success == false){
            if(dtype == 'xie'){
             this.fromdata.assistDeptName = nowNames
             this.fromdata.assistDeptId = nowIds
             this.preserve();
            }
            if(dtype == 'chen'){
             this.fromdata.undertakeOrgName = nowNamesChen
             this.fromdata.undertakeOrg = nowIdsChen
             this.preserve();
            }
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 1500,
            });
          }else{
            this.dialogState = !this.dialogState;
            if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
              //关闭弹窗 并确认完成发送
              this.saveSending();
            }
            //关闭弹窗 并确认完成发送
            if (this.dialogState) {
              this.backDialogData(this.dialogTypeNow);
            }
          }
        });
      }else{
        this.dialogState = !this.dialogState;
        if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
          //关闭弹窗 并确认完成发送
          this.saveSending();
        }
        //关闭弹窗 并确认完成发送
        if (this.dialogState) {
          this.backDialogData(this.dialogTypeNow);
        }
      }
      
    },
    
    handleSendHQPtmt(newIds, newNames, oldIds, oldNames) {
      var obj = Object.assign(this.createSighWf);
          obj = Object.assign(obj,{undertakeOrg:this.fromdata.undertakeOrg});
      this.createSighWf.deptIds = this.fromdata.assistDeptId;
      this.createSighWf.deptNames = this.fromdata.assistDeptName;
      this.createSighWf.id = this.fromdata.id;
      if (!this.createSighWf.deptIds) {
        obj.deptIds = "";
        obj.deptNames = "";
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择协办单位",
          duration: 1500
        });
        return;
      }
      if (newNames) {
        obj.deptIds = newIds;
        obj.deptNames = newNames;
      }
      if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
        this.$post
          .postData(
            "doAddAssist",
            JSON.stringify(obj),
            this.baoWenZiDuan
          )
          .then(res => {
            if (res && res.success == true) {
              // this.preserve();
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "发送协办单位成功",
                duration: 1500
              });
              this.toEdit();
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 1500
              });
              this.toEdit();
              return;
            }
          })
          .catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: erro.message,
              duration: 1500
            });
            this.toEdit();
          });
      }
    },
    //收回t催办
    takeBackSign(type) {
      this.shData = []; // 收回数据
      this.checkedsh = []; // 收回列表this.
      this.shdialog = true;
      this.typeofHQBM = type;
      const parms = {
        function:"selAssistList",
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
        id:this.bank_dispach.id,
        doAddAssistByType:'1'
      };
      this.$post
        .postData("selAssistList", JSON.stringify(parms), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            this.shData = res.data;
            this.$forceUpdate();
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    checkouthuiqian(item) {
      this.checkeddq = [];
      this.checkedids=[];
      this.checkNames=[];
      this.checkedshid=[];
      this.takeBackDeptIdsNew=[];
      let transItem = this.shData.filter(item => {
        let num = this.checkedsh.indexOf(item.processInstId) > -1;
        if (num&&item.curNodeCode != '800') {
          this.checkNames.push(item.assistOrgName);
          this.checkeddq.push(item.processInstId);
          this.checkedids.push(item.id);
          this.checkedshid.push(item.assistOrgId);
          this.checkedshassistDeptId.push(item.assistDeptId);
          this.takeBackDeptIdsNew.push(item.id+'#'+item.assistOrgId+'#'+item.isUndertake);
        }
        return num;
      });
    },
    //收回确定按钮
    shQueding(m) {
      if(this.checkNames == ''){
        return
      }
      let checkboxdataids = this.checkedshid.join(";");
      let checkboxdata = this.checkNames.join(";");
      let dqdata = this.checkeddq.join(";");
      let ids = this.checkedids.join(';');
      let takeBackDeptIdsNew = this.takeBackDeptIdsNew.join(';');
        let shform = {
          function: "takeBackXb",
          pcsAvyId: this.fromdata.pcsAvyId,
          // multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: checkboxdata,
          subProcessInstId: dqdata,
          id: this.bank_dispach.id,
          undertakeOrg:this.fromdata.undertakeOrg,
          ids:ids,
          takeBackDeptIds:checkboxdataids,
          dobackAssistByType:'1',
          takeBackDeptIdsNew:takeBackDeptIdsNew,
          undertakeOrg:this.fromdata.undertakeOrg,
          superviseOrgId:this.fromdata.superviseOrgId,
        };
        this.$post
          .postData("takeBackXb", JSON.stringify(shform), this.baoWenZiDuan)
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "收回成功",
                duration: 1500
              });
              this.checkeddq = [];
              this.checkedids=[];
              this.checkNames=[];
              this.checkedshid=[];
              this.takeBackDeptIdsNew=[];
              this.toEdit();
              this.$forceUpdate();
            }
          })
          .catch(erro => {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "收回失败",
              duration: 1500
            });
          });
        this.shdialog = false;
        this.toEdit();
     
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
              duration: 1500,
            });
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
              this.handleSetLoacl();
              window.close();
            },1500)
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
        if(!this.fromdata.undertakeOrgName){
          this.$message({
            type: "error",
            offset: 400,   
            showClose: true,
            message: "请先选择承办单位",
            duration: 1000
          });
        return
      }
        this.preserve('2').then((flag)=>{
          if(flag ==true){
            const confirmText = ['承办单位：'+this.fromdata.undertakeOrgName,"协办单位："+this.fromdata.assistDeptName];
            const newDatas = [];
            const h = this.$createElement
            for(const i in confirmText){
              newDatas.push(h('p',null,confirmText[i]))
            }
              this.$confirm('提示', {
                  title:'确定发送办理单位？',
                  message: h('div', null, newDatas),
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
                          message: res.message,
                          duration: 2000
                        });
                      }else{
                        this.$message({
                          type: "success",
                          message: '发送办理单位成功'
                        });
                        setTimeout(()=>{
                          window.location.href = "about:blank";
                          window.opener.location.reload();
                          this.handleSetLoacl();
                          window.close();
                        },1000)
                      }
                    
                    });
              })
          }
        })
     
    },
    //点击 完成并发送 弹窗弹出
    completeSendingIsTrue(){
      if(this.fromdata.isUndertakeOver == 2||this.fromdata.isUndertakeOver == 3){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "存在承办部门未办结，无法进行完成并发送",
          duration: 1000
        });
        return
      }else{
        // let isTrue = JSON.parse(localStorage.getItem("tcHumanRole")).filter((item)=>{
        //   return item.codeType == 'human_speAuth'
        // })
        if(this.fromdata.isReturnBefore == 1){
          this.$confirm("是否返回给：上一处理人?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.fanhuishangyiclr('1');
          }).catch(() => {
            this.completeSending();
          });
        }else{
          this.completeSending();
        }
      }
    },
    async completeSending() {
      this.useNewDialog = false;
      this.dialogTypeNow='dosend'
      let judge = true;
      judge = this.scrollIntoForm();
      if (!this.fromdata.processInstId) {
        this.preserve("2");
      }
      if (!judge) {
        return;
      }
      this.addSendType = 0;
      // if(this.fromdata.isUndertakeOver == 2||this.fromdata.isUndertakeOver == 3){
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "存在承办部门未办结，无法进行完成并发送",
      //     duration: 1000
      //   });
      //   return
      // }
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.fromdata.nextNodeId = this.bank_doSend.nextNodeId; //下以环节id
      this.fromdata.nextNodeName = this.bank_doSend.nextNodeName;
      this.showCompDialog();
      setTimeout(()=>{
        this.$post.postData(
        "getNextNodeInfo",
        JSON.stringify(this.bank_selectConfig),
        this.treeJyx
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
              this.treeData = res.data&&res.data.data||[];
              this.defaultUser =  res.data&&res.data.defaultUser||{};
            })
            .catch(e => {
            });
        });
      },500)
    },
    //发送传阅人
    async sendCy(newIds, newNames){
      this.preserve('2').then((flag)=>{
       if(flag == true){
          let obj = {
              function:"sendCirculate",
              circulatePersonIds:this.fromdata.circulatePersonIds,
              circulatePersonNames:this.fromdata.circulatePersonNames,
              multiTenancyId:this.fromdata.multiTenancyId,
              id:this.fromdata.id,
            }
          //增发
          if (newNames) {
            obj.circulatePersonIds = newIds;
            obj.circulatePersonNames = newNames;
          }else{
            obj.circulatePersonIds = this.fromdata.circulatePersonIds;
            obj.circulatePersonNames = this.fromdata.circulatePersonNames;
          }
          if ((this.addSendType == "1" && newNames) || this.addSendType != "1") {
              this.$post
          .postData("sendCirculate", JSON.stringify(obj), this.$businessCode.zxdbgg)
          .then(res => {
            if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "发送传阅人成功",
                  duration: 2500,
                });
                
                this.$forceUpdate();
              }else{
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: error.message,
                  duration: 500,
                });
              }
              this.toEdit();
          })
          .catch(e => {
            console.log(e);
          });

          }


       }
       })

    },
    //可被收回传阅单的列表
    takeBackSignCY(){
      this.checkedsh=[];
      this.shdialog1 = true;
      let parms = {
        function:"selectallowBackCirculate",
        id:this.fromdata.id,
        multiTenancyId:this.fromdata.multiTenancyId,
      };
      this.$post
        .postData(
          "selectallowBackCirculate",
          JSON.stringify(parms),
          this.$businessCode.zxdbgg
        ).then(res=>{
          if(res&&res.success){
            this.shData = res.data;
            }else{
              this.$message({
                message:res.message,
                type:'error'
              })
            }
        })
    },
    shQuedingCY(){
      let checkboxdata=this.checkedsh.join(";");
      if(this.shData == ''|| this.shData.length == 0){
        this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "暂无可收回传阅人",
            duration: 500,
          });
          return
      }
      if(checkboxdata==''){
        this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请选择要收回人员",
            duration: 500,
          });
          return
      }
      let parms = {
        function:"takeBackCirculate",
        id:this.fromdata.id,
        ids:checkboxdata,
        multiTenancyId:this.fromdata.multiTenancyId,
      };
      this.$post
        .postData(
          "takeBackCirculate",
          JSON.stringify(parms),
          this.$businessCode.zxdbgg
        ).then(res=>{
          if(res&&res.success){
            this.shdialog1 = false;
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "收回成功",
              duration: 1500
            });
            this.toEdit();
            }else{
              this.$message({
                message:res.message,
                type:'error'
              })
            }
        })
    },
    changeDage(e){
      this.$forceUpdate()
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
    saveCheck() {},
 //点击引入
    appendMassage(val) {
      if(this.cbdwList.length>0){
        for(let i =0;i<this.cbdwList.length;i++){
          if(val == this.cbdwList[i]){
            return
          }else{
            this.cbdwList.push(val);
            this.fromdata.hostDepartment = "";
          }
        }
      }else{
        this.cbdwList.push(val);
            this.fromdata.hostDepartment = "";
      }
      
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
    getValue(e){
      this.fromdata.expireDate = this.fromdata.expireDate.replace(/\D/g,'')
      this.$forceUpdate();
    },
    input(e){
      this.$forceUpdate()
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
          this.getIsNowUser(res,'fcy','db')
          that.fromdata = Object.assign(that.fromdata,res.data);
          if(res.data.level&&res.data.level == '1'){//传阅常用联系人修改 12.21
            that.scircularizeLevel = '2';//传阅常用联系人修改 12.21
          }else{
            that.scircularizeLevel = '1';//传阅常用联系人修改 12.21
          }
          if(!res.data.superviseBasis){
            this.fromdata.superviseBasis =  '〔〕号'
          }
          if(res.data.expireDate){
            Object.assign(this.fromdata,{expireDate:res.data.expireDate})
          }
          if(res.data.handleTime){
            this.handleTime = this.fromdata.handleTime = res.data.handleTime
          }
          //请求下拉数据
          this.bank_doSend.processInstId = res.data.processInstId;
          this.bank_doSend.multiTenancyId = res.data.multiTenancyId;
          this.bank_doSend.tplNo = res.data.pTplNo;
          this.bank_doSend.pcsAvyId = res.data.pcsAvyId;
          if(res.data.doucumentNum && res.data.doucumentNum.length >7){
            this.donum = true;
          }
          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.uploadConfig1.filesHas = this.fromdata.underTakeAttchmentFileInfo;
          this.fromdata.attachSort = [];
          this.fkfj = [];
          for(let i in this.fromdata.feedbackAttachmentMap){
            let k = 0;
            this.fkfj.push(i)
            this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i])
          }
          if(res.data.processInstId){   
              this.$post
              .postData("getNextUserTaskNode", 
              JSON.stringify({function:"getNextUserTaskNode",processInstId:res.data.processInstId}), 
              this.$businessCode.zxdbgg
              )
              .then(res => {
                  this.huanJieMessage = res.data.extAttributes;
                  this.setConfig()
                  this.setFormConfig()
                }).catch((err)=>{
                })
            }else{
              this.$post
              .postData("getpcsTplStartNode", 
              JSON.stringify({function:"getpcsTplStartNode",multiTenancyId:"CN006"}), 
              this.$businessCode.zxdbgg
              )
              .then(res => {
                  this.huanJieMessage = res.data;
                  this.setConfig()
                  this.setFormConfig()
                }).catch((err)=>{
                })
            }
            if(this.readFlag != 1){
              this.$post
                .postData(
                  "doUpdateReadRecord",
                  JSON.stringify({
                    function:"doUpdateReadRecord",
                    pcsAvyId:res.data.pcsAvyId,
                    processInstId:res.data.processInstId,
                    multiTenancyId:res.data.multiTenancyId
                    }),
                  this.$businessCode.zxdbgg
                ).then(res => {
                  //更新状态用。暂时不用任何操作
                  if(res&&res.success){
                    window.opener.location.reload();
                  }
                })
            }
            if(this.fromdata.handleTime){
              this.handleTime = res.data.handleTime;
            }
            if (res.data.assistDeptId) {
              this.xieCheckData = this.concatTreeData(
                res.data.assistDeptId,
                res.data.assistDeptName
              );
            }else{
              this.xieCheckData = [];
            }
            if (res.data.undertakeOrg) {
              this.chenCheckData = this.concatTreeData(
                res.data.undertakeOrg,
                res.data.undertakeOrgName
              );
            }else{
              this.chenCheckData = [];
            }
            if (res.data.circulatePersonNames) {
              this.cyCheckData = this.concatTreeData(
                res.data.circulatePersonIds,
                res.data.circulatePersonNames
              );
            }else{
              this.cyCheckData = [];
            }
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
              //this.handleDays = JSON.parse(res.data.handleDays);
              this.SredHead = JSON.parse(res.data.number);
              if(!this.fromdata.expireDate){
                Object.assign(this.fromdata,{expireDate:res.data.term})
              }
              this.$nextTick(() => {
                this.$refs.fromdata.clearValidate();
              });
            });
          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_send.curTplNo = this.bank_selectConfig.tplNo =
            res.data.pTplNo;
          this.bank_send.curMultiTenancyId = this.bank_selectConfig.multiTenancyId =
            res.data.multiTenancyId;
          this.fromdata.superviseRemarkList =
            res.data.superviseRemarkList &&
            JSON.parse(res.data.superviseRemarkList);
          //初始化承、协办单位
          
          
          //获取本地存储联系电话res.data.phone= 
          if(!res.data.contactPhone){
            let tcHumanRole = JSON.parse(localStorage.getItem("userInfo"))
            if(tcHumanRole.telMobile.indexOf('undefined')<0){
              this.fromdata.contactPhone = tcHumanRole.telMobile
              Object.assign(this.fromdata,{contactPhone:tcHumanRole.telMobile})
              
            }
          }
          console.log(this.fromdata.isUndertakeOver == '1'&&this.editedIdeaFields.opinionDbOrg)

          //临时意见处理
          // this.cuteData("orgLeaderOpinion", "opinionSuperviseOrgList", "orgLeaderOpinionId");
          // this.cuteData("deptOpinion", "opinionSuperviseDeptList", "deptOpinionId");
          // this.cuteData("projectBaseOpinion", "opinionSuperviseBaseList", "projectBaseOpinionId");
          // this.cuteData("superviseFinishOpinion", "superviseFinishOpinion", "superviseFinishOpinionId");
          // this.cuteData("setUpInfo", "opinionSuperviseSetupList", "setUpInfoId");
          // this.cuteData("superviseRemark", "superviseRemarkList", "superviseRemarkId");
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
    changedata(){
      this.$forceUpdate();
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
      delete parseList.assistAttchmentFileInfo;
      delete parseList.underTakeAttchmentFileInfo;
      var obj = Object.assign(this.bank_addToSendOrder, parseList);
      await this.$post
        .postData("doStartWfe", JSON.stringify(obj), this.treeJyx)
        .then(res => {
          if (res && res.success) {
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            if(res.data.pTplNo){this.bank_send.curTplNo = res.data.pTplNo;}
            this.fromdata = Object.assign(this.fromdata,res.data)
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
            if(type=="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
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
    closeMes(){
      alert('1')
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
        onClose:this.closeMes
      })
        .then(() => {
          this.preserve();
          window.location.href = "about:blank";
          window.opener.location.reload();
          this.handleSetLoacl();
          window.close();
        })
        .catch(() => {
         alert()
          // this.$message({
          //   type: "info",
          //   offset: 100,
          //   showClose: true,
          //   message: "已取消关闭",
          //   duation: 300
          // });
        });
    },

    // 收藏
    collect() {
     
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
      if(!this.fromdata.id){
        this.$message({
          type: "info",
          offset: 100,
          showClose: true,
          message: "请先保存督办单",
          duation: 500
        });
        return
      }
      this.preserve().then(()=>{
        const routeData = this.$router.resolve({
          path: path, 
          query: {
              id:this.fromdata.id
          }
        });
        window.open(routeData.href, "_blank");
      });
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
                    flowTranId:this.$businessCode.zxdb
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
    //定密依据弹窗弹出
    writelistbox(arr,num) {
      if(num>=500){
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
    // 常用意见批语编辑
    writelistvalue(data) {
      if (data) {
        if (this.clickTypes == 1) {
          // 签批意见
          this.fromdata.orgLeaderOpinion = this.fromdata.orgLeaderOpinion
            ? this.fromdata.orgLeaderOpinion + data
            : data;
            if(this.fromdata.orgLeaderOpinion && this.fromdata.orgLeaderOpinion.length>=500){
              this.fromdata.orgLeaderOpinion = this.fromdata.orgLeaderOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 2) {
          // 办公室批办意见
          this.fromdata.deptOpinion = this.fromdata.deptOpinion
            ? this.fromdata.deptOpinion + data
            : data;
            if(this.fromdata.deptOpinion && this.fromdata.deptOpinion.length>=500){
              this.fromdata.deptOpinion = this.fromdata.deptOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 3) {
          // 办结情况
          this.fromdata.projectBaseOpinion = this.fromdata
            .projectBaseOpinion
            ? this.fromdata.projectBaseOpinion + data
            : data;
            if(this.fromdata.projectBaseOpinion && this.fromdata.projectBaseOpinion.length>=500){
              this.fromdata.projectBaseOpinion = this.fromdata.projectBaseOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 4) {
          // 签发意见
          this.fromdata.superviseFinishOpinion = this.fromdata.superviseFinishOpinion
            ? this.fromdata.superviseFinishOpinion + data
            : data;
            if(this.fromdata.superviseFinishOpinion && this.fromdata.superviseFinishOpinion.length>=500){
              this.fromdata.superviseFinishOpinion = this.fromdata.superviseFinishOpinion.substr(0,500)
            }
        } else if (this.clickTypes == 5) {
          // 签发意见
          this.fromdata.setUpInfo = this.fromdata.setUpInfo
            ? this.fromdata.setUpInfo + data
            : data;
            if(this.fromdata.setUpInfo && this.fromdata.setUpInfo.length>=500){
              this.fromdata.setUpInfo = this.fromdata.setUpInfo.substr(0,500)
            }
        }
        this.$forceUpdate();
      }
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
          this.$businessCode.zxdb
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
              duration: 1500
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
            duration: 1500
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
          this.$businessCode.zxdb
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
              duration: 1500
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
            duration: 1500
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
          this.$businessCode.zxdb
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
              duration: 1500
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
            duration: 1500
          });
        });
    },
    //删除意见(固化意见)
    deletService(id) {
      this.bank_deletToSendOrder.id = id;
      this.$post
        .postData(
          "doDeleteOpinionById",
          JSON.stringify(this.bank_deletToSendOrder),
          this.$businessCode.zxdb
        )
        .then(res => {
          if (res && res.success) {
            this.toEdit();
            window.location.reload();
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
       this.$confirm("是否确定删除此附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
                      duration: 1500,
                    });
                    this.fromdata.attchmentFileInfo.splice(n, 1);
                    this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
                  }else{
                    this.$message({
                      type: "error",
                      showClose: true,
                      offset: 400,
                      message: "删除失败",
                      duration: 1500,
                    });
                  }        
                }
              });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
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
    downFile(file){
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
       this.$post
        .postData("doDownloadFile", JSON.stringify(this.bank_doDownloadFile), this.$businessCode.zxdbfj)
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
          flowTranId:this.$businessCode.zxdb,
          saveSpecialFileName:str
        }
      });
      this.showDraft = false;
      this.$forceUpdate();

      window.open(data.href, "_blank");
    },
    changeContactPhone(){
      this.fromdata.contactPhone = this.fromdata.contactPhone.replace(/[^\-\,\d\*\ ]/g,'');
      this.$forceUpdate();
    },
  },
  created() {
    this.uploadConfig.code = this.$businessCode.zxdbfj;
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.state = this.$route.query.state ? this.$route.query.state : "";
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.zxdb;  //完成并发送 树 流程交易线   chai
    this.bank_doSend.id = this.bank_dispach.id;
    this.treeTradeCode = this.$businessCode.zxdbgg;  //人员树交易线
    this.toEdit();
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
