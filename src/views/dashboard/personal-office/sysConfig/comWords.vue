<template>
  <div class="content">
    <p class="use_object_title">个人常用批语</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata" v-if="!isSave">保存</el-button>
      <el-button type="primary" @click="editordata" v-else>编辑</el-button>
    </div>
    <div class="formdata">
      <fd-form
        :rules="rules"
        style="margin:0 1%"
        ref="fdForm"
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
  name: "comWords",
  components: {
    FdForm
  },
  data() {
    return {
      // rules:{
      //   hyNo:
      // },
      isSave: true,
      formData: {},
      formCfg: [
        {
          type: "input",
          label: "序号",
          prop: "hyNo",
           rule: ["number","textLong999999999"],
          style: { width: "100%" },
          disabled: true,
          placeholder:"请输入0到999999999",
        },
        {
          type: "input",
          label: "批语内容",
          prop: "hyDnr",
          style: { width: "100%" },
          rule: "must",
          disabled: true
        }
      ],
      serverconfig: {
        labelWidth: "140px"
      },
      val: {}
    };
  },
  created() {
    if (this.$route.query.val) {
      this.val = this.$route.query.val;
      this.formData = this.val;
      this.initData();
    } else {
      this.isSave = false;
      this.initData();
    }
  },
  methods: {
    initData() {
      this.formCfg = [
        {
          type: "input",
          label: "序号",
          prop: "hyNo",
          rule: ["number","textLong999999999"],
          style: { width: "100%" },
          disabled: this.isSave,
          placeholder:"请输入0到999999999",
          
        },
        {
          type: "input",
          label: "批语内容",
          prop: "hyDnr",
          rule: "must",
          style: { width: "100%" },
          disabled: this.isSave
        }
      ];
    },
    closedata() {
      // this.$router.go(-1);
      if (!this.isSave) {
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
      } else {
        // this.$intent.closeWindow(this);
        this.$router.go(-1);
      }
    },
    savedata() {
      // debugger
      this.$refs.fdForm.submit().then(valid => {
        if(valid) {
          if (this.val.id) {
        this.$api.dailyWork_sysConfig
          .alterPerComWords(this.formData)
          .then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.go(-1);
              // this.$router.push(
              //   "/dashboard/personalOffice/sysConfig/viewWords"
              // );
            }
          });
      } else {
        
          this.$api.dailyWork_sysConfig.perComWords(this.formData).then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.go(-1);
              // this.$router.push(
              //   "/dashboard/personalOffice/sysConfig/viewWords"
              // );
            }
          });
      }
        }
      })
      
    },
    editordata() {
      this.isSave = false;
      this.initData();
    },
    btnevent() {}
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
