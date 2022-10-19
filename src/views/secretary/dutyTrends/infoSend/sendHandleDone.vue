<template>
  <div class="selectDept">
    <div class="headerClick">
      <div class="left" @click="toClose">
        <i class="el-icon-arrow-left"></i>
        <span>信息报送处理单</span>
      </div>
      <div class="right">
        <el-button @click="toClose" class="bank_grid_comtent_active">关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          size="mini"
          plain
        >{{item.name}}</el-button>
        <!--已办页面且下一处理人未读可见收回按钮-->
        <el-button
          v-if="reciveFlag==true"
          @click="recycle"
          class="bank_grid_comtent_active"
        >收回</el-button>
        <el-button
          @click="downloadOperationGuide"
          v-if="activeName === 'tabs_doing' || activeName === 'tabs_end'"
          class="bank_grid_comtent_active"
        >操作指南</el-button>
        <el-button
          @click="handleMaintain"
          v-if="isNeedButton && activeName1"
          class="bank_grid_comtent_active"
        >维护</el-button>
        <el-button
          @click="handleDispatch"
          v-if="activeName === 'tabs_roam'"
          class="bank_grid_comtent_active"
        >流程调度</el-button>
        <!-- <el-button @click="handleCollectClick" v-if="activeName === 'tabs_doing' || activeName === 'tabs_end'" class="bank_grid_comtent_active">收藏</el-button> -->
                
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">{{this.formData.submitUnit+"信息报送处理单"}}</div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{this.formData.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{this.formData.currentUser}}</span>
          </p>
        </div>
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿刊物" prop="submitPublication">
              <el-input v-model="formData.submitPublication" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿栏目" prop="submitColumn">
              <el-select v-model="formData.submitColumn" placeholder="请选择" :disabled="isDisabled">
                <el-option
                  v-for="item in submitColumnData"
                  :key="item.columnCategory"
                  :label="item.columnCategory"
                  :value="item.columnCategory"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿单位" prop="submitUnit">
              <el-input v-model="formData.submitUnit" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿部门" prop="submitDept">
              <el-select v-model="formData.submitDept" placeholder="请选择" :disabled="isDisabled">
                <el-option
                  v-for="item in submitDeptData"
                  :key="item.value"
                  :label="item.firstUnitName"
                  :value="item.firstUnitName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿人" prop="submitPerson">
              <el-input v-model="formData.submitPerson" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="formData.tel" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿日期" prop="createDate">
              <el-date-picker
                v-model="formData.createDate"
                type="date"
                placeholder="投稿日期"
                :disabled="isDisabled"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报送日期" prop="submitDate">
              <el-date-picker
                v-model="formData.submitDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="报送日期"
                :disabled="isDisabled"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动类别" prop="activityType">
              <el-checkbox-group
                v-model="formData.activityType"
                @change="handleChange"
                :disabled="isDisabled"
              >
                <el-checkbox
                  v-for="item in checkDataList"
                  :label="item.id"
                  :key="item.id"
                >{{item.activityCategory}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align:center">
            <el-button size="mini" type="primary" @click="exampleClick">参考示例</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">
              <el-input
                v-if='formData.contentList.length==0'
                type="textarea"
                :rows="4"                
                placeholder="请输入内容"
                v-model="formData.content"
                :disabled="isDisabled"
              ></el-input>
             <template v-if="formData.contentList && formData.contentList.length"> 
              <div  v-for='item in formData.contentList'  :key='item.id'>
              <el-input
                type="textarea"
                :rows="4"                
                placeholder="请输入内容"
                v-model="item.content"
                :disabled="isDisabled"
              ></el-input>
              </div>
             </template>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 审批意见 和 备注 管理员和非管理员显示的不一样  非管理员-->
        <div class="fei_guanli" v-if="this.$route.query.showFlg == 'fei'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="审签意见" prop="auditIdea">
                <!-- 没有数据 展示输入框  formData.auditIdeaIn -->
                <template v-if="formData.checkList.length == '0'">
                  <div class="detailComments">
                    <el-input type="textarea" resize="none" disabled v-model="formData.auditIdeaIn"></el-input>
                  </div>
                </template>

                <!-- 有数据 展示数据 -->
                <template v-if="formData.checkList && formData.checkList.length">
                  <div
                    class="detailComments"
                    v-for="(item, index) in formData.checkList"
                    :key="index"
                  >
                    <el-input type="textarea" resize="none" disabled v-model="item.content"></el-input>
                    <p class="finishedInfo" v-if="formData.currentNode !== '起草'">
                      <span>{{item.departmentName}}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span class="time">{{item.createTime}}</span>
                    </p>
                  </div>
                </template>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 备注 -->
          <el-form-item label="备注">
            <!-- 没有数据显示输入框 -->
            <template v-if="formData.remarkList.length=='0'">
              <div class="detailComments">
                <el-input type="textarea" resize="none" disabled v-model="formData.remarkIn"></el-input>
              </div>
            </template>

            <!-- 有数据显示 -->
            <template v-if="formData.remarkList && formData.remarkList.length">
              <div class="detailComments" v-for="(item, index) in formData.remarkList" :key="index">
                <el-input type="textarea" resize="none" disabled v-model="item.content"></el-input>
                <p class="finishedInfo" v-if="formData.currentNode !== '起草'">
                  <span>{{item.departmentName}}</span>
                  <span>{{item.createUser}}</span>
                  <br />
                  <span class="time">{{item.createTime}}</span>
                </p>
              </div>
            </template>
          </el-form-item>
        </div>

        <!-- 管理员进来的 -->
        <div v-show="this.$route.query.showFlg !== 'fei'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="审签意见">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addSucc('auditIdea')"
                  :disabled="isDisabled"
                >新增意见</el-button>
                <div class="suggStyle">
                  <div
                    v-bind:class="['d_flex',{'border_line':index!=(formData.checkList.length-1)}]"
                    v-for="(item,index) in formData.checkList"
                    :key="index"
                  >
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <el-col :span="2">
                          <span>内容</span>
                        </el-col>
                        <el-col :span="19">
                          <el-input
                            :disabled="isDisabled"
                            type="textarea"
                            v-model="item.content"
                            class="d_f1"
                          ></el-input>
                        </el-col>
                        <el-col :span="2" style="margin-left:12px">
                          <el-button
                            type="danger"
                            @click="deleSugg('auditIdea',index,item.id)"
                            :disabled="isDisabled"
                          >删除</el-button>
                        </el-col>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:12px">
                      <el-col :span="2">
                        <span>用户部门</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.departmentName" :disabled="isDisabled"></el-input>
                      </el-col>
                      <div style="margin-left:12px">
                        <el-col :span="2">
                          <span>用户名</span>
                        </el-col>
                        <el-col :span="5">
                          <el-input v-model="item.createUser" :disabled="isDisabled"></el-input>
                        </el-col>
                      </div>
                      <el-col :span="2">
                        <span>提交时间</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.createTime" :disabled="isDisabled"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>

              <!-- <el-form-item label="审核意见" prop="auditIdeaIn">
              <div style="margin-bottom: 3px" v-if="isDisabledAuditIdeaIn">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        v-model="formData.auditIdeaIn"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-for="item in formData.auditIdea" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100" v-if="item.content? true : false">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        v-model="item.content"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
              ></el-input>-->
              <!-- <div class="adviceInfo" v-if="!(activeName === 'tabs_roam' || activeName === 'tabs_done')">
                        <el-row>
                          {{item.deptName}}
                          <span class="pad_lr10">{{item.humanName}}</span>
                        </el-row>
                        <el-row>
                          {{item.auditTime}}
                        </el-row>
              </div>-->
              <!-- <div class="adviceInfo" v-if="activeName === 'tabs_roam' || activeName === 'tabs_done'">
                        <el-row style="margin-top:12px">
                          <el-col :span="2">
                            <span>用户部门</span>
                          </el-col>
                          <el-col :span="5">
                            <el-input v-model="item.deptName" :disabled="isDisabled" ></el-input>
                          </el-col>
                          <div style="margin-left:12px">
                            <el-col :span="2">
                              <span>用户名</span>
                            </el-col>
                            <el-col :span="5">
                              <el-input v-model="item.humanName" :disabled="isDisabled" ></el-input>
                            </el-col>
                          </div>
                          <el-col :span="2">
                            <span>提交时间</span>
                          </el-col>
                          <el-col :span="5">
                            <el-input v-model="item.auditTime" :disabled="isDisabled" ></el-input>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              </el-form-item>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-button type="primary" @click="addSucc('remark')" :disabled="isDisabled">新增意见</el-button>
                <div class="suggStyle">
                  <div
                    v-bind:class="['d_flex',{'border_line':index!=(formData.remarkList.length-1)}]"
                    v-for="(item,index) in formData.remarkList"
                    :key="index"
                    style="margin-bottom:26px"
                  >
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <el-col :span="2">
                          <span>内容</span>
                        </el-col>
                        <el-col :span="19">
                          <el-input
                            :disabled="isDisabled"
                            type="textarea"
                            v-model="item.content"
                            class="d_f1"
                          ></el-input>
                          <p class="finishedInfo" v-if="formData.currentNode !== '起草'">
                            <span>{{item.deptName}}</span>
                            <span>{{item.humanName}}</span>
                            <br />
                            <span class="time">{{item.auditTime}}</span>
                          </p>
                        </el-col>
                        <el-col :span="2" style="margin-left:12px">
                          <el-button
                            type="danger"
                            @click="deleMark(index,item.id)"
                            :disabled="isDisabled"
                          >删除</el-button>
                        </el-col>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:12px">
                      <el-col :span="2">
                        <span>用户部门</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.departmentName" :disabled="isDisabled"></el-input>
                      </el-col>
                      <div style="margin-left:12px">
                        <el-col :span="2">
                          <span>用户名</span>
                        </el-col>
                        <el-col :span="5">
                          <el-input v-model="item.createUser" :disabled="isDisabled"></el-input>
                        </el-col>
                      </div>
                      <el-col :span="2">
                        <span>提交时间</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.createTime" :disabled="isDisabled"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="备注">
            <div style="margin-bottom: 3px" v-if="isDisabledRemarkIn">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="formData.remarkIn"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-for="item in formData.remark" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100" v-if="item.content? true : false">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
              ></el-input>-->
              <!-- <div class="adviceInfo" v-if="!(activeName === 'tabs_roam' || activeName === 'tabs_done')">
                        <el-row>
                          {{item.deptName}}
                          <span class="pad_lr10">{{item.humanName}}</span>
                        </el-row>
                        <el-row>
                          {{item.remarkTime}}
                        </el-row>
              </div>-->
              <!-- <div class="adviceInfo" v-if="activeName === 'tabs_roam' || activeName === 'tabs_done'">
                        <el-row style="margin-top:12px">
                          <el-col :span="2">
                            <span>用户部门</span>
                          </el-col>
                          <el-col :span="5">
                            <el-input v-model="item.deptName" :disabled="isDisabled" ></el-input>
                          </el-col>
                          <div style="margin-left:12px">
                            <el-col :span="2">
                              <span>用户名</span>
                            </el-col>
                            <el-col :span="5">
                              <el-input v-model="item.humanName" :disabled="isDisabled" ></el-input>
                            </el-col>
                          </div>
                          <el-col :span="2">
                            <span>提交时间</span>
                          </el-col>
                          <el-col :span="5">
                            <el-input v-model="item.auditTime" :disabled="isDisabled" ></el-input>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>-->
              <!-- <el-input
                type="textarea"
                maxlength="200"
                :rows="4"
                placeholder="请输入备注"
                v-model="formData.remarkIn"
                :disabled="isDisabled"
              ></el-input>-->
              <!-- </el-form-item> -->
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <!-- @description: 选择人员树 -->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :fromdata="formData"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
      v-if="this.$route.query.showFlg == 'fei'"
    />
    <select-person1
      v-if="this.$route.query.showFlg !== 'fei'"
      v-model="dialogState"
      :orgOrDeptId="selsecOrgOrDeptId"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></select-person1>

    <!-- @description: 查看流程弹框  -->
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>

    <!-- @description: 参考示例弹窗  -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <span>{{contentExample}}</span>
    </el-dialog>
  </div>
</template>

<script>
import selectPerson from "components/tree/treeTansun";
import selectPerson1 from "components/viewFlow/dispatchTree"; //流程调度树
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import commonBtnOperationMixins from "@/views/secretary/dutyTrends/mixins/common-btn-operation-mixins";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import minixs from "@/minixs/index";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "sendHandle",
  components: {
    selectPerson,
    shiwuFlow,
    "select-person1": selectPerson1
  },
  mixins: [minixs, commonBtnOperationMixins, openOrDownLoadFile,viewDraft],
  data() {
    /** @description: 验证手机号 */
    var checkMobile = (rule, value, callback) => {
      var reg = /([A-Za-z]|[\u4E00-\u9FA5])/;
      if (value) {
        if (reg.test(value)) {
          callback(new Error("手机号格式不正确!"));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      isCurrentUser:false,
      qqq: "zuoyouzuiuouiui",
      flag: true,
      auditIdeaInFlag: false,
      RemarkInFlag: false,
      touFlag: "0",
      isRead:0,//是否已读
      activeName: "",
      activeName1: "",
      isNeedButton: true,
      submitDeptData: [] /** @description: 投稿部门数据源 */,
      submitColumnData: [] /** @description: 投稿栏目数据源 */,
      checkItemId: {} /** @description: 活动类别选中多选的id */,
      contentExample: "" /** @description: 参考示例内容 */,
      isDisabled: true /** @description: 已办 禁用表单 */,
      curProcessInstId: "" /** @description: 流程id */,
      /** @description: 规则校验 */
      rules: {
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "change" }
        ]
      },
      /** @description: 按钮 */
      buttonList: [
        { name: "查看流程", type: "chakanliucheng", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true }
      ],
      /** @description: 表单的值 */
      formData: {
        contentList:[],
        activityType: [],
        auditIdea: [],
        remarkList:[],
        checkList:[],
      },
      reciveFlag:false,
      checkDataList: [] /** @description: 活动类别数据源 */,
      fromType: "" /** @description: 路由传参的标识 */,
      submitId: "" /** @description: 保存后返回的id */,
      showFlowChart: false /** @description: 查看流程弹框默认不显示 */,
      tableData: [] /** @description: 流程数据 */,
      /**
       * 树状选择弹框
       */
      treeData: [] /** @description: 树数据 */,
      seletOptionsData: [] /** @description: 下一处理环节下拉数据 */,
      offenUse: true,
      dialogType: "dosend",
      checkIds: [] /** @description: 选中id列表 */,
      checkData: [] /** @description: 选中数据 */,
      dialogState: false /** @description: 显示隐藏 */,
      singelCheckF: true /** @description: 选人单选true 多选为false */,
      dialogTypeNow: "next",
      /** @description:  */
      dialogVisible: false /** @description: 默认参考示例弹窗不打开 */,
      workflowId: "" /** @description: 查看流程id */,
      resSubmitId: "" /** @description: 保存后返回的id */,
      selsecOrgOrDeptId: "",
      id:'',//表单id
    };
  },
  created() {
    console.log(this.$route.query.showFlg, "不是管理员页面进来的");
    this.activeName = this.dataFromQuery("activeName");
    this.activeName1 =
      this.dataFromQuery("activeName") === "tabs_roam" ||
      this.dataFromQuery("activeName") === "tabs_done";
    /** @description: 获取通过路由传过来的参数 */
    if (this.$route.query.type) {
      console.log(this.$route.query.type);

      this.rules.submitDate = [];
      this.fromType = this.$route.query.type; /** @description: 路由传参的是否是拟稿的标识 */
      console.log(this.fromType, "this.fromType");
      if (this.fromType === "add") {
        /** @description: 点击拟稿时赋值 */
        this.$api.duty.add().then(res => {
          this.formData = {
            ...res,
            activityType: [],
            submitUnit: this.currentUserInfo.unitName,
            submitPerson: res.currentUser,
            submitPublication: "值班动态"
          };
        });
      } else {
        /** @description: 当前行详情 */
        this.formData = this.dataFromQuery("data");
        this.id=this.formData.id||this.$route.query.id;
        this.getDetail();
        this.selsecOrgOrDeptId = this.formData.draftOrganId;
       // console.log("formData", this.formData);
      }
    }
  },
  mounted() {
    this.getSubmitDept(); /** @description: 获取投稿部门数据源 */
    this.getSubmitColumn(); /** @description: 获取投稿栏目数据源 */
    this.getCheckboxList(); /** @description: 获取活动类别 */
  },
  methods: {
    recycle(){
      this.$api.duty.infoSendGetBack({id:this.id}).then(res=>{
          this.$message({
                  message: "收回成功",
                  type: "success"
             });
          // this.getDetail();
          this.$intent.closeWindow(this);
      })
    },
    //获取详情
    getDetail(){
      let params;
       switch(this.activeName){
          case 'tabs_doing':
            params={
              id:this.id,filterState:2
            }
            break;
          case 'tabs_end':
             params={
              id:this.id,filterState:3
            }
            break;
          case 'tabs_todo':
             params={
              id:this.id,filterState:1
            }
            break;
          case 'tabs_all':
             params={
              id:this.id,filterState:0
            }
            break;       
          case 'tabs_roam':
             params={
              id:this.id
            }
            break;       
          case 'tabs_done':
             params={
              id:this.id
            }
            break;  
       }
       this.$api.duty.informationTransQuery(params).then(res => {    
        console.log("获取详情", res);
        this.formData=res.order;
        this.isRead=res.order.isRead;
        this.reciveFlag = res.reciveFlag;
        console.log(this.reciveFlag);
        
        console.log('isCurrentUser',this.formData.currentUserId!=JSON.parse(localStorage.getItem('userInfo')).humanId)
        this.isCurrentUser=this.formData.currentUserId!=JSON.parse(localStorage.getItem('userInfo')).humanId;
        //   : ""; /** @description: 流程id */
        this.workflowId = res.order.workflowId;
        /** @description: 活动类别赋值 */
        this.formData.activityType =
        typeof res.order.activityType === "string"? res.order.activityType.split(","):res.order.activityType;
        this.$set(this.formData,'checkList',res.checkList)
        this.$set(this.formData,'contentList',res.contentList)
        this.$set(this.formData,'remarkList',res.remarkList)
        this.formData.currentNode=res.order.currentNode;

      });
    },
    saveData(){
      delete this.formData.remark;
      delete this.formData.auditIdea;
      this.$set(this.formData,'opinionList',this.formData.checkList)
      this.formData.wfeWork=typeof this.formData.wfeWork=="string"?JSON.parse(this.formData.wfeWork):this.formData.wfeWork;
      this.$api.duty.informationTransSaveListData({
         ...this.formData,
         activityType: this.formData.activityType.toString()
                }).then(res=>{
                this.isNeedButton = true;
                this.isDisabled = true;
                this.$message({
                  message: "保存成功",
                  type: "success"
             });
          this.getDetail();
      })
    },
    // 新增意见域
    addSucc(range) {
      let AdepartmentName =
        JSON.parse(localStorage.getItem("userInfo")).shortUnitName +
        "/" +
        JSON.parse(localStorage.getItem("userInfo")).shortFirstUnitName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AuserName = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD HH:MM:SS");
      switch (range) {
        case (range = "auditIdea"):
          this.formData.checkList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "1"
          });
          break;
        case (range = "remark"):
          this.formData.remarkList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AuserName,
            createTime: AcreateTime
          });
          break;
      }
    },
    // 删除备注域
    deleMark(n, dataId) {
      let _this=this;
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$api.duty.deleteInfomation({id:dataId}).then(res=>{
            this.$message.success("删除成功");
            this.getDetail();
          })
        })
        .catch(() => {});
    },
    // 删除办理意见
    deleSugg(sugg, n, dataId) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.duty.deleteInfomation({id:dataId}).then(res=>{
            this.$message.success("删除成功");
            this.getDetail();
          })
        })
        .catch(() => {});
    },

    // 操作指南
    downloadOperationGuide() {
      this.handBook("MSGZ");
    },
    /** @description: 收藏按钮 点击处理 */
    handleCollectClick() {
      const { documentNumber, title } = this.formData || {};
      const fileList = this.formData.filePath && [
        {
          filePath: this.formData.filePath,
          fileName: this.formData.fileName
        }
      ];
      const idToRender = "printArea";
      this.doEnshrine(documentNumber, fileList, idToRender, title);
    },
    // 流程调度
    handleDispatch() {
      this.$api.duty.queryFlowNodes({ id: this.formData.id }).then(res => {
        this.dialogState = true;
        console.log("打印数据", res);
        this.seletOptionsData = res.data;
      });
    },

    // 维护
    handleMaintain() {
      this.flag = true;
      for (const i in this.buttonList) {
        if (this.buttonList[i].name === "保存") {
          this.flag = false;
        }
      }
      if (this.flag) {
        this.buttonList.unshift({ name: "保存", type: "baocun", show: true });
      }
      this.isDisabled = false;
    },
    initRule() {
      this.rules = {
        tel: [
          {
            required: this.requiredFields.tel,
            message: "请输入手机号",
            trigger: "blur"
          },
          { validator: checkMobile, trigger: "change" }
        ],
        submitColumn: [
          {
            required: this.requiredFields.tglm,
            message: "请选择投稿栏目",
            trigger: "change"
          }
        ],
        submitDept: [
          {
            required: this.requiredFields.WebFMbmname,
            message: "请选择投稿部门",
            trigger: "change"
          }
        ],
        submitPerson: [
          {
            required: this.requiredFields.ngName,
            message: "请输入投稿人",
            trigger: "blur"
          }
        ],
        submitUnit: [
          {
            required: this.requiredFields.tgDept,
            message: "请输入投稿单位",
            trigger: "blur"
          }
        ],
        auditIdeaIn: [
          {
            required: this.requiredFields.shyj,
            message: "请输入审签意见",
            trigger: "blur"
          }
        ],
        createDate: [
          {
            required: this.requiredFields.Cdate,
            message: "请选择投稿日期",
            trigger: "change"
          }
        ],
        submitDate: [
          {
            required: this.requiredFields.bsDate,
            message: "请选择报送日期",
            trigger: "change"
          }
        ],
        activityType: [
          {
            type: "array",
            required: this.requiredFields.Kwlb,
            message: "请勾选活动类别",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: this.requiredFields.zwDocument,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      };
    },

    toClose() {
      // this.$confirm("是否关闭?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // })
      //   .then(() => {
      this.$intent.closeWindow(this);
      // })
    },
    /** @description: 参考示例按钮 */
    exampleClick() {
      if (this.formData.activityType && this.formData.activityType.length > 0) {
        this.dialogVisible = true; /** @description: 打开弹窗 */
        this.$api.duty.getExample({ ids: this.checkItemId }).then(res => {
          console.log(res, "打印参考示例按钮内容");
          /** @description: 获取参考示例内容 */
          this.contentExample = res.contentExample;
        });
      } else {
        this.$message({
          type: "warning",
          message: "请勾选活动类别"
        });
      }
    },
    /** @description: 关闭弹窗 */
    handleClose() {
      this.dialogVisible = false;
    },
    /** @description: 点击按钮 */
    buttonClick(item) {
      if (item === "保存") {
        /** @description: 调用保存方法 */
        this.save();
      } else if (item === "完成并发送") {
        /** @description: 调用完成并发送方法 */
        this.submit();
      } else if (item === "投稿") {
        if (this.fromType === "add") {
          /** @description: 拟稿进来 */
          if (this.touFlag === "0") {
            /** @description: 没有保存 */

            /** @description: 执行保存 */
            this.$api.duty
              .handleSave({
                ...this.formData,
                route: "00001",
                activityType: this.checkItemId
              })
              .then(res => {
                this.submitId = res.id;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.workflowId = res.id;
                this.touFlag = "1";

                /** @description: 投稿 */
                console.log(this.formData);
                this.fromType = "sumitPage"; /** @description: 投稿标识 */
                this.$set(
                  this.formData,
                  "submitDate",
                  formatData(new Date().getTime(), "YYYY-MM-DD")
                );
                this.rules.submitDate = [
                  /** @description: 报送日期禁用 */
                  {
                    required: true,
                    message: "请选择报送日期",
                    trigger: "change"
                  }
                ];
                delete this.formData.checkList;
                delete this.formData.remarkList;
                /** @description: 调用投稿方法 */
                this.submitData();
              });
          } else if (this.touFlag === "1") {
            /** @description: 已经保存，直接投稿 */
            this.fromType = "sumitPage"; /** @description: 投稿标识 */
            this.$set(
              this.formData,
              "submitDate",
              formatData(new Date().getTime(), "YYYY-MM-DD")
            );
            this.rules.submitDate = [
              /** @description: 报送日期禁用 */
              {
                required: true,
                message: "请选择报送日期",
                trigger: "change"
              }
            ];
       //     delete this.formData.checkList;
            delete this.formData.remarkList;
            /** @description: 调用投稿方法 */
            this.submitData();
          }
        } else {
          /** @description: 详情进来 */
          console.log(this.formData);
          this.fromType = "sumitPage"; /** @description: 投稿标识 */
          this.$set(
            this.formData,
            "submitDate",
            formatData(new Date().getTime(), "YYYY-MM-DD")
          );
          this.rules.submitDate = [
            /** @description: 报送日期禁用 */
            {
              required: true,
              message: "请选择报送日期",
              trigger: "change"
            }
          ];
         // delete this.formData.checkList;
          delete this.formData.remarkList;
          /** @description: 调用投稿方法 */
          this.submitData();
        }
      } else if (item === "打印处理单") {
        /** @description: 调用打印方法 */
        this.printForm();
      } else if (item === "查看流程") {
        this.showFlowChart = true;
        this.$api.duty
          .checkFlowData({
            /** @description: curProcessInstId: this.curProcessInstId || this.workflowId, */
            curProcessInstId: this.workflowId
          })
          .then(res => {
            this.tableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
      }
    },
    // 收藏
    collect() {},
    // 操作指南
    instructions() {},
    save() {
      console.log(this.fromType);
      /** @description: 如果是当前行进详情 */
      if (this.fromType === "detail") {
        
        this.$refs.form.validate(valid => {
          if (valid) {
            this.saveData();
          }
        });
      } else {
        /** @description: 拟稿保存 */
        this.$refs.form.validate(valid => {
          /** @description: 表单校验 */
          if (valid) {
            this.$api.duty
              .handleSave({
                ...this.formData,
                route: "00001",
                activityType: this.checkItemId
              })
              .then(res => {
                console.log(res, "打印保存返回的数据");
                this.submitId = res.id;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.workflowId = res.id;
                this.touFlag = "1";
                /** @description: this.fromType ="detail" */
              });
          } else {
            this.$message({
              type: "warning",
              message: "请填写表单"
            });
          }
        });
      }
    },
    /** @description: 完成并发送 */
    submit() {
      this.$refs.form.validate(valid => {
        /** @description: 表单校验 */
        if (valid) {
          console.log(this.fromType, "submitId");
          if (this.fromType === "add") {
            /** @description: 先走保存 */
            this.$api.duty
              .handleSave({
                ...this.formData,
                route: "00001",
                activityType: this.checkItemId
              })
              .then(res => {
                this.dialogState = true; /** @description: 打开选人弹窗 */
                /** @description: 删除返回数组数据 */
            //    delete this.formData.checkList;
                delete this.formData.remarkList;
                console.log("df", this.formData);
                this.$api.duty
                  .submit({
                    ...this.formData,
                    route: "00002",
                    id: res.id,
                    activityType: this.formData.activityType.toString()
                  })
                  .then(res => {
                    console.log(res, "打印完成并发送返回的id");
                    this.resSubmitId = res.id;
                    this.seletOptionsData =
                      (res && res.list) ||
                      []; /** @description: 下一处理环节赋值 */
                    this.curProcessInstId = res.curProcessInstId;

                    /** @description: this.$router.go(-1); */
                  });
              });
          } else if (this.fromType === "detail") {
            // if (typeof (this.formData.wfeWork) === "string") {
            // this.formData.wfeWork = JSON.parse(this.formData.wfeWork)
            // }
            this.dialogState = true; /** @description: 打开选人弹窗 */
            /** @description: 删除返回数组数据 */
          //  delete this.formData.checkList;
            delete this.formData.remarkList;
            console.log("df", this.formData);
            this.$api.duty
              .submit({
                ...this.formData,
                route: "00002",
                id: this.submitId || this.formData.id,
                activityType: this.formData.activityType.toString()
              })
              .then(res => {
                console.log(res, "打印完成并发送返回的id");
                this.resSubmitId = res.id;
                this.seletOptionsData =
                  (res && res.list) || []; /** @description: 下一处理环节赋值 */
                this.curProcessInstId = res.curProcessInstId;
              });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请先填写表单"
          });
        }
      });
    },
    /** @description: 投稿按钮 */
    submitData() {
      this.$refs.form.validate(valid => {
        /** @description: 表单校验 */
        if (valid) {
          this.$api.duty
            .submitFormData({
              id: this.submitId || this.formData.id,
              route: "00003",
              ...this.formData,
              activityType: this.formData.activityType.toString()
            })
            .then(res => {
              this.$message({
                message: "投稿成功",
                type: "success"
              });
              this.gotoPublishedPage("dutyTrendInfoSend", {
                btnType: "submit"
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写表单"
          });
        }
      });
    },
    /** @description: 获取投稿部门数据源 */
    getSubmitDept() {
      this.$api.duty.getSubmitDeptData().then(res => {
        this.submitDeptData = res.departList;
        this.formData.deptTableHeader = res.departList[0].unitName;
        console.log("获取投稿部门", res.departList);
      });
    },
    /** @description: 获取投稿栏目数据源 */
    getSubmitColumn() {
      this.$api.duty
        .getSubmitColumnData({ columnType: "1", type: "1" })
        .then(res => {
          /** @description: res.columnCategoryList.map((item) => { */
          /** @description: let obj = {}; */
          /** @description: obj.id = item.id; */
          /** @description: obj.columnCategory = item.columnCategory; */
          /** @description: this.submitColumnData.push(obj); */
          /** @description: }); */

          this.submitColumnData = res.columnCategoryList;
          console.log("获取投稿栏目数据源", this.submitColumnData);
        });
    },
    /** @description: 获取活动类别 */
    // getCheckboxList() {
    //   this.$api.duty.checkboxData({ data: {} }).then((res) => {
    //     this.checkDataList = res && res.list || [];
    //     this.$set(this.formData, 'checkDataList', this.checkDataList)
    //     console.log(res, "打印获取活动类别返回的东西");
    //   });
    // },
    /** @description: 获取活动类别 */
    getCheckboxList() {
      this.$api.duty
        .getSubmitColumnList({ draftOrganId: this.orgId })
        .then(res => {
          // debugger;
          console.log("77777777777", this.formData);
          this.checkDataList = (res && res.orderList) || [];
          this.$set(this.formData, "checkDataList", this.checkDataList);
          // this.otherBankId =
          //   this.formData.activityType && this.formData.activityType;
          // this.otherBankName =
          //   this.formData.activeTypeName &&
          //   this.formData.activeTypeName.split(",");
          // for (const i in this.otherBankId) {
          //   this.whetherToRepeat = true;
          //   for (const index in this.checkDataList) {
          //     if (this.otherBankId[i] === this.checkDataList[index].id) {
          //       this.whetherToRepeat = false;
          //     }
          //   }
          // if (this.whetherToRepeat) {
          //   this.checkDataList.push({
          //     id: this.otherBankId[i],
          //     activityCategory: this.otherBankName[i]
          //   });
          // }
          // }
          this.$set(this.formData, "checkDataList", this.checkDataList);
          console.log(res, "打印获取活动类别返回的东西");
        });
    },
    /** @description: 当绑定值变化时触发的事件 */
    handleChange(val) {
      console.log(val);
      this.checkItemId = this.getStrFromListAndSeparator(
        val
      ); /** @description: 数组转字符串 */
      console.log(val, "打印选中的活动类别");
    },
    /** @description: 打印处理单 */
    printForm() {
      this.formData.title = this.formData.submitUnit + "信息报送处理单";
      let copyRow = JSON.stringify(
        this.formData
      ); /** @description: 当前行数据转换字符串 */
      /** @description: 跳转页面 */
      this.gotoPublishedPage(
        "infoSendPrint",
        {
          /** @description: 来源路由名 据此中详情页中导航回来*/
          sourceRouteName: "dutyTrendsSendHandlDone",
          ...this.queryDataExcludeSourceRouteName,
          data: copyRow
        },
        { sourceRouteName: this.sourceRouteNameFromQuery },
        false
      );
    },
    /** @description: 选人成功 */
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, "params", params, dtype);
      if (status) {
        let param = {
          pcsavyId: params.idStr || params.id,
          id: this.submitId || this.resSubmitId,
          nextUserId: data[0].id,
          nextUserName: data[0].name,
          nextAvyId: params.idStr || params.id,
          nextAvyName: params.name
        };
        /** @description: debugger */
        this.$api.duty
          .handleSubmitOnOk({ ...param, ...this.formData })
          .then(res => {
            this.dialogState = false; /** @description: 关闭选人弹窗 */
            this.$message({
              type: "success",
              message: "完成并发送成功"
            });
            /** @description: this.$router.back(); */
            this.$intent.closeWindow(this);
          });
      } else {
        this.dialogState = false; /** @description: 关闭选人弹窗 */
      }
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 16px;
}
.selectDept {
  background: white;
  margin: 0 auto;
  .headerClick {
    display: inline-block !important;
    background: #409eff;
    color: white;
    height: 60px;
    // position: static !important;
    line-height: 60px;
    .left {
      margin-left: 20px;
    }
    .right {
      margin-right: 20px;
      float: right;
    }
  }
  .formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
          margin-top: 70px;
    }
  }

  .fei_guanli {
    .detailComments {
      position: relative;
      // height: 100px;
      /* background-color:  #fff; */
      /*margin-bottom: 10px;*/
      .el-textarea {
        height: 100%;
        /* padding-bottom: 32px; */
        /* border: 1px solid #ccc; */
        border-radius: 4px;
        box-sizing: border-box;
        /* &:hover{
        border: 1px solid #8996af !important;
      } */
        .el-textarea__inner {
          height: 100%;
          border: none !important;
          &:hover {
            border: none !important;
          }
        }
      }
    }
    .finishedInfo {
      position: absolute;
      right: 0;
      bottom: 18px;
      width: 100%;
      text-align: right;
      color: #606266;
      /* background: #e4e7ed52; */
      span {
        padding-right: 10px;
      }
      .time {
        margin-top: 5px;
      }
    }
  }

  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f60;
      background: #fef7e7;
      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }
  }
}
/deep/.el-form-item__content{
    border: 1px solid rgba(228,231,237);
    border-radius: 4px;
}
/deep/.el-input.is-disabled .el-input__inner, /deep/.el-textarea.is-disabled .el-textarea__inner{
    border: none;
    border-radius: 0;
}
</style>
