<!--
 * @Author: zj
 * @Date: 2020-07-01 10:55:04
 * @LastEditTime: 2021-08-17 17:17:51
 * @LastEditors: Please set LastEditors
 * @Description: 文件交换
 * @FilePath: \ccboa\src\views\setting\organization-department\department-manage\alteration\index.vue
-->
<template>
  <div class="departAlter">
    <div class="orgInfoTable">
      <el-button type="primary" @click="close">关闭</el-button>
      <el-button type="primary" @click="toSave">{{editBtnText}}</el-button>
      <div class="orgInfoTitle">文件交换人员配置</div>

      <div class="orgInfoTableBody">
        <fd-form
          style="margin:0 1%"
          ref="fdFrom"
          :data="indexformData"
          :columns="indexformCfg"
          @event="eventClick"
        ></fd-form>
      </div>
    </div>
    <org-tree
      v-model="showOrgTree"
      :title="orgTreeTitle"
      :orgOrDept="orgOrDept"
      :isSingle="false"
      @orgList="getOrgList"
    ></org-tree>
    <!--
      **选择管理人员弹框
    -->
    <tree-person
      v-model="showOrgPer"
      :isSingle="true"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
    <!-- 选择领导 -->
    <tree-person1
      v-model="showOrgPer1"
      :isSingle="false"
      :humanType="humanType1"
      :unitCode="unitCode1"
      :unitClass="unitClass1"
      @orgList="getperList1"
      :selectDept="selectDept1"
      :isNeedChild="isNeedChild1"
    ></tree-person1>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from "components/tree/orgTree";
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "components/table/tTable";
import treePerson1 from "components/tree/hldTree";
import treePerson from "components/tree/sysTreePerson";
export default {
  name: "depManageAltera",
  components: {
    orgTree,
    FdForm,
    treePerson,
    treePerson1,
    // selectPerson,
    // mTable
  },
  props: {},
  data() {
    return {
      // 选择管理人员
      showOrgPer: false,
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDept: [],
      // 选择领导
      showOrgPer1: false,
      isNeedChild1: "yes",
      unitClass1: 0,
      humanType1: 3,
      unitCode1: JSON.parse(localStorage.getItem("userInfo")).unitId,
      selectDept1: [],
      editBtnText: "保存",
      indexformCfg: [{}],
      //部门名称label
      exchangeNameText: "部门名称",
      indexformData: {
        exchangeType: 1,
        exchangeName: "",
        exchangeHumanName: "",
        exchangeRole: 1,
      },
      isFormDisabled: false,
      isOrgDis: true,

      isAdd: JSON.parse(this.$route.query.isAdd),
      rules: {},
      showOrgTree: false,
      orgOrDept: 0,
      orgTreeTitle: "选择部门",
      isSingle: true,
      /**
       * 树状选择弹框
       */
      dialogStateType: "",
      dialogTit: "选择管理人员", //标题
      treeData: [], //树弹框数据
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
    };
  },
  watch: {
    "indexformData.exchangeType"(val) {
      if (parseInt(val) === 1) {
        this.exchangeNameText = "部门名称";
        this.orgTreeTitle = "选择部门名称";
        this.orgOrDept = 0;
      }
      if (parseInt(val) === 2) {
        this.exchangeNameText = "领导名称";
        this.dialogTit = "选择领导人员";
      }
      if (parseInt(val) === 3) {
        this.exchangeNameText = "分行名称";
        this.orgTreeTitle = "选择分行名称";
        this.orgOrDept = 1;
      }
      this.init();
    },
  },
  computed: {},
  methods: {
    //关闭
    close() {
      this.$router.push({
        path: "/setting/orgDepartment/personManage/personList",
        query: {
          activeName: "tabs-file",
        },
      });
    },
    //编辑、保存
    toSave() {
      if (this.editBtnText === "编辑") {
        this.editBtnText = "保存";
        this.isFormDisabled = false;
        this.init();
      } else {
        this.indexformData.exchangeRole = parseInt(
          this.indexformData.exchangeRole
        );
        this.indexformData.exchangeType = parseInt(
          this.indexformData.exchangeType
        );
        this.$refs.fdFrom.submit().then((data) => {
          this.$api.setting.organization
            .updateFileExchange({ ...this.indexformData })
            .then((res) => {
              this.editBtnText = "编辑";
              this.isFormDisabled = true;
              this.isOrgDis = true;
              this.$message({
                type: "success",
                message: "保存成功！",
              });
              this.init();
            });
        });
      }
    },
    eventClick(params) {
      switch (params.prop) {
        case "exchangeType":
          console.log("params", params);
          if (params.type === "change") {
            this.$set(this.indexformData, "exchangeId", "");
            this.$set(this.indexformData, "exchangeName", "");
          }
          break;
        case "selDep":
          let exchangeType = parseInt(this.indexformData.exchangeType);
          console.log("exchangeType", exchangeType);
          if (exchangeType === 2) {
            this.showOrgPer1 = true;
          } else if (exchangeType === 1 || exchangeType === 3) {
            this.showOrgTree = true;
          } else {
            this.$message({
              type: "warning",
              message: "请先选择部门类型！",
            });
          }
          break;
        case "selPerson":
          // this.dialogState = true
          // this.dialogTit = '选择管理人员'
          // this.dialogStateType = '1'
          this.showOrgPer = true;
          break;

        default:
          break;
      }
    },
    getperList1(perList) {
      let humanIdArr = [];
      let humanNameArr = [];
      perList &&
        perList.map((item) => {
          humanIdArr.push(item.deptHumanId);
          humanNameArr.push(item.perName);
        });
      this.indexformData.exchangeId = humanIdArr.join("|");
      this.$set(this.indexformData, "exchangeName", humanNameArr.join("|"));
      console.log(
        "领导",
        this.indexformData.exchangeHumanId,
        this.indexformData.exchangeHumanName
      );
    },
    getperList(perList) {
      let humanIdArr = [];
      let humanNameArr = [];
      perList &&
        perList.map((item) => {
          humanIdArr.push(item.deptHumanId);
          humanNameArr.push(item.perName);
        });
      this.indexformData.exchangeHumanId = humanIdArr.join("|");
      this.$set(
        this.indexformData,
        "exchangeHumanName",
        humanNameArr.join("|")
      );
      console.log(
        "管理人员",
        this.indexformData.exchangeHumanId,
        this.indexformData.exchangeHumanName
      );
    },
    //选择管理人员确定
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, params, dtype);
      let humanIdArr = [];
      let humanNameArr = [];
      data.map((item) => {
        humanIdArr.push(item.idStr);
        humanNameArr.push(item.name);
      });
      if (this.dialogStateType === "1") {
        this.indexformData.exchangeHumanId = humanIdArr.join("|");
        this.$set(
          this.indexformData,
          "exchangeHumanName",
          humanNameArr.join("|")
        );
      }
      if (this.dialogStateType === "0") {
        this.indexformData.exchangeId = humanIdArr.join("|");
        this.$set(this.indexformData, "exchangeName", humanNameArr.join("|"));
      }
      console.log("this.indexformData", this.indexformData);
      this.dialogState = false;
    },
    init() {
      this.indexformCfg = [
        {
          label: "部门类型",
          type: "radios",
          prop: "exchangeType",
          rule: "must",
          options: { 1: "部门", 2: "领导", 3: "分行" },
          disabled: this.isOrgDis,
        },
        {
          type: "input",
          prop: "exchangeName",
          label: this.exchangeNameText,
          span: 18,
          rule: "must",
          disabled: true,
        },
        {
          type: "button-primary",
          value: "选择",
          prop: "selDep",
          span: 2,
          style: { "margin-left": "-50px" },
          disabled: this.isFormDisabled,
        },
        {
          type: "input",
          prop: "exchangeHumanName",
          label: "管理人员",
          rule: "must",
          span: 18,
          disabled: true,
        },
        {
          type: "button-primary",
          value: "选择",
          prop: "selPerson",
          span: 2,
          style: { "margin-left": "-50px" },
          disabled: this.isFormDisabled,
        },
        {
          label: "请选择角色",
          type: "radios",
          prop: "exchangeRole",
          rule: "must",
          options: { 1: "A", 2: "B" },
          disabled: this.isFormDisabled,
        },
      ];
    },
    saveOrgIndexInfo() {
      this.$router.push({
        name: "departDetail",
      });
    },
    getOrgList(org) {
      console.log("org", org);
      let exchangeIdArr = [];
      let exchangeNameArr = [];
      org.map((item) => {
        exchangeIdArr.push(item.id);
        exchangeNameArr.push(item.unitName);
      });
      this.indexformData.exchangeId = exchangeIdArr.join("|");
      this.$set(this.indexformData, "exchangeName", exchangeNameArr.join("|"));
      console.log("this.indexformData", this.indexformData);
    },
  },
  activated() {},
  mounted() {},
  created() {
    if (!this.isAdd) {
      this.isFormDisabled = true;
      this.editBtnText = "编辑";
      this.isOrgDis = true;
      this.$api.setting.organization
        .detailFileExchange({ id: this.$route.query.id })
        .then((res) => {
          this.indexformData = res.data;
        });
    } else {
      this.isFormDisabled = false;
      this.editBtnText = "保存";
      this.isOrgDis = false;
    }
    this.init();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.departAlter {
  .top {
    margin-bottom: 20px;
  }

  .el-input {
    width: 50%;
    margin-right: 10px;
  }

  min-height: 600px;

  .orgInfoTable {
    padding: 0px 70px;

    .orgInfoTitle {
      margin-bottom: 40px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }

    .orgInfoTableBody {
      margin-left: 8%;
    }

    .text1 {
      color: red;
      font-size: 14px;
      margin-left: 97px;
    }

    // .btn1 {
    //   margin-top: 20px;
    //   margin-left: 248px;
    // }
  }
}
</style>
