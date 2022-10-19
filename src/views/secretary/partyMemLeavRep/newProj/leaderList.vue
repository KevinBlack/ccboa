
<template>
  <div>
    <el-header>
      <div class="headerClick">
        <el-button
          plain
          class="bank_grid_comtent_active"
          style="background: #0563c8!important;
           color: #fff!important;"
          @click="onClose()"
        >关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="item.show"
          plain
        >{{item.name}}</el-button>
      </div>
    </el-header>
    <!-- <div class="headerClick">
      <el-button plain class="bank_grid_comtent_active" @click="onClose()">关闭</el-button>
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        v-show="buttonList[index].show"
        :key="index"
        size="mini"
        plain
      >{{item.name}}</el-button>
    </div>-->
    <div id="loadPdf">
      <div class="maintitle">{{dataForm.curBank}}党委成员离京报告表</div>
      <div class="container">
        <div class="content-header">
          <p>
            当前环节：
            <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span style="color: #f60; color: red !important;">{{dataForm.curUserName}}</span>
          </p>
        </div>
        <el-form
          label-position="right"
          :model="dataForm"
          class="formData"
          label-width="90px"
          style="margin-top: 30px;"
          :validate-on-rule-change="false"
          :rules="rules"
          ref="dataForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="报告人" prop="name">
                <!-- <el-input v-model="dataForm.name" :disabled="readFields.name" type="text"></el-input> -->
                <el-select
                  v-model="dataForm.name"
                  :disabled="readFields.name && isadbled"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in Leaderlist"
                    :key="item.leaderHumanId"
                    :label="item.leaderCnName"
                    :value="item.leaderCnName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="前往地点" prop="address">
                <el-input
                  v-model="dataForm.address"
                  :disabled="readFields.address && isadbled"
                  placeholder="精确到地级市"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="离京时间" prop="ljTime">
                    <el-date-picker
                      v-model="dataForm.ljTime"
                      :disabled="readFields.ljTime && isadbled"
                      :picker-options="startPick"
                      style="width: 100%;"
                      value-format="yyyy-MM-dd"
                      @change="getEndDate"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="ljTimeDetail" label-width="0">
                    <el-select
                      v-model="dataForm.ljTimeDetail"
                      :disabled="readFields.ljTimeDetail && isadbled"
                    >
                      <el-option label="上午" value="上午"></el-option>
                      <el-option label="下午" value="下午"></el-option>
                      <el-option label="晚上" value="晚上"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="返京时间" prop="fjTime">
                    <el-date-picker
                      v-model="dataForm.fjTime"
                      style="width: 100%;"
                      :disabled="readFields.fjTime && isadbled"
                      :picker-options="endPick"
                      @change="getStartTime"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="fjTimeDetail" label-width="0">
                    <el-select
                      v-model="dataForm.fjTimeDetail"
                      :disabled="readFields.fjTimeDetail && isadbled"
                    >
                      <el-option label="上午" value="上午"></el-option>
                      <el-option label="下午" value="下午"></el-option>
                      <el-option label="晚上" value="晚上"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <div v-show="this.isadbled === false">
              <el-form-item label="批示意见" prop="comments">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addSucc('comment')"
                  :disabled="isadbled"
                >新增意见</el-button>
                <div class="suggStyle">
                  <div
                    v-bind:class="['d_flex',{'border_line':index!=(options.length-1)}]"
                    v-for="(item,index) in options"
                    :key="index"
                  >
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <el-col :span="2">
                          <span>内容</span>
                        </el-col>
                        <el-col :span="19">
                          <el-input
                            :disabled="isadbled"
                            type="textarea"
                            v-model="item.content"
                            class="d_f1"
                          ></el-input>
                        </el-col>
                        <el-col :span="2" style="margin-left:12px">
                          <el-button
                            type="danger"
                            @click="deleSugg(item, index)"
                            :disabled="isadbled"
                          >删除</el-button>
                        </el-col>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:12px" v-show="dataForm.currentNode !== '起草'">
                      <el-col :span="2">
                        <span>用户部门</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.deptName" :disabled="isadbled"></el-input>
                      </el-col>
                      <div style="margin-left:12px">
                        <el-col :span="2">
                          <span>用户名</span>
                        </el-col>
                        <el-col :span="5">
                          <el-input v-model="item.leaderName" :disabled="isadbled"></el-input>
                        </el-col>
                      </div>
                      <el-col :span="2">
                        <span>提交时间</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.updateTime" :disabled="isadbled"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div v-show="this.isadbled">
              <el-form-item label="批示意见" prop="comments">
                <!-- 有没有数据都要填写  如果可以编辑，就出现   || options.length =='0'-->
                <div v-show="!readFields.comments || options.length =='0'">
                  <el-input
                    type="textarea"
                    :disabled="readFields.comments"
                    v-model="dataForm.comments"
                  ></el-input>
                </div>
                <!-- 有数据显示 -->
                <template v-show="options && options.length">
                  <el-row class="d_b100" style="margin: 5px 0;border: 1px solid #ccc;">
                    <el-col v-for="(item, index) in options" :key="index" class="detailComments">
                      <div
                        class="el-icon-delete"
                        @click="deleteItem(item)"
                        style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                        v-if="item.createTime==lastOptionTime&&item.createUserId==localUserId&&actionType==='edit'"
                      ></div>
                      <div style="word-break: break-all;">{{ item.content }}</div>
                      <div class="adviceInfo">
                        <span style="margin-right:10px">{{ item.deptName }}</span>
                        <span>{{item.leaderName}}</span>
                        <br />
                        <span>{{item.updateTime}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </el-form-item>
            </div>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="领导批示" prop="leaderIdea">
                <el-row
                  v-if=" (dataForm.leaderIdeaList &&　dataForm.leaderIdeaList.length==0)  || !editedIdeaFields.LDidea"
                >
                  <el-input
                    type="textarea"
                    v-model="dataForm.leaderIdea"
                    resize="none"
                    :disabled="editedIdeaFields.LDidea_1"
                  ></el-input>
                </el-row>
                <div
                  class="d_flex"
                  v-if="dataForm.leaderIdeaList && dataForm.leaderIdeaList.length!=0"
                >
                  <el-row class="d_b100" style="margin: 5px 0;">
                    <el-col
                      v-for="(item, index) in dataForm.leaderIdeaList"
                      :key="item.id"
                      style="background: #e0e0e057; padding: 5px 10px"
                    >
                      <div
                        class="el-icon-delete"
                        @click="deleteItem(item)"
                        style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                        v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                      ></div>
                      <div style="word-break: break-all;">{{ item.content }}</div>
                      <div class="adviceInfo">
                        <span style="margin-right:10px">{{ item.deptName }}</span>
                        <span>{{item.createUser}}</span>
                        <br />
                        <span>{{item.createTime}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-form-item label="出差事由" prop="outReason">
            <el-input
              type="textarea"
              v-model="dataForm.outReason"
              placeholder="XXX拟于X月X日—X日到XX分行调研。呈国立董事长审签"
              :disabled="readFields.outReason && isadbled"
            ></el-input>
          </el-form-item>
          <el-form-item label="总行部门陪同人员" prop="ptPersion">
            <el-input
              type="textarea"
              placeholder="总行部门负责人，原则上不超过三人"
              v-model="dataForm.ptPersion"
              :disabled="readFields.ptPersion && isadbled"
            ></el-input>
          </el-form-item>
          <el-row>
            <div v-show="this.isadbled === false">
              <el-form-item label="备注" prop="remark">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addSucc('remark')"
                  :disabled="isadbled"
                >新增备注</el-button>
                <div class="suggStyle">
                  <div
                    v-for="(item,index) in remarks"
                    :key="index"
                    v-bind:class="['d_flex',{'border_line':index!==(remarks.length-1)}]"
                  >
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <el-col :span="2">
                          <span>内容</span>
                        </el-col>
                        <el-col :span="19">
                          <el-input
                            :disabled="isadbled"
                            type="textarea"
                            v-model="item.content"
                            class="d_f1"
                          ></el-input>
                        </el-col>
                        <el-col :span="2" style="margin-left:12px">
                          <el-button
                            type="danger"
                            @click="deleRemark(item, index)"
                            :disabled="isadbled"
                          >删除</el-button>
                        </el-col>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:12px" v-show="dataForm.currentNode !== '起草'">
                      <el-col :span="2">
                        <span>用户部门</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.deptName" :disabled="isadbled "></el-input>
                      </el-col>
                      <div style="margin-left:12px">
                        <el-col :span="2">
                          <span>用户名</span>
                        </el-col>
                        <el-col :span="5">
                          <el-input v-model="item.leaderName" :disabled="isadbled"></el-input>
                        </el-col>
                      </div>
                      <el-col :span="2">
                        <span>提交时间</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.updateTime" :disabled="isadbled"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div v-show="this.isadbled">
              <el-form-item label="备注" prop="remark">
                <!-- 有没有数据都要填写 -->
                <div v-show="!readFields.remark || remarks.length =='0'">
                  <el-input type="textarea" v-model="dataForm.remark" :disabled="readFields.remark"></el-input>
                </div>
                <!-- 有数据显示 -->
                <template v-show="remarks && remarks.length">
                  <el-row class="d_b100" style="margin: 5px 0;">
                    <el-col v-for="(item, index) in remarks" :key="index" class="detailComments">
                      <div style="word-break: break-all;">{{ item.content }}</div>
                      <div class="adviceInfo">
                        <span style="margin-right:10px">{{ item.deptName }}</span>
                        <span>{{item.leaderName}}</span>
                        <br />
                        <span>{{item.updateTime}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </el-form-item>
            </div>
          </el-row>
        </el-form>
        <div class="person">
          <p>
            <span>填报人:</span>
            <span>{{dataForm.authorCn}}</span>
          </p>
          <p>
            <span>填报时间：</span>
            <span>{{dataForm.draftTime}}</span>
          </p>
        </div>
      </div>
    </div>

    <select-person
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :checkOrg="checkOrg"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      :fromdata="dataForm"
      dialogTit="选择人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :subOrgFlag="false"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person>
    <!--    :checkIds="checkIds"-->
    <!--    :checkData="checkData"-->
    <!--查看流程-->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>

<script >
// import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "@/minixs/exportTable";
import selectPerson from "components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import minixs from "@/minixs/index";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "partyMemLeavRep",
  components: {
    selectPerson,
    shiwuFlow
  },
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  data() {
    return {
      actionType: "", // 当前阶段
      localUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, // 当前人员id
      lastOptionTime: "", // 最新一条 “批示意见” 时间
      isadbled: true,
      codeFilePath: "",
      codeFileName: "",
      backFlag1: false, //完成并发送是否直接返回
      readComment: true,
      options: [], // 批示意见
      remarks: [],
      flowChartList: [],
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wanchengfasong", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "作废", type: "zuofei", show: false },
        { name: "收回", type: "shouhui", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "ckliucheng", show: false },
        { name: "打印处理单", type: "dayinchulidan", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false },
        { name: "维护", type: "weihu", show: false }
      ],
      fileArr: [],
      Leaderlist: [],
      identify: 0,
      dataForm: {
        draftTime: "",
        authorCn: "",
        name: "",
        address: "",
        ljTime: "",
        ljTimeDetail: "",
        fjTime: "",
        fjTimeDetail: "",
        comments: "",
        outReason: "",
        ptPersion: "",
        remark: ""
        // hasDocumentNo: "false",
        // showApp: "0"
      },
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      rules: {},
      startPick: this.startTime(),
      endPick: this.endTime(),
      type: null,
      treeData: [],
      loadingTree: true,
      canTab: false,
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [], //下一环节下拉单
      dialogTit: "选择人员",
      offenUse: true,
      checkOrg: false,
      inputDisable: true,
      deptList: [],
      formdata: {
        //
        hasDocumentNo: "false",
        currentNode: "起草",
        draftTime: formatData(new Date().getTime(), "YYYY-MM-DD"),
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        currentNowName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName +
            " " +
            JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitId
          : "",
        draftOrgan: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitName
          : "",
        draftOrganId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitId
          : "",
        draftDepartmentOne: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName ||
            JSON.parse(this.$route.query.deptDetail).draftDepartmentOne
          : "",
        draftDepartmentOneId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        phone: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[1]
            ? JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[1]
            : ""
          : "",
        documentNo: "",
        // feedbackMode: "0",
        showApp: "0",
        currentUserDept: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitName
          : "",
        currentUserDeptId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitId
          : ""
      },
      showFlowChart: false,
      huanJieMessage: {},
      editedIdeaFields: {
        remark: "",
        comments: ""
      },
      //不可编辑控制域
      readFields: {
        draftTime: false,
        comments: false,
        //comments: true,
        authorCn: false,
        name: false,
        address: false,
        ljTime: false,
        ljTimeDetail: false,
        fjTime: false,
        fjTimeDetail: false,
        outReason: false,
        ptPersion: false,
        remark: false
      },
      //必填控制域
      requiredFields: {
        draftTime: true,
        comments: false,
        authorCn: false,
        name: true,
        address: true,
        ljTime: true,
        ljTimeDetail: true,
        fjTime: true,
        fjTimeDetail: true,
        outReason: true,
        ptPersion: false,
        remark: false
      },
      id: ""
    };
  },
  created() {
    //获取行领导
    console.log(this.$route.query, "this.$route.query");
    this.actionType = this.$route.query.type;
  },
  mounted() {
    this.getLeater();
    this.id = this.$route.query.id ? this.$route.query.id : "";
    if (this.$route.query.id) {
      // this.dataForm.id =  this.$route.query.id ? this.$route.query.id : null
      this.getDetail();
    } else {
      console.log(
        JSON.parse(this.$route.query.params),
        "JSON.parse(this.$route.query.params)"
      );
      this.dataForm.currentNode = "起草";
      this.dataForm.curUserName = JSON.parse(
        localStorage.getItem("userInfo")
      ).humanName;
      this.dataForm.draftTime =
        formatData(new Date().getTime(), "YYYY年MM月DD") + "日";
      this.dataForm.authorCn = JSON.parse(this.$route.query.params).humanName;
      this.dataForm.authorDept = JSON.parse(
        this.$route.query.params
      ).firstUnitName;
      this.dataForm.deptId = JSON.parse(this.$route.query.params).firstUnitId;
      this.dataForm.curBank = JSON.parse(this.$route.query.params).unitName;
      this.dataForm.curUserDeptId = JSON.parse(
        this.$route.query.params
      ).currUnitId;
      this.getArear();
      // this.buttonList = [
      //   { name: '保存', type: 'baocun', show: true },
      //   { name: "完成并发送", type: "wanchengfasong", show: true },
      //   { name: "查看流程", type: "ckliucheng", show: true },
      //   { name: "操作指南", type: "caozuozhinan", show: true },
      // ]
    }
  },
  methods: {
    // 删除 收回之后 处理人 自己的 批示意见
    deleteItem(item) {
      const that = this;
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "but_model",
        type: "warning"
      })
        .then(() => {
          if (item.id) {
            that.$api.secreatary.partyMemLeavRep
              .deltAdminRemark({
                id: item.id
              })
              .then(res => {
                if (res.code === "SUCCESS") {
                  that.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  that.getDetail();
                }
              })
              .catch(() => {
                console.log("error");
              });
          } else {
            that.options.splice(index, 1);
          }
        })
        .catch(() => {});
    },

    // 添加意见或者备注
    addSucc(range) {
      let AdepartmentName = JSON.parse(localStorage.getItem("userInfo"))
        .firstUnitName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      // let AuserName = JSON.parse(localStorage.getItem('userInfo')).humanName
      // let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD hh:mm:ss")
      let AcreateTime = new Date()
        .toLocaleString("chinese", { hour12: false })
        .split("/")
        .join("-");
      switch (range) {
        case (range = "comment"):
          this.options.push({
            content: "",
            deptName: AdepartmentName,
            leaderName: AcreateUser,
            updateTime: AcreateTime
          });
          break;
        case (range = "remark"):
          this.remarks.push({
            content: "",
            deptName: AdepartmentName,
            leaderName: AcreateUser,
            updateTime: AcreateTime
          });
          break;
      }
    },
    // 删除意见
    deleSugg(item, index) {
      const that = this;
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.id) {
            that.$api.secreatary.partyMemLeavRep
              .deltAdminRemark({
                id: item.id
              })
              .then(res => {
                if (res.code === "SUCCESS") {
                  that.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  that.getDetail();
                }
              })
              .catch(() => {
                console.log("error");
              });
          } else {
            that.options.splice(index, 1);
          }
        })
        .catch(() => {});
    },
    // 删除备注
    deleRemark(item, index) {
      const that = this;
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.id) {
            that.$api.secreatary.partyMemLeavRep
              .deltAdminRemark({
                id: item.id
              })
              .then(res => {
                if (res.code === "SUCCESS") {
                  that.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  that.getDetail();
                }
              })
              .catch(() => {
                console.log("error");
              });
          } else {
            that.remarks.splice(index, 1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 完成并发送直接返回
    GoBack() {
      this.$api.secreatary.partyMemLeavRep
        .goBack({ ...this.dataForm })
        .then(res => {
          this.$message({
            message: "返回上一级成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        });
    },
    // 获取行领导
    getLeater() {
      this.$api.secreatary.activety.findLeader({}).then(res => {
        console.log(res, "行领导");
        this.Leaderlist = res.data;
      });
    },
    // 限制时间
    getEndDate(startDate) {
      if (!startDate) {
        this.dataForm.ljTime = "";
      } else {
        this.dataForm.ljTime = startDate;
      }
    },
    getStartTime(end) {
      if (!end) {
        this.dataForm.fjTime = "";
      } else {
        this.dataForm.fjTime = end;
      }
    },
    startTime() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.dataForm.fjTime) {
            return time.getTime() > new Date(self.dataForm.fjTime).getTime();
          }
        }
      };
    },
    endTime() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.dataForm.ljTime) {
            return (
              time.getTime() <
              new Date(self.dataForm.ljTime).getTime() - 1 * 24 * 3600000
            );
          }
        }
      };
    },
    // 流程
    async getProcessDetailList() {
      let response = await this.$api.secreatary.partyMemLeavRep
        .getProcessDetail({
          id: this.$route.query.id
        })
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.flowChartList = response.data;
      } else {
        this.$message.error(response.msg);
      }
    },
    buttonClick(params) {
      switch (params) {
        case "保存":
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              if (this.isadbled === false) {
                this.saveAdminReport();
                this.isadbled = true;
              } else {
                this.dataForm.id ? this.editSaveReport() : this.saveReport();
              }
            }
          });
          break;
        case "完成并发送":
          console.log(this.backFlag1, !!this.dataForm.oldUserCode);
          if (this.isadbled == false) {
            this.$message({
              type: "success",
              message: "请先保存！"
            });
          } else if (
            this.backFlag1 &&
            !!this.dataForm.oldUserCode &&
            this.dataForm.currentNode != "起草"
          ) {
            this.$confirm(
              "是否返回" + this.dataForm.oldUserName + "?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                customClass: "but_model",
                type: "warning"
              }
            )
              .then(() => {
                // 调用新返回
                console.log("12121");
                this.GoBack();
              })
              .catch(() => {
                console.log("34343434");
                this.showNext();
              });
          } else {
            console.log("565656");
            this.showNext();
          }
          break;
        case "删除此文":
          this.deleteReport();
          break;
        case "收回":
          this.$confirm("是否确定收回", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.secreatary.partyMemLeavRep
                .recyclingProcess({ id: this.dataForm.id })
                .then(res => {
                  this.$message({
                    message: "收回成功",
                    type: "success"
                  });
                  this.$intent.closeWindow(this);
                });
            })
            .catch(() => {});
          break;

          break;
        case "办结":
          console.log("办结");
          this.$confirm("是否确定办结", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              // 调用新返回
              this.overFinished();
            })
            .catch(() => {});
          break;
        case "查看流程":
          console.log("查看流程");
          if (this.id) {
            this.getProcessDetailList().then(() => {
              this.showFlowChart = true;
              this.$nextTick(() => {
                this.$refs.dialogLine.openDialog();
              });
            });
          } else {
            this.$message({
              type: "error",
              message: "请先保存数据"
            });
          }

          break;
        case "收藏":
          if (this.id) {
            this.$confirm(
              "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
              "提示",
              {
                distinguishCancelAndClose: true,
                confirmButtonText: "是",
                cancelButtonText: "否",
                type: "warning"
              }
            )
              .then(() => {
                this.$api.secreatary.partyMemLeavRep
                  .shoucang({ id: this.id })
                  .then(res => {
                    console.log(res, "获取收藏返回值");
                    this.downFile(res);
                    this.$message({
                      type: "success",
                      offset: "200",
                      message: "收藏完成"
                    });
                  });
              })
              .catch(action => {
                if (action == "close") {
                } else {
                  // this.$intent.closeWindow(this);
                }
              });
          } else {
            this.$message({
              type: "error",
              message: "请先保存数据"
            });
          }

          break;
        case "打印处理单":
          if (this.id) {
            this.$api.secreatary.partyMemLeavRep
              .editSaveMemLeavRep(this.dataForm)
              .then(res => {
                this.$intent.goNewPage(this, {
                  path: "/partyMemLeavRep",
                  query: { id: this.id }
                });
              });
          } else {
            // const params = {
            //   ...this.dataForm,
            //   exeList: this.options,
            //   remList: this.remarks
            // };
            // console.log(params);
            // this.$api.secreatary.partyMemLeavRep
            //   .saveAdminInfo(params)
            //   .then(res => {
            //     this.id = response.data.id;
            //     this.$intent.goNewPage(this, {
            //       path: "/partyMemLeavRep",
            //       query: { id: this.dataForm.id }
            //     });
            //   });
            this.$message({
              type: "error",
              message: "请先保存数据"
            });
            // this.saveAdminReport().then(res => {
            //   this.$intent.goNewPage(this, {
            //     path: "/partyMemLeavRep",
            //     query: { id: this.dataForm.id }
            //   });
            // });
          }
          break;
        case "维护":
          // console.log('维护')
          this.isadbled = false;
          break;
        case "操作指南":
          console.log("操作指南");
          this.caozuozhinan();
          break;
        case "作废":
          console.log("作废");
          this.invalid();
          break;
      }
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      // bank_doDownloadFile.filePath = '/home/ap'+file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
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
    // 办结
    async overFinished() {
      this.dataForm.handleButton = "办结";
      let response = await this.$api.secreatary.partyMemLeavRep
        .submitToSend(this.dataForm)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "办结成功"
        });
        this.$intent.closeWindow(this);
      } else {
        this.$message.error(response.msg);
      }
    },
    //操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "MSGZ"
          }),
          this.$businessCode.msgz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.dataForm.id,
                    zhengWenState: 0,
                    JYcode: "A08462002",
                    multiTenancyId: "000000iiii",
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
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
    // 作废
    invalid() {
      // this.$confirm
      if (!this.dataForm.remark) {
        this.$message.error("请在备注上填写作废原因");
      } else {
        this.$confirm("是否确定作废?", "提示", {
          confirmButtonText: "确定",
          cencelButtonText: "取消"
        })
          .then(() => {
            this.$api.secreatary.partyMemLeavRep
              .invalidProcess({
                id: this.$route.query.id,
                remark: this.dataForm.remark
              })
              .then(res => {
                if (res.code === "SUCCESS") {
                  this.$message({
                    type: "success",
                    message: "已作废"
                  });
                  this.$intent.closeWindow(this);
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(() => {
                console.log("error");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消作废"
            });
          });
      }
    },
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      console.log("-----flagFile--->", flagFile);
      var successInfo = { state: false };
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = flagFile.fileName;
      bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          console.log("-----res", res);
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
    showNext() {
      this.singelCheckF = true;
      this.dialogTypeNow = "next";
      this.dialogType = "dosend";
      this.offenUse = true;
      this.loadingTree = true;
      this.canTab = false;
      this.checkData = []; //清空选中数据，避免和传阅选中数据混合
      // 新增时候先保存后在展示下一环节
      if (!this.dataForm.id) {
        this.saveReport().then(res => {
          if (res) {
            this.getNodes();
          }
        });
        return false;
      } else {
        // 其他情况直接展示下一环节
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            this.getNodes();
          }
        });
      }
    },
    // 获取节点及人员数
    getNodes() {
      // const that = this;
      this.$api.secreatary.partyMemLeavRep
        .getNodeAndUsers({
          id: this.dataForm.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            //带约束条件判断环节
            //过滤重复环节
            //this.seletOptionsData = res.list;
            // let PCSAVYIDs = [];
            // this.seletOptionsData = res.list.filter(item => {
            //   if (!PCSAVYIDs.includes(item.PCSAVYID)) {
            //     PCSAVYIDs.push(item.PCSAVYID);
            //     return item;
            //   }
            // });
            // this.seletOptionsData = this.shoNextNode(
            //   this.seletOptionsData,
            //   this.huanJieMessage.acyNodeNextBount
            // );
            this.dialogState = true;
            this.$nextTick(() => {
              this.seletOptionsData = res.data.list;
            });
            // that.seletOptionsData = res.data.list;
            // that.dialogState = true;
            this.loadingTree = true;
          }
        });
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      if (!status) {
        return;
      }
      switch (dtype) {
        case "next":
          // 保存并发送
          this.sendReport(data[0], params, data);
          break;
        case "cy":
          break;
        case "main":
          break;
        case "copy":
          break;
        default:
          break;
      }
    },
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/printdetail"
      });
      window.open(routerData.href, "_blank");
    },
    onClose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            if (this.dataForm.id) {
              this.editSaveReport().then(() => {
                this.$intent.closeWindow(this);
              });
            } else if (this.isadbled != false) {
              this.$refs.dataForm.validate(valid => {
                if (valid) {
                  this.submitFn().then(res => {
                    if (res) {
                      resolve(true);
                    }
                  });
                }
              });
              this.$intent.closeWindow(this);
              // this.saveReport().then(res => {
              //   this.$intent.closeWindow(this);
              // });
            } else {
              this.saveAdminReport().then(res => {
                this.$intent.closeWindow(this);
              });
            }
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
      // const that = this;
      // this.$confirm("是否保存并退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cencelButtonText: "取消"
      // })
      //   .then(() => {
      //     if (that.dataForm.id) {
      //       that.editSaveReport().then(() => {
      //         window.location.href = "about:blank";
      //         window.opener.location.reload();
      //         window.close();
      //       });
      //     } else if (this.isadbled != false) {
      //       that.saveReport().then(res => {
      //         window.location.href = "about:blank";
      //         window.opener.location.reload();
      //         window.close();
      //       });
      //     } else {
      //       that.saveAdminReport().then(res => {
      //         window.location.href = "about:blank";
      //         window.opener.location.reload();
      //         window.close();
      //       });
      //     }
      //   })
      //   .catch(() => {
      //     window.location.href = "about:blank";
      //     window.opener.location.reload();
      //     window.close();
      //   });
    },
    // 维护 保存
    async saveAdminReport() {
      const params = {
        ...this.dataForm,
        exeList: this.options,
        remList: this.remarks
      };
      console.log(params);
      let response = await this.$api.secreatary.partyMemLeavRep
        .saveAdminInfo(params)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "保存成功"
        });

        this.getDetail();
      } else {
        this.$message.error(response.msg);
      }
    },
    async editSaveReport() {
      let response = await this.$api.secreatary.partyMemLeavRep
        .editSaveMemLeavRep(this.dataForm)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        return true;
      } else {
        this.$message.error(response.msg);
      }
    },
    // 保存
    saveReport() {
      return new Promise((resolve, reject) => {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            this.submitFn().then(res => {
              if (res) {
                resolve(true);
              }
            });
          }
        });
      });
    },
    async submitFn() {
      const that = this;
      let response = await this.$api.secreatary.partyMemLeavRep
        .saveMemLeavRep(this.dataForm)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        that.$message({
          type: "success",
          message: "保存成功"
        });
        that.dataForm = Object.assign({}, response.data);
        that.id = response.data.id;
        that.$intent.replace(this, {
          name: "partyMemLeavRep",
          query: { id: response.data.id }
        });
        that.getDetail();
        return true;
      } else {
        that.$message.error(response.msg);
      }
    },
    // 保存之后在保存并发送
    sendReport(person, params, data) {
      console.log(person, params, data);

      this.dataForm.currentNode = params.name;
      this.dataForm.currentNodeId = params.id;
      this.dataForm.curUserAccount = person.idStr.toString();
      this.dataForm.curUserName = person.name;
      this.dataForm.curUserAccount = String(data[0].id);
      this.dataForm.handleButton = "完成并发送";
      console.log(this.dataForm);
      this.$api.secreatary.partyMemLeavRep
        .submitToSend(this.dataForm)
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "保存成功，并发送"
            });
            this.$intent.closeWindow(this);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    // 删除
    deleteReport() {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cencelButtonText: "取消"
      })
        .then(() => {
          this.$api.secreatary.partyMemLeavRep
            .delMemLeavRep({
              id: this.$route.query.id
            })
            .then(res => {
              if (res.code === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "已删除"
                });
                this.$intent.closeWindow(this);
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(() => {
              console.log("error");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    },
    // 获取详情
    getDetail() {
      this.$api.secreatary.partyMemLeavRep
        .getMemLeavRepDetail({
          id: this.$route.query.id,
          btnType: 0
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$nextTick(() => {
              // this.codeFileName = res.fileName
              // this.codeFilePath = res.filePath
              this.dataForm = res.data;
              this.options = res.exeList;
              this.backFlag1 = res.backFlag1;
              this.remarks = res.remList;
              this.dataForm.draftTime = res.data.draftTime;
              // this.dataForm.draftTime = formatData(new Date(res.data.draftTime).getTime(), 'YYYY-MM-DD')

              if (this.options.length > 0) {
                this.lastOptionTime = this.options[0].createTime;
              }
            });
            this.getArear();
            if (this.options && this.options.length) {
              this.$set(this.buttonList, 1, {
                name: "完成并发送",
                type: "wanchengfasong",
                show: false
              });
            }
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    openNewWindow(path, query) {
      if (query) {
        let { href } = this.$router.resolve({
          path: path, //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
          query: query //{id:'1111'}  // 这里写的是页面参数
        });
        window.open(href, "_blank");
      } else {
        let { href } = this.$router.resolve({
          path: path //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
        });
        window.open(href, "_blank");
      }
    },
    getArear() {
      const that = this;
      this.$api.secreatary.partyMemLeavRep
        .getEditArear({
          id: this.$route.query.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            that.huanJieMessage = res.Fields;
            that.setConfig();
            // this.$nextTick(() => {
            //   that.setConfig()
            // })
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredIdeaFields
      ); //必填控制域
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      // this.readFieelds = this.setReadFields(this.readFields, this.huanJieMessage.readFields)//不可编辑控制域
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ); //可编辑意见域
      console.log(this.requiredFields, "必填控制域");
      console.log(this.readFields, "不可编辑控制域");
      console.log(this.editedIdeaFields, "可编辑意见域");
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
      console.log(this.buttonList, "按钮");
      this.rules = {
        name: [
          {
            required: this.requiredFields.name,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: this.requiredFields.address,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        ljTime: [
          {
            required: this.requiredFields.ljTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        ljTimeDetail: [
          {
            required: this.requiredFields.ljTimeDetail,
            message: "不能为空",
            trigger: "change"
          }
        ],
        comments: [
          {
            required: this.requiredFields.comments,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        fjTime: [
          {
            required: this.requiredFields.fjTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        fjTimeDetail: [
          {
            required: this.requiredFields.fjTimeDetail,
            message: "不能为空",
            trigger: "change"
          }
        ],
        outReason: [
          {
            required: this.requiredFields.outReason,
            message: "不能为空",
            trigger: "blur"
          }
        ]
      };
    }
  }
};
</script>
<style lang="less">
.detailComments {
  position: relative;
  height: 100px;
  background: #e0e0e057;
  padding: 5px 10px;
  /* background-color:  #fff; */
  /*margin-bottom: 10px;*/
  .el-textarea {
    height: 100%;
    padding-bottom: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #8996af !important;
    }
    .el-textarea__inner {
      height: 100%;
      border: none !important;
      &:hover {
        border: none !important;
      }
    }
  }

  .finishedInfo {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    text-align: right;
    color: #606266;
    background: #e4e7ed52;
    span {
      padding-right: 10px;
    }
    .time {
      margin-top: 5px;
    }
  }
}

// 在reset.css 文件中有人设置了，位移60px，在此将其重置为0，不修改 reset.css 文件
.but_model {
  .el-message-box__btns {
    .el-button {
      transform: translateX(0px) !important;
    }
  }
}
</style>
<style scoped lang="less" rel="stylesheet/less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}

.container {
  .content-header {
    display: flex;
    font-size: 14px;
    padding: 10px;
    // border: 1px solid #f9aa21;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    p {
      padding-right: 20px;
    }
  }
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.el-col ::v-deep {
  border: 1px solid transparent;
}
.el-header {
  background-color: #409eff;
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
/*.btnstyle{*/
/*  color:rgb(14, 117, 214) ;*/
/*}*/
/*.btnstyle:hover{*/
/*  background-color: rgb(14, 117, 214);*/
/*  color: cornsilk;*/
/*}*/
.maintitle {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
.container {
  width: 1000px;
  padding-bottom: 20px;
  margin: 30px auto;
  border: 1px solid rgb(218, 215, 215);
  padding: 20px 20px;
  position: relative;
}
.c-header {
  background-color: #fef7e7;
  border: 1px solid #f9aa21;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.el-table .cell {
  white-space: pre-line;
}
.el-form-item ::v-deep {
  margin-bottom: 12px;
}

.adviceInfo {
  position: absolute;
  width: 100%;
  right: 10%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  margin: 0 16px;
}
.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
.person {
  text-align: right;
  color: #606266;
  p {
    line-height: 1.5;
    font-size: 14px;
  }
}
</style>
