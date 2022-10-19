<!--
 * @Author: wy
 * @Date: 2020-07-21 11:26:04
 * @LastEditTime: 2020-10-11 16:35:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\addressBook\components\newProj.vue
-->
<template>
  <div class="newProj">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="saveOrgInfo(0)">保存</el-button>
      <el-button type="primary" @click="saveOrgInfo(1)">保存并新建</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">个人通讯录登记</div>
      <div>
        <div class="orgInfoTableBody">
          <m-form
            ref="mForm"
            :formCfg="indexformCfg"
            :formRules="indexformRules"
            :formData="indexformData"
            :showButton="false"
            :isInline="false"
            labelWidth="260px"
          ></m-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from "components/form/mForm";

export default {
  name: "newProj",
  components: {
    mForm
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      const reg = /^[0-9\-]*$/g;
      if (value) {
        if (!reg.test(value)) {
          callback(new Error("请填写正确的联系方式"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const checkMobilePhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/;
      // /^[1-9][0-9]{5}$/
      if (value) {
        if (!reg.test(value)) {
          callback(new Error("请填写正确的联系方式"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const checkYB = (rule, value, callback) => {
      const reg = /^[1-9][0-9]{5}$/;
      if (value) {
        if (!reg.test(value)) {
          callback(new Error("输入邮编有误，请重新输入"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      type: null,
      // 机构索引信息
      indexformCfg: [
        {
          label: "姓名",
          prop: "txlTname",
          type: "input"
        },
        {
          label: "办公电话",
          prop: "txlTbgdh",
          type: "input"
        },
        {
          label: "宅电",
          prop: "txlTzd",
          type: "input"
        },
        {
          label: "手机号码",
          prop: "txlTdh",
          type: "input"
        },
        {
          label: "单位",
          prop: "txlTdwdz",
          type: "input"
        },
        {
          label: "通讯地址",
          prop: "txlTzz",
          type: "input"
        },
        {
          label: "邮政编码",
          prop: "txzTyb",
          type: "input"
        },
        {
          label: "传真号",
          prop: "yxlTcz",
          type: "input"
        },
        {
          label: "E-MAIL地址",
          prop: "txlTem",
          type: "input"
        }
      ],
      indexformRules: {
        txlTname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        txlTem: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        txlTbgdh: [{ validator: checkPhone, trigger: ["blur", "change"] }],
        txlTzd: [{ validator: checkPhone, trigger: ["blur", "change"] }],
        txlTdh: [{ validator: checkMobilePhone, trigger: ["blur", "change"] }],
        txzTyb: [{ validator: checkYB, trigger: "blur" }]
      },
      indexformData: {}
    };
  },
  mounted() {
    // console.log(this.$route.query)
  },
  methods: {
    //关闭
    close() {
      //   this.$confirm('是否保存文档？', {
      //     confirmButtonText: '是',
      //     cancelButtonText: '否',
      //     type: 'warning'
      //   }).then(() => {
      //     this.saveOrgInfo(0, true)
      //   }).catch(() => {
      //     this.$router.push('/dashboard/personalOffice/dailyWork/addressBook')
      //   })
      // if (this.stuType == "2") {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.saveOrgInfo();
              // this.$intent.closeWindow(this);
              
            } else if (action === "cancel") {
              //点否
              // this.$intent.closeWindow(this);
              this.$router.go(-1)
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      // } else {
      //   this.$intent.closeWindow(this);
      // }
    },
    //保存
    saveOrgInfo(type, isjump) {
      this.$refs.mForm.$refs.editForm.validate().then(res => {
        if (res) {
          this.$api.dailyWork
            .addAddressBook(this.indexformData.id ? "A08461473" : "A08461471", {
              addressBook: this.indexformData
            })
            .then(res => {
              if (res.code === "SUCCESS") {
                if (type === 1) {
                  this.indexformData = {};
                } else {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                  if (!this.indexformData.id) {
                    this.indexformData = res.data;
                  }
                  this.$router.go(-1)
                }
                if (isjump) {
                  this.$router.push(
                    "/dashboard/personalOffice/dailyWork/addressBook"
                  );
                }
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            });
        }
      });
    }
  },
  created() {
    if (this.$route.query.type === "edit") {
      this.indexformData = deepClone(JSON.parse(this.$route.query.addressBook));
      this.$route.meta.title = "修改个人通讯录";
    } else {
      this.indexformData = {};
      this.$route.meta.title = "添加个人通讯录";
    }
  },
  mounted() {
    this.type = this.$route.query.type;
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.newProj {
  .orgInfoTable {
    padding: 8px 70px;

    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
    }

    .orgInfoTableBody {
      margin-left: 9%;
    }
  }
}
</style>
