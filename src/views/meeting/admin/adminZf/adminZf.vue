<!--
 * @Author: your name
 * @Date: 2020-08-03 14:55:17
 * @LastEditTime: 2021-08-30 17:03:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\admin\adminZf\adminZf.vue
--> 


/**
* create by zz on 2020/8/3 15:00
* 类注释：
* 备注：管理员查看/制发
*/
<template>
  <div class="adminZf">
    <el-tabs v-model="sonselect" @tab-click="handleClick">
      <el-tab-pane label="流转" name="1"></el-tab-pane>
      <el-tab-pane label="办结" name="3"></el-tab-pane>
    </el-tabs>
    <el-form :model="formData" ref="ruleForm" label-width="100px" class="demo-ruleForm mt20">
      <el-row style="margin-bottom: 10px">
        <el-col :span="8">
          <el-form-item label="办结年份" prop="choseYear">
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
          <el-form-item label="机构名称">
            <select-org-or-dept
              @select="selectOrg"
              :orgOrDept="1"
              :orgOrDeptId="'1'"
              style="width:100%;"
            >
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择机构"
                v-model="formData.curbank"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主办部门">
            <select-org-or-dept
              @select="selectDept"
              :orgOrDept="0"
              :orgOrDeptId="formData.curbankId"
              style="width:100%;"
            >
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择主办部门"
                v-model="formData.maindept"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-col :span="8">
          <el-form-item label="时间">
            <el-date-picker
              v-model="value1"
              type="daterange"
              style="width:100%"
              range-separator="-"
              start-placeholder="开始日期"
              :default-time="['00:00:00','23:59:59']"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="会议名称">
            <el-input placeholder="请输入会议名称" clearable v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拟稿人">
            <el-input placeholder="请输入拟稿人" clearable v-model="formData.authorCn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通知类型">
            <el-select v-model="formData.types" placeholder="请选择通知类型" style="width:100%">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align: center;margin-bottom: 10px;" :span="24">
          <el-button type="primary" @click="adminSearch">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button type="danger" @click="deleteData" style="float:right;">删除</el-button>
        </el-col>
      </el-row>
    </el-form>
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      :isSelection="true"
      size="medium"
      :searchData="formData"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :default-sort="{prop:'draftDate',order:'desc'}"
      :pageSizeList="pageSizeList"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import { mapActions } from "vuex";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  name: "adminZf",
  components: {
    mTable,
    selectOrgOrDept
  },
  mixins: [bianhanPublic],
  data() {
    return {
      value1: [],
      yearList: [],
      formData: {
        curbankId: "",
        curbank: "",
        maindept: "",
        maindeptId: "",
        joinmeetDeptId: "",
        title: "",
        types: 1,
        authorCn: "",
        sort: "desc",
        sortKey: "draftDate",
        numYear: "",
        numYearLabel: "近两年"
      },
      value3: "",
      needTodoNum: 0,
      value: "",
      options: [],
      result: [],
      orgOrDeptId: "",
      tableData: [],
      tableCols: [
        {
          label: "拟稿日期",
          prop: "draftDate",
          formatter(row) {
            return row.draftDate.split(" ")[0];
          },
          width: 200
        },
        { label: "名称", prop: "title", minwidth: 338 },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            return row.type == "培训会议通知" ? "培训通知" : row.type;
          },
          width: 200
        },
        { label: "当前处理人", prop: "currentUser", width: 200 },
        { label: "拟稿人", prop: "authorCn", width: 200 }
      ],
      tableCols1: [
        {
          label: "拟稿日期",
          prop: "draftDate",
          formatter(row) {
            return row.draftDate.split(" ")[0];
          },
          width: 200
        },
        { label: "名称", prop: "title", minwidth: 338 },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            return row.type == "培训会议通知" ? "培训通知" : row.type;
          },
          width: 200
        },
        { label: "当前处理人", prop: "currentUser", width: 200 },
        { label: "拟稿人", prop: "authorCn", width: 200 }
      ],
      tableCols2: [
        {
          label: "拟稿日期",
          prop: "draftDate",
          formatter(row) {
            return row.draftDate.split(" ")[0];
          },
          width: 260
        },
        { label: "名称", prop: "title", minwidth: 338 },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            return row.type == "培训会议通知" ? "培训通知" : row.type;
          },
          width: 260
        },
        { label: "拟稿人", prop: "authorCn", width: 260 }
      ],
      pageSizeList: [20, 30, 50, 100, 200, 500],
      pagination: {
        pageNum: 1,
        // total: 0,
        pageSize: 20
      },
      sonselect: "1",
      newArr: [],
      deleteArr: [],
      typeOptions: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "系统会议通知"
        },
        {
          value: 3,
          label: "本部会议通知"
        },
        {
          value: 4,
          label: "部门会议通知"
        },
        {
          value: 5,
          label: "培训通知"
        }
      ]
    };
  },
  methods: {
    selectYear(val) {
      this.formData.numYear = val.value;
      this.formData.numYearLabel = val.label;
    },
    getNumYearList() {
      this.getNumYearListCommon().then(res => {
        this.yearList = res;
      });
    },
    reset() {
      this.formData.maindept = "";
      this.formData.maindeptId = "";
      this.formData.title = "";
      this.formData.types = 1;
      this.formData.authorCn = "";
      this.formData.maindept = "";
      this.formData.draftBeginDate = "";
      this.formData.joinmeetDeptId = "";
      this.formData.draftEndDate = "";
      this.value1 = [];
      this.formData.numYear = "";
      this.formData.numYearLabel = "近两年";
      this.formData.sort = "desc";
      this.formData.sortKey = "draftDate";
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArr = dataArry;
    },
    //批量删除表格数据
    deleteData() {
      if (this.deleteArr == 0) {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据"
        });
      } else {
        this.$confirm(
          "将彻底删除该文件及其所有关联文件，且无法恢复，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "否",
            type: "warning"
          }
        ).then(() => {
          this.$api.meeting
            .adminDelete({
              ids: this.deleteArr,
              type: "zf",
              unitId: this.formData.curbankId,
              curUnitId: JSON.parse(localStorage.getItem("userInfo")).currUnitId
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.deleteArr = [];
                this.loadData(1);
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              }
            });
        });
      }
    },
    selectOrg(org) {
      console.log(org);
      this.$set(this.formData, "curbank", org.unitName);
      this.formData.curbankId = org.id;
      this.$set(this.formData, "maindept", "");
      this.formData.maindeptId = "";
      console.log(999, this.formData);
    },
    selectDept(org) {
      if (!this.formData.curbankId) {
        this.$message({
          message: "请先选择机构",
          type: "success"
        });
      } else {
        this.$set(this.formData, "maindept", org.unitName);
        this.formData.maindeptId = org.id;
      }
    },
    adminSearch() {
      if (this.formData.curbankId) {
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        if (this.value1 && this.value1.length > 0) {
          this.formData.draftBeginDate = formatData(
            this.value1[0].getTime(),
            "YYYY-MM-DD HH:mm:ss"
          );
          this.formData.draftEndDate = formatData(
            this.value1[1].getTime(),
            "YYYY-MM-DD HH:mm:ss"
          );
        } else {
          this.formData.draftBeginDate = "";
          this.formData.draftEndDate = "";
        }
        this.loadData();
      } else {
        this.$message({
          message: "请先选择机构",
          type: "warning"
        });
      }
    },
    loadData(type) {
      let types = 1;
      types = this.formData.types;
      if (types) {
        switch (types) {
          case 1:
            this.formData.type = "";
            break;
          case 2:
            this.formData.type = "系统会议通知";
            break;
          case 3:
            this.formData.type = "本部会议通知";
            break;
          case 4:
            this.formData.type = "部门会议通知";
            break;
          case 5:
            this.formData.type = "培训会议通知";
            break;
        }
      }
      if (!type) {
        this.pagination.pageNum = 1;
      }
      this.formData.typeNew = this.sonselect;
      // if (this.value1.length > 0) {
      //   this.formData.draftBeginDate = formatData(this.value1[0].getTime(), "YYYY-MM-DD HH:mm:ss")
      //   this.formData.draftEndDate = formatData(this.value1[1].getTime(), "YYYY-MM-DD HH:mm:ss")
      // } else {
      //   this.formData.draftBeginDate = ''
      //   this.formData.draftEndDate = ''
      // }
      this.$api.meeting
        .adminZfTable(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.tableData = res.list;
          this.pagination.total = res.total;
          // this.result = res.list
        });
    },
    cellClick(val) {
      // this.setTodoItem(val)
      // this.$intent.goNewPage(this, {
      //   path: "/meeting/admin/adminZfDetail",
      //   query: { id: val.id },
      // });
      this.hasOpened(val.id, {
        name: "adminZfDetail",
        query: {
          id: val.id,
          numyear: this.formData.numYear
        }
      });
      // if (this.sonselect == 0) {
      //   //            if(1){
      //   // this.$intent.goNewPage(this, {
      //   //           path: "/meeting/zf/zfTwo",
      //   //           query: { id: val.id, leixing: val.type },
      //   //         });
      //   //            }else{
      //   // this.$intent.goNewPage(this, {
      //   //           path: "/meeting/zf/zfDoneDetail",
      //   //           query: { id: val.id, type: this.sonselect},
      //   //         });
      //   //            }
      // } else if (this.sonselect == 1) {
      //   this.$intent.goNewPage(this, {
      //     path: "/meeting/zf/zfTwo",
      //     query: { id: val.id, leixing: val.type },
      //   });
      // } else {
      //   this.$intent.goNewPage(this, {
      //     path: "/meeting/zf/zfDoneDetail",
      //     query: { id: val.id, type: this.sonselect, leixing: val.type },
      //   });
      // }
    },
    handleClick() {
      if (this.sonselect == "3") {
        this.tableCols = this.tableCols2;
      } else {
        this.tableCols = this.tableCols1;
      }
      // this.pagination.pageNum = 1
      this.loadData();
    }
  },

  created() {
    this.$api.setting.organization
      .getTree({
        unitClass: 1,
        unitCode: "1"
      })
      .then(res => {
        let data = [];
        data = res.data;
        if (data && data.length > 0) {
          this.formData.curbank = data[0].unitName;
          this.formData.curbankId = data[0].unitCode;
          this.loadData();
        }
      })
      .catch(err => {});

    this.getNumYearList();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.zfLz {
  background: white;
  margin: 0 auto;
  .lzHeader {
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
}
.mt20 {
  padding: 20px 5px 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
  margin-bottom: 20px;
}
.mtdown {
  padding: 20px 0 80px 0;
}
</style>

