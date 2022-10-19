<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部1111" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="未启用" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="启用" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="中止" name="tabs-end"></el-tab-pane>
      <el-tab-pane label="到期" name="tabs-end1"></el-tab-pane>
      <el-row>
        <el-col>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20 transition_wrap"
            :class="{mtdown:down}"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="登记日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange(events)"
                      v-model="ruleForm.draftTime"
                      type="daterange"
                      align="right"
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
                <el-form-item label="被授权人" prop="beAuthUserName">
                  <el-input v-model="ruleForm.beAuthUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="授权人" prop="authUserName">
                  <el-input v-model="ruleForm.authUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="授权状态" prop="authStatusName">
                  <el-input v-model="ruleForm.authStatusName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
        <el-col class="mt20end">
          <router-link
            tag="a"
            target="_blank"
            :to="{path:'subTempAdd'}"
            class="btn-writeEnDspc"
          >临时授权登记</router-link>
        </el-col>

        <el-col style="margin: 20px 0;">
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
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";

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
      bank_countersignature: {
        function: "selectByPage",
        state: 0,
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount: 0
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
        draftUserId: ""
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: finshData,
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize: 10
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$post
        .postData(
          "selectByPage",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.sqgl
        )
        .then(res => {
          this.tableData = res.data.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    timeChange(events) {
      console.log(this.ruleForm.endTime);
    },
    handleTabsClick(tab, event) {
      this.tableLoading = true;
      this.bank_countersignature.state = tab.index;
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
      this.bank_countersignature.limit = val;
      this.pagination.pageSize = val;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      this.$router.push({
        path: "/subTempAdd",
        query: {
          id: row.id,
          state: this.bank_countersignature.state
        }
      });
    },
    submitForm(formName) {
      this.bank_countersignature.beAuthUserName = this.ruleForm.beAuthUserName;
      this.bank_countersignature.startDraftTime = this.ruleForm.draftTime[0];
      this.bank_countersignature.endDraftTime = this.ruleForm.draftTime[1];
      // this.bank_countersignature.status = this.ruleForm.status;
      this.initData();
    },
    resetForm(formName) {
      this.ruleForm = {};
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
  padding: 20px 0 0 0;
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
  margin-top: 20px;
}
.clearfix {
  clear: both;
}
.transition_wrap {
  transition: all 0.3s ease-in-out;
}
</style>
