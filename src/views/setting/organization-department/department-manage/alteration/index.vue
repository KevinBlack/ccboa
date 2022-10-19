<!--
 * @Author: zj
 * @Date: 2020-07-01 10:55:04
 * @LastEditTime: 2020-12-29 14:21:34
 * @LastEditors: Please set LastEditors
 * @Description: 部门管理>部门变更
 * @FilePath: \ccboa\src\views\setting\organization-department\department-manage\alteration\index.vue
-->
<template>
  <div class="departAlter">
    <div class="orgInfoTable">
      <!-- <el-button type="primary" @click="toSave()">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>-->
      <div class="orgInfoTitle">部门变更管理</div>

      <div class="orgInfoTableBody">
        <el-radio-group class="top" v-model="labelPosition">
          <el-radio label="gaiM">改名</el-radio>
          <el-radio label="heB">合并</el-radio>
          <el-radio label="qianY">迁移</el-radio>
          <el-radio label="shanCH">删除</el-radio>
          <!-- <el-radio label="paiX">排序</el-radio> -->
        </el-radio-group>

        <!-- 改名 -->
        <el-form
          label-width="150px"
          v-if="this.labelPosition=='gaiM'"
          :model="formLabelAlign"
          :rules="rules"
          ref="updataFrom"
        >
          <el-form-item label="请选择部门" prop="name">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
            <el-button type="primary" @click="choiceDept(0)">选择</el-button>
          </el-form-item>
          <el-form-item label="请输入新的部门简称" prop="unitShort">
            <el-input v-model="formLabelAlign.unitShort"></el-input>
          </el-form-item>
          <el-form-item label="请输入新的部门全称" prop="unitName">
            <el-input v-model="formLabelAlign.unitName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updataDept">更改</el-button>
          </el-form-item>
        </el-form>

        <!-- 合并 -->
        <el-form label-width="150px" v-if="this.labelPosition=='heB'" :model="formMerge">
          <el-form-item label="被合并部门(From)">
            <el-input v-model="formMerge.fromUnitName"></el-input>
            <el-button type="primary" @click="choiceDept(1)">选择</el-button>
          </el-form-item>
          <el-form-item label="接受部门(To)">
            <el-input v-model="formMerge.toUnitName"></el-input>
            <el-button type="primary" @click="choiceDept(2)">选择</el-button>
          </el-form-item>
          <p class="text1">备注：被合并对象包括本部门成员，下级部门成员</p>
          <el-button type="primary" class="btn1" @click="mergeDept">合并</el-button>
        </el-form>
        <!-- 迁移 -->
        <el-form label-width="150px" v-if="this.labelPosition=='qianY'" :model="formMigration">
          <el-form-item label="被迁移部门(From)">
            <el-input v-model="formMigration.fromUnitName"></el-input>
            <el-button type="primary" @click="choiceDept(3)">选择</el-button>
          </el-form-item>
          <el-form-item label="接受部门(To)">
            <el-input v-model="formMigration.toUnitName"></el-input>
            <el-button type="primary" @click="choiceDept(4)">选择</el-button>
          </el-form-item>
          <p class="text1">备注：被迁移对象包括本部门成员，下级部门成员</p>
          <el-button type="primary" class="btn1" @click="migrationDept">迁移</el-button>
        </el-form>

        <!-- 删除 -->
        <el-form label-width="100px" v-if="this.labelPosition=='shanCH'" :model="formDel">
          <el-form-item label="请选择部门">
            <el-input v-model="formDel.name"></el-input>
            <el-button type="primary" @click="choiceDept(5)">选择</el-button>
          </el-form-item>
          <p class="text1">备注：被删除的部门不能包含下级部门</p>
          <el-button type="primary" class="btn1" @click="delDept">删除</el-button>
        </el-form>
        <!-- 排序 -->
        <!-- <el-form label-width="100px" v-if="this.labelPosition=='paiX'">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="部门序号" width="120"></el-table-column>
            <el-table-column prop="name" label="部门名称" width="120"></el-table-column>
            <el-table-column prop="address" label="部门ID" width="120"></el-table-column>
            <el-table-column prop="cen" label="部门层次" width="120"></el-table-column>
          </el-table>
        </el-form>-->
      </div>
    </div>
    <org-tree
      v-model="showOrgTree"
      title="选择部门"
      :orgOrDept="2"
      :orgOrDeptId="orgOrDeptId"
      :isSingle="true"
      :seletSelf="1"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from "components/tree/shiwuOrgTree";
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "components/table/tTable";

export default {
  name: "depManageAltera",
  components: {
    orgTree,
    // FdForm,
    // mTable
  },
  props: {},
  data () {
    return {
      rules: {
        name: [{ required: true, message: "请选择部门", trigger: "blur" }],
        // unitShort: [
        //   { required: true, message: "请输入新的部门名称", trigger: "blur" },
        // ],
      },
      type: "",
      showOrgTree: false,
      title: "选择部门",
      isSingle: true,
      orgOrDeptId: JSON.parse(localStorage.getItem('userInfo')).unitId,
      formMerge: {},
      formMigration: {},
      formDel: {},
      labelPosition: "gaiM",
      formLabelAlign: {
        fromUnitCode: "",
        toUnitCode: "",
      },
      tableData: [],
      multipleSelection: [],
      // selectDept: {},
    };
  },
  computed: {},
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    saveOrgIndexInfo () {
      this.$router.push({
        name: "departDetail",
      });
    },
    choiceDept (type) {
      this.type = type;
      this.showOrgTree = true;
    },
    getOrgList (org) {
      // this.selectDept = org;
      console.log(org, this.type, typeof org);
      switch (this.type) {
        case 0:
          this.$set(this.formLabelAlign, "name", org.unitName);
          this.formLabelAlign.unitCode = org.id;
          break;
        case 1:
          this.$set(this.formMerge, "fromUnitName", org.unitName);
          this.formMerge.fromUnitCode = org.id;
          break;
        case 2:
          this.$set(this.formMerge, "toUnitName", org.unitName);
          this.formMerge.toUnitCode = org.id;
          break;
        case 3:
          this.$set(this.formMigration, "fromUnitName", org.unitName);
          this.formMigration.fromUnitCode = org.id;
          break;
        case 4:
          this.$set(this.formMigration, "toUnitName", org.unitName);
          this.formMigration.toUnitCode = org.id;
          break;
        case 5:
          this.$set(this.formDel, "name", org.unitName);
          this.formMigration.unitCode = org.id;
          this.formDel.unitCode = org.id;
          break;
      }
    },
    //更改部门
    updataDept () {
      this.$refs.updataFrom.validate((valid) => {
        if (valid) {
          if (!this.formLabelAlign.unitName && !this.formLabelAlign.unitShort) {
            this.$message({ type: "success", message: "新的部门简称或全称中至少填写一项" });
          } else {
            this.formLabelAlign.operateType = 2;
            this.$api.setting.organization
              .sendDeparentConfig(this.formLabelAlign)
              .then((res) => {
                this.$message({ type: "success", message: "更改成功" });
              });
          }


        }
      });
    },
    //合并部门
    mergeDept () {
      this.$api.setting.organization.getMerge(this.formMerge).then((res) => {
        this.$message({ type: "success", message: "合并成功" });
        this.$router.back()
      });
    },
    //迁移
    migrationDept () {
      this.$api.setting.organization.getMove(this.formMigration).then((res) => {
        this.$message({ type: "success", message: "迁移成功" });
        this.$router.back()
      });
    },
    //删除
    delDept () {
      // console.log("---")
      // this.formLabelAlign.operateType = 3;
      // this.$api.setting.organization
      //   .sendDeparentConfig(this.formDel)
      //   .then((res) => {
      //     this.$message({ type: "success", message: "删除成功" });
      //     this.$router.back();
      //   });
      //console.log(this.formDel);
      this.formDel.validFlag = 0;
      this.$api.setting.organization
        .sendDeparentConfig(this.formDel)
        .then((res) => {
          this.$message({ type: "success", message: "删除成功" });
          this.$router.back()
        });
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.departAlter {
  .top {
    margin-bottom: 20px;
  }

  .el-input {
    width: 50%;
    margin-right: 10px;
  }

  min-height: 600px;

  .orgInfoTable {
    padding: 0px 70px;

    .orgInfoTitle {
      margin-bottom: 40px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }

    .orgInfoTableBody {
      margin-left: 8%;
    }

    .text1 {
      color: red;
      font-size: 14px;
      margin-left: 97px;
    }

    // .btn1 {
    //   margin-top: 20px;
    //   margin-left: 248px;
    // }
  }
}
</style>
