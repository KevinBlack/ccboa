<template>
  <div>
    <el-row>
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm transition_wrap"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item label="拟稿日期" prop="draftRangeTime">
                <el-date-picker
                  @change="draftRangeTimeChange()"
                  v-model="draftRangeTime"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  align="right"
                  unlink-panels
                  style="width:100%"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="机构名称" prop="">
                <div class="dispatchcswhlshwh">
                  <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="unitName"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </select-org-or-dept>
                </div>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="发文日期" prop="sendRangeTime">
                <el-date-picker
                  @change="sendRangeTimeChange()"
                  value-format="yyyy-MM-dd"
                  v-model="sendRangeTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  style="width:100%"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="21">
                  <el-form-item label="主办部门" prop="draftDepartmentId">
                    <el-input v-model="ruleForm.mainOrganNames" readonly="readonly"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-button type="primary" @click="selectDepartment">选择</el-button>
                </el-col>
              </el-row>
            </el-col>
            
            <el-col :span="24" style="text-align: center;margin-bottom: 10px;">
              <el-col v-show="!down" class="arrowup">
                <el-button type="primary" @click="getTableList('1')" style="margin:0 10px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <el-row v-if="down">
            <el-col :span="8">
              <el-form-item label="拟稿人" prop="draftUserName">
                <el-input v-model="ruleForm.draftUserName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直发范围" prop="directRange">
                <el-input v-model="ruleForm.directRange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直发种类" prop="directType">
                <el-input v-model="ruleForm.directType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-show="down" class="clearfix">
            <el-row>
              <el-form-item label="发文形式" prop="sendType">
                <el-radio-group v-model="ruleForm.sendType">
                  <el-radio label="0">全部</el-radio>
                  <el-radio label="1">电子</el-radio>
                  <el-radio label="2">实物</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发文类型" prop="orderType">
                <el-radio-group v-model="ruleForm.orderType">
                  <el-radio label>全部</el-radio>
                  <el-radio label="行发文">行发文</el-radio>
                  <el-radio label="部门发文">部门发文</el-radio>
                  <el-radio label="党务发文">党务发文</el-radio>
                  <el-radio label="会议纪要">会议纪要</el-radio>
                  <el-radio label="工作简报">工作简报</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="getTableList('1')">搜索</el-button>
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
      <el-col style="text-align:right;margin-top:10px;"><el-button size="small" @click="exportExc">导 出</el-button></el-col>
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
          :state="bank_select.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
  </div>
</template>

<script>
import mTable from "@/components/table/mTable.vue";
import optionalfield from "@/components/optionalfield/optionalfield.vue";
import Dialog from "@/views/dispatch/departDialog.vue";
// import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"
import exportTable from "@/minixs/exportTable";

export default {
  name: "Zffw",
  mixins: [dispatchFileQuery],
  components: {
    mTable,
    // optionalfield,
    Dialog,
    // selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      bank_select: {
        function: "searchDirectOrder"
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:20
      },
      ruleForm: {
        draftTimeStart: "",
        draftTimeEnd: "",
        sendTimeStart: "",
        sendTimeEnd: "",
        title: "",
        mainOrganNames: "",
        deptIds: "",
        documentNo: "",
        draftDepartmentId: "",
        draftUserName: "", //拟稿人
        directRange: "", //直发范围
        directType: "", //直发种类
        orderType: "",
        sendType: "0"
      },
      tableCols: [
        { label: "拟稿日期", prop: "createTime", align: "center", width: "150px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "发文种类", prop: "sendType", align: "center", width: "80px" },
        { label: "当前状态", prop: "isFlowEnd", align: "center", width: "80px" },
        { label: "当前环节", prop: "currentNode", align: "center", width: "120px" },
        { label: "当前处理人 ", prop: "currentUser", align: "center", width: "100px" }
      ]
    };
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("直发发文查询表",".el-table");
    },
    /**
     * 直发文列表查询
     */
    getTableList(val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      if(val=="1") {
        this.pagination.page = 1;
      }
      this.bank_select = Object.assign(this.bank_select,this.ruleForm);
      this.bank_select.st = localStorage.getItem('st');
      this.$post
        .postData(
          "searchDirectOrder",
          JSON.stringify(Object.assign({},this.bank_select, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = (res.data && res.data.rows) || [];
          this.pagination.total = res.data.total;
          this.bank_select.totalCount = (res.data && res.data.total) || 0;
        });
    },
    cellClick(row, column, cell, event) {
      if (row.sendType === "实物") {
        this.handleOpenPage("/bankEntityDispatchDone", row.id, row.readFlag);
      } else if (row.sendType === "电子") {
        this.handleOpenPage("/bankDispachDone", row.id, row.readFlag);
      }
    },
    handleOpenPage(path, id, readType) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag: readType,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    resetForm() {
      // this.handleScaleMaintain();
      this.draftRangeTime = [];
      this.sendRangeTime = [];
      this.ruleForm = {
        draftTimeStart: "",
        draftTimeEnd: "",
        sendTimeStart: "",
        sendTimeEnd: "",
        title: "",
        mainOrganNames: "",
        deptIds: "",
        documentNo: "",
        draftDepartmentId: "",
        draftUserName: "", //拟稿人
        directRange: "", //直发范围
        directType: "", //直发种类
        orderType: "",
        sendType: "0"
      };
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
    },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = this.ruleForm.draftDepartmentId = result.id;
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = '〔'+ openTimeYear +'〕'
      
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.defaultYear();
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
.mtdown {
  padding: 20px 20px 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: -76px;
  font-size: 12px;
  text-align: center;
}
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
</style>
