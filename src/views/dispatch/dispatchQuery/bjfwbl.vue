<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm transition_wrap" :class="{mtdown:down}">
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
            <el-col :span="6">
              <el-form-item label="发文日期" prop="sendRangeTime">
                <el-date-picker
                  @change="sendRangeTimeChange()"
                  v-model="sendRangeTime"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发文文号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
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
            <el-col :span="24" style="text-align: center;margin-bottom: 10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="getTableList('1')">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="arrow()"> <i class="el-icon-arrow-down el-icon--left"></i> 展开</el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down" class="clearfix">
            <el-row>
              <!-- <el-col :span = "8">
                <el-form-item label="制发行" prop="draftOrganId">
                  <el-select v-model="ruleForm.draftOrganId" style="width:100%" clearable>
                    <el-option v-for="item in bankOptions" :key="item.unitId" :value="item.unitId" :label="item.unitName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span = "8">
                <el-form-item label="主办部门" prop="draftDepartmentId">
                  <el-input v-model="ruleForm.mainOrganNames" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span = "2">
                <el-button type="primary" @click="selectDepartment">选择</el-button>
              </el-col>
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
                <el-button type="info" size="small"  @click="arrow()"> <i class="el-icon-arrow-up el-icon--left"></i> 收起</el-button>
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
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
          >
        </m-table>
      </el-col>
    </el-row>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import Dialog from "@/views/dispatch/departDialog.vue";
// import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"
import exportTable from "@/minixs/exportTable";

export default {
  name: "Bjfwbl",
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
        function: "searchSendHandleTime"
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:20
      },
      ruleForm: {
        sendTimeStart:'',
        sendTimeEnd:'',
        title: '',
        mainOrganNames: "",
        deptIds: "",
        documentNo: '',
        draftDepartmentId:"",
        draftOrganId: "",
      },
      tableCols: [
        { label: "发文日期", prop: "sendTime", align: "center", width: "150px" },
        { label: "制发单位", prop: "draftOrgan", align: "center", width:"120px" },
        { label: "主办部门", prop: "draftDepartment", align: "center", width:"120px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "办理时长/工作日", prop: "disposeDuration", align: "center", width:"110px" },
      ]
    };
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("办结发文办理时间查询表",".el-table");
    },
    /**
     * 列表数据查询
    */
    getTableList(val){
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
      this.$post.postData("searchSendHandleTime", JSON.stringify(Object.assign({},this.bank_select, this.pagination)), this.$businessCode.fawgl).then(res => {
        this.tableData = res.data&&res.data.rows||[];
        this.pagination.total = res.data.total;
        this.bank_select.totalCount = res.data&&res.data.total||0;
      })
    },
    cellClick(row, column, cell, event){
      if (row.sendType === '实物') {
        this.handleOpenPage('/bankEntityDispatchDone', row.id, row.readFlag)
      } else if (row.sendType === '电子') {
        this.handleOpenPage('/bankDispachDone', row.id, row.readFlag)
      }
    },
    handleOpenPage (path, id, readType) {
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
    resetForm() {
      // this.handleScaleMaintain();
      this.sendRangeTime="";
      this.ruleForm = {
        sendTimeStart:'',
        sendTimeEnd:'',
        title: '',
        mainOrganNames: "",
        deptIds: "",
        documentNo: '',
        draftDepartmentId:"",
        draftOrganId: "",
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
}
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin-right: 10px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
.btn-writeEnDspc:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}
.mtdown{
  padding:20px 20px 80px 0;
}
.center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: block;
}
.down{
  position: absolute;
  bottom:-76px;
  font-size:12px;
  text-align:center;
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
