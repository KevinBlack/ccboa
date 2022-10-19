<template>
  <div class="content">
    <p class="use_object_title">用户基本信息表</p>
    <div class="btn-list">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button type="primary" @click="handleClose">关闭</el-button>
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
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
export default {
  name: "alterPer",
  components: {
    FdForm
  },
  data() {
    return {
      formData: {},
      formCfg: [],
      serverconfig: {
        labelWidth: "140px"
      }
    };
  },
  created() {
    this.initData();
    this.loadData();
  },
  methods: {
    // 调用表单配置项
    initData() {
      this.formCfg = [
        {
          type: "input",
          label: "姓名",
          prop: "humanName",
          span: 10,
          disabled: true
        },
        {
          type: "input",
          label: "中文名",
          prop: "humanName",
          span: 10,
          disabled: true
        },
        {
          type: "input",
          label: "用户全称",
          prop: "humanName",
          span: 10,
          disabled: true
        },
        {
          type: "input",
          label: "姓名简称",
          prop: "humanName",
          span: 10,
          disabled: true
        },
        {
          type: "input",
          label: "所属部门",
          prop: "humanDeptName",
          span: 10,
          disabled: true
        },
        {
          type: "input",
          label: "上级部门名称",
          prop: "highDeptName",
          span: 10,
          disabled: true
        },
        {
          type: "input-area",
          label: "所属岗位",
          prop: "humanPost",
          span: 20,
          config: { rows: 4 },
          disabled: true
        },
        {
          type: "input",
          label: "特殊授权",
          prop: "humanSpe",
          span: 20,
          disabled: true
        },
        {
          type: "input",
          label: "职务",
          prop: "humanJob",
          span: 10,
          disabled: true
        },
        { type: "input", label: "办公电话", prop: "telMobile", span: 10 },
        { type: "input", label: "手机号", prop: "phone", span: 10 },
        { type: "input", label: "微信号", prop: "chatNum", span: 10 },
        { type: "input", label: "邮件", prop: "email", span: 10 }
      ];
    },
    // 第一次调用表单返回数据的接口
    loadData() {
      this.$api.dailyWork_sysConfig
        .alterPerson({
          type: "perInfo"
        })
        .then(res => {
          console.log(res, "打印修改信息");
          this.formData = res.data;
          this.initData();
        });
    },
    // 关闭按钮
    handleClose() {
      // this.$router.back();
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.handleSave();
            // this.$intent.closeWindow(this);
            this.$router.go(-1);
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
    btnevent() {},
    // 保存按钮
    handleSave() {
      this.$api.dailyWork_sysConfig
        .alterPerson({
          ...this.formData,
          type: ""
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "保存成功"
            });
          }
        });
    }
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
  color: #e13b3d;
  font-size: 28px;
}
</style>
