<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="未启用" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="启用" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="中止" name="tabs-end"></el-tab-pane>
      <el-tab-pane label="到期" name="tabs-end1"></el-tab-pane>
      <el-row style="margin-top: -10px;">
        <el-col>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20 transition_wrap"
            :class="{mtdown:down}"
          >
            <el-row>
              <el-col :span="7">
                <el-form-item label="登记日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange()"
                      v-model="ruleForm.draftTime"
                      type="daterange"
                      align="right"
                      value-format="yyyy-MM-dd"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      style="width:300px"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="授权人" prop="authUserName">
                  <el-input v-model="ruleForm.authUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="被授权人" prop="beAuthUserName">
                  <el-input v-model="ruleForm.beAuthUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <!-- <el-form-item label="授权状态" prop="authStatusName">
                  <el-input v-model="ruleForm.authStatusName"></el-input>
                </el-form-item>-->
                <el-form-item v-if="activeName == 'tabs-all'" label="授权状态" prop="status">
                  <!-- <el-select v-model="ruleForm.status">
                    <el-option v-for="(item,index) in authList" :key="item" :label="item" :value="index">{{item}}</el-option>
                  </el-select>-->
                  <el-select
                    name="status"
                    v-model="ruleForm.status"
                    placeholder="请选择授权状态"
                    prop="status"
                    ref="status"
                  >
                    <el-option value label="请选择"></el-option>
                    <el-option
                      v-for="statusitem in authList"
                      :key="statusitem.label"
                      :label="statusitem.label"
                      :value="statusitem.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-col v-if="!down" class="arrowup">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
            <div v-if="down" class="clearfix">
              <el-row>
                <el-col>
                  <el-row class="center">
                    <el-button type="primary" @click="submitForm">搜索</el-button>
                    <el-button type="primary" @click="resetForm">重置</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="down">
                  <el-button type="info" size="small" @click="arrow()">
                    <i class="el-icon-arrow-up el-icon--left"></i> 收起
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </el-col>
        <el-col class="mt20end" v-if="isHasAdd">
          <!-- <router-link
            tag="a"
            target="_blank"
            :to="{path:'subTempAdd'}"
            class="btn-writeEnDspc"
          >临时授权登记</router-link>-->
          <el-button type="primary" size="small" @click="register">临时授权登记</el-button>
          <!-- <el-button type="primary"  @click="register">临时授权登记</el-button> -->
        </el-col>
        <el-col style="margin: 10px 0;">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            @cellClick="cellClick"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
        <!--选择部门-->
        <el-dialog
          :visible.sync="showChosDept"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          title="选择部门"
        >
          <el-form>
            <el-form-item>
              <el-select
                v-model="deptName"
                placeholder="请选择"
                @change="changeSelect()"
                style="width:100%"
              >
                <el-option
                  v-for="item in deptArr"
                  :key="item.currUnitName"
                  :label="item.currUnitName"
                  :value="item.currUnitName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showChosDept = false">取 消</el-button>
            <el-button type="primary" @click="handleChosDept()">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
const newLocal = "登记人";
const finshData = [
  { label: "登记日期", prop: "draftTime", align: "center" },
  { label: "授权人", prop: "authUserName", align: "center" },
  { label: "被授权人", prop: "beAuthUserName", align: "center" },
  { label: "启用时间", prop: "authStartTime", align: "center" },
  { label: "结束时间", prop: "authEndTime", align: "center" },
  { label: "中止时间", prop: "supspensionTime", align: "center" },
  { label: "当前状态", prop: "authStatusName", align: "center" }
];

export default {
  name: "ReceiveFile",
  components: {
    mTable
  },
  data() {
    return {
      deptName: "",
      isHasAdd: false,
      unitCode: "",
      authList: [
        {
          label: "未启用",
          value: "0"
        },
        {
          label: "启用",
          value: "1"
        },
        {
          label: "中止",
          value: "2"
        },
        {
          label: "到期",
          value: "3"
        }
      ],
      bank_countersignature: {
        function: "selectByPage",
        state: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        status: ""
      },
      down: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        draftTime: "", //发文字号
        authUserName: "", //主办部门
        beAuthUserName: "", //标题
        authStartTime: "",
        authEndTime: "",
        supspensionTime: "",
        authStatus: "",
        draftUserId: "",
        status: ""
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1,
        total: 0,
        limit: 20
      },
      deptArr: [],
      showChosDept: false,
      bank_chosDept: {
        function: "",
        humanId: "",
        deptName: ""
      },
      isSj: "",
      isShenj: {
        function: "isSj"
      }
    };
  },
  created() {
    this.HasAdd();
    this.isShenJiJg();
    this.initData();
    //this.initSelect();
    let transArr =
      (localStorage.getItem("unitInfo") &&
        JSON.parse(localStorage.getItem("unitInfo"))) ||
      [];
    let userInfo =
      (localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo"))) ||
      "";
    // this.curhumanId = userInfo.humanId;
    if (transArr.length > 1) {
      transArr.forEach(element => {
        if (element.unitId == userInfo.unitId) {
          this.deptArr.push(element);
        }
      });
    }
    // console.log('deptArr',this.deptArr)
  },
  methods: {
    changeSelect() {
      this.deptArr.forEach(e => {
        if (e.currUnitName == this.deptName) {
          this.bank_chosDept.deptName = e.firstUnitId;
          this.bank_chosDept.humanId = e.humanId;
        }
      });
    },
    initSelect() {
      let obj = {
        function: "selectStatusDropList"
      };
      this.$post
        .postData(
          // "getWFTask",
          "selectStatusDropList",
          JSON.stringify(obj),
          this.$businessCode.sqgl
        )
        .then(res => {
          this.authList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      //  guyun.sc    是的话校验综合岗和部门领导岗；行秘书岗和行签发岗   可以起草
      // liguo.zh   判断是否是审计机构  判断是部门领导和行签发岗功能不能选择授权人       部门综合和行秘书岗登记能选择授权人

      if (this.deptArr.length > 1) {
        this.showChosDept = true;
      } else {
        let routerData = this.$router.resolve({
          path: "/subTempAdd",
          query: {
            unitCode: this.unitCode,
            isSj: this.isSj
          }
        });
        window.open(routerData.href, "_blank");
      }
    },
    handleChosDept() {
      if (!this.bank_chosDept.deptName && this.showChosDept) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择所在部门",
          duration: 2000
        });
        return;
      }
      this.showChosDept = false;

      this.$post
        .postData(
          "switchUserInfo",
          JSON.stringify({
            function: "switchUserInfo",
            human_Id: this.bank_chosDept.humanId
          }),
          this.$businessCode.sqglgg
        )
        .then(res => {
          // console.log("deptName",this.bank_chosDept.deptName)

          let routerData = this.$router.resolve({
            path: "/subTempAdd",
            query: {
              unitCode: this.bank_chosDept.deptName,
              isSj: this.isSj
            }
          });
          window.open(routerData.href, "_blank");
        });
    },
    HasAdd() {
      this.$post
        .postData(
          "checkRole",
          JSON.stringify({ function: "checkRole", type: "0" }),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res.success == false) {
            // this.$message({
            //   type: "error",
            //   message: "抱歉，您没有登记权限"
            // });
            this.isHasAdd = false;
          } else {
            console.log(res);
            this.isHasAdd = true;
            this.unitCode = res.data.unitCode;
            // this.isSj = res.data && res.data.isSj || "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //判断是否是审计机构
    isShenJiJg() {
      this.$post
        .postData(
          "isSj",
          JSON.stringify({ function: "isSj" }),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res.success) {
            this.isSj = (res && res.isSj) || "";
          } else {
            this.isSj = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData() {
      this.$post
        .postData(
          "selectByPage",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.sqgl
        )
        .then(res => {
          if (res.success) {
            // console.log(res)
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            //this.pagination.limit = res.data.pageSize;
            this.bank_countersignature.totalCount = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    timeChange() {
      if (this.ruleForm.draftTime.length > 0) {
        this.ruleForm.draftTime[0] = dateFormate.date(
          Date.parse(this.ruleForm.draftTime[0]),
          "YYYY-MM-DD"
        );
        this.ruleForm.draftTime[1] = dateFormate.date(
          Date.parse(this.ruleForm.draftTime[1]),
          "YYYY-MM-DD"
        );
      }

      console.log(this.ruleForm.draftTime);
    },
    handleTabsClick(tab, event) {
      this.resetForm();
      this.tableData = [];
      this.tableLoading = true;
      this.bank_countersignature.status = "";
      this.pagination.total = 0;
      this.pagination.page = 1;
      this.bank_countersignature.page = 1;
      this.bank_countersignature.totalCount = 0;
      // console.log(tab, event)
      if (tab.name != "tabs-all") {
        this.bank_countersignature.state = tab.index - 1;
      } else {
        this.bank_countersignature.state = "";
      }
      this.initData();
      this.tableLoading = false;
    },

    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.pageNum = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.pagination.page = 1;
      this.bank_countersignature.page = 1;
      this.bank_countersignature.limit = val;
      this.pagination.limit = val;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      // let routeData = this.$intent.resolve({
      //   path: "subTempAdd",
      //   query: {
      //     id: row.id,
      //     state: this.bank_countersignature.state,
      //     unitCode: this.unitCode
      //   }
      // });
      // window.open(routeData.href, "_blank");
      this.$intent.goNewPage(this, {
        path: "subTempAdd",
        query: {
          id: row.id,
          state: this.bank_countersignature.state,
          unitCode: this.unitCode
        }
      });
    },
    submitForm(formName) {
      this.bank_countersignature.beAuthUserName = this.ruleForm.beAuthUserName;
      this.bank_countersignature.authUserName = this.ruleForm.authUserName;
      this.bank_countersignature.startDraftTime = this.ruleForm.draftTime[0];
      this.bank_countersignature.endDraftTime = this.ruleForm.draftTime[1];
      // this.bank_countersignature.status = this.ruleForm.status = ''
      this.bank_countersignature.status = this.ruleForm.status
        ? this.ruleForm.status
        : this.bank_countersignature.status;
      this.tableData = [];
      this.pagination.page = 1;
      this.bank_countersignature.page = 1;
      this.pagination.limit = 20;
      this.bank_countersignature.limit = 20;
      this.tableLoading = true;
      this.initData();
      this.tableLoading = false;
    },
    resetForm(formName) {
      this.ruleForm = {
        draftTime: [],
        authUserName: "",
        beAuthUserName: "",
        authStartTime: "",
        authEndTime: "",
        supspensionTime: "",
        authStatus: "",
        draftUserId: "",
        status: ""
      };
      this.bank_countersignature.status = "";
      //this.$refs[formName].resetFields();
    }
  }

  // sqgl:'A0846C013',//授权管理接口
  // sqglfj:'A0846C014',//授权管理附件接口
};
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 10px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.arrowup {
  padding-left: 20px;
}
.down {
  position: absolute;
  bottom: -76px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 8px;
}
.clearfix {
  clear: both;
}
.transition_wrap {
  transition: all 0.3s ease-in-out;
}
/deep/ .el-tabs__header {
  margin: 0 0 7px;
}
.is10 {
  margin: 20px 0 !important;
}
.mt20 {
  margin-top: 10px !important;
}
/deep/ .bank_dispach_content > .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 10px !important;
}
</style>
