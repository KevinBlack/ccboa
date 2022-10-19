<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
      <el-row style="margin-top: -10px;">
        <el-col v-if="this.bank_countersignature.state=='0'">
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
                <el-form-item label="被授权人" prop="beAuthUserName">
                  <el-input v-model="ruleForm.beAuthUserName"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="4">
                <el-form-item label="授权人" prop="authUserName">
                  <el-input v-model="ruleForm.authUserName"></el-input>
                </el-form-item>
              </el-col>-->
              <el-col :span="4">
                <el-form-item label="授权状态" prop="status">
                  <el-select v-model="ruleForm.status">
                    <el-option
                      v-for="(item,index) in authList"
                      :key="item"
                      :label="item"
                      :value="index"
                    >{{item}}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-col v-if="!down" class="arrowup">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col class="mt20end" v-if="isHasAdd">
          <el-button type="primary"  @click="register">长期授权登记</el-button>
          <!-- <el-button type="primary"  @click="register">长期授权登记</el-button> -->
        </el-col>
        <el-col style="margin: 10px 0;">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :state="bank_countersignature.state"
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
            <el-select v-model="deptName" placeholder="请选择" @change="changeSelect()" style="width:100%">
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

const otherData = [
  { label: "登记日期", prop: "draftTime", align: "center" },
  { label: "授权级别", prop: "authLevel", align: "center" },
  { label: "被授权人", prop: "beAuthUserName", align: "center" },
  { label: "启用时间", prop: "startTime", align: "center" },
  { label: "结束时间", prop: "endTime", align: "center" },
  { label: "中止时间", prop: "actualEndTime", align: "center" },
  { label: "当前状态", prop: "status", align: "center" },
  { label: "登记人", prop: "draftUserName", align: "center" }
];
const finshData = [
  { label: "登记日期", prop: "draftTime", align: "center" },
  { label: "授权级别", prop: "authLevel", align: "center" },
  { label: "被授权人", prop: "beAuthUserName", align: "center" },
  { label: "启用时间", prop: "startTime", align: "center" },
  { label: "结束时间", prop: "endTime", align: "center" },
  { label: "中止时间", prop: "actualEndTime", align: "center" },
  { label: "当前状态", prop: "authStatusName", align: "center" },
  { label: "登记人", prop: "draftUserName", align: "center" }
];

export default {
  name: "ReceiveFile",
  components: {
    mTable
  },
  data() {
    return {
      deptName:'',
      authList: [],
      // selectByPageCQHandler：列表查询接口；
      // startDraftTime --登记时间-开始；
      // endDraftTime--登记时间-结束
      // beAuthUserName--被授权人名称；
      // status--授权状态
      // fwTranId: "A08461306",
      bank_countersignature: {
        function: "selectByPageCQ",
        status: "",
        state: 1,
        beAuthUserName: "",
        endDraftTime: "",
        startDraftTime: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0
      },
      isHasAdd:false,
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
      activeName: "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1,
        total: 0,
        limit: 20
      },
      unitCode:'',
      deptArr:[],
      showChosDept:false,
      bank_chosDept: {
        function: "",
        humanId:"",
        deptName: ""
      },
    };
  },
  created() {
    this.HasAdd();
    this.otherData();
    this.initSelect();
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
  },
  methods: {
    changeSelect(){
      this.deptArr.forEach(e =>{
        if(e.currUnitName == this.deptName){
          this.bank_chosDept.deptName = e.firstUnitId;
          this.bank_chosDept.humanId = e.humanId;
        }
      })
    },
    register(){
       if (this.deptArr.length > 0) {
        this.showChosDept = true;
      } else {
      let routerData = this.$router.resolve({
              path: "/subLongAdd",
              query: {
                unitCode:this.unitCode
              }
            });
            window.open(routerData.href, "_blank");
      }
    },
    handleChosDept(){
      if(!this.bank_chosDept.deptName&&this.showChosDept){
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择所在部门",
            duration: 2000
          });
        return
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
          this.showChosDept = false;
          let routerData = this.$router.resolve({
              path: "/subLongAdd",
              query: {
                unitCode:this.bank_chosDept.deptName
              }
            });
            window.open(routerData.href, "_blank");
        });
    },
    HasAdd() {
      this.$post
        .postData(
          "checkRole",
          JSON.stringify({ function: "checkRole" , type:'1'}),
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
            // console.log(res);
            this.isHasAdd = true;
            this.unitCode = res.data.unitCode;
          }
        })
        .catch(err => {
          console.log(err);
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
    initData() {
      this.bank_countersignature.function = "selectByPageCQ";
      this.$post
        .postData(
          // "getWFTask",
          "selectByPageCQ",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.sqgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
          this.pagination.limit = res.data.pageSize;
          // console.log(res.data.rows.authLevel);
          res.data.rows.forEach(element => {
            element.authLevel =
              element.authLevel == 0 ? "部门级文件签发" : "行政文件签发";
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    otherData() {
      this.bank_countersignature.function = "getWFTask";
      this.bank_countersignature.tplbsnid = "CQSQ";
      this.$post
        .postData(
          "getWFTask",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.sqglgg
        )
        .then(res => {
          this.tableCols = otherData;
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
          this.pagination.limit = res.data.pageSize;
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
      // console.log(this.ruleForm.draftTime);
      // this.ruleForm.draftTime[0] = dateFormate.date(
      //   Date.parse(this.ruleForm.draftTime[0]),
      //   "YYYY-MM-DD"
      // );
      // this.ruleForm.draftTime[1] = dateFormate.date(
      //   Date.parse(this.ruleForm.draftTime[1]),
      //   "YYYY-MM-DD HH:mm:ss"
      // );
    },
    handleTabsClick(tab, event) {
      this.tableLoading = true;
      this.bank_countersignature.state = tab.index;
      if (tab.index === "0") {
        this.initData();
      } else {
        this.otherData();
      }
      this.tableLoading = false;
    },

    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.pageNum = val;
      this.tableData = [];
      if (this.bank_countersignature.state === "0") {
        this.initData();
      } else {
        //待办  已办  办结
        this.otherData();
      }
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = val;
      this.pagination.limit = val;
      this.tableData = [];
      if (this.bank_countersignature.state === "0") {
        this.initData();
      } else {
        this.otherData();
      }
    },
    cellClick(row, column, cell, event) { //待办 1 已办 2 办结3
      // console.log("row.state",row)
      // console.log("this.bank_countersignature.state",this.bank_countersignature.state)
      // let path =
      //   row.state == "2" || this.bank_countersignature.state == "2"||this.bank_countersignature.state == "3"||row.state == "3"
      //     ? "subLongDone"
      //     : "subLongAdd";
      //     console.log(path)
      // let routeData = this.$router.resolve({
      //   path: path,
      //   query: {
      //     id: row.id
      //   }
      // });
      // window.open(routeData.href, "_blank");

       let readType;
        let idType;
        let pcsAvyId;
        if(this.bank_countersignature.state == 0){
          readType = row.readFlag ? row.readFlag : '';
          idType = row.id ? row.id : '';
          pcsAvyId = row.pcsAvyId ? row.pcsAvyId : '';

        }else{
          readType = row.READFLAG ? row.READFLAG : '';
          idType = row.ID ? row.ID : '';
          pcsAvyId = row.PCSAVYID ? row.PCSAVYID : '';
        }

        const routeData = this.$router.resolve({
          path:row.state == "2" || this.bank_countersignature.state == "2"||this.bank_countersignature.state == "3"||row.state == "3"
          ? "subLongDone"
          : "subLongAdd",
            query: {
              id: idType,
              receiveType:row.RECEIVETYPE,
              readFlag:readType
            }
          });
          window.open(routeData.href, "_blank");
        // this.$post
        // .postData(
        //   "initCurUserDeptInfo",
        //   JSON.stringify({
        //     function: "initCurUserDeptInfo",
        //     pcsAvyId: row.pcsAvyId
        //   }),
        //   this.$businessCode.sqglgg
        // )
        // .then(res => {
        //   const routeData = this.$router.resolve({
        //   path:row.state == "2" || this.bank_countersignature.state == "2"||this.bank_countersignature.state == "3"||row.state == "3"
        //   ? "subLongDone"
        //   : "subLongAdd",
        //     query: {
        //       id: idType,
        //       receiveType:row.RECEIVETYPE,
        //       readFlag:readType
        //     }
        //   });
        //   window.open(routeData.href, "_blank");
        // })
    },
    submitForm(formName) {
      this.bank_countersignature.beAuthUserName = this.ruleForm.beAuthUserName;
      this.bank_countersignature.startDraftTime = this.ruleForm.draftTime
        ? this.ruleForm.draftTime[0]
        : "";
      this.bank_countersignature.endDraftTime = this.ruleForm.draftTime
        ? this.ruleForm.draftTime[1]
        : "";
      this.bank_countersignature.status = this.ruleForm.status;
      this.initData();
    },
    resetForm(formName) {
      this.ruleForm = {};
      //this.$refs[formName].resetFields();
    }
  }
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
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
  margin: 20px 0 !important;
}
.mt20 {
    margin-top: 10px;
}
/deep/ .bank_dispach_content>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px !important;
}
</style>

private String id;
    /**
     * 授权级别
     */
    private String authLevel;
    /**
     * 授权模块
     */
    private String authModule;
    /**
     * 登记人id
     */
    private String draftUserId;
    /**
     * 登记人名称
     */
    private String draftUserName;
    /**
     * 登记人部门id
     */
    private String draftDeptId;
    /**
     * 登记人部门名称
     */
    private String draftDeptName;
    /**
     * 被授权人id
     */
    private String beAuthUserId;
    /**
     * 被授权人名称
     */
    private String beAuthUserName;
    /**
     * 被授权部门id
     */
    private String beAuthDeptId;
    /**
     * 被授权部门名称
     */
    private String beAuthDeptName;
    /**
     * 登记日期
     */
    private String draftTime;
    /**
     * 实际结束日期 --中止时间
     */
    private String actualEndTime;
    /**
     * 授权开始时间
     */
    private String startTime;
    /**
     * 授权结束时间
     */
    private String endTime;
    /**
     * 授权原因
     */
    private String authReason;
    /**
     * 授权状态
     */
    private Integer status;
    /**
     * 备注
     */
    private String remarks;


    private String createUserId;


    private String createTime;


    private String updateUserId;


    private String updateTime;


    private String curNodeCode;


    private String curNodeName;


    private String curUser;


    /**
     * 流程实例标识process_inst_id
     */
    private String processInstId;
    /**
     * 模板编号tpl_no
     */
    private String tplNo;
    /**
     * 多实体标识multi_tenancy_id
     */
    private String multiTenancyId;
    /**
     * 流程活动标示id
     */
    private String pcsAvyId;


    /**
     * 办公室批办意见选择是否通过
     */
    private Integer isPass;


    private List<AttachmentPo> attchmentFileInfo;


    // 办公室批办意见
    private String officeOpinion;
    // 批示意见
    private String pishiOpinion;


    private String opinionMaxTime;


    private String authStatusName;