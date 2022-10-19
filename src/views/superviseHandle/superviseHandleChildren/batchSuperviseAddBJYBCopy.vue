<template>
  <div id="batchSuperviseAddCopy" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>管理员查看批量督办
        </p>
        <div class="grid_comtent">
            <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
            <el-button size="small" plain @click="maintenance">维护</el-button>
            <el-button size="small" plain 
            v-show="bank_selectConfig.curNodeId != '800'" 
            @click="processScheduling">流程调度</el-button>
            <el-button size="small" plain @click="flowScheme">查看流程</el-button>
            <el-button size="small" plain @click="processSheet('/batchcld')">打印处理单</el-button>
            <el-button size="small" plain @click="shoucang">收藏</el-button>
        </div>
      </el-col>
    </el-row>
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
    <timeDialog :tableData="lctableData" ref="dialogLine" v-if="timeShow"></timeDialog>
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
            :model="fromdata"
            :rules="rules"
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
                    <el-select disabled v-model="fromdata.projectBase" placeholder="请选择" style="width:100%">
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
                      disabled
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
                      v-model="fromdata.superviseCode"
                      placeholder="请选择"
                      disabled
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
                  <el-button  plain disabled type="info">{{fromdata.doucumentNum}}号</el-button>
                </el-col>
                <el-col v-if="donum" :span="8" >
                  <el-form-item label="编号" prop="pTplNo" ref="pTplNo">
                    <el-input v-model="fromdata.doucumentNum" plain  disabled type="info">{{fromdata.doucumentNum}}</el-input>
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
                    <el-input v-model="fromdata.contactPhone" disabled oninput="value=value.replace(/[^\-\,\d\*\ ]/g,'')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="督办依据" prop="superviseBasis" ref="superviseBasis">
                    <el-input v-model="fromdata.superviseBasis" disabled>
                      
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
                <el-col :span="24">
                  <el-form-item label="标题" prop="summary" ref="summary">
                    <el-input v-model="fromdata.summary" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="批量督办事项" prop="type" ref="type">
                    <template>
                      <el-button disabled @click="add">增加</el-button>
                      <!-- <el-button @click="info" :disabled="readFields.info">导入</el-button> -->
                      <el-button @click="plsh" disabled v-if="fromdata.batchStatus == 1">批量收回</el-button>
                      <el-col>{{message}}</el-col>
                      <m-table
                        size="medium"
                        :isIndex="true"
                        :isPagination="true"
                        :isSelection='true'
                        @select="select"
                        :isDB="true"
                        :isHandle="false"
                        @handleCurrentChange="handleCurrentChange"
                        @handleSizeChange="handleSizeChange"
                        :tableData="tableData"
                        :tableCols="tableCols"
                        :pagination="pagination"
                        @cellClick="cellClick"
                        v-loading="tableLoading"
                        :default-sort="sortDate"
                      ></m-table>
                    </template>
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
                    <template>
                      <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        maxlength="500"
                        autosize
                        v-if="(fromdata.opinionSuperviseOrgList&&fromdata.opinionSuperviseOrgList.length == 0)||!fromdata.opinionSuperviseOrgList"
                        v-model="fromdata.orgLeaderOpinion"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseOrgList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :canDelet="false"
                      :curNodeCode="fromdata.curNodeCode"
                    ></opinionText>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="立项审批意见">
                    <template>
                      <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        v-if="(fromdata.opinionSuperviseDeptList&&fromdata.opinionSuperviseDeptList.length == 0)||!fromdata.opinionSuperviseDeptList"
                        maxlength="500"
                        autosize
                        v-model="fromdata.deptOpinion"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseDeptList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="false"
                    ></opinionText>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="审核意见">
                    <template>
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        v-if="(fromdata.opinionSuperviseBaseList&&fromdata.opinionSuperviseBaseList.length == 0)||!fromdata.opinionSuperviseBaseList"
                        maxlength="500"
                        autosize
                        v-model="fromdata.projectBaseOpinion"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                      :opinionText="fromdata.opinionSuperviseBaseList" 
                      :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                      :nowUserId="nowUserId"
                      @deletService="deletService"
                      :curNodeCode="fromdata.curNodeCode"
                      :canDelet="false"
                    ></opinionText>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="结项审批"
                    prop="opinionSuperviseFinishList"
                    ref="opinionSuperviseFinishList"
                  >
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        v-if="(fromdata.opinionSuperviseFinishList&&fromdata.opinionSuperviseFinishList.length == 0)||!fromdata.opinionSuperviseFinishList"
                        maxlength="500"
                        autosize
                        v-model="fromdata.superviseFinishOpinion"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                        :opinionText="fromdata.opinionSuperviseFinishList" 
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
                        @deletService="deletService"
                        :curNodeCode="fromdata.curNodeCode"
                        :canDelet="false"
                      ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="批量督办办结情况" prop="setUpInfo" ref="setUpInfo">
                    <div class="fix_height">
                      <el-input
                        type="textarea"
                        style="flex:1"
                        resize="none"
                        v-if="(fromdata.opinionSuperviseSetupList&&fromdata.opinionSuperviseSetupList.length == 0)||!fromdata.opinionSuperviseSetupList"
                        maxlength="500"
                        autosize
                        v-model="fromdata.finishDetail"
                        disabled
                      ></el-input>
                    </div>
                    <opinionText 
                        :opinionText="fromdata.opinionSuperviseSetupList" 
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
                        @deletService="deletService"
                        :curNodeCode="fromdata.curNodeCode"
                        :canDelet="false"
                      ></opinionText>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="备注">
                    <template>
                      <el-input type="textarea"
                        resize="none"
                        maxlength="500"
                        v-if="(fromdata.superviseRemarkList&&fromdata.superviseRemarkList.length == 0)||!fromdata.superviseRemarkList"
                        autosize v-model="fromdata.remarks" 
                        disabled
                      ></el-input>
                      <opinionText 
                        :opinionText="fromdata.superviseRemarkList" 
                        :sendOpinionMaxTime="fromdata.sendOpinionMaxTime"
                        :nowUserId="nowUserId"
                        :curNodeCode="fromdata.curNodeCode"
                        @deletService="deletService"
                        :isRemarks="true"
                        :canDelet="false"
                      ></opinionText>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
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
                  <el-scrollbar>
                    <div v-for="item1 in fkfjList[n]" :key="item1.id" class="tree_w">  
                      <template>
                        <div class="command_wrap">
                          <span class="name down" :title="item.fileName" @click="viewDraftFile(item1.fileName,item1.filePath ,$businessCode.zxdbfj)">{{item1.fileName}}</span>
                          <span class="name">{{item1.createrName}}</span>
                          <span class="name">{{item1.createTime}}</span>
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
    <el-dialog width="30%" title="批量督办事项单" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" class="demo_ruleForm" :disabled="cellcol">
        <el-row>
          <el-form-item label="办理期限" prop="expireDate">
            <el-col :span="12" class="allwidth">
              <el-input v-model="ruleForm.expireDate" type="num" min="0"
              oninput="value=value.replace(/[^\d\*\ ]/g,'')">
                <el-button slot="append">
                  {{handleTime}}
                </el-button>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="事由提要" prop="summary" ref="summary">
            <el-col :span="12" class="allwidth">
              <el-input v-model="ruleForm.summary"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="详情描述" prop="detailDescription" ref="detailDescription">
            <el-col :span="12" class="allwidth">
              <el-input v-model="ruleForm.detailDescription"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="是否跨行" prop="isOrg" ref="isOrg">
            <el-radio-group v-model="ruleForm.isOrg">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="承办单位" prop="undertakeOrganName" ref="undertakeOrganName">
            <el-col :span="12" class="allwidth">
              <el-input
                v-model="ruleForm.undertakeOrganName"
                placeholder="请选择承办单位"
                readonly
                style="width: 100%;"
              >
                <el-button slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="协办单位" prop="assistOrganName" ref="assistOrganName">
            <el-col :span="12" class="allwidth" >
              <el-input
                v-model="ruleForm.assistOrganName"
                readonly  
                placeholder="请选择协办单位"
                style="width: 100%;"
              >
                <el-button slot="append" @click="getTreeData('xie')" icon="el-icon-plus"></el-button>
              </el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btnbox">
        <el-button v-if="btn&&editflag" @click="handleEdit">保存</el-button>
        <el-button v-if="!btn&&editflag" @click="handleAddData">添加</el-button>
        <el-button v-if="editflag" @click="close">取消</el-button>
      </div>
    </el-dialog>
    <treeCopy
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
import treeCopy from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
import secretBasls from "@/components/secretBasls/secretBasls";
import mTable from "components/table/mTable.vue";
import appendWriteList from "@/components/appendWriteList/appendWriteList";
import uploadFiles from "@/components/uploadFile/uploadFile";
import minixs from "@/minixs/index";
import opinionText from "@/components/opinionText/index";
import viewDraft from "@/minixs/viewDraft";

export default {
  name: "App",
  components: {
    mTable,
    timeDialog,
    treeCopy,
    secretBasls,
    appendWriteList,
    uploadFiles,
    opinionText
  },
  data() {
    return {
      defaultUser:{},//完成并发送默认值
      treeTradeCode:"",
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
      tableCols: [
        { label: "事由提要", prop: "summary", align: "center" },
        { label: "详情描述", prop: "detailDescription", align: "center" },
        { label: "承办单位", prop: "undertakeOrganName", align: "center" },
        { label: "协办单位", prop: "assistOrganName", align: "center" },
        {
          label: "查看流程",
          prop: "isUndertakeOver",
          align: "center",
          color:"blue",
          formatter(row){
            return (row.isUndertakeOver ==1 || row.isUndertakeOver ==0) ? "未反馈": (row.isUndertakeOver ==2? "已反馈":(row.isUndertakeOver ==3? "已收回":"持续跟踪"))
          }
        }
      ],
      
      btn: false,
      editflag: true,
      cellcol: false,
      message: "",
      count: "",
      doing: "",
      ending: "",
      tableData: [],
      lctableData: [],
      tableLoading: false,
      dialogFormVisible: false,
      loadingTree:false,
      pagination: {
        pageNum: 1,
        totalCount: 10,
        limit: 10
      },
      ruleForm: {
        expireDate: "",
        summary: "", //事由提要
        detailDescription: "", //详情描述
        isOrg: "1",
        undertakeOrganName: "",
        assistOrganId: "",
        assistOrganName: "",
        undertakeOrganId: ""
      },
      sortDate: [{ prot: "date", order: "descnding" }],
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
      //秘密期限类型
      flag: true,
      // 秘密标志
      secretflag: true,
      secretTypeflag: false,
      // 定密依弹窗
      secretDialog: true,
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
        tplNo: "",
        mananger:'',
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
      //弹窗下拉框
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
        function: "selectBatchById",
        id: this.$route.query.id,
        manager:'',
        unitId:this.$route.query.unitId,
        // id: "1"
      },
      //下拉框列表
      bank_dispachfile: {
        function: "selConfigByParam",
        organizationId: ""
      },
      //保存
      bank_addToSendOrder: {
        function: "doStartWfe",
        id: "",
        multiTenancyId: "CN017",
        nextNodeName: "", //下一环节的名字
        nextUserName: "" //部门人员名字
      },
      //删除 单条意见
      bank_deletToSendOrder: {
        function: "doDeletesendOrderOpinion",
        id: ""
      },
      //承办部门树
      bank_main: {
        function: "unitTreeByFirst",
        flag: false
      },
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      undertakeOrgData: [],
      assistDeptData: [],
      cbdwList: [], //督办依据添加
      fromdata: {
        manager:'',
        unitId:this.$route.query.unitId,
        underTakeAttchmentFileInfo:"",
        feedbackAttachmentMap:"",
        attachSort:[],
        attchmentFileInfo:[],
        draftDepartment: "", //拟稿部门
        draftDepartmentId: "", //拟稿部门id
        draftOrgan: "", //拟稿单位
        draftOrganId: "", //拟稿单位id
        draftUser: "", //拟稿人
        draftUserId: "", //拟稿人id
        finishDate: "", //完成时间
        pressingLevel: "", //紧急程度
        projectBase: "", //立项依据
        registDate: "", //登记日期
        summary: "", //事由提要
        superviseBasis: "", //督办依据
        superviseCode: "", //督办代子
        superviseDeptId: "", //督办部门id
        superviseDeptName: "", //督办部门
        title: "", //文件标题
        workflowId: "", //流程id
        curNodeName: "", //当前环节
        tempId: "", //对应批量单项单的临时表单
        security: "", //密级
        secretLimitType: "", //密级类型
        secretLevel: "", //密级等级
        secretLevelName: "", //密级等级名称
        secretLimit: "", //密级期限类型
        secretLimitName: "", //密级期限类型名称
        secretType: "", //秘密类型
        secretTypeName: "", //秘密类型名称
        secretTimeType: "", //密级时间类型
        contact: "", //联系人
        contactPhone: "", //联系电话
        processInstId: "", //流程实例标识process_inst_id
        pTplNo: "", //模板编号p_tpl_no
        multiTenancyId: "", //多实体标识multi_tenancy_id
        pcsAvyId: "", //流程活动标示id
        curNodeCode: "", //当前环节code
        curNodeName: "", //当前环节code
        curUser: "", //当前环节code
        doucumentNum: "", //编号
        batchStatus:'',
        superviseRemarkList: "", //备注
        opinionSuperviseBaseList: [], //审核意见
        opinionSuperviseDeptList: [], //立项审批意见
        opinionSuperviseOrgList: [], //行领导批示
        opinionSuperviseFinishList: [], //结项审批
        opinionSuperviseSetupList: [], //办结情况
        remarks: "",
        finishDetail: "",
        projectBaseOpinio: "", // 审核意见
        deptOpinion: "", // 立项审批意见
        orgLeaderOpinion: "", // 行领导批示
        superviseRemark: "", // 督办单备注
        setUpInfo: "", //办结情况
        superviseFinishOpinion: "", // 结项审批意见
        remarks: "",
        finishDetail: "" //办结情况
			},
			readFlag:"",
      rulesDialog:{},
      projectBaseList: [],
      SredHead: [],
      SemergencyLevel: [],
      SsecretType: [],
      SsecretTimeType: [],
      SsecretFlagType: [],
      SsecretFlagContent: [],
      SsignDepartment: [],
      Smain: [],
      Scopy: [],
      Sinline: [],
      SworkSecretFlag: [],
      rules:{
        },
      imageUrl: "",
      fileList: [],
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
      handleTime: "", //工作日、自然日
      superviseId: "" ,//判断是否发送办理单位
      state:'',//判断是否为已办单
      numflag:false,//生成编号弹框显隐标示
      donum:false,//编号宽度
      numForm:{},
      plshList:[],
       //控制03
      huanJieMessage:{},
    	allowBack:"",
      buttonList: [
        {name: '保存', type: 'btn_bc', show: false},
        {name: "完成并发送", type: "btn_wcbfs", show: false},
        {name: "生成编号", type: "btn_scbh", show: false}, 
        {name: "删除此文", type: "btn_sccw", show: false}, 
        {name: "结项", type: "btn_finish", show: false}, 
        {name: "退回", type: "btn_th", show: false},
        {name: "发送办理单位", type: "btn_fsbldw", show: false}, 
        {name: "返回上一处理人", type: "btn_fhsyclr", show: false},
        {name: "查看流程", type: "btn_cklc", show: false}, 
        {name: "打印处理单", type: "btn_dycld", show: false}, 
        {name: "操作指南", type: "btn_czzn", show: false}, 
      ],
      // 生成文号/退号/生成上年文号
      doSaveDocumentNumFuc: {
        function: "doSaveDocumentNum",
        redHead: "",
        num: "",
        isBatch:true,
      },
      deleteThis:false,
      DocNoDataList: [],
        SetDocNoVisible: false,
        setDocFlag:"",
        setDocNum: "",
        num:"",
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
      if(this.fromdata.batchStatus == 1){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "存在承办部门未办结，无法进行完成并发送",
          duration: 1000
        });
        return
      }
      this.dialogTit = "流程调度";
      this.offenUse = true;
      this.canTab = false;
      this.treeData = [];
      this.dialogTypeNow = "dosend";
      this.dialogType = "dosend";
      this.dialogTypeBack = true;
      this.singelCheckF = true; // 单选true 多选为false
      this.hasRadio = false;
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
                this.bank_doSend.pcsAvyId = this.bank_send.pcsAvyId;
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
          title: this.fromdata.title,
          manager:'',
          unitId:this.$route.query.unitId,
        })
        let obj1=await this.$post.postData(
            "getSysSupervise",
            JSON.stringify(Object.assign(data,{function :"getSysSupervise",superviseDirect: '2'})),this.$businessCode.zxdb
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        let obj2=await this.$post.postData(
            "selectSysSuperviseOpinion",
            JSON.stringify(Object.assign(data,{function :"selectSysSuperviseOpinion",superviseDirect: '2'})),this.$businessCode.zxdb
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        let obj3=await this.$post.postData(
            "selectSysSuperviseFile",
            JSON.stringify(Object.assign(data,{function :"selectSysSuperviseFile",superviseDirect: '2'})),this.$businessCode.zxdb
          ).then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
        });
        // if(obj1&&obj2){
          const routeData = this.$router.resolve({
              path: "/maintainFilesDB",
              query: {
                id: this.$route.query.id,
                type:'db',
                sign: '2',
                selectUrl: 'selectBatchById',
                title:this.fromdata.title,
                manager:'',
                unitId:this.$route.query.unitId,
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
            case "btn_th":
                this.tuihui();
                break;
            case "btn_fsbldw":
                this.doSendTmp();
                break;
            case "btn_scbh":
                this.createNum();
                break;
            case "btn_sccw":
                this.deleteThisClick();
                break;
            case "btn_finish":
                this.doFinish();
                break;
            case "btn_cklc":
                this.flowScheme();
                break;
            case "btn_fhsyclr":
                this.fanhuishangyiclr();
                break;
            case "btn_dycld":
                this.processSheet('/batchcld');
                break;
            case "btn_czzn":
                this.instructions();
                break;

        }
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
     //设置控制域
		setConfig() {
      this.requiredFields = this.setRequiredIdeaFields(this.requiredFields, this.huanJieMessage.requiredFields)//必填控制
      this.readFields = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
      this.buttonList = this.showButton(this.buttonList, this.huanJieMessage.visibleButtons, this.huanJieMessage.visibleButtonsBycondition)//按钮
      this.requiredIdeaFields = this.setRequiredIdeaFields(this.requiredIdeaFields, this.huanJieMessage.requiredIdeaFields)//可编辑意见域
      if(this.fromdata.doucumentNum.length>7){
        for(let i in this.readFields){
          this.readFields[i] = true;
          this.readFields.add=true;
          this.readFields.info=true;
          this.tableCols=[
            { label: "事由提要", prop: "summary", align: "center" },
            { label: "详情描述", prop: "detailDescription", align: "center" },
            { label: "承办单位", prop: "undertakeOrganName", align: "center" },
            { label: "协办单位", prop: "assistOrganName", align: "center" },
            {
              label: "查看流程",
              prop: "isUndertakeOver",
              align: "center",
              color:"blue",
              formatter(row){
                return (row.isUndertakeOver ==1 || row.isUndertakeOver ==0) ? "未反馈": (row.isUndertakeOver ==2? "已反馈":(row.isUndertakeOver ==3? "已收回":"持续跟踪"))
              },
            }]
        }
      }
    },
    setFormConfig() {
     this.$nextTick(()=>{
       this.rules = {
          projectBase: [{required: this.requiredFields.projectBase,trigger: "change",message: "请选择立项依据"}],
          superviseCode: [{required: this.requiredFields.superviseCode,trigger: "change",message: "请选择编号"}],
          pressingLevel: [{required: this.requiredFields.pressingLevel,trigger: "change",message: "请选择紧急程度"}],
          expireDate: [{required: this.requiredFields.expireDate,trigger: "change",message: "请选择办理期限"}],
          contactPhone: [{required: this.requiredFields.contactPhone,trigger: "change",message: "请输入联系电话"}],
          superviseBasis: [{required: this.requiredFields.superviseBasis,trigger: "change",message: "请输入督办依据"}],
          summary: [{required: this.requiredFields.summary,trigger: "change",message: "请输入事由提要"}],
          detailDescription: [{required: this.requiredFields.detailDescription,trigger: "change",message: "请输入详细描述"}],
          undertakeOrgName: [{required: this.requiredFields.undertakeOrgName,trigger: "change",message: "请选择承办单位"}],
          assistDeptName: [{required: this.requiredFields.assistDeptName,trigger: "change",message: "请选择协办单位"}],
          title: [{required: this.requiredFields.title,trigger: "change",message: "请选择协办单位"}],
          
          orgLeaderOpinion: [{required: this.requiredIdeaFields.orgLeaderOpinion, message: '不能为空', trigger: 'blur'}],
          deptOpinion: [{required: this.requiredIdeaFields.deptOpinion, message: '不能为空', trigger: 'blur'}],
          projectBaseOpinion: [{required: this.requiredIdeaFields.projectBaseOpinion, message: '不能为空', trigger: 'blur'}],
          superviseFinishOpinion: [{required: this.requiredIdeaFields.superviseFinishOpinion, message: '不能为空', trigger: 'blur'}],
          setUpInfo: [{required: this.requiredIdeaFields.setUpInfo, message: '不能为空', trigger: 'blur'}],
          circulateOpinion: [{required: this.requiredIdeaFields.circulateOpinion, message: '不能为空', trigger: 'blur'}],
          superviseRemark: [{required: this.requiredIdeaFields.superviseRemark, message: '不能为空', trigger: 'blur'}],
        }
     })
     this.$forceUpdate();
     setTimeout(() => {
        this.$refs.fromdata.clearValidate();
      })
    },
    getDepFun(){},
    deleteThisClick(){this.deleteThis=true},
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
          this.preserve();
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
        multiTenancyId:this.bank_doSend.multiTenancyId,
        pcsAvyId:this.bank_doSend.pcsAvyId,
        tplNo:this.fromdata.pTplNo
      };

      let copyFrom = JSON.parse(JSON.stringify(this.fromdata))
      delete copyFrom.opinionSuperviseBaseList;
      delete copyFrom.opinionSuperviseDeptList;
      delete copyFrom.opinionSuperviseOrgList;
      delete copyFrom.superviseRemarkList;
      delete copyFrom.opinionSuperviseFinishList;
      delete copyFrom.opinionSuperviseSetupList;
      delete copyFrom.opinionSuperviseUndertakeList;
      delete copyFrom.opinionSuperviseCirculateList;
      delete copyFrom.attchmentFileInfo;
      delete copyFrom.underTakeAttchmentFileInfo;
      delete copyFrom.feedbackAttachmentMap;
      
      let params = Object.assign(copyFrom,obj);

      this.$post
        .postData("doFinish", JSON.stringify(params), this.treeJyx)
        .then(res => {
          if(res.success){
            this.$message({
              type:'success',
              message:'办结成功'
            })
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
             
          }
        }); 
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.pageNum = val;
      this.tableData = [];
      this.initData();
    },
    select(rows){
      this.plshList=[]
      for(let i=0;i<rows.length;i++){
        if(rows[i].isUndertakeOver!=3){
          this.plshList.push(rows[i].id)
        }
      }
    },
    selectAll(rows){
      console.log(rows)
    },
    plsh(){
      this.plshList = this.plshList.join(',')
      this.$post
        .postData(
          "doWithdrawReturnBatch",
          JSON.stringify({function:"doWithdrawReturnBatch",tempId:this.fromdata.tempId,ids:this.plshList}),
          this.$businessCode.zxdb
        )
        .then(res => {
          if(res&&res.success){
            this.plshList=[];
            this.$message({
              message:'批量收回成功',
              type:'success'
            })
            this.toEdit();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.bank_countersignature.limit = val;
      this.pagination.pageSize = val;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      if (column.label == "事由提要") {
        this.dialogFormVisible = true;
        this.cellcol = true;
        this.ruleForm = row;
        this.btn = false;
        this.editflag = false;
      }
      if (column.label == "查看流程") {
        // if (row.isUndertakeOver == 1||row.isUndertakeOver == 2 ) {
        //     const routeData = this.$router.resolve({
        //       path: "/undertakeDetail",
        //       query: {
        //         id: row.superviseId,
        //         isUndertakeOverpl:row.isUndertakeOver,
        //         isWH:1
        //       }
        //     });
        //     window.open(routeData.href, "_blank");
        //   } else {
        //     this.$message({
        //       message: "未反馈！",
        //       type: "error"
        //     });
        //   }
      }
      // const routeData = this.$router.resolve({
      //   path: "/bankDispach",
      //   query: {
      //     id: row.id
      //   }
      // });
      // window.open(routeData.href, "_blank");
    },
    detail(row) {
      this.dialogFormVisible = true;
      this.ruleForm = row;
      this.btn = true;
      this.cellcol = false;
      this.editflag = true;
      this.rulesDialog={
      expireDate: [{required: true,trigger: "change",message: "请选择办理期限"}],
      summary: [{required: true,trigger: "change",message: "请输入事由提要"}],
      isOrg: [{required: true,trigger: "change",message: "请选择是否跨行"}],
      undertakeOrganName: [{required:true,trigger: "change",message: "请选择承办单位"}],
    },
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.ruleForm.clearValidate();
      })
    },
    add() {
      this.ruleForm = {
          isOrg:'',
          expireDate:"",
          summary:"",
          undertakeOrganName:"",
      };
      
      this.dialogFormVisible = true;
      this.rulesDialog={
        expireDate: [{required: true,trigger: "change",message: "请选择办理期限"}],
        summary: [{required: true,trigger: "change",message: "请输入事由提要"}],
        isOrg: [{required: true,trigger: "change",message: "请选择是否跨行"}],
        undertakeOrganName: [{required:true,trigger: "change",message: "请选择承办单位"}],
      },
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.ruleForm.clearValidate();
      })
      this.btn = false;
      if (!this.bank_dispach.id) {
        this.preserve()
      } 
    },
    close() {
      this.dialogFormVisible = false;
    },
    //添加表单校验滚动
    scrollIntoFormRule() {
      let that = this;
      let result = true;
      this.$refs.ruleForm.validate((valid, object) => {
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
    handleAddData() {
      let judge = true;
      let that = this;
      judge = this.scrollIntoFormRule();
      if (!judge) {
        return;
      }
      this.cellcol = false
      var id = this.fromdata.id;
      var tempId = this.fromdata.tempId;
      var dem = {
        function: "saveTmp",
        pid: id,
        parentId: tempId
      };
      var obj = Object.assign(this.ruleForm, dem);
      if (id) {
        this.$post
          .postData("saveTmp", JSON.stringify(obj), this.baoWenZiDuan)
          .then(res => {
            that.fromdata.tempId = res.data;

            // debugger
            that.toEdit();
            that.dialogFormVisible = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
          })
          .catch(err => {
          });
      }
    },
    handleDel(row) {
      var that = this;
      var id = row.id;
      var tempId = row.parentId;
      var dem = {
        function: "deletTmp",
        id: id,
        tempId: tempId
      };
      this.$post
        .postData("deletTmp", JSON.stringify(dem), this.baoWenZiDuan)
        .then(res => {
          that.toEdit();
          that.dialogFormVisible = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(err => {
        });
    },
    handleEdit(row) {
      var that = this;
      var id = this.fromdata.id;
      var tempId = this.fromdata.tempId;
      var dem = {
        function: "editTmp",
        pid: id,
        parentId: tempId
      };
      var obj = Object.assign(this.ruleForm, dem);
      this.$post
        .postData("editTmp", JSON.stringify(obj), this.baoWenZiDuan)
        .then(res => {
          that.toEdit();
          that.dialogFormVisible = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(err => {
        });
    },
    collect() {
      let shiwutitle = '专项督办批量处理单'
      exportTable.getPdf(shiwutitle, this.fromdata.attchmentFileInfo, "batchSuperviseAdd")
    },
    info() {},
    //请求部门树数据
    getTreeData(n) {
      let name = "";
      let that = this;
      let fun = '';
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
          this.singelCheckF = true; //设置单选
          clearName = "undertakeOrganName";
          fun = 'getCurrUnitTreeTree';
          this.bank_main.function="getCurrUnitTreeTree"
          if(this.bank_main.flag){
            delete this.bank_main.flag
          }
          if(this.ruleForm.isOrg =='0'){
            this.bank_main.openSub = true 
            this.bank_main.openCurrFistDept = false //只显示独立机构
          }else if(this.ruleForm.isOrg =='1'){
            this.bank_main.openSub = false 
            this.bank_main.openCurrFistDept = true //只显示下属部门
          }else{
            this.bank_main.openSub = false 
            this.bank_main.openCurrFistDept = true //只显示下属部门
          }
          break;
        case "xie":
          name = "协办部门";
          clearName = "assistOrganName";
          fun = 'unitTreeByFirst';
          Object.assign(this.bank_main,{flag:false})
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          fun,
          JSON.stringify(this.bank_main),
          this.treeJyx
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.fromdata[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeOrganName") {
          this.ruleForm.undertakeOrganId = "";
          this.undertakeOrgData = [];
        }
        if (name === "assistOrganName") {
          this.fromdata.assistOrganId = "";
          this.assistDeptData = [];
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
          text: names[n]
        });
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
        this.secretflag = false;
        this.secretTypeflag = true;
        this.secretLimitType = "";
      } else {
        this.flag = false;
        this.secretflag = false;
        this.secretTypeflag = false;
      }
    },
    //处理回显秘密类型
    secretTypeBackvalue(value) {
      if (value == "商业秘密") {
        this.flag = true;
        this.secretflag = true;
        this.secretTypeflag = false;
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretflag = true;
        this.secretTypeflag = true;
      }
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
        case "chen":
          this.checkIds = this.ruleForm.undertakeOrganId
            ? this.ruleForm.undertakeOrganId.split(";")
            : [];
          this.checkData = this.undertakeOrgData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将协办选择人员 设置不可选
          if (this.assistDeptData.length) {
            newA = [].concat(this.assistDeptData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.undertakeOrgData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.fromdata.assistOrganId
              ? this.fromdata.assistOrganId.split(";")
              : []
          );
          break;
        case "xie":
          this.checkIds = this.ruleForm.assistOrganId
            ? this.ruleForm.assistOrganId.split(";")
            : [];
          this.checkData = this.assistDeptData.filter(item => {
            // item.disabled = false;
            item.hideType = false;
            return true;
          });
          //将承办选择人员 设置不可选
          if (this.undertakeOrgData.length) {
            newA = [].concat(this.undertakeOrgData);
            newA.map(item => {
              //选中的不可操作
              item.disabled = true;
              item.hideType = true;
            });
          }
          this.checkData = [].concat(this.assistDeptData, newA);
          this.checkIds = [].concat(
            this.checkIds,
            this.ruleForm.undertakeOrganId
              ? this.ruleForm.undertakeOrganId.split(";")
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
      // let judge = true;
      let that = this;
      // if (this.dialogType === "dosend") {
      //   judge = this.scrollIntoForm();
      // }
      // if (!judge) {
      //   return;
      // }
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
            this.ruleForm.undertakeOrganName = names;
            this.ruleForm.undertakeOrganId = ids;
            this.undertakeOrgData = this.checkData;
            break;
          case "xie":
            this.ruleForm.assistOrganName = names;
            this.ruleForm.assistOrganId = ids;
            this.assistDeptData = this.checkData;
            break;
        }
        //下一环节处理人信息
        if (type === "dosend") {
          this.fromdata.nextNodeId = params.id; //下以环节id
          this.fromdata.nextNodeName = params.name; //下一环节名称
          this.fromdata.nextUserName = names;
          this.fromdata.nextUserId = ids;
        }
        this.$forceUpdate();
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend") {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //选择人员后 确定完成并发送
    saveSending() {
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionSuperviseFinishList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.superviseRemarkList;
      let params = Object.assign(this.bank_doSend, parseList);
      this.$post
        .postData("doFinishAndSend", JSON.stringify(params), this.baoWenZiDuan)
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
    shoucang(){
        this.$confirm("您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let obj={
        function:'dbCollection',
        id: this.fromdata.id,//数据id
        flag:'pldb',   //DXDB
        tempId:this.fromdata.tempId,
        processInstId:this.fromdata.processInstId,
        page:1,
        limit:999,
        totalCount:0,
        documentCode: this.fromdata.doucumentNum >7?this.fromdata.doucumentNum:this.fromdata.superviseCode+this.fromdata.doucumentNum,  //文号
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
                      res.data.fileName );
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
        });
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
      if(!this.fromdata.tempId){
        this.$message({
          type: "erroe",
          offset: 400,
          showClose: true,
          message: "请填写批量督办事项",
          duration: 1000
        });
        return
      }
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
      this.preserve('2').then((res)=>{
        if(res){
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
                JSON.stringify(parms),
                this.treeJyx,
                true
              )
              .then(res => {
                this.bank_doSend.pcsAvyId = this.bank_send.pcsAvyId;
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
      let regT = /^[0-9]*$/;
      // if (!this.scrollIntoForm()) {
      //   return false;
      // }
      // if (!regT.test(this.fromdata.phone)) {
      //   let tips = "电话号码输入有误";
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     offset: 400,
      //     message: tips,
      //     duration: 1000
      //   });
      //   return false;
      // } else {
      //   return true;
      // }
    },
    deleteThisWork(){
      this.deleteThis = true;
      this.$post
        .postData(
          "deleteByBatch",
          JSON.stringify({function:"deleteByBatch",
          id:this.fromdata.id}),
          this.baoWenZiDuan
        ).then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 500,
             
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          }
        })
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
          // let demo1 = JSON.parse(res.data.expireDate);
          // this.ruleForm.expireDate = demo1.value;
          let demo = JSON.parse(res.data.handleTime);
          this.handleTime = demo[0].label === "1" ? "工作日" : "自然日";

          this.projectBaseList = JSON.parse(res.data.basis);
          this.SemergencyLevel = JSON.parse(res.data.degree);
          this.SredHead = JSON.parse(res.data.number);
          // --secret_type 秘密类型
          this.SsecretType = JSON.parse(res.data.secretType);
          // --secretLimitType 秘密期限类型
          this.SsecretTimeType = JSON.parse(res.data.secretLimitType);
          // --secret_flag 秘密标志
          this.SworkSecretFlag = JSON.parse(res.data.tradeSecret);
          // --trade_secret 密级和保密期限
          this.SsecretFlagType = JSON.parse(res.data.secretFlag);
          // --secret_flag_content 密级和保密期限-对应选择时间
          this.dateList = JSON.parse(res.data.secretFlagContent);
        });
    },
    initTabledata() {
      let id = this.fromdata.id;
      let tempId = this.fromdata.tempId;
      let obj = {
        id: id,
        tempId: tempId,
        function: "selTmpList",
        processInstId:this.fromdata.processInstId,
        // state: 0, //全部0 待办1  已办2  办结3
        page: 1,
        limit: 10,
        manager:'',
        unitId:this.$route.query.unitId,
      };
      this.$post
        .postData("selTmpList", JSON.stringify(obj), this.baoWenZiDuan)
        .then(res => {
          this.message = res.message;
          if (res.data) {
            if(res.data.total == 0&&res.success == true){
              this.tableData = '';
              return
            }
            this.superviseId = res.data.rows[0].superviseId;
            // for(var i = 0;i<res.data.rows.length;i++){
            //   //this.tableCols[4].btnList[0].label = res.data.rows[0].superviseId != undefined ? '已反馈':'未反馈';
            //   res.data.rows[i].curNodeName = res.data.rows[i].isUndertakeOver ==1 ? "已反馈": (res.data.rows[i].isUndertakeOver ==2? "持续跟踪":"未反馈")
            // }
            this.tableData = res.data.rows;
          }
        });
    },
    //初始值 //input框内容
    toEdit() {
      this.uploadConfig.id = this.bank_dispach.id = this.bank_dispach.id
        ? this.bank_dispach.id
        : sessionStorage.getItem("pageidPLDB") || "";
      this.state = this.$route.query.state?this.$route.query.state:"";
      let that = this;
      this.$post
        .postData(
          "selectBatchById",
          JSON.stringify(this.bank_dispach),
          this.baoWenZiDuan
        )
        .then(res => {
          that.fromdata = Object.assign(that.fromdata,res.data);
          if (res.data.tempId) {  
            that.initTabledata();
          }
          if(res.data.doucumentNum && res.data.doucumentNum.length >7){
            this.donum = true;
          }
          this.bank_selectConfig.curNodeId = res.data.curNodeCode;
          this.bank_send.curTplNo = this.bank_selectConfig.tplNo =
            res.data.pTplNo;
          this.bank_selectConfig.pTplNo = res.data.pTplNo;
          this.bank_send.curMultiTenancyId = this.bank_selectConfig.multiTenancyId =
            res.data.multiTenancyId;
          // this.fromdata.superviseRemarkList = JSON.parse(res.data.superviseRemarkList)
          // if(type==="uploadfile"){
          //     this.uploadConfig.id = res.data.id;
          //     this.$refs.uploadComponent.uploadFileNow();  
          //   }else{
          //     this.toEdit();
          //   }
          this.bank_doSend.processInstId = res.data.processInstId;
          this.bank_doSend.multiTenancyId = res.data.multiTenancyId;
          this.bank_doSend.tplNo = res.data.pTplNo;
          this.bank_doSend.pcsAvyId = res.data.pcsAvyId;
          
           //初始化承、协办单位
          if (res.data.assistOrganId) {
            this.assistDeptData = this.concatTreeData(
              res.data.assistOrganId,
              res.data.assistOrganName
            );
          }
          if (res.data.undertakeOrganId) {
            this.undertakeOrgData = this.concatTreeData(
              res.data.undertakeOrganId,
              res.data.undertakeOrganName
            );
          }
         
          if (res.data.tempId) {
            that.initTabledata();
          }
          this.secretTypeBackvalue(res.data.secretType || "商业秘密");
          that.fromdata.opinionCheckList =
            res.data &&
            res.data.opinionCheckList &&
            JSON.parse(res.data.opinionCheckList);
          that.fromdata.opinionDrafList =
            res.data &&
            res.data.opinionDrafList &&
            JSON.parse(res.data.opinionDrafList);
          that.fromdata.opinionSendList =
            res.data &&
            res.data.opinionSendList &&
            JSON.parse(res.data.opinionSendList);
          that.fromdata.opinionSignList =
            res.data &&
            res.data.opinionSignList &&
            JSON.parse(res.data.opinionSignList);
          that.fromdata.commentsList =
            res.data &&
            res.data.commentsList &&
            JSON.parse(res.data.commentsList);

          if(this.fromdata.batchStatus == '1'){
            this.tableCols = [
                  { label: "事由提要", prop: "summary", align: "center" },
                  { label: "详情描述", prop: "detailDescription", align: "center" },
                  { label: "承办单位", prop: "undertakeOrganName", align: "center" },
                  { label: "协办单位", prop: "assistOrganName", align: "center" },
                  {
                    label: "查看流程",
                    prop: "isUndertakeOver",
                    align: "center",
                    color:"blue",
                    formatter(row){
                      return (row.isUndertakeOver ==1 || row.isUndertakeOver ==0) ? "未反馈": (row.isUndertakeOver ==2? "已反馈":(row.isUndertakeOver ==3? "已收回":"持续跟踪"))
                    }
                  },
                ];
          }
  
          //临时意见处理
          this.cuteData("opinionSend", "opinionSendList", "opinionSendId");
          this.cuteData("opinionDraf", "opinionDrafList", "opinionDrafId");
          this.cuteData("opinionSign", "opinionSignList", "opinionSignId");
          this.cuteData("opinionCheck", "opinionCheckList", "opinionCheckId");
          this.cuteData("comments", "commentsList", "commentsId");
        })
        .catch(erro => {
          // this.$message({
          //   type: "error",
          //   offset: 400,
          //   showClose: true,
          //   message: "请求失败",
          //   duration: 1000
          // });
        });
    },
    // 保存
    async preserve(type) {
      let successState = false;
      this.bank_dispach.id = sessionStorage.getItem("pageidPLDB") || "";
      let parseList = JSON.parse(JSON.stringify(this.fromdata));
      delete parseList.opinionSuperviseSetupList;
      delete parseList.opinionSuperviseFinishList;
      delete parseList.opinionSuperviseOrgList;
      delete parseList.opinionSuperviseDeptList;
      delete parseList.opinionSuperviseBaseList;
      delete parseList.superviseRemarkList;
      var obj = Object.assign(this.bank_addToSendOrder,parseList);
      await this.$post
        .postData("doStartWfe", JSON.stringify(obj), this.treeJyx)
        .then(res => {
          if (res && res.success) {
            this.bank_addToSendOrder.id = this.bank_dispach.id = res.data.id;
            this.bank_doSend.id = res.data.id;
            sessionStorage.setItem("pageidPLDB", res.data.id);
            this.toEdit();
            if(type&&type!='uploadfile'&&type!='2') {
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
              this.toEdit();
              successState = true;
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
        return successState;
    },

    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
      this.active = target
    },
    onScroll() {
      const scrolled = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      // if (scrolled < this.distance_qpyj) {
      //   this.active = "#wjys";
      // } else if (scrolled >= this.distance_qpyj && scrolled <= 1100) {
      //   this.active = "#qpyj";
      // } else if (scrolled < this.distance_scfj) {
      //   this.active = "#scfj";
      // }
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
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
      });
    },
    // 删除此文
    delectArticle() {
      this.bank_dispach.id = localStorage.getItem("pageidPLDB") || "";
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
    //发送办理单位
    doSendTmp() {
      var obj = {
        id: this.fromdata.id,
        function: "doSendTmp"
      };
      this.$post
        .postData("doSendTmp", JSON.stringify(obj), this.baoWenZiDuan)
        .then(res => {
          if(res.success){
            this.$message({
              type:'success',
              message:'发送成功'
            })
            setTimeout(()=>{
              window.location.href = "about:blank";
              window.opener.location.reload();
              window.close();
            },1500)
            
          }else{
            this.$message({
              type:'error',
              message:res.message
            })
          }
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
            this.lctableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          }
        });
    },
    //表格查看流程
    scheme(row) {
      //isUndertakeOver  是否承办结束 是否承办结束0：未开始 1：已开始 2：已办结
      
      // this.timeShow = true;
      // this.bank_cklc.processInstId = this.fromdata.processInstId;
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
      this.$message({
        type: "success",
        offset: 400,
        showClose: true,
        message: "保存成功!"
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
        .postData("deleteFileById", JSON.stringify(this.bank_deleteFileById), this.fwTranId)
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
          flowTranId:this.treeJyx,
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
        .postData("doDownloadFile", JSON.stringify(this.bank_doDownloadFile), this.$businessCode.swglfj)
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
    this.uploadConfig.code = this.$businessCode.zxdbfj;
    //初始化加载数据
    this.bank_dispach.id = this.$route.query.id ? this.$route.query.id : "";
    this.bank_doSend.id = this.bank_dispach.id;
    this.state = this.$route.query.state ? this.$route.query.state : "";
    this.readFlag = this.$route.query.readFlag ? this.$route.query.readFlag:"";
    this.treeTradeCode = this.$businessCode.zxdbgg;
    this.toEdit();
    //this.getSendOrderDicByParam();
    // setInterval(() => {
    //   if(a == localStorage.getItem('st')){
    //     console.error(a)
    //   }else{
    //     alert('1')
    //   }
    // }, 20000);
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
.btnbox {
  padding: 10px 190px;
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
.allwidth{
  width: 80%;
}

</style>
