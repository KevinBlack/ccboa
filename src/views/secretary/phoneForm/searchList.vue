
<template>
  <div class="selectDept">
    <el-form label-width="80px" :model="formData" :rules="rules" ref="formrule">
      <el-form-item label="状态" prop="select">
        <el-radio-group v-model="formData.select">
          <el-radio label="全部"></el-radio>
          <el-radio label="流转"></el-radio>
          <el-radio label="办结"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表单类型" prop="list">
        <el-radio-group v-model="formData.list">
          <el-radio label="全会签单"></el-radio>
          <el-radio label="非会签单"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="办理部门" prop="unit">
        <el-input v-model="formData.unit"></el-input>
      </el-form-item>
      <el-form-item label="通话单位" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="通话内容" prop="content">
        <el-input v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="来电人员" prop="person">
        <el-input v-model="formData.person"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="onLoad('formrule')">开始搜索</el-button>
      <el-button type="primary" @click="onClear('formrule')">重置</el-button>
    </div>
    <div>
      <el-button type="primary" @click="derive">导出</el-button>
    </div>
    <mTable
      style="margin-top: 20px;"
      ref="PersonTable"
      @refresh="loadD"
      :isSelection="true"
      @select="selectRow"
      @cellClick="cellClick"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></mTable>
  </div>
</template>
  
  <script >
const change = {
  全部: "3",
  流转: "1",
  办结: "2"
};
const bd = {
  全会签单: "1",
  非会签单: "0"
};
import mTable from "components/table/tTable";
import exportTable from "../../../minixs/exportTable";
export default {
  components: {
    mTable
  },
  data() {
    return {
      formData: {
        select: "",
        list: "",
        phone: "",
        person: "",
        content: "",
        unit: ""
      },
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        select: [{ required: true, message: "请选择状态", trigger: "blur" }],
        list: [{ required: true, message: "请选择表单类型", trigger: "blur" }]
      },
      searchData: {
        humanUnitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        frozenStatus: 0,
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        humanUnit: JSON.parse(localStorage.getItem("userInfo")).unitId,
        sleepDeptName: ""
      },
      tableCols: [
        { label: "编号", prop: "documentNo" },
        { label: "来电日期", prop: "createDate" },
        { label: "办理部门", prop: "hqDept" }
      ],
      tableData: []
    };
  },
  methods: {
    selectRow() {},
    cellClick() {},
    loadD() {},
    onLoad(rulesform) {
      this.$refs[rulesform].validate(valid => {
        if (valid) {
          this.$api.duty
            .phoneList(
              {
                tableType: bd[this.formData.list],
                hqDept: this.formData.unit,
                title: this.formData.phone,
                callContent: this.formData.content,
                callPle: this.formData.person,
                btnType: change[this.formData.select]
              },
              {
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize
              }
            )
            .then(res => {
              this.tableData = res.data;
              console.log(this.tableData);
            });
        } else {
          return false;
        }
      });
    },
    derive() {
      exportTable.exportExcel("表单");
    },
    onClear(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
  
  <style scoped lang="less" rel="stylesheet/less">
.el-form-item ::v-deep {
  margin-bottom: 15px;
}
.btn {
  margin-left: 500px;
}
</style>
  