<template>
  <div class="selectDept">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>会议主办单</span>
      </div>
      <div class="right">
        <el-button v-for="(item,index) in buttonList" @click="buttonClick(item)" :key="index" size="mini" plain>{{item}}</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">中国建设银行信息报送处理单</div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{this.formData.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{this.formData.currentUser}}</span>
          </p>
        </div>
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿刊物" prop="submitPublication">
              <el-input v-model="formData.submitPublication" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿栏目" prop="submitColumn">
              <el-select v-model="formData.submitColumn" placeholder="请选择" @change="changeSubmitColumn">
                <el-option v-for="item in submitColumnData" :key="item.value" :label="item.columnCategory" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿单位" prop="submitUnit">
              <el-input v-model="formData.submitUnit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿部门" prop="submitDept">
              <el-select v-model="formData.submitDept" placeholder="请选择">
                <el-option v-for="item in submitDeptData" :key="item.value" :label="item.currUnitName" :value="item.currUnitId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿人" prop="submitPerson">
              <el-input v-model="formData.submitPerson" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel">
              <el-input type="phone" v-model="formData.tel" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿日期" prop="createDate">
              <el-date-picker v-model="formData.createDate" type="date" placeholder="投稿日期" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报送日期" prop="submitDate">
              <el-date-picker v-model="formData.submitDate" value-format="yyyy-MM-dd" type="date" placeholder="报送日期" :disabled="isSubmitDateDisabled"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动类别" prop="activityType">
              <el-checkbox-group v-model="formData.activityType" @change="handleChange" v-if="checkDataList.length>0">
                <el-checkbox v-for="item in checkDataList" :label="item.activityCategory" :val="item.id" :key="item.id"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align:center">
            <el-button size="mini" type="primary">参考示例</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formData.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核意见">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formData.auditIdea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input type="textarea" maxlength="200" :rows="4" placeholder="请输入内容" v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'sendHandle',
  components: {},
  data() {
    return {
      submitDeptData: [], // 投稿部门数据源
      submitColumnData: [], // 投稿栏目数据源
      rules: {
        tel: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        submitColumn: [{ required: true, message: '请选择投稿栏目', trigger: 'change' }],
        submitDept: [{ required: true, message: '请选择投稿部门', trigger: 'change' }],
        submitPerson: [{ required: true, message: '请输入投稿人', trigger: 'blur' }],
        submitUnit: [{ required: true, message: '请输入投稿单位', trigger: 'blur' }],
        createDate: [
          {
            required: true,
            message: '请选择投稿日期',
            trigger: 'change',
          },
        ],
        submitDate: [
          {
            required: true,
            message: '请选择报送日期',
            trigger: 'change',
          },
        ],
        activityType: [
          {
            type: 'array',
            required: true,
            message: '请勾选活动类别',
            trigger: 'blur',
          },
        ],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
      // 按钮
      buttonList: ['关闭', '保存', '完成并发送', '打印处理单', '查看流程', '投稿'],
      // 表单的值
      formData: {
        activityType: [],
      },
      checkDataList: [],
      // 路由传参的标识
      fromType: '',
      resData: {},
      rowData: {},
      submitId: '',
    }
  },
  computed: {
    // 是否禁用报送日期
    isSubmitDateDisabled() {
      return this.fromType === 'add' && this.fromType !== 'sumitPage'
    },
  },
  created() {
    // 获取通过路由传过来的参数
    if (this.$route.query.type) {
      this.fromType = this.$route.query.type // 路由传参的是否是拟稿的标识
      if (this.fromType === 'add') {
        this.rules.submitDate = []
        this.$api.duty.add().then((res) => {
          this.formData = {
            ...res,
            activityType: [],
            submitUnit: res.currUnitName,
            submitPerson: res.currentUser,
            submitPublication: '值班动态',
          }
        })
      } else {
        // 当前行详情
        this.rowData = JSON.parse(this.$route.query.data)
      }
    }
  },
  mounted() {
    this.getSubmitDept()
    this.getSubmitColumn()
    this.getCheckboxList()
  },
  methods: {
    // 投稿栏目下拉值改变时
    changeSubmitColumn(val) {
      if (val === '') {
      }
    },
    // 点击按钮
    buttonClick(item) {
      if (item === '保存') {
        // 调用保存方法
        this.save()
      } else if (item === '关闭') {
        this.$router.back()
      } else if (item === '完成并发送') {
        this.submit()
      } else if (item === '投稿') {
        this.fromType = 'sumitPage' // 投稿标示
        this.rules.submitDate = [
          // 报送日期禁用
          {
            required: true,
            message: '请选择报送日期',
            trigger: 'change',
          },
        ]
        // 调用完成并发送方法
        this.submitData()
      }
    },
    // 保存
    save() {
      this.$refs.form.validate((valid) => {
        // 表单校验
        if (valid) {
          this.$api.duty.handleSave({ ...this.formData }).then((res) => {
            console.log(res, '打印保存返回的数据')
            this.submitId = res.id
            this.$message.success('保存成功')
          })
        }
      })
    },
    // 完成并发送
    submit() {},
    // 投稿
    submitData() {
      this.$api.duty.submitFormData({ ...this.submitId }).then((res) => {
        this.$message.success('投稿成功')
      })
    },
    // 获取投稿部门数据源
    getSubmitDept() {
      this.$api.duty.getSubmitDeptData().then((res) => {
        this.submitDeptData = res.departList
      })
    },
    // 获取投稿栏目数据源
    getSubmitColumn() {
      this.$api.duty.getSubmitColumnData({ columnType: '1' }).then((res) => {
        this.submitColumnData = res.columnCategoryList
      })
    },
    // 获取活动类别
    getCheckboxList() {
      this.$api.duty.checkboxData({ data: {} }).then((res) => {
        this.checkDataList = res.list
      })
    },
    // 当绑定值变化时触发的事件
    handleChange() {},
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.selectDept {
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

  .formHeader {
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
  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }
  }
}
</style>
