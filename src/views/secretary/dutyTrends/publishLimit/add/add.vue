<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>发布范围配置</span>
      </div>
      <div class="right">
        <el-button
          v-if="btnType !== 'edit'"
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="save_btn"
        >保存</el-button>
        <el-button
          v-else
          class="bank_grid_comtent_active"
          style="margin-left:20px;"
          size="mini"
          plain
          @click="edit_btn"
        >编辑</el-button>
        <el-button
          style="margin-left:20px;"
          class="bank_grid_comtent_active"
          size="mini"
          plain
          @click="close_btn"
        >关闭</el-button>
      </div>
    </div>
    <div class="addHeader">
      <div class="title-text">发布范围配置</div>
    </div>
    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="机构名称" prop="orgName">
          <el-input class="left" v-model="formData.orgName" :disabled="true" style="width:640px"></el-input>
          <el-button class="right" @click="selectOrg" type="primary" size="medium">选择机构</el-button>
        </el-form-item>
        <el-form-item label="发布范围">
          <el-tree
            ref="elTree"
            v-model="formData.sendObject"
            :data="publishLimitData"
            :show-checkbox="true"
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="defaultCheckedKeys"
            @check="checkTree"
          ></el-tree>
        </el-form-item>
        <div style="height:300px"></div>
      </el-form>
    </div>
    <!-- @description: 选择机构树  -->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="unitClass"
      :orgOrDeptId="unitCode"
      :seletSelf="seletSelf"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script>
import orgTree from "components/tree/orgTree";

export default {
  name: "add",
  components: { orgTree },
  data() {
    return {
      saveType: "save",
      defaultCheckedKeys: [],
      publishLimitData: [],
      formData: {
        orgId: "",
        orgName: ""
      },
      btnType: "",
      /** @description:  */
      title: "选择机构",
      seletSelf: 1,
      showOrgTree: false,
      isSingle: true,
      unitClass: 1,
      unitCode: "0",
      /** @description: 发布范围 */
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        orgName: [
          { required: true, message: "请选择机构名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.btnType = this.dataFromQuery("type");
    if (this.btnType === "edit") {
      this.formData = this.dataFromQuery("rowData");
      this.formData.orgName = this.formData.draftOrgan;
      this.formData.orgId = this.formData.draftOrganId;
      this.formData.sendObject = JSON.parse(this.formData.sendObject || "[]");
      this.defaultCheckedKeys = this.formData.sendObject.map(item => item.id);
    } else {
      this.formData = {
        sendObject: [],
        orgId: this.currentUserInfo.unitId,
        orgName: this.currentUserInfo.unitName
      };
    }
    this.loadNode();
  },
  computed: {},
  mounted() {},
  methods: {
    /** @description:  */
    checkTree(value1, value2) {
      console.log("value1", value1, "value2", value2);
      this.formData.sendObject = value2.checkedNodes;
    },
    /** @description: 机构名称 */
    selectOrgName(org) {
      this.$set(this.formData, "orgName", org.unitName);
      this.$set(this.formData, "unitCode", org.id);
    },
    /** @description: 选择机构按钮 */
    selectOrg() {
      /** @description: 是保存按钮 */
      if (this.btnType === "edit") {
        return;
      } else {
        this.showOrgTree = true; /** @description: 机构弹窗打开 */
      }
    },
    /** @description: 选择机构按钮方法 */
    getOrgList(org) {
      this.$set(this.formData, "orgName", org.unitName);
      this.$set(this.formData, "orgId", org.id);
      this.loadNode();
    },
    /** @description: 保存按钮 */
    save_btn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          if (this.saveType === "save") {
            this.$api.duty.savePublishLimitAddData(this.formData).then(res => {
              this.$message.success("保存成功");
            });
          } else {
            this.$api.duty.savePublishLimitEditData(this.formData).then(res => {
              this.$message.success("保存成功");
            });
          }
          /** @description: 表单校验通过 */
        }
      });
    },
    /** @description: 编辑按钮 */
    edit_btn() {
      this.btnType = "save";
      this.saveType = "update";
    },
    /** @description: 关闭按钮 */
    close_btn() {
      if (this.btnType !== "edit") {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save_btn();
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
      // this.$confirm("关闭前是否保存?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.save_btn(); /** @description: 调用保存方法 */
      //     // <!-- this.$intent.replace(this, {
      //     //     path: "/secretary/dutyTrends/params/publishLimit",
      //     // }); -->
      //     this.$intent.closeWindow(this);
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //     // this.$intent.replace(this, {
      //     //     path: "/secretary/dutyTrends/params/publishLimit",
      //     // });
      //   });
    },
    /** @description: 接口返回数据 */
    loadNode() {
      this.$api.duty
        .getPublishLimitData({
          unitClass: this.unitClass,
          unitCode: this.formData.orgId
        })
        .then(res => {
          console.log(res, "打印发布范围");
          var publishLimitData = [];
          res.data.forEach(item => {
            var index = 5;
            switch (item.name) {
              case "一级分行":
                index = 0;
                break;
              case "建行大学":
                index = 1;
                break;
              case "境内子公司":
                index = 2;
                break;
              case "总行各部门":
                index = 3;
                break;
              case "所辖行":
                index = 0;
                break;
              case "行各部门":
                index = 1;
                break;
              default:
                break;
            }
            if (index != 5) {
              publishLimitData[index] = item;
            }
          });
          publishLimitData.forEach(element => {
            if (element.children) {
              element.children.forEach(e => {
                e.pid = element.id;
              });
            }
          });
          this.publishLimitData = publishLimitData;
        });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.add {
  background: white;
  margin: 0 auto;
  .headerClick {
    background: #409eff;
    color: white;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    .left {
      margin-left: 20px;
    }
    .right {
      margin-right: 20px;
      float: right;
    }
  }
  .addHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .elementForm {
    width: 80%;
    margin: 0 auto;
    margin-top: 36px;
  }
}
</style>
