<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>活动类别配置</span>
      </div>
      <div class="right">
        <el-button
          style="margin-left:20px;"
          class="bank_grid_comtent_active"
          size="mini"
          plain
          @click="close_btn"
        >关闭</el-button>
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
          style="margin-left:20px;"
          class="bank_grid_comtent_active"
          size="mini"
          plain
          @click="edit_btn"
        >编辑</el-button>
      </div>
    </div>

    <div class="addHeader">
      <div class="title-text">基本配置</div>
    </div>

    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="100px">
        <!-- <el-form-item label="机构名称" prop="orgName">
          <el-input class="left" v-model="formData.orgName" :disabled="isActivityTypeDisabled||isOrgDisabled" style="width:640px"></el-input>
          <el-button class="right" @click="selectOrg" type="primary" size="medium">选择机构</el-button>
        </el-form-item>-->
        <el-form-item label="活动类别" prop="activityCategory">
          <el-input
            v-model="formData.activityCategory"
            maxlength="80"
            :disabled="isActivityTypeDisabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容格式示例" prop="contentExample">
          <el-input v-model="formData.contentExample" :disabled="isActivityTypeDisabled"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="formData.keywords" :disabled="isActivityTypeDisabled"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <span>“关键字可为多个，需用“；”分割。”</span>
        </el-form-item>
      </el-form>
    </div>
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
</template>

<script>
import orgTree from "components/tree/secorgTrees";

export default {
  name: "add",
  components: { orgTree },
  created() {
    this.tabsType = this.$route.query.tabsType; /** @description: 新增 */
    if (this.$route.query.type === "save") {
      this.isSave = true;
      this.btnType = "save";
      this.formData = this.dataFromQuery("rowData");
      console.log(this.formData);
      this.formData.orgName = this.dataFromQuery("rowData").draftOrgan;
    }
    if (this.tabsType === "add") {
      this.isOrgDisabled = true;
    }
  },
  computed: {
    isActivityTypeDisabled() {
      return this.btnType === "save" && this.btnType !== "edit";
    }
  },
  data() {
    return {
      isOrgDisabled: true,
      tabsType: "",
      formData: {
        orgName: ""
      },
      isSave: false,
      btnType: "",
      rules: {
        // orgName: [{ required: true, message: '请选择机构名称', trigger: 'blur' }],
        activityCategory: [
          { required: true, message: "请输入活动类别", trigger: "blur" }
        ],
        contentExample: [
          { required: true, message: "请输入内容格式示例", trigger: "blur" }
        ]
      },
      /** @description:  */
      title: "选择机构",
      showOrgTree: false,
      isSingle: true,
      orgOrDept: 1,
      orgOrDeptId: "0"
    };
  },

  methods: {
    /** @description: 选择机构按钮方法 */
    getOrgList(org) {
      // this.$set(this.formData, 'orgName', org.unitName)
      this.$set(this.formData, "orgId", org.id);
      this.$set(
        this.formData,
        "receivePerson",
        ""
      ); /** @description: 清空接收人员值 */
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
            this.$api.duty.saveActivityTableData(this.formData).then(res => {
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
            this.$api.duty
              .saveActivityEditTableData(this.formData)
              .then(res => {
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
        } else {
          this.$message({
            type: "warning",
            message: "请填写表单"
          });
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
      // this.$confirm('关闭前是否保存?', '提示', {
      //   confirmButtonText: '是',
      //   cancelButtonText: '否',
      //   type: 'warning',
      // })
      //   .then(() => {
      //     this.save_btn() /** @description: 调用保存方法 */
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //     /** @description: this.$message({ */
      //     /** @description: type: 'info', */
      //     /** @description: message: '已取消关闭', */
      //     /** @description: }) */
      //   })
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