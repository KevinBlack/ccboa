<template>
  <div class="workingHoursDetail">
    <p class="base-title">定密依据配置</p>
    <div class="btn-list">
      <el-button type="primary" @click="close">关闭</el-button>
      <el-button type="primary" @click="saveData" v-if="isShowSave || actionType==='0'">保存</el-button>
      <el-button type="primary" @click="edit" v-if="!isShowSave && actionType==='1'">编辑</el-button>
    </div>
    <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="formDdate">
      <el-form-item label="秘密类型" prop="secretType">
        <el-select v-model="value" :disabled="isDisabled" @change="change">
          <el-option
            v-for="item in formData.secretType"
            :key="item.dicId"
            :label="item.codeName"
            :value="item.dicId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="定密依据" prop="secretContent">
        <el-input type="textarea" v-model="formData.secretContent" :disabled="isDisabled"></el-input>
      </el-form-item>
      <span style="color: red;">填空地方请用(xx)代替，多条条款之间用回车键换行隔开</span>
    </el-form>
  </div>
</template>

<script>
import configsApis from "@/httpTansun/api/setting/setSysConfig.js";
export default {
  name: "asas",
  data() {
    return {
      canSave: true,
      tableData: [],
      row: {},
      saveSecretType: "",
      isDisabled: false,
      actionType: "",
      isShowSave: false,
      formData: {
        secretType: [
          {
            dicCode: "",
            codeName: "",
          },
        ],
        secretContent: "",
      },
      rules: {
        secretType: [
          { required: true, message: "请选择定秘类型", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        secretContent: [
          { required: false, message: "请输入定秘依据", trigger: "blur" },
          // { type: 'textarea',  message: '', trigger: ['blur', 'change'] }
        ],
      },
      value: "",
    };
  },
  methods: {
    //编辑按钮
    edit() {
      //调用获取定秘类型接口
      this.getsecretType();
      this.isShowSave = true;
      this.isDisabled = false;
      //获取该条数据的详情
      configsApis.setSecretBaseConfigDetail({ id: this.row.id }).then((res) => {
        this.saveSecretType = res.data.secretType;
        console.log("----this.secretType---", this.saveSecretType);
      });
    },
    //选项框数据变化
    change(data) {
      for (let val of this.tableData) {
        if (val.secretType === data && val.secretType !== this.saveSecretType) {
          this.canSave = false;
          this.$message({
            type: "warning",
            message: "定秘类型重复，请重新选择或删除旧信息",
          });
          return;
        }
      }
      this.saveSecretType = data;
      console.log("xuanzhogn", this.saveSecretType);
    },
    //关闭按钮
    close() {
      //如果定密类型重复，可直接关闭
      if (!this.canSave) {
        this.$router.go(-1);
        return;
      }
      //判断是否保存
      if (this.actionType === "1" && this.isShowSave === false) {
        this.$router.go(-1);
        return;
      }
      this.$confirm("是否继续?").then(() => {
        this.saveData();
      });
    },
    //保存数据按钮
    saveData() {
      let data = {};
      if (this.actionType === "1") {
        data = {
          id: this.$route.query.row.id ? this.$route.query.row.id : "",
          secretType: this.saveSecretType,
          secretContent: this.formData.secretContent,
        };
        this.saveApi(data);
      } else {
        data = {
          secretType: this.saveSecretType,
          secretContent: this.formData.secretContent,
        };
        this.saveApi(data);
      }
    },
    //保存数据接口
    saveApi(data) {
      if (!this.$refs.formData.validate()) {
        return;
      }
      if (!this.canSave) {
        this.$message({
          type: "warning",
          message: "定秘类型重复，请重新选择或删除旧信息",
        });
        return;
      }
      configsApis
        .setSecretBaseConfigSave(data)
        .then((res) => {
          console.log("----定密依据保存结果---", res);
          this.isShowSave = false;
          this.$router.go(-1);
        })
        .catch((err) => {});
    },
    //获取定秘类型
    getsecretType() {
      const data = {
        isCodeName: "定密类型",
        isCodeType: "secret_type",
        searchData: { sortKey: "", sort: "" },
      };
      configsApis.setSecretTypeQuery(data).then((res) => {
        console.log("1111111111");
        this.formData.secretType = res.data;
      });
    },
    getSecretTypeList() {
      //调用获取定秘类型列表
      configsApis.setSecretBaseConfigList({}).then((res) => {
        console.log("----dingmiyiju list-------", res);
        this.tableData = JSON.parse(JSON.stringify(res.data));
        console.log(this.tableData);
      });
    },
  },
  created() {
    this.actionType = this.$route.query.type;
    this.getSecretTypeList();
    if (this.actionType === "1") {
      console.log("22222222222");
      this.isDisabled = true;
      this.row = this.$route.query.row;
      this.formData = this.$route.query.row;
      this.value = this.formData.secretTypeName;

      this.isShowSave = false;
    } else {
      this.getsecretType();
      this.isDisabled = false;
      this.isShowSave = true;
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.workingHoursDetail {
  width: 90%;
  height: 100%;
  margin: 0 auto;

  .formDdate {
    margin-top: 24px;
    border: 1px solid #7e8c8d;
    padding: 20px;
  }

  .base-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    color: #3c86f0;
  }
}
</style>
