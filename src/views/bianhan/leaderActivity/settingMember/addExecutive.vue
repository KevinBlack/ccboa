<!--
 * @Author: your name
 * @Date: 2021-01-18 11:44:11
 * @LastEditTime: 2021-02-01 17:29:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa0301\src\views\secretary\leaderActivity\settingMember\addParty.vue
--> 
<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closeWin">关闭</el-button>
      <el-button type="primary" v-if="this.editFlag==='edit'" @click="toEdit">编辑</el-button>
      <el-button type="primary" v-else @click="savedata">保存</el-button>
    </div>
    <p class="base-title">高管人员信息</p>
    <div class="formdata">
      <el-row>
        <el-form :rules="rules" ref="form" :model="formData" label-width="100px">
          <el-form-item 　prop="leaderHumanId" label="高管姓名">
            <el-row :gutter="10">
              <el-select
                class="inputWidth"
                v-model="formData.leaderHumanId"
                :disabled="isDisabled"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in dwdata"
                  :key="index"
                  :label="item.leaderCnName"
                  :value="item.humanCode"
                ></el-option>
              </el-select>
            </el-row>
          </el-form-item>

          <el-form-item label="秘书姓名" prop="secHumanId">
            <el-row :gutter="10">
              <el-select
                class="inputWidth"
                v-model="formData.secHumanId"
                :disabled="isDisabled"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in mishudata"
                  :key="index"
                  :label="item.leaderCnName"
                  :value="item.humanCode"
                ></el-option>
              </el-select>
            </el-row>
          </el-form-item>
          <el-form-item label="序号">
            <el-row :gutter="10">
              <el-input class="inputWidth" :disabled="isDisabled" v-model="formData.sort"></el-input>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "servereditor",
  components: {},
  data() {
    return {
      dwdata: [],
      mishudata: [],
      secHumanId: [],
      isDisabled: false,
      rules: {
        leaderHumanId: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        secHumanId: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ]
      },
      rowData: "",

      editFlag: "",
      chooseFlag: "",
      personOnly: true, //true 只能选人部门不可选  false都可以选
      dialogState: false, //显示隐藏
      isSingle: true,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      unitClass: 0,
      seletSelf: 1,
      postList: "",
      formData: {
        leaderCnName: "",
        leaderHumanId: "",
        secCnName: "",
        secHumanId: "",
        sort: ""
      },
      toDisabled: false,
      optionL: [],
      optionM: []
    };
  },
  methods: {
    clear(str) {
      return str.split(",");
    },
    closeWin() {
      this.$intent.closeWindow(this);
    },
    toEdit() {
      this.isDisabled = false;
      this.editFlag = "save";
    },
    loadData() {
      console.log("555556566", this.$route.query);
      this.$api.secreatary.activety
        .dwData({
          type: this.$route.query.type,
          unitId:
            this.$route.query.detail &&
            JSON.parse(this.$route.query.detail).unitId
        })
        .then(res => {
          console.log(res, "lingdao");
          this.dwdata = JSON.parse(res.data.dataCntnt);
        });
      this.$api.secreatary.activety
        .msData({
          type: this.$route.query.type,
          unitId:
            this.$route.query.detail &&
            JSON.parse(this.$route.query.detail).unitId
        })
        .then(res => {
          console.log(res, "秘书");
          this.mishudata = JSON.parse(res.data.dataCntnt);
        });
    },
    savedata() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let namearr = [];
          let namearrid = [];
          this.secHumanId = [];
          this.mishudata.map((item, index) => {
            this.formData.secHumanId.forEach(i => {
              if (i == item.humanCode) {
                namearr.push(item.leaderCnName);
              }
            });
          });
          this.dwdata.map((item, index) => {
            if (this.formData.leaderHumanId == item.humanCode) {
              this.formData.leaderCnName = item.leaderCnName;
            }
          });
          this.formData.secHumanId.forEach(i => {
            namearrid.push("#" + i + "#");
            this.secHumanId.push(i);
          });
          console.log(namearrid, "nameid");
          this.formData.secCnName = namearr.join(",");
          this.formData.secHumanId = namearrid.join("");
          if (this.rowData === "edit") {
            this.$api.secreatary.leaderActivity
              .upDataGao(this.formData)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.formData.secHumanId = this.secHumanId;
                this.isDisabled = true;
                this.editFlag = "edit";
              })
              .catch(res => {
                //   this.mishudata=[];
                this.formData.secHumanId = [];
              });
          } else {
            //保存
            this.$api.secreatary.leaderActivity
              .addDataGao(this.formData)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.formData.secHumanId = this.secHumanId;
                this.isDisabled = true;
                this.editFlag = "edit";
              })
              .catch(res => {
                //   this.mishudata=[];
                this.formData.secHumanId = [];
              });
          }
        }
      });
    }
  },
  created() {
    this.rowData = this.$route.query.flag;
    if (this.rowData === "edit") {
      this.isDisabled = true;
      this.editFlag = "edit";
      this.formData = JSON.parse(this.$route.query.detail);
      console.log(this.formData);
      this.formData.secHumanId = this.clear(this.formData.secHumanId);
      console.log(this.formData.secHumanId);
    }
    this.loadData();
  }
};
</script> 
<style scoped lang="less" rel="stylesheet/less">
.inputWidth {
  width: 217px;
}
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
}

.formdata {
  margin-top: 24px;
}

.base-title {
  width: 100%;
  text-align: center;
  font-size: 32px;
  color: #3c86f0;
}
</style>

