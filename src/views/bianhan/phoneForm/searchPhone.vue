
<template>
  <div class="selectDept">
    <el-form label-width="80px" :model="formData" :rules="rules" ref="formrule">
      <el-form-item label="状态" prop="btnType">
        <el-radio-group v-model="formData.btnType">
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="1">流转</el-radio>
          <el-radio :label="2">办结</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表单类型" prop="tableType">
        <el-radio-group v-model="formData.tableType">
          <el-radio name="ident" value="1" :label="1">会签单</el-radio>
          <el-radio name="ident" value="0" :label="0">非会签单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="通话单位" prop="fromDept">
        <el-input v-model="formData.fromDept"></el-input>
      </el-form-item>
      <el-form-item label="通话内容" prop="fileCode">
        <el-input v-model="formData.fileCode"></el-input>
      </el-form-item>
      <el-form-item label="来电人员" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="loadD">开始搜索</el-button>
      <el-button type="primary" @click="reset('formrule')">重置</el-button>
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
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></mTable>
  </div>
</template>
  
  <script >
import mTable from "components/table/tTable";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/phonenote.js";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  components: {
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      formData: {
        btnType: "1",
        tableType: "1",
        hqDept: "",
        fromDept: "",
        fileCode: "",
        title: ""
      },
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      rules: {
        btnType: [{ required: true, message: "请选择状态", trigger: "blur" }],
        tableType: [
          { required: true, message: "请选择表单类型", trigger: "blur" }
        ]
      },
      tableCols: [
        { label: "序号", prop: "documentNo" },
        { label: "编号", prop: "createDate" },
        { label: "来电日期", prop: "title" },
        { label: "办理部门", prop: "hqDept" }
      ],
      tableData: []
    };
  },
  methods: {
    selectRow() {},
    cellClick(row) {
      if (this.formData.tableType == "1") {
        // this.$intent.goNewPage(this, {
        //   path: "/bianhan/phoneForm/handleDetail",
        //   query: { identify: row.btnType, id: row.id }
        // });
        this.hasOpened(row.id, {
                'name': "handleDetail",
                'query': {
                  'id': row.id,
                  'identify': row.btnType
                }
              })
      } else if (this.formData.tableType == "0") {
        // this.$intent.goNewPage(this, {
        //   path: "/bianhan/phoneForm/detail",
        //   query: { identify: row.btnType, id: row.id }
        // });
        this.hasOpened(row.id, {
                'name': "detail",
                'query': {
                  'id': row.id,
                  'identify': row.btnType
                }
              })
      }
    },
    loadD() {
      apis
        .conditionSearch(this.formData, {
          PAGE_JUMP: _this.pagination.pageNum,
          REC_IN_PAGE: _this.pagination.pageSize
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.tableData = res.data;
            this.pagination.total = res.total;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "加载数据失败",
            duration: 1000
          });
        });
    },
    derive() {
      exportTable.exportExcel("表单");
    },
    onLoad(rulesform) {
      this.$refs[rulesform].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    reset(formName) {
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
  