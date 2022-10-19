<template>
  <div class="save">
    <el-button v-if="!isEdit" type="primary" style="margin-left:20px;" @click="save_btn">保存</el-button>
    <el-button v-else type="primary" style="margin-left:20px;" @click="edit_btn">编辑</el-button>
    <el-button type="primary" style="margin-left:20px;" @click="close_btn">关闭</el-button>
    <div class="saveHeader">
      <div class="title-text">事务审批流水号维护表</div>
    </div>
    <fd-form
      ref="fdForm"
      style="margin:0 10%"
      :data="formData"
      @event="itemClick"
      :columns="formCfg"
    ></fd-form>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
import orgTree from "components/tree/orgTree";
export default {
  name: "save",
  components: {
    FdForm,
    orgTree
  },
  props: {},
  data() {
    return {
      resList: [],
      optionsData: [],
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      formCfg: [],
      formData: {},
      isEdit: Boolean,
      rowData: {},
      id: ""
    };
  },
  computed: {},
  methods: {
    close_btn() {
      this.$router.back();
    },
    edit_btn() {
      this.isEdit = !this.isEdit;
      this.setFormConfig();
    },
    save_btn() {
      this.resList &&
        this.resList.map(item => {
          if (item.applyProject == this.formData.applyProject) {
            this.formData.projectShortName = item.projectShortName;
          }
        });

          if (this.id&&this.$refs["fdForm"].valid()) {
            this.formData.id = this.id;
            this.$api.argumentPre.alterStream(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$router.back();
              }
            });
          } else if(this.$refs["fdForm"].valid()){
            this.$refs.fdForm.submit().then(data => {
              this.$api.argumentPre.createStream(this.formData).then(res => {
                if (res.code == "SUCCESS") {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.$router.back();
                }
              });
            });
          }
    },
    itemClick(params) {
      switch (params.prop) {
        case "$selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "0";
          this.showOrgTree = true;
          break;
        case "unitName":
          break;
        case "applyLongProject":
          this.countSname();
          break;
      }
    },
    //选择项目后获得对应的简称
    countSname() {
      let that = this;
      this.resList &&
        this.resList.map(item => {
          if (item.applyProject == that.formData.applyLongProject) {
            that.formData.projectShortName = item.projectShortName;
            that.formData.manageBank = item.manageBank;
          }
        });
    },
    setFormConfig() {
      this.formCfg = [
        {
          type: "input",
          prop: "unitLongName",
          label: "管理机构",
          span: 18,
          disabled: this.isEdit,
          rule: "must"
        },
        {
          type: "button-primary",
          prop: "$selectOrg",
          span: 2,
          value: "选择",
          disabled: this.isEdit,
          style: { marginLeft: "-56px" }
        },
        {
          type: this.isEdit ? "input" : "select",
          prop: "applyLongProject",
          label: "申请项目",
          span: 20,
          style: { width: "100%" },
          options: this.optionsData.join(","),
          disabled: this.isEdit,
          placeholder: "请先选择管理机构后选择申请项目",
          rule: "must"
        },
        {
          type: "input",
          prop: "year",
          label: "年度",
          span: 20,
          style: { width: "100%" },
          disabled: this.isEdit
        },
        {
          type: "input",
          prop: "startNo",
          label: "起始文号",
          span: 20,
          style: { width: "100%" },
          disabled: this.isEdit,
          rule: "numberOrnull"
        },
        {
          type: "input",
          prop: "waterNo",
          label: "流水号",
          span: 20,
          style: { width: "100%" },
          disabled: this.isEdit,
          rule: "numberOrnull"
        },
        {
          type: "input",
          prop: "delNoStr",
          label: "漏号",
          span: 20,
          style: { width: "100%" },
          disabled: this.isEdit,
          rule: "numbers"
        }
      ];
    },
    getOrgList(org) {
      if (this.orgOrDeptId == "0") {
        this.formData.manageBankId = org.id;
        this.$set(this.formData, "unitLongName", org.unitName);
        this.$set(this.formData, "unitId", org.id);
        this.queryAppPro();
      }
    },
    queryAppPro() {
      this.$api.argumentPre
        .applyApprBank({ unitId: this.formData.unitId })
        .then(res => {
          this.resList = res.projectList;
          res.projectList &&
            res.projectList.map(item => {
              this.optionsData.push(item.applyProject);
            });
          this.setFormConfig();
        });
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.isEdit = this.$route.query.type != "edit";
    if (this.isEdit) {
      this.rowData = JSON.parse(this.$route.query.data);
      this.formData = this.rowData;
      this.id = this.rowData.id;
    }
    this.setFormConfig();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.save {
  background: white;
  margin: 0 auto;

  .saveHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>

