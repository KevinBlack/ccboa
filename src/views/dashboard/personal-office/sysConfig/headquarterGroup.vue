<!--
 * @Author: your name
 * @Date: 2020-08-13 14:59:51
 * @LastEditTime: 2021-01-23 11:02:10
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
      <!-- <el-button type="primary" @click="saveANew" v-if="isAdd">保存并新建</el-button> -->
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
      :selectDept="selectDept"
    ></org-tree>

    <div class="tableList" v-if="tableValue">
      <div class="top">
        <el-button type="primary" @click="groupRow">确定</el-button>
        <el-button type="primary" @click="cancelRow">取消</el-button>
      </div>
      <m-table
        :sortable="false"
        :isSingle="false"
        @refresh="loadGroup()"
        size="medium"
        :isSelection="true"
        @select="selectRow"
        :searchData="searchData"
        :tableData="tableData"
        :tableCols="tableCols"
        :isPagination="false"
      ></m-table>
    </div>
    <div class="modal" v-if="modal"></div>
  </div>
</template>
<script>
import orgTree from "components/tree/orgTree";
import mTable from "components/table/tTable";

import FdForm from "vue-elementui-freedomen/components/form";
export default {
  components: {
    FdForm,
    orgTree,
    mTable,
  },
  data() {
    return {
      tableData: [],
      tableCols: [
        { label: "群组编号", prop: "groupNo" },
        { label: "群组级别", prop: "groupLevel" },
        { label: "群组名", prop: "groupName" },
        { label: "群组成员", prop: "groupMembersName" },
      ],
      tableArray: [],
      modal: false,
      tableValue: false,
      searchData: {},
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
        groupMembersIds: "",
      },
      formCfg: [],
      serverconfig: {
        labelWidth: "140px",
      },
    };
  },
  methods: {
    //   确定
    groupRow() {
      console.log(this.tableArray);
      let groupUnitNames = [];
      let groupMembersCnsGroup = [];
      let groupLevelGroup = [];
      this.tableArray.forEach((item) => {
        groupUnitNames.push(item.groupName);
        groupMembersCnsGroup.push(item.groupMembersName);
        groupLevelGroup.push(item.groupLevel);
        this.$set(this.formData, "groupName", groupUnitNames.join(","));
        this.$set(
          this.formData,
          "groupMembersCns",
          groupMembersCnsGroup.join(",")
        );
        this.$set(this.formData, "groupLevel", groupLevelGroup.join(","));
      });

      this.tableValue = false;

      this.modal = false;
    },
    // 取消
    cancelRow() {
      this.tableValue = false;
      this.modal = false;
      // this.$set(this.formData, "groupUnitName", "");
    },
    selectRow(row) {
      this.tableArray = row;
    },
    init() {
      this.formCfg = [
        {
          type: "input",
          label: "群组序列号",
          prop: "sort",
          disabled: true,
          style: { width: "100%" },
        },
        {
          type: "input",
          label: "使用此设置的机构名",
          prop: "unitName",

          style: { width: "100%" },

          disabled: true,
        },
        [
          {
            type: "input",
            prop: "groupName",
            disabled: true,
            style: { width: "91%" },
            rule: "must",
          },
          {
            type: "button-primary",
            prop: "$selected",
            value: "选择",
            disabled: this.canInput,
            style: { "margin-left": "10px" },
          },
          { type: "formitem", label: "群组名称" },
        ],
        // {
        //   type: "input",
        //   disabled: this.canInput,
        //   label: "群组名称",
        //   prop: "groupName",
        //   rule: "must",
        //   style: { width: "100%" },
        // },
        {
          type: "input",
          label: "群组类别",
          prop: "groupClass",
          style: { width: "100%" },

          disabled: true,
        },
        {
          type: "input",
          label: "群组级别",
          prop: "groupLevel",
          style: { width: "100%" },

          disabled: true,
        },
        [
          {
            type: "input",
            prop: "groupMembersCns",
            disabled: true,
            style: { width: "91%" },
            rule: "must",
          },
          //   {
          //     type: "button-primary",
          //     prop: "$selected",
          //     value: "选择",
          //     disabled: this.canInput,
          //     style: { "margin-left": "10px" },
          //   },
          { type: "formitem", label: "群组成员" },
        ],
        {
          type: "input-area",
          label: "备注",
          prop: "remark",
          disabled: this.canInput,
          style: { width: "100%" },
          config: { rows: 4 },
        },
      ];
    },
    toEdit() {
      this.isAdd = !this.isAdd;
      this.canInput = false;
      this.init();
    },
    getOrgList(org) {
      // this.selectDept = org;

      console.log("org", org);
      let names = [];
      let ids = [];
      org.forEach((item) => {
        names.push(item.unitName);
        ids.push(item.id);
      });

      this.temData.groupMembersCns = names.join(",");
      this.temData.groupMembersCnsId = ids.join(",");
      this.temData.groupMembersIds = ids.join(",");

      this.getCanUse(org);
    },
    getCanUse(org) {
      this.$api.dailyWork
        .getVerify({ id: this.temData.groupMembersCnsId })
        .then((res) => {
          // console.log(res.isHaveDeptZH);
          if (res.isHaveDeptZH == false) {
            let a = res.unitName;
            this.$message({
              type: "warning",
              message: "此部门没有设置部门综合，请重新选择：" + a,
            });
            let arr = [];
            console.log(this.oldselectDept);
            this.oldselectDept.map((item) => {
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
                groupMembersName: this.temData.groupMembersCns,
              })
              .then((res) => {
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
                org.map((item) => {
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
      this.$router.push({
        path: "/dashboard/personalOffice/sysConfig/vierPerList",
        query: {
          activeName: "tabs-sleep",
        },
      });
    },
    saveANew() {
      if (
        this.formData.groupMembersCns === "" ||
        this.formData.groupName === ""
      ) {
        this.$message({
          message: "请输入必填项",
          type: "warning",
        });
      } else {
        this.formData.type = "";

        this.$api.dailyWork.saveNew(this.formData).then((res) => {
          this.$message({
            message: "保存成功",
            type: "success",
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
      // groupMembersCns,groupName
      if (
        this.formData.groupMembersCns === "" ||
        this.formData.groupName === ""
      ) {
        this.$message({
          message: "请输入必填项",
          type: "warning",
        });
      } else {
        if (Number(this.formData.sort) || Number(this.formData.sort) === 0) {
          //   this.formData.type = "";

          //   this.$api.dailyWork.saveNew(this.formData).then((res) => {
          //     this.$message({
          //       message: "保存成功",
          //       type: "success",
          //     });
          //   });

          let arr = [];

          this.tableArray.forEach((item) => {
            let obj = {};
            obj.groupLevel = item.groupLevel;
            obj.groupMembersIds = item.groupMembersId;
            obj.groupMembersCns = item.groupMembersName;
            obj.sysGroupsId = item.id;
            obj.groupName = item.groupName;
            obj.groupNo = item.groupNo;
            obj.groupType = item.groupType;
            obj.UnitCode = item.groupUnitId;
            obj.groupUnitName = item.groupUnitName;
            arr.push(obj);
          });

          this.$api.dailyWork
            .createOtherGroup({ groups: arr, unitCode: this.unitId })
            .then((res) => {
              this.$message({
                type: "success",
                message: "保存成功！",
              });
            });
        } else {
          this.$message({
            message: "群组序列号只能是数字",
            type: "warning",
          });
        }
      }
    },
    getdep() {
      this.$api.dailyWork
        .creatOtherGroup({ groupUnitId: this.unitId })
        .then((res) => {
          this.tableData = res.data;
        });
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selected":
          this.getdep();
          this.tableValue = true;
          this.modal = true;
          break;

        // default:
        //   break;
      }
    },

    loadData() {
      this.$api.dailyWork.saveNew({ type: "unitNamer" }).then((res) => {
        console.log(res);
        // this.formData.unitName=res.data.unitName
        this.$set(this.formData, "unitName", res.data.unitName);
        this.$set(this.formData, "unitCode", res.data.unitName);
      });
      if (!this.isAdd) {
        this.formData = JSON.parse(this.$route.query.detail);
        console.log("formData", this.formData);

        //群组成员返现返显

        this.formData.members.map((item) => {
          let obj = {};
          obj.id = item.groupMembersId;
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
    },
  },
  created() {
    if (this.isAdd == true) {
      this.canInput = false;
    }
    this.init();
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.tableList {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 2024;
  padding: 20px;
  position: absolute;
  width: 70%;
  border-radius: 5px;
  max-height: 600px;
  overflow: auto;
  top: 150px;
  left: 20%;
  background-color: #efefef;
  margin-bottom: 20px;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2013;
}
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