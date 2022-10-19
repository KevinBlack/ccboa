<!--
 * @Author: your name
 * @Date: 2020-09-12 14:46:10
 * @LastEditTime: 2021-04-20 16:44:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\gradprotect\createdgrad.vue
-->
<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="$router.back()">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <p class="base-title">分级维护授权设置</p>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        @event="eventClick"
        :data="applyformData"
        :columns="applyformCfg"
      ></fd-form>
    </div>
    <org-tree
      v-model="showOrgTree"
      title="选择机构"
      :isSingle="false"
      :orgOrDept="orgOrDept"
    
      @orgList="getOrgList"
      :orgOrDeptId="orgOrDeptId"
    ></org-tree>

    <!-- <select-person
      :canTab="false"
      :loadingTree="true"
      :hasRadio="hasRadio"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择人员"
      :subOrgFlag="false"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person> -->
     <!--    选择人员-->
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingle"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
    ></tree-person>
  </div>
</template>

<script>
import FdForm from "vue-elementui-freedomen/components/form";
import orgTree from "components/tree/orgTree";
// import selectPerson from "components/tree/tree-fawen";
import treePerson from "components/tree/sysTreePerson";
export default {
  name: "servereditor",
  components: {
    FdForm,
    orgTree,
    // selectPerson,
    treePerson
  },
  data() {
    return {
      showOrgPer: false,
      isSingle:true,
      unitClass: 2,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      orgOrDept:1,

      orgOrDeptId: '0',
      // orgOrDeptId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      showOrgTree: false,
      applyformData: {},
      selectOptions: {},
      applyformCfg: [],

      canInput: true,
      canInput2: false,

      checkBox: [], //多选
      doccheckbox:{0:'全部',1:'流转',2:'办结'},//多选
      isAdd: JSON.parse(this.$route.query.isAdd),
      treeData: [], //人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: false,
      modelStore:[],//存储授权模块信息
    };
  },
  methods: {
    getOrgList(org) {
      let ids = [];
      let names = [];
      org.map((item) => {
        ids.push(item.id);
        names.push(item.unitName);
      });
      this.$set(this.applyformData, "managerUnitName", names.join(","));
      this.$set(this.applyformData, "managerUnitId", ids.join(","));
    },
     //  选择人员
    getperList (perList) {
      let that = this
      let person = []
      let personId = []
      let tel=[]
      perList && perList.map(item => {
        person.push(item.unitName)
        personId.push(item.deptHumanId)
        tel.push(item.telMobile)
      })
      this.$set(this.applyformData, "humanName", person[0]);
      this.$set(this.applyformData, "humanId", personId[0] + "");
      this.$set(this.applyformData, "telMobile", tel[0]);
    },
    savedata() {
      this.applyformData.roleId = parseInt(this.applyformData.roleId);
      this.applyformData.humanId = parseInt(this.applyformData.humanId);

      if (this.isAdd == true) {
         if(this.applyformData.managerModuleId){
          var str = this.applyformData.managerModuleId.join(",");
          this.applyformData.managerModuleId = str;
         }
        console.log(this.applyformData);
        this.$api.setSysConfig
          .saveGradList(this.applyformData, "ASYSS5204")
          .then((res) => {
            this.$message({
              type: "success",
              message: "新增成功",
            });
            this.$router.back();
          });
      } else if (this.isAdd == false) {
        if(this.applyformData.roleId==402){
          this.applyformData.managerModuleId = this.applyformData.managerModuleId.join(",")
        }

        this.$api.setSysConfig
          .saveGradList(this.applyformData, "ASYSS5203")
          .then((res) => {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.$router.back();
          });
      }
    },
    eventClick(params) {
      switch (params.prop) {
        case "choiceOrg":
          this.showOrgTree = true;
          break;
        case "choicePer":
          // this.singelCheckF = true;
          // this.dialogState = true;
          this.isSingle=true
          this.unitClass = 2
          this.showOrgPer = true
          break;
        case "roleId":
          this.initConfig();
          break;
      }
    },
    showCompDialog(data, status, type, params, dtype) {
      console.log("--------->", data);
      this.dialogState = false;

      this.$set(this.applyformData, "humanName", data[0].name);
      this.$set(this.applyformData, "humanId", data[0].id + "");

      // if (this.canInput2 == true) {
      //   this.$set(this.applyformData, "managerUnitId", data[0].unitId + "");
      // }
    },
    loadData() {
      this.$api.setSysConfig
        .dictTable("ADICS2030", {
          isCodeName: "分级维护",
          isCodeType: "manager_type",
          searchData: { sortKey: "", sort: "" },
        })
        .then((res) => {
          res.data.forEach((item) => {
            this.selectOptions[item.dicId] = item.codeName;
          });
          this.managerTypeList = res.data;
          this.initConfig();
        });
    },
    //获取授权模块
    loadCheckbox() {
      this.$api.designDictionary
        .moduleSettingList1({ moduleConfig: {} })
        .then((res) => {
          let obj = {};
          this.modelStore=res.data;
          res.data.forEach((item) => {
            obj[item.id] = item.moduleName;
          });
          this.checkbox = obj;
          this.loadData();
          console.log(this.checkbox);
        });
    },
    initConfig() {
      if (this.applyformData.roleId == 402) {
         let obj = {};
        this.modelStore.forEach((item) => {
            obj[item.moduleKeyWord] = item.moduleName;
          });
        this.checkbox = obj;
        this.applyformCfg = [
          //  {
          //   type: "input",
          //   prop: "createHumanName",
          //   label: "创建人",
          //   // disabled: this.canInput,
          //   options: this.selectOptions,
          //   style: { width: "100%" },
          // },
          {
            type: "select",
            prop: "roleId",
            label: "管理员类型",
            disabled: this.canInput,
            options: this.selectOptions,
            style: { width: "100%" },
          },
          {
            type: "input",
            prop: "humanName",
            label: "管理员中文名",
            disabled: this.canInput,
            span: 22,
          },
          {
            type: "button-primary",
            value: "选择",
            span: 2,
            prop: "choicePer",
            disabled: this.canInput,
            style: { "margin-left": "-58px" },
          },
          {
            label: "授权模块",
            prop: "managerModuleId",
            type: "check-boxs",
            span: 24,
            options: this.checkbox,
          },
          {
            label: "公文状态",
            prop: "fileManager",
            type: "radios",
            span: 24,
            options: this.doccheckbox,
          },
        ];
      } else if (this.applyformData.roleId == 382) {
        this.applyformCfg = [
          {
            type: "select",
            prop: "roleId",
            label: "管理员类型",
            disabled: this.canInput,
            options: this.selectOptions,
            style: { width: "100%" },
          },
          {
            type: "input",
            prop: "humanName",
            label: "管理员中文名",
            disabled: this.canInput,
            span: 22,
          },
          {
            type: "button-primary",
            value: "选择",
            span: 2,
            prop: "choicePer",
            disabled: this.canInput,
            style: { "margin-left": "-58px" },
          },
          {
            type: "input",
            prop: "telMobile",
            label: "联系电话",
            disabled: this.canInput2,
      　　　 span:24
          },
        ];
      } else {
        this.applyformCfg = [
          {
            type: "select",
            prop: "roleId",
            label: "管理员类型",
            disabled: this.canInput,
            options: this.selectOptions,
            style: { width: "100%" },
          },
          {
            type: "input",
            prop: "humanName",
            label: "管理员中文名",
            disabled: this.canInput,
            span: 22,
          },
          {
            type: "button-primary",
            value: "选择",
            span: 2,
            prop: "choicePer",
            disabled: this.canInput,
            style: { "margin-left": "-58px" },
          },
          {
            type: "input",
            prop: "telMobile",
            label: "联系电话",
            disabled: this.canInput2,
      　　　 span:24
          },
          {
            type: "input",
            prop: "managerUnitName",
            label: "管理机构名",
            disabled: this.canInput2,
            span: 22,
          },
          {
            type: "button-primary",
            value: "选择",
            span: 2,
            prop: "choiceOrg",
            disabled: this.canInput2,
            style: { "margin-left": "-58px" },
          },
        ];
      }
    },
  },
  created() {
    this.loadCheckbox();
    if (this.isAdd) {
      this.canInput = false;
    } else {
      this.canInput = true;
      this.applyformData = JSON.parse(this.$route.query.detail);
    }
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;

  .formdata {
    margin-top: 24px;
  }

  .base-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    color: #3c86f0;
  }
}
</style>
