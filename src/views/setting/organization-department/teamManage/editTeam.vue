/**
* create by zx on 2020-7-2 14:35
* 类注释：
* 备注：
*/
<template>
  <div class="editTeam">
    <div class="handleButton">
      <el-button type="primary" @click="saveOrgInfo()">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <form-header title="群组基本信息表"></form-header>
    <fd-form
      style="margin:0 10%"
      ref="fdFrom"
      :config="{'labelWidth':'200px'}"
      @event="eventClick"
      :data="formData"
      :columns="formCfg"
    ></fd-form>

    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :queryType="queryType"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
      :selectDept="selectDept"
      @getCheckedNodes="getCheckedNodes"
    ></org-tree>
  </div>
</template>

<script>
import formHeader from "components/header/formHeader";
import orgTree from "components/tree/orgTree";
import FdForm from "vue-elementui-freedomen/components/form";

export default {
  name: "editTeam",
  components: {
    formHeader,
    orgTree,
    FdForm,
  },
  props: {},
  data() {
    return {
      selectDept: [],
      tempArr: [],
      queryType: "",
      type: -1,
      orgOrDept: 1,
      orgOrDeptId: "1",
      title: "选择机构",
      isSingle: true,
      showOrgTree: false,
      formCfg: [],
      formData: {},
      parents: {},
      groupMembersName: "",
      groupMembersId: "",
    };
  },
  computed: {},
  methods: {
    eventClick(params) {
      switch (params.prop) {
        case "selectOrg":
          this.orgOrDeptId = "1";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.queryType = "";
          this.title = "选择机构";
          this.type = 0;
          this.showOrgTree = true;
          this.clear();
          break;
        case "groupType":
          if (this.formData.groupType == "机构") {
            this.orgOrDept = 1;
          } else {
            this.orgOrDept = 0;
          }
          this.clear();
          break;
        case "selectOrgOrDept":
          if (!this.formData.groupUnitId || !this.formData.groupType) {
            this.$message({
              type: "error",
              message: "请先选择机构和群组类型",
            });
            return;
          }

          //匹配queryType选值
          if (this.formData.groupLevel == "上级群组") {
            this.queryType = "up";
          } else if (this.formData.groupLevel == "同级群组") {
            this.queryType = "peer";
          } else if (this.formData.groupLevel == "下级群组") {
            this.queryType = "low";
          } else {
            this.queryType = "";
          }

          this.isSingle = false;
          this.title = this.orgOrDept == 1 ? "选择机构" : "选择部门";
          this.type = 1;
          this.selectDept = [];
          this.tempArr = [];
          let idArr = [];
          let nameArr = [];
          if (this.formData.groupMembersId.length > 0) {
            idArr = this.formData.groupMembersId.split(",");
            nameArr = this.formData.groupMembersName.split(",");
          }
          if (idArr && idArr.length > 0) {
            idArr.forEach((item, index) => {
              let obj = {};
              obj.id = item.split("/")[0];
              // obj.unitName=nameArr[index].split('/')[0]
              obj.unitName = nameArr[index];
              this.tempArr.push(obj);
            });
          }
          this.selectDept = this.tempArr;
          this.showOrgTree = true;
          break;
        case "groupLevel":
          // 上级群组,同级群组,下级群组,其他群组+   up:上级   low:下级  peer:同级 ''其他
          if (this.formData.groupLevel == "上级群组") {
            this.queryType = "up";
          } else if (this.formData.groupLevel == "同级群组") {
            this.queryType = "peer";
          } else if (this.formData.groupLevel == "下级群组") {
            this.queryType = "low";
          } else {
            this.queryType = "";
          }
          this.clear();
          break;
      }
    },
    clear() {
      this.$set(this.formData, "groupMembersName", "");
      this.$set(this.formData, "groupMembersId", "");
      this.$set(this.formData, "groupMembersName1", "");
      this.$set(this.formData, "groupMembersId1", "");
      this.tempArr = [];
    },
    getTeamMembers() {
      const that = this;
      const data = {
        groupMembersName: that.formData.groupMembersName1,
        groupMembersId: that.formData.groupMembersId1,
        groupType: that.formData.groupType,
      };
      that.$api.setSysConfig.getTeamMembers(data).then((res) => {
        if (res.code === "SUCCESS") {
          that.$set(
            that.formData,
            "groupMembersName",
            res.data.groupMembersName
          );
          that.$set(that.formData, "groupMembersId", res.data.groupMembersId);
        }
      });
    },
    getOrgList(org) {
      if (this.type == 0) {
        this.orgOrDeptId = org.id;
        this.selectDept = [];
        this.$set(this.formData, "groupUnitName", org.unitName);
        this.$set(this.formData, "groupUnitId", org.id);
        this.$set(this.formData, "groupMembersName", "");
        this.$set(this.formData, "groupMembersId", "");
        this.$set(this.formData, "groupMembersName1", "");
        this.$set(this.formData, "groupMembersId1", "");
      } else {
        // this.selectDept=[]
        // this.selectDept=this.tempArr
        let ids = [];
        let names = [];
        org.map((item) => {
          ids.push(item.id);
          names.push(item.unitName.split("/")[0]);
        });
        // this.$set(this.formData, 'groupMembersName', names.join(","))
        // this.$set(this.formData, 'groupMembersId', ids.join(","))
        if (ids && ids.length > 0) {
          this.$set(this.formData, "groupMembersName1", names.join(","));
          this.$set(this.formData, "groupMembersId1", ids.join(","));
          this.getTeamMembers();
          return;
        }
        this.$set(this.formData, "groupMembersId", "");
        this.$set(this.formData, "groupMembersName", "");
      }
    },
    getCheckedNodes(checkedNodes) {
      this.parents.id = checkedNodes;
    },
    saveOrgInfo() {
      this.$refs.fdFrom.submit().then((data) => {
        if (this.formData.groupMembersName.indexOf(",") != -1) {
          this.$api.setSysConfig
            .saveTeam(
              this.formData,
              this.$route.query.detail ? "ADICS2036" : "ADICS2033"
            )
            .then((res) => {
              this.$router.back();
            });
        } else {
          this.$message({
            type: "error",
            message: "群组成员不能只有一个",
          });
        }
      });
    },
    init() {
      this.formCfg = [
        {
          label: "群组序号",
          prop: "groupNo",
          type: "input",
          disabled: true,
          span: 22,
          rule: "must",
        },
        {
          label: "使用此设置的机构名",
          prop: "groupUnitName",
          type: "input",
          span: 22,
          disabled: true,
          rule: "must",
        },
        {
          type: "button-primary",
          prop: "selectOrg",
          value: "选择",
          style: { "margin-left": "-98px" },
          span: 1,
        },
        {
          label: "群组名称",
          prop: "groupName",
          type: "input",
          span: 22,
          rule: "must",
        },
        {
          label: "群组类型",
          type: "radios",
          prop: "groupType",
          options: "机构,部门",
          span: 22,
          rule: "must",
        },
        {
          label: "群组级别",
          type: "radios",
          prop: "groupLevel",
          options: "同级群组,下级群组,其他群组",
          span: 22,
          rule: "must",
        },

        {
          label: "群组成员",
          prop: "groupMembersName",
          type: "input-area",
          config: { rows: 3 },
          span: 22,
          disabled: true,
          rule: "must",
        },
        {
          type: "button-primary",
          prop: "selectOrgOrDept",
          value: "选择",
          style: { "margin-left": "-98px" },
          span: 1,
        },
        {
          label: "备注",
          prop: "remark",
          type: "input-area",
          span: 22,
        },
      ];
    },
  },
  activated() {},
  mounted() {
    if (this.$route.query.detail) {
      this.formData = JSON.parse(this.$route.query.detail);
      //初始化群组类型
      if (this.formData.groupType == "机构") {
        this.orgOrDept = 1;
      } else {
        this.orgOrDept = 0;
      }

      //初始化使用此设置的机构名
      this.orgOrDeptId = this.formData.groupUnitId;
      this.init();
    } else {
      this.selectDept = [];
      this.tempArr = [];
      this.$api.setSysConfig.getTeamId({}).then((res) => {
        this.$set(this.formData, "groupNo", res.data.groupNo);
        this.init();
      });
    }
  },
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.editTeam {
}
</style>
