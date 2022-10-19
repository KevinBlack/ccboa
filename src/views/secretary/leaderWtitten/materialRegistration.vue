<template>
  <div class="drafting">
    <el-container>
      <el-main>
        <div class="electronicRegistration">
          <el-tabs @tab-click="handleClick" v-model="tabType">
            <el-tab-pane label="全部" name="typeFir">
              <search-form
                ref="searchForm"
                :formData="formData"
                @reset="reset"
                class="mt20"
                @event="btnEvent"
                @submit="submit"
                :formCfg="formCfg"
              >
                <el-col :span="8">
                  <el-form-item label="文号年份">
                    <el-select
                      v-model="formData.choseYear"
                      @change="selectYear"
                      placeholder="近两年"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="yearItem in yearList"
                        :key="yearItem"
                        :label="yearItem"
                        :value="yearItem"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文号">
                    <el-input v-model="formData.documentNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="日期">
                    <el-date-picker
                      v-model="formData.dataDate"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="类型:">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                    >全选</el-checkbox>

                    <el-checkbox-group
                      v-model="formData.typeData"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox v-for="city in cities" :label="city" :key="city.id">{{city.name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </search-form>
            </el-tab-pane>
            <el-tab-pane label="待办" name="typeSec">
              <el-button type="primary" style="margin-bottom:10px" @click="toAdd">新增</el-button>
              <el-button type="danger" style="margin-bottom:10px" @click="toDelete">删除</el-button>
            </el-tab-pane>
            <el-tab-pane label="已办" name="typeThr"></el-tab-pane>
            <el-tab-pane label="办结" name="typeFor"></el-tab-pane>
          </el-tabs>
          <div class="top"></div>
          <m-table
            @refresh="loadData"
            @cellClick="cellClick"
            @select="select"
            :searchData="searchData"
            :isIndex="true"
            size="medium"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            :isSelection="true"
            :tableRowClassNames="tableRowClassName"
          ></m-table>
        </div>
      </el-main>
    </el-container>
    <!--新增弹框选择部门-->
    <el-dialog
      :visible.sync="showChooseDept"
      title="选择部门"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form v-model="bank_chosDept" ref="bank_chosDept">
        <el-form-item prop="deptName" style="width:100%">
          <el-select
            v-model="bank_chosDept.deptId"
            placeholder="请选择"
            style="width:100%"
            @change="selectId"
          >
            <el-option
              v-for="item in deptArr"
              :key="item.currUnitId"
              :label="item.unitNames"
              :value="item.currUnitId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleChosDept()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "@/components/table/tTable";
import searchForm from "@/components/form/searchForm";
import bianhanPublic from "@/minixs/bianhan";
// const cityOptions = ['上海', '北京', '广州', '深圳'];

export default {
  name: "drafting",
  components: {
    mTable,
    searchForm
  },
  data() {
    return {
      yearList:[],
      checkAll: false,
      checkedCities: [],
      // cities: ["发文", "收文", "签报", "其他"],
      cities: [
        { name: "发文", id: "1" },
        { name: "收文", id: "2" },
        { name: "签报", id: "3" },
        { name: "其他", id: "4" }
      ],

      isIndeterminate: true,
      // 弹出框数据
      showChooseDept: false,
      bank_chosDept: {
        deptId: ""
      },
      deptArr: "",
      // 列表数据
      tableData: [],
      tabType: "typeSec",

      findText: {
        data: "",
        checkList: "",
        title: ""
      },
      formData: {
        choseYear: "近两年",
        numYear: "",
        dataDate: "",
        createStartDate: "",
        createEndDate: "",
        documentType: "",
        typeData: [],
        title: "",
        btnType: "0",
        documentNo:""
      },
      formCfg: [
        {
          type: "input",
          prop: "title",
          label: "标题",
          span: 8
        },
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button", prop: "$reset", value: "重置" },
          { type: "button-danger", prop: "$delete", value: "删除" },
          {
            type: "formitem",
            style: { "text-align": "center" }
          }
        ]
      ],
      selectRow: [],
      options: { "2": "已办", "3": "办结" },
      // 表头
      tableCols: [
        { label: "成文日期", prop: "createDate", width: 150 },
        { label: "文件标题", prop: "title" },
        { label: "文号", prop: "documentNo", width: 200 },
        { label: "文件类型", prop: "documentType", width: 100 },
        { label: "主办部门", prop: "zbDept", width: 100 },
        { label: "联系人", prop: "contact", width: 100 },
        { label: "联系电话", prop: "tel", width: 150 }
      ],
      // 分页
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20
      },
      searchData: {
        numYear: "",
        documentNo:""
      }
    };
  },
  mixins: [bianhanPublic],
  methods: {
    selectYear(val) {
      console.log(val);
      if (val == "近两年") {
        this.formData.numYear = "";
        this.formData.documentNo = "";
        this.searchData.documentNo = "";
        this.searchData.numYear = "";
      } else {
        this.formData.numYear = val;
        this.formData.documentNo = "〔" + val + "〕";
        this.searchData.numYear = val;
        this.searchData.documentNo = "〔" + val + "〕";
      }
    },
    getNumYearList() {
      return new Promise((resolve, reject) => {
        this.$api.numYear.getNumYearList().then(res => {
          this.yearList = getNumYear(res.data);
          this.searchData.numYear = this.formData.numYear;
          resolve(res.data);
        });
      });
    },
    btnEvent(params) {
      console.log(params);
      if (params.prop == "$delete") {
        this.toDelete();
      }
    },
    toDelete() {
      console.log(this.selectRow);
      if (this.selectRow.length === 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        let ids = [];
        this.selectRow.map(item => {
          ids.push(item.id);
        });
        this.$api.secreatary.leaderActivity
          .delLeaderList({ id: ids.join(",") })
          .then(res => {
            this.$message({
              message: res.msg + res.failmsg,
              type: "success"
            });
            this.loadData();
          });
      }
    },
    // 选择部门
    selectId(id) {
      console.log(id);
    },
    // 确定选择部门
    handleChosDept() {
      if (!this.bank_chosDept.deptId) {
        return this.$message.error("请选择部门");
      }
      const params = this.deptArr.filter(x => {
        return x.currUnitId === this.bank_chosDept.deptId;
      });
      this.showChooseDept = false;
      console.log(JSON.stringify(params[0]), "JSON.stringify(params[0])");
      console.log(params, "params");
      this.$intent.goNewPage(this, {
        path: "/registerTable",
        query: {
          isAdd: JSON.stringify(true),
          params: params[0].currUnitId
        }
      });
    },
    cancel() {
      this.$refs.bank_chosDept.resetFields();
      this.showChooseDept = false;
    },
    toAdd() {
      this.$api.secreatary.leaderActivity.getdeptList().then(res => {
        console.log(res, "新增返回列表");
        this.deptArr = res.result;
        this.showChooseDept = true;
      });
    },
    handleCheckAllChange(val) {
      console.log("val", val);

      this.formData.typeData = val ? this.cities : [];
      // debugger
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log("11", value);

      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    //重置
    reset() {
      this.formData = { choseYear:"近两年",numYear:"", dataDate: "", typeData: [], title: "", btnType: "3" ,documentNo:""};
      this.searchData.numYear = ""
      this.searchData.documentNo = ""
    },
    submit() {
      if (this.formData.dataDate && this.formData.dataDate.length !== 0) {
        this.formData.createStartDate = this.formData.dataDate[0];
        this.formData.createEndDate = this.formData.dataDate[1];
      } else {
        this.formData.createStartDate = ""
        this.formData.createEndDate = ""
      }

      let ids = [];
      this.formData.typeData.map(item => {
        ids.push(item.id);
      });
      this.formData.documentType = ids.join(",");
      this.loadData();
    },

    // 获取表格数据方法
    loadData() {
      this.searchData.documentNo = this.formData.documentNo
      this.$api.secreatary.leaderActivity
        .loginList(
          { ...this.formData, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.tableData = res.data;
          console.log("tab", this.tableData);
          this.tableData.map(item => {
            switch (item.documentType) {
              case "1":
                item.documentType = "发文";
                break;
              case "2":
                item.documentType = "收文";
                break;
              case "3":
                item.documentType = "签报";
                break;
              case "4":
                item.documentType = "其他";
                break;
            }
          });
          this.pagination.total = res.total;
        });
    },
    tableRowClassName(row) {
      if (row.isReadFlag == "0" && this.formData.btnType == "0") {
        return "warning-row";
      }
    },
    // 点中的当前行
    cellClick(row) {
      //  前端： 0 待办   1已办  2办结  3全部
      let rowData = JSON.stringify(row);
      if (this.formData.btnType == "1" || this.formData.btnType == "2") {
        //-----------------已办 办结-----------------
        console.log("已办 办结");
        console.log(this.formData.btnType);
        this.$intent.goNewPage(this, {
          path: "/registerTableDone",
          query: {
            numYear:this.searchData.numYear,
            detail: rowData,
            buttonType: JSON.stringify(this.formData.btnType)
          }
        });
      } else if (this.formData.btnType == "3") {
        // ------------全部-------------
        console.log(row);
        if (row.btnType === "0") {
          //判断后端返回的字段 0待办 1已办 2办结
          console.log("全部-待办");
          // this.$intent.goNewPage(this, {
          //   path: "/registerTable",
          //   query: {
          //     detail: rowData,
          //     isAdd: JSON.stringify(false),
          //     buttonType: JSON.stringify(row.btnType)
          //   }
          // });
          this.hasOpened(row.id, {
            path: "/registerTable",
            query: {
              numYear:this.searchData.numYear,
              id: row.id,
              detail: rowData,
              isAdd: JSON.stringify(false),
              buttonType: JSON.stringify(row.btnType)
            }
          });
        } else if (row.btnType === "1" || row.btnType === "2") {
          console.log("全部-已办办结");
          console.log(this.formData.btnType);
          this.$intent.goNewPage(this, {
            path: "/registerTableDone",
            query: {
              numYear:this.searchData.numYear,
              detail: rowData,
              buttonType: JSON.stringify(row.btnType)
            }
          });
        }
      } else if (this.formData.btnType == "0") {
        // -----------------待办----------
        console.log("待办");
        // this.$intent.goNewPage(this, {
        //   path: "/registerTable",

        //   query: {
        //     detail: rowData,
        //     isAdd: JSON.stringify(false),
        //     buttonType: JSON.stringify(this.formData.btnType)
        //   }
        // });
        this.hasOpened(row.id, {
          path: "/registerTable",
          query: {
            numYear:this.searchData.numYear,
            id: row.id,
            detail: rowData,
            isAdd: JSON.stringify(false),
            buttonType: JSON.stringify(this.formData.btnType)
          }
        });
      }
      // let isREadFlag = "";
      // console.log('btn',this.formData.btnType )
      // if (this.formData.btnType == "1") {
      //   //已办
      //   isREadFlag = row.isReadFlag;
      // }
      // let rowData = JSON.stringify(row);
      // this.$intent.goNewPage(this, {
      //   path: "/registerTable",
      //   query: {
      //     detail: rowData,
      //     isAdd: JSON.stringify(false),
      //     isREadFlag: JSON.stringify(isREadFlag),
      //     btnType:this.formData.btnType
      //   },
      // });
    },
    // 勾选的当前行
    select(row) {
      console.log(row);
      this.selectRow = row;
    },
    // tab切换
    handleClick(tab, event) {
      if (tab.name === "typeFir") {
        //全部
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        this.formData.btnType = "3";
        this.getNumYearList().then(res=>{
          this.loadData();
        })
      } else if (tab.name === "typeSec") {
        //代办
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        this.formData.btnType = "0";
        this.loadData();
      } else if (tab.name === "typeThr") {
        // 已办
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        this.formData.btnType = "1";
        this.loadData();
      } else {
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        this.formData.btnType = "2";
        this.loadData();
        //办结
        return;
      }
    }
  },

  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
// /deep/ .el-input {
//   width: 83% !important;
// }
// /deep/ .el-input--suffix .el-input__inner {
//   width: 350px;
// }
/deep/ .el-checkbox-group {
  display: inline-block;
  margin-left: 15px;
}
// /deep/ .el-form-item__content {
//   margin-left: 0 !important;
// }
// /deep/ .el-form-item__label {
//   width: 50px !important;
// }
/deep/ .el-input {
  width: 100%;
}
.read {
  color: "#E00";
}
.drafting {
  background: #fff;
  min-height: 100vh;
}

.el-main {
  width: 100%;
  padding: 0;
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 35px;
    color: #409eff;
    font-weight: 800;
  }
}
</style>
