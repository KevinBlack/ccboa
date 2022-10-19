<!--
 * @Author: zj
 * @Date: 2020-10-22 17:39:33
 * @LastEditTime: 2021-06-30 19:33:12
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
        <el-button plain class="bank_grid_comtent_active" @click="closeWindow()">关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>

    <div ref="printArea">
      <div class="formHeader">
        <div class="title-text">{{userInfoOrg+"值班动态审批单"}}</div>
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
              <span>{{this.formData1.currUserDept}}</span>
            </p>
          </div>
        </div>

        <div id="wjys" class="height_90"></div>
        <el-form ref="ruleForm" :model="formData1" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿人" prop="editorName">
                <el-input v-model="formData1.editorName" :disabled="readFields.tougaoren"></el-input>
                <!-- @description: <el-input v-model="formData1.editorName" :disabled="true"></el-input>  -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="tel">
                <el-input v-model="formData1.tel" :disabled="readFields.lianxidianhua"></el-input>
                <!-- @description: <el-input v-model="formData1.tel" :disabled="true"></el-input>  -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主办部门" prop="zbDept">
                <el-input v-model="formData1.zbDept" :disabled="readFields.zhubanbumen"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编辑时间" prop="createDate">
                <el-input v-model="formData1.createDate" :disabled="readFields.binajishijian"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="审核意见" prop="qfIdeaIn">
            <el-input
              type="textarea"
              v-model="formData1.qfIdeaIn"
              v-if="isNeedInput"
              :disabled="editedIdeaFields.QFidea"
            ></el-input>
            <div v-for="(item,index) in formData1.qfIdea" :key="item.id">
              <div class="d_flex">
                <el-row class="d_b100" v-if="item.content? true : false">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      :value="item.content"
                      :disabled="true"
                      :autosize="{minRow:5,maxRow:15}"
                      class="d_f1"
                    ></el-input>
                    <div class="adviceInfo">
                      <el-row>
                        {{item.departmentName}}
                        <span class="pad_lr10">{{item.createUser}}</span>
                      </el-row>
                      <el-row>{{item.createTime}}</el-row>
                      <div class="delBox">
                        <el-button
                          class="buttonItem"
                          v-show="(index == formData1.qfIdea.length-1) && qfIdeaFlg  &&  lastOptionTime ==item.createTime "
                          @click="delItem(item)"
                        >删除</el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="备注" prop="remarkIn">
            <el-input
              type="textarea"
              v-model="formData1.remarkIn"
              :disabled="editedIdeaFields.Remark"
            ></el-input>
            <div v-for="(item,index) in formData1.remark" :key="item.id">
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
                      <el-row>
                        {{item.departmentName}}
                        <span class="pad_lr10">{{item.createUser}}</span>
                      </el-row>
                      <el-row>{{item.createTime}}</el-row>
                      <div class="delBox">
                        <el-button
                          class="buttonItem"
                          v-show="(index == formData1.remark.length-1) && remarkFlg &&  lastOptionTime ==item.createTime "
                          @click="delItem(item)"
                        >删除</el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
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
    />
    <!-- @description: 查看流程弹框  -->
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>

    <!-- @description: 选择机构树  -->
    <org-tree
      v-model="modal"
      title="请选择发布范围"
      :isSingle="false"
      :orgOrDept="1"
      :orgOrDeptId="currentUserInfo.unitId"
      @orgList="handleOnOrgsSelectOk"
    ></org-tree>

    <!-- 发布成功弹出框 -->

    <el-dialog title="发布结果" :visible.sync="dialogVisible" width="40%">
      <div v-if="this.msgArr.length">
        <div style="color:green">
          <p style="line-height: 30px;">{{msgArr[0]}}</p>
        </div>
        <div>
          <p style="line-height: 30px;">{{msgArr[1]}}</p>
        </div>
      </div>
      <div v-else>
        <div style="color:green">
          <p style="line-height: 30px;">{{msgData}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="backButton()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import selectPerson from "components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";

import minixs from "@/minixs/index";
import orgTree from "./orgTree";
import asAPublicationDetailMixin from "./mixins/as-a-publication-detail-mixin";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "asAPublicationDetail",
  mixins: [minixs, asAPublicationDetailMixin,viewDraft],
  components: {
    shiwuFlow,
    selectPerson,
    orgTree
  },
  data() {
    return {
      filterState: "1",
      lastOptionTime: 0, //比较时间
      msgData: "",
      msgArr: [], //发布成功之后的返回直
      dialogVisible: false, // 发布成功弹出框
      remarkFlg: false, //备注 删除按钮
      qfIdeaFlg: false, // 意见 删除按钮
      qingGao: "false", //清稿后
      qingGaoAfter: "true", //清稿前
      ID: "", //保存之后的id
      isType: "",
      submitDeptData: [],
      userInfoOrg:
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).unitName,
      userInfoName:
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).humanName,
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wanchengbingfasong", show: false },
        { name: "起草正文", type: "qicaozhengwen", show: false },
        { name: "处理正文", type: "chulizhengwen", show: false },
        { name: "查看正文", type: "ckzw", show: false },
        { name: "清稿", type: "qinggao", show: false },
        { name: "发布", type: "fabu", show: false },
        { name: "查看流程", type: "chakanliucheng", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false }
        // { name: "打印处理单", type: "dayinchulidan", show: false },
      ]
    };
  },
  created() {
    this.isType = this.dataFromQuery("isType");
    this.filterState = this.$route.query.filterState;
    console.log(this.filterState, "filterState");

    this.topData = {
      name: this.currentUserInfo.humanName,
      currUnitName: this.currentUserInfo.currUnitName
    };
    this.loadData();
    this.getSubmitDept();
    // 进来就调一次保存
  },
  computed: {
    isNeedInput() {
      return (
        this.formData1.currentNode === "信息采集" ||
        (this.editedIdeaFields.QFidea
          ? this.formData1.qfIdea && this.formData1.qfIdea.length > 0
            ? false
            : true
          : true)
      );
    }
  },
  methods: {
    // 删除意见域
    delItem(del) {
      console.log("shanchu", del);
      this.$api.duty
        .delItem({
          id: del.id
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.loadData();
        });
    },
    getSubmitDept() {
      this.$api.duty.getSubmitDeptData().then(res => {
        const submitDeptData = (res && res.departList) || [{}];
        this.submitDeptData = submitDeptData;
        console.log("获取投稿部门", res.departList, submitDeptData);
        if (this.dataFromQuery("isType") === "deal") {
          this.save_btn();
        }
      });
    },
    /** @description: 保存 */
    save_btn(type) {
      // this.formData1.ckId = this.formData1.id;
      this.formData1.xxcbBxgjId = this.getStrFromListAndSeparator(
        this.xxcbBxgjId
      );
      if (typeof this.formData1.wfeWork === "string") {
        this.formData1.wfeWork = JSON.parse(this.formData1.wfeWork);
      }
      for (const i in this.submitDeptData) {
        if (this.submitDeptData[i].unitNames === this.formData1.zbDept) {
          this.formData1.curUserDeptId = this.submitDeptData[i].currUnitId;
        }
      }

      this.$set(
        this.formData1,
        "draftOrganId",
        JSON.parse(localStorage.getItem("userInfo")).unitId
      );
      this.$set(
        this.formData1,
        "draftOrgan",
        JSON.parse(localStorage.getItem("userInfo")).shortUnitName
      );
      this.$set(
        this.formData1,
        "draftOrganFullName",
        JSON.parse(localStorage.getItem("userInfo")).unitName
      );
      this.$api.duty.saveChengKan(this.formData1).then(res => {
        // if (this.dataFromQuery("isType") === "chenkan") {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        // }
        console.log(this.formData1, "保存成功之后的");
        this.isDisabled = true;
        if (!this.formData1.id) {
          this.formData1.id = res.id;
          this.ID = res.id;
        }

        if (this.dataFromQuery("isType") === "deal") {
          // 保存完跳路由
          this.$router.push({
            name: "chengkanDetail",
            query: {
              /** @description: 来源路由名 据此从详情页中导航回来*/
              sourceRouteName: this.sourceRouteNameFromQuery,
              activeName: "",
              id: this.ID,
              isType: JSON.stringify("chengkan")
            },
            params: this.paramsDataExcludeSpecifiedAttributes()
          });
        }
        this.loadData();
      });
    },
    closeWindow() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.save_btn();
            // this.$message({
            //   message: "保存成功",
            //   type: "success"
            // });
            this.$intent.closeWindow(this);
            // this.saveClose()
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
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
          qfIdeaIn: this.formData1.qfIdeaIn,
          currdept: data[0].deptName,
          submitDeptmentNameByTree: data[0].deptName,
          curUserDeptId: data[0].deptId
        };
        this.$api.duty.finishSubmitTosure({ ...param }).then(res => {
          this.dialogState = false; /** @description: 关闭选人弹窗 */
          this.$message({
            message: "完成并发送成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
          // this.$router.push({
          //   path: "/secretary/dutyTrends/infoEdit/chengKan"
          // });
        });
      } else {
        this.dialogState = false; /** @description: 关闭选人弹窗 */
      }
    },
    /** @description: 加载详情 */
    async loadData() {
      console.log(this.dataFromQuery("id"), "cong");
      console.log(this.formData1, "this.formData1");
      this.formData1 = this.formData1 || {};

      console.log(this.formData1, "this.formData1kokookkoo");

      if (!this.processLogicAfterQuitFromGoldCell(this.formData1)) {
        console.log(this.isType, "this.isType");
        // 到这里数据还在  往下数据消失 保存完了  数据还是从路由取出来的
        if (this.dataFromQuery("isType") === "deal") {
          let obj = this.dataFromQuery("detail");
          let draftDepartment = this.dataFromQuery(
            "draftDepartment",
            "string"
          ); /** @description: 主办部门 */
          this.xxcbBxgjId = this.dataFromQuery("xxcbBxgjId");
          obj.editorName = this.userInfoName;
          this.formData1 = obj;
          this.formData1.currentNode = "信息采集";
          this.formData1.currUserDept = this.topData.name;
          this.formData1.zbDept = this.dataFromQuery(
            "zbDept"
          ); /** @description: 主办部门赋值 */
          console.log(this.formData1, "this.isType ===deal ");
        } else if (this.dataFromQuery("isType") === "chengkan") {
          var IDchenkan =
            this.formData1.id || this.ID || this.dataFromQuery("id");
          await this.$api.duty
            .periodicalQuery({ id: IDchenkan, filterState: this.filterState })
            .then(res => {
              this.formData1 = this.formData1 = {
                ...this.formData1,
                ...((res && res.order) || {})
              };
              this.$set(this.formData1, "remark", res.remarkList);
              this.$set(this.formData1, "qfIdea", res.checkList);
              this.formData1.currUserDept = this.formData1.currentUser;
            });
          console.log(this.formData1, "this.isType ===chengkan");
        }
      }
      this.formData1.zbDept =
        typeof this.formData1.zbDept === "object" ? "" : this.formData1.zbDept;
      if (this.formData1.qfIdea && this.formData1.qfIdea.length > 0) {
        this.formData1.qfIdea = this.formData1.qfIdea.filter(item => {
          this.lastOptionTime =
            this.lastOptionTime > item.createTime
              ? this.lastOptionTime
              : item.createTime;
          return item;
        });
      }
      if (this.formData1.remark && this.formData1.remark.length > 0) {
        this.formData1.remark = this.formData1.remark.filter(item => {
          this.lastOptionTime =
            this.lastOptionTime > item.createTime
              ? this.lastOptionTime
              : item.createTime;
          return item;
        });
      }

      if (this.formData1.qfIdea[0]) {
        this.qfIdeaFlg = JSON.parse(localStorage.getItem("unitInfo")).some(
          item => {
            return (
              this.formData1.qfIdea[this.formData1.qfIdea.length - 1]
                .createUserId == item.humanId
            );
          }
        );
      } else {
        this.qfIdeaFlg = false;
      }
      console.log(this.qfIdeaFlg, "this.qfIdeaFlg");
      if (this.formData1.remark[0]) {
        this.remarkFlg = JSON.parse(localStorage.getItem("unitInfo")).some(
          item => {
            return (
              this.formData1.remark[this.formData1.remark.length - 1]
                .createUserId == item.humanId
            );
          }
        );
      } else {
        this.remarkFlg = false;
      }
      console.log(this.remarkFlg, " this.remarkFlg");

      console.log("chengkanDetail:formData1", this.formData1);
      if (this.formData1.filePathAfter) {
        //清稿后,隐藏清稿
        this.qingGao = "true";
        this.qingGaoAfter = "false";
      } else {
        //清稿前
        this.qingGao = "false";
        this.qingGaoAfter = "true";
      }
      if (this.formData1.isSynGj && this.formData1.isSynGj === "2") {
        //发布收回后,清稿按钮显示
        this.qingGao = "false";
        this.qingGaoAfter = "true";
      }
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
        this.huanJieMessage.requiredFields
      );
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); /** @description: 不可编辑控制域 */
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      );
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ); /** @description: 可编辑意见域 */
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //可编辑意见域
      /** @description: 起草正文 转 处理正文 */

      console.log(this.formData1.filePath, "this.formData1.filePath");
      const item =
        this.buttonList &&
        this.buttonList.find(item => item.name === "起草正文");
      item && this.formData1.filePath && (item.name = "处理正文");
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/* .delBox {
    margin-top: 154px;
    width: 100%;
    background: rgba(224, 224, 224, 0.34);
    height: 32px;
    .buttonItem {
      float: right;
    }
  } */

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
.d_b100 {
  margin-top: 5px;
  height: 100px;
  /* background-color: #e4e7ed52 !important; */
}
.d_f1 {
  height: 100px;
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

/deep/.el-textarea__inner {
  min-height: 100px !important;
}
/deep/.el-form-item__content {
  border: 1px solid rgba(228, 231, 237);
  border-radius: 4px;
}
/deep/.el-input.is-disabled .el-input__inner,
/deep/.el-textarea.is-disabled .el-textarea__inner {
  border: none;
  border-radius: 0;
}
</style>
