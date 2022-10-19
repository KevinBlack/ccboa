<!--
 * @Author: your name
 * @Date: 2020-09-01 10:05:02
 * @LastEditTime: 2020-12-30 14:08:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\sysConfig\otherconfig\thingsOrderDetail.vue
-->
<template>
  <div class="content">
    <p class="base-title">待办事宜</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata('ruleForm')">保存</el-button>
    </div>
    <el-row style="margin-top: 15px;margin-left: 80px;">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg" :orgOrDeptId="'0'">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择机构"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
    </el-row>
    <el-form
      style="margin-top: 10px;"
      label-width="80px"
      :model="formdata"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="紧急级别" prop="ft">
        <el-input v-model="formdata.ft"></el-input>
      </el-form-item>
      <el-form-item label="紧急参数" prop="tt">
        <el-input v-model="formdata.tt"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import FdForm from 'vue-elementui-freedomen/components/form'
// import orgTree from "components/tree/orgTree";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: 'servereditor',
  components: {
    FdForm,
    selectOrgOrDept
    // orgTree
  },
  data () {
    return {
      formdata: {
        ft: '',
        tt: ''
      },
      rules: {
        ft: [{ required: true, message: '请输入紧急级别', trigger: 'blur' }],
        tt: [{ required: true, message: '请输入紧急参数', trigger: 'blur' }],
      },
      //JSON.parse(localStorage.getItem("userInfo")).unitName,
      //JSON.parse(localStorage.getItem("userInfo")).unitId,

      searchData: {
        orgName: '',
        draftId: ''
      },
      orgOrDeptId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      showOrgTree: false,
      applyformData: this.$route.query.detail ? JSON.parse(this.$route.query.detail) : {},
      applyformCfg: [
        { type: 'input', prop: 'draftName', label: '机构名称', span: 20, disabled: true },
        {
          type: 'button-primary',
          value: '选择',
          span: 2,
          prop: 'button1',
          style: { 'margin-left': '-60px' },
          disabled: this.$route.query.detail
        },
        { type: 'input', prop: 'todoClass', label: '紧急级别' },
        { type: 'input', prop: 'todoParameter', label: '紧急参数' },
      ],
      serverconfig: {
        labelWidth: '160px'
      }
    }
  },
  methods: {
    closedata () {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/setting/sysConfig/otherconfig/thingsOrder");
        })
        .catch(() => {
        });
    },
    selectOrg (org) {
      this.searchData.orgName = org.unitName;
      this.searchData.draftId = org.id;
    },

    savedata (formName) {
      if (this.searchData.orgName === "") {
        this.$message({
          type: "warning",
          message: "您还没有选择机构"
        })
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$api.setSysConfig.setToDo({ draftName: this.searchData.orgName, draftId: this.searchData.draftId, todoClass: this.formdata.ft, todoParameter: this.formdata.tt }).then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              })
              this.$router.push({
                path: "/setting/sysConfig/otherconfig/thingsOrder",
                query: { draftName: this.searchData.orgName, id: this.searchData.draftId },
              });
            })
          } else {
            return false
          }
        })

      }

    },
    btnevent (params) {
      switch (params.prop) {
        case 'button1':
          this.showOrgTree = true
          break;
      }
    },
    getOrgList (org) {
      this.$set(this.applyformData, "draftName", org.unitName);
      this.$set(this.applyformData, "draftId", org.id);
    },
  }
}
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
