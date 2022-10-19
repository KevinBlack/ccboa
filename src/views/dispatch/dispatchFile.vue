<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick" v-cloak><!-- 页码修改0823 -->
      <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
      <el-tab-pane v-if="ZHFWG" label="增发" name="tabs-add"></el-tab-pane>
      <el-row class="mtJ20">
        <el-col v-if="isAll">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20"
            :class="{mtdown:down}"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="文号年份" prop="choseYear">
                  <el-select
                    v-model="ruleForm.choseYear"
                    @change="selectYear"
                    placeholder="近两年"
                    style="width: 100%;"
                  >
                    <el-option value label="近两年"></el-option>
                    <el-option
                      v-for="yearItem in yearList"
                      :key="yearItem"
                      :label="yearItem"
                      :value="yearItem"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="拟稿日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange"
                      v-model="draftTime"
                      value-format="yyyy-MM-dd"
                      style="width: 100% !important;"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发文字号" prop="documentNo">
                  <el-input v-model="ruleForm.documentNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-col v-if="!down" class="arrowup" style="text-align:center;margin-bottom:10px;">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                  <!-- <el-button type="info" size="small" @click="arrow()">
                    <i class="el-icon-arrow-down el-icon--left"></i> 展开
                  </el-button> -->
                </el-col>
              </el-col>
            </el-row>
            <!-- <div v-if="down">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="拟稿日期">
                    <div class="block">
                      <el-date-picker
                        @change="timeChange(events)"
                        v-model="ruleForm.endTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                      ></el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="主办部门" prop="hostDepartment">
                    <el-input v-model="ruleForm.hostDepartment" readonly="readonly"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary">选择</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="公文状态">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="全部"></el-radio>
                    <el-radio label="流转"></el-radio>
                    <el-radio label="办结"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="发文形式">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="全部"></el-radio>
                    <el-radio label="电子"></el-radio>
                    <el-radio label="实物"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="发文类型">
                  <el-radio-group v-model="ruleForm.type">
                    <el-radio label="全部"></el-radio>
                    <el-radio label="行发文"></el-radio>
                    <el-radio label="部门发文"></el-radio>
                    <el-radio label="党务发文"></el-radio>
                    <el-radio label="会议纪要"></el-radio>
                    <el-radio label="工作简报"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col>
                  <el-row class="center">
                    <el-button type="primary" @click="submitForm">搜索</el-button>
                    <el-button type="primary" @click="resetForm">重置</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </div>

            <el-col class="down" v-if="down">
              <el-button type="info" size="small" @click="arrow()">
                <i class="el-icon-arrow-up el-icon--left"></i> 收起
              </el-button>
            </el-col> -->
          </el-form>
        </el-col>
        <el-col v-if="isEnd" class="mt20end">
          <el-button
            @click="handleBankDispach('1')"
            size="small"
            type="primary"
          >起草电子发文</el-button>
          <el-button
            @click="handleBankDispach('2')"
            size="small"
            type="primary"
            v-if="hasSWFWG"
          >起草实物发文</el-button>
          <!-- <span class="sysTirp">系统试运行期间，新系统只支持本行内业务流转，跨行业务请到原OA3.6中办理。</span> -->
        </el-col>
        <el-col style="margin: 10px 0;" :class="{'is10':bank_countersignature.state > 1}">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            :state="bank_countersignature.state"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @cellClick="cellClick"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
    </el-tabs>
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
            v-model="bank_chosDept.deptName"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in transArr"
              :key="item.firstUnitName"
              :label="item.firstUnitName"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showChosDept = false">取 消</el-button>
        <el-button type="primary" @click="handleChosDept(type_fw)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";

const finshData = [
  { label: "发文日期", prop: "AVYEXCTRTM", align: "center", width: "110px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "220px" },
  { label: "标题", prop: "TITLE", align: "left", minwidth:"40%" },
  { label: "发文种类", prop: "SENDTYPE", align: "center", width: "80px" }
]
const addData = [
  { label: "发文日期", prop: "sendTime", align: "center", width: "110px",
    formatter(row) {
      return (row.sendTime = dateFormate.date(Date.parse(new Date(row.sendTime))));
    }
  },
  { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
  { label: "标题", prop: "title", align: "left", minwidth:"40%" },
  { label: "主办部门", prop: "draftDepartment", align: "center", width: "80px" }
]
const otherData = [
  { label: "拟稿日期", prop: "DRAFTTIME", align: "center", width: "110px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "220px" },
  { label: "标题", prop: "TITLE", align: "left", minwidth:"40%" },
  { label: "发文种类", prop: "SENDTYPE", align: "center", width: "80px" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center", width: "120px" },
  { label: "当前处理人 ", prop: "CURRENTUSER", align: "center", width: "100px" }
]
const allData = [
  { label: "拟稿日期", prop: "draftTime", align: "center", width: "110px",
    formatter(row) {
      return (row.draftTime = dateFormate.date(Date.parse(new Date(row.draftTime))));
    }
  },
  { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
  { label: "标题", prop: "title", align: "left", minwidth:"40%" },
  { label: "发文种类", prop: "sendType", align: "center", width: "80px" },
  { label: "当前状态", prop: "isFlowEnd", align: "center", width: "80px" },
  { label: "当前环节", prop: "currentNode", align: "center", width: "120px" },
  { label: "当前处理人 ", prop: "currentUser", align: "center", width: "100px" }
]

export default {
  name: "DispatchFile",
  components: {
    mTable
  },
  data() {
    return {
      ZHFWG: false, // 增发页签只有总行发文岗可见
      hasSWFWG: false,
      bank_countersignature_all: {
        function: "getSendOrderList",
        state: 0
      },
      bank_countersignature: {
        function: "getWFTask",
        tplbsnid: "DZFW,SWFW",
        state: 1,
        totalCount:0
      },
      bank_getListAddSend: {
        function: "getListAddSend",
        state: 0
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
        documentNo: "", //发文字号
        // hostDepartment: "", //主办部门
        title: "", //标题
        draftTimeStart: "",
        draftTimeEnd: "",
        choseYear: "",
        // name: "",
        // region: "",
        // date1: "",
        // date2: "",
        // delivery: false,
        // type: "", //发文类型
        // resource: "",
        // resource1: "",
        // desc: ""
      },
      draftTime: [],
      yearList: [],
      tableLoading: false,
      activeName: sessionStorage.getItem('FWLISTtab')|| "tabs-wait", // 页码修改0823
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: true,
      isAll: false,
      currentTab: '1',
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },

      transArr: [],
      deptArr: [],
      deptSwArr: [],
      showChosDept: false,
      bank_chosDept: {
        function: '',
        deptName: '',
        humanId: ''
      },
      curhumanId: '',
      type_fw: ''
    };
  },
  mounted() {
    document.title="发文管理"
  },
  methods: {
    // 页面初始化加载数据
    handleLoadData(tabindex="1") {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      switch (tabindex) {
        case "0":
          this.activeName = "tabs-all";
          break;
        case "1":
          this.activeName = "tabs-wait";
          break;
        case "2":
          this.activeName = "tabs-done";
          break;
        case "3":
          this.activeName = "tabs-end";
          break;
        case "4":
          this.activeName = "tabs-add";
          break;
      }
      this.bank_countersignature.state = tabindex;
      this.currentTab = tabindex;
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(tabindex=="0") {
        this.$post.postData("getSendOrderList", JSON.stringify(Object.assign(this.bank_countersignature_all, this.ruleForm, this.pagination)), this.$businessCode.fawgl).then(res => {
          console.log(res);
          
          this.tableData = res.data&&res.data.rows||[];
          this.pagination.total = res.data&&res.data.total||0;
        })
      } else if(tabindex=="4") {
        this.$post.postData("getListAddSend", JSON.stringify(Object.assign(this.bank_getListAddSend, this.ruleForm, this.pagination)), this.$businessCode.fawgl).then(res => {
          console.log(res);
          
          this.tableData = res.data&&res.data.rows||[];
          this.pagination.total = res.data&&res.data.total||0;
        })
      } else {
        this.$post.postData("getWFTask", JSON.stringify(Object.assign(this.bank_countersignature, this.pagination)), this.$businessCode.ggfawgl).then(res => {
          console.log(res);
          this.tableData = res.data&&res.data.rows||[];
          this.pagination.total = res.data.total&&res.data.total||0;
          this.bank_countersignature.totalCount = res.data&&res.data.total||0;
        })
      }
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (!this.draftTime ||this.draftTime == "null" ||this.draftTime == "undefined") {
        this.ruleForm.draftTimeStart = "";
        this.ruleForm.draftTimeEnd = "";
        return false;
      }
      this.ruleForm.draftTimeStart = this.draftTime[0];
      this.ruleForm.draftTimeEnd = this.draftTime[1];
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      this.resetForm();
      sessionStorage.setItem('FWLISTtab',tab.name); // 页码修改0823
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_countersignature.state = tab.index;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.bank_countersignature.totalCount =0;
      if (tab.index == "0") {
        this.tableCols = allData;
        this.isAll = true
      } else {
        this.isAll = false;
      }
      if (tab.index == "1") {
        this.isEnd = true;
        this.tableCols = otherData
      } else {
        this.isEnd = false;
      }
      if (tab.index == "2") {
        this.tableCols = otherData
      }
      if (tab.index == "3") {
        this.tableCols = finshData;
      }
      if (tab.index == "4") {
        this.tableCols = addData;
      }
      this.handleLoadData(tab.index);
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData(this.currentTab)
    },

    handleSizeChange(val) {
      this.pagination.limit = val
      this.pagination.page = 1
      this.tableData = []
      this.handleLoadData(this.currentTab)
    },
    cellClick(row, column, cell, event) {
      let readType;
      let idType;
      let transPcsAvyId = "";
      if(this.bank_countersignature.state == 0){
        readType = row.readFlag ? row.readFlag : '';
        idType = row.id ? row.id : '';
        transPcsAvyId = row.pcsAvyId
      }else{
        readType = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
        transPcsAvyId = row.PCSAVYID
      }

      if(this.currentTab == '0' || this.currentTab == '1') {
        if (row.isFlowEnd == '办结') {
          if (row.sendType == '实物') {
            this.handleOpenPage('/bankEntityDispatchFinishRed', row.id, readType)
          } else if (row.sendType == '电子') {
            this.handleOpenPage('/bankDispachFinishRed', row.id, readType)
          }
        } else {
          // this.$post
          // .postData(
          //   "initCurUserDeptInfo",
          //   JSON.stringify({
          //     function: "initCurUserDeptInfo",
          //     pcsAvyId: transPcsAvyId
          //   }),
          //   this.$businessCode.ggfawgl
          // )
          // .then(res => {
            if(this.currentTab == '0') {
              if (row.isFlowEnd == '已办') {
                if (row.sendType == '实物') {
                  this.handleOpenPage('/bankEntityDispatchDone', row.id, readType)
                } else if (row.sendType == '电子') {
                  this.handleOpenPage('/bankDispachDone', row.id, readType)
                }
              } else if (row.isFlowEnd == '待办') {
                if (row.sendType == '实物') {
                  this.handleOpenPage('/bankEntityDispatch', row.id, readType, "bd")
                } else if (row.sendType == '电子') {
                  this.handleOpenPage('/bankDispach', row.id, readType, "bd")
                }
              }
            } else if (this.currentTab == '1') {
              if (row.SENDTYPE == '实物') {
                this.handleOpenPage('/bankEntityDispatch', row.ID, readType, "bd")
              } else if (row.SENDTYPE == '电子') {
                this.handleOpenPage('/bankDispach', row.ID, readType, "bd")
              }
            }
          // })
        }
      } else if (this.currentTab == '2') {
        if (row.SENDTYPE == '实物') {
          this.handleOpenPage('/bankEntityDispatchDone', row.ID, readType)
        } else if (row.SENDTYPE == '电子') {
          this.handleOpenPage('/bankDispachDone', row.ID, readType)
        }
      } else if (this.currentTab == '3') {
        if (row.SENDTYPE == '实物') {
          this.handleOpenPage('/bankEntityDispatchFinishRed', row.ID, readType)
        } else if (row.SENDTYPE == '电子') {
          this.handleOpenPage('/bankDispachFinishRed', row.ID, readType)
        }
      } else {
        this.handleOpenPage('/bankDispachAdd', row.id, readType)
      }
    },
    handleOpenPage (path, id, readType, flag) {
      if (flag=="bd") {
        let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
        if(routeId.includes(id)){
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "已经打开了该页面!",
            duration: 1500,
          })
          return;
        }
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag:readType,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      this.handleLoadData("0")
    },
    resetForm(formName) {
      this.draftTime = [];
			this.ruleForm = {
        draftTimeStart: "",
        draftTimeEnd: "",
        title: "",
        documentNo: "",
        choseYear: ""
      };
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
    },

    // 起草发文
    handleBankDispach(val) {
      this.type_fw = val;
      let newHref = '';
      this.transArr = val==1 ? this.deptArr : this.deptSwArr;
      let curDept = JSON.parse(localStorage.getItem("userInfo")).unitCodes
      this.transArr.forEach(element => {
        if(element.unitCodes == curDept) {
          this.bank_chosDept.deptName = val==1 ? element.humanId : element.currUnitName
        }
      });
      if(this.transArr.length>1) {
        this.showChosDept = true
      } else {
        let transPath = val=="1" ? '/bankDispach' : '/bankEntityDispatch'
        
        newHref = this.$router.resolve({
          path: transPath,
          human_Id: this.curhumanId
        })
        window.open(newHref.href, "_blank");
      }
    },
    handleChosDept() {
      if(this.bank_chosDept.deptName == "") {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择起草部门",
          duration: 1000
        });
        return;
      }
      let newHref = ''
      console.log(this.bank_chosDept.deptName)
      let transUnitInfo = localStorage.getItem("unitInfo")&&JSON.parse(localStorage.getItem("unitInfo"))||[]
      transUnitInfo.forEach(item => {
        // if (item.) {
          
        // }
      })
      // this.bank_chosDept.deptName
      this.$post.postData(
        "switchUserInfo",
        JSON.stringify({
          function: "switchUserInfo",
          human_Id: this.bank_chosDept.deptName
        }),
        this.$businessCode.ggfawgl
      ).then((res) => {
        this.showChosDept = false
        if(this.type_fw == "1") {
          newHref = this.$router.resolve({
            path: '/bankDispach'
          }) 
        } else {
          newHref = this.$router.resolve({
            path: '/bankEntityDispatch'
          }) 
        }        
        window.open(newHref.href, "_blank");
        this.bank_chosDept.deptName = "";
      })
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = '〔'+ openTimeYear +'〕'
    },
    selectYear(val) {
      this.ruleForm.choseYear = val;
      if (val=="") {
        this.defaultYear();
      } else {
        this.ruleForm.documentNo = '〔'+ val +'〕'
      }
    }
  },
  created() {
    this.defaultYear();
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.fawgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }})
    // 页码修改0823
    if(sessionStorage.getItem('FWLIST')){
      if(sessionStorage.getItem('FWLIST').state == 0){
        this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
      }else{
        this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
      }
    }
    // 页码修改0823 end
    let transArr = localStorage.getItem("unitInfo")&&JSON.parse(localStorage.getItem("unitInfo"))||[]
    if(transArr.length>0) {
      transArr.forEach(element => {
        if(element.firstUnitName != element.currUnitName) {
          element.currUnitName = element.firstUnitName+'/'+ element.currUnitName
        }
      });
    }
    let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||''
    this.curhumanId = userInfo.humanId
    if(transArr.length>1) {
      transArr.forEach(element => {
        if (element.unitId == userInfo.unitId) {
          this.deptArr.push(element)
        }
      });
    }
    let humanRole = localStorage.getItem("tcHumanRole")&&JSON.parse(localStorage.getItem("tcHumanRole"))||[];
    let isFWG = false;
    humanRole.forEach(item => {
      if (item.dicId==339) {
        this.hasSWFWG = true;
      } else if (item.dicId==334) {
        isFWG = true;
      }
    })
    // 起草实物发文时选择部门
    this.$post.postData("rsendG", JSON.stringify({function: "rsendG"}), this.$businessCode.fawgl).then(res => {
      let swArr = res.data&&res.data||[];
      if (swArr.length>0) {
        transArr.forEach(m => {
          swArr.forEach(n => {
            if(m.currUnitId == n.unitCode) {
              this.deptSwArr.push(m);
            }
          })
        })
      }
    })
    // 判断是否为总行发文岗
    this.ZHFWG = (userInfo.unitId=="U010000"&&isFWG);
    // 判断当前页签应停留在哪个位置（默认为待办，但增发处理后要回到增发列表页）
    let transIndex = localStorage.getItem('tabRecord')
    if(transIndex=="4") {
      this.activeName = "tabs-add";
      this.tableCols = addData;
      this.currentTab = 4;
    } else {
      this.activeName = "tabs-wait";
      this.tableCols = otherData;
      this.currentTab = 1;
    }
    localStorage.removeItem('tabRecord');

    this.handleTabsClick({'index':this.currentTab});
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
.arrowup{
  padding-left: 20px;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
/deep/ .el-tabs__header {
  margin: 0 0 7px !important;
}
.mtJ20 {
  margin-top: -20px!important;
  .mt20end {
    margin-top: 20px;
    .sysTirp {
      margin-left: 20px;
      font-size: 12px;
      color: red;
    }
  }
}

</style>
