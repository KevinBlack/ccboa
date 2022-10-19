<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>刊物编辑人配置</span>
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
        <el-form-item label="主管单位" prop="activityCategory">
          <el-input class="left" v-model="formData.receivePerson" :disabled="true" style="width:640px"></el-input>
          <el-button class="right" @click="selectPerson" type="primary" size="medium">选择人员</el-button>
        </el-form-item>
        <el-form-item label="编辑人员" prop="contentExample">
          <el-date-picker v-model="formData.createDate" type="date" placeholder="截止时间" :disabled="isColumTypeDisabled"></el-date-picker>
        </el-form-item>
      </el-form>
      <!--    选择人员树-->
      <select-person :treeData="treeData" :loadingTree="true" :seletOptionsData="seletOptionsData" :offenUse="offenUse" :dialogType="dialogType" :dialogTypeNow="dialogTypeNow" dialogTit="选择共享用户" :checkIds="checkIds" :checkData="checkData" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectPerson from 'components/tree/tree-fawen'

export default {
  name: 'add',
  components: { selectPerson },
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
        contentExample: [{ required: true, message: '请选择截止时间', trigger: 'blur' }],
      },
      seletOptionsData: [],
      offenUse: true,
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: false, // 单选true 多选为false
      dialogState: false, // 默认隐藏选择人员树结构
      dialogType: '',
      dialogTypeNow: '',
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
    // 选人按钮
    selectPerson() {},
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
