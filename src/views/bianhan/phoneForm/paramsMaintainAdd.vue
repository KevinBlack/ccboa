
<template>
  <div class="selectDept">
    <div class="title">参数维护</div>
    <div class="btn">
      <el-button type="primary" size="mini" @click="closeData">关闭</el-button>
      <el-button v-if="!disabled" type="primary" size="mini" @click="saveData">保存</el-button>
      <el-button v-if="disabled" 　type="primary" size="mini" @click="disabled=false">编辑</el-button>
    </div>
    <div class="main">
      <el-form label-width="80px" ref="formData" v-model="formData">
        <el-form-item label="机构名称">
          <!-- <el-input v-model="formData.unitName" :disabled="disabled" @focus="itemClick"></el-input> -->
          <el-input :disabled="true" v-model="formData.unitName"></el-input>
        </el-form-item>
        <el-form-item label="年度">
          <el-input :disabled="disabled" v-model="formData.yearNo"></el-input>
        </el-form-item>
        <el-form-item label="起始编号">
          <el-input :disabled="disabled" v-model="formData.initialNo"></el-input>
        </el-form-item>
        <el-form-item label="当前最大编号">
          <el-input :disabled="disabled" v-model="formData.fileNo"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script >
import apis from "@/httpTansun/api/secreatary/phonenote.js";
export default {
  name: "paramsMatainianAdd",
  data() {
    return {
      isSingle: false,
      orgOrDept: 1,
      //选择机构弹出框
      showOrgTree: false,
      disabled: false,
      type: 0,
      formData: {
        unitName: "",
        unitId: "",
        yearNo: "",
        initialNo: ""
      }
    };
  },
  methods: {
    //关闭按钮
    closeData() {
      // this.$router.go(-1)
      if (!this.disabled) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.saveData();
              this.$router.back();
            } else if (action === "cancel") {
              //点否
              this.$router.back();
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$router.back();
      }
    },
    //保存
    saveData() {
      const that = this;
      if (that.type === 1) {
        apis.paramsMaintainListEdit(that.formData).then(res => {
          if (res.code === "SUCCESS") {
            that.disabled = true;
            that.$message({
              type: "success",
              message: "修改成功！"
            });
          }
        });
      } else {
        apis.paramsMaintainListAdd(that.formData).then(res => {
          if (res.code === "SUCCESS") {
            that.disabled = true;
            that.$message({
              type: "success",
              message: "新增成功"
            });
          }
        });
      }
    },
    //请求机构按钮点击事件-弹出框
    itemClick() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "0";
      this.showOrgTree = true;
    }
  },
  created() {
    const data = this.$route.query.rowData;
    this.type = this.$route.query.type;
    if (this.type === 1) {
      this.disabled = true;
      this.formData = data;
    } else {
      this.disabled = false;
      this.formData.unitName = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitName;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.title {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
.main {
  border: 1px solid rgb(218, 215, 215);
  padding: 15px 20px;
  width: 1200px;
  margin: 10px auto;
}
.btn {
  margin-left: 66px;
}
</style>
