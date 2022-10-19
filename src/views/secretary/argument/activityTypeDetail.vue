
<template>
  <div class="linkForm">
    <div>
      <el-button type="primary" @click="shutDown">关闭</el-button>
      <el-button type="primary" @click="edit">{{editButtonText ? "编辑" : "保存"}}</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">活动类型配置</div>
    </div>
    <div style="margin-top:15px">
      <el-form
        style="margin-bottom:5px"
        label-width="120px"
        :model="formData"
        ref="RefForm"
        :rules="rules"
      >
        <el-row>
          <el-col>
            <el-form-item label="机构名称" prop="unitName">
              <select-org-or-dept
                @select="selectOrg"
                :orgOrDept="1"
                :orgOrDeptId="'0'"
                style="width:100%;"
              >
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="formData.unitName"
                  suffix-icon="el-icon-arrow-down"
                  :disabled="isAllDisabled"
                />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="活动类型" prop="activeType">
              <el-input v-model="formData.activeType" :disabled="isAllDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span style="color:red;margin-left:113px;font-size:14px">说明：手工录入多个活动类型值之间，请用英文状态下的分号分割</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from "components/select/selectOrgOrDept";
import Span from "../../../components/plug/elements/span/Span.vue";
export default {
  name: "activityTypeDetail",
  components: {
    selectOrgOrDept,
    Span
  },
  data() {
    return {
      editButtonText: false, //编辑和保存切换
      isAllDisabled: false,
      shutIs: false, //关闭按钮是否触发
      formData: {
        unitName: "", //JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        unitId: "", //JSON.parse(localStorage.getItem("userInfo")).unitId,
        activeType: "",
        id: ""
      },
      rules: {
        unitName: [{ required: true, message: "不能为空", trigger: "change" }],
        activeType: [
          { required: true, message: "不能为空", trigger: "blur" }
          //{pattern: /^[\u4e00-\u9fa5-\;]+$/,message: "多个活动类型值之间，请用英文状态下的分号分割",trigger: "blur",},
        ]
      }
    };
  },
  computed: {},
  methods: {
    selectOrg(org) {
      this.formData.unitName = org.unitName;
      this.formData.unitId = org.id;
    },
    //关闭
    shutDown() {
      if (this.isAllDisabled == false) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.edit();
              // this.$intent.closeWindow(this);
              this.$router.push({ path: "/secretary/argument/activityType" });
            } else if (action === "cancel") {
              //点否
              // this.$intent.closeWindow(this);
              this.$router.push({ path: "/secretary/argument/activityType" });
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        // this.$intent.closeWindow(this);
        this.$router.push({ path: "/secretary/argument/activityType" });
      }
      // this.$confirm("关闭前是否保存?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning"
      // }).then(() => {
      //   this.edit()
      //   this.shutIs=true
      //  }).catch(() => {
      //    this.$router.push({path: "/secretary/argument/activityType",});
      // });
    },
    //保存和编辑
    edit() {
      if (this.editButtonText) {
        //编辑
        this.isAllDisabled = false;
        this.editButtonText = false;
      } else {
        //保存
        this.$refs.RefForm.validate(valid => {
          if (valid) {
            if (this.$route.query.id || this.formData.id != "") {
              this.$api.activityInformation
                .parameTerEdit({ ...this.formData })
                .then(res => {
                  this.isAllDisabled = true;
                  this.editButtonText = true;
                  this.$message({ type: "success", message: "保存成功！" });
                  if (this.shutIs == true) {
                    this.$router.push({
                      path: "/secretary/argument/activityType"
                    });
                  }
                });
            } else {
              this.$api.activityInformation
                .parameTerSave({ ...this.formData })
                .then(res => {
                  this.formData.id = res.data.id;
                  this.isAllDisabled = true;
                  this.editButtonText = true;
                  this.$message({ type: "success", message: "保存成功！" });
                  if (this.shutIs == true) {
                    this.$router.push({
                      path: "/secretary/argument/activityType"
                    });
                  }
                });
            }
          } else {
            this.$message.error("请填写完整信息");
          }
        });
      }
    },
    //详情
    loadData() {
      this.$api.activityInformation
        .parameTerView({ id: this.$route.query.id })
        .then(res => {
          this.formData = res.data;
          this.isAllDisabled = true;
          this.editButtonText = true;
        });
    }
  },
  mounted() {},
  created() {
    if (this.$route.query.id) {
      this.loadData();
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.linkForm {
  min-height: 100vh;
  .formHeader {
    padding: 8px 70px;
    margin-top: 30px;
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
