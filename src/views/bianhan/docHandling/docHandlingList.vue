
<template>
  <div class="selectDept">
    <el-tabs v-model="activeName" @tab-click="handelClick">
      <el-tab-pane label="全部">
        <div style="margin-left: 30px;">
          <el-form
            label-position="right"
            class="formData"
            label-width="80px"
            :model="formData"
            ref="formData"
          >
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
                <el-form-item label="开始时间" prop="createStartDate">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="formData.createStartDate"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="截止时间" prop="createEndDate">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="formData.createEndDate"
                    placeholder="选择日期"
                   value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="文号" prop="fileCode">
                  <el-input v-model="formData.fileCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文件标题" prop="title">
                  <el-input v-model="formData.title"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="loadD">搜索</el-button>
            <el-button type="primary" @click="onClear">清空</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待办"></el-tab-pane>
      <el-tab-pane label="已办"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
    </el-tabs>

    <mTable
      style="margin-top: 30px;"
      ref="PersonTable"
      @refresh="loadD"
      :isSelection="true"
      @select="selectRow"
      @cellClick="cellClick"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :tableRowClassNames="tableRowClassName"
    ></mTable>
  </div>
</template>

<script>
import mTable from "components/table/tTable";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  name: "docHandlingList",
  components: {
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      swidthFlag: false,
      selectedRowId: "",
      btnType: "0",
      formData: {
        createStartDate: "",
        createEndDate: "",
        title: "",
        hqDept: "",
        numYear: "",
        numYearLabel: "近两年",
        fileCode:''
      },
      yearList: [],
      activeName: "1",
      searchData: {},
      tableCols: [
        { label: "日期", prop: "createDate", width: 200 },
        { label: "编号", prop: "documentNo", width: 200 },
        { label: "文件标题", prop: "title" },
        { label: "来文单位", prop: "fromDept", width: 200 },
        { label: "当前环节", prop: "currentNode", width: 100 },
        { label: "操作人", prop: "currentUser", width: 100 }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      tableData: []
    };
  },
  created() {
    //获取编号年份用于分表
    this.getNumYearListCommon().then(res => {
      this.yearList = res;
    });
    this.loadD();
  },
  methods: {
    selectYear(val) {
      this.formData.numYear = val.value;
      this.formData.numYearLabel = val.label;
    },
    //加载列表数据
    loadD() {
      const _this = this;

      if (_this.searchData.sortKey === "createDate") {
        this.searchData.sortKey = "remark1";
      }
      let data = {
        btnType: _this.btnType,
        ..._this.formData,
        ..._this.searchData,
        createStartDate:this.formData.createStartDate?this.formData.createStartDate+' 00:00:00':'',
        createEndDate:this.formData.createEndDate?this.formData.createEndDate+' 23:59:59':''
      };

      // let createStartDate = _this.formData.createStartDate;
      // let createEndDate = _this.formData.createEndDate;
      // _this.formData.createStartDate = createStartDate
      //   ? createStartDate.getFullYear() +
      //     "-" +
      //     (createStartDate.getMonth() + 1) +
      //     "-" +
      //     createStartDate.getDate()
      //   : "";
      // _this.formData.createEndDate = createEndDate
      //   ? createEndDate.getFullYear() +
      //     "-" +
      //     (createEndDate.getMonth() + 1) +
      //     "-" +
      //     createEndDate.getDate()
      //   : "";
      apis
        .docHandlingList(data, {
          PAGE_JUMP: _this.pagination.pageNum,
          REC_IN_PAGE: _this.pagination.pageSize
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.pagination.total = res.total;
            this.tableData = res.data;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击行进详情
    cellClick(row) {
      let type = "";
      // if (!this.swidthFlag) {
      //   type = ''
      // }
      if (this.btnType === "3") {
        type = row.btnType;
      } else {
        type = this.btnType;
      }
      // this.$intent.goNewPage(this, {
      //   name: "docDetail",
      //   query: { identify: type, id: row.id }
      // });
      this.hasOpened(row.id, {
        name: "docDetail",
        query: {
          id: row.id,
          identify: type,
          numyear: this.formData.numYear
        }
      });
    },
    //选择选项框
    selectRow(data) {
      console.log("xuanzhonghang-----", data);
      const len = data.length;
      const selectedRowId = [];
      for (let i = 0; i < len; i++) {
        selectedRowId.push(data[i].id);
      }
      this.selectedRowId = selectedRowId.join(",");
      console.log("this.selectedRowId-----", this.selectedRowId);
    },
    tableRowClassName(row) {
      console.log(this.btnType);

      if (row.isReadFlag == "0" && this.btnType == "0") {
        return "warning-row";
      }
    },
    onLoad() {},
    //tab也签切换
    handelClick(tab) {
      this.swidthFlag = true;
      switch (tab.index) {
        case "1":
          this.pagination = {
            pageNum: 1,
            pageSize: 20
          };
          this.btnType = "0";
          this.loadD();
          break;
        case "2":
          this.pagination = {
            pageNum: 1,
            pageSize: 20
          };
          this.btnType = "1";
          this.loadD();
          break;
        case "3":
          this.pagination = {
            pageNum: 1,
            pageSize: 20
          };
          this.btnType = "2";
          this.loadD();
          break;
        default:
          this.pagination = {
            pageNum: 1,
            pageSize: 20
          };
          this.btnType = "3";
          this.loadD();
          break;
      }
      if (tab.index === "3") {
        this.tableCols = [
          { label: "日期", prop: "createDate", width: 200 },
          { label: "编号", prop: "documentNo", width: 200 },
          { label: "文件标题", prop: "title" },
          { label: "来文单位", prop: "fromDept", width: 200 }
        ];
      } else {
        this.tableCols = [
          { label: "日期", prop: "createDate", width: 200 },
          { label: "编号", prop: "documentNo", width: 200 },
          { label: "文件标题", prop: "title" },
          { label: "来文单位", prop: "fromDept", width: 200 },
          { label: "当前环节", prop: "currentNode", width: 100 },
          { label: "操作人", prop: "currentUser", width: 100 }
        ];
      }
    },
    onClear() {
      this.$refs.formData.resetFields();
      this.formData.numYearLabel='近两年'
      console.log(this.$refs.formData);
      console.log(11);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.btn {
  margin-left: 500px;
}
</style>
