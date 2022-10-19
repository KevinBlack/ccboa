<template>
  <div class="content">
    <p class="base-title">反向提醒设置</p>
    <div class="btn-list">
      <el-row :gutter="20">
        <el-col :span="6">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择机构"
              v-model="searchData.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-button type="primary" @click="savedata">保存</el-button>
      </el-row>
    </div>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        ref="fdFrom"
        :data="applyformData"
        :columns="applyformCfg"
        :config="serverconfig"
      ></fd-form>
    </div>
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "servereditor",
  components: {
    FdForm,
    selectOrgOrDept,
  },
  data() {
    return {
      typeF: {},
      typeQ: {},
      applyformData: {},
      applyformCfg: [
        {
          type: "radios",
          prop: "isUse",
          label: "是否启用提醒设置",
          options: { 0: "不启用", 1: "启用" },
          span: 24,
          rule: "must",
        },
        {
          type: "radios",
          prop: "fawenCheckBox",
          label: "发文启用",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "select-multiple",
          prop: "fawenHuanjie",
          label: "发文环节",
          span: 15,
          style: { width: "100%" },
          options: "选项1,选项2,选项3,选项4",
          rule: "must",
        },
        {
          type: "radios",
          prop: "fawenDraft",
          label: "发文拟稿人",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "radios",
          prop: "fawenBmzh",
          label: "发文部门综合",
          options: { 0: "不启用", 1: "启用" },
          span: 9,
          rule: "must",
        },
        {
          type: "radios",
          prop: "qianbaoCheckBox",
          label: "签报启用",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "select-multiple",
          prop: "qianbaoHuanjie",
          label: "签报环节",
          span: 15,
          style: { width: "100%" },
          options: "选项1,选项2,选项3,选项4",
          rule: "must",
        },
        {
          type: "radios",
          prop: "fawenDraft",
          label: "签报拟稿人",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "radios",
          prop: "qianbaoBmzh",
          label: "签报部门综合",
          options: { 0: "不启用", 1: "启用" },
          span: 9,
          rule: "must",
        },

        [
          {
            type: "input",
            prop: "dayInfo",
            style: { width: "30%" },
            rule: "must",
          },
          { type: "span", value: "天" },
          { type: "formitem", label: "初始提醒时间" },
        ],
        [
          {
            type: "input",
            prop: "dayInfoOver",
            style: { width: "30%" },
            rule: "must",
          },
          { type: "span", value: "天" },
          { type: "formitem", label: "重复提醒周期" },
        ],
        [
          {
            type: "input",
            prop: "hintOne",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "span", value: "和" },
          {
            type: "input",
            prop: "hintTwo",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "span", value: "和" },
          {
            type: "input",
            prop: "hintThree",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "span", value: "和" },
          {
            type: "input",
            prop: "hintFour",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "formitem", label: "提示语" },
        ],
        [
          {
            type: "span",
            value: "1.定时代理每日24：00执行",
            style: { color: "red" },
          },
          { type: "br" },
          {
            type: "span",
            value:
              "2.计算每个流转文件在主管部门以外的积累办理时长；不含非工作日",
            style: { color: "red" },
          },
          { type: "br" },
          {
            type: "span",
            value: "3.每个文件只发送一次提醒",
            style: { color: "red" },
          },
          { type: "formitem", label: "超期办理时限" },
        ],
      ],
      serverconfig: {
        labelWidth: "140px",
      },
      searchData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        unitClass: 0,
      },
    };
  },
  methods: {
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.unitId = org.id;
      this.getTypeList();
    },
    savedata() {
      if (!this.$refs.fdFrom.valid()) {
        this.$message({
          type: "error",
          message: "请输入必填项",
        });
        return;
      }
      this.applyformData.unitId = this.searchData.unitId;
      this.$api.designDictionary
        .seReMind({ reverseNotice: this.applyformData })
        .then((res) => {
          this.$message({ type: "success", message: "保存成功" });
          this.loadData();
        });
    },
    loadData() {
      this.$api.designDictionary
        .getReMind({ unitId: this.searchData.unitId })
        .then((res) => {
          this.applyformData = res.data;
          this.init();
        });
    },
    getTypeList() {
      this.$api.setting.workFlow
        .getAfterNodes({
          deptId: JSON.parse(localStorage.getItem("userInfo")).unitId,
          multiTenancyId: "CN000",
          groupId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        })
        .then((res) => {
          this.typeF = {};
          res.data.forEach((item) => {
            this.typeF[item.pcsAvyId] = item.avyNodeNm;
          });
          this.$api.setting.workFlow
            .getAfterNodes({
              deptId: JSON.parse(localStorage.getItem("userInfo")).unitId,
              multiTenancyId: "CN002",
              groupId: JSON.parse(localStorage.getItem("userInfo")).unitId,
            })
            .then((res) => {
              this.typeQ = {};
              res.data.forEach((item) => {
                this.typeQ[item.pcsAvyId] = item.avyNodeNm;
              });
              this.loadData();
            });
        });
    },
    init() {
      this.applyformCfg = [
        {
          type: "radios",
          prop: "isUse",
          label: "是否启用提醒设置",
          options: { 0: "不启用", 1: "启用" },
          span: 24,
          rule: "must",
        },
        {
          type: "radios",
          prop: "fawenCheckBox",
          label: "发文启用",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "select-multiple",
          prop: "fawenHuanjie",
          label: "发文环节",
          span: 15,
          style: { width: "100%" },
          options: this.typeF,
          rule: "must",
        },
        {
          type: "radios",
          prop: "fawenDraft",
          label: "发文拟稿人",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "radios",
          prop: "fawenBmzh",
          label: "发文部门综合",
          options: { 0: "不启用", 1: "启用" },
          span: 9,
          rule: "must",
        },
        {
          type: "radios",
          prop: "qianbaoCheckBox",
          label: "签报启用",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "select-multiple",
          prop: "qianbaoHuanjie",
          label: "签报环节",
          span: 15,
          style: { width: "100%" },
          options: this.typeQ,
          rule: "must",
        },
        {
          type: "radios",
          prop: "qianbaoDraft",
          label: "签报拟稿人",
          options: { 0: "不启用", 1: "启用" },
          span: 8,
          rule: "must",
        },
        {
          type: "radios",
          prop: "qianbaoBmzh",
          label: "签报部门综合",
          options: { 0: "不启用", 1: "启用" },
          span: 9,
          rule: "must",
        },

        [
          {
            type: "input",
            prop: "dayInfo",
            style: { width: "30%" },
            rule: "must",
          },
          { type: "span", value: "天" },
          { type: "formitem", label: "初始提醒时间" },
        ],
        [
          {
            type: "input",
            prop: "dayInfoOver",
            style: { width: "30%" },
            rule: "must",
          },
          { type: "span", value: "天" },
          { type: "formitem", label: "重复提醒周期" },
        ],
        [
          {
            type: "input",
            prop: "hintOne",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "span", value: "和" },
          {
            type: "input",
            prop: "hintTwo",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "span", value: "和" },
          {
            type: "input",
            prop: "hintThree",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "span", value: "和" },
          {
            type: "input",
            prop: "hintFour",
            style: { width: "15%" },
            rule: "must",
          },
          { type: "formitem", label: "提示语" },
        ],
        [
          {
            type: "span",
            value: "1.定时代理每日24：00执行",
            style: { color: "red" },
          },
          { type: "br" },
          {
            type: "span",
            value:
              "2.计算每个流转文件在主管部门以外的积累办理时长；不含非工作日",
            style: { color: "red" },
          },
          { type: "br" },
          {
            type: "span",
            value: "3.每个文件只发送一次提醒",
            style: { color: "red" },
          },
          { type: "br" },
          {
            type: "span",
            value: "4. 超出办理期限的文件，发送待办事宜提醒给信息接收人",
            style: { color: "red" },
          },
          { type: "formitem", label: "反向提醒功能说明" },
        ],
      ];
    },
  },
  created() {
    this.getTypeList();
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
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }
}
</style>
