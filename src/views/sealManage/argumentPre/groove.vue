<template>
  <div>
    <div class="yz_title">{{rowData.tabLabel}}流水号维护</div>
    <div style="width:100%;height:30px;"></div>
    <div>
      <el-button type="primary" @click="closeData">关闭</el-button>
      <el-button type="primary" @click="saveData" v-if="!isEditor">保存</el-button>
      <el-button type="primary" @click="editorData" v-else>编辑</el-button>
    </div>
    <div style="width:100%;height:20px;"></div>
    <div v-if="isFormCfg">
      <fd-form :data="formData" :columns="formCfg" @event="btnevent"></fd-form>
    </div>
    <div v-else>
      <fd-form :data="formData" :columns="formCfgSec" @event="btnevent"></fd-form>
    </div>
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
import orgTree from "components/tree/shiwuOrgTree";
export default {
  name: "letterTemplate",
  components: {
    FdForm,
    orgTree
  },
  data() {
    return {
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",

      isSave: false,
      isEditor: false,
      isFormCfg: true,
      rowData: {},
      formCfg: [],
      formCfgSec: [],
      formData: {},
      type: "1"
    };
  },
  methods: {
    //初始化表单
    initData() {
      this.formCfg = [
        {
          type: "input",
          label: "序号",
          prop: "xuhao",
          span: 20,
          disabled: this.isSave
        },
        [
          {
            type: "input",
            prop: "unitName",
            span: 20,
            style: { width: "80%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$buttonOrg",
            value: "选择",
            style: { marginLeft: "20px" },
            disabled: this.isSave
          },
          { type: "formitem", label: "机构名称" }
        ],
        {
          type: "input",
          label: "文件代字",
          prop: "ftTitle",
          span: 20,
          disabled: this.isEditor
        },
        {
          type: "input",
          label: "年度",
          prop: "fYear",
          span: 20,
          disabled: this.isSave
        },
        {
          type: "input",
          label: "初始文号",
          prop: "initialNo",
          span: 20,
          disabled: this.isSave
        },
        {
          type: "input",
          label: "当前最大文号",
          prop: "fileNo",
          span: 20,
          rule: "numberOrnull",
          disabled: this.isEditor
        },
        {
          type: "input",
          label: "空缺文号",
          prop: "leakCodeList",
          span: 20,
          disabled: this.isEditor
        }
      ];
      this.formCfgSec = [
        {
          type: "input",
          label: "序号",
          prop: "xuhao",
          span: 20,
          disabled: this.isSave
        },
        [
          {
            type: "input",
            prop: "unitName",
            span: 20,
            style: { width: "80%" },
            disabled: true
          },
          {
            type: "button-primary",
            prop: "$buttonOrg",
            value: "选择",
            style: { marginLeft: "20px" },
            disabled: this.isSave
          },
          { type: "formitem", label: "机构名称" }
        ],
        {
          type: "input",
          label: "文件代字",
          prop: "ftTitle",
          span: 20,
          disabled: this.isSave
        },
        {
          type: "input",
          label: "年度",
          prop: "fYear",
          span: 20,
          disabled: this.isSave
        },
        {
          type: "input",
          label: "初始文号",
          prop: "initialNo",
          span: 20,
          disabled: this.isSave
        },
        {
          type: "input",
          label: "当前最大文号",
          prop: "fileNo",
          span: 20,
          rule: "numberOrnull",
          disabled: this.isEditor
        },
        {
          type: "input",
          label: "空缺文号",
          prop: "leakCodeList",
          span: 20,
          disabled: this.isEditor
        }
      ];
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "0") {
        this.$nextTick(() => {
          this.$set(this.formData, "unitName", org.unitName);
          this.$set(this.formData, "unitId", org.id);
        });
      }
    },
    //关闭
    closeData() {
      this.$router.go(-1);
    },
    //保存
    saveData() {
      switch (this.rowData.tabLabel) {
        case "公文用印登记":
          this.type = "1";
          this.goSave(this.type);
          break;
        case "介绍信审批":
          this.type = "2";
          this.goSave(this.type);
          break;
        case "常规用印审批":
          this.type = "3";
          this.goSave(this.type);
          break;
        case "部门用印审批":
          this.type = "4";
          this.goSave(this.type);
          break;
        case "刻制审批":
          this.type = "5";
          this.goSave(this.type);
          break;
        case "废止审批":
          this.type = "6";
          this.goSave(this.type);
          break;
        case "销毁审批":
          this.type = "7";
          this.goSave(this.type);
          break;
        case "印章保管交接审批":
          this.type = "9";
          this.goSave(this.type);
          break;
        case "用印机审批":
          this.type = "11";
          this.goSave(this.type);
          break;
      }
    },
    //编辑
    editorData() {
      this.isSave = true;
      this.isEditor = false;
      this.initData();
    },
    goSave(type) {
      this.$api.sealManage
        .argumentCrea({ ...this.formData, type: type })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.isSave = true;
            this.$router.push("/sealManage/argumentPre/streamPre");
          }
        });
    },
    btnevent(parmas) {
      if (parmas.prop == "$buttonOrg") {
        this.title = "选择机构";
        this.isSingle = true;
        this.orgOrDept = 1;
        this.orgOrDeptId = "0";
        this.showOrgTree = true;
      }
    }
  },
  created() {
    if (this.$route.query.rowData) {
      this.isSave = true;
      this.isEditor = true;
      this.rowData = this.$route.query.rowData;
      console.log(this.rowData,'ssss')
      this.formData = this.rowData;
      if (this.rowData.tabLabel == "印章保管交接审批") {
        this.isFormCfg = false;
      } else {
        this.isFormCfg = true;
      }
    } else if (this.$route.query.title) {
      this.isSave = false;
      this.isEditor = false;
      this.rowData.tabLabel = this.$route.query.title;
      if (this.rowData.tabLabel == "印章保管交接审批") {
        this.isFormCfg = false;
      } else {
        this.isFormCfg = true;
      }
    } else {
      return;
    }
    this.initData();
  }
};
</script>
<style scoped lang="less">
.yz_title {
  color: #3b85f0;
  width: 100%;
  text-align: center;
  font-size: 32px;
}

.btn_list {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
