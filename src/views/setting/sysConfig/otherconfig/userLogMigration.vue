/**
* create by zyt on 2022-7-21 10:40
* 类注释：
* 备注：
*/
<template>
  <div class="content">
    <div class="btn-list">
      <el-row :gutter="20">
        <el-col :span="6">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择机构"
              v-model="searchData.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-button type="primary" @click="toEdit">{{
          isEdit ? "编辑" : "保存"
        }}</el-button>
      </el-row>
    </div>
    <!-- <el-button @click="toEdit">{{isEdit?"编辑":"保存"}}</el-button> -->
    <!-- <fd-form
      :disabled="isEdit"
      style="margin:0 1%"
      :data="applyformData"
      :columns="applyformCfg"
    ></fd-form> -->
    <div class="radio">
      <span style="margin-left: 71px"> 自动注销是否启用 </span>
      <el-radio-group v-model="applyformData[0].switchFlag" :disabled="isEdit">
        <el-radio label="ON"> 是 </el-radio>
        <el-radio label="OFF"> 否 </el-radio>
      </el-radio-group>
    </div>
    <div>
      <span style="margin-left: 15px"> 注销用户数据迁移是否启用 </span>
      <el-radio-group v-model="applyformData[1].switchFlag" :disabled="isEdit">
        <el-radio label="ON"> 是 </el-radio>
        <el-radio label="OFF"> 否 </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import selectOrgOrDept from "components/select/selectOrgUserLog";
export default {
  components: {
    selectOrgOrDept,
  },
  data() {
    return {
      isEdit: true,
      initializing: {},
      applyformData: [
        {
          unitCode: "",
          glxtCode: "GLXT_HUMAN_AUTO_CANCLE",
          switchFlag: "",
        },
        {
          unitCode: "",
          glxtCode: "GLXT_HUMAN_DATA_TRANSFER",
          switchFlag: "",
        },
      ],
      searchData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        unitClass: 0,
      },
    };
  },
  methods: {
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.unitId = org.id;
      this.applyformData.map((item) => {
        return (item.unitCode = org.id);
      });
      this.$delete(this.applyformData, "id");
      // this.$delete(this.applyformData, 'isActivatedWx')
      this.loadData();
    },
    toEdit() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) {
        delete this.applyformData.id;
        this.$api.setSysConfig
          .setUserLogMigrat(this.applyformData[0])
          .then((res) => {
            if (res && res.code == "SUCCESS") {
              this.$api.setSysConfig
                .setUserLogMigrat(this.applyformData[1])
                .then((res) => {
                  if (res && res.code == "SUCCESS") {
                    this.$message({
                      message: "保存成功",
                      type: "success",
                    });
                  }
                });
            }
          });
      }
    },
    loadData() {
      this.initializing.unitCode = this.searchData.unitId;
      // this.initializing.unitName = this.searchData.orgName;
      this.initializing.glxtCode = "";
      this.$api.setSysConfig.getUserLogMigrat(this.initializing).then((res) => {
        if (res && res.data != "") {
          if ((res.data[0].glxtCode = "GLXT_HUMAN_AUTO_CANCLE")) {
            this.applyformData[0].switchFlag = res.data[0].switchFlag || "";
            this.applyformData[1].switchFlag = res.data[1].switchFlag || "";
          } else {
            this.applyformData[1].switchFlag = res.data[0].switchFlag || "";
            this.applyformData[0].switchFlag = res.data[1].switchFlag || "";
          }
        } else {
          this.applyformData.map((item) => {
            return (item.switchFlag = "");
          });
        }
      });
    },
  },
  created() {
    this.applyformData.map((item) => {
      return (item.unitCode = this.searchData.unitId);
    });
    this.loadData();
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
/deep/.el-form-item__label {
  width: 200px !important;
}
/deep/.el-col-24 {
  height: 25px;
}
span {
  font-family: Microsoft Yahei, SimSun, Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 28px;
  text-align: right;
  font-weight: 600;
  vertical-align: baseline;
  margin-right: 5px;
}

.radio {
  margin-top: 8px;
  color: #000;
  font-weight: 400;
}
</style>
