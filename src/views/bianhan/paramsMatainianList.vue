
<template>
  <div class="selectDept">
    <div class="btn">
      <el-button type="primary" @click="addNew">新增</el-button>
      <el-button type="primary" @click="del">删除</el-button>
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
      :searchData="searchData"
    ></mTable>
  </div>
</template>

<script >
import mTable from "components/table/tTable";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
export default {
  name: "paramsMatainianList",
  components: {
    mTable
  },
  data() {
    return {
      selected: "",
      formData: {
        btnType: "",
        tableType: "",
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
        { label: "机构名称", prop: "unitName" },
        { label: "机构ID", prop: "unitId" },
        { label: "年度", prop: "yearNo" },
        { label: "起始编号", prop: "initialNo" },
        { label: "当前最大编号", prop: "fileNo" }
      ],
      tableData: [],
      searchData: {}
    };
  },
  created() {
    this.loadD();
  },
  methods: {
    //新增
    addNew() {
      this.$router.push({ name: "paramsMatainianAdd", query: { type: 0 } });
    },
    selectRow(data) {
      console.log("---选择---", data);
      let len = data.length;
      let selectedArr = [];
      for (let i = 0; i < len; i++) {
        selectedArr.push(data[i].id);
      }
      this.selected = selectedArr.join(",");
      console.log("---选中ID---", this.selected);
    },
    cellClick(row) {
      this.$router.push({
        name: "paramsMatainianAdd",
        query: { rowData: row, type: 1 }
      });
    },
    loadD() {
      const data = {
        id: "",
        ...this.searchData
      };
      apis
        .paramsMatainianList(data, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
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
    //删除按钮
    del() {
      const that = this;
      apis
        .paramsMatainianDel({ id: that.selected })
        .then(res => {
          if (res.code === "SUCCESS") {
            that.$message({
              type: "success",
              message: "删除成功！"
            });
            this.loadD();
          }
        })
        .catch(err => {
          that.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "加载数据失败",
            duration: 1000
          });
        });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-form-item ::v-deep {
  margin-bottom: 15px;
}
.btn {
  /* margin-left:px; */
}
</style>
