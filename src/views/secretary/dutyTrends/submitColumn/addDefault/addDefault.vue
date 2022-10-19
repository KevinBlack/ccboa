<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>投稿相关配置</span>
      </div>
      <div class="right">
        <el-button v-if="!isSave" style="margin-left:20px;" size="mini" plain @click="save_btn">保存</el-button>
        <el-button v-else style="margin-left:20px;" size="mini" plain @click="edit_btn">编辑</el-button>
        <el-button style="margin-left:20px;" size="mini" plain @click="close_btn">关闭</el-button>
      </div>
    </div>
    <div class="addHeader">
      <div class="title-text">基本配置</div>
    </div>
    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="160px">
        <el-form-item label="总行默认栏目" prop="innerDefaultConfig_Name">
          <el-select
            v-model="formData.innerDefaultConfig_Name"
            placeholder="请选择"
            :disabled="isColumTypeDisabled"
          >
            <el-option
              v-for="item in innerDefaultConfigData"
              :key="item.value"
              :label="item.innerDefaultConfig_Name"
              :value="item.innerDefaultConfig_Name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分行默认栏目" prop="outerDefaultConfig_Name">
          <el-select
            v-model="formData.outerDefaultConfig_Name"
            placeholder="请选择"
            :disabled="isColumTypeDisabled"
          >
            <el-option
              v-for="item in outerDefaultConfigData"
              :key="item.value"
              :label="item.outerDefaultConfig_Name"
              :value="item.outerDefaultConfig_Name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子公司默认栏目" prop="companyDefaultConfig_Name">
          <el-select
            v-model="formData.companyDefaultConfig_Name"
            placeholder="请选择"
            :disabled="isColumTypeDisabled"
          >
            <el-option
              v-for="item in companyDefaultConfigData"
              :key="item.value"
              :label="item.companyDefaultConfig_Name"
              :value="item.companyDefaultConfig_Name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "add",
  created() {
    this.tabsType = this.$route.query.tabsType;
    this.routerParams = this.$route.query.type;
    console.log("this.tabsType", this.tabsType);
    if (this.$route.query.type === "save") {
      this.isSave = true;
      this.btnType = "save";
      console.log(this.$route.query.innerList, "this.$route.query.rowData");
      this.formData = JSON.parse(this.$route.query.rowData);
    }
  },
  mounted() {
    this.loadDefaultData();
  },
  computed: {
    /** @description: 是否禁用表单 */
    isColumTypeDisabled() {
      return this.btnType === "save" && this.btnType !== "edit";
    }
  },
  data() {
    return {
      formData: {},
      isSave: false,
      btnType: "",
      tabsType: "",
      routerParams: "",
      defaultConfigData: [],
      innerDefaultId: "",
      outerDefaultId: "",
      companyDefaultId: "",
      companyDefaultConfigData: [],
      outerDefaultConfigData: [],
      innerDefaultConfigData: [],
      rules: {
        innerDefaultConfig_Name: [
          { required: true, message: "请输入总行默认栏目", trigger: "blur" }
        ],
        outerDefaultConfig_Name: [
          { required: true, message: "请输入分行默认栏目", trigger: "blur" }
        ],
        companyDefaultConfig_Name: [
          { required: true, message: "请输入子公司默认栏目", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    /** @description: 保存按钮 */
    save_btn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.btnType = "save";
          this.isSave = !this.isSave;
          if (this.tabsType === "00002") {
            if (this.routerParams === "save") {
              this.innerDefaultConfigData.map(item => {
                if (
                  item.innerDefaultConfig_Name ===
                  this.formData.innerDefaultConfig_Name
                ) {
                  this.innerDefaultId = item.innerDefaultConfig_Id;
                }
              });
              this.outerDefaultConfigData.map(item => {
                if (
                  item.outerDefaultConfig_Name ===
                  this.formData.outerDefaultConfig_Name
                ) {
                  this.outerDefaultId = item.outerDefaultConfig_Id;
                }
              });
              this.companyDefaultConfigData.map(item => {
                if (
                  item.companyDefaultConfig_Name ===
                  this.formData.companyDefaultConfig_Name
                ) {
                  this.companyDefaultId = item.companyDefaultConfig_Id;
                }
              });
              /** @description: 点击默认栏目配置当前行 */
              this.$api.duty
                .saveDefaultFormData({
                  route: this.tabsType,
                  type:
                    "1" +
                    "_" +
                    this.innerDefaultId +
                    "," +
                    "2" +
                    "_" +
                    this.outerDefaultId +
                    "," +
                    "3" +
                    "_" +
                    this.companyDefaultId
                })
                .then(res => {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                  this.isSave = true;
                  this.$intent.closeWindow(this);
                });
            } else {
              this.innerDefaultConfigData.map(item => {
                if (
                  item.innerDefaultConfig_Name ===
                  this.formData.innerDefaultConfig_Name
                ) {
                  this.innerDefaultId = item.innerDefaultConfig_Id;
                }
              });
              this.outerDefaultConfigData.map(item => {
                if (
                  item.outerDefaultConfig_Name ===
                  this.formData.outerDefaultConfig_Name
                ) {
                  this.outerDefaultId = item.outerDefaultConfig_Id;
                }
              });
              this.companyDefaultConfigData.map(item => {
                if (
                  item.companyDefaultConfig_Name ===
                  this.formData.companyDefaultConfig_Name
                ) {
                  this.companyDefaultId = item.companyDefaultConfig_Id;
                }
              });
              /** @description: 点击默认栏目配置新增 */
              this.$api.duty
                .saveDefaultFormData({
                  type:
                    "1" +
                    "_" +
                    this.innerDefaultId +
                    "," +
                    "2" +
                    "_" +
                    this.outerDefaultId +
                    "," +
                    "3" +
                    "_" +
                    this.companyDefaultId
                })
                .then(res => {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                  this.isSave = true;
                  this.$intent.closeWindow(this);
                });
            }
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
    },
    /** @description: 获取默认栏目配置表单下拉框数据 */
    loadDefaultData() {
      this.$api.duty.submitColumnDefalutForm({}).then(res => {
        this.innerDefaultConfigData = res && res.innerList;
        this.outerDefaultConfigData = res && res.outerList;
        this.companyDefaultConfigData = res && res.companyList;
      });
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
    justify-content: space-between;
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


