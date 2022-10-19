
<!--
 * @Author: your name
 * @Date: 2020-10-14 09:00:42
 * @LastEditTime: 2020-12-10 15:16:52
 * @LastEditors: Please set LastEditors
 * @Description:待办
 * @FilePath: \OAh:\oa2\src\views\secretary\leaderWtitten\electronicRegistration.vue
--> 
<template>
  <div class="selectDept" id="leader">
    <!-- header:页头，功能区 -->
    <el-header>
      <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="6">
          <div class="back" @click="backMarkMgr">
            <i class="el-icon-arrow-left"></i>
            <span>实物登记</span>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="headerClick">
            <el-button plain class="bank_grid_comtent_active" @click="closeWindow()">关闭</el-button>

            <!-- <el-button
              v-for="(item,index) in headerBtnList"
              @click="headerBtnClick(item.name)"
              :key="index"
              plain
            >{{item.name}}</el-button>-->
            <el-button
              class="bank_grid_comtent_active"
              v-for="(item,index) in headerBtnList"
              @click="headerBtnClick(item.name)"
              :key="index"
              v-show="headerBtnList[index].show"
              plain
            >{{item.name}}</el-button>
            <!-- <el-button
              v-for="(item, index) in headerBtnList"
              :key="index"
              @click="headerBtnClick(item)"
              plain
            >{{item}}</el-button>-->
            <!-- <el-button v-show="this.isREadFlag==='0'" @click="toShou">收回</el-button> -->
          </div>
        </el-col>
      </el-row>
    </el-header>
    <div class="formHeader">
      <div class="title-text">{{this.formData.unitName}}领导批示登记表</div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{this.formData.curNodeName}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{this.formData.curHandlerCnName}}</span>
          </p>
        </div>
      </div>
      <el-form ref="elForm" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="文件标题" prop="title">
              <el-input v-model="formData.title" :disabled="readFields.wenjianbiaoti"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="文号" prop="documentNo">
              <el-input
                style="padding-left:26px"
                v-model="formData.documentNo"
                :disabled="readFields.wenhao"
              ></el-input>
              <!-- <el-input
                style="padding-left:26px"
                v-model="formData.documentNo"
                :disabled="canInput"
              ></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="文件类型" prop="documentType">
              <el-select
                v-model="formData.documentType"
                placeholder="请选择"
                :disabled="readFields.wenjianleixing"
              >
                <!-- <el-select v-model="formData.documentType" placeholder="请选择" :disabled="canInput"> -->
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="主办部门" prop="zbDept">
              <!-- <select-org-or-dept @select="selectDept" :orgOrDept="0" orgOrDeptId="111111111">
                <el-input
                  :disabled="readFields.zhubanbumen"
                  readonly
                  type="text"
                  placeholder="请选择部门"
                  v-model="formData.zbDept"
                  suffix-icon="el-icon-arrow-down"
                />
               
              </select-org-or-dept>-->
              <el-select
                v-model="formData.zbDept"
                placeholder="请选择"
                :disabled="readFields.zhubanbumen"
                @change="changZb"
              >
                <el-option
                  v-for="item in hqDepts"
                  :key="item.zbDeptId"
                  :label="item.zbDept"
                  :value="item.zbDept"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="联系人" prop="contact">
              <el-input
                style="padding-left:14px"
                v-model="formData.contact"
                :disabled="readFields.peoson"
              ></el-input>
              <!-- <el-input style="padding-left:14px" v-model="formData.contact" :disabled="canInput"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="formData.tel" :disabled="readFields.phoneNum"></el-input>
              <!-- <el-input v-model="formData.tel" :disabled="canInput"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="成文日期" prop="createDate">
              <el-date-picker
                :disabled="readFields.dataDay"
                v-model="formData.createDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
              <!-- <el-date-picker
                :disabled="canInput"
                v-model="formData.createDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>-->
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="领导批示" prop="leaderOpinion">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入批示意见"
                v-model="formData.leaderOpinion"
                :disabled="readFields.LDPSidea"
              ></el-input>
              <div v-for="item in formData.opinion" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">
                        <span class="pad_lr10">
                          <span style="display:inline-block;margin-right:15px">{{item.deptName}}</span>
                          {{item.leaderName}}
                        </span>
                        <br />
                        <span style="margin-top: 5px;">{{item.createTime}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="领导批示" prop="leaderOpinion">
              <el-row>
                <el-input
                  type="textarea"
                  v-model="formData.leaderOpinion"
                  :disabled="readFields.LDPSidea"
                ></el-input>
              </el-row>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item, index) in formData.opinion"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.leaderName}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="取文部门" prop="getDocDept">
              <el-input v-model="formData.getDocDept" :disabled="readFields.quwenbumen"></el-input>
              <!-- <el-input v-model="formData.getDocDept" :disabled="canInput"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                :rows="4"
                :disabled="readFields.Remark"
                placeholder="请输入备注"
                v-model="formData.remark"
              ></el-input>
              <div v-for="item in formData.remarkList" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">
                        <span class="pad_lr10">
                          <span style="display:inline-block;margin-right:15px">{{item.deptName}}</span>
                          {{item.leaderName}}
                        </span>
                        <br />
                        <span style="margin-top: 5px;">{{item.createTime}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row>
                <el-input type="textarea" v-model="formData.remark" :disabled="readFields.Remark"></el-input>
              </el-row>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item, index) in formData.remarkList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.leaderName}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <select-person
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :checkOrg="checkOrg"
      :loadingTree="loadingTree"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :fromdata="formData1"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <!-- 查看流程 -->
    <!-- <timeDialog :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></timeDialog> -->
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>

    <!-- 是否返回给上一级弹框   oldUserName-->
    <el-dialog title="任务详情" :visible.sync="dialog1" width="30%" :before-close="close">
      <el-input type="textarea" placeholder="填写任务详情可输入125字" maxlength="125" v-model="orderdetail"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="submit(scope.row)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import FdForm from "vue-elementui-freedomen/components/form";
// import selectOrgOrDept from "components/select/selectOrgOrDept";
import selectPerson from "components/tree/treeTansun";
import exportTable from "@/minixs/exportTable";
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import minixs from "@/minixs/index";

import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "registerKindTable",
  components: {
    // FdForm,
    // selectOrgOrDept,
    shiwuFlow,
    selectPerson
  },
  mixins: [minixs, openOrDownLoadFile,viewDraft],
  props: {},
  watch: {
    $route() {
      this.type = this.$route.params.id;
    }
  },
  data() {
    // 验证手机号
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
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      bFlag: false, //控制弹框字段
      backFlag1: "", //返回给上一级弹框 显示与隐藏字段
      hqDepts: [],
      saveFlag: false,
      // workFlowId: "",
      rules: {},
      btnType: "",
      canInput: false,
      id: "",
      isREadFlag: "",
      showFlowChart: false, // 查看流程弹框默认不显示
      hasRadio: false, //是否单选
      tableData: [], // 流程数据
      // 完成并发送
      treeData: [], // 树数据
      checkOrg: false,
      seletOptionsData: [], // 下一处理环节下拉数据
      offenUse: true,
      dialogType: "dosend",
      canTab: false,
      loadingTree: "true",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 选人单选true 多选为false
      dialogTypeNow: "next",
      formData1: {
        activityType: []
      },
      options: [
        // (1:发文,2:收文,3:签报,4:其他)
        {
          value: "1",
          label: "发文"
        },
        {
          value: "2",
          label: "收文"
        },
        {
          value: "3",
          label: "签报"
        },
        {
          value: "4",
          label: "其他"
        }
      ],
      isAdd: JSON.parse(this.$route.query.isAdd),
      headerBtnList: [
        { name: "保存", type: "baocun", show: false },

        { name: "完成并发送", type: "wanchengbingfasong", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "chakanliucheng", show: false },
        { name: "打印处理单", type: "dayinchulidan", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false }
      ],

      // fromformdata: JSON.parse(this.$route.query.type),
      // type: this.$route.params.id,
      formCfg: [
        { type: "input", prop: "title", label: "文件标题", span: 24 },
        { type: "input", prop: "documentNo", label: "文号", span: 8 },
        {
          type: "select",
          prop: "documentType",
          option: "1,3,2",
          label: "文件类型",
          span: 8
        },
        {
          type: "select",
          prop: "zbDept",
          option: "1,3,2",
          label: "主办部门",
          span: 8
        },
        { type: "input", prop: "contact", label: "联系人", span: 8 },
        { type: "input", prop: "tel", label: "联系电话", span: 8 },
        {
          type: "date",
          prop: "createDate",
          label: "成文日期",
          span: 8,
          style: { width: "200px" }
        },
        {
          type: "input-area",
          prop: "127",
          label: "领导批示",
          span: 24,
          config: { rows: 4 }
        },
        { type: "input", prop: "126", label: "取文部门", span: 24 },
        { type: "input", prop: "126", label: "备注", span: 24 }
      ],
      formData: {
        zbDept: ""
      },
      //必填控制域
      requiredFields: {
        wenjianbiaoti: "", //文件标题
        wenhao: "", //文号
        zhubanbumen: "", //文件类型
        zhubanbumen: "", //主办部门
        peoson: "", //联系人
        phoneNum: "", //联系电话
        Cdate: "", //成文日期
        leaderOpinion: "", //领导批示
        quwenbumen: "" //取文部门
      },
      //不可编辑控制域
      readFields: {
        Remark: false, //备注
        LDPSidea: false, //领导批示
        wenjianbiaoti: false, //文件标题
        wenhao: false, //文号
        wenjianleixing: false, //文件类型
        zhubanbumen: false, //主办部门
        peoson: false, //联系人
        phoneNum: false, //联系电话
        dataDay: false, //成文日期
        quwenbumen: false //取文部门
      }
    };
  },
  computed: {},
  methods: {
    // 返回上一个人
    GoBack() {
      console.log(this.formData, "返回上一级");
      this.$api.secreatary.leaderActivity
        .goBack({ ...this.formData })
        .then(res => {
          this.$message({
            message: "返回上一级成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        });
    },
    changZb() {
      console.log("1");
      this.formData.getDocDept = this.formData.zbDept;
    },
    //初始化规则
    initRule() {
      this.rules = {
        documentNo: [
          {
            required: this.requiredFields.wenhao,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: this.requiredFields.wenjianbiaoti,
            message: "不能为空",
            trigger: "change"
          }
        ],
        documentType: [
          {
            required: this.requiredFields.wenjianleixing,
            message: "不能为空",
            trigger: "change"
          }
        ],
        zbDept: [
          {
            required: this.requiredFields.zhubanbumen,
            message: "不能为空",
            trigger: "change"
          }
        ],
        contact: [
          {
            required: this.requiredFields.peoson,
            message: "不能为空",
            trigger: "change"
          }
        ],
        tel: [
          {
            required: this.requiredFields.phoneNum,
            message: "不能为空",
            trigger: "blur"
          },
          { validator: this.checkMobile, trigger: "change" }
        ],
        createDate: [
          {
            required: this.requiredFields.dataDay,
            message: "不能为空",
            trigger: "change"
          }
        ],
        leaderOpinion: [
          {
            required: this.requiredFields.leaderOpinion,
            message: "不能为空",
            trigger: "change"
          }
        ],
        getDocDept: [
          {
            required: this.requiredFields.quwenbumen,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredFields.Remark,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
    },
    toShou() {
      this.$api.secreatary.leaderActivity.toShou({ id: this.id }).then(res => {
        this.$message({
          message: "收回成功",
          type: "success"
        });
        this.$intent.closeWindow(this);
      });
    },
    // 选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log("-------->", data, status, type, "params", params, dtype);
      if (status) {
        let param = {
          id: this.id,
          title: this.formData.title,
          documentNo: this.formData.documentNo,
          documentType: this.formData.documentType,
          zbDept: this.formData.zbDept,
          zbDeptId: this.formData.zbDeptId,
          contact: this.formData.contact,
          tel: this.formData.tel,
          createDate: this.formData.createDate,
          getDocDept: this.formData.getDocDept,
          leaderOpinion: this.formData.leaderOpinion,
          remark: this.formData.remark,

          handleButton: "完成并发送",
          // curHandlerId: String(data[0].idStr),
          curHandlerId: String(data[0].id),
          curHandlerCnName: data[0].name,
          curNodeId: params.id,
          curNodeName: params.name
        };

        this.$api.secreatary.leaderActivity.toSure({ ...param }).then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.$intent.closeWindow(this);
        });
        // this.$api.duty.finishSubmitTosure({ ...param }).then((res) => {
        //   this.dialogState = false; // 关闭选人弹窗
        //   this.$message({
        //     message: "完成并发送成功",
        //     type: "success",
        //   });
        // this.$router.push({
        //   path: "/secretary/dutyTrends/infoEdit/chengKan",
        // });
        // });
      } else {
        this.dialogState = false; // 关闭选人弹窗
      }
    },
    selectDept(dept) {
      //      this.formData.zbDeptId=dept.id
      // this.formData.zbDept=dept.unitName
      this.$set(this.formData, "zbDept", dept.unitName);
      this.$set(this.formData, "zbDeptId", dept.id);

      this.formData.getDocDept = dept.unitName;
    },
    backMarkMgr() {
      // this.$router.push({
      //   path: "/sealManage/markMgr",
      // });
      this.$intent.closeWindow(this);
    },
    headerBtnClick(btnName) {
      switch (btnName) {
        case "保存":
          this.savedata();
          break;
        case "查看流程":
          this.toSee();
          break;
        case "完成并发送":
          this.$refs["elForm"].validate(valid => {
            if (valid) {
              if (
                this.backFlag1 &&
                !!this.formData.oldUserCode &&
                this.formData.curNodeName != "登记信息"
              ) {
                this.$confirm(
                  "是否返回" + this.formData.oldUserName + "?",
                  "提示",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
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
                    this.toSend();
                  });
              } else {
                console.log("565656");
                this.toSend();
              }
            } else {
              this.$message({
                message: "请输入必填项",
                type: "warning"
              });
            }
          });

          break;
        case "办结":
          this.$confirm("是否确定办结", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              // 调用新返回
              this.todo();
            })
            .catch(() => {});
          break;
        case "打印处理单":
          this.toPriting();
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
                this.$api.secreatary.leaderActivity
                  .shoucang({ id: this.id ,numYear:this.numYears})
                  .then(res => {
                    console.log(res, "获取收藏返回值");
                    this.downFile(res);
                  });
              })
              .catch(action => {
                if (action == "close") {
                } else {
                }
              });
          } else {
            this.$message({
              type: "error",
              message: "请先保存数据"
            });
          }

          break;
        // TODO:其他按钮的功能以后再添加
        default:
          console.log("你点击了按钮:" + btnName);
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
    //打印
    toPriting() {
      console.log(this.id);

      this.$intent.goNewPage(this, {
        path: "/secretaryLeader",
        query: { detail: JSON.stringify(this.formData),numYear:this.numYears }
      });

      // this.$router.push({
      //   path: "/secretaryLeader",
      //   query: {
      //     detail: JSON.stringify(this.formData),

      //   },
      // });console.log('formdata',this.formData)
    },
    //关闭
    closeWindow() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.savedata();
            this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
      // if (this.btnType === "1") {
      //   this.$intent.closeWindow(this);
      // } else {
      //   this.$confirm("关闭前是否保存?", "提示", {
      //     confirmButtonText: "是",
      //     cancelButtonText: "否",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       //保存
      //       this.$intent.closeWindow(this);
      //     })
      //     .catch(() => {
      //       // this.$router.back();
      //       this.$intent.closeWindow(this);
      //     });
      // }
    },
    //办结
    todo() {
      this.$api.secreatary.leaderActivity
        .toSure({
          handleButton: "办结",
          id: this.id,
          title: this.formData.title,
          documentNo: this.formData.documentNo,
          documentType: this.formData.documentType,
          zbDept: this.formData.zbDept,
          zbDeptId: this.formData.zbDeptId,
          contact: this.formData.contact,
          tel: this.formData.tel,

          createDate: this.formData.createDate,
          getDocDept: this.formData.getDocDept,

          opinionType: this.formData.opinionType
            ? this.formData.opinionType
            : "",
          opinionDate: this.formData.opinionDate
            ? this.formData.opinionDate
            : "",
          leaderName: this.formData.leaderName ? this.formData.leaderName : "",
          leaderOpinion: this.formData.leaderOpinion,
          remark: this.formData.remark,
          curHandlerId: this.formData.curHandlerId,
          curHandlerCnName: this.formData.curHandlerCnName,
          curNodeId: this.formData.curNodeId,
          curNodeName: this.formData.curNodeName
        })
        .then(res => {
          this.$message({
            message: "办结成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        });
    },
    //完成并发送
    toSend() {
      this.singelCheckF = true;
      this.dialogTypeNow = "next";
      this.dialogType = "dosend";
      this.offenUse = true;
      this.loadingTree = true;
      this.canTab = false;
      this.checkData = []; //清空选中数据，避免和传阅选中数据混合
      console.log(this.isAdd, "daiban");
      // saveFlag判断是否执行了保存  true已经保存过了
      if (this.isAdd) {
        if (this.saveFlag === true) {
          this.dialogState = true;
          this.$api.secreatary.leaderActivity
            .toSend({ id: this.id })
            .then(res => {
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
              this.seletOptionsData = res.data.list; // 下一处理环节赋值
              // this.treeData = res.result.data;
              this.loadingTree = true;
              this.dialogState = true;
            });
        } else if (this.saveFlag === false) {
          this.$api.secreatary.leaderActivity
            .postAdd(this.formData)
            .then(res => {
              this.id = res.data;
              // this.$message({
              //   message: "保存成功",
              //   type: "success"
              // });
              this.saveFlag = true;
              this.dialogState = true;
              this.$api.secreatary.leaderActivity
                .toSend({ id: this.id })
                .then(res => {
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
                  this.seletOptionsData = res.data.list; // 下一处理环节赋值
                  this.treeData = res.result.data;
                  this.loadingTree = true;
                  this.dialogState = true;
                });
            });
        }
      } else if (!this.isAdd) {
        this.dialogState = true;
        this.$api.secreatary.leaderActivity
          .toSend({ id: this.id })
          .then(res => {
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
            this.seletOptionsData = res.data.list; // 下一处理环节赋值
            // this.treeData = res.result.data;
            this.loadingTree = true;
            this.dialogState = true;
          });
      }
    },
    //保存
    savedata() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          // zbDept
          let a = this.hqDepts.filter(item => {
            return item.zbDept === this.formData.zbDept;
          });
          this.formData.zbDeptId = a[0].zbDeptId;
          // debugger;
          if (this.saveFlag === true) {
            //修改
            console.log("修改");
            this.$api.secreatary.leaderActivity
              .postChange({ ...this.formData, id: this.id })
              .then(res => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              });
          } else {
            if (this.isAdd) {
              // 新增
              console.log("新增");
              this.$api.secreatary.leaderActivity
                .postAdd(this.formData)
                .then(res => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.saveFlag = true;
                  this.id = res.data;
                  this.$api.secreatary.leaderActivity
                    .detailId({ id: this.id, detailType: "0",numYear:this.numYears })
                    .then(res => {
                      this.formData = res.entity;
                      this.formData.opinion = res.opinionList;
                      this.formData.remarkList = res.remarkList;
                      this.backFlag1 = res.backFlag1;
                      console.log(this.formData);
                    });
                });
            } else if (!this.isAdd) {
              //修改
              console.log("修改");
              this.$api.secreatary.leaderActivity
                .postChange({ ...this.formData, id: this.id })
                .then(res => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  // this.$router.go(-1);
                });
            }
          }
        } else {
          this.$message({
            message: "请输入必填项",
            type: "warning"
          });
        }
      });
    },
    //查看流程
    toSee() {
      if (this.id) {
        this.$api.secreatary.leaderActivity
          .seeProcedure({
            // workFlowId: this.workFlowId,
            id: this.id,
            numYear:this.numYears
          })
          .then(res => {
            this.showFlowChart = true;
            this.tableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
      } else {
        this.showFlowChart = true;
        this.$nextTick(() => {
          this.$refs.dialogLine.openDialog();
        });
      }
    },
    loadData() {
      if (!this.isAdd) {
        // 控制域
        // this.$api.secreatary.leaderActivity.getKong().then((res) => {});
        //id查详情

        //判断
        // let fData = JSON.parse(this.$route.query.detail);
        // console.log('f',fData);
        // this.btnType = this.$route.query.btnType;

        // 判断可编辑
        // this.isREadFlag = JSON.parse(this.$route.query.isREadFlag);

        // this.isREadFlag ? (this.canInput = true) : "";
        // if (this.btnType === "1") {
        //   console.log("已办");

        //   this.formData = JSON.parse(this.$route.query.detail);
        //   console.log(this.formData);
        // } else {
        this.canInput = true;
        this.id =
          JSON.parse(this.$route.query.detail).id ||
          JSON.parse(this.$route.query.detail).ID;

        //根据id获取详情
        this.$api.secreatary.leaderActivity
          .detailId({ id: this.id, detailType: "0",numYear:this.numYears })
          .then(res => {
            this.formData = res.entity;
            this.formData.opinion = res.opinionList;
            this.formData.remarkList = res.remarkList;
            this.backFlag1 = res.backFlag1;
            console.log(this.formData);
            // this.workFlowId = res.entity.workFlowId;
            // this.hqDepts = res.data.list;

            // 控制域
            this.$api.secreatary.leaderActivity
              .getKong({ id: this.id })
              .then(res => {
                this.huanJieMessage = res.Fields;
                this.setConfig();
                this.initRule();
              });
          });
        //获取主办部门列表
        this.$api.secreatary.leaderActivity.getDepart({}).then(res => {
          this.hqDepts = res.data.list;
        });
        // }
        // this.initRule();
      } else if (this.isAdd) {
        this.formData.curNodeName = "登记信息";
        this.formData.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitName;

        //新增
        this.$api.secreatary.leaderActivity.getDepart({}).then(res => {
          //获取日期　当前处理人　部门
          this.formData.createDate = res.data.createDate;
          this.formData.curHandlerCnName = res.data.curHandlerCnName;

          console.log(this.formData);
          this.$set(this.formData, "createDate", res.data.createDate);
          this.$set(this.formData, "createDateId", res.data.createDate);
          this.hqDepts = res.data.list;
          // 控制域
          this.$api.secreatary.leaderActivity.getKong({}).then(res => {
            this.huanJieMessage = res.Fields;
            this.setConfig();
            this.initRule();
          });
        });
      }
    },
    //设置控制域
    // setConfig() {
    //   this.requiredFields = this.setRequiredFields(
    //     this.requiredFields,
    //     this.huanJieMessage.requiredFields
    //   );
    //   this.readFields = this.setReadFields(
    //     this.readFields,
    //     this.huanJieMessage.readFields
    //   ); //不可编辑控制域
    //   this.headerBtnList = this.showButton(
    //     this.headerBtnList,
    //     this.huanJieMessage.visibleButtons,
    //     this.huanJieMessage.visibleButtons
    //   ); //按钮
    //   this.editedIdeaFields = this.setEditedIdeaFields(
    //     this.editedIdeaFields,
    //     this.huanJieMessage.editedIdeaFields,
    //     this.huanJieMessage.editedIdeaFields,
    //     // this.huanJieMessage.editedIdeaFieldsBycondition
    //   ); //可编辑意见域
    //   // this.requiredIdeaFields = this.setRequiredIdeaFields(
    //   //   this.requiredIdeaFields,
    //   //   this.huanJieMessage.requiredIdeaFields
    //   // ); //可编辑意见域
    // },
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      );
      this.readFieelds = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.headerBtnList = this.showButton(
        this.headerBtnList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
      // this.editedIdeaFields = this.setEditedIdeaFields(
      //   this.editedIdeaFields,
      //   this.huanJieMessage.editedIdeaFields,
      //   this.huanJieMessage.editedIdeaFieldsBycondition
      // ); //可编辑意见域
      // this.requiredIdeaFields = this.setRequiredIdeaFields(
      //   this.requiredIdeaFields,
      //   this.huanJieMessage.requiredIdeaFields
      // ); //可编辑意见域
    }
  },
  activated() {},
  mounted() {
    if (this.$route.query.params) {
      console.log(this.$route.query.params, "this.$route.query.params");
      this.$set(this.formData, "curUserDeptId", this.$route.query.params);
      console.log(this.formData.curUserDeptld, "curUserDeptId");
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/* .pad_lr10 {
  margin: 0 16px 0 0;
} */
.adviceInfo {
  bottom: 0;
  right: 10px;
}
/deep/ .el-textarea {
  // width: 90%;
  margin-left: 25px;
}
.el-header {
  background-color: #409eff;
  color: #333;
  line-height: 60px;
  .back {
    line-height: 60px;
    height: 60px;
    cursor: pointer;
    color: #eee;
  }
  .btn_box {
    display: flex;
    justify-content: flex-end;
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
  }
}
.current_link {
  width: 100%;
  display: flex;
  font-size: 14px;
  margin: 20px 0px;
  margin-left: 100px;
  span {
    color: #ffa500;
  }
  p {
    margin-left: 30px;
  }
}
.wrap {
  width: 70%;
  margin: 0 auto;
}
/deep/ .el-input {
  width: 75%;
}

.adviceInfo {
  bottom: 0;
  right: 10px;
}
.pad_lr10 {
  margin: 0 16px;
}
.selectDept {
  background: #f0f5fa;
  margin: 0 auto;
  .headerClick {
    background: #409eff;
    // position: static !important;
    color: white;
    height: 60px;
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
  /deep/ .el-textarea {
    margin-left: 2px;
  }
  /deep/ .el-input {
    padding: 0 !important;
  }
  .process_content {
    width: 80%;
    min-height: 600px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
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
</style>
