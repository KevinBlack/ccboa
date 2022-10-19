<!--
 * @Author: your name
 * @Date: 2020-10-14 09:00:42
 * @LastEditTime: 2020-12-10 14:30:29
 * @LastEditors: Please set LastEditors
 * @Description:已办、办结
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
          <div class="headerClick btn_box">
            <el-button
              class="bank_grid_comtent_active"
              v-for="(item, index) in headerBtnList"
              v-show="headerBtnList[index].show"
              :key="index"
              @click="headerBtnClick(item.name)"
              plain
            >{{item.name}}</el-button>
            <!-- <el-button
              class="bank_grid_comtent_active"
              @click="toShou"
              v-show="this.buttonType==='1'"
            >收回</el-button>-->
          </div>
        </el-col>
      </el-row>
    </el-header>
    <div class="formHeader">
      <div class="title-text">中国建设银行领导批示登记表</div>
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
      <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="文件标题">
              <el-input v-model="formData.title" :disabled="canInput"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="文号">
              <el-input
                style="padding-left:26px"
                v-model="formData.documentNo"
                :disabled="canInput"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="文件类型">
              <el-select v-model="formData.documentType" placeholder="请选择" :disabled="canInput">
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
            <el-form-item label="主办部门">
              <select-org-or-dept
                @select="selectDept"
                :disabled="canInput"
                :orgOrDept="0"
                orgOrDeptId="111111111"
              >
                <el-input
                  :disabled="canInput"
                  readonly
                  type="text"
                  placeholder="请选择部门"
                  v-model="formData.zbDept"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="联系人">
              <el-input style="padding-left:14px" v-model="formData.contact" :disabled="canInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="联系电话">
              <el-input v-model="formData.tel" :disabled="canInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="成文日期">
              <el-date-picker
                :disabled="canInput"
                v-model="formData.createDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="领导批示">
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
              <el-row v-if="formData.opinion&&formData.opinion.length==0">
                <el-col>
                  <el-input type="textarea" :rows="4" :disabled="true"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="领导批示">
              <el-row v-if="formData.opinion && formData.opinion.length==0">
                <el-input type="textarea" :disabled="true"></el-input>
              </el-row>
              <div class="d_flex" v-if="formData.opinion && formData.opinion.length!=0">
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
            <el-form-item label="取文部门">
              <el-input v-model="formData.getDocDept" :disabled="canInput"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
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

              <el-row v-if="formData.remarkList&&formData.remarkList.length==0">
                <el-col>
                  <el-input type="textarea" :rows="4" :disabled="true"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row v-if="formData.remarkList && formData.remarkList.length==0">
                <el-input type="textarea" v-model="formData.remark" resize="none" :disabled="true"></el-input>
              </el-row>
              <div class="d_flex" v-if="formData.remarkList && formData.remarkList.length!=0">
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
      v-dialogDrag
      :treeData="treeData"
      :hasRadio="hasRadio"
      :canTab="canTab"
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
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>

<script>
import exportTable from "@/minixs/exportTable";

// import FdForm from "vue-elementui-freedomen/components/form";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import selectPerson from "components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import minixs from "../../../minixs/index";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";

export default {
  name: "registerKindTable",
  components: {
    // FdForm,
    selectOrgOrDept,
    shiwuFlow,
    selectPerson
  },
  mixins: [minixs, openOrDownLoadFile],
  props: {},
  watch: {
    $route() {
      this.type = this.$route.params.id;
    }
  },
  data() {
    return {
      numYears:this.$route.query.numYear?this.$route.query.numYear:"",
      rules: {},
      btnType: "",
      canInput: true,
      id: "",
      isREadFlag: "",
      showFlowChart: false, // 查看流程弹框默认不显示

      tableData: [], // 流程数据
      // 完成并发送
      treeData: [], // 树数据
      checkOrg: false,
      hasRadio: false, //是否单选
      seletOptionsData: [], // 下一处理环节下拉数据
      offenUse: true,
      loadingTree: true,
      canTab: false,
      dialogType: "dosend",
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
      //   isAdd: JSON.parse(this.$route.query.isAdd),
      headerBtnList: [
        { name: "关闭", show: true },
        { name: "收回", show: false, type: "shouhui" },
        { name: "查看流程", show: true },
        { name: "打印处理单", show: true },
        { name: "收藏", show: true },
        { name: "操作指南", show: true }
        // "关闭",
        // "收回",
        // "查看流程",
        // "打印处理单",
        // "收藏",
        // "操作指南"
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
      formData: {}
    };
  },
  computed: {},
  methods: {
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

          handleButton: "完成并发送",
          curHandlerId: String(data[0].id),
          // curHandlerId: String(data[0].idStr),
          curHandlerCnName: data[0].name,
          curNodeId: params.id,
          curNodeName: params.name
        };

        this.$api.secreatary.leaderActivity.toSure({ ...param }).then(res => {
          this.$message({
            message: "完成并发送成功",
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
      this.$router.push({
        path: "/sealManage/markMgr"
      });
    },
    headerBtnClick(btnName) {
      switch (btnName) {
        case "关闭":
          this.closeWindow();
          break;
        // case "保存":
        //   this.savedata();
        //   break;
        case "查看流程":
          this.toSee();
          break;
        // case "完成并发送":
        // this.singelCheckF = true;
        //   this.dialogTypeNow = "next";
        //   this.dialogType = "dosend";
        //   this.offenUse = true;
        //   this.loadingTree = true;
        //   this.canTab = false;
        //   this.checkData = [];
        //   this.toSend();
        //   break;

        case "收回":
          this.toShou();
          break;
        case "办结":
          this.todo();
          break;
        case "收藏":
          // exportTable.getPdf("领导批示登记", "", "leader", "", "", this);
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
                  // this.$message({
                  //   type: "success",
                  //   offset: "200",
                  //   message: "收藏完成"
                  // });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "打印处理单":
          this.toPriting();
          break;
        // TODO:其他按钮的功能以后再添加
        default:
          console.log("你点击了按钮:" + btnName);
      }
    },
    closeWindow() {
      // if (this.btnType === "1") {
      this.$intent.closeWindow(this);

      // } else {
      //   this.$confirm("是否退出?", "提示", {
      //     confirmButtonText: "是",
      //     cancelButtonText: "否",
      //     type: "warning",
      //   })
      //     .then(() => {
      //       //保存
      //     this.$intent.closeWindow(this);

      //     })
      //     .catch(() => {
      //       // this.$router.back();
      //     });
      // }
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
    toPriting() {
      this.$intent.goNewPage(this, {
        path: "/secretaryLeader",
        query: { detail: JSON.stringify(this.formData),numYear:this.numYears }
      });

      // console.log(this.id);

      // this.$router.push({
      //   path: "/secretaryLeader",
      //   query: {
      //     detail: JSON.stringify(this.formData),
      //   },
      // });
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

          curHandlerId: this.formData.curHandlerId,
          curHandlerCnName: this.formData.curHandlerCnName,
          curNodeId: this.formData.curNodeId,
          curNodeName: this.formData.curNodeName
        })
        .then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
        });
    },
    //完成并发送
    toSend() {
      debugger;
      console.log(this.isAdd);
      if (this.isAdd) {
        this.$api.secreatary.leaderActivity.postAdd(this.formData).then(res => {
          this.id = res.data;
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.dialogState = true;
          this.$api.secreatary.leaderActivity
            .toSend({ id: this.id })
            .then(res => {
              this.seletOptionsData = res.data.list; // 下一处理环节赋值
              this.loadingTree = true;
              this.dialogState = true;
            });
        });
      } else if (!this.isAdd) {
        this.dialogState = true;
        this.$api.secreatary.leaderActivity
          .toSend({ id: this.id })
          .then(res => {
            this.seletOptionsData = res.data.list; // 下一处理环节赋值
            this.loadingTree = true;
            this.dialogState = true;
          });
      }
    },
    //保存
    savedata() {
      if (this.isAdd) {
        // 新增
        this.$api.secreatary.leaderActivity
          .postAdd(this.formData)
          .then(res => {});
      } else if (!this.isAdd) {
        //修改
        this.$api.secreatary.leaderActivity
          .postChange({ ...this.formData, id: this.id })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$intent.closeWindow(this);
          });
      }
    },
    //查看流程
    toSee() {
      this.$api.secreatary.leaderActivity
        .seeProcedure({
          //  workFlowId: this.workFlowId
          id: this.id,
          numYear: this.numYears
        })
        .then(res => {
          this.tableData = res.data;
          this.showFlowChart = true;
          this.$nextTick(() => {
            this.$refs.dialogLine.openDialog();
          });
        });
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

        // this.isREadFlag = JSON.parse(this.$route.query.isREadFlag);

        // this.isREadFlag ? (this.canInput = true) : "";
        // if (this.btnType === "1") {
        //   console.log("已办");

        //   this.formData = JSON.parse(this.$route.query.detail);
        //    console.log( this.formData);
        // } else {
        this.id =
          JSON.parse(this.$route.query.detail).id ||
          JSON.parse(this.$route.query.detail).ID;
        this.buttonType = JSON.parse(this.$route.query.buttonType);
        this.$api.secreatary.leaderActivity
          .detailId({ id: this.id, detailType: "1" ,numYear: this.numYears})
          .then(res => {
            this.formData = res.entity;
            this.formData.opinion = res.opinionList;
            this.formData.remarkList = res.remarkList;
            // this.workFlowId = res.entity.workFlowId;
            const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
            // 在 已办(buttonType === 1) , 未读，是上一处理人时， 判断显示 收回 按钮
            const tackBackIndex = this.headerBtnList.findIndex((item, index) => item.type === "shouhui");
            console.log(this.buttonType == "1", this.formData.isReadFlag === "0", userInfo.humanCode == this.formData.oldUserCode)
            if (this.buttonType == "1" && this.formData.isReadFlag === "0" && userInfo.humanCode == this.formData.oldUserCode) {
              this.headerBtnList[tackBackIndex].show = true;
            } else {
              this.headerBtnList[tackBackIndex].show = false;
            }
          });
        // }
      } else if (this.isAdd) {
        //新增
        this.$api.secreatary.leaderActivity.getDepart({}).then(res => {});
      }
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.pad_lr10 {
  margin: 0 16px;
}
.adviceInfo {
  bottom: 0;
  right: 10px;
}
/deep/ .el-textarea {
  width: 90%;
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
