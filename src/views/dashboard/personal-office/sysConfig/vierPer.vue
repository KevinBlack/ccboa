<!--
 * @Author: your name
 * @Date: 2020-08-13 14:59:51
 * @LastEditTime: 2021-01-29 16:11:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\dashboard\personal-office\sysConfig\vierPer.vue
-->
<template>
  <div class="content">
    <p class="use_object_title">常用发送对象登记</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="toEdit" v-if="!isAdd">编辑</el-button>
      <el-button type="primary" @click="savedata" v-if="isAdd">保存</el-button>
      <el-button type="primary" @click="saveNew" v-if="isAdd">保存并新建</el-button>
    </div>
    <div class="formdata">
      <fd-form
        @event="eventClick"
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
      ></fd-form>
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
    <!-- :selectDept="selectDept" -->
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
// import selectPerson from "components/tree/tree-fawen";
import treePerson from "components/tree/sysPer";

export default {
  name: "vierPer",
  components: {
    FdForm,
    treePerson
    // selectPerson,
  },
  data() {
    return {
      isSingle: true,
      humanType: 3,
      isAdd: JSON.parse(this.$route.query.isAdd),
      seletSelf: 1,
      offenUse: false,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      unitClass: 0,
      seletOptionsData: [],

      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false

      hasRadio: false, //是否單選
      dialogState: false, //显示隐藏
      treeData: [], //人员树
      canInput: true,
      formData: {},
      formCfg: [],
      // selectDept: [],
      serverconfig: {
        labelWidth: "140px"
      }
    };
  },
  methods: {
    init() {
      this.formCfg = [
        {
          type: "input",
          prop: "contacterName",
          label: "中文名",
          disabled: true,
          span: 20,
          style: { width: "100%" }
        },
        {
          type: "button-primary",
          prop: "choicePerson",
          span: 2,
          value: "选择",
          disabled: this.canInput,
          style: { "margin-left": "-50px" }
        },
        {
          type: "input",
          prop: "deptName",
          disabled: this.canInput,
          label: "所属部门",
          span: 24,
          style: { width: "100%" }
        },

        {
          type: "input",
          prop: "sort",
          label: "序号",
          disabled: this.canInput,
          span: 24,
          style: { width: "100%" }
        }
      ];
    },
    toEdit() {
      this.isAdd = !this.isAdd;
      this.canInput = false;
      this.init();
    },
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      // this.selectDept = data;

      this.$set(this.formData, "contacterName", data[0].perName);

      this.$set(this.formData, "contacterId", data[0].depHumanId + "");

      this.getDep();
    },
    getDep() {
      this.$api.dailyWork
        .getDepart({ humanId: this.formData.contacterId })
        .then(res => {
          this.$set(this.formData, "deptName", res.data[0].unitName);
          this.$set(this.formData, "deptId", res.data[0].unitCode);
          this.formData.deptId = res.data[0].unitCode;
        });
    },
    eventClick(params) {
      switch (params.prop) {
        case "choicePerson":
          this.singelCheckF = true;
          this.dialogState = true;
          break;
      }
    },
    closedata() {
      // this.$router.go(-1);
      // this.$router.push({
      //   path: "/dashboard/personalOffice/sysConfig/vierPerList",
      //   query: {
      //     activeName: "tabs-look"
      //   }
      // });
      if (this.isAdd) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.savedata();
              // this.$intent.closeWindow(this);
              
            } else if (action === "cancel") {
              //点否
              // this.$intent.closeWindow(this);
              this.$router.go(-1);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        // this.$intent.closeWindow(this);
        this.$router.go(-1);
      }
    },
    savedata() {
      if (this.formData.contacterName == "") {
        this.$message({ type: "warning", message: "中文名不能为空" });
      } else {
        this.$api.dailyWork.saveNewPer(this.formData).then(res => {
          this.$router.go(-1);
          this.$message({ type: "success", message: "保存成功" });
        });
      }
    },
    saveNew() {
      this.savedata();
      this.formData = {};
      this.$set(this.formData, "deptName", "");
      this.$set(this.formData, "deptId", "");
      this.$set(this.formData, "contacterName", "");
      this.$set(this.formData, "contacterId", "");

      this.$set(this.formData, "sort", "");
    },
    loadData() {
      if (!this.isAdd) {
        this.formData = JSON.parse(this.$route.query.detail);
        console.log(this.formData);

        // let obj = {};
        // let arr = [];
        // obj.perName = this.formData.contacterName;
        // obj.depHumanId = this.formData.contacterId;
        // obj.id = this.formData.id;
        // arr.push(obj);
        // this.selectDept = arr;
      }
    }
  },
  created() {
    if (this.isAdd == true) {
      this.canInput = false;
    } else {
      this.loadData();
    }
    this.init();
  }
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
}

.use_object_title {
  width: 100%;
  text-align: center;
  color: #3b85f0;
  font-size: 28px;
}
</style>
