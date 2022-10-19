<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>投稿相关配置</span>
      </div>
      <div class="right">
        <el-button
          v-if="!isSave"
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="save_btn"
        >保存</el-button>
        <el-button
          v-else
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="edit_btn"
        >编辑</el-button>
        <el-button
          style="margin-left:20px;"
          class="bank_grid_comtent_active"
          size="mini"
          plain
          @click="close_btn"
        >关闭</el-button>
      </div>
    </div>

    <div class="addHeader">
      <div class="title-text">基本配置</div>
    </div>

    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="机构名称" prop="orgName">
          <el-input
            class="left"
            v-model="formData.orgName"
            :disabled="isColumTypeDisabled||isOrgDisabled"
            style="width:640px"
          ></el-input>
          <el-button class="right" @click="selectOrg" type="primary" size="medium">选择机构</el-button>
        </el-form-item>
        <el-form-item label="截止时间" prop="blockingTime">
          <el-time-picker
            v-model="formData.blockingTime"
            :picker-options="{selectableRange: '00:00:00 - 23:59:00'}"
            :disabled="isColumTypeDisabled"
            :value-format="'HH:mm'"
            placeholder="选择时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="超时提示内容" prop="timeOverAlertInfo">
          <el-input v-model="formData.timeOverAlertInfo" :disabled="isColumTypeDisabled"></el-input>
        </el-form-item>
      </el-form>
      <!-- @description: 选择人员树  -->
      <select-person
        :treeData="treeData"
        :loadingTree="true"
        :seletOptionsData="seletOptionsData"
        :offenUse="offenUse"
        :dialogType="dialogType"
        :dialogTypeNow="dialogTypeNow"
        dialogTit="选择共享用户"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        @showCompDialog="showCompDialog"
      />
      <!-- @description: 选择机构树  -->
      <org-tree
        v-model="showOrgTree"
        :title="title"
        :isSingle="isSingle"
        :orgOrDept="orgOrDept"
        :orgOrDeptId="orgOrDeptId"
        @orgList="getOrgList"
      ></org-tree>
    </div>
  </div>
</template>

<script>
import selectPerson from "components/tree/treeTansun";
import orgTree from "components/tree/orgTree";

export default {
  name: "add",
  components: { selectPerson, orgTree },
  created() {
    if (this.$route.query.type === "save") {
      this.isSave = true;
      this.btnType = "save";
      this.$api.duty.add().then(res => {
        if (res) {
          console.log(res, "打印打印1");
          this.formData = {
            ...this.dataFromQuery("data"),
            orgName: this.dataFromQuery("data").draftOrgan,
            currUnitName: res.currUnitName,
            currUnitId: res.currUnitId
          };
        }
      });
    } else {
      this.isOrgDisabled = true;
      this.$api.duty.add().then(res => {
        if (res) {
          console.log(res, "打印打印1");
          this.formData = {
            currUnitName: res.currUnitName,
            currUnitId: res.currUnitId
          };
        }
      });
    }
  },
  computed: {
    isColumTypeDisabled() {
      return this.btnType === "save" && this.btnType !== "edit";
    }
  },
  data() {
    return {
      isOrgDisabled: true,
      treeData: [],
      formData: {},
      isSave: false,
      btnType: "",
      rules: {
        orgName: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ],
        timeOverAlertInfo: [
          { required: true, message: "请输入超时提示内容", trigger: "blur" }
        ],
        blockingTime: [
          { required: true, message: "请选择截止时间", trigger: "blur" }
        ]
      },
      seletOptionsData: [],
      offenUse: false,
      checkIds: [] /** @description: 选中id列表 */,
      checkData: [] /** @description: 选中数据 */,
      singelCheckF: false /** @description: 单选true 多选为false */,
      dialogState: false /** @description: 默认隐藏选择人员树结构 */,
      dialogType: "",
      dialogTypeNow: "",
      /** @description:  */
      title: "选择机构",
      showOrgTree: false,
      isSingle: true,
      orgOrDept: 1,
      orgOrDeptId: "0"
    };
  },

  methods: {
    /** @description: 选择机构按钮 */
    selectOrg() {
      if (this.btnType === "save") {
        /** @description: 是保存按钮 */
        return;
      } else {
        this.showOrgTree = true; /** @description: 机构弹窗打开 */
      }
    },
    /** @description: 选择机构确定方法 */
    getOrgList(org) {
      this.$set(this.formData, "orgName", org.unitName);
      this.$set(this.formData, "orgId", org.id);
    },
    /** @description: 保存按钮 */
    save_btn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          /** @description: 表单校验通过 */
          if (this.tabsType === "add") {
            this.$api.duty.saveSubmitDateAddData(this.formData).then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.btnType = "save";
              this.isSave = !this.isSave;
              this.isSave = true;
              this.$intent.closeWindow(this);
            });
          } else {
            this.$api.duty.saveSubmitDateEditData(this.formData).then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.btnType = "save";
              this.isSave = !this.isSave;
              this.isSave = true;
              this.$intent.closeWindow(this);
            });
          }
        }
      });
    },
    /** @description: 编辑按钮 */
    edit_btn() {
      this.btnType = "edit";
      this.isSave = !this.isSave;
    },
    /** @description: 关闭按钮 */
    close_btn() {
      if (this.isSave == false) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save_btn();
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
      // this.$confirm("关闭前是否保存?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.save_btn(); /** @description: 调用保存方法 */
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //     /** @description: this.$message({ */
      //     /** @description: type: "info", */
      //     /** @description: message: "已取消关闭", */
      //     /** @description: }); */
      //   });
    },
    /** @description: 选人按钮 */
    selectPerson() {
      /** @description: 是保存按钮 */
      if (this.btnType === "save") {
        return;
      } else {
        this.dialogState = true; /** @description: 显示选择人树结构 */
      }
    },
    /** @description: 选人成功 */
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; /** @description: 关闭选择人员树弹窗 */
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
      let receivePersonId = [];

      let selectDataName = [];
      data &&
        data.map(item => {
          receivePersonId.push(item.id + "_" + item.name + "_" + item.deptId);
          selectDataName.push(item.name);
        });
      this.formData.receivePerson = this.getStrFromListAndSeparator(
        selectDataName
      );
      this.formData.receivePersonId = this.getStrFromListAndSeparator(
        receivePersonId
      );
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.add {
  background: white;
  margin: 0 auto;

  .headerClick {
    justify-content: space-between;
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

  .addHeader {
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
  .elementForm {
    width: 80%;
    margin: 0 auto;
    margin-top: 36px;
  }
}
</style>
