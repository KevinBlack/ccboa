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
        <el-button style="margin-left:20px;" size="mini" plain @click="colose_btn">关闭</el-button>
      </div>
    </div>

    <div class="addHeader">
      <div class="title-text">基本配置</div>
    </div>

    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="160px">
        <el-form-item label="总行默认栏目" prop="innerDefaultConfig_Name">
          <el-input v-model="formData.innerDefaultConfig_Name" maxlength="80" :disabled="isColumTypeDisabled"></el-input>
        </el-form-item>
        <el-form-item label="分行默认栏目" prop="outerDefaultConfig_Name">
          <el-input v-model="formData.outerDefaultConfig_Name" maxlength="80" :disabled="isColumTypeDisabled"></el-input>
        </el-form-item>
        <el-form-item label="子公司默认栏目" prop="companyDefaultConfig_Name">
          <el-input v-model="formData.companyDefaultConfig_Name" maxlength="80" :disabled="isColumTypeDisabled"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add',
  components: {},
  created() {
    this.tabsType = this.$route.query.tabsType
    console.log('this.tabsType', this.tabsType)
    if (this.$route.query.tabsType === 'save') {
      this.isSave = true
      this.btnType = 'save'
      console.log(JSON.parse(this.$route.query.rowData), 'this.$route.query.rowData')
      this.formData =JSON.parse(this.$route.query.rowData)
    }
  },
  computed: {
    // 是否禁用表单
    isColumTypeDisabled() {
      return this.btnType === 'save' && this.btnType !== 'edit'
    },
  },
  data() {
    return {
      formData: {},
      options: [],
      isSave: false,
      btnType: '',
      tabsType: '',
      rules: {
        innerDefaultConfig_Name: [
          { required: true, message: '请输入总行默认栏目', trigger: 'blur' },
        ],
        outerDefaultConfig_Name: [
          { required: true, message: '请输入分行默认栏目', trigger: 'blur' },
        ],
        companyDefaultConfig_Name: [
          { required: true, message: '请输入子公司默认栏目', trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    // 保存按钮
    save_btn() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.btnType = 'save'
          this.isSave = !this.isSave
          if (this.tabsType === '00002') {
            const reqData = Object.assign(this.$route.query.rowData, this.formData)
            console.log(reqData, '打印reqData')
            this.$api.duty
              .saveFormData({
                ...reqData,
                route: this.tabsType,
              })
              .then((res) => {
                this.$message.success('保存成功')
                this.isSave = true
              })
          } else {
            this.$api.duty
              .saveFormData({ ...this.formData, columnType: this.tabsType })
              .then((res) => {
                this.$message.success('保存成功')
                this.isSave = true
              })
          }
        }
      })
    },
    // 编辑按钮
    edit_btn() {
      this.btnType = 'edit'
      this.isSave = !this.isSave
    },
    // 关闭按钮
    colose_btn() {
      this.$intent.closeWindow(this);
    },
  },
}
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


