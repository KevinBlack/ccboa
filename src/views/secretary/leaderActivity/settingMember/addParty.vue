<!--
 * @Author: your name
 * @Date: 2021-01-18 11:44:11
 * @LastEditTime: 2021-02-04 10:04:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa0301\src\views\secretary\leaderActivity\settingMember\addParty.vue
--> 
<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closeWin()">关闭</el-button>
      <el-button type="primary" v-if="this.editFlag==='edit'" @click="toEdit">编辑</el-button>

      <el-button type="primary" v-else @click="savedata()">保存</el-button>
    </div>
    <p class="base-title">党委人员信息</p>
    <div class="formdata">
      <el-row>
        <el-form :rules="rules">
          <el-form-item 　prop="leaderHumanId" label="党委姓名">
            <el-row :gutter="10">
              <el-col :span="8">
                <!-- <el-input v-model="formData.leaderCnName " disabled></el-input> -->
                <el-select v-model="formData.leaderHumanId" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in dwdata"
                    :key="index"
                    :label="item.leaderCnName"
                    :value="item.humanCode"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="秘书姓名" prop="secHumanId">
            <el-row :gutter="10">
              <el-select v-model="formData.secHumanId" multiple placeholder="请选择">
                <el-option
                  v-for="(item,index) in mishudata"
                  :key="index"
                  :label="item.secCnName"
                  :value="item.humanCode"
                ></el-option>
              </el-select>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <!-- <tree-person
      v-model="dialogState"
      :isSingle="isSingle"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      :seletSelf="seletSelf"
      :postList="postList"
      :personOnly="personOnly"
      @orgList="showCompDialog"
    ></tree-person>-->
  </div>
</template>

<script>
// import treePerson from "components/tree/sysPer";

export default {
  name: "servereditor",
  components: {},
  data() {
    return {
      dwdata: [],
      mishudata: [],
      rowData: "",
      canInput: false,
      canInput1: false,
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
        secHumanId: ""
      },
      toDisabled: false,
      optionL: [],
      optionM: [],
      rules: {
        leaderHumanId: [
          { required: true, message: "请选择党委姓名", trigger: "blur" }
        ],
        secHumanId: [
          { required: true, message: "请选择秘书", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    closeWin() {
      //  this.$intent.closeWindow(this);
      this.$intent.closeWindow(this);
    },
    toEdit() {
      this.editFlag = "save";
      this.canInput = false;
    },
    // chooseDang() {
    //   this.isSingle = true;
    //   this.chooseFlag = "dang";
    //   this.postList = "337";

    //   this.dialogState = true;
    // },
    // chooseSec() {
    //   this.isSingle = false;
    //   this.chooseFlag = "sec";
    //   this.postList = "343";

    //   this.dialogState = true;
    // },
    // showCompDialog(data, status, type, params, dtype) {
    //   console.log(data);
    //   console.log(this.chooseFlag);
    //   if (this.chooseFlag === "dang") {
    //     this.$set(this.formData, "leaderCnName", data[0].perName);
    //     this.$set(this.formData, "leaderHumanId", data[0].deptHumanCode);
    //   } else if (this.chooseFlag === "sec") {
    //     let arr = [];
    //     let arr1 = [];
    //     data.map(item => {
    //       arr.push(item.perName);
    //       arr1.push("#" + item.deptHumanCode + "#");
    //     });

    //     this.$set(this.formData, "secCnName", arr.join(","));
    //     this.$set(this.formData, "secHumanId", arr1.join(""));
    //     console.log(this.formData);
    //   }
    // },
    // loadData() {},
    //获取行领导
    loadData() {
      this.$api.secreatary.activety.dwData({}).then(res => {
        console.log(res, "lingdao");
        this.dwdata = JSON.parse(res.data.dataCntnt);
      });
    },
    clear(str) {
      str = str.replace(/#/g, ""); //取消字符串中出现的所有逗号
      return str.split(',');
    },
    savedata() {
      if (this.formData.leaderHumanId === "" || this.formData.secHumanId === "") {
        this.$message({
          type: "warning",
          message: "请输入必填项"
        });
      } else {
        if (this.rowData === "edit") {
          // 更新
          this.$api.secreatary.leaderActivity
            .upDataDang(this.formData)
            .then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.go(-1);
            });
        } else {
          //保存
          // this.formData.leaderHumanId = this.formData.leaderHumanId.toString();
          let namearr = []
          let namearrid = []
          this.mishudata.map((item,index)=>{
            this.formData.secHumanId.forEach(i=>{
              if(i==item.humanCode){
                namearr.push(item.secCnName)
              }
            })
          })
          this.dwdata.map((item,index) =>{
            if(this.formData.leaderHumanId == item.humanCode){
              this.formData.leaderCnName = item.leaderCnName
            }
          })
          this.formData.secHumanId.forEach(i=>{
              namearrid.push('#'+ i +'#')
            })
            console.log(namearrid,'nameid')
          this.formData.secCnName = namearr.join(',')
          this.formData.secHumanId = namearrid.join(',');
          console.log(this.formData.secCnName)
          console.log(this.formData.secHumanId,'icon-disable')
          console.log(this.formData.leaderCnName,'1')
          console.log(this.formData.leaderHumanId,'2')
          this.$api.secreatary.leaderActivity
            .addDataDang(this.formData)
            .then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.go(-1);
            });
        }
      }
    }
  },
  created() {
    this.rowData = this.$route.query.flag;
    if (this.rowData === "edit") {
      this.editFlag = "edit";
      this.canInput = true;
      this.canInput1 = true;
      this.formData = JSON.parse(this.$route.query.detail);
      console.log(this.formData)
      this.formData.secHumanId = this.clear(this.formData.secHumanId)
      console.log(this.formData.secHumanId)
    }
    this.loadData();
    this.$api.secreatary.activety.msData({}).then(res => {
      console.log(res, "秘书");
      this.mishudata = JSON.parse(res.data.dataCntnt);
    });
  }
};
</script> 
<style scoped lang="less" rel="stylesheet/less">
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

