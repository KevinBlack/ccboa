<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <!-- <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="未阅" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已阅" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>-->
      <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>

      <el-row class="mtJ20">
        <el-col v-if="bank_countersignature.state==0">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20 transition_wrap"
            :class="{mtdown:down}"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="文号年份" prop="choseYear">
                  <el-select
                    v-model="bank_countersignature.choseYear"
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
              <el-col :md="12" :lg="6" :xl="4">
                <el-form-item label="收文日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange"
                      v-model="ruleForm.searchTime"
                      type="daterange"
                      align="left"
                      :clearable="false"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="bank_countersignature.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收文字号" prop="documentCode">
                  <el-input v-model="bank_countersignature.documentCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="10" :xl="6">
                <el-col v-if="!down" class="arrowup">
                  <el-button type="primary" @click="initData('btn')">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                  <el-button type="info" size="small" @click="arrow()">
                    <i class="el-icon-arrow-down el-icon--left"></i> 展开
                  </el-button>
                </el-col>
              </el-col>
            </el-row>
            <div v-if="down" class="clearfix">
              <el-row>
                <el-form-item label="收文形式">
                  <el-radio-group v-model="searchParams.receive_type">
                    <el-radio label="全部"></el-radio>
                    <el-radio label="电子收文"></el-radio>
                    <el-radio label="实物收文"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col>
                  <el-row class="center">
                    <el-button type="primary" @click="initData('btn')">搜索</el-button>
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
        <!-- <el-col class="mt20end">     -->
        <el-col class="mt20end" v-if="isEnd">
          <el-button v-if="isAddShow" type="primary" size="small" @click="handleBankDispach('1')">起草实物收文</el-button>
          <el-button v-if="isAddShowBm" type="primary" size="small" @click="handleBankDispach('2')">起草实物(部门)收文</el-button>
        </el-col>
        <el-col style="margin: 10px 0;" :class="{'is10':bank_countersignature.state > 1}">
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
            @cellStyle="cellStyle"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
        <!--选择部门-->
        <el-dialog
          :visible.sync="showChosDept"
          v-dialogDrag
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          title="选择部门"
        >
          <el-form>
            <el-form-item>
              <el-select v-model="bank_chosDept.deptName" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in deptArr"
                  :key="item.currUnitName"
                  :label="item.currUnitName"
                  :value="item.humanId"
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
const finshData = [
  //READFLAG
  { label: "到达时间", prop: "TMS", align: "center",width:'145' },
  { label: "收文日期", prop: "RECEIVETIME", align: "center",width:'90' },
  { label: "收文字号", prop: "DOCUMENTCODE", align: "center",width:'200' },
  { label: "是否督办", prop: "ISSUPERVISE", align: "center",width:'70' },
  { label: "标题", prop: "TITLE", align: "left",minwidth:'150' },
  { label: "当前环节", prop: "PCSAVYNM", align: "center",width:'120' },
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center",width:'80' },
  {
    label: "收文类型",
    prop: "RECEIVEDOCTYPE",
    align: "center",
    width:'80',
    formatter(row) {
      return row.RECEIVEDOCTYPE == 1 ? "电子收文" : "实物收文";
    }
  }
];
const banjiehData = [
  //READFLAG
  { label: "收文日期", prop: "RECEIVETIME", align: "center",width:'90' },
  { label: "收文字号", prop: "DOCUMENTCODE", align: "center",width:'250' },
  {
    label: "是否督办",
    prop: "ISSUPERVISE",
    align: "center",
    width:'70',
    formatter(row) {
      //return item.ISSUPERVISE = item.ISSUPERVISE == 0 ? "否":"是";
    }
  },
  { label: "标题", prop: "TITLE", align: "left",minwidth:'150' },
  /*{ label: "当前环节", prop: "PCSAVYNM", align: "center" },
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center" },*/
  {
    label: "收文类型",
    prop: "RECEIVEDOCTYPE",
    align: "center",
    width:'80',
    formatter(row) {
      return row.RECEIVEDOCTYPE == 1 ? "电子收文" : "实物收文";
    }
  },
  {
    label: "是否行内收文",
    prop: "ISINNER",
    align: "center",
    width:'100',
    formatter(row) {
      return row.ISINNER == 0 ? "行内" : "行外";
    }
  }
];
const firstData = [
  //READFLAG
  { label: "到达时间", prop: "createTime", align: "center" ,width:'145'},
  { label: "收文日期", prop: "receiveTime", align: "center" ,width:'90'},
  { label: "收文字号", prop: "documentCode", align: "center",width:'200' },
  { label: "是否督办", prop: "isSupervise", align: "center",width:'70' },
  { label: "标题", prop: "title", align: "left",minwidth:'150' },
  // { label: "正文字数", prop: "receiveWords", align: "center" },
  // { label: "承办部门", prop: "undertakeDeptName", align: "center" },
  { label: "当前环节", prop: "curNodeName", align: "center",width:'120' },
  { label: "当前处理人", prop: "curUser", align: "center",width:'80' },
  { label: "收文类型", prop: "receiveType", align: "center",width:'80' }
];
export default {
  name: "ReceiveFile",
  components: {
    mTable
  },
  data() {
    return {
      yearList:[],
      beginType:"",
      fwTranId: this.$businessCode.swgl,
      isAddShow: false,
      isAddShowBm: false,
      bank_countersignature: {
        choseYear:"",
        function: "getWFTask",
        state: 1,
        //tplbsnid:'DZSW,SWSW',
        tplbsnid: "SWSW,DZSW,SWSWCT",
        title: "",
        documentCode: "〔〕",
        startTime: "",
        receive_type: "",
        endTime: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0
      },

      searchParams: {
        receive_type: "全部"
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
        receive_type: "全部",
        documentCode: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        startTime: "",
        endTime: "",
        searchTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: ""
      },
      tableLoading: false,
      activeName: sessionStorage.getItem('tab_sw') ||"tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: true,
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      showChosDept: false,
      deptArr: [],
      bank_chosDept: {
        function: "",
        deptName: ""
      },
      curhumanId: ""
    }
  },
  created() {
    this.$post
        .postData(
          "selTableYear",
          JSON.stringify({ function: "selTableYear" }),
          this.$businessCode.swgl
        ).then(res => {
          if(res){
            this.yearList = res.data
          }
      })
    if(sessionStorage.getItem('page_sw')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('page_sw')));
      this.searchParams.receive_type=this.bank_countersignature.receive_type;
      if(this.bank_countersignature.startTime && this.bank_countersignature.endTime){
        this.ruleForm.searchTime=[this.bank_countersignature.startTime,this.bank_countersignature.endTime]
      }
      this.pagination={
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }
    if(sessionStorage.getItem('tab_sw')){
      this.activeName=sessionStorage.getItem('tab_sw');
      if (this.activeName == 'tabs-all') {
        this.tableCols = firstData;
      } else if (this.activeName == 'tabs-end') {
        this.tableCols = banjiehData;
      } else {
        this.tableCols = finshData;
      }
      if (this.activeName == "tabs-wait") {
        this.isEnd = true;
      } else {
        this.isEnd = false;
      }
    }
    this.initData();
    //this.isHasAdd();
    let tchomanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
    for(let i = 0;i<tchomanRole.length;i++){
      if(tchomanRole[i].dicCode == 'recieveG'){
        this.isAddShow = true;
      }
      if(tchomanRole[i].dicCode == 'recievebmG'){
        this.isAddShowBm = true;
      }
    }
    let transArr =
      (localStorage.getItem("unitInfo") &&
        JSON.parse(localStorage.getItem("unitInfo"))) ||
      [];
    if (transArr.length > 0) {
      transArr.forEach(element => {
        if (element.firstUnitName != element.currUnitName) {
          element.currUnitName =
            element.firstUnitName + "/" + element.currUnitName;
        }
      });
    }
    let userInfo =
      (localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo"))) ||
      "";
    this.curhumanId = userInfo.humanId;
    if (transArr.length > 1) {
      transArr.forEach(element => {
        if (element.unitId == userInfo.unitId) {
          this.deptArr.push(element);
        }
      });
      let curDept = JSON.parse(localStorage.getItem("userInfo")).humanId;
      this.deptArr.forEach(element => {
        if (element.humanId == curDept) {
          this.bank_chosDept.deptName = element.humanId;
        }
      });
    }
  },
  mounted() {
    document.title="收文管理"
  },
  methods: {
    routeYear(){
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
    },
    selectYear(val) {
      this.bank_countersignature.choseYear = val;
      // this.$router.push({
      //   query: {
      //     choseYear: val
      //   }
      // })      
    },
    isHasAdd() {
      this.$post
        .postData(
          "getDraftAuth",
          JSON.stringify({ function: "getDraftAuth" }),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.success == true) this.isAddShow = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData(type) {
      this.$router.push({
        query: {
          choseYear: this.bank_countersignature.choseYear
        }
      })
      sessionStorage.setItem('page_sw',JSON.stringify(this.bank_countersignature));
      if(type=='btn'){
        this.pagination.page=1;
        this.pagination.limit=20;
        this.bank_countersignature.page=1;
        this.bank_countersignature.limit=20;
      }
      if (this.searchParams.receive_type === "全部") {
        this.bank_countersignature.receive_type = "";
      } else {
        this.bank_countersignature.receive_type = this.searchParams.receive_type;
      }
      if (this.bank_countersignature.state == "0") {
        Object.assign(this.bank_countersignature, { function: "selectByPage" });
        this.$post
          .postData(
            "selectByPage",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.tableData.forEach(item => {
              item.isSupervise =
                !item.isSupervise || item.isSupervise == 0 ? "否" : "是";
              if (item.RECEIVETIME) {
                item.RECEIVETIME = dateFormate.date(
                  Date.parse(item.RECEIVETIME)
                );
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //
        Object.assign(this.bank_countersignature, { function: "getWFTask" });
        this.$post
          .postData(
            "getWFTask",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.swglgg
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.bank_countersignature.totalCount =
              (res.data && res.data.total) || 0;
            this.tableData.forEach(item => {
              item.ISSUPERVISE =
                !item.ISSUPERVISE || item.ISSUPERVISE == 0 ? "否" : "是";
              if (item.RECEIVETIME) {
                item.RECEIVETIME = dateFormate.date(
                  Date.parse(item.RECEIVETIME)
                );
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    arrow() {
      this.down = !this.down;
      if (this.down == false) {
        this.searchParams.receive_type = "全部";
        this.bank_countersignature.receive_type = "全部";
      }
    },
    timeChange() {
      if (this.ruleForm.searchTime[0]) {
        this.bank_countersignature.startTime = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[0])
        );
        this.bank_countersignature.endTime = dateFormate.date(
          Date.parse(this.ruleForm.searchTime[1])
        );
      }
    },
    handleTabsClick(tab, event) {
      this.tableData = [];
      this.bank_countersignature.totalCount = 0;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      if (tab.index == 0) {
        this.tableCols = firstData;
      } else if (tab.index == 3) {
        this.tableCols = banjiehData;
      } else {
        this.tableCols = finshData;
      }
      if (tab.index == "1") {
        this.isEnd = true;
      } else {
        this.isEnd = false;
      }
      this.bank_countersignature.state = tab.index;
      sessionStorage.setItem('tab_sw',tab.name);
      this.initData();
      if(tab.index != 0){
        this.bank_countersignature.choseYear = "";
        this.routeYear()
      }
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleBankDispach(val) {
      this.beginType = val
      if (this.deptArr.length > 0) {
        this.showChosDept = true;
      } else {
        let routeData = "";
        if (val == "1") {
          routeData = this.$router.resolve({
            path: "/receiveDispatch"
          });
          window.open(routeData.href, "_blank");
        } else {
          routeData = this.$router.resolve({
            path: "/receiveDispatch",
            query:{
              receiveVersion:5
            },
          });
          window.open(routeData.href, "_blank");
        }
      }
    },
    handleChosDept() {
      if (this.bank_chosDept.deptName == "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择起草部门",
          duration: 1000
        });
        return;
      }
      let newHref = "";
      this.$post
        .postData(
          "switchUserInfo",
          JSON.stringify({
            function: "switchUserInfo",
            human_Id: this.bank_chosDept.deptName
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          this.showChosDept = false;
          let routeData = "";
          if (this.beginType == "1") {
            routeData = this.$router.resolve({
              path: "/receiveDispatch"
            });
            window.open(routeData.href, "_blank");
          } else {
            routeData = this.$router.resolve({
              path: "/receiveDispatch",
              query:{
                receiveVersion:5
              },
            });
            window.open(routeData.href, "_blank");
          }

        });
    },
    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellStyle(rows, column, rowIndex, columnIndex) {
      console.log(rows);
    },
    cellClick(row, column, cell, event) {
      let readType;
      let idType;
      let pcsAvyId;
      if (this.bank_countersignature.state == 0) {
        readType = row.readFlag ? row.readFlag : "";
        idType = row.id ? row.id : "";
        pcsAvyId = row.pcsAvyId ? row.pcsAvyId : "";
      } else {
        readType = row.READFLAG ? row.READFLAG : "";
        idType = row.ID ? row.ID : "";
        pcsAvyId = row.PCSAVYID ? row.PCSAVYID : "";
      }
      this.$post
        .postData(
          "initCurUserDeptInfo",
          JSON.stringify({
            function: "initCurUserDeptInfo",
            pcsAvyId: pcsAvyId
          }),
          this.$businessCode.swglgg
        )
        .then(res => {
          if (
            this.bank_countersignature.state == 2 ||
            this.bank_countersignature.state == 3
          ) {
            const routeData = this.$router.resolve({
              path: row.RECEIVEDOCTYPE == 1 ? "/receiveDzBjYb" : "/receiveBjYb",
              query: {
                id: idType,
                receiveType: row.RECEIVETYPE,
                readFlag: readType,
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
          } else {
            let readOnlys = ["已办", "办结"];
            if (this.bank_countersignature.state == 0) {
              if (row.status == "已办" || row.status == "办结") {
                const routeData = this.$router.resolve({
                  path:
                    row.receiveType == "电子收文"
                      ? "/receiveDzBjYb"
                      : "/receiveBjYb",
                  query: {
                    id: idType,
                    stateF: readOnlys[row.STATUS] ? true : false,
                    readFlag: readType,
                    choseYear: this.$route.query.choseYear
                  }
                });
                window.open(routeData.href, "_blank");
              } else {
                const routeData = this.$router.resolve({
                  path:
                    row.receiveType == "电子收文"
                      ? "/receiveElectronDispatch"
                      : "/receiveDispatch",
                  query: {
                    id: idType,
                    stateF: readOnlys[row.STATUS] ? true : false,
                    readFlag: readType,
                    choseYear: this.$route.query.choseYear
                  }
                });
                let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];//2022-4-8
                if(routeId.includes(idType)){//2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500,
                  })
                  return;
                }
                window.open(routeData.href, "_blank");
              }
            } else {
              const routeData = this.$router.resolve({
                path:
                  row.RECEIVEDOCTYPE == 1
                    ? "/receiveElectronDispatch"
                    : "/receiveDispatch",
                query: {
                  id: idType,
                  stateF: readOnlys[row.STATUS] ? true : false,
                  readFlag: readType,
                  choseYear: this.$route.query.choseYear
                }
              });
              let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
              if(routeId.includes(idType)){
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: "已经打开了该页面!",
                  duration: 1500,
                })
                return;
              }
              window.open(routeData.href, "_blank");
            }
          }
        });
    },
    submitForm(formName) {
      /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
    },
    resetForm() {
      this.bank_countersignature.choseYear = "",
      this.$refs.ruleForm.resetFields();
      this.ruleForm.searchTime = "";
      this.bank_countersignature.title = "";
      this.bank_countersignature.documentCode = "〔〕";
      this.bank_countersignature.receive_type = "全部";
      this.bank_countersignature.startTime = "";
      this.bank_countersignature.endTime = "";
      this.bank_countersignature.receive_type = "全部";
      this.searchParams.receive_type = "全部";
      this.routeYear();
      this.tableData = [];
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
.el-table .warning-row {
  color: red;
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
  margin-bottom: 20px;
}
.down {
  position: absolute;
  bottom: -71px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}
.clearfix {
  clear: both;
  padding-bottom: 71px;
}
.transition_wrap {
  transition: all 0.3s ease-in-out;
}
.mtJ20>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
</style>
