<template>
  <div id="undertakeDetail" class="bank_dispach greenLight">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>督办处理单
        </p>
        <div> 
          <div v-if="state =='2'||state =='3'||isPL!=''" class="grid_comtent"> 
            <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
            <el-button size="small" plain @click="dialogVisibleShouuhi = true" v-if="fromdata.curNodeCode!=800&&readFlag !='1'&&allowBack==true&&isPL==''">收回</el-button>
            <el-button size="small" plain v-if="state == 2" @click="cuibanClick">催办</el-button>
            <el-button size="small" plain @click="handleSendHQPtmt" v-if="isPL!=''&&fromdata.isHasXB != 1&&isPL==1">发送协办单位</el-button>
            <el-button size="small" plain @click="chixugenzong" v-show="isPL =='2'&& codeNode != 'false' &&batchStatus!='3'">持续跟踪</el-button> 
            <el-button size="small" plain @click="flowScheme">查看流程</el-button> 
            <el-button size="small" plain @click="processSheet('/undertakecld')"  v-if="isPL==''">打印处理单</el-button>
            <el-button size="small" plain @click="collect" v-if="isPL==''">收藏</el-button>
            <el-button size="small" plain @click="caozuozhinan"  v-if="isPL==''">操作指南</el-button>
          </div>
          <div class="grid_comtent" v-else>
            <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
            <el-button size="small" v-for="(item,index) in buttonList" @click="buttonClick(item.type)" :key="index"
              v-show="buttonList[index].show" 
              v-preventClick
              plain>{{item.name}}   
            </el-button>
          </div>
        </div>
      </el-col>    
    </el-row>
    <!-- <el-dialog
      title="操作"
      :visible.sync="shdialog1"
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
    </el-dialog> -->
    <!-- 全选备注1 -->
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
    <el-dialog
      title="操作"
      :visible.sync="shdialog1"
      v-dialogDrag
      width="50%"
      >
      <el-card>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedsh" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item,index) in shData" :label="item" :key="index">{{item.curUser}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog1 = false">取 消</el-button>
        <el-button type="primary" @click="shQuedingCY">确 定</el-button>
      </span>
    </el-dialog>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
      <el-dialog
        title="提示"
        v-dialogDrag
        :visible.sync="dialogVisibleShouuhi"
        width="30%">
        <span>是否收回</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleShouuhi = false">取 消</el-button>
          <el-button type="primary" @click="shouhuibutton">确 定</el-button>
        </span>
      </el-dialog>
    <el-dialog
          title="查看协办办理状态"
          v-dialogDrag
          :visible.sync="cbxbchakan">
        <el-table border :data='tableData1' class="scroll"  height="400">
        <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
        <el-table-column v-for="item in tableCols1"
                            :key="item.id"
                            :prop="item.prop"
                            :formatter="item.formatter"
                            :label="item.label"
                            align="center"
                            ></el-table-column>
            </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="cbxbchakan = false">取 消</el-button>
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
            <p class="bank_dispach_annotation_current" v-if="state!='3'">
              当前处理人：
              <span>{{fromdata.curUser}}</span>
            </p>
            <p class="bank_dispach_annotation_current">
              办理状态：
              <span>{{fromdata.handleStatus}}</span>
            </p>
            <p class="bank_article_illustrates bank_dispach_annotation_current">
              <span>专项督查办事项，请按时处理、及时反馈。<span v-if="fromdata.undertakeNum>1">(承办次数：第{{fromdata.undertakeNum}}次)</span></span>
            </p>
          </div>
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            :disabled="isWH == 1"
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
                      style="width:100%"
                      disabled
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
                  <el-form-item label="紧急程度" :span="8" props="pressingLevel" ref="pressingLevel">
                    <el-select
                      v-model="fromdata.pressingLevel"
                      disabled
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
                <el-col :span="8">
                  <el-form-item label="编号" prop="superviseCode" ref="superviseCode">
                    <el-input v-model="fromdata.doucumentNum" plain :title="fromdata.doucumentNum" disabled type="info">{{fromdata.doucumentNum}}</el-input>
                  </el-form-item>
                </el-col>   
                <el-col :span="8">
                  <el-form-item label="登记日期" prop="registDate" ref="registDate">
                    <el-input v-model="fromdata.registDate" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结项日期" prop="finishDate" ref="finishDate">
                    <el-input v-model="fromdata.finishDate" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="截止时间" prop="expireDate" ref="expireDate">
                    <el-input v-model="fromdata.expectFinishTime" disabled></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                  <el-form-item label="办理期限" prop="expireDate" ref="expireDate">
                    <el-select v-model="fromdata.expireDate" disabled placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="businessType in handleDays"
                        :key="businessType.label"
                        :label="businessType.label"
                        :value="businessType.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align:right">
                  <el-button plain disabled type="info">{{fromdata.handleTime}}</el-button>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item label="督办部门" prop="superviseDeptName" ref="superviseDeptName">
                    <el-input v-model="fromdata.superviseDeptName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人" prop="contact" ref="contact">
                    <el-input v-model="fromdata.contact" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" prop="contactPhone" ref="contactPhone">
                    <el-input v-model="fromdata.contactPhone" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="督办依据" prop="superviseBasis" ref="superviseBasis">
                    <el-input v-model="fromdata.superviseBasis" disabled>
                      <!-- <el-button slot="append" @click="appendMassage(fromdata.hostDepartment)">引入</el-button> -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item v-for="(cbdwItem,index) in cbdwList" :key="index" :index="index">
                    <!-- <el-input :disabled="true" :value="cbdwItem">
                      <el-button slot="append" @click="deleteMassage(index)" disabled>删除</el-button>
                    </el-input> -->
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="事由提要" prop="summary" ref="summary">
                    <el-input v-model="fromdata.summary"
                      disabled
                      type="textarea"
                      resize="none"
                      autosize
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="详细描述">
                    <el-input
                      type="textarea"
                      disabled
                      resize="none"
                      autosize
                      v-model="fromdata.detailDescription"
                      maxlength="500"
                      placeholder="填写备注可输入500字"
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
                        class="hqbm"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="协办单位" prop="assistName" ref="assistName">
                     <div style="display:flex">
                      <el-input
                        type="textarea" resize="none" autosize
                        v-model="fromdata.assistName"
                        disabled
                        placeholder="请选择协办部门"
                        style="flex:1;color: red;"
                        class="hqbm"
                      ></el-input>
                      <button @click="getTreeData('xie')"
                      v-if="fromdata.isHasXB != 1" type="button" 
                      :disabled="readFields.assistName||state =='2' || state == '3'||isPL==4||isPL==2" 
                      class="el-button el-button--default dimi_btn" > <i class="el-icon-plus"></i></button>
                      <button @click="getTreeData('xie', '1')"
                      v-if="fromdata.isHasXB == 1" type="button" 
                      :disabled="readFields.assistName||state =='2' || state == '3'||isPL==4||isPL==2||(isPL!=''&&fromdata.isDisabledZf==false)" 
                      class="el-button el-button--default dimi_btn1" >增发</button>
                      <button @click="takeBackSign('shouhui')" 
                      v-if="fromdata.isHasXB == 1" type="button" 
                      :disabled="readFields.assistName||state =='2' ||state == '3'||isPL==4||isPL==2||(isPL!=''&&fromdata.isDisabledZf==false)"
                      class="el-button el-button--default dimi_btn1" >收回</button>
                      <button @click="takeBackSign('cuiban')" 
                      v-if="fromdata.isHasXB == 1&&isPL==''" type="button" 
                      :disabled="readFields.assistName||state =='2' || state == '3'"
                      class="el-button el-button--default dimi_btn1">催办</button>
                      <div @click="takeBackSign('qzbj')" 
                       style="padding-top: 12px;"
                      v-if="fromdata.isHasXB == 1&&fromdata.isHasQZBJ == 1&&isPL==''"
                      :disabled="readFields.assistName||state =='2' || state == '3'"
                      class="el-button el-button--default dimi_btn1">强制办结</div>
                      </div>
                    <!-- <el-input
                      v-model="fromdata.assistName"
                      :title="fromdata.assistName"
                      placeholder="请选择协办单位"
                      disabled
                      class="redcolor"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-plus"
                        @click="getTreeData('xie')"
                        v-if="fromdata.isHasXB != 1"
                        :disabled="readFields.assistName||state =='2' || state == '3'||isPL==4||isPL==2"
                        style="width:10%"
                      ></el-button>
                      <el-button slot="append" 
                      :disabled="readFields.assistName||state =='2' || state == '3'||isPL==4||isPL==2"
                      @click="getTreeData('xie', '1')" v-if="fromdata.isHasXB == 1">增发</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('shouhui')"
                        v-if="fromdata.isHasXB == 1"
                       :disabled="readFields.assistName||state =='2' ||state == '3'||isPL==4||isPL==2"
                      >收回</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('cuiban')"
                         v-if="fromdata.isHasXB == 1&&isPL==''"
                        :disabled="readFields.assistName||state =='2' || state == '3'"
                      >催办</el-button>
                      <el-button
                        slot="append"
                        v-if="fromdata.isHasXB == 1&&fromdata.isHasQZBJ == 1&&isPL==''"
                        @click="takeBackSign('qzbj')"
                        :disabled="readFields.assistName||state =='2' || state == '3'"
                      >强制办结</el-button>
                    </el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label width="0">
                    <el-input
                      v-model="fromdata.assistFinishName"
                      :title="fromdata.assistFinishName"
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
                      disabled
                      style="width:100%;"
                    >
                      <el-button slot="append" @click="takeBackSignCY('shouhui','cy')" v-if="fromdata.isHasCY == 1&&state!='2'&&state!='3'">收回</el-button>
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
                  <el-form-item label="行领导批示"> 
                    <el-input type="textarea"
                    resize="none"
                    disabled
                    autosize
                    v-if="!(fromdata.opinionSuperviseOrgList && fromdata.opinionSuperviseOrgList.length)"
                    ></el-input>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="立项审批意见">
                    
                    <el-input type="textarea"
                      disabled 
                      resize="none"
                      autosize
                      v-if="!(fromdata.opinionSuperviseDeptList && fromdata.opinionSuperviseDeptList.length)"></el-input>
                      <opinionText 
                      :opinionText="fromdata.opinionSuperviseDeptList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      :canDelet="false"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    <!-- <el-input type="textarea" v-model="fromdata.deptOpinion"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="持续跟踪意见" v-if="isPL||fromdata.undertakeNum>1">
                    
                    <el-input type="textarea"
                    resize="none"
                    autosize
                    @input="changedata"
                    v-model="fromdata.opinionDbOrg" 
                    v-if="isPL=='2'&&codeNode!='false'&&batchStatus!='3'"
                    :disabled="!(isPL=='2'&&codeNode!='false'&&batchStatus!='3')"
                    ></el-input>
                    <opinionText 
                      :opinionText="fromdata.opinionDbOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="承办单位办理情况"> 
                    <el-row>
                      <el-col :span="12" class="m10">
                        <el-form-item label="承办开始时间" prop="underTakeStartTime" ref="underTakeStartTime">
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
                          <el-input v-model="fromdata.underTakeUser" disabled>
                            <el-button
                              slot="append"
                              icon="el-icon-plus"
                              @click="getTreeDataForRy('underTakeUser')"
                              :disabled="readFields.underTakeUser||isPL!=''||state==2||state==3"
                              style="width:10%"
                            ></el-button>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" class="m10">
                        <el-form-item label="联系电话" prop="underTakePhone" ref="underTakePhone">
                          <el-input v-model="fromdata.underTakePhone" :disabled="readFields.underTakePhone||isPL!=''||state==2||state==3"></el-input>
                        </el-form-item>
                      </el-col>
                       <el-col class="m10">
                      <el-form-item label="承办意见" prop="undertakeOpnion" ref="undertakeOpnion">
                        
                        <el-input type="textarea"
                            resize="none"
                            @input="changedata"
                            autosize 
                            maxlength="500"
                            v-model="fromdata.undertakeOpnion" 
                            :disabled="readFields.isCBFJ || isPL == '1'||isPL!=''||state==2||state==3"
                            v-if="!(readFields.isCBFJ || isPL == '1'||isPL!=''||state==2||state==3)"
                          ></el-input>
                          <opinionText 
                            :opinionText="fromdata.opinionSuperviseUndertakeList" 
                            :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                            :nowUserId="nowUserId"
                            @deletService="deletService"
                            :curNodeCode="fromdata.curNodeCode"
                          ></opinionText>
                      </el-form-item>
                    </el-col>
                    </el-row>
                   
                    <el-col>
                    <el-form-item label="承办附件">
                    </el-form-item>
                      <uploadFiles ref="uploadComponent" @preserve="preserve" v-if="state!= '2'&&state!= '3'&&isPL==''&&!readFields.isCBFJ&&!readFields.underTakeUser" :uploadConfig="uploadConfig1"></uploadFiles>
                      <div class="file_list_box" style="margin-left:130px;" v-if="fromdata.underTakeAttchmentFileInfo&&fromdata.underTakeAttchmentFileInfo.length">
                        <el-scrollbar>
                          <div v-for="(item,index) in fromdata.underTakeAttchmentFileInfo" :key="item.id" 
                          class="comp_list">  
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
                                    type="warning"
                                    v-if="state!= '2'&&state!= '3'&&isPL==''"
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
                                </div>
                              </div>
                            </template>
                          </div>
                        </el-scrollbar>
                      </div>   

                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="协办单位办理情况" prop="documentNo" ref="documentNo">
                    <el-input 
                    resize="none"
                    autosize
                    v-if="fromdata.opinionAssistFinishList&&fromdata.opinionAssistFinishList.length =='0'" disabled type="textarea"></el-input>
                    <opinionText 
                      :opinionText="fromdata.opinionAssistFinishList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                
                <el-col :span="24">
                  <el-form-item label="协办催查记录" prop="record" ref="record">
                    <el-input v-model="fromdata.record"
                    resize="none"
                    autosize type="textarea" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="传阅意见" prop="circulateOpinion" ref="circulateOpinion">
                    
                   <el-input type="textarea"
                    resize="none"
                    autosize disabled v-if="!(fromdata.opinionSuperviseCirculateList && fromdata.opinionSuperviseCirculateList.length)"></el-input>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseCirculateList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :isCy="true"
                      :canDelet="false"
                    ></opinionText>
                  </el-form-item>
                </el-col>
                 <!-- 传阅信息 -->
                <el-col>
                  <el-form-item label="传阅人员"> 
                      <el-col class="m10">
                        <el-form-item  label-width="80px" label="未阅" prop="wbjFirstCirculate" ref="wbjFirstCirculate">
                          <el-input type="textarea"
                            resize="none"
                            autosize  v-model="fromdata.wbjFirstCirculate" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="m10">
                        <el-form-item label-width="80px" label="已阅" prop="ybjFirstCirculate" ref="ybjFirstCirculate">
                          <el-input type="textarea"
                            resize="none"
                            autosize v-model="fromdata.ybjFirstCirculate" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row class="pr45">
              <el-col v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
              <el-form-item label="督办附件">
                <div class="file_list_box" style="margin-left:0;">
                  <el-scrollbar>
                    <div v-for="(item,index) in  fromdata.attchmentFileInfo" :key="item.id" class="comp_list">  
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
                    </el-form-item>

              </el-col>
              <el-col v-for="(item,n) in fkfj" :key="n">
                <el-form-item :label="item" :key="item">
                  <el-scrollbar class="file_list_box" style="margin-left:0;">
                    <div v-for="(item1,index) in fkfjList[n]" :key="item1.id" class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="order">{{index+1}}.</span>
                          <span class="down" :title="item1.fileName" @click="viewDraftFile(item1.fileName,item1.filePath ,$businessCode.zxdbfj)"
                           >{{item1.fileName}}</span>
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
  <el-dialog title="选择需要强制办结的协办单位" 
    v-dialogDrag
    :visible.sync="shdialog2" width="50%">
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
        <el-button @click="shdialog2 = false">取 消</el-button>
        <el-button type="primary" @click="shQueding(typeofHQBM)">确 定</el-button>
      </span>
    </el-dialog>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :defaultUser="defaultUser"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :dialogTypeNow="dialogTypeNow"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :fromdata="fromdata"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :loadingTree="loadingTree"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
    <treeCofigForCy
      :treeData="treeData"
      :dialogType="dialogTypeForCy"
      :dialogTypeNow="dialogTypeNowForCy"
      :dialogTit="dialogTitForCy"
      :checkIds="checkIds"
      :fromdata="fromdata"
      :titleWords="titleWordsCy"
      :checkData="checkData"
      :loadingTree="loadingTreeForCy"
      :singelCheckF="singelCheckFForCy"
      :dialogState="dialogStateForCy"
      :seletOptionsData="seletOptionsDataForCy"
      @showCompDialog="showCompDialogForCy"
      :scircularizeLevel="scircularizeLevel"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForCy>
    <treeCofigForRy
      :treeData="treeData"
      :dialogType="dialogTypeForRy"
      :dialogTypeNow="dialogTypeNowForRy"
      :dialogTit="dialogTitForRy"
      :checkIds="checkIdsRy"
      :titleWords="titleWordsRy"
      :orgId="unitOrgId"
      :checkData="checkDataRy"
      :loadingTree="loadingTreeForRy"
      :singelCheckF="singelCheckFForRy"
      :dialogState="dialogStateForRy"
      :seletOptionsData="seletOptionsDataForRy"
      @showCompDialog="showCompDialogForRy"
      :treeTradeCode="treeTradeCode"
    ></treeCofigForRy>
    <appendWriteList
      ref="writelist"
      v-if="appendWriteDialog"
      :clickType="clickTypes"
      @childsaveselect="writelistvalue"
    ></appendWriteList>
    <secretBasls ref="arr" v-if="secretDialog" @childsavesecretBasls="savesecretBaslsvalue"></secretBasls>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import treeCofigForCy from "@/components/tree/tree-cy";
import treeCofigForRy from "@/components/tree/tree-ry";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/index";
import closeMessage from 'components/closeMessage/index';
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "App",
  components: {
    timeDialog,
    treeCofig,
    secretBasls,
    appendWriteList,
    treeCofigForCy,
    treeCofigForRy,
    uploadFiles,
    opinionText,
    closeMessage
  },
  data() {
    return {
      closeHandler:false,
      undertakeOrganId:"",
      defaultUser:{},//完成并发送默认值
      isWH:'',//是否维护页面
      dialogTypeForCy:'',
      scircularizeLevel:'1',//传阅常用联系人修改 12.21
      dialogTypeNowForCy:'',
      dialogTitForCy:'',
      loadingTreeForCy:'',
      singelCheckFForCy:'',
      dialogStateForCy:false,
      seletOptionsDataForCy:[],
      treeTradeCode:"",
      cyper:'',
      cyid:'',
      titleWordsCy:"选择人员",
      titleWordsRy:"选择人员",
      dialogTypeForRy:'',
      dialogTypeNowForRy:'',
      dialogTitForRy:'选择承办人',
      loadingTreeForRy:'',
      singelCheckFForRy:'',
      dialogStateForRy:false,
      seletOptionsDataForRy:[],
      ryper:'',
      ryid:'',
      codeNode:false,
      //全选备注2
      checkAll: false,
      isIndeterminate: true,
      canDelete:false,
      //全选备注3
      fun:'',
      fkfj:[],//反馈附件
      fkfjList:[],//反馈附件
      isPL:"",
      dialogVisibleShouuhi:false,//收回确定弹窗
      readFlag:"",
			allowBack:"",
      uploadConfig2:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true,
      },
      isUndertakeOverpl:"",
      uploadConfig1:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true,
      },
      uploadConfig:{
        id:'',
        url:'uploadFiles',
        code:'',
        filesHas:[],
        noattachTitleCheck:true,
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
      bank_DeleteSendOrder: {
        function: "doDeleteSendOrder",
        id: ""
      },
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },
      SsecretLimit: [
        { value: "0", label: "年" },
        { value: "1", label: "月" },
        { value: "2", label: "日" }
      ],
      undertakeflag: false, //承办人等信息
      flag: false,
      takeBackDeptIdsNew:[],
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
        function: "doSendByUndertake",
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
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getNextNodeInfo",
        curNodeId: "",
        tplNo: "",
        multiTenancyId: ""
      },
      //input框内容
      bank_dispach: {
        function: "selUndertakeById",
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
        function: "doUpdateByUndertake",
        id: "",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
        // sequenceSign: ""
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "doDeleteOpinionById",
        id: ""
      },
      //加载部门树
      bank_main: {
        function: "unitTreeByFirst",
        flag: false
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      assistDeptData: [],
      batchStatus:'',
      dialogTypeZF:"",
      cbdwList: [], //督办依据添加
      buttons: [],
      buttonss: [],
      loadingTree:false,
      loadingTreeFroRy:false,
      fromdata: {
        undertakeNum:0,
        handleTime:"",
        attachSort: [],
        attchmentFileInfo: [],
        feedbackAttachmentMap: [],
        underTakeAttchmentFileInfo: [],
        handleStatus:"",
        secretTimeType: "",
        opinionSuperviseBaseList: [],
        opinionSuperviseDeptList: [],
        opinionDbOrgList: [],
        opinionSuperviseOrgList: [],
        opinionAssistFinishList:[],
        opinionSuperviseCirculateList:[],//传阅意见
        opinionSuperviseSetupList: [],//办结情况
        processInstId: "", //流程实例标识
        nextNodeId: "", //下一环节id
        nextNodeName: "", //下一环节名称
        curNodeName: "", //当前环节
        curNodeCode:"",//
        curUser: "", //当前环节处理人
        circllateName: "", //传阅人名称
        pressingLevel: "", //紧急程度
        projectBase: "", //立项依据
        doucumentNum: "", //编号
        expectFinishTime:"",
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
        undertakeOrgName: "", //承办单位名称
        assistName: "", //协办部门名称
        orgLeaderOpinion: "", // 行领导批示
        deptOpinion: "", //立项审批意见
        projectBaseOpinion: "", //审核意见
        underTakeInfo: "", //承办办理情况
        undertakeOrg: "",
        underTakeStartTime: "", //承办开始时间
        underTakeEndTime:"",//承办结束时间
        underTakeUser: "", //承办人
        underTakePhone: "", //承办人电话
        setUpInfo: "", //办结情况
        superviseRemark: "", //督办单备注
        // security: "", //密级
        // secretType: "", //秘密类型
        // secretLimitName: "", //密级期限类型名称
        superviseCode: "",
        sendOpinionMaxTime: "",
        assistId: "",//协办id
        assistFinishName: "",//协办已办名称
        assistFinishId: "",//协办已办id
        parentId:"",
      },
      handleDays: [],
      projectBaseList: [],
      SredHead: [],
      SemergencyLevel: [],
      SsecretType: [],
      SsecretFlagType: [],
      chenCheckData: [], //树承办回显列表
      xieCheckData: [], //协办部门回显
      cyCheckData: [], //协办部门回显
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
      rules: {
      },
      imageUrl: "",
      fileList: [],
      tableData: [],
      shdialog1:false,
      timeShow: false, //查看流程
      shdialog2:false,
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkIdsRy: [], //列表
      checkData: [], //选中数据
      checkDataRy: [], //选中数据
      huiCheckData: [], //会签选中数据
      zhuCheckData: [], //主送选中数据
      chaoCheckData: [], //抄送选中数据
      benCheckData: [], //本行选中数据
      shouCheckData: [], //收文选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      showExplain: false,
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      unitOrgId:"",//指定部门域
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogVisible: false, // 定密依据
      dialogTypeNow: "", //当前弹窗类型
      baoWenZiDuan: this.$businessCode.zxdb,
      treeJyx: this.$businessCode.zxdbgg,
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: JSON.parse(localStorage.getItem("userInfo")).humanCode,
      clickSaveAndSend: false, //点击完成并发送标示
      checkNames:[],
      // sendXbSuccess:true,//协办成功之后的按钮

      //发协办单位
      createSighWf: {
        function: "doAddAssist",
        deptIds: "",
        deptNames: ""
      },
      searchType:'',
      // 协办单位增发,
      sendXbSuccess: false,
      addSendType: "",
      showHQ: false,
      shdialog: false, // 收回弹窗
      shData: [], // 收回数据
      checkedsh: [], // 收回列表
      checkedshid:[],//收回列表ids
      checkedshassistDeptId:[],//收回列表ids
      checkeddq: [], // 读取的值
      checkedids:[],//增发协办单的id
      typeofHQBM: "",
      dialoghuiqianTit: "收回",
      state:'',//判断是否为已办单
      huanJieMessage:{},
      readFields:{
        underTakeUser:false,
        underTakePhone:false,
        underTakeWx:false,
        circulatePersonNames:false,
        isCBFJ:false,
      },
      requiredFields: {
        circulatePersonNames:false,
        underTakeUser:false,
        underTakePhone:false,
        underTakeWx:false,
      },//必填控制域
      editedIdeaFields: {
        undertakeOpnion:true,
        opinionSuperviseUndertake: true,
        opinionDbOrg: true,
      },//可编辑意见域
      requiredIdeaFields: {
        undertakeOpnion:false,
        opinionSuperviseUndertake: false,
        opinionDbOrg: false,
      },//必填意见域 
      buttonList: [
        {name: '保存', type: 'btn_bc', show: false},
        {name: "完成并发送", type: "btn_wcbfs", show: false},
        {name: "反馈督办单位", type: "btn_fkdbd", show: false}, 
        {name: "发送协办单位", type: "btn_fsxbdw", show: false}, 
        {name: "查看协办办理状态", type: "btn_ckblzt", show: false}, 
        {name: "传阅", type: "btn_cy", show: false},
        {name: "查看流程", type: "btn_cklc", show: false}, 
        {name: "持续跟踪", type: "btn_cxgz", show: false},
        {name: "打印处理单", type: "btn_dycld", show: false}, 
        {name: "收藏", type: "btn_sc", show: false},
        {name: "操作指南", type: "btn_czzn", show: false}, 
      ],
      //正文
      showDraft: false,
      draftFlag: "viewFile", //正文类型 默认空白文档
      zhengWenState: "",
      draftInfo: {
        fileName: "",
        filePath: ""
      },
      tableData1: [],
      //查看子流程
      cbxbchakan:false,
      tableCols1:[{ label: "接收时间", prop: "createTime", align: "center",formatter(row){
           if(row.createTime!='')return row.createTime = dateFormate.date(Date.parse(new Date(row.createTime)),'YYYY-MM-DD HH:mm:ss');
          }},
          { label: "部门名称", prop: "deptName", align: "center" },
          //{ label: "修改时间", prop: "NODENAME", align: "center" },
          { label: "当前环节", prop: "curNodeName", align: "center" },
          { label: "当前处理人", prop: "curUser", align: "center" },
          { label: "办理时间", prop: "completeTime", align: "center",
            formatter(row){
            if(row.completeTime!='')return row.completeTime = dateFormate.date(Date.parse(new Date(row.completeTime)),'YYYY-MM-DD HH:mm:ss');
            }
           },
          // { label: "状态", prop: "NODENAME", align: "center",formatter(row){
          //     if(row.NODEID == 800){text='完成协办'}else{'正在协办'}
          // }},
          ],
      ixHaxQzbj:0,
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
              });
            }
            this.checkData = this.cyCheckData;
            break;
      }
    },
    getTreeDataForRy(n,m) {
      this.unitOrgId = this.fromdata.undertakeDeptId;
      this.singelCheckF = true;
      this.offenUse = false;
      this.dialogTypeForRy = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNowForRy = 'underTakeUser';
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckFForRy = true;
      //手动清空时处理
      switch (n) {
        case "underTakeUser":
          name = "选择承办人";
          clearName = "underTakeUser";
          break;
      }
      this.showCompDialogForRy();
        this.$post
        .postData(
          "selectUserByUnitTree",
          JSON.stringify({
            function: "selectUserByUnitTree",
            pcsAvyId: "",
            curTplNo: "",
            curMultiTenancyId: "",
            unitCode:this.fromdata.undertakeDeptId,
            flag:true
          }),
          this.$businessCode.zxdbgg
        )
        .then(res => {
          if(res.message == "Loading"){
            this.loadingTreeForRy = true;
          }else{
            this.loadingTreeForRy = false;
          }
          that.treeData = (res && res.data) || [];
        });
    },
    showCompDialogForRy(data, status, type, params, dtype){

      let that = this;
      if (status) {
      this.checkIdsRy = [];
      this.checkDataRy = [];
        //确定保存时
        let names = [];
        let ids = [];
        let telMobile = '';
        
        let newIds = [];
        let oldIds = 0
        that.checkIdsRy = [];
          this.checkDataRy = [].concat(data);
        if (data.length) {
          data.map(item => {
              names.push(item.name || item.text);
              ids.push(item.id);
              telMobile = item.telMobile;
              that.checkIdsRy.push(item.id);
          });
          names = names.join(";");
        } else {
          names = "";
          ids = "";
          telMobile = "";
          that.checkIds = [];
        }
      
        this.fromdata.underTakeUser = names;
        this.fromdata.underTakeUserId = ids;
        // if(telMobile.indexOf('undefined')<0 || this.fromdata.underTakePhone == ''){
        //   this.fromdata.underTakePhone = telMobile;
        // }
        if(telMobile.indexOf('undefined')<0){
          if(telMobile.charAt[0] == ',' || telMobile.charAt(telMobile.length-1) == ','){
            telMobile = telMobile.replace(',','')
          }
          this.fromdata.underTakePhone = telMobile;
        }else{
          this.fromdata.underTakePhone = '';
        }
      }

      this.dialogStateForRy = !this.dialogStateForRy;
      this.preserve();
      //打开弹窗 回显
      if (this.dialogStateForRy) {
        this.backDialogDataForCy(this.dialogTypeNowForRy);
      }

    },
    //回显传阅人员
    backDialogDataForRy(type) {
      let newA = [];
      switch (type) {
        case "underTakeUser":
          this.checkDataRy = [];
          this.checkIdsRy = [];
          this.checkDataRy = this.fromdata.underTakeUserId||[];
          break;
      }
    },
    //全选备注4
    handleCheckAllChange(val) {
      this.checkedsh = val ? this.shData : [];
      this.isIndeterminate = false;
      this.$forceUpdate()
    },
    
    handleCheckedCitiesChange(value) {
      let a = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.shData.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.shData.length;
      this.checkNames = [];
      for(let i=0;i<a.length;i++){
        for(let j = 0; j <this.shData.length;j++){
            if(this.shData[j].processInstId == a[i].processInstId){
              this.checkNames.push(this.shData[j].deptName)
            }
        }
      }
      this.checkNames = this.checkNames.join(';')
    },
    shQuedingCY(){
      if(this.checkedsh.length<1){
        this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: "请选择要收回人员",
            duration: 500,
          });
          return
      }
      //全选备注5
      let checkboxdata=[];
      for(let i = 0;i<this.checkedsh.length;i++){
        checkboxdata.push(this.checkedsh[i].id)
      }   
      checkboxdata = checkboxdata.join(';')
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
    cuibanClick(){
      this.$post
        .postData(
          "cuiban",
          JSON.stringify({
            function:"cuiban",
            multiTenancyId:this.fromdata.multiTenancyId,
            processInstId:this.fromdata.processInstId,
            modualType:"undertake",
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
    buttonClick(params){
        switch(params){
            case "btn_bc":
                this.preserve('save');
                break;
            case "btn_wcbfs":
                this.completeSendingIsTrue();
                break;
            case "btn_cxgz":
                this.chixugenzong();
                break;
            case "btn_fkdbd":
                this.doFinishByUndertake();
                break;
            case "btn_cy":
              if(this.fromdata.isHasCY == 1){
                this.getTreeDataForCy('cy',1);
              }else{
                this.getTreeDataForCy('cy');
              }
                break;
            case "btn_sc":
                this.collect();
                break;
            case "btn_cklc":
                this.flowScheme();
                break;
            case "btn_fsxbdw":
                this.handleSendHQPtmt();
                break;
            case "btn_ckblzt":
                this.ckxbblzt();
                break;
            case "btn_dycld":
                this.processSheet('/undertakecld');
                break;
            case "btn_czzn":
                this.caozuozhinan();
                break;

        }
    },
    //点击 完成并发送 弹窗弹出
    completeSendingIsTrue(){
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
              duration: 1500,
            });
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
              this.handleSetLoacl();
              window.close();
            },1000)
          }
        })
    },
    ckxbblzt(){
      this.clxbztqd();
    },
    clxbztqd(){
      let parms = {
        function:"selWfAssistStatusList",
        id:this.fromdata.id,
        parentId:this.fromdata.parentId,
        multiTenancyId:this.fromdata.multiTenancyId,
        parentProcessInstId:this.fromdata.parentProcessInstId,
        processInstId:this.fromdata.processInstId,
        undertakeDeptId:this.fromdata.undertakeDeptId,
        undertakeOrg:this.fromdata.undertakeOrg,
        superviseDeptId:this.fromdata.superviseDeptId,
        superviseOrgId:this.fromdata.superviseOrgId,
        assistDeptId:this.fromdata.assistDeptId,
        assistFinishDeptId:this.fromdata.assistFinishDeptId,
      }
      this.$post
        .postData(
          "selWfAssistStatusList",
          JSON.stringify(parms),
          this.$businessCode.zxdb
        )
        .then(res => {
          this.tableData1 = res.data;
          this.cbxbchakan = true;
        });
    },
    setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(this.requiredFields, this.huanJieMessage.requiredFields)//必填控制
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
      this.buttonList = this.showButton(this.buttonList, this.huanJieMessage.visibleButtons, this.huanJieMessage.visibleButtonsBycondition)//按钮
      this.editedIdeaFields = this.setEditedIdeaFields(this.editedIdeaFields, this.huanJieMessage.editedIdeaFields, this.huanJieMessage.editedIdeaFieldsBycondition)//可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.huanJieMessage.requiredIdeaFields)//可编辑意见域
    },
    setFormConfig() {
      this.$nextTick(()=>{
        this.rules = {
          underTakeUser: [{required: this.requiredFields.underTakeUser,trigger: "change",message: "请选择承办人"}],
          underTakePhone: [{required: this.requiredFields.underTakePhone,trigger: "change",message: "请输入联系电话"}],
        
          opinionDbOrg: [{required: this.requiredIdeaFields.opinionDbOrg, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          opinionSuperviseUndertake: [{required: this.requiredIdeaFields.opinionSuperviseUndertake, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
          undertakeOpnion: [{required: this.requiredIdeaFields.undertakeOpnion, message: '不能为空', trigger: 'blur'},
            { min: 0, max: 500, message: "输入内容超过500字限制,请修改!" }],
        }
      })
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      })


      if(this.isUndertakeOverpl == 1 || this.isUndertakeOverpl == 4){
        this.readFields.assistName = false;
      }
      // if(this.state == 2 || this.state == 3){
      //   for(let i in this.readFields){
      //     this.readFields[i] = true;
      //   }
      //   for(let i in this.editedIdeaFields){
      //     this.editedIdeaFields[i] = true;
      //   }
      // }
    },
    chixugenzong(){
      let obj = {
        function: "doAgainSendUndertake",
      };
      if(this.fromdata.opinionDbOrg == ''){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请填写持续跟踪意见",
          duration: 1500,
        });
        return
      }
      this.$confirm("是否确定操作并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
        delete copyFrom.underTakeAttchmentFileInfo;
        delete copyFrom.opinionSuperviseDeptList;
        delete copyFrom.opinionSuperviseSetupList;
        delete copyFrom.opinionAssistFinishList;
        delete copyFrom.opinionSuperviseOrgList;
        delete copyFrom.assistAttchmentFileInfo;
        delete copyFrom.attchmentFileInfo;
        delete copyFrom.opinionSuperviseBaseList;
        delete copyFrom.opinionSuperviseUndertakeList;
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
              message: "已取消持续跟踪"
            });
        });
      
    },
   
    //请求部门树数据
    getTreeData(n, m) {
      let name = "";
      let that = this;
      let clearName = "";
      this.treeData=[];
      this.canTab = false;
      this.dialogTypeZF = n;
      if(n === 'chen'){
        this.singelCheckF = true;
      }else{
        this.singelCheckF = false;
      }
      this.dialogType = "hui";
      this.addSendType = m;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "chen":
          name = "承办部门";
          clearName = "undertakeOrgName";
          this.singelCheckF = true;//设置单选
          break;
        case "xie":
          name = "协办部门";
          clearName = "assistName";
          break;
        case "fasong":
          name = "发送对象";
          clearName = "assistName";
          break;
        case "cy":
          name = "选择传阅人";
          clearName = "circulatePersonNames";
          break;
        case "underTakeUser":
          name = "选择承办人";
          clearName = "underTakeUser";
          break;
      }
      // this.clearCheckData('underTakeUser');
      this.dialogTit = name;
      this.showCompDialog();
      if(m==1){
        this.dialogTypeNow = "zengfa";
      }
      if(n == "cy"){
       
      }else if(n == "underTakeUser"){
   
      }else{
        this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify({
            function: "unitTreeByFirst",
            flag: false
          }),
          this.treeJyx
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
        });
      }
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "underTakeUser") {
          this.fromdata.underTakeUserId = "";
          this.shouCheckData = [];
        }
        if (name === "assistName") {
          this.fromdata.assistId = "";
          this.xieCheckData = [];
        }
        if (name === "circulatePersonNames") {
          this.fromdata.circulatePersonIds = "";
          this.cyCheckData = [];
        }
      }
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
      if(this.addSendType == '1'){
        type = "zengfa"
      }
      let newA = [];
      switch (type) {
        case "zengfa":
            this.checkIds = this.fromdata.assistId
            ? this.fromdata.assistId.split(";")
            : [];
            //将承办不可选
            if (this.chenCheckData.length) {
              newA = [].concat(this.chenCheckData);
              newA.map(item => {
                //选中的不可操作
                item.disabled = true;
                item.hideType = true;
              });
            }
            this.xieCheckData.map((item)=>{
              //已选中协办 不可操作
              item.disabled = true;
              //item.hideType = true;
            })
            this.checkData = [].concat(this.xieCheckData, newA);
            this.checkIds = [].concat(
              this.checkIds,
              this.fromdata.undertakeOrg
                ? this.fromdata.undertakeOrg.split(";")
                : []
            );
          break;
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
            this.fromdata.assistId
              ? this.fromdata.assistId.split(";")
              : []
          );
          break;
        case "xie":
          this.checkIds = this.fromdata.assistId
            ? this.fromdata.assistId.split(";")
            : [];

          this.checkData = this.xieCheckData.filter(item => {
            item.disabled = true;
            //item.hideType = false;
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
        // case "cy":
        //     this.checkIds = this.fromdata.circulatePersonIds
        //     ? this.fromdata.circulatePersonIds.split(";")
        //     : [];
        //     if (this.cyCheckData.length) {
        //       newA = [].concat(this.cyCheckData);
        //       newA.map(item => {
        //         //选中的不可操作
        //         item.disabled = true;
        //         // item.hideType = true;
        //       });
        //     }
        //     this.checkData = this.cyCheckData;
        //     break;
        // case "underTakeUser":
        //   this.checkData = [];
        //   this.checkIds = [];
        //   this.checkIds = this.fromdata.underTakeUserId||[];
        //   break;
        case "dosend":
          this.checkData = [];
          this.checkIds = [];
          break;
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
        let telMobile = '';
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        this.checkData = [].concat(data);
        if (data.length) {
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
            if(item.telMobile){
              telMobile=item.telMobile
            }
          });
          if (this.addSendType == "1") {
            if(this.dialogTypeZF == 'xie'){
              oldIds = this.fromdata.assistId.split(";")
              oldNames = this.fromdata.assistName.split(";")
            }else if(this.dialogTypeZF == 'cy'){
              oldIds = this.fromdata.circulatePersonIds.split(";")
              oldNames = this.fromdata.circulatePersonNames.split(";")
            }
            // indexData = ids.filter((item,index) => {
            //   if(oldIds.indexOf(item) == -1){
            //     newIds.push(ids[index])
            //     newNames.push(names[index])
            //     return index
            //   }
            // });
            ids.filter((item,i)=>{
              if(oldIds.indexOf(item)==-1){
                newNames.push(names[i])
                newIds.push(ids[i])
              }
            })
            // for(let i=0;i<indexData.length;i++){
            //   newIds.push(ids[indexData[i]])
            //   newNames.push(names[indexData[i]])
            // }
            // newIds = ids.filter((item,index) => {
            //   return oldIds.indexOf(item) == -1;
            // });indexData
            // newNames = names.filter(item => {
            //   return oldNames.indexOf(item) == -1;
            // });
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
            this.fromdata.assistName = names;
            this.fromdata.assistId = ids;
            this.xieCheckData = ids.length ? this.checkData : [];
            this.createSighWf.deptIds = ids;
            this.createSighWf.deptNames = names;
            // this.createSighWf.sequenceSign = radio;
            // this.saveOrUpdateToQianbaoEntity.sequenceSign = radio;
            if (!ids.length) {
              this.checkIds = [];
            }
            break;

          case "chen":
            this.fromdata.undertakeOrgName = names;
            this.fromdata.undertakeOrg = ids;
            this.chenCheckData = this.checkData;
            break;
          case "xie":
            this.fromdata.assistName = names;
            this.fromdata.assistId = ids;
            this.xieCheckData = this.checkData;
            break;
          case "cy":
            this.fromdata.circulatePersonNames = names;
            this.fromdata.circulatePersonIds = ids;
            this.cyCheckData = this.checkData;
            break;
          case "underTakeUser":
            this.fromdata.underTakeUser = names;
            this.fromdata.underTakeUserId = ids;
            if(this.fromdata.underTakePhone ==''){
              this.fromdata.underTakePhone = telMobile;
            }
            this.shouCheckData = this.checkData;
            break;
          case "zengfa":
            if(this.dialogTypeZF == "xie"){
              this.fromdata.assistName = names;
              this.fromdata.assistId = ids;
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
        if(this.addSendType != '1' && this.dialogTypeZF == "cy"){
          this.sendCy();
        }
        // 下一环节处理人信息
        if (dtype === "dosend") {
          this.fromdata.pcsAvyId = params.pcsAvyId;
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
    //选择人员后 确定完dialogTypeNow成并发送
    saveSending() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseCirculateList;
      delete parseList.underTakeAttchmentFileInfo;
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionAssistFinishList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.assistAttchmentFileInfo;
      delete parseList.attchmentFileInfo;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.opinionSuperviseUndertakeList;
      let params = Object.assign(this.bank_doSend, parseList);
      this.$post
        .postData(
          "doSendByUndertake",
          JSON.stringify(params),
          this.baoWenZiDuan
        )
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
      this.$confirm("是否发送办理单位并退出当前页面?", "提示", {
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
            });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送"
          });
        });
      
    },
    //点击 完成并发送 弹窗弹出
    completeSending() {
      // let judge = true;
      // judge = this.saveCheck();
      // if (!judge) {
      //   return;
      // }
      this.addSendType = 0;
      this.checkIdsRy=[];
      this.preserve();
      this.dialogTit = "完成并发送";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogType = "dosend";
      // this.dialogType = "hui";
      this.dialogTypeNow = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.fromdata.pcsAvyId = this.bank_send.pcsAvyId;
      this.fromdata.nextNodeId = this.bank_doSend.nextNodeId; //下以环节id
      this.fromdata.nextNodeName = this.bank_doSend.nextNodeName;
      this.showCompDialog();
      setTimeout(()=>{
        this.$post
        .postData(
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
              JSON.stringify(this.bank_send),
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
              this.defaultUser = res.data&&res.data.defaultUser||{};
            })
            .catch(e => {
            });
        });
      },500)
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let result = true;
      this.$refs.fromdata.validate((valid, object) => {
        if (!valid) {
          let split = ";";
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
      let regT = /^[0-9]*$/;
      let tips = "您有未输入字段!";
      this.scrollIntoForm();
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
          this.projectBaseList = JSON.parse(res.data.basis);
          this.SemergencyLevel = JSON.parse(res.data.degree);
          this.handleDays = JSON.parse(res.data.handleDays);
          this.SredHead = JSON.parse(res.data.number);
          // --secret_type 秘密类型
          this.SsecretType = JSON.parse(res.data.secretType);
          // --secretLimitType 秘密期限类型
          this.SsecretTimeType = JSON.parse(res.data.secretLimitType);
          // --secret_flag 秘密标志
          this.SworkSecurity = JSON.parse(res.data.secretFlag);
          // --trade_secret 密级和保密期限
          this.SsecretFlagType = JSON.parse(res.data.tradeSecret);
          // --secret_flag_content 密级和保密期限-对应选择时间
          this.dateList = JSON.parse(res.data.secretFlagContent);

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
      this.uploadConfig1.id =this.uploadConfig2.id=this.uploadConfig.id = this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageidDBCB") || "";
      this.state = this.$route.query.state?this.$route.query.state:"";
      let that = this;
      if(this.isPL != ''){
        this.bank_dispach = Object.assign(this.bank_dispach,{undertakeOrganId:this.undertakeOrganId})
      }
      this.$post
        .postData(
          "selUndertakeById",
          JSON.stringify(this.bank_dispach),
          this.baoWenZiDuan
        )
        .then(res => {
          if(this.isPL == ''){
            let ymdb = this.state > 1 ? 'fdb':'db'
            this.getIsNowUser(res,'fcy',ymdb)
          }else{
            this.getIsNowUser(res)
          }
          that.fromdata = Object.assign(this.fromdata,res.data);
         if(res.data.level&&res.data.level == '1'){//传阅常用联系人修改 12.21
            that.scircularizeLevel = '2';//传阅常用联系人修改 12.21
          }else{
            that.scircularizeLevel = '1';//传阅常用联系人修改 12.21
          }
          if (res.data.assistId) {
            this.xieCheckData = this.concatTreeData(
              res.data.assistId,
              res.data.assistName
            );
            if (this.fromdata.assistName!='') {
              this.showHQ = false;
            } else {
              this.showHQ = true;
            }
          } else {
            this.xieCheckData = [];
          }
          if (res.data.undertakeOrg) {
            this.chenCheckData = this.concatTreeData(
              res.data.undertakeOrg,
              res.data.undertakeOrgName,
            );
          } else {
            this.undertakeOrg = [];
          }
          if (res.data.circulatePersonNames) {
            this.cyCheckData = this.concatTreeData(
              res.data.circulatePersonIds,
              res.data.circulatePersonNames
            );
          } else {
            this.cyCheckData = [];
          }
          
          //承办意见处理
          // if(this.isUndertakeOverpl == ''){
          //   this.isUndertakeOverpl = res.data.isUndertakeOver;
          // }
          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.uploadConfig1.filesHas = this.fromdata.underTakeAttchmentFileInfo;
          this.fkfj = [];
          this.fkfjList = [];
          for(let i in this.fromdata.feedbackAttachmentMap){
              let k = 0;
              this.fkfj.push(i)
              this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i])
            }
          this.fromdata.attachSort = [];
          this.createSighWf.deptIds = res.data.assistId;
          this.createSighWf.deptNames = res.data.assistName;
          
          this.createSighWf.processInstId = res.data.processInstId;
          this.createSighWf.id = this.bank_dispach.id;
          this.createSighWf.multiTenancyId = res.data.multiTenancyId;
          this.createSighWf.pcsAvyId = res.data.pcsAvyId;
          this.createSighWf.tplNo = res.data.tplNo;
          this.createSighWf.curNodeCode = res.data.curNodeCode;
          // this.createSighWf.sequenceSign = this.saveOrUpdateToQianbaoEntity.sequenceSign = this.setradio =
          //   res.data.sequenceSign || "0";

          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_send.curTplNo = this.bank_selectConfig.tplNo = res.data.pTplNo;
          this.bank_send.curMultiTenancyId = this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
          
            if(this.isPL == 1){
              this.isUndertakeOverpl = this.isUndertakeOverpl
            }else{
              this.isUndertakeOverpl = res.data.isUndertakeOver
            }
          if((this.isPL==''&&this.readFlag != 1&&this.state<2)&&this.searchType!='search'){
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
            //收回测试
          if(this.isPL==''){
            if(this.state == 2){
                this.$post
              .postData(
                "checkTakeBack",
                JSON.stringify({function:"checkTakeBack",processInstId:res.data.processInstId}),
                this.$businessCode.zxdbgg
              )
              .then(res => {
                this.allowBack = res.allowBack;
              });
            }
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
          }
        })
        .catch(erro => {
        });
    },
   
    // 保存
    async preserve(type) {
      let successState = false;
      this.bank_dispach.id = sessionStorage.getItem("pageidDBCB") || "";
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseCirculateList;
      delete parseList.feedbackAttachmentMap;
      if(parseList.underTakeAttchmentFileInfo == ''){
        delete parseList.underTakeAttchmentFileInfo;
      }
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionAssistFinishList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.assistAttchmentFileInfo;
      delete parseList.opinionSuperviseUndertakeList;
      delete parseList.attchmentFileInfo;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.opinionDbOrgList;
      var obj = Object.assign(this.bank_addToSendOrder, parseList);


      this.$post
        .postData("doUpdateByUndertake", JSON.stringify(obj), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
            successState = true;
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            sessionStorage.setItem("pageidDBCB", res.data.id);

            if (type&&type!='2') {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            this.createSighWf.processInstId = res.data.processInstId;
            this.createSighWf.id = this.bank_dispach.id;
            this.createSighWf.multiTenancyId = res.data.multiTenancyId;
            this.createSighWf.pcsAvyId = res.data.pcsAvyId;
            this.createSighWf.tplNo = res.data.tplNo;
            this.createSighWf.curNodeCode = res.data.curNodeCode;
            //  this.createSighWf.sequenceSign = res.data.sequenceSign;
            if(type==="uploadfile"){
              this.uploadConfig.id = res.data.id;
              this.uploadConfig1.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();  
            }else{
              
            }
            this.toEdit();
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
      if(this.state == 2 || this.state == 3){
        //window.location.href = "about:blank";
        //window.opener.location.reload();
        this.handleSetLoacl();
        window.close();
      }else{
        this.closeHandler = true;
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
    // 删除此文
    delectArticle() {
      this.bank_dispach.id = localStorage.getItem("pageidDBCB") || "";
      let deletesendorderid = this.bank_dispach.id || this.$route.query.id;
      this.bank_DeleteSendOrder.id = deletesendorderid;

      this.$confirm("是否删除并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.bank_dispach.id) {
            window.location.href = "about:blank";
            window.opener.location.reload();
            this.handleSetLoacl();
            window.close();
          } else {
            this.$post
              .postData(
                "doDeleteSendOrder",
                JSON.stringify(this.bank_DeleteSendOrder),
                this.baoWenZiDuan
              )
              .then(res => {
                this.$message({
                  type: "success",
                  offset: 400,
                  showClose: true,
                  message: "删除成功!"
                });
                window.location.href = "about:blank";
                window.opener.location.reload();
                this.handleSetLoacl();
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
            duation: 1000
          });
        });
    },
    // 收藏
    collect(){
      this.$confirm("您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
      let obj={
        function:'dbCollection',
        id: this.fromdata.id,//数据id
        flag:'zxdbcb',   //DXDB
        processInstId:this.fromdata.processInstId,
        documentCode: this.fromdata.doucumentNum,  //文号
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
                      res.data.fileName
                    );
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
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      if(this.isPL != ''){
        this.bank_cklc = Object.assign(this.bank_cklc,{undertakeOrganId:this.undertakeOrganId})
      }
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
          message: "请先保存",
          duation: 500
        });
        return
      }
      if(this.state>1){
        const routeData = this.$router.resolve({
          path: path, 
          query: {
              id:this.fromdata.id
          }
        });
        window.open(routeData.href, "_blank");
      }else{
        this.preserve().then(()=>{
          const routeData = this.$router.resolve({
            path: path, 
            query: {
                id:this.fromdata.id
            }
          });
          window.open(routeData.href, "_blank");
        });
      }
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
      this.getCommonUse(0);
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
    iSneedRq(){
      let result = true;
      if(this.isUndertakeOverpl == 2){
        if(this.fromdata.opinionDbOrgList&&this.fromdata.opinionDbOrgList.length>0){
          result = true
        }else{
          if(this.fromdata.opinionDbOrg == ''){
            result =  false
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请输入持续跟踪意见",
              duration: 1500,
            });
          }else{
            result =  true
          }
        }
      }else{
         if((this.fromdata.opinionDbOrgList&&this.fromdata.opinionDbOrgList.length>0)&&(this.fromdata.opinionSuperviseUndertakeList&&this.fromdata.opinionSuperviseUndertakeList.length>0)){
              if(new Date(this.fromdata.opinionSuperviseUndertakeList[0].createTime)
              >new Date(this.fromdata.opinionDbOrgList[0].createTime)
              )
            {
              this.canDelete = true;
              result =  true
            }else{
              if(this.fromdata.undertakeOpnion == ''){
                result =  false
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "请输入承办意见",
                  duration: 1500,
                });
              }else{
                result =  true
              }
              
            }
        }else{
          if(this.fromdata.undertakeOpnion == ''&&!(this.fromdata.opinionSuperviseUndertakeList&&this.fromdata.opinionSuperviseUndertakeList.length>0)){
            result =  false
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请输入承办意见",
              duration: 1500,
            });
          }else{
            result =  true
          }
        }
      }
        return result
    },
    doFinishByUndertake() {
      if(this.fromdata.underTakeUser==""){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择承办人",
          duration: 1500
        });
        return
      }
      if(this.fromdata.underTakePhone==""){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "联系电话不能为空",
          duration: 1500
        });
        return
      }
      let judge = true;
      if(!this.fromdata.processInstId){
        this.preserve('2');
      }
      judge = this.scrollIntoForm();
      if (!judge) {
        return;
      }
      
      let judge1 = true;
      judge1 = this.iSneedRq();
      if (!judge1) {
        return;
      }
      this.$confirm("是否确定反馈督办单并关闭当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          let bank_do = {
            function: "doFinishByUndertake"
          };
          var obj = Object.assign(bank_do, this.fromdata);
          delete obj.underTakeAttchmentFileInfo;
          delete obj.assistAttchmentFileInfo;
          delete obj.attchmentFileInfo;
          delete obj.opinionSuperviseDeptList;
          delete obj.opinionSuperviseSetupList;
          delete obj.opinionAssistFinishList;
          delete obj.opinionSuperviseOrgList;
          delete obj.opinionDbOrgList;
          delete obj.attachSort;
          delete obj.feedbackAttachmentMap;
          delete obj.opinionSuperviseCirculateList;
          delete obj.opinionSuperviseBaseList;
          delete obj.opinionSuperviseUndertakeList;
          if(!this.fromdata.assistName){
            this.$post
            .postData("doFinishByUndertake", JSON.stringify(obj), this.baoWenZiDuan)
            .then(res => {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "反馈成功",
                  duration: 1500,
                });
                setTimeout(()=>{
                  window.location.href = "about:blank";
                  window.opener.location.reload();
                  this.handleSetLoacl();
                  window.close();
                },1500)
              }else{
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: res.message,
                  duration: 1500
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: err.message,
                duration: 1500
              });
              return false;
            });
          }else{
            this.$message({
              message:'协办单未办结',
              type:'error'
            })
          }

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
     

    },
    //协办单位弹框
    // bankmain(n, m) {
    //   let name = "";
    //   switch (n) {
        
    //     case "hui":
    //       name = "协办";
    //       break;
        
    //   }
    //   this.dialogTit = name;
    //   this.canTab = true;
    //   this.treeData = [];
    //   this.dialogType = n;
    //   if (n === "hui") {
    //     this.hasRadio = false;
    //     this.canTab = false;
    //     this.singelCheckF = false;
    //     this.dialogTypeNow = "zengfa";
    //   }
    //   this.addSendType = m;
    //   this.showCompDialog();
    //   // if(this.fromdata.curNodeCode==="002" && this.fromdata.assistName !=='') {
    //   //   this.sendXbSuccess = true
    //   // }
    //   if (n === "hui") {
    //     this.$post
    //       .postData(
    //         "unitTreeByFirst",
    //         JSON.stringify(this.bank_main),
    //         this.treeJyx
    //       )
    //       .then(res => {
    //         this.treeData = (res && res.data) || [];
    //       });
    //   } 
    // },
    changedata(){
      this.$forceUpdate();
    },
    handleSendHQPtmt(newIds, newNames, oldIds, oldNames) {
      this.bank_dispach.id = this.$route.query.id
        ? this.$route.query.id
        : sessionStorage.getItem("pageidDBCB") || "";
      // var obj = Object.assign(this.createSighWf, this.fromdata);
      var obj = Object.assign(this.createSighWf);
          obj = Object.assign(obj,{undertakeOrg:this.fromdata.undertakeOrg});
      this.createSighWf.deptIds = this.fromdata.assistId;
      this.createSighWf.deptNames = this.fromdata.assistName;
      if(this.isPL!=''){
        this.createSighWf.id=this.$route.query.idPL;
        Object.assign(obj,{multiTenancyId:'1'});
        Object.assign(obj,{doAddAssistByType:'2'});
      }
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
      if (newIds&&newNames) {
        obj.deptIds = newIds;
        obj.deptNames = newNames;
      }
      if ((this.addSendType == "1" && newIds ) || this.addSendType != "1") {
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
    async takeBackSign(type) {
      this.shData = []; // 收回数据
      this.checkedsh = []; // 收回列表this.
       if (type == "shouhui") {
        this.dialoghuiqianTit = "选择需要收回的协办单位";
      } else if(type == "cuiban"){
        this.dialoghuiqianTit = "选择需要催办的协办单位";
      }else if(type == "qzbj"){
        this.dialoghuiqianTit = "选择需要强制办结的协办单位";
      }
      this.shdialog = true;
      this.typeofHQBM = type;
      let parms = {
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
        id:this.bank_dispach.id
      };
      if(type == 'cuiban'){ 
        Object.assign(parms,{function:"selAssistListCb"})
        Object.assign(parms,{parentId:this.fromdata.parentId})
        this.fun = 'selAssistListCb';
      }else if(type == 'shouhui'){
        if(this.isPL!=''){
          parms.id = this.$route.query.idPL;
          Object.assign(parms,{id:this.$route.query.idPL})
          if(this.isPL!=''){
            Object.assign(parms,{doAddAssistByType:'2'})
          }
        }
        Object.assign(parms,{function:"selAssistList"})
        this.fun = 'selAssistList';
      }else if(type == 'qzbj'){
        this.fun = 'selAssistListByBj';
        await Object.assign(parms,{function:"selAssistListByBj"})
        await Object.assign(parms,{parentId:this.fromdata.parentId})
      }
     

      this.$post
        .postData(this.fun, JSON.stringify(parms), this.baoWenZiDuan)
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
      this.preserve();
      let checkboxdataids = this.checkedshid.join(";");
      let checkboxdata = this.checkNames.join(";");
      let dqdata = this.checkeddq.join(";");
      let ids = this.checkedids.join(';');
      let takeBackDeptIdsNew = this.takeBackDeptIdsNew.join(';');
      if (this.typeofHQBM === "shouhui") {
        let shform = {
          function: "takeBackXb",
          pcsAvyId: this.fromdata.pcsAvyId,
          // multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: checkboxdata,
          subProcessInstId: dqdata,
          id: this.fromdata.id,
          ids:ids,
          takeBackDeptIds:checkboxdataids,
          takeBackDeptIdsNew:takeBackDeptIdsNew,
          undertakeOrg:this.fromdata.undertakeOrg,
          superviseOrgId:this.fromdata.superviseOrgId,
        };
        if(this.isPL!=''){
          shform.id = this.$route.query.idPL;
          Object.assign(shform,{type:'undertake'})
          Object.assign(shform,{dobackAssistByType:'2'})
        }
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
              this.checkedshassistDeptId=[];
              this.takeBackDeptIdsNew=[];
              this.toEdit();
              this.$forceUpdate();
            }else{
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
              message: "收回失败",
              duration: 1500
            });
            this.toEdit();
          });
        this.shdialog = false;
        
      } else if (this.typeofHQBM == "cuiban") {
        let parms = {
          function: "doSuperviseUrge",
          subProcessInstId: dqdata,
          multiTenancyId: this.fromdata.multiTenancyId,
          tplbsnid:"DXZXDB_XB",
          pcsAvyId:this.fromdata.pcsAvyId,
          takeBackDeptIdsNew:takeBackDeptIdsNew
        };
        this.$post
          .postData("doSuperviseUrge", JSON.stringify(parms), this.$businessCode.zxdb)
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "催办成功",
                duration: 1000
              });
              this.checkeddq = [];
              this.checkedids=[];
              this.checkNames=[];
              this.checkedshid=[];
              this.checkedshassistDeptId=[];
              this.takeBackDeptIdsNew=[];
              this.toEdit();
            } else {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: res.message,
                duration: 1000
              });
            }
            this.shdialog = false;
          });
      } else if(this.typeofHQBM == "qzbj"){
        let shform = {
          function: "doAssistFinishByQZ",
          // pcsAvyId: this.fromdata.pcsAvyId,
          // multiTenancyId: this.fromdata.multiTenancyId,
          // takeBackDeptNames: checkboxdata,
          // subProcessInstId: dqdata,
          id: this.bank_dispach.id,
          takeBackDeptNames: checkboxdata,
          ids:ids,
          createTime:this.fromdata.createTime,
          takeBackDeptIdsNew:takeBackDeptIdsNew,
          undertakeOrg:this.fromdata.undertakeOrg,
          superviseOrgId:this.fromdata.superviseOrgId,
          //takeBackDeptIds:checkboxdataids
        };
        this.$post
          .postData("doAssistFinishByQZ", JSON.stringify(shform), this.$businessCode.zxdb)
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "强制办结成功",
                duration: 1500
              });
              this.shdialog = false;
              this.checkeddq = [];
              this.checkedids=[];
              this.checkNames=[];
              this.checkedshid=[];
              this.checkedshassistDeptId=[];
              this.takeBackDeptIdsNew=[];
              this.toEdit();
            }else{
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
              message: "强制办结失败",
              duration: 1500
            });
          });
      }
    },
    
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
        id:this.fromdata.underTakeAttchmentFileInfo[n-1].id,
        sort:this.fromdata.underTakeAttchmentFileInfo[n].sort
        },
        {
        id:this.fromdata.underTakeAttchmentFileInfo[n].id,
        sort:this.fromdata.underTakeAttchmentFileInfo[n-1].sort
        }
      )
      midObj = this.fromdata.underTakeAttchmentFileInfo[n];
      this.fromdata.underTakeAttchmentFileInfo[n] = this.fromdata.underTakeAttchmentFileInfo[n - 1];
      this.fromdata.underTakeAttchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.fromdata.attachSort.push(
        {
        id:this.fromdata.undertakeFileLunderTakeAttchmentFileInfoist[n+1].id,
        sort:this.fromdata.underTakeAttchmentFileInfo[n].sort
        },
        {
        id:this.fromdata.underTakeAttchmentFileInfo[n].id,
        sort:this.fromdata.underTakeAttchmentFileInfo[n+1].sort
        }
      )
      midObj = this.fromdata.underTakeAttchmentFileInfo[n];
      this.fromdata.underTakeAttchmentFileInfo[n] = this.fromdata.underTakeAttchmentFileInfo[n + 1];
      this.fromdata.underTakeAttchmentFileInfo[n + 1] = midObj;
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
                    this.fromdata.underTakeAttchmentFileInfo.splice(n, 1);
                    this.uploadConfig.filesHas = this.fromdata.underTakeAttchmentFileInfo;
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
                duration: 1500
              });
            }
          }
        });
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
    },
    //发送传阅人
    async sendCy(newIds, newNames){
      this.preserve('2').then((flag)=>{
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
                this.toEdit();
                this.$forceUpdate();
              }else{
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "发送传阅人失败",
                  duration: 500,
                });
              }

          })
          .catch(e => {
            console.log(e);
          });

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
  },
  created() {
    this.isWH = this.$route.query.isWH ? this.$route.query.isWH:"";
    this.searchType = this.$route.query.searchType ? this.$route.query.searchType:"";
    this.uploadConfig1.code = this.$businessCode.zxdbfj;
    this.uploadConfig.flowTranId = this.uploadConfig1.flowTranId = this.treeTradeCode = this.zxdbgg;  //完成并发送 树 流程交易线   chai
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.state = this.$route.query.state ? this.$route.query.state:"";
    this.codeNode = this.$route.query.codeNode ? this.$route.query.codeNode:"";
    this.isPL = this.$route.query.isPL ? this.$route.query.isPL:"";
    this.batchStatus = this.$route.query.batchStatus ? this.$route.query.batchStatus:"";
    this.treeTradeCode = this.$businessCode.zxdbgg;  //人员树交易线
    //this.getSendOrderDicByParam();
    this.isUndertakeOverpl = this.$route.query.isUndertakeOverpl ? this.$route.query.isUndertakeOverpl: "";
    this.undertakeOrganId = this.$route.query.undertakeOrganId ? this.$route.query.undertakeOrganId: "";
    this.toEdit();
    if(this.searchType!='search'){
      window.opener.location.reload();
    }
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;

  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};

// const diffArr = (arr1, arr2) => {
//   const eleIsNotnArr = (ele, arr) => {
//     arr.some(m => m === ele);
//     return marr1.filter(x => eleIsInArr(x, marr2));
//   };
// };
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
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px 0;
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
    text-align: right;
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
.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
}
.redcolor {
  /deep/.el-input__inner{
    color: red !important;
  }
}
.grid_comtent>.el-button--default{
  border: 1px solid #fff !important;
  background: #0563c8 !important;
  color: #fff !important;
}
.grid_comtent>.el-button--default:hover{
  background-color: #103ebd !important;
  transform:scale(1.1) !important;
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
/deep/ .hqbm .el-textarea__inner {
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
