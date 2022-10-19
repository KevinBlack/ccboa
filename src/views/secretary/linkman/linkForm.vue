<!--
 * @Author: wy
 * @Date: 2020-10-11 16:15:02
 * @LastEditTime: 2020-10-15 14:50:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\secretary\linkman\linkForm.vue
--> 
<template>
  <div class="linkForm">
    <div class="handleButton">
      <el-button type="primary" @click="shutDown">关闭</el-button>
      <el-button type="primary" @click="submitWokr" v-if="submitBtn">提交</el-button>
      <el-button type="primary" @click="edit">{{editButtonText ? "编辑" : "保存"}}</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">联系人报送单</div>
      <div>
        <div class="orgInfoTableBody">
          <m-form
            ref="mForm"
            :formCfg="formCfg"
            :formRules="formRules"
            :formData="formData"
            :showButton="false"
            :isAllDisabled="isAllDisabled"
            labelWidth="180px"
          >
            <el-col :span="20" v-if="hiddenForm">
              <el-form-item>
                <el-input v-model="formData.openFlag"></el-input>
              </el-form-item>
            </el-col>
          </m-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import mForm from "components/form/mForm";
export default {
  name: "linkForm",
  components: {
    mForm
  },
  data() {
    return {
      submitBtn: true, //岗位隐藏提交按钮
      hiddenForm: false, //区别保存提交 字段隐藏
      editButtonText: false,
      isDisabled: true,
      isAllDisabled: false,
      formCfg: [
        {
          label: "报送人",
          prop: "sendPle",
          type: "input"
        },
        {
          label: "报送人部门",
          prop: "sendDept",
          type: "input",
          disabled: true
        },
        {
          label: "报送人单位",
          prop: "sendUnit",
          type: "input",
          disabled: true
        },
        {
          label: "报送人姓名",
          prop: "contactPersonName",
          type: "input"
        },
        {
          label: "报送人职务",
          prop: "contactPersonJob",
          type: "input"
        },
        {
          label: "报送人手机",
          prop: "contactPersonPhone",
          type: "input"
        },
        {
          label: "报送人办公电话",
          prop: "contactPersonTel",
          type: "input"
        },
        {
          label: "报送人邮箱",
          prop: "contactPersonMail",
          type: "input"
        }
      ],
      formRules: {
        sendPle: [{ required: true, message: "不能为空", trigger: "blur" }],
        sendDept: [{ required: true, message: "不能为空", trigger: "blur" }],
        sendUnit: [{ required: true, message: "不能为空", trigger: "blur" }],
        contactPersonName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        contactPersonJob: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        contactPersonPhone: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,
            message: "请输入正确手机号",
            trigger: "blur"
          }
        ],
        contactPersonTel: [
          { required: true, message: "不能为空", trigger: "blur" }
          // {
          //   pattern: /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,
          //   message: "请输入正确办公号",
          //   trigger: "blur"
          // }
        ],
        contactPersonMail: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "请输入正确邮箱",
            trigger: "blur"
          }
        ]
      },
      formData: {
        sendPle: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        sendDept: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitName
          : "",
        sendUnit: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitName
          : "",
        contactPersonName: "",
        contactPersonJob: "",
        contactPersonPhone: "",
        contactPersonTel: "",
        contactPersonTel: "",
        contactPersonMail: ""
      }
    };
  },
  methods: {
    edit() {
      if (this.editButtonText) {
        //编辑
        this.isAllDisabled = false;
        this.editButtonText = false;
      } else {
        //保存
        this.$refs.mForm.validate().then(valid => {
          if (valid) {
            this.formData.openFlag = "1"; //区分保存操作
            if (this.$route.query.id) {
              this.$api.secreatary.linkMan
                .updateLinkMan({ ...this.formData })
                .then(res => {
                  this.formData.id = res.data;
                  this.isAllDisabled = true;
                  this.editButtonText = true;
                  this.$message({ type: "success", message: "保存成功！" });
                });
            } else {
              this.$api.secreatary.linkMan
                .addLinkMan({ ...this.formData })
                .then(res => {
                  this.formData.id = res.data;
                  this.isAllDisabled = true;
                  this.editButtonText = true;
                  this.$intent.replace(this, {
                    path: "/secretary/linkman/LookLinkMan",
                    query: { id: this.id }
                  });
                  this.$message({ type: "success", message: "保存成功！" });
                });
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写必填项"
            });
          }
        });
      }
    },
    //关闭
    shutDown() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.edit();
            this.guanbi(); //跳转主页面调用关闭
            // this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            this.guanbi(); //跳转主页面调用关闭
            // this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
      // this.$confirm("关闭前是否保存?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.edit(); //调用保存
      //     this.guanbi(); //跳转主页面调用关闭
      //   })
      //   .catch(() => {
      //     this.guanbi(); //跳转主页面调用关闭
      //   });
    },
    //直接进行跳转的关闭
    guanbi() {
      if (this.$route.query.type == "query") {
        this.$router.push({ path: "/secretary/linkman/queryLinkMan" });
      } else {
        this.$router.push({ path: "/secretary/linkman/LookLinkMan" });
      }
    },
    //提交
    submitWokr() {
      this.$refs.mForm.validate().then(valid => {
        if (valid) {
          this.formData.openFlag = "2"; //区分保存操作
          if (this.$route.query.id) {
            this.$api.secreatary.linkMan
              .updatesubmitLinkMan({ ...this.formData })
              .then(res => {
                this.isAllDisabled = true;
                this.editButtonText = true;
                this.$message({ type: "success", message: "提交成功！" });
                this.guanbi(); //提交后跳转主页面调用关闭
              });
          } else {
            this.$api.secreatary.linkMan
              .submitLinkMan({ ...this.formData })
              .then(res => {
                this.isAllDisabled = true;
                this.editButtonText = true;
                this.$message({ type: "success", message: "提交成功！" });
                this.guanbi(); //提交后跳转主页面调用关闭
              });
          }
        }
      });
    },
    //行领导秘书岗且是总行的隐藏提交按钮
    getAdduser() {
      let stepJudge = JSON.parse(localStorage.getItem("tcHumanRole"));
      stepJudge.map(node => {
        if (
          node.dicId == "343" &&
          JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"
        ) {
          this.submitBtn = false;
        }
      });
    }
  },
  mounted() {},
  created() {
    this.getAdduser();
    if (this.$route.query.id) {
      this.$api.duty
        .linkmanDataQuery({ id: this.$route.query.id })
        .then(res => {
          this.formData = res.data;
          this.isAllDisabled = true;
          this.editButtonText = true;
        });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.linkForm {
  min-height: 100vh;
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
