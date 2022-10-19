<template>
  <div id="undertakeDetailCopy" class="bank_dispach greenLight">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>督办处理单
        </p>
        <div class="grid_comtent">
            <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
            <el-button size="small" plain @click="maintenance">维护</el-button>
            <el-button size="small" plain 
            v-show="bank_selectConfig.curNodeId != '800'" 
            @click="processScheduling"
            >流程调度</el-button>
            <el-button size="small" plain @click="flowScheme">查看流程</el-button>
            <el-button size="small" plain @click="processSheet('/undertakecld')">打印处理单</el-button>
            <el-button size="small" plain @click="collect">收藏</el-button>
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
    <el-dialog
          title="查看协办办理状态"
          :visible.sync="cbxbchakan">
        <el-table border :data='tableData1' class="scroll"  height="400">
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
              <span>专项督查办事项，请按时处理、及时反馈。<span v-if="fromdata.undertakeNum>0">(承办次数：第{{fromdata.undertakeNum}}次)</span></span>
            </p>
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
                    <el-input v-model="fromdata.doucumentNum" plain  disabled type="info">{{fromdata.doucumentNum}}</el-input>
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
                  <el-form-item label="截止日期" prop="expireDate" ref="expireDate">
                      <el-input v-model="fromdata.expectFinishTime" disabled ></el-input>
                  </el-form-item>
                </el-col>
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
                    <el-input :disabled="true" :value="cbdwItem">
                      <el-button slot="append" @click="deleteMassage(index)" disabled>删除</el-button>
                    </el-input>
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
                        type="textarea"
                        resize="none"
                        autosize
                        v-model="fromdata.assistName"
                        :title="fromdata.assistName"
                        disabled
                        class="hqbm"
                      ></el-input>
                    </div>
                    <!-- <el-input
                      v-model="fromdata.assistName"
                      placeholder="请选择协办单位"
                      disabled
                      class="redcolor"
                      @input="inputChange"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-plus"
                        @click="bankmain('hui')"
                        v-if="fromdata.isHasXB != 1"
                        disabled
                        style="width:10%"
                      ></el-button>
                      <el-button slot="append" 
                      disabled
                      @click="bankmain('hui', '1')" v-if="fromdata.isHasXB == 1">增发</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('shouhui')"
                        v-if="fromdata.isHasXB == 1"
                       disabled
                      >收回</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('cuiban')"
                         v-if="fromdata.isHasXB == 1&&this.ixHaxQzbj == 0"
                        disabled
                      >催办</el-button>
                      <el-button
                        slot="append"
                        @click="takeBackSign('qzbj')"
                        v-if="this.ixHaxQzbj == 1"
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
                  <el-form-item label="传阅人" prop="circulatePersonNames" ref="circulatePersonNames">
                    <el-input
                      v-model="fromdata.circulatePersonNames"
                      readonly
                      placeholder=""
                      style="width: 100%;"
                      disabled
                    >
                      <el-button slot="append" disabled @click="takeBackSignCY('shouhui','cy')" v-if="fromdata.isHasCY == 1">收回</el-button>
                    <!-- <el-button slot="append" @click="takeBackSign('shouhui','cy')" v-if="fromdata.isHasCY == 1">收回</el-button> -->
                     <!-- <el-button slot="append" @click="getTreeData('cy')" icon="el-icon-plus" v-else></el-button>-->
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
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="false"
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
                    ></el-input>
                    <el-input type="textarea" v-else resize="none" disabled autosize></el-input>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseDeptList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="false"
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
                          <el-input v-model="fromdata.underTakeUser" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" class="m10">
                        <el-form-item label="联系电话" prop="underTakePhone" ref="underTakePhone">
                          <el-input v-model="fromdata.underTakePhone"
                          oninput="value=value.replace(/[^\-\,\d\*\ ]/g,'')" disabled></el-input>
                        </el-form-item>
                      </el-col>
                       <el-col class="m10">
                      <el-form-item label="承办意见" prop="undertakeOpnion" ref="undertakeOpnion">
                        
                        <el-input type="textarea"
                            resize="none"
                            v-if="(fromdata.opinionSuperviseUndertakeList&&fromdata.opinionSuperviseUndertakeList.length == 0)||!fromdata.opinionSuperviseUndertakeList"
                            autosize v-model="fromdata.undertakeOpnion" disabled
                          ></el-input>
                          <opinionText 
                            :opinionText="fromdata.opinionSuperviseUndertakeList" 
                            :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                            :nowUserId="nowUserId"
                            @deletService="deletService"
                            :curNodeCode="fromdata.curNodeCode"
                            :canDelet="false"
                          ></opinionText>
                      </el-form-item>
                    </el-col>
                    </el-row>
                   
                    <el-col>
                    <el-form-item label="承办附件">
                    </el-form-item>
                      <div class="tree_w" style="margin-left:130px;" v-if="fromdata.underTakeAttchmentFileInfo&&fromdata.underTakeAttchmentFileInfo.length">
                        <el-scrollbar>
                          <div v-for="item in  fromdata.underTakeAttchmentFileInfo" :key="item.id" class="comp_list">  
                            <template>
                              <div class="command_wrap">
                                <span class="name down" :title="item.fileName"@click="viewDraftFile(item.fileName,item.filePath ,$businessCode.zxdbfj)"
                           >{{item.fileName}}</span>
                                <span class="name">{{item.createrName}}</span>
                                <span class="name">{{item.createTime}}</span>
                                <div class="btns">
                                  <el-button
                                    type="warning"
                                    v-if="state!= '2'&&state!= '3'"
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
                    <div v-for="(item) in fromdata.opinionAssistFinishList" :key="item.id">
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
                            <span class="adviceInfo">{{item.departmentName+" "+item.createTime}}</span>
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
                    </div>
                    <el-input 
                    resize="none"
                    autosize
                    v-if="fromdata.opinionAssistFinishList&&fromdata.opinionAssistFinishList.length =='0'" disabled type="textarea"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="催查记录" prop="nodata" ref="nodata">
                    <el-input v-model="fromdata.nodata"
                    resize="none"
                    autosize type="textarea" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- 附件 -->
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-row class="pr45">
              <el-col v-if="fromdata.attchmentFileInfo&&fromdata.attchmentFileInfo.length">
              <el-form-item label="督办附件" style="margin-left:-130px;">
                <div>
                  <el-scrollbar class="file_list_box">
                    <div v-for="(item,index) in  fromdata.attchmentFileInfo" :key="item.id">  
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
                        <div class="command_wrap">
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
    
    <el-dialog :title="dialoghuiqianTit" :visible.sync="shdialog" width="50%">
      <el-card class="dialog_regain">
        <!-- <h6>选择要收回的协办部门</h6> -->
        <el-checkbox-group v-model="checkedsh">
          <el-checkbox
            v-for="(item,index) in shData"
            :label="item.assistOrgName"
            @change="checkouthuiqian(item)"
            :key="index"
            :disabled="item.curNodeCode == 800"
          >
            {{item.assistOrgName}}
            <span v-if="item.curNodeCode == 800">(已办结)</span>
          </el-checkbox>
        </el-checkbox-group>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shdialog = false">取 消</el-button>
        <el-button type="primary" @click="shQueding(typeofHQBM)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <treeCofig
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
      :fromdata="fromdata"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :loadingTree="loadingTree"
    ></treeCofig> -->
    <treeCopy
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
    ></treeCopy>
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
import loadAccessory from "@/components/LoadAccessory/LoadAccessory";
import timeDialog from "@/components/timedialog/timedialog";
import treeCofig from "@/components/tree/tree-fawen";
import treeCopy from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
import secretBasls from "@/components/secretBasls/secretBasls";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import dateFormate from "@/util/filters.js";
import opinionText from "@/components/opinionText/index";
import viewDraft from "@/minixs/viewDraft";

export default {
  name: "App",
  components: {
    loadAccessory,
    timeDialog,
    treeCofig,
    treeCopy,
    secretBasls,
    appendWriteList,
    uploadFiles,
    opinionText
  },
  data() {
    return {
      defaultUser:{},//完成并发送默认值
      treeTradeCode:'',
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
        processInstId: "",
        manager:'',
        unitId:this.$route.query.unitId,
      },
      SsecretLimit: [
        { value: "0", label: "年" },
        { value: "1", label: "月" },
        { value: "2", label: "日" }
      ],
      undertakeflag: false, //承办人等信息
      flag: false,
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
        nextUserId: "", //人员id
        mananger:'',
        unitId:this.$route.query.unitId,
      },
      //完成并发送 弹窗
      bank_send: {
        function: "selWfNode",
        pcsAvyId: "",
        curTplNo: "",
        curMultiTenancyId: "",
        manager:'',
        unitId:this.$route.query.unitId,
      },
      //完成并发送弹窗下拉框
      bank_selectConfig: {
        function: "getAllNodeInfo",
        curNodeId: "",
        tplNo: "",
        pTplNo: "",
        multiTenancyId: "",
        manager:'',
        unitId:this.$route.query.unitId,
      },
      //input框内容
      bank_dispach: {
        function: "selUndertakeById",
        id: this.$route.query.id,
        manager:'',
        unitId:'',
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
        function: "doDeletesendOrderOpinion",
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
      chenCheckData: [],
      assistDeptData: [],
      dialogTypeZF:"",
      cbdwList: [], //督办依据添加
      buttons: [],
      buttonss: [],
      loadingTree:false,
      fromdata: {
        manager:"",
        unitId:this.$route.query.unitId,
        undertakeNum:0,
        handleTime:"",
        attachSort: [],
        attchmentFileInfo: [],
        feedbackAttachmentMap: [],
        underTakeAttchmentFileInfo: [],
        handleStatus:"",
        secretTimeType: "",
        opinionSuperviseBaseList: [],
        superviseRemarkList: [],
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
      dateList: [],
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
      active: "#wjys",
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
      dialogTypeNow: "", //当前弹窗类型
      baoWenZiDuan: this.$businessCode.zxdb,
      treeJyx: this.$businessCode.zxdbgg,
      appendWriteDialog: true,
      clickTypes: 1,
      nowUserId: sessionStorage.getItem("ccboaHumanId"), //当前用户id
      clickSaveAndSend: false, //点击完成并发送标示
      // sendXbSuccess:true,//协办成功之后的按钮

      //发协办单位
      createSighWf: {
        function: "doAddAssist",
        deptIds: "",
        deptNames: ""
      },
      // 协办单位增发,
      sendXbSuccess: false,
      addSendType: "",
      showHQ: false,
      shdialog: false, // 收回弹窗
      shData: [], // 收回数据
      checkedsh: [], // 收回列表
      checkedshid:[],//收回列表ids
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
        {name: "持续跟踪", type: "btn_cxgz", show: false},
        {name: "反馈督办单位", type: "btn_fkdbd", show: false}, 
        {name: "发送协办单位", type: "btn_fsxbdw", show: false}, 
        {name: "查看协办办理状态", type: "btn_ckblzt", show: false}, 
        {name: "发送传阅人", type: "btn_cy", show: false},
        {name: "查看流程", type: "btn_cklc", show: false}, 
        {name: "打印处理单", type: "btn_dycld", show: false}, 
        {name: "操作指南", type: "btn_czzn", show: false}, 
      ],
      tableData1: [],
      //查看子流程
      cbxbchakan:false,
      tableCols1:[{ label: "接收时间", prop: "createTime", align: "center",formatter(row){
           return row.createTime = dateFormate.date(Date.parse(new Date(row.createTime)),'YYYY-MM-DD HH:mm:ss');
          }},
          { label: "部门名称", prop: "deptName", align: "center" },
          //{ label: "修改时间", prop: "NODENAME", align: "center" },
          { label: "当前环节", prop: "curNodeName", align: "center" },
          { label: "当前处理人", prop: "curUser", align: "center" },
          { label: "办理时间", prop: "completeTime", align: "center",
          formatter(row){
           return row.completeTime = dateFormate.date(Date.parse(new Date(row.completeTime)),'YYYY-MM-DD HH:mm:ss');
          }
           },
          // { label: "状态", prop: "NODENAME", align: "center",formatter(row){
          //     if(row.NODEID == 800){text='完成协办'}else{'正在协办'}
          // }},
          ],
      ixHaxQzbj:0,
    };
  },
  mixins: [minixs,viewDraft],
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
    async processScheduling() {
      this.dialogTit = "流程调度";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "dosend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
      this.loadingTree = true;
      this.showCompDialog();
      setTimeout(()=>{
        this.$post
        .postData(
          "getAllNodeInfo",
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
              this.treeData = res.data&&res.data.data||[];
              this.defaultUser = res.data&&res.data.defaultUser||{};
            })
            .catch(e => {
            });
        });
      },500)
    },
    async maintenance(){
        let data = Object.assign(this.fromdata,{
          id: this.$route.query.id,
          title: '中国建设银行专项督查办承办单'
        })
        let obj1=await this.$post.postData(
            "getSysSupervise",
            JSON.stringify(Object.assign(data,{function :"getSysSupervise",superviseDirect: '3',manager:'',unitId:this.bank_dispach.unitId})),this.$businessCode.zxdb
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        let obj2=await this.$post.postData(
            "selectSysSuperviseOpinion",
            JSON.stringify(Object.assign(data,{function :"selectSysSuperviseOpinion",superviseDirect: '3',manager:'',unitId:this.bank_dispach.unitId})),this.$businessCode.zxdb
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        let obj3=await this.$post.postData(
            "selectSysSuperviseFile",
            JSON.stringify(Object.assign(data,{function :"selectSysSuperviseFile",superviseDirect: '3',manager:'',unitId:this.bank_dispach.unitId})),this.$businessCode.zxdb
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        // if(obj1&&obj2){ this.bank_dispach.unitId = this.$route.query.unitId ? this.$route.query.unitId:"";
          const routeData = this.$router.resolve({
              path: "/maintainFilesDB",
              query: {
                id: this.$route.query.id,
                type:'db',
                sign: '3',
                selectUrl: 'selUndertakeById',
                title:this.fromdata.title,
                unitId:this.$route.query.unitId||'',
                superviseDeptId:this.fromdata.superviseDeptId||this.fromdata.superviseOrgId,
              }
            });
          sessionStorage.setItem("fileObj",JSON.stringify(obj1))
          sessionStorage.setItem("suggessObj",JSON.stringify(obj2))
           sessionStorage.setItem("attachObj",JSON.stringify(obj3))
          window.open(routeData.href, "_blank");
        // }
    },
    buttonClick(params){
        switch(params){
            case "btn_bc":
                this.preserve('save');
                break;
            case "btn_wcbfs":
                this.completeSending();
                break;
            case "btn_cxgz":
                this.chixugenzong();
                break;
            case "btn_fkdbd":
                this.doFinishByUndertake();
                break;
            case "btn_cy":
              if(this.fromdata.isHasCY == 1){
                this.getTreeData('cy',1);
              }else{
                this.getTreeData('cy');
              }
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
                this.instructions();
                break;

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
              duration: 1500,
            });
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
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
          underTakeUser: [{required: this.requiredFields.underTakeUser,trigger: "change",message: "请输入承办人"}],
          underTakePhone: [{required: this.requiredFields.underTakePhone,trigger: "change",message: "请输入联系电话"}],
          opinionDbOrg: [{required: this.requiredIdeaFields.opinionDbOrg, message: '不能为空', trigger: 'blur'}],
          opinionSuperviseUndertake: [{required: this.requiredIdeaFields.opinionSuperviseUndertake, message: '不能为空', trigger: 'blur'}],
          undertakeOpnion: [{required: this.requiredIdeaFields.undertakeOpnion, message: '不能为空', trigger: 'blur'}],
        }
      })
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      })
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
      }
      this.clearCheckData(clearName);
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
            this.loadingTree = false;
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
          that.treeData = (res && res.data) || [];
          if (that.treeData.length) {
            that.treeData.forEach(item => {
              item.content = JSON.parse(item.content);
              if (that.dialogType === "hui") {
                item.text = item.typeName;
              }
            });
          }
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
           if(this.addSendType == 1) {
            this.xieCheckData.map((item)=>{
              //已选中协办 不可操作
              item.disabled = true;
            })
          }
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
          this.checkData = this.chenCheckData;
          // if (this.dialogTypeBack) {
          //   this.checkData = [];
          //   this.checkIds = [];
          // }
          break;
        case "xie":
          
          this.checkIds = this.fromdata.assistId
            ? this.fromdata.assistId.split(";")
            : [];
          this.checkData = this.xieCheckData;
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
                item.hideType = true;
              });
            }
            this.checkData = this.cyCheckData;
            break;
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
        // //确定保存时
        // let names = [];
        // let ids = [];
        // that.checkIds = [];
        //确定保存时
        let names = [];
        let ids = [];
        let newIds = [];
        let oldIds = 0;
        let oldNames = [];
        let newNames = [];
        that.checkIds = [];
        // if (data.length) {
        //   this.checkData = [].concat(data);
        //   data.map(item => {
        //     names.push(item.name || item.text);
        //     ids.push(item.id);
        //     that.checkIds.push(item.id);
        //   });
        //   names = names.join(";");
        //   this.transIds = ids = ids.join(";");
        // } else {
        //   names = "";
        //   ids = "";
        //   that.checkIds = [];
        // }

        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          if (this.addSendType === "1") {
            if(this.dialogTypeZF == 'chen'){
              oldIds = this.fromdata.assistId.split(";")
              oldNames = this.fromdata.assistName.split(";")
            }else if(this.dialogTypeZF == 'xie'){
              oldIds = this.fromdata.circulatePersonIds.split(";")
              oldNames = this.fromdata.circulatePersonNames.split(";")
            }
            newIds = ids.filter(item => {
              return oldIds.indexOf(item) == -1;
            });
            newNames = names.filter(item => {
              return oldNames.indexOf(item) == -1;
            });
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
        // if(dtype == 'hui'){
        //   for(i in ids){
        //     if(ids[i] === this.fromdata.undertakeOrg){
        //       this.$message({
        //         message:'协办单位不可与承办单位相同,请重新选择协办单位',
        //         type:'error'
        //       });
        //       return
        //     }
        //   }
        // }

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
            // if (
            //   this.fromdata.curNodeName === "督办综合处理" &&
            //   this.fromdata.assistName
            // ) {
            //   this.showHQ = true;
            // }
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
    //选择人员后 确定完成并发送
    saveSending() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseCirculateList;
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.opinionAssistFinishList;
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionDbOrgList;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.superviseRemarkList;
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
              onClose: () => {
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
        documentTitle:this.fromdata.title,  //正文标题
        manager:'1',
        unitId:this.$route.query.unitId,
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
    //点击 完成并发送 弹窗弹出
    completeSending() {
      // let judge = true;
      // judge = this.saveCheck();
      // if (!judge) {
      //   return;
      // }
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
              this.treeData = res.data;
            })
            .catch(e => {
            });
        });
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
      this.$post
        .postData(
          "selUndertakeById",
          JSON.stringify(this.bank_dispach),
          this.baoWenZiDuan
        )
        .then(res => {
          that.fromdata = Object.assign(that.fromdata,res.data);
          if(this.fromdata.registDate){
            this.fromdata.registDate = this.fromdata.registDate.slice(0,10)
          }
          if (res.data.secretType) {
            this.secretTypechange(res.data.secretType, true);
          }
          if (res.data.security) {
            this.workSecurityTab(res.data.secretLimitType, true);
          }
          // if(this.readFlag != 1){
          //   this.$post
          //     .postData(
          //       "doUpdateReadRecord",
          //       JSON.stringify({
          //         function:"doUpdateReadRecord",
          //         pcsAvyId:res.data.pcsAvyId,
          //         processInstId:res.data.processInstId,
          //         multiTenancyId:res.data.multiTenancyId
          //         }),
          //       this.$businessCode.zxdbgg
          //     ).then(res => {
          //       //更新状态用。暂时不用任何操作
          //       if(res&&res.success){
          //         window.opener.location.reload();
          //       }
          //     })
          //   }
          //承办意见处理
          // if(this.isUndertakeOverpl == ''){
          //   this.isUndertakeOverpl = res.data.isUndertakeOver;
          // }
          //已上传的文件
          this.uploadConfig.filesHas = this.fromdata.attchmentFileInfo;
          this.uploadConfig1.filesHas = this.fromdata.underTakeAttchmentFileInfo;
          for(let i in this.fromdata.feedbackAttachmentMap){
              let k = 0;
              this.fkfj.push(i)
              this.fkfjList.push(this.fromdata.feedbackAttachmentMap[i])
            }
          this.fromdata.attachSort = [];
          this.createSighWf.deptIds = res.data.assistId;
          this.createSighWf.deptNames = res.data.assistName;
          if (res.data.assistId!='') {
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
            );}
          if (res.data.circulatePersonNames) {
            this.cyCheckData = this.concatTreeData(
              res.data.circulatePersonIds,
              res.data.circulatePersonNames
            );
          }
          this.createSighWf.processInstId = res.data.processInstId;
          this.createSighWf.id = this.bank_dispach.id;
          this.createSighWf.multiTenancyId = res.data.multiTenancyId;
          this.createSighWf.pcsAvyId = res.data.pcsAvyId;
          this.createSighWf.tplNo = res.data.tplNo;
          this.createSighWf.curNodeCode = res.data.curNodeCode;
          // this.createSighWf.sequenceSign = this.saveOrUpdateToQianbaoEntity.sequenceSign = this.setradio =
          //   res.data.sequenceSign || "0";

          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_selectConfig.pTplNo = res.data.pTplNo;
          this.bank_send.curTplNo = this.bank_selectConfig.tplNo = res.data.pTplNo;
          this.bank_send.curMultiTenancyId = this.bank_selectConfig.multiTenancyId = res.data.multiTenancyId;
          this.fromdata.superviseRemarkList =res.data.superviseRemarkList||[];
          //收回测试
            // this.$post
            // .postData(
            //   "checkTakeBack",
            //   JSON.stringify({function:"checkTakeBack",processInstId:this.fromdata.processInstId}),
            //   this.$businessCode.zxdbgg
            // )
            // .then(res => {
            //   this.allowBack = res.allowBack;
            // });
            if(this.isPL == 1){
              this.isUndertakeOverpl = this.isUndertakeOverpl
            }else{
              this.isUndertakeOverpl = res.data.isUndertakeOver
            }
          //临时意见处理
          // this.cuteData("orgLeaderOpinion", "opinionSuperviseOrgList", "orgLeaderOpinionId");
          // this.cuteData("deptOpinion", "opinionSuperviseDeptList", "deptOpinionId");
          // this.cuteData("projectBaseOpinion", "opinionSuperviseBaseList", "projectBaseOpinionId");
          // this.cuteData("superviseFinishOpinion", "superviseFinishOpinion", "superviseFinishOpinionId");
          // this.cuteData("setUpInfo", "opinionSuperviseSetupList", "setUpInfoId");
          // this.cuteData("superviseRemark", "superviseRemarkList", "superviseRemarkId");
        })
        .catch(erro => {
        });
    },
   
    // 保存
    preserve(type) {
      this.bank_dispach.id = sessionStorage.getItem("pageidDBCB") || "";
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseCirculateList;
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionAssistFinishList;
      delete parseList.opinionSuperviseOrgList;
      if(parseList.opinionDbOrgList&&this.isUndertakeOverpl != 2){
        delete parseList.opinionDbOrgList;
      }
      delete parseList.opinionSuperviseBaseList;
      delete parseList.superviseRemarkList;
      var obj = Object.assign(this.bank_addToSendOrder, parseList);
      this.$post
        .postData("doUpdateByUndertake", JSON.stringify(obj), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
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
              this.toEdit();
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

    // 起草正文
    drafting() {
      
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
            id:this.fromdata.id,
            manager:'',
            unitId:this.$route.query.unitId,
            type:'gly'
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 操作指南
    instructions() {
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
              if(new Date(this.fromdata.opinionSuperviseUndertakeList[this.fromdata.opinionSuperviseUndertakeList.length-1].createTime)
              >new Date(this.fromdata.opinionDbOrgList[this.fromdata.opinionDbOrgList.length-1].createTime)
              )
            {
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
      if(this.fromdata.underTakeUser==""||this.fromdata.underTakePhone==""||
      this.fromdata.underTakeWx==""){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请完善承办单位办理情况信息",
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
      })
        .then(() => {
             let bank_do = {
        function: "doFinishByUndertake"
      };
      var obj = Object.assign(bank_do, this.fromdata);
      delete obj.opinionSuperviseCirculateList;
      delete obj.opinionSuperviseUndertakeList;
      delete obj.opinionSuperviseSetupList;
      delete obj.opinionSuperviseFinishList;
      delete obj.superviseRemarkList;
      delete obj.opinionSuperviseOrgList;
      delete obj.opinionSuperviseDeptList;
      delete obj.opinionSuperviseBaseList;
      delete obj.feedbackAttachmentMap;
      delete obj.underTakeAttchmentFileInfo;
      delete obj.attchmentFileInfo;
      delete obj.opinionAssistFinishList;
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
              window.close();
            },1500)
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: err.eassage,
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
    bankmain(n, state) {
      let name = "";
      switch (n) {
        
        case "hui":
          name = "协办";
          break;
        
      }
      this.dialogTit = name;
      this.canTab = true;
      this.treeData = [];
      this.dialogType = n;
      if (n === "hui") {
        this.hasRadio = false;
        this.canTab = false;
        this.singelCheckF = false;
        this.dialogTypeNow = "zengfa";
      }
      this.addSendType = state;
      this.showCompDialog();
      // if(this.fromdata.curNodeCode==="002" && this.fromdata.assistName !=='') {
      //   this.sendXbSuccess = true
      // }
      if (n === "hui") {
        this.$post
          .postData(
            "unitTreeByFirst",
            JSON.stringify(this.bank_main),
            this.treeJyx
          )
          .then(res => {
            this.treeData = (res && res.data) || [];
          });
      } 
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    // 协办单位
    handleSendHQPtmt(newIds, newNames, oldIds, oldNames) {
      this.bank_dispach.id = this.$route.query.id
        ? this.$route.query.id
        : sessionStorage.getItem("pageidDBCB") || "";
      // var obj = Object.assign(this.createSighWf, this.fromdata);
      var obj = Object.assign(this.createSighWf);

      this.createSighWf.deptIds = this.fromdata.assistId;
      this.createSighWf.deptNames = this.fromdata.assistName;

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
      
      this.shdialog = true;
      this.typeofHQBM = type;
      let fun = type == "qzbj"?'selAssistListByBj':'selAssistList';
      const parms = {
        function: fun,
        processInstId: this.fromdata.processInstId,
        multiTenancyId: this.fromdata.multiTenancyId,
        id:this.bank_dispach.id
      };
      
      if (type == "shouhui") {
        this.dialoghuiqianTit = "选择需要收回的协办单位";
      } else if(type == "cuiban"){
        this.dialoghuiqianTit = "选择需要催办的协办单位";
      }else if(type == "qzbj"){
        this.dialoghuiqianTit = "选择需要强制办结的协办单位";
        parms.parentId = this.fromdata.parentId
      }

      
      this.$post
        .postData(fun, JSON.stringify(parms), this.baoWenZiDuan)
        .then(res => {
          if (res && res.success) {
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
      let checkboxdataids = this.checkedshid.join(";");
      let checkboxdata = this.checkedsh.join(";");
      let dqdata = this.checkeddq.join(";");
      let ids = this.checkedids.join(';');
      if (this.typeofHQBM === "shouhui") {
        let shform = {
          function: "takeBackXb",
          // pcsAvyId: this.fromdata.pcsAvyId,
          // multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: checkboxdata,
          subProcessInstId: dqdata,
          id: this.bank_dispach.id,
          ids:ids,
          takeBackDeptIds:checkboxdataids
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
      } else if (this.typeofHQBM == "cuiban") {
        this.$message({
          type: "success",
          showClose: true,
          offset: 400,
          message: "催办成功",
          duration: 1500
        });
        this.ixHaxQzbj = 1;
        this.shdialog = false;
        // let parms = {
        //   function: "urgeHandle",
        //   subProcessInstId: dqdata,
        //   multiTenancyId: this.fromdata.multiTenancyId
        // };
        // this.$post
        //   .postData("urgeHandle", JSON.stringify(parms), this.zxdb)
        //   .then(res => {
        //     if (res.success) {
        //       this.$message({
        //         type: "success",
        //         showClose: true,
        //         offset: 400,
        //         message: "催办成功",
        //         duration: 1000
        //       });
        //     } else {
        //       this.$message({
        //         type: "error",
        //         offset: 400,
        //         showClose: true,
        //         message: res.message,
        //         duration: 1000
        //       });
        //       return;
        //     }
        //     this.shdialog = false;
        //   });
      } else if(this.typeofHQBM == "qzbj"){
        let shform = {
          function: "doAssistFinishByQZ",
          // pcsAvyId: this.fromdata.pcsAvyId,
          // multiTenancyId: this.fromdata.multiTenancyId,
          takeBackDeptNames: checkboxdata,
          subProcessInstId: dqdata,
          id: this.bank_dispach.id,
          ids:ids,
          takeBackDeptIds:checkboxdataids
        };
        this.$post
          .postData("doAssistFinishByQZ", JSON.stringify(shform), this.baoWenZiDuan)
          .then(res => {
            if (res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "强制办结成功",
                duration: 1500
              });
              this.toEdit();
              this.$forceUpdate();
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
        this.shdialog = false;
        this.toEdit();
      }
    },
    checkouthuiqian(item) {
      this.checkeddq = [];
      this.checkedids=[];
      let transItem = this.shData.filter(item => {
        let num = this.checkedsh.indexOf(item.assistOrgName) > -1;
        
        if (num) {
          this.checkeddq.push(item.processInstId);
          this.checkedids.push(item.id);
          this.checkedshid.push(item.assistOrgId);
        }
        return num;
      });
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
                location.href =
                (this.$post.getEnvState()?location.origin:"http://localhost:8080")+"/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName;
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
    this.uploadConfig1.code = this.$businessCode.zxdbfj;
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.bank_dispach.unitId = this.$route.query.unitId ? this.$route.query.unitId:"";
    this.isPL = this.$route.query.isPL ? this.$route.query.isPL:"";
    this.treeTradeCode = this.$businessCode.zxdbgg;
    //this.getSendOrderDicByParam();
    this.isUndertakeOverpl = this.$route.query.isUndertakeOverpl ? this.$route.query.isUndertakeOverpl: "";
    this.toEdit();
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
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
