<template>
  <div class="setInfoManager">
    <div class="handleButton">
      <el-button type="primary" @click="closeData">关闭</el-button>
      <el-button type="primary" @click="saveData" v-if="isSave">保存</el-button>
      <el-button type="primary" @click="editorData" v-else>编辑</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">本行信息管理员设置</div>
      <div>
        <div class="orgInfoTableBody">
          <el-form :rules="rules" ref="form" :model="form" label-width="80px">
            <el-form-item label="行名">
              <el-input v-model="form.bankName" :disabled="true" :style="{width:'80%'}">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-input>
            </el-form-item>
            <el-form-item label="管理员" prop="manager">
              <el-input v-model="form.manager" :disabled="true" :style="{width:'70%'}"></el-input>
              <el-button
                type="primary"
                @click="selectTree"
                :style="{marginLeft:'2%'}"
                :disabled="!isSave"
              >选择</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingles"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
    <!-- <select-person
      :treeData="treeData"
      :loadingTree="true"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />-->
  </div>
</template>

<script>
import treePerson from "components/tree/sysTreePerson";

export default {
  name: "setInfoManager",
  components: {
    treePerson
  },
  props: {},
  data() {
    return {
      rules: {
        manager: [{ required: true, message: "请输入管理员", trigger: "blur" }]
      },
      unitClass: 0,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      humanType: 3,
      isSingles: true,
      showOrgPer: false,
      selectDept: [],
      isNeedChild: "yes",
      isSave: true,
      form: {},
      options: [],
      isdialog: false,
      listCode: "",
      btnType: "1",
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      dialogTypeNow: "next",
      treeData: [{ name: "中国建设银行", id: "007" }],
      rowData: {}
    };
  },
  watch: {},

  computed: {},
  methods: {
    queryBank() {
      this.$api.messPub.adminCreateBank({}).then(res => {
        this.$set(this.form, "bankName", res.data.bankName);
        this.form.draftOrganId = res.data.bankId;
      });
    },
    loadData() {
      this.$api.messPub.adminDeal({ id: this.id }).then(res => {
        this.form = res.data;
      });
    },
    closeData() {
      // this.$router.go(-1);
      console.log("isSave",this.isSave)
      if (this.isSave) {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.saveData();
              // this.$intent.closeWindow(this);
              // this.$router.go(-1);
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
        this.$router.go(-1);
      }
    },
    saveData() {
      // if (!this.form.manager) {
      //   return this.$message({
      //     message: "管理员必填",
      //     type: "error"
      //   });
      // }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.id) {
            this.$api.messPub.adminAlter(this.form).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$router.push(
                  "/dashboard/personalOffice/publishInfo/setManageTable"
                );
              }
            });
          } else {
            this.$api.messPub.adminCreate(this.form).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$router.push(
                  "/dashboard/personalOffice/publishInfo/setManageTable"
                );
              }
            });
          }
        } else {
          this.isSave = true;
        }
      });
    },
    editorData() {
      this.isSave = true;
    },
    selectTree() {
      // this.MemCndialogState = true;
      // 数据返显
      this.selectDept = [];
      let tempArr = [];
      let manager = [];
      let managerId = [];
      if (this.form.manager && this.form.manager.length > 0) {
        manager = this.form.manager ? this.form.manager.split(",") : [];
        managerId = this.form.managerId ? this.form.managerId.split(",") : [];

        managerId.forEach((item, index) => {
          let obj = {};
          obj.deptHumanId = item;
          obj.perName = manager[index];
          obj.disabled = true;
          tempArr.push(obj);
        });
        this.selectDept = tempArr;
      }
      this.showOrgPer = true;
    },
    getperList(data) {
      console.log(data, "data");
      // 返现数据
      let managerId = [];
      let manager = [];
      data &&
        data.map(item => {
          managerId.push(item.deptHumanId);
          manager.push(item.perName);
        });
      if (managerId.length > 0) {
        this.$set(this.form, "manager", manager.join(","));
        this.$set(this.form, "managerId", managerId.join(","));
        return;
      }
      console.log(this.form, "this.form");
      this.form.manager = "";
      this.form.managerId = "";
    },
    showCompDialog(data, status, type, params, dtype) {
      debugger;
      this.dialogState = false;
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
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        data &&
          data.map(item => {
            chooseDataName.push(item.name);
            chooseDataId.push(item.idStr);
          });
        this.form.manager = chooseDataName.join(",");
        this.form.managerId = chooseDataId.join(",");
      }
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.isSave = false;
      this.loadData();
    } else {
      this.queryBank();
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.setInfoManager {
  min-height: 100vh;

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
