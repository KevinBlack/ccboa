<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>接收人员配置</span>
      </div>
      <div class="right">
        <el-button v-if="!isSave" style="margin-left:20px;" size="mini" plain @click="save_btn">保存</el-button>
        <el-button v-else style="margin-left:20px;" size="mini" plain @click="edit_btn">编辑</el-button>
        <el-button style="margin-left:20px;" size="mini" plain @click="close_btn">关闭</el-button>
      </div>
    </div>

    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="接收人员" prop="receivePerson">
          <el-input class="left" v-model="formData.receivePerson" :disabled="isRecievePersonDisabled" style="width:640px"></el-input>
          <el-button class="right" @click="selectPerson" type="primary" size="medium">选择人员</el-button>
        </el-form-item>

        <el-form-item label="配置说明:">
          <span>配置接收本行发布的值班动态人员</span>
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
  components: {
    selectPerson,
  },
  created() {
    this.tabsType = this.$route.query.tabsType // 新增
    // 如果是点击主列表当前行跳转过来的
    if (this.$route.query.type === 'save') {
      this.isSave = true // 隐藏保存按钮
      this.btnType = 'save' //
      this.formData = this.$route.query.rowData // 当前行赋值
    }
  },
  computed: {
    // 控制输入框是否禁用
    isRecievePersonDisabled() {
      return this.btnType === 'save' && this.btnType !== 'edit'
    },
  },
  data() {
    return {
      // 表单对象
      formData: {
        receivePerson: '',
      },
      tabsType: '', // 新增时路由传的参数
      isSave: false, // 默认显示保存按钮
      btnType: '', // 按钮类型
      rules: {
        receivePerson: [{ required: true, message: '请输入接收人员', trigger: 'blur' }],
      },
      treeData: [],
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
          // 表单校验通过
          if (this.tabsType === 'add') {
            this.$api.duty.saveReceivePersonAddData(this.formData).then((res) => {
              this.$message.success('保存成功')
              this.btnType = 'save'
              this.isSave = !this.isSave
              this.isSave = true
            })
          } else {
            this.$api.duty.saveReceivePersonEditData(this.formData).then((res) => {
              this.$message.success('保存成功')
              this.btnType = 'save'
              this.isSave = !this.isSave
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
    // 选择人员按钮
    selectPerson() {
      this.dialogState = true // 显示选择人树结构
    },
    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false // 关闭选择人员树弹窗
      console.log('data', data, 'status', status, 'type', type, 'params', params, 'dtype', dtype)
      let receivePersonId = []
      let selectDataName = []
      data &&
        data.map((item) => {
          receivePersonId.push(item.id + '_' + item.name + '_' + item.deptId)
          selectDataName.push(item.name)
        })
      this.formData.receivePerson = selectDataName.join(',')
      this.formData.receivePersonId = receivePersonId.join(',')
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
