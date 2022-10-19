<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>模板配置</span>
      </div>
      <div class="right">
        <el-button v-if="!isSave" style="margin-left:20px;" size="mini" plain @click="save_btn">保存</el-button>
        <el-button v-else style="margin-left:20px;" size="mini" plain @click="edit_btn">编辑</el-button>
        <el-button style="margin-left:20px;" size="mini" plain @click="close_btn">关闭</el-button>
      </div>
    </div>

    <div class="addHeader">
      <div class="title-text">模板配置</div>
    </div>

    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="160px">
        <el-form-item label="附件引入" prop="activityCategory">
          <el-input class="left" v-model="formData.activityCategory" :disabled="isColumTypeDisabled" style="width:650px"></el-input>
          <el-button class="right" @click="leadIn" type="primary">引入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'add',
  components: {},
  created() {
    if (this.$route.query.type === 'save') {
      this.isSave = true
      this.btnType = 'save'
      this.formData = this.$route.query.rowData
    }
  },
  computed: {
    isColumTypeDisabled() {
      return this.btnType === 'save' && this.btnType !== 'edit'
    },
  },
  data() {
    return {
      formData: {},
      isSave: false,
      btnType: '',
      rules: {
        activityCategory: [{ required: true, message: '请输入活动类别', trigger: 'blur' }],
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
          this.$api.duty.saveActivityTableData({ ...this.formData }).then((res) => {
            this.$message.success('保存成功')
            this.isSave = true
          })
        }
      })
    },
    // 编辑按钮
    edit_btn() {
      this.btnType = 'edit'
      this.isSave = !this.isSave
    },
    // 关闭按钮
    close_btn() {
      this.$confirm('是否保存并退出当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.save_btn() // 调用保存方法
        })
        .catch(() => {
          this.$intent.closeWindow(this)
        })
    },
    // 引入
    leadIn() {},
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