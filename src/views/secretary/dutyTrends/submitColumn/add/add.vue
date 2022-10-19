<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>投稿栏目配置</span>
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
          style="margin-left:20px;"
          class="bank_grid_comtent_active"
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
      <div class="title-text">栏目类别</div>
    </div>
    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="栏目类别" prop="columnCategory">
          <el-input
            v-model="formData.columnCategory"
            maxlength="80"
            :disabled="isColumTypeDisabled"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import orgTree from "components/tree/orgTree";

export default {
  name: "add",
  data() {
    return {
      formData: { columnCategory: "" } /** @description: 表单的值 */,
      isSave: false /** @description: 默认显示保存按钮 */,
      btnType: "" /** @description: 按钮类型标识 */,
      tabsType: "" /** @description: 路由参数 */,
      /** @description: 输入框校验 */
      rules: {
        columnCategory: [
          { required: true, message: "请输入栏目类别", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.tabsType = this.$route.query.tabsType;

    console.log("this.tabsType", this.tabsType);
    if (this.$route.query.tabsType === "save") {
      this.isSave = true; /** @description: 隐藏保存按钮 */
      this.btnType = "save";
      this.formData = JSON.parse(
        this.$route.query.rowData
      ); /** @description: 当前行 */
      // this.$set( this.formData,"columnCategory",this.$route.query.rowData.columnCategory)
      console.log(this.formData, "this.formData");
    }
  },
  computed: {
    /** @description: 禁用栏目类别框 */
    isColumTypeDisabled() {
      return this.btnType === "save" && this.btnType !== "edit";
    }
  },
  methods: {
    /** @description: 保存按钮 */
    save_btn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.btnType = "save";
          this.isSave = !this.isSave;
          /** @description: 表单校验通过 */
          if (this.$route.query.type === "save") {
            /** @description: 修改保存 */
            this.$api.duty
              .saveFormUpdateData({
                ...this.formData,
                columnType: this.tabsType
              })
              .then(res => {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.isSave = true; /** @description: 隐藏保存按钮 */
                this.$intent.closeWindow(this);
              });
          } else {
            /** @description: 新增保存 */
            this.$api.duty
              .saveFormData({ ...this.formData, columnType: this.tabsType })
              .then(res => {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
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
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.add {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
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


