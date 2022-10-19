
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
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
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
      <el-tab-pane label="待办">
        <div>
          <el-button type="primary" @click="addData1">新建</el-button>
          <!-- <el-button type="primary" @click="del">删除</el-button> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="已办"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
    </el-tabs>
    <el-dialog title="请选择部门" :visible.sync="dialogFormVisible">
      <el-form v-model="bank_chosDept" ref="bank_chosDept">
        <el-form-item prop="deptName" style="width:100%">
          <el-select
            v-model="bank_chosDept.deptId"
            placeholder="请选择"
            style="width:100%"
            @change="selectId"
          >
            <el-option
              v-for="item in deptList"
              :key="item.currUnitId"
              :label="item.unitNames"
              :value="item.currUnitId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <mTable
      style="margin-top: 30px;"
      ref="PersonTable"
      @refresh="loadD"
      :isSelection="true"
      @select="selectRow"
      @cellClick="cellClick"
      :tableData="tableData"
      :searchData="searchData"
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
  name: "searchFile",
  components: {
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      swidthFlag: false,
      dialogFormVisible: false,
      bank_chosDept: {
        deptId: ""
      },
      deptList: [],
      selectDept: "",
      formData1: {},
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
      searchData: {},
      activeName: "1",
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
    itemClick(params) {
      switch (params) {
        case "sure":
          break;
        case "cancel":
          break;
      }
    },
    sure() {
      if (!this.bank_chosDept.deptId) {
        return this.$message.error("请选择部门");
      }
      const params = this.deptList.filter(x => {
        return x.currUnitId === this.bank_chosDept.deptId;
      });
      this.dialogFormVisible = false;
      console.log(JSON.stringify(params[0]), "JSON.stringify(params[0])");
      console.log(params, "params");
      this.$intent.goNewPage(this, {
        path: "detail",
        query: {
          identify: "4",
          params: params[0].currUnitId
        }
      });
      this.dialogFormVisible = false;
    },
    cancel() {
      this.$refs.bank_chosDept.resetFields();
      this.dialogFormVisible = false;
    },
    selectId(p) {
      console.log("pppp", p);
      let select = {};
      this.deptList.forEach(item => {
        if (item.humanId == p) {
          select = item;
        }
      });
      this.$forceUpdate();
    },
    //新建
    addData1() {
      apis.getUserPerson({}).then(res => {
        this.deptList = res.result;
        console.log("this.deptList----", this.deptList);
        // if (this.deptList.length == 1) {
        //   this.selectDept = this.deptList[0].unitNames;
        //   this.formData1 = this.deptList[0];
        // } else {
        //   this.selectDept = this.deptList[0].humanId;
        //   let select1 = {};
        //   this.deptList.forEach(item => {
        //     if (item.humanId == this.selectDept) {
        //       select1 = item;
        //     }
        //   });
        //   this.formData1 = select1;
        // }
      });
      this.dialogFormVisible = true;
    },
    //删除按钮
    del() {
      const data = {
        id: this.selectedRowId
      };
      apis.fileListDel(data).then(res => {
        if (res.code === "SUCCESS") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.loadD();
        }
      });
    },
    //新建按钮
    // addNew() {
    //   this.$intent.goNewPage(this, {
    //     name: "detail",
    //     query: { identify: "4" }
    //   });
    // },
    //加载列表数据
    loadD() {
      const _this = this;

      if (_this.searchData.sortKey === "createDate") {
        this.searchData.sortKey = "remark1";
      }
      let data = {
        btnType: _this.btnType,
        ..._this.searchData,
        ..._this.formData
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
        .fileList(data, {
          PAGE_JUMP: _this.pagination.pageNum,
          REC_IN_PAGE: _this.pagination.pageSize
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            _this.pagination.total = res.total;
            _this.tableData = res.data;
          }
          console.log(res);
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
      //   name: "detail",
      //   query: { identify: type, id: row.id }
      // });
      this.hasOpened(row.id, {
        name: "detail",
        query: {
          id: row.id,
          identify: type,
          numyear:this.formData.numYear
        }
      });
    },
    tableRowClassName(row) {
      if (row.isReadFlag == "0" && this.btnType == "0") {
        return "warning-row";
      }
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
    //tab也签切换
    handelClick(tab) {
      this.swidthFlag = true;
      this.pagination = {
        pageNum: 1,
        pageSize: 20
      };
      switch (tab.index) {
        case "1":
          this.btnType = "0";
          this.loadD();
          break;
        case "2":
          this.btnType = "1";
          this.loadD();
          break;
        case "3":
          this.btnType = "2";
          this.loadD();
          break;
        default:
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
