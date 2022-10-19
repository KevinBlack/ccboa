<template>
  <div class="selectDept">
    <el-form label-width="80px" :model="formData" :rules="rules" ref="formrule">
      <el-row>
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
        <el-col :span="8">
          <el-form-item label="编号年份" prop="numYear">
            <el-select
              v-model="formData.numYear"
              style="width: 100%;"
            >
              <el-option
                v-for="(yearItem, index) in yearList"
                :key="index"
                :label="yearItem.label" :value="yearItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通话单位" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通话内容" prop="callContent">
            <el-input v-model="formData.callContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来电人员" prop="callPle">
            <el-input v-model="formData.callPle"></el-input>
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
    <mTable style="margin-top: 20px;" ref="PersonTable" @refresh="loadD" :isSelection="true" @select="selectRow"
      @cellClick="cellClick" :searchData="searchData" :tableData="tableData" :tableCols="tableCols"
      :pagination="pagination" :pageSizeList="[20, 30, 50, 100, 200, 500]"></mTable>
  </div>
</template>

<script>
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
        yearList: [], // 编号年份列表
        formData: {
          btnType: 1,
          tableType: 1,
          callContent: "",
          callPle: "",
          title: "",
          numYear: '',
        },
        searchNumYear: '',
        pagination: {
          pageNum: 1,
          pageSize: 20
        },
        rules: {
          btnType: [{
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }],
          tableType: [{
            required: true,
            message: "请选择表单类型",
            trigger: "blur"
          }]
        },
        tableCols: [
          // { label: "序号", prop:"documentNo" },
          {
            label: "编号",
            prop: "documentNo"
          },
          {
            label: "来电日期",
            prop: "createDate"
          },
          {
            label: "办理部门",
            prop: "hqDept"
          }
        ],
        tableData: [],
        searchData: {}
      };
    },
    created () {
      this.getNumYearList()
    },
    methods: {
      getNumYearList() {
        return new Promise((resolve, reject) => {
          this.$api.numYear.getNumYearList().then(res => {
            if (res.code === 'SUCCESS') {
              let yearList = getNumYear_2(res.data)
              this.yearList = [{label: '近两年', value: ''}, ...yearList]
              resolve()
            } else {
              this.yearList = [{label: '近两年', value: ''}]
              reject()
            }
          });
        });
      },
      selectRow() {},
      cellClick(row) {
        if (this.formData.tableType == "1") {
          this.hasOpened(row.id, {
            'name': "handleDetail",
            'query': {
              'id': row.id,
              'identify': row.btnType,
              numYear: this.searchNumYear
            }
          })
        } else if (this.formData.tableType == "0") {
          this.hasOpened(row.id, {
            path: "/bianhan/phoneForm/detail",
            'query': {
              'id': row.id,
              'identify': row.btnType,
              numYear: this.searchNumYear
            }
          })
        }
      },
      loadD() {
        const _this = this;
        if (this.searchData.sortKey === "createDate") {
          _this.searchData.sortKey = "remark1";
        }
        apis
          .conditionSearch({
            ..._this.formData,
            ..._this.searchData
          }, {
            PAGE_JUMP: _this.pagination.pageNum,
            REC_IN_PAGE: _this.pagination.pageSize
          })
          .then(res => {
            if (res.code === "SUCCESS") {
              this.searchNumYear = _this.formData.numYear
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
          if (valid) {} else {
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
