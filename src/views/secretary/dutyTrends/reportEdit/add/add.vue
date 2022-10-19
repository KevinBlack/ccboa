<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>刊物编辑人配置</span>
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
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
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
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="主管单位" prop="draftOrgan">
          <el-input
            class="left"
            v-model="formData.draftOrgan"
            :disabled="isEditPersonDisabled||isOrgDisabled"
            style="width:640px"
          ></el-input>
          <el-button class="right" @click="selectOrg" type="primary" size="medium">选择机构</el-button>
        </el-form-item>
        <el-form-item label="编辑人员" prop="editPerson">
          <el-input
            class="left"
            v-model="formData.editPerson"
            :disabled="isEditPersonDisabled"
            style="width:640px"
          ></el-input>
          <el-button class="right" @click="selectPerson" type="primary" size="medium">选择人员</el-button>
        </el-form-item>
      </el-form>
      <!-- @description: 选择人员树 -->
      <select-person
        :orgId="formData.draftOrganId"
        :needFirdLoad="needFirdLoad"
        :treeData="treeData"
        :loadingTree="true"
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
    this.tabsType = this.$route.query.tabsType; /** @description: 新增 */
    /** @description: 如果是点击主列表当前行跳转过来的 */
    if (this.$route.query.tabsType === "save") {
      this.isSave = true;
      this.btnType = "save";
      this.formData = this.dataFromQuery("data");
    } else {
      this.isOrgDisabled = true;
    }
  },
  computed: {
    /** @description: 控制表单是否禁用 */
    isColumTypeDisabled() {
      return this.btnType === "save" && this.btnType !== "edit";
    }
  },
  data() {
    return {
      needFirdLoad: true,
      isOrgDisabled: true,
      treeData: [],
      formData: {},
      isSave: false,
      btnType: "" /** @description: 按钮类型 */,
      tabsType: "" /** @description: 新增时路由传的参数 */,
      rules: {
        draftOrgan: [
          { required: true, message: "请选择主管单位", trigger: "blur" }
        ],
        editPerson: [
          { required: true, message: "请选择编辑人员", trigger: "blur" }
        ]
      },
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
  computed: {
    /** @description: 控制输入框是否禁用 */
    isEditPersonDisabled() {
      return this.btnType === "save" && this.btnType !== "edit";
    }
  },

  methods: {
    getOrgList(org) {
      /** @description: 选择机构成功 */
      this.$set(this.formData, "draftOrgan", org.unitName);
      this.$set(this.formData, "draftOrganId", org.id);
      this.$set(
        this.formData,
        "editPerson",
        ""
      ); /** @description: 清空编辑人员值 */
    },
    /** @description: 选择机构按钮 */
    selectOrg() {
      if (this.btnType === "save") {
        /** @description: 是保存按钮 */
        return;
      } else {
        this.showOrgTree = true; /** @description: 机构弹窗打开 */
      }
    },
    /** @description: 保存按钮 */
    save_btn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          /** @description: 表单校验通过 */
          if (this.tabsType === "add") {
            /** @description: 新增保存 */
            this.$api.duty.saveReportEditAddData(this.formData).then(res => {
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
            /** @description: 修改保存 */
            console.log(this.formData);
            this.formData.editPersonId = this.formData.editPersonId.split(
              "_"
            )[0];
            this.$api.duty.saveReportEditData(this.formData).then(res => {
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
      //     /** @description: type: 'info', */
      //     /** @description: message: '已取消关闭', */
      //     /** @description: }) */
      //   });
    },
    /** @description: 选人按钮 */
    selectPerson() {
      if (this.btnType === "save") {
        /** @description: 是保存按钮 */
        return;
      } else {
        if (this.formData.draftOrgan) {
          /** @description: 机构名称有值 */
          this.dialogState = true; /** @description: 显示选择人树结构 */
        } else {
          this.$message({
            type: "warning",
            message: "请先选择机构"
          });
        }
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
      let editPersonId = [];
      let selectDataName = [];
      data &&
        data.map(item => {
          editPersonId.push(
            item.code +
              "_" +
              item.name +
              "_" +
              // item.deptId +
              // "_" +
              this.formData.draftOrganId +
              /** @description: this.formData.currUnitId + */
              "_" +
              this.formData.draftOrgan
          );
          selectDataName.push(item.name);
        });
      console.log(selectDataName);

      this.formData.editPerson = this.getStrFromListAndSeparator(
        selectDataName
      );
      this.formData.editPersonId = this.getStrFromListAndSeparator(
        editPersonId
      );
      console.log(this.formData);
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
