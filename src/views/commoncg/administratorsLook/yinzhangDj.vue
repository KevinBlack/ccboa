'
' @Author: ylp
' @Date: 2020-12-21 14:03:16
' @LastEditTime: 2020-12-23 16:28:42
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA1\src\views\sealManage\statistical\introductionStatistical.vue 印章登记
'
<template>
  <div>
    <div class="draft">
      <!-- <el-tabs v-model="activeTab">
        <el-tab-pane label="在职印章保管人" name="transfer"></el-tab-pane>
        <el-tab-pane label="非在职印章保管人" name="done"></el-tab-pane>
      </el-tabs>-->
      <el-form ref="statisticalForm" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请机构">
              <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'0'">
                <el-input
                  type="text"
                  readonly
                  placeholder="机构名称"
                  v-model="form.draftOrgan"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请日期">
              <el-date-picker
                v-model="draftTime1"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator
                style="width:100%"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="印章名称">
              <el-input v-model="form.sealName" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="danger" @click="deleteForms" style="float:right;">删除</el-button>

      <m-table
        @refresh="loadData()"
        @cellClick="cellClick"
        @select="select"
        size="medium"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
        :searchData="formList"
        :pageSizeList="[20,30,50,100,200,500]"
      ></m-table>
    </div>
  </div>
</template>
<script>
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import exportTable from "../../../minixs/exportTable";
import glKook from "../../../util/glLook";

export default {
  name: "yzdj",
  components: {
    mTable,
    selectOrgOrDept
  },
  data() {
    return {
      draftTime1: [],
      // 搜索数据参数
      form: {
        draftOrganId: "", //机构id
        sealName: "", //标题
        startDate: "", //申请开始日期
        endDate: "" //申请结束日期
      },
      //   列表参数
      formList: {
        draftOrganId: "", //机构id
        sealName: "", //申请开始日期
        endDate: "", //申请结束日期
        startDate: ""
      },
      // 机构ID
      unitCode: "",
      tableData: [],
      // 列表默认加载页签
      activeTab: "transfer",
      // 区分调用接口 2已完结 4流转中
      
      
      tableCols: [
        { label: "启用日期", prop: "useDate" ,width: 150},
        { label: "废止日期", prop: "desDate",width: 150 },
        { label: "销毁日期", prop: "desDate1" ,width: 150},
        { label: "印章名称", prop: "sealName" },
        { label: "印章状态", prop: "sealStatus" ,formatter(row) {
            return glKook.Names[row.sealStatus];
          },width: 100},
        { label: "使用单位", prop: "userJg" },
        
        {
          label: "是否存在用印机中",
          prop: "isLocate",
          formatter(row) {
            return glKook.types[row.isLocate];
          }
        }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      selectIds: [] //删除id集合
    };
  },
  watch: {
    draftTime1(val, oldVal) {
      console.log(val, oldVal);
      if (val == null) {
        this.draftTime1 = [];
      }
    }
  },
  mounted() {},

  methods: {
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.selectIds = dataArry.join(',');
      console.log(this.selectIds);
    },

    deleteForms() {
      if (this.selectIds == 0) {
        this.$message({
          message: "请选择要删除的数据！",
          type: "error"
        });
        return;
      }
      this.$confirm(
        "将彻底删除该文件及其所有关联文件，且无法恢复，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$api.sealManage.sealRegisterForm
            .doDeleteByld({id:this.selectIds})
            .then(res => {
              console.log("delSealRegister返回的数据：", res);
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "印章登记删除成功！",
                duration: 2000
              });
              this.loadData();
            })
            .catch(err => {
              console.log("印章登记数据删除报错：", err);
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "印章登记删除失败！\n" + err,
                duration: 2000
              });
            });
      });
    },
    // 选机构
    selectOrg(org) {
      console.log(org);
      this.$set(this.form, "draftOrgan", org.unitName);
      this.form.draftOrganId = org.id;
      this.unitCode = org.id;
    },
    // 开始统计按钮点击事件
    query() {
      this.formList.startDate = this.draftTime1 ? this.draftTime1[0] : "";
      this.formList.endDate = this.draftTime1 ? this.draftTime1[1] : "";
      this.formList.sealName = this.form.sealName;
      this.formList.draftOrganId = this.form.draftOrganId;
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.loadData();
    },
    // 重置按钮
    reset() {
      this.draftTime1 = [];
      this.form.draftOrganId = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitId;
      this.form.draftOrgan = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitName;
      this.form.startDate = "";
      this.form.endDate = "";
      this.form.sealName = "";
      this.formList.sealName = this.form.sealName;
      this.formList.startDate = this.draftTime1 ? this.draftTime1[0] : "";
      this.formList.endDate = this.draftTime1 ? this.draftTime1[1] : "";
      this.formList.draftOrganId = this.form.draftOrganId;
      this.tableData = [];
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.loadData();
    },
    //列表数据
    loadData() {
      this.tableData = [];
      this.$api.sealManage
        .yzDj(this.formList, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.list;
        });
    },
    handleOpenPage(path, id, readType, flag) {
      
      let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
      if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      } 
      const routeData = this.$router.resolve({
        path: path,
        query: {id:id}
      });
      window.open(routeData.href, "_blank");
      
    },
    cellClick(row) {
      let path;
      path = "/LookDj";
      this.$intent.goNewPage(this, {
        path,
        query: {
          id: row.id
        }
      });
      // 不允许打开同一页面
      // this.handleOpenPage(path,row.id)
    }
  },
  created() {
    let Jb = JSON.parse(localStorage.getItem("userInfo"));
    console.log(Jb);

    this.formList.draftOrganId = Jb.unitId;
    this.form.draftOrganId = Jb.unitId;
    this.$set(this.form, "draftOrgan", Jb.unitName);

    this.loadData();
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
p {
  border: 1px solid;
}
.el-form {
  margin-top: 20px;
}
.ces-table-page{
  min-height: 500px;
}
</style>