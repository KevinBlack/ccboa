<!--
 * @Author: your name
 * @Date: 2020-08-13 14:59:51
 * @LastEditTime: 2021-01-27 15:35:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\dashboard\personal-office\sysConfig\headquarter.vue
--> 
<template>
  <div class="content">
    <p class="use_object_title">常用发送对象登记</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="toEdit" v-if="!isAdd">编辑</el-button>
      <el-button type="primary" @click="savedata" v-if="isAdd">保存</el-button>
      <el-button type="primary" @click="saveANew" v-if="isAdd">保存并新建</el-button>
    </div>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
        @event="btnevent"
      ></fd-form>
    </div>
    <!-- <org-tree
      v-model="showOrgTree"
      title="请选择机构"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      @orgList="getOrgList"
       
    ></org-tree>-->
    <org-tree
      v-model="showOrgTree"
      title="请选择机构"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      @orgList="getOrgList"
      @clearList="clearList"
      :selectDept="selectDept"
    ></org-tree>
  </div>
</template>
<script>
import orgTree from "components/tree/orgTreesys";

import FdForm from "vue-elementui-freedomen/components/form";
export default {
  components: {
    FdForm,
    orgTree
  },
  data() {
    return {
      temData: {},
      selectDept: [],
      oldselectDept: [],
      showOrgTree: false,
      isAdd: JSON.parse(this.$route.query.isAdd),
      canInput: true,
      isSingle: false,
      orgOrDept: 0,
      unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      formData: {
        groupClass: "部门",
        groupLevel: "其他群组",
        groupMembersCns: "",
        groupMembersCnsId: "",
        groupMembersIds: ""
      },
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
      //群组成员
      this.$set(this.formData, "groupMembersCns", "");
      this.$set(this.formData, "groupMembersCnsId", "");
      this.$set(this.formData, "groupMembersIds", "");
      console.log(this.formData);
      //  debugger
    },
    init() {
      this.formCfg = [
        {
          type: "input",
          label: "群组序列号",
          prop: "sort",
          disabled: this.canInput,
          style: { width: "100%" }
        },
        {
          type: "input",
          label: "使用此设置的机构名",
          prop: "unitName",

          style: { width: "100%" },

          disabled: true
        },
        {
          type: "input",
          disabled: this.canInput,
          label: "群组名称",
          prop: "groupName",
          rule: "must",
          style: { width: "100%" }
        },
        {
          type: "input",
          label: "群组类别",
          prop: "groupClass",
          style: { width: "100%" },

          disabled: true
        },
        {
          type: "input",
          label: "群组级别",
          prop: "groupLevel",
          style: { width: "100%" },

          disabled: true
        },
        [
          {
            type: "input",
            prop: "groupMembersCns",
            disabled: true,
            style: { width: "91%" },
            rule: "must"
          },
          {
            type: "button-primary",
            prop: "$selected",
            value: "选择",
            disabled: this.canInput,
            style: { "margin-left": "10px" }
          },
          { type: "formitem", label: "群组成员" }
        ],
        {
          type: "input-area",
          label: "备注",
          prop: "remark",
          disabled: this.canInput,
          style: { width: "100%" },
          config: { rows: 4 }
        }
      ];
    },
    toEdit() {
      this.isAdd = !this.isAdd;
      this.canInput = false;
      this.init();
    },
    getOrgList(org) {
      // this.selectDept = org;
      if (org.length !== 0) {
        console.log("org", org);
        let names = [];
        let ids = [];
        org.forEach(item => {
          names.push(item.unitName);
          ids.push(item.id);
        });

        this.temData.groupMembersCns = names.join(",");
        this.temData.groupMembersCnsId = ids.join(",");
        this.temData.groupMembersIds = ids.join(",");

        this.getCanUse(org);
      }
    },
    getCanUse(org) {
      this.$api.dailyWork
        .getVerify({ id: this.temData.groupMembersCnsId })
        .then(res => {
          // console.log(res.isHaveDeptZH);
          if (res.isHaveDeptZH == false) {
            let a = res.unitName;
            this.$message({
              type: "warning",
              message: "此部门没有设置部门综合，请重新选择：" + a
            });
            let arr = [];
            console.log(this.oldselectDept);
            this.oldselectDept.map(item => {
              let obj = {};
              obj.id = item.id;
              obj.leaf = item.leaf;
              obj.unitName = item.unitName;

              arr.push(obj);
            });
            this.selectDept = arr;

            console.log("select", this.selectDept);
          } else {
            this.$api.dailyWork
              .getDpet({
                groupType: "部门",
                groupMembersId: this.temData.groupMembersIds,
                groupMembersName: this.temData.groupMembersCns
              })
              .then(res => {
                //群组成员
                this.$set(
                  this.formData,
                  "groupMembersCns",
                  res.data.groupMembersName
                );
                this.$set(
                  this.formData,
                  "groupMembersCnsId",
                  res.data.groupMembersId
                );
                this.$set(
                  this.formData,
                  "groupMembersIds",
                  res.data.groupMembersId
                );
                // this.selectDept = org;
                let arr = [];
                org.map(item => {
                  let obj = {};
                  obj.id = item.id;
                  obj.leaf = item.leaf;
                  obj.unitName = item.unitName;

                  arr.push(obj);
                });
                this.selectDept = arr;
                this.oldselectDept = arr;
              });
          }
        });
    },
    closedata() {
      // this.$router.go(-1);
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
    },
    saveANew() {
      if (
        this.formData.groupMembersCns === "" ||
        this.formData.groupName === ""
      ) {
        this.$message({
          message: "请输入必填项",
          type: "warning"
        });
      } else {
        this.formData.type = "";

        this.$api.dailyWork.saveNew(this.formData).then(res => {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.formData = {};
          //     groupMembersCns: "",
          // groupMembersCnsId: "",
          // groupMembersIds: "",
          this.$set(this.formData, "groupLevel", "");
          this.$set(this.formData, "groupMembersCns", "");
          this.$set(this.formData, "groupMembersCnsId", "");
          this.$set(this.formData, "groupMembersIds", "");
          this.$set(this.formData, "groupName", "");
          this.$set(this.formData, "sort", "");
          this.$set(this.formData, "remark", "");
          this.$set(this.formData, "groupClass", "部门");
          this.selectDept = [];
        });
      }
    },
    savedata() {
      console.log(this.formData);
      // debugger
      // groupMembersCns,groupName
      if (
        this.formData.groupMembersCns === "" ||
        this.formData.groupName === ""
      ) {
        this.$message({
          message: "请输入必填项",
          type: "warning"
        });
      } else {
        if (Number(this.formData.sort) || Number(this.formData.sort) === 0) {
          this.formData.type = "";

          this.$api.dailyWork.saveNew(this.formData).then(res => {
            this.$router.push({
              path: "/dashboard/personalOffice/sysConfig/vierPerList",
              query: {
                activeName: "tabs-sleep"
              }
            });
            this.$message({
              message: "保存成功",
              type: "success"
            });
          });
        } else {
          this.$message({
            message: "群组序列号只能是数字",
            type: "warning"
          });
        }
      }
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selected":
          this.showOrgTree = true;
          break;

        // default:
        //   break;
      }
    },

    loadData() {
      this.$api.dailyWork.saveNew({ type: "unitNamer" }).then(res => {
        console.log(res);
        // this.formData.unitName=res.data.unitName
        this.$set(this.formData, "unitName", res.data.unitName);
        this.$set(this.formData, "unitCode", res.data.unitName);
      });
      if (!this.isAdd) {
        this.formData = JSON.parse(this.$route.query.detail);
        console.log("formData", this.formData);

        //群组成员返现返显

        this.formData.members.map(item => {
          let obj = {};
          let arr = item.groupMembersId.split("/");
          obj.id = arr[0];
          obj.leaf = true;
          obj.unitName = item.groupMembersCn;
          this.selectDept.push(obj);
        });
        // this.selectDept = arr1;

        // let obj = {};
        // obj.groupMembersCns = this.formData.groupMembersCns;
        // obj.groupMembersIds = this.formData.groupMembersIds;

        // this.selectDept.push(obj);
      }
      // this.$api.dailyWork.getInfor({ unitCode: this.unitId }).then((res) => {
      //   this.$set(this.formData, "unitName", res.data.oaUnitShort);
      //   this.$set(this.formData, "unitCode", res.data.unitCode);

      // });
    }
  },
  created() {
    if (this.isAdd == true) {
      this.canInput = false;
    }
    this.init();
  },
  mounted() {
    this.loadData();
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