<!--
 * @Author: your name
 * @Date: 2021-01-08 17:26:22
 * @LastEditTime: 2021-02-01 15:39:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa30\src\views\secretary\leaderActivity\settingMember\secretaryMembers.vue
--> 
<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closeWin()">关闭</el-button>

      <el-button type="primary" v-if="this.editFlag==='edit'" @click="toEdit">编辑</el-button>
      <el-button type="primary" v-else @click="toSave">保存</el-button>
    </div>
    <p class="base-title">编辑权限配置</p>
    <div class="formdata">
      <el-form :rules="rules">
        <el-form-item label="编辑权限人员中文名" prop="secCnName">
          <el-input v-model="formData.secCnName" disabled></el-input>
          <el-button
            type="primary"
            @click="toSelect"
            style="margin-left:10px"
            :disabled="this.canInput"
          >选择</el-button>
        </el-form-item>
      </el-form>
    </div>

    <tree-person
      v-model="dialogState"
      :isSingle="isSingle"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      :seletSelf="seletSelf"
      @orgList="showCompDialog"
    ></tree-person>
  </div>
</template>

<script>
// import baseSearchForm from "components/form/baseSearchForm"
import treePerson from "components/tree/sysTreePerson";

export default {
  name: "servereditor",
  components: {
    // baseSearchForm
    treePerson
  },
  data() {
    return {
      rules: {
        secCnName: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ]
      },
      btnType: "",
      editFlag: "",
      dialogState: false, //显示隐藏
      isSingle: false,
      canInput: false,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      unitName: JSON.parse(localStorage.getItem("userInfo")).unitName,
      unitClass: 0,
      humanType: 1,
      seletSelf: 1,
      formData: {
        secCnName: ""
      },
      toDisabled: false,
      optionL: [],
      optionM: [],
      arrsecCnName: [],
      arrsecCnNameId: []
    };
  },
  methods: {
    closeWin() {
      this.$intent.closeWindow(this);
    },
    toEdit() {
      this.editFlag = "save";
      this.canInput = false;
    },
    toSelect() {
      this.dialogState = true;
      if (this.btnType === "edit") {
        this.$api.secreatary.leaderActivity.deleteAllEdit({}).then(res => {});
      }
    },
    showCompDialog(data, status, type, params, dtype) {
      console.log("d", data, status);
      this.arrsecCnName = [];
      this.arrsecCnNameId = [];
      data.map(item => {
        this.arrsecCnName.push(item.perName);
        this.arrsecCnNameId.push(item.deptHumanCode + "_" + item.perName);
      });
      // this.formData.secCnName = this.arrsecCnName.join(",");
      this.$set(this.formData, "secCnName", this.arrsecCnName.join(","));
      //关闭选人
      this.dialogState = false;
    },
    toSave() {
      if (this.formData.secCnName === "") {
        this.$message({
          type: "warning",
          message: "请输入必填项"
        });
      } else {
        //新增
        this.$api.secreatary.leaderActivity
          .saveEdit({
            editorCnName: this.arrsecCnNameId.join(",")
          })
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          });
      }
    },
    getName() {
      //根据机构获取人员name
      this.$api.secreatary.leaderActivity
        .getDataIdEdit({
          unitName: this.unitName,
          unitId: this.unitCode
        })
        .then(res => {
          // let arr = [];
          // res.data.map((item) => {
          //   arr.push(item.secCnName);
          // });
          this.$set(this.formData, "secCnName", res.names);
        });
    }
  },
  created() {
    this.btnType = this.$route.query.flag;
    console.log(this.btnType);
    if (this.btnType === "edit") {
      this.getName();
      this.editFlag = "edit";
      this.canInput = true;
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-input {
  width: 20%;
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

