<template>
  <div class="add">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>接收人员配置</span>
      </div>
      <div class="right">
        <el-button
          v-if="!isSave"
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

    <div class="elementForm">
      <el-form ref="addForm" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="机构名称" prop="orgName">
          <el-input
            class="left"
            v-model="formData.orgName"
            :disabled="isRecievePersonDisabled||isOrgDisabled"
            style="width:640px"
          ></el-input>
          <el-button class="right" @click="selectOrg" type="primary" size="medium">选择机构</el-button>
        </el-form-item>
        <el-form-item label="接收人员" prop="receivePerson">
          <el-input
            class="left"
            v-model="formData.receivePerson"
            :disabled="isRecievePersonDisabled||isOrgDisabled"
            style="width:640px"
          ></el-input>
          <el-button class="right" @click="selectPerson" type="primary" size="medium">选择人员</el-button>
        </el-form-item>
        <el-form-item v-if='!isZh'>
            <el-radio v-model="formData.rType" label='1'>接收上级行</el-radio>
            <el-radio v-model="formData.rType" label='0'>接收本行</el-radio>
        </el-form-item v-if='isZh'>
        <el-form-item label="配置说明:">
          <span>配置接收本行发布的值班动态人员</span>
        </el-form-item>
      </el-form>
      <!-- @description: 选择人员树  -->
      <select-person
        :needFirdLoad="needFirdLoad"
        :fromdata="formData"
        :treeData="treeData"
        :loadingTree="true"
        :seletOptionsData="seletOptionsData"
        :offenUse="offenUse"
        :dialogType="dialogType"
        :dialogTypeNow="dialogTypeNow"
        dialogTit="选择共享用户"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        @showCompDialog="showCompDialog"
      />
      <!-- @description: 选择机构树  -->
      <org-tree
        v-model="showOrgTree"
        :title="title"
        :isSingle="isSingle"
        :orgOrDept="orgOrDept"
        :orgOrDeptId="orgOrDeptId"
        @orgList="getOrgList"
      ></org-tree>
    </div>
  </div>
</template>

<script>
import selectPerson from "components/tree/treeTansun";
import orgTree from "components/tree/orgTree";

export default {
  name: "add",
  components: {
    selectPerson,
    orgTree
  },
  created() {
    this.tabsType = this.$route.query.tabsType; /** @description: 新增 */
    /** @description: 如果是点击主列表当前行跳转过来的 */
    if (this.$route.query.type === "save") {
      console.log(this.$route.query.rowData, "shuju");
      this.isSave = true; /** @description: 隐藏保存按钮 */
      this.btnType = "save"; /** @description:  */
      this.formData = JSON.parse(
        this.$route.query.rowData
      ); /** @description: 当前行赋值 */
      this.formData.orgName = this.formData.draftOrgan;
      // this.$set( this.formData,"orgName",this.$route.query.rowData.draftOrgan)
      console.log(this.formData, "zhanhuanshuj ");
    }
    if (this.tabsType === "add") {
      this.isOrgDisabled = true;
    }
    this.singelCheckF = this.formData.id ? true : false; // 新增 多选  修改 单选
  },
  computed: {
    /** @description: 控制输入框是否禁用 */
    isRecievePersonDisabled() {
      return this.btnType === "save" && this.btnType !== "edit";
    }
  },
  data() {
    return {
      isZh:JSON.parse(localStorage.getItem('userInfo')).unitId==='U010000',
      needFirdLoad: true,
      isOrgDisabled: true,
      formData: {rType:'0'} /** @description: 表单的值 */,
      tabsType: "" /** @description: 新增时路由传的参数 */,
      isSave: false /** @description: 默认显示保存按钮 */,
      btnType: "" /** @description: 按钮类型 */,
      rules: {
        orgName: [
          { required: true, message: "请选择机构名称", trigger: "change" }
        ],
        receivePerson: [
          { required: true, message: "请输入接收人员", trigger: "change" }
        ]
      },
      treeData: [],
      seletOptionsData: [],
      offenUse: false,
      checkIds: [] /** @description: 选中id列表 */,
      checkData: [] /** @description: 选中数据 */,
      singelCheckF: false /** @description: 单选true 多选为false */,
      dialogState: false /** @description: 默认隐藏选择人员树结构 */,
      dialogType: "",
      dialogTypeNow: "",
      /** @description:  */
      title: "选择机构",
      showOrgTree: false,
      isSingle: true,
      orgOrDept: 1,
      orgOrDeptId: "0"
    };
  },

  methods: {
    /** @description: 选择机构按钮方法 */
    getOrgList(org) {
      this.$set(this.formData, "wfeUnitId", org.id);
      this.$set(this.formData, "orgName", org.unitName);
      this.$set(this.formData, "orgId", org.id);
      this.$set(
        this.formData,
        "receivePerson",
        ""
      ); /** @description: 清空接收人员值 */
    },
    /** @description: 选择机构按钮 */
    selectOrg() {
      if (this.btnType === "save") {
        /** @description: 是保存按钮 */
        return;
      } else {
        this.showOrgTree = true; /** @description: 机构弹窗打开 */
      }
    },
    /** @description: 保存按钮 */
    save_btn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          /** @description: 表单校验通过 */
          if (this.tabsType === "add") {
            /** @description: 新增保存 */
            this.$api.duty.saveReceivePersonAddData(this.formData).then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.btnType = "save";
              this.isSave = !this.isSave;
              this.isSave = true;
              this.$intent.closeWindow(this);
            });
          } else {
            /** @description: 修改保存 */
            console.log(
              this.formData.receivePersonId,
              " this.formData.receivePersonId"
            );
            this.formData.receivePersonId = this.formData.receivePersonId.substring(
              0,
              this.formData.receivePersonId.indexOf("#")
            );
            console.log(
              this.formData.receivePersonId,
              "this.formData.receivePersonId"
            );
            this.$api.duty
              .saveReceivePersonEditData(this.formData)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.btnType = "save";
                this.isSave = !this.isSave;
                this.isSave = true;
                this.$intent.closeWindow(this);
              });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请填写表单"
          });
        }
      });
    },
    /** @description: 编辑按钮 */
    edit_btn() {
      this.btnType = "edit";
      this.isSave = !this.isSave;
    },
    /** @description: 关闭按钮 */
    close_btn() {
      if (this.isSave == false) {
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
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //     /** @description: this.$message({ */
      //     /** @description: type: 'info', */
      //     /** @description: message: '已取消关闭', */
      //     /** @description: }) */
      //   });
    },
    /** @description: 选择人员按钮 */
    selectPerson() {
      if (this.btnType === "save") {
        /** @description: 是保存按钮 */
        return;
      } else {
        if (this.formData.orgName) {
          /** @description: 机构名称有值 */
          this.dialogState = true; /** @description: 显示选择人树结构 */
        } else {
          this.$message({
            type: "warning",
            message: "请先选择机构"
          });
        }
      }
    },
    /** @description: 选人成功 */
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; /** @description: 关闭选择人员树弹窗 */
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      let receivePersonId = [];
      let selectDataName = [];
      data &&
        data.map(item => {
          receivePersonId.push(
            item.id +
              "_" +
              item.name +
              "_" +
              item.deptId +
              "_" +
              this.formData.orgId +
              "_" +
              this.formData.orgName
          );
          selectDataName.push(item.name);
        });
      this.formData.receivePerson = this.getStrFromListAndSeparator(
        selectDataName
      );
      this.formData.receivePersonId = this.getStrFromListAndSeparator(
        receivePersonId
      );
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
    justify-content: space-between;
    color: white;
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
