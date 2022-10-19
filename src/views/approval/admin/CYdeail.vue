<template>
  <div class="qcDetail" id="shiwuzhifa">
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
    <div class="headerClick">
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
          <div class="cur_sessa">
            <!--            <p>-->
            <!--              当前环节：-->
            <!--              <span>{{this.formData.currentNode}}</span>-->
            <!--            </p>-->
            <p>
              当前处理人：
              <span>{{this.formData.curUserCn}}</span>
            </p>
            <p>
              是否跨行：
              <span>{{this.formData.isKh}}</span>
            </p>
            <el-button
              @click="viewApproval"
              type="primary"
              style="float: right;margin-right:40px;margin-top:8px;color:#fff!important"
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
                <el-input v-model="formData.approveNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="!!formData.applyNo">
              <el-form-item label="申请编号">
                <el-input v-model="formData.applyNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期">
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
              <!--              <el-button type="primary">引入</el-button>-->
              <!--              <el-button type="primary">删除</el-button>-->
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
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      :autosize="{minRow:3,maxRow:15}"
                      class="d_f1"
                    ></el-input>
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
              v-if="!(this.formData.checkOpinionList&&this.formData.checkOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
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
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      :autosize="{minRow:3,maxRow:15}"
                      class="d_f1"
                    ></el-input>
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
              v-if="!(this.formData.applyOpinionList&&this.formData.applyOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.exaunitIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!--          <el-form-item label="办理情况">-->
          <!--            <el-input type="textarea" :rows="3" v-model="formData.blIdea" :disabled="true"></el-input>-->
          <!--          </el-form-item>-->
          <!--          办理情况-->
          <el-form-item label="办理情况" prop="blIdea">
            <div v-for="item in formData.blqkOpinionList" :key="item.id" 
	    class='opinion-wrapper'
	    >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      :autosize="{minRow:3,maxRow:15}"
                      class="d_f1"
                    ></el-input>
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
              v-if="!(this.formData.blqkOpinionList&&this.formData.blqkOpinionList.length>0)"
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.blIdea"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <!--         一次传阅意见-->
          <el-form-item label="一次传阅意见">
            <el-button
              type="primary"
              size="mini"
              @click="addSucc('cyFirstOpinionList')"
              :disabled="isWeiHu"
              v-if="formData.cyFirstOpinionList&&formData.cyFirstOpinionList.length>0"
            >新增意见</el-button>
            <div class="suggStyle">
              <div
                v-bind:class="['d_flex',{'border_line':index!=(formData.cyFirstOpinionList.length-1)}]"
                v-for="(item,index) in formData.cyFirstOpinionList"
                :key="index"
              >
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-col :span="2">
                      <span>内容</span>
                    </el-col>
                    <el-col :span="19">
                      <el-input
                        :disabled="isWeiHu"
                        type="textarea"
                        v-model="item.content"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleSugg('cyFirstOpinionList',index,item.id)"
                        :disabled="isWeiHu"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.departmentName" :disabled="isWeiHu"></el-input>
                  </el-col>
                  <div style="margin-left:12px">
                    <el-col :span="2">
                      <span>用户名</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.createUser" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </div>
                  <el-col :span="2">
                    <span>提交时间</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>

          <!--          二次传阅意见-->
          <el-form-item label="二次传阅意见">
            <el-button
              type="primary"
              size="mini"
              @click="addSucc('cySecondOpinionList')"
              :disabled="isWeiHu"
              v-if="formData.cySecondOpinionList&&formData.cySecondOpinionList.length>0"
            >新增意见</el-button>
            <div class="suggStyle">
              <div
                v-bind:class="['d_flex',{'border_line':index!=(formData.cySecondOpinionList.length-1)}]"
                v-for="(item,index) in formData.cySecondOpinionList"
                :key="index"
              >
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-col :span="2">
                      <span>内容</span>
                    </el-col>
                    <el-col :span="19">
                      <el-input
                        :disabled="isWeiHu"
                        type="textarea"
                        v-model="item.content"
                        class="d_f1"
                        @change="dayin"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleSugg('cySecondOpinionList',index,item.id)"
                        :disabled="isWeiHu"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.departmentName" :disabled="isWeiHu"></el-input>
                  </el-col>
                  <div style="margin-left:12px">
                    <el-col :span="2">
                      <span>用户名</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.createUser" :disabled="isWeiHu"></el-input>
                    </el-col>
                  </div>
                  <el-col :span="2">
                    <span>提交时间</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.createTime" :disabled="isWeiHu"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!--            <div v-for="item in formData.cySecondOpinionList" :key="item.id" >-->
            <!--              <div class="d_flex">-->
            <!--                <el-row class="d_b100">-->
            <!--                  <el-col :span="24">-->
            <!--                    <el-input-->
            <!--                      type="textarea"-->
            <!--                      :value="item.content"-->
            <!--                      :disabled="true"-->
            <!--                      :autosize="{minRow:3,maxRow:15}"-->
            <!--                      class="d_f1"-->
            <!--                    ></el-input>-->
            <!--                    <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.createUser}}</span>{{item.createTime}}-->
            <!--                    </div>-->
            <!--                  </el-col>-->
            <!--                </el-row>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <el-input type="textarea" v-if="!(this.formData.cySecondOpinionList&&this.formData.cySecondOpinionList.length>0)" :autosize="{minRow:3,maxRow:15}" v-model="formData.secondCyidea" :disabled=this.secCYidea></el-input>-->
          </el-form-item>
          <!--          <el-form-item label="二次传阅意见">-->
          <!--            <el-input type="textarea" :rows="3" v-model="formData.secondCyidea"></el-input>-->
          <!--          </el-form-item>-->
          <!--          传阅说明-->
          <el-form-item label="传阅说明">
            <div v-for="item in formData.cyExplainList" :key="item.id"   class='opinion-wrapper'
>
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :value="item.cyExplain"
                      :disabled="true"
                      :autosize="{minRow:5,maxRow:15}"
                      class="d_f1"
                    ></el-input>
                    <div class="adviceInfo">
                      {{item.departName }}
                      <span class="pad_lr10">{{item.curUserCn}}</span>
                      {{item.updateTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-input
              type="textarea"
              v-if="!(this.formData.cyExplainList&&this.formData.cyExplainList.length>0)"
              :autosize="{minRow:5,maxRow:15}"
              :disabled="true"
              v-model="formData.cyExplain"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <div v-for="item in formData.markList" :key="item.id"  class='opinion-wrapper'
 >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      :autosize="{minRow:3,maxRow:15}"
                      class="d_f1"
                    ></el-input>
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
              :autosize="{minRow:3,maxRow:15}"
              v-model="formData.mark"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-col :span="24">
            <el-form-item label="一次传阅人员" style="margin-top:20px">
              <el-row>
                <el-form-item>
                  <el-input v-model="formData.firstCyPerson" :disabled="true"></el-input>
                </el-form-item>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="二次传阅人员" style="margin-top:20px">
              <el-row>
                <el-col>
                  <el-form-item label="未阅">
                    <el-input v-model="formData.secondUnreadPersion" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="已阅">
                    <el-input v-model="formData.secondReadPersion" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <h6 class="bank_dispach_file_tit">附件</h6>
          <div id="scfj" class="height_90"></div>
          <el-row>
            <el-form-item>
              <el-col :span="24">
                <!--                <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>-->
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
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from "components/tree/tree-fawen";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
import exportTable from "../../../minixs/exportTable";

export default {
  name: "qcDetail",
  components: {
    selectPerson
  },
  mixins: [openOrDownLoadFile,viewDraft],
  data() {
    return {
      isWeiHu: true,
      isapplyNo: false,
      firCYidea: true,
      secCYidea: true,
      isShow: false,
      rowData: {},
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
        title:"",
        cySecondOpinionList: [],
        cyFirstOpinionList: []
      },
      khType: "",
      buttonList: [
        { name: "保存", show: false },
        { name: "维护", show: true },
        // {name:'修改申请',show:false},
        // {name:"查看流程",show:true},
        // {name:"流程调度",show:true},
        { name: "打印处理单", show: true },
        { name: "收藏", show: true }
      ],
      id: "",
      zfId: "",
      numyear:this.$route.query.numyear?this.$route.query.numyear:'',
    };
  },
  computed: {},
  methods: {
    dayin() {
      console.log("3333333333333");
    },
    //新增意见
    addSucc(range) {
      let AdepartmentName = this.formData.depName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AuserName = JSON.parse(localStorage.getItem("userInfo")).humanName;
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD");
      switch (range) {
        case (range = "cySecondOpinionList"):
          this.formData.cySecondOpinionList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "5"
          });
          this.$forceUpdate();
          break;
        case (range = "cyFirstOpinionList"):
          this.formData.cyFirstOpinionList.push({
            content: "",
            departmentId: this.formData.depId,
            departmentName: AdepartmentName,
            createUser: AcreateUser,
            createTime: AcreateTime,
            type: "3"
          });
          this.$forceUpdate();
          break;
      }
      console.log(
        "----------cySecondOpinionList------->",
        this.formData.cySecondOpinionList
      );
    },
    //删除意见
    deleSugg(sugg, n, dataId) {
      console.log("sugg:", sugg, "n:", n);
      this.$confirm("是否确定删除当前传阅意见?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (dataId) {
            this.$api.checkLz.adminDeleSugg({ id: dataId }).then(res => {
              if (res.code == "SUCCESS") {
                this.formData.mark = "";
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.queryDeal();
              }
            });
          } else {
            switch (sugg) {
              case (sugg = "cySecondOpinionList"):
                this.formData.cySecondOpinionList.splice(n, 1);
                this.$forceUpdate();
                break;
              case (sugg = "cyFirstOpinionList"):
                this.formData.cyFirstOpinionList.splice(n, 1);
                this.$forceUpdate();
                break;
            }
          }
        })
        .catch(() => {});
    },
    handleClose() {
      this.isdialogCY = false;
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.$intent.closeWindow(this);
          break;

        case "查看流程":
          this.$api.checkLz
            .flowDeal({
              workFlowId: this.formData.workFlowId,
              id: this.formData.id,
              numYear:this.numyear
            })
            .then(res => {
              this.showFlowChart = true;
              this.tableData = res.list;
              this.$nextTick(() => {
                this.$refs.dialogLine.openDialog();
              });
            });
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
          //   "shiwuzhifa",
          //   this.$businessCode.fawglfj,
          //   shiwutitle,
          //   that
          // );
          break;
        case "流程调度":
          this.flowAlter();
          break;
        case "维护":
          this.isWeiHu = false;
          this.buttonList[0].show = true;
          // this.buttonList[1].show=true
          // this.buttonList[2].show=true
          break;
        case "保存":
          this.saveData();
          break;
      }
    },
    //操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "SWSP"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
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
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile.fileName;
      self.bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
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
    closeData() {
      this.$intent.closeWindow(this);
    },
    //申请跳转
    doDraft(fileInfo) {
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
      let data = this.$router.resolve({
        path: "/openAndSave_WordTs",
        query: {
          state: this.shiwuState,
          id: this.id,
          isKh: this.formData.isKh.toString(),
          zhengWenState: fileInfo.ifView,
          JYcode: "A08462002",
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "",
          multiTenancyId: "000076767qwq0",
          cleanDraftFlag: true,
          showBtns: fileInfo.ifView == 0 ? false : true,
          serverUrl: "128.192.221.164",
          saveNameAndNumber:
            (saveDataSums?saveDataSums
              : "") + this.formData.title
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
      this.viewFile(file,true,(saveDataSums) + this.formData.title);
    },
    //    查看审批说明
    viewApproval() {
      if (this.formData.manageSystemName && this.formData.manageSystemPath) {
        let file = {
          fileName: this.formData.manageSystemName,
          filePath: this.formData.manageSystemPath
        };
        this.viewFile(file,true);
      } else {
        this.$message({
          type: "warning",
          message: "暂无审批说明文档"
        });
      }
    },
    //保存数据
    saveData() {
      if (this.id) {
        this.formData.opinionList = [
          ...this.formData.cyFirstOpinionList,
          ...this.formData.cySecondOpinionList,
        ];
        this.$api.checkLz.checkCYAlter({...this.formData,'adminType':'admin'}).then(res => {
          if (res.code == "SUCCESS") {
            this.queryDeal();
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
          this.queryDeal();
        });
    },
    printForm() {
      let rowData = {numYear:this.numyear};
      rowData.title =(this.formData.unitName || this.formData.curbank) +this.formData.applyProjectName +"审批处理单";
      rowData.id = this.id;
      rowData.idKh = this.formData.isKh;
      rowData.iscy=true;
      let copyRow = JSON.stringify(rowData);
      if (this.formData.isKh == '否') {
        this.$intent.goNewPage(this, {path: "/shiwuBenhang",query: { data: copyRow }});
      } else if (this.formData.isKh == '是') {
        this.$intent.goNewPage(this, {path: "/shiwuBenhangkh",query: { data: copyRow }});
      }
    },
    //请求详情
    queryDeal() {
      this.$api.checkLz
        .checkCYDeal({
          id: this.id,
          parentId: this.rowData.parentId,
           curbankId:this.$route.query.curbankId,
           numYear:this.numyear
        })
        .then(res => {
          this.zfId = res.zfId;
          this.formData = res.data;
          //新增意见部门及ID
          this.formData.depName = res.depName;
          this.formData.depId = res.depId;
          this.$nextTick(() => {
            this.$set(
              this.formData,
              "cyFirstOpinionList",
              res.cyFirstOpinionList
            );
            this.$set(
              this.formData,
              "cySecondOpinionList",
              res.cySecondOpinionList
            );
          });
          this.formData.markList = res.markList;
          this.formData.applyOpinionList = res.applyOpinionList;
          this.formData.checkOpinionList = res.checkOpinionList;
          this.formData.blqkOpinionList = res.blqkOpinionList;
          if (this.formData.isKh == "0") {
            this.isapplyNo = false;
            this.formData.isKh = "否";
          } else {
            this.isapplyNo = true;
            this.formData.isKh = "是";
          }

          if (this.formData.cyCount == "1") {
            this.firCYidea = false;
            this.secCYidea = true;
          } else if (this.formData.cyCount == "2") {
            this.firCYidea = true;
            this.secCYidea = false;
          }
          this.formData.xksqFileName = res.xksqFileName;
          this.formData.xksqFilePath = res.xksqFilePath;
          this.getFileList();
        });
    },
    //传阅请求树
    finAndSend() {
      this.dialogState = true;
      this.$api.checkLz
        .CYqueryPerTree({
          ccbToken: localStorage.getItem("st")
        })
        .then(res => {});
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
        data &&
          data.map(item => {
            id_name.push(item.id + "_" + item.name);
            chooseDataName.push(item.name);
            chooseDataId.push(item.id);
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
              this.queryDeal();
            }
          });
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
          this.isdialogCY = true;
          this.perCode = res.list;
        });
    },
    //传阅收回
    CYBacksure() {
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
            this.queryDeal();
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
      if (scrolled < this.distance_wjys) {
        this.active = "#wjys";
      } else if (
        scrolled >= this.distance_wjys - 200 &&
        scrolled < this.distance_qpyj
      ) {
        this.active = "#qpyj";
      } else {
        this.active = "#scfj";
      }
    },

    //附件上传
    //附件块
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.zfId,
          numYear:this.numyear
        })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.formData, "attchmentFileInfo", res.data);
          });
        });
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n - 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n - 1
      ];
      this.formData.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n + 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n + 1
      ];
      this.formData.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    deleteRow(n, id) {
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify({ id: id, function: "deleteFileById" }),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.formData.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
          });
      });
    }
  },
  activated() {},
  mounted() {
    // this.handleSetLoacl();
  },
  created() {
    if (this.$route.query.type) {
      this.fromType = this.$route.query.type;
      this.rowData = JSON.parse(this.$route.query.data);
      this.id = this.rowData.id;
      this.queryDeal();
    }
  },
  mounted() {
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
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}

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

      .cur_sessa {
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

.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
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
  height: 50px;
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
</style>
<style lang="less" rel="stylesheet/less">
.el-message-box__btns .el-button:last-child{
  transform: translateX(-68px)!important;
}
</style>