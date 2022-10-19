/**
* create by zx on 2020-6-29 12:30
* 类注释：人员列表
* 备注：
*/
<template>
  <div class="personList">
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="查看人员" name="tabs-look"></el-tab-pane>
      <el-tab-pane label="注销人员" name="dele-look"></el-tab-pane>
      <el-tab-pane label="查看休眠" name="tabs-sleep"></el-tab-pane>
      <!-- 12.18不上，暂时注掉 -->
      <el-tab-pane label="文件交换柜人员管理" name="tabs-file"></el-tab-pane>
    </el-tabs>
    <!-- 查看人员 -->
    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='tabs-look'">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'1'">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择机构"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <select-org-or-dept
          @select="selectDept"
          :orgOrDept="0"
          :orgOrDeptId="searchData.humanUnitId"
        >
          <el-input
            type="text"
            readonly
            placeholder="请选择部门"
            v-model="searchData.deptName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入人员中文名" v-model="searchData.humanName"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="inquery">查询</el-button>
        <el-button type="primary" @click="logoutPerson">注销</el-button>
        <el-button type="primary" @click="toAdd()">新增</el-button>
        <el-button type="primary" @click="toSort()">排序</el-button>
      </el-col>
    </el-row>
    <!-- 注销人员 -->
    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='dele-look'">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'1'">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择机构"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <select-org-or-dept
          @select="selectDept"
          :orgOrDept="0"
          :orgOrDeptId="searchData.humanUnitId"
        >
          <el-input
            type="text"
            readonly
            placeholder="请选择部门"
            v-model="searchData.deptName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入人员中文名" v-model="searchData.humanName"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="inquery">查询</el-button>
        <!-- <el-button type="primary" @click="deletePerson">删除</el-button> -->
        <el-button type="primary" @click="deletePerson">删除</el-button>
        <el-button type="primary" @click="recoverPer">恢复</el-button>
        <el-button type="primary" @click="toSort()">排序</el-button>
      </el-col>
    </el-row>
    <!-- 查看休眠人员 -->
    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='tabs-sleep'">
      <el-col :span="6">
        <select-org-or-dept @select="selectSleepDept" :orgOrDept="1" :orgOrDeptId="'1'">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择机构"
            v-model="searchData.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <select-org-or-dept
          @select="selectSleepDeptabc"
          :orgOrDept="0"
          :orgOrDeptId="searchData.humanUnitId"
        >
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择部门"
            v-model="searchData.sleepDeptName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入人员中文名" v-model="searchData.humanName"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="sleeping">查询</el-button>
        <el-button type="primary" @click="jiedong">解冻</el-button>
        <el-button type="primary" @click="exportSelect">导出</el-button>
      </el-col>
      <!-- <el-col :span="12" style="text-align: right">
        <el-button type="primary" @click="toTi">提取人员</el-button>
        <el-button type="primary">同步常用发送对象</el-button>
      </el-col>-->
    </el-row>

    <!-- 查看文件交换人员配置 -->
    <!-- 12.18不上，暂时注掉 -->
    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='tabs-file'">
      <el-col :span="6">
        <el-button type="primary" @click="fileAdd">新建</el-button>
        <el-button type="danger" @click="delPerson">删除</el-button>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <m-table
      ref="PersonTable"
      @refresh="loadD"
      :isIndex="true"
      :sortable="false"
      :isSelection="true"
      @select="selectRow"
      @cellClick="cellClick"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import exportTable from "../../../../../minixs/exportTable";

export default {
  name: "personList",
  components: {
    mTable,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      validFlag: 1,
      //休眠
      num: 1,
      //判断跳转
      fileId: 0,

      activeName: "tabs-look",
      searchData: {
        // humanUnitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        humanUnitId: "",
        frozenStatus: 0,
        // orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        orgName: "",
        humanUnit: "",
        sleepDeptName: "",
        validFlag: 1,
      },
      formData: {},
      sortable: true,
      tableData: [],
      tableCols: [
        // { label: "人员序号", prop: "orderBy" },
        { label: "系统注册号", prop: "account" },
        { label: "中文名", prop: "humanName" },
        { label: "所属机构", prop: "humanOrgName" },
        { label: "所在部门", prop: "deptLevelName" },
        {
          label: "用户类型",
          prop: "humanType",
          formatter(row) {
            return row.humanType == 1 ? "个人" : "公用";
          },
        },
        { label: "所在岗位", prop: "humanPostName" },
      ],
      tableCols1: [
        // { label: "人员序号", prop: "orderBy" },
        { label: "系统注册号", prop: "account" },
        { label: "中文名", prop: "humanName" },
        { label: "所属机构", prop: "humanOrgName" },
        { label: "所在部门", prop: "deptLevelName" },
        {
          label: "用户类型",
          prop: "humanType",
          formatter(row) {
            return row.humanType == 1 ? "个人" : "公用";
          },
        },
        { label: "所在岗位", prop: "humanPostName" },
      ],

      //休眠
      tableCols2: [
        { label: "系统注册名", prop: "account" },
        { label: "中文名", prop: "humanName" },
        { label: "所属机构", prop: "humanOrgName" },
        { label: "所在部门", prop: "deptLevelName" },
        {
          label: "用户类型",
          prop: "humanType",
          formatter(row) {
            return row.humanType == 1 ? "个人" : "公用";
          },
        },
        { label: "未登录天数", prop: "frozenDay" },
      ],

      //文件交换柜人员管理
      tableCols3: [
        { label: "系统注册名", prop: "exchangeHumanName" },
        { label: "中文名", prop: "humanName" },
        { label: "部门类别", prop: "exchangeType" },
        { label: "部门名称", prop: "exchangeName" },
        { label: "AB角", prop: "exchangeRoleName" },
      ],
      selectIds: [],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  watch: {
    // 12.18不上，暂时注掉
    // activeName(val) {
    //   if (val === "tabs-file") {
    //     this.sortable = false;
    //     this.fileId = "2";
    //     this.tableCols = deepClone(this.tableCols3);
    //     this.loadD();
    //     // this.fileChange();
    //   }
    // },
  },
  computed: {},
  methods: {
    //  注销人员
    logoutPerson() {
      if (this.selectIds.length == 0) {
        this.$message({
          message: "请选择要注销的人员",
          type: "warning",
        });
        return;
      }
      this.$confirm("确定要注销选择的人员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log("------->", this.selectIds.join("|"));
        this.$api.setting.person
          .deletePersons({
            humanId: this.selectIds.join("|"),
            validFlag: 0,
            operatorType: "comCheck", //第一次校验
          })
          .then((res) => {
            console.log(777, res);
            if (res.code == "SUCCESS" && !res.data) {
              this.$message({
                message: "注销成功",
                type: "success",
              });
              this.loadData();
            } else if (res.code == "SUCCESS" && res.data == "isComUser") {
              this.$confirm(res.msg, "提示", {
                confirmButtonText: "是",
                cancelButtonText: "否",
                type: "warning",
              })
                .then(() => {
                  this.$api.setting.person
                    .deletePersons({
                      humanId: this.selectIds.join("|"),
                      validFlag: 0,
                      operatorType: "",
                    })
                    .then((res) => {
                      this.$message({
                        type: "success",
                        message: "注销成功",
                      });
                      this.loadData();
                    }); // 调用保存方法
                })
                .catch(() => {});
            } else if (res.code == "SUCCESS" && res.data == "isAlterUser") {
              this.$confirm(res.msg, "提示", {
                // confirmButtonText: "是",
                cancelButtonText: "关闭",
                type: "warning",
              })
                .then(() => {})
                .catch(() => {});
            }
          })
          .catch((err) => {
            // if (err.code == 'FAIL' && err.msg == 'isComUser') {
            //   this.$confirm(err.msg, '提示', {
            //     confirmButtonText: '是',
            //     cancelButtonText: '否',
            //     type: 'warning',
            //   })
            //     .then(() => {
            //       this.$api.setting.person.deletePersons(
            //         {
            //           humanId: this.selectIds.join('|'),
            //           validFlag: 0,
            //           operatorType: ''
            //         }
            //       ).then((err) => {
            //         this.$message({
            //           type: "success",
            //           message: "注销成功"
            //         });
            //       }) // 调用保存方法
            //     })
            //     .catch(() => {
            //     })
            // } else {
            //   this.$message({
            //     message: err.msg,
            //     type: "warning",
            //   });
            // }
          });
      });
    },
    //表格加载方法
    loadD() {
      if (this.activeName === "tabs-file") {
        // 12.18不上，暂时注掉
        this.fileChange();
      } else {
        this.loadData();
      }
    },
    fileAdd() {
      this.$router.push({
        path: "/setting/orgDepartment/personManage/fileChange",
        query: {
          isAdd: JSON.stringify(true),
        },
      });
    },
    selectOrg(org) {
      this.pagination.pageNum = 1;
      this.searchData.orgName = org.unitName;
      // this.searchData.humanUnit = org.id;

      this.searchData.humanUnitId = org.id;

      this.searchData.unitCode = org.id;
      this.searchData.deptName = "";
      this.searchData.humanUnit = "";
      this.loadData();
    },
    selectDept(dept) {
      this.pagination.pageNum = 1;
      this.searchData.deptName = dept.unitName;
      this.searchData.humanUnit = dept.id;
      this.loadData();
    },
    toSort() {
      // this.$intent.go(this, {
      //     path: "/setting/orgDepartment/personManage/sortPerson",
      // });
      this.$router.push({
        path: "/setting/orgDepartment/personManage/sortPerson",
      });
    },
    selectSleepDept(org) {
      this.pagination.pageNum = 1;
      this.searchData.orgName = org.unitName;
      // this.searchData.humanUnit = org.id;

      this.searchData.humanUnitId = org.id;

      this.searchData.unitCode = org.id;
      this.searchData.orgName = org.unitName;
      this.searchData.sleepDeptName = "";
      this.searchData.deptName = "";
      this.searchData.humanUnit = "";
      // this.searchData.sleepDeptName = org.unitName;
      // this.searchData.sleepDeptId = org.id;
      this.sleeping();
    },
    selectSleepDeptabc(dept) {
      this.pagination.pageNum = 1;
      this.searchData.sleepDeptName = dept.unitName;
      this.searchData.deptName = dept.unitName;
      this.searchData.humanUnit = dept.id;
      this.loadData();
    },
    //发起解冻
    jiedong() {
      if (this.selectIds.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择至少一条数据",
        });
        return;
      } else {
        let obj = {};
        obj.humanIds = this.selectIds;
        obj.frozenStatus = 0;
        this.$api.setting.person.relievePerson(obj).then((res) => {
          this.$message({
            message: "解冻成功！",
            type: "success",
          });
          this.searchData.frozenStatus = 1;
          this.sleeping();
        });
      }
    },
    exportSelect() {
      exportTable.exportExcel("人员列表");
    },

    //请求查看人员列表数据
    loadData() {
      console.log(3333, this.searchData);

      this.$api.setting.organization
        .getPeopleList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    selectRow(rows) {
      this.selectIds = [];
      rows.map((item) => {
        this.selectIds.push(item.humanId);
      });
    },
    deletePerson() {
      if (this.selectIds.length == 0) {
        this.$message({
          message: "请选择要删除的人员",
          type: "warning",
        });
        return;
      }
      this.$confirm("删除后不可恢复，确定要删除选择的人员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log("------->", this.selectIds.join("|"));
        this.$api.setting.person
          .deletePersons({
            humanId: this.selectIds.join("|"),
            validFlag: 2,
          })
          .then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.loadData();
          });
      });
    },
    //  恢复注销人员
    recoverPer() {
      if (this.selectIds.length == 0) {
        this.$message({
          message: "请选择要删除的人员",
          type: "warning",
        });
        return;
      }
      this.$confirm("确定要恢复选择的人员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.setting.person
          .deletePersons({
            humanId: this.selectIds.join("|"),
            validFlag: 1,
          })
          .then((res) => {
            this.$message({
              message: "恢复成功",
              type: "success",
            });
            this.loadData();
          });
      });
    },
    //请求休眠人员列表
    sleeping() {
      this.$api.setting.organization
        .getPeopleList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    //文件交换请求列表数据
    fileChange() {
      // { label: "系统注册名", prop: "exchangeHumanName" },
      //   { label: "中文名", prop: "humanName" },
      //   { label: "部门类别", prop: "exchangeType" },
      //   { label: "部门名称", prop: "exchangeName" },
      //   { label: "AB角", prop: "depar" },
      this.$api.setting.organization
        .getFileExchangeList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data));
          data.map((item) => {
            let humanNameArr = [];
            humanNameArr = item.exchangeHumanName.split("_");
            item.exchangeHumanName =
              humanNameArr[0] == "null" ? "" : humanNameArr[0];
            item.humanName = humanNameArr[1];
            let exchangeNameArr = [];
            let tempArr = [];
            let exchangeNameStr = "";
            exchangeNameArr = item.exchangeName.split("|");
            exchangeNameArr.forEach((item, index) => {
              let itemArr = [];
              itemArr = item.split("_");
              if (itemArr.length == 1) {
                tempArr.push(itemArr[0]);
              } else if (itemArr.length == 2) {
                tempArr.push(itemArr[1]);
              }
            });
            item.exchangeName = tempArr.join(",");
            item.exchangeType =
              item.exchangeType === 1
                ? "部门"
                : item.exchangeType === 2
                ? "领导"
                : item.exchangeType === 3
                ? "分行"
                : "";
          });
          this.tableData = data;
          this.pagination.total = res.total;
        });
    },
    //文件交换柜人员管理删除
    delPerson() {
      let selections = this.$refs.PersonTable.$refs.cesTable.selection;
      if (selections.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择一条数据！",
        });
      } else {
        this.$confirm("是否确定删除所选数据？").then(() => {
          let idsArr = [];
          selections.map((item) => {
            idsArr.push(item.id);
          });
          this.$api.setting.organization
            .updateFileExchange({
              ids: idsArr.join("|"),
              ifDel: 1,
            })
            .then((res) => {
              // this.fileChange();
              this.loadD();
            });
        });
      }
    },
    //点击列表条详情
    cellClick(row) {
      if (this.fileId == "2") {
        this.$intent.go(this, {
          name: "fileChange",
          query: { id: row.id, isAdd: JSON.stringify(false) },
        });
      } else {
        this.$intent.go(this, {
          name: "addPerson",
          query: {
            humanId: row.humanId,
            isAdd: JSON.stringify(false),
            searchData1: JSON.stringify(this.searchData),
            pagination1: JSON.stringify(this.pagination),
            activeName1: JSON.stringify(this.activeName),
            flag: 1,
          },
        });
      }

      // console.log("row", row);
      // if (this.fileId == "2") {
      //   this.$intent.go(this, {
      //     name: "fileChange",
      //     query: { id: row.id, isAdd: JSON.stringify(false) },
      //   });
      // } else {
      //   if (row.isVirtual === 0) {
      //     this.$intent.go(this, {
      //       name: "editPerson",
      //       query: {
      //         detail: JSON.stringify(row),
      //         isAdd: JSON.stringify(false),
      //       },
      //     });
      //   } else {
      //     this.$intent.go(this, {
      //       name: "addPerson",
      //       query: { humanId: row.humanId, isAdd: JSON.stringify(false) },
      //     });
      //   }
      // }
    },
    importUass() {
      this.$intent.go(this, { name: "importUass" });
    },
    toTi() {
      this.$intent.go(this, { name: "extract" });
    },
    //新增人员
    toAdd() {
      this.$router.push({
        // path: "/setting/orgDepartment/personManage/editPerson",
        path: "/setting/orgDepartment/personManage/addPerson",
        query: {
          isAdd: JSON.stringify(true),
        },
      });
    },
    //点击导航条切换
    handleTabsClick(tab) {
      this.pagination.pageNum = 1;
      let humanUnitId = "",
        orgName = "";
      this.tableData = [];
      this.selectIds = [];
      if (tab.index != 3) {
        this.$api.setting.organization
          .getTree({
            unitClass: 1,
            unitCode: "1",
            // type: '',
            // queryType: '',
            // seletSelf: 0
          })
          .then((res) => {
            let data = [];
            data = res.data;
            if (data && data.length > 0) {
              console.log(90999);
              orgName = data[0].unitName;
              humanUnitId = data[0].unitCode;
            } else {
              console.log(9099988);
              orgName = "";
              humanUnitId = "";
            }

            if (tab.index === "0") {
              // this.searchData.validFlag = 1
              // this.searchData.frozenStatus = 0
              this.searchData = {
                humanUnitId: humanUnitId,
                frozenStatus: 0,
                orgName: orgName,
                humanUnit: "",
                sleepDeptName: "",
                validFlag: 1,
              };
            } else if (tab.index === "1") {
              // this.searchData.validFlag = 0
              this.searchData = {
                humanUnitId: humanUnitId,
                orgName: orgName,
                humanUnit: "",
                sleepDeptName: "",
                validFlag: 0,
              };
            } else if (tab.index === "2") {
              // this.searchData.frozenStatus = 1
              // this.searchData.validFlag = 1
              this.searchData = {
                humanUnitId: humanUnitId,
                frozenStatus: 1,
                orgName: orgName,
                humanUnit: "",
                sleepDeptName: "",
                validFlag: 1,
              };
            }
            if (tab.index == 0 || tab.index == 1) {
              this.sortable = true;
              this.fileId = "0";
              this.tableCols = deepClone(this.tableCols1);
              console.log(9999, humanUnitId, "01", this.searchData.humanUnitId);
              if (this.searchData.humanUnitId) {
                this.loadData();
              }
            } else if (tab.index == 2) {
              this.sortable = true;
              this.fileId = "1";
              this.tableCols = deepClone(this.tableCols2);
              console.log(9999, humanUnitId, "2", this.searchData.humanUnitId);
              if (this.searchData.humanUnitId) {
                this.sleeping();
              }
            }
          })
          .catch((err) => {});
      } else {
        this.searchData = {
          humanUnitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
          frozenStatus: 0,
          orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
          humanUnit: "",
          sleepDeptName: "",
          validFlag: 1,
        };
        this.sortable = false;
        this.fileId = "2";
        this.tableCols = deepClone(this.tableCols3);
        this.loadD();
      }
      // this.loadData();
    },
    // 查看人员查询
    inquery() {
      this.loadData();
    },
  },
  activated() {},
  mounted() {},
  created() {
    if (
      this.$route.query &&
      this.$route.query.flag2 &&
      this.$route.query.flag2 == 2
    ) {
      if (this.$route.query.activeName2) {
        this.searchData = JSON.parse(this.$route.query.searchData2);
        this.pagination = JSON.parse(this.$route.query.pagination2);
        this.activeName = this.$route.query.activeName2;
        this.loadD();
      }
    } else if (this.$route.query && this.$route.query.activeName) {
      this.searchData = {
        humanUnitId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        frozenStatus: 0,
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        humanUnit: "",
        sleepDeptName: "",
        validFlag: 1,
      };
      this.activeName = this.$route.query.activeName;
      this.sortable = false;
      this.fileId = "2";
      this.tableCols = deepClone(this.tableCols3);
      this.loadD();
    } else {
      this.$api.setting.organization
        .getTree({
          unitClass: 1,
          unitCode: "1",
        })
        .then((res) => {
          let data = [];
          data = res.data;
          if (data && data.length > 0) {
            this.searchData.orgName = data[0].unitName;
            this.searchData.humanUnitId = data[0].unitCode;
            this.loadD();
          }
        })
        .catch((err) => {});
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.del {
  margin-left: 10px;
}
</style>

