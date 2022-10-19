<!--
 * @Author: your name
 * @Date: 2020-12-03 13:52:44
 * @LastEditTime: 2020-12-05 15:24:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\leaderWtitten\electronicTable.vue
--> 
<template>
  <div class="selectDept">
    <!-- header:页头，功能区 -->
    <el-header>
      <!-- <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="6">
          <div class="back" @click="backMarkMgr">
            <i class="el-icon-arrow-left"></i>
            <span>电子登记</span>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="btn_box">
            <el-button
              v-for="(item, index) in headerBtnList"
              :key="index"
              @click="headerBtnClick(item)"
              plain
            >{{item}}</el-button>
          </div>
        </el-col>
      </el-row>-->
      <div class="headerClick">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in headerBtnList"
          @click="headerBtnClick(item)"
          :key="index"
          plain
        >{{item}}</el-button>
      </div>
    </el-header>
    <div class="formHeader">
      <div class="title-text">中国建设银行领导批示登记表</div>
    </div>
    <div class="process_content">
      <!-- <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span></span>
          </p>
          <p>
            当前处理人：
            <span></span>
          </p>
        </div>
      </div>-->
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

        <el-row>
          <el-col :span="24">
            <el-form-item label="内容" prop="formData.content">
              <!-- <el-input
                :disabled="canInput"
                type="textarea"
                maxlength="200"
                :rows="4"
                placeholder="请输入内容"
                v-model="formData.content"
              ></el-input>-->
              <template>
                <div v-html="formData.content" class="table_cc"></div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                :disabled="canInput"
                type="textarea"
                maxlength="200"
                :rows="4"
                placeholder="请输入备注"
                v-model="formData.remark"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
      :fromdata="formData1"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <!-- 查看流程 -->
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></timeDialog>
  </div>
</template>

<script >
// import FdForm from "vue-elementui-freedomen/components/form";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import selectPerson from "components/tree/tree-fawen";
import timeDialog from "@/components/timedialog/timedialog";

export default {
  name: "registerKindTable",
  components: {
    // FdForm,
    selectOrgOrDept,
    selectPerson,
    timeDialog
  },
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
      seletOptionsData: [], // 下一处理环节下拉数据
      offenUse: true,
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
        "关闭",
        "查看原文",

        "打印处理单",
        // "维护",
        "操作指南"
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
      });
    },
    // 选人成功
    showCompDialog(data, status, type, params, dtype) {
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
          curHandlerId: String(data[0].idStr),
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
        //   this.toSend();
        //   break;
        case "办结":
          this.todo();
          break;
        case "打印处理单":
          this.toPriting();
          break;
        case "查看原文":
          this.toRead();
          break;
        // TODO:其他按钮的功能以后再添加
        default:
          console.log("你点击了按钮:" + btnName);
      }
    },
    // 查看原文
    toRead() {
      // documentType 1发文 2收文 3签收
      if (this.formData.documentType === "1") {
        this.$intent.goNewPage(this, {
          path: "/bankDispach",
          query: {
            id: this.formData.dataId,
            readFlag: "1"
          }
        });
      } else if (this.formData.documentType === "2") {
        this.$intent.goNewPage(this, {
          path: "/receiveElectronDispatch",
          query: {
            id: this.formData.dataId,
            readFlag: "1"
          }
        });
      } else if (this.formData.documentType === "3") {
        this.$intent.goNewPage(this, {
          path: "/signquoteWaitFkhDispatch",
          query: {
            id: this.formData.dataId,
            readFlag: "1"
          }
        });
      }
    },
    //打印
    toPriting() {
      console.log(this.id);
      this.$router.push({
        path: "/leaderParting",
        query: {
          detail: JSON.stringify(this.formData),
          numYear:this.numYears
        }
      });
    },
    closeWindow() {
      // if (this.btnType === "1") {
      this.$intent.closeWindow(this);
      // } else {
      //   this.$confirm("关闭前是否保存?", "提示", {
      //     confirmButtonText: "是",
      //     cancelButtonText: "否",
      //     type: "warning",
      //   })
      //     .then(() => {
      //       //保存
      //       this.savedata();
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

          curHandlerId: this.formData.curHandlerId,
          curHandlerCnName: this.formData.curHandlerCnName,
          curNodeId: this.formData.curNodeId,
          curNodeName: this.formData.curNodeName
        })
        .then(res => {});
    },
    //完成并发送
    toSend() {
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
              //带约束条件判断环节
              //过滤重复环节
              //this.seletOptionsData = res.list;
              let PCSAVYIDs = [];
              this.seletOptionsData = res.list.filter(item => {
                if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                  PCSAVYIDs.push(item.PCSAVYID);
                  return item;
                }
              });
              this.seletOptionsData = this.shoNextNode(
                this.seletOptionsData,
                this.huanJieMessage.acyNodeNextBount
              );
              this.seletOptionsData = res.data.list; // 下一处理环节赋值
            });
        });
      } else if (!this.isAdd) {
        this.dialogState = true;
        this.$api.secreatary.leaderActivity
          .toSend({ id: this.id })
          .then(res => {
            //带约束条件判断环节
            //过滤重复环节
            //this.seletOptionsData = res.list;
            let PCSAVYIDs = [];
            this.seletOptionsData = res.list.filter(item => {
              if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                PCSAVYIDs.push(item.PCSAVYID);
                return item;
              }
            });
            this.seletOptionsData = this.shoNextNode(
              this.seletOptionsData,
              this.huanJieMessage.acyNodeNextBount
            );
            this.seletOptionsData = res.data.list; // 下一处理环节赋值
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
      this.showFlowChart = true;
      this.$api.secreatary.leaderActivity.seeProcedure({numYear: this.numYears}).then(res => {
        this.tableData = res.data;
      });
    },
    loadData() {
      if (!this.isAdd) {
        console.log(JSON.parse(this.$route.query.detail));
        // this.formData=JSON.parse(this.$route.query.detail)
        let id = JSON.parse(this.$route.query.detail).id;
        this.$api.secreatary.leaderActivity.eleEtailId({ id: id ,numYear:this.numYears}).then(res => {
          this.formData = res.entity;
          var arr;
          if (res.list) {
            res.list.forEach(element => {
              console.log(element.content, "element.content");
              //  console.log(element,"element")
              //  arr =+ element.content
              arr = "<br/>" + element.content;
              console.log(arr, "arr");
            });
          }
          this.formData.content = this.formData.content + "" + arr;
          console.log(this.formData.content, " this.formData.content");
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
  position: absolute;
  width: 100%;
  right: 190px;
  bottom: 0;
  text-align: right;
  color: #606266;
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
.table_cc {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e4e7ed52 !important;
  min-height: 100px;
  width: 836px;
  color: #606266;
  &:hover {
    /* border:none !important; */
    cursor: not-allowed;
  }
  div {
    margin-left: 18px;
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
  position: absolute;
  width: 100%;
  right: 170px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 16px;
}
.selectDept {
  background: #f0f5fa;
  margin: 0 auto;
  .headerClick {
    background: #409eff;
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
