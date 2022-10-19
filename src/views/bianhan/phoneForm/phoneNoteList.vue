/**
 * create by lyl on 2020/12/5 16:13
 * 类注释：秘书工作-电话记录单
 * 备注：
 */
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
                <el-form-item label="开始时间" prop="createDateStart">
                  <el-date-picker
                    style="width: 80%;"
                    v-model="formData.createDateStart"
                    value-format="yyyy-M-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="截止时间" prop="createDateEnd">
                  <el-date-picker
                    style="width: 80%;"
                    v-model="formData.createDateEnd"
                    value-format="yyyy-M-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="通话单位" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="来电人员" prop="callPle">
              <el-input v-model="formData.callPle"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="loadD">搜索</el-button>
            <el-button type="primary" @click="onClear('formData')">清空</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待办">
        <div>
          <el-button type="primary" @click="addData1">新建</el-button>
          <!-- <el-button type="primary" @click="del">删除</el-button> -->
          <!--取消 删除按钮-->
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
      :tableRowClassNames="tableRowClassName"
    ></mTable>
  </div>
</template>

  <script >
import mTable from "components/table/tTable";
import exportTable from "../../../minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/phonenote.js";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  name: "phoneNoteList",
  components: {
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      yearList: [],
      activeName: "1",
      dialogFormVisible: false,
      bank_chosDept: {
        deptId: ""
      },
      deptList: [],
      selectDept: "",
      formData1: {},
      delAry: [], //删除数据
      btnType: "0",
      formData: {
        select: 1,
        list: "",
        title: "",
        callPle: "",
        content: "",
        unit: "",
        numYear: "",
        createDateStart: '',
        createDateEnd: ''
      },
      searchNumYear: '',
      pagination: {
        pageNum: 1,
        pageSize: 20
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
        { label: "日期", prop: "createDate" },
        { label: "编号", prop: "documentNo" },
        { label: "通话单位", prop: "title" },
        { label: "来电人员", prop: "callPle" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "currentUser" }
      ],
      tableData: []
    };
  },
  created() {
    this.getNumYearList().finally(() => {
      this.loadD();
    })
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
      console.log(JSON.stringify(params[0]), "JSON.stringify(params[0])");
      console.log(params, "params");
      this.$intent.goNewPage(this, {
        path: "/bianhan/phoneForm/detail",
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
      // let select = {};
      // this.deptList.forEach(item => {
      //   if (item.humanId == p) {
      //     select = item;
      //   }
      // });
      // this.formData1 = select;
      this.$forceUpdate();
    },
    //新建
    addData1() {
      apis.getUserPersondh({}).then(res => {
        this.deptList = res.result;
        console.log("this.deptList", this.deptList);
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
      if (this.delAry.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        const data = {
          id: this.selectedRowId
        };
        apis.phoneListDel(data).then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.loadD();
          }
        });
      }
    },
    //加载列表数据
    loadD() {
      const _this = this;
      if (this.btnType == "0" || this.btnType == "2") {
        if (this.searchData.sortKey == "createDate") {
          this.searchData.sortKey = "remark1";
        }
      }
      let data = {
        btnType: _this.btnType,
        ..._this.searchData,
        ..._this.formData
      };

      let createStartDate = _this.formData.createStartDate;
      let createEndDate = _this.formData.createEndDate;
      _this.formData.createStartDate = createStartDate
        ? createStartDate.getFullYear() +
          "-" +
          (createStartDate.getMonth() + 1) +
          "-" +
          createStartDate.getDate()
        : "";
      _this.formData.createEndDate = createEndDate
        ? createEndDate.getFullYear() +
          "-" +
          (createEndDate.getMonth() + 1) +
          "-" +
          createEndDate.getDate()
        : "";
      apis
        .phoneList(data, {
          PAGE_JUMP: _this.pagination.pageNum,
          REC_IN_PAGE: _this.pagination.pageSize
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.searchNumYear = data.numYear
            _this.pagination.total = res.total;
            _this.tableData = res.data;
          }
          console.log(res);
        });
    },
    //点击行进详情
    cellClick(row) {
      let type = "";
      if (this.btnType === "3") {
        type = row.btnType;
      } else {
        type = this.btnType;
      }
      this.hasOpened(row.id, {
        path: "/bianhan/phoneForm/detail",
        'query': {
          'id': row.id,
          'identify': type,
          'numYear': this.searchNumYear
        }
      })
    },
    tableRowClassName(row) {
      console.log(this.btnType);

      if (row.isReadFlag == "0" && this.btnType == "0") {
        return "warning-row";
      }
    },
    //选择选项框
    selectRow(data) {
      console.log("xuanzhonghang-----", data);
      this.delAry = data;
      console.log("this.delAry", this.delAry);
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
      if (tab.index != '0') {
        this.formData.numYear = ''
        this.searchNumYear = ''
      }
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
          { label: "日期", prop: "createDate" },
          { label: "编号", prop: "documentNo" },
          { label: "通话单位", prop: "title" },
          { label: "来电人员", prop: "callPle" }
          // { label: "当前环节", prop: "currentNode" }
        ];
      } else {
        this.tableCols = [
          { label: "日期", prop: "createDate" },
          { label: "编号", prop: "documentNo" },
          { label: "通话单位", prop: "title" },
          { label: "来电人员", prop: "callPle" },
          { label: "当前环节", prop: "currentNode" },
          { label: "操作人", prop: "currentUser" }
        ];
      }
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
