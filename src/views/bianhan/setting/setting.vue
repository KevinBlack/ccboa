<template>
  <div class="sys_con">
    <p class="order_title">便函系统设置</p>
    <div class="sys_content">
      <div class="tid_box">
        <span>参数之间以英文半角";"进行分隔</span>
      </div>
      <div class="form_box">
        <el-form label-width="100px" :model="formdata">
          <el-form-item label="机构名称">
            <el-input v-model="formdata.unitName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="生成编号控制">
            <div class="radio_box">
              <el-checkbox v-model="formdata.numberControl" true-label="1" false-label="0">出部门编号校验</el-checkbox>
            </div>
          </el-form-item>
          <el-form-item label="便函编号方式">
            <div class="radio_box">
              <el-radio-group v-model="formdata.numberType">
                <el-radio :label="0">机构名称</el-radio>
                <el-radio :label="1">一级部门名称</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_list">
        <el-button @click="closeWin">关闭</el-button>
        <el-button type="primary" @click="saveData">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "sysconfig",
  components: {},
  data() {
    return {
      sttingId: "",
      formdata: {}
    };
  },
  created() {
    this.sttingId = this.$route.query.id;
    if (this.sttingId) {
      this.querySttingDeal();
    }
  },
  methods: {
    querySttingDeal() {
      this.$api.bianhan.settingDeal({ id: this.sttingId }).then(res => {
        this.formdata = res.data;
      });
    },
    closeWin() {
      this.$router.back();
    },
    saveData() {
      this.$api.bianhan.alertSetting(this.formdata).then(res => {
        this.$router.back();
        this.$message({
          type: "success",
          message: "保存成功"
        });
      });
    }
  }
};
</script>
<style scoped lang="less">
.sys_con {
  width: 90%;
  height: 800px;
  margin: 0 auto;

  .order_title {
    width: 100%;
    height: 70px;
    color: #2b66e3;
    text-align: center;
    font-size: 36px;
  }

  .sys_content {
    width: 100%;
    height: 560px;
    border: 1px solid #c3c3c3;
    padding: 16px;

    .tid_box {
      width: 90%;
      height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;
      margin: 0 auto;
      line-height: 30px;
      color: #ff7421;

      span {
        margin-left: 24px;
      }
    }

    .form_box {
      width: 90%;
      height: 60%;
      margin: 0 auto;
      margin-top: 16px;

      .radio_box {
        width: 100%;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        color: #606266;
        line-height: 40px;
        padding-left: 4%;
      }
    }

    .btn_list {
      width: 260px;
      margin: 0 auto;
      display: flex;
    }
  }
}

.chooisecolor {
  color: #2b66e3;
}
</style>
