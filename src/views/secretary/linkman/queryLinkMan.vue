<!--
 * @Author: wy
 * @Date: 2020-10-10 14:24:35
 * @LastEditTime: 2020-10-20 15:39:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\secretary\linkman\queryLinkMan.vue
--> 
<template>
  <div class="queryLinkMan">
    <el-form :model="formData" label-width="120px">
      <baseSearchForm ref="baseSearchForm" @reset="reset" @submit="submit">
        <el-col slot="oneLine" :span="18">
          <el-row>
            <el-col :span="12">
              <el-form-item label="报送日期">
                <el-date-picker
                  v-model="formData.publicData"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  style="width:100%"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报送单位">
                <el-select v-model="formData.sendunitId" :style="{width:'100%'}" @select="selOrg">
                  <el-option
                    v-for="item in sendDepartment"
                    :key="item.unitCode"
                    :label="item.unitName"
                    :value="item.unitCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-row slot="more">
          <el-col :span="9">
            <select-org-or-dept
              :orgOrDept="0"
              :orgOrDeptId="formData.humanUnit"
              @focus="focusDept"
              @select="selectDept"
            >
              <el-form-item label="报送部门">
                <el-input type="text" readonly="readonly" v-model="formData.sendsortLevelName"></el-input>
              </el-form-item>
            </select-org-or-dept>
          </el-col>
          <el-col :span="9">
            <el-form-item label="联系人姓名">
              <el-input v-model="formData.contactPersonName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </baseSearchForm>
    </el-form>
    <m-table
      ref="linkManTab"
      @refresh="loadData()"
      @cellClick="cellClick"
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>
<script>
import mTable from "@/components/table/tTable";
import baseSearchForm from "components/form/baseSearchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "queryLinkMan",
  components: {
    mTable,
    baseSearchForm,
    selectOrgOrDept
  },
  props: {},
  data() {
    return {
      sendDepartment: [],
      formData: {
        publicData: [],
        sendsortLevelName: "",
        sendsortLevel: "",
        humanUnit: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      tableData: [],
      tableCols: [
        { label: "报送日期", prop: "sendTime" },
        { label: "报送单位", prop: "sendUnit", width: 150 },
        { label: "联系人姓名", prop: "contactPersonName", width: 100 },
        { label: "联系人职务", prop: "contactPersonJob", width: 100 },
        { label: "联系人手机", prop: "contactPersonPhone" },
        { label: "联系人办公电话", prop: "contactPersonTel" },
        { label: "联系人邮箱", prop: "contactPersonMail" }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    };
  },
  computed: {},
  methods: {
    //查询区选择报送单位
    selOrg() {
      this.formData.sendsortLevelName = "";
      this.formData.sendsortLevel = "";
      this.formData.humanUnit = this.formData.sendunitId;
    },
    focusDept() {
      if (this.formData.sendunitId === "") {
        this.$message({
          type: "warning",
          message: "请先选择报送单位！"
        });
      }
    },
    selectDept(dept) {
      this.formData.sendsortLevelName = dept.unitName;
      this.formData.sendsortLevel = dept.id;
      this.loadData();
    },
    reset() {
      this.formData = {};
      this.loadData();
    },
    submit(params) {
      this.loadData();
    },
    loadData() {
      if (this.formData.publicData) {
        this.formData.publicqData = this.formData.publicData[0];
        this.formData.publichData = this.formData.publicData[1];
      }
      this.$api.secreatary.linkMan
        .getQueryLinkManList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    //表格事件
    cellClick(row) {
      this.$router.push({
        path: "/secretary/linkman/linkForm",
        query: {
          id: row.id,
          type: "query"
        }
      });
    }
  },
  mounted() {
    this.loadData();
    this.$api.setting.organization
      .getOrgList({
        orgName: "中国建设银行股份有限公司",
        unitClass: 1,
        unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId
      })
      .then(res => {
        this.sendDepartment = JSON.parse(JSON.stringify(res.data));
      });
  },
  created() {}
};
</script>
<style scoped lang='less' rel='stylesheet/less'>
.LookLinkMan {
  min-height: 100vh;
}
</style>
