<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">领导批示管理查询</div>
    </div>
    <!-- <fd-form style="margin:0 10%" :data="formData" :columns="formCfg"></fd-form> -->
    <div class="wrap">
      <el-form label-width="120px">
        <el-row>
          <el-col :span="10">
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
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="成文日期">
              <el-date-picker
                v-model="formData.dataDate1"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
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
        </el-row>
        <el-row :gutter="20">
          <!-- 是管理员 -->
          <el-form-item label="行名" v-show="fig">
            <el-col :span="6">
              <select-org-or-dept @select="selectOrg">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择机构"
                  v-model="formData.orgName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-col>
            <el-col :span="8">
              <el-input v-model="objData.oldOrgan"></el-input>
            </el-col>
          </el-form-item>
          <!-- 不是管理员 -->
          <el-form-item label="行名" v-show="!fig">
            <el-col :span="6">
              <!-- <select-org-or-dept @select="selectOrg">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择机构"
                  v-model="formData.orgName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>-->

              <el-select v-model="formData.Code" placeholder="请选择机构">
                <el-option :label="obj.orgName" :value="obj.orgCode"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="objData.oldOrgan"></el-input>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-form-item label="主办部门">
            <el-col :span="6">
              <select-org-or-dept @select="selectDept" :orgOrDept="0" :orgOrDeptId="depNameId">
                <el-input
                  readonly
                  type="text"
                  placeholder="请选择部门"
                  v-model="formData.depName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-col>
            <el-col :span="8">
              <el-input v-model="objData.oldDept"></el-input>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <!-- <el-form-item label="文件类型">
          <el-col :span="8">-->
          <!-- <el-radio-group v-model="objData.documentType">
                <el-radio :label="1">发文</el-radio>
                <el-radio :label="2">收文</el-radio>
                <el-radio :label="3">签报</el-radio>
                <el-radio :label="4">其他</el-radio>
          </el-radio-group>-->
          <el-form-item label="文件类型:">
            <el-col :span="10">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>

              <el-checkbox-group v-model="objData.documentType" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city.id">{{city.name}}</el-checkbox>
              </el-checkbox-group>
              <!-- </el-col>
              </el-form-item>-->
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="文号">
            <el-col :span="12">
              <el-input v-model="objData.documentNo"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="文件标题">
            <el-col :span="12">
              <el-input v-model="objData.title"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="批示意见">
            <el-col :span="12">
              <el-input v-model="objData.leaderOpinion"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="btn_list">
      <el-button type="primary" @click="savedata">开始查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>
    <div style="margin-bottom:15px">
      <el-button type="primary" @click="exportSelect">导出</el-button>
      <el-button type="primary" @click="statistics">统计</el-button>
      <!-- <el-button type="danger" @click="handleDelete">删除</el-button> -->
    </div>
    <m-table
      @refresh="savedata"
      @cellClick="cellClick"
      @select="select"
      :searchData="searchData"
      size="medium"
      :isIndex="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></m-table>

    <!-- 统计 -->
    <div class="tableList" v-if="modal">
      <div class="btn" style="margin-bottom:20px">
        <el-button type="primary" @click="exportDefault">导出</el-button>
        <el-button type="primary" @click="toHide">关闭</el-button>
      </div>
      <el-table :data="tongData" border id="tableList" stripe style="width: 100%">
        <el-table-column prop="zbDept" label="主办部门" width="180"></el-table-column>
        <el-table-column prop="num1" label="发文" width="180"></el-table-column>
        <el-table-column prop="num2" label="收文"></el-table-column>
        <el-table-column prop="num3" label="签报"></el-table-column>
        <el-table-column prop="num4" label="其他"></el-table-column>
        <el-table-column prop="num" label="合计"></el-table-column>
      </el-table>
      <!-- <el-table
        id="table"
        :header-cell-style="{background:'#eef1f6',color:'#3B85F0'}"
        :data="tongData"
        stripe
        style="width: 100%"
        align="right"
      >
        <el-table-column
          v-for="(item,index) in applyList"
          :key="index"
          :label="item"
          :prop="(index).toString()"
        ></el-table-column>
      </el-table>-->
    </div>
    <div class="modal" v-if="modal" @click="toHide"></div>
  </div>
</template>

<script >
// import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import exportTable from "@/minixs/exportTable";

export default {
  name: "registerKindTable",
  components: {
    // FdForm,
    mTable,
    selectOrgOrDept
  },
  props: {},
  watch: {
    $route() {
      this.type = this.$route.params.id;
    }
  },
  data() {
    return {
      yearList:[],
      yearList1:[],
      cities: [
        { name: "发文", id: "1" },
        { name: "收文", id: "2" },
        { name: "签报", id: "3" },
        { name: "其他", id: "4" }
      ],
      depNameId: "", //承办部门id
      fig: false,
      obj: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      modal: false,
      type: this.$route.params.id,
      formCfg: [
        {
          type: "date",
          prop: "1",
          label: "登记日期",
          span: 10,
          style: { width: "330px" }
        },
        {
          type: "date",
          prop: "1",
          label: "至",
          span: 10,
          style: { width: "330px" }
        },
        [
          { type: "select", option: "1,2,3", span: 10 },
          { type: "input", span: 10, style: { width: "63%" } },
          { type: "formitem", label: "行名" }
        ],
        [
          { type: "select", option: "1,2,3", span: 10 },
          { type: "input", span: 10, style: { width: "63%" } },
          { type: "formitem", label: "主办部门" }
        ],
        {
          type: "check-boxs",
          label: "文件类型",
          prop: "1q11",
          options: "全部,发文,收文,签报,其他",
          change: row => {
            console.log(row);
          }
        },
        {
          type: "input",
          label: "领导姓名",
          prop: "1",
          style: { width: "96%" }
        },
        { type: "input", label: "文号", prop: "1", style: { width: "96%" } },
        {
          type: "input",
          label: "文件标题",
          prop: "1",
          style: { width: "96%" }
        },
        {
          type: "input",
          label: "批示意见",
          prop: "1",
          style: { width: "96%" }
        }
      ],
      tongCol: [
        { label: "主办部门", prop: "zbDept" },
        { label: "发文", prop: "num1" },
        { label: "收文", prop: "num2" },
        { label: "签报", prop: "num3" },
        { label: "其他", prop: "num4" },
        { label: "合计", prop: "num" }
      ],
      applyList: ["主办部门", "发文", "收文", "签报", "其他"],
      tongData: [],
      objData: {
        btnType: "3",
        documentType: [],
        documentNo: "",
        title: "",
        leaderOpinion: "",
        oldOrgan: "",
        oldDept: "",
        unitId: "",
        zbDeptId: "",
        createStartDate: "",
        createEndDate: "",
        createStartDate1: "",
        createEndDate1: ""
      },
      formData: {
        choseYear:"近两年",
        numYear:"",
        Code: "",
        zbDeptId: "",
        depCode: "",
        orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        dataDate: [],
        // dataDate1: [],
        orgName: "",
        orgName1: "",
        depName: "",
        depName1: ""
      },
      stasticData: [],
      // 列表数据
      tableData: [],
      // 表头
      tableCols: [
        // { label: "序号", prop: "hyDnr" },
        { label: "批示时间", prop: "createDate" ,width:150},
        { label: "文号", prop: "documentNo" ,width:150},
        { label: "文件标题", prop: "title" },
        { label: "发文单位", prop: "zbDept" ,width:100},
        { label: "领导姓名", prop: "leaderName" ,width:100},
        { label: "批示意见", prop: "leaderOpinion" ,width:150},

        { label: "文件类型", prop: "documentType",width:100 }
      ],
      selectRowData: [],
      // 分页
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      isIndeterminate: true,
      checkAll: false,
      searchData: {
        choseYear: "",
        numYear: "",
        documentNo:""
      }
    };
  },
  computed: {},
  methods: {
    getNumYearList() {
      return new Promise((resolve, reject) => {
        this.$api.numYear.getNumYearList().then(res => {
          this.yearList = getNumYear(res.data);
          this.searchData.numYear = this.formData.numYear;
          resolve(res.data);
        });
      });
    },
    selectYear(val) {
      console.log(val);
      if (val == "近两年") {
        this.formData.numYear = "";
        this.objData.documentNo = "";
        this.searchData.documentNo = "";
        this.searchData.numYear = "";
        // this.formData.documentNo = "";
        // this.form.documentNo = "〔" + new Date().getFullYear() + "〕"
      } else {
        this.formData.numYear = val;
        this.objData.documentNo = "〔" + val + "〕";
        this.searchData.documentNo = "〔" + val + "〕";
        this.searchData.numYear = val;
        // this.formData.documentNo = "";
      }
    },
    count() {
      // this.tongData.push()
      let zbDept = "总计";
      let total1 = 0;
      let total2 = 0;
      let total3 = 0;
      let total4 = 0;
      let total = 0;
      this.tongData.map(item => {
        total1 += Number(item.num1);
        total2 += Number(item.num2);
        total3 += Number(item.num3);
        total4 += Number(item.num4);
        total = total1 + total2 + total3 + total4;
      });
      let obj = {
        zbDept: zbDept,
        num1: total1,
        num2: total2,
        num3: total3,
        num4: total4,
        num: total
      };
      this.tongData.push(obj);
    },
    //导出
    exportSelect() {
      exportTable.exportExcel("领导批示安排");
    },
    handleCheckAllChange(val) {
      console.log("v", val);

      // this.objData.documentType = val ? this.cities : [];
      this.objData.documentType = val ? this.cities : [];
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
      (this.formData = {
        // orgCode: "111111111",
        orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        Code: "",
        dataDate: [],
        // dataDate1:[],
        orgName: "",
        orgName1: "",
        depName: "",
        zbDeptId: "",
        depName1: "",
        numYear:"",
        choseYear:"近两年"
      }),
        (this.objData = {
          btnType: "3",
          documentType: [],
          documentNo: "",
          title: "",
          leaderOpinion: "",
          oldOrgan: "",
          oldDept: "",
          unitId: "",
          zbDeptId: "",
          createStartDate: "",
          createEndDate: "",
          createStartDate1: "",
          createEndDate1: ""
        });
        this.searchData.numYear = ""
        this.searchData.documentNo = ""
      this.savedata();
    },
    selectOrg(org) {
      console.log("12121");
      console.log("99999", org);
      this.formData.orgName = org.unitName;
      this.formData.orgCode = org.id;
    },
    //部门
    selectDept(dept) {
      this.formData.depName = dept.unitName;
      this.formData.zbDeptId = dept.id;
    },
    select(row) {
      this.selectRowData = row;
    },
    //  获取列表数据
    loadData() {},
    // 导出
    exportDefault() {
      exportTable.exportExcel("统计", "#tableList");
    },
    // 删除
    handleDelete() {
      if (this.selectRowData.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择数据"
        });
      } else {
        console.log(this.selectRowData);
        let obj = [];
        this.selectRowData.map(item => {
          obj.push(item.id);
        });
        this.$api.secreatary.leaderActivity
          .deleteLook({ id: obj.join(",") })
          .then(res => {
            this.savedata();
            this.$message({
              type: "success",
              message: "删除成功"
            });
          });
        // this.$api.dailyWork.deleteVierPer({ ids: ids }).then((res) => {
        //   this.loadData();
        //   this.$message({
        //     type: "success",
        //     message: "删除成功",
        //   });
        // });
      }
    },
    // 统计
    statistics() {
      this.modal = true;
    },
    toHide() {
      this.modal = false;
    },
    cellClick(row) {
      if (row.tableType === "1") {
        console.log("tab", row.tableType);
        console.log("tab", row.btnType);
        //实物
        if (row.btnType === "0") {
          console.log("btn", row.btnType);
          // 待办
          this.$router.push({
            path: "/registerTable",

            query: {
              numYear: this.formData.numYear,
              detail: JSON.stringify(row),
              isAdd: JSON.stringify(false)
            }
          });
        } else if (row.btnType === "1" || row.btnType === "2") {
          console.log("btn", row.btnType);
          this.$router.push({
            path: "/registerTableDone",
            query: {
              numYear: this.formData.numYear,
              detail: JSON.stringify(row),
              buttonType: JSON.stringify(row.btnType)
            }
          });
        } else if (row.btnType === "3") {
          console.log(row.btnType);
        }
      } else if (row.tableType === "2") {
        console.log("tab", row.tableType);
        // 电子
        this.$router.push({
          path: "/electronicTable",
          query: {
            numYear: this.formData.numYear,
            detail: JSON.stringify(row)
          }
        });
      }
    },
    savedata() {
      let obj = {};
      if (this.formData.dataDate && this.formData.dataDate.length !== 0) {
        this.objData.createStartDate = this.formData.dataDate[0];
        this.objData.createEndDate = this.formData.dataDate[1];
      } else {
        this.objData.createStartDate =""
        this.objData.createEndDate = ""
      }
      this.objData.unitId = this.formData.orgCode;
      this.objData.zbDeptId = this.formData.zbDeptId;

      if (this.objData.documentType.length !== 0) {
        let arr = [];
        this.objData.documentType.map(item => {
          arr.push(item.id);
        });
        this.objData.documentType = arr.join(",");
      }
      console.log(this.objData, "this.objData");
      this.searchData.documentNo = this.objData.documentNo
      this.$api.secreatary.leaderActivity
        .leaderLook(
          { ...this.objData, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          if (res.code === "SUCCESS") {
            this.tableData = res.list;
            this.tongData = res.census;
            this.pagination.total = res.total;
            this.count();
            this.objData.documentType = [];
            this.tableData.map(item => {
              if (item.createDate) {
                item.createDate = item.createDate.substring(0, 10);
              }
            });
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
          }
        });
    }
  },
  mounted() {},
  created() {
    // 判断是否是系统管理员
    let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
    console.log(tcHumanRole, "tcHumanRole");
    for (var i = 0; i < tcHumanRole.length; i++) {
      console.log(tcHumanRole[i]);
      if (tcHumanRole[i].dicId == 304) {
        this.fig = true;
      }
      this.depNameId =
        this.fig == false
          ? JSON.parse(localStorage.getItem("userInfo")).unitId
          : this.formData.orgCode;
    }
    console.log(this.fig, "fig");
    console.log(this.depNameId, "this.depNameId");
    this.getNumYearList().then(res => {
      this.savedata();
    });
    // this.savedata();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2013;
}
.tableList {
  background: white;
  padding: 20px;
  border: 1px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 2014;
  width: 70%;
  margin: 0 auto;
  position: absolute;
  top: 30%;
  left: 20%;
}
/deep/ .el-checkbox-group {
  display: inline-block;
  margin-left: 15px;
}
/deep/ .el-form-item__label {
  width: 100px;
}

.wrap {
  width: 80%;
  margin: 0 auto;
}
.formHeader {
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
.btn_list {
  margin-left: 45%;
}
/deep/.tree-div {
  width: 25% !important;
  height: 250px;
}
</style>
