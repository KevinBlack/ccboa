<template>
  <div class="content">
    <p class="use_object_title">链接设置</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata" v-if="!ifSave">保存</el-button>
      <el-button type="primary" @click="editorData" v-show="isShowEdit" v-if="ifSave">编辑</el-button>
      <el-button type="primary" @click="resavedata" v-if="!ifSave">保存并新建</el-button>
    </div>
    <div class="formdata">
      <!-- <fd-form ref="mform" :formRules="indexformRules" style="margin:0 1%" :data="formData" :columns="formCfg" :config="serverconfig" @event="btnevent"></fd-form> -->
      <m-form
        ref="mform"
        :formRules="indexformRules"
        style="margin:0 1%"
        :formData="formData"
        :formCfg="formCfg"
        :isInline="false"
        labelWidth="140px"
        :showButton="false"
        @event="btnevent"
      ></m-form>
    </div>
  </div>
</template>
<script>
// import FdForm from 'vue-elementui-freedomen/components/form'
import mForm from "components/form/mForm";

export default {
  name: "createLink",
  components: {
    // FdForm,
    mForm
  },
  data() {
    return {
      isCommonAddressDisabled: "", // 公用地址是否禁用
      ifSave: true,
      isEditor: false,
      isShowEdit: true,
      linkFromData: {},
      formData: {},
      formCfg: [],
      indexformRules: {
        hyDnr: [{ required: true, trigger: "blur", message: "请输入序号" }],
        hyName: [
          { required: true, trigger: "blur", message: "请输入链接名称" }
        ],
        hyAddress: [
          { required: true, trigger: "blur", message: "请输入链接地址" }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.linkData && this.$route.query.linkData.id) {
      this.ifSave = true;
      this.formData = this.$route.query.linkData;
      if (this.$route.query.isKeys === "0") {
        this.isShowEdit = false;
      }
      this.initData();
    } else if (this.$route.query.titleLabel) {
      this.ifSave = false;
      this.loadData();
    }
  },
  methods: {
    initData() {
      this.formCfg = [
        {
          type: "input",
          label: "序号",
          prop: "hyDnr",
          width: "100%",
          disabled: this.ifSave
        },
        {
          type: "input",
          label: "链接名称",
          prop: "hyName",
          width: "100%",
          disabled: this.ifSave
        },
        {
          type: "input",
          label: "链接地址",
          prop: "hyAddress",
          width: "100%",
          disabled: this.ifSave
        },
        // {
        //   type: 'radios',
        //   label: '公用地址',
        //   prop: 'keys',
        //   options: { '0': '否', '1': '是' },
        //   disabled: this.isCommonAddressDisabled,
        // },
        {
          type: "radio",
          label: "公用地址",
          prop: "keys",
          radios: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ],
          disabled: this.isCommonAddressDisabled
        }
      ];
    },
    initData2() {
      this.formCfg = [
        {
          type: "input",
          label: "序号",
          prop: "hyDnr",
          width: "100%",
          disabled: this.ifSave
        },
        {
          type: "input",
          label: "链接名称",
          prop: "hyName",
          width: "100%",
          disabled: this.ifSave
        },
        {
          type: "input",
          label: "链接地址",
          prop: "hyAddress",
          width: "100%",
          disabled: this.ifSave
        }
        // {
        //   type: 'radios',
        //   label: '公用地址',
        //   prop: 'keys',
        //   options: { '0': '否', '1': '是' },
        //   disabled: this.isCommonAddressDisabled,
        // },
        // {
        //   type: 'radio',
        //   label: '公用地址',
        //   prop: 'keys',
        //   radios: [
        //     { label: '是', value: '1' },
        //     { label: '否', value: '0' }
        //   ],
        //   disabled: this.isCommonAddressDisabled,
        // },
      ];
    },
    loadData() {
      this.$api.dailyWork_sysConfig.createLink({}).then(res => {
        if (this.$route.query.titleLabel == "个人链接") {
          res.data.keys = "0";
        }
        this.formData = res.data;
        if (res.data.keys === "0") {
          this.isCommonAddressDisabled = true;
        } else {
          this.isCommonAddressDisabled = false;
        }
        // debugger
        if (this.$route.query.titleLabel == "个人链接") {
          this.initData2();
        } else {
          this.initData();
        }
      });
    },
    closedata() {
      // this.$router.push('/dashboard/personalOffice/sysConfig/viewLinkConfig')
      if (!this.ifSave) {
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
    checkAddress() {
      if (this.formData.hyAddress.indexOf("http://") !== 0) {
        this.formData.hyAddress = "http://" + this.formData.hyAddress;
      }
    },
    savedata() {
      this.$refs.mform.validate().then(res => {
        if (res) {
          let reg = /^[0-9]+[0-9]*]*$/;
          if (reg.test(this.formData.hyDnr)) {
            //链接地址 前加http://
            this.checkAddress();
            if (this.$route.query.linkData && this.$route.query.linkData.id) {
              this.$api.dailyWork_sysConfig
                .alterLink(this.formData)
                .then(res => {
                  if (res.code == "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: "修改成功"
                    });
                    this.$router.go(-1);
                    // this.closedata();
                  }
                });
            } else {
              this.$api.dailyWork_sysConfig
                .createLink(this.formData)
                .then(res => {
                  if (res.code == "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: "保存成功"
                    });
                    this.$router.go(-1);
                    // this.closedata();
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
      });
    },
    editorData() {
      this.ifSave = false;
      this.initData();
    },
    resavedata() {
      this.$refs.mform.validate().then(res => {
        if (res) {
          let reg = /^[0-9]+[0-9]*]*$/;
          if (reg.test(this.formData.hyDnr)) {
            //链接地址 前加http://
            this.checkAddress();
            if (this.$route.query.linkData && this.$route.query.linkData.id) {
              this.$api.dailyWork_sysConfig
                .alterLink(this.formData)
                .then(res => {
                  if (res.code == "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: "修改成功"
                    });
                    this.$route.query.linkData = {};
                    this.$route.query.linkData.id = "";
                    this.formData = {};
                    this.ifSave = false;
                    this.loadData();
                    this.initData();
                  }
                });
            } else {
              this.$api.dailyWork_sysConfig
                .createLink(this.formData)
                .then(res => {
                  if (res.code == "SUCCESS") {
                    this.$message({
                      type: "success",
                      message: "保存成功"
                    });
                    this.formData = {};
                    this.ifSave = false;
                    this.loadData();
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
      });
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
