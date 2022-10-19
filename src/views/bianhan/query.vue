
<template>
  <div class="selectDept">
    <el-form label-width="80px" :model="formData" :rules="rules" ref="formrule">
      <el-row>
        <el-col :span="8">
          <el-form-item label="编号年份" prop="numYear">
            <el-select
              v-model="formData.numYearLabel"
              @change="selectYear"
              placeholder="近两年"
              style="width: 100%;"
            >
              <el-option
                v-for="yearItem in yearList"
                :key="yearItem.lavel"
                :label="yearItem.label"
                :value="yearItem"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="btnType">
            <el-radio-group v-model="formData.btnType">
              <el-radio :label="3">全部</el-radio>
              <el-radio :label="1">流转</el-radio>
              <el-radio :label="2">办结</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="表单类型" prop="tableType">
            <el-radio-group v-model="formData.tableType">
              <el-radio :label="1">会签单</el-radio>
              <el-radio :label="0">非会签单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="办理部门" prop="hqDept">
            <el-input v-model="formData.hqDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来文单位" prop="fromDept">
            <el-input v-model="formData.fromDept"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文号" prop="fileCode">
            <el-input v-model="formData.fileCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="文件标题" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
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
  会签单: "1",
  非会签单: "0"
};
import mTable from "components/table/tTable";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  components: {
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      formData: {
        btnType: 1,
        tableType: 0,
        hqDept: "",
        fromDept: "",
        fileCode: "",
        title: "",
        numYear: "",
        numYearLabel: "近两年"
      },
      yearList: [],
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
        { label: "日期", prop: "createDate", width: 200 },
        { label: "编号", prop: "documentNo", width: 200 },

        { label: "文件标题", prop: "title" },
        { label: "文号", prop: "fileCode", width: 200 },
        { label: "办理部门", prop: "hqDept", width: 200 }
      ],
      tableData: [],
      searchData: {}
    };
  },
  created() {
    //获取编号年份用于分表
    this.getNumYearListCommon().then(res => {
      this.yearList = res;
    });
  },
  methods: {
        selectYear(val) {
      this.formData.numYear = val.value;
      this.formData.numYearLabel = val.label;
    },
    selectRow() {},
    cellClick(row) {
      if (this.formData.tableType == "1") {
        // this.$intent.goNewPage(this, {
        //   path: "/bianhan/docHandling/docDetail",
        //   query: { identify: row.btnType, id: row.id }
        // });
        this.hasOpened(row.id, {
          name: "docDetail",
          query: {
            id: row.id,
            identify: row.btnType,
            numyear:this.formData.numYear
          }
        });
      } else if (this.formData.tableType == "0") {
        // this.$intent.goNewPage(this, {
        //   path: "/bianhan/detail",
        //   query: { identify: row.btnType, id: row.id }
        // });
        this.hasOpened(row.id, {
          name: "detail",
          query: {
            id: row.id,
            identify: row.btnType,
            numyear:this.formData.numYear
          }
        });
      }
    },
    loadD() {
      if (this.searchData.sortKey === "createDate") {
        this.searchData.sortKey = "remark1";
      }
      this.formData = {
        ...this.formData,
        ...this.searchData
      };
      apis
        .fileConditionSearch(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.pagination.total = res.total;
            this.tableData = res.data;
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
      this.formData.numYearLabel='近两年'
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
  