<template>
  <div class="content">
    <p class="use_object_title">栏目设置</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata" v-if="!isSave">保存</el-button>
      <el-button type="primary" @click="resavedata" v-if="!isSave">保存并新建</el-button>
      <!-- <el-button type="primary" @click="senddata" v-if="!isSave">发布</el-button> -->
      <el-button type="primary" @click="editordata" v-if="isSave">编辑</el-button>
    </div>
    <div class="formdata">
      <fd-form
        ref="fdForm"
        style="margin:0 1%"
        :formRules="indexformRules"
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
  name: "columnConfig",
  components: {
    FdForm
  },
  data() {
    return {
      // issend: false,
      id: "",
      isSave: true,
      bankOptions: [],
      formData: {},
      formCfg: [
        {
          type: "input",
          label: "序号",
          prop: "number",
          span: 20,
          rule: "must"
        },
        {
          type: "select",
          label: "行名",
          prop: "bankName",
          span: 20,
          options: "",
          style: { width: "100%" }
        },
        { type: "input", label: "专栏栏目", prop: "zl", span: 20, rule: "must" }
      ],
      indexformRules: {
        zl: [{ required: true, trigger: "blur", message: "请输入专栏栏目" }]
      },
      serverconfig: {
        labelWidth: "140px"
      }
    };
  },
  methods: {
    initData() {
      this.formCfg = [
        {
          type: "input",
          label: "序号",
          prop: "number",
          span: 20,
          rule: "must",
          disabled: this.isSave
        },
        {
          type: this.isSave ? "input" : "select",
          label: "行名",
          prop: "bankName",
          span: 20,
          options: this.bankOptions.join(","),
          style: { width: "100%" },
          disabled: this.isSave
        },
        {
          type: "input",
          label: "专栏栏目",
          prop: "zl",
          span: 20,
          rule: "must",
          disabled: this.isSave
        }
      ];
    },
    closedata() {
      // this.$router.go(-1)
      //   this.$router.push({
      //     path: "/dashboard/personalOffice/admin/coluIndex",
      //     query: { activeName: "coluSec" }
      //   });
      // this.isSave = false
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
              this.$router.push({
                path: "/dashboard/personalOffice/admin/coluIndex",
                query: { activeName: "coluSec" }
              });
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        // this.$intent.closeWindow(this);
        this.$router.push({
          path: "/dashboard/personalOffice/admin/coluIndex",
          query: { activeName: "coluSec" }
        });
      }
    },
    savedata() {
      if (this.$refs.fdForm.valid()) {
        let reg = /^[0-9]+[0-9]*]*$/;
        if (reg.test(this.formData.number)) {
          if (this.id) {
            this.formData.id = this.id;
            this.$api.adminConfig.altercolumnConfig(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                // this.issend = true
                // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                this.$router.push({
                  path: "/dashboard/personalOffice/admin/coluIndex",
                  query: { activeName: "coluSec" }
                });
              }
            });
          } else {
            this.$api.adminConfig.columnConfig(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                // this.issend = true
                // this.id = res.id
                // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                this.$router.push({
                  path: "/dashboard/personalOffice/admin/coluIndex",
                  query: { activeName: "coluSec" }
                });
              }
            });
          }
        } else {
          this.$message({
            message: "序号必须为数字",
            type: "error"
          });
        }
      }
    },
    resavedata() {
      if (this.$refs.fdForm.valid()) {
        let reg = /^[0-9]+[0-9]*]*$/;
        if (reg.test(this.formData.number)) {
          if (this.id) {
            this.formData.id = this.id;
            this.$api.adminConfig.altercolumnConfig(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                // this.issend = true
                // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                this.formData = {};
                this.id = "";
                this.isSave = false;
                this.initData();
              }
            });
          } else {
            this.$api.adminConfig.columnConfig(this.formData).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                // this.issend = true
                // this.id = res.id
                // this.$router.push('/dashboard/personalOffice/admin/coluIndex')
                this.formData = {};
                this.id = "";
                this.isSave = false;
                this.initData();
              }
            });
          }
        } else {
          this.$message({
            message: "序号必须为数字",
            type: "error"
          });
        }
      }
    },
    // senddata(){
    //     if (this.issend) {
    //         this.$api.adminConfig.columnSend(
    //            { id: this.id}
    //         ).then(res => {
    //             if(res.code=="SUCCESS"){
    //                 this.$message({
    //                     message: '发布成功',
    //                     type: 'success'
    //                 });
    //                 this.$router.push('/dashboard/personalOffice/admin/coluIndex')
    //             }
    //         })
    //     }else{
    //         this.$alert('请先保存数据')
    //     }
    // },
    btnevent() {},
    editordata() {
      this.isSave = false;
      this.loadData();
    },
    loadData() {
      this.$api.adminConfig.columnConfig({}).then(res => {
        this.bankOptions.push(res.data.bankName);
        // res.data&&res.data.map(function (value, index) {
        //     that.bankOptions.push(value.bankName)
        // })
        this.initData();
      });
    }
  },
  created() {
    if (this.$route.query.rowData && this.$route.query.rowData) {
      let val = JSON.parse(this.$route.query.rowData);
      this.id = val.id;
      this.isSave = true;
      this.formData = val;
      this.initData();
    } else {
      this.isSave = false;
      this.loadData();
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
