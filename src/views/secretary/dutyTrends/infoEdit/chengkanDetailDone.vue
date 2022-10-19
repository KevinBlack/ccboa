<!--
 * @Author: zj
 * @Date: 2020-10-22 17:39:33
 * @LastEditTime: 2021-12-13 16:18:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\dutyTrends\cqNotice\formNotice.vue
--> 
<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="closeWindow">
        <i class="el-icon-arrow-left"></i>成刊编辑
      </div>
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="closeWindow">关闭</el-button>
        <el-button @click="handleSave" v-if="!isNeedButton" class="bank_grid_comtent_active">保存</el-button>
        <el-button @click="checkMain" v-if="activeName2" class="bank_grid_comtent_active">查看正文</el-button>
        <el-button @click="handleGetBack" v-if="flag" class="bank_grid_comtent_active">发布收回</el-button>
        <el-button @click="handleMaintain" v-if="activeName1" class="bank_grid_comtent_active">维护</el-button>
        <el-button @click="handleDispatch" v-if="activeName" class="bank_grid_comtent_active">流程调度</el-button>
        <el-button @click="GetBack" v-if="reciveFlag==true&&banjieyiban=='tabs-doing'" class="bank_grid_comtent_active">收回</el-button> 
        <!-- 发布收回 需要跟对应的人 -->
        <el-button
          @click="endFile"
          v-if="this.dataFromQuery('activeName') === 'tabs_done'"
          class="bank_grid_comtent_active"
        >归档</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div ref="printArea" id="printArea">
      <div class="formHeader">
        <div class="title-text">{{ this.formTitle }}</div>
      </div>
      <div class="process_content" id="bank_dispach_content">
        <div class="cur_box">
          <div class="cur_sess">
            <p>
              当前环节：
              <span>{{this.formData1.currentNode}}</span>
            </p>
            <p>
              当前处理人：
              <span>{{this.formData1.currentUser}}</span>
            </p>
          </div>
        </div>

        <div id="wjys" class="height_90"></div>
        <el-form ref="ruleForm" :model="formData1" :rules="rules" label-width="120px">
          <el-row v-if="this.dataFromQuery('activeName') === 'tabs_done'&&this.dataFromQuery('sourceRouteName') === 'managerCheckArticle'">
            <el-col :span="12">
              <el-form-item label="是否归档" prop="onFileFlag" class="no-print">
                <el-radio-group v-model="formData1.onFileFlag" :disabled="isDisabled">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否收取" prop="extractFlag" class="no-print">
                <el-radio-group v-model="formData1.extractFlag" :disabled="isDisabled">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿人" prop="editorName">
                <el-input v-model="formData1.editorName" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="tel">
                <el-input v-model="formData1.tel" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主办部门" prop="zbDept">
                <el-input v-model="formData1.zbDept" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编辑时间" prop="createDate">
                <el-input v-model="formData1.createDate" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div v-show="this.$route.query.isflg !== 'fei'">
            <el-form-item label="审批意见">
              <el-button
                type="primary"
                size="mini"
                @click="addSucc('qfIdea')"
                :disabled="isDisabled"
              >新增意见</el-button>
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(formData1.qfIdea.length-1)}]"
                  v-for="(item,index) in formData1.qfIdea"
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
                          @click="deleSugg('qfIdea',index,item.id)"
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
                      <!-- unitName?item.unitName+'/'+item.departmentName:item.departmentName -->
                      <el-input v-model="item.departmentName" :disabled="isDisabled"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.unitName" :disabled="isDisabled"></el-input>
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

            <!-- 备注 -->
            <el-form-item label="备注">
              <el-button type="primary" @click="addSucc('remark')" :disabled="isDisabled">新增意见</el-button>
              <div class="suggStyle">
                <div
                  v-bind:class="['d_flex',{'border_line':index!=(formData1.remark.length-1)}]"
                  v-for="(item,index) in formData1.remark"
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
                      <!-- unitName?item.unitName+'/'+item.departmentName:item.departmentName -->
                      <el-input v-model="item.departmentName" :disabled="isDisabled"></el-input>
                    </el-col>
                    <div style="margin-left:12px">
                      <el-col :span="2">
                        <span>用户名</span>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.unitName" :disabled="isDisabled"></el-input>
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
          </div>

          <div v-show="this.$route.query.isflg == 'fei'">
            <el-form-item label="审批意见" prop="qfIdeaIn">
              <!-- 没有意见也要有框框 -->
              <div style="margin-bottom: 3px" v-show="formData1.qfIdea.length=='0'">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        v-model="formData1.qfIdeaIn"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- 有意见展示 -->
              <div
                v-for="item in formData1.qfIdea"
                :key="item.id"
                v-show="formData1.qfIdea.length"
              >
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        v-model="item.content"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo" v-if="!activeName1">
                        <el-row>
                          {{item.departmentName}}
                          <span class="pad_lr10">{{item.createUser}}</span>
                        </el-row>
                        <el-row>{{item.createTime}}</el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="备注" prop="remarkIn">
              <!-- 没有备注也要显示框框 -->
              <div style="margin-bottom: 3px" v-show="formData1.remark.length=='0'">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        v-model="formData1.remarkIn"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- 有意见显示 -->
              <div
                v-for="item in formData1.remark"
                :key="item.id"
                v-show="formData1.remark.length"
              >
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="isDisabled"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo" v-if="!activeName1">
                        <el-row>
                          {{item.departmentName}}
                          <span class="pad_lr10">{{item.createUser}}</span>
                        </el-row>
                        <el-row>{{item.createTime}}</el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
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

    <!-- @description: 选择机构树  -->
    <org-tree
      v-model="modal"
      title="请选择发布范围"
      :isSingle="false"
      :orgOrDept="2"
      :orgOrDeptId="currentUserInfo.unitId"
      @orgList="handleOnOrgsSelectOk"
    ></org-tree>
  </div>
</template>

<script>
import selectPerson from "components/tree/treeTansun";
import selectPerson1 from "components/viewFlow/dispatchTree"; //流程调度树
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import lookBody from "@/minixs/exportTableQueryScript";
import minixs from "@/minixs/index";
import orgTree from "components/tree/orgTree";
import asAPublicationDetailMixin from "./mixins/as-a-publication-detail-mixin";
// import viewDraft from "@/minixs/viewDraft";
export default {
  name: "asAPublicationDetailDone",
  components: {
    shiwuFlow,
    selectPerson,
    orgTree,
    "select-person1": selectPerson1
  },
  mixins: [minixs, asAPublicationDetailMixin, lookBody],
  data() {
    return {
      reciveFlag:false,
      isCurrentUser:false,
      isShowEndFile: false,
      selsecOrgOrDeptId: "",
      flag: false,
      activeName: "",
      banjieyiban: "",
      activeName1: "",
      activeName2: "",
      // 是否流程调度
      isDispatch: false,
      // 是否需要按钮
      isNeedButton: true,
      // 是否禁用表单
      isDisabled: true,
      isRead:false,//是否已读
      buttonList: [
        { name: "查看流程", type: "chakanliucheng" },
        { name: "收藏", type: "shoucang" },
        // { name: "打印处理单", type: "dayinchulidan" },
        { name: "操作指南", type: "caozuozhinan" },
        // { name: "发布收回", type: "fabushouhui" },
        // { name: "收回", type: "shouhui" },
      ]
    };
  },
  created() {
    this.banjieyiban = this.dataFromQuery("activeName");
    console.log("banjieyiban",this.banjieyiban);
    this.activeName = this.dataFromQuery("activeName") === "tabs_roam";
    this.activeName1 =
      this.dataFromQuery("activeName") === "tabs_roam" ||
      this.dataFromQuery("activeName") === "tabs_done";
    this.activeName2 =
      this.dataFromQuery("activeName") === "tabs-doing" ||
      this.dataFromQuery("activeName") === "tabs-end" ||
      this.$route.query.isflg != "fei";
    this.topData = {
      name: this.currentUserInfo.humanName
    };
    this.loadData();
  },
  methods: {
    //  已办收回
    GetBack() {
      this.$api.duty.chengKanRecycle({id:this.formData1.id})
      .then(res=>{
          this.$message({
                  message: "收回成功",
                  type: "success"
             });
          let idstr = this.formData1.id || this.$route.id
          let routeIdList = JSON.parse(localStorage.getItem('routeIdList'))
          if(routeIdList&& routeIdList.length >0) {
            routeIdList.forEach((item,index)=>{
              if(item == idstr) {
                routeIdList.splice(index,1)
              }
            })
          }
          localStorage.setItem('routeIdList',routeIdList)
          
          this.$intent.closeWindow(this);
      })
    },
    /** @description: 处理发布收回 办结 */
    handleGetBack() {
      console.log("shouhio");
      if (typeof this.formData1.wfeWork === "string") {
        this.formData1.wfeWork = JSON.parse(this.formData1.wfeWork);
      }
      this.$api.duty
        .asAPublicationGetBack({
          ...this.formData1
        })
        .then(_ => {
          this.$message.success("收回成功");
          this.$intent.closeWindow(this);
          // // this.gotoPublishedPage(this.previousRouteName)
          // this.$intent.replace(this, {
          //     path: "/secretary/dutyTrends/infoEdit/chengKan",
          //     query:{activeName:"tabs-todo"}
          // });
          // this.$router.push({
          //     path: "/secretary/dutyTrends/infoEdit/chengKan",
          //     query:{activeName:"tabs-todo"}
          // })
        });
    },
    // 新增意见
    addSucc(range) {
      let AdepartmentName =
        JSON.parse(localStorage.getItem("userInfo")).shortUnitName +
        "/" +
        JSON.parse(localStorage.getItem("userInfo")).shortFirstUnitName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AuserName = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD HH:MM:SS");
      switch (range) {
        case (range = "qfIdea"):
          this.formData1.qfIdea.push({
            content: "",
            departmentId: this.formData1.depId,
            unitName: AdepartmentName,
            createUser: AcreateUser,
            remarkTime: AcreateTime,
            type: "1"
          });
          break;
        case (range = "remark"):
          this.formData1.remark.push({
            content: "",
            departmentId: this.formData1.depId,
            unitName: AdepartmentName,
            createUser: AuserName,
            remarkTime: AcreateTime
          });
          break;
      }
    },
    // 删除备注域
    deleMark(n, dataId) {
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.duty.delItem({id:dataId}).then(res=>{
            this.loadData();
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
          this.$api.duty.delItem({id:dataId}).then(res=>{
            this.loadData();
          })
        })
        .catch(() => {});
    },

    lookBody() {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = this.formData1.fileName;
      bank_doDownloadFile.filePath = this.formData1.filePath;
      console.log(bank_doDownloadFile, "获取查看正文路径bank_doDownloadFile");
      let id = this.formData1.id;
      this.doDraftLook(id, bank_doDownloadFile, this.formData1.title);
    },
    // 查看正文
    checkMain() {
      if (this.formData1.fileName) {
        this.lookBody();
        // const fileName = this.formData1.fileName;
        // const filePath = this.formData1.filePath;
        // this.openDocumentWithGoldCellPlugin(this.formData1.id, {filePath, fileName}, '0', false, 'chengkanDetailDone', this.formData1)
      } else {
        this.$message.warning("无正文模板");
      }
    },
    // 流程调度
    handleDispatch() {
      this.$api.duty.queryFlowNode({ id: this.formData1.id }).then(res => {
        this.isDispatch = true;
        this.dialogState = true;
        console.log("打印数据", res);
        this.seletOptionsData = res.data;
      });
    },
    // 维护
    handleMaintain() {
      this.isNeedButton = false;
      this.isDisabled = false;
    },
    //  保存
    handleSave() {
      this.save_btn();
    },

    closeWindow() {
      // this.$confirm("确认关闭当前页面吗?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.save_btn();
      // this.gotoPublishedPage(this.previousRouteName)
      this.$intent.closeWindow(this);
      //   this.$intent.replace(this, {
      //       path: "/secretary/dutyTrends/infoEdit/chengKan",
      //   });
      // })
    },
    /** @description: 选人成功 */
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, "params", params, dtype);
      if (status) {
        let param = {
          id: this.formData1.id,
          nextUserId: data[0].id,
          nextUserName: data[0].name,
          nextAvyId: params.id,
          nextAvyName: params.name,
          remarkIn: this.formData1.remarkIn,
          qfIdeaIn: this.formData1.qfIdeaIn
        };
        this.$api.duty.finishSubmitTosure({ ...param }).then(res => {
          this.dialogState = false; /** @description: 关闭选人弹窗 */
          this.$message({
            message: "完成并发送成功",
            type: "success"
          });
          if (this.isDispatch) {
            this.$router.push({
              path: "/secretary/dutyTrends/managerCheck/article"
            });
          } else {
            this.$router.push({
              path: "/secretary/dutyTrends/infoEdit/chengKan"
            });
          }
        });
      } else {
        this.dialogState = false; /** @description: 关闭选人弹窗 */
      }
    },
    /** @description: 加载详情 */
    async loadData() {
      console.log(this.dataFromQuery("isflg"), "是不是管理员");
      this.formData1 = this.formData1 || {};
      if (!this.processLogicAfterQuitFromGoldCell(this.formData1)) {
        if (this.dataFromQuery("isType") === "deal") {
          let obj = this.dataFromQuery("detail");
          console.log(obj, "详情数据");
          let draftDepartment = this.dataFromQuery(
            "draftDepartment",
            "string"
          ); /** @description: 主办部门 */
          this.xxcbBxgjId = this.dataFromQuery("xxcbBxgjId");
          this.formData1 = obj;
          this.formData1.remark = this.convertToListOrObj(
            this.formData1.remark
          );
          this.formData1.qfIdea = this.convertToListOrObj(
            this.formData1.qfIdea
          );
          this.formData1.currentNode = "刊物编辑";
          this.formData1.zbDept = draftDepartment; /** @description: 主办部门赋值 */
        } else if (this.dataFromQuery("isType") === "chengkan") {
          this.formData1 = this.dataFromQuery("detail")??{remark:'',qfIdea:'',id:this.$route.query.id};
         this.formData1.remark = this.convertToListOrObj(
            this.formData1.remark
          );
          this.formData1.qfIdea = this.convertToListOrObj(
            this.formData1.qfIdea
          );
          // 避免审核意见没有输入框
          // if(this.formData1.qfIdea.length > 0){
          //   this.formData1.qfIdea.push({})
          // }
        }

      }
     
     if(this.$route.query.detail){
        var IDchenkan =this.formData1.id || JSON.parse(this.$route.query.detail).ID;
     }else{
        var IDchenkan =this.formData1.id || this.$route.query.id;
     }
      // var IDchenkan =this.formData1.id || JSON.parse(this.$route.query.detail).ID;
      //获取成刊详情
        let params=this.dataFromQuery('activeName')==='tabs-doing'?{id:IDchenkan,filterState:2}:{id:IDchenkan}  
      await this.$api.duty.periodicalQuery(params).then(res => {
        this.formData1 = this.formData1 = {
          ...this.formData1,
          ...((res && res.order) || {})
        };
        this.isRead=res?.order.isRead;
        this.reciveFlag = res.reciveFlag;
        console.log(this.reciveFlag);
        
        this.formData1.remark = res.remarkList;
        this.formData1.qfIdea = res.checkList;
        this.formData1.currUserDept = this.formData1.currentUser;
        if (
          this.dataFromQuery("activeName") === "tabs-end" &&
          res.humanCode ==
            JSON.parse(localStorage.getItem("userInfo")).humanCode
        ) {
          this.flag = true;
        }
      });

      this.formData1.zbDept =
        typeof this.formData1.zbDept === "object" ? "" : this.formData1.zbDept;
      // this.formData1.remark = this.convertToListOrObj(this.formData1.remark)
      // this.formData1.qfIdea = this.convertToListOrObj(this.formData1.qfIdea)

      this.formData1.onFileFlag =
        this.formData1.onFileFlag === "" ? "0" : this.formData1.onFileFlag;
      this.formData1.extractFlag =
        this.formData1.extractFlag === "" ? "0" : this.formData1.extractFlag;
      this.isShowEndFile = this.formData1.onFileFlag === "0" ? true : false;
      this.selsecOrgOrDeptId = this.formData1.draftOrganId;
      console.log("chengkanDetail:formData1", this.formData1);
      const commonReqData = {
        route: "00002",
        multiTenancyId: "CN026"
      };
      const reqData = !this.formData1.id
        ? {
            ...commonReqData,
            route: "00001"
          }
        : {
            ...commonReqData,
            id: this.formData1.id,
            route: this.dataFromQuery("isType") === "deal" ? "00001" : "00002"
          };
       this.isCurrentUser=this.formData1.currentUserId!=JSON.parse(localStorage.getItem('userInfo')).humanId;
      //获取控制域
      this.$api.duty.getRight(reqData).then(res => {
        this.huanJieMessage = res.resultMap;
        this.setConfig();
        this.initRule();
      });
    },
    /** @description: 设置控制域 */
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredIdeaFields
      );
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); /** @description: 不可编辑控制域 */
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtons
      );
    },
    endFile() {
      this.$api.duty.endFiles({ id: this.formData1.id }).then(res => {
        console.log(res);
        this.loadData();
      });
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
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2013;
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
.wrap {
  position: relative;
  width: 44%;
  height: 500px;
  z-index: 2024;
  left: 25%;
  top: -417px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  background-color: white;
}
.tableList {
  padding: 10px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: auto;
  height: 400px;
  margin-bottom: 20px;
  .top {
    margin-bottom: 20px;
  }
}
.headerClick {
  background: #409eff;
  color: white;
  width: 100%;
  height: 70px;
  line-height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  justify-content: space-between;
  align-items: center;

  .left {
    margin-left: 20px;
  }

  .right {
    margin-right: 20px;
    float: right;
  }
}
.tex {
  color: #bbbaba;
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.zfTwo {
  background: white;
  margin: 0 auto;
  padding-bottom: 150px;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;
    margin-top: 40px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }
  }

  .process_content {
    width: 80%;
    /** @description: min-height: 920px; */
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
          display: inline-block;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
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
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  float: left;
  width: 80%;
  border-right: 1px solid #ccc;
  .con-left-p1 {
    width: 12%;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 1px solid #ccc;
    border-left: 0;
    border-top: 0;
  }
  .con-left-p2 {
    width: 88%;
    height: 30px;
    line-height: 30px;
    float: left;
    border-bottom: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
}
.con-right {
  float: left;
  width: 20%;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.chuanyue1 {
  border-bottom: 1px solid #ccc;
}
.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  height: 50px;
  line-height: 50px;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
}
.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
  }
}
/deep/.radio-form .el-radio {
  margin: 10px;
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
