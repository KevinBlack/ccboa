<template>
  <div class="content">
    <p class="use_object_title">常用发送对象登记</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="toEdit" v-if="!isAdd">编辑</el-button>
      <el-button type="primary" @click="savedata" v-if="isAdd">保存</el-button>
      <el-button type="primary" @click="saveNews" v-if="isAdd">保存并新建</el-button>
    </div>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        ref="fdForm"
        :config="serverconfig"
        @event="btnevent"
      ></fd-form>
    </div>
    <!--    选择人员-->
    <tree-person
      v-model="dialogState"
      :isSingle="isSingle"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      :seletSelf="seletSelf"
      :selectDept="selectDept"
      @orgList="showCompDialog"
      @clearList="clearList"
    ></tree-person>
  </div>
</template>
<script>
// import selectPerson from "components/tree/treeTansun";

import FdForm from "vue-elementui-freedomen/components/form";
// import treeCofigForCy from "@/components/tree/tree-cy";
import treePerson from "components/tree/sysPer";
export default {
  name: "createGroup",
  components: {
    FdForm,
    // treeCofigForCy,
    treePerson
    // selectPerson,
  },
  data() {
    return {
      seletSelf: 1,
      selectDept: [],
      temDept: [],
      humanType: 3,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      unitClass: 0,

      dialogState: false, //显示隐藏

      isSingle: false,

      offenUse: false,
      checkIds: [], //选中id列表
      isAdd: JSON.parse(this.$route.query.isAdd),
      canInput: true,

      formData: { groupClass: "本行群组", id: "" },
      formCfg: [],
      serverconfig: {
        labelWidth: "140px"
      }
    };
  },
  methods: {
    //清空方法
    clearList(data, status, type, params, dtype) {
      console.log(data, status, type, params, dtype);
      this.selectDept = [];
    },
    showCompDialog(data, status, type, params, dtype) {
      console.log("d", data, status);
      this.dialogState = false;
      // if (status) {
      // 反显问题 深拷贝 临时保存 打开时赋值

      let arr = [];
      data.map(item => {
        let obj = {};
        obj.depHumanId = item.depHumanId;
        obj.deptHumanAccount = item.deptHumanAccount;
        obj.deptHumanCode = item.deptHumanCode;
        obj.deptHumanName = item.deptHumanName;
        obj.disable = item.disable;
        obj.id = item.id;
        obj.leaf = item.leaf;
        obj.perName = item.perName;
        obj.unitClass = item.unitClass;
        obj.unitName = item.unitName;
        arr.push(obj);
      });
      this.temDept = arr;
      let ids = [];
      let names = [];
      data.map(item => {
        ids.push(item.depHumanId);
        names.push(item.perName);
      });
      let ID = ids.join(",");

      this.$set(this.formData, "groupMembersCns", names.join(","));
      this.$set(this.formData, "groupMembersCnsId", ids.join(","));
      // this.$set(this.formData, 'groupMembersIds', ID.substring(0, ID.indexOf('#')))
      this.$set(this.formData, "groupMembersIds", ids.join(","));

      this.getDepart();
      // }
    },
    init() {
      this.formCfg = [
        {
          type: "select",
          prop: "groupClass",
          label: "设置类型",
          options: "本行群组",
          placeholder: "本行群组",
          disabled: true,
          style: { width: "96%" }
        },
        {
          type: "input",
          prop: "groupName",
          label: "群组名",
          rule: "must",
          disabled: this.canInput,
          span: 22,
          style: { width: "100%" }
        },
        [
          {
            type: "input",
            prop: "groupMembersCns",
            rule: "must",
            style: { width: "82%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$selected",
            value: "选择",
            disabled: this.canInput,
            style: { "margin-left": "20px" }
          },
          { type: "formitem", label: "群组成员" }
        ],
        {
          type: "input",
          prop: "groupDeptNames",
          label: "所属部门",
          disabled: true,
          span: 22,
          style: { width: "100%" }
        },
        {
          type: "input",
          prop: "groupMembersIds",
          label: "成员ID",
          disabled: true,
          span: 22,
          style: { width: "100%" }
        },
        {
          type: "input",
          prop: "sort",
          label: "序号",

          disabled: this.canInput,
          span: 22,
          style: { width: "100%" }
        }
      ];
    },
    toEdit() {
      this.isAdd = !this.isAdd;
      this.canInput = false;
      this.init();
    },

    closedata() {
      console.log("关闭");
      // this.$router.push("/setting/sysConfig/server");
      // this.$router.go(-1);
      // this.$router.push({
      //   path: "/dashboard/personalOffice/sysConfig/vierPerList",
      //   query: {
      //     activeName: "tabs-sleep"
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
        this.$router.go(-1);
      }
    },
    saveNews() {
      if (
        this.formData.groupName === "" ||
        this.formData.groupMembersCns === ""
      ) {
        this.$message({
          message: "请输入必填项",
          type: "warning"
        });
      } else {
        this.formData.type = "";
        console.log(this.formData);
        this.$api.dailyWork.saveNew(this.formData).then(res => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.formData = {};
          this.$set(this.formData, "groupDeptFrameIds", "");
          this.$set(this.formData, "groupDeptNames", "");
          this.$set(this.formData, "groupMembersCns", "");
          this.$set(this.formData, "groupMembersCnsId", "");
          this.$set(this.formData, "groupMembersIds", "");
          this.$set(this.formData, "groupName", "");
          this.$set(this.formData, "sort", "");
          this.$set(this.formData, "groupClass", "本行群组");
          this.temDept = [];
        });
      }
    },

    savedata() {
      // groupName, groupMembersCns, sort;
      if (
        this.formData.groupName === "" ||
        this.formData.groupMembersCns === ""
      ) {
        this.$message({
          message: "请输入必填项",
          type: "warning"
        });
      } else {
        //  this.$refs.fdForm.submit().then((data)=>{
        //    console.log('111')
        //  })

        if (Number(this.formData.sort) || Number(this.formData.sort) === 0) {
          this.formData.type = "";

          this.$api.dailyWork.saveNew(this.formData).then(res => {
            this.formData.id = res.data.id;
            this.$router.go(-1);
            this.$message({
              message: "保存成功",
              type: "success"
            });
          });
        } else {
          this.$message({
            message: "序号只能是数字",
            type: "warning"
          });
        }
      }
    },
    getDepart() {
      this.$api.dailyWork
        .getdep({ id: this.formData.groupMembersIds })
        .then(res => {
          let ids = [];
          let names = [];

          let unitLevel = [];
          res.data.map(item => {
            names.push(item.unitName);

            unitLevel.push(item.unitLevel);
            //切割删除
            //  let a=item.unitLevel.split('|')

            // unitLevel.push(a[a.length-1]);
          });
          this.$set(this.formData, "groupDeptNames", names.join(","));
          this.$set(this.formData, "groupDeptNamesId", ids.join(","));
          this.$set(this.formData, "groupDeptFrameIds", unitLevel.join(","));
        });
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selected":
          this.selectDept = this.temDept;
          this.dialogState = true;

          break;
        default:
          break;
      }
    },
    loadData() {
      if (!this.isAdd) {
        this.formData = JSON.parse(this.$route.query.detail);
        console.log("form", this.formData);
        let arrt = [];
        let arr = this.formData.groupMembersCns.split(",");
        let arr1 = this.formData.groupMembersIds.split(",");
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.perName = arr[i];
          obj.depHumanId = arr1[i];
          obj.id = i;
          arrt.push(obj);
        }
        this.temDept = arrt;
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
